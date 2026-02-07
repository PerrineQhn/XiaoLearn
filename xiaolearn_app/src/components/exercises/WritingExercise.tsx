import { useState } from 'react';
import type { Language } from '../../i18n';
import type { LessonExerciseWriting } from '../../types';

interface WritingExerciseProps {
  exercise: LessonExerciseWriting;
  language: Language;
  onAnswer: (correct: boolean) => void;
}

export default function WritingExercise({ exercise, language, onAnswer }: WritingExerciseProps) {
  const [userInput, setUserInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const prompt = language === 'fr' ? exercise.promptFr : exercise.promptEn;
  const hints = language === 'fr' ? exercise.hints : exercise.hintsEn;
  const criteria = language === 'fr' ? exercise.evaluationCriteria : exercise.evaluationCriteriaEn;

  const handleSubmit = () => {
    if (!userInput.trim()) return;
    setSubmitted(true);
    // For writing exercises, we'll consider it correct if they wrote something
    // Real evaluation would require more sophisticated checking
    onAnswer(userInput.trim().length >= (exercise.targetLength || 1));
  };

  const toggleModelAnswer = () => {
    setShowModel(!showModel);
  };

  return (
    <div className="writing-exercise">
      <div className="exercise-header">
        <h2 className="exercise-prompt">{prompt}</h2>
        {exercise.mode === 'character' && exercise.targetCharacter && (
          <p className="exercise-target">
            {language === 'fr' ? 'Caractère cible :' : 'Target character:'} <strong>{exercise.targetCharacter}</strong>
          </p>
        )}
      </div>

      {hints && hints.length > 0 && (
        <div className="exercise-hints">
          <p className="hints-title">{language === 'fr' ? 'Indices :' : 'Hints:'}</p>
          <ul>
            {hints.map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="writing-input-section">
        <textarea
          className="writing-textarea"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={
            exercise.mode === 'character'
              ? language === 'fr'
                ? 'Écris le caractère ici...'
                : 'Write the character here...'
              : exercise.mode === 'sentence'
              ? language === 'fr'
                ? 'Écris ta phrase ici...'
                : 'Write your sentence here...'
              : language === 'fr'
              ? 'Écris ton paragraphe ici...'
              : 'Write your paragraph here...'
          }
          disabled={submitted}
          rows={exercise.mode === 'paragraph' ? 8 : exercise.mode === 'sentence' ? 3 : 2}
        />
        {exercise.targetLength && (
          <p className="character-count">
            {userInput.length} / {exercise.targetLength}{' '}
            {language === 'fr' ? 'caractères' : 'characters'}
          </p>
        )}
      </div>

      {!submitted ? (
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={!userInput.trim()}
        >
          {language === 'fr' ? 'Valider' : 'Submit'}
        </button>
      ) : (
        <div className="exercise-result">
          <div className="answer-feedback correct">
            <span className="feedback-icon">✓</span>
            <div>{language === 'fr' ? 'Bien joué !' : 'Well done!'}</div>
          </div>

          {criteria && criteria.length > 0 && (
            <div className="evaluation-criteria">
              <p className="criteria-title">
                {language === 'fr' ? 'Points à vérifier :' : 'Points to check:'}
              </p>
              <ul>
                {criteria.map((criterion, index) => (
                  <li key={index}>{criterion}</li>
                ))}
              </ul>
            </div>
          )}

          <button className="btn-secondary" onClick={toggleModelAnswer}>
            {showModel
              ? language === 'fr'
                ? 'Masquer le modèle'
                : 'Hide model answer'
              : language === 'fr'
              ? 'Voir un modèle de réponse'
              : 'See model answer'}
          </button>

          {showModel && (
            <div className="model-answer">
              <p className="model-title">
                {language === 'fr' ? 'Réponse modèle :' : 'Model answer:'}
              </p>
              <p className="model-text">{exercise.modelAnswer}</p>
              {exercise.modelPinyin && (
                <p className="model-pinyin">{exercise.modelPinyin}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
