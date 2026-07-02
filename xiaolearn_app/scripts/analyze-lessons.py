#!/usr/bin/env python3
"""Analyse les leçons pour trouver celles avec des flashcards génériques."""

import re
from pathlib import Path

def analyze_lessons():
    lesson_file = Path('src/data/lesson-paths.ts')
    content = lesson_file.read_text()

    # Trouver toutes les leçons avec flashcards génériques
    pattern = r"id: '([^']+)',\s+title: '([^']+)',\s+titleEn: '([^']+)'.*?flashcards: \['的', '一', '是', '了'\]"
    matches = re.findall(pattern, content, re.DOTALL)

    print(f"📋 RAPPORT D'ANALYSE DES LEÇONS")
    print(f"{'='*80}")
    print(f"Total de leçons avec flashcards génériques: {len(matches)}\n")

    for i, (lesson_id, title_fr, title_en) in enumerate(matches, 1):
        print(f"{i:2d}. {lesson_id:40s} | {title_fr:30s} | {title_en}")

    print(f"\n{'='*80}")
    print(f"Ces leçons utilisent ['的', '一', '是', '了'] au lieu du contenu approprié.")

if __name__ == '__main__':
    analyze_lessons()
