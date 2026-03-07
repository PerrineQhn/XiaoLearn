import type { HSKEntry } from '../types/hsk';

type ToneDigit = '1' | '2' | '3' | '4' | '5';

type ToneQuery = {
  base: string;
  tone: ToneDigit;
  variants: string[];
  anyToneVariants: string[];
};

type QueryInfo = {
  raw: string;
  rawLower: string;
  rawCompact: string;
  latin: string;
  latinCompact: string;
  latinNoDigits: string;
  latinNoDigitsCompact: string;
  toneQuery: ToneQuery | null;
};

export type DictionarySearchMode = 'auto' | 'pinyin' | 'translation';

const COMBINING_MARKS_REGEX = /[\u0300-\u036f]/g;
const WHITESPACE_REGEX = /\s+/g;

const PINYIN_TONE_MARKS: Record<string, { base: string; tone: ToneDigit }> = {
  'ā': { base: 'a', tone: '1' },
  'á': { base: 'a', tone: '2' },
  'ǎ': { base: 'a', tone: '3' },
  'à': { base: 'a', tone: '4' },
  'ē': { base: 'e', tone: '1' },
  'é': { base: 'e', tone: '2' },
  'ě': { base: 'e', tone: '3' },
  'è': { base: 'e', tone: '4' },
  'ī': { base: 'i', tone: '1' },
  'í': { base: 'i', tone: '2' },
  'ǐ': { base: 'i', tone: '3' },
  'ì': { base: 'i', tone: '4' },
  'ō': { base: 'o', tone: '1' },
  'ó': { base: 'o', tone: '2' },
  'ǒ': { base: 'o', tone: '3' },
  'ò': { base: 'o', tone: '4' },
  'ū': { base: 'u', tone: '1' },
  'ú': { base: 'u', tone: '2' },
  'ǔ': { base: 'u', tone: '3' },
  'ù': { base: 'u', tone: '4' },
  'ǖ': { base: 'v', tone: '1' },
  'ǘ': { base: 'v', tone: '2' },
  'ǚ': { base: 'v', tone: '3' },
  'ǜ': { base: 'v', tone: '4' },
};

const TONE_CHAR_BY_VOWEL: Record<'a' | 'e' | 'i' | 'o' | 'u' | 'v', Record<ToneDigit, string>> = {
  a: { '1': 'ā', '2': 'á', '3': 'ǎ', '4': 'à', '5': 'a' },
  e: { '1': 'ē', '2': 'é', '3': 'ě', '4': 'è', '5': 'e' },
  i: { '1': 'ī', '2': 'í', '3': 'ǐ', '4': 'ì', '5': 'i' },
  o: { '1': 'ō', '2': 'ó', '3': 'ǒ', '4': 'ò', '5': 'o' },
  u: { '1': 'ū', '2': 'ú', '3': 'ǔ', '4': 'ù', '5': 'u' },
  v: { '1': 'ǖ', '2': 'ǘ', '3': 'ǚ', '4': 'ǜ', '5': 'ü' },
};

const TONES_FOR_VARIANTS: ToneDigit[] = ['1', '2', '3', '4', '5'];

export function searchEntries(
  entries: HSKEntry[],
  query: string,
  mode: DictionarySearchMode = 'auto',
): HSKEntry[] {
  const queryInfo = buildQueryInfo(query);
  if (!queryInfo.raw) {
    return entries;
  }

  const ranked = entries
    .map((entry, index) => {
      const rank = rankEntry(entry, queryInfo, mode);
      return { entry, index, ...rank };
    })
    .filter((item) => item.score > 0);

  ranked.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.pinyinRank !== b.pinyinRank) return a.pinyinRank - b.pinyinRank;
    if (a.entry.pinyin.length !== b.entry.pinyin.length) {
      return a.entry.pinyin.length - b.entry.pinyin.length;
    }
    return a.index - b.index;
  });

  return ranked.map((item) => item.entry);
}

export function filterByLevel(entries: HSKEntry[], level: string | null): HSKEntry[] {
  if (!level) return entries;
  return entries.filter(entry => entry.level === level);
}

export function filterByCategory(entries: HSKEntry[], category: string | null): HSKEntry[] {
  if (!category) return entries;
  return entries.filter(entry => entry.category === category);
}

