#!/usr/bin/env python3
"""Generate Asian-style 16x16 pixel art tileset for XiaoLearn Game.

Output: town_tilemap_packed.png (192x176) and town_tilemap.png
Grid: 12 columns x 11 rows, each tile 16x16 pixels.

Layout:
  Row 0-1: Ground (grass, stone path, dirt, water, sand)
  Row 2-3: Trees (cherry blossom, pine, bamboo, willow)
  Row 4-6: Buildings (Chinese roofs, walls, doors, windows, pagoda)
  Row 7-8: Fences and walls (bamboo fence, garden wall)
  Row 9-10: Props (lanterns, signs, pots, bridge)
"""

from PIL import Image, ImageDraw
import random
import os

TILE = 16
COLS = 12
ROWS = 11
W = COLS * TILE  # 192
H = ROWS * TILE  # 176

# --- Asian Color Palette ---
TRANSPARENT = (0, 0, 0, 0)

# Greens
GRASS_LIGHT = (134, 172, 102)
GRASS_MID = (108, 148, 82)
GRASS_DARK = (82, 124, 62)
GRASS_ACCENT = (120, 160, 90)

# Path / Stone
STONE_LIGHT = (192, 184, 168)
STONE_MID = (168, 160, 148)
STONE_DARK = (140, 132, 120)
STONE_LINE = (120, 112, 100)

# Dirt
DIRT_LIGHT = (196, 172, 136)
DIRT_MID = (176, 152, 116)
DIRT_DARK = (156, 132, 96)

# Water
WATER_LIGHT = (120, 180, 210)
WATER_MID = (80, 148, 188)
WATER_DARK = (56, 120, 164)
WATER_SHINE = (160, 210, 230)

# Sand
SAND_LIGHT = (230, 216, 180)
SAND_MID = (210, 196, 160)
SAND_DARK = (190, 176, 140)

# Chinese Red
RED_BRIGHT = (196, 30, 58)
RED_MID = (164, 24, 48)
RED_DARK = (120, 16, 32)
RED_ROOF = (180, 36, 52)

# Gold
GOLD_BRIGHT = (255, 215, 0)
GOLD_MID = (218, 165, 32)
GOLD_DARK = (178, 134, 16)

# Wood
WOOD_LIGHT = (156, 108, 68)
WOOD_MID = (128, 84, 52)
WOOD_DARK = (96, 64, 36)
WOOD_VERY_DARK = (72, 48, 28)

# Trees
PINE_DARK = (36, 72, 32)
PINE_MID = (52, 96, 44)
PINE_LIGHT = (68, 116, 56)
TRUNK_BROWN = (96, 64, 40)
TRUNK_DARK = (72, 48, 28)

SAKURA_PINK = (255, 183, 197)
SAKURA_LIGHT = (255, 210, 220)
SAKURA_DARK = (220, 140, 160)
SAKURA_PETAL = (255, 192, 203)

BAMBOO_GREEN = (74, 124, 89)
BAMBOO_LIGHT = (100, 152, 108)
BAMBOO_DARK = (52, 96, 64)
BAMBOO_STEM = (88, 140, 96)

WILLOW_GREEN = (108, 156, 88)
WILLOW_LIGHT = (132, 176, 108)
WILLOW_DARK = (84, 132, 68)

# Walls
WALL_WHITE = (245, 240, 232)
WALL_CREAM = (232, 224, 208)
WALL_SHADOW = (200, 192, 176)

# Roof tiles (grey-blue)
ROOF_GREY = (108, 116, 128)
ROOF_DARK = (80, 88, 100)
ROOF_LIGHT = (136, 144, 156)

# Lantern
LANTERN_RED = (200, 40, 56)
LANTERN_GOLD = (240, 200, 60)
LANTERN_DARK = (160, 28, 40)

# Bridge
BRIDGE_WOOD = (148, 100, 64)
BRIDGE_DARK = (108, 72, 44)


def px(draw, x, y, color):
    """Draw a single pixel."""
    draw.point((x, y), fill=color)


def fill_tile(draw, col, row, color):
    """Fill an entire 16x16 tile with a color."""
    x0 = col * TILE
    y0 = row * TILE
    draw.rectangle([x0, y0, x0 + TILE - 1, y0 + TILE - 1], fill=color)


def draw_rect(draw, col, row, rx, ry, rw, rh, color):
    """Draw a rectangle within a tile."""
    x0 = col * TILE + rx
    y0 = row * TILE + ry
    draw.rectangle([x0, y0, x0 + rw - 1, y0 + rh - 1], fill=color)


# =====================================================
# GROUND TILES (Rows 0-1)
# =====================================================

def draw_grass_base(draw, col, row):
    """Soft grass with subtle texture."""
    fill_tile(draw, col, row, GRASS_MID)
    x0, y0 = col * TILE, row * TILE
    random.seed(col * 100 + row)
    for _ in range(12):
        gx = random.randint(0, 15)
        gy = random.randint(0, 15)
        c = random.choice([GRASS_LIGHT, GRASS_DARK, GRASS_ACCENT])
        px(draw, x0 + gx, y0 + gy, c)
    # A few blade highlights
    for _ in range(4):
        gx = random.randint(1, 14)
        gy = random.randint(1, 14)
        px(draw, x0 + gx, y0 + gy, GRASS_LIGHT)
        px(draw, x0 + gx, y0 + gy - 1, GRASS_LIGHT)


def draw_grass_variant(draw, col, row, seed_offset=0):
    """Grass variant with different seed."""
    fill_tile(draw, col, row, GRASS_MID)
    x0, y0 = col * TILE, row * TILE
    random.seed(col * 100 + row + seed_offset + 42)
    for _ in range(15):
        gx = random.randint(0, 15)
        gy = random.randint(0, 15)
        c = random.choice([GRASS_LIGHT, GRASS_DARK, GRASS_ACCENT, GRASS_MID])
        px(draw, x0 + gx, y0 + gy, c)


def draw_stone_path(draw, col, row):
    """Chinese garden stone path."""
    fill_tile(draw, col, row, STONE_MID)
    x0, y0 = col * TILE, row * TILE
    # Stone pattern - irregular rectangles
    draw.rectangle([x0, y0, x0 + 6, y0 + 6], fill=STONE_LIGHT)
    draw.rectangle([x0 + 8, y0, x0 + 15, y0 + 5], fill=STONE_LIGHT)
    draw.rectangle([x0, y0 + 8, x0 + 7, y0 + 15], fill=STONE_LIGHT)
    draw.rectangle([x0 + 9, y0 + 7, x0 + 15, y0 + 15], fill=STONE_LIGHT)
    # Gaps between stones
    for i in range(16):
        px(draw, x0 + i, y0 + 7, STONE_DARK)
        px(draw, x0 + 7, y0 + i, STONE_DARK)
    # Subtle cracks
    px(draw, x0 + 3, y0 + 3, STONE_DARK)
    px(draw, x0 + 12, y0 + 11, STONE_DARK)


