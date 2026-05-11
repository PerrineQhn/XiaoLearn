/**
 * ComprehensionQuiz.tsx — Quiz QCM partagé Lecture / Dialogue
 * -------------------------------------------------------------
 * Encapsule l'UX complète du mini-quiz « façon Seonsaengnim » :
 *   - CTA initial (« Lancer le quiz »)
 *   - Carte de question (A/B/C/D, feedback rouge/vert, explication)
 *   - Mode fallback « Afficher la réponse » si une question n'a pas
 *     de `choices`
 *   - Écran final (score + récompense XP, rejouable)
 *   - Persistance de la récompense XP dans localStorage (une seule
 *     attribution par entité — `xpStoreKey` + `entityId`)
 *
 * Réutilisé par ReadingPageV2 et DialoguePageV2 — pour mutualiser le
 * comportement et le style, et garder un seul endroit à mettre à jour
 * quand on tweake l'UX.
 *
 * Le composant porte ses propres styles via les classes `.rv2-quiz-*`
 * déjà présentes dans reading-v2.css (les deux pages partagent ce CSS).
 */

import { useCallback, useState } from 'react';
import type { ReadingComprehensionQuestion } from '../../types/lesson-structure';

type Q = ReadingComprehensionQuestion;
type Lang = 'fr' | 'en';

const COPY = {
  fr: {
    title: 'Quiz de compréhension',
    sub: 'Réponds aux questions pour valider ta lecture.',
    start: 'Lancer le quiz',
    question: 'Question',
    next: 'Suivant',
    finish: 'Terminer',
    retake: 'Refaire le quiz',
    score: 'Ton score',
    perfect: 'Bravo, tout juste !',
    partial: 'Bien joué, tu peux retenter.',
    xpGain: '+50 XP gagnés',
    xpAlready: 'XP déjà encaissés sur ce texte',
    revealAnswer: 'Afficher la réponse'
  },
  en: {
    title: 'Comprehension quiz',
    sub: 'Answer the questions to confirm your reading.',
    start: 'Start quiz',
    question: 'Question',
    next: 'Next',
    finish: 'Finish',
    retake: 'Retake quiz',
    score: 'Your score',
    perfect: 'Perfect score!',
    partial: 'Nice — try again to perfect it.',
    xpGain: '+50 XP earned',
    xpAlready: 'XP already earned for this text',
    revealAnswer: 'Reveal answer'
  }
} as const;

const fmtQuestions = (lang: Lang, n: number): string =>
  `${n} question${n > 1 ? 's' : ''}`;

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

// ---------------------------------------------------------------------------
// Persistance XP (clé séparée par type d'entité : reading / dialogue / …)
// ---------------------------------------------------------------------------
const readXpSet = (storeKey: string): Set<string> => {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(storeKey);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return new Set(parsed as string[]);
  } catch {
    /* ignore */
  }
  return new Set();
};
const persistXpSet = (storeKey: string, set: Set<string>) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(storeKey, JSON.stringify(Array.from(set)));
  } catch {
    /* ignore */
  }
};

// ---------------------------------------------------------------------------
// QuizCard — une question
// ---------------------------------------------------------------------------
interface QuizCardProps {
  question: Q;
  idx: number;
  total: number;
  score: number;
  language: Lang;
  selected: number | 'reveal' | null;
  onAnswer: (idx: number) => void;
  onReveal: () => void;
  onNext: () => void;
}

