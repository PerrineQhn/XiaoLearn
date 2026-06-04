/**
 * fix-pinyin-polyphone-overrides.mjs
 * -----------------------------------
 * Applique des corrections ciblées sur des polyphones contextuels que
 * pinyin-pro et jieba ne résolvent pas correctement à 100%.
 *
 * Stratégie : pour chaque pattern (chinois → pinyin attendu), on regarde
 * les exemples qui contiennent le pattern chinois ET dont le pinyin contient
 * la version erronée → on remplace par la version correcte.
 *
 * Très conservateur : on ne touche QUE si à la fois le hanzi et le pinyin
 * matchent les conditions. Pas de faux positifs.
 *
 * Usage :
 *   node scripts/fix-pinyin-polyphone-overrides.mjs --dry-run
 *   node scripts/fix-pinyin-polyphone-overrides.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const dryRun = process.argv.includes('--dry-run');

/**
 * Liste des règles polyphones. Chaque entrée :
 *   - hanzi   : sous-chaîne chinoise à chercher dans `chinese` (déclencheur)
 *   - wrong   : pinyin incorrect actuel (recherche substring sur pinyin)
 *   - right   : pinyin correct à substituer (à la place de `wrong`)
 *   - note    : explication
 */
const RULES = [
  // 朝鲜 (Korea) : pinyin-pro lit cháoxiān, doit être cháoxiǎn
  {
    hanzi: '朝鲜',
    wrong: 'cháoxiān',
    right: 'cháoxiǎn',
    note: '朝鲜 (Corée) — proper noun, lecture xiǎn (pas xiān)'
  },
  // 朝鲜族 → cháoxiǎnzú aussi
  {
    hanzi: '朝鲜族',
    wrong: 'cháoxiānzú',
    right: 'cháoxiǎnzú',
    note: '朝鲜族 (ethnie coréenne)'
  },
  // 北朝鲜, 南朝鲜
  {
    hanzi: '朝鲜',
    wrong: 'Cháoxiān',
    right: 'Cháoxiǎn',
    note: '朝鲜 capitalisé'
  },

  // 地 particule adverbiale : après 然 (chengyu adverbe)
  // Ex: 不以为然地, 突然地, 当然地, 自然地, 显然地, 油然地
  // Pattern: "然地" → 然 + 地 (de, particule), pas dì (terre)
  // Mais "然 + 地球" reste dì. On scope la recherche.
  // Strat : si "然 dì" apparaît dans le pinyin et le hanzi contient "然地" PAS suivi de 球/方/区/...
  // Simplification : on remplace seulement "rán dì" → "rán de" quand le hanzi contient "然地" mais
  // ne contient PAS "然地球", "然地方", "然地下", "然地区", "然地震", "然地址", "然地理"
  {
    hanzi: '然地',
    hanziExcludes: ['然地球', '然地方', '然地下', '然地区', '然地震', '然地址', '然地理', '然地图', '然地形'],
    wrong: 'rán dì',
    right: 'rán de',
    note: '然地 = chengyu+地 particule adverbiale (de), pas dì'
  },

  // 漫长地, 悄悄地, 渐渐地, 慢慢地, 默默地 — pattern reduplication+地 → de
  {
    hanzi: '悄悄地',
    wrong: 'qiāoqiāo dì',
    right: 'qiāoqiāo de',
    note: '悄悄地 — adverbial de'
  },
  {
    hanzi: '慢慢地',
    wrong: 'mànmàn dì',
    right: 'mànmàn de',
    note: '慢慢地 — adverbial de'
  },
  {
    hanzi: '渐渐地',
    wrong: 'jiànjiàn dì',
    right: 'jiànjiàn de',
    note: '渐渐地 — adverbial de'
  },
  {
    hanzi: '默默地',
    wrong: 'mòmò dì',
    right: 'mòmò de',
    note: '默默地 — adverbial de'
  },
  {
    hanzi: '渐渐地',
    wrong: 'jiànjiàn dì',
    right: 'jiànjiàn de',
    note: '渐渐地 — adverbial de'
  },
  {
    hanzi: '深深地',
    wrong: 'shēnshēn dì',
    right: 'shēnshēn de',
    note: '深深地 — adverbial de'
  },
  {
    hanzi: '紧紧地',
    wrong: 'jǐnjǐn dì',
    right: 'jǐnjǐn de',
    note: '紧紧地 — adverbial de'
  },
  {
    hanzi: '远远地',
    wrong: 'yuǎnyuǎn dì',
    right: 'yuǎnyuǎn de',
    note: '远远地 — adverbial de'
  }
];

