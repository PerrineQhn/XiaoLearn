/**
 * DevModeToggle — bouton pill DEV/PROD affiché dans le sidebar-footer.
 *
 * - Invisible pour tout compte qui n'est PAS dans `DEV_MODE_ALLOWED_EMAILS`
 *   (useDevMode retourne isAvailable=false → on render `null`).
 * - Un clic inverse l'état. Le hook se charge du localStorage et de la
 *   classe `dev-mode-active` sur <body>.
 * - Styles collocés dans `DevModeToggle.css`.
 */
import { useDevMode } from '../hooks/useDevMode';
import './DevModeToggle.css';

interface DevModeToggleProps {
  language?: 'fr' | 'en';
}

export default function DevModeToggle({ language = 'fr' }: DevModeToggleProps) {
  const { isAvailable, isActive, toggle } = useDevMode();

  if (!isAvailable) return null;

  const label = isActive
    ? language === 'fr'
      ? 'Mode DEV'
      : 'Dev mode'
    : language === 'fr'
      ? 'Mode PROD'
      : 'Prod mode';

  const hint = isActive
    ? language === 'fr'
      ? 'Tous les verrous sont désactivés (abonnement, niveaux, progression). Clique pour repasser en prod.'
      : 'All locks bypassed (subscription, levels, progression). Click to switch back to prod.'
    : language === 'fr'
      ? 'Expérience utilisateur réelle. Clique pour débloquer tout.'
      : 'Real user experience. Click to unlock everything.';

  return (
    <button
      type="button"
      className={`dev-mode-toggle ${isActive ? 'is-dev' : 'is-prod'}`}
      onClick={toggle}
      title={hint}
      aria-pressed={isActive}
    >
      <span className="dev-mode-toggle__dot" aria-hidden="true" />
      <span className="dev-mode-toggle__label">{label}</span>
    </button>
  );
}
