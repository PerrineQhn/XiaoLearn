/**
 * ReadingPageV2.tsx — page standalone des lectures XiaoLearn
 * ----------------------------------------------------------
 * UX refondue pour reprendre les patterns du Simulateur (V6) et inspirée
 * de Seonsaengnim (catalogue éditorial + lecteur interactif) :
 *   - Header catalogue avec tuile icône 📖 + titre + sous-titre
 *   - Tabs niveaux CECR (pills avec (N))
 *   - Sections groupées par niveau en mode « Tous »
 *   - Cartes riches : emoji thème, badge niveau, intro, stats
 *
 * Vue détail (player) :
 *   - Hero centré (emoji, badges niveau / thème / segments)
 *   - **Lecteur audio compact** au-dessus du texte : Play/Pause, barre de
 *     progression cliquable, compteur de temps, retour au début, toggle
 *     vitesse Normal / Lent (le changement reprend à la position courante).
 *   - **Clic sur n'importe quel mot chinois** → popover contextuel avec
 *     pinyin + traduction (lookup leçons HSK puis CFDICT). Bouton « Ajouter
 *     à mes flashcards » qui crée une carte personnelle en un clic.
 *   - **Mini-quiz QCM** à la fin : 3-4 questions style cartes, feedback
 *     vert/rouge, explication, progression « QUESTION X / Y », +50 XP au
 *     premier complétion.
 *
 * Source de données : src/data/readings.ts (`readings` + helpers).
 *
 * Props :
 *   - language          : 'fr' | 'en'
 *   - onBack            : callback retour home
 *   - initialReadingId  : lecture pré-sélectionnée (optionnel)
 *   - personalFlashcards: hook usePersonalFlashcards (ajout en 1 clic depuis
 *                         le popover). Si absent, le bouton est désactivé.
 *   - onAwardXp         : verse de l'XP au dashboard quand le quiz est
 *                         complété pour la première fois. Si absent, le
 *                         quiz fonctionne sans récompense.
 *
 * Styles : ../styles/reading-v2.css (scoped sous `.reading-v2`).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { pinyin as pinyinPro } from 'pinyin-pro';
import '../styles/reading-v2.css';
import { readings, type ReadingEntry } from '../data/readings';
import { getAllLessons } from '../data/lessons';
import cfdictData from '../data/cfdict-compact.json';
import { getReadingZhTitle } from '../data/reading-zh-titles';
import { getReadingQuiz } from '../data/reading-quizzes';
import AudioSpeedToggle from '../components/AudioSpeedToggle';
import {
  cancelTTS,
  isReadingSlowAvailable,
  loadReadingManifest,
  resolveReadingSegmentUrl,
  type AudioSpeed,
  type ReadingAudioManifest
} from '../utils/dialogue-audio';
import { playHanziAudio } from '../utils/audio';
import ComprehensionQuiz from '../components/reading/ComprehensionQuiz';
import type { UsePersonalFlashcardsReturn } from '../hooks/usePersonalFlashcards';

export type ReadingV2Language = 'fr' | 'en';

export interface ReadingPageV2Props {
  language?: ReadingV2Language;
  onBack?: () => void;
  /** Lecture pré-sélectionnée (optionnel). */
  initialReadingId?: string;
  /** Hook usePersonalFlashcards — optionnel (Lifetime requis côté app). */
  personalFlashcards?: UsePersonalFlashcardsReturn;
  /** Verse +X XP au dashboard quand le quiz est complété. */
  onAwardXp?: (xp: number) => void;
}

// ---------------------------------------------------------------------------
// Copies
// ---------------------------------------------------------------------------

const COPY = {
  fr: {
    title: 'Lectures',
    subtitle:
      'Lis, écoute et clique sur les mots pour découvrir leur sens en contexte.',
    back: '← Retour',
    backList: '← Retour aux lectures',
    filterAll: 'Tous',
    togglePinyin: 'Pinyin',
    toggleTranslation: 'Traduction',
    intro: 'Contexte',
    vocab: 'Vocabulaire clé',
    quizTitle: 'Quiz de compréhension',
    quizSub: 'Réponds aux questions pour valider ta lecture.',
    quizStart: 'Lancer le quiz',
    quizQuestion: 'Question',
    quizNext: 'Suivant',
    quizFinish: 'Terminer',
    quizRetake: 'Refaire le quiz',
    quizScore: 'Ton score',
    quizPerfect: 'Bravo, tout juste !',
    quizPartial: 'Bien joué, tu peux retenter.',
    quizXp: '+50 XP gagnés',
    quizXpAlready: 'XP déjà encaissés sur ce texte',
    revealAnswer: 'Afficher la réponse',
    empty: 'Aucune lecture pour ce niveau.',
    tapWord: 'Touche un caractère pour voir sa traduction.',
    addFlashcard: 'Ajouter à mes flashcards',
    flashcardAdded: 'Ajouté à mes flashcards ✓',
    flashcardFull: 'Capacité flashcards atteinte',
    flashcardLocked: 'Flashcards perso réservées aux abonnés à vie',
    audioListen: 'Écoute audio',
    audioNotReady: 'Audio non encore généré pour ce texte',
    audioModeNormal: 'Normal',
    audioModeSlow: 'Lent',
    audioHelp:
      'Utilise « Lent » pour bien entendre chaque syllabe.',
    source: {
      lesson: 'HSK',
      cfdict: 'CFDICT',
      none: '—'
    }
  },
  en: {
    title: 'Readings',
    subtitle:
      'Read, listen and tap any word to discover its meaning in context.',
    back: '← Back',
    backList: '← Back to readings',
    filterAll: 'All',
    togglePinyin: 'Pinyin',
    toggleTranslation: 'Translation',
    intro: 'Context',
    vocab: 'Key vocabulary',
    quizTitle: 'Comprehension quiz',
    quizSub: 'Answer the questions to confirm your reading.',
    quizStart: 'Start quiz',
    quizQuestion: 'Question',
    quizNext: 'Next',
    quizFinish: 'Finish',
    quizRetake: 'Retake quiz',
    quizScore: 'Your score',
    quizPerfect: 'Perfect score!',
    quizPartial: 'Nice — try again to perfect it.',
    quizXp: '+50 XP earned',
    quizXpAlready: 'XP already earned for this text',
    revealAnswer: 'Reveal answer',
    empty: 'No readings for this level.',
    tapWord: 'Tap a character to view its translation.',
    addFlashcard: 'Add to my flashcards',
    flashcardAdded: 'Added to flashcards ✓',
    flashcardFull: 'Flashcard limit reached',
    flashcardLocked: 'Personal flashcards are a Lifetime perk',
    audioListen: 'Audio',
    audioNotReady: 'Audio not yet generated for this text',
    audioModeNormal: 'Normal',
    audioModeSlow: 'Slow',
    audioHelp: 'Use "Slow" to clearly hear each syllable.',
    source: {
      lesson: 'HSK',
      cfdict: 'CFDICT',
      none: '—'
    }
  }
} as const;

