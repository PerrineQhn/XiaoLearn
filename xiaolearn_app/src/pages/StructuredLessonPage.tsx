import { useState, useMemo } from 'react';
import type { Language } from '../i18n';
import type { LessonExercise, LessonItem } from '../types';
import type { LessonModule, LessonPhase } from '../types/lesson-structure';
import { getLessonsByHanziList } from '../data/lessons';
import { getGrammarLessonById } from '../data/grammar-lessons';
import { getSimpleLessonById } from '../data/simple-lessons';
import { lessonExercises } from '../data/lesson-exercises';
import AudioButton from '../components/AudioButton';
import GrammarQuizComponent from '../components/quiz/GrammarQuizComponent';
import GrammarExplanationCard from '../components/GrammarExplanationCard';
import WritingExercise from '../components/exercises/WritingExercise';
import DialogueExercise from '../components/exercises/DialogueExercise';
import ReadingExercise from '../components/exercises/ReadingExercise';
import SpeakingExercise from '../components/exercises/SpeakingExercise';
import DictationExercise from '../components/exercises/DictationExercise';

interface StructuredLessonPageProps {
  lesson: LessonModule;
  language: Language;
  onComplete: (payload: { learnedWordIds: string[]; duration: number }) => void;
  onExit: () => void;
}

interface LessonExerciseSectionProps {
  exercise: LessonExercise;
  language: Language;
  onAnswer: (correct: boolean) => void;
}

function LessonExerciseSection({ exercise, language, onAnswer }: LessonExerciseSectionProps) {
  // Handle new exercise types
  if (exercise.type === 'writing') {
    return <WritingExercise exercise={exercise} language={language} onAnswer={onAnswer} />;
  }

  if (exercise.type === 'dialogue') {
    return <DialogueExercise exercise={exercise} language={language} onAnswer={onAnswer} />;
  }

  if (exercise.type === 'reading') {
    return <ReadingExercise exercise={exercise} language={language} onAnswer={onAnswer} />;
  }

  if (exercise.type === 'speaking') {
    return <SpeakingExercise exercise={exercise} language={language} onAnswer={onAnswer} />;
  }

  if (exercise.type === 'dictation') {
    return <DictationExercise exercise={exercise} language={language} onAnswer={onAnswer} />;
  }

  if (exercise.type === 'grammar') {
    return (
      <GrammarQuizComponent
        key={exercise.id}
        quiz={exercise.quiz}
        language={language}
        onAnswer={onAnswer}
      />
    );
  }

  // Handle listening and text-mcq exercises
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const prompt = language === 'fr' ? exercise.promptFr : exercise.promptEn;
  const explanation =
    language === 'fr' ? exercise.explanationFr : exercise.explanationEn;

  const handleChoice = (index: number) => {
    if (answered) return;
    setSelectedIndex(index);
    setAnswered(true);
    onAnswer(index === exercise.correctChoiceIndex);
  };

  return (
    <div className="quiz-container">
      <h2 className="quiz-question">{prompt}</h2>
      {exercise.type === 'listening' && (
        <div className="quiz-word" style={{ justifyContent: 'center' }}>
          <AudioButton
            src={`/${exercise.audio}`}
            label={language === 'fr' ? 'Écouter' : 'Listen'}
          />
        </div>
      )}
      <div className="quiz-options">
        {exercise.choices.map((choice, index) => {
          const isCorrect = index === exercise.correctChoiceIndex;
          const isSelected = index === selectedIndex;
          let optionClass = '';
          if (answered) {
            if (isCorrect) optionClass = 'correct';
            else if (isSelected) optionClass = 'incorrect';
          }

          return (
            <button
              key={`${exercise.id}-${index}`}
              className={`quiz-option ${optionClass}`}
              onClick={() => handleChoice(index)}
              disabled={answered}
            >
              {exercise.choiceLabels?.[index] ?? choice}
            </button>
          );
        })}
      </div>
      {answered && explanation && (
        <div className={`answer-feedback ${selectedIndex === exercise.correctChoiceIndex ? 'correct' : 'incorrect'}`}>
          <span className="feedback-icon">
            {selectedIndex === exercise.correctChoiceIndex ? '✓' : '✗'}
          </span>
          <div>{explanation}</div>
        </div>
      )}
    </div>
  );
}

