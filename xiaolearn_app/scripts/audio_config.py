"""
Configuration centralisée pour la génération audio.
Modifiez ces paramètres pour ajuster la qualité et durée des fichiers audio.
"""

# ============================================================================
# CONFIGURATION GÉNÉRALE
# ============================================================================

# Activer GPU pour accélérer la génération (nécessite CUDA)
USE_GPU = False

# ============================================================================
# PARAMÈTRES DE VITESSE
# ============================================================================

# Vitesse de parole (speech rate)
# - 1.0 = vitesse normale
# - > 1.0 = plus rapide (1.15 = 15% plus rapide)
# - < 1.0 = plus lent (0.85 = 15% plus lent)
# Recommandations:
#   - Mode local: 1.15 (compense la génération lente de Tacotron2)
#   - Mode cloud: 0.95 (Wavenet naturel, légèrement ralenti pour clarté)
#   - Débutants: 0.9-1.0 (plus lent pour mieux comprendre)
SPEECH_RATE_LOCAL = 1.15
SPEECH_RATE_CLOUD = 0.95

# ============================================================================
# PARAMÈTRES DE QUALITÉ AUDIO
# ============================================================================

# Sample rate (Hz)
# - 22050: Qualité standard Tacotron2
# - 24000: Haute qualité (recommandé)
# - 48000: Très haute qualité (fichiers plus gros)
TARGET_SAMPLE_RATE = 24000

# Format de sortie
# - 'PCM_16': 16-bit (standard, fichiers plus petits)
# - 'PCM_24': 24-bit (meilleure qualité, recommandé)
# - 'PCM_32': 32-bit (qualité maximale, fichiers gros)
AUDIO_SUBTYPE = 'PCM_24'

# ============================================================================
# PARAMÈTRES DE TRIMMING DU SILENCE
# ============================================================================

# Seuil de détection du silence (threshold)
# - Plus élevé = trim plus agressif
# - Plus bas = garde plus de silence
# Recommandé: 2e-3 (équilibre optimal)
SILENCE_THRESHOLD = 2e-3

# Marges de sécurité avant/après la parole (millisecondes)
# - Plus grand = garde plus de silence aux extrémités
# - Plus petit = audio plus court mais risque de couper la parole
# Recommandations:
#   - Mode local: 100ms (Tacotron2 a des transitions abruptes)
#   - Mode cloud: 80ms (Wavenet naturel avec respirations naturelles)
SILENCE_MARGIN_LOCAL_MS = 100
SILENCE_MARGIN_CLOUD_MS = 80

# ============================================================================
# PARAMÈTRES DE NORMALISATION DU VOLUME
# ============================================================================

# Volume cible en dB
# - -20dB: Standard pour contenu parlé
# - -16dB: Légèrement plus fort
# - -24dB: Plus doux
TARGET_VOLUME_DB = -20.0

# ============================================================================
# CONFIGURATION GOOGLE CLOUD TTS
# ============================================================================

# Voix Google Cloud (pour mode cloud uniquement)
# Voix disponibles pour le mandarin:
#   - 'cmn-CN-Wavenet-A': Féminin, très naturel (RECOMMANDÉ)
#   - 'cmn-CN-Wavenet-B': Masculin, clair
#   - 'cmn-CN-Wavenet-C': Masculin, voix plus grave
#   - 'cmn-CN-Wavenet-D': Féminin, voix douce
GOOGLE_VOICE_NAME = 'cmn-CN-Wavenet-A'

# Code langue Google Cloud
GOOGLE_LANGUAGE_CODE = 'cmn-CN'  # Mandarin chinois

# Encodage audio Google Cloud
# - LINEAR16: PCM non compressé (recommandé)
# - MP3: Compressé (fichiers plus petits mais perte de qualité)
GOOGLE_AUDIO_ENCODING = 'LINEAR16'

# ============================================================================
# CONFIGURATION MODÈLE LOCAL (COQUI TTS)
# ============================================================================

# Modèle Coqui TTS
# Modèles chinois disponibles:
#   - 'tts_models/zh-CN/baker/tacotron2-DDC-GST': Standard (ACTUEL)
# Note: Peu de modèles chinois disponibles dans Coqui TTS
LOCAL_TTS_MODEL = 'tts_models/zh-CN/baker/tacotron2-DDC-GST'

