/**
 * useDailyGoals — objectifs quotidiens personnalisables
 * -----------------------------------------------------
 * Permet à l'utilisateur de définir ses propres cibles journalières :
 *   - xpTarget       : XP à gagner par jour (défaut 50)
 *   - minutesTarget  : minutes d'étude visées par jour (défaut 10)
 *   - cardsTarget    : nombre de cartes à réviser (0 = illimité, pas tracké)
 *   - lessonsTarget  : nombre de leçons à compléter (0 = illimité)
 *
 * Persistance : localStorage + sync Firestore (clé `cl_daily_goals_v1`).
 *
 * Les cibles à 0 signifient "pas d'objectif quantifié" — la tâche existante
 * (review SRS, continue lesson) reste affichée mais sans compteur custom.
 */

import { useCallback, useEffect, useState } from 'react';
import { useFirestoreSync } from './useFirestoreSync';

const STORAGE_KEY = 'cl_daily_goals_v1';

export interface DailyGoalsState {
  /** XP cible à gagner aujourd'hui. Défaut 50, min 10, max 500. */
  xpTarget: number;
  /** Minutes d'étude cibles aujourd'hui. Défaut 10, min 5, max 120. */
  minutesTarget: number;
  /** Nombre de cartes à réviser. 0 = illimité, sinon min 5 max 200. */
  cardsTarget: number;
  /** Nombre de leçons à compléter. 0 = illimité, sinon 1-10. */
  lessonsTarget: number;
}

export const DEFAULT_GOALS: DailyGoalsState = {
  xpTarget: 50,
  minutesTarget: 10,
  cardsTarget: 0,
  lessonsTarget: 0
};

const sanitize = (g: Partial<DailyGoalsState>): DailyGoalsState => ({
  xpTarget: Math.max(10, Math.min(500, Number(g.xpTarget) || DEFAULT_GOALS.xpTarget)),
  minutesTarget: Math.max(5, Math.min(120, Number(g.minutesTarget) || DEFAULT_GOALS.minutesTarget)),
  cardsTarget:
    g.cardsTarget === 0
      ? 0
      : Math.max(0, Math.min(200, Number(g.cardsTarget) || DEFAULT_GOALS.cardsTarget)),
  lessonsTarget:
    g.lessonsTarget === 0
      ? 0
      : Math.max(0, Math.min(10, Number(g.lessonsTarget) || DEFAULT_GOALS.lessonsTarget))
});

const readInitial = (): DailyGoalsState => {
  if (typeof window === 'undefined') return DEFAULT_GOALS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_GOALS;
    const parsed = JSON.parse(raw);
    return sanitize(parsed);
  } catch {
    return DEFAULT_GOALS;
  }
};

export interface UseDailyGoalsReturn {
  goals: DailyGoalsState;
  setGoals: (next: Partial<DailyGoalsState>) => void;
  resetToDefaults: () => void;
}

export function useDailyGoals(): UseDailyGoalsReturn {
  const [goals, setGoalsState] = useState<DailyGoalsState>(readInitial);

  // Sync Firestore
  const { saveToFirestore } = useFirestoreSync(STORAGE_KEY, (data) => {
    if (!data || typeof data !== 'object') return;
    setGoalsState((prev) => {
      const merged = sanitize({ ...prev, ...(data as Partial<DailyGoalsState>) });
      // Évite un re-render si rien n'a changé
      if (
        merged.xpTarget === prev.xpTarget &&
        merged.minutesTarget === prev.minutesTarget &&
        merged.cardsTarget === prev.cardsTarget &&
        merged.lessonsTarget === prev.lessonsTarget
      ) {
        return prev;
      }
      return merged;
    });
  });

  // Persiste à chaque changement
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    } catch {
      /* quota */
    }
    saveToFirestore(goals);
  }, [goals, saveToFirestore]);

  const setGoals = useCallback((next: Partial<DailyGoalsState>) => {
    setGoalsState((prev) => sanitize({ ...prev, ...next }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setGoalsState(DEFAULT_GOALS);
  }, []);

  return { goals, setGoals, resetToDefaults };
}
