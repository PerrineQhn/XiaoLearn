## RegionMap.gd
## Per-region map controller. Manages tilemap layers, NPC spawning, music,
## exit triggers, and first-visit cutscenes.
class_name RegionMap
extends Node2D

# --- Exports ---
@export var region_id: String = ""
@export var spawn_point: Vector2 = Vector2(100, 100)
@export var first_visit_cutscene_npc: String = ""  # NPC to trigger on first visit
@export var npc_data: Array[Dictionary] = []       # Populated via editor or data file

# --- Node references ---
@onready var player_spawn: Marker2D = $PlayerSpawn
@onready var tilemap: TileMap = $TileMap
@onready var npcs_container: Node2D = $NPCs
@onready var objects_container: Node2D = $Objects
@onready var exit_triggers: Node2D = $ExitTriggers
@onready var hud: CanvasLayer = $HUD
@onready var cutscene_player: AnimationPlayer = $CutscenePlayer

# NPC scene references
@export var npc_scene: PackedScene
@export var quest_npc_scene: PackedScene

# --- State ---
var _player: Player = null
var _is_first_visit: bool = true
var _cutscene_played: bool = false

# --- Lifecycle ---
func _ready() -> void:
	_load_region()
	_spawn_player()
	_setup_music()
	_setup_exits()
	_check_first_visit()
	GameManager.set_game_state(GameManager.GameState.EXPLORING)

func _load_region() -> void:
	if region_id.is_empty():
		push_error("RegionMap: No region_id set!")
		return
	# Pre-load all required data
	DialogueManager.preload_region_dialogues(region_id)
	QuestManager.load_region_quests(region_id)
	var region_data := GameManager.get_region_data(region_id)
	if region_data.has("vocabulary_pack"):
		LearningManager.load_vocab_pack(region_data["vocabulary_pack"])

func _spawn_player() -> void:
	var player_scene := preload("res://scenes/player.tscn") as PackedScene
	if player_scene == null:
		push_error("RegionMap: Cannot load player scene")
		return
	_player = player_scene.instantiate() as Player
	var spawn_pos: Vector2
	# Use saved position if returning to same region
	if GameManager.saved_player_region == region_id and GameManager.saved_player_position != Vector2.ZERO:
		spawn_pos = GameManager.saved_player_position
	elif player_spawn:
		spawn_pos = player_spawn.global_position
	else:
		spawn_pos = spawn_point
	_player.global_position = spawn_pos
	add_child(_player)
	# Connect player to HUD
	var hud_scene = hud.get_node_or_null("HUDScene")
	if hud_scene and hud_scene is HUD:
		hud_scene.connect_player(_player)
	# Connect interact button via HUD
	if hud_scene and hud_scene is HUD:
		if hud_scene.interact_button:
			hud_scene.interact_button.pressed.connect(_on_interact_pressed)

func _setup_music() -> void:
	AudioManager.play_region_music(region_id)

func _setup_exits() -> void:
	if exit_triggers == null:
		return
	for exit in exit_triggers.get_children():
		if exit is Area2D:
			exit.body_entered.connect(_on_exit_triggered.bind(exit.name))

func _check_first_visit() -> void:
	# Check if this region has been visited before
	var visited_regions: Array = GameManager.get_save_data().get("visited_regions", [])
	_is_first_visit = not region_id in visited_regions
	if _is_first_visit:
		_mark_region_visited()
		# NOTE: First-visit cutscene disabled — player interacts with NPCs manually.
		# Re-enable _play_first_visit_sequence.call_deferred() once sprite assets are ready.

func _mark_region_visited() -> void:
	var save := GameManager.get_save_data()
	var visited: Array = save.get("visited_regions", [])
	if not region_id in visited:
		visited.append(region_id)
		save["visited_regions"] = visited

# --- First Visit Cutscene ---
func _play_first_visit_sequence() -> void:
	_cutscene_played = true
	if not first_visit_cutscene_npc.is_empty():
		# Wait a moment then trigger welcome dialogue
		await get_tree().create_timer(1.0).timeout
		GameManager.set_game_state(GameManager.GameState.CUTSCENE)
		var started := DialogueManager.start_dialogue(first_visit_cutscene_npc)
		if started:
			await DialogueManager.dialogue_ended
		GameManager.set_game_state(GameManager.GameState.EXPLORING)
	elif cutscene_player and cutscene_player.has_animation("first_visit"):
		GameManager.set_game_state(GameManager.GameState.CUTSCENE)
		cutscene_player.play("first_visit")
		await cutscene_player.animation_finished
		GameManager.set_game_state(GameManager.GameState.EXPLORING)

# --- Exit Triggers ---
func _on_exit_triggered(exit_name: String) -> void:
	match exit_name:
		"ExitToWorldMap":
			_return_to_world_map()
		_:
			var target_region: String = exit_name.replace("ExitTo_", "")
			if not target_region.is_empty():
				_travel_to_region(target_region)

func _return_to_world_map() -> void:
	AudioManager.play_ui_click()
	SaveManager.auto_save()
	get_tree().change_scene_to_file("res://scenes/world_map.tscn")

func _travel_to_region(target_region: String) -> void:
	if not GameManager.is_region_unlocked(target_region):
		# Show locked message
		return
	var region_data := GameManager.get_region_data(target_region)
	var scene_path: String = region_data.get("scene", "")
	if not scene_path.is_empty():
		GameManager.change_region(target_region)
		SaveManager.auto_save()
		get_tree().change_scene_to_file(scene_path)

# --- Interact button ---
func _on_interact_pressed() -> void:
	if _player == null:
		return
	if not _player._can_interact or _player._interaction_target == null:
		return
	var target = _player._interaction_target
	if not is_instance_valid(target):
		_player._clear_interaction_target()
		return
	if target.has_method("interact"):
		target.interact(_player)
	elif target.has_method("trigger_interaction"):
		target.trigger_interaction(_player)

# --- Pause / Unpause ---
func _input(event: InputEvent) -> void:
	if event.is_action_pressed("ui_cancel"):
		if GameManager.current_state == GameManager.GameState.EXPLORING:
			GameManager.set_game_state(GameManager.GameState.PAUSED)
		elif GameManager.current_state == GameManager.GameState.PAUSED:
			GameManager.set_game_state(GameManager.GameState.EXPLORING)

# --- Tilemap helpers ---
func get_tile_data_at(world_pos: Vector2) -> Dictionary:
	if tilemap == null:
		return {}
	var cell := tilemap.local_to_map(tilemap.to_local(world_pos))
	return {
		"cell": cell,
		"tile_data": tilemap.get_cell_tile_data(0, cell)
	}
