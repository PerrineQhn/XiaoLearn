/**
 * LevelBilanPage.tsx — Écran complet d'un Bilan de fin de niveau CECR
 * ---------------------------------------------------------------------
 * Trois états internes : intro → quiz → results.
 *
 * - intro    : description, enjeux (10 Q, 80% requis, +60 XP à la 1ère victoire),
 *              historique des tentatives, meilleur score, état "reconnu".
 * - quiz     : 10 questions MCQ en pile, auto-avance avec feedback.
 * - results  : score final, meilleur score mis à jour, XP gagnés, état
 *              "validé" ou "à retenter", rediffuse les explications.
 *
 * Intégration :
 *   - Consomme `getBilanForLevel(level)` pour le contenu.
 *   - Consomme `useLevelBilans` via props (parent App.tsx).
 *   - L'écran ne gère pas la navigation post-victoire lui-même : le parent
 *     décide quoi faire (onFinish → back to lessons ou next level intro).
 */
import { useMemo, useState } from 'react';
import type { Language } from '../i18n';
import type { CecrLevelSlug } from '../types/simulator';
import type {
  BilanCompletionEntry,
  BilanQuestion,
  LevelBilan
} from '../types/bilan';
import {
  BILAN_DEFAULT_PASSING,
  BILAN_QUESTION_COUNT
} from '../types/bilan';
import { getBilanForLevel } from '../data/cecr-bilans';
import type { RecordBilanAttemptResult } from '../hooks/useLevelBilans';
import '../styles/level-bilan.css';

// ============================================================================
//  PROPS
// ============================================================================

export interface LevelBilanPageProps {
  level: CecrLevelSlug;
  language: Language;
  /** État courant du niveau (undefined = jamais tenté). */
  existingEntry?: BilanCompletionEntry;
  /** Enregistre la tentative — revoie le résultat calculé par le hook. */
  onRecordAttempt: (
    level: CecrLevelSlug,
    score: number,
    passing?: number
  ) => RecordBilanAttemptResult;
  /** Fermer le bilan et revenir à la page des leçons. */
  onExit: () => void;
  /** Passer au niveau suivant (null si plus rien). */
  onNextLevel?: () => void;
}

// ============================================================================
//  VUE
// ============================================================================

type Phase = 'intro' | 'quiz' | 'results';

interface AnsweredItem {
  questionId: string;
  selectedIndex: number;
  correct: boolean;
}

