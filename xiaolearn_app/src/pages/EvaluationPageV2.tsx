/**
 * EvaluationPageV2.tsx — Mock HSK / évaluations XiaoLearn
 * --------------------------------------------------------
 * Formule Seonsaengnim adaptée au chinois :
 *
 *   1. Landing  — présentation du test (niveau HSK, durée, sections, passing score)
 *   2. Sections — vocabulaire / grammaire / compréhension écrite / compréhension orale
 *                 (QCM linéaires, chronomètre global + barre d'avancement)
 *   3. Report   — score global + par section, correction détaillée, badge si réussi,
 *                 suggestion de parcours
 *
 * Prêt à brancher sur une banque de questions maison. Autonome — ne dépend
 * ni de `useQuizEngine` (trop simple) ni de `useLessonProgress` (trop étroit).
 *
 * Styles : ./../styles/evaluation-v2.css (scoped sous .evaluation-v2)
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '../styles/evaluation-v2.css';

// ============================================================================
//  TYPES
// ============================================================================

export type EvaluationV2Language = 'fr' | 'en';

export type EvaluationV2HskLevel =
  | 'hsk1'
  | 'hsk2'
  | 'hsk3'
  | 'hsk4'
  | 'hsk5'
  | 'hsk6'
  | 'hsk7';

export type EvaluationV2SectionKind =
  | 'vocabulary'
  | 'grammar'
  | 'reading'
  | 'listening';

export interface EvaluationV2Question {
  id: string;
  prompt: string;
  promptEn?: string;
  /** Stimulus (phrase, texte, audio-transcript) — optionnel. */
  context?: string;
  contextEn?: string;
  /** Audio pour listening. */
  audio?: string;
  choices: string[];
  correctIndex: number;
  explanation?: string;
  explanationEn?: string;
}

export interface EvaluationV2Section {
  id: string;
  kind: EvaluationV2SectionKind;
  title: string;
  titleEn?: string;
  questions: EvaluationV2Question[];
  /** Pondération dans le score global (défaut : 1). */
  weight?: number;
}

export interface EvaluationV2Config {
  id: string;
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  level: EvaluationV2HskLevel;
  /** Durée totale en secondes (chronomètre global). */
  durationSeconds: number;
  /** Pourcentage minimal pour "réussi" (défaut : 60). */
  passingPercent?: number;
  sections: EvaluationV2Section[];
  /** XP accordés en cas de réussite. */
  xpReward?: number;
}

export interface EvaluationPageV2Props {
  evaluation: EvaluationV2Config;
  language?: EvaluationV2Language;
  userDisplayName?: string;
  /** Callback à la soumission (réussi ou pas). Parent décide du badge / XP. */
  onSubmit?: (result: EvaluationV2Result) => void;
  /** Suggestion next : ex. leçon de remédiation sur la section la plus faible. */
  onOpenRemediation?: (sectionKind: EvaluationV2SectionKind) => void;
  onBack?: () => void;
  /** Audio handler (listening). */
  onPlayAudio?: (url: string) => void;
}

export interface EvaluationV2SectionResult {
  sectionId: string;
  kind: EvaluationV2SectionKind;
  correctCount: number;
  total: number;
  percent: number;
}

export interface EvaluationV2Result {
  evaluationId: string;
  overallPercent: number;
  passed: boolean;
  xpGained: number;
  sections: EvaluationV2SectionResult[];
  /** Réponses brutes par questionId. */
  answers: Record<string, number>;
  /** Durée effective passée en secondes. */
  timeSpentSeconds: number;
}

// ============================================================================
//  COPIES
// ============================================================================

