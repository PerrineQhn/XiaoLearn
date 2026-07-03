/**
 * prune-cloudflare-assets.mjs — retire audio/ du BUNDLE avant deploy R2.
 * -----------------------------------------------------------------------
 * V2 (2026-07-03) : le script opère UNIQUEMENT sur `dist/audio/` (le
 * bundle Vite), JAMAIS sur `public/audio/` (la source de vérité locale).
 *
 * Historique du bug corrigé : avant, ce script tournait en `prebuild` et
 * effaçait `public/audio/`. Sur Cloudflare Pages CI c'était safe (fs
 * jetable) mais en local ça détruisait DÉFINITIVEMENT les audios sources.
 * On a maintenant un `postbuild` qui touche uniquement le bundle prêt à
 * uploader.
 *
 * Contexte : les audios (~165k fichiers, ~3 GB) sont hébergés sur R2 et
 * servis via `VITE_AUDIO_BASE_URL`. Ils n'ont pas besoin d'être dans le
 * bundle Cloudflare Pages (qui a une limite de 20k fichiers par deploy).
 *
 * Modes :
 *   - Sans env : skip silencieusement (dev local `npm run dev`).
 *   - CF_PAGES=1 : force le prune (Cloudflare CI ou `npx wrangler pages
 *     deploy`).
 *   - FORCE_PRUNE_ASSETS=1 : force le prune manuellement.
 *   - PRUNE_ASSETS_DRY_RUN=1 : montre ce qui serait supprimé sans le faire.
 */
import { existsSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST_DIR = join(ROOT, 'dist');
const DIST_AUDIO_DIR = join(DIST_DIR, 'audio');

const FILE_LIMIT = 20000;
const ENABLED = process.env.CF_PAGES === '1' || process.env.FORCE_PRUNE_ASSETS === '1';
const DRY_RUN = process.env.PRUNE_ASSETS_DRY_RUN === '1';

const countFiles = (dir) => {
  if (!existsSync(dir)) return 0;
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      total += countFiles(fullPath);
    } else {
      total += 1;
    }
  }
  return total;
};

if (!ENABLED) {
  console.log('[prune] Skipping (not a Pages build). Set CF_PAGES=1 or FORCE_PRUNE_ASSETS=1 to enable.');
  process.exit(0);
}

if (!existsSync(DIST_DIR)) {
  console.log('[prune] dist/ absent — nothing to prune. Run `npm run build` first.');
  process.exit(0);
}

const initialCount = countFiles(DIST_DIR);
const audioCount = countFiles(DIST_AUDIO_DIR);

console.log(
  `[prune] Cloudflare asset pruning: ${initialCount} files in dist/. Limit: ${FILE_LIMIT}.`
);

let finalCount = initialCount;

if (existsSync(DIST_AUDIO_DIR)) {
  if (DRY_RUN) {
    finalCount = Math.max(0, initialCount - audioCount);
    console.log(`[prune] [dry-run] Would remove ${DIST_AUDIO_DIR} (${audioCount} files).`);
  } else {
    rmSync(DIST_AUDIO_DIR, { recursive: true, force: true });
    finalCount = countFiles(DIST_DIR);
    console.log(`[prune] Removed ${DIST_AUDIO_DIR} (${audioCount} files).`);
  }
} else {
  console.log('[prune] dist/audio absent — nothing to remove.');
}

if (!DRY_RUN && finalCount > FILE_LIMIT) {
  throw new Error(
    `[prune] Still above Cloudflare limit after pruning: ${finalCount} files in dist/.`
  );
}

console.log(`[prune] Complete: ${finalCount} files remaining in dist/. public/audio UNCHANGED (safe).`);
