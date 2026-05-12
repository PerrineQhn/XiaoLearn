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
}

const AppTopBar = ({ language = 'fr', onSearch, onNavigate }: Props) => {
  return (
    <header className="xl-app-topbar" role="banner">
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
