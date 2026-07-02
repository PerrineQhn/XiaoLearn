#!/usr/bin/env python3
"""Generate complete playable region .tscn scenes for XiaoLearn Game.

Creates Pokemon/RPG-style town maps with:
- TileMap data using the Asian tileset
- NPCs with Chinese name labels
- Location labels
- Exit triggers
- Player spawn points

Viewport: 960x540, Camera zoom x3 (visible: 320x180), tiles: 16x16
Map grid: 60 columns x 45 rows (scrolling map, camera follows player)
"""

import os

# --- Tile Atlas Coordinates ---
# Stored as (atlas_x, atlas_y) tuples
# Row 0-1: Ground
GRASS         = (0, 0)
GRASS_V1      = (1, 0)
GRASS_V2      = (2, 0)
STONE_PATH    = (3, 0)
STONE_BRICK   = (4, 0)
DIRT          = (5, 0)
WATER         = (6, 0)
WATER_V2      = (7, 0)
SAND          = (8, 0)
GRASS_STONE_T = (9, 0)
GRASS_STONE_B = (10, 0)
WATER_EDGE    = (11, 0)
# Row 1
GRASS_V3      = (0, 1)
GRASS_V4      = (1, 1)
DIRT_V2       = (2, 1)

# Row 2-3: Trees (decorations layer)
CHERRY        = (0, 2)
PINE          = (1, 2)
BAMBOO        = (2, 2)
WILLOW        = (3, 2)
BUSH          = (4, 2)
FLOWER_BUSH   = (5, 2)
TRUNK_BASE    = (6, 2)

# Row 4: Roofs
ROOF_RED      = (0, 4)
ROOF_RED2     = (1, 4)
ROOF_GREY     = (2, 4)
ROOF_GREY2    = (3, 4)
PAGODA_TOP    = (4, 4)

# Row 5: Walls
WALL_WHITE    = (0, 5)
WALL_RED      = (1, 5)
DOOR_RED      = (2, 5)
WINDOW_LAT    = (3, 5)
WALL_BASE     = (4, 5)

# Row 7: Fences
FENCE_BH      = (0, 7)
FENCE_BH2     = (1, 7)
FENCE_BV      = (2, 7)
FENCE_END     = (3, 7)
GWALL_H       = (4, 7)
GWALL_H2      = (5, 7)
GWALL_CORNER  = (6, 7)
SWALL_H       = (7, 7)

# Row 9: Props
LANTERN       = (0, 9)
SIGN          = (2, 9)
STONE_POT     = (3, 9)
STONE_LAMP    = (4, 9)
BARREL        = (5, 9)
STAIRS        = (6, 9)
BRIDGE_L      = (7, 9)
BRIDGE_R      = (8, 9)
TORII_L       = (9, 9)
TORII_R       = (10, 9)

# --- Cell encoding helpers ---
def cell_key(x, y):
    """Encode cell coordinates for Godot TileMap format=2."""
    cx = x & 0xFFFF
    cy = y & 0xFFFF
    return cx | (cy << 16)


def tile_data_triplet(x, y, atlas_tile, source_id=0):
    """Return 3 ints for one tile entry.

    Godot 4 TileMap format=2 encoding:
      value 1: cell_x | (cell_y << 16)
      value 2: source_id | (atlas_x << 16)
      value 3: atlas_y | (alternative_tile << 16)
    """
    atlas_x, atlas_y = atlas_tile
    v2 = (source_id & 0xFFFF) | ((atlas_x & 0xFFFF) << 16)
    v3 = (atlas_y & 0xFFFF)
    return [cell_key(x, y), v2, v3]


# --- Map Design Templates ---
def design_grass_field(width, height):
    """Generate a full grass field with random variants."""
    import random
    random.seed(42)
    tiles = []
    for y in range(height):
        for x in range(width):
            r = random.random()
            if r < 0.6:
                tile = GRASS
            elif r < 0.8:
                tile = GRASS_V1
            elif r < 0.9:
                tile = GRASS_V2
            else:
                tile = GRASS_V3
            tiles.append((x, y, tile))
    return tiles


def make_path_h(y, x_start, x_end):
    """Horizontal stone path."""
    return [(x, y, STONE_PATH) for x in range(x_start, x_end + 1)]


def make_path_v(x, y_start, y_end):
    """Vertical stone path."""
    return [(x, y, STONE_PATH) for y in range(y_start, y_end + 1)]


