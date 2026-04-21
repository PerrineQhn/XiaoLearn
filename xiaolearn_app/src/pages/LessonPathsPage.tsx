import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Language } from '../i18n';
import type { HskLevel, LessonCategory, LessonPath } from '../types/lesson-structure';
import type { CecrLevelMeta } from '../data/cecr-course';

interface LessonPathsPageProps {
  language: Language;
  onSelectLesson: (pathId: string, lessonId: string) => void;
  paths: LessonPath[];
  streak: number;
  minutesToday: number;
  dailyGoalMinutes: number;
  /**
   * Si fourni, la page bascule en mode CECR : 10 niveaux A1 → C2.2, onglets
   * indexés par `level.level` (string) au lieu de `lesson.hskLevel` (1..7).
   * Le regroupement par niveau se fait via `meta.pathIds` (un path appartient
   * à exactement un niveau CECR).
   */
  cecrLevels?: CecrLevelMeta[];
  /**
   * Slot V7 — injection d'une bannière contextuelle au niveau courant
   * (typiquement `<LevelBilanBanner />`). Rendu entre le bloc détail de niveau
   * et la liste des parcours. Reçoit le LevelKey sélectionné (string CECR ou
   * number HSK) et retourne un ReactNode (ou null pour ne rien afficher).
   */
  renderLevelBanner?: (level: HskLevel | string) => ReactNode;
}

// En mode HSK : number (1..7). En mode CECR : string ('a1', 'b1.1', ...).
type LevelKey = HskLevel | string;

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
  level: LevelKey;
  label: string;         // libellé affiché dans l'onglet
  order: number;         // 1..N — utilisé pour le tri et le verrou
  lessonCount: number;
  completedCount: number;
  durationMinutes: number;
  topCategories: LessonCategory[];
};

