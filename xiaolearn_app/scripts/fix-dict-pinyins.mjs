/**
 * fix-dict-pinyins.mjs
 * ---------------------
 * Régénère les pinyins défaillants dans les chunks du dictionnaire CFDICT.
 *
 * Contexte : audit a montré
 *   - Entrées principales : ~4 % de divergences vs pinyin canonique
 *   - Exemples (phrases) : ~99 % de divergences (transcription erronée
 *     par l'outil source à l'origine du dataset).
 *
 * Ce script utilise `pinyin-pro` (déjà en dépendance) pour générer le
 * pinyin canonique avec tons à partir des hanzi. Trois modes :
 *
 *   --target=examples (défaut) : ne touche QUE aux exemples (gain maximal,
 *                                risque minimal de casser des entrées dont
 *                                la lecture stockée est correcte mais rare).
 *   --target=entries           : régénère le pinyin principal de chaque
 *                                entrée (à utiliser avec --confirm-entries
 *                                car risque de perdre des lectures rares).
 *   --target=all               : les deux.
 *   --dry-run                  : montre ce qui serait changé sans écrire.
 *   --report=path.json         : exporte un rapport JSON des modifications.
 *
 * Usage :
 *   node scripts/fix-dict-pinyins.mjs --dry-run
 *   node scripts/fix-dict-pinyins.mjs --target=examples
 *   node scripts/fix-dict-pinyins.mjs --target=all --confirm-entries
 *
 * Sortie : modifie les chunks `public/data/hors-hsk/chunk-*.json` (et
 * éventuellement HSK) en place. Garde les autres champs (translationFr,
 * audio, examples translation, etc.) intacts.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pinyin } from 'pinyin-pro';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const has = (name) => argv.includes(`--${name}`);
const getVal = (name) =>
  argv.find((a) => a.startsWith(`--${name}=`))?.slice(`--${name}=`.length);

const dryRun = has('dry-run');
const target = getVal('target') || 'examples';
const confirmEntries = has('confirm-entries');
const reportPath = getVal('report');

if (target !== 'examples' && target !== 'entries' && target !== 'all') {
  console.error(`❌ --target invalide : ${target}. Valeurs : examples | entries | all`);
  process.exit(1);
}
if ((target === 'entries' || target === 'all') && !confirmEntries && !dryRun) {
  console.error(
    `❌ Modifier les pinyins d'entrées (--target=${target}) écrase potentiellement\n` +
      `   des lectures rares valides. Ajoute --confirm-entries pour confirmer,\n` +
      `   ou utilise --dry-run pour prévisualiser sans toucher au disque.`
  );
  process.exit(2);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const CJK_RE = /[一-鿿]/;

/** Pinyin canonique avec tons (ex: "我爱你" → "wǒ ài nǐ"). */
function canonicalPinyin(hanzi) {
  if (!hanzi || !CJK_RE.test(hanzi)) return '';
  // pinyin-pro retourne un string séparé par espaces. Pour les chars non-CJK
  // (ponctuation, latin), on les ignore en activant nonZh: 'consecutive'.
  return pinyin(hanzi, {
    toneType: 'symbol',
    type: 'string',
    nonZh: 'consecutive',
    v: false
  })
    .replace(/\s+/g, ' ')
    .trim();
}

/** Normalise pour comparaison : sans diacritiques, sans espaces, casse. */
function normCompare(s) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '')
    .toLowerCase();
}

