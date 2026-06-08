/**
 * HomePageV2 — Dashboard XiaoLearn inspiré de Seonsaengnim
 * =========================================================
 *
 * Drop-in ciblé pour remplacer HomePage.tsx. Les props sont pensées pour
 * se brancher sur les hooks déjà en place dans ton App.tsx :
 *
 *   <HomePageV2
 *     copy={getCopy(language)}
 *     language={language}
 *     progress={lessonProgress}           // = useLessonProgress(...)
 *     reviewItems={reviewItems}           // du même hook
 *     dueCardsCount={dueCardsCount}       // calculé depuis ReviewPage / SRS
 *     onStartReview={() => setActivePage('review')}
 *     onOpenLesson={(id) => openLesson(id)}
 *     onOpenAiTutor={() => toggleAiChat(true)}
 *     onOpenPath={() => setActivePage('lesson-paths')}
 *   />
 *
 * Tout le layout est "composant-par-composant" dans ce fichier pour faciliter
 * la relecture. Quand ça te plaît, tu peux éclater dans src/components/dashboard/.
 *
 * Mapping vers Seonsaengnim (cf. notes):
 *   - Bloc "Bonjour {prénom} + streak"             → `DashboardHeader`
 *   - Bloc "🎯 Objectif du jour"                   → `DailyGoalCard`
 *   - Bloc "📚 Ton parcours — Niveau X"            → `PathProgressCard`
 *   - Bloc "🃏 Flashcards — mots maîtrisés"        → `FlashcardsCard`
 *   - Bloc "💬 Prof. Park / Ton assistante"        → `AiTutorCard`
 *   - Bloc "🌅 Mot du jour"                        → `WordOfTheDayCard`
 *   - Bloc "Streak + XP + niveau"                  → `StreakXpCard`
 *   - Bloc "Calendrier d'activité"                 → `ActivityHeatmap`
 *   - Bloc "👥 Communauté / Batailles de mots"     → `CommunityCard`
 */

import { useEffect, useMemo, useState } from 'react';
import type { LessonItem, LevelId } from '../types';
import type { Language } from '../i18n';
import type { getCopy } from '../i18n';
import type { LessonPath } from '../types/lesson-structure';
import type { CecrLevelMeta } from '../data/cecr-course';
import { getLessonTranslation } from '../utils/lesson';
import { playHanziAudio } from '../utils/audio';
import LevelBadge from '../components/LevelBadge';
import { useDashboardState } from '../hooks/useDashboardState';
import { useStudyTimer } from '../hooks/useStudyTimer';
import {
  StreakMultiplierBadge,
  StreakBonusPanel
} from '../components/StreakBonus';
import '../styles/dashboard-v2.css';

// --------------------------------------------------------------------------
// Types d'entrée
// --------------------------------------------------------------------------

interface LessonProgressLike {
  currentLesson: LessonItem;
  todaySummary: LessonItem[];
  progressPercent: number;
  totals: Record<LevelId, number>;
  hasProgress: boolean;
  learnedWordIds: string[];
  allLearnedItems: LessonItem[];
}

export interface HomePageV2Props {
  copy: ReturnType<typeof getCopy>;
  language: Language;
  progress: LessonProgressLike;
  reviewItems: LessonItem[];
  dueCardsCount: number;
  userDisplayName?: string;
  /**
   * Parcours CECR + métadonnées de niveau, pour alimenter le CecrLevelSelector.
   * Si non fourni, retombe sur l'ancien PathProgressCard.
   */
  cecrPaths?: LessonPath[];
  cecrLevels?: CecrLevelMeta[];
  /** Ids de leçons déjà complétées (source : completedLessons de App.tsx). */
  completedLessonIds?: Set<string>;
  onStartReview: () => void;
  /**
   * Ouvre la page Flashcards (sessions SRS sur cartes individuelles).
   * Distincte de `onStartReview` qui mène à la page Révisions multi-leçons.
   * Utilisée par la ligne « X cartes à réviser » de l'Objectif du jour.
   */
  onOpenFlashcards?: () => void;
  /** Nombre de cartes individuelles dues en SRS (≠ leçons à revoir). */
  dueFlashcardsCount?: number;
  onOpenLesson: (lessonId: string) => void;
  onOpenAiTutor: (prompt?: string) => void;
  onOpenPath: () => void;
  onOpenDialogue?: () => void;
  onOpenReading?: () => void;
  /**
   * Ajoute le mot du jour aux flashcards personnelles. Retourne `'added'` si
   * la carte est bien créée, `'duplicate'` si elle existait déjà,
   * `'capacity'` si le pool de 500 cartes est plein, `'error'` sinon.
   */
  onAddWordToFlashcards?: (word: LessonItem) => 'added' | 'duplicate' | 'capacity' | 'error';
  /** Ouvre la page Annonces (item "Communauté" du sidebar). */
  onOpenAnnouncements?: () => void;
  /** Ouvre la page Batailles de mots (1-v-1 multijoueur). */
  onOpenBattles?: () => void;
  /** Ouvre la messagerie 1-1 entre apprenants. */
  onOpenMessages?: () => void;
  /** Ouvre la page Idées & Roadmap (votes communautaires + planning). */
  onOpenIdeas?: () => void;
  /** Nombre d'annonces non lues (affiché en badge sur la carte Communauté). */
  unreadAnnouncementsCount?: number;
}

// --------------------------------------------------------------------------
// Header : salutation + streak
// --------------------------------------------------------------------------

const DashboardHeader = ({
  language,
  userDisplayName,
  streakDays,
  isAliveToday,
  bonus
}: {
  language: Language;
  userDisplayName?: string;
  streakDays: number;
  isAliveToday: boolean;
  bonus: ReturnType<typeof useDashboardState>['bonus'];
}) => {
  const hello = language === 'fr' ? 'Bonjour' : 'Hello';
  const series =
    language === 'fr'
      ? `${streakDays} ${streakDays > 1 ? 'jours' : 'jour'} de série`
      : `${streakDays}-day streak`;
  return (
    <header className="dash-header">
      <h1 className="dash-greet">
        {hello} {userDisplayName ?? ''} <span className="dash-wave">👋</span>
      </h1>
      <p className={`dash-streak-line ${isAliveToday ? 'alive' : 'cold'}`}>
        <span className="dash-flame">{isAliveToday ? '🔥' : '❄️'}</span>
        <span>{series}</span>
        <StreakMultiplierBadge bonus={bonus} language={language} size="md" />
      </p>
    </header>
  );
};

// --------------------------------------------------------------------------
// 🎯 Objectif du jour
// --------------------------------------------------------------------------

