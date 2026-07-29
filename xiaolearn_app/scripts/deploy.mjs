#!/usr/bin/env node
/**
 * Deploy XiaoLearn to Cloudflare Pages via wrangler — pipeline complet.
 *
 * V2 (fix ENOSPC) : avant, `vite build` copiait TOUT public/ dans dist/,
 * dont les ~175k audios (~3,4 GB) que le prune supprimait ensuite. Double
 * coût : temps de copie + risque de disque plein (ENOSPC vécu).
 * Maintenant, public/audio est RENOMMÉ hors de public/ AVANT le build
 * (Vite ne le voit plus), puis restauré en finally — même pattern que le
 * masquage de functions/ pour wrangler.
 *
 * Étapes :
 *   1. Leftover checks (functions/ + audio cachés par un crash précédent)
 *   2. Hide public/audio -> .audio-hidden
 *   3. npm run build (CF_PAGES=1) — dist/ léger (~500 MB max sans audio)
 *   4. Restore public/audio (finally)
 *   5. Hide functions/ (Firebase, sinon wrangler tente de les builder)
 *   6. wrangler pages deploy dist
 *   7. Restore functions/ (finally)
 *
 * Prereqs : `npx wrangler login` fait une fois.
 * Usage : npm run deploy  (ou node scripts/deploy.mjs)
 */
import { existsSync, renameSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const FUNCTIONS_DIR = join(ROOT, 'functions');
const FUNCTIONS_TMP = join(ROOT, '.firebase-functions-hidden');
const AUDIO_DIR = join(ROOT, 'public', 'audio');
const AUDIO_TMP = join(ROOT, '.audio-hidden');

let functionsHidden = false;
let audioHidden = false;

function restoreAudio() {
  if (audioHidden && existsSync(AUDIO_TMP)) {
    try {
      renameSync(AUDIO_TMP, AUDIO_DIR);
      console.log('[deploy] Restored public/audio.');
      audioHidden = false;
    } catch (e) {
      console.error(`[deploy] FATAL : failed to restore public/audio from ${AUDIO_TMP} !`);
      console.error(`[deploy] Do it manually : mv "${AUDIO_TMP}" "${AUDIO_DIR}"`);
      throw e;
    }
  }
}

function restoreFunctions() {
  if (functionsHidden && existsSync(FUNCTIONS_TMP)) {
    try {
      renameSync(FUNCTIONS_TMP, FUNCTIONS_DIR);
      console.log('[deploy] Restored functions/ (Firebase).');
      functionsHidden = false;
    } catch (e) {
      console.error(`[deploy] FATAL : failed to restore functions/ from ${FUNCTIONS_TMP} !`);
      console.error(`[deploy] Do it manually : mv "${FUNCTIONS_TMP}" "${FUNCTIONS_DIR}"`);
      throw e;
    }
  }
}

function restoreAll() {
  // Ordre indifférent — chaque restore est indépendant et silencieux si
  // rien à faire.
  try { restoreAudio(); } catch { /* déjà loggé */ }
  try { restoreFunctions(); } catch { /* déjà loggé */ }
}

// Restore garanti sur interruption / crash.
process.on('SIGINT', () => { restoreAll(); process.exit(130); });
process.on('SIGTERM', () => { restoreAll(); process.exit(143); });
process.on('uncaughtException', (e) => { restoreAll(); console.error(e); process.exit(1); });

console.log('[deploy] Starting full build + Cloudflare Pages deploy…');

// --- 1. Leftover checks (crash d'un run précédent) --------------------------
if (existsSync(AUDIO_TMP)) {
  console.log(`[deploy] Leftover ${AUDIO_TMP} detected (previous crash). Restoring first.`);
  renameSync(AUDIO_TMP, AUDIO_DIR.replace(/audio$/, existsSync(AUDIO_DIR) ? 'audio-recovered' : 'audio'));
  if (existsSync(join(ROOT, 'public', 'audio-recovered'))) {
    console.error('[deploy] Both public/audio and .audio-hidden existed ! Kept the hidden copy as public/audio-recovered — reconcile manually.');
    process.exit(1);
  }
}
if (existsSync(FUNCTIONS_TMP)) {
  console.log(`[deploy] Leftover ${FUNCTIONS_TMP} detected (previous crash). Restoring first.`);
  if (existsSync(FUNCTIONS_DIR)) {
    console.error('[deploy] Both functions/ and .firebase-functions-hidden exist ! Reconcile manually.');
    process.exit(1);
  }
  renameSync(FUNCTIONS_TMP, FUNCTIONS_DIR);
}

// --- 2. Hide audio + 3. Build + 4. Restore (finally) ------------------------
if (existsSync(AUDIO_DIR)) {
  renameSync(AUDIO_DIR, AUDIO_TMP);
  audioHidden = true;
  console.log('[deploy] Hidden public/audio (3+ GB) from the build — Vite will not copy it.');
} else {
  console.log('[deploy] public/audio absent — nothing to hide (audio served from R2).');
}

let buildStatus = 1;
try {
  const buildResult = spawnSync('npm', ['run', 'build'], {
    cwd: ROOT,
    stdio: 'inherit',
    env: { ...process.env, CF_PAGES: '1' }
  });
  buildStatus = buildResult.status ?? 1;
} finally {
  restoreAudio();
}

if (buildStatus !== 0) {
  console.error(`[deploy] Build failed (exit ${buildStatus}). Audio restored, aborting.`);
  process.exit(buildStatus);
}

// --- 5. Hide functions + 6. wrangler + 7. Restore (finally) -----------------
if (existsSync(FUNCTIONS_DIR)) {
  renameSync(FUNCTIONS_DIR, FUNCTIONS_TMP);
  functionsHidden = true;
  console.log('[deploy] Hidden functions/ (Firebase) from wrangler.');
}

let deployStatus = 1;
try {
  const result = spawnSync(
    'npx',
    ['wrangler', 'pages', 'deploy', 'dist', '--project-name=xiaolearnapp', '--branch=main', '--commit-dirty=true'],
    { cwd: ROOT, stdio: 'inherit', env: { ...process.env } }
  );
  deployStatus = result.status ?? 1;
} finally {
  restoreFunctions();
}

if (deployStatus !== 0) {
  console.error(`[deploy] wrangler exited with code ${deployStatus}.`);
  process.exit(deployStatus);
}

console.log('[deploy] Deploy complete.');
