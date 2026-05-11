/**
 * GrammarPageV3.tsx — Catalogue de grammaire chinoise (style Lecture/Seonsaengnim)
 * ---------------------------------------------------------------------------------
 * Surface l'ensemble des `grammarLessons` (38 points + ajouts) sous forme
 * de catalogue façon Lecture/Dialogue :
 *
 *   - Header tuile 📐 + titre + sous-titre
 *   - Tabs niveaux CECR (Tous / A1 / A2 / B1 / B2 / C1 / C2) avec mapping
 *     HSK→CECR
 *   - Cartes : badge niveau, emoji thématique, hanzi structural en grand,
 *     traduction FR/EN, stats (exemples · quiz)
 *   - Vue détail "lean" :
 *     - Kicker niveau · catégorie
 *     - Hanzi en grand + traduction
 *     - Bloc Audio (TTS pré-généré) si fourni
 *     - Sections : 🎯 Quand · 🧩 Comment · 💡 Astuces · ⚠️ Pièges ·
 *       📚 Exemples · ❓ Mini-quiz · 🔗 Voir aussi
 *
 * Les explications utilisent le markdown léger des données existantes
 * (`whenToUse`, `howToUse`, `commonMistakes`, `tips`). On rend les sauts
 * de ligne (\n) et les puces (•) tels quels via white-space: pre-wrap.
 *
 * Le mini-quiz par leçon reprend le composant partagé ComprehensionQuiz
 * (lecture/dialogue) pour rester homogène : +50 XP la première fois.
 *
 * Styles : reuse de reading-v2.css (wrapper `.reading-v2 .grammar-v3`)
 *          + grammar-v3.css pour les overrides spécifiques.
 */

import { useMemo, useState } from 'react';
import '../styles/reading-v2.css';
import '../styles/grammar-v3.css';
import { grammarLessons } from '../data/grammar-lessons';
import type { LessonItem } from '../types';
import { playHanziAudio } from '../utils/audio';
import ComprehensionQuiz from '../components/reading/ComprehensionQuiz';

/**
 * playGrammarAudio — Lecture audio pour la grammaire avec fallback Web Speech.
 *
 * Ordre de priorité :
 *   1. MP3 pré-généré (via playHanziAudio) — fonctionne pour les hanzi
 *      simples (也, 都, 不) qui existent dans audio/hsk1/*.wav.
 *   2. Web Speech API (zh-CN) — couvre les structures composées
 *      (不仅...而且, 由于...因此) et les phrases d'exemples, pour
 *      lesquelles aucun MP3 n'est pré-généré.
 *
 * Le fallback Web Speech est ASSUMÉ ici (alors qu'il est interdit ailleurs
 * dans l'app) : pour la grammaire, la couverture exhaustive en MP3 n'est
 * pas réaliste (chaque exemple = une phrase unique). Le compromis : pas
 * d'audio premium pour la grammaire, mais TOUT est jouable.
 */
const playGrammarAudio = async (
  hanzi: string,
  explicitUrl?: string | null
): Promise<void> => {
  try {
    await playHanziAudio(hanzi, explicitUrl ?? null);
    return; // MP3 trouvé et lecture lancée → on s'arrête là.
  } catch {
    // Aucun MP3 → fallback Web Speech.
  }
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(hanzi);
    utter.lang = 'zh-CN';
    utter.rate = 0.92;
    utter.pitch = 1;
    window.speechSynthesis.speak(utter);
  } catch {
    /* navigateur sans TTS — abandon silencieux */
  }
};
import type { ReadingComprehensionQuestion } from '../types/lesson-structure';

export type GrammarPageV3Language = 'fr' | 'en';

export interface GrammarPageV3Props {
  language?: GrammarPageV3Language;
  onBack?: () => void;
  initialLessonId?: string;
  onAwardXp?: (xp: number) => void;
}

// ---------------------------------------------------------------------------
// Copies
// ---------------------------------------------------------------------------

