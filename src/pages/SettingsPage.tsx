import { useState, useRef } from 'react';
import type { Language } from '../i18n';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

interface SettingsPageProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const colorThemes = [
  {
    id: 'asian-red',
    name: 'Rouge Asiatique',
    nameEn: 'Asian Red',
    primary: '#D8483E',
    secondary: '#2F9D8A',
    accent: '#F0B762'
  },
  {
    id: 'jade-green',
    name: 'Jade Impérial',
    nameEn: 'Imperial Jade',
    primary: '#2F9D8A',
    secondary: '#D8483E',
    accent: '#F4A261'
  },
  {
    id: 'royal-purple',
    name: 'Pourpre Royal',
    nameEn: 'Royal Purple',
    primary: '#8B5CF6',
    secondary: '#EC4899',
    accent: '#F59E0B'
  },
  {
    id: 'ocean-blue',
    name: 'Bleu Océan',
    nameEn: 'Ocean Blue',
    primary: '#3B82F6',
    secondary: '#06B6D4',
    accent: '#10B981'
  },
  {
    id: 'sunset-orange',
    name: 'Orange Coucher de Soleil',
    nameEn: 'Sunset Orange',
    primary: '#F97316',
    secondary: '#EF4444',
    accent: '#FBBF24'
  },
  {
    id: 'sakura-pink',
    name: 'Rose Sakura',
    nameEn: 'Sakura Pink',
    primary: '#EC4899',
    secondary: '#F472B6',
    accent: '#FDE047'
  }
];

