/**
 * FlashcardPageV4.tsx — Flashcards V9 (XiaoLearn, Seonsaengnim-style)
 * ---------------------------------------------------------------------
 * Refonte majeure inspirée de Seonsaengnim :
 *   1. **Dashboard hub** : Mot du jour, stats, streak, XP, heatmap, badges
 *   2. **5 modes d'étude** : flip / QCM / saisie / écoute / speed 60s
 *   3. **Direction toggle** hanzi ↔ FR (hérité V3)
 *   4. **Session in-page** : plus de navigation vers ReviewPageV3 —
 *      la session se déroule dans la même page (SessionView), plus immersif.
 *   5. **Gamification** : XP par rating, badges dérivés, streak journalier.
 *
 * Drop-in : mêmes props que V3 (wordItems, sentenceCards, personalHook, ...)
 * + nouveau callback `onRate(cardId, quality)` pour mettre à jour le SRS
 * global via useFlashcardSRS.answerCard. Si `onRate` n'est pas fourni,
 * la page reste utilisable mais la progression SRS n'est pas persistée
 * (mode démo / preview).
 *
 * Le parent conserve la gestion de useFlashcardSRS, usePersonalFlashcards
 * et useCustomLists — rien ne change côté App.tsx à part le nom du composant
 * et l'ajout de `onRate`.
 *
 * Styles : `../styles/flashcards-v4.css` (classes fc4-*).
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import type {
  FlashcardV2Item,
  FlashcardV2CustomList,
  FlashcardsV2HskLevel
} from './FlashcardPageV2';
import type {
  FlashcardDirection,
  SentenceFlashcard
} from '../types/flashcard-v3';
import type { UsePersonalFlashcardsReturn } from '../hooks/usePersonalFlashcards';
import {
  type StudyMode,
  type FlashcardSessionSummary,
  type WordOfTheDay,
  STUDY_MODE_LABEL
} from '../types/flashcard-v4';
import { useDailyActivity } from '../hooks/useDailyActivity';
import {
  useFlashcardBadges,
  countEarnedBadges,
  TOTAL_BADGES
} from '../hooks/useFlashcardBadges';
import { SessionView, SpeedRound } from '../components/FlashcardV4/SessionView';
import type { StudyCard } from '../components/FlashcardV4/StudyModeComponents';
import { playHanziAudio } from '../utils/audio';
import '../styles/flashcards-v2.css';
import '../styles/flashcards-v3.css';
import '../styles/flashcards-v4.css';

// ============================================================================
//  PROPS
// ============================================================================

export type FlashcardPageV4Language = 'fr' | 'en';

export interface FlashcardPageV4Props {
  /** Items "mots" (tokens = 1 ou non-phrase). */
  wordItems: FlashcardV2Item[];
  /** Phrases issues des dialogues des leçons complétées (optionnel). */
  sentenceCards?: SentenceFlashcard[];
  /** Hook CRUD + SRS pour les cartes personnelles (optionnel). */
  personalHook?: UsePersonalFlashcardsReturn;
  language?: FlashcardPageV4Language;
  /** Listes custom. */
  customLists?: FlashcardV2CustomList[];
  /** Ids dus (useFlashcardSRS). */
  dueIds?: Set<string> | string[];
  /** Ids maîtrisés (level >= 6). */
  masteredIds?: Set<string> | string[];
  /** Ids difficiles. */
  difficultIds?: Set<string> | string[];
  /**
   * Callback SRS : appelé pour chaque carte notée dans la session, avec la
   * qualité 1-4 compatible useFlashcardSRS.answerCard(quality).
   */
  onRate?: (cardId: string, quality: 1 | 2 | 3 | 4) => void;
  /** Fallback : lancer la review sur la page dédiée (legacy V3). */
  onStartGlobalReview?: (direction: FlashcardDirection) => void;
  /** Fallback : review phrases legacy. */
  onStartSentenceReview?: (direction: FlashcardDirection) => void;
  /** Fallback : review personnelle legacy. */
  onStartPersonalReview?: (direction: FlashcardDirection) => void;
}

// ============================================================================
//  COPIES
// ============================================================================

