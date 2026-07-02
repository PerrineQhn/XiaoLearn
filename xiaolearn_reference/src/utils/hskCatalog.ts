import type { HSKEntry } from '../types/hsk';

const HSK_LEVELS = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7'] as const;
type HskLevel = (typeof HSK_LEVELS)[number];

type HskMeta = {
  chunkSize: number;
  levels: Record<HskLevel, number>;
};

type HskChunk = Record<string, HSKEntry>;

const DEFAULT_META: HskMeta = {
  chunkSize: 500,
  levels: {
    hsk1: 300,
    hsk2: 200,
    hsk3: 500,
    hsk4: 1000,
    hsk5: 1600,
    hsk6: 1800,
    hsk7: 5603,
  },
};

let cachedMeta: HskMeta | null = null;
const chunkCache = new Map<string, HskChunk>();

function padId(index: number): string {
  return String(index).padStart(4, '0');
}

function isHskLevel(level: string): level is HskLevel {
  return (HSK_LEVELS as readonly string[]).includes(level);
}

function parseId(entryId: string): { level: HskLevel; index: number } | null {
  const match = entryId.match(/^(hsk[1-7])-(\d+)$/);
  if (!match) {
    return null;
  }
  const level = match[1];
  if (!isHskLevel(level)) {
    return null;
  }
  const index = Number.parseInt(match[2], 10);
  if (!Number.isInteger(index) || index < 1) {
    return null;
  }
  return { level, index };
}

async function fetchJson<T>(url: URL): Promise<T> {
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url.pathname}: ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function getHskMeta(requestUrl: URL): Promise<HskMeta> {
  if (cachedMeta) {
    return cachedMeta;
  }

  const metaUrl = new URL('/data/hsk/meta.json', requestUrl);
  try {
    const incoming = await fetchJson<Partial<HskMeta>>(metaUrl);
    const chunkSize = Number(incoming.chunkSize);
    const levels = incoming.levels;
    if (
      Number.isInteger(chunkSize) &&
      chunkSize > 0 &&
      levels &&
      HSK_LEVELS.every((level) => Number.isInteger(Number(levels[level])) && Number(levels[level]) > 0)
    ) {
      cachedMeta = {
        chunkSize,
        levels: {
          hsk1: Number(levels.hsk1),
          hsk2: Number(levels.hsk2),
          hsk3: Number(levels.hsk3),
          hsk4: Number(levels.hsk4),
          hsk5: Number(levels.hsk5),
          hsk6: Number(levels.hsk6),
          hsk7: Number(levels.hsk7),
        },
      };
      return cachedMeta;
    }
  } catch {
    // Fall back to compiled defaults.
  }

  cachedMeta = DEFAULT_META;
  return cachedMeta;
}

export function formatHskId(level: HskLevel, index: number): string {
  return `${level}-${padId(index)}`;
}

async function getChunk(level: HskLevel, chunkIndex: number, requestUrl: URL): Promise<HskChunk> {
  const cacheKey = `${level}:${chunkIndex}`;
  const cached = chunkCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const chunkName = String(chunkIndex).padStart(3, '0');
  const chunkUrl = new URL(`/data/hsk/${level}/chunk-${chunkName}.json`, requestUrl);
  const chunk = await fetchJson<HskChunk>(chunkUrl);
  chunkCache.set(cacheKey, chunk);
  return chunk;
}

export async function getHskEntryById(
  entryId: string,
  requestUrl: URL,
): Promise<{ entry: HSKEntry; level: HskLevel; index: number; levelCount: number } | null> {
  const parsed = parseId(entryId);
  if (!parsed) {
    return null;
  }

  const meta = await getHskMeta(requestUrl);
  const levelCount = meta.levels[parsed.level];
  if (parsed.index > levelCount) {
    return null;
  }

  const chunkIndex = Math.ceil(parsed.index / meta.chunkSize);
  const chunk = await getChunk(parsed.level, chunkIndex, requestUrl);
  const entry = chunk[entryId];
  if (!entry) {
    return null;
  }

  return {
    entry,
    level: parsed.level,
    index: parsed.index,
    levelCount,
  };
}

export async function getHskLevelEntries(level: HskLevel, requestUrl: URL): Promise<HSKEntry[]> {
  const levelUrl = new URL(`/data/hsk/levels/${level}.json`, requestUrl);
  try {
    const entries = await fetchJson<HSKEntry[]>(levelUrl);
    if (Array.isArray(entries)) {
      return entries;
    }
  } catch {
    // Fall back to chunk aggregation.
  }

  const meta = await getHskMeta(requestUrl);
  const levelCount = meta.levels[level];
  const chunkCount = Math.ceil(levelCount / meta.chunkSize);
  const entries: HSKEntry[] = [];

  for (let chunkIndex = 1; chunkIndex <= chunkCount; chunkIndex += 1) {
    const chunk = await getChunk(level, chunkIndex, requestUrl);
    const values = Object.values(chunk);
    values.sort((a, b) => a.id.localeCompare(b.id));
    entries.push(...values);
  }

  return entries;
}
