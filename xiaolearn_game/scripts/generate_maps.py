#!/usr/bin/env python3
"""
Generate region map scenes using vectoraith chinese medieval tilesets
and chinese NPC sprite pack.

Godot 4 TileMap format=2 encoding (3 int32 per tile):
  value1 = (cell_y << 16) | (cell_x & 0xFFFF)    -- position
  value2 = (atlas_x << 16) | source_id             -- source + atlas X
  value3 = (alternative << 16) | (atlas_y & 0xFFFF) -- alt + atlas Y
"""
import os
import random

GAME_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCENES_DIR = os.path.join(GAME_DIR, "scenes", "regions")

MAP_W, MAP_H = 60, 45  # tiles (960x720 pixels)

# === Tile encoding ===

def encode_pos(x, y):
    if x < 0: x += 65536
    if y < 0: y += 65536
    return (y << 16) | (x & 0xFFFF)

def tiles_to_packed_array(tiles, source_id=0):
    """Convert tile list to PackedInt32Array string."""
    values = []
    for x, y, ax, ay, alt in tiles:
        val1 = encode_pos(x, y)
        val2 = (ax << 16) | (source_id & 0xFFFF)
        val3 = (alt << 16) | (ay & 0xFFFF)
        values.extend([val1, val2, val3])
    return ", ".join(str(v) for v in values)


# === Tile coordinates in _0.png (infrastructure, 16x16 grid) ===
# From visual inspection of the 256x256 image:
#   Row 0 (y=0): stone ground tiles (cols 0-5), wall/gate elements (cols 6-9), building parts (10-15)
#   Row 1 (y=1): ground variant (col 0), small pond (cols 1-3), ground (cols 4-5)
#   Rows 2-5: Hexagonal pond, large pond, red carpet, fence
#   Rows 7-9: Bridge, stairs, wall segments
#   Rows 8-12: Lanterns, decorations

GROUND_STONE = (0, 0)   # Light stone ground (main)
GROUND_V1 = (1, 0)      # Stone variant 1
GROUND_V2 = (2, 0)      # Stone variant 2
GROUND_V3 = (3, 0)      # Stone variant 3
GROUND_PATH = (4, 0)    # Lighter path stone
GROUND_V4 = (5, 0)      # Another stone variant
WALL_DARK = (6, 0)       # Dark wall element (for collision borders)
WALL_GATE = (7, 0)       # Gate/wall element
GROUND_ALT = (0, 1)     # Alt ground tile


# === NPC sprite rect helper ===
# NPC sheets are 192x256 (12x16 tiles). 4 characters across x 4 down.
# Each character = 3 frames wide x 4 directions tall (48x64 px).
# Front-facing idle = first frame of first direction row.

def npc_rect(char_col, char_row):
    x = char_col * 48
    y = char_row * 64
    return f"Rect2({x}, {y}, 16, 16)"


# === Map generation ===

GROUND_TILES = [GROUND_STONE, GROUND_V1, GROUND_V2, GROUND_V3, GROUND_PATH, GROUND_V4, GROUND_ALT]