type CopyKey = Exclude<keyof (typeof COPY)['fr'], 'source'>;
const t = (lang: ReadingV2Language, k: CopyKey): string => COPY[lang][k] ?? COPY.fr[k];

// Pluralisations séparées (t() ne renvoie que des strings).
const fmtSegments = (lang: ReadingV2Language, n: number): string =>
  lang === 'en'
    ? `${n} sentence${n > 1 ? 's' : ''}`
    : `${n} phrase${n > 1 ? 's' : ''}`;

const fmtQuestions = (lang: ReadingV2Language, n: number): string =>
  `${n} question${n > 1 ? 's' : ''}`;

const fmtVocab = (lang: ReadingV2Language, n: number): string =>
  lang === 'en'
    ? `${n} word${n > 1 ? 's' : ''}`
    : `${n} mot${n > 1 ? 's' : ''}`;

// ---------------------------------------------------------------------------
// Niveaux CECR
// ---------------------------------------------------------------------------

const LEVEL_ORDER: ReadingEntry['cecrLevel'][] = [
  'a1', 'a2', 'b1.1', 'b1.2', 'b2.1', 'b2.2', 'c1.1', 'c1.2', 'c2.1', 'c2.2'
];

const LEVEL_LABEL: Record<ReadingEntry['cecrLevel'], string> = {
  a1: 'A1', a2: 'A2',
  'b1.1': 'B1.1', 'b1.2': 'B1.2',
  'b2.1': 'B2.1', 'b2.2': 'B2.2',
  'c1.1': 'C1.1', 'c1.2': 'C1.2',
  'c2.1': 'C2.1', 'c2.2': 'C2.2'
};

/** Tranche (a / b / c) pour la palette de la carte. */
const levelBlock = (lv: ReadingEntry['cecrLevel']): 'a' | 'b' | 'c' =>
  lv.startsWith('a') ? 'a' : lv.startsWith('b') ? 'b' : 'c';

// ---------------------------------------------------------------------------
// Emoji par thème — la carte en est l'élément central.
// ---------------------------------------------------------------------------

const ID_EMOJI: Record<string, string> = {
  'rd-a1-my-day': '🌅',
  'rd-a1-my-room': '🛏️',
  'rd-a1-restaurant': '🥡',
  'rd-a1-subway': '🚇',
  'rd-a2-travel': '🧳',
  'rd-a2-market': '🛒',
  'rd-a2-doctor-visit': '🏥',
  'rd-a2-birthday': '🎂',
  'rd-b11-work': '💼',
  'rd-b11-roommate': '🏠',
  'rd-b11-mid-autumn': '🥮',
  'rd-b11-spring-festival': '🧧',
  'rd-b12-gaokao': '🎓',
  'rd-b12-delivery': '📦',
  'rd-b12-change-moon': '🌙',
  'rd-b21-environment': '🌱',
  'rd-b21-ai-work': '🤖',
  'rd-b21-post-pandemic-economy': '📈',
  'rd-b21-analects-excerpt': '☯️',
  'rd-b21-aging-society': '👴',
  'rd-b21-wukong-heaven': '🐵',
  'rd-b21-cowherd-weaver': '🌌',
  'rd-b22-intangible-heritage': '🏮',
  'rd-b22-smart-city': '🌃',
  'rd-b22-white-snake': '🐍',
  'rd-c11-hanfu-revival': '👘',
  'rd-c11-laozi-wisdom': '📜',
  'rd-c11-butterfly-lovers': '🦋',
  'rd-c12-china-france': '🤝',
  'rd-c12-education-21c': '🏫',
  'rd-c12-yingning-fox': '🦊',
  'rd-c21-river-and-time': '🌊',
  'rd-c21-mulan': '⚔️',
  'rd-c22-hometown': '🏞️'
};

const iconForEntry = (entry: ReadingEntry): string => {
  const fromId = ID_EMOJI[entry.reading.id];
  if (fromId) return fromId;
  return '📖';
};

// ---------------------------------------------------------------------------
// Segmentation / lookup
// ---------------------------------------------------------------------------

// Échappements Unicode portables (vs caractères littéraux) : évite tout
// risque de corruption d'octets par un minifieur, un proxy ou un Worker
// qui réinterpréterait l'encodage du bundle.
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

interface WordInfo {
  hanzi: string;
  pinyin: string;
  translation: string;
  source: 'lesson' | 'cfdict' | 'none';
  /** Décomposition caractère par caractère (pour mots composés). */
  breakdown?: Array<{ char: string; gloss: string }>;
}

const CFDICT_MAP = cfdictData as Record<string, string>;

// ---------------------------------------------------------------------------
// Format temps mm:ss
// ---------------------------------------------------------------------------

