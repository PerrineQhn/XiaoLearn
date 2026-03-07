import { useEffect, useMemo, useState } from 'react';
import type { HSKEntry } from '../../types/hsk';
import { searchEntries, filterByLevel } from '../../utils/search';
import type { Locale } from '../../utils/locale';

interface Props {
  entries?: HSKEntry[];
  entriesUrl?: string;
  initialLevel?: string;
  initialQuery?: string;
  maxResults?: number;
  showLevelFilters?: boolean;
  hideResultsUntilQuery?: boolean;
  heroMode?: boolean;
  locale?: Locale;
  resultBasePath?: string;
}

type HskMeta = {
  chunkSize?: number;
  levels?: Record<string, number>;
};

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function loadEntriesWithFallback(entriesUrl: string): Promise<HSKEntry[]> {
  const fromPrimary = await fetchJson<HSKEntry[]>(entriesUrl);
  if (Array.isArray(fromPrimary) && fromPrimary.length > 0) {
    return fromPrimary;
  }

  const meta = await fetchJson<HskMeta>('/data/hsk/meta.json');
  const levels = meta?.levels ? Object.keys(meta.levels) : [];
  if (levels.length === 0) {
    return [];
  }

  const levelResponses = await Promise.all(
    levels.map((level) => fetchJson<HSKEntry[]>(`/data/hsk/levels/${level}.json`)),
  );
  const fromLevels = levelResponses.flatMap((entries) => (Array.isArray(entries) ? entries : []));
  if (fromLevels.length > 0) {
    return fromLevels;
  }

  const chunkSize = Number(meta?.chunkSize) || 500;
  const chunkRequests: string[] = [];
  for (const level of levels) {
    const levelCount = Number(meta?.levels?.[level] ?? 0);
    const chunkCount = Math.ceil(levelCount / chunkSize);
    for (let index = 1; index <= chunkCount; index += 1) {
      chunkRequests.push(`/data/hsk/${level}/chunk-${String(index).padStart(3, '0')}.json`);
    }
  }

  const chunkResponses = await Promise.all(
    chunkRequests.map((url) => fetchJson<Record<string, HSKEntry>>(url)),
  );

  return chunkResponses.flatMap((chunk) => (chunk ? Object.values(chunk) : []));
}

export default function DictionarySearch({
  entries = [],
  entriesUrl,
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
  const [sourceEntries, setSourceEntries] = useState<HSKEntry[]>(entries);
  const [isLoadingEntries, setIsLoadingEntries] = useState<boolean>(Boolean(entriesUrl && entries.length === 0));
  const copy = locale === 'en' ? EN_COPY : FR_COPY;

  useEffect(() => {
    setSourceEntries(entries);
  }, [entries]);

  useEffect(() => {
    if (!entriesUrl || entries.length > 0) {
      setIsLoadingEntries(false);
      return;
    }

    let isActive = true;
    setIsLoadingEntries(true);

    loadEntriesWithFallback(entriesUrl)
      .then((remoteEntries) => {
        if (!isActive || !Array.isArray(remoteEntries)) return;
        setSourceEntries(remoteEntries);
      })
      .catch(() => {})
      .finally(() => {
        if (isActive) {
          setIsLoadingEntries(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [entries.length, entriesUrl]);

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

    let result = sourceEntries;

    if (selectedLevel) {
      result = filterByLevel(result, selectedLevel);
    }

    if (query) {
      result = searchEntries(result, query);
    }

    return result.slice(0, maxResults);
  }, [sourceEntries, query, selectedLevel, maxResults, hideResultsUntilQuery]);
  const hasQuery = query.trim().length > 0;
  const showInitialEmptyState = !hasQuery;

  const levels = useMemo(
    () => Array.from(new Set(sourceEntries.map((entry) => entry.level))).sort(),
    [sourceEntries],
  );

  return (
    <div className="dictionary-search">
      {isLoadingEntries && sourceEntries.length === 0 && (
        <div className="search-results-info">{copy.loadingEntries}</div>
      )}
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
        {isLoadingEntries && sourceEntries.length === 0 ? (
          <div className="no-results">
            <span className="no-results-icon">汉</span>
            <p>{copy.loadingEntries}</p>
          </div>
        ) : showInitialEmptyState ? (
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
  loadingEntries: 'Chargement du dictionnaire...',
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
  loadingEntries: 'Loading dictionary entries...',
};
