## LearningManager.gd
## Tracks vocabulary progress across HSK levels, manages unlock conditions,
## records word states (new → seen → practiced → mastered).
extends Node

# --- Signals ---
signal word_state_changed(word_id: String, new_state: WordState)
signal hsk_progress_updated(hsk_level: int, progress: float)
signal vocab_pack_loaded(pack_id: String)

# --- Enums ---
enum WordState {
	NEW,       # Not yet encountered
	SEEN,      # Shown in dialogue once
	PRACTICED, # Answered correctly in quiz at least once
	MASTERED   # Answered correctly 3+ times
}

# --- Constants ---
const VOCAB_BASE_PATH := "res://data/vocabulary/"
const MASTERY_THRESHOLD := 3  # Correct answers to reach MASTERED
const HSK_WORD_COUNTS := {
	1: 150,  # Approximate total HSK1 words
	2: 150,
	3: 300,
	4: 600,
	5: 1300
}

# --- State ---
# word_id -> { state: WordState, seen_count: int, correct_count: int, last_seen: int }
var word_records: Dictionary = {}
# pack_id -> Array of word Dictionaries
var loaded_packs: Dictionary = {}
# word_id -> word Dictionary
var word_lookup: Dictionary = {}

# --- Lifecycle ---
func _ready() -> void:
	# Load all vocabulary packs for unlocked regions
	_auto_load_packs()

func _auto_load_packs() -> void:
	var pack_map := {
		"beijing": "hsk1_beijing",
		"shanghai": "hsk2_shanghai",
		"xian": "hsk3_xian",
		"chengdu": "hsk4_chengdu",
		"guilin": "hsk5_guilin",
	}
	for region_id in GameManager.unlocked_regions:
		if pack_map.has(region_id):
			load_vocab_pack(pack_map[region_id])

# --- Vocab Pack Loading ---
func load_vocab_pack(pack_id: String) -> void:
	if loaded_packs.has(pack_id):
		return
	var path := VOCAB_BASE_PATH + pack_id + ".json"
	var file := FileAccess.open(path, FileAccess.READ)
	if file == null:
		push_warning("LearningManager: Cannot open " + path)
		return
	var text := file.get_as_text()
	file.close()
	var parsed: Variant = JSON.parse_string(text)
	if parsed == null:
		push_error("LearningManager: Failed to parse " + path)
		return
	var words: Array = []
	if parsed is Array:
		words = parsed
	elif parsed is Dictionary and parsed.has("words"):
		words = parsed["words"]
	loaded_packs[pack_id] = words
	for word in words:
		if word.has("id"):
			word_lookup[word["id"]] = word
			# Initialize record if not present
			if not word_records.has(word["id"]):
				word_records[word["id"]] = {
					"state": WordState.NEW,
					"seen_count": 0,
					"correct_count": 0,
					"last_seen": 0
				}
	vocab_pack_loaded.emit(pack_id)

# --- Word State Management ---
func mark_word_seen(word_id: String) -> void:
	if not word_records.has(word_id):
		word_records[word_id] = {
			"state": WordState.NEW,
			"seen_count": 0,
			"correct_count": 0,
			"last_seen": 0
		}
	var rec: Dictionary = word_records[word_id]
	rec["seen_count"] += 1
	rec["last_seen"] = Time.get_unix_time_from_system()
	if rec["state"] == WordState.NEW:
		rec["state"] = WordState.SEEN
		word_state_changed.emit(word_id, WordState.SEEN)
	_update_hsk_progress_for_word(word_id)

func mark_word_correct(word_id: String) -> void:
	if not word_records.has(word_id):
		mark_word_seen(word_id)
	var rec: Dictionary = word_records[word_id]
	rec["correct_count"] += 1
	var prev_state: WordState = rec["state"]
	if rec["correct_count"] >= MASTERY_THRESHOLD and rec["state"] != WordState.MASTERED:
		rec["state"] = WordState.MASTERED
		word_state_changed.emit(word_id, WordState.MASTERED)
	elif rec["correct_count"] >= 1 and rec["state"] == WordState.SEEN:
		rec["state"] = WordState.PRACTICED
		word_state_changed.emit(word_id, WordState.PRACTICED)
	_update_hsk_progress_for_word(word_id)
	GameManager.check_hsk_unlock()

