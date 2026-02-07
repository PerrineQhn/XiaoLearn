#!/usr/bin/env python3
"""
Add an Explanation column to the TSV and fill it for ambiguous meanings
(using a local Ollama model). Existing Meaning notes after <br> are moved
into Explanation.
"""

import argparse
import csv
import json
import os
import re
import sys
import time
import urllib.request
from collections import Counter, defaultdict
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
            value = value[1:-1].strip()
            if len(value) >= 2 and value[0] == '"' and value[-1] == '"':
                value = value[1:-1].strip()
    value = " ".join(value.split())
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


def explain_batch(host: str, model: str, items: List[dict], temperature: float) -> List[str]:
    system = (
        "Tu es lexicographe. Tu rédiges des notes d'usage en français pour distinguer "
        "des mots chinois qui partagent la même traduction."
    )
    prompt = (
        "Retourne un tableau JSON de chaînes (notes d'usage), dans le même ordre que l'entrée. "
        "1–2 phrases courtes, 12–28 mots. N'inclus pas la traduction française elle-même. "
        "Utilise les tags, l'exemple et la liste des variantes pour préciser l'usage. "
        "Pas de texte supplémentaire.\n"
        f"Entrée: {json.dumps(items, ensure_ascii=False)}"
    )
    response = ollama_generate(host, model, prompt, system, temperature)
    parsed = parse_json_array(response)
    if parsed is not None and len(parsed) == len(items):
        cleaned = [clean_output(x) for x in parsed]
        return [ensure_french(host, model, item, text, temperature) for item, text in zip(items, cleaned)]

    lines = [ln.strip() for ln in response.splitlines() if ln.strip()]
    if len(lines) == len(items):
        cleaned = [clean_output(ln) for ln in lines]
        return [ensure_french(host, model, item, text, temperature) for item, text in zip(items, cleaned)]

    results = []
    for item in items:
        single_prompt = (
            "Écris une note d'usage en français (1–2 phrases courtes, 12–28 mots) "
            "pour distinguer ce mot des autres ayant la même traduction. "
            "N'inclus pas la traduction française. Pas de guillemets.\n"
            f"Entrée: {json.dumps(item, ensure_ascii=False)}"
        )
        single_response = ollama_generate(host, model, single_prompt, system, temperature)
        results.append(ensure_french(host, model, item, clean_output(single_response), temperature))
    return results


def ensure_french(host: str, model: str, item: dict, text: str, temperature: float) -> str:
    if not text:
        return text
    if not is_non_french(text):
        return text
    prompt = (
        "Réécris cette note d'usage en français. Elle doit contenir des mots français. "
        "Tu peux inclure des sinogrammes entre guillemets \"\" si utile. "
        "1–2 phrases courtes, 12–28 mots. Pas de liste. Pas de guillemets autour de toute la phrase.\n"
        f"Entrée: {json.dumps(item, ensure_ascii=False)}"
    )
    response = ollama_generate(host, model, prompt, "Réponds uniquement en français.", temperature)
    return clean_output(response)


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


def split_explanation(meaning: str) -> str:
    if not meaning or "<br>" not in meaning:
        return ""
    return meaning.split("<br>", 1)[1].strip()

def has_cjk(text: str) -> bool:
    return any("\u4e00" <= ch <= "\u9fff" for ch in text)


def normalize_quotes(text: str) -> str:
    text = text.strip()
    # remove trailing commas from CSV artifacts
    while text.endswith(","):
        text = text[:-1].rstrip()
    if text.startswith("[") and text.endswith("]"):
        try:
            data = json.loads(text)
            if isinstance(data, list) and data and isinstance(data[0], str):
                text = data[0].strip()
        except Exception:
            text = text[1:-1].strip()
            if len(text) >= 2 and text[0] == '"' and text[-1] == '"':
                text = text[1:-1].strip()
    # normalize fancy quotes to standard double quotes
    text = text.replace("“", "\"").replace("”", "\"").replace("«", "\"").replace("»", "\"")
    # collapse repeated quotes
    text = re.sub(r"\"{2,}", "\"", text)
    # fix quotes around sinograms like ""那儿"" -> "那儿"
    text = re.sub(r"\"+([\u4e00-\u9fff]+)\"+", r"\"\\1\"", text)
    # restore apostrophes when quotes are used as French elisions
    text = re.sub(r"([A-Za-zÀ-ÿ])\"([A-Za-zÀ-ÿ])", r"\\1'\\2", text)
    # clean unmatched leading/trailing quotes wrapping the whole field
    if text.startswith("\"") and text.endswith("\"") and text.count("\"") >= 2:
        # keep if the closing quote is paired with an opening quote for a sinogram at start
        inner = text[1:-1].strip()
        if not inner.startswith("\u4e00") and not inner.startswith("\""):
            text = inner
        else:
            text = inner
    return text.strip()

