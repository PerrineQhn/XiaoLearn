## QuestNPC.gd
## Extends NPC with quest-specific logic: quest markers, state-aware dialogue,
## and quest progression when player completes interactions.
class_name QuestNPC
extends NPC

# --- Exports ---
@export var primary_quest_id: String = ""
@export var quest_objective_id: String = ""
## Dialogue node to use when quest is not yet started
@export var dialogue_node_no_quest: String = "start"
## Dialogue node to use when quest is active
@export var dialogue_node_active: String = "start"
## Dialogue node to use when quest is completed
@export var dialogue_node_completed: String = "completed"

# --- Override interact ---
func interact(player: Node) -> void:
	if DialogueManager.is_dialogue_active():
		return
	if face_player_on_interact and player is Node2D:
		_face_toward(player.global_position)

	# Start quest if it hasn't been started yet
	if not primary_quest_id.is_empty():
		var quest_state := QuestManager.get_quest_state(primary_quest_id)
		if quest_state == QuestManager.QuestState.AVAILABLE:
			QuestManager.start_quest(primary_quest_id)

	npc_interacted.emit(npc_id)
	DialogueManager.start_dialogue(npc_id)
	_update_quest_marker()

## Called by QuestManager when dialogue ends with this NPC
func on_dialogue_ended() -> void:
	if not primary_quest_id.is_empty() and not quest_objective_id.is_empty():
		QuestManager.complete_objective(primary_quest_id, quest_objective_id)
	_update_quest_marker()

## Get the appropriate dialogue start node based on quest state
func get_dialogue_start_node() -> String:
	if primary_quest_id.is_empty():
		return dialogue_node_no_quest
	var state := QuestManager.get_quest_state(primary_quest_id)
	match state:
		QuestManager.QuestState.COMPLETED:
			return dialogue_node_completed
		QuestManager.QuestState.ACTIVE:
			return dialogue_node_active
		_:
			return dialogue_node_no_quest

## Check if this NPC has a reward to give
func has_reward() -> bool:
	if primary_quest_id.is_empty():
		return false
	var state := QuestManager.get_quest_state(primary_quest_id)
	if state != QuestManager.QuestState.ACTIVE:
		return false
	# Check if all objectives except reward are done
	var data := QuestManager.get_quest_data(primary_quest_id)
	var objectives: Array = data.get("objectives", [])
	var non_reward_done := true
	for obj in objectives:
		if obj.get("id", "") == quest_objective_id:
			continue
		if not QuestManager.is_objective_complete(primary_quest_id, obj.get("id", "")):
			non_reward_done = false
			break
	return non_reward_done

## Show a special "ready to turn in" indicator
func _update_quest_marker() -> void:
	super._update_quest_marker()
	# Additional visual for "ready to complete" state
	if quest_marker and has_reward():
		if quest_marker.has_node("TurnIn"):
			quest_marker.get_node("TurnIn").visible = true
