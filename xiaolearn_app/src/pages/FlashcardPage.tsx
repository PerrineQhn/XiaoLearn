import { useState, useEffect } from 'react';
import type { Language } from '../i18n';
import type { LevelId, LessonItem } from '../types';
import { getLessonsByLevel, levelIds, loadHorsHskLessons } from '../data/lessons';
import { useFlashcardSRS } from '../hooks/useFlashcardSRS';
import FlashcardItem from '../components/FlashcardItem';
import './FlashcardPage.css';

interface FlashcardPageProps {
  language: Language;
  onWordLearned?: (wordId: string) => void;
  limitedMode?: boolean;
  dailyNewCardsLimit?: number;
  syncEnabled?: boolean;
}

const LEVEL_NAMES: Record<LevelId, { fr: string; en: string }> = {
  hsk1: { fr: 'HSK 1 - Débutant', en: 'HSK 1 - Beginner' },
  hsk2: { fr: 'HSK 2 - Élémentaire', en: 'HSK 2 - Elementary' },
  hsk3: { fr: 'HSK 3 - Intermédiaire', en: 'HSK 3 - Intermediate' },
  hsk4: { fr: 'HSK 4 - Intermédiaire supérieur', en: 'HSK 4 - Upper Intermediate' },
  hsk5: { fr: 'HSK 5 - Avancé', en: 'HSK 5 - Advanced' },
  hsk6: { fr: 'HSK 6 - Supérieur', en: 'HSK 6 - Superior' },
  hsk7: { fr: 'HSK 7 - Expert', en: 'HSK 7 - Expert' },
  'hors-hsk': { fr: 'Hors HSK', en: 'Non-HSK' }
};