const QuizCard = ({
  question,
  idx,
  total,
  score,
  language,
  selected,
  onAnswer,
  onReveal,
  onNext
}: QuizCardProps) => {
  const labels = COPY[language];
  const qText = language === 'en' ? question.questionEn : question.questionFr;
  const aText = language === 'en' ? question.answerEn : question.answerFr;
  const explanation =
    language === 'en'
      ? question.explanationEn ?? question.answerEn
      : question.explanationFr ?? question.answerFr;
  const hasChoices = Array.isArray(question.choices) && question.choices.length > 0;
  const correctIdx = question.answerIndex ?? -1;
  const answered = selected !== null;

  return (
    <div className="rv2-quiz-card">
      <div className="rv2-quiz-card-meta">
        <span className="rv2-quiz-q-num">
          {labels.question} {idx + 1} / {total}
        </span>
        <span className="rv2-quiz-score">{score} / {total} ✓</span>
      </div>
      <h3 className="rv2-quiz-q-text">{qText}</h3>

      {hasChoices ? (
        <div className="rv2-quiz-choices">
          {question.choices!.map((c, i) => {
            const label = language === 'en' ? c.labelEn : c.labelFr;
            const isPicked = selected === i;
            const isCorrect = i === correctIdx;
            const state =
              !answered
                ? ''
                : isCorrect
                  ? 'is-correct'
                  : isPicked
                    ? 'is-wrong'
                    : 'is-muted';
            return (
              <button
                key={i}
                type="button"
                className={`rv2-quiz-choice ${state}`}
                onClick={() => onAnswer(i)}
                disabled={answered}
              >
                <span className="rv2-quiz-choice-letter">{OPTION_LETTERS[i]}</span>
                <span className="rv2-quiz-choice-label">{label}</span>
                {answered && isCorrect && (
                  <span className="rv2-quiz-choice-icon" aria-hidden>✓</span>
                )}
                {answered && isPicked && !isCorrect && (
                  <span className="rv2-quiz-choice-icon" aria-hidden>✕</span>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="rv2-quiz-reveal">
          {selected === 'reveal' ? (
            <div className="rv2-quiz-reveal-answer">{aText}</div>
          ) : (
            <button
              type="button"
              className="rv2-quiz-choice rv2-quiz-choice--reveal"
              onClick={onReveal}
            >
              {labels.revealAnswer}
            </button>
          )}
        </div>
      )}

      {answered && (
        <>
          <div className="rv2-quiz-explanation">«&nbsp;{explanation}&nbsp;»</div>
          <div className="rv2-quiz-card-actions">
            <button
              type="button"
              className="rv2-btn-primary"
              onClick={onNext}
            >
              {idx + 1 >= total ? labels.finish : labels.next}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// ComprehensionQuiz — composant principal
// ---------------------------------------------------------------------------
export interface ComprehensionQuizProps {
  questions: Q[];
  entityId: string;
  language: Lang;
  /** Clé localStorage pour la persistance des XP attribués (sépare reading/dialogue). */
  xpStoreKey: string;
  /** Récompense en XP versée la première fois que le quiz est complété. */
  xpReward?: number;
  /** Callback appelé lorsqu'on attribue les XP la première fois. */
  onAwardXp?: (xp: number) => void;
}

export const ComprehensionQuiz = ({
  questions,
  entityId,
  language,
  xpStoreKey,
  xpReward = 50,
  onAwardXp
}: ComprehensionQuizProps) => {
  const labels = COPY[language];

  const [mode, setMode] = useState<'idle' | 'playing' | 'done'>('idle');
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | 'reveal' | null>(null);
  const [score, setScore] = useState(0);
  const [xpAlready, setXpAlready] = useState<boolean>(() =>
    readXpSet(xpStoreKey).has(entityId)
  );

  const start = useCallback(() => {
    setMode('playing');
    setIdx(0);
    setSelected(null);
    setScore(0);
  }, []);

  const handleAnswer = useCallback(
    (i: number) => {
      if (selected !== null) return;
      const q = questions[idx];
      if (!q) return;
      setSelected(i);
      if (q.choices && typeof q.answerIndex === 'number' && i === q.answerIndex) {
        setScore((s) => s + 1);
      }
    },
    [idx, questions, selected]
  );

  const handleReveal = useCallback(() => setSelected('reveal'), []);

  const goNext = useCallback(() => {
    if (idx + 1 >= questions.length) {
      setMode('done');
      if (!xpAlready) {
        if (onAwardXp) onAwardXp(xpReward);
        const set = readXpSet(xpStoreKey);
        set.add(entityId);
        persistXpSet(xpStoreKey, set);
        setXpAlready(true);
      }
      return;
    }
    setIdx((i) => i + 1);
    setSelected(null);
  }, [entityId, idx, onAwardXp, questions.length, xpAlready, xpReward, xpStoreKey]);

  if (questions.length === 0) return null;

  return (
    <div className="rv2-quiz">
      <div className="rv2-quiz-header">
        <h2 className="rv2-quiz-title">{labels.title}</h2>
        <p className="rv2-quiz-sub">{labels.sub}</p>
      </div>

      {mode === 'idle' && (
        <div className="rv2-quiz-cta">
          <button
            type="button"
            className="rv2-btn-primary"
            onClick={start}
          >
            ▶ {labels.start}
          </button>
          <span className="rv2-quiz-cta-hint">
            {fmtQuestions(language, questions.length)} ·{' '}
            {xpAlready ? labels.xpAlready : `+${xpReward} XP`}
          </span>
        </div>
      )}

      {mode === 'playing' && (
        <QuizCard
          question={questions[idx]}
          idx={idx}
          total={questions.length}
          score={score}
          language={language}
          selected={selected}
          onAnswer={handleAnswer}
          onReveal={handleReveal}
          onNext={goNext}
        />
      )}

      {mode === 'done' && (
        <div className="rv2-quiz-done">
          <div className="rv2-quiz-done-emoji" aria-hidden>
            {score === questions.length ? '🎉' : '✨'}
          </div>
          <h3>{score === questions.length ? labels.perfect : labels.partial}</h3>
          <p className="rv2-quiz-done-score">
            {labels.score} : <strong>{score}</strong> / {questions.length}
          </p>
          {!xpAlready ? (
            <p className="rv2-quiz-done-xp">{labels.xpGain}</p>
          ) : (
            <p className="rv2-quiz-done-xp rv2-quiz-done-xp--muted">
              {labels.xpAlready}
            </p>
          )}
          <button
            type="button"
            className="rv2-btn-primary"
            onClick={start}
          >
            ↻ {labels.retake}
          </button>
        </div>
      )}
    </div>
  );
};

export default ComprehensionQuiz;
