done with concerns

# Report — executor of slice 4 (measure with one character, mode `progression`)

## Status

`done with concerns`. The slice is committed on `task/mechanizm-drabiny` as `69f74f9e`, on the base `3d272ec9`. Concerns are listed below: one reach beyond the *Change* list, two tests whose text changes, and a coverage gap in the new case.

## Commits

- `69f74f9e` feat: :sparkles: the progression measurement measures each map that another map opens also with the character built for that opener, and prints a table that sets each such map beside its opener, with the best share of each and whether the map is harder (D-448, D-428)

## Files changed

- `balance/progression.mjs`: about 158 lines changed (the measure, `candidatesOf`, `measureFrom`, `withOpenerOf`, `openerTable`, `yesOrNo`, and the return of `renderProgression`).
- `balance/check-map.mjs`: 6 lines changed. Reach (see below): `plain`, `share` and `lineOf` are now exported, not copied.
- `tests/balance/progression.test.mjs`: about 78 lines changed. One new case, two changed cases, one new case for the second table.

## What the slice does

- `measureProgression`: each map with an opener (`opensAfter`) gets, besides its own measure, the best share of its programs measured with the character of its opener. That character is the opener's `practiceIn` and the stock of the maps before the opener (their best programs as candidates), the same way `measureMap` builds a map's own character. The programs, seeds and gear are the same as for the map's own rows. The best program is picked by the existing `bestOf`.
- Each map summary gets the fields `opener` (identifier), `openerName`, `openerBestShare`, `withOpenerShare` and `harder` (`withOpenerShare < openerBestShare`). A map that opens nothing gets `null` in all of them.
- The map's own chain measurement (`rows`, `bestShare`, `solvable`, `practicePaid`) is unchanged.
- `renderProgression`: the first table and its sentence stay as they were. Below them, after a blank line, a second table: one row per map with the map name, best share (seeds header), "Can be solved", opener's name, opener's best share, best share with the opener's character, "Harder than the opener". The table names no identifier; cells for a map without an opener are `—`.
- No file is written, no clock is read, no randomness outside the seed (D-429 and the invariants are untouched).

## Checks

Each check, its command and exit code:

1. Red run, written first (before the code), `npm test -- tests/balance/progression.test.mjs`: exit 1. Output `.runs/executor-4/run-red-1.txt`. The new case "a map is also measured with the character of the map that opens it, and is harder where its best share is the smaller" fails with `AssertionError` at `tests/balance/progression.test.mjs:248` (`forest.opener` is `undefined`, expected `'forestEdge'`). The other 14 cases pass. This is the failure on the base code.
2. Green run, `npm test -- tests/balance/progression.test.mjs`: exit 0, 16 of 16 pass. Output `.runs/executor-4/run-green-1.txt`.
3. `npm test -- tests/balance/cli.test.mjs`: exit 0. Output `.runs/executor-4/tests_balance_cli_test_mjs.txt`.
4. `npm test -- tests/balance/agreement.test.mjs`: exit 0.
5. `npm test -- tests/invariants/test_balance_instrument_file_writes.py`: exit 0.
6. `npm test -- tests/invariants/test_balance_instrument_repeatability.py`: exit 0.
7. `npm test -- tests/quality/test_function_and_file_size.py`: exit 0.
8. `npm run --silent balance -- progression --maps forest --seeds 1-20 --out .runs/executor-4/progression-forest.md`: exit 0. The output file is `.runs/executor-4/progression-forest.md`. Las's second table row, at 20 seeds: best share 100 %, can be solved yes, opener Skraj lasu, opener's best share 95 %, best share with the opener's character 75 %, harder yes. The first table lists P1 to P24.
9. Extra, not in the slice's *Checks*: `npx prettier --check` on the three changed files, exit 0; `npx eslint` on the three changed files, exit 0. Outputs in `.runs/executor-4/prettier.txt` and `.runs/executor-4/eslint.txt`.

