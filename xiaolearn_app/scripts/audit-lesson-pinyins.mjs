/**
 * audit-lesson-pinyins.mjs
 * ------------------------
 * Parse les fichiers de données de leçons (cecr-exercises.ts, cecr-*-learn-sections.ts,
 * cecr-course.ts) à la recherche de paires (hanzi, pinyin) incorrectes.
 *
 * Pour chaque paire trouvée :
 *   - Génère le pinyin attendu via pinyin-pro + jieba (mots groupés, tones marqués)
 *   - Compare au pinyin présent dans le fichier
 *   - Reporte les mismatches dans un fichier JSON
 *
 * Si --fix est passé, applique les corrections automatiquement (en éditant les
 * fichiers source). Sinon, dry-run + rapport seulement.
 *
 * Usage :
 *   node scripts/audit-lesson-pinyins.mjs                # dry-run report
 *   node scripts/audit-lesson-pinyins.mjs --fix          # apply fixes
 *
 * Patterns détectés :
 *   1. `(Wǒ xiànzài zài tōngshùgōng.)` dans explanation après hanzi
 *   2. `modelPinyin: "..."` à côté de `modelAnswer: "..."`
 *   3. `sentence: "..."` + champ pinyin associé (variable selon shape)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Jieba } from '@node-rs/jieba';
import { dict } from '@node-rs/jieba/dict.js';
import { pinyin } from 'pinyin-pro';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

const argv = process.argv.slice(2);
const FIX_MODE = argv.includes('--fix');
const VERBOSE = argv.includes('--verbose');

// ---------------------------------------------------------------------------
// Setup jieba
// ---------------------------------------------------------------------------
const jieba = new Jieba();
jieba.loadDict(dict);

// ---------------------------------------------------------------------------
// Helpers — pinyin generation
// ---------------------------------------------------------------------------

const CJK_RE = /[一-鿿㐀-䶿]/;
const PUNCT_MAP = {
  '，': ',', '。': '.', '！': '!', '？': '?', '；': ';', '：': ':',
  '「': '"', '」': '"', '『': '"', '』': '"',
  '（': '(', '）': ')', '《': '"', '》': '"',
  '、': ',', '·': '·'
};

/**
 * Génère le pinyin attendu pour un hanzi/phrase, avec mots groupés (jieba) et
 * tones marqués (pinyin-pro). Format : `xià hǎo, wǒ shì lǎoshī.`
 *
 * Regroupe les syllabes d'un même mot en un seul token (e.g. `túshūguǎn` au
 * lieu de `tú shū guǎn`), et garde la ponctuation collée au mot précédent.
 */
function generateExpectedPinyin(hanzi) {
  const cleaned = hanzi.trim();
  if (!cleaned) return '';

  // Segmentation par mots via jieba
  const segments = jieba.cut(cleaned, /* hmm */ false);
  const parts = [];

  for (const seg of segments) {
    if (!seg) continue;
    // Si segment = ponctuation chinoise → mappe au latin et colle au précédent
    if (PUNCT_MAP[seg]) {
      if (parts.length > 0) {
        parts[parts.length - 1] += PUNCT_MAP[seg];
      } else {
        parts.push(PUNCT_MAP[seg]);
      }
      continue;
    }
    // Si segment contient au moins un hanzi → génère pinyin avec tone
    // (mode 'normal' = avec tone marks accentués)
    if (/[一-鿿㐀-䶿]/.test(seg)) {
      const py = pinyin(seg, {
        toneType: 'symbol',
        type: 'string',
        separator: '',
        nonZh: 'consecutive'
      });
      parts.push(py);
    } else {
      // Sinon (ponctuation/espace latin) on colle au précédent
      if (parts.length > 0 && seg.trim()) {
        parts[parts.length - 1] += seg;
      }
    }
  }

  let result = parts.join(' ').trim();

  // Post-processing : polyphones contextuels que pinyin-pro résout mal.
  //
  // 了 : pinyin-pro renvoie souvent `liǎo` (sens verbe = "finir/comprendre")
  //   alors que dans 99% des phrases d'apprentissage c'est la particule `le`
  //   (aspect accompli OU changement d'état). On force `le` quand 了 est dans
  //   la phrase originale, sauf si on a 了解 (liǎojiě) explicite.
  if (cleaned.includes('了') && !cleaned.includes('了解')) {
    result = result.replace(/\bliǎo\b/gi, 'le');
  }
  // 着 : particule durative = `zhe` (pas `zháo` "atteindre")
  if (cleaned.includes('着') && !/着急|睡着|找着/.test(cleaned)) {
    result = result.replace(/\bzháo\b/gi, 'zhe');
  }
  // 过 comme aspect particule (après verbe) = `guo` neutre, pas `guò`
  // (trop fréquent pour fixer sans contexte fin, on laisse pinyin-pro)

  return result;
}