// ---------------------------------------------------------------------------
// Process chunks
// ---------------------------------------------------------------------------
function processChunk(filePath, isHorsHsk) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const entries = isHorsHsk ? data : Object.values(data);
  let entriesFixed = 0;
  let examplesFixed = 0;
  const samples = [];

  for (const e of entries) {
    if (!e || typeof e !== 'object') continue;

    // 1. Pinyin de l'entrée principale
    if ((target === 'entries' || target === 'all') && e.hanzi && CJK_RE.test(e.hanzi)) {
      const canon = canonicalPinyin(e.hanzi);
      if (canon && normCompare(canon) !== normCompare(e.pinyin || '')) {
        if (samples.length < 5) {
          samples.push({ kind: 'entry', hanzi: e.hanzi, old: e.pinyin, new: canon });
        }
        e.pinyin = canon;
        entriesFixed++;
      }
    }

    // 2. Pinyin des exemples
    if ((target === 'examples' || target === 'all') && Array.isArray(e.examples)) {
      for (const ex of e.examples) {
        if (!ex.chinese || !CJK_RE.test(ex.chinese)) continue;
        const canon = canonicalPinyin(ex.chinese);
        if (!canon) continue;
        if (normCompare(canon) === normCompare(ex.pinyin || '')) continue;
        if (samples.length < 5) {
          samples.push({
            kind: 'example',
            chinese: ex.chinese,
            old: ex.pinyin,
            new: canon
          });
        }
        ex.pinyin = canon;
        examplesFixed++;
      }
    }
  }

  return { entries, entriesFixed, examplesFixed, samples };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  console.log(`🔧 Fix pinyins dictionary${dryRun ? ' · DRY-RUN' : ''}`);
  console.log(`   Cible : ${target}`);
  console.log('');

  let totalEntries = 0;
  let totalExamples = 0;
  const reportEntries = [];
  const reportExamples = [];
  let firstSamples = [];

  // Hors-HSK : 110 chunks au format array
  const horsHskChunks = fs
    .readdirSync(path.join(PROJECT_ROOT, 'public', 'data', 'hors-hsk'))
    .filter((f) => f.startsWith('chunk-') && f.endsWith('.json'))
    .sort();

  console.log(`📖 Hors-HSK : ${horsHskChunks.length} chunks`);
  for (const c of horsHskChunks) {
    const fp = path.join(PROJECT_ROOT, 'public', 'data', 'hors-hsk', c);
    const result = processChunk(fp, true);
    if (!dryRun && (result.entriesFixed > 0 || result.examplesFixed > 0)) {
      fs.writeFileSync(fp, JSON.stringify(result.entries, null, 0));
    }
    totalEntries += result.entriesFixed;
    totalExamples += result.examplesFixed;
    if (firstSamples.length < 8) {
      firstSamples = firstSamples.concat(result.samples).slice(0, 8);
    }
    if (result.entriesFixed > 0 || result.examplesFixed > 0) {
      console.log(
        `   ${c}: ${result.entriesFixed} entrée(s), ${result.examplesFixed} exemple(s)`
      );
    }
  }

  // HSK : chunks au format map { id: entry }. On traite TOUJOURS les HSK
  // pour les exemples (gros volume ~22k), et SI demandé pour les entrées.
  {
    const hskLevels = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7'];
    for (const lvl of hskLevels) {
      const dir = path.join(PROJECT_ROOT, 'public', 'data', 'dictionary', 'hsk', lvl);
      if (!fs.existsSync(dir)) continue;
      const chunks = fs
        .readdirSync(dir)
        .filter((f) => f.startsWith('chunk-') && f.endsWith('.json'))
        .sort();
      console.log(`📚 ${lvl} : ${chunks.length} chunks`);
      for (const c of chunks) {
        const fp = path.join(dir, c);
        const raw = JSON.parse(fs.readFileSync(fp, 'utf8'));
        let entriesFixed = 0;
        let examplesFixed = 0;
        for (const e of Object.values(raw)) {
          // Pinyin entrée : seulement si target = entries|all
          if (
            (target === 'entries' || target === 'all') &&
            e.hanzi &&
            CJK_RE.test(e.hanzi)
          ) {
            const canon = canonicalPinyin(e.hanzi);
            if (canon && normCompare(canon) !== normCompare(e.pinyin || '')) {
              e.pinyin = canon;
              entriesFixed++;
            }
          }
          // Pinyin exemples : si target = examples|all
          if ((target === 'examples' || target === 'all') && Array.isArray(e.examples)) {
            for (const ex of e.examples) {
              if (!ex.chinese || !CJK_RE.test(ex.chinese)) continue;
              const canon = canonicalPinyin(ex.chinese);
              if (canon && normCompare(canon) !== normCompare(ex.pinyin || '')) {
                ex.pinyin = canon;
                examplesFixed++;
              }
            }
          }
        }
        if (!dryRun && (entriesFixed > 0 || examplesFixed > 0)) {
          fs.writeFileSync(fp, JSON.stringify(raw, null, 0));
        }
        totalEntries += entriesFixed;
        totalExamples += examplesFixed;
        if (entriesFixed > 0 || examplesFixed > 0) {
          console.log(`   ${c}: ${entriesFixed} entrée(s), ${examplesFixed} exemple(s)`);
        }
      }
    }
  }

  console.log('');
  console.log(`Résumé :`);
  console.log(`  Entrées corrigées : ${totalEntries}`);
  console.log(`  Exemples corrigés : ${totalExamples}`);
  console.log('');
  if (firstSamples.length > 0) {
    console.log(`Exemples de modifications :`);
    for (const s of firstSamples) {
      console.log(`  [${s.kind}] ${s.hanzi || s.chinese}`);
      console.log(`    avant : ${s.old}`);
      console.log(`    après : ${s.new}`);
    }
  }
}

main();
