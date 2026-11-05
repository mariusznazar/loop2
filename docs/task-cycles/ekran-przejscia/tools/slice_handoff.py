"""Build the handoff of one slice of the plan, for the cycle `ekran-przejscia`.

Usage: python -B slice_handoff.py <slice-number> <variant-text> <out-path> [<extra-notes-file>]
Run from the worktree root. Reads plan.md, task.md, the foundation and entries_map.txt.
"""
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path.cwd()
REC = ROOT / ".runs/task-cycles/ekran-przejscia"


def read(p):
    return Path(p).read_text(encoding="utf-8")


def section(plan, n):
    m = re.search(r"(?ms)^### Slice %d — .*?(?=^### Slice \d+ — |^## )" % n, plan)
    return m.group(0).rstrip() + "\n"


def entry_range(path, ident, level):
    lines = read(ROOT / path).splitlines()
    head = re.compile(r"^%s %s( |$)" % ("#" * level, re.escape(ident)))
    nxt = re.compile(r"^#{1,%d} " % level)
    start = None
    for i, line in enumerate(lines, 1):
        if start is None and head.match(line):
            start = i
        elif start is not None and nxt.match(line):
            return start, i - 1
    return (start, len(lines)) if start else None


def entries_map():
    p = REC / "tools/entries_map.txt"
    out = {}
    if p.exists():
        for line in read(p).splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                out[k.strip()] = v.strip()
    return out


def main():
    n = int(sys.argv[1])
    variant = sys.argv[2]
    out = Path(sys.argv[3])
    extra = read(sys.argv[4]) if len(sys.argv) > 4 else ""
    plan = read(REC / "plan.md")
    sec = section(plan, n)
    task_lines = read(REC / "task.md").splitlines()
    head = subprocess.run(["git", "rev-parse", "--short", "HEAD"], capture_output=True,
                          text=True, check=True).stdout.strip()
    read_m = re.search(r"(?ms)^- \*\*Read:\*\*(.*?)(?=^- \*\*Model)", sec)
    items = [i.strip() for i in re.split(r" · |\n", read_m.group(1)) if i.strip()]
    task_parts, found, files, entries = [], [], [], []
    emap = entries_map()
    for it in items:
        it = it.rstrip(" ·").strip()
        m = re.match(r"`\.runs/task-cycles/ekran-przejscia/task\.md:(\d+)-(\d+)` (.*)", it)
        if m:
            a, b = int(m.group(1)), int(m.group(2))
            task_parts.append("#### task.md:%d-%d — %s\n\n%s\n" % (
                a, b, m.group(3), "\n".join(task_lines[a - 1:b])))
            continue
        m = re.match(r"`foundations/(decisions|invariants)\.md:\d+-\d+` (.*)", it)
        if m:
            kind = m.group(1)
            for ident in re.findall(r"D-\d+" if kind == "decisions" else r"[a-z0-9-]{4,}",
                                    m.group(2)):
                if kind == "invariants" and ident in ("and",):
                    continue
                r = entry_range("foundations/%s.md" % kind, ident, 3 if kind == "decisions" else 2)
                found.append("- %s — `foundations/%s.md:%s`" % (
                    ident, kind, "%d-%d" % r if r else "NOT FOUND"))
            continue
        m = re.match(r"`foundations/part_map\.md:\d+-\d+` (.*)", it)
        if m:
            r = entry_range("foundations/part_map.md", m.group(1).strip(), 2)
            found.append("- part `%s` — `foundations/part_map.md:%s`" % (
                m.group(1).strip(), "%d-%d" % r if r else "NOT FOUND"))
            continue
        if it.startswith("Foundation entr"):
            for e in re.findall(r"E\d+", it):
                desc = emap.get(e, "see the plan's *Foundation entries*")
                m2 = re.match(r"(D-\d+)", desc)
                if m2:
                    r = entry_range("foundations/decisions.md", m2.group(1), 3)
                    desc += " — `foundations/decisions.md:%d-%d`" % r
                elif "terrain-drawing-numbers" in desc:
                    r = entry_range("foundations/invariants.md", "terrain-drawing-numbers", 2)
                    desc += " — `foundations/invariants.md:%d-%d`" % r
                entries.append("- %s — %s" % (e, desc))
            continue
        files.append("- " + it)
    text = []
    text.append("# Handoff — Slice %d of the task cycle `ekran-przejscia`\n" % n)
    text.append(read(REC / "tools/handoff_common.md").replace("{HEAD}", head).replace(
        "{VARIANT}", variant).replace("{N}", str(n)))
    if extra:
        text.append("## Orchestrator's notes for this slice\n\n" + extra.rstrip() + "\n")
    text.append("## The slice's section of the plan, word for word (`plan.md`)\n\n" + sec)
    text.append("## What you read\n\nThe ranges below are current at %s; where they differ from the "
                "plan's, these hold.\n" % head)
    if found:
        text.append("### Foundation entries, each whole\n\n" + "\n".join(found) + "\n")
    if entries:
        text.append("### Entries written by the cycle's foundation step\n\n" + "\n".join(entries) + "\n")
    if files:
        text.append("### Files (whole unless a range is given)\n\n" + "\n".join(files) + "\n")
    if task_parts:
        text.append("### Passages of the frozen task, word for word "
                    "(`.runs/task-cycles/ekran-przejscia/task.md`)\n\n" + "\n".join(task_parts))
    out.write_text("\n".join(text), encoding="utf-8")
    missing = sum(1 for f in found if "NOT FOUND" in f)
    print("written", out.name, "head", head, "missing", missing)


main()
