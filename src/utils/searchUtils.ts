/**
 * Search utilities for dictionary search functionality
 */

// Map of pinyin characters with tones to their toneless equivalents
const PINYIN_TONE_MAP: Record<string, string> = {
  'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
  'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
  'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
  'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
  'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
  'ǖ': 'ü', 'ǘ': 'ü', 'ǚ': 'ü', 'ǜ': 'ü',
  'ü': 'v', // Also accept v as ü
};

/**
 * Normalize pinyin by removing tones and handling numeric tone notation
 * Examples:
 *   "nǐ hǎo" -> "ni hao"
 *   "ni3 hao3" -> "ni hao"
 *   "nihao" -> "nihao"
 */
export function normalizePinyin(text: string): string {
  let normalized = text.toLowerCase();

  // Remove numeric tones (1-4)
  normalized = normalized.replace(/[1-4]/g, '');

  // Replace toned characters with toneless equivalents
  for (const [toned, toneless] of Object.entries(PINYIN_TONE_MAP)) {
    normalized = normalized.replace(new RegExp(toned, 'g'), toneless);
  }

  return normalized.trim();
}

/**
 * Calculate Levenshtein distance between two strings
 * Used for fuzzy matching to tolerate typos
 */
export function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  // Initialize matrix
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[len1][len2];
}

/**
 * Check if a string matches with fuzzy matching (tolerates typos)
 * Returns true if the Levenshtein distance is within threshold
 */
export function fuzzyMatch(query: string, target: string, threshold: number = 2): boolean {
  if (target.includes(query)) return true;

  const distance = levenshteinDistance(query.toLowerCase(), target.toLowerCase());
  const maxLength = Math.max(query.length, target.length);

  // Allow up to threshold characters difference, but only if query is reasonably long
  if (query.length < 3) return false;

  return distance <= threshold && distance <= maxLength * 0.4;
}

export interface SearchMatch {
  hanzi: boolean;
  hanziExact: boolean;
  pinyin: boolean;
  pinyinExact: boolean;
  translation: boolean;
  translationExact: boolean;
  fuzzyMatch: boolean;
}

/**
 * Calculate relevance score for search result
 * Higher score = more relevant
 */
export function calculateRelevanceScore(
  query: string,
  hanzi: string,
  pinyin: string,
  translation: string,
  translationFr: string
): { score: number; match: SearchMatch } {
  const queryLower = query.toLowerCase();
  const normalizedQuery = normalizePinyin(query);
  const normalizedPinyin = normalizePinyin(pinyin);

  const match: SearchMatch = {
    hanzi: hanzi.includes(query),
    hanziExact: hanzi === query,
    pinyin: normalizedPinyin.includes(normalizedQuery),
    pinyinExact: normalizedPinyin === normalizedQuery || normalizedPinyin.replace(/\s/g, '') === normalizedQuery,
    translation: translation.toLowerCase().includes(queryLower),
    translationExact: translation.toLowerCase() === queryLower || translationFr.toLowerCase() === queryLower,
    fuzzyMatch: false
  };

  let score = 0;

  // Exact matches get highest priority
  if (match.hanziExact) score += 1000;
  else if (match.hanzi) score += 500;

  if (match.pinyinExact) score += 800;
  else if (match.pinyin) score += 400;

  if (match.translationExact) score += 600;
  else if (match.translation) score += 300;

  // Check fuzzy matches only if no direct match found
  if (score === 0) {
    const fuzzyPinyin = fuzzyMatch(normalizedQuery, normalizedPinyin);
    const fuzzyTranslation = fuzzyMatch(queryLower, translation.toLowerCase()) ||
                            fuzzyMatch(queryLower, translationFr.toLowerCase());

    if (fuzzyPinyin) {
      score += 200;
      match.fuzzyMatch = true;
    }
    if (fuzzyTranslation) {
      score += 100;
      match.fuzzyMatch = true;
    }
  }

  // Boost score for shorter words (more specific)
  if (score > 0) {
    const lengthBonus = Math.max(0, 50 - hanzi.length * 10);
    score += lengthBonus;
  }

  return { score, match };
}

const SEARCH_HISTORY_KEY = 'dictionary_search_history';
const MAX_HISTORY_ITEMS = 10;

/**
 * Get search history from localStorage
 */
export function getSearchHistory(): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load search history:', error);
    return [];
  }
}

/**
 * Add a search query to history
 */
export function addToSearchHistory(query: string): void {
  if (typeof window === 'undefined' || !query.trim()) return;

  try {
    const history = getSearchHistory();

    // Remove if already exists
    const filtered = history.filter(item => item !== query);

    // Add to beginning
    const newHistory = [query, ...filtered].slice(0, MAX_HISTORY_ITEMS);

    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error('Failed to save search history:', error);
  }
}

/**
 * Clear search history
 */
export function clearSearchHistory(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear search history:', error);
  }
}
