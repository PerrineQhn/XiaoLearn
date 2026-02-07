import { useEffect, useMemo, useState } from 'react';
import './App.css';
import './styles/lesson-filters.css';
import HomePage from './pages/HomePage';
import LessonPage from './pages/LessonPage';
import LessonPathsPage from './pages/LessonPathsPage';
import StructuredLessonPage from './pages/StructuredLessonPage';
import QuizPage from './pages/QuizPage';
import ReviewPage from './pages/ReviewPage';
import ThemePage from './pages/ThemePage';
import DictionaryPage from './pages/DictionaryPage';
import AIAssistantPage from './pages/AIAssistantPage';
import DictationGamePage from './pages/DictationGamePage';
import SettingsPage from './pages/SettingsPage';
import MiniGamesPage from './pages/MiniGamesPage';
import FlashcardPage from './pages/FlashcardPage';
import CulturePage from './pages/CulturePage';
import LanguageSwitcher from './components/LanguageSwitcher';
import AIFloatingChat from './components/AIFloatingChat';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginModal from './components/Auth/LoginModal';
import UserProfile from './components/Auth/UserProfile';
import SubscriptionGate from './components/SubscriptionGate';
import { useLessonProgress } from './hooks/useLessonProgress';
import { useQuizEngine } from './hooks/useQuizEngine';
import { useEntitlements } from './hooks/useEntitlements';
import { useUserProfileSync } from './hooks/useUserProfileSync';
import { getThemeSummaries, getLessonById } from './data/lessons';
import { lessonPaths, getLessonModuleById } from './data/lesson-paths';
import { getCopy, type Language } from './i18n';
import { useCustomLists } from './hooks/useCustomLists';
import { createCheckoutSession, createPortalSession } from './services/payments';

export type View = 'home' | 'lessons' | 'lesson' | 'review' | 'themes' | 'culture' | 'dictionary' | 'assistant' | 'settings' | 'games' | 'flashcards';

const themeSummaries = getThemeSummaries();
const defaultTheme = themeSummaries[0]?.theme ?? null;
const COMPLETED_LESSONS_KEY = 'cl_completed_lessons';
const DAILY_MINUTES_KEY = 'cl_daily_minutes';
const TOTAL_MINUTES_KEY = 'cl_total_minutes';
const DAILY_GOAL_MINUTES = 10;

interface LearningStats {
  streak: number;
  minutesToday: number;
  totalMinutes: number;
}

const readCompletedLessons = (): string[] => {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(COMPLETED_LESSONS_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const buildLessonPathsState = (completedIds: string[]) => {
  const completedSet = new Set(completedIds);
  return lessonPaths.map((path) => {
    const lessons = path.lessons.map((lesson, index) => {
      const completed = completedSet.has(lesson.id);
      const unlocked = true;
      return {
        ...lesson,
        completed,
        locked: !unlocked
      };
    });
    return { ...path, lessons };
  });
};

const getDateKey = (date = new Date()) => date.toISOString().split('T')[0];

const readDailyMinutesMap = (): Record<string, number> => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(DAILY_MINUTES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
};

const writeDailyMinutesMap = (map: Record<string, number>) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(DAILY_MINUTES_KEY, JSON.stringify(map));
  }
};

const readLearningStats = (): LearningStats => {
  if (typeof window === 'undefined') {
    return { streak: 0, minutesToday: 0, totalMinutes: 0 };
  }
  const map = readDailyMinutesMap();
  const todayKey = getDateKey();
  const minutesToday = map[todayKey] || 0;
  const streak = parseInt(window.localStorage.getItem('learningStreak') || '0', 10) || 0;
  const totalMinutes = parseInt(window.localStorage.getItem(TOTAL_MINUTES_KEY) || '0', 10) || 0;
  return { streak, minutesToday, totalMinutes };
};

