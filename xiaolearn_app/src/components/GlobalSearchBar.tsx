/**
 * GlobalSearchBar.tsx — barre de recherche universelle (top-bar)
 * --------------------------------------------------------------
 * Présente sur toutes les pages (rendue par AppTopBar). Cherche dans :
 *   - mots du dictionnaire (hanzi, pinyin, traduction)
 *   - leçons (titre, slug)
 *   - conjugaisons (futur)
 *
 * Implémentation MVP : redirige vers la page dictionnaire (`view='dictionary'`)
 * en passant le terme via state global / props (à brancher dans App.tsx via
 * `onSubmit`). Plus tard : autocomplete inline avec résultats live.
 */

import { useState, type FormEvent } from 'react';

interface Props {
  language?: 'fr' | 'en';
  /** Callback invoqué quand l'utilisateur valide la recherche. */
  onSubmit?: (query: string) => void;
}

const PLACEHOLDERS = {
  fr: 'Rechercher un mot, une leçon, une conjugaison…',
  en: 'Search a word, a lesson, a conjugation…'
};

const GlobalSearchBar = ({ language = 'fr', onSubmit }: Props) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    onSubmit?.(q);
    setQuery('');
  };

  return (
    <form className="xl-global-search" role="search" onSubmit={handleSubmit}>
      <span className="xl-global-search-icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        type="search"
        className="xl-global-search-input"
        placeholder={PLACEHOLDERS[language]}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label={PLACEHOLDERS[language]}
      />
    </form>
  );
};

export default GlobalSearchBar;