const COPY = {
  fr: {
    title: 'Grammaire',
    subtitle:
      'Chaque point de grammaire expliqué : quand, comment, astuces, pièges. Mini-quiz inclus.',
    back: '← Retour',
    backList: '← Retour à la grammaire',
    filterAll: 'Tous',
    when: 'Quand l\'utiliser',
    how: 'Comment',
    tips: 'Astuces',
    mistakes: 'Pièges à éviter',
    examples: 'Exemples',
    quiz: 'Quiz éclair',
    related: 'Voir aussi',
    examplesLabel: (n: number) =>
      `${n} exemple${n > 1 ? 's' : ''}`,
    empty: 'Aucune leçon de grammaire pour ce niveau.',
    listenWord: 'Écouter'
  },
  en: {
    title: 'Grammar',
    subtitle:
      'Every grammar point explained: when, how, tips, pitfalls. Mini-quiz included.',
    back: '← Back',
    backList: '← Back to grammar',
    filterAll: 'All',
    when: 'When to use',
    how: 'How',
    tips: 'Tips',
    mistakes: 'Common mistakes',
    examples: 'Examples',
    quiz: 'Quick quiz',
    related: 'Related',
    examplesLabel: (n: number) =>
      `${n} example${n > 1 ? 's' : ''}`,
    empty: 'No grammar lesson for this level.',
    listenWord: 'Listen'
  }
} as const;

type CopyKey = Exclude<keyof (typeof COPY)['fr'], 'examplesLabel'>;
const t = (lang: GrammarPageV3Language, k: CopyKey): string =>
  COPY[lang][k] ?? COPY.fr[k];

// ---------------------------------------------------------------------------
// HSK → CECR mapping
// ---------------------------------------------------------------------------

type CecrSlot = 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2';

const HSK_TO_CECR: Record<string, CecrSlot> = {
  hsk1: 'a1',
  hsk2: 'a2',
  hsk3: 'b1',
  hsk4: 'b2',
  hsk5: 'c1',
  hsk6: 'c2',
  hsk7: 'c2'
};

const LEVEL_ORDER: CecrSlot[] = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
const LEVEL_LABEL: Record<CecrSlot, string> = {
  a1: 'A1', a2: 'A2',
  b1: 'B1', b2: 'B2',
  c1: 'C1', c2: 'C2'
};
const LEVEL_BLOCK = (slot: CecrSlot): 'a' | 'b' | 'c' =>
  slot.startsWith('a') ? 'a' : slot.startsWith('b') ? 'b' : 'c';

const cecrOf = (lesson: LessonItem): CecrSlot =>
  HSK_TO_CECR[String(lesson.level)] ?? 'a1';

// ---------------------------------------------------------------------------
// Emoji par catégorie / id
// ---------------------------------------------------------------------------

const ID_EMOJI_PREFIX: Array<[RegExp, string]> = [
  [/-negation-/, '🚫'],
  [/-aspect-|-progressive|-zhe-durative|-guo-experiential/, '⏳'],
  [/-question-|-ma$/, '❓'],
  [/-comparison|-bi$/, '⚖️'],
  [/-measure-words/, '📏'],
  [/-possession|-de$/, '🔗'],
  [/-time-|-duration/, '⏰'],
  [/-location|-zai/, '📍'],
  [/-subject-verb/, '🧱'],
  [/-conjunction|-yinwei|-suoyi|-budan|-erqie|-jinguan|-although/, '🔀'],
  [/-modal|-hui/, '💪'],
  [/-resultative/, '🎯'],
  [/-ba-disposal|-bei-passive/, '🔄'],
  [/-lian-dou|-chule|-yiwai/, '➕'],
  [/-jiu-cai|-yi-jiu/, '➡️'],
  [/-rang|-causative/, '👉'],
  [/-yue-yue/, '📈'],
  [/-faner|-jingran|-dao-contrary|-buguo|-surprise/, '😲'],
  [/-wulun|-yaoshi|-dehua/, '🌀'],
  [/-luxu|-zhujian|-successively|-gradually/, '🐢'],
  [/-adjectives|-hen/, '🌟']
];

const iconForLesson = (lesson: LessonItem): string => {
  for (const [re, emoji] of ID_EMOJI_PREFIX) {
    if (re.test(lesson.id)) return emoji;
  }
  return '📐';
};

// ---------------------------------------------------------------------------
// Rendu markdown léger : conserve les \n et puces, met les hanzi en évidence
// quand placés en début de ligne (•) ou dans une ligne « ❌ / ✅ ».
// ---------------------------------------------------------------------------

const Multiline = ({ text }: { text: string }) => (
  <div className="gr3-multiline">{text}</div>
);

