#!/usr/bin/env python3
"""
Script pour générer audio_jobs.json à partir du fichier TSV
"""

import csv
import json
import re

def extract_new_words_from_tsv(tsv_path):
    """Extrait tous les mots du fichier TSV"""
    words = []

    with open(tsv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter='\t')
        for row in reader:
            simplified = row.get('Simplified', '').strip()
            if simplified:
                # Nettoyer le texte (enlever les espaces)
                simplified = simplified.replace(' ', '')
                words.append(simplified)

    return words

def generate_audio_jobs(words):
    """Génère la liste des jobs audio"""
    jobs = []
    seen = set()

    for word in words:
        if word and word not in seen:
            seen.add(word)
            # Créer le nom du fichier audio
            audio_filename = f"hsk1/hsk1_{word}.wav"
            jobs.append({
                "text": word,
                "audio": audio_filename
            })

    return jobs

def main():
    tsv_path = "anki_mandarin_myway.tsv"
    output_path = "audio_jobs.json"

    print(f"Lecture du fichier TSV: {tsv_path}")
    words = extract_new_words_from_tsv(tsv_path)
    print(f"Nombre de mots trouvés: {len(words)}")

    print("Génération des jobs audio...")
    jobs = generate_audio_jobs(words)
    print(f"Nombre de jobs générés: {len(jobs)}")

    print(f"Écriture du fichier: {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(jobs, f, ensure_ascii=False, indent=2)

    print("Terminé!")
    print(f"\nPour générer les audios, exécutez:")
    print(f"cd xiaolearn_app && .venv/bin/python scripts/audio_cloud_tts.py ../xiaolearn_anki/audio_jobs.json ../xiaolearn_anki/audio --cloud")

if __name__ == "__main__":
    main()
