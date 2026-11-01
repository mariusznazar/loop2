# Report — Slice 3, time for loops, the catch-up and its report

**Status:** done

## Commits (address the owner's address)

- `6498bc5` feat: add the real seconds of a game minute of an earning loop to the balance
- `ca55922` feat: pass time for earning loops in the open game and the catch-up, with its report

## Files changed

- `src/browser/sim/data/balance.ts` +6: `loopMinuteRealSeconds: 60`, comment names the speed control as not reaching it.
- `tests/sim/data.test.mjs` +11: whole number from 1 up and 60. Failed first by assertion (`npm test -- tests/sim/data.test.mjs`, exit 1), then passed (exit 0).
- `src/browser/sim/loop.ts` +~241: `loopSpan`, `passLoops`, `catchUp`, `closeAwayReport`, type `LoopPass` (`GameResult & { clockMs }`).
- `tests/sim/catch-up.test.mjs` new, 28 tests.
- `stryker.config.json` +1 (file in alphabetical place, after campfire).
- `foundations/invariants.md` 3 lines: `catch-up-state`, `catch-up-minutes`, `catch-up-death-moment` Method `test`.
- `saved-game.ts` not touched.

## Checks (command, exit code)

- Red run before code (stubs returning the very state): `npm test -- tests/sim/catch-up.test.mjs` exit 1, 24 of 28 failing by assertion (4 passing were turned-back / no-loop / no-whole-minute cases that the stub satisfies); the 24 failing ones include every test that cites an invariant except the cases the stub satisfied by returning the very state (no loop, no whole minute, clock turned back, the no-whole-minute report). Those cases are not seen failing against the stub; the death-moment mutation above shows the moment tests do fail on a wrong implementation.
- Green: `npm test -- tests/sim/catch-up.test.mjs` exit 0 (28 pass) · `tests/sim/loop.test.mjs` exit 0 (36) · `tests/sim/data.test.mjs` exit 0 (33) · `tests/sim/rules.test.mjs` exit 0 · `tests/invariants/test_simulation_inputs.py` exit 0 · `tests/invariants/test_minute_span_split.py` exit 0 · `tests/quality/test_mutation_test_selection.py` exit 0 · `tests/quality/test_quality_invariants.py` exit 0 (after a first run exit 1: unused variable `ola` and Prettier formatting in the new test, both fixed) · `python -B .the-way/elements/common/foundation_check.py` exit 0 (0 errors).
- Not run: the product's gate (`npm test` with no argument), as instructed.

## Own-work check

Requirement most likely missed: a death settled at the k-th minute's own moment in the catch-up, not at the reading (To do 14, `catch-up-death-moment`). Check: mutated `catchUp` to settle at `nowMs` in the worktree; three tests failed (death moment at 243, ready exactly at the moment, the relation test); restored before the commit. Second requirement: every report state loads back (trust boundary); `assertLoadsBack` runs on lines of a continuing loop, covered death, catch-up stop, open-game stop, closed earlier line, two lines of one character.

## Choices made (way rejected, cost if wrong)

1. `closeAwayReport` returns `GameResult` (state, `events: []`) like the other state functions; the spec table says only "Section 11". Rejected: a bare `GameState`. Cost: slice 4 adapts one line if it wanted a bare state.
2. `loopSpan`, `passLoops`, `catchUp` throw `RangeError` on a moment that is no safe integer, always (not only when there is an end to take). Rejected: reading it lazily as `endLoopRun` does. Cost: a caller passing a non-integer clock fails earlier; `Date.now()` is always a safe integer.
3. `catchUp` with `saveTimeMs` null or no loop returns the very state with `clockMs: nowMs` (clock set to the reading, as section 6 says for no loop). With a loop and no whole minute `clockMs` is the save time (rest waits) or, on a turned-back clock, `nowMs`.
4. `passLoops` with no loop in the state returns the very state and `clockMs: nowMs`.
5. A line closed by a stop keeps its `minutes` and `chest`, and `practice` becomes `{}` (also for a line of an earlier return stopped live: its minutes stay, the view reads it without minutes by `away: false`). Rejected: also clearing `chest`. Cost: none for the load (any chest change loads); only the view decides what to show.
6. A stop in the catch-up counts the minute of death in `minutes` (a death in minute k gives k), as section 11 says "at least one minute".
7. The stop's `generation` is the character's generation after the death settled.
8. Covered death in the catch-up is detected by "run had a death and the loop still exists after `endLoopRun`"; completion likewise; no new field in `endLoopRun`'s return.
9. Catch-up report is written per character after its whole turn (not per end); the chest change of a character is the difference of the chest before and after its turn.

## Reaches beyond the dispatch

- `src/browser/sim/saved-game.ts:1093-1130` (`reportLine`, `awayReport`) and `lostGeneration` — to know which lines the load accepts (minutes 0 only for a live stop, generation 2 up to the character's, one open line per character, positive practice, non-zero chest). Read-only.
- `git show cdc7c0d:src/sim/loop.test.ts` (loop repo, tests only), lines 1-200, as the dispatch names.

## Searches not found or unclear

- `tests/sim/rules.test.mjs` is not in `stryker.config.json`'s test list (not my slice's file; left alone).
- Spec section 14 is cut off in the handoff at "(source:"; I took the entry's value (60) and test from the plan's wording.

## Problems observed

- None structural. A line the load refuses did not arise in any state the new functions produced (all loaded back).
- Possible concern for slice 4: a mid-catch-up character whose loop stops leaves earlier chest changes on its (closed) line; the view should not display them (as the spec says), but they are stored.
