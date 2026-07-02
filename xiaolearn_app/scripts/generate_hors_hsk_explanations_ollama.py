#!/usr/bin/env python3
"""
Generate explanationFr for hors-hsk entries using local Ollama.

Usage examples:
  python3 scripts/generate_hors_hsk_explanations_ollama.py --batch-size 20 --output /tmp/hors-hsk.sample.json
  python3 scripts/generate_hors_hsk_explanations_ollama.py --model qwen2.5:7b --batch-size 200 --save-every 100
  python3 scripts/generate_hors_hsk_explanations_ollama.py --generate-examples --web-context --batch-size 100
  python3 scripts/generate_hors_hsk_explanations_ollama.py --force --web-context --start 1138 --batch-size 200

--web-context: before each Ollama call, fetches a short Wikipedia summary (ZH then FR then EN)
  and injects it into the prompt so the model can verify the meaning rather than guess.
  Adds ~1-5 s per entry (network round-trip). Uses an in-memory cache so duplicate
  translationFr values only trigger one request.
"""

from __future__ import annotations

import argparse
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

try:
    from pypinyin import lazy_pinyin, Style as PinyinStyle
    PYPINYIN_AVAILABLE = True
except ImportError:
    PYPINYIN_AVAILABLE = False


def hanzi_to_pinyin(text: str) -> str:
    """Convert Chinese characters to pinyin with tones using pypinyin."""
    if not PYPINYIN_AVAILABLE:
        return ""
    syllables = lazy_pinyin(text, style=PinyinStyle.TONE)
    return " ".join(syllables)


OLLAMA_URL = "http://127.0.0.1:11434/api/generate"
JSON_BLOCK_RE = re.compile(r"\{[\s\S]*\}")
CJK_CHAR_RE = re.compile(r"[\u3400-\u9fff]")
HTML_TAG_RE = re.compile(r"<[^>]+>")

# In-memory cache for Wikipedia lookups (key: (lang, query) -> summary)
_WIKI_CACHE: dict[tuple[str, str], str] = {}


def _wikipedia_first_sentence(text: str) -> str:
    """Return the first complete sentence of a Wikipedia extract."""
    text = text.strip().replace("\xa0", " ")
    # Cut at first sentence boundary (. ! ?) followed by space or end
    match = re.search(r"[.!?](\s|$)", text)
    if match:
        return text[: match.start() + 1].strip()
    return text[:220].strip()


def _is_useful_summary(text: str) -> bool:
    """Reject summaries that look like navigation lists, institution enumerations, etc."""
    if not text or len(text) < 30:
        return False
    # Too many CJK institution-list markers per character
    list_markers = len(re.findall(r"[分局所隊站館校院廳廠]", text))
    if list_markers >= 4:
        return False
    # Too many line breaks relative to length (list-like)
    if text.count("\n") > len(text) / 40:
        return False
    # Mostly CJK but no verb/connector → probably a bare list
    cjk_chars = CJK_CHAR_RE.findall(text)
    if len(cjk_chars) > len(text) * 0.6 and "\n" in text:
        return False
    return True


def _wikipedia_lookup(query: str, lang: str, timeout_s: int) -> str:
    """Try direct REST summary, then search-API fallback. Returns first sentence or ''."""
    cache_key = (lang, query)
    if cache_key in _WIKI_CACHE:
        return _WIKI_CACHE[cache_key]

    result = ""

    # 1) Direct REST summary lookup
    encoded = urllib.parse.quote(query.replace(" ", "_"), safe="")
    url = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{encoded}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "XiaoLearn-dict/1.0"})
        with urllib.request.urlopen(req, timeout=timeout_s) as resp:
            body = json.loads(resp.read().decode("utf-8"))
        extract = body.get("extract", "")
        if extract and len(extract) >= 30:
            sentence = _wikipedia_first_sentence(extract)
            if _is_useful_summary(sentence):
                result = sentence
    except Exception:
        pass

    # 2) Search API fallback (snippet only)
    if not result:
        params = urllib.parse.urlencode({
            "action": "query",
            "list": "search",
            "srsearch": query,
            "format": "json",
            "srlimit": 1,
            "srprop": "snippet",
        })
        search_url = f"https://{lang}.wikipedia.org/w/api.php?{params}"
        try:
            req = urllib.request.Request(search_url, headers={"User-Agent": "XiaoLearn-dict/1.0"})
            with urllib.request.urlopen(req, timeout=timeout_s) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            hits = data.get("query", {}).get("search", [])
            if hits:
                snippet = HTML_TAG_RE.sub("", hits[0].get("snippet", "")).strip().replace("\xa0", " ")
                if _is_useful_summary(snippet):
                    result = snippet[:220]
        except Exception:
            pass

    _WIKI_CACHE[cache_key] = result
    return result


