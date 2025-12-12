import hsk1 from '../../data/hsk1.json';
import hsk2 from '../../data/hsk2.json';
import hsk3 from '../../data/hsk3.json';
import hsk4 from '../../data/hsk4.json';
import hsk5 from '../../data/hsk5.json';
import hsk6 from '../../data/hsk6.json';
import hsk7 from '../../data/hsk7.json';
import type { DatasetManifest, LessonItem, LevelId, ThemeSummary } from '../types';
import { enrichExamplesWithAudio } from '../utils/exampleAudio';

export const levelIds: LevelId[] = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7'];

const grouped: Record<LevelId, LessonItem[]> = {
  hsk1: hsk1 as LessonItem[],
  hsk2: hsk2 as LessonItem[],
  hsk3: hsk3 as LessonItem[],
  hsk4: hsk4 as LessonItem[],
  hsk5: hsk5 as LessonItem[],
  hsk6: hsk6 as LessonItem[],
  hsk7: hsk7 as LessonItem[]
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

export const getLessonsByLevel = (level: LevelId) => grouped[level];

export const getLessonById = (id: string) => dataset.lessons.find((entry) => entry.id === id);

export const getLessonByHanzi = (hanzi: string) => dataset.lessons.find((entry) => entry.hanzi === hanzi);

export const getLessonsByHanziList = (hanziList: string[]) => {
  return hanziList.map(hanzi => getLessonByHanzi(hanzi)).filter(Boolean) as LessonItem[];
};

export const getAllLessons = () => dataset.lessons;

export function getReviewList(limit = 6): LessonItem[] {
  // Stratégie ultra simple : on sélectionne une entrée sur n
  const interval = Math.max(1, Math.floor(dataset.lessons.length / limit));
  const selection: LessonItem[] = [];
  for (let i = 0; i < dataset.lessons.length && selection.length < limit; i += interval) {
    selection.push(dataset.lessons[i]);
  }
  return selection;
}

const themeIndex = dataset.lessons.reduce<Map<string, LessonItem[]>>((acc, lesson) => {
  if (!acc.has(lesson.theme)) {
    acc.set(lesson.theme, []);
  }
  acc.get(lesson.theme)!.push(lesson);
  return acc;
}, new Map());

export function getThemeSummaries(): ThemeSummary[] {
  return Array.from(themeIndex.entries())
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
  return themeIndex.get(theme) ?? [];
}
