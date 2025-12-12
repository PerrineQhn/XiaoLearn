# Documentation XiaoLearn

Bienvenue dans la documentation complète de XiaoLearn.

---

## Table des matières

### Guides de démarrage

1. **[README principal](../README.md)**
   - Vue d'ensemble du projet
   - Installation rapide
   - Configuration Firebase et Google Cloud
   - Scripts disponibles

### Architecture et conception

2. **[ARCHITECTURE.md](ARCHITECTURE.md)**
   - Architecture technique complète
   - Stack technologique
   - Gestion des données et états
   - Système d'authentification Firebase
   - Algorithme SRS (Spaced Repetition System)
   - PWA et mode hors-ligne
   - Pipeline de déploiement

### Documentation des scripts

3. **[SCRIPTS.md](SCRIPTS.md)**
   - Vue d'ensemble de tous les scripts
   - Génération de données HSK
   - Utilitaires et maintenance
   - Build et déploiement
   - Dépannage courant

4. **[SCRIPTS_AUDIO.md](SCRIPTS_AUDIO.md)**
   - Documentation détaillée des scripts audio
   - `audio_cloud_tts.py` - Google Cloud TTS
   - `audio_tts.py` - Coqui TTS local
   - `generate-phrase-audio.mjs` - Phrases des leçons
   - `generateCoreAudio.mjs` - Audio Pinyin/Grammaire
   - Post-traitement audio (trim, normalisation)
   - Configuration et dépannage

### Déploiement

5. **[CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md)**
   - Configuration DNS Cloudflare
   - Configuration du domaine personnalisé
   - Pointage vers GitHub Pages

6. **[DEPLOY_CUSTOM_DOMAIN.md](DEPLOY_CUSTOM_DOMAIN.md)**
   - Guide complet de déploiement
   - Configuration GitHub Secrets
   - Configuration Firebase
   - Vérifications post-déploiement

---

## Guides par cas d'usage

### Pour les développeurs

#### Je veux contribuer au projet
1. Lisez le [README principal](../README.md) pour comprendre le projet
2. Consultez [ARCHITECTURE.md](ARCHITECTURE.md) pour l'architecture
3. Installez les dépendances et lancez `npm run dev`

#### Je veux générer les données HSK
1. Consultez [SCRIPTS.md](SCRIPTS.md) section "Génération de données"
2. Exécutez `npm run sync:hsk`
3. Puis `npm run build:data`

#### Je veux générer les fichiers audio
1. Lisez [SCRIPTS_AUDIO.md](SCRIPTS_AUDIO.md) pour comprendre les options
2. Pour haute qualité : configurez Google Cloud TTS puis `npm run generate:audio:cloud`
3. Pour local/gratuit : `npm run generate:audio`

#### Je veux ajouter une nouvelle leçon
1. Consultez [ARCHITECTURE.md](ARCHITECTURE.md) section "Gestion des données"
2. Éditez `src/data/lesson-paths.ts`
3. Créez les exercices dans `src/data/lesson-exercises-{path}.ts`
4. Générez l'audio si nécessaire

#### Je veux modifier l'algorithme SRS
1. Consultez [ARCHITECTURE.md](ARCHITECTURE.md) section "Algorithme SRS"
2. Éditez `src/hooks/useFlashcardSRS.ts`
3. Testez avec différentes séquences de révision

### Pour les déployeurs

#### Je veux déployer sur mon domaine
1. Suivez [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md) pour DNS
2. Suivez [DEPLOY_CUSTOM_DOMAIN.md](DEPLOY_CUSTOM_DOMAIN.md) pour GitHub
3. Configurez les secrets Firebase dans GitHub

#### Je veux debugger un problème de déploiement
1. Vérifiez [DEPLOY_CUSTOM_DOMAIN.md](DEPLOY_CUSTOM_DOMAIN.md) section "Dépannage"
2. Consultez les logs GitHub Actions
3. Vérifiez que tous les secrets sont configurés

---

## Index des concepts

### Algorithmes et logique

- **SRS (Spaced Repetition System)** → [ARCHITECTURE.md](ARCHITECTURE.md#algorithme-srs)
- **Système de progression** → [ARCHITECTURE.md](ARCHITECTURE.md#système-de-progression)
- **Post-traitement audio** → [SCRIPTS_AUDIO.md](SCRIPTS_AUDIO.md#post-traitement-audio)

### Technologies

- **React + TypeScript** → [ARCHITECTURE.md](ARCHITECTURE.md#architecture-frontend)
- **Firebase Auth** → [ARCHITECTURE.md](ARCHITECTURE.md#système-dauthentification)
- **Google Cloud TTS** → [SCRIPTS_AUDIO.md](SCRIPTS_AUDIO.md#audio_cloud_ttspy)
- **Coqui TTS** → [SCRIPTS_AUDIO.md](SCRIPTS_AUDIO.md#audio_ttspy)
- **PWA & Service Worker** → [ARCHITECTURE.md](ARCHITECTURE.md#pwa-et-mode-hors-ligne)

### Scripts

- **generateHskData.mjs** → [SCRIPTS.md](SCRIPTS.md#scriptsgeneratehskdatamjs)
- **audio_cloud_tts.py** → [SCRIPTS_AUDIO.md](SCRIPTS_AUDIO.md#audio_cloud_ttspy)
- **buildDataset.mjs** → [SCRIPTS.md](SCRIPTS.md#scriptsbuildda tasetmjs)
- **generate-phrase-audio.mjs** → [SCRIPTS_AUDIO.md](SCRIPTS_AUDIO.md#generate-phrase-audiomjs)

### Configuration

- **Firebase** → [README](../README.md#firebase), [DEPLOY_CUSTOM_DOMAIN.md](DEPLOY_CUSTOM_DOMAIN.md)
- **Google Cloud TTS** → [README](../README.md#google-cloud-tts-optionnel), [SCRIPTS_AUDIO.md](SCRIPTS_AUDIO.md#configuration-et-dépannage)
- **Cloudflare DNS** → [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md)
- **GitHub Secrets** → [DEPLOY_CUSTOM_DOMAIN.md](DEPLOY_CUSTOM_DOMAIN.md)

---

## Métriques du projet

### Code source
- **~15 000 lignes** de TypeScript/React
- **~3 000 lignes** de scripts Python/JavaScript
- **~100 composants** React
- **8 pages** principales

### Données
- **~10 000 mots** HSK (niveaux 1-7)
- **115 000+ entrées** CC-CEDICT
- **~5 400 traductions** FR automatiques

### Contenu pédagogique
- **8 parcours** d'apprentissage
- **100+ leçons** interactives
- **500+ exercices** variés
- **5 mini-jeux** interactifs

### Audio
- **~12 700 fichiers** audio
- **~470 MB** de contenu audio
- **2 moteurs TTS** (Google Cloud + Coqui)

---

## Contribuer

Consultez le [README principal](../README.md#contribution) pour les directives de contribution.

---

## Support

- **Issues** : [GitHub Issues](https://github.com/perrineqhn/XiaoLearn/issues)
- **Email** : [@perrineqhn](https://github.com/perrineqhn)
- **Documentation** : Vous êtes ici

---

<div align="center">

**Documentation maintenue par [@perrineqhn](https://github.com/perrineqhn)**

**Dernière mise à jour** : Décembre 2024

</div>
