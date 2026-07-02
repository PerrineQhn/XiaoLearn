## DialogueManager.gd
## Manages all dialogue flow: loading trees, displaying lines, branching, quiz triggers.
extends Node

# --- Signals ---
signal dialogue_started(npc_id: String)
signal dialogue_line_ready(line_data: Dictionary)
signal dialogue_choices_ready(choices: Array)
signal dialogue_ended(npc_id: String)
signal quiz_triggered(quiz_data: Dictionary)
signal word_introduced(word_id: String)

# --- Constants ---
const DIALOGUES_BASE_PATH := "res://data/dialogues/"

# --- State ---
var _active_npc_id: String = ""
var _active_tree: Dictionary = {}
var _current_node_id: String = ""
var _current_line_index: int = 0
var _dialogue_data_cache: Dictionary = {}
var _is_active: bool = false
var _region_file_map: Dictionary = {
	"beijing": "beijing_dialogues.json",
	"shanghai": "shanghai_dialogues.json",
	"xian": "xian_dialogues.json",
	"chengdu": "chengdu_dialogues.json",
	"guilin": "guilin_dialogues.json",
}

# --- Public API ---

## Load all dialogue files for a region into cache
func preload_region_dialogues(region_id: String) -> void:
	if not _region_file_map.has(region_id):
		return
	var path := DIALOGUES_BASE_PATH + _region_file_map[region_id] as String
	var file := FileAccess.open(path, FileAccess.READ)
	if file == null:
		push_warning("DialogueManager: Cannot open " + path)
		return
	var text := file.get_as_text()
	file.close()
	var parsed: Variant = JSON.parse_string(text)
	if parsed == null:
		push_error("DialogueManager: Failed to parse " + path)
		return
	if parsed is Array:
		for npc_data in parsed:
			if npc_data.has("npc_id"):
				_dialogue_data_cache[npc_data["npc_id"]] = npc_data
	elif parsed is Dictionary:
		if parsed.has("npcs"):
			for npc_data in parsed["npcs"]:
				if npc_data.has("npc_id"):
					_dialogue_data_cache[npc_data["npc_id"]] = npc_data

## Start dialogue with a specific NPC
func start_dialogue(npc_id: String) -> bool:
	if _is_active:
		push_warning("DialogueManager: Dialogue already active")
		return false
	if not _dialogue_data_cache.has(npc_id):
		push_warning("DialogueManager: No dialogue data for " + npc_id)
		return false

	var npc_data: Dictionary = _dialogue_data_cache[npc_id]
	_active_npc_id = npc_id
	_active_tree = npc_data.get("dialogue_tree", {})

	# Determine starting node based on quest state
	var start_node := QuestManager.get_dialogue_start_node(npc_id)
	if start_node.is_empty():
		start_node = "start"

	_current_node_id = start_node
	_current_line_index = 0
	_is_active = true

	GameManager.set_game_state(GameManager.GameState.DIALOGUE)
	dialogue_started.emit(npc_id)
	_advance_to_node(_current_node_id)
	return true

## Called by UI to advance to the next line
func advance_dialogue() -> void:
	if not _is_active:
		return
	var node := _get_current_node()
	if node.is_empty():
		end_dialogue()
		return

	var lines: Array = node.get("lines", [])
	_current_line_index += 1

	if _current_line_index < lines.size():
		_emit_line(lines[_current_line_index])
	else:
		# Lines exhausted — check for choices or auto-advance
		var choices: Array = node.get("choices", [])
		if choices.size() > 0:
			dialogue_choices_ready.emit(choices)
		else:
			# Check for auto-next
			var next_node: String = node.get("next", "")
			if next_node.is_empty():
				end_dialogue()
			else:
				_advance_to_node(next_node)

## Called by UI when player selects a choice
func select_choice(choice_index: int) -> void:
	if not _is_active:
		return
	var node := _get_current_node()
	var choices: Array = node.get("choices", [])
	if choice_index < 0 or choice_index >= choices.size():
		return
	var choice: Dictionary = choices[choice_index]
	# Teach word if choice has vocabulary
	if choice.has("teaches"):
		for word_id in choice["teaches"]:
			_teach_word(word_id)
	var next_node: String = choice.get("next", "")
	if next_node.is_empty() or next_node == "end":
		end_dialogue()
	else:
		_advance_to_node(next_node)

## End the current dialogue
func end_dialogue() -> void:
	if not _is_active:
		return
	var npc_id := _active_npc_id
	_is_active = false
	_active_npc_id = ""
	_active_tree = {}
	_current_node_id = ""
	_current_line_index = 0
	GameManager.set_game_state(GameManager.GameState.EXPLORING)
	dialogue_ended.emit(npc_id)
	QuestManager.on_dialogue_completed(npc_id)

func is_dialogue_active() -> bool:
	return _is_active

func get_active_npc_data() -> Dictionary:
	if _active_npc_id.is_empty():
		return {}
	return _dialogue_data_cache.get(_active_npc_id, {})

# --- Internal helpers ---

func _advance_to_node(node_id: String) -> void:
	_current_node_id = node_id
	_current_line_index = 0
	var node := _get_current_node()
	if node.is_empty():
		end_dialogue()
		return

	# Handle quiz node
	if node.get("type", "") == "quiz":
		var quiz_data: Dictionary = node.get("quiz_data", {})
		quiz_data["node_id"] = node_id
		quiz_data["npc_id"] = _active_npc_id
		quiz_triggered.emit(quiz_data)
		return

	var lines: Array = node.get("lines", [])
	if lines.is_empty():
		# Skip directly to choices or next
		var choices: Array = node.get("choices", [])
		if choices.size() > 0:
			dialogue_choices_ready.emit(choices)
		else:
			var next_node: String = node.get("next", "")
			if next_node.is_empty():
				end_dialogue()
			else:
				_advance_to_node(next_node)
		return

	_emit_line(lines[0])

func _emit_line(line_data: Dictionary) -> void:
	# Enrich with NPC info
	var npc_data := get_active_npc_data()
	var enriched := line_data.duplicate()
	enriched["npc_name_cn"] = npc_data.get("npc_name_cn", "")
	enriched["npc_name_fr"] = npc_data.get("npc_name_fr", "")
	enriched["portrait"] = npc_data.get("portrait", "")

	# Teach vocabulary if line introduces words
	if line_data.has("teaches"):
		for word_id in line_data["teaches"]:
			_teach_word(word_id)

	dialogue_line_ready.emit(enriched)

	# Play audio if available
	if line_data.has("audio"):
		AudioManager.play_dialogue(line_data["audio"])

func _get_current_node() -> Dictionary:
	if _active_tree.has(_current_node_id):
		return _active_tree[_current_node_id]
	return {}

func _teach_word(word_id: String) -> void:
	LearningManager.mark_word_seen(word_id)
	word_introduced.emit(word_id)

## Called after quiz completes to route to correct/wrong branch
func on_quiz_result(node_id: String, correct: bool) -> void:
	var node: Dictionary = _active_tree.get(node_id, {})
	var next_node: String
	if correct:
		next_node = node.get("on_correct", node.get("next", ""))
	else:
		next_node = node.get("on_wrong", node.get("next", ""))
	if next_node.is_empty() or next_node == "end":
		end_dialogue()
	else:
		_advance_to_node(next_node)

## Inject dialogue data directly (for runtime-generated dialogues)
func register_npc_dialogue(npc_id: String, data: Dictionary) -> void:
	_dialogue_data_cache[npc_id] = data
