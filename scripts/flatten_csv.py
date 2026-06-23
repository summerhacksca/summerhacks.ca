#!/usr/bin/env python3
"""
Flatten a CSV containing a JSON column into separate columns.

Reads a CSV with an `application_data` JSON column (default:
`application_submissions_rows.csv`) and writes a new CSV where that column
is expanded into individual columns — one per JSON key.

Usage:
    python scripts/flatten_csv.py                              # default paths
    python scripts/flatten_csv.py input.csv                    # custom input
    python scripts/flatten_csv.py input.csv output.csv         # fully custom
"""

import csv
import json
import sys
from pathlib import Path

# ── Defaults ────────────────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent
DEFAULT_IN = SCRIPT_DIR / "application_submissions_rows.csv"
DEFAULT_OUT = SCRIPT_DIR / "application_submissions_flattened.csv"
JSON_COL = "application_data"


def flatten(row: dict) -> dict:
    """Parse the JSON column in *row* and merge its keys at the top level."""
    raw = row.pop(JSON_COL, "{}")
    try:
        parsed = json.loads(raw)
    except (json.JSONDecodeError, TypeError):
        parsed = {}
    # All values must be plain strings for CSV output.
    flat = {k: str(v) if v is not None else "" for k, v in parsed.items()}
    return {**row, **flat}


def main():
    in_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_IN
    out_path = Path(sys.argv[2]) if len(sys.argv) > 2 else DEFAULT_OUT

    if not in_path.exists():
        print(f"❌ Input not found: {in_path}", file=sys.stderr)
        sys.exit(1)

    print(f"📖  Reading: {in_path}")

    # ── Parse ────────────────────────────────────────────────────────────
    rows: list[dict] = []

    with open(in_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)

        if JSON_COL not in (reader.fieldnames or []):
            print(
                f"❌ Column '{JSON_COL}' not found in CSV headers.\n"
                f"   Headers: {reader.fieldnames}",
                file=sys.stderr,
            )
            sys.exit(1)

        original_cols = [c for c in reader.fieldnames if c != JSON_COL]

        for row in reader:
            rows.append(flatten(row))

    if not rows:
        print("⚠️  No data rows — output will contain only headers.", file=sys.stderr)

    # ── Determine JSON key order (first-row order plus any stragglers) ──
    json_keys: list[str] = []
    seen: set[str] = set()

    for row in rows:
        for k in row:
            if k not in seen and k not in original_cols:
                seen.add(k)
                json_keys.append(k)

    fieldnames = original_cols + json_keys

    # ── Write ────────────────────────────────────────────────────────────
    out_path.parent.mkdir(parents=True, exist_ok=True)

    with open(out_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"✅  Wrote {len(rows)} rows → {out_path}")
    print(f"   Columns ({len(fieldnames)}): {', '.join(fieldnames)}")


if __name__ == "__main__":
    main()
