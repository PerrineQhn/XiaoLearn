import { useEffect, useMemo, useState } from 'react';
import type { HSKEntry } from '../../types/hsk';
import { searchEntries, filterByLevel } from '../../utils/search';

interface Props {
  entries: HSKEntry[];
  initialLevel?: string;
  initialQuery?: string;
  maxResults?: number;
  showLevelFilters?: boolean;
  hideResultsUntilQuery?: boolean;
}

export default function DictionarySearch({
  entries,
  initialLevel,
  initialQuery,
  maxResults = 50,
  showLevelFilters = true,
  hideResultsUntilQuery = false,
}: Props) {
  const [query, setQuery] = useState(initialQuery || '');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(initialLevel || null);

  useEffect(() => {
    if (initialQuery || typeof window === 'undefined') return;
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) setQuery(q);
  }, [initialQuery]);

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
            placeholder="Rechercher (hanzi, pinyin, français...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="search-clear"
              onClick={() => setQuery('')}
              aria-label="Effacer la recherche"
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
              Tous
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
        <span>{filteredEntries.length} résultat{filteredEntries.length > 1 ? 's' : ''}</span>
        {filteredEntries.length === maxResults && (
          <span className="results-limited"> (limite à {maxResults})</span>
        )}
      </div>

      <div className="search-results">
        {filteredEntries.length === 0 && hideResultsUntilQuery && !query.trim() ? (
          <div className="no-results">
            <span className="no-results-icon">汉</span>
            <p>Commencez à taper un caractère, un mot ou du pinyin.</p>
            <p className="no-results-hint">Exemples : 学, xue, étudier</p>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <p>Aucun résultat pour "{query}"</p>
            <p className="no-results-hint">Essayez avec un autre terme ou modifiez les filtres.</p>
          </div>
        ) : (
          <div className="results-grid">
            {filteredEntries.map(entry => (
              <a key={entry.id} href={`/dictionnaire/${entry.id}`} className="result-card">
                <div className="result-header">
                  <span className="result-hanzi">{entry.hanzi}</span>
                  <span className={`result-level badge-${entry.level}`}>
                    {entry.level.toUpperCase().replace('HSK', '')}
                  </span>
                </div>
                <span className="result-pinyin">{entry.pinyin}</span>
                <p className="result-translation">{entry.translationFr}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
