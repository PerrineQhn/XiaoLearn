/**
 * FlashcardPageV5.tsx — Flashcards V9.2 (XiaoLearn, parité Seonsaengnim)
 * -----------------------------------------------------------------------
 * Refonte visuelle complète inspirée de la vraie page Seonsaengnim
 * (inspectée dans Chrome MCP). Les gains fonctionnels de V4 (5 modes,
 * badges, heatmap, WOTD, SRS) sont préservés — la seule chose qui change
 * est le layout et la palette.
 *
 * Changements vs V4 :
 *   1. Header + tabs "Mots (N) / Phrases (N)" + actions "Ajouter" / "Étudier maintenant"
 *   2. Stats : 4 cards prominents horizontaux (Total / Maîtrisés / À revoir / Maîtrise %)
 *   3. Search inline + pills sources (scrollable horizontal)
 *   4. Decks en grid 3 colonnes, progress bar + status ("Pas encore étudié" / "En cours" / "Maîtrisé")
 *   5. Session setup : *modal* avec 3 tiles (Révisions / Nouveaux / Difficiles) + count + direction
 *   6. Identité XiaoLearn conservée : rouge temple (#D8483E), jade (#2F9D8A),
 *      gold (#F0B762), fond cream/peach hérité de `App.css --app-bg`.
 *
 * Drop-in par-dessus V4 : mêmes props, mêmes hooks. Il suffit de remplacer
 * `FlashcardPageV4` par `FlashcardPageV5` dans App.tsx.
 *
 * Styles : `../styles/flashcards-v5.css` (préfixe fc5-*, isolation stricte).
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import type {
  FlashcardV2Item,
  FlashcardV2CustomList,
  FlashcardsV2HskLevel
} from './FlashcardPageV2';
import type {
  FlashcardDirection,
  SentenceFlashcard
} from '../types/flashcard-v3';
import type {
  CreatePersonalInput,
  UsePersonalFlashcardsReturn
} from '../hooks/usePersonalFlashcards';
import { lookupPinyinForHanzi } from './FlashcardPageV3';
import {
  type FlashcardSessionSummary,
  type WordOfTheDay
} from '../types/flashcard-v4';
import { useDailyActivity } from '../hooks/useDailyActivity';
import {
  useFlashcardBadges,
  countEarnedBadges,
  TOTAL_BADGES
} from '../hooks/useFlashcardBadges';
import { SessionView } from '../components/FlashcardV4/SessionView';
import type { StudyCard } from '../components/FlashcardV4/StudyModeComponents';
import { playHanziAudio } from '../utils/audio';
import '../styles/flashcards-v2.css';
import '../styles/flashcards-v3.css';
import '../styles/flashcards-v4.css'; // ⚠ requis : session/flip/mcq/typing utilisent les classes fc4-*
import '../styles/flashcards-v5.css';

// ============================================================================
//  PROPS
// ============================================================================

export type FlashcardPageV5Language = 'fr' | 'en';

/**
 * Métadonnées d'une leçon vue par l'utilisateur, dans la forme minimale
 * nécessaire pour construire les decks Flashcards. Alimentée par App.tsx
 * depuis `cecrPathsState` + `lessonProgress`.
 */
export interface FlashcardLessonSource {
  /** ID canonique de la leçon (ex. "a1-ni-hao"). */
  id: string;
  /** Titre affiché. */
  title: string;
  /** Titre EN (optionnel). */
  titleEn?: string;
  /** Niveau HSK d'origine (1..7). Converti en CEFR côté page. */
  hskLevel: number;
  /** IDs des LessonItems (vocabulaire) de la leçon, dans l'ordre. */
  itemIds: string[];
  /** `true` si la leçon est complétée (affecte la mise en avant). */
  completed?: boolean;
}

export interface FlashcardPageV5Props {
  wordItems: FlashcardV2Item[];
  sentenceCards?: SentenceFlashcard[];
  personalHook?: UsePersonalFlashcardsReturn;
  language?: FlashcardPageV5Language;
  customLists?: FlashcardV2CustomList[];
  dueIds?: Set<string> | string[];
  masteredIds?: Set<string> | string[];
  difficultIds?: Set<string> | string[];
  /** Leçons vues par l'utilisateur — source canonique des decks.
   *  Si absent, fallback sur le groupement level×theme (legacy). */
  lessonsFromUser?: FlashcardLessonSource[];
  onRate?: (cardId: string, quality: 1 | 2 | 3 | 4) => void;
  /** Callback optionnel pour ouvrir un flow "Ajouter une carte perso". */
  onAddCard?: () => void;
  /** Legacy V3 fallbacks (conservés pour compat, non utilisés). */
  onStartGlobalReview?: (direction: FlashcardDirection) => void;
  onStartSentenceReview?: (direction: FlashcardDirection) => void;
  onStartPersonalReview?: (direction: FlashcardDirection) => void;
}

// ============================================================================
//  COPIES
// ============================================================================

const COPY = {
  fr: {
    title: 'Flashcards',
    tabWords: 'Mots',
    tabSentences: 'Phrases',
    wordUnit: 'mots',
    sentenceUnit: 'phrases',
    btnAdd: '+ Ajouter',
    btnStudyNow: '⚡ Étudier maintenant',
    srsCardKicker: 'Répétition espacée',
    srsCardTitle: (n: number, unit: string) =>
      `${n} ${unit} à revoir aujourd'hui`,
    srsCardSub:
      "Ces cartes risquent d'être oubliées. Il est temps de rafraîchir ta mémoire.",
    srsCardCta: 'Réviser maintenant →',
    statTotal: 'Total 📇',
    statMastered: 'Maîtrisés ✅',
    statDue: 'À revoir 🔄',
    statMastery: 'Maîtrise 📈',
    searchPlaceholder: 'Rechercher un mot en chinois, pinyin ou français…',
    sourceAll: 'Tous',
    sourceMastered: 'Maîtrisés ✅',
    sourceInProgress: 'En cours 🔄',
    sourceNew: 'Nouveaux ⭐',
    sourceDifficult: 'Difficiles 🔴',
    sourceLessons: 'Leçons 📖',
    sourceSentences: 'Phrases 💬',
    sourcePersonal: 'Mes cartes ✏️',
    sourceWotd: 'Mot du jour 🌟',
    decksTitle: 'Mes decks',
    decksEmpty: 'Aucun deck pour le moment — termine une leçon pour en débloquer.',
    deckTitlePrefix: 'Leçon :',
    deckMixedLabel: 'Divers',
    deckStudy: 'Étudier',
    deckWords: 'mots',
    deckNew: 'nouveaux',
    deckStatusNew: 'Pas encore étudié',
    deckStatusProgress: 'En cours',
    deckStatusMastered: 'Maîtrisé',
    deckLastStudiedNever: 'Pas encore étudié',
    deckLastStudiedRelative: (label: string) => `Étudié ${label}`,
    // Deck detail
    deckBack: '← Retour aux collections',
    deckStudyCta: 'Étudier la collection',
    deckMasteryLabel: 'maîtrise',
    deckChipMastered: (n: number) => `✅ ${n} maîtrisé${n > 1 ? 's' : ''}`,
    deckChipProgress: (n: number) => `🔄 ${n} en cours`,
    deckChipNew: (n: number) => `⭐ ${n} nouveau${n > 1 ? 'x' : ''}`,
    deckChipDifficult: (n: number) => `🔴 ${n} difficile${n > 1 ? 's' : ''}`,
    deckFilterAll: 'Tous',
    deckFilterMastered: 'Maîtrisés ✅',
    deckFilterProgress: 'En cours 🔄',
    deckFilterNew: 'Nouveaux ⭐',
    deckFilterDifficult: 'Difficiles 🔴',
    deckTableStatus: 'Statut',
    deckTableWord: 'Mot',
    deckTableTrans: 'Traduction',
    deckTableActions: 'Actions',
    deckWordStatusMastered: 'Maîtrisé',
    deckWordStatusProgress: 'En cours',
    deckWordStatusNew: 'Nouveau',
    deckWordStatusDifficult: 'Difficile',
    deckTableEmpty: 'Aucun mot dans ce filtre.',
    deckActionListen: 'Écouter',
    deckActionStar: 'Marquer difficile',
    // Flat table (Seonsaengnim-style list view)
    flatColStatus: 'STATUT',
    flatColWord: 'MOT',
    flatColTrans: 'TRADUCTION',
    flatColSource: 'SOURCE',
    flatStudyCta: 'Étudier →',
    flatEmpty: 'Aucune carte pour ce filtre.',
    flatSourceLesson: (title: string) => `📖 Leçon : ${title}`,
    flatSourceSentence: (title: string) => `💬 ${title}`,
    flatTitleWordsAll: 'Tous les mots',
    flatTitleWordsMastered: 'Mots maîtrisés',
    flatTitleWordsInProgress: 'Mots en cours',
    flatTitleWordsNew: 'Nouveaux mots',
    flatTitleWordsDifficult: 'Mots difficiles',
    flatTitleSentencesAll: 'Toutes les phrases',
    flatTitleSentencesMastered: 'Phrases maîtrisées',
    flatTitleSentencesInProgress: 'Phrases en cours',
    flatTitleSentencesNew: 'Nouvelles phrases',
    flatTitleSentencesDifficult: 'Phrases difficiles',
    // Modal
    modalTitle: 'Que veux-tu étudier ?',
    modalClose: 'Fermer',
    modeCollection: 'Collection actuelle',
    modeCollectionSub: (label: string) => label,
    modeCollectionBadge: '',
    modeRevise: 'Mots à revoir',
    modeReviseSub: (n: number, p: number) =>
      `${n} à revoir maintenant, ${p} en cours`,
    modeReviseBadge: 'Recommandé',
    modeNew: 'Nouveaux mots',
    modeNewSub: (n: number) => `${n} à découvrir`,
    modeNewBadge: 'Nouveau',
    modeDifficult: 'Mots difficiles',
    modeDifficultSub: (n: number) => `${n} difficile${n > 1 ? 's' : ''}`,
    modeDifficultBadge: '',
    countTitle: 'Combien de cartes ?',
    countHintEmpty: '0 cartes disponibles pour ce mode',
    dirTitle: 'Sens des cartes',
    dirHanziToFr: { emoji: '🇨🇳 → 🇫🇷', sub: 'Chinois → Traduction' },
    dirFrToHanzi: { emoji: '🇫🇷 → 🇨🇳', sub: 'Traduction → Chinois' },
    modeTitle: 'Mode d\'étude',
    cta: "C'est parti !",
    // Sections bottom
    wotdTitle: 'Mot du jour',
    wotdEmpty: 'Apprends une leçon pour débloquer le mot du jour',
    wotdPlay: '🔊 Écouter',
    heatmapTitle: 'Activité (12 dernières semaines)',
    heatmapLess: 'Moins',
    heatmapMore: 'Plus',
    badgesTitle: 'Badges',
    badgesEarned: 'gagnés',
    // Session summary
    summaryTitle: 'Session terminée',
    summaryXp: 'XP gagnée',
    summaryCards: 'cartes revues',
    summaryAccuracy: 'Précision',
    summaryDuration: 'Durée',
    summaryAgain: 'À revoir',
    summaryHard: 'Difficile',
    summaryGood: 'Bien',
    summaryEasy: 'Facile',
    summaryBack: 'Retour au dashboard',
    noRateWarning:
      'Mode preview — ta progression SRS ne sera pas sauvegardée (aucun onRate branché).'
  },
  en: {
    title: 'Flashcards',
    tabWords: 'Words',
    tabSentences: 'Sentences',
    wordUnit: 'words',
    sentenceUnit: 'sentences',
    btnAdd: '+ Add',
    btnStudyNow: '⚡ Study now',
    srsCardKicker: 'Spaced repetition',
    srsCardTitle: (n: number, unit: string) =>
      `${n} ${unit} due today`,
    srsCardSub:
      'These cards risk being forgotten. Time to refresh your memory.',
    srsCardCta: 'Review now →',
    statTotal: 'Total 📇',
    statMastered: 'Mastered ✅',
    statDue: 'Due 🔄',
    statMastery: 'Mastery 📈',
    searchPlaceholder: 'Search (Chinese, pinyin, English)…',
    sourceAll: 'All',
    sourceMastered: 'Mastered ✅',
    sourceInProgress: 'In progress 🔄',
    sourceNew: 'New ⭐',
    sourceDifficult: 'Difficult 🔴',
    sourceLessons: 'Lessons 📖',
    sourceSentences: 'Sentences 💬',
    sourcePersonal: 'My cards ✏️',
    sourceWotd: 'Word of the day 🌟',
    decksTitle: 'My decks',
    decksEmpty: 'No decks yet — complete a lesson to unlock one.',
    deckTitlePrefix: 'Lesson:',
    deckMixedLabel: 'Mixed',
    deckStudy: 'Study',
    deckWords: 'words',
    deckNew: 'new',
    deckStatusNew: 'Not studied yet',
    deckStatusProgress: 'In progress',
    deckStatusMastered: 'Mastered',
    deckLastStudiedNever: 'Not studied yet',
    deckLastStudiedRelative: (label: string) => `Studied ${label}`,
    // Deck detail
    deckBack: '← Back to collections',
    deckStudyCta: 'Study collection',
    deckMasteryLabel: 'mastery',
    deckChipMastered: (n: number) => `✅ ${n} mastered`,
    deckChipProgress: (n: number) => `🔄 ${n} in progress`,
    deckChipNew: (n: number) => `⭐ ${n} new`,
    deckChipDifficult: (n: number) => `🔴 ${n} difficult`,
    deckFilterAll: 'All',
    deckFilterMastered: 'Mastered ✅',
    deckFilterProgress: 'In progress 🔄',
    deckFilterNew: 'New ⭐',
    deckFilterDifficult: 'Difficult 🔴',
    deckTableStatus: 'Status',
    deckTableWord: 'Word',
    deckTableTrans: 'Translation',
    deckTableActions: 'Actions',
    deckWordStatusMastered: 'Mastered',
    deckWordStatusProgress: 'In progress',
    deckWordStatusNew: 'New',
    deckWordStatusDifficult: 'Difficult',
    deckTableEmpty: 'No word in this filter.',
    deckActionListen: 'Listen',
    deckActionStar: 'Flag difficult',
    // Flat table (Seonsaengnim-style list view)
    flatColStatus: 'STATUS',
    flatColWord: 'WORD',
    flatColTrans: 'TRANSLATION',
    flatColSource: 'SOURCE',
    flatStudyCta: 'Study →',
    flatEmpty: 'No card for this filter.',
    flatSourceLesson: (title: string) => `📖 Lesson: ${title}`,
    flatSourceSentence: (title: string) => `💬 ${title}`,
    flatTitleWordsAll: 'All words',
    flatTitleWordsMastered: 'Mastered words',
    flatTitleWordsInProgress: 'Words in progress',
    flatTitleWordsNew: 'New words',
    flatTitleWordsDifficult: 'Difficult words',
    flatTitleSentencesAll: 'All sentences',
    flatTitleSentencesMastered: 'Mastered sentences',
    flatTitleSentencesInProgress: 'Sentences in progress',
    flatTitleSentencesNew: 'New sentences',
    flatTitleSentencesDifficult: 'Difficult sentences',
    modalTitle: 'What do you want to study?',
    modalClose: 'Close',
    modeCollection: 'Current collection',
    modeCollectionSub: (label: string) => label,
    modeCollectionBadge: '',
    modeRevise: 'Due words',
    modeReviseSub: (n: number, p: number) =>
      `${n} due now, ${p} in progress`,
    modeReviseBadge: 'Recommended',
    modeNew: 'New words',
    modeNewSub: (n: number) => `${n} to discover`,
    modeNewBadge: 'New',
    modeDifficult: 'Difficult words',
    modeDifficultSub: (n: number) => `${n} difficult`,
    modeDifficultBadge: '',
    countTitle: 'How many cards?',
    countHintEmpty: '0 cards available for this mode',
    dirTitle: 'Card direction',
    dirHanziToFr: { emoji: '🇨🇳 → 🇬🇧', sub: 'Chinese → Translation' },
    dirFrToHanzi: { emoji: '🇬🇧 → 🇨🇳', sub: 'Translation → Chinese' },
    modeTitle: 'Study mode',
    cta: "Let's go!",
    wotdTitle: 'Word of the day',
    wotdEmpty: 'Complete a lesson to unlock the word of the day',
    wotdPlay: '🔊 Play',
    heatmapTitle: 'Activity (last 12 weeks)',
    heatmapLess: 'Less',
    heatmapMore: 'More',
    badgesTitle: 'Badges',
    badgesEarned: 'earned',
    summaryTitle: 'Session complete',
    summaryXp: 'XP earned',
    summaryCards: 'cards reviewed',
    summaryAccuracy: 'Accuracy',
    summaryDuration: 'Duration',
    summaryAgain: 'Again',
    summaryHard: 'Hard',
    summaryGood: 'Good',
    summaryEasy: 'Easy',
    summaryBack: 'Back to dashboard',
    noRateWarning:
      'Preview mode — SRS progress will not be saved (onRate not wired).'
  }
};

