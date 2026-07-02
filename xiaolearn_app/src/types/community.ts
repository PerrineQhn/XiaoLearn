/**
 * community.ts — Types et helpers partagés pour la section Communauté
 * --------------------------------------------------------------------
 * Couvre trois domaines :
 *   1. `PublicProfile`   — document Firestore `publicProfiles/{uid}` — snapshot
 *      publiable des stats d'un utilisateur (pour classement + matchmaking).
 *   2. `RANK_TIERS`      — système de rangs (Apprenti / Étudiant / Guerrier /
 *      Maître / Légende) basé sur l'XP total, avec helper `getRankFromXp`.
 *   3. `BattleMatch`, `BattleQueueEntry`, `BattleWord`, `BattleAnswer` — schéma
 *      des docs Firestore pour le matchmaking temps-réel et les parties.
 *
 * Aucune dépendance externe ici : ce module peut être importé par des hooks ET
 * par du code non-React (utils pures, scripts). Les helpers sont pures.
 *
 * Security rules associées : voir /FIRESTORE_RULES.md à la racine.
 */

export type CommunityLanguage = 'fr' | 'en';

// ===========================================================================
//  RANGS
// ===========================================================================

export type RankName = 'Apprenti' | 'Étudiant' | 'Guerrier' | 'Maître' | 'Légende';

export interface RankTier {
  min: number;
  max: number; // inclusif ; Infinity pour Légende
  name: RankName;
  nameEn: string;
  emoji: string;
  color: string;
}

/**
 * Paliers XP pour les rangs. Conforme à la spec task #44 :
 *   Apprenti 0-1.9k / Étudiant 2k-9.9k / Guerrier 10k-29.9k /
 *   Maître 30k-49.9k / Légende 50k+.
 */
export const RANK_TIERS: RankTier[] = [
  { min: 0, max: 1999, name: 'Apprenti', nameEn: 'Apprentice', emoji: '🌱', color: '#7a8b83' },
  { min: 2000, max: 9999, name: 'Étudiant', nameEn: 'Student', emoji: '📘', color: '#2f8f6b' },
  { min: 10000, max: 29999, name: 'Guerrier', nameEn: 'Warrior', emoji: '⚔️', color: '#d4a537' },
  { min: 30000, max: 49999, name: 'Maître', nameEn: 'Master', emoji: '🥋', color: '#c6302c' },
  { min: 50000, max: Number.POSITIVE_INFINITY, name: 'Légende', nameEn: 'Legend', emoji: '🐉', color: '#7b2cbf' }
];

export interface RankInfo {
  tier: RankTier;
  /** Rang suivant, `null` si tu es déjà Légende. */
  next: RankTier | null;
  /** XP manquants pour atteindre le rang suivant, `null` si aucun. */
  toNext: number | null;
  /** Progression 0-100 vers le rang suivant. 100 si Légende. */
  progressPct: number;
}

/**
 * Renvoie le rang courant + progression vers le suivant. Pure, testable.
 *
 * Exemples :
 *   getRankFromXp(0).tier.name       === 'Apprenti'
 *   getRankFromXp(1999).tier.name    === 'Apprenti'
 *   getRankFromXp(2000).tier.name    === 'Étudiant'
 *   getRankFromXp(50_000).tier.name  === 'Légende'
 *   getRankFromXp(50_000).next       === null
 */
export const getRankFromXp = (totalXp: number): RankInfo => {
  const xp = Math.max(0, Math.floor(totalXp) || 0);
  const tier =
    RANK_TIERS.find((r) => xp >= r.min && xp <= r.max) ?? RANK_TIERS[0];
  const idx = RANK_TIERS.indexOf(tier);
  const next = RANK_TIERS[idx + 1] ?? null;

  let progressPct = 100;
  let toNext: number | null = null;
  if (next) {
    toNext = Math.max(0, next.min - xp);
    const span = next.min - tier.min;
    const done = xp - tier.min;
    progressPct = span > 0 ? Math.min(100, Math.max(0, Math.round((done / span) * 100))) : 0;
  }

  return { tier, next, toNext, progressPct };
};

export const rankLabel = (rank: RankName, language: CommunityLanguage): string => {
  if (language === 'en') {
    return RANK_TIERS.find((r) => r.name === rank)?.nameEn ?? rank;
  }
  return rank;
};

// ===========================================================================
//  PROFIL PUBLIC
// ===========================================================================

/**
 * Document Firestore `publicProfiles/{uid}`. C'est la projection *publiable*
 * d'un utilisateur : aucune donnée sensible (email, ids, content privé) ne
 * doit s'y retrouver. Elle alimente le leaderboard et le matchmaking.
 *
 * Mise à jour : via `usePublicProfileSync` qui merge les champs dès qu'ils
 * changent localement. Sur les stats exprimées en XP, on privilégie les
 * writes max (cloud vs local) pour ne jamais régresser en cas de re-sync.
 */
export interface PublicProfile {
  uid: string;
  displayName: string;
  photoURL: string | null;

  // --- Progression globale ------------------------------------------------
  totalXp: number;
  streakCurrent: number;
  streakBest: number;
  vocabSize: number;            // nombre de mots "appris" (flashcards unlocked)
  lessonsCompleted: number;     // nombre total de leçons terminées
  weeklyXp: number;             // XP gagnés sur la semaine ISO en cours
  weekStart: string;            // ISO YYYY-MM-DD du lundi de weeklyXp

  // --- Batailles ----------------------------------------------------------
  battlesPlayed: number;
  battlesWon: number;
  battlesDraw: number;

