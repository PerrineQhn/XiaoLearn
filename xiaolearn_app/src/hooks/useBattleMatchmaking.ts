/**
 * useBattleMatchmaking — task #44
 * --------------------------------
 * Matchmaking temps-réel Firestore pour les batailles de mots.
 *
 *   [1] Caller fournit un vocab pool (10+ mots avec choices).
 *   [2] `startQueue()` :
 *        - écrit `battleQueue/{uid}` avec matchId:null
 *        - démarre 2 listeners :
 *             a) doc propre → détecte quand matchId est posé (B m'a matché)
 *             b) query queue (matchId==null, uid!=moi) → candidats à matcher
 *        - tente une transaction dès qu'un candidat est repéré
 *   [3] `cancelQueue()` retire l'entrée et arrête les listeners.
 *   [4] `matchId` est publié dans le state ; l'UI appelle `onMatchFound`.
 *   [5] Timeout 20 s sans match → cleanup auto + flag `timedOut`.
 *
 * Transactions :
 *   - Lit les 2 docs queue (mien + candidat), abort si déjà matché.
 *   - Crée `battleMatches/{id}` avec id prédéfini par doc().
 *   - Met `matchId` sur les 2 entrées queue.
 *   - Note : on *conserve* les entrées queue après match pour éviter que
 *     le listener du pair ne rate le matchId ; le cleanup "delete queue"
 *     est fait ensuite par chaque client côté finish.
 *
 * Dépendances Firestore :
 *   - Collection `battleQueue/{uid}` (read/write own, read list for auth)
 *   - Collection `battleMatches/{id}` (read if p1.uid or p2.uid == me, write same)
 *   Voir FIRESTORE_RULES.md pour les règles détaillées.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  setDoc,
  where
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import type {
  BattleMatch,
  BattleQueueEntry,
  BattleWord,
  CommunityLanguage
} from '../types/community';

const QUEUE_TIMEOUT_MS = 20_000;

export type MatchmakingStatus =
  | 'idle'
  | 'queueing'
  | 'matched'
  | 'timedOut'
  | 'error';

export interface UseBattleMatchmakingOpts {
  /** Pool de mots complet de l'user (au moins 10). Utilisé si moi initiateur. */
  buildWordPool: () => BattleWord[];
  /** Langue de l'utilisateur (propagée au match doc). */
  language: CommunityLanguage;
  /** Approximatif (0..N) ; aide à matcher à niveaux proches. */
  vocabLevel: number;
  onMatchFound?: (matchId: string) => void;
}

export interface UseBattleMatchmakingResult {
  status: MatchmakingStatus;
  matchId: string | null;
  /** Secondes restantes avant timeout (UI compteur). 0 si pas en queue. */
  secondsLeft: number;
  startQueue: () => Promise<void>;
  cancelQueue: () => Promise<void>;
}

