import { useState, useEffect, useCallback } from 'react';
import type { Language } from '../../i18n';
import type { LessonItem } from '../../types';
import { getLessonTranslation } from '../../utils/lesson';

interface SpeedQuizGameProps {
  language: Language;
  items: LessonItem[];
  onComplete: (score: number) => void;
}

const GAME_DURATION = 60; // seconds
const POINTS_PER_CORRECT = 10;

const SpeedQuizGame = ({ language, items = [], onComplete }: SpeedQuizGameProps) => {
  const [currentItem, setCurrentItem] = useState<LessonItem | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isGameActive, setIsGameActive] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const hasEnoughQuestions = Array.isArray(items) && items.length >= 4;

  const generateQuestion = useCallback(() => {
    if (!hasEnoughQuestions) return;

    const randomItem = items[Math.floor(Math.random() * items.length)];
    const correctAnswer = getLessonTranslation(randomItem, language);

    // Generate wrong options
    const wrongOptions = items
      .filter(item => item.id !== randomItem.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(item => getLessonTranslation(item, language));

    const allOptions = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);

    setCurrentItem(randomItem);
    setOptions(allOptions);
    setFeedback(null);
  }, [items, language, hasEnoughQuestions]);

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isGameActive) {
      setIsGameActive(false);
      onComplete(score);
    }
  }, [timeLeft, isGameActive, score, onComplete]);

  useEffect(() => {
    if (isGameActive) {
      generateQuestion();
    }
  }, [isGameActive, generateQuestion]);

  const startGame = () => {
    if (!hasEnoughQuestions) return;
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setQuestionsAnswered(0);
    setIsGameActive(true);
    generateQuestion();
  };

  const handleAnswer = (selectedAnswer: string) => {
    if (!currentItem || feedback !== null) return;

    const correctAnswer = getLessonTranslation(currentItem, language);
    const isCorrect = selectedAnswer === correctAnswer;

    setFeedback(isCorrect ? 'correct' : 'wrong');
    setQuestionsAnswered(questionsAnswered + 1);

    if (isCorrect) {
      setScore(score + POINTS_PER_CORRECT);
    }

    setTimeout(() => {
      generateQuestion();
    }, 800);
  };

  if (!hasEnoughQuestions) {
    return (
      <div className="speed-quiz-start">
        <div className="speed-quiz-intro">
          <h3 className="speed-quiz-title">
            {language === 'fr' ? '⚡ Quiz Rapide' : '⚡ Speed Quiz'}
          </h3>
          <p className="speed-quiz-description">
            {language === 'fr'
              ? 'Ajoutez davantage de cartes pour jouer au quiz rapide.'
              : 'Add a few more cards to unlock the speed quiz.'}
          </p>
        </div>
      </div>
    );
  }

  if (!isGameActive && questionsAnswered === 0) {
    return (
      <div className="speed-quiz-start">
        <div className="speed-quiz-intro">
          <h3 className="speed-quiz-title">
            {language === 'fr' ? '⚡ Quiz Rapide' : '⚡ Speed Quiz'}
          </h3>
          <p className="speed-quiz-description">
            {language === 'fr'
              ? `Réponds à un maximum de questions en ${GAME_DURATION} secondes !`
              : `Answer as many questions as you can in ${GAME_DURATION} seconds!`}
          </p>
          <div className="game-rules">
            {language === 'fr'
              ? '📝 Règles : Tu verras un caractère chinois avec son pinyin. Sélectionne la bonne traduction parmi les 4 propositions. Chaque bonne réponse te rapporte 10 points. Sois rapide, le temps est limité !'
              : '📝 Rules: You\'ll see a Chinese character with its pinyin. Select the correct translation among 4 options. Each correct answer gives you 10 points. Be quick, time is limited!'}
          </div>
          <button className="btn-primary speed-quiz-start-btn" onClick={startGame}>
            {language === 'fr' ? 'Commencer' : 'Start'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="speed-quiz-game">
      <div className="speed-quiz-header">
        <div className="speed-quiz-timer">
          ⏱️ {timeLeft}s
        </div>
        <div className="speed-quiz-score">
          {language === 'fr' ? 'Score' : 'Score'}: {score}
        </div>
      </div>

      {currentItem && (
        <div className="speed-quiz-question">
          <div className="speed-quiz-character">{currentItem.hanzi}</div>
          <div className="speed-quiz-pinyin">{currentItem.pinyin}</div>

          <p className="speed-quiz-prompt">
            {language === 'fr' ? 'Sélectionne la traduction :' : 'Select the translation:'}
          </p>

          <div className="speed-quiz-options">
            {options.map((option, index) => (
              <button
                key={index}
                className={`speed-quiz-option ${
                  feedback === 'correct' && option === getLessonTranslation(currentItem, language)
                    ? 'correct'
                    : feedback === 'wrong' && option === getLessonTranslation(currentItem, language)
                    ? 'show-correct'
                    : ''
                }`}
                onClick={() => handleAnswer(option)}
                disabled={feedback !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeedQuizGame;
