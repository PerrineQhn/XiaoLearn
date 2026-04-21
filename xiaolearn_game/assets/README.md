# XiaoLearn Game — Assets Guide

This directory contains or should contain all art, audio, and font assets.
All listed assets are **open-source** and can be obtained for free.

---

## 1. Tilesets (2D top-down)

### LPC (Liberated Pixel Cup) — OpenGameArt.org
URL: https://opengameart.org/content/lpc-base-tiles

Recommended packs:
- **LPC Terrains** — ground tiles (grass, stone, dirt, wood)
- **LPC Buildings** — walls, roofs, doors
- **LPC Interior** — indoor floor tiles
- **LPC China/Asia** — community-contributed Oriental tileset

Search query on opengameart.org: `LPC tileset`

**Required tile size:** 32×32 pixels
**Recommended format:** PNG with transparency

Place tilesets in: `res://assets/tilesets/`

File naming convention:
```
tilesets/
  terrain_ground.png       # Ground tiles (grass, stone, pavement)
  terrain_walls.png        # Wall tiles
  decor_objects.png        # Props, furniture, signs
  building_roofs.png       # Building rooftops
```

---

## 2. Character Sprites

### Kenney Character Sprites
URL: https://kenney.nl/assets/rpg-character-base

Alternative (LPC compatible): https://opengameart.org/content/lpc-character-sprites

**Required format:** Animated sprite sheets, 48×48 or 64×64 per frame
**Animations needed per character:**
- `idle_down`, `idle_up`, `idle_left`, `idle_right`
- `walk_down`, `walk_up`, `walk_left`, `walk_right`

Place sprites in: `res://assets/characters/`

File naming:
```
characters/
  player.png              # Player character sprite sheet
  npc_guard.png           # Palace Guard
  npc_merchant.png        # Tea Merchant
  npc_student.png         # Student
  npc_vendor.png          # Food Vendor
  npc_elder.png           # Elder/Sage
```

### Portraits (Dialogue)
Size: 128×128 pixels recommended
Style: Simple pixel art or flat design faces

Place portraits in: `res://assets/portraits/`

```
portraits/
  guard.png
  merchant.png
  student.png
  vendor.png
  elder.png
  placeholder.png         # Fallback portrait
```

---

## 3. Audio

### Music (Background)
**Format:** OGG Vorbis (required by Godot mobile exports)
**Loop:** Yes, seamless looping preferred

Sources:
- **FreeMusicArchive.org** — search "Chinese traditional" or "Asian ambient"
- **Freesound.org** — Chinese instruments (erhu, guzheng, pipa)
- **Incompetech (Kevin MacLeod)** — royalty-free game music

Expected files in `res://assets/audio/music/`:
```
main_menu_theme.ogg
world_map_theme.ogg
beijing_theme.ogg
shanghai_theme.ogg
xian_theme.ogg
chengdu_theme.ogg
guilin_theme.ogg
```

### SFX
**Format:** OGG or WAV

Sources:
- **Kenney.nl/assets/ui-audio** — UI sounds
- **Freesound.org** — search "Chinese bell", "footsteps", etc.

Expected files in `res://assets/audio/sfx/`:
```
ui_click.ogg
ui_confirm.ogg
ui_cancel.ogg
quest_complete.ogg
word_correct.ogg
word_wrong.ogg
footstep_stone.ogg
footstep_grass.ogg
```

### Vocabulary Pronunciation (TTS)
**Format:** OGG, short clips (1-3 seconds)

Generate using:
- **gTTS (Python):** `gtts-cli "你好" --lang zh-cn -o hsk1_001.ogg`
- **Azure TTS** free tier (professional quality)
- **VoiceVox** for Japanese, **Edge TTS** for Chinese

Place in `res://assets/audio/vocab/`:
```
hsk1_001.ogg    # 你好
hsk1_002.ogg    # 谢谢
...             # (one file per word ID in hsk1_beijing.json)
```

---

## 4. Fonts

### Noto Sans SC (Simplified Chinese)
URL: https://fonts.google.com/noto/specimen/Noto+Sans+SC
Download the **Regular** and **Bold** weights.

Place in `res://assets/fonts/`:
```
fonts/
  NotoSansSC-Regular.ttf
  NotoSansSC-Bold.ttf
  NotoSansSC-Black.ttf    # For large Chinese characters in dialogue
```

---

## 5. UI Icons

### Kenney UI Pack
URL: https://kenney.nl/assets/ui-pack

Needed icons:
- Quest marker (! and ?)
- Lock icon
- Star/mastery indicators
- Audio speaker

---

## 6. Placeholder Icon

The project expects `res://assets/icon.svg`.
Create a simple SVG with the characters 小L or the app logo.

Minimum size: 256×256 pixels

---

## 7. Quick Setup Script (Python/gTTS)

To generate vocabulary audio files automatically:

```python
#!/usr/bin/env python3
# generate_vocab_audio.py
# pip install gTTS

import json
from gtts import gTTS
import os

with open("data/vocabulary/hsk1_beijing.json") as f:
    data = json.load(f)

os.makedirs("assets/audio/vocab", exist_ok=True)

for word in data["words"]:
    word_id = word["id"]
    hanzi = word["hanzi"]
    output = f"assets/audio/vocab/{word_id}.ogg"
    if not os.path.exists(output):
        tts = gTTS(hanzi, lang="zh-cn")
        tts.save(output)
        print(f"Generated: {output} — {hanzi}")
```

---

## Notes

- All LPC assets are licensed under **CC-BY 3.0** or **GPL 2.0+/CC-BY-SA 3.0**
- Kenney assets are **CC0 (public domain)**
- FreeMusicArchive licenses vary — check each track
- Noto fonts are licensed under **SIL Open Font License 1.1**
