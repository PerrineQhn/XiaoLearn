import type { HSKEntry } from '../types/hsk';
import hsk1Data from './hsk1.json';
import hsk2Data from './hsk2.json';
import hsk3Data from './hsk3.json';
import hsk4Data from './hsk4.json';
import hsk5Data from './hsk5.json';
import hsk6Data from './hsk6.json';
import hsk7Data from './hsk7.json';
const normalizeEntries = (items: unknown[]): HSKEntry[] =>
  (items as Array<Record<string, unknown>>).map((item) => {
    const translationEn = String(item.translationEn ?? item.translation ?? '');
    return {
      ...(item as HSKEntry),
      translationEn,
      translation: translationEn,
    };
  });

export const ALL_HSK_ENTRIES: HSKEntry[] = [
  ...normalizeEntries(hsk1Data as unknown[]),
  ...normalizeEntries(hsk2Data as unknown[]),
  ...normalizeEntries(hsk3Data as unknown[]),
  ...normalizeEntries(hsk4Data as unknown[]),
  ...normalizeEntries(hsk5Data as unknown[]),
  ...normalizeEntries(hsk6Data as unknown[]),
  ...normalizeEntries(hsk7Data as unknown[]),
];
