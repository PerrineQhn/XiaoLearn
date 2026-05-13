/**
 * AppTopBar.tsx — barre de navigation supérieure (search + cloche)
 * -----------------------------------------------------------------
 * Présente en haut de la zone main-content, sur toutes les pages, sticky.
 *
 * Layout :
 *   [ recherche (centrée, max ~640px) ]              [ cloche ]
 *
 * - La cloche utilise NotificationBell mais avec un style "inline" plutôt
 *   que flottant (override de position dans .xl-app-topbar .xl-notif-root).
 * - La recherche redirige vers la page Dictionnaire avec le terme pré-rempli.
 */

import NotificationBell from './NotificationBell';
import GlobalSearchBar from './GlobalSearchBar';

interface Props {
  language?: 'fr' | 'en';
  /** Callback de soumission de la recherche (term → page). */
  onSearch?: (query: string) => void;
  /** Navigation depuis la cloche (notif → page concernée). */
  onNavigate?: (view: string) => void;
  /** Toggle du drawer sidebar mobile (caché en desktop). */
  onToggleSidebar?: () => void;
}

const AppTopBar = ({ language = 'fr', onSearch, onNavigate, onToggleSidebar }: Props) => {
  const hamburgerLabel = language === 'fr' ? 'Ouvrir le menu' : 'Open menu';
  return (
    <header className="xl-app-topbar" role="banner">
      {/* Bouton hamburger — visible seulement ≤ 1024 px via CSS */}
      <button
        type="button"
        className="xl-topbar-hamburger"
        onClick={onToggleSidebar}
        aria-label={hamburgerLabel}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div className="xl-app-topbar-search">
        <GlobalSearchBar language={language} onSubmit={onSearch} />
      </div>
      <div className="xl-app-topbar-actions">
        <NotificationBell language={language} onNavigate={onNavigate} />
      </div>
    </header>
  );
};

export default AppTopBar;
