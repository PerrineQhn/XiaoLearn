#!/usr/bin/env node
/**
 * Upload public/audio/ vers Cloudflare R2 avec parallélisme + idempotence.
 *
 * Usage :
 *   node --env-file=.env.local scripts/upload-audio-to-r2.mjs
 *   node --env-file=.env.local scripts/upload-audio-to-r2.mjs --dry-run
 *   node --env-file=.env.local scripts/upload-audio-to-r2.mjs --force
 *   node --env-file=.env.local scripts/upload-audio-to-r2.mjs --dir=hsk1
 *
 * Variables d'env requises (dans .env.local) :
 *   R2_ACCOUNT_ID            — Cloudflare account ID (32 chars hex)
 *   R2_ACCESS_KEY_ID         — Access key d'un token R2 avec permission Read & Write
 *   R2_SECRET_ACCESS_KEY     — Secret access key associé
 *   R2_BUCKET                — nom du bucket, ex. xiaolearn-audio
 *
 * R2 est S3-compatible : on utilise @aws-sdk/client-s3 avec un endpoint custom.
 *
 * Stratégie :
 *   - Liste tous les .mp3/.wav sous public/audio/
 *   - Pour chaque fichier, calcule un hash MD5 du contenu local (en hex)
 *   - HEAD distant pour récupérer l'ETag (= MD5 pour les uploads simples)
 *   - Skip si identique → re-runs gratuits et rapides
 *   - Upload en parallèle avec concurrence configurable (défaut : 16)
 *   - cacheControl 1 an immutable + contentType correct
 *
 * Logs :
 *   - Affiche progression toutes les 100 fichiers
 *   - Récap final : uploadés / skipped / échoués
 *   - Sortie code != 0 si au moins un échec
 */

import { S3Client, HeadObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { createHash } from 'node:crypto';
import { readFile, stat, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// Config & CLI args
// ---------------------------------------------------------------------------
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const AUDIO_DIR = join(ROOT, 'public', 'audio');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const FORCE = args.includes('--force');
const SUBDIR_ARG = args.find((a) => a.startsWith('--dir='));
const SUBDIR = SUBDIR_ARG ? SUBDIR_ARG.slice(6) : null;
const CONCURRENCY = parseInt(process.env.UPLOAD_CONCURRENCY ?? '16', 10);

// ---------------------------------------------------------------------------
// Init R2 client
// ---------------------------------------------------------------------------
function loadConfig() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET;

  const missing = [];
  if (!accountId) missing.push('R2_ACCOUNT_ID');
  if (!accessKeyId) missing.push('R2_ACCESS_KEY_ID');
  if (!secretAccessKey) missing.push('R2_SECRET_ACCESS_KEY');
  if (!bucket) missing.push('R2_BUCKET');
  if (missing.length > 0) {
    console.error(`[FATAL] Variables d'env manquantes : ${missing.join(', ')}`);
    console.error('→ Voir AUDIO_HOSTING.md pour générer un token R2.');
    process.exit(1);
  }

  return { accountId, accessKeyId, secretAccessKey, bucket };
}

const cfg = loadConfig();

// L'endpoint R2 est de la forme https://<accountId>.r2.cloudflarestorage.com
// (pas de région à passer ; on utilise "auto" qui est conventionnel pour R2).
const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${cfg.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: cfg.accessKeyId,
    secretAccessKey: cfg.secretAccessKey
  }
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
async function* walkAudioFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkAudioFiles(full);
    } else if (/\.(mp3|wav|ogg|m4a)$/i.test(entry.name)) {
      yield full;
    }
  }
}

const md5HexOfBuffer = (buf) => createHash('md5').update(buf).digest('hex');

const contentTypeFor = (path) => {
  if (path.endsWith('.mp3')) return 'audio/mpeg';
  if (path.endsWith('.wav')) return 'audio/wav';
  if (path.endsWith('.ogg')) return 'audio/ogg';
  if (path.endsWith('.m4a')) return 'audio/mp4';
  return 'application/octet-stream';
};

/**
 * Récupère l'ETag distant (= MD5 hex pour un upload simple non-multipart).
 * Renvoie null si le fichier n'existe pas (404).
 *
 * Pourquoi pas Promise.race + early-exit pour le HEAD ? Parce que le S3 SDK
 * gère déjà le timeout et l'erreur 404 proprement en levant `NotFound` /
 * `NoSuchKey`, ce qui est plus simple à matcher.
 */
async function getRemoteEtag(key) {
  try {
    const res = await s3.send(
      new HeadObjectCommand({ Bucket: cfg.bucket, Key: key })
    );
    // ETag est entouré de guillemets dans la réponse S3 — on les retire.
    return res.ETag?.replace(/^"|"$/g, '') ?? null;
  } catch (err) {
    if (err.name === 'NotFound' || err.$metadata?.httpStatusCode === 404) {
      return null;
    }
    throw err;
  }
}

/**
 * Upload un fichier en mode idempotent. Si le fichier distant existe déjà avec
 * le même ETag (= MD5), on skip.
 *
 * @returns {Promise<'uploaded'|'skipped'|'failed'>}
 */
