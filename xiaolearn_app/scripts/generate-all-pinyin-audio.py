#!/usr/bin/env python3
"""
Script pour générer tous les fichiers audio pinyin (consonnes + voyelles)
Utilise Google Cloud Text-to-Speech API
"""

import sys
from pathlib import Path

# Add parent directory to path to import audio_cloud_tts
sys.path.insert(0, str(Path(__file__).parent))

from audio_cloud_tts import CloudTTSService

# Configuration
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "audio" / "pinyin"

# Liste complète des sons à générer
PINYIN_SOUNDS = [
    # Voyelles simples
    {"filename": "a.wav", "text": "ā", "description": "Voyelle a"},
    {"filename": "o.wav", "text": "ō", "description": "Voyelle o"},
    {"filename": "e.wav", "text": "ē", "description": "Voyelle e"},
    {"filename": "i.wav", "text": "ī", "description": "Voyelle i"},
    {"filename": "u.wav", "text": "ū", "description": "Voyelle u"},
    {"filename": "v.wav", "text": "ǖ", "description": "Voyelle ü"},

    # Consonnes initiales (avec voyelle pour la prononciation)
    {"filename": "b.wav", "text": "bō", "description": "Consonne b"},
    {"filename": "p.wav", "text": "pō", "description": "Consonne p"},
    {"filename": "m.wav", "text": "mō", "description": "Consonne m"},
    {"filename": "f.wav", "text": "fō", "description": "Consonne f"},
    {"filename": "d.wav", "text": "dē", "description": "Consonne d"},
    {"filename": "t.wav", "text": "tē", "description": "Consonne t"},
    {"filename": "n.wav", "text": "nē", "description": "Consonne n"},
    {"filename": "l.wav", "text": "lē", "description": "Consonne l"},
    {"filename": "g.wav", "text": "gē", "description": "Consonne g"},
    {"filename": "k.wav", "text": "kē", "description": "Consonne k"},
    {"filename": "h.wav", "text": "hē", "description": "Consonne h"},
    {"filename": "j.wav", "text": "jī", "description": "Consonne j"},
    {"filename": "q.wav", "text": "qī", "description": "Consonne q"},
    {"filename": "x.wav", "text": "xī", "description": "Consonne x"},

    # Combinaisons rétroflexes et affriquées
    {"filename": "zh.wav", "text": "zhē", "description": "Son zh"},
    {"filename": "ch.wav", "text": "chē", "description": "Son ch"},
    {"filename": "sh.wav", "text": "shē", "description": "Son sh"},
    {"filename": "r.wav", "text": "rē", "description": "Son r"},
    {"filename": "z.wav", "text": "zē", "description": "Son z"},
    {"filename": "c.wav", "text": "cē", "description": "Son c"},
    {"filename": "s.wav", "text": "sē", "description": "Son s"},
]

def main():
    # Créer le dossier de sortie si nécessaire
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"Génération des fichiers audio pinyin dans: {OUTPUT_DIR}")
    print(f"Utilisation de Google Cloud Text-to-Speech API\n")

    # Initialiser le service TTS
    tts_service = CloudTTSService(use_cloud=True)

    if not tts_service.google_client:
        print("\n❌ Erreur: Google Cloud TTS n'est pas disponible")
        print("Vérifiez que:")
        print("1. google-cloud-texttospeech est installé: pip install google-cloud-texttospeech")
        print("2. GOOGLE_APPLICATION_CREDENTIALS est défini avec le chemin vers votre fichier de clés")
        return 1

    # Supprimer les anciens fichiers invalides
    print("🗑️  Suppression des anciens fichiers...")
    for sound in PINYIN_SOUNDS:
        output_path = OUTPUT_DIR / sound["filename"]
        if output_path.exists():
            output_path.unlink()

    print("\n🎵 Génération des nouveaux fichiers audio...")
    success_count = 0
    errors = []

    for i, sound in enumerate(PINYIN_SOUNDS, 1):
        output_path = OUTPUT_DIR / sound["filename"]

        try:
            print(f"[{i}/{len(PINYIN_SOUNDS)}] {sound['filename']} ({sound['description']}: '{sound['text']}')")

            # Générer l'audio avec un débit de parole légèrement plus lent pour la clarté
            tts_service.generate_audio(
                text=sound['text'],
                output_path=output_path,
                speech_rate=0.85,  # Un peu plus lent pour bien entendre
                voice_name='cmn-CN-Wavenet-A'  # Voix féminine de haute qualité
            )

            # Vérifier que le fichier a bien été créé et n'est pas vide
            if output_path.exists() and output_path.stat().st_size > 10000:
                print(f"    ✓ Généré ({output_path.stat().st_size} octets)")
                success_count += 1
            else:
                print(f"    ✗ Fichier trop petit ou inexistant")
                errors.append(sound['filename'])

        except Exception as e:
            print(f"    ✗ Erreur: {e}")
            errors.append(sound['filename'])

    print(f"\n{'='*60}")
    print(f"✓ Génération terminée: {success_count}/{len(PINYIN_SOUNDS)} fichiers créés")

    if errors:
        print(f"\n⚠️  Erreurs pour les fichiers suivants:")
        for filename in errors:
            print(f"   - {filename}")
        return 1
    else:
        print("\n🎉 Tous les fichiers audio ont été générés avec succès!")
        return 0

if __name__ == "__main__":
    sys.exit(main())
