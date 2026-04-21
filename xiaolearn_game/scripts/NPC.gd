## NPC.gd
## Base NPC class. Handles dialogue triggering, quest markers, and optional wander.
class_name NPC
extends CharacterBody2D

# --- Signals ---
signal npc_interacted(npc_id: String)

# --- Exports ---
@export var npc_id: String = ""
@export var npc_name_cn: String = ""
@export var npc_name_fr: String = ""
@export var portrait_path: String = ""
@export var enable_wander: bool = false
@export var wander_radius: float = 64.0
@export var wander_speed: float = 30.0
@export var wander_wait_min: float = 1.5
@export var wander_wait_max: float = 4.0
@export var face_player_on_interact: bool = true

# --- Node references ---
@onready var sprite: Sprite2D = $Sprite2D
@onready var interaction_area: Area2D = $InteractionArea
@onready var quest_marker: Node2D = $QuestMarker
@onready var name_label: Label = $NameLabel
@onready var wander_timer: Timer = $WanderTimer

# --- State ---
var _home_position: Vector2 = Vector2.ZERO
var _wander_target: Vector2 = Vector2.ZERO
var _is_wandering: bool = false
var _player_nearby: bool = false
var _facing_direction: Vector2 = Vector2.DOWN

# --- Lifecycle ---
func _ready() -> void:
	_home_position = global_position
	_wander_target = global_position

	if interaction_area:
		interaction_area.body_entered.connect(_on_player_entered)
		interaction_area.body_exited.connect(_on_player_exited)

	if wander_timer:
		wander_timer.timeout.connect(_on_wander_timer_timeout)
		if enable_wander:
			_start_wander_cycle()

	if name_label:
		name_label.text = npc_name_cn if not npc_name_cn.is_empty() else npc_name_fr
		name_label.visible = false

	_update_quest_marker()
	if QuestManager.has_signal("quest_started"):
		QuestManager.quest_started.connect(_on_quest_state_changed)
	if QuestManager.has_signal("quest_completed"):
		QuestManager.quest_completed.connect(_on_quest_state_changed)

func _physics_process(_delta: float) -> void:
	if enable_wander and _is_wandering and not _player_nearby:
		_do_wander()
	else:
		velocity = Vector2.ZERO
		move_and_slide()

# --- Interaction ---
func get_interaction_data() -> Dictionary:
	return {
		"type": "npc",
		"npc_id": npc_id,
		"name_cn": npc_name_cn,
		"name_fr": npc_name_fr,
	}

func interact(player: Node) -> void:
	if DialogueManager.is_dialogue_active():
		return
	if face_player_on_interact and player is Node2D:
		_face_toward(player.global_position)
	npc_interacted.emit(npc_id)
	DialogueManager.start_dialogue(npc_id)
	_update_quest_marker()

## Called by InteractionArea when player presses interact button nearby
func trigger_interaction(interactor: Node) -> void:
	interact(interactor)

# --- Quest Marker ---
func _update_quest_marker() -> void:
	if quest_marker == null:
		return
	var state := QuestManager.get_npc_quest_state(npc_id)
	quest_marker.visible = (state != "")
	# Visual: use different markers for available vs active
	if quest_marker.has_node("Available"):
		quest_marker.get_node("Available").visible = (state == "available")
	if quest_marker.has_node("Active"):
		quest_marker.get_node("Active").visible = (state == "active")
	if quest_marker.has_node("Completed"):
		quest_marker.get_node("Completed").visible = (state == "completed")

func _on_quest_state_changed(_id) -> void:
	_update_quest_marker()

# --- Facing ---
func _face_toward(target_pos: Vector2) -> void:
	var dir := (target_pos - global_position).normalized()
	_set_facing(dir)

func _set_facing(dir: Vector2) -> void:
	if dir == Vector2.ZERO:
		return
	_facing_direction = dir
	_update_sprite_direction()

func _update_sprite_direction() -> void:
	if sprite == null:
		return
	# Flip sprite horizontally for left/right facing
	if abs(_facing_direction.x) > abs(_facing_direction.y):
		sprite.flip_h = (_facing_direction.x < 0)
	# Row offset for spritesheet: row 0=down, 1=up, 2=left/right
	# Adjust region_rect.y if your spritesheet uses rows
	# sprite.region_rect.position.y = row * frame_height

# --- Wander ---
func _start_wander_cycle() -> void:
	if wander_timer:
		wander_timer.wait_time = randf_range(wander_wait_min, wander_wait_max)
		wander_timer.start()

func _on_wander_timer_timeout() -> void:
	if _player_nearby:
		_start_wander_cycle()
		return
	var angle := randf_range(0, TAU)
	var distance := randf_range(0, wander_radius)
	_wander_target = _home_position + Vector2(cos(angle), sin(angle)) * distance
	_is_wandering = true

func _do_wander() -> void:
	var diff := _wander_target - global_position
	if diff.length() < 4.0:
		_is_wandering = false
		velocity = Vector2.ZERO
		move_and_slide()
		_start_wander_cycle()
		return
	var dir := diff.normalized()
	velocity = dir * wander_speed
	_set_facing(dir)
	move_and_slide()

# --- Proximity ---
func _on_player_entered(body: Node) -> void:
	if body is Player:
		_player_nearby = true
		if name_label:
			name_label.visible = true
		if face_player_on_interact:
			_face_toward(body.global_position)

func _on_player_exited(body: Node) -> void:
	if body is Player:
		_player_nearby = false
		if name_label:
			name_label.visible = false