const daysBetween = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diff = endDate.getTime() - startDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const applyLearningSession = (duration: number): LearningStats => {
  if (typeof window === 'undefined') {
    return { streak: 0, minutesToday: 0, totalMinutes: 0 };
  }
  const minutes = Math.max(0, Math.round(duration));
  const todayKey = getDateKey();
  const map = readDailyMinutesMap();
  map[todayKey] = (map[todayKey] || 0) + minutes;
  writeDailyMinutesMap(map);

  const previousTotal = parseInt(window.localStorage.getItem(TOTAL_MINUTES_KEY) || '0', 10) || 0;
  const totalMinutes = previousTotal + minutes;
  window.localStorage.setItem(TOTAL_MINUTES_KEY, String(totalMinutes));

  const lastDate = window.localStorage.getItem('lastLearningDate');
  let streak = parseInt(window.localStorage.getItem('learningStreak') || '0', 10) || 0;
  if (!lastDate) {
    streak = 1;
  } else {
    const delta = daysBetween(lastDate, todayKey);
    if (delta === 0) {
      streak = Math.max(streak, 1);
    } else if (delta === 1) {
      streak = streak > 0 ? streak + 1 : 1;
    } else {
      streak = 1;
    }
  }
  window.localStorage.setItem('learningStreak', String(streak));
  window.localStorage.setItem('lastLearningDate', todayKey);

  return {
    streak,
    minutesToday: map[todayKey],
    totalMinutes
  };
};

