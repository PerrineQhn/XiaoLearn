/**
 * delete-r2-keys.mjs
 * ------------------
 * Supprime des objets nommément désignés du bucket R2.
 *
 * ## Pourquoi un script dédié plutôt qu'une commande jetable
 *
 * Une suppression dans un bucket est irréversible : R2 n'a pas de corbeille,
 * et le versioning n'est pas activé ici. Un `--recursive` mal placé sur
 * `audio/` rendrait l'app muette en production, et il faudrait relancer
 * 174 783 envois pour revenir en arrière.
 *
 * D'où trois garde-fous :
 *
 *   1. aucune expansion, aucun préfixe, aucun joker — uniquement les clés
 *      écrites en toutes lettres sur la ligne de commande ;
 *   2. affichage puis vérification de chaque clé (existence, taille) avant
 *      toute suppression ;
 *   3. mode simulation par défaut : rien n'est supprimé sans `--confirm`.
 *
 * Le script refuse par ailleurs toute clé se terminant par une extension
 * audio : ce fichier n'a pas vocation à servir au ménage des enregistrements,
 * qui se gère par régénération.
 *
 * Usage :
 *   node --env-file=.env.local scripts/delete-r2-keys.mjs audio/.DS_Store
 *   node --env-file=.env.local scripts/delete-r2-keys.mjs --confirm audio/.DS_Store
 */
import { S3Client, HeadObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const CONFIRM = process.argv.includes('--confirm');
const keys = process.argv.slice(2).filter(a => !a.startsWith('--'));

if (!keys.length) {
  console.error('Usage : node --env-file=.env.local scripts/delete-r2-keys.mjs [--confirm] <clé> [clé…]');
  process.exit(1);
}

const audioLike = keys.filter(k => /\.(mp3|wav|ogg|m4a)$/i.test(k));
if (audioLike.length) {
  console.error('[REFUS] ce script ne supprime pas d\'enregistrements :');
  for (const k of audioLike) console.error(`  ${k}`);
  process.exit(1);
}

const need = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET']
  .filter(k => !process.env[k]);
if (need.length) {
  console.error(`[FATAL] variables manquantes : ${need.join(', ')}`);
  console.error('  Lance avec : node --env-file=.env.local scripts/delete-r2-keys.mjs …');
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

console.log(`Bucket : ${process.env.R2_BUCKET}`);
console.log(`Mode   : ${CONFIRM ? 'SUPPRESSION RÉELLE' : 'simulation (ajouter --confirm pour supprimer)'}`);
console.log('');

let removed = 0, absent = 0, failed = 0;
for (const key of keys) {
  let size = null;
  try {
    const head = await s3.send(new HeadObjectCommand({ Bucket: process.env.R2_BUCKET, Key: key }));
    size = head.ContentLength;
  } catch (err) {
    if (err.name === 'NotFound' || err.$metadata?.httpStatusCode === 404) {
      console.log(`  – ${key} — déjà absent`);
      absent++;
      continue;
    }
    console.error(`  ✗ ${key} — ${err.message}`);
    failed++;
    continue;
  }

  if (!CONFIRM) {
    console.log(`  · ${key} — ${size} octets, serait supprimé`);
    continue;
  }

  try {
    await s3.send(new DeleteObjectCommand({ Bucket: process.env.R2_BUCKET, Key: key }));
    console.log(`  ✓ ${key} — supprimé (${size} octets)`);
    removed++;
  } catch (err) {
    console.error(`  ✗ ${key} — ${err.message}`);
    failed++;
  }
}

console.log('');
if (CONFIRM) console.log(`supprimés : ${removed} · déjà absents : ${absent} · échecs : ${failed}`);
else console.log(`${keys.length - absent - failed} clé(s) seraient supprimées. Relance avec --confirm.`);
if (failed) process.exitCode = 1;
