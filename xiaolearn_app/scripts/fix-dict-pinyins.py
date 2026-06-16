#!/usr/bin/env python3
"""
fix-dict-pinyins.py
--------------------
Version Python du script de correction des pinyins, avec segmentation par
MOTS via jieba (au lieu de char-by-char). Format de sortie cohérent avec
ce que les humains lisent : "使用" → "shǐyòng" (joint), pas "shǐ yòng".

Pipeline :
  1. jieba.cut() segmente "我使用电脑" → ["我", "使用", "电脑"]
  2. pypinyin convertit chaque segment en pinyin avec tons
  3. Les chars d'un même mot sont collés (shǐyòng), les mots séparés par
     espaces, ponctuation/digits passent à travers
  4. Sandhi tonale appliquée par pypinyin (yī → yí, bù → bú)

Usage :
  python3 scripts/fix-dict-pinyins.py --dry-run
  python3 scripts/fix-dict-pinyins.py --target=examples
  python3 scripts/fix-dict-pinyins.py --target=all --confirm-entries

Cibles :
  examples (défaut) : régénère uniquement les pinyins d'exemples
  entries           : régénère les pinyins d'entrées principales
                      (requiert --confirm-entries en mode réel)
  all               : les deux
"""

import json
import re
import sys
import argparse
import unicodedata
from pathlib import Path
import jieba
from pypinyin import pinyin, Style

PROJECT_ROOT = Path(__file__).resolve().parent.parent
HORS_HSK_DIR = PROJECT_ROOT / "public" / "data" / "hors-hsk"
HSK_DIR = PROJECT_ROOT / "public" / "data" / "dictionary" / "hsk"

CJK_RE = re.compile(r"[一-鿿]")

# Désactive les logs jieba
jieba.setLogLevel(60)


def canonical_pinyin(text: str) -> str:
    """
    Segmente le texte avec jieba puis génère le pinyin canonique :
    - Caractères CJK d'un même mot collés (使用 → shǐyòng)
    - Mots séparés par un espace
    - Ponctuation et non-CJK conservés tels quels
    - Sandhi tonale appliquée
    """
    if not text:
        return ""
    parts = []
    for seg in jieba.lcut(text):
        if CJK_RE.search(seg):
            # Récupère la forme tonale (avec sandhi) char-by-char, puis colle
            syllables = [p[0] for p in pinyin(seg, style=Style.TONE)]
            parts.append("".join(syllables))
        else:
            parts.append(seg)
    # Joindre avec espace, mais éviter doublons d'espaces (jieba peut sortir des espaces vides)
    out = " ".join(parts)
    out = re.sub(r"\s+", " ", out).strip()
    # Décoller la ponctuation collée à un espace : on veut "shǐyòng 。" pas "shǐ yòng。"
    # En fait l'inverse : on veut collée. Mais jieba les sort comme tokens séparés.
    # On rejoint les ponctuations qui suivent un mot pinyin sans espace.
    out = re.sub(r"\s+([，。！？、；：·…—""''（）《》])", r"\1", out)
    out = re.sub(r"([""''（《])\s+", r"\1", out)
    return out


def norm_compare(s: str) -> str:
    """Normalisation pour comparer : sans diacritiques, sans espaces, casse."""
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r"\s+", "", s)
    return s.lower()


def process_entries(entries, target, samples):
    """Traite une liste d'entries et retourne (n_entries_fixed, n_examples_fixed)."""
    n_entries = 0
    n_examples = 0
    for e in entries:
        if not isinstance(e, dict):
            continue
        # Pinyin entrée principale
        hanzi = e.get("hanzi", "")
        if target in ("entries", "all") and hanzi and CJK_RE.search(hanzi):
            canon = canonical_pinyin(hanzi)
            if canon and norm_compare(canon) != norm_compare(e.get("pinyin", "")):
                if len(samples) < 8:
                    samples.append(
                        {
                            "kind": "entry",
                            "hanzi": hanzi,
                            "old": e.get("pinyin", ""),
                            "new": canon,
                        }
                    )
                e["pinyin"] = canon
                n_entries += 1
        # Pinyins examples
        if target in ("examples", "all"):
            for ex in e.get("examples", []) or []:
                ch = ex.get("chinese", "")
                if not ch or not CJK_RE.search(ch):
                    continue
                canon = canonical_pinyin(ch)
                if not canon:
                    continue
                if norm_compare(canon) == norm_compare(ex.get("pinyin", "")):
                    continue
                if len(samples) < 8:
                    samples.append(
                        {
                            "kind": "example",
                            "chinese": ch[:60],
                            "old": ex.get("pinyin", "")[:80],
                            "new": canon[:80],
                        }
                    )
                ex["pinyin"] = canon
                n_examples += 1
    return n_entries, n_examples


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument(
        "--target",
        choices=["entries", "examples", "all"],
        default="examples",
        help="Quel pinyin régénérer",
    )
    parser.add_argument(
        "--confirm-entries",
        action="store_true",
        help="Confirme l'écrasement des pinyins d'entrées (risque sur lectures rares)",
    )
    args = parser.parse_args()

    if args.target in ("entries", "all") and not args.confirm_entries and not args.dry_run:
        print(
            f"❌ --target={args.target} : ajoute --confirm-entries pour confirmer\n"
            f"   (les lectures rares peuvent être écrasées). Ou utilise --dry-run.",
            file=sys.stderr,
        )
        sys.exit(2)

    print(f"🔧 Fix pinyins (Python + jieba){'  · DRY-RUN' if args.dry_run else ''}")
    print(f"   Cible : {args.target}")
    print()

    total_entries = 0
    total_examples = 0
    samples = []

    # Hors-HSK : array de dict
    print("📖 Hors-HSK")
    horshsk_chunks = sorted(HORS_HSK_DIR.glob("chunk-*.json"))
    for c in horshsk_chunks:
        data = json.loads(c.read_text())
        n_e, n_x = process_entries(data, args.target, samples)
        if not args.dry_run and (n_e > 0 or n_x > 0):
            c.write_text(json.dumps(data, ensure_ascii=False))
        if n_e > 0 or n_x > 0:
            print(f"   {c.name}: {n_e} entrée(s), {n_x} exemple(s)")
        total_entries += n_e
        total_examples += n_x

    # HSK : map { id: entry }
    for lvl in ["hsk1", "hsk2", "hsk3", "hsk4", "hsk5", "hsk6", "hsk7"]:
        lvl_dir = HSK_DIR / lvl
        if not lvl_dir.exists():
            continue
        print(f"📚 {lvl}")
        for c in sorted(lvl_dir.glob("chunk-*.json")):
            data = json.loads(c.read_text())
            entries = list(data.values())
            n_e, n_x = process_entries(entries, args.target, samples)
            if not args.dry_run and (n_e > 0 or n_x > 0):
                # data est déjà modifié in-place puisque c'est les mêmes refs
                c.write_text(json.dumps(data, ensure_ascii=False))
            if n_e > 0 or n_x > 0:
                print(f"   {c.name}: {n_e} entrée(s), {n_x} exemple(s)")
            total_entries += n_e
            total_examples += n_x

    print()
    print("Résumé :")
    print(f"  Entrées corrigées : {total_entries}")
    print(f"  Exemples corrigés : {total_examples}")
    print()
    if samples:
        print("Exemples de modifications :")
        for s in samples:
            label = s["hanzi"] if s["kind"] == "entry" else s["chinese"]
            print(f"  [{s['kind']}] {label}")
            print(f"    avant : {s['old']}")
            print(f"    après : {s['new']}")


if __name__ == "__main__":
    main()