def draw_stone_path_h(draw, col, row):
    """Horizontal stone path."""
    fill_tile(draw, col, row, STONE_MID)
    x0, y0 = col * TILE, row * TILE
    # Horizontal brick pattern
    for r in range(4):
        ry = r * 4
        offset = 4 if r % 2 else 0
        for c_i in range(3):
            cx = c_i * 6 + offset - 2
            if cx < 0:
                cx = 0
            draw.rectangle([x0 + max(0, cx), y0 + ry, x0 + min(15, cx + 4), y0 + ry + 2], fill=STONE_LIGHT)
        # Mortar lines
        draw.line([x0, y0 + ry + 3, x0 + 15, y0 + ry + 3], fill=STONE_DARK)


def draw_dirt_tile(draw, col, row):
    """Earthy dirt ground."""
    fill_tile(draw, col, row, DIRT_MID)
    x0, y0 = col * TILE, row * TILE
    random.seed(col * 200 + row)
    for _ in range(18):
        gx = random.randint(0, 15)
        gy = random.randint(0, 15)
        c = random.choice([DIRT_LIGHT, DIRT_DARK, DIRT_MID])
        px(draw, x0 + gx, y0 + gy, c)


def draw_water_tile(draw, col, row, variant=0):
    """Calm water with subtle ripples."""
    fill_tile(draw, col, row, WATER_MID)
    x0, y0 = col * TILE, row * TILE
    random.seed(col * 300 + row + variant)
    # Gentle ripple highlights
    for _ in range(6):
        rx = random.randint(1, 14)
        ry = random.randint(1, 14)
        length = random.randint(2, 4)
        for i in range(length):
            if rx + i < 16:
                px(draw, x0 + rx + i, y0 + ry, WATER_LIGHT)
    # Dark undertones
    for _ in range(4):
        rx = random.randint(0, 15)
        ry = random.randint(0, 15)
        px(draw, x0 + rx, y0 + ry, WATER_DARK)
    # Shine spots
    for _ in range(2):
        rx = random.randint(2, 13)
        ry = random.randint(2, 13)
        px(draw, x0 + rx, y0 + ry, WATER_SHINE)


def draw_sand_tile(draw, col, row):
    """Sandy ground."""
    fill_tile(draw, col, row, SAND_MID)
    x0, y0 = col * TILE, row * TILE
    random.seed(col * 400 + row)
    for _ in range(12):
        gx = random.randint(0, 15)
        gy = random.randint(0, 15)
        c = random.choice([SAND_LIGHT, SAND_DARK])
        px(draw, x0 + gx, y0 + gy, c)


def draw_grass_stone_edge(draw, col, row, edge="top"):
    """Transition tile between grass and stone path."""
    fill_tile(draw, col, row, GRASS_MID)
    x0, y0 = col * TILE, row * TILE
    if edge == "top":
        draw.rectangle([x0, y0 + 8, x0 + 15, y0 + 15], fill=STONE_MID)
        draw.rectangle([x0, y0 + 9, x0 + 15, y0 + 15], fill=STONE_LIGHT)
        # Rough edge
        for i in range(0, 16, 3):
            px(draw, x0 + i, y0 + 8, GRASS_DARK)
    elif edge == "bottom":
        draw.rectangle([x0, y0, x0 + 15, y0 + 7], fill=STONE_MID)
        draw.rectangle([x0, y0, x0 + 15, y0 + 6], fill=STONE_LIGHT)
        for i in range(0, 16, 3):
            px(draw, x0 + i, y0 + 7, GRASS_DARK)


def draw_water_edge(draw, col, row):
    """Water to grass edge."""
    fill_tile(draw, col, row, WATER_MID)
    x0, y0 = col * TILE, row * TILE
    # Grass on top half, water on bottom
    draw.rectangle([x0, y0, x0 + 15, y0 + 6], fill=GRASS_MID)
    # Shoreline
    for i in range(16):
        offset = 1 if i % 3 == 0 else 0
        px(draw, x0 + i, y0 + 7 + offset, SAND_MID)
        px(draw, x0 + i, y0 + 7, SAND_LIGHT)


# =====================================================
# TREES (Rows 2-3)
# =====================================================

def draw_cherry_blossom(draw, col, row):
    """Cherry blossom tree (top part - canopy)."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Trunk
    draw.rectangle([x0 + 6, y0 + 10, x0 + 9, y0 + 15], fill=TRUNK_BROWN)
    px(draw, x0 + 7, y0 + 11, TRUNK_DARK)
    # Canopy - cloud-shaped pink blossoms
    # Main blob
    draw.ellipse([x0 + 1, y0 + 1, x0 + 14, y0 + 11], fill=SAKURA_PINK)
    # Lighter highlights
    draw.ellipse([x0 + 3, y0 + 2, x0 + 10, y0 + 8], fill=SAKURA_LIGHT)
    # Darker shadow areas
    for pos in [(2, 9), (11, 8), (4, 10), (12, 5)]:
        px(draw, x0 + pos[0], y0 + pos[1], SAKURA_DARK)
    # Petal scatter
    for pos in [(0, 4), (15, 6), (1, 8), (14, 3), (3, 0), (11, 0)]:
        px(draw, x0 + pos[0], y0 + pos[1], SAKURA_PETAL)
    # Falling petals
    px(draw, x0 + 2, y0 + 13, SAKURA_PETAL)
    px(draw, x0 + 13, y0 + 14, SAKURA_PINK)


def draw_pine_tree(draw, col, row):
    """Chinese pine tree with layered branches."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Trunk
    draw.rectangle([x0 + 6, y0 + 10, x0 + 9, y0 + 15], fill=TRUNK_BROWN)
    px(draw, x0 + 7, y0 + 12, TRUNK_DARK)
    px(draw, x0 + 8, y0 + 13, TRUNK_DARK)
    # Layered foliage (3 layers, each progressively wider)
    # Top layer
    for dx in range(5, 11):
        px(draw, x0 + dx, y0 + 1, PINE_DARK)
    for dx in range(4, 12):
        px(draw, x0 + dx, y0 + 2, PINE_MID)
    px(draw, x0 + 7, y0 + 0, PINE_DARK)
    px(draw, x0 + 8, y0 + 0, PINE_DARK)
    # Middle layer
    for dx in range(3, 13):
        px(draw, x0 + dx, y0 + 4, PINE_DARK)
    for dx in range(3, 13):
        px(draw, x0 + dx, y0 + 5, PINE_MID)
    for dx in range(4, 12):
        px(draw, x0 + dx, y0 + 3, PINE_DARK)
    # Bottom layer
    for dx in range(2, 14):
        px(draw, x0 + dx, y0 + 7, PINE_DARK)
    for dx in range(2, 14):
        px(draw, x0 + dx, y0 + 8, PINE_MID)
    for dx in range(3, 13):
        px(draw, x0 + dx, y0 + 6, PINE_DARK)
    for dx in range(2, 14):
        px(draw, x0 + dx, y0 + 9, PINE_DARK)
    # Highlights
    for pos in [(6, 2), (8, 5), (5, 8), (10, 7)]:
        px(draw, x0 + pos[0], y0 + pos[1], PINE_LIGHT)


