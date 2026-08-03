/**
 * reconcile-audio-r2.mjs
 * ----------------------
 * Compare `public/audio/` au bucket R2 et produit la liste des fichiers
 * absents ou de taille différente, consommable par :
 *
 *   node --env-file=.env.local scripts/upload-audio-to-r2.mjs --files=scripts/r2-to-upload.txt
 *
 * ## Pourquoi ne pas simplement relancer l'upload complet
 *
 * `upload-audio-to-r2.mjs` sans argument fait un HEAD par fichier : 174 783
 * requêtes pour n'en envoyer, en régime établi, qu'une poignée. Une dizaine de
 * minutes, dont l'essentiel à confirmer que tout va bien.
 *
 * Un ListObjectsV2 rend 1 000 clés par requête : le même inventaire coûte ~175
 * appels. On compare ensuite en mémoire.
 *
 * ## Ce que la comparaison vérifie, et ce qu'elle ne vérifie pas
 *
 * Présence de la clé, puis **taille**. Pas le MD5 : il faudrait relire et
 * hacher 3,5 Go localement, ce qui reviendrait à payer en disque ce qu'on vient
 * d'économiser en réseau. Une taille identique sur un fichier audio généré est
 * un indice suffisant — une synthèse tronquée change la taille. Un fichier
 * corrompu à taille constante passerait au travers ; `upload-audio-to-r2.mjs`
 * sans `--files`, lui, compare bien les ETag, et reste le recours en cas de
 * doute.
 *
 * ## Reprise
 *
 * L'inventaire du bucket est lent (~1 500 clés/s) et dépasse la minute. Il est
 * donc écrit au fur et à mesure dans un fichier d'état avec son jeton de
 * continuation : relancer la commande reprend où elle s'est arrêtée au lieu de
 * tout recommencer.
 *
 * Usage :
 *   node --env-file=.env.local scripts/reconcile-audio-r2.mjs [--budget=35] [--reset]
 */
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const AUDIO = path.join(PUBLIC, 'audio');
const STATE = path.join(__dirname, '.r2-inventory.json');
const OUT = path.join(__dirname, 'r2-to-upload.txt');

const arg = (n, d) => {
  const a = process.argv.find(x => x.startsWith(`--${n}=`));
  return a ? a.slice(n.length + 3) : d;
};
const BUDGET = Number(arg('budget', '35')) * 1000;
if (process.argv.includes('--reset') && fs.existsSync(STATE)) fs.unlinkSync(STATE);

const need = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET']
  .filter(k => !process.env[k]);
if (need.length) {
  console.error(`[FATAL] variables manquantes : ${need.join(', ')}`);
  console.error('  Lance avec : node --env-file=.env.local scripts/reconcile-audio-r2.mjs');
  process.exit(1);
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// ── Inventaire du bucket, repris là où il s'était arrêté ────────────────────
let state = { keys: {}, token: undefined, done: false };
if (fs.existsSync(STATE)) state = JSON.parse(fs.readFileSync(STATE, 'utf8'));

if (!state.done) {
  const start = Date.now();
  let pages = 0;
  do {
    const res = await s3.send(new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET,
      ContinuationToken: state.token,
      MaxKeys: 1000,
    }));
    for (const o of res.Contents ?? []) state.keys[o.Key] = o.Size;
    state.token = res.NextContinuationToken;
    state.done = !res.IsTruncated;
    pages++;
  } while (!state.done && Date.now() - start < BUDGET);

  fs.writeFileSync(STATE, JSON.stringify(state));
  const n = Object.keys(state.keys).length;
  console.log(`inventaire : ${n} clés (+${pages} pages, ${((Date.now() - start) / 1000).toFixed(1)} s)`);
  if (!state.done) {
    console.log('inventaire incomplet — relance la même commande pour continuer.');
    process.exit(0);
  }
}
console.log(`inventaire complet : ${Object.keys(state.keys).length} clés sur R2`);

// ── Fichiers locaux ─────────────────────────────────────────────────────────
function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    // .json inclus : les manifests de dialogues et de lectures sont
    // indispensables côté app, sans eux les MP3 présents restent introuvables.
    else if (/\.(mp3|wav|ogg|m4a|json)$/i.test(e.name)) yield full;
  }
}

const missing = [], resized = [];
let local = 0;
for (const full of walk(AUDIO)) {
  local++;
  const key = path.relative(PUBLIC, full).split(path.sep).join('/');
  const remote = state.keys[key];
  if (remote === undefined) missing.push(key);
  else if (remote !== fs.statSync(full).size) resized.push(key);
}

const todo = [...missing, ...resized];
console.log(`fichiers locaux : ${local}`);
console.log(`absents de R2   : ${missing.length}`);
console.log(`taille ≠        : ${resized.length}`);

// Clés présentes sur R2 sans fichier local : anciens enregistrements devenus
// inutiles. On les signale sans rien supprimer — un fichier orphelin ne coûte
// que du stockage, une suppression à tort casse l'app en production.
const localKeys = new Set([...walk(AUDIO)].map(f => path.relative(PUBLIC, f).split(path.sep).join('/')));
const orphans = Object.keys(state.keys).filter(k => k.startsWith('audio/') && !localKeys.has(k));
console.log(`sur R2 sans équivalent local : ${orphans.length} (non supprimés)`);

fs.writeFileSync(OUT, todo.length ? todo.join('\n') + '\n' : '');
console.log(`\nliste écrite : scripts/${path.basename(OUT)} (${todo.length} fichiers)`);
if (todo.length) {
  console.log('envoi :');
  console.log(`  node --env-file=.env.local scripts/upload-audio-to-r2.mjs --files=scripts/${path.basename(OUT)}`);
} else {
  console.log('✅ R2 est à jour, rien à envoyer.');
}
