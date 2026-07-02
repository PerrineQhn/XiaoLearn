/**
 * useDevMode — toggle interface DEV / PROD (admin NoComment uniquement).
 *
 * Permet à l'admin de basculer instantanément entre :
 *  - mode PROD : expérience utilisateur réelle (abonnement, gates 80%, etc.)
 *  - mode DEV  : bypass complet de tous les verrouillages (simule un compte
 *    premium + progression complète). Utile pour tester des leçons en cours
 *    d'édition sans avoir à compléter manuellement les leçons précédentes.
 *
 * Le hook est gated par email : seul `DEV_MODE_ALLOWED_EMAILS` peut activer
 * le mode. Pour tout autre compte, `isAvailable = false` et le state est
 * forcé à off (et nettoyé du localStorage si un résidu existait).
 *
 * Persistance : localStorage uniquement (clé `cl_dev_mode`). Volontairement
 * PAS synchronisé Firestore — chaque device a son propre mode, ce qui permet
 * de rester en PROD sur mobile quand tu fais une démo tout en ayant DEV
 * activé sur ton Mac.
 *
 * Side-effect : ajoute/retire la classe `dev-mode-active` sur `document.body`
 * pour l'indicateur visuel global (bordure violette autour de l'app).
 */
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const DEV_MODE_STORAGE_KEY = 'cl_dev_mode';
const DEV_MODE_BODY_CLASS = 'dev-mode-active';

/** Emails autorisés à voir et basculer le toggle DEV. Extension manuelle si besoin. */
const DEV_MODE_ALLOWED_EMAILS = ['p.quenn27@gmail.com', 'starxiwang@gmail.com'];

export interface DevModeState {
  /** Le compte courant peut-il voir/utiliser le toggle DEV ? */
  isAvailable: boolean;
  /** Le mode DEV est-il activé à l'instant T ? (false si `!isAvailable`) */
  isActive: boolean;
  /** Inverse l'état. No-op si `!isAvailable`. */
  toggle: () => void;
  /** Force une valeur. No-op si `!isAvailable`. */
  setActive: (next: boolean) => void;
}

const normalizeEmail = (value: string | null | undefined): string =>
  (value ?? '').trim().toLowerCase();

const readInitialState = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(DEV_MODE_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

export const useDevMode = (): DevModeState => {
  const { user } = useAuth();
  const email = normalizeEmail(user?.email);
  const isAvailable = DEV_MODE_ALLOWED_EMAILS.map(normalizeEmail).includes(email);

  const [rawActive, setRawActive] = useState<boolean>(readInitialState);

  // Éteint DEV et nettoie le localStorage si le compte ne l'autorise plus
  // (ex: déconnexion, changement de user).
  useEffect(() => {
    if (isAvailable) return;
    if (rawActive) setRawActive(false);
    try {
      window.localStorage.removeItem(DEV_MODE_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, [isAvailable, rawActive]);

  // Persiste chaque changement sur localStorage.
  useEffect(() => {
    try {
      if (rawActive && isAvailable) {
        window.localStorage.setItem(DEV_MODE_STORAGE_KEY, '1');
      } else {
        window.localStorage.removeItem(DEV_MODE_STORAGE_KEY);
      }
    } catch {
      /* ignore */
    }
  }, [rawActive, isAvailable]);

  // Indicateur visuel global via class sur <body>.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    const shouldMark = rawActive && isAvailable;
    if (shouldMark) body.classList.add(DEV_MODE_BODY_CLASS);
    else body.classList.remove(DEV_MODE_BODY_CLASS);
    return () => {
      body.classList.remove(DEV_MODE_BODY_CLASS);
    };
  }, [rawActive, isAvailable]);

  const toggle = useCallback(() => {
    if (!isAvailable) return;
    setRawActive((v) => !v);
  }, [isAvailable]);

  const setActive = useCallback(
    (next: boolean) => {
      if (!isAvailable) return;
      setRawActive(next);
    },
    [isAvailable]
  );

  return {
    isAvailable,
    isActive: isAvailable && rawActive,
    toggle,
    setActive
  };
};

export default useDevMode;
