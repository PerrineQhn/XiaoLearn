/**
 * search-normalize.ts — helpers de normalisation pour toutes les barres de
 * recherche de XiaoLearn.
 *
 * Problème résolu : un utilisateur qui tape "nihao" (sans ton, sans espace)
 * ou "ni3hao3" (avec chiffres de ton) doit pouvoir retrouver l'entrée dont
 * le pinyin canonique est "nǐ hǎo". On expose donc 2 fonctions :
 *
 *   - normalizeSearch(s)        : casse + suppression des diacritiques. Pour
 *                                 traductions, hanzi, titres.
 *   - normalizePinyinCompact(s) : EN PLUS, strippe espaces + chiffres de ton.
 *                                 À appliquer côté query ET côté haystack
 *                                 quand on teste un champ pinyin.
 *
 * Et `matchesSearch(needle, haystack, opts)` qui regroupe les 2 tests pour un
 * usage simple sur des champs polymorphes (hanzi/pinyin/translation).
 */

/** Casse en minuscules + retire les diacritiques (NFD + strip combinings). */
export function normalizeSearch(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

/** Pinyin compact : pas d'espaces, pas de chiffres de ton, pas de diacritiques.
 *  Permet à 'nihao' / 'ni hao' / 'ni3hao3' / 'nǐhǎo' de matcher 'nǐ hǎo'. */
export function normalizePinyinCompact(s: string): string {
  return normalizeSearch(s).replace(/[\s\d]+/g, '');
}

/**
 * Test générique : `needle` (query utilisateur) est-il contenu dans
 * `haystack` (un champ comme hanzi, pinyin, translation) avec les bonnes
 * normalisations selon le type de champ ?
 *
 * @param needle - texte saisi par l'utilisateur
 * @param haystack - champ à fouiller
 * @param opts.pinyin - si true, applique aussi la forme compacte (sans tons)
 */
export function matchesSearch(
  needle: string,
  haystack: string | undefined | null,
  opts?: { pinyin?: boolean }
): boolean {
  if (!needle || typeof haystack !== 'string' || !haystack) return false;
  // Match brut (pour CJK ou recherche exacte avec ponctuation)
  if (haystack.toLowerCase().includes(needle.toLowerCase())) return true;
  // Match normalisé (sans accents)
  const n = normalizeSearch(needle);
  if (!n) return false;
  if (normalizeSearch(haystack).includes(n)) return true;
  // Match pinyin compact si activé
  if (opts?.pinyin) {
    const nc = normalizePinyinCompact(needle);
    if (nc && normalizePinyinCompact(haystack).includes(nc)) return true;
  }
  return false;
}
