import { defineCollection, z } from 'astro:content';
import { promises as fs } from 'node:fs';
import { basename } from 'node:path';
import yaml from 'js-yaml';

type NuanceCategory = 'synonymes' | 'homophones' | 'caracteres-similaires' | 'grammaire-proche';

interface HSKLexicon {
  wordLevel: Map<string, number>;
  charLevel: Map<string, number>;
}

interface WordPinyinPair {
  word: string;
  pinyin: string;
}

interface ExpressionPair {
  words: string[];
  pinyin: string[];
}

let hskLexiconPromise: Promise<HSKLexicon> | null = null;

const grammaireCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    level: z.number().min(1).max(4),
    category: z.enum([
      'structure-phrase',
      'particules',
      'classificateurs',
      'aspects-verbaux',
      'comparaison',
      'questions',
      'negation',
      'temps',
      'complement',
      'autres'
    ]),
    order: z.number(),
    summary: z.string(),
    keyPoints: z.array(z.string()),
    relatedGrammar: z.array(z.string()).optional(),
    relatedWords: z.array(z.string()).optional(),
    difficulty: z.enum(['debutant', 'débutant', 'intermediaire', 'intermédiaire']),
    lastUpdated: z.date(),
  }),
});

function parseFrontmatterAndHtml(content: string, fileName: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return null;

  const rawData = yaml.load(match[1]);
  if (!rawData || typeof rawData !== 'object') {
    throw new Error(`Frontmatter invalide dans ${fileName}`);
  }

  return {
    data: rawData as Record<string, unknown>,
    html: match[2].trim(),
  };
}

function stripTags(text: string): string {
  return text
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\[cite_start\]/g, '')
    .replace(/\[cite:\s*[^\]]+\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractHanzi(text: string): string {
  return (text.match(/[\u4e00-\u9fff]+/g) || []).join('');
}

function slugTokenCount(fileName: string): number {
  return basename(fileName, '.html')
    .split('-')
    .filter(Boolean)
    .length;
}

function extractBodyHtml(content: string): string {
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1].trim() : content.trim();
  return body.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '').trim();
}

function extractTitle(content: string, fileName: string): string {
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    const title = stripTags(h1Match[1]);
    if (title) return title;
  }

  const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    const title = stripTags(titleMatch[1]).replace(/^Analyse\s*:\s*/i, '').trim();
    if (title) return title;
  }

  return basename(fileName, '.html').replace(/-/g, ' ');
}

function extractWords(content: string, fileName: string): string[] {
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1Text = stripTags(h1Match?.[1] || '');
  const hanziWords = h1Text.match(/[\u4e00-\u9fff]+/g) || [];

  const uniqueHanziWords = [...new Set(hanziWords)];
  if (uniqueHanziWords.length > 0) return uniqueHanziWords;

  const slugTokens = basename(fileName, '.html')
    .split('-')
    .map((token) => normalizePinyinSlug(token))
    .filter(Boolean);

  const expressions = extractExpressionPairs(content);
  const exprWords = matchWordsFromExpressions(slugTokens, expressions);
  if (exprWords) return exprWords;

  const pairs = extractWordPinyinPairs(content);
  if (pairs.length > 0) {
    const used = new Set<number>();
    const matchedWords: string[] = [];

    for (const token of slugTokens) {
      let matchIndex = pairs.findIndex((pair, idx) =>
        !used.has(idx) && normalizePinyinSlug(pair.pinyin) === token
      );

      if (matchIndex < 0) {
        matchIndex = pairs.findIndex((pair, idx) =>
          !used.has(idx) && normalizePinyinSlug(pair.pinyin).startsWith(token)
        );
      }

      if (matchIndex >= 0) {
        used.add(matchIndex);
        matchedWords.push(pairs[matchIndex].word);
      }
    }

    if (matchedWords.length > 0) {
      return matchedWords;
    }

    const shortPairs = pairs.filter((pair) => pair.word.length <= 4);
    const source = shortPairs.length > 0 ? shortPairs : pairs;
    const count = Math.max(1, slugTokenCount(fileName));
    return source.slice(0, count).map((pair) => pair.word);
  }

  const slugWords = basename(fileName, '.html')
    .split('-')
    .filter(Boolean);

  return slugWords.length > 0 ? slugWords : [basename(fileName, '.html')];
}

