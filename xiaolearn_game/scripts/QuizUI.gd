## QuizUI.gd
## In-dialogue quiz system. Multiple choice with tone color feedback.
## Supports CN→FR, FR→CN, Pinyin→CN directions.
class_name QuizUI
extends Control

# --- Signals ---
signal quiz_answered(correct: bool, word_id: String)
signal quiz_completed()

# --- Enums ---
enum QuizDirection {
	CN_TO_FR,
	FR_TO_CN,
	PINYIN_TO_CN,
}

# --- Node references ---
@onready var question_panel: PanelContainer = $QuestionPanel
@onready var question_label_cn: Label = $QuestionPanel/VBox/QuestionCN
@onready var question_label_pinyin: RichTextLabel = $QuestionPanel/VBox/QuestionPinyin
@onready var question_label_fr: Label = $QuestionPanel/VBox/QuestionFR
@onready var direction_label: Label = $QuestionPanel/VBox/DirectionLabel
@onready var options_container: GridContainer = $OptionsContainer
@onready var feedback_label: Label = $FeedbackLabel
@onready var feedback_panel: PanelContainer = $FeedbackPanel
@onready var feedback_text: Label = $FeedbackPanel/VBox/FeedbackText
@onready var feedback_explanation: Label = $FeedbackPanel/VBox/Explanation
@onready var feedback_continue_btn: Button = $FeedbackPanel/VBox/ContinueButton
@onready var points_label: Label = $PointsLabel
@onready var streak_label: Label = $StreakLabel
@onready var tone_highlighter: Node = $ToneHighlighter
@onready var anim_player: AnimationPlayer = $AnimationPlayer

# --- State ---
var _current_quiz: Dictionary = {}
var _current_word_id: String = ""
var _correct_index: int = 0
var _direction: QuizDirection = QuizDirection.CN_TO_FR
var _option_buttons: Array[Button] = []
var _answered: bool = false
var _points: int = 0
var _streak: int = 0
var _pending_node_id: String = ""

# --- Constants ---
const POINTS_CORRECT := 10
const POINTS_STREAK_BONUS := 5
const CORRECT_COLOR := Color(0.2, 0.85, 0.4)
const WRONG_COLOR := Color(0.9, 0.25, 0.25)
const NEUTRAL_COLOR := Color(0.85, 0.85, 0.85)

# --- Lifecycle ---
func _ready() -> void:
	DialogueManager.quiz_triggered.connect(_on_quiz_triggered)
	if feedback_continue_btn:
		feedback_continue_btn.pressed.connect(_on_feedback_continue)
	visible = false
	if feedback_panel:
		feedback_panel.visible = false

# --- Quiz Setup ---
func _on_quiz_triggered(quiz_data: Dictionary) -> void:
	_current_quiz = quiz_data
	_pending_node_id = quiz_data.get("node_id", "")
	_current_word_id = quiz_data.get("question_word_id", "")
	_answered = false
	_load_quiz(quiz_data)
	GameManager.set_game_state(GameManager.GameState.QUIZ)
	visible = true
	if anim_player and anim_player.has_animation("show"):
		anim_player.play("show")

func _load_quiz(quiz_data: Dictionary) -> void:
	# Determine direction
	var dir_str: String = quiz_data.get("question_type", "cn_to_fr")
	match dir_str:
		"cn_to_fr":    _direction = QuizDirection.CN_TO_FR
		"fr_to_cn":    _direction = QuizDirection.FR_TO_CN
		"pinyin_to_cn": _direction = QuizDirection.PINYIN_TO_CN
		_:             _direction = QuizDirection.CN_TO_FR

	# Show question
	_display_question(quiz_data)

	# Build options
	_correct_index = quiz_data.get("correct_index", 0)
	var options: Array = quiz_data.get("options", [])
	_build_options(options)

	# Update direction label
	if direction_label:
		match _direction:
			QuizDirection.CN_TO_FR:
				direction_label.text = TranslationManager.t("quiz_direction_cn_fr", "Chinois → Français")
			QuizDirection.FR_TO_CN:
				direction_label.text = TranslationManager.t("quiz_direction_fr_cn", "Français → Chinois")
			QuizDirection.PINYIN_TO_CN:
				direction_label.text = TranslationManager.t("quiz_direction_pinyin_cn", "Pinyin → Chinois")

