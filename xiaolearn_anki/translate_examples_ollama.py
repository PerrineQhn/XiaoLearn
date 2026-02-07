#!/usr/bin/env python3
"""
Translate example sentences in the TSV file using a local Ollama model
and append French translations to each example line.
"""

import argparse
import csv
import json
import os
import re
import sys
import time
import urllib.request
from typing import Dict, List, Optional

HSK_PREFIX_RE = re.compile(r"^\(HSK\s*\d+\)\s*")


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


def extract_chinese(left_part: str) -> str:
    left_part = left_part.strip()
    return HSK_PREFIX_RE.sub("", left_part).strip()


def has_cjk(text: str) -> bool:
    return any("\u4e00" <= ch <= "\u9fff" for ch in text)


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


def clean_translation(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == '"' and value[-1] == '"':
        value = value[1:-1].strip()
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


def translate_batch(
    host: str,
    model: str,
    sentences: List[str],
    temperature: float,
) -> List[str]:
    system = (
        "You are a translation engine. Translate Chinese to French. "
        "Do not answer or paraphrase. Output only the requested JSON."
    )
    prompt = (
        "Return a JSON array of strings in the same order as input. "
        "No extra text.\n"
        f"Input: {json.dumps(sentences, ensure_ascii=False)}"
    )
    response = ollama_generate(host, model, prompt, system, temperature)
    parsed = parse_json_array(response)
    if parsed is not None and len(parsed) == len(sentences):
        return [clean_translation(x) for x in parsed]

    # Fallback: try line-based parsing
    lines = [ln.strip() for ln in response.splitlines() if ln.strip()]
    if len(lines) == len(sentences):
        cleaned = []
        for ln in lines:
            ln = re.sub(r"^\s*\d+[\).\-:]\s*", "", ln)
            cleaned.append(clean_translation(ln))
        return cleaned

    # Final fallback: translate one by one
    results = []
    for sentence in sentences:
        single_prompt = (
            "Translate the following Chinese sentence to French. "
            "Return only the translation, no quotes, no extra text.\n"
            f"Sentence: {sentence}"
        )
        single_response = ollama_generate(host, model, single_prompt, system, temperature)
        results.append(clean_translation(single_response))
    return results


def collect_missing_sentences(rows: List[dict], cache: Dict[str, str]) -> List[str]:
    missing = []
    seen = set()
    for row in rows:
        examples = row.get("Examples", "")
        if not examples:
            continue
        for item in examples.split("<br>"):
            item = item.strip()
            if not item:
                continue
            parts = item.split(" - ")
            if len(parts) >= 3:
                continue
            if len(parts) >= 2:
                left = parts[0]
            else:
                left = item
            chinese = extract_chinese(left)
            if not chinese:
                continue
            if len(parts) == 2 and chinese in cache:
                if not has_cjk(chinese) and parts[1].strip() == cache[chinese]:
                    continue
            if chinese in cache or chinese in seen:
                continue
            seen.add(chinese)
            missing.append(chinese)
    return missing


def update_examples(examples: str, cache: Dict[str, str]) -> str:
    if not examples:
        return examples
    updated = []
    for item in examples.split("<br>"):
        raw = item.strip()
        if not raw:
            updated.append(raw)
            continue
        parts = raw.split(" - ")
        if len(parts) >= 3:
            left = parts[0].strip()
            chinese = extract_chinese(left)
            if not has_cjk(chinese) and len(parts) >= 3:
                mid = parts[1].strip()
                end = parts[2].strip()
                if mid == end:
                    updated.append(f"{left} - {mid}")
                    continue
            updated.append(raw)
            continue
        if len(parts) == 2:
            left, pinyin = parts[0].strip(), parts[1].strip()
            chinese = extract_chinese(left)
            fr = cache.get(chinese)
            if fr:
                if not has_cjk(chinese) and pinyin == fr:
                    updated.append(raw)
                else:
                    updated.append(f"{left} - {pinyin} - {fr}")
            else:
                updated.append(raw)
        else:
            left = raw
            chinese = extract_chinese(left)
            fr = cache.get(chinese)
            if fr:
                updated.append(f"{left} - {fr}")
            else:
                updated.append(raw)
    return "<br>".join(updated)


def main() -> int:
    parser = argparse.ArgumentParser(description="Translate examples in TSV using Ollama.")
    parser.add_argument("--input", default="anki_mandarin_myway.tsv", help="Input TSV path")
    parser.add_argument("--output", default=None, help="Output TSV path (default: overwrite input)")
    parser.add_argument("--model", default="qwen2.5:7b", help="Ollama model name")
    parser.add_argument("--batch-size", type=int, default=12, help="Batch size for translation")
    parser.add_argument("--max", type=int, default=0, help="Max sentences to translate (0 = all)")
    parser.add_argument("--cache", default="translation_cache_fr.json", help="JSON cache path")
    parser.add_argument("--host", default=os.environ.get("OLLAMA_HOST", "http://127.0.0.1:11434"))
    parser.add_argument("--temperature", type=float, default=0.0, help="Sampling temperature")
    args = parser.parse_args()

    input_path = args.input
    output_path = args.output or args.input
    cache_path = args.cache

    if not os.path.exists(input_path):
        print(f"Input file not found: {input_path}", file=sys.stderr)
        return 1

    cache = load_cache(cache_path)

    with open(input_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter="\t")
        fieldnames = reader.fieldnames or []
        rows = list(reader)

    missing = collect_missing_sentences(rows, cache)
    if args.max and args.max > 0:
        missing = missing[: args.max]
    total_missing = len(missing)
    print(f"Missing translations: {total_missing}")

    if total_missing:
        for i in range(0, total_missing, args.batch_size):
            batch = missing[i : i + args.batch_size]
            translated = translate_batch(args.host, args.model, batch, args.temperature)
            for src, fr in zip(batch, translated):
                if fr:
                    cache[src] = fr
            save_cache(cache_path, cache)
            done = min(i + args.batch_size, total_missing)
            print(f"Translated {done}/{total_missing}")
            time.sleep(0.1)

    # Rewrite TSV with updated examples
    with open(output_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=fieldnames,
            delimiter="\t",
            quoting=csv.QUOTE_MINIMAL,
            lineterminator="\n",
        )
        writer.writeheader()
        for row in rows:
            row["Examples"] = update_examples(row.get("Examples", ""), cache)
            writer.writerow(row)

    print(f"Updated TSV written to: {output_path}")
    print(f"Cache saved to: {cache_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