def generate_ground_layer(region_theme, seed=42):
    """Generate ground tiles. Only stone paths, roads, and plazas are placed.
    Empty cells = grass (shown via background ColorRect)."""
    random.seed(seed)
    tiles = []

    def add(x, y, tile=None, alt=0):
        if tile is None:
            tile = random.choice(GROUND_TILES)
        tiles.append((x, y, tile[0], tile[1], alt))

    def fill_rect(x1, y1, x2, y2, tile=None):
        for yy in range(y1, y2):
            for xx in range(x1, x2):
                add(xx, yy, tile)

    def fill_road_h(y, x1, x2, tile=GROUND_PATH):
        for xx in range(x1, x2):
            add(xx, y, tile)
            add(xx, y + 1, tile)

    def fill_road_v(x, y1, y2, tile=GROUND_PATH):
        for yy in range(y1, y2):
            add(x, yy, tile)
            add(x + 1, yy, tile)

    # Border walls (collision)
    for x in range(MAP_W):
        add(x, 0, WALL_DARK)
        add(x, 1, WALL_DARK)
        add(x, MAP_H - 2, WALL_DARK)
        add(x, MAP_H - 1, WALL_DARK)
    for y in range(2, MAP_H - 2):
        add(0, y, WALL_DARK)
        add(1, y, WALL_DARK)
        add(MAP_W - 2, y, WALL_DARK)
        add(MAP_W - 1, y, WALL_DARK)

    if region_theme == "imperial":
        # Beijing: formal stone paths in cross pattern + plaza
        # Main N-S road (center)
        fill_road_v(29, 3, MAP_H - 3)
        fill_road_v(30, 3, MAP_H - 3)
        # E-W road
        fill_road_h(21, 3, MAP_W - 3)
        fill_road_h(22, 3, MAP_W - 3)
        # Northern plaza
        fill_rect(15, 4, 45, 12, GROUND_STONE)
        # Southern plaza
        fill_rect(20, 35, 40, 40, GROUND_PATH)

    elif region_theme == "port":
        # Shanghai: docks on right, market paths on left
        # Dock boardwalk (right side, vertical)
        fill_rect(42, 3, 48, MAP_H - 3, GROUND_V2)
        # Main road
        fill_road_v(20, 3, MAP_H - 3)
        # Cross roads
        fill_road_h(12, 3, 42)
        fill_road_h(28, 3, 42)
        # Market square
        fill_rect(5, 14, 18, 26, GROUND_PATH)

    elif region_theme == "ancient":
        # Xi'an: grid city with inner walls
        # Inner wall
        for x in range(5, MAP_W - 5):
            add(x, 5, WALL_GATE)
            add(x, MAP_H - 6, WALL_GATE)
        for y in range(5, MAP_H - 5):
            add(5, y, WALL_GATE)
            add(MAP_W - 6, y, WALL_GATE)
        # Gate openings
        fill_rect(27, 5, 33, 6, GROUND_PATH)
        fill_rect(27, MAP_H - 6, 33, MAP_H - 5, GROUND_PATH)
        fill_rect(5, 20, 6, 25, GROUND_PATH)
        fill_rect(MAP_W - 6, 20, MAP_W - 5, 25, GROUND_PATH)
        # Internal cross roads
        fill_road_v(29, 6, MAP_H - 6)
        fill_road_h(22, 6, MAP_W - 6)
        # Central plaza
        fill_rect(24, 18, 36, 27, GROUND_STONE)

    elif region_theme == "garden":
        # Chengdu: curved paths around central garden
        # Circular path (approximation)
        fill_road_h(16, 12, 48)
        fill_road_h(30, 12, 48)
        fill_road_v(12, 16, 30)
        fill_road_v(47, 16, 30)
        # Central area (will have pond sprite on top)
        fill_rect(22, 20, 38, 28, GROUND_V3)
        # Entrance paths
        fill_road_v(29, 3, 16)
        fill_road_v(29, 30, MAP_H - 3)

    elif region_theme == "riverside":
        # Guilin: paths along river banks
        # South bank path
        fill_road_h(27, 3, MAP_W - 3)
        # North bank path
        fill_road_h(16, 3, MAP_W - 3)
        # Bridge across river (center)
        fill_road_v(29, 17, 27)
        # Village paths (south)
        fill_road_h(35, 10, 50)
        fill_road_v(20, 28, 40)
        fill_road_v(40, 28, 40)

    return tiles


# === Scene generation helpers ===

def gen_ext_resources():
    return """[ext_resource type="Script" path="res://scripts/RegionMap.gd" id="1_regionmap"]
[ext_resource type="Script" path="res://scripts/NPC.gd" id="2_npc"]
[ext_resource type="Script" path="res://scripts/QuestNPC.gd" id="3_questnpc"]
[ext_resource type="PackedScene" path="res://scenes/ui/hud.tscn" id="4_hud"]
[ext_resource type="PackedScene" path="res://scenes/ui/dialogue_box.tscn" id="5_dialogue"]
[ext_resource type="PackedScene" path="res://scenes/ui/vocab_notebook.tscn" id="6_notebook"]
[ext_resource type="PackedScene" path="res://scenes/ui/quiz.tscn" id="7_quiz"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_buildings_chinese_medieval_0.png" id="tex_ground"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_buildings_chinese_medieval_1.png" id="bld_1"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_buildings_chinese_medieval_2.png" id="bld_2"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_buildings_chinese_medieval_3.png" id="bld_3"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_buildings_chinese_medieval_4.png" id="bld_4"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_buildings_chinese_medieval_5.png" id="bld_5"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_buildings_chinese_medieval_6.png" id="bld_6"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_buildings_chinese_medieval_0.png" id="bld_0"]
[ext_resource type="Texture2D" path="res://assets/Top Down RPG NPC Sprite Pack/16x16/_default_tint/chinese_people.png" id="npc_people"]
[ext_resource type="Texture2D" path="res://assets/Top Down RPG NPC Sprite Pack/16x16/_default_tint/chinese_jobs.png" id="npc_jobs"]
[ext_resource type="Texture2D" path="res://assets/Top Down RPG NPC Sprite Pack/16x16/_default_tint/chinese_royals.png" id="npc_royals"]
[ext_resource type="Texture2D" path="res://assets/Top Down RPG NPC Sprite Pack/16x16/_default_tint/chinese_royals_02.png" id="npc_royals2"]
[ext_resource type="FontFile" path="res://assets/fonts/NotoSansSC-Bold.otf" id="14_font"]"""


