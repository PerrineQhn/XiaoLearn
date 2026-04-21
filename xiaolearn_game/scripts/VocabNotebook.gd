## VocabNotebook.gd
## Vocabulary notebook UI: grid of learned words, HSK filter, search, word detail view.
class_name VocabNotebook
extends Control

# --- Signals ---
signal closed()
signal word_audio_requested(word_id: String)

# --- Node references ---
@onready var word_grid: GridContainer = $MainPanel/VBox/ScrollContainer/WordGrid
@onready var search_field: LineEdit = $MainPanel/VBox/TopBar/SearchField
@onready var hsk_filter_buttons: HBoxContainer = $MainPanel/VBox/TopBar/HSKFilters
@onready var close_button: Button = $MainPanel/VBox/TopBar/CloseButton
@onready var detail_panel: PanelContainer = $DetailPanel
@onready var detail_hanzi: Label = $DetailPanel/VBox/Hanzi
@onready var detail_pinyin: RichTextLabel = $DetailPanel/VBox/Pinyin
@onready var detail_translation: Label = $DetailPanel/VBox/Translation
@onready var detail_pos: Label = $DetailPanel/VBox/PartOfSpeech
@onready var detail_example_cn: Label = $DetailPanel/VBox/ExampleCN
@onready var detail_example_pinyin: Label = $DetailPanel/VBox/ExamplePinyin
@onready var detail_example_fr: Label = $DetailPanel/VBox/ExampleFR
@onready var detail_hsk_badge: Label = $DetailPanel/VBox/HSKBadge
@onready var detail_mastery_label: Label = $DetailPanel/VBox/MasteryLabel
@onready var detail_audio_btn: Button = $DetailPanel/VBox/AudioButton
@onready var detail_close_btn: Button = $DetailPanel/VBox/CloseButton
@onready var word_count_label: Label = $MainPanel/VBox/WordCountLabel
@onready var tone_highlighter: Node = $ToneHighlighter

# --- State ---
var _current_hsk_filter: int = 0  # 0 = all
var _current_search: String = ""
var _word_buttons: Dictionary = {}  # word_id -> Button
var _displayed_words: Array = []

# Preloaded word card scene
var _word_card_scene: PackedScene = null

# --- Constants ---
const HSK_COLORS := [
	Color(0.2, 0.6, 1.0),   # HSK1 - blue
	Color(0.2, 0.8, 0.4),   # HSK2 - green
	Color(1.0, 0.7, 0.1),   # HSK3 - orange
	Color(0.9, 0.3, 0.3),   # HSK4 - red
	Color(0.7, 0.3, 0.9),   # HSK5 - purple
]
const MASTERY_LABELS := ["Nouveau", "Vu", "Pratiqué", "Maîtrisé"]
const MASTERY_COLORS := [
	Color(0.5, 0.5, 0.5),
	Color(0.3, 0.5, 0.9),
	Color(0.2, 0.75, 0.5),
	Color(1.0, 0.8, 0.1),
]

# --- Lifecycle ---
func _ready() -> void:
	if close_button:
		close_button.pressed.connect(_on_close)
	if detail_close_btn:
		detail_close_btn.pressed.connect(_on_detail_close)
	if detail_audio_btn:
		detail_audio_btn.pressed.connect(_on_detail_audio)
	if search_field:
		search_field.text_changed.connect(_on_search_changed)
	_setup_hsk_filters()
	if detail_panel:
		detail_panel.visible = false
	LearningManager.word_state_changed.connect(_on_word_state_changed)

func _setup_hsk_filters() -> void:
	if hsk_filter_buttons == null:
		return
	# All button
	var all_btn := Button.new()
	all_btn.text = TranslationManager.t("filter_all", "Tous")
	all_btn.toggle_mode = true
	all_btn.button_pressed = true
	all_btn.pressed.connect(_on_hsk_filter_pressed.bind(0, all_btn))
	hsk_filter_buttons.add_child(all_btn)
	# HSK 1-5 buttons
	for lvl in range(1, 6):
		var btn := Button.new()
		btn.text = "HSK%d" % lvl
		btn.toggle_mode = true
		btn.add_theme_color_override("font_color", HSK_COLORS[lvl - 1])
		btn.pressed.connect(_on_hsk_filter_pressed.bind(lvl, btn))
		hsk_filter_buttons.add_child(btn)

# --- Population ---
func populate() -> void:
	_refresh_word_list()

func _refresh_word_list() -> void:
	# Clear existing
	for child in word_grid.get_children():
		child.queue_free()
	_word_buttons.clear()
	_displayed_words.clear()

	var all_seen := LearningManager.get_seen_words()
	_displayed_words = _filter_words(all_seen)

	if word_count_label:
		word_count_label.text = TranslationManager.tf(
			"word_count", {"count": str(_displayed_words.size())},
			str(_displayed_words.size()) + " mots"
		)

	for word in _displayed_words:
		_create_word_card(word)

