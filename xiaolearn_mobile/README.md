# XiaoLearn Mobile 📱

Application mobile iOS / Android pour l'apprentissage du mandarin — version compagnon de l'app web XiaoLearn.

## Technologie

- **React Native** via **Expo** (SDK 53)
- **Expo Router** v4 (navigation par fichiers, comme Next.js)
- Même palette de couleurs que l'app web (`constants/Colors.ts`)

## Lancer l'app

### Prérequis

```bash
npm install -g expo-cli    # si pas encore installé
```

### Démarrer

```bash
cd xiaolearn_mobile
npm install
npm start          # ouvre le serveur Metro + QR code
```

Scanne le QR code avec l'app **Expo Go** (iOS App Store / Google Play) pour tester sur ton téléphone.

### Simulateurs

```bash
npm run ios        # Xcode requis (macOS uniquement)
npm run android    # Android Studio requis
```

## Structure

```
xiaolearn_mobile/
├── app/
│   ├── _layout.tsx          # Layout racine (StatusBar, Stack)
│   └── (tabs)/
│       ├── _layout.tsx      # Barre de navigation bottom tab
│       ├── index.tsx        # 🏠 Accueil (dashboard)
│       ├── cours.tsx        # 📚 Cours (parcours CECR HSK)
│       ├── flashcards.tsx   # 🃏 Cartes & révisions SRS
│       └── messages.tsx     # 💬 Prof IA (小林)
├── constants/
│   └── Colors.ts            # Palette identique à l'app web
├── hooks/
│   ├── useColorScheme.ts
│   └── useThemeColor.ts
└── assets/                  # Icônes, splash screen
```

## Prochaines étapes

- [ ] Authentification Firebase (réutiliser `AuthContext` de l'app web)
- [ ] Synchronisation Firestore (progression, flashcards, XP)
- [ ] Écran de révision SRS interactif (retourner une carte)
- [ ] Intégration Gemini pour le Prof IA (Messages)
- [ ] Écran Profil + réglages
- [ ] Notifications push (rappel quotidien streak)
- [ ] Mode hors-ligne (données en cache)