# ============================================================================
# PARAMÈTRES AVANCÉS
# ============================================================================

# Activer les logs détaillés
VERBOSE_LOGGING = True

# Afficher la durée de chaque fichier généré
SHOW_DURATION = True

# Activer la barre de progression (désactivé pour logs propres)
SHOW_PROGRESS_BAR = False

# ============================================================================
# VALIDATION DE LA CONFIGURATION
# ============================================================================

def validate_config():
    """Valide la configuration et affiche des avertissements si nécessaire."""
    warnings = []

    if SPEECH_RATE_LOCAL > 1.5:
        warnings.append(f"⚠️  SPEECH_RATE_LOCAL ({SPEECH_RATE_LOCAL}) très élevé (> 1.5). L'audio risque d'être incompréhensible.")

    if SPEECH_RATE_CLOUD > 1.5:
        warnings.append(f"⚠️  SPEECH_RATE_CLOUD ({SPEECH_RATE_CLOUD}) très élevé (> 1.5). L'audio risque d'être incompréhensible.")

    if SILENCE_THRESHOLD > 5e-3:
        warnings.append(f"⚠️  SILENCE_THRESHOLD ({SILENCE_THRESHOLD}) très élevé. Risque de couper la parole.")

    if SILENCE_MARGIN_LOCAL_MS < 30:
        warnings.append(f"⚠️  SILENCE_MARGIN_LOCAL_MS ({SILENCE_MARGIN_LOCAL_MS}) très petit (< 30ms). Risque de couper la parole.")

    if TARGET_VOLUME_DB > -10:
        warnings.append(f"⚠️  TARGET_VOLUME_DB ({TARGET_VOLUME_DB}) très élevé (> -10dB). Risque de saturation.")

    if TARGET_SAMPLE_RATE < 16000:
        warnings.append(f"⚠️  TARGET_SAMPLE_RATE ({TARGET_SAMPLE_RATE}) faible (< 16000Hz). Qualité audio compromise.")

    return warnings


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def get_config(use_cloud: bool = False) -> dict:
    """
    Retourne la configuration appropriée selon le mode.

    Args:
        use_cloud: True pour mode cloud, False pour mode local

    Returns:
        Dict avec la configuration
    """
    if use_cloud:
        return {
            'speech_rate': SPEECH_RATE_CLOUD,
            'silence_margin_ms': SILENCE_MARGIN_CLOUD_MS,
            'voice_name': GOOGLE_VOICE_NAME,
            'language_code': GOOGLE_LANGUAGE_CODE,
            'audio_encoding': GOOGLE_AUDIO_ENCODING,
            'sample_rate': TARGET_SAMPLE_RATE,
            'subtype': AUDIO_SUBTYPE,
            'silence_threshold': SILENCE_THRESHOLD,
            'target_db': TARGET_VOLUME_DB,
        }
    else:
        return {
            'speech_rate': SPEECH_RATE_LOCAL,
            'silence_margin_ms': SILENCE_MARGIN_LOCAL_MS,
            'model_name': LOCAL_TTS_MODEL,
            'use_gpu': USE_GPU,
            'sample_rate': TARGET_SAMPLE_RATE,
            'subtype': AUDIO_SUBTYPE,
            'silence_threshold': SILENCE_THRESHOLD,
            'target_db': TARGET_VOLUME_DB,
            'progress_bar': SHOW_PROGRESS_BAR,
        }


def print_config(use_cloud: bool = False):
    """Affiche la configuration actuelle."""
    config = get_config(use_cloud)
    mode = "Google Cloud TTS" if use_cloud else "Coqui TTS Local"

    print("="*60)
    print(f"⚙️  Configuration Audio - {mode}")
    print("="*60)

    for key, value in config.items():
        print(f"  {key:20s}: {value}")

    print("="*60)

    # Validation warnings
    warnings = validate_config()
    if warnings:
        print("\n⚠️  AVERTISSEMENTS:")
        for warning in warnings:
            print(f"  {warning}")
        print()


if __name__ == '__main__':
    print("Configuration pour mode local:")
    print_config(use_cloud=False)
    print("\nConfiguration pour mode cloud:")
    print_config(use_cloud=True)
