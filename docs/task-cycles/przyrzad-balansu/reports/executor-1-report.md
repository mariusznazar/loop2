# Report — executor of slice 1

**Status:** done

**Commits:** `62b73c35e1187cbb86a76787a249f5792fb9b691` on `task/przyrzad-balansu` (base `333b945b`).

## Files changed

| File | Added / removed lines |
|---|---|
| `tests/sim/reference-programs.mjs` (new) | +682 / -0 |
| `tests/sim/acceptance.test.mjs` | rewritten, 176 lines touched |
| `tests/sim/first-map-balance.test.mjs` | +4 / -41 |
| `tests/sim/new-account-first-pass.test.mjs` | +6 / -74 |

(`git diff --stat HEAD~1`: 4 files, 777 insertions, 206 deletions.)

## Checks (command, exit code)

- Counts of solved named seeds, with the script kept at `reports/executor-1-counts.mjs` (run from a directory two levels under the worktree root, as `.runs/executor-1/counts.mjs`):
  - before, `node .runs/executor-1/counts.mjs old` (the programs written in the tests): exit 0, `naive500 81, decent500 483, bestKnowing300 290, bestFresh300 289`;
  - after, `node .runs/executor-1/counts.mjs shared` (`forestNaive`, `forestDecent`, `forestBest` of the shared file): exit 0, `naive500 81, decent500 483, bestKnowing300 290, bestFresh300 289`. Equal (naive and decent on the 500 seeds of the first-map test from the account with everything discovered; best on the 300 seeds of the first-pass test from that account and from the new one, which matches D-404's 290 and 289).
- `npm test -- tests/sim/acceptance.test.mjs`:
  - failing run, before the program changed (the completion case with `forestOldAcceptance` on the named seed): exit 1, `Expected "actual" to be strictly unequal to: null` at the assertion on `state.run.completion`; the other four cases passed;
  - passing run, with `forestBest`: exit 0, 5 passed.
- `npm test -- tests/sim/first-map-balance.test.mjs`: exit 0, 5 passed.
- `npm test -- tests/sim/new-account-first-pass.test.mjs`: exit 0, 3 passed.
- `node node_modules/eslint/bin/eslint.js --max-warnings 0` on the four files: exit 0.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` on the four files: exit 0.
- `npm test -- tests/invariants/test_cross_part_imports.py`: exit 0 (10 tests), before and after the commit.
- `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py`: exit 0 (1 test), run before the commit and again after it, when the new file is tracked.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`: exit 1, 11 errors, all of them the ones the plan names for later slices, none on a file of this slice (log kept at `reports/executor-1-foundation-check.log`):
  - ten "`balance-tools` names no part" (Slice 2 adds the part to the map);
  - two "listed: `eslint-source-rules` / `prettier-source-format` ... no file citing it changed" (Slice 3);
  - one `tests/quality/test_quality_invariants.py:78: the quotation stands in no binding sentence of D-32`. This one is not listed by name in the plan's *Foundation entries* paragraph, but it comes from the same change that reworded D-32 and its invariants and its file is a *Change* file of Slice 3, so I take it as that slice's.
- The same check without `--skip-test-citations` (not asked, run to see my files): exit 1, the same lines plus "`instrument-game-agreement` ... no test cites it" (Slice 2). No report names the `decision:` lines of D-378 in `tests/sim/acceptance.test.mjs`, so the quotes of the changed D-378 match.
- Search of the new file, and of the three changed tests, for the names of the notes' folders and files, "The Brain", absolute paths, the old game's repository and "D-80": no match (the one hit of a word search for "report" is in an unchanged sentence of the first-pass test about the count "reported beside the other").
- The full gate (`npm test` with no argument) was not run, as the handoff says.

## Own-work check (requirement most likely not met)

The requirement: the acceptance test must be sensitive to what D-378 now asks, a program of the closed lists that solves Las, and not pass for a program that only survives. The check: run the shared programs on Las from 500 real moments (a script of my own, `las500.mjs`, removed with the directory) and play the acceptance case with the old program. Result: `forestBest` solves Las on 319 of 500, `forestOldAcceptance` on 0 of 500, and the acceptance case with the old program fails on the completion assertion (the failing run above). The named moment `SOLVING_REAL_MS = 1760000800000` (seed 1946377216, the same moment and seed as the old test) is one on which the best program solves Las, at game minute 696; the empty program dies there in minute 243 of cold, as worked out by hand in the test's comment and as the old test already had it.

## Choices

- **Identifiers.** `forest*` for the programs of Las and its first map (the map id), `forestDeep*` for Las — głębiej, `measure*` for the two measuring programs, `emptyProgram`, `deadZoneNoFire` and `wastelandCleanFlame` for the two programs of the progression critique written for maps its overlays add (the overlay ids come from Slice 5), `forestWorkingS6B3M3F3` and the three like it for the four working programs (sticks, berries, moss, fiber they gather up to), `forestSettledVariantExample` for the example variant. The notation functions (`always`, `satietyBelow`, `gather`, ...) are exported too; `REFERENCE_PROGRAMS` holds the 23 programs by identifier, for the instrument's `--program`. Way rejected: the notes' Polish names (Choice 5). Cost if wrong: renaming in one file and its readers.
- **Group names stay the game's Polish words** ("Jedzenie", "Głód", "Zimno", ...), as the first-pass test already had them; the critique's "Glod" is written "Głód" as the other source and the game have it. No effect on behaviour.
- **Trip plans.** Each program carries the trip plan of its source: the naive program and the old acceptance program take and bring nothing, the decent and best programs bring everything out. The first-pass precondition narrowed from `{ take: [], bring: [] }` to `take` equal to `[]`. The counts above show the trip plan does not move them (Choice 3).
- **Acceptance test plays minute by minute** (`advanceMinutes(state, 1)` in a loop to completion, death or the cap of 5000 minutes) and keeps the events and the lowest nature energy reached. Reason: the energy comes back by 0.5 a minute, so at completion (minute 696) it stands at 100 again and the old check `natureEnergy < 100` at the end would not show the price of „Zapal”; the lowest value over the map run does. Way rejected: one `advanceMinutes` over the whole span, which cannot see the dip. The completion minute is read as at least 480, the streak of D-136.
- **The check of the kinds** is `every condition and action of the program is a kind the data list`: each kind of the groups' and rules' conditions and of the rules' actions must be a key of `CONDITIONS` or `ACTIONS`, with a guard that the lists are not empty. Finished kinds no longer ask for feeding or for „Zapal — patyk” (`lightItem`), only gather, eat, craftCampfire and lightCampfire (*Choices* 10).
- **Comments of the reference file** say what each program is in my own words; I left out the notes' measured shares (such as "starved on 479 of 500") and the names of result files, since they are measurement claims and sources outside the repository.
- No move out of a function or file over the size threshold was needed: the new file is 682 lines, its longest function well under 200.

## Reaches beyond the dispatch

none. The program sources, the notation and the critique's shared file were named in the *Read*; I also read `programy/osiadly_wariant_przyklad.json` and `przyrzad/eksport_programow.mjs` of the critique's notes, to take the five numbers of the example settled variant (60, 50, 36, 8, 5, with eight sticks taken); both lie in the folders the *Read* names.

## Unread material

- `foundations/decisions.md` D-60, D-61, D-177, D-387, D-388, D-23 (ranges the *Read* names): not read whole. D-63, D-82, D-136, D-362, D-397, D-398, D-404, D-378 and D-427 to D-429 I read whole; of D-60, D-61 and D-387 I kept the quotations the old test already held, unchanged, and the foundation check shows them as matching. D-177 and D-23 I did not open.
- `foundations/invariants.md`: I read `program-closed-lists`, `first-map-balance`, `new-account-first-pass`, `tracked-file-private-paths` and `tracked-file-private-names` whole; not `instrument-game-agreement` (written for Slice 2).
- `foundations/glossary.md`: read the entry `overlay` only (found by search), not the whole file.
- `src/browser/sim/types.ts:1-92`: not read; the shape `Program` was taken from the existing test fixtures and the notes' notation, and the game accepts the programs (all tests pass).
- `guidelines/testing.md`: read whole (the large tables of trust boundaries only as far as their first rows' text, which this slice does not touch); `guidelines/coding.md`: read whole.
- The notes' `programy/*.json` of the instrument: not read; the programs were taken from `zrodla.mjs`, their source. `the progression critique's notes folder/programy/*.json`: only the example variant read; the other six I took from `wspolne.mjs`, which builds them.

## Searches not found or unclear

- none for the code. One note: the plan's *Read* says the file holds "the four of Las — głębiej, the two patrol programs, the two measuring programs and the empty program"; I counted 16 programs in the notes' sources, which are all in the file, plus 7 of the critique, 23 in all.

## Working copies

`.runs/executor-1/` under the worktree root held my scripts (`counts.mjs`, `explore.mjs`, `las500.mjs`) and the logs of the check runs; removed before returning, except `counts.mjs` and the foundation log, copied to `reports/executor-1-counts.mjs` and `reports/executor-1-foundation-check.log`. The build output `dist/` made by `npm run build` stays in the worktree; it is the product's ignored build output, not a working copy of mine.
