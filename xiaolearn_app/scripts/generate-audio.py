#!/usr/bin/env python3
"""
Script pour générer automatiquement les fichiers audio des caractères chinois
Utilise Edge TTS (gratuit) pour la synthèse vocale en mandarin

Installation requise :
pip install edge-tts

Usage :
python scripts/generate-audio.py
"""

import asyncio
import os
import edge_tts
from pathlib import Path

# Configuration
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "audio" / "grammar"
VOICE = "zh-CN-XiaoxiaoNeural"  # Voix féminine naturelle

# Autres voix disponibles :
# - zh-CN-XiaoxiaoNeural (femme, naturelle) - RECOMMANDÉ
# - zh-CN-XiaoyiNeural (femme, jeune)
# - zh-CN-YunjianNeural (homme, jeune)
# - zh-CN-YunxiNeural (homme, naturel)
# - zh-CN-YunyangNeural (homme, professionnel)

# Liste des caractères à générer
GRAMMAR_WORDS = [
    {"hanzi": "不", "pinyin": "bù", "filename": "bu.mp3"},
    {"hanzi": "没", "pinyin": "méi", "filename": "mei.mp3"},
    {"hanzi": "的", "pinyin": "de", "filename": "de.mp3"},
    {"hanzi": "吗", "pinyin": "ma", "filename": "ma.mp3"},
    {"hanzi": "在", "pinyin": "zài", "filename": "zai.mp3"},
    {"hanzi": "了", "pinyin": "le", "filename": "le.mp3"},
    {"hanzi": "比", "pinyin": "bǐ", "filename": "bi.mp3"},
    {"hanzi": "因为", "pinyin": "yīnwèi", "filename": "yinwei.mp3"},
    {"hanzi": "所以", "pinyin": "suǒyǐ", "filename": "suoyi.mp3"},
    {"hanzi": "因为所以", "pinyin": "yīnwèi suǒyǐ", "filename": "yinwei-suoyi.mp3"},
    {"hanzi": "会", "pinyin": "huì", "filename": "hui.mp3"},
]

# Phrases d'exemple pour tester la prononciation
EXAMPLE_PHRASES = [
    {"hanzi": "我不喜欢咖啡", "filename": "example-bu.mp3"},
    {"hanzi": "我没吃饭", "filename": "example-mei.mp3"},
    {"hanzi": "我的书", "filename": "example-de.mp3"},
    {"hanzi": "你好吗", "filename": "example-ma.mp3"},
    {"hanzi": "我在家", "filename": "example-zai.mp3"},
    {"hanzi": "我吃了饭", "filename": "example-le.mp3"},
    {"hanzi": "我比他高", "filename": "example-bi.mp3"},
    {"hanzi": "因为下雨，所以我不去", "filename": "example-yinwei-suoyi.mp3"},
    {"hanzi": "我会说中文", "filename": "example-hui.mp3"},
]


async def generate_audio(text: str, output_path: Path) -> bool:
    """Génère un fichier audio à partir du texte chinois"""

    # Si le fichier existe déjà, on le saute
    if output_path.exists():
        print(f"⏭  Existe déjà : {output_path.name}")
        return True

    try:
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(str(output_path))
        print(f"✓ Généré : {output_path.name} ({text})")
        return True
    except Exception as e:
        print(f"❌ Erreur pour {output_path.name}: {e}")
        return False


async def main():
    """Fonction principale"""
    print("🎵 Générateur d'audio pour les points de grammaire\n")

    # Créer le dossier de sortie
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"✓ Dossier : {OUTPUT_DIR}\n")

    # Générer les audios des caractères
    print("📝 Génération des caractères de grammaire...")
    success_count = 0
    error_count = 0

    for word in GRAMMAR_WORDS:
        output_path = OUTPUT_DIR / word["filename"]
        success = await generate_audio(word["hanzi"], output_path)
        if success:
            success_count += 1
        else:
            error_count += 1
        # Petit délai pour ne pas surcharger l'API
        await asyncio.sleep(0.3)

    # Optionnel : Générer les phrases d'exemple
    print("\n📚 Génération des phrases d'exemple (optionnel)...")
    for phrase in EXAMPLE_PHRASES:
        output_path = OUTPUT_DIR / phrase["filename"]
        await generate_audio(phrase["hanzi"], output_path)
        await asyncio.sleep(0.3)

    # Résumé
    print("\n" + "=" * 50)
    print(f"✓ Succès : {success_count}/{len(GRAMMAR_WORDS)}")
    if error_count > 0:
        print(f"❌ Erreurs : {error_count}")
    print("=" * 50)
    print(f"\n📁 Fichiers générés dans : {OUTPUT_DIR}")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n\n⚠️  Génération interrompue par l'utilisateur")
    except Exception as e:
        print(f"\n❌ Erreur : {e}")
        print("\nVérifiez que edge-tts est installé : pip install edge-tts")
