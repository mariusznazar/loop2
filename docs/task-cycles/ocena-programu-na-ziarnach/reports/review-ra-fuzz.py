"""Reviewer's probe: compare the old cuts (c36e2739) with tests/invariants/source_lexer.py on
random token soups and on every tracked TS/JS file; report where an old view sees a forbidden
name or a string the new view does not."""

import os
import random
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REVIEW = os.path.dirname(HERE)
WT = os.path.join(REVIEW, "wt")
sys.path.insert(0, os.path.join(WT, "tests", "invariants"))
sys.path.insert(0, os.path.join(REVIEW, "old"))

import old_balance_source_scan as ob  # noqa: E402
import old_test_content_identifiers as oc  # noqa: E402
import old_test_simulation_isolation as oi  # noqa: E402
import old_test_simulation_randomness as orr  # noqa: E402
import source_lexer as new  # noqa: E402

NAMES = ["Math", "random", "crypto", "writeFile", "Date", "now", "import", "fs", "forest"]
TOKENS = [
    "`", "${", "}", "{", "/", "//", "/*", "*/", "'", '"', "\\", " ", "\n", "(", ")", "=",
    "return ", "[", "]", ".", ",", "x", "1", "a/b", "re", "g",
] + NAMES * 2


def words(text):
    return set(re.findall(r"(?<![\w$])[A-Za-z_$][\w$]*(?![\w$])", text))


def compare(text, out):
    # randomness: old split_source vs new code_only + string_values
    old_code, old_strings = orr.split_source(text)
    new_code, new_strings = new.code_only(text), new.string_values(text)
    lost = (words(old_code) - words(new_code)) & set(NAMES)
    if lost:
        out.append(("randomness-code", lost, text))
    lost_s = set(old_strings) - set(new_strings)
    if lost_s:
        out.append(("randomness-strings", lost_s, text))
    # balance
    lost = (words(ob.code_only(text)) - words(new.code_only(text))) & set(NAMES)
    if lost:
        out.append(("balance-code", lost, text))
    lost_s = set(ob.string_values(text)) - set(new.string_values(text))
    if lost_s:
        out.append(("balance-strings", lost_s, text))
    # isolation
    lost = (words(oi.without_comments(text)) - words(new.without_comments(text))) & set(NAMES)
    if lost:
        out.append(("isolation-without_comments", lost, text))
    lost = (words(oi.code_only(text)) - words(new.code_only(text))) & set(NAMES)
    if lost:
        out.append(("isolation-code_only", lost, text))
    # content identifiers
    lost = (words(oc.without_comments(text)) - words(new.without_comments(text))) & set(NAMES)
    if lost:
        out.append(("content-identifiers", lost, text))


def main():
    out = []
    rng = random.Random(7)
    for _ in range(int(sys.argv[1]) if len(sys.argv) > 1 else 200000):
        text = "".join(rng.choice(TOKENS) for _ in range(rng.randint(1, 14)))
        compare(text, out)
    files = subprocess.run(
        ["git", "-C", WT, "ls-files", "*.ts", "*.tsx", "*.mjs", "*.js", "*.cjs", "*.mts"],
        capture_output=True, text=True, check=True,
    ).stdout.split()
    tracked_out = []
    for rel in files:
        with open(os.path.join(WT, rel), encoding="utf-8", errors="replace") as handle:
            text = handle.read()
        before = len(tracked_out)
        compare(text, tracked_out)
        for item in tracked_out[before:]:
            tracked_out[tracked_out.index(item)] = (item[0], item[1], rel)
    kinds = {}
    for kind, lost, text in out:
        kinds.setdefault(kind, []).append((lost, text))
    with open(os.path.join(HERE, "fuzz-out.txt"), "w", encoding="utf-8") as report:
        report.write(f"tracked files: {len(files)}, losses on tracked files: {len(tracked_out)}\n")
        for item in tracked_out:
            report.write(repr(item) + "\n")
        for kind, items in kinds.items():
            report.write(f"\n== {kind}: {len(items)} texts\n")
            seen = set()
            for lost, text in sorted(items, key=lambda it: len(it[1])):
                key = (frozenset(lost), "${" in text)
                if len(seen) > 40:
                    break
                if text in seen:
                    continue
                seen.add(text)
                report.write(f"{sorted(lost)!r}  {text!r}\n")
    print("losses", len(out), "tracked", len(tracked_out))


main()
