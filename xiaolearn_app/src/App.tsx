import { useEffect, useMemo, useRef, useState, useCallback, lazy, Suspense } from 'react';
import './App.css';
import './styles/lesson-filters.css';
// --- V2 swap : pages drop-in ----------------------------------------------
import HomePageV2 from './pages/HomePageV2';
import StructuredLessonPageV2 from './pages/StructuredLessonPageV2';
// V7 — FlashcardPageV2 a été remplacé par FlashcardPageV3 (voir plus bas).
// L'import par défaut n'est plus nécessaire ; on conserve uniquement les
// types/mappers exportés depuis ce module (via utils/v2-mappers).
import AiTutorPageV2, { type AiTutorV2Message, type AiTutorV2Mode } from './pages/AiTutorPageV2';
// GrammarDrillsPageV2 remplacée par GrammarPageV3 (catalogue complet 38 points
// avec niveaux CECR, audio, mini-quiz). L'ancien fichier reste dans le repo
// pour référence mais n'est plus utilisé.
import GrammarPageV3 from './pages/GrammarPageV3';
import AtelierPage from './pages/AtelierPage';
import ErrorBoundary from './components/ErrorBoundary';
import MyErrorsPage from './pages/MyErrorsPage';
import { useErrorJournal } from './hooks/useErrorJournal';
import EvaluationHubPage from './pages/EvaluationHubPage';
import CommunityPageV2 from './pages/CommunityPageV2';
import AnnouncementsPage from './pages/AnnouncementsPage';
import IdeasRoadmapPage from './pages/IdeasRoadmapPage';
import ConversationsPage from './pages/ConversationsPage';
import BattlesPage from './pages/BattlesPage';
import BattleSessionPage from './pages/BattleSessionPage';
import BattleSessionPageLocal from './pages/BattleSessionPageLocal';
import LeaderboardPage from './pages/LeaderboardPage';
import DialoguePageV2 from './pages/DialoguePageV2';
import ReadingPageV2 from './pages/ReadingPageV2';
import SimulatorPageV2 from './pages/SimulatorPageV2';
// --- V7 additions : révision multi-leçons, flashcards V3, bilans de niveau --
// V9.2 — FlashcardPageV3 a été remplacé par FlashcardPageV5 (drop-in Seonsaengnim).
//   On conserve l'import de `lookupPinyinForHanzi` depuis V3 (pur helper).
import ReviewPageV3 from './pages/ReviewPageV3';
import FlashcardPageV5 from './pages/FlashcardPageV5';
import FreeLearningPage from './pages/FreeLearningPage';
import { lookupPinyinForHanzi } from './pages/FlashcardPageV3';
import LevelBilanPage from './pages/LevelBilanPage';
import LevelBilanBanner from './components/LevelBilanBanner';
// BilanIndexPage retiré de la sidebar — le banner cecr utilise directement
// LevelBilanPage via `bilanLevel`.
import { useLessonMastery } from './hooks/useLessonMastery';
import { useLevelBilans } from './hooks/useLevelBilans';
import { usePersonalFlashcards } from './hooks/usePersonalFlashcards';
import type { CecrLevelSlug } from './types/simulator';
import type { LessonMasteryMap } from './types/review-v3';
import type { BilanCompletionMap } from './types/bilan';
import type { SentenceFlashcard } from './types/flashcard-v3';
// --- Pages V1 conservées (pas de variante V2 à ce jour) --------------------
// CPlayerPage : lazy-loadé pour ne pas charger opencc-js (~80 Ko) dans
// le bundle initial. Seuls les utilisateurs qui ouvrent CPlayer paient.
const CPlayerPage = lazy(() => import('./pages/CPlayerPage'));
import LessonPage from './pages/LessonPage';
import LessonPathsPage from './pages/LessonPathsPage';
import QuizPage from './pages/QuizPage';
// V7 — ReviewPage (V1) a été remplacé par ReviewPageV3 (voir plus haut).
import ThemePage from './pages/ThemePage';
// Dictionnaire CFDICT — hub + niveau + fiche détail. Réintégré V10 pour
// permettre à "Vocabulaire" de la recherche globale de pointer vers la fiche
// dictionnaire (au lieu d'ouvrir la leçon parente).
import DictionaryPage from './pages/DictionaryPage';
import DictionaryLevelPage from './pages/DictionaryLevelPage';
import DictionaryEntryPage from './pages/DictionaryEntryPage';
import type { DictionaryLevel } from './types/dictionary';
import AssistancePage from './pages/AssistancePage';
import DictationGamePage from './pages/DictationGamePage';
import SettingsPage from './pages/SettingsPage';
import SubscriptionPage from './pages/SubscriptionPage';
import ProfilePage from './pages/ProfilePage';
import MiniGamesPage from './pages/MiniGamesPage';
import CulturePage from './pages/CulturePage';
// V9.6 — Overlay d'harmonisation des en-têtes. Importé APRÈS toutes les pages
// pour que son ordre dans le bundle Vite soit le DERNIER et prime sur les
// styles scopés de chaque page V2.
import './styles/page-shell.css';
import LanguageSwitcher from './components/LanguageSwitcher';
import AIFloatingChat from './components/AIFloatingChat';
import InteractiveGridBackground from './components/InteractiveGridBackground';
import LifetimeFeatureGate from './components/LifetimeFeatureGate';
import { generateGeminiResponse, generateGeminiResponseWithCorrections } from './services/geminiService';
import type { ErrorCategory, ErrorSeverity } from './types/error-journal';
import WritingCorrectorPage from './pages/WritingCorrectorPage';
import ConversationPartnerPage from './pages/ConversationPartnerPage';
import AiQuizPage from './pages/AiQuizPage';
import PronunciationCoachPage from './pages/PronunciationCoachPage';
import FloatingTimer from './components/FloatingTimer';
import { StreakMilestoneToast } from './components/StreakBonus';
import XpBonusToast from './components/XpBonusToast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationsProvider, useNotifications } from './contexts/NotificationsContext';
import NotificationToasts from './components/NotificationToasts';
import AppTopBar from './components/AppTopBar';
import './styles/app-topbar.css';
import './styles/responsive-app.css';
import { useChatConversations } from './hooks/useChatConversations';
import { useNotificationEvents } from './hooks/useNotificationEvents';
import LoginModal from './components/Auth/LoginModal';
import UserProfile from './components/Auth/UserProfile';
import { useLessonProgress } from './hooks/useLessonProgress';
import { useLearningStats } from './hooks/useLearningStats';
import { useFirestoreSync } from './hooks/useFirestoreSync';
import { useWordSRS } from './hooks/useWordSRS';
import { useQuizEngine } from './hooks/useQuizEngine';
import { useEntitlements } from './hooks/useEntitlements';
import { useUserProfileSync } from './hooks/useUserProfileSync';
import { useLeaderboard } from './hooks/useLeaderboard';
import { useAnnouncementsRead } from './hooks/useAnnouncementsRead';
import { getThemeSummaries, getLessonById, getLessonsByHanziList } from './data/lessons';
import { lessonPaths } from './data/lesson-paths';
import { level1LessonPaths, level1LessonWordBank } from './data/level1-course';
import { level2LessonPaths } from './data/level2-course';
import { cecrLessonPaths, cecrLevels } from './data/cecr-course';
import { attachDialoguesAndReadingsToCecrPaths } from './data/cecr-dialogue-reading-attach';

// Enrichit les modules CECR sélectionnés avec un dialogue / une lecture
// (cf. src/data/cecr-dialogue-reading-attach.ts). Appel unique au chargement
// du module : les contenus restent une source unique (dialogues.ts / readings.ts)
// et sont partagés entre les pages standalone et StructuredLessonPageV2.
attachDialoguesAndReadingsToCecrPaths(cecrLessonPaths);
import { getSimpleLessonById } from './data/simple-lessons';
import { getGrammarLessonById } from './data/grammar-lessons';
import { getCopy, type Language } from './i18n';
import { useCustomLists } from './hooks/useCustomLists';
import { useDashboardState } from './hooks/useDashboardState';
import { useDailyGoals } from './hooks/useDailyGoals';
import { useBattleStats } from './hooks/useBattleStats';
import { useBattleMatchmaking } from './hooks/useBattleMatchmaking';
import { usePublicProfileSync } from './hooks/usePublicProfileSync';
import { buildBattleWordPool, FALLBACK_BATTLE_POOL } from './utils/battleWords';
import { loadDialogueManifest, type DialogueAudioManifest } from './utils/dialogue-audio';
import { getWeekStart } from './types/community';
import type { BattleMatch } from './types/community';
import type { BattleWordSourceItem } from './utils/battleWords';
import { createCheckoutSession, createPortalSession } from './services/payments';
import { buildAppAccess, applyDevMode } from './utils/access';
import { useDevMode } from './hooks/useDevMode';
import DevModeToggle from './components/DevModeToggle';
import { buildDevBotPublicProfile, isDevBotMatch, DEV_BOT_PLAYER } from './utils/devBot';
import { playAudioWithFallback } from './utils/audio';
import { numericPinyinToToned } from './utils/pinyinTones';
import {
  lessonModuleToV2,
  lessonItemToFlashcardV2,
  DEFAULT_ANNOUNCEMENTS,
  DEFAULT_CHALLENGES,
  DEFAULT_LEADERBOARD
} from './utils/v2-mappers';
import type { LessonPath, LessonModule } from './types/lesson-structure';
import type { LessonItem } from './types';

export type View =
  | 'home'
  | 'cplayer'
  | 'lesson'
  | 'review'
  | 'themes'
  | 'culture'
  | 'assistant'
  | 'subscription'
  | 'settings'
  | 'games'
  | 'flashcards'
  | 'free-learning'
  // Nouveaux écrans V2
  | 'tutor'
  | 'drills'
  | 'evaluation'
  // Atelier libre : entraînement prononciation + écriture sur la source
  // de son choix (flashcards perso ou liste libre)
  | 'atelier'
  // Phase 1B IA — correcteur d'écriture (Gemini structuré)
  | 'writing-corrector'
  // Phase 2 IA — partenaire de conversation (Gemini joue un rôle, scénarios)
  | 'conversation-partner'
  // Phase 3B IA — générateur de quiz personnalisés
  | 'ai-quiz'
  // Phase 4 IA — coach de prononciation (Gemini multimodal audio, archi swappable)
  | 'pronunciation-coach'
  | 'community'
  | 'ideas'
  | 'messages'
  | 'errors'
  | 'battles'
  | 'battleSession'
  | 'battleSessionLocal'
  | 'leaderboard'
  | 'dialogue'
  | 'reading'
  | 'simulator'
  // Refonte CECR — unique taxonomie d'apprentissage exposée à l'utilisateur.
  // Les fichiers HSK (lessonPaths, level1-course, level2-course) restent sur
  // disque et servent de pool de vocabulaire pour cecr-course.ts, mais
  // ne sont plus accessibles via la navigation.
  | 'cecr'
  // V7 — Bilan de fin de niveau (10 questions, 80% requis, +60 XP one-time).
  | 'bilan'
  // Profil utilisateur (clic sur le nom dans la sidebar).
  | 'profile'
  // V10 — Dictionnaire CFDICT (hub + niveau + fiche détail).
  | 'dictionary'
  | 'dictionary-level'
  | 'dictionary-entry';

const themeSummaries = getThemeSummaries();
const defaultTheme = themeSummaries[0]?.theme ?? null;
const COMPLETED_LESSONS_KEY = 'cl_completed_lessons';
const DAILY_GOAL_MINUTES_DEFAULT = 10;

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

const mergeStructuredPaths = (paths: LessonPath[]): LessonPath[] => {
  const withoutLevel1And2 = paths
    .map((path) => ({
      ...path,
      lessons: path.lessons.filter((lesson) => lesson.hskLevel !== 1 && lesson.hskLevel !== 2)
    }))
    .filter((path) => path.lessons.length > 0);

  return [...level1LessonPaths, ...level2LessonPaths, ...withoutLevel1And2];
};

/** Seuil de réussite pour débloquer la leçon suivante dans une section. */
const LESSON_UNLOCK_THRESHOLD = 80;

/**
 * Construit l'état d'un ensemble de parcours avec 3 couches de verrouillage :
 *  1. Abonnement (`hasFullLessonAccess` / `hsk1LessonLimit`)
 *  2. Niveau CECR (`unlockedLevels`) — si le niveau n'est pas débloqué, toutes
 *     ses leçons sont lockées.
 *  3. Progression 80% séquentielle intra-section : la 1ère leçon est toujours
 *     accessible si les couches 1 et 2 le permettent ; la Nième ne l'est que
 *     si la (N-1)ème est `completed` OU a un dernier score ≥ 80. Rétrocompat :
 *     les leçons `completedLessons` existantes débloquent la suivante même
 *     sans entrée dans `masteryMap`.
 */
