## MainMenu.gd
## Main menu controller: New Game, Continue, Settings, Credits.
class_name MainMenu
extends Control

# --- Node references ---
@onready var title_label: Label = $Background/VBox/TitleLabel
@onready var subtitle_label: Label = $Background/VBox/SubtitleLabel
@onready var new_game_btn: Button = $Background/VBox/ButtonsVBox/NewGameButton
@onready var continue_btn: Button = $Background/VBox/ButtonsVBox/ContinueButton
@onready var settings_btn: Button = $Background/VBox/ButtonsVBox/SettingsButton
@onready var credits_btn: Button = $Background/VBox/ButtonsVBox/CreditsButton
@onready var language_btn: Button = $Background/TopBar/LanguageButton
@onready var version_label: Label = $Background/BottomBar/VersionLabel
@onready var settings_panel: Control = $SettingsPanel
@onready var credits_panel: Control = $CreditsPanel
@onready var name_input_panel: Control = $NameInputPanel
@onready var name_input_field: LineEdit = $NameInputPanel/VBox/NameField
@onready var name_confirm_btn: Button = $NameInputPanel/VBox/ConfirmButton
@onready var name_cancel_btn: Button = $NameInputPanel/VBox/CancelButton
@onready var music_slider: HSlider = $SettingsPanel/VBox/MusicSlider
@onready var sfx_slider: HSlider = $SettingsPanel/VBox/SFXSlider
@onready var settings_close_btn: Button = $SettingsPanel/VBox/CloseButton
@onready var credits_close_btn: Button = $CreditsPanel/VBox/CloseButton
@onready var anim_player: AnimationPlayer = $AnimationPlayer

# --- Lifecycle ---
func _ready() -> void:
	GameManager.set_game_state(GameManager.GameState.MAIN_MENU)
	AudioManager.play_music("res://assets/audio/music/main_menu_theme.ogg")
	_setup_ui()
	_connect_buttons()
	_hide_panels()
	if anim_player and anim_player.has_animation("intro"):
		anim_player.play("intro")

func _setup_ui() -> void:
	if title_label:
		title_label.text = "小Learn"
	if subtitle_label:
		subtitle_label.text = TranslationManager.t("subtitle", "Apprends le chinois en voyageant")
	if version_label:
		version_label.text = "v" + ProjectSettings.get_setting("application/config/version", "0.1.0")
	if language_btn:
		_update_language_button()
	# Continue button: only enabled if save exists
	if continue_btn:
		continue_btn.disabled = not SaveManager.save_slot_exists(0) and not SaveManager.autosave_exists()
	# Settings sliders
	if music_slider:
		music_slider.value = AudioManager.get_music_volume()
	if sfx_slider:
		sfx_slider.value = AudioManager.get_sfx_volume()

func _connect_buttons() -> void:
	if new_game_btn:
		new_game_btn.pressed.connect(_on_new_game_pressed)
	if continue_btn:
		continue_btn.pressed.connect(_on_continue_pressed)
	if settings_btn:
		settings_btn.pressed.connect(_on_settings_pressed)
	if credits_btn:
		credits_btn.pressed.connect(_on_credits_pressed)
	if language_btn:
		language_btn.pressed.connect(_on_language_pressed)
	if name_confirm_btn:
		name_confirm_btn.pressed.connect(_on_name_confirmed)
	if name_cancel_btn:
		name_cancel_btn.pressed.connect(_on_name_cancelled)
	if settings_close_btn:
		settings_close_btn.pressed.connect(_on_settings_close)
	if credits_close_btn:
		credits_close_btn.pressed.connect(_on_credits_close)
	if music_slider:
		music_slider.value_changed.connect(func(v): AudioManager.set_music_volume(v))
	if sfx_slider:
		sfx_slider.value_changed.connect(func(v): AudioManager.set_sfx_volume(v))

func _hide_panels() -> void:
	if settings_panel:
		settings_panel.visible = false
	if credits_panel:
		credits_panel.visible = false
	if name_input_panel:
		name_input_panel.visible = false

# --- Button Handlers ---
func _on_new_game_pressed() -> void:
	AudioManager.play_ui_confirm()
	# Show name input
	if name_input_panel:
		name_input_panel.visible = true
		if name_input_field:
			name_input_field.grab_focus()
	else:
		_start_new_game("Voyageur")

func _on_name_confirmed() -> void:
	AudioManager.play_ui_confirm()
	var player_name := "Voyageur"
	if name_input_field and not name_input_field.text.is_empty():
		player_name = name_input_field.text.strip_edges()
	if name_input_panel:
		name_input_panel.visible = false
	_start_new_game(player_name)

func _on_name_cancelled() -> void:
	AudioManager.play_ui_cancel()
	if name_input_panel:
		name_input_panel.visible = false

func _start_new_game(player_name: String) -> void:
	GameManager.start_new_game(player_name)
	get_tree().change_scene_to_file("res://scenes/world_map.tscn")

func _on_continue_pressed() -> void:
	AudioManager.play_ui_confirm()
	var loaded := false
	if SaveManager.autosave_exists():
		loaded = SaveManager.load_autosave()
	if not loaded and SaveManager.save_slot_exists(0):
		loaded = SaveManager.load_game(0)
	if loaded:
		var region_id := GameManager.current_region_id
		if not region_id.is_empty():
			var region_data := GameManager.get_region_data(region_id)
			var scene_path: String = region_data.get("scene", "")
			if not scene_path.is_empty():
				get_tree().change_scene_to_file(scene_path)
				return
		get_tree().change_scene_to_file("res://scenes/world_map.tscn")
	else:
		# Save corrupted or missing — fallback to new game prompt
		if continue_btn:
			continue_btn.disabled = true

func _on_settings_pressed() -> void:
	AudioManager.play_ui_click()
	if settings_panel:
		settings_panel.visible = true

func _on_credits_pressed() -> void:
	AudioManager.play_ui_click()
	if credits_panel:
		credits_panel.visible = true

func _on_settings_close() -> void:
	AudioManager.play_ui_cancel()
	if settings_panel:
		settings_panel.visible = false

func _on_credits_close() -> void:
	AudioManager.play_ui_cancel()
	if credits_panel:
		credits_panel.visible = false

func _on_language_pressed() -> void:
	AudioManager.play_ui_click()
	TranslationManager.toggle_language()
	_update_language_button()
	_refresh_text()

func _update_language_button() -> void:
	if language_btn:
		language_btn.text = "FR" if TranslationManager.current_language == "fr" else "EN"

func _refresh_text() -> void:
	if subtitle_label:
		subtitle_label.text = TranslationManager.t("subtitle", "Apprends le chinois en voyageant")
	if new_game_btn:
		new_game_btn.text = TranslationManager.t("btn_new_game", "Nouvelle Partie")
	if continue_btn:
		continue_btn.text = TranslationManager.t("btn_continue", "Continuer")
	if settings_btn:
		settings_btn.text = TranslationManager.t("btn_settings", "Paramètres")
	if credits_btn:
		credits_btn.text = TranslationManager.t("btn_credits", "Crédits")
