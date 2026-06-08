/**
 * SettingsPage
 * ------------
 * V9.13 — Refonte layout 2 colonnes (nav verticale gauche + carte contenu à droite),
 * fidèle à Seonsaengnim (/dashboard/settings) mais coloris XiaoLearn.
 *
 * Onglets :
 *   - Compte          → Informations personnelles (avatar, pseudo, email, bio, localisation)
 *   - Abonnement      → Plan actuel + liste fonctionnalités
 *   - Notifications   → Toggles + sous-section Rappel quotidien (jours, heure, fuseau)
 *   - Langue          → Langue interface + langue d'apprentissage (disabled) + fuseau (auto)
 *   - Apprentissage   → Objectif quotidien (4 tuiles) + Affichage du chinois + Prof. Park + Révisions
 *   - Confidentialité → Visibilité & Interactions + Données personnelles
 *   - Zone de danger  → Réinitialiser progression + Supprimer compte
 */
import { useState, useRef } from 'react';
import type { Language } from '../i18n';
import { useAuth } from '../contexts/AuthContext';
import SyncDiagnosticPanel from '../components/SyncDiagnosticPanel';
import { storage, db } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';
import { doc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { useSrsPreferences } from '../hooks/useSrsPreferences';
import { useDailyGoals } from '../hooks/useDailyGoals';
import { useEmailPrefs } from '../hooks/useEmailPrefs';
import { useEntitlements } from '../hooks/useEntitlements';
import { useDevMode } from '../hooks/useDevMode';
import { buildAppAccess, applyDevMode } from '../utils/access';

type SettingsTab =
  | 'account'
  | 'subscription'
  | 'notifications'
  | 'language'
  | 'learning'
  | 'privacy'
  | 'danger';

interface SettingsPageProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onOpenSubscription?: () => void;
}

const BIO_MAX = 160;

/** Objectifs d'étude quotidiens (tuiles de l'onglet Apprentissage) */
const DAILY_GOALS = [
  { key: 'chill',    icon: '🌱', labelFr: 'Décontracté', labelEn: 'Relaxed',  min: 5  },
  { key: 'regular',  icon: '📖', labelFr: 'Régulier',    labelEn: 'Regular',  min: 15 },
  { key: 'intense',  icon: '🔥', labelFr: 'Intensif',    labelEn: 'Intense',  min: 30 },
  { key: 'extreme',  icon: '🚀', labelFr: 'Extrême',     labelEn: 'Extreme',  min: 60 }
] as const;
type DailyGoalKey = typeof DAILY_GOALS[number]['key'];

const WEEKDAY_KEYS_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const WEEKDAY_KEYS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Lecture persistée d'une clé locale (avec fallback) */
const readLS = (key: string, fallback = ''): string => {
  if (typeof window === 'undefined') return fallback;
  return window.localStorage.getItem(key) ?? fallback;
};