const buildLessonPathsState = (
  paths: LessonPath[],
  completedIds: string[],
  hasFullLessonAccess: boolean,
  hsk1LessonLimit: number,
  options?: {
    masteryMap?: LessonMasteryMap;
    unlockedLevels?: Set<CecrLevelSlug>;
    /** Retourne le niveau CECR d'un pathId (pour appliquer la couche 2). */
    levelOfPath?: (pathId: string) => CecrLevelSlug | null;
    /**
     * DEV mode (admin uniquement — cf. useDevMode) : court-circuite TOUTES
     * les couches de verrouillage. Chaque leçon est renvoyée avec
     * `locked: false`, la progression/bilan restent trackés mais n'imposent
     * plus rien.
     */
    devMode?: boolean;
  }
) => {
  const completedSet = new Set(completedIds);
  const masteryMap = options?.masteryMap ?? {};
  const devMode = options?.devMode === true;
  let unlockedHsk1Count = 0;
  return paths.map((path) => {
    const levelSlug = options?.levelOfPath ? options.levelOfPath(path.id) : null;
    // Si on a une info de niveau ET un set de niveaux débloqués : on respecte.
    // Sinon on considère que la couche 2 n'impose rien (path HSK, ou cecr sans
    // meta).
    const levelUnlocked =
      levelSlug && options?.unlockedLevels ? options.unlockedLevels.has(levelSlug) : true;

    // Premier passage : calcule la couche 1 (abonnement) pour chaque leçon.
    const subscriptionUnlocked: boolean[] = path.lessons.map((lesson) => {
      if (devMode) return true;
      if (hasFullLessonAccess) return true;
      if (lesson.hskLevel === 1 && unlockedHsk1Count < hsk1LessonLimit) {
        unlockedHsk1Count += 1;
        return true;
      }
      return false;
    });

    // Deuxième passage : cascade de la couche 3 (progression 80% intra-section).
    let progressionOpen = true;
    const lessons = path.lessons.map((lesson, idx) => {
      const completed = completedSet.has(lesson.id);
      let unlocked = subscriptionUnlocked[idx];
      if (!devMode && !levelUnlocked) unlocked = false;
      if (!devMode && !progressionOpen) unlocked = false;
      if (devMode) unlocked = true;

      // Cette leçon passe-t-elle le seuil pour débloquer la SUIVANTE ?
      // Rétrocompat : completed (legacy) suffit, même sans mastery.
      const recent = masteryMap[lesson.id]?.recentScores ?? [];
      const lastScore = recent.length > 0 ? recent[recent.length - 1] : 0;
      const passedThreshold = completed || lastScore >= LESSON_UNLOCK_THRESHOLD;
      if (!passedThreshold) {
        progressionOpen = false;
      }

      return {
        ...lesson,
        completed,
        locked: !unlocked
      };
    });
    return { ...path, lessons };
  });
};

// NB : les fonctions plain `readLearningStats` / `applyLearningSession` ont été
// remplacées par le hook `useLearningStats` qui regroupe streak / daily minutes
// / total minutes / lastLearningDate dans un seul blob Firestore-synchronisé
// (clé 'cl_learning_stats_v1'). Cela permet à un même compte d'afficher la
// même progression sur Chrome et Safari.

