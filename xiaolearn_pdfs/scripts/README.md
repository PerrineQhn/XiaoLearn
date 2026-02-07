# remove_background.py

Script pour enlever l'arrière-plan localement sans détériorer la qualité visuelle.

Installation
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r scripts/requirements.txt
```

Usage
```bash
# traiter un dossier entier -> sortie dans out/
python3 scripts/remove_background.py -i images/ -o out/

# traiter un seul fichier et garder transparence
python3 scripts/remove_background.py -i images/photo.jpg -o out/photo.png

# composer sur fond blanc et sortir en JPG
python3 scripts/remove_background.py -i images/photo.jpg -o out/photo.jpg -c "#ffffff" -f jpg
```

Notes
- Le script préserve la résolution et la plupart des métadonnées EXIF/DPI lorsque possible.
- Par défaut la sortie sans composition est PNG (transparence conservée).
- Pour une intégration plus poussée (GPU/accélération), installez les dépendances optionnelles de `rembg` selon la documentation upstream.
