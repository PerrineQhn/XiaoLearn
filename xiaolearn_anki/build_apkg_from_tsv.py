#!/usr/bin/env python3
"""Build an Anki .apkg deck from a TSV file using a local Anki template DB.

This script avoids external dependencies (no genanki).
"""

from __future__ import annotations

import argparse
import concurrent.futures
import csv
import hashlib
import json
import os
import re
import shutil
import sqlite3
import subprocess
import tempfile
import time
import zipfile
from pathlib import Path

SOURCE_NOTETYPE_ID = 1769257547756
TARGET_NOTETYPE_ID = 1769257547757
TARGET_NOTETYPE_NAME = "My Way v2"
TARGET_DECK_ID = 1769259529782
TARGET_DECK_NAME = "My Way v2 HQ"
MY_WAY_FIELD_NAMES = [
    "ID",
    "HSK_Level",
    "Simplified",
    "Pinyin",
    "Meaning",
    "Examples",
    "Tags",
    "Audio",
]
FIELD_SEP = "\x1f"
AUDIO_RE = re.compile(r"\[sound:([^\]]+)\]")
WIDGET_BLOCK_RE = re.compile(
    r'<div class="audio-on-demand"[\s\S]*?</script>',
    re.MULTILINE,
)
PLAY_ON_CLICK_WIDGET = """<div class="audio-on-demand" data-audio-raw="{{text:Audio}}" style="margin:10px 0;">
    <button type="button" class="audio-btn" style="display:inline-block !important; opacity:1 !important; visibility:visible !important; padding:8px 12px; border:1px solid #bbb; border-radius:8px; background:#fff; color:#111; font-size:14px; cursor:pointer;">🔊 Audio</button>
    <audio preload="none"></audio>
  </div>
  <script>
    (() => {
      const blocks = document.querySelectorAll('.audio-on-demand');
      for (const block of blocks) {
        const raw = (block.getAttribute('data-audio-raw') || '').trim();
        const src = raw;
        const audio = block.querySelector('audio');
        const btn = block.querySelector('.audio-btn');
        if (!src) {
          btn.disabled = true;
          btn.textContent = '🔇 Pas audio';
          continue;
        }
        audio.setAttribute('src', src);
        btn.addEventListener('click', () => {
          try {
            audio.currentTime = 0;
          } catch (e) {}
          audio.play();
        });
      }
    })();
  </script>"""


def sha1_csum(text: str) -> int:
    return int(hashlib.sha1(text.encode("utf-8")).hexdigest()[:8], 16)


def guid_for_row(row_id: str, simplified: str, pinyin: str) -> str:
    seed = f"{row_id}|{simplified}|{pinyin}".encode("utf-8")
    return hashlib.sha1(seed).hexdigest()[:10]


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Build .apkg from TSV")
    p.add_argument("--input", default="anki_mandarin_myway.tsv", help="Input TSV path")
    p.add_argument("--audio-root", default="audio", help="Audio root directory")
    p.add_argument("--output", default="anki_mandarin_myway.apkg", help="Output .apkg path")
    p.add_argument(
        "--template-db",
        default=str(Path.home() / "Library/Application Support/Anki2/Utilisateur 1/collection.anki2"),
        help="Path to an existing Anki collection.anki2 used as schema/template",
    )
    p.add_argument(
        "--skip-audio",
        action="store_true",
        help="Do not package audio files and do not inject [sound:...] into Examples",
    )
    p.add_argument(
        "--optimize-audio",
        action="store_true",
        help="Transcode referenced audio to OGG/Opus and normalize loudness for better playback in Anki",
    )
    p.add_argument(
        "--audio-profile",
        choices=["source", "opus", "wav48"],
        default="source",
        help="Audio packaging profile: source (original), opus (compressed), wav48 (HQ WAV 48kHz lossless).",
    )
    p.add_argument(
        "--optimized-audio-dir",
        default="xiaolearn_anki/audio_optimized_ogg",
        help="Directory to store transcoded audio cache",
    )
    p.add_argument(
        "--hq-audio-dir",
        default="xiaolearn_anki/audio_hq_wav48",
        help="Directory to store HQ WAV48 transcoded cache",
    )
    p.add_argument(
        "--audio-workers",
        type=int,
        default=max(1, min(6, os.cpu_count() or 1)),
        help="Number of parallel ffmpeg workers for audio optimization",
    )
    p.add_argument(
        "--audio-bitrate",
        default="96k",
        help="Target Opus bitrate (e.g. 64k, 96k, 128k)",
    )
    return p.parse_args()


