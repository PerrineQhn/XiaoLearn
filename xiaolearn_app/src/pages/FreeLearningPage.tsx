/**
 * FreeLearningPage.tsx — Apprentissage libre (ex-modes de Flashcards V5)
 * ----------------------------------------------------------------------
 * Les modes de pratique active vivent ici, séparés du flip natif de
 * Flashcards. Page d'entrée = 6 tuiles :
 *
 *   - QCM / Saisie / Écoute (word)  → SessionView (V4), alimenté par le
 *     pool SRS (dueIds / masteredIds / difficultIds) passé par App.tsx.
 *   - Écouter un dialogue           → Catalogue de dialogues (dialogues.ts)
 *     + lecteur ligne par ligne avec TTS (Web Speech API zh-CN) puisque
 *     aucune piste audio n'est encore disponible.
 *   - Lire un texte                 → Catalogue de readings (readings.ts)
 *     + lecteur avec tokens cliquables (pattern emprunté à CPlayer), popover
 *     pinyin + traduction via lookup lesson dict + CFDICT compact.
 *   - Speed round                   → bientôt (placeholder).
 *
 * Branchement SRS : `onRate(cardId, quality)` est propagé au parent
 * (App.tsx passe `wordSrs.rate`). Les modes dialogue/reading ne touchent
 * pas au SRS — ils sont exploratoires, pas évalués.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SessionView } from '../components/FlashcardV4/SessionView';
import type { StudyCard } from '../components/FlashcardV4/StudyModeComponents';
import {
  type FlashcardSessionSummary,
  type StudyMode
} from '../types/flashcard-v4';
import type { FlashcardDirection } from '../types/flashcard-v3';
import type { FlashcardV2Item } from '../pages/FlashcardPageV2';
import { pinyin } from 'pinyin-pro';
import { dialogues, type DialogueEntry } from '../data/dialogues';
import { readings, type ReadingEntry } from '../data/readings';
import cfdictData from '../data/cfdict-compact.json';
import { getAllLessons } from '../data/lessons';
import {
  type DialogueAudioManifest,
  type ReadingAudioManifest,
  loadDialogueManifest,
  loadReadingManifest,
  resolveReadingSegmentUrl,
  cancelTTS
} from '../utils/dialogue-audio';
import { playHanziAudio } from '../utils/audio';

// Styles fc4-* (session, flip, mcq, typing, listening) et fc5-* (session shell)
// requis pour que l'Apprentissage libre partage visuellement les cartes
// Flashcards sans dépendre du chargement préalable de FlashcardPageV5.
import '../styles/flashcards-v4.css';
import '../styles/flashcards-v5.css';

// ===== Copy (FR/EN) =====
type Lang = 'fr' | 'en';

type CopyShape = {
  title: string;
  subtitle: string;
  availableTotal: (n: number) => string;
  startCta: string;
  cancel: string;
  comingSoon: string;
  empty: string;
  setupTitle: string;
  source: string;
  sourceAll: string;
  sourceDue: string;
  sourceNew: string;
  sourceDifficult: string;
  count: string;
  direction: string;
  dirHanzi: string;
  dirFr: string;
  dirListen: string;
  back: string;
  finishTitle: string;
  finishSub: (n: number) => string;
  xpLine: (xp: number) => string;
  speedSoonTitle: string;
  speedSoonSub: string;
  dialogueCatalogTitle: string;
  dialogueCatalogSub: string;
  dialogueLinesLabel: (n: number) => string;
  readingCatalogTitle: string;
  readingCatalogSub: string;
  readingSegmentsLabel: (n: number) => string;
  play: string;
  pause: string;
  replay: string;
  prev: string;
  next: string;
  autoPlay: string;
  autoPlayOn: string;
  autoPlayOff: string;
  showPinyin: string;
  showTranslation: string;
  showSpeakers: string;
  noAudioNote: string;
  dubbedAudioNote: string;
  noWordInfo: string;
  tapAnyWord: string;
  contextLabel: string;
  introLabel: string;
  vocabLabel: string;
  grammarNoteLabel: string;
  modes: {
    mcq: { title: string; sub: string; icon: string };
    typing: { title: string; sub: string; icon: string };
    listening: { title: string; sub: string; icon: string };
    dialogue: { title: string; sub: string; icon: string };
    reading: { title: string; sub: string; icon: string };
    speed: { title: string; sub: string; icon: string };
  };
};

const COPY: Record<Lang, CopyShape> = {
  fr: {
    title: 'Apprentissage libre',
    subtitle: 'Renforce ton chinois avec plusieurs modes actifs.',
    availableTotal: (n: number) => `${n} mot${n > 1 ? 's' : ''} disponible${n > 1 ? 's' : ''}`,
    startCta: 'Commencer',
    cancel: 'Annuler',
    comingSoon: 'Bientôt',
    empty: 'Valide au moins une leçon pour débloquer l\'apprentissage libre.',
    setupTitle: 'Configurer la session',
    source: 'Source',
    sourceAll: 'Tous',
    sourceDue: 'À revoir',
    sourceNew: 'Nouveaux',
    sourceDifficult: 'Difficiles',
    count: 'Nombre de cartes',
    direction: 'Direction',
    dirHanzi: 'Hanzi → Traduction',
    dirFr: 'Traduction → Hanzi',
    dirListen: 'Écoute',
    back: 'Retour',
    finishTitle: 'Session terminée !',
    finishSub: (n: number) => `Tu as revu ${n} carte${n > 1 ? 's' : ''}.`,
    xpLine: (xp: number) => `+${xp} XP`,
    speedSoonTitle: 'Speed round — bientôt disponible',
    speedSoonSub: 'Un chrono 60s pour réviser le plus de cartes possible. Reviens vite !',
    dialogueCatalogTitle: 'Écouter un dialogue',
    dialogueCatalogSub: 'Choisis un dialogue — chaque réplique est jouée en audio synthétisé (voix zh-CN du navigateur).',
    dialogueLinesLabel: (n: number) => `${n} réplique${n > 1 ? 's' : ''}`,
    readingCatalogTitle: 'Lire un texte',
    readingCatalogSub: 'Choisis un texte — clique sur n\'importe quel mot pour voir sa traduction et son pinyin.',
    readingSegmentsLabel: (n: number) => `${n} phrase${n > 1 ? 's' : ''}`,
    play: '▶︎ Écouter',
    pause: '⏸ Pause',
    replay: '↺ Relire',
    prev: '← Précédent',
    next: 'Suivant →',
    autoPlay: 'Auto',
    autoPlayOn: 'Auto ▸ On',
    autoPlayOff: 'Auto ▸ Off',
    showPinyin: 'Pinyin',
    showTranslation: 'Traduction',
    showSpeakers: 'Personnages',
    noAudioNote: 'Audio TTS navigateur · une voix ou un pitch distinct par personnage. Doublage MP3 non disponible pour ce dialogue.',
    dubbedAudioNote: 'Doublage multi-voix · pistes MP3 générées avec Azure Neural TTS (une voix par personnage).',
    noWordInfo: 'Définition non trouvée.',
    tapAnyWord: 'Clique sur un mot pour voir sa traduction.',
    contextLabel: 'Contexte',
    introLabel: 'Introduction',
    vocabLabel: 'Vocabulaire clé',
    grammarNoteLabel: 'Note de grammaire',
    modes: {
      mcq: { title: 'QCM', sub: 'Choisis la bonne traduction parmi 4', icon: '🎯' },
      typing: { title: 'Saisie', sub: 'Tape le pinyin ou la traduction', icon: '⌨️' },
      listening: { title: 'Écoute (mot)', sub: 'Retrouve le mot à l\'audio', icon: '👂' },
      dialogue: { title: 'Écouter un dialogue', sub: 'Écoute une scène complète avec TTS', icon: '💬' },
      reading: { title: 'Lire un texte', sub: 'Clique sur un mot pour sa traduction', icon: '📖' },
      speed: { title: 'Speed round', sub: 'Chrono 60s — vite, vite !', icon: '⚡' }
    }
  },
  en: {
    title: 'Free learning',
    subtitle: 'Strengthen your Chinese with several active modes.',
    availableTotal: (n: number) => `${n} word${n > 1 ? 's' : ''} available`,
    startCta: 'Start',
    cancel: 'Cancel',
    comingSoon: 'Soon',
    empty: 'Complete at least one lesson to unlock free learning.',
    setupTitle: 'Set up session',
    source: 'Source',
    sourceAll: 'All',
    sourceDue: 'Due',
    sourceNew: 'New',
    sourceDifficult: 'Difficult',
    count: 'Card count',
    direction: 'Direction',
    dirHanzi: 'Hanzi → Translation',
    dirFr: 'Translation → Hanzi',
    dirListen: 'Listening',
    back: 'Back',
    finishTitle: 'Session done!',
    finishSub: (n: number) => `You reviewed ${n} card${n > 1 ? 's' : ''}.`,
    xpLine: (xp: number) => `+${xp} XP`,
    speedSoonTitle: 'Speed round — coming soon',
    speedSoonSub: 'A 60s timer to burn through as many cards as you can. Back soon!',
    dialogueCatalogTitle: 'Listen to a dialogue',
    dialogueCatalogSub: 'Pick a dialogue — each line is played with browser TTS (zh-CN voice).',
    dialogueLinesLabel: (n: number) => `${n} line${n > 1 ? 's' : ''}`,
    readingCatalogTitle: 'Read a text',
    readingCatalogSub: 'Pick a text — tap any word to see its translation and pinyin.',
    readingSegmentsLabel: (n: number) => `${n} sentence${n > 1 ? 's' : ''}`,
    play: '▶︎ Play',
    pause: '⏸ Pause',
    replay: '↺ Replay',
    prev: '← Prev',
    next: 'Next →',
    autoPlay: 'Auto',
    autoPlayOn: 'Auto ▸ On',
    autoPlayOff: 'Auto ▸ Off',
    showPinyin: 'Pinyin',
    showTranslation: 'Translation',
    showSpeakers: 'Speakers',
    noAudioNote: 'Browser TTS · distinct voice or pitch per speaker. No pre-dubbed MP3 for this dialogue yet.',
    dubbedAudioNote: 'Multi-voice dub · MP3 tracks generated with Azure Neural TTS (one voice per speaker).',
    noWordInfo: 'Definition not found.',
    tapAnyWord: 'Tap a word to see its translation.',
    contextLabel: 'Context',
    introLabel: 'Intro',
    vocabLabel: 'Key vocabulary',
    grammarNoteLabel: 'Grammar note',
    modes: {
      mcq: { title: 'MCQ', sub: 'Pick the right translation from 4', icon: '🎯' },
      typing: { title: 'Typing', sub: 'Type the pinyin or translation', icon: '⌨️' },
      listening: { title: 'Listening (word)', sub: 'Identify the word from audio', icon: '👂' },
      dialogue: { title: 'Listen to a dialogue', sub: 'Full scene with TTS playback', icon: '💬' },
      reading: { title: 'Read a text', sub: 'Tap a word for its translation', icon: '📖' },
      speed: { title: 'Speed round', sub: '60s timer — go fast!', icon: '⚡' }
    }
  }
};

type FreeMode = Exclude<StudyMode, 'flip'>;
type Source = 'all' | 'due' | 'new' | 'difficult';
type PageView =
  | 'home'
  | 'setup'
  | 'session'
  | 'summary'
  | 'speed-soon'
  | 'dialogue-list'
  | 'dialogue-play'
  | 'reading-list'
  | 'reading-play';

// ===== Props =====
export interface FreeLearningPageProps {
  language?: Lang;
  wordItems: FlashcardV2Item[];
  dueIds?: Set<string> | string[];
  masteredIds?: Set<string> | string[];
  difficultIds?: Set<string> | string[];
  onRate: (cardId: string, quality: 1 | 2 | 3 | 4) => void;
}

const toSet = (v?: Set<string> | string[]): Set<string> =>
  v instanceof Set ? v : new Set(v ?? []);

// ===== Helpers =====
function itemToStudyCard(it: FlashcardV2Item): StudyCard {
  return {
    id: it.id,
    hanzi: it.hanzi,
    pinyin: it.pinyin,
    translationFr: it.translation,
    translationEn: it.translationEn ?? it.translation,
    category: it.theme,
    // Propage l'URL audio Azure TTS pour le mode listening / boutons 🔊.
    audio: it.audio
  };
}

const hasChinese = (text: string) => /[\u3400-\u9fff]/.test(text);

const segmentChinese = (text: string): string[] => {
  const IntlAny = Intl as unknown as {
    Segmenter?: new (
      locale: string,
      opts: { granularity: string }
    ) => { segment(t: string): Iterable<{ segment: string }> };
  };
  if (typeof IntlAny.Segmenter === 'function') {
    const segmenter = new IntlAny.Segmenter('zh', { granularity: 'word' });
    return [...segmenter.segment(text)].map((s) => s.segment);
  }
  return Array.from(text);
};

// Helpers Web Speech + manifest audio : centralisés dans utils/dialogue-audio.ts
// (partagé avec DialoguePageV2). On ré-exporte rien ici : voir l'import en tête.

// CECR level rank for sorting catalogs — leçons A1 en haut, C2 en bas.
const CECR_ORDER: Record<string, number> = {
  a1: 1, a2: 2,
  'b1.1': 3, 'b1.2': 4,
  'b2.1': 5, 'b2.2': 6,
  'c1.1': 7, 'c1.2': 8,
  'c2.1': 9, 'c2.2': 10
};

// ===== Component =====
export function FreeLearningPage({
  language = 'fr',
  wordItems,
  dueIds,
  masteredIds,
  difficultIds,
  onRate
}: FreeLearningPageProps) {
  const copy = COPY[language];

  const dueSet = useMemo(() => toSet(dueIds), [dueIds]);
  const masteredSet = useMemo(() => toSet(masteredIds), [masteredIds]);
  const difficultSet = useMemo(() => toSet(difficultIds), [difficultIds]);

  const [view, setView] = useState<PageView>('home');
  const [mode, setMode] = useState<FreeMode>('mcq');
  const [source, setSource] = useState<Source>('all');
  const [count, setCount] = useState<number>(20);
  const [direction, setDirection] = useState<FlashcardDirection>('hanzi-to-fr');
  const [lastSummary, setLastSummary] = useState<FlashcardSessionSummary | null>(null);
  const [selectedDialogue, setSelectedDialogue] = useState<DialogueEntry | null>(null);
  const [selectedReading, setSelectedReading] = useState<ReadingEntry | null>(null);

  const openSetup = useCallback((m: FreeMode) => {
    if (m === 'speed') {
      setView('speed-soon');
      return;
    }
    setMode(m);
    setDirection('hanzi-to-fr');
    setView('setup');
  }, []);

  const filteredPool = useMemo<FlashcardV2Item[]>(() => {
    switch (source) {
      case 'due':
        return wordItems.filter((w) => dueSet.has(w.id));
      case 'new':
        return wordItems.filter(
          (w) => !masteredSet.has(w.id) && !dueSet.has(w.id) && !difficultSet.has(w.id)
        );
      case 'difficult':
        return wordItems.filter((w) => difficultSet.has(w.id));
      default:
        return wordItems;
    }
  }, [source, wordItems, dueSet, masteredSet, difficultSet]);

  const sessionCards = useMemo<StudyCard[]>(
    () => filteredPool.slice(0, count).map(itemToStudyCard),
    [filteredPool, count]
  );

  const distractorPool = useMemo<StudyCard[]>(
    () => wordItems.slice(0, 60).map(itemToStudyCard),
    [wordItems]
  );

  const handleStart = useCallback(() => {
    if (sessionCards.length === 0) return;
    setView('session');
  }, [sessionCards.length]);

  const handleFinish = useCallback((summary: FlashcardSessionSummary) => {
    setLastSummary(summary);
    setView('summary');
  }, []);

  const handleBackHome = useCallback(() => {
    cancelTTS();
    setLastSummary(null);
    setSelectedDialogue(null);
    setSelectedReading(null);
    setView('home');
  }, []);

  // ====== Empty state ======
  if (wordItems.length === 0) {
    return (
      <div className="fc5-root">
        <div className="fc5-page">
          <header className="fc5-page-head">
            <h1 className="fc5-page-title">{copy.title}</h1>
            <p className="fc5-page-sub">{copy.subtitle}</p>
          </header>
          <div className="fc5-empty-card">{copy.empty}</div>
        </div>
      </div>
    );
  }

  // ====== Session view (delegate) ======
  if (view === 'session') {
    return (
      <div className="fc5-root fc5-session-shell">
        <SessionView
          mode={mode}
          direction={direction}
          cards={sessionCards}
          language={language}
          distractorPool={distractorPool}
          onRate={onRate}
          onFinish={handleFinish}
          onAbort={handleBackHome}
        />
      </div>
    );
  }

  // ====== Summary view ======
  if (view === 'summary' && lastSummary) {
    return (
      <div className="fc5-root fc5-session-shell">
        <div className="fc5-summary">
          <h1 className="fc5-summary-title">{copy.finishTitle}</h1>
          <p className="fc5-summary-sub">{copy.finishSub(lastSummary.totalCards)}</p>
          <p className="fc5-summary-xp">{copy.xpLine(lastSummary.xpEarned)}</p>
          <button type="button" className="fc5-summary-back" onClick={handleBackHome}>
            {copy.back}
          </button>
        </div>
      </div>
    );
  }

  // ====== Speed "coming soon" ======
  if (view === 'speed-soon') {
    return (
      <div className="fc5-root">
        <div className="fc5-page">
          <header className="fc5-page-head">
            <h1 className="fc5-page-title">{copy.speedSoonTitle}</h1>
            <p className="fc5-page-sub">{copy.speedSoonSub}</p>
          </header>
          <button type="button" className="fc5-summary-back" onClick={handleBackHome}>
            {copy.back}
          </button>
        </div>
      </div>
    );
  }

  // ====== Dialogue catalog ======
  if (view === 'dialogue-list') {
    return (
      <div className="fc5-root">
        <div className="fc5-page">
          <header className="fc5-page-head">
            <h1 className="fc5-page-title">{copy.dialogueCatalogTitle}</h1>
            <p className="fc5-page-sub">{copy.dialogueCatalogSub}</p>
          </header>
          <DialogueCatalog
            language={language}
            copy={copy}
            onPick={(entry) => {
              setSelectedDialogue(entry);
              setView('dialogue-play');
            }}
          />
          <div className="fl-backrow">
            <button type="button" className="fc5-summary-back" onClick={handleBackHome}>
              {copy.back}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ====== Dialogue player ======
  if (view === 'dialogue-play' && selectedDialogue) {
    return (
      <div className="fc5-root fc5-session-shell">
        <DialoguePlayer
          language={language}
          copy={copy}
          entry={selectedDialogue}
          onBack={() => {
            cancelTTS();
            setSelectedDialogue(null);
            setView('dialogue-list');
          }}
        />
      </div>
    );
  }

  // ====== Reading catalog ======
  if (view === 'reading-list') {
    return (
      <div className="fc5-root">
        <div className="fc5-page">
          <header className="fc5-page-head">
            <h1 className="fc5-page-title">{copy.readingCatalogTitle}</h1>
            <p className="fc5-page-sub">{copy.readingCatalogSub}</p>
          </header>
          <ReadingCatalog
            language={language}
            copy={copy}
            onPick={(entry) => {
              setSelectedReading(entry);
              setView('reading-play');
            }}
          />
          <div className="fl-backrow">
            <button type="button" className="fc5-summary-back" onClick={handleBackHome}>
              {copy.back}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ====== Reading player ======
  if (view === 'reading-play' && selectedReading) {
    return (
      <div className="fc5-root fc5-session-shell">
        <ReadingPlayer
          language={language}
          copy={copy}
          entry={selectedReading}
          onBack={() => {
            setSelectedReading(null);
            setView('reading-list');
          }}
        />
      </div>
    );
  }

  // ====== Home (tiles) ======
  return (
    <div className="fc5-root">
      <div className="fc5-page">
        <header className="fc5-page-head">
          <h1 className="fc5-page-title">{copy.title}</h1>
          <p className="fc5-page-sub">
            {copy.subtitle} · {copy.availableTotal(wordItems.length)}
          </p>
        </header>

        <section className="fl-mode-grid">
          <ModeTile
            icon={copy.modes.mcq.icon}
            title={copy.modes.mcq.title}
            sub={copy.modes.mcq.sub}
            onClick={() => openSetup('mcq')}
          />
          <ModeTile
            icon={copy.modes.typing.icon}
            title={copy.modes.typing.title}
            sub={copy.modes.typing.sub}
            onClick={() => openSetup('typing')}
          />
          <ModeTile
            icon={copy.modes.listening.icon}
            title={copy.modes.listening.title}
            sub={copy.modes.listening.sub}
            onClick={() => openSetup('listening')}
          />
          <ModeTile
            icon={copy.modes.dialogue.icon}
            title={copy.modes.dialogue.title}
            sub={copy.modes.dialogue.sub}
            onClick={() => setView('dialogue-list')}
          />
          <ModeTile
            icon={copy.modes.reading.icon}
            title={copy.modes.reading.title}
            sub={copy.modes.reading.sub}
            onClick={() => setView('reading-list')}
          />
          <ModeTile
            icon={copy.modes.speed.icon}
            title={copy.modes.speed.title}
            sub={copy.modes.speed.sub}
            badge={copy.comingSoon}
            onClick={() => openSetup('speed')}
          />
        </section>

        {view === 'setup' ? (
          <SetupModal
            copy={copy}
            mode={mode}
            source={source}
            setSource={setSource}
            count={count}
            setCount={setCount}
            direction={direction}
            setDirection={setDirection}
            available={filteredPool.length}
            onCancel={handleBackHome}
            onStart={handleStart}
          />
        ) : null}
      </div>
    </div>
  );
}

// ===== Subcomponents =====

function ModeTile({
  icon,
  title,
  sub,
  badge,
  onClick
}: {
  icon: string;
  title: string;
  sub: string;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className="fl-mode-tile" onClick={onClick}>
      <div className="fl-mode-tile-icon" aria-hidden>
        {icon}
      </div>
      <div className="fl-mode-tile-body">
        <div className="fl-mode-tile-title">{title}</div>
        <div className="fl-mode-tile-sub">{sub}</div>
      </div>
      {badge ? <span className="fl-mode-tile-badge">{badge}</span> : null}
    </button>
  );
}

function SetupModal({
  copy,
  mode,
  source,
  setSource,
  count,
  setCount,
  direction,
  setDirection,
  available,
  onCancel,
  onStart
}: {
  copy: CopyShape;
  mode: FreeMode;
  source: Source;
  setSource: (s: Source) => void;
  count: number;
  setCount: (n: number) => void;
  direction: FlashcardDirection;
  setDirection: (d: FlashcardDirection) => void;
  available: number;
  onCancel: () => void;
  onStart: () => void;
}) {
  const canStart = available > 0;
  const effectiveCount = Math.min(count, available);
  return (
    <div className="fl-modal-overlay" role="dialog" aria-modal>
      <div className="fl-modal">
        <h2 className="fl-modal-title">{copy.setupTitle}</h2>

        <div className="fl-modal-row">
          <div className="fl-modal-label">{copy.source}</div>
          <div className="fl-modal-pills">
            {(
              [
                ['all', copy.sourceAll],
                ['due', copy.sourceDue],
                ['new', copy.sourceNew],
                ['difficult', copy.sourceDifficult]
              ] as [Source, string][]
            ).map(([s, label]) => (
              <button
                key={s}
                type="button"
                className={`fl-pill${source === s ? ' is-active' : ''}`}
                onClick={() => setSource(s)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="fl-modal-row">
          <div className="fl-modal-label">{copy.count}</div>
          <div className="fl-modal-pills">
            {[10, 20, 30, 50].map((n) => (
              <button
                key={n}
                type="button"
                className={`fl-pill${count === n ? ' is-active' : ''}`}
                onClick={() => setCount(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {mode !== 'listening' ? (
          <div className="fl-modal-row">
            <div className="fl-modal-label">{copy.direction}</div>
            <div className="fl-modal-pills">
              <button
                type="button"
                className={`fl-pill${direction === 'hanzi-to-fr' ? ' is-active' : ''}`}
                onClick={() => setDirection('hanzi-to-fr')}
              >
                {copy.dirHanzi}
              </button>
              <button
                type="button"
                className={`fl-pill${direction === 'fr-to-hanzi' ? ' is-active' : ''}`}
                onClick={() => setDirection('fr-to-hanzi')}
              >
                {copy.dirFr}
              </button>
            </div>
          </div>
        ) : null}

        <div className="fl-modal-meta">{`${effectiveCount} / ${available}`}</div>

        <div className="fl-modal-actions">
          <button type="button" className="fl-btn fl-btn-ghost" onClick={onCancel}>
            {copy.cancel}
          </button>
          <button
            type="button"
            className="fl-btn fl-btn-primary"
            disabled={!canStart}
            onClick={onStart}
          >
            {copy.startCta}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Dialogue catalog + player
// ============================================================================

function DialogueCatalog({
  language,
  copy,
  onPick
}: {
  language: Lang;
  copy: CopyShape;
  onPick: (entry: DialogueEntry) => void;
}) {
  const sorted = useMemo(
    () =>
      [...dialogues].sort(
        (a, b) =>
          (CECR_ORDER[a.cecrLevel] ?? 99) - (CECR_ORDER[b.cecrLevel] ?? 99)
      ),
    []
  );

  return (
    <div className="fl-catalog">
      {sorted.map((entry) => {
        const theme = language === 'fr' ? entry.theme : entry.themeEn;
        const title = language === 'fr' ? entry.dialogue.title : entry.dialogue.titleEn;
        return (
          <button
            key={entry.dialogue.id}
            type="button"
            className="fl-catalog-card"
            onClick={() => onPick(entry)}
          >
            <div className="fl-catalog-row1">
              <span className="fl-catalog-level">{entry.cecrLevel.toUpperCase()}</span>
              <span className="fl-catalog-theme">{theme}</span>
            </div>
            <div className="fl-catalog-title">{title}</div>
            <div className="fl-catalog-meta">
              {copy.dialogueLinesLabel(entry.dialogue.lines.length)}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function DialoguePlayer({
  language,
  copy,
  entry,
  onBack
}: {
  language: Lang;
  copy: CopyShape;
  entry: DialogueEntry;
  onBack: () => void;
}) {
  const { dialogue } = entry;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  // used to force re-trigger speak on same index (replay button)
  const [playToken, setPlayToken] = useState(0);
  // Manifest chargé de /public/audio/dialogues/manifest.json. null = pas
  // encore tenté ; {} = tenté mais vide/absent.
  const [manifest, setManifest] = useState<DialogueAudioManifest | null>(null);
  // Instance audio courante — recréée à chaque play. Réutiliser le même
  // élément + `src = ''` sur cancel déclenche un event 'error' asynchrone
  // sur Chrome qui fuit sur le onerror du prochain play et bascule à tort
  // vers Web Speech (MP3 pourtant présent).
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const cancelAudio = useCallback(() => {
    const el = currentAudioRef.current;
    if (!el) return;
    try {
      el.onended = null;
      el.onerror = null;
      el.pause();
    } catch {
      /* noop */
    }
    currentAudioRef.current = null;
  }, []);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      cancelTTS();
      cancelAudio();
    };
  }, [cancelAudio]);

  // Chargement du manifest une fois par montage.
  useEffect(() => {
    let cancelled = false;
    loadDialogueManifest().then((m) => {
      if (!cancelled) setManifest(m);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Plus besoin de charger les voix speechSynthesis — tous les audios passent
  // désormais par des MP3/WAV pré-générés (Azure TTS).

  // Liste ordonnée des personnages uniques du dialogue (ordre d'apparition).
  // Utilisée pour teinter la bordure latérale par locuteur.
  const uniqueSpeakers = useMemo(() => {
    const seen: string[] = [];
    for (const line of dialogue.lines) {
      if (!seen.includes(line.speaker)) seen.push(line.speaker);
    }
    return seen;
  }, [dialogue.lines]);

  // Résout l'URL audio d'une ligne :
  //   1) valeur explicite `line.audioUrl` (rare, pour overrides manuels),
  //   2) entrée du manifest Azure (`manifest[dialogue.id].lines[idx]`),
  //   3) sinon null → la ligne est sautée silencieusement (pas de Web Speech).
  const resolveAudioUrl = useCallback(
    (idx: number): string | null => {
      const line = dialogue.lines[idx];
      if (!line) return null;
      if (line.audioUrl) return line.audioUrl;
      const entryManifest = manifest?.[dialogue.id];
      const lines = entryManifest?.lines;
      if (lines && lines[idx]) return lines[idx];
      return null;
    },
    [dialogue.id, dialogue.lines, manifest]
  );

  const handlePlayLine = useCallback(
    (idx: number) => {
      const line = dialogue.lines[idx];
      if (!line) return;

      const onFinish = () => {
        setIsPlaying(false);
        if (autoPlay) {
          const nextIdx = idx + 1;
          if (nextIdx < dialogue.lines.length) {
            setCurrentIdx(nextIdx);
            setPlayToken((t) => t + 1);
          }
        }
      };

      cancelTTS();
      cancelAudio();

      const audioUrl = resolveAudioUrl(idx);

      if (audioUrl) {
        // MP3 pré-généré (doublage Azure Neural TTS) — nouvelle instance
        // Audio() à chaque play pour isoler Chrome des events 'error'
        // asynchrones qui fuiraient depuis une session précédente.
        setIsPlaying(true);
        const audio = new Audio(audioUrl);
        currentAudioRef.current = audio;
        audio.onended = () => {
          if (currentAudioRef.current !== audio) return;
          onFinish();
        };
        audio.onerror = () => {
          if (currentAudioRef.current !== audio) return;
          // MP3 en erreur (fichier manquant / réseau) → on avance sans jouer
          // de son synthétique. Règle produit : tous les audios doivent être
          // liés à un fichier MP3/WAV, pas de Web Speech.
          console.warn('[dialogue audio] MP3 failed, skipping line');
          onFinish();
        };
        audio.play().catch(() => {
          if (currentAudioRef.current !== audio) return;
          // Autoplay bloqué (ex. Safari avant interaction utilisateur) → pas
          // de fallback TTS synthétique.
          console.warn('[dialogue audio] autoplay blocked');
          onFinish();
        });
        return;
      }

      // Pas de MP3 disponible pour cette ligne → on avance silencieusement.
      // (La dialogue doit être regénérée via scripts/generate-dialogue-audio.mjs.)
      console.warn('[dialogue audio] no MP3 for line', idx, 'of dialogue', dialogue.id);
      setIsPlaying(true);
      onFinish();
    },
    [dialogue.lines, autoPlay, resolveAudioUrl, cancelAudio]
  );

  // (Re)trigger play when index or playToken changes
  useEffect(() => {
    if (!isPlaying && playToken > 0) {
      handlePlayLine(currentIdx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx, playToken]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      cancelTTS();
      cancelAudio();
      setIsPlaying(false);
    } else {
      handlePlayLine(currentIdx);
    }
  };

  const handlePrev = () => {
    cancelTTS();
    cancelAudio();
    setIsPlaying(false);
    setCurrentIdx((i) => Math.max(0, i - 1));
  };

  const handleNext = () => {
    cancelTTS();
    cancelAudio();
    setIsPlaying(false);
    setCurrentIdx((i) => Math.min(dialogue.lines.length - 1, i + 1));
  };

  const handleReplay = () => {
    cancelTTS();
    cancelAudio();
    setIsPlaying(false);
    setPlayToken((t) => t + 1);
  };

  const activeLine = dialogue.lines[currentIdx];
  const title = language === 'fr' ? dialogue.title : dialogue.titleEn;
  const context = language === 'fr' ? dialogue.context : dialogue.contextEn;
  const activeNote =
    language === 'fr' ? activeLine?.note : activeLine?.noteEn || activeLine?.note;
  // True dès qu'on a au moins une piste pré-générée pour ce dialogue (soit
  // via DialogueLine.audioUrl, soit via le manifest Azure).
  const hasDubbedAudio = useMemo(() => {
    if (dialogue.lines.some((l) => !!l.audioUrl)) return true;
    const lines = manifest?.[dialogue.id]?.lines;
    return Array.isArray(lines) && lines.length > 0;
  }, [dialogue.lines, dialogue.id, manifest]);

  return (
    <div className="fl-player">
      <header className="fl-player-head">
        <button type="button" className="fl-player-back" onClick={onBack}>
          ← {copy.back}
        </button>
        <div className="fl-player-title-wrap">
          <span className="fl-player-level">{entry.cecrLevel.toUpperCase()}</span>
          <h1 className="fl-player-title">{title}</h1>
        </div>
      </header>

      {context ? (
        <div className="fl-player-context">
          <span className="fl-player-context-label">{copy.contextLabel}</span>
          <p>{context}</p>
        </div>
      ) : null}

      <div className="fl-dlg-lines">
        {dialogue.lines.map((line, idx) => {
          const isActive = idx === currentIdx;
          const translation =
            language === 'fr' ? line.translationFr : line.translationEn || line.translationFr;
          const lineNote = language === 'fr' ? line.note : line.noteEn || line.note;
          // Index du personnage dans uniqueSpeakers → teinte de bordure latérale
          const speakerIdx = uniqueSpeakers.indexOf(line.speaker);
          return (
            <button
              key={`${line.hanzi}-${idx}`}
              type="button"
              className={`fl-dlg-line${isActive ? ' is-active' : ''}`}
              data-speaker-idx={speakerIdx}
              onClick={() => {
                cancelTTS();
                cancelAudio();
                setIsPlaying(false);
                setCurrentIdx(idx);
                setPlayToken((t) => t + 1);
              }}
              title={lineNote ? `${copy.grammarNoteLabel}: ${lineNote}` : undefined}
            >
              <div className="fl-dlg-speaker">{line.speaker}</div>
              <div className="fl-dlg-body">
                <div className="fl-dlg-hanzi">
                  {line.hanzi}
                  {lineNote ? (
                    <span className="fl-dlg-note-badge" aria-label={copy.grammarNoteLabel}>
                      📝
                    </span>
                  ) : null}
                </div>
                {showPinyin ? <div className="fl-dlg-pinyin">{line.pinyin}</div> : null}
                {showTranslation ? <div className="fl-dlg-translation">{translation}</div> : null}
              </div>
            </button>
          );
        })}
      </div>

      {activeNote ? (
        <aside className="fl-player-grammar" role="note">
          <span className="fl-player-grammar-label">{copy.grammarNoteLabel}</span>
          <p className="fl-player-grammar-body">{activeNote}</p>
        </aside>
      ) : null}

      <footer className="fl-player-footer">
        <div className="fl-player-toggles">
          <button
            type="button"
            className={`fl-pill${showPinyin ? ' is-active' : ''}`}
            onClick={() => setShowPinyin((v) => !v)}
          >
            {copy.showPinyin}
          </button>
          <button
            type="button"
            className={`fl-pill${showTranslation ? ' is-active' : ''}`}
            onClick={() => setShowTranslation((v) => !v)}
          >
            {copy.showTranslation}
          </button>
          <button
            type="button"
            className={`fl-pill${autoPlay ? ' is-active' : ''}`}
            onClick={() => setAutoPlay((v) => !v)}
            title={copy.autoPlay}
          >
            {autoPlay ? copy.autoPlayOn : copy.autoPlayOff}
          </button>
        </div>

        <div className="fl-player-controls">
          <button
            type="button"
            className="fl-btn fl-btn-ghost"
            onClick={handlePrev}
            disabled={currentIdx === 0}
          >
            {copy.prev}
          </button>
          <button type="button" className="fl-btn fl-btn-primary" onClick={handleTogglePlay}>
            {isPlaying ? copy.pause : copy.play}
          </button>
          <button type="button" className="fl-btn fl-btn-ghost" onClick={handleReplay}>
            {copy.replay}
          </button>
          <button
            type="button"
            className="fl-btn fl-btn-ghost"
            onClick={handleNext}
            disabled={currentIdx >= dialogue.lines.length - 1}
          >
            {copy.next}
          </button>
        </div>

        <div className="fl-player-meta">
          {currentIdx + 1} / {dialogue.lines.length}
        </div>

        <div className="fl-player-disclaimer">
          {hasDubbedAudio ? copy.dubbedAudioNote : copy.noAudioNote}
        </div>
      </footer>
    </div>
  );
}

// ============================================================================
// Reading catalog + player (click-to-translate)
// ============================================================================

function ReadingCatalog({
  language,
  copy,
  onPick
}: {
  language: Lang;
  copy: CopyShape;
  onPick: (entry: ReadingEntry) => void;
}) {
  const sorted = useMemo(
    () =>
      [...readings].sort(
        (a, b) =>
          (CECR_ORDER[a.cecrLevel] ?? 99) - (CECR_ORDER[b.cecrLevel] ?? 99)
      ),
    []
  );

  return (
    <div className="fl-catalog">
      {sorted.map((entry) => {
        const theme = language === 'fr' ? entry.theme : entry.themeEn;
        const title = language === 'fr' ? entry.reading.title : entry.reading.titleEn;
        return (
          <button
            key={entry.reading.id}
            type="button"
            className="fl-catalog-card"
            onClick={() => onPick(entry)}
          >
            <div className="fl-catalog-row1">
              <span className="fl-catalog-level">{entry.cecrLevel.toUpperCase()}</span>
              <span className="fl-catalog-theme">{theme}</span>
            </div>
            <div className="fl-catalog-title">{title}</div>
            <div className="fl-catalog-meta">
              {copy.readingSegmentsLabel(entry.reading.segments.length)}
            </div>
          </button>
        );
      })}
    </div>
  );
}

interface WordInfo {
  hanzi: string;
  pinyin: string;
  translation: string;
  source: 'lesson' | 'cfdict' | 'none';
}

function ReadingPlayer({
  language,
  copy,
  entry,
  onBack
}: {
  language: Lang;
  copy: CopyShape;
  entry: ReadingEntry;
  onBack: () => void;
}) {
  const { reading } = entry;

  const [selectedToken, setSelectedToken] = useState<{ segIdx: number; tokIdx: number } | null>(
    null
  );
  const [showPinyin, setShowPinyin] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  // MP3 Azure Neural TTS (voix unique par texte) → fallback Web Speech.
  const [readingManifest, setReadingManifest] = useState<ReadingAudioManifest | null>(null);
  const readingAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadReadingManifest().then((m) => {
      if (!cancelled) setReadingManifest(m);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const stopReadingAudio = useCallback(() => {
    const a = readingAudioRef.current;
    if (a) {
      try {
        a.onended = null;
        a.onerror = null;
        a.pause();
      } catch {
        /* noop */
      }
      readingAudioRef.current = null;
    }
    cancelTTS();
  }, []);

  useEffect(() => {
    return () => stopReadingAudio();
  }, [stopReadingAudio]);

  // Joue un segment : MP3 Azure uniquement (pas de Web Speech).
  // Règle produit : tous les audios doivent être liés à un fichier MP3/WAV.
  const playReadingSegment = useCallback(
    (segIdx: number) => {
      stopReadingAudio();
      const seg = reading.segments[segIdx];
      if (!seg) return;
      const url = resolveReadingSegmentUrl(reading, segIdx, readingManifest);
      if (!url) {
        console.warn('[reading audio] no MP3 for segment', segIdx);
        return;
      }
      const audio = new Audio(url);
      readingAudioRef.current = audio;
      audio.onerror = () => {
        if (readingAudioRef.current !== audio) return;
        console.warn('[reading audio] MP3 failed for segment', segIdx);
      };
      audio.play().catch(() => {
        if (readingAudioRef.current !== audio) return;
        console.warn('[reading audio] autoplay blocked for segment', segIdx);
      });
    },
    [reading, readingManifest, stopReadingAudio]
  );

  // Joue l'ensemble du texte, segment par segment (enchaînement auto).
  // Skip les segments sans MP3 au lieu de tomber sur Web Speech.
  const playAllSegments = useCallback(() => {
    stopReadingAudio();
    const segments = reading.segments;
    if (segments.length === 0) return;

    let idx = 0;
    const playNext = () => {
      while (idx < segments.length) {
        const url = resolveReadingSegmentUrl(reading, idx, readingManifest);
        idx += 1;
        if (!url) {
          // Pas de MP3 pour ce segment → skip (pas de Web Speech).
          continue;
        }
        const audio = new Audio(url);
        readingAudioRef.current = audio;
        audio.onended = () => {
          if (readingAudioRef.current !== audio) return;
          playNext();
        };
        audio.onerror = () => {
          if (readingAudioRef.current !== audio) return;
          playNext();
        };
        audio.play().catch(() => {
          if (readingAudioRef.current !== audio) return;
          playNext();
        });
        return;
      }
      readingAudioRef.current = null;
    };
    playNext();
  }, [reading, readingManifest, stopReadingAudio]);

  const cfdict = cfdictData as Record<string, string>;

  // Lookup maps from lessons (hanzi → LessonItem).
  const lessonByHanziMap = useMemo(() => {
    const map = new Map<string, {
      hanzi: string;
      pinyin: string;
      translationFr: string;
      translationEn?: string;
    }>();
    for (const item of getAllLessons()) {
      map.set(item.hanzi, {
        hanzi: item.hanzi,
        pinyin: item.pinyin,
        translationFr: item.translationFr ?? item.translation,
        translationEn: item.translation
      });
    }
    return map;
  }, []);

  /**
   * Calcule le pinyin contextuel d'un token à partir de la phrase complète.
   * Utilise pinyin-pro en mode tableau (char-level) pour bénéficier de la
   * désambiguïsation polyphonique via le contexte. Indexation char-par-char,
   * PAS mot-par-mot (ce qui était la source du bug 我在 → Běijīng Dàxué).
   */
  const pinyinForToken = useCallback(
    (token: string, sentence: string): string => {
      if (!token || !hasChinese(token)) return '';
      try {
        const fullArr = pinyin(sentence, {
          type: 'array',
          toneType: 'symbol'
        }) as string[];
        const tokenStart = sentence.indexOf(token);
        if (tokenStart < 0) {
          return pinyin(token, { toneType: 'symbol', type: 'string' }) as string;
        }
        const charsBefore = Array.from(sentence.slice(0, tokenStart)).length;
        const charCount = Array.from(token).length;
        return fullArr
          .slice(charsBefore, charsBefore + charCount)
          .filter(Boolean)
          .join(' ');
      } catch {
        return '';
      }
    },
    []
  );

  const lookupWord = useCallback(
    (token: string, segmentContext: { hanzi: string; pinyin: string }): WordInfo | null => {
      if (!token || !hasChinese(token)) return null;

      // Pinyin TOUJOURS calculé depuis la phrase (contextuel, char-level).
      const tokenPinyin = pinyinForToken(token, segmentContext.hanzi);

      const lesson = lessonByHanziMap.get(token);
      if (lesson) {
        const translation =
          language === 'fr'
            ? lesson.translationFr || lesson.translationEn || ''
            : lesson.translationEn || lesson.translationFr || '';
        return {
          hanzi: token,
          // On préfère le pinyin contextuel (polyphones) ; fallback sur le
          // pinyin "canonique" du dict si le contexte a échoué.
          pinyin: tokenPinyin || lesson.pinyin,
          translation,
          source: 'lesson'
        };
      }

      const cfdictFr = cfdict[token];
      if (cfdictFr) {
        return {
          hanzi: token,
          pinyin: tokenPinyin || '—',
          translation: cfdictFr,
          source: 'cfdict'
        };
      }

      // Last resort — split into characters and join.
      if (token.length > 1) {
        const pieces: string[] = [];
        for (const ch of Array.from(token)) {
          const frag = lessonByHanziMap.get(ch);
          if (frag) {
            const t =
              language === 'fr'
                ? frag.translationFr || frag.translationEn || ''
                : frag.translationEn || frag.translationFr || '';
            if (t) pieces.push(`${ch} = ${t}`);
          } else if (cfdict[ch]) {
            pieces.push(`${ch} = ${cfdict[ch]}`);
          }
        }
        if (pieces.length > 0) {
          return {
            hanzi: token,
            pinyin: tokenPinyin || '—',
            translation: pieces.join(' · '),
            source: 'cfdict'
          };
        }
      }

      return {
        hanzi: token,
        pinyin: tokenPinyin || '—',
        translation: '',
        source: 'none'
      };
    },
    [cfdict, language, lessonByHanziMap, pinyinForToken]
  );

  const title = language === 'fr' ? reading.title : reading.titleEn;
  const intro = language === 'fr' ? reading.intro : reading.introEn;

  const segments = useMemo(
    () =>
      reading.segments.map((seg, segIdx) => ({
        segIdx,
        hanzi: seg.hanzi,
        pinyin: seg.pinyin,
        translationFr: seg.translationFr,
        translationEn: seg.translationEn,
        tokens: segmentChinese(seg.hanzi)
      })),
    [reading.segments]
  );

  const closePopover = useCallback(() => setSelectedToken(null), []);

  // Keyboard: Escape closes popover
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopover();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closePopover]);

  const activeInfo = useMemo<WordInfo | null>(() => {
    if (!selectedToken) return null;
    const seg = segments[selectedToken.segIdx];
    if (!seg) return null;
    const tok = seg.tokens[selectedToken.tokIdx];
    if (!tok) return null;
    return lookupWord(tok, { hanzi: seg.hanzi, pinyin: seg.pinyin });
  }, [selectedToken, segments, lookupWord]);

  return (
    <div className="fl-player">
      <header className="fl-player-head">
        <button type="button" className="fl-player-back" onClick={onBack}>
          ← {copy.back}
        </button>
        <div className="fl-player-title-wrap">
          <span className="fl-player-level">{entry.cecrLevel.toUpperCase()}</span>
          <h1 className="fl-player-title">{title}</h1>
        </div>
      </header>

      {intro ? (
        <div className="fl-player-context">
          <span className="fl-player-context-label">{copy.introLabel}</span>
          <p>{intro}</p>
        </div>
      ) : null}

      <div className="fl-reading-toolbar">
        <button
          type="button"
          className={`fl-pill${showPinyin ? ' is-active' : ''}`}
          onClick={() => setShowPinyin((v) => !v)}
        >
          {copy.showPinyin}
        </button>
        <button
          type="button"
          className={`fl-pill${showTranslation ? ' is-active' : ''}`}
          onClick={() => setShowTranslation((v) => !v)}
        >
          {copy.showTranslation}
        </button>
        <button
          type="button"
          className="fl-pill"
          onClick={playAllSegments}
          title={language === 'fr' ? 'Écouter tout' : 'Play all'}
        >
          🔊
        </button>
      </div>

      <div className="fl-reading-body">
        {segments.map((seg) => {
          const translation =
            language === 'fr' ? seg.translationFr : seg.translationEn || seg.translationFr;
          const isActiveSeg = selectedToken?.segIdx === seg.segIdx;
          return (
            <div key={seg.segIdx} className={`fl-reading-segment${isActiveSeg ? ' is-active' : ''}`}>
              <div className="fl-reading-hanzi">
                {seg.tokens.map((tok, tokIdx) => {
                  if (!hasChinese(tok)) {
                    return (
                      <span key={`${seg.segIdx}-${tokIdx}`} className="fl-reading-static">
                        {tok}
                      </span>
                    );
                  }
                  const isSel =
                    selectedToken?.segIdx === seg.segIdx &&
                    selectedToken?.tokIdx === tokIdx;
                  return (
                    <span
                      key={`${seg.segIdx}-${tokIdx}`}
                      className={`fl-reading-token${isSel ? ' is-selected' : ''}`}
                      tabIndex={0}
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedToken(
                          isSel ? null : { segIdx: seg.segIdx, tokIdx }
                        );
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedToken(
                            isSel ? null : { segIdx: seg.segIdx, tokIdx }
                          );
                        }
                      }}
                    >
                      {tok}
                    </span>
                  );
                })}
                <button
                  type="button"
                  className="fl-reading-speak"
                  aria-label="speak"
                  onClick={(e) => {
                    e.stopPropagation();
                    playReadingSegment(seg.segIdx);
                  }}
                >
                  🔊
                </button>
              </div>
              {showPinyin ? <div className="fl-reading-pinyin">{seg.pinyin}</div> : null}
              {showTranslation ? <div className="fl-reading-translation">{translation}</div> : null}

              {isActiveSeg && activeInfo ? (
                <div className="fl-word-popover">
                  <div className="fl-word-popover-head">
                    <strong className="fl-word-popover-hanzi">{activeInfo.hanzi}</strong>
                    <span className="fl-word-popover-pinyin">{activeInfo.pinyin}</span>
                    <button
                      type="button"
                      className="fl-word-popover-close"
                      aria-label="close"
                      onClick={closePopover}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="fl-word-popover-translation">
                    {activeInfo.translation || copy.noWordInfo}
                  </div>
                  <div className="fl-word-popover-actions">
                    <button
                      type="button"
                      className="fl-pill"
                      onClick={() => {
                        playHanziAudio(activeInfo.hanzi).catch(() => {
                          /* silent: pas de MP3 dispo pour ce caractère */
                        });
                      }}
                    >
                      🔊
                    </button>
                    <span className="fl-word-popover-source">
                      {activeInfo.source === 'lesson'
                        ? 'HSK'
                        : activeInfo.source === 'cfdict'
                        ? 'CFDICT'
                        : '—'}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <footer className="fl-player-footer">
        <div className="fl-player-meta">{copy.tapAnyWord}</div>
      </footer>
    </div>
  );
}

export default FreeLearningPage;
