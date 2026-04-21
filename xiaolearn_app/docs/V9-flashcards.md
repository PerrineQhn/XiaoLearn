# V9 — Refonte Flashcards (Seonsaengnim-style)

## 1. Vue d'ensemble

V9 refond l'expérience flashcards en s'inspirant de [Seonsaengnim](https://app.seonsaengnim.com/dashboard/flashcards). L'objectif : passer d'un écran de **listing** (V3) à un **dashboard d'étude immersif** (V4 du code), avec session in-page.

Quatre axes d'amélioration ont été livrés simultanément :

1. **Algorithme SRS + sessions** : session runner intégré (plus besoin d'aller sur `/review`), sessions de taille configurable (10/20/30/50), filtrage par source (dues, nouvelles, maîtrisées, phrases, perso).
2. **UX carte + animations** : transitions 3D flip, feedback visuel immédiat (correct/wrong), barre de progression animée, écran de fin de session avec compteur XP animé.
3. **Nouveaux modes d'étude** : 5 modes au lieu d'un seul (flip, QCM, saisie, écoute TTS, speed 60s).
4. **Gamification + stats** : heatmap 12 semaines, streak, XP cumulée, 15 badges dérivés (volume/streak/mastery/HSK/CECR), mot du jour, session goal.

V4 coexiste avec V3 — il suffit d'échanger `FlashcardPageV3` par `FlashcardPageV4` dans `App.tsx` et d'ajouter le callback `onRate` pour brancher le SRS.

---

## 2. Fichiers ajoutés

| Fichier                                               | Rôle                                                                           |
|-------------------------------------------------------|---------------------------------------------------------------------------------|
| `src/types/flashcard-v4.ts`                           | Types V4 : `StudyMode`, `ReviewRating`, `FlashcardSessionSummary`, `Badge`, `DailyActivity`, `WordOfTheDay`, barèmes XP. |
| `src/hooks/useDailyActivity.ts`                       | Hook localStorage heatmap : `entries`, `getLastNWeeks(12)`, `currentStreak`, `totals`, mutateurs `recordCardReview`, `recordSession`. |
| `src/hooks/useFlashcardBadges.ts`                     | Hook dérivé : 15 badges calculés à chaque render depuis les compteurs SRS/activité. Export `TOTAL_BADGES`, `countEarnedBadges`. |
| `src/components/FlashcardV4/StudyModeComponents.tsx`  | 4 modes atomiques : `FlipCard`, `McqCard`, `TypingCard`, `ListeningCard` — interface uniforme (`StudyModeProps`). |
| `src/components/FlashcardV4/SessionView.tsx`          | Runner de session : itère les cartes, dispatche selon le mode, affiche les ratings Again/Hard/Good/Easy. Contient aussi `SpeedRound` (60s). |
| `src/pages/FlashcardPageV4.tsx`                       | Page dashboard : WOTD + stats + mode picker + session goal + heatmap + badges. Lance les sessions in-page. |
| `src/styles/flashcards-v4.css`                        | Styles `fc4-*` (dark theme, animations). |

Aucun fichier V3 n'a été modifié. V4 est **strictement additif**.

---

## 3. Intégration dans `App.tsx`

### Avant (V3)

```tsx
import FlashcardPageV3 from './pages/FlashcardPageV3';

// ...
<FlashcardPageV3
  language={language}
  wordItems={allFlashcardItems.map((item) =>
    lessonItemToFlashcardV2(item, undefined, undefined, learnedIdsSet)
  )}
  sentenceCards={sentenceCards}
  personalHook={personalFlashcards}
  customLists={customLists.lists.map(...)}
  onStartGlobalReview={() => setView('review')}
  onStartSentenceReview={() => setView('review')}
  onStartPersonalReview={() => setView('review')}
/>
```

### Après (V4, drop-in)

```tsx
import FlashcardPageV4 from './pages/FlashcardPageV4';

// Wrapper minimal pour brancher le SRS.
// useFlashcardSRS est déjà instancié ailleurs dans App.tsx, avec son `answerCard`.
const handleFlashcardRate = useCallback(
  (cardId: string, quality: 1 | 2 | 3 | 4) => {
    // Stratégie : déduire le niveau HSK de la carte, puis appeler
    // answerCard(quality) sur l'instance SRS du niveau correspondant.
    // La plupart des apps n'ont qu'une instance SRS globale → appel direct.
    flashcardSRS.answerCard(quality);
  },
  [flashcardSRS]
);

<FlashcardPageV4
  language={language}
  wordItems={allFlashcardItems.map((item) =>
    lessonItemToFlashcardV2(item, undefined, undefined, learnedIdsSet)
  )}
  sentenceCards={sentenceCards}
  personalHook={personalFlashcards}
  customLists={customLists.lists.map(...)}
  dueIds={dueIds}           // nouveau : Set<string> depuis SRS
  masteredIds={masteredIds} // nouveau : Set<string> depuis SRS
  onRate={handleFlashcardRate}
/>
```

**Points de branchement :**

- `wordItems`, `sentenceCards`, `personalHook`, `customLists` : identiques à V3.
- `onRate(cardId, quality)` : nouveau — requis pour que la session persiste dans le SRS global. Si absent, la page affiche un bandeau "mode preview".
- `dueIds` / `masteredIds` : nouveaux — permettent de filtrer les sources ("dues", "mastered") et d'alimenter les badges correctement.

Les callbacks legacy `onStartGlobalReview` / `onStartSentenceReview` / `onStartPersonalReview` ne sont **plus nécessaires** (les sessions se déroulent in-page), mais restent dans l'interface pour compat.

---

## 4. Architecture

### Flux d'une session

```
[Dashboard] --click "Commencer la session"-->
[SessionView : FlipCard | McqCard | TypingCard | ListeningCard]
    |
    |   chaque carte :
    |     - onReveal() → affiche les 4 boutons rating
    |     - onRate(rating) → appelle props.onRate(cardId, quality)
    |                      + useDailyActivity.recordCardReview(rating)
    v
[SessionSummary] --XP animée, breakdown, retour dashboard-->
```

### Barème XP (`XP_PER_RATING`)

| Rating | Qualité SRS | XP |
|--------|-------------|-----|
| again  | 1           | 2  |
| hard   | 2           | 5  |
| good   | 3           | 10 |
| easy   | 4           | 15 |

### Heatmap

- Grille 7 rangées × 12 colonnes (semaines), alignée au lundi.
- 5 niveaux d'intensité (`intensityForCount(count)`) : 0 (rien), 1 (<5), 2 (<15), 3 (<30), 4 (≥30).
- Cellule "aujourd'hui" entourée, cellules futures en pointillé.

### Streak

- Jours consécutifs avec ≥1 carte revue.
- Tolère "aucune activité aujourd'hui" (regarde à partir d'hier).
- Lookback de 400 jours.

### Badges (15 définitions)

- **Volume** (3) : 100, 1 000, 5 000 cartes revues.
- **Streak** (3) : 7, 30, 100 jours consécutifs.
- **Mastery** (3) : 50, 500, 2 000 cartes maîtrisées (niveau SRS ≥ 6).
- **HSK** (4) : HSK 1/2/3/4 complets (150/300/600/1 200 cartes maîtrisées).
- **CECR** (2) : B1 atteint (400), B2 atteint (600).

Badges **calculés** (pas stockés) — reconstruits à chaque render depuis les compteurs SRS + activité. Aucune divergence possible.

### Stockage

- `cl_flashcard_activity_v4` (localStorage) : entrées journalières (`DailyActivity`).
- SRS global reste sur `flashcard_progress` (pas touché).
- Personnel sur `cl_personal_flashcards_v7` (pas touché).

---

## 5. Modes d'étude détaillés

### Flip (défaut)

Comportement V3 : click-to-flip, 3D animation, rating buttons après reveal. Garanti pour démarrer ; ne nécessite pas de distracteurs.

### MCQ (4 choix)

- Tire 3 distracteurs dans `wordItems` (Fisher-Yates seedé sur `card.id`).
- Auto-submit au clic — la bonne réponse est mise en vert, le mauvais choix en rouge.
- Si l'utilisateur se trompe, les ratings **good/easy** sont désactivés (force à réviser).

### Typing (saisie)

- Mode `hanzi-to-fr` : on tape le pinyin. Les tons numériques sont acceptés (`ni3 hao3` = `nǐ hǎo`).
- Mode `fr-to-hanzi` : on tape le caractère (ou la traduction).
- Normalisation Unicode NFD pour tolérer les accents.

### Listening (TTS)

- Joue le hanzi en chinois (`speechSynthesis`, `zh-CN`, rate 0.85).
- Réponse acceptée : hanzi, pinyin OU traduction FR/EN.
- Auto-play à la montée du composant, bouton 🔊 pour rejouer.

### Speed (chrono 60s)

- Composant distinct (`SpeedRound`).
- 2 gros boutons 👎 / 👍 → mappés en qualité 1 ou 3.
- Finit automatiquement à 0 seconde.

---

## 6. Validation

- `npx tsc --noEmit` : 0 erreur sur l'ensemble du projet après intégration V4.
- Aucune casse sur V3 (V3 + V4 coexistent).
- Fichiers créés : 7 (2 types/hooks, 2 composants, 1 page, 1 CSS, 1 doc).

---

## 7. Roadmap (optionnel, non livré)

- **Synchronisation Firestore** de `cl_flashcard_activity_v4` (déjà prévu via `useFirestoreSync`, à brancher dans `useDailyActivity`).
- **Partage de progression** : copier le streak + XP dans le profil utilisateur (useUserProfileSync).
- **Annonces d'accomplissement** : toast quand un badge est gagné (il suffit de comparer l'ancien `badgesEarned` au nouveau).
- **Mode "leitner box"** (physique 5 boîtes) en alternative SM-2 — à débattre.
- **Audio natif (MP3)** pour le mode listening (au lieu de TTS), meilleure qualité de prononciation.

---

## 8. Notes d'intégration rapides

- V4 ne requiert aucune migration de données : les clés localStorage sont nouvelles (`cl_flashcard_activity_v4`) et n'entrent pas en conflit avec l'existant.
- Pour désactiver temporairement V4 et revenir à V3 : remplacer `FlashcardPageV4` par `FlashcardPageV3` dans `App.tsx`. Aucune modification de données requise.
- Les 10 CSS variables (`--fc4-*`) sont scoppées via le préfixe `fc4-` et ne polluent pas les autres pages.

---

## 9. V9.1 — Quick start, decks par leçon, recherche & filtre "difficiles"

V9.1 est un incrément ciblé sur la parité UX avec Seonsaengnim, inspecté en live via Chrome. Trois ajouts, zéro refonte :

### 9.1.1 — Bouton "Étudier maintenant" (quick start)

Dans le header du dashboard V4, à droite du titre, un CTA gradient orange lance immédiatement une session de 20 cartes dues (ou toutes si aucune due), mode flip par défaut. Un seul clic, aucune sélection préalable.

- Nouveau callback `handleQuickStart` dans `FlashcardPageV4.tsx` qui présélectionne la source `due` → `all` en fallback, taille 20, mode flip.
- Style `.fc4-quickstart-btn` : dégradé `--fc4-streak → --fc4-warn`, radius 999px, box-shadow accentuée.

### 9.1.2 — Decks par leçon

Sous le mode picker, une nouvelle section `<DeckList>` affiche un regroupement des cartes par `${level}::${theme}` (même pattern que `FlashcardPageV2.buildDecks`). Chaque deck montre :

- Nom (theme) + sous-ligne (`N mots · level`)
- Chips colorées : due (orange), new (violet), mastered (vert)
- Barre de progression (mastered / total)
- Bouton "Étudier" → lance une session ciblée sur les cartes du deck

Tri : nombre de dues desc, puis alphabétique. Décks vides (sans cartes) filtrés automatiquement.

### 9.1.3 — Filtre "Difficiles" + recherche texte

Dans le `SessionGoalPanel`, deux évolutions :

- Une nouvelle pill source **"Difficiles"** (apparaît uniquement si `difficultIds.size > 0`). La prop `difficultIds` existait déjà dans l'interface V4 mais n'était pas câblée — V9.1 l'active.
- Un champ de recherche inline (`fc4-search-row`) au-dessus des pills. La recherche filtre la source courante par hanzi (inclusion exacte) OU pinyin (lowercase) OU traduction FR/EN (lowercase). Bouton ✕ pour clear. Compteur "X cartes" s'affiche quand la recherche est non vide.

La recherche compose avec les filtres source (orthogonaux) : pool = `source → search`.

### 9.1.4 — Fichiers touchés par V9.1

| Fichier | Changement |
|---------|------------|
| `src/pages/FlashcardPageV4.tsx` | +11 clés i18n FR/EN, `SessionSource` étendu avec `'difficult'`, `difficultIds` activé, state `searchQuery`, `candidatePool` augmenté (branche difficile + filtre texte), `handleQuickStart`, `decksByLesson` (useMemo), `handleStudyDeck`, composants `<DeckList>` + `<DeckSummary>`, `SessionGoalPanel` étendu (search row + pill difficile). |
| `src/styles/flashcards-v4.css` | Bloc "V9.1" ajouté en fin de fichier : `.fc4-header-actions`, `.fc4-quickstart-btn`, `.fc4-search-row/input/icon/clear/count`, `.fc4-decks-list`, `.fc4-deck-row/main/label/subline`, `.fc4-deck-tag[--due/--new/--mastered]`, `.fc4-deck-progress[-fill]`, `.fc4-deck-cta`. |

### 9.1.5 — Validation

- `npx tsc --noEmit` : 0 erreur.
- Aucune signature publique de `FlashcardPageV4` modifiée — V9.1 est un drop-in intégral par-dessus V9.
- `difficultIds` reste optionnel ; si non fourni par `App.tsx`, le pill "Difficiles" n'apparaît pas.

---

## 10. V9.2 — Parité visuelle complète avec Seonsaengnim

Après inspection directe de `https://app.seonsaengnim.com/dashboard/flashcards` (via MCP Chrome), V9.2 livre un **nouveau drop-in `FlashcardPageV5`** qui atteint la parité fonctionnelle et visuelle avec l'application de référence. `FlashcardPageV4` reste intact (fallback possible).

### 10.1 — Écarts corrigés vs V9.1

| Élément | V9.1 (V4) | V9.2 (V5) |
|---------|-----------|-----------|
| Palette | Cards colorées gradient violet/bleu | Crème `#f5f5f0` + vert sombre `#2d4a3e` (Seonsaengnim) |
| Stat cards | 3 stats compactes en ligne | **4 stat cards** proéminentes (Total / Maîtrisés / À revoir / % maîtrise) |
| Onglets | Aucun | Onglets **Mots / Phrases** (pills arrondies) en haut |
| Actions header | 1 bouton "Étudier maintenant" | 2 CTA : **Ajouter une carte** + **Étudier maintenant** |
| Source pills | 4 sources (Toutes/Maîtrisées/En cours/Nouveaux) + Difficiles | **9 sources** avec emoji (📚 Tous, ✅ Maîtrisés, ⏳ En cours, 🆕 Nouveaux, 🔥 Difficiles, 📖 Leçons, 💬 Phrases, ✏️ Mes cartes, 🌟 Mot du jour) |
| Recherche | Input isolé | Input inline (loupe + clear + compteur) aligné avec les pills |
| Decks | Liste `<DeckList>` | **Grille responsive** (1/2/3 colonnes) avec barre de progression + % maîtrise + label statut (Nouveau/En cours/Maîtrisé) |
| Setup session | Panneau inline `SessionGoalPanel` | **Modale overlay** (Escape + clic-hors-modale pour fermer) |
| Mode de session | Sélection via pill | **3 tuiles mode** (Réviser / Nouveaux / Difficiles) avec badges "recommandé" / "new" / "urgent" |
| Count picker | Slider numérique | **4 boutons ronds** 10 / 20 / 30 / 50 |
| CTA de lancement | Bouton plein uni | **CTA gradient** `#2d4a3e → #4a7a6a` avec `box-shadow` + icône ▶ |
| Flip card 3D | Cubic-bezier 0.6s | Aligné sur 0.7s + perspective 1200px (identique à Seonsaengnim) |

### 10.2 — Nouveaux fichiers

| Fichier | Rôle |
|---------|------|
| `src/pages/FlashcardPageV5.tsx` | Drop-in complet (~850 lignes). Même signature que V4 + `onAddCard?: () => void` optionnel. Réutilise `useDailyActivity`, `useFlashcardBadges`, `SessionView`, `SpeedRound`, `STUDY_MODE_LABEL`, `FlashcardSessionSummary`. |
| `src/styles/flashcards-v5.css` | Feuille complète, préfixe strict `.fc5-*`. Variables CSS scopées sous `.fc5-root` pour isolation stricte. |

Aucun fichier V4 modifié — `FlashcardPageV4` + `flashcards-v4.css` restent utilisables en parallèle.

### 10.3 — Structure du composant V5

```
FlashcardPageV5
├─ Dashboard (view='dashboard')
│  ├─ Header (titre + tabs Mots/Phrases + Ajouter + Étudier maintenant)
│  ├─ StatGrid (4 cards)
│  ├─ Search row (input inline)
│  ├─ SourcePills (9 pills avec compteurs)
│  ├─ DeckGrid (grille responsive avec progress bars)
│  ├─ WordOfTheDayCard (gradient vert)
│  ├─ Heatmap (recoloré palette V5)
│  └─ BadgeGrid
├─ SessionSetupModal (ouverte via state `modalOpen`)
│  ├─ 3 ModeTile (revise / new / difficult)
│  ├─ 4 count buttons (10/20/30/50)
│  ├─ 5 study mode buttons (flip/mcq/typing/listening/speed)
│  ├─ 2 direction buttons (🇨🇳→🇫🇷 / 🇫🇷→🇨🇳)
│  └─ CTA gradient "C'est parti !"
├─ SessionView (view='session', réutilise le composant V4)
├─ SpeedRound (view='speed', réutilise le composant V4)
└─ SummaryScreen (view='summary', version V5 restylée avec compteur XP animé)
```

### 10.4 — Palette V5 (identité XiaoLearn préservée — V9.3)

V9.3 a remappé la palette V5 pour conserver l'identité colorimétrique de XiaoLearn tout en gardant la **structure** Seonsaengnim (grille 4 stats / deck grid / setup modal). Les variables sont scopées sous `.fc5-root` et s'appuient sur celles déclarées dans `App.css` (`--primary-red`, `--jade-green`, `--gold-accent`) mais sans y être liées (indépendantes).

```css
.fc5-root {
  --fc5-bg: transparent;              /* laisse transparaître --app-bg */
  --fc5-surface: #ffffff;             /* cards stats */
  --fc5-surface-alt: #fef3ea;         /* crème chaud */
  --fc5-surface-muted: #fbe4d2;       /* pêche clair (decks) */
  --fc5-border: #ead2c4;              /* = --border-light App.css */
  --fc5-text: #1F2233;                /* = --text-primary */
  --fc5-text-muted: #5E6075;          /* = --text-secondary */

  --fc5-primary: #D8483E;             /* = --primary-red (rouge temple) */
  --fc5-primary-dark: #C53830;        /* = --primary-red-hover */
  --fc5-warn: #F0B762;                /* = --gold-accent */
  --fc5-success: #2F9D8A;             /* = --jade-green */
  --fc5-danger: #D8483E;              /* réutilise le rouge (urgent = primary) */
  --fc5-info: #2F9D8A;                /* jade pour "info/new" (pas de bleu) */
  --fc5-purple: #E0952C;              /* gold foncé pour jalons "Mot du jour" */
}
```

**Changements vs version Seonsaengnim initiale :**

- CTA, badges urgent, header "Étudier maintenant", progress bar, active tab → **rouge temple** (#D8483E) au lieu du vert sombre #2d4a3e.
- Status "Maîtrisé", heatmap, pill "Nouveaux" → **jade** (#2F9D8A) au lieu des variantes vert Seonsaengnim.
- Pill "Difficiles", badge warn, preview banner → **gold** (#F0B762) au lieu de #f59e0b.
- Fond : `transparent` pour hériter du gradient `--app-bg` (cream → peach) au lieu d'imposer #f5f5f0.
- Bordures : beige rosé (#ead2c4) au lieu de gris #e5e5e0.
- Ombres : teintées rouge `rgba(216, 72, 62, 0.x)` au lieu de neutres noires.
- Heatmap : dégradé peach-neutral → pale jade → mid jade → **jade full** → **rouge full**.
- Font : `var(--font-sans, 'Plus Jakarta Sans', 'Noto Sans SC', …)` au lieu de `'Noto Sans KR'`.

### 10.5 — Intégration dans `App.tsx` (effectuée)

Swap réalisé dans `src/App.tsx` (V9.2 activée par défaut) :

```tsx
// AVANT
import FlashcardPageV3, { lookupPinyinForHanzi } from './pages/FlashcardPageV3';
// … case 'flashcards' → <FlashcardPageV3 … />

// APRÈS
import FlashcardPageV5 from './pages/FlashcardPageV5';
import { lookupPinyinForHanzi } from './pages/FlashcardPageV3'; // helper réutilisé
// … case 'flashcards' → <FlashcardPageV5 … />
```

Deux props V3 retirées de la call-site (non supportées par V5) :

- `onCreateCustomList` : V5 n'expose pas la création de liste custom dans l'UI (l'onglet "Mes cartes" utilise directement `personalHook`).
- `onOpenDeck` : V5 lance la session SRS directement depuis sa grille de decks (setup modal interne).

Props conservées (rétro-compat V5) : `language`, `wordItems`, `sentenceCards`, `personalHook`, `customLists`, `onStartGlobalReview`, `onStartSentenceReview`, `onStartPersonalReview`.

`onAddCard` reste optionnel et non branché pour le moment — à raccorder plus tard au flux d'ajout de carte perso si souhaité.

### 10.6 — Validation

- `npx tsc --noEmit` → 0 erreur.
- Aucun type V4 cassé, `FlashcardPageV4` reste fonctionnel.
- V5 réutilise les hooks SRS (`useFlashcardSRS`), hook activité (`useDailyActivity`) et hook badges (`useFlashcardBadges`) sans modification de leur API.
- Les sous-composants `SessionView` + `SpeedRound` sont importés tels quels depuis `src/components/FlashcardV4/SessionView.tsx` (aucune duplication).

---

## 11. V9.4 — Alignement structurel strict sur Seonsaengnim + CEFR

Après inspection live de `https://app.seonsaengnim.com/dashboard/flashcards` (MCP Chrome), la page Seonsaengnim n'expose **que 4 sections** :

1. Header (titre + tabs Mots/Phrases + compteur + Ajouter + Étudier maintenant)
2. Grille 4 stat cards (Total / Maîtrisés / À revoir / Maîtrise %)
3. Ligne de filtres : **pills sources** + recherche inline
4. Grille de decks (un deck = une leçon)

Les sections Word of the Day, Heatmap et Badges que V9.2/V9.3 ajoutaient en bas de page n'existent pas chez Seonsaengnim — V9.4 les retire pour une parité structurelle stricte. "Mot du jour" reste disponible uniquement comme **pill-filtre source** (conforme à Seonsaengnim).

### 11.1 — Decks : bascule HSK → CEFR

XiaoLearn communique sur les niveaux **CECR (A1..C2+)**, pas HSK. V9.4 :

- Introduit le helper local `hskToCefr(level)` dans `FlashcardPageV5` (même mapping que `HomePageV2.hskToCecr`).
- Le label de deck devient `"Leçon : {thème}"` (format Seonsaengnim) au lieu de `"HSK1 · {thème}"`.
- Un badge CEFR coloré (A1..C2+) s'affiche dans le `fc5-deck-head` à côté du label.
- Tri des decks : par nombre de `due` desc, puis **ordre CEFR** (A1 → C2+), puis alphabétique du thème.

Palette des badges CEFR (dérivée du thème XiaoLearn crème/rouge/jade/gold) :

| Niveau | Fond | Texte |
|--------|------|-------|
| A1 | `#FDE7E2` | `#A42A20` (rouge foncé) |
| A2 | `#FFE7C7` | `#8A5A1A` (gold sombre) |
| B1 | `#E3F5F2` | `#1E6B5E` (jade foncé) |
| B2 | `#D4ECE6` | `#1E6B5E` |
| C1 | `#E8E0F5` | `#553399` |
| C2 / C2+ | `#F0E0D0` | `#5C3A14` |

### 11.2 — Sections retirées du rendu

| Section | V9.3 | V9.4 |
|---------|------|------|
| Header (title + tabs + CTAs) | ✅ | ✅ |
| StatGrid (4 cards) | ✅ | ✅ |
| Search + SourcePills (9 pills dont "Mot du jour") | ✅ | ✅ |
| DeckGrid (CEFR au lieu de HSK) | ✅ | ✅ |
| Titre "Mes decks" au-dessus de la grille | ✅ | ❌ (Seonsaengnim n'en a pas) |
| WordOfTheDayCard (bandeau gradient rouge) | ✅ | ❌ |
| Heatmap calendrier d'activité | ✅ | ❌ |
| BadgeGrid | ✅ | ❌ |

Le code des composants `WordOfTheDayCard`, `Heatmap`, `BadgeGrid` reste dans le fichier (dead code assumé) pour permettre une réactivation rapide si on décide de les surfacer ailleurs (Home, Rapport, etc.).

### 11.3 — Validation

- `npx tsc --noEmit` → 0 erreur.
- Structure identique aux 4 sections observées sur Seonsaengnim (vérifié par dump DOM : `main > div:nth-child(1..4)`).
- Identité colorimétrique XiaoLearn conservée (héritage V9.3 : rouge #D8483E / jade #2F9D8A / gold #F0B762).