const SettingsPage = ({
  language,
  onLanguageChange,
  onOpenSubscription
}: SettingsPageProps) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Entitlements + accès : permet d'afficher le VRAI statut dynamiquement
  // (Gratuit / Trial 7j / Premium Mensuel / Premium Lifetime) plutôt qu'un
  // hardcoded "Premium Lifetime" trompeur. Mêmes calculs que dans App.tsx
  // pour rester cohérent (devMode forcé en lifetime quand activé).
  const { entitlements } = useEntitlements();
  const devMode = useDevMode();
  const appAccess = (() => {
    const base = buildAppAccess(user, entitlements?.app ?? null);
    return devMode.isActive ? applyDevMode(base) : base;
  })();
  const planTier = appAccess.tier; // 'free' | 'trial' | 'premium'
  const isLifetime = appAccess.isLifetime;

  // --- Onglet actif -------------------------------------------------
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');

  // --- SRS (persisté via hook) --------------------------------------
  const { preferences: srsPrefs, setCustomDailyNewCards } = useSrsPreferences();
  const dailyGoalsHook = useDailyGoals();

  // --- Email preferences (Firestore sync) ---------------------------
  const { prefs: emailPrefs, update: updateEmailPrefs, syncState: emailSyncState } =
    useEmailPrefs(language === 'en' ? 'en' : 'fr');

  // --- Compte -------------------------------------------------------
  const [uploading, setUploading] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [resetPwMsg, setResetPwMsg] = useState<string | null>(null);
  const initialName = user?.displayName || user?.email?.split('@')[0] || '';
  const [displayNameInput, setDisplayNameInput] = useState(initialName);
  const [bio, setBio] = useState<string>(() => readLS('xl_profile_bio_v1'));
  const [location, setLocation] = useState<string>(() => readLS('xl_profile_location_v1'));

  // --- Notifications (persistées localement, côté backend plus tard) -----
  const [notifMessages, setNotifMessages] = useState(() => readLS('xl_notif_messages_v1', '1') === '1');
  const [notifBattles, setNotifBattles] = useState(() => readLS('xl_notif_battles_v1', '1') === '1');
  const [notifBoard, setNotifBoard] = useState(() => readLS('xl_notif_board_v1', '1') === '1');
  const [notifDaily, setNotifDaily] = useState(() => readLS('xl_notif_daily_v1', '1') === '1');
  const [notifContent, setNotifContent] = useState(() => readLS('xl_notif_content_v1', '0') === '1');
  const [notifLeaderboard, setNotifLeaderboard] = useState(() => readLS('xl_notif_leaderboard_v1', '0') === '1');
  const [notifMarketing, setNotifMarketing] = useState(() => readLS('xl_notif_marketing_v1', '0') === '1');
  const [reminderDays, setReminderDays] = useState<Set<number>>(() => {
    const raw = readLS('xl_reminder_days_v1', '0,1,2,3,4,5,6');
    return new Set(raw.split(',').filter((x) => x).map((x) => parseInt(x, 10)));
  });
  const [reminderTime, setReminderTime] = useState(() => readLS('xl_reminder_time_v1', '19:00'));

  // --- Apprentissage (persistées localement) -------------------------
  const [dailyGoal, setDailyGoal] = useState<DailyGoalKey>(() => {
    const raw = readLS('xl_daily_goal_v1', 'regular') as DailyGoalKey;
    return (['chill', 'regular', 'intense', 'extreme'] as const).includes(raw) ? raw : 'regular';
  });
  const [showPinyin, setShowPinyin] = useState(() => readLS('xl_show_pinyin_v1', '1') === '1');
  const [autoPlayAudio, setAutoPlayAudio] = useState(() => readLS('xl_auto_audio_v1', '0') === '1');
  const [parkLanguage, setParkLanguage] = useState<Language>(() => (readLS('xl_park_lang_v1', language) as Language) || language);
  const [parkDetail, setParkDetail] = useState<'concise' | 'normal' | 'detailed'>(() => {
    const raw = readLS('xl_park_detail_v1', 'detailed') as 'concise' | 'normal' | 'detailed';
    return (['concise', 'normal', 'detailed'] as const).includes(raw) ? raw : 'detailed';
  });

  // --- Confidentialité ------------------------------------------------
  const [privPublic, setPrivPublic] = useState(() => readLS('xl_priv_public_v1', '1') === '1');
  const [privLeaderboard, setPrivLeaderboard] = useState(() => readLS('xl_priv_leaderboard_v1', '1') === '1');
  const [privActivity, setPrivActivity] = useState(() => readLS('xl_priv_activity_v1', '0') === '1');
  const [privChallenges, setPrivChallenges] = useState(() => readLS('xl_priv_challenges_v1', '1') === '1');
  const [privNonFriends, setPrivNonFriends] = useState(() => readLS('xl_priv_nonfriends_v1', '0') === '1');

  // --- Reset ---------------------------------------------------------
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const photoURL = user?.photoURL;
  const userInitial = displayName.charAt(0).toUpperCase();
  const username = (user?.email?.split('@')[0] || 'xiao').toLowerCase();

  // Fuseau détecté automatiquement
  const detectedTz = (() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Paris';
    } catch {
      return 'Europe/Paris';
    }
  })();

  // Date "Membre depuis" formatée
  const memberSinceLong = (() => {
    const dateStr = user?.metadata?.creationTime;
    if (!dateStr) return language === 'fr' ? 'récemment' : 'recently';
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return language === 'fr' ? 'récemment' : 'recently';
    return d.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  })();

  // --- Handlers -----------------------------------------------------
  const persistBool = (key: string, v: boolean) => window.localStorage.setItem(key, v ? '1' : '0');
  const persistStr = (key: string, v: string) => window.localStorage.setItem(key, v);

  const toggleReminderDay = (dayIdx: number) => {
    setReminderDays((prev) => {
      const next = new Set(prev);
      if (next.has(dayIdx)) next.delete(dayIdx); else next.add(dayIdx);
      window.localStorage.setItem('xl_reminder_days_v1', Array.from(next).sort().join(','));
      return next;
    });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (!file.type.startsWith('image/')) {
      alert(language === 'fr' ? 'Veuillez sélectionner une image' : 'Please select an image');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert(language === 'fr' ? "L'image doit faire moins de 5MB" : 'Image must be less than 5MB');
      return;
    }
    try {
      setUploading(true);
      const storageRef = ref(storage, `profile-photos/${user.uid}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      await updateProfile(user, { photoURL: downloadURL });
      window.location.reload();
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert(language === 'fr' ? "Erreur lors de l'upload de la photo" : 'Error uploading photo');
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!user) return;
    if (!window.confirm(language === 'fr' ? 'Supprimer la photo de profil ?' : 'Remove profile photo?')) return;
    try {
      await updateProfile(user, { photoURL: '' });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      setSavingProfile(true);
      if (displayNameInput && displayNameInput !== user.displayName) {
        await updateProfile(user, { displayName: displayNameInput });
      }
      window.localStorage.setItem('xl_profile_bio_v1', bio);
      window.localStorage.setItem('xl_profile_location_v1', location);
      alert(language === 'fr' ? 'Profil sauvegardé.' : 'Profile saved.');
    } catch (err) {
      console.error(err);
      alert(language === 'fr' ? 'Impossible de sauvegarder.' : 'Could not save.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSendPasswordReset = async () => {
    if (!user?.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      setResetPwMsg(
        language === 'fr' ? 'Email de réinitialisation envoyé.' : 'Password reset email sent.'
      );
    } catch (err) {
      console.error(err);
      setResetPwMsg(language === 'fr' ? "Erreur à l'envoi de l'email." : 'Error sending email.');
    }
  };

  const handleSaveNotifications = () => {
    persistBool('xl_notif_messages_v1', notifMessages);
    persistBool('xl_notif_battles_v1', notifBattles);
    persistBool('xl_notif_board_v1', notifBoard);
    persistBool('xl_notif_daily_v1', notifDaily);
    persistBool('xl_notif_content_v1', notifContent);
    persistBool('xl_notif_leaderboard_v1', notifLeaderboard);
    persistBool('xl_notif_marketing_v1', notifMarketing);
    persistStr('xl_reminder_time_v1', reminderTime);
    alert(language === 'fr' ? 'Préférences sauvegardées.' : 'Preferences saved.');
  };

  const handleSaveLearning = () => {
    persistStr('xl_daily_goal_v1', dailyGoal);
    persistBool('xl_show_pinyin_v1', showPinyin);
    persistBool('xl_auto_audio_v1', autoPlayAudio);
    persistStr('xl_park_lang_v1', parkLanguage);
    persistStr('xl_park_detail_v1', parkDetail);
    alert(language === 'fr' ? 'Préférences sauvegardées.' : 'Preferences saved.');
  };

  const handleSavePrivacy = () => {
    persistBool('xl_priv_public_v1', privPublic);
    persistBool('xl_priv_leaderboard_v1', privLeaderboard);
    persistBool('xl_priv_activity_v1', privActivity);
    persistBool('xl_priv_challenges_v1', privChallenges);
    persistBool('xl_priv_nonfriends_v1', privNonFriends);
    alert(language === 'fr' ? 'Préférences sauvegardées.' : 'Preferences saved.');
  };

  const handleExportData = () => {
    const data: Record<string, string | null> = {};
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith('xl_')) data[k] = window.localStorage.getItem(k);
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `xiaolearn-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /** Préfixes des clés localStorage qui stockent de la progression user.
   *  Toute clé matchant ces préfixes sera purgée. Cohérent avec l'util
   *  utilisé dans AuthContext pour la séparation des comptes. */
  const PROGRESSION_KEY_PREFIXES = ['cl_', 'xl_'];

  /** Sous-collections/docs Firestore à supprimer sous users/{uid}/.
   *  ⚠ La sous-collection 'entitlements' / 'subscription' est PRÉSERVÉE
   *  pour ne pas perdre l'abonnement Premium. */
  const RESET_FIRESTORE_DOCS = [
    'cl_completed_lessons',
    'cl_personal_flashcards_v7',
    'cl_lesson_mastery_v7',
    'cl_learning_stats_v1',
    'cl_word_srs_v3',
    'cl_flashcard_srs_v2',
    'xl_xp_v2',
    'xl_streak_v2',
    'xl_activity_v2',
    'xl_level_bilans_v1',
    'xl_lesson_progress_v1',
    'xl_chat_conversations',
    'xl_my_errors_v1'
  ];

  const handleResetProgress = async () => {
    setShowResetConfirm(false);
    try {
      // 1) Purge localStorage : toutes les clés cl_*/xl_* qui contiennent
      //    de la progression. Préserve les prefs UI globales (thème, etc.)
      const localKeys: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (!key) continue;
        if (PROGRESSION_KEY_PREFIXES.some((p) => key.startsWith(p))) {
          localKeys.push(key);
        }
      }
      localKeys.forEach((key) => {
        try { window.localStorage.removeItem(key); } catch { /* ignore */ }
      });

      // 2) Delete des docs Firestore de progression — sous users/{uid}/.
      //    On NE TOUCHE PAS à entitlements/subscription pour préserver l'abonnement.
      const uid = auth.currentUser?.uid;
      if (uid) {
        await Promise.allSettled(
          RESET_FIRESTORE_DOCS.map((docId) =>
            deleteDoc(doc(db, 'users', uid, 'data', docId))
          )
        );
        // Best-effort : vide aussi la sous-collection 'notifications'
        // s'il y en a (toasts non-acknowledged, etc.). Erreurs ignorées
        // car la collection peut ne pas exister.
        try {
          const notifSnap = await getDocs(collection(db, 'users', uid, 'notifications'));
          await Promise.allSettled(
            notifSnap.docs.map((d) => deleteDoc(d.ref))
          );
        } catch { /* ignore */ }
      }
    } finally {
      // Reload pour repartir avec un état propre (les hooks refont leurs
      // queries initiales sur des collections vides).
      window.location.reload();
    }
  };

  const handleDeleteAccount = async () => {
    alert(
      language === 'fr'
        ? "La suppression de compte n'est pas encore disponible. Contacte le support."
        : 'Account deletion is not available yet. Please contact support.'
    );
    setShowDeleteConfirm(false);
  };

  // --- Définition des onglets ---------------------------------------
  // `iconPng` est un fichier PNG dans /public/icons (prioritaire) et `fallback` est
  // l'emoji affiché si l'image ne charge pas.
  const tabs: { id: SettingsTab; label: string; iconPng: string; fallback: string; danger?: boolean }[] = [
    { id: 'account',       label: language === 'fr' ? 'Compte' : 'Account',              iconPng: 'user.png',             fallback: '👤' },
    { id: 'subscription',  label: language === 'fr' ? 'Abonnement' : 'Subscription',     iconPng: 'credit-card.png',      fallback: '💳' },
    { id: 'notifications', label: language === 'fr' ? 'Notifications' : 'Notifications', iconPng: 'bell.png',             fallback: '🔔' },
    { id: 'language',      label: language === 'fr' ? 'Langue' : 'Language',             iconPng: 'language.png',         fallback: '🌐' },
    { id: 'learning',      label: language === 'fr' ? 'Apprentissage' : 'Learning',      iconPng: 'learning.png',         fallback: '🎓' },
    { id: 'privacy',       label: language === 'fr' ? 'Confidentialité' : 'Privacy',     iconPng: 'confidentiality.png',  fallback: '🛡️' },
    { id: 'danger',        label: language === 'fr' ? 'Zone de danger' : 'Danger zone',  iconPng: 'danger.png',           fallback: '⚠️', danger: true }
  ];

  const weekdayLabels = language === 'fr' ? WEEKDAY_KEYS_FR : WEEKDAY_KEYS_EN;

  /** Rendu d'un toggle switch compact pour les lignes de notifications / confidentialité */
  const renderRowToggle = (
    title: string,
    desc: string,
    value: boolean,
    setValue: (v: boolean) => void
  ) => (
    <div className="settings-row">
      <div className="settings-row-text">
        <div className="settings-row-title">{title}</div>
        <div className="settings-row-desc">{desc}</div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        className={`settings-switch ${value ? 'settings-switch--on' : ''}`}
        onClick={() => setValue(!value)}
      >
        <span className="settings-switch-knob" />
      </button>
    </div>
  );

  return (
    <div className="settings-page settings-page--v9">
      <header className="settings-header">
        <h1 className="page-title">{language === 'fr' ? 'Paramètres' : 'Settings'}</h1>
        <p className="page-subtitle">
          {language === 'fr'
            ? 'Gère ton compte, tes préférences et ton abonnement.'
            : 'Manage your account, preferences and subscription.'}
        </p>
      </header>

      <div className="settings-layout">
        {/* --------------------------- NAV VERTICALE -------------------------- */}
        <nav className="settings-nav" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`settings-nav-btn ${activeTab === tab.id ? 'settings-nav-btn--active' : ''} ${
                tab.danger ? 'settings-nav-btn--danger' : ''
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="settings-nav-icon" aria-hidden>
                <img
                  src={`/icons/${tab.iconPng}`}
                  alt=""
                  loading="lazy"
                  draggable="false"
                  onError={(event) => {
                    (event.currentTarget as HTMLImageElement).style.display = 'none';
                    (event.currentTarget.parentElement ?? event.currentTarget).textContent = tab.fallback;
                  }}
                />
              </span>
              <span className="settings-nav-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* --------------------------- CONTENU -------------------------- */}
        <main className="settings-content">
          {/* ================== COMPTE ================== */}
          {activeTab === 'account' && (
            <section className="settings-card-v9">
              <h2 className="settings-card-title">
                {language === 'fr' ? 'Informations personnelles' : 'Personal information'}
              </h2>
              <div className="settings-card-divider" />

              <div className="settings-avatar-row">
                {photoURL ? (
                  <img src={photoURL} alt={displayName} className="settings-avatar-big" />
                ) : (
                  <div className="settings-avatar-big settings-avatar-big--placeholder">
                    {userInitial}
                  </div>
                )}
                <div className="settings-avatar-actions">
                  <button
                    type="button"
                    className="btn-outline-dark"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading
                      ? language === 'fr' ? 'Envoi…' : 'Uploading…'
                      : language === 'fr' ? "Changer l'avatar" : 'Change avatar'}
                  </button>
                  {photoURL && (
                    <button type="button" className="btn-text-danger" onClick={handleRemovePhoto}>
                      {language === 'fr' ? 'Supprimer la photo' : 'Remove photo'}
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>

              <div className="settings-grid-2">
                <label className="settings-field-v9">
                  <span className="settings-field-label-v9">
                    {language === 'fr' ? 'Pseudo' : 'Display name'}
                  </span>
                  <input
                    type="text"
                    className="settings-input-v9"
                    value={displayNameInput}
                    onChange={(e) => setDisplayNameInput(e.target.value)}
                    maxLength={40}
                  />
                </label>
                <label className="settings-field-v9">
                  <span className="settings-field-label-v9">
                    {language === 'fr' ? "Nom d'utilisateur" : 'Username'}
                  </span>
                  <input
                    type="text"
                    className="settings-input-v9"
                    value={`@${username}`}
                    disabled
                  />
                </label>
              </div>

              <label className="settings-field-v9">
                <span className="settings-field-label-v9">Email</span>
                <div className="settings-email-row-v9">
                  <input
                    type="email"
                    className="settings-input-v9"
                    value={user?.email || ''}
                    disabled
                  />
                  <span className="settings-verified-badge-v9">
                    ✓ {language === 'fr' ? 'Vérifié' : 'Verified'}
                  </span>
                </div>
              </label>

              <label className="settings-field-v9">
                <div className="settings-field-label-row">
                  <span className="settings-field-label-v9">Bio</span>
                  <span className="settings-field-counter-v9">
                    {bio.length}/{BIO_MAX}
                  </span>
                </div>
                <textarea
                  className="settings-textarea-v9"
                  value={bio}
                  maxLength={BIO_MAX}
                  rows={4}
                  placeholder={language === 'fr' ? 'Parle-nous un peu de toi...' : 'Tell us a bit about yourself...'}
                  onChange={(e) => setBio(e.target.value.slice(0, BIO_MAX))}
                />
              </label>

              <label className="settings-field-v9">
                <span className="settings-field-label-v9">
                  {language === 'fr' ? 'Localisation' : 'Location'}
                </span>
                <div className="settings-input-wrap-icon">
                  <span className="settings-input-icon" aria-hidden>📍</span>
                  <input
                    type="text"
                    className="settings-input-v9 settings-input-v9--iconned"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={language === 'fr' ? 'Ex: Paris, France' : 'Ex: Paris, France'}
                  />
                </div>
              </label>

              <div className="settings-card-actions">
                <button
                  type="button"
                  className="btn-save-dark"
                  onClick={handleSaveProfile}
                  disabled={savingProfile}
                >
                  {savingProfile
                    ? language === 'fr' ? 'Enregistrement…' : 'Saving…'
                    : language === 'fr' ? 'Sauvegarder' : 'Save'}
                </button>
              </div>

              <div className="settings-sub-card">
                <div className="settings-sub-card-head">
                  <h3>{language === 'fr' ? 'Sécurité' : 'Security'}</h3>
                  <p>
                    {language === 'fr'
                      ? 'Reçois un email pour réinitialiser ton mot de passe.'
                      : 'Receive an email to reset your password.'}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-outline-dark"
                  onClick={handleSendPasswordReset}
                  disabled={!user?.email}
                >
                  {language === 'fr' ? "Envoyer l'email" : 'Send email'}
                </button>
                {resetPwMsg && <p className="settings-inline-msg">{resetPwMsg}</p>}
              </div>

              {/* Diagnostic + force-sync entre appareils. À utiliser quand
                  la progression n'est pas la même sur iPad/ordi/téléphone. */}
              <SyncDiagnosticPanel language={language} />
            </section>
          )}

          {/* ================== ABONNEMENT ================== */}
          {activeTab === 'subscription' && (() => {
            // Calcul dynamique du badge + features selon le VRAI statut de
            // l'utilisateur. Plus de hardcoded "Premium Lifetime" pour tout
            // le monde — chacun voit son plan réel.
            //
            // Mapping tier → badge :
            //   - free      → Gratuit (gris)
            //   - trial     → Essai 7 jours (jaune)
            //   - premium + isLifetime → Premium Lifetime (or)
            //   - premium + !isLifetime → Premium Mensuel (rouge XiaoLearn)
            type PlanInfo = {
              badge: string;
              icon: string;
              sideTitle: string;
              sideDesc: string;
              features: string[];
            };

            const planInfo: PlanInfo = (() => {
              if (planTier === 'premium' && isLifetime) {
                return {
                  badge: language === 'fr' ? 'Premium Lifetime' : 'Premium Lifetime',
                  icon: '👑',
                  sideTitle: language === 'fr' ? 'Accès illimité à vie' : 'Unlimited lifetime access',
                  sideDesc: language === 'fr' ? 'Aucun renouvellement requis' : 'No renewal required',
                  features:
                    language === 'fr'
                      ? [
                          'Tous les cours A1 → C2',
                          'Flashcards SRS illimitées',
                          'Prof. Xiao IA 24/7',
                          'Dictionnaire HSK complet',
                          'Sync entre appareils',
                          'Simulateur de situations',
                          'Créer ses propres flashcards',
                          'Toutes les futures features incluses'
                        ]
                      : [
                          'All A1 → C2 courses',
                          'Unlimited SRS flashcards',
                          'Prof. Xiao AI 24/7',
                          'Full HSK dictionary',
                          'Cross-device sync',
                          'Situation Simulator',
                          'Create your own flashcards',
                          'All future features included'
                        ]
                };
              }
              if (planTier === 'premium') {
                return {
                  badge: language === 'fr' ? 'Premium Mensuel' : 'Premium Monthly',
                  icon: '⭐',
                  sideTitle: language === 'fr' ? 'Accès complet' : 'Full access',
                  sideDesc: language === 'fr' ? 'Renouvellement mensuel' : 'Monthly renewal',
                  features:
                    language === 'fr'
                      ? [
                          'Tous les cours A1 → C2',
                          'Flashcards SRS illimitées',
                          'Prof. Xiao IA 24/7',
                          'Dictionnaire HSK complet',
                          'Sync entre appareils'
                        ]
                      : [
                          'All A1 → C2 courses',
                          'Unlimited SRS flashcards',
                          'Prof. Xiao AI 24/7',
                          'Full HSK dictionary',
                          'Cross-device sync'
                        ]
                };
              }
              if (planTier === 'trial') {
                return {
                  badge: language === 'fr' ? 'Essai gratuit' : 'Free trial',
                  icon: '🎁',
                  sideTitle:
                    language === 'fr'
                      ? `${appAccess.trialDaysLeft} jour${appAccess.trialDaysLeft > 1 ? 's' : ''} restant${appAccess.trialDaysLeft > 1 ? 's' : ''}`
                      : `${appAccess.trialDaysLeft} day${appAccess.trialDaysLeft > 1 ? 's' : ''} left`,
                  sideDesc:
                    language === 'fr'
                      ? "Accès complet pendant l'essai"
                      : 'Full access during trial',
                  features:
                    language === 'fr'
                      ? [
                          'Accès Premium temporaire',
                          'Prof. Xiao IA 24/7',
                          'Flashcards SRS illimitées',
                          'Tous les cours pendant 7 jours'
                        ]
                      : [
                          'Temporary Premium access',
                          'Prof. Xiao AI 24/7',
                          'Unlimited SRS flashcards',
                          'All courses for 7 days'
                        ]
                };
              }
              // Free
              return {
                badge: language === 'fr' ? 'Gratuit' : 'Free',
                icon: '🌱',
                sideTitle:
                  language === 'fr' ? 'Accès limité' : 'Limited access',
                sideDesc:
                  language === 'fr'
                    ? 'Passe en Premium pour tout débloquer'
                    : 'Upgrade to Premium to unlock everything',
                features:
                  language === 'fr'
                    ? [
                        'Niveau A1 complet (toutes les leçons HSK 1)',
                        `${appAccess.flashcardDailyNewLimit} nouvelles cartes par jour`,
                        `${appAccess.reviewItemLimit ?? '?'} mots en révision`,
                        'Communauté en lecture seule'
                      ]
                    : [
                        'Full A1 level (all HSK 1 lessons)',
                        `${appAccess.flashcardDailyNewLimit} new cards per day`,
                        `${appAccess.reviewItemLimit ?? '?'} words in review`,
                        'Community read-only'
                      ]
              };
            })();

            const planClass =
              planTier === 'premium' && isLifetime
                ? 'is-lifetime'
                : planTier === 'premium'
                ? 'is-monthly'
                : planTier === 'trial'
                ? 'is-trial'
                : 'is-free';

            return (
              <section className={`settings-card-v9 settings-sub-plan-card ${planClass}`}>
                <div className="settings-sub-plan-top">
                  <span className="settings-plan-pill">
                    <span aria-hidden>{planInfo.icon}</span> {planInfo.badge}
                  </span>
                  <div className="settings-sub-plan-side">
                    <div className="settings-sub-plan-side-title">{planInfo.sideTitle}</div>
                    <div className="settings-sub-plan-side-desc">{planInfo.sideDesc}</div>
                  </div>
                </div>

                <h2 className="settings-card-title">
                  {language === 'fr' ? 'Plan Actuel' : 'Current plan'}
                </h2>
                <p className="settings-card-subtitle">
                  {language === 'fr' ? `Membre depuis ${memberSinceLong}` : `Member since ${memberSinceLong}`}
                </p>

                <div className="settings-card-divider" />

                <div className="settings-plan-grid">
                  {planInfo.features.map((item) => (
                    <div key={item} className="settings-plan-feature">
                      <span className="settings-plan-check" aria-hidden>✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {onOpenSubscription && (
                  <div className="settings-card-actions">
                    <button type="button" className="btn-outline-dark" onClick={onOpenSubscription}>
                      {planTier === 'premium'
                        ? language === 'fr'
                          ? 'Voir les détails'
                          : 'View details'
                        : language === 'fr'
                        ? 'Voir les formules'
                        : 'See plans'}
                    </button>
                  </div>
                )}
              </section>
            );
          })()}

          {/* ================== NOTIFICATIONS ================== */}
          {activeTab === 'notifications' && (
            <section className="settings-card-v9">
              <h2 className="settings-card-title">
                {language === 'fr' ? 'Préférences de notifications' : 'Notification preferences'}
              </h2>
              <p className="settings-card-subtitle">
                {language === 'fr'
                  ? 'Choisis les alertes que tu souhaites recevoir.'
                  : 'Choose which alerts you want to receive.'}
              </p>
              <div className="settings-card-divider" />

              {renderRowToggle(
                language === 'fr' ? 'Nouveaux messages' : 'New messages',
                language === 'fr' ? 'Recevoir une alerte pour chaque nouveau message privé' : 'Receive an alert for each new private message',
                notifMessages,
                setNotifMessages
              )}
              {renderRowToggle(
                language === 'fr' ? 'Défis de bataille' : 'Battle challenges',
                language === 'fr' ? 'Être notifié quand quelqu\'un te défie en duel' : 'Be notified when someone challenges you',
                notifBattles,
                setNotifBattles
              )}
              {renderRowToggle(
                language === 'fr' ? 'Réponses Board' : 'Board replies',
                language === 'fr' ? 'Notification quand quelqu\'un commente tes sujets' : 'Notification when someone comments on your topics',
                notifBoard,
                setNotifBoard
              )}
              {renderRowToggle(
                language === 'fr' ? "Rappel d'étude quotidien" : 'Daily study reminder',
                language === 'fr' ? 'Rappel pour maintenir ta série active' : 'Reminder to keep your streak alive',
                notifDaily,
                setNotifDaily
              )}

              {notifDaily && (
                <div className="settings-row-expand">
                  <div className="settings-field-label-v9">
                    {language === 'fr' ? 'Jours de rappel' : 'Reminder days'}
                  </div>
                  <div className="settings-weekday-pills">
                    {weekdayLabels.map((label, idx) => (
                      <button
                        key={label}
                        type="button"
                        className={`settings-weekday-pill ${reminderDays.has(idx) ? 'settings-weekday-pill--on' : ''}`}
                        onClick={() => toggleReminderDay(idx)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  <div className="settings-grid-2 settings-grid-2--compact">
                    <label className="settings-field-v9">
                      <span className="settings-field-label-v9">
                        {language === 'fr' ? 'Heure du rappel' : 'Reminder time'}
                      </span>
                      <input
                        type="time"
                        className="settings-input-v9"
                        value={reminderTime}
                        onChange={(e) => setReminderTime(e.target.value)}
                      />
                    </label>
                    <label className="settings-field-v9">
                      <span className="settings-field-label-v9">
                        {language === 'fr' ? 'Fuseau horaire' : 'Timezone'}
                      </span>
                      <input
                        type="text"
                        className="settings-input-v9"
                        value={detectedTz}
                        disabled
                      />
                      <span className="settings-field-hint">
                        {language === 'fr'
                          ? 'Détecté automatiquement depuis ton navigateur'
                          : 'Detected automatically from your browser'}
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {renderRowToggle(
                language === 'fr' ? 'Nouveau contenu' : 'New content',
                language === 'fr' ? "Alertes pour l'ajout de nouvelles leçons" : 'Alerts for new lessons',
                notifContent,
                setNotifContent
              )}
              {renderRowToggle(
                language === 'fr' ? 'Classement' : 'Leaderboard',
                language === 'fr' ? 'Être notifié quand quelqu\'un te dépasse au classement' : 'Be notified when someone overtakes you',
                notifLeaderboard,
                setNotifLeaderboard
              )}
              {renderRowToggle(
                language === 'fr' ? 'Emails marketing' : 'Marketing emails',
                language === 'fr' ? 'Promotions, actualités et événements XiaoLearn' : 'Promotions, news and events',
                notifMarketing,
                setNotifMarketing
              )}

              <div className="settings-card-actions">
                <button type="button" className="btn-save-dark" onClick={handleSaveNotifications}>
                  {language === 'fr' ? 'Sauvegarder' : 'Save'}
                </button>
              </div>

              {/* ----- Sous-section Rappels par mail (sync Firestore) ----- */}
              <div className="settings-card-divider" style={{ marginTop: 8 }} />
              <h3 className="settings-sub-section-title" style={{ marginTop: 16 }}>
                {language === 'fr' ? 'Rappels par mail' : 'Email reminders'}
                {emailSyncState === 'saving' && (
                  <span style={{ marginLeft: 10, fontSize: 12, color: '#8a8a8a', fontWeight: 500 }}>
                    {language === 'fr' ? 'Enregistrement…' : 'Saving…'}
                  </span>
                )}
                {emailSyncState === 'error' && (
                  <span style={{ marginLeft: 10, fontSize: 12, color: '#c6302c', fontWeight: 500 }}>
                    {language === 'fr' ? 'Erreur de sync' : 'Sync error'}
                  </span>
                )}
              </h3>
              <p className="settings-card-subtitle" style={{ marginTop: 2 }}>
                {language === 'fr'
                  ? `Ces préférences s'appliquent aux emails envoyés à ${user?.email ?? 'ton adresse'}.`
                  : `These preferences apply to emails sent to ${user?.email ?? 'your address'}.`}
              </p>
              {renderRowToggle(
                language === 'fr' ? 'Recevoir des mails' : 'Receive emails',
                language === 'fr'
                  ? 'Interrupteur général — désactive pour tout arrêter'
                  : 'Master switch — turn off to stop all emails',
                emailPrefs.enabled,
                (v) => updateEmailPrefs({ enabled: v })
              )}
              {emailPrefs.enabled && (
                <>
                  {renderRowToggle(
                    language === 'fr' ? 'Rappel quotidien' : 'Daily reminder',
                    language === 'fr'
                      ? 'Mail si tu as des cartes à réviser / série en danger'
                      : 'Email if you have cards to review / streak at risk',
                    emailPrefs.dailyReminder,
                    (v) => updateEmailPrefs({ dailyReminder: v })
                  )}
                  {renderRowToggle(
                    language === 'fr' ? 'Résumé hebdomadaire' : 'Weekly digest',
                    language === 'fr'
                      ? "XP gagnés, leçons terminées, position au classement"
                      : 'XP earned, lessons completed, ranking position',
                    emailPrefs.weeklyDigest,
                    (v) => updateEmailPrefs({ weeklyDigest: v })
                  )}
                  {renderRowToggle(
                    language === 'fr' ? 'Défis de bataille' : 'Battle challenges',
                    language === 'fr'
                      ? 'Mail quand un adversaire te défie'
                      : 'Email when an opponent challenges you',
                    emailPrefs.battleChallenges,
                    (v) => updateEmailPrefs({ battleChallenges: v })
                  )}
                  {renderRowToggle(
                    language === 'fr' ? 'Rangs & paliers' : 'Ranks & milestones',
                    language === 'fr'
                      ? 'Notification rang gagné (Étudiant, Guerrier…)'
                      : 'Notification when you reach a new rank',
                    emailPrefs.rankUp,
                    (v) => updateEmailPrefs({ rankUp: v })
                  )}
                  {renderRowToggle(
                    language === 'fr' ? 'Alertes de série' : 'Streak alerts',
                    language === 'fr'
                      ? "Rappel si ta série est en danger aujourd'hui"
                      : 'Reminder if your streak is at risk today',
                    emailPrefs.streakAlerts,
                    (v) => updateEmailPrefs({ streakAlerts: v })
                  )}
                  {renderRowToggle(
                    language === 'fr' ? 'Offres & actualités' : 'Offers & news',
                    language === 'fr'
                      ? 'Promotions, nouveautés, événements XiaoLearn'
                      : 'Promotions, new features, XiaoLearn events',
                    emailPrefs.marketing,
                    (v) => updateEmailPrefs({ marketing: v })
                  )}
                </>
              )}
            </section>
          )}

          {/* ================== LANGUE ================== */}
          {activeTab === 'language' && (
            <section className="settings-card-v9">
              <h2 className="settings-card-title">
                {language === 'fr' ? 'Langue & Région' : 'Language & Region'}
              </h2>
              <div className="settings-card-divider" />

              <label className="settings-field-v9">
                <span className="settings-field-label-v9">
                  {language === 'fr' ? "Langue de l'interface" : 'Interface language'}
                </span>
                <select
                  className="settings-input-v9 settings-select-v9"
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value as Language)}
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </label>

              <label className="settings-field-v9">
                <span className="settings-field-label-v9">
                  {language === 'fr' ? "Langue d'apprentissage" : 'Learning language'}
                </span>
                <input
                  type="text"
                  className="settings-input-v9"
                  value={language === 'fr' ? 'Chinois (Mandarin)' : 'Chinese (Mandarin)'}
                  disabled
                />
                <span className="settings-field-hint">
                  {language === 'fr'
                    ? "XiaoLearn est actuellement exclusif à l'apprentissage du chinois."
                    : 'XiaoLearn is currently focused on learning Chinese.'}
                </span>
              </label>

              <label className="settings-field-v9">
                <span className="settings-field-label-v9">
                  {language === 'fr' ? 'Fuseau horaire' : 'Timezone'}
                </span>
                <input
                  type="text"
                  className="settings-input-v9"
                  value={detectedTz}
                  disabled
                />
                <span className="settings-field-hint">
                  {language === 'fr'
                    ? 'Détecté automatiquement selon ton navigateur.'
                    : 'Detected automatically from your browser.'}
                </span>
              </label>

              <div className="settings-card-actions">
                <button
                  type="button"
                  className="btn-save-dark"
                  onClick={() => alert(language === 'fr' ? 'Langue sauvegardée.' : 'Language saved.')}
                >
                  {language === 'fr' ? 'Sauvegarder' : 'Save'}
                </button>
              </div>
            </section>
          )}

          {/* ================== APPRENTISSAGE ================== */}
          {activeTab === 'learning' && (
            <section className="settings-card-v9">
              <h2 className="settings-card-title">
                {language === 'fr' ? "Préférences d'apprentissage" : 'Learning preferences'}
              </h2>
              <div className="settings-card-divider" />

              <div className="settings-field-label-v9">
                {language === 'fr' ? "Objectif d'étude quotidien" : 'Daily study goal'}
              </div>
              <div className="settings-goal-grid">
                {DAILY_GOALS.map((g) => {
                  // Le preset actif est celui dont la cible "min" correspond
                  // à la cible minutesTarget effective (source de vérité = dashboard).
                  const isActive = dailyGoalsHook.goals.minutesTarget === g.min;
                  return (
                  <button
                    key={g.key}
                    type="button"
                    className={`settings-goal-tile ${isActive ? 'settings-goal-tile--active' : ''}`}
                    onClick={() => {
                      setDailyGoal(g.key);
                      // Le preset pilote aussi la cible minutes/jour
                      dailyGoalsHook.setGoals({ minutesTarget: g.min });
                    }}
                    aria-pressed={isActive}
                  >
                    <span className="settings-goal-icon" aria-hidden>{g.icon}</span>
                    <span className="settings-goal-name">
                      {language === 'fr' ? g.labelFr : g.labelEn}
                    </span>
                    <span className="settings-goal-time">
                      {g.min} min/{language === 'fr' ? 'jour' : 'day'}
                    </span>
                  </button>
                  );
                })}
              </div>

              <h3 className="settings-sub-section-title">
                {language === 'fr' ? 'Objectifs quotidiens personnalisés' : 'Custom daily goals'}
              </h3>
              <p className="settings-help-text">
                {language === 'fr'
                  ? 'Personnalise les cibles XP, cartes et leçons affichées sur le tableau de bord. La cible minutes est pilotée par le preset ci-dessus. Mets 0 pour « illimité » (pas tracké comme objectif).'
                  : 'Customize the XP, cards and lessons targets shown on the dashboard. The minutes target is driven by the preset above. Set 0 for «unlimited» (not tracked as a goal).'}
              </p>

              <div className="settings-goals-custom-grid">
                {/* --- XP / jour ----------------------------------------- */}
                <div className="settings-goal-card">
                  <div className="settings-goal-card-head">
                    <span className="settings-goal-card-emoji" aria-hidden>⭐</span>
                    <span className="settings-goal-card-label">
                      {language === 'fr' ? 'XP / jour' : 'XP / day'}
                    </span>
                  </div>
                  <div className="settings-goal-stepper">
                    <button
                      type="button"
                      className="settings-goal-stepper-btn"
                      onClick={() =>
                        dailyGoalsHook.setGoals({
                          xpTarget: Math.max(10, dailyGoalsHook.goals.xpTarget - 10)
                        })
                      }
                      aria-label={language === 'fr' ? 'Diminuer' : 'Decrease'}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      className="settings-goal-stepper-input"
                      min={10}
                      max={500}
                      step={10}
                      value={dailyGoalsHook.goals.xpTarget}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        if (!Number.isNaN(v)) {
                          dailyGoalsHook.setGoals({ xpTarget: v });
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="settings-goal-stepper-btn"
                      onClick={() =>
                        dailyGoalsHook.setGoals({
                          xpTarget: Math.min(500, dailyGoalsHook.goals.xpTarget + 10)
                        })
                      }
                      aria-label={language === 'fr' ? 'Augmenter' : 'Increase'}
                    >
                      +
                    </button>
                  </div>
                  <span className="settings-goal-card-hint">
                    {language === 'fr' ? 'Entre 10 et 500' : 'Between 10 and 500'}
                  </span>
                </div>

                {/* --- Cartes / jour ------------------------------------- */}
                <div className="settings-goal-card">
                  <div className="settings-goal-card-head">
                    <span className="settings-goal-card-emoji" aria-hidden>🃏</span>
                    <span className="settings-goal-card-label">
                      {language === 'fr' ? 'Cartes / jour' : 'Cards / day'}
                    </span>
                  </div>
                  <div className="settings-goal-stepper">
                    <button
                      type="button"
                      className="settings-goal-stepper-btn"
                      onClick={() =>
                        dailyGoalsHook.setGoals({
                          cardsTarget:
                            dailyGoalsHook.goals.cardsTarget === 0
                              ? 0
                              : Math.max(0, dailyGoalsHook.goals.cardsTarget - 5)
                        })
                      }
                      disabled={dailyGoalsHook.goals.cardsTarget === 0}
                      aria-label={language === 'fr' ? 'Diminuer' : 'Decrease'}
                    >
                      −
                    </button>
                    {dailyGoalsHook.goals.cardsTarget === 0 ? (
                      <span className="settings-goal-stepper-unlimited">∞</span>
                    ) : (
                      <input
                        type="number"
                        className="settings-goal-stepper-input"
                        min={5}
                        max={200}
                        step={5}
                        value={dailyGoalsHook.goals.cardsTarget}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (!Number.isNaN(v)) {
                            dailyGoalsHook.setGoals({ cardsTarget: v });
                          }
                        }}
                      />
                    )}
                    <button
                      type="button"
                      className="settings-goal-stepper-btn"
                      onClick={() =>
                        dailyGoalsHook.setGoals({
                          cardsTarget:
                            dailyGoalsHook.goals.cardsTarget === 0
                              ? 5
                              : Math.min(200, dailyGoalsHook.goals.cardsTarget + 5)
                        })
                      }
                      disabled={dailyGoalsHook.goals.cardsTarget === 0}
                      aria-label={language === 'fr' ? 'Augmenter' : 'Increase'}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="settings-goal-card-toggle"
                    onClick={() =>
                      dailyGoalsHook.setGoals({
                        cardsTarget: dailyGoalsHook.goals.cardsTarget === 0 ? 20 : 0
                      })
                    }
                  >
                    {dailyGoalsHook.goals.cardsTarget === 0
                      ? language === 'fr' ? 'Définir un objectif' : 'Set a target'
                      : language === 'fr' ? '↺ Illimité' : '↺ Unlimited'}
                  </button>
                </div>

                {/* --- Leçons / jour ------------------------------------- */}
                <div className="settings-goal-card">
                  <div className="settings-goal-card-head">
                    <span className="settings-goal-card-emoji" aria-hidden>📚</span>
                    <span className="settings-goal-card-label">
                      {language === 'fr' ? 'Leçons / jour' : 'Lessons / day'}
                    </span>
                  </div>
                  <div className="settings-goal-stepper">
                    <button
                      type="button"
                      className="settings-goal-stepper-btn"
                      onClick={() =>
                        dailyGoalsHook.setGoals({
                          lessonsTarget:
                            dailyGoalsHook.goals.lessonsTarget === 0
                              ? 0
                              : Math.max(0, dailyGoalsHook.goals.lessonsTarget - 1)
                        })
                      }
                      disabled={dailyGoalsHook.goals.lessonsTarget === 0}
                      aria-label={language === 'fr' ? 'Diminuer' : 'Decrease'}
                    >
                      −
                    </button>
                    {dailyGoalsHook.goals.lessonsTarget === 0 ? (
                      <span className="settings-goal-stepper-unlimited">∞</span>
                    ) : (
                      <input
                        type="number"
                        className="settings-goal-stepper-input"
                        min={1}
                        max={10}
                        step={1}
                        value={dailyGoalsHook.goals.lessonsTarget}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (!Number.isNaN(v)) {
                            dailyGoalsHook.setGoals({ lessonsTarget: v });
                          }
                        }}
                      />
                    )}
                    <button
                      type="button"
                      className="settings-goal-stepper-btn"
                      onClick={() =>
                        dailyGoalsHook.setGoals({
                          lessonsTarget:
                            dailyGoalsHook.goals.lessonsTarget === 0
                              ? 1
                              : Math.min(10, dailyGoalsHook.goals.lessonsTarget + 1)
                        })
                      }
                      disabled={dailyGoalsHook.goals.lessonsTarget === 0}
                      aria-label={language === 'fr' ? 'Augmenter' : 'Increase'}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="settings-goal-card-toggle"
                    onClick={() =>
                      dailyGoalsHook.setGoals({
                        lessonsTarget: dailyGoalsHook.goals.lessonsTarget === 0 ? 2 : 0
                      })
                    }
                  >
                    {dailyGoalsHook.goals.lessonsTarget === 0
                      ? language === 'fr' ? 'Définir un objectif' : 'Set a target'
                      : language === 'fr' ? '↺ Illimité' : '↺ Unlimited'}
                  </button>
                </div>
              </div>

              <div className="settings-goals-custom-actions">
                <button
                  type="button"
                  className="btn-text-muted"
                  onClick={() => dailyGoalsHook.resetToDefaults()}
                >
                  {language === 'fr' ? '↺ Réinitialiser aux valeurs par défaut' : '↺ Reset to defaults'}
                </button>
              </div>

              <h3 className="settings-sub-section-title">
                {language === 'fr' ? 'Affichage du chinois' : 'Chinese display'}
              </h3>
              {renderRowToggle(
                language === 'fr' ? 'Toujours afficher le pinyin' : 'Always show pinyin',
                language === 'fr' ? 'Affiche "nǐ hǎo" sous "你好"' : 'Shows "nǐ hǎo" under "你好"',
                showPinyin,
                setShowPinyin
              )}
              {renderRowToggle(
                language === 'fr' ? 'Lecture audio automatique' : 'Automatic audio playback',
                language === 'fr' ? 'Joue le son au survol des mots chinois' : 'Plays sound on hover over Chinese words',
                autoPlayAudio,
                setAutoPlayAudio
              )}

              <h3 className="settings-sub-section-title">
                {language === 'fr' ? 'Professeur Park' : 'Professor Park'}
              </h3>
              <div className="settings-field-v9">
                <span className="settings-field-label-v9">
                  {language === 'fr' ? 'Langue des explications' : 'Explanation language'}
                </span>
                <div className="settings-radio-row">
                  <label className="settings-radio">
                    <input
                      type="radio"
                      checked={parkLanguage === 'fr'}
                      onChange={() => setParkLanguage('fr')}
                    />
                    <span>{language === 'fr' ? 'Français' : 'French'}</span>
                  </label>
                  <label className="settings-radio">
                    <input
                      type="radio"
                      checked={parkLanguage === 'en'}
                      onChange={() => setParkLanguage('en')}
                    />
                    <span>{language === 'fr' ? 'Anglais' : 'English'}</span>
                  </label>
                </div>
              </div>

              <label className="settings-field-v9">
                <span className="settings-field-label-v9">
                  {language === 'fr' ? 'Niveau de détail' : 'Detail level'}
                </span>
                <select
                  className="settings-input-v9 settings-select-v9"
                  value={parkDetail}
                  onChange={(e) => setParkDetail(e.target.value as 'concise' | 'normal' | 'detailed')}
                >
                  <option value="concise">
                    {language === 'fr' ? 'Concis (réponses courtes)' : 'Concise (short answers)'}
                  </option>
                  <option value="normal">
                    {language === 'fr' ? 'Normal (équilibré)' : 'Normal (balanced)'}
                  </option>
                  <option value="detailed">
                    {language === 'fr' ? 'Détaillé (avec exemples complets)' : 'Detailed (with full examples)'}
                  </option>
                </select>
              </label>

              <h3 className="settings-sub-section-title">
                {language === 'fr' ? 'Révisions Flashcards' : 'Flashcard reviews'}
              </h3>
              <div className="settings-row settings-row--inline">
                <div className="settings-row-text">
                  <div className="settings-row-title">
                    {language === 'fr' ? 'Cartes par session' : 'Cards per session'}
                  </div>
                </div>
                <select
                  className="settings-input-v9 settings-select-v9 settings-select-v9--compact"
                  value={srsPrefs.dailyNewCards}
                  onChange={(e) => setCustomDailyNewCards(parseInt(e.target.value, 10))}
                >
                  {[10, 15, 20, 30, 50, 100].map((n) => (
                    <option key={n} value={n}>
                      {n} {language === 'fr' ? 'cartes' : 'cards'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="settings-card-actions">
                <button type="button" className="btn-save-dark" onClick={handleSaveLearning}>
                  {language === 'fr' ? 'Sauvegarder' : 'Save'}
                </button>
              </div>
            </section>
          )}

          {/* ================== CONFIDENTIALITÉ ================== */}
          {activeTab === 'privacy' && (
            <>
              <section className="settings-card-v9">
                <h2 className="settings-card-title">
                  {language === 'fr' ? 'Visibilité & Interactions' : 'Visibility & Interactions'}
                </h2>
                <div className="settings-card-divider" />

                {renderRowToggle(
                  language === 'fr' ? 'Profil public' : 'Public profile',
                  language === 'fr' ? 'Les autres utilisateurs peuvent voir ton profil' : 'Other users can view your profile',
                  privPublic,
                  setPrivPublic
                )}
                {renderRowToggle(
                  language === 'fr' ? 'Afficher dans le classement' : 'Show in leaderboard',
                  language === 'fr' ? 'Apparaître publiquement dans le leaderboard' : 'Appear publicly in the leaderboard',
                  privLeaderboard,
                  setPrivLeaderboard
                )}
                {renderRowToggle(
                  language === 'fr' ? "Historique d'activité" : 'Activity history',
                  language === 'fr' ? "Tes amis peuvent voir ta heatmap d'étude" : 'Your friends can see your study heatmap',
                  privActivity,
                  setPrivActivity
                )}
                {renderRowToggle(
                  language === 'fr' ? 'Accepter les défis' : 'Accept challenges',
                  language === 'fr' ? 'Tout le monde peut te défier en bataille' : 'Anyone can challenge you to a battle',
                  privChallenges,
                  setPrivChallenges
                )}
                {renderRowToggle(
                  language === 'fr' ? 'Messages de non-amis' : 'Non-friend messages',
                  language === 'fr' ? 'Autoriser les messages des personnes non suivies' : 'Allow messages from people you don\'t follow',
                  privNonFriends,
                  setPrivNonFriends
                )}

                <div className="settings-card-actions">
                  <button type="button" className="btn-save-dark" onClick={handleSavePrivacy}>
                    {language === 'fr' ? 'Sauvegarder' : 'Save'}
                  </button>
                </div>
              </section>

              <section className="settings-card-v9">
                <h2 className="settings-card-title">
                  {language === 'fr' ? 'Données personnelles' : 'Personal data'}
                </h2>
                <p className="settings-card-subtitle">
                  {language === 'fr'
                    ? 'Conformément au RGPD, tu as le droit de récupérer une copie de toutes les données liées à ton compte.'
                    : 'Under GDPR, you have the right to download a copy of all data linked to your account.'}
                </p>
                <div className="settings-card-actions settings-card-actions--left">
                  <button type="button" className="btn-outline-dark" onClick={handleExportData}>
                    <span aria-hidden>⬇️</span> {language === 'fr' ? 'Télécharger mes données' : 'Download my data'}
                  </button>
                </div>
              </section>
            </>
          )}

          {/* ================== ZONE DE DANGER ================== */}
          {activeTab === 'danger' && (
            <section className="settings-card-v9 settings-card-v9--danger">
              <h2 className="settings-card-title settings-card-title--danger">
                <span aria-hidden>⚠️</span>{' '}
                {language === 'fr' ? 'Zone de danger' : 'Danger zone'}
              </h2>
              <div className="settings-card-divider" />

              <div className="settings-danger-block">
                <h3>{language === 'fr' ? 'Réinitialiser la progression' : 'Reset progress'}</h3>
                <p>
                  {language === 'fr'
                    ? 'Remet à zéro ton niveau, tes EXP, ta série, tes flashcards et ta progression. Ton abonnement est conservé.'
                    : 'Resets your level, XP, streak, flashcards and progress. Your subscription is kept.'}
                </p>
                <button
                  type="button"
                  className="btn-outline-danger"
                  onClick={() => setShowResetConfirm(true)}
                >
                  {language === 'fr' ? 'Réinitialiser' : 'Reset'}
                </button>
              </div>

              <div className="settings-card-divider" />

              <div className="settings-danger-block">
                <h3>{language === 'fr' ? 'Supprimer le compte' : 'Delete account'}</h3>
                <p>
                  {language === 'fr'
                    ? 'Supprime définitivement ton compte et toutes tes données. Cette action est irréversible et annulera ton abonnement Premium.'
                    : 'Permanently deletes your account and all your data. This action is irreversible and will cancel your Premium subscription.'}
                </p>
                <button
                  type="button"
                  className="btn-solid-danger"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  {language === 'fr' ? 'Supprimer mon compte' : 'Delete my account'}
                </button>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* --------- Modals --------- */}
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
              <button type="button" className="btn-danger" onClick={handleResetProgress}>
                {language === 'fr' ? 'Oui, réinitialiser' : 'Yes, reset'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {language === 'fr' ? 'Supprimer le compte ?' : 'Delete account?'}
            </h2>
            <p className="modal-description">
              {language === 'fr'
                ? 'Cette action supprimera définitivement ton compte et toutes tes données. Es-tu absolument sûr ?'
                : 'This will permanently delete your account and all your data. Are you absolutely sure?'}
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                {language === 'fr' ? 'Annuler' : 'Cancel'}
              </button>
              <button type="button" className="btn-danger" onClick={handleDeleteAccount}>
                {language === 'fr' ? 'Oui, supprimer' : 'Yes, delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