// ---------------------------------------------------------------------------
// Conversion grammarQuiz → ReadingComprehensionQuestion (pour ComprehensionQuiz)
// ---------------------------------------------------------------------------

function lessonToQuestions(
  lesson: LessonItem,
  language: GrammarPageV3Language
): ReadingComprehensionQuestion[] {
  const out: ReadingComprehensionQuestion[] = [];

  // Source 1 : `grammarQuiz` (champ structuré, type discriminé). On gère
  // particle-choice et fill-blank — qui ont tous les deux choices + correctChoice.
  const gq = lesson.grammarQuiz;
  if (gq && (gq.type === 'particle-choice' || gq.type === 'fill-blank')) {
    const correctIdx = gq.choices.indexOf(gq.correctChoice);
    const tr =
      language === 'en'
        ? gq.translationEn ?? gq.translation
        : gq.translation;
    let sentence: string;
    if (gq.type === 'particle-choice') {
      sentence = `${gq.sentenceBefore ?? ''}＿＿${gq.sentenceAfter ?? ''}`.trim();
    } else {
      // fill-blank a déjà ___ dans `sentence`
      sentence = gq.sentence.replace(/_{2,}|＿+/g, '＿＿');
    }
    out.push({
      questionFr: `Complète : « ${sentence} » — ${tr ?? ''}`,
      questionEn: `Fill in: "${sentence}" — ${tr ?? ''}`,
      answerFr: gq.correctChoice,
      answerEn: gq.correctChoice,
      choices: gq.choices.map((c: string) => ({ labelFr: c, labelEn: c })),
      answerIndex: correctIdx >= 0 ? correctIdx : 0,
      explanationFr: gq.explanation ?? '',
      explanationEn: gq.explanation ?? ''
    });
  }

  // Source 2 : `quiz` classique (prompt + choices + correctChoiceIndex).
  const q = lesson.quiz;
  if (q && Array.isArray((q as { choices?: unknown[] }).choices)) {
    const choices = (q as { choices: string[] }).choices;
    const idx = (q as { correctChoiceIndex: number }).correctChoiceIndex ?? 0;
    out.push({
      questionFr: (q as { prompt: string }).prompt,
      questionEn: (q as { prompt: string }).prompt,
      answerFr: choices[idx] ?? '',
      answerEn: choices[idx] ?? '',
      choices: choices.map((c) => ({ labelFr: c, labelEn: c })),
      answerIndex: idx,
      explanationFr: lesson.explanation ?? '',
      explanationEn: lesson.explanation ?? ''
    });
  }

  return out;
}

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------

