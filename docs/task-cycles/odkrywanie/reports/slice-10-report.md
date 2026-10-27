# Slice 10 report — game time stops after the minute of a discovery

**Status:** done

**Commit:** 166c3c9 (on `task/odkrywanie`, base 3b03486). Worktree clean.

## Files changed

- `src/browser/sim/types.ts` +5: `GameState.discovery: Understanding | null`.
- `src/browser/sim/game.ts` +31/-7: `advanceMinutes` breaks after the pick of a minute that revealed something, sets `paused: true` and `discovery`; `passRealTime` sets `realMsCarry` 0 where the span's events hold `discovered` (as for death); `setPaused(false)` clears `discovery`; `startRun` (so `send`, `restart`), `end` and `newGame` set it null.
- `tests/sim/discovery.test.mjs`: 6 new tests; 4 existing tests adapted (below).
- `tests/invariants/test_player_map_run_pace.py`: docstring carries the new sentence; driver records carry and discovery; 2 new tests (discovery scenario, knowing-game control).
- `tests/invariants/test_minute_span_split.py`: docstring carries the new sentence; scenario DISCOVERS (bare `newGame()`, 100 minutes); 2 new tests.
- `tests/sim/time.test.mjs`: not changed; its cases pass.

## Checks (command, exit code)

- Failing first: `npm test -- tests/sim/discovery.test.mjs` exit 1, 5 new tests failing on their assertions (`discovery`/`paused`/minute), 25 passing.
- After code: `npm test -- tests/sim/discovery.test.mjs` exit 1 with 4 old tests failing (they ran spans across several discoveries); after adapting them, exit 0 (last run exit 0, 32 tests).
- `npm test -- tests/sim/time.test.mjs` exit 0.
- `npm test -- tests/invariants/test_player_map_run_pace.py` exit 0 (4 tests).
- `npm test -- tests/invariants/test_minute_span_split.py` exit 0 (9 tests).
- Controls seen failing (code broken in the worktree, restored before commit):
  - pace: passRealTime stop condition forced false: exit 1, "500 != 0 : real time carried over after input 1, passRealTime 1000"; advanceMinutes break removed: exit 1, "185 != 104 : game minute after input 7, passRealTime 100000".
  - span split: break removed: exit 1 (control "100 != 84 ... one call of the whole span went past the game minute of the discovery", and the split test for 'one call', 'one, then two', 'sixty', 'growing'); pause not set: exit 1, "the game minute of the discovery leaves no pause".
  - the knowing-game control of the pace test passes by design (it is the control for the stop being the discovery's; the bare game with the same real time stops).
- `npm test` (full, exit 1): build ok; node tests 499 pass, 0 fail; agent_workflow ok; deploy ok; invariants failed only `test_loop2_one_serving_process` setUpClass (base failure); quality failed only `test_ruff_source_rules` and `test_shellcheck_source_rules` (base failures). Nothing beyond the base's three failures. Because `npm test` stops at the Python stage, `python -B .the-way/elements/common/foundation_check.py` run on its own: exit 0, "0 errors".
- `npx prettier --check` on src/browser/sim and the test file: ok. `npx eslint src/browser/sim tests/sim/discovery.test.mjs`: no output (clean). `tsc -p tsconfig.browser.json --noEmit`: no output.
- Stryker `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/game.ts"` exit 0, final score 85.11 (382 killed, 1 timeout, 63 survived, 4 no coverage). First run found two survivors in my code (`events.some(...)` replaced by true / by `!== "discovered"`: a span with events but no discovery was untested); killed by the new test "real time passed over a minute that gave events but no discovery keeps its carry"; `setPaused`'s `events: []` survivor killed by asserting the events. Remaining survivors in the range of this slice, classified:
  - 514 `run?.death` to `run.death`: equivalent (run is never null after advanceMinutes).
  - 505 `realMs <= 0` to `< 0`: equivalent (zero ms changes nothing).
  - 509 `*` to `/` on `gameMinutesPerRealSecond`: equivalent while the balance value is 1.
  - 531 `typeof minutes !== "number"` to false: equivalent (`Number.isInteger` rejects the same).
  - 536 error message text; 539 `minutes === 0` to false: equivalent (zero loops do nothing, state equal).
  - 500, 503: passRealTime guards (no run; non-number) that no test reaches; unchanged by this slice.
  - The other survivors (lines 49-305, 380-466: program validation messages, createCharacter, send, restart/end messages, event arrays of setProgram/createCharacter) are in code this slice did not touch; pre-existing.

## Own-work check

Requirement most likely missed: "reaching the discovery with real time left over keeps none of it" (task To do 5). Check: `passRealTime(sentNew(), 84500)` and `100000` end at minute 84, paused, `realMsCarry` 0, discovery held, further 5000 ms moves nothing, `setPaused(false)` clears and 1000 ms then gives minute 85; and the opposite, a span with events and no discovery keeps carry 500. Both pass; mutations of the stop condition both ways are caught.

## Choices

- `discovery` is typed `Understanding | null` (the actions/conditions/items the event gives); the event's `minute` is not kept.
- A call of `advanceMinutes` that reveals nothing does not touch `discovery` or `paused` (so a span called while paused after a stop leaves the earlier `discovery` standing until the next discovery or `setPaused(false)`); the plan lists only the four clearing functions. Cost if wrong: a stale list stays after a player's `advanceMinutes` while paused (only tests/internal callers do that).
- A chill in the minute of death also sets pause and `discovery` (the death minute still reveals what the body step reveals, D-71); the dead run is then paused. Cost if wrong: a dead, paused run in the view; none of its cases is specified.
- Existing discovery tests that crossed several discoveries in one call were rewritten to go on after each stop (helper `toDeath`, calls of 84 then 20, one-minute reference to minute 104); their expectations (events, states, understanding) are unchanged; reason: D-71/O5 now end such spans at the discovery.
- Invariant test values: minute 84 and 104 and carry values come from the task (Context, vault `odkrywanie_loop2.md` line 99, D-82) and from the existing discovery test; the 104 row (first finished exploration) is the existing test's value, not independently from the task text.

## Reach beyond the handoff

None. Read only the files the handoff names.

## Concerns / foundation

- Foundation entries match the code (D-71 "stops once the whole game minute of the discovery has taken effect", player-map-run-pace, minute-span-split). `foundations/` unchanged.
- The view (status row, `discovery` line) is not part of this slice; `GameState.discovery` is ready for it.
- Flaky tests did not appear.
