#!/usr/bin/env python3
"""
Expand duplicate Meaning entries in the TSV using a local Ollama model.
"""

import argparse
import csv
import json
import os
import re
import sys
import time
import urllib.request
from collections import Counter
from typing import Dict, List, Optional


def load_cache(path: str) -> Dict[str, str]:
    if not path or not os.path.exists(path):
        return {}
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, dict):
            return {str(k): str(v) for k, v in data.items()}
    except Exception:
        pass
    return {}


def save_cache(path: str, cache: Dict[str, str]) -> None:
    if not path:
        return
    tmp_path = f"{path}.tmp"
    with open(tmp_path, "w", encoding="utf-8") as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)
    os.replace(tmp_path, path)


def parse_json_array(text: str) -> Optional[List[str]]:
    text = text.strip()
    try:
        data = json.loads(text)
        if isinstance(data, list):
            return [str(x) for x in data]
    except Exception:
        pass
    start = text.find("[")
    end = text.rfind("]")
    if start != -1 and end != -1 and end > start:
        try:
            data = json.loads(text[start : end + 1])
            if isinstance(data, list):
                return [str(x) for x in data]
        except Exception:
            return None
    return None


def clean_output(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == '"' and value[-1] == '"':
        value = value[1:-1].strip()
    if value.startswith('[') and value.endswith(']'):
        try:
            data = json.loads(value)
            if isinstance(data, list) and data and isinstance(data[0], str):
                value = data[0].strip()
        except Exception:
            pass
    value = " ".join(value.split())
    # remove trailing period if it's the only ending punctuation
    if value.endswith('.') and not value.endswith('..'):
        value = value[:-1].strip()
    return value


def ollama_generate(host: str, model: str, prompt: str, system: str, temperature: float) -> str:
    url = host.rstrip("/") + "/api/generate"
    payload = {
        "model": model,
        "prompt": prompt,
        "system": system,
        "stream": False,
        "keep_alive": "10m",
        "options": {"temperature": temperature},
    }
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req) as resp:
        body = resp.read()
    result = json.loads(body)
    return result.get("response", "")


def expand_batch(host: str, model: str, items: List[dict], temperature: float) -> List[str]:
    system = (
        "Tu es lexicographe. Tu rédiges des notes d'usage en français pour distinguer "
        "des mots chinois qui partagent la même traduction."
    )
    prompt = (
        "Retourne un tableau JSON de chaînes (notes d'usage), dans le même ordre que l'entrée. "
        "1–2 phrases courtes, 10–22 mots. N'inclus pas la traduction française elle-même. "
        "Utilise les tags, l'exemple et les autres variantes pour préciser l'usage. "
        "Pas de texte supplémentaire.\n"
        f"Entrée: {json.dumps(items, ensure_ascii=False)}"
    )
    response = ollama_generate(host, model, prompt, system, temperature)
    parsed = parse_json_array(response)
    if parsed is not None and len(parsed) == len(items):
        return [clean_output(x) for x in parsed]

    # Fallback: try line-based parsing
    lines = [ln.strip() for ln in response.splitlines() if ln.strip()]
    if len(lines) == len(items):
        cleaned = []
        for ln in lines:
            ln = re.sub(r"^\s*\d+[\).\-:]\s*", "", ln)
            cleaned.append(clean_output(ln))
        return cleaned

    # Final fallback: one by one
    results = []
    for item in items:
        single_prompt = (
            "Écris une note d'usage en français (1–2 phrases courtes, 10–22 mots) "
            "pour distinguer ce mot des autres ayant la même traduction. "
            "N'inclus pas la traduction française. Pas de guillemets.\n"
            f"Entrée: {json.dumps(item, ensure_ascii=False)}"
        )
        single_response = ollama_generate(host, model, single_prompt, system, temperature)
        results.append(clean_output(single_response))
    return results


def normalize_prefix(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip().lower())


def build_full_meaning(base: str, note: str) -> str:
    base = base.strip()
    note = note.strip()
    if not base:
        return note
    if not note:
        return base
    return f"{base}<br>{note}"


def cleanup_meaning(meaning: str) -> str:
    text = meaning.strip()
    # Unwrap embedded JSON array inside parentheses: (["..."])
    text = re.sub(r"\(\s*\[\"(.+?)\"\]\s*\)", r"(\1)", text)
    # If parentheses repeat the base meaning, drop them.
    if " (" in text and text.endswith(")"):
        base, extra = text.split(" (", 1)
        extra = extra[:-1].strip()
        if normalize_prefix(extra) == normalize_prefix(base):
            return base.strip()
    return text


def extract_first_example(examples: str) -> str:
    if not examples:
        return ""
    first = examples.split("<br>")[0].strip()
    if not first:
        return ""
    if first.startswith("(HSK") and ")" in first:
        first = first.split(")", 1)[1].strip()
    if " - " in first:
        first = first.split(" - ", 1)[0].strip()
    return first


def split_meaning(meaning: str) -> str:
    if not meaning:
        return ""
    return meaning.split("<br>", 1)[0].strip()


