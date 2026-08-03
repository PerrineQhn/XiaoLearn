/**
 * battleService.ts — Battles PvP temps réel, protocole commun web ↔ mobile.
 *
 * ## Pourquoi cette réécriture
 *
 * Le mobile utilisait une collection `battles` avec un matchmaking optimiste
 * (« cherche un doc en attente, sinon crée-en un »), pendant que le web
 * utilisait `battleQueue` + `battleMatches` avec un appariement transactionnel.
 * Deux protocoles étanches : un joueur mobile ne pouvait jamais rencontrer un
 * joueur web, si bien que le repli sur le bot était le cas nominal.
 *
 * C'est le mobile qui s'aligne, pour trois raisons : le web a l'appariement le
 * plus sûr (transaction, donc pas de double réservation), ses règles Firestore
 * sont déjà écrites et déployées pour ces deux collections, et il porte les
 * types partagés.
 *
 * ## Protocole
 *
 *   battleQueue/{uid}     entrée d'attente, `matchId` posé par l'appariement
 *   battleMatches/{id}    la partie : p1/p2, words[10], p1Answers/p2Answers
 *
 * Chaque client n'écrit QUE son propre tableau de réponses et son propre score.
 * La partie passe en `finished` quand les deux tableaux comptent 10 réponses.
 *
 * ## Adaptation
 *
 * L'écran `app/battle.tsx` raisonne en `Battle` / `BattleQuestion` (dictionnaire
 * de joueurs, réponses indexées). Le document partagé, lui, est binaire p1/p2.
 * La conversion se fait ici, dans `toBattle()` : l'écran n'a pas à connaître le
 * format du réseau.
 */
