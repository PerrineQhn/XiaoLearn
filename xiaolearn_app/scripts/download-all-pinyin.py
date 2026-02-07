#!/usr/bin/env python3
"""
Script pour télécharger TOUS les fichiers audio pinyin depuis AllSet Learning
Télécharge toutes les syllabes avec les 4 tons
"""

import sys
import os
from pathlib import Path
from urllib.request import urlretrieve
from urllib.error import HTTPError
import time

# Configuration
BASE_URL = "https://resources.allsetlearning.com/pronwiki/resources/pinyin-audio"
OUTPUT_DIR = Path(__file__).parent.parent / "data" / "pinyin"

# Liste exhaustive des syllabes pinyin
INITIALS = ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's']
FINALS = ['a', 'o', 'e', 'i', 'u', 'v', 'ai', 'ei', 'ui', 'ao', 'ou', 'iu', 'ie', 've', 'er',
          'an', 'en', 'in', 'un', 'vn', 'ang', 'eng', 'ing', 'ong']
STANDALONE = ['a', 'o', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng', 'er',
              'yi', 'ya', 'yo', 'ye', 'yai', 'yao', 'you', 'yan', 'yin', 'yang', 'ying', 'yong',
              'wu', 'wa', 'wo', 'wai', 'wei', 'wan', 'wen', 'wang', 'weng',
              'yu', 'yue', 'yuan', 'yun']

TONES = ['1', '2', '3', '4']

def generate_syllables():
    """Génère toutes les combinaisons possibles de syllabes pinyin"""
    syllables = set()

    # Voyelles seules avec tons
    for final in STANDALONE:
        for tone in TONES:
            syllables.add(f"{final}{tone}")

    # Consonnes + voyelles + tons
    for initial in INITIALS:
        for final in FINALS:
            # Certaines combinaisons n'existent pas en chinois
            # mais on laisse l'API décider (404 si inexistant)
            for tone in TONES:
                syllables.add(f"{initial}{final}{tone}")

    return sorted(syllables)

def download_file(filename: str, output_dir: Path) -> bool:
    """Télécharge un fichier audio"""
    url = f"{BASE_URL}/{filename}"
    output_path = output_dir / filename

    # Skip si déjà téléchargé
    if output_path.exists() and output_path.stat().st_size > 1000:
        return True

    try:
        urlretrieve(url, str(output_path))
        # Vérifier que le fichier n'est pas vide
        if output_path.stat().st_size > 1000:
            return True
        else:
            output_path.unlink()
            return False
    except HTTPError as e:
        if e.code == 404:
            return False  # Fichier n'existe pas (combinaison invalide)
        raise
    except Exception:
        return False

def main():
    # Créer le dossier de sortie
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"📥 Téléchargement de TOUS les fichiers audio pinyin")
    print(f"Source: AllSet Learning")
    print(f"Destination: {OUTPUT_DIR}")
    print()

    # Générer toutes les syllabes possibles
    syllables = generate_syllables()
    total = len(syllables)

    print(f"Génération de {total} combinaisons possibles...")
    print("(Seules les combinaisons valides seront téléchargées)\n")

    success = 0
    skipped = 0
    failed = 0

    start_time = time.time()

    for i, syllable in enumerate(syllables, 1):
        filename = f"{syllable}.mp3"

        # Afficher la progression tous les 50 fichiers
        if i % 50 == 0:
            elapsed = time.time() - start_time
            rate = i / elapsed
            eta = (total - i) / rate if rate > 0 else 0
            print(f"[{i}/{total}] {success} téléchargés, {failed} inexistants, {skipped} déjà présents - ETA: {eta:.0f}s")

        # Skip si déjà présent
        output_path = OUTPUT_DIR / filename
        if output_path.exists() and output_path.stat().st_size > 1000:
            skipped += 1
            continue

        # Télécharger
        if download_file(filename, OUTPUT_DIR):
            success += 1
        else:
            failed += 1

        # Petit délai pour ne pas surcharger le serveur
        time.sleep(0.05)

    elapsed = time.time() - start_time

    print()
    print("=" * 60)
    print(f"✓ Téléchargement terminé en {elapsed:.1f}s")
    print(f"  - Téléchargés: {success}")
    print(f"  - Déjà présents: {skipped}")
    print(f"  - Inexistants: {failed}")
    print("=" * 60)

    if success > 0 or skipped > 0:
        print(f"\n🎉 {success + skipped} fichiers audio disponibles dans {OUTPUT_DIR}")
        return 0
    else:
        print("\n❌ Aucun fichier n'a pu être téléchargé")
        return 1

if __name__ == "__main__":
    sys.exit(main())
