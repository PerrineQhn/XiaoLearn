import type { HSKEntry } from '../types/hsk';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const normalizeEntries = (items: unknown[]): HSKEntry[] =>
  (items as Array<Record<string, unknown>>).map((item) => {
    const translationEn = String(item.translationEn ?? item.translation ?? '');
    return {
      ...(item as HSKEntry),
      translationEn,
      translation: translationEn,
    };
  });

function loadLevel(level: string): HSKEntry[] {
  const candidates = [
    resolve(process.cwd(), 'src', 'data', `${level}.json`),
    resolve(process.cwd(), 'xiaolearn_reference', 'src', 'data', `${level}.json`),
  ];

  for (const filePath of candidates) {
    try {
      const raw = JSON.parse(readFileSync(filePath, 'utf-8')) as unknown[];
      return normalizeEntries(raw);
    } catch {
      // Try next candidate.
    }
  }

  return [];
}

export const ALL_HSK_ENTRIES: HSKEntry[] = [
  ...loadLevel('hsk1'),
  ...loadLevel('hsk2'),
  ...loadLevel('hsk3'),
  ...loadLevel('hsk4'),
  ...loadLevel('hsk5'),
  ...loadLevel('hsk6'),
  ...loadLevel('hsk7'),
];