def is_non_french(text: str) -> bool:
    if not text:
        return False
    return re.search(r"[A-Za-zÀ-ÿ]", text) is None


def extract_translation_keys(meaning: str) -> List[str]:
    base = split_meaning(meaning)
    if not base:
        return []
    cleaned = re.sub(r"\(.*?\)", "", base)
    cleaned = cleaned.replace("/", ",").replace(";", ",")
    parts = [p.strip().lower() for p in cleaned.split(",") if p.strip()]
    return parts or [base.strip().lower()]


def main() -> int:
    parser = argparse.ArgumentParser(description="Add Explanation column for ambiguous meanings.")
    parser.add_argument("--input", default="anki_mandarin_myway.tsv", help="Input TSV path")
    parser.add_argument("--output", default=None, help="Output TSV path (default: overwrite input)")
    parser.add_argument("--model", default="qwen2.5:7b", help="Ollama model name")
    parser.add_argument("--batch-size", type=int, default=12, help="Batch size")
    parser.add_argument("--cache", default="explanation_cache_fr.json", help="JSON cache path")
    parser.add_argument("--host", default=os.environ.get("OLLAMA_HOST", "http://127.0.0.1:11434"))
    parser.add_argument("--temperature", type=float, default=0.0, help="Sampling temperature")
    parser.add_argument("--max", type=int, default=0, help="Max rows to process (0 = all)")
    parser.add_argument("--overwrite", action="store_true", help="Overwrite existing Explanation values")
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

    if "Explanation" not in fieldnames:
        try:
            idx = fieldnames.index("Meaning") + 1
        except ValueError:
            idx = len(fieldnames)
        fieldnames.insert(idx, "Explanation")

    for row in rows:
        meaning_raw = row.get("Meaning", "")
        base = split_meaning(meaning_raw)
        if base:
            row["Meaning"] = base
        if not row.get("Explanation"):
            existing = split_explanation(meaning_raw)
            if existing:
                row["Explanation"] = existing
        if row.get("Explanation"):
            row["Explanation"] = normalize_quotes(row["Explanation"])

    key_to_simplified = defaultdict(set)
    key_to_variants = defaultdict(list)
    row_keys = {}
    for row in rows:
        keys = extract_translation_keys(row.get("Meaning", ""))
        row_keys[row.get("ID")] = keys
        for key in keys:
            key_to_simplified[key].add(row.get("Simplified"))
            key_to_variants[key].append(
                {"simplified": row.get("Simplified"), "pinyin": row.get("Pinyin")}
            )

    ambiguous_keys = {
        key for key, sset in key_to_simplified.items() if len(sset) > 1
    }

    cache = load_cache(cache_path)

    targets = []
    for row in rows:
        base = row.get("Meaning", "").strip()
        keys = row_keys.get(row.get("ID"), [])
        is_ambiguous = any(key in ambiguous_keys for key in keys)
        if is_ambiguous:
            explanation = row.get("Explanation", "") or ""
            needs_french = is_non_french(explanation)
            if explanation and not args.overwrite and not needs_french:
                continue
            if row.get("ID") in cache and not args.overwrite and not needs_french:
                continue
            variants = []
            seen = set()
            for key in keys:
                if key not in ambiguous_keys:
                    continue
                for variant in key_to_variants.get(key, []):
                    sig = (variant.get("simplified"), variant.get("pinyin"))
                    if sig in seen:
                        continue
                    seen.add(sig)
                    variants.append(variant)
            item = {
                "id": row.get("ID"),
                "simplified": row.get("Simplified"),
                "pinyin": row.get("Pinyin"),
                "meaning": base,
                "tags": row.get("Tags"),
                "example": extract_first_example(row.get("Examples", "")),
                "variants": variants,
            }
            targets.append(item)

    if args.max and args.max > 0:
        targets = targets[: args.max]

    total = len(targets)
    print(f"Rows to explain: {total}")

    for i in range(0, total, args.batch_size):
        batch = targets[i : i + args.batch_size]
        explained = explain_batch(args.host, args.model, batch, args.temperature)
        for item, value in zip(batch, explained):
            cache[item["id"]] = value
        save_cache(cache_path, cache)
        done = min(i + args.batch_size, total)
        print(f"Explained {done}/{total}")
        time.sleep(0.1)

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
            cached = cache.get(row.get("ID"))
            if cached:
                row["Explanation"] = cached
            writer.writerow(row)

    print(f"Updated TSV written to: {output_path}")
    print(f"Cache saved to: {cache_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
