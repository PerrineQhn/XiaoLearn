#!/usr/bin/env python3
"""
Translate French HSK 2-7/9 Anki TSV files to English.
Uses CC-CEDICT for meanings and a comprehensive French→English dictionary for examples/tags.

Translates:
- Column 5 (Meaning): Uses CEDICT Chinese→English lookup, cleaned up for flashcard style
- Column 6 (Examples): Translates the French part (after last " - ") using FR→EN dictionary
- Column 7 (Tags): French tags → English using tag translation map
"""

import csv
import re
import sys
import os

BASE_DIR = "/Users/petx/Library/Mobile Documents/com~apple~CloudDocs/Projets Dev/XiaoLearn/xiaolearn_anki"
CEDICT_FILE = os.path.join(BASE_DIR, "cedict_ts.txt")

FILES = [
    ("anki_mandarin_myway_hsk_2.tsv", "anki_mandarin_myway_en_hsk_2.tsv"),
    ("anki_mandarin_myway_hsk_3.tsv", "anki_mandarin_myway_en_hsk_3.tsv"),
    ("anki_mandarin_myway_hsk_4.tsv", "anki_mandarin_myway_en_hsk_4.tsv"),
    ("anki_mandarin_myway_hsk_5.tsv", "anki_mandarin_myway_en_hsk_5.tsv"),
    ("anki_mandarin_myway_hsk_6.tsv", "anki_mandarin_myway_en_hsk_6.tsv"),
    ("anki_mandarin_myway_hsk_7_9.tsv", "anki_mandarin_myway_en_hsk_7_9.tsv"),
]

# ─── Parse CEDICT ─────────────────────────────────────────────────────────────
def parse_cedict():
    """Parse CC-CEDICT file into a dict of simplified → list of (pinyin, definitions)."""
    entries = {}
    with open(CEDICT_FILE, "r", encoding="utf-8") as f:
        for line in f:
            if line.startswith("#"):
                continue
            m = re.match(r"(\S+)\s+(\S+)\s+\[([^\]]+)\]\s+/(.+)/", line.strip())
            if m:
                simplified = m.group(2)
                pinyin = m.group(3)
                raw_defs = m.group(4)
                if simplified not in entries:
                    entries[simplified] = []
                entries[simplified].append((pinyin, raw_defs))
    return entries

def clean_cedict_definition(raw_defs):
    """Clean up a CEDICT definition string for flashcard use."""
    # Split by / to get individual definitions
    parts = raw_defs.split("/")
    cleaned = []
    for p in parts:
        p = p.strip()
        # Skip classifier entries like CL:個|个[ge4]
        if p.startswith("CL:"):
            continue
        # Skip "surname X" entries
        if p.startswith("surname "):
            continue
        # Skip "old variant of" entries
        if p.startswith("old variant of"):
            continue
        # Skip "variant of" entries
        if p.startswith("variant of"):
            continue
        # Skip "see " cross-references
        if p.startswith("see ") and "[" in p:
            continue
        # Skip "abbr. for" entries
        if p.startswith("abbr. for") or p.startswith("abbr. of"):
            continue
        # Skip "also written" entries
        if p.startswith("also written"):
            continue
        # Skip "same as" entries
        if p.startswith("same as"):
            continue
        # Skip "erhua variant of" entries
        if p.startswith("erhua variant of"):
            continue
        # Skip figurative political meanings for color words etc.
        if p.startswith("fig. reactionary") or p.startswith("anti-communist"):
            continue
        # Remove (bound form) prefix but keep content
        p = p.replace("(bound form) ", "")
        # Remove (literary) prefix
        p = p.replace("(literary) ", "")
        # Remove leading "to be " where it's redundant with adj
        # Keep classifier info in parens
        # Remove Taiwan pronunciation notes
        p = re.sub(r"\(Taiwan pr\. \[[^\]]+\]\)", "", p).strip()
        # Remove pinyin references in brackets at end
        p = re.sub(r"\s*\([^\)]*\[[\w\d]+\][^\)]*\)", "", p).strip()
        # Remove (esp.) and similar
        p = re.sub(r"\(esp\.\)\s*", "", p).strip()
        if p:
            cleaned.append(p)

    if not cleaned:
        # Fallback: return the first non-empty definition
        for p in raw_defs.split("/"):
            p = p.strip()
            if p:
                return p
        return raw_defs

    # Limit to first 4 definitions to keep it concise
    result = "; ".join(cleaned[:4])
    return result

# Manual translations for words not in CEDICT or with special forms
MANUAL_MEANINGS = {
    "有时（候）": "sometimes",
    "差（一）点儿": "almost; nearly",
    "要不（然）": "otherwise; or else",
    "凡（是）": "every; all; any",
    "新媒体": "new media",
    "新能源": "new energy; renewable energy",
    "不予": "to not grant; to refuse to",
    "精彩纷呈": "rich and varied; dazzling; spectacular",
    "居于": "to be situated at; to occupy (a position)",
    "口哨儿": "whistle (sound)",
    "两翼": "two wings; two flanks (fig.)",
    "压轴": "grand finale; showstopper",
    "致力于": "to devote oneself to; to be committed to",
    "差（一）点（儿）": "almost; nearly",
    # Handle erhua variant lookups
    "差点儿": "almost; nearly",
}

def get_best_cedict_meaning(entries, simplified, french_meaning=""):
    """Get the best CEDICT definition for a simplified Chinese word."""
    # Check manual map first
    if simplified in MANUAL_MEANINGS:
        return MANUAL_MEANINGS[simplified]

    simp_clean = re.sub(r"\d+$", "", simplified)  # Strip trailing numbers like 看1

    if simp_clean in MANUAL_MEANINGS:
        return MANUAL_MEANINGS[simp_clean]

    # Try removing parenthesized optional characters: 有时（候）→ 有时候
    if "（" in simp_clean:
        expanded = re.sub(r"[（）]", "", simp_clean)
        if expanded in entries:
            return clean_cedict_definition(get_best_entry(entries, expanded, french_meaning))
        # Also try without optional part
        collapsed = re.sub(r"（[^）]*）", "", simp_clean)
        if collapsed in entries:
            return clean_cedict_definition(get_best_entry(entries, collapsed, french_meaning))

    if simp_clean not in entries:
        return None

    return clean_cedict_definition(get_best_entry(entries, simp_clean, french_meaning))

def get_best_entry(entries, key, french_meaning=""):
    """Pick the best raw_defs string from multiple CEDICT entries for a key."""
    all_entries = entries[key]

    if len(all_entries) == 1:
        return all_entries[0][1]

    # Multiple entries - try to pick the best one
    best = None
    best_score = -1

    for pinyin, raw_defs in all_entries:
        defs_lower = raw_defs.lower()
        score = 0

        # Penalize surname-only entries
        if raw_defs.startswith("surname ") and "/" not in raw_defs.split("surname ")[1]:
            score -= 10

        # Penalize "old variant" only entries
        if "old variant of" in defs_lower and defs_lower.count("/") <= 1:
            score -= 10

        # Penalize "erhua variant of" only entries
        if "erhua variant of" in defs_lower and defs_lower.count("/") <= 1:
            score -= 10

        # Reward entries with more definitions (usually the main entry)
        score += raw_defs.count("/")

        # Reward entries that match French meaning hints
        fr_lower = french_meaning.lower()
        if "verbe" in fr_lower or french_meaning.startswith("to ") or french_meaning.startswith("faire"):
            if "to " in defs_lower:
                score += 5
        if "nom" in fr_lower or "noun" in fr_lower:
            if "to " not in defs_lower.split("/")[0]:
                score += 3

        if score > best_score:
            best_score = score
            best = raw_defs

    return best if best else all_entries[0][1]


