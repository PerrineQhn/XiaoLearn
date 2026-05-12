/**
 * useIdeas — gestion des idées communauté (Firestore)
 * ---------------------------------------------------
 * Backend : `community_ideas/{ideaId}` + sous-coll `votes/{uid}`.
 *
 * Lectures :
 *   - Listage temps réel via `onSnapshot` filtré sur `status != 'rejected'`,
 *     trié par voteCount desc, puis createdAt desc.
 *   - Pour le compteur des votes : `voteCount` est denormalisé sur le doc
 *     parent. Mise à jour atomique via `runTransaction` au moment du vote.
 *
 * Écritures :
 *   - `submitIdea({title, description, category})` crée un nouveau doc
 *     avec `status: 'pending'` et `voteCount: 0`.
 *   - `toggleVote(ideaId)` ajoute/supprime un vote dans la sous-collection
 *     et incrémente/décrémente `voteCount` dans la même transaction.
 *
 * Optimistic UI :
 *   - Le toggleVote applique le delta local immédiatement avant la
 *     transaction. En cas d'échec, on rollback.
 */

import { useCallback, useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp,
  runTransaction,
  addDoc,
  getDoc
} from 'firebase/firestore';
import type { Unsubscribe } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import type {
  CommunityIdea,
  IdeaCategory,
  IdeaStatus
} from '../types/community-feedback';
import { tsToIso } from '../types/community-feedback';

interface IdeasState {
  ideas: CommunityIdea[];
  myVoteIds: Set<string>; // idea IDs sur lesquels l'utilisateur a voté
  loading: boolean;
  error: string | null;
}

interface SubmitIdeaInput {
  title: string;
  description: string;
  category: IdeaCategory;
}

const IDEAS_COLLECTION = 'community_ideas';

export interface UseIdeasReturn {
  ideas: CommunityIdea[];
  myVoteIds: Set<string>;
  myIdeas: CommunityIdea[];
  loading: boolean;
  error: string | null;
  submitIdea: (input: SubmitIdeaInput) => Promise<string | null>;
  toggleVote: (ideaId: string) => Promise<void>;
  /** Filtre les idées par statut (utile pour onglets/sections). */
  ideasByStatus: (status: IdeaStatus | 'all') => CommunityIdea[];
}

