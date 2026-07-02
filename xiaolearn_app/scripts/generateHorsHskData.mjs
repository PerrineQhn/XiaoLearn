import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from '@xenova/transformers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');
const ankiDir = path.resolve(root, '..', 'xiaolearn_anki');
const dictDir = path.resolve(root, '..', 'xiaolearn_dictionnary', 'data');
const cedictPath = path.join(ankiDir, 'cedict_ts.txt');
const cfdictPath = path.join(dictDir, 'cfdict.xml');
const translationCachePath = path.join(dataDir, 'translation-cache.json');

const LEVEL_KEY = 'hors-hsk';
const PAD_LENGTH = 6;
const CACHE_SAVE_INTERVAL = 500; // Save translation cache every N entries

// CLI option: --limit N to process only N entries (for testing)
const limitArg = process.argv.indexOf('--limit');
const MAX_ENTRIES = limitArg !== -1 ? parseInt(process.argv[limitArg + 1], 10) : Infinity;

// ── Pinyin helpers (from generateHskData.mjs) ──

const toneMap = {
  a: ['ā', 'á', 'ǎ', 'à'],
  e: ['ē', 'é', 'ě', 'è'],
  i: ['ī', 'í', 'ǐ', 'ì'],
  o: ['ō', 'ó', 'ǒ', 'ò'],
  u: ['ū', 'ú', 'ǔ', 'ù'],
  ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ']
};
const priorityPairs = ['iu', 'ui'];

function formatNumericPinyin(segment) {
  const match = segment.match(/^([a-züv:]+)(\d)$/i);
  if (!match) return segment;
  let syllable = match[1].toLowerCase().replace(/v/g, 'ü').replace(/u:/g, 'ü');
  const tone = Number(match[2]);
  if (tone === 5 || tone === 0) return syllable;
  let index = syllable.indexOf('a');
  if (index === -1) index = syllable.indexOf('e');
  if (index === -1 && syllable.includes('ou')) index = syllable.indexOf('o');
  if (index === -1) {
    for (const pair of priorityPairs) {
      const pos = syllable.indexOf(pair);
      if (pos !== -1) { index = pos + 1; break; }
    }
  }
  if (index === -1) {
    for (const vowel of Object.keys(toneMap)) {
      const pos = syllable.indexOf(vowel);
      if (pos !== -1) { index = pos; break; }
    }
  }
  if (index === -1) return syllable;
  const chars = syllable.split('');
  const vowel = chars[index];
  const toned = toneMap[vowel]?.[tone - 1] ?? vowel;
  chars[index] = toned;
  return chars.join('');
}

function prettifyPinyin(value = '') {
  const normalized = value
    .replace(/u:/gi, 'ü')
    .replace(/([A-Za-z])\s*:\s*([1-5])/g, '$1:$2')
    .replace(/([1-5])(?=[A-Za-züÜvV:])/g, '$1 ');

  return normalized
    .split(/\s+/)
    .filter(Boolean)
    .map(formatNumericPinyin)
    .join(' ')
    .trim();
}

// ── CEDICT parser ──

function parseCedict(text) {
  const map = new Map();
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^(\S+)\s+(\S+)\s+\[([^\]]+)\]\s+\/(.+)\/$/);
    if (!match) continue;
    const [, , simplified, pinyin, definitions] = match;
    const translationList = definitions.split('/').map((s) => s.trim()).filter(Boolean);
    if (translationList.length === 0) continue;
    map.set(simplified, {
      pinyin: prettifyPinyin(pinyin.replace(/·/g, ' ')),
      translation: translationList[0],
      explanation: translationList.slice(1).join('; ') || undefined,
      rawTranslations: translationList
    });
  }
  return map;
}

// ── CFDICT parser (chinois-français) ──

function parseCfdict(text) {
  const map = new Map();
  // Parse XML: extract <word> blocks with <simp> and <fr> elements
  const wordRegex = /<word>([\s\S]*?)<\/word>/g;
  let wordMatch;
  while ((wordMatch = wordRegex.exec(text)) !== null) {
    const block = wordMatch[1];
    const simpMatch = block.match(/<simp>([^<]+)<\/simp>/);
    if (!simpMatch) continue;
    const simp = simpMatch[1].trim();

    const frMatches = [...block.matchAll(/<fr><!\[CDATA\[([\s\S]*?)\]\]><\/fr>/g)];
    if (frMatches.length === 0) continue;

    const translations = frMatches.map((m) => m[1].trim()).filter(Boolean);
    if (translations.length === 0) continue;

    const pyMatch = block.match(/<py>([^<]+)<\/py>/);
    const pinyin = pyMatch ? prettifyPinyin(pyMatch[1].trim()) : '';

    // Keep first entry found (don't overwrite)
    if (!map.has(simp)) {
      map.set(simp, {
        translationFr: translations[0],
        translationFrAlt: translations.length > 1 ? translations : undefined,
        pinyin
      });
    }
  }
  return map;
}

