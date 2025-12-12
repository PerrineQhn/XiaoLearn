#!/usr/bin/env python3
"""
Script pour générer les fichiers audio manquants dans les leçons
Utilise Google Cloud TTS via le script audio_cloud_tts.py existant
"""

import json
import sys
from pathlib import Path
from typing import List, Dict, Set
import re

# Chemins
PROJECT_ROOT = Path(__file__).parent.parent
AUDIO_DIR = PROJECT_ROOT / 'public' / 'audio'
DATA_DIR = PROJECT_ROOT / 'src' / 'data'

def extract_audio_from_ts_file(file_path: Path) -> Set[Dict[str, str]]:
    """
    Extrait les chemins d'audio et le texte chinois des fichiers TypeScript
    Returns: Set of tuples (audio_path, chinese_text)
    """
    audio_entries = []

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern pour les fichiers audio avec le texte correspondant
    # Cherche: audio: 'audio/...' suivi du texte chinois
    audio_pattern = r"audio:\s*['\"]([^'\"]+)['\"]"

    # Cherche tous les chemins audio
    audio_matches = re.finditer(audio_pattern, content)

    for match in audio_matches:
        audio_path = match.group(1)

        # Essaye de trouver le texte chinois associé
        # Cherche avant et après la ligne audio
        start_pos = max(0, match.start() - 500)
        end_pos = min(len(content), match.end() + 500)
        context = content[start_pos:end_pos]

        # Pattern pour trouver du texte chinois
        chinese_pattern = r'[\u4e00-\u9fff]+'
        chinese_matches = re.findall(chinese_pattern, context)

        if chinese_matches:
            # Prend le match chinois le plus proche
            chinese_text = chinese_matches[0]
            audio_entries.append({
                'audio': audio_path,
                'text': chinese_text
            })

    return audio_entries

def find_all_audio_references() -> List[Dict[str, str]]:
    """Trouve toutes les références audio dans les fichiers de données"""
    all_audios = []

    # Scanner tous les fichiers .ts dans src/data
    ts_files = list(DATA_DIR.glob('**/*.ts'))

    print(f"📁 Scanning {len(ts_files)} TypeScript files...")

    for ts_file in ts_files:
        try:
            entries = extract_audio_from_ts_file(ts_file)
            all_audios.extend(entries)
            if entries:
                print(f"  ✓ {ts_file.name}: found {len(entries)} audio references")
        except Exception as e:
            print(f"  ⚠️  Error reading {ts_file.name}: {e}")

    return all_audios

def check_missing_files(audio_references: List[Dict[str, str]]) -> List[Dict[str, str]]:
    """Vérifie quels fichiers audio sont manquants"""
    missing = []

    for ref in audio_references:
        audio_path = PROJECT_ROOT / 'public' / ref['audio']

        if not audio_path.exists():
            missing.append(ref)

    return missing

def create_jobs_file(missing_audios: List[Dict[str, str]], output_path: Path):
    """Crée un fichier JSON pour le script audio_cloud_tts.py"""
    jobs = []

    for audio_ref in missing_audios:
        jobs.append({
            'text': audio_ref['text'],
            'audio': audio_ref['audio']
        })

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(jobs, f, ensure_ascii=False, indent=2)

    print(f"\n📝 Created jobs file: {output_path}")
    print(f"   {len(jobs)} audio files to generate")

def main():
    print("🎵 AUDIO GENERATION - FINDING MISSING FILES\n")
    print("="*60)

    # 1. Trouve toutes les références audio
    print("\n1️⃣  Finding all audio references in data files...")
    audio_references = find_all_audio_references()
    print(f"\n   Total audio references found: {len(audio_references)}")

    # 2. Vérifie les fichiers manquants
    print("\n2️⃣  Checking which audio files are missing...")
    missing = check_missing_files(audio_references)

    print(f"\n   Missing audio files: {len(missing)}")

    if not missing:
        print("\n✨ All audio files exist! Nothing to generate.")
        return

    # Affiche les fichiers manquants
    print("\n📋 Missing files:")
    for i, ref in enumerate(missing[:10], 1):  # Affiche les 10 premiers
        print(f"   {i}. {ref['audio']} - '{ref['text']}'")
    if len(missing) > 10:
        print(f"   ... and {len(missing) - 10} more")

    # 3. Crée le fichier de jobs
    jobs_file = Path('scripts/missing-audio-jobs.json')
    create_jobs_file(missing, jobs_file)

    # 4. Instructions
    print("\n" + "="*60)
    print("📌 NEXT STEPS:")
    print("\nTo generate the missing audio files, run:")
    print(f"\n   cd scripts")
    print(f"   python audio_cloud_tts.py missing-audio-jobs.json ../public/audio --cloud")
    print("\n" + "="*60)

    return jobs_file

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
