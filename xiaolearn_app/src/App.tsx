import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import './App.css';
import './styles/lesson-filters.css';
// --- V2 swap : pages drop-in ----------------------------------------------
import HomePageV2 from './pages/HomePageV2';
import StructuredLessonPageV2 from './pages/StructuredLessonPageV2';
// V7 — FlashcardPageV2 a été remplacé par FlashcardPageV3 (voir plus bas).
// L'import par défaut n'est plus nécessaire ; on conserve uniquement les
// types/mappers exportés depuis ce module (via utils/v2-mappers).
import AiTutorPageV2, { type AiTutorV2Message, type AiTutorV2Mode } from './pages/AiTutorPageV2';
import ReportPageV2 from './pages/ReportPageV2';
import GrammarDrillsPageV2 from './pages/GrammarDrillsPageV2';
import EvaluationPageV2 from './pages/EvaluationPageV2';
import CommunityPageV2 from './pages/CommunityPageV2';
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
import { useLessonMastery } from './hooks/useLessonMastery';
import { useLevelBilans } from './hooks/useLevelBilans';
import { usePersonalFlashcards } from './hooks/usePersonalFlashcards';
import type { CecrLevelSlug } from './types/simulator';
import type { SentenceFlashcard } from './types/flashcard-v3';
// --- Pages V1 conservées (pas de variante V2 à ce jour) --------------------
import CPlayerPage from './pages/CPlayerPage';
import LessonPage from './pages/LessonPage';
import LessonPathsPage from './pages/LessonPathsPage';
import QuizPage from './pages/QuizPage';
// V7 — ReviewPage (V1) a été remplacé par ReviewPageV3 (voir plus haut).
import ThemePage from './pages/ThemePage';
import DictionaryPage from './pages/DictionaryPage';
import AssistancePage from './pages/AssistancePage';
import DictationGamePage from './pages/DictationGamePage';
import SettingsPage from './pages/SettingsPage';
import SubscriptionPage from './pages/SubscriptionPage';
import MiniGamesPage from './pages/MiniGamesPage';
import CulturePage from './pages/CulturePage';
// V9.6 — Overlay d'harmonisation des en-têtes. Importé APRÈS toutes les pages
// pour que son ordre dans le bundle Vite soit le DERNIER et prime sur les
// styles scopés de chaque page V2.
import './styles/page-shell.css';
import LanguageSwitcher from './components/LanguageSwitcher';
import AIFloatingChat from './components/AIFloatingChat';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginModal from './components/Auth/LoginModal';
import UserProfile from './components/Auth/UserProfile';
import { useLessonProgress } from './hooks/useLessonProgress';
import { useLearningStats } from './hooks/useLearningStats';
import { useFirestoreSync } from './hooks/useFirestoreSync';
import { useWordSRS } from './hooks/useWordSRS';
import { useQuizEngine } from './hooks/useQuizEngine';
import { useEntitlements } from './hooks/useEntitlements';
import { useUserProfileSync } from './hooks/useUserProfileSync';
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
import { createCheckoutSession, createPortalSession } from './services/payments';
import { buildAppAccess } from './utils/access';
import { playAudioWithFallback } from './utils/audio';
import {
  lessonModuleToV2,
  lessonItemToFlashcardV2,
  DEFAULT_GRAMMAR_DRILLS,
  buildDefaultEvaluation,
  DEFAULT_ANNOUNCEMENTS,
  DEFAULT_CHALLENGES,
  DEFAULT_LEADERBOARD,
  buildReportData
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
  | 'dictionary'
  | 'assistant'
  | 'subscription'
  | 'settings'
  | 'games'
  | 'flashcards'
  | 'free-learning'
  // Nouveaux écrans V2
  | 'tutor'
  | 'report'
  | 'drills'
  | 'evaluation'
  | 'community'
  | 'dialogue'
  | 'reading'
  | 'simulator'
  // Refonte CECR — unique taxonomie d'apprentissage exposée à l'utilisateur.
  // Les fichiers HSK (lessonPaths, level1-course, level2-course) restent sur
  // disque et servent de pool de vocabulaire pour cecr-course.ts, mais
  // ne sont plus accessibles via la navigation.
  | 'cecr'
  // V7 — Bilan de fin de niveau (10 questions, 80% requis, +60 XP one-time).
  | 'bilan';

const themeSummaries = getThemeSummaries();
const defaultTheme = themeSummaries[0]?.theme ?? null;
const COMPLETED_LESSONS_KEY = 'cl_completed_lessons';
const DAILY_GOAL_MINUTES = 10;

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

const buildLessonPathsState = (
  paths: LessonPath[],
  completedIds: string[],
  hasFullLessonAccess: boolean,
  hsk1LessonLimit: number
) => {
  const completedSet = new Set(completedIds);
  let unlockedHsk1Count = 0;
  return paths.map((path) => {
    const lessons = path.lessons.map((lesson) => {
      const completed = completedSet.has(lesson.id);
      let unlocked = hasFullLessonAccess;
      if (!hasFullLessonAccess) {
        if (lesson.hskLevel === 1 && unlockedHsk1Count < hsk1LessonLimit) {
          unlocked = true;
          unlockedHsk1Count += 1;
        } else {
          unlocked = false;
        }
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
  const [view, setView] = useState<View>('home');
  const [language, setLanguage] = useState<Language>('fr');
  const [darkMode, setDarkMode] = useState(false);
  const colorTheme = 'asian-red';
  const [selectedLesson, setSelectedLesson] = useState<{ pathId: string; lessonId: string } | null>(null);
  const [logoErrored, setLogoErrored] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const copy = getCopy(language);
  const [focusedTheme, setFocusedTheme] = useState<string | null>(defaultTheme);
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => readCompletedLessons());
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
  const appAccess = useMemo(() => buildAppAccess(user, entitlements?.app ?? null), [user, entitlements]);
  const mergedLessonPaths = useMemo(() => mergeStructuredPaths(lessonPaths), []);
  const lessonPathsState = useMemo(
    () =>
      buildLessonPathsState(
        mergedLessonPaths,
        completedLessons,
        appAccess.canAccessAllLessons,
        appAccess.hsk1LessonLimit
      ),
    [mergedLessonPaths, completedLessons, appAccess.canAccessAllLessons, appAccess.hsk1LessonLimit]
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
        appAccess.hsk1LessonLimit
      ),
    [completedLessons, appAccess.canAccessAllLessons, appAccess.hsk1LessonLimit]
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
  const dashboardState = useDashboardState({
    dueCardsCount: lessonProgress.reviewItems.length,
    nextLessonTitle: lessonProgress.todaySummary[0]?.translationFr,
    nextLessonId: lessonProgress.todaySummary[0]?.id
  });
  // `learningStats` vient maintenant du hook useLearningStats déclaré plus haut
  // (sync Firestore). L'ancien setLearningStats impératif est remplacé par
  // `applyLearningSessionSync` qui maj directement l'état interne du hook.
  const topThemes = themeSummaries.slice(0, 4);

  // --- V7 hooks : SRS par leçon, bilans de niveau, flashcards perso -------
  const lessonMastery = useLessonMastery({ syncEnabled: appAccess.syncEnabled });
  const levelBilans = useLevelBilans({
    onFirstPass: (_level, xp) => dashboardState.awardXp(xp)
  });
  const personalFlashcards = usePersonalFlashcards({
    syncEnabled: appAccess.syncEnabled,
    lookupPinyin: lookupPinyinForHanzi
  });
  // Sélection en cours pour la page Bilan (niveau CECR à passer).
  const [bilanLevel, setBilanLevel] = useState<CecrLevelSlug | null>(null);

  // --- État AI Tutor (messages contrôlés côté parent) ----------------------
  const [tutorMessages, setTutorMessages] = useState<AiTutorV2Message[]>([]);
  const [tutorTyping, setTutorTyping] = useState(false);
  const [tutorMode, setTutorMode] = useState<AiTutorV2Mode>('balanced');

  const handleTutorSend = useCallback(
    (payload: { content: string; mode: AiTutorV2Mode }) => {
      const now = Date.now();
      const userMsg: AiTutorV2Message = {
        id: `user-${now}`,
        role: 'user',
        content: payload.content,
        createdAt: now
      };
      setTutorMessages((prev) => [...prev, userMsg]);
      setTutorTyping(true);
      // Placeholder : la vraie intégration IA (OpenAI/Anthropic/Gemini) reste
      // à brancher. On écho un message d'attente pour que l'UX ne paraisse
      // pas cassée.
      window.setTimeout(() => {
        setTutorMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content:
              language === 'fr'
                ? 'Je suis connecté mais ma connexion IA n\'est pas encore branchée sur cette version. Utilise la boîte de chat flottante en attendant.'
                : 'I am connected but the AI backend is not wired to this V2 page yet. Use the floating chat for now.',
            createdAt: Date.now()
          }
        ]);
        setTutorTyping(false);
      }, 600);
    },
    [language]
  );

  // --- Liste plate de tous les mots déjà vus (pour le deck Flashcards V2) --
  const allFlashcardItems = useMemo<LessonItem[]>(() => {
    const seen = new Set<string>();
    const items: LessonItem[] = [];
    const pushUnique = (word: LessonItem | undefined) => {
      if (!word || seen.has(word.id)) return;
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

  /**
   * Phrases extraites des dialogues des leçons complétées, présentées comme
   * SentenceFlashcard dans l'onglet "Phrases" de FlashcardPageV3.
   * - Fusionne SRS persisté sur `cl_sentence_flashcards_v7` si présent.
   */
  const sentenceCards = useMemo<SentenceFlashcard[]>(() => {
    if (completedLessons.length === 0) return [];
    const lessonsById = new Map<string, LessonModule>();
    for (const path of cecrPathsState) {
      for (const lesson of path.lessons) lessonsById.set(lesson.id, lesson);
    }
    const out: SentenceFlashcard[] = [];
    for (const lessonId of completedLessons) {
      const lesson = lessonsById.get(lessonId);
      if (!lesson?.dialogue?.lines) continue;
      lesson.dialogue.lines.forEach((line, idx) => {
        out.push({
          id: `sent-${lessonId}-${idx}`,
          lessonId,
          lessonTitleFr: lesson.title,
          lessonTitleEn: lesson.titleEn,
          hanzi: line.hanzi,
          pinyin: line.pinyin,
          translationFr: line.translationFr,
          translationEn: line.translationEn,
          speaker: line.speaker,
          contextFr: lesson.dialogue?.context
        });
      });
    }
    return out;
  }, [completedLessons, cecrPathsState]);

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

  const primaryNavEntries = useMemo<{ id: View; label: string; iconSlug: string; fallback: string }[]>(
    () =>
      [
        { id: 'home', label: language === 'fr' ? 'Accueil' : 'Home', iconSlug: 'home', fallback: '🏠' },
        { id: 'cecr', label: language === 'fr' ? 'Leçons' : 'Lessons', iconSlug: 'lecons', fallback: '📚' },
        { id: 'flashcards', label: 'Flashcards', iconSlug: 'flash-card', fallback: '🃏' },
        { id: 'free-learning', label: language === 'fr' ? 'Apprentissage libre' : 'Free learning', iconSlug: 'evaluation', fallback: '🎯' },
        { id: 'simulator', label: language === 'fr' ? 'Simulateur' : 'Simulator', iconSlug: 'simulateur', fallback: '🎭' },
        { id: 'tutor', label: language === 'fr' ? 'Prof. Xiao' : 'Prof. Xiao', iconSlug: 'ai', fallback: '💬' }
        // 🗑️ « Traduction » retirée de la nav primaire (demande NoComment) :
        // la vue 'dictionary' reste accessible via routes/liens internes si besoin,
        // mais n'est plus proposée comme onglet principal.
      ] satisfies { id: View; label: string; iconSlug: string; fallback: string }[],
    [language]
  );
  const practiceNavEntries = useMemo<{ id: View; label: string; iconSlug: string; fallback: string }[]>(
    () =>
      [
        { id: 'drills', label: language === 'fr' ? 'Grammaire' : 'Grammar', iconSlug: 'grammaire', fallback: '📐' },
        { id: 'evaluation', label: language === 'fr' ? 'Évaluation' : 'Evaluation', iconSlug: 'quiz', fallback: '🎯' },
        { id: 'report', label: language === 'fr' ? 'Bilan' : 'Report', iconSlug: 'objectifs', fallback: '📊' },
        { id: 'community', label: language === 'fr' ? 'Communauté' : 'Community', iconSlug: 'communaute', fallback: '👥' }
      ] satisfies { id: View; label: string; iconSlug: string; fallback: string }[],
    [language]
  );
  const secondaryNavEntries = useMemo<{ id: View; label: string; iconSlug: string; fallback: string }[]>(
    () =>
      [
        { id: 'settings', label: language === 'fr' ? 'Réglages' : 'Settings', iconSlug: 'settings', fallback: '⚙️' },
        { id: 'assistant', label: language === 'fr' ? 'Assistance' : 'Support', iconSlug: 'bouee-de-sauvetage', fallback: '🛟' }
      ] satisfies { id: View; label: string; iconSlug: string; fallback: string }[],
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
      content = <CPlayerPage language={language} onBackHome={() => setView('home')} />;
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
          dailyGoalMinutes={DAILY_GOAL_MINUTES}
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
          completedLessonIds={new Set(completedLessons)}
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
            lessonItemToFlashcardV2(item, wordSrs.masteredIds, wordSrs.difficultIds, learnedIdsSet)
          )}
          sentenceCards={sentenceCards}
          personalHook={personalFlashcards}
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
            lessonItemToFlashcardV2(item, wordSrs.masteredIds, wordSrs.difficultIds, learnedIdsSet)
          )}
          dueIds={wordSrs.dueIds}
          masteredIds={wordSrs.masteredIds}
          difficultIds={wordSrs.difficultIds}
          onRate={wordSrs.rate}
        />
      );
      break;
    case 'settings':
      content = (
        <SettingsPage
          language={language}
          onLanguageChange={setLanguage}
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
          onClear={() => setTutorMessages([])}
          onSend={handleTutorSend}
        />
      );
      break;
    case 'report': {
      const heatmap = Object.entries(dashboardState.activity).map(([date, count]) => ({
        date,
        count: count as number
      }));
      // V9.9 — pages accessibles via sidebar secondaire, pas de "Retour".
      content = (
        <ReportPageV2
          {...buildReportData(
            {
              learnedThisMonth: lessonProgress.allLearnedItems.length,
              masteredThisMonth: 0,
              xpGained: dashboardState.xp.xp,
              level: dashboardState.xp.level,
              activeDays: heatmap.filter((d) => d.count > 0).length,
              totals: lessonProgress.totals as Record<string, number>,
              heatmap
            },
            language
          )}
          language={language}
          userDisplayName={user?.displayName ?? undefined}
        />
      );
      break;
    }
    case 'drills':
      content = (
        <GrammarDrillsPageV2
          topics={DEFAULT_GRAMMAR_DRILLS}
          language={language}
        />
      );
      break;
    case 'evaluation':
      content = (
        <EvaluationPageV2
          evaluation={buildDefaultEvaluation('hsk1')}
          language={language}
          userDisplayName={user?.displayName ?? undefined}
        />
      );
      break;
    case 'community':
      content = (
        <CommunityPageV2
          language={language}
          announcements={DEFAULT_ANNOUNCEMENTS}
          challenges={DEFAULT_CHALLENGES}
          leaderboard={DEFAULT_LEADERBOARD}
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
          dueCardsCount={lessonProgress.reviewItems.length}
          userDisplayName={user?.displayName ?? undefined}
          cecrPaths={cecrPathsState}
          cecrLevels={cecrLevels}
          completedLessonIds={new Set(completedLessons)}
          onStartReview={() => setView('review')}
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
          onOpenDictionary={() => setView('dictionary')}
          onOpenDialogue={() => setView('dialogue')}
          onOpenReading={() => setView('reading')}
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

        <section className="sidebar-nav-section">
          <header className="sidebar-section-header">
            <span>{language === 'fr' ? 'APPRENDRE' : 'LEARN'}</span>
            <span className="sidebar-section-chevron" aria-hidden="true">⌄</span>
          </header>

          <nav className="sidebar-nav">
            {primaryNavEntries.map((entry) => (
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
        </section>

        <section className="sidebar-nav-section">
          <header className="sidebar-section-header">
            <span>{language === 'fr' ? 'PRATIQUER' : 'PRACTICE'}</span>
            <span className="sidebar-section-chevron" aria-hidden="true">⌄</span>
          </header>

          <nav className="sidebar-nav">
            {practiceNavEntries.map((entry) => (
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
        </section>

        <div className="sidebar-footer">
          <button
            type="button"
            className={`nav-item ${view === 'subscription' ? 'active' : ''}`}
            onClick={() => setView('subscription')}
          >
            <span className="nav-icon">
              <img
                src={`/icons/icon_objectifs_${colorTheme}.png`}
                alt=""
                loading="lazy"
                draggable="false"
                onError={(event) => {
                  (event.currentTarget as HTMLImageElement).style.display = 'none';
                  (event.currentTarget.parentElement ?? event.currentTarget).textContent = '💳';
                }}
              />
            </span>
            <span className="nav-label">{language === 'fr' ? 'Abonnement' : 'Subscription'}</span>
          </button>
          {secondaryNavEntries.map((entry) => (
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
      {appAccess.canUseFloatingChat && view !== 'assistant' && <AIFloatingChat language={language} />}
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
