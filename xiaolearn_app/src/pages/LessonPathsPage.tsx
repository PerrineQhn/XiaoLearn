import { useEffect, useMemo, useState } from 'react';
import type { Language } from '../i18n';
import type { HskLevel, LessonCategory, LessonPath } from '../types/lesson-structure';

interface LessonPathsPageProps {
  language: Language;
  onSelectLesson: (pathId: string, lessonId: string) => void;
  paths: LessonPath[];
  streak: number;
  minutesToday: number;
  dailyGoalMinutes: number;
}

const CATEGORY_LABELS: Record<LessonCategory, { fr: string; en: string }> = {
  pronunciation: { fr: 'Prononciation', en: 'Pronunciation' },
  grammar: { fr: 'Grammaire', en: 'Grammar' },
  conversation: { fr: 'Conversation', en: 'Conversation' },
  vocabulary: { fr: 'Vocabulaire', en: 'Vocabulary' },
  culture: { fr: 'Culture', en: 'Culture' },
  writing: { fr: 'Écriture', en: 'Writing' },
  reading: { fr: 'Lecture', en: 'Reading' }
};

type LevelSummary = {
  level: HskLevel;
  lessonCount: number;
  completedCount: number;
  durationMinutes: number;
  pathNamesFr: string[];
  pathNamesEn: string[];
  topCategories: LessonCategory[];
};

