/**
 * useEmailPrefs — Préférences d'email de l'utilisateur.
 * ------------------------------------------------------
 * Document Firestore : `emailPrefs/{uid}`
 *   { enabled, dailyReminder, weeklyDigest, battleChallenges, rankUp,
 *     streakAlerts, marketing, updatedAt, email, language }
 *
 * Utilisé par :
 *   - UI Réglages → Notifications → section "Rappels par mail"
 *   - Cron Cloud Functions (future) → lit ce doc pour filtrer les envois
 *
 * Philosophie :
 *   - La source de vérité est Firestore (car lue côté backend pour envoyer
 *     les mails). Le localStorage sert de cache pour répondre sans latence.
 *   - On merge silencieusement en cas d'erreur (offline / quota) : les
 *     toggles restent actifs en local.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

export interface EmailPrefs {
  /** Master switch : si false, aucun email ne part. */
  enabled: boolean;
  /** Rappel quotidien "tu as X révisions à faire". */
  dailyReminder: boolean;
  /** Résumé hebdo (XP, leçons complétées, classement). */
  weeklyDigest: boolean;
  /** Email à chaque défi de bataille reçu. */
  battleChallenges: boolean;
  /** Notification rang gagné / perdu. */
  rankUp: boolean;
  /** Alerte série en danger / palier atteint. */
  streakAlerts: boolean;
  /** Promos, actualités, événements. */
  marketing: boolean;
}

export const DEFAULT_EMAIL_PREFS: EmailPrefs = {
  enabled: true,
  dailyReminder: true,
  weeklyDigest: true,
  battleChallenges: true,
  rankUp: false,
  streakAlerts: true,
  marketing: false
};

const STORAGE_KEY = 'xl_email_prefs_v1';

const readLocal = (): EmailPrefs => {
  if (typeof window === 'undefined') return { ...DEFAULT_EMAIL_PREFS };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_EMAIL_PREFS };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_EMAIL_PREFS, ...parsed };
  } catch {
    return { ...DEFAULT_EMAIL_PREFS };
  }
};

const writeLocal = (prefs: EmailPrefs): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* quota → silent */
  }
};

export interface UseEmailPrefsResult {
  prefs: EmailPrefs;
  /** Maj partielle + persistance locale + sync Firestore best-effort. */
  update: (patch: Partial<EmailPrefs>) => void;
  /** État de la sync (idle | saving | error). UI peut afficher un hint. */
  syncState: 'idle' | 'saving' | 'error';
}

export const useEmailPrefs = (language: 'fr' | 'en' = 'fr'): UseEmailPrefsResult => {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState<EmailPrefs>(() => readLocal());
  const [syncState, setSyncState] = useState<'idle' | 'saving' | 'error'>('idle');

  // --- Subscribe Firestore -------------------------------------------------
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'emailPrefs', user.uid);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (!snap.exists()) return;
        const data = snap.data();
        if (!data) return;
        setPrefs((prev) => {
          const merged: EmailPrefs = {
            enabled: typeof data.enabled === 'boolean' ? data.enabled : prev.enabled,
            dailyReminder:
              typeof data.dailyReminder === 'boolean' ? data.dailyReminder : prev.dailyReminder,
            weeklyDigest:
              typeof data.weeklyDigest === 'boolean' ? data.weeklyDigest : prev.weeklyDigest,
            battleChallenges:
              typeof data.battleChallenges === 'boolean'
                ? data.battleChallenges
                : prev.battleChallenges,
            rankUp: typeof data.rankUp === 'boolean' ? data.rankUp : prev.rankUp,
            streakAlerts:
              typeof data.streakAlerts === 'boolean' ? data.streakAlerts : prev.streakAlerts,
            marketing: typeof data.marketing === 'boolean' ? data.marketing : prev.marketing
          };
          writeLocal(merged);
          return merged;
        });
      },
      () => {
        /* offline / quota → silent, on garde le local */
      }
    );
    return unsub;
  }, [user]);

  // --- update (optimistic + best-effort cloud) ----------------------------
  const update = useCallback(
    (patch: Partial<EmailPrefs>) => {
      setPrefs((prev) => {
        const next = { ...prev, ...patch };
        writeLocal(next);
        if (user) {
          setSyncState('saving');
          const ref = doc(db, 'emailPrefs', user.uid);
          setDoc(
            ref,
            {
              ...next,
              email: user.email ?? null,
              language,
              updatedAt: serverTimestamp()
            },
            { merge: true }
          )
            .then(() => setSyncState('idle'))
            .catch(() => setSyncState('error'));
        }
        return next;
      });
    },
    [user, language]
  );

  return useMemo(() => ({ prefs, update, syncState }), [prefs, update, syncState]);
};

export default useEmailPrefs;
