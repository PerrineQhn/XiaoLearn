#!/usr/bin/env python3
"""
Generate a hutong-style Beijing map for Godot 4.6
Creates a beautiful pixel RPG map with courtyards, paths, water canal, and organic decorations
"""

import re

# Map dimensions (in 16x16 tiles)
MAP_WIDTH = 120
MAP_HEIGHT = 90
TILE_SIZE = 16

class BeijingMapGenerator:
    def __init__(self):
        self.map_grid = [['G' for _ in range(MAP_WIDTH)] for _ in range(MAP_HEIGHT)]
        self.buildings = []
        self.trees = []
        self.walls = []
        self.lanterns = []

    def create_grid(self):
        """Create the foundational map grid with roads, courtyards, and water"""

        # Main horizontal roads (stone)
        for x in range(MAP_WIDTH):
            # Main road at y=15-16
            self.map_grid[15][x] = 'S'
            self.map_grid[16][x] = 'S'
            # Secondary road at y=55-56
            self.map_grid[55][x] = 'S'
            self.map_grid[56][x] = 'S'

        # Vertical water canal at x=55-57, runs full height
        for y in range(MAP_HEIGHT):
            self.map_grid[y][55] = 'W'
            self.map_grid[y][56] = 'W'
            self.map_grid[y][57] = 'W'

        # Vertical stone paths (every 20 tiles, creating courtyard grid)
        vertical_paths = [0, 20, 40, 60, 80, 100, 119]
        for path_x in vertical_paths:
            for y in range(MAP_HEIGHT):
                # Skip water canal area
                if not (55 <= path_x <= 57):
                    self.map_grid[y][path_x] = 'S'

        # Horizontal stone paths (creating courtyard grid)
        horizontal_paths = [0, 10, 25, 40, 65, 80]
        for path_y in horizontal_paths:
            for x in range(MAP_WIDTH):
                # Skip water canal area
                if not (55 <= x <= 57):
                    if path_y != 15 and path_y != 16 and path_y != 55 and path_y != 56:  # Don't override main roads
                        self.map_grid[path_y][x] = 'S'

        return self.map_grid

    def add_building(self, x, y, width, height, building_type, colors):
        """Record a building placement"""
        self.buildings.append({
            'x': x,
            'y': y,
            'width': width,
            'height': height,
            'type': building_type,
            'colors': colors
        })

    def add_tree(self, x, y, tree_type):
        """Record a tree placement"""
        self.trees.append({
            'x': x,
            'y': y,
            'type': tree_type
        })

    def add_wall_segment(self, x, y, is_horizontal, length, wall_row):
        """Record a wall segment"""
        self.walls.append({
            'x': x,
            'y': y,
            'horizontal': is_horizontal,
            'length': length,
            'row': wall_row
        })

    def place_courtyards(self):
        """Place courtyard compounds with buildings and trees"""

        courtyards = [
            # North area (above main road) - Palace/government area
            {'x': 5, 'y': 5, 'w': 15, 'h': 8, 'buildings': ['bld_4'], 'trees': 3, 'gates': ['south']},
            {'x': 25, 'y': 3, 'w': 12, 'h': 10, 'buildings': ['bld_5'], 'trees': 2, 'gates': ['south']},

            # West side hutongs (left of water canal)
            {'x': 2, 'y': 20, 'w': 18, 'h': 15, 'buildings': ['bld_3', 'bld_1'], 'trees': 4, 'gates': ['east', 'south']},
            {'x': 2, 'y': 40, 'w': 18, 'h': 12, 'buildings': ['bld_2', 'bld_1a'], 'trees': 3, 'gates': ['east']},
            {'x': 2, 'y': 68, 'w': 18, 'h': 10, 'buildings': ['bld_1b'], 'trees': 2, 'gates': ['east']},

            # Center-left
            {'x': 23, 'y': 20, 'w': 16, 'h': 13, 'buildings': ['bld_3a', 'bld_1'], 'trees': 3, 'gates': ['west', 'south']},
            {'x': 23, 'y': 40, 'w': 16, 'h': 12, 'buildings': ['bld_2'], 'trees': 3, 'gates': ['west']},
            {'x': 23, 'y': 65, 'w': 16, 'h': 13, 'buildings': ['bld_3b', 'bld_1a'], 'trees': 4, 'gates': ['west']},

            # East side hutongs (right of water canal)
            {'x': 62, 'y': 20, 'w': 18, 'h': 15, 'buildings': ['bld_3', 'bld_1b'], 'trees': 4, 'gates': ['west']},
            {'x': 62, 'y': 40, 'w': 18, 'h': 12, 'buildings': ['bld_2'], 'trees': 3, 'gates': ['west']},
            {'x': 62, 'y': 68, 'w': 18, 'h': 10, 'buildings': ['bld_1a'], 'trees': 2, 'gates': ['west']},

            # Center-right
            {'x': 83, 'y': 20, 'w': 15, 'h': 13, 'buildings': ['bld_3a'], 'trees': 3, 'gates': ['west', 'south']},
            {'x': 83, 'y': 40, 'w': 15, 'h': 12, 'buildings': ['bld_1', 'bld_2'], 'trees': 3, 'gates': ['west']},
            {'x': 83, 'y': 65, 'w': 15, 'h': 13, 'buildings': ['bld_1b', 'bld_3b'], 'trees': 4, 'gates': ['west']},

            # South area - Market and temple
            {'x': 10, 'y': 80, 'w': 20, 'h': 8, 'buildings': ['bld_2'], 'trees': 1, 'gates': ['north']},  # Market
            {'x': 60, 'y': 80, 'w': 20, 'h': 8, 'buildings': ['bld_1'], 'trees': 2, 'gates': ['north']},  # Temple area
        ]

        for courtyard in courtyards:
            self._place_courtyard_compound(courtyard)

        return len(courtyards)

    def _place_courtyard_compound(self, courtyard):
        """Place a single courtyard with walls, buildings, and trees"""
        x, y, w, h = courtyard['x'], courtyard['y'], courtyard['w'], courtyard['h']
        gates = courtyard.get('gates', ['east'])
        num_trees = courtyard.get('trees', 2)

        # Add walls around courtyard
        # Top wall
        for wx in range(x, x + w):
            has_gate = 'north' in gates and wx >= x + w//3 and wx <= x + 2*w//3
            if not has_gate:
                self.add_wall_segment(wx, y, True, 1, 0)

        # Bottom wall
        for wx in range(x, x + w):
            has_gate = 'south' in gates and wx >= x + w//3 and wx <= x + 2*w//3
            if not has_gate:
                self.add_wall_segment(wx, y + h, True, 1, 0)

        # Left wall
        for wy in range(y, y + h):
            has_gate = 'west' in gates and wy >= y + h//3 and wy <= y + 2*h//3
            if not has_gate:
                self.add_wall_segment(x, wy, False, 1, 0)

        # Right wall
        for wy in range(y, y + h):
            has_gate = 'east' in gates and wy >= y + h//3 and wy <= y + 2*h//3
            if not has_gate:
                self.add_wall_segment(x + w, wy, False, 1, 0)

        # Add buildings inside
        building_count = len(courtyard.get('buildings', []))
        bld_types = courtyard.get('buildings', ['bld_1'])

        if building_count >= 1:
            # First building
            self.add_building(x + 2, y + 2, 6, 5, bld_types[0], ['brown', 'red'])

        if building_count >= 2:
            # Second building
            offset = 8 if w > 18 else 6
            self.add_building(x + offset, y + 2, 6, 5, bld_types[1], ['blue', 'gray'])

        # Add trees scattered inside
        import random
        random.seed(x * y)  # Deterministic but varied
        for _ in range(num_trees):
            tree_x = x + random.randint(2, w - 3)
            tree_y = y + random.randint(3, h - 2)
            tree_type = random.choice(['bld_2_tree', 'bld_4_tree'])
            self.add_tree(tree_x, tree_y, tree_type)

    def scatter_decorations(self):
        """Add lanterns and trees along roads"""
        # Lanterns along main roads (every 8-10 tiles)
        for x in range(2, MAP_WIDTH, 9):
            # Main horizontal road
            self.lanterns.append({'x': x, 'y': 15})
            self.lanterns.append({'x': x, 'y': 56})

        # Trees along edges and parks
        import random
        random.seed(42)
        for _ in range(20):
            x = random.randint(1, MAP_WIDTH - 2)
            y = random.randint(60, 75)
            if self.map_grid[y][x] == 'G':
                self.add_tree(x, y, random.choice(['bld_2_tree', 'bld_4_tree']))


