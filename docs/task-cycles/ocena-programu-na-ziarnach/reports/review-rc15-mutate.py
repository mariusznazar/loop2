"""Mutation probes of the judging cache (review rc15): each mutation must turn the focused test file red."""

import subprocess
import sys
from pathlib import Path

WT = Path(__file__).resolve().parent / "wt"
SRC = WT / "src/browser/view/judging-cache.ts"
OUT = Path(__file__).resolve().parent / "mutate-out.txt"

MUTATIONS = [
    ("M1 exact four fields dropped", "Object.getOwnPropertyNames(value).length === FIELDS.length &&", "true &&"),
    ("M2 length bound dropped", 'typeof value !== "string" || value.length > MAX_VALUE_LENGTH', 'typeof value !== "string"'),
    ("M3 key parts not escaped", 'return String(text).replace(/[%|]/g, (sign) =>\n    sign === "%" ? "%25" : "%7C",\n  );', "return String(text);"),
    ("M4 revision drop at equal", "record.contentRevision > saved.contentRevision", "record.contentRevision >= saved.contentRevision"),
    ("M5 refused-save flag ignored", "      opening.afterRefusedSave ||\n", ""),
    ("M6 memory kept after a later good write", "        memory.delete(key);\n", ""),
    ("M7 stored value kept after refused write", "      if (storage !== null) removeFrom(storage, key);\n", ""),
    ("M8 other accounts tidied", "    if (!key.startsWith(accountPrefix)) continue;\n", ""),
    ("M9 results length unchecked", ' || text.length !== BALANCE.judgingSeeds.length', ""),
    ("M10 item named twice admitted", "      named.has(item) ||\n", ""),
    ("M11 negative revision admitted", "!isCount(held.revision, 0)", "!isCount(held.revision, -10)"),
    ("M12 generation 0 admitted", "!isCount(held.generation, 1)", "!isCount(held.generation, 0)"),
    ("M13 memory never read", "      if (held !== undefined) return copyOf(held);\n", ""),
    ("M14 other games not tidied", "      !key.startsWith(gameOwn) ||\n", ""),
    ("M15 generation drop dropped", "(character !== undefined && record.generation > character.generation) ||", "false ||"),
    ("M16 item the data lack admitted", "      !Object.hasOwn(ITEMS, item) ||\n", ""),
    ("M17 count 0 admitted", "      !isCount(count, 1)\n", "      !isCount(count, 0)\n"),
    ("M18 getItem exception escapes", "  try {\n    return storage.getItem(key);\n  } catch {\n    return null;\n  }", "  return storage.getItem(key);"),
    ("M19 lastingStorageOf lets the throw out", "  try {\n    return page.localStorage;\n  } catch {\n    return null;\n  }", "  return page.localStorage;"),
]


def main() -> int:
    original = SRC.read_bytes()
    text = original.decode("utf-8")
    lines = []
    survivors = 0
    try:
        for name, old, new in MUTATIONS:
            if text.count(old) != 1:
                lines.append(f"{name}: SKIPPED (pattern found {text.count(old)} times)")
                continue
            SRC.write_bytes(text.replace(old, new).encode("utf-8"))
            run = subprocess.run(
                "npm test -- tests/view/judging-cache.test.mjs",
                cwd=WT,
                shell=True,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                check=False,
            )
            fails = [ln for ln in run.stdout.splitlines() if ln.startswith("✖")]
            killed = run.returncode != 0
            survivors += 0 if killed else 1
            lines.append(f"{name}: exit {run.returncode} {'killed' if killed else 'SURVIVED'}; failing cases {len(fails)}")
            for ln in fails[:6]:
                lines.append(f"    {ln}")
    finally:
        SRC.write_bytes(original)
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"survivors {survivors}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