def gen_sub_resources(ground_tiles):
    """Generate TileSet sub-resources with atlas tile definitions."""
    # Collect unique atlas coords
    coords = set()
    for _, _, ax, ay, _ in ground_tiles:
        coords.add((ax, ay))

    # Wall/collision tiles
    wall_set = {WALL_DARK, WALL_GATE}

    lines = []
    lines.append('[sub_resource type="TileSetAtlasSource" id="TileSetAtlasSource_1"]')
    lines.append('texture = ExtResource("tex_ground")')
    lines.append('texture_region_size = Vector2i(16, 16)')
    for ax, ay in sorted(coords):
        lines.append(f'{ax}:{ay}/0 = 0')
        if (ax, ay) in wall_set:
            lines.append(f'{ax}:{ay}/0/physics_layer_0/polygon_0/points = PackedVector2Array(-8, -8, 8, -8, 8, 8, -8, 8)')

    lines.append('')
    lines.append('[sub_resource type="TileSet" id="TileSet_1"]')
    lines.append('tile_shape = 0')
    lines.append('tile_size = Vector2i(16, 16)')
    lines.append('physics_layer_0/collision_layer = 1')
    lines.append('physics_layer_0/collision_mask = 1')
    lines.append('sources/0 = SubResource("TileSetAtlasSource_1")')
    lines.append('')
    lines.append('[sub_resource type="CapsuleShape2D" id="CapsuleShape2D_npc"]')
    lines.append('radius = 5.0')
    lines.append('height = 12.0')
    lines.append('')
    lines.append('[sub_resource type="CircleShape2D" id="CircleShape2D_interact"]')
    lines.append('radius = 24.0')
    lines.append('')
    lines.append('[sub_resource type="RectangleShape2D" id="RectangleShape2D_exit"]')
    lines.append('size = Vector2(64, 32)')
    return "\n".join(lines)


def gen_background(theme):
    """Generate background ColorRect nodes (grass, water, sky)."""
    lines = []

    # Main grass background
    grass_color = {
        "imperial": "Color(0.28, 0.45, 0.22, 1.0)",
        "port": "Color(0.25, 0.40, 0.25, 1.0)",
        "ancient": "Color(0.35, 0.45, 0.20, 1.0)",
        "garden": "Color(0.22, 0.50, 0.25, 1.0)",
        "riverside": "Color(0.25, 0.48, 0.22, 1.0)",
    }[theme]

    lines.append('[node name="Background" type="ColorRect" parent="Environment"]')
    lines.append('z_index = -10')
    lines.append('offset_left = 0.0')
    lines.append('offset_top = 0.0')
    lines.append('offset_right = 960.0')
    lines.append('offset_bottom = 720.0')
    lines.append(f'color = {grass_color}')

    # Water areas per theme
    if theme == "port":
        # Ocean on the right
        lines.append('')
        lines.append('[node name="Water" type="ColorRect" parent="Environment"]')
        lines.append('z_index = -9')
        lines.append('offset_left = 700.0')
        lines.append('offset_top = 0.0')
        lines.append('offset_right = 960.0')
        lines.append('offset_bottom = 720.0')
        lines.append('color = Color(0.15, 0.35, 0.55, 1.0)')
    elif theme == "riverside":
        # River band across the middle
        lines.append('')
        lines.append('[node name="River" type="ColorRect" parent="Environment"]')
        lines.append('z_index = -9')
        lines.append('offset_left = 0.0')
        lines.append('offset_top = 272.0')
        lines.append('offset_right = 960.0')
        lines.append('offset_bottom = 432.0')
        lines.append('color = Color(0.15, 0.38, 0.52, 1.0)')
    elif theme == "garden":
        # Central pond
        lines.append('')
        lines.append('[node name="Pond" type="ColorRect" parent="Environment"]')
        lines.append('z_index = -9')
        lines.append('offset_left = 352.0')
        lines.append('offset_top = 320.0')
        lines.append('offset_right = 608.0')
        lines.append('offset_bottom = 448.0')
        lines.append('color = Color(0.18, 0.42, 0.55, 1.0)')

    return "\n".join(lines)


