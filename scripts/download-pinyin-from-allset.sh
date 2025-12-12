#!/bin/bash
# Script pour télécharger les fichiers audio pinyin depuis AllSet Learning

BASE_URL="https://resources.allsetlearning.com/pronwiki/resources/pinyin-audio"
OUTPUT_DIR="../public/audio/pinyin"

echo "📥 Téléchargement des fichiers audio pinyin depuis AllSet Learning..."
echo "Source: resources.allsetlearning.com"
echo "Destination: $OUTPUT_DIR"
echo ""

# Créer le dossier de destination
mkdir -p "$OUTPUT_DIR"

# Supprimer les anciens fichiers invalides
echo "🗑️  Nettoyage des anciens fichiers..."
rm -f "$OUTPUT_DIR"/*.mp3 "$OUTPUT_DIR"/*.wav 2>/dev/null

success=0
failed=0

# Fonction pour télécharger un fichier
download_file() {
    local local_name="$1"
    local remote_name="$2"
    local url="$BASE_URL/$remote_name"
    local output="$OUTPUT_DIR/$local_name"

    echo -n "[$((success + failed + 1))] $local_name ($remote_name)... "

    if curl -f -s -o "$output" "$url" 2>/dev/null; then
        # Vérifier que le fichier n'est pas vide
        local size=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null)
        if [ -s "$output" ] && [ "$size" -gt 1000 ]; then
            local size_human=$(du -h "$output" | cut -f1)
            echo "✓ OK ($size_human)"
            ((success++))
            return 0
        else
            echo "✗ Fichier vide"
            rm -f "$output"
            ((failed++))
            return 1
        fi
    else
        echo "✗ ÉCHEC"
        ((failed++))
        return 1
    fi
}

# Voyelles (ton 1 - haut et plat)
download_file "a.mp3" "a1.mp3"
download_file "o.mp3" "o1.mp3"
download_file "e.mp3" "e1.mp3"
download_file "i.mp3" "yi1.mp3"      # i seul s'écrit "yi" en pinyin complet
download_file "u.mp3" "wu1.mp3"      # u seul s'écrit "wu" en pinyin complet
download_file "v.mp3" "yu1.mp3"      # ü seul s'écrit "yu" en pinyin complet

# Consonnes initiales avec voyelle (ton 1)
download_file "b.mp3" "bo1.mp3"
download_file "p.mp3" "po1.mp3"
download_file "m.mp3" "mo1.mp3"
download_file "f.mp3" "fo1.mp3"
download_file "d.mp3" "de1.mp3"
download_file "t.mp3" "te1.mp3"
download_file "n.mp3" "ne1.mp3"
download_file "l.mp3" "le1.mp3"
download_file "g.mp3" "ge1.mp3"
download_file "k.mp3" "ke1.mp3"
download_file "h.mp3" "he1.mp3"
download_file "j.mp3" "ji1.mp3"
download_file "q.mp3" "qi1.mp3"
download_file "x.mp3" "xi1.mp3"

# Rétroflexes et affriquées
download_file "zh.mp3" "zhe1.mp3"
download_file "ch.mp3" "che1.mp3"
download_file "sh.mp3" "she1.mp3"
download_file "r.mp3" "re1.mp3"
download_file "z.mp3" "ze1.mp3"
download_file "c.mp3" "ce1.mp3"
download_file "s.mp3" "se1.mp3"

echo ""
echo "=========================================="
echo "✓ Téléchargés: $success"
echo "✗ Échecs: $failed"
echo "=========================================="

if [ $success -gt 0 ]; then
    echo ""
    echo "🎉 $success fichiers audio téléchargés avec succès!"
    echo ""
    echo "Note: Les fichiers sont au format MP3."
    echo "Les navigateurs modernes peuvent les lire directement."
    exit 0
else
    echo ""
    echo "❌ Aucun fichier n'a pu être téléchargé"
    exit 1
fi
