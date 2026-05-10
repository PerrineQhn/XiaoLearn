/**
 * useBattleSession — task #44
 * ----------------------------
 * Gestion d'une bataille active : abonne au doc `battleMatches/{id}`,
 * gère le timer 3s par round côté client, poste la réponse de l'user
 * dans son tableau p1Answers/p2Answers, avance quand les 2 joueurs ont
 * répondu (ou quand le round est timed out).
 *
 * Design côté cohérence :
 *   - Chaque client pilote son propre round indépendamment : on évite une
 *     "horloge partagée" via Firestore qui serait fragile (drift, latence
 *     snapshots). L'UX : tu joues ton round, tu vois un overlay "L'adversaire
 *     réfléchit..." si lui n'a pas encore répondu, puis on révèle ensemble.
 *   - Le round suivant démarre dès que les 2 ont une réponse posée pour le
 *     round courant. Ceci garantit que personne ne peut "squatter" l'écran
 *     de résultat pour piéger l'autre.
 *   - Timeout : si 10 s se sont écoulées après que TOI aies répondu et que
 *     l'adversaire n'a toujours pas répondu, on lui attribue un -1 (timeout)
 *     et on avance.
 *
 * Fin de match : quand p1Answers.length === 10 ET p2Answers.length === 10,
 * le client qui écrit la *dernière* réponse calcule les scores et passe
 * status:'finished' + winner. Idempotent via transaction (si le pair fait
 * la même chose en parallèle, un seul succède).
 *
 * Retour :
 *   - match (snapshot Firestore courant)
 *   - currentRound + timeLeft (ms)
 *   - iAmP1, myAnswers, oppAnswers, myScore, oppScore
 *   - submitAnswer(choiceIdx) — à appeler sur clic (et sur timeout ⇒ -1)
 *   - isFinished, winner
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  doc,
  onSnapshot,
  runTransaction,
  updateDoc,
  arrayUnion,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import type { BattleAnswer, BattleMatch } from '../types/community';
import {
  DEV_BOT_UID,
  isDevBotMatch,
  planBotAnswer
} from '../utils/devBot';

const ROUND_DURATION_MS = 6_000;
const OPPONENT_WAIT_MAX_MS = 12_000;
const TOTAL_ROUNDS = 10;

export interface UseBattleSessionResult {
  match: BattleMatch | null;
  loading: boolean;
  error: string | null;
  iAmP1: boolean;
  /** Round 0..totalRounds-1 (ou totalRounds si fini). */
  currentRound: number;
  totalRounds: number;
  /** ms restantes pour répondre au round courant. */
  timeLeft: number;
  /** Réponses posées par moi. */
  myAnswers: BattleAnswer[];
  oppAnswers: BattleAnswer[];
  myScore: number;
  oppScore: number;
  /** true si j'ai déjà répondu pour le round courant. */
  iAnswered: boolean;
  oppAnswered: boolean;
  isFinished: boolean;
  /** 'win' | 'loss' | 'draw' | null */
  outcome: 'win' | 'loss' | 'draw' | null;
  /** À appeler quand l'user choisit une réponse (ou -1 pour timeout). */
  submitAnswer: (choiceIdx: number) => Promise<void>;
  /** Cleanup battleQueue doc + optionnel abandon du match. */
  leaveMatch: () => Promise<void>;
}