const DailyGoalCard = ({
  language,
  goal,
  streakAlive,
  onStartReview,
  onOpenFlashcards,
  dueFlashcardsCount,
  onOpenLesson,
  onEditTimer,
  lessonToResumeId
}: {
  language: Language;
  goal: ReturnType<typeof useDashboardState>['dailyGoal'];
  streakAlive: boolean;
  onStartReview: () => void;
  /** Ouvre la page Flashcards (mode SRS individuel). */
  onOpenFlashcards?: () => void;
  /** Compte vrai de cartes individuelles dues (≠ leçons). */
  dueFlashcardsCount?: number;
  onOpenLesson: (id: string) => void;
  onEditTimer?: (minutes: number) => void;
  lessonToResumeId?: string;
}) => {
  // Picker inline pour le timer d'étude. On garde volontairement simple :
  // une rangée de presets (5 / 10 / 15 / 20 / 25 / 30 min) qui se déplie
  // sous le header. `open` vient d'un useState local (pas besoin de Firestore).
  const [timerEditOpen, setTimerEditOpen] = useState(false);
  const TIMER_PRESETS = [5, 10, 15, 20, 25, 30];

  // Timer d'étude global (visible aussi via `<FloatingTimer />` sur toutes
  // les pages). Le même hook est instancié ici pour que le DailyGoalCard
  // reflète en live l'état running / paused / idle (localStorage = source
  // de vérité partagée).
  const studyTimer = useStudyTimer();
  const displayMm = studyTimer.isRunning || studyTimer.isPaused
    ? Math.floor(studyTimer.remainingMs / 60_000)
    : goal.timerMinutes;
  const displaySs = studyTimer.isRunning || studyTimer.isPaused
    ? Math.floor((studyTimer.remainingMs % 60_000) / 1000)
    : 0;
  // Si on a un vrai compte de flashcards dues (cartes individuelles SRS), on
  // l'utilise. Sinon fallback sur goal.cardsDue (compte de leçons à revoir).
  // Le bouton "Réviser" ouvre la page Flashcards si onOpenFlashcards est
  // fourni — sinon retombe sur la page Révisions multi-leçons.
  const flashcardsDue = dueFlashcardsCount ?? goal.cardsDue.current;
  const cardsTaskClick = onOpenFlashcards ?? onStartReview;
  // V11 — Une tâche n'est marquée DONE que si l'utilisateur a effectivement
  // une activité du jour (XP earned > 0). Avant ce fix, l'ouverture seule de
  // l'app déclenchait pingAlive() → streakAlive=true → tâches 1+2 cochées
  // automatiquement sans rien faire. Pareil pour "Aucune carte à réviser"
  // qui était marqué done même si le user n'avait jamais ouvert ses
  // flashcards, juste parce que la SRS n'avait rien à proposer.
  // Critère "vraie activité" = au moins 1 XP gagné aujourd'hui (révision,
  // leçon, exercice... toutes les sources awardXp comptent).
  const hasRealActivityToday = goal.xpGoal.current > 0;
  const done =
    (flashcardsDue === 0 && hasRealActivityToday ? 1 : 0) +
    (goal.xpGoal.current >= goal.xpGoal.target ? 1 : 0) +
    (hasRealActivityToday ? 1 : 0);

  const tasks = [
    {
      icon: '🃏',
      // V11 — 3 états visuels :
      //  - flashcardsDue > 0 : "X cartes à réviser" + bouton Réviser
      //  - flashcardsDue === 0 && hasRealActivityToday : "Révision terminée"
      //    (label gratifiant car l'utilisateur a fait le travail aujourd'hui)
      //  - flashcardsDue === 0 && !hasRealActivityToday : "Aucune carte à
      //    réviser" (état neutre, SRS n'a rien à proposer)
      label:
        flashcardsDue === 0
          ? hasRealActivityToday
            ? language === 'fr'
              ? 'Révision terminée'
              : 'Review completed'
            : language === 'fr'
              ? 'Aucune carte à réviser'
              : 'No cards to review'
          : `${flashcardsDue} ${
              language === 'fr' ? 'cartes à réviser' : 'cards to review'
            }`,
      action:
        flashcardsDue > 0
          ? {
              label: language === 'fr' ? 'Réviser' : 'Review',
              onClick: cardsTaskClick
            }
          : null,
      // Coche seulement si "rien à réviser ET activité réelle aujourd'hui".
      // Sinon "rien à réviser" sans aucune action est trompeur (le user n'a
      // rien fait, l'objectif ne doit pas paraître accompli).
      done: flashcardsDue === 0 && hasRealActivityToday
    },
    {
      icon: '📚',
      label: goal.lessonToResume
        ? `${language === 'fr' ? 'Continuer' : 'Continue'} "${goal.lessonToResume.title}"`
        : language === 'fr'
        ? 'Aucune leçon en cours'
        : 'No lesson in progress',
      action:
        goal.lessonToResume
          ? {
              // Priorise l'id de la vraie leçon CECR portée par le goal. Si
              // absent (ancien code), retombe sur le lessonToResumeId hérité
              // (un id de mot SRS — imparfait mais historique).
              label: language === 'fr' ? 'Reprendre' : 'Resume',
              onClick: () => onOpenLesson(goal.lessonToResume?.id ?? lessonToResumeId ?? '')
            }
          : null,
      // V11 — coche basé sur l'activité réelle (XP earned > 0), pas
      // streakAlive (qui devient true juste à l'ouverture via pingAlive).
      // Sinon le simple fait d'ouvrir l'accueil cochait cette tâche.
      done: hasRealActivityToday
    },
    {
      icon: '⭐',
      label: `${language === 'fr' ? 'Gagner' : 'Earn'} ${goal.xpGoal.target} XP (${goal.xpGoal.current}/${goal.xpGoal.target})`,
      action: null,
      done: goal.xpGoal.current >= goal.xpGoal.target
    }
  ];

  return (
    <section className="card daily-goal-card">
      <header className="card-head">
        <h2>
          <span className="emoji">🎯</span>
          {language === 'fr' ? 'Objectif du jour' : 'Today\u2019s goal'}
        </h2>
        <span className="goal-counter">
          {done}/3
          <span className="goal-counter-ring" aria-hidden="true" />
        </span>
      </header>
      <ul className="goal-task-list">
        {tasks.map((task, idx) => (
          <li key={idx} className={task.done ? 'done' : ''}>
            <span
              className={`goal-checkbox ${task.done ? 'is-done' : ''}`}
              aria-hidden="true"
            >
              {task.done && <span className="goal-checkbox-tick">✓</span>}
            </span>
            <span className="task-icon">{task.icon}</span>
            <span className="task-label">{task.label}</span>
            {task.action && (
              <button type="button" className="btn-ghost" onClick={task.action.onClick}>
                {task.action.label} →
              </button>
            )}
          </li>
        ))}
      </ul>

      <hr className="goal-divider" />

      <div className="timer-head">
        <span className="timer-head-label">
          ⏱️ {language === 'fr' ? 'Timer d\u2019étude' : 'Study timer'} — {goal.timerMinutes} min
        </span>
        <button
          type="button"
          className="btn-link-small timer-edit"
          onClick={() => setTimerEditOpen((v) => !v)}
          aria-expanded={timerEditOpen}
          disabled={!onEditTimer}
        >
          ⚙ {language === 'fr' ? 'Modifier' : 'Edit'}
        </button>
      </div>
      {timerEditOpen && onEditTimer && (
        <div
          className="timer-edit-row"
          role="group"
          aria-label={language === 'fr' ? 'Durée du timer' : 'Timer duration'}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}
        >
          {TIMER_PRESETS.map((min) => (
            <button
              key={min}
              type="button"
              className={`btn-chip${goal.timerMinutes === min ? ' is-active' : ''}`}
              onClick={() => {
                onEditTimer(min);
                setTimerEditOpen(false);
              }}
            >
              {min} min
            </button>
          ))}
          <button
            type="button"
            className="btn-chip"
            onClick={() => {
              const raw = window.prompt(
                language === 'fr'
                  ? 'Durée du timer (en minutes, 1 à 120) :'
                  : 'Timer duration (minutes, 1–120):',
                String(goal.timerMinutes)
              );
              if (raw === null) return;
              const parsed = Number.parseInt(raw, 10);
              if (Number.isFinite(parsed) && parsed > 0) {
                onEditTimer(parsed);
                setTimerEditOpen(false);
              }
            }}
          >
            {language === 'fr' ? 'Autre…' : 'Other…'}
          </button>
        </div>
      )}

      <div className="timer-row">
        <div className="timer-circle" aria-label="study timer">
          <span className="timer-mm">{String(displayMm).padStart(2, '0')}</span>
          <span className="timer-sep">:</span>
          <span className="timer-ss">{String(displaySs).padStart(2, '0')}</span>
        </div>
        <div className="timer-actions">
          {studyTimer.isRunning ? (
            <button
              type="button"
              className="timer-btn timer-btn-play"
              aria-label={language === 'fr' ? 'Pause' : 'Pause'}
              onClick={studyTimer.pause}
            >
              ⏸
            </button>
          ) : (
            <button
              type="button"
              className="timer-btn timer-btn-play"
              aria-label={language === 'fr' ? 'Démarrer' : 'Start'}
              onClick={() => {
                if (studyTimer.isPaused) {
                  studyTimer.resume();
                } else {
                  studyTimer.start(goal.timerMinutes);
                }
              }}
            >
              ▶
            </button>
          )}
          <button
            type="button"
            className="timer-btn timer-btn-reset"
            aria-label={language === 'fr' ? 'Réinitialiser' : 'Reset'}
            onClick={studyTimer.stop}
            disabled={studyTimer.isIdle && !studyTimer.justFinished}
          >
            ⟲
          </button>
          <span className="timer-caption">
            {studyTimer.isRunning
              ? language === 'fr'
                ? 'Étude en cours…'
                : 'Studying…'
              : studyTimer.isPaused
              ? language === 'fr'
                ? 'En pause'
                : 'Paused'
              : language === 'fr'
              ? 'Prêt à étudier'
              : 'Ready to study'}
          </span>
        </div>
      </div>
    </section>
  );
};

