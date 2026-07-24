/**
 * useReviews — avis utilisateurs (Firestore)
 * ------------------------------------------
 * Backend : collection racine `reviews/{uid}` — UN avis par utilisateur,
 * docId == uid (les rules Firestore garantissent qu'on ne peut écrire que
 * son propre doc, note 1..5, texte <= 1000 chars).
 *
 * Lectures :
 *   - `getDocs` au mount (orderBy updatedAt desc, limit 100) + `refresh()`
 *     manuel. Pas de onSnapshot : les avis bougent peu, inutile de payer
 *     un listener temps réel.
 *
 * Écritures :
 *   - `submitReview(rating, text, language?)` : setDoc merge sur
 *     `reviews/{uid}` avec displayName/photoURL depuis le profil auth.
 *   - `deleteReview()` : deleteDoc sur son propre doc.
 *
 * Les deux écritures mettent à jour l'état local immédiatement (pas besoin
 * de re-fetch pour voir son propre avis apparaître).
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  setDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

export interface Review {
  uid: string;
  displayName: string; // nom affiché (depuis le profil auth) — peut être ''
  photoURL?: string; // avatar (auth), optionnel
  rating: number; // 1..5
  text: string; // max 1000 chars
  createdAt: string; // ISO
  updatedAt: string; // ISO
  language?: 'fr' | 'en'; // langue de rédaction (filtres futurs)
}

export const REVIEW_TEXT_MAX = 1000;

const REVIEWS_COLLECTION = 'reviews';
const REVIEWS_LIMIT = 100;

const toReview = (id: string, data: Record<string, unknown>): Review => {
  const rawRating = Number(data.rating ?? 0);
  const lang = data.language === 'en' || data.language === 'fr' ? data.language : undefined;
  return {
    uid: String(data.uid ?? id),
    displayName: String(data.displayName ?? ''),
    photoURL: typeof data.photoURL === 'string' && data.photoURL ? data.photoURL : undefined,
    rating: Math.min(5, Math.max(1, Math.round(Number.isFinite(rawRating) ? rawRating : 1))),
    text: String(data.text ?? ''),
    createdAt: String(data.createdAt ?? ''),
    updatedAt: String(data.updatedAt ?? ''),
    language: lang
  };
};

export interface UseReviewsReturn {
  reviews: Review[];
  /** L'avis de l'utilisateur courant (doc `reviews/{uid}`), s'il existe. */
  myReview: Review | null;
  loading: boolean;
  /** True pendant un submit/delete en cours. */
  saving: boolean;
  error: string | null;
  averageRating: number; // 0 si aucun avis
  count: number;
  refresh: () => Promise<void>;
  submitReview: (rating: number, text: string, language?: 'fr' | 'en') => Promise<boolean>;
  deleteReview: () => Promise<boolean>;
}

export const useReviews = (): UseReviewsReturn => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q = query(
        collection(db, REVIEWS_COLLECTION),
        orderBy('updatedAt', 'desc'),
        limit(REVIEWS_LIMIT)
      );
      const snap = await getDocs(q);
      setReviews(snap.docs.map((d) => toReview(d.id, d.data() as Record<string, unknown>)));
    } catch (err) {
      console.error('[useReviews] fetch failed', err);
      setError(err instanceof Error ? err.message : 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchReviews();
  }, [fetchReviews]);

  const myReview = useMemo(
    () => (user ? reviews.find((r) => r.uid === user.uid) ?? null : null),
    [reviews, user]
  );

  const submitReview = useCallback(
    async (rating: number, text: string, language?: 'fr' | 'en'): Promise<boolean> => {
      if (!user) {
        setError('not-signed-in');
        return false;
      }
      const safeRating = Math.round(rating);
      const safeText = text.trim().slice(0, REVIEW_TEXT_MAX);
      if (safeRating < 1 || safeRating > 5) {
        setError('invalid-rating');
        return false;
      }
      setSaving(true);
      setError(null);
      const now = new Date().toISOString();
      const existing = reviews.find((r) => r.uid === user.uid) ?? null;
      // NB : pas de `undefined` dans un payload Firestore → champs optionnels
      // ajoutés conditionnellement.
      const payload: Record<string, unknown> = {
        uid: user.uid,
        displayName: user.displayName ?? '',
        rating: safeRating,
        text: safeText,
        createdAt: existing?.createdAt || now,
        updatedAt: now
      };
      if (user.photoURL) payload.photoURL = user.photoURL;
      if (language) payload.language = language;
      try {
        await setDoc(doc(db, REVIEWS_COLLECTION, user.uid), payload, { merge: true });
        const next = toReview(user.uid, payload);
        setReviews((prev) => [next, ...prev.filter((r) => r.uid !== user.uid)]);
        return true;
      } catch (err) {
        console.error('[useReviews] submit failed', err);
        setError(err instanceof Error ? err.message : 'Failed to save review');
        return false;
      } finally {
        setSaving(false);
      }
    },
    [user, reviews]
  );

  const deleteReview = useCallback(async (): Promise<boolean> => {
    if (!user) {
      setError('not-signed-in');
      return false;
    }
    setSaving(true);
    setError(null);
    try {
      await deleteDoc(doc(db, REVIEWS_COLLECTION, user.uid));
      setReviews((prev) => prev.filter((r) => r.uid !== user.uid));
      return true;
    } catch (err) {
      console.error('[useReviews] delete failed', err);
      setError(err instanceof Error ? err.message : 'Failed to delete review');
      return false;
    } finally {
      setSaving(false);
    }
  }, [user]);

  const { averageRating, count } = useMemo(() => {
    if (reviews.length === 0) return { averageRating: 0, count: 0 };
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      averageRating: Math.round((sum / reviews.length) * 10) / 10,
      count: reviews.length
    };
  }, [reviews]);

  return {
    reviews,
    myReview,
    loading,
    saving,
    error,
    averageRating,
    count,
    refresh: fetchReviews,
    submitReview,
    deleteReview
  };
};
