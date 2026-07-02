import { useEffect, useMemo, useState } from 'react';
import type { HSKEntry } from '../../types/hsk';
import { searchEntries, filterByLevel, type DictionarySearchMode } from '../../utils/search';
import type { Locale } from '../../utils/locale';

interface Props {
  entries?: HSKEntry[];
  entriesUrl?: string;
  /**
   * URL d'un index allégé des entrées Hors-HSK (id, level, hanzi, pinyin,
   * translationFr, translationEn, tags). Chargé en parallèle des HSK pour
   * permettre une recherche unifiée. Si omis, seules les HSK sont cherchées.
   */
  horsHskIndexUrl?: string;
  initialLevel?: string;
  initialQuery?: string;
  maxResults?: number;
  showLevelFilters?: boolean;
  hideResultsUntilQuery?: boolean;
  heroMode?: boolean;
  locale?: Locale;
  resultBasePath?: string;
}

const EMPTY_ENTRIES: HSKEntry[] = [];

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
  entries = EMPTY_ENTRIES,
  entriesUrl,
  horsHskIndexUrl,
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
  const [searchMode, setSearchMode] = useState<DictionarySearchMode>('auto');
  const [sourceEntries, setSourceEntries] = useState<HSKEntry[]>(entries);
  const [horsHskEntries, setHorsHskEntries] = useState<HSKEntry[]>(EMPTY_ENTRIES);
  const [isLoadingEntries, setIsLoadingEntries] = useState<boolean>(Boolean(entriesUrl && entries.length === 0));
  const [isLoadingHorsHsk, setIsLoadingHorsHsk] = useState<boolean>(Boolean(horsHskIndexUrl));
  const copy = locale === 'en' ? EN_COPY : FR_COPY;

  useEffect(() => {
    if (entriesUrl && entries.length === 0) {
      return;
    }
    setSourceEntries(entries);
  }, [entries, entriesUrl]);

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

  // Chargement de l'index hors-HSK en parallèle (~24 MB, gzip ~5 MB).
  useEffect(() => {
    if (!horsHskIndexUrl) {
      setIsLoadingHorsHsk(false);
      return;
    }
    let isActive = true;
    setIsLoadingHorsHsk(true);

    fetchJson<HSKEntry[]>(horsHskIndexUrl)
      .then((data) => {
        if (!isActive || !Array.isArray(data)) return;
        setHorsHskEntries(data);
      })
      .catch(() => {})
      .finally(() => {
        if (isActive) setIsLoadingHorsHsk(false);
      });

    return () => {
      isActive = false;
    };
  }, [horsHskIndexUrl]);

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

  // Sources combinées pour le filtre "Tous" et "hors-hsk".
  // On garde HSK et hors-HSK séparés pour pouvoir afficher les HSK en premier
  // (ils sont la cible principale, hors-HSK = bonus exhaustif).
  const filteredEntries = useMemo(() => {
    if (hideResultsUntilQuery && !query.trim()) {
      return [];
    }

    // Cas 1 : filtre sur un niveau HSK précis → on ne cherche QUE dans les HSK
    // Cas 2 : filtre "hors-hsk" → uniquement l'index hors-HSK
    // Cas 3 : "Tous" (selectedLevel = null) → HSK + hors-HSK concaténés
    let pool: HSKEntry[];
    if (selectedLevel === 'hors-hsk') {
      pool = horsHskEntries;
    } else if (selectedLevel) {
      pool = filterByLevel(sourceEntries, selectedLevel);
    } else {
      pool = sourceEntries.concat(horsHskEntries);
    }

    if (query) {
      pool = searchEntries(pool, query, searchMode);
    }

    return pool.slice(0, maxResults);
  }, [sourceEntries, horsHskEntries, query, selectedLevel, maxResults, hideResultsUntilQuery, searchMode]);
  const hasQuery = query.trim().length > 0;
  const showInitialEmptyState = !hasQuery;

  // Liste des niveaux affichés dans les filtres. On force "hors-hsk" si l'URL
  // d'index est fournie, même si l'index n'est pas encore chargé — sinon le
  // bouton "Hors-HSK" n'apparaîtrait qu'après ~1s de chargement.
  const levels = useMemo(() => {
    const fromHsk = new Set(sourceEntries.map((entry) => entry.level));
    const all = Array.from(fromHsk).sort();
    if (horsHskIndexUrl && !all.includes('hors-hsk')) {
      all.push('hors-hsk');
    }
    return all;
  }, [sourceEntries, horsHskIndexUrl]);

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
          <div className="level-filters search-mode-filters" role="group" aria-label={copy.searchModeAria}>
            <button
              className={`level-btn search-mode-btn ${searchMode === 'auto' ? 'active' : ''}`}
              onClick={() => setSearchMode('auto')}
            >
              {copy.searchModeAuto}
            </button>
            <button
              className={`level-btn search-mode-btn ${searchMode === 'pinyin' ? 'active' : ''}`}
              onClick={() => setSearchMode('pinyin')}
            >
              {copy.searchModePinyin}
            </button>
            <button
              className={`level-btn search-mode-btn ${searchMode === 'translation' ? 'active' : ''}`}
              onClick={() => setSearchMode('translation')}
            >
              {copy.searchModeTranslation}
            </button>
          </div>
        )}

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
                {level === 'hors-hsk'
                  ? copy.horsHskLabel
                  : level.toUpperCase().replace('HSK', 'HSK ')}
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
        {isLoadingHorsHsk && (
          <span className="results-limited" style={{ marginLeft: '0.5rem' }}>
            · {copy.loadingHorsHsk}
          </span>
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
            {filteredEntries.map(entry => {
              // Routage : les hors-HSK ont leur propre route dédiée
              // /dictionnaire/hors-hsk/[id], les HSK utilisent resultBasePath.
              const href = entry.level === 'hors-hsk'
                ? `/dictionnaire/hors-hsk/${entry.id}`
                : `${resultBasePath}/${entry.id}`;
              const levelLabel = entry.level === 'hors-hsk'
                ? 'H-HSK'
                : entry.level.toUpperCase().replace('HSK', '');
              return (
                <a key={entry.id} href={href} className="result-card">
                  <div className="result-header">
                    <span className="result-hanzi">{entry.hanzi}</span>
                    <span className={`result-level badge-${entry.level}`}>
                      {levelLabel}
                    </span>
                  </div>
                  <span className="result-pinyin">{entry.pinyin}</span>
                  <p className="result-translation">
                    {locale === 'en'
                      ? (entry.translationEn || entry.translation || entry.translationFr)
                      : (entry.translationFr || entry.translationEn || entry.translation || '')}
                  </p>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const FR_COPY = {
  placeholder: 'Rechercher (hanzi, pinyin, francais...)',
  clearAria: 'Effacer la recherche',
  searchModeAria: 'Mode de recherche',
  searchModeAuto: 'Auto',
  searchModePinyin: 'Pinyin',
  searchModeTranslation: 'FR/EN',
  allLevels: 'Tous',
  horsHskLabel: 'Hors-HSK',
  loadingHorsHsk: 'Chargement de la base Hors-HSK (109 710 mots)…',
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
  searchModeAria: 'Search mode',
  searchModeAuto: 'Auto',
  searchModePinyin: 'Pinyin',
  searchModeTranslation: 'FR/EN',
  allLevels: 'All',
  horsHskLabel: 'Beyond HSK',
  loadingHorsHsk: 'Loading beyond-HSK base (109,710 words)…',
  resultsCount: (count: number) => `${count} result${count > 1 ? 's' : ''}`,
  limit: (maxResults: number) => `(limited to ${maxResults})`,
  startTyping: 'Start typing a character, a word or pinyin.',
  examplesHint: 'Examples: 学, xue, study',
  noResults: (query: string) => `No results for "${query}"`,
  noResultsHint: 'Try a different term or change the filters.',
  loadingEntries: 'Loading dictionary entries...',
};