def gen_building_sprite(name, tex_id, px, py, pw, ph, pos_x, pos_y, z_index=1):
    lines = []
    lines.append(f'[node name="{name}" type="Sprite2D" parent="Environment"]')
    lines.append('texture_filter = 0')
    lines.append(f'z_index = {z_index}')
    lines.append(f'position = Vector2({pos_x}, {pos_y})')
    lines.append(f'texture = ExtResource("{tex_id}")')
    lines.append('region_enabled = true')
    lines.append(f'region_rect = Rect2({px}, {py}, {pw}, {ph})')
    return "\n".join(lines)


def gen_npc_node(npc_name, cfg):
    script_id = "3_questnpc" if cfg.get("quest") else "2_npc"
    cn, fr = cfg["cn"], cfg["fr"]
    px, py = cfg["position"]
    wander = "true" if cfg.get("wander") else "false"

    return f"""[node name="{npc_name}" type="CharacterBody2D" parent="NPCs"]
collision_layer = 4
collision_mask = 0
script = ExtResource("{script_id}")
position = Vector2({px}, {py})
npc_id = "{cfg['npc_id']}"
npc_name_cn = "{cn}"
npc_name_fr = "{fr}"
enable_wander = {wander}

[node name="Sprite2D" type="Sprite2D" parent="NPCs/{npc_name}"]
texture_filter = 0
texture = ExtResource("{cfg['texture']}")
region_enabled = true
region_rect = {cfg['region_rect']}
position = Vector2(0, -4)

[node name="CollisionShape2D" type="CollisionShape2D" parent="NPCs/{npc_name}"]
position = Vector2(0, 4)
shape = SubResource("CapsuleShape2D_npc")

[node name="InteractionArea" type="Area2D" parent="NPCs/{npc_name}"]

[node name="CollisionShape2D" type="CollisionShape2D" parent="NPCs/{npc_name}/InteractionArea"]
shape = SubResource("CircleShape2D_interact")

[node name="QuestMarker" type="Node2D" parent="NPCs/{npc_name}"]
position = Vector2(0, -16)

[node name="Available" type="Label" parent="NPCs/{npc_name}/QuestMarker"]
text = "!"
theme_override_font_sizes/font_size = 10
theme_override_colors/font_color = Color(1.0, 0.85, 0.1, 1.0)
position = Vector2(-3, -8)

[node name="Active" type="Label" parent="NPCs/{npc_name}/QuestMarker"]
text = "?"
theme_override_font_sizes/font_size = 18
theme_override_colors/font_color = Color(0.3, 0.9, 0.3, 1.0)
position = Vector2(-5, -12)
visible = false

[node name="Completed" type="Label" parent="NPCs/{npc_name}/QuestMarker"]
text = "\\u2713"
theme_override_font_sizes/font_size = 18
theme_override_colors/font_color = Color(0.7, 0.7, 0.7, 1.0)
position = Vector2(-5, -12)
visible = false

[node name="NameLabel" type="Label" parent="NPCs/{npc_name}"]
position = Vector2(-16, -24)
text = "{cn}"
theme_override_fonts/font = ExtResource("14_font")
theme_override_font_sizes/font_size = 8
theme_override_colors/font_color = Color(1.0, 0.95, 0.8, 1.0)
theme_override_colors/font_shadow_color = Color(0, 0, 0, 0.9)
theme_override_colors/font_outline_color = Color(0.1, 0.05, 0.0, 0.9)
theme_override_constants/shadow_offset_x = 1
theme_override_constants/shadow_offset_y = 1
theme_override_constants/outline_size = 1
visible = false

[node name="WanderTimer" type="Timer" parent="NPCs/{npc_name}"]
one_shot = true"""


def gen_label(name, text, px, py, font_size=10):
    return f"""[node name="{name}" type="Label" parent="."]
position = Vector2({px}, {py})
text = "{text}"
theme_override_fonts/font = ExtResource("14_font")
theme_override_font_sizes/font_size = {font_size}
theme_override_colors/font_color = Color(1.0, 0.9, 0.7, 0.9)
theme_override_colors/font_shadow_color = Color(0, 0, 0, 0.8)
theme_override_constants/shadow_offset_x = 1
theme_override_constants/shadow_offset_y = 1"""


# === Region definitions ===