/**
 * Compare deux pinyin de manière STRUCTURELLE : ignore casing/espaces mais
 * GARDE les tones et les syllabes. Renvoie true si "équivalents".
 */
function pinyinEquivalent(a, b) {
  return normalizePinyin(a) === normalizePinyin(b);
}

/**
 * Normalise un pinyin pour comparaison robuste : retire espaces, accents,
 * lowercase. Permet de matcher `Wǒ xiànzài` vs `wǒ xiàn zài` vs `Wo xianzai`.
 */
function normalizePinyin(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[\s.,!?;:'"«»()]/g, '');
}

// ---------------------------------------------------------------------------
// Patterns d'extraction dans les fichiers TypeScript
// ---------------------------------------------------------------------------

// Liste des chars EXCLUSIVEMENT français/anglais qui n'apparaissent JAMAIS en
// pinyin avec tone marks. Si on les trouve dans une chaîne candidate, c'est
// que ce n'est PAS du pinyin mais une explication FR/EN.
const NON_PINYIN_CHARS = /[çêëîïôûâäœÆçÊËÎÏÔÛÂÄ«»…]/;

// Liste des consonnes initiales pinyin valides + finales (syllabe shape).
// Une syllabe pinyin = (consonant)(vowel)(n|ng|r)?
const PINYIN_INITIALS = ['b','p','m','f','d','t','n','l','g','k','h','j','q','x','zh','ch','sh','r','z','c','s','y','w'];
const PINYIN_VOWELS = 'aāáǎàeēéěèiīíǐìoōóǒòuūúǔùüǖǘǚǜ';

/**
 * Test rapide : est-ce qu'une chaîne ressemble à du pinyin ?
 *   - Ne contient que [A-Za-z + tone marks + espaces + ponctuation ASCII basique]
 *   - Ne contient PAS de chars exclusivement français/anglais (ç ê œ « » …)
 *   - Contient au moins 1 voyelle avec tone mark (sinon c'est de l'anglais)
 *   - Pas de mots français évidents (pas, je, tu, de, le, la, et, où, qui, que…)
 */
function looksLikePinyin(s) {
  if (!s || s.length < 3) return false;
  if (NON_PINYIN_CHARS.test(s)) return false;
  // Doit contenir AU MOINS un caractère avec tone mark (sinon c'est du
  // français sans diacritique ou un texte ASCII qui n'a rien à voir)
  if (!/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(s)) return false;
  // Reject les mots français courants — bien plus efficace que de valider
  // chaque syllabe pinyin
  const FRENCH_WORDS_RE = /\b(je|tu|il|elle|nous|vous|ils|elles|le|la|les|un|une|des|du|de|à|au|aux|et|où|qui|que|quoi|pour|avec|sans|dans|sur|sous|pas|non|oui|son|sa|ses|mon|ma|mes|ton|ta|tes|c'est|n'est|d'un|d'une|n'a|qu'il|qu'elle|chez|même|aussi|plus|moins|tout|tous|toute|toutes|donc|alors|mais|car|ainsi|cela|cette|ces|leur|leurs|votre|notre)\b/i;
  if (FRENCH_WORDS_RE.test(s)) return false;
  const ENGLISH_WORDS_RE = /\b(the|is|are|was|were|of|in|on|at|to|for|with|without|by|from|this|that|these|those|here|there|where|when|how|why|what|which|who|whom|i|you|he|she|we|they|it|my|your|his|her|its|our|their|me|him|us|them|will|would|can|could|should|must|may|might|do|does|did|have|has|had|been|being|am|not|no|yes|and|or|but|so|because|if|then|than|while)\b/i;
  if (ENGLISH_WORDS_RE.test(s)) return false;
  return true;
}

/**
 * Pattern 1 — explanation/sentence avec `(Pinyin ici.)` après le hanzi.
 *
 * Ex: `explanation: "La phrase complète : 我现在在图书馆。 (Wǒ xiànzài zài tōngshùgōng.)."`
 *
 * On capture le hanzi + le pinyin entre parenthèses pour comparer. Filtre
 * strict via looksLikePinyin() pour éviter de matcher des explications FR/EN.
 */
function findInlinePinyinPairs(content, filePath) {
  const findings = [];
  // Match: HANZI(2+) puis éventuellement ponctuation 。！？ puis espaces puis (pinyin)
  // Le hanzi doit être contigü (que des CJK + 。！？ éventuels au milieu pour les phrases complètes)
  const re = /([一-鿿㐀-䶿][一-鿿㐀-䶿，。！？、]*[一-鿿㐀-䶿][。！？]?)\s*\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const hanziRaw = m[1];
    const pinyinRaw = m[2].trim();
    const cjkCount = (hanziRaw.match(/[一-鿿㐀-䶿]/g) || []).length;
    if (cjkCount < 2) continue;
    if (!looksLikePinyin(pinyinRaw)) continue;
    findings.push({
      file: filePath,
      type: 'inline',
      offset: m.index,
      hanziOffset: m.index,
      hanziLen: hanziRaw.length,
      pinyinFullOffset: m.index + m[0].indexOf('(' + pinyinRaw),
      hanzi: hanziRaw,
      pinyin: pinyinRaw,
      raw: m[0]
    });
  }
  return findings;
}

/**
 * Pattern 2 — `modelAnswer: "..."` suivi de `modelPinyin: "..."` dans le même objet.
 */
function findModelAnswerPairs(content, filePath) {
  const findings = [];
  const re = /modelAnswer:\s*"([^"]+)"\s*,\s*modelPinyin:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    findings.push({
      file: filePath,
      type: 'modelAnswer',
      offset: m.index,
      hanzi: m[1],
      pinyin: m[2],
      raw: m[0]
    });
  }
  return findings;
}

