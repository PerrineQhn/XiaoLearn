import { useEffect, useMemo, useState } from 'react';
import { dataset } from '../data/lessons';
import type { LessonItem } from '../types';
import type { Language } from '../i18n';
import { getLessonTranslation } from '../utils/lesson';

const QUESTION_COUNT = 5;

const pickRandomQuestions = (): LessonItem[] => {
  const pool = [...dataset.lessons];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, QUESTION_COUNT);
};

const buildChoices = (lesson: LessonItem, language: Language): string[] => {
  const correct = getLessonTranslation(lesson, language);
  const options = new Set<string>([correct]);
  const pool = dataset.lessons;
  while (options.size < 4) {
    const candidate = pool[Math.floor(Math.random() * pool.length)];
    if (candidate.id !== lesson.id) {
      options.add(getLessonTranslation(candidate, language));
    }
    if (pool.length <= 4) break;
  }
  const arr = [...options];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

interface QuestionConfig {
  lesson: LessonItem;
  choices: string[];
}

const buildQuestionSet = (language: Language): QuestionConfig[] =>
  pickRandomQuestions().map((lesson) => ({
    lesson,
    choices: buildChoices(lesson, language)
  }));

export const useQuizEngine = (language: Language) => {
  const [questions, setQuestions] = useState<QuestionConfig[]>(() => buildQuestionSet(language));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = !completed ? questions[index] : null;
  const totalQuestions = questions.length;

  useEffect(() => {
    setQuestions((prev) =>
      prev.map((entry) => ({
        lesson: entry.lesson,
        choices: buildChoices(entry.lesson, language)
      }))
    );
    setSelectedChoice(null);
  }, [language]);

  const selectAnswer = (choiceIndex: number) => {
    if (completed || selectedChoice !== null || !currentQuestion) return;
    setSelectedChoice(choiceIndex);
    const correct = getLessonTranslation(currentQuestion.lesson, language);
    if (currentQuestion.choices[choiceIndex] === correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (completed) return;
    if (selectedChoice === null) return;
    if (index >= totalQuestions - 1) {
      setCompleted(true);
    } else {
      setIndex((prev) => prev + 1);
      setSelectedChoice(null);
    }
  };

  const resetQuiz = () => {
    setQuestions(buildQuestionSet(language));
    setIndex(0);
    setScore(0);
    setSelectedChoice(null);
    setCompleted(false);
  };

  const progress = useMemo(() => {
    if (completed) return 100;
    return Math.round(((index + (selectedChoice !== null ? 1 : 0)) / totalQuestions) * 100);
  }, [completed, index, selectedChoice, totalQuestions]);

  return {
    questions,
    currentQuestion,
    index,
    totalQuestions,
    score,
    progress,
    selectedChoice,
    completed,
    selectAnswer,
    nextQuestion,
    resetQuiz
  };
};

export type QuizEngine = ReturnType<typeof useQuizEngine>;
