/**
 * AiQuizPage.tsx — Phase 3B IA.
 * Page de génération + réalisation d'un quiz par l'IA.
 *
 * 3 modes : (1) configuration (thème + niveau + nombre), (2) chargement,
 * (3) quiz interactif avec scoring final.
 *
 * Le quiz est éphémère (pas de persistance) — l'utilisateur peut en
 * regénérer un nouveau autant de fois qu'il veut.
 */
import { useCallback, useState } from 'react';
import type { Language } from '../i18n';
import {
  generateAiQuiz,
  type AiQuiz,
  type AiQuizQuestion
} from '../services/quizGeneratorService';
import './AiQuizPage.css';

interface AiQuizPageProps {
  language: Language;
  /** Niveau CECR par défaut (suggéré dans le sélecteur). */
  defaultLevel?: string;
}

const COPY = {
  fr: {
    title: 'Quiz IA personnalisé',
    subtitle:
      'Choisis un thème, un niveau, et l\'IA te génère 10 questions sur mesure. Idéal pour réviser avant un test ou cibler un sujet précis.',
    topicLabel: 'Thème',
    topicPlaceholder: 'Ex : les particules 了/过/着, les nombres, le 把 phrase pattern…',
    levelLabel: 'Niveau',
    countLabel: 'Nombre de questions',
    generateBtn: 'Générer le quiz',
    generating: 'Génération en cours…',
    generatingHint: 'L\'IA prépare ton quiz, ça peut prendre 5-10 secondes.',
    quizTopic: 'Thème',
    quizQuestion: 'Question',
    quizValidate: 'Valider',
    quizNext: 'Suivante →',
    quizSeeResults: 'Voir le résultat',
    correct: '✓ Correct !',
    incorrect: '✗ Incorrect',
    correctAnswer: 'Bonne réponse :',
    yourAnswer: 'Ta réponse :',
    explanation: 'Explication',
    summaryTitle: 'Résultat',
    summaryGreat: 'Excellent !',
    summaryGood: 'Pas mal !',
    summaryRetry: 'À retravailler',
    accuracy: 'Score',
    newQuiz: 'Nouveau quiz',
    backToTopics: 'Changer de thème',
    errorEmpty: 'Saisis un thème avant de générer.',
    errorApi: 'Une erreur est survenue. Réessaie.'
  },
  en: {
    title: 'AI Custom Quiz',
    subtitle:
      'Pick a topic, a level, and the AI generates 10 tailored questions. Ideal to review before a test or focus on a specific subject.',
    topicLabel: 'Topic',
    topicPlaceholder: 'e.g. 了/过/着 particles, numbers, the 把 sentence pattern…',
    levelLabel: 'Level',
    countLabel: 'Number of questions',
    generateBtn: 'Generate quiz',
    generating: 'Generating…',
    generatingHint: 'The AI is crafting your quiz, this can take 5-10 seconds.',
    quizTopic: 'Topic',
    quizQuestion: 'Question',
    quizValidate: 'Check',
    quizNext: 'Next →',
    quizSeeResults: 'See results',
    correct: '✓ Correct!',
    incorrect: '✗ Wrong',
    correctAnswer: 'Correct answer:',
    yourAnswer: 'Your answer:',
    explanation: 'Explanation',
    summaryTitle: 'Result',
    summaryGreat: 'Excellent!',
    summaryGood: 'Not bad!',
    summaryRetry: 'Needs more practice',
    accuracy: 'Score',
    newQuiz: 'New quiz',
    backToTopics: 'Change topic',
    errorEmpty: 'Type a topic first.',
    errorApi: 'Something went wrong. Try again.'
  }
} as const;

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

type Mode = 'config' | 'generating' | 'quiz' | 'summary';

