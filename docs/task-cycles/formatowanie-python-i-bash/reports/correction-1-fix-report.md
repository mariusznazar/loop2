# Correction 1 fix report: finding 3 (a)

**Status:** done

**Commit:** `767c9c7f` on top of `57c25292` (no amend, no rewrite). File: `foundations/decisions.md`, `+1 / -1`.

## Finding 3 (a): fixed

D-434's binding sentence now reads: "…`-i 2 -bn -ci -ln bash`: two spaces of indent, `&&` and `||` of a command list at the start of a continued line and, inside `[[ … ]]`, at the end of the line before it, indented `case` branches and Bash as the language." It now says what shfmt does inside `[[ … ]]`, as the remark asks. The wording is the reviewer's, unchanged.

Checked as true for shfmt 3.14.1 (`shfmt --version` → `v3.14.1`), `shfmt -i 2 -bn -ci -ln bash` on a probe (exit 0): `if [[ -n $a` / `  || -n $b ]]` → `if [[ -n $a ||` / `  -n $b ]]` (operator moved to the end of the line); a command list `x \` / `  || y` stays with the operator at the start of the continued line. (The same for `&&` was seen in the earlier round, and in the reformatted scripts.)

m-1 (commit message of `57c25292`): left as the findings say; the sentence now says what the message claims.

## Checks (command → exit code)

- `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors" (it compares the `decision:` quotations; the D-434 quotation ends at "`-ln bash`", before the changed words, and still stands).
- `cd tests/quality && python -B -m unittest test_quality_invariants.QualityInvariants.test_shfmt_source_format` → exit 0, `OK`.
- `python -B .the-way/instruction-files/check_instructions.py .` → exit 0.
- Not run: the product's whole gate.

## Own-work check

Requirement most likely missed: that the entry says it, not only no longer claims the opposite. Check: the changed sentence of D-434 holds both placements (`git diff`, one line), and the probe above shows each is what shfmt does.

## Reaches beyond the handoff

None.

## Unread material

none (handoff and findings read whole).

## Searches not found or unclear

none

## Working copies

`.runs/correction-1-fix/` (one probe script) stood in the worktree and was removed; nothing is kept. No other copy was made.