const COPY = {
  fr: {
    title: 'Flashcards',
    subtitle: 'Mémorisation active, à ton rythme.',
    directionLabel: 'Sens',
    directionHanziFr: '汉 → FR',
    directionFrHanzi: 'FR → 汉',
    wotdTitle: 'Mot du jour',
    wotdEmpty: 'Apprends une leçon pour débloquer le mot du jour',
    statMastered: 'Maîtrisés',
    statDue: 'À revoir',
    statStreak: 'Streak',
    statXp: 'XP',
    statTotal: 'Total',
    modeTitle: 'Mode',
    goalTitle: 'Session du jour',
    goalCards: 'cartes',
    goalStart: 'Commencer la session',
    goalStartSpeed: 'Démarrer le speed round',
    goalEmpty: 'Aucune carte disponible. Continue tes leçons pour remplir ton deck.',
    heatmapTitle: 'Activité (12 dernières semaines)',
    heatmapLegendLess: 'Moins',
    heatmapLegendMore: 'Plus',
    badgesTitle: 'Badges',
    badgesEarned: 'gagnés',
    summaryTitle: 'Session terminée',
    summaryCards: 'cartes revues',
    summaryXp: 'XP gagnée',
    summaryAccuracy: 'Précision',
    summaryDuration: 'Durée',
    summaryAgain: 'À revoir',
    summaryHard: 'Difficile',
    summaryGood: 'Bien',
    summaryEasy: 'Facile',
    summaryBack: 'Retour au dashboard',
    sourceTitle: 'Source',
    sourceAll: 'Toutes',
    sourceDue: 'À revoir',
    sourceMastered: 'Maîtrisées',
    sourceNew: 'Nouvelles',
    sourceDifficult: 'Difficiles',
    sourceSentences: 'Phrases',
    sourcePersonal: 'Mes cartes',
    searchPlaceholder: 'Rechercher (hanzi, pinyin, traduction)…',
    searchResults: 'résultats',
    studyNow: '⚡ Étudier maintenant',
    decksTitle: 'Mes decks par leçon',
    decksEmpty: 'Aucun deck pour le moment — termine une leçon pour en débloquer.',
    deckStudy: 'Étudier',
    deckWords: 'mots',
    deckNew: 'nouveaux',
    deckDue: 'à revoir',
    deckMastered: 'maîtrisés',
    daysMon: 'L',
    daysTue: 'M',
    daysWed: 'Me',
    daysThu: 'J',
    daysFri: 'V',
    daysSat: 'S',
    daysSun: 'D',
    playAudio: 'Écouter',
    noRateWarning: 'Mode preview — ta progression ne sera pas sauvegardée (aucun SRS branché).'
  },
  en: {
    title: 'Flashcards',
    subtitle: 'Active memorization, at your pace.',
    directionLabel: 'Direction',
    directionHanziFr: '汉 → EN',
    directionFrHanzi: 'EN → 汉',
    wotdTitle: 'Word of the day',
    wotdEmpty: 'Complete a lesson to unlock the word of the day',
    statMastered: 'Mastered',
    statDue: 'Due',
    statStreak: 'Streak',
    statXp: 'XP',
    statTotal: 'Total',
    modeTitle: 'Mode',
    goalTitle: "Today's session",
    goalCards: 'cards',
    goalStart: 'Start session',
    goalStartSpeed: 'Start speed round',
    goalEmpty: 'No cards available yet. Complete lessons to build your deck.',
    heatmapTitle: 'Activity (last 12 weeks)',
    heatmapLegendLess: 'Less',
    heatmapLegendMore: 'More',
    badgesTitle: 'Badges',
    badgesEarned: 'earned',
    summaryTitle: 'Session complete',
    summaryCards: 'cards reviewed',
    summaryXp: 'XP earned',
    summaryAccuracy: 'Accuracy',
    summaryDuration: 'Duration',
    summaryAgain: 'Again',
    summaryHard: 'Hard',
    summaryGood: 'Good',
    summaryEasy: 'Easy',
    summaryBack: 'Back to dashboard',
    sourceTitle: 'Source',
    sourceAll: 'All',
    sourceDue: 'Due',
    sourceMastered: 'Mastered',
    sourceNew: 'New',
    sourceDifficult: 'Difficult',
    sourceSentences: 'Sentences',
    sourcePersonal: 'My cards',
    searchPlaceholder: 'Search (hanzi, pinyin, meaning)…',
    searchResults: 'results',
    studyNow: '⚡ Study now',
    decksTitle: 'My decks by lesson',
    decksEmpty: 'No decks yet — complete a lesson to unlock one.',
    deckStudy: 'Study',
    deckWords: 'words',
    deckNew: 'new',
    deckDue: 'due',
    deckMastered: 'mastered',
    daysMon: 'M',
    daysTue: 'T',
    daysWed: 'W',
    daysThu: 'T',
    daysFri: 'F',
    daysSat: 'S',
    daysSun: 'S',
    playAudio: 'Play',
    noRateWarning: 'Preview mode — your progress will not be saved (SRS not wired).'
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
    translationEn: item.translationEn
  };
}

