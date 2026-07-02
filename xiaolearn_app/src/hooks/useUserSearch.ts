/**
 * useUserSearch — recherche d'utilisateurs par displayName
 * --------------------------------------------------------
 * Pour le moment, on lit la collection `publicProfiles` (utilisée déjà
 * pour le leaderboard) et on filtre côté client par préfixe sur le
 * displayName.
 *
 * À terme, si la base grandit (> quelques centaines de profils), il
 * faudra basculer sur une vraie recherche serveur (Algolia / Typesense
 * / Cloud Function avec index).
 *
 * Renvoie max 10 résultats triés par match exact > prefix > contient.
 */

import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import type { ConversationParticipant } from '../types/community-feedback';

const PUBLIC_PROFILES = 'publicProfiles';

export interface UseUserSearchReturn {
  results: ConversationParticipant[];
  loading: boolean;
  error: string | null;
  search: (q: string) => void;
}

interface ProfileSnapshot {
  uid: string;
  displayName: string;
  photoURL?: string;
}

export const useUserSearch = (): UseUserSearchReturn => {
  const { user } = useAuth();
  const [allProfiles, setAllProfiles] = useState<ProfileSnapshot[]>([]);
  const [results, setResults] = useState<ConversationParticipant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Charge une page de profils (limité à 200 pour ne pas saturer)
  // À chaque ouverture du modal — on accepte ce coût car c'est rare.
  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const snap = await getDocs(query(collection(db, PUBLIC_PROFILES), limit(200)));
      const profiles: ProfileSnapshot[] = snap.docs
        .map((d) => {
          const data = d.data() as Record<string, unknown>;
          return {
            uid: d.id,
            displayName: String(data.displayName ?? '').trim(),
            photoURL: data.photoURL ? String(data.photoURL) : undefined
          };
        })
        .filter((p) => p.displayName.length > 0 && p.uid !== user?.uid);
      setAllProfiles(profiles);
    } catch (err) {
      console.error('[useUserSearch] fetch error', err);
      setError((err as Error).message || 'Erreur de recherche');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Au montage, on précharge
  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const search = useCallback(
    (q: string) => {
      const trimmed = q.trim().toLowerCase();
      if (trimmed.length === 0) {
        setResults([]);
        return;
      }
      const scored: { p: ProfileSnapshot; score: number }[] = [];
      allProfiles.forEach((p) => {
        const name = p.displayName.toLowerCase();
        if (name === trimmed) scored.push({ p, score: 3 });
        else if (name.startsWith(trimmed)) scored.push({ p, score: 2 });
        else if (name.includes(trimmed)) scored.push({ p, score: 1 });
      });
      scored.sort((a, b) => b.score - a.score);
      setResults(
        scored.slice(0, 10).map(({ p }) => ({
          uid: p.uid,
          displayName: p.displayName,
          avatarUrl: p.photoURL
        }))
      );
    },
    [allProfiles]
  );

  return { results, loading, error, search };
};
