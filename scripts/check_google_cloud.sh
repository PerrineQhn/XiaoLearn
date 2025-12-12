#!/bin/bash

# Script de vérification de configuration Google Cloud TTS
# Usage: ./scripts/check_google_cloud.sh

echo "════════════════════════════════════════════════════════════════"
echo "🔍 Vérification Configuration Google Cloud TTS"
echo "════════════════════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# Check 1: Module Python
echo "1️⃣  Module Python google-cloud-texttospeech"
if python3 -c "from google.cloud import texttospeech" 2>/dev/null; then
    echo -e "   ${GREEN}✅ Module installé${NC}"
else
    echo -e "   ${RED}❌ Module NON installé${NC}"
    echo "   → Installer avec: pip install --break-system-packages google-cloud-texttospeech"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# Check 2: Environment variable
echo "2️⃣  Variable d'environnement GOOGLE_APPLICATION_CREDENTIALS"
if [ -z "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
    echo -e "   ${RED}❌ Variable NON définie${NC}"
    echo "   → Définir avec:"
    echo "     export GOOGLE_APPLICATION_CREDENTIALS=\"/path/to/your/key.json\""
    ERRORS=$((ERRORS + 1))
else
    echo -e "   ${GREEN}✅ Variable définie${NC}"
    echo "   Chemin: $GOOGLE_APPLICATION_CREDENTIALS"

    # Check 3: File exists
    echo ""
    echo "3️⃣  Fichier de credentials"
    if [ -f "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
        echo -e "   ${GREEN}✅ Fichier existe${NC}"
        echo "   Taille: $(ls -lh "$GOOGLE_APPLICATION_CREDENTIALS" | awk '{print $5}')"

        # Check if it's valid JSON
        if python3 -c "import json; json.load(open('$GOOGLE_APPLICATION_CREDENTIALS'))" 2>/dev/null; then
            echo -e "   ${GREEN}✅ Fichier JSON valide${NC}"

            # Check if it contains required fields
            if python3 -c "import json; data=json.load(open('$GOOGLE_APPLICATION_CREDENTIALS')); assert data.get('type')=='service_account'" 2>/dev/null; then
                echo -e "   ${GREEN}✅ Type: Service Account${NC}"
            else
                echo -e "   ${RED}❌ Type incorrect (doit être 'service_account')${NC}"
                ERRORS=$((ERRORS + 1))
            fi
        else
            echo -e "   ${RED}❌ Fichier JSON invalide ou corrompu${NC}"
            ERRORS=$((ERRORS + 1))
        fi
    else
        echo -e "   ${RED}❌ Fichier n'existe pas${NC}"
        echo "   Chemin: $GOOGLE_APPLICATION_CREDENTIALS"
        ERRORS=$((ERRORS + 1))
    fi
fi
echo ""

# Check 4: Connection test
echo "4️⃣  Test de connexion Google Cloud TTS"
if [ $ERRORS -eq 0 ]; then
    TEST_OUTPUT=$(python3 -c "
from google.cloud import texttospeech
try:
    client = texttospeech.TextToSpeechClient()
    print('SUCCESS')
except Exception as e:
    print(f'ERROR: {e}')
" 2>&1)

    if echo "$TEST_OUTPUT" | grep -q "SUCCESS"; then
        echo -e "   ${GREEN}✅ Connexion réussie !${NC}"
        echo ""
        echo "════════════════════════════════════════════════════════════════"
        echo -e "${GREEN}🎉 CONFIGURATION COMPLÈTE ET FONCTIONNELLE !${NC}"
        echo "════════════════════════════════════════════════════════════════"
        echo ""
        echo "Vous pouvez maintenant générer des fichiers audio avec Google Cloud:"
        echo ""
        echo "  # Test avec 5 fichiers"
        echo "  npm run generate:audio:test"
        echo ""
        echo "  # Génération complète"
        echo "  npm run generate:audio:cloud"
        echo ""
    else
        echo -e "   ${RED}❌ Erreur de connexion${NC}"
        echo "   Détails: $TEST_OUTPUT"
        echo ""
        echo "Causes possibles:"
        echo "  - API Cloud Text-to-Speech pas activée"
        echo "  - Facturation pas activée sur le projet"
        echo "  - Service Account sans le bon rôle"
        echo ""
        echo "Voir: SETUP_GOOGLE_CLOUD_SIMPLE.md"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "   ${YELLOW}⏭️  Test ignoré (erreurs précédentes)${NC}"
fi
echo ""

# Summary
if [ $ERRORS -gt 0 ]; then
    echo "════════════════════════════════════════════════════════════════"
    echo -e "${RED}❌ Configuration INCOMPLÈTE ($ERRORS erreur(s))${NC}"
    echo "════════════════════════════════════════════════════════════════"
    echo ""
    echo "📚 Suivre le guide: SETUP_GOOGLE_CLOUD_SIMPLE.md"
    echo ""
    exit 1
fi

exit 0
