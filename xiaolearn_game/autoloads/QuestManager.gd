## QuestManager.gd
## Manages quest loading, tracking, objective completion, and rewards.
extends Node

# --- Signals ---
signal quest_started(quest_id: String)
signal quest_objective_completed(quest_id: String, objective_id: String)
signal quest_completed(quest_id: String)
signal quest_failed(quest_id: String)

# --- Enums ---
enum QuestState {
	LOCKED,
	AVAILABLE,
	ACTIVE,
	COMPLETED,
	FAILED
}

enum ObjectiveType {
	TALK_TO_NPC,
	COLLECT_ITEM,
	ANSWER_QUIZ,
	VISIT_LOCATION,
	LEARN_WORD,
	USE_PHRASE
}

# --- Constants ---
const QUESTS_BASE_PATH := "res://data/quests/"
const QUEST_FILES := {
	"beijing": "beijing_quests.json",
	"shanghai": "shanghai_quests.json",
	"xian": "xian_quests.json",
	"chengdu": "chengdu_quests.json",
	"guilin": "guilin_quests.json",
}

# --- State ---
# quest_id -> { state: QuestState, objectives: {obj_id: bool}, data: Dictionary }
var quest_records: Dictionary = {}
var active_quests: Array[String] = []
var completed_quests: Array[String] = []
var all_quest_data: Dictionary = {}

# NPC -> which quests they're involved in
var npc_quest_map: Dictionary = {}

# --- Lifecycle ---
func _ready() -> void:
	pass

# --- Quest Loading ---
func load_region_quests(region_id: String) -> void:
	if not QUEST_FILES.has(region_id):
		return
	var path := QUESTS_BASE_PATH + QUEST_FILES[region_id] as String
	var file := FileAccess.open(path, FileAccess.READ)
	if file == null:
		push_warning("QuestManager: Cannot open " + path)
		return
	var text := file.get_as_text()
	file.close()
	var parsed: Variant = JSON.parse_string(text)
	if parsed == null:
		push_error("QuestManager: Failed to parse " + path)
		return
	var quests: Array = []
	if parsed is Array:
		quests = parsed
	elif parsed is Dictionary and parsed.has("quests"):
		quests = parsed["quests"]

	for quest_data in quests:
		var qid: String = quest_data.get("id", "")
		if qid.is_empty():
			continue
		all_quest_data[qid] = quest_data
		# Initialize record if not present
		if not quest_records.has(qid):
			quest_records[qid] = {
				"state": QuestState.AVAILABLE,
				"objectives": {},
				"data": quest_data
			}
			# Initialize objectives
			var objectives: Array = quest_data.get("objectives", [])
			for obj in objectives:
				var obj_id: String = obj.get("id", "")
				if not obj_id.is_empty():
					quest_records[qid]["objectives"][obj_id] = false
		# Build NPC quest map
		_register_quest_npcs(quest_data)
		# Auto-start first quest if none active
		if active_quests.is_empty() and region_id == GameManager.current_region_id:
			if quest_data.get("auto_start", false):
				start_quest(qid)

func _register_quest_npcs(quest_data: Dictionary) -> void:
	var objectives: Array = quest_data.get("objectives", [])
	for obj in objectives:
		if obj.get("type", "") == "talk_to_npc":
			var npc_id: String = obj.get("target_npc", "")
			if not npc_id.is_empty():
				if not npc_quest_map.has(npc_id):
					npc_quest_map[npc_id] = []
				if not quest_data["id"] in npc_quest_map[npc_id]:
					npc_quest_map[npc_id].append(quest_data["id"])

# --- Quest Management ---
func start_quest(quest_id: String) -> bool:
	if not all_quest_data.has(quest_id):
		push_warning("QuestManager: Unknown quest " + quest_id)
		return false
	if quest_records.has(quest_id):
		var state: QuestState = quest_records[quest_id]["state"]
		if state == QuestState.ACTIVE or state == QuestState.COMPLETED:
			return false

	if not quest_records.has(quest_id):
		quest_records[quest_id] = {
			"state": QuestState.ACTIVE,
			"objectives": {},
			"data": all_quest_data[quest_id]
		}
	else:
		quest_records[quest_id]["state"] = QuestState.ACTIVE

	if not quest_id in active_quests:
		active_quests.append(quest_id)
	quest_started.emit(quest_id)
	return true

func complete_objective(quest_id: String, objective_id: String) -> void:
	if not quest_records.has(quest_id):
		return
	var rec: Dictionary = quest_records[quest_id]
	if rec["state"] != QuestState.ACTIVE:
		return
	if not rec["objectives"].has(objective_id):
		return
	if rec["objectives"][objective_id]:
		return  # Already done
	rec["objectives"][objective_id] = true
	quest_objective_completed.emit(quest_id, objective_id)
	# Check if all objectives complete
	_check_quest_completion(quest_id)

func _check_quest_completion(quest_id: String) -> void:
	var rec: Dictionary = quest_records[quest_id]
	for obj_id in rec["objectives"]:
		if not rec["objectives"][obj_id]:
			return
	# All done!
	rec["state"] = QuestState.COMPLETED
	active_quests.erase(quest_id)
	if not quest_id in completed_quests:
		completed_quests.append(quest_id)
	quest_completed.emit(quest_id)
	# Grant rewards
	_grant_quest_rewards(quest_id)
	# Try to unlock next quest in chain
	_try_unlock_next_quest(quest_id)

