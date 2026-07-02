#!/usr/bin/env python3
"""
Build higher-resolution PNGs for print.
- Upscale small images to a minimum long side.
- Keep larger images at native size.
- Apply mild sharpening/contrast.
- Write to images_hd/ with same structure.
"""

from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter

SRC_DIR = Path(__file__).parent / "images"
DEST_DIR = Path(__file__).parent / "images_hd"

# Target minimum long side for print clarity.
TARGET_MIN_LONG_SIDE = 512

# Mild enhancement to avoid halos.
SHARPEN_RADIUS = 1
SHARPEN_PERCENT = 130
SHARPEN_THRESHOLD = 2
CONTRAST = 1.05


def normalize_mode(img: Image.Image) -> Image.Image:
    if img.mode == "P" and "transparency" in img.info:
        return img.convert("RGBA")
    if img.mode not in ("RGBA", "RGB"):
        return img.convert("RGBA")
    return img


def process_image(src: Path, dest: Path) -> tuple[tuple[int, int], tuple[int, int]]:
    with Image.open(src) as base:
        img = normalize_mode(base)
        w, h = img.size
        long_side = max(w, h)

        if long_side < TARGET_MIN_LONG_SIDE:
            scale = TARGET_MIN_LONG_SIDE / long_side
            new_size = (round(w * scale), round(h * scale))
            img = img.resize(new_size, Image.Resampling.LANCZOS)
        else:
            new_size = (w, h)

        img = img.filter(
            ImageFilter.UnsharpMask(
                radius=SHARPEN_RADIUS,
                percent=SHARPEN_PERCENT,
                threshold=SHARPEN_THRESHOLD,
            )
        )
        if CONTRAST != 1.0:
            img = ImageEnhance.Contrast(img).enhance(CONTRAST)

        dest.parent.mkdir(parents=True, exist_ok=True)
        img.save(dest, "PNG", optimize=True)

        return (w, h), new_size


def main() -> None:
    if not SRC_DIR.exists():
        raise SystemExit(f"Source folder not found: {SRC_DIR}")

    files = sorted(SRC_DIR.rglob("*.png"))
    if not files:
        raise SystemExit("No PNG files found.")

    print(f"Source: {SRC_DIR}")
    print(f"Dest:   {DEST_DIR}")
    print(f"Files:  {len(files)}")
    print(f"Min long side: {TARGET_MIN_LONG_SIDE}px\n")

    upscaled = 0
    for src in files:
        rel = src.relative_to(SRC_DIR)
        dest = DEST_DIR / rel
        (w, h), (nw, nh) = process_image(src, dest)
        if (w, h) != (nw, nh):
            upscaled += 1
            tag = "up"
        else:
            tag = "ok"
        print(f"{tag:>2} {rel}  {w}x{h} -> {nw}x{nh}")

    print(f"\nDone. Upscaled: {upscaled}/{len(files)}")


if __name__ == "__main__":
    main()
