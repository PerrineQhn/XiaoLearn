/**
 * regen-example-pinyins.mjs
 * -------------------------
 * Régénère TOUS les `examples[].pinyin` (et top-level `pinyin`) des JSON
 * dictionnaire HSK depuis le hanzi via pinyin-pro + jieba :
 *
 *   - Convertit hanzi traditionnel → simplifié via OpenCC
 *   - Génère le pinyin accentué (toneType: 'symbol') word-by-word avec jieba
 *   - Polyphone overrides : 了 → le (jamais liǎo), 着 → zhe, etc.
 *
 * Utilisation :
 *   node scripts/regen-example-pinyins.mjs              # dry-run
 *   node scripts/regen-example-pinyins.mjs --apply      # write changes
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Jieba } from '@node-rs/jieba';
import { dict } from '@node-rs/jieba/dict.js';
import { pinyin } from 'pinyin-pro';
import * as OpenCC from 'opencc-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const APPLY = process.argv.includes('--apply');

// Setup
const jieba = new Jieba();
jieba.loadDict(dict);
const t2s = OpenCC.Converter({ from: 'tw', to: 'cn' }); // traditional → simplified

const PUNCT_MAP = {
  '，': ',', '。': '.', '！': '!', '？': '?', '；': ';', '：': ':',
  '「': '"', '」': '"', '『': '"', '』': '"',
  '、': ',', '·': '·'
};

const CJK_RE = /[一-鿿㐀-䶿]/;
const ANY_CJK_RE = /[一-鿿㐀-䶿]/g;

/** Génère le pinyin accentué pour un hanzi/phrase via jieba + pinyin-pro. */
function generatePinyin(hanzi) {
  const cleaned = hanzi.trim();
  if (!cleaned) return '';
  const segments = jieba.cut(cleaned, false);
  const parts = [];
  for (const seg of segments) {
    if (!seg) continue;
    if (PUNCT_MAP[seg]) {
      if (parts.length > 0) parts[parts.length - 1] += PUNCT_MAP[seg];
      else parts.push(PUNCT_MAP[seg]);
      continue;
    }
    if (CJK_RE.test(seg)) {
      const py = pinyin(seg, {
        toneType: 'symbol',
        type: 'string',
        separator: '',
        nonZh: 'consecutive'
      });
      parts.push(py);
    } else if (parts.length > 0 && seg.trim()) {
      parts[parts.length - 1] += seg;
    }
  }
  let result = parts.join(' ').trim();

  // Polyphone overrides
  if (cleaned.includes('了') && !cleaned.includes('了解')) {
    result = result.replace(/\bliǎo\b/gi, 'le');
  }
  if (cleaned.includes('着') && !/着急|睡着|找着/.test(cleaned)) {
    result = result.replace(/\bzháo\b/gi, 'zhe');
  }
  return result;
}

/** Convertit hanzi traditional → simplified. Sûr et idempotent. */
function simplify(s) {
  if (!s) return s;
  return t2s(s);
}

/** Compare 2 pinyin (normalisés sans casing/espaces/accents). */
function pinyinEquiv(a, b) {
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ\s.,!?;:'"]/g, '');
  return norm(a) === norm(b);
}

/** Heuristique : le pinyin est "clairement faux" et mérite une regen :
 *   - tone-numeric (wo3, chi2, fan1...)
 *   - ne contient AUCUN ton mark mais le hanzi est ≥ 2 chars
 *   - longueur de syllabes très différente du compte CJK (phantom syl ou missing) */
