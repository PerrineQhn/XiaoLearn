/**
 * pinyinTones.ts — utilitaires pour afficher du pinyin avec tons marqués
 * et générer des hints pédagogiques basés sur les scores Azure.
 */

/** Voyelles avec leurs versions tonales (index = ton 1-5, ton 5 = neutre). */
const TONE_MARKS: Record<string, string[]> = {
  a: ['ā', 'á', 'ǎ', 'à', 'a'],
  e: ['ē', 'é', 'ě', 'è', 'e'],
  i: ['ī', 'í', 'ǐ', 'ì', 'i'],
  o: ['ō', 'ó', 'ǒ', 'ò', 'o'],
  u: ['ū', 'ú', 'ǔ', 'ù', 'u'],
  // ü via 'v' parfois renvoyé par Azure, et "u:" en pinyin numérique
  ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ', 'ü'],
  v: ['ǖ', 'ǘ', 'ǚ', 'ǜ', 'ü']
};

/**
 * Convertit une syllabe pinyin "qing" + ton 3 → "qǐng".
 * Règles de placement du diacritique :
 *   - si 'a' présent → sur a
 *   - sinon si 'o' présent → sur o
 *   - sinon si 'e' présent → sur e
 *   - sinon 'iu' → sur u, 'ui' → sur i (le dernier l'emporte)
 *   - sinon → dernière voyelle
 * Ton 5 (neutre) ou pas de ton → pas de diacritique.
 */
export function pinyinWithTone(syllable: string, tone: number | null): string {
  const lower = syllable.toLowerCase().replace(/v/g, 'ü');
  if (tone === null || tone < 1 || tone > 5 || tone === 5) {
    return lower;
  }
  const idx = tone - 1;

  // Trouve la voyelle cible
  let targetIdx = -1;
  if (lower.includes('a')) {
    targetIdx = lower.indexOf('a');
  } else if (lower.includes('o')) {
    targetIdx = lower.indexOf('o');
  } else if (lower.includes('e')) {
    targetIdx = lower.indexOf('e');
  } else if (lower.includes('iu')) {
    targetIdx = lower.indexOf('iu') + 1; // sur le u
  } else if (lower.includes('ui')) {
    targetIdx = lower.indexOf('ui') + 1; // sur le i
  } else {
    // Dernière voyelle
    for (let i = lower.length - 1; i >= 0; i--) {
      if ('aeiouü'.includes(lower[i])) {
        targetIdx = i;
        break;
      }
    }
  }
  if (targetIdx < 0) return lower;

  const ch = lower[targetIdx];
  const marks = TONE_MARKS[ch];
  if (!marks) return lower;
  return lower.slice(0, targetIdx) + marks[idx] + lower.slice(targetIdx + 1);
}

/** Parse "qing 3" → { syllable: "qing", tone: 3 }. */
export function parseAzurePhoneme(raw: string): { syllable: string; tone: number | null } {
  const trimmed = raw.trim();
  const m = trimmed.match(/^(.+?)\s+(\d+)$/);
  if (!m) return { syllable: trimmed, tone: null };
  const tone = parseInt(m[2], 10);
  return { syllable: m[1].toLowerCase(), tone: isNaN(tone) ? null : tone };
}

/**
 * Hints pédagogiques en français selon le ton et le score.
 * Renvoie une suggestion concrète si le score est < 70 (= note "moyenne"
 * ou en dessous). Sinon undefined.
 */
export function hintForTone(
  syllable: string,
  tone: number | null,
  score: number,
  lang: 'fr' | 'en' = 'fr'
): string | undefined {
  if (score >= 70) return undefined;

  const pinyin = pinyinWithTone(syllable, tone);

  if (tone === null) {
    return lang === 'fr'
      ? `Articule mieux « ${pinyin} » — les sons consonne/voyelle doivent être nets.`
      : `Articulate « ${pinyin} » more clearly — make consonants and vowels distinct.`;
  }

  if (lang === 'en') {
    switch (tone) {
      case 1:
        return `Tone 1 on « ${pinyin} » should stay high and flat — like singing one note.`;
      case 2:
        return `Tone 2 on « ${pinyin} » rises — like asking a question.`;
      case 3:
        return `Tone 3 on « ${pinyin} » dips then rises — your voice should fall low first.`;
      case 4:
        return `Tone 4 on « ${pinyin} » falls sharply — like giving a firm order.`;
      case 5:
        return `Neutral tone on « ${pinyin} » — short, soft, unstressed.`;
    }
  }

  switch (tone) {
    case 1:
      return `1ᵉʳ ton sur « ${pinyin} » : voix haute et plate, comme une note tenue.`;
    case 2:
      return `2ᵉ ton sur « ${pinyin} » : voix qui monte, comme une question.`;
    case 3:
      return `3ᵉ ton sur « ${pinyin} » : voix qui descend puis remonte — fais bien le creux.`;
    case 4:
      return `4ᵉ ton sur « ${pinyin} » : voix qui descend net, comme un ordre.`;
    case 5:
      return `Ton neutre sur « ${pinyin} » : court, léger, non accentué.`;
  }
  return undefined;
}
