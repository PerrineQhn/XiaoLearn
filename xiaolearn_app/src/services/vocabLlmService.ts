/**
 * vocabLlmService.ts — enrichissement vocab par LLM (Gemini + fallback CF)
 * --------------------------------------------------------------------------
 * Quand le lookup local (lessons + CFDICT) ne donne pas de traduction
 * satisfaisante pour un mot composé chinois, on appelle Gemini avec un
 * prompt court demandant un JSON strict :
 *   {
 *     "translation": "...",
 *     "breakdown": [{ "char": "...", "pinyin": "...", "sense": "..." }]
 *   }
 *
 * La traduction et le sens des caractères tiennent compte de l'éventuelle
 * `contextHint` passée (la phrase d'origine où l'utilisateur a cliqué).
 *
 * Résultats cachés en localStorage (clé `xl_vocab_llm_cache_v1`) sous la
 * forme { [`${hanzi}::${contextDigest}`]: enrichedResult }. Cache permanent
 * (les traductions ne changent pas vite).
 */

import { callLlmProxy } from './llmProxyClient';
// Clés Gemini + Cloudflare AI retirées du bundle. Les deux moteurs sont
// désormais appelés depuis la Cloud Function geminiProxy (server-side),
// qui gère elle-même le fallback Gemini → Cloudflare.

// v2 = ajout du champ `pinyin` contextuel dans VocabEnrichment. Invalider
// les anciennes entrées v1 qui n'avaient pas ce champ.
const CACHE_KEY = 'xl_vocab_llm_cache_v2';

// ---------------------------------------------------------------------------
//  Types publics
// ---------------------------------------------------------------------------

export interface VocabEnrichmentEntry {
  char: string;
  pinyin: string;
  sense: string;
}

export interface VocabEnrichment {
  /** Traduction française du mot composé, dans le sens contextuel. */
  translation: string;
  /**
   * Pinyin contextuel du mot complet. Important pour les polyphones :
   *   - 了 en particule modale = "le", pas "liǎo" (sens dictionnaire premier)
   *   - 行 = "xíng" (aller, OK) vs "háng" (rang, ligne)
   * Ce champ permet au popup d'afficher la prononciation correcte selon le
   * contexte, plutôt que celle par défaut de pinyin-pro.
   */
  pinyin?: string;
  /** Décomposition caractère-par-caractère avec sens contextualisé. */
  breakdown: VocabEnrichmentEntry[];
  /**
   * Traduction française de la phrase d'exemple, si on en a passé une au
   * LLM via `exampleSentence`. Permet d'afficher la phrase complète +
   * traduction dans la section EXEMPLE du popup.
   */
  exampleTranslation?: string;
}

// ---------------------------------------------------------------------------
//  Cache localStorage
// ---------------------------------------------------------------------------

/** Empreinte compacte du contexte pour clé de cache (pas la phrase entière). */
const digestContext = (s: string | undefined): string => {
  if (!s) return 'nox';
  // Hash très simple : somme rolling 32-bit, suffisant pour discriminer
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h) ^ s.charCodeAt(i);
    h &= 0xffffffff;
  }
  return (h >>> 0).toString(36);
};

interface CacheShape {
  [key: string]: VocabEnrichment;
}

const readCache = (): CacheShape => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

const writeCache = (cache: CacheShape) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    /* quota plein, on ignore */
  }
};

/**
 * Clé de cache : on combine le hanzi cliqué et un digest du contexte +
 * phrase d'exemple, pour qu'un changement d'exemple n'invalide pas le
 * cache du sens du mot lui-même (sauf si vraiment différent).
 */
const cacheKey = (
  hanzi: string,
  contextHint: string | undefined,
  exampleSentence: string | undefined
): string => {
  return `${hanzi}::${digestContext(contextHint)}::${digestContext(exampleSentence)}`;
};

