import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import type { Language } from '../../i18n';

interface UserProfileProps {
  language: Language;
  onOpenLogin: () => void;
  onOpenSettings: () => void;
}

export default function UserProfile({ language, onOpenLogin, onOpenSettings }: UserProfileProps) {
  const { user, signOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

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
      <button className="user-profile-button" onClick={() => setShowMenu(!showMenu)}>
        {photoURL ? (
          <img src={photoURL} alt={displayName} className="user-avatar" />
        ) : (
          <div className="user-avatar-placeholder">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="user-name">{displayName}</span>
      </button>

      {showMenu && (
        <div className="user-menu">
          <div className="user-menu-header">
            <div className="user-menu-name">{displayName}</div>
            <div className="user-menu-email">{user.email}</div>
          </div>
          <div className="user-menu-divider" />
          <button className="user-menu-item" onClick={() => { setShowMenu(false); onOpenSettings(); }}>
            <span>⚙️</span>
            {language === 'fr' ? 'Paramètres' : 'Settings'}
          </button>
          <button className="user-menu-item" onClick={signOut}>
            <span>🚪</span>
            {language === 'fr' ? 'Se déconnecter' : 'Sign Out'}
          </button>
        </div>
      )}
    </div>
  );
}