export const useBattleSession = (matchId: string | null): UseBattleSessionResult => {
  const { user } = useAuth();
  const [match, setMatch] = useState<BattleMatch | null>(null);
  const [loading, setLoading] = useState(!!matchId);
  const [error, setError] = useState<string | null>(null);

  const [roundStartedAt, setRoundStartedAt] = useState<number>(Date.now());
  const [tick, setTick] = useState(0);

  const iAmP1 = !!match && !!user && match.p1.uid === user.uid;

  const myAnswers = match ? (iAmP1 ? match.p1Answers : match.p2Answers) : [];
  const oppAnswers = match ? (iAmP1 ? match.p2Answers : match.p1Answers) : [];

  // Round courant = min(myAnswers.length, oppAnswers.length) — les 2 doivent
  // avoir répondu avant d'avancer. Sinon on est en attente.
  const currentRound = useMemo(() => {
    if (!match) return 0;
    return Math.min(myAnswers.length, oppAnswers.length);
  }, [match, myAnswers.length, oppAnswers.length]);

  const iAnswered = myAnswers.length > currentRound;
  const oppAnswered = oppAnswers.length > currentRound;

  const isFinished = !!match && match.status === 'finished';
  const outcome: 'win' | 'loss' | 'draw' | null = useMemo(() => {
    if (!match || !user || match.status !== 'finished') return null;
    if (match.winner === 'draw') return 'draw';
    if (match.winner === user.uid) return 'win';
    return 'loss';
  }, [match, user]);

  const myScore = match ? (iAmP1 ? match.p1Score : match.p2Score) : 0;
  const oppScore = match ? (iAmP1 ? match.p2Score : match.p1Score) : 0;

  // ---------------------------------------------------------------
  //  Abonnement au match doc
  // ---------------------------------------------------------------

  useEffect(() => {
    if (!matchId || !user) {
      setMatch(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsub = onSnapshot(
      doc(db, 'battleMatches', matchId),
      (snap) => {
        if (!snap.exists()) {
          setError('Match introuvable');
          setLoading(false);
          return;
        }
        setMatch(snap.data() as BattleMatch);
        setLoading(false);
      },
      (err) => {
        console.warn('[session] snapshot failed', err);
        setError('Connexion au match perdue');
        setLoading(false);
      }
    );
    return () => unsub();
  }, [matchId, user]);

  // ---------------------------------------------------------------
  //  Timer par round (resynchronisé à chaque avancement)
  // ---------------------------------------------------------------

  useEffect(() => {
    // Nouveau round ? reset le timer.
    setRoundStartedAt(Date.now());
  }, [currentRound]);

  useEffect(() => {
    if (isFinished) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 100);
    return () => window.clearInterval(id);
  }, [isFinished]);

  const timeLeft = useMemo(() => {
    void tick;
    if (isFinished) return 0;
    // Si j'ai déjà répondu mais pas l'adversaire : je montre un compteur
    // d'attente (OPPONENT_WAIT_MAX_MS - elapsed since I answered). Sinon
    // c'est le compteur de round normal (3 s).
    if (iAnswered && !oppAnswered) {
      const elapsed = Date.now() - roundStartedAt;
      return Math.max(0, OPPONENT_WAIT_MAX_MS - elapsed);
    }
    if (!iAnswered) {
      const elapsed = Date.now() - roundStartedAt;
      return Math.max(0, ROUND_DURATION_MS - elapsed);
    }
    return 0;
  }, [tick, roundStartedAt, iAnswered, oppAnswered, isFinished]);

  // ---------------------------------------------------------------
  //  submitAnswer — ajoute la réponse dans le bon tableau + finalize
  // ---------------------------------------------------------------

  const submitAnswer = useCallback(
    async (choiceIdx: number) => {
      if (!match || !user) return;
      if (iAnswered) return;
      if (match.status !== 'active') return;

      const roundIdx = currentRound;
      const word = match.words[roundIdx];
      if (!word) return;

      const elapsed = Math.min(
        ROUND_DURATION_MS,
        Math.max(0, Date.now() - roundStartedAt)
      );

      const answer: BattleAnswer = {
        roundIdx,
        choiceIdx,
        correct: choiceIdx >= 0 && choiceIdx === word.correctIndex,
        timeMs: elapsed
      };

      const ref = doc(db, 'battleMatches', matchId!);
      const field = iAmP1 ? 'p1Answers' : 'p2Answers';

      try {
        await updateDoc(ref, { [field]: arrayUnion(answer) });
      } catch (err) {
        console.warn('[session] updateDoc answer failed', err);
        return;
      }

      // Après mon write, peut-être que l'adversaire avait aussi répondu :
      // le snapshot listener va pousser la nouvelle valeur et on finalisera
      // dans l'effet de finalisation ci-dessous (qui lit `match`).
    },
    [match, user, iAnswered, currentRound, roundStartedAt, iAmP1, matchId]
  );

  // ---------------------------------------------------------------
  //  Auto-timeout : si timeLeft atteint 0 et je n'ai pas répondu → -1
  //  (si timeLeft = wait et l'opp n'a pas répondu → on le timeout aussi)
  // ---------------------------------------------------------------

  const myTimeoutSentRef = useRef(false);
  const oppTimeoutSentRef = useRef(false);
  useEffect(() => {
    myTimeoutSentRef.current = false;
    oppTimeoutSentRef.current = false;
  }, [currentRound]);

  useEffect(() => {
    if (!match || isFinished) return;
    if (!iAnswered && timeLeft === 0 && !myTimeoutSentRef.current) {
      myTimeoutSentRef.current = true;
      submitAnswer(-1); // timeout answer
    }
    // Opp timeout : si je l'ai attendu > OPPONENT_WAIT_MAX_MS, je lui pousse
    // un -1 dans son tableau (pour débloquer). Le pair pourra écrire un vrai
    // answer par la suite — arrayUnion préservera les deux, on prendra le
    // *premier* côté calcul final.
    if (iAnswered && !oppAnswered && timeLeft === 0 && !oppTimeoutSentRef.current) {
      oppTimeoutSentRef.current = true;
      const field = iAmP1 ? 'p2Answers' : 'p1Answers';
      const forcedAnswer: BattleAnswer = {
        roundIdx: currentRound,
        choiceIdx: -1,
        correct: false,
        timeMs: ROUND_DURATION_MS
      };
      updateDoc(doc(db, 'battleMatches', matchId!), {
        [field]: arrayUnion(forcedAnswer)
      }).catch((err) => console.warn('[session] opp timeout push failed', err));
    }
  }, [timeLeft, iAnswered, oppAnswered, match, isFinished, currentRound, iAmP1, matchId, submitAnswer]);

  // ---------------------------------------------------------------
  //  DEV : autoplay du bot (task #56)
  //  Si l'adversaire est le bot DEV, le client du user pilote aussi les
  //  réponses du bot. On planifie la réponse pour le round courant dès
  //  que le bot n'y a pas encore répondu. Le delay est randomisé par
  //  planBotAnswer() pour simuler un humain plausible.
  //
  //  IMPORTANT : on utilise un ref qui persiste entre les snapshots match.
  //  Chaque round est programmé UNE seule fois, sinon chaque mise à jour
  //  Firestore (les rounds de l'user) réinitialiserait le setTimeout du bot
  //  et il ne répondrait jamais.
  // ---------------------------------------------------------------
  const botScheduledRoundRef = useRef<number>(-1);
  const botTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!match || !matchId) return;
    if (!isDevBotMatch(match)) return;
    if (match.status !== 'active') return;

    // Quel slot joue le bot ?
    const botIsP1 = match.p1.uid === DEV_BOT_UID;
    const botIsP2 = match.p2.uid === DEV_BOT_UID;
    if (!botIsP1 && !botIsP2) return;

    const botAnswers = botIsP1 ? match.p1Answers : match.p2Answers;
    const roundIdx = botAnswers.length; // prochain round à jouer pour le bot
    if (roundIdx >= TOTAL_ROUNDS) return;

    // Déjà programmé pour ce round : no-op (évite les re-schedules à chaque
    // snapshot quand c'est l'user qui a posé une réponse).
    if (botScheduledRoundRef.current >= roundIdx) return;
    botScheduledRoundRef.current = roundIdx;

    const word = match.words[roundIdx];
    if (!word) return;

    const plan = planBotAnswer(word);
    const field = botIsP1 ? 'p1Answers' : 'p2Answers';
    const answer: BattleAnswer = {
      roundIdx,
      choiceIdx: plan.choiceIdx,
      correct: plan.choiceIdx >= 0 && plan.choiceIdx === word.correctIndex,
      timeMs: Math.min(ROUND_DURATION_MS, plan.delayMs)
    };

    botTimeoutRef.current = window.setTimeout(() => {
      botTimeoutRef.current = null;
      updateDoc(doc(db, 'battleMatches', matchId), {
        [field]: arrayUnion(answer)
      }).catch((err) => {
        console.warn('[session] bot answer write failed', err);
      });
    }, plan.delayMs);
  }, [match, matchId]);

  // Cleanup du timeout bot uniquement à l'unmount de la session.
  useEffect(() => {
    return () => {
      if (botTimeoutRef.current !== null) {
        window.clearTimeout(botTimeoutRef.current);
        botTimeoutRef.current = null;
      }
      botScheduledRoundRef.current = -1;
    };
  }, []);

  // ---------------------------------------------------------------
  //  Finalisation : une fois que les 10 rounds sont remplis des 2 côtés
  //  on passe le match en 'finished' + calcule winner + scores.
  //  Transaction pour éviter la double-finalisation.
  // ---------------------------------------------------------------

  useEffect(() => {
    if (!match || !matchId || match.status !== 'active') return;
    const p1Done = match.p1Answers.length >= TOTAL_ROUNDS;
    const p2Done = match.p2Answers.length >= TOTAL_ROUNDS;
    if (!p1Done || !p2Done) return;

    const ref = doc(db, 'battleMatches', matchId);
    runTransaction(db, async (tx) => {
      const snap = await tx.get(ref);
      if (!snap.exists()) return;
      const data = snap.data() as BattleMatch;
      if (data.status === 'finished') return;
      // Prendre le premier answer par roundIdx pour chaque joueur (défense
      // contre les timeouts doublés). `data.p1Answers` peut contenir des
      // doublons si l'adversaire nous a timeout puis on a quand même répondu.
      const dedup = (arr: BattleAnswer[]) => {
        const seen = new Map<number, BattleAnswer>();
        for (const a of arr) {
          if (!seen.has(a.roundIdx)) seen.set(a.roundIdx, a);
        }
        return Array.from(seen.values());
      };
      const p1 = dedup(data.p1Answers).filter((a) => a.correct);
      const p2 = dedup(data.p2Answers).filter((a) => a.correct);
      const p1Score = p1.length;
      const p2Score = p2.length;
      let winner: string | 'draw';
      if (p1Score > p2Score) winner = data.p1.uid;
      else if (p2Score > p1Score) winner = data.p2.uid;
      else winner = 'draw';

      tx.update(ref, {
        status: 'finished',
        p1Score,
        p2Score,
        winner,
        finishedAt: Date.now()
      });
    }).catch((err) => console.warn('[session] finalize failed', err));
  }, [match, matchId]);

  // ---------------------------------------------------------------
  //  leaveMatch — cleanup queue doc (sécurité).
  // ---------------------------------------------------------------

  const leaveMatch = useCallback(async () => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'battleQueue', user.uid));
    } catch {
      /* noop */
    }
  }, [user]);

  return {
    match,
    loading,
    error,
    iAmP1,
    currentRound,
    totalRounds: TOTAL_ROUNDS,
    timeLeft,
    myAnswers,
    oppAnswers,
    myScore,
    oppScore,
    iAnswered,
    oppAnswered,
    isFinished,
    outcome,
    submitAnswer,
    leaveMatch
  };
};