Not run: the full `npm test` (outside my boundary, the orchestrator's or CI's), `python -B .the-way/elements/common/foundation_check.py` and `python -B .the-way/instruction-files/check_instructions.py` (not in the slice's *Checks*). No foundation entry was written, and no code of the foundation is made untrue by this slice.

## Tests that changed, and why

Both changes follow from the printed text gaining its second table, as the handoff allows, and both are named here.

- "the table has one line per map and program ..." now reads only the first table: `const [firstTable] = text.split("\n\n")`. Its assertions are unchanged.
- "one sentence under the table ..." used to assert that nothing follows the sentence (`rest.length === 0`). It now asserts that exactly one block follows, and that it starts with the second table's header.
- New case: "a map is also measured with the character of the map that opens it ..." (the red-first case, see check 1).
- New case: "the second table has a row per map ..." checks the header, both rows and that no identifier of the programs is printed.

On the base code, the two changed cases and the second-table case would fail: the base prints no second table. I did not run them on the base (they were written after the red run), so that is stated by construction, not measured.

## Own-work check

- Requirement (D-448, To do 4): a map that another map opens is measured with the opener's character, and is harder when its best share is the smaller.
- Check that would catch a miss: the new case computes, with `sweep` and `buildSkills()` directly, the best share of Las on the test programs, and compares it with `withOpenerShare`; it also checks `harder` against the two shares and the opener's and empty fields for Skraj lasu. A flipped `harder` or a wrong best share is caught.
- Result: the case fails on the base and passes after the change (checks 1 and 2).

## Concerns

1. Reach beyond the *Change* list: `balance/check-map.mjs` now exports `plain`, `share` and `lineOf`. The second table needs the same cell formatting and line escaping, and `guidelines/coding-balance-instrument.md` ("Jedno miejsce wspólnej rzeczy") forbids a copy of the same function or expression in another file. The alternative was a copy of three helpers in `progression.mjs`, which that guideline rules out. No behaviour of `check-map.mjs` changes.
2. Coverage gap in the new case: Skraj lasu opens nothing, so its own practice and stock are empty by construction. The case therefore checks the opener's character only in its empty form (new character, empty chest). The path that carries a non-empty opener practice into the measure is not exercised by a test in this slice. The 20-seed run shows the effect only in aggregate (Las 75 % with the character of Skraj lasu, against 100 % on its own chain). A test with a map whose opener has a non-empty practice would need a fixture with a solved opener; none exists in the file's present data without the rung maps, which slice 1 to 3 add. I did not add one.
3. Program count: the slice's handoff says 23 reference programs; the instrument's `progression` table for `--maps forest` lists P1 to P24. I did not verify the count against `tests/sim/reference-programs.mjs` (not read). The table of the run is the evidence.
4. Cost: the mode now measures each opener's character as well, so a full run costs about twice the earlier time (the plan's own estimate). I did not time the full run; the 20-seed forest run is the only one made.

## Searches not found or unclear

- The rung term and D-464, D-465, D-466 were not read: the slice does not touch rungs, the order of maps or a rung's name (the handoff asks them only where it does).
- The count of reference programs (23 in the handoff, 24 in the run's table): not resolved, see concern 3.

## Unread material

- `balance/engine.mjs`: read only lines 85 to 165 (the handoff's range 90 to 160 and the `prerequisitesOf`, `makeState` and `startOf` in it). Lines 1 to 84 and 166 to 411 not read; the slice does not change them.
- `balance/cli.mjs`: read the progression command only (lines 485 to 520 and grep for `progression`); the rest not read.
- `tests/sim/reference-programs.mjs`: not read.
- `balance/describe.mjs`, `balance/loop.mjs`: not read; `programLabels` and `LOOP_START_MS` are imported, not changed.
- `foundations/decisions.md`: D-425 read only in its first paragraphs (thresholds, exceptions); D-464, D-465, D-466 and the glossary term `rung` not read (see above).
- `foundations/invariants.md` ranges read whole, as the handoff gives them; `foundations/part_map.md:128-138` read whole.
- `guidelines/coding.md`, `guidelines/testing.md` (read in three parts of the tool's saved output, lines 1 to 509), `guidelines/coding-balance-instrument.md`: read whole.
- `.the-way/task-cycle/change/SKILL.md` and `slice.md`: read whole. `ui_check.md` and `walkthrough.md` not read: the slice alters no screen.
- `task_frozen.md` and `plan.md` passages: read as the handoff gives them.
- `.runs/orchestrator/same-character.mjs`: read whole as an example, not imported, nothing of it used in the code.

## Working copies

No working copy (worktree, clone or script) was made. The files under `.runs/executor-4/` are check outputs, kept there because the slice's *Checks* name that directory for the balance run and the logs: `run-red-1.txt`, `run-green-1.txt`, `tests_balance_cli_test_mjs.txt` and the other test outputs of checks 3 to 7, `balance-stdout.txt`, `progression-forest.md`, `prettier.txt`, `eslint.txt`. None was removed; the directory is ignored by git.

## Questions

None. The change touches no trust boundary and holds no operation that cannot be undone.