const fmtTime = (sec: number): string => {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------

const ReadingPageV2 = (props: ReadingPageV2Props) => {
  const {
    language = 'fr',
    onBack,
    initialReadingId,
    personalFlashcards,
    onAwardXp
  } = props;

  const availableLevels = useMemo(() => {
    const present = new Set(readings.map((r) => r.cecrLevel));
    return LEVEL_ORDER.filter((lv) => present.has(lv));
  }, []);

  const countByLevel = useMemo(() => {
    const counts: Partial<Record<ReadingEntry['cecrLevel'], number>> = {};
    for (const r of readings) {
      counts[r.cecrLevel] = (counts[r.cecrLevel] ?? 0) + 1;
    }
    return counts;
  }, []);

  const [levelFilter, setLevelFilter] = useState<ReadingEntry['cecrLevel'] | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(initialReadingId ?? null);
  // Pinyin et traduction OFF par défaut : on encourage la lecture active.
  // L'utilisateur active les aides quand il bloque sur un mot (click-mot) ou
  // via les toggles en haut du player.
  const [showPinyin, setShowPinyin] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const filtered = useMemo(() => {
    if (levelFilter === 'all') return readings;
    return readings.filter((r) => r.cecrLevel === levelFilter);
  }, [levelFilter]);

  const groupsAll = useMemo(
    () =>
      availableLevels
        .map((lv) => ({
          level: lv,
          items: readings.filter((r) => r.cecrLevel === lv)
        }))
        .filter((g) => g.items.length > 0),
    [availableLevels]
  );

  const selected = useMemo(
    () => readings.find((r) => r.reading.id === selectedId) ?? null,
    [selectedId]
  );

  // -------------------------------------------------------------------------
  // CARD (rendu inline — pas un composant React)
  // -------------------------------------------------------------------------
  const renderCard = (entry: ReadingEntry) => {
    const title = language === 'en' ? entry.reading.titleEn : entry.reading.title;
    const theme = language === 'en' ? entry.themeEn : entry.theme;
    const block = levelBlock(entry.cecrLevel);
    const segCount = entry.reading.segments.length;
    const qCount = (getReadingQuiz(entry.reading.id) ?? entry.reading.questions ?? []).length;
    const titleZh = getReadingZhTitle(entry.reading.id);
    return (
      <button
        key={entry.reading.id}
        type="button"
        className={`rv2-card rv2-card--${block}`}
        onClick={() => setSelectedId(entry.reading.id)}
      >
        <div className="rv2-card-top">
          <span className="rv2-card-emoji-tile" aria-hidden>
            {iconForEntry(entry)}
          </span>
          <span className="rv2-card-level">{LEVEL_LABEL[entry.cecrLevel]}</span>
        </div>
        <p className="rv2-card-theme">{theme}</p>
        {titleZh ? (
          <>
            <h3 className="rv2-card-title-zh" lang="zh-Hans">{titleZh}</h3>
            <p className="rv2-card-title-translation">{title}</p>
          </>
        ) : (
          <h3 className="rv2-card-title">{title}</h3>
        )}
        <div className="rv2-card-foot">
          <span className="rv2-card-stat">
            <span className="rv2-card-stat-icon" aria-hidden>📝</span>
            {fmtSegments(language, segCount)}
          </span>
          {qCount > 0 && (
            <span className="rv2-card-stat">
              <span className="rv2-card-stat-icon" aria-hidden>❓</span>
              {fmtQuestions(language, qCount)}
            </span>
          )}
        </div>
      </button>
    );
  };

  // -------------------------------------------------------------------------
  // VUE DÉTAIL — player interactif
  // -------------------------------------------------------------------------
  if (selected) {
    return (
      <ReadingPlayer
        key={selected.reading.id}
        entry={selected}
        language={language}
        showPinyin={showPinyin}
        showTranslation={showTranslation}
        setShowPinyin={setShowPinyin}
        setShowTranslation={setShowTranslation}
        personalFlashcards={personalFlashcards}
        onAwardXp={onAwardXp}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  // -------------------------------------------------------------------------
  // VUE LISTE (catalogue)
  // -------------------------------------------------------------------------
  const totalCount = readings.length;

  return (
    <div className="reading-v2">
      {onBack && (
        <button
          type="button"
          className="rv2-btn rv2-btn--link rv2-catalog-back"
          onClick={onBack}
        >
          {t(language, 'back')}
        </button>
      )}

      <header className="rv2-catalog-header">
        <div className="rv2-catalog-icon" aria-hidden>📖</div>
        <div className="rv2-catalog-head-text">
          <h1>{t(language, 'title')}</h1>
          <p>{t(language, 'subtitle')}</p>
        </div>
      </header>

      <div className="rv2-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={levelFilter === 'all'}
          className={`rv2-tab ${levelFilter === 'all' ? 'is-active' : ''}`}
          onClick={() => setLevelFilter('all')}
        >
          <span>{t(language, 'filterAll')}</span>
          <span className="rv2-tab-count">({totalCount})</span>
        </button>
        {availableLevels.map((lv) => (
          <button
            key={lv}
            type="button"
            role="tab"
            aria-selected={levelFilter === lv}
            className={`rv2-tab ${levelFilter === lv ? 'is-active' : ''}`}
            onClick={() => setLevelFilter(lv)}
          >
            <span>{LEVEL_LABEL[lv]}</span>
            <span className="rv2-tab-count">({countByLevel[lv] ?? 0})</span>
          </button>
        ))}
      </div>

      {levelFilter === 'all' ? (
        <div className="rv2-sections">
          {groupsAll.map((group) => {
            const block = levelBlock(group.level);
            return (
              <section key={group.level} className={`rv2-section rv2-card--${block}`}>
                <h2 className="rv2-section-title">
                  <span className="rv2-section-title-badge">
                    {LEVEL_LABEL[group.level]}
                  </span>
                  <span className="rv2-section-title-count">
                    {group.items.length}
                  </span>
                </h2>
                <div className="rv2-grid">
                  {group.items.map((e) => renderCard(e))}
                </div>
              </section>
            );
          })}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rv2-empty">{t(language, 'empty')}</div>
      ) : (
        <div className="rv2-grid">
          {filtered.map((e) => renderCard(e))}
        </div>
      )}
    </div>
  );
};

// ===========================================================================
//  ReadingPlayer — vue détail riche (audio + clic-mot + quiz)
// ===========================================================================

interface ReadingPlayerProps {
  entry: ReadingEntry;
  language: ReadingV2Language;
  showPinyin: boolean;
  showTranslation: boolean;
  setShowPinyin: (v: boolean) => void;
  setShowTranslation: (v: boolean) => void;
  personalFlashcards?: UsePersonalFlashcardsReturn;
  onAwardXp?: (xp: number) => void;
  onBack: () => void;
}

const ReadingPlayer = ({
  entry,
  language,
  showPinyin,
  showTranslation,
  setShowPinyin,
  setShowTranslation,
  personalFlashcards,
  onAwardXp,
  onBack
}: ReadingPlayerProps) => {
  const { reading } = entry;
  const title = language === 'en' ? reading.titleEn : reading.title;
  // L'intro/résumé est désormais masqué dans la vue détail (le lecteur le
  // découvre en lisant — pas de spoiler). Reste disponible sur les cartes
  // du catalogue (vue liste).
  const theme = language === 'en' ? entry.themeEn : entry.theme;
  const block = levelBlock(entry.cecrLevel);
  const titleZh = getReadingZhTitle(reading.id);

  // -------------------------------------------------------------------------
  // Lookup HSK (leçons) — construit une seule fois.
  // -------------------------------------------------------------------------
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

  const pinyinForToken = useCallback((token: string, sentence: string): string => {
    if (!token || !hasChinese(token)) return '';
    try {
      const fullArr = pinyinPro(sentence, {
        type: 'array',
        toneType: 'symbol'
      }) as string[];
      const tokenStart = sentence.indexOf(token);
      if (tokenStart < 0) {
        return pinyinPro(token, { toneType: 'symbol', type: 'string' }) as string;
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
  }, []);

  /**
   * Décompose un token en glosses caractère par caractère. Utilisé pour la
   * section « FORME DICTIONNAIRE » du popover, qui n'a de sens que sur les
   * mots composés (≥2 caractères).
   */
  const decomposeToken = useCallback(
    (token: string): Array<{ char: string; gloss: string }> => {
      if (token.length < 2) return [];
      const out: Array<{ char: string; gloss: string }> = [];
      for (const ch of Array.from(token)) {
        const frag = lessonByHanziMap.get(ch);
        if (frag) {
          const gloss =
            language === 'fr'
              ? frag.translationFr || frag.translationEn || ''
              : frag.translationEn || frag.translationFr || '';
          if (gloss) {
            out.push({ char: ch, gloss });
            continue;
          }
        }
        const cf = CFDICT_MAP[ch];
        if (cf) {
          // CFDICT donne parfois plusieurs sens séparés par '/' — on garde le 1er
          // pour rester lisible dans la popover.
          out.push({ char: ch, gloss: cf.split('/')[0].trim() });
        }
      }
      return out;
    },
    [language, lessonByHanziMap]
  );

  const lookupWord = useCallback(
    (token: string, segmentHanzi: string): WordInfo | null => {
      if (!token || !hasChinese(token)) return null;
      const tokenPinyin = pinyinForToken(token, segmentHanzi);
      const breakdown = decomposeToken(token);

      const lesson = lessonByHanziMap.get(token);
      if (lesson) {
        const translation =
          language === 'fr'
            ? lesson.translationFr || lesson.translationEn || ''
            : lesson.translationEn || lesson.translationFr || '';
        return {
          hanzi: token,
          pinyin: tokenPinyin || lesson.pinyin,
          translation,
          source: 'lesson',
          breakdown: breakdown.length > 0 ? breakdown : undefined
        };
      }

      const cfdictFr = CFDICT_MAP[token];
      if (cfdictFr) {
        return {
          hanzi: token,
          pinyin: tokenPinyin || '—',
          translation: cfdictFr,
          source: 'cfdict',
          breakdown: breakdown.length > 0 ? breakdown : undefined
        };
      }

      // Aucune entrée directe — on reconstitue la traduction à partir des
      // glosses caractère par caractère (uniquement si on en a trouvé au
      // moins une).
      if (breakdown.length > 0) {
        return {
          hanzi: token,
          pinyin: tokenPinyin || '—',
          translation: breakdown.map((b) => `${b.char} = ${b.gloss}`).join(' · '),
          source: 'cfdict',
          breakdown
        };
      }

      return {
        hanzi: token,
        pinyin: tokenPinyin || '—',
        translation: '',
        source: 'none'
      };
    },
    [decomposeToken, language, lessonByHanziMap, pinyinForToken]
  );

  // -------------------------------------------------------------------------
  // Segments tokenisés
  // -------------------------------------------------------------------------
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

  /**
   * Cherche une AUTRE phrase du texte qui contient le hanzi, pour montrer
   * un exemple « ailleurs dans le texte » dans le popover. La phrase de
   * référence (où l'utilisateur a cliqué) est déjà visible juste au-dessus
   * de la popover — pas besoin de la répéter.
   */
  const findOtherExample = useCallback(
    (
      hanzi: string,
      currentSegIdx: number
    ): { hanzi: string; translation: string } | null => {
      for (const seg of segments) {
        if (seg.segIdx === currentSegIdx) continue;
        if (seg.hanzi.includes(hanzi)) {
          return {
            hanzi: seg.hanzi,
            translation:
              language === 'en'
                ? seg.translationEn || seg.translationFr
                : seg.translationFr
          };
        }
      }
      return null;
    },
    [segments, language]
  );

  // -------------------------------------------------------------------------
  // Audio player — un seul élément <audio> qui enchaîne les segments
  // -------------------------------------------------------------------------
  const [audioSpeed, setAudioSpeed] = useState<AudioSpeed>('normal');
  const [readingManifest, setReadingManifest] = useState<ReadingAudioManifest | null>(null);
  const [slowAvailable, setSlowAvailable] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeSegIdx, setActiveSegIdx] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const segDurationsRef = useRef<number[]>([]);
  const queueRef = useRef<{ idx: number; running: boolean }>({ idx: 0, running: false });
  // Resume après changement de vitesse : on capture le segment courant et on
  // relance la lecture une fois le nouveau manifest chargé (via l'effet ci-dessous).
  const pendingResumeRef = useRef<number | null>(null);

  // Charge le manifest selon la vitesse choisie.
  useEffect(() => {
    let cancelled = false;
    loadReadingManifest(audioSpeed).then((m) => {
      if (!cancelled) setReadingManifest(m);
    });
    return () => {
      cancelled = true;
    };
  }, [audioSpeed]);

  useEffect(() => {
    let cancelled = false;
    isReadingSlowAvailable().then((ok) => {
      if (!cancelled) setSlowAvailable(ok);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // URLs résolues pour chaque segment (peuvent être null si pas généré).
  const segmentUrls = useMemo(
    () => reading.segments.map((_, idx) => resolveReadingSegmentUrl(reading, idx, readingManifest)),
    [reading, readingManifest]
  );

  const audioAvailable = useMemo(
    () => segmentUrls.some((u) => !!u),
    [segmentUrls]
  );

  // Cumul des durées segment par segment (utilisé pour la barre de progression
  // « globale »). Calculé au chargement du manifest via probes HEAD légers.
  useEffect(() => {
    let cancelled = false;
    if (!audioAvailable) {
      setDuration(0);
      segDurationsRef.current = [];
      return () => {
        cancelled = true;
      };
    }
    const probe = async () => {
      const durs: number[] = [];
      for (let i = 0; i < segmentUrls.length; i++) {
        const url = segmentUrls[i];
        if (!url) {
          durs.push(0);
          continue;
        }
        try {
          const d = await new Promise<number>((resolve) => {
            const probe = new Audio();
            probe.preload = 'metadata';
            probe.src = url;
            const done = (val: number) => {
              probe.onloadedmetadata = null;
              probe.onerror = null;
              probe.src = '';
              resolve(Number.isFinite(val) ? val : 0);
            };
            probe.onloadedmetadata = () => done(probe.duration);
            probe.onerror = () => done(0);
            // Timeout 4s
            setTimeout(() => done(0), 4000);
          });
          durs.push(d);
        } catch {
          durs.push(0);
        }
      }
      if (cancelled) return;
      segDurationsRef.current = durs;
      setDuration(durs.reduce((a, b) => a + b, 0));
    };
    probe();
    return () => {
      cancelled = true;
    };
  }, [segmentUrls, audioAvailable]);

  const stopAudio = useCallback(() => {
    const a = audioRef.current;
    if (a) {
      try {
        a.onended = null;
        a.onerror = null;
        a.ontimeupdate = null;
        a.pause();
        a.src = '';
      } catch {
        /* noop */
      }
      audioRef.current = null;
    }
    queueRef.current.running = false;
    cancelTTS();
    setIsPlaying(false);
    setActiveSegIdx(null);
  }, []);

  // Calcule la progression cumulée (pour la barre).
  const progressTime = useMemo(() => {
    if (activeSegIdx === null) return 0;
    const before = segDurationsRef.current
      .slice(0, activeSegIdx)
      .reduce((a, b) => a + b, 0);
    return before + currentTime;
  }, [activeSegIdx, currentTime]);

  const playFrom = useCallback(
    (startIdx: number) => {
      stopAudio();
      const segs = reading.segments;
      if (segs.length === 0) return;

      queueRef.current = { idx: startIdx, running: true };
      setIsPlaying(true);

      const playNext = () => {
        if (!queueRef.current.running) return;
        let idx = queueRef.current.idx;
        // Skip les segments sans URL audio
        while (idx < segs.length && !segmentUrls[idx]) idx += 1;
        if (idx >= segs.length) {
          queueRef.current.running = false;
          setIsPlaying(false);
          setActiveSegIdx(null);
          setCurrentTime(0);
          return;
        }
        const url = segmentUrls[idx];
        if (!url) {
          queueRef.current.running = false;
          setIsPlaying(false);
          return;
        }
        const audio = new Audio(url);
        audioRef.current = audio;
        setActiveSegIdx(idx);
        setCurrentTime(0);

        audio.ontimeupdate = () => {
          if (audioRef.current !== audio) return;
          setCurrentTime(audio.currentTime);
        };
        audio.onended = () => {
          if (audioRef.current !== audio) return;
          queueRef.current.idx = idx + 1;
          playNext();
        };
        audio.onerror = () => {
          if (audioRef.current !== audio) return;
          queueRef.current.idx = idx + 1;
          playNext();
        };
        audio.play().catch(() => {
          // Autoplay bloqué → repasse en pause
          if (audioRef.current !== audio) return;
          setIsPlaying(false);
          queueRef.current.running = false;
        });
      };
      playNext();
    },
    [reading.segments, segmentUrls, stopAudio]
  );

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      const a = audioRef.current;
      if (a) {
        a.pause();
        queueRef.current.running = false;
        setIsPlaying(false);
      }
      return;
    }
    // Resume si on a un audio courant en pause
    const a = audioRef.current;
    if (a && a.src && a.currentTime > 0) {
      queueRef.current.running = true;
      setIsPlaying(true);
      a.play().catch(() => {
        setIsPlaying(false);
      });
      return;
    }
    playFrom(0);
  }, [isPlaying, playFrom]);

  const restart = useCallback(() => {
    stopAudio();
    setCurrentTime(0);
    setActiveSegIdx(null);
    // Petit délai pour laisser stopAudio nettoyer
    setTimeout(() => playFrom(0), 30);
  }, [playFrom, stopAudio]);

  // Cleanup en démontant le player
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  // Changement de vitesse : on reprend à la même position « relative ».
  const handleSpeedChange = useCallback(
    (next: AudioSpeed) => {
      const wasPlaying = isPlaying;
      const segIdxAt = activeSegIdx;
      stopAudio();
      setAudioSpeed(next);
      // Reload du manifest → useEffect → puis on relance si on jouait.
      // On délègue le relancement à un effet (manifest changé) — voir plus bas.
      pendingResumeRef.current = wasPlaying ? segIdxAt ?? 0 : null;
    },
    [activeSegIdx, isPlaying, stopAudio]
  );

  // Quand le manifest change ET qu'on a une demande de resume, on relance.
  useEffect(() => {
    if (pendingResumeRef.current === null) return;
    if (!readingManifest) return;
    const idx = pendingResumeRef.current;
    pendingResumeRef.current = null;
    // Petit délai pour laisser le DOM se stabiliser
    setTimeout(() => playFrom(idx), 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readingManifest]);

  // -------------------------------------------------------------------------
  // Click-to-seek sur la barre de progression
  // -------------------------------------------------------------------------
  const seekTo = useCallback(
    (ratio: number) => {
      const totalDur = duration;
      if (totalDur <= 0 || segDurationsRef.current.length === 0) return;
      const target = Math.max(0, Math.min(totalDur, totalDur * ratio));
      // Trouve le segment correspondant
      let acc = 0;
      let segIdx = 0;
      for (; segIdx < segDurationsRef.current.length; segIdx++) {
        if (acc + segDurationsRef.current[segIdx] > target) break;
        acc += segDurationsRef.current[segIdx];
      }
      const offset = target - acc;
      // Stop l'audio courant et lance le segment voulu à l'offset
      stopAudio();
      queueRef.current = { idx: segIdx, running: true };
      setIsPlaying(true);
      const url = segmentUrls[segIdx];
      if (!url) return;
      const audio = new Audio(url);
      audioRef.current = audio;
      setActiveSegIdx(segIdx);
      audio.ontimeupdate = () => {
        if (audioRef.current !== audio) return;
        setCurrentTime(audio.currentTime);
      };
      audio.onended = () => {
        if (audioRef.current !== audio) return;
        queueRef.current.idx = segIdx + 1;
        playFrom(segIdx + 1);
      };
      audio.onerror = () => {
        if (audioRef.current !== audio) return;
        playFrom(segIdx + 1);
      };
      audio.onloadedmetadata = () => {
        try {
          audio.currentTime = offset;
        } catch {
          /* noop */
        }
        audio.play().catch(() => {
          setIsPlaying(false);
        });
      };
    },
    [duration, playFrom, segmentUrls, stopAudio]
  );

  // -------------------------------------------------------------------------
  // Popover de traduction au clic
  // -------------------------------------------------------------------------
  const [selectedToken, setSelectedToken] = useState<{
    segIdx: number;
    tokIdx: number;
  } | null>(null);
  const [addedTokens, setAddedTokens] = useState<Set<string>>(new Set());
  const [addError, setAddError] = useState<string | null>(null);

  const closePopover = useCallback(() => {
    setSelectedToken(null);
    setAddError(null);
  }, []);

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
    return lookupWord(tok, seg.hanzi);
  }, [selectedToken, segments, lookupWord]);

  const handleAddFlashcard = useCallback(() => {
    if (!activeInfo) return;
    if (!personalFlashcards) {
      setAddError(t(language, 'flashcardLocked'));
      return;
    }
    if (personalFlashcards.atCapacity) {
      setAddError(t(language, 'flashcardFull'));
      return;
    }
    // Note : la lookup ne renvoie que la traduction dans la langue active.
    // On la stocke dans `translationFr` (champ requis) et on duplique dans
    // `translationEn` quand on est en mode anglais pour que la carte reste
    // lisible si l'utilisateur change de langue plus tard.
    const created = personalFlashcards.addCard({
      hanzi: activeInfo.hanzi,
      pinyin: activeInfo.pinyin === '—' ? '' : activeInfo.pinyin,
      translationFr: activeInfo.translation,
      translationEn: language === 'en' ? activeInfo.translation : undefined,
      note: language === 'fr' ? `Lecture : ${reading.title}` : `Reading: ${reading.titleEn}`
    });
    if (created) {
      setAddedTokens((prev) => {
        const next = new Set(prev);
        next.add(activeInfo.hanzi);
        return next;
      });
      setAddError(null);
    } else {
      setAddError(t(language, 'flashcardFull'));
    }
  }, [activeInfo, personalFlashcards, language, reading.title, reading.titleEn]);

  // -------------------------------------------------------------------------
  // Quiz QCM — entièrement délégué à ComprehensionQuiz (composant partagé
  // avec DialoguePageV2). Priorité : quiz enrichi dans reading-quizzes.ts ;
  // fallback sur les questions inline (mode « afficher la réponse »).
  // -------------------------------------------------------------------------
  const enrichedQuiz = getReadingQuiz(reading.id);
  const questions = enrichedQuiz ?? reading.questions ?? [];

  // -------------------------------------------------------------------------
  // Rendu
  // -------------------------------------------------------------------------
  return (
    <div className="reading-v2">
      <div className="rv2-detail">
        <button
          type="button"
          className="rv2-btn rv2-btn--link rv2-detail-back"
          onClick={() => {
            stopAudio();
            onBack();
          }}
        >
          {t(language, 'backList')}
        </button>

        {/* Hero détaillé : pas de résumé (anti-spoiler) — juste niveau ·
            thème en kicker, titre chinois en grand, puis traduction.
            Aligné sur le pattern Seonsaengnim. */}
        <div className={`rv2-detail-hero rv2-detail-hero--${block} rv2-detail-hero--lean`}>
          <div className="rv2-detail-kicker">
            <span className="rv2-detail-kicker-level">
              {LEVEL_LABEL[entry.cecrLevel]}
            </span>
            <span className="rv2-detail-kicker-dot" aria-hidden>·</span>
            <span className="rv2-detail-kicker-theme">
              {theme.toUpperCase()}
            </span>
          </div>
          {titleZh ? (
            <>
              <h1 className="rv2-detail-title-zh" lang="zh-Hans">{titleZh}</h1>
              <p className="rv2-detail-title-translation">{title}</p>
            </>
          ) : (
            <h1 className="rv2-detail-title-fallback">{title}</h1>
          )}
        </div>

        {/* ============ LECTEUR AUDIO COMPACT ============ */}
        <div className={`rv2-player ${audioAvailable ? '' : 'is-disabled'}`}>
          <div className="rv2-player-row">
            <button
              type="button"
              className="rv2-player-play"
              onClick={togglePlay}
              disabled={!audioAvailable}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <div className="rv2-player-meta">
              <span className="rv2-player-label">
                🎧 {t(language, 'audioListen')}
              </span>
              <span className="rv2-player-time">
                {fmtTime(progressTime)} / {fmtTime(duration)}
              </span>
            </div>
            <button
              type="button"
              className="rv2-player-restart"
              onClick={restart}
              disabled={!audioAvailable}
              aria-label="restart"
              title="↩"
            >
              ↩
            </button>
          </div>
          <div
            className="rv2-player-bar"
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={duration > 0 ? Math.round((progressTime / duration) * 100) : 0}
            onClick={(e) => {
              if (!audioAvailable) return;
              const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
              const ratio = (e.clientX - rect.left) / rect.width;
              seekTo(Math.max(0, Math.min(1, ratio)));
            }}
          >
            <div
              className="rv2-player-bar-fill"
              style={{
                width: duration > 0 ? `${(progressTime / duration) * 100}%` : '0%'
              }}
            />
          </div>
          <div className="rv2-player-foot">
            <div className="rv2-player-speeds">
              <button
                type="button"
                className={`rv2-player-speed ${audioSpeed === 'normal' ? 'is-active' : ''}`}
                onClick={() => handleSpeedChange('normal')}
              >
                {t(language, 'audioModeNormal')}
              </button>
              <button
                type="button"
                className={`rv2-player-speed ${audioSpeed === 'slow' ? 'is-active' : ''}`}
                onClick={() => slowAvailable && handleSpeedChange('slow')}
                disabled={!slowAvailable}
                title={!slowAvailable ? t(language, 'audioNotReady') : undefined}
              >
                {t(language, 'audioModeSlow')}
              </button>
            </div>
            <span className="rv2-player-help">
              {audioAvailable ? t(language, 'audioHelp') : t(language, 'audioNotReady')}
            </span>
          </div>
        </div>

        <div className="rv2-toggles">
          <button
            type="button"
            className={`rv2-toggle ${showPinyin ? 'is-on' : ''}`}
            onClick={() => setShowPinyin(!showPinyin)}
            aria-pressed={showPinyin}
          >
            <span className="rv2-toggle-dot" aria-hidden />
            {t(language, 'togglePinyin')}
          </button>
          <button
            type="button"
            className={`rv2-toggle ${showTranslation ? 'is-on' : ''}`}
            onClick={() => setShowTranslation(!showTranslation)}
            aria-pressed={showTranslation}
          >
            <span className="rv2-toggle-dot" aria-hidden />
            {t(language, 'toggleTranslation')}
          </button>
        </div>

        <div className="rv2-tap-hint">👆 {t(language, 'tapWord')}</div>

        {/* ============ SEGMENTS (clic-mot actif) ============ */}
        <div className="rv2-segments">
          {segments.map((seg) => {
            const translation =
              language === 'en'
                ? seg.translationEn || seg.translationFr
                : seg.translationFr;
            const isActiveSeg = selectedToken?.segIdx === seg.segIdx;
            const isReading = activeSegIdx === seg.segIdx && isPlaying;
            return (
              <div
                key={seg.segIdx}
                className={`rv2-segment ${isReading ? 'is-reading' : ''} ${
                  isActiveSeg ? 'is-active' : ''
                }`}
              >
                <div className="rv2-segment-num">{seg.segIdx + 1}</div>
                <div className="rv2-segment-body">
                  <div className="rv2-hanzi rv2-hanzi--clickable">
                    {seg.tokens.map((tok, tokIdx) => {
                      if (!hasChinese(tok)) {
                        return (
                          <span
                            key={`${seg.segIdx}-${tokIdx}`}
                            className="rv2-token rv2-token--static"
                          >
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
                          className={`rv2-token rv2-token--clickable ${
                            isSel ? 'is-selected' : ''
                          }`}
                          tabIndex={0}
                          role="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedToken(
                              isSel ? null : { segIdx: seg.segIdx, tokIdx }
                            );
                            setAddError(null);
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
                  </div>
                  {showPinyin && <div className="rv2-pinyin">{seg.pinyin}</div>}
                  {showTranslation && (
                    <div className="rv2-translation">{translation}</div>
                  )}

                  {isActiveSeg && activeInfo ? (
                    <WordPopover
                      info={activeInfo}
                      otherExample={findOtherExample(activeInfo.hanzi, seg.segIdx)}
                      language={language}
                      isAdded={addedTokens.has(activeInfo.hanzi)}
                      canAdd={!!personalFlashcards && !personalFlashcards.atCapacity && !!activeInfo.translation}
                      onClose={closePopover}
                      onPlay={() => {
                        playHanziAudio(activeInfo.hanzi).catch(() => {
                          /* silent */
                        });
                      }}
                      onAdd={handleAddFlashcard}
                      error={addError}
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {reading.vocab && reading.vocab.length > 0 && (
          <div className="rv2-section-block">
            <h3 className="rv2-section-head">📚 {t(language, 'vocab')}</h3>
            <div className="rv2-vocab-list">
              {reading.vocab.map((v) => (
                <span key={v} className="rv2-vocab-chip">{v}</span>
              ))}
            </div>
          </div>
        )}

        {/* ============ QUIZ DE COMPRÉHENSION ============ */}
        {questions.length > 0 && (
          <ComprehensionQuiz
            questions={questions}
            entityId={reading.id}
            language={language}
            xpStoreKey="xl_reading_quiz_xp_v1"
            onAwardXp={onAwardXp}
          />
        )}
      </div>
    </div>
  );
};

// ===========================================================================
//  WordPopover — carte de traduction sous le mot cliqué (style Seonsaengnim)
// ===========================================================================

interface WordPopoverProps {
  info: WordInfo;
  /** Exemple « ailleurs dans le texte » — null si introuvable. */
  otherExample: { hanzi: string; translation: string } | null;
  language: ReadingV2Language;
  isAdded: boolean;
  canAdd: boolean;
  onClose: () => void;
  onPlay: () => void;
  onAdd: () => void;
  error: string | null;
}

const WORD_POPOVER_COPY = {
  fr: {
    breakdown: 'Décomposition',
    context: 'Contexte',
    example: 'Exemple ailleurs dans le texte',
    addFlashcard: 'Ajouter aux flashcards',
    added: 'Ajouté ✓',
    listenWord: 'Écouter le mot',
    hsk: 'HSK',
    cfdict: 'CFDICT'
  },
  en: {
    breakdown: 'Breakdown',
    context: 'Context',
    example: 'Example elsewhere in the text',
    addFlashcard: 'Add to flashcards',
    added: 'Added ✓',
    listenWord: 'Listen to the word',
    hsk: 'HSK',
    cfdict: 'CFDICT'
  }
} as const;

const WordPopover = ({
  info,
  otherExample,
  language,
  isAdded,
  canAdd,
  onClose,
  onPlay,
  onAdd,
  error
}: WordPopoverProps) => {
  const labels = WORD_POPOVER_COPY[language];
  const isCompound = !!info.breakdown && info.breakdown.length > 1;
  // « Translation » courte : la 1re entrée avant un éventuel séparateur ·
  // évite d'afficher la longue chaîne décomposée si la source est cfdict
  // sans entrée directe (on a déjà la décomposition juste en-dessous).
  const primaryTranslation = (() => {
    if (info.source !== 'cfdict' || !info.breakdown) return info.translation;
    // Si la translation est juste la concaténation des glosses, on la masque
    // pour laisser la décomposition parler à sa place.
    const reconstructed = info.breakdown.map((b) => `${b.char} = ${b.gloss}`).join(' · ');
    if (info.translation === reconstructed) return '';
    return info.translation;
  })();

  return (
    <div className="rv2-popover" role="dialog" aria-label={info.hanzi}>
      <button
        type="button"
        className="rv2-popover-close"
        aria-label="close"
        onClick={onClose}
      >
        ✕
      </button>

      {/* Header : hanzi + pinyin */}
      <div className="rv2-popover-head">
        <button
          type="button"
          className="rv2-popover-play"
          onClick={onPlay}
          aria-label={labels.listenWord}
          title={labels.listenWord}
        >
          🔊
        </button>
        <div className="rv2-popover-head-text">
          <strong className="rv2-popover-hanzi" lang="zh-Hans">{info.hanzi}</strong>
          {info.pinyin && info.pinyin !== '—' && (
            <span className="rv2-popover-pinyin">{info.pinyin}</span>
          )}
        </div>
      </div>

      {/* Tags : source + nature du mot (composé / simple) */}
      <div className="rv2-popover-tags">
        <span
          className={`rv2-popover-tag rv2-popover-tag--${info.source}`}
        >
          {info.source === 'lesson' ? labels.hsk : info.source === 'cfdict' ? labels.cfdict : '—'}
        </span>
        {isCompound && (
          <span className="rv2-popover-tag rv2-popover-tag--context">
            🧩 {labels.breakdown}
          </span>
        )}
      </div>

      {/* Traduction principale */}
      {primaryTranslation && (
        <div className="rv2-popover-translation">{primaryTranslation}</div>
      )}

      {/* Décomposition caractère par caractère pour les composés */}
      {isCompound && info.breakdown && (
        <div className="rv2-popover-breakdown">
          <span className="rv2-popover-block-title">
            {labels.breakdown.toUpperCase()}
          </span>
          <div className="rv2-popover-breakdown-list">
            {info.breakdown.map((b, i) => (
              <div key={i} className="rv2-popover-breakdown-row">
                <span className="rv2-popover-breakdown-char" lang="zh-Hans">
                  {b.char}
                </span>
                <span className="rv2-popover-breakdown-gloss">{b.gloss}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exemple ailleurs dans le texte */}
      {otherExample && (
        <div className="rv2-popover-example">
          <span className="rv2-popover-block-title">
            {labels.example.toUpperCase()}
          </span>
          <p className="rv2-popover-example-hanzi" lang="zh-Hans">
            {otherExample.hanzi}
          </p>
          <p className="rv2-popover-example-translation">{otherExample.translation}</p>
        </div>
      )}

      {/* CTA flashcard */}
      <button
        type="button"
        className="rv2-popover-cta"
        onClick={onAdd}
        disabled={!canAdd || isAdded}
      >
        {isAdded ? `✓ ${labels.added}` : `+ ${labels.addFlashcard}`}
      </button>

      {error && <div className="rv2-popover-error">{error}</div>}
    </div>
  );
};

export default ReadingPageV2;
