import { useState } from 'react';
import type { Language } from '../../i18n';
import type { LessonExerciseDictation } from '../../types';
import AudioButton from '../AudioButton';

interface DictationExerciseProps {
  exercise: LessonExerciseDictation;
  language: Language;
  onAnswer: (correct: boolean) => void;
}

export default function DictationExercise({ exercise, language, onAnswer }: DictationExerciseProps) {
  const [userInput, setUserInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usePinyin, setUsePinyin] = useState(false);

  const prompt = language === 'fr' ? exercise.promptFr : exercise.promptEn;
  const hints = language === 'fr' ? exercise.hints : exercise.hintsEn;

  const normalizeText = (text: string) => {
    return text
      .trim()
      .toLowerCase()
      .replace(/[，。！？、：；""''（）]/g, '')
      .replace(/\s+/g, '');
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const normalizedInput = normalizeText(userInput);
    const normalizedCorrect = normalizeText(exercise.correctAnswer);
    const normalizedPinyin = exercise.correctPinyin ? normalizeText(exercise.correctPinyin) : '';

    const correct =
      normalizedInput === normalizedCorrect ||
      (exercise.allowPinyin === true && usePinyin && normalizedInput === normalizedPinyin);

    setIsCorrect(!!correct);
    onAnswer(!!correct);
  };

  const resetInput = () => {
    setUserInput('');
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="dictation-exercise">
      <div className="exercise-header">
        <h2 className="exercise-prompt">{prompt}</h2>
        <p className="exercise-mode-label">
          {exercise.mode === 'character'
            ? language === 'fr'
              ? '✏️ Dictée de caractère'
              : '✏️ Character dictation'
            : exercise.mode === 'word'
            ? language === 'fr'
              ? '✏️ Dictée de mot'
              : '✏️ Word dictation'
            : language === 'fr'
            ? '✏️ Dictée de phrase'
            : '✏️ Sentence dictation'}
        </p>
      </div>

      <div className="dictation-audio-section">
        <AudioButton
          src={`/${exercise.audio}`}
          label={language === 'fr' ? 'Écouter' : 'Listen'}
        />
        <p className="audio-instruction">
          {language === 'fr'
            ? 'Écoutez attentivement et écrivez ce que vous entendez'
            : 'Listen carefully and write what you hear'}
        </p>
      </div>

      {exercise.allowPinyin && (
        <div className="pinyin-toggle-section">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={usePinyin}
              onChange={(e) => setUsePinyin(e.target.checked)}
              disabled={submitted}
            />
            <span>
              {language === 'fr'
                ? 'Écrire en pinyin au lieu de caractères chinois'
                : 'Write in pinyin instead of Chinese characters'}
            </span>
          </label>
        </div>
      )}

      {hints && hints.length > 0 && !submitted && (
        <div className="exercise-hints">
          <p className="hints-title">{language === 'fr' ? 'Indices :' : 'Hints:'}</p>
          <ul>
            {hints.map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="dictation-input-section">
        <input
          type="text"
          className="dictation-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={
            usePinyin
              ? language === 'fr'
                ? 'Tapez le pinyin ici...'
                : 'Type pinyin here...'
              : language === 'fr'
              ? 'Écrivez les caractères chinois ici...'
              : 'Write Chinese characters here...'
          }
          disabled={submitted}
        />
      </div>

      {!submitted ? (
        <div className="dictation-actions">
          <button
            className="btn-secondary"
            onClick={resetInput}
            disabled={!userInput.trim()}
          >
            {language === 'fr' ? 'Effacer' : 'Clear'}
          </button>
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={!userInput.trim()}
          >
            {language === 'fr' ? 'Valider' : 'Submit'}
          </button>
        </div>
      ) : (
        <div className="dictation-result">
          <div className={`answer-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            <span className="feedback-icon">{isCorrect ? '✓' : '✗'}</span>
            <div>
              {isCorrect
                ? language === 'fr'
                  ? 'Parfait !'
                  : 'Perfect!'
                : language === 'fr'
                ? 'Pas tout à fait correct'
                : 'Not quite correct'}
            </div>
          </div>

          {!isCorrect && (
            <div className="correct-answer-section">
              <p className="correct-answer-title">
                {language === 'fr' ? 'Réponse correcte :' : 'Correct answer:'}
              </p>
              <p className="correct-answer-text">{exercise.correctAnswer}</p>
              {exercise.correctPinyin && (
                <p className="correct-answer-pinyin">{exercise.correctPinyin}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
