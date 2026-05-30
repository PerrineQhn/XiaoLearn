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
import GlobalSearchBar, {
  type SearchHit,
  type SearchableConversation
} from './GlobalSearchBar';
import type { PersonalFlashcard } from '../types/flashcard-v3';
import type { LessonPath } from '../types/lesson-structure';

interface Props {
  language?: 'fr' | 'en';
  /** Sélection d'un résultat live (leçon, flashcard, conv, ou ask-tutor). */
  onSearchSelect?: (hit: SearchHit) => void;
  /** Parcours (LessonPath) pour indexer module ↔ vocab. */
  lessonPaths?: LessonPath[];
  /** Flashcards perso pour autocomplete. */
  personalFlashcards?: PersonalFlashcard[];
  /** Conversations Prof. Xiao pour autocomplete. */
  tutorConversations?: SearchableConversation[];
  /** Navigation depuis la cloche (notif → page concernée). */
  onNavigate?: (view: string) => void;
  /** Toggle du drawer sidebar mobile (caché en desktop). */
  onToggleSidebar?: () => void;
  /** Niveau XP actuel — affiché en pill cliquable. Si null, pill caché. */
  userLevel?: number;
  /** XP courant dans le niveau / requis (ex: 80/200) pour afficher progrès. */
  userXpInLevel?: number;
  userXpForNext?: number;
}

const AppTopBar = ({
  language = 'fr',
  onSearchSelect,
  lessonPaths,
  personalFlashcards,
  tutorConversations,
  onNavigate,
  onToggleSidebar,
  userLevel,
  userXpInLevel,
  userXpForNext
}: Props) => {
  const hamburgerLabel = language === 'fr' ? 'Ouvrir le menu' : 'Open menu';
  const levelLabel = language === 'fr' ? `Niveau ${userLevel}` : `Level ${userLevel}`;
  const levelTitle =
    userLevel !== undefined && userXpInLevel !== undefined && userXpForNext !== undefined
      ? `${levelLabel} — ${userXpInLevel}/${userXpForNext} XP (voir profil)`
      : levelLabel;
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
        <GlobalSearchBar
          language={language}
          lessonPaths={lessonPaths}
          personalFlashcards={personalFlashcards}
          tutorConversations={tutorConversations}
          onSelectHit={onSearchSelect}
        />
      </div>
      <div className="xl-app-topbar-actions">
        {userLevel !== undefined && (
          <button
            type="button"
            className="xl-topbar-level"
            onClick={() => onNavigate?.('profile')}
            title={levelTitle}
            aria-label={levelTitle}
          >
            <span className="xl-topbar-level-icon" aria-hidden="true">⭐</span>
            <span className="xl-topbar-level-num">{userLevel}</span>
            {userXpInLevel !== undefined && userXpForNext !== undefined && (
              <span
                className="xl-topbar-level-bar"
                aria-hidden="true"
                style={{
                  // Progression dans le niveau, 0-100 %
                  ['--xl-topbar-level-pct' as string]: `${
                    Math.max(0, Math.min(100, (userXpInLevel / userXpForNext) * 100))
                  }%`
                }}
              />
            )}
          </button>
        )}
        <NotificationBell language={language} onNavigate={onNavigate} />
      </div>
    </header>
  );
};

export default AppTopBar;