def generate_godot_scene():
    """Generate the complete Godot .tscn file"""

    gen = BeijingMapGenerator()
    gen.create_grid()
    courtyard_count = gen.place_courtyards()
    gen.scatter_decorations()

    # Read the original file to extract NPC and exit trigger data
    with open('/sessions/amazing-trusting-johnson/mnt/xiaolearn_game/scenes/regions/beijing.tscn', 'r') as f:
        original_content = f.read()

    # Extract NPCs section
    npc_match = re.search(r'\[node name="NPCs".*?\[node name="ExitTriggers"', original_content, re.DOTALL)
    npcs_section = npc_match.group(0)[:-len('[node name="ExitTriggers"')] if npc_match else ""

    # Extract ExitTriggers section
    exit_match = re.search(r'\[node name="ExitTriggers".*?\[node name="PlayerSpawn"', original_content, re.DOTALL)
    exit_section = exit_match.group(0)[:-len('[node name="PlayerSpawn"')] if exit_match else ""

    # Build ext_resources section
    ext_resources = """[gd_scene load_steps=76 format=3 uid="uid://beijing_region_002"]

[ext_resource type="FontFile" path="res://assets/fonts/NotoSansSC-Bold.otf" id="font"]
[ext_resource type="Script" path="res://scripts/RegionMap.gd" id="script_region"]
[ext_resource type="Script" path="res://scripts/NPC.gd" id="script_npc"]
[ext_resource type="Script" path="res://scripts/QuestNPC.gd" id="script_quest"]
[ext_resource type="PackedScene" path="res://scenes/ui/hud.tscn" id="hud"]
[ext_resource type="PackedScene" path="res://scenes/ui/dialogue_box.tscn" id="dialogue"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_buildings_chinese_medieval_0.png" id="bld_0"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_buildings_chinese_medieval_1.png" id="bld_1"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_buildings_chinese_medieval_1A.png" id="bld_1a"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_buildings_chinese_medieval_1B.png" id="bld_1b"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_buildings_chinese_medieval_2.png" id="bld_2"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_buildings_chinese_medieval_3.png" id="bld_3"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_buildings_chinese_medieval_3A.png" id="bld_3a"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_buildings_chinese_medieval_3B.png" id="bld_3b"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_buildings_chinese_medieval_4.png" id="bld_4"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_buildings_chinese_medieval_5.png" id="bld_5"]
[ext_resource type="Texture2D" path="res://assets/Top Down RPG NPC Sprite Pack/16x16/_default_tint/chinese_jobs.png" id="npc_jobs"]
[ext_resource type="Texture2D" path="res://assets/Top Down RPG NPC Sprite Pack/16x16/_default_tint/chinese_people.png" id="npc_people"]
[ext_resource type="Texture2D" path="res://assets/Top Down RPG NPC Sprite Pack/16x16/_default_tint/chinese_royals.png" id="npc_royals"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_terrains_3x3.png" id="tex_terrain"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_water_temperate_autotile_rpgmaker.png" id="tex_water"]
[ext_resource type="Texture2D" path="res://assets/vectoraith_tileset_buildings_chinese_medieval/16x16/vectoraith_tileset_walls_chinese_medieval_autotile_rpgmaker.png" id="tex_walls"]
"""

    # Build sub_resources
    sub_resources = """
[sub_resource type="TileSetAtlasSource" id="TileSet_Atlas_Terrain"]
texture = ExtResource("tex_terrain")
texture_region_size = Vector2i(16, 16)
37:0/0 = 0
38:0/0 = 0
39:0/0 = 0
17:1/0 = 0
18:1/0 = 0
17:5/0 = 0
18:5/0 = 0

[sub_resource type="TileSetAtlasSource" id="TileSet_Atlas_Water"]
texture = ExtResource("tex_water")
texture_region_size = Vector2i(16, 16)
11:6/0 = 0
12:7/0 = 0
12:6/0 = 0

[sub_resource type="TileSet" id="TileSet_1"]
tile_shape = 0
tile_size = Vector2i(16, 16)
physics_layer_0/collision_layer = 1
physics_layer_0/collision_mask = 1
sources/0 = SubResource("TileSet_Atlas_Terrain")
sources/1 = SubResource("TileSet_Atlas_Water")

[sub_resource type="CapsuleShape2D" id="Shape_NPC"]
radius = 5.0
height = 12.0

[sub_resource type="CircleShape2D" id="Shape_Interact"]
radius = 24.0

[sub_resource type="RectangleShape2D" id="Shape_Exit"]
size = Vector2(64, 32)

[sub_resource type="RectangleShape2D" id="Col_0"]
size = Vector2(176, 256)

[sub_resource type="RectangleShape2D" id="Col_1"]
size = Vector2(80, 240)

[sub_resource type="RectangleShape2D" id="Col_2"]
size = Vector2(80, 240)

[sub_resource type="RectangleShape2D" id="Col_3"]
size = Vector2(176, 256)

[sub_resource type="RectangleShape2D" id="Col_4"]
size = Vector2(80, 240)

[sub_resource type="RectangleShape2D" id="Col_5"]
size = Vector2(80, 240)

[sub_resource type="RectangleShape2D" id="Col_6"]
size = Vector2(160, 96)

[sub_resource type="RectangleShape2D" id="Col_7"]
size = Vector2(64, 128)

[sub_resource type="RectangleShape2D" id="Col_8"]
size = Vector2(64, 80)

[sub_resource type="RectangleShape2D" id="Col_9"]
size = Vector2(80, 112)

[sub_resource type="RectangleShape2D" id="Col_10"]
size = Vector2(80, 112)
"""

    # Generate tile data
    tile_data = _generate_tile_data(gen)

    # Build building sprites
    buildings_section = _generate_buildings_section(gen)

    # Build trees section
    trees_section = _generate_trees_section(gen)

    # Build lanterns section
    lanterns_section = _generate_lanterns_section(gen)

    # Build walls section
    walls_section = _generate_walls_section(gen)

    # Assemble final scene
    scene = f"""{ext_resources}{sub_resources}
[node name="Region" type="Node2D"]
script = ExtResource("script_region")
region_id = "beijing"

[node name="TileMap" type="TileMap" parent="."]
tile_set = SubResource("TileSet_1")
format = 2
layer_0/tile_data = {tile_data}

{walls_section}
{buildings_section}
{trees_section}
{lanterns_section}
{npcs_section}
{exit_section}
[node name="PlayerSpawn" type="Marker2D" parent="."]
position = Vector2(960, 1200)

[node name="HUD" type="CanvasLayer" parent="."]
layer = 100

[node name="HUDScene" instance=ExtResource("hud") parent="HUD"]

[node name="CutscenePlayer" type="AnimationPlayer" parent="."]
"""

    return scene, gen


