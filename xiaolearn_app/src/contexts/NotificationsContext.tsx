/**
 * NotificationsContext — centre de notifications persistant (task #63)
 * ---------------------------------------------------------------------
 * Stocke une liste d'objets `NotificationItem` + expose les actions
 * `push / markRead / markAllRead / remove / clearAll`.
 *
 * Persistance :
 *   - Source primaire : localStorage (pas de latence, pas de quota).
 *   - Sync Firestore optionnelle : `users/{uid}.notifications` (merge). En
 *     cas d'indisponibilité (quota, offline), on continue en local sans
 *     bloquer l'UX.
 *
 * Dédup : si une notif avec la même `dedupKey` est push()ée dans les 60 s,
 * on ne ré-ajoute pas — évite les doublons (ex: awardXp appelée plusieurs
 * fois pour la même leçon). La `dedupKey` est construite côté caller.
 *
 * Limite : max `NOTIFICATIONS_MAX` items (les plus anciens sont trimmés).
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import {
  NOTIFICATIONS_MAX,
  NOTIFICATIONS_STORAGE_KEY,
  type NotificationItem,
  type NotificationKind,
  type NotificationLink
} from '../types/notifications';

// ---------------------------------------------------------------------------
//  Helpers de persistance locale
// ---------------------------------------------------------------------------

const readLocal = (): NotificationItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.filter(isValidNotification);
  } catch {
    return [];
  }
};

const writeLocal = (items: NotificationItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      NOTIFICATIONS_STORAGE_KEY,
      JSON.stringify(items)
    );
  } catch {
    /* quota plein → silent */
  }
};

const isValidNotification = (v: any): v is NotificationItem =>
  v &&
  typeof v.id === 'string' &&
  typeof v.kind === 'string' &&
  typeof v.title === 'string' &&
  typeof v.createdAt === 'number';

// ---------------------------------------------------------------------------
// Tombstones : ids des notifications supprimees localement, persistes pour
// empecher Firestore de les re-injecter quand le snapshot cloud arrive
// (race condition entre debounce d'ecriture cloud et onSnapshot).
// Cap : derniers TOMBSTONE_MAX ids, pour eviter une croissance infinie.
// ---------------------------------------------------------------------------
const TOMBSTONE_KEY = 'xl_notif_tombstones_v1';
const TOMBSTONE_MAX = 500;

const readTombstones = (): Set<string> => {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(TOMBSTONE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x) => typeof x === 'string'));
  } catch {
    return new Set();
  }
};

const writeTombstones = (set: Set<string>): void => {
  if (typeof window === 'undefined') return;
  try {
    // On garde au plus TOMBSTONE_MAX entries (les plus recemment ajoutees,
    // i.e. la fin du tableau apres avoir conserve l'ordre d'insertion).
    const arr = Array.from(set).slice(-TOMBSTONE_MAX);
    window.localStorage.setItem(TOMBSTONE_KEY, JSON.stringify(arr));
  } catch {
    /* quota plein → silent */
  }
};

const generateId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

// ---------------------------------------------------------------------------
//  Contexte
// ---------------------------------------------------------------------------

export interface PushPayload {
  kind: NotificationKind;
  icon: string;
  title: string;
  body: string;
  link?: NotificationLink;
  /** Clef anti-doublon : si la même key a été push dans les 60s, on ignore. */
  dedupKey?: string;
}

export interface NotificationsApi {
  items: NotificationItem[];
  unreadCount: number;
  /** Dernière notif push()ée (utile pour déclencher un toast transient). */
  lastPushed: NotificationItem | null;
  push: (payload: PushPayload) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  remove: (id: string) => void;
  clearAll: () => void;
}

const NotificationsContext = createContext<NotificationsApi | null>(null);

export const useNotifications = (): NotificationsApi => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error(
      'useNotifications must be used within <NotificationsProvider>'
    );
  }
  return ctx;
};

// ---------------------------------------------------------------------------
//  Provider
// ---------------------------------------------------------------------------

interface ProviderProps {
  children: ReactNode;
}

