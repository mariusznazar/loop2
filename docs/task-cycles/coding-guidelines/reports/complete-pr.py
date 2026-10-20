"""Complete the PR draft from final recorded outcomes and link immutable evidence."""
from pathlib import Path
import argparse
import json
import re

parser = argparse.ArgumentParser()
parser.add_argument("--head", required=True)
parser.add_argument("--record", default="RECORD_SHA")
args = parser.parse_args()
root = Path.cwd().resolve()
cycle = root / ".runs/task-cycles/coding-guidelines"
results = json.loads((cycle / "reports/handoff-final-gate-results.json").read_text(encoding="utf-8"))
assert len(results) == 21 and all(item["exit_code"] == 0 for item in results), "Final gate is not complete and green"
reconciled = json.loads((cycle / "reports/final-reconciliation.json").read_text(encoding="utf-8"))
assert reconciled["head"] == args.head, "Publication source differs from reconciled source"
assert (cycle / "reports/assessment-settlement-review.md").is_file(), "Final scoped review missing"
draft = cycle / "reports/pr-body-draft.md"
with draft.open(encoding="utf-8", newline="") as stream:
    text = stream.read()

outside = (
    "Recenzent wskazał poniższy zakres, którego nie oceniał jako części zadania "
    "(nie podał kotwic w kodzie):\n\n"
    "> Declined as outside this task: new styleguide/MVP features or architecture, "
    "a new browser route, additional exemplars or Python/Bash formatting, a new "
    "send-target behavioral test merely to repair a report claim, audit of "
    "system/container/non-npm dependencies, changing the pinned process checker, "
    "and repairing ten baseline remote-path warnings without evidence of a remote "
    "defect. These are not used to waive I-1 or I-2."
)
text = text.replace("TODO: końcowa lista recenzenta lub jawny brak.", outside)
text = text.replace(
    "22 przyjęte ustalenia (bez dodatkowych wpisów potwierdzonych jeszcze przez krok powrotu):",
    "22 ustalenia przyjęte w zadaniu; ich pokrycie oraz ewentualne konsekwencje kroku powrotu opisano poniżej:",
)

record_url = (
    "https://github.com/mariusznazar/loop2/blob/"
    + args.record + "/docs/task-cycles/coding-guidelines/"
)

def rewrite(match):
    label, href = match.group(1), match.group(2).strip("<>")
    norm = href.replace("\\", "/")
    if norm.startswith(cycle.as_posix() + "/"):
        suffix = norm[len(cycle.as_posix()) + 1:]
        href = record_url + re.sub(r":(\d+)$", r"#L\1", suffix)
    elif norm == root.as_posix() + "/.superpowers/sdd/plan/progress.md":
        href = record_url + "reports/sdd-progress.md"
    elif norm.startswith(root.as_posix() + "/"):
        suffix = norm[len(root.as_posix()) + 1:]
        href = (
            "https://github.com/mariusznazar/loop2/blob/" + args.head + "/"
            + re.sub(r":(\d+)$", r"#L\1", suffix)
        )
    return "[" + label + "](" + href + ")"

text = re.sub(r"\[([^\]]+)\]\(([^\n]+?)\)", rewrite, text)
def anchor_link(match):
    value=match.group(1)
    if value.startswith(root.as_posix()+"/"):
        absolute=value
    elif value.startswith((".runs/", "guidelines/")) or value.startswith("AGENTS.md:"):
        absolute=root.as_posix()+"/"+value
    else:
        return match.group(0)
    path=re.sub(r":\d+$","",absolute)
    if not Path(path).is_file():
        return match.group(0)
    return rewrite(re.match(r"\[([^\]]+)\]\(([^\n]+?)\)", "["+value+"]("+absolute+")"))
text=re.sub(r"`([^`\n]+)`",anchor_link,text)
output = cycle / "reports/pr-body-final.md"
with output.open("w", encoding="utf-8", newline="") as stream:
    stream.write(text)
print(output.as_posix())
