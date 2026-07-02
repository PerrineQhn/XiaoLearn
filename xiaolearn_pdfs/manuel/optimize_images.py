#!/usr/bin/env python3
"""
Script d'optimisation des images pour le dictionnaire visuel
- Redimensionne les images à 512x512px max
- Améliore la netteté
- Optimise la compression PNG
- Crée des backups avant modification
"""

import os
import sys
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter

# Configuration
TARGET_SIZE = 512  # Taille maximale en pixels
MAX_FILE_SIZE_KB = 80  # Taille cible en KB
QUALITY_START = 95  # Qualité PNG initiale
BACKUP_DIR = "images_backup"

def optimize_image(image_path):
    """Optimise une seule image"""
    try:
        # Ouvre l'image
        img = Image.open(image_path)
        original_size = os.path.getsize(image_path) / 1024  # en KB

        # Récupère les dimensions
        width, height = img.size

        # Calcule la nouvelle taille en gardant les proportions
        if width > TARGET_SIZE or height > TARGET_SIZE:
            if width > height:
                new_width = TARGET_SIZE
                new_height = int(height * (TARGET_SIZE / width))
            else:
                new_height = TARGET_SIZE
                new_width = int(width * (TARGET_SIZE / height))

            # Redimensionne avec un filtre de haute qualité
            img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

        # Améliore la netteté (anti-flou)
        img = img.filter(ImageFilter.UnsharpMask(radius=1, percent=150, threshold=3))

        # Améliore légèrement le contraste
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.1)

        # Convertit en mode RGBA si nécessaire (pour PNG transparent)
        if img.mode not in ('RGBA', 'RGB'):
            if img.mode == 'P' and 'transparency' in img.info:
                img = img.convert('RGBA')
            else:
                img = img.convert('RGB')

        # Sauvegarde avec optimisation
        img.save(image_path, 'PNG', optimize=True, quality=QUALITY_START)

        new_size = os.path.getsize(image_path) / 1024  # en KB

        # Affiche les résultats
        reduction = ((original_size - new_size) / original_size) * 100 if original_size > 0 else 0
        status = "✓" if new_size < MAX_FILE_SIZE_KB else "⚠"
        print(f"{status} {Path(image_path).name}: {original_size:.1f}KB → {new_size:.1f}KB ({reduction:.1f}% réduit)")

        return True

    except Exception as e:
        print(f"✗ Erreur avec {Path(image_path).name}: {str(e)}")
        return False

def create_backup(source_dir):
    """Crée une copie de sauvegarde des images"""
    import shutil
    backup_path = Path(source_dir).parent / BACKUP_DIR

    if backup_path.exists():
        print(f"⚠ Le dossier de backup existe déjà: {backup_path}")
        response = input("Voulez-vous l'écraser? (o/N): ")
        if response.lower() != 'o':
            print("Backup annulé.")
            return None
        shutil.rmtree(backup_path)

    shutil.copytree(source_dir, backup_path)
    print(f"✓ Backup créé: {backup_path}\n")
    return backup_path

def main():
    # Dossier contenant les images
    script_dir = Path(__file__).parent
    images_dir = script_dir / "images"

    if not images_dir.exists():
        print(f"✗ Dossier images introuvable: {images_dir}")
        sys.exit(1)

    print("=" * 70)
    print("OPTIMISATION DES IMAGES - Dictionnaire Visuel Mandarin")
    print("=" * 70)
    print(f"Dossier: {images_dir}")
    print(f"Taille cible: {TARGET_SIZE}x{TARGET_SIZE}px max")
    print(f"Poids cible: < {MAX_FILE_SIZE_KB}KB\n")

    # Crée un backup
    backup_path = create_backup(images_dir)
    if backup_path is None:
        print("Optimisation annulée.")
        sys.exit(0)

    # Trouve toutes les images PNG
    image_files = list(images_dir.rglob("*.png"))

    if not image_files:
        print("✗ Aucune image PNG trouvée.")
        sys.exit(1)

    print(f"Nombre d'images trouvées: {len(image_files)}\n")

    # Optimise chaque image
    success_count = 0
    for image_path in image_files:
        if optimize_image(image_path):
            success_count += 1

    print("\n" + "=" * 70)
    print(f"TERMINÉ: {success_count}/{len(image_files)} images optimisées avec succès")
    print("=" * 70)
    print(f"\n💾 Backup sauvegardé dans: {backup_path}")
    print("\nSi tout est OK, vous pouvez supprimer le dossier de backup.")

if __name__ == "__main__":
    main()
