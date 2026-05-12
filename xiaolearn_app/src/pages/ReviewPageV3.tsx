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
import { useCallback, useEffect, useMemo, useState } from 'react';
import { playHanziAudio, playAudioWithFallback } from '../utils/audio';
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
import OrderQuestion from '../components/review/OrderQuestion';
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

// Tailles de session : on pioche désormais ~20 questions par défaut pour offrir
// une vraie variété (avant : 10 → l'utilisateur tournait toujours sur les
// mêmes leçons et finissait sa session en 1-2 minutes).
const SESSION_SIZE_BY_MODE: Record<ReviewMode, number> = {
  'smart-mix': 20,
  daily: 20,
  weakness: 15,
  free: 20
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
      .slice(0, 20);
  }

  if (mode === 'weakness') {
    return Object.values(masteryMap)
      .filter((e) => e.mastery < 60)
      .sort((a, b) => a.mastery - b.mastery)
      .map((e) => e.lessonId)
      .slice(0, 15);
  }

  // smart-mix : on combine due + fragiles + récentes (jamais révisées) +
  // PADDING avec n'importe quelle leçon complétée pour garantir un pool
  // suffisant. Sans padding, un nouveau compte avec 0 entrée SRS se
  // retrouvait avec seulement 2 leçons → max 6 questions, alors que
  // l'utilisateur peut avoir choisi un cap de 20.
  const SMART_MIX_CAP = SESSION_SIZE_BY_MODE['smart-mix'];
  const due = Object.values(masteryMap).filter(
    (e) => new Date(e.nextReviewAt).getTime() <= now
  );
  const weak = Object.values(masteryMap).filter(
    (e) => e.mastery < 60 && new Date(e.nextReviewAt).getTime() > now
  );
  const recent = completedList.filter((id) => !masteryMap[id]);

  const seen = new Set<string>();
  const pick: string[] = [];
  const pushUnique = (id: string) => {
    if (seen.has(id)) return;
    seen.add(id);
    pick.push(id);
  };

  // Priorité 1 : leçons dues (≈ 70% du pool quand dispo).
  due
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.ceil(SMART_MIX_CAP * 0.7))
    .forEach((e) => pushUnique(e.lessonId));

  // Priorité 2 : leçons fragiles (≈ 20%).
  weak
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.ceil(SMART_MIX_CAP * 0.2))
    .forEach((e) => pushUnique(e.lessonId));

  // Priorité 3 : récentes jamais révisées (≈ 10% mais pas de hard cap).
  recent
    .sort(() => Math.random() - 0.5)
    .forEach((id) => {
      if (pick.length < SMART_MIX_CAP) pushUnique(id);
    });

  // Padding final : si le pool est encore trop petit (compte neuf, beaucoup
  // de leçons déjà révisées et non-dues), on rajoute n'importe quelle leçon
  // complétée pour atteindre le cap. C'est ce qui garantit qu'un sélecteur
  // "20 questions" donne réellement 20 questions (sous réserve qu'il y ait
  // assez de leçons complétées et d'exercices).
  if (pick.length < SMART_MIX_CAP) {
    completedList
      .sort(() => Math.random() - 0.5)
      .forEach((id) => {
        if (pick.length < SMART_MIX_CAP) pushUnique(id);
      });
  }

  return pick;
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
    // shuffle + pick 3 (avant : 2 — on offre plus de variété par leçon, le cap
    // global SESSION_SIZE_BY_MODE limite quand même la session).
    const shuffled = [...raw].sort(() => Math.random() - 0.5).slice(0, 3);
    for (const ex of shuffled) {
      questions.push({
        id: ex.id,
        source: ex.type === 'fill' ? 'dialogue' : 'quiz',
        // 'order' = drag-and-drop d'ordonnancement (cf. OrderQuestion).
        // Les autres types restent en MCQ standard.
        kind: ex.type === 'order' ? 'order' : 'mcq',
        lessonId,
        level: meta.level,
        promptFr: ex.prompt,
        promptEn: ex.promptEn,
        contextFr: ex.sentence,
        contextEn: ex.sentenceEn,
        choices: ex.choices,
        correctIndex: ex.correctIndex,
        explanationFr: ex.explanation,
        explanationEn: ex.explanationEn,
        // Champs audio (questions "Écoute" du module Pinyin). Sans cette
        // propagation, le bouton 🔊 ne s'affichait pas dans la SmartMix card
        // et l'apprenant ne pouvait pas écouter le son à reconnaître.
        audioHanzi: (ex as { audioHanzi?: string }).audioHanzi,
        audio: (ex as { audio?: string }).audio,
        autoPlay: (ex as { autoPlay?: boolean }).autoPlay
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
  const [questionCount, setQuestionCount] = useState<10 | 15 | 20>(10);
  const [questions, setQuestions] = useState<ReviewQuestion[]>([]);
  // Pour les questions de type 'order' : séquence courante de l'utilisateur
  // (positions des choices d'origine). Reset à chaque question.
  const [orderSeq, setOrderSeq] = useState<number[] | null>(null);
  const handleOrderChange = useCallback((seq: number[]) => {
    setOrderSeq(seq);
  }, []);
  const [cursor, setCursor] = useState(0);
  const [answers, setAnswers] = useState<AnsweredReview[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [masteryBefore, setMasteryBefore] = useState<
    Record<string, number>
  >({});

  const lessonIndex = useMemo(buildLessonIndex, []);

  // --- Stats landing ----------------------------------------------------
  // Stable jusqu'à un changement de masteryMap : sans ça, `dueLessons` (et tout
  // ce qui en dépend) recalculait à chaque render → effet de bord visible sur
  // la pill "Va cibler N leçons" qui re-shuffle (Math.random dans
  // pickLessonsForMode).
  const now = useMemo(() => Date.now(), [masteryMap]);
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

  // Pool de leçons à proposer pour la session — mémoisé pour éviter de
  // re-shuffler à chaque render (les chips "Va cibler N leçons" changeaient
  // toutes les 100 ms à cause de Math.random dans pickLessonsForMode).
  // Recalcul uniquement quand mode / freeCount / état SRS changent.
  const previewIds = useMemo(
    () => pickLessonsForMode(mode, freeCount, completedLessonIds, masteryMap),
    [mode, freeCount, completedLessonIds, masteryMap]
  );
  const previewLessons = useMemo(
    () =>
      previewIds
        .map((id) => lessonIndex.get(id))
        .filter((m): m is LessonMeta => Boolean(m)),
    [previewIds, lessonIndex]
  );

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
    const cap = questionCount;
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
    setOrderSeq(null);
    setRevealed(false);
    setMode(picked);
    setPhase('running');
  };

  const currentQ = questions[cursor];

  // Auto-play l'audio quand la question change ET qu'elle est marquée
  // `autoPlay: true` (cas des discriminations de tons : on veut que
  // l'apprenant entende le son immédiatement plutôt que de devoir cliquer).
  // L'effet se déclenche aussi au "revealed=false" (nouvelle question),
  // pas à chaque re-render.
  useEffect(() => {
    if (!currentQ?.autoPlay) return;
    if (currentQ.audioHanzi) {
      playHanziAudio(currentQ.audioHanzi).catch(() => {});
    } else if (currentQ.audio) {
      playAudioWithFallback(currentQ.audio).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQ?.id]);

  const submitAnswer = () => {
    if (!currentQ) return;
    let correct = false;
    let recordedIdx = -1;
    if (currentQ.kind === 'order') {
      if (!orderSeq || orderSeq.length !== currentQ.choices.length) return;
      // Séquence correcte : chaque slot contient son index d'origine.
      correct = orderSeq.every((origIdx, slotIdx) => origIdx === slotIdx);
      // On encode la séquence dans selectedIndex juste pour les analytics —
      // jamais relu côté UI. -1 si fausse, 0 si juste : minimal et lisible.
      recordedIdx = correct ? 0 : -1;
    } else {
      if (selectedIdx === null) return;
      correct = selectedIdx === currentQ.correctIndex;
      recordedIdx = selectedIdx;
    }
    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        lessonId: currentQ.lessonId,
        selectedIndex: recordedIdx,
        correct
      }
    ]);
    setRevealed(true);
  };

  const goNext = () => {
    setRevealed(false);
    setSelectedIdx(null);
    setOrderSeq(null);
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
    const MODE_DEFS: Array<{
      id: ReviewMode;
      icon: string;
      titleFr: string;
      titleEn: string;
      descFr: string;
      descEn: string;
      badge: number | null;
    }> = [
      {
        id: 'smart-mix',
        icon: '✨',
        titleFr: 'Smart Mix',
        titleEn: 'Smart Mix',
        descFr: 'Leçons dues + fragiles + récentes.',
        descEn: 'Due + fragile + recent lessons.',
        badge: null
      },
      {
        id: 'daily',
        icon: '⚡',
        titleFr: 'Du jour',
        titleEn: 'Daily',
        descFr:
          dueLessons.length > 0
            ? 'Leçons dont la révision est programmée.'
            : "Aucune leçon programmée pour aujourd'hui.",
        descEn:
          dueLessons.length > 0
            ? 'Lessons scheduled for review.'
            : 'No lessons scheduled for today.',
        badge: dueLessons.length > 0 ? dueLessons.length : null
      },
      {
        id: 'weakness',
        icon: '⚠️',
        titleFr: 'Mes faiblesses',
        titleEn: 'My weaknesses',
        descFr: 'Leçons maîtrisées à < 60 %.',
        descEn: 'Lessons with mastery < 60%.',
        badge: weakLessons.length > 0 ? weakLessons.length : null
      },
      {
        id: 'free',
        icon: '🔀',
        titleFr: 'Libre',
        titleEn: 'Free',
        descFr: 'Tes N dernières leçons complétées.',
        descEn: 'Your N most recent completed lessons.',
        badge: null
      }
    ];

    // `previewIds` / `previewLessons` sont mémoisés au niveau du composant
    // pour éviter le re-shuffle à chaque render. Voir useMemo plus haut.
    const canStart = previewLessons.length > 0;
    // Nombre RÉEL de leçons qui contribueront à la session : on pioche jusqu'à
    // 3 questions par leçon dans `buildQuestionsForLessons`, donc on touche
    // au plus ceil(questionCount / 3) leçons. C'est ce nombre qu'on affiche
    // dans la pill "Va cibler N leçons" pour ne pas mentir à l'utilisateur
    // (le pool brut peut contenir 14-20 leçons, mais seulement 4-7 sont
    // réellement utilisées avec un cap de 10-20 questions).
    const QUESTIONS_PER_LESSON = 3;
    const targetedCount =
      mode === 'free'
        ? Math.min(previewLessons.length, freeCount)
        : Math.min(
            previewLessons.length,
            Math.ceil(questionCount / QUESTIONS_PER_LESSON)
          );
    const targetedLessons = previewLessons.slice(0, targetedCount);

    const fragileList = Object.values(masteryMap)
      .filter((e) => e.mastery < 60)
      .sort((a, b) => a.mastery - b.mastery)
      .slice(0, 5);

    const completedCount = completedLessonIds.size;
    const masteredCount = Object.values(masteryMap).filter(
      (e) => e.mastery >= 80
    ).length;

    const ctaLabel = (): string => {
      // Pour le CTA on utilise `targetedCount` (= leçons réellement touchées
      // par la session) plutôt que `previewLessons.length` (= pool brut),
      // pour rester cohérent avec la pill "Va cibler N leçons" au-dessus.
      const count = targetedCount;
      if (language === 'fr') {
        switch (mode) {
          case 'smart-mix':
            return count > 0 ? `Commencer la révision →` : 'Aucune leçon à réviser';
          case 'daily':
            return count > 0 ? `Réviser mes ${count} leçons du jour →` : 'Aucune leçon du jour';
          case 'weakness':
            return count > 0 ? `Cibler mes ${count} faiblesses →` : 'Aucune faiblesse détectée';
          case 'free':
            return count > 0 ? `Réviser mes ${count} dernières leçons →` : 'Aucune leçon complétée';
        }
      } else {
        switch (mode) {
          case 'smart-mix':
            return count > 0 ? `Start review →` : 'Nothing to review';
          case 'daily':
            return count > 0 ? `Review ${count} lessons due today →` : 'No daily lessons';
          case 'weakness':
            return count > 0 ? `Target my ${count} weaknesses →` : 'No weaknesses';
          case 'free':
            return count > 0 ? `Review my last ${count} lessons →` : 'No completed lessons';
        }
      }
      return '';
    };

    const perimeterLabel = (n: ReviewFreeCount): string => {
      if (n === 3) return language === 'fr' ? 'Rapide' : 'Quick';
      if (n === 6) return language === 'fr' ? 'Standard' : 'Standard';
      return language === 'fr' ? 'Approfondi' : 'Deep';
    };

    return (
      <div className="rv3-page">
        <div className="rv3-layout">
          <div className="rv3-main">
            <header className="rv3-header">
              <div className="rv3-header-icon" aria-hidden="true">🧠</div>
              <div className="rv3-header-text">
                <h1 className="rv3-header-title">
                  {language === 'fr' ? 'Révisions' : 'Reviews'}
                </h1>
                <p className="rv3-header-sub">
                  {language === 'fr'
                    ? 'Quiz multi-leçons pour valider tes acquis'
                    : 'Multi-lesson quizzes to validate your progress'}
                </p>
              </div>
              <div className="rv3-stats-badge" aria-label="stats">
                <div className="rv3-stat-cell">
                  <strong>{completedCount}</strong>
                  <span>{language === 'fr' ? 'Terminées' : 'Completed'}</span>
                </div>
                <div className="rv3-stat-divider" aria-hidden="true" />
                <div className="rv3-stat-cell">
                  <strong>{masteredCount}</strong>
                  <span>{language === 'fr' ? 'Maîtrisées' : 'Mastered'}</span>
                </div>
              </div>
            </header>

            <section className="rv3-panel">
              <h2 className="rv3-panel-title">
                <span className="rv3-panel-title-icon" aria-hidden="true">◎</span>
                {language === 'fr' ? 'Démarrer une session' : 'Start a session'}
              </h2>
              <p className="rv3-panel-intro">
                {language === 'fr'
                  ? 'Choisis le périmètre et le nombre de questions. Le quiz mélange questions de leçon, compréhension de phrases et vocabulaire.'
                  : 'Pick a scope and a question count. The quiz mixes lesson questions, sentence comprehension, and vocabulary.'}
              </p>

              <div className="rv3-section-label">
                {language === 'fr' ? 'Mode de révision' : 'Review mode'}
              </div>
              <div className="rv3-modes-grid">
                {MODE_DEFS.map((m) => {
                  const selected = mode === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      className={`rv3-mode-card${selected ? ' selected' : ''}`}
                      onClick={() => setMode(m.id)}
                    >
                      <span className="rv3-mode-card-icon" aria-hidden="true">
                        {m.icon}
                      </span>
                      <div className="rv3-mode-card-body">
                        <span className="rv3-mode-card-title">
                          {language === 'fr' ? m.titleFr : m.titleEn}
                        </span>
                        <span className="rv3-mode-card-desc">
                          {language === 'fr' ? m.descFr : m.descEn}
                        </span>
                      </div>
                      {m.badge != null && m.badge > 0 && (
                        <span
                          className={`rv3-mode-card-badge${
                            m.id === 'weakness' ? ' warn' : ''
                          }`}
                        >
                          {m.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="rv3-preview">
                <div className="rv3-preview-label">
                  <span aria-hidden="true">📖</span>
                  <span>
                    {language === 'fr'
                      ? `Va cibler ${targetedCount} leçon${
                          targetedCount > 1 ? 's' : ''
                        }`
                      : `Will target ${targetedCount} lesson${
                          targetedCount > 1 ? 's' : ''
                        }`}
                  </span>
                </div>
                {targetedLessons.length > 0 ? (
                  <div className="rv3-preview-chips">
                    {targetedLessons.slice(0, 8).map((lm) => (
                      <span key={lm.lessonId} className="rv3-chip">
                        {language === 'fr' ? lm.titleFr : lm.titleEn}
                      </span>
                    ))}
                    {targetedLessons.length > 8 && (
                      <span className="rv3-chip rv3-chip--more">
                        +{targetedLessons.length - 8}
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="rv3-preview-empty">
                    {language === 'fr'
                      ? 'Aucune leçon ne correspond à ce mode pour le moment.'
                      : 'No lessons match this mode right now.'}
                  </p>
                )}
              </div>

              {mode === 'free' && (
                <>
                  <div className="rv3-section-label">
                    {language === 'fr' ? 'Périmètre' : 'Scope'}
                  </div>
                  <div className="rv3-perimeter">
                    {([3, 6, 10] as ReviewFreeCount[]).map((n) => (
                      <button
                        key={n}
                        type="button"
                        className={`rv3-perimeter-pill${
                          freeCount === n ? ' active' : ''
                        }`}
                        onClick={() => setFreeCount(n)}
                      >
                        <strong>{n}</strong>
                        <span>{perimeterLabel(n)}</span>
                        <em>
                          {n} {language === 'fr' ? 'leçons' : 'lessons'}
                        </em>
                      </button>
                    ))}
                  </div>
                </>
              )}

              <div className="rv3-section-label">
                {language === 'fr' ? 'Nombre de questions' : 'Question count'}
              </div>
              <div className="rv3-qcount">
                {([10, 15, 20] as const).map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`rv3-qcount-pill${
                      questionCount === n ? ' active' : ''
                    }`}
                    onClick={() => setQuestionCount(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="rv3-cta"
                disabled={!canStart}
                onClick={() => startSession(mode, freeCount)}
              >
                {ctaLabel()}
              </button>
            </section>
          </div>

          <aside className="rv3-aside">
            <div className="rv3-aside-card">
              <h3 className="rv3-aside-title">
                <span aria-hidden="true">⚠️</span>
                {language === 'fr' ? 'Leçons fragiles' : 'Fragile lessons'}
              </h3>
              {fragileList.length > 0 ? (
                <ul className="rv3-fragile-list">
                  {fragileList.map((e) => {
                    const meta = lessonIndex.get(e.lessonId);
                    const title = meta
                      ? language === 'fr'
                        ? meta.titleFr
                        : meta.titleEn
                      : e.lessonId;
                    const redish = e.mastery < 50;
                    return (
                      <li key={e.lessonId} className="rv3-fragile-item">
                        <div className="rv3-fragile-row">
                          <span className="rv3-fragile-title">{title}</span>
                          <span
                            className={`rv3-fragile-pct${
                              redish ? ' red' : ''
                            }`}
                          >
                            {e.mastery}%
                          </span>
                        </div>
                        <div className="rv3-fragile-bar">
                          <div
                            className={`rv3-fragile-bar-fill${
                              redish ? ' red' : ''
                            }`}
                            style={{ width: `${Math.max(6, e.mastery)}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="rv3-aside-empty">
                  {language === 'fr'
                    ? 'Aucune leçon fragile pour le moment.'
                    : 'No fragile lessons yet.'}
                </p>
              )}
              <button
                type="button"
                className="rv3-fragile-cta"
                onClick={() => setMode('weakness')}
                disabled={weakLessons.length === 0}
              >
                <span aria-hidden="true">⚠️</span>
                {language === 'fr'
                  ? 'Cibler mes faiblesses'
                  : 'Target my weaknesses'}
              </button>
            </div>

            <div className="rv3-aside-card">
              <h3 className="rv3-aside-title">
                <span aria-hidden="true">✨</span>
                {language === 'fr'
                  ? 'Ce que tu vas réviser'
                  : 'What you will review'}
              </h3>
              <ul className="rv3-explainer">
                <li>
                  <span className="rv3-explainer-icon" aria-hidden="true">🎓</span>
                  <div>
                    <strong>
                      {language === 'fr'
                        ? 'Questions de leçon'
                        : 'Lesson questions'}
                    </strong>
                    <span>
                      {language === 'fr'
                        ? 'vraies questions issues de tes leçons.'
                        : 'real questions from your lessons.'}
                    </span>
                  </div>
                </li>
                <li>
                  <span className="rv3-explainer-icon" aria-hidden="true">💬</span>
                  <div>
                    <strong>
                      {language === 'fr'
                        ? 'Compréhension de dialogues'
                        : 'Dialogue comprehension'}
                    </strong>
                    <span>
                      {language === 'fr'
                        ? 'phrases tirées des dialogues.'
                        : 'sentences pulled from dialogues.'}
                    </span>
                  </div>
                </li>
                <li>
                  <span className="rv3-explainer-icon" aria-hidden="true">📄</span>
                  <div>
                    <strong>
                      {language === 'fr'
                        ? 'Vocabulaire clé'
                        : 'Key vocabulary'}
                    </strong>
                    <span>
                      {language === 'fr'
                        ? 'quelques mots à garder frais.'
                        : 'a few words to keep sharp.'}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
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
            {/* Bouton audio pour les questions "Écoute" (catégorie listening
                du module Pinyin) — sans lui, l'apprenant ne peut pas
                réellement écouter le son à identifier. Pour les questions
                avec `audioHanzi`, on utilise playHanziAudio qui résout
                automatiquement vers R2 via VITE_AUDIO_BASE_URL.
                `autoPlay` joue le son une fois au montage de la question. */}
            {(currentQ.audioHanzi || currentQ.audio) && (
              <button
                type="button"
                className="rv3-q-audio-btn"
                aria-label={language === 'fr' ? 'Écouter' : 'Listen'}
                onClick={() => {
                  if (currentQ.audioHanzi) {
                    playHanziAudio(currentQ.audioHanzi).catch(() => {});
                  } else if (currentQ.audio) {
                    playAudioWithFallback(currentQ.audio).catch(() => {});
                  }
                }}
              >
                🔊 {language === 'fr' ? 'Écouter' : 'Listen'}
              </button>
            )}

            {currentQ.kind === 'order' ? (
              <OrderQuestion
                choices={currentQ.choices}
                revealed={revealed}
                onSequenceChange={handleOrderChange}
                language={language}
              />
            ) : (
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
            )}

            {revealed && (
              <div
                className={`rv3-expl rv3-expl--${
                  (currentQ.kind === 'order'
                    ? orderSeq?.every((o, i) => o === i)
                    : selectedIdx === currentQ.correctIndex)
                    ? 'ok'
                    : 'ko'
                }`}
              >
                <strong>
                  {(currentQ.kind === 'order'
                    ? orderSeq?.every((o, i) => o === i)
                    : selectedIdx === currentQ.correctIndex)
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
                  disabled={
                    currentQ.kind === 'order'
                      ? !orderSeq || orderSeq.length !== currentQ.choices.length
                      : selectedIdx === null
                  }
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
