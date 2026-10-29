# Slice 5 report — programy-gracza

**Status:** done

**Commits** (base `bf7e827`):

- `99763ab` refactor: moved `checkProgram`, `reconcileCounts`, `sameData` and the check helpers they use into `src/browser/sim/programs.ts` (choice C14). `programs.ts` now imports only `import type { GameResult } from "./game.js"` from `game.ts` (type only, erased); `game.ts` imports the three from `programs.ts`. No test imported them from `game.ts`.
- `f58675c` feat: the operations and measures in `programs.ts`, `setProgram` and `startRun` in `game.ts` use the shared helpers `withCopyProgram` and `zeroCounts`; `tests/sim/copy-actions.test.mjs`; `stryker.config.json`.
- `4321b2c` test: `tests/invariants/test_copy_save.py` (new), `tests/invariants/test_streak_program_change.py`, `foundations/part_map.md` (one line, the new check file, in the part `simulation`).

**Files changed:** `src/browser/sim/programs.ts` (+~440 with the move), `src/browser/sim/game.ts` (about -250 with the move), `tests/sim/copy-actions.test.mjs` (new, 26 cases), `stryker.config.json` (+1), `tests/invariants/test_copy_save.py` (new), `tests/invariants/test_streak_program_change.py`, `foundations/part_map.md` (+1). `types.ts` needed no change.

## What was built (all in `programs.ts`, each takes the state and returns a `GameResult`, throws on a refused call)

- Measures `copyHasUnsavedChanges(state)` and `programHasChangesCopyLacks(state)` (both return false without a map run; compare with `sameData`, identity counters included).
- `saveCopyIntoProgram(state)`, `saveCopyAsNewProgram(state, text)`, `discardCopyChanges(state)`, `switchProgram(state, programId)`.
- Helpers `withCopyProgram` (the copy edit: reconcile counts, zero streak and beaten attacks of an unended run where the copy changes; `setProgram` in a map run now calls it, same effect) and `zeroCounts` (used by `startRun` and the switch).

## Checks (command and exit code)

- First failing case: `npm test -- tests/sim/copy-actions.test.mjs` with an empty `saveCopyIntoProgram` stub: exit 1, assertion failure (`nextRuleId` 2, expected 3: program not given the copy's content). Passing run after the implementation: exit 0 (26 pass).
- After the refactor commit: `npm run typecheck` 0; `copy.test.mjs`, `program-list.test.mjs`, `program-counts.test.mjs` each 0.
- `npm run typecheck` 0.
- `npm test -- tests/sim/copy-actions.test.mjs` 0.
- `npm test -- tests/invariants/test_copy_save.py` 0. Seen failing: with `streak: 0` temporarily added to both saves, exit 1 (every save case, running and paused); code restored before the commit. The controls (a switch zeroes the streak, also to a program of the copy's rules; the saves were made) pass in the passing run.
- `npm test -- tests/invariants/test_streak_program_change.py` 0 (5 tests). Changed check: the new switch case, seen failing with the switch's `streak: 0` removed temporarily, exit 1, 4 subtests (other rules / same rules, running / paused); restored. Its control (the unchanged program leaves the streak) passes in both runs.
- `test_action_in_progress.py` 0 · `test_restart_seed.py` 0 · `test_simulation_inputs.py` 0 · `test_simulation_isolation.py` 0 · `tests/quality/test_quality_invariants.py` 0 · `tests/quality/test_mutation_test_selection.py` 0 (with the quality tools first on PATH).
- `python -B .the-way/elements/common/foundation_check.py` 0 (0 errors).
- Also run: `tests/sim/streak.test.mjs`, `flow.test.mjs`, 0.
- Not run: the gate (`npm test` with no arguments), as instructed.

## Own-work check (WAY-164)

Requirement most likely missed: the first-chill write must be neither an unsaved change nor a change the save announces (To do 11). Check: `copy-actions.test.mjs`, "the rule the first chill writes is neither …" starts from a game whose program and copy are equal, runs to the chill at minute 84 (paused at the discovery), sees the rule in program, copy and base, and both measures false. It passed on the first run, so the existing first-chill code already satisfies it. A second candidate: the switch must keep the pause at a discovery; a case covers that (paused with a discovery held, the switch leaves both).

## Reaches beyond the *Read*

- `src/browser/sim/run.ts` `mapRunEnded` (already imported by `game.ts`) is now also imported by `programs.ts`; no file outside the *Change* was edited.
- Read `tests/invariants/test_saved_program_edit.py`, `tests/sim/program-list.test.mjs` and `git show bf7e827` for the conventions and how Slice 4 wrote its part-map line.

## Choices and notes

- The measures take the game state (not the copy), because "its program is gone" needs the list. Rejected: taking the copy only. Cost if wrong: a signature change before Slice 6 uses them.
- `discardCopyChanges` does not re-check the base against the run's map (`checkProgram`): the base is a program already checked when saved, and `send` does not check the copy against the map either. Rejected: re-checking, which could throw on a base holding a resource of another map and make discard impossible. Cost if wrong: a base with a foreign resource could come back into the copy; this can already happen at `send`.
- `saveCopyAsNewProgram` does not change `lastEnteredProgram` (spec names only "used last"); a case asserts it stays.
- A rule's count in the discard test is observed as "fired > 0" after 30 game minutes, because the exact count at that point is not given by the task; the expected value after the discard (0) is.
- The `types.ts` entry of the *Change* was not needed.
- The part-map line was written following the Slice 4 precedent (one path line in `simulation` *Files*), by reading the `the-way-update-part-map` skill and the element's `SKILL.md`; I did not run the interactive show/ask steps (the plan's choice F25 fixes the line). `foundation_check.py` passes.
- The tests' `test_copy_save.py` and `test_streak_program_change.py` take about 50 to 60 seconds each (they build the game in a temporary copy).
- No problems observed with the plan; no mismatch beyond: the *Checks* list names `npm test -- tests/quality/test_quality_invariants.py`, which I ran, plus the orchestrator's added `test_mutation_test_selection.py`.
