#!/usr/bin/env python3
"""Generate Chinese-style 16x16 pixel art character sprites.

Each character sprite sheet is 64x16 (4 frames: down, left, right, up).
Uses a traditional Chinese aesthetic with hanfu-inspired clothing.
"""

from PIL import Image, ImageDraw
import os

FRAME = 16
FRAMES = 4  # down, left, right, up
SHEET_W = FRAME * FRAMES
SHEET_H = FRAME

# --- Skin tones (East Asian) ---
SKIN = (235, 205, 175)
SKIN_SHADOW = (210, 180, 150)
SKIN_DARK = (190, 160, 135)

# --- Hair ---
HAIR_BLACK = (32, 28, 24)
HAIR_DARK = (48, 40, 32)

# --- Eye ---
EYE = (32, 28, 24)
EYE_WHITE = (240, 240, 240)

# --- Clothing palettes ---
HANFU_RED = (180, 40, 50)          # Guard / traditional
HANFU_RED_DARK = (140, 30, 40)
HANFU_RED_LIGHT = (210, 70, 80)

MERCHANT_BLUE = (60, 90, 140)      # Merchant
MERCHANT_BLUE_DARK = (40, 65, 110)
MERCHANT_BLUE_LIGHT = (90, 120, 170)

STUDENT_WHITE = (230, 225, 215)     # Student
STUDENT_WHITE_DARK = (200, 195, 185)
STUDENT_BLUE = (80, 110, 150)

VENDOR_GREEN = (70, 120, 60)        # Vendor
VENDOR_GREEN_DARK = (50, 90, 40)
VENDOR_GREEN_LIGHT = (100, 150, 90)

ELDER_GREY = (160, 155, 145)        # Elder
ELDER_GREY_DARK = (130, 125, 115)
ELDER_BROWN = (120, 90, 60)

PLAYER_GOLD = (200, 160, 60)       # Player
PLAYER_GOLD_DARK = (170, 130, 40)
PLAYER_RED = (180, 50, 50)

# --- Common colors ---
SHOE_DARK = (60, 50, 40)
SHOE_MID = (80, 70, 55)
BELT_GOLD = (200, 170, 60)
BELT_DARK = (160, 130, 40)
TRANSPARENT = (0, 0, 0, 0)


def px(draw, x, y, color):
    draw.point((x, y), fill=color)


def draw_chinese_character(draw, fx, fy, direction, hair_style,
                           cloth_main, cloth_dark, cloth_light,
                           belt_color=BELT_GOLD, has_hat=False,
                           hair_color=HAIR_BLACK, hair_bun=False,
                           elder_beard=False, headband=False,
                           headband_color=None):
    """Draw a 16x16 Chinese-style character.

    fx, fy: top-left pixel of the frame
    direction: 'down', 'left', 'right', 'up'
    """
    # Clear frame
    for y in range(16):
        for x in range(16):
            px(draw, fx + x, fy + y, TRANSPARENT)

    if direction == 'down':
        _draw_front(draw, fx, fy, hair_style, cloth_main, cloth_dark, cloth_light,
                    belt_color, has_hat, hair_color, hair_bun, elder_beard, headband, headband_color)
    elif direction == 'up':
        _draw_back(draw, fx, fy, hair_style, cloth_main, cloth_dark, cloth_light,
                   belt_color, has_hat, hair_color, hair_bun, headband, headband_color)
    elif direction == 'left':
        _draw_side(draw, fx, fy, False, hair_style, cloth_main, cloth_dark, cloth_light,
                   belt_color, has_hat, hair_color, hair_bun, headband, headband_color)
    elif direction == 'right':
        _draw_side(draw, fx, fy, True, hair_style, cloth_main, cloth_dark, cloth_light,
                   belt_color, has_hat, hair_color, hair_bun, headband, headband_color)


