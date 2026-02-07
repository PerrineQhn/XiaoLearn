import { useState } from 'react';
import type { LessonItem } from '../types';
import { resolveAudioSrc } from '../utils/audio';
import './FlashcardItem.css';

interface FlashcardItemProps {
  card: LessonItem;
  onAnswer: (quality: 1 | 2 | 3 | 4) => void;
  language: 'fr' | 'en';
  isNewCard: boolean;
}

export default function FlashcardItem({ card, onAnswer, language, isNewCard }: FlashcardItemProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      setShowButtons(true);
    }
  };

  const handleAnswer = (quality: 1 | 2 | 3 | 4) => {
    setIsFlipped(false);
    setShowButtons(false);
    setTimeout(() => onAnswer(quality), 300);
  };

  const playAudio = () => {
    if (!card.audio) return;
    const audio = new Audio(resolveAudioSrc(card.audio));
    audio.play().catch(err => console.error('Audio play failed:', err));
  };

  return (
    <div className="flashcard-container">
      {isNewCard && (
        <div className="new-card-badge">
          {language === 'fr' ? 'Nouveau' : 'New'}
        </div>
      )}

      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="flashcard-inner">
          {/* Front side */}
          <div className="flashcard-face flashcard-front">
            <div className="flashcard-content">
              <div className="hanzi-large">{card.hanzi}</div>
              <div className="pinyin-subtitle">{card.pinyin}</div>
              {card.audio && (
                <button
                  className="audio-btn-card"
                  onClick={(e) => {
                    e.stopPropagation();
                    playAudio();
                  }}
                  type="button"
                  aria-label="Play pronunciation"
                >
                  🔊
                </button>
              )}
              <div className="tap-hint">
                {language === 'fr' ? 'Cliquez pour voir la réponse' : 'Tap to reveal answer'}
              </div>
            </div>
          </div>

          {/* Back side */}
          <div className="flashcard-face flashcard-back">
            <div className="flashcard-content">
              <div className="hanzi-medium">{card.hanzi}</div>
              <div className="pinyin-subtitle">{card.pinyin}</div>
              <div className="translation-large">
                {language === 'fr' ? card.translationFr || card.translation : card.translation}
              </div>
              {(card.explanation || card.explanationFr) && (
                <div className="explanation-text">
                  {language === 'fr' ? card.explanationFr || card.explanation : card.explanation}
                </div>
              )}
              {card.examples && card.examples.length > 0 && (
                <div className="example-sentence">
                  <div className="example-hanzi">{card.examples[0].hanzi}</div>
                  <div className="example-translation">{card.examples[0].translation}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showButtons && (
        <div className="answer-buttons">
          <button
            className="answer-btn again"
            onClick={() => handleAnswer(1)}
            type="button"
          >
            <span className="btn-time">&lt;1 {language === 'fr' ? 'j' : 'd'}</span>
            <span className="btn-label">{language === 'fr' ? 'À revoir' : 'Again'}</span>
          </button>
          <button
            className="answer-btn hard"
            onClick={() => handleAnswer(2)}
            type="button"
          >
            <span className="btn-time">&lt;3 {language === 'fr' ? 'j' : 'd'}</span>
            <span className="btn-label">{language === 'fr' ? 'Difficile' : 'Hard'}</span>
          </button>
          <button
            className="answer-btn good"
            onClick={() => handleAnswer(3)}
            type="button"
          >
            <span className="btn-time">&lt;7 {language === 'fr' ? 'j' : 'd'}</span>
            <span className="btn-label">{language === 'fr' ? 'Bien' : 'Good'}</span>
          </button>
          <button
            className="answer-btn easy"
            onClick={() => handleAnswer(4)}
            type="button"
          >
            <span className="btn-time">&lt;14 {language === 'fr' ? 'j' : 'd'}</span>
            <span className="btn-label">{language === 'fr' ? 'Facile' : 'Easy'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