export default function LessonPathsPage({
  language,
  onSelectLesson,
  paths,
  streak,
  minutesToday,
  dailyGoalMinutes
}: LessonPathsPageProps) {
  const [selectedLevel, setSelectedLevel] = useState<HskLevel | null>(null);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  const formatLevelName = (level: HskLevel) => (language === 'fr' ? `Niveau ${level}` : `Level ${level}`);

  const levelSummaries = useMemo<LevelSummary[]>(() => {
    const levelMap = new Map<
      HskLevel,
      {
        lessonCount: number;
        completedCount: number;
        durationMinutes: number;
        pathNamesFr: Set<string>;
        pathNamesEn: Set<string>;
        categoryCounts: Record<string, number>;
      }
    >();

    for (let level = 1 as HskLevel; level <= 7; level = (level + 1) as HskLevel) {
      levelMap.set(level, {
        lessonCount: 0,
        completedCount: 0,
        durationMinutes: 0,
        pathNamesFr: new Set<string>(),
        pathNamesEn: new Set<string>(),
        categoryCounts: {}
      });
    }

    paths.forEach((path) => {
      path.lessons.forEach((lesson) => {
        const levelData = levelMap.get(lesson.hskLevel);
        if (!levelData) return;
        levelData.lessonCount += 1;
        levelData.durationMinutes += lesson.duration;
        if (lesson.completed) levelData.completedCount += 1;
        levelData.pathNamesFr.add(path.name);
        levelData.pathNamesEn.add(path.nameEn);
        levelData.categoryCounts[lesson.category] = (levelData.categoryCounts[lesson.category] || 0) + 1;
      });
    });

    return Array.from(levelMap.entries())
      .map(([level, data]) => ({
        level,
        lessonCount: data.lessonCount,
        completedCount: data.completedCount,
        durationMinutes: data.durationMinutes,
        pathNamesFr: Array.from(data.pathNamesFr),
        pathNamesEn: Array.from(data.pathNamesEn),
        topCategories: Object.entries(data.categoryCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([category]) => category as LessonCategory)
      }))
      .filter((entry) => entry.lessonCount > 0)
      .sort((a, b) => a.level - b.level);
  }, [paths]);

  const selectedLevelPaths = useMemo(() => {
    if (selectedLevel === null) return [];

    return paths
      .map((path) => ({
        ...path,
        lessons: path.lessons.filter((lesson) => lesson.hskLevel === selectedLevel)
      }))
      .filter((path) => path.lessons.length > 0);
  }, [paths, selectedLevel]);

  const selectedLevelSummary = useMemo(
    () => levelSummaries.find((entry) => entry.level === selectedLevel),
    [levelSummaries, selectedLevel]
  );

  const togglePath = (pathId: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(pathId)) {
        next.delete(pathId);
      } else {
        next.add(pathId);
      }
      return next;
    });
  };

  const nextAvailableLesson = useMemo(() => {
    const allLessons = selectedLevelPaths.flatMap((path) =>
      path.lessons.map((lesson) => ({ path, lesson }))
    );
    return (
      allLessons.find(({ lesson }) => !lesson.locked && !lesson.completed) ??
      allLessons.find(({ lesson }) => !lesson.locked) ??
      null
    );
  }, [selectedLevelPaths]);

  useEffect(() => {
    if (!selectedLevel) {
      setExpandedPaths(new Set());
      return;
    }

    const defaultExpanded = new Set<string>();
    if (nextAvailableLesson) {
      defaultExpanded.add(nextAvailableLesson.path.id);
    } else if (selectedLevelPaths[0]) {
      defaultExpanded.add(selectedLevelPaths[0].id);
    }
    setExpandedPaths(defaultExpanded);
  }, [selectedLevel, nextAvailableLesson, selectedLevelPaths]);

  const continuePathProgress = nextAvailableLesson
    ? Math.round(
        (nextAvailableLesson.path.lessons.filter((lesson) => lesson.completed).length /
          nextAvailableLesson.path.lessons.length) *
          100
      )
    : 0;

  const levelProgressPercent =
    selectedLevelSummary && selectedLevelSummary.lessonCount > 0
      ? Math.round((selectedLevelSummary.completedCount / selectedLevelSummary.lessonCount) * 100)
      : 0;

  const totalCompletedLessons = paths.flatMap((path) => path.lessons).filter((lesson) => lesson.completed).length;
  const profileLevel = Math.max(1, Math.floor(totalCompletedLessons / 15) + 1);
  const selectedLevelFocus =
    selectedLevelSummary?.topCategories
      .map((category) => (language === 'fr' ? CATEGORY_LABELS[category].fr : CATEGORY_LABELS[category].en))
      .join(' • ') ?? '';

  return (
    <div className="lessons-page-modern lessons-layout-korean">
      <div className="lesson-pill-row">
        <div className="lesson-pill">
          <span>🔥</span>
          <span className="lesson-pill-value">{streak}</span>
        </div>
        <div className="lesson-pill">
          <span>🎯</span>
          <span className="lesson-pill-value">
            {minutesToday}/{dailyGoalMinutes}m
          </span>
        </div>
        <div className="lesson-pill">
          <span>💎</span>
          <span className="lesson-pill-value">
            {language === 'fr' ? `Niv.${selectedLevel ?? profileLevel}` : `Lv.${selectedLevel ?? profileLevel}`}
          </span>
        </div>
      </div>

      {selectedLevel === null ? (
        <section className="lesson-level-selector">
          <h1 className="lesson-level-selector-title">
            {language === 'fr' ? 'Choisis ton niveau' : 'Choose your level'}
          </h1>
          <p className="lesson-level-selector-subtitle">
            {language === 'fr'
              ? 'Progresse à ton rythme à travers les différents niveaux.'
              : 'Progress at your own pace across different levels.'}
          </p>

          <div className="lesson-level-list">
            {levelSummaries.map((summary) => {
              const focusText = summary.topCategories
                .map((category) => (language === 'fr' ? CATEGORY_LABELS[category].fr : CATEGORY_LABELS[category].en))
                .join(' • ');
              const pathText = (language === 'fr' ? summary.pathNamesFr : summary.pathNamesEn)
                .slice(0, 2)
                .join(' • ');
              const approxHours = Math.max(1, Math.round(summary.durationMinutes / 60));
              return (
                <button
                  key={summary.level}
                  type="button"
                  className="lesson-level-card"
                  onClick={() => setSelectedLevel(summary.level)}
                >
                  <span className="lesson-level-index">{summary.level}</span>

                  <div className="lesson-level-content">
                    <h3 className="lesson-level-title">
                      {formatLevelName(summary.level)}
                    </h3>
                    <p className="lesson-level-description">
                      {focusText || (language === 'fr' ? 'Parcours variés' : 'Mixed learning paths')}
                    </p>
                    <p className="lesson-level-meta">
                      {language === 'fr'
                        ? `${summary.lessonCount} leçons • ~${approxHours} heures${pathText ? ` • ${pathText}` : ''}`
                        : `${summary.lessonCount} lessons • ~${approxHours} hours${pathText ? ` • ${pathText}` : ''}`}
                    </p>
                  </div>

                  <span className="lesson-level-arrow" aria-hidden="true">
                    ›
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      ) : (
        <>
          <button type="button" className="lesson-level-back" onClick={() => setSelectedLevel(null)}>
            ← {language === 'fr' ? 'Tous les niveaux' : 'All levels'}
          </button>

          <section className="lesson-level-header">
            <h1 className="lesson-level-title-main">
              {formatLevelName(selectedLevel)}
            </h1>
            {selectedLevelFocus && <p className="lesson-level-focus">{selectedLevelFocus}</p>}
            <p className="lesson-level-progress-text">
              {levelProgressPercent}% {language === 'fr' ? 'complété' : 'completed'} •{' '}
              {selectedLevelSummary?.lessonCount ?? 0} {language === 'fr' ? 'leçons' : 'lessons'}
            </p>
          </section>

          {nextAvailableLesson && (
            <section className="continue-lesson-section">
              <div className="continue-lesson-badge">
                <span className="sparkle-icon">✨</span>
                <span>{language === 'fr' ? 'PROCHAINE ÉTAPE' : 'NEXT STEP'}</span>
              </div>

              <div
                className="continue-lesson-card"
                onClick={() => onSelectLesson(nextAvailableLesson.path.id, nextAvailableLesson.lesson.id)}
              >
                <div className="continue-lesson-header">
                  <span className="continue-lesson-path">
                    {language === 'fr' ? nextAvailableLesson.path.name : nextAvailableLesson.path.nameEn}
                  </span>
                  <span className="continue-lesson-status">
                    {language === 'fr' ? 'En cours' : 'In progress'}
                  </span>
                </div>

                <h2 className="continue-lesson-title">
                  {language === 'fr' ? nextAvailableLesson.lesson.title : nextAvailableLesson.lesson.titleEn}
                </h2>

                <div className="continue-lesson-meta">
                  <span className="continue-lesson-duration">⏱ {nextAvailableLesson.lesson.duration} min</span>
                  <span className="continue-lesson-progress">
                    • {continuePathProgress}% {language === 'fr' ? 'complété' : 'completed'}
                  </span>
                </div>

                <div className="continue-lesson-progress-bar">
                  <div className="continue-lesson-progress-fill" style={{ width: `${continuePathProgress}%` }}></div>
                </div>

                <button className="continue-lesson-button" type="button" aria-label="Open lesson">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </section>
          )}

          <section className="paths-section">
            <h2 className="paths-section-title">
              <span>{language === 'fr' ? 'PARCOURS' : 'PATHS'}</span>
              <span className="paths-count-inline">
                {selectedLevelSummary?.lessonCount ?? 0} {language === 'fr' ? 'leçons' : 'lessons'}
              </span>
            </h2>

            <div className="paths-list">
              {selectedLevelPaths.map((path) => {
                const completedCount = path.lessons.filter((lesson) => lesson.completed).length;
                const progressPercent = Math.round((completedCount / path.lessons.length) * 100);
                const isExpanded = expandedPaths.has(path.id);

                return (
                  <div key={path.id} className="path-item">
                    <button
                      type="button"
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
                          const isActive = nextAvailableLesson?.lesson.id === lesson.id;

                          return (
                            <button
                              key={lesson.id}
                              type="button"
                              className={`lesson-item ${lesson.locked ? 'locked' : ''} ${lesson.completed ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                              onClick={() => !lesson.locked && onSelectLesson(path.id, lesson.id)}
                              disabled={lesson.locked}
                            >
                              <div className="lesson-item-indicator">
                                {lesson.completed ? (
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="lesson-check">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                  </svg>
                                ) : (
                                  <span className={`lesson-bullet ${lesson.locked ? 'is-locked' : ''}`}></span>
                                )}
                              </div>

                              <div className="lesson-item-content">
                                <div className="lesson-item-title">
                                  {language === 'fr' ? lesson.title : lesson.titleEn}
                                </div>
                                <div className="lesson-item-meta">
                                  <span>⏱ {lesson.duration} min</span>
                                  {!lesson.locked && !lesson.completed && (
                                    <span className="lesson-item-completion">• 0%</span>
                                  )}
                                </div>
                              </div>

                              <div className={`lesson-item-action ${lesson.locked ? 'locked' : ''}`}>
                                {lesson.locked ? (
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="lesson-lock">
                                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                                  </svg>
                                ) : (
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                )}
                              </div>
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

          <section className="level-total-progress">
            <div className="level-total-progress-header">
              <span>{language === 'fr' ? 'PROGRESSION TOTALE' : 'TOTAL PROGRESS'}</span>
              <span>{levelProgressPercent}%</span>
            </div>
            <div className="continue-lesson-progress-bar">
              <div className="continue-lesson-progress-fill" style={{ width: `${levelProgressPercent}%` }}></div>
            </div>
            <p className="level-total-progress-subtitle">
              {selectedLevelSummary?.completedCount ?? 0}{' '}
              {language === 'fr' ? `leçon terminée sur ${selectedLevelSummary?.lessonCount ?? 0}` : `lesson completed out of ${selectedLevelSummary?.lessonCount ?? 0}`}
            </p>
          </section>
        </>
      )}

    </div>
  );
}