def main() -> int:
    parser = argparse.ArgumentParser(description="Expand duplicate meanings in TSV using Ollama.")
    parser.add_argument("--input", default="anki_mandarin_myway.tsv", help="Input TSV path")
    parser.add_argument("--output", default=None, help="Output TSV path (default: overwrite input)")
    parser.add_argument("--model", default="qwen2.5:7b", help="Ollama model name")
    parser.add_argument("--batch-size", type=int, default=12, help="Batch size")
    parser.add_argument("--cache", default="meaning_expansion_cache_fr.json", help="JSON cache path")
    parser.add_argument("--host", default=os.environ.get("OLLAMA_HOST", "http://127.0.0.1:11434"))
    parser.add_argument("--temperature", type=float, default=0.0, help="Sampling temperature")
    parser.add_argument("--max", type=int, default=0, help="Max rows to process (0 = all)")
    parser.add_argument("--refine", action="store_true", help="Refine remaining duplicate meanings")
    parser.add_argument("--overwrite", action="store_true", help="Overwrite meanings even if already explained")
    args = parser.parse_args()

    input_path = args.input
    output_path = args.output or args.input
    cache_path = args.cache

    if not os.path.exists(input_path):
        print(f"Input file not found: {input_path}", file=sys.stderr)
        return 1

    csv.field_size_limit(sys.maxsize)
    with open(input_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter="\t")
        raw_fieldnames = reader.fieldnames or []
        fieldnames = [name.strip() for name in raw_fieldnames]
        rows = []
        for raw_row in reader:
            row = {}
            for key, value in raw_row.items():
                if key is None:
                    continue
                norm_key = key.strip()
                if isinstance(value, str):
                    value = value.strip()
                row[norm_key] = value
            rows.append(row)

    for row in rows:
        if row.get("Meaning"):
            row["Meaning"] = cleanup_meaning(row["Meaning"])

    base_meanings = []
    for row in rows:
        base = split_meaning(row.get("Meaning", ""))
        row["_base_meaning"] = base
        base_meanings.append(base)

    counts = Counter(m for m in base_meanings if m)
    duplicate_ids = set()
    if args.refine:
        base_to_simplified: Dict[str, set] = {}
        for row in rows:
            base = row.get("_base_meaning", "")
            if not base:
                continue
            base_to_simplified.setdefault(base, set()).add(row.get("Simplified"))
        ambiguous = {
            base
            for base, count in counts.items()
            if count > 1 and len(base_to_simplified.get(base, set())) > 1
        }
        for row in rows:
            if row.get("_base_meaning", "") in ambiguous:
                duplicate_ids.add(row["ID"])
    else:
        duplicate_ids = {
            row["ID"]
            for row in rows
            if counts.get(row.get("_base_meaning", ""), 0) > 1
        }

    cache = load_cache(cache_path)

    variants_by_base: Dict[str, List[Dict[str, str]]] = {}
    for row in rows:
        base = row.get("_base_meaning", "")
        if not base:
            continue
        variants_by_base.setdefault(base, []).append(
            {"simplified": row.get("Simplified"), "pinyin": row.get("Pinyin")}
        )

    targets = []
    for row in rows:
        if row.get("ID") in duplicate_ids:
            if row["ID"] in cache and not args.refine and not args.overwrite:
                continue
            meaning_full = row.get("Meaning", "") or ""
            if "<br>" in meaning_full and not args.overwrite:
                continue
            meaning_value = row.get("_base_meaning", "")
            item = {
                "id": row.get("ID"),
                "simplified": row.get("Simplified"),
                "pinyin": row.get("Pinyin"),
                "meaning": meaning_value,
                "tags": row.get("Tags"),
                "example": extract_first_example(row.get("Examples", "")),
                "variants": variants_by_base.get(meaning_value, []),
            }
            targets.append(item)

    if args.max and args.max > 0:
        targets = targets[: args.max]

    total = len(targets)
    print(f"Rows to expand: {total}")

    for i in range(0, total, args.batch_size):
        batch = targets[i : i + args.batch_size]
        expanded = expand_batch(args.host, args.model, batch, args.temperature)
        for item, value in zip(batch, expanded):
            base = (item.get("meaning") or "").strip()
            cache[item["id"]] = build_full_meaning(base, value)
        save_cache(cache_path, cache)
        done = min(i + args.batch_size, total)
        print(f"Expanded {done}/{total}")
        time.sleep(0.1)

    # Write output
    with open(output_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=fieldnames,
            delimiter="\t",
            quoting=csv.QUOTE_MINIMAL,
            lineterminator="\n",
            extrasaction="ignore",
        )
        writer.writeheader()
        for row in rows:
            if row.get("ID") in duplicate_ids:
                cached = cache.get(row.get("ID"))
                if cached:
                    row["Meaning"] = cached
            writer.writerow(row)

    print(f"Updated TSV written to: {output_path}")
    print(f"Cache saved to: {cache_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
