import { useAuth } from '../../contexts/AuthContext';
import type { Language } from '../../i18n';

interface UserProfileProps {
  language: Language;
  onOpenLogin: () => void;
  /** V9.12 — clic sur le nom → page profil. (Anciennement dropdown Réglages/Déconnexion.) */
  onOpenProfile: () => void;
}

/**
 * UserProfile (sidebar footer)
 * ----------------------------
 * Avant V9.12 : ouvrait un dropdown Réglages / Déconnexion.
 * Depuis V9.12 : le clic ouvre directement la page Profil, dans l'esprit
 * Seonsaengnim. Les actions Réglages / Déconnexion sont désormais accessibles
 * via la sidebar secondaire et la page Profil elle-même.
 */
export default function UserProfile({
  language,
  onOpenLogin,
  onOpenProfile
}: UserProfileProps) {
  const { user } = useAuth();

  if (!user) {
    return (
      <button className="btn-signin" onClick={onOpenLogin}>
        {language === 'fr' ? 'Se connecter' : 'Sign In'}
      </button>
    );
  }

  const displayName = user.displayName || user.email?.split('@')[0] || 'User';
  const photoURL = user.photoURL;

  return (
    <div className="user-profile">
      <button
        className="user-profile-button"
        onClick={onOpenProfile}
        title={language === 'fr' ? 'Voir mon profil' : 'View my profile'}
      >
        {photoURL ? (
          <img src={photoURL} alt={displayName} className="user-avatar" />
        ) : (
          <div className="user-avatar-placeholder">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="user-name">{displayName}</span>
      </button>
    </div>
  );
}