export const NotificationsProvider = ({ children }: ProviderProps) => {
  const { user } = useAuth();
  const [items, setItems] = useState<NotificationItem[]>(() => readLocal());
  const [lastPushed, setLastPushed] = useState<NotificationItem | null>(null);

  // Dédup : map dedupKey → timestamp de la dernière push.
  const dedupRef = useRef<Map<string, number>>(new Map());

  // Tombstones : ids supprimés localement. Empêche la re-injection cloud
  // lors du prochain onSnapshot. Source de vérité : localStorage.
  const tombstonesRef = useRef<Set<string>>(readTombstones());

  // --- Persist localStorage à chaque changement --------------------------
  useEffect(() => {
    writeLocal(items);
  }, [items]);

  // --- Sync Firestore (optionnelle, best-effort) -------------------------
  // Au login : on lit les notifs cloud ET on écrit les locales, on merge par id.
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    let unsubbed = false;

    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (unsubbed || !snap.exists()) return;
        const data = snap.data();
        const cloud: NotificationItem[] = Array.isArray(data?.notifications)
          ? data.notifications.filter(isValidNotification)
          : [];
        if (cloud.length === 0) return;
        // Filtrage tombstones : on ignore les ids supprimés localement, sinon
        // ils seraient re-injectés par chaque onSnapshot (race condition vs
        // l'écriture cloud debounced).
        const tombs = tombstonesRef.current;
        const cloudFiltered = cloud.filter((it) => !tombs.has(it.id));
        // Merge : garder le plus récent par id (readAt priorise cloud si défini).
        setItems((local) => {
          const byId = new Map<string, NotificationItem>();
          for (const it of local) byId.set(it.id, it);
          for (const it of cloudFiltered) {
            const existing = byId.get(it.id);
            if (!existing) byId.set(it.id, it);
            else {
              byId.set(it.id, {
                ...existing,
                readAt: it.readAt ?? existing.readAt
              });
            }
          }
          return Array.from(byId.values())
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, NOTIFICATIONS_MAX);
        });
      },
      () => {
        /* network / quota error → silent */
      }
    );

    return () => {
      unsubbed = true;
      unsub();
    };
  }, [user]);

  // Write cloud (debounced) à chaque changement de items — best-effort.
  const cloudWriteTimer = useRef<number | null>(null);
  useEffect(() => {
    if (!user) return;
    if (cloudWriteTimer.current !== null) {
      window.clearTimeout(cloudWriteTimer.current);
    }
    cloudWriteTimer.current = window.setTimeout(() => {
      cloudWriteTimer.current = null;
      const ref = doc(db, 'users', user.uid);
      setDoc(ref, { notifications: items }, { merge: true }).catch(() => {
        /* quota / offline → keep local */
      });
    }, 1_500);
    return () => {
      if (cloudWriteTimer.current !== null) {
        window.clearTimeout(cloudWriteTimer.current);
        cloudWriteTimer.current = null;
      }
    };
  }, [user, items]);

  // --- Actions -----------------------------------------------------------

  const push = useCallback((payload: PushPayload) => {
    const now = Date.now();
    // Dédup : si dedupKey existe et a été vu dans les 60s, on ignore.
    if (payload.dedupKey) {
      const last = dedupRef.current.get(payload.dedupKey);
      if (last && now - last < 60_000) return;
      dedupRef.current.set(payload.dedupKey, now);
    }

    const item: NotificationItem = {
      id: generateId(),
      kind: payload.kind,
      icon: payload.icon,
      title: payload.title,
      body: payload.body,
      createdAt: now,
      readAt: null,
      link: payload.link
    };

    setItems((prev) => {
      const next = [item, ...prev].slice(0, NOTIFICATIONS_MAX);
      return next;
    });
    setLastPushed(item);
  }, []);

  const markRead = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, readAt: Date.now() } : it))
    );
  }, []);

  const markAllRead = useCallback(() => {
    const now = Date.now();
    setItems((prev) =>
      prev.map((it) => (it.readAt ? it : { ...it, readAt: now }))
    );
  }, []);

  const remove = useCallback((id: string) => {
    tombstonesRef.current.add(id);
    writeTombstones(tombstonesRef.current);
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setItems((prev) => {
      // Tombstone toutes les notifs courantes pour empêcher leur réinjection
      // par le prochain onSnapshot Firestore.
      for (const it of prev) tombstonesRef.current.add(it.id);
      writeTombstones(tombstonesRef.current);
      return [];
    });
  }, []);

  const unreadCount = useMemo(
    () => items.reduce((acc, it) => acc + (it.readAt ? 0 : 1), 0),
    [items]
  );

  const api = useMemo<NotificationsApi>(
    () => ({
      items,
      unreadCount,
      lastPushed,
      push,
      markRead,
      markAllRead,
      remove,
      clearAll
    }),
    [items, unreadCount, lastPushed, push, markRead, markAllRead, remove, clearAll]
  );

  return (
    <NotificationsContext.Provider value={api}>
      {children}
    </NotificationsContext.Provider>
  );
};
