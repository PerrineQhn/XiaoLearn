import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const CHUNK_SIZE = 1000;
const INPUT = join(ROOT, 'src/data/hors-hsk.json');
const OUTPUT_DIR = join(ROOT, 'public/data/hors-hsk');

console.log('Splitting hors-hsk.json into chunks...');

const data = JSON.parse(readFileSync(INPUT, 'utf-8'));
const numChunks = Math.ceil(data.length / CHUNK_SIZE);

mkdirSync(OUTPUT_DIR, { recursive: true });

for (let c = 0; c < numChunks; c++) {
  const chunk = data.slice(c * CHUNK_SIZE, (c + 1) * CHUNK_SIZE);
  const chunkMap = {};
  for (const entry of chunk) {
    chunkMap[entry.id] = entry;
  }
  const chunkNum = String(c + 1).padStart(3, '0');
  writeFileSync(join(OUTPUT_DIR, `chunk-${chunkNum}.json`), JSON.stringify(chunkMap));
}

console.log(`✓ ${numChunks} chunks generated in public/data/hors-hsk/ (${data.length} entries, ${CHUNK_SIZE}/chunk)`);
