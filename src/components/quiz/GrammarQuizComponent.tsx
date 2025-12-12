import { useState } from 'react';
import type { Language } from '../../i18n';
import type { GrammarQuiz } from '../../types';
import './GrammarQuizComponent.css';

interface GrammarQuizComponentProps {
  quiz: GrammarQuiz;
  language: Language;
  onAnswer: (correct: boolean) => void;
}

export default function GrammarQuizComponent({ quiz, language, onAnswer }: GrammarQuizComponentProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // ============================================
  // RECONSTRUCTION DE PHRASE
  // ============================================
  if (quiz.type === 'sentence-reconstruction') {
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [availableWords, setAvailableWords] = useState<string[]>([...quiz.words]);

    const handleWordClick = (word: string, fromAvailable: boolean) => {
      if (isAnswered) return;

      if (fromAvailable) {
        setSelectedWords([...selectedWords, word]);
        setAvailableWords(availableWords.filter(w => w !== word));
      } else {
        setAvailableWords([...availableWords, word]);
        setSelectedWords(selectedWords.filter(w => w !== word));
      }
    };

    const handleSubmit = () => {
      const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(quiz.correctOrder);
      setIsAnswered(true);
      onAnswer(isCorrect);
    };

    const canSubmit = selectedWords.length === quiz.correctOrder.length;
    const isCorrect = isAnswered && JSON.stringify(selectedWords) === JSON.stringify(quiz.correctOrder);

    return (
      <div className="grammar-quiz sentence-reconstruction">
        <h2 className="quiz-instruction">
          {language === 'fr'
            ? 'Reconstituez la phrase en chinois :'
            : 'Reconstruct the sentence in Chinese:'}
        </h2>

        <div className="translation-prompt">
          {language === 'fr' ? quiz.translation : quiz.translationEn}
        </div>

        <div className="sentence-construction-area">
          <div className="selected-words-container">
            {selectedWords.length === 0 ? (
              <div className="empty-placeholder">
                {language === 'fr' ? 'Cliquez sur les mots ci-dessous' : 'Click on the words below'}
              </div>
            ) : (
              selectedWords.map((word, index) => (
                <button
                  key={`selected-${index}`}
                  className="word-chip selected"
                  onClick={() => handleWordClick(word, false)}
                  disabled={isAnswered}
                >
                  {word}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="available-words-container">
          {availableWords.map((word, index) => (
            <button
              key={`available-${index}`}
              className="word-chip available"
              onClick={() => handleWordClick(word, true)}
              disabled={isAnswered}
            >
              {word}
            </button>
          ))}
        </div>

        {isAnswered && (
          <div className={`answer-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <>
                <span className="feedback-icon">✓</span>
                <div>
                  <div className="feedback-text">
                    {language === 'fr' ? 'Correct !' : 'Correct!'}
                  </div>
                  <div className="pinyin-answer">{quiz.pinyin}</div>
                </div>
              </>
            ) : (
              <>
                <span className="feedback-icon">✗</span>
                <div>
                  <div className="feedback-text">
                    {language === 'fr' ? 'Réponse correcte :' : 'Correct answer:'}
                  </div>
                  <div className="correct-sentence">{quiz.correctOrder.join(' ')}</div>
                  <div className="pinyin-answer">{quiz.pinyin}</div>
                </div>
              </>
            )}
          </div>
        )}

        {!isAnswered && (
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            {language === 'fr' ? 'Vérifier' : 'Check'}
          </button>
        )}
      </div>
    );
  }

  // ============================================
  // CHOIX DE PARTICULE
  // ============================================
  if (quiz.type === 'particle-choice') {
    const handleChoiceClick = (choice: string) => {
      if (isAnswered) return;
      setSelectedAnswer(choice);
      setIsAnswered(true);
      onAnswer(choice === quiz.correctChoice);
    };

    return (
      <div className="grammar-quiz particle-choice">
        <h2 className="quiz-instruction">
          {language === 'fr'
            ? 'Choisissez la bonne particule :'
            : 'Choose the correct particle:'}
        </h2>

        <div className="translation-prompt">
          {language === 'fr' ? quiz.translation : quiz.translationEn}
        </div>

        <div className="sentence-with-blank">
          <span className="sentence-part">{quiz.sentenceBefore}</span>
          <span className="blank-space">___</span>
          <span className="sentence-part">{quiz.sentenceAfter}</span>
        </div>

        <div className="particle-choices">
          {quiz.choices.map((choice, index) => {
            const isCorrect = choice === quiz.correctChoice;
            const isSelected = choice === selectedAnswer;
            let className = 'particle-option';
            if (isAnswered) {
              if (isCorrect) className += ' correct';
              else if (isSelected) className += ' incorrect';
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleChoiceClick(choice)}
                disabled={isAnswered}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`answer-feedback ${selectedAnswer === quiz.correctChoice ? 'correct' : 'incorrect'}`}>
            <span className="feedback-icon">
              {selectedAnswer === quiz.correctChoice ? '✓' : '✗'}
            </span>
            <div>
              <div className="feedback-text">{quiz.explanation}</div>
              <div className="complete-sentence">
                {quiz.sentenceBefore}{quiz.correctChoice}{quiz.sentenceAfter}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================
  // COMPLÉTER UN BLANC
  // ============================================
  if (quiz.type === 'fill-blank') {
    const handleChoiceClick = (choice: string) => {
      if (isAnswered) return;
      setSelectedAnswer(choice);
      setIsAnswered(true);
      onAnswer(choice === quiz.correctChoice);
    };

    return (
      <div className="grammar-quiz fill-blank">
        <h2 className="quiz-instruction">
          {language === 'fr'
            ? 'Complétez la phrase :'
            : 'Complete the sentence:'}
        </h2>

        <div className="translation-prompt">
          {language === 'fr' ? quiz.translation : quiz.translationEn}
        </div>

        <div className="sentence-display">
          {quiz.sentence}
        </div>

        <div className="fill-blank-choices">
          {quiz.choices.map((choice, index) => {
            const isCorrect = choice === quiz.correctChoice;
            const isSelected = choice === selectedAnswer;
            let className = 'fill-option';
            if (isAnswered) {
              if (isCorrect) className += ' correct';
              else if (isSelected) className += ' incorrect';
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleChoiceClick(choice)}
                disabled={isAnswered}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`answer-feedback ${selectedAnswer === quiz.correctChoice ? 'correct' : 'incorrect'}`}>
            <span className="feedback-icon">
              {selectedAnswer === quiz.correctChoice ? '✓' : '✗'}
            </span>
            <div>
              <div className="complete-sentence">
                {quiz.sentence.replace('___', quiz.correctChoice)}
              </div>
              <div className="pinyin-answer">{quiz.pinyin}</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================
  // TRADUCTION VERS LE CHINOIS
  // ============================================
  if (quiz.type === 'translation-to-chinese') {
    const handleChoiceClick = (choice: string) => {
      if (isAnswered) return;
      setSelectedAnswer(choice);
      setIsAnswered(true);
      onAnswer(choice === quiz.correctAnswer);
    };

    return (
      <div className="grammar-quiz translation-to-chinese">
        <h2 className="quiz-instruction">
          {language === 'fr'
            ? 'Traduisez en chinois :'
            : 'Translate to Chinese:'}
        </h2>

        <div className="translation-prompt large">
          {language === 'fr' ? quiz.translation : quiz.translationEn}
        </div>

        <div className="translation-choices">
          {quiz.choices.map((choice, index) => {
            const isCorrect = choice === quiz.correctAnswer;
            const isSelected = choice === selectedAnswer;
            let className = 'translation-option';
            if (isAnswered) {
              if (isCorrect) className += ' correct';
              else if (isSelected) className += ' incorrect';
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleChoiceClick(choice)}
                disabled={isAnswered}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`answer-feedback ${selectedAnswer === quiz.correctAnswer ? 'correct' : 'incorrect'}`}>
            <span className="feedback-icon">
              {selectedAnswer === quiz.correctAnswer ? '✓' : '✗'}
            </span>
            <div>
              {selectedAnswer !== quiz.correctAnswer && (
                <div className="feedback-text">
                  {language === 'fr' ? 'Réponse correcte :' : 'Correct answer:'}
                </div>
              )}
              <div className="correct-answer">{quiz.correctAnswer}</div>
              <div className="pinyin-answer">{quiz.pinyin}</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
