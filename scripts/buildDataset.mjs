import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');
const outputDir = path.join(root, 'public', 'data');
const manifestFile = path.join(outputDir, 'manifest.json');

const levelFiles = [
  { id: 'hsk1', file: 'hsk1.json' },
  { id: 'hsk2', file: 'hsk2.json' },
  { id: 'hsk3', file: 'hsk3.json' },
  { id: 'hsk4', file: 'hsk4.json' },
  { id: 'hsk5', file: 'hsk5.json' },
  { id: 'hsk6', file: 'hsk6.json' },
  { id: 'hsk7', file: 'hsk7.json' }
];

async function readJson(filePath) {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

async function build() {
  const totals = levelFiles.reduce(
    (acc, level) => ({
      ...acc,
      [level.id]: 0
    }),
    {}
  );
  const lessons = [];

  for (const level of levelFiles) {
    const absolute = path.join(dataDir, level.file);
    const entries = await readJson(absolute);
    totals[level.id] = entries.length;
    lessons.push(...entries);
  }

  const manifest = {
    updatedAt: new Date().toISOString(),
    totals,
    lessons
  };

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(manifestFile, JSON.stringify(manifest, null, 2), 'utf-8');

  console.log(`Manifest saved to ${manifestFile}`);
  console.table(totals);
}

build().catch((error) => {
  console.error('Failed to build dataset:', error);
  process.exitCode = 1;
});
