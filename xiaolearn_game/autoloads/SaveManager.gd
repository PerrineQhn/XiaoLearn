## SaveManager.gd
## JSON save/load system. Serializes all manager states to user:// directory.
extends Node

# --- Signals ---
signal save_completed(slot: int)
signal load_completed(slot: int)
signal save_failed(reason: String)
signal load_failed(reason: String)

# --- Constants ---
const SAVE_DIR := "user://saves/"
const SAVE_FILE_TEMPLATE := "user://saves/slot_%d.json"
const AUTO_SAVE_FILE := "user://saves/autosave.json"
const SAVE_VERSION := "0.1.0"
const AUTO_SAVE_INTERVAL := 60.0  # seconds

# --- State ---
var _auto_save_timer: float = 0.0
var _last_save_slot: int = 0
var save_slots_info: Array = []  # Cached metadata for save slot display

# --- Lifecycle ---
func _ready() -> void:
	_ensure_save_dir()
	_refresh_slot_info()

func _process(delta: float) -> void:
	if GameManager.current_state == GameManager.GameState.EXPLORING:
		_auto_save_timer += delta
		if _auto_save_timer >= AUTO_SAVE_INTERVAL:
			_auto_save_timer = 0.0
			auto_save()

# --- Directory Management ---
func _ensure_save_dir() -> void:
	if not DirAccess.dir_exists_absolute(ProjectSettings.globalize_path(SAVE_DIR)):
		DirAccess.make_dir_recursive_absolute(ProjectSettings.globalize_path(SAVE_DIR))

# --- Save ---
func save_game(slot: int = 0) -> bool:
	_ensure_save_dir()
	var data := _collect_save_data(slot)
	var json_text := JSON.stringify(data, "\t")
	var path := SAVE_FILE_TEMPLATE % slot
	var file := FileAccess.open(path, FileAccess.WRITE)
	if file == null:
		var reason := "Cannot open save file: " + path
		push_error("SaveManager: " + reason)
		save_failed.emit(reason)
		return false
	file.store_string(json_text)
	file.close()
	_last_save_slot = slot
	_refresh_slot_info()
	save_completed.emit(slot)
	return true

func auto_save() -> void:
	_ensure_save_dir()
	var data := _collect_save_data(-1)
	data["is_autosave"] = true
	var json_text := JSON.stringify(data, "\t")
	var file := FileAccess.open(AUTO_SAVE_FILE, FileAccess.WRITE)
	if file == null:
		push_warning("SaveManager: Cannot open autosave file")
		return
	file.store_string(json_text)
	file.close()

func _collect_save_data(slot: int) -> Dictionary:
	return {
		"save_version": SAVE_VERSION,
		"save_slot": slot,
		"timestamp": Time.get_unix_time_from_system(),
		"timestamp_readable": Time.get_datetime_string_from_system(),
		"game_manager": GameManager.get_save_data(),
		"learning_manager": LearningManager.get_save_data(),
		"quest_manager": QuestManager.get_save_data(),
	}

# --- Load ---
func load_game(slot: int = 0) -> bool:
	var path := SAVE_FILE_TEMPLATE % slot
	return _load_from_path(path, slot)

func load_autosave() -> bool:
	return _load_from_path(AUTO_SAVE_FILE, -1)

func _load_from_path(path: String, slot: int) -> bool:
	if not FileAccess.file_exists(path):
		var reason := "Save file not found: " + path
		push_warning("SaveManager: " + reason)
		load_failed.emit(reason)
		return false
	var file := FileAccess.open(path, FileAccess.READ)
	if file == null:
		var reason := "Cannot read save file: " + path
		push_error("SaveManager: " + reason)
		load_failed.emit(reason)
		return false
	var text := file.get_as_text()
	file.close()
	var data: Variant = JSON.parse_string(text)
	if data == null:
		var reason := "Corrupt save file: " + path
		push_error("SaveManager: " + reason)
		load_failed.emit(reason)
		return false
	if not data is Dictionary:
		var reason := "Unexpected save format: " + path
		push_error("SaveManager: " + reason)
		load_failed.emit(reason)
		return false
	_apply_save_data(data as Dictionary)
	load_completed.emit(slot)
	return true

func _apply_save_data(data: Dictionary) -> void:
	if data.has("game_manager"):
		GameManager.load_save_data(data["game_manager"])
	if data.has("learning_manager"):
		LearningManager.load_save_data(data["learning_manager"])
	if data.has("quest_manager"):
		QuestManager.load_save_data(data["quest_manager"])

# --- Slot Info ---
func save_slot_exists(slot: int) -> bool:
	var path := SAVE_FILE_TEMPLATE % slot
	return FileAccess.file_exists(path)

func autosave_exists() -> bool:
	return FileAccess.file_exists(AUTO_SAVE_FILE)

func get_save_slot_info(slot: int) -> Dictionary:
	var path := SAVE_FILE_TEMPLATE % slot
	if not FileAccess.file_exists(path):
		return {}
	var file := FileAccess.open(path, FileAccess.READ)
	if file == null:
		return {}
	var text := file.get_as_text()
	file.close()
	var data: Variant = JSON.parse_string(text)
	if data == null or not data is Dictionary:
		return {}
	return {
		"slot": slot,
		"timestamp_readable": data.get("timestamp_readable", ""),
		"region": data.get("game_manager", {}).get("current_region_id", ""),
		"hsk_level": data.get("game_manager", {}).get("player_hsk_level", 1),
		"play_time": data.get("game_manager", {}).get("total_play_time", 0.0),
		"player_name": data.get("game_manager", {}).get("player_name", ""),
	}

func _refresh_slot_info() -> void:
	save_slots_info = []
	for i in range(3):
		save_slots_info.append(get_save_slot_info(i))

func delete_save(slot: int) -> void:
	var path := SAVE_FILE_TEMPLATE % slot
	if FileAccess.file_exists(path):
		DirAccess.remove_absolute(ProjectSettings.globalize_path(path))
	_refresh_slot_info()