const COPY = {
  fr: {
    landingSubtitle: 'Mets-toi dans les conditions du test, comme le jour J.',
    duration: 'Durée',
    minutes: 'min',
    sections: 'Sections',
    passing: 'Note pour réussir',
    totalQuestions: 'questions au total',
    start: 'Commencer le test',
    back: '← Retour',
    submit: 'Terminer le test',
    next: 'Suivante →',
    previous: '← Précédente',
    timeLeft: 'Temps restant',
    sectionIntro: 'Section',
    questionOf: 'Question',
    of: 'sur',
    congrats: 'Bravo, test validé 🎉',
    partial: 'Test non validé',
    overallScore: 'Score global',
    bySection: 'Score par section',
    xpGained: 'XP gagnés',
    review: 'Voir la correction',
    hideReview: 'Masquer la correction',
    next_: 'Suivant',
    retake: 'Repasser',
    remediation: 'Renforcer cette section',
    section_vocabulary: 'Vocabulaire',
    section_grammar: 'Grammaire',
    section_reading: 'Compréhension écrite',
    section_listening: 'Compréhension orale',
    yourAnswer: 'Ta réponse :',
    correctAnswer: 'Bonne réponse :',
    pauseWarn: 'Le chrono continue en arrière-plan.',
    confirmSubmitTitle: 'Terminer le test ?',
    confirmSubmitBody: 'Tu ne pourras plus modifier tes réponses.',
    cancel: 'Annuler',
    confirm: 'Terminer'
  },
  en: {
    landingSubtitle: 'Simulate real test conditions.',
    duration: 'Duration',
    minutes: 'min',
    sections: 'Sections',
    passing: 'Pass mark',
    totalQuestions: 'total questions',
    start: 'Start the test',
    back: '← Back',
    submit: 'Submit',
    next: 'Next →',
    previous: '← Previous',
    timeLeft: 'Time left',
    sectionIntro: 'Section',
    questionOf: 'Question',
    of: 'of',
    congrats: 'Passed 🎉',
    partial: 'Not passed',
    overallScore: 'Overall score',
    bySection: 'Score per section',
    xpGained: 'XP earned',
    review: 'Show review',
    hideReview: 'Hide review',
    next_: 'Next',
    retake: 'Retake',
    remediation: 'Practice this section',
    section_vocabulary: 'Vocabulary',
    section_grammar: 'Grammar',
    section_reading: 'Reading',
    section_listening: 'Listening',
    yourAnswer: 'Your answer:',
    correctAnswer: 'Correct:',
    pauseWarn: 'Timer keeps running.',
    confirmSubmitTitle: 'Submit test?',
    confirmSubmitBody: 'You will not be able to change your answers.',
    cancel: 'Cancel',
    confirm: 'Submit'
  }
} as const;

type CopyKey = keyof (typeof COPY)['fr'];
const t = (lang: EvaluationV2Language, k: CopyKey) => COPY[lang][k] ?? COPY.fr[k];

const sectionLabel = (lang: EvaluationV2Language, kind: EvaluationV2SectionKind): string =>
  t(
    lang,
    (kind === 'vocabulary'
      ? 'section_vocabulary'
      : kind === 'grammar'
      ? 'section_grammar'
      : kind === 'reading'
      ? 'section_reading'
      : 'section_listening') as CopyKey
  );

// ============================================================================
//  HELPERS
// ============================================================================

const formatTime = (s: number): string => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
};

/** Flatten [ {section, questions:[q1,q2]}, ... ] en liste indexée. */
type FlatEntry = { sectionIndex: number; questionIndex: number };

const flattenQuestions = (sections: EvaluationV2Section[]): FlatEntry[] => {
  const out: FlatEntry[] = [];
  sections.forEach((section, sIdx) => {
    section.questions.forEach((_, qIdx) => {
      out.push({ sectionIndex: sIdx, questionIndex: qIdx });
    });
  });
  return out;
};

const computeResult = (
  evalCfg: EvaluationV2Config,
  answers: Record<string, number>,
  timeSpentSeconds: number
): EvaluationV2Result => {
  const sections: EvaluationV2SectionResult[] = evalCfg.sections.map((section) => {
    const total = section.questions.length;
    let correct = 0;
    for (const q of section.questions) {
      if (answers[q.id] === q.correctIndex) correct++;
    }
    return {
      sectionId: section.id,
      kind: section.kind,
      correctCount: correct,
      total,
      percent: total === 0 ? 0 : Math.round((correct / total) * 100)
    };
  });

  // Moyenne pondérée
  const weightSum = evalCfg.sections.reduce((acc, s) => acc + (s.weight ?? 1), 0);
  const weightedPct = evalCfg.sections.reduce((acc, s, i) => {
    const w = s.weight ?? 1;
    return acc + (sections[i]?.percent ?? 0) * w;
  }, 0);
  const overall = weightSum === 0 ? 0 : Math.round(weightedPct / weightSum);
  const passing = evalCfg.passingPercent ?? 60;
  const passed = overall >= passing;
  return {
    evaluationId: evalCfg.id,
    overallPercent: overall,
    passed,
    xpGained: passed ? evalCfg.xpReward ?? 100 : 0,
    sections,
    answers,
    timeSpentSeconds
  };
};

// ============================================================================
//  PHASES
// ============================================================================

type Phase = 'landing' | 'running' | 'submitted';

// ============================================================================
//  COMPOSANT PRINCIPAL
// ============================================================================

