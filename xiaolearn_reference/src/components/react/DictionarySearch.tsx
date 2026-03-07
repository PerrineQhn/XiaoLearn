import { useEffect, useMemo, useState } from 'react';
import type { HSKEntry } from '../../types/hsk';
import { searchEntries, filterByLevel } from '../../utils/search';
import type { Locale } from '../../utils/locale';

interface Props {
  entries: HSKEntry[];
  initialLevel?: string;
  initialQuery?: string;
  maxResults?: number;
  showLevelFilters?: boolean;
  hideResultsUntilQuery?: boolean;
  heroMode?: boolean;
  locale?: Locale;
  resultBasePath?: string;
}

export default function DictionarySearch({
  entries,
  initialLevel,
  initialQuery,
  maxResults = 50,
  showLevelFilters = true,
  hideResultsUntilQuery = false,
  heroMode = false,
  locale = 'fr',
  resultBasePath = '/dictionnaire',
}: Props) {
  const [query, setQuery] = useState(initialQuery || '');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(initialLevel || null);
  const copy = locale === 'en' ? EN_COPY : FR_COPY;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const level = params.get('level');

    if (!initialQuery && q) {
      setQuery(q);
    }
    if (!initialLevel && level) {
      setSelectedLevel(level);
    }
  }, [initialLevel, initialQuery]);

  const filteredEntries = useMemo(() => {
    if (hideResultsUntilQuery && !query.trim()) {
      return [];
    }

    let result = entries;

    if (selectedLevel) {
      result = filterByLevel(result, selectedLevel);
    }

    if (query) {
      result = searchEntries(result, query);
    }

    return result.slice(0, maxResults);
  }, [entries, query, selectedLevel, maxResults, hideResultsUntilQuery]);
  const showInitialEmptyState = hideResultsUntilQuery && !query.trim();

  const levels = useMemo(
    () => Array.from(new Set(entries.map((entry) => entry.level))).sort(),
    [entries],
  );

  return (
    <div className="dictionary-search">
      <div className="search-controls">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder={copy.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="search-clear"
              onClick={() => setQuery('')}
              aria-label={copy.clearAria}
            >
              ×
            </button>
          )}
        </div>

        {showLevelFilters && (
          <div className="level-filters">
            <button
              className={`level-btn ${!selectedLevel ? 'active' : ''}`}
              onClick={() => setSelectedLevel(null)}
            >
              {copy.allLevels}
            </button>
            {levels.map(level => (
              <button
                key={level}
                className={`level-btn level-btn-${level} ${selectedLevel === level ? 'active' : ''}`}
                onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
              >
                {level.toUpperCase().replace('HSK', 'HSK ')}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="search-results-info">
        <span>{copy.resultsCount(filteredEntries.length)}</span>
        {filteredEntries.length === maxResults && (
          <span className="results-limited"> {copy.limit(maxResults)}</span>
        )}
      </div>

      <div className="search-results">
        {filteredEntries.length === 0 && showInitialEmptyState ? (
          <div className={`no-results ${heroMode ? 'hero-empty' : ''}`}>
            <span className="no-results-icon">汉</span>
            <p>{copy.startTyping}</p>
            <p className="no-results-hint">{copy.examplesHint}</p>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <p>{copy.noResults(query)}</p>
            <p className="no-results-hint">{copy.noResultsHint}</p>
          </div>
        ) : (
          <div className="results-grid">
            {filteredEntries.map(entry => (
              <a key={entry.id} href={`${resultBasePath}/${entry.id}`} className="result-card">
                <div className="result-header">
                  <span className="result-hanzi">{entry.hanzi}</span>
                  <span className={`result-level badge-${entry.level}`}>
                    {entry.level.toUpperCase().replace('HSK', '')}
                  </span>
                </div>
                <span className="result-pinyin">{entry.pinyin}</span>
                <p className="result-translation">
                  {locale === 'en'
                    ? (entry.translationEn || entry.translation || entry.translationFr)
                    : (entry.translationFr || entry.translationEn || entry.translation || '')}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const FR_COPY = {
  placeholder: 'Rechercher (hanzi, pinyin, francais...)',
  clearAria: 'Effacer la recherche',
  allLevels: 'Tous',
  resultsCount: (count: number) => `${count} resultat${count > 1 ? 's' : ''}`,
  limit: (maxResults: number) => `(limite a ${maxResults})`,
  startTyping: 'Commencez a taper un caractere, un mot ou du pinyin.',
  examplesHint: 'Exemples : 学, xue, etudier',
  noResults: (query: string) => `Aucun resultat pour "${query}"`,
  noResultsHint: 'Essayez avec un autre terme ou modifiez les filtres.',
};

const EN_COPY = {
  placeholder: 'Search (hanzi, pinyin, english...)',
  clearAria: 'Clear search',
  allLevels: 'All',
  resultsCount: (count: number) => `${count} result${count > 1 ? 's' : ''}`,
  limit: (maxResults: number) => `(limited to ${maxResults})`,
  startTyping: 'Start typing a character, a word or pinyin.',
  examplesHint: 'Examples: 学, xue, study',
  noResults: (query: string) => `No results for "${query}"`,
  noResultsHint: 'Try a different term or change the filters.',
};