def _draw_front(draw, fx, fy, hair_style, cloth_main, cloth_dark, cloth_light,
                belt_color, has_hat, hair_color, hair_bun, elder_beard, headband, headband_color):
    """Front-facing character (walking down)."""

    # --- Hair / Hat (rows 1-4) ---
    if has_hat:
        # Traditional Chinese hat (guanmao)
        for x in range(4, 12):
            px(draw, fx+x, fy+1, hair_color)
        for x in range(3, 13):
            px(draw, fx+x, fy+2, hair_color)
        for x in range(5, 11):
            px(draw, fx+x, fy+3, cloth_dark)
    else:
        # Hair top
        for x in range(5, 11):
            px(draw, fx+x, fy+1, hair_color)
        for x in range(4, 12):
            px(draw, fx+x, fy+2, hair_color)
        # Side hair
        px(draw, fx+4, fy+3, hair_color)
        px(draw, fx+11, fy+3, hair_color)
        px(draw, fx+4, fy+4, hair_color)
        px(draw, fx+11, fy+4, hair_color)

    if hair_bun:
        # Top bun
        px(draw, fx+7, fy+0, hair_color)
        px(draw, fx+8, fy+0, hair_color)
        px(draw, fx+7, fy+1, HAIR_DARK)
        px(draw, fx+8, fy+1, HAIR_DARK)

    if headband and headband_color:
        for x in range(4, 12):
            px(draw, fx+x, fy+3, headband_color)

    # --- Face (rows 3-6) ---
    for x in range(5, 11):
        for y in range(3, 7):
            px(draw, fx+x, fy+y, SKIN)
    # Face shadow
    px(draw, fx+5, fy+5, SKIN_SHADOW)
    px(draw, fx+10, fy+5, SKIN_SHADOW)
    px(draw, fx+5, fy+6, SKIN_SHADOW)
    px(draw, fx+10, fy+6, SKIN_SHADOW)

    # Eyes
    px(draw, fx+6, fy+4, EYE)
    px(draw, fx+9, fy+4, EYE)
    # Mouth
    px(draw, fx+7, fy+6, SKIN_DARK)
    px(draw, fx+8, fy+6, SKIN_DARK)

    if elder_beard:
        px(draw, fx+6, fy+7, (180, 175, 165))
        px(draw, fx+7, fy+7, (180, 175, 165))
        px(draw, fx+8, fy+7, (180, 175, 165))
        px(draw, fx+9, fy+7, (180, 175, 165))
        px(draw, fx+7, fy+8, (180, 175, 165))
        px(draw, fx+8, fy+8, (180, 175, 165))

    # --- Body / Hanfu (rows 7-12) ---
    # Collar (V-shape, traditional Chinese cross-collar 交领)
    for y in range(7, 12):
        for x in range(4, 12):
            px(draw, fx+x, fy+y, cloth_main)
    # V-collar detail
    px(draw, fx+7, fy+7, cloth_light)
    px(draw, fx+8, fy+7, cloth_light)
    px(draw, fx+6, fy+8, cloth_light)
    px(draw, fx+7, fy+8, cloth_light)
    px(draw, fx+8, fy+8, cloth_light)
    px(draw, fx+9, fy+8, cloth_light)
    # Darker edges
    px(draw, fx+4, fy+7, cloth_dark)
    px(draw, fx+11, fy+7, cloth_dark)
    px(draw, fx+4, fy+8, cloth_dark)
    px(draw, fx+11, fy+8, cloth_dark)

    # Arms (skin showing at sides)
    px(draw, fx+3, fy+8, SKIN)
    px(draw, fx+12, fy+8, SKIN)
    px(draw, fx+3, fy+9, SKIN)
    px(draw, fx+12, fy+9, SKIN)

    # Sleeves (wide sleeves for hanfu)
    px(draw, fx+3, fy+7, cloth_main)
    px(draw, fx+12, fy+7, cloth_main)
    px(draw, fx+2, fy+8, cloth_main)
    px(draw, fx+13, fy+8, cloth_main)
    px(draw, fx+2, fy+9, cloth_dark)
    px(draw, fx+13, fy+9, cloth_dark)

    # Belt/sash (腰带)
    for x in range(4, 12):
        px(draw, fx+x, fy+10, belt_color)
    px(draw, fx+7, fy+10, BELT_DARK)
    px(draw, fx+8, fy+10, BELT_DARK)

    # Lower robe
    for x in range(4, 12):
        px(draw, fx+x, fy+11, cloth_main)
    for x in range(5, 11):
        px(draw, fx+x, fy+12, cloth_main)
    # Robe slit/fold
    px(draw, fx+7, fy+11, cloth_dark)
    px(draw, fx+8, fy+11, cloth_dark)
    px(draw, fx+7, fy+12, cloth_dark)

    # --- Legs/Feet (rows 13-15) ---
    for x in range(5, 11):
        px(draw, fx+x, fy+13, cloth_main)
    px(draw, fx+5, fy+14, SHOE_DARK)
    px(draw, fx+6, fy+14, SHOE_MID)
    px(draw, fx+9, fy+14, SHOE_MID)
    px(draw, fx+10, fy+14, SHOE_DARK)
    px(draw, fx+5, fy+15, SHOE_DARK)
    px(draw, fx+6, fy+15, SHOE_DARK)
    px(draw, fx+9, fy+15, SHOE_DARK)
    px(draw, fx+10, fy+15, SHOE_DARK)