# ─── Tag Translation ──────────────────────────────────────────────────────────
# Comprehensive French→English tag mapping
# Tags can be compound: "action/corps" → "action/body"
TAG_WORD_MAP = {
    # Part of speech
    "nom": "noun",
    "verbe": "verb",
    "adjectif": "adjective",
    "adverbe": "adverb",
    "conjonction": "conjunction",
    "préposition": "preposition",
    "pronom": "pronoun",
    "classificateur": "classifier",
    "particule": "particle",
    "interjection": "interjection",
    "démonstratif": "demonstrative",
    "interrogatif": "interrogative",
    "indéfini": "indefinite",
    "impératif": "imperative",
    "modal": "modal",
    "pluriel": "plural",
    "adj": "adj",
    "adj.": "adj.",
    "adv.": "adv.",
    "adj./nom": "adj./noun",
    "adj./verbe": "adj./verb",
    "adj./adv.": "adj./adv.",
    "adj./adverbe": "adj./adverb",
    "adj./expr.": "adj./expr.",
    "adj./expression": "adj./expression",
    "adj./idiome": "adj./idiom",
    "adj./complément": "adj./complement",
    "adj./préfixe": "adj./prefix",
    "adj/adv": "adj/adv",
    "adj/nom": "adj/noun",
    "adj/verbe": "adj/verb",
    "adj/verbe (modal)": "adj/verb (modal)",
    "adj/verbe/adv": "adj/verb/adv",
    "adj_verbal": "verbal_adj",
    "adjectif / adverbe": "adjective / adverb",
    "adjectif / nom": "adjective / noun",
    "adjectif / verbe": "adjective / verb",
    "adjectif/adv": "adjective/adv",
    "adjectif/adverbe": "adjective/adverb",
    "adjectif/expr": "adjective/expr",
    "adjectif/nom": "adjective/noun",
    "adjectif_adverbe": "adjective_adverb",
    "verbe/nom": "verb/noun",
    "verbe / nom": "verb / noun",
    "verbe/adj.": "verb/adj.",
    "verbe/adj": "verb/adj",
    "verbe (fam.)": "verb (coll.)",
    "adj. (litt.)": "adj. (lit.)",
    "adj./verbe (fam.)": "adj./verb (coll.)",
    "nom/verbe": "noun/verb",
    "nom / verbe": "noun / verb",

    # Topics / Categories
    "émotion": "emotion",
    "quotidien": "daily",
    "grammaire": "grammar",
    "chiffre": "number",
    "famille": "family",
    "temps": "time",
    "quantité": "quantity",
    "nourriture": "food",
    "cuisine": "cooking",
    "boisson": "drink",
    "culture": "culture",
    "loisir": "leisure",
    "lieu": "place",
    "shopping": "shopping",
    "transport": "transport",
    "voyage": "travel",
    "politesse": "politeness",
    "salutation": "greeting",
    "négation": "negation",
    "communication": "communication",
    "technologie": "technology",
    "travail": "work",
    "question": "question",
    "étude": "study",
    "études": "studies",
    "profession": "profession",
    "relation": "relationship",
    "personne": "person",
    "direction": "direction",
    "déplacement": "movement",
    "météo": "weather",
    "santé": "health",
    "argent": "money",
    "mesure": "measure",
    "vêtements": "clothing",
    "animal": "animal",
    "animaux": "animals",
    "éducation": "education",
    "commerce": "commerce",
    "fruit": "fruit",
    "genre": "genre",
    "position": "position",
    "musique": "music",
    "objet": "object",
    "concept": "concept",
    "transaction": "transaction",
    "âge": "age",
    "langue": "language",
    "degré": "degree",
    "perception": "perception",
    "action": "action",
    "médecine": "medicine",
    "capacité": "ability",
    "meuble": "furniture",
    "addition": "addition",
    "nombre": "number",
    "pays": "country",
    "nature": "nature",
    "jour": "day",
    "routine": "routine",
    "expression": "expression",
    "réponse": "response",
    "téléphone": "phone",
    "choix": "choice",
    "mot": "word",
    "titre": "title",
    "couleur": "color",
    "école": "school",
    "sport": "sport",
    "mouvement": "movement",
    "corps": "body",
    "maison": "house",
    "pièce": "room",
    "art": "art",
    "internet": "internet",
    "international": "international",
    "hygiène": "hygiene",
    "environnement": "environment",
    "espace": "space",
    "examen": "exam",
    "exercice": "exercise",
    "fête": "festival",
    "célébration": "celebration",
    "calendrier": "calendar",
    "social": "social",
    "société": "society",
    "enfance": "childhood",
    "accessoire": "accessory",
    "comparaison": "comparison",
    "contraste": "contrast",
    "excuse": "excuse",
    "formulaire": "form",
    "fréquence": "frequency",
    "futur": "future",
    "identité": "identity",
    "manière": "manner",
    "apparence": "appearance",
    "achèvement": "completion",
    "causatif": "causative",
    "aspect": "aspect",
    "complément": "complement",
    "distance": "distance",
    "durée": "duration",
    "thé": "tea",
    "tradition": "tradition",
    "écriture": "writing",
    "vie": "life",
    "négatif": "negative",
    "positif": "positive",
    "polyvalent": "versatile",
    "pensée": "thought",
    "idiome": "idiom",
    "oral": "colloquial",
    "physique": "physical",
    "qualité": "quality",
    "description": "description",
    "organisation": "organization",
    "économie": "economy",
    "politique": "politics",
    "finance": "finance",
    "droit": "law",
    "science": "science",
    "géographie": "geography",
    "attitude": "attitude",
    "caractère": "character",
    "formel": "formal",
    "administratif": "administrative",
    "administration": "administration",
    "événement": "event",
    "état": "state",
    "psychologie": "psychology",
    "conflit": "conflict",
    "comportement": "behavior",
    "évaluation": "evaluation",
    "abstrait": "abstract",
    "registre soutenu": "formal register",
    "militaire": "military",
    "religion": "religion",
    "philosophie": "philosophy",
    "histoire": "history",
    "agriculture": "agriculture",
    "architecture": "architecture",
    "astronomie": "astronomy",
    "biologie": "biology",
    "chimie": "chemistry",
    "mathématiques": "mathematics",
    "musique": "music",
    "littérature": "literature",
    "cinéma": "cinema",
    "théâtre": "theater",
    "danse": "dance",
    "peinture": "painting",
    "sculpture": "sculpture",
    "photographie": "photography",
    "informatique": "computing",
    "industrie": "industry",
    "logistique": "logistics",
    "stratégie": "strategy",
    "tactique": "tactics",
    "hiérarchie": "hierarchy",
    "emploi": "employment",
    "salaire": "salary",
    "entreprise": "business",
    "marché": "market",
    "bourse": "stock market",
    "investissement": "investment",
    "comptabilité": "accounting",
    "fiscalité": "taxation",
    "urbanisme": "urban planning",
    "construction": "construction",
    "matériau": "material",
    "outil": "tool",
    "machine": "machine",
    "énergie": "energy",
    "électricité": "electricity",
    "eau": "water",
    "feu": "fire",
    "terre": "earth",
    "air": "air",
    "métal": "metal",
    "bois": "wood",
    "pierre": "stone",
    "verre": "glass",
    "plastique": "plastic",
    "textile": "textile",
    "papier": "paper",
    "livre": "book",
    "journal": "newspaper",
    "média": "media",
    "radio": "radio",
    "télévision": "television",
    "publicité": "advertising",
    "marketing": "marketing",
    "justice": "justice",
    "violence": "violence",
    "secret": "secret",
    "mystère": "mystery",
    "aventure": "adventure",
    "danger": "danger",
    "désastre": "disaster",
    "accident": "accident",
    "crise": "crisis",
    "urgence": "emergency",
    "sécurité": "security",
    "défense": "defense",
    "attaque": "attack",
    "victoire": "victory",
    "défaite": "defeat",
    "paix": "peace",
    "guerre": "war",
    "diplomatie": "diplomacy",
    "négociation": "negotiation",
    "accord": "agreement",
    "contrat": "contract",
    "propriété": "property",
    "héritage": "heritage",
    "noblesse": "nobility",
    "royal": "royal",
    "impérial": "imperial",
    "République": "republic",
    "démocratie": "democracy",
    "élection": "election",
    "vote": "vote",
    "loi": "law",
    "règle": "rule",
    "discipline": "discipline",
    "ordre": "order",
    "chaos": "chaos",
    "hasard": "chance",
    "destin": "fate",
    "chance": "luck",
    "bonheur": "happiness",
    "malheur": "misfortune",
    "souffrance": "suffering",
    "douleur": "pain",
    "joie": "joy",
    "tristesse": "sadness",
    "colère": "anger",
    "peur": "fear",
    "surprise": "surprise",
    "dégoût": "disgust",
    "mépris": "contempt",
    "respect": "respect",
    "admiration": "admiration",
    "fierté": "pride",
    "honte": "shame",
    "culpabilité": "guilt",
    "amour": "love",
    "haine": "hate",
    "jalousie": "jealousy",
    "envie": "envy",
    "désir": "desire",
    "espoir": "hope",
    "nostalgie": "nostalgia",
    "solitude": "solitude",
    "liberté": "freedom",
    "prison": "prison",
    "esclavage": "slavery",
    "dignité": "dignity",
    "honneur": "honor",
    "courage": "courage",
    "lâcheté": "cowardice",
    "sagesse": "wisdom",
    "folie": "madness",
    "génie": "genius",
    "talent": "talent",
    "compétence": "skill",
    "expérience": "experience",
    "connaissance": "knowledge",
    "ignorance": "ignorance",
    "erreur": "error",
    "succès": "success",
    "échec": "failure",
    "progrès": "progress",
    "stagnation": "stagnation",
    "déclin": "decline",
    "renaissance": "renaissance",
    "révolution": "revolution",
    "évolution": "evolution",
    "changement": "change",
    "stabilité": "stability",
    "équilibre": "balance",
    "harmonie": "harmony",
    "confiance": "trust",
    "trahison": "betrayal",
    "fidélité": "loyalty",
    "engagement": "commitment",
    "responsabilité": "responsibility",
    "obligation": "obligation",
    "permission": "permission",
    "interdiction": "prohibition",
    "récompense": "reward",
    "punition": "punishment",
    "pardon": "forgiveness",
    "vengeance": "revenge",
    "sacrifice": "sacrifice",
    "générosité": "generosity",
    "avarice": "greed",
    "modestie": "modesty",
    "arrogance": "arrogance",
    "patience": "patience",
    "impatience": "impatience",
    "persévérance": "perseverance",
    "abandon": "abandonment",
    "motivation": "motivation",
    "inspiration": "inspiration",
    "créativité": "creativity",
    "imagination": "imagination",
    "mémoire": "memory",
    "oubli": "forgetfulness",
    "concentration": "concentration",
    "distraction": "distraction",
    "logique": "logic",
    "intuition": "intuition",
    "raison": "reason",
    "passion": "passion",
    "tempérament": "temperament",
    "humeur": "mood",
    "sentiment": "feeling",
    "sensation": "sensation",
    "instinct": "instinct",
    "réflexe": "reflex",
    "habitude": "habit",
    "addiction": "addiction",
    "sobriété": "sobriety",
    "ivresse": "drunkenness",
    "sommeil": "sleep",
    "rêve": "dream",
    "cauchemar": "nightmare",
    "réalité": "reality",
    "illusion": "illusion",
    "vérité": "truth",
    "mensonge": "lie",
    "sincérité": "sincerity",
    "hypocrisie": "hypocrisy",
    "authenticité": "authenticity",
    "imitation": "imitation",
    "originalité": "originality",
    "tradition": "tradition",
    "innovation": "innovation",
    "modernité": "modernity",
    "antiquité": "antiquity",
    "classique": "classic",
    "contemporain": "contemporary",
    "populaire": "popular",
    "académique": "academic",
    "scientifique": "scientific",
    "technique": "technical",
    "pratique": "practical",
    "théorique": "theoretical",
    "philosophique": "philosophical",
    "artistique": "artistic",
    "esthétique": "aesthetic",
    "moral": "moral",
    "éthique": "ethical",
    "spirituel": "spiritual",
    "matériel": "material",
    "physique": "physical",
    "intellectuel": "intellectual",
    "culturel": "cultural",
    "naturel": "natural",
    "artificiel": "artificial",
    "réel": "real",
    "virtuel": "virtual",
    "domestique": "domestic",
    "sauvage": "wild",
    "végétal": "plant",
    "minéral": "mineral",
    "chimique": "chemical",
    "nucléaire": "nuclear",
    "spatial": "spatial",
    "temporel": "temporal",
    "permanent": "permanent",
    "temporaire": "temporary",
    "urgent": "urgent",
    "quotidien": "daily",
    "hebdomadaire": "weekly",
    "mensuel": "monthly",
    "annuel": "annual",
    "abondance": "abundance",
    "absence": "absence",
    "accumulation": "accumulation",
    "accès": "access",
    "achat": "purchase",
    "acquisition": "acquisition",
    "adaptation": "adaptation",
    "adhésion": "membership",
    "adieu": "farewell",
    "accompagnement": "accompaniment",
    "accomplissement": "accomplishment",
    "accueil": "reception",
    "actualité": "current affairs",
    "activité": "activity",
    "activité physique": "physical activity",
    "fig.": "fig.",
    "fam.": "coll.",
    "figuré": "figurative",
    "familier": "colloquial",
    "littéraire": "literary",
    "rare": "rare",
    "péjoratif": "pejorative",
    "soutenu": "formal",
    "argot": "slang",
    "technique": "technical",
    "spécialisé": "specialized",
    "courant": "common",
    "usuel": "usual",
    "ancien": "ancient",
    "moderne": "modern",
    "officiel": "official",
    "informel": "informal",
    "écrit": "written",
    "académie": "academy",
    "objectif": "objective",
    "subjectif": "subjective",
    "relatif": "relative",
    "absolu": "absolute",
    "général": "general",
    "particulier": "particular",
    "spécifique": "specific",
    "universel": "universal",
    "individuel": "individual",
    "collectif": "collective",
    "public": "public",
    "privé": "private",
    "intérieur": "interior",
    "extérieur": "exterior",
    "supérieur": "superior",
    "inférieur": "inferior",
    "principal": "principal",
    "secondaire": "secondary",
    "essentiel": "essential",
    "accessoire": "accessory",
    "nécessaire": "necessary",
    "suffisant": "sufficient",
    "exact": "exact",
    "approximatif": "approximate",
    "minimum": "minimum",
    "maximum": "maximum",
    "moyen": "medium",
    "extrême": "extreme",
    "modéré": "moderate",
    "intense": "intense",
    "léger": "light",
    "lourd": "heavy",
    "simple": "simple",
    "complexe": "complex",
    "facile": "easy",
    "difficile": "difficult",
    "possible": "possible",
    "impossible": "impossible",
    "probable": "probable",
    "certain": "certain",
    "douteux": "doubtful",
    "évident": "obvious",
    "mystérieux": "mysterious",
    "inconnu": "unknown",
    "célèbre": "famous",
    "ordinaire": "ordinary",
    "extraordinaire": "extraordinary",
    "normal": "normal",
    "anormal": "abnormal",
    "étrange": "strange",
    "bizarre": "bizarre",
    "curieux": "curious",
    "intéressant": "interesting",
    "ennuyeux": "boring",
    "amusant": "amusing",
    "sérieux": "serious",
    "drôle": "funny",
    "tragique": "tragic",
    "comique": "comic",
    "dramatique": "dramatic",
    "romantique": "romantic",
    "poétique": "poetic",
    "chute": "fall",
    "filtrage": "filtering",
    "force": "force",
    "vitesse": "speed",
    "violent(rare)": "violent(rare)",
    "opportunité": "opportunity",
    "BTP": "construction",
    "CL": "classifier",
    "Chine": "China",
    "Beijing": "Beijing",
    # Extra compound tags that appear frequently
    "action involontaire": "involuntary action",
    "action spéciale": "special action",
    "registre soutenu": "formal register",

    # Additional tag words found in HSK 2-9
    "intensité": "intensity",
    "médias": "media",
    "vêtement": "clothing",
    "compétition": "competition",
    "création": "creation",
    "décision": "decision",
    "goût": "taste",
    "développement": "development",
    "bâtiment": "building",
    "matière": "material",
    "contrôle": "control",
    "personnalité": "personality",
    "passé": "past",
    "température": "temperature",
    "amélioration": "improvement",
    "période": "period",
    "totalité": "totality",
    "lumière": "light",
    "séparation": "separation",
    "méthode": "method",
    "armée": "military",
    "éloge": "praise",
    "réflexion": "reflection",
    "précision": "precision",
    "nécessité": "necessity",
    "beauté": "beauty",
    "étendue": "extent",
    "séquence": "sequence",
    "répétition": "repetition",
    "référence": "reference",
    "présentation": "presentation",
    "médical": "medical",
    "géo": "geo",
    "continuité": "continuity",
    "conséquence": "consequence",
    "édition": "publishing",
    "véhicule": "vehicle",
    "volonté": "will",
    "représentation": "representation",
    "mathématique": "mathematics",
    "difficulté": "difficulty",
    "clarté": "clarity",
    "unité": "unit",
    "prévention": "prevention",
    "présent": "present",
    "priorité": "priority",
    "possibilité": "possibility",
    "mécanique": "mechanical",
    "géométrie": "geometry",
    "funéraire": "funeral",
    "excès": "excess",
    "coïncidence": "coincidence",
    "compréhension": "comprehension",
    "commodité": "convenience",
    "carrière": "career",
    "émotions": "emotions",
    "solidarité": "solidarity",
    "scène": "scene",
    "réputation": "reputation",
    "récit": "narrative",
    "renommée": "fame",
    "préparation": "preparation",
    "préférence": "preference",
    "précieux": "precious",
    "nouveauté": "novelty",
    "intérêt": "interest",
    "facilité": "ease",
    "enquête": "investigation",
    "efficacité": "efficiency",
    "coopération": "cooperation",
    "catégorie": "category",
    "adéquation": "adequacy",
    "élément": "element",
    "éco": "eco",
    "vérification": "verification",
    "variété": "variety",
    "temporalité": "temporality",
    "sélection": "selection",
    "symptôme": "symptom",
    "similarité": "similarity",
    "connexion": "connection",
    "apprentissage": "learning",
    "prép.": "prep.",
    "prép": "prep",
    "conj.": "conj.",
    "analyse": "analysis",
    "morale": "morals",
    "sécurité": "security",
    "résistance": "resistance",
    "propreté": "cleanliness",
    "capacité": "ability",
    "réussite": "success",
    "habileté": "skill",
    "régularité": "regularity",
    "identité": "identity",
    "dépense": "expense",
    "stratégie": "strategy",
    "résultat": "result",
    "hiérarchie": "hierarchy",
    "céréale": "cereal",
    "responsabilité": "responsibility",
    "compétence": "competence",
    "détermination": "determination",
    "quantification": "quantification",
    "vitalité": "vitality",
    "visibilité": "visibility",
    "uniformité": "uniformity",
    "unanimité": "unanimity",
    "évitement": "avoidance",
    "évidence": "evidence",
    "étonnement": "astonishment",
    "établissement": "establishment",
    "équivalence": "equivalence",
    "équipement": "equipment",
    "équipe": "team",
    "épice": "spice",
    "énumération": "enumeration",
    "émission": "broadcast",
    "émergence": "emergence",
    "écoute": "listening",
    "écologie": "ecology",
    "éclairage": "lighting",
    "échelle": "scale",
    "échange": "exchange",
    "écart": "gap",
    "végétation": "vegetation",
    "vécu": "experience",
    "concours": "contest",
    "sommeil": "sleep",
    "posture": "posture",
    "subir": "endure",
    "préfixe": "prefix",
    "suffixe": "suffix",
    "dans composés": "in compounds",
    "vie privée": "privacy",
    "verbe (écrit)": "verb (written)",
    "prép/conj": "prep/conj",
    "réseau": "network",
    "délimitation": "delimitation",
    "opération": "operation",
    "réparation": "repair",
    "restauration": "restoration",
    "rémunération": "remuneration",
    "négociation": "negotiation",
    "célébration": "celebration",
    "transformation": "transformation",
    "recommandation": "recommendation",
    "spécialité": "specialty",
    "supériorité": "superiority",
    "infériorité": "inferiority",
    "majorité": "majority",
    "minorité": "minority",
    "réalité": "reality",
    "électricité": "electricity",
    "publicité": "advertising",
    "activité": "activity",
    "objectivité": "objectivity",
    "subjectivité": "subjectivity",
    "sincérité": "sincerity",
    "curiosité": "curiosity",
    "générosité": "generosity",
    "diversité": "diversity",
    "adversité": "adversity",
    "prospérité": "prosperity",
    "postérité": "posterity",
    "proximité": "proximity",
    "complexité": "complexity",
    "simplicité": "simplicity",
    "multiplicité": "multiplicity",
    "authenticité": "authenticity",
    "spécificité": "specificity",
    "réciprocité": "reciprocity",
    "officiel": "official",
    "artificiel": "artificial",
    "superficiel": "superficial",
    "essentiel": "essential",
    "potentiel": "potential",
    "accidentel": "accidental",
    "traditionnel": "traditional",
    "professionnel": "professional",
    "émotionnel": "emotional",
    "conditionnel": "conditional",
    "institutionnel": "institutional",
    "fonctionnel": "functional",
    "conventionnel": "conventional",
    "exceptionnel": "exceptional",
    "rationnel": "rational",
    "irrationnel": "irrational",
    "hypothétique": "hypothetical",
    "systématique": "systematic",
    "problématique": "problematic",
    "thématique": "thematic",
    "automatique": "automatic",
    "informatique": "computing",
    "diplomatique": "diplomatic",
    "mathématique": "mathematical",
    "grammatique": "grammatical",
    "énergétique": "energetic",
    "synthétique": "synthetic",
    "pathétique": "pathetic",
    "magnétique": "magnetic",
    "génétique": "genetic",
    "cosmétique": "cosmetic",
    "algébrique": "algebraic",
    "atmosphérique": "atmospheric",
    "géographique": "geographic",
    "démographique": "demographic",
    "bibliographique": "bibliographic",
    "photographique": "photographic",
    "chronologique": "chronological",
    "technologique": "technological",
    "idéologique": "ideological",
    "archéologique": "archaeological",
    "psychologique": "psychological",
    "sociologique": "sociological",
    "biologique": "biological",
    "écologique": "ecological",
    "physiologique": "physiological",
    "méthodologique": "methodological",
    "étymologique": "etymological",
    "nostalgie": "nostalgia",
    "énergie": "energy",
    "allergie": "allergy",
    "chirurgie": "surgery",
    "liturgie": "liturgy",
    "stratégie": "strategy",
    "analogie": "analogy",
    "trilogie": "trilogy",
    "idéologie": "ideology",
    "technologie": "technology",
    "méthodologie": "methodology",
    "archéologie": "archaeology",
    "mythologie": "mythology",
    "astrologie": "astrology",
    "cosmologie": "cosmology",
    "anthropologie": "anthropology",
    "sociologie": "sociology",
    "biologie": "biology",
    "physiologie": "physiology",
    "zoologie": "zoology",
    "minéralogie": "mineralogy",
    "géologie": "geology",
    "pharmacologie": "pharmacology",
    "statistiques": "statistics",
    "céramique": "ceramics",
    "spécialisation": "specialization",
    "globalisation": "globalization",
    "normalisation": "normalization",
    "localisation": "localization",
    "réalisation": "realization",
    "utilisation": "utilization",
    "civilisation": "civilization",
    "urbanisation": "urbanization",
    "modernisation": "modernization",
    "optimisation": "optimization",
    "improvisation": "improvisation",
    "communication": "communication",
    "classification": "classification",
    "modification": "modification",
    "identification": "identification",
    "notification": "notification",
    "qualification": "qualification",
    "vérification": "verification",
    "signification": "meaning",
    "planification": "planning",
    "unification": "unification",
    "purification": "purification",
    "fortification": "fortification",
    "justification": "justification",
    "rectification": "rectification",
    "certification": "certification",
    "satisfaction": "satisfaction",
    "abstraction": "abstraction",
    "attraction": "attraction",
    "extraction": "extraction",
    "distraction": "distraction",
    "contraction": "contraction",
    "soustraction": "subtraction",
    "interaction": "interaction",
    "transaction": "transaction",
    "réaction": "reaction",
    "rédaction": "editing",
    "infraction": "infraction",
    "fraction": "fraction",
    "instruction": "instruction",
    "construction": "construction",
    "destruction": "destruction",
    "production": "production",
    "introduction": "introduction",
    "reproduction": "reproduction",
    "réduction": "reduction",
    "traduction": "translation",
    "induction": "induction",
    "déduction": "deduction",
    "conduction": "conduction",
    "corruption": "corruption",
    "interruption": "interruption",
    "éruption": "eruption",
    "absorption": "absorption",
    "perception": "perception",
    "réception": "reception",
    "conception": "conception",
    "exception": "exception",
    "déception": "disappointment",
    "inscription": "registration",
    "prescription": "prescription",
    "description": "description",
    "transcription": "transcription",
    "proscription": "proscription",
    "attention": "attention",
    "intention": "intention",
    "prétention": "pretension",
    "rétention": "retention",
    "détention": "detention",
    "abstention": "abstention",
    "convention": "convention",
    "intervention": "intervention",
    "prévention": "prevention",
    "invention": "invention",
    "dimension": "dimension",
    "extension": "extension",
    "tension": "tension",
    "pension": "pension",
    "suspension": "suspension",
    "expansion": "expansion",
    "expression": "expression",
    "impression": "impression",
    "compression": "compression",
    "suppression": "suppression",
    "progression": "progression",
    "régression": "regression",
    "transgression": "transgression",
    "agression": "aggression",
    "session": "session",
    "obsession": "obsession",
    "possession": "possession",
    "succession": "succession",
    "concession": "concession",
    "profession": "profession",
    "confession": "confession",
    "admission": "admission",
    "permission": "permission",
    "transmission": "transmission",
    "émission": "broadcast",
    "commission": "commission",
    "soumission": "submission",
    "mission": "mission",
    "tradition": "tradition",
    "condition": "condition",
    "addition": "addition",
    "édition": "publishing",
    "position": "position",
    "exposition": "exhibition",
    "composition": "composition",
    "disposition": "disposition",
    "opposition": "opposition",
    "proposition": "proposal",
    "supposition": "supposition",
    "imposition": "imposition",
    "décomposition": "decomposition",
    "transition": "transition",
    "nutrition": "nutrition",
    "intuition": "intuition",
    "substitution": "substitution",
    "institution": "institution",
    "constitution": "constitution",
    "destitution": "destitution",
    "restitution": "restitution",
    "contribution": "contribution",
    "distribution": "distribution",
    "attribution": "attribution",
    "pollution": "pollution",
    "solution": "solution",
    "résolution": "resolution",
    "révolution": "revolution",
    "évolution": "evolution",
    "dissolution": "dissolution",
    "illusion": "illusion",
    "conclusion": "conclusion",
    "exclusion": "exclusion",
    "inclusion": "inclusion",
    "confusion": "confusion",
    "diffusion": "diffusion",
    "infusion": "infusion",
    "fusion": "fusion",
    "intrusion": "intrusion",
    "extrusion": "extrusion",

    # Remaining French tag words found in HSK 2-9
    "rôle": "role",
    "présence": "presence",
    "métier": "trade/profession",
    "intégration": "integration",
    "inquiétude": "worry",
    "illégal": "illegal",
    "dépendance": "dependence",
    "arrêt": "stop",
    "élevage": "breeding",
    "récent": "recent",
    "règles": "rules",
    "rhétorique": "rhetoric",
    "prévision": "forecast",
    "phonétique": "phonetic",
    "ingénierie": "engineering",
    "entraînement": "training",
    "désordre": "disorder",
    "départ": "departure",
    "débat": "debate",
    "données": "data",
    "coût": "cost",
    "complétude": "completeness",
    "caractéristique": "characteristic",
    "égalité": "equality",
    "sévérité": "severity",
    "révélation": "revelation",
    "réservation": "reservation",
    "région": "region",
    "rafraîchissement": "refreshment",
    "présage": "omen",
    "préjudice": "prejudice",
    "protéger": "protection",
    "phénomène": "phenomenon",
    "numérique": "digital",
    "métaphore": "metaphor",
    "mérite": "merit",
    "musée": "museum",
    "modération": "moderation",
    "légalité": "legality",
    "héritage": "heritage",
    "hiérarchie": "hierarchy",
    "inférieur": "inferior",
    "supérieur": "superior",
    "intérieur": "interior",
    "extérieur": "exterior",
    "antérieur": "anterior",
    "postérieur": "posterior",
    "ultérieur": "further",
    "immédiat": "immediate",
    "intermédiaire": "intermediate",
    "propriétaire": "owner",
    "supplémentaire": "additional",
    "complémentaire": "complementary",
    "alimentaire": "food-related",
    "documentaire": "documentary",
    "parlementaire": "parliamentary",
    "élémentaire": "elementary",
    "humanitaire": "humanitarian",
    "sécuritaire": "security-related",
    "autoritaire": "authoritarian",
    "prioritaire": "priority",
    "déficitaire": "deficit",
    "excédentaire": "surplus",
    "bénéficiaire": "beneficiary",
    "solitaire": "solitary",
    "involontaire": "involuntary",
    "volontaire": "voluntary",
    "héréditaire": "hereditary",
    "sédentaire": "sedentary",
    "cérémonie": "ceremony",
    "compétitivité": "competitiveness",
    "authenticité": "authenticity",
    "spécificité": "specificity",
    "productivité": "productivity",
    "sensibilité": "sensitivity",
    "accessibilité": "accessibility",
    "compatibilité": "compatibility",
    "responsabilité": "responsibility",
    "durabilité": "durability",
    "fiabilité": "reliability",
    "faisabilité": "feasibility",
    "rentabilité": "profitability",
    "stabilité": "stability",
    "possibilité": "possibility",
    "mobilité": "mobility",
    "flexibilité": "flexibility",
    "probabilité": "probability",
    "crédibilité": "credibility",
    "visibilité": "visibility",
    "pénibilité": "difficulty",
    "hostilité": "hostility",
    "fertilité": "fertility",
    "stérilité": "sterility",
    "humilité": "humility",
    "tranquillité": "tranquility",
    "criminalité": "crime rate",
    "nationalité": "nationality",
    "municipalité": "municipality",
    "originalité": "originality",
    "hospitalité": "hospitality",
    "brutalité": "brutality",
    "mentalité": "mentality",
    "sentimentalité": "sentimentality",
    "anormalité": "abnormality",
    "formalité": "formality",
    "normalité": "normality",
    "rivalité": "rivalry",
    "festivité": "festivity",
    "relativité": "relativity",
    "activité": "activity",
    "collectivité": "community",
    "objectivité": "objectivity",
    "subjectivité": "subjectivity",
    "réceptivité": "receptivity",
    "fête": "festival",
    "forêt": "forest",
    "intérêt": "interest",
    "conquête": "conquest",
    "requête": "request",
    "enquête": "investigation",
    "quête": "quest",
    "tempête": "storm",
    "rêve": "dream",
    "grève": "strike",
    "élève": "student",
    "achèvement": "completion",
    "événement": "event",
    "enlèvement": "removal",
    "soulèvement": "uprising",
    "relèvement": "recovery",
    "prélèvement": "levy",
    "règlement": "regulation",
    "complètement": "completely",
    "discrètement": "discreetly",
    "concrètement": "concretely",
    "secrètement": "secretly",
    "sévèrement": "severely",
    "sincèrement": "sincerely",
    "sérieusement": "seriously",
    "précédemment": "previously",
    "fréquemment": "frequently",
    "récemment": "recently",
    "évidemment": "obviously",
    "apparemment": "apparently",
    "généralement": "generally",
    "spécialement": "specially",
    "habituellement": "usually",
    "naturellement": "naturally",
    "personnellement": "personally",
    "traditionnellement": "traditionally",
    "professionnellement": "professionally",
    "occasionnellement": "occasionally",
    "exceptionnellement": "exceptionally",
    "intentionnellement": "intentionally",
    "proportionnellement": "proportionally",
    "émotionnellement": "emotionally",
    "conditionnellement": "conditionally",
    "conventionnellement": "conventionally",
    "fonctionnellement": "functionally",
    "institutionnellement": "institutionally",
    "constitutionnellement": "constitutionally",
    "inconditionnellement": "unconditionally",
    "industriellement": "industrially",
    "artificiellement": "artificially",
    "officiellement": "officially",
    "essentiellement": "essentially",
    "potentiellement": "potentially",
    "substantiellement": "substantially",
    "confidentiellement": "confidentially",
    "résidentiellement": "residentially",
    "expérientiellement": "experientially",
    "préférentiellement": "preferentially",
    "différentiellement": "differentially",
    "séquentiellement": "sequentially",
    "diplôme": "diploma",
    "contrôle": "control",
    "fantôme": "ghost",
    "symptôme": "symptom",
    "trône": "throne",
    "icône": "icon",
    "clôture": "fence",
    "hôte": "host",
    "côte": "coast",
    "côté": "side",
    "drôle": "funny",
    "tôt": "early",
    "plutôt": "rather",
    "bientôt": "soon",
    "aussitôt": "immediately",
    "entêté": "stubborn",
    "sûreté": "safety",
    "pureté": "purity",
    "pauvreté": "poverty",
    "propreté": "cleanliness",
    "honnêteté": "honesty",
    "lâcheté": "cowardice",
    "fierté": "pride",
    "liberté": "freedom",
    "impureté": "impurity",
    "netteté": "clarity",
    "cruauté": "cruelty",
    "loyauté": "loyalty",
    "royauté": "royalty",
    "nouveauté": "novelty",
    "débit": "debit",
    "crédit": "credit",
    "bénéfice": "benefit",
    "déficit": "deficit",
    "préface": "preface",
    "décès": "death",
    "procès": "trial",
    "accès": "access",
    "excès": "excess",
    "succès": "success",
    "progrès": "progress",
    "congrès": "congress",
    "intérêts": "interests",
    "forêts": "forests",
    "arrêts": "stops",
    "prêt": "loan/ready",
    "empêchement": "impediment",
    "rapprochement": "rapprochement",
    "bénédiction": "benediction",
    "prédiction": "prediction",
    "électrique": "electric",
    "géométrique": "geometric",
    "symétrique": "symmetric",
    "asymétrique": "asymmetric",
    "paramétrique": "parametric",
    "diélectrique": "dielectric",
    "arithmétique": "arithmetic",
    "hermétique": "hermetic",
    "esthétique": "aesthetic",
    "théorique": "theoretical",
    "allégorique": "allegorical",
    "catégorique": "categorical",
    "rhétorique": "rhetorical",
    "historique": "historical",
    "préhistorique": "prehistoric",
    "numérique": "digital",
    "générique": "generic",
    "périphérique": "peripheral",
    "sphérique": "spherical",
    "hémisphérique": "hemispheric",
    "atmosphérique": "atmospheric",
    "symétrique": "symmetric",
    "géométrique": "geometric",
    "diététique": "dietary",
    "prophétique": "prophetic",
    "synthétique": "synthetic",
    "empathétique": "empathetic",
    "sympathétique": "sympathetic",
    "pathétique": "pathetic",
    "économique": "economic",
    "gastronomique": "gastronomic",
    "ergonomique": "ergonomic",
    "astronomique": "astronomical",
    "taxonomique": "taxonomic",
    "anatomique": "anatomical",
    "dynamique": "dynamic",
    "céramique": "ceramic",
    "panoramique": "panoramic",
    "polémique": "polemic",
    "académique": "academic",
    "épidémique": "epidemic",
    "endémique": "endemic",
    "systémique": "systemic",
    "chimique": "chemical",
    "alchimique": "alchemical",
    "biochimique": "biochemical",
    "pétrochimique": "petrochemical",
    "géopolitique": "geopolitical",
    "néo": "neo",
    "mémo": "memo",
    "rénovation": "renovation",
    "rémunération": "remuneration",
    "dénomination": "denomination",
    "détérioration": "deterioration",
    "négligence": "negligence",
    "bénéfique": "beneficial",
    "spécifique": "specific",
    "magnifique": "magnificent",
    "pacifique": "pacific",
    "scientifique": "scientific",
    "honorifique": "honorific",
    "hiéroglyphique": "hieroglyphic",
    "maléfique": "malefic",
    "frigorifique": "refrigerating",
    "terrifique": "terrific",
    "horrifique": "horrific",
    "prolifique": "prolific",
    "mirifique": "mirific",
    "sudorifique": "sudorific",
    "calorifique": "calorific",
    "soporifique": "soporific",
    "désaccord": "disagreement",
    "déménagement": "moving",
    "aménagement": "arrangement",
    "ménage": "household",
    "démarche": "approach",
    "nécessité": "necessity",
    "sincérité": "sincerity",
    "sévérité": "severity",
    "prospérité": "prosperity",
    "austérité": "austerity",
    "postérité": "posterity",
    "antériorité": "anteriority",
    "intériorité": "interiority",
    "extériorité": "exteriority",
    "supériorité": "superiority",
    "infériorité": "inferiority",
    "majorité": "majority",
    "minorité": "minority",
    "autorité": "authority",
    "priorité": "priority",
    "charité": "charity",
    "parité": "parity",
    "popularité": "popularity",
    "solidarité": "solidarity",
    "familiarité": "familiarity",
    "singularité": "singularity",
    "régularité": "regularity",
    "particularité": "particularity",
    "modularité": "modularity",
    "circularité": "circularity",
    "musculaire": "muscular",
    "circulaire": "circular",
    "cellulaire": "cellular",
    "moléculaire": "molecular",
    "populaire": "popular",
    "spectaculaire": "spectacular",
    "particulaire": "particular",
    "perpendiculaire": "perpendicular",
    "rectangulaire": "rectangular",
    "triangulaire": "triangular",
    "séculaire": "secular",
    "oculaire": "ocular",
    "protéine": "protein",
    "caféine": "caffeine",
    "adrénaline": "adrenaline",
    "mélancolie": "melancholy",
    "thérapie": "therapy",
    "sympathie": "sympathy",
    "empathie": "empathy",
    "apathie": "apathy",
    "antipathie": "antipathy",
    "télépathie": "telepathy",
    "biographie": "biography",
    "géographie": "geography",
    "démographie": "demography",
    "photographie": "photography",
    "bibliographie": "bibliography",
    "filmographie": "filmography",
    "scénographie": "scenography",
    "chorégraphie": "choreography",
    "typographie": "typography",
    "calligraphie": "calligraphy",
    "philosophie": "philosophy",
    "chronologie": "chronology",
    "terminologie": "terminology",
    "étymologie": "etymology",
    "minéralogie": "mineralogy",
    "archéologie": "archaeology",
    "météorologie": "meteorology",
    "démocratie": "democracy",
    "bureaucratie": "bureaucracy",
    "aristocratie": "aristocracy",
    "méritocratie": "meritocracy",
    "théocratie": "theocracy",
    "plutocratie": "plutocracy",
    "autocratie": "autocracy",
    "télécommunication": "telecommunication",
    "rétroaction": "feedback",
    "méditation": "meditation",
    "hésitation": "hesitation",
    "précipitation": "precipitation",
    "réhabilitation": "rehabilitation",
    "préméditation": "premeditation",
    "interprétation": "interpretation",
    "représentation": "representation",
    "réglementation": "regulation",
    "sédimentation": "sedimentation",
    "complémentation": "complementation",
    "implémentation": "implementation",
    "expérimentation": "experimentation",
    "déforestation": "deforestation",
    "reforestation": "reforestation",
    "séquestration": "sequestration",
    "démonstration": "demonstration",
    "rémonstrance": "remonstrance",
    "rémunération": "remuneration",
    "régénération": "regeneration",
    "dégénération": "degeneration",
    "rénumération": "remuneration",
    "accélération": "acceleration",
    "décélération": "deceleration",
    "coopération": "cooperation",
    "récupération": "recuperation",
    "exaspération": "exasperation",
    "désespération": "desperation",
    "considération": "consideration",
    "reconsidération": "reconsideration",
    "modération": "moderation",
    "acculturation": "acculturation",
    "déculturation": "deculturation",
    "structuration": "structuring",
    "déstructuration": "destructuring",
    "restructuration": "restructuring",

    # Final batch of remaining French tag words
    "libération": "liberation",
    "inévitable": "inevitable",
    "intégralité": "integrity",
    "idées": "ideas",
    "hébergement": "accommodation",
    "génération": "generation",
    "généralité": "generality",
    "dévouement": "devotion",
    "délai": "deadline",
    "décoration": "decoration",
    "différence": "difference",
    "appréciation": "appreciation",
    "évaluation positive": "positive evaluation",
    "élite": "elite",
    "élections": "elections",
    "État": "state",
    "témoignage": "testimony",
    "thème": "theme",
    "série": "series",
    "système": "system",
    "style littéraire": "literary style",
    "simultanéité": "simultaneity",
    "révision": "revision",
    "résumé": "summary",
    "résultats": "results",
    "rétroaction": "feedback",
    "idée": "idea",
    "dans composés": "in compounds",
    "souvent péjoratif": "often pejorative",
    "péjoratif": "pejorative",
    "santé (TCM)": "health (TCM)",
    "faire": "to do",
    "à faire": "to do",
    "très": "very",
    "pas très": "not very",
}

