/**
 * useDashboardState
 * -----------------
 * Hook unifié qui alimente le nouveau HomePageV2.
 *
 * Il agrège trois préoccupations vues sur le dashboard de Seonsaengnim :
 *   1. Objectif du jour  — cartes à réviser + prochaine leçon + XP à gagner
 *   2. Streak + XP       — série quotidienne, niveau XP, progression vers le suivant
 *   3. Historique        — matrice mensuelle d'activité pour la heatmap calendrier
 *
 * Synchronisation Firestore : les 3 clés (XP total, streak, historique XP par
 * jour) sont poussées via useFirestoreSync pour que la progression soit la
 * même sur Chrome / Safari / mobile. Stratégies de merge :
 *   - XP  → `Math.max`  (on ne perd jamais d'XP, même si un device était offline).
 *   - streak.best → `Math.max` ; streak.current → dernier jour écrit gagne
 *     (lastDay le plus récent).
 *   - activity (XP par jour) → `Math.max` par date (fusion défensive).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFirestoreSync } from './useFirestoreSync';

const STREAK_KEY = 'xl_streak_v2';
const XP_KEY = 'xl_xp_v2';
const HISTORY_KEY = 'xl_activity_v2'; // { 'YYYY-MM-DD': xp }
const LAST_SEEN_KEY = 'xl_last_seen_v2';

/** Paliers XP par niveau — inspirés de Seonsaengnim (200 XP pour passer niv.1→2).
 *  Progression douce : chaque niveau demande +20% par rapport au précédent. */
export const XP_PER_LEVEL = (level: number) => Math.round(200 * Math.pow(1.2, level - 1));

/** XP gagnés par action. Ajuste selon ton économie (garde-les petits !). */
export const XP_REWARDS = {
  reviewAgain: 2,
  reviewHard: 5,
  reviewGood: 8,
  reviewEasy: 10,
  lessonCompleted: 25,
  newWordLearned: 15,
  wordOfDayAdded: 5
} as const;

export interface DailyGoalTargets {
  cardsDue: { current: number; target: number };
  lessonToResume: { title: string; id?: string } | null;
  xpGoal: { current: number; target: number };
  timerMinutes: number;
}

export interface XpState {
  xp: number;
  level: number;
  xpInLevel: number;
  xpNeededForNext: number;
  progressPct: number;
}

export interface StreakState {
  current: number;
  best: number;
  isAliveToday: boolean;
}

const todayKey = () => new Date().toISOString().slice(0, 10);
const daysBetween = (a: string, b: string) => {
  const d1 = new Date(a + 'T00:00:00').getTime();
  const d2 = new Date(b + 'T00:00:00').getTime();
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
};

const readJSON = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJSON = (key: string, value: unknown) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export interface DashboardInput {
  /** Nombre de cartes SRS actuellement dues (venant de ReviewPage). */
  dueCardsCount: number;
  /** Titre de la prochaine leçon à reprendre (venant de useLessonProgress). */
  nextLessonTitle?: string;
  nextLessonId?: string;
  /** Objectif quotidien en nombre d'actions (cartes + leçons). Par défaut 3. */
  dailyTargetCount?: number;
  /** Timer d'étude en minutes, par défaut 10. */
  timerMinutes?: number;
}

export interface DashboardApi {
  dailyGoal: DailyGoalTargets;
  xp: XpState;
  streak: StreakState;
  /** Matrice de {dateISO -> xp gagnés ce jour} pour les 35 derniers jours. */
  activity: Record<string, number>;
  /** À appeler après chaque action qui rapporte de l'XP. */
  awardXp: (amount: number) => void;
  /** À appeler quand l'utilisateur a "touché" l'app aujourd'hui (ouvre dashboard, lance révision...). */
  pingAlive: () => void;
}

