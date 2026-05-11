# Plan de fusion XiaoLearn — `reference` + `app`

> Objectif : un seul site public **xiaolearn.com** qui adopte l'intention de
> seonsaengnim.com — landing marketing claire, accès gratuit (dictionnaire +
> grammaire + nuances + culture + blog) sans compte, et accès à l'application
> web complète après login. **Pas de page conjugaison** (le mandarin ne
> conjugue pas).

---

## 1. Architecture cible

**Astro = hôte public · React/Vite app = montée sous `/app`**

```
xiaolearn.com (Astro static, déployé sur Cloudflare Pages)
├── /                       → Landing marketing (refonte façon Seonsaengnim)
├── /dictionnaire           → Dictionnaire HSK 1-7 + hors-HSK   (déjà là)
├── /grammaire              → Points de grammaire mandarin       (déjà là)
├── /nuances                → Mots proches / faux-amis           (déjà là)
├── /culture                → Fêtes, repères culturels           (déjà là)
├── /blog                   → Articles SEO (NOUVEAU)
├── /tarifs                 → Page pricing (NOUVEAU, ancre #pricing sur la landing)
├── /ressources             → Ressources & boutique              (déjà là)
├── /mentions-legales       → Légal                               (déjà là)
├── /en/...                 → Miroir anglais
└── /app/*                  → React SPA (build de xiaolearn_app monté en static)
    ├── /app/login
    ├── /app/dashboard
    ├── /app/lessons/...
    ├── /app/flashcards
    └── ...etc
```

### Pourquoi cette archi

| Critère | Astro public | React app sous `/app` |
|---|---|---|
| SEO dictionnaire / grammaire / blog | ✅ HTML pré-rendu, performant | ❌ SPA, indexation pénible |
| Interactivité riche (flashcards, leçons, AI) | ❌ trop limitée | ✅ React state, hooks, Firebase |
| Auth / Firebase / paiements | À éviter côté public | ✅ déjà en place dans l'app |
| Un seul déploiement, un seul domaine | ✅ | ✅ |

C'est exactement le modèle **Seonsaengnim** : leur site marketing est statique
(Next.js avec ISR), l'app est une route séparée. Leur dictionnaire
(`/fr/dictionnaire`) et leurs leçons gratuites (`/fr/coreen`) sont dans la
partie statique pour le SEO ; l'app authentifiée est ailleurs.

---

## 2. Comment monter l'app React dans Astro

Trois options, classées de la plus simple à la plus intégrée :

### Option A — Build statique copié (recommandée pour démarrer)

1. `xiaolearn_app` continue d'être un projet Vite indépendant qui produit un `dist/`.
2. Un script ajouté dans `xiaolearn_reference/package.json` :
   ```json
   "build:app": "cd ../xiaolearn_app && npm run build && cp -r dist/* ../xiaolearn_reference/public/app/",
   "build": "npm run build:app && npm run build:chunks && astro build"
   ```
3. Configurer Vite (`base: '/app/'`) et le router de l'app pour que toutes les
   routes `/app/*` retournent `index.html` (côté Cloudflare Pages, ajouter un
   `_redirects` : `/app/* /app/index.html 200`).
4. ✅ Avantages : zéro modification de l'app React, isolation parfaite des
   bundles. C'est l'approche que Seonsaengnim utilise.
5. ⚠️ Limites : pas de partage de composants entre Astro et React (mais on n'en
   a pas besoin pour le moment).

### Option B — App embarquée comme island Astro

Importer les pages React directement dans des fichiers `.astro` avec
`client:only="react"`. Trop lourd pour une app aussi grosse — **non recommandé**.

### Option C — Monorepo pnpm/turborepo

Restructurer les deux projets en monorepo avec un package partagé. Plus propre
sur le long terme, mais coût de migration élevé. À envisager dans 3-6 mois si
on veut partager des types/composants.

➡ **Décision : on part sur l'option A.**

---

## 3. Ce qui change concrètement

### Fichiers/dossiers à modifier dans `xiaolearn_reference`

| Fichier | Action | Détails |
|---|---|---|
| `src/pages/index.astro` | **Refonte** | Nouvelle landing à la Seonsaengnim (livré dans cette session) |
| `src/components/Header.astro` | Mise à jour | Ajouter boutons "Se connecter" + "Commencer gratuitement" (livré) |
| `src/data/navigation.ts` | Mise à jour | Ajouter `Blog`, `Tarifs`, retirer le pointage app vers domaine externe (livré) |
| `src/pages/blog/` | **NOUVEAU** | Dossier pour articles SEO (à venir) |
| `src/pages/tarifs.astro` | **NOUVEAU** | Page pricing dédiée (à venir, anchor `#pricing` sur la landing en attendant) |
| `public/app/` | **NOUVEAU** | Dossier qui recevra le build de `xiaolearn_app` |
| `astro.config.mjs` | Mise à jour | Ajouter rewrites pour `/app/*` (à faire avant le déploiement) |
| `package.json` | Mise à jour | Ajouter script `build:app` |

