import { useMemo } from 'react';
import type { LessonItem, LevelId, ThemeSummary } from '../types';
import type { Language } from '../i18n';
import { getCopy } from '../i18n';
import type { LessonPath } from '../types/lesson-structure';
import { useAuth } from '../contexts/AuthContext';
import { getWordOfDay } from '../data/lessons';

interface HomePageProps {
  todayLessons: LessonItem[];
  totals: Record<LevelId, number>;
  onContinue: () => void;
  onOpenReview: () => void;
  onOpenCPlayer: () => void;
  onOpenFlashcards: () => void;
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
  onOpenFlashcards,
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
  const goalReached = minutesToday >= minuteGoal;

  // Word of the day from database
  const wordOfDay = useMemo(() => getWordOfDay(), []);

  // Current active path and lesson
  const activePathInfo = useMemo(() => {
    for (const path of paths) {
      const nextIdx = path.lessons.findIndex((l) => !l.locked && !l.completed);
      if (nextIdx >= 0) {
        const completedInPath = path.lessons.filter((l) => l.completed).length;
        const percent = path.lessons.length > 0 ? Math.round((completedInPath / path.lessons.length) * 100) : 0;
        return { path, nextLessonIdx: nextIdx, completedInPath, percent };
      }
    }
    if (paths.length > 0) {
      const p = paths[0];
      const completedInPath = p.lessons.filter((l) => l.completed).length;
      const percent = p.lessons.length > 0 ? Math.round((completedInPath / p.lessons.length) * 100) : 0;
      return { path: p, nextLessonIdx: 0, completedInPath, percent };
    }
    return null;
  }, [paths]);

  const currentPathLevel = activePathInfo?.path.lessons[0]?.hskLevel ?? 1;
  const levelLabel = (level: number) => {
    if (language !== 'fr') return level <= 1 ? 'Foundations' : level === 2 ? 'Intermediate' : 'Advanced';
    if (level <= 1) return 'Les bases';
    if (level === 2) return 'Intermédiaire';
    return 'Avancé';
  };

  // Daily objectives
  const objectives = useMemo(() => {
    const flashcardsReviewed = pendingReviews === 0 && totalWords > 0;
    const nextLessonTitle = activePathInfo
      ? language === 'fr'
        ? activePathInfo.path.lessons[activePathInfo.nextLessonIdx]?.title
        : activePathInfo.path.lessons[activePathInfo.nextLessonIdx]?.titleEn
      : null;

    return [
      {
        done: flashcardsReviewed,
        label: language === 'fr' ? 'Flashcards du jour révisées' : 'Daily flashcards reviewed',
        icon: '🃏'
      },
      {
        done: false,
        label: language === 'fr'
          ? `Continuer "${nextLessonTitle || 'Prochaine leçon'}"`
          : `Continue "${nextLessonTitle || 'Next lesson'}"`,
        icon: '📚'
      },
      {
        done: goalReached,
        label: language === 'fr'
          ? `Gagner 50 XP (${Math.min(xpTotal, 50)}/50)`
          : `Earn 50 XP (${Math.min(xpTotal, 50)}/50)`,
        icon: '⭐'
      }
    ];
  }, [pendingReviews, totalWords, activePathInfo, language, xpTotal, goalReached]);

  const completedObjectives = objectives.filter((o) => o.done).length;

