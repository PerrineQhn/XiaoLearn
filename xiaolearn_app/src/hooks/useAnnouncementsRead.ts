/**
 * useAnnouncementsRead — gestion des annonces lues / non lues
 * --------------------------------------------------------------
 * Persistance localStorage (clé `xl_announcements_read_v1`) + sync
 * Firestore best-effort via `useFirestoreSync`.
 *
 * API :
 *   - readIds          : Set<string> des annonces déjà ouvertes
 *   - unreadCount(all) : nombre de IDs absents de readIds
 *   - markAllRead(all) : marque tous les IDs présents comme lus
 *   - markRead(id)     : marque un id précis comme lu
 *
 * Pourquoi pas un compteur côté UI uniquement ? On sync Firestore pour
 * que la pastille "non lu" ne réapparaisse pas en passant Chrome → Safari.
 */
import { useCallback, useMemo, useState } from 'react';
import { useFirestoreSync } from './useFirestoreSync';

const STORAGE_KEY = 'xl_announcements_read_v1';

interface ReadState {
  ids: string[];
  updatedAt: string;
}

const readInitial = (): ReadState => {
  if (typeof window === 'undefined') return { ids: [], updatedAt: '' };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ids: [], updatedAt: '' };
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.ids)) {
      return { ids: parsed.ids as string[], updatedAt: parsed.updatedAt ?? '' };
    }
  } catch {
    /* ignore */
  }
  return { ids: [], updatedAt: '' };
};

export interface UseAnnouncementsReadOptions {
  syncEnabled?: boolean;
}

export const useAnnouncementsRead = (opts: UseAnnouncementsReadOptions = {}) => {
  const [state, setState] = useState<ReadState>(readInitial);

  const { saveToFirestore } = useFirestoreSync(
    STORAGE_KEY,
    (data) => {
      if (data && typeof data === 'object' && Array.isArray((data as ReadState).ids)) {
        setState({
          ids: (data as ReadState).ids,
          updatedAt: (data as ReadState).updatedAt ?? ''
        });
      }
    },
    { enabled: opts.syncEnabled ?? true }
  );

  const persist = useCallback(
    (next: ReadState) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      saveToFirestore(next);
    },
    [saveToFirestore]
  );

  const readIds = useMemo(() => new Set(state.ids), [state.ids]);

  const unreadCount = useCallback(
    (all: Array<{ id: string }>): number => {
      let n = 0;
      for (const a of all) {
        if (!readIds.has(a.id)) n += 1;
      }
      return n;
    },
    [readIds]
  );

  const markAllRead = useCallback(
    (all: Array<{ id: string }>) => {
      const allIds = all.map((a) => a.id);
      // Optimisation : si tout est déjà lu, on évite re-render + write.
      const set = new Set(state.ids);
      let added = false;
      for (const id of allIds) {
        if (!set.has(id)) {
          set.add(id);
          added = true;
        }
      }
      if (!added) return;
      const next: ReadState = {
        ids: Array.from(set),
        updatedAt: new Date().toISOString()
      };
      setState(next);
      persist(next);
    },
    [state.ids, persist]
  );

  const markRead = useCallback(
    (id: string) => {
      if (readIds.has(id)) return;
      const next: ReadState = {
        ids: [...state.ids, id],
        updatedAt: new Date().toISOString()
      };
      setState(next);
      persist(next);
    },
    [readIds, state.ids, persist]
  );

  return { readIds, unreadCount, markAllRead, markRead };
};

export default useAnnouncementsRead;
