# Fix 1 report: findings of the review of the whole change

**Status:** done

**Commit:** `c00c0057` on top of `2d3b33c8b8cf036a2c653a17514421f6f8ab4647` (no earlier commit rewritten or amended; the hash `7d091cd9` in `.git-blame-ignore-revs` stands).

**Files changed:** `foundations/decisions.md` `+3 / -3`.

## Findings

- **I-1 (blocking, the orchestrator carries it in the request): not changed in the repository, as the findings file says.** I hold no other place of the repository that must carry it: the human step (reinstall the three scripts on the host from the merge commit, with `cmp`, until then three warnings per deployment, syntax trees equal) belongs to the request. No edit made.
- **M-1: fixed.** In D-434, "about 170" became "about 180" in the three places (*Rationale* once, *Rejected* twice), matching the task's 176; in D-433 *Rationale* "The counts of lines and files" became "The counts of lines". Shown by: `grep -rn "about 170\|counts of lines and files" foundations guidelines` finds nothing now (it found the four places before); `git diff --stat` shows only `foundations/decisions.md`, 3 lines.
- **M-2: not touched**, as the findings file says (no commit rewritten).

## Checks

- `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors".
- No `decision:` quotation is affected: the changed text is in *Rationale* and *Rejected*, and the quotations of D-433, D-434 and D-424 stand in binding sentences, which I did not touch; the foundation check, which compares them, passes. The quality tests were not rerun for that reason.
- Not run: the product's whole gate.

## Own-work check

Requirement most likely missed: that the new figure matches the source. The task says 176 changed lines (`task-frozen.md`, *Context*: "z wcięciem dwóch spacji (`-i 2`, jak dziś) 176"); 176 rounds to about 180, and the sentence of *Rationale* beside it ("about 1 600 … against about 180") reads as before. The other rounded figures were not changed.

## Reaches beyond the handoff

None.

## Unread material

none (the handoff, the findings file and `.the-way/task-cycle/change/fix.md` read whole; the review report was not opened, the findings file holds its words).

## Searches not found or unclear

none

## Working copies

None made; `.runs/fix-1/` was not created.