// ---------------------------------------------------------------------------
function applyRules(text, py, samples) {
  let newPy = py;
  let changed = false;
  for (const rule of RULES) {
    if (!text.includes(rule.hanzi)) continue;
    if (rule.hanziExcludes?.some((ex) => text.includes(ex))) continue;
    if (!newPy.includes(rule.wrong)) continue;
    // Remplace toutes les occurrences
    const before = newPy;
    newPy = newPy.split(rule.wrong).join(rule.right);
    if (before !== newPy) {
      changed = true;
      if (samples.length < 8) {
        samples.push({
          hanzi: text.slice(0, 60),
          before: before.slice(0, 100),
          after: newPy.slice(0, 100),
          rule: rule.note
        });
      }
    }
  }
  return { newPy, changed };
}

function processFile(fp, isMap) {
  const raw = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const entries = isMap ? Object.values(raw) : raw;
  let n = 0;
  const samples = [];
  for (const e of entries) {
    if (!e || typeof e !== 'object') continue;
    // Entry pinyin
    if (e.hanzi && e.pinyin) {
      const { newPy, changed } = applyRules(e.hanzi, e.pinyin, samples);
      if (changed) {
        e.pinyin = newPy;
        n++;
      }
    }
    // Examples pinyin
    for (const ex of e.examples ?? []) {
      if (!ex.chinese || !ex.pinyin) continue;
      const { newPy, changed } = applyRules(ex.chinese, ex.pinyin, samples);
      if (changed) {
        ex.pinyin = newPy;
        n++;
      }
    }
  }
  if (!dryRun && n > 0) {
    fs.writeFileSync(fp, JSON.stringify(raw));
  }
  return { n, samples };
}

function main() {
  console.log(`🔧 Polyphone overrides${dryRun ? ' · DRY-RUN' : ''}`);
  console.log(`   Règles : ${RULES.length}`);
  console.log('');

  let total = 0;
  const allSamples = [];

  // Hors-HSK
  const horshskDir = path.join(PROJECT_ROOT, 'public', 'data', 'hors-hsk');
  for (const c of fs
    .readdirSync(horshskDir)
    .filter((f) => f.startsWith('chunk-') && f.endsWith('.json'))
    .sort()) {
    const fp = path.join(horshskDir, c);
    const { n, samples } = processFile(fp, false);
    total += n;
    if (n > 0) console.log(`   hors-hsk/${c}: ${n}`);
    if (allSamples.length < 8) {
      allSamples.push(...samples);
    }
  }

  // HSK
  const hskRoot = path.join(PROJECT_ROOT, 'public', 'data', 'dictionary', 'hsk');
  for (const lvl of ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7']) {
    const dir = path.join(hskRoot, lvl);
    if (!fs.existsSync(dir)) continue;
    for (const c of fs
      .readdirSync(dir)
      .filter((f) => f.startsWith('chunk-') && f.endsWith('.json'))
      .sort()) {
      const fp = path.join(dir, c);
      const { n, samples } = processFile(fp, true);
      total += n;
      if (n > 0) console.log(`   ${lvl}/${c}: ${n}`);
      if (allSamples.length < 8) {
        allSamples.push(...samples);
      }
    }
  }

  console.log('');
  console.log(`Résumé : ${total} pinyin(s) corrigé(s)`);
  console.log('');
  if (allSamples.length > 0) {
    console.log('Exemples :');
    for (const s of allSamples.slice(0, 8)) {
      console.log(`  [${s.rule}]`);
      console.log(`    ${s.hanzi}`);
      console.log(`    avant : ${s.before}`);
      console.log(`    après : ${s.after}`);
    }
  }
}

main();
