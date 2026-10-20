"""Prepare operational review handoffs without reading product diffs into root."""

import argparse
import datetime
from pathlib import Path
import subprocess

parser = argparse.ArgumentParser()
parser.add_argument("stage")
parser.add_argument("base")
parser.add_argument("head")
parser.add_argument("--note", default="")
parser.add_argument("--model", default="gpt-6.1-sol high")
args = parser.parse_args()
reports = Path(__file__).resolve().parent
root = reports.parents[3]
cycle = reports.parent

def git(*arguments):
    return subprocess.check_output(["git", *arguments], cwd=root, text=True).strip()

base, head = (git("rev-parse", value) for value in (args.base, args.head))
short_base, short_head = base[:7], head[:7]
package = f".superpowers/sdd/plan/review-{short_base}..{short_head}.diff"
helper = "C:/Users/Mariusz/.claude/plugins/cache/claude-plugins-official/superpowers/6.4.1/skills/subagent-driven-development/scripts/review-package"
subprocess.run(["C:/Program Files/Git/bin/bash.exe", helper,
                ".runs/task-cycles/coding-guidelines/plan.md", base, head, package],
               cwd=root, check=True)
rows = git("diff", "--numstat", base, head).splitlines()
added = sum(int(row.split("\t")[0]) for row in rows)
removed = sum(int(row.split("\t")[1]) for row in rows)
guidelines = sorted((root / "guidelines").glob("coding*.md"))
selection = ("Current coding guidelines to select against your scope using reading.md: " +
             ", ".join(str(path.relative_to(root)).replace(chr(92), "/") for path in guidelines)) if guidelines else (
             "No product guidelines yet; this task creates them. Verify absence and scope via reading.md.")
stage = args.stage.lower()
handoff = f"""# Review {args.stage}: spec compliance and quality

Read reviewer-contract.md and exact Superpowers 6.4.1 task-reviewer-prompt.md. This is task-scoped review, not final whole-branch review. No product changes, subagents or routine test repeats. Worktree {root.as_posix()}.

Requirements: {stage}-handoff.md and its complete authoritative dependencies. Author report: {stage}-report.md (same directory). Base {base}; head {head}. Read assigned diff once: {package}. Changed {len(rows)} files, +{added}/-{removed}. The author's claims are unverified; inspect the diff and complete evidence. Check actual sharpness and weakest-point evidence. Separate code and document passes when both change.

{selection}

{args.note}

Grade and scope every finding independently under the contract. State both spec-compliance and task-quality verdicts. Preserve every failed/unchecked result. Full report .runs/task-cycles/coding-guidelines/reports/{stage}-review.md. Return concise verdicts, range, full report path and all unresolved findings. No external comments or next-stage invocation.
"""
(reports / f"{stage}-review-handoff.md").write_text(handoff, encoding="utf-8", newline="")
stamp = datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds")
event = (f"\n| {stamp} | {args.stage} return/review dispatch | author; fresh reviewer {args.model} | "
         f"{short_base}..{short_head}; reports/{stage}-review-handoff.md | "
         f"reports/{stage}-report.md; reports/{stage}-review.md expected | "
         f"{len(rows)} files +{added}/-{removed}; {args.note} |\n")
cycle_path = cycle / "cycle.md"
with cycle_path.open(encoding="utf-8", newline="") as stream:
    cycle_text = stream.read()
line_end = "\r\n" if "\r\n" in cycle_text else "\n"
marker = "## Questions and autonomous choices"
assert marker in cycle_text
cycle_text = cycle_text.replace(marker, event.replace("\n", line_end) + marker, 1)
with cycle_path.open("w", encoding="utf-8", newline="") as stream:
    stream.write(cycle_text)
with (root / ".superpowers/sdd/plan/progress.md").open("a", encoding="utf-8", newline="") as stream:
    stream.write(f"\nTask {args.stage}: authored at {short_head}; review dispatched, pending. "
                 f"{len(rows)} files +{added}/-{removed}. Handoff reports/{stage}-review-handoff.md; "
                 f"range {short_base}..{short_head}. {args.note}\n")
print(f"{stage}: {base}..{head}; {len(rows)} files +{added}/-{removed}")
print((reports / f"{stage}-review-handoff.md").as_posix())
