## DialogueBox.gd
## UI controller for the dialogue display panel.
## Shows Chinese characters, pinyin (tone-colored), translation, portrait, audio button.
class_name DialogueBox
extends Control

# --- Signals ---
signal next_pressed()
signal skip_pressed()
signal choice_selected(index: int)
signal audio_requested(audio_path: String)

# --- Node references ---
@onready var panel: PanelContainer = $PanelContainer
@onready var portrait_texture: TextureRect = $PanelContainer/OuterVBox/HBox/Portrait
@onready var content_vbox: VBoxContainer = $PanelContainer/OuterVBox/HBox/ContentVBox
@onready var speaker_name_label: Label = $PanelContainer/OuterVBox/HBox/ContentVBox/SpeakerName
@onready var chinese_label: RichTextLabel = $PanelContainer/OuterVBox/HBox/ContentVBox/ChineseText
@onready var pinyin_label: RichTextLabel = $PanelContainer/OuterVBox/HBox/ContentVBox/PinyinText
@onready var translation_label: Label = $PanelContainer/OuterVBox/HBox/ContentVBox/TranslationText
@onready var choices_container: VBoxContainer = $PanelContainer/OuterVBox/ChoicesVBox
@onready var next_button: Button = $PanelContainer/OuterVBox/FooterHBox/NextButton
@onready var skip_button: Button = $PanelContainer/OuterVBox/FooterHBox/SkipButton
@onready var audio_button: Button = $PanelContainer/OuterVBox/FooterHBox/AudioButton
@onready var word_hint_panel: PanelContainer = $WordHintPanel
@onready var word_hint_label: Label = $WordHintPanel/Label
@onready var tone_highlighter: Node = $ToneHighlighter

# --- State ---
var _current_line: Dictionary = {}
var _current_audio_path: String = ""
var _choice_buttons: Array[Button] = []
var _is_showing_choices: bool = false

# --- Lifecycle ---
func _ready() -> void:
	DialogueManager.dialogue_started.connect(_on_dialogue_started)
	DialogueManager.dialogue_line_ready.connect(_on_line_ready)
	DialogueManager.dialogue_choices_ready.connect(_on_choices_ready)
	DialogueManager.dialogue_ended.connect(_on_dialogue_ended)

	if next_button:
		next_button.pressed.connect(_on_next_pressed)
	if skip_button:
		skip_button.pressed.connect(_on_skip_pressed)
	if audio_button:
		audio_button.pressed.connect(_on_audio_pressed)

	visible = false
	if word_hint_panel:
		word_hint_panel.visible = false

func _input(event: InputEvent) -> void:
	if not visible:
		return
	if event.is_action_just_pressed("ui_accept") and not _is_showing_choices:
		_on_next_pressed()

# --- Dialogue Events ---
func _on_dialogue_started(_npc_id: String) -> void:
	visible = true
	_clear_choices()
	_is_showing_choices = false

func _on_line_ready(line_data: Dictionary) -> void:
	_current_line = line_data
	_is_showing_choices = false
	_clear_choices()
	_display_line(line_data)

func _on_choices_ready(choices: Array) -> void:
	_is_showing_choices = true
	_show_choices(choices)

func _on_dialogue_ended(_npc_id: String) -> void:
	visible = false
	_clear_choices()
	if word_hint_panel:
		word_hint_panel.visible = false

