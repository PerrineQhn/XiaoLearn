import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { gunzipSync } from 'zlib';
import Papa from 'papaparse';
import { pipeline } from '@xenova/transformers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');

const HSK30_URL = 'https://raw.githubusercontent.com/ivankra/hsk30/master/hsk30-expanded.csv';
const CCEDICT_URL = 'https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.txt.gz';
const translationCachePath = path.join(dataDir, 'translation-cache.json');
const zhTranslationCachePath = path.join(dataDir, 'translation-zh-cache.json');
const LEVEL_MAP = {
  1: 'hsk1',
  2: 'hsk2',
  3: 'hsk3',
  4: 'hsk4',
  5: 'hsk5',
  6: 'hsk6',
  7: 'hsk7'
};
const PAD_LENGTH = 4;
const audioSlugTracker = new Set();

const manualDictionary = new Map([
  [
    '踢足球',
    {
      pinyin: 'tī zúqiú',
      translation: 'to play football (soccer)',
      explanation: 'expression courante pour jouer au foot',
      rawTranslations: ['to play football (soccer)']
    }
  ]
]);

const posDictionary = {
  n: 'nom',
  v: 'verbe',
  adj: 'adjectif',
  adv: 'adverbe',
  pron: 'pronom',
  prep: 'préposition',
  conj: 'conjonction',
  aux: 'particule',
  num: 'numéral',
  m: 'classificateur',
  inter: 'interjection',
  int: 'interjection',
  onom: 'onomatopée'
};

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

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Échec du téléchargement: ${url}`);
  return response.text();
}

async function fetchGzipText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Échec du téléchargement: ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  return gunzipSync(buffer).toString('utf-8');
}

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
  let syllable = match[1]
    .toLowerCase()
    .replace(/v/g, 'ü')
    .replace(/u:/g, 'ü');
  const tone = Number(match[2]);
  if (tone === 5 || tone === 0) return syllable;

  let index = syllable.indexOf('a');
  if (index === -1) index = syllable.indexOf('e');
  if (index === -1 && syllable.includes('ou')) index = syllable.indexOf('o');
  if (index === -1) {
    for (const pair of priorityPairs) {
      const pos = syllable.indexOf(pair);
      if (pos !== -1) {
        index = pos + 1;
        break;
      }
    }
  }
  if (index === -1) {
    for (const vowel of Object.keys(toneMap)) {
      const pos = syllable.indexOf(vowel);
      if (pos !== -1) {
        index = pos;
        break;
      }
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
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((segment) => formatNumericPinyin(segment))
    .join(' ')
    .trim();
}

function parseCedict(text) {
  const map = new Map();
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^(\S+)\s+(\S+)\s+\[([^\]]+)\]\s+\/(.+)\/$/);
    if (!match) continue;
    const [, , simplified, pinyin, definitions] = match;
    const translationList = definitions.split('/').map((item) => item.trim()).filter(Boolean);
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

function inferTheme(translation, hanzi) {
  const haystack = `${hanzi} ${translation}`.toLowerCase();
  const match = themeRules.find((rule) => rule.keywords.some((keyword) => haystack.includes(keyword)));
  return match?.id ?? 'général';
}

function mapCategory(posRaw = '') {
  const normalized = posRaw.toLowerCase();
  const candidates = normalized.split(/[\/,; ]+/);
  for (const candidate of candidates) {
    if (!candidate) continue;
    const label = posDictionary[candidate];
    if (label) return label;
  }
  return 'général';
}

function sanitizeTranslation(value) {
  return value.replace(/\s*CL:.*$/i, '').trim();
}

let translatorInstance = null;
let zhTranslatorInstance = null;
const translationCache = {};
const zhTranslationCache = {};

async function loadTranslationCache() {
  try {
    const payload = await fs.readFile(translationCachePath, 'utf-8');
    Object.assign(translationCache, JSON.parse(payload));
  } catch (error) {
    // no cache yet
  }
  try {
    const payload = await fs.readFile(zhTranslationCachePath, 'utf-8');
    Object.assign(zhTranslationCache, JSON.parse(payload));
  } catch (error) {
    // no cache yet
  }
}

async function saveTranslationCache() {
  await fs.mkdir(path.dirname(translationCachePath), { recursive: true });
  await fs.writeFile(translationCachePath, JSON.stringify(translationCache, null, 2), 'utf-8');
  await fs.writeFile(zhTranslationCachePath, JSON.stringify(zhTranslationCache, null, 2), 'utf-8');
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

async function translateChineseToEnglish(source) {
  if (!source) return '';
  if (zhTranslationCache[source]) return zhTranslationCache[source];
  if (!zhTranslatorInstance) {
    zhTranslatorInstance = await pipeline('translation', 'Xenova/opus-mt-zh-en');
  }
  const output = await zhTranslatorInstance(source, { max_length: 80 });
  const translation = output?.[0]?.translation_text?.trim() || source;
  zhTranslationCache[source] = translation;
  return translation;
}

function buildAudioFileName(levelKey, hanzi, index) {
  const baseSlug = hanzi.replace(/[^\u3400-\u9FFF\w]+/g, '');
  const fallback = String(index).padStart(PAD_LENGTH, '0');
  const rootSlug = `${levelKey}_${baseSlug || fallback}`;
  let candidate = rootSlug;
  let counter = 2;
  while (audioSlugTracker.has(candidate)) {
    candidate = `${rootSlug}_${counter}`;
    counter += 1;
  }
  audioSlugTracker.add(candidate);
  return candidate;
}

function createLessonObject({ row, levelKey, index, dictionaryEntry }) {
  const id = `${levelKey}-${String(index).padStart(PAD_LENGTH, '0')}`;
  const hanzi = row.Simplified.trim();
  const translation = sanitizeTranslation(dictionaryEntry?.translation ?? 'Translation unavailable');
  const category = mapCategory(row.POS);
  const theme = inferTheme(translation, hanzi);
  const audioId = buildAudioFileName(levelKey, hanzi, index);

  return {
    id,
    level: levelKey,
    hanzi,
    pinyin: row.Pinyin ? prettifyPinyin(row.Pinyin.trim()) : dictionaryEntry?.pinyin || '',
    translation,
    translationFr: '',
    category,
    explanation: dictionaryEntry?.explanation,
    audio: `audio/${levelKey}/${audioId}.wav`,
    examples: [],
    quiz: {
      prompt: `Sélectionne la bonne traduction pour « ${hanzi} »`,
      choices: [translation],
      correctChoiceIndex: 0
    },
    tags: Array.from(new Set([theme, category, `level:${levelKey}`])),
    theme
  };
}

function applyQuizChoices(lessons) {
  lessons.forEach((lesson, _, arr) => {
    const options = new Set([lesson.translation]);
    while (options.size < 4) {
      const candidate = arr[Math.floor(Math.random() * arr.length)];
      if (candidate && candidate.id !== lesson.id) {
        options.add(candidate.translation);
      }
      if (arr.length <= 3) break;
    }
    const choices = [...options];
    for (let i = choices.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    lesson.quiz = {
      prompt: `Sélectionne la bonne traduction pour « ${lesson.hanzi} »`,
      choices,
      correctChoiceIndex: choices.indexOf(lesson.translation)
    };
  });
}

async function build() {
  console.log('Téléchargement des listes HSK 3.0 (L1 → L7)…');
  await loadTranslationCache();
  const csvText = await fetchText(HSK30_URL);
  const cedictMap = parseCedict(await fetchGzipText(CCEDICT_URL));
  const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
  const rows = parsed.data;
  console.log(`Source HSK 3.0 chargée (${rows.length} lignes).`);

const lessonsResult = Object.values(LEVEL_MAP).reduce((acc, key) => ({ ...acc, [key]: [] }), {});
const levelCounters = Object.values(LEVEL_MAP).reduce((acc, key) => ({ ...acc, [key]: 1 }), {});
const missingWords = [];

for (const row of rows) {
  const levelMatch = row.ID?.match(/^L(\d+)/);
  const levelNumber = levelMatch ? Number(levelMatch[1]) : Number(row.Level);
  const levelKey = LEVEL_MAP[levelNumber];
  if (!levelKey) continue;
  const simplified = row.Simplified?.trim();
  if (!simplified) continue;

  let dictionaryEntry =
    cedictMap.get(simplified) ||
    manualDictionary.get(simplified) ||
    cedictMap.get(row.Traditional?.trim()) ||
    manualDictionary.get(row.Traditional?.trim());

  if (!dictionaryEntry) {
    const fallbackTranslation = await translateChineseToEnglish(simplified);
    if (!fallbackTranslation) {
      missingWords.push(simplified);
      continue;
    }
    dictionaryEntry = {
      pinyin: prettifyPinyin(row.Pinyin || ''),
      translation: fallbackTranslation,
      explanation: undefined,
      rawTranslations: [fallbackTranslation]
    };
  }

  const index = levelCounters[levelKey];
  levelCounters[levelKey] += 1;
  const lesson = createLessonObject({ row, levelKey, index, dictionaryEntry });
  lessonsResult[levelKey].push(lesson);
}

  if (missingWords.length > 0) {
    console.warn('⚠️  Mots introuvables dans CEDICT (traduction anglaise manquante):', missingWords.slice(0, 20));
  }

  Object.entries(lessonsResult).forEach(([levelKey, lessons]) => {
    applyQuizChoices(lessons);
    console.log(`> ${levelKey.toUpperCase()} : ${lessons.length} entrées`);
  });

  const totalLessons = Object.values(lessonsResult).reduce((acc, list) => acc + list.length, 0);
  console.log(`Traductions automatiques FR (${totalLessons} items)…`);
  let processed = 0;
  for (const levelLessons of Object.values(lessonsResult)) {
    for (const lesson of levelLessons) {
      lesson.translationFr = await translateToFrench(lesson.translation);
      processed += 1;
      if (processed % 100 === 0 || processed === totalLessons) {
        const percent = Math.round((processed / totalLessons) * 100);
        console.log(`  → ${processed}/${totalLessons} (${percent}%)`);
      }
    }
  }
  await saveTranslationCache();

  await fs.mkdir(dataDir, { recursive: true });
  await Promise.all(
    Object.entries(lessonsResult).map(([levelKey, lessons]) =>
      fs.writeFile(path.join(dataDir, `${levelKey}.json`), `${JSON.stringify(lessons, null, 2)}\n`, 'utf-8')
    )
  );

  console.log('Listes HSK 3.0 (L1-L7) générées avec succès dans /data ✅');
}

build().catch((error) => {
  console.error('Impossible de générer les listes HSK:', error);
  process.exitCode = 1;
});
