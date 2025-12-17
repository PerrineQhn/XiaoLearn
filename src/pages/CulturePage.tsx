import { useState } from 'react';
import type { Language } from '../i18n';
import { cultureLabels } from '../i18n';
import type { CultureCategory, CultureItem } from '../types/culture';
import {
  cultureTopics,
  getCultureTopicsByCategory,
  getAllCategories,
  getCategoryCounts
} from '../data/culture-topics';
import './CulturePage.css';

interface CulturePageProps {
  language: Language;
  copy: Record<string, string>;
  customLists?: any[];
  onAddWordToList?: (listId: string, itemId: string) => void;
  onCreateList?: (name: string) => any;
  colorTheme: string;
}

export default function CulturePage({ language, copy, colorTheme }: CulturePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<CultureCategory | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<CultureItem | null>(null);

  const categories = getAllCategories();
  const categoryCounts = getCategoryCounts();
  const filteredTopics = getCultureTopicsByCategory(selectedCategory);

  const handleTopicClick = (topic: CultureItem) => {
    setSelectedTopic(topic);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };

  return (
    <div className="culture-page">
      {!selectedTopic ? (
        <>
          {/* Hero Section */}
          <section className="culture-hero">
            <span className="hero-kicker">
              {language === 'fr' ? 'Découvrez la Chine' : 'Discover China'}
            </span>
            <h1>{copy.culturePageTitle}</h1>
            <p className="hero-subtitle">{copy.culturePageSubtitle}</p>
          </section>

          {/* Category Filter */}
          <section className="category-filter">
            <button
              className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              {cultureLabels[language].all} ({categoryCounts.all})
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cultureLabels[language][cat]} ({categoryCounts[cat] || 0})
              </button>
            ))}
          </section>

          {/* Topic Grid */}
          <section className="culture-grid">
            {filteredTopics.map(topic => (
              <CultureTopicCard
                key={topic.id}
                topic={topic}
                language={language}
                copy={copy}
                onClick={() => handleTopicClick(topic)}
              />
            ))}
          </section>

          {filteredTopics.length === 0 && (
            <div className="no-topics">
              <p>{language === 'fr' ? 'Aucun sujet dans cette catégorie pour le moment.' : 'No topics in this category yet.'}</p>
            </div>
          )}
        </>
      ) : (
        <CultureTopicDetail
          topic={selectedTopic}
          language={language}
          copy={copy}
          onBack={handleBackToTopics}
        />
      )}
    </div>
  );
}

// Composant: Carte de sujet culturel
interface CultureTopicCardProps {
  topic: CultureItem;
  language: Language;
  copy: Record<string, string>;
  onClick: () => void;
}

function CultureTopicCard({ topic, language, copy, onClick }: CultureTopicCardProps) {
  const title = language === 'fr' ? topic.title : topic.titleEn;
  const intro = language === 'fr' ? topic.introduction : topic.introductionEn;
  const difficultyLabel = copy[topic.difficulty];
  const categoryLabel = cultureLabels[language][topic.category];

  return (
    <article className="culture-topic-card" onClick={onClick}>
      <div className="card-icon">{topic.icon}</div>
      <div className="card-header">
        <span className="card-category">{categoryLabel}</span>
        <span className="card-difficulty">{difficultyLabel}</span>
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-intro">{intro.substring(0, 150)}...</p>
      <div className="card-footer">
        <span className="card-read-time">
          {topic.estimatedReadTime} {copy.minutes}
        </span>
        <span className="card-cta">{copy.learnMore} →</span>
      </div>
    </article>
  );
}

// Composant: Vue détaillée d'un sujet culturel
interface CultureTopicDetailProps {
  topic: CultureItem;
  language: Language;
  copy: Record<string, string>;
  onBack: () => void;
}

