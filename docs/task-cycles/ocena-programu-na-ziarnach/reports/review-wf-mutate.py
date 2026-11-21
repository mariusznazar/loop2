"""Apply one named mutation to a file of the review worktree: exact text replaced once, LF kept."""

import sys

MUTANTS = {
    "record": (
        "src/browser/sim/saved-game.ts",
        "if (inARow > loopRecord || loopRecord > completed) refuse();",
        "if (inARow > loopRecord) refuse();",
    ),
    "focus": (
        "src/browser/view/maps-screen.tsx",
        'if (hadFocus) focus.owe({ characterId, target: "stop" });',
        'focus.owe({ characterId, target: "stop" });',
    ),
    "cardmap": (
        "src/browser/view/maps-screen.tsx",
        "if (cardMap.current !== judgedMap) {",
        "if (false) {",
    ),
    "character-guard": (
        "src/browser/sim/judging.ts",
        "  if (!character)\n    throw new Error(",
        "  if (false)\n    throw new Error(",
    ),
    "program-guard": (
        "src/browser/sim/judging.ts",
        "  if (!chosen)\n    throw new Error(",
        "  if (false)\n    throw new Error(",
    ),
    "proto": (
        "src/browser/sim/saved-game.ts",
        "  const names = Reflect.ownKeys(object);\n  if (names.length !== keys.length",
        '  const names = Reflect.ownKeys(object).filter((name) => name !== "__proto__");\n'
        "  if (names.length !== keys.length",
    ),
}

name = sys.argv[1]
path, old, new = MUTANTS[name]
with open(path, encoding="utf-8", newline="") as handle:
    text = handle.read()
if text.count(old) != 1:
    print("MISS", name, text.count(old))
    sys.exit(1)
with open(path, "w", encoding="utf-8", newline="") as handle:
    handle.write("// @ts-nocheck" + chr(10) + text.replace(old, new))
print("applied", name)
