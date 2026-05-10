/**
 * devBot.ts — Bot fictif exclusivement activé en mode DEV (task #56)
 * -------------------------------------------------------------------
 * Permet aux comptes admin (NoComment) de tester la fonctionnalité
 * "Bataille de mots" sans avoir besoin d'un second utilisateur réel :
 *
 *   1. Le bot apparaît dans le classement `Classement` comme un profil
 *      supplémentaire injecté côté client (PAS stocké dans Firestore).
 *   2. Sur `Batailles`, un bouton "Défier le bot (DEV)" crée directement
 *      un match Firestore `battleMatches/{id}` où p1 = user et p2 = bot.
 *      Aucune queue, aucun adversaire réel requis.
 *   3. Pendant la session, le client de l'user joue AUSSI les réponses du
 *      bot : on écrit dans `p2Answers` avec un petit délai et un taux de
 *      bonnes réponses paramétrable, pour simuler un adversaire plausible.
 *
 * Sécurité : les règles Firestore autorisent p1 et p2 à écrire sur le match
 * (rules.battleMatches update). Comme c'est le client de l'user qui pilote
 * les deux côtés, aucune modif de rules n'est nécessaire.
 *
 * L'uid du bot est préfixé `__devbot_` pour le distinguer : on peut ainsi
 * filtrer ou détecter les docs bot côté admin.
 */

import type {
  BattleMatch,
  BattlePlayerSnapshot,
  BattleWord,
  CommunityLanguage,
  PublicProfile
} from '../types/community';
import { getWeekStart } from '../types/community';

/** Uid stable et unique du bot DEV. Jamais collisionnable avec un vrai uid Firebase. */
export const DEV_BOT_UID = '__devbot_xiaolong__';

/** Display name + photo. Le suffixe (DEV) est volontaire pour qu'on l'identifie dans l'UI. */
export const DEV_BOT_DISPLAY_NAME = '小龙 (Bot DEV)';
export const DEV_BOT_PHOTO_URL: string | null = null; // avatar fallback → initiales "小" sur fond rouge

/** Snapshot utilisé pour p1/p2 dans un BattleMatch. */
export const DEV_BOT_PLAYER: BattlePlayerSnapshot = {
  uid: DEV_BOT_UID,
  displayName: DEV_BOT_DISPLAY_NAME,
  photoURL: DEV_BOT_PHOTO_URL
};

/** true si l'un des deux joueurs du match est le bot DEV. */
export const isDevBotMatch = (match: BattleMatch | null | undefined): boolean => {
  if (!match) return false;
  return match.p1.uid === DEV_BOT_UID || match.p2.uid === DEV_BOT_UID;
};

/**
 * Profil public synthétique du bot à injecter dans le classement côté client.
 *
 * Valeurs choisies pour que le bot soit un adversaire "crédible mais pas
 * dominant" : ~6 800 XP (rang Étudiant), 12 batailles gagnées, streak 7j.
 * Si tu veux ajuster, c'est localement — aucune écriture Firestore.
 */
export const buildDevBotPublicProfile = (
  language: CommunityLanguage = 'fr'
): PublicProfile => ({
  uid: DEV_BOT_UID,
  displayName: DEV_BOT_DISPLAY_NAME,
  photoURL: DEV_BOT_PHOTO_URL,
  totalXp: 6_842,
  streakCurrent: 7,
  streakBest: 18,
  vocabSize: 312,
  lessonsCompleted: 28,
  weeklyXp: 420,
  weekStart: getWeekStart(),
  battlesPlayed: 22,
  battlesWon: 12,
  battlesDraw: 3,
  lastActiveAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  language
});

// ===========================================================================
//  Logique d'auto-play : réponse du bot pour un round donné
// ===========================================================================

export interface BotAnswerPlan {
  /** Index de la réponse que le bot va poser (0..3), ou -1 pour simuler un timeout. */
  choiceIdx: number;
  /** Délai en ms avant que le bot ne poste sa réponse. */
  delayMs: number;
  /** Vrai si le bot "aurait" trouvé la bonne réponse (pour stats internes). */
  correct: boolean;
}

export interface DevBotDifficulty {
  /** Probabilité 0..1 que le bot donne la bonne réponse (par défaut 0.65). */
  correctRate: number;
  /** Plage de délai en ms [min, max] (défaut 2200..4800). */
  delayRangeMs: [number, number];
  /** Probabilité 0..1 que le bot time out (défaut 0.05). */
  timeoutRate: number;
}

export const DEFAULT_BOT_DIFFICULTY: DevBotDifficulty = {
  correctRate: 0.65,
  // Aligné sur ROUND_DURATION_MS (6 s) : le bot prend son temps pour laisser
  // à l'user le temps de lire les propositions, et simule un adversaire humain
  // plausible (pas un speedrun).
  delayRangeMs: [2200, 4800],
  timeoutRate: 0.05
};

const pickRandomIn = (min: number, max: number): number =>
  Math.floor(min + Math.random() * Math.max(0, max - min));

/**
 * Calcule le plan de réponse du bot pour un round donné.
 * Pure : dépend uniquement de `word` + `difficulty` + Math.random().
 */
export const planBotAnswer = (
  word: BattleWord,
  difficulty: DevBotDifficulty = DEFAULT_BOT_DIFFICULTY
): BotAnswerPlan => {
  const roll = Math.random();
  if (roll < difficulty.timeoutRate) {
    // Le bot "rate" le round (timeout). Délai aligné sur la durée du round
    // côté client (ROUND_DURATION_MS = 6 s) pour simuler un vrai time-out.
    return {
      choiceIdx: -1,
      delayMs: 6000,
      correct: false
    };
  }
  const correct = Math.random() < difficulty.correctRate;
  const choiceIdx = correct
    ? word.correctIndex
    : pickWrongIndex(word.correctIndex, word.choices.length);
  const [minD, maxD] = difficulty.delayRangeMs;
  return {
    choiceIdx,
    delayMs: pickRandomIn(minD, maxD),
    correct
  };
};

const pickWrongIndex = (correctIdx: number, total: number): number => {
  if (total <= 1) return 0;
  let pick = Math.floor(Math.random() * (total - 1));
  if (pick >= correctIdx) pick += 1;
  return Math.max(0, Math.min(total - 1, pick));
};
