/**
 * useFirestoreSync — synchronisation localStorage ↔ Firestore
 * -----------------------------------------------------------
 * Stratégie last-write-wins basée sur des timestamps PAR CLÉ stockés sous
 * `users/{uid}.<key>__updatedAt`. Évite qu'un appareil offline depuis 3
 * jours n'écrase la progression faite entre-temps sur un autre device.
 *
 * Au montage :
 *   1. on récupère les valeurs (local, cloud) + leurs timestamps respectifs
 *   2. on garde la plus récente, on push l'autre dans la direction opposée
 *
 * En écriture (`saveToFirestore`) :
 *   - on met à jour localStorage immédiatement (UI réactive)
 *   - on push vers Firestore avec un nouveau timestamp ISO
 *
 * En lecture temps réel (`onSnapshot`) :
 *   - on ignore les updates dont le timestamp cloud ≤ timestamp local connu
 *     (évite les boucles re-render quand on est l'auteur du write)
 *
 * Stockage localStorage :
 *   - `<key>`         : valeur sérialisée (string)
 *   - `<key>__ts`     : timestamp ISO de la dernière modif locale connue
 */

import { useCallback, useEffect, useRef } from 'react';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

const LOCAL_TS_SUFFIX = '__ts';
const CLOUD_TS_FIELD_SUFFIX = '__updatedAt';

const readLocalTs = (key: string): number => {
  if (typeof window === 'undefined') return 0;
  const raw = window.localStorage.getItem(key + LOCAL_TS_SUFFIX);
  if (!raw) return 0;
  const t = Date.parse(raw);
  return Number.isFinite(t) ? t : 0;
};

const writeLocalTs = (key: string, iso: string) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key + LOCAL_TS_SUFFIX, iso);
  } catch { /* quota */ }
};

/**
 * V15 — Pending queue pour les writes qui foirent (réseau instable, app
 * fermée avant que le setDoc ait fini). Persisté en localStorage, partagé
 * entre tous les hooks useFirestoreSync.
 *
 * Pattern : chaque write qui throw est enregistré dans la queue. La queue
 * est flushée au mount du hook (quand l'auth est prête) et à chaque
 * visibilitychange (quand l'utilisateur revient sur l'app après une mise en
 * background). Comme ça, si l'iPhone perd la connexion ou s'éteint juste
 * après la complétion d'une leçon, la save sera retentée au prochain réveil.
 */
const PENDING_KEY = 'xl_sync_pending_v1';
const MAX_RETRY_ATTEMPTS = 5;

interface PendingWrite {
  key: string;
  data: string;
  ts: string;
  attempts: number;
}

