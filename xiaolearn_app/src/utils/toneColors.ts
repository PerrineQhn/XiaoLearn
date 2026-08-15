/**
 * toneColors.ts — coloration des hanzi par ton (schéma Pleco).
 * --------------------------------------------------------------
 * Chaque caractère chinois est coloré selon son ton :
 *   ton 1 = rouge, ton 2 = vert, ton 3 = bleu, ton 4 = violet,
 *   ton neutre = gris. Schéma standard Pleco, très répandu chez les
 *   apprenants — aide à mémoriser les tons visuellement.
 *
 * Détection des tons (`tonesForWord`) :
 *   1. Base fiable : pinyin-pro sur le mot entier (contexte → 多音字 ok).
 *   2. Override : si la carte fournit un pinyin CURÉ dont le nombre de
 *      syllabes détectables == nombre de hanzi, on utilise SES tons
 *      (les données de l'app encodent à la main les tons neutres — bàba —
 *      et certains sandhi, que pinyin-pro ignore).
 *
 * Le calcul est memoizé (les mêmes mots reviennent très souvent en session).
 */

import { pinyin as pinyinPro } from 'pinyin-pro';

export type Tone = 1 | 2 | 3 | 4 | 5; // 5 = ton neutre

export const TONE_COLORS: Record<Tone, string> = {
  1: '#E53935', // ton 1 (ā) — rouge
  2: '#FB8C00', // ton 2 (á) — orange
  3: '#43A047', // ton 3 (ǎ) — vert
  4: '#1E88E5', // ton 4 (à) — bleu
  5: '#9E9E9E' // ton neutre (a) — gris
};

/** Clé localStorage du réglage utilisateur (Settings → Affichage du chinois). */
export const TONE_COLORS_LS_KEY = 'xl_tone_colors_v1';

/** Lit le réglage « Couleurs par ton ». Défaut : activé. */
export function readToneColorsSetting(): boolean {
  try {
    return window.localStorage.getItem(TONE_COLORS_LS_KEY) !== '0';
  } catch {
    return true;
  }
}

// Même plage CJK que le reste de l'app (cf. WritingCard) + extension A / compat.
const HAN_RE = /[㐀-鿿豈-﫿]/;

/** True si le caractère est un sinogramme (la ponctuation ne l'est pas). */
export function isHanChar(ch: string): boolean {
  return HAN_RE.test(ch);
}

// --------------------------------------------------------------------------
//  Parsing du pinyin curé (diacritiques)
// --------------------------------------------------------------------------

const TONE_MARKS: Record<string, Tone> = {
  ā: 1, ē: 1, ī: 1, ō: 1, ū: 1, ǖ: 1,
  á: 2, é: 2, í: 2, ó: 2, ú: 2, ǘ: 2,
  ǎ: 3, ě: 3, ǐ: 3, ǒ: 3, ǔ: 3, ǚ: 3,
  à: 4, è: 4, ì: 4, ò: 4, ù: 4, ǜ: 4
};

// Noyaux vocaliques possibles d'une syllabe : voyelles nues + formes accentuées.
const VOWELS = new Set<string>([...'aeiouüv', ...Object.keys(TONE_MARKS)]);

/**
 * Extrait les tons d'un pinyin curé (diacritiques), même SANS espaces
 * intra-mot (`nǐhǎo`, `dìtiě`). On ne cherche pas les frontières exactes de
 * syllabes : chaque *run* contigu de voyelles = un noyau = une syllabe, et
 * le diacritique porté par le run donne le ton (aucun diacritique → neutre).
 * Supporte aussi le format numérique (ni3hao3) en bonus.
 *
 * Cas ambigus (voyelles adjacentes inter-syllabes sans apostrophe — Xī'ān
 * écrit xīān — ou erhua yìdiǎnr) → compte de syllabes faux → l'appelant
 * détecte le mismatch et retombe sur pinyin-pro.
 */
function tonesFromCurated(raw: string): Tone[] | null {
  const p = raw.toLowerCase().trim();
  if (!p) return null;
  const tones: Tone[] = [];
  let inRun = false;
  let runTone: Tone = 5;
  for (const ch of p) {
    if (VOWELS.has(ch)) {
      if (!inRun) {
        inRun = true;
        runTone = 5;
      }
      const t = TONE_MARKS[ch];
      if (t) runTone = t;
    } else {
      if (inRun) {
        // Format numérique : chiffre 1-4 juste après la syllabe.
        if (runTone === 5 && ch >= '1' && ch <= '4') {
          runTone = Number(ch) as Tone;
        }
        tones.push(runTone);
        inRun = false;
      }
    }
  }
  if (inRun) tones.push(runTone);
  return tones.length > 0 ? tones : null;
}

// --------------------------------------------------------------------------
//  pinyin-pro (base fiable, ~98 %)
// --------------------------------------------------------------------------

/** Ton depuis une syllabe pinyin-pro au format numérique (`ni3`, `ma0`). */
function toneFromNumSyllable(syl: string): Tone {
  const m = /([0-5])\s*$/.exec(syl);
  if (!m) return 5;
  const n = Number(m[1]);
  return n >= 1 && n <= 4 ? (n as Tone) : 5;
}

// --------------------------------------------------------------------------
//  tonesForWord — API principale (memoizée)
// --------------------------------------------------------------------------

const cache = new Map<string, Tone[]>();
const CACHE_MAX = 2000;

/**
 * Détermine le ton de chaque caractère d'un mot chinois.
 * Source de vérité : le pinyin FOURNI par la carte quand il est parsable et
 * que son compte de syllabes matche le compte de hanzi (tons neutres / sandhi
 * curés). Fallback : pinyin-pro par caractère.
 * Les caractères non-chinois (ponctuation…) reçoivent le ton 5 (neutre).
 */
export function tonesForWord(hanzi: string, pinyin?: string): Tone[] {
  const key = `${hanzi}${pinyin ?? ''}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const chars = Array.from(hanzi);
  const hanCount = chars.reduce((n, ch) => n + (isHanChar(ch) ? 1 : 0), 0);

  // 1) Base pinyin-pro : mot entier (contexte) → un ton par caractère.
  let base: Tone[] = chars.map(() => 5 as Tone);
  try {
    const arr = pinyinPro(hanzi, { type: 'array', toneType: 'num' });
    if (Array.isArray(arr) && arr.length === chars.length) {
      base = chars.map((ch, i) =>
        isHanChar(ch) ? toneFromNumSyllable(arr[i] ?? '') : 5
      );
    } else {
      // Alignement 1:1 impossible (ponctuation / segmentation) → par caractère.
      base = chars.map((ch) =>
        isHanChar(ch)
          ? toneFromNumSyllable(pinyinPro(ch, { toneType: 'num' }))
          : 5
      );
    }
  } catch {
    // pinyin-pro indisponible / entrée exotique → tout neutre (gris).
  }

  // 2) Override par le pinyin curé si le compte de syllabes matche.
  const curated = pinyin ? tonesFromCurated(pinyin) : null;
  if (curated && curated.length === hanCount) {
    let si = 0;
    base = chars.map((ch) => (isHanChar(ch) ? curated[si++] ?? 5 : 5));
  }

  if (cache.size >= CACHE_MAX) cache.clear();
  cache.set(key, base);
  return base;
}
