/**
 * ReadingPageV2.tsx — page standalone des lectures XiaoLearn
 * ----------------------------------------------------------
 * UX refondue pour reprendre les patterns du Simulateur (V6) :
 *   - Header catalogue avec tuile icône 📖 + titre + sous-titre
 *   - Tabs niveaux CECR (pills avec (N))
 *   - Sections groupées par niveau en mode « Tous »
 *   - Cartes riches : emoji thème, badge niveau, intro, stats (segments/
 *     questions)
 *   - Vue détail façon briefing : hero centré avec emoji rond bordé,
 *     badges niveau/thème/segments, bordure supérieure rouge→or
 *   - Toggles pinyin/traduction dans un bandeau
 *   - Segments numérotés
 *
 * Source de données : src/data/readings.ts (`readings` + helpers).
 *
 * Props :
 *   - language : 'fr' | 'en'
 *   - onBack   : callback retour home
 *
 * Styles : ../styles/reading-v2.css (scoped sous `.reading-v2`).
 */

import { useMemo, useState } from 'react';
import '../styles/reading-v2.css';
import { readings, type ReadingEntry } from '../data/readings';

export type ReadingV2Language = 'fr' | 'en';

export interface ReadingPageV2Props {
  language?: ReadingV2Language;
  onBack?: () => void;
  /** Lecture pré-sélectionnée (optionnel). */
  initialReadingId?: string;
}

// ---------------------------------------------------------------------------
// Copies
// ---------------------------------------------------------------------------

const COPY = {
  fr: {
    title: 'Lectures',
    subtitle: 'Textes courts alignés pour pratiquer la compréhension écrite.',
    back: '← Retour',
    backList: '← Retour aux lectures',
    filterAll: 'Tous',
    togglePinyin: 'Pinyin',
    toggleTranslation: 'Traduction',
    intro: 'Contexte',
    vocab: 'Vocabulaire clé',
    questions: 'Questions de compréhension',
    revealAnswer: 'Afficher la réponse',
    empty: 'Aucune lecture pour ce niveau.'
  },
  en: {
    title: 'Readings',
    subtitle: 'Short aligned texts to practice reading comprehension.',
    back: '← Back',
    backList: '← Back to readings',
    filterAll: 'All',
    togglePinyin: 'Pinyin',
    toggleTranslation: 'Translation',
    intro: 'Context',
    vocab: 'Key vocabulary',
    questions: 'Comprehension questions',
    revealAnswer: 'Reveal answer',
    empty: 'No readings for this level.'
  }
} as const;

type CopyKey = keyof (typeof COPY)['fr'];
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
// On inspecte d'abord l'ID (plus précis) puis on retombe sur le thème.
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
  // Fallback léger : livre
  return '📖';
};

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------