async function uploadOne(localPath) {
  const key = relative(join(ROOT, 'public'), localPath).split('\\').join('/');

  try {
    const buf = await readFile(localPath);
    const localMd5 = md5HexOfBuffer(buf);

    if (!FORCE) {
      const remoteEtag = await getRemoteEtag(key);
      if (remoteEtag === localMd5) {
        return 'skipped';
      }
    }

    if (DRY_RUN) {
      return 'uploaded';
    }

    await s3.send(
      new PutObjectCommand({
        Bucket: cfg.bucket,
        Key: key,
        Body: buf,
        ContentType: contentTypeFor(localPath),
        // Cache 1 an immutable : les noms de fichiers incluent le hanzi, donc
        // une re-génération produit un nouveau path → pas de risque de servir
        // un vieux fichier sous le même nom.
        CacheControl: 'public, max-age=31536000, immutable'
        // Note : pas de ContentMD5 explicite. À partir de @aws-sdk/client-s3
        // v3.700, la SDK ajoute automatiquement un checksum CRC32 ; combiné
        // avec ContentMD5 ça déclenche l'erreur R2 « You can only specify one
        // non-default checksum at a time ». L'intégrité est de toute façon
        // garantie par la comparaison ETag au run suivant : si le fichier
        // est corrompu pendant l'upload, son ETag distant ne matchera pas le
        // MD5 local et il sera ré-uploadé.
      })
    );

    return 'uploaded';
  } catch (err) {
    console.error(`  ✗ ${key} — ${err.message}`);
    return 'failed';
  }
}

/**
 * Pool de concurrence : démarre N tâches en parallèle, dès qu'une finit
 * démarre la suivante. Plus efficace qu'un Promise.all par batch (pas de
 * synchronisation à la fin de chaque batch).
 */
async function runPool(items, worker, concurrency, onProgress) {
  const results = { uploaded: 0, skipped: 0, failed: 0 };
  let nextIndex = 0;
  let done = 0;

  async function loop() {
    while (true) {
      const i = nextIndex++;
      if (i >= items.length) return;
      const r = await worker(items[i]);
      results[r] = (results[r] ?? 0) + 1;
      done++;
      if (onProgress) onProgress(done, items.length, results);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, loop));
  return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const targetDir = SUBDIR ? join(AUDIO_DIR, SUBDIR) : AUDIO_DIR;
  if (!existsSync(targetDir)) {
    console.error(`[FATAL] Dossier introuvable : ${targetDir}`);
    process.exit(1);
  }

  console.log(`Account  : ${cfg.accountId}`);
  console.log(`Bucket   : ${cfg.bucket}`);
  console.log(`Source   : ${relative(ROOT, targetDir)}`);
  console.log(`Mode     : ${DRY_RUN ? 'DRY RUN (aucun upload)' : 'PRODUCTION'}`);
  console.log(`Force    : ${FORCE ? 'oui (re-upload tout)' : 'non (skip identiques)'}`);
  console.log(`Parallel : ${CONCURRENCY}`);
  console.log('');

  console.log('Énumération des fichiers…');
  const files = [];
  for await (const f of walkAudioFiles(targetDir)) files.push(f);

  let totalBytes = 0;
  for (const f of files) totalBytes += (await stat(f)).size;
  console.log(
    `${files.length} fichiers trouvés (${(totalBytes / 1024 / 1024).toFixed(1)} MB).\n`
  );

  if (files.length === 0) {
    console.log('Rien à uploader.');
    return;
  }

  const start = Date.now();
  let lastLogged = 0;

  const results = await runPool(
    files,
    uploadOne,
    CONCURRENCY,
    (done, total, partial) => {
      const step = Math.max(100, Math.floor(total / 100));
      if (done - lastLogged >= step || done === total) {
        const pct = ((done / total) * 100).toFixed(1);
        const elapsed = ((Date.now() - start) / 1000).toFixed(1);
        process.stdout.write(
          `  [${pct}%] ${done}/${total} — uploaded ${partial.uploaded}, skipped ${partial.skipped}, failed ${partial.failed} (${elapsed}s)\r`
        );
        lastLogged = done;
      }
    }
  );

  process.stdout.write('\n\n');
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`Terminé en ${elapsed}s :`);
  console.log(`  ✓ Uploadés : ${results.uploaded}`);
  console.log(`  → Skippés  : ${results.skipped} (identiques)`);
  console.log(`  ✗ Échoués  : ${results.failed}`);

  if (results.uploaded > 0 && !DRY_RUN) {
    console.log('');
    console.log('VITE_AUDIO_BASE_URL à configurer dans Cloudflare Pages :');
    console.log('  Si custom domain (ex. audio.xiaolearn.com) :');
    console.log('    VITE_AUDIO_BASE_URL=https://audio.xiaolearn.com');
    console.log('  Sinon (URL r2.dev publique, voir Settings du bucket) :');
    console.log('    VITE_AUDIO_BASE_URL=https://pub-<hash>.r2.dev');
  }

  if (results.failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error('[FATAL]', err);
  process.exit(1);
});