function normalizePinyin(value: string): string {
  return stripTags(value)
    .replace(/[ăĂ]/g, 'ǎ')
    .replace(/[ĕĔ]/g, 'ě')
    .replace(/[ĭĬ]/g, 'ǐ')
    .replace(/[ŏŎ]/g, 'ǒ')
    .replace(/[ŭŬ]/g, 'ǔ')
    .replace(/^\(|\)$/g, '')
    .replace(/[。，！？；：]/g, (m) => ({
      '。': '.',
      '，': ',',
      '！': '!',
      '？': '?',
      '；': ';',
      '：': ':',
    }[m] || m))
    .replace(/\s+/g, ' ')
    .trim();
}

function splitPinyinSequence(raw: string): string[] {
  return raw
    .replace(/[，、；]/g, '/')
    .replace(/\.{3,}/g, '/')
    .replace(/…+/g, '/')
    .split('/')
    .map((item) => normalizePinyin(item))
    .filter(Boolean);
}

function extractWordPinyinPairs(content: string): WordPinyinPair[] {
  const pairRegex = /([\u4e00-\u9fff]{1,8})\s*[（(]\s*([A-Za-zāáǎàăēéěèĕīíǐìĭōóǒòŏūúǔùŭǖǘǚǜüÜĀÁǍÀĂĒÉĚÈĔĪÍǏÌĬŌÓǑÒŎŪÚǓÙŬǕǗǙǛ0-9\s.'-]+)\s*[)）]/g;
  const seen = new Set<string>();
  const pairs: WordPinyinPair[] = [];

  const headingRegex = /<(h1|h2|h3|h4|strong)[^>]*>([\s\S]*?)<\/\1>/gi;
  const headingText = [...content.matchAll(headingRegex)]
    .map((m) => stripTags(m[2] || ''))
    .join(' ');

  const compact = content
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');

  for (const source of [headingText, compact]) {
    for (const match of source.matchAll(pairRegex)) {
      const word = (match[1] || '').trim();
      const pinyin = normalizePinyin(match[2] || '');
      if (!word || !pinyin) continue;

      if (!seen.has(word)) {
        seen.add(word);
        pairs.push({ word, pinyin });
      }
    }
  }

  return pairs;
}

function stripPinyinTones(value: string): string {
  const toneMap: Record<string, string> = {
    ā: 'a', á: 'a', ǎ: 'a', à: 'a',
    ă: 'a',
    ē: 'e', é: 'e', ě: 'e', è: 'e',
    ĕ: 'e',
    ī: 'i', í: 'i', ǐ: 'i', ì: 'i',
    ĭ: 'i',
    ō: 'o', ó: 'o', ǒ: 'o', ò: 'o',
    ŏ: 'o',
    ū: 'u', ú: 'u', ǔ: 'u', ù: 'u',
    ŭ: 'u',
    ǖ: 'v', ǘ: 'v', ǚ: 'v', ǜ: 'v',
    ü: 'v',
  };

  return value
    .toLowerCase()
    .split('')
    .map((ch) => toneMap[ch] || ch)
    .join('')
    .replace(/[^a-zv]/g, '');
}

function normalizePinyinSlug(value: string): string {
  return stripPinyinTones(value).replace(/[^a-zv]/g, '');
}

function extractExpressionPairs(content: string): ExpressionPair[] {
  const compact = content
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');

  const expressionRegex = /([\u4e00-\u9fff……、，,\s]{2,})\s*[（(]\s*([A-Za-zāáǎàăēéěèĕīíǐìĭōóǒòŏūúǔùŭǖǘǚǜüÜĀÁǍÀĂĒÉĚÈĔĪÍǏÌĬŌÓǑÒŎŪÚǓÙŬǕǗǙǛ0-9\s.'\-\/,…，；:]+)\s*[)）]/g;
  const out: ExpressionPair[] = [];

  for (const match of compact.matchAll(expressionRegex)) {
    const words = (match[1].match(/[\u4e00-\u9fff]{1,8}/g) || []);
    const pinyin = splitPinyinSequence(match[2] || '');
    if (words.length >= 2 && pinyin.length >= 2) {
      out.push({ words, pinyin });
    }
  }

  return out;
}

function matchWordsFromExpressions(
  slugTokens: string[],
  expressions: ExpressionPair[],
): string[] | null {
  if (slugTokens.length === 0) return null;

  for (const expr of expressions) {
    const maxStart = Math.min(expr.words.length, expr.pinyin.length) - slugTokens.length;
    for (let start = 0; start <= maxStart; start++) {
      const ok = slugTokens.every((token, i) => {
        const target = normalizePinyinSlug(expr.pinyin[start + i] || '');
        return target === token || target.startsWith(token);
      });
      if (ok) return expr.words.slice(start, start + slugTokens.length);
    }
  }

  return null;
}

function matchPinyinFromExpressions(
  words: string[],
  expressions: ExpressionPair[],
): string[] | null {
  if (words.length === 0) return null;

  for (const expr of expressions) {
    const maxStart = Math.min(expr.words.length, expr.pinyin.length) - words.length;
    for (let start = 0; start <= maxStart; start++) {
      const ok = words.every((word, i) => expr.words[start + i] === word);
      if (ok) return expr.pinyin.slice(start, start + words.length).map(normalizePinyin);
    }
  }

  return null;
}

function parseLevelValue(raw: unknown, fallback: number): number {
  if (typeof raw === 'number' && Number.isFinite(raw)) return raw;
  if (typeof raw === 'string') {
    const match = raw.match(/(\d+)/);
    if (match) return Number.parseInt(match[1], 10);
  }
  return fallback;
}

async function loadHSKLexicon(): Promise<HSKLexicon> {
  if (hskLexiconPromise) return hskLexiconPromise;

  hskLexiconPromise = (async () => {
    const wordLevel = new Map<string, number>();
    const charLevel = new Map<string, number>();

    try {
      const dictDir = new URL('../../../xiaolearn_dictionnary/data/', import.meta.url);
      const entries = await fs.readdir(dictDir, { withFileTypes: true });
      const hskFiles = entries
        .filter((entry) => entry.isFile() && /^hsk\d+\.json$/i.test(entry.name))
        .sort((a, b) => a.name.localeCompare(b.name));

      for (const file of hskFiles) {
        const fileLevelMatch = file.name.match(/hsk(\d+)\.json/i);
        const fileLevel = fileLevelMatch ? Number.parseInt(fileLevelMatch[1], 10) : 2;
        const fileUrl = new URL(file.name, dictDir);
        const source = await fs.readFile(fileUrl, 'utf-8');
        const parsed = JSON.parse(source);
        if (!Array.isArray(parsed)) continue;

        for (const item of parsed) {
          if (!item || typeof item !== 'object') continue;
          const row = item as Record<string, unknown>;
          const hanzi = String(row.hanzi ?? '').trim();
          if (!hanzi) continue;

          const level = parseLevelValue(row.level, fileLevel);
          const safeLevel = Math.max(1, level);

          if (!wordLevel.has(hanzi) || safeLevel < (wordLevel.get(hanzi) || safeLevel)) {
            wordLevel.set(hanzi, safeLevel);
          }

          for (const char of extractHanzi(hanzi)) {
            if (!charLevel.has(char) || safeLevel < (charLevel.get(char) || safeLevel)) {
              charLevel.set(char, safeLevel);
            }
          }
        }
      }
    } catch {
      // Fallback silently to default inference when dictionary is unavailable.
    }

    return { wordLevel, charLevel };
  })();

  return hskLexiconPromise;
}

function inferLegacyLevel(words: string[], lexicon: HSKLexicon): number {
  const levels: number[] = [];

  for (const word of words) {
    const hanzi = extractHanzi(word);
    if (!hanzi) continue;

    const wordLevel = lexicon.wordLevel.get(hanzi);
    if (wordLevel) {
      levels.push(wordLevel);
      continue;
    }

    for (const char of hanzi) {
      const charLevel = lexicon.charLevel.get(char);
      if (charLevel) levels.push(charLevel);
    }
  }

  if (levels.length === 0) return 2;
  const inferred = Math.max(...levels);
  return Math.min(4, Math.max(1, inferred));
}

function inferLegacyCategory(
  words: string[],
  pinyin: string[],
  title: string,
  summary: string,
): NuanceCategory {
  const grammarWords = new Set([
    '的', '地', '得', '了', '着', '过', '把', '被',
    '比', '和', '在', '再', '又', '还', '才', '就',
    '会', '能', '可以', '将', '要', '不', '没',
    '以前', '以后', '一点儿', '有点儿', '还是', '而是', '是否',
  ]);
  const grammarHint = /particule|grammaire|structure|négation|preposition|préposition|adverbe|conjonction|comparaison|temps|modal|impératif|complément/i;
  const normalizedText = `${title} ${summary}`;

  if (grammarHint.test(normalizedText) || words.some((w) => grammarWords.has(extractHanzi(w)))) {
    return 'grammaire-proche';
  }

  if (pinyin.length >= 2) {
    const comparable = pinyin
      .map(stripPinyinTones)
      .filter(Boolean);
    if (comparable.length >= 2) {
      const allSame = comparable.every((item) => item === comparable[0]);
      if (allSame) return 'homophones';
    }
  }

  return 'synonymes';
}

function extractPinyin(content: string, words: string[]): string[] {
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1Html = h1Match?.[1] || '';

  const pinyinInH1 = [...h1Html.matchAll(/<span class="pinyin">([\s\S]*?)<\/span>/gi)]
    .map((m) => normalizePinyin(m[1]))
    .filter(Boolean);

  let candidates = pinyinInH1;
  if (candidates.length === 0) {
    const expressions = extractExpressionPairs(content);
    const matchedPinyin = matchPinyinFromExpressions(words, expressions);
    if (matchedPinyin) return matchedPinyin;

    const pairs = extractWordPinyinPairs(content);
    if (pairs.length > 0) {
      const pairMap = new Map(pairs.map((pair) => [pair.word, pair.pinyin]));
      const mapped = words
        .map((word) => pairMap.get(word))
        .filter((value): value is string => Boolean(value));
      if (mapped.length === words.length) return mapped;

      candidates = pairs.map((pair) => pair.pinyin).filter(Boolean);
    } else {
      candidates = [...content.matchAll(/<span class="pinyin">([\s\S]*?)<\/span>/gi)]
        .map((m) => normalizePinyin(m[1]))
        .filter(Boolean);
    }
  }

  if (candidates.length === 0) {
    return words;
  }

  if (candidates.length < words.length) {
    return [...candidates, ...words.slice(candidates.length)];
  }

  return candidates.slice(0, words.length);
}

function extractSummary(content: string, title: string): string {
  const body = extractBodyHtml(content);
  const paragraphMatch = body.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const firstParagraph = stripTags(paragraphMatch?.[1] || '');

  const fallback = `Comprendre les nuances d'usage autour de ${title}.`;
  const base = firstParagraph || fallback;

  if (base.length <= 180) return base;
  return `${base.slice(0, 177).trimEnd()}...`;
}

function parseLegacyNuance(
  content: string,
  fileName: string,
  lastUpdated: Date,
  lexicon: HSKLexicon,
) {
  const title = extractTitle(content, fileName);
  const words = extractWords(content, fileName);
  const pinyin = extractPinyin(content, words);
  const summary = extractSummary(content, title);
  const html = extractBodyHtml(content);
  const level = inferLegacyLevel(words, lexicon);
  const category = inferLegacyCategory(words, pinyin, title, summary);

  return {
    title,
    words,
    pinyin,
    level,
    category,
    summary,
    lastUpdated,
    html,
  };
}

const nuancesCollection = defineCollection({
  loader: async () => {
    const nuancesDir = new URL('./nuances/', import.meta.url);
    const hskLexicon = await loadHSKLexicon();
    const entries = await fs.readdir(nuancesDir, { withFileTypes: true });

    const htmlFiles = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
      .sort((a, b) => a.name.localeCompare(b.name));

    return await Promise.all(
      htmlFiles.map(async (file) => {
        const fileUrl = new URL(file.name, nuancesDir);
        const source = await fs.readFile(fileUrl, 'utf-8');
        const frontmatterResult = parseFrontmatterAndHtml(source, file.name);
        const stats = await fs.stat(fileUrl);

        if (frontmatterResult) {
          return {
            id: basename(file.name, '.html'),
            ...frontmatterResult.data,
            html: frontmatterResult.html,
          };
        }

        const legacyData = parseLegacyNuance(source, file.name, stats.mtime, hskLexicon);

        return {
          id: basename(file.name, '.html'),
          ...legacyData,
        };
      }),
    );
  },
  schema: z.object({
    title: z.string(),
    words: z.array(z.string()),
    pinyin: z.array(z.string()),
    level: z.number().min(1).max(4),
    category: z.enum([
      'synonymes',
      'homophones',
      'caracteres-similaires',
      'grammaire-proche'
    ]),
    summary: z.string(),
    relatedNuances: z.array(z.string()).optional(),
    relatedGrammar: z.array(z.string()).optional(),
    lastUpdated: z.coerce.date(),
    html: z.string(),
  }),
});

const cultureCollection = defineCollection({
  loader: async () => {
    const cultureDir = new URL('./culture/', import.meta.url);
    const entries = await fs.readdir(cultureDir, { withFileTypes: true });

    const htmlFiles = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
      .sort((a, b) => a.name.localeCompare(b.name));

    return await Promise.all(
      htmlFiles.map(async (file) => {
        const fileUrl = new URL(file.name, cultureDir);
        const source = await fs.readFile(fileUrl, 'utf-8');
        const frontmatterResult = parseFrontmatterAndHtml(source, file.name);

        if (!frontmatterResult) {
          throw new Error(`Frontmatter obligatoire dans ${file.name}`);
        }

        const stats = await fs.stat(fileUrl);
        return {
          id: basename(file.name, '.html'),
          ...frontmatterResult.data,
          lastUpdated: frontmatterResult.data.lastUpdated ?? stats.mtime,
          html: frontmatterResult.html,
        };
      }),
    );
  },
  schema: z.object({
    title: z.string(),
    category: z.enum(['fete', 'repere']),
    summary: z.string(),
    hanzi: z.string().optional(),
    pinyin: z.string().optional(),
    period: z.string().optional(),
    monthStart: z.number().min(1).max(12).optional(),
    monthEnd: z.number().min(1).max(12).optional(),
    traditions: z.array(z.string()).optional(),
    icon: z.string().optional(),
    keyPoints: z.array(z.string()).optional(),
    sources: z.array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      }),
    ).optional(),
    tags: z.array(z.string()).optional(),
    lastUpdated: z.coerce.date(),
    html: z.string(),
  }),
});

export const collections = {
  grammaire: grammaireCollection,
  nuances: nuancesCollection,
  culture: cultureCollection,
};
