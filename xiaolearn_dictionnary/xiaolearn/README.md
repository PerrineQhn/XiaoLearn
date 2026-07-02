# XiaoLearn - Application d'Apprentissage du Chinois

Application mobile moderne pour l'apprentissage du chinois avec dictionnaire, flashcards et révision espacée.

## Fonctionnalités

- **Dictionnaire** : Recherche parmi plus de 11,000 mots chinois (HSK 1-7)
- **Flashcards** : Système de révision espacée avec algorithme SM-2 (SuperMemo)
- **Écriture** : Pratique de l'écriture des caractères avec reconnaissance
- **Progression** : Suivi détaillé de vos statistiques d'apprentissage

## Stack Technique

- **Framework** : React Native avec Expo
- **Langage** : TypeScript
- **Base de données** : SQLite (expo-sqlite)
- **Navigation** : React Navigation v6
- **State Management** : Zustand
- **Design** : Glassmorphism avec expo-blur et expo-linear-gradient

## Installation

### Prérequis

- Node.js 18+
- npm ou yarn
- Expo Go app sur votre téléphone (iOS/Android)

### Étapes

1. **Cloner et installer les dépendances**

```bash
cd xiaolearn
npm install
```

2. **Démarrer le serveur de développement**

```bash
npm start
# ou
npx expo start
```

3. **Scanner le QR code** avec l'app Expo Go sur votre téléphone

## Structure du Projet

```
xiaolearn/
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── shared/        # Composants de base (GlassCard, Button, etc.)
│   │   ├── dictionary/    # Composants du dictionnaire
│   │   ├── flashcards/    # Composants des flashcards
│   │   └── writing/       # Composants d'écriture
│   ├── screens/           # Écrans principaux
│   │   ├── DictionaryScreen.tsx
│   │   ├── FlashcardsScreen.tsx
│   │   ├── WritingScreen.tsx
│   │   └── ProgressScreen.tsx
│   ├── navigation/        # Configuration navigation
│   ├── store/            # Zustand stores
│   ├── database/         # SQLite (schéma, queries, migration)
│   ├── algorithms/       # Algorithme SM-2
│   ├── utils/           # Utilitaires et thème
│   └── types/           # Types TypeScript
├── data/                # Données HSK (JSON)
└── App.tsx             # Point d'entrée
```

## Migration des Données

La migration des données se fait **automatiquement** au premier lancement de l'application ! Les données HSK du dossier `data/` (format JSON) sont migrées vers SQLite lors de l'initialisation.

L'application vérifie si la base de données est vide et lance la migration si nécessaire.

## Design System

### Palette de Couleurs (Glassmorphism)

- Primary: `#667eea`
- Secondary: `#764ba2`
- Background: `#1a1a2e`
- Glass surface: `rgba(255, 255, 255, 0.1)`

### Composants de Base

- `<GlassCard>` : Carte avec effet glassmorphism
- `<Button>` : Bouton avec variantes (primary, glass, outline)
- `<Input>` : Champ de saisie avec style glassmorphism
- `<Container>` : Container avec gradient de fond

## Algorithme SM-2

L'application utilise l'algorithme SuperMemo 2 pour la révision espacée :

- **Quality 0-2** : Échec → Révision dans 1 jour
- **Quality 3-5** : Succès → Intervalle calculé selon l'historique

```typescript
import { calculateSM2 } from './src/algorithms/sm2';

const result = calculateSM2(quality, repetitions, easinessFactor, interval);
// Returns: { interval, repetitions, easinessFactor }
```

## Scripts Disponibles

- `npm start` : Démarrer le serveur Expo
- `npm run android` : Lancer sur émulateur Android
- `npm run ios` : Lancer sur simulateur iOS
- `npm run web` : Lancer version web

## Fonctionnalités Implémentées

### ✅ Phase 1 : Setup & Infrastructure (Complétée)
- ✅ Projet Expo avec TypeScript
- ✅ Structure de dossiers
- ✅ Base de données SQLite avec schéma complet
- ✅ Algorithme SM-2 pour révision espacée
- ✅ Design system glassmorphism
- ✅ Navigation avec 4 écrans

### ✅ Phase 2 : Dictionnaire (Complétée)
- ✅ Recherche full-text avec MiniSearch
- ✅ Composant SearchBar avec debounce
- ✅ Composant WordCard avec badges
- ✅ Filtres par niveau HSK
- ✅ WordDetailModal avec détails complets
- ✅ Player audio intégré
- ✅ Ajout aux flashcards depuis le dictionnaire
- ✅ Migration automatique des données au démarrage

### ✅ Phase 3 : Flashcards (Complétée)
- ✅ Store Zustand avec gestion de session
- ✅ Composant FlashCard avec animation flip 3D
- ✅ Boutons de qualité (Again/Hard/Good/Easy) avec intervalles
- ✅ SessionStats avec progression en temps réel
- ✅ ReviewScreen avec interface complète
- ✅ FlashcardsScreen avec tabs (À réviser / Toutes)
- ✅ Persistance des résultats et mise à jour SM-2
- ✅ Intégration complète avec le dictionnaire

### 🚧 Phase 4 : Écriture (Prochaine)
- [ ] Canvas de dessin
- [ ] Intégration ML Kit pour reconnaissance
- [ ] Feedback visuel

### Phase 6 : Progression
- [ ] Graphiques de statistiques
- [ ] Calendrier heatmap
- [ ] Calcul du streak

## Contribution

Ce projet est personnel mais les suggestions sont les bienvenues !

## Licence

MIT
