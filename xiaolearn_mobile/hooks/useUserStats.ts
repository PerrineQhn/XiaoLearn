import { useEffect, useState, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuth } from '@/contexts/AuthContext';
import { useFirestoreSync } from './useFirestoreSync';
import { xpToLevel } from './useLeaderboard';
export { dayKey } from '@/data/dailyGoals';
import {
  DAILY_COUNTS_KEY, bumpDailyCounter, parseDailyCounts, dayKey,
  type DailyCounts, type GoalId,
} from '@/data/dailyGoals';

// ─── Clés AsyncStorage / Firestore (mobile-native) ───────────────────────────
const KEYS = {
  xp:               'xl_xp_total',
  streakDays:       'xl_streak_days',
  lastStudyDate:    'xl_last_study_date',
  completedLessons: 'cl_completed_lessons',   // ← même clé que la web ✓
  masteredCards:    'xl_mastered_cards_count',
  xpGoalDaily:      'xl_xp_goal_daily',
  xpToday:          'xl_xp_today',
  dailyCounts:      DAILY_COUNTS_KEY,          // compteurs du jour, par objectif
  studyDays:        'xl_study_days',           // ['2026-07-28', …] jours pratiqués
  // Clés web lues en lecture seule pour la sync cross-platform
  webStats:         'cl_learning_stats_v1',   // {streak, totalMinutes, dailyMinutes, lastDate}
  webWordSrs:       'cl_word_srs_v1',         // {wordId: {level, ...}} level>=4 = maîtrisé
  webBilans:        'cl_bilans_v7',           // {a1: {passed, bestScore, attempts}, ...}
  // Clés du TABLEAU DE BORD web — l'autre dialecte de l'XP/série/activité.
  // On les synchronise et on les alimente pour que le web voie la progression
  // faite sur mobile, et réciproquement.
  webXp:            'xl_xp_v2',               // number
  webStreak:        'xl_streak_v2',           // {current, best, lastDay}
  webActivity:      'xl_activity_v2',         // {'YYYY-MM-DD': xp}
};

// Tableau stable (référence fixe) pour éviter la boucle infinie dans
// useFirestoreSync. cl_word_srs_v1 en est EXCLU : le SRS a sa propre
// synchronisation à fusion par entrée (useSrsData) — le laisser ici créait
// une seconde voie d'écriture en « dernier gagne » qui pouvait écraser des
// révisions faites sur un autre appareil.
const SYNC_KEYS = Object.values(KEYS).filter(k => k !== KEYS.webWordSrs) as string[];

export interface UserStats {
  xp: number;
  streakDays: number;
  masteredCards: number;
  completedLessonsCount: number;
  completedLessonIds: string[];
  /**
   * XP gagnés aujourd'hui. Lu depuis xl_activity_v2, le journal daté que le
   * web tient déjà — l'ancien compteur scalaire xl_xp_today n'était jamais
   * remis à zéro et cumulait donc depuis l'installation.
   */
  xpToday: number;
  xpGoalDaily: number;
  /** Compteurs du jour, par objectif. Repartent à zéro au changement de date. */
  daily: DailyCounts;
  /** Jours pratiqués, au format 'YYYY-MM-DD'. Alimente la semaine d'activité. */
  studyDays: string[];
}

const DEFAULT: UserStats = {
  xp: 0, streakDays: 0, masteredCards: 0,
  completedLessonIds: [], completedLessonsCount: 0,
  xpToday: 0, xpGoalDaily: 500, studyDays: [],
  daily: {},
};



/** XP du jour d'après le journal daté xl_activity_v2. */
function xpOfToday(raw: string | null): number {
  try {
    const a = JSON.parse(raw ?? '{}') as Record<string, number>;
    return Number(a[dayKey()]) || 0;
  } catch { return 0; }
}


// ─── Helpers de parsing ───────────────────────────────────────────────────────

function parseCompletedLessons(raw: string | null): string[] {
  if (!raw) return [];
  try { return JSON.parse(raw) as string[]; } catch { return []; }
}

