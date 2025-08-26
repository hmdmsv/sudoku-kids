import os
import json

INPUT_DIR = "data"
OUTPUT_DIR = "public/assets/services/sudoku/9x9"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def process_file(filename):
    puzzles = []
    with open(os.path.join(INPUT_DIR, filename), "r") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            parts = line.split()
            if len(parts) == 3 and len(parts[1]) == 81:
                try:
                    puzzle_obj = {
                        "id": parts[0],
                        "puzzle": parts[1],
                        "difficulty": float(parts[2])
                    }
                    puzzles.append(puzzle_obj)
                except ValueError:
                    print(f"⚠️ Failed to parse difficulty value: {line[:50]}...")
            else:
                print(f"⚠️ Invalid line format: {line[:50]}...")
    return puzzles

levels = ["easy", "medium", "hard", "diabolical"]

for level in levels:
    txt_file = f"{level}.txt"
    json_file = f"{level}.json"

    print(f"🔄 Processing: {txt_file}")
    puzzles = process_file(txt_file)

    with open(os.path.join(OUTPUT_DIR, json_file), "w") as f:
        json.dump(puzzles, f, indent=2)

    print(f"✅ Saved: {json_file} ({len(puzzles)} puzzles)")