type CopyType = (typeof COPY)['fr'];

// ============================================================================
//  HELPERS
// ============================================================================

function toSet(maybe?: Set<string> | string[]): Set<string> {
  if (!maybe) return new Set();
  return maybe instanceof Set ? maybe : new Set(maybe);
}

function itemToStudyCard(item: FlashcardV2Item): StudyCard {
  return {
    id: item.id,
    hanzi: item.hanzi,
    pinyin: item.pinyin,
    translationFr: item.translation,
    translationEn: item.translationEn,
    // Propage l'URL audio Azure TTS pour le mode listening / boutons 🔊.
    audio: item.audio
  };
}

function sentenceToStudyCard(s: SentenceFlashcard): StudyCard {
  return {
    id: s.id,
    hanzi: s.hanzi,
    pinyin: s.pinyin,
    translationFr: s.translationFr,
    translationEn: s.translationEn,
    // Propage l'URL MP3 pré-générée pour que le bouton 🔊 puisse lire la phrase
    // au lieu de tenter de résoudre le hanzi via les conventions HSK.
    audio: s.audio
  };
}

/**
 * Formate un timestamp en label relatif court ("aujourd'hui", "hier", "il y a 3j",
 * "il y a 2sem", "il y a 4mois"). Côté EN : "today", "yesterday", "3d ago"…
 * Renvoie null si le timestamp est falsy (carte jamais étudiée).
 */
