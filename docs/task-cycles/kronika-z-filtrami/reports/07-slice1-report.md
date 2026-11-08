# Report — slice 1, the simulation reports a loss of the streak

**Status:** done

**Commits:** `734b2dd` (one commit, on `task/kronika-z-filtrami`). Range: `3ea46e879d0dbef1ae0273f8bb44cd1f050b6588..734b2dd`. The worktree is clean.

## What was made

- `src/browser/sim/run.ts` — `GameEvent` gains `{ kind: "streakLost"; minute; streak; cause }`, `streak` being the count before the loss; the exported type `StreakLossCause` = `HealthLossCause | "programChanged" | "programSwitched"`. `minuteBeforePick` puts the event first in its events in a living minute (also the non-picking return and the picking one, ahead of `activityFinished`) and in the minute of a death of cold or hunger, ahead of `characterDied`. No event in a minute of an encounter (the streak grows there) and none where the streak stood at zero.
- `src/browser/sim/body.ts` — new type `HealthLossCause` (`cold`, `hunger`, `coldAndHunger`); `bodyMinute` returns `healthLoss`, computed from the same `chilled` and `starving` values as `lostHealth` (one definition of the thresholds). `lostHealth` is kept, so `bodyMinute` keeps its meaning.
- `src/browser/sim/programs.ts` — `withCopyProgram` now returns a `GameResult`: the event `programChanged` where the edit zeroes a streak above zero (not at a streak of zero, not after the end of the run, not for a trip-plan-only or unchanged edit). `discardCopyChanges` returns it as it is; `switchProgram` returns `programSwitched` where the streak was above zero.
- `src/browser/sim/game.ts` — `setProgram` with a map run returns the result of `withCopyProgram`; doc comment updated.
- No change to `world.ts`, `types.ts`, the game state or the save (the campfire event is not in this slice).

## Tests

- `tests/sim/streak.test.mjs` — 9 new cases: cold, hunger, both, the minute of the loss after a grown streak (83 at minute 84), no event at a streak of zero or after a loss, no event in a minute of an encounter, death of cold and death of hunger with the loss before the death, no loss at a death at a streak of zero, a span split into calls of one minute.
- `tests/sim/copy-actions.test.mjs` — 8 new cases for edit, group rename / action change, streak zero, unchanged and trip-plan-only edit, edit after death, discard (above zero, at zero, after the end), saves and an edit of a saved program, switch at zero and to a program of the same rules. One existing case changed: the switch case's `assert.deepEqual(events, [])` now expects the one `programSwitched` event (source: this task, To do 4, D-341; comment in the test).
- `tests/sim/body.test.mjs` — 1 new case for `healthLoss` (cold, hunger, both, none, two deaths).
- `tests/sim/discovery.test.mjs` — one existing whole-list expectation (first chill at minute 84, streak 83) now begins with the `streakLost` event; comment names this task (D-341).
- `tests/sim/death.test.mjs` needed no change (it met no loss in a whole list).

Expected values are written out by hand (streak and minute from the fixtures, thresholds from the file's own worked comments).

## Failing first

The new cases of `streak.test.mjs` and `copy-actions.test.mjs` were run before the code: `npm test -- tests/sim/streak.test.mjs` exit 1 (8 failed, each for the missing event: assertion on `lossesIn(...)`), `npm test -- tests/sim/copy-actions.test.mjs` exit 1 (5 failed, the changed switch case included). The `healthLoss` case of `body.test.mjs` was written after the code; I broke it on purpose (`chilled && starving` → `chilled || starving`): `npm test -- tests/sim/body.test.mjs` exit 1, then restored: exit 0. No invariant test is new or changed (the invariants of the slice's *Checks* only run).

## Checks (on head `734b2dd`; commands and exit codes)

| Command | Exit |
|---|---|
| `npm test -- tests/sim/streak.test.mjs` | 0 |
| `npm test -- tests/sim/copy-actions.test.mjs` | 0 |
| `npm test -- tests/sim/body.test.mjs` | 0 |
| `npm test -- tests/sim/discovery.test.mjs` | 0 |
| `npm test -- tests/sim/death.test.mjs` | 0 |
| `npm test -- tests/sim/program-list.test.mjs` | 0 |
| `npm test -- tests/sim/trip.test.mjs` | 0 |
| `npm test -- tests/sim/catch-up.test.mjs` | 0 |
| `npm test -- tests/sim/loop.test.mjs` | 0 |
| `npm run build` | 0 |
| `npm test -- tests/invariants/test_minute_span_split.py` | 0 |
| `npm test -- tests/invariants/test_streak_program_change.py` | 0 |
| `npm test -- tests/invariants/test_saved_program_edit.py` | 0 |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 |
| `npm run typecheck` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 |

Beyond the list (to find whole-list mismatches in files outside *Change*): every `tests/sim/*.test.mjs` and `tests/view/*.test.mjs` run singly with `node --test <file>` after the build, all exit 0 (this ran before the last edit of `body.test.mjs`, which adds one case and touches no other file). The full gate `npm test` was not run (the orchestrator's).

## Own-work check

The requirement I was most likely to miss: the loss comes before the death event of the same minute, and through `advanceMinutes`, which reorders `activityStarted` and `mapRunCompleted` to the end of a minute. Checked by the two death cases of `streak.test.mjs` (index of `streakLost` below index of `characterDied` in the events `advanceMinutes` returns, the loss with the streak and cause expected by hand), and by the changed whole-list expectation in `discovery.test.mjs` (the loss first, then finish, discovered, started). Second: the cause not read from a second copy of the thresholds — `healthLoss` is computed beside `lostHealth` from the same two booleans; the mutation `&&` → `||` in it is caught. Mutations considered in my head: `run.streak > 0` → `>= 0` in `withCopyProgram` and `switchProgram` is caught by the zero-streak cases; the loss for a trip-plan-only edit is caught by the trip-plan case; a loss event in an encounter minute is caught by the encounter case.

## Reach beyond the handoff

None. Files read beyond the named: `tests/sim/program-fixture.mjs`, `tests/sim/catch-up.test.mjs` (for the shape of a trip-plan entry), `tests/sim/encounters.test.mjs` (for the shape of `activeCombat`), `src/browser/sim/data/balance.ts` (grep of the loss values), `src/browser/sim/loop.ts` (grep: the earning loop discards the events of `stepMinute`).

## Files changed beyond the slice's *Change*

None.

## Choices

- Name of the event `streakLost`, causes `cold` / `hunger` / `coldAndHunger` / `programChanged` / `programSwitched` (left to the maker by the spec). Cost if wrong: a rename in the view slices that read it.
- `healthLoss` added beside `lostHealth` rather than replacing it, so the existing `lostHealth` test and the meaning of `bodyMinute` stay; the two are redundant by construction.
- `withCopyProgram` returns a `GameResult` rather than handing the event through a second function (left to the maker); its only callers are `setProgram` and `discardCopyChanges`.

## Searches not found or unclear

none
