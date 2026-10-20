"""Record a controller ruling and the next sequential dispatch."""

import argparse
import datetime
from pathlib import Path
import subprocess

parser = argparse.ArgumentParser()
parser.add_argument("stage")
parser.add_argument("verdict")
parser.add_argument("details")
parser.add_argument("--next")
parser.add_argument("--author")
parser.add_argument("--model", default="gpt-6.1-sol high")
args = parser.parse_args()
reports = Path(__file__).resolve().parent
root = reports.parents[3]
head = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=root, text=True).strip()
stamp = datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds")
event = (f"| {stamp} | {args.stage} {args.verdict} | root; assigned independent reviewer | "
         f"{head}; reports/{args.stage.lower()}-review.md | cycle ruling | {args.details} |")
ledger = f"Task {args.stage}: {args.verdict} at {head}. {args.details}"
if args.next:
    assert args.author
    brief = f"reports/{args.next.lower()}-handoff.md"
    assert (reports.parent / brief).exists()
    event += (f"\n| {stamp} | {args.next} dispatch | {args.author}, {args.model} | "
              f"{brief}; start {head} | reports/{args.next.lower()}-report.md expected | sequential fresh author |")
    ledger += f"\n\nTask {args.next}: dispatched from {head} to {args.author}; {brief}."
path = reports.parent / "cycle.md"
with path.open(encoding="utf-8", newline="") as stream:
    text = stream.read()
line_end = "\r\n" if "\r\n" in text else "\n"
marker = "## Questions and autonomous choices"
assert marker in text
text = text.replace(marker, line_end + event.replace("\n", line_end) + line_end + marker, 1)
with path.open("w", encoding="utf-8", newline="") as stream:
    stream.write(text)
with (root / ".superpowers/sdd/plan/progress.md").open("a", encoding="utf-8", newline="") as stream:
    stream.write("\n" + ledger + "\n")
print(head)
print(f"Recorded {args.stage}: {args.verdict}; next {args.next or 'none'}")
