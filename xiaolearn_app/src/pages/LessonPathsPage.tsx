import { useState, useMemo } from 'react';
import type { Language } from '../i18n';
import type { LessonPath, LessonFilters } from '../types/lesson-structure';
import LessonFiltersComponent from '../components/lessons/LessonFilters';
import LessonBadges from '../components/lessons/LessonBadges';
import { filterLessons } from '../utils/lessonFilters';

interface LessonPathsPageProps {
  language: Language;
  onSelectLesson: (pathId: string, lessonId: string) => void;
  paths: LessonPath[];
}

export default function LessonPathsPage({ language, onSelectLesson, paths }: LessonPathsPageProps) {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set(paths.map(p => p.id)));
  const [filters, setFilters] = useState<LessonFilters>({});

  // Filtrer les parcours selon les filtres actifs
  const filteredPaths = useMemo(() => {
    if (Object.keys(filters).length === 0) {
      return paths;
    }

    const filteredLessons = filterLessons(filters);
    const lessonIds = new Set(filteredLessons.map(l => l.id));

    return paths
      .map(path => ({
        ...path,
        lessons: path.lessons.filter(lesson => lessonIds.has(lesson.id))
      }))
      .filter(path => path.lessons.length > 0);
  }, [paths, filters]);

  const togglePath = (pathId: string) => {
    setExpandedPaths(prev => {
      const next = new Set(prev);
      if (next.has(pathId)) {
        next.delete(pathId);
      } else {
        next.add(pathId);
      }
      return next;
    });
  };

  // Find first incomplete lesson across all paths for "Continue" section
  const firstIncompleteLesson = filteredPaths
    .flatMap(path =>
      path.lessons
        .filter(lesson => !lesson.completed && !lesson.locked)
        .map(lesson => ({ path, lesson }))
    )[0];

  const continuePathProgress = firstIncompleteLesson
    ? Math.round(
        (firstIncompleteLesson.path.lessons.filter((lesson) => lesson.completed).length /
          firstIncompleteLesson.path.lessons.length) *
          100
      )
    : 0;

  return (
    <div className="lessons-page-modern">
      {/* Filters Section */}
      <LessonFiltersComponent language={language} onFiltersChange={setFilters} />

      {/* Continue Section */}
      {firstIncompleteLesson && (
        <section className="continue-lesson-section">
          <div className="continue-lesson-badge">
            <span className="sparkle-icon">✨</span>
            <span>{language === 'fr' ? 'CONTINUE TA LEÇON' : 'CONTINUE YOUR LESSON'}</span>
          </div>

          <div
            className="continue-lesson-card"
            onClick={() => onSelectLesson(firstIncompleteLesson.path.id, firstIncompleteLesson.lesson.id)}
          >
            <div className="continue-lesson-header">
              <span className="continue-lesson-path">
                {language === 'fr' ? firstIncompleteLesson.path.name : firstIncompleteLesson.path.nameEn}
              </span>
              <span className="continue-lesson-status">
                🟢 {language === 'fr' ? 'En cours' : 'In progress'}
              </span>
            </div>

            <h2 className="continue-lesson-title">
              {language === 'fr' ? firstIncompleteLesson.lesson.title : firstIncompleteLesson.lesson.titleEn}
            </h2>

            <div className="continue-lesson-meta">
              <span className="continue-lesson-duration">
                ⏱️ {firstIncompleteLesson.lesson.duration} min
              </span>
              <span className="continue-lesson-progress">
                • {continuePathProgress}% {language === 'fr' ? 'complété' : 'completed'}
              </span>
            </div>

            <div className="continue-lesson-progress-bar">
              <div className="continue-lesson-progress-fill" style={{ width: `${continuePathProgress}%` }}></div>
            </div>

            <button className="continue-lesson-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </section>
      )}

      {/* Paths Section */}
      <section className="paths-section">
        <h2 className="paths-section-title">
          {language === 'fr' ? 'PARCOURS' : 'LEARNING PATHS'}
          {Object.keys(filters).length > 0 && (
            <span className="paths-count">
              {filteredPaths.length} {language === 'fr' ? 'parcours' : 'paths'}
            </span>
          )}
        </h2>

        <div className="paths-list">
          {filteredPaths.map((path) => {
            const completedCount = path.lessons.filter((lesson) => lesson.completed).length;
            const progressPercent = Math.round((completedCount / path.lessons.length) * 100);
            const isExpanded = expandedPaths.has(path.id);

            return (
              <div key={path.id} className="path-item">
                <button
                  className="path-item-header"
                  onClick={() => togglePath(path.id)}
                >
                  <div className="path-item-icon">{path.icon}</div>
                  <div className="path-item-info">
                    <h3 className="path-item-title">
                      {language === 'fr' ? path.name : path.nameEn}
                    </h3>
                    <p className="path-item-subtitle">
                      {completedCount}/{path.lessons.length} {language === 'fr' ? 'leçons' : 'lessons'}
                    </p>
                  </div>
                  <div className="path-item-right">
                    <span className="path-item-progress">{progressPercent}%</span>
                    <span className={`path-item-chevron ${isExpanded ? 'expanded' : ''}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="path-item-lessons">
                    {path.lessons.map((lesson) => {
                      const isActive = !lesson.locked && !lesson.completed;

                      return (
                        <button
                          key={lesson.id}
                          className={`lesson-item ${lesson.locked ? 'locked' : ''} ${lesson.completed ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                          onClick={() => !lesson.locked && onSelectLesson(path.id, lesson.id)}
                          disabled={lesson.locked}
                        >
                          <div className="lesson-item-indicator">
                            {lesson.completed ? (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="lesson-check">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                              </svg>
                            ) : lesson.locked ? (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="lesson-lock">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                              </svg>
                            ) : (
                              <div className="lesson-bullet"></div>
                            )}
                          </div>

                          <div className="lesson-item-content">
                            <div className="lesson-item-title">
                              {language === 'fr' ? lesson.title : lesson.titleEn}
                            </div>
                            <div className="lesson-item-meta">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
                              </svg>
                              <span>{lesson.duration} min</span>
                              {!lesson.locked && !lesson.completed && (
                                <span className="lesson-item-completion"> • 0%</span>
                              )}
                            </div>
                            <LessonBadges
                              language={language}
                              hskLevel={lesson.hskLevel}
                              category={lesson.category}
                              difficulty={lesson.difficulty}
                              compact={true}
                            />
                          </div>

                          {!lesson.locked && (
                            <div className="lesson-item-action">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