  // --- Méta ---------------------------------------------------------------
  /** ISO datetime — source de vérité pour "activité récente" / "actif en ligne". */
  lastActiveAt: string;
  /** ISO datetime — dernier écrit, utile pour debug et ordonnancement queue. */
  updatedAt: string;
  /** Langue préférée de l'UI (propagée pour éviter de charger le mauvais côté). */
  language: CommunityLanguage;
}

// ===========================================================================
//  BATAILLES — MATCHMAKING ET PARTIE
// ===========================================================================

/**
 * Entrée dans la file d'attente `battleQueue/{uid}`. Le matchmaker côté client
 * lit cette collection, trouve un autre user `matchId == null`, et, dans une
 * transaction, crée un `battleMatches/{id}` + met à jour les 2 entrées de
 * queue avec le matchId résultant.
 *
 * L'entrée est supprimée dès qu'elle est matchée (cleanup côté client).
 * En cas de timeout (15 s), le client supprime aussi sa propre entrée.
 */
export interface BattleQueueEntry {
  uid: string;
  displayName: string;
  photoURL: string | null;
  /** Date.now() du moment où l'entrée a été créée. Utilisé pour FIFO. */
  queuedAt: number;
  /** Niveau approximatif pour pairing doux (on pige large pour l'instant). */
  vocabLevel: number;
  /** Rempli par la transaction de matching. `null` = en attente. */
  matchId: string | null;
  language: CommunityLanguage;
}

export interface BattleWord {
  /** Hanzi cible à traduire (une ou plusieurs syllabes). */
  chinese: string;
  /** Pinyin (affiché en petit sous le hanzi pour aider). */
  pinyin: string;
  /** Index de la bonne réponse dans `choices`. */
  correctIndex: number;
  /** 4 choix mélangés (dans la langue de l'user — FR ou EN). */
  choices: string[];
}

export interface BattleAnswer {
  /** Round courant (0..n-1). */
  roundIdx: number;
  /** Index de la réponse choisie, -1 si timeout. */
  choiceIdx: number;
  /** true si `choiceIdx === word.correctIndex`. */
  correct: boolean;
  /** Temps de réponse en ms (max 3000). */
  timeMs: number;
}

export interface BattlePlayerSnapshot {
  uid: string;
  displayName: string;
  photoURL: string | null;
}

/**
 * Document Firestore `battleMatches/{matchId}`. Créé par la transaction de
 * matchmaking, rempli au fil de la partie. `p1` est toujours l'initiateur du
 * match (celui qui a "claim" l'autre via transaction).
 *
 * Gère 10 rounds ; chaque client écrit ses propres réponses dans son tableau.
 * `status` passe de 'active' à 'finished' quand les 2 tableaux ont 10 items
 * (ou qu'un abandon est détecté — timeout serveur 5 min).
 */
export interface BattleMatch {
  id: string;
  status: 'active' | 'finished' | 'abandoned';
  p1: BattlePlayerSnapshot;
  p2: BattlePlayerSnapshot;
  words: BattleWord[];
  p1Answers: BattleAnswer[];
  p2Answers: BattleAnswer[];
  p1Score: number;
  p2Score: number;
  /** uid gagnant, 'draw', ou null tant que non terminé. */
  winner: string | 'draw' | null;
  startedAt: number;  // Date.now()
  finishedAt: number | null;
  language: CommunityLanguage;
}

/** Score brut à afficher au joueur (prend en compte réponses + timing). */
export const scoreForAnswer = (answer: BattleAnswer): number => {
  if (!answer.correct) return 0;
  // 1 point par bonne réponse — conforme à la spec Seonsaengnim (1 pt/round).
  // Le bonus vitesse est visuel mais n'affecte pas le score brut.
  return 1;
};

/** Calcul pour reward d'XP : 0 si défaite, 30 si victoire, 50 si perfect. */
export const battleXpReward = (
  myScore: number,
  oppScore: number,
  totalRounds: number
): { xp: number; outcome: 'win' | 'loss' | 'draw'; perfect: boolean } => {
  const perfect = myScore === totalRounds && oppScore < totalRounds;
  if (myScore > oppScore) {
    return { xp: perfect ? 50 : 30, outcome: 'win', perfect };
  }
  if (myScore < oppScore) {
    return { xp: 0, outcome: 'loss', perfect: false };
  }
  return { xp: 10, outcome: 'draw', perfect: false };
};

// ===========================================================================
//  HELPERS DE DATES
// ===========================================================================

/** Lundi de la semaine ISO contenant `date`, au format YYYY-MM-DD. */
export const getWeekStart = (date: Date = new Date()): string => {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = (d.getUTCDay() + 6) % 7; // Lundi = 0
  d.setUTCDate(d.getUTCDate() - dayNum);
  return d.toISOString().slice(0, 10);
};

/** Mise à jour incrémentale de weeklyXp : reset si la semaine a changé. */
export const rollWeeklyXp = (
  prev: { weeklyXp: number; weekStart: string } | null,
  deltaXp: number,
  now: Date = new Date()
): { weeklyXp: number; weekStart: string } => {
  const currentWeek = getWeekStart(now);
  if (!prev || prev.weekStart !== currentWeek) {
    return { weeklyXp: Math.max(0, deltaXp), weekStart: currentWeek };
  }
  return {
    weeklyXp: Math.max(0, (prev.weeklyXp ?? 0) + deltaXp),
    weekStart: currentWeek
  };
};
