/**
 * useUserSearch — recherche d'utilisateurs par displayName dans publicProfiles
 * Filtre client-side (identique à l'app web) : exact > prefix > contains
 */
import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuth } from '@/contexts/AuthContext';
import type { UserParticipant } from './useConversations';

interface Profile { uid: string; displayName: string }

export function useUserSearch() {
  const { user } = useAuth();
  const [allProfiles, setAllProfiles] = useState<Profile[]>([]);
  const [results, setResults]         = useState<UserParticipant[]>([]);
  const [loading, setLoading]         = useState(false);

  // Précharge les profils au montage
  useEffect(() => {
    if (!db) return;
    setLoading(true);
    getDocs(query(collection(db, 'publicProfiles'), limit(200)))
      .then(snap => {
        const profiles: Profile[] = snap.docs
          .map(d => ({
            uid: d.id,
            displayName: String((d.data() as Record<string, unknown>).displayName ?? '').trim(),
          }))
          .filter(p => p.displayName.length > 0 && p.uid !== user?.uid);
        setAllProfiles(profiles);
      })
      .catch(e => console.warn('[useUserSearch]', e))
      .finally(() => setLoading(false));
  }, [user]);

  const search = useCallback((q: string) => {
    const term = q.trim().toLowerCase();
    if (!term) { setResults([]); return; }
    const scored: { p: Profile; score: number }[] = [];
    allProfiles.forEach(p => {
      const name = p.displayName.toLowerCase();
      if (name === term)             scored.push({ p, score: 3 });
      else if (name.startsWith(term)) scored.push({ p, score: 2 });
      else if (name.includes(term))   scored.push({ p, score: 1 });
    });
    scored.sort((a, b) => b.score - a.score);
    setResults(scored.slice(0, 10).map(({ p }) => ({ uid: p.uid, displayName: p.displayName })));
  }, [allProfiles]);

  return { results, loading, search };
}
