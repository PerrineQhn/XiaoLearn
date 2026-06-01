/**
 * upload-grammar-r2.mjs
 * ---------------------
 * Upload les MP3 de `public/audio/grammar/` vers un bucket Cloudflare R2
 * via `wrangler r2 object put`. Idempotent : skippe les objets déjà
 * présents en R2 (modulo l'option --force).
 *
 * Pré-requis :
 *   - Cloudflare Wrangler CLI installé : npm i -g wrangler@latest
 *   - Auth Cloudflare : `wrangler login` (une fois)
 *   - Un bucket R2 créé : dashboard Cloudflare > R2 > Create bucket
 *   - (Optionnel mais recommandé) Public R2 Dev URL activée sur le bucket
 *     ou Custom Domain attaché → URL stable type pub-xxxxx.r2.dev/...
 *
 * Usage :
 *   # Grammaire (défaut historique)
 *   node scripts/upload-grammar-r2.mjs --bucket=xiaolearn-audio
 *
 *   # Hors-HSK (95k+ fichiers, prévoir ~13h en sequential — voir alternatif
 *   # rclone à la fin du script pour parallélisation)
 *   node scripts/upload-grammar-r2.mjs --bucket=xiaolearn-audio \
 *     --source-dir=public/audio/hors-hsk --prefix=audio/hors-hsk
 *
 *   # Autres flags
 *   node scripts/upload-grammar-r2.mjs --bucket=xiaolearn-audio --dry-run
 *   node scripts/upload-grammar-r2.mjs --bucket=xiaolearn-audio --force
 *
 * Conventions de naming dans R2 :
 *   Local  : public/audio/grammar/不仅_而且.mp3
 *   Remote : <bucket>/audio/grammar/不仅_而且.mp3
 *   URL    : https://pub-XXXXXX.r2.dev/audio/grammar/不仅_而且.mp3
 *
 * Pour pointer l'app sur R2 en prod, ajoute dans les env vars Cloudflare
 * Pages (Settings > Environment variables) :
 *   VITE_AUDIO_BASE_URL = https://pub-XXXXXX.r2.dev
 * (ou ton custom domain). Le helper resolveRemoteAudioSrc déjà en place
 * concaténera ce préfixe à `audio/grammar/<file>.mp3`.
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const dryRun = argv.includes('--dry-run');
const force = argv.includes('--force');
const getFlag = (name) =>
  argv.find((a) => a.startsWith(`--${name}=`))?.slice(`--${name}=`.length);

const bucketArg = getFlag('bucket');
const prefixArg = getFlag('prefix');
// Permet de cibler n'importe quel sous-dossier de public/audio/ (grammar,
// hors-hsk, hsk1, examples, ...). Défaut historique = grammar.
const sourceDirArg = getFlag('source-dir') ?? 'public/audio/grammar';

const BUCKET = bucketArg ?? 'xiaolearn-audio';
// Si --prefix est omis, on dérive du source-dir en retirant le préfixe
// "public/" (ex : public/audio/hors-hsk → audio/hors-hsk).
const defaultPrefix = sourceDirArg.replace(/^public\//, '');
const REMOTE_PREFIX = (prefixArg ?? defaultPrefix).replace(/^\/+|\/+$/g, '');
const LOCAL_DIR = path.isAbsolute(sourceDirArg)
  ? sourceDirArg
  : path.join(PROJECT_ROOT, sourceDirArg);

if (!BUCKET) {
  console.error('❌ --bucket=<name> requis.');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Helpers wrangler — version pinned dans devDeps, sinon global.
// ---------------------------------------------------------------------------
function runWrangler(args, { silent = false } = {}) {
  // npx prend wrangler local s'il est en devDep, sinon le télécharge.
  const result = spawnSync('npx', ['wrangler', ...args], {
    cwd: PROJECT_ROOT,
    encoding: 'utf8',
    stdio: silent ? ['ignore', 'pipe', 'pipe'] : ['inherit', 'pipe', 'pipe']
  });
  if (result.error) throw result.error;
  return result;
}

function objectExists(remoteKey) {
  // wrangler r2 object get <bucket>/<key> --pipe (échoue silencieux si
  // l'objet n'existe pas). On utilise --info qui est plus rapide qu'un get.
  const r = runWrangler(
    ['r2', 'object', 'get', `${BUCKET}/${remoteKey}`, '--pipe'],
    { silent: true }
  );
  return r.status === 0;
}

function uploadObject(remoteKey, localPath) {
  const r = runWrangler([
    'r2', 'object', 'put',
    `${BUCKET}/${remoteKey}`,
    `--file=${localPath}`,
    '--content-type=audio/mpeg'
  ]);
  if (r.status !== 0) {
    throw new Error(`wrangler exit ${r.status}: ${r.stderr?.slice(0, 200)}`);
  }
  return r.stdout;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  if (!fs.existsSync(LOCAL_DIR)) {
    console.error(`❌ Dossier introuvable : ${LOCAL_DIR}`);
    console.error('   Lance d\'abord : node scripts/gen-grammar-audio.mjs');
    process.exit(1);
  }

  const files = fs
    .readdirSync(LOCAL_DIR)
    .filter((f) => /\.(mp3|wav)$/i.test(f))
    .sort();

  console.log(`📦 Upload R2 audio${dryRun ? ' · DRY-RUN' : ''}`);
  console.log(`   Source : ${LOCAL_DIR}`);
  console.log(`   Bucket : ${BUCKET}`);
  console.log(`   Préfix : ${REMOTE_PREFIX}/`);
  console.log(`   Locaux : ${files.length} fichier(s)`);
  console.log('');

  // Avertissement gros run : 95k files × 500ms/wrangler = ~13h sequential.
  if (files.length > 5000 && !dryRun) {
    console.log(
      `⚠️  ${files.length} fichiers à uploader = très long (~${Math.round((files.length * 500) / 1000 / 60)} min en séquentiel).`
    );
    console.log(`   Considère rclone parallèle (voir doc en tête du script).`);
    console.log('');
  }

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    const localPath = path.join(LOCAL_DIR, file);
    const remoteKey = `${REMOTE_PREFIX}/${file}`;

    if (!force) {
      // Probe d'existence — utile pour ne pas re-burn de bande passante
      // sur de gros runs. Désactivable via --force.
      let exists = false;
      try {
        exists = objectExists(remoteKey);
      } catch {
        /* erreur réseau → on tente l'upload */
      }
      if (exists) {
        console.log(`  ⏭  ${file} → ${remoteKey} (déjà en R2)`);
        skipped++;
        continue;
      }
    }

    if (dryRun) {
      console.log(`  ○ ${file} → ${remoteKey}`);
      continue;
    }

    try {
      uploadObject(remoteKey, localPath);
      console.log(`  ✓ ${file} → ${remoteKey}`);
      uploaded++;
    } catch (err) {
      console.error(`  ✗ ${file} → ${err.message?.split('\n')[0] ?? err}`);
      failed++;
    }
  }

  console.log('');
  console.log(`Résumé :`);
  console.log(`  ✓ Uploadés : ${uploaded}`);
  console.log(`  ⏭  Skippés  : ${skipped}`);
  console.log(`  ✗ Échoués  : ${failed}`);
  console.log('');
  if (uploaded > 0) {
    console.log('Pour servir ces audios en prod, ajoute dans tes env vars');
    console.log('Cloudflare Pages (Settings > Environment variables) :');
    console.log(`  VITE_AUDIO_BASE_URL=https://pub-XXXXXX.r2.dev`);
    console.log('(remplace par ton "Public Dev URL" R2 ou ton custom domain)');
  }
}

main();