/** Extrait le streak depuis le blob web cl_learning_stats_v1 */
function parseWebStreak(raw: string | null): number {
  if (!raw) return 0;
  try { return (JSON.parse(raw) as any).streak ?? 0; } catch { return 0; }
}

/**
 * Jours pratiqués. L'historique n'a jamais été enregistré jusqu'ici : pour les
 * comptes existants on le reconstitue depuis la série, qui est par définition
 * une suite de jours consécutifs se terminant au dernier jour étudié.
 */
function parseStudyDays(raw: string | null, streak: number, lastStudy: string | null): string[] {
  if (raw) {
    try {
      const arr = JSON.parse(raw) as string[];
      if (Array.isArray(arr) && arr.length) return arr;
    } catch {}
  }
  if (streak <= 0) return [];
  const end = lastStudy ? new Date(lastStudy) : new Date();
  if (Number.isNaN(end.getTime())) return [];
  const out: string[] = [];
  for (let i = 0; i < Math.min(streak, 120); i++) {
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    out.push(dayKey(d));
  }
  return out;
}

/** Compte les mots maîtrisés depuis cl_word_srs_v1 (level >= 4) */
function parseWebMastered(raw: string | null): number {
  if (!raw) return 0;
  try {
    const srs = JSON.parse(raw) as Record<string, { level?: number }>;
    return Object.values(srs).filter(e => (e.level ?? 0) >= 4).length;
  } catch { return 0; }
}

// ─── Leaderboard sync ─────────────────────────────────────────────────────────

async function syncLeaderboard(
  uid: string,
  displayName: string,
  xp: number,
  streakDays: number,
) {
  if (!db) return;
  try {
    await setDoc(
      doc(db, 'leaderboard', uid),
      { displayName, xp, streakDays, level: xpToLevel(xp), updatedAt: new Date().toISOString() },
      { merge: true },
    );
  } catch (e) { console.warn('[Leaderboard] sync error:', e); }
}

// ─── Hook principal ───────────────────────────────────────────────────────────