/** Récupère un enrichissement caché (synchroniquement). Renvoie null sinon. */
export const getCachedEnrichment = (
  hanzi: string,
  contextHint?: string,
  exampleSentence?: string
): VocabEnrichment | null => {
  const cache = readCache();
  return cache[cacheKey(hanzi, contextHint, exampleSentence)] ?? null;
};

const cacheEnrichment = (
  hanzi: string,
  contextHint: string | undefined,
  exampleSentence: string | undefined,
  data: VocabEnrichment
) => {
  const cache = readCache();
  cache[cacheKey(hanzi, contextHint, exampleSentence)] = data;
  writeCache(cache);
};

// ---------------------------------------------------------------------------
//  Prompt building
// ---------------------------------------------------------------------------

const buildPrompt = (
  hanzi: string,
  contextHint?: string,
  exampleSentence?: string
): string => {
  const contextLine = contextHint
    ? `Contexte (phrase d'origine) : ${contextHint.trim()}`
    : 'Aucun contexte fourni — donne le sens le plus courant en chinois moderne.';
  const chars = Array.from(hanzi).join(', ');
  const exampleBlock = exampleSentence
    ? [
        '',
        `Phrase d'exemple à traduire en français : ${exampleSentence.trim()}`
      ].join('\n')
    : '';
  const schemaExample = exampleSentence
    ? [
        '  "translation": "<traduction française courte du mot dans son sens contextuel, 1 à 5 mots>",',
        '  "pinyin": "<pinyin contextuel du mot complet avec tons diacritiques — IMPORTANT pour les polyphones : 了 en particule = \\"le\\" et non \\"liǎo\\">",',
        '  "breakdown": [',
        '    {"char": "<caractère>", "pinyin": "<pinyin contextuel avec tons diacritiques>", "sense": "<sens contextuel dans CE mot, 1 à 3 mots>"}',
        '  ],',
        '  "exampleTranslation": "<traduction française naturelle et complète de la phrase d\'exemple ci-dessus>"'
      ]
    : [
        '  "translation": "<traduction française courte du mot dans son sens contextuel, 1 à 5 mots>",',
        '  "pinyin": "<pinyin contextuel du mot complet avec tons diacritiques — IMPORTANT pour les polyphones : 了 en particule = \\"le\\" et non \\"liǎo\\">",',
        '  "breakdown": [',
        '    {"char": "<caractère>", "pinyin": "<pinyin contextuel avec tons diacritiques>", "sense": "<sens contextuel dans CE mot, 1 à 3 mots>"}',
        '  ]'
      ];
  return [
    'Tu es un dictionnaire chinois→français pédagogique pour francophones débutants en chinois.',
    `Mot à analyser : ${hanzi}`,
    contextLine,
    `Caractères individuels à expliquer : ${chars}`,
    exampleBlock,
    '',
    'Renvoie STRICTEMENT un JSON valide (et rien d\'autre, pas de markdown, pas de commentaire), au format :',
    '{',
    ...schemaExample,
    '}',
    '',
    'Règles :',
    '- Le pinyin doit utiliser des marques de ton diacritiques (ā á ǎ à).',
    '- Pour chaque caractère, choisis le sens qui rend compte de son rôle DANS CE MOT précis (ex : 会 dans 会说 = "savoir/pouvoir", pas "se réunir").',
    '- IMPORTANT — pour les particules grammaticales, le pinyin est au TON NEUTRE (atone, sans diacritique) : 了 = "le" (pas "liǎo"), 的 = "de" (pas "dí" ni "dì"), 着 = "zhe" (pas "zhāo"), 过 = "guo" (en aspect, atone), 吗 = "ma", 吧 = "ba", 呢 = "ne", 啦 = "la", 嘛 = "ma".',
    '- Quand le contexte indique clairement une particule (ex : "la particule 了", "marqueur d\'aspect"), utilise toujours le ton neutre.',
    '- Traduction du mot = expression française naturelle dans le contexte donné.',
    exampleSentence
      ? '- exampleTranslation = traduction française complète, fluide et naturelle de la phrase d\'exemple (pas mot-à-mot).'
      : '',
    '- Si le mot a plusieurs sens, prends celui qui colle au contexte.'
  ]
    .filter(Boolean)
    .join('\n');
};