export const useDashboardState = (input: DashboardInput): DashboardApi => {
  const dailyTarget = input.dailyTargetCount ?? 3;
  const timerMinutes = input.timerMinutes ?? 10;

  const [xp, setXp] = useState<number>(() => readJSON<number>(XP_KEY, 0));
  const [streak, setStreak] = useState(() =>
    readJSON<{ current: number; best: number; lastDay: string | null }>(STREAK_KEY, {
      current: 0,
      best: 0,
      lastDay: null
    })
  );
  const [activity, setActivity] = useState<Record<string, number>>(() =>
    readJSON<Record<string, number>>(HISTORY_KEY, {})
  );

  // ------------------------------------------------------------------
  //  Sync Firestore — XP total, streak, historique XP par jour
  // ------------------------------------------------------------------

  // XP total : max (jamais perdre d'XP entre devices)
  const { saveToFirestore: saveXpToCloud } = useFirestoreSync(XP_KEY, (data) => {
    const cloud = typeof data === 'number' ? data : Number(data);
    if (!Number.isFinite(cloud)) return;
    setXp((prev) => (cloud > prev ? cloud : prev));
  });

  // Streak : best = max, current dépend du lastDay le plus récent.
  const { saveToFirestore: saveStreakToCloud } = useFirestoreSync(STREAK_KEY, (data) => {
    if (!data || typeof data !== 'object') return;
    const incoming = data as { current?: number; best?: number; lastDay?: string | null };
    setStreak((prev) => {
      const nextBest = Math.max(prev.best, Number(incoming.best) || 0);
      // Si le cloud a un lastDay plus récent, on prend son current ; sinon on garde le local.
      const cloudLast = incoming.lastDay ?? null;
      const localLast = prev.lastDay;
      let current = prev.current;
      let lastDay: string | null = localLast;
      if (cloudLast && (!localLast || cloudLast > localLast)) {
        current = Number(incoming.current) || 0;
        lastDay = cloudLast;
      }
      if (nextBest === prev.best && current === prev.current && lastDay === prev.lastDay) {
        return prev;
      }
      return { current, best: nextBest, lastDay };
    });
  });

  // Historique XP par jour : max par date (défensif : évite que Chrome efface Safari).
  const { saveToFirestore: saveActivityToCloud } = useFirestoreSync(HISTORY_KEY, (data) => {
    if (!data || typeof data !== 'object') return;
    setActivity((prev) => {
      const merged: Record<string, number> = { ...prev };
      let changed = false;
      for (const [dateKey, value] of Object.entries(data as Record<string, number>)) {
        const numValue = Number(value) || 0;
        const currentValue = merged[dateKey] ?? 0;
        if (numValue > currentValue) {
          merged[dateKey] = numValue;
          changed = true;
        }
      }
      return changed ? merged : prev;
    });
  });

  // Persistances local + cloud. On skip le tout premier effet pour éviter un
  // upload de l'état initial alors qu'onSnapshot arrive juste après avec la
  // vraie valeur cloud (ce qui permet le merge max sans clobber).
  const didMountXpRef = useRef(false);
  useEffect(() => {
    writeJSON(XP_KEY, xp);
    if (!didMountXpRef.current) {
      didMountXpRef.current = true;
      return;
    }
    saveXpToCloud(xp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xp]);

  const didMountStreakRef = useRef(false);
  useEffect(() => {
    writeJSON(STREAK_KEY, streak);
    if (!didMountStreakRef.current) {
      didMountStreakRef.current = true;
      return;
    }
    saveStreakToCloud(streak);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streak]);

  const didMountActivityRef = useRef(false);
  useEffect(() => {
    writeJSON(HISTORY_KEY, activity);
    if (!didMountActivityRef.current) {
      didMountActivityRef.current = true;
      return;
    }
    saveActivityToCloud(activity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity]);

  // Recalcule le streak au chargement (en cas de longue absence → reset).
  useEffect(() => {
    const last = readJSON<string | null>(LAST_SEEN_KEY, null);
    const today = todayKey();
    if (last && last !== today) {
      const gap = daysBetween(last, today);
      if (gap > 1) {
        // >1 jour sans venir : la série tombe à 0, MAIS elle redémarrera à la prochaine action.
        setStreak((s) => ({ ...s, current: 0 }));
      }
    }
    writeJSON(LAST_SEEN_KEY, today);
  }, []);

  const awardXp = useCallback((amount: number) => {
    if (amount <= 0) return;
    setXp((prev) => prev + amount);
    const key = todayKey();
    setActivity((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + amount }));
  }, []);

  const pingAlive = useCallback(() => {
    const today = todayKey();
    setStreak((prev) => {
      if (prev.lastDay === today) return prev; // déjà marqué vivant aujourd'hui
      const gap = prev.lastDay ? daysBetween(prev.lastDay, today) : 1;
      const next = gap === 1 ? prev.current + 1 : 1;
      return {
        current: next,
        best: Math.max(prev.best, next),
        lastDay: today
      };
    });
  }, []);

  // État dérivé -----------------------------------------------------------
  const xpState: XpState = useMemo(() => {
    let level = 1;
    let remaining = xp;
    while (remaining >= XP_PER_LEVEL(level)) {
      remaining -= XP_PER_LEVEL(level);
      level += 1;
    }
    const xpNeededForNext = XP_PER_LEVEL(level);
    return {
      xp,
      level,
      xpInLevel: remaining,
      xpNeededForNext,
      progressPct: Math.round((remaining / xpNeededForNext) * 100)
    };
  }, [xp]);

  const streakState: StreakState = useMemo(
    () => ({
      current: streak.current,
      best: streak.best,
      isAliveToday: streak.lastDay === todayKey()
    }),
    [streak]
  );

  const todayXp = activity[todayKey()] ?? 0;
  const xpDailyTarget = 50; // aligné sur Seonsaengnim

  const dailyGoal: DailyGoalTargets = useMemo(() => {
    // Combien d'éléments "faits" aujourd'hui pour le compteur 1/3 ?
    let done = 0;
    if ((input.dueCardsCount ?? 0) === 0) done += 1; // révisions à jour
    if (todayXp >= xpDailyTarget) done += 1;
    if (streakState.isAliveToday) done += 1;

    return {
      cardsDue: { current: input.dueCardsCount ?? 0, target: 10 },
      lessonToResume: input.nextLessonTitle
        ? { title: input.nextLessonTitle, id: input.nextLessonId }
        : null,
      xpGoal: { current: todayXp, target: xpDailyTarget },
      timerMinutes
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.dueCardsCount, input.nextLessonTitle, input.nextLessonId, todayXp, streakState.isAliveToday, timerMinutes]);

  // Debug helper: expose dailyTarget (utilisé pour "done / target" si tu veux réintégrer)
  void dailyTarget;

  return {
    dailyGoal,
    xp: xpState,
    streak: streakState,
    activity,
    awardXp,
    pingAlive
  };
};
