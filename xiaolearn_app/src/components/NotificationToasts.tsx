/**
 * NotificationToasts — bulles transientes qui flashent lors d'un push().
 * ----------------------------------------------------------------------
 * Placées en bas-droite, chaque notif récente apparaît sous forme de carte
 * éphémère (auto-dismiss au bout de 4s). L'utilisateur peut :
 *   - Cliquer sur la carte → même handler que dans le dropdown (markRead +
 *     navigate si link.view).
 *   - Cliquer sur la croix → dismiss uniquement le toast, la notif reste
 *     dans le centre de notifications.
 *
 * Source de vérité : `lastPushed` dans NotificationsContext. À chaque fois
 * que `lastPushed.id` change, on empile un nouveau toast. On affiche au max
 * les 3 derniers pour éviter de saturer l'écran.
 *
 * Design : réutilise la palette XiaoLearn des avatars pastel définie dans
 * NotificationBell.tsx (teinte par kind). Shadow + border-radius généreux.
 */

import '../styles/notification-toasts.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNotifications } from '../contexts/NotificationsContext';
import type { NotificationItem, NotificationKind } from '../types/notifications';

interface Props {
  language?: 'fr' | 'en';
  onNavigate?: (view: string) => void;
}

const TOAST_DURATION_MS = 4_000;
const MAX_VISIBLE = 3;

// Teintes pastel par kind — miroir de NotificationBell.KIND_STYLES.
const KIND_STYLES: Record<NotificationKind, { bg: string; fg: string }> = {
  xp:     { bg: '#fbe9c7', fg: '#8a5a12' },
  lesson: { bg: '#ddeaff', fg: '#2f5da8' },
  rank:   { bg: '#f8d7d6', fg: '#c6302c' },
  battle: { bg: '#ffd8b0', fg: '#b85410' },
  streak: { bg: '#ffd5d1', fg: '#c6302c' },
  srs:    { bg: '#cfe9dc', fg: '#1f6a4b' },
  info:   { bg: '#e6e6e6', fg: '#555' }
};

const COPY = {
  fr: { dismiss: 'Ignorer' },
  en: { dismiss: 'Dismiss' }
} as const;

interface LiveToast {
  item: NotificationItem;
  /** Clé interne pour mount/unmount — unique pour éviter key collision si
   *  le même id réapparait. */
  key: string;
}

const NotificationToasts = ({ language = 'fr', onNavigate }: Props) => {
  const { lastPushed, markRead } = useNotifications();
  const [toasts, setToasts] = useState<LiveToast[]>([]);
  const lastSeenIdRef = useRef<string | null>(null);
  const timersRef = useRef<Map<string, number>>(new Map());
  const copy = COPY[language];

  // Nouveau push → empile un toast.
  useEffect(() => {
    if (!lastPushed) return;
    if (lastSeenIdRef.current === lastPushed.id) return;
    lastSeenIdRef.current = lastPushed.id;
    const toast: LiveToast = {
      item: lastPushed,
      key: `${lastPushed.id}-${Date.now()}`
    };
    setToasts((prev) => [...prev, toast].slice(-MAX_VISIBLE));
  }, [lastPushed]);

  // Cleanup : timers d'auto-dismiss, remis à chaque fois que la liste change.
  useEffect(() => {
    // Sécurise : purge des timers dont la key n'est plus affichée.
    const currentKeys = new Set(toasts.map((t) => t.key));
    for (const [k, tid] of timersRef.current) {
      if (!currentKeys.has(k)) {
        window.clearTimeout(tid);
        timersRef.current.delete(k);
      }
    }
    // Crée un timer pour chaque toast visible sans timer actif.
    for (const t of toasts) {
      if (timersRef.current.has(t.key)) continue;
      const tid = window.setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.key !== t.key));
        timersRef.current.delete(t.key);
      }, TOAST_DURATION_MS);
      timersRef.current.set(t.key, tid);
    }
  }, [toasts]);

  // Cleanup au unmount
  useEffect(() => {
    return () => {
      for (const tid of timersRef.current.values()) {
        window.clearTimeout(tid);
      }
      timersRef.current.clear();
    };
  }, []);

  const dismiss = useCallback((key: string) => {
    setToasts((prev) => prev.filter((x) => x.key !== key));
  }, []);

  const handleClick = useCallback(
    (toast: LiveToast) => {
      if (!toast.item.readAt) markRead(toast.item.id);
      if (toast.item.link?.kind === 'view' && onNavigate) {
        onNavigate(toast.item.link.view);
      } else if (toast.item.link?.kind === 'external') {
        window.open(toast.item.link.url, '_blank', 'noopener,noreferrer');
      }
      dismiss(toast.key);
    },
    [markRead, onNavigate, dismiss]
  );

  const visible = useMemo(() => toasts.slice(-MAX_VISIBLE), [toasts]);

  if (visible.length === 0) return null;

  return (
    <div className="xl-toast-stack" role="region" aria-live="polite">
      {visible.map((toast) => {
        const style = KIND_STYLES[toast.item.kind] ?? KIND_STYLES.info;
        return (
          <div key={toast.key} className="xl-toast">
            <button
              type="button"
              className="xl-toast-body"
              onClick={() => handleClick(toast)}
            >
              <span
                className="xl-toast-avatar"
                style={{ background: style.bg, color: style.fg }}
                aria-hidden
              >
                {toast.item.icon}
              </span>
              <span className="xl-toast-content">
                <span className="xl-toast-title">{toast.item.title}</span>
                <span className="xl-toast-desc">{toast.item.body}</span>
              </span>
            </button>
            <button
              type="button"
              className="xl-toast-close"
              aria-label={copy.dismiss}
              onClick={() => dismiss(toast.key)}
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
            {/* Barre de progression du timer — animation CSS 4s. */}
            <span className="xl-toast-progress" aria-hidden />
          </div>
        );
      })}
    </div>
  );
};

export default NotificationToasts;