function CultureTopicDetail({ topic, language, copy, onBack }: CultureTopicDetailProps) {
  const title = language === 'fr' ? topic.title : topic.titleEn;
  const intro = language === 'fr' ? topic.introduction : topic.introductionEn;
  const categoryLabel = cultureLabels[language][topic.category];
  const difficultyLabel = copy[topic.difficulty];

  return (
    <div className="culture-topic-detail">
      {/* Back Button */}
      <button className="back-btn" onClick={onBack}>
        ← {copy.backToTopics}
      </button>

      {/* Header - Simplifié */}
      <header className="detail-header">
        <div className="detail-title-row">
          <span className="detail-icon">{topic.icon}</span>
          <h1 className="detail-title">{title}</h1>
        </div>
        <div className="detail-meta">
          <span className="detail-category">{categoryLabel}</span>
          <span className="detail-difficulty">{difficultyLabel}</span>
          <span className="detail-read-time">
            {topic.estimatedReadTime} {copy.minutes}
          </span>
        </div>
      </header>

      {/* Introduction */}
      <section className="detail-introduction">
        <p>{intro}</p>
      </section>

      {/* Sections */}
      <div className="detail-sections">
        {topic.sections.map(section => {
          const sectionTitle = language === 'fr' ? section.title : section.titleEn;
          const sectionContent = language === 'fr' ? section.content : section.contentEn;

          return (
            <section key={section.id} className="detail-section">
              <h2>{sectionTitle}</h2>
              <p>{sectionContent}</p>

              {section.examples && section.examples.length > 0 && (
                <div className="section-examples">
                  {section.examples.map((example, idx) => (
                    <div key={idx} className="example-item">
                      <div className="example-hanzi">{example.hanzi}</div>
                      <div className="example-pinyin">{example.pinyin}</div>
                      <div className="example-translation">
                        {language === 'fr' ? example.translationFr : example.translation}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Cultural Notes */}
      {topic.culturalNotes && topic.culturalNotes.length > 0 && (
        <section className="detail-cultural-notes">
          <h2>{copy.culturalNote}s</h2>
          <div className="cultural-notes-grid">
            {topic.culturalNotes.map((note, idx) => {
              const noteContent = language === 'fr' ? note.content : note.contentEn;
              return (
                <CulturalNoteBox
                  key={idx}
                  type={note.type}
                  content={noteContent}
                  language={language}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Related Vocabulary */}
      {topic.vocabulary && topic.vocabulary.length > 0 && (
        <section className="detail-vocabulary">
          <h2>{copy.relatedVocab}</h2>
          <div className="vocabulary-grid">
            {topic.vocabulary.map((word, idx) => (
              <div key={idx} className="vocabulary-item">
                {word}
              </div>
            ))}
          </div>
          <p className="vocabulary-hint">
            {language === 'fr'
              ? 'Cherchez ces mots dans le Dictionnaire pour plus de détails.'
              : 'Look up these words in the Dictionary for more details.'}
          </p>
        </section>
      )}

      {/* Quiz (if available) */}
      {topic.quiz && (
        <CultureQuizSection
          quiz={topic.quiz}
          language={language}
          copy={copy}
        />
      )}
    </div>
  );
}

// Composant: Quiz culturel
interface CultureQuizSectionProps {
  quiz: { questions: any[] };
  language: Language;
  copy: Record<string, string>;
}

function CultureQuizSection({ quiz, language, copy }: CultureQuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const question = language === 'fr' ? currentQuestion.question : currentQuestion.questionEn;
  const choices = language === 'fr' ? currentQuestion.choices : currentQuestion.choicesEn;
  const explanation = language === 'fr' ? currentQuestion.explanation : currentQuestion.explanationEn;

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      setShowExplanation(true);
      if (index === currentQuestion.correctIndex) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <section className="detail-quiz">
        <h2>{copy.quizTitle}</h2>
        <div className="quiz-completed">
          <div className="quiz-score-display">
            <span className="score-icon">{percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}</span>
            <h3>
              {language === 'fr' ? 'Quiz terminé !' : 'Quiz completed!'}
            </h3>
            <p className="quiz-score">
              {score} / {quiz.questions.length}
              <span className="score-percentage">({percentage}%)</span>
            </p>
            <p className="quiz-message">
              {percentage >= 80
                ? language === 'fr'
                  ? 'Excellent ! Vous maîtrisez ce sujet culturel.'
                  : 'Excellent! You master this cultural topic.'
                : percentage >= 60
                ? language === 'fr'
                  ? 'Bien joué ! Continuez à apprendre.'
                  : 'Well done! Keep learning.'
                : language === 'fr'
                ? 'Bon effort ! Relisez le contenu et réessayez.'
                : 'Good effort! Review the content and try again.'}
            </p>
          </div>
          <button className="quiz-restart-btn" onClick={handleRestartQuiz}>
            {language === 'fr' ? 'Recommencer le quiz' : 'Restart quiz'}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="detail-quiz">
      <h2>{copy.quizTitle}</h2>
      <div className="quiz-progress">
        {language === 'fr' ? 'Question' : 'Question'} {currentQuestionIndex + 1} / {quiz.questions.length}
      </div>

      <div className="quiz-question-card">
        <h3 className="quiz-question">{question}</h3>

        <div className="quiz-choices">
          {choices.map((choice: string, index: number) => {
            let className = 'quiz-choice';
            if (selectedAnswer !== null) {
              if (index === currentQuestion.correctIndex) {
                className += ' correct';
              } else if (index === selectedAnswer) {
                className += ' incorrect';
              } else {
                className += ' disabled';
              }
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
              >
                <span className="choice-letter">{String.fromCharCode(65 + index)}</span>
                <span className="choice-text">{choice}</span>
                {selectedAnswer !== null && index === currentQuestion.correctIndex && (
                  <span className="choice-icon">✓</span>
                )}
                {selectedAnswer === index && index !== currentQuestion.correctIndex && (
                  <span className="choice-icon">✗</span>
                )}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="quiz-explanation">
            <p className="explanation-label">
              {language === 'fr' ? '💡 Explication :' : '💡 Explanation:'}
            </p>
            <p>{explanation}</p>
          </div>
        )}

        {selectedAnswer !== null && (
          <button className="quiz-next-btn" onClick={handleNextQuestion}>
            {isLastQuestion
              ? language === 'fr'
                ? 'Voir les résultats'
                : 'See results'
              : language === 'fr'
              ? 'Question suivante →'
              : 'Next question →'}
          </button>
        )}
      </div>
    </section>
  );
}

// Composant: Note culturelle
interface CulturalNoteBoxProps {
  type: 'tip' | 'warning' | 'history' | 'fun-fact';
  content: string;
  language: Language;
}

function CulturalNoteBox({ type, content, language }: CulturalNoteBoxProps) {
  const icons = {
    tip: '💡',
    warning: '⚠️',
    history: '📜',
    'fun-fact': '🎯'
  };

  const labels = {
    tip: language === 'fr' ? 'Conseil' : 'Tip',
    warning: language === 'fr' ? 'Attention' : 'Warning',
    history: language === 'fr' ? 'Histoire' : 'History',
    'fun-fact': language === 'fr' ? 'Le saviez-vous ?' : 'Did you know?'
  };

  return (
    <div className={`cultural-note-box note-${type}`}>
      <div className="note-header">
        <span className="note-icon">{icons[type]}</span>
        <span className="note-label">{labels[type]}</span>
      </div>
      <p className="note-content">{content}</p>
    </div>
  );
}
