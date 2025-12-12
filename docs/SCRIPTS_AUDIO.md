# Documentation des Scripts Audio

Documentation détaillée de tous les scripts de génération audio pour XiaoLearn.

---

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [audio_cloud_tts.py](#audio_cloud_ttspy)
3. [audio_tts.py](#audio_ttspy)
4. [generate-phrase-audio.mjs](#generate-phrase-audiomjs)
5. [generateCoreAudio.mjs](#generatecoreaudiomjs)
6. [generateAudioAI.mjs](#generateaudioaimjs)
7. [Configuration et dépannage](#configuration-et-dépannage)

---

## Vue d'ensemble

### Architecture hybride

XiaoLearn utilise une **architecture hybride à deux niveaux** pour la génération audio :

```
┌─────────────────────────────────────────┐
│      Génération Audio XiaoLearn         │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┐   ┌───────────────┐  │
│  │ Google Cloud │   │  Coqui TTS    │  │
│  │     TTS      │   │   (Local)     │  │
│  │              │   │               │  │
│  │  Haute       │   │  Fallback     │  │
│  │  qualité     │   │  hors-ligne   │  │
│  └──────┬───────┘   └───────┬───────┘  │
│         │                   │          │
│         └─────────┬─────────┘          │
│                   ▼                    │
│         ┌──────────────────┐           │
│         │ Post-traitement  │           │
│         │ - Trim silence   │           │
│         │ - Normalisation  │           │
│         │ - Conversion MP3 │           │
│         └──────────────────┘           │
└─────────────────────────────────────────┘
```

### Comparaison des moteurs TTS

| Caractéristique | Google Cloud TTS | Coqui TTS |
|-----------------|------------------|-----------|
| **Qualité** | Excellente (5/5) | Très bonne (4/5) |
| **Naturalité** | Voix humaines natives | Voix synthétiques |
| **Vitesse** | Rapide (API) | Lent (local) |
| **Coût** | Payant ($4/1M caractères) | Gratuit |
| **Hors-ligne** | Nécessite internet | Fonctionne hors-ligne |
| **Setup** | Credentials JSON | pip install TTS |
| **Format sortie** | MP3 (encodé) | WAV (brut) |
| **Voix disponibles** | 100+ voix | 1 modèle CN |

### Stratégie de sélection

```python
def choose_tts_engine(context):
    if has_google_credentials() and context == "production":
        return GoogleCloudTTS()  # Haute qualité
    elif context == "development":
        return CoquiTTS()  # Rapide, hors-ligne
    else:
        return CoquiTTS()  # Fallback
```

---

## audio_cloud_tts.py

**Localisation** : `scripts/audio_cloud_tts.py`

**Rôle** : Service TTS hybride avec Google Cloud TTS en priorité et Coqui TTS en fallback.

### Utilisation

```bash
# Génération avec Google Cloud TTS
GOOGLE_APPLICATION_CREDENTIALS="/path/to/credentials.json" \
python3 scripts/audio_cloud_tts.py job-file.json public/audio --cloud

# Génération avec Coqui TTS (fallback local)
python3 scripts/audio_cloud_tts.py job-file.json public/audio

# Forcer la régénération
python3 scripts/audio_cloud_tts.py job-file.json public/audio --cloud --force
```

### Architecture de la classe

```python
class CloudTTSService:
    """Service TTS hybride avec cloud et local providers."""

    def __init__(self, use_cloud: bool = True, cache_dir: Optional[Path] = None):
        self.use_cloud = use_cloud
        self.cache_dir = cache_dir or Path('.audio_cache')
        self.google_client = self._init_google_tts() if use_cloud else None
        self.local_tts = self._init_local_tts() if not self.google_client else None
```

### Fonctions principales

#### `_init_google_tts()` - Initialisation Google Cloud TTS

```python
def _init_google_tts(self) -> Optional[Any]:
    """Initialize Google Cloud TTS client."""
    try:
        from google.cloud import texttospeech

        # Vérifie les credentials
        if not os.getenv('GOOGLE_APPLICATION_CREDENTIALS'):
            return None

        client = texttospeech.TextToSpeechClient()
        print("[OK] Google Cloud TTS initialized")
        return client
    except ImportError:
        print("[INFO] google-cloud-texttospeech not installed")
        return None
```

**Retour** :
- `TextToSpeechClient` si succès
- `None` si échec (utilise fallback Coqui)

#### `_init_local_tts()` - Initialisation Coqui TTS

```python
def _init_local_tts(self) -> Optional[Any]:
    """Initialize local Coqui TTS as fallback."""
    try:
        from TTS.api import TTS

        model_name = "tts_models/zh-CN/baker/tacotron2-DDC-GST"
        tts = TTS(model_name=model_name, progress_bar=False)
        print("[OK] Local Coqui TTS initialized")
        return tts
    except Exception as e:
        print(f"[ATTENTION] Could not initialize Coqui TTS: {e}")
        return None
```

#### `synthesize()` - Génération audio

```python
def synthesize(
    self,
    text: str,
    output_path: Path,
    voice: str = "cmn-CN-Wavenet-A",
    speed: float = 1.0
) -> bool:
    """
    Synthesize text to speech.

    Args:
        text: Texte chinois à synthétiser
        output_path: Chemin de sortie (MP3 ou WAV)
        voice: Nom de la voix Google Cloud
        speed: Vitesse de parole (0.5 - 2.0)

    Returns:
        True si succès, False sinon
    """
    # Vérifier le cache
    cache_key = hashlib.md5(f"{text}_{voice}_{speed}".encode()).hexdigest()
    cached_file = self.cache_dir / f"{cache_key}.mp3"

    if cached_file.exists():
        shutil.copy(cached_file, output_path)
        return True

    # Essayer Google Cloud TTS
    if self.google_client:
        success = self._synthesize_google(text, output_path, voice, speed)
        if success:
            shutil.copy(output_path, cached_file)  # Cache
            return True

    # Fallback vers Coqui TTS
    if self.local_tts:
        return self._synthesize_local(text, output_path, speed)

    return False
```

#### `_synthesize_google()` - Génération Google Cloud

```python
def _synthesize_google(
    self,
    text: str,
    output_path: Path,
    voice: str,
    speed: float
) -> bool:
    """Synthesize using Google Cloud TTS."""
    from google.cloud import texttospeech

    # Configuration de la synthèse
    synthesis_input = texttospeech.SynthesisInput(text=text)

    voice_params = texttospeech.VoiceSelectionParams(
        language_code="cmn-CN",
        name=voice
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3,
        speaking_rate=speed,
        pitch=0.0,
        volume_gain_db=0.0
    )

    # Appel API
    response = self.google_client.synthesize_speech(
        input=synthesis_input,
        voice=voice_params,
        audio_config=audio_config
    )

    # Sauvegarde
    with open(output_path, 'wb') as f:
        f.write(response.audio_content)

    return True
```

**Voix disponibles** :
- `cmn-CN-Wavenet-A` (Femme, standard)
- `cmn-CN-Wavenet-B` (Homme, standard)
- `cmn-CN-Wavenet-C` (Homme, profond)
- `cmn-CN-Wavenet-D` (Femme, douce)

#### `_synthesize_local()` - Génération Coqui TTS

```python
def _synthesize_local(
    self,
    text: str,
    output_path: Path,
    speed: float
) -> bool:
    """Synthesize using local Coqui TTS."""
    import soundfile as sf

    # Génération avec Coqui
    wav = self.local_tts.tts(text=text, speed=speed)

    # Post-traitement
    wav = trim_silence(wav, threshold=2e-3, margin_ms=50)
    wav = normalize_audio(wav, target_db=-20.0)

    # Sauvegarde WAV
    sf.write(str(output_path), wav, 22050)

    return True
```

### Post-traitement audio

#### `trim_silence()` - Suppression des silences

```python
def trim_silence(
    audio: np.ndarray,
    threshold: float = 2e-3,
    margin_ms: int = 50,
    sample_rate: int = 22050
) -> np.ndarray:
    """
    Trim silence from audio with improved threshold and safety margins.

    Args:
        audio: Tableau numpy du signal audio
        threshold: Seuil d'amplitude (2e-3 = -54 dB)
        margin_ms: Marge de sécurité en millisecondes
        sample_rate: Taux d'échantillonnage

    Returns:
        Audio trimé
    """
    if audio.size == 0:
        return audio

    # Détecter les parties non-silencieuses
    mask = np.where(np.abs(audio) > threshold)[0]

    if mask.size == 0:
        return audio

    # Ajouter des marges de sécurité
    margin_samples = int((margin_ms / 1000.0) * sample_rate)
    start = max(0, mask[0] - margin_samples)
    end = min(len(audio), mask[-1] + 1 + margin_samples)

    return audio[start:end]
```

**Exemple** :
```
Audio original (1.5s):
|------[========SPEECH========]------|
└─ 200ms silence │ 1.0s parole │ 300ms silence

Audio trimé (1.1s):
|--[========SPEECH========]--|
└─ 50ms marge │ 1.0s parole │ 50ms marge
```

#### `normalize_audio()` - Normalisation du volume

```python
def normalize_audio(
    audio: np.ndarray,
    target_db: float = -20.0
) -> np.ndarray:
    """
    Normalize audio volume to consistent level.

    Args:
        audio: Tableau numpy du signal audio
        target_db: Volume cible en dB (-20 dB = standard)

    Returns:
        Audio normalisé
    """
    if audio.size == 0:
        return audio

    # Calculer RMS (Root Mean Square) actuel
    rms = np.sqrt(np.mean(audio ** 2))

    if rms == 0:
        return audio

    # Convertir target_db en amplitude
    target_rms = 10 ** (target_db / 20.0)

    # Normaliser
    normalized = audio * (target_rms / rms)

    # Prévenir le clipping (> 1.0)
    max_val = np.abs(normalized).max()
    if max_val > 1.0:
        normalized = normalized / max_val * 0.99

    return normalized
```

**Référence dB** :
```
  0 dB  → Niveau maximum (risque de clipping)
-10 dB  → Très fort
-20 dB  → Standard pour audio pédagogique [RECOMMANDÉ]
-30 dB  → Modéré
-40 dB  → Doux
```

### Format du fichier job

Le fichier JSON d'entrée définit tous les audios à générer :

```json
{
  "jobs": [
    {
      "text": "你好",
      "output": "pinyin/ni3hao3-你好-0001.mp3",
      "voice": "cmn-CN-Wavenet-A",
      "speed": 1.0
    },
    {
      "text": "谢谢",
      "output": "phrases/xie4xie4-谢谢-0002.mp3",
      "voice": "cmn-CN-Wavenet-D",
      "speed": 0.9
    }
  ]
}
```

### Gestion du cache

```python
# Structure du cache
.audio_cache/
├── a1b2c3d4e5f6.mp3  # Hash MD5 du texte + voice + speed
├── f6e5d4c3b2a1.mp3
└── ...

# Avantages :
# [OK] Évite les appels API redondants
# [OK] Accélère les régénérations
# [OK] Réduit les coûts Google Cloud
```

### Métriques de performance

| Opération | Durée | Coût |
|-----------|-------|------|
| Génération Google (1 phrase) | ~500ms | ~$0.00004 |
| Génération Coqui (1 phrase) | ~2-3s | $0 |
| Post-traitement | ~50ms | $0 |
| Lecture cache | ~5ms | $0 |

**Exemple pour 5 000 phrases** :
- Google Cloud : ~42 min, ~$0.20
- Coqui TTS : ~3h, $0

---

## audio_tts.py

**Localisation** : `scripts/audio_tts.py`

**Rôle** : Script legacy pour génération audio Coqui TTS uniquement (sans Google Cloud).

### Utilisation

```bash
# Génération simple
python3 scripts/audio_tts.py job-file.json public/audio

# Avec verbose
python3 scripts/audio_tts.py job-file.json public/audio --verbose
```

### Différences avec audio_cloud_tts.py

| Fonctionnalité | audio_cloud_tts.py | audio_tts.py |
|----------------|-------------------|--------------|
| Google Cloud TTS | Oui | Non |
| Coqui TTS | Oui | Oui |
| Cache | Oui | Non |
| Fallback automatique | Oui | Non |
| Post-traitement | Oui | Oui |

**Recommandation** : Utiliser `audio_cloud_tts.py` qui est plus récent et complet.

---

## generate-phrase-audio.mjs

**Localisation** : `scripts/generate-phrase-audio.mjs`

**Rôle** : Orchestrer la génération d'audio pour toutes les phrases des leçons.

### Utilisation

```bash
npm run generate:audio:phrases
```

### Fonctionnement

```javascript
// 1. Scanner tous les fichiers de leçons
const lessonFiles = glob.sync('src/data/lesson-exercises-*.ts');

// 2. Extraire les phrases chinoises
const phrases = [];
for (const file of lessonFiles) {
  const content = await fs.readFile(file, 'utf-8');
  const matches = content.matchAll(/text:\s*"([^"]+)"/g);
  for (const match of matches) {
    if (isChinese(match[1])) {
      phrases.push(match[1]);
    }
  }
}

// 3. Générer le job file
const jobs = phrases.map((phrase, index) => ({
  text: phrase,
  output: `phrases/phrase-${index.toString().padStart(4, '0')}.mp3`,
  voice: "cmn-CN-Wavenet-A",
  speed: 0.9  // Légèrement plus lent pour l'apprentissage
}));

await fs.writeFile('phrases-jobs.json', JSON.stringify({ jobs }, null, 2));

// 4. Appeler audio_cloud_tts.py
exec('python3 scripts/audio_cloud_tts.py phrases-jobs.json public/audio --cloud');
```

### Détection du chinois

```javascript
function isChinese(text) {
  // Plage Unicode des caractères chinois (CJK Unified Ideographs)
  const chineseRegex = /[\u4e00-\u9fff]/;
  return chineseRegex.test(text);
}
```

---

## generateCoreAudio.mjs

**Localisation** : `scripts/generateCoreAudio.mjs`

**Rôle** : Générer les fichiers audio de base (pinyin, grammaire) essentiels au fonctionnement de l'app.

### Utilisation

```bash
# Générer uniquement les fichiers manquants
npm run generate:audio:core

# Régénérer tous les fichiers (force)
npm run generate:audio:core -- --force
```

### Catégories d'audio générées

#### 1. Audio Pinyin

Tous les syllabes pinyin avec les 4 tons + ton neutre :

```javascript
const pinyinSyllables = [
  'a', 'ba', 'pa', 'ma', 'fa', 'da', 'ta', 'na', 'la',
  'ga', 'ka', 'ha', 'zha', 'cha', 'sha', 're', 'zi', 'ci', 'si',
  // ... ~400 syllabes
];

const tones = ['1', '2', '3', '4', '5']; // 5 = ton neutre

const jobs = [];
for (const syllable of pinyinSyllables) {
  for (const tone of tones) {
    jobs.push({
      text: convertPinyinToToned(syllable, tone),  // ma1 → mā
      output: `pinyin/${syllable}${tone}.mp3`,
      voice: "cmn-CN-Wavenet-D",
      speed: 0.8  // Lent pour l'apprentissage des tons
    });
  }
}
```

**Total** : ~2 000 fichiers pinyin

#### 2. Audio Grammaire

Phrases exemples pour les leçons de grammaire :

```javascript
const grammarExamples = [
  { id: 'subject-verb-object', text: '我吃饭' },
  { id: 'question-particle-ma', text: '你好吗？' },
  { id: 'possession-de', text: '我的书' },
  // ... ~200 exemples
];

const jobs = grammarExamples.map(example => ({
  text: example.text,
  output: `grammar/${example.id}.mp3`,
  voice: "cmn-CN-Wavenet-A",
  speed: 0.9
}));
```

**Total** : ~200 fichiers grammaire

### Conversion Pinyin → Tons

```javascript
function convertPinyinToToned(syllable, toneNumber) {
  const toneMap = {
    'a': ['ā', 'á', 'ǎ', 'à', 'a'],
    'e': ['ē', 'é', 'ě', 'è', 'e'],
    'i': ['ī', 'í', 'ǐ', 'ì', 'i'],
    'o': ['ō', 'ó', 'ǒ', 'ò', 'o'],
    'u': ['ū', 'ú', 'ǔ', 'ù', 'u'],
    'ü': ['ǖ', 'ǘ', 'ǚ', 'ǜ', 'ü']
  };

  // Règles de placement du ton:
  // 1. a/e ont toujours la priorité
  // 2. Sinon, ou
  // 3. Sinon, la dernière voyelle

  const vowelOrder = ['a', 'e', 'o', 'i', 'u', 'ü'];

  for (const vowel of vowelOrder) {
    if (syllable.includes(vowel)) {
      const tonedVowel = toneMap[vowel][parseInt(toneNumber) - 1];
      return syllable.replace(vowel, tonedVowel);
    }
  }

  return syllable;
}
```

---

## generateAudioAI.mjs

**Localisation** : `scripts/generateAudioAI.mjs`

**Rôle** : Script orchestrateur général qui appelle tous les autres scripts audio.

### Utilisation

```bash
# Génération complète (local Coqui)
npm run generate:audio

# Génération complète (Google Cloud)
npm run generate:audio:cloud
```

### Flux d'exécution

```javascript
async function generateAllAudio(useCloud = false) {
  console.log('Génération audio complète...\n');

  // Étape 1: Audio core (pinyin + grammaire)
  console.log('Étape 1/3: Génération audio core');
  await exec('node scripts/generateCoreAudio.mjs');

  // Étape 2: Audio phrases de leçons
  console.log('Étape 2/3: Génération audio phrases');
  await exec('node scripts/generate-phrase-audio.mjs');

  // Étape 3: Audio vocabulaire HSK
  console.log('Étape 3/3: Génération audio vocabulaire');
  const hskJobs = await generateHskVocabJobs();
  await fs.writeFile('hsk-vocab-jobs.json', JSON.stringify(hskJobs, null, 2));

  const cloudFlag = useCloud ? '--cloud' : '';
  await exec(`python3 scripts/audio_cloud_tts.py hsk-vocab-jobs.json public/audio ${cloudFlag}`);

  console.log('\n[OK] Génération audio terminée');
  console.log(`Total: ${countGeneratedFiles()} fichiers générés`);
}
```

---

## Configuration et dépannage

### Variables d'environnement

```bash
# Google Cloud TTS
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/credentials.json"

# Optionnel: Désactiver le cache
export AUDIO_CACHE_DISABLED=true

# Optionnel: Augmenter la verbosité
export AUDIO_VERBOSE=true
```

### Problèmes courants

#### Erreur: "google-cloud-texttospeech not installed"

```bash
# Solution
pip install google-cloud-texttospeech
```

#### Erreur: "GOOGLE_APPLICATION_CREDENTIALS not set"

```bash
# Solution
export GOOGLE_APPLICATION_CREDENTIALS="/chemin/vers/credentials.json"

# Vérifier
echo $GOOGLE_APPLICATION_CREDENTIALS
```

#### Erreur: "TTS model not found"

```bash
# Solution: Télécharger manuellement
python3 -c "from TTS.api import TTS; TTS('tts_models/zh-CN/baker/tacotron2-DDC-GST')"
```

#### Audio corrompu ou silencieux

```bash
# Vider le cache
rm -rf .audio_cache/

# Régénérer
npm run generate:audio:core -- --force
```

### Tests

```bash
# Tester Google Cloud TTS
npm run check:google

# Tester Coqui TTS local
npm run test:audio

# Comparer qualité Cloud vs Local
npm run analyze:audio
```

---

## Statistiques

### Fichiers audio générés

| Catégorie | Nombre de fichiers | Taille totale |
|-----------|-------------------|---------------|
| Pinyin | ~2 000 | ~40 MB |
| Grammaire | ~200 | ~8 MB |
| Phrases leçons | ~500 | ~20 MB |
| Vocabulaire HSK | ~10 000 | ~400 MB |
| **TOTAL** | **~12 700** | **~470 MB** |

### Coûts Google Cloud TTS

Tarif : $4 USD / 1 million de caractères

| Génération | Caractères | Coût estimé |
|------------|-----------|-------------|
| Pinyin (2 000 × 3 car.) | 6 000 | $0.024 |
| Grammaire (200 × 8 car.) | 1 600 | $0.006 |
| Phrases (500 × 12 car.) | 6 000 | $0.024 |
| Vocabulaire (10 000 × 4 car.) | 40 000 | $0.16 |
| **TOTAL** | **53 600** | **~$0.21** |

**Conclusion** : Le coût Google Cloud TTS est négligeable (~$0.21 pour une génération complète).

---

## Recommandations

### Pour le développement

```bash
# Utiliser Coqui TTS (gratuit, hors-ligne)
npm run generate:audio

# Avantages:
# [OK] Pas besoin de credentials Google
# [OK] Fonctionne hors-ligne
# [OK] Gratuit
```

### Pour la production

```bash
# Utiliser Google Cloud TTS (haute qualité)
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/credentials.json"
npm run generate:audio:cloud

# Avantages:
# [OK] Qualité supérieure
# [OK] Voix naturelles
# [OK] Coût faible (~$0.21)
```

### Optimisations

```python
# 1. Utiliser le cache agressivement
# Le cache évite 90%+ des régénérations

# 2. Générer par batch
# Grouper les jobs par 100 pour paralléliser

# 3. Utiliser la voix appropriée
# Wavenet-A (standard) vs Wavenet-D (douce)
```

---

<div align="center">

**Documentation maintenue par [@perrineqhn](https://github.com/perrineqhn)**

**Dernière mise à jour** : Décembre 2024

</div>
