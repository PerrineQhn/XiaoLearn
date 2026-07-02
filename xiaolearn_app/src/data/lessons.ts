import hsk1 from '../../data/hsk1.json';
import hsk2 from '../../data/hsk2.json';
import hsk3 from '../../data/hsk3.json';
import hsk4 from '../../data/hsk4.json';
import hsk5 from '../../data/hsk5.json';
import hsk6 from '../../data/hsk6.json';
import hsk7 from '../../data/hsk7.json';
import type { DatasetManifest, LessonExample, LessonItem, LevelId, ThemeSummary } from '../types';
import { enrichExamplesWithAudio } from '../utils/exampleAudio';
import { supplementLessons } from './supplement-flashcards';
import { cecrB2VocabAll } from './cecr-b2-vocab';

export const levelIds: LevelId[] = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7', 'hors-hsk'];

type RawLessonExample = {
  hanzi?: string;
  chinese?: string;
  pinyin?: string;
  translation?: string;
  translationFr?: string;
  audio?: string;
};

type RawLessonItem = Omit<LessonItem, 'examples' | 'level' | 'translation'> & {
  level?: string;
  translation?: string;
  translationEn?: string;
  examples?: RawLessonExample[];
};

type HorsHskManifest = {
  version: number;
  chunkSize: number;
  totalEntries: number;
  chunks: string[];
};

const normalizeExample = (example: RawLessonExample): LessonExample => {
  const translationFr = example.translationFr ?? example.translation ?? '';
  const translation = example.translation ?? example.translationFr ?? '';
  return {
    hanzi: example.hanzi ?? example.chinese ?? '',
    pinyin: example.pinyin ?? '',
    translation,
    translationFr,
    ...(example.audio ? { audio: example.audio } : {})
  };
};

const normalizeLevel = (level: string | undefined, fallbackLevel: LevelId): LevelId => {
  if (level && levelIds.includes(level as LevelId)) {
    return level as LevelId;
  }
  return fallbackLevel;
};

const normalizeLessons = (items: unknown[], fallbackLevel: LevelId): LessonItem[] =>
  (items as RawLessonItem[]).map((item) => {
    const { translationEn, examples, ...rest } = item;
    return {
      ...rest,
      translation: item.translation ?? translationEn ?? '',
      level: normalizeLevel(item.level, fallbackLevel),
      examples: (examples ?? []).map(normalizeExample)
    };
  });

const grouped: Record<LevelId, LessonItem[]> = {
  hsk1: normalizeLessons(hsk1 as unknown[], 'hsk1'),
  hsk2: normalizeLessons(hsk2 as unknown[], 'hsk2'),
  hsk3: normalizeLessons(hsk3 as unknown[], 'hsk3'),
  hsk4: normalizeLessons(hsk4 as unknown[], 'hsk4'),
  hsk5: normalizeLessons(hsk5 as unknown[], 'hsk5'),
  hsk6: normalizeLessons(hsk6 as unknown[], 'hsk6'),
  hsk7: normalizeLessons(hsk7 as unknown[], 'hsk7'),
  'hors-hsk': []
};

const attachExampleAudio = (lessons: LessonItem[]) =>
  lessons.map((lesson) => {
    if (!lesson.examples || lesson.examples.length === 0) {
      return lesson;
    }
    if (lesson.examples.every((example) => Boolean(example.audio))) {
      return lesson;
    }
    return {
      ...lesson,
      examples: enrichExamplesWithAudio(lesson.examples)
    };
  });

levelIds.forEach((level) => {
  grouped[level] = attachExampleAudio(grouped[level]);
});

export const dataset: DatasetManifest = {
  updatedAt: new Date().toISOString(),
  totals: levelIds.reduce(
    (acc, level) => ({
      ...acc,
      [level]: grouped[level].length
    }),
    {} as Record<LevelId, number>
  ),
  lessons: levelIds.flatMap((level) => grouped[level])
};

// Indexer dataset HSK + supplement (lessons-paths, level1-course, etc.)
// Le supplement couvre les 314 flashcards référencées mais absentes du dataset HSK.
const lessonByIdIndex = new Map<string, LessonItem>();
const lessonByHanziIndex = new Map<string, LessonItem>();

for (const entry of dataset.lessons) {
  lessonByIdIndex.set(entry.id, entry);
  lessonByHanziIndex.set(entry.hanzi, entry);
}
// Le supplement est ajouté après le HSK pour qu'il puisse combler les trous
// sans écraser les entrées HSK prioritaires.
for (const entry of supplementLessons) {
  if (!lessonByIdIndex.has(entry.id)) lessonByIdIndex.set(entry.id, entry);
  if (!lessonByHanziIndex.has(entry.hanzi)) lessonByHanziIndex.set(entry.hanzi, entry);
}
// V8 : enrichissement ciblé B2.1 (tech, env, éco, registre formel).
// Même règle que le supplément : n'écrase jamais une entrée HSK existante.
for (const entry of cecrB2VocabAll) {
  if (!lessonByIdIndex.has(entry.id)) lessonByIdIndex.set(entry.id, entry);
  if (!lessonByHanziIndex.has(entry.hanzi)) lessonByHanziIndex.set(entry.hanzi, entry);
}