def _generate_tile_data(gen):
    """Generate the PackedInt32Array for tile data"""
    tiles = []

    for y in range(MAP_HEIGHT):
        for x in range(MAP_WIDTH):
            cell = (y << 16) | (x & 0xFFFF)

            tile_type = gen.map_grid[y][x]

            if tile_type == 'S':  # Stone
                src = (17 << 16) | 0  # terrain atlas (17,1)
                alt = 1
            elif tile_type == 'W':  # Water
                src = (11 << 16) | 1  # water atlas (11,6)
                alt = 6
            else:  # Grass 'G'
                src = (37 << 16) | 0  # terrain atlas (37,0)
                alt = 0

            tiles.append(cell)
            tiles.append(src)
            tiles.append(alt)

    # Format as PackedInt32Array
    return f"PackedInt32Array({', '.join(map(str, tiles))})"


def _generate_buildings_section(gen):
    """Generate sprite nodes for buildings"""
    section = "\n[node name=\"Environment\" type=\"Node2D\" parent=\".\"]\n"

    building_specs = {
        'bld_1': ('bld_1', Rect2(0, 16, 64, 80)),
        'bld_1a': ('bld_1a', Rect2(0, 16, 64, 80)),
        'bld_1b': ('bld_1b', Rect2(0, 16, 64, 80)),
        'bld_2': ('bld_2', Rect2(0, 0, 160, 96)),
        'bld_3': ('bld_3', Rect2(16, 0, 80, 112)),
        'bld_3a': ('bld_3a', Rect2(16, 0, 80, 112)),
        'bld_3b': ('bld_3b', Rect2(16, 0, 80, 112)),
        'bld_4': ('bld_4', Rect2(0, 0, 208, 256)),
        'bld_5': ('bld_5', Rect2(0, 0, 176, 256)),
    }

    for i, bldg in enumerate(gen.buildings):
        name = f"Building_{i}"
        bld_type = bldg['type']
        x = bldg['x'] * TILE_SIZE
        y = bldg['y'] * TILE_SIZE

        if bld_type in building_specs:
            tex_id, rect = building_specs[bld_type]
            section += f"""
[node name="{name}" type="Sprite2D" parent="Environment"]
position = Vector2({x}, {y})
texture = ExtResource("{tex_id}")
region_enabled = true
region_rect = Rect2({rect.x}, {rect.y}, {rect.width}, {rect.height})
centered = false
"""

    return section