const SettingsPage = ({ language, onLanguageChange, currentTheme, onThemeChange }: SettingsPageProps) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [offlineMode, setOfflineMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const activeThemeInfo = colorThemes.find((theme) => theme.id === currentTheme);

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const photoURL = user?.photoURL;
  const userInitial = displayName.charAt(0).toUpperCase();

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Vérifier que c'est une image
    if (!file.type.startsWith('image/')) {
      alert(language === 'fr' ? 'Veuillez sélectionner une image' : 'Please select an image');
      return;
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert(language === 'fr' ? 'L\'image doit faire moins de 5MB' : 'Image must be less than 5MB');
      return;
    }

    try {
      setUploading(true);

      // Upload vers Firebase Storage
      const storageRef = ref(storage, `profile-photos/${user.uid}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);

      // Récupérer l'URL
      const downloadURL = await getDownloadURL(storageRef);

      // Mettre à jour le profil
      await updateProfile(user, {
        photoURL: downloadURL
      });

      // Rafraîchir la page pour afficher la nouvelle photo
      window.location.reload();
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert(language === 'fr' ? 'Erreur lors de l\'upload de la photo' : 'Error uploading photo');
    } finally {
      setUploading(false);
    }
  };

  const handleResetProgress = () => {
    // Effacer toutes les données de progression du localStorage
    const keysToRemove = [
      'flashcard_progress',
      'lesson-progress-index',
      'learned-lessons',
      'daily-minutes',
      'total-minutes',
      'learningStreak',
      'lastLearningDate',
      'completedLessons',
      'review-srs-state',
      'customLists',
      'lastVisitDate'
    ];

    keysToRemove.forEach(key => {
      window.localStorage.removeItem(key);
    });

    // Fermer la modale de confirmation
    setShowResetConfirm(false);

    // Recharger la page pour appliquer les changements
    window.location.reload();
  };
  const quickStats = [
    {
      label: language === 'fr' ? 'Mode' : 'Mode',
      value: offlineMode ? (language === 'fr' ? 'Hors-ligne' : 'Offline ready') : (language === 'fr' ? 'En ligne' : 'Online only')
    },
    {
      label: language === 'fr' ? 'Notifications' : 'Notifications',
      value: notificationsEnabled ? (language === 'fr' ? 'Activées' : 'Enabled') : (language === 'fr' ? 'Désactivées' : 'Muted')
    },
    {
      label: language === 'fr' ? 'Thème' : 'Theme',
      value: language === 'fr' ? activeThemeInfo?.name ?? 'Rouge Asiatique' : activeThemeInfo?.nameEn ?? 'Asian Red'
    }
  ];

  return (
    <div className="settings-page">
      <header className="settings-header">
        <h1 className="page-title">{language === 'fr' ? 'Paramètres' : 'Settings'}</h1>
        <p className="page-subtitle">
          {language === 'fr'
            ? 'Personnalisez votre expérience d\'apprentissage'
            : 'Customize your learning experience'}
        </p>
      </header>

      <section className="settings-hero">
        <div className="settings-hero-card">
          <div className="profile-photo-container">
            {photoURL ? (
              <img src={photoURL} alt={displayName} className="user-avatar-large" />
            ) : (
              <div className="user-avatar-large">{userInitial}</div>
            )}
            <button
              className="change-photo-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <span>⏳</span>
              ) : (
                <>
                  <span>📷</span>
                  <span className="change-photo-text">
                    {language === 'fr' ? 'Changer' : 'Change'}
                  </span>
                </>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
          </div>
          <div>
            <p className="user-name-large">{displayName}</p>
            <p className="user-email-text">{user?.email}</p>
            <p className="user-level-text">
              {language === 'fr' ? 'Niveau' : 'Level'} 0 · {language === 'fr' ? 'Progression HSK 3.0' : 'HSK 3.0 Progress'}
            </p>
          </div>
        </div>
        <div className="settings-hero-stats">
          {quickStats.map((stat) => (
            <div key={stat.label} className="settings-hero-stat">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="settings-section modern">
        <div className="settings-section-header">
          <h2 className="settings-section-title">
            {language === 'fr' ? 'Préférences générales' : 'General preferences'}
          </h2>
          <p className="settings-section-description">
            {language === 'fr'
              ? 'Ajustez la langue et vos préférences d\'utilisation.'
              : 'Adjust the language and usage preferences.'}
          </p>
        </div>

        <div className="settings-card-grid">
          <div className="settings-card settings-card-wide">
            <div className="settings-card-header">
              <h3>{language === 'fr' ? 'Langue de l\'interface' : 'Interface language'}</h3>
              <p>
                {language === 'fr'
                  ? 'Choisissez la langue d\'affichage de XiaoLearn.'
                  : 'Choose XiaoLearn’s display language.'}
              </p>
            </div>
            <LanguageSwitcher value={language} onChange={onLanguageChange} />
          </div>

          <div className="settings-card">
            <div className="settings-card-header">
              <h3>{language === 'fr' ? 'Mode hors ligne' : 'Offline mode'}</h3>
              <p>
                {language === 'fr'
                  ? 'Précharge les données pour réviser sans connexion.'
                  : 'Preload data to review without a connection.'}
              </p>
            </div>
            <button
              type="button"
              className={`settings-toggle ${offlineMode ? 'on' : 'off'}`}
              onClick={() => setOfflineMode((prev) => !prev)}
            >
              <span>{offlineMode ? (language === 'fr' ? 'Activé' : 'Enabled') : (language === 'fr' ? 'Désactivé' : 'Disabled')}</span>
              <span className="toggle-pill">
                <span />
              </span>
            </button>
          </div>

          <div className="settings-card">
            <div className="settings-card-header">
              <h3>{language === 'fr' ? 'Notifications' : 'Notifications'}</h3>
              <p>
                {language === 'fr'
                  ? 'Rappels pour les révisions et leçons quotidiennes.'
                  : 'Reminders for reviews and daily lessons.'}
              </p>
            </div>
            <button
              type="button"
              className={`settings-toggle ${notificationsEnabled ? 'on' : 'off'}`}
              onClick={() => setNotificationsEnabled((prev) => !prev)}
            >
              <span>
                {notificationsEnabled
                  ? language === 'fr'
                    ? 'Activées'
                    : 'Enabled'
                  : language === 'fr'
                  ? 'Désactivées'
                  : 'Muted'}
              </span>
              <span className="toggle-pill">
                <span />
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="settings-section modern">
        <div className="settings-section-header">
          <h2 className="settings-section-title">
            {language === 'fr' ? 'Thème de couleurs' : 'Color theme'}
          </h2>
          <p className="settings-section-description">
            {language === 'fr'
              ? 'Personnalisez l\'apparence de l\'application avec votre palette préférée.'
              : 'Personalize the interface with your preferred palette.'}
          </p>
        </div>

        <div className="theme-grid settings-theme-grid">
          {colorThemes.map((theme) => (
            <button
              key={theme.id}
              className={`theme-card ${currentTheme === theme.id ? 'active' : ''}`}
              onClick={() => onThemeChange(theme.id)}
            >
              <div className="theme-preview">
                <div className="theme-color" style={{ backgroundColor: theme.primary }} />
                <div className="theme-color" style={{ backgroundColor: theme.secondary }} />
                <div className="theme-color" style={{ backgroundColor: theme.accent }} />
              </div>
              <div className="theme-info">
                <p className="theme-name">{language === 'fr' ? theme.name : theme.nameEn}</p>
                {currentTheme === theme.id && (
                  <span className="theme-active-badge">
                    ✓ {language === 'fr' ? 'Actif' : 'Active'}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="settings-section modern">
        <div className="settings-section-header">
          <h2 className="settings-section-title">
            {language === 'fr' ? 'Zone de danger' : 'Danger zone'}
          </h2>
          <p className="settings-section-description">
            {language === 'fr'
              ? 'Actions irréversibles sur vos données d\'apprentissage.'
              : 'Irreversible actions on your learning data.'}
          </p>
        </div>

        <div className="settings-card-grid">
          <div className="settings-card settings-card-wide danger-card">
            <div className="settings-card-header">
              <h3>{language === 'fr' ? 'Réinitialiser la progression' : 'Reset progress'}</h3>
              <p>
                {language === 'fr'
                  ? 'Supprime toutes vos données de progression (leçons complétées, révisions SRS, statistiques). Cette action est irréversible.'
                  : 'Deletes all your progress data (completed lessons, SRS reviews, statistics). This action is irreversible.'}
              </p>
            </div>
            <button
              type="button"
              className="btn-danger"
              onClick={() => setShowResetConfirm(true)}
            >
              {language === 'fr' ? 'Réinitialiser' : 'Reset'}
            </button>
          </div>
        </div>
      </section>

      {showResetConfirm && (
        <div className="modal-overlay" onClick={() => setShowResetConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {language === 'fr' ? 'Confirmer la réinitialisation' : 'Confirm reset'}
            </h2>
            <p className="modal-description">
              {language === 'fr'
                ? 'Êtes-vous sûr de vouloir réinitialiser toute votre progression ? Toutes vos leçons complétées, révisions et statistiques seront définitivement supprimées.'
                : 'Are you sure you want to reset all your progress? All your completed lessons, reviews and statistics will be permanently deleted.'}
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowResetConfirm(false)}
              >
                {language === 'fr' ? 'Annuler' : 'Cancel'}
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={handleResetProgress}
              >
                {language === 'fr' ? 'Oui, réinitialiser' : 'Yes, reset'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
