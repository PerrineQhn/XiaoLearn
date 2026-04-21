## InteractableObject.gd
## Generic interactable scene objects: signs, shrines, market stalls, etc.
## Shows tooltip, triggers dialogue, quiz, or vocabulary entry.
class_name InteractableObject
extends StaticBody2D

# --- Signals ---
signal object_interacted(object_id: String)

# --- Enums ---
enum InteractionType {
	DIALOGUE,    # Triggers a dialogue tree
	QUIZ,        # Opens a quiz directly
	VOCAB,       # Shows a vocabulary entry
	LOCATION,    # Marks a location visit + optional dialogue
	SIGN,        # Simple text display
}

# --- Exports ---
@export var object_id: String = ""
@export var object_name_cn: String = ""
@export var object_name_fr: String = ""
@export var interaction_type: InteractionType = InteractionType.SIGN
@export var dialogue_npc_id: String = ""  # For DIALOGUE type
@export var vocab_word_id: String = ""    # For VOCAB type
@export var sign_text_cn: String = ""     # For SIGN type
@export var sign_text_fr: String = ""     # For SIGN type
@export var location_id: String = ""      # For LOCATION type
@export var show_tooltip: bool = true

# --- Node references ---
@onready var sprite: Sprite2D = $Sprite2D
@onready var interaction_area: Area2D = $InteractionArea
@onready var tooltip_label: Label = $TooltipLabel
@onready var interact_prompt: Control = $InteractPrompt

# --- State ---
var _player_nearby: bool = false
var _has_been_visited: bool = false

# --- Lifecycle ---
func _ready() -> void:
	if interaction_area:
		interaction_area.body_entered.connect(_on_body_entered)
		interaction_area.body_exited.connect(_on_body_exited)
	if tooltip_label:
		tooltip_label.text = object_name_cn
		tooltip_label.visible = false
	if interact_prompt:
		interact_prompt.visible = false

func _input(event: InputEvent) -> void:
	if _player_nearby and event.is_action_pressed("ui_interact"):
		_trigger_interaction()

# --- Interaction ---
func get_interaction_data() -> Dictionary:
	return {
		"type": "object",
		"object_id": object_id,
		"interaction_type": interaction_type,
		"name_cn": object_name_cn,
		"name_fr": object_name_fr,
	}

func _trigger_interaction() -> void:
	if DialogueManager.is_dialogue_active():
		return
	object_interacted.emit(object_id)
	AudioManager.play_sfx("ui_confirm")
	match interaction_type:
		InteractionType.DIALOGUE:
			_do_dialogue()
		InteractionType.QUIZ:
			_do_quiz()
		InteractionType.VOCAB:
			_do_vocab()
		InteractionType.LOCATION:
			_do_location()
		InteractionType.SIGN:
			_do_sign()

func _do_dialogue() -> void:
	if not dialogue_npc_id.is_empty():
		DialogueManager.start_dialogue(dialogue_npc_id)

func _do_quiz() -> void:
	# Build a quick quiz from associated vocabulary
	if not vocab_word_id.is_empty():
		var word_data := LearningManager.get_word_data(vocab_word_id)
		if not word_data.is_empty():
			var quiz_data := _build_quiz(word_data)
			DialogueManager.quiz_triggered.emit(quiz_data)

func _build_quiz(word_data: Dictionary) -> Dictionary:
	var hsk_level: int = word_data.get("hsk_level", 1)
	var distractors := LearningManager.get_random_words_for_quiz(hsk_level, 3, vocab_word_id)
	var options: Array = [word_data]
	for d in distractors:
		options.append(d)
	options.shuffle()
	var correct_idx := options.find(word_data)
	return {
		"question_word_id": vocab_word_id,
		"question_type": "cn_to_fr",
		"question_cn": word_data.get("hanzi", ""),
		"question_pinyin": word_data.get("pinyin", ""),
		"options": options,
		"correct_index": correct_idx,
	}

func _do_vocab() -> void:
	if not vocab_word_id.is_empty():
		LearningManager.mark_word_seen(vocab_word_id)
		# Signal to open notebook on this word
		var word_data := LearningManager.get_word_data(vocab_word_id)
		if not word_data.is_empty():
			# Use a simple dialogue to present the word
			var fake_line := {
				"cn": word_data.get("hanzi", ""),
				"pinyin": word_data.get("pinyin", ""),
				"fr": TranslationManager.get_word_translation(word_data),
				"npc_name_cn": object_name_cn,
				"npc_name_fr": object_name_fr,
				"portrait": "",
				"is_vocab_card": true,
			}
			DialogueManager.dialogue_line_ready.emit(fake_line)

func _do_location() -> void:
	if not location_id.is_empty():
		QuestManager.on_location_visited(location_id)
		_has_been_visited = true
	# Also show any associated dialogue
	if not dialogue_npc_id.is_empty():
		_do_dialogue()
	else:
		_show_sign_popup()

func _do_sign() -> void:
	_show_sign_popup()

func _show_sign_popup() -> void:
	var text := sign_text_cn
	if not sign_text_fr.is_empty():
		text += "\n" + sign_text_fr
	# Emit as a single dialogue line
	var line := {
		"cn": sign_text_cn,
		"pinyin": "",
		"fr": sign_text_fr,
		"npc_name_cn": object_name_cn,
		"npc_name_fr": object_name_fr,
		"portrait": "",
		"is_sign": true,
	}
	GameManager.set_game_state(GameManager.GameState.DIALOGUE)
	DialogueManager.dialogue_started.emit(object_id)
	DialogueManager.dialogue_line_ready.emit(line)

# --- Proximity ---
func _on_body_entered(body: Node) -> void:
	if body is Player:
		_player_nearby = true
		if show_tooltip and tooltip_label:
			tooltip_label.visible = true
		if interact_prompt:
			interact_prompt.visible = true

func _on_body_exited(body: Node) -> void:
	if body is Player:
		_player_nearby = false
		if tooltip_label:
			tooltip_label.visible = false
		if interact_prompt:
			interact_prompt.visible = false
