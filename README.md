# 🐼 XiaoLearn - Application d'apprentissage du chinois HSK 3.0

<div align="center">

**Application web progressive (PWA) pour apprendre le chinois mandarin basée sur les listes HSK 3.0 officielles**

[![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed-xiaolearn.com-blue)](https://xiaolearn.com)
[![React](https://img.shields.io/badge/React-18.2-61dafb)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646cff)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-orange)](https://firebase.google.com/)

[🌐 Site Web](https://xiaolearn.com) | [📚 Documentation](docs/) | [🐛 Rapporter un bug](https://github.com/perrineqhn/XiaoLearn/issues)

</div>

---

## ✨ Fonctionnalités principales

### 📚 Apprentissage structuré
- **8 parcours d'apprentissage** thématiques couvrant HSK 1-3
- **100+ leçons** progressives avec contenu varié
- **5 types d'exercices** : Écoute, Écriture, Dialogue, Lecture, Grammaire
- **5 mini-jeux interactifs** : Memory Match, Speed Quiz, Falling Characters, Pinyin Typing, Sentence Builder

### 📖 Contenu HSK 3.0 complet
- **~10 000 mots** de vocabulaire (HSK 1-7)
- **Données officielles** issues de [ivankra/hsk30](https://github.com/ivankra/hsk30)
- **Dictionnaire CC-CEDICT** intégré avec 115 000+ entrées
- **Audio haute qualité** : Google Cloud TTS + Coqui TTS local
- **Interface bilingue** : Français & Anglais

### 🎯 Système de révision intelligent
- **Algorithme SRS** (Spaced Repetition System) pour mémorisation optimale
- **Flashcards personnalisées** par niveau HSK (1-7)
- **4 modes de révision** : SRS, Quiz, Dictation, Handwriting
- **Listes personnalisées** : créez vos propres collections de mots
- **Statistiques détaillées** : série d'apprentissage, minutes quotidiennes, progression par niveau
- **Objectif quotidien** : 10 minutes d'apprentissage par jour

### 🤖 Assistant IA intégré
- **Google Gemini API** : réponses intelligentes en chinois et français
- **Historique de conversation** sauvegardé localement
- **Questions suggérées** pour les débutants
- **Support Markdown** pour des réponses formatées
- **Nouveau chat** à tout moment

### 🔐 Authentification et synchronisation
- **Firebase Authentication** :
  - Google OAuth (connexion avec Google)
  - Email/Password (inscription et connexion traditionnelle)
- **Photos de profil** stockées sur Firebase Storage
- **Sauvegarde locale** : progression sauvegardée dans le navigateur
- **Mode hors-ligne** : PWA installable, fonctionne sans connexion

### 🎨 Interface moderne et personnalisable
- **6 thèmes de couleurs** :
  - Asian Red (rouge asiatique)
  - Imperial Jade (vert jade impérial)
  - Royal Purple (violet royal)
  - Ocean Blue (bleu océan)
  - Sunset Orange (orange couchant)
  - Sakura Pink (rose sakura)
- **Mode sombre/clair** avec basculement facile
- **Design responsive** : optimisé mobile, tablette, desktop
- **Animations fluides** : transitions React, feedback visuel
- **Navigation intuitive** : barre latérale avec 8 sections principales

---

## 🎮 Mini-jeux disponibles

### 1. Memory Match
Associez les caractères chinois avec leurs traductions
- 6 paires par manche
- Score basé sur les correspondances correctes

### 2. Speed Quiz
Quiz chronométré de 60 secondes
- Questions à choix multiples
- 10 points par bonne réponse
- Mots aléatoires de votre vocabulaire appris

### 3. Falling Characters
Attrapez les caractères qui tombent
- 45 secondes de jeu
- 3 vies
- 15 points par caractère attrapé

### 4. Pinyin Typing
Tapez le pinyin des caractères affichés
- 8 manches par partie
- Support des tons (optionnel)
- 12 points par réponse correcte

### 5. Sentence Builder
Construisez des phrases correctes en réarrangeant les mots
- 5 défis par partie
- Ordre exact requis
- 25 points par phrase correcte

---

## 📱 Pages et fonctionnalités

### Page d'accueil
- Tableau de bord avec statistiques de progression
- Carte de progression quotidienne (objectif 10 minutes)
- Série d'apprentissage (jours consécutifs)
- Cartes de révision en attente
- Accès rapide aux thèmes et leçons

### Leçons
- Navigation par parcours thématiques
- Indicateurs de progression et de complétion
- Leçons structurées avec phases et exercices variés
- Suivi automatique des mots appris

### Cartes Mémoire
- Organisation par niveau HSK (1-7)
- Système de flashcards avec retournement
- Marquage "connu" / "à revoir"
- Mode d'apprentissage progressif

### Révisions
- 4 modes de révision : SRS, Quiz, Dictation, Handwriting
- Gestion des listes personnalisées
- Suivi des révisions en attente
- Algorithme de répétition espacée

### Mini-Jeux
- Sélection des 5 jeux interactifs
- Système de scoring
- Apprentissage ludique et engageant

### Assistant IA
- Chat intelligent alimenté par Google Gemini
- Questions sur le chinois, la grammaire, la culture
- Historique de conversation
- Interface conversationnelle fluide

### Thèmes
- Navigation par thèmes de vocabulaire
- Ajout de mots aux listes personnalisées
- Exploration du vocabulaire par catégories

### Dictionnaire
- Recherche intelligente avec correspondance floue
- Filtrage par niveau HSK
- Recherche par hanzi, pinyin, français, anglais
- Historique de recherche
- Ajout aux listes personnalisées

### Paramètres
- Changement de langue (FR/EN)
- Sélection du thème de couleur
- Gestion du profil utilisateur
- Upload de photo de profil

---

## 🚀 Installation rapide

### Prérequis
- **Node.js** 18+ et npm
- **Python** 3.10+ (pour la génération audio)
- **Git**

### Étapes d'installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/perrineqhn/XiaoLearn.git
cd XiaoLearn

# 2. Installer les dépendances Node.js
npm install

# 3. (Optionnel) Créer un environnement virtuel Python pour TTS
python3 -m venv .venv
source .venv/bin/activate  # macOS/Linux
# .venv\Scripts\activate   # Windows

# 4. (Optionnel) Installer les dépendances Python pour génération audio
pip install --upgrade pip
pip install TTS soundfile google-cloud-texttospeech

# 5. Configurer Firebase (voir section Firebase ci-dessous)
cp .env.example .env.local
# Éditer .env.local avec vos clés Firebase

# 6. Générer les données HSK 3.0 (~5-10 min)
npm run sync:hsk

# 7. Compiler le manifeste de données
npm run build:data

# 8. (Optionnel) Générer les fichiers audio IA (~30-60 min)
npm run generate:audio:cloud

# 9. Lancer l'application en développement
npm run dev
```

L'application sera accessible sur **http://localhost:5173**

---

## ⚙️ Configuration

### Firebase

1. Créez un projet sur [Firebase Console](https://console.firebase.google.com)
2. Activez **Authentication** avec Google et Email/Password
3. Activez **Storage** pour les photos de profil
4. Créez une application Web et copiez les identifiants
5. Remplissez `.env.local` :

```env
VITE_USE_CUSTOM_DOMAIN=true
VITE_FIREBASE_API_KEY=votre_api_key
VITE_FIREBASE_AUTH_DOMAIN=votre_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre_project_id
VITE_FIREBASE_STORAGE_BUCKET=votre_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
VITE_FIREBASE_APP_ID=votre_app_id
```

### Google Gemini API (pour l'Assistant IA)

Pour activer l'assistant IA :

1. Obtenez une clé API sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Ajoutez la clé dans `.env.local` :

```env
VITE_GEMINI_API_KEY=votre_gemini_api_key
```

### Google Cloud TTS (optionnel)

Pour générer des fichiers audio de haute qualité :

1. Créez un projet [Google Cloud](https://console.cloud.google.com)
2. Activez l'API **Cloud Text-to-Speech**
3. Créez une clé de service JSON
4. Configurez les identifiants :

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/chemin/vers/credentials.json"
npm run generate:audio:cloud
```

---

## 🛠️ Scripts disponibles

### Développement

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement Vite |
| `npm run build` | Compile l'application pour la production |
| `npm run preview` | Prévisualise le build de production |

### Génération de données

| Commande | Description |
|----------|-------------|
| `npm run sync:hsk` | Télécharge HSK 3.0, enrichit avec CC-CEDICT, génère les traductions FR |
| `npm run build:data` | Compile le manifeste JSON utilisé par la PWA |

### Génération audio

| Commande | Description |
|----------|-------------|
| `npm run generate:audio` | Génère tous les fichiers audio (Coqui TTS local) |
| `npm run generate:audio:cloud` | Génère avec Google Cloud TTS (haute qualité) |
| `npm run generate:audio:core` | Génère les audio de base (pinyin, grammaire) |
| `npm run generate:audio:phrases` | Génère les audio de phrases des leçons |

### Utilitaires

| Commande | Description |
|----------|-------------|
| `npm run check:google` | Vérifie la configuration Google Cloud TTS |
| `npm run test:audio` | Teste la génération audio locale |
| `npm run analyze:audio` | Compare la qualité audio Cloud vs Local |

> **📚 Documentation détaillée** : Consultez [docs/SCRIPTS.md](docs/SCRIPTS.md) pour une documentation complète

---

## 🏗️ Architecture

```
XiaoLearn/
├── public/                    # Assets statiques
│   ├── audio/                # Fichiers audio générés (MP3/WAV)
│   ├── data/                 # Manifeste de données compilé
│   ├── icons/                # Icônes PWA et navigation
│   └── logos/                # Logos de l'application (6 thèmes)
│
├── src/                      # Code source React/TypeScript
│   ├── components/           # Composants réutilisables
│   │   ├── Auth/            # Authentification (LoginModal, UserProfile)
│   │   ├── exercises/       # 5 types d'exercices
│   │   ├── games/           # 5 mini-jeux interactifs
│   │   ├── quiz/            # Système de quiz
│   │   └── review/          # Système de révision SRS
│   │
│   ├── contexts/            # Contextes React (AuthContext)
│   ├── data/                # Données statiques (parcours, leçons)
│   ├── firebase/            # Configuration Firebase
│   ├── hooks/               # Hooks personnalisés
│   ├── pages/               # 9 pages principales
│   ├── types/               # Types TypeScript
│   └── utils/               # Fonctions utilitaires
│
├── scripts/                  # Scripts de génération
│   ├── generateHskData.mjs          # Génération données HSK
│   ├── buildDataset.mjs             # Compilation manifeste
│   ├── audio_cloud_tts.py           # TTS Google Cloud
│   └── audio_tts.py                 # TTS local Coqui
│
├── data/                     # Données générées
│   ├── hsk1.json ... hsk7.json      # Listes HSK par niveau
│   └── translation-cache.json       # Cache traductions
│
└── docs/                     # Documentation
    ├── SCRIPTS.md                   # Documentation des scripts
    ├── ARCHITECTURE.md              # Architecture détaillée
    ├── CLOUDFLARE_SETUP.md          # Configuration Cloudflare
    └── DEPLOY_CUSTOM_DOMAIN.md      # Guide de déploiement
```

---

## 📊 Données et sources

### HSK 3.0
- **Source** : [ivankra/hsk30](https://github.com/ivankra/hsk30) (MIT License)
- **Niveaux** : HSK 1 à 7 (Beginner à Superior)
- **~10 000 mots** avec pinyin, tons, partie du discours

### CC-CEDICT
- **Source** : [MDBG Chinese Dictionary](https://www.mdbg.net/chinese/dictionary)
- **Licence** : Creative Commons Attribution-ShareAlike 3.0
- **115 000+ entrées** avec traductions anglaises détaillées

### Traductions françaises
- **Générées automatiquement** via [@xenova/transformers](https://github.com/xenova/transformers.js)
- **Modèle** : Helsinki-NLP/opus-mt-en-fr (MIT License)
- **Cache** : `data/translation-cache.json` (accélère les builds)

### Audio
- **Google Cloud TTS** : Voix chinoises natives haute qualité (cmn-CN-Wavenet-A/D)
- **Coqui TTS** : Fallback local (tts_models/zh-CN/baker/tacotron2-DDC-GST) - Apache 2.0
- **Post-traitement** : Trimming silences, normalisation volume

### Assistant IA
- **Google Gemini API** : Modèle de langage avancé pour réponses intelligentes
- **Prompts optimisés** pour l'enseignement du chinois mandarin

---

## 🚀 Déploiement

L'application est déployée automatiquement via GitHub Actions sur chaque push vers `main`.

**URL de production** : https://xiaolearn.com

Pour plus de détails, consultez :
- [docs/DEPLOY_CUSTOM_DOMAIN.md](docs/DEPLOY_CUSTOM_DOMAIN.md) - Guide de déploiement
- [docs/CLOUDFLARE_SETUP.md](docs/CLOUDFLARE_SETUP.md) - Configuration DNS

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Commitez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📄 Licence

Ce projet utilise plusieurs sources open source :

- **Code source** : MIT License
- **Données HSK 3.0** : MIT License ([ivankra/hsk30](https://github.com/ivankra/hsk30))
- **CC-CEDICT** : Creative Commons Attribution-ShareAlike 3.0
- **Modèle de traduction** : MIT License (Helsinki-NLP)
- **Coqui TTS** : Apache 2.0

---

## 🙏 Remerciements

- [ivankra](https://github.com/ivankra) pour les données HSK 3.0
- [MDBG](https://www.mdbg.net) pour le dictionnaire CC-CEDICT
- Équipe [Coqui TTS](https://github.com/coqui-ai/TTS)
- Équipe [Google Cloud TTS](https://cloud.google.com/text-to-speech)
- Équipe [Google Gemini](https://ai.google.dev/)
- Communauté [Xenova Transformers.js](https://github.com/xenova/transformers.js)

---

## 📧 Contact

Perrine - [@perrineqhn](https://github.com/perrineqhn)

Lien du projet : [https://github.com/perrineqhn/XiaoLearn](https://github.com/perrineqhn/XiaoLearn)

---

<div align="center">

**Fait avec ❤️ pour les apprenants de chinois**

加油! (Jiāyóu - Keep going!)

</div>