const GrammarPageV3 = (props: GrammarPageV3Props) => {
  const { language = 'fr', onBack, initialLessonId, onAwardXp } = props;

  const lessons = grammarLessons;

  const availableLevels = useMemo(() => {
    const present = new Set(lessons.map((l) => cecrOf(l)));
    return LEVEL_ORDER.filter((lv) => present.has(lv));
  }, [lessons]);

  const countByLevel = useMemo(() => {
    const counts: Partial<Record<CecrSlot, number>> = {};
    for (const l of lessons) {
      const slot = cecrOf(l);
      counts[slot] = (counts[slot] ?? 0) + 1;
    }
    return counts;
  }, [lessons]);

  const [levelFilter, setLevelFilter] = useState<CecrSlot | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(initialLessonId ?? null);

  const filtered = useMemo(() => {
    if (levelFilter === 'all') return lessons;
    return lessons.filter((l) => cecrOf(l) === levelFilter);
  }, [lessons, levelFilter]);

  const groupsAll = useMemo(
    () =>
      availableLevels
        .map((lv) => ({
          level: lv,
          items: lessons.filter((l) => cecrOf(l) === lv)
        }))
        .filter((g) => g.items.length > 0),
    [availableLevels, lessons]
  );

  const selected = useMemo(
    () => lessons.find((l) => l.id === selectedId) ?? null,
    [lessons, selectedId]
  );

  const renderCard = (lesson: LessonItem) => {
    const slot = cecrOf(lesson);
    const block = LEVEL_BLOCK(slot);
    const tr =
      language === 'en'
        ? lesson.translation || lesson.translationFr
        : lesson.translationFr || lesson.translation;
    const exCount = lesson.examples?.length ?? 0;
    const hasQuiz = !!(lesson.grammarQuiz || lesson.quiz);
    return (
      <button
        key={lesson.id}
        type="button"
        className={`rv2-card rv2-card--${block} gr3-card`}
        onClick={() => setSelectedId(lesson.id)}
      >
        <div className="rv2-card-top">
          <span className="rv2-card-emoji-tile" aria-hidden>
            {iconForLesson(lesson)}
          </span>
          <span className="rv2-card-level">{LEVEL_LABEL[slot]}</span>
        </div>
        <p className="rv2-card-theme">{lesson.category}</p>
        <h3 className="gr3-card-hanzi" lang="zh-Hans">{lesson.hanzi}</h3>
        <p className="gr3-card-pinyin">{lesson.pinyin}</p>
        <p className="rv2-card-title-translation">{tr}</p>
        <div className="rv2-card-foot">
          {exCount > 0 && (
            <span className="rv2-card-stat">
              <span className="rv2-card-stat-icon" aria-hidden>📚</span>
              {COPY[language].examplesLabel(exCount)}
            </span>
          )}
          {hasQuiz && (
            <span className="rv2-card-stat">
              <span className="rv2-card-stat-icon" aria-hidden>❓</span>
              Quiz
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
    return (
      <GrammarDetail
        key={selected.id}
        lesson={selected}
        language={language}
        onBack={() => setSelectedId(null)}
        onNavigate={(id) => setSelectedId(id)}
        onAwardXp={onAwardXp}
      />
    );
  }

  // -------------------------------------------------------------------------
  // VUE LISTE (catalogue)
  // -------------------------------------------------------------------------
  const totalCount = lessons.length;

  return (
    <div className="reading-v2 grammar-v3">
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
        <div className="rv2-catalog-icon" aria-hidden>📐</div>
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
            const block = LEVEL_BLOCK(group.level);
            return (
              <section
                key={group.level}
                className={`rv2-section rv2-card--${block}`}
              >
                <h2 className="rv2-section-title">
                  <span className="rv2-section-title-badge">
                    {LEVEL_LABEL[group.level]}
                  </span>
                  <span className="rv2-section-title-count">
                    {group.items.length}
                  </span>
                </h2>
                <div className="rv2-grid">
                  {group.items.map((l) => renderCard(l))}
                </div>
              </section>
            );
          })}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rv2-empty">{t(language, 'empty')}</div>
      ) : (
        <div className="rv2-grid">{filtered.map((l) => renderCard(l))}</div>
      )}
    </div>
  );
};

// ===========================================================================
//  GrammarDetail — vue détail riche
// ===========================================================================

interface GrammarDetailProps {
  lesson: LessonItem;
  language: GrammarPageV3Language;
  onBack: () => void;
  onNavigate: (id: string) => void;
  onAwardXp?: (xp: number) => void;
}