// ── Theme / category inference (from generateHskData.mjs) ──

const themeRules = [
  { id: 'salutations', keywords: ['hello', 'hi', 'goodbye', 'bye', 'thanks', 'thank', 'sorry'] },
  { id: 'famille', keywords: ['father', 'mother', 'sister', 'brother', 'family', 'son', 'daughter', 'grand', 'aunt', 'uncle', 'child', 'wife', 'husband'] },
  { id: 'nourriture', keywords: ['eat', 'food', 'meal', 'drink', 'rice', 'soup', 'vegetable', 'fruit', 'water', 'tea', 'coffee'] },
  { id: 'voyage', keywords: ['travel', 'trip', 'journey', 'hotel', 'vacation'] },
  { id: 'transport', keywords: ['car', 'bus', 'train', 'bike', 'subway', 'plane', 'airport', 'road', 'street', 'station', 'taxi', 'ticket'] },
  { id: 'logement', keywords: ['house', 'home', 'room', 'bedroom', 'kitchen', 'bathroom', 'floor', 'building'] },
  { id: 'école', keywords: ['school', 'teacher', 'student', 'class', 'homework', 'lesson', 'exam', 'university'] },
  { id: 'travail', keywords: ['work', 'job', 'office', 'boss', 'company', 'salary', 'business'] },
  { id: 'loisirs', keywords: ['play', 'sport', 'music', 'movie', 'film', 'book', 'game', 'song'] },
  { id: 'santé', keywords: ['doctor', 'hospital', 'medicine', 'sick', 'ill', 'healthy'] },
  { id: 'nature', keywords: ['weather', 'rain', 'snow', 'wind', 'sun', 'cloud', 'river', 'mountain', 'tree'] },
  { id: 'temps', keywords: ['day', 'month', 'year', 'week', 'hour', 'minute', 'time', 'yesterday', 'tomorrow', 'season'] },
  { id: 'émotions', keywords: ['happy', 'sad', 'love', 'angry', 'afraid', 'interested'] },
  { id: 'corps', keywords: ['body', 'hand', 'head', 'eye', 'ear', 'mouth', 'face', 'leg', 'foot', 'heart'] },
  { id: 'shopping', keywords: ['buy', 'sell', 'shop', 'store', 'price', 'money', 'market'] },
  { id: 'technologie', keywords: ['computer', 'phone', 'internet', 'email', 'television', 'radio'] },
  { id: 'animaux', keywords: ['dog', 'cat', 'animal', 'cow', 'horse', 'bird', 'fish'] }
];

function inferTheme(translation, hanzi) {
  const haystack = `${hanzi} ${translation}`.toLowerCase();
  const match = themeRules.find((rule) => rule.keywords.some((kw) => haystack.includes(kw)));
  return match?.id ?? 'général';
}

function inferCategory(rawTranslations) {
  if (!rawTranslations || rawTranslations.length === 0) return 'général';
  const joined = rawTranslations.join(' ').toLowerCase();
  if (/\bto [a-z]/.test(joined)) return 'verbe';
  if (/\b(surname|name|city|province|county|district)\b/.test(joined)) return 'nom propre';
  if (/\b(classifier|cl\.)/.test(joined)) return 'classificateur';
  if (/\b(particle)\b/.test(joined)) return 'particule';
  if (/\b(interjection|excl\.)\b/.test(joined)) return 'interjection';
  if (/\b(variant of|old variant|see |abbr\. for)\b/.test(joined)) return 'variante';
  if (/\b(onomatopoeia)\b/.test(joined)) return 'onomatopée';
  if (/\b(adverb)\b/.test(joined)) return 'adverbe';
  if (/\b(adjective)\b/.test(joined)) return 'adjectif';
  if (/\b(noun|person|people)\b/.test(joined)) return 'nom';
  return 'général';
}

function sanitizeTranslation(value) {
  return value.replace(/\s*CL:.*$/i, '').trim();
}

