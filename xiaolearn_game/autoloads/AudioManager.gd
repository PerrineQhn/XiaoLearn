## AudioManager.gd
## Manages audio buses, music, SFX, and vocabulary pronunciation playback.
extends Node

# --- Signals ---
signal music_changed(track_name: String)
signal sfx_played(sfx_name: String)

# --- Constants ---
const MUSIC_BASE := "res://assets/audio/music/"
const SFX_BASE := "res://assets/audio/sfx/"
const VOCAB_BASE := "res://assets/audio/vocab/"
const DIALOGUE_BASE := "res://assets/audio/dialogue/"

const FADE_DURATION := 1.5

# --- Audio Buses ---
const BUS_MASTER := "Master"
const BUS_MUSIC := "Music"
const BUS_SFX := "SFX"
const BUS_VOICE := "Voice"

# --- State ---
var _music_player: AudioStreamPlayer
var _sfx_players: Array[AudioStreamPlayer] = []
var _voice_player: AudioStreamPlayer
var _current_track: String = ""
var _music_volume: float = 0.7
var _sfx_volume: float = 1.0
var _voice_volume: float = 1.0
var _tween: Tween = null

# Preloaded stream cache
var _stream_cache: Dictionary = {}

# --- Lifecycle ---
func _ready() -> void:
	_setup_audio_buses()
	_setup_players()

func _setup_audio_buses() -> void:
	# Ensure buses exist (they may already exist from project settings)
	_ensure_bus(BUS_MUSIC)
	_ensure_bus(BUS_SFX)
	_ensure_bus(BUS_VOICE)

func _ensure_bus(bus_name: String) -> void:
	if AudioServer.get_bus_index(bus_name) == -1:
		var idx := AudioServer.bus_count
		AudioServer.add_bus(idx)
		AudioServer.set_bus_name(idx, bus_name)
		AudioServer.set_bus_send(idx, BUS_MASTER)

func _setup_players() -> void:
	_music_player = AudioStreamPlayer.new()
	_music_player.bus = BUS_MUSIC
	_music_player.volume_db = linear_to_db(_music_volume)
	add_child(_music_player)

	_voice_player = AudioStreamPlayer.new()
	_voice_player.bus = BUS_VOICE
	_voice_player.volume_db = linear_to_db(_voice_volume)
	add_child(_voice_player)

	# Pool of SFX players
	for i in range(8):
		var player := AudioStreamPlayer.new()
		player.bus = BUS_SFX
		player.volume_db = linear_to_db(_sfx_volume)
		add_child(player)
		_sfx_players.append(player)

# --- Music ---
func play_music(track_path: String, fade: bool = true) -> void:
	if track_path == _current_track and _music_player.playing:
		return
	_current_track = track_path
	var stream := _load_stream(track_path)
	if stream == null:
		push_warning("AudioManager: Music not found: " + track_path)
		return
	if fade and _music_player.playing:
		_fade_out_music(func(): _start_music(stream, track_path))
	else:
		_start_music(stream, track_path)

func play_region_music(region_id: String) -> void:
	var region_data := GameManager.get_region_data(region_id)
	if region_data.has("music"):
		play_music(region_data["music"])

func _start_music(stream: AudioStream, track_path: String) -> void:
	_music_player.stream = stream
	_music_player.play()
	_music_player.volume_db = linear_to_db(_music_volume)
	music_changed.emit(track_path)

func _fade_out_music(on_complete: Callable) -> void:
	if _tween:
		_tween.kill()
	_tween = create_tween()
	_tween.tween_property(_music_player, "volume_db", -80.0, FADE_DURATION)
	_tween.tween_callback(func():
		_music_player.stop()
		on_complete.call()
	)

func stop_music(fade: bool = true) -> void:
	if not _music_player.playing:
		return
	if fade:
		_fade_out_music(func(): pass)
	else:
		_music_player.stop()
	_current_track = ""

# --- SFX ---
func play_sfx(sfx_name: String) -> void:
	var path := SFX_BASE + sfx_name
	if not sfx_name.ends_with(".ogg") and not sfx_name.ends_with(".wav"):
		path += ".ogg"
	var stream := _load_stream(path)
	if stream == null:
		push_warning("AudioManager: SFX not found: " + path)
		return
	var player := _get_free_sfx_player()
	if player:
		player.stream = stream
		player.volume_db = linear_to_db(_sfx_volume)
		player.play()
		sfx_played.emit(sfx_name)

func _get_free_sfx_player() -> AudioStreamPlayer:
	for player in _sfx_players:
		if not player.playing:
			return player
	return _sfx_players[0]  # Override oldest

# --- Voice / Vocabulary ---
func play_vocab(word_id: String) -> void:
	var path := VOCAB_BASE + word_id + ".ogg"
	var stream := _load_stream(path)
	if stream == null:
		push_warning("AudioManager: Vocab audio not found: " + path)
		return
	_voice_player.stream = stream
	_voice_player.volume_db = linear_to_db(_voice_volume)
	_voice_player.play()

func play_dialogue(filename: String) -> void:
	var path := DIALOGUE_BASE + filename
	var stream := _load_stream(path)
	if stream == null:
		return  # Silently fail if audio doesn't exist yet
	_voice_player.stream = stream
	_voice_player.play()

# --- Stream Loading ---
func _load_stream(path: String) -> AudioStream:
	if _stream_cache.has(path):
		return _stream_cache[path]
	if not FileAccess.file_exists(path):
		return null
	var stream := ResourceLoader.load(path, "AudioStream") as AudioStream
	if stream:
		_stream_cache[path] = stream
	return stream

# --- Volume Control ---
func set_music_volume(value: float) -> void:
	_music_volume = clampf(value, 0.0, 1.0)
	_music_player.volume_db = linear_to_db(maxf(_music_volume, 0.001))

func set_sfx_volume(value: float) -> void:
	_sfx_volume = clampf(value, 0.0, 1.0)
	for player in _sfx_players:
		player.volume_db = linear_to_db(maxf(_sfx_volume, 0.001))

func set_voice_volume(value: float) -> void:
	_voice_volume = clampf(value, 0.0, 1.0)
	_voice_player.volume_db = linear_to_db(maxf(_voice_volume, 0.001))

func get_music_volume() -> float:
	return _music_volume

func get_sfx_volume() -> float:
	return _sfx_volume

func get_voice_volume() -> float:
	return _voice_volume

# --- Named SFX shortcuts ---
func play_ui_click() -> void:
	play_sfx("ui_click")

func play_ui_confirm() -> void:
	play_sfx("ui_confirm")

func play_ui_cancel() -> void:
	play_sfx("ui_cancel")

func play_quest_complete() -> void:
	play_sfx("quest_complete")

func play_word_correct() -> void:
	play_sfx("word_correct")

func play_word_wrong() -> void:
	play_sfx("word_wrong")