def fetch_web_context(
    hanzi: str,
    translation_fr: str = "",
    translation_en: str = "",
    timeout_s: int = 5,
) -> str:
    """Search Wikipedia (FR then ZH) and return a short context string for the prompt.

    Strategy:
      1. French Wikipedia with the cleaned French translation
      2. Chinese Wikipedia with the hanzi
      3. English Wikipedia with the cleaned English translation (last resort)
    Returns at most 220 characters, or '' if nothing useful found.
    """

    def _clean(raw: str) -> str:
        # Strip parentheses, take first comma-separated chunk, trim
        raw = re.sub(r"\([^)]*\)", "", raw).strip()
        return raw.split(",")[0].strip()

    # Always try Chinese Wikipedia first with the hanzi — most reliable for Chinese-specific concepts.
    # Then fall back to French, then English with the translation.
    candidates: list[tuple[str, str]] = []
    if hanzi:
        candidates.append(("zh", hanzi))
    if translation_fr:
        cln = _clean(translation_fr)
        if cln and len(cln) >= 3:
            candidates.append(("fr", cln))
    if translation_en:
        cln = _clean(translation_en)
        if cln and len(cln) >= 3:
            candidates.append(("en", cln))

    for lang, query in candidates:
        try:
            summary = _wikipedia_lookup(query, lang=lang, timeout_s=timeout_s)
            if summary and len(summary) >= 30:
                # Prefix ZH results so the LLM knows the language
                if lang == "zh":
                    return f"[zh] {summary[:200]}"
                return summary[:220]
        except Exception:
            continue
    return ""


