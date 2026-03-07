import type { HSKEntry } from '../types/hsk';

export const HORS_HSK_PAGE_SIZE = 120;

type HorsHskMeta = {
  totalEntries: number;
  chunkSize: number;
  pageSize: number;
};

type HorsHskChunk = Record<string, HSKEntry>;

const FALLBACK_TOTAL_ENTRIES = 109709;
const FALLBACK_CHUNK_SIZE = 1000;

let cachedMeta: HorsHskMeta | null = null;
const chunkCache = new Map<number, HorsHskChunk>();

function toEntryId(index: number): string {
  return `hors-hsk-${String(index).padStart(6, '0')}`;
}

function chunkFileName(chunkIndex: number): string {
  return `chunk-${String(chunkIndex).padStart(3, '0')}.json`;
}

async function fetchJson<T>(url: URL): Promise<T> {
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url.pathname}: ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function getHorsHskMeta(requestUrl: URL): Promise<HorsHskMeta> {
  if (cachedMeta) {
    return cachedMeta;
  }

  const metaUrl = new URL('/data/hors-hsk/meta.json', requestUrl);

  try {
    const meta = await fetchJson<Partial<HorsHskMeta>>(metaUrl);
    const totalEntries = Number(meta.totalEntries);
    const chunkSize = Number(meta.chunkSize);
    const pageSize = Number(meta.pageSize);
    if (Number.isInteger(totalEntries) && totalEntries > 0 && Number.isInteger(chunkSize) && chunkSize > 0) {
      cachedMeta = {
        totalEntries,
        chunkSize,
        pageSize: Number.isInteger(pageSize) && pageSize > 0 ? pageSize : HORS_HSK_PAGE_SIZE,
      };
      return cachedMeta;
    }
  } catch {
    // Fallback for safety if meta asset is missing.
  }

  cachedMeta = {
    totalEntries: FALLBACK_TOTAL_ENTRIES,
    chunkSize: FALLBACK_CHUNK_SIZE,
    pageSize: HORS_HSK_PAGE_SIZE,
  };
  return cachedMeta;
}

export function getHorsHskPageCount(totalEntries: number, pageSize = HORS_HSK_PAGE_SIZE): number {
  return Math.max(1, Math.ceil(totalEntries / pageSize));
}

async function getHorsHskChunk(chunkIndex: number, requestUrl: URL): Promise<HorsHskChunk> {
  const cached = chunkCache.get(chunkIndex);
  if (cached) {
    return cached;
  }

  const chunkUrl = new URL(`/data/hors-hsk/${chunkFileName(chunkIndex)}`, requestUrl);
  const chunk = await fetchJson<HorsHskChunk>(chunkUrl);
  chunkCache.set(chunkIndex, chunk);
  return chunk;
}

export async function getHorsHskPage(
  pageNumber: number,
  requestUrl: URL,
  totalEntries: number,
  chunkSize: number,
  pageSize = HORS_HSK_PAGE_SIZE,
): Promise<HSKEntry[]> {
  const safePageNumber = Number.isFinite(pageNumber) ? Math.max(1, Math.floor(pageNumber)) : 1;
  const safePageSize = Number.isFinite(pageSize) ? Math.max(1, Math.floor(pageSize)) : HORS_HSK_PAGE_SIZE;
  const startIndex = (safePageNumber - 1) * safePageSize + 1;

  if (startIndex > totalEntries) {
    return [];
  }

  const endIndex = Math.min(totalEntries, startIndex + safePageSize - 1);
  const startChunk = Math.ceil(startIndex / chunkSize);
  const endChunk = Math.ceil(endIndex / chunkSize);
  const chunkIndexes = startChunk === endChunk ? [startChunk] : [startChunk, endChunk];
  const chunkMaps = await Promise.all(chunkIndexes.map((index) => getHorsHskChunk(index, requestUrl)));

  const chunkByIndex = new Map<number, HorsHskChunk>();
  chunkIndexes.forEach((chunkIndex, idx) => {
    chunkByIndex.set(chunkIndex, chunkMaps[idx]);
  });

  const entries: HSKEntry[] = [];
  for (let entryIndex = startIndex; entryIndex <= endIndex; entryIndex += 1) {
    const chunkIndex = Math.ceil(entryIndex / chunkSize);
    const chunk = chunkByIndex.get(chunkIndex);
    if (!chunk) {
      continue;
    }
    const entry = chunk[toEntryId(entryIndex)];
    if (entry) {
      entries.push(entry);
    }
  }

  return entries;
}