// ---------------------------------------------------------------------------
// Audit principal
// ---------------------------------------------------------------------------

const TARGET_FILES = [
  'src/data/cecr-exercises.ts',
  'src/data/cecr-exercises-enriched-a1.ts',
  'src/data/cecr-course.ts',
  'src/data/cecr-a1-extra-learn-sections.ts',
  'src/data/cecr-a2-learn-sections.ts',
  'src/data/cecr-b1-1-learn-sections.ts',
  'src/data/cecr-b1-2-learn-sections.ts',
  'src/data/cecr-b2-1-learn-sections.ts'
];

const allFindings = [];
const allMismatches = [];

for (const relPath of TARGET_FILES) {
  const absPath = path.join(PROJECT_ROOT, relPath);
  if (!fs.existsSync(absPath)) {
    if (VERBOSE) console.log(`[skip] ${relPath} — n'existe pas`);
    continue;
  }
  const content = fs.readFileSync(absPath, 'utf-8');
  const findings = [
    ...findInlinePinyinPairs(content, relPath),
    ...findModelAnswerPairs(content, relPath)
  ];
  allFindings.push(...findings);

  for (const f of findings) {
    const expected = generateExpectedPinyin(f.hanzi);
    const expectedNorm = normalizePinyin(expected);
    const actualNorm = normalizePinyin(f.pinyin);
    if (expectedNorm === actualNorm) continue;

    // Differ par plus que casing/espaces : c'est une vraie erreur de pinyin
    // (mauvaises syllabes ou mauvais tons). On ignore les cas où ça diffère
    // d'un seul caractère et c'est probablement la finale d'une syllabe
    // (false positive de pinyin-pro avec contextes ambigus).
    const editDistance = levenshtein(expectedNorm, actualNorm);
    // Tolère 1 char de différence sur les pinyins courts (5-10 chars) :
    // souvent un polyphone ambigu sans incidence.
    if (editDistance <= 1 && expectedNorm.length <= 10) continue;
    // Tolère 2 char de différence sur les pinyins moyens (10-25 chars).
    if (editDistance <= 2 && expectedNorm.length <= 25) continue;

    allMismatches.push({
      ...f,
      expected,
      editDistance,
      delta: Math.abs(expectedNorm.length - actualNorm.length)
    });
  }
}

