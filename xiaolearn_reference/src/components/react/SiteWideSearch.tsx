import { useEffect, useMemo, useState } from 'react';
import type { SiteSearchItem, SiteSearchSection } from '../../types/search';
import { searchSite } from '../../utils/siteSearch';

interface SearchIndexPayload {
  generatedAt: string;
  count: number;
  items: SiteSearchItem[];
}

const SECTION_ORDER: SiteSearchSection[] = [
  'Pages',
  'Dictionnaire',
  'Grammaire',
  'Nuances',
  'Culture',
];

const MAX_RESULTS = 120;

function readInitialQuery(): string {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('q')?.trim() || '';
}

export default function SiteWideSearch() {
  const [query, setQuery] = useState('');
  const [ready, setReady] = useState(false);
  const [items, setItems] = useState<SiteSearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setQuery(readInitialQuery());
    setReady(true);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSearchIndex() {
      try {
        setLoading(true);
        const response = await fetch('/search-index.json', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Impossible de charger l'index (${response.status})`);
        }

        const payload = (await response.json()) as SearchIndexPayload;
        setItems(payload.items || []);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Erreur de chargement');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadSearchIndex();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!ready || typeof window === 'undefined') return;

    const next = new URL(window.location.href);
    if (query.trim()) {
      next.searchParams.set('q', query.trim());
    } else {
      next.searchParams.delete('q');
    }

    window.history.replaceState({}, '', `${next.pathname}${next.search}${next.hash}`);
  }, [query, ready]);

  const results = useMemo(() => searchSite(items, query, MAX_RESULTS), [items, query]);

  const groupedResults = useMemo(() => {
    const grouped = new Map<SiteSearchSection, SiteSearchItem[]>();

    for (const item of results) {
      const current = grouped.get(item.section) || [];
      current.push(item);
      grouped.set(item.section, current);
    }

    return SECTION_ORDER
      .map((section) => ({
        section,
        items: grouped.get(section) || [],
      }))
      .filter((group) => group.items.length > 0);
  }, [results]);

  return (
    <div className="site-search">
      <div className="site-search-controls card">
        <label className="site-search-label" htmlFor="site-search-input">
          Rechercher sur tout le site
        </label>
        <div className="site-search-input-row">
          <input
            id="site-search-input"
            type="search"
            className="search-input"
            placeholder="Ex: 把, chunjie, classificateur,会 能 可以..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && (
            <button
              type="button"
              className="site-search-clear"
              onClick={() => setQuery('')}
              aria-label="Effacer la recherche"
            >
              Effacer
            </button>
          )}
        </div>
        <p className="site-search-meta">
          {loading
            ? 'Chargement de l'index...'
            : `${results.length} résultat${results.length > 1 ? 's' : ''}`}
        </p>
        {error && <p className="site-search-error">{error}</p>}
      </div>

      {!loading && !query.trim() && (
        <div className="site-search-empty card">
          <h3>Lancez une recherche globale</h3>
          <p>Entrez un mot chinois, du pinyin, une règle de grammaire ou un thème culturel.</p>
        </div>
      )}

      {!loading && query.trim() && results.length === 0 && (
        <div className="site-search-empty card">
          <h3>Aucun résultat</h3>
          <p>Essayez un autre terme, sans accent ou avec un mot plus court.</p>
        </div>
      )}

      {groupedResults.map((group) => (
        <section key={group.section} className="site-result-section">
          <h2>
            {group.section} <span>{group.items.length}</span>
          </h2>
          <div className="site-result-grid">
            {group.items.map((item) => (
              <a key={item.id} href={item.href} className="site-result-card">
                <span className="site-result-badge">{item.section}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
