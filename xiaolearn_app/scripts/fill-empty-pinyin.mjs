/**
 * fill-empty-pinyin.mjs
 *
 * Parcourt data/hsk{1..7}.json, identifie tous les exemples avec
 * `pinyin: ""` (ou champ pinyin absent) et génère le pinyin via
 * pinyin-pro (qui gère sandhi 不/一/3e ton, polyphones).
 *
 * Sortie :
 *   - data/hsk{N}.json.bak.{timestamp} : sauvegarde avant modif
 *   - scripts/fill-empty-pinyin-report.json : liste de tous les
 *     changements pour review (chinese + pinyin généré + fichier + clé)
 *   - data/hsk{N}.json : modifié en place
 *
 * Usage :
 *   node scripts/fill-empty-pinyin.mjs            # dry-run (default)
 *   node scripts/fill-empty-pinyin.mjs --write    # écrit vraiment
 *   node scripts/fill-empty-pinyin.mjs --revert   # restore depuis le dernier .bak
 *
 * Cas suspects flaggés dans le rapport (à reviewer en priorité) :
 *   - chinois contenant des espaces ou de la ponctuation latine
 *   - chinois avec "XXX" ou placeholders évidents
 *   - chinois > 30 chars (phrases longues, sandhi plus délicat)
 *   - chinois contenant 不 ou 一 (sandhi à vérifier)
 *   - pinyin généré contenant des chars unicode hors range pinyin standard
 */

import { readFileSync, writeFileSync, copyFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pinyin } from 'pinyin-pro';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');
const REPORT_PATH = join(__dirname, 'fill-empty-pinyin-report.json');

const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const REVERT = args.includes('--revert');

const HSK_FILES = ['hsk1.json', 'hsk2.json', 'hsk3.json', 'hsk4.json', 'hsk5.json', 'hsk6.json', 'hsk7.json'];

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

/** Détecte si la chaîne pourrait être un placeholder/cas suspect. */
function classifyEntry(chinese, generated) {
  const flags = [];
  if (!chinese) flags.push('empty-chinese');
  if (/^X{2,}$/i.test(chinese.trim())) flags.push('placeholder');
  if (chinese.length > 30) flags.push('long-sentence');
  if (/[a-zA-Z]/.test(chinese)) flags.push('contains-latin');
  if (/\s+-\s+/.test(chinese)) flags.push('dash-format-mix');
  if (chinese.includes('不') || chinese.includes('一')) flags.push('sandhi-needed');
  if (/^\s*$/.test(generated)) flags.push('empty-generated');
  // Détecte des caractères dans la sortie qui ne sont pas pinyin standard
  if (/[一-鿿]/.test(generated)) flags.push('hanzi-remaining-in-output');
  return flags;
}

function genPinyin(text) {
  // pinyin-pro avec format "tonal" + séparateur espace + ponctuation conservée
  return pinyin(text, {
    toneType: 'symbol',     // ā á ǎ à au lieu de a1 a2 a3 a4
    type: 'string',
    nonZh: 'consecutive',   // garde la ponctuation telle quelle, pas en pinyin
    v: false,                // utilise ü pas v
    removeNonZh: false      // garde ponctuation et espaces
  }).trim();
}

function walk(obj, path, onExample) {
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => walk(v, `${path}[${i}]`, onExample));
    return;
  }
  if (obj && typeof obj === 'object') {
    if ('examples' in obj && Array.isArray(obj.examples)) {
      obj.examples.forEach((ex, i) => {
        if (ex && typeof ex === 'object' && 'chinese' in ex) {
          const hasPinyin = typeof ex.pinyin === 'string' && ex.pinyin.trim().length > 0;
          if (!hasPinyin) {
            onExample(ex, `${path}.examples[${i}]`);
          }
        }
      });
    }
    for (const k of Object.keys(obj)) {
      walk(obj[k], `${path}.${k}`, onExample);
    }
  }
}

function findLatestBackup(file) {
  const dir = DATA_DIR;
  const base = file + '.bak.';
  const candidates = readdirSync(dir)
    .filter((f) => f.startsWith(base))
    .sort();
  return candidates.length > 0 ? join(dir, candidates[candidates.length - 1]) : null;
}

if (REVERT) {
  console.log('Mode REVERT : restauration depuis les derniers .bak\n');
  for (const file of HSK_FILES) {
    const backup = findLatestBackup(file);
    if (!backup) {
      console.log(`  ${file}: aucun backup trouvé, skip`);
      continue;
    }
    copyFileSync(backup, join(DATA_DIR, file));
    console.log(`  ${file}: restauré depuis ${backup.split('/').pop()}`);
  }
  console.log('\nRevert terminé.');
  process.exit(0);
}

console.log(`Mode : ${WRITE ? 'WRITE (modifie les fichiers)' : 'DRY-RUN (n\'écrit rien — utilise --write pour appliquer)'}`);
console.log(`Source : ${DATA_DIR}`);
console.log('');

const ts = timestamp();
const fullReport = {
  generatedAt: new Date().toISOString(),
  mode: WRITE ? 'write' : 'dry-run',
  filesProcessed: [],
  totalChanges: 0,
  byFile: {}
};

for (const file of HSK_FILES) {
  const filePath = join(DATA_DIR, file);
  if (!existsSync(filePath)) {
    console.log(`  ${file}: introuvable, skip`);
    continue;
  }

  const raw = readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);

  const changes = [];
  walk(data, file, (ex, path) => {
    const generated = genPinyin(ex.chinese);
    const flags = classifyEntry(ex.chinese, generated);
    changes.push({
      path,
      chinese: ex.chinese,
      generatedPinyin: generated,
      flags
    });
    if (WRITE) {
      ex.pinyin = generated;
    }
  });

  console.log(`${file}: ${changes.length} entrée(s) avec pinyin vide`);

  if (WRITE && changes.length > 0) {
    const bakPath = `${filePath}.bak.${ts}`;
    copyFileSync(filePath, bakPath);
    writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`  → backup: ${bakPath.split('/').pop()}`);
    console.log(`  → écrit : ${file}`);
  }

  fullReport.filesProcessed.push(file);
  fullReport.byFile[file] = {
    count: changes.length,
    flaggedCount: changes.filter((c) => c.flags.length > 0).length,
    changes
  };
  fullReport.totalChanges += changes.length;
}

writeFileSync(REPORT_PATH, JSON.stringify(fullReport, null, 2), 'utf8');
console.log('');
console.log(`Total : ${fullReport.totalChanges} entrée(s) traitée(s)`);
console.log(`Rapport : ${REPORT_PATH}`);

if (!WRITE) {
  console.log('');
  console.log('Pour appliquer les changements :');
  console.log('  node scripts/fill-empty-pinyin.mjs --write');
}
