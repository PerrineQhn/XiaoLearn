/**
 * DictionaryLevelPage — liste paginée des entrées d'un niveau HSK (ou hors-HSK).
 * Reproduit hskN.astro : en-tête coloré + grille de CharacterCard.
 *
 * Pagination côté client : on charge toutes les entrées du niveau (déjà
 * chunké côté disque), on affiche par lots de PAGE_SIZE avec un bouton
 * "Charger plus" pour Hors-HSK (50k+ entries).
 */

import { useEffect, useMemo, useState } from 'react';
import type { DictionaryEntry, DictionaryLevel } from '../types/dictionary';
import {
  LEVEL_BG,
  LEVEL_COLOR,
  LEVEL_DESCRIPTION,
  LEVEL_LABEL,
  fetchLevelEntries
} from '../data/dictionary';

interface Props {
  level: DictionaryLevel;
  language: 'fr' | 'en';
  onBack: () => void;
  onSelectEntry: (entryId: string) => void;
}

const PAGE_SIZE = 60;

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

export default function DictionaryLevelPage({
  level,
  language,
  onBack,
  onSelectEntry
}: Props) {
  const [entries, setEntries] = useState<DictionaryEntry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setEntries(null);
    setVisibleCount(PAGE_SIZE);
    fetchLevelEntries(level)
      .then((arr) => {
        if (cancelled) return;
        setEntries(arr);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [level]);

  const filtered = useMemo<DictionaryEntry[]>(() => {
    if (!entries) return [];
    const q = normalize(query);
    if (!q) return entries;
    return entries.filter((e) => {
      const hanzi = e.hanzi.toLowerCase();
      const pinyin = normalize(e.pinyin);
      const trFr = normalize(e.translationFr ?? '');
      const trEn = normalize(e.translationEn ?? '');
      return (
        hanzi.includes(q) ||
        pinyin.includes(q) ||
        trFr.includes(q) ||
        trEn.includes(q)
      );
    });
  }, [entries, query]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="dict-level-page">
      <header
        className="dict-level-header"
        style={{
          background: `linear-gradient(135deg, ${LEVEL_BG[level]}, var(--bg-secondary))`
        }}
      >
        <button type="button" className="dict-breadcrumb-back" onClick={onBack}>
          ← {language === 'fr' ? 'Dictionnaire' : 'Dictionary'}
        </button>
        <span
          className="dict-level-badge"
          style={{ background: LEVEL_COLOR[level] }}
        >
          {LEVEL_LABEL[level]}
        </span>
        <h1 className="dict-level-title">
          {language === 'fr' ? 'Vocabulaire' : 'Vocabulary'} {LEVEL_LABEL[level]}
        </h1>
        <p className="dict-level-description">{LEVEL_DESCRIPTION[level]}</p>
        <div className="dict-level-stats">
          <span className="dict-level-stat">
            {loading
              ? '…'
              : `${(entries?.length ?? 0).toLocaleString('fr-FR')} ${language === 'fr' ? 'mots' : 'words'}`}
          </span>
        </div>
      </header>

      <div className="dict-level-search">
        <input
          type="search"
          className="dict-level-search-input"
          placeholder={
            language === 'fr'
              ? 'Filtrer dans ce niveau (hanzi, pinyin, traduction)…'
              : 'Filter in this level (hanzi, pinyin, translation)…'
          }
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
        />
        {query && (
          <div className="dict-level-search-info">
            {filtered.length} {language === 'fr' ? 'correspondance(s)' : 'match(es)'}
          </div>
        )}
      </div>

      {loading ? (
        <div className="dict-level-loading">
          {language === 'fr' ? 'Chargement du niveau…' : 'Loading level…'}
        </div>
      ) : (
        <>
          <div className="dict-level-grid">
            {visible.map((e) => (
              <button
                key={e.id}
                type="button"
                className="dict-char-card"
                onClick={() => onSelectEntry(e.id)}
              >
                <div className="dict-char-header">
                  <span className="dict-char-hanzi">{e.hanzi}</span>
                </div>
                <div className="dict-char-body">
                  <span className="dict-char-pinyin">{e.pinyin}</span>
                  <p className="dict-char-translation">
                    {language === 'en'
                      ? e.translationEn || e.translationFr
                      : e.translationFr || e.translationEn}
                  </p>
                </div>
                <div className="dict-char-footer">
                  <span className="dict-char-category">{e.category ?? ''}</span>
                  <span className="dict-char-arrow">→</span>
                </div>
              </button>
            ))}
          </div>

          {hasMore && (
            <div className="dict-level-loadmore">
              <button
                type="button"
                className="dict-level-loadmore-btn"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE * 2)}
              >
                {language === 'fr'
                  ? `Afficher ${Math.min(PAGE_SIZE * 2, filtered.length - visibleCount)} de plus`
                  : `Show ${Math.min(PAGE_SIZE * 2, filtered.length - visibleCount)} more`}
              </button>
            </div>
          )}
        </>
      )}

      <style>{`
        .dict-level-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 var(--spacing-lg) var(--spacing-xl);
          color: var(--text-primary);
        }
        .dict-level-header {
          padding: var(--spacing-xl);
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-light);
          margin: var(--spacing-lg) 0;
          position: relative;
        }
        .dict-breadcrumb-back {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0;
          font-size: 0.9rem;
          margin-bottom: var(--spacing-md);
          font-family: inherit;
        }
        .dict-breadcrumb-back:hover { color: var(--primary-red); }
        .dict-level-badge {
          display: inline-block;
          color: white;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: var(--spacing-sm);
        }
        .dict-level-title {
          font-family: var(--font-serif);
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          margin: 0 0 var(--spacing-sm);
          color: var(--text-primary);
        }
        .dict-level-description {
          color: var(--text-secondary);
          margin: 0 0 var(--spacing-md);
        }
        .dict-level-stats {
          display: inline-flex;
          gap: var(--spacing-sm);
        }
        .dict-level-stat {
          display: inline-flex;
          padding: 6px 12px;
          background: var(--bg-primary);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 500;
        }
        .dict-level-search {
          margin-bottom: var(--spacing-md);
        }
        .dict-level-search-input {
          width: 100%;
          padding: 0.7rem 1rem;
          background: var(--bg-primary);
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.95rem;
          font-family: inherit;
        }
        .dict-level-search-input:focus {
          outline: none;
          border-color: var(--primary-red);
        }
        .dict-level-search-info {
          font-size: 0.8rem;
          color: var(--text-tertiary);
          margin-top: 4px;
        }
        .dict-level-loading {
          padding: var(--spacing-2xl);
          text-align: center;
          color: var(--text-tertiary);
        }
        .dict-level-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: var(--spacing-md);
        }
        .dict-char-card {
          display: flex;
          flex-direction: column;
          padding: var(--spacing-md);
          background: var(--bg-primary);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-base);
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          color: var(--text-primary);
        }
        .dict-char-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: var(--primary-red-light);
        }
        .dict-char-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: var(--spacing-sm);
        }
        .dict-char-hanzi {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          line-height: 1;
        }
        .dict-char-body { flex: 1; }
        .dict-char-pinyin {
          display: block;
          font-style: italic;
          color: var(--jade-green);
          margin-bottom: 4px;
        }
        .dict-char-translation {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .dict-char-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: var(--spacing-sm);
          padding-top: var(--spacing-sm);
          border-top: 1px solid var(--border-light);
        }
        .dict-char-category {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          text-transform: capitalize;
        }
        .dict-char-arrow {
          color: var(--primary-red);
          opacity: 0;
          transform: translateX(-6px);
          transition: all var(--transition-base);
        }
        .dict-char-card:hover .dict-char-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        .dict-level-loadmore {
          display: flex;
          justify-content: center;
          margin-top: var(--spacing-xl);
        }
        .dict-level-loadmore-btn {
          padding: 0.7rem 1.5rem;
          background: var(--bg-primary);
          border: 1.5px solid var(--primary-red);
          color: var(--primary-red);
          border-radius: var(--radius-md);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-base);
          font-family: inherit;
        }
        .dict-level-loadmore-btn:hover {
          background: var(--primary-red);
          color: white;
        }
        @media (max-width: 768px) {
          .dict-level-page { padding: 0 var(--spacing-md) var(--spacing-lg); }
          .dict-level-header { padding: var(--spacing-lg); }
          .dict-level-grid { grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); }
          .dict-char-hanzi { font-size: 1.8rem; }
        }
      `}</style>
    </div>
  );
}