def translate_tag(tag_str):
    """Translate a comma-separated French tag string to English."""
    if not tag_str or tag_str.strip() == "Tags":
        return tag_str

    tags = [t.strip() for t in tag_str.split(",")]
    translated = []
    for tag in tags:
        if not tag:
            continue
        # Check exact match first
        if tag in TAG_WORD_MAP:
            translated.append(TAG_WORD_MAP[tag])
            continue

        # Try splitting compound tags by /
        if "/" in tag:
            parts = tag.split("/")
            trans_parts = []
            for p in parts:
                p = p.strip()
                trans_parts.append(TAG_WORD_MAP.get(p, translate_single_tag_word(p)))
            translated.append("/".join(trans_parts))
            continue

        # Try single word translation
        translated.append(translate_single_tag_word(tag))

    return ",".join(translated)

def translate_single_tag_word(word):
    """Translate a single French tag word to English."""
    if word in TAG_WORD_MAP:
        return TAG_WORD_MAP[word]

    word_lower = word.lower()

    # Check the word-level dictionary
    if word_lower in FR_EN_WORD_MAP:
        return FR_EN_WORD_MAP[word_lower]

    # Try systematic French→English cognate transformations
    # These are ordered by specificity (most specific first)
    SUFFIX_TRANSFORMS = [
        ("ité", "ity"),       # qualité → quality
        ("té", "ty"),         # beauté → beauty
        ("ique", "ic"),       # logique → logic
        ("isme", "ism"),      # tourisme → tourism
        ("iste", "ist"),      # artiste → artist
        ("eur", "or"),        # directeur → director
        ("ence", "ence"),     # silence → silence
        ("ance", "ance"),     # distance → distance
        ("ment", "ment"),     # moment → moment
        ("tion", "tion"),     # action → action
        ("sion", "sion"),     # passion → passion
        ("ère", "er"),        # manière → manner (approximate)
        ("aire", "ary"),      # militaire → military
        ("eur", "er"),        # danseur → dancer
        ("ie", "y"),          # pharmacie → pharmacy
        ("é", "ed"),          # passé → passed (approximate)
    ]

    for fr_suffix, en_suffix in SUFFIX_TRANSFORMS:
        if word_lower.endswith(fr_suffix) and len(word_lower) > len(fr_suffix) + 2:
            stem = word_lower[:-len(fr_suffix)]
            # Remove accents from stem for English
            accent_map = str.maketrans("àâäéèêëïîôùûüç", "aaaeeeeiioouuc")
            stem_en = stem.translate(accent_map)
            return stem_en + en_suffix

    # Return as-is (many tags are cognates or near-cognates like transport, sport, concept)
    return word


