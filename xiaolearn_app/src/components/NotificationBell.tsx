/**
 * NotificationBell — cloche flottante + panneau dropdown
 * -------------------------------------------------------
 * Pattern repris de Seonsaengnim : bouton cloche avec badge compteur
 * (non-lus), dropdown liste chaque notification avec avatar coloré,
 * titre, description, timestamp relatif, indicateur non-lu et bouton
 * de suppression individuelle.
 *
 * Palette XiaoLearn : rouge #c6302c pour le badge, teintes pastel pour
 * les avatars selon la nature de la notif.
 */

import '../styles/notifications.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNotifications } from '../contexts/NotificationsContext';
import type { NotificationItem, NotificationKind } from '../types/notifications';

interface Props {
  language?: 'fr' | 'en';
  /** Appelé quand l'utilisateur clique sur une notif avec un lien vue. */
  onNavigate?: (view: string) => void;
}

const COPY = {
  fr: {
    bellAria: 'Notifications',
    title: 'Notifications',
    markAll: 'Tout lire',
    clearAll: 'Effacer tout',
    empty: 'Aucune notification pour le moment.',
    emptyHint: "Termine une leçon ou une bataille pour en voir apparaître !",
    delete: 'Supprimer',
    minutesAgo: (n: number) => `Il y a ${n} min`,
    hoursAgo: (n: number) => `Il y a ${n}h`,
    daysAgo: (n: number) => `Il y a ${n}j`,
    justNow: "À l'instant"
  },
  en: {
    bellAria: 'Notifications',
    title: 'Notifications',
    markAll: 'Mark all read',
    clearAll: 'Clear all',
    empty: 'No notifications yet.',
    emptyHint: 'Complete a lesson or battle to see them appear!',
    delete: 'Delete',
    minutesAgo: (n: number) => `${n} min ago`,
    hoursAgo: (n: number) => `${n}h ago`,
    daysAgo: (n: number) => `${n}d ago`,
    justNow: 'Just now'
  }
} as const;

// Teintes pastel par kind — pour l'avatar circulaire en face de chaque notif.
const KIND_STYLES: Record<
  NotificationKind,
  { bg: string; fg: string }
> = {
  xp:     { bg: '#fbe9c7', fg: '#8a5a12' },
  lesson: { bg: '#ddeaff', fg: '#2f5da8' },
  rank:   { bg: '#f8d7d6', fg: '#c6302c' },
  battle: { bg: '#ffd8b0', fg: '#b85410' },
  streak: { bg: '#ffd5d1', fg: '#c6302c' },
  srs:    { bg: '#cfe9dc', fg: '#1f6a4b' },
  info:   { bg: '#e6e6e6', fg: '#555' }
};

const formatRelative = (
  then: number,
  language: 'fr' | 'en'
): string => {
  const copy = COPY[language];
  const diff = Math.max(0, Date.now() - then);
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return copy.justNow;
  if (minutes < 60) return copy.minutesAgo(minutes);
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return copy.hoursAgo(hours);
  const days = Math.floor(hours / 24);
  return copy.daysAgo(days);
};

const NotificationBell = (props: Props) => {
  const { language = 'fr', onNavigate } = props;
  const copy = COPY[language];
  const { items, unreadCount, markRead, markAllRead, remove, clearAll } =
    useNotifications();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Refresh relative timestamps toutes les 30s quand le panneau est ouvert.
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!open) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 30_000);
    return () => window.clearInterval(id);
  }, [open]);

  // Fermer au clic en dehors / à Escape.
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  const handleItemClick = useCallback(
    (item: NotificationItem) => {
      if (!item.readAt) markRead(item.id);
      if (item.link?.kind === 'view' && onNavigate) {
        onNavigate(item.link.view);
        setOpen(false);
      } else if (item.link?.kind === 'external') {
        window.open(item.link.url, '_blank', 'noopener,noreferrer');
      }
    },
    [markRead, onNavigate]
  );

  return (
    <div className="xl-notif-root" ref={rootRef}>
      <button
        type="button"
        className="xl-notif-bell"
        aria-label={copy.bellAria}
        onClick={() => setOpen((v) => !v)}
      >
        <svg
          className="xl-notif-bell-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="xl-notif-badge" aria-label={`${unreadCount}`}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="xl-notif-panel" role="dialog" aria-label={copy.title}>
          <header className="xl-notif-panel-header">
            <div className="xl-notif-panel-title">{copy.title}</div>
            <div className="xl-notif-panel-actions">
              {items.length > 0 && unreadCount > 0 && (
                <button
                  type="button"
                  className="xl-notif-mark-all"
                  onClick={() => markAllRead()}
                  title={copy.markAll}
                  aria-label={copy.markAll}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M2 12l5 5L20 4" />
                    <path d="M8 12l5 5L22 7" />
                  </svg>
                  <span className="xl-notif-action-label">{copy.markAll}</span>
                </button>
              )}
              {items.length > 0 && (
                <button
                  type="button"
                  className="xl-notif-clear-all"
                  onClick={() => clearAll()}
                  title={copy.clearAll}
                  aria-label={copy.clearAll}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M3 6h18" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  </svg>
                  <span className="xl-notif-action-label">{copy.clearAll}</span>
                </button>
              )}
              {unreadCount > 0 && (
                <span className="xl-notif-count-pill">{unreadCount}</span>
              )}
            </div>
          </header>

          <div className="xl-notif-list">
            {items.length === 0 && (
              <div className="xl-notif-empty">
                <div className="xl-notif-empty-icon" aria-hidden>🔔</div>
                <div className="xl-notif-empty-title">{copy.empty}</div>
                <div className="xl-notif-empty-hint">{copy.emptyHint}</div>
              </div>
            )}
            {items.map((item) => {
              const style = KIND_STYLES[item.kind] ?? KIND_STYLES.info;
              const unread = !item.readAt;
              return (
                <div
                  key={item.id}
                  className={`xl-notif-item ${unread ? 'is-unread' : ''}`}
                >
                  <button
                    type="button"
                    className="xl-notif-item-btn"
                    onClick={() => handleItemClick(item)}
                  >
                    <span
                      className="xl-notif-avatar"
                      style={{ background: style.bg, color: style.fg }}
                      aria-hidden
                    >
                      {item.icon}
                    </span>
                    <span className="xl-notif-content">
                      <span className="xl-notif-title">{item.title}</span>
                      <span className="xl-notif-body">{item.body}</span>
                      <span className="xl-notif-time">
                        {formatRelative(item.createdAt, language)}
                      </span>
                    </span>
                  </button>
                  <span
                    className={`xl-notif-dot ${unread ? 'is-unread' : ''}`}
                    aria-hidden
                  />
                  <button
                    type="button"
                    className="xl-notif-delete"
                    aria-label={copy.delete}
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(item.id);
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M3 6h18" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