function App() {
  const { user, signOut } = useAuth();
  useUserProfileSync();
  const { entitlements, loading: entitlementsLoading } = useEntitlements();
  // Vue initiale : ouvre la SubscriptionPage si l'utilisateur arrive avec :
  //   - ?plan=monthly|lifetime (lien depuis le site marketing)
  //   - pathname /subscription (redirection retour Stripe Checkout — success ou cancel)
  //   - ?status=success|cancelled (retour Stripe legacy)
  const [view, setView] = useState<View>(() => {
    if (typeof window === 'undefined') return 'home';
    try {
      const params = new URLSearchParams(window.location.search);
      const plan = params.get('plan');
      const status = params.get('status');
      const path = window.location.pathname;
      if (
        plan === 'lifetime' ||
        plan === 'monthly' ||
        status === 'success' ||
        status === 'cancelled' ||
        path === '/subscription' ||
        path.startsWith('/subscription/')
      ) {
        return 'subscription';
      }
    } catch { /* ignore */ }
    return 'home';
  });
  const [language, setLanguage] = useState<Language>('fr');
  const [darkMode, setDarkMode] = useState(false);
  const colorTheme = 'asian-red';
  const [selectedLesson, setSelectedLesson] = useState<{ pathId: string; lessonId: string } | null>(null);
  const [logoErrored, setLogoErrored] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  // Drawer sidebar — fermé par défaut, ouvert via bouton hamburger en mobile.
  // En desktop (>1024px), le CSS masque l'effet drawer et la sidebar reste visible.
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);
  // Sidebar rétractée (desktop) : version icons-only avec logo_court. Persisté
  // en localStorage pour que l'utilisateur retrouve son préférence d'écran.
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return window.localStorage.getItem('xl_sidebar_collapsed') === '1';
    } catch {
      return false;
    }
  });
  const toggleSidebarCollapsed = useCallback(() => {
    setSidebarCollapsed((v) => {
      const next = !v;
      try {
        window.localStorage.setItem('xl_sidebar_collapsed', next ? '1' : '0');
      } catch {
        /* quota plein, ignore */
      }
      return next;
    });
  }, []);
  // Ferme automatiquement le drawer quand on change de vue (utile mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [view]);
  const copy = getCopy(language);
  const [focusedTheme, setFocusedTheme] = useState<string | null>(defaultTheme);
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => readCompletedLessons());
  // Set mémoisé pour passer aux pages enfants — sans ça `new Set(...)` à
  // chaque render leur ferait perdre toute leur mémoisation (pickLessonsForMode
  // re-shuffle, useMemos invalidés, etc.).
  const completedLessonsSet = useMemo(
    () => new Set(completedLessons),
    [completedLessons]
  );
  // Sync Firestore pour la liste des leçons complétées : quand l'utilisateur
  // travaille sur Chrome puis rouvre Safari (même compte), il retrouve ses
  // leçons terminées. Le onSnapshot callback met à jour le state local.
  const { saveToFirestore: saveCompletedLessons } = useFirestoreSync(
    COMPLETED_LESSONS_KEY,
    (data) => {
      if (Array.isArray(data)) {
        setCompletedLessons((prev) => {
          // Union : on ne veut pas qu'un snapshot cloud vide écrase une liste
          // locale non-vide (cas du premier log-in sur un navigateur vierge).
          const merged = new Set<string>([...prev, ...data]);
          if (merged.size === prev.length) return prev;
          return Array.from(merged);
        });
      }
    }
  );
  // Hook unifié pour streak / minutes / daily activity (sync Firestore).
  const { learningStats, applyLearningSession: applyLearningSessionSync } =
    useLearningStats();
  // Toggle DEV/PROD (admin NoComment uniquement — cf. useDevMode).
  const devMode = useDevMode();
  const appAccess = useMemo(() => {
    const base = buildAppAccess(user, entitlements?.app ?? null);
    return devMode.isActive ? applyDevMode(base) : base;
  }, [user, entitlements, devMode.isActive]);

  // V10 — Trial gate supprimé : on n'envoie plus l'utilisateur directement
  // sur la SubscriptionPage en début de session pour tier='free'. À la place,
  // un badge "Premium" est affiché dans AppTopBar à côté du level pill et
  // de la cloche — il navigue vers la SubscriptionPage au clic. C'est moins
  // intrusif (l'utilisateur reste sur l'accueil) tout en gardant le rappel
  // visible en permanence.
  const mergedLessonPaths = useMemo(() => mergeStructuredPaths(lessonPaths), []);

  // Hooks de maîtrise / bilans montés ICI (et pas plus bas comme avant) car
  // `buildLessonPathsState` en dépend pour calculer le verrouillage 80%.
  // Le callback `onFirstPass` a besoin de `dashboardState.awardXp` qui n'est
  // déclaré qu'après → on utilise un ref mis à jour par un useEffect plus bas.
  const awardXpRef = useRef<(xp: number) => void>(() => undefined);
  const lessonMastery = useLessonMastery({ syncEnabled: appAccess.syncEnabled });
  const levelBilans = useLevelBilans({
    onFirstPass: (_level, xp) => awardXpRef.current(xp)
  });

  // Map pathId → niveau CECR, pour déterminer quelle section appartient à
  // quel niveau lors du calcul du gate.
  const levelOfPath = useMemo(() => {
    const map = new Map<string, CecrLevelSlug>();
    for (const meta of cecrLevels) {
      for (const pathId of meta.pathIds) {
        map.set(pathId, meta.level as CecrLevelSlug);
      }
    }
    return map;
  }, []);
  const getLevelOfPath = useCallback(
    (pathId: string) => levelOfPath.get(pathId) ?? null,
    [levelOfPath]
  );

  // Niveaux CECR débloqués :
  //  - a1 toujours ouvert
  //  - niveau N ouvert si bilan de N-1 est `passed` (≥80% ou legacyRecognized)
  //    OU si l'utilisateur a déjà une leçon complétée dans N (rétrocompat).
  //  - Mode DEV : tous les niveaux sont ouverts d'office.
  const unlockedLevels = useMemo(() => {
    const set = new Set<CecrLevelSlug>();
    const sorted = [...cecrLevels].sort((a, b) => a.order - b.order);

    if (devMode.isActive) {
      sorted.forEach((meta) => set.add(meta.level as CecrLevelSlug));
      return set;
    }

    const completedSet = new Set(completedLessons);
    const hasCompletedInLevel = (meta: (typeof cecrLevels)[number]): boolean =>
      meta.pathIds.some((pathId) => {
        const path = cecrLessonPaths.find((p) => p.id === pathId);
        return path?.lessons.some((l) => completedSet.has(l.id)) ?? false;
      });

    // Premier niveau toujours ouvert.
    if (sorted.length > 0) set.add(sorted[0].level as CecrLevelSlug);
    for (let i = 1; i < sorted.length; i += 1) {
      const prev = sorted[i - 1];
      const current = sorted[i];
      const prevBilan = levelBilans.bilans[prev.level as CecrLevelSlug];
      const prevPassed = prevBilan?.passed === true;
      if (prevPassed || hasCompletedInLevel(current)) {
        set.add(current.level as CecrLevelSlug);
      }
    }
    return set;
  }, [levelBilans.bilans, completedLessons, devMode.isActive]);

  const lessonPathsState = useMemo(
    () =>
      buildLessonPathsState(
        mergedLessonPaths,
        completedLessons,
        appAccess.canAccessAllLessons,
        appAccess.hsk1LessonLimit,
        {
          masteryMap: lessonMastery.masteryMap,
          unlockedLevels,
          levelOfPath: getLevelOfPath,
          devMode: devMode.isActive
        }
      ),
    [
      mergedLessonPaths,
      completedLessons,
      appAccess.canAccessAllLessons,
      appAccess.hsk1LessonLimit,
      lessonMastery.masteryMap,
      unlockedLevels,
      getLevelOfPath,
      devMode.isActive
    ]
  );
  // Parcours CECR — taxonomie exposée à l'utilisateur. `lessonPathsState` (HSK)
  // reste calculé pour servir de pool de vocabulaire et de résolveur fallback
  // pour les ids de leçons hérités d'anciennes sessions. Les deux partagent
  // buildLessonPathsState pour unlock / completion tracking.
  const cecrPathsState = useMemo(
    () =>
      buildLessonPathsState(
        cecrLessonPaths,
        completedLessons,
        appAccess.canAccessAllLessons,
        appAccess.hsk1LessonLimit,
        {
          masteryMap: lessonMastery.masteryMap,
          unlockedLevels,
          levelOfPath: getLevelOfPath,
          devMode: devMode.isActive
        }
      ),
    [
      completedLessons,
      appAccess.canAccessAllLessons,
      appAccess.hsk1LessonLimit,
      lessonMastery.masteryMap,
      unlockedLevels,
      getLevelOfPath,
      devMode.isActive
    ]
  );
  const lessonProgress = useLessonProgress(3, 6, { syncEnabled: appAccess.syncEnabled });
  // SRS par mot (alimente dueIds/masteredIds/difficultIds + onRate pour V5)
  const wordSrs = useWordSRS({ syncEnabled: appAccess.syncEnabled });
  const completedLessonWordPool = useMemo<LessonItem[]>(() => {
    const lessonsById = new Map(
      [
        ...lessonPathsState.flatMap((path) => path.lessons),
        ...cecrPathsState.flatMap((path) => path.lessons)
      ].map((lesson) => [lesson.id, lesson])
    );
    const seen = new Set<string>();
    const items: LessonItem[] = [];

    const pushUnique = (word: LessonItem | undefined) => {
      if (!word || seen.has(word.id)) return;
      seen.add(word.id);
      items.push(word);
    };

    completedLessons.forEach((lessonId) => {
      const level1Words = level1LessonWordBank[lessonId];
      if (level1Words && level1Words.length > 0) {
        level1Words.forEach((word) => pushUnique(word));
        return;
      }

      const simpleLesson = getSimpleLessonById(lessonId);
      if (simpleLesson?.customWords && simpleLesson.customWords.length > 0) {
        simpleLesson.customWords.forEach((word) => pushUnique(word));
        return;
      }
      if (simpleLesson?.words && simpleLesson.words.length > 0) {
        getLessonsByHanziList(simpleLesson.words).forEach((word) => pushUnique(word));
        return;
      }

      const lesson = lessonsById.get(lessonId);
      if (!lesson) return;
      lesson.flashcards.forEach((identifier) => {
        const grammarWord = getGrammarLessonById(identifier);
        if (grammarWord) {
          pushUnique(grammarWord);
          return;
        }

        const byId = getLessonById(identifier);
        if (byId) {
          pushUnique(byId);
          return;
        }

        const byHanzi = getLessonsByHanziList([identifier])[0];
        if (byHanzi) {
          pushUnique(byHanzi);
        }
      });
    });

    return items;
  }, [completedLessons, lessonPathsState, cecrPathsState]);
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
  // Détermine la prochaine leçon CECR à reprendre : première leçon non-complétée
  // et non-verrouillée dans le premier parcours CECR qui en contient une. Sinon
  // on retombe sur le pool HSK (lessonPathsState). Le hanzi du mot SRS courant
  // n'est PAS un titre de leçon (confusion historique entre LessonItem "mot"
  // et LessonModule "module pédagogique").
  const nextLessonToResume = useMemo(() => {
    const scan = [...cecrPathsState, ...lessonPathsState];
    for (const path of scan) {
      const next = path.lessons.find((lesson) => !lesson.completed && !lesson.locked);
      if (next) {
        const title = language === 'fr' ? next.title : next.titleEn || next.title;
        return { id: next.id, title };
      }
    }
    return null;
  }, [cecrPathsState, lessonPathsState, language]);
  // V11 — Objectifs quotidiens personnalisables (Réglages → Apprentissage).
  // Si l'utilisateur n'a rien custom, on retombe sur les défauts historiques
  // (50 XP, 10 min). Les targets cards/lessons à 0 = pas d'objectif quantifié.
  const dailyGoalsHook = useDailyGoals();
  const dashboardState = useDashboardState({
    dueCardsCount: lessonProgress.reviewItems.length,
    nextLessonTitle: nextLessonToResume?.title,
    nextLessonId: nextLessonToResume?.id,
    xpDailyTarget: dailyGoalsHook.goals.xpTarget
  });

  // --- Centre de notifications — push() d'événements dérivés de l'état ------
  // Bataille est pushé directement depuis handleMatchEnded ; ici on ne câble
  // que les événements qui dérivent uniquement de dashboardState / SRS.
  const notifications = useNotifications();
  useNotificationEvents({
    language: language === 'en' ? 'en' : 'fr',
    totalXp: dashboardState.xp.xp,
    level: dashboardState.xp.level,
    streakCurrent: dashboardState.streak.current,
    lastMilestoneAward: dashboardState.bonus.lastMilestoneAward,
    lastDailyBonusAt: dashboardState.bonus.lastDailyBonusAt,
    dueSrsCount: lessonProgress.reviewItems.length,
    isAuthed: !!user
  });
  // `learningStats` vient maintenant du hook useLearningStats déclaré plus haut
  // (sync Firestore). L'ancien setLearningStats impératif est remplacé par
  // `applyLearningSessionSync` qui maj directement l'état interne du hook.
  const topThemes = themeSummaries.slice(0, 4);

  // --- V7 hooks : SRS par leçon, bilans de niveau, flashcards perso -------
  // (useLessonMastery et useLevelBilans sont instanciés plus haut car leurs
  //  données alimentent le gating 80% de `buildLessonPathsState`.)
  // Sync du ref `awardXpRef` vers le vrai awardXp une fois dashboardState monté
  // — ainsi le onFirstPass du bilan peut verser les XP correctement.
  useEffect(() => {
    awardXpRef.current = dashboardState.awardXp;
  }, [dashboardState.awardXp]);
  const personalFlashcards = usePersonalFlashcards({
    syncEnabled: appAccess.syncEnabled,
    lookupPinyin: lookupPinyinForHanzi
  });
  // Sélection en cours pour la page Bilan (niveau CECR à passer).
  const [bilanLevel, setBilanLevel] = useState<CecrLevelSlug | null>(null);

  // V10 — État courant des routes dictionnaire.
  //  - `dictionaryLevel`  : niveau ouvert dans la liste (hsk1..hsk7, hors-hsk)
  //  - `dictionaryEntryId`: id d'entrée pour la fiche détail (ex: 'hsk1-0001')
  //  - `dictionaryEntryHanzi` : fallback brut quand on arrive par la recherche
  //    globale (vocab hit), résolu côté DictionaryEntryPage via findEntryByHanzi.
  const [dictionaryLevel, setDictionaryLevel] = useState<DictionaryLevel | null>(null);
  const [dictionaryEntryId, setDictionaryEntryId] = useState<string | null>(null);
  const [dictionaryEntryHanzi, setDictionaryEntryHanzi] = useState<string | null>(null);

  // --- Batailles (task #44) ------------------------------------------------
  // État du match actif (matchId Firestore). Quand matchId est posé, on
  // navigue automatiquement sur la page 'battleSession'. Reset à null après
  // la fin d'une partie ou si l'user retourne au hub.
  const [activeMatchId, setActiveMatchId] = useState<string | null>(null);

  // DEV — Match local contre le bot (task #56, option 3). Stocke le BattleMatch
  // complet en state React ; aucun write Firestore. Utilisé exclusivement quand
  // l'admin clique sur "Défier le bot (DEV)". Reset à null après fin / retour.
  const [localBotMatch, setLocalBotMatch] = useState<BattleMatch | null>(null);

  // Stats locales (compteurs + historique 20 dernières parties) — sync
  // Firestore interne.
  const battleStats = useBattleStats();

  // Pool de vocabulaire utilisable en bataille. On privilégie :
  //   1. completedLessonWordPool (items des leçons complétées)
  //   2. fallback HSK1 embarqué si encore < 10 mots (première connexion).
  const battleWordSources = useMemo<BattleWordSourceItem[]>(() => {
    const mapped: BattleWordSourceItem[] = completedLessonWordPool.map((item) => ({
      id: item.id,
      hanzi: item.hanzi,
      pinyin: item.pinyin,
      translation: item.translationFr || item.translation,
      translationEn: item.translation,
      theme: item.theme,
      category: item.category
    }));
    // Si l'user a moins de 10 mots distincts (première connexion ou très
    // peu de leçons faites), on complète avec le pool de fallback HSK1
    // pour que la bataille reste jouable en démo.
    if (mapped.length < 10) {
      const existingHanzi = new Set(mapped.map((m) => m.hanzi));
      for (const fb of FALLBACK_BATTLE_POOL) {
        if (!existingHanzi.has(fb.hanzi)) mapped.push(fb);
        if (mapped.length >= 30) break;
      }
    }
    return mapped;
  }, [completedLessonWordPool]);

  // Langue communauté (fr/en aligné sur la langue UI).
  const communityLanguage = language === 'en' ? 'en' : 'fr';

  // XP de la semaine ISO en cours (dérivé de dashboardState.activity =
  // {YYYY-MM-DD: xp}). On reconstruit la date de lundi UTC puis on somme tous
  // les jours >= cette date. Pur dérivé — aucun stockage dédié.
  const weeklyXpStats = useMemo(() => {
    const weekStart = getWeekStart();
    const activity = dashboardState.activity ?? {};
    let weekly = 0;
    for (const [date, xp] of Object.entries(activity)) {
      if (date >= weekStart) weekly += Math.max(0, Number(xp) || 0);
    }
    return { weeklyXp: weekly, weekStart };
  }, [dashboardState.activity]);

  // Sync du profil public Firestore — alimente leaderboard + matchmaking.
  usePublicProfileSync({
    totalXp: dashboardState.xp.xp,
    streakCurrent: dashboardState.streak.current,
    streakBest: dashboardState.streak.best,
    vocabSize: wordSrs.masteredIds.size,
    lessonsCompleted: completedLessons.length,
    weeklyXp: weeklyXpStats.weeklyXp,
    weekStart: weeklyXpStats.weekStart,
    battlesPlayed: battleStats.stats.played,
    battlesWon: battleStats.stats.won,
    battlesDraw: battleStats.stats.draw,
    language: communityLanguage
  });

  // Matchmaking (queue + transaction de match). Le callback onMatchFound
  // propulse l'user sur la page 'battleSession' dès qu'un adversaire est
  // trouvé côté Firestore. `buildWordPool` n'est appelé qu'à la création du
  // match (par l'initiateur de la transaction), d'où la closure.
  const battleMatchmaking = useBattleMatchmaking({
    buildWordPool: () => {
      const pool = buildBattleWordPool(battleWordSources, {
        language: communityLanguage,
        maxWords: 10
      });
      return pool;
    },
    language: communityLanguage,
    vocabLevel: completedLessons.length,
    onMatchFound: (matchId) => {
      setActiveMatchId(matchId);
      setView('battleSession');
    }
  });

  // Helper : démarre la queue et bascule l'UI sur "en recherche".
  const handleStartBattle = useCallback(() => {
    void battleMatchmaking.startQueue();
  }, [battleMatchmaking]);

  // Helper : annule la queue manuellement.
  const handleCancelBattleQueue = useCallback(() => {
    void battleMatchmaking.cancelQueue();
  }, [battleMatchmaking]);

  // DEV : lance une bataille 100% locale contre le bot (admin uniquement).
  // Aucun write Firestore — tout le state vit dans `localBotMatch` + le hook
  // `useLocalBotSession`. Résilient au quota / offline.
  const handleStartBotBattle = useCallback(() => {
    if (!user) {
      console.warn('[bot] user not connected — cannot start bot match');
      return;
    }
    // Si une queue Firestore est en cours, on la cancel d'abord pour éviter
    // qu'un vrai match arrive pendant qu'on joue le bot.
    if (battleMatchmaking.status === 'queueing') {
      void battleMatchmaking.cancelQueue();
    }

    // Pool de mots : pool user, fallback HSK1 si < 10 (première connexion).
    let words = buildBattleWordPool(battleWordSources, {
      language: communityLanguage,
      maxWords: 10
    });
    if (words.length < 10) {
      words = buildBattleWordPool(FALLBACK_BATTLE_POOL, {
        language: communityLanguage,
        maxWords: 10
      });
    }
    if (words.length < 10) {
      console.warn('[bot] cannot build 10-word pool, aborting');
      return;
    }

    const id = `__devbot_local_${Date.now()}`;
    const match: BattleMatch = {
      id,
      status: 'active',
      p1: {
        uid: user.uid,
        displayName:
          user.displayName || user.email?.split('@')[0] || 'Apprenant',
        photoURL: user.photoURL || null
      },
      p2: DEV_BOT_PLAYER,
      words: words.slice(0, 10),
      p1Answers: [],
      p2Answers: [],
      p1Score: 0,
      p2Score: 0,
      winner: null,
      startedAt: Date.now(),
      finishedAt: null,
      language: communityLanguage
    };

    setLocalBotMatch(match);
    setView('battleSessionLocal');
  }, [user, battleMatchmaking, battleWordSources, communityLanguage]);

  // DEV : profil bot injecté dans le classement côté client (pas de write
  // Firestore). Recomposé si la langue communautaire change.
  const devBotProfiles = useMemo(
    () => (devMode.isActive ? [buildDevBotPublicProfile(communityLanguage)] : []),
    [devMode.isActive, communityLanguage]
  );

  // Classement live — alimente le badge "#N" à côté de l'entrée Classement
  // dans la sidebar. La même souscription est ré-utilisée par LeaderboardPage
  // (Firestore SDK dédupe les snapshots côté client, pas de double-coût).
  const sidebarLeaderboard = useLeaderboard({ injectExtra: devBotProfiles });
  const myRankPosition = sidebarLeaderboard.mePositions.totalXp;

  // Annonces : compteur non-lues pour le badge "Annonces".
  const announcementsRead = useAnnouncementsRead({
    syncEnabled: appAccess.syncEnabled
  });
  const unreadAnnouncements = announcementsRead.unreadCount(DEFAULT_ANNOUNCEMENTS);

  // Helper : fin de partie — enregistre le résultat dans les stats locales +
  // sync Firestore, verse l'XP correspondant dans dashboardState.
  const handleMatchEnded = useCallback(
    (payload: {
      match: BattleMatch;
      outcome: 'win' | 'loss' | 'draw';
      xp: number;
      perfect: boolean;
      myScore: number;
      oppScore: number;
    }) => {
      if (!user) return;
      // DEV : les matchs contre le bot ne doivent PAS polluer les stats réelles
      // ni verser de l'XP — sinon le compte admin accumule des victoires fictives.
      if (isDevBotMatch(payload.match)) return;
      battleStats.recordBattleResult(
        payload.match,
        user.uid,
        payload.outcome,
        payload.xp,
        payload.perfect
      );
      if (payload.xp > 0) {
        dashboardState.awardXp(payload.xp, 'battleEnded');
      }
      // --- Notification centre de notifications -------------------------------
      // On push le résultat de la bataille. Icône + teinte varient selon issue.
      const oppSnap = payload.match.p1.uid === user.uid ? payload.match.p2 : payload.match.p1;
      const oppName = oppSnap.displayName || (language === 'fr' ? 'un adversaire' : 'an opponent');
      const isFr = language === 'fr';
      let title: string;
      let body: string;
      let icon: string;
      if (payload.outcome === 'win') {
        icon = payload.perfect ? '👑' : '🏆';
        title = isFr
          ? payload.perfect
            ? `Victoire parfaite contre ${oppName} !`
            : `Victoire contre ${oppName} !`
          : payload.perfect
            ? `Flawless win vs ${oppName}!`
            : `Win vs ${oppName}!`;
        body = isFr
          ? `Score ${payload.myScore}–${payload.oppScore} · +${payload.xp} XP`
          : `Score ${payload.myScore}–${payload.oppScore} · +${payload.xp} XP`;
      } else if (payload.outcome === 'draw') {
        icon = '🤝';
        title = isFr ? `Match nul avec ${oppName}` : `Draw with ${oppName}`;
        body = isFr
          ? `Score ${payload.myScore}–${payload.oppScore} · +${payload.xp} XP`
          : `Score ${payload.myScore}–${payload.oppScore} · +${payload.xp} XP`;
      } else {
        icon = '💥';
        title = isFr ? `Défaite contre ${oppName}` : `Loss vs ${oppName}`;
        body = isFr
          ? `Score ${payload.myScore}–${payload.oppScore} · la revanche t'attend !`
          : `Score ${payload.myScore}–${payload.oppScore} · time for a rematch!`;
      }
      notifications.push({
        kind: 'battle',
        icon,
        title,
        body,
        dedupKey: `battle-${payload.match.id}`,
        link: { kind: 'view', view: 'battles' }
      });
    },
    [user, battleStats, dashboardState, notifications, language]
  );

  // --- État AI Tutor (messages contrôlés côté parent) ----------------------
  // L'historique des conversations Prof. Xiao est persisté en localStorage via
  // useChatConversations. Quand l'utilisateur poste un message, on met à jour
  // `tutorMessages` localement puis on sync vers le hook (upsert).
  const tutorConvs = useChatConversations();
  // Carnet d'erreurs : count des fautes non-verrouillées (pour le badge sidebar).
  const errorJournal = useErrorJournal();
  const [tutorMessages, setTutorMessages] = useState<AiTutorV2Message[]>([]);
  const [tutorTyping, setTutorTyping] = useState(false);
  /** Texte pré-rempli dans le composer du Prof. Xiao depuis la recherche
   *  globale ("Poser à Prof. Xiao : <query>"). Consommé puis effacé par
   *  AiTutorPageV2 au prochain render. */
  const [tutorInitialDraft, setTutorInitialDraft] = useState<string | null>(null);
  const [tutorMode, setTutorMode] = useState<AiTutorV2Mode>('balanced');

  // Quand l'utilisateur sélectionne une conversation depuis la sidebar,
  // recharger ses messages dans l'état local.
  useEffect(() => {
    setTutorMessages(tutorConvs.currentMessages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorConvs.currentConvId]);

  // Quand `tutorMessages` change, propager vers le hook (qui persiste).
  // Ignore les états vides pour ne pas écraser une conv existante au mount.
  useEffect(() => {
    if (tutorMessages.length === 0) return;
    tutorConvs.upsertCurrentMessages(tutorMessages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorMessages]);

  // Hints injectés en préambule du message utilisateur pour orienter le ton
  // de la réponse Gemini selon le mode choisi (Strict / Équilibré / Joueur).
  // Volontairement court et discret — le SYSTEM_INSTRUCTION du service Gemini
  // (qui restreint au domaine "chinois") reste prioritaire ; on n'altère que
  // le registre.
  const TUTOR_MODE_HINTS: Record<AiTutorV2Mode, { fr: string; en: string }> = {
    strict: {
      fr: '[Mode strict] Corrige systématiquement les erreurs, sois précis et formel.',
      en: '[Strict mode] Correct mistakes systematically, be precise and formal.'
    },
    balanced: {
      fr: '[Mode équilibré] Sois pédagogique, clair et bienveillant.',
      en: '[Balanced mode] Be pedagogical, clear and supportive.'
    },
    playful: {
      fr: '[Mode joueur] Utilise des analogies amusantes, sois enthousiaste et concret.',
      en: '[Playful mode] Use fun analogies, be enthusiastic and concrete.'
    }
  };

  const handleTutorSend = useCallback(
    async (payload: { content: string; mode: AiTutorV2Mode }) => {
      const now = Date.now();
      const userMsg: AiTutorV2Message = {
        id: `user-${now}`,
        role: 'user',
        content: payload.content,
        createdAt: now
      };

      // Snapshot l'historique AVANT d'ajouter le message courant : sinon
      // Gemini verrait le message à la fois dans `history` et dans
      // `userMessage`, ce qui dégrade la qualité de la réponse.
      // On ne passe que les messages user/assistant à Gemini (pas les
      // messages 'system' éventuels).
      const historyForGemini = tutorMessages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content
        }));

      setTutorMessages((prev) => [...prev, userMsg]);
      setTutorTyping(true);

      try {
        // Préfixe le message user avec un hint de ton — solution simple qui
        // ne touche pas au service Gemini partagé avec AIFloatingChat. Si le
        // mode reste 'balanced' on ne préfixe pas (cas le plus fréquent →
        // évite de polluer la conversation).
        const hint = TUTOR_MODE_HINTS[payload.mode]?.[language];
        const userMessageForGemini =
          payload.mode === 'balanced' || !hint
            ? payload.content
            : `${hint}\n\n${payload.content}`;

        // Nouvelle fonction qui retourne aussi les corrections détectées.
        // Le texte visible est nettoyé du bloc <<<CORRECTIONS>>> ; les corrections
        // sont parsées et seront affichées comme cartes sous le message.
        const { text: responseText, corrections } = await generateGeminiResponseWithCorrections(
          userMessageForGemini,
          historyForGemini
        );

        // Sécurise les types pour le carnet d'erreurs
        const validCategories: ErrorCategory[] = [
          'particule', 'ton', 'prononciation', 'politesse',
          'vocabulaire', 'grammaire', 'mesureur', 'caractere',
          'traduction', 'orthographe', 'autre'
        ];
        const validSeverities: ErrorSeverity[] = ['mineure', 'importante', 'critique'];

        // Alimente le carnet d'erreurs pour chaque correction détectée
        for (const c of corrections) {
          const cat = (validCategories.includes(c.category as ErrorCategory)
            ? c.category
            : 'autre') as ErrorCategory;
          const sev = (validSeverities.includes(c.severity as ErrorSeverity)
            ? c.severity
            : 'importante') as ErrorSeverity;
          errorJournal.addError({
            category: cat,
            severity: sev,
            source: 'prof-xiao',
            wrongText: c.wrong,
            correctText: c.correct,
            correctPinyin: c.pinyin,
            correctTranslationFr: c.translation,
            explanation: c.explanation,
            fullUserText: payload.content
          });
        }

        setTutorMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: responseText,
            createdAt: Date.now(),
            corrections: corrections.length > 0 ? corrections : undefined
          }
        ]);
      } catch (error) {
        // Erreurs typiques : rate limit Gemini (429), clé API absente/invalide,
        // network down. On affiche un message d'erreur dans la conv plutôt que
        // de laisser l'UI en typing forever.
        console.error('[Prof. Xiao] Gemini error:', error);
        const errMsg =
          error instanceof Error ? error.message : 'Unknown error';
        setTutorMessages((prev) => [
          ...prev,
          {
            id: `assistant-error-${Date.now()}`,
            role: 'assistant',
            content:
              language === 'fr'
                ? `Désolée, j'ai rencontré une erreur (${errMsg}). Peux-tu réessayer dans un instant ?`
                : `Sorry, I encountered an error (${errMsg}). Could you try again in a moment?`,
            createdAt: Date.now()
          }
        ]);
      } finally {
        setTutorTyping(false);
      }
    },
    [language, tutorMessages, errorJournal]
  );

  // "Nouvelle conversation" : on déselectionne la conv courante (la prochaine
  // saisie créera une nouvelle conv via upsert) et on vide l'état local.
  const handleTutorClear = useCallback(() => {
    setTutorMessages([]);
    setTutorTyping(false);
    tutorConvs.createNew();
  }, [tutorConvs]);

  // Bascule sur une conv existante : le useEffect ci-dessus rechargera les
  // messages depuis le hook.
  const handleTutorSelectConv = useCallback(
    (id: string) => {
      setTutorTyping(false);
      tutorConvs.selectConversation(id);
    },
    [tutorConvs]
  );

  // --- Liste plate de tous les mots déjà vus (pour le deck Flashcards V2) --
  const allFlashcardItems = useMemo<LessonItem[]>(() => {
    const seen = new Set<string>();
    const items: LessonItem[] = [];
    // Filtre les entrées sans VRAI hanzi CJK (syllabes pinyin pures issues
    // des leçons de prononciation tonale type "mā"/"bù") — ces "mots"
    // n'ont pas leur place dans les flashcards ni en révision puisqu'il
    // n'y a aucun caractère à reconnaître/écrire/réviser visuellement.
    const HANZI_RE = /[一-鿿]/;
    const pushUnique = (word: LessonItem | undefined) => {
      if (!word || seen.has(word.id)) return;
      if (!HANZI_RE.test(word.hanzi)) return;
      seen.add(word.id);
      items.push(word);
    };
    lessonProgress.allLearnedItems.forEach(pushUnique);
    completedLessonWordPool.forEach(pushUnique);
    return items;
  }, [lessonProgress.allLearnedItems, completedLessonWordPool]);

  // --- Source canonique des decks Flashcards : une entrée par leçon que
  //   l'utilisateur a touchée (≥1 mot dans son pool). Chaque entrée porte le
  //   titre de la leçon (pour le label du deck) et la liste ordonnée des
  //   itemIds à afficher. Les leçons complétées restent incluses.
  const flashcardLessonsFromUser = useMemo(() => {
    if (allFlashcardItems.length === 0) return [];
    // Dans cecr-course.ts, `lesson.flashcards` contient des chaînes brutes
    // (hanzi ou pinyin), PAS des IDs d'items. On construit donc des index
    // inversés pour retrouver l'itemId canonique à partir du hanzi ou du
    // pinyin (normalisés) — tout en conservant le support direct par id au
    // cas où certaines leçons référencent déjà des ids.
    const ownedItemIds = new Set<string>();
    const byHanzi = new Map<string, string>();
    const byPinyin = new Map<string, string>();
    const normalizePinyin = (s: string) =>
      s
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '')
        .toLowerCase();
    for (const it of allFlashcardItems) {
      ownedItemIds.add(it.id);
      if (it.hanzi && !byHanzi.has(it.hanzi)) byHanzi.set(it.hanzi, it.id);
      if (it.pinyin) {
        const np = normalizePinyin(it.pinyin);
        if (np && !byPinyin.has(np)) byPinyin.set(np, it.id);
        // Conserve aussi la forme exacte tonale (ex: "mā") pour matcher les
        // leçons de tons qui utilisent la forme avec accents.
        if (!byPinyin.has(it.pinyin)) byPinyin.set(it.pinyin, it.id);
      }
    }

    const resolveRef = (ref: string): string | undefined => {
      if (ownedItemIds.has(ref)) return ref;
      if (byHanzi.has(ref)) return byHanzi.get(ref);
      if (byPinyin.has(ref)) return byPinyin.get(ref);
      const np = normalizePinyin(ref);
      if (np && byPinyin.has(np)) return byPinyin.get(np);
      return undefined;
    };

    const out: {
      id: string;
      title: string;
      titleEn?: string;
      hskLevel: number;
      itemIds: string[];
      completed?: boolean;
    }[] = [];
    const completedSet = new Set(completedLessons);

    for (const path of cecrPathsState) {
      for (const lesson of path.lessons) {
        // Seules les leçons validées apparaissent dans Flashcards : les items
        // des leçons non terminées sont juste dans le pool global mais ne
        // forment pas de deck leçon dédié.
        if (!completedSet.has(lesson.id)) continue;
        const itemIds: string[] = [];
        const seen = new Set<string>();
        for (const fref of lesson.flashcards ?? []) {
          const resolved = resolveRef(fref);
          if (resolved && !seen.has(resolved)) {
            seen.add(resolved);
            itemIds.push(resolved);
          }
        }
        if (itemIds.length === 0) continue;
        out.push({
          id: lesson.id,
          title: lesson.title,
          titleEn: lesson.titleEn,
          hskLevel: lesson.hskLevel as number,
          itemIds,
          completed: true
        });
      }
    }
    return out;
  }, [cecrPathsState, allFlashcardItems, completedLessons]);

  // --- V7 : index lessonId → niveau CECR + phrases depuis dialogues -------
  /**
   * Pour ReviewPageV3 et LevelBilanBanner : mappe chaque lessonId CECR à son
   * slug de niveau (`a1`, `b1.2`, etc.). Recalculé quand les paths changent.
   */
  const cecrLessonLevelIndex = useMemo<Record<string, CecrLevelSlug>>(() => {
    const map: Record<string, CecrLevelSlug> = {};
    const pathToLevel = new Map<string, CecrLevelSlug>();
    for (const meta of cecrLevels) {
      for (const pid of meta.pathIds) {
        pathToLevel.set(pid, meta.level as CecrLevelSlug);
      }
    }
    for (const path of cecrPathsState) {
      const level = pathToLevel.get(path.id);
      if (!level) continue;
      for (const lesson of path.lessons) {
        map[lesson.id] = level;
      }
    }
    return map;
  }, [cecrPathsState]);

  // Manifest des audios de dialogues (chargé une fois, mémoisé). Permet de
  // résoudre l'URL MP3 pré-générée d'une phrase depuis son (dialogueId, idx)
  // pour que le bouton 🔊 dans Flashcards/Phrases lise la bonne piste plutôt
  // que de tomber sur les conventions HSK qui ne couvrent que les mots seuls.
  const [dialogueManifest, setDialogueManifest] =
    useState<DialogueAudioManifest | null>(null);
  useEffect(() => {
    let cancelled = false;
    loadDialogueManifest().then((m) => {
      if (!cancelled) setDialogueManifest(m);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * Phrases présentées comme SentenceFlashcard dans l'onglet "Phrases"
   * de FlashcardPageV5. Deux sources cumulées :
   *   1. Lignes des `dialogue.lines` des leçons CECR complétées
   *      → id `sent-{lessonId}-{lineIndex}`
   *   2. `examples[]` portés par chaque vocab (LessonItem) résolu depuis
   *      les `flashcards` array des leçons complétées
   *      → id `ex-{lessonId}-{vocabId}-{exampleIndex}`
   *
   * Avant ce useMemo couvrait UNIQUEMENT les dialogues — du coup les
   * exemples (10 000+ phrases courtes, présentes sur chaque entrée HSK)
   * n'apparaissaient jamais dans l'onglet Phrases.
   *
   * - Fusionne SRS persisté via wordSrs.map[id] si présent.
   * - Enrichit les dialogues avec l'URL MP3 du manifest dialogues.
   * - Pour les examples : utilise `example.audio` si fourni, sinon laisse
   *   playHanziAudio résoudre par convention (audio/examples/{hash}.mp3).
   */
  const sentenceCards = useMemo<SentenceFlashcard[]>(() => {
    // Deux sources cumulées :
    //   1. Lignes des `dialogue.lines` des leçons CECR complétées
    //   2. `examples[]` portés par chaque vocab (LessonItem) résolu depuis
    //      les `flashcards` array des leçons complétées
    // Les leçons de phonétique (Finales, Initiales, Tons) n'ayant ni dialogue
    // ni vocab CJK résolvable, elles produisent 0 phrase — c'est normal,
    // les phrases apparaissent dès qu'une leçon de contenu réel est complétée.
    if (completedLessons.length === 0) return [];
    // Dédoublonnage cross-leçon : si un même hanzi d'exemple apparaît dans
    // plusieurs leçons, on ne garde qu'une seule carte (la première vue).
    const seenHanzi = new Set<string>();
    const out: SentenceFlashcard[] = [];

    // Filtre "vraie phrase" : ≥ 2 caractères CJK. Les exemples mono-hanzi
    // (genre mā/má/mǎ/mà de la leçon Les 4 tons, ou 哥/看 isolés) ne sont pas
    // des phrases et polluent l'onglet Phrases — ils restent dispo dans
    // l'onglet Mots. La range U+3400-U+9FFF couvre tous les hanzi usuels.
    const CJK_RE = /[㐀-鿿]/g;
    const isRealPhrase = (hanzi: string): boolean =>
      (hanzi.match(CJK_RE) || []).length >= 2;

    // Map lessonId → LessonModule (CECR + HSK fallback pour ids hérités)
    const lessonsById = new Map<string, LessonModule>();
    for (const path of cecrPathsState) {
      for (const lesson of path.lessons) lessonsById.set(lesson.id, lesson);
    }
    for (const path of lessonPathsState) {
      for (const lesson of path.lessons) {
        if (!lessonsById.has(lesson.id)) lessonsById.set(lesson.id, lesson);
      }
    }

    for (const lessonId of completedLessons) {
      const lesson = lessonsById.get(lessonId);
      if (!lesson) continue;

      // --- 1. Dialogues (logique historique) ----------------------------
      if (lesson.dialogue?.lines) {
        const dialogueId = lesson.dialogue.id;
        const manifestEntry = dialogueId
          ? dialogueManifest?.[dialogueId]
          : undefined;
        lesson.dialogue.lines.forEach((line, idx) => {
          const manifestUrl = manifestEntry?.lines?.[idx];
          const sentId = `sent-${lessonId}-${idx}`;
          const srsEntry = wordSrs.map[sentId];
          if (seenHanzi.has(line.hanzi)) return;
          if (!isRealPhrase(line.hanzi)) return;
          seenHanzi.add(line.hanzi);
          out.push({
            id: sentId,
            lessonId,
            lessonTitleFr: lesson.title,
            lessonTitleEn: lesson.titleEn,
            hanzi: line.hanzi,
            pinyin: numericPinyinToToned(line.pinyin),
            translationFr: line.translationFr,
            translationEn: line.translationEn,
            audio: line.audioUrl ?? manifestUrl ?? undefined,
            lastReviewedAt:
              srsEntry?.lastReviewedAt && srsEntry.lastReviewedAt > 0
                ? srsEntry.lastReviewedAt
                : undefined,
            speaker: line.speaker,
            contextFr: lesson.dialogue?.context
          });
        });
      }

      // --- 2. Examples des vocab items (nouvelle source) ----------------
      // Résolution inline car `resolveFlashcards` est défini plus bas dans
      // le fichier (ordre useCallback).
      const vocabItems: LessonItem[] = [];
      for (const identifier of lesson.flashcards ?? []) {
        const grammarWord = getGrammarLessonById(identifier);
        if (grammarWord) {
          vocabItems.push(grammarWord);
          continue;
        }
        const byId = getLessonById(identifier);
        if (byId) {
          vocabItems.push(byId);
          continue;
        }
        const byHanzi = getLessonsByHanziList([identifier])[0];
        if (byHanzi) vocabItems.push(byHanzi);
      }
      vocabItems.forEach((vocab) => {
        if (!vocab.examples || vocab.examples.length === 0) return;
        vocab.examples.forEach((ex, exIdx) => {
          if (!ex.hanzi || !ex.pinyin) return;
          if (seenHanzi.has(ex.hanzi)) return;
          if (!isRealPhrase(ex.hanzi)) return;
          seenHanzi.add(ex.hanzi);
          const sentId = `ex-${lessonId}-${vocab.id}-${exIdx}`;
          const srsEntry = wordSrs.map[sentId];
          out.push({
            id: sentId,
            lessonId,
            lessonTitleFr: lesson.title,
            lessonTitleEn: lesson.titleEn,
            hanzi: ex.hanzi,
            pinyin: numericPinyinToToned(ex.pinyin),
            translationFr: ex.translationFr ?? ex.translation,
            translationEn: ex.translation,
            // Priorité : URL explicite sur l'example > résolution auto par
            // audio.ts (hash FNV-1a sur le hanzi → audio/examples/{hash}.mp3)
            audio: ex.audio ?? undefined,
            lastReviewedAt:
              srsEntry?.lastReviewedAt && srsEntry.lastReviewedAt > 0
                ? srsEntry.lastReviewedAt
                : undefined,
            // contextFr : on indique le mot-source pour donner du contexte
            contextFr: `${vocab.hanzi} · ${vocab.pinyin}`
          });
        });
      });
    }

    return out;
  }, [
    completedLessons,
    cecrPathsState,
    lessonPathsState,
    dialogueManifest,
    wordSrs.map
  ]);

  // --- Résolveur de flashcards (string[] → LessonItem[]) ---
  const resolveFlashcards = useCallback(
    (ids: string[]): LessonItem[] => {
      const out: LessonItem[] = [];
      ids.forEach((identifier) => {
        const grammarWord = getGrammarLessonById(identifier);
        if (grammarWord) return out.push(grammarWord);
        const byId = getLessonById(identifier);
        if (byId) return out.push(byId);
        const byHanzi = getLessonsByHanziList([identifier])[0];
        if (byHanzi) out.push(byHanzi);
      });
      return out;
    },
    []
  );

  const learnedIdsSet = useMemo(
    () => new Set(lessonProgress.learnedWordIds),
    [lessonProgress.learnedWordIds]
  );

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkMode);
    return () => {
      document.body.classList.remove('dark-theme');
    };
  }, [darkMode]);

  // Persiste completedLessons en local + push Firestore. On skip le premier
  // run au mount : useFirestoreSync va tenter un upload initial si Firestore
  // est vide, donc pas besoin de le déclencher deux fois.
  const didMountCompletedRef = useRef(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(completedLessons));
    }
    if (!didMountCompletedRef.current) {
      didMountCompletedRef.current = true;
      return;
    }
    saveCompletedLessons(completedLessons);
  }, [completedLessons, saveCompletedLessons]);

  useEffect(() => {
    document.body.setAttribute('data-theme', 'asian-red');
  }, []);

  useEffect(() => {
    setLogoErrored(false);
  }, []);

  // `learningStats` est maintenant réactif via le hook — plus besoin d'effets
  // de rafraîchissement à la navigation ou au focus fenêtre.

  // Structure alignée sur Seonsaengnim (dashboard de référence) :
  //   APPRENDRE / COMMUNAUTÉ / EXCLUSIF (premium).
  // Structure alignée sur Seonsaengnim (dashboard de référence) :
  //   APPRENDRE / COMMUNAUTÉ / EXCLUSIF (premium).
  //
  // Chaque entrée mappe sur un slug dont le PNG existe dans /public/icons
  // (`icon_{slug}_{theme}.png`) pour éviter tout fallback emoji à l'affichage.
  // Type d'une entrée de navigation : quand `icon` est défini, on utilise ce fichier
  // directement (ex: /icons/grammar.png) au lieu du pattern icon_<slug>_<theme>.png.
  type NavEntry = {
    id: View;
    label: string;
    iconSlug: string;
    fallback: string;
    icon?: string; // nom de fichier direct dans /public/icons (prioritaire sur iconSlug)
    /** Badge optionnel à droite de l'entrée (ex: rang, compteur non-lus). */
    badge?: { text: string; tone: 'rank' | 'unread' };
  };
  const primaryNavEntries = useMemo<NavEntry[]>(
    () =>
      [
        { id: 'home', label: language === 'fr' ? 'Accueil' : 'Home', iconSlug: 'home', fallback: '🏠' },
        { id: 'cecr', label: language === 'fr' ? 'Leçons' : 'Lessons', iconSlug: 'lecons', fallback: '📚' },
        { id: 'dictionary', label: language === 'fr' ? 'Dictionnaire' : 'Dictionary', iconSlug: 'dict', fallback: '📖' },
        { id: 'flashcards', label: 'Flashcards', iconSlug: 'flash-card', fallback: '🃏' },
        { id: 'review', label: language === 'fr' ? 'Révisions' : 'Reviews', iconSlug: 'reviser', fallback: '🧠', icon: 'revision.png' },
        { id: 'drills', label: language === 'fr' ? 'Grammaire' : 'Grammar', iconSlug: 'reviser', fallback: '📐', icon: 'grammar.png' },
        { id: 'atelier', label: language === 'fr' ? 'Atelier' : 'Practice', iconSlug: 'today', fallback: '🎓', icon: 'audio-en-langue-etrangere.png' },
        {
          id: 'errors',
          label: language === 'fr' ? 'Mes erreurs' : 'My errors',
          iconSlug: 'reviser',
          fallback: '📝',
          badge:
            errorJournal.unlockedCount > 0
              ? { text: String(errorJournal.unlockedCount), tone: 'rank' }
              : undefined
        },
        { id: 'evaluation', label: language === 'fr' ? 'Évaluation' : 'Evaluation', iconSlug: 'progres', fallback: '🎯', icon: 'evaluation.png' },
        { id: 'tutor', label: language === 'fr' ? 'Prof. Xiao' : 'Prof. Xiao', iconSlug: 'ia', fallback: '💬', icon: 'ia.png' }
        // Onglets retirés (routes conservées pour deep links éventuels) :
        //   - 'writing-corrector'    → Correcteur IA
        //   - 'conversation-partner' → Partenaire IA
        //   - 'ai-quiz'              → Quiz IA
        //   - 'pronunciation-coach'  → Prononciation IA
      ] satisfies NavEntry[],
    [language, errorJournal.unlockedCount]
  );
  const communityNavEntries = useMemo<NavEntry[]>(
    () =>
      [
        {
          id: 'ideas',
          label: language === 'fr' ? 'Idées & Roadmap' : 'Ideas & Roadmap',
          iconSlug: 'culture',
          fallback: '💡',
          icon: 'idea.png'
        },
        {
          id: 'messages',
          label: language === 'fr' ? 'Messages' : 'Messages',
          iconSlug: 'culture',
          fallback: '💬',
          icon: 'messager.png'
        },
        { id: 'battles', label: language === 'fr' ? 'Batailles' : 'Battles', iconSlug: 'culture', fallback: '⚔️', icon: 'swords.png' },
        {
          id: 'leaderboard',
          label: language === 'fr' ? 'Classement' : 'Leaderboard',
          iconSlug: 'culture',
          fallback: '🏆',
          icon: 'trophy.png',
          badge:
            myRankPosition && myRankPosition > 0
              ? { text: `#${myRankPosition}`, tone: 'rank' }
              : undefined
        },
        // Annonces placée en bas de la section Communauté (à l'ancien
        // emplacement du Bilan, dont la page d'index a été retirée).
        {
          id: 'community',
          label: language === 'fr' ? 'Annonces' : 'Announcements',
          iconSlug: 'culture',
          fallback: '📣',
          icon: 'annoucement.png',
          badge:
            unreadAnnouncements > 0
              ? { text: String(unreadAnnouncements), tone: 'unread' }
              : undefined
        }
      ] satisfies NavEntry[],
    [language, unreadAnnouncements, myRankPosition]
  );
  const exclusiveNavEntries = useMemo<NavEntry[]>(
    () =>
      [
        { id: 'simulator', label: language === 'fr' ? 'Simulateur' : 'Simulator', iconSlug: 'themes', fallback: '🎭', icon: 'simulator.png' },
        { id: 'free-learning', label: language === 'fr' ? 'Apprentissage libre' : 'Free learning', iconSlug: 'today', fallback: '🎯', icon: 'self-learning.png' }
      ] satisfies NavEntry[],
    [language]
  );
  const secondaryNavEntries = useMemo<NavEntry[]>(
    () =>
      [
        { id: 'settings', label: language === 'fr' ? 'Réglages' : 'Settings', iconSlug: 'settings', fallback: '⚙️' },
        { id: 'assistant', label: language === 'fr' ? 'Signaler un problème' : 'Report a problem', iconSlug: 'bouee-de-sauvetage', fallback: '🛟' }
      ] satisfies NavEntry[],
    [language]
  );
  const reviewItemsForPlan =
    appAccess.reviewItemLimit === null
      ? lessonProgress.allLearnedItems
      : lessonProgress.allLearnedItems.slice(0, appAccess.reviewItemLimit);
  const availableMiniGameIds =
    appAccess.maxMiniGames === 1
      ? ['memory']
      : ['memory', 'speed-quiz', 'falling', 'sentence-builder', 'pinyin-typing'];

  const handleOpenThemes = (theme?: string) => {
    setFocusedTheme(theme ?? defaultTheme);
    setView('themes');
  };

  const handleSelectLesson = (pathId: string, lessonId: string) => {
    // Cherche d'abord dans les parcours CECR (taxonomie exposée à l'utilisateur),
    // puis dans les parcours HSK (conservés pour compatibilité des anciens ids).
    const path =
      cecrPathsState.find((entry) => entry.id === pathId) ??
      lessonPathsState.find((entry) => entry.id === pathId);
    const lesson = path?.lessons.find((entry) => entry.id === lessonId);
    if (!lesson || lesson.locked) {
      return;
    }
    setSelectedLesson({ pathId, lessonId });
    setView('lesson');
  };

  const recordLearningSession = (duration: number) => {
    applyLearningSessionSync(duration);
  };

  const handleLessonComplete = (payload: { learnedWordIds: string[]; duration: number }) => {
    // Enregistre la progression mais NE QUITTE PAS la leçon automatiquement :
    // l'écran Récap reste affiché (score, temps, questions ratées) jusqu'à ce que
    // l'utilisateur clique sur « Terminer ». La sortie est alors gérée par
    // `handleLessonExit` (déclenché par `onBack` dans la page V2).
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
  };

  const handleLessonExit = () => {
    setSelectedLesson(null);
    setView('cecr');
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

  let content: JSX.Element;
  switch (view) {
    case 'cplayer':
      // Lazy-loadé : wrap dans Suspense pour ne pas faire planter le render
      // pendant le download du chunk (~80 Ko opencc-js + page).
      content = (
        <Suspense
          fallback={
            <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>
              {language === 'fr' ? 'Chargement…' : 'Loading…'}
            </div>
          }
        >
          <CPlayerPage language={language} onBackHome={() => setView('home')} />
        </Suspense>
      );
      break;
    case 'cecr':
      // Parcours CECR A1→C2.2 — unique taxonomie exposée dans la navigation.
      // On passe `cecrLevels` pour basculer LessonPathsPage sur la taxonomie
      // CECR (10 onglets A1..C2.2) au lieu des 7 niveaux HSK par défaut.
      // Le vocabulaire est mixé entre niveaux HSK selon le besoin pédagogique
      // de chaque leçon.
      content = (
        <LessonPathsPage
          language={language}
          onSelectLesson={handleSelectLesson}
          paths={cecrPathsState}
          cecrLevels={cecrLevels}
          streak={learningStats.streak}
          minutesToday={learningStats.minutesToday}
          dailyGoalMinutes={dailyGoalsHook.goals.minutesTarget}
          renderLevelBanner={(selected) => {
            // V7 — bannière Bilan de fin de niveau. Uniquement en mode CECR.
            if (typeof selected !== 'string') return null;
            const meta = cecrLevels.find((l) => l.level === selected);
            if (!meta) return null;
            // Compter le % de leçons complétées dans ce niveau.
            const levelPathIds = new Set(meta.pathIds);
            const levelLessons = cecrPathsState
              .filter((p) => levelPathIds.has(p.id))
              .flatMap((p) => p.lessons);
            const total = levelLessons.length;
            if (total === 0) return null;
            const completedInLevel = levelLessons.filter((l) => l.completed).length;
            const completionPct = Math.round((completedInLevel / total) * 100);
            const levelSlug = meta.level as CecrLevelSlug;
            const entry = levelBilans.getEntry(levelSlug);
            return (
              <LevelBilanBanner
                level={levelSlug}
                levelLabel={language === 'fr' ? meta.name : meta.nameEn}
                emoji={meta.icon}
                completionPct={completionPct}
                entry={entry}
                language={language}
                onStart={(lvl) => {
                  setBilanLevel(lvl);
                  setView('bilan');
                }}
              />
            );
          }}
        />
      );
      break;
    case 'lesson':
      if (selectedLesson) {
        // Résoudre la leçon dans HSK (lessonPathsState) puis CECR (cecrPathsState)
        const allPathStates = [lessonPathsState, cecrPathsState];
        const lessonModule: LessonModule | undefined =
          allPathStates.reduce<LessonModule | undefined>((found, paths) => {
            if (found) return found;
            return (
              paths
                .find((path) => path.id === selectedLesson.pathId)
                ?.lessons.find((lesson) => lesson.id === selectedLesson.lessonId) ??
              paths.flatMap((path) => path.lessons).find((lesson) => lesson.id === selectedLesson.lessonId)
            );
          }, undefined);
        if (lessonModule) {
          const lessonV2 = lessonModuleToV2(lessonModule, resolveFlashcards, language);
          content = (
            <StructuredLessonPageV2
              lesson={lessonV2}
              language={language}
              userDisplayName={user?.displayName ?? undefined}
              onBack={handleLessonExit}
              onPlayAudio={(url) => {
                // Règle produit : tous les audios passent par MP3/WAV. Si on
                // reçoit une URL explicite (example.audio du mapper) on l'essaie
                // en premier, sinon on retombe sur les conventions HSK via le
                // hanzi. Silencieux si tout échoue.
                playAudioWithFallback(url).catch(() => {
                  /* silent — pas de Web Speech fallback */
                });
              }}
              onComplete={(payload) => {
                // Mappe le payload V2 vers le contrat V1 existant.
                const learnedWordIds = resolveFlashcards(lessonModule.flashcards).map((i) => i.id);
                handleLessonComplete({
                  learnedWordIds,
                  duration: (lessonModule.duration ?? 10)
                });
                // Informe le dashboard V2 (XP, streak, activité).
                dashboardState.awardXp(payload.xpGained ?? 50);
                dashboardState.pingAlive();
              }}
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
        <ReviewPageV3
          language={language}
          completedLessonIds={completedLessonsSet}
          masteryMap={lessonMastery.masteryMap}
          onRecordSession={(lessonId, level, scorePct) =>
            lessonMastery.recordSessionResult(lessonId, level, scorePct)
          }
          onSeedLessonMastery={(lessonId, level) =>
            lessonMastery.seedLessonMastery(lessonId, level)
          }
          onAwardXp={(amount) => dashboardState.awardXp(amount)}
          onOpenLesson={(lessonId) => {
            const foundCecr = cecrPathsState.find((path) =>
              path.lessons.some((lesson) => lesson.id === lessonId)
            );
            if (foundCecr) handleSelectLesson(foundCecr.id, lessonId);
          }}
          onBack={() => setView('home')}
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
    case 'assistant':
      content = <AssistancePage language={language} onBackHome={() => setView('home')} />;
      break;
    case 'games':
      content = (
        <MiniGamesPage
          language={language}
          reviewItems={lessonProgress.allLearnedItems}
          availableGameIds={availableMiniGameIds}
        />
      );
      break;
    case 'flashcards':
      content = (
        <FlashcardPageV5
          language={language}
          wordItems={allFlashcardItems.map((item) =>
            lessonItemToFlashcardV2(
              item,
              wordSrs.masteredIds,
              wordSrs.difficultIds,
              learnedIdsSet,
              wordSrs.reviewedIds,
              wordSrs.map
            )
          )}
          sentenceCards={sentenceCards}
          // Gate Lifetime : seuls les utilisateurs lifetime peuvent créer
          // des flashcards personnalisées (canCreateCustomFlashcards). En
          // passant undefined, le bouton "+Ajouter" dans FlashcardPageV5 est
          // désactivé (cf. `disabled={!onAddCard && !personalHook}` ligne 1507).
          // Les non-lifetime continuent de voir et réviser leurs cartes
          // standard (HSK), seule la création custom est bloquée.
          personalHook={appAccess.canCreateCustomFlashcards ? personalFlashcards : undefined}
          customLists={customLists.lists.map((list) => ({
            id: list.id,
            name: list.name,
            itemIds: list.itemIds
          }))}
          lessonsFromUser={flashcardLessonsFromUser}
          dueIds={wordSrs.dueIds}
          masteredIds={wordSrs.masteredIds}
          difficultIds={wordSrs.difficultIds}
          onRate={wordSrs.rate}
          onStartGlobalReview={() => setView('review')}
          onStartSentenceReview={() => setView('review')}
          onStartPersonalReview={() => setView('review')}
        />
      );
      break;
    case 'free-learning':
      content = (
        <FreeLearningPage
          language={language}
          wordItems={allFlashcardItems.map((item) =>
            lessonItemToFlashcardV2(
              item,
              wordSrs.masteredIds,
              wordSrs.difficultIds,
              learnedIdsSet,
              wordSrs.reviewedIds,
              wordSrs.map
            )
          )}
          dueIds={wordSrs.dueIds}
          masteredIds={wordSrs.masteredIds}
          difficultIds={wordSrs.difficultIds}
          onRate={wordSrs.rate}
          onOpenReading={() => setView('reading')}
          onOpenDialogue={() => setView('dialogue')}
        />
      );
      break;
    case 'settings':
      content = (
        <SettingsPage
          language={language}
          onLanguageChange={setLanguage}
          onOpenSubscription={() => setView('subscription')}
        />
      );
      break;
    case 'profile':
      content = (
        <ProfilePage
          language={language}
          dashboard={dashboardState}
          wordsMasteredCount={wordSrs.masteredIds.size}
          lessonsCompletedCount={completedLessons.length}
          onOpenSettings={() => setView('settings')}
        />
      );
      break;
    case 'dictionary':
      content = (
        <DictionaryPage
          language={language === 'en' ? 'en' : 'fr'}
          onSelectLevel={(lvl) => {
            setDictionaryLevel(lvl);
            setView('dictionary-level');
          }}
          onSelectEntry={(id) => {
            setDictionaryEntryId(id);
            setDictionaryEntryHanzi(null);
            setView('dictionary-entry');
          }}
        />
      );
      break;
    case 'dictionary-level':
      if (!dictionaryLevel) {
        setView('dictionary');
        content = <></>;
        break;
      }
      content = (
        <DictionaryLevelPage
          level={dictionaryLevel}
          language={language === 'en' ? 'en' : 'fr'}
          onBack={() => setView('dictionary')}
          onSelectEntry={(id) => {
            setDictionaryEntryId(id);
            setDictionaryEntryHanzi(null);
            setView('dictionary-entry');
          }}
        />
      );
      break;
    case 'dictionary-entry':
      if (!dictionaryEntryId && !dictionaryEntryHanzi) {
        setView('dictionary');
        content = <></>;
        break;
      }
      content = (
        <DictionaryEntryPage
          entryId={dictionaryEntryId}
          hanzi={dictionaryEntryHanzi}
          language={language === 'en' ? 'en' : 'fr'}
          onBack={() => {
            // Si on connaît le niveau de l'entrée, on retourne sur ce niveau ;
            // sinon retour au hub. Le niveau a déjà été stocké par onOpenLevel
            // ou la résolution interne.
            if (dictionaryLevel) setView('dictionary-level');
            else setView('dictionary');
          }}
          onSelectEntry={(id) => {
            setDictionaryEntryId(id);
            setDictionaryEntryHanzi(null);
            // Reste sur dictionary-entry, juste re-mount avec le nouvel id
          }}
          onOpenLevel={(lvl) => {
            setDictionaryLevel(lvl);
            setView('dictionary-level');
          }}
        />
      );
      break;
    case 'subscription':
      content = (
        <SubscriptionPage
          language={language}
          subscription={entitlements?.app ?? null}
          accessTier={appAccess.tier}
          trialDaysLeft={appAccess.trialDaysLeft}
          trialEndsAt={appAccess.trialEndsAt}
          onSubscribe={handleSubscribe}
          onManageSubscription={handleManageSubscription}
        />
      );
      break;
    case 'tutor':
      // V9.9 — pas de bouton "Retour" : cette page est accessible en
      // permanence via la sidebar primaire, donc le bouton retour est
      // redondant avec la navigation.
      content = (
        <AiTutorPageV2
          language={language}
          messages={tutorMessages}
          isTyping={tutorTyping}
          mode={tutorMode}
          onChangeMode={setTutorMode}
          onClear={handleTutorClear}
          onSend={handleTutorSend}
          userPhotoURL={user?.photoURL ?? null}
          conversations={tutorConvs.conversations.map((c) => ({
            id: c.id,
            title: c.title,
            updatedAt: c.updatedAt
          }))}
          currentConvId={tutorConvs.currentConvId}
          onNewConversation={handleTutorClear}
          onSelectConversation={handleTutorSelectConv}
          onRemoveConversation={tutorConvs.removeConversation}
          personalFlashcards={personalFlashcards}
          canAddFlashcards={appAccess.canCreateCustomFlashcards}
          initialDraft={tutorInitialDraft}
          onConsumeInitialDraft={() => setTutorInitialDraft(null)}
        />
      );
      break;
    case 'writing-corrector': {
      // Phase 1B IA — page accessible en permanence depuis la sidebar.
      // Le niveau CECR le plus haut débloqué (issu du Set unlockedLevels) est
      // passé à Gemini pour calibrer la finesse des explications. Fallback B1
      // si aucun niveau débloqué (ne devrait jamais arriver — A1 toujours ouvert).
      const sortedLevels = [...cecrLevels].sort((a, b) => b.order - a.order);
      const highestUnlocked = sortedLevels.find((m) =>
        unlockedLevels.has(m.level as CecrLevelSlug)
      );
      const userLevelLabel = highestUnlocked
        ? highestUnlocked.level.toUpperCase()
        : 'B1';
      content = (
        <WritingCorrectorPage
          language={language}
          userLevel={userLevelLabel}
        />
      );
      break;
    }
    case 'conversation-partner':
      // Phase 2 IA — partenaire de conversation (scénarios + chat en chinois).
      // La page gère son propre niveau via le scénario sélectionné, donc on
      // ne lui passe que la langue UI.
      content = <ConversationPartnerPage language={language} />;
      break;
    case 'ai-quiz': {
      // Phase 3B IA — générateur de quiz personnalisés.
      // Niveau par défaut = niveau le plus haut débloqué (réutilise la même
      // logique que la page Correcteur).
      const sortedAq = [...cecrLevels].sort((a, b) => b.order - a.order);
      const highestAq = sortedAq.find((m) =>
        unlockedLevels.has(m.level as CecrLevelSlug)
      );
      const defaultLvl = highestAq ? highestAq.level.toUpperCase() : 'B1';
      content = <AiQuizPage language={language} defaultLevel={defaultLvl} />;
      break;
    }
    case 'pronunciation-coach': {
      // Phase 4 IA — coach de prononciation (Gemini multimodal audio).
      // Architecture swappable : voir src/services/pronunciation/.
      const sortedPc = [...cecrLevels].sort((a, b) => b.order - a.order);
      const highestPc = sortedPc.find((m) =>
        unlockedLevels.has(m.level as CecrLevelSlug)
      );
      const defaultLvlPc = highestPc ? highestPc.level.toUpperCase() : 'A1';
      content = (
        <PronunciationCoachPage
          language={language}
          defaultLevel={defaultLvlPc}
        />
      );
      break;
    }
    case 'drills':
      // V3 = catalogue complet façon Seonsaengnim (38 points + niveaux CECR +
      // exemples + audio + mini-quiz). Remplace l'ancien GrammarDrillsPageV2
      // qui était une grille de drills très limitée.
      content = (
        <GrammarPageV3
          language={language}
          onBack={() => setView('home')}
        />
      );
      break;
    case 'evaluation':
      content = (
        <EvaluationHubPage
          language={language}
          userDisplayName={user?.displayName ?? undefined}
        />
      );
      break;
    case 'atelier': {
      // Construit la liste des leçons complétées avec leurs mots groupés
      // (pour le sélecteur "Une leçon précise" dans Atelier). Chaque bucket
      // = un module pédagogique complété qui a au moins 1 mot extractible.
      const allLessons = [
        ...lessonPathsState.flatMap((path) => path.lessons),
        ...cecrPathsState.flatMap((path) => path.lessons)
      ];
      const lessonsById = new Map(allLessons.map((l) => [l.id, l]));
      const buckets: { id: string; title: string; items: { hanzi: string; pinyin: string }[] }[] = [];
      for (const lessonId of completedLessons) {
        const lesson = lessonsById.get(lessonId);
        if (!lesson) continue;
        const items: { hanzi: string; pinyin: string }[] = [];
        const seen = new Set<string>();
        const push = (hanzi: string, pinyin: string) => {
          const k = hanzi.trim();
          if (!k || seen.has(k)) return;
          seen.add(k);
          items.push({ hanzi, pinyin });
        };
        // 1. level1 word bank (HSK1 fondations)
        const level1Words = level1LessonWordBank[lessonId];
        if (level1Words && level1Words.length > 0) {
          level1Words.forEach((w) => push(w.hanzi, w.pinyin));
        } else {
          // 2. simpleLesson words (modules simples)
          const simpleLesson = getSimpleLessonById(lessonId);
          if (simpleLesson?.customWords?.length) {
            simpleLesson.customWords.forEach((w) => push(w.hanzi, w.pinyin));
          } else if (simpleLesson?.words?.length) {
            getLessonsByHanziList(simpleLesson.words).forEach((w) =>
              push(w.hanzi, w.pinyin)
            );
          } else if (lesson.flashcards?.length) {
            // 3. flashcards identifiers (cas standard CECR/HSK)
            for (const identifier of lesson.flashcards) {
              const g = getGrammarLessonById(identifier);
              if (g) {
                push(g.hanzi, g.pinyin);
                continue;
              }
              const byId = getLessonById(identifier);
              if (byId) {
                push(byId.hanzi, byId.pinyin);
                continue;
              }
              const byHanzi = getLessonsByHanziList([identifier])[0];
              if (byHanzi) push(byHanzi.hanzi, byHanzi.pinyin);
            }
          }
        }
        if (items.length > 0) {
          const title = language === 'fr' ? lesson.title : lesson.titleEn || lesson.title;
          buckets.push({ id: lesson.id, title, items });
        }
      }

      content = (
        <AtelierPage
          language={language}
          personalFlashcards={personalFlashcards.cards}
          lessonWordPool={completedLessonWordPool.map((w) => ({
            hanzi: w.hanzi,
            pinyin: w.pinyin
          }))}
          lessonBuckets={buckets}
        />
      );
      break;
    }
    case 'community':
      // L'item "Annonces" du sidebar pointe ici. On affiche la page Annonces
      // restylisée (cartes verticales full-width inspirées de Seonsaengnim).
      // CommunityPageV2 reste importé pour usage potentiel futur.
      content = (
        <AnnouncementsPage
          language={language}
          announcements={DEFAULT_ANNOUNCEMENTS}
          onOpenAnnouncement={(id) => announcementsRead.markRead(id)}
        />
      );
      break;
    case 'ideas':
      // Page Idées & Roadmap — propositions communautaires + roadmap curatée.
      content = <IdeasRoadmapPage language={language} />;
      break;
    case 'messages':
      // Messagerie 1-1 temps réel entre apprenants.
      content = <ConversationsPage language={language} />;
      break;
    case 'errors':
      // Carnet d'erreurs personnel : chronologie + récurrentes + exercices.
      content = <MyErrorsPage language={language} />;
      break;
    case 'battles':
      content = (
        <BattlesPage
          language={communityLanguage}
          lessonsCompleted={completedLessons.length}
          battleWordSources={battleWordSources}
          stats={battleStats.stats}
          lost={battleStats.lost}
          winRatePct={battleStats.winRatePct}
          isQueueing={battleMatchmaking.status === 'queueing'}
          queueSecondsLeft={battleMatchmaking.secondsLeft}
          onStartBattle={handleStartBattle}
          onCancelQueue={handleCancelBattleQueue}
          onBack={() => setView('community')}
          isDevMode={devMode.isActive}
          onStartBotBattle={handleStartBotBattle}
        />
      );
      break;
    case 'battleSession':
      if (!activeMatchId) {
        // Garde-fou : pas de matchId → retour au hub
        setView('battles');
        content = <></>;
        break;
      }
      content = (
        <BattleSessionPage
          matchId={activeMatchId}
          language={communityLanguage}
          onMatchEnded={handleMatchEnded}
          onBack={() => {
            setActiveMatchId(null);
            setView('battles');
          }}
          onRematch={() => {
            setActiveMatchId(null);
            setView('battles');
            // Laisse l'user cliquer à nouveau sur "Lancer" — évite de relancer
            // une queue automatiquement (il peut vouloir consulter ses stats).
          }}
        />
      );
      break;
    case 'battleSessionLocal':
      if (!localBotMatch) {
        // Garde-fou : pas de match local → retour au hub
        setView('battles');
        content = <></>;
        break;
      }
      content = (
        <BattleSessionPageLocal
          initialMatch={localBotMatch}
          language={communityLanguage}
          onMatchEnded={handleMatchEnded}
          onBack={() => {
            setLocalBotMatch(null);
            setView('battles');
          }}
          onRematch={() => {
            setLocalBotMatch(null);
            // Relance immédiatement un nouveau match local bot.
            handleStartBotBattle();
          }}
        />
      );
      break;
    case 'leaderboard':
      content = (
        <LeaderboardPage
          language={communityLanguage}
          onBack={() => setView('community')}
          injectExtra={devBotProfiles}
        />
      );
      break;
    case 'dialogue':
      content = (
        <DialoguePageV2
          language={language}
          onBack={() => setView('home')}
        />
      );
      break;
    case 'reading':
      content = (
        <ReadingPageV2
          language={language}
          onBack={() => setView('home')}
        />
      );
      break;
    case 'simulator':
      // Gate Lifetime : le Simulateur de situations est annoncé comme exclusif
      // Lifetime dans SubscriptionPage. On affiche le LifetimeFeatureGate à la
      // place du composant si l'utilisateur n'a pas isLifetime. Cohérent avec
      // canUseSimulator dans utils/access.ts.
      if (!appAccess.canUseSimulator) {
        content = (
          <LifetimeFeatureGate
            language={language}
            featureName="Simulateur de situations"
            featureNameEn="Situation Simulator"
            description={
              language === 'fr'
                ? 'Mets-toi en situation réelle : commande au restaurant, prends le métro, négocie au marché. Conversations contextuelles guidées en mandarin.'
                : undefined
            }
            descriptionEn="Real-life situations: order at a restaurant, take the subway, negotiate at the market. Guided contextual conversations in Mandarin."
            icon="🎭"
            onSeePlans={() => setView('subscription')}
          />
        );
        break;
      }
      // V9.9 — Pas de bouton "Retour" au niveau catalogue (accessible en
      // permanence via sidebar). Le bouton "Retour aux scénarios" à l'intérieur
      // d'une conversation est conservé : c'est une navigation interne entre
      // l'écran de briefing/conversation et la liste des scénarios.
      content = (
        <SimulatorPageV2
          language={language}
          onScenarioComplete={(scenarioId) => {
            // Hook futur : incrémentation XP / badges. Pour l'instant on logge
            // seulement afin de disposer d'une trace en dev tools.
            // eslint-disable-next-line no-console
            console.info('[Simulator] scénario complété :', scenarioId);
          }}
        />
      );
      break;
    // 'bilanIndex' retiré de la sidebar (le bilan de fin de niveau reste
    // accessible via le banner affiché en fin de niveau depuis cecr).
    case 'bilan': {
      // V7 — Bilan de fin de niveau. `bilanLevel` doit être sélectionné via la
      // bannière affichée dans LessonPathsPage (case 'cecr').
      if (!bilanLevel) {
        setView('cecr');
        content = <></>;
        break;
      }
      const existing = levelBilans.getEntry(bilanLevel);
      // Trouver l'ordre du niveau suivant pour le CTA "niveau suivant" (optionnel).
      const currentIdx = cecrLevels.findIndex((l) => l.level === bilanLevel);
      const nextLevelMeta =
        currentIdx >= 0 && currentIdx < cecrLevels.length - 1
          ? cecrLevels[currentIdx + 1]
          : undefined;
      content = (
        <LevelBilanPage
          level={bilanLevel}
          language={language}
          existingEntry={existing}
          onRecordAttempt={(level, score) => levelBilans.recordAttempt(level, score)}
          onExit={() => {
            setBilanLevel(null);
            setView('cecr');
          }}
          onNextLevel={
            nextLevelMeta
              ? () => {
                  setBilanLevel(null);
                  setView('cecr');
                }
              : undefined
          }
        />
      );
      break;
    }
    case 'home':
    default:
      content = (
        <HomePageV2
          copy={copy}
          language={language}
          progress={{
            currentLesson: lessonProgress.currentLesson,
            todaySummary: lessonProgress.todaySummary,
            progressPercent: lessonProgress.progressPercent,
            totals: lessonProgress.totals,
            hasProgress: lessonProgress.hasProgress,
            learnedWordIds: lessonProgress.learnedWordIds,
            allLearnedItems: lessonProgress.allLearnedItems
          }}
          reviewItems={lessonProgress.reviewItems}
          // V11 — On utilise le compteur individuel SRS (`wordSrs.dueIds`)
          // partout pour cohérence avec l'Objectif du jour. Avant, on passait
          // `reviewItems.length` qui compte des LEÇONS, pas des cartes — d'où
          // le mismatch utilisateur (Objectif=19 cartes vs widget=3 leçons).
          dueCardsCount={(() => {
            const valid = new Set(allFlashcardItems.map((i) => i.id));
            let n = 0;
            for (const id of wordSrs.dueIds) if (valid.has(id)) n++;
            return n;
          })()}
          // Filtre les dueIds sur les cartes qui existent VRAIMENT dans le
          // catalogue actuel : sans ce filtre, des entrées SRS orphelines
          // (suppléments retirés, anciens IDs de leçons V4, etc.) gonflent
          // artificiellement le compteur "X cartes à réviser" sans jamais
          // pouvoir être révisées par l'utilisateur (elles ne s'affichent
          // pas dans la page Flashcards) → compteur "stuck" à vie.
          dueFlashcardsCount={(() => {
            const valid = new Set(allFlashcardItems.map((i) => i.id));
            let n = 0;
            for (const id of wordSrs.dueIds) if (valid.has(id)) n++;
            return n;
          })()}
          userDisplayName={user?.displayName ?? undefined}
          cecrPaths={cecrPathsState}
          cecrLevels={cecrLevels}
          completedLessonIds={completedLessonsSet}
          onStartReview={() => setView('review')}
          onOpenFlashcards={() => setView('flashcards')}
          onOpenLesson={(lessonId) => {
            // Cherche le parcours contenant cet id (CECR en priorité, HSK en fallback
            // pour les ids hérités d'anciennes sessions).
            const foundCecr = cecrPathsState.find((path) =>
              path.lessons.some((lesson) => lesson.id === lessonId)
            );
            const foundHsk = lessonPathsState.find((path) =>
              path.lessons.some((lesson) => lesson.id === lessonId)
            );
            const found = foundCecr ?? foundHsk;
            if (found) {
              handleSelectLesson(found.id, lessonId);
            } else {
              setView('cecr');
            }
          }}
          onOpenAiTutor={() => setView('tutor')}
          onOpenPath={() => setView('cecr')}
          onOpenDialogue={() => setView('dialogue')}
          onOpenReading={() => setView('reading')}
          onOpenAnnouncements={() => setView('community')}
          onOpenBattles={() => setView('battles')}
          onOpenMessages={() => setView('messages')}
          onOpenIdeas={() => setView('ideas')}
          unreadAnnouncementsCount={unreadAnnouncements}
          onAddWordToFlashcards={(word) => {
            // Déduplication : si le hanzi existe déjà dans les flashcards
            // personnelles, on ne recrée pas de doublon. Retour typé pour
            // que l'UI puisse afficher le bon feedback.
            const normalized = word.hanzi.trim();
            if (!normalized) return 'error';
            const already = personalFlashcards.cards.some(
              (c) => c.hanzi.trim() === normalized
            );
            if (already) return 'duplicate';
            if (personalFlashcards.atCapacity) return 'capacity';
            const created = personalFlashcards.addCard({
              hanzi: normalized,
              pinyin: word.pinyin,
              translationFr: word.translationFr || word.translation,
              translationEn: word.translation,
              note:
                language === 'fr'
                  ? 'Ajouté depuis « Mot du jour »'
                  : 'Added from "Word of the day"'
            });
            return created ? 'added' : 'error';
          }}
        />
      );
  }

  // Si l'utilisateur n'est pas connecté, afficher uniquement la page de connexion
  if (!user) {
    return (
      <div className="login-page-wrapper" data-theme={colorTheme}>
        <InteractiveGridBackground />
        <div className="login-page-content">
          <div className="login-header">
            {!logoErrored ? (
              <img
                src="/logos/logo_long.png"
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
    <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'} ${sidebarOpen ? 'sidebar-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Background interactif : grille canvas pâle qui s'illumine en rouge
          autour du curseur. Premier enfant pour rester derrière le reste
          (z-index 0, sidebar/main ont z-index ≥ 1). */}
      <InteractiveGridBackground />
      {/* Overlay sombre cliquable derrière le drawer mobile */}
      <div
        className="xl-sidebar-overlay"
        onClick={closeSidebar}
        aria-hidden={!sidebarOpen}
      />
      {/* Bouton chevron pour rétracter/étendre la sidebar — positionné sur
          le séparateur sidebar/main (pattern Seonsaengnim). Placé directement
          sous .app-container pour ne pas être clipé par l'overflow:hidden
          de .sidebar. Caché en mobile. */}
      <button
        type="button"
        className="sidebar-collapse-toggle"
        onClick={toggleSidebarCollapsed}
        aria-label={
          sidebarCollapsed
            ? (language === 'fr' ? 'Déployer la barre latérale' : 'Expand sidebar')
            : (language === 'fr' ? 'Replier la barre latérale' : 'Collapse sidebar')
        }
        title={
          sidebarCollapsed
            ? (language === 'fr' ? 'Déployer' : 'Expand')
            : (language === 'fr' ? 'Replier' : 'Collapse')
        }
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {sidebarCollapsed ? (
            <polyline points="9 18 15 12 9 6" />
          ) : (
            <polyline points="15 18 9 12 15 6" />
          )}
        </svg>
      </button>
      {/* Top bar globale : recherche + cloche, s'étend par-dessus la sidebar
          via grid-template-areas. Pattern Seonsaengnim. */}
      <AppTopBar
        language={language === 'en' ? 'en' : 'fr'}
        lessonPaths={[...cecrPathsState, ...lessonPathsState]}
        personalFlashcards={personalFlashcards.cards}
        tutorConversations={tutorConvs.conversations.map((c) => ({
          id: c.id,
          title: c.title,
          updatedAt: c.updatedAt
        }))}
        onSearchSelect={(hit) => {
          const openLesson = (moduleId: string) => {
            const foundCecr = cecrPathsState.find((p) =>
              p.lessons.some((l) => l.id === moduleId)
            );
            const foundHsk = lessonPathsState.find((p) =>
              p.lessons.some((l) => l.id === moduleId)
            );
            const found = foundCecr ?? foundHsk;
            if (found) handleSelectLesson(found.id, moduleId);
            else setView('cecr');
          };
          switch (hit.kind) {
            case 'lesson-module':
              openLesson(hit.id);
              break;
            case 'vocab':
              // V10 — les hits "Vocabulaire" pointent désormais vers la fiche
              // dictionnaire (au lieu d'ouvrir la leçon parente). On résout
              // par hanzi côté DictionaryEntryPage (findEntryByHanzi). Le
              // dictionaryLevel reste vide → le bouton Retour repart sur le hub.
              if (hit.hanzi) {
                setDictionaryEntryId(null);
                setDictionaryEntryHanzi(hit.hanzi);
                setDictionaryLevel(null);
                setView('dictionary-entry');
              } else if (hit.parentModuleId) {
                openLesson(hit.parentModuleId);
              } else {
                setView('dictionary');
              }
              break;
            case 'grammar':
              // Navigation vers la page Grammaire (catalogue GrammarPageV3).
              // ⚠ La view interne s'appelle 'drills' (legacy), l'item de
              // sidebar est libellé "Grammaire". L'utilisateur arrive sur
              // le catalogue où il peut cliquer le point cherché.
              setView('drills');
              break;
            case 'flashcard':
              setView('flashcards');
              break;
            case 'tutor-conv':
              handleTutorSelectConv(hit.id);
              setView('tutor');
              break;
            case 'ask-tutor':
              setTutorInitialDraft(hit.id);
              setView('tutor');
              break;
          }
        }}
        onNavigate={(v) => setView(v as typeof view)}
        onToggleSidebar={toggleSidebar}
        userLevel={dashboardState.xp.level}
        userXpInLevel={dashboardState.xp.xpInLevel}
        userXpForNext={dashboardState.xp.xpNeededForNext}
        accessTier={appAccess.tier}
        isLifetime={appAccess.isLifetime}
        trialDaysLeft={appAccess.trialDaysLeft ?? undefined}
      />
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <button className="app-logo" type="button" onClick={() => setView('home')} aria-label="XiaoLearn Home">
            {!logoErrored ? (
              <img
                src={sidebarCollapsed ? '/logos/logo_court.png' : '/logos/logo_long.png'}
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
          onOpenProfile={() => setView('profile')}
        />

        {/* CPlayer désactivé temporairement — réintégration prévue quand les pistes audio seront prêtes. */}
        {/*
        <div className="sidebar-cpop-panel">
          <button
            type="button"
            className="sidebar-cpop-btn"
            onClick={() => setView('cplayer')}
          >
            <span className="sidebar-cpop-icon" aria-hidden="true">
              ♪
            </span>
            <span className="sidebar-cpop-label">
              {language === 'fr' ? 'Apprendre avec la Cpop' : 'Learn with C-pop'}
            </span>
          </button>
        </div>
        */}

        <div className="sidebar-scroll">
        <section className="sidebar-nav-section">
          <header className="sidebar-section-header">
            <span>{language === 'fr' ? 'APPRENDRE' : 'LEARN'}</span>
          </header>

          <nav className="sidebar-nav">
            {primaryNavEntries.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className={`nav-item ${entry.id === view ? 'active' : ''}`}
                title={sidebarCollapsed ? entry.label : undefined}
                onClick={() => setView(entry.id)}
              >
                <span className="nav-icon">
                  <img
                    src={entry.icon ? `/icons/${entry.icon}` : `/icons/icon_${entry.iconSlug}_${colorTheme}.png`}
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
                {entry.badge && (
                  <span className={`nav-badge nav-badge--${entry.badge.tone}`}>
                    {entry.badge.text}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </section>

        <section className="sidebar-nav-section">
          <header className="sidebar-section-header">
            <span>{language === 'fr' ? 'COMMUNAUTÉ' : 'COMMUNITY'}</span>
          </header>

          <nav className="sidebar-nav">
            {communityNavEntries.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className={`nav-item ${entry.id === view ? 'active' : ''}`}
                title={sidebarCollapsed ? entry.label : undefined}
                onClick={() => {
                  // Marque les annonces comme lues dès que l'utilisateur entre
                  // sur la page Annonces (l'icône cloche reste séparée).
                  if (entry.id === 'community') {
                    announcementsRead.markAllRead(DEFAULT_ANNOUNCEMENTS);
                  }
                  setView(entry.id);
                }}
              >
                <span className="nav-icon">
                  <img
                    src={entry.icon ? `/icons/${entry.icon}` : `/icons/icon_${entry.iconSlug}_${colorTheme}.png`}
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
                {entry.badge && (
                  <span className={`nav-badge nav-badge--${entry.badge.tone}`}>
                    {entry.badge.text}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </section>

        <section className="sidebar-nav-section">
          <header className="sidebar-section-header">
            <span>{language === 'fr' ? 'EXCLUSIF' : 'EXCLUSIVE'}</span>
          </header>

          <nav className="sidebar-nav">
            {exclusiveNavEntries.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className={`nav-item ${entry.id === view ? 'active' : ''}`}
                title={sidebarCollapsed ? entry.label : undefined}
                onClick={() => setView(entry.id)}
              >
                <span className="nav-icon">
                  <img
                    src={entry.icon ? `/icons/${entry.icon}` : `/icons/icon_${entry.iconSlug}_${colorTheme}.png`}
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
        </section>
        </div>

        <div className="sidebar-footer">
          {secondaryNavEntries.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={`nav-item ${entry.id === view ? 'active' : ''}`}
                title={sidebarCollapsed ? entry.label : undefined}
              onClick={() => setView(entry.id)}
            >
              <span className="nav-icon">
                <img
                  src={entry.icon ? `/icons/${entry.icon}` : `/icons/icon_${entry.iconSlug}_${colorTheme}.png`}
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
          <button type="button" className="nav-item" onClick={() => void signOut()}>
            <span className="nav-icon">
              <img
                src={`/icons/icon_se-deconnecter_${colorTheme}.png`}
                alt=""
                loading="lazy"
                draggable="false"
                onError={(event) => {
                  (event.currentTarget as HTMLImageElement).style.display = 'none';
                  (event.currentTarget.parentElement ?? event.currentTarget).textContent = '🚪';
                }}
              />
            </span>
            <span className="nav-label">{language === 'fr' ? 'Déconnexion' : 'Sign out'}</span>
          </button>
          {/* Toggle DEV/PROD — visible uniquement pour l'admin (cf. DevModeToggle). */}
          <DevModeToggle language={language} />
        </div>
      </aside>

      {/* Main Content Area — la topbar est extraite hors de <main> pour
          s'étendre sur toute la largeur du viewport, par-dessus la sidebar
          aussi (cf. JSX ci-dessus + .app-container grid-template-areas). */}
      <main className="main-content">
        {/* ErrorBoundary contextualisée par view : un crash dans Prof. Xiao,
            HanziWriter, etc., ne casse plus toute l'app — l'utilisateur peut
            cliquer "Retour au tableau de bord" pour s'échapper. La resetKey
            assure que la boundary se reset automatiquement à chaque
            changement de view (sinon l'erreur resterait sticky). */}
        <ErrorBoundary
          resetKey={view}
          language={language === 'en' ? 'en' : 'fr'}
          onReset={() => setView('home')}
        >
          {content}
        </ErrorBoundary>
      </main>

      {/* Toasts transients en bas-droite — flashent à chaque push() */}
      <NotificationToasts
        language={language === 'en' ? 'en' : 'fr'}
        onNavigate={(v) => setView(v as typeof view)}
      />


      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        language={language}
      />

      {/* Floating AI Chat - available on all pages except AI Assistant page.
          Branche sur la conversation "Quick chat" épinglée de useChatConversations
          → syncé Firestore cross-device, visible dans la liste de /tutor. */}
      {appAccess.canUseFloatingChat && view !== 'assistant' && (
        <AIFloatingChat
          language={language}
          onOpenFullPage={() => {
            // Assure que la page /tutor sélectionne la Quick chat à l'ouverture
            // (sinon elle reste sur la conv en cours côté /tutor, ce qui est
            // déroutant quand on vient de bavarder dans la bulle).
            const quick = tutorConvs.getOrCreateQuickChat(
              language === 'en' ? 'en' : 'fr'
            );
            tutorConvs.selectConversation(quick.id);
            setView('tutor');
          }}
          quickChatMessages={
            tutorConvs.conversations.find((c) => c.pinned === 'quick-chat')
              ?.messages
          }
          onUpdateQuickChat={(msgs) =>
            tutorConvs.upsertQuickChatMessages(
              msgs,
              language === 'en' ? 'en' : 'fr'
            )
          }
        />
      )}

      {/* Floating study timer — visible sur toutes les pages quand un timer est actif. */}
      <FloatingTimer language={language} />

      {/* Task #46 — Toast palier de série, visible sur TOUTES les pages
          (les awardXp depuis review / leçons / flashcards peuvent débloquer
          un palier alors que l'utilisateur n'est pas sur le dashboard). */}
      <StreakMilestoneToast bonus={dashboardState.bonus} language={language} />
      <XpBonusToast language={language} />
    </div>
  );
}

function AppWithAuth() {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <App />
      </NotificationsProvider>
    </AuthProvider>
  );
}

export default AppWithAuth;
