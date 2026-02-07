#!/bin/bash
# Script pour télécharger les fichiers audio pinyin depuis GitHub

REPO_URL="https://raw.githubusercontent.com/yogurt-cultures/mp3-chinese-pinyin-sound/master/mp3"
OUTPUT_DIR="../public/audio/pinyin"

echo "📥 Téléchargement des fichiers audio pinyin depuis GitHub..."
echo "Repository: mp3-chinese-pinyin-sound"
echo "Destination: $OUTPUT_DIR"
echo ""

# Créer le dossier de destination
mkdir -p "$OUTPUT_DIR"

# Liste des fichiers à télécharger
declare -a files=(
    # Voyelles
    "a.mp3"
    "o.mp3"
    "e.mp3"
    "i.mp3"
    "u.mp3"
    "v.mp3"  # ü

    # Consonnes initiales
    "b.mp3"
    "p.mp3"
    "m.mp3"
    "f.mp3"
    "d.mp3"
    "t.mp3"
    "n.mp3"
    "l.mp3"
    "g.mp3"
    "k.mp3"
    "h.mp3"
    "j.mp3"
    "q.mp3"
    "x.mp3"

    # Rétroflexes et affriquées
    "zh.mp3"
    "ch.mp3"
    "sh.mp3"
    "r.mp3"
    "z.mp3"
    "c.mp3"
    "s.mp3"
)

success=0
failed=0

for file in "${files[@]}"; do
    url="$REPO_URL/$file"
    output="$OUTPUT_DIR/${file%.mp3}.wav"  # Renommer en .wav

    echo -n "Téléchargement de $file... "

    if curl -f -s -o "$output" "$url" 2>/dev/null; then
        size=$(du -h "$output" | cut -f1)
        echo "✓ OK ($size)"
        ((success++))
    else
        echo "✗ ÉCHEC"
        ((failed++))
        # Essayer avec l'extension .wav directement
        url_wav="${url%.mp3}.wav"
        echo -n "  Essai avec .wav... "
        if curl -f -s -o "$output" "$url_wav" 2>/dev/null; then
            size=$(du -h "$output" | cut -f1)
            echo "✓ OK ($size)"
            ((success++))
            ((failed--))
        else
            echo "✗ ÉCHEC"
        fi
    fi
done

echo ""
echo "=========================================="
echo "✓ Téléchargés: $success"
echo "✗ Échecs: $failed"
echo "=========================================="

if [ $success -gt 0 ]; then
    echo "🎉 Fichiers audio téléchargés avec succès!"
    exit 0
else
    echo "❌ Aucun fichier n'a pu être téléchargé"
    exit 1
fi
