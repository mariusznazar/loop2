# Correction 1 report: the human's remarks (round 1)

**Status:** done

**Commit:** `57c25292` on top of `a89fadad` (nothing rewritten). Files: `foundations/decisions.md`, `+2 / -2`.

## Remarks

- **3 (a), N-1: fixed.** Verified first with shfmt 3.14.1 (`.runs/quality-venv/Scripts/shfmt.exe --version` → `v3.14.1`), on a probe script, command `shfmt -i 2 -bn -ci -ln bash probe2.sh` (copy kept as `reports/correction-1-probe.sh`; exit 0):
  - input `if [[ -n $a` / `  && -n $b ]]` (operator at the start of the line inside `[[ ]]`) → output `if [[ -n $a &&` / `  -n $b ]]`: shfmt moves the operator to the end of the line;
  - input `if [[ -n $a &&` / `  -n $b ]]` stays as it is;
  - input `first arg \` / `  && second arg` (a command list) → unchanged, `&&` at the start of the continued line.
  The reformatted scripts show the same: `deploy/loop2-watch:495` and `:608` have `&&` and `||` at the end of a line inside `[[ … ]]`, `deploy/loop2-deploy:139` and `:291` have `&&` at the start of a line between commands. So the reviewer's claim holds.
  - Words changed, in D-434 only: the binding sentence now reads "`&&` and `||` of a command list at the start of a continued line" (was "`&&` and `||` at the start of a continued line"), and the *Rationale* "`-bn -ci` leave `&&` between commands at the start of a line" (was "leave `&&` at the start of a line").
  - Other places searched for the same gloss: invariant `shfmt-source-format` (names flags only, no gloss), `guidelines/coding.md` `### Formatter` and its Bash examples (no gloss; the examples hold no operator), `README.md` (flags only), D-434 *Rejected* ("operators move to the end of a line" speaks of shfmt's defaults without `-bn` and stays true). No change there.
  - The `decision:` quotation of D-434 in `tests/quality/test_quality_invariants.py` ends at "`-ln bash`", before the changed words, so it is untouched.
- **1, 2, 3 (b), 4:** no edit, as the remarks say. (The commit message of `57c25292` says shfmt "leaves them at the end inside [[ ]]"; the entry does not state that, it only no longer claims the opposite. I did not amend, as the commits stay.)

## Checks (command → exit code)

- `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors" (it compares the `decision:` quotations).
- `python -B .the-way/instruction-files/check_instructions.py .` → exit 0.
- `cd tests/quality && python -B -m unittest test_quality_invariants.QualityInvariants.test_shfmt_source_format` → exit 0, `OK` (the test that quotes the sentence's start).
- Not run: the product's whole gate.

## Own-work check

Requirement most likely missed: that every place repeating the gloss is made true and nothing else is changed. Checked by `git diff --stat` (2 lines) and a search of the decision, invariant, guidelines and README for the words `&&`, `||`, "start of a line" in connection with shfmt; the two found were changed, no other.

## Reaches beyond the handoff

None.

## Unread material

none (handoff and remarks read whole; `.the-way/task-cycle/change/SKILL.md` and `fix.md` were read in the earlier rounds).

## Searches not found or unclear

none

## Working copies

`.runs/correction-1/` (the probe scripts) stood in the worktree; removed. The probe `probe2.sh` is kept as `.runs/task-cycles/formatowanie-python-i-bash/reports/correction-1-probe.sh`. No other copy was made.