let horsHskLessonsCache: LessonItem[] | null = null;
let horsHskByIdIndex = new Map<string, LessonItem>();
let horsHskByHanziIndex = new Map<string, LessonItem>();
let horsHskLoadingPromise: Promise<LessonItem[]> | null = null;

const rebuildHorsIndexes = (lessons: LessonItem[]) => {
  horsHskByIdIndex = new Map(lessons.map((entry) => [entry.id, entry]));
  horsHskByHanziIndex = new Map(lessons.map((entry) => [entry.hanzi, entry]));
};

const getMergedLessons = () => (horsHskLessonsCache ? [...dataset.lessons, ...horsHskLessonsCache] : dataset.lessons);

const HORS_HSK_BASE_PATH = '/data/hors-hsk';

const fetchJsonOrThrow = async <T>(url: string, label: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Impossible de charger ${label} (${response.status})`);
  }
  return (await response.json()) as T;
};

export const loadHorsHskLessons = async (): Promise<LessonItem[]> => {
  if (horsHskLessonsCache) return horsHskLessonsCache;
  if (horsHskLoadingPromise) return horsHskLoadingPromise;

  horsHskLoadingPromise = fetchJsonOrThrow<HorsHskManifest>(
    `${HORS_HSK_BASE_PATH}/manifest.json`,
    'le manifest hors-hsk'
  )
    .then(async (manifest) => {
      if (!Array.isArray(manifest.chunks) || manifest.chunks.length === 0) {
        throw new Error('Manifest hors-hsk invalide: aucun chunk trouvé.');
      }

      const chunkPayloads = await Promise.all(
        manifest.chunks.map(async (chunkFile) => {
          const chunk = await fetchJsonOrThrow<unknown[]>(
            `${HORS_HSK_BASE_PATH}/${chunkFile}`,
            `le chunk ${chunkFile}`
          );
          if (!Array.isArray(chunk)) {
            throw new Error(`Chunk invalide: ${chunkFile}`);
          }
          return chunk;
        })
      );

      const payload = chunkPayloads.flat();
      const normalized = attachExampleAudio(normalizeLessons(payload, 'hors-hsk'));
      horsHskLessonsCache = normalized;
      grouped['hors-hsk'] = normalized;
      dataset.totals['hors-hsk'] = normalized.length;
      rebuildHorsIndexes(normalized);
      return normalized;
    })
    .finally(() => {
      horsHskLoadingPromise = null;
    });

  return horsHskLoadingPromise;
};

export const getLessonsByLevel = (level: LevelId) => grouped[level];

export const getLessonById = (id: string) => lessonByIdIndex.get(id) ?? horsHskByIdIndex.get(id);

export const getLessonByHanzi = (hanzi: string) => lessonByHanziIndex.get(hanzi) ?? horsHskByHanziIndex.get(hanzi);

export const getLessonsByHanziList = (hanziList: string[]) => {
  return hanziList.map(hanzi => getLessonByHanzi(hanzi)).filter(Boolean) as LessonItem[];
};

export const getAllLessons = () => getMergedLessons();

export const getAllLessonsIncludingHorsHsk = async () => {
  await loadHorsHskLessons();
  return getMergedLessons();
};

export function getWordOfDay(): LessonItem | null {
  const all = getMergedLessons();
  if (all.length === 0) return null;
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return all[seed % all.length];
}

export function getReviewList(limit = 6): LessonItem[] {
  // Stratégie ultra simple : on sélectionne une entrée sur n
  const allLessons = getMergedLessons();
  const interval = Math.max(1, Math.floor(allLessons.length / limit));
  const selection: LessonItem[] = [];
  for (let i = 0; i < allLessons.length && selection.length < limit; i += interval) {
    selection.push(allLessons[i]);
  }
  return selection;
}

const buildThemeIndex = (items: LessonItem[]) =>
  items.reduce<Map<string, LessonItem[]>>((acc, lesson) => {
    if (!acc.has(lesson.theme)) {
      acc.set(lesson.theme, []);
    }
    acc.get(lesson.theme)!.push(lesson);
    return acc;
  }, new Map());

export function getThemeSummaries(): ThemeSummary[] {
  return Array.from(buildThemeIndex(getMergedLessons()).entries())
    .map(([theme, lessons]) => {
      const levels = levelIds.reduce(
        (acc, level) => ({
          ...acc,
          [level]: 0
        }),
        {} as Record<LevelId, number>
      );
      lessons.forEach((lesson) => {
        levels[lesson.level] += 1;
      });
      return {
        theme,
        count: lessons.length,
        levels
      };
    })
    .sort((a, b) => b.count - a.count);
}

export function getLessonsByTheme(theme: string): LessonItem[] {
  return buildThemeIndex(getMergedLessons()).get(theme) ?? [];
}