def make_building(x, y, w=4, style="red"):
    """Chinese building: roof row, wall rows, door in center.
    x,y = top-left corner. w = width in tiles (min 3)."""
    tiles_ground = []
    tiles_deco = []
    roof = ROOF_RED if style == "red" else ROOF_GREY
    wall = WALL_RED if style == "red" else WALL_WHITE
    # Roof row
    for dx in range(w):
        tiles_deco.append((x + dx, y, roof))
    # Wall rows (2 rows)
    for dy in [1, 2]:
        for dx in range(w):
            tiles_deco.append((x + dx, y + dy, wall))
    # Door in center
    door_x = x + w // 2
    tiles_deco.append((door_x, y + 2, DOOR_RED))
    # Windows
    if w >= 4:
        tiles_deco.append((x + 1, y + 1, WINDOW_LAT))
        tiles_deco.append((x + w - 2, y + 1, WINDOW_LAT))
    # Foundation
    for dx in range(w):
        tiles_deco.append((x + dx, y + 3, WALL_BASE))
    # Ground under building = stone
    for dy in range(4):
        for dx in range(w):
            tiles_ground.append((x + dx, y + dy, STONE_BRICK))
    return tiles_ground, tiles_deco


def make_fence_h(y, x_start, x_end):
    """Horizontal bamboo fence."""
    tiles = []
    tiles.append((x_start, y, FENCE_END))
    for x in range(x_start + 1, x_end):
        tiles.append((x, y, FENCE_BH))
    tiles.append((x_end, y, FENCE_END))
    return tiles


def make_garden_wall_h(y, x_start, x_end):
    """Horizontal garden wall."""
    tiles = []
    for x in range(x_start, x_end + 1):
        tiles.append((x, y, GWALL_H))
    return tiles


def make_water_area(x, y, w, h):
    """Water area with edges."""
    tiles = []
    for dy in range(h):
        for dx in range(w):
            if dy == 0:
                tiles.append((x + dx, y + dy, WATER_EDGE))
            else:
                tiles.append((x + dx, y + dy, WATER if (dx + dy) % 2 == 0 else WATER_V2))
    return tiles


# --- NPC Definition ---
NPC_TEMPLATE = """
[node name="{name}" type="CharacterBody2D" parent="NPCs"]
script = ExtResource("2_npc")
position = Vector2({px}, {py})
npc_id = "{npc_id}"
npc_name_cn = "{name_cn}"
npc_name_fr = "{name_fr}"
enable_wander = {wander}

[node name="Sprite2D" type="Sprite2D" parent="NPCs/{name}"]
texture_filter = 0
texture = ExtResource("{tex_id}")
region_enabled = true
region_rect = Rect2(0, 0, 16, 16)
position = Vector2(0, -4)

[node name="CollisionShape2D" type="CollisionShape2D" parent="NPCs/{name}"]
position = Vector2(0, 4)
shape = SubResource("CapsuleShape2D_npc")

[node name="InteractionArea" type="Area2D" parent="NPCs/{name}"]

[node name="CollisionShape2D" type="CollisionShape2D" parent="NPCs/{name}/InteractionArea"]
shape = SubResource("CircleShape2D_interact")

[node name="QuestMarker" type="Node2D" parent="NPCs/{name}"]
position = Vector2(0, -16)

[node name="Available" type="Label" parent="NPCs/{name}/QuestMarker"]
text = "!"
theme_override_font_sizes/font_size = 10
theme_override_colors/font_color = Color(1.0, 0.85, 0.1, 1.0)
position = Vector2(-3, -8)

[node name="Active" type="Label" parent="NPCs/{name}/QuestMarker"]
text = "?"
theme_override_font_sizes/font_size = 18
theme_override_colors/font_color = Color(0.3, 0.9, 0.3, 1.0)
position = Vector2(-5, -12)
visible = false

[node name="Completed" type="Label" parent="NPCs/{name}/QuestMarker"]
text = "✓"
theme_override_font_sizes/font_size = 18
theme_override_colors/font_color = Color(0.7, 0.7, 0.7, 1.0)
position = Vector2(-5, -12)
visible = false

[node name="NameLabel" type="Label" parent="NPCs/{name}"]
position = Vector2(-16, -24)
text = "{name_cn}"
theme_override_fonts/font = ExtResource("14_font")
theme_override_font_sizes/font_size = 8
theme_override_colors/font_color = Color(1.0, 0.95, 0.8, 1.0)
theme_override_colors/font_shadow_color = Color(0, 0, 0, 0.9)
theme_override_colors/font_outline_color = Color(0.1, 0.05, 0.0, 0.9)
theme_override_constants/shadow_offset_x = 1
theme_override_constants/shadow_offset_y = 1
theme_override_constants/outline_size = 1
visible = false

[node name="WanderTimer" type="Timer" parent="NPCs/{name}"]
one_shot = true
"""


def format_tile_data(tiles):
    """Convert list of (x, y, atlas_tuple) to PackedInt32Array string.

    atlas_tuple is (atlas_x, atlas_y).
    Deduplicates by keeping the last tile placed at each (x,y).
    """
    # Deduplicate: last write wins
    tile_map = {}
    for entry in tiles:
        x, y = entry[0], entry[1]
        atlas = entry[2] if len(entry) > 2 else entry[2]
        tile_map[(x, y)] = atlas

    values = []
    for (x, y), atlas in sorted(tile_map.items()):
        values.extend(tile_data_triplet(x, y, atlas, 0))
    return "PackedInt32Array(" + ", ".join(str(v) for v in values) + ")"


