import { useMemo } from 'react';
import type { LessonItem, LevelId, ThemeSummary } from '../types';
import type { Language } from '../i18n';
import { themeLabels, getCopy } from '../i18n';
import { getLessonTranslation } from '../utils/lesson';
import LearningProgressChart from '../components/LearningProgressChart';
import { useAuth } from '../contexts/AuthContext';

interface HomePageProps {
  todayLessons: LessonItem[];
  totals: Record<LevelId, number>;
  onContinue: () => void;
  onOpenReview: () => void;
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
}

const themeSecondaryMap: Record<string, string> = {
  "asian-red": "#E3F5F2",
  "jade-green": "#FFE3E0",
  "royal-purple": "#F0E8FF",
  "ocean-blue": "#DBEAFE",
  "sunset-orange": "#FFE7D5",
  "sakura-pink": "#FDE7F2"
};

const HomePage = ({
  todayLessons,
  totals,
  onContinue,
  onOpenReview,
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
  showAdvancedStats
}: HomePageProps) => {
  const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Utilisateur';

  // Calculer les stats réelles
  const totalWords = useMemo(() => {
    return Object.values(totals).reduce((sum, count) => sum + count, 0);
  }, [totals]);
  const targetLesson = nextLesson ?? todayLessons[0];
  const nextLessonTitle = targetLesson ? targetLesson.hanzi : language === 'fr' ? 'Aucune leçon' : 'No lesson';
  const nextLessonSubtitle = targetLesson ? getLessonTranslation(targetLesson, language) : '';
  const reviewSubtitle =
    pendingReviews > 0
      ? language === 'fr'
        ? `${pendingReviews} carte${pendingReviews > 1 ? 's' : ''} à revoir`
        : `${pendingReviews} review${pendingReviews > 1 ? 's' : ''}`
      : language === 'fr'
      ? 'Aucune révision'
      : 'No reviews';

  const themedIcon = (slug: string) => `/icons/icon_${slug}_${colorTheme}.png`;
const secondaryCircle = themeSecondaryMap[colorTheme] || 'rgba(0,0,0,0.08)';

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="welcome-section">
        <div className="welcome-ornament" aria-hidden="true">
          学
        </div>
        <h1 className="welcome-title">
          {language === 'fr' ? 'Bienvenue, ' : 'Welcome, '}
          <span className="user-name">{displayName}</span>
        </h1>
        <p className="level-badge on-dark">
          {language === 'fr' ? 'Niveau 0 — 0 / 100 XP (0% vers le niveau 1)' : 'Level 0 — 0 / 100 XP (0% to level 1)'}
        </p>
      </section>

      {/* CTA Button */}
      <button className="main-cta" onClick={onContinue}>
        {copy.heroCta}
        <span className="arrow">→</span>
      </button>

      {/* Learning Progress Chart */}
      {showAdvancedStats ? (
        <LearningProgressChart language={language} />
      ) : (
        <section className="progress-section">
          <h2 className="section-title">
            {language === 'fr' ? 'Statistiques' : 'Statistics'}
          </h2>
          <div className="progress-summary">
            <p className="total-label">
              {language === 'fr'
                ? 'Mode gratuit: statistiques avancées disponibles en premium'
                : 'Free mode: advanced statistics are available in premium'}
            </p>
          </div>
        </section>
      )}

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: secondaryCircle }}>
            <img src={themedIcon('objectifs')} alt="" />
          </div>
          <div className="stat-content">
            <div className="stat-label">{language === 'fr' ? 'Objectif' : 'Goal'}</div>
            <div className="stat-value">
              {Math.min(minutesToday, minuteGoal)}/{minuteGoal} min
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: secondaryCircle }}>
            <img src={themedIcon('serie')} alt="" />
          </div>
          <div className="stat-content">
            <div className="stat-label">{language === 'fr' ? 'Série' : 'Streak'}</div>
            <div className="stat-value">{streak} {language === 'fr' ? 'jour' : 'day'}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: secondaryCircle }}>
            <img src={themedIcon('progres')} alt="" />
          </div>
          <div className="stat-content">
            <div className="stat-label">{language === 'fr' ? 'Progression' : 'Progress'}</div>
            <div className="stat-value">{progressPercent}%</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: secondaryCircle }}>
            <img src={themedIcon('today')} alt="" />
          </div>
          <div className="stat-content">
            <div className="stat-label">{language === 'fr' ? "Aujourd'hui" : 'Today'}</div>
            <div className="stat-value">
              {minutesToday} {language === 'fr' ? 'min' : 'min'}
            </div>
          </div>
        </div>
      </div>

      {/* Next Lesson Card */}
      <section className="next-lesson-section">
        <div className="section-header-inline">
          <span className="section-badge">{language === 'fr' ? 'NOUVELLE LEÇON' : 'NEW LESSON'}</span>
        </div>
        <div className="next-lesson-card" onClick={onContinue}>
          <div className="play-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="lesson-info">
            <div className="lesson-title">{language === 'fr' ? 'Prochaine leçon' : 'Next lesson'}</div>
            <div className="lesson-subtitle">
              {nextLessonSubtitle || (language === 'fr' ? 'Choisissez une leçon' : 'Pick a lesson')}
            </div>
          </div>
        </div>
      </section>

      {/* Continue Section */}
      <section className="continue-section">
        <h2 className="section-title">{language === 'fr' ? 'CONTINUE ICI' : 'CONTINUE HERE'}</h2>

        <div className="continue-grid">
          <div className="continue-card">
            <div className="continue-icon" style={{ background: secondaryCircle }}>
              <img src={themedIcon('lecons')} alt="" />
            </div>
            <div className="continue-content">
              <div className="continue-badge">{language === 'fr' ? 'LEÇON SUIVANTE' : 'NEXT LESSON'}</div>
              <div className="continue-title">{nextLessonTitle}</div>
              {nextLessonSubtitle && <p className="continue-subtitle">{nextLessonSubtitle}</p>}
              <button className="continue-btn" onClick={onContinue}>
                {language === 'fr' ? 'Continuer' : 'Continue'} →
              </button>
            </div>
          </div>

          <div className="continue-card">
            <div className="continue-icon" style={{ background: secondaryCircle }}>
              <img src={themedIcon('reviser')} alt="" />
            </div>
            <div className="continue-content">
              <div className="continue-badge">{language === 'fr' ? 'RÉVISION DU JOUR' : 'DAILY REVIEW'}</div>
              <div className="continue-title">{reviewSubtitle}</div>
              <button
                className={`continue-btn ${pendingReviews === 0 ? 'disabled' : ''}`}
                onClick={() => pendingReviews > 0 && onOpenReview()}
                disabled={pendingReviews === 0}
              >
                {language === 'fr' ? 'Réviser' : 'Review'} →
              </button>
            </div>
          </div>

          <div className="continue-card">
            <div className="continue-icon" style={{ background: secondaryCircle }}>
              <img src={themedIcon('jeux')} alt="" />
            </div>
            <div className="continue-content">
              <div className="continue-badge">{language === 'fr' ? 'MINI-JEU DU JOUR' : 'DAILY MINI-GAME'}</div>
              <div className="continue-title">{language === 'fr' ? 'Entraînement rapide' : 'Quick practice'}</div>
              <button className="continue-btn">
                {language === 'fr' ? 'Jouer' : 'Play'} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="progress-section">
        <h2 className="section-title">{language === 'fr' ? 'VOTRE PROGRESSION HSK' : 'YOUR HSK PROGRESS'}</h2>
        <div className="progress-summary">
          <div className="total-words">
            <span className="total-number">{totalWords}</span>
            <span className="total-label">{language === 'fr' ? 'mots disponibles' : 'words available'}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