export default function AiQuizPage({
  language,
  defaultLevel = 'B1'
}: AiQuizPageProps) {
  const t = COPY[language];
  const [mode, setMode] = useState<Mode>('config');
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<string>(defaultLevel);
  const [count, setCount] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<AiQuiz | null>(null);
  const [finalAnswers, setFinalAnswers] = useState<number[]>([]);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) {
      setError(t.errorEmpty);
      return;
    }
    setError(null);
    setMode('generating');
    try {
      const q = await generateAiQuiz(topic.trim(), level, count);
      setQuiz(q);
      setMode('quiz');
    } catch (e) {
      console.error(e);
      setError(t.errorApi);
      setMode('config');
    }
  }, [topic, level, count, t]);

  const handleBackToConfig = useCallback(() => {
    setMode('config');
    setQuiz(null);
    setError(null);
  }, []);

  if (mode === 'config' || mode === 'generating') {
    return (
      <div className="ai-quiz-page">
        <header className="aq-header">
          <h1>{t.title}</h1>
          <p className="aq-subtitle">{t.subtitle}</p>
        </header>

        <section className="aq-config-card">
          <label className="aq-field">
            <span className="aq-field-label">{t.topicLabel}</span>
            <textarea
              className="aq-field-input"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t.topicPlaceholder}
              rows={2}
              disabled={mode === 'generating'}
            />
          </label>

          <div className="aq-field-row">
            <label className="aq-field">
              <span className="aq-field-label">{t.levelLabel}</span>
              <select
                className="aq-field-input"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                disabled={mode === 'generating'}
              >
                {LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </label>
            <label className="aq-field">
              <span className="aq-field-label">{t.countLabel}</span>
              <select
                className="aq-field-input"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                disabled={mode === 'generating'}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </label>
          </div>

          {error && <div className="aq-error">{error}</div>}

          <div className="aq-config-actions">
            <button
              type="button"
              className="aq-btn aq-btn--primary"
              onClick={handleGenerate}
              disabled={mode === 'generating' || !topic.trim()}
            >
              {mode === 'generating' ? t.generating : t.generateBtn}
            </button>
          </div>

          {mode === 'generating' && (
            <p className="aq-generating-hint">{t.generatingHint}</p>
          )}
        </section>
      </div>
    );
  }

  if (mode === 'quiz' && quiz) {
    return (
      <QuizRunner
        quiz={quiz}
        copy={t}
        onFinish={(answers) => {
          setFinalAnswers(answers);
          setMode('summary');
        }}
        onBack={handleBackToConfig}
      />
    );
  }

  if (mode === 'summary' && quiz) {
    return (
      <QuizSummary
        quiz={quiz}
        answers={finalAnswers}
        copy={t}
        onNewQuiz={() => {
          setQuiz(null);
          setFinalAnswers([]);
          setMode('config');
        }}
        onChangeTopic={handleBackToConfig}
      />
    );
  }

  return null;
}