def draw_bamboo(draw, col, row):
    """Bamboo cluster."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # 3 bamboo stems
    for stem_x in [4, 7, 10]:
        # Stem
        for y in range(2, 16):
            px(draw, x0 + stem_x, y0 + y, BAMBOO_GREEN)
            px(draw, x0 + stem_x + 1, y0 + y, BAMBOO_LIGHT)
        # Nodes (darker rings)
        for node_y in [5, 9, 13]:
            px(draw, x0 + stem_x, y0 + node_y, BAMBOO_DARK)
            px(draw, x0 + stem_x + 1, y0 + node_y, BAMBOO_DARK)
    # Leaves
    leaf_positions = [(2, 2), (3, 1), (1, 3), (6, 0), (5, 1),
                      (9, 1), (8, 0), (12, 2), (13, 1), (14, 3),
                      (3, 6), (12, 5), (2, 8), (13, 7)]
    for lx, ly in leaf_positions:
        px(draw, x0 + lx, y0 + ly, BAMBOO_GREEN)
    # Light leaf tips
    for lx, ly in [(1, 1), (14, 1), (0, 4), (15, 4)]:
        if 0 <= lx < 16 and 0 <= ly < 16:
            px(draw, x0 + lx, y0 + ly, BAMBOO_LIGHT)


def draw_willow_tree(draw, col, row):
    """Weeping willow tree."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Trunk
    draw.rectangle([x0 + 6, y0 + 4, x0 + 9, y0 + 15], fill=TRUNK_BROWN)
    px(draw, x0 + 7, y0 + 6, TRUNK_DARK)
    # Crown (top)
    draw.ellipse([x0 + 2, y0 + 0, x0 + 13, y0 + 6], fill=WILLOW_GREEN)
    # Hanging branches
    for bx in [2, 4, 6, 8, 10, 12, 14]:
        length = random.randint(6, 12)
        start_y = random.randint(3, 5)
        for by in range(start_y, min(start_y + length, 16)):
            color = WILLOW_GREEN if by % 2 == 0 else WILLOW_LIGHT
            px(draw, x0 + bx, y0 + by, color)
    # Darker areas
    for pos in [(3, 3), (11, 2), (5, 5)]:
        px(draw, x0 + pos[0], y0 + pos[1], WILLOW_DARK)


def draw_small_bush(draw, col, row):
    """Small decorative bush."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Bush shape
    draw.ellipse([x0 + 2, y0 + 6, x0 + 13, y0 + 14], fill=PINE_MID)
    draw.ellipse([x0 + 4, y0 + 4, x0 + 11, y0 + 12], fill=PINE_LIGHT)
    # Highlights
    px(draw, x0 + 6, y0 + 6, (90, 140, 72))
    px(draw, x0 + 8, y0 + 5, (90, 140, 72))


def draw_flower_bush(draw, col, row):
    """Bush with flowers."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    draw.ellipse([x0 + 2, y0 + 6, x0 + 13, y0 + 14], fill=PINE_MID)
    draw.ellipse([x0 + 3, y0 + 5, x0 + 12, y0 + 13], fill=PINE_LIGHT)
    # Flowers
    for pos in [(4, 7), (8, 6), (10, 9), (6, 10)]:
        px(draw, x0 + pos[0], y0 + pos[1], SAKURA_PINK)
        px(draw, x0 + pos[0] + 1, y0 + pos[1], SAKURA_LIGHT)


def draw_tree_trunk_base(draw, col, row):
    """Tree trunk base (for below-canopy tile)."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Trunk
    draw.rectangle([x0 + 6, y0 + 0, x0 + 9, y0 + 15], fill=TRUNK_BROWN)
    px(draw, x0 + 7, y0 + 3, TRUNK_DARK)
    px(draw, x0 + 8, y0 + 7, TRUNK_DARK)
    # Root flare
    px(draw, x0 + 5, y0 + 14, TRUNK_BROWN)
    px(draw, x0 + 10, y0 + 14, TRUNK_BROWN)
    px(draw, x0 + 5, y0 + 15, TRUNK_BROWN)
    px(draw, x0 + 10, y0 + 15, TRUNK_BROWN)


# =====================================================
# BUILDINGS (Rows 4-6) - Chinese Architecture
# =====================================================

def draw_chinese_roof_top(draw, col, row):
    """Chinese upturned roof - top section."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Upturned eave shape
    # Ridge at top
    draw.rectangle([x0 + 4, y0 + 2, x0 + 11, y0 + 3], fill=RED_DARK)
    # Main roof slopes
    for i in range(16):
        # Curved profile: highest at center, curves up at edges
        if i < 3:
            top = 6 - i
        elif i > 12:
            top = 6 - (15 - i)
        else:
            top = 4
        draw.rectangle([x0 + i, y0 + top, x0 + i, y0 + 10], fill=RED_ROOF)
    # Tile ridges (horizontal lines)
    for ry in [5, 7, 9]:
        draw.line([x0, y0 + ry, x0 + 15, y0 + ry], fill=RED_DARK)
    # Gold ridge ornament
    draw.rectangle([x0 + 6, y0 + 1, x0 + 9, y0 + 2], fill=GOLD_BRIGHT)
    px(draw, x0 + 7, y0 + 0, GOLD_MID)
    px(draw, x0 + 8, y0 + 0, GOLD_MID)
    # Upturned tips
    px(draw, x0 + 0, y0 + 3, GOLD_BRIGHT)
    px(draw, x0 + 1, y0 + 3, GOLD_BRIGHT)
    px(draw, x0 + 14, y0 + 3, GOLD_BRIGHT)
    px(draw, x0 + 15, y0 + 3, GOLD_BRIGHT)
    # Eave shadow
    draw.rectangle([x0, y0 + 11, x0 + 15, y0 + 12], fill=RED_DARK)
    # Under-eave (wood beams)
    draw.rectangle([x0 + 1, y0 + 13, x0 + 14, y0 + 15], fill=WOOD_MID)
    draw.line([x0 + 1, y0 + 14, x0 + 14, y0 + 14], fill=WOOD_DARK)