const buildQuizOptions = (word: LessonItem | undefined, words: LessonItem[], language: Language) => {
  if (!word) return [];
  const correctAnswer = language === 'fr' ? word.translationFr : word.translation;
  const wrongAnswers = words
    .filter((w) => w.id !== word.id)
    .map((w) => (language === 'fr' ? w.translationFr : w.translation));
  const uniqueWrong = Array.from(new Set(wrongAnswers)).slice(0, 3);
  const allOptions = [correctAnswer, ...uniqueWrong];
  for (let i = allOptions.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
  }
  return allOptions;
};

export default function StructuredLessonPage({ lesson, language, onComplete, onExit }: StructuredLessonPageProps) {
  const [phase, setPhase] = useState<LessonPhase>('intro');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [learnedCards, setLearnedCards] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean>>({});
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [exerciseResults, setExerciseResults] = useState<Record<string, boolean>>({});

  // Charger les mots de la leçon en utilisant les hanzi
  const lessonWords = useMemo<LessonItem[]>(() => {
    const simpleLesson = getSimpleLessonById(lesson.id);
    if (simpleLesson) {
      if (simpleLesson.customWords && simpleLesson.customWords.length > 0) {
        return simpleLesson.customWords;
      }
      if (simpleLesson.words && simpleLesson.words.length > 0) {
        return getLessonsByHanziList(simpleLesson.words);
      }
    }
    // Fallback: si la leçon utilise des IDs
    return lesson.flashcards
      .map((identifier) => {
        // D'abord vérifier si c'est une leçon de grammaire dédiée
        const grammarLesson = getGrammarLessonById(identifier);
        if (grammarLesson) {
          return grammarLesson;
        }
        // Sinon, rechercher par hanzi dans les leçons classiques
        const words = getLessonsByHanziList([identifier]);
        return words.length > 0 ? words[0] : null;
      })
      .filter((word): word is LessonItem => Boolean(word));
  }, [lesson.flashcards, lesson.id]);

  const customExercises = lessonExercises[lesson.id] ?? [];
  const totalCustomExercises = customExercises.length;

  const currentWord = lessonWords[currentCardIndex];
  const desiredQuizCount = Math.min(lesson.quizQuestions, lessonWords.length);

  const quizData = useMemo(() => {
    if (desiredQuizCount === 0) return [];
    return Array.from({ length: desiredQuizCount })
      .map((_, idx) => {
        const word = lessonWords[idx];
        if (!word) return null;
        const options = buildQuizOptions(word, lessonWords, language);
        return {
          word,
          options
        };
      })
      .filter(
        (entry): entry is { word: LessonItem; options: string[] } =>
          Boolean(entry?.word) && (Boolean(entry?.word?.grammarQuiz) || (entry?.options?.length ?? 0) >= 2)
      );
  }, [lessonWords, desiredQuizCount, language]);

  const totalQuizQuestions = quizData.length;

  if (lessonWords.length === 0) {
    return (
      <div className="structured-lesson">
        <div className="lesson-empty-state">
          {language === 'fr'
            ? 'Aucun contenu disponible pour cette leçon pour le moment.'
            : 'No content available for this lesson yet.'}
        </div>
      </div>
    );
  }

  // Phase 1: Introduction
  if (phase === 'intro') {
    return (
      <div className="structured-lesson">
        <div className="lesson-intro-container">
          <div className="intro-header">
            <button className="back-btn" onClick={onExit}>← Retour</button>
            <div className="lesson-badge">
              {language === 'fr' ? lesson.title : lesson.titleEn}
            </div>
          </div>

          <div className="intro-content">
            <h1 className="intro-title">
              {language === 'fr' ? lesson.introduction.title : lesson.introduction.titleEn}
            </h1>

            <p className="intro-text">
              {language === 'fr' ? lesson.introduction.content : lesson.introduction.contentEn}
            </p>

            <div className="objectives-section">
              <h3>{language === 'fr' ? 'Objectifs de cette leçon :' : 'Lesson objectives:'}</h3>
              <ul className="objectives-list">
                {(language === 'fr' ? lesson.introduction.objectives : lesson.introduction.objectivesEn).map((obj, i) => (
                  <li key={i}>✓ {obj}</li>
                ))}
              </ul>
            </div>

            <div className="lesson-stats">
              <div className="stat">
                <span className="stat-icon">📝</span>
                <span className="stat-text">
                  {lesson.flashcards.length} {language === 'fr' ? 'mots à apprendre' : 'words to learn'}
                </span>
              </div>
              <div className="stat">
                <span className="stat-icon">⏱️</span>
                <span className="stat-text">
                  {lesson.duration} min
                </span>
              </div>
            </div>

            <button className="start-lesson-btn" onClick={() => setPhase('learn')}>
              {language === 'fr' ? 'Commencer la leçon' : 'Start lesson'} →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Phase 2: Apprentissage (Flashcards)
  if (phase === 'learn') {
    const progress = ((currentCardIndex + 1) / lessonWords.length) * 100;

    return (
      <div className="structured-lesson">
        <div className="lesson-header">
          <button className="back-btn" onClick={() => setPhase('intro')}>← Retour</button>
          <div className="progress-indicator">
            <div className="progress-bar-bg">
              <div className="progress-bar-fg" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="progress-text">{currentCardIndex + 1} / {lessonWords.length}</span>
          </div>
        </div>

        {currentWord && (
          <div className="lesson-flashcard-container">
            <div className="lesson-flashcard">
              <div className="card-hanzi">{currentWord.hanzi}</div>
              <div className="card-pinyin">{currentWord.pinyin}</div>
              <div className="card-audio-stack">
                {currentWord.audioLetter ? (
                  <AudioButton
                    src={`/${currentWord.audioLetter}`}
                    label={language === 'fr' ? 'Audio' : 'Audio'}
                  />
                ) : (
                  <AudioButton
                    src={`/${currentWord.audio}`}
                    label={language === 'fr' ? 'Audio' : 'Audio'}
                  />
                )}
              </div>
              <div className="card-translation">
                {language === 'fr' ? currentWord.translationFr : currentWord.translation}
              </div>
              {currentWord.explanation && (
                <div className="card-explanation">{currentWord.explanation}</div>
              )}
              {currentWord.examples &&
                currentWord.examples.length > 0 &&
                (() => {
                  const example = currentWord.examples[0];
                  const isDuplicate =
                    example.hanzi === currentWord.hanzi &&
                    example.pinyin === currentWord.pinyin &&
                    example.translation === currentWord.translationFr;
                  return !isDuplicate ? (
                    <div className="card-examples">
                      <h4>{language === 'fr' ? 'Exemple :' : 'Example:'}</h4>
                      <div className="example-item">
                        <div>{example.hanzi}</div>
                        <div className="example-pinyin">{example.pinyin}</div>
                        <div className="example-translation">{example.translation}</div>
                        {example.audio && (
                          <AudioButton
                            src={`/${example.audio}`}
                            label={language === 'fr' ? 'Exemple' : 'Example'}
                          />
                        )}
                      </div>
                    </div>
                  ) : null;
                })()}
            </div>

            {currentWord.grammarExplanation && (
              <GrammarExplanationCard
                explanation={currentWord.grammarExplanation}
                language={language}
              />
            )}

            <div
              className="lesson-flashcard-actions"
              style={{ justifyContent: currentCardIndex > 0 ? 'space-between' : 'flex-end' }}
            >
              {currentCardIndex > 0 && (
                <button
                  className="btn-secondary"
                  onClick={() => setCurrentCardIndex(currentCardIndex - 1)}
                >
                  ← {language === 'fr' ? 'Précédent' : 'Previous'}
                </button>
              )}
              {currentCardIndex < lessonWords.length - 1 ? (
                <button
                  className="btn-primary"
                  onClick={() => {
                    if (!learnedCards.includes(currentWord.id)) {
                      setLearnedCards([...learnedCards, currentWord.id]);
                    }
                    setCurrentCardIndex(currentCardIndex + 1);
                  }}
                >
                  {language === 'fr' ? 'Suivant' : 'Next'} →
                </button>
              ) : (
                <button
                  className="btn-primary"
                  onClick={() => {
                    if (!learnedCards.includes(currentWord.id)) {
                      setLearnedCards([...learnedCards, currentWord.id]);
                    }
                    setPhase('quiz');
                    setCurrentCardIndex(0);
                    setQuizAnswers({});
                    setExerciseIndex(0);
                    setExerciseResults({});
                  }}
                >
                  {language === 'fr' ? 'Passer au quiz' : 'Go to quiz'} →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Phase 3: Quiz
  if (phase === 'quiz') {
    if (lessonWords.length < 1 && totalCustomExercises === 0) {
      return (
        <div className="structured-lesson">
          <div className="lesson-empty-state">
            {language === 'fr'
              ? 'Aucun contenu disponible pour lancer le quiz.'
              : 'No content available to start the quiz.'}
          </div>
        </div>
      );
    }

    if (lessonWords.length < 2 && totalCustomExercises === 0) {
      return (
        <div className="structured-lesson">
          <div className="lesson-empty-state">
            {language === 'fr'
              ? 'Il faut au moins 2 mots pour faire un quiz.'
              : 'At least 2 words are needed for a quiz.'}
          </div>
        </div>
      );
    }

    const totalSteps = totalCustomExercises + totalQuizQuestions;
    const safeTotalSteps = Math.max(totalSteps, 1);

    const handleCustomAnswered = (exercise: LessonExercise, correct: boolean) => {
      setExerciseResults((prev) => ({ ...prev, [exercise.id]: correct }));

      setTimeout(() => {
        const nextIndex = exerciseIndex + 1;
        setExerciseIndex(nextIndex);

        if (nextIndex >= totalCustomExercises) {
          if (totalQuizQuestions === 0) {
            setPhase('complete');
          }
        }
      }, exercise.type === 'grammar' ? 1800 : 1000);
    };

    if (exerciseIndex < totalCustomExercises) {
      const exercise = customExercises[exerciseIndex];
      const stepNumber = exerciseIndex + 1;
      const progress = (stepNumber / safeTotalSteps) * 100;

      return (
        <div className="structured-lesson">
          <div className="lesson-header">
            <button className="back-btn" onClick={() => setPhase('learn')}>← Retour</button>
            <div className="progress-indicator">
              <div className="progress-bar-bg">
                <div className="progress-bar-fg" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="progress-text">
                {stepNumber} / {safeTotalSteps}
              </span>
            </div>
          </div>
          <LessonExerciseSection
            key={exercise.id}
            exercise={exercise}
            language={language}
            onAnswer={(result) => handleCustomAnswered(exercise, result)}
          />
        </div>
      );
    }

    if (totalQuizQuestions === 0) {
      return (
        <div className="structured-lesson">
          <div className="lesson-empty-state">
            {language === 'fr'
              ? 'Exercices terminés, bravo !'
              : 'All custom exercises completed!'}
          </div>
        </div>
      );
    }

    const currentQuiz = quizData[currentCardIndex];
    const quizWord = currentQuiz?.word;
    const options = currentQuiz?.options ?? [];

    if (!quizWord || options.length < 2) {
      return (
        <div className="structured-lesson">
          <div className="lesson-empty-state">
            {language === 'fr'
              ? 'Impossible de créer un quiz avec les données actuelles.'
              : 'Unable to build a quiz with the current data.'}
          </div>
        </div>
      );
    }

    const quizStepNumber = totalCustomExercises + currentCardIndex + 1;
    const progress = (quizStepNumber / safeTotalSteps) * 100;

    const handleAnswer = (answer: string) => {
      const correct = answer === (language === 'fr' ? quizWord.translationFr : quizWord.translation);
      setQuizAnswers({ ...quizAnswers, [currentCardIndex]: correct });

      setTimeout(() => {
        if (currentCardIndex < totalQuizQuestions - 1) {
          setCurrentCardIndex(currentCardIndex + 1);
        } else {
          setPhase('complete');
        }
      }, 1200);
    };

    const handleGrammarAnswer = (correct: boolean) => {
      setQuizAnswers({ ...quizAnswers, [currentCardIndex]: correct });

      setTimeout(() => {
        if (currentCardIndex < totalQuizQuestions - 1) {
          setCurrentCardIndex(currentCardIndex + 1);
        } else {
          setPhase('complete');
        }
      }, 2000);
    };

    const hasGrammarQuiz = quizWord?.grammarQuiz !== undefined;

    return (
      <div className="structured-lesson">
        <div className="lesson-header">
          <button className="back-btn" onClick={() => setPhase('learn')}>← Retour</button>
          <div className="progress-indicator">
            <div className="progress-bar-bg">
              <div className="progress-bar-fg" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="progress-text">
              {quizStepNumber} / {safeTotalSteps}
            </span>
          </div>
        </div>

        {hasGrammarQuiz && quizWord.grammarQuiz ? (
          <GrammarQuizComponent
            key={`${quizWord.id}-grammar-${currentCardIndex}`}
            quiz={quizWord.grammarQuiz}
            language={language}
            onAnswer={handleGrammarAnswer}
          />
        ) : (
          <div className="quiz-container">
            <h2 className="quiz-question">
              {quizWord.theme === 'pinyin'
                ? language === 'fr'
                  ? 'Quel son entendez-vous ?'
                  : 'Which sound do you hear?'
                : language === 'fr'
                ? 'Quelle est la traduction de :'
                : 'What is the translation of:'}
            </h2>
            <div className={`quiz-word ${quizWord.theme === 'pinyin' ? 'quiz-audio-only' : ''}`}>
              {quizWord.theme !== 'pinyin' && (
                <>
                  <div className="quiz-hanzi">{quizWord.hanzi}</div>
                  <div className="quiz-pinyin">{quizWord.pinyin}</div>
                </>
              )}
              <AudioButton
                src={`/${quizWord.audioLetter || quizWord.audio}`}
                label={language === 'fr' ? 'Écouter' : 'Listen'}
              />
            </div>
            <div className="quiz-options">
              {options.map((option, index) => {
                const correctTranslation = language === 'fr' ? quizWord.translationFr : quizWord.translation;
                const answered = quizAnswers[currentCardIndex] !== undefined;
                const isCorrect = option === correctTranslation;
                const optionClass =
                  answered && isCorrect ? 'correct' : answered && !isCorrect ? 'incorrect' : '';

                return (
                  <button
                    key={`${option}-${index}`}
                    className={`quiz-option ${optionClass}`}
                    onClick={() => !answered && handleAnswer(option)}
                    disabled={answered}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Phase 4: Completion
  const restartLesson = () => {
    setPhase('learn');
    setCurrentCardIndex(0);
    setQuizAnswers({});
    setExerciseIndex(0);
    setExerciseResults({});
  };

  const retryQuiz = () => {
    setPhase('quiz');
    setCurrentCardIndex(0);
    setQuizAnswers({});
    setExerciseIndex(0);
    setExerciseResults({});
  };

  const quizScore = Object.values(quizAnswers).filter(Boolean).length;
  const exerciseScore = Object.values(exerciseResults).filter(Boolean).length;
  const score = quizScore + exerciseScore;
  const totalQuestions = totalQuizQuestions + totalCustomExercises;
  const safeTotal = Math.max(totalQuestions, 1);
  const percentage = Math.round((score / safeTotal) * 100);
  const passed = percentage >= 80;

  return (
    <div className="structured-lesson">
      <div className="completion-container">
        <div className="completion-icon">🎉</div>
        <h1 className="completion-title">
          {language === 'fr' ? 'Leçon terminée !' : 'Lesson complete!'}
        </h1>
        <div className="completion-score">
          <div className="score-circle">
            <span className="score-value">{percentage}%</span>
          </div>
          <p className="score-text">
            {score} / {safeTotal} {language === 'fr' ? 'bonnes réponses' : 'correct answers'}
          </p>
        </div>
        {!passed && (
          <p className="completion-warning">
            {language === 'fr'
              ? 'Atteignez au moins 80% pour débloquer la prochaine leçon.'
              : 'Reach at least 80% to unlock the next lesson.'}
          </p>
        )}
        <div className="completion-actions">
          <button className="btn-secondary" onClick={onExit}>
            {language === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
          </button>
          {passed ? (
            <button
              className="btn-primary"
              onClick={() => {
                const learnedIds = Array.from(new Set(lessonWords.map((word) => word.id)));
                onComplete({ learnedWordIds: learnedIds, duration: lesson.duration });
              }}
            >
              {language === 'fr' ? 'Leçon suivante' : 'Next lesson'} →
            </button>
          ) : (
            <>
              <button className="btn-secondary" onClick={restartLesson}>
                {language === 'fr' ? 'Revoir la leçon' : 'Review lesson'}
              </button>
              <button className="btn-primary" onClick={retryQuiz}>
                {language === 'fr' ? 'Reprendre le quiz' : 'Retry quiz'} →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