function normalizeCedictPinyinInText(value = '') {
  return value
    .replace(/\[([^\]]+)\]/g, (_, pinyin) => `[${prettifyPinyin(String(pinyin))}]`)
    .replace(/\s+\[/g, '[');
}

function cleanCedictReference(value = '') {
  return value
    .replace(/([^\s|/]+)\|([^\s|/]+)/g, '$2')
    .replace(/\[([^\]]*)\]/g, (_, pinyin) => `[${prettifyPinyin(String(pinyin))}]`)
    .replace(/\s+\[/g, '[')
    .replace(/\s+/g, ' ')
    .replace(/\s*[,;:]\s*$/, '')
    .trim();
}

function toFrenchLikeReference(english = '') {
  const source = english.trim();
  const oldVariant = source.match(/^old variant of\s+(.+)$/i);
  if (oldVariant) return `ancienne variante de ${cleanCedictReference(oldVariant[1])}`;

  const variant = source.match(/^variant of\s+(.+)$/i);
  if (variant) return `variante de ${cleanCedictReference(variant[1])}`;

  const see = source.match(/^see\s+(.+)$/i);
  if (see) return `voir ${cleanCedictReference(see[1])}`;

  const usedIn = source.match(/^used in\s+(.+)$/i);
  if (usedIn) return `utilisé dans ${cleanCedictReference(usedIn[1])}`;

  const abbr = source.match(/^abbr\.?\s*for\s+(.+)$/i);
  if (abbr) return `abréviation de ${cleanCedictReference(abbr[1])}`;

  return '';
}

function cleanFrenchNoise(value = '') {
  return value
    .replace(/\[[^\]]*]/g, '')
    .replace(/,+/g, ', ')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ', ')
    .replace(/\s{2,}/g, ' ')
    .replace(/^,\s*/, '')
    .replace(/\s*[,，;:]\s*$/, '')
    .trim();
}

// ── Translation helpers (fallback for entries not in CFDICT) ──

let translatorInstance = null;
const translationCache = {};

async function loadTranslationCache() {
  try {
    const payload = await fs.readFile(translationCachePath, 'utf-8');
    Object.assign(translationCache, JSON.parse(payload));
  } catch { /* no cache yet */ }
}

async function saveTranslationCache() {
  await fs.mkdir(path.dirname(translationCachePath), { recursive: true });
  await fs.writeFile(translationCachePath, JSON.stringify(translationCache, null, 2), 'utf-8');
}

async function translateToFrench(source) {
  if (!source) return '';
  if (translationCache[source]) return translationCache[source];
  if (!translatorInstance) {
    translatorInstance = await pipeline('translation', 'Xenova/opus-mt-en-fr');
  }
  const output = await translatorInstance(source, { max_length: 80 });
  const translation = output?.[0]?.translation_text?.trim() || source;
  translationCache[source] = translation;
  return translation;
}

// ── Main ──