// ---------------------------------------------------------------------------
//  JSON extraction
// ---------------------------------------------------------------------------

/**
 * Extrait le premier objet JSON valide d'une chaîne brute, en tolérant
 * un éventuel encadrement markdown ```json ... ```.
 */
const extractJson = (raw: string): VocabEnrichment | null => {
  if (!raw) return null;
  // Strip code fences
  let cleaned = raw.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '');
  // Find first { and last }
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start < 0 || end <= start) return null;
  const slice = cleaned.slice(start, end + 1);
  try {
    const parsed = JSON.parse(slice);
    if (!parsed || typeof parsed !== 'object') return null;
    const translation = typeof parsed.translation === 'string'
      ? parsed.translation.trim()
      : '';
    const pinyin = typeof parsed.pinyin === 'string'
      ? parsed.pinyin.trim()
      : undefined;
    const rawBreakdown = Array.isArray(parsed.breakdown) ? parsed.breakdown : [];
    const breakdown: VocabEnrichmentEntry[] = [];
    for (const item of rawBreakdown) {
      if (
        item &&
        typeof item.char === 'string' &&
        typeof item.pinyin === 'string' &&
        typeof item.sense === 'string'
      ) {
        breakdown.push({
          char: item.char.trim(),
          pinyin: item.pinyin.trim(),
          sense: item.sense.trim()
        });
      }
    }
    const exampleTranslation =
      typeof parsed.exampleTranslation === 'string'
        ? parsed.exampleTranslation.trim()
        : undefined;
    if (!translation && breakdown.length === 0 && !exampleTranslation) {
      return null;
    }
    return { translation, pinyin, breakdown, exampleTranslation };
  } catch {
    return null;
  }
};

// ---------------------------------------------------------------------------
//  Appels API
// ---------------------------------------------------------------------------

async function callProxy(prompt: string): Promise<string | null> {
  try {
    const { text } = await callLlmProxy({
      userMessage: prompt,
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 512,
        responseMimeType: 'application/json'
      }
    });
    return text || null;
  } catch {
    return null;
  }
}

// Note : le fallback Cloudflare AI est désormais géré côté serveur dans
// functions/src/geminiProxy.ts. Plus rien à faire ici.

// ---------------------------------------------------------------------------
//  API publique
// ---------------------------------------------------------------------------

export interface EnrichVocabOptions {
  /** Phrase d'origine où l'utilisateur a cliqué (aide à choisir le sens). */
  contextHint?: string;
  /** Phrase d'exemple à traduire en français en plus du mot. */
  exampleSentence?: string;
}

/**
 * Enrichit un mot vocab via LLM. Renvoie d'abord le cache si présent ;
 * sinon appelle Gemini, puis Cloudflare en fallback, met en cache et
 * renvoie la donnée.
 *
 * Renvoie null si tous les moteurs échouent.
 */
export async function enrichVocabWithLLM(
  hanzi: string,
  options: EnrichVocabOptions = {}
): Promise<VocabEnrichment | null> {
  if (!hanzi) return null;
  const { contextHint, exampleSentence } = options;

  // Cache hit
  const cached = getCachedEnrichment(hanzi, contextHint, exampleSentence);
  if (cached) return cached;

  const prompt = buildPrompt(hanzi, contextHint, exampleSentence);

  // Un seul appel : le proxy server-side gère lui-même Gemini puis fallback
  // Cloudflare AI. Plus de double appel client-side.
  const raw = await callProxy(prompt);
  const data = raw ? extractJson(raw) : null;
  if (data) {
    cacheEnrichment(hanzi, contextHint, exampleSentence, data);
    return data;
  }

  return null;
}
