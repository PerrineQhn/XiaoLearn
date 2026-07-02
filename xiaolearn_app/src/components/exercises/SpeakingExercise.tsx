import { useState } from 'react';
import type { Language } from '../../i18n';
import type { LessonExerciseSpeaking } from '../../types';
import AudioButton from '../AudioButton';

interface SpeakingExerciseProps {
  exercise: LessonExerciseSpeaking;
  language: Language;
  onAnswer: (correct: boolean) => void;
}

export default function SpeakingExercise({ exercise, language, onAnswer }: SpeakingExerciseProps) {
  const [practiced, setPracticed] = useState(false);
  const [showModel, setShowModel] = useState(true);
  const [showPinyin, setShowPinyin] = useState(false);

  const prompt = language === 'fr' ? exercise.promptFr : exercise.promptEn;
  const hints = language === 'fr' ? exercise.hints : exercise.hintsEn;
  const evaluationPoints = language === 'fr' ? exercise.evaluationPoints : exercise.evaluationPointsEn;

  const handleComplete = () => {
    setPracticed(true);
    // For speaking exercises, we consider it complete when user confirms they practiced
    onAnswer(true);
  };

  return (
    <div className="speaking-exercise">
      <div className="exercise-header">
        <h2 className="exercise-prompt">{prompt}</h2>
        <p className="exercise-mode-label">
          {exercise.mode === 'repeat'
            ? language === 'fr'
              ? '🗣️ Exercice de répétition'
              : '🗣️ Repetition exercise'
            : exercise.mode === 'describe'
            ? language === 'fr'
              ? '🖼️ Exercice de description'
              : '🖼️ Description exercise'
            : language === 'fr'
            ? '💬 Exercice de réponse'
            : '💬 Answer exercise'}
        </p>
      </div>

      {exercise.mode === 'repeat' && (
        <div className="speaking-repeat">
          <p className="instruction">
            {language === 'fr'
              ? 'Écoutez le modèle et répétez à voix haute :'
              : 'Listen to the model and repeat out loud:'}
          </p>
          {exercise.modelAudio && (
            <div className="model-audio-section">
              <AudioButton
                src={`/${exercise.modelAudio}`}
                label={language === 'fr' ? 'Écouter le modèle' : 'Listen to model'}
              />
            </div>
          )}
        </div>
      )}

      {showModel && (
        <div className="model-section">
          <div className="model-header">
            <h3 className="model-title">
              {exercise.mode === 'repeat'
                ? language === 'fr'
                  ? 'Texte à répéter :'
                  : 'Text to repeat:'
                : language === 'fr'
                ? 'Exemple de réponse :'
                : 'Example answer:'}
            </h3>
            {exercise.modelPinyin && (
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
          <p className="model-text">{exercise.modelText}</p>
          {showPinyin && exercise.modelPinyin && (
            <p className="model-pinyin">{exercise.modelPinyin}</p>
          )}
        </div>
      )}

      {exercise.mode !== 'repeat' && (
        <button
          className="btn-secondary"
          onClick={() => setShowModel(!showModel)}
        >
          {showModel
            ? language === 'fr'
              ? 'Masquer l\'exemple'
              : 'Hide example'
            : language === 'fr'
            ? 'Voir un exemple'
            : 'See example'}
        </button>
      )}

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

      {evaluationPoints && evaluationPoints.length > 0 && (
        <div className="evaluation-points">
          <p className="points-title">
            {language === 'fr' ? 'Points à vérifier :' : 'Points to check:'}
          </p>
          <ul>
            {evaluationPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="speaking-instructions">
        <p>
          {language === 'fr'
            ? '💡 Conseil : Enregistrez-vous pour écouter votre prononciation et vous améliorer.'
            : '💡 Tip: Record yourself to listen to your pronunciation and improve.'}
        </p>
      </div>

      {!practiced ? (
        <button className="btn-primary" onClick={handleComplete}>
          {language === 'fr' ? 'J\'ai pratiqué' : 'I practiced'}
        </button>
      ) : (
        <div className="answer-feedback correct">
          <span className="feedback-icon">✓</span>
          <div>
            {language === 'fr'
              ? 'Excellent travail ! Continuez à pratiquer régulièrement.'
              : 'Excellent work! Keep practicing regularly.'}
          </div>
        </div>
      )}
    </div>
  );
}
