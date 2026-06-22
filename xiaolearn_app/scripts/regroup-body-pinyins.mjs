#!/usr/bin/env node
/**
 * regroup-body-pinyins.mjs
 * -----------------------
 * Scanne tous les fichiers .ts de src/data/ et regroupe les pinyins
 * parenthésés qui sont séparés par espace alors qu'ils correspondent à un
 * mot reconnu du dictionnaire de segmentation (HSK 1-7 + CFDICT).
 *
 *   Avant : 妈妈 (mā ma) → Après : 妈妈 (māma)
 *   Avant : 你好 (nǐ hǎo) → Après : 你好 (nǐhǎo)
 *   Avant : 我去学校 (wǒ qù xué xiào) → Après : 我去学校 (wǒ qù xuéxiào)
 *
 * Conserve l'espace ENTRE deux mots distincts (mots simples groupés par
 * segment, plusieurs mots = espace entre).
 *
 * Usage :
 *   node scripts/regroup-body-pinyins.mjs [--dry-run]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pinyin } from 'pinyin-pro';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const DRY = process.argv.includes('--dry-run');

// Charge le dict de segmentation (HSK + CFDICT) — copie minimale de la
// logique de AutoPinyin.tsx pour rester cohérent.
const SEGMENT_DICT = new Set(
  JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'pinyin-segment-dict.json'), 'utf8'))
);
const cfdict = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, 'cfdict-compact.json'), 'utf8')
);
const MAX_WORD_LEN = 4;
for (const k of Object.keys(cfdict)) {
  if (k.length >= 2 && k.length <= MAX_WORD_LEN && /^[一-鿿]+$/.test(k)) {
    SEGMENT_DICT.add(k);
  }
}

const ERHUA_NO_FUSION = new Set([
  '女儿', '育儿', '婴儿', '孤儿', '男儿', '幼儿', '健儿',
  '儿戏', '儿童', '儿子', '儿女', '儿歌', '儿科', '儿时'
]);

function segmentHanziRun(text) {
  const out = [];
  let i = 0;
  while (i < text.length) {
    let matched = false;
    const maxLen = Math.min(MAX_WORD_LEN, text.length - i);
    for (let len = maxLen; len >= 2; len--) {
      const word = text.slice(i, i + len);
      if (SEGMENT_DICT.has(word)) {
        out.push(word);
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      out.push(text[i]);
      i++;
    }
  }
  return out;
}

function applyErhua(word, py) {
  if (word.length < 2 || !word.endsWith('儿')) return py;
  if (ERHUA_NO_FUSION.has(word)) return py;
  if (py.endsWith('ér')) return py.slice(0, -2) + 'r';
  if (py.endsWith('er')) return py.slice(0, -2) + 'r';
  return py;
}

/** Génère le pinyin attendu pour un run de hanzi, groupé par mots. */
function expectedPinyin(hanzi) {
  const segments = segmentHanziRun(hanzi);
  return segments
    .map((seg) => {
      const raw = pinyin(seg, {
        toneType: 'symbol',
        type: 'string',
        separator: '',
        nonZh: 'consecutive'
      }).trim();
      return applyErhua(seg, raw);
    })
    .filter(Boolean)
    .join(' ');
}

/** Compare un pinyin écrit à son pinyin attendu : normalise pour ignorer
 *  les variations mineures (capitalisation, ponctuation, espaces extras). */
function pinyinsMatch(written, expected) {
  const norm = (s) => s.toLowerCase().replace(/\s+/g, '').replace(/[''’]/g, '');
  return norm(written) === norm(expected);
}

/** Détecte si une string ressemble à du pinyin pur (lettres + tons). */
function looksLikePinyin(s) {
  const t = s.trim();
  if (!t || t.length > 80) return false;
  if (!/^[a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹńŋ'’\s\d]+$/.test(t)) return false;
  return /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹ]/.test(t) || /[a-z]+[1-5]/.test(t);
}

// Pattern : un run de hanzi consécutifs suivi (avec espace optionnel) d'une
// parenthèse contenant du pinyin.
const PATTERN = /([一-鿿]+)\s*\(([^)]+)\)/g;

function fixBody(text) {
  let changed = 0;
  const out = text.replace(PATTERN, (m, hanzi, parens) => {
    if (!looksLikePinyin(parens)) return m;
    const expected = expectedPinyin(hanzi);
    if (!expected) return m;
    // Si le pinyin écrit (en normalisant) correspond au attendu (groupé) →
    // on remplace par le format attendu (qui peut être plus groupé que l'écrit).
    if (!pinyinsMatch(parens, expected)) return m;
    if (parens.trim() === expected) return m; // déjà OK
    changed++;
    return `${hanzi} (${expected})`;
  });
  return { out, changed };
}

const files = fs
  .readdirSync(DATA_DIR)
  .filter((f) => f.endsWith('.ts'))
  .map((f) => path.join(DATA_DIR, f));

let totalChanges = 0;
let filesChanged = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const { out, changed } = fixBody(content);
  if (changed > 0) {
    if (!DRY) fs.writeFileSync(file, out);
    filesChanged++;
    totalChanges += changed;
    console.log(`  ${changed.toString().padStart(4)} fix${changed > 1 ? 'es' : ''}  ${path.basename(file)}`);
  }
}

console.log('');
console.log(`✨ ${totalChanges} pinyins regroupés dans ${filesChanged} fichier${filesChanged > 1 ? 's' : ''}.`);
if (DRY) console.log('(--dry-run : aucun fichier modifié)');
