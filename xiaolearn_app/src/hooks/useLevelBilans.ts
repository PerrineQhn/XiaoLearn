/**
 * useLevelBilans.ts — suivi des Bilans de fin de niveau (XiaoLearn V7)
 * ----------------------------------------------------------------------
 * Persistance localStorage + Firestore des tentatives et meilleurs scores
 * par niveau CECR.
 *
 * Règles :
 *  - `passed` = true dès qu'un score atteint 80% au moins une fois
 *  - XP (+60) versés UNIQUEMENT à la première validation
 *  - on garde toujours le meilleur score, jamais le dernier
 *  - reconnaissance parcours antérieur : `markLegacyRecognized(level)` pose
 *    passed=true + legacyRecognized=true sans versement d'XP
 */
import { useCallback, useState } from 'react';
import {
  BILAN_DEFAULT_PASSING,
  BILAN_QUESTION_COUNT,
  BILAN_XP_REWARD,
  type BilanCompletionEntry,
  type BilanCompletionMap
} from '../types/bilan';
import type { CecrLevelSlug } from '../types/simulator';
import { useFirestoreSync } from './useFirestoreSync';

const STORAGE_KEY = 'cl_bilans_v7';

const readInitial = (): BilanCompletionMap => {
  if (typeof window === 'undefined') return {} as BilanCompletionMap;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {} as BilanCompletionMap;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed as BilanCompletionMap;
  } catch {
    /* ignore */
  }
  return {} as BilanCompletionMap;
};

const nowISO = () => new Date().toISOString();

export interface UseLevelBilansOptions {
  syncEnabled?: boolean;
  /**
   * Callback pour verser des XP via useDashboardState.awardXp.
   * Appelé UNE SEULE FOIS par niveau CECR (à la première validation ≥ 80%).
   */
  onFirstPass?: (level: CecrLevelSlug, xp: number) => void;
}

/**
 * Résultat d'enregistrement d'une tentative.
 */
export interface RecordBilanAttemptResult {
  passed: boolean;
  firstPass: boolean;
  newBestScore: number;
  xpAwarded: number;
  /** Copy de l'entry mise à jour. */
  entry: BilanCompletionEntry;
}

export const useLevelBilans = (options: UseLevelBilansOptions = {}) => {
  const [bilans, setBilans] = useState<BilanCompletionMap>(readInitial);

  const { saveToFirestore } = useFirestoreSync(
    STORAGE_KEY,
    (data) => {
      if (data && typeof data === 'object') setBilans(data as BilanCompletionMap);
    },
    { enabled: options.syncEnabled ?? true }
  );

  const persist = useCallback(
    (next: BilanCompletionMap) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      saveToFirestore(next);
    },
    [saveToFirestore]
  );

  /**
   * Enregistre une tentative de bilan.
   * @param level    niveau CECR
   * @param score    nombre de bonnes réponses (0 à BILAN_QUESTION_COUNT)
   * @param passing  seuil en fraction (0.8 par défaut)
   */
  const recordAttempt = useCallback(
    (
      level: CecrLevelSlug,
      score: number,
      passing: number = BILAN_DEFAULT_PASSING
    ): RecordBilanAttemptResult => {
      const existing = bilans[level];
      const thresholdScore = Math.ceil(passing * BILAN_QUESTION_COUNT);
      const passesNow = score >= thresholdScore;
      const hadPassed = Boolean(existing?.passed);
      const firstPass = passesNow && !hadPassed;
      const bestScore = Math.max(existing?.bestScore ?? 0, score);
      const newEntry: BilanCompletionEntry = {
        level,
        bestScore,
        passed: hadPassed || passesNow,
        attempts: (existing?.attempts ?? 0) + 1,
        lastAttemptAt: nowISO(),
        firstPassedAt: existing?.firstPassedAt ?? (passesNow ? nowISO() : undefined),
        legacyRecognized: existing?.legacyRecognized
      };
      const next = { ...bilans, [level]: newEntry } as BilanCompletionMap;
      setBilans(next);
      persist(next);

      let xpAwarded = 0;
      if (firstPass) {
        xpAwarded = BILAN_XP_REWARD;
        options.onFirstPass?.(level, xpAwarded);
      }

      return {
        passed: passesNow,
        firstPass,
        newBestScore: bestScore,
        xpAwarded,
        entry: newEntry
      };
    },
    [bilans, options, persist]
  );

  /**
   * Marque un niveau comme "parcours antérieur reconnu" — le niveau
   * suivant reste débloqué, aucun XP versé, l'utilisateur peut quand
   * même passer le bilan pour gagner les XP.
   */
  const markLegacyRecognized = useCallback(
    (level: CecrLevelSlug) => {
      setBilans((prev) => {
        if (prev[level]?.legacyRecognized) return prev;
        const entry: BilanCompletionEntry = {
          level,
          bestScore: prev[level]?.bestScore ?? 0,
          passed: true,
          attempts: prev[level]?.attempts ?? 0,
          lastAttemptAt: prev[level]?.lastAttemptAt,
          firstPassedAt: prev[level]?.firstPassedAt,
          legacyRecognized: true
        };
        const next = { ...prev, [level]: entry } as BilanCompletionMap;
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const getEntry = useCallback(
    (level: CecrLevelSlug): BilanCompletionEntry | undefined => bilans[level],
    [bilans]
  );

  const isPassed = useCallback(
    (level: CecrLevelSlug): boolean => Boolean(bilans[level]?.passed),
    [bilans]
  );

  const resetLevel = useCallback(
    (level: CecrLevelSlug) => {
      setBilans((prev) => {
        const { [level]: _, ...rest } = prev;
        persist(rest as BilanCompletionMap);
        return rest as BilanCompletionMap;
      });
    },
    [persist]
  );

  const resetAll = useCallback(() => {
    setBilans({} as BilanCompletionMap);
    persist({} as BilanCompletionMap);
  }, [persist]);

  return {
    bilans,
    recordAttempt,
    markLegacyRecognized,
    getEntry,
    isPassed,
    resetLevel,
    resetAll
  };
};

export type UseLevelBilansReturn = ReturnType<typeof useLevelBilans>;
