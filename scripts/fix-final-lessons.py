#!/usr/bin/env python3
"""Corrige les 6 dernières leçons restantes."""

from pathlib import Path

# Les 6 dernières leçons à corriger
FINAL_LESSONS = {
    'phrases-1-greetings': "['你好', '早', '晚上好', '再见', '您', '谢谢']",
    'phrases-12-daily-actions': "['起床', '睡觉', '工作', '学习', '吃饭', '休息']",
    'grammar-3-adjectives': "['很', '好', '大', '小', '高', '矮', '多', '少']",
    'grammar-7-measure-words': "['个', '本', '杯', '张', '只', '条']",
    'vocab-2-animals': "['猫', '狗', '鸟', '鱼', '马', '牛']",
    'grammar2-5-progressive': "['在', '正在', '呢', '着']",
}

def fix_final_lessons():
    file_path = Path('src/data/lesson-paths.ts')
    lines = file_path.read_text().splitlines(keepends=True)

    current_lesson_id = None
    corrections = 0

    for i, line in enumerate(lines):
        # Détecter l'ID de la leçon
        if "id: '" in line:
            import re
            match = re.search(r"id: '([^']+)'", line)
            if match:
                current_lesson_id = match.group(1)

        # Si on a un ID actif et qu'on trouve les flashcards génériques
        if current_lesson_id and current_lesson_id in FINAL_LESSONS:
            if "flashcards: ['的', '一', '是', '了']" in line:
                # Remplacer
                new_flashcards = FINAL_LESSONS[current_lesson_id]
                lines[i] = line.replace(
                    "flashcards: ['的', '一', '是', '了']",
                    f"flashcards: {new_flashcards}"
                )
                print(f"✅ Corrigé: {current_lesson_id}")
                corrections += 1
                current_lesson_id = None

    # Écrire le fichier
    file_path.write_text(''.join(lines))

    print(f"\n{'='*80}")
    print(f"✅ Total de corrections: {corrections}")
    print(f"📝 Fichier mis à jour: {file_path}")

    # Vérifier ce qui reste
    remaining = ''.join(lines).count("flashcards: ['的', '一', '是', '了']")
    if remaining > 0:
        print(f"⚠️  Il reste {remaining} leçons avec flashcards génériques")
    else:
        print(f"🎉 TOUTES LES LEÇONS ONT ÉTÉ CORRIGÉES!")

if __name__ == '__main__':
    fix_final_lessons()