export function useUserStats() {
  const [stats, setStats] = useState<UserStats>(DEFAULT);
  const { user } = useAuth();

  const reload = useCallback(async () => {
    const pairs = await AsyncStorage.multiGet(Object.values(KEYS))
      .catch(() => [] as readonly [string, string | null][]);
    const map = Object.fromEntries(pairs.map(([k, v]) => [k, v]));

    // Leçons complétées — même clé web/mobile, lecture directe
    const completedIds = parseCompletedLessons(map[KEYS.completedLessons]);

    // Série : maximum des trois dialectes — compteur mobile, tableau de bord
    // web (xl_streak_v2.current) et anciennes stats web.
    const mobileStreak  = Number(map[KEYS.streakDays] ?? 0);
    const legacyStreak  = parseWebStreak(map[KEYS.webStats]);
    let dashStreak = 0;
    try { dashStreak = Number((JSON.parse(map[KEYS.webStreak] ?? '{}') as { current?: number }).current) || 0; } catch {}
    const streakDays = Math.max(mobileStreak, legacyStreak, dashStreak);

    // XP : maximum des deux dialectes (le listener publicProfiles affine ensuite)
    const mobileXp = Number(map[KEYS.xp] ?? 0);
    let dashXp = 0;
    try { dashXp = Number(JSON.parse(map[KEYS.webXp] ?? '0')) || 0; } catch {}
    const xp = Math.max(mobileXp, dashXp);

    // Cartes maîtrisées : mobile OU web cl_word_srs_v1
    const mobileMastered = Number(map[KEYS.masteredCards] ?? 0);
    const webMastered    = parseWebMastered(map[KEYS.webWordSrs]);
    const masteredCards  = Math.max(mobileMastered, webMastered);

    // Jours pratiqués : union du journal mobile et de l'activité web
    const days = new Set(parseStudyDays(map[KEYS.studyDays], streakDays, map[KEYS.lastStudyDate]));
    try {
      for (const d of Object.keys(JSON.parse(map[KEYS.webActivity] ?? '{}') as Record<string, number>)) days.add(d);
    } catch {}

    setStats(s => ({
      ...s,
      xp: Math.max(s.xp, xp),
      streakDays,
      masteredCards,
      completedLessonsCount: completedIds.length,
      completedLessonIds: completedIds,
      xpToday:     xpOfToday(map[KEYS.webActivity]),
      daily:       parseDailyCounts(map[KEYS.dailyCounts]),
      xpGoalDaily: Number(map[KEYS.xpGoalDaily] ?? 500),
      studyDays:   [...days].sort(),
    }));
  }, []);

  // Sync AsyncStorage ↔ Firestore — SYNC_KEYS est une constante stable (pas de new array à chaque render)
  const { save } = useFirestoreSync(SYNC_KEYS, reload);

  useEffect(() => { reload(); }, [reload]);

  // ── XP depuis publicProfiles/{uid} (source de vérité de la web app) ─────────
  useEffect(() => {
    if (!user || !db) return;
    const ref = doc(db, 'publicProfiles', user.uid);

    // Écoute temps-réel : mise à jour immédiate quand la web app gagne du XP
    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) return;
      const webXp = Number(snap.data().totalXp ?? 0);
      if (webXp <= 0) return;

      // Lire le XP mobile pour prendre le max (on ne veut pas perdre le XP gagné sur mobile)
      AsyncStorage.getItem(KEYS.xp).then(raw => {
        const mobileXp = Number(raw ?? 0);
        const finalXp  = Math.max(webXp, mobileXp);
        setStats(s => ({ ...s, xp: finalXp }));
        // Persister localement pour le mode hors-ligne
        if (finalXp !== mobileXp) {
          AsyncStorage.setItem(KEYS.xp, String(finalXp)).catch(() => {});
        }
      }).catch(() => {
        setStats(s => ({ ...s, xp: webXp }));
      });
    }, (err) => {
      // Si publicProfiles n'est pas accessible, fallback sur xl_xp_total local
      console.warn('[XP sync] publicProfiles non accessible:', err.message);
      AsyncStorage.getItem(KEYS.xp).then(raw => {
        setStats(s => ({ ...s, xp: Number(raw ?? 0) }));
      }).catch(() => {});
    });

    return unsub;
  }, [user]);

  // ── Sync leaderboard — debouncée 5 s pour éviter les rafales d'écritures ──
  const lbTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!user || (!stats.xp && !stats.streakDays)) return;
    if (lbTimerRef.current) clearTimeout(lbTimerRef.current);
    lbTimerRef.current = setTimeout(() => {
      const name = user.displayName ?? user.email?.split('@')[0] ?? 'Joueur';
      syncLeaderboard(user.uid, name, stats.xp, stats.streakDays);
    }, 5000);
    return () => { if (lbTimerRef.current) clearTimeout(lbTimerRef.current); };
  }, [user, stats.xp, stats.streakDays]);

  // ── addXp : écrit dans LES DEUX dialectes (mobile + tableau de bord web) ──
  //
  // Le web compte l'XP dans xl_xp_v2, la série dans xl_streak_v2 et l'activité
  // dans xl_activity_v2 ; le mobile avait ses propres clés. Écrire les deux à
  // chaque gain fait converger web et mobile — les callbacks du web fusionnent
  // en max/union, donc ces écritures ne peuvent jamais y régresser quoi que
  // ce soit.
  const addXp = useCallback(async (amount: number) => {
    const pairs = await AsyncStorage.multiGet([
      KEYS.xp, KEYS.xpToday, KEYS.webXp, KEYS.webStreak, KEYS.webActivity,
    ]);
    const map = Object.fromEntries(pairs.map(([k, v]) => [k, v]));

    // XP unifié : on part du max des deux dialectes pour ne jamais régresser
    let dashXp = 0;
    try { dashXp = Number(JSON.parse(map[KEYS.webXp] ?? '0')) || 0; } catch {}
    const newXp    = Math.max(Number(map[KEYS.xp] ?? 0), dashXp) + amount;
    await save(KEYS.xp,     String(newXp));
    await save(KEYS.webXp,  JSON.stringify(newXp));

    const today = dayKey();

    // Activité web : cumul du jour (fusionnée en max par date côté web).
    // C'est aussi la source de l'XP du jour : le journal est daté, donc il
    // repart naturellement à zéro à minuit.
    let activity: Record<string, number> = {};
    try { activity = JSON.parse(map[KEYS.webActivity] ?? '{}') as Record<string, number>; } catch {}
    activity[today] = (Number(activity[today]) || 0) + amount;
    await save(KEYS.webActivity, JSON.stringify(activity));
    const newToday = activity[today];
    // Miroir de l'ancien scalaire, encore lu ailleurs — mais lui aussi daté.
    await save(KEYS.xpToday, String(newToday));

    // Série au format web {current, best, lastDay} + miroir mobile
    let streak: { current?: number; best?: number; lastDay?: string | null } = {};
    try { streak = JSON.parse(map[KEYS.webStreak] ?? '{}') as typeof streak; } catch {}
    if (streak.lastDay !== today) {
      const y = new Date(); y.setDate(y.getDate() - 1);
      const cur = streak.lastDay === dayKey(y) ? (Number(streak.current) || 0) + 1 : 1;
      streak = { current: cur, best: Math.max(Number(streak.best) || 0, cur), lastDay: today };
      await save(KEYS.webStreak, JSON.stringify(streak));
      await save(KEYS.streakDays, String(cur));
    }

    // Journal mobile des jours pratiqués, borné à 120 entrées
    const rawDays = await AsyncStorage.getItem(KEYS.studyDays).catch(() => null);
    let days: string[] = [];
    try { days = rawDays ? (JSON.parse(rawDays) as string[]) : []; } catch {}
    if (!days.includes(today)) {
      days = [...days, today].sort().slice(-120);
      await save(KEYS.studyDays, JSON.stringify(days));
      await save(KEYS.lastStudyDate, today);
    }

    setStats(s => ({
      ...s,
      xp: newXp,
      xpToday: newToday,
      streakDays: Math.max(s.streakDays, Number(streak.current) || 0),
      studyDays: [...new Set([...s.studyDays, today])].sort(),
    }));

    // publicProfiles : lu par le classement et par l'affichage XP des deux apps
    if (user && db) {
      setDoc(doc(db, 'publicProfiles', user.uid), {
        totalXp: newXp,
        updatedAt: new Date().toISOString(),
      }, { merge: true }).catch(() => {});
    }
  }, [save, user]);

  /**
   * Incrémente un compteur du jour. Délègue au module partagé, qui est aussi
   * appelé depuis des fichiers non-React (data/minijeuxHelpers.ts).
   */
  const bumpDaily = useCallback(async (id: GoalId, n = 1) => {
    await bumpDailyCounter(id, n);
    setStats(s => ({ ...s, daily: { ...s.daily, [id]: (s.daily[id] ?? 0) + n } }));
  }, []);

  const markLessonComplete = useCallback(async (lessonId: string) => {
    const raw = await AsyncStorage.getItem(KEYS.completedLessons).catch(() => null);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    if (!ids.includes(lessonId)) {
      const next = [...ids, lessonId];
      await save(KEYS.completedLessons, JSON.stringify(next));
      setStats(s => ({ ...s, completedLessonsCount: next.length, completedLessonIds: next }));
    }
  }, [save]);

  const setXpGoal = useCallback(async (goal: number) => {
    await save(KEYS.xpGoalDaily, String(goal));
    setStats(s => ({ ...s, xpGoalDaily: goal }));
  }, [save]);

  return { stats, reload, addXp, markLessonComplete, setXpGoal, bumpDaily };
}
