/**
 * useLessonMastery.ts — SRS au niveau LEÇON (XiaoLearn V7)
 * ---------------------------------------------------------
 * Contrairement à useFlashcardSRS (granularité mot), ce hook pilote la
 * répétition espacée au niveau LEÇON complète.
 *
 * Entrée : scoreSession (0-100) → met à jour mastery + nextReviewAt
 *   - succès (≥70) : progression dans LESSON_SRS_INTERVALS_DAYS
 *   - échec (<70)  : reset à l'intervalle 1 jour
 *
 * mastery = moyenne pondérée glissante des 5 dernières sessions
 *   → récompense la régularité (une bonne session après plusieurs ratées
 *     n'efface pas tout, mais la tendance remonte).
 */
import { useCallback, useEffect, useState } from 'react';
import {
  LESSON_SRS_INTERVALS_DAYS,
  type LessonMasteryEntry,
  type LessonMasteryMap
} from '../types/review-v3';
import type { CecrLevelSlug } from '../types/simulator';
import { useFirestoreSync } from './useFirestoreSync';

const STORAGE_KEY = 'cl_lesson_mastery_v7';

const readInitial = (): LessonMasteryMap => {
  if (typeof window === 'undefined') return {};
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed as LessonMasteryMap;
  } catch {
    /* ignore */
  }
  return {};
};

const addDaysISO = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

const toISO = () => new Date().toISOString();

/**
 * Calcule la nouvelle moyenne de mastery avec pondération récence-lissée.
 */
const recomputeMastery = (recentScores: number[]): number => {
  if (recentScores.length === 0) return 0;
  // Poids décroissants : [3, 2.5, 2, 1.5, 1] pour les 5 derniers scores
  const weights = [3, 2.5, 2, 1.5, 1];
  const n = Math.min(recentScores.length, weights.length);
  let sum = 0;
  let wSum = 0;
  for (let i = 0; i < n; i += 1) {
    const score = recentScores[recentScores.length - 1 - i];
    sum += score * weights[i];
    wSum += weights[i];
  }
  return Math.round(sum / wSum);
};

/**
 * Avance d'un cran dans la cadence SRS si succès, reset sinon.
 */
const nextIntervalDays = (currentIntervalDays: number, success: boolean): number => {
  if (!success) return LESSON_SRS_INTERVALS_DAYS[0]; // reset à 1 jour
  const idx = LESSON_SRS_INTERVALS_DAYS.findIndex((d) => d === currentIntervalDays);
  if (idx === -1 || idx >= LESSON_SRS_INTERVALS_DAYS.length - 1) {
    return LESSON_SRS_INTERVALS_DAYS[LESSON_SRS_INTERVALS_DAYS.length - 1];
  }
  return LESSON_SRS_INTERVALS_DAYS[idx + 1];
};

export interface UseLessonMasteryOptions {
  syncEnabled?: boolean;
}

export const useLessonMastery = (options: UseLessonMasteryOptions = {}) => {
  const [masteryMap, setMasteryMap] = useState<LessonMasteryMap>(readInitial);

  const { saveToFirestore } = useFirestoreSync(
    STORAGE_KEY,
    (data) => {
      if (data && typeof data === 'object') {
        setMasteryMap(data as LessonMasteryMap);
      }
    },
    { enabled: options.syncEnabled ?? true }
  );

  const persist = useCallback(
    (next: LessonMasteryMap) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      saveToFirestore(next);
    },
    [saveToFirestore]
  );

  /**
   * Appelé à la fin d'une session de révision pour une leçon donnée.
   * @param scorePct 0-100
   */
  const recordSessionResult = useCallback(
    (lessonId: string, level: CecrLevelSlug, scorePct: number) => {
      setMasteryMap((prev) => {
        const existing = prev[lessonId];
        const success = scorePct >= 70;
        const recentScores = existing
          ? [...existing.recentScores.slice(-4), scorePct]
          : [scorePct];
        const newInterval = nextIntervalDays(
          existing?.currentIntervalDays ?? 1,
          success
        );
        const entry: LessonMasteryEntry = {
          lessonId,
          level,
          mastery: recomputeMastery(recentScores),
          nextReviewAt: addDaysISO(newInterval),
          lastReviewedAt: toISO(),
          reviewCount: (existing?.reviewCount ?? 0) + 1,
          currentIntervalDays: newInterval,
          recentScores
        };
        const next = { ...prev, [lessonId]: entry };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  /**
   * Crée une entrée vierge pour une leçon que l'utilisateur vient de
   * compléter pour la première fois (mastery 50% initial, due demain).
   */
  const seedLessonMastery = useCallback(
    (lessonId: string, level: CecrLevelSlug) => {
      setMasteryMap((prev) => {
        if (prev[lessonId]) return prev;
        const entry: LessonMasteryEntry = {
          lessonId,
          level,
          mastery: 50,
          nextReviewAt: addDaysISO(1),
          reviewCount: 0,
          currentIntervalDays: 1,
          recentScores: []
        };
        const next = { ...prev, [lessonId]: entry };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const resetLesson = useCallback(
    (lessonId: string) => {
      setMasteryMap((prev) => {
        if (!prev[lessonId]) return prev;
        const { [lessonId]: _, ...rest } = prev;
        persist(rest);
        return rest;
      });
    },
    [persist]
  );

  const resetAll = useCallback(() => {
    setMasteryMap({});
    persist({});
  }, [persist]);

  /** Leçons dont la date de révision est dépassée (dues aujourd'hui). */
  const getDueLessons = useCallback(
    (now = new Date()): LessonMasteryEntry[] => {
      return Object.values(masteryMap).filter(
        (e) => new Date(e.nextReviewAt).getTime() <= now.getTime()
      );
    },
    [masteryMap]
  );

  /** Leçons fragiles : mastery < threshold (défaut 60). */
  const getWeakLessons = useCallback(
    (threshold = 60): LessonMasteryEntry[] => {
      return Object.values(masteryMap).filter((e) => e.mastery < threshold);
    },
    [masteryMap]
  );

  /** N dernières leçons complétées (par lastReviewedAt desc). */
  const getRecentLessons = useCallback(
    (n = 10): LessonMasteryEntry[] => {
      return Object.values(masteryMap)
        .filter((e) => e.lastReviewedAt)
        .sort(
          (a, b) =>
            new Date(b.lastReviewedAt!).getTime() -
            new Date(a.lastReviewedAt!).getTime()
        )
        .slice(0, n);
    },
    [masteryMap]
  );

  /** Maitrise moyenne par niveau CECR (utilisé pour bannière bilan). */
  const getLevelMastery = useCallback(
    (level: CecrLevelSlug): { avg: number; count: number; completed: number } => {
      const entries = Object.values(masteryMap).filter((e) => e.level === level);
      if (entries.length === 0) return { avg: 0, count: 0, completed: 0 };
      const sum = entries.reduce((acc, e) => acc + e.mastery, 0);
      return {
        avg: Math.round(sum / entries.length),
        count: entries.length,
        completed: entries.filter((e) => e.mastery >= 70).length
      };
    },
    [masteryMap]
  );

  useEffect(() => {
    // no-op : hook consume-driven ; persist est déclenché dans setState
  }, []);

  return {
    masteryMap,
    recordSessionResult,
    seedLessonMastery,
    resetLesson,
    resetAll,
    getDueLessons,
    getWeakLessons,
    getRecentLessons,
    getLevelMastery
  };
};

export type UseLessonMasteryReturn = ReturnType<typeof useLessonMastery>;
