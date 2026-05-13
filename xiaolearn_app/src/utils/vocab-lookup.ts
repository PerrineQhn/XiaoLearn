/**
 * vocab-lookup.ts — utilitaires pour rendre les hanzi cliquables et faire
 * un lookup dictionnaire compact (CFDICT + pinyin-pro).
 *
 * Utilisé par Prof. Xiao pour afficher la popup vocabulaire au clic.
 */
import { pinyin as pinyinPro } from 'pinyin-pro';
import cfdictData from '../data/cfdict-compact.json';

const CFDICT_MAP = cfdictData as Record<string, string>;

/** True si le texte contient au moins un caractère chinois. */
export const hasChinese = (text: string): boolean =>
  /[㐀-鿿]/.test(text);

/**
 * Segmente un texte chinois en tokens (mots). Utilise Intl.Segmenter si dispo,
 * sinon fallback caractère par caractère.
 */
export const segmentChinese = (text: string): string[] => {
  const IntlAny = Intl as unknown as {
    Segmenter?: new (
      locale: string,
      opts: { granularity: string }
    ) => { segment(t: string): Iterable<{ segment: string }> };
  };
  if (typeof IntlAny.Segmenter === 'function') {
    const segmenter = new IntlAny.Segmenter('zh', { granularity: 'word' });
    return [...segmenter.segment(text)].map((s) => s.segment);
  }
  return Array.from(text);
};

export interface VocabLookupResult {
  hanzi: string;
  pinyin: string;
  translation: string;
  found: boolean;
}

/**
 * Cherche un mot dans CFDICT puis tente une décomposition caractère par
 * caractère si introuvable. Pinyin via pinyin-pro.
 */
export const lookupVocab = (token: string): VocabLookupResult => {
  const hanzi = token.trim();
  if (!hanzi || !hasChinese(hanzi)) {
    return { hanzi, pinyin: '', translation: '', found: false };
  }
  let pinyin = '';
  try {
    pinyin = pinyinPro(hanzi, { toneType: 'symbol', type: 'string' }) as string;
  } catch {
    pinyin = '';
  }
  const direct = CFDICT_MAP[hanzi];
  if (direct) {
    return {
      hanzi,
      pinyin,
      translation: direct.split('/')[0].trim(),
      found: true
    };
  }
  // Fallback : décomposition caractère par caractère
  const chars = Array.from(hanzi);
  if (chars.length > 1) {
    const parts: string[] = [];
    for (const ch of chars) {
      const cf = CFDICT_MAP[ch];
      if (cf) parts.push(`${ch} = ${cf.split('/')[0].trim()}`);
    }
    if (parts.length > 0) {
      return {
        hanzi,
        pinyin,
        translation: parts.join(' · '),
        found: true
      };
    }
  }
  return { hanzi, pinyin, translation: '', found: false };
};

export interface ChineseSegment {
  /** Texte du segment. */
  text: string;
  /** True si c'est un token chinois (cliquable), false si texte latin/ponctuation. */
  isChinese: boolean;
}

/**
 * Découpe un texte mixte (chinois + latin/ponctuation) en segments.
 * Les segments chinois sont eux-mêmes tokenisés en mots (via Intl.Segmenter).
 * Le markdown brut (gras, italique, code) est PRÉSERVÉ — on tokenise
 * uniquement le plain text autour.
 */
export const tokenizeMixedText = (text: string): ChineseSegment[] => {
  const out: ChineseSegment[] = [];
  let buffer = '';
  let bufferIsZh = false;

  const flush = () => {
    if (!buffer) return;
    if (bufferIsZh) {
      // Tokenise les blocs de hanzi en mots
      for (const tok of segmentChinese(buffer)) {
        if (tok) out.push({ text: tok, isChinese: true });
      }
    } else {
      out.push({ text: buffer, isChinese: false });
    }
    buffer = '';
  };

  for (const ch of Array.from(text)) {
    const isZh = /[㐀-鿿]/.test(ch);
    if (isZh !== bufferIsZh) {
      flush();
      bufferIsZh = isZh;
    }
    buffer += ch;
  }
  flush();
  return out;
};
