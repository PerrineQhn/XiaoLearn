#!/usr/bin/env node
/**
 * Download R2 bucket → public/audio/ avec parallélisme + idempotence.
 *
 * Miroir inverse de scripts/upload-audio-to-r2.mjs. Utile pour :
 *   - Restaurer public/audio/ après un prune accidentel (bug fixé 2026-07-03)
 *   - Onboarding sur une nouvelle machine dev
 *
 * Usage :
 *   node --env-file=.env.local scripts/restore-audio-from-r2.mjs
 *   node --env-file=.env.local scripts/restore-audio-from-r2.mjs --dry-run
 *   node --env-file=.env.local scripts/restore-audio-from-r2.mjs --prefix=audio/grammar/
 *   node --env-file=.env.local scripts/restore-audio-from-r2.mjs --concurrency=32
 *
 * Variables d'env requises (dans .env.local) :
 *   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET
 *
 * Stratégie :
 *   - ListObjectsV2 pagination (max 1000 keys/req)
 *   - Skip les fichiers déjà présents LOCALEMENT avec même taille
 *     (le HEAD distant serait plus rigoureux via ETag=MD5, mais coûterait
 *     un round-trip supplémentaire. La taille suffit pour un usage dev.)
 *   - Download parallèle avec concurrence configurable (défaut 16)
 *   - Progress bar toutes les 100 fichiers
 *   - Récap final : downloaded / skipped / échoués
 *   - Sortie code != 0 si au moins un échec
 */

import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { existsSync, statSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// Config & CLI
// ---------------------------------------------------------------------------
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const AUDIO_DIR = join(ROOT, 'public', 'audio');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const PREFIX_ARG = args.find((a) => a.startsWith('--prefix='));
const PREFIX = PREFIX_ARG ? PREFIX_ARG.slice(9) : 'audio/';
const CONCURRENCY_ARG = args.find((a) => a.startsWith('--concurrency='));
const CONCURRENCY = CONCURRENCY_ARG
  ? parseInt(CONCURRENCY_ARG.slice(14), 10)
  : parseInt(process.env.DOWNLOAD_CONCURRENCY ?? '16', 10);

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
    console.error(`[FATAL] Env vars missing: ${missing.join(', ')}`);
    console.error('→ See AUDIO_HOSTING.md to generate an R2 token.');
    process.exit(1);
  }

  return { accountId, accessKeyId, secretAccessKey, bucket };
}

const cfg = loadConfig();

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${cfg.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: cfg.accessKeyId,
    secretAccessKey: cfg.secretAccessKey
  }
});

// ---------------------------------------------------------------------------
// List all keys with pagination
// ---------------------------------------------------------------------------
async function* listAllKeys(bucket, prefix) {
  let ContinuationToken;
  let iter = 0;
  do {
    const res = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        MaxKeys: 1000,
        ContinuationToken
      })
    );
    for (const obj of res.Contents ?? []) {
      if (obj.Key) yield { key: obj.Key, size: obj.Size ?? 0 };
    }
    ContinuationToken = res.NextContinuationToken;
    iter++;
    if (iter % 10 === 0) {
      console.log(`  [list] ${iter} pages fetched…`);
    }
  } while (ContinuationToken);
}

// ---------------------------------------------------------------------------
// Download one key
// ---------------------------------------------------------------------------
async function downloadOne(key, remoteSize) {
  const localPath = join(ROOT, 'public', key);

  // Skip si déjà présent avec même taille
  if (existsSync(localPath)) {
    try {
      const st = statSync(localPath);
      if (st.size === remoteSize) return { status: 'skipped', key };
    } catch {
      /* fallthrough */
    }
  }

  if (DRY_RUN) return { status: 'would-download', key };

  try {
    await mkdir(dirname(localPath), { recursive: true });
    const res = await s3.send(
      new GetObjectCommand({ Bucket: cfg.bucket, Key: key })
    );
    const chunks = [];
    for await (const chunk of res.Body) chunks.push(chunk);
    const buf = Buffer.concat(chunks);
    await writeFile(localPath, buf);
    return { status: 'downloaded', key };
  } catch (err) {
    return { status: 'failed', key, error: err.message };
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
console.log(`[restore] Bucket: ${cfg.bucket}`);
console.log(`[restore] Prefix: ${PREFIX}`);
console.log(`[restore] Concurrency: ${CONCURRENCY}`);
console.log(`[restore] Local target: ${AUDIO_DIR}`);
console.log(`[restore] Mode: ${DRY_RUN ? 'DRY-RUN' : 'REAL'}`);
console.log('');

console.log('[restore] Listing R2 objects…');
const allKeys = [];
for await (const item of listAllKeys(cfg.bucket, PREFIX)) {
  allKeys.push(item);
}
console.log(`[restore] Total keys: ${allKeys.length}`);

if (allKeys.length === 0) {
  console.log('[restore] Nothing to restore.');
  process.exit(0);
}

// Pool de concurrence
let downloaded = 0;
let skipped = 0;
let failed = 0;
const errors = [];
let idx = 0;
const startTs = Date.now();

async function worker() {
  while (idx < allKeys.length) {
    const my = idx++;
    const item = allKeys[my];
    const res = await downloadOne(item.key, item.size);
    if (res.status === 'downloaded' || res.status === 'would-download') downloaded++;
    else if (res.status === 'skipped') skipped++;
    else if (res.status === 'failed') {
      failed++;
      errors.push(`${res.key}: ${res.error}`);
    }
    const total = downloaded + skipped + failed;
    if (total % 100 === 0) {
      const elapsedMin = ((Date.now() - startTs) / 60000).toFixed(1);
      const rate = Math.round(total / Math.max(1, (Date.now() - startTs) / 1000));
      console.log(
        `  [${total}/${allKeys.length}] downloaded=${downloaded} skipped=${skipped} failed=${failed} — ${rate} files/s — ${elapsedMin} min`
      );
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));

const totalMin = ((Date.now() - startTs) / 60000).toFixed(1);
console.log('');
console.log(`[restore] Done in ${totalMin} min.`);
console.log(`  downloaded: ${downloaded}`);
console.log(`  skipped:    ${skipped}`);
console.log(`  failed:     ${failed}`);
if (failed > 0) {
  console.log('');
  console.log('[restore] First 10 errors:');
  for (const e of errors.slice(0, 10)) console.log(`  ${e}`);
  process.exit(1);
}
