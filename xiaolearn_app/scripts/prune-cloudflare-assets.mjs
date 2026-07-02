import { existsSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC_DIR = join(ROOT, 'public');

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
  console.log('Skipping Cloudflare asset pruning (not a Pages build).');
  process.exit(0);
}

const audioDir = join(PUBLIC_DIR, 'audio');
const initialCount = countFiles(PUBLIC_DIR);
const audioCount = countFiles(audioDir);

console.log(
  `Cloudflare asset pruning: ${initialCount} files in public/. Limit: ${FILE_LIMIT}.`
);

let finalCount = initialCount;

if (existsSync(audioDir)) {
  if (DRY_RUN) {
    finalCount = Math.max(0, initialCount - audioCount);
    console.log(`[dry-run] Would remove ${audioDir} (${audioCount} files).`);
  } else {
    rmSync(audioDir, { recursive: true, force: true });
    finalCount = countFiles(PUBLIC_DIR);
    console.log(`Removed ${audioDir} (${audioCount} files).`);
  }
}

if (!DRY_RUN && finalCount > FILE_LIMIT) {
  throw new Error(
    `Still above Cloudflare limit after pruning: ${finalCount} files in public/.`
  );
}

console.log(`Cloudflare asset pruning complete: ${finalCount} files in public/.`);
