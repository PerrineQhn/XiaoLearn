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

  // ============================================================
  // 1) Réconciliation initiale : last-write-wins par timestamp
  // ============================================================
  useEffect(() => {
    if (!user || !enabled) return;
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
          if (onUpdate) {
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
            try { onUpdate(JSON.parse(cloudValue)); } catch { onUpdate(cloudValue); }
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
      }
    })();

    return () => { cancelled = true; };
  }, [user, key, enabled, onUpdate]);

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
        if (onUpdate) {
          try { onUpdate(JSON.parse(value)); } catch { onUpdate(value); }
        } else {
          window.localStorage.setItem(key, value);
          if (cloudTsIso) writeLocalTs(key, cloudTsIso);
        }
      },
      (err) => console.warn('[useFirestoreSync] onSnapshot error', key, err)
    );

    return () => unsubscribe();
  }, [user, key, onUpdate, enabled]);

  // ============================================================
  // 3) saveToFirestore — appelé par les hooks consumers
  // ============================================================
  const saveToFirestore = useCallback(
    async (data: unknown) => {
      const stringData = typeof data === 'string' ? data : JSON.stringify(data);
      const nowIso = new Date().toISOString();

      // Toujours sauver localement, même si pas connecté
      try {
        window.localStorage.setItem(key, stringData);
        writeLocalTs(key, nowIso);
      } catch { /* quota */ }

      if (!user || !enabled) return;

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