const ReadingPageV2 = (props: ReadingPageV2Props) => {
  const { language = 'fr', onBack, initialReadingId } = props;

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
  const [showPinyin, setShowPinyin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set());

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
  // CARD (helper de rendu — PAS un composant React)
  // -------------------------------------------------------------------------
  // À chaque re-render du parent, un composant déclaré inline est vu par
  // React comme un nouveau type → il démonte/remonte tous les boutons →
  // les hover et clics sont perdus pendant le cycle. On retourne donc
  // directement du JSX depuis une fonction utilitaire stable.
  const renderCard = (entry: ReadingEntry) => {
    const title = language === 'en' ? entry.reading.titleEn : entry.reading.title;
    const intro = language === 'en' ? entry.reading.introEn : entry.reading.intro;
    const theme = language === 'en' ? entry.themeEn : entry.theme;
    const block = levelBlock(entry.cecrLevel);
    const segCount = entry.reading.segments.length;
    const qCount = entry.reading.questions?.length ?? 0;
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
        <h3 className="rv2-card-title">{title}</h3>
        <p className="rv2-card-desc">{intro}</p>
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
  // VUE DÉTAIL
  // -------------------------------------------------------------------------
  if (selected) {
    const { reading } = selected;
    const title = language === 'en' ? reading.titleEn : reading.title;
    const intro = language === 'en' ? reading.introEn : reading.intro;
    const theme = language === 'en' ? selected.themeEn : selected.theme;
    const block = levelBlock(selected.cecrLevel);

    const toggleAnswer = (idx: number) => {
      setRevealedAnswers((prev) => {
        const next = new Set(prev);
        if (next.has(idx)) next.delete(idx);
        else next.add(idx);
        return next;
      });
    };

    return (
      <div className="reading-v2">
        <div className="rv2-detail">
          <button
            type="button"
            className="rv2-btn rv2-btn--link rv2-detail-back"
            onClick={() => {
              setSelectedId(null);
              setRevealedAnswers(new Set());
            }}
          >
            {t(language, 'backList')}
          </button>

          <div className={`rv2-detail-hero rv2-detail-hero--${block}`}>
            <div className="rv2-detail-emoji-wrap" aria-hidden>
              <div className="rv2-detail-emoji">{iconForEntry(selected)}</div>
            </div>
            <div className="rv2-detail-hero-body">
              <h1>{title}</h1>
              {intro && <p className="rv2-detail-intro">{intro}</p>}
              <div className="rv2-detail-badges">
                <span className="rv2-badge rv2-badge--level">
                  {LEVEL_LABEL[selected.cecrLevel]}
                </span>
                <span className="rv2-badge rv2-badge--theme">
                  <span aria-hidden>🏷️</span> {theme}
                </span>
                <span className="rv2-badge">
                  <span aria-hidden>📝</span>{' '}
                  {fmtSegments(language, reading.segments.length)}
                </span>
                {reading.questions && reading.questions.length > 0 && (
                  <span className="rv2-badge">
                    <span aria-hidden>❓</span>{' '}
                    {fmtQuestions(language, reading.questions.length)}
                  </span>
                )}
                {reading.vocab && reading.vocab.length > 0 && (
                  <span className="rv2-badge">
                    <span aria-hidden>📚</span>{' '}
                    {fmtVocab(language, reading.vocab.length)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="rv2-toggles">
            <button
              type="button"
              className={`rv2-toggle ${showPinyin ? 'is-on' : ''}`}
              onClick={() => setShowPinyin((v) => !v)}
              aria-pressed={showPinyin}
            >
              <span className="rv2-toggle-dot" aria-hidden />
              {t(language, 'togglePinyin')}
            </button>
            <button
              type="button"
              className={`rv2-toggle ${showTranslation ? 'is-on' : ''}`}
              onClick={() => setShowTranslation((v) => !v)}
              aria-pressed={showTranslation}
            >
              <span className="rv2-toggle-dot" aria-hidden />
              {t(language, 'toggleTranslation')}
            </button>
          </div>

          <div className="rv2-segments">
            {reading.segments.map((seg, i) => (
              <div key={i} className="rv2-segment">
                <div className="rv2-segment-num">{i + 1}</div>
                <div className="rv2-segment-body">
                  <div className="rv2-hanzi">{seg.hanzi}</div>
                  {showPinyin && <div className="rv2-pinyin">{seg.pinyin}</div>}
                  {showTranslation && (
                    <div className="rv2-translation">
                      {language === 'en' ? seg.translationEn : seg.translationFr}
                    </div>
                  )}
                </div>
              </div>
            ))}
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

          {reading.questions && reading.questions.length > 0 && (
            <div className="rv2-section-block">
              <h3 className="rv2-section-head">❓ {t(language, 'questions')}</h3>
              <div className="rv2-questions">
                {reading.questions.map((q, i) => {
                  const revealed = revealedAnswers.has(i);
                  return (
                    <div key={i} className="rv2-qa">
                      <div className="rv2-qa-q">
                        {i + 1}. {language === 'en' ? q.questionEn : q.questionFr}
                      </div>
                      <div
                        className={`rv2-qa-a ${revealed ? '' : 'is-hidden'}`}
                        onClick={() => toggleAnswer(i)}
                        title={revealed ? '' : t(language, 'revealAnswer')}
                      >
                        {language === 'en' ? q.answerEn : q.answerFr}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
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

export default ReadingPageV2;