def build_audio_index(audio_root: Path) -> dict[str, Path]:
    out: dict[str, Path] = {}
    for path in audio_root.rglob("*"):
        if not path.is_file():
            continue
        # Keep first match if duplicates ever happen.
        out.setdefault(path.name, path)
    return out


def remap_audio_tags(audio_col: str, rename_map: dict[str, str]) -> str:
    def _sub(m: re.Match[str]) -> str:
        original = m.group(1)
        return f"[sound:{rename_map.get(original, original)}]"

    return AUDIO_RE.sub(_sub, audio_col)


def audio_field_value_without_sound_tags(audio_col: str) -> str:
    names = AUDIO_RE.findall(audio_col)
    if not names:
        return audio_col.strip()
    # Keep a single explicit filename in the field to avoid Anki's [sound:...] auto-play parser.
    return names[0].strip()


def transcode_audio_file(src: Path, dst: Path, profile: str, bitrate: str) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    if profile == "opus":
        cmd = [
            "ffmpeg",
            "-y",
            "-v",
            "error",
            "-i",
            str(src),
            "-map",
            "a:0",
            "-af",
            "loudnorm=I=-16:TP=-1.5:LRA=11",
            "-ac",
            "1",
            "-ar",
            "48000",
            "-c:a",
            "libopus",
            "-b:a",
            bitrate,
            "-vbr",
            "on",
            "-compression_level",
            "10",
            str(dst),
        ]
    elif profile == "wav48":
        cmd = [
            "ffmpeg",
            "-y",
            "-v",
            "error",
            "-i",
            str(src),
            "-map",
            "a:0",
            "-af",
            "aresample=resampler=soxr:precision=33",
            "-ac",
            "1",
            "-ar",
            "48000",
            "-c:a",
            "pcm_s24le",
            str(dst),
        ]
    else:
        raise ValueError(f"Unsupported profile: {profile}")
    subprocess.run(cmd, check=True)


def optimize_audio_files(
    used_audio: dict[str, Path],
    optimized_dir: Path,
    workers: int,
    bitrate: str,
    profile: str,
) -> tuple[dict[str, str], dict[str, Path], set[str]]:
    rename_map: dict[str, str] = {}
    final_audio_files: dict[str, Path] = {}
    failed: set[str] = set()
    optimized_dir.mkdir(parents=True, exist_ok=True)

    # Build deterministic target names and avoid stem collisions.
    used_target_names: set[str] = set()
    target_by_original: dict[str, str] = {}
    ext = ".ogg" if profile == "opus" else ".wav"
    for original in sorted(used_audio):
        base = f"{Path(original).stem}{ext}"
        target = base
        if target in used_target_names:
            suffix = hashlib.sha1(original.encode("utf-8")).hexdigest()[:8]
            target = f"{Path(original).stem}_{suffix}{ext}"
        used_target_names.add(target)
        target_by_original[original] = target

    def _job(item: tuple[str, Path]) -> tuple[str, str, Path, str | None]:
        original, src = item
        target_name = target_by_original[original]
        dst = optimized_dir / target_name
        try:
            if dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime and dst.stat().st_size > 0:
                return original, target_name, dst, None
            transcode_audio_file(src, dst, profile, bitrate)
            return original, target_name, dst, None
        except Exception as e:  # pragma: no cover
            return original, target_name, src, str(e)

    with concurrent.futures.ThreadPoolExecutor(max_workers=max(1, workers)) as ex:
        futures = [ex.submit(_job, item) for item in sorted(used_audio.items())]
        for fut in concurrent.futures.as_completed(futures):
            original, target_name, path_to_package, err = fut.result()
            if err:
                failed.add(original)
                rename_map[original] = original
                final_audio_files.setdefault(original, path_to_package)
            else:
                rename_map[original] = target_name
                final_audio_files.setdefault(target_name, path_to_package)

    return rename_map, final_audio_files, failed


def _read_varint(data: bytes, start: int) -> tuple[int, int]:
    i = start
    shift = 0
    out = 0
    while True:
        if i >= len(data):
            raise ValueError("unexpected EOF while reading varint")
        b = data[i]
        i += 1
        out |= (b & 0x7F) << shift
        if not (b & 0x80):
            return out, i
        shift += 7
        if shift > 63:
            raise ValueError("varint too long")


def _write_varint(value: int) -> bytes:
    if value < 0:
        raise ValueError("varint cannot encode negative values")
    out = bytearray()
    v = value
    while True:
        to_write = v & 0x7F
        v >>= 7
        if v:
            out.append(to_write | 0x80)
        else:
            out.append(to_write)
            return bytes(out)


