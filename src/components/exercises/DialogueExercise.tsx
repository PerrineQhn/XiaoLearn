import { useState } from 'react';
import type { Language } from '../../i18n';
import type { LessonExerciseDialogue } from '../../types';
import AudioButton from '../AudioButton';

interface DialogueExerciseProps {
  exercise: LessonExerciseDialogue;
  language: Language;
  onAnswer: (correct: boolean) => void;
}

export default function DialogueExercise({ exercise, language, onAnswer }: DialogueExerciseProps) {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [orderedLines, setOrderedLines] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const prompt = language === 'fr' ? exercise.promptFr : exercise.promptEn;
  const context = language === 'fr' ? exercise.context : exercise.contextEn;

  const handleFillBlank = (lineIndex: number, value: string) => {
    setUserAnswers({ ...userAnswers, [lineIndex]: value });
  };

  const handleOrderLine = (lineIndex: number) => {
    if (orderedLines.includes(lineIndex)) return;
    setOrderedLines([...orderedLines, lineIndex]);
  };

  const resetOrder = () => {
    setOrderedLines([]);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let correct = false;

    if (exercise.mode === 'fill-blanks' && exercise.correctAnswers) {
      // Check fill-in-the-blank answers
      const blankIndices = exercise.dialogue
        .map((line, idx) => (line.isBlank ? idx : -1))
        .filter((idx) => idx !== -1);

      correct = blankIndices.every((idx, answerIdx) => {
        const userAnswer = userAnswers[idx]?.trim().toLowerCase() || '';
        const correctAnswer = exercise.correctAnswers?.[answerIdx]?.trim().toLowerCase() || '';
        return userAnswer === correctAnswer;
      });
    } else if (exercise.mode === 'order') {
      // Check if dialogue is in correct order
      correct = orderedLines.length === exercise.dialogue.length &&
        orderedLines.every((lineIdx, position) => lineIdx === position);
    } else if (exercise.mode === 'role-play') {
      // For role-play, we consider it correct if user provided answers
      correct = Object.keys(userAnswers).length > 0;
    }

    setIsCorrect(correct);
    onAnswer(correct);
  };

  return (
    <div className="dialogue-exercise">
      <div className="exercise-header">
        <h2 className="exercise-prompt">{prompt}</h2>
        <p className="dialogue-context">{context}</p>
      </div>

      {exercise.mode === 'fill-blanks' && (
        <div className="dialogue-fill-blanks">
          {exercise.dialogue.map((line, index) => (
            <div key={index} className="dialogue-line">
              <span className="speaker-label">{line.speaker}:</span>
              {line.isBlank ? (
                <input
                  type="text"
                  className="blank-input"
                  value={userAnswers[index] || ''}
                  onChange={(e) => handleFillBlank(index, e.target.value)}
                  disabled={submitted}
                  placeholder="___"
                />
              ) : (
                <span className="dialogue-text">{line.text}</span>
              )}
              {line.audio && (
                <AudioButton src={`/${line.audio}`} label="🔊" />
              )}
            </div>
          ))}
        </div>
      )}

      {exercise.mode === 'order' && (
        <div className="dialogue-order">
          <div className="ordered-lines">
            <p className="order-title">
              {language === 'fr' ? 'Ordre du dialogue :' : 'Dialogue order:'}
            </p>
            {orderedLines.length === 0 ? (
              <p className="order-placeholder">
                {language === 'fr'
                  ? 'Cliquez sur les lignes ci-dessous pour les ordonner'
                  : 'Click on the lines below to order them'}
              </p>
            ) : (
              orderedLines.map((lineIdx) => {
                const line = exercise.dialogue[lineIdx];
                return (
                  <div key={lineIdx} className="dialogue-line ordered">
                    <span className="speaker-label">{line.speaker}:</span>
                    <span className="dialogue-text">{line.text}</span>
                  </div>
                );
              })
            )}
          </div>

          <div className="available-lines">
            <p className="order-title">
              {language === 'fr' ? 'Lignes disponibles :' : 'Available lines:'}
            </p>
            {exercise.dialogue.map((line, index) => (
              <button
                key={index}
                className={`dialogue-line-btn ${orderedLines.includes(index) ? 'used' : ''}`}
                onClick={() => handleOrderLine(index)}
                disabled={orderedLines.includes(index) || submitted}
              >
                <span className="speaker-label">{line.speaker}:</span>
                <span className="dialogue-text">{line.text}</span>
              </button>
            ))}
          </div>

          {orderedLines.length > 0 && !submitted && (
            <button className="btn-secondary" onClick={resetOrder}>
              {language === 'fr' ? 'Réinitialiser' : 'Reset'}
            </button>
          )}
        </div>
      )}

      {exercise.mode === 'role-play' && (
        <div className="dialogue-role-play">
          <p className="role-play-instruction">
            {language === 'fr'
              ? 'Complétez le dialogue en jouant le rôle du locuteur B :'
              : 'Complete the dialogue by playing speaker B:'}
          </p>
          {exercise.dialogue.map((line, index) => (
            <div key={index} className="dialogue-line">
              <span className="speaker-label">{line.speaker}:</span>
              {line.speaker === 'A' ? (
                <>
                  <span className="dialogue-text">{line.text}</span>
                  {line.audio && <AudioButton src={`/${line.audio}`} label="🔊" />}
                </>
              ) : (
                <input
                  type="text"
                  className="role-play-input"
                  value={userAnswers[index] || ''}
                  onChange={(e) => handleFillBlank(index, e.target.value)}
                  disabled={submitted}
                  placeholder={language === 'fr' ? 'Votre réponse...' : 'Your answer...'}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {!submitted ? (
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={
            (exercise.mode === 'order' && orderedLines.length !== exercise.dialogue.length) ||
            (exercise.mode === 'fill-blanks' && Object.keys(userAnswers).length === 0) ||
            (exercise.mode === 'role-play' && Object.keys(userAnswers).length === 0)
          }
        >
          {language === 'fr' ? 'Valider' : 'Submit'}
        </button>
      ) : (
        <div className={`answer-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          <span className="feedback-icon">{isCorrect ? '✓' : '✗'}</span>
          <div>
            {isCorrect
              ? language === 'fr'
                ? 'Excellent !'
                : 'Excellent!'
              : language === 'fr'
              ? 'Réessayez, vous y êtes presque !'
              : 'Try again, you\'re almost there!'}
          </div>
        </div>
      )}
    </div>
  );
}