def draw_chinese_wall(draw, col, row):
    """White wall with wood frame (Chinese style)."""
    x0, y0 = col * TILE, row * TILE
    # White/cream plaster wall
    draw.rectangle([x0, y0, x0 + 15, y0 + 15], fill=WALL_WHITE)
    # Wood frame edges
    draw.rectangle([x0, y0, x0 + 1, y0 + 15], fill=WOOD_MID)
    draw.rectangle([x0 + 14, y0, x0 + 15, y0 + 15], fill=WOOD_MID)
    # Subtle wall texture
    px(draw, x0 + 5, y0 + 4, WALL_CREAM)
    px(draw, x0 + 9, y0 + 8, WALL_CREAM)
    px(draw, x0 + 3, y0 + 12, WALL_CREAM)


def draw_chinese_wall_red(draw, col, row):
    """Red lacquered wall."""
    x0, y0 = col * TILE, row * TILE
    draw.rectangle([x0, y0, x0 + 15, y0 + 15], fill=RED_MID)
    # Wood trim
    draw.rectangle([x0, y0, x0 + 1, y0 + 15], fill=WOOD_DARK)
    draw.rectangle([x0 + 14, y0, x0 + 15, y0 + 15], fill=WOOD_DARK)
    # Subtle texture
    for pos in [(4, 3), (8, 7), (6, 11), (10, 5)]:
        px(draw, x0 + pos[0], y0 + pos[1], RED_DARK)


def draw_chinese_door(draw, col, row):
    """Traditional Chinese red double door."""
    x0, y0 = col * TILE, row * TILE
    # Wall around door
    draw.rectangle([x0, y0, x0 + 15, y0 + 15], fill=WALL_WHITE)
    # Door frame
    draw.rectangle([x0 + 2, y0 + 0, x0 + 13, y0 + 15], fill=WOOD_DARK)
    # Red door panels
    draw.rectangle([x0 + 3, y0 + 1, x0 + 7, y0 + 15], fill=RED_BRIGHT)
    draw.rectangle([x0 + 8, y0 + 1, x0 + 12, y0 + 15], fill=RED_BRIGHT)
    # Door center line
    draw.line([x0 + 7, y0 + 1, x0 + 7, y0 + 15], fill=WOOD_DARK)
    draw.line([x0 + 8, y0 + 1, x0 + 8, y0 + 15], fill=WOOD_DARK)
    # Gold door knockers
    px(draw, x0 + 5, y0 + 8, GOLD_BRIGHT)
    px(draw, x0 + 10, y0 + 8, GOLD_BRIGHT)
    px(draw, x0 + 5, y0 + 9, GOLD_MID)
    px(draw, x0 + 10, y0 + 9, GOLD_MID)
    # Top beam
    draw.rectangle([x0 + 2, y0 + 0, x0 + 13, y0 + 0], fill=GOLD_DARK)


def draw_chinese_window(draw, col, row):
    """Chinese lattice window."""
    x0, y0 = col * TILE, row * TILE
    # Wall
    draw.rectangle([x0, y0, x0 + 15, y0 + 15], fill=WALL_WHITE)
    # Window frame
    draw.rectangle([x0 + 2, y0 + 2, x0 + 13, y0 + 13], fill=WOOD_MID)
    # Window opening (dark interior)
    draw.rectangle([x0 + 3, y0 + 3, x0 + 12, y0 + 12], fill=(40, 40, 56))
    # Lattice pattern (cross)
    draw.line([x0 + 7, y0 + 3, x0 + 7, y0 + 12], fill=WOOD_LIGHT)
    draw.line([x0 + 8, y0 + 3, x0 + 8, y0 + 12], fill=WOOD_LIGHT)
    draw.line([x0 + 3, y0 + 7, x0 + 12, y0 + 7], fill=WOOD_LIGHT)
    draw.line([x0 + 3, y0 + 8, x0 + 12, y0 + 8], fill=WOOD_LIGHT)
    # Diamond pattern in quadrants
    px(draw, x0 + 5, y0 + 5, WOOD_LIGHT)
    px(draw, x0 + 10, y0 + 5, WOOD_LIGHT)
    px(draw, x0 + 5, y0 + 10, WOOD_LIGHT)
    px(draw, x0 + 10, y0 + 10, WOOD_LIGHT)