func _grant_quest_rewards(quest_id: String) -> void:
	var data: Dictionary = all_quest_data.get(quest_id, {})
	var rewards: Dictionary = data.get("rewards", {})
	if rewards.has("unlock_region"):
		GameManager.unlock_region(rewards["unlock_region"])
	if rewards.has("vocab_pack"):
		LearningManager.load_vocab_pack(rewards["vocab_pack"])
	if rewards.has("unlock_quest"):
		start_quest(rewards["unlock_quest"])

func _try_unlock_next_quest(completed_id: String) -> void:
	for qid in all_quest_data:
		var data: Dictionary = all_quest_data[qid]
		var prereqs: Array = data.get("prerequisites", [])
		if completed_id in prereqs:
			# Check all prereqs met
			var all_met := true
			for prereq in prereqs:
				if not prereq in completed_quests:
					all_met = false
					break
			if all_met:
				start_quest(qid)

# --- State Queries ---
func get_quest_state(quest_id: String) -> QuestState:
	if quest_records.has(quest_id):
		return quest_records[quest_id]["state"]
	return QuestState.LOCKED

func is_objective_complete(quest_id: String, objective_id: String) -> bool:
	if not quest_records.has(quest_id):
		return false
	return quest_records[quest_id]["objectives"].get(objective_id, false)

func get_active_quests_data() -> Array:
	var result: Array = []
	for qid in active_quests:
		result.append(all_quest_data.get(qid, {}))
	return result

func get_quest_data(quest_id: String) -> Dictionary:
	return all_quest_data.get(quest_id, {})

func has_quest_marker(npc_id: String) -> bool:
	if not npc_quest_map.has(npc_id):
		return false
	for quest_id in npc_quest_map[npc_id]:
		var state := get_quest_state(quest_id)
		if state == QuestState.ACTIVE or state == QuestState.AVAILABLE:
			return true
	return false

func get_npc_quest_state(npc_id: String) -> String:
	## Returns "available", "active", "completed", or ""
	if not npc_quest_map.has(npc_id):
		return ""
	for quest_id in npc_quest_map[npc_id]:
		var state := get_quest_state(quest_id)
		match state:
			QuestState.AVAILABLE:
				return "available"
			QuestState.ACTIVE:
				return "active"
			QuestState.COMPLETED:
				return "completed"
	return ""

## Called by DialogueManager when a dialogue ends
func on_dialogue_completed(npc_id: String) -> void:
	for quest_id in active_quests:
		var rec: Dictionary = quest_records[quest_id]
		var data: Dictionary = all_quest_data.get(quest_id, {})
		var objectives: Array = data.get("objectives", [])
		for obj in objectives:
			if obj.get("type", "") == "talk_to_npc" and obj.get("target_npc", "") == npc_id:
				complete_objective(quest_id, obj.get("id", ""))

## Called when player visits a location
func on_location_visited(location_id: String) -> void:
	for quest_id in active_quests:
		var data: Dictionary = all_quest_data.get(quest_id, {})
		var objectives: Array = data.get("objectives", [])
		for obj in objectives:
			if obj.get("type", "") == "visit_location" and obj.get("target_location", "") == location_id:
				complete_objective(quest_id, obj.get("id", ""))

## Called when a quiz is answered correctly
func on_quiz_answered(quiz_id: String) -> void:
	for quest_id in active_quests:
		var data: Dictionary = all_quest_data.get(quest_id, {})
		var objectives: Array = data.get("objectives", [])
		for obj in objectives:
			if obj.get("type", "") == "answer_quiz" and obj.get("quiz_id", "") == quiz_id:
				complete_objective(quest_id, obj.get("id", ""))

## Get the override start node for an NPC's dialogue (based on quest progress)
func get_dialogue_start_node(npc_id: String) -> String:
	if not npc_quest_map.has(npc_id):
		return ""
	for quest_id in npc_quest_map[npc_id]:
		var data: Dictionary = all_quest_data.get(quest_id, {})
		var state := get_quest_state(quest_id)
		if state == QuestState.COMPLETED:
			return data.get("npc_dialogue_completed", {}).get(npc_id, "")
		if state == QuestState.ACTIVE:
			return data.get("npc_dialogue_active", {}).get(npc_id, "")
	return ""

# --- Save/Load ---
func get_save_data() -> Dictionary:
	return {
		"quest_records": _serialize_records(),
		"active_quests": active_quests,
		"completed_quests": completed_quests
	}

func _serialize_records() -> Dictionary:
	var result: Dictionary = {}
	for qid in quest_records:
		var rec: Dictionary = quest_records[qid]
		result[qid] = {
			"state": int(rec["state"]),
			"objectives": rec["objectives"]
		}
	return result

func load_save_data(data: Dictionary) -> void:
	completed_quests = data.get("completed_quests", [])
	active_quests = data.get("active_quests", [])
	var records: Dictionary = data.get("quest_records", {})
	for qid in records:
		var rec: Dictionary = records[qid]
		quest_records[qid] = {
			"state": rec.get("state", 0) as QuestState,
			"objectives": rec.get("objectives", {}),
			"data": all_quest_data.get(qid, {})
		}

func reset() -> void:
	quest_records = {}
	active_quests = []
	completed_quests = []
	npc_quest_map = {}