# ─── French → English Word Dictionary ────────────────────────────────────────
# Used for translating example sentences (French part only)
# This is a comprehensive dictionary of French words/phrases commonly found in
# Chinese language learning materials.

FR_EN_WORD_MAP = {
    # === Articles / Determiners ===
    "le": "the", "la": "the", "les": "the", "l'": "the",
    "un": "a", "une": "a", "des": "some",
    "du": "of the", "de la": "of the", "de l'": "of the",
    "au": "at the", "aux": "at the",
    "ce": "this", "cette": "this", "ces": "these",
    "cet": "this",
    "mon": "my", "ma": "my", "mes": "my",
    "ton": "your", "ta": "your", "tes": "your",
    "son": "his/her", "sa": "his/her", "ses": "his/her",
    "notre": "our", "nos": "our",
    "votre": "your", "vos": "your",
    "leur": "their", "leurs": "their",
    "quel": "which", "quelle": "which", "quels": "which", "quelles": "which",

    # === Pronouns ===
    "je": "I", "j'": "I", "tu": "you", "il": "he", "elle": "she",
    "nous": "we", "vous": "you", "ils": "they", "elles": "they",
    "on": "one/we", "me": "me", "te": "you", "se": "oneself",
    "moi": "me", "toi": "you", "lui": "him", "eux": "them",
    "soi": "oneself", "y": "there", "en": "of it",
    "qui": "who", "que": "that/what", "quoi": "what",
    "dont": "whose/of which", "où": "where",
    "celui": "the one", "celle": "the one",
    "ceux": "those", "celles": "those",

    # === Common Verbs (infinitive) ===
    "être": "to be", "avoir": "to have", "faire": "to do/make",
    "aller": "to go", "venir": "to come", "voir": "to see",
    "savoir": "to know", "pouvoir": "can", "vouloir": "to want",
    "devoir": "must", "dire": "to say", "prendre": "to take",
    "donner": "to give", "parler": "to speak", "manger": "to eat",
    "boire": "to drink", "lire": "to read", "écrire": "to write",
    "dormir": "to sleep", "partir": "to leave", "sortir": "to go out",
    "entrer": "to enter", "monter": "to go up", "descendre": "to go down",
    "tomber": "to fall", "rester": "to stay", "arriver": "to arrive",
    "passer": "to pass", "chercher": "to look for", "trouver": "to find",
    "mettre": "to put", "porter": "to wear/carry", "ouvrir": "to open",
    "fermer": "to close", "commencer": "to begin", "finir": "to finish",
    "aimer": "to love/like", "acheter": "to buy", "vendre": "to sell",
    "payer": "to pay", "travailler": "to work", "étudier": "to study",
    "apprendre": "to learn", "comprendre": "to understand",
    "connaître": "to know (person/place)", "croire": "to believe",
    "penser": "to think", "sentir": "to feel/smell",
    "entendre": "to hear", "écouter": "to listen",
    "regarder": "to watch/look", "attendre": "to wait",
    "répondre": "to answer", "demander": "to ask",
    "aider": "to help", "jouer": "to play",
    "chanter": "to sing", "danser": "to dance",
    "nager": "to swim", "courir": "to run",
    "marcher": "to walk", "conduire": "to drive",
    "voler": "to fly/steal", "voyager": "to travel",
    "habiter": "to live (in)", "vivre": "to live",
    "mourir": "to die", "naître": "to be born",
    "grandir": "to grow up", "changer": "to change",
    "essayer": "to try", "oublier": "to forget",
    "rappeler": "to remind", "souvenir": "to remember",
    "perdre": "to lose", "gagner": "to win/earn",
    "envoyer": "to send", "recevoir": "to receive",
    "appeler": "to call", "téléphoner": "to phone",
    "rencontrer": "to meet", "inviter": "to invite",
    "accepter": "to accept", "refuser": "to refuse",
    "préférer": "to prefer", "choisir": "to choose",
    "décider": "to decide", "préparer": "to prepare",
    "cuisiner": "to cook", "nettoyer": "to clean",
    "laver": "to wash", "ranger": "to tidy",
    "réparer": "to repair", "casser": "to break",
    "construire": "to build", "détruire": "to destroy",
    "utiliser": "to use", "créer": "to create",
    "montrer": "to show", "cacher": "to hide",
    "expliquer": "to explain", "raconter": "to tell (story)",
    "promettre": "to promise", "mentir": "to lie",
    "pleurer": "to cry", "rire": "to laugh",
    "sourire": "to smile",
    "s'asseoir": "to sit down", "se lever": "to get up",
    "se coucher": "to go to bed", "se réveiller": "to wake up",
    "se laver": "to wash oneself", "s'habiller": "to get dressed",
    "se promener": "to take a walk", "se reposer": "to rest",
    "se dépêcher": "to hurry", "s'arrêter": "to stop",
    "se souvenir": "to remember",

    # === Common Adjectives ===
    "bon": "good", "bonne": "good", "mauvais": "bad", "mauvaise": "bad",
    "grand": "big/tall", "grande": "big/tall",
    "petit": "small", "petite": "small",
    "beau": "beautiful", "belle": "beautiful",
    "nouveau": "new", "nouvelle": "new",
    "vieux": "old", "vieille": "old",
    "jeune": "young", "long": "long", "longue": "long",
    "court": "short", "courte": "short",
    "haut": "high/tall", "haute": "high/tall",
    "bas": "low", "basse": "low",
    "gros": "big/fat", "grosse": "big/fat",
    "mince": "thin", "épais": "thick",
    "large": "wide", "étroit": "narrow",
    "lourd": "heavy", "léger": "light",
    "dur": "hard", "dure": "hard",
    "mou": "soft", "molle": "soft",
    "chaud": "hot", "froid": "cold",
    "sec": "dry", "humide": "humid",
    "propre": "clean", "sale": "dirty",
    "riche": "rich", "pauvre": "poor",
    "fort": "strong", "forte": "strong",
    "faible": "weak", "rapide": "fast",
    "lent": "slow", "lente": "slow",
    "facile": "easy", "difficile": "difficult",
    "simple": "simple", "compliqué": "complicated",
    "important": "important", "importante": "important",
    "possible": "possible", "impossible": "impossible",
    "nécessaire": "necessary", "utile": "useful",
    "inutile": "useless", "intéressant": "interesting",
    "ennuyeux": "boring", "amusant": "funny/fun",
    "triste": "sad", "content": "happy",
    "contente": "happy", "heureux": "happy",
    "heureuse": "happy", "malheureux": "unhappy",
    "fatigué": "tired", "fatiguée": "tired",
    "malade": "sick", "sain": "healthy",
    "occupé": "busy", "libre": "free",
    "seul": "alone", "seule": "alone",
    "même": "same/even", "autre": "other",
    "dernier": "last", "dernière": "last",
    "premier": "first", "première": "first",
    "prochain": "next", "prochaine": "next",
    "certain": "certain", "sûr": "sure",
    "vrai": "true", "faux": "false",
    "correct": "correct", "juste": "fair/just",
    "gentil": "kind", "gentille": "kind",
    "méchant": "mean", "poli": "polite",
    "intelligent": "intelligent", "stupide": "stupid",
    "drôle": "funny", "sérieux": "serious",
    "calme": "calm", "nerveux": "nervous",
    "timide": "shy", "courageux": "brave",
    "honnête": "honest", "normal": "normal",
    "spécial": "special", "différent": "different",
    "pareil": "same", "entier": "entire/whole",
    "plein": "full", "vide": "empty",
    "ouvert": "open", "fermé": "closed",
    "blanc": "white", "noir": "black",
    "rouge": "red", "bleu": "blue",
    "vert": "green", "jaune": "yellow",
    "rose": "pink", "gris": "gray",
    "orange": "orange", "violet": "purple",
    "marron": "brown", "clair": "light/clear",
    "foncé": "dark", "cher": "expensive/dear",
    "chère": "expensive/dear",
    "gratuit": "free", "délicieux": "delicious",
    "délicieuse": "delicious", "sucré": "sweet",
    "salé": "salty", "amer": "bitter",
    "épicé": "spicy", "acide": "sour",
    "frais": "fresh/cool", "fraîche": "fresh/cool",
    "parfait": "perfect", "excellent": "excellent",
    "terrible": "terrible", "horrible": "horrible",
    "merveilleux": "wonderful", "magnifique": "magnificent",
    "superbe": "superb", "formidable": "great",
    "incroyable": "incredible", "extraordinaire": "extraordinary",

    # === Adverbs ===
    "très": "very", "trop": "too (much)",
    "assez": "enough/quite", "peu": "little/few",
    "beaucoup": "a lot", "plus": "more",
    "moins": "less", "aussi": "also/too",
    "encore": "again/still", "toujours": "always",
    "souvent": "often", "parfois": "sometimes",
    "jamais": "never", "déjà": "already",
    "bientôt": "soon", "maintenant": "now",
    "aujourd'hui": "today", "hier": "yesterday",
    "demain": "tomorrow", "ici": "here",
    "là": "there", "là-bas": "over there",
    "partout": "everywhere", "nulle part": "nowhere",
    "ensemble": "together", "seul": "alone",
    "vite": "quickly", "lentement": "slowly",
    "bien": "well", "mal": "badly",
    "surtout": "especially", "vraiment": "really",
    "certainement": "certainly", "peut-être": "maybe",
    "probablement": "probably", "heureusement": "fortunately",
    "malheureusement": "unfortunately",
    "seulement": "only", "environ": "about/approximately",
    "exactement": "exactly", "presque": "almost",
    "tout": "all/everything", "tous": "all",
    "toute": "all", "toutes": "all",
    "rien": "nothing", "personne": "nobody",
    "quelque chose": "something", "quelqu'un": "someone",
    "ne...pas": "not", "ne...plus": "no more",
    "ne...jamais": "never", "ne...rien": "nothing",
    "pas": "not",

    # === Prepositions / Conjunctions ===
    "à": "at/to", "de": "of/from", "dans": "in",
    "sur": "on", "sous": "under", "avec": "with",
    "sans": "without", "pour": "for", "par": "by",
    "entre": "between", "vers": "towards",
    "chez": "at (someone's place)", "depuis": "since",
    "pendant": "during", "avant": "before",
    "après": "after", "contre": "against",
    "devant": "in front of", "derrière": "behind",
    "près": "near", "loin": "far",
    "et": "and", "ou": "or", "mais": "but",
    "donc": "so/therefore", "car": "because",
    "parce que": "because", "quand": "when",
    "si": "if", "comme": "like/as",
    "puisque": "since", "tandis que": "while",
    "pendant que": "while", "bien que": "although",
    "afin de": "in order to", "afin que": "so that",

    # === Nouns (common in Chinese learning) ===
    "homme": "man", "femme": "woman",
    "enfant": "child", "garçon": "boy", "fille": "girl",
    "père": "father", "mère": "mother",
    "frère": "brother", "sœur": "sister",
    "fils": "son", "fille": "daughter",
    "mari": "husband", "femme": "wife",
    "ami": "friend", "amie": "friend",
    "collègue": "colleague", "voisin": "neighbor",
    "professeur": "teacher", "élève": "student",
    "étudiant": "student", "étudiante": "student",
    "médecin": "doctor", "docteur": "doctor",
    "patron": "boss", "client": "client",
    "maison": "house", "appartement": "apartment",
    "chambre": "bedroom", "cuisine": "kitchen",
    "salle": "room", "bureau": "office/desk",
    "école": "school", "université": "university",
    "hôpital": "hospital", "magasin": "store",
    "restaurant": "restaurant", "café": "café",
    "hôtel": "hotel", "aéroport": "airport",
    "gare": "station", "rue": "street",
    "route": "road", "pont": "bridge",
    "ville": "city", "village": "village",
    "campagne": "countryside", "montagne": "mountain",
    "mer": "sea", "rivière": "river",
    "lac": "lake", "forêt": "forest",
    "jardin": "garden", "parc": "park",
    "voiture": "car", "vélo": "bicycle",
    "bus": "bus", "train": "train",
    "avion": "airplane", "bateau": "boat",
    "taxi": "taxi", "métro": "subway",
    "livre": "book", "journal": "newspaper",
    "lettre": "letter", "stylo": "pen",
    "papier": "paper", "ordinateur": "computer",
    "téléphone": "phone", "portable": "cellphone",
    "argent": "money", "prix": "price",
    "travail": "work", "bureau": "office",
    "réunion": "meeting", "projet": "project",
    "repas": "meal", "petit-déjeuner": "breakfast",
    "déjeuner": "lunch", "dîner": "dinner",
    "pain": "bread", "riz": "rice",
    "viande": "meat", "poisson": "fish",
    "légume": "vegetable", "fruit": "fruit",
    "eau": "water", "thé": "tea",
    "café": "coffee", "lait": "milk",
    "bière": "beer", "vin": "wine",
    "jus": "juice",
    "jour": "day", "nuit": "night",
    "matin": "morning", "après-midi": "afternoon",
    "soir": "evening", "semaine": "week",
    "mois": "month", "année": "year",
    "heure": "hour", "minute": "minute",
    "seconde": "second",
    "lundi": "Monday", "mardi": "Tuesday",
    "mercredi": "Wednesday", "jeudi": "Thursday",
    "vendredi": "Friday", "samedi": "Saturday",
    "dimanche": "Sunday",
    "janvier": "January", "février": "February",
    "mars": "March", "avril": "April",
    "mai": "May", "juin": "June",
    "juillet": "July", "août": "August",
    "septembre": "September", "octobre": "October",
    "novembre": "November", "décembre": "December",
    "printemps": "spring", "été": "summer",
    "automne": "autumn", "hiver": "winter",
    "soleil": "sun", "lune": "moon",
    "étoile": "star", "ciel": "sky",
    "nuage": "cloud", "pluie": "rain",
    "neige": "snow", "vent": "wind",
    "orage": "storm", "brouillard": "fog",
    "chat": "cat", "chien": "dog",
    "oiseau": "bird", "cheval": "horse",
    "problème": "problem", "solution": "solution",
    "question": "question", "réponse": "answer",
    "chose": "thing", "idée": "idea",
    "raison": "reason", "cause": "cause",
    "résultat": "result", "effet": "effect",
    "exemple": "example", "situation": "situation",
    "condition": "condition", "occasion": "occasion",
    "moment": "moment", "temps": "time/weather",
    "fois": "time (occurrence)", "place": "place/seat",
    "côté": "side", "bout": "end/tip",
    "milieu": "middle", "centre": "center",
    "début": "beginning", "fin": "end",
    "partie": "part", "groupe": "group",
    "type": "type", "sorte": "kind/sort",
    "manière": "manner/way", "façon": "way",
    "cas": "case", "point": "point",
    "sujet": "subject", "niveau": "level",
    "sens": "meaning/direction",
    "mot": "word", "phrase": "sentence",
    "nom": "name/noun", "prénom": "first name",
    "âge": "age", "taille": "size/height",
    "poids": "weight", "couleur": "color",
    "forme": "shape/form", "nombre": "number",
}