function formatRelativeStudyTime(
  ts: number | null | undefined,
  language: 'fr' | 'en'
): string | null {
  if (!ts || ts <= 0) return null;
  // Garde-fou : un `lastReviewedAt` historiquement utilisé comme simple
  // marqueur (valeur 1) afficherait "il y a 56 ans". On rejette tout ts
  // antérieur au 1er janvier 2010 (ms = 1262304000000).
  if (ts < 1_262_304_000_000) return null;
  const diffMs = Math.max(0, Date.now() - ts);
  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (language === 'fr') {
    if (days === 0) return "aujourd'hui";
    if (days === 1) return 'hier';
    if (days < 7) return `il y a ${days}j`;
    if (days < 30) return `il y a ${Math.floor(days / 7)}sem`;
    if (days < 365) return `il y a ${Math.floor(days / 30)}mois`;
    return `il y a ${Math.floor(days / 365)}an${Math.floor(days / 365) > 1 ? 's' : ''}`;
  }
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function hashStringToInt(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

type ActiveTab = 'words' | 'sentences';

// HSK → CEFR mapping — XiaoLearn communique sur CECR (A1..C2), pas HSK.
// Cf. HomePageV2.hskToCecr pour la source de vérité.
const hskToCefr = (level: string): string => {
  const map: Record<string, string> = {
    hsk1: 'A1', hsk2: 'A2', hsk3: 'B1',
    hsk4: 'B2', hsk5: 'C1', hsk6: 'C2', hsk7: 'C2+'
  };
  return map[level] ?? 'A1';
};

const CEFR_ORDER: Record<string, number> = {
  A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, C2: 5, 'C2+': 6
};

type SessionSource =
  | 'all'
  | 'mastered'
  | 'in-progress'
  | 'new'
  | 'difficult'
  | 'lessons'
  | 'sentences'
  | 'personal'
  | 'wotd';

type ModalMode = 'revise' | 'new' | 'difficult' | 'collection';

// ---- Deck summary (groupement par level × theme côté Flashcards) ----
type DeckSummary = {
  id: string;
  label: string;
  cefr: string;
  total: number;
  dueN: number;
  masteredN: number;
  newN: number;
  status: 'new' | 'progress' | 'mastered';
  items: StudyCard[];
  /** Timestamp ms de la dernière étude (max sur les items du deck), ou null. */
  lastStudiedAt?: number | null;
};

// ---- Filtre du tableau dans la vue détail d'une collection ----
type DeckFilter = 'all' | 'mastered' | 'progress' | 'new' | 'difficult';

// ---- Ligne de la vue table plate (inspiration Seonsaengnim) ----
type FlatRowStatus = 'mastered' | 'progress' | 'new' | 'difficult';
type FlatRow = {
  id: string;
  status: FlatRowStatus;
  hanzi: string;
  pinyin: string;
  translation: string;
  sourceLabel: string;
  audio?: string;
};

function flatTableTitle(
  activeTab: ActiveTab,
  source: SessionSource,
  copy: CopyType
): string {
  if (activeTab === 'sentences') {
    switch (source) {
      case 'mastered':
        return copy.flatTitleSentencesMastered;
      case 'in-progress':
        return copy.flatTitleSentencesInProgress;
      case 'new':
        return copy.flatTitleSentencesNew;
      case 'difficult':
        return copy.flatTitleSentencesDifficult;
      default:
        return copy.flatTitleSentencesAll;
    }
  }
  switch (source) {
    case 'mastered':
      return copy.flatTitleWordsMastered;
    case 'in-progress':
      return copy.flatTitleWordsInProgress;
    case 'new':
      return copy.flatTitleWordsNew;
    case 'difficult':
      return copy.flatTitleWordsDifficult;
    default:
      return copy.flatTitleWordsAll;
  }
}

// ============================================================================
//  COMPONENT
// ============================================================================

export default function FlashcardPageV5({
  wordItems,
  sentenceCards = [],
  personalHook,
  language = 'fr',
  customLists: _customLists,
  dueIds,
  masteredIds,
  difficultIds,
  lessonsFromUser,
  onRate,
  onAddCard
}: FlashcardPageV5Props) {
  const copy = COPY[language];

  // View state — Flashcards = flip uniquement. Les autres modes (MCQ, saisie,
  //   écoute, speed round) vivent dans la page « Apprentissage libre ».
  const [view, setView] = useState<
    'dashboard' | 'deck-detail' | 'session' | 'summary'
  >('dashboard');
  const [activeTab, setActiveTab] = useState<ActiveTab>('words');
  const [sessionSource, setSessionSource] = useState<SessionSource>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Collection sélectionnée (vue détail à la Seonsaengnim)
  const [selectedDeck, setSelectedDeck] = useState<DeckSummary | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('revise');
  const [modalCount, setModalCount] = useState<number>(20);
  const [direction, setDirection] = useState<FlashcardDirection>('hanzi-to-fr');

  // Modal "Ajouter une carte perso"
  const [addOpen, setAddOpen] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  // Active session data
  const [activeCards, setActiveCards] = useState<StudyCard[]>([]);
  const [lastSummary, setLastSummary] = useState<FlashcardSessionSummary | null>(
    null
  );

  const activity = useDailyActivity();
  const dueSet = useMemo(() => toSet(dueIds), [dueIds]);
  const masteredSet = useMemo(() => toSet(masteredIds), [masteredIds]);
  const difficultSet = useMemo(() => toSet(difficultIds), [difficultIds]);

  // Stats globales (sur l'onglet actif)
  const stats = useMemo(() => {
    const items = activeTab === 'words' ? wordItems : sentenceCards;
    const total = items.length;
    const mastered = items.filter((it: { id: string }) =>
      masteredSet.has(it.id)
    ).length;
    const due = items.filter((it: { id: string }) => dueSet.has(it.id)).length;
    const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;
    return { total, mastered, due, pct };
  }, [activeTab, wordItems, sentenceCards, dueSet, masteredSet]);

  // Stats "mots à revoir / en cours / nouveaux" (pour le modal)
  const modalCounts = useMemo(() => {
    const items =
      activeTab === 'words'
        ? wordItems
        : sentenceCards.map((s) => ({
            id: s.id,
            lastReviewedAt: undefined as number | undefined
          }));
    const due = items.filter((it) => dueSet.has(it.id)).length;
    const inProgress = items.filter(
      (it) =>
        !masteredSet.has(it.id) &&
        !dueSet.has(it.id) &&
        (it as { lastReviewedAt?: number }).lastReviewedAt
    ).length;
    const newN = items.filter(
      (it) =>
        !masteredSet.has(it.id) &&
        !dueSet.has(it.id) &&
        !(it as { lastReviewedAt?: number }).lastReviewedAt
    ).length;
    const difficult = items.filter((it) => difficultSet.has(it.id)).length;
    return { due, inProgress, newN, difficult };
  }, [activeTab, wordItems, sentenceCards, dueSet, masteredSet, difficultSet]);

  // Compteurs MOTS (indépendants de activeTab) — utilisés pour les pills
  // "Maîtrisés / En cours / Nouveaux / Difficiles" sur l'onglet Mots.
  const wordCounts = useMemo(() => {
    const mastered = wordItems.filter((w) => masteredSet.has(w.id)).length;
    const inProgress = wordItems.filter(
      (w) => !masteredSet.has(w.id) && !dueSet.has(w.id) && w.lastReviewedAt
    ).length;
    const newN = wordItems.filter(
      (w) => !masteredSet.has(w.id) && !dueSet.has(w.id) && !w.lastReviewedAt
    ).length;
    const difficult = wordItems.filter((w) => difficultSet.has(w.id)).length;
    return { mastered, inProgress, newN, difficult };
  }, [wordItems, dueSet, masteredSet, difficultSet]);

  // Compteurs PHRASES — miroir de wordCounts pour l'onglet Phrases.
  const sentenceCounts = useMemo(() => {
    const mastered = sentenceCards.filter((s) => masteredSet.has(s.id)).length;
    const inProgress = sentenceCards.filter(
      (s) => !masteredSet.has(s.id) && !dueSet.has(s.id) && s.lastReviewedAt
    ).length;
    const newN = sentenceCards.filter(
      (s) => !masteredSet.has(s.id) && !dueSet.has(s.id) && !s.lastReviewedAt
    ).length;
    const difficult = sentenceCards.filter((s) => difficultSet.has(s.id)).length;
    return { mastered, inProgress, newN, difficult };
  }, [sentenceCards, dueSet, masteredSet, difficultSet]);

  // Map id → titre de leçon, pour la colonne SOURCE de la table plate (mots).
  const wordSourceMap = useMemo<Map<string, string>>(() => {
    const m = new Map<string, string>();
    if (!lessonsFromUser) return m;
    for (const lesson of lessonsFromUser) {
      const title = language === 'en' && lesson.titleEn ? lesson.titleEn : lesson.title;
      for (const id of lesson.itemIds) m.set(id, title);
    }
    return m;
  }, [lessonsFromUser, language]);

  const masteredByHsk = useMemo(() => {
    const out: Record<string, number> = {};
    for (const w of wordItems) {
      if (!masteredSet.has(w.id)) continue;
      out[w.level] = (out[w.level] ?? 0) + 1;
    }
    return out;
  }, [wordItems, masteredSet]);

  const badges = useFlashcardBadges({
    masteredCount: masteredSet.size,
    masteredByHsk,
    streakDays: activity.currentStreak,
    totalXp: activity.totals.totalXp,
    totalCardsReviewed: activity.totals.totalCards
  });
  const badgesEarned = countEarnedBadges(badges);

  const wordOfTheDay: WordOfTheDay | null = useMemo(() => {
    const pool = wordItems.filter((w) => (w.tokens ?? 1) === 1 && w.hanzi.length <= 4);
    if (pool.length === 0) return null;
    const todayKey = new Date().toISOString().slice(0, 10);
    const idx = hashStringToInt(todayKey) % pool.length;
    const pick = pool[idx];
    return {
      hanzi: pick.hanzi,
      pinyin: pick.pinyin,
      translationFr: pick.translation,
      translationEn: pick.translationEn,
      level: pick.level,
      theme: pick.theme
    };
  }, [wordItems]);

  // Pool filtré pour le listing selon source pill + search
  const filteredItems = useMemo<FlashcardV2Item[]>(() => {
    if (activeTab !== 'words') return [];
    let base: FlashcardV2Item[];
    switch (sessionSource) {
      case 'mastered':
        base = wordItems.filter((w) => masteredSet.has(w.id));
        break;
      case 'in-progress':
        base = wordItems.filter(
          (w) =>
            !masteredSet.has(w.id) && (dueSet.has(w.id) || w.lastReviewedAt)
        );
        break;
      case 'new':
        base = wordItems.filter(
          (w) =>
            !masteredSet.has(w.id) && !dueSet.has(w.id) && !w.lastReviewedAt
        );
        break;
      case 'difficult':
        base = wordItems.filter((w) => difficultSet.has(w.id));
        break;
      case 'lessons':
        base = wordItems;
        break;
      case 'sentences':
        base = [];
        break;
      case 'personal':
        base = personalHook
          ? personalHook.cards.map((c) => ({
              id: c.id,
              hanzi: c.hanzi,
              pinyin: c.pinyin,
              translation: c.translationFr,
              translationEn: c.translationEn,
              level: 'custom' as unknown as FlashcardsV2HskLevel,
              theme: 'personal',
              tokens: 1,
              lastReviewedAt: undefined
            })) as unknown as FlashcardV2Item[]
          : [];
        break;
      case 'wotd':
        base = wordOfTheDay
          ? wordItems.filter((w) => w.hanzi === wordOfTheDay.hanzi).slice(0, 1)
          : [];
        break;
      case 'all':
      default:
        base = wordItems;
    }
    const q = searchQuery.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (c) =>
        c.hanzi.includes(searchQuery.trim()) ||
        c.pinyin.toLowerCase().includes(q) ||
        c.translation.toLowerCase().includes(q) ||
        (c.translationEn?.toLowerCase().includes(q) ?? false)
    );
  }, [
    activeTab,
    sessionSource,
    searchQuery,
    wordItems,
    dueSet,
    masteredSet,
    difficultSet,
    personalHook,
    wordOfTheDay
  ]);

  // Decks Flashcards — la source canonique est `lessonsFromUser` (les leçons
  // que l'utilisateur a vues dans la page Leçons). Chaque leçon devient UN
  // deck avec son titre + son niveau CEFR d'origine, et contient exactement
  // les cartes apprises dans cette leçon.
  //
  // Fallback (si `lessonsFromUser` n'est pas fourni) : on groupe par
  // level × theme avec normalisation + fusion des micro-decks. C'est le
  // comportement legacy V5 qu'on préserve pour compat et les cartes perso.
  const decks = useMemo<DeckSummary[]>(() => {
    // ===== Cas spécial : cartes personnelles =====
    // Les cartes perso ne sont pas rattachées à une leçon (ids custom), donc
    // on ne peut pas passer par le chemin lessonsFromUser → on construit un
    // deck dédié "Mes cartes".
    if (sessionSource === 'personal' && activeTab === 'words') {
      if (filteredItems.length === 0) return [];
      const now = Date.now();
      let dueN = 0;
      let masteredN = 0;
      let newN = 0;
      if (personalHook) {
        for (const c of personalHook.cards) {
          const lvl = c.srsLevel ?? 0;
          if (lvl >= 5) masteredN++;
          else if (!c.lastReviewedAt) newN++;
          else if ((c.dueAt ?? 0) <= now) dueN++;
        }
      } else {
        newN = filteredItems.length;
      }
      const status: 'new' | 'progress' | 'mastered' =
        masteredN === filteredItems.length
          ? 'mastered'
          : masteredN > 0 || dueN > 0 || filteredItems.length - newN > 0
          ? 'progress'
          : 'new';
      const cleanLabel = copy.sourcePersonal.replace(/\s*[✏️🌟📖💬✅🔄⭐🔴]+$/u, '').trim();
      return [
        {
          id: 'personal::all',
          label: cleanLabel,
          cefr: 'A1',
          total: filteredItems.length,
          dueN,
          masteredN,
          newN,
          status,
          items: filteredItems.map(itemToStudyCard)
        }
      ];
    }

    // ===== Cas spécial : mot du jour =====
    // Un seul mot ⇒ on crée un mini-deck dédié "Mot du jour" plutôt que
    // d'afficher la leçon entière qui le contient.
    if (sessionSource === 'wotd' && activeTab === 'words') {
      if (filteredItems.length === 0) return [];
      const it = filteredItems[0];
      const dueN = dueSet.has(it.id) ? 1 : 0;
      const masteredN = masteredSet.has(it.id) ? 1 : 0;
      const newN = !it.lastReviewedAt && !masteredN && !dueN ? 1 : 0;
      const status: 'new' | 'progress' | 'mastered' =
        masteredN === 1 ? 'mastered' : dueN === 1 || it.lastReviewedAt ? 'progress' : 'new';
      const cleanLabel = copy.sourceWotd.replace(/\s*[✏️🌟📖💬✅🔄⭐🔴]+$/u, '').trim();
      return [
        {
          id: 'wotd::today',
          label: cleanLabel,
          cefr: hskToCefr(it.level),
          total: 1,
          dueN,
          masteredN,
          newN,
          status,
          items: [itemToStudyCard(it)]
        }
      ];
    }

    // Filtres de statut (mastered/in-progress/new/difficult) : table plate
    // (FlatCardTable). La grille n'est utilisée que pour les vues "regroupées"
    // (Tous / Leçons / Prof. Park / Manuel / Mes Cartes / Mot du jour).
    if (
      sessionSource === 'mastered' ||
      sessionSource === 'in-progress' ||
      sessionSource === 'new' ||
      sessionSource === 'difficult'
    ) {
      return [];
    }

    // ===== Onglet Phrases + vue regroupée =====
    // Une phrase = une ligne de dialogue d'une leçon complétée. On groupe par
    // lessonId pour rendre une tuile par leçon (parité avec l'onglet Mots).
    if (activeTab === 'sentences') {
      if (sentenceCards.length === 0) return [];
      type SentBucket = {
        lessonId: string;
        labelFr: string;
        labelEn: string;
        items: SentenceFlashcard[];
      };
      const buckets = new Map<string, SentBucket>();
      for (const s of sentenceCards) {
        let b = buckets.get(s.lessonId);
        if (!b) {
          b = {
            lessonId: s.lessonId,
            labelFr: s.lessonTitleFr,
            labelEn: s.lessonTitleEn ?? s.lessonTitleFr,
            items: []
          };
          buckets.set(s.lessonId, b);
        }
        b.items.push(s);
      }
      const out: DeckSummary[] = [];
      for (const b of buckets.values()) {
        let dueN = 0;
        let masteredN = 0;
        let newN = 0;
        let lastStudiedAt = 0;
        for (const s of b.items) {
          if (masteredSet.has(s.id)) masteredN++;
          else if (dueSet.has(s.id)) dueN++;
          else if (!s.lastReviewedAt) newN++;
          if ((s.lastReviewedAt ?? 0) > lastStudiedAt) {
            lastStudiedAt = s.lastReviewedAt ?? 0;
          }
        }
        const status: 'new' | 'progress' | 'mastered' =
          masteredN === b.items.length
            ? 'mastered'
            : masteredN > 0 || dueN > 0 || b.items.length - newN > 0
              ? 'progress'
              : 'new';
        const displayTitle = language === 'en' ? b.labelEn : b.labelFr;
        out.push({
          id: `sent-deck::${b.lessonId}`,
          label: `${copy.deckTitlePrefix} ${displayTitle}`,
          // Pas d'info de niveau CECR sur les phrases — étiquette neutre.
          cefr: 'A1',
          total: b.items.length,
          dueN,
          masteredN,
          newN,
          status,
          lastStudiedAt: lastStudiedAt > 0 ? lastStudiedAt : null,
          items: b.items.map(sentenceToStudyCard)
        });
      }
      return out.sort((a, b) => {
        if (b.dueN !== a.dueN) return b.dueN - a.dueN;
        return a.label.localeCompare(b.label);
      });
    }

    if (lessonsFromUser && lessonsFromUser.length > 0 && activeTab === 'words') {
      // ===== Chemin canonique : une leçon = un deck =====
      const itemById = new Map<string, FlashcardV2Item>();
      for (const it of filteredItems) itemById.set(it.id, it);

      const out: DeckSummary[] = [];
      for (const lesson of lessonsFromUser) {
        // Intersecte les items de la leçon avec ceux filtrés (par source/search).
        const items: FlashcardV2Item[] = [];
        for (const id of lesson.itemIds) {
          const it = itemById.get(id);
          if (it) items.push(it);
        }
        if (items.length === 0) continue;

        let dueN = 0;
        let masteredN = 0;
        let newN = 0;
        let lastStudiedAt = 0;
        for (const it of items) {
          if (masteredSet.has(it.id)) masteredN++;
          else if (dueSet.has(it.id)) dueN++;
          else if (!it.lastReviewedAt) newN++;
          if ((it.lastReviewedAt ?? 0) > lastStudiedAt) {
            lastStudiedAt = it.lastReviewedAt ?? 0;
          }
        }
        const cefr = hskToCefr(`hsk${lesson.hskLevel}`);
        const status: 'new' | 'progress' | 'mastered' =
          masteredN === items.length
            ? 'mastered'
            : masteredN > 0 || dueN > 0 || items.length - newN > 0
            ? 'progress'
            : 'new';
        const displayTitle = language === 'en' && lesson.titleEn ? lesson.titleEn : lesson.title;
        out.push({
          id: `lesson::${lesson.id}`,
          label: `${copy.deckTitlePrefix} ${displayTitle}`,
          cefr,
          total: items.length,
          dueN,
          masteredN,
          newN,
          status,
          lastStudiedAt: lastStudiedAt > 0 ? lastStudiedAt : null,
          items: items.map(itemToStudyCard)
        });
      }

      return out.sort((a, b) => {
        if (b.dueN !== a.dueN) return b.dueN - a.dueN;
        const levelRank = CEFR_ORDER[a.cefr] - CEFR_ORDER[b.cefr];
        if (levelRank !== 0) return levelRank;
        return a.label.localeCompare(b.label);
      });
    }

    // ===== Fallback legacy : groupement level × theme =====
    const MIN_DECK_SIZE = 3;
    const normalize = (s: string): string =>
      s
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // enlève les accents
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();

    // 1re passe : on bucket par (level, normalizedTheme) et on mémorise le
    //   label "pretty" le plus fréquent pour chaque bucket.
    type Bucket = {
      level: string;
      normKey: string;
      prettyCounts: Map<string, number>;
      items: FlashcardV2Item[];
    };
    const buckets = new Map<string, Bucket>();
    const source = activeTab === 'words' ? filteredItems : [];
    for (const item of source) {
      const rawTheme = (item.theme ?? 'general').toString();
      const normKey = normalize(rawTheme) || 'general';
      const key = `${item.level}::${normKey}`;
      let b = buckets.get(key);
      if (!b) {
        b = { level: item.level, normKey, prettyCounts: new Map(), items: [] };
        buckets.set(key, b);
      }
      b.items.push(item);
      const pretty = rawTheme.trim() || 'general';
      b.prettyCounts.set(pretty, (b.prettyCounts.get(pretty) ?? 0) + 1);
    }

    // 2e passe : on sépare les decks "normaux" (≥ MIN_DECK_SIZE) des
    //   micro-decks qu'on fusionne par niveau CEFR dans "Divers".
    const normalDecks: DeckSummary[] = [];
    const miscByCefr = new Map<string, FlashcardV2Item[]>();
    const miscLabelByCefr = new Map<string, string>();

    const pickPrettyLabel = (counts: Map<string, number>): string => {
      let bestLabel = 'general';
      let bestCount = -1;
      for (const [label, count] of counts) {
        if (count > bestCount) {
          bestCount = count;
          bestLabel = label;
        }
      }
      // Capitalise proprement "voyage" → "Voyage"
      return bestLabel.charAt(0).toUpperCase() + bestLabel.slice(1);
    };

    for (const b of buckets.values()) {
      const cefr = hskToCefr(b.level);
      if (b.items.length < MIN_DECK_SIZE && b.normKey !== 'general') {
        // Micro-deck : on le fusionne dans "Divers" du niveau
        const list = miscByCefr.get(cefr) ?? [];
        list.push(...b.items);
        miscByCefr.set(cefr, list);
        if (!miscLabelByCefr.has(cefr)) {
          miscLabelByCefr.set(cefr, `${copy.deckTitlePrefix} ${copy.deckMixedLabel}`);
        }
        continue;
      }
      let dueN = 0;
      let masteredN = 0;
      let newN = 0;
      for (const it of b.items) {
        if (masteredSet.has(it.id)) masteredN++;
        else if (dueSet.has(it.id)) dueN++;
        else if (!it.lastReviewedAt) newN++;
      }
      const themeLabel = pickPrettyLabel(b.prettyCounts);
      const status: 'new' | 'progress' | 'mastered' =
        masteredN === b.items.length
          ? 'mastered'
          : masteredN > 0 || dueN > 0 || b.items.length - newN > 0
          ? 'progress'
          : 'new';
      normalDecks.push({
        id: `${b.level}::${b.normKey}`,
        label: `${copy.deckTitlePrefix} ${themeLabel}`,
        cefr,
        total: b.items.length,
        dueN,
        masteredN,
        newN,
        status,
        items: b.items.map(itemToStudyCard)
      });
    }

    // Ajoute un deck "Divers" par niveau CEFR (si assez d'items).
    for (const [cefr, items] of miscByCefr) {
      if (items.length === 0) continue;
      let dueN = 0;
      let masteredN = 0;
      let newN = 0;
      for (const it of items) {
        if (masteredSet.has(it.id)) masteredN++;
        else if (dueSet.has(it.id)) dueN++;
        else if (!it.lastReviewedAt) newN++;
      }
      const status: 'new' | 'progress' | 'mastered' =
        masteredN === items.length
          ? 'mastered'
          : masteredN > 0 || dueN > 0 || items.length - newN > 0
          ? 'progress'
          : 'new';
      normalDecks.push({
        id: `${cefr}::__misc__`,
        label: miscLabelByCefr.get(cefr) ?? `${copy.deckTitlePrefix} ${copy.deckMixedLabel}`,
        cefr,
        total: items.length,
        dueN,
        masteredN,
        newN,
        status,
        items: items.map(itemToStudyCard)
      });
    }

    return normalDecks.sort((a, b) => {
      if (b.dueN !== a.dueN) return b.dueN - a.dueN;
      const levelRank = CEFR_ORDER[a.cefr] - CEFR_ORDER[b.cefr];
      if (levelRank !== 0) return levelRank;
      return a.label.localeCompare(b.label);
    });
  }, [
    activeTab,
    filteredItems,
    dueSet,
    masteredSet,
    lessonsFromUser,
    language,
    sessionSource,
    personalHook,
    sentenceCards,
    searchQuery,
    copy.deckTitlePrefix,
    copy.deckMixedLabel,
    copy.sourcePersonal,
    copy.sourceWotd,
    copy.sourceSentences,
    copy.sourceMastered,
    copy.sourceInProgress,
    copy.sourceNew,
    copy.sourceDifficult
  ]);

  const distractorPool = useMemo<StudyCard[]>(
    () => wordItems.slice(0, 200).map(itemToStudyCard),
    [wordItems]
  );

  // Vue table plate (Seonsaengnim) : onglet Phrases OU filtre de statut Mots.
  const isFlatTableView = useMemo<boolean>(() => {
    // La table plate n'est utilisée QUE pour les filtres de statut. Toutes
    // les vues regroupées (Tous / Leçons / Prof. Park / Manuel / Mes Cartes /
    // Mot du jour) — y compris sur l'onglet Phrases — passent par DeckGrid.
    return (
      sessionSource === 'mastered' ||
      sessionSource === 'in-progress' ||
      sessionSource === 'new' ||
      sessionSource === 'difficult'
    );
  }, [sessionSource]);

  // Lignes de la table plate, respectant search + sessionSource.
  const flatRows = useMemo<FlatRow[]>(() => {
    const translationOf = (fr: string, en?: string) =>
      language === 'en' && en ? en : fr;
    const statusOfWord = (it: FlashcardV2Item): FlatRowStatus => {
      if (masteredSet.has(it.id)) return 'mastered';
      if (difficultSet.has(it.id)) return 'difficult';
      if (dueSet.has(it.id) || it.lastReviewedAt) return 'progress';
      return 'new';
    };
    const statusOfSent = (s: SentenceFlashcard): FlatRowStatus => {
      if (masteredSet.has(s.id)) return 'mastered';
      if (difficultSet.has(s.id)) return 'difficult';
      if (dueSet.has(s.id) || s.lastReviewedAt) return 'progress';
      return 'new';
    };
    const q = searchQuery.trim().toLowerCase();

    if (activeTab === 'sentences') {
      let base: SentenceFlashcard[] = sentenceCards;
      switch (sessionSource) {
        case 'mastered':
          base = base.filter((s) => masteredSet.has(s.id));
          break;
        case 'in-progress':
          base = base.filter(
            (s) => !masteredSet.has(s.id) && (dueSet.has(s.id) || s.lastReviewedAt)
          );
          break;
        case 'new':
          base = base.filter(
            (s) => !masteredSet.has(s.id) && !dueSet.has(s.id) && !s.lastReviewedAt
          );
          break;
        case 'difficult':
          base = base.filter((s) => difficultSet.has(s.id));
          break;
        default:
          break;
      }
      if (q) {
        base = base.filter(
          (s) =>
            s.hanzi.includes(searchQuery.trim()) ||
            s.pinyin.toLowerCase().includes(q) ||
            s.translationFr.toLowerCase().includes(q) ||
            (s.translationEn?.toLowerCase().includes(q) ?? false)
        );
      }
      return base.map((s) => {
        const title =
          language === 'en' && s.lessonTitleEn
            ? s.lessonTitleEn
            : s.lessonTitleFr;
        return {
          id: s.id,
          status: statusOfSent(s),
          hanzi: s.hanzi,
          pinyin: s.pinyin,
          translation: translationOf(s.translationFr, s.translationEn),
          sourceLabel: copy.flatSourceSentence(title),
          // URL audio MP3 pré-générée pour la phrase (manifest des dialogues).
          // Sans ce passage, le bouton 🔊 tenterait de résoudre le hanzi via
          // les conventions HSK qui ne couvrent pas les phrases multi-mots.
          audio: s.audio
        };
      });
    }

    // Words view — réutilise filteredItems (qui respecte déjà sessionSource + search)
    return filteredItems.map((it) => {
      const lessonTitle = wordSourceMap.get(it.id);
      return {
        id: it.id,
        status: statusOfWord(it),
        hanzi: it.hanzi,
        pinyin: it.pinyin,
        translation: translationOf(it.translation, it.translationEn),
        sourceLabel: lessonTitle ? copy.flatSourceLesson(lessonTitle) : '—',
        audio: it.audio
      };
    });
  }, [
    activeTab,
    sessionSource,
    searchQuery,
    sentenceCards,
    filteredItems,
    wordSourceMap,
    masteredSet,
    dueSet,
    difficultSet,
    language,
    copy.flatSourceLesson,
    copy.flatSourceSentence
  ]);

  // Compte dispo pour le modal selon le mode sélectionné
  const modalAvailable = useMemo(() => {
    switch (modalMode) {
      case 'revise':
        return modalCounts.due + modalCounts.inProgress;
      case 'new':
        return modalCounts.newN;
      case 'difficult':
        return modalCounts.difficult;
      case 'collection':
        return selectedDeck?.items.length ?? 0;
    }
  }, [modalMode, modalCounts, selectedDeck]);

  // ===================  Handlers  ===================

  const openModal = useCallback(() => {
    // Sélectionne automatiquement le mode le plus pertinent
    const m: ModalMode =
      modalCounts.due + modalCounts.inProgress > 0
        ? 'revise'
        : modalCounts.newN > 0
        ? 'new'
        : modalCounts.difficult > 0
        ? 'difficult'
        : 'revise';
    setModalMode(m);
    setModalOpen(true);
  }, [modalCounts]);

  const closeModal = useCallback(() => setModalOpen(false), []);

  // Lance directement une session de révision sur les cartes dues. Pas de modal :
  // c'est le CTA principal de la carte « Répétition espacée ».
  const handleStartReviewNow = useCallback(() => {
    setModalMode('revise');
    setModalCount(20);
    setModalOpen(true);
  }, []);

  const pickModalPool = useCallback((): StudyCard[] => {
    // Cas spécial : la collection active pioche directement dans le deck sélectionné.
    if (modalMode === 'collection') {
      return selectedDeck ? [...selectedDeck.items] : [];
    }
    const items =
      activeTab === 'words'
        ? wordItems
        : sentenceCards.map(sentenceToStudyCard);
    let pool: StudyCard[] = [];
    if (activeTab === 'words') {
      const src = wordItems as FlashcardV2Item[];
      switch (modalMode) {
        case 'revise':
          pool = src
            .filter(
              (w) => dueSet.has(w.id) || (!masteredSet.has(w.id) && w.lastReviewedAt)
            )
            .map(itemToStudyCard);
          break;
        case 'new':
          pool = src
            .filter(
              (w) =>
                !masteredSet.has(w.id) && !dueSet.has(w.id) && !w.lastReviewedAt
            )
            .map(itemToStudyCard);
          break;
        case 'difficult':
          pool = src.filter((w) => difficultSet.has(w.id)).map(itemToStudyCard);
          break;
      }
    } else {
      pool = items as StudyCard[];
    }
    return pool;
  }, [activeTab, modalMode, wordItems, sentenceCards, dueSet, masteredSet, difficultSet, selectedDeck]);

  const startSession = useCallback(() => {
    const pool = pickModalPool();
    if (pool.length === 0) return;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, Math.min(modalCount, shuffled.length));
    setActiveCards(picked);
    setModalOpen(false);
    setView('session');
  }, [pickModalPool, modalCount]);

  // Ouvre la vue détail Seonsaengnim d'une collection (au lieu de lancer
  // directement la session). L'utilisateur peut alors parcourir le tableau
  // de mots avant de cliquer "Étudier la collection".
  const handleOpenDeck = useCallback((deck: DeckSummary) => {
    if (deck.items.length === 0) return;
    setSelectedDeck(deck);
    setView('deck-detail');
  }, []);

  const handleBackToDecks = useCallback(() => {
    setSelectedDeck(null);
    setView('dashboard');
  }, []);

  // Ouvre le modal pré-paramétré sur "Collection actuelle" depuis le détail.
  const handleStartCollectionStudy = useCallback(() => {
    if (!selectedDeck || selectedDeck.items.length === 0) return;
    setModalMode('collection');
    setModalCount(Math.min(20, selectedDeck.items.length));
    setModalOpen(true);
  }, [selectedDeck]);

  const handleRate = useCallback(
    (cardId: string, quality: 1 | 2 | 3 | 4) => {
      if (onRate) onRate(cardId, quality);
    },
    [onRate]
  );

  const handleCardReviewed = useCallback(
    (rating: 'again' | 'hard' | 'good' | 'easy') => activity.recordCardReview(rating),
    [activity]
  );

  const handleFinish = useCallback(
    (summary: FlashcardSessionSummary) => {
      activity.recordSession(summary);
      setLastSummary(summary);
      setView('summary');
    },
    [activity]
  );

  // Démarre une session depuis la table plate (onglet Phrases ou filtre statut).
  // Ouvre le modal "Que veux-tu étudier ?" pré-sélectionné sur le mode le plus
  // pertinent selon le filtre courant — l'utilisateur peut alors choisir entre
  // nouveaux termes / en cours / difficiles.
  const handleStudyFromFlat = useCallback(() => {
    if (flatRows.length === 0) return;
    const defaultMode: ModalMode =
      sessionSource === 'new'
        ? 'new'
        : sessionSource === 'difficult'
        ? 'difficult'
        : sessionSource === 'in-progress'
        ? 'revise'
        : modalCounts.due + modalCounts.inProgress > 0
        ? 'revise'
        : modalCounts.newN > 0
        ? 'new'
        : modalCounts.difficult > 0
        ? 'difficult'
        : 'revise';
    setModalMode(defaultMode);
    setModalOpen(true);
  }, [flatRows, sessionSource, modalCounts]);

  const handleAbort = useCallback(() => setView('dashboard'), []);
  const handleBackToDashboard = useCallback(() => {
    setLastSummary(null);
    setView('dashboard');
  }, []);

  // ===================  Views  ===================

  if (view === 'session') {
    return (
      <div className="fc5-root fc5-session-shell">
        <SessionView
          mode="flip"
          direction={direction}
          cards={activeCards}
          language={language}
          distractorPool={distractorPool}
          onRate={handleRate}
          onCardReviewed={handleCardReviewed}
          onFinish={handleFinish}
          onAbort={handleAbort}
        />
      </div>
    );
  }

  if (view === 'summary' && lastSummary) {
    return (
      <div className="fc5-root fc5-session-shell">
        <SummaryScreen
          summary={lastSummary}
          copy={copy}
          onBack={handleBackToDashboard}
        />
      </div>
    );
  }

  // ==========  DECK DETAIL (vue Seonsaengnim : hero + table)  ==========
  if (view === 'deck-detail' && selectedDeck) {
    return (
      <div className="fc5-root">
        <DeckDetailView
          deck={selectedDeck}
          copy={copy}
          masteredSet={masteredSet}
          dueSet={dueSet}
          difficultSet={difficultSet}
          language={language}
          onBack={handleBackToDecks}
          onStudy={handleStartCollectionStudy}
        />
        {modalOpen ? (
          <SessionSetupModal
            copy={copy}
            counts={modalCounts}
            modalMode={modalMode}
            setModalMode={setModalMode}
            modalCount={modalCount}
            setModalCount={setModalCount}
            direction={direction}
            setDirection={setDirection}
            available={modalAvailable}
            onClose={closeModal}
            onStart={startSession}
            language={language}
            selectedDeckLabel={selectedDeck.label}
            selectedDeckTotal={selectedDeck.items.length}
          />
        ) : null}
      </div>
    );
  }

  // ==========  DASHBOARD  ==========
  return (
    <div className="fc5-root">
      <header className="fc5-header">
        <div className="fc5-header-main">
          <div className="xl-hero-row">
            <div className="xl-hero-icon" aria-hidden="true">🃏</div>
            <div className="fc5-header-titles">
              <h1 className="fc5-title">{copy.title}</h1>
              <p className="fc5-subline">
                {stats.total} {activeTab === 'words' ? copy.wordUnit : copy.sentenceUnit}
              </p>
            </div>
          </div>
          <div className="fc5-header-actions">
            <button
              type="button"
              className="fc5-btn-add"
              onClick={() => {
                if (onAddCard) {
                  onAddCard();
                  return;
                }
                if (personalHook) {
                  setAddError(null);
                  setAddOpen(true);
                }
              }}
              disabled={!onAddCard && !personalHook}
              title={copy.btnAdd}
            >
              {copy.btnAdd}
            </button>
            <button
              type="button"
              className="fc5-btn-study-now"
              onClick={openModal}
              disabled={wordItems.length === 0}
            >
              {copy.btnStudyNow}
            </button>
          </div>
        </div>

        <div className="fc5-tabs">
          <button
            type="button"
            className={`fc5-tab ${activeTab === 'words' ? 'is-active' : ''}`}
            onClick={() => {
              setActiveTab('words');
            }}
          >
            {copy.tabWords} ({wordItems.length})
          </button>
          <button
            type="button"
            className={`fc5-tab ${activeTab === 'sentences' ? 'is-active' : ''}`}
            onClick={() => {
              setActiveTab('sentences');
              // Source "lessons", "personal", "wotd" n'existent pas côté phrases
              // → on retombe sur "Tous" pour éviter une liste vide.
              if (
                sessionSource === 'lessons' ||
                sessionSource === 'personal' ||
                sessionSource === 'wotd' ||
                sessionSource === 'sentences'
              ) {
                setSessionSource('all');
              }
            }}
            disabled={sentenceCards.length === 0}
          >
            {copy.tabSentences} ({sentenceCards.length})
          </button>
        </div>
      </header>

      {!onRate ? (
        <div className="fc5-preview-banner" role="status">
          {copy.noRateWarning}
        </div>
      ) : null}

      <StatGrid stats={stats} copy={copy} />

      <div className="fc5-search-row">
        {/* Layout flex: l'icône est un *vrai* enfant du flex container,
            pas un élément absolu. Impossible qu'elle chevauche le texte de
            l'input puisqu'elle occupe sa propre colonne. */}
        <span className="fc5-search-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          className="fc5-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={copy.searchPlaceholder}
          autoComplete="off"
          spellCheck={false}
        />
        {searchQuery ? (
          <button
            type="button"
            className="fc5-search-clear"
            onClick={() => setSearchQuery('')}
            aria-label="clear"
          >
            ✕
          </button>
        ) : null}
      </div>

      <SourcePills
        source={sessionSource}
        activeTab={activeTab}
        setSource={(s) => {
          setSessionSource(s);
        }}
        counts={
          activeTab === 'sentences'
            ? {
                mastered: sentenceCounts.mastered,
                inProgress: sentenceCounts.inProgress,
                newN: sentenceCounts.newN,
                difficult: sentenceCounts.difficult,
                lessons: 0,
                personal: 0
              }
            : {
                mastered: wordCounts.mastered,
                inProgress: wordCounts.inProgress,
                newN: wordCounts.newN,
                difficult: wordCounts.difficult,
                lessons: lessonsFromUser?.length ?? 0,
                personal: personalHook?.cards.length ?? 0
              }
        }
        copy={copy}
        hasPersonal={!!personalHook && activeTab === 'words'}
        hasWotd={!!wordOfTheDay && activeTab === 'words'}
      />

      {/* Contenu principal : table plate (status filters / Phrases) ou grille de decks */}
      {isFlatTableView ? (
        <FlatCardTable
          rows={flatRows}
          copy={copy}
          title={flatTableTitle(activeTab, sessionSource, copy)}
          onStudy={handleStudyFromFlat}
          canStudy={!!onRate}
        />
      ) : (
        <DeckGrid
          decks={decks}
          copy={copy}
          onOpen={handleOpenDeck}
          language={language}
          srsTile={{
            dueCount: stats.due,
            unit: activeTab === 'words' ? copy.wordUnit : copy.sentenceUnit,
            onStart: handleStartReviewNow,
            disabled: !onRate
          }}
        />
      )}

      {/* Session setup modal */}
      {modalOpen ? (
        <SessionSetupModal
          copy={copy}
          counts={modalCounts}
          modalMode={modalMode}
          setModalMode={setModalMode}
          modalCount={modalCount}
          setModalCount={setModalCount}
          direction={direction}
          setDirection={setDirection}
          available={modalAvailable}
          onClose={closeModal}
          onStart={startSession}
          language={language}
        />
      ) : null}

      {/* Add personal card modal */}
      {addOpen && personalHook ? (
        <AddCardModal
          language={language}
          onClose={() => {
            setAddOpen(false);
            setAddError(null);
          }}
          onSave={(input) => {
            const already = personalHook.cards.some(
              (c) => c.hanzi.trim() === input.hanzi.trim()
            );
            if (already) {
              setAddError(
                language === 'fr'
                  ? 'Cette carte existe déjà dans vos cartes perso.'
                  : 'This card already exists in your personal cards.'
              );
              return;
            }
            if (personalHook.atCapacity) {
              setAddError(
                language === 'fr'
                  ? 'Capacité maximale atteinte.'
                  : 'Maximum capacity reached.'
              );
              return;
            }
            personalHook.addCard(input);
            setAddOpen(false);
            setAddError(null);
          }}
          errorMessage={addError}
        />
      ) : null}
    </div>
  );
}