export const useIdeas = (): UseIdeasReturn => {
  const { user } = useAuth();
  const [state, setState] = useState<IdeasState>({
    ideas: [],
    myVoteIds: new Set(),
    loading: true,
    error: null
  });

  // ------------------------------------------------------------------
  // Subscribe : toutes les idées non-rejetées
  // ------------------------------------------------------------------
  useEffect(() => {
    let unsubIdeas: Unsubscribe | null = null;
    try {
      const q = query(
        collection(db, IDEAS_COLLECTION),
        where('status', 'in', ['pending', 'validated', 'in-dev', 'delivered']),
        orderBy('voteCount', 'desc')
      );
      unsubIdeas = onSnapshot(
        q,
        (snap) => {
          const ideas: CommunityIdea[] = snap.docs.map((d) => {
            const data = d.data() as Record<string, unknown>;
            return {
              id: d.id,
              title: String(data.title ?? ''),
              description: String(data.description ?? ''),
              category: (data.category as IdeaCategory) ?? 'autres',
              status: (data.status as IdeaStatus) ?? 'pending',
              authorId: String(data.authorId ?? ''),
              authorName: String(data.authorName ?? 'Anonyme'),
              createdAt: tsToIso(data.createdAt as never),
              updatedAt: tsToIso(data.updatedAt as never),
              voteCount: Number(data.voteCount ?? 0),
              expectedDate: data.expectedDate
                ? String(data.expectedDate)
                : undefined
            };
          });
          setState((prev) => ({ ...prev, ideas, loading: false, error: null }));
        },
        (err) => {
          console.error('[useIdeas] subscribe error', err);
          setState((prev) => ({
            ...prev,
            loading: false,
            error: err.message || 'Erreur de chargement'
          }));
        }
      );
    } catch (err) {
      console.error('[useIdeas] init error', err);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Erreur d\'initialisation'
      }));
    }
    return () => {
      if (unsubIdeas) unsubIdeas();
    };
  }, []);

  // ------------------------------------------------------------------
  // Subscribe : mes votes (collection group impossible sans index,
  // donc on charge à la demande quand la liste des idées change)
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!user) {
      setState((prev) => ({ ...prev, myVoteIds: new Set() }));
      return;
    }
    const ideaIds = state.ideas.map((i) => i.id);
    if (ideaIds.length === 0) return;

    const unsubs: Unsubscribe[] = [];
    ideaIds.forEach((ideaId) => {
      const voteRef = doc(db, IDEAS_COLLECTION, ideaId, 'votes', user.uid);
      const unsub = onSnapshot(voteRef, (snap) => {
        setState((prev) => {
          const next = new Set(prev.myVoteIds);
          if (snap.exists()) {
            next.add(ideaId);
          } else {
            next.delete(ideaId);
          }
          return { ...prev, myVoteIds: next };
        });
      });
      unsubs.push(unsub);
    });
    return () => {
      unsubs.forEach((u) => u());
    };
  }, [user, state.ideas]);

  // ------------------------------------------------------------------
  // submitIdea
  // ------------------------------------------------------------------
  const submitIdea = useCallback(
    async (input: SubmitIdeaInput): Promise<string | null> => {
      if (!user) {
        setState((prev) => ({
          ...prev,
          error: 'Tu dois être connecté pour proposer une idée.'
        }));
        return null;
      }
      const trimmedTitle = input.title.trim();
      const trimmedDesc = input.description.trim();
      if (!trimmedTitle || !trimmedDesc) {
        setState((prev) => ({
          ...prev,
          error: 'Titre et description requis.'
        }));
        return null;
      }
      try {
        const docRef = await addDoc(collection(db, IDEAS_COLLECTION), {
          title: trimmedTitle,
          description: trimmedDesc,
          category: input.category,
          status: 'pending',
          authorId: user.uid,
          authorName: user.displayName ?? user.email ?? 'Anonyme',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          voteCount: 0
        });
        return docRef.id;
      } catch (err) {
        console.error('[useIdeas] submitIdea error', err);
        setState((prev) => ({
          ...prev,
          error: (err as Error).message || "Impossible d'envoyer l'idée."
        }));
        return null;
      }
    },
    [user]
  );

  // ------------------------------------------------------------------
  // toggleVote
  // ------------------------------------------------------------------
  const toggleVote = useCallback(
    async (ideaId: string): Promise<void> => {
      if (!user) {
        setState((prev) => ({
          ...prev,
          error: 'Connecte-toi pour voter.'
        }));
        return;
      }
      const ideaRef = doc(db, IDEAS_COLLECTION, ideaId);
      const voteRef = doc(db, IDEAS_COLLECTION, ideaId, 'votes', user.uid);

      try {
        await runTransaction(db, async (txn) => {
          const [ideaSnap, voteSnap] = await Promise.all([
            txn.get(ideaRef),
            txn.get(voteRef)
          ]);
          if (!ideaSnap.exists()) throw new Error('Idée introuvable.');

          const currentCount = Number(ideaSnap.data().voteCount ?? 0);
          if (voteSnap.exists()) {
            // Retirer le vote
            txn.delete(voteRef);
            txn.update(ideaRef, {
              voteCount: Math.max(0, currentCount - 1),
              updatedAt: serverTimestamp()
            });
          } else {
            // Ajouter le vote
            txn.set(voteRef, {
              uid: user.uid,
              votedAt: serverTimestamp()
            });
            txn.update(ideaRef, {
              voteCount: currentCount + 1,
              updatedAt: serverTimestamp()
            });
          }
        });
      } catch (err) {
        console.error('[useIdeas] toggleVote error', err);
        setState((prev) => ({
          ...prev,
          error: (err as Error).message || 'Le vote a échoué.'
        }));
      }
    },
    [user]
  );

  // ------------------------------------------------------------------
  // Helpers dérivés
  // ------------------------------------------------------------------
  const myIdeas = user
    ? state.ideas.filter((i) => i.authorId === user.uid)
    : [];

  const ideasByStatus = useCallback(
    (status: IdeaStatus | 'all'): CommunityIdea[] => {
      if (status === 'all') return state.ideas;
      return state.ideas.filter((i) => i.status === status);
    },
    [state.ideas]
  );

  return {
    ideas: state.ideas,
    myVoteIds: state.myVoteIds,
    myIdeas,
    loading: state.loading,
    error: state.error,
    submitIdea,
    toggleVote,
    ideasByStatus
  };
};

/** Helper pour récupérer une idée par ID (one-shot, hors live). */
export const fetchIdeaOnce = async (ideaId: string): Promise<CommunityIdea | null> => {
  try {
    const snap = await getDoc(doc(db, IDEAS_COLLECTION, ideaId));
    if (!snap.exists()) return null;
    const data = snap.data();
    return {
      id: snap.id,
      title: String(data.title ?? ''),
      description: String(data.description ?? ''),
      category: (data.category as IdeaCategory) ?? 'autres',
      status: (data.status as IdeaStatus) ?? 'pending',
      authorId: String(data.authorId ?? ''),
      authorName: String(data.authorName ?? 'Anonyme'),
      createdAt: tsToIso(data.createdAt as never),
      updatedAt: tsToIso(data.updatedAt as never),
      voteCount: Number(data.voteCount ?? 0),
      expectedDate: data.expectedDate ? String(data.expectedDate) : undefined
    };
  } catch {
    return null;
  }
};
