import { useMemo } from 'react';
import type { LessonItem, LevelId, ThemeSummary } from '../types';
import type { Language } from '../i18n';
import { getCopy } from '../i18n';
import type { LessonPath } from '../types/lesson-structure';
import { useAuth } from '../contexts/AuthContext';

interface HomePageProps {
  todayLessons: LessonItem[];
  totals: Record<LevelId, number>;
  onContinue: () => void;
  onOpenReview: () => void;
  onOpenCPlayer: () => void;
  topThemes: ThemeSummary[];
  onOpenThemes: (theme?: string) => void;
  copy: ReturnType<typeof getCopy>;
  language: Language;
  progressPercent: number;
  minuteGoal: number;
  minutesToday: number;
  streak: number;
  pendingReviews: number;
  nextLesson?: LessonItem;
  colorTheme: string;
  showAdvancedStats: boolean;
  paths: LessonPath[];
}

const HomePage = ({
  todayLessons,
  totals,
  onContinue,
  onOpenReview,
  onOpenCPlayer,
  topThemes,
  onOpenThemes,
  copy,
  language,
  progressPercent,
  minuteGoal,
  minutesToday,
  streak,
  pendingReviews,
  nextLesson,
  colorTheme,
  showAdvancedStats,
  paths
}: HomePageProps) => {
  const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split('@')[0] || (language === 'fr' ? 'Utilisateur' : 'User');

  const totalWords = useMemo(() => {
    return Object.values(totals).reduce((sum, count) => sum + count, 0);
  }, [totals]);

  const completedLessonCount = useMemo(
    () => paths.flatMap((path) => path.lessons).filter((lesson) => lesson.completed).length,
    [paths]
  );
  const totalLessonCount = useMemo(() => paths.flatMap((path) => path.lessons).length, [paths]);
  const xpPerLevel = 250;
  const xpTotal = completedLessonCount * 20;
  const currentLevel = Math.max(1, Math.floor(xpTotal / xpPerLevel) + 1);
  const xpInLevel = xpTotal % xpPerLevel;
  const xpPercent = Math.min(100, Math.round((xpInLevel / xpPerLevel) * 100));
  const realProgressPercent = totalLessonCount > 0 ? Math.round((completedLessonCount / totalLessonCount) * 100) : 0;
  const progressDisplayPercent = Math.max(progressPercent, realProgressPercent);
  const goalProgressPercent = Math.min(100, Math.round((Math.min(minutesToday, minuteGoal) / Math.max(minuteGoal, 1)) * 100));
  const goalReached = minutesToday >= minuteGoal;
  const streakLabel = language === 'fr' ? (streak > 1 ? 'jours' : 'jour') : streak > 1 ? 'days' : 'day';

  const nextPathLesson = useMemo(() => {
    for (const path of paths) {
      const lesson = path.lessons.find((entry) => !entry.locked && !entry.completed);
      if (lesson) return { path, lesson };
    }
    for (const path of paths) {
      const lesson = path.lessons.find((entry) => !entry.locked);
      if (lesson) return { path, lesson };
    }
    return null;
  }, [paths]);

  const fallbackLessonTitle = nextLesson?.hanzi ?? (language === 'fr' ? 'Aucune leçon disponible' : 'No lesson available');
  const continueLessonTitle = nextPathLesson
    ? language === 'fr'
      ? nextPathLesson.lesson.title
      : nextPathLesson.lesson.titleEn
    : fallbackLessonTitle;
  const continueLessonSubtitle = nextPathLesson
    ? language === 'fr'
      ? `${nextPathLesson.path.name} · ${nextPathLesson.lesson.duration} min`
      : `${nextPathLesson.path.nameEn} · ${nextPathLesson.lesson.duration} min`
    : language === 'fr'
    ? 'Ouvre la section Leçons pour commencer.'
    : 'Open Lessons to start.';

  const levelProgress = useMemo(() => {
    const byLevel = new Map<number, { total: number; completed: number }>();
    for (const path of paths) {
      for (const lesson of path.lessons) {
        const current = byLevel.get(lesson.hskLevel) || { total: 0, completed: 0 };
        current.total += 1;
        if (lesson.completed) current.completed += 1;
        byLevel.set(lesson.hskLevel, current);
      }
    }
    return Array.from(byLevel.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([level, values]) => ({
        level,
        total: values.total,
        completed: values.completed,
        percent: values.total > 0 ? Math.round((values.completed / values.total) * 100) : 0
      }));
  }, [paths]);

  const levelLabel = (level: number) => {
    if (language !== 'fr') return level <= 1 ? 'Foundations' : level === 2 ? 'Intermediate' : 'Advanced';
    if (level <= 1) return 'Les bases';
    if (level === 2) return 'Intermédiaire';
    return 'Avancé';
  };

  void todayLessons;
  void topThemes;
  void onOpenThemes;
  void copy;
  void colorTheme;
  void showAdvancedStats;

  return (
    <div className="home-container home-k-dashboard">
      <section className="home-k-header">
        <h1 className="home-k-title">
          {language === 'fr' ? 'Bienvenue, ' : 'Welcome, '}
          <span className="home-k-name">{displayName}</span>
        </h1>
        <p className="home-k-subtitle">
          {language === 'fr'
            ? `Niveau ${currentLevel} - ${xpInLevel} / ${xpPerLevel} XP (${xpPercent}% vers le niveau ${currentLevel + 1})`
            : `Level ${currentLevel} - ${xpInLevel} / ${xpPerLevel} XP (${xpPercent}% to level ${currentLevel + 1})`}
        </p>
      </section>

      {goalReached && (
        <section className="home-k-goal-alert" role="status" aria-live="polite">
          <span className="home-k-goal-icon">🎉</span>
          <div>
            <strong>{language === 'fr' ? 'Objectif du jour atteint !' : 'Daily goal reached!'}</strong>
            <small>
              {language === 'fr'
                ? `Tu as étudié ${minutesToday} minutes aujourd'hui`
                : `You studied ${minutesToday} minutes today`}
            </small>
          </div>
        </section>
      )}

      <section className="home-k-stats-row">
        <div className="home-k-stat">
          <span className="home-k-stat-label">{language === 'fr' ? 'Objectif' : 'Goal'}</span>
          <span className="home-k-stat-value">{Math.min(minutesToday, minuteGoal)}/{minuteGoal} min</span>
          <div className="home-k-stat-progress">
            <div style={{ width: `${goalProgressPercent}%` }} />
          </div>
        </div>
        <div className="home-k-stat">
          <span className="home-k-stat-label">{language === 'fr' ? 'Série' : 'Streak'}</span>
          <span className="home-k-stat-value">{streak} {streakLabel}</span>
        </div>
        <div className="home-k-stat">
          <span className="home-k-stat-label">{language === 'fr' ? 'Progression' : 'Progress'}</span>
          <span className="home-k-stat-value">{progressDisplayPercent}%</span>
        </div>
        <div className="home-k-stat">
          <span className="home-k-stat-label">{language === 'fr' ? "Aujourd'hui" : 'Today'}</span>
          <span className="home-k-stat-value">{minutesToday} min</span>
        </div>
      </section>

      <section className="home-k-feature-grid">
        <article className="home-k-card home-k-cplayer-card">
          <p className="home-k-card-eyebrow">{language === 'fr' ? 'APPRENDRE AVEC CPLAYER' : 'LEARN WITH CPLAYER'}</p>
          <h2 className="home-k-card-title">
            {language === 'fr' ? 'Apprendre avec CPlayer' : 'Learn with CPlayer'}
          </h2>
          <p className="home-k-card-text">
            {language === 'fr'
              ? 'Module audio en préparation. Vous pourrez apprendre avec des pistes synchronisées.'
              : 'Audio module in progress. You will learn with synchronized tracks soon.'}
          </p>
          <button type="button" className="home-k-card-btn" onClick={onOpenCPlayer}>
            {language === 'fr' ? 'Ouvrir CPlayer' : 'Open CPlayer'}
          </button>
        </article>

        <article className="home-k-card home-k-vocab-card">
          <p className="home-k-card-eyebrow">{language === 'fr' ? 'VOCABULEX' : 'VOCABULEX'}</p>
          <div className="home-k-vocab-grid">
            <div>
              <span className="home-k-vocab-number">{totalWords}</span>
              <span className="home-k-vocab-label">{language === 'fr' ? 'MOTS APPRIS' : 'WORDS LEARNED'}</span>
            </div>
            <div>
              <span className="home-k-vocab-number">{pendingReviews}</span>
              <span className="home-k-vocab-label">{language === 'fr' ? 'À RÉVISER' : 'TO REVIEW'}</span>
            </div>
          </div>
          <button
            type="button"
            className="home-k-card-btn"
            onClick={onOpenReview}
            disabled={pendingReviews === 0}
          >
            {language === 'fr' ? 'Voir mes révisions' : 'Open reviews'}
          </button>
        </article>
      </section>

      <section className="home-k-lessons-panel">
        <div className="home-k-panel-head">
          <h2>{language === 'fr' ? 'LEÇONS' : 'LESSONS'}</h2>
          <button type="button" onClick={onContinue}>
            {language === 'fr' ? 'Voir tout' : 'See all'} →
          </button>
        </div>

        <button type="button" className="home-k-continue-row" onClick={onContinue}>
          <span className="home-k-continue-icon">▶</span>
          <span className="home-k-continue-text">
            <strong>{language === 'fr' ? 'CONTINUER' : 'CONTINUE'}</strong>
            <em>{continueLessonTitle}</em>
            <small>{continueLessonSubtitle}</small>
          </span>
          <span className="home-k-continue-arrow">→</span>
        </button>

        <section className="home-k-levels">
          <h3>{language === 'fr' ? 'PROGRESSION PAR NIVEAU' : 'LEVEL PROGRESS'}</h3>
          {levelProgress.slice(0, 4).map((item) => (
            <div key={item.level} className="home-k-level-row">
              <div className="home-k-level-line">
                <span>
                  {language === 'fr' ? `Niveau ${item.level}` : `Level ${item.level}`} - {levelLabel(item.level)}
                </span>
                <span>{item.completed}/{item.total} {language === 'fr' ? 'leçons' : 'lessons'}</span>
              </div>
              <div className="home-k-level-bar">
                <div style={{ width: `${item.percent}%` }}></div>
              </div>
              <p>{item.percent}%</p>
            </div>
          ))}
          {levelProgress.length === 0 && (
            <p className="home-k-empty-levels">
              {language === 'fr'
                ? 'Aucune donnée de progression pour le moment.'
                : 'No level progress data yet.'}
            </p>
          )}
        </section>
      </section>
    </div>
  );
};

export default HomePage;
