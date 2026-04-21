## TranslationManager.gd
## Manages UI language (FR/EN) toggle and loads translation strings from JSON.
extends Node

# --- Signals ---
signal language_changed(new_lang: String)

# --- Constants ---
const UI_STRINGS_PATH := "res://data/ui_strings.json"
const SUPPORTED_LANGUAGES := ["fr", "en"]
const DEFAULT_LANGUAGE := "fr"

# --- State ---
var current_language: String = DEFAULT_LANGUAGE
var _strings: Dictionary = {}

# --- Lifecycle ---
func _ready() -> void:
	_load_strings()
	# Detect system language
	var sys_lang := OS.get_locale_language()
	if sys_lang in SUPPORTED_LANGUAGES:
		current_language = sys_lang
	else:
		current_language = DEFAULT_LANGUAGE

func _load_strings() -> void:
	var file := FileAccess.open(UI_STRINGS_PATH, FileAccess.READ)
	if file == null:
		push_error("TranslationManager: Cannot open ui_strings.json")
		return
	var text := file.get_as_text()
	file.close()
	var parsed: Variant = JSON.parse_string(text)
	if parsed == null:
		push_error("TranslationManager: Failed to parse ui_strings.json")
		return
	if not parsed is Dictionary:
		push_error("TranslationManager: ui_strings.json root is not a Dictionary")
		return
	_strings = parsed as Dictionary

# --- Language Switching ---
func set_language(lang: String) -> void:
	if not lang in SUPPORTED_LANGUAGES:
		push_warning("TranslationManager: Unsupported language: " + lang)
		return
	current_language = lang
	language_changed.emit(lang)
	# Also tell Godot's built-in translation
	TranslationServer.set_locale(lang)

func toggle_language() -> void:
	var idx := SUPPORTED_LANGUAGES.find(current_language)
	var next_idx := (idx + 1) % SUPPORTED_LANGUAGES.size()
	set_language(SUPPORTED_LANGUAGES[next_idx])

# --- String Lookup ---
func get_string(key: String, fallback: String = "") -> String:
	if not _strings.has(key):
		push_warning("TranslationManager: Missing key: " + key)
		return fallback if not fallback.is_empty() else key
	var entry: Variant = _strings[key]
	if entry is Dictionary:
		return entry.get(current_language, entry.get(DEFAULT_LANGUAGE, fallback))
	if entry is String:
		return entry
	return fallback

## Short alias
func t(key: String, fallback: String = "") -> String:
	return get_string(key, fallback)

## Get string with format substitutions
func tf(key: String, values: Dictionary, fallback: String = "") -> String:
	var base := get_string(key, fallback)
	for k in values:
		base = base.replace("{" + k + "}", str(values[k]))
	return base

## Get HSK level display name
func get_hsk_name(level: int) -> String:
	return get_string("hsk_level_" + str(level), "HSK " + str(level))

## Get region name in current language
func get_region_name(region_id: String) -> String:
	var region_data := GameManager.get_region_data(region_id)
	if current_language == "fr":
		return region_data.get("name_fr", region_id)
	return region_data.get("name_en", region_data.get("name_fr", region_id))

## Get region description in current language
func get_region_description(region_id: String) -> String:
	var region_data := GameManager.get_region_data(region_id)
	if current_language == "fr":
		return region_data.get("description_fr", "")
	return region_data.get("description_en", region_data.get("description_fr", ""))

## Get NPC name in current language
func get_npc_name(npc_data: Dictionary) -> String:
	if current_language == "fr":
		return npc_data.get("npc_name_fr", npc_data.get("npc_name_cn", ""))
	return npc_data.get("npc_name_en", npc_data.get("npc_name_fr", npc_data.get("npc_name_cn", "")))

## Get word translation in current language
func get_word_translation(word_data: Dictionary) -> String:
	if current_language == "fr":
		return word_data.get("translation_fr", word_data.get("translation_en", ""))
	return word_data.get("translation_en", word_data.get("translation_fr", ""))

## Get example sentence in current language
func get_example_sentence(word_data: Dictionary) -> String:
	if current_language == "fr":
		return word_data.get("example_fr", word_data.get("example_en", ""))
	return word_data.get("example_en", word_data.get("example_fr", ""))
