/**
 * useBattleStats — task #44
 * --------------------------
 * Compteurs persistés (localStorage + Firestore) des batailles jouées par
 * l'utilisateur : played, won, draw, xpFromBattles, recent matches.
 *
 * Stockage :
 *   - key : `xl_battle_stats_v1`
 *   - payload : { played, won, draw, xpFromBattles, recent: BattleResult[] }
 *   - Sync Firestore via useFirestoreSync (stratégie max pour tous les
 *     compteurs, concat dédupliqué pour `recent`).
 *
 * `recent` conserve les 20 dernières batailles (id, outcome, score, opp,
 * finishedAt, xp) pour l'historique affiché sur BattlesPage.
 *
 * `recordBattleResult(match, outcome, xp)` est appelé à la fin d'une partie
 * par BattleSessionPage pour MAJ les compteurs.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFirestoreSync } from './useFirestoreSync';
import type { BattleMatch } from '../types/community';

const KEY = 'xl_battle_stats_v1';
const MAX_RECENT = 20;

export interface BattleResultRecord {
  matchId: string;
  opponent: {
    uid: string;
    displayName: string;
    photoURL: string | null;
  };
  outcome: 'win' | 'loss' | 'draw';
  myScore: number;
  oppScore: number;
  xp: number;
  perfect: boolean;
  finishedAt: number;
}

export interface BattleStatsState {
  played: number;
  won: number;
  draw: number;
  xpFromBattles: number;
  recent: BattleResultRecord[];
}

const EMPTY_STATE: BattleStatsState = {
  played: 0,
  won: 0,
  draw: 0,
  xpFromBattles: 0,
  recent: []
};

const readInitial = (): BattleStatsState => {
  if (typeof window === 'undefined') return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Partial<BattleStatsState>;
    return {
      played: Math.max(0, Number(parsed.played) || 0),
      won: Math.max(0, Number(parsed.won) || 0),
      draw: Math.max(0, Number(parsed.draw) || 0),
      xpFromBattles: Math.max(0, Number(parsed.xpFromBattles) || 0),
      recent: Array.isArray(parsed.recent) ? parsed.recent.slice(-MAX_RECENT) : []
    };
  } catch {
    return EMPTY_STATE;
  }
};

const persistLocal = (state: BattleStatsState) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* noop */
  }
};

export interface UseBattleStatsResult {
  stats: BattleStatsState;
  lost: number;
  winRatePct: number;
  recordBattleResult: (
    match: BattleMatch,
    myUid: string,
    outcome: 'win' | 'loss' | 'draw',
    xp: number,
    perfect: boolean
  ) => void;
}

export const useBattleStats = (): UseBattleStatsResult => {
  const [stats, setStats] = useState<BattleStatsState>(() => readInitial());
  const didMountRef = useRef(false);

  // Sync Firestore — merge "max" sur les compteurs, concat dédup sur recent.
  const { saveToFirestore } = useFirestoreSync(KEY, (data) => {
    if (typeof data !== 'string' && typeof data !== 'object') return;
    let incoming: Partial<BattleStatsState> | null = null;
    try {
      if (typeof data === 'string') {
        incoming = JSON.parse(data) as Partial<BattleStatsState>;
      } else {
        incoming = data as Partial<BattleStatsState>;
      }
    } catch {
      return;
    }
    if (!incoming) return;

    setStats((prev) => {
      const mergedRecentById = new Map<string, BattleResultRecord>();
      for (const r of prev.recent) mergedRecentById.set(r.matchId, r);
      if (Array.isArray(incoming.recent)) {
        for (const r of incoming.recent) {
          if (!r || typeof r.matchId !== 'string') continue;
          if (!mergedRecentById.has(r.matchId)) mergedRecentById.set(r.matchId, r);
        }
      }
      const mergedRecent = Array.from(mergedRecentById.values())
        .sort((a, b) => b.finishedAt - a.finishedAt)
        .slice(0, MAX_RECENT);
      return {
        played: Math.max(prev.played, Number(incoming.played) || 0),
        won: Math.max(prev.won, Number(incoming.won) || 0),
        draw: Math.max(prev.draw, Number(incoming.draw) || 0),
        xpFromBattles: Math.max(prev.xpFromBattles, Number(incoming.xpFromBattles) || 0),
        recent: mergedRecent
      };
    });
  });

  useEffect(() => {
    persistLocal(stats);
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    saveToFirestore(JSON.stringify(stats));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats]);

  const recordBattleResult = useCallback(
    (
      match: BattleMatch,
      myUid: string,
      outcome: 'win' | 'loss' | 'draw',
      xp: number,
      perfect: boolean
    ) => {
      const opp = match.p1.uid === myUid ? match.p2 : match.p1;
      const myScore = match.p1.uid === myUid ? match.p1Score : match.p2Score;
      const oppScore = match.p1.uid === myUid ? match.p2Score : match.p1Score;
      const record: BattleResultRecord = {
        matchId: match.id,
        opponent: opp,
        outcome,
        myScore,
        oppScore,
        xp,
        perfect,
        finishedAt: match.finishedAt ?? Date.now()
      };
      setStats((prev) => {
        // Déjà enregistré ? évite double-comptage en cas de navigation back/forward.
        if (prev.recent.some((r) => r.matchId === match.id)) return prev;
        const nextRecent = [record, ...prev.recent].slice(0, MAX_RECENT);
        return {
          played: prev.played + 1,
          won: prev.won + (outcome === 'win' ? 1 : 0),
          draw: prev.draw + (outcome === 'draw' ? 1 : 0),
          xpFromBattles: prev.xpFromBattles + xp,
          recent: nextRecent
        };
      });
    },
    []
  );

  const lost = Math.max(0, stats.played - stats.won - stats.draw);
  const winRatePct = useMemo(
    () => (stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0),
    [stats.played, stats.won]
  );

  return { stats, lost, winRatePct, recordBattleResult };
};
