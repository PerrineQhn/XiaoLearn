/**
 * useLanguagePref — préférence de langue UI persistée
 * ----------------------------------------------------
 * La langue vivait dans un simple `useState<Language>('fr')` au sommet de
 * `App.tsx` → un utilisateur anglophone retombait sur du français à chaque
 * rechargement. Ce hook la persiste :
 *   - localStorage (clé `xl_language`) → réactif instantané au reload
 *   - Firestore via useFirestoreSync → cross-device (Chrome ↔ Safari…)
 *
 * Valeur par défaut : détection heuristique via `navigator.language`. Si le
 * navigateur est en français on garde 'fr', sinon on part sur 'en'. Ce défaut
 * n'est utilisé que lors du TOUT premier mount (aucune valeur en storage) —
 * ensuite c'est toujours la préférence explicite de l'utilisateur qui prime.
 *
 * Robustesse :
 *   - Gère l'absence de `window` (SSR/tests jsdom).
 *   - Gère les JSON parse errors (valeur corrompue → fallback default).
 *   - Ignore les valeurs inconnues (autre que 'fr' | 'en').
 */

import { useCallback, useEffect, useState } from 'react';
import type { Language } from '../i18n';
import { useFirestoreSync } from './useFirestoreSync';

const STORAGE_KEY = 'xl_language';

const detectBrowserDefault = (): Language => {
  if (typeof navigator === 'undefined') return 'fr';
  try {
    const raw = (navigator.language || (navigator.languages && navigator.languages[0]) || 'fr').toLowerCase();
    return raw.startsWith('fr') ? 'fr' : 'en';
  } catch {
    return 'fr';
  }
};

const sanitize = (value: unknown, fallback: Language): Language => {
  if (value === 'fr' || value === 'en') return value;
  return fallback;
};

const readInitial = (): Language => {
  const fallback = detectBrowserDefault();
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    // Deux formats acceptés : soit la valeur brute ("fr" / "en"), soit un
    // JSON stringifié ('"fr"'). useFirestoreSync stringify → on gère les 2.
    if (raw === 'fr' || raw === 'en') return raw;
    try {
      const parsed = JSON.parse(raw);
      return sanitize(parsed, fallback);
    } catch {
      return fallback;
    }
  } catch {
    return fallback;
  }
};

export function useLanguagePref(): [Language, (next: Language) => void] {
  const [language, setLanguageState] = useState<Language>(readInitial);

  // Sync Firestore : quand le cloud a une valeur plus récente, on l'applique.
  const { saveToFirestore } = useFirestoreSync(STORAGE_KEY, (data) => {
    const next = sanitize(data, language);
    setLanguageState((prev) => (prev === next ? prev : next));
  });

  // Persiste à chaque changement (localStorage + cloud)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(language));
    } catch {
      /* quota */
    }
    saveToFirestore(language);
  }, [language, saveToFirestore]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState((prev) => (prev === next ? prev : sanitize(next, prev)));
  }, []);

  return [language, setLanguage];
}