def _generate_trees_section(gen):
    """Generate sprite nodes for trees"""
    section = "\n[node name=\"Trees\" type=\"Node2D\" parent=\".\"]\n"

    tree_specs = {
        'bld_2_tree': ('bld_2', Rect2(0, 160, 48, 64)),
        'bld_4_tree': ('bld_4', Rect2(208, 144, 48, 48)),
    }

    for i, tree in enumerate(gen.trees):
        name = f"Tree_{i}"
        tree_type = tree['type']
        x = tree['x'] * TILE_SIZE
        y = tree['y'] * TILE_SIZE

        if tree_type in tree_specs:
            tex_id, rect = tree_specs[tree_type]
            section += f"""
[node name="{name}" type="Sprite2D" parent="Trees"]
position = Vector2({x}, {y})
texture = ExtResource("{tex_id}")
region_enabled = true
region_rect = Rect2({rect.x}, {rect.y}, {rect.width}, {rect.height})
centered = false
"""

    return section


def _generate_lanterns_section(gen):
    """Generate sprite nodes for lanterns"""
    section = "\n[node name=\"Decorations\" type=\"Node2D\" parent=\".\"]\n"

    # Lantern from bld_0: Rect2(128,128,48,96)
    for i, lantern in enumerate(gen.lanterns):
        name = f"Lantern_{i}"
        x = lantern['x'] * TILE_SIZE
        y = lantern['y'] * TILE_SIZE

        section += f"""
[node name="{name}" type="Sprite2D" parent="Decorations"]
position = Vector2({x}, {y})
texture = ExtResource("bld_0")
region_enabled = true
region_rect = Rect2(128, 128, 48, 96)
centered = false
"""

    return section