function sentenceToStudyCard(s: SentenceFlashcard): StudyCard {
  return {
    id: s.id,
    hanzi: s.hanzi,
    pinyin: s.pinyin,
    translationFr: s.translationFr,
    translationEn: s.translationEn
  };
}

/** Seed stable pour le mot du jour : YYYY-MM-DD → index déterministe. */
function hashStringToInt(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

type SessionSource =
  | 'due'
  | 'all'
  | 'mastered'
  | 'new'
  | 'difficult'
  | 'sentences'
  | 'personal';

// ============================================================================
//  COMPONENT
// ============================================================================

export default function FlashcardPageV4({
  wordItems,
  sentenceCards = [],
  personalHook,
  language = 'fr',
  customLists: _customLists,
  dueIds,
  masteredIds,
  difficultIds,
  onRate
}: FlashcardPageV4Props) {
  const copy = COPY[language];

  // -- États UI --
  const [direction, setDirection] = useState<FlashcardDirection>('hanzi-to-fr');
  const [mode, setMode] = useState<StudyMode>('flip');
  const [sessionSource, setSessionSource] = useState<SessionSource>('due');
  const [sessionSize, setSessionSize] = useState<number>(20);
  const [view, setView] = useState<'dashboard' | 'session' | 'speed' | 'summary'>(
    'dashboard'
  );
  const [activeCards, setActiveCards] = useState<StudyCard[]>([]);
  const [lastSummary, setLastSummary] = useState<FlashcardSessionSummary | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  // -- Activity + badges --
  const activity = useDailyActivity();

  // -- Sets dérivés --
  const dueSet = useMemo(() => toSet(dueIds), [dueIds]);
  const masteredSet = useMemo(() => toSet(masteredIds), [masteredIds]);
  const difficultSet = useMemo(() => toSet(difficultIds), [difficultIds]);

  // -- Stats agrégées --
  const stats = useMemo(() => {
    const total = wordItems.length;
    const mastered = masteredSet.size;
    const due = wordItems.filter((w) => dueSet.has(w.id)).length;
    return { total, mastered, due };
  }, [wordItems, dueSet, masteredSet]);

  // -- Breakdowns pour les badges (par niveau HSK) --
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

  // -- Mot du jour : déterministe sur YYYY-MM-DD + hanzi pool --
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

  // -- Pool de cartes candidates selon la source --
  const candidatePool = useMemo<StudyCard[]>(() => {
    let base: StudyCard[];
    switch (sessionSource) {
      case 'due':
        base = wordItems.filter((w) => dueSet.has(w.id)).map(itemToStudyCard);
        break;
      case 'mastered':
        base = wordItems.filter((w) => masteredSet.has(w.id)).map(itemToStudyCard);
        break;
      case 'new':
        base = wordItems
          .filter((w) => !dueSet.has(w.id) && !masteredSet.has(w.id))
          .map(itemToStudyCard);
        break;
      case 'difficult':
        base = wordItems.filter((w) => difficultSet.has(w.id)).map(itemToStudyCard);
        break;
      case 'sentences':
        base = sentenceCards.map(sentenceToStudyCard);
        break;
      case 'personal':
        base = personalHook
          ? personalHook.cards.map((c) => ({
              id: c.id,
              hanzi: c.hanzi,
              pinyin: c.pinyin,
              translationFr: c.translationFr,
              translationEn: c.translationEn
            }))
          : [];
        break;
      case 'all':
      default:
        base = wordItems.map(itemToStudyCard);
        break;
    }
    // Filtre texte (si requête active).
    const q = searchQuery.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (c) =>
        c.hanzi.includes(searchQuery.trim()) ||
        c.pinyin.toLowerCase().includes(q) ||
        c.translationFr.toLowerCase().includes(q) ||
        (c.translationEn?.toLowerCase().includes(q) ?? false)
    );
  }, [
    sessionSource,
    wordItems,
    sentenceCards,
    personalHook,
    dueSet,
    masteredSet,
    difficultSet,
    searchQuery
  ]);

  const distractorPool = useMemo<StudyCard[]>(
    () => wordItems.slice(0, 200).map(itemToStudyCard),
    [wordItems]
  );

  // -- Handlers --

  const handleStartSession = useCallback(() => {
    if (candidatePool.length === 0) return;
    const shuffled = [...candidatePool].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, Math.min(sessionSize, shuffled.length));
    setActiveCards(picked);
    setView(mode === 'speed' ? 'speed' : 'session');
  }, [candidatePool, sessionSize, mode]);

  /**
   * V9.1 — Étudier maintenant : one-click, contourne le setup panel.
   * Priorité : cartes dues (mode flip, 20 cartes) → fallback sur toutes les cartes.
   */
  const handleQuickStart = useCallback(() => {
    const dueCards = wordItems
      .filter((w) => dueSet.has(w.id))
      .map(itemToStudyCard);
    const fallback = wordItems.slice(0, 200).map(itemToStudyCard);
    const pool = dueCards.length > 0 ? dueCards : fallback;
    if (pool.length === 0) return;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, Math.min(20, shuffled.length));
    setActiveCards(picked);
    setMode('flip');
    setView('session');
  }, [wordItems, dueSet]);

  /**
   * V9.1 — Decks groupés par (niveau HSK × thème) façon Seonsaengnim
   * "Leçon : X". Trié par nombre de dues décroissant puis nom.
   */
  const decksByLesson = useMemo(() => {
    const buckets = new Map<string, FlashcardV2Item[]>();
    for (const item of wordItems) {
      const theme = item.theme ?? 'general';
      const key = `${item.level}::${theme}`;
      const list = buckets.get(key);
      if (list) list.push(item);
      else buckets.set(key, [item]);
    }
    return Array.from(buckets.entries())
      .map(([key, items]) => {
        const [level, theme] = key.split('::');
        let dueN = 0;
        let masteredN = 0;
        let newN = 0;
        for (const it of items) {
          if (masteredSet.has(it.id)) masteredN++;
          else if (dueSet.has(it.id)) dueN++;
          else if (!it.lastReviewedAt) newN++;
        }
        const themeLabel = theme.charAt(0).toUpperCase() + theme.slice(1);
        return {
          id: key,
          label: `${level.toUpperCase()} · ${themeLabel}`,
          total: items.length,
          dueN,
          masteredN,
          newN,
          items: items.map(itemToStudyCard)
        };
      })
      .sort((a, b) => {
        if (b.dueN !== a.dueN) return b.dueN - a.dueN;
        return a.label.localeCompare(b.label);
      });
  }, [wordItems, dueSet, masteredSet]);

  const handleStudyDeck = useCallback(
    (deckItems: StudyCard[]) => {
      if (deckItems.length === 0) return;
      const shuffled = [...deckItems].sort(() => Math.random() - 0.5);
      const picked = shuffled.slice(0, Math.min(20, shuffled.length));
      setActiveCards(picked);
      setMode('flip');
      setView('session');
    },
    []
  );

  const handleRate = useCallback(
    (cardId: string, quality: 1 | 2 | 3 | 4) => {
      if (onRate) onRate(cardId, quality);
    },
    [onRate]
  );

  const handleCardReviewed = useCallback(
    (rating: 'again' | 'hard' | 'good' | 'easy') => {
      activity.recordCardReview(rating);
    },
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

  const handleAbort = useCallback(() => {
    setView('dashboard');
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setLastSummary(null);
    setView('dashboard');
  }, []);

  // -- Rendus --

  if (view === 'session') {
    return (
      <SessionView
        mode={mode}
        direction={direction}
        cards={activeCards}
        language={language}
        distractorPool={distractorPool}
        onRate={handleRate}
        onCardReviewed={handleCardReviewed}
        onFinish={handleFinish}
        onAbort={handleAbort}
      />
    );
  }

  if (view === 'speed') {
    return (
      <SpeedRound
        cards={activeCards}
        direction={direction}
        language={language}
        onRate={handleRate}
        onCardReviewed={handleCardReviewed}
        onFinish={handleFinish}
        onAbort={handleAbort}
      />
    );
  }

  if (view === 'summary' && lastSummary) {
    return <SummaryScreen summary={lastSummary} copy={copy} onBack={handleBackToDashboard} />;
  }

  // ========== DASHBOARD ==========
  return (
    <div className="fc4-page">
      {/* Header */}
      <header className="fc4-header">
        <div>
          <h1 className="fc4-title">{copy.title}</h1>
          <p className="fc4-subtitle">{copy.subtitle}</p>
        </div>
        <div className="fc4-header-actions">
          <button
            type="button"
            className="fc4-quickstart-btn"
            onClick={handleQuickStart}
            disabled={wordItems.length === 0}
          >
            {copy.studyNow}
          </button>
          <DirectionToggle
            direction={direction}
            onChange={setDirection}
            copy={copy}
          />
        </div>
      </header>

      {!onRate ? (
        <div className="fc4-preview-banner" role="status">
          {copy.noRateWarning}
        </div>
      ) : null}

      {/* Ligne 1 : Mot du jour + Stats */}
      <div className="fc4-top-row">
        <WordOfTheDayCard wotd={wordOfTheDay} copy={copy} language={language} />
        <StatsRow
          stats={stats}
          streak={activity.currentStreak}
          xp={activity.totals.totalXp}
          copy={copy}
        />
      </div>

      {/* Ligne 2 : Mode + Session goal */}
      <section className="fc4-session-setup">
        <div className="fc4-panel">
          <h2 className="fc4-panel-title">{copy.modeTitle}</h2>
          <ModeSelector mode={mode} onChange={setMode} language={language} />
        </div>

        <div className="fc4-panel">
          <h2 className="fc4-panel-title">{copy.goalTitle}</h2>
          <SessionGoalPanel
            sessionSource={sessionSource}
            setSessionSource={setSessionSource}
            sessionSize={sessionSize}
            setSessionSize={setSessionSize}
            poolSize={candidatePool.length}
            copy={copy}
            hasPersonal={!!personalHook}
            hasSentences={sentenceCards.length > 0}
            hasDifficult={difficultSet.size > 0}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <button
            type="button"
            className="fc4-cta-start"
            onClick={handleStartSession}
            disabled={candidatePool.length === 0}
          >
            {mode === 'speed' ? copy.goalStartSpeed : copy.goalStart}
          </button>
        </div>
      </section>

      {/* V9.1 — Decks par leçon (Seonsaengnim-style) */}
      <section className="fc4-panel fc4-panel--wide">
        <h2 className="fc4-panel-title">{copy.decksTitle}</h2>
        <DeckList decks={decksByLesson} copy={copy} onStudy={handleStudyDeck} />
      </section>

      {/* Ligne 3 : Heatmap */}
      <section className="fc4-panel fc4-panel--wide">
        <h2 className="fc4-panel-title">{copy.heatmapTitle}</h2>
        <Heatmap activity={activity} copy={copy} />
      </section>

      {/* Ligne 4 : Badges */}
      <section className="fc4-panel fc4-panel--wide">
        <div className="fc4-panel-titlerow">
          <h2 className="fc4-panel-title">{copy.badgesTitle}</h2>
          <span className="fc4-badges-count">
            {badgesEarned} / {TOTAL_BADGES} {copy.badgesEarned}
          </span>
        </div>
        <BadgeGrid badges={badges} language={language} />
      </section>
    </div>
  );
}