// =====================================================================
// Quiz runner — affiche les questions une par une avec feedback inline
// =====================================================================
function QuizRunner({
  quiz,
  copy,
  onFinish,
  onBack
}: {
  quiz: AiQuiz;
  copy: (typeof COPY)[Language];
  /** Reçoit toutes les réponses (index par question) à la fin du quiz. */
  onFinish: (answers: number[]) => void;
  onBack: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [validated, setValidated] = useState(false);

  const question = quiz.questions[index];
  const isLast = index === quiz.questions.length - 1;

  const handleValidate = useCallback(() => {
    if (selected === null) return;
    setValidated(true);
    setAnswers((prev) => [...prev, selected]);
  }, [selected]);

  const handleNext = useCallback(() => {
    if (isLast) {
      // Construit la liste finale (la dernière réponse est encore dans `selected`
      // si l'utilisateur vient de valider). Comme handleValidate a déjà push
      // selected dans answers, on l'utilise tel quel.
      onFinish(answers);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setValidated(false);
    }
  }, [isLast, onFinish, answers]);

  return (
    <div className="ai-quiz-page">
      <header className="aq-quiz-header">
        <button type="button" className="aq-back-btn" onClick={onBack}>
          ← {copy.backToTopics}
        </button>
        <div className="aq-quiz-meta">
          <div className="aq-quiz-topic">
            <strong>{copy.quizTopic} :</strong> {quiz.topic}
            <span className="aq-quiz-level-badge">{quiz.level}</span>
          </div>
          <div className="aq-quiz-progress">
            {copy.quizQuestion} {index + 1} / {quiz.questions.length}
          </div>
        </div>
      </header>

      <section className="aq-question-card">
        <div className="aq-question-prompt">{question.prompt}</div>
        {question.sentence && (
          <div className="aq-question-sentence" lang="zh-CN">
            {question.sentence}
          </div>
        )}

        <div className="aq-choices">
          {question.choices.map((choice, i) => {
            const isSelected = selected === i;
            const isCorrect = i === question.correctIndex;
            let stateClass = '';
            if (validated) {
              if (isCorrect) stateClass = 'aq-choice--correct';
              else if (isSelected) stateClass = 'aq-choice--wrong';
            } else if (isSelected) {
              stateClass = 'aq-choice--selected';
            }
            return (
              <button
                key={i}
                type="button"
                className={`aq-choice ${stateClass}`}
                onClick={() => {
                  if (validated) return;
                  setSelected(i);
                }}
                disabled={validated}
                lang="zh-CN"
              >
                <span className="aq-choice-letter">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="aq-choice-text">{choice}</span>
              </button>
            );
          })}
        </div>

        {validated && (
          <FeedbackBlock
            question={question}
            selected={selected ?? -1}
            copy={copy}
          />
        )}

        <div className="aq-question-actions">
          {!validated ? (
            <button
              type="button"
              className="aq-btn aq-btn--primary"
              disabled={selected === null}
              onClick={handleValidate}
            >
              {copy.quizValidate}
            </button>
          ) : (
            <button
              type="button"
              className="aq-btn aq-btn--primary"
              onClick={handleNext}
            >
              {isLast ? copy.quizSeeResults : copy.quizNext}
            </button>
          )}
        </div>
      </section>
    </div>
  );
  // Note : `answers` est consommé par le parent au moment où onFinish est
  // appelé. Pour rester simple, on garde answers en local et on les refait
  // calculer en summary à partir des choix de l'utilisateur stockés.
}

function FeedbackBlock({
  question,
  selected,
  copy
}: {
  question: AiQuizQuestion;
  selected: number;
  copy: (typeof COPY)[Language];
}) {
  const isCorrect = selected === question.correctIndex;
  return (
    <div
      className={`aq-feedback ${isCorrect ? 'aq-feedback--ok' : 'aq-feedback--ko'}`}
    >
      <div className="aq-feedback-headline">
        {isCorrect ? copy.correct : copy.incorrect}
      </div>
      {!isCorrect && (
        <>
          <div className="aq-feedback-line">
            <strong>{copy.yourAnswer}</strong>{' '}
            <span lang="zh-CN">{question.choices[selected]}</span>
          </div>
          <div className="aq-feedback-line">
            <strong>{copy.correctAnswer}</strong>{' '}
            <span lang="zh-CN">{question.choices[question.correctIndex]}</span>
          </div>
        </>
      )}
      {question.explanation && (
        <div className="aq-feedback-explanation">
          <strong>{copy.explanation} :</strong> {question.explanation}
        </div>
      )}
    </div>
  );
}

// =====================================================================
// Summary final
// =====================================================================
function QuizSummary({
  quiz,
  answers,
  copy,
  onNewQuiz,
  onChangeTopic
}: {
  quiz: AiQuiz;
  answers: number[];
  copy: (typeof COPY)[Language];
  onNewQuiz: () => void;
  onChangeTopic: () => void;
}) {
  const correctCount = quiz.questions.reduce((acc, q, i) => {
    return acc + (answers[i] === q.correctIndex ? 1 : 0);
  }, 0);
  const total = quiz.questions.length;
  const accuracyPercent = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  let feedbackText: string;
  let accuracyColor: string;
  if (accuracyPercent >= 80) {
    feedbackText = copy.summaryGreat;
    accuracyColor = '#15803d';
  } else if (accuracyPercent >= 50) {
    feedbackText = copy.summaryGood;
    accuracyColor = '#b45309';
  } else {
    feedbackText = copy.summaryRetry;
    accuracyColor = '#b91c1c';
  }

  // Liste des questions ratées pour révision rapide.
  const mistakes = quiz.questions
    .map((q, i) => ({ q, chosen: answers[i], idx: i }))
    .filter((m) => m.chosen !== m.q.correctIndex);

  return (
    <div className="ai-quiz-page">
      <section className="aq-summary-card">
        <h2 className="aq-summary-title">{copy.summaryTitle}</h2>
        <div className="aq-summary-score" style={{ color: accuracyColor }}>
          {correctCount} / {total}
          <span className="aq-summary-pct">({accuracyPercent}%)</span>
        </div>
        <p className="aq-summary-text" style={{ color: accuracyColor }}>
          {feedbackText}
        </p>
        <div className="aq-summary-meta">
          <strong>{copy.quizTopic} :</strong> {quiz.topic}{' '}
          <span className="aq-quiz-level-badge">{quiz.level}</span>
        </div>

        {mistakes.length > 0 && (
          <div className="aq-summary-mistakes">
            <h3 className="aq-summary-mistakes-title">
              {copy.incorrect.replace(/[✗✓]\s*/, '')} ({mistakes.length})
            </h3>
            <ul className="aq-summary-mistakes-list">
              {mistakes.map((m) => (
                <li key={m.idx} className="aq-summary-mistake">
                  <div className="aq-summary-mistake-prompt">
                    Q{m.idx + 1} — {m.q.prompt}
                  </div>
                  {m.q.sentence && (
                    <div className="aq-summary-mistake-sentence" lang="zh-CN">
                      {m.q.sentence}
                    </div>
                  )}
                  <div className="aq-summary-mistake-line">
                    <strong>{copy.yourAnswer}</strong>{' '}
                    <span lang="zh-CN" className="aq-mistake-strike">
                      {m.q.choices[m.chosen] ?? '—'}
                    </span>
                  </div>
                  <div className="aq-summary-mistake-line">
                    <strong>{copy.correctAnswer}</strong>{' '}
                    <span lang="zh-CN" className="aq-mistake-correct">
                      {m.q.choices[m.q.correctIndex]}
                    </span>
                  </div>
                  {m.q.explanation && (
                    <div className="aq-summary-mistake-expl">
                      💡 {m.q.explanation}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="aq-summary-actions">
          <button
            type="button"
            className="aq-btn aq-btn--ghost"
            onClick={onChangeTopic}
          >
            {copy.backToTopics}
          </button>
          <button
            type="button"
            className="aq-btn aq-btn--primary"
            onClick={onNewQuiz}
          >
            {copy.newQuiz}
          </button>
        </div>
      </section>
    </div>
  );
}
