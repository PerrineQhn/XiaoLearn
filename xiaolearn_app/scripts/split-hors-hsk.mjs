import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const INPUT_PATH = join(ROOT, 'data/hors-hsk.json');
const OUTPUT_DIR = join(ROOT, 'public/data/hors-hsk');
const CHUNK_SIZE = 1000;

const raw = readFileSync(INPUT_PATH, 'utf-8');
const entries = JSON.parse(raw);

if (!Array.isArray(entries)) {
  throw new Error(`Invalid dataset format in ${INPUT_PATH}: expected an array.`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

for (const name of readdirSync(OUTPUT_DIR)) {
  if (name.startsWith('chunk-') && name.endsWith('.json')) {
    rmSync(join(OUTPUT_DIR, name), { force: true });
  }
}

const chunks = [];
for (let start = 0; start < entries.length; start += CHUNK_SIZE) {
  const chunkIndex = Math.floor(start / CHUNK_SIZE) + 1;
  const chunkName = `chunk-${String(chunkIndex).padStart(3, '0')}.json`;
  const chunk = entries.slice(start, start + CHUNK_SIZE);
  writeFileSync(join(OUTPUT_DIR, chunkName), JSON.stringify(chunk));
  chunks.push(chunkName);
}

const manifest = {
  version: 1,
  chunkSize: CHUNK_SIZE,
  totalEntries: entries.length,
  chunks
};

writeFileSync(join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));

console.log(`Generated ${chunks.length} chunks in ${OUTPUT_DIR} (${entries.length} entries).`);
