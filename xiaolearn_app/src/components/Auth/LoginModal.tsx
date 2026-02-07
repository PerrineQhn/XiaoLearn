import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import type { Language } from '../../i18n';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export default function LoginModal({ isOpen, onClose, language }: LoginModalProps) {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      setError(
        language === 'fr'
          ? 'Erreur lors de la connexion avec Google'
          : 'Error signing in with Google'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
      onClose();
    } catch (err: any) {
      let errorMessage = '';
      if (err.code === 'auth/user-not-found') {
        errorMessage = language === 'fr' ? 'Utilisateur non trouvé' : 'User not found';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = language === 'fr' ? 'Mot de passe incorrect' : 'Wrong password';
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = language === 'fr' ? 'Email déjà utilisé' : 'Email already in use';
      } else if (err.code === 'auth/weak-password') {
        errorMessage =
          language === 'fr'
            ? 'Mot de passe trop faible (min. 6 caractères)'
            : 'Password too weak (min. 6 characters)';
      } else {
        errorMessage =
          language === 'fr' ? 'Erreur lors de la connexion' : 'Error during authentication';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2 className="auth-title">
          {mode === 'login'
            ? language === 'fr'
              ? 'Connexion'
              : 'Sign In'
            : language === 'fr'
            ? 'Inscription'
            : 'Sign Up'}
        </h2>

        <p className="auth-subtitle">
          {language === 'fr'
            ? 'Synchronisez votre progression sur tous vos appareils'
            : 'Sync your progress across all your devices'}
        </p>

        {error && <div className="auth-error">{error}</div>}

        <button className="btn-google" onClick={handleGoogleSignIn} disabled={loading}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path
              fill="#4285F4"
              d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"
            />
            <path
              fill="#34A853"
              d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"
            />
            <path
              fill="#FBBC05"
              d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"
            />
            <path
              fill="#EA4335"
              d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"
            />
          </svg>
          {language === 'fr' ? 'Continuer avec Google' : 'Continue with Google'}
        </button>

        <div className="auth-divider">
          <span>{language === 'fr' ? 'ou' : 'or'}</span>
        </div>

        <form onSubmit={handleEmailSubmit} className="auth-form">
          <div className="form-group">
            <label>{language === 'fr' ? 'Email' : 'Email'}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'fr' ? 'votre@email.com' : 'your@email.com'}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>{language === 'fr' ? 'Mot de passe' : 'Password'}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={language === 'fr' ? 'Minimum 6 caractères' : 'Minimum 6 characters'}
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading
              ? language === 'fr'
                ? 'Chargement...'
                : 'Loading...'
              : mode === 'login'
              ? language === 'fr'
                ? 'Se connecter'
                : 'Sign In'
              : language === 'fr'
              ? "S'inscrire"
              : 'Sign Up'}
          </button>
        </form>

        <p className="auth-switch">
          {mode === 'login'
            ? language === 'fr'
              ? "Pas encore de compte ? "
              : "Don't have an account? "
            : language === 'fr'
            ? 'Déjà un compte ? '
            : 'Already have an account? '}
          <button
            className="auth-switch-btn"
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError('');
            }}
            disabled={loading}
          >
            {mode === 'login'
              ? language === 'fr'
                ? "S'inscrire"
                : 'Sign Up'
              : language === 'fr'
              ? 'Se connecter'
              : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}