const readPending = (): PendingWrite[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(PENDING_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writePending = (items: PendingWrite[]) => {
  if (typeof window === 'undefined') return;
  try {
    if (items.length === 0) {
      window.localStorage.removeItem(PENDING_KEY);
    } else {
      window.localStorage.setItem(PENDING_KEY, JSON.stringify(items));
    }
  } catch { /* quota */ }
};

/** Ajoute ou remplace une write dans la queue (dédup par key). */
const enqueuePending = (item: PendingWrite) => {
  const list = readPending().filter((p) => p.key !== item.key);
  list.push(item);
  writePending(list);
};

/** Retire un write de la queue (clé exacte + data identique pour éviter de
 *  retirer un write plus récent enqueued entre-temps). */
const removeFromPending = (key: string, data: string) => {
  const list = readPending().filter((p) => !(p.key === key && p.data === data));
  writePending(list);
};

/**
 * Tente de flusher TOUTE la queue pending pour l'utilisateur courant.
 * Backoff exponentiel : 2^attempts × 800 ms entre les tentatives.
 * Au-delà de MAX_RETRY_ATTEMPTS, l'item est laissé en queue (sans nouvelle
 * tentative dans ce flush) pour éviter une boucle d'erreurs.
 */
let isFlushingPending = false;
const flushPending = async (uid: string): Promise<void> => {
  if (isFlushingPending) return;
  isFlushingPending = true;
  try {
    const list = readPending();
    if (list.length === 0) return;
    console.info('[xl-sync] flush pending writes', list.length);
    for (const item of list) {
      if (item.attempts >= MAX_RETRY_ATTEMPTS) continue;
      try {
        await setDoc(
          doc(db, 'users', uid),
          {
            [item.key]: item.data,
            [item.key + CLOUD_TS_FIELD_SUFFIX]: item.ts,
            lastUpdated: item.ts
          },
          { merge: true }
        );
        removeFromPending(item.key, item.data);
        console.info('[xl-sync] flushed pending', item.key);
      } catch (err) {
        item.attempts++;
        enqueuePending(item);
        console.warn('[xl-sync] flush retry', item.key, 'attempt', item.attempts, err);
        // Backoff avant la suivante
        await new Promise((r) => setTimeout(r, Math.min(8000, 800 * Math.pow(2, item.attempts))));
      }
    }
  } finally {
    isFlushingPending = false;
  }
};

export function useFirestoreSync(
  key: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate?: (data: any) => void,
  options?: { enabled?: boolean }
) {
  const { user } = useAuth();
  const enabled = options?.enabled ?? true;

  // V14 — saveToFirestore est returné avec une référence STABLE (useCallback
  // sans deps). Sinon, chaque fois que user/enabled change, sa ref change,
  // ce qui refire les useEffect des consumers (deps [state, saveToFirestore])
  // → push d'état (potentiellement défauts initiaux) à Firestore à chaque
  // changement d'auth → écrasement du cloud.
  //
  // Avec saveToFirestore stable, les useEffect des consumers ne refirent
  // QUE quand le state change (= vraie action utilisateur), ce qui rend
  // les saves naturellement event-driven et alignés avec les modifications.
  const userRef = useRef(user);
  const enabledRef = useRef(enabled);
  const keyRef = useRef(key);
  useEffect(() => {
    userRef.current = user;
    enabledRef.current = enabled;
    keyRef.current = key;
  });

  // Garde la dernière valeur que nous avons écrite nous-mêmes, pour ignorer
  // l'écho d'onSnapshot qui ré-applique ce qu'on vient de pousser.
  const lastWrittenValueRef = useRef<string | null>(null);
  // V11 — onUpdate est typiquement passé en inline arrow function par les
  // consumers, donc il change de référence à chaque render. Sans cette ref,
  // les useEffect ci-dessous re-firaient à chaque render → cleanup → cancel
  // du getDoc en cours avant qu'il puisse appeler onUpdate. Conséquence :
  // sync silencieusement cassée sur réseaux lents. Voir bug "perte de
  // progression cross-device V11".
  const onUpdateRef = useRef(onUpdate);
  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  // V12 — Gate de réconciliation : tant que le reconcile initial n'a pas
  // résolu, on BLOQUE les writes Firestore des consumers pour éviter
  // d'écraser le cloud avec des valeurs locales par défaut (typique du
  // pattern "useState(readLocalStorage()) → useEffect saveToFirestore"
  // qui fire au mount avant que le reconcile ait fini de fetch).
  //
  // Au login d'un nouvel appareil (purge localStorage, state initial =
  // defaults), ce gating empêche le push DEFAULT → cloud qui écrasait
  // la vraie progression du compte. Le reconcile arrive en premier,
  // applique cloud data via onUpdate → setState consumer → save légitime.
  const reconciledRef = useRef(false);
  // Promise mémorisée du reconcile en cours. saveToFirestore await dessus.
  const reconcilePromiseRef = useRef<Promise<void> | null>(null);
  // Resolver pour signaler que le reconcile a fini (par succès, échec ou
  // condition « pas d'utilisateur » → aucun reconcile attendu).
  const reconcileResolveRef = useRef<(() => void) | null>(null);

  // Crée la promesse de réconciliation à la 1re initialisation du hook.
  if (reconcilePromiseRef.current === null) {
    reconcilePromiseRef.current = new Promise<void>((resolve) => {
      reconcileResolveRef.current = resolve;
    });
  }

  // ============================================================
  // 1) Réconciliation initiale : last-write-wins par timestamp
  // ============================================================
  useEffect(() => {
    // Si pas d'utilisateur ou sync désactivé, on considère le reconcile
    // "résolu" (rien à attendre) pour ne pas bloquer indéfiniment les saves.
    if (!user || !enabled) {
      if (!reconciledRef.current) {
        reconciledRef.current = true;
        reconcileResolveRef.current?.();
      }
      return;
    }
    // V13 — On a un user maintenant. RESET le gating reconcile pour ne PAS
    // shortcuter ce nouveau cycle. Cas typique : au mount, user=null →
    // reconciledRef passe à true (early return). Puis user devient A →
    // un NOUVEAU reconcile doit pouvoir gater les saves consumers, sinon
    // ils pushent les DEFAULTS de mount vers Firestore avant que le
    // reconcile ait lu le cloud → écrasement de la progression.
    reconciledRef.current = false;
    reconcilePromiseRef.current = new Promise<void>((resolve) => {
      reconcileResolveRef.current = resolve;
    });
    let cancelled = false;

    (async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const snap = await getDoc(userDocRef);
        const cloudData = snap.exists() ? snap.data() : null;
        const cloudValue: string | undefined = cloudData?.[key];
        const cloudTsIso: string | undefined = cloudData?.[key + CLOUD_TS_FIELD_SUFFIX] ?? cloudData?.lastUpdated;
        const cloudTs = cloudTsIso ? Date.parse(cloudTsIso) : 0;

        const localValue = window.localStorage.getItem(key);
        const localTs = readLocalTs(key);

        // Diag visible dans la console JS — filtre sur "[xl-sync]"
        console.info(
          `[xl-sync] reconcile key="${key}" uid="${user.uid}"`,
          {
            cloudExists: snap.exists(),
            cloudHasKey: !!cloudValue,
            cloudTs: cloudTsIso ?? null,
            localHasKey: !!localValue,
            localTs: localTs ? new Date(localTs).toISOString() : null
          }
        );

        if (cancelled) return;

        // Cas 1 : rien côté cloud → on push local (si local existe)
        if (!cloudValue) {
          if (localValue) {
            const nowIso = new Date().toISOString();
            await setDoc(
              userDocRef,
              { [key]: localValue, [key + CLOUD_TS_FIELD_SUFFIX]: nowIso, lastUpdated: nowIso },
              { merge: true }
            );
            writeLocalTs(key, nowIso);
            lastWrittenValueRef.current = localValue;
          }
          return;
        }

        // Cas 2 : cloud plus récent que local → on délègue à onUpdate
        if (cloudTs > localTs || !localValue) {
          lastWrittenValueRef.current = cloudValue;
          if (onUpdateRef.current) {
            // L'app décide via onUpdate ce qu'elle fait du payload cloud
            // (souvent : merge UNION pour ne PAS perdre d'IDs locaux qui
            // ne seraient pas encore arrivés au cloud). Le state→useEffect
            // côté consumer re-persistera la valeur finale dans localStorage
            // ET appellera saveToFirestore pour resync cloud + timestamp.
            //
            // ⚠️ NE PAS pré-écrire window.localStorage[key] ici : si l'union
            // produit prev (cloud était subset de local), setState renvoie
            // prev, le useEffect ne refire pas, et localStorage resterait
            // appauvri. C'était la cause du bug "progression remise à 0
            // après push" (cf. issue mai 2026).
            try { onUpdateRef.current(JSON.parse(cloudValue)); } catch { onUpdateRef.current(cloudValue); }
          } else {
            // Pas d'onUpdate : localStorage EST le sink unique, on écrit
            // directement.
            window.localStorage.setItem(key, cloudValue);
            if (cloudTsIso) writeLocalTs(key, cloudTsIso);
          }
          return;
        }

        // Cas 3 : local strictement plus récent que cloud → on push local
        if (localTs > cloudTs) {
          const nowIso = new Date(localTs).toISOString();
          await setDoc(
            userDocRef,
            { [key]: localValue, [key + CLOUD_TS_FIELD_SUFFIX]: nowIso, lastUpdated: nowIso },
            { merge: true }
          );
          lastWrittenValueRef.current = localValue;
          return;
        }

        // Cas 4 : timestamps égaux → rien à faire
        lastWrittenValueRef.current = cloudValue;
      } catch (err) {
        console.error('[useFirestoreSync] reconcile error', key, err);
      } finally {
        // Quoi qu'il arrive (succès, échec, cancel), on libère le gating
        // pour que les saves en attente puissent se faire. Sinon le hook
        // bloquerait indéfiniment sur une erreur Firestore réseau.
        if (!reconciledRef.current) {
          reconciledRef.current = true;
          reconcileResolveRef.current?.();
        }
      }
    })();

    return () => { cancelled = true; };
  }, [user, key, enabled]);

  // ============================================================
  // 2) Écoute temps réel — ignore les échos de nos propres writes
  // ============================================================
  useEffect(() => {
    if (!user || !enabled) return;
    const userDocRef = doc(db, 'users', user.uid);

    const unsubscribe = onSnapshot(
      userDocRef,
      (snap) => {
        if (!snap.exists()) return;
        const data = snap.data();
        const value: string | undefined = data?.[key];
        if (!value) return;
        // Ignore l'écho de notre dernier write
        if (lastWrittenValueRef.current === value) return;
        // Filtre par timestamp si dispo
        const cloudTsIso: string | undefined = data?.[key + CLOUD_TS_FIELD_SUFFIX] ?? data?.lastUpdated;
        const localTs = readLocalTs(key);
        const cloudTs = cloudTsIso ? Date.parse(cloudTsIso) : 0;
        if (cloudTs && cloudTs <= localTs) return;

        // Applique le changement (cf. note même cas dans la réconciliation)
        lastWrittenValueRef.current = value;
        if (onUpdateRef.current) {
          try { onUpdateRef.current(JSON.parse(value)); } catch { onUpdateRef.current(value); }
        } else {
          window.localStorage.setItem(key, value);
          if (cloudTsIso) writeLocalTs(key, cloudTsIso);
        }
      },
      (err) => console.warn('[useFirestoreSync] onSnapshot error', key, err)
    );

    return () => unsubscribe();
    // ⚠ NE PAS ajouter `onUpdate` aux deps : on utilise déjà onUpdateRef
    // (mise à jour via un useEffect dédié plus haut). Sinon, comme les
    // consumers passent une inline arrow function, ça change de référence
    // à chaque render → tear-down + re-subscribe à chaque render → risque
    // de manquer un snapshot pendant la fenêtre cleanup→re-subscribe.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, key, enabled]);

  // ============================================================
  // 3) saveToFirestore — appelé par les hooks consumers
  // ============================================================
  // V14 — saveToFirestore: référence STABLE (deps vides). Lit user/enabled/key
  // depuis les refs synchronisées chaque render. Conséquence : les useEffect
  // des consumers (qui ont saveToFirestore dans leurs deps) NE refirent PAS
  // quand auth state change → plus de saves involontaires de défauts au
  // moment d'un login.
  const saveToFirestore = useCallback(
    async (data: unknown) => {
      const currentKey = keyRef.current;
      const currentUser = userRef.current;
      const currentEnabled = enabledRef.current;
      const stringData = typeof data === 'string' ? data : JSON.stringify(data);
      const nowIso = new Date().toISOString();

      // V12 — Avant reconcile, on écrit localStorage MAIS PAS le timestamp.
      try {
        window.localStorage.setItem(currentKey, stringData);
        if (reconciledRef.current) {
          writeLocalTs(currentKey, nowIso);
        }
      } catch { /* quota */ }

      if (!currentUser || !currentEnabled) return;

      // V12 — Gating reconcile : attend la résolution avant de push.
      if (!reconciledRef.current && reconcilePromiseRef.current) {
        try {
          await reconcilePromiseRef.current;
        } catch { /* ignore */ }
      }

      // V12 — Skip si une valeur plus fraîche a écrasé la nôtre pendant l'await.
      const currentLocal = window.localStorage.getItem(currentKey);
      if (currentLocal !== stringData) return;

      writeLocalTs(currentKey, nowIso);

      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        await setDoc(
          userDocRef,
          {
            [currentKey]: stringData,
            [currentKey + CLOUD_TS_FIELD_SUFFIX]: nowIso,
            lastUpdated: nowIso
          },
          { merge: true }
        );
        lastWrittenValueRef.current = stringData;
        // V15 — En cas de retry pending pour cette clé, on retire les
        // anciennes versions superseded par cet écrit réussi.
        removeFromPending(currentKey, stringData);
      } catch (err) {
        console.error('[useFirestoreSync] saveToFirestore error', currentKey, err);
        // V15 — En cas d'échec (réseau down, Firestore offline, app gelée),
        // on enqueue le write dans la pending queue. Il sera re-tenté au
        // prochain mount du hook ou au prochain visibilitychange.
        enqueuePending({
          key: currentKey,
          data: stringData,
          ts: nowIso,
          attempts: 1
        });
      }
    },
    [] // V14 — STABLE: pas de deps. Tout lu via refs.
  );

  // ============================================================
  // V15 — Flush la pending queue au mount + au visibilitychange
  // ============================================================
  useEffect(() => {
    if (!user || !enabled) return;
    // Flush au mount (avec petit délai pour ne pas concourrer avec le reconcile)
    const timer = setTimeout(() => {
      flushPending(user.uid).catch((err) => {
        console.warn('[useFirestoreSync] initial flush failed', err);
      });
    }, 1500);
    // Flush quand l'app revient en foreground (mobile : utilisateur passe d'une
    // autre app à XiaoLearn, ou réveil après veille)
    const onVisibility = () => {
      if (document.visibilityState === 'visible' && user) {
        flushPending(user.uid).catch(() => { /* silent */ });
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    // Flush quand on revient online (connexion réseau rétablie)
    const onOnline = () => {
      if (user) {
        flushPending(user.uid).catch(() => { /* silent */ });
      }
    };
    window.addEventListener('online', onOnline);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('online', onOnline);
    };
  }, [user, enabled]);

  return { saveToFirestore };
}
