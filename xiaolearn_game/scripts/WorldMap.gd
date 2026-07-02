## WorldMap.gd
## China world map scene controller. Handles region buttons, lock/unlock display,
## region preview popup, and scene transitions.
class_name WorldMap
extends Node2D

# --- Exports ---
@export var region_button_scene: PackedScene

# --- Node references ---
@onready var region_buttons_container: Node2D = $RegionButtonsContainer
@onready var preview_popup: Control = $UILayer/PreviewPopup
@onready var preview_name_cn: Label = $UILayer/PreviewPopup/PanelContainer/VBox/NameCN
@onready var preview_name_fr: Label = $UILayer/PreviewPopup/PanelContainer/VBox/NameFR
@onready var preview_description: Label = $UILayer/PreviewPopup/PanelContainer/VBox/Description
@onready var preview_hsk_label: Label = $UILayer/PreviewPopup/PanelContainer/VBox/HSKRequired
@onready var preview_enter_btn: Button = $UILayer/PreviewPopup/PanelContainer/VBox/EnterButton
@onready var preview_close_btn: Button = $UILayer/PreviewPopup/PanelContainer/VBox/CloseButton
@onready var title_label: Label = $UILayer/TopBar/TitleLabel
@onready var hsk_progress_label: Label = $UILayer/TopBar/HSKProgressLabel
@onready var back_button: Button = $UILayer/BottomBar/BackButton

# --- Region button positions (manually aligned to the SVG map) ---
# Adjusted by comparing with real China geography reference map
# Viewport: 960x540, Map sprite at (480, 290) scale (2, 2)
const REGION_POSITIONS := {
	"beijing":  Vector2(620, 180),   # 北京 — northeast, near coast
	"shanghai": Vector2(720, 330),   # 上海 — east coast, below Beijing
	"xian":     Vector2(530, 290),   # 西安 — central, Shaanxi province
	"chengdu":  Vector2(440, 350),   # 成都 — southwest, Sichuan
	"guilin":   Vector2(560, 430),   # 桂林 — south, Guangxi
}

# --- State ---
var _selected_region_id: String = ""
var _region_buttons: Dictionary = {}

# --- Lifecycle ---
func _ready() -> void:
	GameManager.set_game_state(GameManager.GameState.WORLD_MAP)
	AudioManager.play_music("res://assets/audio/music/world_map_theme.ogg")
	# Map SVG scaled x2, centered at (480, 290) in 960x540 viewport
	_build_region_buttons()
	_update_ui()
	if preview_enter_btn:
		preview_enter_btn.pressed.connect(_on_enter_pressed)
	if preview_close_btn:
		preview_close_btn.pressed.connect(_on_preview_close)
	if back_button:
		back_button.pressed.connect(_on_back_pressed)
	if preview_popup:
		preview_popup.visible = false
	GameManager.hsk_level_unlocked.connect(_on_hsk_unlocked)

func _build_region_buttons() -> void:
	var font := load("res://assets/fonts/NotoSansSC-Regular.otf") as Font
	var regions := GameManager.get_all_regions()
	for region_data in regions:
		var rid: String = region_data.get("id", "")
		if rid.is_empty():
			continue
		var btn := Button.new()
		var name_cn: String = region_data.get("name_cn", rid) as String
		var name_fr: String = region_data.get("name_fr", rid) as String
		btn.text = name_cn + "\n" + name_fr
		btn.name = "Btn_" + rid
		var pos: Vector2 = REGION_POSITIONS.get(rid, Vector2(480, 300)) as Vector2
		btn.position = pos - Vector2(48, 24)
		btn.size = Vector2(96, 48)
		btn.custom_minimum_size = Vector2(96, 48)
		if font:
			btn.add_theme_font_override("font", font)
		btn.add_theme_font_size_override("font_size", 11)
		# Style locked regions
		var is_unlocked := GameManager.is_region_unlocked(rid)
		btn.modulate = Color.WHITE if is_unlocked else Color(0.4, 0.4, 0.4, 0.8)
		btn.tooltip_text = name_fr
		btn.pressed.connect(_on_region_button_pressed.bind(rid))
		if region_buttons_container:
			region_buttons_container.add_child(btn)
		else:
			add_child(btn)
		_region_buttons[rid] = btn
		# Add HSK lock label for locked regions
		if not is_unlocked:
			var lock_label := Label.new()
			var hsk_req: int = region_data.get("hsk_required", 1) as int
			lock_label.text = "HSK%d" % hsk_req
			lock_label.position = pos + Vector2(-20, 30)
			lock_label.add_theme_font_size_override("font_size", 10)
			lock_label.modulate = Color(1, 0.8, 0.2)
			if region_buttons_container:
				region_buttons_container.add_child(lock_label)
			else:
				add_child(lock_label)

