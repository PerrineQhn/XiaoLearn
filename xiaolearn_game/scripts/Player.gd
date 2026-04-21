## Player.gd
## Top-down player controller with virtual joystick support for mobile.
## Handles movement, animation state machine, and NPC interaction detection.
class_name Player
extends CharacterBody2D

# --- Signals ---
signal interacted(target: Node)
signal interaction_available(target: Node)
signal interaction_unavailable()

# --- Exports ---
@export var move_speed: float = 120.0
@export var run_speed: float = 200.0
@export var interaction_radius: float = 48.0

# --- Node references ---
@onready var animated_sprite: AnimatedSprite2D = $AnimatedSprite2D
@onready var interaction_area: Area2D = $InteractionArea
@onready var collision: CollisionShape2D = $CollisionShape2D
@onready var interaction_indicator: Node2D = $InteractionIndicator
@onready var camera: Camera2D = $Camera2D

# --- State ---
var _joystick_input: Vector2 = Vector2.ZERO
var _is_running: bool = false
var _facing_direction: Vector2 = Vector2.DOWN
var _interaction_target: Node = null
var _can_interact: bool = false
var _is_dialogue_active: bool = false

# --- Constants ---
const ANIM_IDLE_DOWN := "idle_down"
const ANIM_IDLE_UP := "idle_up"
const ANIM_IDLE_LEFT := "idle_left"
const ANIM_IDLE_RIGHT := "idle_right"
const ANIM_WALK_DOWN := "walk_down"
const ANIM_WALK_UP := "walk_up"
const ANIM_WALK_LEFT := "walk_left"
const ANIM_WALK_RIGHT := "walk_right"

# --- Lifecycle ---
func _ready() -> void:
	interaction_area.body_entered.connect(_on_interactable_entered)
	interaction_area.body_exited.connect(_on_interactable_exited)
	interaction_area.area_entered.connect(_on_interactable_area_entered)
	interaction_area.area_exited.connect(_on_interactable_area_exited)
	DialogueManager.dialogue_started.connect(_on_dialogue_started)
	DialogueManager.dialogue_ended.connect(_on_dialogue_ended)
	_update_animation()

func _physics_process(delta: float) -> void:
	if _is_dialogue_active:
		velocity = Vector2.ZERO
		move_and_slide()
		return
	_handle_movement(delta)
	_handle_interact_input()
	move_and_slide()
	_update_animation()
	_save_position()

# --- Input Handling ---
func _handle_movement(_delta: float) -> void:
	var input_dir := _joystick_input
	# Keyboard: arrows + WASD + ZQSD (AZERTY)
	if input_dir == Vector2.ZERO:
		input_dir.x = Input.get_axis("ui_left", "ui_right")
		input_dir.y = Input.get_axis("ui_up", "ui_down")
	if input_dir == Vector2.ZERO:
		# Fallback: direct key check for any keyboard layout
		if Input.is_key_pressed(KEY_LEFT) or Input.is_key_pressed(KEY_A) or Input.is_key_pressed(KEY_Q):
			input_dir.x -= 1.0
		if Input.is_key_pressed(KEY_RIGHT) or Input.is_key_pressed(KEY_D):
			input_dir.x += 1.0
		if Input.is_key_pressed(KEY_UP) or Input.is_key_pressed(KEY_W) or Input.is_key_pressed(KEY_Z):
			input_dir.y -= 1.0
		if Input.is_key_pressed(KEY_DOWN) or Input.is_key_pressed(KEY_S):
			input_dir.y += 1.0
	if input_dir.length() > 1.0:
		input_dir = input_dir.normalized()
	var speed := run_speed if _is_running else move_speed
	velocity = input_dir * speed
	if input_dir != Vector2.ZERO:
		_facing_direction = input_dir.normalized()

func _handle_interact_input() -> void:
	if Input.is_action_just_pressed("ui_interact") and _can_interact and _interaction_target != null:
		_do_interact()

func _do_interact() -> void:
	if _interaction_target == null:
		return
	# Face the target first
	if _interaction_target is Node2D:
		var target_pos := (_interaction_target as Node2D).global_position
		var dir := (target_pos - global_position).normalized()
		if dir != Vector2.ZERO:
			_facing_direction = dir
			_update_animation()
	# Emit signal for any listeners
	interacted.emit(_interaction_target)
	# Actually trigger the interaction on the target
	if _interaction_target.has_method("interact"):
		_interaction_target.interact(self)
	elif _interaction_target.has_method("trigger_interaction"):
		_interaction_target.trigger_interaction(self)
	AudioManager.play_sfx("ui_confirm")

# --- Virtual Joystick API (called from HUD) ---
func set_joystick_input(direction: Vector2) -> void:
	_joystick_input = direction

func set_running(running: bool) -> void:
	_is_running = running

# --- Interaction Area ---
func _on_interactable_entered(body: Node) -> void:
	if body.has_method("get_interaction_data"):
		_set_interaction_target(body)

func _on_interactable_exited(body: Node) -> void:
	if body == _interaction_target:
		_clear_interaction_target()

func _on_interactable_area_entered(area: Area2D) -> void:
	if area.has_method("get_interaction_data"):
		_set_interaction_target(area)

func _on_interactable_area_exited(area: Area2D) -> void:
	if area == _interaction_target:
		_clear_interaction_target()

func _set_interaction_target(target: Node) -> void:
	_interaction_target = target
	_can_interact = true
	if interaction_indicator:
		interaction_indicator.visible = true
	interaction_available.emit(target)

func _clear_interaction_target() -> void:
	_interaction_target = null
	_can_interact = false
	if interaction_indicator:
		interaction_indicator.visible = false
	interaction_unavailable.emit()

# --- Animation ---
func _update_animation() -> void:
	# No sprite frames yet — animated_sprite is invisible until frames are added
	if animated_sprite == null or not animated_sprite.sprite_frames:
		return
	var moving := velocity.length() > 5.0
	var anim_name: String
	if abs(_facing_direction.x) > abs(_facing_direction.y):
		anim_name = (ANIM_WALK_RIGHT if _facing_direction.x > 0 else ANIM_WALK_LEFT) if moving else (ANIM_IDLE_RIGHT if _facing_direction.x > 0 else ANIM_IDLE_LEFT)
	else:
		anim_name = (ANIM_WALK_DOWN if _facing_direction.y > 0 else ANIM_WALK_UP) if moving else (ANIM_IDLE_DOWN if _facing_direction.y > 0 else ANIM_IDLE_UP)
	if animated_sprite.animation != anim_name:
		animated_sprite.play(anim_name)

# --- Dialogue callbacks ---
func _on_dialogue_started(_npc_id: String) -> void:
	_is_dialogue_active = true
	velocity = Vector2.ZERO

func _on_dialogue_ended(_npc_id: String) -> void:
	_is_dialogue_active = false

# --- Position saving ---
func _save_position() -> void:
	GameManager.saved_player_position = global_position
	GameManager.saved_player_region = GameManager.current_region_id

# --- Public API ---
func get_facing_direction() -> Vector2:
	return _facing_direction

func teleport_to(pos: Vector2) -> void:
	global_position = pos
	velocity = Vector2.ZERO

func get_interaction_data() -> Dictionary:
	return {}  # Player itself is not interactable