// ============================================================================
//  SUB-COMPONENTS
// ============================================================================

function StatGrid({
  stats,
  copy
}: {
  stats: { total: number; mastered: number; due: number; pct: number };
  copy: CopyType;
}) {
  return (
    <div className="fc5-stats-grid">
      <div className="fc5-stat-card">
        <div className="fc5-stat-value">{stats.total.toLocaleString()}</div>
        <div className="fc5-stat-label">{copy.statTotal}</div>
      </div>
      <div className="fc5-stat-card">
        <div className="fc5-stat-value">{stats.mastered.toLocaleString()}</div>
        <div className="fc5-stat-label">{copy.statMastered}</div>
      </div>
      <div className="fc5-stat-card">
        <div className={`fc5-stat-value ${stats.due > 0 ? 'is-warn' : ''}`}>
          {stats.due.toLocaleString()}
        </div>
        <div className="fc5-stat-label">{copy.statDue}</div>
      </div>
      <div className="fc5-stat-card">
        <div className="fc5-stat-value">{stats.pct}%</div>
        <div className="fc5-stat-label">{copy.statMastery}</div>
      </div>
    </div>
  );
}

function SourcePills({
  source,
  activeTab,
  setSource,
  counts,
  copy,
  hasPersonal,
  hasWotd
}: {
  source: SessionSource;
  activeTab: ActiveTab;
  setSource: (s: SessionSource) => void;
  counts: {
    mastered: number;
    inProgress: number;
    newN: number;
    difficult: number;
    lessons: number;
    personal: number;
  };
  copy: CopyType;
  hasPersonal: boolean;
  hasWotd: boolean;
}) {
  type Pill = { key: SessionSource; label: string; count?: number; show: boolean };
  // Les pills "Leçons / Mes cartes / Mot du jour" n'ont pas de sens sur l'onglet
  // Phrases (pas de regroupement par leçon ni de cartes perso pour les phrases).
  const isWordsTab = activeTab === 'words';
  const pills: Pill[] = [
    { key: 'all', label: copy.sourceAll, show: true },
    { key: 'mastered', label: copy.sourceMastered, count: counts.mastered, show: true },
    { key: 'in-progress', label: copy.sourceInProgress, count: counts.inProgress, show: true },
    { key: 'new', label: copy.sourceNew, count: counts.newN, show: true },
    { key: 'difficult', label: copy.sourceDifficult, count: counts.difficult, show: counts.difficult > 0 },
    { key: 'lessons', label: copy.sourceLessons, count: counts.lessons, show: isWordsTab },
    { key: 'personal', label: copy.sourcePersonal, count: counts.personal, show: isWordsTab && hasPersonal },
    { key: 'wotd', label: copy.sourceWotd, count: hasWotd ? 1 : 0, show: isWordsTab && hasWotd }
  ];
  return (
    <div className="fc5-pills-row" role="tablist">
      {pills
        .filter((p) => p.show)
        .map((p) => (
          <button
            key={p.key}
            type="button"
            role="tab"
            aria-selected={source === p.key}
            className={`fc5-pill ${source === p.key ? 'is-active' : ''}`}
            onClick={() => setSource(p.key)}
          >
            {p.label}
            {typeof p.count === 'number' ? (
              <span className="fc5-pill-count">{p.count}</span>
            ) : null}
          </button>
        ))}
    </div>
  );
}