// --------------------------------------------------------------------------
// 📚 Parcours (version condensée pour le dashboard)
// --------------------------------------------------------------------------

const PathProgressCard = ({
  language,
  progress,
  onOpenPath,
  onOpenLesson
}: {
  language: Language;
  progress: LessonProgressLike;
  onOpenPath: () => void;
  onOpenLesson: (id: string) => void;
}) => {
  const upcoming = progress.todaySummary.slice(0, 3);
  const next = upcoming[0];
  return (
    <section className="card path-card">
      <header className="card-head">
        <h2>
          <span className="emoji">📚</span>
          {language === 'fr' ? 'Ton parcours' : 'Your path'}
        </h2>
        <button type="button" className="btn-link" onClick={onOpenPath}>
          {language === 'fr' ? 'Voir tout' : 'See all'} →
        </button>
      </header>
      <div className="path-progress-row">
        <div className="path-label">
          <strong>HSK {mapLevelToNumber(next?.level ?? 'hsk1')}</strong>
          <span>— {hskToCecr(next?.level ?? 'hsk1')}</span>
        </div>
        <div className="path-bar">
          <div className="path-bar-fill" style={{ width: `${progress.progressPercent}%` }} />
        </div>
        <div className="path-pct">{progress.progressPercent}%</div>
      </div>
      <ul className="path-upnext">
        {upcoming.map((lesson, idx) => (
          <li key={lesson.id} className={idx === 0 ? 'current' : ''}>
            <button type="button" onClick={() => onOpenLesson(lesson.id)}>
              <LevelBadge level={lesson.level} />
              <div className="lesson-title">
                <span className="hanzi">{lesson.hanzi}</span>
                <span className="translation">{getLessonTranslation(lesson, language)}</span>
              </div>
              {idx === 0 && (
                <span className="current-tag">
                  {language === 'fr' ? 'Prochaine' : 'Next'}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

const mapLevelToNumber = (l: LevelId) => Number(String(l).replace('hsk', '')) || 1;
const hskToCecr = (l: LevelId) =>
  ({ hsk1: 'A1', hsk2: 'A2', hsk3: 'B1', hsk4: 'B2', hsk5: 'C1', hsk6: 'C2', hsk7: 'C2+' } as Record<string, string>)[l] ?? 'A1';

// --------------------------------------------------------------------------
// 🎓 CecrLevelSelector — ANCIENNE grille 10 niveaux CECR (legacy V9)
// V10 : la home utilise désormais CompactPathCard (plus proche de
// Seonsaengnim). On garde ce composant ici pour pouvoir le rebrancher
// facilement si besoin ; il n'est plus référencé dans le rendu principal.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// --------------------------------------------------------------------------

interface LevelStats {
  meta: CecrLevelMeta;
  totalModules: number;
  completedModules: number;
  percent: number;
  nextModuleId?: string;
  nextModuleTitle?: string;
  nextModuleTitleEn?: string;
  status: 'done' | 'active' | 'upcoming' | 'locked';
}

const computeLevelStats = (
  levels: CecrLevelMeta[],
  paths: LessonPath[],
  completed: Set<string>
): LevelStats[] => {
  const pathById = new Map(paths.map((p) => [p.id, p]));
  const stats: Omit<LevelStats, 'status'>[] = levels.map((meta) => {
    let totalModules = 0;
    let completedModules = 0;
    let nextModuleId: string | undefined;
    let nextModuleTitle: string | undefined;
    let nextModuleTitleEn: string | undefined;
    for (const pid of meta.pathIds) {
      const path = pathById.get(pid);
      if (!path) continue;
      for (const lesson of path.lessons) {
        totalModules += 1;
        if (completed.has(lesson.id)) {
          completedModules += 1;
        } else if (!nextModuleId) {
          nextModuleId = lesson.id;
          nextModuleTitle = lesson.title;
          nextModuleTitleEn = lesson.titleEn ?? lesson.title;
        }
      }
    }
    const percent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
    return { meta, totalModules, completedModules, percent, nextModuleId, nextModuleTitle, nextModuleTitleEn };
  });

  // Statut : premier niveau non terminé devient 'active', le suivant 'upcoming',
  // tous les autres 'locked'. Les niveaux à 100 % sont 'done'.
  let foundActive = false;
  let foundUpcoming = false;
  return stats.map((s) => {
    if (s.percent >= 100 && s.totalModules > 0) {
      return { ...s, status: 'done' as const };
    }
    if (!foundActive) {
      foundActive = true;
      return { ...s, status: 'active' as const };
    }
    if (!foundUpcoming) {
      foundUpcoming = true;
      return { ...s, status: 'upcoming' as const };
    }
    return { ...s, status: 'locked' as const };
  });
};

const STATUS_LABEL: Record<LevelStats['status'], { fr: string; en: string }> = {
  done: { fr: '✓ Terminé', en: '✓ Completed' },
  active: { fr: 'En cours', en: 'In progress' },
  upcoming: { fr: 'Prochain', en: 'Up next' },
  locked: { fr: '🔒 Verrouillé', en: '🔒 Locked' },
};

const CecrLevelSelector = ({
  language,
  levels,
  paths,
  completed,
  onOpenPath,
  onOpenLesson,
}: {
  language: Language;
  levels: CecrLevelMeta[];
  paths: LessonPath[];
  completed: Set<string>;
  onOpenPath: () => void;
  onOpenLesson: (lessonId: string) => void;
}) => {
  const stats = useMemo(() => computeLevelStats(levels, paths, completed), [levels, paths, completed]);
  const active = stats.find((s) => s.status === 'active');
  const continueLabel = language === 'fr' ? 'Continuer' : 'Continue';
  const totalModules = stats.reduce((a, s) => a + s.totalModules, 0);
  const totalDone = stats.reduce((a, s) => a + s.completedModules, 0);

  return (
    <section className="card cecr-level-card">
      <header className="card-head">
        <h2>
          <span className="emoji">🎓</span>
          {language === 'fr' ? 'Ton parcours CECR' : 'Your CEFR journey'}
        </h2>
        <button type="button" className="btn-link" onClick={onOpenPath}>
          {language === 'fr' ? 'Voir tout' : 'See all'} →
        </button>
      </header>

      <div className="cecr-overall">
        <div className="cecr-overall-count">
          <strong>{totalDone}</strong>
          <span> / {totalModules} {language === 'fr' ? 'modules' : 'modules'}</span>
        </div>
        <div className="cecr-overall-bar">
          <div
            className="cecr-overall-fill"
            style={{ width: `${totalModules ? Math.round((totalDone / totalModules) * 100) : 0}%` }}
          />
        </div>
      </div>

      <ul className="cecr-level-grid">
        {stats.map((s) => {
          const name = language === 'fr' ? s.meta.name : s.meta.nameEn;
          const desc = language === 'fr' ? s.meta.description : s.meta.descriptionEn;
          const label = STATUS_LABEL[s.status][language === 'fr' ? 'fr' : 'en'];
          const disabled = s.status === 'locked';
          return (
            <li
              key={s.meta.level}
              className={`cecr-level-item cecr-${s.meta.color} status-${s.status}`}
            >
              <button
                type="button"
                className="cecr-level-btn"
                onClick={() => !disabled && onOpenPath()}
                disabled={disabled}
                aria-label={`${name} — ${s.percent}%`}
              >
                <div className="cecr-level-top">
                  <span className="cecr-icon" aria-hidden>
                    {s.meta.icon}
                  </span>
                  <div className="cecr-level-titles">
                    <strong className="cecr-level-name">{name}</strong>
                    <div className="cecr-level-chips">
                      <span className={`cecr-status-chip status-${s.status}`}>{label}</span>
                      {s.meta.hskRange && (
                        <span className="cecr-level-hsk">HSK {s.meta.hskRange}</span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="cecr-level-desc">{desc}</p>
                <div className="cecr-level-bar-row">
                  <div className="cecr-level-bar" aria-hidden>
                    <div className="cecr-level-bar-fill" style={{ width: `${s.percent}%` }} />
                  </div>
                  <span className="cecr-pct">{s.percent}%</span>
                </div>
                <div className="cecr-level-meta">
                  {s.completedModules} / {s.totalModules} {language === 'fr' ? 'modules' : 'modules'}
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {active && active.nextModuleId && (
        <footer className="cecr-level-footer">
          <div className="cecr-continue-meta">
            <span className="cecr-continue-label">
              {language === 'fr' ? 'Prochaine leçon' : 'Next lesson'}
            </span>
            <strong>{language === 'fr' ? active.nextModuleTitle : active.nextModuleTitleEn}</strong>
          </div>
          <button
            type="button"
            className="btn-primary big"
            onClick={() => onOpenLesson(active.nextModuleId!)}
          >
            {continueLabel} →
          </button>
        </footer>
      )}
    </section>
  );
};

// --------------------------------------------------------------------------
// 📚 CompactPathCard — version Seonsaengnim du parcours
// Affiche uniquement le niveau CECR en cours + 5 leçons + CTA Continuer.
// Utilisé sur la home ; la grille CECR 10 niveaux reste dispo sur /cecr.
// --------------------------------------------------------------------------

const CompactPathCard = ({
  language,
  levels,
  paths,
  completed,
  onOpenPath,
  onOpenLesson
}: {
  language: Language;
  levels: CecrLevelMeta[];
  paths: LessonPath[];
  completed: Set<string>;
  onOpenPath: () => void;
  onOpenLesson: (lessonId: string) => void;
}) => {
  // Aplatis les leçons du niveau CECR en cours (premier niveau non terminé).
  const data = useMemo(() => {
    const pathById = new Map(paths.map((p) => [p.id, p]));
    let activeMeta: CecrLevelMeta | null = null;
    let lessons: { id: string; title: string; titleEn: string; completed: boolean }[] = [];

    for (const meta of levels) {
      const metaLessons: typeof lessons = [];
      for (const pid of meta.pathIds) {
        const path = pathById.get(pid);
        if (!path) continue;
        for (const lesson of path.lessons) {
          metaLessons.push({
            id: lesson.id,
            title: lesson.title,
            titleEn: lesson.titleEn ?? lesson.title,
            completed: completed.has(lesson.id)
          });
        }
      }
      if (metaLessons.length === 0) continue;
      const allDone = metaLessons.every((l) => l.completed);
      if (!allDone) {
        activeMeta = meta;
        lessons = metaLessons;
        break;
      }
    }

    // Si tous les niveaux sont terminés (ou aucun niveau actif), tomber sur le
    // dernier niveau avec des leçons.
    if (!activeMeta) {
      for (let i = levels.length - 1; i >= 0; i -= 1) {
        const meta = levels[i];
        const metaLessons: typeof lessons = [];
        for (const pid of meta.pathIds) {
          const path = pathById.get(pid);
          if (!path) continue;
          for (const lesson of path.lessons) {
            metaLessons.push({
              id: lesson.id,
              title: lesson.title,
              titleEn: lesson.titleEn ?? lesson.title,
              completed: completed.has(lesson.id)
            });
          }
        }
        if (metaLessons.length > 0) {
          activeMeta = meta;
          lessons = metaLessons;
          break;
        }
      }
    }

    return { activeMeta, lessons };
  }, [levels, paths, completed]);

  if (!data.activeMeta || data.lessons.length === 0) return null;

  const total = data.lessons.length;
  const doneCount = data.lessons.filter((l) => l.completed).length;
  const pct = Math.round((doneCount / total) * 100);
  const nextIdx = data.lessons.findIndex((l) => !l.completed);
  const next = nextIdx >= 0 ? data.lessons[nextIdx] : null;

  // Fenêtre de 5 leçons autour de la prochaine.
  const windowStart = Math.max(0, Math.min(total - 5, nextIdx >= 0 ? nextIdx - 2 : 0));
  const windowLessons = data.lessons.slice(windowStart, windowStart + 5);
  const remainingAfter = Math.max(0, total - (windowStart + windowLessons.length));

  const title = language === 'fr' ? data.activeMeta.name : data.activeMeta.nameEn;

  const nextTitle = next
    ? language === 'fr'
      ? next.title
      : next.titleEn
    : '';

  return (
    <section className="card path-v2-card">
      <header className="card-head">
        <h2>
          <span className="emoji">📚</span>
          {language === 'fr' ? 'Ton parcours' : 'Your path'}
        </h2>
      </header>

      <div className="path-v2-level-head">
        <span className="path-v2-level-label">{title}</span>
        <span className="path-v2-level-pct">{pct}%</span>
      </div>
      <div className="path-v2-level-bar">
        <div className="path-v2-level-fill" style={{ width: `${pct}%` }} />
      </div>

      <ul className="path-timeline">
        {windowLessons.map((lesson) => {
          const lessonTitle = language === 'fr' ? lesson.title : lesson.titleEn;
          const isNext = next && lesson.id === next.id;
          const state = lesson.completed ? 'is-done' : isNext ? 'is-next' : 'is-locked';
          return (
            <li key={lesson.id} className={`path-tl-item ${state}`}>
              <span className="path-tl-node" aria-hidden="true">
                <span className="path-tl-dot">
                  {lesson.completed ? '✓' : isNext ? '▶' : '🔒'}
                </span>
              </span>
              <button
                type="button"
                className="path-tl-content"
                onClick={() => onOpenLesson(lesson.id)}
                disabled={!lesson.completed && !isNext}
              >
                {isNext && (
                  <span className="path-tl-tag">
                    {language === 'fr' ? 'Prochaine leçon' : 'Next lesson'}
                  </span>
                )}
                <span className="path-tl-title">{lessonTitle}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {remainingAfter > 0 && (
        <div className="path-tl-rest">
          + {remainingAfter}{' '}
          {language === 'fr' ? 'leçons restantes' : 'lessons remaining'}
        </div>
      )}

      <div className="path-v2-foot">
        <span className="path-v2-count">
          {doneCount}/{total} {language === 'fr' ? 'leçons' : 'lessons'}
        </span>
        <button type="button" className="btn-link" onClick={onOpenPath}>
          {language === 'fr' ? 'Voir tout' : 'See all'} →
        </button>
      </div>

      {next && (
        <button
          type="button"
          className="path-v2-cta"
          onClick={() => onOpenLesson(next.id)}
        >
          <span>
            {language === 'fr' ? 'Continuer' : 'Continue'} :{' '}
            <strong>{nextTitle}</strong>
          </span>
          <span className="path-v2-cta-arrow">→</span>
        </button>
      )}
    </section>
  );
};

// --------------------------------------------------------------------------
// 🃏 Flashcards (teaser condensé)
// --------------------------------------------------------------------------

const FlashcardsCard = ({
  language,
  totalLearned,
  totalCorpus,
  dueCardsCount,
  onStartReview
}: {
  language: Language;
  totalLearned: number;
  totalCorpus: number;
  dueCardsCount: number;
  onStartReview: () => void;
}) => {
  const pct = totalCorpus > 0 ? Math.round((totalLearned / totalCorpus) * 100) : 0;
  const allCaught = dueCardsCount === 0;
  return (
    <section className="card flashcards-card">
      <header className="card-head">
        <h2>
          <span className="emoji">🃏</span>
          {language === 'fr' ? 'Flashcards' : 'Flashcards'}
        </h2>
      </header>

      <div className="fc-due">
        <span className={`fc-due-num ${allCaught ? 'caught' : 'pending'}`}>
          {dueCardsCount}
        </span>
        <span className={`fc-due-status ${allCaught ? 'caught' : 'pending'}`}>
          <span className="fc-due-dot" aria-hidden="true" />
          {allCaught
            ? language === 'fr' ? 'Tout est à jour !' : 'All caught up!'
            : language === 'fr' ? 'cartes à réviser' : 'cards to review'}
        </span>
      </div>

      <div className="fc-mastered">
        <FcRing value={pct} />
        <div className="fc-mastered-meta">
          <strong className="fc-mastered-count">
            {totalLearned} / {totalCorpus}
          </strong>
          <span className="fc-mastered-label">
            {language === 'fr' ? 'mots maîtrisés' : 'words mastered'}
          </span>
        </div>
      </div>

      <button type="button" className="btn-dark full-w" onClick={onStartReview}>
        {language === 'fr' ? 'Voir mes flashcards' : 'See my flashcards'} →
      </button>
    </section>
  );
};

const FcRing = ({ value }: { value: number }) => {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="fc-ring-wrap">
      <svg viewBox="0 0 60 60" className="fc-ring" aria-hidden="true">
        <circle cx="30" cy="30" r={radius} className="fc-ring-bg" />
        <circle
          cx="30"
          cy="30"
          r={radius}
          className="fc-ring-fg"
          style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
        />
      </svg>
      <span className="fc-ring-val">{value}%</span>
    </div>
  );
};

// --------------------------------------------------------------------------
// 💬 Prof IA (quick prompts)
// --------------------------------------------------------------------------

const AiTutorCard = ({ language, onOpenAiTutor }: { language: Language; onOpenAiTutor: (p?: string) => void }) => {
  const [draft, setDraft] = useState('');
  const suggestions =
    language === 'fr'
      ? [
          'Comment dit-on merci ?',
          'Explique-moi les mesures chinoises',
          'Quelle est la différence entre 了 et 过 ?'
        ]
      : [
          'How do you say thank you?',
          'Explain Chinese measure words',
          'What\u2019s the difference between 了 and 过?'
        ];
  const submit = () => {
    const q = draft.trim();
    if (!q) return;
    onOpenAiTutor(q);
    setDraft('');
  };
  return (
    <section className="card ai-tutor-card">
      <header className="card-head">
        <h2>
          <span className="emoji">💬</span>
          {language === 'fr' ? 'Prof. Xiao' : 'Teacher Xiao'}
        </h2>
        <span className="status online">
          <span className="dot" />
          {language === 'fr' ? 'En ligne' : 'Online'}
        </span>
      </header>
      <p className="ai-tag">
        {language === 'fr'
          ? 'Ton assistant·e chinois·e — pose-lui n\u2019importe quoi sur le chinois, la grammaire, la culture…'
          : 'Your Chinese tutor — ask anything about Chinese, grammar, culture…'}
      </p>

      <form
        className="ai-input-row"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          type="text"
          className="ai-input"
          placeholder={language === 'fr' ? 'Pose ta question…' : 'Ask your question…'}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit" className="ai-input-send" aria-label="Send" disabled={!draft.trim()}>
          ➤
        </button>
      </form>

      <ul className="ai-suggestions">
        {suggestions.map((s, i) => (
          <li key={i}>
            <button type="button" className="btn-chip" onClick={() => onOpenAiTutor(s)}>
              {s}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

// --------------------------------------------------------------------------
// 📖 Dialogues & Lectures — carte "pratique libre" (legacy V10)
// V10.1 : remplacée sur la home par DialogueReadingStrip (plus compact,
// en bande full-width au pied du dashboard). On garde ce composant au
// cas où tu veuilles le remettre dans une colonne plus tard.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// --------------------------------------------------------------------------

const DialogueReadingCard = ({
  language,
  onOpenDialogue,
  onOpenReading
}: {
  language: Language;
  onOpenDialogue?: () => void;
  onOpenReading?: () => void;
}) => {
  if (!onOpenDialogue && !onOpenReading) return null;
  return (
    <section className="card">
      <header className="card-head">
        <h2>
          <span className="emoji">📖</span>
          {language === 'fr' ? 'Pratique libre' : 'Free practice'}
        </h2>
      </header>
      <p className="ai-tag">
        {language === 'fr'
          ? 'Dialogues courts et textes alignés — pinyin et traduction à la demande.'
          : 'Short dialogues and aligned texts — pinyin and translation on demand.'}
      </p>
      <ul className="ai-suggestions">
        {onOpenDialogue && (
          <li>
            <button type="button" className="btn-chip" onClick={onOpenDialogue}>
              💬 {language === 'fr' ? 'Écouter un dialogue' : 'Listen to a dialogue'}
            </button>
          </li>
        )}
        {onOpenReading && (
          <li>
            <button type="button" className="btn-chip" onClick={onOpenReading}>
              📖 {language === 'fr' ? 'Lire un texte' : 'Read a text'}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
};

// --------------------------------------------------------------------------
// 🌅 Mot du jour
// --------------------------------------------------------------------------

const WordOfTheDayCard = ({
  language,
  word,
  onAddToFlashcards,
  onOpenAiTutor
}: {
  language: Language;
  word: LessonItem | null;
  onAddToFlashcards?: (word: LessonItem) => 'added' | 'duplicate' | 'capacity' | 'error';
  onOpenAiTutor: (p?: string) => void;
}) => {
  // onOpenAiTutor reste dispo pour les futures actions "demander un autre
  // exemple" ; gardée dans la signature pour ne pas casser les callers.
  void onOpenAiTutor;
  const [flashStatus, setFlashStatus] = useState<null | 'added' | 'duplicate' | 'capacity' | 'error'>(
    null
  );
  // On nettoie le feedback après 2.4 s pour redonner la possibilité de tenter
  // à nouveau (par ex. si le mot est supprimé puis réajouté).
  useEffect(() => {
    if (!flashStatus) return;
    const t = setTimeout(() => setFlashStatus(null), 2400);
    return () => clearTimeout(t);
  }, [flashStatus]);
  if (!word) return null;
  const trans = getLessonTranslation(word, language);
  const example = word.examples && word.examples.length > 0 ? word.examples[0] : null;
  const exampleTrans = example
    ? language === 'fr'
      ? example.translationFr ?? example.translation
      : example.translation
    : null;
  // Lecture audio du hanzi — uniquement depuis un fichier MP3/WAV
  // (playHanziAudio résout d'abord `word.audio`, puis essaie les conventions
  // HSK `audio/hskN/hskN_{hanzi}.wav`). Pas de Web Speech : on veut la même
  // voix sur Chrome / Safari / mobile.
  const handleSpeak = () => {
    if (!word) return;
    playHanziAudio(word.hanzi, (word as { audio?: string }).audio).catch((err) =>
      console.warn('[WOTD audio]', err)
    );
  };
  return (
    <section className="card word-of-day-card word-of-day-dark">
      <header className="card-head wod-head">
        <h2>
          <span className="emoji">🏮</span>
          {language === 'fr' ? 'Mot du jour' : 'Word of the day'}
        </h2>
      </header>
      <div className="wod-main">
        <div className="wod-hanzi-row">
          <span className="wod-hanzi">{word.hanzi}</span>
          <button
            type="button"
            className="wod-speaker"
            aria-label={language === 'fr' ? 'Écouter' : 'Play audio'}
            onClick={handleSpeak}
          >
            🔊
          </button>
        </div>
        <div className="wod-pinyin">({word.pinyin})</div>
        <div className="wod-trans">{trans}</div>
      </div>

      <button
        type="button"
        className="wod-add-btn"
        onClick={() => {
          if (!onAddToFlashcards) return;
          const res = onAddToFlashcards(word);
          setFlashStatus(res);
        }}
        disabled={!onAddToFlashcards || flashStatus === 'added' || flashStatus === 'duplicate'}
      >
        {flashStatus === 'added'
          ? language === 'fr'
            ? '✓ Ajouté aux flashcards'
            : '✓ Added to flashcards'
          : flashStatus === 'duplicate'
          ? language === 'fr'
            ? '✓ Déjà dans tes flashcards'
            : '✓ Already in your flashcards'
          : flashStatus === 'capacity'
          ? language === 'fr'
            ? 'Flashcards pleines (500 max)'
            : 'Flashcards full (500 max)'
          : flashStatus === 'error'
          ? language === 'fr'
            ? 'Erreur — réessaie'
            : 'Error — try again'
          : `+ ${language === 'fr' ? 'Ajouter aux flashcards' : 'Add to flashcards'}`}
      </button>

      {example && (
        <div className="wod-example">
          <div className="wod-example-hanzi">
            <span className="wod-example-bulb">💡</span>
            {'\u00a0'}« {example.hanzi} »
          </div>
          <div className="wod-example-trans">— {exampleTrans}</div>
        </div>
      )}
    </section>
  );
};

// --------------------------------------------------------------------------
// 🔥 Streak + XP + Niveau
// --------------------------------------------------------------------------

const StreakCard = ({
  language,
  streak,
  bonus
}: {
  language: Language;
  streak: ReturnType<typeof useDashboardState>['streak'];
  bonus: ReturnType<typeof useDashboardState>['bonus'];
}) => {
  const unit = language === 'fr'
    ? (streak.current > 1 ? 'jours' : 'jour')
    : (streak.current > 1 ? 'days' : 'day');
  return (
    <section className="card streak-card-v2">
      <div className="streak-v2-icon" aria-hidden="true">
        🔥
      </div>
      <div className="streak-v2-body">
        <div className="streak-v2-main">
          <strong className="streak-v2-num">{streak.current}</strong>
          <span className="streak-v2-unit">{unit}</span>
        </div>
        <div className="streak-v2-best">
          🏆 {language === 'fr' ? 'Record' : 'Best'} :{' '}
          {streak.best} {language === 'fr' ? (streak.best > 1 ? 'jours' : 'jour') : (streak.best > 1 ? 'days' : 'day')}
        </div>
        <StreakMultiplierBadge bonus={bonus} language={language} size="sm" />
      </div>
    </section>
  );
};

const XpCard = ({
  language,
  xp
}: {
  language: Language;
  xp: ReturnType<typeof useDashboardState>['xp'];
}) => {
  return (
    <section className="card xp-card-v2">
      <div className="xp-v2-top">
        <div className="xp-v2-left">
          <span className="xp-v2-star" aria-hidden="true">⭐</span>
          <strong className="xp-v2-num">{xp.xp}</strong>
          <span className="xp-v2-label">XP</span>
        </div>
        <span className="xp-v2-level-pill">
          {language === 'fr' ? 'Niveau' : 'Level'} {xp.level}
        </span>
      </div>
      <div className="xp-v2-bar">
        <div className="xp-v2-fill" style={{ width: `${xp.progressPct}%` }} />
      </div>
      <div className="xp-v2-note">
        {xp.xpInLevel}/{xp.xpNeededForNext} XP{' '}
        {language === 'fr'
          ? `pour le niveau ${xp.level + 1}`
          : `to level ${xp.level + 1}`}
      </div>
    </section>
  );
};

// --------------------------------------------------------------------------
// 📅 Heatmap calendrier
// --------------------------------------------------------------------------

// YYYY-MM-DD en local (éviter toISOString qui shift d'un jour sur TZ > UTC)
const toLocalDateKey = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const ActivityHeatmap = ({
  language,
  activity
}: {
  language: Language;
  activity: Record<string, number>;
}) => {
  // Calendrier "réel" : le mois en cours, cases alignées sous L M M J V S D.
  // Les jours qui débordent (fin du mois précédent / début du suivant) sont
  // affichés en grisé pour garder des semaines pleines, comme un calendrier
  // papier.
  const { days, todayKey } = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const tKey = toLocalDateKey(now);

    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastOfMonth.getDate();

    // Colonne du 1er (lundi-first : 0 = lundi … 6 = dimanche)
    const firstCol = (firstOfMonth.getDay() + 6) % 7;
    const lastCol = (lastOfMonth.getDay() + 6) % 7;
    const prePad = firstCol;
    const postPad = 6 - lastCol;

    const arr: {
      key: string;
      date: Date;
      value: number;
      inMonth: boolean;
      isToday: boolean;
    }[] = [];

    // Fin du mois précédent (greyed)
    for (let i = prePad; i > 0; i -= 1) {
      const d = new Date(year, month, 1 - i);
      const key = toLocalDateKey(d);
      arr.push({
        key,
        date: d,
        value: activity[key] ?? 0,
        inMonth: false,
        isToday: key === tKey
      });
    }
    // Mois en cours
    for (let day = 1; day <= daysInMonth; day += 1) {
      const d = new Date(year, month, day);
      const key = toLocalDateKey(d);
      arr.push({
        key,
        date: d,
        value: activity[key] ?? 0,
        inMonth: true,
        isToday: key === tKey
      });
    }
    // Début du mois suivant (greyed)
    for (let i = 1; i <= postPad; i += 1) {
      const d = new Date(year, month + 1, i);
      const key = toLocalDateKey(d);
      arr.push({
        key,
        date: d,
        value: activity[key] ?? 0,
        inMonth: false,
        isToday: key === tKey
      });
    }

    return { days: arr, todayKey: tKey };
  }, [activity]);

  const intensity = (v: number) => {
    if (v === 0) return 0;
    if (v < 30) return 1;
    if (v < 80) return 2;
    if (v < 250) return 3;
    return 4;
  };

  const monthLabel = new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
    month: 'long',
    year: 'numeric'
  });
  const dayHeaders = language === 'fr' ? ['L', 'M', 'M', 'J', 'V', 'S', 'D'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <section className="card heatmap-card">
      <header className="card-head">
        <h2>
          <span className="emoji">📅</span>
          {monthLabel}
        </h2>
      </header>
      <div className="heatmap-grid-wrapper">
        <div className="heatmap-headers">
          {dayHeaders.map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div className="heatmap-grid">
          {days.map((d) => {
            const cls = [
              'cell',
              `intensity-${intensity(d.value)}`,
              d.inMonth ? '' : 'out-of-month',
              d.isToday ? 'today' : ''
            ]
              .filter(Boolean)
              .join(' ');
            return (
              <div key={d.key} className={cls} title={`${d.key} • ${d.value} XP`}>
                <span className="cell-day">{d.date.getDate()}</span>
                {d.value > 0 && <span className="cell-num">{d.value}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="heatmap-legend">
        <span>{language === 'fr' ? 'Moins' : 'Less'}</span>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={`legend-swatch intensity-${i}`} />
        ))}
        <span>{language === 'fr' ? 'Plus' : 'More'}</span>
      </div>
    </section>
  );
};

// --------------------------------------------------------------------------
// 💡 Conseil du jour (sous la heatmap, comble le creux de col-aside)
// --------------------------------------------------------------------------

/**
 * Petite carte de tip de fin de col-aside. Sert deux choses :
 *   - équilibrer la hauteur de col-aside avec col-main (main-duo
 *     Flashcards+ProfXiao est plus tall qu'on ne le pense)
 *   - donner un mini-coup-de-pouce d'apprentissage rotatif (sélection
 *     déterministe par jour pour stabilité).
 */
const TipOfTheDayCard = ({
  language,
  streakDays
}: {
  language: Language;
  streakDays: number;
}) => {
  const tipsFr = [
    {
      emoji: '🎵',
      title: 'Les 4 tons changent le sens',
      body: 'mā (妈, maman), má (麻, chanvre), mǎ (马, cheval), mà (骂, insulter). Même syllabe, 4 mots — entraîne-toi avec le drill prononciation de l’Atelier.'
    },
    {
      emoji: '🧩',
      title: 'Particule 了 = changement',
      body: 'Le 了 placé en fin de phrase indique un changement d’état ("ça y est"). Très différent du 了 après un verbe (action accomplie).'
    },
    {
      emoji: '🔢',
      title: 'Mesureurs : chaque nom le sien',
      body: 'En chinois, on ne dit pas "trois chats" mais "trois unités-de-chat" : 三只猫 (sān zhī māo). Chaque catégorie d’objets a son mesureur (只, 个, 张, 条…).'
    },
    {
      emoji: '📚',
      title: 'Apprends par radicaux',
      body: 'Les hanzi sont composés de blocs récurrents (radicaux). Connaître ~100 radicaux te permet de deviner le sens et la prononciation de milliers de caractères.'
    },
    {
      emoji: '🗣️',
      title: 'Écoute avant de parler',
      body: 'Écoute 5–10 fois un dialogue, répète à voix haute, puis lis. Cette séquence imite l’acquisition naturelle d’une langue (auditif → oral → écrit).'
    },
    {
      emoji: '🔁',
      title: 'La règle des 5 minutes',
      body: 'Mieux vaut 5 minutes tous les jours qu’1 heure une fois par semaine. La SRS de XiaoLearn récompense la régularité, pas l’intensité.'
    },
    {
      emoji: '✍️',
      title: 'Trace les caractères',
      body: 'Écrire à la main active la mémoire kinesthésique. Le drill écriture de l’Atelier te valide trait par trait — utilise-le sur les 5 caractères les plus durs de la semaine.'
    }
  ];
  const tipsEn = [
    {
      emoji: '🎵',
      title: 'The 4 tones change meaning',
      body: 'mā (妈, mom), má (麻, hemp), mǎ (马, horse), mà (骂, scold). Same syllable, 4 different words — train them with the Atelier pronunciation drill.'
    },
    {
      emoji: '🧩',
      title: 'Particle 了 = change',
      body: 'Sentence-final 了 marks a change of state ("now it’s the case"). Very different from 了 after a verb (completed action).'
    },
    {
      emoji: '🔢',
      title: 'Measure words: one per noun',
      body: 'In Chinese you don’t say "three cats" but "three units-of-cat": 三只猫 (sān zhī māo). Every object class has its own measure word (只, 个, 张, 条…).'
    },
    {
      emoji: '📚',
      title: 'Learn through radicals',
      body: 'Hanzi are made of recurring building blocks (radicals). Knowing ~100 radicals lets you guess the meaning and pronunciation of thousands of characters.'
    },
    {
      emoji: '🗣️',
      title: 'Listen before speaking',
      body: 'Listen to a dialogue 5–10 times, repeat aloud, then read. This sequence mirrors natural language acquisition (auditory → oral → written).'
    },
    {
      emoji: '🔁',
      title: 'The 5-minute rule',
      body: 'Better 5 minutes every day than 1 hour once a week. XiaoLearn’s SRS rewards consistency, not intensity.'
    },
    {
      emoji: '✍️',
      title: 'Trace the characters',
      body: 'Writing by hand activates kinesthetic memory. The Atelier writing drill checks every stroke — use it on the 5 hardest characters of the week.'
    }
  ];

  // Sélection déterministe : index = jour de l'année + streak (pour qu'au moins
  // le tip change après une journée OU une augmentation de streak).
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86_400_000
  );
  const tips = language === 'fr' ? tipsFr : tipsEn;
  const tip = tips[(dayOfYear + streakDays) % tips.length];

  return (
    <section className="card tip-card">
      <header className="card-head">
        <h2>
          <span className="emoji">💡</span>
          {language === 'fr' ? 'Conseil du jour' : 'Tip of the day'}
        </h2>
      </header>
      <div className="tip-body">
        <span className="tip-icon" aria-hidden>{tip.emoji}</span>
        <div className="tip-text">
          <strong>{tip.title}</strong>
          <p>{tip.body}</p>
        </div>
      </div>
    </section>
  );
};

// --------------------------------------------------------------------------
// 👥 Communauté (teaser — prépare le terrain pour les duels plus tard)
// --------------------------------------------------------------------------

const CommunityCard = ({
  language,
  layout = 'aside',
  onOpenAnnouncements,
  onOpenBattles,
  onOpenMessages,
  onOpenIdeas,
  unreadAnnouncementsCount = 0
}: {
  language: Language;
  /** 'aside' = colonne droite (lignes empilées). 'strip' = full-width (4 col). */
  layout?: 'aside' | 'strip';
  onOpenAnnouncements?: () => void;
  onOpenBattles?: () => void;
  onOpenMessages?: () => void;
  onOpenIdeas?: () => void;
  unreadAnnouncementsCount?: number;
}) => {
  // Construit chaque ligne en factorisant le pattern bouton/div + handler optionnel.
  type Row = {
    key: string;
    emoji: string;
    title: string;
    subtitle: string;
    onClick?: () => void;
    badge?: number;
  };
  const rows: Row[] = [
    {
      key: 'announcements',
      emoji: '📢',
      title: language === 'fr' ? 'Annonces' : 'Announcements',
      subtitle:
        language === 'fr'
          ? 'Nouvelles fonctionnalités et mises à jour XiaoLearn.'
          : 'New features and XiaoLearn updates.',
      onClick: onOpenAnnouncements,
      badge: unreadAnnouncementsCount
    },
    {
      key: 'battles',
      emoji: '⚔️',
      title: language === 'fr' ? 'Batailles de mots' : 'Word battles',
      subtitle:
        language === 'fr'
          ? 'Affronte un autre apprenant en traduction rapide.'
          : 'Face another learner in a translation race.',
      onClick: onOpenBattles
    },
    {
      key: 'messages',
      emoji: '💬',
      title: language === 'fr' ? 'Messagerie' : 'Messages',
      subtitle:
        language === 'fr'
          ? 'Discute en 1-1 avec d\'autres apprenants.'
          : 'Chat 1-on-1 with other learners.',
      onClick: onOpenMessages
    },
    {
      key: 'ideas',
      emoji: '💡',
      title: language === 'fr' ? 'Idées & Roadmap' : 'Ideas & Roadmap',
      subtitle:
        language === 'fr'
          ? 'Vote pour les prochaines features et suis la roadmap.'
          : 'Vote on upcoming features and follow the roadmap.',
      onClick: onOpenIdeas
    }
  ];

  return (
    <section className={`card community-card community-card--${layout}`}>
      <header className="card-head">
        <h2>
          <span className="emoji">👥</span>
          {language === 'fr' ? 'Communauté' : 'Community'}
        </h2>
        <span className="pill live">
          {language === 'fr' ? '● En ligne' : '● Live'}
        </span>
      </header>
      <div className="community-body">
        {rows.map((row) => {
          const inner = (
            <>
              <span className="community-emoji">{row.emoji}</span>
              <div className="community-row-text">
                <strong>
                  {row.title}
                  {row.badge && row.badge > 0 ? (
                    <span className="community-row-badge">{row.badge}</span>
                  ) : null}
                </strong>
                <small>{row.subtitle}</small>
              </div>
              {row.onClick && <span className="community-row-arrow" aria-hidden>›</span>}
            </>
          );
          return row.onClick ? (
            <button
              key={row.key}
              type="button"
              className="community-row community-row--clickable"
              onClick={row.onClick}
            >
              {inner}
            </button>
          ) : (
            <div key={row.key} className="community-row">
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
};

// --------------------------------------------------------------------------
// Page principale
// --------------------------------------------------------------------------

const HomePageV2 = (props: HomePageV2Props) => {
  const {
    language,
    progress,
    dueCardsCount,
    userDisplayName,
    cecrPaths,
    cecrLevels,
    completedLessonIds,
    onStartReview,
    onOpenFlashcards,
    dueFlashcardsCount,
    onOpenLesson,
    onOpenAiTutor,
    onOpenPath,
    onOpenDialogue,
    onOpenReading,
    onAddWordToFlashcards,
    onOpenAnnouncements,
    onOpenBattles,
    onOpenMessages,
    onOpenIdeas,
    unreadAnnouncementsCount
  } = props;

  // Trouve la prochaine vraie leçon CECR/HSK à reprendre (première non-complétée
  // et non-verrouillée). Le hanzi du mot SRS courant n'est PAS un titre de
  // leçon (confusion historique LessonItem vs LessonModule).
  const nextLessonToResume = useMemo(() => {
    if (!cecrPaths) return null;
    const completedSet = completedLessonIds ?? new Set<string>();
    for (const path of cecrPaths) {
      for (const lesson of path.lessons) {
        if (!completedSet.has(lesson.id)) {
          const title = language === 'fr' ? lesson.title : (lesson.titleEn || lesson.title);
          return { id: lesson.id, title };
        }
      }
    }
    return null;
  }, [cecrPaths, completedLessonIds, language]);

  const dashboard = useDashboardState({
    dueCardsCount,
    nextLessonTitle: nextLessonToResume?.title,
    nextLessonId: nextLessonToResume?.id
  });

  // Ping "utilisateur vivant aujourd'hui" à chaque ouverture du dashboard.
  useEffect(() => {
    dashboard.pingAlive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mot du jour déterministe : rotation stable sur les mots déjà appris.
  const wordOfTheDay = useMemo<LessonItem | null>(() => {
    const pool = progress.allLearnedItems.length > 0 ? progress.allLearnedItems : progress.todaySummary;
    if (pool.length === 0) return null;
    const today = new Date();
    const dayIndex =
      today.getFullYear() * 1000 + (today.getMonth() * 31 + today.getDate());
    return pool[dayIndex % pool.length];
  }, [progress.allLearnedItems, progress.todaySummary]);

  const totalLearned = Object.values(progress.totals).reduce((a, b) => a + b, 0);
  // Total du corpus HSK 1-7 (aligné sur les cibles historiques). Seonsaengnim
  // n'affiche pas de graph HSK séparé sur la home — on supprime le bloc
  // ProgressChart pour coller à sa disposition, mais on garde le total pour
  // l'anneau Flashcards.
  const totalCorpus = 500 + 1000 + 1500 + 2000 + 2500 + 3000 + 5000; // 15 500

  return (
    <div className="dashboard-v2">
      <DashboardHeader
        language={language}
        userDisplayName={userDisplayName}
        streakDays={dashboard.streak.current}
        isAliveToday={dashboard.streak.isAliveToday}
        bonus={dashboard.bonus}
      />

      <div className="dashboard-grid">
        {/* Colonne principale (mirror Seonsaengnim) :
            Objectif → Parcours (timeline + CTA sombre)
            → Row [Flashcards | Prof. Xiao] */}
        <div className="col col-main">
          <DailyGoalCard
            language={language}
            goal={dashboard.dailyGoal}
            streakAlive={dashboard.streak.isAliveToday}
            onStartReview={onStartReview}
            onOpenFlashcards={onOpenFlashcards}
            dueFlashcardsCount={dueFlashcardsCount}
            onOpenLesson={onOpenLesson}
            onEditTimer={dashboard.setTimerMinutes}
            lessonToResumeId={progress.currentLesson?.id}
          />
          {cecrPaths && cecrLevels ? (
            <CompactPathCard
              language={language}
              levels={cecrLevels}
              paths={cecrPaths}
              completed={completedLessonIds ?? new Set<string>()}
              onOpenPath={onOpenPath}
              onOpenLesson={onOpenLesson}
            />
          ) : (
            <PathProgressCard
              language={language}
              progress={progress}
              onOpenPath={onOpenPath}
              onOpenLesson={onOpenLesson}
            />
          )}
          <div className="main-duo">
            <FlashcardsCard
              language={language}
              totalLearned={totalLearned}
              totalCorpus={totalCorpus}
              dueCardsCount={dueCardsCount}
              onStartReview={onStartReview}
            />
            <AiTutorCard language={language} onOpenAiTutor={onOpenAiTutor} />
          </div>
        </div>

        {/* Colonne secondaire (mirror Seonsaengnim) :
            Mot du jour → Conseil du jour → Streak → XP → Bonus → Heatmap.
            Les deux cartes "du jour" sont regroupées en tête (contenu éducatif
            quotidien), suivies par les stats puis la heatmap. La hauteur totale
            de la col aside reste identique → toujours pas de creux en bas. */}
        <div className="col col-aside">
          <WordOfTheDayCard
            language={language}
            word={wordOfTheDay}
            onAddToFlashcards={onAddWordToFlashcards}
            onOpenAiTutor={onOpenAiTutor}
          />
          <TipOfTheDayCard language={language} streakDays={dashboard.streak.current} />
          <StreakCard
            language={language}
            streak={dashboard.streak}
            bonus={dashboard.bonus}
          />
          <XpCard language={language} xp={dashboard.xp} />
          <StreakBonusPanel
            language={language}
            bonus={dashboard.bonus}
            streakDays={dashboard.streak.current}
          />
          <ActivityHeatmap language={language} activity={dashboard.activity} />
        </div>
      </div>

      {/* Strip Communauté full-width : sortie de la colonne droite (qui était
          trop longue par rapport à la colonne principale, créant un grand
          espace vide). Affichée ici en 4 colonnes horizontales, beaucoup
          plus visible et équilibrée. */}
      <CommunityCard
        language={language}
        layout="strip"
        onOpenAnnouncements={onOpenAnnouncements}
        onOpenBattles={onOpenBattles}
        onOpenMessages={onOpenMessages}
        onOpenIdeas={onOpenIdeas}
        unreadAnnouncementsCount={unreadAnnouncementsCount}
      />

      {/* Strip Pratique libre : point d'entrée vers Dialogues/Lectures
          (absent de Seonsaengnim mais indispensable pour XiaoLearn — on le
          place en bande compacte full-width, beaucoup plus discret que le
          graph HSK qui a été supprimé). */}
      <DialogueReadingStrip
        language={language}
        onOpenDialogue={onOpenDialogue}
        onOpenReading={onOpenReading}
      />
    </div>
  );
};

// --------------------------------------------------------------------------
// 🎭 Strip Pratique libre — version pleine largeur
// --------------------------------------------------------------------------

const DialogueReadingStrip = ({
  language,
  onOpenDialogue,
  onOpenReading
}: {
  language: Language;
  onOpenDialogue?: () => void;
  onOpenReading?: () => void;
}) => {
  if (!onOpenDialogue && !onOpenReading) return null;
  return (
    <section className="practice-strip">
      <div className="practice-strip-label">
        <span className="emoji">📖</span>
        <span>
          {language === 'fr' ? 'Pratique libre' : 'Free practice'}
        </span>
      </div>
      <div className="practice-strip-actions">
        {onOpenDialogue && (
          <button type="button" className="btn-chip" onClick={onOpenDialogue}>
            💬 {language === 'fr' ? 'Écouter un dialogue' : 'Listen to a dialogue'}
          </button>
        )}
        {onOpenReading && (
          <button type="button" className="btn-chip" onClick={onOpenReading}>
            📖 {language === 'fr' ? 'Lire un texte' : 'Read a text'}
          </button>
        )}
      </div>
    </section>
  );
};

export default HomePageV2;
