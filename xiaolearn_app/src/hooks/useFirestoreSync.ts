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

export function useFirestoreSync(
  key: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate?: (data: any) => void,
  options?: { enabled?: boolean }
) {
  const { user } = useAuth();
  const enabled = options?.enabled ?? true;
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
  const saveToFirestore = useCallback(
    async (data: unknown) => {
      const stringData = typeof data === 'string' ? data : JSON.stringify(data);
      const nowIso = new Date().toISOString();

      // V12 — Avant reconcile, on écrit localStorage MAIS PAS le timestamp.
      // Pourquoi : si on bumpe le timestamp local sur un save-on-mount
      // (qui pousse juste les défauts), le reconcile va voir localTs > cloudTs
      // et conclure que local est "plus frais" → push local → écrase cloud.
      //
      // En gardant l'ancien timestamp pré-reconcile, on laisse le reconcile
      // décider correctement (cloud probablement plus frais sur un mount
      // post-purge ou première utilisation device).
      try {
        window.localStorage.setItem(key, stringData);
        if (reconciledRef.current) {
          writeLocalTs(key, nowIso);
        }
      } catch { /* quota */ }

      if (!user || !enabled) return;

      // V12 — Gating reconcile : on attend que le reconcile initial ait
      // résolu avant de pousser vers Firestore. Sinon, lors d'un mount sur
      // appareil avec localStorage purgé/vide, les consumers appellent
      // saveToFirestore(DEFAULT_VALUES) AVANT que le reconcile ait pu lire
      // le cloud → on écrasait la vraie progression du compte.
      if (!reconciledRef.current && reconcilePromiseRef.current) {
        try {
          await reconcilePromiseRef.current;
        } catch { /* ignore — on tente le save de toute façon */ }
      }

      // V12 — Après l'await, ce save peut être STALE : pendant qu'on
      // attendait le reconcile, un onUpdate a peut-être appliqué le cloud
      // data au state du consumer, qui a re-call saveToFirestore avec la
      // vraie valeur. Si localStorage diffère de notre stringData, c'est
      // qu'un save plus récent l'a remplacé → on skip pour ne pas régresser.
      const currentLocal = window.localStorage.getItem(key);
      if (currentLocal !== stringData) return;

      // Maintenant on peut bumper le timestamp (différé depuis le début).
      writeLocalTs(key, nowIso);

      try {
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(
          userDocRef,
          {
            [key]: stringData,
            [key + CLOUD_TS_FIELD_SUFFIX]: nowIso,
            lastUpdated: nowIso
          },
          { merge: true }
        );
        lastWrittenValueRef.current = stringData;
      } catch (err) {
        console.error('[useFirestoreSync] saveToFirestore error', key, err);
      }
    },
    [user, key, enabled]
  );

  return { saveToFirestore };
}