REGIONS = {
    "beijing": {
        "uid": "uid://beijing_region_001",
        "node_name": "Beijing",
        "region_id": "beijing",
        "first_visit_npc": "npc_palace_guard",
        "theme": "imperial",
        "seed": 42,
        "exit_pos": (16, 672),
        "spawn_pos": (480, 600),
        "buildings": [
            ("Palace", "bld_4", 0, 0, 224, 176, 368, 56),
            ("GovtLeft", "bld_2", 0, 0, 160, 80, 100, 100),
            ("GovtRight", "bld_2", 0, 96, 112, 96, 640, 100),
            ("ShopNW", "bld_1", 0, 0, 64, 80, 160, 260),
            ("ShopNE", "bld_1", 80, 0, 96, 96, 580, 260),
            ("ShopSW", "bld_1", 0, 144, 96, 112, 160, 380),
            ("ShopSE", "bld_3", 0, 0, 128, 128, 580, 380),
            ("PondBridge", "bld_0", 0, 112, 96, 48, 200, 540),
            ("LanternsL", "bld_0", 176, 128, 48, 96, 340, 200),
            ("LanternsR", "bld_0", 176, 128, 48, 96, 580, 200),
        ],
        "labels": [
            ("Label_Gugong", "故宫 — Cité Interdite", 340, 20),
            ("Label_Tiananmen", "天安门", 420, 180),
            ("Label_Wangfujing", "王府井", 360, 340),
            ("Label_Exit", "← Carte", 16, 680),
        ],
        "npcs": [
            ("Guard", {"npc_id": "npc_palace_guard", "cn": "卫兵", "fr": "Garde",
                        "position": (370, 180), "wander": False,
                        "texture": "npc_royals", "region_rect": npc_rect(0, 0)}),
            ("Merchant", {"npc_id": "npc_tea_merchant", "cn": "茶商", "fr": "Marchand de thé",
                           "position": (200, 300), "wander": True,
                           "texture": "npc_jobs", "region_rect": npc_rect(1, 0)}),
            ("Student", {"npc_id": "npc_student_li", "cn": "学生小李", "fr": "Étudiant Li",
                          "position": (600, 300), "wander": True,
                          "texture": "npc_people", "region_rect": npc_rect(0, 1)}),
            ("Vendor", {"npc_id": "npc_snack_vendor", "cn": "小吃摊", "fr": "Vendeur de snacks",
                         "position": (200, 420), "wander": False,
                         "texture": "npc_jobs", "region_rect": npc_rect(2, 0)}),
            ("Elder", {"npc_id": "npc_professor_wang", "cn": "王教授", "fr": "Professeur Wang",
                        "position": (600, 460), "wander": True,
                        "texture": "npc_people", "region_rect": npc_rect(3, 2), "quest": True}),
        ],
    },
    "shanghai": {
        "uid": "uid://shanghai_region_001",
        "node_name": "Shanghai",
        "region_id": "shanghai",
        "first_visit_npc": "npc_dock_worker",
        "theme": "port",
        "seed": 100,
        "exit_pos": (16, 672),
        "spawn_pos": (480, 620),
        "buildings": [
            ("DockHouse1", "bld_6", 0, 0, 96, 80, 580, 120),
            ("DockHouse2", "bld_6", 96, 0, 80, 80, 580, 340),
            ("DockPlatform1", "bld_6", 0, 96, 128, 64, 620, 210),
            ("DockPlatform2", "bld_6", 0, 96, 128, 64, 620, 430),
            ("Boat1", "bld_6", 128, 176, 48, 32, 720, 250),
            ("Boat2", "bld_6", 128, 176, 48, 32, 720, 450),
            ("FishRack", "bld_6", 192, 96, 64, 48, 520, 200),
            ("ShopBund", "bld_3", 0, 0, 128, 128, 120, 80),
            ("ShopNanjing", "bld_1", 80, 0, 96, 96, 320, 80),
            ("MarketStall1", "bld_1", 112, 144, 80, 80, 120, 300),
            ("MarketStall2", "bld_1", 0, 144, 96, 112, 320, 300),
            ("Inn", "bld_3", 128, 128, 128, 128, 120, 460),
            ("Warehouse", "bld_6", 96, 0, 80, 80, 400, 460),
            ("WaterfrontLanterns", "bld_0", 176, 128, 48, 96, 500, 100),
        ],
        "labels": [
            ("Label_Bund", "外滩 — Le Bund", 100, 50),
            ("Label_Nanjing", "南京路", 300, 50),
            ("Label_Docks", "码头", 580, 50),
            ("Label_Exit", "← Carte", 16, 680),
        ],
        "npcs": [
            ("Docker", {"npc_id": "npc_dock_worker", "cn": "码头工人", "fr": "Docker",
                         "position": (580, 180), "wander": False,
                         "texture": "npc_jobs", "region_rect": npc_rect(0, 2)}),
            ("ShopOwner", {"npc_id": "npc_shop_owner", "cn": "店主", "fr": "Commerçant",
                            "position": (320, 200), "wander": False,
                            "texture": "npc_jobs", "region_rect": npc_rect(1, 1)}),
            ("Tourist", {"npc_id": "npc_tourist", "cn": "游客", "fr": "Touriste",
                          "position": (400, 360), "wander": True,
                          "texture": "npc_people", "region_rect": npc_rect(2, 0)}),
            ("FoodVendor", {"npc_id": "npc_food_vendor", "cn": "小吃摊", "fr": "Vendeur",
                             "position": (160, 380), "wander": False,
                             "texture": "npc_jobs", "region_rect": npc_rect(3, 0)}),
            ("GrandMa", {"npc_id": "npc_grandma_chen", "cn": "陈奶奶", "fr": "Grand-mère Chen",
                          "position": (200, 520), "wander": True,
                          "texture": "npc_people", "region_rect": npc_rect(0, 3), "quest": True}),
        ],
    },
    "xian": {
        "uid": "uid://xian_region_001",
        "node_name": "Xian",
        "region_id": "xian",
        "first_visit_npc": "npc_historian",
        "theme": "ancient",
        "seed": 300,
        "exit_pos": (16, 672),
        "spawn_pos": (400, 540),
        "buildings": [
            ("CityWall", "bld_5", 0, 0, 160, 256, 380, 48),
            ("WatchTower", "bld_5", 160, 0, 96, 256, 560, 48),
            ("GovtHall", "bld_2", 0, 0, 160, 80, 160, 160),
            ("Temple", "bld_2", 0, 96, 112, 96, 560, 300),
            ("MarketNoodle", "bld_1", 0, 0, 64, 80, 120, 340),
            ("MarketSpice", "bld_1", 80, 0, 96, 96, 280, 340),
            ("ShopCalligraphy", "bld_3", 128, 128, 128, 128, 120, 460),
            ("AncientHouse", "bld_3", 0, 128, 96, 128, 440, 460),
            ("InnXian", "bld_3", 0, 0, 128, 128, 640, 460),
            ("GateTorii", "bld_2", 160, 0, 64, 48, 380, 170),
        ],
        "labels": [
            ("Label_BingMaYong", "兵马俑 — Terracotta", 100, 32),
            ("Label_ChengQiang", "城墙 — Muraille", 380, 32),
            ("Label_HuiMinJie", "回民街 — Quartier Hui", 120, 310),
            ("Label_Exit", "← Carte", 16, 680),
        ],
        "npcs": [
            ("Historian", {"npc_id": "npc_historian", "cn": "历史学家", "fr": "Historien",
                            "position": (400, 220), "wander": False,
                            "texture": "npc_royals", "region_rect": npc_rect(1, 1)}),
            ("NoodleMaker", {"npc_id": "npc_noodle_maker", "cn": "面条师傅", "fr": "Fabricant de nouilles",
                              "position": (240, 380), "wander": False,
                              "texture": "npc_jobs", "region_rect": npc_rect(2, 1)}),
            ("TourGuide", {"npc_id": "npc_tour_guide", "cn": "导游", "fr": "Guide",
                            "position": (560, 360), "wander": True,
                            "texture": "npc_people", "region_rect": npc_rect(1, 0)}),
            ("Calligrapher", {"npc_id": "npc_calligrapher", "cn": "书法家", "fr": "Calligraphe",
                               "position": (160, 500), "wander": False,
                               "texture": "npc_jobs", "region_rect": npc_rect(0, 1)}),
            ("GrandpaZhao", {"npc_id": "npc_grandpa_zhao", "cn": "赵爷爷", "fr": "Grand-père Zhao",
                              "position": (500, 500), "wander": True,
                              "texture": "npc_people", "region_rect": npc_rect(3, 3), "quest": True}),
        ],
    },
    "chengdu": {
        "uid": "uid://chengdu_region_001",
        "node_name": "Chengdu",
        "region_id": "chengdu",
        "first_visit_npc": "npc_panda_keeper",
        "theme": "garden",
        "seed": 500,
        "exit_pos": (16, 672),
        "spawn_pos": (400, 540),
        "buildings": [
            ("PandaHouse", "bld_1", 0, 0, 64, 80, 120, 80),
            ("Teahouse", "bld_3", 0, 0, 128, 128, 600, 80),
            ("GardenBridge", "bld_0", 0, 112, 96, 48, 440, 360),
            ("AlleyShop1", "bld_1", 80, 0, 96, 96, 120, 300),
            ("AlleyShop2", "bld_1", 0, 144, 96, 112, 120, 440),
            ("JinliShop1", "bld_3", 128, 128, 128, 128, 600, 300),
            ("JinliShop2", "bld_1", 112, 144, 80, 80, 600, 460),
            ("Temple", "bld_2", 0, 96, 112, 96, 340, 80),
            ("Lanterns1", "bld_0", 176, 128, 48, 96, 300, 260),
            ("Lanterns2", "bld_0", 176, 128, 48, 96, 540, 260),
        ],
        "labels": [
            ("Label_PandaBase", "熊猫基地 — Base Panda", 80, 50),
            ("Label_KuanZhai", "宽窄巷子 — Kuanzhai", 100, 270),
            ("Label_JinLi", "锦里 — Jinli", 600, 270),
            ("Label_Exit", "← Carte", 16, 680),
        ],
        "npcs": [
            ("PandaKeeper", {"npc_id": "npc_panda_keeper", "cn": "饲养员", "fr": "Soigneur",
                              "position": (160, 170), "wander": False,
                              "texture": "npc_jobs", "region_rect": npc_rect(3, 1)}),
            ("TeahouseOwner", {"npc_id": "npc_teahouse", "cn": "茶馆老板", "fr": "Patron de thé",
                                "position": (620, 210), "wander": False,
                                "texture": "npc_jobs", "region_rect": npc_rect(1, 2)}),
            ("SichuanChef", {"npc_id": "npc_sichuan_chef", "cn": "川菜师傅", "fr": "Chef cuisinier",
                              "position": (160, 380), "wander": True,
                              "texture": "npc_jobs", "region_rect": npc_rect(2, 2)}),
            ("Monk", {"npc_id": "npc_monk", "cn": "和尚", "fr": "Moine",
                       "position": (400, 170), "wander": False,
                       "texture": "npc_royals2", "region_rect": npc_rect(0, 2)}),
            ("Artist", {"npc_id": "npc_artist", "cn": "画家", "fr": "Artiste",
                         "position": (400, 500), "wander": True,
                         "texture": "npc_people", "region_rect": npc_rect(2, 1), "quest": True}),
        ],
    },
    "guilin": {
        "uid": "uid://guilin_region_001",
        "node_name": "Guilin",
        "region_id": "guilin",
        "first_visit_npc": "npc_fisherman",
        "theme": "riverside",
        "seed": 700,
        "exit_pos": (16, 672),
        "spawn_pos": (480, 620),
        "buildings": [
            ("FishHouse1", "bld_6", 0, 0, 96, 80, 160, 440),
            ("FishHouse2", "bld_6", 96, 0, 80, 80, 360, 440),
            ("DockPlatform", "bld_6", 0, 96, 128, 64, 560, 380),
            ("Boat1", "bld_6", 128, 176, 48, 32, 600, 360),
            ("Boat2", "bld_6", 128, 176, 48, 32, 200, 360),
            ("FishRack1", "bld_6", 192, 96, 64, 48, 480, 440),
            ("VillageHouse", "bld_1", 0, 0, 64, 80, 560, 500),
            ("VillageShop", "bld_1", 80, 0, 96, 96, 280, 500),
            ("Herbalist", "bld_1", 0, 144, 96, 112, 440, 540),
            ("ForestHouse", "bld_3", 0, 128, 96, 128, 200, 80),
            ("WatchPoint", "bld_2", 128, 96, 128, 96, 560, 80),
            ("RiverBridge", "bld_0", 0, 112, 96, 48, 380, 350),
        ],
        "labels": [
            ("Label_LiJiang", "漓江 — Rivière Li", 360, 290),
            ("Label_ElephantHill", "象鼻山 — Colline Éléphant", 520, 50),
            ("Label_LongJi", "龙脊 — Longji", 160, 50),
            ("Label_Exit", "← Carte", 16, 680),
        ],
        "npcs": [
            ("Fisherman", {"npc_id": "npc_fisherman", "cn": "渔夫", "fr": "Pêcheur",
                            "position": (200, 400), "wander": False,
                            "texture": "npc_jobs", "region_rect": npc_rect(0, 3)}),
            ("Boatman", {"npc_id": "npc_boatman", "cn": "船夫", "fr": "Batelier",
                          "position": (560, 400), "wander": False,
                          "texture": "npc_jobs", "region_rect": npc_rect(1, 3)}),
            ("Traveler", {"npc_id": "npc_traveler", "cn": "旅行者", "fr": "Voyageur",
                           "position": (380, 480), "wander": True,
                           "texture": "npc_people", "region_rect": npc_rect(3, 0)}),
            ("HerbalistNPC", {"npc_id": "npc_herbalist", "cn": "药师", "fr": "Herboriste",
                               "position": (460, 580), "wander": False,
                               "texture": "npc_jobs", "region_rect": npc_rect(2, 3)}),
            ("Poet", {"npc_id": "npc_poet", "cn": "诗人", "fr": "Poète",
                       "position": (260, 580), "wander": True,
                       "texture": "npc_people", "region_rect": npc_rect(1, 2), "quest": True}),
        ],
    },
}


