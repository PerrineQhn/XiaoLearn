import { useState } from 'react';
import type { Language } from '../../i18n';
import type { LessonExerciseReading } from '../../types';
import AudioButton from '../AudioButton';

interface ReadingExerciseProps {
  exercise: LessonExerciseReading;
  language: Language;
  onAnswer: (correct: boolean) => void;
}

export default function ReadingExercise({ exercise, language, onAnswer }: ReadingExerciseProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showPinyin, setShowPinyin] = useState(false);

  const prompt = language === 'fr' ? exercise.promptFr : exercise.promptEn;
  const currentQuestion = exercise.questions[currentQuestionIndex];
  const questionText = language === 'fr' ? currentQuestion.questionFr : currentQuestion.questionEn;
  const explanation = language === 'fr' ? currentQuestion.explanationFr : currentQuestion.explanationEn;

  const handleAnswer = (questionIndex: number, choiceIndex: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [questionIndex]: choiceIndex });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const correctCount = exercise.questions.filter(
      (q, idx) => answers[idx] === q.correctIndex
    ).length;
    const isCorrect = correctCount === exercise.questions.length;
    onAnswer(isCorrect);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < exercise.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const selectedAnswer = answers[currentQuestionIndex];
  const isAnswered = selectedAnswer !== undefined;
  const isCurrentCorrect = isAnswered && selectedAnswer === currentQuestion.correctIndex;

  return (
    <div className="reading-exercise">
      <div className="exercise-header">
        <h2 className="exercise-prompt">{prompt}</h2>
      </div>

      <div className="reading-passage-container">
        <div className="passage-header">
          <h3 className="passage-title">
            {language === 'fr' ? 'Texte à lire' : 'Reading passage'}
          </h3>
          {exercise.passageAudio && (
            <AudioButton
              src={`/${exercise.passageAudio}`}
              label={language === 'fr' ? 'Écouter' : 'Listen'}
            />
          )}
          {exercise.passagePinyin && (
            <button
              className="btn-secondary pinyin-toggle"
              onClick={() => setShowPinyin(!showPinyin)}
            >
              {showPinyin
                ? language === 'fr'
                  ? 'Masquer pinyin'
                  : 'Hide pinyin'
                : language === 'fr'
                ? 'Afficher pinyin'
                : 'Show pinyin'}
            </button>
          )}
        </div>

        <div className="reading-passage">
          <p className="passage-text">{exercise.passage}</p>
          {showPinyin && exercise.passagePinyin && (
            <p className="passage-pinyin">{exercise.passagePinyin}</p>
          )}
        </div>
      </div>

      <div className="reading-questions">
        <div className="question-progress">
          {language === 'fr' ? 'Question' : 'Question'} {currentQuestionIndex + 1} /{' '}
          {exercise.questions.length}
        </div>

        <div className="question-container">
          <h3 className="question-text">{questionText}</h3>

          <div className="question-choices">
            {currentQuestion.choices.map((choice, index) => {
              const isCorrectChoice = index === currentQuestion.correctIndex;
              const isSelectedChoice = index === selectedAnswer;
              let optionClass = '';

              if (submitted) {
                if (isCorrectChoice) optionClass = 'correct';
                else if (isSelectedChoice) optionClass = 'incorrect';
              }

              return (
                <button
                  key={index}
                  className={`quiz-option ${optionClass}`}
                  onClick={() => handleAnswer(currentQuestionIndex, index)}
                  disabled={submitted}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {submitted && explanation && (
            <div className={`answer-feedback ${isCurrentCorrect ? 'correct' : 'incorrect'}`}>
              <span className="feedback-icon">{isCurrentCorrect ? '✓' : '✗'}</span>
              <div>{explanation}</div>
            </div>
          )}
        </div>

        <div className="question-navigation">
          {currentQuestionIndex > 0 && (
            <button className="btn-secondary" onClick={goToPreviousQuestion}>
              ← {language === 'fr' ? 'Précédent' : 'Previous'}
            </button>
          )}

          {!submitted && currentQuestionIndex === exercise.questions.length - 1 && (
            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== exercise.questions.length}
            >
              {language === 'fr' ? 'Valider' : 'Submit'}
            </button>
          )}

          {currentQuestionIndex < exercise.questions.length - 1 && (
            <button
              className="btn-primary"
              onClick={goToNextQuestion}
              disabled={!isAnswered}
            >
              {language === 'fr' ? 'Suivant' : 'Next'} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