# --- Display ---
func _display_line(line_data: Dictionary) -> void:
	# Speaker name
	var name_cn: String = line_data.get("npc_name_cn", "")
	var name_fr: String = line_data.get("npc_name_fr", "")
	if speaker_name_label:
		var display_name := name_cn
		if not name_fr.is_empty():
			display_name = name_cn + " (" + name_fr + ")"
		speaker_name_label.text = display_name

	# Portrait
	if portrait_texture:
		var portrait_path: String = line_data.get("portrait", "")
		if not portrait_path.is_empty() and FileAccess.file_exists(portrait_path):
			var tex := ResourceLoader.load(portrait_path, "Texture2D") as Texture2D
			portrait_texture.texture = tex
			portrait_texture.visible = true
		else:
			portrait_texture.visible = false

	# Chinese text (large)
	if chinese_label:
		chinese_label.text = line_data.get("cn", "")

	# Pinyin (tone-colored)
	if pinyin_label:
		var pinyin_raw: String = line_data.get("pinyin", "")
		if tone_highlighter and tone_highlighter.has_method("colorize_pinyin_bbcode"):
			pinyin_label.bbcode_enabled = true
			pinyin_label.text = tone_highlighter.colorize_pinyin_bbcode(pinyin_raw)
		else:
			pinyin_label.text = pinyin_raw

	# Translation
	if translation_label:
		translation_label.text = line_data.get("fr", line_data.get("en", ""))

	# Audio button
	_current_audio_path = line_data.get("audio", "")
	if audio_button:
		audio_button.visible = not _current_audio_path.is_empty()

	# Show vocab hint if this line teaches words
	_update_word_hint(line_data)

	# Show/hide next button
	if next_button:
		next_button.visible = true
	if choices_container:
		choices_container.visible = false

func _update_word_hint(line_data: Dictionary) -> void:
	if word_hint_panel == null:
		return
	var teaches: Array = line_data.get("teaches", [])
	if teaches.is_empty():
		word_hint_panel.visible = false
		return
	var first_word_id: String = teaches[0]
	var word_data := LearningManager.get_word_data(first_word_id)
	if word_data.is_empty():
		word_hint_panel.visible = false
		return
	if word_hint_label:
		var hint := "✦ " + word_data.get("hanzi", "") as String + " — " + TranslationManager.get_word_translation(word_data)
		word_hint_label.text = hint
	word_hint_panel.visible = true

# --- Choices ---
func _show_choices(choices: Array) -> void:
	_clear_choices()
	if next_button:
		next_button.visible = false
	if choices_container:
		choices_container.visible = true
	for i in choices.size():
		var choice: Dictionary = choices[i]
		var btn := Button.new()
		# Show choice in current language + CN
		var btn_text_fr: String = choice.get("text_fr", choice.get("text_cn", "?"))
		var btn_text_cn: String = choice.get("text_cn", "")
		if TranslationManager.current_language == "fr":
			btn.text = btn_text_fr
			if not btn_text_cn.is_empty():
				btn.text += "  [" + btn_text_cn + "]"
		else:
			btn.text = btn_text_cn if not btn_text_cn.is_empty() else btn_text_fr
		btn.pressed.connect(_on_choice_button_pressed.bind(i))
		if choices_container:
			choices_container.add_child(btn)
		_choice_buttons.append(btn)

func _clear_choices() -> void:
	for btn in _choice_buttons:
		if is_instance_valid(btn):
			btn.queue_free()
	_choice_buttons.clear()
	if choices_container:
		for child in choices_container.get_children():
			child.queue_free()

# --- Button Handlers ---
func _on_next_pressed() -> void:
	if _is_showing_choices:
		return
	AudioManager.play_ui_click()
	next_pressed.emit()
	DialogueManager.advance_dialogue()

func _on_skip_pressed() -> void:
	AudioManager.play_ui_cancel()
	skip_pressed.emit()
	DialogueManager.end_dialogue()

func _on_audio_pressed() -> void:
	if not _current_audio_path.is_empty():
		AudioManager.play_dialogue(_current_audio_path)
	else:
		# Try to play from current word
		var teaches: Array = _current_line.get("teaches", [])
		if not teaches.is_empty():
			AudioManager.play_vocab(teaches[0])
	audio_requested.emit(_current_audio_path)

func _on_choice_button_pressed(index: int) -> void:
	AudioManager.play_ui_confirm()
	choice_selected.emit(index)
	DialogueManager.select_choice(index)
	_clear_choices()
	_is_showing_choices = false
