/**
 * useNotificationEvents — pont entre dashboardState / SRS / rangs et le
 * centre de notifications.
 * ----------------------------------------------------------------------
 * Ce hook surveille en continu les valeurs clefs du dashboardState et
 * déclenche des `notifications.push(...)` quand un événement "intéressant"
 * survient :
 *
 *   - Palier de série atteint  → kind: 'streak'
 *   - Daily fidelity bonus versé → kind: 'streak'
 *   - Niveau gagné (level-up)  → kind: 'lesson'
 *   - Rang gagné (Apprenti → Étudiant, etc.) → kind: 'rank'
 *   - Révisions SRS à faire aujourd'hui (une fois par jour) → kind: 'srs'
 *
 * Les notifications "bataille" et "XP d'une leçon terminée" sont poussées
 * depuis leurs handlers respectifs (ex: `handleMatchEnded`) — ce hook ne
 * gère que les événements qui dérivent uniquement de l'état central.
 *
 * Principes :
 *   - Au premier render, on *capture* les valeurs courantes (via useRef
 *     initialisé en lazy init) sans rien push — sinon on spammerait à chaque
 *     reload. On ne fire que sur un vrai *changement*.
 *   - Les dedupKey sont stables par événement (ex: `streak-milestone-7`) —
 *     une même notif ne peut pas être rejouée dans les 60s même si le state
 *     glitche.
 *   - Le rappel SRS utilise le localStorage pour se mémoriser "déjà envoyé
 *     aujourd'hui" ; on retombe silencieusement si localStorage plante.
 */

import { useEffect, useRef } from 'react';
import { useNotifications } from '../contexts/NotificationsContext';
import { getRankFromXp, type RankName } from '../types/community';

const SRS_REMINDER_STORAGE_KEY = 'xl_notif_srs_last_day_v1';

const todayKey = (): string => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

interface UseNotificationEventsInput {
  language: 'fr' | 'en';
  /** XP total accumulé. */
  totalXp: number;
  /** Niveau courant (calculé par dashboardState). */
  level: number;
  /** Jours de série courante. */
  streakCurrent: number;
  /** Dernier palier de série claim (objet changé → nouveau palier). */
  lastMilestoneAward: { days: number; xp: number; at: string } | null;
  /** Date ISO du dernier daily bonus claim. */
  lastDailyBonusAt: string | null;
  /** Nombre de cartes SRS dues aujourd'hui. */
  dueSrsCount: number;
  /** Tant que l'utilisateur n'est pas authentifié, on tait les notifs. */
  isAuthed: boolean;
}

// ---------------------------------------------------------------------------
//  Textes (i18n) — courts car tronqués en UI à 2 lignes
// ---------------------------------------------------------------------------

const COPY = {
  fr: {
    levelUp: (lvl: number) => ({
      title: `Niveau ${lvl} atteint !`,
      body: `Ton nouveau palier est débloqué. Continue comme ça 🚀`
    }),
    rankUp: (rank: RankName, emoji: string) => ({
      title: `Nouveau rang : ${rank} ${emoji}`,
      body: `Tu viens de franchir un palier majeur dans la communauté.`
    }),
    streakMilestone: (days: number, xp: number) => ({
      title: `${days} jours de série !`,
      body: `Bravo ! +${xp} XP bonus viennent d'être ajoutés.`
    }),
    dailyBonus: (days: number) => ({
      title: `Série maintenue (${days} j.)`,
      body: `Ton bonus quotidien vient d'être versé. À demain !`
    }),
    srsDue: (n: number) => ({
      title: n === 1 ? `1 carte à réviser` : `${n} cartes à réviser`,
      body: `Passe par Révisions pour ne pas casser ta série.`
    })
  },
  en: {
    levelUp: (lvl: number) => ({
      title: `Level ${lvl} reached!`,
      body: `A new tier unlocked. Keep it up 🚀`
    }),
    rankUp: (rank: RankName, emoji: string) => ({
      title: `New rank: ${rank} ${emoji}`,
      body: `You just moved up a major tier in the community.`
    }),
    streakMilestone: (days: number, xp: number) => ({
      title: `${days}-day streak!`,
      body: `Nice! +${xp} bonus XP just landed.`
    }),
    dailyBonus: (days: number) => ({
      title: `Streak kept (${days} d.)`,
      body: `Your daily bonus has been awarded. See you tomorrow!`
    }),
    srsDue: (n: number) => ({
      title: n === 1 ? `1 card to review` : `${n} cards to review`,
      body: `Hop over to Reviews to keep your streak alive.`
    })
  }
} as const;

// ---------------------------------------------------------------------------
//  Hook
// ---------------------------------------------------------------------------

