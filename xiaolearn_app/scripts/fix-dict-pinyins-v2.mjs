/**
 * fix-dict-pinyins-v2.mjs
 * ------------------------
 * Version 2 du fix pinyins du dictionnaire — combine :
 *   - pinyin-pro pour le pinyin char-by-char AVEC contexte sentence-level
 *     (résolution polyphones bien meilleure que pypinyin : 弹三味线 → tán,
 *     行为 → xíngwéi, 银行 → yínháng, etc.)
 *   - @node-rs/jieba pour la segmentation par mots
 *     (使用 reconnu comme un mot, donc joint en "shǐyòng" pas "shǐ yòng")
 *
 * Sortie : pinyins groupés par mots, mots séparés par espaces, ponctuation
 * chinoise (，。) collée au mot précédent. Format pédagogiquement lisible.
 *
 * Usage :
 *   node scripts/fix-dict-pinyins-v2.mjs --dry-run
 *   node scripts/fix-dict-pinyins-v2.mjs --target=examples
 *   node scripts/fix-dict-pinyins-v2.mjs --target=all --confirm-entries
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Jieba } from '@node-rs/jieba';
import { dict } from '@node-rs/jieba/dict.js';
import { pinyin } from 'pinyin-pro';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Chargement segmenteur jieba (1x au démarrage, ~50ms)
const jieba = new Jieba();
jieba.loadDict(dict);

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const has = (n) => argv.includes(`--${n}`);
const val = (n) =>
  argv.find((a) => a.startsWith(`--${n}=`))?.slice(`--${n}=`.length);

const dryRun = has('dry-run');
const target = val('target') || 'examples';
const confirmEntries = has('confirm-entries');
// --root et --hsk-prefix : permettent de lancer sur un autre projet
//   --root=<absolute_path>   : root du projet (défaut = parent du script)
//   --hsk-prefix=<sub_dir>   : sous-dir où sont les HSK chunks
//                              app: 'dictionary/hsk', reference: 'hsk'
const rootArg = val('root');
const hskPrefix = val('hsk-prefix') || 'dictionary/hsk';
const ROOT = rootArg ? path.resolve(rootArg) : PROJECT_ROOT;

if (target !== 'examples' && target !== 'entries' && target !== 'all') {
  console.error(`❌ --target invalide : ${target}`);
  process.exit(1);
}
if ((target === 'entries' || target === 'all') && !confirmEntries && !dryRun) {
  console.error(
    `❌ Modifier les pinyins d'entrées (--target=${target}) requiert --confirm-entries.`
  );
  process.exit(2);
}

// ---------------------------------------------------------------------------
// Conversion pinyin canonique
// ---------------------------------------------------------------------------
const CJK = /[一-鿿]/;
// Ponctuation chinoise à coller au mot précédent
const PUNCT_AFTER = /^[，。！？、；：·…—""'')）》】]/;
const PUNCT_BEFORE = /[""''(（《【]$/;

function canonicalPinyin(text) {
  if (!text) return '';
  // 1) Pinyin par CJK char avec contexte plein de la phrase (mode 'removed'
  //    retourne uniquement les pinyins des CJK, dans l'ordre).
  const cjkPinyins = pinyin(text, {
    toneType: 'symbol',
    type: 'array',
    nonZh: 'removed'
  });
  // 2) Map index dans la string → pinyin (pour chars CJK uniquement)
  const chars = [...text];
  const idxToPy = new Map();
  let pi = 0;
  for (let i = 0; i < chars.length; i++) {
    if (CJK.test(chars[i]) && pi < cjkPinyins.length) {
      idxToPy.set(i, cjkPinyins[pi]);
      pi++;
    }
  }
  // 3) Segmente avec jieba
  const segs = jieba.cut(text);
  // 4) Walk segments, consommer chars correspondants.
  //    Important : un segment peut être MIXTE (CJK + non-CJK), ex "BP机" =
  //    jieba lump "BP" et "机" ensemble. On traite char par char dans ce cas
  //    pour ne perdre ni le "BP" ni le pinyin de 机.
  let pos = 0;
  const tokens = [];
  for (const seg of segs) {
    const segChars = [...seg];
    const hasCjk = CJK.test(seg);
    const hasNonCjk = segChars.some((c) => !CJK.test(c));
    if (hasCjk && !hasNonCjk) {
      // Segment 100% CJK → joindre les syllabes
      const sylls = [];
      for (let k = 0; k < segChars.length; k++) {
        const py = idxToPy.get(pos + k);
        if (py) sylls.push(py);
      }
      tokens.push(sylls.join(''));
    } else if (hasCjk && hasNonCjk) {
      // Segment mixte (BP机, J.K.罗琳…) → traite char par char
      let buffer = '';
      for (let k = 0; k < segChars.length; k++) {
        const c = segChars[k];
        if (CJK.test(c)) {
          buffer += idxToPy.get(pos + k) ?? '';
        } else {
          buffer += c;
        }
      }
      tokens.push(buffer);
    } else {
      // Segment 100% non-CJK : tel quel
      tokens.push(seg);
    }
    pos += segChars.length;
  }
  // 5) Recompose : tokens séparés par espace, mais ponctuation chinoise
  //    collée. On parcourt et joint intelligemment.
  let out = '';
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (!t) continue;
    if (i === 0) {
      out = t;
    } else if (PUNCT_AFTER.test(t) || PUNCT_BEFORE.test(tokens[i - 1] || '')) {
      out += t;
    } else if (out.endsWith(' ') || t.startsWith(' ')) {
      out += t;
    } else {
      out += ' ' + t;
    }
  }
  return out.replace(/\s+/g, ' ').trim();
}

// ---------------------------------------------------------------------------
// Compare en strict : on veut détecter les différences de format (espaces,
// regroupement par mots) en plus des divergences sémantiques. Sinon le
// reformat "shǐ yòng" → "shǐyòng" passe sous le radar.
// ---------------------------------------------------------------------------
function normCompare(s) {
  return (s ?? '').normalize('NFC').trim();
}

// ---------------------------------------------------------------------------
// Traite une liste d'entries
// ---------------------------------------------------------------------------
function processEntries(entries, samples) {
  let entriesFixed = 0;
  let examplesFixed = 0;
  for (const e of entries) {
    if (!e || typeof e !== 'object') continue;
    // Entry principale
    if ((target === 'entries' || target === 'all') && e.hanzi && CJK.test(e.hanzi)) {
      const canon = canonicalPinyin(e.hanzi);
      if (canon && normCompare(canon) !== normCompare(e.pinyin || '')) {
        if (samples.length < 8) {
          samples.push({ kind: 'entry', hanzi: e.hanzi, old: e.pinyin, new: canon });
        }
        e.pinyin = canon;
        entriesFixed++;
      }
    }
    // Examples
    if ((target === 'examples' || target === 'all') && Array.isArray(e.examples)) {
      for (const ex of e.examples) {
        if (!ex.chinese || !CJK.test(ex.chinese)) continue;
        const canon = canonicalPinyin(ex.chinese);
        if (!canon) continue;
        if (normCompare(canon) === normCompare(ex.pinyin || '')) continue;
        if (samples.length < 8) {
          samples.push({
            kind: 'example',
            chinese: ex.chinese.slice(0, 60),
            old: (ex.pinyin || '').slice(0, 80),
            new: canon.slice(0, 80)
          });
        }
        ex.pinyin = canon;
        examplesFixed++;
      }
    }
  }
  return { entriesFixed, examplesFixed };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  console.log(`🔧 Fix pinyins v2 (jieba + pinyin-pro)${dryRun ? ' · DRY-RUN' : ''}`);
  console.log(`   Cible : ${target}`);
  console.log('');

  let totalEntries = 0;
  let totalExamples = 0;
  const samples = [];

  console.log(`   Root : ${ROOT}`);
  console.log(`   HSK prefix : ${hskPrefix}`);
  console.log('');

  // Helper : détecte automatiquement le format (array vs dict { id: entry })
  // et applique processEntries sur les valeurs. Écrit en préservant le format.
  function processChunkFile(fp) {
    const raw = JSON.parse(fs.readFileSync(fp, 'utf8'));
    const isArray = Array.isArray(raw);
    const entries = isArray ? raw : Object.values(raw);
    const r = processEntries(entries, samples);
    if (!dryRun && (r.entriesFixed > 0 || r.examplesFixed > 0)) {
      fs.writeFileSync(fp, JSON.stringify(raw));
    }
    return r;
  }

  // Hors-HSK
  const horsHskDir = path.join(ROOT, 'public', 'data', 'hors-hsk');
  console.log('📖 Hors-HSK');
  const horsHskChunks = fs
    .readdirSync(horsHskDir)
    .filter((f) => f.startsWith('chunk-') && f.endsWith('.json'))
    .sort();
  for (const c of horsHskChunks) {
    const fp = path.join(horsHskDir, c);
    const { entriesFixed, examplesFixed } = processChunkFile(fp);
    totalEntries += entriesFixed;
    totalExamples += examplesFixed;
    if (entriesFixed > 0 || examplesFixed > 0) {
      console.log(`   ${c}: ${entriesFixed} entrée(s), ${examplesFixed} exemple(s)`);
    }
  }

  // HSK
  const hskRoot = path.join(ROOT, 'public', 'data', ...hskPrefix.split('/'));
  for (const lvl of ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7']) {
    const dir = path.join(hskRoot, lvl);
    if (!fs.existsSync(dir)) continue;
    console.log(`📚 ${lvl}`);
    const chunks = fs
      .readdirSync(dir)
      .filter((f) => f.startsWith('chunk-') && f.endsWith('.json'))
      .sort();
    for (const c of chunks) {
      const fp = path.join(dir, c);
      const { entriesFixed, examplesFixed } = processChunkFile(fp);
      totalEntries += entriesFixed;
      totalExamples += examplesFixed;
      if (entriesFixed > 0 || examplesFixed > 0) {
        console.log(`   ${c}: ${entriesFixed} entrée(s), ${examplesFixed} exemple(s)`);
      }
    }
  }

  console.log('');
  console.log(`Résumé :`);
  console.log(`  Entrées corrigées : ${totalEntries}`);
  console.log(`  Exemples corrigés : ${totalExamples}`);
  console.log('');
  if (samples.length > 0) {
    console.log('Exemples de modifications :');
    for (const s of samples) {
      console.log(`  [${s.kind}] ${s.hanzi || s.chinese}`);
      console.log(`    avant : ${s.old}`);
      console.log(`    après : ${s.new}`);
    }
  }
}

main();