# --- Region Definitions ---
REGIONS = {
    "beijing": {
        "uid": "uid://beijing_region_001",
        "name": "Beijing",
        "bg_color": "Color(0.42, 0.55, 0.35, 1.0)",
        "region_id": "beijing",
        "cutscene_npc": "npc_palace_guard",
        "labels": [
            ("Label_Gugong", "故宫", 200, 32, 14),
            ("Label_Tiananmen", "天安门", 520, 32, 14),
        ],
        "exit_label": ("← 离开北京", 16, 680),
        "npcs": [
            {"name": "Guard", "npc_id": "npc_palace_guard", "name_cn": "卫兵", "name_fr": "Garde", "px": 240, "py": 128, "tex": "npc_guard", "wander": "false"},
            {"name": "Merchant", "npc_id": "npc_tea_merchant", "name_cn": "茶商", "name_fr": "Marchand de thé", "px": 520, "py": 240, "tex": "npc_merchant", "wander": "true"},
            {"name": "Student", "npc_id": "npc_student_li", "name_cn": "学生小李", "name_fr": "Étudiant Li", "px": 128, "py": 340, "tex": "npc_student", "wander": "true"},
            {"name": "Vendor", "npc_id": "npc_snack_vendor", "name_cn": "小贩", "name_fr": "Vendeur", "px": 600, "py": 400, "tex": "npc_vendor", "wander": "false"},
            {"name": "Elder", "npc_id": "npc_elder_wang", "name_cn": "王老人", "name_fr": "Vieil homme Wang", "px": 400, "py": 480, "tex": "npc_elder", "wander": "true"},
        ],
        "spawn": (480, 620),
    },
    "shanghai": {
        "uid": "uid://shanghai_region_001",
        "name": "Shanghai",
        "bg_color": "Color(0.35, 0.45, 0.55, 1.0)",
        "region_id": "shanghai",
        "cutscene_npc": "npc_dock_worker",
        "labels": [
            ("Label_Bund", "外滩", 100, 32, 14),
            ("Label_Nanjing", "南京路", 400, 200, 14),
        ],
        "exit_label": ("← 离开上海", 16, 680),
        "npcs": [
            {"name": "Docker", "npc_id": "npc_dock_worker", "name_cn": "码头工人", "name_fr": "Docker", "px": 200, "py": 128, "tex": "npc_guard", "wander": "false"},
            {"name": "ShopOwner", "npc_id": "npc_shop_owner", "name_cn": "店主", "name_fr": "Commerçant", "px": 480, "py": 200, "tex": "npc_merchant", "wander": "false"},
            {"name": "Tourist", "npc_id": "npc_tourist", "name_cn": "游客", "name_fr": "Touriste", "px": 300, "py": 340, "tex": "npc_student", "wander": "true"},
            {"name": "FoodVendor", "npc_id": "npc_food_vendor", "name_cn": "小吃摊", "name_fr": "Vendeur", "px": 600, "py": 300, "tex": "npc_vendor", "wander": "false"},
            {"name": "GrandMa", "npc_id": "npc_grandma_chen", "name_cn": "陈奶奶", "name_fr": "Grand-mère Chen", "px": 160, "py": 480, "tex": "npc_elder", "wander": "true"},
        ],
        "spawn": (480, 620),
    },
    "chengdu": {
        "uid": "uid://chengdu_region_001",
        "name": "Chengdu",
        "bg_color": "Color(0.35, 0.55, 0.38, 1.0)",
        "region_id": "chengdu",
        "cutscene_npc": "npc_panda_keeper",
        "labels": [
            ("Label_Jinli", "锦里", 160, 48, 14),
            ("Label_Wuhou", "武侯祠", 520, 48, 14),
        ],
        "exit_label": ("← 离开成都", 16, 680),
        "npcs": [
            {"name": "Keeper", "npc_id": "npc_panda_keeper", "name_cn": "饲养员", "name_fr": "Soigneur", "px": 200, "py": 160, "tex": "npc_guard", "wander": "false"},
            {"name": "TeaHouse", "npc_id": "npc_teahouse", "name_cn": "茶馆老板", "name_fr": "Patron de thé", "px": 520, "py": 200, "tex": "npc_merchant", "wander": "false"},
            {"name": "Chef", "npc_id": "npc_sichuan_chef", "name_cn": "川菜师傅", "name_fr": "Chef cuisinier", "px": 128, "py": 360, "tex": "npc_vendor", "wander": "true"},
            {"name": "Monk", "npc_id": "npc_monk", "name_cn": "和尚", "name_fr": "Moine", "px": 600, "py": 340, "tex": "npc_elder", "wander": "false"},
            {"name": "Artist", "npc_id": "npc_artist", "name_cn": "画家", "name_fr": "Artiste", "px": 400, "py": 480, "tex": "npc_student", "wander": "true"},
        ],
        "spawn": (400, 540),
    },
    "guilin": {
        "uid": "uid://guilin_region_001",
        "name": "Guilin",
        "bg_color": "Color(0.30, 0.52, 0.48, 1.0)",
        "region_id": "guilin",
        "cutscene_npc": "npc_fisherman",
        "labels": [
            ("Label_LiRiver", "漓江", 550, 80, 14),
            ("Label_Elephant", "象鼻山", 180, 48, 14),
        ],
        "exit_label": ("← 离开桂林", 16, 680),
        "npcs": [
            {"name": "Fisher", "npc_id": "npc_fisherman", "name_cn": "渔夫", "name_fr": "Pêcheur", "px": 480, "py": 160, "tex": "npc_guard", "wander": "false"},
            {"name": "BoatMan", "npc_id": "npc_boatman", "name_cn": "船夫", "name_fr": "Batelier", "px": 560, "py": 320, "tex": "npc_merchant", "wander": "false"},
            {"name": "Traveler", "npc_id": "npc_traveler", "name_cn": "旅行者", "name_fr": "Voyageur", "px": 200, "py": 300, "tex": "npc_student", "wander": "true"},
            {"name": "Herbalist", "npc_id": "npc_herbalist", "name_cn": "药师", "name_fr": "Herboriste", "px": 300, "py": 400, "tex": "npc_vendor", "wander": "false"},
            {"name": "Poet", "npc_id": "npc_poet", "name_cn": "诗人", "name_fr": "Poète", "px": 160, "py": 480, "tex": "npc_elder", "wander": "true"},
        ],
        "spawn": (480, 620),
    },
    "xian": {
        "uid": "uid://xian_region_001",
        "name": "Xian",
        "bg_color": "Color(0.50, 0.42, 0.32, 1.0)",
        "region_id": "xian",
        "cutscene_npc": "npc_historian",
        "labels": [
            ("Label_Wall", "城墙", 100, 32, 14),
            ("Label_Tower", "钟楼", 380, 160, 14),
        ],
        "exit_label": ("← 离开西安", 16, 680),
        "npcs": [
            {"name": "Historian", "npc_id": "npc_historian", "name_cn": "历史学家", "name_fr": "Historien", "px": 400, "py": 200, "tex": "npc_guard", "wander": "false"},
            {"name": "NoodleMaker", "npc_id": "npc_noodle_maker", "name_cn": "面条师傅", "name_fr": "Fabricant de nouilles", "px": 240, "py": 300, "tex": "npc_merchant", "wander": "false"},
            {"name": "Guide", "npc_id": "npc_tour_guide", "name_cn": "导游", "name_fr": "Guide", "px": 560, "py": 340, "tex": "npc_student", "wander": "true"},
            {"name": "Calligrapher", "npc_id": "npc_calligrapher", "name_cn": "书法家", "name_fr": "Calligraphe", "px": 160, "py": 440, "tex": "npc_vendor", "wander": "false"},
            {"name": "GrandPa", "npc_id": "npc_grandpa_zhao", "name_cn": "赵爷爷", "name_fr": "Grand-père Zhao", "px": 500, "py": 480, "tex": "npc_elder", "wander": "true"},
        ],
        "spawn": (400, 540),
    },
}