async function build() {
  console.log('Chargement des dictionnaires…');
  await loadTranslationCache();

  // Load CEDICT (en)
  const cedictText = await fs.readFile(cedictPath, 'utf-8');
  const cedictMap = parseCedict(cedictText);
  console.log(`CEDICT (en) chargé : ${cedictMap.size} entrées.`);

  // Load CFDICT (fr)
  const cfdictText = await fs.readFile(cfdictPath, 'utf-8');
  const cfdictMap = parseCfdict(cfdictText);
  console.log(`CFDICT (fr) chargé : ${cfdictMap.size} entrées.`);

  // Collect all hanzi already in HSK
  const hskHanziSet = new Set();
  for (let i = 1; i <= 7; i++) {
    const filePath = path.join(dataDir, `hsk${i}.json`);
    try {
      const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
      for (const entry of data) {
        hskHanziSet.add(entry.hanzi);
      }
    } catch {
      console.warn(`⚠️ Impossible de lire ${filePath}`);
    }
  }
  console.log(`HSK existant : ${hskHanziSet.size} hanzi.`);

  // Filter CEDICT entries not in HSK
  const horsHskEntries = [];
  let index = 1;
  let cfMatchCount = 0;
  let fallbackCount = 0;

  for (const [hanzi, entry] of cedictMap) {
    if (hskHanziSet.has(hanzi)) continue;
    if (horsHskEntries.length >= MAX_ENTRIES) break;

    const translationEn = normalizeCedictPinyinInText(sanitizeTranslation(entry.translation));
    const category = inferCategory(entry.rawTranslations);
    const theme = inferTheme(translationEn, hanzi);
    const id = `${LEVEL_KEY}-${String(index).padStart(PAD_LENGTH, '0')}`;

    // Use CFDICT for French translation if available
    const cfEntry = cfdictMap.get(hanzi);
    let translationFr = '';
    let translationFrAlt;
    if (cfEntry) {
      translationFr = cfEntry.translationFr;
      translationFrAlt = cfEntry.translationFrAlt;
      cfMatchCount++;
    }

    horsHskEntries.push({
      id,
      level: LEVEL_KEY,
      hanzi,
      pinyin: entry.pinyin,
      translationEn,
      translationFr,
      ...(translationFrAlt ? { translationFrAlt } : {}),
      category,
      explanation: entry.explanation,
      audio: '',
      examples: [],
      quiz: {
        prompt: `Sélectionne la bonne traduction pour « ${hanzi} »`,
        choices: [translationEn],
        correctChoiceIndex: 0
      },
      tags: Array.from(new Set([theme, category, `level:${LEVEL_KEY}`])),
      theme
    });
    index++;
  }

  console.log(`Entrées hors-HSK : ${horsHskEntries.length}`);
  console.log(`  → ${cfMatchCount} avec traduction FR (CFDICT)`);
  console.log(`  → ${horsHskEntries.length - cfMatchCount} sans traduction FR`);

  // Quiz choices
  console.log('Génération des choix de quiz…');
  horsHskEntries.forEach((lesson, _, arr) => {
    const options = new Set([lesson.translationEn]);
    let attempts = 0;
    while (options.size < 4 && attempts < 20) {
      const candidate = arr[Math.floor(Math.random() * arr.length)];
      if (candidate && candidate.id !== lesson.id) {
        options.add(candidate.translationEn);
      }
      attempts++;
    }
    const choices = [...options];
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    lesson.quiz = {
      prompt: `Sélectionne la bonne traduction pour « ${lesson.hanzi} »`,
      choices,
      correctChoiceIndex: choices.indexOf(lesson.translationEn)
    };
  });

  // Translate remaining entries (no CFDICT match) via opus-mt-en-fr
  const needTranslation = horsHskEntries.filter((e) => !e.translationFr);
  console.log(`Traductions automatiques EN→FR pour ${needTranslation.length} items restants…`);
  let processed = 0;
  for (const lesson of needTranslation) {
    const ruleBased = toFrenchLikeReference(lesson.translationEn);
    if (ruleBased) {
      lesson.translationFr = ruleBased;
    } else {
      const translated = await translateToFrench(lesson.translationEn);
      lesson.translationFr = cleanFrenchNoise(translated) || translated;
    }
    processed++;
    fallbackCount++;
    if (processed % CACHE_SAVE_INTERVAL === 0 || processed === needTranslation.length) {
      const percent = Math.round((processed / needTranslation.length) * 100);
      console.log(`  → ${processed}/${needTranslation.length} (${percent}%)`);
      await saveTranslationCache();
    }
  }

  console.log(`Résumé traductions FR :`);
  console.log(`  → CFDICT direct : ${cfMatchCount}`);
  console.log(`  → Traduction auto : ${fallbackCount}`);

  // Write output files
  const jsonContent = `${JSON.stringify(horsHskEntries, null, 2)}\n`;

  const outputPaths = [
    path.join(dataDir, `${LEVEL_KEY}.json`),
    path.resolve(root, '..', 'xiaolearn_reference', 'src', 'data', `${LEVEL_KEY}.json`),
    path.resolve(root, '..', 'xiaolearn_dictionnary', 'data', `${LEVEL_KEY}.json`),
    path.resolve(root, '..', 'xiaolearn_dictionnary', 'data', 'data', `${LEVEL_KEY}.json`),
    path.resolve(root, '..', 'xiaolearn_dictionnary', 'xiaolearn', 'data', `${LEVEL_KEY}.json`),
    path.resolve(root, '..', 'xiaolearn_dictionnary', 'xiaolearn', 'data', 'data', `${LEVEL_KEY}.json`),
  ];

  for (const outputPath of outputPaths) {
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, jsonContent, 'utf-8');
    console.log(`✅ Écrit : ${outputPath}`);
  }

  console.log(`\nGénération terminée : ${horsHskEntries.length} entrées hors-HSK créées.`);
}

build().catch((error) => {
  console.error('Erreur lors de la génération hors-HSK:', error);
  process.exitCode = 1;
});
