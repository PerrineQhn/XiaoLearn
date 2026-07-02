# Documentation des Scripts

Cette documentation détaille tous les scripts utilisés dans XiaoLearn pour la génération de données, d'audio et la maintenance de l'application.

---

## Vue d'ensemble

Les scripts sont organisés en **4 catégories principales** :

1. **[Génération de données HSK](#génération-de-données-hsk)** - Téléchargement et traitement des listes HSK 3.0
2. **[Génération audio](#génération-audio)** - Synthèse vocale (TTS) pour le contenu chinois
3. **[Utilitaires et maintenance](#utilitaires-et-maintenance)** - Analyse, correction, et optimisation
4. **[Build et déploiement](#build-et-déploiement)** - Compilation et CI/CD

---

## Génération de données HSK

### `scripts/generateHskData.mjs`

**Objectif** : Télécharger les listes HSK 3.0 officielles, les enrichir avec le dictionnaire CC-CEDICT, et générer les traductions françaises.

**Utilisation** :
```bash
npm run sync:hsk
```

**Fonctionnement détaillé** :

1. **Téléchargement des données brutes**
   - Télécharge `hsk30-expanded.csv` depuis [ivankra/hsk30](https://github.com/ivankra/hsk30)
   - Télécharge le dictionnaire CC-CEDICT compressé (.gz)
   - Parse les ~11 000 lignes CSV avec PapaParse

2. **Enrichissement avec CC-CEDICT**
   ```javascript
   // Extrait les traductions anglaises détaillées
   function parseCCEDICT(text) {
     // Exemple d'entrée:
     // 你好 你好 [ni3 hao3] /hello/hi/
     // Extrait: pinyin, définitions, exemples
   }
   ```

3. **Génération des traductions françaises**
   - Utilise [@xenova/transformers](https://github.com/xenova/transformers.js) avec le modèle Helsinki-NLP/opus-mt-en-fr
   - Traduit automatiquement ~5 400 entrées EN→FR
   - Sauvegarde dans `data/translation-cache.json` pour réutilisation

4. **Attribution des thèmes**
   ```javascript
   const themeRules = [
     { id: 'famille', keywords: ['father', 'mother', 'sister', ...] },
     { id: 'nourriture', keywords: ['eat', 'food', 'rice', ...] },
     // ... 17 thèmes au total
   ];
   ```

5. **Génération des slugs audio**
   - Crée des identifiants uniques pour chaque fichier audio
   - Format : `pinyin-caracteres-INDEX.mp3`
   - Exemple : `ni3hao3-你好-0001.mp3`

**Sortie** :
- `data/hsk1.json` ... `data/hsk7.json` (listes par niveau)
- `data/translation-cache.json` (cache des traductions FR)
- `data/translation-zh-cache.json` (cache supplémentaire)

**Temps d'exécution** : ~5-10 minutes (première fois avec téléchargements)

**Dépendances** :
```json
{
  "papaparse": "^5.4.1",          // Parsing CSV
  "@xenova/transformers": "^2.17.2" // Traduction ML locale
}
```

---

### `scripts/buildDataset.mjs`

**Objectif** : Compiler un manifeste JSON consolidé pour la PWA.

**Utilisation** :
```bash
npm run build:data
```

**Fonctionnement** :

1. **Concaténation des listes**
   ```javascript
   const levels = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7'];
   const manifest = { version: '1.0.0', data: {} };

   for (const level of levels) {
     const content = await fs.readFile(`data/${level}.json`, 'utf-8');
     manifest.data[level] = JSON.parse(content);
   }
   ```

2. **Optimisation**
   - Minification JSON
   - Compression des métadonnées redondantes
   - Validation de la structure

3. **Génération du manifeste**
   - Sortie : `public/data/manifest.json`
   - Taille finale : ~8 MB (non compressé)
   - Inclus dans le build de la PWA

**Sortie** :
- `public/data/manifest.json`

**Temps d'exécution** : ~2-3 secondes

---

### `scripts/updateTranslationsFromCfdict.mjs`

**Objectif** : Mettre à jour les traductions existantes avec les dernières données CC-CEDICT.

**Utilisation** :
```bash
node scripts/updateTranslationsFromCfdict.mjs
```

**Fonctionnement** :
1. Charge le cache de traductions existant
2. Télécharge la dernière version de CC-CEDICT
3. Met à jour uniquement les entrées modifiées ou nouvelles
4. Préserve les traductions FR déjà générées

---

## Génération audio

Consultez [SCRIPTS_AUDIO.md](SCRIPTS_AUDIO.md) pour la documentation complète des scripts audio.

**Vue d'ensemble rapide** :

| Script | Description | TTS utilisé |
|--------|-------------|-------------|
| `audio_cloud_tts.py` | Génération haute qualité | Google Cloud TTS |
| `audio_tts.py` | Génération locale (fallback) | Coqui TTS |
| `generate-phrase-audio.mjs` | Génération phrases de leçons | Hybride |
| `generateCoreAudio.mjs` | Audio Pinyin/Grammaire | Google Cloud TTS |

---

## Utilitaires et maintenance

### `scripts/analyze-lessons.py`

**Objectif** : Analyser la structure des leçons et détecter les incohérences.

**Utilisation** :
```bash
python3 scripts/analyze-lessons.py
```

**Analyses effectuées** :
- Vérifie que chaque leçon a des flashcards
- Détecte les exercices manquants
- Valide les chemins audio
- Compte le nombre d'exercices par type

**Sortie exemple** :
```
Analyse des leçons
━━━━━━━━━━━━━━━━━━━━━
PATH 1: Pinyin & Tons
  ├─ Leçon 1: 8 flashcards, 5 exercices [OK]
  ├─ Leçon 2: 0 flashcards [ATTENTION]
  └─ Leçon 3: 12 flashcards, 3 exercices [OK]

[ATTENTION] Problèmes détectés:
  - Leçon 2: Aucune flashcard définie
  - Leçon 5: Audio manquant pour 'ma1'
```

---

### `scripts/suggest-flashcards.py`

**Objectif** : Suggérer automatiquement des flashcards pertinentes pour chaque leçon basé sur le contenu.

**Utilisation** :
```bash
python3 scripts/suggest-flashcards.py
```

**Algorithme** :
1. Analyse le contenu de la leçon (introduction, exercices)
2. Extrait les caractères chinois mentionnés
3. Recherche dans les fichiers HSK correspondants
4. Suggère les flashcards les plus pertinentes

**Exemple de sortie** :
```json
{
  "lesson_id": "pinyin-1-introduction",
  "suggested_flashcards": [
    "ma1-妈-0001",
    "ba4-爸-0002",
    "ni3-你-0003"
  ],
  "confidence": 0.92
}
```

---

### `scripts/fix-all-lessons.py`

**Objectif** : Corriger automatiquement les problèmes courants dans les fichiers de leçons.

**Corrections appliquées** :
- Normalisation des chemins audio
- Correction des identifiants dupliqués
- Ajout de flashcards manquantes
- Validation de la structure TypeScript

---

### `scripts/generate_missing_audio.py`

**Objectif** : Détecter et générer les fichiers audio manquants.

**Utilisation** :
```bash
python3 scripts/generate_missing_audio.py
```

**Fonctionnement** :
1. Scanne tous les fichiers de leçons
2. Extrait les références audio (`audio="..."`)
3. Vérifie l'existence des fichiers dans `public/audio/`
4. Génère un job file pour les fichiers manquants
5. Appelle `audio_cloud_tts.py` pour générer les audio

---

### `scripts/download-all-pinyin.py`

**Objectif** : Télécharger les fichiers audio pinyin depuis des sources externes (AllSet Learning).

**Utilisation** :
```bash
python3 scripts/download-all-pinyin.py
```

**Fonctionnement** :
- Télécharge les audio pour chaque combinaison pinyin + ton
- Sauvegarde dans `public/audio/pinyin/`
- Format: `ma1.mp3`, `ma2.mp3`, `ma3.mp3`, `ma4.mp3`

---

### `scripts/check_google_cloud.sh`

**Objectif** : Vérifier que Google Cloud TTS est correctement configuré.

**Utilisation** :
```bash
npm run check:google
# ou
./scripts/check_google_cloud.sh
```

**Vérifications effectuées** :
1. [OK] Variable `GOOGLE_APPLICATION_CREDENTIALS` définie
2. [OK] Fichier de credentials JSON existe
3. [OK] Permissions du fichier correctes
4. [OK] Connexion à l'API Google Cloud TTS
5. [OK] Test de génération audio simple

**Sortie exemple** :
```bash
Vérification de la configuration Google Cloud TTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[OK] GOOGLE_APPLICATION_CREDENTIALS est défini
[OK] Fichier de credentials existe
[OK] Connexion à l'API réussie
[OK] Test de génération audio: OK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Configuration Google Cloud TTS valide
```

---

## Build et déploiement

### Workflow GitHub Actions (`.github/workflows/deploy.yml`)

**Déclenchement** : Push vers `main`

**Étapes** :

1. **Build**
   ```yaml
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
       # ... autres secrets Firebase
   ```

2. **Deploy**
   ```yaml
   - name: Upload artifact
     uses: actions/upload-pages-artifact@v3
     with:
       path: './dist'

   - name: Deploy to GitHub Pages
     uses: actions/deploy-pages@v4
   ```

**Durée** : ~2-3 minutes (build + deploy)

---

## Configuration requise

### Node.js

```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

### Python (optionnel, pour audio)

```bash
# Version recommandée
python3 --version  # >= 3.10

# Dépendances
pip install TTS soundfile google-cloud-texttospeech
```

---

## Métriques

### Temps de génération (Apple Silicon M1)

| Opération | Durée | Taille sortie |
|-----------|-------|---------------|
| `npm run sync:hsk` | ~5-10 min | ~8 MB JSON |
| `npm run build:data` | ~3 sec | ~8 MB JSON |
| `npm run generate:audio:cloud` | ~30-60 min | ~500 MB MP3 |
| `npm run generate:audio` (local) | ~45-90 min | ~500 MB WAV |
| `npm run build` | ~10 sec | ~6 MB bundle |

### Utilisation réseau

| Script | Données téléchargées |
|--------|----------------------|
| `sync:hsk` | ~5 MB (CSV + CEDICT) |
| `generate:audio:cloud` | ~10 KB/requête API |

---

## Dépannage

### Erreur: "Translation model not found"

```bash
# Solution: Télécharger manuellement le modèle
npm run sync:hsk
# Le modèle sera téléchargé automatiquement au premier lancement
```

### Erreur: "GOOGLE_APPLICATION_CREDENTIALS not set"

```bash
# Solution: Exporter la variable
export GOOGLE_APPLICATION_CREDENTIALS="/chemin/vers/credentials.json"
```

### Build échoue avec "Out of memory"

```bash
# Solution: Augmenter la mémoire Node.js
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

---

## Ressources supplémentaires

- [SCRIPTS_AUDIO.md](SCRIPTS_AUDIO.md) - Documentation détaillée des scripts audio
- [ARCHITECTURE.md](ARCHITECTURE.md) - Architecture de l'application
- [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md) - Configuration du domaine personnalisé
- [DEPLOY_CUSTOM_DOMAIN.md](DEPLOY_CUSTOM_DOMAIN.md) - Guide de déploiement

---

<div align="center">

**Documentation maintenue par [@perrineqhn](https://github.com/perrineqhn)**

</div>
