/**
 * DictionaryPage — hub du dictionnaire CFDICT.
 * Reproduit le visuel de xiaolearn_reference/src/pages/dictionnaire/index.astro :
 *  - en-tête avec total
 *  - grille de 8 cartes (HSK1→7-9 + Hors-HSK) avec compteur par niveau
 *  - barre de recherche autocomplete intégrée (debounced)
 */

import { useEffect, useMemo, useState } from 'react';
import type { DictionaryEntry, DictionaryLevel } from '../types/dictionary';
import {
  ALL_DICTIONARY_LEVELS,
  LEVEL_BG,
  LEVEL_COLOR,
  LEVEL_DESCRIPTION,
  LEVEL_LABEL,
  fetchDictionaryStats,
  fetchLevelEntries
} from '../data/dictionary';

interface Props {
  language: 'fr' | 'en';
  /** Ouvre la page liste paginée pour un niveau donné. */
  onSelectLevel: (level: DictionaryLevel) => void;
  /** Ouvre la fiche détail d'une entrée. */
  onSelectEntry: (entryId: string) => void;
}

const MAX_RESULTS = 60;

/** Normalise une chaîne pour la recherche (NFD + retire les diacritiques, casse). */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

export default function DictionaryPage({ language, onSelectLevel, onSelectEntry }: Props) {
  const [stats, setStats] = useState<Record<DictionaryLevel, number> | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [filterLevel, setFilterLevel] = useState<DictionaryLevel | 'all'>('all');
  const [searchEntries, setSearchEntries] = useState<DictionaryEntry[] | null>(null);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Stats par niveau au mount (1 fetch sur meta + manifest).
  useEffect(() => {
    let cancelled = false;
    fetchDictionaryStats()
      .then((s) => {
        if (!cancelled) {
          setStats(s);
          setStatsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setStatsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Debounce 300ms pour la recherche
  useEffect(() => {
    const id = setTimeout(() => setDebounced(query.trim()), 300);
    return () => clearTimeout(id);
  }, [query]);

  // Charge à la demande le pool de recherche : si filtre = 'all', on charge
  // tous les niveaux HSK (hors-HSK est volumineux → on l'ajoute uniquement
  // quand explicitement filtré).
  useEffect(() => {
    let cancelled = false;
    if (!debounced) {
      setSearchEntries(null);
      return;
    }
    setLoadingSearch(true);
    const levelsToFetch: DictionaryLevel[] =
      filterLevel === 'all'
        ? (['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7'] as DictionaryLevel[])
        : [filterLevel];
    Promise.all(levelsToFetch.map((lvl) => fetchLevelEntries(lvl)))
      .then((arrs) => {
        if (cancelled) return;
        setSearchEntries(arrs.flat());
        setLoadingSearch(false);
      })
      .catch(() => {
        if (!cancelled) setLoadingSearch(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debounced, filterLevel]);

  // Filtre par requête + niveau
  const results = useMemo<DictionaryEntry[]>(() => {
    if (!debounced || !searchEntries) return [];
    const q = normalize(debounced);
    const matched: DictionaryEntry[] = [];
    for (const e of searchEntries) {
      if (filterLevel !== 'all' && e.level !== filterLevel) continue;
      const hanzi = e.hanzi.toLowerCase();
      const pinyin = normalize(e.pinyin);
      const trFr = normalize(e.translationFr ?? '');
      const trEn = normalize(e.translationEn ?? '');
      if (
        hanzi.includes(q) ||
        pinyin.includes(q) ||
        trFr.includes(q) ||
        trEn.includes(q)
      ) {
        matched.push(e);
        if (matched.length >= MAX_RESULTS) break;
      }
    }
    return matched;
  }, [debounced, searchEntries, filterLevel]);

  const total = useMemo(() => {
    if (!stats) return 0;
    let n = 0;
    for (const lvl of ALL_DICTIONARY_LEVELS) {
      if (lvl === 'hors-hsk') continue;
      n += stats[lvl] ?? 0;
    }
    return n;
  }, [stats]);

  return (
    <div className="dict-page">
      <header className="dict-header">
        <h1 className="dict-title">
          {language === 'fr' ? 'Dictionnaire ' : 'Dictionary '}
          <span className="dict-title-accent">
            {language === 'fr' ? 'chinois–français' : 'chinese–french'}
          </span>
        </h1>
        <p className="dict-subtitle">
          {language === 'fr' ? (
            <>
              Plus de <strong>{total.toLocaleString('fr-FR')}</strong> mots du HSK 1 au HSK 7-9
              avec pinyin, traductions et exemples d'utilisation. La section Hors-HSK regroupe le
              vocabulaire courant en dehors du programme officiel.
            </>
          ) : (
            <>
              Over <strong>{total.toLocaleString('en-US')}</strong> words from HSK 1 to HSK 7-9
              with pinyin, translations and example sentences. The Hors-HSK section covers common
              vocabulary outside the official HSK program.
            </>
          )}
        </p>
      </header>

      <section className="dict-level-overview">
        {ALL_DICTIONARY_LEVELS.map((lvl) => {
          const count = stats?.[lvl] ?? 0;
          return (
            <button
              key={lvl}
              type="button"
              className="dict-level-card"
              style={{
                ['--lvl-color' as string]: LEVEL_COLOR[lvl],
                ['--lvl-bg' as string]: LEVEL_BG[lvl]
              }}
              onClick={() => onSelectLevel(lvl)}
            >
              <span className="dict-level-count">
                {statsLoading ? '…' : count.toLocaleString('fr-FR')}
              </span>
              <span className="dict-level-name">{LEVEL_LABEL[lvl]}</span>
              <span className="dict-level-desc">{LEVEL_DESCRIPTION[lvl]}</span>
            </button>
          );
        })}
      </section>

      <section className="dict-search-section">
        <div className="dict-search-controls">
          <div className="dict-search-input-wrapper">
            <input
              type="search"
              className="dict-search-input"
              placeholder={
                language === 'fr'
                  ? 'Rechercher un mot, un pinyin ou une traduction…'
                  : 'Search a word, pinyin or translation…'
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button
                type="button"
                className="dict-search-clear"
                onClick={() => setQuery('')}
                aria-label={language === 'fr' ? 'Effacer' : 'Clear'}
              >
                ×
              </button>
            )}
          </div>

          <div className="dict-level-filters">
            <button
              type="button"
              className={`dict-level-btn ${filterLevel === 'all' ? 'active' : ''}`}
              onClick={() => setFilterLevel('all')}
            >
              {language === 'fr' ? 'Tous (HSK)' : 'All (HSK)'}
            </button>
            {ALL_DICTIONARY_LEVELS.map((lvl) => (
              <button
                key={lvl}
                type="button"
                className={`dict-level-btn ${filterLevel === lvl ? 'active' : ''}`}
                style={
                  filterLevel === lvl
                    ? {
                        background: LEVEL_COLOR[lvl],
                        borderColor: LEVEL_COLOR[lvl],
                        color: '#fff'
                      }
                    : { color: LEVEL_COLOR[lvl] }
                }
                onClick={() => setFilterLevel(lvl)}
              >
                {LEVEL_LABEL[lvl]}
              </button>
            ))}
          </div>
        </div>

        {debounced && (
          <div className="dict-search-info">
            {loadingSearch
              ? language === 'fr' ? 'Chargement…' : 'Loading…'
              : results.length === 0
                ? language === 'fr' ? 'Aucun résultat' : 'No results'
                : `${results.length}${results.length >= MAX_RESULTS ? '+' : ''} ${language === 'fr' ? 'résultats' : 'results'}`}
          </div>
        )}

        {results.length > 0 && (
          <div className="dict-results-grid">
            {results.map((e) => (
              <button
                key={e.id}
                type="button"
                className="dict-result-card"
                onClick={() => onSelectEntry(e.id)}
              >
                <div className="dict-result-header">
                  <span className="dict-result-hanzi">{e.hanzi}</span>
                  <span
                    className="dict-result-level"
                    style={{
                      background: LEVEL_BG[e.level],
                      color: LEVEL_COLOR[e.level]
                    }}
                  >
                    {LEVEL_LABEL[e.level]}
                  </span>
                </div>
                <div className="dict-result-pinyin">{e.pinyin}</div>
                <div className="dict-result-translation">
                  {language === 'en'
                    ? e.translationEn || e.translationFr
                    : e.translationFr || e.translationEn}
                </div>
              </button>
            ))}
          </div>
        )}

        {debounced && !loadingSearch && results.length === 0 && (
          <div className="dict-no-results">
            <span className="dict-no-results-icon">🔍</span>
            <p>
              {language === 'fr'
                ? 'Aucune entrée ne correspond à votre recherche.'
                : 'No entry matches your search.'}
            </p>
            <p className="dict-no-results-hint">
              {language === 'fr'
                ? 'Essayez un autre mot ou changez le filtre de niveau.'
                : 'Try a different word or change the level filter.'}
            </p>
          </div>
        )}
      </section>

      <style>{`
        .dict-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: var(--spacing-xl) var(--spacing-lg);
          color: var(--text-primary);
        }
        .dict-header {
          padding: var(--spacing-xl) var(--spacing-lg);
          background: linear-gradient(135deg, var(--bg-accent), var(--bg-secondary));
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-light);
          margin-bottom: var(--spacing-xl);
        }
        .dict-title {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          margin: 0 0 var(--spacing-sm);
          color: var(--text-primary);
        }
        .dict-title-accent {
          background: linear-gradient(120deg, var(--primary-red), var(--gold-accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .dict-subtitle {
          max-width: 720px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }
        .dict-level-overview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-xl);
        }
        .dict-level-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: var(--spacing-lg);
          background: var(--lvl-bg);
          border-radius: var(--radius-lg);
          border: 2px solid transparent;
          cursor: pointer;
          transition: all var(--transition-base);
          text-align: center;
        }
        .dict-level-card:hover {
          border-color: var(--lvl-color);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        .dict-level-count {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--lvl-color);
        }
        .dict-level-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .dict-level-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.35;
          margin-top: 4px;
        }
        .dict-search-section {
          background: var(--bg-primary);
          border-radius: var(--radius-xl);
          padding: var(--spacing-xl);
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }
        .dict-search-controls {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }
        .dict-search-input-wrapper {
          position: relative;
        }
        .dict-search-input {
          width: 100%;
          padding: 0.85rem 3rem 0.85rem 1rem;
          font-size: 1rem;
          background: var(--bg-secondary);
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-family: inherit;
        }
        .dict-search-input:focus {
          outline: none;
          border-color: var(--primary-red);
          background: var(--bg-primary);
        }
        .dict-search-clear {
          position: absolute;
          right: var(--spacing-sm);
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 1.5rem;
          color: var(--text-tertiary);
          cursor: pointer;
          line-height: 1;
          padding: 0 0.5rem;
        }
        .dict-search-clear:hover { color: var(--text-primary); }
        .dict-level-filters {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
        }
        .dict-level-btn {
          padding: 0.4rem 0.85rem;
          border: 1.5px solid var(--border-light);
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all var(--transition-base);
        }
        .dict-level-btn:hover {
          border-color: var(--primary-red);
          color: var(--primary-red);
        }
        .dict-search-info {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }
        .dict-results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: var(--spacing-md);
        }
        .dict-result-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          padding: var(--spacing-md);
          background: var(--bg-secondary);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
          text-align: left;
          cursor: pointer;
          transition: all var(--transition-base);
          color: var(--text-primary);
          font-family: inherit;
        }
        .dict-result-card:hover {
          border-color: var(--primary-red-light);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        .dict-result-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          gap: var(--spacing-sm);
        }
        .dict-result-hanzi {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          line-height: 1;
        }
        .dict-result-level {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          white-space: nowrap;
        }
        .dict-result-pinyin {
          font-style: italic;
          font-size: 0.9rem;
          color: var(--jade-green);
        }
        .dict-result-translation {
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .dict-no-results {
          text-align: center;
          padding: var(--spacing-2xl);
          color: var(--text-tertiary);
        }
        .dict-no-results-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: var(--spacing-md);
        }
        .dict-no-results-hint {
          font-size: 0.85rem;
          margin-top: var(--spacing-xs);
        }
        @media (max-width: 768px) {
          .dict-page { padding: var(--spacing-lg) var(--spacing-md); }
          .dict-level-overview { grid-template-columns: repeat(2, 1fr); }
          .dict-search-section { padding: var(--spacing-lg); }
        }
        @media (max-width: 540px) {
          .dict-level-overview { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