# ─── Example sentence translation ────────────────────────────────────────────

def translate_french_sentence(french_text):
    """
    Translate a French sentence to English using word-by-word dictionary.
    Returns the translation or [FR: original] if too complex.
    """
    if not french_text or not french_text.strip():
        return french_text

    text = french_text.strip()

    # Check exact match first in a common phrases dict
    if text in COMMON_PHRASES:
        return COMMON_PHRASES[text]

    # For short phrases (1-3 words), try direct lookup
    words = text.split()
    if len(words) <= 3:
        lower = text.lower().rstrip("!?.,:;")
        if lower in FR_EN_WORD_MAP:
            result = FR_EN_WORD_MAP[lower]
            # Preserve punctuation
            if text[-1] in "!?.":
                result += text[-1]
            return result.capitalize() if text[0].isupper() else result

    # Word-by-word translation attempt
    translated_words = []
    success_count = 0
    total_words = 0

    for word in words:
        total_words += 1
        # Strip punctuation for lookup
        punct = ""
        clean = word
        while clean and clean[-1] in ".,!?;:…\"'»«)":
            punct = clean[-1] + punct
            clean = clean[:-1]
        prefix = ""
        while clean and clean[0] in "\"'«(":
            prefix += clean[0]
            clean = clean[1:]

        lower = clean.lower()

        # Try exact match
        if lower in FR_EN_WORD_MAP:
            en = FR_EN_WORD_MAP[lower]
            # Preserve capitalization
            if clean and clean[0].isupper():
                en = en[0].upper() + en[1:] if len(en) > 1 else en.upper()
            translated_words.append(prefix + en + punct)
            success_count += 1
        else:
            # Try without common French contractions
            found = False
            # l' prefix
            if lower.startswith("l'"):
                rest = lower[2:]
                if rest in FR_EN_WORD_MAP:
                    translated_words.append(prefix + "the " + FR_EN_WORD_MAP[rest] + punct)
                    success_count += 1
                    found = True
                else:
                    translated_words.append(prefix + "the " + rest + punct)
                    success_count += 0.5
                    found = True
            # d' prefix
            elif lower.startswith("d'"):
                rest = lower[2:]
                if rest in FR_EN_WORD_MAP:
                    translated_words.append(prefix + "of " + FR_EN_WORD_MAP[rest] + punct)
                    success_count += 1
                    found = True
                else:
                    translated_words.append(prefix + "of " + rest + punct)
                    success_count += 0.5
                    found = True
            # j' prefix
            elif lower.startswith("j'"):
                rest = lower[2:]
                translated_words.append(prefix + "I " + rest + punct)
                success_count += 0.5
                found = True
            # n' prefix (negation)
            elif lower.startswith("n'"):
                rest = lower[2:]
                translated_words.append(prefix + "not " + rest + punct)
                success_count += 0.3
                found = True
            # s' prefix (reflexive)
            elif lower.startswith("s'"):
                rest = lower[2:]
                translated_words.append(prefix + rest + punct)
                success_count += 0.3
                found = True
            # qu' prefix
            elif lower.startswith("qu'"):
                rest = lower[3:]
                translated_words.append(prefix + "that " + rest + punct)
                success_count += 0.5
                found = True

            if not found:
                # Keep original word (might be a cognate or proper noun)
                translated_words.append(word)
                # Check if it looks like a cognate (same in English)
                if lower in ["taxi", "bus", "ok", "super", "restaurant",
                           "internet", "sport", "yoga", "piano", "photo",
                           "visa", "pizza", "sofa", "radio", "video",
                           "ski", "tennis", "golf", "parking", "jean",
                           "shopping", "weekend", "chance", "film"]:
                    success_count += 1

    # If we translated less than 30% of words, mark as untranslated
    if total_words > 0 and success_count / total_words < 0.3:
        return f"[FR: {french_text}]"

    result = " ".join(translated_words)

    # Basic grammar fixes
    result = result.replace(" the the ", " the ")
    result = result.replace("  ", " ")

    return result

