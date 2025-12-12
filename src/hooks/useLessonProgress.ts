import { useMemo, useState } from 'react';
import { dataset, levelIds } from '../data/lessons';
import type { LessonItem, LevelId } from '../types';
import { useFirestoreSync } from './useFirestoreSync';

const PROGRESS_INDEX_KEY = 'cl_progress_index';
const LEARNED_KEY = 'cl_learned_words';

const readInitialIndex = () => {
  if (typeof window === 'undefined') return 0;
  const stored = window.localStorage.getItem(PROGRESS_INDEX_KEY);
  return stored ? Number(stored) || 0 : 0;
};

const readLearnedWordIds = (): string[] => {
  // Retourner un tableau vide par défaut pour forcer l'utilisation du dataset
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(LEARNED_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
};

const lessonMap = new Map(dataset.lessons.map((lesson) => [lesson.id, lesson]));

export const useLessonProgress = (dailyGoal: number, reviewGoal = 6) => {
  const [cursor, setCursor] = useState<number>(readInitialIndex);
  const [learnedWordIds, setLearnedWordIds] = useState<string[]>(readLearnedWordIds);

  // Setup Firestore sync for learned words
  const { saveToFirestore } = useFirestoreSync(LEARNED_KEY, (data) => {
    if (Array.isArray(data) && data.length > 0) {
      setLearnedWordIds(data);
    }
  });

  const persistLearnedWordIds = (ids: string[]) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LEARNED_KEY, JSON.stringify(ids));
    }
    saveToFirestore(ids);
  };

  const persistCursor = (value: number) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(PROGRESS_INDEX_KEY, value.toString());
    }
  };

  const goNext = () => {
    setCursor((prev) => {
      const next = (prev + 1) % dataset.lessons.length;
      persistCursor(next);
      return next;
    });
  };

  const goPrevious = () => {
    setCursor((prev) => {
      const next = (prev - 1 + dataset.lessons.length) % dataset.lessons.length;
      persistCursor(next);
      return next;
    });
  };

  const currentLesson: LessonItem = dataset.lessons[cursor % dataset.lessons.length];

  const todaySummary = useMemo(() => {
    const picks: LessonItem[] = [];
    const count = Math.max(1, dailyGoal);
    for (let i = 0; i < count; i += 1) {
      picks.push(dataset.lessons[(cursor + i) % dataset.lessons.length]);
    }
    return picks;
  }, [cursor, dailyGoal]);

  const progressPercent = Math.round(((cursor + 1) / dataset.lessons.length) * 100);

  const learnedWordItems = useMemo(() => {
    return learnedWordIds
      .map((id) => lessonMap.get(id))
      .filter((lesson): lesson is LessonItem => Boolean(lesson));
  }, [learnedWordIds]);

  const totals = useMemo(() => {
    const counts = levelIds.reduce(
      (acc, level) => ({
        ...acc,
        [level]: 0
      }),
      {} as Record<LevelId, number>
    );
    learnedWordItems.forEach((lesson) => {
      counts[lesson.level] += 1;
    });
    return counts;
  }, [learnedWordItems]);

  const reviewItems = useMemo(() => {
    if (learnedWordIds.length === 0) return [];
    const recentIds = learnedWordIds.slice(-reviewGoal);
    return recentIds
      .map((id) => lessonMap.get(id))
      .filter((lesson): lesson is LessonItem => Boolean(lesson));
  }, [learnedWordIds, reviewGoal]);

  const addLearnedWords = (ids: string[]) => {
    setLearnedWordIds((prev) => {
      const next = [...prev];
      let changed = false;
      ids.forEach((id) => {
        if (!next.includes(id)) {
          next.push(id);
          changed = true;
        }
      });
      if (changed) {
        persistLearnedWordIds(next);
        return next;
      }
      return prev;
    });
  };

  const hasProgress = learnedWordIds.length > 0;

  return {
    cursor,
    currentLesson,
    goNext,
    goPrevious,
    todaySummary,
    progressPercent,
    totals,
    hasProgress,
    learnedWordIds,
    reviewItems,
    allLearnedItems: learnedWordItems, // All learned words, not just recent 6
    addLearnedWords
  };
};
