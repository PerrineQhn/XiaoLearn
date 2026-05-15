/**
 * useLocalBotSession — task #56 (option 3)
 * -----------------------------------------
 * Variante 100% locale de `useBattleSession` pour les matchs contre le bot
 * DEV. AUCUN accès Firestore : tout le state du match (réponses, scores,
 * timer, finalisation) vit dans du state React.
 *
 * Pourquoi ? Quand Firestore est indisponible (quota dépassé, offline, etc.),
 * le bot doit rester jouable — c'est un outil de dev/test, pas une feature
 * produit. Cette version reproduit exactement l'UX d'un vrai match :
 *   - 10 rounds
 *   - timer 3 s par round
 *   - bot autoplay (delay 700-2400 ms, 65% bonnes réponses)
 *   - écran final win/loss/draw avec score et XP
 *
 * L'interface retournée est strictement identique à `UseBattleSessionResult`
 * pour permettre le swap dans `BattleSessionView`.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { BattleAnswer, BattleMatch } from '../types/community';
import { DEV_BOT_UID, planBotAnswer } from '../utils/devBot';
import type { UseBattleSessionResult } from './useBattleSession';

const ROUND_DURATION_MS = 6_000;
const OPPONENT_WAIT_MAX_MS = 12_000;
const TOTAL_ROUNDS = 10;

/**
 * @param initialMatch - Match pré-construit (user = p1, bot = p2, words remplis).
 *                       Peut être null avant la création du match.
 */
