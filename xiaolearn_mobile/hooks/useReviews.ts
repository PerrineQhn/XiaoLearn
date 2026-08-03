/**
 * useReviews — avis utilisateurs (Firestore)
 * Port mobile de xiaolearn_app/src/hooks/useReviews.ts.
 * Backend : collection racine `reviews/{uid}` — UN avis par utilisateur,
 * docId == uid. Note 1..5, texte <= 1000 chars. Même schéma que le web.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  collection, query, orderBy, limit, getDocs, doc, setDoc, deleteDoc,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/contexts/LanguageContext';

export interface Review {
  uid: string;
  displayName: string;
  photoURL?: string;
  rating: number; // 1..5
  text: string;   // max 1000 chars
  createdAt: string; // ISO
  updatedAt: string; // ISO
  language?: 'fr' | 'en';
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
    language: lang,
  };
};

export function useReviews() {
  const { t, lang } = useI18n();
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q = query(
        collection(db, REVIEWS_COLLECTION),
        orderBy('updatedAt', 'desc'),
        limit(REVIEWS_LIMIT)
      );
      const snap = await getDocs(q);
      setReviews(snap.docs.map(d => toReview(d.id, d.data() as Record<string, unknown>)));
    } catch (err: any) {
      console.warn('[useReviews] fetch failed', err);
      setError(err?.message ?? t('net.reviewsFailed'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const myReview = useMemo(
    () => (user ? reviews.find(r => r.uid === user.uid) ?? null : null),
    [reviews, user]
  );

  const submitReview = useCallback(async (rating: number, text: string): Promise<boolean> => {
    if (!user) { setError('not-signed-in'); return false; }
    const safeRating = Math.round(rating);
    const safeText = text.trim().slice(0, REVIEW_TEXT_MAX);
    if (safeRating < 1 || safeRating > 5) { setError('invalid-rating'); return false; }
    setSaving(true);
    setError(null);
    const now = new Date().toISOString();
    const existing = reviews.find(r => r.uid === user.uid) ?? null;
    // Pas de `undefined` dans un payload Firestore → champs conditionnels.
    const payload: Record<string, unknown> = {
      uid: user.uid,
      displayName: user.displayName ?? '',
      rating: safeRating,
      text: safeText,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
      // La langue de l'avis suivait un 'fr' codé en dur : un avis rédigé en
      // anglais était étiqueté français.
      language: lang,
    };
    if (user.photoURL) payload.photoURL = user.photoURL;
    try {
      await setDoc(doc(db, REVIEWS_COLLECTION, user.uid), payload, { merge: true });
      const next = toReview(user.uid, payload);
      setReviews(prev => [next, ...prev.filter(r => r.uid !== user.uid)]);
      return true;
    } catch (err: any) {
      console.warn('[useReviews] submit failed', err);
      setError(err?.message ?? 'Impossible d\'enregistrer l\'avis');
      return false;
    } finally {
      setSaving(false);
    }
  }, [user, reviews]);

  const deleteReview = useCallback(async (): Promise<boolean> => {
    if (!user) { setError('not-signed-in'); return false; }
    setSaving(true);
    setError(null);
    try {
      await deleteDoc(doc(db, REVIEWS_COLLECTION, user.uid));
      setReviews(prev => prev.filter(r => r.uid !== user.uid));
      return true;
    } catch (err: any) {
      console.warn('[useReviews] delete failed', err);
      setError(err?.message ?? 'Impossible de supprimer l\'avis');
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
      count: reviews.length,
    };
  }, [reviews]);

  return { reviews, myReview, loading, saving, error, averageRating, count, refresh, submitReview, deleteReview };
}