const EvaluationPageV2 = (props: EvaluationPageV2Props) => {
  const { evaluation, language = 'fr', userDisplayName, onSubmit, onOpenRemediation, onBack, onPlayAudio } = props;

  const flat = useMemo(() => flattenQuestions(evaluation.sections), [evaluation.sections]);
  const totalQuestions = flat.length;
  const passing = evaluation.passingPercent ?? 60;

  const [phase, setPhase] = useState<Phase>('landing');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [pointer, setPointer] = useState(0);
  const [timeLeft, setTimeLeft] = useState(evaluation.durationSeconds);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [result, setResult] = useState<EvaluationV2Result | null>(null);

  const startedAtRef = useRef<number | null>(null);

  // --- Chrono
  useEffect(() => {
    if (phase !== 'running') return;
    const iv = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(iv);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(iv);
  }, [phase]);

  // --- Auto-submit quand timer atteint 0
  useEffect(() => {
    if (phase === 'running' && timeLeft === 0) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase]);

  const currentEntry = flat[pointer];
  const currentSection = currentEntry ? evaluation.sections[currentEntry.sectionIndex] : null;
  const currentQuestion =
    currentEntry && currentSection ? currentSection.questions[currentEntry.questionIndex] : null;

  const setAnswer = useCallback((questionId: string, choiceIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));
  }, []);

  const start = () => {
    setAnswers({});
    setPointer(0);
    setTimeLeft(evaluation.durationSeconds);
    setPhase('running');
    startedAtRef.current = Date.now();
  };

  const handleSubmit = useCallback(() => {
    const timeSpent = startedAtRef.current
      ? Math.round((Date.now() - startedAtRef.current) / 1000)
      : evaluation.durationSeconds - timeLeft;
    const r = computeResult(evaluation, answers, timeSpent);
    setResult(r);
    setPhase('submitted');
    setShowConfirm(false);
    onSubmit?.(r);
  }, [evaluation, answers, timeLeft, onSubmit]);

  const goPrev = () => setPointer((p) => Math.max(0, p - 1));
  const goNext = () => setPointer((p) => Math.min(totalQuestions - 1, p + 1));

  // --------------------------------------------------------------------------
  //  RENDU — LANDING
  // --------------------------------------------------------------------------

  const renderLanding = () => (
    <div className="ev2-landing">
      {onBack && (
        <button className="ev2-btn ev2-btn--link" onClick={onBack}>
          {t(language, 'back')}
        </button>
      )}
      <div className="ev2-landing-badge">{evaluation.level.toUpperCase()}</div>
      <h1 className="ev2-landing-title">
        {language === 'en' && evaluation.titleEn ? evaluation.titleEn : evaluation.title}
      </h1>
      <p className="ev2-landing-subtitle">
        {language === 'en' && evaluation.subtitleEn
          ? evaluation.subtitleEn
          : evaluation.subtitle ?? t(language, 'landingSubtitle')}
      </p>

      <div className="ev2-landing-facts">
        <div className="ev2-fact">
          <div className="ev2-fact-value">{Math.round(evaluation.durationSeconds / 60)}</div>
          <div className="ev2-fact-label">
            {t(language, 'duration')} ({t(language, 'minutes')})
          </div>
        </div>
        <div className="ev2-fact">
          <div className="ev2-fact-value">{evaluation.sections.length}</div>
          <div className="ev2-fact-label">{t(language, 'sections')}</div>
        </div>
        <div className="ev2-fact">
          <div className="ev2-fact-value">{totalQuestions}</div>
          <div className="ev2-fact-label">{t(language, 'totalQuestions')}</div>
        </div>
        <div className="ev2-fact">
          <div className="ev2-fact-value">{passing}%</div>
          <div className="ev2-fact-label">{t(language, 'passing')}</div>
        </div>
      </div>

      <div className="ev2-sections-preview">
        {evaluation.sections.map((s) => (
          <div key={s.id} className="ev2-section-preview">
            <div className="ev2-section-preview-icon" aria-hidden>
              {s.kind === 'vocabulary'
                ? '📖'
                : s.kind === 'grammar'
                ? '🧩'
                : s.kind === 'reading'
                ? '📜'
                : '🎧'}
            </div>
            <div>
              <div className="ev2-section-preview-title">
                {language === 'en' && s.titleEn ? s.titleEn : s.title}
              </div>
              <div className="ev2-section-preview-meta">
                {s.questions.length} × {sectionLabel(language, s.kind)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="ev2-btn ev2-btn--primary ev2-btn--lg" onClick={start}>
        {t(language, 'start')} →
      </button>
    </div>
  );

  // --------------------------------------------------------------------------
  //  RENDU — RUNNING
  // --------------------------------------------------------------------------

  const renderRunning = () => {
    if (!currentQuestion || !currentSection || !currentEntry) return null;
    const answeredCount = Object.keys(answers).length;
    const progressPct = ((pointer + 1) / totalQuestions) * 100;
    const selected = answers[currentQuestion.id];
    const prompt =
      language === 'en' && currentQuestion.promptEn ? currentQuestion.promptEn : currentQuestion.prompt;
    const context =
      language === 'en' && currentQuestion.contextEn ? currentQuestion.contextEn : currentQuestion.context;
    const sectionTitle =
      language === 'en' && currentSection.titleEn ? currentSection.titleEn : currentSection.title;
    const lowTime = timeLeft <= 60;

    return (
      <div className="ev2-running">
        {/* Topbar : chrono + progress + soumettre */}
        <div className="ev2-topbar">
          <div className={`ev2-timer ${lowTime ? 'ev2-timer--low' : ''}`}>
            ⏱ {formatTime(timeLeft)}
          </div>
          <div className="ev2-progress">
            <div className="ev2-progress-track">
              <div className="ev2-progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="ev2-progress-label">
              {pointer + 1} / {totalQuestions} · {answeredCount} répondu(s)
            </div>
          </div>
          <button className="ev2-btn ev2-btn--ghost" onClick={() => setShowConfirm(true)}>
            {t(language, 'submit')}
          </button>
        </div>

        {/* Section heading */}
        <div className="ev2-section-heading">
          <span className="ev2-section-heading-kind">
            {t(language, 'sectionIntro')} · {sectionLabel(language, currentSection.kind)}
          </span>
          <h2>{sectionTitle}</h2>
        </div>

        {/* Question */}
        <div className="ev2-question">
          <div className="ev2-question-index">
            {t(language, 'questionOf')} {currentEntry.questionIndex + 1} {t(language, 'of')}{' '}
            {currentSection.questions.length}
          </div>
          <div className="ev2-question-prompt">{prompt}</div>
          {context && (
            <div className="ev2-question-context">
              {currentQuestion.audio && onPlayAudio && (
                <button
                  className="ev2-question-audio"
                  onClick={() => onPlayAudio(currentQuestion.audio as string)}
                  aria-label="Play audio"
                  type="button"
                >
                  🔊
                </button>
              )}
              <span>{context}</span>
            </div>
          )}
          {!context && currentQuestion.audio && onPlayAudio && (
            <button
              className="ev2-btn ev2-btn--ghost ev2-btn--audio"
              onClick={() => onPlayAudio(currentQuestion.audio as string)}
              type="button"
            >
              🔊 Play audio
            </button>
          )}

          <div className="ev2-choices">
            {currentQuestion.choices.map((choice, idx) => (
              <button
                key={idx}
                type="button"
                className={`ev2-choice ${selected === idx ? 'ev2-choice--selected' : ''}`}
                onClick={() => setAnswer(currentQuestion.id, idx)}
              >
                <span className="ev2-choice-letter">{String.fromCharCode(65 + idx)}</span>
                <span>{choice}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div className="ev2-nav">
          <button className="ev2-btn ev2-btn--ghost" onClick={goPrev} disabled={pointer === 0}>
            {t(language, 'previous')}
          </button>
          {pointer === totalQuestions - 1 ? (
            <button className="ev2-btn ev2-btn--primary" onClick={() => setShowConfirm(true)}>
              {t(language, 'submit')}
            </button>
          ) : (
            <button className="ev2-btn ev2-btn--primary" onClick={goNext}>
              {t(language, 'next')}
            </button>
          )}
        </div>

        {/* Question palette (navigation rapide) */}
        <div className="ev2-palette" aria-label="Questions">
          {flat.map((entry, idx) => {
            const q = evaluation.sections[entry.sectionIndex].questions[entry.questionIndex];
            const answered = answers[q.id] !== undefined;
            return (
              <button
                key={q.id}
                className={`ev2-palette-cell ${answered ? 'is-answered' : ''} ${
                  idx === pointer ? 'is-current' : ''
                }`}
                onClick={() => setPointer(idx)}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Confirm modal */}
        {showConfirm && (
          <div className="ev2-modal-backdrop" onClick={() => setShowConfirm(false)}>
            <div className="ev2-modal" onClick={(e) => e.stopPropagation()}>
              <h3>{t(language, 'confirmSubmitTitle')}</h3>
              <p>{t(language, 'confirmSubmitBody')}</p>
              <div className="ev2-modal-actions">
                <button className="ev2-btn ev2-btn--ghost" onClick={() => setShowConfirm(false)}>
                  {t(language, 'cancel')}
                </button>
                <button className="ev2-btn ev2-btn--primary" onClick={handleSubmit}>
                  {t(language, 'confirm')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // --------------------------------------------------------------------------
  //  RENDU — SUBMITTED (report)
  // --------------------------------------------------------------------------

  const renderSubmitted = () => {
    if (!result) return null;
    const greeting = userDisplayName ? `, ${userDisplayName}` : '';
    const weakest = [...result.sections].sort((a, b) => a.percent - b.percent)[0];

    return (
      <div className="ev2-report">
        <div className={`ev2-report-hero ${result.passed ? 'is-passed' : 'is-not-passed'}`}>
          <div className="ev2-report-badge">
            {result.passed ? '✓' : '•'} {evaluation.level.toUpperCase()}
          </div>
          <h2>
            {result.passed ? t(language, 'congrats') : t(language, 'partial')}
            {greeting}
          </h2>
          <div className="ev2-report-overall">
            <div className="ev2-report-overall-value">{result.overallPercent}%</div>
            <div className="ev2-report-overall-label">
              {t(language, 'overallScore')} (passing {passing}%)
            </div>
          </div>
          {result.xpGained > 0 && (
            <div className="ev2-report-xp">
              +{result.xpGained} {t(language, 'xpGained')}
            </div>
          )}
        </div>

        <div className="ev2-report-sections">
          <h3>{t(language, 'bySection')}</h3>
          {result.sections.map((s) => (
            <div key={s.sectionId} className="ev2-report-section">
              <div className="ev2-report-section-main">
                <div className="ev2-report-section-title">
                  {sectionLabel(language, s.kind)}
                </div>
                <div className="ev2-report-section-track">
                  <div
                    className="ev2-report-section-fill"
                    style={{ width: `${s.percent}%` }}
                  />
                </div>
              </div>
              <div className="ev2-report-section-pct">{s.percent}%</div>
              <div className="ev2-report-section-count">
                {s.correctCount}/{s.total}
              </div>
            </div>
          ))}
        </div>

        {weakest && !result.passed && onOpenRemediation && (
          <div className="ev2-remediation">
            <div>
              <div className="ev2-remediation-label">
                Section la plus fragile : {sectionLabel(language, weakest.kind)}
              </div>
              <div className="ev2-remediation-sub">
                {weakest.percent}% · on peut consolider avant de repasser.
              </div>
            </div>
            <button
              className="ev2-btn ev2-btn--primary"
              onClick={() => onOpenRemediation(weakest.kind)}
            >
              {t(language, 'remediation')} →
            </button>
          </div>
        )}

        <div className="ev2-report-actions">
          <button
            className="ev2-btn ev2-btn--ghost"
            onClick={() => setShowReview((s) => !s)}
          >
            {showReview ? t(language, 'hideReview') : t(language, 'review')}
          </button>
          <div>
            <button
              className="ev2-btn ev2-btn--ghost"
              onClick={() => {
                setResult(null);
                setPhase('landing');
              }}
            >
              {t(language, 'retake')}
            </button>
            {onBack && (
              <button
                className="ev2-btn ev2-btn--primary"
                onClick={onBack}
                style={{ marginLeft: 8 }}
              >
                {t(language, 'back')}
              </button>
            )}
          </div>
        </div>

        {showReview && (
          <div className="ev2-review">
            {evaluation.sections.map((section) => (
              <div key={section.id} className="ev2-review-section">
                <h4>{language === 'en' && section.titleEn ? section.titleEn : section.title}</h4>
                {section.questions.map((q, idx) => {
                  const chosen = result.answers[q.id];
                  const correct = chosen === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className={`ev2-review-item ${correct ? 'is-correct' : 'is-wrong'}`}
                    >
                      <div className="ev2-review-prompt">
                        <span className="ev2-review-num">{idx + 1}.</span>{' '}
                        {language === 'en' && q.promptEn ? q.promptEn : q.prompt}
                      </div>
                      <div className="ev2-review-answers">
                        {chosen !== undefined && (
                          <div>
                            <strong>{t(language, 'yourAnswer')}</strong> {q.choices[chosen]}
                          </div>
                        )}
                        {!correct && (
                          <div>
                            <strong>{t(language, 'correctAnswer')}</strong>{' '}
                            {q.choices[q.correctIndex]}
                          </div>
                        )}
                      </div>
                      {q.explanation && (
                        <div className="ev2-review-explanation">
                          {language === 'en' && q.explanationEn ? q.explanationEn : q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="evaluation-v2">
      {phase === 'landing' && renderLanding()}
      {phase === 'running' && renderRunning()}
      {phase === 'submitted' && renderSubmitted()}
    </div>
  );
};

export default EvaluationPageV2;