export default function LevelBilanPage({
  level,
  language,
  existingEntry,
  onRecordAttempt,
  onExit,
  onNextLevel
}: LevelBilanPageProps) {
  const bilan = useMemo<LevelBilan | undefined>(
    () => getBilanForLevel(level),
    [level]
  );

  const [phase, setPhase] = useState<Phase>('intro');
  const [cursor, setCursor] = useState(0);
  const [answers, setAnswers] = useState<AnsweredItem[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [attemptResult, setAttemptResult] = useState<RecordBilanAttemptResult | null>(null);

  if (!bilan) {
    return (
      <div className="lvb-page">
        <div className="lvb-wrap">
          <p className="lvb-empty">
            {language === 'fr'
              ? "Aucun bilan n'est disponible pour ce niveau."
              : 'No level check available for this level.'}
          </p>
          <button className="lvb-btn lvb-btn--ghost" onClick={onExit}>
            {language === 'fr' ? '← Retour' : '← Back'}
          </button>
        </div>
      </div>
    );
  }

  const currentQ: BilanQuestion | undefined = bilan.questions[cursor];
  const total = bilan.questions.length;

  // --- Intro screen -------------------------------------------------------
  if (phase === 'intro') {
    const passedAlready = existingEntry?.passed ?? false;
    const legacyRecognized = existingEntry?.legacyRecognized ?? false;
    const best = existingEntry?.bestScore ?? 0;
    const attempts = existingEntry?.attempts ?? 0;

    const startQuiz = () => {
      setPhase('quiz');
      setCursor(0);
      setAnswers([]);
      setSelectedIdx(null);
      setRevealed(false);
      setAttemptResult(null);
    };

    return (
      <div className="lvb-page">
        <div className="lvb-wrap">
          <header className="lvb-head">
            <button className="lvb-back" onClick={onExit} aria-label="Back">
              ←
            </button>
            <div className="lvb-head-main">
              <span className="lvb-head-kicker">
                {language === 'fr' ? 'Bilan de niveau' : 'Level check'}
              </span>
              <h1 className="lvb-head-title">
                <span className="lvb-head-emoji" aria-hidden="true">
                  {bilan.emoji}
                </span>
                {language === 'fr' ? bilan.titleFr : bilan.titleEn}
              </h1>
            </div>
          </header>

          <section className="lvb-card lvb-card--hero">
            <p className="lvb-card-lead">
              {language === 'fr' ? bilan.descriptionFr : bilan.descriptionEn}
            </p>

            <ul className="lvb-stakes">
              <li>
                <span className="lvb-stake-icon" aria-hidden="true">📝</span>
                <div>
                  <strong>
                    {BILAN_QUESTION_COUNT}{' '}
                    {language === 'fr' ? 'questions' : 'questions'}
                  </strong>
                  <span>
                    {language === 'fr'
                      ? 'Couverture transversale du niveau'
                      : 'Covers the whole level'}
                  </span>
                </div>
              </li>
              <li>
                <span className="lvb-stake-icon" aria-hidden="true">🎯</span>
                <div>
                  <strong>
                    {Math.round(bilan.passingScore * 100)}%{' '}
                    {language === 'fr' ? 'minimum' : 'minimum'}
                  </strong>
                  <span>
                    {language === 'fr'
                      ? 'Seuil à franchir pour valider'
                      : 'Threshold to pass'}
                  </span>
                </div>
              </li>
              <li>
                <span className="lvb-stake-icon" aria-hidden="true">⭐</span>
                <div>
                  <strong>+{bilan.xpReward} XP</strong>
                  <span>
                    {language === 'fr'
                      ? 'Une seule fois (première validation)'
                      : 'One-time reward (first pass)'}
                  </span>
                </div>
              </li>
            </ul>

            {passedAlready && (
              <div
                className={`lvb-banner${legacyRecognized ? ' lvb-banner--legacy' : ' lvb-banner--passed'}`}
              >
                <span className="lvb-banner-icon" aria-hidden="true">
                  {legacyRecognized ? '🪷' : '✅'}
                </span>
                <div>
                  <strong>
                    {legacyRecognized
                      ? language === 'fr'
                        ? 'Parcours antérieur reconnu'
                        : 'Prior progress recognized'
                      : language === 'fr'
                        ? 'Niveau déjà validé'
                        : 'Level already passed'}
                  </strong>
                  <span>
                    {language === 'fr'
                      ? `Meilleur score : ${best}/${BILAN_QUESTION_COUNT}. Tu peux réessayer pour améliorer ton score.`
                      : `Best: ${best}/${BILAN_QUESTION_COUNT}. You can retry to improve.`}
                  </span>
                </div>
              </div>
            )}

            {!passedAlready && attempts > 0 && (
              <div className="lvb-banner lvb-banner--retry">
                <span className="lvb-banner-icon" aria-hidden="true">🔁</span>
                <div>
                  <strong>
                    {attempts}{' '}
                    {language === 'fr'
                      ? attempts > 1
                        ? 'tentatives'
                        : 'tentative'
                      : attempts > 1
                        ? 'attempts'
                        : 'attempt'}
                  </strong>
                  <span>
                    {language === 'fr'
                      ? `Meilleur score actuel : ${best}/${BILAN_QUESTION_COUNT}`
                      : `Current best: ${best}/${BILAN_QUESTION_COUNT}`}
                  </span>
                </div>
              </div>
            )}

            <div className="lvb-actions">
              <button
                type="button"
                className="lvb-btn lvb-btn--primary lvb-btn--lg"
                onClick={startQuiz}
              >
                {language === 'fr'
                  ? passedAlready
                    ? 'Réessayer le bilan'
                    : 'Commencer le bilan'
                  : passedAlready
                    ? 'Retry level check'
                    : 'Start level check'}
              </button>
              {onNextLevel && passedAlready && (
                <button
                  type="button"
                  className="lvb-btn lvb-btn--ghost"
                  onClick={onNextLevel}
                >
                  {language === 'fr'
                    ? 'Passer au niveau suivant →'
                    : 'Go to next level →'}
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // --- Quiz screen --------------------------------------------------------
  if (phase === 'quiz' && currentQ) {
    const onSelect = (idx: number) => {
      if (revealed) return;
      setSelectedIdx(idx);
    };
    const onValidate = () => {
      if (selectedIdx === null) return;
      const correct = selectedIdx === currentQ.correctIndex;
      setAnswers((prev) => [
        ...prev,
        { questionId: currentQ.id, selectedIndex: selectedIdx, correct }
      ]);
      setRevealed(true);
    };
    const onNext = () => {
      setRevealed(false);
      setSelectedIdx(null);
      if (cursor + 1 >= total) {
        // Finalise
        const finalAnswers =
          revealed && selectedIdx !== null
            ? answers // déjà commit via onValidate
            : answers;
        const correctCount = finalAnswers.filter((a) => a.correct).length;
        const res = onRecordAttempt(level, correctCount, BILAN_DEFAULT_PASSING);
        setAttemptResult(res);
        setPhase('results');
      } else {
        setCursor((c) => c + 1);
      }
    };

    const progressPct = Math.round(((cursor + (revealed ? 1 : 0)) / total) * 100);

    return (
      <div className="lvb-page">
        <div className="lvb-wrap">
          <header className="lvb-quiz-head">
            <button
              className="lvb-back"
              onClick={() => {
                if (
                  window.confirm(
                    language === 'fr'
                      ? 'Quitter le bilan ? Ta progression actuelle sera perdue.'
                      : 'Leave the level check? Your progress will be lost.'
                  )
                ) {
                  onExit();
                }
              }}
              aria-label="Close"
            >
              ✕
            </button>
            <div className="lvb-progress">
              <div className="lvb-progress-text">
                <span>
                  {cursor + 1} / {total}
                </span>
                <span>
                  {language === 'fr' ? bilan.titleFr : bilan.titleEn}
                </span>
              </div>
              <div className="lvb-progress-bar">
                <div style={{ width: `${progressPct}%` }} />
              </div>
            </div>
          </header>

          <section className="lvb-card lvb-card--quiz">
            {currentQ.topic && (
              <span className={`lvb-tag lvb-tag--${currentQ.topic}`}>
                {topicLabel(currentQ.topic, language)}
              </span>
            )}

            <h2 className="lvb-q-prompt">
              {language === 'fr'
                ? currentQ.promptFr
                : currentQ.promptEn ?? currentQ.promptFr}
            </h2>
            {(currentQ.contextFr || currentQ.contextEn) && (
              <p className="lvb-q-context">
                {language === 'fr'
                  ? currentQ.contextFr
                  : currentQ.contextEn ?? currentQ.contextFr}
              </p>
            )}

            <ul className="lvb-choices">
              {currentQ.choices.map((choice, idx) => {
                let state = '';
                if (revealed) {
                  if (idx === currentQ.correctIndex) state = 'correct';
                  else if (idx === selectedIdx) state = 'wrong';
                  else state = 'muted';
                } else if (selectedIdx === idx) {
                  state = 'selected';
                }
                return (
                  <li key={idx}>
                    <button
                      type="button"
                      className={`lvb-choice lvb-choice--${state}`}
                      onClick={() => onSelect(idx)}
                      disabled={revealed}
                    >
                      <span className="lvb-choice-letter">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="lvb-choice-text">{choice}</span>
                      {revealed && idx === currentQ.correctIndex && (
                        <span className="lvb-choice-icon" aria-hidden="true">✓</span>
                      )}
                      {revealed && idx === selectedIdx && idx !== currentQ.correctIndex && (
                        <span className="lvb-choice-icon" aria-hidden="true">✗</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {revealed && (
              <div
                className={`lvb-expl lvb-expl--${
                  selectedIdx === currentQ.correctIndex ? 'ok' : 'ko'
                }`}
              >
                <strong>
                  {selectedIdx === currentQ.correctIndex
                    ? language === 'fr'
                      ? '✓ Bonne réponse'
                      : '✓ Correct'
                    : language === 'fr'
                      ? '✗ Réponse incorrecte'
                      : '✗ Incorrect'}
                </strong>
                <p>
                  {language === 'fr'
                    ? currentQ.explanationFr
                    : currentQ.explanationEn ?? currentQ.explanationFr}
                </p>
              </div>
            )}

            <div className="lvb-actions">
              {!revealed ? (
                <button
                  type="button"
                  className="lvb-btn lvb-btn--primary"
                  onClick={onValidate}
                  disabled={selectedIdx === null}
                >
                  {language === 'fr' ? 'Valider' : 'Submit'}
                </button>
              ) : (
                <button
                  type="button"
                  className="lvb-btn lvb-btn--primary"
                  onClick={onNext}
                >
                  {cursor + 1 >= total
                    ? language === 'fr'
                      ? 'Voir mon résultat'
                      : 'See my result'
                    : language === 'fr'
                      ? 'Question suivante →'
                      : 'Next question →'}
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // --- Results screen -----------------------------------------------------
  if (phase === 'results' && attemptResult) {
    const correctCount = answers.filter((a) => a.correct).length;
    const pct = Math.round((correctCount / total) * 100);
    const passed = attemptResult.passed;

    const mistakes = answers
      .map((a, i) => ({ a, q: bilan.questions[i] }))
      .filter(({ a }) => !a.correct);

    const retry = () => {
      setPhase('intro');
      setCursor(0);
      setAnswers([]);
      setSelectedIdx(null);
      setRevealed(false);
      setAttemptResult(null);
    };

    return (
      <div className="lvb-page">
        <div className="lvb-wrap">
          <header className="lvb-head">
            <button className="lvb-back" onClick={onExit} aria-label="Back">
              ←
            </button>
            <div className="lvb-head-main">
              <span className="lvb-head-kicker">
                {language === 'fr' ? 'Résultat' : 'Result'}
              </span>
              <h1 className="lvb-head-title">
                <span className="lvb-head-emoji" aria-hidden="true">
                  {bilan.emoji}
                </span>
                {language === 'fr' ? bilan.titleFr : bilan.titleEn}
              </h1>
            </div>
          </header>

          <section
            className={`lvb-card lvb-card--result lvb-card--${passed ? 'won' : 'lost'}`}
          >
            <div className="lvb-score-ring" data-pct={pct}>
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <circle cx="60" cy="60" r="52" className="lvb-ring-bg" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  className="lvb-ring-fg"
                  style={{
                    strokeDasharray: 2 * Math.PI * 52,
                    strokeDashoffset: 2 * Math.PI * 52 * (1 - pct / 100)
                  }}
                />
              </svg>
              <div className="lvb-score-center">
                <strong>
                  {correctCount}/{total}
                </strong>
                <span>{pct}%</span>
              </div>
            </div>

            <h2 className="lvb-result-title">
              {passed
                ? language === 'fr'
                  ? '🎉 Niveau validé !'
                  : '🎉 Level passed!'
                : language === 'fr'
                  ? 'Encore un effort'
                  : 'Almost there'}
            </h2>
            <p className="lvb-result-sub">
              {passed
                ? attemptResult.firstPass
                  ? language === 'fr'
                    ? `+${attemptResult.xpAwarded} XP ajoutés à ton compte.`
                    : `+${attemptResult.xpAwarded} XP added to your account.`
                  : language === 'fr'
                    ? 'Bonne tentative — tu confirmes ta maîtrise.'
                    : 'Nice run — you confirmed your mastery.'
                : language === 'fr'
                  ? `Il te faut au moins ${Math.ceil(total * bilan.passingScore)}/${total} pour valider. Revois les erreurs et retente !`
                  : `You need at least ${Math.ceil(total * bilan.passingScore)}/${total} to pass. Review the mistakes and retry!`}
            </p>

            <div className="lvb-result-stats">
              <div className="lvb-stat">
                <span className="lvb-stat-label">
                  {language === 'fr' ? 'Meilleur score' : 'Best score'}
                </span>
                <span className="lvb-stat-value">
                  {attemptResult.newBestScore}/{total}
                </span>
              </div>
              <div className="lvb-stat">
                <span className="lvb-stat-label">
                  {language === 'fr' ? 'Tentative' : 'Attempt'}
                </span>
                <span className="lvb-stat-value">
                  #{attemptResult.entry.attempts}
                </span>
              </div>
              <div className="lvb-stat">
                <span className="lvb-stat-label">
                  {language === 'fr' ? 'Niveau débloqué' : 'Next level'}
                </span>
                <span className="lvb-stat-value">
                  {passed
                    ? language === 'fr'
                      ? '✔'
                      : '✔'
                    : '—'}
                </span>
              </div>
            </div>

            <div className="lvb-actions">
              <button
                type="button"
                className="lvb-btn lvb-btn--ghost"
                onClick={retry}
              >
                {language === 'fr' ? 'Réessayer' : 'Retry'}
              </button>
              {passed && onNextLevel ? (
                <button
                  type="button"
                  className="lvb-btn lvb-btn--primary"
                  onClick={onNextLevel}
                >
                  {language === 'fr'
                    ? 'Niveau suivant →'
                    : 'Next level →'}
                </button>
              ) : (
                <button
                  type="button"
                  className="lvb-btn lvb-btn--primary"
                  onClick={onExit}
                >
                  {language === 'fr' ? 'Retour aux leçons' : 'Back to lessons'}
                </button>
              )}
            </div>
          </section>

          {mistakes.length > 0 && (
            <section className="lvb-card lvb-card--mistakes">
              <h3>
                {language === 'fr'
                  ? `📝 À revoir (${mistakes.length})`
                  : `📝 To review (${mistakes.length})`}
              </h3>
              <ul className="lvb-mistake-list">
                {mistakes.map(({ a, q }) => (
                  <li key={q.id} className="lvb-mistake">
                    <span className="lvb-mistake-prompt">
                      {language === 'fr'
                        ? q.promptFr
                        : q.promptEn ?? q.promptFr}
                    </span>
                    <div className="lvb-mistake-compare">
                      <span className="lvb-mistake-wrong">
                        {language === 'fr' ? 'Ta réponse : ' : 'Your answer: '}
                        <em>{q.choices[a.selectedIndex]}</em>
                      </span>
                      <span className="lvb-mistake-right">
                        {language === 'fr' ? 'Bonne réponse : ' : 'Correct: '}
                        <strong>{q.choices[q.correctIndex]}</strong>
                      </span>
                    </div>
                    <p className="lvb-mistake-expl">
                      {language === 'fr'
                        ? q.explanationFr
                        : q.explanationEn ?? q.explanationFr}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    );
  }

  return null;
}

// ============================================================================
//  HELPERS
// ============================================================================

const topicLabel = (
  topic: NonNullable<BilanQuestion['topic']>,
  lang: Language
): string => {
  const map: Record<NonNullable<BilanQuestion['topic']>, { fr: string; en: string }> = {
    vocab: { fr: 'Vocabulaire', en: 'Vocabulary' },
    grammar: { fr: 'Grammaire', en: 'Grammar' },
    dialogue: { fr: 'Dialogue', en: 'Dialogue' },
    culture: { fr: 'Culture', en: 'Culture' },
    characters: { fr: 'Caractères', en: 'Characters' },
    tones: { fr: 'Tons', en: 'Tones' }
  };
  return lang === 'fr' ? map[topic].fr : map[topic].en;
};
