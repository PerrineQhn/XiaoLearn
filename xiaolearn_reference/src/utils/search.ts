import type { HSKEntry } from '../types/hsk';

export function searchEntries(entries: HSKEntry[], query: string): HSKEntry[] {
  if (!query.trim()) {
    return entries;
  }

  const normalizedQuery = query.toLowerCase().trim();

  return entries.filter(entry => {
    // Search in hanzi
    if (entry.hanzi.includes(query)) return true;

    // Search in pinyin (with and without tones)
    const pinyinLower = entry.pinyin.toLowerCase();
    if (pinyinLower.includes(normalizedQuery)) return true;

    // Search in pinyin without tone marks
    const pinyinNoTones = removeToneMarks(pinyinLower);
    if (pinyinNoTones.includes(normalizedQuery)) return true;

    // Search in French translation
    if (entry.translationFr.toLowerCase().includes(normalizedQuery)) return true;

    // Search in alternative translations
    if (entry.translationFrAlt?.some(alt =>
      alt.toLowerCase().includes(normalizedQuery)
    )) return true;

    // Search in English translation
    if (entry.translation.toLowerCase().includes(normalizedQuery)) return true;

    // Search in tags
    if (entry.tags.some(tag =>
      tag.toLowerCase().includes(normalizedQuery)
    )) return true;

    return false;
  });
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
