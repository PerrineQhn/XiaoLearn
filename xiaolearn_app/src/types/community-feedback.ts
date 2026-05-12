/**
 * community-feedback.ts — types pour Idées & Roadmap + Conversations
 * --------------------------------------------------------------------
 * Distinct de `community.ts` (qui contient les types Leaderboard / Battles)
 * pour garder un découpage clair.
 *
 * Collections Firestore correspondantes :
 *
 *   community_ideas/{ideaId}             — propositions d'idées des users
 *   community_ideas/{ideaId}/votes/{uid} — votes (un par user, idempotent)
 *   community_roadmap/{milestoneId}      — jalons curatés par admin (read-only user)
 *
 *   conversations/{convId}               — métadonnées thread 1-1
 *   conversations/{convId}/messages/{msgId}
 */

import type { Timestamp } from 'firebase/firestore';

// ============================================================================
//  IDÉES & ROADMAP
// ============================================================================

export type IdeaCategory =
  | 'audio'
  | 'leçons'
  | 'interface'
  | 'flashcards'
  | 'gamification'
  | 'culture'
  | 'autres';

export type IdeaStatus = 'pending' | 'validated' | 'in-dev' | 'delivered' | 'rejected';

/**
 * Doc Firestore `community_ideas/{ideaId}`.
 * Les timestamps sont stockés comme `serverTimestamp()` côté écriture,
 * et lus comme `Timestamp` côté Firestore SDK. On les expose en `string`
 * (ISO) au niveau UI pour limiter le couplage Firestore.
 */
export interface CommunityIdea {
  id: string;
  title: string;
  description: string;
  category: IdeaCategory;
  status: IdeaStatus;
  authorId: string;
  authorName: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  /** Compteur denormalisé incrémenté via Cloud Function — fallback : recalcul depuis sous-collection. */
  voteCount: number;
  /** Date estimée si l'admin a planifié la livraison (pour la roadmap). */
  expectedDate?: string;
}

/** Document `community_ideas/{ideaId}/votes/{uid}`. */
export interface IdeaVote {
  uid: string;
  votedAt: string;
}

export interface RoadmapMilestone {
  id: string;
  /** Titre court (4-6 mots max). */
  title: string;
  /** Description optionnelle, affichée en tooltip ou en card details. */
  description?: string;
  status: 'delivered' | 'in-dev' | 'planned' | 'upcoming';
  /** Date ISO. Utilisée pour l'ordre sur la timeline. */
  date: string;
}

// ============================================================================
//  CONVERSATIONS
// ============================================================================

export interface ConversationParticipant {
  uid: string;
  displayName: string;
  avatarUrl?: string;
}

/** Doc Firestore `conversations/{convId}`. */
export interface Conversation {
  id: string;
  participantIds: string[];
  /** Map { uid: displayName } pour affichage rapide sans aller-retour. */
  participantNames: Record<string, string>;
  participantAvatars?: Record<string, string>;
  /** Aperçu du dernier message — affiché dans la liste. */
  lastMessage?: {
    text: string;
    senderId: string;
    sentAt: string; // ISO
  };
  lastMessageAt: string; // ISO
  /** Compteur non-lus par user. */
  unreadCount: Record<string, number>;
  createdAt: string;
}

/** Doc Firestore `conversations/{convId}/messages/{msgId}`. */
export interface ConversationMessage {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  sentAt: string; // ISO
  /** UIDs ayant lu le message. */
  readBy: string[];
}

// ============================================================================
//  HELPERS
// ============================================================================

export const IDEA_CATEGORIES: IdeaCategory[] = [
  'audio',
  'leçons',
  'interface',
  'flashcards',
  'gamification',
  'culture',
  'autres'
];

export const IDEA_CATEGORY_LABELS: Record<IdeaCategory, { fr: string; en: string }> = {
  audio: { fr: 'Audio / Prononciation', en: 'Audio / Pronunciation' },
  'leçons': { fr: 'Leçons', en: 'Lessons' },
  interface: { fr: 'Interface', en: 'Interface' },
  flashcards: { fr: 'Flashcards', en: 'Flashcards' },
  gamification: { fr: 'Gamification', en: 'Gamification' },
  culture: { fr: 'Culture', en: 'Culture' },
  autres: { fr: 'Autres', en: 'Other' }
};

/** Conversion Firestore Timestamp | string → ISO string. */
export const tsToIso = (ts: Timestamp | string | null | undefined): string => {
  if (!ts) return new Date().toISOString();
  if (typeof ts === 'string') return ts;
  try {
    return ts.toDate().toISOString();
  } catch {
    return new Date().toISOString();
  }
};

/** Calcule l'ID d'une conversation 1-1 — tri lexico des UIDs pour idempotence. */
export const buildConversationId = (uidA: string, uidB: string): string => {
  return [uidA, uidB].sort().join('_');
};

export const IDEA_TITLE_MAX = 80;
export const IDEA_DESCRIPTION_MAX = 1500;
export const MESSAGE_MAX_LENGTH = 2000;