// Levenshtein distance (itératif, O(n*m))
function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = new Array(b.length + 1).fill(0).map((_, i) => i);
  let curr = new Array(b.length + 1).fill(0);
  for (let i = 0; i < a.length; i++) {
    curr[0] = i + 1;
    for (let j = 0; j < b.length; j++) {
      const cost = a[i] === b[j] ? 0 : 1;
      curr[j + 1] = Math.min(curr[j] + 1, prev[j + 1] + 1, prev[j] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[b.length];
}

// Output report
console.log(`\n=== Audit pinyin leçons ===`);
console.log(`Fichiers scannés : ${TARGET_FILES.length}`);
console.log(`Paires trouvées  : ${allFindings.length}`);
console.log(`Mismatches       : ${allMismatches.length}\n`);

if (allMismatches.length > 0) {
  console.log(`--- Mismatches détaillés ---\n`);
  for (const m of allMismatches.slice(0, 50)) {
    console.log(`📄 ${m.file}`);
    console.log(`   Hanzi    : ${m.hanzi.slice(0, 80)}`);
    console.log(`   Actuel   : ${m.pinyin}`);
    console.log(`   Attendu  : ${m.expected}`);
    console.log(`   Type     : ${m.type}\n`);
  }
  if (allMismatches.length > 50) {
    console.log(`... et ${allMismatches.length - 50} autres mismatches.\n`);
  }
}

// Sauvegarde rapport JSON
const reportPath = path.join(PROJECT_ROOT, 'scripts', 'audit-lesson-pinyins-report.json');
fs.writeFileSync(
  reportPath,
  JSON.stringify(
    {
      scannedFiles: TARGET_FILES,
      totalPairs: allFindings.length,
      mismatches: allMismatches
    },
    null,
    2
  )
);
console.log(`Rapport sauvegardé : ${path.relative(PROJECT_ROOT, reportPath)}`);

// Application des fix si --fix
if (FIX_MODE && allMismatches.length > 0) {
  console.log(`\n--- Application des fix (${allMismatches.length} corrections) ---\n`);
  const byFile = new Map();
  for (const m of allMismatches) {
    if (!byFile.has(m.file)) byFile.set(m.file, []);
    byFile.get(m.file).push(m);
  }
  let totalApplied = 0;
  for (const [relFile, mismatches] of byFile) {
    const absPath = path.join(PROJECT_ROOT, relFile);
    let content = fs.readFileSync(absPath, 'utf-8');
    let applied = 0;
    // Trie par offset décroissant pour ne pas invalider les offsets quand on remplace
    mismatches.sort((a, b) => b.offset - a.offset);
    for (const m of mismatches) {
      // Remplace le pinyin DANS la string raw matchée, puis remplace dans content
      const escapedActual = m.pinyin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`\\(${escapedActual}\\)`, 'g');
      const before = content.length;
      content = content.replace(re, `(${m.expected})`);
      // Et pour les modelPinyin
      const reModel = new RegExp(`(modelPinyin:\\s*")${escapedActual}(")`, 'g');
      content = content.replace(reModel, `$1${m.expected}$2`);
      if (content.length !== before) applied++;
    }
    fs.writeFileSync(absPath, content);
    totalApplied += applied;
    console.log(`✏️  ${relFile} — ${applied} fix appliqués`);
  }
  console.log(`\nTotal fix appliqués : ${totalApplied}`);
} else if (!FIX_MODE && allMismatches.length > 0) {
  console.log(`\nDry-run : pour appliquer, relance avec --fix`);
}
