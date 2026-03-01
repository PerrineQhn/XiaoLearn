import horsHskData from '../data/hors-hsk.json';
import type { HSKEntry } from '../types/hsk';

export const HORS_HSK_PAGE_SIZE = 120;

const HORS_HSK_ENTRIES = horsHskData as HSKEntry[];

export function getHorsHskCount(): number {
  return HORS_HSK_ENTRIES.length;
}

export function getHorsHskPageCount(): number {
  return Math.max(1, Math.ceil(HORS_HSK_ENTRIES.length / HORS_HSK_PAGE_SIZE));
}

export function getHorsHskPage(pageNumber: number): HSKEntry[] {
  const safePage = Number.isFinite(pageNumber) ? Math.max(1, Math.floor(pageNumber)) : 1;
  const start = (safePage - 1) * HORS_HSK_PAGE_SIZE;
  return HORS_HSK_ENTRIES.slice(start, start + HORS_HSK_PAGE_SIZE);
}
