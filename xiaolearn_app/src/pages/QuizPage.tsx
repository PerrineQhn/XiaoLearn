import type { QuizEngine } from '../hooks/useQuizEngine';
import type { Language } from '../i18n';
import { getCopy } from '../i18n';
import AudioButton from '../components/AudioButton';
import { getLessonTranslation } from '../utils/lesson';
import LevelBadge from '../components/LevelBadge';

interface QuizPageProps {
  quiz: QuizEngine;
  copy: ReturnType<typeof getCopy>;
  language: Language;
}

const QuizPage = ({ quiz, copy, language }: QuizPageProps) => {
  if (quiz.completed) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>{copy.quizTitle} 🎉</h2>
        <p>
          Score : {quiz.score} / {quiz.totalQuestions}
        </p>
        <button type="button" onClick={quiz.resetQuiz}>
          {copy.explore}
        </button>
      </div>
    );
  }

  const config = quiz.currentQuestion;
  if (!config) return null;

  const { lesson, choices } = config;
  const feedback =
    quiz.selectedChoice === null
      ? copy.feedbackDefault
      : choices[quiz.selectedChoice] === getLessonTranslation(lesson, language)
      ? copy.feedbackCorrect
      : copy.feedbackWrong;

  const correctIndex = choices.indexOf(getLessonTranslation(lesson, language));

  return (
    <div className="card quiz-card">
      <div className="quiz-card-header">
        <div>
          <p className="quiz-progress-label">{copy.quizTitle}</p>
          <h2 className="quiz-progress-value">
            {quiz.index + 1} / {quiz.totalQuestions}
          </h2>
        </div>
        <div className="quiz-score-pill">
          {quiz.score} {language === 'fr' ? 'justes' : 'correct'}
        </div>
      </div>

      <div className="quiz-word standalone">
        <div className="quiz-word-header">
          <LevelBadge level={lesson.level} />
        </div>
        <div className="quiz-hanzi">{lesson.hanzi}</div>
        <div className="quiz-pinyin">{lesson.pinyin}</div>
        <AudioButton src={`/${lesson.audio}`} label={copy.quizAudio} />
      </div>

      <div className="quiz-options">
        {choices.map((choice, idx) => {
          let className = 'quiz-option';
          if (quiz.selectedChoice !== null) {
            if (idx === correctIndex) {
              className += ' correct';
            } else if (idx === quiz.selectedChoice) {
              className += ' incorrect';
            }
          }
          return (
            <button
              key={`${choice}-${idx}`}
              type="button"
              className={className}
              onClick={() => quiz.selectAnswer(idx)}
            >
              {choice}
            </button>
          );
        })}
      </div>

      <p className="quiz-feedback-text">{feedback}</p>
      <div className="quiz-footer">
        <div className="quiz-progress-text">
          {language === 'fr' ? 'Progression' : 'Progress'} : {quiz.progress}%
        </div>
        <button
          type="button"
          className="btn-primary quiz-next-btn"
          onClick={quiz.nextQuestion}
          disabled={quiz.selectedChoice === null}
        >
          {quiz.index + 1 === quiz.totalQuestions ? (language === 'fr' ? 'Terminer' : 'Finish') : copy.next} →
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