func _display_question(quiz_data: Dictionary) -> void:
	match _direction:
		QuizDirection.CN_TO_FR:
			if question_label_cn:
				question_label_cn.text = quiz_data.get("question_cn", "")
				question_label_cn.visible = true
			if question_label_pinyin:
				var pinyin := quiz_data.get("question_pinyin", "") as String
				if tone_highlighter and tone_highlighter.has_method("colorize_pinyin_bbcode"):
					question_label_pinyin.bbcode_enabled = true
					question_label_pinyin.text = tone_highlighter.colorize_pinyin_bbcode(pinyin)
				else:
					question_label_pinyin.text = pinyin
				question_label_pinyin.visible = true
			if question_label_fr:
				question_label_fr.visible = false

		QuizDirection.FR_TO_CN:
			if question_label_fr:
				var word := LearningManager.get_word_data(_current_word_id)
				question_label_fr.text = TranslationManager.get_word_translation(word)
				question_label_fr.visible = true
			if question_label_cn:
				question_label_cn.visible = false
			if question_label_pinyin:
				question_label_pinyin.visible = false

		QuizDirection.PINYIN_TO_CN:
			if question_label_pinyin:
				var pinyin := quiz_data.get("question_pinyin", "") as String
				if tone_highlighter and tone_highlighter.has_method("colorize_pinyin_bbcode"):
					question_label_pinyin.bbcode_enabled = true
					question_label_pinyin.text = tone_highlighter.colorize_pinyin_bbcode(pinyin)
				else:
					question_label_pinyin.text = pinyin
				question_label_pinyin.visible = true
			if question_label_cn:
				question_label_cn.visible = false
			if question_label_fr:
				question_label_fr.visible = false

func _build_options(options: Array) -> void:
	_clear_option_buttons()
	for i in options.size():
		var option: Dictionary = options[i]
		var btn := Button.new()
		btn.custom_minimum_size = Vector2(160, 56)
		# Text depends on direction
		match _direction:
			QuizDirection.CN_TO_FR:
				btn.text = TranslationManager.get_word_translation(option)
			QuizDirection.FR_TO_CN:
				btn.text = option.get("hanzi", "?")
			QuizDirection.PINYIN_TO_CN:
				btn.text = option.get("hanzi", "?")
		btn.add_theme_font_size_override("font_size", 16)
		btn.pressed.connect(_on_option_pressed.bind(i))
		options_container.add_child(btn)
		_option_buttons.append(btn)

func _clear_option_buttons() -> void:
	for btn in _option_buttons:
		if is_instance_valid(btn):
			btn.queue_free()
	_option_buttons.clear()
	if options_container:
		for child in options_container.get_children():
			child.queue_free()

# --- Answer Handling ---
func _on_option_pressed(index: int) -> void:
	if _answered:
		return
	_answered = true
	var correct := (index == _correct_index)
	_show_feedback(index, correct)

func _show_feedback(selected_index: int, correct: bool) -> void:
	# Color all buttons
	for i in _option_buttons.size():
		var btn: Button = _option_buttons[i]
		if i == _correct_index:
			btn.modulate = CORRECT_COLOR
		elif i == selected_index and not correct:
			btn.modulate = WRONG_COLOR
		else:
			btn.modulate = Color(0.6, 0.6, 0.6)
		btn.disabled = true

	# Play audio for correct answer
	if correct:
		AudioManager.play_word_correct()
		_streak += 1
		var bonus := POINTS_STREAK_BONUS if _streak > 2 else 0
		_points += POINTS_CORRECT + bonus
		LearningManager.mark_word_correct(_current_word_id)
	else:
		AudioManager.play_word_wrong()
		_streak = 0
		LearningManager.mark_word_wrong(_current_word_id)

	# Update points/streak display
	if points_label:
		points_label.text = "+%d pts" % _points
	if streak_label:
		streak_label.text = "🔥 x%d" % _streak if _streak > 1 else ""

	# Show feedback panel
	if feedback_panel:
		feedback_panel.visible = true
		if feedback_text:
			if correct:
				feedback_text.text = TranslationManager.t("quiz_correct", "Correct ! ✓")
				feedback_text.modulate = CORRECT_COLOR
			else:
				feedback_text.text = TranslationManager.t("quiz_wrong", "Pas tout à fait...")
				feedback_text.modulate = WRONG_COLOR
		if feedback_explanation:
			var word := LearningManager.get_word_data(_current_word_id)
			if not word.is_empty():
				feedback_explanation.text = (
					word.get("hanzi", "") + "  " +
					word.get("pinyin", "") + "\n" +
					TranslationManager.get_word_translation(word)
				)

	# Notify QuestManager
	QuestManager.on_quiz_answered(_current_quiz.get("quiz_id", ""))
	quiz_answered.emit(correct, _current_word_id)

func _on_feedback_continue() -> void:
	AudioManager.play_ui_click()
	if feedback_panel:
		feedback_panel.visible = false
	visible = false
	# Route back to dialogue
	var correct := _option_buttons.size() > 0 and _correct_index < _option_buttons.size()
	# Determine actual correctness from stored state
	var was_correct := LearningManager.get_word_state(_current_word_id) != LearningManager.WordState.NEW
	DialogueManager.on_quiz_result(_pending_node_id, was_correct)
	quiz_completed.emit()
	GameManager.set_game_state(GameManager.GameState.DIALOGUE)

# --- Points ---
func get_total_points() -> int:
	return _points

func reset_points() -> void:
	_points = 0
	_streak = 0