export const useBattleMatchmaking = (
  opts: UseBattleMatchmakingOpts
): UseBattleMatchmakingResult => {
  const { user } = useAuth();
  const [status, setStatus] = useState<MatchmakingStatus>('idle');
  const [matchId, setMatchId] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);

  // Refs pour les unsubs des snapshots et le timer
  const ownUnsubRef = useRef<null | (() => void)>(null);
  const listUnsubRef = useRef<null | (() => void)>(null);
  const timerRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  // Évite d'essayer de matcher plusieurs candidats en parallèle.
  const matchingInFlightRef = useRef(false);

  const teardown = useCallback(() => {
    if (ownUnsubRef.current) { ownUnsubRef.current(); ownUnsubRef.current = null; }
    if (listUnsubRef.current) { listUnsubRef.current(); listUnsubRef.current = null; }
    if (timerRef.current !== null) { window.clearInterval(timerRef.current); timerRef.current = null; }
    if (timeoutRef.current !== null) { window.clearTimeout(timeoutRef.current); timeoutRef.current = null; }
  }, []);

  useEffect(() => () => teardown(), [teardown]);

  const cancelQueue = useCallback(async () => {
    teardown();
    setSecondsLeft(0);
    if (user) {
      try {
        await deleteDoc(doc(db, 'battleQueue', user.uid));
      } catch (err) {
        console.warn('[matchmaking] cancelQueue delete failed', err);
      }
    }
    setStatus('idle');
    setMatchId(null);
  }, [user, teardown]);

  const tryMatchWith = useCallback(
    async (candidate: BattleQueueEntry): Promise<boolean> => {
      if (!user) return false;
      if (matchingInFlightRef.current) return false;
      matchingInFlightRef.current = true;

      try {
        const myRef = doc(db, 'battleQueue', user.uid);
        const oppRef = doc(db, 'battleQueue', candidate.uid);
        const matchRef = doc(collection(db, 'battleMatches'));

        const words = opts.buildWordPool();
        if (words.length < 10) {
          console.warn('[matchmaking] vocab pool < 10 — cannot start a battle');
          return false;
        }
        const roundWords = words.slice(0, 10);

        const success = await runTransaction(db, async (tx) => {
          const mySnap = await tx.get(myRef);
          const oppSnap = await tx.get(oppRef);
          if (!mySnap.exists() || !oppSnap.exists()) return false;
          const myData = mySnap.data() as BattleQueueEntry;
          const oppData = oppSnap.data() as BattleQueueEntry;
          if (myData.matchId || oppData.matchId) return false;

          const match: BattleMatch = {
            id: matchRef.id,
            status: 'active',
            p1: {
              uid: user.uid,
              displayName:
                user.displayName || user.email?.split('@')[0] || 'Apprenant',
              photoURL: user.photoURL || null
            },
            p2: {
              uid: oppData.uid,
              displayName: oppData.displayName,
              photoURL: oppData.photoURL
            },
            words: roundWords,
            p1Answers: [],
            p2Answers: [],
            p1Score: 0,
            p2Score: 0,
            winner: null,
            startedAt: Date.now(),
            finishedAt: null,
            language: opts.language
          };

          tx.set(matchRef, match);
          tx.update(myRef, { matchId: matchRef.id });
          tx.update(oppRef, { matchId: matchRef.id });
          return true;
        });

        return success === true;
      } catch (err) {
        console.warn('[matchmaking] transaction failed — will retry', err);
        return false;
      } finally {
        matchingInFlightRef.current = false;
      }
    },
    [user, opts]
  );

  const startQueue = useCallback(async () => {
    if (!user) {
      console.warn('[matchmaking] user not connected');
      setStatus('error');
      return;
    }
    if (status === 'queueing' || status === 'matched') return;

    teardown();
    setMatchId(null);
    setStatus('queueing');

    const queueEntry: BattleQueueEntry = {
      uid: user.uid,
      displayName:
        user.displayName || user.email?.split('@')[0] || 'Apprenant',
      photoURL: user.photoURL || null,
      queuedAt: Date.now(),
      vocabLevel: opts.vocabLevel,
      matchId: null,
      language: opts.language
    };

    try {
      await setDoc(doc(db, 'battleQueue', user.uid), queueEntry);
    } catch (err) {
      console.warn('[matchmaking] setDoc queue failed', err);
      setStatus('error');
      return;
    }

    // Listener sur son propre doc : détecte quand l'adversaire me match.
    ownUnsubRef.current = onSnapshot(
      doc(db, 'battleQueue', user.uid),
      (snap) => {
        if (!snap.exists()) return;
        const data = snap.data() as BattleQueueEntry;
        if (data.matchId) {
          setMatchId(data.matchId);
          setStatus('matched');
          teardown();
          opts.onMatchFound?.(data.matchId);
          // On ne delete pas tout de suite : le pair pourrait encore ne pas
          // avoir vu son update. Cleanup différé par le session hook.
        }
      },
      (err) => {
        console.warn('[matchmaking] own listener failed', err);
      }
    );

    // Listener sur la queue : cherche un adversaire libre.
    // Query : matchId == null, orderBy queuedAt asc, limit 5
    const qCandidates = query(
      collection(db, 'battleQueue'),
      where('matchId', '==', null),
      orderBy('queuedAt', 'asc'),
      limit(5)
    );

    listUnsubRef.current = onSnapshot(
      qCandidates,
      async (snap) => {
        if (matchingInFlightRef.current) return;
        for (const docSnap of snap.docs) {
          const entry = docSnap.data() as BattleQueueEntry;
          if (entry.uid === user.uid) continue;
          // Tentative de match ; si ça échoue on essaie le suivant.
          const ok = await tryMatchWith(entry);
          if (ok) return;
        }
      },
      (err) => {
        console.warn('[matchmaking] candidate listener failed', err);
      }
    );

    // Timer UI + timeout hard
    setSecondsLeft(Math.round(QUEUE_TIMEOUT_MS / 1000));
    const startedAt = Date.now();
    timerRef.current = window.setInterval(() => {
      const remaining = Math.max(
        0,
        Math.round((QUEUE_TIMEOUT_MS - (Date.now() - startedAt)) / 1000)
      );
      setSecondsLeft(remaining);
    }, 500);

    timeoutRef.current = window.setTimeout(async () => {
      // Vérifier que le doc n'a pas été matched entre temps
      try {
        const ref = doc(db, 'battleQueue', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists() && (snap.data() as BattleQueueEntry).matchId) {
          return; // matched in extremis — le own listener s'en occupe
        }
      } catch {
        /* noop */
      }
      teardown();
      setSecondsLeft(0);
      try {
        await deleteDoc(doc(db, 'battleQueue', user.uid));
      } catch {
        /* noop */
      }
      setStatus('timedOut');
    }, QUEUE_TIMEOUT_MS);
  }, [user, status, opts, teardown, tryMatchWith]);

  // NOTE : les matchs contre le bot DEV ne passent plus par Firestore
  // (task #56 option 3). Voir `useLocalBotSession` + `BattleSessionPageLocal`
  // qui gèrent une session 100% locale, résiliente au quota/offline.

  return { status, matchId, secondsLeft, startQueue, cancelQueue };
};