func mark_word_wrong(word_id: String) -> void:
	# Still counts as practiced (attempted) but no level-up
	mark_word_seen(word_id)

func get_word_state(word_id: String) -> WordState:
	if word_records.has(word_id):
		return word_records[word_id]["state"]
	return WordState.NEW

func get_word_data(word_id: String) -> Dictionary:
	return word_lookup.get(word_id, {})

# --- Progress Calculation ---
func get_hsk_progress(hsk_level: int) -> float:
	var total := 0
	var seen := 0
	for word_id in word_lookup:
		var word: Dictionary = word_lookup[word_id]
		if word.get("hsk_level", 0) == hsk_level:
			total += 1
			var state := get_word_state(word_id)
			if state != WordState.NEW:
				seen += 1
	if total == 0:
		return 0.0
	return float(seen) / float(total)

func get_hsk_mastery(hsk_level: int) -> float:
	var total := 0
	var mastered := 0
	for word_id in word_lookup:
		var word: Dictionary = word_lookup[word_id]
		if word.get("hsk_level", 0) == hsk_level:
			total += 1
			if get_word_state(word_id) == WordState.MASTERED:
				mastered += 1
	if total == 0:
		return 0.0
	return float(mastered) / float(total)

func _update_hsk_progress_for_word(word_id: String) -> void:
	var word := get_word_data(word_id)
	if word.has("hsk_level"):
		var level: int = word["hsk_level"]
		var progress := get_hsk_progress(level)
		hsk_progress_updated.emit(level, progress)

# --- Query helpers ---
func get_words_for_hsk(hsk_level: int) -> Array:
	var result: Array = []
	for word_id in word_lookup:
		var word: Dictionary = word_lookup[word_id]
		if word.get("hsk_level", 0) == hsk_level:
			result.append(word)
	return result

func get_seen_words() -> Array:
	var result: Array = []
	for word_id in word_records:
		if word_records[word_id]["state"] != WordState.NEW:
			result.append(word_lookup.get(word_id, {"id": word_id}))
	return result

func get_words_for_region(region_id: String) -> Array:
	var result: Array = []
	for word_id in word_lookup:
		var word: Dictionary = word_lookup[word_id]
		if word.get("region", "") == region_id:
			result.append(word)
	return result

func get_total_seen_count() -> int:
	var count := 0
	for word_id in word_records:
		if word_records[word_id]["state"] != WordState.NEW:
			count += 1
	return count

## Get N random words from a given HSK level for quiz generation
func get_random_words_for_quiz(hsk_level: int, count: int, exclude_id: String = "") -> Array:
	var pool: Array = []
	for word_id in word_lookup:
		var word: Dictionary = word_lookup[word_id]
		if word.get("hsk_level", 0) == hsk_level and word_id != exclude_id:
			pool.append(word)
	pool.shuffle()
	return pool.slice(0, min(count, pool.size()))

# --- Save/Load ---
func get_save_data() -> Dictionary:
	return {
		"word_records": word_records,
		"loaded_packs": loaded_packs.keys()
	}

func load_save_data(data: Dictionary) -> void:
	word_records = data.get("word_records", {})
	# Convert state ints back to enum
	for word_id in word_records:
		var rec: Dictionary = word_records[word_id]
		if rec.has("state") and rec["state"] is int:
			rec["state"] = rec["state"] as WordState
	# Re-load packs
	var packs: Array = data.get("loaded_packs", [])
	for pack_id in packs:
		load_vocab_pack(pack_id)

func reset() -> void:
	word_records = {}
	loaded_packs = {}
	word_lookup = {}
	_auto_load_packs()