// ============================================================================
//  SUB-COMPONENTS
// ============================================================================

function DirectionToggle({
  direction,
  onChange,
  copy
}: {
  direction: FlashcardDirection;
  onChange: (d: FlashcardDirection) => void;
  copy: CopyType;
}) {
  return (
    <div className="fc4-direction-toggle" role="radiogroup" aria-label={copy.directionLabel}>
      <button
        type="button"
        role="radio"
        aria-checked={direction === 'hanzi-to-fr'}
        className={`fc4-dir-opt ${direction === 'hanzi-to-fr' ? 'is-active' : ''}`}
        onClick={() => onChange('hanzi-to-fr')}
      >
        {copy.directionHanziFr}
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={direction === 'fr-to-hanzi'}
        className={`fc4-dir-opt ${direction === 'fr-to-hanzi' ? 'is-active' : ''}`}
        onClick={() => onChange('fr-to-hanzi')}
      >
        {copy.directionFrHanzi}
      </button>
    </div>
  );
}

function WordOfTheDayCard({
  wotd,
  copy,
  language
}: {
  wotd: WordOfTheDay | null;
  copy: CopyType;
  language: 'fr' | 'en';
}) {
  const playAudio = () => {
    if (!wotd) return;
    playHanziAudio(wotd.hanzi, (wotd as { audio?: string }).audio).catch((err) =>
      console.warn('[WOTD audio]', err)
    );
  };

  if (!wotd) {
    return (
      <div className="fc4-wotd fc4-wotd--empty">
        <div className="fc4-wotd-title">{copy.wotdTitle}</div>
        <div className="fc4-wotd-empty-msg">{copy.wotdEmpty}</div>
      </div>
    );
  }

  const meaning = language === 'fr' ? wotd.translationFr : wotd.translationEn ?? wotd.translationFr;

  return (
    <div className="fc4-wotd">
      <div className="fc4-wotd-head">
        <div className="fc4-wotd-title">{copy.wotdTitle}</div>
        {wotd.level ? <span className="fc4-wotd-level">{String(wotd.level).toUpperCase()}</span> : null}
      </div>
      <div className="fc4-wotd-body">
        <div className="fc4-wotd-hanzi" onClick={playAudio} role="button" tabIndex={0}>
          {wotd.hanzi}
        </div>
        <div className="fc4-wotd-pinyin">{wotd.pinyin}</div>
        <div className="fc4-wotd-meaning">{meaning}</div>
      </div>
      <button type="button" className="fc4-wotd-play" onClick={playAudio}>
        🔊 {copy.playAudio}
      </button>
    </div>
  );
}

