# Architecture de XiaoLearn

Documentation complète de l'architecture technique de XiaoLearn.

---

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture frontend](#architecture-frontend)
3. [Gestion des données](#gestion-des-données)
4. [Système d'authentification](#système-dauthentification)
5. [Algorithme SRS](#algorithme-srs)
6. [Système de progression](#système-de-progression)
7. [PWA et mode hors-ligne](#pwa-et-mode-hors-ligne)
8. [Déploiement](#déploiement)

---

## Vue d'ensemble

### Stack technique

```
┌─────────────────────────────────────────────────────┐
│                    XiaoLearn                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Frontend (React + TypeScript + Vite)              │
│  ├─ React 18 (UI Components)                       │
│  ├─ TypeScript 5 (Type Safety)                     │
│  ├─ Vite 5 (Build Tool)                           │
│  └─ CSS Modules (Styling)                          │
│                                                     │
│  Authentification (Firebase)                       │
│  ├─ Firebase Auth (Google OAuth, Email/Password)  │
│  └─ Firestore (User Progress Storage)             │
│                                                     │
│  Données (Static + Generated)                      │
│  ├─ HSK 3.0 Data (JSON)                           │
│  ├─ CC-CEDICT Dictionary                          │
│  └─ Audio Files (MP3/WAV)                         │
│                                                     │
│  Génération de contenu (Scripts)                   │
│  ├─ Node.js Scripts (Data Processing)             │
│  ├─ Python Scripts (TTS)                          │
│  └─ ML Models (Translation)                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Flux de données

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   GitHub     │────▶│    Vite      │────▶│  Browser     │
│   (Source)   │     │   (Build)    │     │   (Runtime)  │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                     │
       │                    │                     │
       ▼                    ▼                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  HSK Data    │     │  Static      │     │  Firebase    │
│  Scripts     │────▶│  Assets      │◀────│  Auth        │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                     │
       ▼                    │                     ▼
┌──────────────┐            │              ┌──────────────┐
│  Audio       │            │              │  User Data   │
│  Generation  │────────────┘              │  (Firestore) │
└──────────────┘                           └──────────────┘
```

---

## Architecture frontend

### Structure des composants

```
src/
├── App.tsx                    # Composant racine
│   ├── AuthProvider          # Contexte d'authentification
│   ├── Router                # Routage de l'application
│   └── Layout                # Layout global
│
├── pages/                     # Pages de l'application
│   ├── HomePage              # Accueil + dashboard
│   ├── LessonPathsPage       # Liste des parcours
│   ├── StructuredLessonPage  # Leçon interactive
│   ├── FlashcardPage         # Révisions flashcards
│   ├── MiniGamesPage         # Mini-jeux
│   ├── DictionaryPage        # Dictionnaire HSK
│   ├── SettingsPage          # Paramètres utilisateur
│   └── ReviewPage            # Révisions SRS
│
├── components/                # Composants réutilisables
│   ├── Auth/
│   │   ├── LoginForm         # Formulaire de connexion
│   │   ├── SignupForm        # Formulaire d'inscription
│   │   └── GoogleSignInButton
│   │
│   ├── exercises/            # Types d'exercices
│   │   ├── ListeningExercise
│   │   ├── TextMCQExercise
│   │   ├── GrammarExercise
│   │   └── SentenceBuilderExercise
│   │
│   ├── games/                # Mini-jeux
│   │   ├── MemoryMatchGame
│   │   ├── SpeedQuizGame
│   │   ├── PinyinTypingGame
│   │   ├── SentenceBuilderGame
│   │   └── FallingCharactersGame
│   │
│   ├── FlashcardItem         # Carte de révision
│   ├── AudioButton           # Bouton lecture audio
│   ├── ProgressChart         # Graphiques de progression
│   └── LevelBadge            # Badge de niveau HSK
│
├── hooks/                     # Hooks personnalisés
│   ├── useFlashcardSRS       # Algorithme SRS
│   ├── useLessonProgress     # Suivi progression leçons
│   ├── useUserProgress       # Stats utilisateur
│   ├── useAudio              # Gestion audio
│   └── useAuth               # Authentification
│
├── contexts/                  # Contextes React
│   ├── AuthContext           # État d'authentification
│   └── LanguageContext       # Langue de l'interface (FR/EN)
│
├── types/                     # Types TypeScript
│   └── index.ts              # Types globaux
│
└── utils/                     # Fonctions utilitaires
    ├── audioUtils.ts         # Utilitaires audio
    ├── srsAlgorithm.ts       # Logique SRS
    └── progressCalculator.ts # Calculs de progression
```

### Routage

```typescript
// src/App.tsx
const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/paths', element: <LessonPathsPage /> },
  { path: '/lesson/:pathId/:lessonId', element: <StructuredLessonPage /> },
  { path: '/flashcards', element: <FlashcardPage /> },
  { path: '/games', element: <MiniGamesPage /> },
  { path: '/dictionary', element: <DictionaryPage /> },
  { path: '/settings', element: <SettingsPage /> },
  { path: '/review', element: <ReviewPage /> }
];
```

### État global

```typescript
// Contexte d'authentification
interface AuthContext {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

// Contexte de langue
interface LanguageContext {
  language: 'fr' | 'en';
  setLanguage: (lang: 'fr' | 'en') => void;
  t: (key: string) => string;  // Fonction de traduction
}
```

---

## Gestion des données

### Types de données

```typescript
// Types principaux
interface LessonItem {
  id: string;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  characters: string;
  pinyin: string;
  translation: string;
  translationEn: string;
  pos: string;  // partie du discours
  themes: string[];
  audioSlug: string;
}

interface LessonPath {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  titleEn: string;
  duration: number;
  completed: boolean;
  locked: boolean;
  introduction: {
    title: string;
    titleEn: string;
    content: string;
    contentEn: string;
    objectives: string[];
    objectivesEn: string[];
  };
  flashcards: string[];  // IDs des mots à apprendre
  quizQuestions: number;
}

interface LessonExercise {
  id: string;
  lessonId: string;
  type: 'listening' | 'text-mcq' | 'grammar' | 'sentence-builder';
  promptFr: string;
  promptEn: string;
  // ... propriétés spécifiques au type
}
```

### Chargement des données

```typescript
// src/data/lessons.ts
import hsk1 from '../../data/hsk1.json';
import hsk2 from '../../data/hsk2.json';
// ... autres niveaux

export const hskData = {
  hsk1,
  hsk2,
  hsk3,
  hsk4,
  hsk5,
  hsk6,
  hsk7
};

// Recherche par ID
export function getWordById(id: string): LessonItem | undefined {
  for (const level of Object.values(hskData)) {
    const word = level.find(item => item.id === id);
    if (word) return word;
  }
  return undefined;
}

// Recherche par caractères
export function getWordByCharacters(characters: string): LessonItem | undefined {
  for (const level of Object.values(hskData)) {
    const word = level.find(item => item.characters === characters);
    if (word) return word;
  }
  return undefined;
}
```

### Parcours et leçons

```typescript
// src/data/lesson-paths.ts
export const lessonPaths: LessonPath[] = [
  {
    id: 'pinyin-tones',
    name: 'Pinyin & Tons',
    nameEn: 'Pinyin & Tones',
    description: 'Maîtrisez la prononciation et les 4 tons',
    descriptionEn: 'Master pronunciation and the 4 tones',
    icon: 'sound',
    color: '#FF6B6B',
    lessons: [...]
  },
  {
    id: 'basic-phrases',
    name: 'Phrases de base',
    nameEn: 'Basic Phrases',
    description: 'Conversations essentielles du quotidien',
    descriptionEn: 'Essential daily conversations',
    icon: 'chat',
    color: '#4ECDC4',
    lessons: [...]
  },
  // ... 6 autres parcours
];
```

---

## Système d'authentification

### Firebase Configuration

```typescript
// src/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### AuthContext

```typescript
// src/contexts/AuthContext.tsx
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Observer les changements d'état d'authentification
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      // Synchroniser la progression si l'utilisateur est connecté
      if (user) {
        syncUserProgress(user.uid);
      }
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  // ...autres méthodes

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInWithGoogle, ... }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
```

### Structure Firestore

```
users/
  ├── {userId}/
  │   ├── profile
  │   │   ├── displayName: string
  │   │   ├── email: string
  │   │   ├── photoURL: string
  │   │   └── createdAt: Timestamp
  │   │
  │   ├── progress
  │   │   ├── wordsLearned: number
  │   │   ├── wordsReviewed: number
  │   │   ├── currentStreak: number
  │   │   ├── longestStreak: number
  │   │   ├── totalStudyTime: number (minutes)
  │   │   └── lastStudyDate: Timestamp
  │   │
  │   ├── settings
  │   │   ├── dailyGoal: number
  │   │   ├── reviewsPerDay: number
  │   │   ├── language: 'fr' | 'en'
  │   │   └── audioAutoplay: boolean
  │   │
  │   └── flashcards (subcollection)
  │       └── {wordId}
  │           ├── interval: number (jours)
  │           ├── easeFactor: number
  │           ├── consecutiveCorrect: number
  │           ├── lastReviewed: Timestamp
  │           ├── nextReview: Timestamp
  │           └── totalReviews: number
```

---

## Algorithme SRS

### Implémentation SM-2

Le système de répétition espacée (SRS) utilise l'algorithme **SuperMemo 2 (SM-2)**.

```typescript
// src/hooks/useFlashcardSRS.ts

interface FlashcardData {
  interval: number;        // Intervalle en jours
  easeFactor: number;      // Facteur de facilité (1.3 - 2.5)
  consecutiveCorrect: number;
  lastReviewed: Date;
  nextReview: Date;
  totalReviews: number;
}

function calculateNextReview(
  card: FlashcardData,
  quality: 0 | 1 | 2 | 3 | 4 | 5  // 0 = échec total, 5 = parfait
): FlashcardData {
  let { interval, easeFactor, consecutiveCorrect } = card;

  // Mise à jour de l'ease factor
  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  // Calcul du nouvel intervalle
  if (quality < 3) {
    // Échec : recommencer à 1 jour
    interval = 1;
    consecutiveCorrect = 0;
  } else {
    // Succès : augmenter l'intervalle
    if (consecutiveCorrect === 0) {
      interval = 1;
    } else if (consecutiveCorrect === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    consecutiveCorrect++;
  }

  const now = new Date();
  const nextReview = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

  return {
    interval,
    easeFactor,
    consecutiveCorrect,
    lastReviewed: now,
    nextReview,
    totalReviews: card.totalReviews + 1
  };
}
```

### Exemple de progression

```
Révision 1: Qualité 4 → Intervalle: 1 jour
Révision 2: Qualité 5 → Intervalle: 6 jours
Révision 3: Qualité 4 → Intervalle: 15 jours (6 × 2.5)
Révision 4: Qualité 3 → Intervalle: 34 jours (15 × 2.28)
Révision 5: Qualité 2 → Intervalle: 1 jour (échec, redémarrage)
```

---

## Système de progression

### Suivi des leçons

```typescript
// src/hooks/useLessonProgress.ts

interface LessonProgressData {
  lessonId: string;
  pathId: string;
  completed: boolean;
  score: number;  // 0-100
  exercisesCompleted: string[];
  timeSpent: number;  // minutes
  completedAt?: Date;
}

function useLessonProgress(lessonId: string) {
  const [progress, setProgress] = useState<LessonProgressData | null>(null);

  // Charger depuis localStorage ou Firestore
  useEffect(() => {
    const saved = localStorage.getItem(`lesson_${lessonId}`);
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, [lessonId]);

  // Sauvegarder la progression
  const updateProgress = useCallback((updates: Partial<LessonProgressData>) => {
    const newProgress = { ...progress, ...updates };
    setProgress(newProgress);

    // Sauvegarder localement
    localStorage.setItem(`lesson_${lessonId}`, JSON.stringify(newProgress));

    // Synchroniser avec Firebase si connecté
    if (auth.currentUser) {
      syncToFirestore(auth.currentUser.uid, lessonId, newProgress);
    }
  }, [progress, lessonId]);

  return { progress, updateProgress };
}
```

### Statistiques utilisateur

```typescript
// src/hooks/useUserProgress.ts

interface UserStats {
  // Vocabulaire
  wordsLearned: number;
  wordsReviewed: number;
  masteredWords: number;  // Interval > 30 jours

  // Leçons
  lessonsCompleted: number;
  pathsCompleted: number;
  currentPath: string | null;

  // Temps
  totalStudyTime: number;  // minutes
  averageSessionTime: number;

  // Série
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: Date;

  // Précision
  averageAccuracy: number;  // 0-100
  strongestTheme: string;
  weakestTheme: string;
}

function calculateStats(
  flashcards: FlashcardData[],
  lessonProgress: LessonProgressData[]
): UserStats {
  // Calcul des métriques...
}
```

---

## PWA et mode hors-ligne

### Service Worker

```javascript
// public/sw.js
const CACHE_NAME = 'xiaolearn-v1.0.0';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/assets/index.js',
  '/assets/index.css',
  // ... autres assets
];

const AUDIO_CACHE = 'xiaolearn-audio-v1';
const DATA_CACHE = 'xiaolearn-data-v1';

// Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Stratégie de cache
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Audio files: Cache First
  if (request.url.includes('/audio/')) {
    event.respondWith(
      caches.open(AUDIO_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          return response || fetch(request).then((networkResponse) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Data files: Network First, fallback to cache
  if (request.url.includes('/data/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clonedResponse = response.clone();
          caches.open(DATA_CACHE).then((cache) => {
            cache.put(request, clonedResponse);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // Default: Cache First
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request);
    })
  );
});
```

### Manifest PWA

```json
{
  "name": "XiaoLearn - Apprendre le chinois HSK",
  "short_name": "XiaoLearn",
  "description": "Application d'apprentissage du chinois mandarin HSK 3.0",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#FF6B6B",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## Déploiement

### Pipeline CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build
        env:
          VITE_USE_CUSTOM_DOMAIN: ${{ secrets.VITE_USE_CUSTOM_DOMAIN }}
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          # ... autres secrets

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

### Configuration Vite

```typescript
// vite.config.ts
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const useCustomDomain = process.env.VITE_USE_CUSTOM_DOMAIN || env.VITE_USE_CUSTOM_DOMAIN;

  return {
    base: useCustomDomain === 'true' ? '/' : '/XiaoLearn/',
    plugins: [react()],
    build: {
      chunkSizeWarningLimit: 6000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'react-vendor';
              if (id.includes('chart')) return 'charts';
              return 'vendor';
            }
          }
        }
      }
    }
  };
});
```

---

<div align="center">

**Documentation maintenue par [@perrineqhn](https://github.com/perrineqhn)**

</div>
