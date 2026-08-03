import { useEffect, useState } from 'react';
import {
  collection, query, orderBy, limit,
  onSnapshot, type DocumentData,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuth } from '@/contexts/AuthContext';

export interface LeaderboardEntry {
  uid: string;
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  streakDays: number;
  level: string;
  isMe: boolean;
}

/** XP → niveau CECR */
export function xpToLevel(xp: number): string {
  if (xp >= 6000) return 'C1';
  if (xp >= 3000) return 'B2';
  if (xp >= 1500) return 'B1';
  if (xp >= 500)  return 'A2';
  return 'A1';
}

function toEntry(uid: string, data: DocumentData, myUid: string, rank: number): LeaderboardEntry {
  const name   = (data.displayName as string | undefined) ?? 'Joueur';
  const xp     = Number(data.xp ?? 0);
  const streak = Number(data.streakDays ?? 0);
  const level  = (data.level as string | undefined) ?? xpToLevel(xp);
  return {
    uid,
    rank,
    name,
    avatar: name[0]?.toUpperCase() ?? '?',
    xp,
    streakDays: streak,
    level,
    isMe: uid === myUid,
  };
}

export function useLeaderboard(topN = 20) {
  const { user } = useAuth();
  const [entries, setEntries]   = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    if (!db) { setLoading(false); return; }

    const q = query(
      collection(db, 'leaderboard'),
      orderBy('xp', 'desc'),
      limit(topN),
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const myUid = user?.uid ?? '';
        const list  = snap.docs.map((d, i) => toEntry(d.id, d.data(), myUid, i + 1));
        setEntries(list);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.warn('[Leaderboard] Firestore error:', err.message);
        setError(err.message);
        setLoading(false);
      },
    );

    return unsub;
  }, [user, topN]);

  return { entries, loading, error };
}