def design_town_map(region_id, width=60, height=45):
    """Design a unique Pokemon-style town map per region (landscape)."""
    import random
    random.seed(hash(region_id) + 123)

    ground = []
    deco = []
    cx = width // 2   # 25
    cy = height // 2  # 20

    # 1. Fill with grass
    ground.extend(design_grass_field(width, height))

    # 2. Border walls (top and bottom)
    deco.extend(make_garden_wall_h(0, 0, width - 1))
    deco.extend(make_garden_wall_h(height - 1, 0, width - 1))

    # 3. Left exit path
    for y in range(height - 4, height):
        ground.append((0, y, STONE_PATH))
        ground.append((1, y, STONE_PATH))

    # ============================================================
    # UNIQUE LAYOUTS PER REGION
    # ============================================================

    if region_id == "beijing":
        # === BEIJING: Imperial Palace — grand symmetrical layout ===
        # Grand central avenue (horizontal)
        for x in range(5, width - 5):
            ground.append((x, cy - 1, STONE_PATH))
            ground.append((x, cy, STONE_PATH))
            ground.append((x, cy + 1, STONE_PATH))

        # Vertical path through center
        for y in range(2, height - 2):
            ground.append((cx - 1, y, STONE_PATH))
            ground.append((cx, y, STONE_PATH))
            ground.append((cx + 1, y, STONE_PATH))

        # Palace gate
        deco.append((cx - 2, 3, TORII_L))
        deco.append((cx + 2, 3, TORII_R))

        # Main palace (top center)
        bg, dg = make_building(18, 2, 14, "red")
        ground.extend(bg); deco.extend(dg)

        # Side halls
        bg, dg = make_building(4, 8, 6, "red")
        ground.extend(bg); deco.extend(dg)
        bg, dg = make_building(38, 8, 6, "red")
        ground.extend(bg); deco.extend(dg)

        # Scholar's hall and tea house
        bg, dg = make_building(4, 22, 5, "white")
        ground.extend(bg); deco.extend(dg)
        bg, dg = make_building(40, 22, 5, "white")
        ground.extend(bg); deco.extend(dg)

        # Market area (bottom)
        for bx in [5, 14, 30, 39]:
            bg, dg = make_building(bx, 30, 5, "white" if bx % 2 == 0 else "red")
            ground.extend(bg); deco.extend(dg)

        # Cherry tree garden (left and right of palace)
        for pos in [(14, 5), (16, 7), (33, 5), (35, 7), (12, 14), (37, 14)]:
            deco.append((pos[0], pos[1], CHERRY))

        # Lanterns along avenue
        for lx in range(8, width - 8, 5):
            deco.append((lx, cy - 3, LANTERN))
            deco.append((lx, cy + 3, LANTERN))

        # Stone lanterns at palace
        deco.append((16, 4, STONE_LAMP))
        deco.append((33, 4, STONE_LAMP))

        # Pine trees along edges
        for y in range(2, height - 2, 3):
            deco.append((1, y, PINE))
            deco.append((width - 2, y, PINE))

        # Fences
        deco.extend(make_fence_h(15, 4, 14))
        deco.extend(make_fence_h(15, 35, 45))

    elif region_id == "shanghai":
        # === SHANGHAI: Waterfront city — river on the right ===
        # River (right edge)
        water = make_water_area(40, 1, 9, height - 2)
        ground.extend(water)
        for y in range(1, height - 1):
            ground.append((39, y, SAND))

        # Main street (horizontal, center)
        for x in range(2, 38):
            ground.append((x, cy - 1, STONE_PATH))
            ground.append((x, cy, STONE_PATH))
            ground.append((x, cy + 1, STONE_PATH))

        # Vertical streets
        for vx in [10, 20, 30]:
            for y in range(3, height - 3):
                ground.append((vx, y, STONE_PATH))

        # Bridge to waterfront
        for y in range(cy - 1, cy + 2):
            for x in range(38, 45):
                ground.append((x, y, STONE_BRICK))
        deco.append((39, cy - 1, BRIDGE_L))
        deco.append((44, cy - 1, BRIDGE_R))

        # Buildings along main street
        for bx in [3, 13, 23, 33]:
            bg, dg = make_building(bx, 5, 5, "white")
            ground.extend(bg); deco.extend(dg)
        for bx in [3, 13, 23, 33]:
            bg, dg = make_building(bx, 26, 5, "red")
            ground.extend(bg); deco.extend(dg)

        # Willow trees along waterfront
        for y in range(3, height - 3, 3):
            deco.append((38, y, WILLOW))

        # Lanterns
        for lx in range(6, 36, 6):
            deco.append((lx, cy - 3, LANTERN))
            deco.append((lx, cy + 3, LANTERN))

        # Bamboo borders
        for y in range(2, height - 2, 3):
            deco.append((1, y, BAMBOO))

    elif region_id == "chengdu":
        # === CHENGDU: Organic tea gardens + bamboo ===
        import math
        # Winding main path
        for x in range(3, width - 3):
            offset = int(2 * math.sin(x * 0.25))
            for dy in [-1, 0, 1]:
                py = max(2, min(height - 3, cy + offset + dy))
                ground.append((x, py, STONE_PATH))

        # Cross paths
        for y in range(3, height - 3):
            ground.append((15, y, STONE_PATH))
            ground.append((35, y, STONE_PATH))

        # Tea houses (scattered)
        bg, dg = make_building(5, 4, 5, "white")
        ground.extend(bg); deco.extend(dg)
        bg, dg = make_building(22, 4, 5, "red")
        ground.extend(bg); deco.extend(dg)
        bg, dg = make_building(40, 6, 5, "white")
        ground.extend(bg); deco.extend(dg)
        bg, dg = make_building(5, 26, 5, "red")
        ground.extend(bg); deco.extend(dg)
        bg, dg = make_building(28, 28, 5, "white")
        ground.extend(bg); deco.extend(dg)
        bg, dg = make_building(42, 26, 5, "red")
        ground.extend(bg); deco.extend(dg)

        # Dense bamboo groves
        for bx, by, bw, bh in [(1, 3, 3, 8), (46, 3, 3, 8), (1, 28, 3, 10), (46, 28, 3, 10)]:
            for dy in range(bh):
                for dx in range(bw):
                    deco.append((bx + dx, by + dy, BAMBOO))

        # Cherry trees
        for pos in [(12, 10), (18, 12), (30, 10), (38, 12), (12, 32), (38, 32)]:
            deco.append(pos + (CHERRY,))

        # Stone lamps
        for pos in [(10, 8), (32, 8), (10, 30), (32, 30)]:
            deco.append(pos + (STONE_LAMP,))

        # Lanterns
        for lx in range(8, width - 8, 7):
            deco.append((lx, cy - 2, LANTERN))
            deco.append((lx, cy + 2, LANTERN))

    elif region_id == "guilin":
        # === GUILIN: River valley — river through the middle ===
        # Li River (horizontal, through center)
        water = make_water_area(1, cy - 3, width - 2, 6)
        ground.extend(water)
        for x in range(1, width - 1):
            ground.append((x, cy - 4, SAND))
            ground.append((x, cy + 3, SAND))

        # Bridges across river
        for bx in [15, 35]:
            for y in range(cy - 3, cy + 3):
                ground.append((bx, y, STONE_BRICK))
                ground.append((bx + 1, y, STONE_BRICK))
            deco.append((bx, cy - 3, BRIDGE_L))
            deco.append((bx + 1, cy - 3, BRIDGE_R))

        # North village paths
        for x in range(3, width - 3):
            ground.append((x, 8, STONE_PATH))
        for vx in [15, 35]:
            for y in range(2, cy - 4):
                ground.append((vx, y, STONE_PATH))

        # South paths
        for x in range(3, width - 3):
            ground.append((x, height - 8, STONE_PATH))
        for vx in [15, 35]:
            for y in range(cy + 4, height - 2):
                ground.append((vx, y, STONE_PATH))

        # North buildings
        bg, dg = make_building(5, 3, 5, "white")
        ground.extend(bg); deco.extend(dg)
        bg, dg = make_building(22, 3, 5, "white")
        ground.extend(bg); deco.extend(dg)
        bg, dg = make_building(40, 3, 5, "red")
        ground.extend(bg); deco.extend(dg)

        # South buildings
        bg, dg = make_building(5, height - 8, 5, "red")
        ground.extend(bg); deco.extend(dg)
        bg, dg = make_building(22, height - 8, 5, "white")
        ground.extend(bg); deco.extend(dg)
        bg, dg = make_building(40, height - 8, 5, "red")
        ground.extend(bg); deco.extend(dg)

        # Willow trees along river
        for x in range(3, width - 3, 4):
            if x not in (15, 16, 35, 36):
                deco.append((x, cy - 5, WILLOW))
                deco.append((x, cy + 4, WILLOW))

        # Pine trees (mountains)
        for y in range(2, cy - 5, 2):
            deco.append((1, y, PINE))
            deco.append((2, y, PINE))
            deco.append((width - 2, y, PINE))
            deco.append((width - 3, y, PINE))

        # Signs
        deco.append((14, 8, SIGN))
        deco.append((34, height - 8, SIGN))

    elif region_id == "xian":
        # === XI'AN: Walled grid city ===
        # Thick city walls on all sides
        for x in range(width):
            deco.append((x, 2, SWALL_H))
            deco.append((x, 3, SWALL_H))
            deco.append((x, height - 3, SWALL_H))
            deco.append((x, height - 4, SWALL_H))
        for y in range(2, height - 2):
            deco.append((2, y, GWALL_H))
            deco.append((3, y, GWALL_H))
            deco.append((width - 3, y, GWALL_H))
            deco.append((width - 4, y, GWALL_H))

        # Gate openings (N, S, E, W)
        gate_tiles = []
        for dx in [-1, 0, 1]:
            gate_tiles.extend([(cx+dx, 2), (cx+dx, 3), (cx+dx, height-3), (cx+dx, height-4)])
        for dy in [-1, 0, 1]:
            gate_tiles.extend([(2, cy+dy), (3, cy+dy), (width-3, cy+dy), (width-4, cy+dy)])
        deco = [d for d in deco if (d[0], d[1]) not in gate_tiles]

        # Grid streets (cross pattern)
        for x in range(5, width - 5):
            ground.append((x, cy - 1, STONE_PATH))
            ground.append((x, cy, STONE_PATH))
            ground.append((x, cy + 1, STONE_PATH))
        for y in range(5, height - 5):
            ground.append((cx - 1, y, STONE_PATH))
            ground.append((cx, y, STONE_PATH))
            ground.append((cx + 1, y, STONE_PATH))

        # Secondary streets
        for x in range(5, width - 5):
            ground.append((x, 10, STONE_PATH))
            ground.append((x, height - 10, STONE_PATH))
        for y in range(5, height - 5):
            ground.append((12, y, STONE_PATH))
            ground.append((width - 13, y, STONE_PATH))

        # Bell tower (center)
        bg, dg = make_building(cx - 4, cy - 6, 8, "red")
        ground.extend(bg); deco.extend(dg)

        # Quarter buildings
        for bx, by in [(6, 6), (6, 25), (35, 6), (35, 25)]:
            bg, dg = make_building(bx, by, 5, "white")
            ground.extend(bg); deco.extend(dg)
        for bx, by in [(15, 6), (15, 25), (28, 6), (28, 25)]:
            bg, dg = make_building(bx, by, 5, "red")
            ground.extend(bg); deco.extend(dg)

        # Stone lamps at intersections
        for pos in [(cx-3, 10), (cx+3, 10), (cx-3, height-10), (cx+3, height-10)]:
            deco.append(pos + (STONE_LAMP,))

        # Pine trees along walls
        for y in range(5, height - 5, 3):
            deco.append((4, y, PINE))
            deco.append((width - 5, y, PINE))

        # Lanterns
        for lx in range(8, width - 8, 5):
            deco.append((lx, cy - 3, LANTERN))
            deco.append((lx, cy + 3, LANTERN))

    # === Common: side border trees if not already placed ===
    existing_pos = {(t[0], t[1]) for t in deco}
    for y in range(3, height - 3, 4):
        if (0, y) not in existing_pos:
            deco.append((0, y, random.choice([CHERRY, PINE, BAMBOO])))
        if (width-1, y) not in existing_pos:
            deco.append((width-1, y, random.choice([CHERRY, PINE, BAMBOO])))

    # === Common: scatter some bushes in empty areas ===
    existing_pos = {(t[0], t[1]) for t in deco}
    for _ in range(12):
        bx = random.randint(2, width - 3)
        by = random.randint(4, height - 5)
        if (bx, by) not in existing_pos:
            deco.append((bx, by, random.choice([BUSH, FLOWER_BUSH])))
            existing_pos.add((bx, by))

    return ground, deco


