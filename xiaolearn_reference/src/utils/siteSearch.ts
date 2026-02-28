import type { SiteSearchItem } from '../types/search';

interface RankedSearchItem {
  item: SiteSearchItem;
  score: number;
}

export function normalizeSearchText(value: string): string {
  if (!value) return '';

  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’`"]/g, ' ')
    .replace(/[.,/#!$%^&*;:{}=\-_~()|\[\]\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenizeQuery(query: string): string[] {
  const normalized = normalizeSearchText(query);
  if (!normalized) return [];
  return normalized.split(' ').filter(Boolean);
}

function buildSearchBlob(item: SiteSearchItem): { title: string; summary: string; keywords: string; all: string } {
  const title = normalizeSearchText(item.title);
  const summary = normalizeSearchText(item.summary);
  const keywords = normalizeSearchText(item.keywords.join(' '));
  const section = normalizeSearchText(item.section);
  const href = normalizeSearchText(item.href);
  return {
    title,
    summary,
    keywords,
    all: `${title} ${summary} ${keywords} ${section} ${href}`.trim(),
  };
}

function scoreItem(item: SiteSearchItem, query: string, tokens: string[]): number {
  if (!tokens.length) return 0;

  const normalizedQuery = normalizeSearchText(query);
  const blob = buildSearchBlob(item);

  for (const token of tokens) {
    if (!blob.all.includes(token)) {
      return 0;
    }
  }

  let score = 0;

  if (blob.title === normalizedQuery) score += 220;
  if (blob.title.startsWith(normalizedQuery) && normalizedQuery.length > 1) score += 150;
  if (blob.title.includes(normalizedQuery) && normalizedQuery.length > 1) score += 90;

  for (const token of tokens) {
    if (blob.title.startsWith(token)) score += 42;
    else if (blob.title.includes(token)) score += 28;

    if (blob.keywords.includes(token)) score += 20;
    if (blob.summary.includes(token)) score += 12;
  }

  score += item.weight || 0;
  return score;
}

export function searchSite(items: SiteSearchItem[], query: string, limit = 80): SiteSearchItem[] {
  const tokens = tokenizeQuery(query);
  if (!tokens.length) return [];

  const ranked: RankedSearchItem[] = [];
  for (const item of items) {
    const score = scoreItem(item, query, tokens);
    if (score > 0) {
      ranked.push({ item, score });
    }
  }

  ranked.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.item.title.localeCompare(b.item.title, 'fr');
  });

  return ranked.slice(0, limit).map((entry) => entry.item);
}
