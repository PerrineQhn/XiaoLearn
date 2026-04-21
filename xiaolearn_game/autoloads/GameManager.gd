## GameManager.gd
## Global singleton managing game state, player progression, and region access.
extends Node

# --- Signals ---
signal region_changed(region_id: String)
signal hsk_level_unlocked(level: int)
signal game_state_changed(new_state: GameState)

# --- Enums ---
enum GameState {
	MAIN_MENU,
	WORLD_MAP,
	EXPLORING,
	DIALOGUE,
	QUIZ,
	NOTEBOOK,
	CUTSCENE,
	PAUSED
}

# --- Constants ---
const SAVE_FILE := "user://save_data.json"
const REGIONS_DATA_PATH := "res://data/regions.json"
const HSK_LEVELS := [1, 2, 3, 4, 5]
const UNLOCK_THRESHOLD := 0.80  # 80% of previous HSK vocab needed

# --- State ---
var current_state: GameState = GameState.MAIN_MENU
var current_region_id: String = ""
var player_hsk_level: int = 1
var unlocked_regions: Array[String] = ["beijing"]
var player_name: String = "Voyageur"
var total_play_time: float = 0.0
var regions_data: Dictionary = {}
var is_new_game: bool = true

# Player world position persisted between scene changes
var saved_player_position: Vector2 = Vector2.ZERO
var saved_player_region: String = ""

# --- Lifecycle ---
func _ready() -> void:
	_load_regions_data()
	# Beijing is always unlocked (HSK1 start)
	if not "beijing" in unlocked_regions:
		unlocked_regions.append("beijing")

func _process(delta: float) -> void:
	if current_state == GameState.EXPLORING:
		total_play_time += delta

# --- Regions Data ---
func _load_regions_data() -> void:
	var file := FileAccess.open(REGIONS_DATA_PATH, FileAccess.READ)
	if file == null:
		push_error("GameManager: Cannot open regions.json")
		return
	var json_text := file.get_as_text()
	file.close()
	var parsed: Variant = JSON.parse_string(json_text)
	if parsed == null:
		push_error("GameManager: Failed to parse regions.json")
		return
	if not parsed is Dictionary:
		push_error("GameManager: regions.json root is not a Dictionary")
		return
	regions_data = parsed as Dictionary

func get_region_data(region_id: String) -> Dictionary:
	if not regions_data.has("regions") or not regions_data["regions"] is Array:
		return {}
	for region in regions_data["regions"]:
		if region is Dictionary and region.get("id", "") == region_id:
			return region
	return {}

func get_all_regions() -> Array:
	if regions_data.has("regions"):
		return regions_data["regions"]
	return []

# --- State Management ---
func set_game_state(new_state: GameState) -> void:
	if current_state == new_state:
		return
	current_state = new_state
	game_state_changed.emit(new_state)

func get_game_state() -> GameState:
	return current_state

# --- Region Management ---
func change_region(region_id: String) -> void:
	if not is_region_unlocked(region_id):
		push_warning("GameManager: Tried to enter locked region: " + region_id)
		return
	var prev := current_region_id
	current_region_id = region_id
	set_game_state(GameState.EXPLORING)
	region_changed.emit(region_id)
	SaveManager.auto_save()

func is_region_unlocked(region_id: String) -> bool:
	return region_id in unlocked_regions

func unlock_region(region_id: String) -> void:
	if not region_id in unlocked_regions:
		unlocked_regions.append(region_id)
		var region := get_region_data(region_id)
		if region.has("hsk_required"):
			var hsk_lvl: int = region["hsk_required"]
			if hsk_lvl > player_hsk_level:
				_set_player_hsk_level(hsk_lvl)

func get_region_hsk_required(region_id: String) -> int:
	var region := get_region_data(region_id)
	if region.has("hsk_required"):
		return region["hsk_required"]
	return 999

# --- HSK Level Management ---
func _set_player_hsk_level(level: int) -> void:
	if level > player_hsk_level:
		player_hsk_level = level
		hsk_level_unlocked.emit(level)

func check_hsk_unlock() -> void:
	# Check if player qualifies to unlock the next HSK level & region
	var next_level := player_hsk_level + 1
	if next_level > 5:
		return
	var progress := LearningManager.get_hsk_progress(player_hsk_level)
	if progress >= UNLOCK_THRESHOLD:
		_set_player_hsk_level(next_level)
		_unlock_region_for_hsk(next_level)

func _unlock_region_for_hsk(hsk_level: int) -> void:
	for region in get_all_regions():
		if region.get("hsk_required", 999) == hsk_level:
			unlock_region(region["id"])

# --- Save/Load helpers ---
func get_save_data() -> Dictionary:
	return {
		"current_region_id": current_region_id,
		"player_hsk_level": player_hsk_level,
		"unlocked_regions": unlocked_regions,
		"player_name": player_name,
		"total_play_time": total_play_time,
		"saved_player_position": {
			"x": saved_player_position.x,
			"y": saved_player_position.y
		},
		"saved_player_region": saved_player_region,
		"is_new_game": false
	}

func load_save_data(data: Dictionary) -> void:
	current_region_id = data.get("current_region_id", "")
	player_hsk_level = data.get("player_hsk_level", 1)
	unlocked_regions = data.get("unlocked_regions", ["beijing"])
	player_name = data.get("player_name", "Voyageur")
	total_play_time = data.get("total_play_time", 0.0)
	is_new_game = data.get("is_new_game", false)
	var pos_data: Dictionary = data.get("saved_player_position", {"x": 0, "y": 0})
	saved_player_position = Vector2(pos_data.get("x", 0), pos_data.get("y", 0))
	saved_player_region = data.get("saved_player_region", "")

# --- New Game ---
func start_new_game(p_name: String = "Voyageur") -> void:
	player_name = p_name
	player_hsk_level = 1
	unlocked_regions = ["beijing"]
	current_region_id = "beijing"
	total_play_time = 0.0
	is_new_game = true
	saved_player_position = Vector2.ZERO
	saved_player_region = "beijing"
	LearningManager.reset()
	QuestManager.reset()
	set_game_state(GameState.WORLD_MAP)

# --- Utilities ---
func format_play_time() -> String:
	var hours := int(total_play_time / 3600)
	var minutes := int(fmod(total_play_time, 3600) / 60)
	return "%02d:%02d" % [hours, minutes]
