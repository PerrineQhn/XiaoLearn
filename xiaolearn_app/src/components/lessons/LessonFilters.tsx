import { useState } from 'react';
import type { Language } from '../../i18n';
import type { LessonFilters, HskLevel, LessonCategory, LessonDifficulty } from '../../types/lesson-structure';
import { getAllCategories } from '../../utils/lessonFilters';

interface LessonFiltersProps {
  language: Language;
  onFiltersChange: (filters: LessonFilters) => void;
}

const HSK_LEVELS: HskLevel[] = [1, 2, 3, 4, 5, 6, 7];

const DIFFICULTY_LABELS: Record<LessonDifficulty, { fr: string; en: string }> = {
  beginner: { fr: 'Débutant', en: 'Beginner' },
  elementary: { fr: 'Élémentaire', en: 'Elementary' },
  intermediate: { fr: 'Intermédiaire', en: 'Intermediate' },
  advanced: { fr: 'Avancé', en: 'Advanced' },
  superior: { fr: 'Supérieur', en: 'Superior' }
};

const CATEGORY_LABELS: Record<LessonCategory, { fr: string; en: string; icon: string }> = {
  pronunciation: { fr: 'Prononciation', en: 'Pronunciation', icon: '🎵' },
  grammar: { fr: 'Grammaire', en: 'Grammar', icon: '📚' },
  conversation: { fr: 'Conversation', en: 'Conversation', icon: '💬' },
  vocabulary: { fr: 'Vocabulaire', en: 'Vocabulary', icon: '📝' },
  culture: { fr: 'Culture', en: 'Culture', icon: '🎎' },
  writing: { fr: 'Écriture', en: 'Writing', icon: '✍️' },
  reading: { fr: 'Lecture', en: 'Reading', icon: '📖' }
};

export default function LessonFiltersComponent({ language, onFiltersChange }: LessonFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedHskLevels, setSelectedHskLevels] = useState<HskLevel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<LessonCategory | undefined>();
  const [selectedDifficulty, setSelectedDifficulty] = useState<LessonDifficulty | undefined>();
  const [searchQuery, setSearchQuery] = useState('');

  const allCategories = getAllCategories();

  const handleFilterChange = () => {
    const filters: LessonFilters = {
      hskLevels: selectedHskLevels.length > 0 ? selectedHskLevels : undefined,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      searchQuery: searchQuery.trim() || undefined
    };
    onFiltersChange(filters);
  };

  const toggleHskLevel = (level: HskLevel) => {
    setSelectedHskLevels(prev => {
      const updated = prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level].sort();

      setTimeout(handleFilterChange, 0);
      return updated;
    });
  };

  const handleCategoryChange = (category: LessonCategory | undefined) => {
    setSelectedCategory(category);
    setTimeout(handleFilterChange, 0);
  };

  const handleDifficultyChange = (difficulty: LessonDifficulty | undefined) => {
    setSelectedDifficulty(difficulty);
    setTimeout(handleFilterChange, 0);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setTimeout(handleFilterChange, 0);
  };

  const clearFilters = () => {
    setSelectedHskLevels([]);
    setSelectedCategory(undefined);
    setSelectedDifficulty(undefined);
    setSearchQuery('');
    onFiltersChange({});
  };

  const hasActiveFilters = selectedHskLevels.length > 0 || selectedCategory || selectedDifficulty || searchQuery.trim();

  return (
    <div className="lesson-filters">
      <div className="lesson-filters-header">
        <button
          className="lesson-filters-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 4h18M3 12h12M3 20h6" />
          </svg>
          <span>{language === 'fr' ? 'Filtres' : 'Filters'}</span>
          {hasActiveFilters && <span className="filter-active-badge">{selectedHskLevels.length + (selectedCategory ? 1 : 0) + (selectedDifficulty ? 1 : 0)}</span>}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`chevron ${isExpanded ? 'expanded' : ''}`}
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {hasActiveFilters && (
          <button className="lesson-filters-clear" onClick={clearFilters}>
            {language === 'fr' ? 'Réinitialiser' : 'Clear'}
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="lesson-filters-content">
          {/* Search */}
          <div className="filter-section">
            <label className="filter-label">
              {language === 'fr' ? 'Rechercher' : 'Search'}
            </label>
            <div className="filter-search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder={language === 'fr' ? 'Titre, tag...' : 'Title, tag...'}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* HSK Levels */}
          <div className="filter-section">
            <label className="filter-label">
              {language === 'fr' ? 'Niveau HSK' : 'HSK Level'}
            </label>
            <div className="filter-chips">
              {HSK_LEVELS.map(level => (
                <button
                  key={level}
                  className={`filter-chip ${selectedHskLevels.includes(level) ? 'active' : ''}`}
                  onClick={() => toggleHskLevel(level)}
                >
                  HSK {level}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="filter-section">
            <label className="filter-label">
              {language === 'fr' ? 'Catégorie' : 'Category'}
            </label>
            <div className="filter-chips">
              {allCategories.map(category => (
                <button
                  key={category}
                  className={`filter-chip ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(selectedCategory === category ? undefined : category)}
                >
                  {CATEGORY_LABELS[category].icon} {language === 'fr' ? CATEGORY_LABELS[category].fr : CATEGORY_LABELS[category].en}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="filter-section">
            <label className="filter-label">
              {language === 'fr' ? 'Difficulté' : 'Difficulty'}
            </label>
            <div className="filter-chips">
              {Object.entries(DIFFICULTY_LABELS).map(([key, labels]) => (
                <button
                  key={key}
                  className={`filter-chip ${selectedDifficulty === key ? 'active' : ''}`}
                  onClick={() => handleDifficultyChange(selectedDifficulty === key ? undefined : key as LessonDifficulty)}
                >
                  {language === 'fr' ? labels.fr : labels.en}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
