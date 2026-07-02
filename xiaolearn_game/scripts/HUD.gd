## HUD.gd
## In-game HUD: virtual joystick, interact button, notebook, quest log, progress bar.
class_name HUD
extends CanvasLayer

# --- Signals ---
signal joystick_moved(direction: Vector2)
signal interact_pressed()
signal notebook_pressed()
signal quest_log_pressed()
signal menu_pressed()

# --- Node references ---
@onready var joystick: Control = $BottomBar/Joystick
@onready var interact_button: Button = $BottomBar/RightButtons/InteractButton
@onready var notebook_button: Button = $TopBar/NotebookButton
@onready var quest_button: Button = $TopBar/QuestButton
@onready var menu_button: Button = $TopBar/MenuButton
@onready var region_name_label: Label = $TopBar/RegionNameLabel
@onready var hsk_bar: ProgressBar = $TopBar/HSKProgressBar
@onready var hsk_level_label: Label = $TopBar/HSKLevelLabel
@onready var word_popup: PanelContainer = $WordPopup
@onready var word_popup_label: Label = $WordPopup/Label
@onready var word_popup_timer: Timer = $WordPopupTimer
@onready var interact_indicator: Control = $InteractIndicator

# --- Virtual Joystick internals ---
var _joystick_active: bool = false
var _joystick_center: Vector2 = Vector2.ZERO
var _joystick_touch_index: int = -1
var _joystick_max_radius: float = 48.0
var _joystick_knob: Control = null

# --- State ---
var _player: Player = null

# --- Lifecycle ---
func _ready() -> void:
	_setup_buttons()
	_setup_joystick()
	_update_region_display()
	_update_hsk_display()
	GameManager.region_changed.connect(_on_region_changed)
	LearningManager.hsk_progress_updated.connect(_on_hsk_progress_updated)
	LearningManager.word_state_changed.connect(_on_word_introduced)
	DialogueManager.dialogue_started.connect(_on_dialogue_started)
	DialogueManager.dialogue_ended.connect(_on_dialogue_ended)
	if word_popup:
		word_popup.visible = false
	if interact_indicator:
		interact_indicator.visible = false

func _setup_buttons() -> void:
	if interact_button:
		interact_button.pressed.connect(func(): interact_pressed.emit(); AudioManager.play_ui_confirm())
	if notebook_button:
		notebook_button.text = "📖"
		notebook_button.pressed.connect(_on_notebook_pressed)
	if quest_button:
		quest_button.text = "📋"
		quest_button.pressed.connect(_on_quest_pressed)
	if menu_button:
		menu_button.text = "☰"
		menu_button.pressed.connect(func(): menu_pressed.emit())

func _setup_joystick() -> void:
	if joystick == null:
		return
	_joystick_center = joystick.size / 2.0
	_joystick_knob = joystick.get_node_or_null("Knob")

# --- Touch/Joystick Input ---
func _input(event: InputEvent) -> void:
	if joystick == null:
		return
	if event is InputEventScreenTouch:
		var touch := event as InputEventScreenTouch
		if touch.pressed:
			var local_pos := joystick.get_global_rect()
			if local_pos.has_point(touch.position):
				_joystick_active = true
				_joystick_touch_index = touch.index
				_joystick_center = touch.position - joystick.global_position
		else:
			if touch.index == _joystick_touch_index:
				_joystick_active = false
				_joystick_touch_index = -1
				_emit_joystick(Vector2.ZERO)
				_update_joystick_visual(Vector2.ZERO)
	elif event is InputEventScreenDrag:
		var drag := event as InputEventScreenDrag
		if _joystick_active and drag.index == _joystick_touch_index:
			var delta := drag.position - joystick.global_position - _joystick_center
			var clamped := delta.limit_length(_joystick_max_radius)
			var direction := clamped / _joystick_max_radius
			_emit_joystick(direction)
			_update_joystick_visual(clamped)

func _emit_joystick(direction: Vector2) -> void:
	joystick_moved.emit(direction)
	if _player:
		_player.set_joystick_input(direction)

func _update_joystick_visual(offset: Vector2) -> void:
	if _joystick_knob:
		_joystick_knob.position = Vector2(joystick.size.x / 2 + offset.x - _joystick_knob.size.x / 2,
										  joystick.size.y / 2 + offset.y - _joystick_knob.size.y / 2)

# --- Connect to Player ---
func connect_player(player: Player) -> void:
	_player = player
	if player:
		if player.has_signal("interaction_available"):
			player.interaction_available.connect(_on_interaction_available)
		if player.has_signal("interaction_unavailable"):
			player.interaction_unavailable.connect(_on_interaction_unavailable)

# --- Display Updates ---
func _update_region_display() -> void:
	if region_name_label:
		var rid := GameManager.current_region_id
		if rid.is_empty():
			region_name_label.text = ""
		else:
			region_name_label.text = TranslationManager.get_region_name(rid)

func _update_hsk_display() -> void:
	var level := GameManager.player_hsk_level
	if hsk_level_label:
		hsk_level_label.text = "HSK%d" % level
	if hsk_bar:
		var progress := LearningManager.get_hsk_progress(level)
		hsk_bar.value = progress * 100.0
		hsk_bar.max_value = 100.0

# --- Word Popup ---
func show_word_popup(word_id: String) -> void:
	var word := LearningManager.get_word_data(word_id)
	if word.is_empty() or word_popup == null:
		return
	if word_popup_label:
		word_popup_label.text = word.get("hanzi", "") + "  " + word.get("pinyin", "") + "\n" + TranslationManager.get_word_translation(word)
	word_popup.visible = true
	if word_popup_timer:
		word_popup_timer.wait_time = 3.0
		word_popup_timer.start()
		word_popup_timer.timeout.connect(func(): word_popup.visible = false, CONNECT_ONE_SHOT)

# --- Signal Handlers ---
func _on_region_changed(region_id: String) -> void:
	_update_region_display()

func _on_hsk_progress_updated(level: int, progress: float) -> void:
	if level == GameManager.player_hsk_level:
		if hsk_bar:
			hsk_bar.value = progress * 100.0

func _on_word_introduced(word_id: String, _state) -> void:
	show_word_popup(word_id)

func _on_interaction_available(_target: Node) -> void:
	if interact_button:
		interact_button.visible = true
	if interact_indicator:
		interact_indicator.visible = true

func _on_interaction_unavailable() -> void:
	if interact_button:
		interact_button.visible = false
	if interact_indicator:
		interact_indicator.visible = false

func _on_dialogue_started(_npc_id: String) -> void:
	if joystick:
		joystick.visible = false
	if interact_button:
		interact_button.visible = false

func _on_dialogue_ended(_npc_id: String) -> void:
	if joystick:
		joystick.visible = true

func _on_notebook_pressed() -> void:
	AudioManager.play_ui_click()
	notebook_pressed.emit()

func _on_quest_pressed() -> void:
	AudioManager.play_ui_click()
	quest_log_pressed.emit()
