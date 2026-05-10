/**
 * useLeaderboard — task #44
 * --------------------------
 * S'abonne à la collection Firestore `publicProfiles` et expose 4 classements
 * pré-triés :
 *   - `byTotalXp`      — XP cumulé tout temps
 *   - `byWeeklyXp`     — XP gagnés sur la semaine ISO en cours
 *   - `byBattlesWon`   — nombre de batailles gagnées
 *   - `byStreak`       — série quotidienne actuelle (streakCurrent)
 *   - `byVocabSize`    — vocabulaire maîtrisé
 *
 * Toggle Hebdo/Total : `byTotalXp` vs `byWeeklyXp` pour la catégorie "EXP".
 *
 * Contraintes :
 *   - Limit 200 utilisateurs (ordre totalXp desc pour le tri initial).
 *   - Ré-évalué côté client à chaque snapshot → l'ordre par streak ou W se
 *     fait sur les mêmes 200 utilisateurs, pas sur TOUT Firestore. Acceptable
 *     tant que l'app est < ~10k users. Au-delà, bouger vers une Cloud Function.
 *   - Gère proprement le cas "pas connecté" (retourne liste vide, loading false).
 *
 * Security rules requises :
 *   - list/read autorisé pour tout user authentifié (voir FIRESTORE_RULES.md).
 */

import { useEffect, useMemo, useState } from 'react';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import type { PublicProfile } from '../types/community';
import { getRankFromXp, getWeekStart } from '../types/community';

const PROFILE_FETCH_LIMIT = 200;

export interface LeaderboardEntry extends PublicProfile {
  /** Position 1-based dans le classement courant. */
  rankPosition: number;
  /** Rang "équipement" basé sur totalXp (Apprenti / Étudiant / …). */
  tierName: string;
  tierEmoji: string;
  tierColor: string;
  isMe: boolean;
}

export interface LeaderboardResult {
  loading: boolean;
  /** Tous les profils chargés, non triés. Utile pour stats globales. */
  all: PublicProfile[];
  byTotalXp: LeaderboardEntry[];
  byWeeklyXp: LeaderboardEntry[];
  byBattlesWon: LeaderboardEntry[];
  byStreak: LeaderboardEntry[];
  byVocabSize: LeaderboardEntry[];
  /** Entrée correspondant à l'utilisateur courant, s'il est présent. */
  me: LeaderboardEntry | null;
  /** Position 1-based de l'user dans chaque classement. */
  mePositions: {
    totalXp: number | null;
    weeklyXp: number | null;
    battlesWon: number | null;
    streak: number | null;
    vocabSize: number | null;
  };
}

const attachRank = (
  sorted: PublicProfile[],
  meUid: string | null
): LeaderboardEntry[] => {
  return sorted.map((p, i) => {
    const rank = getRankFromXp(p.totalXp);
    return {
      ...p,
      rankPosition: i + 1,
      tierName: rank.tier.name,
      tierEmoji: rank.tier.emoji,
      tierColor: rank.tier.color,
      isMe: p.uid === meUid
    };
  });
};

const findMyPosition = (list: LeaderboardEntry[]): number | null => {
  const found = list.find((e) => e.isMe);
  return found ? found.rankPosition : null;
};

export interface UseLeaderboardOpts {
  /**
   * Profils additionnels à injecter côté client (PAS dans Firestore).
   * Cas d'usage : bot DEV pour tester le classement/batailles sans second user.
   * Déduplication par uid (les entrées injectées remplacent celles déjà
   * présentes dans Firestore si un doublon d'uid existait).
   */
  injectExtra?: PublicProfile[];
}