# Common French phrases that appear in Chinese learning examples
# These are translated as complete units for better quality
COMMON_PHRASES = {
    # Greetings / Politeness
    "Bonjour": "Hello",
    "Bonjour !": "Hello!",
    "Bonsoir": "Good evening",
    "Bonsoir !": "Good evening!",
    "Bonne nuit": "Good night",
    "Bonne nuit !": "Good night!",
    "Au revoir": "Goodbye",
    "Au revoir !": "Goodbye!",
    "Salut": "Hi",
    "Salut !": "Hi!",
    "Merci": "Thank you",
    "Merci !": "Thank you!",
    "Merci beaucoup": "Thank you very much",
    "Merci beaucoup !": "Thank you very much!",
    "De rien": "You're welcome",
    "De rien !": "You're welcome!",
    "S'il vous plaît": "Please",
    "S'il te plaît": "Please",
    "Excusez-moi": "Excuse me",
    "Excuse-moi": "Excuse me",
    "Pardon": "Sorry",
    "Désolé": "Sorry",
    "Désolée": "Sorry",
    "D'accord": "OK",
    "D'accord !": "OK!",
    "Bien sûr": "Of course",
    "Bien sûr !": "Of course!",
    "Pas de problème": "No problem",
    "Comment allez-vous ?": "How are you?",
    "Comment vas-tu ?": "How are you?",
    "Ça va ?": "How are you?",
    "Ça va": "I'm fine",
    "Ça va bien": "I'm fine",
    "Très bien": "Very good",
    "Très bien !": "Very good!",
    "Super !": "Great!",
    "Super": "Great",
    "Génial !": "Awesome!",
    "C'est bien": "That's good",
    "C'est bon": "It's good",
    "C'est vrai": "That's true",
    "C'est vrai ?": "Is that true?",
    "Vraiment ?": "Really?",
    "Vraiment": "Really",
    "Allons-y": "Let's go",
    "Allons-y !": "Let's go!",
    "On y va": "Let's go",
    "On y va !": "Let's go!",
    "Allez": "Come on / Go",
    "Attention !": "Be careful!",
    "Attention": "Attention",
    "Bravo !": "Well done!",
    "Félicitations !": "Congratulations!",
    "Bon courage !": "Good luck!",
    "Bonne chance !": "Good luck!",
    "Bon appétit !": "Enjoy your meal!",
    "Santé !": "Cheers!",
    "Bienvenue !": "Welcome!",
    "Bienvenue": "Welcome",
    "À bientôt": "See you soon",
    "À bientôt !": "See you soon!",
    "À demain": "See you tomorrow",
    "À demain !": "See you tomorrow!",
    "À plus tard": "See you later",
    "À plus tard !": "See you later!",
    "Bonne journée !": "Have a good day!",
    "Bonne soirée !": "Have a good evening!",
    "Bon week-end !": "Have a good weekend!",
    "Bon voyage !": "Have a good trip!",
    "Joyeux anniversaire !": "Happy birthday!",
    "Bonne année !": "Happy New Year!",
    "Joyeux Noël !": "Merry Christmas!",

    # Common short responses
    "Oui": "Yes",
    "Non": "No",
    "Peut-être": "Maybe",
    "Bien": "Good/Well",
    "Mal": "Bad/Badly",
    "Pas mal": "Not bad",
    "Pas mal !": "Not bad!",
    "Tant mieux": "All the better",
    "Tant pis": "Too bad",
    "C'est dommage": "That's a shame",
    "Quel dommage !": "What a shame!",
    "Normal": "Normal",
    "Exactement": "Exactly",
    "Bien sûr que non": "Of course not",
    "Pas du tout": "Not at all",
    "Absolument": "Absolutely",
}