export function removeToneMarks(pinyin: string): string {
  const toneMap: Record<string, string> = {
    'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
    'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
    'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
    'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
    'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
    'ǖ': 'v', 'ǘ': 'v', 'ǚ': 'v', 'ǜ': 'v', 'ü': 'v',
  };

  return pinyin.split('').map(char => toneMap[char] || char).join('');
}

export function getUniqueCategories(entries: HSKEntry[]): string[] {
  const categories = new Set(entries.map(e => e.category));
  return Array.from(categories).sort();
}

export function getUniqueThemes(entries: HSKEntry[]): string[] {
  const themes = new Set(entries.map(e => e.theme));
  return Array.from(themes).sort();
}

function rankEntry(
  entry: HSKEntry,
  query: QueryInfo,
  mode: DictionarySearchMode,
): { score: number; pinyinRank: number } {
  const canUsePinyin = mode !== 'translation';
  const canUseTranslations = mode !== 'pinyin';
  const canUseHanzi = mode !== 'translation';

  const hanziScore = canUseHanzi ? scoreHanzi(entry.hanzi, query.raw) : 0;
  const pinyinMatch = canUsePinyin ? scorePinyin(entry.pinyin, query) : { score: 0, rank: 99 };
  const translationScore = canUseTranslations
    ? Math.max(
      scoreTextField(entry.translationFr, query.latinNoDigits),
      scoreEnglishTextField(entry.translationEn || entry.translation || '', query.latinNoDigits),
      scoreAlternatives(entry.translationFrAlt, query.latinNoDigits),
    )
    : 0;
  const tagScore = canUseTranslations ? scoreTags(entry.tags, query.latinNoDigits) : 0;

  return {
    score: Math.max(hanziScore, pinyinMatch.score, translationScore, tagScore),
    pinyinRank: pinyinMatch.rank,
  };
}

function scoreHanzi(hanzi: string, query: string): number {
  if (!query) return 0;
  if (hanzi === query) return 320;
  if (hanzi.startsWith(query)) return 280;
  if (hanzi.includes(query)) return 240;
  return 0;
}

function scorePinyin(pinyin: string, query: QueryInfo): { score: number; rank: number } {
  if (!query.raw) return { score: 0, rank: 99 };

  const pinyinRaw = normalizeSpaces(pinyin.toLowerCase());
  const pinyinRawCompact = compact(pinyinRaw);
  const pinyinLatin = normalizeLatin(pinyinRaw);
  const pinyinLatinCompact = compact(pinyinLatin);

  let score = 0;
  let rank = 99;

  if (query.rawCompact && pinyinRawCompact === query.rawCompact) {
    score = 230;
    rank = 0;
  } else if (query.latinNoDigitsCompact && pinyinLatinCompact === query.latinNoDigitsCompact) {
    score = 220;
    rank = 0;
  } else if (query.rawCompact && pinyinRawCompact.startsWith(query.rawCompact)) {
    score = 200;
    rank = 1;
  } else if (query.latinNoDigitsCompact && pinyinLatinCompact.startsWith(query.latinNoDigitsCompact)) {
    score = 190;
    rank = 1;
  } else if (query.latinNoDigits && hasWordBoundaryMatch(pinyinLatin, query.latinNoDigits)) {
    score = 176;
    rank = 1;
  } else if (query.latinNoDigitsCompact && pinyinLatinCompact.includes(query.latinNoDigitsCompact)) {
    score = 165;
    rank = 2;
  } else if (query.rawCompact && pinyinRawCompact.includes(query.rawCompact)) {
    score = 155;
    rank = 2;
  }

  if (query.toneQuery && query.latinNoDigitsCompact) {
    const hasMatchingTone = query.toneQuery.variants.some((variant) => pinyinRaw.includes(variant));
    const hasAnyToneForSyllable = query.toneQuery.anyToneVariants.some((variant) =>
      pinyinRaw.includes(variant),
    );

    if (hasMatchingTone) {
      score += 48;
      rank = Math.min(rank, 0);
    } else if (hasAnyToneForSyllable && pinyinLatinCompact.includes(query.latinNoDigitsCompact)) {
      score = Math.max(score - 24, 1);
      rank = Math.max(rank, 2);
    }
  }

  return { score, rank };
}

