import { useCallback, useEffect, useRef } from 'react';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '@/firebase/config';
import { useAuth } from '@/contexts/AuthContext';

const TS_SUFFIX = '__ts';
const CLOUD_TS_SUFFIX = '__updatedAt';

async function readLocalTs(key: string): Promise<number> {
  const raw = await AsyncStorage.getItem(key + TS_SUFFIX).catch(() => null);
  if (!raw) return 0;
  const t = Date.parse(raw);
  return Number.isFinite(t) ? t : 0;
}

async function writeLocalTs(key: string, iso: string) {
  await AsyncStorage.setItem(key + TS_SUFFIX, iso).catch(() => {});
}

// ─── Fusions par clé ──────────────────────────────────────────────────────────
//
// Par défaut la réconciliation est « le plus récent gagne » (timestamp par
// clé). C'est correct pour des scalaires, mais DESTRUCTEUR pour les listes et
// dictionnaires de progression : un appareil resté hors-ligne écraserait tout
// ce que l'autre a accompli entre-temps. Le web fusionne déjà défensivement
// (union, max par champ) dans ses callbacks ; ces fusions appliquent les
// MÊMES règles côté mobile, pour que les deux plateformes convergent au lieu
// de se disputer la dernière écriture.

type Merger = (localRaw: string | null, cloudRaw: string | null) => string | null;

function parse<T>(raw: string | null): T | null {
  if (raw == null) return null;
  try { return JSON.parse(raw) as T; } catch { return null; }
}

/** Union de deux tableaux JSON (ordre : local puis nouveautés du cloud). */
const mergeArrayUnion: Merger = (l, c) => {
  const a = parse<unknown[]>(l) ?? [];
  const b = parse<unknown[]>(c) ?? [];
  if (!Array.isArray(a) || !Array.isArray(b)) return l ?? c;
  const seen = new Set(a.map(v => JSON.stringify(v)));
  const out = [...a];
  for (const v of b) if (!seen.has(JSON.stringify(v))) out.push(v);
  return JSON.stringify(out);
};

/** Dictionnaire date → nombre : max par date (même règle que le web). */
const mergeMaxByKey: Merger = (l, c) => {
  const a = parse<Record<string, number>>(l) ?? {};
  const b = parse<Record<string, number>>(c) ?? {};
  const out: Record<string, number> = { ...a };
  for (const [k, v] of Object.entries(b)) {
    const n = Number(v) || 0;
    if (n > (Number(out[k]) || 0)) out[k] = n;
  }
  return JSON.stringify(out);
};

/** Nombre : max (l'XP ne redescend jamais). */
const mergeMaxNumber: Merger = (l, c) => {
  const a = Number(parse<number>(l) ?? l ?? 0) || 0;
  const b = Number(parse<number>(c) ?? c ?? 0) || 0;
  return JSON.stringify(Math.max(a, b));
};

/** Bilans {niveau: {passed, bestScore, attempts}} : passed OR, scores max. */
const mergeBilans: Merger = (l, c) => {
  type E = { passed?: boolean; bestScore?: number; attempts?: number } & Record<string, unknown>;
  const a = parse<Record<string, E>>(l) ?? {};
  const b = parse<Record<string, E>>(c) ?? {};
  const out: Record<string, E> = { ...a };
  for (const [lvl, e] of Object.entries(b)) {
    const cur = out[lvl];
    out[lvl] = cur ? {
      ...e, ...cur,
      passed: !!(cur.passed || e.passed),
      bestScore: Math.max(Number(cur.bestScore) || 0, Number(e.bestScore) || 0),
      attempts: Math.max(Number(cur.attempts) || 0, Number(e.attempts) || 0),
    } : e;
  }
  return JSON.stringify(out);
};