### Fichiers à modifier dans `xiaolearn_app`

| Fichier | Action |
|---|---|
| `vite.config.ts` | `base: '/app/'` |
| `src/App.tsx` (router) | Préfixer toutes les routes par `/app` ou utiliser un BrowserRouter avec basename |
| `firebase.json` | Plus besoin, c'est Cloudflare Pages qui sert |
| `index.html` | Ajouter favicon partagé, meta cohérentes |

### Pas de page conjugaison

On NE crée PAS de page conjugaison. Les pages déjà existantes — `/grammaire`,
`/nuances`, `/culture` — couvrent largement ce que Seonsaengnim met dans sa
section "Conjugaisons" (registres de politesse coréens), parce que :
- Le mandarin **n'a pas de conjugaison** (pas d'accord temps/personne).
- La grammaire mandarin se joue sur les **particules** (了, 过, 着, 把, 被…),
  les **structures** et les **classificateurs** — déjà couverts dans
  `/grammaire`.
- Les nuances de registre se font surtout par le vocabulaire (您 vs 你) —
  couvertes dans `/nuances`.

---

## 4. Accès gratuit (sans compte)

Comme demandé, l'accès gratuit couvre **tout sauf l'app interactive** :

| Section | Accès | Stratégie |
|---|---|---|
| Dictionnaire HSK 1-7 + hors-HSK | 🆓 Tout le monde | Déjà publique dans Astro |
| Grammaire | 🆓 Tout le monde | Déjà publique |
| Nuances | 🆓 Tout le monde | Déjà publique |
| Culture | 🆓 Tout le monde | Déjà publique |
| Blog | 🆓 Tout le monde | À créer |
| Tarifs | 🆓 Tout le monde | Section sur landing |
| Application (leçons interactives, flashcards SRS, AI tutor, communauté, battles) | 🔒 Compte requis | `/app/*`, gated par Firebase Auth |

Pas d'aperçu de leçon en mode public (choix utilisateur — la valeur
pédagogique est déjà énorme dans dictionnaire + grammaire + nuances).

---

## 5. Migration du contenu

Pas de duplication de contenu :

- Le dictionnaire reste dans `xiaolearn_reference/cfdict` (source unique).
- L'app peut **lire** le dictionnaire via fetch sur `xiaolearn.com/data/hsk/all.json`
  (déjà servi par Astro). On peut donc supprimer `xiaolearn_app/data/hsk` à
  terme s'il s'agit du même dataset.
- La grammaire reste dans `xiaolearn_reference/grammar_articles` ; l'app peut
  fetch les articles via JSON aussi.

**Action de suivi** : audit des datasets dupliqués entre les deux projets
(à faire dans une session dédiée avant la mise en prod).

---

## 6. Étapes de mise en œuvre (ordre conseillé)

1. ✅ **(Cette session)** Plan + nouvelle landing + Header/Footer mis à jour.
2. Créer `/blog` et `/tarifs` dans Astro (contenu minimal pour pas casser les liens).
3. Configurer `vite.config.ts` de `xiaolearn_app` avec `base: '/app/'` + basename router.
4. Tester le build de l'app monté en local sous `xiaolearn_reference/public/app/`.
5. Ajouter `_redirects` Cloudflare pour `/app/*` → `/app/index.html`.
6. Audit + dédupe des datasets `data/hsk` partagés.
7. Rediriger les anciens domaines (si app était sur `xiaolearn.com` racine et
   reference sur `reference.xiaolearn.com`) via redirects 301.
8. SEO : sitemaps fusionnés, OG tags, plausible/analytics unifiés.
9. Mise en production progressive (canary 10% → 50% → 100%).

---

## 7. Risques & points d'attention

| Risque | Mitigation |
|---|---|
| Casser les bookmarks de l'app actuelle (si elle était à `xiaolearn.com/`) | Redirects 301 `/page-app` → `/app/page-app` |
| Bundle size de l'app dans `public/app` | Vite chunking déjà en place ; vérifier que le static export reste sous 5 MB |
| Conflit de routing Astro / SPA | Le `_redirects` Cloudflare doit traiter `/app/*` AVANT les routes Astro |
| SEO perdu sur sous-domaines | Soumettre nouveau sitemap, redirects 301 systématiques |
| Auth Firebase qui ne tient pas le changement de domaine | Vérifier les domains autorisés dans Firebase console |

---

## 8. Hors scope de cette session

- Le merge effectif du code de `xiaolearn_app` dans Astro (option A complète)
- La page `/blog` et son contenu
- La page `/tarifs` détaillée (en attendant : ancre `#pricing` sur landing)
- L'audit/dédupe des datasets
- Les redirects Cloudflare
- L'i18n complète de la nouvelle landing en anglais
