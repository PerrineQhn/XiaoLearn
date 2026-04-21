/**
 * useLearningStats.ts — stats d'apprentissage (streak, minutes, quotidien)
 * --------------------------------------------------------------
 * Regroupe les anciennes clés localStorage :
 *   - cl_daily_minutes   (map dateKey → minutes)
 *   - cl_total_minutes   (int)
 *   - learningStreak     (int)
 *   - lastLearningDate   (string YYYY-MM-DD)
 *
 * …sous un seul blob JSON synchronisé via useFirestoreSync pour que la
 * progression soit identique entre Chrome / Safari / mobile quand le même
 * compte est connecté.
 *
 * Migration : si le blob n'existe pas en local, on lit les 4 clés legacy
 * et on les agrège. Ensuite on écrit uniquement dans la nouvelle clé
 * (les anciennes restent lisibles pour compat descendante mais ne sont
 * plus mises à jour).
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useFirestoreSync } from './useFirestoreSync';

export interface LearningStats {
  streak: number;
  minutesToday: number;
  totalMinutes: number;
}

interface LearningStatsState {
  dailyMinutes: Record<string, number>;
  totalMinutes: number;
  streak: number;
  lastDate: string | null;
}

const STORAGE_KEY = 'cl_learning_stats_v1';

// --- Anciennes clés (V1 pré-sync) ---
const LEGACY_DAILY_MINUTES_KEY = 'cl_daily_minutes';
const LEGACY_TOTAL_MINUTES_KEY = 'cl_total_minutes';
const LEGACY_STREAK_KEY = 'learningStreak';
const LEGACY_LAST_DATE_KEY = 'lastLearningDate';

function getDateKey(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

function daysBetween(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  return Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
}

function readLegacy(): LearningStatsState {
  if (typeof window === 'undefined') {
    return { dailyMinutes: {}, totalMinutes: 0, streak: 0, lastDate: null };
  }
  let dailyMinutes: Record<string, number> = {};
  try {
    const raw = window.localStorage.getItem(LEGACY_DAILY_MINUTES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') dailyMinutes = parsed;
    }
  } catch {
    /* noop */
  }
  const totalMinutes =
    parseInt(window.localStorage.getItem(LEGACY_TOTAL_MINUTES_KEY) || '0', 10) || 0;
  const streak = parseInt(window.localStorage.getItem(LEGACY_STREAK_KEY) || '0', 10) || 0;
  const lastDate = window.localStorage.getItem(LEGACY_LAST_DATE_KEY);
  return { dailyMinutes, totalMinutes, streak, lastDate };
}

function loadInitial(): LearningStatsState {
  if (typeof window === 'undefined') {
    return { dailyMinutes: {}, totalMinutes: 0, streak: 0, lastDate: null };
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return {
          dailyMinutes:
            parsed.dailyMinutes && typeof parsed.dailyMinutes === 'object'
              ? parsed.dailyMinutes
              : {},
          totalMinutes: Number(parsed.totalMinutes) || 0,
          streak: Number(parsed.streak) || 0,
          lastDate: parsed.lastDate ?? null
        };
      }
    } catch {
      /* fall through to legacy */
    }
  }
  return readLegacy();
}

export interface UseLearningStatsReturn {
  /** Stats agrégées prêtes pour l'UI. */
  learningStats: LearningStats;
  /** Enregistre une session d'apprentissage (minutes) + met à jour streak. */
  applyLearningSession: (duration: number) => void;
  /** Map brute dateKey → minutes (utile pour heatmap). */
  dailyMinutesMap: Record<string, number>;
}

export function useLearningStats(): UseLearningStatsReturn {
  const [state, setState] = useState<LearningStatsState>(loadInitial);

  // Synchro Firestore sur le blob unique. Quand la valeur cloud change
  // (ex : l'utilisateur vient de bosser depuis Safari, puis rouvre Chrome),
  // on remplace l'état local.
  const { saveToFirestore } = useFirestoreSync(STORAGE_KEY, (data) => {
    if (data && typeof data === 'object') {
      setState({
        dailyMinutes:
          data.dailyMinutes && typeof data.dailyMinutes === 'object'
            ? data.dailyMinutes
            : {},
        totalMinutes: Number(data.totalMinutes) || 0,
        streak: Number(data.streak) || 0,
        lastDate: data.lastDate ?? null
      });
    }
  });

  // Persiste à chaque changement : localStorage (toujours) + Firestore (si user).
  // On skip le premier effet synchronisé au mount pour éviter un push inutile
  // de l'état initial vers Firestore alors que onSnapshot va bientôt arriver
  // avec la vraie valeur cloud.
  const didMountRef = useRef(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    saveToFirestore(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const applyLearningSession = useCallback((duration: number): void => {
    if (typeof window === 'undefined') return;
    const minutes = Math.max(0, Math.round(duration));
    const todayKey = getDateKey();
    setState((prev) => {
      const dailyMinutes = {
        ...prev.dailyMinutes,
        [todayKey]: (prev.dailyMinutes[todayKey] || 0) + minutes
      };
      const totalMinutes = prev.totalMinutes + minutes;
      let streak = prev.streak;
      if (!prev.lastDate) {
        streak = 1;
      } else {
        const delta = daysBetween(prev.lastDate, todayKey);
        if (delta === 0) streak = Math.max(streak, 1);
        else if (delta === 1) streak = streak > 0 ? streak + 1 : 1;
        else streak = 1;
      }
      return { dailyMinutes, totalMinutes, streak, lastDate: todayKey };
    });
  }, []);

  const todayKey = getDateKey();
  const learningStats: LearningStats = {
    streak: state.streak,
    minutesToday: state.dailyMinutes[todayKey] || 0,
    totalMinutes: state.totalMinutes
  };

  return {
    learningStats,
    applyLearningSession,
    dailyMinutesMap: state.dailyMinutes
  };
}
