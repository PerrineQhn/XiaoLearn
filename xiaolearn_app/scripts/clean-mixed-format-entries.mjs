/**
 * clean-mixed-format-entries.mjs
 *
 * Certaines entrées (surtout HSK6) ont un `chinese` au format mixte :
 *   "存储容量大- cúnchǔ róngliàng dà- Grande capacité de stockage"
 *
 * Ce script :
 *   1. Détecte ces entrées via regex sur le pattern "hanzi- pinyin- trad"
 *   2. Extrait proprement chacune des 3 parties
 *   3. Réécrit `chinese` = hanzi seul, `pinyin` = pinyin extrait
 *   4. Si `translationFr` est vide, le remplit avec la trad extraite
 *
 * Usage :
 *   node scripts/clean-mixed-format-entries.mjs            # dry-run
 *   node scripts/clean-mixed-format-entries.mjs --write    # applique
 *
 * Les backups .bak.* sont écrits avant chaque écriture (idem fill-empty-pinyin).
 */

import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');
const REPORT_PATH = join(__dirname, 'clean-mixed-format-report.json');

const WRITE = process.argv.includes('--write');
const HSK_FILES = ['hsk1.json', 'hsk2.json', 'hsk3.json', 'hsk4.json', 'hsk5.json', 'hsk6.json', 'hsk7.json'];

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

// Format strict : hanzi (avec éventuellement ponctuation chinoise + espaces)
// puis tiret(s) puis pinyin (avec tons et lettres latines) puis tiret(s) puis
// traduction. Les tirets peuvent être suivis ou précédés d'espaces.
const MIX_RE = /^([一-鿿，。、！？：；""''（）《》〈〉【】「」\s]+)\s*[-—]+\s*(.+?)\s*[-—]+\s*(.+)$/;

/** True si la chaîne ne contient que des hanzi + ponctuation chinoise + espace. */
function isCleanHanzi(s) {
  return /^[一-鿿，。、！？：；""''（）《》〈〉【】「」\s]+$/.test(s);
}

/** True si la chaîne ressemble à du pinyin (lettres + tons + ponctuation latine). */
function looksLikePinyin(s) {
  // Au moins une voyelle accentuée OU le format "hanyu pinyin" sans accent
  return /[a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹṃ]/i.test(s);
}

function walkExamples(obj, onExample) {
  if (Array.isArray(obj)) {
    obj.forEach((v) => walkExamples(v, onExample));
    return;
  }
  if (obj && typeof obj === 'object') {
    if ('examples' in obj && Array.isArray(obj.examples)) {
      obj.examples.forEach((ex) => {
        if (ex && typeof ex === 'object' && typeof ex.chinese === 'string') {
          onExample(ex);
        }
      });
    }
    for (const k of Object.keys(obj)) {
      walkExamples(obj[k], onExample);
    }
  }
}

console.log(`Mode : ${WRITE ? 'WRITE' : 'DRY-RUN'}`);
console.log(`Source : ${DATA_DIR}\n`);

const ts = timestamp();
const fullReport = {
  generatedAt: new Date().toISOString(),
  mode: WRITE ? 'write' : 'dry-run',
  totalCleaned: 0,
  byFile: {}
};

for (const file of HSK_FILES) {
  const filePath = join(DATA_DIR, file);
  if (!existsSync(filePath)) continue;

  const raw = readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  const cleaned = [];

  walkExamples(data, (ex) => {
    const original = ex.chinese;
    const m = MIX_RE.exec(original);
    if (!m) return;
    const [, rawHanzi, rawPinyin, rawTrad] = m;
    const hanzi = rawHanzi.trim();
    const pinyin = rawPinyin.trim();
    const trad = rawTrad.trim();

    // Vérifications de sécurité — on n'écrase QUE si :
    // (1) le hanzi extrait est propre (pas de latin/ponct mélangée)
    // (2) le pinyin extrait ressemble vraiment à du pinyin
    if (!isCleanHanzi(hanzi)) return;
    if (!looksLikePinyin(pinyin)) return;

    const before = {
      chinese: ex.chinese,
      pinyin: ex.pinyin,
      translationFr: ex.translationFr
    };

    if (WRITE) {
      ex.chinese = hanzi;
      ex.pinyin = pinyin;
      // N'écrase translationFr que si vide — préserve les traductions déjà
      // saisies (qui peuvent être plus soignées que celle du format mix)
      if (!ex.translationFr || ex.translationFr.trim() === '') {
        ex.translationFr = trad;
      }
    }

    cleaned.push({
      before,
      after: {
        chinese: hanzi,
        pinyin: pinyin,
        translationFr: before.translationFr || trad
      }
    });
  });

  console.log(`${file}: ${cleaned.length} entrée(s) format mixte nettoyée(s)`);

  if (WRITE && cleaned.length > 0) {
    const bakPath = `${filePath}.bak.clean.${ts}`;
    copyFileSync(filePath, bakPath);
    writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`  → backup: ${bakPath.split('/').pop()}`);
    console.log(`  → écrit : ${file}`);
  }

  fullReport.byFile[file] = { count: cleaned.length, samples: cleaned.slice(0, 3) };
  fullReport.totalCleaned += cleaned.length;
}

writeFileSync(REPORT_PATH, JSON.stringify(fullReport, null, 2), 'utf8');
console.log(`\nTotal : ${fullReport.totalCleaned} entrée(s) nettoyée(s)`);
console.log(`Rapport : ${REPORT_PATH}`);

if (!WRITE) {
  console.log('\nPour appliquer : node scripts/clean-mixed-format-entries.mjs --write');
}