function App() {
  const { user } = useAuth();
  useUserProfileSync();
  const { entitlements, loading: entitlementsLoading } = useEntitlements();
  const [view, setView] = useState<View>('home');
  const [language, setLanguage] = useState<Language>('fr');
  const [darkMode, setDarkMode] = useState(false);
  const [colorTheme, setColorTheme] = useState<string>(() => {
    if (typeof window === 'undefined') return 'asian-red';
    return window.localStorage.getItem('colorTheme') || 'asian-red';
  });
  const [selectedLesson, setSelectedLesson] = useState<{ pathId: string; lessonId: string } | null>(null);
  const [logoErrored, setLogoErrored] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const copy = getCopy(language);
  const [focusedTheme, setFocusedTheme] = useState<string | null>(defaultTheme);
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => readCompletedLessons());
  const lessonPathsState = useMemo(() => buildLessonPathsState(completedLessons), [completedLessons]);
  const lessonProgress = useLessonProgress(3);
  const customLists = useCustomLists();
  const customReviewLists = useMemo(
    () =>
      customLists.lists.map((list) => ({
        id: list.id,
        name: list.name,
        itemIds: list.itemIds,
        items: list.itemIds
          .map((id) => getLessonById(id))
          .filter((lesson): lesson is NonNullable<ReturnType<typeof getLessonById>> => Boolean(lesson))
      })),
    [customLists.lists]
  );
  const quiz = useQuizEngine(language);
  const [learningStats, setLearningStats] = useState<LearningStats>(() => readLearningStats());
  const topThemes = themeSummaries.slice(0, 4);
  const hasAppAccess = entitlements?.app?.active ?? false;

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkMode);
    return () => {
      document.body.classList.remove('dark-theme');
    };
  }, [darkMode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(completedLessons));
    }
  }, [completedLessons]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('colorTheme', colorTheme);
    }
    document.body.setAttribute('data-theme', colorTheme);
  }, [colorTheme]);

  useEffect(() => {
    setLogoErrored(false);
  }, [colorTheme]);

  const navEntries = useMemo<{ id: View; label: string; iconSlug: string; fallback: string }[]>(
    () => [
      { id: 'home', label: language === 'fr' ? 'Accueil' : 'Home', iconSlug: 'home', fallback: '🏠' },
      { id: 'lessons', label: language === 'fr' ? 'Leçons' : 'Lessons', iconSlug: 'lecons', fallback: '📚' },
      { id: 'flashcards', label: language === 'fr' ? 'Cartes Mémoire' : 'Flashcards', iconSlug: 'flash-card', fallback: '🎴' },
      { id: 'review', label: language === 'fr' ? 'Révisions' : 'Reviews', iconSlug: 'reviser', fallback: '🔄' },
      { id: 'games', label: language === 'fr' ? 'Mini-Jeux' : 'Mini-Games', iconSlug: 'jeux', fallback: '🎮' },
      { id: 'assistant', label: language === 'fr' ? 'Assistant IA' : 'AI Assistant', iconSlug: 'ia', fallback: '🤖' },
      { id: 'themes', label: language === 'fr' ? 'Thèmes' : 'Themes', iconSlug: 'themes', fallback: '🗂️' },
      { id: 'culture', label: language === 'fr' ? 'Culture' : 'Culture', iconSlug: 'culture', fallback: '🏮' },
      { id: 'dictionary', label: language === 'fr' ? 'Dictionnaire' : 'Dictionary', iconSlug: 'dict', fallback: '📖' }
    ],
    [language]
  );

  const handleOpenThemes = (theme?: string) => {
    setFocusedTheme(theme ?? defaultTheme);
    setView('themes');
  };

  const handleSelectLesson = (pathId: string, lessonId: string) => {
    setSelectedLesson({ pathId, lessonId });
    setView('lesson');
  };

  const recordLearningSession = (duration: number) => {
    const updated = applyLearningSession(duration);
    setLearningStats(updated);
  };

  const handleLessonComplete = (payload: { learnedWordIds: string[]; duration: number }) => {
    lessonProgress.addLearnedWords(payload.learnedWordIds);
    if (payload.duration > 0) {
      recordLearningSession(payload.duration);
    }
    const completedLessonId = selectedLesson?.lessonId;
    if (completedLessonId) {
      setCompletedLessons((prev) => {
        if (prev.includes(completedLessonId)) return prev;
        return [...prev, completedLessonId];
      });
    }
    setSelectedLesson(null);
    setView('lessons');
  };

  const handleLessonExit = () => {
    setSelectedLesson(null);
    setView('lessons');
  };

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    try {
      await createCheckoutSession(planId, user.uid, user.email || undefined);
    } catch (error) {
      console.error('Checkout error:', error);
      alert(language === 'fr' ? 'Impossible de démarrer le paiement.' : 'Unable to start checkout.');
    }
  };

  const handleManageSubscription = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    try {
      await createPortalSession(user.uid, window.location.origin);
    } catch (error) {
      console.error('Portal error:', error);
      alert(language === 'fr' ? 'Impossible d\'ouvrir le portail.' : 'Unable to open portal.');
    }
  };

  if (entitlementsLoading) {
    return (
      <div className="app-container">
        <div className="subscription-loading">
          {language === 'fr' ? 'Chargement de votre accès...' : 'Loading your access...'}
        </div>
      </div>
    );
  }

  if (!entitlementsLoading && !hasAppAccess) {
    return (
      <div className="app-container">
        <SubscriptionGate
          language={language}
          isAuthenticated={Boolean(user)}
          onLogin={() => setShowLoginModal(true)}
          onSubscribe={handleSubscribe}
        />
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          language={language}
        />
      </div>
    );
  }

  let content: JSX.Element;
  switch (view) {
    case 'lessons':
      content = (
        <LessonPathsPage
          language={language}
          onSelectLesson={handleSelectLesson}
          paths={lessonPathsState}
        />
      );
      break;
    case 'lesson':
      if (selectedLesson) {
        const lessonModule = getLessonModuleById(selectedLesson.lessonId);
        if (lessonModule) {
          content = (
            <StructuredLessonPage
              lesson={lessonModule}
              language={language}
              onComplete={handleLessonComplete}
              onExit={handleLessonExit}
            />
          );
        } else {
          content = <div>Leçon non trouvée</div>;
        }
      } else {
        content = (
          <LessonPage
            lesson={lessonProgress.currentLesson}
            onNext={lessonProgress.goNext}
            onPrevious={lessonProgress.goPrevious}
            progress={lessonProgress.progressPercent}
            language={language}
            copy={copy}
          />
        );
      }
      break;
    case 'review':
      content = (
        <ReviewPage
          reviewItems={lessonProgress.allLearnedItems}
          totals={lessonProgress.totals}
          copy={copy}
          language={language}
          quiz={quiz}
          customLists={customReviewLists}
          listActions={{
            createList: customLists.createList,
            deleteList: customLists.deleteList
          }}
        />
      );
      break;
    case 'themes':
      content = (
        <ThemePage
          selectedTheme={focusedTheme}
          onSelectTheme={(theme) => setFocusedTheme(theme)}
          copy={copy}
          language={language}
          customLists={customLists.lists}
          onAddWordToList={customLists.addItemToList}
          onCreateList={customLists.createList}
        />
      );
      break;
    case 'culture':
      content = (
        <CulturePage
          language={language}
          copy={copy}
          customLists={customLists.lists}
          onAddWordToList={customLists.addItemToList}
          onCreateList={customLists.createList}
          colorTheme={colorTheme}
        />
      );
      break;
    case 'dictionary':
      content = (
        <DictionaryPage
          copy={copy}
          language={language}
          customLists={customLists.lists}
          onCreateList={customLists.createList}
          onAddWordToList={customLists.addItemToList}
        />
      );
      break;
    case 'assistant':
      content = <AIAssistantPage language={language} />;
      break;
    case 'games':
      content = (
        <MiniGamesPage
          language={language}
          reviewItems={lessonProgress.allLearnedItems}
        />
      );
      break;
    case 'flashcards':
      content = (
        <FlashcardPage
          language={language}
          onWordLearned={(wordId) => lessonProgress.addLearnedWords([wordId])}
        />
      );
      break;
    case 'settings':
      content = (
        <SettingsPage
          language={language}
          onLanguageChange={setLanguage}
          currentTheme={colorTheme}
          onThemeChange={setColorTheme}
          subscription={entitlements?.app ?? null}
          onSubscribe={handleSubscribe}
          onManageSubscription={handleManageSubscription}
        />
      );
      break;
    case 'home':
    default:
      content = (
        <HomePage
          todayLessons={lessonProgress.todaySummary}
          totals={lessonProgress.totals}
          onContinue={() => setView('lessons')}
          onOpenReview={() => setView('review')}
          topThemes={topThemes}
          onOpenThemes={handleOpenThemes}
          copy={copy}
          language={language}
          progressPercent={lessonProgress.progressPercent}
          minuteGoal={DAILY_GOAL_MINUTES}
          minutesToday={learningStats.minutesToday}
          streak={learningStats.streak}
          pendingReviews={lessonProgress.reviewItems.length}
          nextLesson={lessonProgress.todaySummary[0]}
          colorTheme={colorTheme}
        />
      );
  }

  // Si l'utilisateur n'est pas connecté, afficher uniquement la page de connexion
  if (!user) {
    return (
      <div className="login-page-wrapper" data-theme={colorTheme}>
        <div className="login-page-content">
          <div className="login-header">
            {!logoErrored ? (
              <img
                src={`/logos/logo_${colorTheme}.png`}
                alt="XiaoLearn"
                className="login-logo"
                onError={() => setLogoErrored(true)}
                draggable="false"
              />
            ) : (
              <span className="logo-icon-large">🌸</span>
            )}
            <p className="login-subtitle">
              {language === 'fr'
                ? 'Votre plateforme d\'apprentissage du chinois'
                : 'Your Chinese learning platform'}
            </p>
          </div>
          <LoginModal
            isOpen={true}
            onClose={() => {}}
            language={language}
          />
          <div className="login-language-switcher">
            <LanguageSwitcher value={language} onChange={setLanguage} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <button className="app-logo" type="button" onClick={() => setView('home')} aria-label="XiaoLearn Home">
            {!logoErrored ? (
              <img
                src={`/logos/logo_${colorTheme}.png`}
                alt="XiaoLearn"
                className="app-logo-image"
                onError={() => setLogoErrored(true)}
                draggable="false"
              />
            ) : (
              <span className="logo-icon">🐼</span>
            )}
          </button>
        </div>

        <UserProfile
          language={language}
          onOpenLogin={() => setShowLoginModal(true)}
          onOpenSettings={() => setView('settings')}
        />

        <nav className="sidebar-nav">
          {navEntries.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={`nav-item ${entry.id === view ? 'active' : ''}`}
              onClick={() => setView(entry.id)}
            >
              <span className="nav-icon">
                <img
                  src={`/icons/icon_${entry.iconSlug}_${colorTheme}.png`}
                  alt=""
                  loading="lazy"
                  draggable="false"
                  onError={(event) => {
                    (event.currentTarget as HTMLImageElement).style.display = 'none';
                    (event.currentTarget.parentElement ?? event.currentTarget).textContent = entry.fallback;
                  }}
                />
              </span>
              <span className="nav-label">{entry.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            type="button"
            className="nav-item mode-toggle-item"
            onClick={() => setDarkMode(!darkMode)}
          >
            <span className="nav-icon">
              <img
                src={`/icons/icon_${darkMode ? 'light' : 'dark'}_${colorTheme}.png`}
                alt=""
                loading="lazy"
                draggable="false"
                onError={(event) => {
                  (event.currentTarget as HTMLImageElement).style.display = 'none';
                  (event.currentTarget.parentElement ?? event.currentTarget).textContent = darkMode ? '☀️' : '🌙';
                }}
              />
            </span>
            <span className="nav-label">
              {darkMode
                ? language === 'fr'
                  ? 'Mode clair'
                  : 'Light mode'
                : language === 'fr'
                ? 'Mode sombre'
                : 'Dark mode'}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {content}
      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        language={language}
      />

      {/* Floating AI Chat - available on all pages except AI Assistant page */}
      {view !== 'assistant' && <AIFloatingChat language={language} />}
    </div>
  );
}

function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithAuth;
