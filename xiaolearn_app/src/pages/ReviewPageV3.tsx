/**
 * ReviewPageV3.tsx — Révision multi-leçons (XiaoLearn V7)
 * --------------------------------------------------------
 * Inspiré de /dashboard/reviews de Seonsaengnim.
 *
 * 4 modes :
 *   - smart-mix : 70% dues + 20% fragiles + 10% récentes
 *   - daily     : uniquement les leçons dont nextReviewAt ≤ now
 *   - weakness  : leçons avec mastery < 60
 *   - free      : N dernières leçons complétées (3 / 6 / 10)
 *
 * Sourcing questions :
 *   - Pool issu de `cecrExercisesV2` (mcq + fill format).
 *   - 6 à 12 questions par session selon le mode (plafond 12).
 *   - Mix pondéré : 70% vocab/quiz + 20% dialogue + 10% grammar (si dispo).
 *
 * Flow : landing (choix mode) → session → résultat.
 *
 * Intégration :
 *   - Consomme `useLessonMastery` via props pour masteryMap + recordSessionResult.
 *   - Consomme `dashboardState.awardXp` via props.
 *   - S'appuie sur `completedLessonIds` (Set) pour ne proposer que les leçons
 *     déjà terminées.
 */
import { useMemo, useState } from 'react';
import type { Language } from '../i18n';
import type {
  LessonMasteryEntry,
  LessonMasteryMap,
  ReviewFreeCount,
  ReviewMode,
  ReviewQuestion
} from '../types/review-v3';
import {
  REVIEW_XP_PER_CORRECT,
  REVIEW_XP_SESSION_BONUS
} from '../types/review-v3';
import type { CecrLevelSlug } from '../types/simulator';
import { cecrExercisesV2All as cecrExercisesV2 } from '../data/cecr-exercises-all';
import { cecrLessonPaths, cecrLevels } from '../data/cecr-course';
import '../styles/review-v3.css';

// ============================================================================
//  PROPS
// ============================================================================

export interface ReviewPageV3Props {
  language: Language;
  completedLessonIds: Set<string>;
  masteryMap: LessonMasteryMap;
  onRecordSession: (
    lessonId: string,
    level: CecrLevelSlug,
    scorePct: number
  ) => void;
  onSeedLessonMastery: (lessonId: string, level: CecrLevelSlug) => void;
  onAwardXp: (amount: number) => void;
  /** Permet de "refaire une leçon" depuis l'écran de résultat. */
  onOpenLesson?: (lessonId: string) => void;
  onBack?: () => void;
}

// ============================================================================
//  LOOKUPS (path / level / title par lessonId)
// ============================================================================

interface LessonMeta {
  lessonId: string;
  pathId: string;
  level: CecrLevelSlug;
  titleFr: string;
  titleEn: string;
}

const buildLessonIndex = (): Map<string, LessonMeta> => {
  const map = new Map<string, LessonMeta>();
  const pathToLevel = new Map<string, CecrLevelSlug>();
  for (const lv of cecrLevels) {
    for (const pid of lv.pathIds) pathToLevel.set(pid, lv.level as CecrLevelSlug);
  }
  for (const path of cecrLessonPaths) {
    const level = pathToLevel.get(path.id);
    if (!level) continue;
    for (const lesson of path.lessons) {
      map.set(lesson.id, {
        lessonId: lesson.id,
        pathId: path.id,
        level,
        titleFr: lesson.title,
        titleEn: lesson.titleEn
      });
    }
  }
  return map;
};

// ============================================================================
//  SESSION BUILDER
// ============================================================================

const SESSION_SIZE_BY_MODE: Record<ReviewMode, number> = {
  'smart-mix': 10,
  daily: 10,
  weakness: 8,
  free: 10
};

