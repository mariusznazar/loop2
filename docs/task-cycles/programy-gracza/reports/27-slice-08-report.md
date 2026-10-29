# Slice 8 report

**Status:** done (one UI state unchecked, see below)

**Commit:** 0391518 `feat: :sparkles: add the program list to each headquarters row and send with it` (base 5e5a844)

**Files:** src/browser/view/headquarters.ts (new pure `programPositions`, one "Program:" list per row, controls `pick` and `send(..., programId)`, rows rebuilt when team, solved maps or program ids/names change; otherwise each list only set to `rowProgram`), src/browser/view/game-view.ts (pick -> `pickProgram` after `clock.flush()`, send passes the number), src/browser/view/clock.ts (`send` ids carry optional `programId`), src/browser/styles.css (label colour), tests/view/headquarters.test.mjs (+3 tests), tests/view/clock.test.mjs (+1 test).

## Checks
- First failing case, `npm test -- tests/view/headquarters.test.mjs`, exit 1 (stub returning empty): "the row of a character that has not gone shows the first program of the list" failed on the assertion. Same command after the code: exit 0.
- `npm run typecheck` exit 0.
- `npm test -- tests/view/clock.test.mjs` exit 0 (new test: send with the second program's number reaches `run.copy.programId`; send without it uses the first program).
- `npm test -- tests/invariants/test_browser_view_token_values.py` exit 0.
- `npm test -- tests/quality/test_quality_invariants.py` exit 0 (prettier check also clean on changed files).
- Gate (`npm test` without arguments) not run, as told.

## Own-work check
Requirement most likely unmet: a pick must survive the rows' rebuilds and be what "Wyślij" sends. Checked in the real browser (below): pick kept after creating another character; send used the shown program. A weak tautological test ("one list per row") was removed; one-list-per-row is by construction (the list is built once per row outside the map loop) and was seen with 1 select per row. Not covered by a unit test: DOM wiring (no DOM tests in the repo).

## UI check (D-75, D-88)
Route: `LOOP2_LISTEN_PORT=34561 npm run dev`; Playwright intercepted only `**/api/account` (200, made-up account, header x-qa-slice: programy-8); real clicks and keys (ArrowDown on the list, selectOption, clicks). Console: 0 errors, 0 warnings. Server stopped by PID 24268; port free; main checkout `C:/Storage/repos/loop2` clean. Viewport 1600x1000. Screenshots in `.runs/task-cycles/programy-gracza/reports/`:
- 28-slice-08-01-two-rows.png: two characters, one list each, a not-yet-gone character shows "Program" (first).
- 28-slice-08-02-bob-picked-focus.png: pick by keyboard on Bob's row, focus outline visible on the list.
- 28-slice-08-03-pick-kept-after-create.png: Cyd created; Bob still "Program 2", Cyd "Program".
- 28-slice-08-04-bob-sent-program2.png: Bob sent; run started with Program 2 (copy "Kopia: Program 2" in the panel read).
- 28-slice-08-05-new-char-last-entered.png: after the end, a new character shows Program 2 (program entered with last).
- 28-slice-08-06-ala-run.png: Ala sent with the shown Program 2 (copy "Kopia: Program 2").
- 28-slice-08-07-switched-row.png: Ala switched to "Program" in the run; after "Zakończ" her row shows "Program".
- 28-slice-08-08-default-deleted.png: Program 2 deleted; all rows rebuilt with one position and show "Program" (Bob, whose program used last was Program 2, fell back to the one last entered with). Also seen: Dax picked "Program", sent, copy was "Program".

**Left unchecked:** "two maps open" — needs Las solved (a 480-minute streak), not reached in reasonable time; one list per row regardless of map count rests on the code structure and on the single-select-per-row reading above, not on a screenshot with two maps. Layout of the row with two maps' wrapping thus not seen.

## Reach beyond the Read
None beyond the named files (read `.the-way/task-cycle/change/slice.md`, `ui_check.md`, reports/23 route lines).

## Choices
- Rows rebuild on a key of program ids+names (not the `programs` array reference), so editing a program's rules does not rebuild rows; cost if wrong: a stale name shown, only if names could change without the key changing (they cannot).
- The row's list label is also an `aria-label` "Program: {character name}" so lists are distinguishable for assistive technology; the visible label is "Program:".
- Send reads the number from the row's list value at click time (what the row shows).
