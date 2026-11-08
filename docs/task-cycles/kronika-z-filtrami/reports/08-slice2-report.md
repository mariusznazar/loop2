# Slice 2 report — The simulation reports a campfire going out

- **Status:** done
- **Worktree:** `the worktree root`, branch `task/kronika-z-filtrami`
- **Slice base:** `734b2dd` (Slice 1 head). **Commits:** `6392714` (one commit; range `734b2dd..6392714`)
- **Files changed (added / removed lines):**
  - `src/browser/sim/run.ts`: +33 / −9
  - `tests/sim/campfire.test.mjs`: +108 / −0
- **Commit form:** `feat: :sparkles: report a campfire going out as an event of the simulation, with its minute and its tile`, with the same `Co-Authored-By` trailer as `734b2dd`. Added by path. Tree clean after the commit.

## What the slice does

- `GameEvent` gains `{ kind: "campfireExtinguished"; minute: number; at: Hex }` (`src/browser/sim/run.ts`, the union after `streakLost`).
- A new private helper `extinguishedEvents(before, after, minute)` in `run.ts` gives one event for each campfire whose `minutesLeft` goes from above zero to zero. It pairs the campfires before and after the step by position. `worldMinute` maps the list one to one and in order, so this holds. `worldMinute` itself is unchanged.
- `minuteBeforePick` emits the events in the three branches that run the world step:
  - an encounter minute: the events are now the helper's output where they were `[]` before;
  - a living minute with an activity still running: `[...lossEvents, ...worldEvents]`;
  - a living minute where an activity ends: `[...lossEvents, ...worldEvents, activityFinished]`.
- The death branch does not call the world, so it emits none. A crafted unlit campfire, or one already at zero, emits none, because the helper requires `minutesLeft > 0` before the step.

## Checks (command and exit code)

Red and green runs of the new cases:

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/sim/campfire.test.mjs` (before the code, first new cases) | 1 | 3 failed, 29 passed. The failures are `actual: []` against the expected event, which is the assertion failing for the expected reason. The two negative cases (crafted unlit / at zero; minute of a death) passed before the code, as they assert the absence of events. |
| `npm test -- tests/sim/campfire.test.mjs` (after the code) | 0 | 33 passed, 0 failed |

Focused checks of the slice:

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/sim/world.test.mjs` | 0 | 12 passed |
| `npm test -- tests/sim/encounters.test.mjs` | 0 | 29 passed |
| `npm test -- tests/sim/completion.test.mjs` | 0 | 19 passed |
| `npm test -- tests/sim/body.test.mjs` | 0 | 36 passed |
| `npm test -- tests/sim/acceptance.test.mjs` | 0 | 5 passed |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 | 27 passed (save stays version 3; no field added) |
| `npm run build` | 0 | built |
| `npm test -- tests/invariants/test_minute_span_split.py` | 0 | Ran 9 tests, OK |
| `npm test -- tests/invariants/test_map_run_repeatability.py` | 0 | Ran 3 tests, OK |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 | Ran 2 tests, OK |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 | Ran 5 tests, OK |
| `npm run typecheck` | 0 | passed |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | Ran 5 tests, OK (covers ESLint and Prettier for the changed TS) |
| `npx prettier --no-config --no-editorconfig --check src/browser/sim/run.ts tests/sim/campfire.test.mjs` | 0 | all files formatted |

Extra observation, not one of the slice's checks and not the gate: `node --test tests/sim/*.test.mjs` on the built code, exit 0, 740 tests passed, 0 failed. No existing test needed a change, so no existing test is named as changed by this slice.

Not run:
- The full gate `npm test` with no file, which the handoff keeps for the orchestrator.
- `foundation_check.py`, which is not in this slice's checks.
- StrykerJS mutation testing, which `guidelines/testing.md` leaves to the reviewer.

## New tests (all in `tests/sim/campfire.test.mjs`)

1. A campfire burning 3 minutes gives its event at minute 3, on its tile, and then stands at 0 (living minute, activity ending in the same minute).
2. A campfire going out in an encounter minute gives its event at minute 1.
3. A crafted unlit campfire, or one already at zero, gives no event. The unlit campfire comes from the real `CRAFT` action.
4. The minute of a death (cold, health 0.1) gives no event, and the campfire keeps its 1 minute.
5. Two campfires going out in one minute give two events in campfire-list order; a third still burning gives none.
6. A campfire going out while a wait runs to minute 5 gives its event, and no `activityFinished` appears in that minute. Added after the code, so it was not seen red before it. It was seen failing on a break, see the own-work check.

Helpers: `extinguishedIn(events)` and `stepsWithEvents(run, minutes, program)`. The expected values are the literal minutes and tiles from the test setup, not values computed by the code.

## Own-work check (WAY-164)

- **Requirement most likely missed:** the event must come in a living minute where an activity runs on past the campfire's last minute, not only in the minute an activity ends (the case the earlier test already covered). It is the branch most likely left without the events.
- **Check:** new case 6 above. I then broke the code in the worktree by changing the living, mid-activity return to `events: [...lossEvents],` and ran `npm test -- tests/sim/campfire.test.mjs`. Result: exit 1, and the case "a campfire going out while an activity goes on gives its event, and the activity's end no event" failed. I restored `run.ts` from a saved copy, confirmed it byte for byte with `cmp`, and reran the file: exit 0, 33 passed.
- The encounter branch is covered by case 2, which was red before the code.

## Reaches beyond the handoff

- `tests/sim/streak.test.mjs` (lines 1–60 and 120–240): to read the event-test pattern Slice 1 used, so the new cases match it. Nothing new was taken from it beyond style.
- `src/browser/sim/game.ts` lines 775–800: to check that the new event passes through `advanceMinutes`. It is only filtered for `activityStarted` and `mapRunCompleted` at the ending, so the new kind goes through.
- `grep` of `streakLost` across `src` and `tests`: to find the event consumers. None switches on kinds exhaustively; typecheck passes.

## Files changed beyond the slice's *Change*

- None.
- `src/browser/sim/world.ts` is listed in *Change* but not changed. The spec leaves the finding to the maker, and I put it in `minuteBeforePick`, so `worldMinute` keeps its meaning. This is a small mismatch, noted here in one line.

## Choices made

- **Event name and fields:** `campfireExtinguished`, with `minute` and `at: Hex`. The spec leaves names to the maker. Way rejected: `campfireWentOut`, or a field called `tile`. Cost if wrong: a rename would touch Slices 3 and 5, which read the event; it is a small mismatch.
- **Where the finding sits:** in `minuteBeforePick`, comparing the campfire lists before and after `worldMinute`. Way rejected: returning the lost campfires from `worldMinute`, which changes its return type and its callers. Cost if wrong: if `worldMinute` ever reorders or filters campfires, the pairing by position breaks. It fails loudly: `before[i]` is undefined when `after` is longer. The docstring of `extinguishedEvents` states the assumption.
- **Order within a minute:** streak loss, then campfire events, then `activityFinished`. This follows D-71: the body first, then the world, then the finished action.

## Problems observed

- None in the code.
- The `minuteBeforePick` docstring has one long line that predates this slice (the sentence about `finishMinute`). I left it as it was.

## Searches not found or unclear

- Whether a negative case (no event) must be seen red. A negative case cannot fail before the event exists, so it was seen passing before the code. This is noted here, not hidden.
- No invariant test was written or changed. The rule "an invariant's test is seen failing once" therefore does not apply. The four invariant tests in the checks were run only on the passing code and pass.
- None other.
