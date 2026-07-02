#!/usr/bin/env python3
"""Batch remove background locally using rembg while preserving image quality.

Usage examples:
  python3 scripts/remove_background.py --input images/ --output out/ --format keep
  python3 scripts/remove_background.py --input images/photo.jpg --output out/photo.png

This script uses `rembg` to remove backgrounds and preserves resolution, DPI and EXIF when possible.
"""
from pathlib import Path
import argparse
import io
from rembg import remove
from PIL import Image


def ensure_dir(p: Path):
    p.parent.mkdir(parents=True, exist_ok=True)


def process_file(in_path: Path, out_path: Path, composite: str | None, out_format: str | None, jpeg_quality: int):
    ensure_dir(out_path)
    # Read original to capture metadata
    try:
        with Image.open(in_path) as orig_img:
            orig_info = orig_img.info
            dpi = orig_info.get("dpi")
            exif = orig_info.get("exif")
    except Exception:
        dpi = None
        exif = None

    with open(in_path, "rb") as f:
        inp = f.read()

    # remove background -> bytes (PNG with alpha)
    res_bytes = remove(inp)
    img = Image.open(io.BytesIO(res_bytes)).convert("RGBA")

    # Determine output format
    fmt = None
    if out_format:
        fmt = out_format.upper()
    else:
        # keep: if composite specified, choose PNG/JPEG accordingly; otherwise keep PNG (alpha)
        fmt = None

    # If composite color provided, flatten over color
    if composite:
        # composite given as hex or color name
        bg = Image.new("RGBA", img.size, composite)
        bg.paste(img, (0, 0), img)
        if fmt in ("JPG", "JPEG"):
            save_img = bg.convert("RGB")
            save_kwargs = {"quality": jpeg_quality}
            if dpi:
                save_kwargs["dpi"] = dpi
            if exif:
                save_kwargs["exif"] = exif
            save_img.save(out_path, "JPEG", **save_kwargs)
        else:
            # default PNG
            save_kwargs = {}
            if dpi:
                save_kwargs["dpi"] = dpi
            if exif:
                save_kwargs["exif"] = exif
            bg.save(out_path, "PNG", **save_kwargs)
    else:
        # Keep alpha -> always PNG to preserve transparency
        save_kwargs = {}
        if dpi:
            save_kwargs["dpi"] = dpi
        if exif:
            save_kwargs["exif"] = exif
        img.save(out_path, "PNG", **save_kwargs)


def gather_input_paths(input_arg: str):
    p = Path(input_arg)
    if p.is_dir():
        exts = (".png", ".jpg", ".jpeg", ".webp", ".tif", ".tiff", ".bmp")
        return [x for x in p.rglob("*") if x.suffix.lower() in exts]
    elif p.is_file():
        return [p]
    else:
        raise FileNotFoundError(f"Input path not found: {input_arg}")


def main():
    parser = argparse.ArgumentParser(description="Remove backgrounds locally while preserving quality")
    parser.add_argument("--input", "-i", required=True, help="Input file or directory")
    parser.add_argument("--output", "-o", required=True, help="Output file or directory")
    parser.add_argument("--composite", "-c", help="Hex color (e.g. '#ffffff') or color name to composite the result")
    parser.add_argument("--format", "-f", choices=["png", "jpg", "jpeg", "keep"], default="keep", help="Output format (keep: preserve transparency if possible)")
    parser.add_argument("--quality", type=int, default=95, help="JPEG quality when saving JPG (1-100)")
    args = parser.parse_args()

    inputs = gather_input_paths(args.input)
    out = Path(args.output)
    single_out_file = False
    if len(inputs) == 1 and (not out.exists() or not out.is_dir()):
        single_out_file = True

    for inp in inputs:
        if single_out_file:
            out_path = out
        else:
            # mirror structure when input is directory
            if Path(args.input).is_dir():
                rel = inp.relative_to(Path(args.input))
                out_path = out / rel.with_suffix("")
                # choose extension
                if args.format in ("jpg", "jpeg") or args.composite:
                    out_path = out_path.with_suffix(".jpg")
                else:
                    out_path = out_path.with_suffix(".png")
            else:
                out.mkdir(parents=True, exist_ok=True)
                out_path = out / inp.name

        print(f"Processing {inp} -> {out_path}")
        process_file(inp, out_path, args.composite, args.format if args.format != "keep" else None, args.quality)


if __name__ == "__main__":
    main()