export const useLeaderboard = (opts: UseLeaderboardOpts = {}): LeaderboardResult => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<PublicProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const injectExtra = opts.injectExtra;

  useEffect(() => {
    if (!user) {
      setProfiles([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'publicProfiles'),
      orderBy('totalXp', 'desc'),
      limit(PROFILE_FETCH_LIMIT)
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const list: PublicProfile[] = [];
        snap.forEach((docSnap) => {
          const data = docSnap.data() as Partial<PublicProfile>;
          if (!data || !data.uid) return;
          list.push({
            uid: data.uid,
            displayName: data.displayName ?? 'Apprenant',
            photoURL: data.photoURL ?? null,
            totalXp: Number(data.totalXp) || 0,
            streakCurrent: Number(data.streakCurrent) || 0,
            streakBest: Number(data.streakBest) || 0,
            vocabSize: Number(data.vocabSize) || 0,
            lessonsCompleted: Number(data.lessonsCompleted) || 0,
            weeklyXp: Number(data.weeklyXp) || 0,
            weekStart: data.weekStart ?? getWeekStart(),
            battlesPlayed: Number(data.battlesPlayed) || 0,
            battlesWon: Number(data.battlesWon) || 0,
            battlesDraw: Number(data.battlesDraw) || 0,
            lastActiveAt: data.lastActiveAt ?? '',
            updatedAt: data.updatedAt ?? '',
            language: data.language ?? 'fr'
          });
        });
        setProfiles(list);
        setLoading(false);
      },
      (err) => {
        console.warn('[useLeaderboard] snapshot failed — check Firestore rules', err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [user]);

  const meUid = user?.uid ?? null;
  const currentWeek = getWeekStart();

  // Fusion Firestore + profils injectés (bot DEV). Dédup par uid.
  const mergedProfiles = useMemo<PublicProfile[]>(() => {
    if (!injectExtra || injectExtra.length === 0) return profiles;
    const byUid = new Map<string, PublicProfile>();
    for (const p of profiles) byUid.set(p.uid, p);
    for (const extra of injectExtra) byUid.set(extra.uid, extra);
    return Array.from(byUid.values());
  }, [profiles, injectExtra]);

  const byTotalXp = useMemo(() => {
    const sorted = [...mergedProfiles].sort((a, b) => b.totalXp - a.totalXp);
    return attachRank(sorted, meUid);
  }, [mergedProfiles, meUid]);

  const byWeeklyXp = useMemo(() => {
    // Les profils dont weekStart != currentWeek ont du weeklyXp "périmé"
    // qui n'a pas encore été reset côté client. On les ramène à 0 pour le
    // classement hebdo en cours (cohérence cross-timezone).
    const sorted = [...mergedProfiles]
      .map((p) => ({ ...p, weeklyXp: p.weekStart === currentWeek ? p.weeklyXp : 0 }))
      .sort((a, b) => b.weeklyXp - a.weeklyXp);
    return attachRank(sorted, meUid);
  }, [mergedProfiles, meUid, currentWeek]);

  const byBattlesWon = useMemo(() => {
    const sorted = [...mergedProfiles].sort(
      (a, b) => b.battlesWon - a.battlesWon || b.totalXp - a.totalXp
    );
    return attachRank(sorted, meUid);
  }, [mergedProfiles, meUid]);

  const byStreak = useMemo(() => {
    const sorted = [...mergedProfiles].sort(
      (a, b) => b.streakCurrent - a.streakCurrent || b.totalXp - a.totalXp
    );
    return attachRank(sorted, meUid);
  }, [mergedProfiles, meUid]);

  const byVocabSize = useMemo(() => {
    const sorted = [...mergedProfiles].sort(
      (a, b) => b.vocabSize - a.vocabSize || b.totalXp - a.totalXp
    );
    return attachRank(sorted, meUid);
  }, [mergedProfiles, meUid]);

  const me = useMemo<LeaderboardEntry | null>(() => {
    if (!meUid) return null;
    return byTotalXp.find((e) => e.uid === meUid) ?? null;
  }, [byTotalXp, meUid]);

  const mePositions = useMemo(
    () => ({
      totalXp: findMyPosition(byTotalXp),
      weeklyXp: findMyPosition(byWeeklyXp),
      battlesWon: findMyPosition(byBattlesWon),
      streak: findMyPosition(byStreak),
      vocabSize: findMyPosition(byVocabSize)
    }),
    [byTotalXp, byWeeklyXp, byBattlesWon, byStreak, byVocabSize]
  );

  return {
    loading,
    all: profiles,
    byTotalXp,
    byWeeklyXp,
    byBattlesWon,
    byStreak,
    byVocabSize,
    me,
    mePositions
  };
};
