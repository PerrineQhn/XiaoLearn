#!/usr/bin/env python3
"""
Génère public/data/hors-hsk-index.json : version allégée des entries hors-HSK
pour la recherche unifiée côté front. Ne garde que les champs nécessaires :
id, level, hanzi, pinyin, translationFr, translationEn, tags (pour search).
~109K entrées x ~150B = ~15 MB (vs 79 MB pour le complet).

Usage : python3 scripts/build-hors-hsk-search-index.py
"""
import json
import os

SRC = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'hors-hsk.json')
DST = os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'hors-hsk-index.json')

print(f"Loading {SRC}…")
with open(SRC, 'r', encoding='utf-8') as f:
    data = json.load(f)
print(f"  {len(data)} entries.")

print("Building lightweight index…")
index = [
    {
        'id': e['id'],
        'level': e.get('level', 'hors-hsk'),
        'hanzi': e['hanzi'],
        'pinyin': e.get('pinyin', ''),
        'translationFr': e.get('translationFr', ''),
        'translationEn': e.get('translationEn', ''),
        'tags': e.get('tags', []),
    }
    for e in data
]

print(f"Writing {DST}…")
os.makedirs(os.path.dirname(DST), exist_ok=True)
with open(DST, 'w', encoding='utf-8') as f:
    # ensure_ascii=False pour ne pas exploser la taille avec \uXXXX
    json.dump(index, f, ensure_ascii=False, separators=(',', ':'))

size_mb = os.path.getsize(DST) / 1024 / 1024
print(f"  Done — {size_mb:.1f} MB ({len(index)} entries).")
