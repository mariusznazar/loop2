"""Mutate the real token file's text in memory and show what the contrast check finds."""

import sys

ROOT = "."
sys.path.insert(0, ROOT + "/tests/invariants")

import test_design_token_contrast as t  # noqa: E402

with open(ROOT + "/src/browser/tokens.css", encoding="utf-8") as f:
    text = f.read()

MUTATIONS = {
    "real file": [],
    "marker as dark as control-border grey": [("--scale-marker: #09090b", "--scale-marker: #71717b")],
    "safe zone in highlight": [("--safe-zone: #9f9fa9", "--safe-zone: #27272a")],
    "satiety fill as dark as text-disabled": [("--satiety-fill: #ff8904", "--satiety-fill: #52525c")],
    "warming frame in highlight": [("--warming-frame: #ffd230", "--warming-frame: #27272a")],
    "chill zone as the scene's chill layer, darker": [("--chill-zone: #00a6f4", "--chill-zone: #1f3f8f")],
    "satiety fill removed": [("--satiety-fill: #ff8904;", "")],
}

lines = []
for name, swaps in MUTATIONS.items():
    mutated = text
    for old, new in swaps:
        assert old in mutated, old
        mutated = mutated.replace(old, new)
    lines.append(f"{name}: {t.findings(mutated)}")

with open(ROOT + "/.runs/executor-1/probe_out.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")