def generate_scene(key):
    cfg = REGIONS[key]
    ground = generate_ground_layer(cfg["theme"], cfg["seed"])
    ground_data = tiles_to_packed_array(ground)

    parts = []

    # Header
    parts.append(f'[gd_scene load_steps=25 format=3 uid="{cfg["uid"]}"]')
    parts.append('')
    parts.append(gen_ext_resources())
    parts.append('')
    parts.append(gen_sub_resources(ground))
    parts.append('')

    # Root
    parts.append(f'[node name="{cfg["node_name"]}" type="Node2D"]')
    parts.append('script = ExtResource("1_regionmap")')
    parts.append(f'region_id = "{cfg["region_id"]}"')
    parts.append(f'first_visit_cutscene_npc = "{cfg["first_visit_npc"]}"')
    parts.append('')

    # TileMap
    parts.append('[node name="TileMap" type="TileMap" parent="."]')
    parts.append('texture_filter = 0')
    parts.append('tile_set = SubResource("TileSet_1")')
    parts.append('format = 2')
    parts.append('layer_0/name = "Ground"')
    parts.append(f'layer_0/tile_data = PackedInt32Array({ground_data})')
    parts.append('')

    # Environment
    parts.append('[node name="Environment" type="Node2D" parent="."]')
    parts.append('')
    parts.append(gen_background(cfg["theme"]))
    parts.append('')

    # Buildings
    for b in cfg["buildings"]:
        name, tex, px, py, pw, ph, bx, by = b
        parts.append(gen_building_sprite(name, tex, px, py, pw, ph, bx, by))
        parts.append('')

    # Labels
    for l in cfg["labels"]:
        parts.append(gen_label(*l))
        parts.append('')

    # NPCs
    parts.append('[node name="NPCs" type="Node2D" parent="."]')
    parts.append('')
    for npc_name, npc_cfg in cfg["npcs"]:
        parts.append(gen_npc_node(npc_name, npc_cfg))
        parts.append('')

    # Footer
    ex, ey = cfg["exit_pos"]
    sx, sy = cfg["spawn_pos"]
    parts.append('[node name="Objects" type="Node2D" parent="."]')
    parts.append('')
    parts.append('[node name="ExitTriggers" type="Node2D" parent="."]')
    parts.append('')
    parts.append('[node name="ExitToWorldMap" type="Area2D" parent="ExitTriggers"]')
    parts.append(f'position = Vector2({ex}, {ey})')
    parts.append('')
    parts.append('[node name="CollisionShape2D" type="CollisionShape2D" parent="ExitTriggers/ExitToWorldMap"]')
    parts.append('shape = SubResource("RectangleShape2D_exit")')
    parts.append('')
    parts.append('[node name="PlayerSpawn" type="Marker2D" parent="."]')
    parts.append(f'position = Vector2({sx}, {sy})')
    parts.append('')
    parts.append('[node name="HUD" type="CanvasLayer" parent="."]')
    parts.append('')
    parts.append('[node name="HUDScene" parent="HUD"]')
    parts.append('instance = ExtResource("4_hud")')
    parts.append('')
    parts.append('[node name="DialogueBoxScene" parent="HUD"]')
    parts.append('instance = ExtResource("5_dialogue")')
    parts.append('')
    parts.append('[node name="CutscenePlayer" type="AnimationPlayer" parent="."]')

    return "\n".join(parts)


def main():
    for key in REGIONS:
        content = generate_scene(key)
        path = os.path.join(SCENES_DIR, f"{key}.tscn")
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        lines = content.count("\n") + 1
        print(f"Generated {key}.tscn ({lines} lines)")
    print("Done!")


if __name__ == "__main__":
    main()
