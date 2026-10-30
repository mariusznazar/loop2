"""Compare merged decision identities and extract review context."""
from pathlib import Path
import re
import subprocess

root = Path(__file__).resolve().parents[3]
reports = Path(__file__).parent / "reports"

def at(ref, path):
    return subprocess.check_output(["git", "show", f"{ref}:{path}"], cwd=root).decode("utf-8")

def decisions(text):
    return {int(block.split(" ", 1)[0]): "### D-" + block for block in text.split("### D-")[1:]}

before = decisions(at("2ce1616", "foundations/decisions.md"))
target = decisions(at("56fa086", "foundations/decisions.md"))
current = decisions(at("404a1a7", "foundations/decisions.md"))
assert all(current[number].strip() == target[number].strip() for number in range(179, 191))
for number in range(179, 190):
    expected = re.sub(r"D-(18[0-9]|179)\b", lambda match: f"D-{int(match[1]) + 12}", before[number])
    if number == 184:
        # The target exempts trip-plan-only edits from progress resets.
        expected = expected.replace("editing the copy resets", "editing the copy's rules or rule groups resets")
    if current[number + 12].strip() != expected.strip():
        print("WORDING_DIFFERENCE", number, number + 12)
        import difflib
        diff = "".join(difflib.unified_diff(expected.splitlines(True), current[number + 12].splitlines(True)))
        (reports / f"merge-review-decision-{number}.txt").write_text(diff, encoding="utf-8")
print("TARGET_ENTRIES_UNCHANGED", 12)
selected = [4, 18, 23, 53, 55, 63, 64, 71, 119, 120, 122, 126, 131, 132, 136, 164, 173, 179, 183, 185, 186, 187, 188, 189, 190, *range(191, 202)]
(reports / "merge-review-foundation-context.md").write_text("\n".join(current[number] for number in selected), encoding="utf-8")