const pickLessonsForMode = (
  mode: ReviewMode,
  freeCount: ReviewFreeCount,
  completedIds: Set<string>,
  masteryMap: LessonMasteryMap
): string[] => {
  const completedList = Array.from(completedIds);
  const now = Date.now();

  if (mode === 'free') {
    const sorted = completedList
      .map((id) => ({
        id,
        ts: masteryMap[id]?.lastReviewedAt
          ? new Date(masteryMap[id].lastReviewedAt!).getTime()
          : 0
      }))
      .sort((a, b) => b.ts - a.ts)
      .slice(0, freeCount);
    return sorted.map((x) => x.id);
  }

  if (mode === 'daily') {
    return Object.values(masteryMap)
      .filter((e) => new Date(e.nextReviewAt).getTime() <= now)
      .sort(
        (a, b) =>
          new Date(a.nextReviewAt).getTime() -
          new Date(b.nextReviewAt).getTime()
      )
      .map((e) => e.lessonId)
      .slice(0, 10);
  }

  if (mode === 'weakness') {
    return Object.values(masteryMap)
      .filter((e) => e.mastery < 60)
      .sort((a, b) => a.mastery - b.mastery)
      .map((e) => e.lessonId)
      .slice(0, 8);
  }

  // smart-mix : 70% dues + 20% fragiles + 10% récentes.
  const due = Object.values(masteryMap).filter(
    (e) => new Date(e.nextReviewAt).getTime() <= now
  );
  const weak = Object.values(masteryMap).filter(
    (e) => e.mastery < 60 && new Date(e.nextReviewAt).getTime() > now
  );
  const recent = completedList
    .filter((id) => !masteryMap[id])
    .slice(0, 5);

  const pick: string[] = [];
  due
    .sort(() => Math.random() - 0.5)
    .slice(0, 7)
    .forEach((e) => pick.push(e.lessonId));
  weak
    .sort(() => Math.random() - 0.5)
    .slice(0, 2)
    .forEach((e) => pick.push(e.lessonId));
  recent.slice(0, 1).forEach((id) => pick.push(id));

  // dedup
  return [...new Set(pick)].slice(0, SESSION_SIZE_BY_MODE['smart-mix']);
};

/**
 * Tire 1 à 2 questions par leçon depuis cecrExercisesV2.
 * Plafonne la session à `cap` questions.
 */
const buildQuestionsForLessons = (
  lessonIds: string[],
  lessonIndex: Map<string, LessonMeta>,
  cap: number
): ReviewQuestion[] => {
  const questions: ReviewQuestion[] = [];
  for (const lessonId of lessonIds) {
    const meta = lessonIndex.get(lessonId);
    if (!meta) continue;
    const raw = cecrExercisesV2[lessonId];
    if (!raw || raw.length === 0) continue;
    // shuffle + pick 2
    const shuffled = [...raw].sort(() => Math.random() - 0.5).slice(0, 2);
    for (const ex of shuffled) {
      questions.push({
        id: ex.id,
        source: ex.type === 'fill' ? 'dialogue' : 'quiz',
        lessonId,
        level: meta.level,
        promptFr: ex.prompt,
        promptEn: ex.promptEn,
        contextFr: ex.sentence,
        contextEn: ex.sentenceEn,
        choices: ex.choices,
        correctIndex: ex.correctIndex,
        explanationFr: ex.explanation,
        explanationEn: ex.explanationEn
      });
      if (questions.length >= cap) break;
    }
    if (questions.length >= cap) break;
  }
  return questions;
};

// ============================================================================
//  COMPONENT
// ============================================================================

type Phase = 'landing' | 'running' | 'result';

interface AnsweredReview {
  questionId: string;
  lessonId: string;
  selectedIndex: number;
  correct: boolean;
}