def normalize_space(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def maybe_add_period(value: str) -> str:
    if not value:
        return value
    if value[-1] in ".!?":
        return value
    return f"{value}."


def likely_has_too_much_english(value: str) -> bool:
    # Heuristic: only reject when several common English function words appear
    # and clearly dominate French ones.
    tokens = re.findall(r"[A-Za-zÀ-ÖØ-öø-ÿ']+", value.lower())
    if len(tokens) < 4:
        return False

    en_common = {
        "the",
        "and",
        "for",
        "with",
        "from",
        "used",
        "use",
        "usually",
        "means",
        "term",
        "in",
        "to",
        "of",
        "is",
        "are",
        "or",
        "exactly",
        "without",
        "another",
        "set",
        "element",
        "elements",
        "different",
        "style",
        "styles",
        "leftovers",
        "mapped",
        "mapping",
        "associate",
        "associated",
    }
    fr_common = {
        "le",
        "la",
        "les",
        "de",
        "des",
        "du",
        "un",
        "une",
        "et",
        "pour",
        "avec",
        "dans",
        "sur",
        "est",
        "sont",
        "utilise",
        "utilisee",
        "utilisé",
        "utilisée",
        "souvent",
        "terme",
    }

    en_hits = sum(t.strip("'") in en_common for t in tokens)
    fr_hits = sum(t.strip("'") in fr_common for t in tokens)
    if en_hits >= 4 and en_hits > fr_hits:
        return True
    # Catch short English outputs like "juxtapose different elements or styles."
    if en_hits >= 2 and fr_hits == 0 and len(tokens) >= 4:
        return True
    return False


def has_excessive_cjk(value: str, allowed_hanzi: str = "") -> bool:
    cjk_chars = CJK_CHAR_RE.findall(value)
    if not cjk_chars:
        return False
    allowed = set(CJK_CHAR_RE.findall(allowed_hanzi))
    extra = [c for c in cjk_chars if c not in allowed]
    return len(extra) >= 4


def build_context_hint(entry: dict[str, Any]) -> str:
    joined = " ".join(
        [
            str(entry.get("translationEn", "")),
            str(entry.get("translationFr", "")),
            str(entry.get("category", "")),
            " ".join(entry.get("tags", []) if isinstance(entry.get("tags"), list) else []),
        ]
    ).lower()

    hints: list[str] = []
    if "taiwan" in joined or "(tw" in joined or " taïwan" in joined:
        hints.append("Surtout employé à Taïwan.")
    if "mainland china" in joined or "chine continentale" in joined:
        hints.append("Usage lié à la Chine continentale.")
    if "internet slang" in joined or "argot internet" in joined:
        hints.append("Registre : argot d'Internet.")
    if "acg" in joined or "anime" in joined or "manga" in joined or "code geass" in joined:
        hints.append("Référence culturelle de l'univers anime/manga/jeu (ACG).")
    if "dialect" in joined or "dialectal" in joined:
        hints.append("Usage dialectal ou régional.")
    if "emergency number" in joined or "numéro d'urgence" in joined:
        hints.append("Terme à forte valeur pratique dans un contexte d'urgence.")
    return " ".join(hints)


def build_fallback_explanation(entry: dict[str, Any]) -> str:
    fr = normalize_space(str(entry.get("translationFr", "")).strip())
    en = normalize_space(str(entry.get("translationEn", "")).strip())
    base = fr or en or "terme courant"
    sentence = f"Désigne {base}."
    hint = build_context_hint(entry)
    if hint:
        sentence = f"{sentence} {hint}"
    return maybe_add_period(sentence)


def has_source_explanation(entry: dict[str, Any]) -> bool:
    value = entry.get("explanation", "")
    return isinstance(value, str) and bool(normalize_space(value))


def validate_example_item(raw: Any, required_hanzi: str = "") -> dict[str, str] | None:
    if not isinstance(raw, dict):
        return None
    chinese = normalize_space(str(raw.get("chinese") or raw.get("hanzi") or ""))
    pinyin = normalize_space(str(raw.get("pinyin") or ""))
    translation_fr = normalize_space(str(raw.get("translationFr") or raw.get("translation") or ""))
    translation_en = normalize_space(str(raw.get("translationEn") or ""))
    if not chinese or not translation_fr:
        return None
    if not CJK_CHAR_RE.search(chinese):
        return None
    if likely_has_too_much_english(translation_fr):
        return None
    # Reject examples that don't contain the target term
    if required_hanzi and required_hanzi not in chinese:
        return None
    if not translation_en:
        translation_en = translation_fr
    # Use pypinyin only when LLM pinyin is missing, contains CJK, or doesn't
    # match the Chinese character count (hallucinated pinyin).
    if PYPINYIN_AVAILABLE and not validate_pinyin_vs_chinese(pinyin, chinese):
        pinyin = hanzi_to_pinyin(chinese)
    return {
        "chinese": chinese,
        "pinyin": pinyin,
        "translationFr": maybe_add_period(translation_fr),
        "translationEn": maybe_add_period(translation_en),
    }


def normalize_examples(raw_examples: Any, count: int, required_hanzi: str = "") -> list[dict[str, str]]:
    if not isinstance(raw_examples, list):
        return []
    normalized: list[dict[str, str]] = []
    for item in raw_examples:
        valid = validate_example_item(item, required_hanzi=required_hanzi)
        if valid:
            normalized.append(valid)
        if len(normalized) >= count:
            break
    return normalized


def has_enough_examples(entry: dict[str, Any], count: int) -> bool:
    return len(normalize_examples(entry.get("examples", []), count)) >= count


def parse_json_block(raw: str) -> dict[str, Any] | None:
    text = raw.strip()
    if not text:
        return None
    candidate = text
    if not text.startswith("{"):
        match = JSON_BLOCK_RE.search(text)
        if not match:
            return None
        candidate = match.group(0)
    try:
        parsed = json.loads(candidate)
    except json.JSONDecodeError:
        return None
    if isinstance(parsed, dict):
        return parsed
    return None


def has_cjk(value: str) -> bool:
    return bool(CJK_CHAR_RE.search(value))


def validate_pinyin_vs_chinese(pinyin: str, chinese: str) -> bool:
    """Check that LLM-generated pinyin is plausible for the given Chinese string.

    Uses pypinyin to get the expected syllables, then verifies each pinyin token
    either matches an expected syllable exactly OR can be fully decomposed into
    consecutive expected syllables (DP segmentation). This accepts natural compound
    forms (e.g. Sìchuān = si+chuan, sānfēnzhīyī = san+fen+zhi+yi) while rejecting
    hallucinated syllables that don't match any expected character.

    Falls back to a count-ratio check when pypinyin is unavailable.
    """
    if not pinyin or has_cjk(pinyin):
        return False
    cjk_count = len(CJK_CHAR_RE.findall(chinese))
    if cjk_count == 0:
        return True  # No CJK to validate against

    pinyin_tokens = re.findall(
        r"[a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+", pinyin, re.IGNORECASE
    )
    if not pinyin_tokens:
        return False

    # Count-ratio sanity check
    ratio = len(pinyin_tokens) / cjk_count
    if not (0.4 <= ratio <= 2.5):
        return False

    if not PYPINYIN_AVAILABLE:
        return True

    import unicodedata

    def strip_tones(s: str) -> str:
        return "".join(
            c for c in unicodedata.normalize("NFD", s.lower())
            if unicodedata.category(c) != "Mn"
        )

    # Build expected syllable set from pypinyin (tone-stripped, alphabetic only)
    expected_syls: set[str] = set(
        strip_tones(s)
        for s in lazy_pinyin(chinese, style=PinyinStyle.TONE)
        if s and not CJK_CHAR_RE.search(s) and re.search(r"[a-zA-Z]", s)
    )
    if not expected_syls:
        return True

    def can_segment(token: str) -> bool:
        """DP: check if token splits fully into expected syllables."""
        n = len(token)
        dp = [False] * (n + 1)
        dp[0] = True
        for i in range(1, n + 1):
            for j in range(max(0, i - 7), i):
                if dp[j] and token[j:i] in expected_syls:
                    dp[i] = True
                    break
        return dp[n]

    actual_stripped = [strip_tones(t) for t in pinyin_tokens]
    match_count = sum(
        1 for t in actual_stripped if t in expected_syls or can_segment(t)
    )
    match_rate = match_count / len(actual_stripped)
    return match_rate >= 0.65


def examples_have_valid_pinyin(examples: list[dict[str, str]], count: int) -> bool:
    if len(examples) < count:
        return False
    for ex in examples[:count]:
        pinyin = normalize_space(str(ex.get("pinyin", "")))
        if not pinyin:
            return False
        if has_cjk(pinyin):
            return False
    return True


def generate_pinyin_batch(
    model: str,
    sentences: list[str],
    timeout_s: int,
) -> list[str]:
    if not sentences:
        return []
    prompt = f"""/no_think
Convertis chaque phrase chinoise en pinyin AVEC tons (accents), sans traduction.

Phrases:
{json.dumps(sentences, ensure_ascii=False)}

Retourne STRICTEMENT un JSON valide:
{{"pinyins":["..."]}}
"""
    raw = ollama_generate(
        model=model,
        prompt=prompt,
        timeout_s=timeout_s,
        temperature=0.0,
        num_predict=260,
    )
    payload = parse_json_block(raw)
    if not payload:
        return []
    values = payload.get("pinyins")
    if not isinstance(values, list):
        return []
    out: list[str] = []
    for value in values:
        if not isinstance(value, str):
            return []
        py = normalize_space(value)
        if not py or has_cjk(py):
            return []
        out.append(py)
    if len(out) != len(sentences):
        return []
    return out


def repair_examples_pinyin(
    model: str,
    examples: list[dict[str, str]],
    count: int,
    timeout_s: int,
) -> list[dict[str, str]]:
    if len(examples) < count:
        return examples
    repaired = [dict(ex) for ex in examples]
    if PYPINYIN_AVAILABLE:
        for i in range(min(count, len(repaired))):
            chinese = repaired[i].get("chinese", "")
            pinyin = repaired[i].get("pinyin", "")
            # Only overwrite if pinyin is clearly wrong (missing, has CJK, or
            # syllable count doesn't match Chinese character count).
            if chinese and not validate_pinyin_vs_chinese(pinyin, chinese):
                repaired[i]["pinyin"] = hanzi_to_pinyin(chinese)
        return repaired
    # Fallback to LLM if pypinyin is not available
    subset = examples[:count]
    sentences = [ex["chinese"] for ex in subset]
    generated = generate_pinyin_batch(model=model, sentences=sentences, timeout_s=timeout_s)
    if len(generated) != len(subset):
        return examples
    for i, py in enumerate(generated):
        repaired[i]["pinyin"] = py
    return repaired


def build_fallback_examples(entry: dict[str, Any], count: int) -> list[dict[str, str]]:
    hanzi = normalize_space(str(entry.get("hanzi", ""))) or "这个词"
    tr_fr = normalize_space(str(entry.get("translationFr", ""))) or normalize_space(
        str(entry.get("translationEn", "terme courant"))
    )
    tr_en = normalize_space(str(entry.get("translationEn", ""))) or tr_fr

    base_examples = [
        {
            "chinese": f"这个词是“{hanzi}”。",
            "pinyin": "",
            "translationFr": maybe_add_period(f"Ce terme correspond à « {tr_fr} »"),
            "translationEn": maybe_add_period(f"This term means \"{tr_en}\""),
        },
        {
            "chinese": f"在常见语境里，“{hanzi}”经常出现。",
            "pinyin": "",
            "translationFr": maybe_add_period(f"Dans un contexte courant, \"{tr_fr}\" apparaît souvent"),
            "translationEn": maybe_add_period(f"In common contexts, \"{tr_en}\" appears frequently"),
        },
    ]
    return base_examples[: max(1, count)]


def build_prompt(entry: dict[str, Any], generate_examples: bool = False, examples_count: int = 2, web_context: str = "") -> str:
    tags = entry.get("tags", [])
    tag_text = ", ".join(tags[:8]) if isinstance(tags, list) else ""
    hanzi = entry.get("hanzi", "")

    # Only show ex_preview if it's a real (non-fallback) example
    ex_preview = ""
    examples = entry.get("examples", [])
    if isinstance(examples, list) and examples:
        ex0 = examples[0] if isinstance(examples[0], dict) else {}
        ch = ex0.get("chinese") or ex0.get("hanzi") or ""
        if ch and "这个词是" not in ch and "在常见语境里" not in ch:
            ex_preview = (
                f"- Exemple chinois existant: {ch}\n"
                f"- Exemple traductionFr existante: {ex0.get('translationFr') or ex0.get('translation') or ''}"
            )

    cultural_hint = build_context_hint(entry)

    if generate_examples:
        return f"""/no_think
Tu es lexicographe (chinois -> français) pour une application d'apprentissage du mandarin.

TERME À TRAITER:
- hanzi: {hanzi}
- pinyin: {entry.get("pinyin", "")}
- translationFr: {entry.get("translationFr", "")}
- translationEn: {entry.get("translationEn", "")}
- explanation source: {entry.get("explanation", "")}
- catégorie: {entry.get("category", "")}
- tags: {tag_text}
{ex_preview}

Contexte culturel:
{cultural_hint or "Aucun indice culturel explicite."}
{(f"Contexte encyclopédique (Wikipedia) — utilise-le pour vérifier le sens, ne pas l'inventer :{chr(10)}{web_context}") if web_context else ""}

TÂCHE 1 — explanationFr (obligatoire):
Rédige 1 à 2 phrases françaises (18-220 caractères) expliquant le terme de façon claire et pédagogique.
Si translationEn est plus détaillé ou précis que translationFr, exploite-le pour enrichir l'explication.
Reste fidèle aux traductions fournies. Ne pas inventer de faits, d'étymologie ni de chiffres non fournis.
Si le terme renvoie à une référence culturelle (Taïwan, argot web, ACG, Chine continentale), l'indiquer.

TÂCHE 2 — {examples_count} exemples d'usage (obligatoire):
Règle absolue : chaque champ "chinese" DOIT contenir le terme « {hanzi} » écrit à l'identique.
Si le terme contient des chiffres ou des lettres latines (ex: 110, A片, 3C), ils doivent apparaître tels quels.
INTERDIT : ne jamais écrire de phrase-template comme « 这个词是"X"。 » ou « 在常见语境里，"X"经常出现。 »
Écris uniquement des phrases authentiques et naturelles qui emploient le terme en situation concrète.
translationFr et translationEn DOIVENT être des traductions directes et précises de la phrase chinoise (pas juste la définition du terme).
Pinyin : complet avec tons (accents diacritiques), morphèmes regroupés en mots naturels (ex: zhōngguó, píngfēn, fēicháng). Noms propres en majuscule (ex: Běijīng). Pas d'espace avant la ponctuation.

Exemple CORRECT pour « 三分之一 » (fraction) :
{{"explanationFr":"Fraction désignant un tiers (1/3). Utilisée pour exprimer une proportion dans des statistiques, des partages ou des comparaisons.","examples":[{{"chinese":"调查显示，差不多三分之一的受访者支持这个方案。","pinyin":"diàochá xiǎnshì, chàbuduō sānfēnzhīyī de shòufǎngzhě zhīchí zhège fāng'àn.","translationFr":"L'enquête montre qu'environ un tiers des personnes interrogées soutient cette proposition.","translationEn":"The survey shows that about one third of respondents support this proposal."}},{{"chinese":"这杯果汁我们三个人平分吧，每人喝三分之一。","pinyin":"zhè bēi guǒzhī wǒmen sān gè rén píngfēn ba, měi rén hē sānfēnzhīyī.","translationFr":"Partageons ce jus à parts égales entre nous trois, chacun en boit un tiers.","translationEn":"Let's split this juice equally among the three of us, each drinking one third."}}]}}

Exemple CORRECT pour « 三围 » (terme simple avec translationEn riche) :
{{"explanationFr":"Les trois mensurations d'une femme : poitrine (胸围), taille (腰围) et hanches (臀围). Abréviation courante dans la mode et la beauté.","examples":[{{"chinese":"很多品牌在官网上标注了模特的三围数据，方便消费者选码。","pinyin":"hěn duō pǐnpái zài guānwǎng shàng biāozhù le mótè de sānwéi shùjù, fāngbiàn xiāofèi zhě xuǎn mǎ.","translationFr":"De nombreuses marques indiquent les mensurations de leurs mannequins sur leur site officiel pour aider à choisir la taille.","translationEn":"Many brands list their models' measurements on their official website to help consumers choose the right size."}},{{"chinese":"她的三围非常标准，非常适合做模特。","pinyin":"tā de sānwéi fēicháng biāozhǔn, fēicháng shìhé zuò mótè.","translationFr":"Ses mensurations sont très standards, elle serait parfaite pour faire mannequin.","translationEn":"Her measurements are very standard, making her ideal for modeling."}}]}}

Retourne STRICTEMENT un JSON valide, format exact:
{{
  "explanationFr":"...",
  "examples":[
    {{
      "chinese":"...",
      "pinyin":"...",
      "translationFr":"...",
      "translationEn":"..."
    }}
  ]
}}
"""

    return f"""/no_think
Tu es lexicographe (chinois -> français) pour une application d'apprentissage.

Objectif: rédiger une explication FRANÇAISE claire, concise et culturellement juste pour un mot/terme.
Si translationEn est plus riche ou précis que translationFr, exploite-le pour enrichir l'explication.

Données:
- hanzi: {entry.get("hanzi", "")}
- pinyin: {entry.get("pinyin", "")}
- translationFr: {entry.get("translationFr", "")}
- translationEn: {entry.get("translationEn", "")}
- explanation source: {entry.get("explanation", "")}
- catégorie: {entry.get("category", "")}
- tags: {tag_text}
{ex_preview}

Contexte culturel utile:
{cultural_hint or "Aucun indice culturel explicite."}
{(f"Contexte encyclopédique (Wikipedia) — utilise-le pour vérifier le sens, ne pas l'inventer :{chr(10)}{web_context}") if web_context else ""}

Contraintes qualité:
1) Français naturel (éviter mot à mot), niveau pédagogique.
2) 1 à 2 phrases maximum, 18 à 220 caractères environ.
3) Expliquer l'usage concret (registre, domaine, contexte) si pertinent.
4) Si la traduction implique une référence culturelle (Taïwan, Chine continentale, ACG, argot web), l'indiquer clairement sans sur-interpréter.
5) Ne pas inventer d'origine historique ni de faits non fournis.
6) Ne pas inventer de pinyin/romanisation ni de détails techniques/médicaux non présents.
7) En cas d'incertitude, rester général et prudent.
8) Pas de markdown, pas de liste, pas de guillemets superflus.

Exemples de sorties CORRECTES:
- Pour « 三围 » (BWH, abbr. for a woman's three measurements) : {{"explanationFr":"Les trois mensurations féminines : poitrine (胸围), taille (腰围) et hanches (臀围). Abréviation courante dans la mode et la beauté."}}
- Pour « 三伏天 » (hottest period of summer) : {{"explanationFr":"Les trois périodes de grande canicule du calendrier lunaire chinois, représentant les jours les plus chauds de l'été."}}
- Pour « 三天两头 » (practically every day) : {{"explanationFr":"Expression signifiant que quelque chose se produit très fréquemment, pratiquement tous les jours."}}

Retourne STRICTEMENT un JSON valide, format exact:
{{"explanationFr":"..."}}
"""


def parse_payload(
    raw_response: str,
    allowed_hanzi: str = "",
    generate_examples: bool = False,
    examples_count: int = 2,
) -> tuple[str | None, list[dict[str, str]]]:
    text = raw_response.strip()
    if not text:
        return None, []

    candidate_json = text
    if not text.startswith("{"):
        match = JSON_BLOCK_RE.search(text)
        if not match:
            return None, []
        candidate_json = match.group(0)

    try:
        payload = json.loads(candidate_json)
    except json.JSONDecodeError:
        return None, []

    value = payload.get("explanationFr")
    examples: list[dict[str, str]] = []
    if not isinstance(value, str):
        return None, examples
    value = maybe_add_period(normalize_space(value))
    if len(value) < 12:
        return None, examples
    if likely_has_too_much_english(value):
        return None, examples
    if has_excessive_cjk(value, allowed_hanzi=allowed_hanzi):
        return None, examples

    if generate_examples:
        examples = normalize_examples(payload.get("examples", []), examples_count, required_hanzi=allowed_hanzi)
        if len(examples) < examples_count:
            return value, []

    return value, examples


def ollama_generate(
    model: str,
    prompt: str,
    timeout_s: int,
    temperature: float,
    num_predict: int = 180,
) -> str:
    payload = {
        "model": model,
        "prompt": prompt,
        "format": "json",
        "stream": False,
        "options": {
            "temperature": temperature,
            "num_predict": num_predict,
        },
    }
    req = urllib.request.Request(
        OLLAMA_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=timeout_s) as resp:
        body = resp.read().decode("utf-8")
    data = json.loads(body)
    return str(data.get("response", ""))


def save_json(path: Path, data: list[dict[str, Any]]) -> None:
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp.replace(path)


def save_state(path: Path, state: dict[str, Any]) -> None:
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp.replace(path)


def load_state(path: Path, total: int, start: int, input_path: Path, reset: bool) -> dict[str, Any]:
    if not reset and path.exists():
        try:
            raw = json.loads(path.read_text(encoding="utf-8"))
            if isinstance(raw, dict):
                failed_raw = raw.get("failed_indices", [])
                failed_indices = []
                if isinstance(failed_raw, list):
                    for value in failed_raw:
                        if isinstance(value, int) and 0 <= value < total:
                            failed_indices.append(value)
                attempts_raw = raw.get("attempts", {})
                attempts: dict[int, int] = {}
                if isinstance(attempts_raw, dict):
                    for k, v in attempts_raw.items():
                        try:
                            idx = int(k)
                        except (TypeError, ValueError):
                            continue
                        if 0 <= idx < total and isinstance(v, int) and v >= 0:
                            attempts[idx] = v
                cursor = raw.get("cursor", start)
                if not isinstance(cursor, int):
                    cursor = start
                return {
                    "version": 1,
                    "input_path": str(input_path),
                    "total_entries": total,
                    "cursor": max(0, min(cursor, total)),
                    "failed_indices": sorted(set(failed_indices)),
                    "attempts": {str(k): v for k, v in attempts.items()},
                    "runs": int(raw.get("runs", 0) or 0),
                    "updated_total": int(raw.get("updated_total", 0) or 0),
                    "fallback_total": int(raw.get("fallback_total", 0) or 0),
                    "last_run_at": int(raw.get("last_run_at", 0) or 0),
                }
        except json.JSONDecodeError:
            pass

    return {
        "version": 1,
        "input_path": str(input_path),
        "total_entries": total,
        "cursor": start,
        "failed_indices": [],
        "attempts": {},
        "runs": 0,
        "updated_total": 0,
        "fallback_total": 0,
        "last_run_at": 0,
    }


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate explanationFr for hors-hsk.json with local Ollama."
    )
    parser.add_argument("--input", default="data/hors-hsk.json", help="Input JSON path")
    parser.add_argument("--output", default=None, help="Output JSON path (default: in-place)")
    parser.add_argument("--model", default="qwen2.5:7b", help="Ollama model name")
    parser.add_argument("--start", type=int, default=0, help="Start index")
    parser.add_argument(
        "--limit",
        type=int,
        default=0,
        help="Legacy alias for batch-size (if > 0, overrides --batch-size)",
    )
    parser.add_argument("--batch-size", type=int, default=200, help="Entries processed per run")
    parser.add_argument(
        "--max-failed-per-run",
        type=int,
        default=-1,
        help="Max previously failed entries retried first in each run (-1 = auto ~1/3, 0 = all)",
    )
    parser.add_argument("--state-file", default=None, help="Progress state JSON path")
    parser.add_argument(
        "--reset-state",
        action="store_true",
        help="Ignore existing state file and restart from --start",
    )
    parser.add_argument(
        "--retry-only",
        action="store_true",
        help="Process only previously failed entries from state (no new cursor entries)",
    )
    parser.add_argument(
        "--only-explanation",
        action="store_true",
        help="Process only entries that have a non-empty source 'explanation' field",
    )
    parser.add_argument(
        "--generate-examples",
        action="store_true",
        help="Generate examples alongside explanationFr",
    )
    parser.add_argument(
        "--examples-count",
        type=int,
        default=2,
        help="Number of examples to generate per entry when --generate-examples is enabled",
    )
    parser.add_argument(
        "--normalize-example-pinyin",
        action="store_true",
        help="Regenerate pinyin from chinese examples to enforce coherence",
    )
    parser.add_argument("--save-every", type=int, default=200, help="Save every N updates")
    parser.add_argument("--sleep", type=float, default=0.05, help="Sleep between requests (sec)")
    parser.add_argument("--timeout", type=int, default=90, help="HTTP timeout (sec)")
    parser.add_argument("--temperature", type=float, default=0.2, help="Sampling temperature")
    parser.add_argument("--max-retries", type=int, default=2, help="Retries per item")
    parser.add_argument("--force", action="store_true", help="Regenerate even if explanationFr exists")
    parser.add_argument("--dry-run", action="store_true", help="Do not write file")
    parser.add_argument("--log-every", type=int, default=25, help="Progress log frequency")
    parser.add_argument(
        "--web-context",
        action="store_true",
        help="Fetch a Wikipedia summary (FR then ZH then EN) to ground the LLM on the correct meaning",
    )
    parser.add_argument(
        "--web-timeout",
        type=int,
        default=5,
        help="HTTP timeout for Wikipedia lookups (sec, default 5)",
    )
    args = parser.parse_args()

    input_path = Path(args.input)
    if not input_path.is_absolute():
        input_path = (Path(__file__).resolve().parents[1] / input_path).resolve()
    output_path = Path(args.output).resolve() if args.output else input_path
    state_path = Path(args.state_file) if args.state_file else output_path.with_suffix(
        output_path.suffix + ".explain-state.json"
    )
    if not state_path.is_absolute():
        state_path = (Path(__file__).resolve().parents[1] / state_path).resolve()

    data = json.loads(input_path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise RuntimeError("Input JSON must be an array of entries.")

    total = len(data)
    start = max(0, min(args.start, total))
    batch_size = args.limit if args.limit and args.limit > 0 else args.batch_size
    if batch_size <= 0:
        batch_size = total

    state = load_state(
        path=state_path,
        total=total,
        start=start,
        input_path=input_path,
        reset=args.reset_state,
    )
    if state.get("input_path") != str(input_path):
        state = load_state(
            path=state_path,
            total=total,
            start=start,
            input_path=input_path,
            reset=True,
        )

    cursor = int(state.get("cursor", start))
    cursor = max(0, min(cursor, total))
    failed_indices_state = state.get("failed_indices", [])
    failed_indices = [i for i in failed_indices_state if isinstance(i, int) and 0 <= i < total]
    failed_set = set(failed_indices)
    attempts_raw = state.get("attempts", {})
    attempts_by_index: dict[int, int] = {}
    if isinstance(attempts_raw, dict):
        for k, v in attempts_raw.items():
            try:
                idx = int(k)
            except (TypeError, ValueError):
                continue
            if idx in failed_set and isinstance(v, int) and v >= 0:
                attempts_by_index[idx] = v

    if args.max_failed_per_run < 0:
        retry_budget = batch_size if args.retry_only else max(1, batch_size // 3)
    elif args.max_failed_per_run == 0:
        retry_budget = batch_size
    else:
        retry_budget = min(batch_size, args.max_failed_per_run)

    targets: list[int] = []
    target_set: set[int] = set()
    retry_targets: list[int] = []
    for idx in failed_indices:
        if args.only_explanation and not has_source_explanation(data[idx]):
            continue
        needs_explanation = args.force or not normalize_space(str(data[idx].get("explanationFr", "")))
        needs_examples = args.generate_examples and (
            args.force or not has_enough_examples(data[idx], args.examples_count)
        )
        if not (needs_explanation or needs_examples):
            failed_set.discard(idx)
            attempts_by_index.pop(idx, None)
            continue
        if len(retry_targets) >= retry_budget:
            break
        retry_targets.append(idx)
        targets.append(idx)
        target_set.add(idx)

    remaining = batch_size - len(targets)
    if not args.retry_only:
        while remaining > 0 and cursor < total:
            idx = cursor
            cursor += 1
            if idx in target_set:
                continue
            if args.only_explanation and not has_source_explanation(data[idx]):
                continue
            needs_explanation = args.force or not normalize_space(str(data[idx].get("explanationFr", "")))
            needs_examples = args.generate_examples and (
                args.force or not has_enough_examples(data[idx], args.examples_count)
            )
            if needs_explanation or needs_examples:
                targets.append(idx)
                target_set.add(idx)
                remaining -= 1

    updated = 0
    failed = 0
    retried = 0
    interrupted = False
    data_changed = False

    print(f"Model: {args.model}")
    print(f"Input: {input_path}")
    print(f"Output: {output_path}")
    print(f"State: {state_path}")
    print(f"Cursor: {cursor}/{total}")
    print(f"Batch size: {batch_size}")
    print(f"Only entries with source explanation: {args.only_explanation}")
    print(f"Generate examples: {args.generate_examples} (count={args.examples_count})")
    print(f"Normalize example pinyin: {args.normalize_example_pinyin}")
    print(f"Web context (Wikipedia): {args.web_context}")
    print(f"Retry failed first: {len(retry_targets)} selected (queue={len(failed_set)})")
    print(f"Selected in this run: {len(targets)}")

    try:
        for pos, idx in enumerate(targets, start=1):
            entry = data[idx]
            is_retry = idx in retry_targets
            if is_retry:
                retried += 1

            web_ctx = ""
            if args.web_context:
                web_ctx = fetch_web_context(
                    hanzi=str(entry.get("hanzi", "")),
                    translation_fr=str(entry.get("translationFr", "")),
                    translation_en=str(entry.get("translationEn", "")),
                    timeout_s=args.web_timeout,
                )
            prompt = build_prompt(
                entry,
                generate_examples=args.generate_examples,
                examples_count=args.examples_count,
                web_context=web_ctx,
            )
            entry_hanzi = str(entry.get("hanzi", ""))
            explanation: str | None = None
            generated_examples: list[dict[str, str]] = []
            existing_examples = normalize_examples(
                entry.get("examples", []), args.examples_count, required_hanzi=entry_hanzi
            )

            for attempt in range(args.max_retries + 1):
                try:
                    raw = ollama_generate(
                        model=args.model,
                        prompt=prompt,
                        timeout_s=args.timeout,
                        temperature=args.temperature,
                        num_predict=800 if args.generate_examples else 180,
                    )
                    parsed_explanation, parsed_examples = parse_payload(
                        raw,
                        allowed_hanzi=entry_hanzi,
                        generate_examples=args.generate_examples,
                        examples_count=args.examples_count,
                    )
                    if parsed_explanation:
                        explanation = parsed_explanation
                    if args.generate_examples and len(parsed_examples) >= args.examples_count:
                        generated_examples = parsed_examples
                    if explanation and (not args.generate_examples or generated_examples):
                        break
                except (urllib.error.URLError, TimeoutError, json.JSONDecodeError):
                    pass
                if attempt < args.max_retries:
                    time.sleep(0.25)

            entry_failed = False
            if explanation is None:
                explanation = build_fallback_explanation(entry)
                entry_failed = True

            if args.generate_examples:
                if len(generated_examples) >= args.examples_count:
                    entry["examples"] = generated_examples
                elif len(existing_examples) >= args.examples_count and not args.force:
                    entry["examples"] = existing_examples
                else:
                    entry["examples"] = build_fallback_examples(entry, args.examples_count)
                    entry_failed = True

                # Repair pinyin: only overwrites when clearly wrong (missing,
                # has CJK, or syllable count doesn't match).
                # validate_pinyin_vs_chinese() guards against overwriting good
                # compound pinyin generated by the LLM.
                normalized = repair_examples_pinyin(
                    model=args.model,
                    examples=normalize_examples(entry.get("examples", []), args.examples_count),
                    count=args.examples_count,
                    timeout_s=args.timeout,
                )
                if len(normalized) >= args.examples_count:
                    entry["examples"] = normalized

            if entry_failed:
                failed += 1
                failed_set.add(idx)
                attempts_by_index[idx] = attempts_by_index.get(idx, 0) + 1
            else:
                if args.generate_examples and not examples_have_valid_pinyin(
                    normalize_examples(entry.get("examples", []), args.examples_count),
                    args.examples_count,
                ):
                    failed += 1
                    failed_set.add(idx)
                    attempts_by_index[idx] = attempts_by_index.get(idx, 0) + 1
                    entry_failed = True

            if not entry_failed:
                failed_set.discard(idx)
                attempts_by_index.pop(idx, None)

            entry["explanationFr"] = explanation
            updated += 1
            data_changed = True

            if updated % args.log_every == 0:
                print(
                    f"[{pos}/{len(targets)}] updated={updated} fallback={failed} retry={retried}"
                )

            if not args.dry_run and args.save_every > 0 and updated % args.save_every == 0:
                state["cursor"] = cursor
                state["failed_indices"] = sorted(failed_set)
                state["attempts"] = {
                    str(k): v for k, v in attempts_by_index.items() if k in failed_set
                }
                state["input_path"] = str(input_path)
                state["total_entries"] = total
                state["last_run_at"] = int(time.time())
                save_json(output_path, data)
                save_state(state_path, state)
                print(f"  Saved checkpoint after {updated} updates.")

            if args.sleep > 0:
                time.sleep(args.sleep)
    except KeyboardInterrupt:
        interrupted = True
        print("Interrupted by user, saving progress...")

    state["cursor"] = cursor
    state["failed_indices"] = sorted(failed_set)
    state["attempts"] = {str(k): v for k, v in attempts_by_index.items() if k in failed_set}
    state["input_path"] = str(input_path)
    state["total_entries"] = total
    state["runs"] = int(state.get("runs", 0) or 0) + 1
    state["updated_total"] = int(state.get("updated_total", 0) or 0) + updated
    state["fallback_total"] = int(state.get("fallback_total", 0) or 0) + failed
    state["last_run_at"] = int(time.time())

    if not args.dry_run:
        if data_changed:
            save_json(output_path, data)
        save_state(state_path, state)

    print("Done.")
    print(f"Processed this run: {len(targets)}")
    print(f"Updated:            {updated}")
    print(f"Retried failures:   {retried}")
    print(f"Fallback this run:  {failed}")
    print(f"Failed queue now:   {len(failed_set)}")
    print(f"Next cursor:        {cursor}/{total}")
    if interrupted:
        print("Run status: interrupted")


if __name__ == "__main__":
    main()
