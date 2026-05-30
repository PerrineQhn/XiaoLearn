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
  /** Tier d'accès actuel ('free' | 'trial' | 'premium'). Toujours affiché
   *  comme badge à côté du pill niveau pour montrer l'abonnement en cours. */
  accessTier?: string;
  /** Si tier='premium', distingue Lifetime (true) d'un abonnement mensuel
   *  (false). Source : `appAccess.isLifetime`. Permet d'afficher
   *  "Lifetime" ou "Monthly" sur le badge. */
  isLifetime?: boolean;
  /** Jours restants de trial (s'il y en a) — affichés dans le titre du badge. */
  trialDaysLeft?: number;
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
  userXpForNext,
  accessTier,
  isLifetime,
  trialDaysLeft
}: Props) => {
  // Badge abonnement : affiche le tier ACTUEL en permanence (Free / Trial /
  // Monthly / Lifetime). Click → SubscriptionPage (gérer / upgrader). Caché
  // uniquement si accessTier est indéfini (chargement).
  type SubKind = 'free' | 'trial' | 'monthly' | 'lifetime';
  let subKind: SubKind | null = null;
  if (accessTier === 'free') subKind = 'free';
  else if (accessTier === 'trial') subKind = 'trial';
  else if (accessTier === 'premium')
    subKind = isLifetime ? 'lifetime' : 'monthly';

  const subLabels: Record<SubKind, { fr: string; en: string }> = {
    free: { fr: 'Free', en: 'Free' },
    trial: { fr: 'Essai', en: 'Trial' },
    monthly: { fr: 'Mensuel', en: 'Monthly' },
    lifetime: { fr: 'Lifetime', en: 'Lifetime' }
  };
  const subIcons: Record<SubKind, string> = {
    free: '🔓',
    trial: '⏳',
    monthly: '✨',
    lifetime: '👑'
  };
  const subTitles: Record<SubKind, { fr: string; en: string }> = {
    free: {
      fr: 'Compte gratuit — découvrir Premium',
      en: 'Free account — discover Premium'
    },
    trial: {
      fr:
        trialDaysLeft !== undefined && trialDaysLeft > 0
          ? `Essai gratuit · ${trialDaysLeft} j restants — passer à Premium`
          : 'Essai gratuit — passer à Premium',
      en:
        trialDaysLeft !== undefined && trialDaysLeft > 0
          ? `Free trial · ${trialDaysLeft} d left — upgrade to Premium`
          : 'Free trial — upgrade to Premium'
    },
    monthly: {
      fr: 'Abonnement mensuel actif — gérer',
      en: 'Monthly subscription active — manage'
    },
    lifetime: {
      fr: 'Accès à vie · merci 🙏',
      en: 'Lifetime access · thank you 🙏'
    }
  };
  const showSubBadge = subKind !== null;
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
        {showSubBadge && subKind && (
          <button
            type="button"
            className={`xl-topbar-sub xl-topbar-sub--${subKind}`}
            onClick={() => onNavigate?.('subscription')}
            title={subTitles[subKind][language === 'en' ? 'en' : 'fr']}
            aria-label={subTitles[subKind][language === 'en' ? 'en' : 'fr']}
          >
            <span className="xl-topbar-sub-icon" aria-hidden="true">
              {subIcons[subKind]}
            </span>
            <span className="xl-topbar-sub-label">
              {subLabels[subKind][language === 'en' ? 'en' : 'fr']}
            </span>
            {subKind === 'trial' &&
              trialDaysLeft !== undefined &&
              trialDaysLeft > 0 && (
                <span className="xl-topbar-sub-days">{trialDaysLeft}j</span>
              )}
          </button>
        )}
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