/** Série façon web {current, best, lastDay} : le lastDay le plus récent gagne. */
const mergeStreakV2: Merger = (l, c) => {
  type S = { current?: number; best?: number; lastDay?: string | null };
  const a = parse<S>(l) ?? {};
  const b = parse<S>(c) ?? {};
  const la = a.lastDay ?? null, lb = b.lastDay ?? null;
  const newer = lb && (!la || lb > la) ? b : a;
  return JSON.stringify({
    current: Number(newer.current) || 0,
    best: Math.max(Number(a.best) || 0, Number(b.best) || 0),
    lastDay: newer.lastDay ?? null,
  });
};

/**
 * Liste d'objets identifiés par `id` : union, et pour un id commun on garde
 * la version au `updatedAt` le plus récent. Même règle que le web — une note
 * créée hors-ligne sur un appareil ne doit jamais être effacée par l'autre.
 */
const mergeByIdRecent: Merger = (l, c) => {
  type Item = { id?: string; updatedAt?: string };
  const a = parse<Item[]>(l) ?? [];
  const b = parse<Item[]>(c) ?? [];
  if (!Array.isArray(a) || !Array.isArray(b)) return l ?? c;
  const byId = new Map<string, Item>();
  for (const it of [...a, ...b]) {
    if (!it || typeof it.id !== 'string') continue;
    const prev = byId.get(it.id);
    if (!prev || String(it.updatedAt ?? '') > String(prev.updatedAt ?? '')) byId.set(it.id, it);
  }
  return JSON.stringify([...byId.values()]);
};

/** Stats web {dailyMinutes, totalMinutes, streak, lastDate} : max champ à champ. */
const mergeLearningStats: Merger = (l, c) => {
  type S = { dailyMinutes?: Record<string, number>; totalMinutes?: number; streak?: number; lastDate?: string | null };
  const a = parse<S>(l) ?? {};
  const b = parse<S>(c) ?? {};
  const daily: Record<string, number> = { ...(a.dailyMinutes ?? {}) };
  for (const [k, v] of Object.entries(b.dailyMinutes ?? {})) {
    if ((Number(v) || 0) > (Number(daily[k]) || 0)) daily[k] = Number(v) || 0;
  }
  const lastDate = [a.lastDate, b.lastDate].filter(Boolean).sort().pop() ?? null;
  return JSON.stringify({
    dailyMinutes: daily,
    totalMinutes: Math.max(Number(a.totalMinutes) || 0, Number(b.totalMinutes) || 0),
    streak: Math.max(Number(a.streak) || 0, Number(b.streak) || 0),
    lastDate,
  });
};

/**
 * Registre clé → fusion. Toute clé absente reste en « plus récent gagne ».
 * NB : cl_word_srs_v2 n'est PAS ici — le SRS a sa propre synchronisation à
 * fusion par entrée dans useSrsData, il ne doit pas passer par ce mécanisme.
 */
const MERGERS: Record<string, Merger> = {
  cl_completed_lessons: mergeArrayUnion,
  xl_study_days: mergeArrayUnion,
  cl_bilans_v7: mergeBilans,
  cl_learning_stats_v1: mergeLearningStats,
  xl_xp_v2: mergeMaxNumber,
  xl_activity_v2: mergeMaxByKey,
  xl_streak_v2: mergeStreakV2,
};

