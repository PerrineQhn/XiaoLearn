import { useEffect, useState } from 'react';
import type { LessonItem } from '../../types';
import type { Language } from '../../i18n';
import AudioButton from '../AudioButton';
import { getLessonTranslation } from '../../utils/lesson';
import LevelBadge from '../LevelBadge';

export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

interface ReviewSrsSessionProps {
  currentItem?: LessonItem;
  pendingCount: number;
  upcomingCount: number;
  language: Language;
  onAnswer: (rating: ReviewRating) => void;
}

const ReviewSrsSession = ({ currentItem, pendingCount, upcomingCount, language, onAnswer }: ReviewSrsSessionProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false);
  }, [currentItem?.id]);

  if (!currentItem) {
    return (
      <div className="review-session-card srs-mode">
        <div className="review-empty-state compact">
          {language === 'fr'
            ? upcomingCount > 0
              ? 'Toutes les cartes prévues ont été révisées pour le moment.'
              : 'Aucune carte à réviser.'
            : upcomingCount > 0
            ? 'All due cards are completed for now.'
            : 'No cards to review.'}
        </div>
      </div>
    );
  }

  const translation = getLessonTranslation(currentItem, language);

  return (
    <div className="review-session-card srs-mode">
      <div className="review-session-header">
        <div>
          <div className="pending-pill">
            {language === 'fr' ? 'Cartes dues' : 'Due cards'}: {pendingCount}
          </div>
          <div className="pending-pill subtle">
            {language === 'fr' ? 'À venir' : 'Upcoming'}: {upcomingCount}
          </div>
        </div>
        <button type="button" className="btn-secondary" onClick={() => setShowAnswer((prev) => !prev)}>
          {showAnswer ? (language === 'fr' ? 'Masquer' : 'Hide') : (language === 'fr' ? 'Voir la réponse' : 'Show answer')}
        </button>
      </div>

      <div className="quiz-word standalone review-word">
        <div className="quiz-word-header">
          <LevelBadge level={currentItem.level} />
        </div>
        <div className="quiz-hanzi">{currentItem.hanzi}</div>
        <div className="quiz-pinyin">{currentItem.pinyin}</div>
        <AudioButton src={`/${currentItem.audio}`} />
        {showAnswer && <div className="review-card-translation">{translation}</div>}
      </div>

      {showAnswer && (
        <div className="srs-rating-buttons">
          <button type="button" className="srs-btn again" onClick={() => onAnswer('again')}>
            {language === 'fr' ? 'Encore' : 'Again'}
            <span className="srs-time">1 min</span>
          </button>
          <button type="button" className="srs-btn hard" onClick={() => onAnswer('hard')}>
            {language === 'fr' ? 'Difficile' : 'Hard'}
            <span className="srs-time">10 min</span>
          </button>
          <button type="button" className="srs-btn good" onClick={() => onAnswer('good')}>
            {language === 'fr' ? 'Bien' : 'Good'}
            <span className="srs-time">12 h</span>
          </button>
          <button type="button" className="srs-btn easy" onClick={() => onAnswer('easy')}>
            {language === 'fr' ? 'Facile' : 'Easy'}
            <span className="srs-time">3 j</span>
          </button>
        </div>
      )}

      {!showAnswer && (
        <div className="srs-help-text">
          {language === 'fr'
            ? 'Appuyez sur “Voir la réponse” puis choisissez la difficulté.'
            : 'Tap “Show answer” then select the difficulty rating.'}
        </div>
      )}
    </div>
  );
};

export default ReviewSrsSession;
