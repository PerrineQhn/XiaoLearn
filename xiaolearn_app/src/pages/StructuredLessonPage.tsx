import { useMemo, useState } from 'react';
import type { Language } from '../i18n';
import type { LessonExercise, LessonExerciseDialogue, LessonItem } from '../types';
import type { LessonCategory, LessonModule, LessonPhase } from '../types/lesson-structure';
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

interface QuizEntry {
  word: LessonItem;
  options: string[];
}

interface LessonExplanationStep {
  id: string;
  title: string;
  content: string;
  bullets: string[];
}

const CATEGORY_ICON: Record<LessonCategory, string> = {
  pronunciation: '🔤',
  grammar: '📘',
  conversation: '💬',
  vocabulary: '🧠',
  culture: '🏮',
  writing: '✍️',
  reading: '📖'
};

const buildQuizOptions = (word: LessonItem | undefined, words: LessonItem[], language: Language) => {
  if (!word) return [];
  const correctAnswer = language === 'fr' ? word.translationFr : word.translation;
  const wrongAnswers = words
    .filter((entry) => entry.id !== word.id)
    .map((entry) => (language === 'fr' ? entry.translationFr : entry.translation));
  const uniqueWrong = Array.from(new Set(wrongAnswers)).slice(0, 3);
  const allOptions = [correctAnswer, ...uniqueWrong];

  for (let i = allOptions.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
  }

  return allOptions;
};

const buildAutoDialogueExercise = (lesson: LessonModule, words: LessonItem[]): LessonExerciseDialogue | null => {
  const primary = words[0];
  const secondary = words[1] ?? primary;
  if (!primary) return null;

  const hasTwoKeywords = secondary.id !== primary.id;
  const promptFr = hasTwoKeywords
    ? `Complète le mini-dialogue avec « ${primary.hanzi} » et « ${secondary.hanzi} ».`
    : `Complète le mini-dialogue autour de « ${primary.hanzi} ».`;
  const promptEn = hasTwoKeywords
    ? `Complete the mini dialogue using “${primary.hanzi}” and “${secondary.hanzi}”.`
    : `Complete the mini dialogue around “${primary.hanzi}”.`;

  const contextFr = `Conversation guidée liée à la leçon « ${lesson.title} ».`;
  const contextEn = `Guided conversation for lesson “${lesson.titleEn}”.`;

  return {
    id: `${lesson.id}-auto-dialogue`,
    type: 'dialogue',
    mode: 'role-play',
    promptFr,
    promptEn,
    context: contextFr,
    contextEn,
    dialogue: [
      { speaker: 'A', text: `我们来练习一下：${primary.hanzi}。` },
      { speaker: 'B', text: '' },
      { speaker: 'A', text: hasTwoKeywords ? `很好！再试试：${secondary.hanzi}。` : '很好！请再说一次。' },
      { speaker: 'B', text: '' }
    ]
  };
};