def inject_audio_token_in_template_config(config: bytes) -> bytes:
    i = 0
    out = bytearray()
    changed = False
    while i < len(config):
        key, i = _read_varint(config, i)
        field_no = key >> 3
        wire_type = key & 0x07
        out.extend(_write_varint(key))

        if wire_type == 0:
            v, i = _read_varint(config, i)
            out.extend(_write_varint(v))
            continue
        if wire_type == 1:
            out.extend(config[i:i + 8])
            i += 8
            continue
        if wire_type == 5:
            out.extend(config[i:i + 4])
            i += 4
            continue
        if wire_type != 2:
            raise ValueError(f"unsupported protobuf wire type: {wire_type}")

        length, i = _read_varint(config, i)
        payload = config[i:i + length]
        i += length

        # In Anki template config blobs:
        # field 1 = front template HTML, field 2 = back template HTML.
        if field_no in (1, 2):
            html = payload.decode("utf-8")
            # Remove previous direct token insertion if present.
            html = html.replace("<div class=\"audio-explicit\">{{Audio}}</div>\n  ", "")
            html = html.replace("<div class=\"audio-explicit\">{{Audio}}</div>", "")

            if "audio-on-demand" in html:
                new_html = WIDGET_BLOCK_RE.sub(PLAY_ON_CLICK_WIDGET, html, count=1)
            else:
                marker = "<div class=\"card-footer\">"
                if marker in html:
                    new_html = html.replace(marker, f"{PLAY_ON_CLICK_WIDGET}\n  {marker}", 1)
                else:
                    new_html = f"{html}\n{PLAY_ON_CLICK_WIDGET}"

            if new_html != html:
                payload = new_html.encode("utf-8")
                changed = True

        out.extend(_write_varint(len(payload)))
        out.extend(payload)

    return bytes(out) if changed else config