func _filter_words(words: Array) -> Array:
	var result: Array = []
	for word in words:
		if _current_hsk_filter != 0 and word.get("hsk_level", 0) != _current_hsk_filter:
			continue
		if not _current_search.is_empty():
			var hanzi: String = word.get("hanzi", "").to_lower()
			var pinyin: String = word.get("pinyin", "").to_lower()
			var translation: String = TranslationManager.get_word_translation(word).to_lower()
			var search := _current_search.to_lower()
			if not (hanzi.contains(search) or pinyin.contains(search) or translation.contains(search)):
				continue
		result.append(word)
	return result

func _create_word_card(word: Dictionary) -> void:
	var btn := Button.new()
	btn.custom_minimum_size = Vector2(80, 72)
	var hsk_lvl: int = word.get("hsk_level", 1)
	var state := LearningManager.get_word_state(word.get("id", "") as String)

	# Hanzi as main text
	btn.text = word.get("hanzi", "?")
	btn.add_theme_font_size_override("font_size", 20)

	# Color border by HSK level
	if hsk_lvl >= 1 and hsk_lvl <= 5:
		btn.modulate = HSK_COLORS[hsk_lvl - 1].lerp(Color.WHITE, 0.3)

	# Mastery indicator via tooltip
	btn.tooltip_text = word.get("pinyin", "") + "\n" + TranslationManager.get_word_translation(word)

	btn.pressed.connect(_on_word_card_pressed.bind(word))
	word_grid.add_child(btn)
	_word_buttons[word.get("id", "")] = btn

# --- Detail Panel ---
func show_word_detail(word: Dictionary) -> void:
	if detail_panel == null:
		return
	var word_id: String = word.get("id", "")
	if detail_hanzi:
		detail_hanzi.text = word.get("hanzi", "")
	if detail_pinyin:
		var pinyin_raw: String = word.get("pinyin", "")
		if tone_highlighter and tone_highlighter.has_method("colorize_pinyin_bbcode"):
			detail_pinyin.bbcode_enabled = true
			detail_pinyin.text = tone_highlighter.colorize_pinyin_bbcode(pinyin_raw)
		else:
			detail_pinyin.text = pinyin_raw
	if detail_translation:
		detail_translation.text = TranslationManager.get_word_translation(word)
	if detail_pos:
		detail_pos.text = word.get("part_of_speech", "")
	if detail_example_cn:
		detail_example_cn.text = word.get("example_cn", "")
	if detail_example_pinyin:
		detail_example_pinyin.text = word.get("example_pinyin", "")
	if detail_example_fr:
		detail_example_fr.text = TranslationManager.get_example_sentence(word)
	if detail_hsk_badge:
		var hsk_lvl: int = word.get("hsk_level", 1)
		detail_hsk_badge.text = "HSK %d" % hsk_lvl
		if hsk_lvl >= 1 and hsk_lvl <= 5:
			detail_hsk_badge.modulate = HSK_COLORS[hsk_lvl - 1]
	if detail_mastery_label:
		var state := LearningManager.get_word_state(word_id)
		var state_int := int(state)
		if state_int < MASTERY_LABELS.size():
			detail_mastery_label.text = MASTERY_LABELS[state_int]
			detail_mastery_label.modulate = MASTERY_COLORS[state_int]
	if detail_audio_btn:
		detail_audio_btn.set_meta("word_id", word_id)
		detail_audio_btn.visible = not word.get("audio", "").is_empty()
	detail_panel.visible = true

# --- Handlers ---
func _on_word_card_pressed(word: Dictionary) -> void:
	AudioManager.play_ui_click()
	show_word_detail(word)

func _on_detail_close() -> void:
	AudioManager.play_ui_cancel()
	if detail_panel:
		detail_panel.visible = false

func _on_detail_audio() -> void:
	if detail_audio_btn and detail_audio_btn.has_meta("word_id"):
		var wid: String = detail_audio_btn.get_meta("word_id")
		AudioManager.play_vocab(wid)
		word_audio_requested.emit(wid)

func _on_search_changed(text: String) -> void:
	_current_search = text
	_refresh_word_list()

func _on_hsk_filter_pressed(level: int, btn: Button) -> void:
	AudioManager.play_ui_click()
	_current_hsk_filter = level
	# Deselect all other buttons
	if hsk_filter_buttons:
		for child in hsk_filter_buttons.get_children():
			if child is Button and child != btn:
				child.button_pressed = false
	btn.button_pressed = true
	_refresh_word_list()

func _on_word_state_changed(word_id: String, _state) -> void:
	# Refresh card visual if visible
	if _word_buttons.has(word_id):
		var word := LearningManager.get_word_data(word_id)
		if not word.is_empty():
			pass  # Could update card color here

func _on_close() -> void:
	AudioManager.play_ui_cancel()
	GameManager.set_game_state(GameManager.GameState.EXPLORING)
	closed.emit()
	visible = false

# --- Open/Show ---
func open(focus_word_id: String = "") -> void:
	GameManager.set_game_state(GameManager.GameState.NOTEBOOK)
	visible = true
	_refresh_word_list()
	if not focus_word_id.is_empty():
		var word := LearningManager.get_word_data(focus_word_id)
		if not word.is_empty():
			show_word_detail(word)
