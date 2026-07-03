#!/usr/bin/env node
/**
 * Deploy XiaoLearn to Cloudflare Pages via wrangler.
 *
 * Wrangler auto-detects `functions/` as Pages Functions and tries to
 * build them. Our `functions/` contains Firebase Cloud Functions (not
 * Cloudflare) so we temporarily rename it during the deploy.
 *
 * The rename is done AFTER `npm run build` (which needs `functions/`
 * out of the way to be safe if it ever runs vite watchers), and reset
 * in a try/finally block guaranteed to run even if wrangler fails or
 * the process is killed via SIGINT.
 *
 * Prereqs :
 *   - `npm run build` already ran (dist/ populated + pruned)
 *   - `.env.local` contains R2 vars (not strictly needed for deploy but
 *     coherent with the rest of the pipeline)
 *   - `npx wrangler login` was run once
 *
 * Usage :
 *   node scripts/deploy.mjs
 *   or via package.json : npm run deploy
 */
import { existsSync, renameSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const FUNCTIONS_DIR = join(ROOT, 'functions');
const FUNCTIONS_TMP = join(ROOT, '.firebase-functions-hidden');

let renamed = false;

function restoreFunctions() {
  if (renamed && existsSync(FUNCTIONS_TMP)) {
    try {
      renameSync(FUNCTIONS_TMP, FUNCTIONS_DIR);
      console.log('[deploy] Restored functions/ (Firebase).');
      renamed = false;
    } catch (e) {
      console.error(
        `[deploy] FATAL : failed to restore functions/ from ${FUNCTIONS_TMP} !`
      );
      console.error(`[deploy] Do it manually : mv "${FUNCTIONS_TMP}" "${FUNCTIONS_DIR}"`);
      throw e;
    }
  }
}

// Guarantee restore on interrupt / uncaught exception.
process.on('SIGINT', () => {
  restoreFunctions();
  process.exit(130);
});
process.on('SIGTERM', () => {
  restoreFunctions();
  process.exit(143);
});
process.on('uncaughtException', (e) => {
  restoreFunctions();
  console.error(e);
  process.exit(1);
});

console.log('[deploy] Starting Cloudflare Pages deploy…');

// Hide Firebase functions from wrangler.
if (existsSync(FUNCTIONS_DIR)) {
  renameSync(FUNCTIONS_DIR, FUNCTIONS_TMP);
  renamed = true;
  console.log(`[deploy] Renamed functions/ -> ${FUNCTIONS_TMP} (Firebase, hidden from wrangler).`);
} else if (existsSync(FUNCTIONS_TMP)) {
  console.log(`[deploy] Detected leftover ${FUNCTIONS_TMP} from a previous crash. Restoring first.`);
  renameSync(FUNCTIONS_TMP, FUNCTIONS_DIR);
  renamed = false;
  process.exit(1);
} else {
  console.log('[deploy] No functions/ directory — nothing to hide.');
}

// Run wrangler.
const wranglerArgs = [
  'wrangler',
  'pages',
  'deploy',
  'dist',
  '--project-name=xiaolearnapp',
  '--branch=main',
  '--commit-dirty=true'
];

const result = spawnSync('npx', wranglerArgs, {
  cwd: ROOT,
  stdio: 'inherit',
  env: { ...process.env }
});

restoreFunctions();

if (result.error) {
  console.error('[deploy] wrangler spawn error :', result.error);
  process.exit(1);
}
if (result.status !== 0) {
  console.error(`[deploy] wrangler exited with code ${result.status}.`);
  process.exit(result.status ?? 1);
}

console.log('[deploy] Deploy complete.');
