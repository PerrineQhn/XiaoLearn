## ToneHighlighter.gd
## Utility class: colorizes pinyin syllables by tone number.
## Tone 1 = blue, 2 = green, 3 = orange, 4 = red, neutral (0/5) = gray.
## Works with BBCode for RichTextLabel output.
class_name ToneHighlighter
extends Node

# --- Tone Colors (BBCode hex) ---
const TONE_COLORS := {
	1: "#5BA4F5",   # Blue    — first tone (flat)
	2: "#4ECD7E",   # Green   — rising tone
	3: "#F0A030",   # Orange  — dipping tone
	4: "#E85454",   # Red     — falling tone
	0: "#A0A0A0",   # Gray    — neutral / no tone
	5: "#A0A0A0",   # Gray    — neutral variant
}

# --- Tone diacritic to number mapping ---
const TONE_DIACRITIC_MAP := {
	# Tone 1
	"ā": 1, "ē": 1, "ī": 1, "ō": 1, "ū": 1, "ǖ": 1,
	# Tone 2
	"á": 2, "é": 2, "í": 2, "ó": 2, "ú": 2, "ǘ": 2,
	# Tone 3
	"ǎ": 3, "ě": 3, "ǐ": 3, "ǒ": 3, "ǔ": 3, "ǚ": 3,
	# Tone 4
	"à": 4, "è": 4, "ì": 4, "ò": 4, "ù": 4, "ǜ": 4,
}

## Returns a BBCode-formatted string with each syllable colored by tone.
## Input: "nǐ hǎo" → output: "[color=#F0A030]nǐ[/color] [color=#F0A030]hǎo[/color]"
func colorize_pinyin_bbcode(pinyin: String) -> String:
	if pinyin.is_empty():
		return ""
	var syllables := _split_pinyin(pinyin)
	var result := ""
	for i in syllables.size():
		var syl: String = syllables[i]
		if syl == " " or syl == "":
			result += syl
			continue
		var tone_num := _detect_tone(syl)
		var color: String = TONE_COLORS.get(tone_num, TONE_COLORS[0])
		result += "[color=" + color + "]" + syl + "[/color]"
	return result

## Returns the tone number (1-4, 0 for neutral) of a single syllable.
func get_tone_number(syllable: String) -> int:
	return _detect_tone(syllable)

## Returns the Color object for a given tone number.
func get_tone_color(tone_num: int) -> Color:
	var hex: String = TONE_COLORS.get(tone_num, TONE_COLORS[0])
	return Color(hex)

## Returns an Array of Colors for a list of tone numbers.
func get_tone_colors_for_word(tones: Array) -> Array[Color]:
	var colors: Array[Color] = []
	for t in tones:
		colors.append(get_tone_color(t))
	return colors

# --- Internal helpers ---

## Split pinyin string into syllables (space-delimited), preserving spaces.
func _split_pinyin(pinyin: String) -> Array:
	var parts := []
	var current := ""
	for i in pinyin.length():
		var c := pinyin[i]
		if c == " ":
			if not current.is_empty():
				parts.append(current)
				current = ""
			parts.append(" ")
		else:
			current += c
	if not current.is_empty():
		parts.append(current)
	return parts

## Detect tone number from a syllable by checking for diacritics.
func _detect_tone(syllable: String) -> int:
	for char_idx in syllable.length():
		var c := syllable[char_idx]
		if TONE_DIACRITIC_MAP.has(c):
			return TONE_DIACRITIC_MAP[c]
	# Check for numeric tone suffix (e.g. "ni3")
	if syllable.length() > 0:
		var last_char := syllable[syllable.length() - 1]
		if last_char.is_valid_int():
			var n := int(last_char)
			if n >= 1 and n <= 4:
				return n
			return 0
	return 0  # Neutral

## Strip tone diacritics for comparison
func strip_tones(pinyin: String) -> String:
	var result := ""
	for i in pinyin.length():
		var c := pinyin[i]
		match c:
			"ā", "á", "ǎ", "à": result += "a"
			"ē", "é", "ě", "è": result += "e"
			"ī", "í", "ǐ", "ì": result += "i"
			"ō", "ó", "ǒ", "ò": result += "o"
			"ū", "ú", "ǔ", "ù": result += "u"
			"ǖ", "ǘ", "ǚ", "ǜ": result += "v"
			_: result += c
	return result

## Convert numeric tone pinyin to diacritic pinyin (basic implementation)
func numeric_to_diacritic(pinyin: String) -> String:
	# e.g. "ni3" → "nǐ"
	const VOWEL_ORDER := ["a", "e", "ou", "o", "i", "u", "v"]
	const TONE_MARKS := {
		"a": ["ā", "á", "ǎ", "à", "a"],
		"e": ["ē", "é", "ě", "è", "e"],
		"o": ["ō", "ó", "ǒ", "ò", "o"],
		"i": ["ī", "í", "ǐ", "ì", "i"],
		"u": ["ū", "ú", "ǔ", "ù", "u"],
		"v": ["ǖ", "ǘ", "ǚ", "ǜ", "ü"],
	}
	var syllables := pinyin.split(" ")
	var result_parts: Array[String] = []
	for syl in syllables:
		if syl.is_empty():
			result_parts.append(syl)
			continue
		var last_c := syl[syl.length() - 1]
		if not last_c.is_valid_int():
			result_parts.append(syl)
			continue
		var tone_idx := int(last_c) - 1
		var base := syl.substr(0, syl.length() - 1)
		var converted := base
		# Find the vowel to mark
		for vowel in VOWEL_ORDER:
			var idx := base.find(vowel)
			if idx != -1 and TONE_MARKS.has(vowel):
				var marks: Array = TONE_MARKS[vowel]
				if tone_idx >= 0 and tone_idx < marks.size():
					converted = base.substr(0, idx) + marks[tone_idx] + base.substr(idx + vowel.length())
				break
		result_parts.append(converted)
	return " ".join(result_parts)