export const useLocalBotSession = (
  initialMatch: BattleMatch | null
): UseBattleSessionResult => {
  const { user } = useAuth();

  // Source de vérité : state React (pas Firestore).
  const [match, setMatch] = useState<BattleMatch | null>(initialMatch);
  const [roundStartedAt, setRoundStartedAt] = useState<number>(Date.now());
  const [tick, setTick] = useState(0);

  // Re-init si l'identité du match change (rematch, nouveau match).
  useEffect(() => {
    setMatch(initialMatch);
    setRoundStartedAt(Date.now());
  }, [initialMatch?.id]);

  const iAmP1 = !!match && !!user && match.p1.uid === user.uid;

  const myAnswers = match ? (iAmP1 ? match.p1Answers : match.p2Answers) : [];
  const oppAnswers = match ? (iAmP1 ? match.p2Answers : match.p1Answers) : [];

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

  // Score live : on dérive le score à partir des réponses correctes au lieu
  // de lire `match.p1Score/p2Score`, qui ne sont écrits qu'à la finalisation
  // (cf. useBattleSession pour la même correction).
  const countCorrect = (arr: BattleAnswer[]): number => {
    const seen = new Map<number, BattleAnswer>();
    for (const a of arr) {
      if (!seen.has(a.roundIdx)) seen.set(a.roundIdx, a);
    }
    let n = 0;
    for (const a of seen.values()) if (a.correct) n += 1;
    return n;
  };
  const myScore = useMemo(() => {
    if (!match) return 0;
    if (match.status === 'finished') return iAmP1 ? match.p1Score : match.p2Score;
    return countCorrect(myAnswers);
  }, [match, myAnswers, iAmP1]);
  const oppScore = useMemo(() => {
    if (!match) return 0;
    if (match.status === 'finished') return iAmP1 ? match.p2Score : match.p1Score;
    return countCorrect(oppAnswers);
  }, [match, oppAnswers, iAmP1]);

  // ---------------------------------------------------------------
  //  Timer par round (resynchronisé à chaque avancement)
  // ---------------------------------------------------------------
  useEffect(() => {
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
  //  Helpers — mutations locales du match
  // ---------------------------------------------------------------

  /** Ajoute une réponse dans p1Answers ou p2Answers. */
  const pushAnswer = useCallback(
    (slot: 'p1' | 'p2', answer: BattleAnswer) => {
      setMatch((prev) => {
        if (!prev) return prev;
        if (prev.status !== 'active') return prev;
        const key = slot === 'p1' ? 'p1Answers' : 'p2Answers';
        // Idempotence : ne pas pousser plusieurs réponses pour le même round.
        const existing = prev[key];
        if (existing.some((a) => a.roundIdx === answer.roundIdx)) return prev;
        return { ...prev, [key]: [...existing, answer] };
      });
    },
    []
  );

  // ---------------------------------------------------------------
  //  submitAnswer — user écrit sa réponse dans p1 (il est p1 par construction)
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

      pushAnswer(iAmP1 ? 'p1' : 'p2', answer);
    },
    [match, user, iAnswered, currentRound, roundStartedAt, iAmP1, pushAnswer]
  );

  // ---------------------------------------------------------------
  //  Auto-timeout user (pas de reply en 3 s → -1)
  // ---------------------------------------------------------------
  const myTimeoutSentRef = useRef(false);
  useEffect(() => {
    myTimeoutSentRef.current = false;
  }, [currentRound]);

  useEffect(() => {
    if (!match || isFinished) return;
    if (!iAnswered && timeLeft === 0 && !myTimeoutSentRef.current) {
      myTimeoutSentRef.current = true;
      submitAnswer(-1);
    }
  }, [timeLeft, iAnswered, match, isFinished, submitAnswer]);

  // ---------------------------------------------------------------
  //  Bot autoplay — un seul schedule par round, cleanup à l'unmount.
  //  Le bot joue dans le slot qui n'est pas celui de l'user.
  // ---------------------------------------------------------------
  const botScheduledRoundRef = useRef<number>(-1);
  const botTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!match) return;
    if (match.status !== 'active') return;

    const botIsP1 = match.p1.uid === DEV_BOT_UID;
    const botIsP2 = match.p2.uid === DEV_BOT_UID;
    if (!botIsP1 && !botIsP2) return;

    const botAnswers = botIsP1 ? match.p1Answers : match.p2Answers;
    const roundIdx = botAnswers.length;
    if (roundIdx >= TOTAL_ROUNDS) return;

    if (botScheduledRoundRef.current >= roundIdx) return;
    botScheduledRoundRef.current = roundIdx;

    const word = match.words[roundIdx];
    if (!word) return;

    const plan = planBotAnswer(word);
    const answer: BattleAnswer = {
      roundIdx,
      choiceIdx: plan.choiceIdx,
      correct: plan.choiceIdx >= 0 && plan.choiceIdx === word.correctIndex,
      timeMs: Math.min(ROUND_DURATION_MS, plan.delayMs)
    };

    botTimeoutRef.current = window.setTimeout(() => {
      botTimeoutRef.current = null;
      pushAnswer(botIsP1 ? 'p1' : 'p2', answer);
    }, plan.delayMs);
  }, [match, pushAnswer]);

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
  //  Finalisation : 10 rounds des 2 côtés → compute winner + status='finished'
  // ---------------------------------------------------------------
  useEffect(() => {
    if (!match || match.status !== 'active') return;
    const p1Done = match.p1Answers.length >= TOTAL_ROUNDS;
    const p2Done = match.p2Answers.length >= TOTAL_ROUNDS;
    if (!p1Done || !p2Done) return;

    setMatch((prev) => {
      if (!prev || prev.status !== 'active') return prev;

      const dedup = (arr: BattleAnswer[]) => {
        const seen = new Map<number, BattleAnswer>();
        for (const a of arr) {
          if (!seen.has(a.roundIdx)) seen.set(a.roundIdx, a);
        }
        return Array.from(seen.values());
      };
      const p1Correct = dedup(prev.p1Answers).filter((a) => a.correct).length;
      const p2Correct = dedup(prev.p2Answers).filter((a) => a.correct).length;
      let winner: string | 'draw';
      if (p1Correct > p2Correct) winner = prev.p1.uid;
      else if (p2Correct > p1Correct) winner = prev.p2.uid;
      else winner = 'draw';

      return {
        ...prev,
        status: 'finished',
        p1Score: p1Correct,
        p2Score: p2Correct,
        winner,
        finishedAt: Date.now()
      };
    });
  }, [match]);

  // ---------------------------------------------------------------
  //  leaveMatch — no-op (pas de queue Firestore à cleaner en local)
  // ---------------------------------------------------------------
  const leaveMatch = useCallback(async () => {
    /* rien à faire en local */
  }, []);

  return {
    match,
    loading: false,
    error: null,
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