const GrammarDetail = ({
  lesson,
  language,
  onBack,
  onNavigate,
  onAwardXp
}: GrammarDetailProps) => {
  const slot = cecrOf(lesson);
  const block = LEVEL_BLOCK(slot);
  const tr =
    language === 'en'
      ? lesson.translation || lesson.translationFr
      : lesson.translationFr || lesson.translation;

  const g = lesson.grammarExplanation;
  const whenText = g
    ? language === 'en'
      ? g.whenToUseEn
      : g.whenToUse
    : '';
  const howText = g
    ? language === 'en'
      ? g.howToUseEn
      : g.howToUse
    : '';
  const tipsText = g
    ? language === 'en'
      ? g.tipsEn
      : g.tips
    : '';
  const mistakesText = g
    ? language === 'en'
      ? g.commonMistakesEn
      : g.commonMistakes
    : '';

  const quizQuestions = useMemo(
    () => lessonToQuestions(lesson, language),
    [lesson, language]
  );

  // Related lessons (resolve IDs → titles).
  const relatedLessons: LessonItem[] = useMemo(() => {
    const ids = g?.relatedGrammar ?? [];
    return ids
      .map((id) => grammarLessons.find((l) => l.id === id))
      .filter((l): l is LessonItem => !!l);
  }, [g]);

  return (
    <div className="reading-v2 grammar-v3">
      <div className="rv2-detail">
        <button
          type="button"
          className="rv2-btn rv2-btn--link rv2-detail-back"
          onClick={onBack}
        >
          {t(language, 'backList')}
        </button>

        {/* Hero lean */}
        <div className={`rv2-detail-hero rv2-detail-hero--${block} rv2-detail-hero--lean`}>
          <div className="rv2-detail-kicker">
            <span className="rv2-detail-kicker-level">{LEVEL_LABEL[slot]}</span>
            <span className="rv2-detail-kicker-dot" aria-hidden>·</span>
            <span className="rv2-detail-kicker-theme">
              {lesson.category.toUpperCase()}
            </span>
          </div>
          <h1 className="rv2-detail-title-zh" lang="zh-Hans">{lesson.hanzi}</h1>
          <p className="gr3-detail-pinyin">{lesson.pinyin}</p>
          <p className="rv2-detail-title-translation">{tr}</p>
          <div className="gr3-detail-actions">
            <button
              type="button"
              className="gr3-listen"
              onClick={() => {
                playGrammarAudio(lesson.hanzi, lesson.audio);
              }}
            >
              🔊 {t(language, 'listenWord')}
            </button>
          </div>
        </div>

        {/* Sections explicatives */}
        {whenText && (
          <div className="gr3-block gr3-block--when">
            <h3 className="gr3-block-title">🎯 {t(language, 'when')}</h3>
            <Multiline text={whenText} />
          </div>
        )}

        {howText && (
          <div className="gr3-block gr3-block--how">
            <h3 className="gr3-block-title">🧩 {t(language, 'how')}</h3>
            <Multiline text={howText} />
          </div>
        )}

        {tipsText && (
          <div className="gr3-block gr3-block--tips">
            <h3 className="gr3-block-title">💡 {t(language, 'tips')}</h3>
            <Multiline text={tipsText} />
          </div>
        )}

        {mistakesText && (
          <div className="gr3-block gr3-block--mistakes">
            <h3 className="gr3-block-title">⚠️ {t(language, 'mistakes')}</h3>
            <Multiline text={mistakesText} />
          </div>
        )}

        {/* Exemples */}
        {lesson.examples && lesson.examples.length > 0 && (
          <div className="gr3-block">
            <h3 className="gr3-block-title">📚 {t(language, 'examples')}</h3>
            <div className="gr3-examples">
              {lesson.examples.map((ex, i) => {
                const tr =
                  language === 'en'
                    ? ex.translation || ex.translationFr || ''
                    : ex.translationFr || ex.translation || '';
                return (
                  <div key={i} className="gr3-example">
                    <div className="gr3-example-num">{i + 1}</div>
                    <div className="gr3-example-body">
                      <div className="gr3-example-row">
                        <button
                          type="button"
                          className="gr3-example-play"
                          aria-label="play"
                          title={t(language, 'listenWord')}
                          onClick={() => {
                            playGrammarAudio(ex.hanzi, ex.audio);
                          }}
                        >
                          🔊
                        </button>
                        <span className="gr3-example-hanzi" lang="zh-Hans">
                          {ex.hanzi}
                        </span>
                      </div>
                      {ex.pinyin && (
                        <div className="gr3-example-pinyin">{ex.pinyin}</div>
                      )}
                      {tr && <div className="gr3-example-translation">{tr}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Mini-quiz */}
        {quizQuestions.length > 0 && (
          <ComprehensionQuiz
            questions={quizQuestions}
            entityId={lesson.id}
            language={language}
            xpStoreKey="xl_grammar_quiz_xp_v1"
            onAwardXp={onAwardXp}
          />
        )}

        {/* Related */}
        {relatedLessons.length > 0 && (
          <div className="gr3-block gr3-block--related">
            <h3 className="gr3-block-title">🔗 {t(language, 'related')}</h3>
            <div className="gr3-related-list">
              {relatedLessons.map((r) => {
                const rTr =
                  language === 'en'
                    ? r.translation || r.translationFr
                    : r.translationFr || r.translation;
                return (
                  <button
                    key={r.id}
                    type="button"
                    className="gr3-related-card"
                    onClick={() => onNavigate(r.id)}
                  >
                    <span className="gr3-related-hanzi" lang="zh-Hans">
                      {r.hanzi}
                    </span>
                    <span className="gr3-related-tr">{rTr}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrammarPageV3;