def _draw_back(draw, fx, fy, hair_style, cloth_main, cloth_dark, cloth_light,
               belt_color, has_hat, hair_color, hair_bun, headband, headband_color):
    """Back-facing character (walking up)."""

    # --- Hair ---
    if has_hat:
        for x in range(4, 12):
            px(draw, fx+x, fy+1, hair_color)
        for x in range(3, 13):
            px(draw, fx+x, fy+2, hair_color)
        for x in range(5, 11):
            px(draw, fx+x, fy+3, cloth_dark)
    else:
        for x in range(5, 11):
            px(draw, fx+x, fy+1, hair_color)
        for x in range(4, 12):
            px(draw, fx+x, fy+2, hair_color)
        for x in range(4, 12):
            px(draw, fx+x, fy+3, hair_color)
        for x in range(4, 12):
            px(draw, fx+x, fy+4, hair_color)
        px(draw, fx+4, fy+5, hair_color)
        px(draw, fx+11, fy+5, hair_color)

    if hair_bun:
        px(draw, fx+7, fy+0, hair_color)
        px(draw, fx+8, fy+0, hair_color)
        px(draw, fx+6, fy+1, HAIR_DARK)
        px(draw, fx+9, fy+1, HAIR_DARK)

    if headband and headband_color:
        for x in range(4, 12):
            px(draw, fx+x, fy+3, headband_color)

    # Neck
    px(draw, fx+7, fy+6, SKIN)
    px(draw, fx+8, fy+6, SKIN)

    # --- Body (back of hanfu) ---
    for y in range(7, 13):
        for x in range(4, 12):
            px(draw, fx+x, fy+y, cloth_main)
    # Back seam
    px(draw, fx+7, fy+8, cloth_dark)
    px(draw, fx+8, fy+8, cloth_dark)
    px(draw, fx+7, fy+9, cloth_dark)
    px(draw, fx+8, fy+9, cloth_dark)

    # Sleeves
    px(draw, fx+3, fy+7, cloth_main)
    px(draw, fx+12, fy+7, cloth_main)
    px(draw, fx+2, fy+8, cloth_main)
    px(draw, fx+13, fy+8, cloth_main)
    px(draw, fx+2, fy+9, cloth_dark)
    px(draw, fx+13, fy+9, cloth_dark)

    # Belt
    for x in range(4, 12):
        px(draw, fx+x, fy+10, belt_color)

    # Lower robe
    for x in range(5, 11):
        px(draw, fx+x, fy+13, cloth_main)

    # Feet
    px(draw, fx+5, fy+14, SHOE_DARK)
    px(draw, fx+6, fy+14, SHOE_MID)
    px(draw, fx+9, fy+14, SHOE_MID)
    px(draw, fx+10, fy+14, SHOE_DARK)
    px(draw, fx+5, fy+15, SHOE_DARK)
    px(draw, fx+6, fy+15, SHOE_DARK)
    px(draw, fx+9, fy+15, SHOE_DARK)
    px(draw, fx+10, fy+15, SHOE_DARK)


