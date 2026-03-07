import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const CHUNK_SIZE = 1000;
const PAGE_SIZE = 120;
const INPUT = join(ROOT, 'src/data/hors-hsk.json');
const OUTPUT_DIR = join(ROOT, 'public/data/hors-hsk');
const HSK_OUTPUT_DIR = join(ROOT, 'public/data/hsk');
const HSK_LEVELS = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7'];
const HSK_CHUNK_SIZE = 500;

console.log('Splitting hors-hsk.json into chunks...');

const data = JSON.parse(readFileSync(INPUT, 'utf-8'));
const numChunks = Math.ceil(data.length / CHUNK_SIZE);

rmSync(OUTPUT_DIR, { recursive: true, force: true });
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

writeFileSync(
  join(OUTPUT_DIR, 'meta.json'),
  JSON.stringify(
    {
      totalEntries: data.length,
      chunkSize: CHUNK_SIZE,
      pageSize: PAGE_SIZE,
    },
    null,
    2,
  ),
);

console.log(`✓ ${numChunks} chunks generated in public/data/hors-hsk/ (${data.length} entries, ${CHUNK_SIZE}/chunk)`);

console.log('Splitting HSK data into chunks...');

rmSync(HSK_OUTPUT_DIR, { recursive: true, force: true });
mkdirSync(HSK_OUTPUT_DIR, { recursive: true });

const hskMeta = {
  chunkSize: HSK_CHUNK_SIZE,
  levels: {},
};
const hskAllEntries = [];

for (const level of HSK_LEVELS) {
  const levelInput = join(ROOT, 'src/data', `${level}.json`);
  const levelOutput = join(HSK_OUTPUT_DIR, level);
  const levelAggregateOutput = join(HSK_OUTPUT_DIR, 'levels');
  const levelData = JSON.parse(readFileSync(levelInput, 'utf-8'));
  const levelChunks = Math.ceil(levelData.length / HSK_CHUNK_SIZE);

  mkdirSync(levelOutput, { recursive: true });
  mkdirSync(levelAggregateOutput, { recursive: true });

  for (let c = 0; c < levelChunks; c++) {
    const chunk = levelData.slice(c * HSK_CHUNK_SIZE, (c + 1) * HSK_CHUNK_SIZE);
    const chunkMap = {};
    for (const entry of chunk) {
      chunkMap[entry.id] = entry;
    }
    const chunkNum = String(c + 1).padStart(3, '0');
    writeFileSync(join(levelOutput, `chunk-${chunkNum}.json`), JSON.stringify(chunkMap));
  }

  writeFileSync(join(levelAggregateOutput, `${level}.json`), JSON.stringify(levelData));
  hskAllEntries.push(...levelData);
  hskMeta.levels[level] = levelData.length;
}

writeFileSync(join(HSK_OUTPUT_DIR, 'meta.json'), JSON.stringify(hskMeta, null, 2));
writeFileSync(join(HSK_OUTPUT_DIR, 'all.json'), JSON.stringify(hskAllEntries));

console.log('✓ HSK chunks generated in public/data/hsk/');
