/**
 * vocab-lookup.ts — utilitaires pour rendre les hanzi cliquables et faire
 * un lookup dictionnaire compact (CFDICT + pinyin-pro).
 *
 * Utilisé par Prof. Xiao pour afficher la popup vocabulaire au clic.
 */
import { pinyin as pinyinPro } from 'pinyin-pro';
import cfdictData from '../data/cfdict-compact.json';

const CFDICT_MAP = cfdictData as Record<string, string>;

/**
 * Heuristique : détecte si une chaîne ressemble à du pinyin (que des
 * caractères latins + diacritiques pinyin + espaces). Sert à éviter de
 * confondre un pinyin alternatif `(nǐmen hǎo)` avec une vraie traduction.
 */
const looksLikePinyin = (s: string): boolean => {
  if (!s) return false;
  // Caractères autorisés dans du pinyin : a-z, A-Z, espaces, tirets,
  // diacritiques tonales courantes (ā á ǎ à ē é ě è ī í ǐ ì ō ó ǒ ò ū ú ǔ ù
  // ǚ ü Ü), apostrophe (pour 'an, 'ai…), et chiffres (tons numériques).
  return /^[a-zA-Z\s\-'āáǎàĀÁǍÀēéěèĒÉĚÈīíǐìĪÍǏÌōóǒòŌÓǑÒūúǔùŪÚǓÙǚǖǘǜÜüńňǹ0-9]+$/.test(
    s.trim()
  );
};

/**
 * Calcule le pinyin d'une chaîne chinoise. Retourne '' en cas d'échec.
 */
export const pinyinFor = (hanzi: string): string => {
  if (!hanzi || !hasChinese(hanzi)) return '';
  try {
    return pinyinPro(hanzi, { toneType: 'symbol', type: 'string' }) as string;
  } catch {
    return '';
  }
};

export interface ChineseExample {
  hanzi: string;
  pinyin: string;
  /** Traduction française si on a réussi à l'extraire du contexte, sinon undefined. */
  translation?: string;
}

/**
 * Cherche un exemple de phrase contenant un mot, dans une liste de messages.
 * Heuristique :
 *   - Découpe chaque message en phrases (sur `。！？.!?\n`).
 *   - Garde celles qui contiennent `word` ET qui font entre 2 et 30 hanzi.
 *   - Tente d'extraire une traduction si la phrase est suivie d'un pattern
 *     `(pinyin - traduction)` ou `— traduction` ou `: traduction`.
 *   - Renvoie le 1er match.
 *
 * On évite la phrase qui est juste `word` tout seul (pas un vrai exemple).
 */
export const findExampleSentence = (
  word: string,
  texts: string[]
): ChineseExample | null => {
  if (!word) return null;
  const target = word.trim();
  if (!target) return null;

  for (const text of texts) {
    if (!text || !text.includes(target)) continue;

    // Découpe sur la ponctuation chinoise + occidentale + retours ligne
    const sentences = text
      .split(/(?<=[。！？.!?\n])\s*/g)
      .map((s) => s.trim())
      .filter(Boolean);

    for (let i = 0; i < sentences.length; i++) {
      const s = sentences[i];
      // Capture la partie chinoise principale de la phrase
      const zhMatch = s.match(/[㐀-鿿，、；：""''《》「」（）()]+/);
      if (!zhMatch) continue;
      const zh = zhMatch[0]
        .replace(/[，、；：""''《》「」（）()]/g, '')
        .trim();
      if (!zh || !zh.includes(target)) continue;
      const zhLen = Array.from(zh).length;
      if (zhLen < 2 || zhLen > 30) continue;
      if (zh === target) continue; // pas le mot tout seul

      // Cherche une traduction dans la suite de la phrase ou la phrase suivante
      let translation: string | undefined;
      const after = s.slice(s.indexOf(zhMatch[0]) + zhMatch[0].length);
      // Pattern (pinyin - traduction) : on ne prend que ce qu'il y a APRÈS
      // un tiret/em-dash. Si la parenthèse contient juste du pinyin seul
      // (ex: `你们好 (nǐmen hǎo)`), on l'ignore — sinon on doublonne avec
      // le pinyin calculé par pinyin-pro plus haut.
      const parenMatch = after.match(/\(([^)]+)\)/);
      if (parenMatch) {
        const inside = parenMatch[1];
        const dashIdx = inside.search(/[-—–]/);
        if (dashIdx >= 0) {
          const candidate = inside.slice(dashIdx + 1).trim();
          if (candidate && !looksLikePinyin(candidate)) {
            translation = candidate;
          }
        }
      }
      // Pattern : « zh — traduction » sur la même phrase (hors parenthèses)
      if (!translation) {
        const dashMatch = after.match(/\s*[—–-]\s*([^。.!?\n(]+)/);
        if (dashMatch) {
          const candidate = dashMatch[1].trim();
          if (candidate && !looksLikePinyin(candidate)) {
            translation = candidate;
          }
        }
      }

      return {
        hanzi: zh,
        pinyin: pinyinFor(zh),
        translation: translation || undefined
      };
    }
  }
  return null;
};

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
 * Seuil minimal de hanzi consécutifs pour considérer un bloc comme une
 * "phrase d'exemple" cliquable. En dessous (1 ou 2 hanzi isolés dans un
 * paragraphe d'explication français — typiquement "la particule 了"), le
 * lookup CFDICT donnerait une traduction hors contexte (了 → "finir" alors
 * qu'ici c'est une particule) et un pinyin polyphonique faux (liǎo au lieu
 * de le). On préfère ne PAS rendre cliquables ces mentions inline.
 */
const MIN_CHINESE_RUN_FOR_CLICK = 3;

/**
 * Découpe un texte mixte (chinois + latin/ponctuation) en segments.
 * Les segments chinois ≥ MIN_CHINESE_RUN_FOR_CLICK hanzi sont tokenisés en
 * mots cliquables (via Intl.Segmenter). Les blocs plus courts (mentions
 * inline d'un seul caractère) restent en texte non-cliquable.
 */
export const tokenizeMixedText = (text: string): ChineseSegment[] => {
  const out: ChineseSegment[] = [];
  let buffer = '';
  let bufferIsZh = false;

  const flush = () => {
    if (!buffer) return;
    const hanziCount = Array.from(buffer).filter((c) => /[㐀-鿿]/.test(c)).length;
    if (bufferIsZh && hanziCount >= MIN_CHINESE_RUN_FOR_CLICK) {
      // Tokenise les blocs de hanzi en mots cliquables
      for (const tok of segmentChinese(buffer)) {
        if (tok) out.push({ text: tok, isChinese: true });
      }
    } else {
      // Bloc trop court (mention inline) — on garde tel quel, non-cliquable
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