export function useFirestoreSync(keys: string[], onSync?: () => void) {
  const { user } = useAuth();
  const unsubRef = useRef<(() => void) | null>(null);
  // Always-current ref so callbacks don't stale-close over onSync
  const onSyncRef = useRef(onSync);
  onSyncRef.current = onSync;

  /**
   * Réconciliation initiale AsyncStorage ↔ Firestore.
   * `attempt` : si le getDoc initial échoue (réseau lent, connexion froide),
   * on retente automatiquement après 3s puis 6s — sinon l'état resterait
   * sur les valeurs par défaut jusqu'à un redémarrage de l'app.
   */
  const reconcile = useCallback(async (attempt = 0) => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref).catch(() => null);
    if (snap === null) {
      // Échec réseau → retry 3s puis 6s (identique web)
      if (attempt < 2) setTimeout(() => { reconcile(attempt + 1); }, (attempt + 1) * 3000);
      return;
    }
    const cloudData = snap.data() ?? {};
    const localEntries: Record<string, unknown> = {};
    let didPull = false;

    for (const key of keys) {
      const localVal = await AsyncStorage.getItem(key).catch(() => null);
      const localTs = await readLocalTs(key);
      const cloudVal = cloudData[key] != null ? String(cloudData[key]) : null;
      const cloudTsRaw = cloudData[key + CLOUD_TS_SUFFIX];
      const cloudTs = cloudTsRaw ? Date.parse(String(cloudTsRaw)) : 0;

      // Clés à fusion : on combine local et cloud au lieu de choisir un camp.
      const merger = MERGERS[key];
      if (merger) {
        const merged = merger(localVal, cloudVal);
        if (merged != null) {
          if (merged !== localVal) {
            await AsyncStorage.setItem(key, merged).catch(() => {});
            didPull = true;
          }
          if (merged !== cloudVal) {
            const iso = new Date().toISOString();
            localEntries[key] = merged;
            localEntries[key + CLOUD_TS_SUFFIX] = iso;
            await writeLocalTs(key, iso);
          } else if (cloudTsRaw) {
            await writeLocalTs(key, String(cloudTsRaw));
          }
        }
        continue;
      }

      if (localTs >= cloudTs && localVal !== null) {
        const iso = new Date().toISOString();
        localEntries[key] = localVal;
        localEntries[key + CLOUD_TS_SUFFIX] = iso;
      } else if (cloudVal !== null) {
        await AsyncStorage.setItem(key, cloudVal).catch(() => {});
        if (cloudTsRaw) await writeLocalTs(key, String(cloudTsRaw));
        didPull = true;
      }
    }

    if (Object.keys(localEntries).length > 0) {
      await setDoc(ref, localEntries, { merge: true }).catch(() => {});
    }
    // Notify caller that cloud data was pulled into local storage
    if (didPull) onSyncRef.current?.();
  }, [user, keys]);

  const save = useCallback(async (key: string, value: string) => {
    const iso = new Date().toISOString();
    await AsyncStorage.setItem(key, value).catch(() => {});
    await writeLocalTs(key, iso);
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    await setDoc(ref, { [key]: value, [key + CLOUD_TS_SUFFIX]: iso }, { merge: true }).catch(() => {});
  }, [user]);

  useEffect(() => {
    if (!user) return;
    reconcile();
    const ref = doc(db, 'users', user.uid);
    unsubRef.current = onSnapshot(ref, async (snap) => {
      const data = snap.data() ?? {};
      let didWrite = false;
      for (const key of keys) {
        const cloudVal = data[key] != null ? String(data[key]) : null;
        const cloudTsRaw = data[key + CLOUD_TS_SUFFIX];
        if (!cloudVal || !cloudTsRaw) continue;

        // Clés à fusion : même règle qu'à la réconciliation. On n'écrase
        // jamais le local, on le complète — et si le résultat dépasse le
        // cloud, la prochaine sauvegarde le repoussera.
        const merger = MERGERS[key];
        if (merger) {
          const localVal = await AsyncStorage.getItem(key).catch(() => null);
          const merged = merger(localVal, cloudVal);
          if (merged != null && merged !== localVal) {
            await AsyncStorage.setItem(key, merged).catch(() => {});
            didWrite = true;
          }
          continue;
        }

        const cloudTs = Date.parse(String(cloudTsRaw));
        const localTs = await readLocalTs(key);
        if (cloudTs > localTs) {
          await AsyncStorage.setItem(key, cloudVal).catch(() => {});
          await writeLocalTs(key, String(cloudTsRaw));
          didWrite = true;
        }
      }
      if (didWrite) onSyncRef.current?.();
    });
    return () => { unsubRef.current?.(); };
  }, [user, reconcile]);

  return { save };
}