function LessonExerciseSection({ exercise, language, onAnswer }: LessonExerciseSectionProps) {
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
    return <GrammarQuizComponent key={exercise.id} quiz={exercise.quiz} language={language} onAnswer={onAnswer} />;
  }

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const prompt = language === 'fr' ? exercise.promptFr : exercise.promptEn;
  const explanation = language === 'fr' ? exercise.explanationFr : exercise.explanationEn;

  const handleChoice = (index: number) => {
    if (answered) return;
    setSelectedIndex(index);
    setAnswered(true);
    onAnswer(index === exercise.correctChoiceIndex);
  };

  return (
    <div className="quiz-container quiz-container-modern lesson-exercise-card">
      <h2 className="quiz-question">{prompt}</h2>

      {exercise.type === 'listening' && (
        <div className="quiz-word quiz-audio-only">
          <AudioButton src={`/${exercise.audio}`} label={language === 'fr' ? 'Écouter' : 'Listen'} />
        </div>
      )}

      {answered && explanation && (
        <div className={`answer-feedback ${selectedIndex === exercise.correctChoiceIndex ? 'correct' : 'incorrect'}`}>
          <span className="feedback-icon">{selectedIndex === exercise.correctChoiceIndex ? '✓' : '✗'}</span>
          <div>{explanation}</div>
        </div>
      )}

      <div className="quiz-options">
        {exercise.choices.map((choice, index) => {
          const isCorrect = index === exercise.correctChoiceIndex;
          const isSelected = index === selectedIndex;
          const optionState = answered && isCorrect ? 'correct' : answered && isSelected ? 'incorrect' : '';

          return (
            <button
              key={`${exercise.id}-${index}`}
              className={`quiz-option quiz-option-modern ${optionState}`}
              onClick={() => handleChoice(index)}
              disabled={answered}
            >
              <span className="quiz-option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="quiz-option-text">{exercise.choiceLabels?.[index] ?? choice}</span>
              {answered && isCorrect && <span className="quiz-option-status">✓</span>}
              {answered && isSelected && !isCorrect && <span className="quiz-option-status">✗</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function StructuredLessonPage({ lesson, language, onComplete, onExit }: StructuredLessonPageProps) {
  const [phase, setPhase] = useState<LessonPhase>('intro');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [explanationIndex, setExplanationIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean>>({});
  const [quizSelections, setQuizSelections] = useState<Record<number, string>>({});
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [exerciseResults, setExerciseResults] = useState<Record<string, boolean>>({});

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

    return lesson.flashcards
      .map((identifier) => {
        const grammarLesson = getGrammarLessonById(identifier);
        if (grammarLesson) return grammarLesson;
        const words = getLessonsByHanziList([identifier]);
        return words.length > 0 ? words[0] : null;
      })
      .filter((word): word is LessonItem => Boolean(word));
  }, [lesson.flashcards, lesson.id]);

  const shouldHaveConversationStep = useMemo(() => {
    const normalizedTags = (lesson.tags ?? []).map((tag) => tag.toLowerCase());

    if (normalizedTags.includes('no-dialogue')) return false;
    return lesson.category !== 'pronunciation';
  }, [lesson.category, lesson.tags]);

  const customExercises = useMemo(() => {
    const baseExercises = lessonExercises[lesson.id] ?? [];
    const filteredExercises = shouldHaveConversationStep
      ? baseExercises
      : baseExercises.filter((exercise) => exercise.type !== 'dialogue');

    if (!shouldHaveConversationStep) return filteredExercises;
    if (filteredExercises.some((exercise) => exercise.type === 'dialogue')) return filteredExercises;

    const generatedDialogue = buildAutoDialogueExercise(lesson, lessonWords);
    if (!generatedDialogue) return filteredExercises;

    return [...filteredExercises, generatedDialogue];
  }, [lesson, lesson.id, lessonWords, shouldHaveConversationStep]);

  const explanationSteps = useMemo<LessonExplanationStep[]>(() => {
    const steps: LessonExplanationStep[] = [];
    const introContent = language === 'fr' ? lesson.introduction.content : lesson.introduction.contentEn;
    const introObjectives = language === 'fr' ? lesson.introduction.objectives : lesson.introduction.objectivesEn;

    steps.push({
      id: 'intro',
      title: language === 'fr' ? 'Introduction' : 'Introduction',
      content: introContent,
      bullets: introObjectives.slice(0, 5)
    });

    const grammarWord = lessonWords.find((word) => Boolean(word.grammarExplanation));
    const grammarExplanation = grammarWord?.grammarExplanation;
    if (grammarExplanation) {
      const whenToUse = language === 'fr' ? grammarExplanation.whenToUse : grammarExplanation.whenToUseEn;
      const howToUse = language === 'fr' ? grammarExplanation.howToUse : grammarExplanation.howToUseEn;
      const commonMistakes = language === 'fr' ? grammarExplanation.commonMistakes : grammarExplanation.commonMistakesEn;
      const tips = language === 'fr' ? grammarExplanation.tips : grammarExplanation.tipsEn;

      steps.push({
        id: 'grammar-rules',
        title: language === 'fr' ? 'Règles de grammaire' : 'Grammar rules',
        content: howToUse,
        bullets: [whenToUse, commonMistakes, tips].filter((item): item is string => Boolean(item))
      });
    }

    return steps;
  }, [language, lesson.introduction.content, lesson.introduction.contentEn, lesson.introduction.objectives, lesson.introduction.objectivesEn, lessonWords]);

  const totalCustomExercises = customExercises.length;
  const estimatedXp = Math.max(20, lesson.quizQuestions * 10);
  const desiredQuizCount = Math.min(lesson.quizQuestions, lessonWords.length);
  const currentWord = lessonWords[currentCardIndex];

  const quizData = useMemo<QuizEntry[]>(() => {
    if (desiredQuizCount === 0) return [];

    return Array.from({ length: desiredQuizCount })
      .map((_, idx) => {
        const word = lessonWords[idx];
        if (!word) return null;
        return { word, options: buildQuizOptions(word, lessonWords, language) };
      })
      .filter(
        (entry): entry is QuizEntry =>
          Boolean(entry?.word) && (Boolean(entry?.word.grammarQuiz) || (entry?.options.length ?? 0) >= 2)
      );
  }, [desiredQuizCount, language, lessonWords]);

  const totalQuizQuestions = quizData.length;
  const totalExplanationSteps = explanationSteps.length;
  const totalLearnSteps = totalExplanationSteps + lessonWords.length;
  const isOnExplanationStep = explanationIndex < totalExplanationSteps;
  const learnedStep = isOnExplanationStep
    ? explanationIndex + 1
    : totalExplanationSteps + currentCardIndex + 1;
  const customStep = totalLearnSteps + exerciseIndex + 1;
  const quizStep = totalLearnSteps + totalCustomExercises + currentCardIndex + 1;
  const totalSteps = Math.max(totalLearnSteps + totalCustomExercises + totalQuizQuestions, 1);

  const resetQuizState = () => {
    setCurrentCardIndex(0);
    setExplanationIndex(totalExplanationSteps);
    setQuizAnswers({});
    setQuizSelections({});
    setExerciseIndex(0);
    setExerciseResults({});
  };

  const renderTopProgress = (currentStep: number, onBack: () => void) => {
    const boundedStep = Math.max(1, Math.min(currentStep, totalSteps));
    const progress = (boundedStep / totalSteps) * 100;

    return (
      <div className="lesson-top-progress">
        <button className="lesson-close-btn" onClick={onBack} aria-label={language === 'fr' ? 'Fermer' : 'Close'}>
          ×
        </button>
        <div className="lesson-top-progress-track">
          <div className="lesson-top-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="lesson-top-progress-count">
          {boundedStep}/{totalSteps}
        </span>
      </div>
    );
  };

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

  if (phase === 'intro') {
    const categoryLabel = lesson.category.toUpperCase();
    const introContent = language === 'fr' ? lesson.introduction.content : lesson.introduction.contentEn;

    return (
      <div className="structured-lesson">
        <div className="lesson-intro-container lesson-intro-centered">
          <div className="lesson-intro-hero">
            <div className="lesson-intro-icon">{CATEGORY_ICON[lesson.category] ?? '📘'}</div>
            <p className="lesson-badge">{categoryLabel}</p>
            <h1 className="intro-title">{language === 'fr' ? lesson.title : lesson.titleEn}</h1>
            <p className="intro-text">{introContent}</p>
            <div className="lesson-intro-meta">
              <span>⏱ {lesson.duration} min</span>
              <span>•</span>
              <span>✨ +{estimatedXp} XP</span>
            </div>
          </div>

          <div className="lesson-intro-actions">
            <button className="btn-secondary" onClick={onExit}>
              {language === 'fr' ? 'Retour' : 'Back'}
            </button>
            <button
              className="start-lesson-btn"
              onClick={() => {
                setCurrentCardIndex(0);
                setIsCardFlipped(false);
                setExplanationIndex(0);
                setPhase('learn');
              }}
            >
              {language === 'fr' ? 'Commencer' : 'Start'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'learn') {
    if (isOnExplanationStep) {
      const step = explanationSteps[explanationIndex];
      if (!step) {
        return (
          <div className="structured-lesson">
            <div className="lesson-empty-state">
              {language === 'fr' ? 'Explications indisponibles.' : 'Explanation unavailable.'}
            </div>
          </div>
        );
      }

      return (
        <div className="structured-lesson">
          {renderTopProgress(learnedStep, onExit)}

          <div className="lesson-phase-shell lesson-phase-shell--explanation">
            <div className="lesson-explanation-header">
              <span className="lesson-explanation-header-icon" aria-hidden="true">
                📘
              </span>
              <h3 className="lesson-explanation-header-title">{step.title}</h3>
            </div>

            <div className="lesson-explanation-card">
              <p className="lesson-explanation-content">{step.content}</p>

              {step.bullets.length > 0 && (
                <ul className="lesson-explanation-list">
                  {step.bullets.map((bullet, index) => (
                    <li key={`${step.id}-${index}`}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="lesson-flashcard-actions lesson-nav-modern">
              {explanationIndex > 0 ? (
                <button className="btn-secondary" onClick={() => setExplanationIndex((prev) => prev - 1)}>
                  {language === 'fr' ? 'Précédent' : 'Previous'}
                </button>
              ) : (
                <span />
              )}

              <button
                className="btn-primary"
                onClick={() => {
                  if (explanationIndex < totalExplanationSteps - 1) {
                    setExplanationIndex((prev) => prev + 1);
                    return;
                  }
                  setExplanationIndex(totalExplanationSteps);
                  setCurrentCardIndex(0);
                }}
              >
                {language === 'fr' ? 'Suivant' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (!currentWord) {
      return (
        <div className="structured-lesson">
          <div className="lesson-empty-state">
            {language === 'fr' ? 'Aucun mot à apprendre.' : 'No words to learn.'}
          </div>
        </div>
      );
    }

    return (
      <div className="structured-lesson">
        {renderTopProgress(learnedStep, onExit)}

        <div className="lesson-phase-shell">
          <p className="lesson-step-label">
            {language === 'fr' ? 'Mot' : 'Word'} {currentCardIndex + 1} {language === 'fr' ? 'sur' : 'of'} {lessonWords.length}
          </p>

          <div
            className={`lesson-flip-card ${isCardFlipped ? 'flipped' : ''}`}
            role="button"
            tabIndex={0}
            onClick={() => setIsCardFlipped((prev) => !prev)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setIsCardFlipped((prev) => !prev);
              }
            }}
          >
            <div className="lesson-flip-audio" onClick={(event) => event.stopPropagation()}>
              <AudioButton src={`/${currentWord.audioLetter || currentWord.audio}`} label={language === 'fr' ? 'Audio' : 'Audio'} />
            </div>

            <div className="lesson-flip-hanzi">{currentWord.hanzi}</div>
            {!isCardFlipped ? (
              <div className="lesson-flip-hint">{language === 'fr' ? 'Touchez pour retourner' : 'Tap to flip'}</div>
            ) : (
              <>
                <div className="lesson-flip-pinyin">{currentWord.pinyin}</div>
                <div className="lesson-flip-translation">
                  {language === 'fr' ? currentWord.translationFr : currentWord.translation}
                </div>
                {currentWord.explanation && <div className="lesson-flip-explanation">{currentWord.explanation}</div>}
              </>
            )}
          </div>

          <div className="lesson-learn-toolbar">
            <button className="lesson-flip-reset" onClick={() => setIsCardFlipped(false)} aria-label={language === 'fr' ? 'Retourner' : 'Reset'}>
              ↻
            </button>
          </div>

          {currentWord.grammarExplanation && isCardFlipped && (
            <GrammarExplanationCard explanation={currentWord.grammarExplanation} language={language} />
          )}

          <div className="lesson-flashcard-actions lesson-nav-modern">
            {currentCardIndex > 0 || totalExplanationSteps > 0 ? (
              <button
                className="btn-secondary"
                onClick={() => {
                  if (currentCardIndex === 0 && totalExplanationSteps > 0) {
                    setExplanationIndex(totalExplanationSteps - 1);
                    return;
                  }
                  setCurrentCardIndex((prev) => prev - 1);
                  setIsCardFlipped(false);
                }}
              >
                {language === 'fr' ? 'Précédent' : 'Previous'}
              </button>
            ) : (
              <span />
            )}

            {currentCardIndex < lessonWords.length - 1 ? (
              <button
                className="btn-primary"
                onClick={() => {
                  setCurrentCardIndex((prev) => prev + 1);
                  setIsCardFlipped(false);
                }}
              >
                {language === 'fr' ? 'Suivant' : 'Next'}
              </button>
            ) : (
              <button
                className="btn-primary"
                onClick={() => {
                  setPhase('quiz');
                  resetQuizState();
                }}
              >
                {language === 'fr' ? 'Passer au quiz' : 'Go to quiz'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'quiz') {
    if (lessonWords.length < 2 && totalCustomExercises === 0) {
      return (
        <div className="structured-lesson">
          <div className="lesson-empty-state">
            {language === 'fr' ? 'Il faut au moins 2 mots pour faire un quiz.' : 'At least 2 words are needed for a quiz.'}
          </div>
        </div>
      );
    }

    const safeTotalSteps = Math.max(totalCustomExercises + totalQuizQuestions, 1);

    const handleCustomAnswered = (exercise: LessonExercise, correct: boolean) => {
      setExerciseResults((prev) => ({ ...prev, [exercise.id]: correct }));

      setTimeout(() => {
        const nextIndex = exerciseIndex + 1;
        if (nextIndex < totalCustomExercises) {
          setExerciseIndex(nextIndex);
          return;
        }
        if (totalQuizQuestions > 0) {
          setExerciseIndex(nextIndex);
          setCurrentCardIndex(0);
          return;
        }
        setPhase('complete');
      }, exercise.type === 'grammar' ? 1700 : 900);
    };

    if (exerciseIndex < totalCustomExercises) {
      const exercise = customExercises[exerciseIndex];
      return (
        <div className="structured-lesson">
          {renderTopProgress(customStep, () => setPhase('learn'))}
          <div className="lesson-phase-shell lesson-exercise-shell">
            <LessonExerciseSection key={exercise.id} exercise={exercise} language={language} onAnswer={(result) => handleCustomAnswered(exercise, result)} />
          </div>
        </div>
      );
    }

    if (totalQuizQuestions === 0) {
      return (
        <div className="structured-lesson">
          <div className="lesson-empty-state">
            {language === 'fr'
              ? 'Les exercices sont terminés.'
              : 'Exercises are complete.'}
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

    const answered = quizAnswers[currentCardIndex] !== undefined;
    const correctTranslation = language === 'fr' ? quizWord.translationFr : quizWord.translation;
    const hasGrammarQuiz = Boolean(quizWord.grammarQuiz);

    const goToNextQuizQuestion = () => {
      if (currentCardIndex < totalQuizQuestions - 1) {
        setCurrentCardIndex((prev) => prev + 1);
        return;
      }
      setPhase('complete');
    };

    const handleWordAnswer = (answer: string) => {
      if (answered) return;
      const isCorrect = answer === correctTranslation;
      setQuizSelections((prev) => ({ ...prev, [currentCardIndex]: answer }));
      setQuizAnswers((prev) => ({ ...prev, [currentCardIndex]: isCorrect }));
    };

    const handleGrammarAnswer = (isCorrect: boolean) => {
      setQuizAnswers((prev) => ({ ...prev, [currentCardIndex]: isCorrect }));
    };

    return (
      <div className="structured-lesson">
        {renderTopProgress(quizStep, () => setPhase('learn'))}

        {hasGrammarQuiz && quizWord.grammarQuiz ? (
          <div className="lesson-phase-shell lesson-exercise-shell">
            <GrammarQuizComponent
              key={`${quizWord.id}-grammar-${currentCardIndex}`}
              quiz={quizWord.grammarQuiz}
              language={language}
              onAnswer={handleGrammarAnswer}
            />
            <div className="lesson-bottom-actions">
              {currentCardIndex > 0 && !answered ? (
                <button className="btn-secondary lesson-quiz-nav-btn" onClick={() => setCurrentCardIndex((prev) => prev - 1)}>
                  {language === 'fr' ? 'Précédent' : 'Previous'}
                </button>
              ) : (
                <span />
              )}
              {answered && (
                <button className="btn-primary lesson-quiz-nav-btn" onClick={goToNextQuizQuestion}>
                  {currentCardIndex < totalQuizQuestions - 1
                    ? language === 'fr'
                      ? 'Suivant'
                      : 'Next'
                    : language === 'fr'
                      ? 'Terminer'
                      : 'Finish'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="lesson-phase-shell">
            <div className="quiz-container quiz-container-modern">
              <p className="quiz-question-counter">
                {language === 'fr' ? 'Question' : 'Question'} {currentCardIndex + 1}/{safeTotalSteps - totalCustomExercises}
              </p>
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
                <AudioButton src={`/${quizWord.audioLetter || quizWord.audio}`} label={language === 'fr' ? 'Écouter' : 'Listen'} />
              </div>

              {answered && (
                <div className={`quiz-answer-banner ${quizAnswers[currentCardIndex] ? 'success' : 'warning'}`}>
                  {quizAnswers[currentCardIndex]
                    ? language === 'fr'
                      ? 'Bonne réponse'
                      : 'Correct answer'
                    : language === 'fr'
                      ? 'La bonne réponse est en vert ci-dessous'
                      : 'Correct answer is highlighted in green'}
                </div>
              )}

              <div className="quiz-options">
                {options.map((option, index) => {
                  const isCorrect = option === correctTranslation;
                  const isSelected = quizSelections[currentCardIndex] === option;
                  const optionClass =
                    answered && isCorrect ? 'correct' : answered && isSelected && !isCorrect ? 'incorrect' : '';

                  return (
                    <button
                      key={`${option}-${index}`}
                      className={`quiz-option quiz-option-modern ${optionClass}`}
                      onClick={() => handleWordAnswer(option)}
                      disabled={answered}
                    >
                      <span className="quiz-option-letter">{String.fromCharCode(65 + index)}</span>
                      <span className="quiz-option-text">{option}</span>
                      {answered && isCorrect && <span className="quiz-option-status">✓</span>}
                      {answered && isSelected && !isCorrect && <span className="quiz-option-status">✗</span>}
                    </button>
                  );
                })}
              </div>

              <div className="lesson-bottom-actions">
                {currentCardIndex > 0 && !answered ? (
                  <button className="btn-secondary lesson-quiz-nav-btn" onClick={() => setCurrentCardIndex((prev) => prev - 1)}>
                    {language === 'fr' ? 'Précédent' : 'Previous'}
                  </button>
                ) : (
                  <span />
                )}
                {answered && (
                  <button className="btn-primary lesson-quiz-nav-btn" onClick={goToNextQuizQuestion}>
                    {currentCardIndex < totalQuizQuestions - 1
                      ? language === 'fr'
                        ? 'Suivant'
                        : 'Next'
                      : language === 'fr'
                        ? 'Terminer'
                        : 'Finish'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const restartLesson = () => {
    setPhase('learn');
    setCurrentCardIndex(0);
    setIsCardFlipped(false);
    setExplanationIndex(0);
    setQuizAnswers({});
    setQuizSelections({});
    setExerciseIndex(0);
    setExerciseResults({});
  };

  const retryQuiz = () => {
    setPhase('quiz');
    setCurrentCardIndex(0);
    setQuizAnswers({});
    setQuizSelections({});
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
      {renderTopProgress(totalSteps, onExit)}
      <div className="lesson-phase-shell">
        <div className="completion-container completion-container-modern">
          <div className="completion-icon">⭐</div>
          <h1 className="completion-title">
            {passed
              ? language === 'fr'
                ? 'Excellent travail !'
                : 'Great work!'
              : language === 'fr'
                ? 'Bon effort !'
                : 'Good effort!'}
          </h1>
          <p className="completion-lesson-name">{language === 'fr' ? lesson.title : lesson.titleEn}</p>

          <div className="completion-score">
            <div className="completion-metric">
              <span>{percentage}%</span>
              <small>{language === 'fr' ? 'Score' : 'Score'}</small>
            </div>
            <div className="completion-metric xp">
              <span>+{estimatedXp}</span>
              <small>XP</small>
            </div>
            <div className="completion-metric correct">
              <span>{score}/{safeTotal}</span>
              <small>{language === 'fr' ? 'Correct' : 'Correct'}</small>
            </div>
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
              {language === 'fr' ? 'Retour aux leçons' : 'Back to lessons'}
            </button>
            {passed ? (
              <button
                className="btn-primary"
                onClick={() => {
                  const learnedIds = Array.from(new Set(lessonWords.map((word) => word.id)));
                  onComplete({ learnedWordIds: learnedIds, duration: lesson.duration });
                }}
              >
                {language === 'fr' ? 'Terminer' : 'Finish'} →
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
    </div>
  );
}