def draw_pagoda_top(draw, col, row):
    """Pagoda spire/finial."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Gold finial
    px(draw, x0 + 7, y0 + 0, GOLD_BRIGHT)
    px(draw, x0 + 8, y0 + 0, GOLD_BRIGHT)
    px(draw, x0 + 7, y0 + 1, GOLD_MID)
    px(draw, x0 + 8, y0 + 1, GOLD_MID)
    # Small top roof
    for i in range(4, 12):
        curve_y = 3 if 6 <= i <= 9 else 2
        draw.rectangle([x0 + i, y0 + curve_y, x0 + i, y0 + 5], fill=RED_ROOF)
    px(draw, x0 + 4, y0 + 2, GOLD_BRIGHT)
    px(draw, x0 + 11, y0 + 2, GOLD_BRIGHT)
    # Second tier roof
    for i in range(2, 14):
        curve_y = 8 if 5 <= i <= 10 else 7
        draw.rectangle([x0 + i, y0 + curve_y, x0 + i, y0 + 10], fill=RED_ROOF)
    draw.line([x0 + 2, y0 + 9, x0 + 13, y0 + 9], fill=RED_DARK)
    px(draw, x0 + 2, y0 + 7, GOLD_BRIGHT)
    px(draw, x0 + 13, y0 + 7, GOLD_BRIGHT)
    # Wall section
    draw.rectangle([x0 + 4, y0 + 11, x0 + 11, y0 + 15], fill=WALL_WHITE)
    # Small window
    draw.rectangle([x0 + 6, y0 + 12, x0 + 9, y0 + 14], fill=(40, 40, 56))
    draw.line([x0 + 7, y0 + 12, x0 + 7, y0 + 14], fill=WOOD_MID)


def draw_roof_grey_tile(draw, col, row):
    """Grey roof tiles (alternative style)."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, ROOF_GREY)
    # Tile pattern
    for ry in range(0, 16, 3):
        offset = 4 if (ry // 3) % 2 else 0
        for rx in range(0, 16, 8):
            cx = rx + offset
            if cx < 16:
                draw.ellipse([x0 + cx, y0 + ry, x0 + min(cx + 6, 15), y0 + min(ry + 2, 15)], fill=ROOF_LIGHT)
    # Dark gaps
    for ry in [2, 5, 8, 11, 14]:
        if ry < 16:
            draw.line([x0, y0 + ry, x0 + 15, y0 + ry], fill=ROOF_DARK)


def draw_wall_base(draw, col, row):
    """Wall base / foundation stone."""
    x0, y0 = col * TILE, row * TILE
    draw.rectangle([x0, y0, x0 + 15, y0 + 15], fill=STONE_MID)
    # Stone block pattern
    draw.rectangle([x0, y0, x0 + 7, y0 + 7], fill=STONE_LIGHT)
    draw.rectangle([x0 + 8, y0, x0 + 15, y0 + 7], fill=STONE_LIGHT)
    draw.rectangle([x0 + 4, y0 + 8, x0 + 11, y0 + 15], fill=STONE_LIGHT)
    # Mortar lines
    draw.line([x0, y0 + 7, x0 + 15, y0 + 7], fill=STONE_DARK)
    draw.line([x0 + 7, y0, x0 + 7, y0 + 7], fill=STONE_DARK)
    draw.line([x0 + 4, y0 + 8, x0 + 4, y0 + 15], fill=STONE_DARK)
    draw.line([x0 + 11, y0 + 8, x0 + 11, y0 + 15], fill=STONE_DARK)


# =====================================================
# FENCES AND WALLS (Rows 7-8)
# =====================================================

def draw_bamboo_fence_h(draw, col, row):
    """Horizontal bamboo fence."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Vertical posts
    for post_x in [2, 7, 12]:
        draw.rectangle([x0 + post_x, y0 + 4, x0 + post_x + 1, y0 + 15], fill=BAMBOO_DARK)
        px(draw, x0 + post_x, y0 + 3, BAMBOO_GREEN)
    # Horizontal rails
    for rail_y in [6, 9, 12]:
        draw.line([x0, y0 + rail_y, x0 + 15, y0 + rail_y], fill=BAMBOO_GREEN)
        draw.line([x0, y0 + rail_y + 1, x0 + 15, y0 + rail_y + 1], fill=BAMBOO_LIGHT)
    # Bamboo node marks
    for nx, ny in [(2, 8), (7, 11), (12, 7)]:
        px(draw, x0 + nx, y0 + ny, BAMBOO_DARK)


def draw_bamboo_fence_v(draw, col, row):
    """Vertical bamboo fence."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Horizontal beams
    for beam_y in [3, 8, 13]:
        draw.rectangle([x0 + 4, y0 + beam_y, x0 + 11, y0 + beam_y + 1], fill=BAMBOO_DARK)
    # Vertical bamboo sticks
    for stick_x in range(4, 12, 2):
        draw.line([x0 + stick_x, y0 + 0, x0 + stick_x, y0 + 15], fill=BAMBOO_GREEN)
        draw.line([x0 + stick_x + 1, y0 + 0, x0 + stick_x + 1, y0 + 15], fill=BAMBOO_LIGHT)


def draw_garden_wall_h(draw, col, row):
    """Chinese garden wall (white with grey tile cap)."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Wall cap (grey tiles)
    draw.rectangle([x0, y0 + 4, x0 + 15, y0 + 6], fill=ROOF_GREY)
    draw.line([x0, y0 + 4, x0 + 15, y0 + 4], fill=ROOF_DARK)
    # Wave pattern on cap
    for wx in range(0, 16, 4):
        px(draw, x0 + wx + 1, y0 + 4, ROOF_LIGHT)
    # White wall body
    draw.rectangle([x0, y0 + 7, x0 + 15, y0 + 15], fill=WALL_WHITE)
    # Base
    draw.rectangle([x0, y0 + 14, x0 + 15, y0 + 15], fill=STONE_MID)
    # Subtle texture
    px(draw, x0 + 4, y0 + 9, WALL_CREAM)
    px(draw, x0 + 10, y0 + 11, WALL_CREAM)


def draw_garden_wall_corner(draw, col, row):
    """Garden wall corner."""
    x0, y0 = col * TILE, row * TILE
    # Vertical wall
    draw.rectangle([x0, y0, x0 + 7, y0 + 15], fill=WALL_WHITE)
    draw.rectangle([x0, y0, x0 + 7, y0 + 3], fill=ROOF_GREY)
    # Horizontal wall
    draw.rectangle([x0, y0 + 4, x0 + 15, y0 + 6], fill=ROOF_GREY)
    draw.rectangle([x0, y0 + 7, x0 + 15, y0 + 15], fill=WALL_WHITE)
    draw.rectangle([x0, y0 + 14, x0 + 15, y0 + 15], fill=STONE_MID)
    # Corner post
    draw.rectangle([x0 + 6, y0, x0 + 8, y0 + 15], fill=STONE_MID)


def draw_stone_wall_h(draw, col, row):
    """Horizontal stone wall / fence."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Wall body
    draw.rectangle([x0, y0 + 4, x0 + 15, y0 + 12], fill=STONE_MID)
    # Stone blocks
    draw.rectangle([x0, y0 + 4, x0 + 5, y0 + 8], fill=STONE_LIGHT)
    draw.rectangle([x0 + 6, y0 + 4, x0 + 10, y0 + 8], fill=STONE_LIGHT)
    draw.rectangle([x0 + 11, y0 + 4, x0 + 15, y0 + 8], fill=STONE_LIGHT)
    draw.rectangle([x0 + 3, y0 + 9, x0 + 8, y0 + 12], fill=STONE_LIGHT)
    draw.rectangle([x0 + 9, y0 + 9, x0 + 15, y0 + 12], fill=STONE_LIGHT)
    # Cap
    draw.rectangle([x0, y0 + 3, x0 + 15, y0 + 4], fill=STONE_DARK)


def draw_bamboo_fence_end(draw, col, row):
    """Bamboo fence end post."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Thick post
    draw.rectangle([x0 + 5, y0 + 2, x0 + 10, y0 + 15], fill=BAMBOO_DARK)
    draw.rectangle([x0 + 6, y0 + 3, x0 + 9, y0 + 14], fill=BAMBOO_GREEN)
    # Top
    draw.rectangle([x0 + 5, y0 + 1, x0 + 10, y0 + 2], fill=BAMBOO_DARK)
    px(draw, x0 + 7, y0 + 0, BAMBOO_GREEN)
    px(draw, x0 + 8, y0 + 0, BAMBOO_GREEN)
    # Node marks
    px(draw, x0 + 6, y0 + 6, BAMBOO_DARK)
    px(draw, x0 + 9, y0 + 6, BAMBOO_DARK)
    px(draw, x0 + 6, y0 + 10, BAMBOO_DARK)
    px(draw, x0 + 9, y0 + 10, BAMBOO_DARK)


# =====================================================
# PROPS (Rows 9-10)
# =====================================================

def draw_lantern(draw, col, row):
    """Chinese red paper lantern."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # String
    draw.line([x0 + 7, y0 + 0, x0 + 7, y0 + 2], fill=GOLD_DARK)
    # Top cap
    draw.rectangle([x0 + 5, y0 + 2, x0 + 10, y0 + 3], fill=GOLD_BRIGHT)
    # Lantern body (oval)
    draw.ellipse([x0 + 3, y0 + 3, x0 + 12, y0 + 12], fill=LANTERN_RED)
    # Highlight
    draw.ellipse([x0 + 5, y0 + 4, x0 + 8, y0 + 7], fill=(220, 60, 72))
    # Gold bands
    draw.line([x0 + 4, y0 + 5, x0 + 11, y0 + 5], fill=GOLD_MID)
    draw.line([x0 + 4, y0 + 10, x0 + 11, y0 + 10], fill=GOLD_MID)
    # Bottom cap
    draw.rectangle([x0 + 5, y0 + 12, x0 + 10, y0 + 13], fill=GOLD_BRIGHT)
    # Tassel
    px(draw, x0 + 7, y0 + 14, GOLD_MID)
    px(draw, x0 + 7, y0 + 15, GOLD_DARK)
    px(draw, x0 + 6, y0 + 15, GOLD_DARK)
    px(draw, x0 + 8, y0 + 15, GOLD_DARK)


def draw_wooden_sign(draw, col, row):
    """Wooden sign post."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Post
    draw.rectangle([x0 + 7, y0 + 6, x0 + 8, y0 + 15], fill=WOOD_DARK)
    # Sign board
    draw.rectangle([x0 + 2, y0 + 1, x0 + 13, y0 + 7], fill=WOOD_MID)
    draw.rectangle([x0 + 2, y0 + 1, x0 + 13, y0 + 1], fill=WOOD_DARK)
    draw.rectangle([x0 + 2, y0 + 7, x0 + 13, y0 + 7], fill=WOOD_DARK)
    # Text area (lighter)
    draw.rectangle([x0 + 3, y0 + 2, x0 + 12, y0 + 6], fill=WOOD_LIGHT)
    # Fake Chinese character lines
    draw.line([x0 + 5, y0 + 3, x0 + 5, y0 + 5], fill=WOOD_DARK)
    draw.line([x0 + 4, y0 + 4, x0 + 6, y0 + 4], fill=WOOD_DARK)
    draw.line([x0 + 9, y0 + 3, x0 + 9, y0 + 5], fill=WOOD_DARK)
    draw.line([x0 + 8, y0 + 3, x0 + 10, y0 + 3], fill=WOOD_DARK)


def draw_stone_pot(draw, col, row):
    """Decorative stone pot / planter."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Pot body
    draw.rectangle([x0 + 3, y0 + 8, x0 + 12, y0 + 14], fill=STONE_MID)
    draw.rectangle([x0 + 4, y0 + 9, x0 + 11, y0 + 13], fill=STONE_LIGHT)
    # Rim
    draw.rectangle([x0 + 2, y0 + 7, x0 + 13, y0 + 8], fill=STONE_DARK)
    # Base
    draw.rectangle([x0 + 4, y0 + 14, x0 + 11, y0 + 15], fill=STONE_DARK)
    # Plant
    px(draw, x0 + 7, y0 + 5, PINE_MID)
    px(draw, x0 + 6, y0 + 4, PINE_LIGHT)
    px(draw, x0 + 8, y0 + 4, PINE_LIGHT)
    px(draw, x0 + 7, y0 + 3, PINE_MID)
    px(draw, x0 + 5, y0 + 6, PINE_MID)
    px(draw, x0 + 9, y0 + 6, PINE_MID)


def draw_stone_lantern(draw, col, row):
    """Japanese/Chinese stone garden lantern (toro)."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Base
    draw.rectangle([x0 + 4, y0 + 14, x0 + 11, y0 + 15], fill=STONE_DARK)
    draw.rectangle([x0 + 5, y0 + 13, x0 + 10, y0 + 14], fill=STONE_MID)
    # Shaft
    draw.rectangle([x0 + 6, y0 + 8, x0 + 9, y0 + 13], fill=STONE_MID)
    # Light chamber
    draw.rectangle([x0 + 4, y0 + 5, x0 + 11, y0 + 8], fill=STONE_LIGHT)
    draw.rectangle([x0 + 5, y0 + 6, x0 + 10, y0 + 7], fill=(255, 240, 180))  # warm glow
    # Roof cap
    draw.rectangle([x0 + 3, y0 + 3, x0 + 12, y0 + 5], fill=STONE_DARK)
    # Top
    px(draw, x0 + 7, y0 + 2, STONE_MID)
    px(draw, x0 + 8, y0 + 2, STONE_MID)
    px(draw, x0 + 7, y0 + 1, STONE_DARK)


def draw_arch_bridge_left(draw, col, row):
    """Arched bridge left section."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Bridge deck
    draw.rectangle([x0, y0 + 4, x0 + 15, y0 + 7], fill=STONE_LIGHT)
    draw.line([x0, y0 + 4, x0 + 15, y0 + 4], fill=STONE_DARK)
    draw.line([x0, y0 + 7, x0 + 15, y0 + 7], fill=STONE_DARK)
    # Railing
    draw.rectangle([x0, y0 + 1, x0 + 15, y0 + 3], fill=STONE_MID)
    draw.line([x0, y0 + 1, x0 + 15, y0 + 1], fill=STONE_DARK)
    # Arch underneath
    draw.arc([x0 + 2, y0 + 8, x0 + 15, y0 + 15], 180, 270, fill=STONE_DARK)
    # Railing posts
    for post_x in [2, 8, 14]:
        draw.rectangle([x0 + post_x, y0 + 0, x0 + post_x + 1, y0 + 3], fill=STONE_DARK)


def draw_arch_bridge_right(draw, col, row):
    """Arched bridge right section."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Bridge deck
    draw.rectangle([x0, y0 + 4, x0 + 15, y0 + 7], fill=STONE_LIGHT)
    draw.line([x0, y0 + 4, x0 + 15, y0 + 4], fill=STONE_DARK)
    draw.line([x0, y0 + 7, x0 + 15, y0 + 7], fill=STONE_DARK)
    # Railing
    draw.rectangle([x0, y0 + 1, x0 + 15, y0 + 3], fill=STONE_MID)
    draw.line([x0, y0 + 1, x0 + 15, y0 + 1], fill=STONE_DARK)
    # Arch
    draw.arc([x0, y0 + 8, x0 + 13, y0 + 15], 270, 360, fill=STONE_DARK)
    # Posts
    for post_x in [1, 7, 13]:
        draw.rectangle([x0 + post_x, y0 + 0, x0 + post_x + 1, y0 + 3], fill=STONE_DARK)


def draw_barrel(draw, col, row):
    """Wooden barrel."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Barrel body
    draw.ellipse([x0 + 3, y0 + 3, x0 + 12, y0 + 14], fill=WOOD_MID)
    # Rim
    draw.ellipse([x0 + 4, y0 + 3, x0 + 11, y0 + 5], fill=WOOD_DARK)
    # Bands
    draw.ellipse([x0 + 3, y0 + 6, x0 + 12, y0 + 8], fill=WOOD_DARK)
    draw.ellipse([x0 + 3, y0 + 11, x0 + 12, y0 + 13], fill=WOOD_DARK)
    # Highlight
    px(draw, x0 + 6, y0 + 7, WOOD_LIGHT)
    px(draw, x0 + 6, y0 + 9, WOOD_LIGHT)


def draw_stone_stairs(draw, col, row):
    """Stone stairs."""
    x0, y0 = col * TILE, row * TILE
    # Steps
    for i in range(4):
        sy = i * 4
        sw = 16 - i * 2
        sx = i
        draw.rectangle([x0 + sx, y0 + sy, x0 + sx + sw - 1, y0 + sy + 3], fill=STONE_LIGHT)
        draw.line([x0 + sx, y0 + sy, x0 + sx + sw - 1, y0 + sy], fill=STONE_DARK)
        draw.line([x0 + sx, y0 + sy, x0 + sx, y0 + sy + 3], fill=STONE_DARK)


def draw_torii_gate_left(draw, col, row):
    """Torii gate left pillar."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Pillar
    draw.rectangle([x0 + 4, y0 + 0, x0 + 9, y0 + 15], fill=RED_BRIGHT)
    draw.rectangle([x0 + 5, y0 + 0, x0 + 8, y0 + 15], fill=RED_MID)
    # Top beam extends right
    draw.rectangle([x0 + 4, y0 + 0, x0 + 15, y0 + 2], fill=RED_DARK)
    draw.rectangle([x0 + 4, y0 + 4, x0 + 15, y0 + 5], fill=RED_DARK)
    # Base
    draw.rectangle([x0 + 3, y0 + 14, x0 + 10, y0 + 15], fill=STONE_DARK)


def draw_torii_gate_right(draw, col, row):
    """Torii gate right pillar."""
    x0, y0 = col * TILE, row * TILE
    fill_tile(draw, col, row, TRANSPARENT)
    # Pillar
    draw.rectangle([x0 + 6, y0 + 0, x0 + 11, y0 + 15], fill=RED_BRIGHT)
    draw.rectangle([x0 + 7, y0 + 0, x0 + 10, y0 + 15], fill=RED_MID)
    # Top beam extends left
    draw.rectangle([x0, y0 + 0, x0 + 11, y0 + 2], fill=RED_DARK)
    draw.rectangle([x0, y0 + 4, x0 + 11, y0 + 5], fill=RED_DARK)
    # Base
    draw.rectangle([x0 + 5, y0 + 14, x0 + 12, y0 + 15], fill=STONE_DARK)


def draw_empty(draw, col, row):
    """Empty transparent tile."""
    fill_tile(draw, col, row, TRANSPARENT)


# =====================================================
# MAIN GENERATION
# =====================================================

def generate_tileset():
    img = Image.new("RGBA", (W, H), TRANSPARENT)
    draw = ImageDraw.Draw(img)

    random.seed(42)  # Reproducible

    # === ROW 0: Ground basics ===
    draw_grass_base(draw, 0, 0)           # 0,0 - Main grass
    draw_grass_variant(draw, 1, 0, 1)     # 1,0 - Grass variant
    draw_grass_variant(draw, 2, 0, 2)     # 2,0 - Grass variant 2
    draw_stone_path(draw, 3, 0)           # 3,0 - Stone path
    draw_stone_path_h(draw, 4, 0)         # 4,0 - Stone path horizontal brick
    draw_dirt_tile(draw, 5, 0)            # 5,0 - Dirt
    draw_water_tile(draw, 6, 0)           # 6,0 - Water
    draw_water_tile(draw, 7, 0, 1)        # 7,0 - Water variant
    draw_sand_tile(draw, 8, 0)            # 8,0 - Sand
    draw_grass_stone_edge(draw, 9, 0, "top")   # 9,0 - Grass/stone edge top
    draw_grass_stone_edge(draw, 10, 0, "bottom") # 10,0 - Grass/stone edge bottom
    draw_water_edge(draw, 11, 0)          # 11,0 - Water edge

    # === ROW 1: More ground ===
    draw_grass_variant(draw, 0, 1, 3)     # 0,1 - Grass variant 3
    draw_grass_variant(draw, 1, 1, 4)     # 1,1 - Grass variant 4
    draw_dirt_tile(draw, 2, 1)            # 2,1 - Dirt variant
    draw_stone_path(draw, 3, 1)           # 3,1 - More stone
    draw_stone_path_h(draw, 4, 1)         # 4,1 - More stone
    draw_sand_tile(draw, 5, 1)            # 5,1 - Sand
    draw_water_tile(draw, 6, 1, 2)        # 6,1 - Water
    draw_water_tile(draw, 7, 1, 3)        # 7,1 - Water
    draw_grass_variant(draw, 8, 1, 5)     # 8,1 - Grass
    draw_grass_variant(draw, 9, 1, 6)     # 9,1 - Grass
    draw_grass_variant(draw, 10, 1, 7)    # 10,1 - Grass
    draw_grass_variant(draw, 11, 1, 8)    # 11,1 - Grass

    # === ROW 2: Trees ===
    draw_cherry_blossom(draw, 0, 2)       # 0,2 - Cherry blossom
    draw_pine_tree(draw, 1, 2)            # 1,2 - Pine tree
    draw_bamboo(draw, 2, 2)               # 2,2 - Bamboo cluster
    draw_willow_tree(draw, 3, 2)          # 3,2 - Willow tree
    draw_small_bush(draw, 4, 2)           # 4,2 - Small bush
    draw_flower_bush(draw, 5, 2)          # 5,2 - Flower bush
    draw_tree_trunk_base(draw, 6, 2)      # 6,2 - Trunk base
    draw_cherry_blossom(draw, 7, 2)       # 7,2 - Cherry blossom copy
    draw_pine_tree(draw, 8, 2)            # 8,2 - Pine copy
    draw_bamboo(draw, 9, 2)               # 9,2 - Bamboo copy
    draw_small_bush(draw, 10, 2)          # 10,2 - Bush copy
    draw_flower_bush(draw, 11, 2)         # 11,2 - Flower copy

    # === ROW 3: More trees / vegetation ===
    draw_cherry_blossom(draw, 0, 3)       # Second row of trees for variety
    draw_pine_tree(draw, 1, 3)
    draw_bamboo(draw, 2, 3)
    draw_willow_tree(draw, 3, 3)
    draw_tree_trunk_base(draw, 4, 3)
    draw_tree_trunk_base(draw, 5, 3)
    draw_small_bush(draw, 6, 3)
    draw_flower_bush(draw, 7, 3)
    draw_grass_variant(draw, 8, 3, 10)
    draw_grass_variant(draw, 9, 3, 11)
    draw_grass_variant(draw, 10, 3, 12)
    draw_grass_variant(draw, 11, 3, 13)

    # === ROW 4: Buildings - Roofs ===
    draw_chinese_roof_top(draw, 0, 4)     # 0,4 - Chinese roof
    draw_chinese_roof_top(draw, 1, 4)     # 1,4 - Roof (duplicate for wider building)
    draw_roof_grey_tile(draw, 2, 4)       # 2,4 - Grey roof tiles
    draw_roof_grey_tile(draw, 3, 4)       # 3,4 - Grey roof variant
    draw_pagoda_top(draw, 4, 4)           # 4,4 - Pagoda spire
    draw_chinese_roof_top(draw, 5, 4)     # 5,4 - Another roof
    draw_roof_grey_tile(draw, 6, 4)       # 6,4 - Grey roof
    draw_empty(draw, 7, 4)
    draw_empty(draw, 8, 4)
    draw_empty(draw, 9, 4)
    draw_empty(draw, 10, 4)
    draw_empty(draw, 11, 4)

    # === ROW 5: Buildings - Walls ===
    draw_chinese_wall(draw, 0, 5)         # 0,5 - White wall
    draw_chinese_wall_red(draw, 1, 5)     # 1,5 - Red wall
    draw_chinese_door(draw, 2, 5)         # 2,5 - Double door
    draw_chinese_window(draw, 3, 5)       # 3,5 - Lattice window
    draw_wall_base(draw, 4, 5)            # 4,5 - Stone base
    draw_chinese_wall(draw, 5, 5)         # 5,5 - White wall
    draw_chinese_wall_red(draw, 6, 5)     # 6,5 - Red wall
    draw_chinese_door(draw, 7, 5)         # 7,5 - Door
    draw_chinese_window(draw, 8, 5)       # 8,5 - Window
    draw_wall_base(draw, 9, 5)            # 9,5 - Base
    draw_empty(draw, 10, 5)
    draw_empty(draw, 11, 5)

    # === ROW 6: Buildings - More walls and elements ===
    draw_chinese_wall(draw, 0, 6)
    draw_chinese_wall_red(draw, 1, 6)
    draw_chinese_wall(draw, 2, 6)
    draw_chinese_wall_red(draw, 3, 6)
    draw_wall_base(draw, 4, 6)
    draw_wall_base(draw, 5, 6)
    draw_chinese_door(draw, 6, 6)
    draw_chinese_window(draw, 7, 6)
    draw_chinese_wall(draw, 8, 6)
    draw_chinese_wall_red(draw, 9, 6)
    draw_empty(draw, 10, 6)
    draw_empty(draw, 11, 6)

    # === ROW 7: Fences ===
    draw_bamboo_fence_h(draw, 0, 7)       # 0,7 - Bamboo fence horizontal
    draw_bamboo_fence_h(draw, 1, 7)       # 1,7 - Bamboo fence h cont
    draw_bamboo_fence_v(draw, 2, 7)       # 2,7 - Bamboo fence vertical
    draw_bamboo_fence_end(draw, 3, 7)     # 3,7 - Bamboo fence end post
    draw_garden_wall_h(draw, 4, 7)        # 4,7 - Garden wall horizontal
    draw_garden_wall_h(draw, 5, 7)        # 5,7 - Garden wall h cont
    draw_garden_wall_corner(draw, 6, 7)   # 6,7 - Garden wall corner
    draw_stone_wall_h(draw, 7, 7)         # 7,7 - Stone wall
    draw_stone_wall_h(draw, 8, 7)         # 8,7 - Stone wall
    draw_bamboo_fence_h(draw, 9, 7)       # 9,7 - Bamboo fence
    draw_bamboo_fence_v(draw, 10, 7)      # 10,7 - Bamboo fence v
    draw_bamboo_fence_end(draw, 11, 7)    # 11,7 - End post

    # === ROW 8: More fences/walls ===
    draw_garden_wall_h(draw, 0, 8)
    draw_garden_wall_corner(draw, 1, 8)
    draw_stone_wall_h(draw, 2, 8)
    draw_bamboo_fence_h(draw, 3, 8)
    draw_bamboo_fence_v(draw, 4, 8)
    draw_bamboo_fence_end(draw, 5, 8)
    draw_garden_wall_h(draw, 6, 8)
    draw_stone_wall_h(draw, 7, 8)
    draw_empty(draw, 8, 8)
    draw_empty(draw, 9, 8)
    draw_empty(draw, 10, 8)
    draw_empty(draw, 11, 8)

    # === ROW 9: Props ===
    draw_lantern(draw, 0, 9)              # 0,9 - Red lantern
    draw_lantern(draw, 1, 9)              # 1,9 - Lantern copy
    draw_wooden_sign(draw, 2, 9)          # 2,9 - Wooden sign
    draw_stone_pot(draw, 3, 9)            # 3,9 - Stone pot/planter
    draw_stone_lantern(draw, 4, 9)        # 4,9 - Stone garden lantern
    draw_barrel(draw, 5, 9)               # 5,9 - Wooden barrel
    draw_stone_stairs(draw, 6, 9)         # 6,9 - Stone stairs
    draw_arch_bridge_left(draw, 7, 9)     # 7,9 - Bridge left
    draw_arch_bridge_right(draw, 8, 9)    # 8,9 - Bridge right
    draw_torii_gate_left(draw, 9, 9)      # 9,9 - Torii left
    draw_torii_gate_right(draw, 10, 9)    # 10,9 - Torii right
    draw_empty(draw, 11, 9)

    # === ROW 10: More props ===
    draw_lantern(draw, 0, 10)
    draw_stone_pot(draw, 1, 10)
    draw_stone_lantern(draw, 2, 10)
    draw_wooden_sign(draw, 3, 10)
    draw_barrel(draw, 4, 10)
    draw_stone_stairs(draw, 5, 10)
    draw_empty(draw, 6, 10)
    draw_empty(draw, 7, 10)
    draw_empty(draw, 8, 10)
    draw_empty(draw, 9, 10)
    draw_empty(draw, 10, 10)
    draw_empty(draw, 11, 10)

    return img


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))

    img = generate_tileset()

    # Save packed version (same dimensions: 192x176)
    packed_path = os.path.join(script_dir, "town_tilemap_packed.png")
    img.save(packed_path, "PNG")
    print(f"Saved: {packed_path} ({img.size[0]}x{img.size[1]})")

    # Save non-packed version (same image)
    non_packed_path = os.path.join(script_dir, "town_tilemap.png")
    img.save(non_packed_path, "PNG")
    print(f"Saved: {non_packed_path} ({img.size[0]}x{img.size[1]})")

    # Also generate the dungeon tilemap with Asian style (interior)
    # For now, just copy the same tileset
    dungeon_packed = os.path.join(script_dir, "dungeon_tilemap_packed.png")
    dungeon_normal = os.path.join(script_dir, "dungeon_tilemap.png")
    img.save(dungeon_packed, "PNG")
    img.save(dungeon_normal, "PNG")
    print(f"Saved dungeon variants too")

    print("Done! Asian-style tileset generated.")


if __name__ == "__main__":
    main()