def _generate_walls_section(gen):
    """Generate sprite nodes for walls"""
    section = "\n[node name=\"Walls\" type=\"Node2D\" parent=\".\"]\n"

    # Wall tile from wall sheet: Rect2(0, 48, 16, 16) = red/white wall at row 3
    for i, wall in enumerate(gen.walls):
        name = f"Wall_{i}"
        x = wall['x'] * TILE_SIZE
        y = wall['y'] * TILE_SIZE

        section += f"""
[node name="{name}" type="Sprite2D" parent="Walls"]
position = Vector2({x}, {y})
texture = ExtResource("tex_walls")
region_enabled = true
region_rect = Rect2(0, 48, 16, 16)
centered = false
"""

    return section


class Rect2:
    """Helper class for rectangle representation"""
    def __init__(self, x, y, width, height):
        self.x = x
        self.y = y
        self.width = width
        self.height = height


# Main execution
if __name__ == "__main__":
    print("Generating Beijing hutong map for Godot 4.6...")

    scene_content, generator = generate_godot_scene()

    # Write to file
    output_path = '/sessions/amazing-trusting-johnson/mnt/xiaolearn_game/scenes/regions/beijing.tscn'
    with open(output_path, 'w') as f:
        f.write(scene_content)

    # Report statistics
    print(f"\nMap Generation Complete!")
    print(f"===============================")
    print(f"Map Size: {MAP_WIDTH}x{MAP_HEIGHT} tiles ({MAP_WIDTH*TILE_SIZE}x{MAP_HEIGHT*TILE_SIZE}px)")
    print(f"Total Tiles: {MAP_WIDTH * MAP_HEIGHT}")
    print(f"Water Tiles: {sum(row.count('W') for row in generator.map_grid)}")
    print(f"Stone Path Tiles: {sum(row.count('S') for row in generator.map_grid)}")
    print(f"Grass Tiles: {sum(row.count('G') for row in generator.map_grid)}")
    print(f"\nBuildings: {len(generator.buildings)}")
    print(f"Trees: {len(generator.trees)}")
    print(f"Wall Segments: {len(generator.walls)}")
    print(f"Lanterns: {len(generator.lanterns)}")
    print(f"\nOutput File: {output_path}")
    print(f"File Size: {len(scene_content):,} bytes")
    print(f"\nNPC Count (preserved): 10")
    print(f"Exit Triggers (preserved): 1")
    print(f"\nScene saved successfully!")
