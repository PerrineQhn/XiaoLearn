import { ALL_HSK_ENTRIES } from '../data/allHskEntries';
import type { HSKEntry } from '../types/hsk';

export const DICTIONARY_SITEMAP_CHUNK_SIZE = 1200;
export const DICTIONARY_INDEX_PAGE_SIZE = 300;

const SORT_LOCALE = 'en';
const SORTED_ENTRIES: HSKEntry[] = [...ALL_HSK_ENTRIES].sort((a, b) =>
  a.id.localeCompare(b.id, SORT_LOCALE),
);

function getPageCount(totalItems: number, pageSize: number): number {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

function getPageSlice<T>(values: T[], pageNumber: number, pageSize: number): T[] {
  const safePage = Number.isFinite(pageNumber) ? Math.max(1, Math.floor(pageNumber)) : 1;
  const start = (safePage - 1) * pageSize;
  return values.slice(start, start + pageSize);
}

export function getSortedDictionaryEntries(): HSKEntry[] {
  return SORTED_ENTRIES;
}

export function getDictionarySitemapChunkCount(): number {
  return getPageCount(SORTED_ENTRIES.length, DICTIONARY_SITEMAP_CHUNK_SIZE);
}

export function getDictionarySitemapChunk(chunkNumber: number): HSKEntry[] {
  return getPageSlice(SORTED_ENTRIES, chunkNumber, DICTIONARY_SITEMAP_CHUNK_SIZE);
}

export function getDictionarySitemapChunkPaths(): string[] {
  const count = getDictionarySitemapChunkCount();
  return Array.from({ length: count }, (_, index) => `/sitemaps/dictionnaire-${index + 1}.xml`);
}

export function getDictionaryIndexPageCount(): number {
  return getPageCount(SORTED_ENTRIES.length, DICTIONARY_INDEX_PAGE_SIZE);
}

export function getDictionaryIndexPage(pageNumber: number): HSKEntry[] {
  return getPageSlice(SORTED_ENTRIES, pageNumber, DICTIONARY_INDEX_PAGE_SIZE);
}

export function getDictionaryIndexPagePaths(): string[] {
  const count = getDictionaryIndexPageCount();
  return Array.from({ length: count }, (_, index) => `/dictionnaire/indexation/${index + 1}`);
}