export const useNotificationEvents = (input: UseNotificationEventsInput) => {
  const { push } = useNotifications();
  const {
    language,
    totalXp,
    level,
    streakCurrent,
    lastMilestoneAward,
    lastDailyBonusAt,
    dueSrsCount,
    isAuthed
  } = input;

  const copy = COPY[language];

  // Références initialisées lazy avec la valeur courante : on ne "fire" pas au
  // premier render, uniquement sur une transition.
  const prevLevelRef = useRef<number | null>(null);
  const prevRankNameRef = useRef<RankName | null>(null);
  const prevMilestoneDaysRef = useRef<number | null>(null);
  const prevDailyBonusAtRef = useRef<string | null>(null);

  // --- Level up --------------------------------------------------------------
  useEffect(() => {
    if (!isAuthed) return;
    if (prevLevelRef.current === null) {
      prevLevelRef.current = level;
      return;
    }
    if (level > prevLevelRef.current) {
      const newLvl = level;
      const c = copy.levelUp(newLvl);
      push({
        kind: 'lesson',
        icon: '⬆️',
        title: c.title,
        body: c.body,
        dedupKey: `level-up-${newLvl}`
      });
    }
    prevLevelRef.current = level;
  }, [level, isAuthed, push, copy]);

  // --- Rank up ---------------------------------------------------------------
  useEffect(() => {
    if (!isAuthed) return;
    const rank = getRankFromXp(totalXp).tier;
    if (prevRankNameRef.current === null) {
      prevRankNameRef.current = rank.name;
      return;
    }
    if (rank.name !== prevRankNameRef.current) {
      // On ne notifie que les progressions (index croissant), pas les resets.
      const order: RankName[] = ['Apprenti', 'Étudiant', 'Guerrier', 'Maître', 'Légende'];
      const prevIdx = order.indexOf(prevRankNameRef.current);
      const nextIdx = order.indexOf(rank.name);
      if (nextIdx > prevIdx) {
        const c = copy.rankUp(rank.name, rank.emoji);
        push({
          kind: 'rank',
          icon: rank.emoji,
          title: c.title,
          body: c.body,
          dedupKey: `rank-up-${rank.name}`,
          link: { kind: 'view', view: 'leaderboard' }
        });
      }
      prevRankNameRef.current = rank.name;
    }
  }, [totalXp, isAuthed, push, copy]);

  // --- Streak milestone ------------------------------------------------------
  useEffect(() => {
    if (!isAuthed) return;
    if (!lastMilestoneAward) {
      return;
    }
    if (prevMilestoneDaysRef.current === lastMilestoneAward.days) return;
    // Première lecture : on cap pour ne pas rejouer le dernier palier à chaque
    // reload. On stocke mais on ne push pas.
    if (prevMilestoneDaysRef.current === null) {
      prevMilestoneDaysRef.current = lastMilestoneAward.days;
      return;
    }
    const c = copy.streakMilestone(lastMilestoneAward.days, lastMilestoneAward.xp);
    push({
      kind: 'streak',
      icon: '🔥',
      title: c.title,
      body: c.body,
      dedupKey: `streak-milestone-${lastMilestoneAward.days}`
    });
    prevMilestoneDaysRef.current = lastMilestoneAward.days;
  }, [lastMilestoneAward, isAuthed, push, copy]);

  // --- Daily bonus (série maintenue aujourd'hui) -----------------------------
  useEffect(() => {
    if (!isAuthed) return;
    if (!lastDailyBonusAt) return;
    if (prevDailyBonusAtRef.current === null) {
      prevDailyBonusAtRef.current = lastDailyBonusAt;
      return;
    }
    if (
      lastDailyBonusAt !== prevDailyBonusAtRef.current &&
      streakCurrent >= 2 /* pas d'alerte pour j1 seul */
    ) {
      const c = copy.dailyBonus(streakCurrent);
      push({
        kind: 'streak',
        icon: '🔥',
        title: c.title,
        body: c.body,
        dedupKey: `streak-daily-${lastDailyBonusAt}`
      });
    }
    prevDailyBonusAtRef.current = lastDailyBonusAt;
  }, [lastDailyBonusAt, streakCurrent, isAuthed, push, copy]);

  // --- SRS due aujourd'hui (une fois par jour, si > 0) -----------------------
  // L'idée : au mount (si authed), si on a des cartes à réviser et qu'on ne
  // s'est pas déjà notifié aujourd'hui, on push une notif unique.
  useEffect(() => {
    if (!isAuthed) return;
    if (dueSrsCount <= 0) return;
    let lastDay: string | null = null;
    try {
      lastDay = window.localStorage.getItem(SRS_REMINDER_STORAGE_KEY);
    } catch {
      lastDay = null;
    }
    const today = todayKey();
    if (lastDay === today) return;
    const c = copy.srsDue(dueSrsCount);
    push({
      kind: 'srs',
      icon: '📚',
      title: c.title,
      body: c.body,
      dedupKey: `srs-due-${today}`,
      link: { kind: 'view', view: 'review' }
    });
    try {
      window.localStorage.setItem(SRS_REMINDER_STORAGE_KEY, today);
    } catch {
      /* quota → silent */
    }
  }, [dueSrsCount, isAuthed, push, copy]);
};

export default useNotificationEvents;