function StatsRow({
  stats,
  streak,
  xp,
  copy
}: {
  stats: { total: number; mastered: number; due: number };
  streak: number;
  xp: number;
  copy: CopyType;
}) {
  return (
    <div className="fc4-stats">
      <StatChip label={copy.statDue} value={stats.due} tone="warn" />
      <StatChip label={copy.statMastered} value={stats.mastered} tone="good" />
      <StatChip label={copy.statStreak} value={streak} suffix="🔥" tone="streak" />
      <StatChip label={copy.statXp} value={xp} tone="xp" />
      <StatChip label={copy.statTotal} value={stats.total} tone="muted" />
    </div>
  );
}

function StatChip({
  label,
  value,
  suffix,
  tone
}: {
  label: string;
  value: number;
  suffix?: string;
  tone: 'warn' | 'good' | 'streak' | 'xp' | 'muted';
}) {
  return (
    <div className={`fc4-stat fc4-stat--${tone}`}>
      <div className="fc4-stat-value">
        {value.toLocaleString()}
        {suffix ? <span className="fc4-stat-suffix"> {suffix}</span> : null}
      </div>
      <div className="fc4-stat-label">{label}</div>
    </div>
  );
}

function ModeSelector({
  mode,
  onChange,
  language
}: {
  mode: StudyMode;
  onChange: (m: StudyMode) => void;
  language: 'fr' | 'en';
}) {
  const MODES: StudyMode[] = ['flip', 'mcq', 'typing', 'listening', 'speed'];
  const MODE_ICON: Record<StudyMode, string> = {
    flip: '🔄',
    mcq: '🅰️',
    typing: '⌨️',
    listening: '🎧',
    speed: '⚡'
  };
  return (
    <div className="fc4-mode-grid">
      {MODES.map((m) => {
        const label = STUDY_MODE_LABEL[m][language];
        return (
          <button
            key={m}
            type="button"
            className={`fc4-mode-btn ${mode === m ? 'is-active' : ''}`}
            onClick={() => onChange(m)}
          >
            <span className="fc4-mode-icon">{MODE_ICON[m]}</span>
            <span className="fc4-mode-label">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

function SessionGoalPanel({
  sessionSource,
  setSessionSource,
  sessionSize,
  setSessionSize,
  poolSize,
  copy,
  hasPersonal,
  hasSentences,
  hasDifficult,
  searchQuery,
  setSearchQuery
}: {
  sessionSource: SessionSource;
  setSessionSource: (s: SessionSource) => void;
  sessionSize: number;
  setSessionSize: (n: number) => void;
  poolSize: number;
  copy: CopyType;
  hasPersonal: boolean;
  hasSentences: boolean;
  hasDifficult: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) {
  const SIZES = [10, 20, 30, 50];
  const sources: Array<{ key: SessionSource; label: string; enabled: boolean }> = [
    { key: 'due', label: copy.sourceDue, enabled: true },
    { key: 'all', label: copy.sourceAll, enabled: true },
    { key: 'mastered', label: copy.sourceMastered, enabled: true },
    { key: 'new', label: copy.sourceNew, enabled: true },
    { key: 'difficult', label: copy.sourceDifficult, enabled: hasDifficult },
    { key: 'sentences', label: copy.sourceSentences, enabled: hasSentences },
    { key: 'personal', label: copy.sourcePersonal, enabled: hasPersonal }
  ];
  return (
    <>
      <div className="fc4-goal-srclabel">{copy.sourceTitle}</div>
      <div className="fc4-source-pills">
        {sources
          .filter((s) => s.enabled)
          .map((s) => (
            <button
              key={s.key}
              type="button"
              className={`fc4-source-pill ${sessionSource === s.key ? 'is-active' : ''}`}
              onClick={() => setSessionSource(s.key)}
            >
              {s.label}
            </button>
          ))}
      </div>

      {/* V9.1 — Barre de recherche textuelle */}
      <div className="fc4-search-row">
        <span className="fc4-search-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          className="fc4-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={copy.searchPlaceholder}
          autoComplete="off"
          spellCheck={false}
        />
        {searchQuery ? (
          <button
            type="button"
            className="fc4-search-clear"
            onClick={() => setSearchQuery('')}
            aria-label="clear"
          >
            ✕
          </button>
        ) : null}
      </div>
      {searchQuery ? (
        <div className="fc4-search-count">
          {poolSize} {copy.searchResults}
        </div>
      ) : null}

      <div className="fc4-goal-size">
        <span className="fc4-goal-size-label">{sessionSize} {copy.goalCards}</span>
        <div className="fc4-goal-size-pills">
          {SIZES.map((n) => (
            <button
              key={n}
              type="button"
              className={`fc4-size-pill ${sessionSize === n ? 'is-active' : ''}`}
              onClick={() => setSessionSize(n)}
              disabled={n > poolSize && poolSize > 0}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      {poolSize === 0 ? <div className="fc4-goal-empty">{copy.goalEmpty}</div> : null}
    </>
  );
}

// ----------------------------------------------------------------------------
//  DeckList (V9.1) — decks groupés par leçon façon Seonsaengnim
// ----------------------------------------------------------------------------

interface DeckSummary {
  id: string;
  label: string;
  total: number;
  dueN: number;
  masteredN: number;
  newN: number;
  items: StudyCard[];
}

function DeckList({
  decks,
  copy,
  onStudy
}: {
  decks: DeckSummary[];
  copy: CopyType;
  onStudy: (items: StudyCard[]) => void;
}) {
  if (decks.length === 0) {
    return <div className="fc4-decks-empty">{copy.decksEmpty}</div>;
  }
  return (
    <div className="fc4-decks-list">
      {decks.map((d) => {
        const masteryPct = d.total > 0 ? Math.round((d.masteredN / d.total) * 100) : 0;
        return (
          <div key={d.id} className="fc4-deck-row">
            <div className="fc4-deck-main">
              <div className="fc4-deck-label">{d.label}</div>
              <div className="fc4-deck-subline">
                <span>{d.total} {copy.deckWords}</span>
                {d.dueN > 0 ? <span className="fc4-deck-tag fc4-deck-tag--due">{d.dueN} {copy.deckDue}</span> : null}
                {d.newN > 0 ? <span className="fc4-deck-tag fc4-deck-tag--new">{d.newN} {copy.deckNew}</span> : null}
                {d.masteredN > 0 ? <span className="fc4-deck-tag fc4-deck-tag--mastered">{d.masteredN} {copy.deckMastered}</span> : null}
              </div>
              <div className="fc4-deck-progress">
                <div className="fc4-deck-progress-fill" style={{ width: `${masteryPct}%` }} />
              </div>
            </div>
            <button
              type="button"
              className="fc4-deck-cta"
              onClick={() => onStudy(d.items)}
              disabled={d.items.length === 0}
            >
              {copy.deckStudy} →
            </button>
          </div>
        );
      })}
    </div>
  );
}

function Heatmap({
  activity,
  copy
}: {
  activity: ReturnType<typeof useDailyActivity>;
  copy: CopyType;
}) {
  const WEEKS = 12;
  const grid = useMemo(() => activity.getLastNWeeks(WEEKS), [activity]);
  const dayLabels = [
    copy.daysMon,
    copy.daysTue,
    copy.daysWed,
    copy.daysThu,
    copy.daysFri,
    copy.daysSat,
    copy.daysSun
  ];

  return (
    <div className="fc4-heatmap">
      <div className="fc4-heatmap-grid">
        <div className="fc4-heatmap-daylabels">
          {dayLabels.map((d, i) => (
            <div key={i} className="fc4-heatmap-daylabel">
              {i % 2 === 0 ? d : ''}
            </div>
          ))}
        </div>
        <div className="fc4-heatmap-cells">
          {grid.map((row, rIdx) => (
            <div key={rIdx} className="fc4-heatmap-row">
              {row.map((cell) => (
                <div
                  key={cell.date}
                  className={`fc4-heatmap-cell fc4-heatmap-cell--${cell.intensity} ${
                    cell.isToday ? 'is-today' : ''
                  } ${cell.isFuture ? 'is-future' : ''}`}
                  title={`${cell.date} — ${cell.cardsReviewed} cartes`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="fc4-heatmap-legend">
        <span>{copy.heatmapLegendLess}</span>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={`fc4-heatmap-cell fc4-heatmap-cell--${i}`} />
        ))}
        <span>{copy.heatmapLegendMore}</span>
      </div>
    </div>
  );
}

function BadgeGrid({
  badges,
  language
}: {
  badges: ReturnType<typeof useFlashcardBadges>;
  language: 'fr' | 'en';
}) {
  return (
    <div className="fc4-badges-grid">
      {badges.map((b) => (
        <div
          key={b.id}
          className={`fc4-badge ${b.earned ? 'fc4-badge--earned' : 'fc4-badge--locked'}`}
          title={language === 'fr' ? b.descriptionFr : b.descriptionEn}
        >
          <div className="fc4-badge-icon">{b.icon}</div>
          <div className="fc4-badge-meta">
            <div className="fc4-badge-label">{language === 'fr' ? b.labelFr : b.labelEn}</div>
            <div className="fc4-badge-desc">{language === 'fr' ? b.descriptionFr : b.descriptionEn}</div>
            {!b.earned ? (
              <div className="fc4-badge-progress">
                <div
                  className="fc4-badge-progress-fill"
                  style={{ width: `${Math.round(b.progress * 100)}%` }}
                />
                <span className="fc4-badge-progress-label">
                  {b.current} / {b.target}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
//  SUMMARY SCREEN
// ============================================================================

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
    // Animation simple : compte de 0 à xpEarned en ~800ms.
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
    <div className="fc4-summary">
      <div className="fc4-summary-card">
        <div className="fc4-summary-emoji">🎉</div>
        <h2 className="fc4-summary-title">{copy.summaryTitle}</h2>

        <div className="fc4-summary-xp">
          +{xpAnim} <span className="fc4-summary-xp-label">XP</span>
        </div>

        <div className="fc4-summary-metrics">
          <div className="fc4-summary-metric">
            <div className="fc4-summary-metric-value">{summary.totalCards}</div>
            <div className="fc4-summary-metric-label">{copy.summaryCards}</div>
          </div>
          <div className="fc4-summary-metric">
            <div className="fc4-summary-metric-value">{accuracy}%</div>
            <div className="fc4-summary-metric-label">{copy.summaryAccuracy}</div>
          </div>
          <div className="fc4-summary-metric">
            <div className="fc4-summary-metric-value">{durationStr}</div>
            <div className="fc4-summary-metric-label">{copy.summaryDuration}</div>
          </div>
        </div>

        <div className="fc4-summary-breakdown">
          <div className="fc4-summary-bd fc4-summary-bd--again">
            <span className="fc4-summary-bd-label">{copy.summaryAgain}</span>
            <span className="fc4-summary-bd-value">{summary.againCount}</span>
          </div>
          <div className="fc4-summary-bd fc4-summary-bd--hard">
            <span className="fc4-summary-bd-label">{copy.summaryHard}</span>
            <span className="fc4-summary-bd-value">{summary.hardCount}</span>
          </div>
          <div className="fc4-summary-bd fc4-summary-bd--good">
            <span className="fc4-summary-bd-label">{copy.summaryGood}</span>
            <span className="fc4-summary-bd-value">{summary.goodCount}</span>
          </div>
          <div className="fc4-summary-bd fc4-summary-bd--easy">
            <span className="fc4-summary-bd-label">{copy.summaryEasy}</span>
            <span className="fc4-summary-bd-value">{summary.easyCount}</span>
          </div>
        </div>

        <button type="button" className="fc4-summary-back" onClick={onBack}>
          {copy.summaryBack}
        </button>
      </div>
    </div>
  );
}

// Re-export helpers utilisés côté parent (compat V3).
export type { FlashcardV2Item, FlashcardsV2HskLevel };