import {
  collection, doc, setDoc, updateDoc, onSnapshot, query,
  where, deleteDoc, runTransaction, getDocs, limit,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { LEARN_SECTIONS } from '@/data/cecrLearnSections';

// ─── Types côté écran (inchangés) ─────────────────────────────────────────────

export interface BattleQuestion {
  hanzi: string;
  pinyin: string;
  correctMeaning: string;
  choices: string[];
  correctIndex: number;
}

export interface BattlePlayer {
  displayName: string;
  score: number;
  finishedAt?: string | null;
}

export type BattleStatus = 'waiting' | 'active' | 'finished';

export interface Battle {
  id: string;
  status: BattleStatus;
  createdBy: string;
  createdAt: string;
  players: Record<string, BattlePlayer>;
  playerIds: string[];
  questions: BattleQuestion[];
  answers: Record<string, Record<number, number>>;
  winnerId?: string | null;
  startedAt?: string | null;
}

// ─── Types du document partagé (miroir de xiaolearn_app/types/community.ts) ────

interface BattleWord {
  chinese: string;
  pinyin: string;
  correctIndex: number;
  choices: string[];
}

interface BattleAnswer {
  roundIdx: number;
  choiceIdx: number;
  correct: boolean;
  timeMs: number;
}

interface BattlePlayerSnapshot {
  uid: string;
  displayName: string;
  photoURL: string | null;
}

interface BattleMatch {
  id: string;
  status: 'active' | 'finished' | 'abandoned';
  p1: BattlePlayerSnapshot;
  p2: BattlePlayerSnapshot;
  words: BattleWord[];
  p1Answers: BattleAnswer[];
  p2Answers: BattleAnswer[];
  p1Score: number;
  p2Score: number;
  winner: string | 'draw' | null;
  startedAt: number;
  finishedAt: number | null;
  language: 'fr' | 'en';
}

interface BattleQueueEntry {
  uid: string;
  displayName: string;
  photoURL: string | null;
  queuedAt: number;
  vocabLevel: number;
  matchId: string | null;
  language: 'fr' | 'en';
}

export const ROUNDS = 10;
/** Au-delà, l'écran bascule sur le bot. Aligné sur le timeout du web (20 s). */
export const QUEUE_TIMEOUT_MS = 20_000;

// ─── Générateur de questions ──────────────────────────────────────────────────

function collectVocab() {
  const pool: { hanzi: string; pinyin: string; meaning: string }[] = [];
  for (const sections of Object.values(LEARN_SECTIONS)) {
    for (const section of sections) {
      for (const item of section.items ?? []) {
        if (item.hanzi && item.meaning && item.meaning.length > 1) pool.push(item);
      }
    }
  }
  return pool;
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateBattleQuestions(count = ROUNDS): BattleQuestion[] {
  const pool = collectVocab();
  if (pool.length < count + 3) return [];
  shuffle(pool);
  const selected = pool.slice(0, count);
  const rest = pool.slice(count);

  return selected.map(item => {
    const wrongPool = rest.filter(x => x.hanzi !== item.hanzi);
    shuffle(wrongPool);
    const wrongs = wrongPool.slice(0, 3).map(x => x.meaning);
    const choices = shuffle([item.meaning, ...wrongs]);
    return {
      hanzi: item.hanzi,
      pinyin: item.pinyin,
      correctMeaning: item.meaning,
      choices,
      correctIndex: choices.indexOf(item.meaning),
    };
  });
}

const toWord = (q: BattleQuestion): BattleWord => ({
  chinese: q.hanzi, pinyin: q.pinyin, choices: q.choices, correctIndex: q.correctIndex,
});

const toQuestion = (w: BattleWord): BattleQuestion => ({
  hanzi: w.chinese, pinyin: w.pinyin, choices: w.choices, correctIndex: w.correctIndex,
  correctMeaning: w.choices[w.correctIndex] ?? '',
});

/** Document partagé → forme attendue par l'écran. */
function toBattle(id: string, m: BattleMatch): Battle {
  const finished = (a: BattleAnswer[]) =>
    a.length >= ROUNDS ? new Date(m.finishedAt ?? Date.now()).toISOString() : null;
  const answersOf = (a: BattleAnswer[]) =>
    Object.fromEntries(a.map(x => [x.roundIdx, x.choiceIdx]));

  return {
    id,
    status: m.status === 'finished' ? 'finished' : 'active',
    createdBy: m.p1.uid,
    createdAt: new Date(m.startedAt).toISOString(),
    players: {
      [m.p1.uid]: { displayName: m.p1.displayName, score: m.p1Score, finishedAt: finished(m.p1Answers) },
      [m.p2.uid]: { displayName: m.p2.displayName, score: m.p2Score, finishedAt: finished(m.p2Answers) },
    },
    playerIds: [m.p1.uid, m.p2.uid],
    questions: (m.words ?? []).map(toQuestion),
    answers: { [m.p1.uid]: answersOf(m.p1Answers ?? []), [m.p2.uid]: answersOf(m.p2Answers ?? []) },
    // 'draw' côté web = match nul ; l'écran attend null pour ce cas.
    winnerId: m.winner === 'draw' ? null : m.winner,
    startedAt: new Date(m.startedAt).toISOString(),
  };
}

// ─── Matchmaking ──────────────────────────────────────────────────────────────

/**
 * Met le joueur en file et attend un adversaire.
 *
 * Deux voies mènent au match, et c'est voulu : on écoute sa propre entrée (un
 * autre joueur peut nous apparier) tout en cherchant activement un candidat.
 * La transaction tranche si les deux se réservent en même temps.
 *
 * Résout `null` au bout de QUEUE_TIMEOUT_MS — à l'appelant de basculer sur le
 * bot. L'entrée de file est retirée dans tous les cas.
 */
export async function findOrCreateBattle(
  uid: string,
  displayName: string,
  photoURL: string | null = null,
  language: 'fr' | 'en' = 'fr',
): Promise<{ battleId: string; isCreator: boolean } | null> {
  if (!db) throw new Error('Firebase non disponible');
  const database = db;

  const myRef = doc(database, 'battleQueue', uid);
  const entry: BattleQueueEntry = {
    uid, displayName, photoURL,
    queuedAt: Date.now(),
    vocabLevel: 0,
    matchId: null,
    language,
  };
  await setDoc(myRef, entry);

  return new Promise(resolve => {
    let done = false;
    let unsubOwn: Unsubscribe | null = null;
    let poll: ReturnType<typeof setInterval> | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const finish = async (result: { battleId: string; isCreator: boolean } | null) => {
      if (done) return;
      done = true;
      unsubOwn?.();
      if (poll) clearInterval(poll);
      if (timer) clearTimeout(timer);
      // On retire toujours son entrée : une file jonchée d'entrées mortes
      // fait échouer les appariements suivants.
      await deleteDoc(myRef).catch(() => {});
      resolve(result);
    };

    // Voie 1 — quelqu'un nous apparie : notre entrée reçoit un matchId.
    unsubOwn = onSnapshot(myRef, snap => {
      const data = snap.data() as BattleQueueEntry | undefined;
      if (data?.matchId) void finish({ battleId: data.matchId, isCreator: false });
    });

    // Voie 2 — on cherche un candidat et on tente de le réserver.
    const hunt = async () => {
      if (done) return;
      try {
        const snap = await getDocs(query(
          collection(database, 'battleQueue'),
          where('matchId', '==', null),
          limit(10),
        ));
        const candidate = snap.docs
          .map(d => d.data() as BattleQueueEntry)
          .find(e => e.uid !== uid);
        if (!candidate) return;

        const questions = generateBattleQuestions(ROUNDS);
        if (questions.length < ROUNDS) return;

        const matchRef = doc(collection(database, 'battleMatches'));
        const oppRef = doc(database, 'battleQueue', candidate.uid);

        const ok = await runTransaction(database, async tx => {
          const mine = await tx.get(myRef);
          const theirs = await tx.get(oppRef);
          if (!mine.exists() || !theirs.exists()) return false;
          const a = mine.data() as BattleQueueEntry;
          const b = theirs.data() as BattleQueueEntry;
          // Réservation perdue : l'un des deux est déjà apparié.
          if (a.matchId || b.matchId) return false;

          const match: BattleMatch = {
            id: matchRef.id,
            status: 'active',
            p1: { uid, displayName, photoURL },
            p2: { uid: b.uid, displayName: b.displayName, photoURL: b.photoURL },
            words: questions.map(toWord),
            p1Answers: [], p2Answers: [],
            p1Score: 0, p2Score: 0,
            // null, jamais undefined : Firestore refuse undefined, et
            // l'exception faisait basculer la partie sur le bot en silence.
            winner: null,
            startedAt: Date.now(),
            finishedAt: null,
            language,
          };
          tx.set(matchRef, match);
          tx.update(myRef, { matchId: matchRef.id });
          tx.update(oppRef, { matchId: matchRef.id });
          return true;
        });

        if (ok) void finish({ battleId: matchRef.id, isCreator: true });
      } catch {
        // Transaction perdue ou lecture refusée : la prochaine passe réessaie.
      }
    };

    void hunt();
    poll = setInterval(hunt, 2000);
    timer = setTimeout(() => void finish(null), QUEUE_TIMEOUT_MS);
  });
}

/** Quitte la file sans avoir été apparié. */
export async function cancelBattle(uidOrBattleId: string): Promise<void> {
  if (!db) return;
  await deleteDoc(doc(db, 'battleQueue', uidOrBattleId)).catch(() => {});
}

// ─── Écoute ───────────────────────────────────────────────────────────────────

export function listenBattle(
  battleId: string,
  onUpdate: (battle: Battle | null) => void,
): Unsubscribe {
  if (!db) return () => {};
  return onSnapshot(doc(db, 'battleMatches', battleId), snap => {
    if (!snap.exists()) { onUpdate(null); return; }
    onUpdate(toBattle(snap.id, snap.data() as BattleMatch));
  });
}

// ─── Actions ──────────────────────────────────────────────────────────────────

/**
 * Enregistre une réponse.
 *
 * Transaction plutôt qu'`arrayUnion` : deux réponses au même round doivent se
 * remplacer, pas s'empiler, et le score se recalcule à partir du tableau — un
 * `increment()` divergerait du tableau en cas de renvoi.
 */
export async function submitAnswer(
  battleId: string,
  uid: string,
  questionIndex: number,
  choiceIndex: number,
  isCorrect: boolean,
  timeMs = 0,
): Promise<void> {
  if (!db) return;
  const ref = doc(db, 'battleMatches', battleId);
  await runTransaction(db, async tx => {
    const snap = await tx.get(ref);
    if (!snap.exists()) return;
    const m = snap.data() as BattleMatch;
    const side = m.p1.uid === uid ? 'p1' : m.p2.uid === uid ? 'p2' : null;
    if (!side) return;

    const key = `${side}Answers` as 'p1Answers' | 'p2Answers';
    const answers = [...(m[key] ?? [])].filter(a => a.roundIdx !== questionIndex);
    answers.push({ roundIdx: questionIndex, choiceIdx: choiceIndex, correct: isCorrect, timeMs });
    answers.sort((a, b) => a.roundIdx - b.roundIdx);

    tx.update(ref, {
      [key]: answers,
      [`${side}Score`]: answers.filter(a => a.correct).length,
    });
  }).catch(() => {});
}

/**
 * Clôt la partie pour ce joueur, et la partie entière si l'adversaire a fini.
 *
 * Le gagnant se calcule dans la transaction, sur les scores du document — pas
 * sur ceux de l'écran, qui ne connaît son adversaire qu'avec un temps de retard.
 */
export async function finishPlayerBattle(
  battleId: string,
  uid: string,
  _finalScore?: number,
  _allPlayerIds?: string[],
  _playerScores?: Record<string, number>,
): Promise<void> {
  if (!db) return;
  const ref = doc(db, 'battleMatches', battleId);
  await runTransaction(db, async tx => {
    const snap = await tx.get(ref);
    if (!snap.exists()) return;
    const m = snap.data() as BattleMatch;
    if (m.status === 'finished') return;
    if ((m.p1Answers?.length ?? 0) < ROUNDS || (m.p2Answers?.length ?? 0) < ROUNDS) return;

    const winner = m.p1Score > m.p2Score ? m.p1.uid
                 : m.p2Score > m.p1Score ? m.p2.uid
                 : 'draw';
    tx.update(ref, { status: 'finished', winner, finishedAt: Date.now() });
  }).catch(() => {});
}

/** Détermine le gagnant local depuis les scores. */
export function computeWinner(
  playerIds: string[],
  scores: Record<string, number>,
): string | null {
  if (playerIds.length < 2) return playerIds[0] ?? null;
  const [a, b] = playerIds;
  if (scores[a] > scores[b]) return a;
  if (scores[b] > scores[a]) return b;
  return null;
}

/**
 * Conservée pour l'écran, mais sans effet : la clôture est décidée dans la
 * transaction de `finishPlayerBattle`, qui voit les deux scores. Laisser le
 * client publier son propre verdict ouvrirait la porte à deux vainqueurs.
 */
export async function publishBattleResult(
  _battleId: string,
  _winnerId: string | null,
): Promise<void> {
  /* volontairement vide — voir finishPlayerBattle */
}
