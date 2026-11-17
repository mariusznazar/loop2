# Executor report - slice 3 (Comments of the simulation tests)

**Status:** done
**Commit:** `7bdce4fa` (on `task/poprawki-brzmienia-fundamentu`, on top of the base `d60ad606`)
**Check result:** all focused checks run pass; ruff not run (`.runs/quality-venv` is missing).

## Files changed

- `tests/invariants/test_action_in_progress.py`: +6 / -3 lines (docstring only)
- `tests/invariants/test_program_rule_pick.py`: +11 / -5 lines (docstring only)
- `tests/invariants/test_copy_save.py`: +4 / -3 lines (docstring only)

No assertion, test body or invariant line changed. No foundation file changed.

## Items of the slice

- **7.1 (sim comments, `:184`, `:222`, `:415`, `:624`, `:727`, `:762`, `program-counts:17`):** already made at the base. `tests/sim/combat.test.mjs` now says `// Sources: D-23, D-144.` at lines 217-218 and 258-259 (the task's `:184` and `:222` have drifted to these lines). `tests/sim/encounters.test.mjs` names decisions or invariants by name (lines 480, 837, 872; the `Source:` line above `traceChunks` names `minute-span-split`). `tests/sim/program-counts.test.mjs:16` names D-92 and D-93. The three sim files contain no `.md` reference. Not changed.
- **7.3 (`test_action_in_progress.py`, `test_program_rule_pick.py`):** made. Each docstring's first paragraph now quotes the present sentence of `foundations/invariants.md` (action-in-progress: "…unless its map run ends first or an attack interrupts it, …"; program-rule-pick: "In each free game minute of a map run and immediately before the character's action in each combat turn, …"). "Does NOT cover" now names the attack interruption (action-in-progress) and the choice immediately before the action in a combat turn (program-rule-pick).
- **7.4 (`test_copy_save.py:21-23`):** made. The docstring now says a switch sets the streak, the beaten attacks and the rule counts to zero. Checked against `src/browser/sim/programs.ts`: the switch function (doc at 762-765, code with `streak: 0`, `defeatedAttacks: 0` and `zeroCounts` around 781-794). The task's range `programs.ts:744-760` now holds `discardCopyChanges`; the switch sits at 762-810. The docstring cites no line numbers. The "Controls" sentence still says "sets the streak to zero"; it is accurate and was left as it stands.
- **7.6 (`test_program_world_reference.py`, `COMPARES_STOCK`):** already made in substance, under another name. The constant is `COMPARES_QUANTITY = ("hereBelow", "temperatureBelow", "itemBelow")` at line 85, with a comment naming the stock on the tile, the temperature and the pieces of an item in the backpack. No `COMPARES_STOCK` exists in the repo. The task's sentence "test dziś nie oferuje itemBelow" no longer holds: the test builds and checks `itemBelow` conditions (lines 108, 165-175). Not changed.
- **7.12 (repeated line over `traceChunks`, `encounters:726`):** already made at the base. The comment block at lines 722-727 has no repeated line; the same block stands unchanged at `f66ae6eb` and `d60ad606`. Not changed.

## Checks

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/sim/encounters.test.mjs` | 0 | pass |
| `npm test -- tests/sim/combat.test.mjs` | 0 | pass |
| `npm test -- tests/sim/program-counts.test.mjs` | 0 | pass |
| `npm test -- tests/invariants/test_action_in_progress.py` | 0 | 2 tests OK (run before and after the last docstring edit) |
| `npm test -- tests/invariants/test_program_rule_pick.py` | 0 | 8 tests OK (before and after the last edit) |
| `npm test -- tests/invariants/test_copy_save.py` | 0 | 5 tests OK (before and after the last edit) |
| `npm test -- tests/invariants/test_program_world_reference.py` | 0 | 3 tests OK (unchanged file) |
| `npx prettier --check tests/sim/encounters.test.mjs tests/sim/combat.test.mjs tests/sim/program-counts.test.mjs` | 0 | all files formatted |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml` on the four Python files | not run | the environment `.runs/quality-venv` does not exist in the worktree; ruff is left unchecked |

Not run, on purpose: the product's full gate (`npm test` without a file argument), as the handoff says. `foundation_check.py` not run: no foundation file changed.

Test-first and the invariant-seen-failing rule do not apply: the change is prose in docstrings, no behaviour and no test logic.

## Own-work check

- Requirement: each docstring quotes the present foundation sentence word for word and names what its test does not check; the copy-save docstring matches the code.
- Check 1: `git grep -c "or an attack interrupts it, even where the program changes" -- foundations/invariants.md` gives 1 hit; the rule-pick first line `In each free game minute of a map run and immediately before the character's action in each combat turn` gives 1 hit. The wrapped continuation lines were compared by eye against `foundations/invariants.md:248-262`.
- Check 2: the switch behaviour against `src/browser/sim/programs.ts` (see 7.4).
- Result: both match. No mismatch found.

## Reach beyond the handoff

- Read `.the-way/task-cycle/change/SKILL.md` whole, `.the-way/task-cycle/change/slice.md` whole, `guidelines/coding.md` whole, `guidelines/testing.md` whole (in three reads, 495 lines), `task.md` lines 60-210 (the slice's *To do* and *Out of scope* passages, plus the surrounding list), `plan.md` lines 18-48 (the rules), `foundations/invariants.md` lines 187-197, 248-263, 386-396, 165-175, 309-318, 528-537, 848-857 (the ranges of the handoff), `src/browser/sim/programs.ts` lines 740-810 (for 7.4), and the test files' headers and comment blocks.
- Greps over `tests/sim/*` and `tests/invariants/*` for foundation references and decision numbers.

## Unread material

- `foundations/decisions.md:7530-7573` (D-23) and `foundations/decisions.md:6519-6541` (D-144): not read. No change depends on them; the existing sim comments already cite them by number.
- `foundations/glossary.md:168-184` (beaten attack, combat turn, copy): not read. Not needed for the docstring wording.
- `foundations/invariants.md:386-396` and the rest of the ranges were read only for the sentences quoted above; the other lines of the ranges were not needed.

## Searches not found or unclear

- `COMPARES_STOCK`: not found in the repo (the constant is `COMPARES_QUANTITY`).
- A repeated comment line above `traceChunks`: not found at the base.
- Line-number references `:184`, `:222` in `tests/sim/combat.test.mjs` and `:415`, `:624`, `:727`, `:762` in `tests/sim/encounters.test.mjs`: not found at those numbers; the comments that cited decisions now stand at other lines (see 7.1). Grep for `.md` and `line` in the three sim files returned nothing relevant.

## Choices

- Docstring wording for "Does NOT cover": named the other invariant clause in plain words, without a claim that another test checks it (no such check was verified).
- Kept the Python reading bullets as they stand; only the quoted sentence and the "Does NOT cover" list changed.

## Problems observed

- The first `git commit` attempt was refused by the Bash rules hook (the commit message language and form). Nothing was committed by that attempt; the retry used an English message with separate `-m` arguments and the commit went through as `7bdce4fa`.

## Working copies

- None made. Two log files were written under `.runs/` during the checks and removed before the commit; no directory `.runs/executor-3/` was created.