export default function ReviewPageV3(props: ReviewPageV3Props) {
  const {
    language,
    completedLessonIds,
    masteryMap,
    onRecordSession,
    onSeedLessonMastery,
    onAwardXp,
    onOpenLesson,
    onBack
  } = props;

  const [phase, setPhase] = useState<Phase>('landing');
  const [mode, setMode] = useState<ReviewMode>('smart-mix');
  const [freeCount, setFreeCount] = useState<ReviewFreeCount>(6);
  const [questions, setQuestions] = useState<ReviewQuestion[]>([]);
  const [cursor, setCursor] = useState(0);
  const [answers, setAnswers] = useState<AnsweredReview[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [masteryBefore, setMasteryBefore] = useState<
    Record<string, number>
  >({});

  const lessonIndex = useMemo(buildLessonIndex, []);

  // --- Stats landing ----------------------------------------------------
  const now = Date.now();
  const dueLessons = useMemo(
    () =>
      Object.values(masteryMap).filter(
        (e) => new Date(e.nextReviewAt).getTime() <= now
      ),
    [masteryMap, now]
  );
  const weakLessons = useMemo(
    () => Object.values(masteryMap).filter((e) => e.mastery < 60),
    [masteryMap]
  );
  const recentCount = completedLessonIds.size;

  // ---------------------------------------------------------------------
  const startSession = (picked: ReviewMode, free: ReviewFreeCount = freeCount) => {
    const lessonIds = pickLessonsForMode(picked, free, completedLessonIds, masteryMap);
    if (lessonIds.length === 0) {
      alert(
        language === 'fr'
          ? "Aucune leçon à réviser dans ce mode pour l'instant."
          : 'No lessons to review in this mode right now.'
      );
      return;
    }
    const cap = SESSION_SIZE_BY_MODE[picked];
    const qs = buildQuestionsForLessons(lessonIds, lessonIndex, cap);
    if (qs.length === 0) {
      alert(
        language === 'fr'
          ? "Impossible de construire la session : pas d'exercices disponibles."
          : 'Cannot build a session: no exercises available.'
      );
      return;
    }
    // Snapshot mastery avant session (pour l'écran résultat).
    const snapshot: Record<string, number> = {};
    for (const q of qs) {
      if (snapshot[q.lessonId] !== undefined) continue;
      snapshot[q.lessonId] = masteryMap[q.lessonId]?.mastery ?? 0;
    }
    setMasteryBefore(snapshot);
    setQuestions(qs);
    setAnswers([]);
    setCursor(0);
    setSelectedIdx(null);
    setRevealed(false);
    setMode(picked);
    setPhase('running');
  };

  const currentQ = questions[cursor];

  const submitAnswer = () => {
    if (selectedIdx === null || !currentQ) return;
    const correct = selectedIdx === currentQ.correctIndex;
    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        lessonId: currentQ.lessonId,
        selectedIndex: selectedIdx,
        correct
      }
    ]);
    setRevealed(true);
  };

  const goNext = () => {
    setRevealed(false);
    setSelectedIdx(null);
    if (cursor + 1 >= questions.length) {
      finalizeSession();
    } else {
      setCursor((c) => c + 1);
    }
  };

  const finalizeSession = () => {
    // Regroupe les réponses par leçon → calcule le score et déclenche le SRS.
    const byLesson = new Map<string, { total: number; correct: number; level: CecrLevelSlug }>();
    for (const a of answers) {
      const meta = lessonIndex.get(a.lessonId);
      if (!meta) continue;
      const prev = byLesson.get(a.lessonId) ?? {
        total: 0,
        correct: 0,
        level: meta.level
      };
      prev.total += 1;
      if (a.correct) prev.correct += 1;
      byLesson.set(a.lessonId, prev);
    }
    let totalCorrect = 0;
    byLesson.forEach((agg, lid) => {
      const pct = Math.round((agg.correct / agg.total) * 100);
      // Crée la fiche mastery si elle n'existe pas.
      if (!masteryMap[lid]) onSeedLessonMastery(lid, agg.level);
      onRecordSession(lid, agg.level, pct);
      totalCorrect += agg.correct;
    });

    // XP : +3 par bonne réponse + 15 bonus si score session ≥ 70%
    const scorePct = Math.round(
      (answers.filter((a) => a.correct).length / Math.max(1, answers.length)) * 100
    );
    const xpCorrect = totalCorrect * REVIEW_XP_PER_CORRECT;
    const xpBonus = scorePct >= 70 ? REVIEW_XP_SESSION_BONUS : 0;
    const xpGained = xpCorrect + xpBonus;
    if (xpGained > 0) onAwardXp(xpGained);

    setPhase('result');
  };

  // ============================================================================
  //  RENDER
  // ============================================================================

  // ---- LANDING ---------------------------------------------------------
  if (phase === 'landing') {
    return (
      <div className="rv3-page">
        <div className="rv3-wrap">
          <header className="rv3-head">
            {onBack && (
              <button className="rv3-back" onClick={onBack} aria-label="Back">
                ←
              </button>
            )}
            <div className="rv3-head-main">
              <span className="rv3-head-kicker">
                {language === 'fr' ? 'Révisions' : 'Reviews'}
              </span>
              <h1 className="rv3-head-title">
                {language === 'fr'
                  ? '📚 Révisions multi-leçons'
                  : '📚 Multi-lesson reviews'}
              </h1>
              <p className="rv3-head-sub">
                {language === 'fr'
                  ? 'Choisis un mode pour consolider ta maîtrise.'
                  : 'Pick a mode to consolidate your mastery.'}
              </p>
            </div>
          </header>

          <section className="rv3-stats">
            <div className="rv3-stat">
              <strong>{dueLessons.length}</strong>
              <span>{language === 'fr' ? 'à réviser' : 'due'}</span>
            </div>
            <div className="rv3-stat">
              <strong>{weakLessons.length}</strong>
              <span>{language === 'fr' ? 'leçons fragiles' : 'fragile lessons'}</span>
            </div>
            <div className="rv3-stat">
              <strong>{recentCount}</strong>
              <span>{language === 'fr' ? 'complétées' : 'completed'}</span>
            </div>
          </section>

          <div className="rv3-modes">
            <button
              type="button"
              className="rv3-mode rv3-mode--smart"
              onClick={() => startSession('smart-mix')}
            >
              <span className="rv3-mode-icon" aria-hidden="true">✨</span>
              <div>
                <span className="rv3-mode-title">
                  {language === 'fr' ? 'Smart Mix' : 'Smart Mix'}
                </span>
                <span className="rv3-mode-desc">
                  {language === 'fr'
                    ? 'Mix intelligent : dues + fragiles + récentes'
                    : 'Smart mix: due + fragile + recent'}
                </span>
              </div>
              <span className="rv3-mode-count">
                ~{SESSION_SIZE_BY_MODE['smart-mix']}
              </span>
            </button>

            <button
              type="button"
              className="rv3-mode rv3-mode--daily"
              onClick={() => startSession('daily')}
              disabled={dueLessons.length === 0}
            >
              <span className="rv3-mode-icon" aria-hidden="true">📅</span>
              <div>
                <span className="rv3-mode-title">
                  {language === 'fr' ? 'Du jour' : 'Daily'}
                </span>
                <span className="rv3-mode-desc">
                  {language === 'fr'
                    ? 'Uniquement les leçons dues aujourd\'hui'
                    : 'Only lessons due today'}
                </span>
              </div>
              <span className="rv3-mode-count">{dueLessons.length}</span>
            </button>

            <button
              type="button"
              className="rv3-mode rv3-mode--weakness"
              onClick={() => startSession('weakness')}
              disabled={weakLessons.length === 0}
            >
              <span className="rv3-mode-icon" aria-hidden="true">💪</span>
              <div>
                <span className="rv3-mode-title">
                  {language === 'fr' ? 'Mes faiblesses' : 'My weaknesses'}
                </span>
                <span className="rv3-mode-desc">
                  {language === 'fr'
                    ? 'Cible les leçons avec maîtrise < 60%'
                    : 'Target lessons with mastery < 60%'}
                </span>
              </div>
              <span className="rv3-mode-count">{weakLessons.length}</span>
            </button>

            <div className="rv3-mode rv3-mode--free">
              <span className="rv3-mode-icon" aria-hidden="true">🎚️</span>
              <div>
                <span className="rv3-mode-title">
                  {language === 'fr' ? 'Libre' : 'Free'}
                </span>
                <span className="rv3-mode-desc">
                  {language === 'fr'
                    ? 'Choisis le nombre de leçons à piocher'
                    : 'Pick how many recent lessons to mix'}
                </span>
                <div className="rv3-free-switches">
                  {[3, 6, 10].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`rv3-free-pill${freeCount === n ? ' active' : ''}`}
                      onClick={() => setFreeCount(n as ReviewFreeCount)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="rv3-mode-go"
                onClick={() => startSession('free', freeCount)}
                disabled={recentCount === 0}
              >
                {language === 'fr' ? 'Lancer' : 'Start'}
              </button>
            </div>
          </div>

          {/* Due / weak overview */}
          {(dueLessons.length > 0 || weakLessons.length > 0) && (
            <section className="rv3-overview">
              {dueLessons.length > 0 && (
                <div className="rv3-overview-block">
                  <h3>
                    📅{' '}
                    {language === 'fr'
                      ? `À réviser aujourd'hui (${dueLessons.length})`
                      : `Due today (${dueLessons.length})`}
                  </h3>
                  <ul className="rv3-lesson-list">
                    {dueLessons.slice(0, 5).map((e) => {
                      const meta = lessonIndex.get(e.lessonId);
                      return (
                        <li key={e.lessonId}>
                          <span className="rv3-lesson-title">
                            {meta
                              ? language === 'fr'
                                ? meta.titleFr
                                : meta.titleEn
                              : e.lessonId}
                          </span>
                          <span className="rv3-lesson-mastery">
                            {e.mastery}%
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {weakLessons.length > 0 && (
                <div className="rv3-overview-block">
                  <h3>
                    💪{' '}
                    {language === 'fr'
                      ? `Leçons fragiles (${weakLessons.length})`
                      : `Fragile lessons (${weakLessons.length})`}
                  </h3>
                  <ul className="rv3-lesson-list">
                    {weakLessons.slice(0, 5).map((e) => {
                      const meta = lessonIndex.get(e.lessonId);
                      return (
                        <li key={e.lessonId}>
                          <span className="rv3-lesson-title">
                            {meta
                              ? language === 'fr'
                                ? meta.titleFr
                                : meta.titleEn
                              : e.lessonId}
                          </span>
                          <span className="rv3-lesson-mastery rv3-mastery--weak">
                            {e.mastery}%
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    );
  }

  // ---- RUNNING --------------------------------------------------------
  if (phase === 'running' && currentQ) {
    const total = questions.length;
    const pct = Math.round(((cursor + (revealed ? 1 : 0)) / total) * 100);
    return (
      <div className="rv3-page">
        <div className="rv3-wrap">
          <header className="rv3-quiz-head">
            <button
              className="rv3-back"
              onClick={() => {
                if (
                  window.confirm(
                    language === 'fr'
                      ? 'Quitter la session ? Tes réponses ne seront pas enregistrées.'
                      : 'Leave the session? Your answers will not be saved.'
                  )
                ) {
                  setPhase('landing');
                }
              }}
              aria-label="Close"
            >
              ✕
            </button>
            <div className="rv3-progress">
              <div className="rv3-progress-text">
                <span>
                  {cursor + 1} / {total}
                </span>
                <span className="rv3-progress-mode">{modeLabel(mode, language)}</span>
              </div>
              <div className="rv3-progress-bar">
                <div style={{ width: `${pct}%` }} />
              </div>
            </div>
          </header>

          <section className="rv3-card rv3-card--quiz">
            <span className="rv3-source-tag">
              {sourceLabel(currentQ.source, language)}
            </span>

            <h2 className="rv3-q-prompt">
              {language === 'fr'
                ? currentQ.promptFr
                : currentQ.promptEn ?? currentQ.promptFr}
            </h2>
            {(currentQ.contextFr || currentQ.contextEn) && (
              <p className="rv3-q-context">
                {language === 'fr'
                  ? currentQ.contextFr
                  : currentQ.contextEn ?? currentQ.contextFr}
              </p>
            )}

            <ul className="rv3-choices">
              {currentQ.choices.map((choice, idx) => {
                let state = '';
                if (revealed) {
                  if (idx === currentQ.correctIndex) state = 'correct';
                  else if (idx === selectedIdx) state = 'wrong';
                  else state = 'muted';
                } else if (selectedIdx === idx) state = 'selected';
                return (
                  <li key={idx}>
                    <button
                      type="button"
                      className={`rv3-choice rv3-choice--${state}`}
                      onClick={() => !revealed && setSelectedIdx(idx)}
                      disabled={revealed}
                    >
                      <span className="rv3-choice-letter">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="rv3-choice-text">{choice}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {revealed && (
              <div
                className={`rv3-expl rv3-expl--${
                  selectedIdx === currentQ.correctIndex ? 'ok' : 'ko'
                }`}
              >
                <strong>
                  {selectedIdx === currentQ.correctIndex
                    ? language === 'fr'
                      ? '✓ Bonne réponse'
                      : '✓ Correct'
                    : language === 'fr'
                      ? '✗ Incorrecte'
                      : '✗ Incorrect'}
                </strong>
                {(currentQ.explanationFr || currentQ.explanationEn) && (
                  <p>
                    {language === 'fr'
                      ? currentQ.explanationFr
                      : currentQ.explanationEn ?? currentQ.explanationFr}
                  </p>
                )}
              </div>
            )}

            <div className="rv3-actions">
              {!revealed ? (
                <button
                  type="button"
                  className="rv3-btn rv3-btn--primary"
                  onClick={submitAnswer}
                  disabled={selectedIdx === null}
                >
                  {language === 'fr' ? 'Valider' : 'Submit'}
                </button>
              ) : (
                <button
                  type="button"
                  className="rv3-btn rv3-btn--primary"
                  onClick={goNext}
                >
                  {cursor + 1 >= total
                    ? language === 'fr'
                      ? 'Voir le bilan'
                      : 'See summary'
                    : language === 'fr'
                      ? 'Suivante →'
                      : 'Next →'}
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // ---- RESULT ---------------------------------------------------------
  if (phase === 'result') {
    const correctCount = answers.filter((a) => a.correct).length;
    const total = answers.length;
    const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const xpEarned =
      correctCount * REVIEW_XP_PER_CORRECT + (pct >= 70 ? REVIEW_XP_SESSION_BONUS : 0);

    // Agrégation par leçon pour affichage before/after.
    const byLesson = new Map<
      string,
      { total: number; correct: number; level: CecrLevelSlug }
    >();
    for (const a of answers) {
      const meta = lessonIndex.get(a.lessonId);
      if (!meta) continue;
      const prev = byLesson.get(a.lessonId) ?? {
        total: 0,
        correct: 0,
        level: meta.level
      };
      prev.total += 1;
      if (a.correct) prev.correct += 1;
      byLesson.set(a.lessonId, prev);
    }

    const touched = Array.from(byLesson.entries()).map(([lid, agg]) => {
      const meta = lessonIndex.get(lid);
      const after: LessonMasteryEntry | undefined = masteryMap[lid];
      return {
        lessonId: lid,
        titleFr: meta?.titleFr ?? lid,
        titleEn: meta?.titleEn ?? lid,
        masteryBefore: masteryBefore[lid] ?? 0,
        masteryAfter: after?.mastery ?? Math.round((agg.correct / agg.total) * 100),
        nextReviewAt: after?.nextReviewAt ?? new Date().toISOString(),
        questionCount: agg.total,
        correctCount: agg.correct
      };
    });

    const mistakes = answers
      .map((a, i) => ({ a, q: questions[i] }))
      .filter(({ a }) => !a.correct);

    return (
      <div className="rv3-page">
        <div className="rv3-wrap">
          <header className="rv3-head">
            {onBack && (
              <button className="rv3-back" onClick={onBack} aria-label="Back">
                ←
              </button>
            )}
            <div className="rv3-head-main">
              <span className="rv3-head-kicker">
                {language === 'fr' ? 'Session terminée' : 'Session complete'}
              </span>
              <h1 className="rv3-head-title">
                {pct >= 70
                  ? language === 'fr'
                    ? '🎉 Belle session !'
                    : '🎉 Nice session!'
                  : language === 'fr'
                    ? 'Session terminée'
                    : 'Session complete'}
              </h1>
            </div>
          </header>

          <section className="rv3-card rv3-card--result">
            <div className="rv3-result-summary">
              <div className="rv3-summary-main">
                <strong>
                  {correctCount}/{total}
                </strong>
                <span>{pct}%</span>
              </div>
              <div className="rv3-summary-xp">
                <span className="rv3-xp-value">+{xpEarned} XP</span>
                <span className="rv3-xp-detail">
                  {correctCount} × {REVIEW_XP_PER_CORRECT}
                  {pct >= 70 ? ` + ${REVIEW_XP_SESSION_BONUS}` : ''} XP
                </span>
              </div>
            </div>
          </section>

          <section className="rv3-card">
            <h3>
              {language === 'fr'
                ? `🎯 Leçons touchées (${touched.length})`
                : `🎯 Lessons touched (${touched.length})`}
            </h3>
            <ul className="rv3-touched">
              {touched.map((t) => {
                const delta = t.masteryAfter - t.masteryBefore;
                return (
                  <li key={t.lessonId} className="rv3-touched-row">
                    <div className="rv3-touched-header">
                      <span className="rv3-touched-title">
                        {language === 'fr' ? t.titleFr : t.titleEn}
                      </span>
                      <span className="rv3-touched-score">
                        {t.correctCount}/{t.questionCount}
                      </span>
                    </div>
                    <div className="rv3-mastery-row">
                      <span className="rv3-mastery-before">
                        {t.masteryBefore}%
                      </span>
                      <div className="rv3-mastery-bar">
                        <div
                          className="rv3-mastery-bar-fill"
                          style={{ width: `${t.masteryAfter}%` }}
                        />
                      </div>
                      <span
                        className={`rv3-mastery-after${delta >= 0 ? ' up' : ' down'}`}
                      >
                        {t.masteryAfter}%{' '}
                        <small>
                          {delta >= 0 ? '+' : ''}
                          {delta}
                        </small>
                      </span>
                    </div>
                    <span className="rv3-next-review">
                      🗓{' '}
                      {language === 'fr' ? 'Prochaine révision : ' : 'Next review: '}
                      {new Date(t.nextReviewAt).toLocaleDateString(
                        language === 'fr' ? 'fr-FR' : 'en-US',
                        { day: 'numeric', month: 'short' }
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          {mistakes.length > 0 && (
            <section className="rv3-card">
              <h3>
                {language === 'fr'
                  ? `📝 Erreurs (${mistakes.length})`
                  : `📝 Mistakes (${mistakes.length})`}
              </h3>
              <ul className="rv3-mistake-list">
                {mistakes.map(({ a, q }) => {
                  const meta = lessonIndex.get(q.lessonId);
                  return (
                    <li key={q.id} className="rv3-mistake">
                      <span className="rv3-mistake-prompt">
                        {language === 'fr'
                          ? q.promptFr
                          : q.promptEn ?? q.promptFr}
                      </span>
                      <div className="rv3-mistake-compare">
                        <span className="rv3-mistake-wrong">
                          {language === 'fr' ? 'Ta réponse : ' : 'Your answer: '}
                          <em>{q.choices[a.selectedIndex]}</em>
                        </span>
                        <span className="rv3-mistake-right">
                          {language === 'fr' ? 'Correct : ' : 'Correct: '}
                          <strong>{q.choices[q.correctIndex]}</strong>
                        </span>
                      </div>
                      {onOpenLesson && meta && (
                        <button
                          type="button"
                          className="rv3-mistake-link"
                          onClick={() => onOpenLesson(q.lessonId)}
                        >
                          {language === 'fr' ? '↗ Refaire la leçon' : '↗ Redo the lesson'}
                          {' — '}
                          <em>{language === 'fr' ? meta.titleFr : meta.titleEn}</em>
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <div className="rv3-actions rv3-actions--footer">
            <button
              type="button"
              className="rv3-btn rv3-btn--ghost"
              onClick={() => setPhase('landing')}
            >
              {language === 'fr' ? 'Autre session' : 'Another session'}
            </button>
            {onBack && (
              <button
                type="button"
                className="rv3-btn rv3-btn--primary"
                onClick={onBack}
              >
                {language === 'fr' ? 'Terminé' : 'Done'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ============================================================================
//  HELPERS
// ============================================================================

const modeLabel = (m: ReviewMode, lang: Language): string => {
  const map: Record<ReviewMode, { fr: string; en: string }> = {
    'smart-mix': { fr: 'Smart Mix', en: 'Smart Mix' },
    daily: { fr: 'Du jour', en: 'Daily' },
    weakness: { fr: 'Faiblesses', en: 'Weaknesses' },
    free: { fr: 'Libre', en: 'Free' }
  };
  return lang === 'fr' ? map[m].fr : map[m].en;
};

const sourceLabel = (
  s: ReviewQuestion['source'],
  lang: Language
): string => {
  const map: Record<ReviewQuestion['source'], { fr: string; en: string }> = {
    quiz: { fr: 'Quiz', en: 'Quiz' },
    dialogue: { fr: 'Dialogue', en: 'Dialogue' },
    vocab: { fr: 'Vocabulaire', en: 'Vocabulary' }
  };
  return lang === 'fr' ? map[s].fr : map[s].en;
};