def translate_examples(examples_str):
    """Translate the French parts of example sentences.
    Format: 'Chinese - pinyin - French<br>Chinese - pinyin - French'
    """
    if not examples_str or not examples_str.strip():
        return examples_str

    examples = examples_str.split("<br>")
    translated = []

    for ex in examples:
        if not ex.strip():
            translated.append(ex)
            continue

        # Split by " - " to get parts
        parts = ex.split(" - ")

        if len(parts) >= 3:
            # Last part is the French translation
            chinese = parts[0]
            pinyin = parts[1]
            french = " - ".join(parts[2:])  # In case French part contains " - "

            english = translate_french_sentence(french)
            translated.append(f"{chinese} - {pinyin} - {english}")
        else:
            # Can't parse, keep as-is
            translated.append(ex)

    return "<br>".join(translated)


# ─── Main Processing ─────────────────────────────────────────────────────────

def process_file(input_path, output_path, cedict_entries):
    """Process a single TSV file: translate meanings, examples, and tags."""
    rows = []
    untranslated_meanings = 0
    total_meanings = 0

    with open(input_path, "r", encoding="utf-8") as f:
        reader = csv.reader(f, delimiter="\t")
        header = next(reader)
        rows.append(header)

        for row in reader:
            if len(row) < 8:
                rows.append(row)
                continue

            id_col = row[0]
            hsk_level = row[1]
            simplified = row[2]
            pinyin = row[3]
            meaning_fr = row[4]
            examples_fr = row[5]
            tags_fr = row[6]
            audio = row[7]

            # Translate meaning using CEDICT
            total_meanings += 1
            meaning_en = get_best_cedict_meaning(cedict_entries, simplified, meaning_fr)
            if meaning_en is None:
                meaning_en = f"[FR: {meaning_fr}]"
                untranslated_meanings += 1

            # Translate examples
            examples_en = translate_examples(examples_fr)

            # Translate tags
            tags_en = translate_tag(tags_fr)

            rows.append([id_col, hsk_level, simplified, pinyin, meaning_en, examples_en, tags_en, audio])

    # Write output
    with open(output_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f, delimiter="\t", quoting=csv.QUOTE_NONE, escapechar="\\")
        for row in rows:
            writer.writerow(row)

    return total_meanings, untranslated_meanings


def main():
    print("Parsing CEDICT dictionary...")
    cedict_entries = parse_cedict()
    print(f"  Loaded {len(cedict_entries)} entries from CEDICT")

    for input_name, output_name in FILES:
        input_path = os.path.join(BASE_DIR, input_name)
        output_path = os.path.join(BASE_DIR, output_name)

        print(f"\nProcessing {input_name}...")
        total, untranslated = process_file(input_path, output_path, cedict_entries)
        print(f"  Total meanings: {total}")
        print(f"  Untranslated meanings: {untranslated}")
        print(f"  Coverage: {100*(total-untranslated)/total:.1f}%")
        print(f"  Output: {output_name}")

    print("\nDone! All files translated.")


if __name__ == "__main__":
    main()