def main() -> int:
    args = parse_args()
    audio_profile = args.audio_profile
    if args.optimize_audio and audio_profile == "source":
        audio_profile = "opus"

    input_path = Path(args.input).resolve()
    audio_root = Path(args.audio_root).resolve()
    output_path = Path(args.output).resolve()
    template_db = Path(args.template_db).resolve()

    if not input_path.exists():
        raise SystemExit(f"Input TSV not found: {input_path}")
    if not template_db.exists():
        raise SystemExit(f"Template DB not found: {template_db}")
    if not args.skip_audio and not audio_root.exists():
        raise SystemExit(f"Audio directory not found: {audio_root}")

    tmpdir = Path(tempfile.mkdtemp(prefix="anki_build_", dir="/tmp"))
    temp_db = tmpdir / "collection.anki2"
    shutil.copy2(template_db, temp_db)

    epoch_secs = int(time.time())
    epoch_ms = int(time.time() * 1000)
    next_note_id = epoch_ms * 1000

    audio_index = build_audio_index(audio_root) if not args.skip_audio else {}
    used_audio: dict[str, Path] = {}

    rows = 0
    missing_audio: set[str] = set()

    con = sqlite3.connect(temp_db)
    con.create_collation(
        "unicase",
        lambda a, b: ((a or "").casefold() > (b or "").casefold()) - ((a or "").casefold() < (b or "").casefold()),
    )
    try:
        con.execute("PRAGMA journal_mode=WAL")
        con.execute("PRAGMA synchronous=OFF")
        con.execute("PRAGMA temp_store=MEMORY")

        # Safety checks for expected model/deck.
        nt = con.execute("SELECT COUNT(*) FROM notetypes WHERE id = ?", (SOURCE_NOTETYPE_ID,)).fetchone()[0]
        if nt == 0:
            raise SystemExit(f"Notetype {SOURCE_NOTETYPE_ID} not found in template DB.")
        # Create/refresh target note type from source so imports don't conflict with old local model.
        source_row = con.execute(
            "SELECT mtime_secs, usn, config FROM notetypes WHERE id = ?",
            (SOURCE_NOTETYPE_ID,),
        ).fetchone()
        tgt_exists = con.execute(
            "SELECT COUNT(*) FROM notetypes WHERE id = ?",
            (TARGET_NOTETYPE_ID,),
        ).fetchone()[0]
        if tgt_exists:
            con.execute("DELETE FROM fields WHERE ntid = ?", (TARGET_NOTETYPE_ID,))
            con.execute("DELETE FROM templates WHERE ntid = ?", (TARGET_NOTETYPE_ID,))
            con.execute(
                "UPDATE notetypes SET name = ?, mtime_secs = ?, usn = ?, config = ? WHERE id = ?",
                (TARGET_NOTETYPE_NAME, epoch_secs, 0, source_row[2], TARGET_NOTETYPE_ID),
            )
        else:
            con.execute(
                "INSERT INTO notetypes (id, name, mtime_secs, usn, config) VALUES (?, ?, ?, ?, ?)",
                (TARGET_NOTETYPE_ID, TARGET_NOTETYPE_NAME, epoch_secs, 0, source_row[2]),
            )
        source_fields = con.execute(
            "SELECT ord, name, config FROM fields WHERE ntid = ? ORDER BY ord",
            (SOURCE_NOTETYPE_ID,),
        ).fetchall()
        for ord_, name, cfg in source_fields:
            con.execute(
                "INSERT INTO fields (ntid, ord, name, config) VALUES (?, ?, ?, ?)",
                (TARGET_NOTETYPE_ID, ord_, name, cfg),
            )
        source_templates = con.execute(
            "SELECT ord, name, mtime_secs, usn, config FROM templates WHERE ntid = ? ORDER BY ord",
            (SOURCE_NOTETYPE_ID,),
        ).fetchall()
        for ord_, name, mtime, usn, cfg in source_templates:
            con.execute(
                "INSERT INTO templates (ntid, ord, name, mtime_secs, usn, config) VALUES (?, ?, ?, ?, ?, ?)",
                (TARGET_NOTETYPE_ID, ord_, name, mtime, usn, cfg),
            )

        dk = con.execute("SELECT COUNT(*) FROM decks WHERE id = ?", (TARGET_DECK_ID,)).fetchone()[0]
        if dk == 0:
            default_deck = con.execute(
                "SELECT common, kind FROM decks WHERE id = 1"
            ).fetchone()
            if not default_deck:
                raise SystemExit("Default deck (id=1) not found in template DB.")
            con.execute(
                "INSERT INTO decks (id, name, mtime_secs, usn, common, kind) VALUES (?, ?, ?, ?, ?, ?)",
                (TARGET_DECK_ID, TARGET_DECK_NAME, epoch_secs, 0, default_deck[0], default_deck[1]),
            )
        else:
            con.execute(
                "UPDATE decks SET name = ?, mtime_secs = ?, usn = ? WHERE id = ?",
                (TARGET_DECK_NAME, epoch_secs, 0, TARGET_DECK_ID),
            )

        # Force the target notetype to have exactly one field per TSV column.
        field_rows = con.execute(
            "SELECT ord, name, config FROM fields WHERE ntid = ? ORDER BY ord",
            (TARGET_NOTETYPE_ID,),
        ).fetchall()
        if not field_rows:
            raise SystemExit(f"No fields found for notetype {TARGET_NOTETYPE_ID}.")
        config_by_name = {name: config for _, name, config in field_rows}
        default_cfg = field_rows[0][2]
        con.execute("DELETE FROM fields WHERE ntid = ?", (TARGET_NOTETYPE_ID,))
        for ord_, name in enumerate(MY_WAY_FIELD_NAMES):
            cfg = config_by_name.get(name, default_cfg)
            con.execute(
                "INSERT INTO fields (ntid, ord, name, config) VALUES (?, ?, ?, ?)",
                (TARGET_NOTETYPE_ID, ord_, name, cfg),
            )

        # Ensure each My Way card template explicitly renders {{Audio}}.
        tpl_rows = con.execute(
            "SELECT ord, config FROM templates WHERE ntid = ? ORDER BY ord",
            (TARGET_NOTETYPE_ID,),
        ).fetchall()
        for ord_, cfg in tpl_rows:
            patched = inject_audio_token_in_template_config(bytes(cfg))
            if patched != bytes(cfg):
                con.execute(
                    "UPDATE templates SET config = ?, mtime_secs = ? WHERE ntid = ? AND ord = ?",
                    (patched, epoch_secs, TARGET_NOTETYPE_ID, ord_),
                )

        # Reset study data and existing notes/cards.
        con.execute("DELETE FROM revlog")
        con.execute("DELETE FROM graves")
        con.execute("DELETE FROM cards")
        con.execute("DELETE FROM notes")
        con.execute("DELETE FROM tags")

        note_rows = []
        card_rows = []
        input_rows: list[dict[str, str]] = []

        with input_path.open("r", encoding="utf-8", newline="") as f:
            reader = csv.DictReader(f, delimiter="\t")
            required = MY_WAY_FIELD_NAMES
            missing_cols = [c for c in required if c not in reader.fieldnames]
            if missing_cols:
                raise SystemExit(f"Missing required TSV columns: {', '.join(missing_cols)}")
            for row in reader:
                clean = {k: (row.get(k) or "").strip() for k in required}
                input_rows.append(clean)
                if not args.skip_audio and clean["Audio"]:
                    for audio_name in AUDIO_RE.findall(clean["Audio"]):
                        audio_path = audio_index.get(audio_name)
                        if audio_path:
                            used_audio[audio_name] = audio_path
                        else:
                            missing_audio.add(audio_name)

        rename_map: dict[str, str] = {}
        final_audio_files: dict[str, Path] = {}
        optimize_failed: set[str] = set()
        if not args.skip_audio:
            if audio_profile in ("opus", "wav48") and used_audio:
                target_dir = Path(args.optimized_audio_dir).resolve()
                if audio_profile == "wav48":
                    target_dir = Path(args.hq_audio_dir).resolve()
                rename_map, final_audio_files, optimize_failed = optimize_audio_files(
                    used_audio=used_audio,
                    optimized_dir=target_dir,
                    workers=args.audio_workers,
                    bitrate=args.audio_bitrate,
                    profile=audio_profile,
                )
            else:
                final_audio_files = {name: path for name, path in used_audio.items()}

        for i, row in enumerate(input_rows, start=1):
            row_id = row["ID"]
            hsk = row["HSK_Level"]
            simplified = row["Simplified"]
            pinyin = row["Pinyin"]
            meaning = row["Meaning"]
            examples = row["Examples"]
            tags = row["Tags"]
            audio_col = row["Audio"]
            if rename_map and audio_col:
                audio_col = remap_audio_tags(audio_col, rename_map)
            audio_col = audio_field_value_without_sound_tags(audio_col)

            flds = FIELD_SEP.join(
                [
                    row_id,
                    hsk,
                    simplified,
                    pinyin,
                    meaning,
                    examples,
                    tags,
                    audio_col,
                ]
            )

            note_id = next_note_id + i
            guid = guid_for_row(row_id, simplified, pinyin)
            sfld = row_id or simplified
            csum = sha1_csum(sfld)

            note_rows.append(
                (
                        note_id,
                        guid,
                        TARGET_NOTETYPE_ID,
                        epoch_secs,
                        0,
                        "",
                    flds,
                    sfld,
                    csum,
                    0,
                    "",
                )
            )

            due = i
            for ord_ in (0, 1, 2):
                card_rows.append(
                    (
                            note_id * 10 + ord_,
                            note_id,
                            TARGET_DECK_ID,
                        ord_,
                        epoch_secs,
                        0,
                        0,
                        0,
                        due,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        "",
                    )
                )

            rows += 1

        con.executemany(
            """
            INSERT INTO notes
            (id, guid, mid, mod, usn, tags, flds, sfld, csum, flags, data)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            note_rows,
        )

        con.executemany(
            """
            INSERT INTO cards
            (id, nid, did, ord, mod, usn, type, queue, due, ivl, factor, reps, lapses, left, odue, odid, flags, data)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            card_rows,
        )

        con.execute("UPDATE col SET mod = ?, scm = ?", (epoch_ms, epoch_ms))
        con.commit()

    finally:
        con.close()

    media_map: dict[str, str] = {}
    audio_for_package = final_audio_files if not args.skip_audio else {}
    for idx, audio_name in enumerate(sorted(audio_for_package)):
        media_map[str(idx)] = audio_name

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        zf.write(temp_db, arcname="collection.anki2")
        zf.writestr("media", json.dumps(media_map, ensure_ascii=False, separators=(",", ":")))
        for idx, audio_name in enumerate(sorted(audio_for_package)):
            zf.write(audio_for_package[audio_name], arcname=str(idx))

    # Cleanup temporary files.
    shutil.rmtree(tmpdir, ignore_errors=True)

    print(f"Created: {output_path}")
    print(f"Rows: {rows}")
    print(f"Notes: {rows}")
    print(f"Cards: {rows * 3}")
    print(f"Audio packaged: {len(audio_for_package)}")
    if audio_profile != "source" and not args.skip_audio:
        if audio_profile == "opus":
            print("Audio optimized: yes (OGG/Opus + loudnorm)")
        elif audio_profile == "wav48":
            print("Audio optimized: yes (HQ WAV 48kHz lossless)")
        if optimize_failed:
            print(f"Audio optimization fallback to original: {len(optimize_failed)}")
    if missing_audio:
        print(f"Audio missing: {len(missing_audio)}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