// ----------------------------------------------------------------------------
//  FLAT CARD TABLE — style Seonsaengnim, affiche une liste plate de cartes
//  (mots ou phrases) avec colonnes Statut / Mot / Traduction / Source.
//  Utilisée sur l'onglet Phrases et sur les filtres de statut Mots.
// ----------------------------------------------------------------------------

function FlatCardTable({
  rows,
  copy,
  title,
  onStudy,
  canStudy
}: {
  rows: FlatRow[];
  copy: CopyType;
  title: string;
  onStudy: () => void;
  canStudy: boolean;
}) {
  const playAudio = useCallback((text: string, audio?: string) => {
    playHanziAudio(text, audio).catch((err) =>
      console.warn('[flashcard audio]', err)
    );
  }, []);

  return (
    <section className="fc5-flat-view">
      <div className="fc5-flat-header">
        <h2 className="fc5-flat-title">
          {title}{' '}
          <span className="fc5-flat-count">({rows.length})</span>
        </h2>
        <button
          type="button"
          className="fc5-flat-cta"
          onClick={onStudy}
          disabled={!canStudy || rows.length === 0}
        >
          {copy.flatStudyCta}
        </button>
      </div>

      <div className="fc5-flat-table" role="table">
        <div className="fc5-flat-row fc5-flat-row--head" role="row">
          <div
            className="fc5-flat-col fc5-flat-col--status"
            role="columnheader"
          >
            {copy.flatColStatus}
          </div>
          <div
            className="fc5-flat-col fc5-flat-col--word"
            role="columnheader"
          >
            {copy.flatColWord}
          </div>
          <div
            className="fc5-flat-col fc5-flat-col--trans"
            role="columnheader"
          >
            {copy.flatColTrans}
          </div>
          <div
            className="fc5-flat-col fc5-flat-col--source"
            role="columnheader"
          >
            {copy.flatColSource}
          </div>
        </div>

        {rows.length === 0 ? (
          <div className="fc5-flat-empty">{copy.flatEmpty}</div>
        ) : (
          rows.map((r) => (
            <div
              className="fc5-flat-row fc5-flat-row--clickable"
              role="row"
              key={r.id}
              tabIndex={0}
              onClick={() => playAudio(r.hanzi, r.audio)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  playAudio(r.hanzi, r.audio);
                }
              }}
              aria-label={`${r.hanzi} — ${copy.deckActionListen}`}
            >
              <div
                className="fc5-flat-col fc5-flat-col--status"
                role="cell"
              >
                <span
                  className={`fc5-flat-statusdot is-${r.status}`}
                  aria-hidden="true"
                />
              </div>
              <div
                className="fc5-flat-col fc5-flat-col--word"
                role="cell"
              >
                <span className="fc5-flat-hanzi">{r.hanzi}</span>
                <span className="fc5-flat-pinyin">({r.pinyin})</span>
                <span
                  className="fc5-flat-audio-hint"
                  aria-hidden="true"
                >
                  🔊
                </span>
              </div>
              <div
                className="fc5-flat-col fc5-flat-col--trans"
                role="cell"
                title={r.translation}
              >
                <span className="fc5-flat-trans-text">{r.translation}</span>
              </div>
              <div
                className="fc5-flat-col fc5-flat-col--source"
                role="cell"
                title={r.sourceLabel}
              >
                {r.sourceLabel !== '—' ? (
                  <span className="fc5-flat-source-chip">{r.sourceLabel}</span>
                ) : (
                  <span className="fc5-flat-source-none">—</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------------
//  DECK GRID
// ----------------------------------------------------------------------------

function DeckGrid({
  decks,
  copy,
  onOpen,
  srsTile,
  language
}: {
  decks: DeckSummary[];
  copy: CopyType;
  onOpen: (deck: DeckSummary) => void;
  /** Tuile « Répétition espacée » à insérer en première position. */
  srsTile?: {
    dueCount: number;
    unit: string;
    onStart: () => void;
    disabled?: boolean;
  };
  language: 'fr' | 'en';
}) {
  // Cas vide : on affiche quand même la SRS tile si pertinent (rare mais cohérent
  // — l'utilisateur peut avoir des cartes dues sans avoir de "deck" complet).
  if (decks.length === 0 && (!srsTile || srsTile.dueCount === 0)) {
    return <div className="fc5-decks-empty">{copy.decksEmpty}</div>;
  }
  return (
    <div className="fc5-decks-grid">
      {srsTile && srsTile.dueCount > 0 && (
        <div
          className="fc5-srs-tile"
          role="region"
          aria-label={copy.srsCardKicker}
        >
          <div className="fc5-srs-tile-head">
            <div className="fc5-srs-tile-icon" aria-hidden="true">
              🔄
            </div>
            <span className="fc5-srs-tile-kicker">{copy.srsCardKicker}</span>
          </div>
          <strong className="fc5-srs-tile-title">
            {copy.srsCardTitle(srsTile.dueCount, srsTile.unit)}
          </strong>
          <span className="fc5-srs-tile-sub">{copy.srsCardSub}</span>
          <button
            type="button"
            className="fc5-srs-tile-cta"
            onClick={srsTile.onStart}
            disabled={srsTile.disabled}
          >
            {copy.srsCardCta}
          </button>
        </div>
      )}
      {decks.map((d) => {
        const pct = d.total > 0 ? Math.round((d.masteredN / d.total) * 100) : 0;
        // Le pied de tuile ne porte plus le statut (déjà encodé dans la barre
        // de progression + le compteur "Nx"). On y met "Étudié il y a Nj" ou
        // "Pas encore étudié" — parité avec Seonsaengnim.
        const relLabel = formatRelativeStudyTime(d.lastStudiedAt, language);
        const lastStudiedLabel = relLabel
          ? copy.deckLastStudiedRelative(relLabel)
          : copy.deckLastStudiedNever;
        const statusClass = d.status === 'mastered' ? 'is-mastered' : d.status === 'progress' ? 'is-progress' : '';
        return (
          <div
            key={d.id}
            className="fc5-deck"
            role="button"
            tabIndex={0}
            onClick={() => onOpen(d)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpen(d);
              }
            }}
          >
            <div className="fc5-deck-head">
              <div className="fc5-deck-icon">📖</div>
              <div className="fc5-deck-label">{d.label}</div>
              <span className={`fc5-deck-cefr fc5-deck-cefr--${d.cefr.toLowerCase().replace('+', 'plus')}`}>
                {d.cefr}
              </span>
            </div>

            <div className="fc5-deck-body">
              <div className="fc5-deck-progress-row">
                <div className="fc5-deck-progress-track">
                  <div
                    className="fc5-deck-progress-fill"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="fc5-deck-pct">{pct}%</span>
              </div>
              <div className="fc5-deck-meta">
                <span>
                  {d.total} {copy.deckWords} · {d.newN} {copy.deckNew}
                </span>
              </div>
              <div className="fc5-deck-footer">
                <span className={`fc5-deck-status ${statusClass}`}>{lastStudiedLabel}</span>
                <button
                  type="button"
                  className="fc5-deck-cta"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen(d);
                  }}
                >
                  {copy.deckStudy} →
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ----------------------------------------------------------------------------
//  DECK DETAIL — vue Seonsaengnim : hero + status chips + filtres + tableau
// ----------------------------------------------------------------------------

function DeckDetailView({
  deck,
  copy,
  masteredSet,
  dueSet,
  difficultSet,
  language,
  onBack,
  onStudy
}: {
  deck: DeckSummary;
  copy: CopyType;
  masteredSet: Set<string>;
  dueSet: Set<string>;
  difficultSet: Set<string>;
  language: 'fr' | 'en';
  onBack: () => void;
  onStudy: () => void;
}) {
  const [filter, setFilter] = useState<DeckFilter>('all');

  // Compute per-word status once.
  const rows = useMemo(() => {
    return deck.items.map((w) => {
      let status: DeckFilter = 'new';
      if (masteredSet.has(w.id)) status = 'mastered';
      else if (difficultSet.has(w.id)) status = 'difficult';
      else if (dueSet.has(w.id)) status = 'progress';
      else status = 'new';
      return { ...w, status };
    });
  }, [deck.items, masteredSet, dueSet, difficultSet]);

  const counts = useMemo(() => {
    let m = 0,
      p = 0,
      n = 0,
      d = 0;
    for (const r of rows) {
      if (r.status === 'mastered') m++;
      else if (r.status === 'progress') p++;
      else if (r.status === 'difficult') d++;
      else n++;
    }
    return { mastered: m, progress: p, newN: n, difficult: d };
  }, [rows]);

  const pct = deck.total > 0 ? Math.round((counts.mastered / deck.total) * 100) : 0;

  const filtered = useMemo(
    () => (filter === 'all' ? rows : rows.filter((r) => r.status === filter)),
    [filter, rows]
  );

  const playAudio = useCallback((text: string) => {
    // 100% MP3/WAV (playHanziAudio tente les conventions HSK `audio/hskN/`).
    // Pas de Web Speech pour garantir la cohérence Chrome / Safari / mobile.
    playHanziAudio(text).catch((err) => console.warn('[flashcard audio]', err));
  }, []);

  const wordStatusLabel = (s: DeckFilter): string => {
    switch (s) {
      case 'mastered':
        return copy.deckWordStatusMastered;
      case 'progress':
        return copy.deckWordStatusProgress;
      case 'difficult':
        return copy.deckWordStatusDifficult;
      case 'new':
      default:
        return copy.deckWordStatusNew;
    }
  };

  const filterTabs: { key: DeckFilter; label: string }[] = [
    { key: 'all', label: copy.deckFilterAll },
    { key: 'mastered', label: copy.deckFilterMastered },
    { key: 'progress', label: copy.deckFilterProgress },
    { key: 'new', label: copy.deckFilterNew },
    { key: 'difficult', label: copy.deckFilterDifficult }
  ];

  const translationOf = (c: StudyCard) =>
    language === 'fr' ? c.translationFr : c.translationEn ?? c.translationFr;

  return (
    <div className="fc5-deck-detail">
      <button type="button" className="fc5-deck-back" onClick={onBack}>
        {copy.deckBack}
      </button>

      {/* Hero card */}
      <div className="fc5-deck-hero">
        <div className="fc5-deck-hero-main">
          <div className="fc5-deck-hero-icon">📖</div>
          <div className="fc5-deck-hero-text">
            <h1 className="fc5-deck-hero-title">{deck.label}</h1>
            <div className="fc5-deck-hero-meta">
              <span>
                {deck.total} {copy.deckWords}
              </span>
              <span className="fc5-deck-hero-sep">·</span>
              <span>
                {pct}% {copy.deckMasteryLabel}
              </span>
              <span
                className={`fc5-deck-cefr fc5-deck-cefr--${deck.cefr.toLowerCase().replace('+', 'plus')}`}
              >
                {deck.cefr}
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="fc5-deck-hero-cta"
          onClick={onStudy}
          disabled={deck.total === 0}
        >
          {copy.deckStudyCta}
        </button>
      </div>

      {/* Status chips */}
      <div className="fc5-deck-statchips">
        <span className="fc5-deck-statchip is-mastered">
          {copy.deckChipMastered(counts.mastered)}
        </span>
        <span className="fc5-deck-statchip is-progress">
          {copy.deckChipProgress(counts.progress)}
        </span>
        <span className="fc5-deck-statchip is-new">
          {copy.deckChipNew(counts.newN)}
        </span>
        <span className="fc5-deck-statchip is-difficult">
          {copy.deckChipDifficult(counts.difficult)}
        </span>
      </div>

      {/* Filter tabs */}
      <div className="fc5-deck-filtertabs" role="tablist">
        {filterTabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={filter === t.key}
            className={`fc5-deck-filtertab ${filter === t.key ? 'is-active' : ''}`}
            onClick={() => setFilter(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Word table */}
      <div className="fc5-deck-table" role="table">
        <div className="fc5-deck-table-head" role="row">
          <div className="fc5-deck-col fc5-deck-col--status" role="columnheader">
            {copy.deckTableStatus}
          </div>
          <div className="fc5-deck-col fc5-deck-col--word" role="columnheader">
            {copy.deckTableWord}
          </div>
          <div className="fc5-deck-col fc5-deck-col--trans" role="columnheader">
            {copy.deckTableTrans}
          </div>
          <div className="fc5-deck-col fc5-deck-col--actions" role="columnheader">
            {copy.deckTableActions}
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="fc5-deck-table-empty">{copy.deckTableEmpty}</div>
        ) : (
          filtered.map((r) => (
            <div className="fc5-deck-table-row" role="row" key={r.id}>
              <div className="fc5-deck-col fc5-deck-col--status" role="cell">
                <span className={`fc5-deck-wordstatus is-${r.status}`}>
                  {wordStatusLabel(r.status)}
                </span>
              </div>
              <div className="fc5-deck-col fc5-deck-col--word" role="cell">
                <span className="fc5-deck-word-hanzi">{r.hanzi}</span>
                <span className="fc5-deck-word-pinyin">{r.pinyin}</span>
              </div>
              <div className="fc5-deck-col fc5-deck-col--trans" role="cell">
                {translationOf(r)}
              </div>
              <div className="fc5-deck-col fc5-deck-col--actions" role="cell">
                <button
                  type="button"
                  className="fc5-deck-rowbtn"
                  onClick={() => playAudio(r.hanzi)}
                  aria-label={copy.deckActionListen}
                  title={copy.deckActionListen}
                >
                  🔊
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
//  SESSION SETUP MODAL
// ----------------------------------------------------------------------------

function SessionSetupModal({
  copy,
  counts,
  modalMode,
  setModalMode,
  modalCount,
  setModalCount,
  direction,
  setDirection,
  available,
  onClose,
  onStart,
  language,
  selectedDeckLabel,
  selectedDeckTotal
}: {
  copy: CopyType;
  counts: { due: number; inProgress: number; newN: number; difficult: number };
  modalMode: ModalMode;
  setModalMode: (m: ModalMode) => void;
  modalCount: number;
  setModalCount: (n: number) => void;
  direction: FlashcardDirection;
  setDirection: (d: FlashcardDirection) => void;
  available: number;
  onClose: () => void;
  onStart: () => void;
  language: 'fr' | 'en';
  selectedDeckLabel?: string;
  selectedDeckTotal?: number;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const SIZES = [10, 20, 30, 50];

  return (
    <div
      className="fc5-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="fc5-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fc5-modal-title"
      >
        <button
          type="button"
          className="fc5-modal-close"
          onClick={onClose}
          aria-label={copy.modalClose}
        >
          ✕
        </button>

        <h2 id="fc5-modal-title" className="fc5-modal-title">
          {copy.modalTitle}
        </h2>

        {/* Mode tiles */}
        <div className="fc5-mode-tiles">
          {selectedDeckLabel ? (
            <ModeTile
              active={modalMode === 'collection'}
              icon="📖"
              title={copy.modeCollection}
              sub={
                selectedDeckTotal
                  ? `${selectedDeckLabel} · ${selectedDeckTotal} ${copy.deckWords}`
                  : selectedDeckLabel
              }
              badge={language === 'fr' ? 'Sélection' : 'Selection'}
              badgeClass="is-collection"
              onClick={() => setModalMode('collection')}
            />
          ) : null}
          <ModeTile
            active={modalMode === 'revise'}
            icon="🔄"
            title={copy.modeRevise}
            sub={copy.modeReviseSub(counts.due, counts.inProgress)}
            badge={copy.modeReviseBadge}
            badgeClass="is-recommend"
            onClick={() => setModalMode('revise')}
          />
          <ModeTile
            active={modalMode === 'new'}
            icon="⭐"
            title={copy.modeNew}
            sub={copy.modeNewSub(counts.newN)}
            badge={copy.modeNewBadge}
            badgeClass="is-new"
            onClick={() => setModalMode('new')}
          />
          {counts.difficult > 0 ? (
            <ModeTile
              active={modalMode === 'difficult'}
              icon="🔴"
              title={copy.modeDifficult}
              sub={copy.modeDifficultSub(counts.difficult)}
              badge={copy.modeDifficultBadge}
              badgeClass="is-difficult"
              onClick={() => setModalMode('difficult')}
            />
          ) : null}
        </div>

        {/* Count */}
        <div className="fc5-modal-section">
          <h3 className="fc5-modal-h3">{copy.countTitle}</h3>
          <div className="fc5-count-row">
            {SIZES.map((n) => (
              <button
                key={n}
                type="button"
                className={`fc5-count-btn ${modalCount === n ? 'is-active' : ''}`}
                onClick={() => setModalCount(n)}
                disabled={available > 0 && n > available}
              >
                {n}
              </button>
            ))}
          </div>
          {available === 0 ? (
            <p className="fc5-count-hint">{copy.countHintEmpty}</p>
          ) : null}
        </div>

        {/* Direction */}
        <div className="fc5-modal-section">
          <h3 className="fc5-modal-h3">{copy.dirTitle}</h3>
          <div className="fc5-dir-row">
            <button
              type="button"
              className={`fc5-dir-btn ${direction === 'hanzi-to-fr' ? 'is-active' : ''}`}
              onClick={() => setDirection('hanzi-to-fr')}
            >
              <div className="fc5-dir-btn-emoji">{copy.dirHanziToFr.emoji}</div>
              <div className="fc5-dir-btn-label">{copy.dirHanziToFr.sub}</div>
            </button>
            <button
              type="button"
              className={`fc5-dir-btn ${direction === 'fr-to-hanzi' ? 'is-active' : ''}`}
              onClick={() => setDirection('fr-to-hanzi')}
            >
              <div className="fc5-dir-btn-emoji">{copy.dirFrToHanzi.emoji}</div>
              <div className="fc5-dir-btn-label">{copy.dirFrToHanzi.sub}</div>
            </button>
          </div>
        </div>

        <button
          type="button"
          className="fc5-cta-primary"
          onClick={onStart}
          disabled={available === 0}
        >
          {copy.cta} →
        </button>
      </div>
    </div>
  );
}

function ModeTile({
  active,
  icon,
  title,
  sub,
  badge,
  badgeClass,
  onClick
}: {
  active: boolean;
  icon: string;
  title: string;
  sub: string;
  badge: string;
  badgeClass: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`fc5-mode-tile ${active ? 'is-active' : ''}`}
      onClick={onClick}
    >
      <span className="fc5-mode-tile-icon">{icon}</span>
      <div className="fc5-mode-tile-main">
        <div className="fc5-mode-tile-title">{title}</div>
        <div className="fc5-mode-tile-sub">{sub}</div>
      </div>
      {badge ? (
        <span className={`fc5-mode-tile-badge ${badgeClass}`}>{badge}</span>
      ) : null}
    </button>
  );
}

// ----------------------------------------------------------------------------
//  WOTD
// ----------------------------------------------------------------------------

function WordOfTheDayCard({
  wotd,
  copy,
  language
}: {
  wotd: WordOfTheDay | null;
  copy: CopyType;
  language: 'fr' | 'en';
}) {
  const playAudio = useCallback(() => {
    if (!wotd) return;
    playHanziAudio(wotd.hanzi, (wotd as { audio?: string }).audio).catch((err) =>
      console.warn('[WOTD audio]', err)
    );
  }, [wotd]);

  if (!wotd) {
    return (
      <div className="fc5-wotd fc5-wotd--empty">
        <div className="fc5-wotd-head">
          <span>{copy.wotdTitle}</span>
        </div>
        <div style={{ textAlign: 'center', padding: 16, opacity: 0.7 }}>
          {copy.wotdEmpty}
        </div>
      </div>
    );
  }

  const meaning =
    language === 'fr' ? wotd.translationFr : wotd.translationEn ?? wotd.translationFr;

  return (
    <div className="fc5-wotd">
      <div className="fc5-wotd-head">
        <span>{copy.wotdTitle}</span>
        {wotd.level ? (
          <span className="fc5-wotd-badge">{String(wotd.level).toUpperCase()}</span>
        ) : null}
      </div>
      <div className="fc5-wotd-body">
        <div
          className="fc5-wotd-hanzi"
          onClick={playAudio}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              playAudio();
            }
          }}
        >
          {wotd.hanzi}
        </div>
        <div className="fc5-wotd-aside">
          <div className="fc5-wotd-pinyin">{wotd.pinyin}</div>
          <div className="fc5-wotd-meaning">{meaning}</div>
        </div>
      </div>
      <button type="button" className="fc5-wotd-play" onClick={playAudio}>
        {copy.wotdPlay}
      </button>
    </div>
  );
}

// ----------------------------------------------------------------------------
//  HEATMAP (palette v5)
// ----------------------------------------------------------------------------

function Heatmap({
  activity,
  copy
}: {
  activity: ReturnType<typeof useDailyActivity>;
  copy: CopyType;
}) {
  const WEEKS = 12;
  const grid = useMemo(() => activity.getLastNWeeks(WEEKS), [activity]);
  const dayLabels = ['L', 'M', 'Me', 'J', 'V', 'S', 'D'];

  return (
    <div className="fc5-heatmap">
      <div className="fc5-heatmap-grid">
        <div className="fc5-heatmap-daylabels">
          {dayLabels.map((d, i) => (
            <div key={i}>{i % 2 === 0 ? d : ''}</div>
          ))}
        </div>
        <div className="fc5-heatmap-cells">
          {grid.map((row, rIdx) => (
            <div key={rIdx} className="fc5-heatmap-row">
              {row.map((cell) => (
                <div
                  key={cell.date}
                  className={`fc5-heatmap-cell fc5-heatmap-cell--${cell.intensity} ${
                    cell.isToday ? 'is-today' : ''
                  } ${cell.isFuture ? 'is-future' : ''}`}
                  title={`${cell.date} — ${cell.cardsReviewed} cartes`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="fc5-heatmap-legend">
        <span>{copy.heatmapLess}</span>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={`fc5-heatmap-cell fc5-heatmap-cell--${i}`} />
        ))}
        <span>{copy.heatmapMore}</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
//  BADGES GRID (palette v5)
// ----------------------------------------------------------------------------

function BadgeGrid({
  badges,
  language
}: {
  badges: ReturnType<typeof useFlashcardBadges>;
  language: 'fr' | 'en';
}) {
  return (
    <div className="fc5-badges-grid">
      {badges.map((b) => (
        <div
          key={b.id}
          className={`fc5-badge ${b.earned ? 'fc5-badge--earned' : 'fc5-badge--locked'}`}
          title={language === 'fr' ? b.descriptionFr : b.descriptionEn}
        >
          <div className="fc5-badge-icon">{b.icon}</div>
          <div className="fc5-badge-meta">
            <div className="fc5-badge-label">
              {language === 'fr' ? b.labelFr : b.labelEn}
            </div>
            <div className="fc5-badge-desc">
              {language === 'fr' ? b.descriptionFr : b.descriptionEn}
            </div>
            {!b.earned ? (
              <>
                <div className="fc5-badge-progress">
                  <div
                    className="fc5-badge-progress-fill"
                    style={{ width: `${Math.round(b.progress * 100)}%` }}
                  />
                </div>
                <span className="fc5-badge-progress-label">
                  {b.current} / {b.target}
                </span>
              </>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

// ----------------------------------------------------------------------------
//  SUMMARY SCREEN
// ----------------------------------------------------------------------------

function SummaryScreen({
  summary,
  copy,
  onBack
}: {
  summary: FlashcardSessionSummary;
  copy: CopyType;
  onBack: () => void;
}) {
  const [xpAnim, setXpAnim] = useState(0);
  useEffect(() => {
    const target = summary.xpEarned;
    if (target === 0) {
      setXpAnim(0);
      return;
    }
    const step = Math.max(1, Math.ceil(target / 40));
    let cur = 0;
    const id = window.setInterval(() => {
      cur = Math.min(target, cur + step);
      setXpAnim(cur);
      if (cur >= target) window.clearInterval(id);
    }, 20);
    return () => window.clearInterval(id);
  }, [summary.xpEarned]);

  const accuracy =
    summary.totalCards > 0
      ? Math.round((summary.correctCount / summary.totalCards) * 100)
      : 0;
  const durationMs = Math.max(0, summary.endedAt - summary.startedAt);
  const durationSec = Math.floor(durationMs / 1000);
  const durationStr =
    durationSec >= 60
      ? `${Math.floor(durationSec / 60)}m ${durationSec % 60}s`
      : `${durationSec}s`;

  return (
    <div className="fc5-root">
      <div
        style={{
          background: 'var(--fc5-surface-alt)',
          borderRadius: 24,
          padding: 32,
          maxWidth: 600,
          margin: '32px auto',
          textAlign: 'center',
          border: '1px solid var(--fc5-border)'
        }}
      >
        <div style={{ fontSize: 48 }}>🎉</div>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: 'var(--fc5-text)',
            margin: '8px 0 24px'
          }}
        >
          {copy.summaryTitle}
        </h2>

        <div style={{ fontSize: 56, fontWeight: 800, color: 'var(--fc5-primary)' }}>
          +{xpAnim}{' '}
          <span style={{ fontSize: 20, color: 'var(--fc5-text-muted)' }}>XP</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            margin: '24px 0'
          }}
        >
          <div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>{summary.totalCards}</div>
            <div style={{ fontSize: 12, color: 'var(--fc5-text-muted)' }}>
              {copy.summaryCards}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>{accuracy}%</div>
            <div style={{ fontSize: 12, color: 'var(--fc5-text-muted)' }}>
              {copy.summaryAccuracy}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>{durationStr}</div>
            <div style={{ fontSize: 12, color: 'var(--fc5-text-muted)' }}>
              {copy.summaryDuration}
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 8,
            marginBottom: 24
          }}
        >
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--fc5-danger)' }}>
              {summary.againCount}
            </div>
            <div style={{ fontSize: 11, color: 'var(--fc5-text-muted)' }}>
              {copy.summaryAgain}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--fc5-warn)' }}>
              {summary.hardCount}
            </div>
            <div style={{ fontSize: 11, color: 'var(--fc5-text-muted)' }}>
              {copy.summaryHard}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--fc5-success)' }}>
              {summary.goodCount}
            </div>
            <div style={{ fontSize: 11, color: 'var(--fc5-text-muted)' }}>
              {copy.summaryGood}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--fc5-primary)' }}>
              {summary.easyCount}
            </div>
            <div style={{ fontSize: 11, color: 'var(--fc5-text-muted)' }}>
              {copy.summaryEasy}
            </div>
          </div>
        </div>

        <button type="button" className="fc5-cta-primary" onClick={onBack}>
          {copy.summaryBack}
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
//  ADD PERSONAL CARD MODAL
// ----------------------------------------------------------------------------

function AddCardModal({
  language,
  onClose,
  onSave,
  errorMessage
}: {
  language: 'fr' | 'en';
  onClose: () => void;
  onSave: (input: CreatePersonalInput) => void;
  errorMessage: string | null;
}) {
  const [hanzi, setHanzi] = useState('');
  const [pinyin, setPinyin] = useState('');
  const [translationFr, setTranslationFr] = useState('');
  const [translationEn, setTranslationEn] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const trimmedHanzi = hanzi.trim();
  const trimmedTransFr = translationFr.trim();
  const canSave = trimmedHanzi.length > 0 && trimmedTransFr.length > 0;

  const autoPinyin = () => {
    if (!trimmedHanzi) return;
    const found = lookupPinyinForHanzi(trimmedHanzi);
    if (found) setPinyin(found);
  };

  const submit = () => {
    if (!canSave) return;
    onSave({
      hanzi: trimmedHanzi,
      pinyin: pinyin.trim() || undefined,
      translationFr: trimmedTransFr,
      translationEn: translationEn.trim() || undefined,
      note: note.trim() || undefined
    });
  };

  const L = (fr: string, en: string) => (language === 'fr' ? fr : en);

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 10,
    border: '1px solid var(--fc5-border)',
    background: '#fff',
    fontSize: 15,
    color: 'var(--fc5-text)',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  };

  const labelStyle: CSSProperties = {
    display: 'block',
    fontSize: 12,
    fontWeight: 700,
    color: 'var(--fc5-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    marginBottom: 6
  };

  const fieldStyle: CSSProperties = { marginBottom: 16 };

  return (
    <div
      className="fc5-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="fc5-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fc5-add-modal-title"
      >
        <button
          type="button"
          className="fc5-modal-close"
          onClick={onClose}
          aria-label={L('Fermer', 'Close')}
        >
          ✕
        </button>

        <h2 id="fc5-add-modal-title" className="fc5-modal-title">
          {L('Ajouter une carte', 'Add a card')}
        </h2>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="fc5-add-hanzi">
            {L('Hanzi (requis)', 'Hanzi (required)')}
          </label>
          <input
            id="fc5-add-hanzi"
            type="text"
            value={hanzi}
            onChange={(e) => setHanzi(e.target.value)}
            placeholder="你好"
            style={inputStyle}
            autoFocus
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="fc5-add-pinyin">
            {L('Pinyin', 'Pinyin')}
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              id="fc5-add-pinyin"
              type="text"
              value={pinyin}
              onChange={(e) => setPinyin(e.target.value)}
              placeholder="nǐ hǎo"
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              type="button"
              onClick={autoPinyin}
              disabled={!trimmedHanzi}
              title={L('Remplir auto depuis CFDICT', 'Auto-fill from CFDICT')}
              style={{
                padding: '10px 14px',
                borderRadius: 10,
                border: '1px solid var(--fc5-border)',
                background: trimmedHanzi ? 'var(--fc5-surface-muted)' : '#f3f0ea',
                color: 'var(--fc5-text)',
                fontSize: 16,
                cursor: trimmedHanzi ? 'pointer' : 'not-allowed',
                fontWeight: 600
              }}
            >
              ⚡
            </button>
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="fc5-add-trans-fr">
            {L('Traduction française (requise)', 'French translation (required)')}
          </label>
          <input
            id="fc5-add-trans-fr"
            type="text"
            value={translationFr}
            onChange={(e) => setTranslationFr(e.target.value)}
            placeholder={L('Bonjour', 'Hello')}
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="fc5-add-trans-en">
            {L('Traduction anglaise', 'English translation')}
          </label>
          <input
            id="fc5-add-trans-en"
            type="text"
            value={translationEn}
            onChange={(e) => setTranslationEn(e.target.value)}
            placeholder="Hello"
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="fc5-add-note">
            {L('Note (optionnel)', 'Note (optional)')}
          </label>
          <textarea
            id="fc5-add-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder={L('Mnémonique, exemple…', 'Mnemonic, example…')}
            style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }}
          />
        </div>

        {errorMessage ? (
          <div
            style={{
              background: '#fde9e7',
              color: 'var(--fc5-danger)',
              border: '1px solid #f7c9c5',
              borderRadius: 10,
              padding: '10px 12px',
              fontSize: 13,
              marginBottom: 12
            }}
          >
            {errorMessage}
          </div>
        ) : null}

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: 12,
              border: '1px solid var(--fc5-border)',
              background: '#fff',
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--fc5-text)',
              cursor: 'pointer'
            }}
          >
            {L('Annuler', 'Cancel')}
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={!canSave}
            className="fc5-cta-primary"
            style={{ flex: 1, margin: 0 }}
          >
            {L('Enregistrer', 'Save')}
          </button>
        </div>
      </div>
    </div>
  );
}

// Re-export helpers (compat V4).
export type { FlashcardV2Item, FlashcardsV2HskLevel };