def generate_scene(region_id):
    """Generate a complete .tscn file for a region."""
    config = REGIONS[region_id]
    width, height = 60, 45

    ground, deco = design_town_map(region_id, width, height)

    ground_data = format_tile_data(ground)
    deco_data = format_tile_data(deco)

    # NPC texture mapping
    tex_map = {
        "npc_guard": "9_npc_guard",
        "npc_merchant": "10_npc_merchant",
        "npc_student": "11_npc_student",
        "npc_vendor": "12_npc_vendor",
        "npc_elder": "13_npc_elder",
    }

    npc_blocks = []
    for npc in config["npcs"]:
        tex_id = tex_map[npc["tex"]]
        block = NPC_TEMPLATE.format(
            name=npc["name"],
            npc_id=npc["npc_id"],
            name_cn=npc["name_cn"],
            name_fr=npc["name_fr"],
            px=npc["px"],
            py=npc["py"],
            tex_id=tex_id,
            wander=npc["wander"],
        )
        npc_blocks.append(block)

    label_blocks = []
    for lname, ltext, lx, ly, lsize in config["labels"]:
        label_blocks.append(f"""
[node name="{lname}" type="Label" parent="."]
z_index = 10
position = Vector2({lx}, {ly})
text = "{ltext}"
theme_override_fonts/font = ExtResource("14_font")
theme_override_font_sizes/font_size = {lsize}
theme_override_colors/font_color = Color(1.0, 0.9, 0.6, 1.0)
theme_override_colors/font_shadow_color = Color(0, 0, 0, 0.9)
theme_override_colors/font_outline_color = Color(0.1, 0.05, 0.0, 0.9)
theme_override_constants/shadow_offset_x = 1
theme_override_constants/shadow_offset_y = 1
theme_override_constants/outline_size = 2""")

    exit_text, exit_x, exit_y = config["exit_label"]
    label_blocks.append(f"""
[node name="ExitZoneLabel" type="Label" parent="."]
z_index = 10
position = Vector2({exit_x}, {exit_y})
text = "{exit_text}"
theme_override_fonts/font = ExtResource("14_font")
theme_override_font_sizes/font_size = 8
theme_override_colors/font_color = Color(0.9, 0.95, 1.0, 0.9)
theme_override_colors/font_shadow_color = Color(0, 0, 0, 0.8)
theme_override_colors/font_outline_color = Color(0.1, 0.05, 0.0, 0.8)
theme_override_constants/shadow_offset_x = 1
theme_override_constants/shadow_offset_y = 1
theme_override_constants/outline_size = 1""")

    spawn_x, spawn_y = config["spawn"]

    scene = f"""[gd_scene load_steps=20 format=3 uid="{config['uid']}"]

[ext_resource type="Script" path="res://scripts/RegionMap.gd" id="1_regionmap"]
[ext_resource type="Script" path="res://scripts/NPC.gd" id="2_npc"]
[ext_resource type="Script" path="res://scripts/QuestNPC.gd" id="3_questnpc"]
[ext_resource type="PackedScene" path="res://scenes/ui/hud.tscn" id="4_hud"]
[ext_resource type="PackedScene" path="res://scenes/ui/dialogue_box.tscn" id="5_dialogue"]
[ext_resource type="PackedScene" path="res://scenes/ui/vocab_notebook.tscn" id="6_notebook"]
[ext_resource type="PackedScene" path="res://scenes/ui/quiz.tscn" id="7_quiz"]
[ext_resource type="Texture2D" path="res://assets/tilesets/town_tilemap_packed.png" id="8_town_tilemap"]
[ext_resource type="Texture2D" path="res://assets/characters/npc_guard.png" id="9_npc_guard"]
[ext_resource type="Texture2D" path="res://assets/characters/npc_merchant.png" id="10_npc_merchant"]
[ext_resource type="Texture2D" path="res://assets/characters/npc_student.png" id="11_npc_student"]
[ext_resource type="Texture2D" path="res://assets/characters/npc_vendor.png" id="12_npc_vendor"]
[ext_resource type="Texture2D" path="res://assets/characters/npc_elder.png" id="13_npc_elder"]
[ext_resource type="FontFile" path="res://assets/fonts/NotoSansSC-Bold.otf" id="14_font"]

[sub_resource type="TileSetAtlasSource" id="TileSetAtlasSource_1"]
texture = ExtResource("8_town_tilemap")
texture_region_size = Vector2i(16, 16)
"""

    # Register all tiles in the atlas (12 cols x 11 rows)
    # Tiles with collision (buildings, trees, water, fences, props)
    blocking_tiles = set()
    # Row 2-3: Trees
    for c in range(12):
        blocking_tiles.add((c, 2))
        blocking_tiles.add((c, 3))
    # Row 4: Roofs
    for c in range(12):
        blocking_tiles.add((c, 4))
    # Row 5-6: Walls (except doors at col 2 and 7)
    for c in range(12):
        if c not in (2, 7):
            blocking_tiles.add((c, 5))
            blocking_tiles.add((c, 6))
    # Row 7-8: Fences
    for c in range(12):
        blocking_tiles.add((c, 7))
        blocking_tiles.add((c, 8))
    # Row 9-10: Props (most are blocking)
    for c in range(12):
        blocking_tiles.add((c, 9))
        blocking_tiles.add((c, 10))
    # Water tiles block too
    blocking_tiles.add((6, 0))
    blocking_tiles.add((7, 0))
    blocking_tiles.add((6, 1))
    blocking_tiles.add((7, 1))

    FULL_COLLISION = "PackedVector2Array(-8, -8, 8, -8, 8, 8, -8, 8)"
    atlas_entries = []
    for row in range(11):
        for col in range(12):
            atlas_entries.append(f"{col}:{row}/0 = 0")
            if (col, row) in blocking_tiles:
                atlas_entries.append(f"{col}:{row}/0/physics_layer_0/polygon_0/points = {FULL_COLLISION}")
    scene += "\n".join(atlas_entries) + "\n"

    scene += f"""
[sub_resource type="TileSet" id="TileSet_1"]
tile_size = Vector2i(16, 16)
physics_layer_0/collision_layer = 1
physics_layer_0/collision_mask = 1
sources/0 = SubResource("TileSetAtlasSource_1")

[sub_resource type="CapsuleShape2D" id="CapsuleShape2D_npc"]
radius = 6.0
height = 16.0

[sub_resource type="CircleShape2D" id="CircleShape2D_interact"]
radius = 32.0

[sub_resource type="RectangleShape2D" id="RectangleShape2D_exit"]
size = Vector2(32.0, 64.0)

[node name="{config['name']}" type="Node2D"]
script = ExtResource("1_regionmap")
region_id = "{config['region_id']}"
first_visit_cutscene_npc = "{config['cutscene_npc']}"

[node name="TileMap" type="TileMap" parent="."]
texture_filter = 0
tile_set = SubResource("TileSet_1")
format = 2
layer_0/name = "Ground"
layer_0/tile_data = {ground_data}
layer_1/name = "Decorations"
layer_1/enabled = true
layer_1/tile_data = {deco_data}
"""

    # Add labels
    scene += "\n".join(label_blocks) + "\n"

    # Add NPCs container and NPCs
    scene += "\n[node name=\"NPCs\" type=\"Node2D\" parent=\".\"]\n"
    scene += "\n".join(npc_blocks) + "\n"

    # Add objects, exit triggers, player spawn, HUD
    scene += f"""
[node name="Objects" type="Node2D" parent="."]

[node name="ExitTriggers" type="Node2D" parent="."]

[node name="ExitToWorldMap" type="Area2D" parent="ExitTriggers"]
position = Vector2(16, {height * 16 - 48})

[node name="CollisionShape2D" type="CollisionShape2D" parent="ExitTriggers/ExitToWorldMap"]
shape = SubResource("RectangleShape2D_exit")

[node name="PlayerSpawn" type="Marker2D" parent="."]
position = Vector2({spawn_x}, {spawn_y})

[node name="HUD" type="CanvasLayer" parent="."]

[node name="HUDScene" parent="HUD"]
instance = ExtResource("4_hud")

[node name="DialogueBoxScene" parent="HUD"]
instance = ExtResource("5_dialogue")

[node name="CutscenePlayer" type="AnimationPlayer" parent="."]
"""

    return scene


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    scenes_dir = os.path.join(script_dir, "..", "scenes", "regions")

    for region_id in REGIONS:
        scene_content = generate_scene(region_id)
        output_path = os.path.join(scenes_dir, f"{region_id}.tscn")
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(scene_content)
        print(f"Generated: {output_path}")

    print(f"\nAll {len(REGIONS)} region scenes generated!")


if __name__ == "__main__":
    main()