function needsRegen(hanzi, currentPinyin) {
  if (!currentPinyin) return true;
  // Tone numbers attachés à des lettres = pinyin numérique invalide
  if (/[a-z][1-5]\b/i.test(currentPinyin)) return true;
  // Aucun tone mark dans le pinyin alors que le hanzi a des caractères
  const hasToneMark = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/i.test(currentPinyin);
  const cjkCount = (hanzi.match(ANY_CJK_RE) || []).length;
  if (!hasToneMark && cjkCount >= 2) return true;
  // Compte syllabes ~ compte CJK (tolérance large : ±40%)
  const sylCount = (currentPinyin.match(/[aeiouāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+/gi) || []).length;
  if (cjkCount >= 3 && (sylCount < cjkCount * 0.6 || sylCount > cjkCount * 1.5)) return true;
  return false;
}

let totalHanziSimplified = 0;
let totalPinyinRegen = 0;
let filesModified = 0;

function patchExamplesIn(obj) {
  if (!obj || typeof obj !== 'object') return false;
  let mutated = false;
  if (Array.isArray(obj)) {
    for (const it of obj) if (patchExamplesIn(it)) mutated = true;
    return mutated;
  }
  // top-level: hanzi + pinyin couple
  if (typeof obj.hanzi === 'string' && typeof obj.pinyin === 'string') {
    const simp = simplify(obj.hanzi);
    if (simp !== obj.hanzi) {
      obj.hanzi = simp;
      totalHanziSimplified++;
      mutated = true;
    }
    // Regen pinyin SEULEMENT si needsRegen() OU si on a simplifié le hanzi
    if (needsRegen(obj.hanzi, obj.pinyin) || simp !== obj.hanzi) {
      const newPy = generatePinyin(obj.hanzi);
      if (newPy && !pinyinEquiv(newPy, obj.pinyin)) {
        obj.pinyin = newPy;
        totalPinyinRegen++;
        mutated = true;
      }
    }
  }
  // examples[] structures
  if (Array.isArray(obj.examples)) {
    for (const ex of obj.examples) {
      if (!ex || typeof ex !== 'object') continue;
      const ch = ex.chinese || ex.hanzi;
      if (typeof ch !== 'string') continue;
      const simp = simplify(ch);
      const wasSimp = simp !== ch;
      if (wasSimp) {
        if ('chinese' in ex) ex.chinese = simp;
        if ('hanzi' in ex) ex.hanzi = simp;
        totalHanziSimplified++;
        mutated = true;
      }
      // Regen pinyin SEULEMENT si needsRegen() OU si on a simplifié
      const currentPy = ex.pinyin || '';
      if (needsRegen(simp, currentPy) || wasSimp || !currentPy) {
        const newPy = generatePinyin(simp);
        if (newPy && !pinyinEquiv(newPy, currentPy)) {
          ex.pinyin = newPy;
          totalPinyinRegen++;
          mutated = true;
        }
      }
    }
  }
  // Recurse
  for (const k of Object.keys(obj)) {
    if (k === 'examples') continue;
    const v = obj[k];
    if (v && typeof v === 'object') {
      if (patchExamplesIn(v)) mutated = true;
    }
  }
  return mutated;
}

// Collect JSON files
const candidates = [];
for (const dir of ['public/data', 'data']) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) continue;
  const walk = (d) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.isFile() && entry.name.endsWith('.json')) candidates.push(p);
    }
  };
  walk(abs);
}

console.log(`Scanning ${candidates.length} JSON files...`);
for (const f of candidates) {
  let data;
  try { data = JSON.parse(fs.readFileSync(f, 'utf-8')); }
  catch { continue; }
  const before = JSON.stringify(data);
  patchExamplesIn(data);
  const after = JSON.stringify(data);
  if (before !== after) {
    filesModified++;
    if (APPLY) {
      fs.writeFileSync(f, JSON.stringify(data, null, 2));
    }
    console.log(`  ${APPLY ? '✏️' : '👁'}  ${path.relative(ROOT, f)}`);
  }
}

console.log(`\n=== Total ===`);
console.log(`Hanzi simplified : ${totalHanziSimplified}`);
console.log(`Pinyin regenerated: ${totalPinyinRegen}`);
console.log(`Files modified   : ${filesModified}`);
console.log(APPLY ? '\n✅ Applied' : '\n👁  Dry-run only (use --apply to write)');