function scoreAlternatives(alternatives: string[] | undefined, query: string): number {
  if (!alternatives || alternatives.length === 0 || !query) return 0;
  let best = 0;
  for (const alt of alternatives) {
    best = Math.max(best, scoreTextField(alt, query));
  }
  return best;
}

function scoreTags(tags: string[], query: string): number {
  if (!query || tags.length === 0) return 0;
  let best = 0;
  for (const tag of tags) {
    const score = scoreTextField(tag, query);
    if (score > 0) {
      best = Math.max(best, Math.max(score - 20, 40));
    }
  }
  return best;
}

function scoreTextField(value: string, query: string): number {
  if (!value || !query) return 0;
  const text = normalizeTextField(value);
  if (!text) return 0;

  if (text === query) return 136;
  if (text.startsWith(query)) return 120;
  if (hasWordBoundaryMatch(text, query)) return 108;
  if (text.includes(query)) return 94;
  return 0;
}

function scoreEnglishTextField(value: string, query: string): number {
  if (!value || !query) return 0;
  const text = normalizeTextField(value);
  if (!text) return 0;

  const infinitive = `to ${query}`;
  if (text === infinitive) return 154;
  if (text.startsWith(`${infinitive} `)) return 146;
  if (text.includes(` ${infinitive} `)) return 130;

  return scoreTextField(value, query);
}

function hasWordBoundaryMatch(text: string, query: string): boolean {
  if (!text || !query) return false;
  const normalizedText = ` ${text.replace(/[^a-z0-9]+/g, ' ')} `;
  const normalizedQuery = query.replace(/[^a-z0-9]+/g, ' ').trim();
  if (!normalizedQuery) return false;
  return normalizedText.includes(` ${normalizedQuery} `);
}

function normalizeTextField(value: string): string {
  return normalizeLatin(value)
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(WHITESPACE_REGEX, ' ')
    .trim();
}

function buildQueryInfo(query: string): QueryInfo {
  const raw = normalizeSpaces(query);
  const rawLower = raw.toLowerCase();
  const rawCompact = compact(rawLower);
  const latin = normalizeLatin(rawLower);
  const latinCompact = compact(latin);
  const latinNoDigits = latin.replace(/[1-5]/g, '');
  const latinNoDigitsCompact = compact(latinNoDigits);

  return {
    raw,
    rawLower,
    rawCompact,
    latin,
    latinCompact,
    latinNoDigits,
    latinNoDigitsCompact,
    toneQuery: extractToneQuery(latinCompact),
  };
}

function extractToneQuery(latinCompactQuery: string): ToneQuery | null {
  const match = latinCompactQuery.match(/^([a-zv]+)([1-5])$/);
  if (!match) return null;

  const base = match[1];
  const tone = match[2] as ToneDigit;
  const variants = generateToneVariants(base, tone);
  const anyToneVariants = Array.from(
    new Set(TONES_FOR_VARIANTS.flatMap((toneDigit) => generateToneVariants(base, toneDigit))),
  );

  return {
    base,
    tone,
    variants,
    anyToneVariants,
  };
}

function generateToneVariants(base: string, tone: ToneDigit): string[] {
  const syllable = base.replace(/v/g, 'ü');
  const out = new Set<string>();

  for (let index = 0; index < syllable.length; index += 1) {
    const current = syllable[index];
    const normalizedVowel = current === 'ü' ? 'v' : (current as 'a' | 'e' | 'i' | 'o' | 'u' | 'v');
    if (!(normalizedVowel in TONE_CHAR_BY_VOWEL)) continue;

    const replacement = TONE_CHAR_BY_VOWEL[normalizedVowel][tone];
    out.add(`${syllable.slice(0, index)}${replacement}${syllable.slice(index + 1)}`);
  }

  if (out.size === 0) {
    out.add(syllable);
  }

  return Array.from(out);
}

function normalizeLatin(value: string): string {
  return value
    .normalize('NFD')
    .replace(COMBINING_MARKS_REGEX, '')
    .replace(/ü/g, 'v')
    .replace(/[^a-z0-9\u4e00-\u9fff\s'’\-]/g, ' ')
    .replace(/[’]/g, "'")
    .replace(WHITESPACE_REGEX, ' ')
    .trim();
}

function normalizeSpaces(value: string): string {
  return value.replace(WHITESPACE_REGEX, ' ').trim();
}

function compact(value: string): string {
  return value.replace(WHITESPACE_REGEX, '');
}
