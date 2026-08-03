/**
 * toneColors.ts — coloration des hanzi par ton (schéma Pleco).
 * Port mobile de xiaolearn_app/src/utils/toneColors.ts.
 *   ton 1 = rouge, ton 2 = orange, ton 3 = vert, ton 4 = bleu, neutre = gris.
 * Convention la plus répandue dans l'enseignement du mandarin.
 *
 * Détection : pinyin curé de la carte prioritaire (tons neutres/sandhi encodés
 * à la main), fallback pinyin-pro (contexte mot entier → 多音字 ok). Memoizé.
 */
import { pinyin as pinyinPro } from 'pinyin-pro';

export type Tone = 1 | 2 | 3 | 4 | 5; // 5 = ton neutre

export const TONE_COLORS: Record<Tone, string> = {
  1: '#E53935', // ton 1 (ā) — rouge
  2: '#FB8C00', // ton 2 (á) — orange
  3: '#43A047', // ton 3 (ǎ) — vert
  4: '#1E88E5', // ton 4 (à) — bleu
  5: '#9E9E9E', // ton neutre (a) — gris
};

/** Clé AsyncStorage du réglage (même nom que le localStorage web). */
export const TONE_COLORS_KEY = 'xl_tone_colors_v1';

// Même plage CJK que le reste de l'app.
const HAN_RE = /[㐀-鿿豈-﫿]/;

/** True si le caractère est un sinogramme (la ponctuation ne l'est pas). */
export function isHanChar(ch: string): boolean {
  return HAN_RE.test(ch);
}

// ── Parsing du pinyin curé (diacritiques) ────────────────────────────────────

const TONE_MARKS: Record<string, Tone> = {
  ā: 1, ē: 1, ī: 1, ō: 1, ū: 1, ǖ: 1,
  á: 2, é: 2, í: 2, ó: 2, ú: 2, ǘ: 2,
  ǎ: 3, ě: 3, ǐ: 3, ǒ: 3, ǔ: 3, ǚ: 3,
  à: 4, è: 4, ì: 4, ò: 4, ù: 4, ǜ: 4,
};

const VOWELS = new Set<string>([...'aeiouüv', ...Object.keys(TONE_MARKS)]);

/**
 * Extrait les tons d'un pinyin curé (diacritiques), même sans espaces
 * intra-mot (nǐhǎo). Chaque run contigu de voyelles = une syllabe.
 * Supporte aussi le format numérique (ni3hao3).
 */
function tonesFromCurated(raw: string): Tone[] | null {
  const p = raw.toLowerCase().trim();
  if (!p) return null;
  const tones: Tone[] = [];
  let inRun = false;
  let runTone: Tone = 5;
  for (const ch of p) {
    if (VOWELS.has(ch)) {
      if (!inRun) { inRun = true; runTone = 5; }
      const t = TONE_MARKS[ch];
      if (t) runTone = t;
    } else {
      if (inRun) {
        if (runTone === 5 && ch >= '1' && ch <= '4') runTone = Number(ch) as Tone;
        tones.push(runTone);
        inRun = false;
      }
    }
  }
  if (inRun) tones.push(runTone);
  return tones.length > 0 ? tones : null;
}

/** Ton depuis une syllabe pinyin-pro au format numérique (ni3, ma0). */
function toneFromNumSyllable(syl: string): Tone {
  const m = /([0-5])\s*$/.exec(syl);
  if (!m) return 5;
  const n = Number(m[1]);
  return n >= 1 && n <= 4 ? (n as Tone) : 5;
}

// ── tonesForWord — API principale (memoizée) ─────────────────────────────────

const cache = new Map<string, Tone[]>();
const CACHE_MAX = 2000;

/**
 * Détermine le ton de chaque caractère d'un mot chinois.
 * Source de vérité : le pinyin fourni si parsable et compte de syllabes ==
 * compte de hanzi. Fallback : pinyin-pro. Non-chinois → ton 5.
 */
export function tonesForWord(hanzi: string, pinyin?: string): Tone[] {
  const key = `${hanzi}${pinyin ?? ''}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const chars = Array.from(hanzi);
  const hanCount = chars.reduce((n, ch) => n + (isHanChar(ch) ? 1 : 0), 0);

  // 1) Base pinyin-pro : mot entier (contexte).
  let base: Tone[] = chars.map(() => 5 as Tone);
  try {
    const arr = pinyinPro(hanzi, { type: 'array', toneType: 'num' });
    if (Array.isArray(arr) && arr.length === chars.length) {
      base = chars.map((ch, i) =>
        isHanChar(ch) ? toneFromNumSyllable(arr[i] ?? '') : 5
      );
    } else {
      base = chars.map((ch) =>
        isHanChar(ch)
          ? toneFromNumSyllable(pinyinPro(ch, { toneType: 'num' }))
          : 5
      );
    }
  } catch {
    // pinyin-pro indisponible → tout neutre.
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