  // Calendar
  const now = new Date();
  const calendarMonth = now.getMonth();
  const calendarYear = now.getFullYear();
  const monthNames = language === 'fr'
    ? ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayHeaders = language === 'fr' ? ['L', 'M', 'M', 'J', 'V', 'S', 'D'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const calendarDays = useMemo(() => {
    const firstDay = new Date(calendarYear, calendarMonth, 1);
    const lastDay = new Date(calendarYear, calendarMonth + 1, 0);
    const startDow = (firstDay.getDay() + 6) % 7;
    const days: (number | null)[] = [];
    for (let i = 0; i < startDow; i++) days.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(d);
    return days;
  }, [calendarMonth, calendarYear]);

  const today = now.getDate();

  // Visible lessons in path
  const visibleLessons = useMemo(() => {
    if (!activePathInfo) return [];
    const lessons = activePathInfo.path.lessons;
    const idx = activePathInfo.nextLessonIdx;
    const start = Math.max(0, idx - 2);
    const end = Math.min(lessons.length, idx + 5);
    return lessons.slice(start, end).map((l, i) => ({
      ...l,
      isNext: start + i === idx
    }));
  }, [activePathInfo]);

  const remainingLessons = useMemo(() => {
    if (!activePathInfo) return 0;
    const shownEnd = Math.min(
      activePathInfo.path.lessons.length,
      activePathInfo.nextLessonIdx + 5
    );
    return activePathInfo.path.lessons.length - shownEnd;
  }, [activePathInfo]);

  const nextLessonForContinue = activePathInfo
    ? activePathInfo.path.lessons[activePathInfo.nextLessonIdx]
    : null;

  const continueBtnLabel = nextLessonForContinue
    ? language === 'fr'
      ? `Continuer : ${activePathInfo?.path.name ?? ''} : ${nextLessonForContinue.title}`
      : `Continue: ${activePathInfo?.path.nameEn ?? ''}: ${nextLessonForContinue.titleEn}`
    : language === 'fr'
    ? 'Voir les leçons'
    : 'See lessons';

  // Suppress unused
  void todayLessons;
  void topThemes;
  void onOpenThemes;
  void copy;
  void colorTheme;
  void showAdvancedStats;
  void nextLesson;
  void progressPercent;
  void onOpenReview;
  void totalLessonCount;

  return (
    <div className="home-container home-s-dashboard">
      {/* ===== MAIN COLUMN ===== */}
      <div className="home-s-main">
        <section className="home-s-welcome">
          <h1 className="home-s-greeting">
            {language === 'fr' ? 'Bonjour' : 'Hello'} {displayName} 👋
          </h1>
          {streak > 0 && (
            <span className="home-s-streak-inline">
              🔥 {streak} {language === 'fr' ? (streak > 1 ? 'jours de série' : 'jour de série') : (streak > 1 ? 'day streak' : 'day streak')}
            </span>
          )}
        </section>

        {goalReached && (
          <section className="home-s-goal-banner" role="status">
            🎉 {language === 'fr' ? `Objectif du jour atteint ! (${minutesToday} min)` : `Daily goal reached! (${minutesToday} min)`}
          </section>
        )}

        {/* Daily objectives */}
        <section className="home-s-objectives">
          <div className="home-s-objectives-header">
            <h2>{language === 'fr' ? 'Objectif du jour' : 'Daily objectives'}</h2>
            <span className="home-s-objectives-badge">{completedObjectives}/{objectives.length}</span>
          </div>
          <ul className="home-s-objectives-list">
            {objectives.map((obj, i) => (
              <li key={i} className={`home-s-objective ${obj.done ? 'done' : ''}`}>
                <span className="home-s-objective-check">
                  {obj.done ? (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="9" fill="var(--primary-red)"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="var(--text-secondary)" strokeOpacity="0.3"/></svg>
                  )}
                </span>
                <span className="home-s-objective-label">{obj.icon} {obj.label}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Learning path */}
        <section className="home-s-path">
          <h2 className="home-s-path-heading">
            📖 {language === 'fr' ? 'Ton parcours' : 'Your path'}
          </h2>

          {activePathInfo && (
            <>
              <div className="home-s-path-level-row">
                <span className="home-s-path-level-tag">
                  {language === 'fr' ? `NIVEAU ${currentPathLevel}` : `LEVEL ${currentPathLevel}`} — {levelLabel(currentPathLevel).toUpperCase()}
                </span>
                <span className="home-s-path-pct">{activePathInfo.percent}%</span>
              </div>
              <div className="home-s-path-bar">
                <div style={{ width: `${activePathInfo.percent}%` }} />
              </div>

              <div className="home-s-lesson-list">
                {visibleLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`home-s-lesson-item${lesson.completed ? ' completed' : ''}${lesson.isNext ? ' current' : ''}${lesson.locked ? ' locked' : ''}`}
                  >
                    <span className="home-s-lesson-icon">
                      {lesson.completed ? (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="var(--jade-green)"/><path d="M6 10.5L8.5 13L14 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      ) : lesson.isNext ? (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="var(--primary-red)"/><polygon points="8,6 15,10 8,14" fill="#fff"/></svg>
                      ) : lesson.locked ? (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="var(--bg-tertiary)" fillOpacity="0.6"/><rect x="7" y="9" width="6" height="5" rx="1" fill="var(--text-secondary)" fillOpacity="0.4"/><path d="M8.5 9V7.5a1.5 1.5 0 013 0V9" stroke="var(--text-secondary)" strokeOpacity="0.4" strokeWidth="1.2"/></svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9.5" stroke="var(--text-secondary)" strokeOpacity="0.25"/></svg>
                      )}
                    </span>
                    <div className="home-s-lesson-text">
                      <span className="home-s-lesson-name">
                        {language === 'fr' ? lesson.title : lesson.titleEn}
                      </span>
                      {lesson.isNext && (
                        <span className="home-s-lesson-next-tag">
                          {language === 'fr' ? 'Prochaine leçon' : 'Next lesson'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {remainingLessons > 0 && (
                  <p className="home-s-more-lessons">
                    + {remainingLessons} {language === 'fr' ? 'leçons restantes' : 'lessons remaining'}
                  </p>
                )}
              </div>

              <div className="home-s-path-footer">
                <span className="home-s-path-count">
                  {activePathInfo.completedInPath}/{activePathInfo.path.lessons.length} {language === 'fr' ? 'leçons' : 'lessons'}
                </span>
                <button type="button" className="home-s-see-all" onClick={onContinue}>
                  {language === 'fr' ? 'Voir tout' : 'See all'} →
                </button>
              </div>
            </>
          )}

          <button type="button" className="home-s-continue-btn" onClick={onContinue}>
            {continueBtnLabel} →
          </button>
        </section>

        {/* Bottom cards row */}
        <div className="home-s-bottom-row">
          <div className="home-s-fc-card">
            <h3 className="home-s-fc-title">🃏 Flashcards</h3>
            <span className="home-s-fc-big">{pendingReviews}</span>
            <span className="home-s-fc-label">
              {language === 'fr' ? 'cartes à réviser' : 'cards to review'}
            </span>
            <div className="home-s-fc-bar-wrap">
              <div className="home-s-fc-bar"><div style={{ width: `${totalWords > 0 ? Math.min(100, Math.round((totalWords / Math.max(totalWords, 100)) * 100)) : 0}%` }} /></div>
              <span>0 / {totalWords} {language === 'fr' ? 'mots maîtrisés' : 'words mastered'}</span>
            </div>
            <button type="button" className="home-s-card-action" onClick={onOpenFlashcards}>
              {language === 'fr' ? 'Réviser maintenant' : 'Review now'} →
            </button>
          </div>

          <div className="home-s-cpop-card">
            <h3 className="home-s-cpop-title">🎵 CPlayer</h3>
            <p className="home-s-cpop-desc">
              {language === 'fr'
                ? 'Apprends avec la musique C-pop et les paroles interactives.'
                : 'Learn with C-pop music and interactive lyrics.'}
            </p>
            <div className="home-s-cpop-chips">
              <span>{language === 'fr' ? 'Mode guidé' : 'Guided mode'}</span>
              <span>{language === 'fr' ? 'Recherche libre' : 'Free search'}</span>
            </div>
            <button type="button" className="home-s-card-action" onClick={onOpenCPlayer}>
              {language === 'fr' ? 'Ouvrir CPlayer' : 'Open CPlayer'} →
            </button>
          </div>
        </div>
      </div>

      {/* ===== RIGHT SIDEBAR ===== */}
      <aside className="home-s-aside">
        {/* Word of the day */}
        {wordOfDay && (
          <div className="home-s-wod">
            <span className="home-s-wod-flag">🇨🇳 {language === 'fr' ? 'MOT DU JOUR' : 'WORD OF THE DAY'}</span>
            <span className="home-s-wod-hanzi">{wordOfDay.hanzi}</span>
            <span className="home-s-wod-pinyin">({wordOfDay.pinyin})</span>
            <span className="home-s-wod-meaning">{language === 'fr' ? wordOfDay.translationFr : wordOfDay.translation}</span>
            {wordOfDay.examples.length > 0 && (
              <div className="home-s-wod-example">
                <p>💬 &laquo;{wordOfDay.examples[0].hanzi}&raquo;</p>
                <p className="home-s-wod-trans">— {language === 'fr' ? (wordOfDay.examples[0].translationFr || wordOfDay.examples[0].translation) : wordOfDay.examples[0].translation}</p>
              </div>
            )}
          </div>
        )}

        {/* Stats panel */}
        <div className="home-s-side-stats">
          <div className="home-s-side-stat">
            <span className="home-s-side-stat-icon">🔥</span>
            <div>
              <strong>{streak}</strong> <span>{language === 'fr' ? 'jours' : 'days'}</span>
            </div>
          </div>
          <div className="home-s-side-stat">
            <span className="home-s-side-stat-icon">⭐</span>
            <div>
              <strong>{xpTotal} XP</strong>
              <span className="home-s-lvl-badge">{language === 'fr' ? 'Niveau' : 'Level'} {currentLevel}</span>
            </div>
          </div>
          <div className="home-s-xp-wrap">
            <div className="home-s-xp-bar"><div style={{ width: `${xpPercent}%` }} /></div>
            <span>{xpInLevel}/{xpPerLevel} XP {language === 'fr' ? `pour le niveau ${currentLevel + 1}` : `to level ${currentLevel + 1}`}</span>
          </div>
        </div>

        {/* Calendar */}
        <div className="home-s-cal">
          <h4>📅 {monthNames[calendarMonth]} {calendarYear}</h4>
          <div className="home-s-cal-grid">
            {dayHeaders.map((d, i) => (
              <span key={`hd-${i}`} className="home-s-cal-hd">{d}</span>
            ))}
            {calendarDays.map((d, i) => (
              <span
                key={`d-${i}`}
                className={`home-s-cal-d${d === today ? ' today' : ''}${d === null ? ' empty' : ''}`}
              >
                {d ?? ''}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default HomePage;