export default function LessonPathsPage({
  language,
  onSelectLesson,
  paths,
  streak,
  minutesToday,
  dailyGoalMinutes,
  cecrLevels,
  renderLevelBanner
}: LessonPathsPageProps) {
  const isCecr = Array.isArray(cecrLevels) && cecrLevels.length > 0;
  const initialLevel: LevelKey = isCecr ? cecrLevels![0].level : 1;
  const [selectedLevel, setSelectedLevel] = useState<LevelKey>(initialLevel);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const tabsRef = useRef<HTMLDivElement>(null);

  // Index rapide : pathId → CecrLevelMeta (utilisé pour retrouver le niveau
  // CECR d'une leçon via son path).
  const cecrLevelByPathId = useMemo<Map<string, CecrLevelMeta>>(() => {
    const m = new Map<string, CecrLevelMeta>();
    if (isCecr) {
      for (const meta of cecrLevels!) {
        for (const pid of meta.pathIds) m.set(pid, meta);
      }
    }
    return m;
  }, [isCecr, cecrLevels]);

  const scrollTabs = (dir: 'left' | 'right') => {
    tabsRef.current?.scrollBy({ left: dir === 'left' ? -140 : 140, behavior: 'smooth' });
  };

  const totalLessons = useMemo(() => paths.flatMap((p) => p.lessons).length, [paths]);
  const totalCompleted = useMemo(
    () => paths.flatMap((p) => p.lessons).filter((l) => l.completed).length,
    [paths]
  );
  const globalPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;
  const profileLevel = Math.max(1, Math.floor(totalCompleted / 15) + 1);
  const xpTotal = totalCompleted * 20;

  const levelSummaries = useMemo<LevelSummary[]>(() => {
    // ─── Mode CECR : 10 niveaux A1 → C2.2, regroupement par pathIds ───────
    if (isCecr) {
      return cecrLevels!
        .map((meta) => {
          const levelPaths = paths.filter((p) => meta.pathIds.includes(p.id));
          const lessons = levelPaths.flatMap((p) => p.lessons);
          const categoryCounts: Record<string, number> = {};
          lessons.forEach((l) => {
            categoryCounts[l.category] = (categoryCounts[l.category] || 0) + 1;
          });
          return {
            level: meta.level as LevelKey,
            label: language === 'fr' ? meta.name : meta.nameEn,
            order: meta.order,
            lessonCount: lessons.length,
            completedCount: lessons.filter((l) => l.completed).length,
            durationMinutes: lessons.reduce((s, l) => s + l.duration, 0),
            topCategories: Object.entries(categoryCounts)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 3)
              .map(([cat]) => cat as LessonCategory)
          };
        })
        .filter((e) => e.lessonCount > 0)
        .sort((a, b) => a.order - b.order);
    }

    // ─── Mode HSK (legacy) : 7 niveaux, regroupement par lesson.hskLevel ──
    const levelMap = new Map<HskLevel, { lessonCount: number; completedCount: number; durationMinutes: number; categoryCounts: Record<string, number> }>();
    for (let level = 1 as HskLevel; level <= 7; level = (level + 1) as HskLevel) {
      levelMap.set(level, { lessonCount: 0, completedCount: 0, durationMinutes: 0, categoryCounts: {} });
    }
    paths.forEach((path) => {
      path.lessons.forEach((lesson) => {
        const data = levelMap.get(lesson.hskLevel);
        if (!data) return;
        data.lessonCount += 1;
        data.durationMinutes += lesson.duration;
        if (lesson.completed) data.completedCount += 1;
        data.categoryCounts[lesson.category] = (data.categoryCounts[lesson.category] || 0) + 1;
      });
    });
    return Array.from(levelMap.entries())
      .map(([level, data]) => ({
        level: level as LevelKey,
        label: language === 'fr' ? `Niveau ${level}` : `Level ${level}`,
        order: level as number,
        lessonCount: data.lessonCount,
        completedCount: data.completedCount,
        durationMinutes: data.durationMinutes,
        topCategories: Object.entries(data.categoryCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([cat]) => cat as LessonCategory)
      }))
      .filter((e) => e.lessonCount > 0)
      .sort((a, b) => a.order - b.order);
  }, [paths, isCecr, cecrLevels, language]);

  const selectedLevelPaths = useMemo(() => {
    // Mode CECR : un path appartient à exactement un niveau (via pathIds).
    // On garde donc tous ses modules, sans filtrer par hskLevel.
    if (isCecr) {
      const meta = cecrLevels!.find((m) => m.level === selectedLevel);
      if (!meta) return [];
      return paths.filter((p) => meta.pathIds.includes(p.id));
    }
    // Mode HSK : filtrage au grain du module (un path peut mêler plusieurs HSK).
    return paths
      .map((path) => ({ ...path, lessons: path.lessons.filter((l) => l.hskLevel === selectedLevel) }))
      .filter((path) => path.lessons.length > 0);
  }, [paths, selectedLevel, isCecr, cecrLevels]);

  const selectedSummary = levelSummaries.find((e) => e.level === selectedLevel);
  const levelPercent = selectedSummary && selectedSummary.lessonCount > 0
    ? Math.round((selectedSummary.completedCount / selectedSummary.lessonCount) * 100)
    : 0;

  // Libellé complémentaire affiché sous l'entête du niveau.
  // En CECR : on réutilise `meta.description`.
  // En HSK : la catégorisation « Fondations / Intermédiaire / Avancé ».
  const levelLabel = (level: LevelKey) => {
    if (isCecr) {
      const meta = cecrLevels!.find((m) => m.level === level);
      return meta ? (language === 'fr' ? meta.name : meta.nameEn) : '';
    }
    const n = level as number;
    if (language !== 'fr') return n <= 1 ? 'Foundations' : n === 2 ? 'Intermediate' : 'Advanced';
    if (n <= 1) return 'Les bases';
    if (n === 2) return 'Intermédiaire';
    return 'Avancé';
  };

  const selectedFocus = selectedSummary?.topCategories
    .map((c) => (language === 'fr' ? CATEGORY_LABELS[c].fr : CATEGORY_LABELS[c].en))
    .join(', ') ?? '';

  const togglePath = (pathId: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(pathId)) next.delete(pathId);
      else next.add(pathId);
      return next;
    });
  };

  // Next available lesson across selected level
  const nextAvailable = useMemo(() => {
    for (const path of selectedLevelPaths) {
      const lesson = path.lessons.find((l) => !l.locked && !l.completed);
      if (lesson) return { path, lesson };
    }
    for (const path of selectedLevelPaths) {
      const lesson = path.lessons.find((l) => !l.locked);
      if (lesson) return { path, lesson };
    }
    return null;
  }, [selectedLevelPaths]);

  // Global next lesson (across all levels)
  const globalNext = useMemo(() => {
    for (const path of paths) {
      const lesson = path.lessons.find((l) => !l.locked && !l.completed);
      if (lesson) return { path, lesson };
    }
    return null;
  }, [paths]);

  // Auto-expand path containing next lesson
  useEffect(() => {
    const defaultExpanded = new Set<string>();
    if (nextAvailable) {
      defaultExpanded.add(nextAvailable.path.id);
    } else if (selectedLevelPaths[0]) {
      defaultExpanded.add(selectedLevelPaths[0].id);
    }
    setExpandedPaths(defaultExpanded);
  }, [selectedLevel, nextAvailable, selectedLevelPaths]);

  // Auto-select level with next available lesson on mount.
  // En CECR : on résout le niveau via le path parent de la leçon.
  useEffect(() => {
    if (!globalNext) return;
    if (isCecr) {
      const meta = cecrLevelByPathId.get(globalNext.path.id);
      if (meta) setSelectedLevel(meta.level);
    } else {
      setSelectedLevel(globalNext.lesson.hskLevel);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  void streak;
  void minutesToday;
  void dailyGoalMinutes;

  // Filter paths lessons by search
  const filteredLevelPaths = useMemo(() => {
    if (!searchQuery.trim()) return selectedLevelPaths;
    const q = searchQuery.trim().toLowerCase();
    return selectedLevelPaths
      .map((path) => ({
        ...path,
        lessons: path.lessons.filter((l) =>
          l.title.toLowerCase().includes(q) || l.titleEn.toLowerCase().includes(q)
        )
      }))
      .filter((path) => path.lessons.length > 0);
  }, [selectedLevelPaths, searchQuery]);

  return (
    <div className="lp-page">
      {/* Page header */}
      <header className="lp-header">
        <div>
          <h1 className="lp-title">{language === 'fr' ? 'Leçons' : 'Lessons'}</h1>
          <p className="lp-subtitle">
            {language === 'fr'
              ? 'Progresse à ton rythme à travers les niveaux.'
              : 'Progress at your own pace across levels.'}
          </p>
        </div>
      </header>

      {/* Search bar */}
      <div className="lp-search-wrap">
        <span className="lp-search-icon">🔍</span>
        <input
          type="text"
          className="lp-search"
          placeholder={language === 'fr' ? 'Rechercher un mot, une leçon...' : 'Search a word, a lesson...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Global progress card */}
      <section className="lp-global">
        <div className="lp-global-top">
          <span className="lp-global-label">{language === 'fr' ? 'Ta progression globale' : 'Your global progress'}</span>
          <span className="lp-global-pct">{globalPercent}%</span>
        </div>
        <div className="lp-global-bar"><div style={{ width: `${globalPercent}%` }} /></div>
        <div className="lp-global-stats">
          <div className="lp-gstat">
            <span className="lp-gstat-icon">📋</span>
            <div>
              <span className="lp-gstat-label">{language === 'fr' ? 'LEÇONS' : 'LESSONS'}</span>
              <span className="lp-gstat-value">{totalCompleted} {language === 'fr' ? 'complétées' : 'completed'}</span>
            </div>
          </div>
          <div className="lp-gstat">
            <span className="lp-gstat-icon">📚</span>
            <div>
              <span className="lp-gstat-label">TOTAL</span>
              <span className="lp-gstat-value">{totalLessons} {language === 'fr' ? 'leçons' : 'lessons'}</span>
            </div>
          </div>
          <div className="lp-gstat">
            <span className="lp-gstat-icon">🏅</span>
            <div>
              <span className="lp-gstat-label">{language === 'fr' ? 'NIVEAU' : 'LEVEL'}</span>
              <span className="lp-gstat-value">{language === 'fr' ? 'Niv.' : 'Lv.'} {profileLevel}</span>
            </div>
          </div>
          <div className="lp-gstat">
            <span className="lp-gstat-icon">⭐</span>
            <div>
              <span className="lp-gstat-label">XP TOTAL</span>
              <span className="lp-gstat-value">{xpTotal}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Continue lesson card */}
      {globalNext && (
        <section className="lp-continue">
          <span className="lp-continue-label">✨ {language === 'fr' ? 'CONTINUER TA LEÇON' : 'CONTINUE YOUR LESSON'}</span>
          <div
            className="lp-continue-card"
            onClick={() => onSelectLesson(globalNext.path.id, globalNext.lesson.id)}
          >
            <div className="lp-continue-left">
              <div className="lp-continue-badges">
                <span className="lp-continue-cat">
                  {language === 'fr'
                    ? CATEGORY_LABELS[globalNext.lesson.category]?.fr ?? globalNext.path.name
                    : CATEGORY_LABELS[globalNext.lesson.category]?.en ?? globalNext.path.nameEn}
                </span>
                <span className="lp-continue-status">{language === 'fr' ? 'En cours' : 'In progress'}</span>
              </div>
              <span className="lp-continue-title">
                {language === 'fr'
                  ? `${globalNext.path.name} : ${globalNext.lesson.title}`
                  : `${globalNext.path.nameEn}: ${globalNext.lesson.titleEn}`}
              </span>
            </div>
            <button type="button" className="lp-continue-arrow" aria-label="Continue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>
      )}

      {/* Level tabs with scroll arrows */}
      <div className="lp-tabs-container">
        <button type="button" className="lp-tabs-arrow lp-tabs-arrow-left" onClick={() => scrollTabs('left')} aria-label="Scroll left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="lp-level-tabs" ref={tabsRef}>
          {levelSummaries.map((s) => {
            const isSelected = s.level === selectedLevel;
            const isLocked = s.completedCount === 0 && s.order > 1 && !selectedLevelPaths.some((p) => p.lessons.some((l) => !l.locked));
            const tabPercent = s.lessonCount > 0 ? Math.round((s.completedCount / s.lessonCount) * 100) : 0;
            return (
              <button
                key={String(s.level)}
                type="button"
                className={`lp-level-tab${isSelected ? ' active' : ''}${isLocked ? ' locked' : ''}`}
                onClick={() => setSelectedLevel(s.level)}
              >
                <span className="lp-tab-name">{s.label}</span>
                <span className="lp-tab-meta">
                  {isLocked
                    ? (language === 'fr' ? 'Verrouillé' : 'Locked')
                    : `${s.completedCount}/${s.lessonCount} · ${tabPercent}%`}
                </span>
              </button>
            );
          })}
        </div>
        <button type="button" className="lp-tabs-arrow lp-tabs-arrow-right" onClick={() => scrollTabs('right')} aria-label="Scroll right">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* Selected level detail */}
      {selectedSummary && (
        <section className="lp-level-detail">
          <div className="lp-level-detail-header">
            <div className="lp-level-detail-left">
              <span className="lp-level-num">{isCecr ? selectedSummary.order : (selectedLevel as number)}</span>
              <div>
                <h2 className="lp-level-name">
                  {isCecr
                    ? selectedSummary.label
                    : `${language === 'fr' ? 'Niveau' : 'Level'} ${selectedLevel} — ${levelLabel(selectedLevel)}`}
                </h2>
                {selectedFocus && <p className="lp-level-focus">{selectedFocus}</p>}
              </div>
            </div>
            <div className="lp-level-detail-right">
              <span className="lp-level-pct">{levelPercent}%</span>
              <span className="lp-level-count">{selectedSummary.lessonCount} {language === 'fr' ? 'leçons' : 'lessons'}</span>
            </div>
          </div>
          <div className="lp-level-bar"><div style={{ width: `${levelPercent}%` }} /></div>
        </section>
      )}

      {/* V7 slot — bannière bilan de fin de niveau (injectée par le parent) */}
      {renderLevelBanner && renderLevelBanner(selectedLevel)}

      {/* Path accordions */}
      <div className="lp-paths">
        {filteredLevelPaths.map((path) => {
          const completed = path.lessons.filter((l) => l.completed).length;
          const pct = Math.round((completed / path.lessons.length) * 100);
          const isExpanded = expandedPaths.has(path.id);

          return (
            <div key={path.id} className={`lp-path${isExpanded ? ' expanded' : ''}`}>
              <button type="button" className="lp-path-header" onClick={() => togglePath(path.id)}>
                <span className="lp-path-icon">{path.icon}</span>
                <div className="lp-path-info">
                  <h3 className="lp-path-name">{language === 'fr' ? path.name : path.nameEn}</h3>
                  <span className="lp-path-sub">{completed}/{path.lessons.length} {language === 'fr' ? 'leçons' : 'lessons'}</span>
                </div>
                <span className="lp-path-pct">{pct}%</span>
                <span className={`lp-path-chevron${isExpanded ? ' open' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7" /></svg>
                </span>
              </button>

              {isExpanded && (
                <div className="lp-path-lessons">
                  {path.lessons.map((lesson, idx) => {
                    const isActive = nextAvailable?.lesson.id === lesson.id;
                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        className={`lp-lesson${lesson.completed ? ' completed' : ''}${isActive ? ' active' : ''}${lesson.locked ? ' locked' : ''}`}
                        onClick={() => !lesson.locked && onSelectLesson(path.id, lesson.id)}
                        disabled={lesson.locked}
                      >
                        <span className="lp-lesson-num">
                          {lesson.completed ? (
                            <svg width="26" height="26" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="var(--jade-green)"/><path d="M6 10.5L8.5 13L14 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          ) : isActive ? (
                            <svg width="26" height="26" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="var(--primary-red)"/><polygon points="8,6 15,10 8,14" fill="#fff"/></svg>
                          ) : lesson.locked ? (
                            <span className="lp-lesson-idx locked">{idx + 1}</span>
                          ) : (
                            <span className="lp-lesson-idx">{idx + 1}</span>
                          )}
                        </span>
                        <div className="lp-lesson-info">
                          <span className="lp-lesson-title">{language === 'fr' ? lesson.title : lesson.titleEn}</span>
                          <span className="lp-lesson-meta">⏱ {lesson.duration} min</span>
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
    </div>
  );
}