def _draw_side(draw, fx, fy, facing_right, hair_style, cloth_main, cloth_dark, cloth_light,
               belt_color, has_hat, hair_color, hair_bun, headband, headband_color):
    """Side-facing character."""

    # Mirror offset
    def sx(x):
        return fx + (x if facing_right else 15 - x)

    # --- Hair ---
    if has_hat:
        for x in range(5, 12):
            px(draw, sx(x), fy+1, hair_color)
        for x in range(4, 13):
            px(draw, sx(x), fy+2, hair_color)
        for x in range(6, 11):
            px(draw, sx(x), fy+3, cloth_dark)
    else:
        for x in range(6, 11):
            px(draw, sx(x), fy+1, hair_color)
        for x in range(5, 12):
            px(draw, sx(x), fy+2, hair_color)
        px(draw, sx(5), fy+3, hair_color)
        px(draw, sx(11), fy+3, hair_color)
        # Back hair
        px(draw, sx(11), fy+4, hair_color)
        px(draw, sx(11), fy+5, hair_color)

    if hair_bun:
        px(draw, sx(8), fy+0, hair_color)
        px(draw, sx(9), fy+0, hair_color)

    if headband and headband_color:
        for x in range(5, 12):
            px(draw, sx(x), fy+3, headband_color)

    # --- Face ---
    for x in range(6, 11):
        for y in range(3, 7):
            px(draw, sx(x), fy+y, SKIN)
    px(draw, sx(6), fy+5, SKIN_SHADOW)
    px(draw, sx(6), fy+6, SKIN_SHADOW)

    # Eye (one visible)
    px(draw, sx(7), fy+4, EYE)

    # --- Body ---
    for y in range(7, 12):
        for x in range(5, 11):
            px(draw, sx(x), fy+y, cloth_main)

    # Front collar
    px(draw, sx(6), fy+7, cloth_light)
    px(draw, sx(6), fy+8, cloth_light)

    # Sleeve
    px(draw, sx(4), fy+8, cloth_main)
    px(draw, sx(4), fy+9, cloth_dark)

    # Arm
    px(draw, sx(4), fy+7, SKIN)

    # Belt
    for x in range(5, 11):
        px(draw, sx(x), fy+10, belt_color)

    # Lower robe
    for x in range(5, 11):
        px(draw, sx(x), fy+11, cloth_main)
    for x in range(6, 10):
        px(draw, sx(x), fy+12, cloth_main)
        px(draw, sx(x), fy+13, cloth_main)

    # Feet
    px(draw, sx(6), fy+14, SHOE_DARK)
    px(draw, sx(7), fy+14, SHOE_MID)
    px(draw, sx(8), fy+14, SHOE_MID)
    px(draw, sx(6), fy+15, SHOE_DARK)
    px(draw, sx(7), fy+15, SHOE_DARK)
    px(draw, sx(8), fy+15, SHOE_DARK)


def generate_character(filename, cloth_main, cloth_dark, cloth_light,
                       belt_color=BELT_GOLD, has_hat=False,
                       hair_color=HAIR_BLACK, hair_bun=False,
                       elder_beard=False, headband=False,
                       headband_color=None):
    """Generate a 4-frame sprite sheet (64x16)."""
    img = Image.new("RGBA", (SHEET_W, SHEET_H), TRANSPARENT)
    draw = ImageDraw.Draw(img)

    directions = ['down', 'left', 'right', 'up']
    for i, direction in enumerate(directions):
        draw_chinese_character(
            draw, i * FRAME, 0, direction, "default",
            cloth_main, cloth_dark, cloth_light,
            belt_color, has_hat, hair_color, hair_bun,
            elder_beard, headband, headband_color
        )

    return img


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))

    characters = {
        "player.png": {
            "cloth_main": PLAYER_RED,
            "cloth_dark": (140, 35, 35),
            "cloth_light": (220, 80, 80),
            "belt_color": BELT_GOLD,
            "headband": True,
            "headband_color": BELT_GOLD,
        },
        "npc_guard.png": {
            "cloth_main": HANFU_RED,
            "cloth_dark": HANFU_RED_DARK,
            "cloth_light": HANFU_RED_LIGHT,
            "belt_color": BELT_GOLD,
            "has_hat": True,
        },
        "npc_merchant.png": {
            "cloth_main": MERCHANT_BLUE,
            "cloth_dark": MERCHANT_BLUE_DARK,
            "cloth_light": MERCHANT_BLUE_LIGHT,
            "belt_color": (180, 150, 100),
            "hair_bun": True,
        },
        "npc_student.png": {
            "cloth_main": STUDENT_WHITE,
            "cloth_dark": STUDENT_WHITE_DARK,
            "cloth_light": (245, 240, 235),
            "belt_color": STUDENT_BLUE,
        },
        "npc_vendor.png": {
            "cloth_main": VENDOR_GREEN,
            "cloth_dark": VENDOR_GREEN_DARK,
            "cloth_light": VENDOR_GREEN_LIGHT,
            "belt_color": (180, 140, 80),
            "headband": True,
            "headband_color": (200, 50, 50),
        },
        "npc_elder.png": {
            "cloth_main": ELDER_GREY,
            "cloth_dark": ELDER_GREY_DARK,
            "cloth_light": (180, 175, 165),
            "belt_color": ELDER_BROWN,
            "hair_color": (160, 155, 150),
            "hair_bun": True,
            "elder_beard": True,
        },
    }

    for filename, params in characters.items():
        img = generate_character(filename, **params)
        output_path = os.path.join(script_dir, filename)
        img.save(output_path, "PNG")
        print(f"Saved: {filename} ({img.size[0]}x{img.size[1]})")

    print(f"\nAll {len(characters)} character sprites generated!")


if __name__ == "__main__":
    main()
