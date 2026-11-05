# Report — fix of the return step's finding 1

**Status:** done
**Commit:** eb3d3f5 (base c9e5eb0). File: foundations/decisions.md, +1 -1 (line 6177 only).

## Finding 1 — fixed
D-291 Verification "complies" example now reads „Zapas poniżej 8 · Patyk → Zbierz — Patyk”, matching the "violates" line and D-291's sibling examples (lines 6086, 6352, 6457). Check: grep for "Zapas poniżej 8" shows no lower-case target left. No rule, Relations, Rejected or Minor finding touched.

## Checks
- python -B .the-way/elements/common/foundation_check.py: exit code 0, "0 errors" (run unpiped, output to file).
- Not run: full gate (per handoff).

## Own-work check
Requirement most likely missed: the same lower-case spelling elsewhere in D-291. Grep of "Zapas poniżej 8" in decisions.md: all four hits now use "Patyk".

## Reaches beyond the handoff
none. Note: I did not read read.md/decide_entry.md of the record-decision element; the edit is a one-word spelling correction to an existing example, with no new entry or search needed.

**Searches not found or unclear:** none
