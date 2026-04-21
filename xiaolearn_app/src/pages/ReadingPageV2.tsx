/**
 * ReadingPageV2.tsx — page standalone des lectures XiaoLearn
 * ----------------------------------------------------------
 * Liste filtrable par niveau CECR + vue détail d'un texte court (5-12
 * phrases) avec toggle pinyin/traduction au segment. Les questions de
 * compréhension sont masquées (blur) jusqu'au clic.
 *
 * Source de données : src/data/readings.ts (`readings` + helpers).
 *
 * Props :
 *   - language : 'fr' | 'en'
 *   - onBack   : callback retour home
 *
 * Styles : ../styles/dialogue-reading-v2.css (scoped sous `.reading-v2`).
 */

import { useMemo, useState } from 'react';
import '../styles/dialogue-reading-v2.css';
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
const t = (lang: ReadingV2Language, k: CopyKey) => COPY[lang][k] ?? COPY.fr[k];

// ---------------------------------------------------------------------------
// Niveaux
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

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------

const ReadingPageV2 = (props: ReadingPageV2Props) => {
  const { language = 'fr', onBack, initialReadingId } = props;

  const availableLevels = useMemo(() => {
    const present = new Set(readings.map((r) => r.cecrLevel));
    return LEVEL_ORDER.filter((lv) => present.has(lv));
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

  const selected = useMemo(
    () => readings.find((r) => r.reading.id === selectedId) ?? null,
    [selectedId]
  );

  // -------------------------------------------------------------------------
  // Vue détail
  // -------------------------------------------------------------------------
  if (selected) {
    const { reading } = selected;
    const title = language === 'en' ? reading.titleEn : reading.title;
    const intro = language === 'en' ? reading.introEn : reading.intro;

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
        <div className="dr-header">
          <button
            type="button"
            className="dr-btn dr-btn--link"
            onClick={() => {
              setSelectedId(null);
              setRevealedAnswers(new Set());
            }}
          >
            {t(language, 'backList')}
          </button>
          <h1>{title}</h1>
          <p>
            <strong>{LEVEL_LABEL[selected.cecrLevel]}</strong> · {language === 'en' ? selected.themeEn : selected.theme}
          </p>
        </div>

        <div className="dr-toggles">
          <button
            type="button"
            className={`dr-toggle ${showPinyin ? 'is-on' : ''}`}
            onClick={() => setShowPinyin((v) => !v)}
          >
            {showPinyin ? '🟢' : '⚪'} {t(language, 'togglePinyin')}
          </button>
          <button
            type="button"
            className={`dr-toggle ${showTranslation ? 'is-on' : ''}`}
            onClick={() => setShowTranslation((v) => !v)}
          >
            {showTranslation ? '🟢' : '⚪'} {t(language, 'toggleTranslation')}
          </button>
        </div>

        <div className="dr-detail">
          <div className="dr-detail-head">
            <h2 className="dr-detail-title">{title}</h2>
          </div>

          <div className="dr-intro">📖 {intro}</div>

          {reading.segments.map((seg, i) => (
            <div key={i} className="dr-segment">
              <div className="dr-hanzi">{seg.hanzi}</div>
              {showPinyin && <div className="dr-pinyin">{seg.pinyin}</div>}
              {showTranslation && (
                <div className="dr-translation">
                  {language === 'en' ? seg.translationEn : seg.translationFr}
                </div>
              )}
            </div>
          ))}

          {reading.vocab && reading.vocab.length > 0 && (
            <div className="dr-section">
              <h3>📚 {t(language, 'vocab')}</h3>
              <div className="dr-vocab">
                {reading.vocab.map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
            </div>
          )}

          {reading.questions && reading.questions.length > 0 && (
            <div className="dr-section">
              <h3>❓ {t(language, 'questions')}</h3>
              {reading.questions.map((q, i) => {
                const revealed = revealedAnswers.has(i);
                return (
                  <div key={i} className="dr-qa">
                    <div className="dr-qa-q">
                      {i + 1}. {language === 'en' ? q.questionEn : q.questionFr}
                    </div>
                    <div
                      className={`dr-qa-a ${revealed ? '' : 'is-hidden'}`}
                      onClick={() => toggleAnswer(i)}
                      title={revealed ? '' : t(language, 'revealAnswer')}
                    >
                      {language === 'en' ? q.answerEn : q.answerFr}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Vue liste
  // -------------------------------------------------------------------------
  return (
    <div className="reading-v2">
      <div className="dr-header">
        {onBack && (
          <button type="button" className="dr-btn dr-btn--link" onClick={onBack}>
            {t(language, 'back')}
          </button>
        )}
        <h1>{t(language, 'title')}</h1>
        <p>{t(language, 'subtitle')}</p>
      </div>

      <div className="dr-filters" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={levelFilter === 'all'}
          className={`dr-filter ${levelFilter === 'all' ? 'dr-filter--active' : ''}`}
          onClick={() => setLevelFilter('all')}
        >
          {t(language, 'filterAll')}
        </button>
        {availableLevels.map((lv) => (
          <button
            key={lv}
            type="button"
            role="tab"
            aria-selected={levelFilter === lv}
            className={`dr-filter ${levelFilter === lv ? 'dr-filter--active' : ''}`}
            onClick={() => setLevelFilter(lv)}
          >
            {LEVEL_LABEL[lv]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="dr-empty">{t(language, 'empty')}</div>
      ) : (
        <div className="dr-list">
          {filtered.map((entry) => {
            const title = language === 'en' ? entry.reading.titleEn : entry.reading.title;
            const intro = language === 'en' ? entry.reading.introEn : entry.reading.intro;
            return (
              <button
                key={entry.reading.id}
                type="button"
                className="dr-list-item"
                onClick={() => setSelectedId(entry.reading.id)}
              >
                <div className="dr-list-level">{LEVEL_LABEL[entry.cecrLevel]}</div>
                <div className="dr-list-theme">{language === 'en' ? entry.themeEn : entry.theme}</div>
                <div className="dr-list-title">{title}</div>
                <div className="dr-list-excerpt">{intro}</div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReadingPageV2;