func _update_ui() -> void:
	if title_label:
		title_label.text = TranslationManager.t("world_map_title", "Carte de Chine")
	if hsk_progress_label:
		var level := GameManager.player_hsk_level
		var progress := LearningManager.get_hsk_progress(level)
		hsk_progress_label.text = "HSK%d — %d%%" % [level, int(progress * 100)]

# --- Region Selection ---
func _on_region_button_pressed(region_id: String) -> void:
	AudioManager.play_ui_click()
	_selected_region_id = region_id
	_show_region_preview(region_id)

func _show_region_preview(region_id: String) -> void:
	var region_data := GameManager.get_region_data(region_id)
	if region_data.is_empty():
		return
	var is_unlocked := GameManager.is_region_unlocked(region_id)
	if preview_name_cn:
		preview_name_cn.text = region_data.get("name_cn", "") + "  " + region_data.get("name_pinyin", "")
	if preview_name_fr:
		preview_name_fr.text = TranslationManager.get_region_name(region_id)
	if preview_description:
		preview_description.text = TranslationManager.get_region_description(region_id)
	if preview_hsk_label:
		var hsk_req: int = region_data.get("hsk_required", 1)
		if is_unlocked:
			preview_hsk_label.text = "HSK %d ✓" % hsk_req
			preview_hsk_label.modulate = Color.GREEN
		else:
			preview_hsk_label.text = TranslationManager.t("requires_hsk", "Requiert HSK") + " %d" % hsk_req
			preview_hsk_label.modulate = Color(1, 0.5, 0.2)
	if preview_enter_btn:
		preview_enter_btn.disabled = not is_unlocked
		preview_enter_btn.text = TranslationManager.t("btn_enter_region", "Entrer dans la région")
	if preview_popup:
		preview_popup.visible = true

func _on_preview_close() -> void:
	AudioManager.play_ui_cancel()
	if preview_popup:
		preview_popup.visible = false
	_selected_region_id = ""

func _on_enter_pressed() -> void:
	if _selected_region_id.is_empty():
		return
	if not GameManager.is_region_unlocked(_selected_region_id):
		return
	AudioManager.play_ui_confirm()
	_enter_region(_selected_region_id)

func _enter_region(region_id: String) -> void:
	var region_data := GameManager.get_region_data(region_id)
	var scene_path: String = region_data.get("scene", "")
	if scene_path.is_empty():
		push_error("WorldMap: No scene path for region " + region_id)
		return
	GameManager.change_region(region_id)
	QuestManager.load_region_quests(region_id)
	DialogueManager.preload_region_dialogues(region_id)
	LearningManager.load_vocab_pack(region_data.get("vocabulary_pack", ""))
	get_tree().change_scene_to_file(scene_path)

func _on_hsk_unlocked(level: int) -> void:
	_update_ui()
	# Refresh button states
	for rid in _region_buttons:
		var btn: Button = _region_buttons[rid]
		var is_unlocked := GameManager.is_region_unlocked(rid)
		btn.modulate = Color.WHITE if is_unlocked else Color(0.4, 0.4, 0.4, 0.8)

func _on_back_pressed() -> void:
	AudioManager.play_ui_cancel()
	get_tree().change_scene_to_file("res://scenes/main_menu.tscn")