export default function FlashcardPage({
  language,
  onWordLearned,
  limitedMode = false,
  dailyNewCardsLimit = 10,
  syncEnabled = true
}: FlashcardPageProps) {
  const [selectedLevel, setSelectedLevel] = useState<LevelId>('hsk1');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [levelWords, setLevelWords] = useState<LessonItem[]>(() => getLessonsByLevel('hsk1'));
  const availableLevels: LevelId[] = limitedMode ? ['hsk1'] : levelIds;

  const {
    session,
    startSession,
    answerCard,
    getLevelStats,
    isLevelUnlocked
  } = useFlashcardSRS(selectedLevel, levelWords, onWordLearned, {
    dailyNewCards: dailyNewCardsLimit,
    maxUnlockedLevel: limitedMode ? 'hsk1' : undefined,
    syncEnabled
  });

  useEffect(() => {
    if (!availableLevels.includes(selectedLevel)) {
      setSelectedLevel('hsk1');
    }
  }, [availableLevels, selectedLevel]);

  useEffect(() => {
    let active = true;
    if (selectedLevel !== 'hors-hsk') {
      setLevelWords(getLessonsByLevel(selectedLevel));
      return () => {
        active = false;
      };
    }

    loadHorsHskLessons()
      .then(() => {
        if (active) setLevelWords(getLessonsByLevel('hors-hsk'));
      })
      .catch((error) => {
        console.warn('Impossible de charger hors-hsk pour les flashcards', error);
        if (active) setLevelWords([]);
      });

    return () => {
      active = false;
    };
  }, [selectedLevel]);

  const stats = getLevelStats();
  const progressPercent = stats.total > 0
    ? Math.round(((stats.learning + stats.mature) / stats.total) * 100)
    : 0;

  const handleStartSession = () => {
    startSession();
    setIsSessionActive(true);
  };

  const handleAnswer = (quality: 1 | 2 | 3 | 4) => {
    answerCard(quality);
  };

  useEffect(() => {
    if (session.sessionComplete && isSessionActive) {
      setIsSessionActive(false);
    }
  }, [session.sessionComplete, isSessionActive]);

  const isNewCard = session.currentCard
    ? session.newCards.some(card => card.id === session.currentCard?.id)
    : false;

  const renderLevelSelection = () => (
    <div className="flashcard-level-selection">
      <h2 className="page-title">
        {language === 'fr' ? 'Cartes Mémoire HSK' : 'HSK Flashcards'}
      </h2>
      <p className="page-subtitle">
        {language === 'fr'
          ? 'Apprenez le vocabulaire HSK avec un système de répétition espacée'
          : 'Learn HSK vocabulary with spaced repetition'}
      </p>
      {limitedMode && (
        <p className="page-subtitle" style={{ marginTop: 8 }}>
          {language === 'fr'
            ? `Mode gratuit: HSK 1 et ${dailyNewCardsLimit} nouvelles cartes par jour`
            : `Free mode: HSK 1 and ${dailyNewCardsLimit} new cards per day`}
        </p>
      )}

      <div className="level-grid">
        {availableLevels.map((level) => {
          const unlocked = isLevelUnlocked(level);
          const levelStats = getLevelStats(level);
          const completion = levelStats.total > 0
            ? Math.round(((levelStats.learning + levelStats.mature) / levelStats.total) * 100)
            : 0;

          return (
            <button
              key={level}
              className={`level-card ${selectedLevel === level ? 'selected' : ''} ${!unlocked ? 'locked' : ''}`}
              onClick={() => unlocked && setSelectedLevel(level)}
              disabled={!unlocked}
              type="button"
            >
              <div className="level-header">
                <h3 className="level-name">
                  {language === 'fr' ? LEVEL_NAMES[level].fr : LEVEL_NAMES[level].en}
                </h3>
                {!unlocked && (
                  <span className="lock-icon">🔒</span>
                )}
              </div>

              {unlocked && (
                <div className="level-stats-mini">
                  <div className="stat-item">
                    <span className="stat-value">{levelStats.dueToday}</span>
                    <span className="stat-label">
                      {language === 'fr' ? 'À réviser' : 'Due'}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{levelStats.new}</span>
                    <span className="stat-label">
                      {language === 'fr' ? 'Nouveaux' : 'New'}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{completion}%</span>
                    <span className="stat-label">
                      {language === 'fr' ? 'Progrès' : 'Progress'}
                    </span>
                  </div>
                </div>
              )}

              {!unlocked && (
                <p className="unlock-hint">
                  {language === 'fr'
                    ? 'Terminez 80% du niveau précédent'
                    : 'Complete 80% of previous level'}
                </p>
              )}
            </button>
          );
        })}
      </div>

      <div className="selected-level-info">
        <div className="selected-level-heading">
          <div>
            <p className="selected-level-eyebrow">
              {language === 'fr' ? 'Progression HSK' : 'HSK progress'}
            </p>
            <h3>
              {language === 'fr' ? LEVEL_NAMES[selectedLevel].fr : LEVEL_NAMES[selectedLevel].en}
            </h3>
          </div>
          <div className="selected-level-progress-chip">
            <span className="chip-value">{progressPercent}%</span>
            <span className="chip-label">
              {language === 'fr' ? 'Progression' : 'Progress'}
            </span>
          </div>
        </div>

        <p className="selected-level-note">
          {language === 'fr'
            ? `${stats.new} nouvelles cartes et ${stats.dueToday} révisions sont prêtes.`
            : `${stats.new} new cards and ${stats.dueToday} reviews are ready.`}
        </p>

        <div className="stats-highlight-grid">
          <div className="stat-box total">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-text">{language === 'fr' ? 'Total' : 'Total'}</div>
          </div>
          <div className="stat-box new">
            <div className="stat-number">{stats.new}</div>
            <div className="stat-text">{language === 'fr' ? 'Nouveaux' : 'New'}</div>
          </div>
          <div className="stat-box learning">
            <div className="stat-number">{stats.learning}</div>
            <div className="stat-text">{language === 'fr' ? 'En cours' : 'Learning'}</div>
          </div>
          <div className="stat-box mature">
            <div className="stat-number">{stats.mature}</div>
            <div className="stat-text">{language === 'fr' ? 'Maîtrisés' : 'Mature'}</div>
          </div>
        </div>

        <div className="review-summary-card">
          <div>
            <p className="summary-label">
              {language === 'fr' ? 'À réviser aujourd\'hui' : 'Due today'}
            </p>
            <p className="summary-caption">
              {language === 'fr'
                ? 'Consolidez vos apprentissages quotidiens.'
                : 'Keep your daily momentum.'}
            </p>
          </div>
          <div className="summary-count">
            <span>{stats.dueToday}</span>
            <small>{language === 'fr' ? 'cartes' : 'cards'}</small>
          </div>
        </div>

        <div className="action-buttons">
          <button
            className="start-session-btn primary"
            onClick={handleStartSession}
            disabled={stats.dueToday === 0 && stats.new === 0}
            type="button"
          >
            {language === 'fr' ? '🎯 Commencer la session' : '🎯 Start Session'}
          </button>

          {(stats.dueToday === 0 && stats.new === 0) && (
            <p className="no-cards-message">
              {language === 'fr'
                ? 'Aucune carte à réviser aujourd\'hui. Revenez demain !'
                : 'No cards to review today. Come back tomorrow!'}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderSession = () => {
    if (session.sessionComplete) {
      const reviewedCount = session.currentIndex;

      return (
        <div className="session-complete">
          <div className="completion-card">
            <div className="completion-icon">🎉</div>
            <h2 className="completion-title">
              {language === 'fr' ? 'Session terminée !' : 'Session Complete!'}
            </h2>
            <p className="completion-message">
              {language === 'fr'
                ? `Vous avez révisé ${reviewedCount} carte${reviewedCount > 1 ? 's' : ''} aujourd'hui.`
                : `You reviewed ${reviewedCount} card${reviewedCount > 1 ? 's' : ''} today.`}
            </p>
            <button
              className="flashcard-back-btn"
              onClick={() => setIsSessionActive(false)}
              type="button"
            >
              {language === 'fr' ? 'Retour aux niveaux' : 'Back to Levels'}
            </button>
          </div>
        </div>
      );
    }

    if (!session.currentCard) {
      return (
        <div className="no-cards">
          <p>{language === 'fr' ? 'Aucune carte disponible' : 'No cards available'}</p>
        </div>
      );
    }

    return (
      <div className="session-container">
        <div className="session-header">
          <button
            className="exit-btn"
            onClick={() => setIsSessionActive(false)}
            type="button"
          >
            {language === 'fr' ? '← Quitter' : '← Exit'}
          </button>
          <div className="session-progress">
            <span className="progress-text">
              {session.currentIndex + 1} / {session.totalCards}
            </span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((session.currentIndex + 1) / session.totalCards) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <FlashcardItem
          card={session.currentCard}
          onAnswer={handleAnswer}
          language={language}
          isNewCard={isNewCard}
        />

        <div className="session-info">
          <div className="remaining-cards">
            <span className="info-label">{language === 'fr' ? 'Nouvelles :' : 'New:'}</span>
            <span className="info-value">{session.newCards.length - session.newCards.filter((_, i) => i <= session.currentIndex).length}</span>
          </div>
          <div className="remaining-cards">
            <span className="info-label">{language === 'fr' ? 'Révisions :' : 'Review:'}</span>
            <span className="info-value">{session.reviewCards.length - session.reviewCards.filter((_, i) => i <= session.currentIndex).length}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flashcard-page">
      {isSessionActive ? renderSession() : renderLevelSelection()}
    </div>
  );
}
