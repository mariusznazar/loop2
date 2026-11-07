# Slice 2 report: numbers of the card and what a send takes, in the simulation

**Status:** `done with concerns`

Concerns in short: (1) the guideline table of simulation files (`guidelines/coding-simulation-module.md`) has no row for the new `map-card.ts`, and the slice's Change did not list the guideline, so I did not add one (see Questions); (2) the first run of the simulation-inputs invariant and of the quality invariants failed; both were fixed in this slice and both passed on the final state (see Checks and Problems observed).

## Commits (branch `task/karty-i-katalog-map`, base `ce5e865`)

- `45c9e7e` feat: :sparkles: add the simulation's numbers of the card of a map
- `284641e` refactor: :recycle: take a send's entries through one function of the trip plan

The worktree is clean after the second commit. The-way checkout `.the-way` is at `294af7fde45323ac1851c014a03071a97fc38d96`, as the handoff requires.

## Files changed

| File | Change | Lines (+/-) |
|---|---|---|
| `src/browser/sim/map-card.ts` | new | +58 / -0 |
| `tests/sim/map-card.test.mjs` | new | +99 / -0 |
| `stryker.config.json` | list entry `tests/sim/map-card.test.mjs` | +1 / -0 |
| `src/browser/sim/trip.ts` | new `sendTake`; `takeTrip` and `takeFromNowhere` route through it | +22 / -6 |
| `tests/sim/trip.test.mjs` | six new cases for `sendTake` and one for `takeFromNowhere` | +65 / -0 |

Exports of `map-card.ts`: `minutesWithoutFire(map)`, `expectedTiles(map, resource)`, `meanAttackGap(attacker)`, `usualStep(maps)`.
Export of `trip.ts`: `sendTake(plan, chest | null, capacity, map)`; `null` chest means a manual run of a solved map.

## Test-first runs (failing before the code)

- `npm test -- tests/sim/map-card.test.mjs`: exit 1, 11 of 11 tests failing on assertions (`0 !== 280`, `0 !== 3`, and so on), with the stub module in place, not a missing module.
- `npm test -- tests/sim/trip.test.mjs`: exit 1, 5 of 29 failing (the five `sendTake` cases); the `takeFromNowhere` backpack case already passed, as it covers existing behaviour.

## Checks (final state at `284641e`, plus the failed-then-passed runs)

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/sim/map-card.test.mjs` | 0 | 11 of 11 pass (first run, see above, exit 1) |
| `npm test -- tests/sim/trip.test.mjs` | 0 | 29 of 29 pass (first run exit 1, see above) |
| `npm test -- tests/sim/loop.test.mjs` | 0 | 36 of 36 pass |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 | pass |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | pass |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 | 5 tests OK |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 1 first, then 0 | First run: 2 failures, both "driver did not end within 300 s" (see Problems observed). Final run after the fix: 2 tests OK, 10.7 s |
| `npm run typecheck` | 0 | pass |
| `npm test -- tests/quality/test_quality_invariants.py` | 1 first, then 0 | First run: `test_prettier_source_format` failed on 3 files (`map-card.ts`, `map-card.test.mjs`, `trip.test.mjs`). After `prettier --no-config --no-editorconfig --write` on those files: 5 tests OK |
| `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig --check <the 4 changed .ts/.mjs/.json files>` | 0 | all matched files use Prettier code style |

Not run, by reason:
- Full `npm test` and `python -B .the-way/elements/common/foundation_check.py`: not in this slice's focused checks and the handoff says the orchestrator runs the gate. Left for the gate.
- StrykerJS mutation run: the testing guideline's mutation section says the reviewer runs it for simulation files. Not run here.

## Own-work check (the method's section 3)

Requirement most likely not met: the card's "bez ognia" number must be the count of minutes the body stays at or above 35 °C, so the 84th minute must be the first chilled one for Las and the 34th for Las — głębiej.

Check: step `bodyMinute` (from the built `dist`) for 90 minutes with no warmth, per map, and compare with `minutesWithoutFire`. Command: `node --input-type=module -e "…"` (inline, no file written).
Result: Las: minute 83 ends at 35.008 °C, minute 84 at 34.984 °C (first chilled minute 84, so 83 minutes); function returns 83. Las — głębiej: minute 33 at 35.02 °C, minute 34 at 34.96 °C; function returns 33. Both match. Exit 0.

## Reaches beyond the handoff

- `src/browser/AGENTS.md`: read whole, because the project's `AGENTS.md` says to read it when working in `src/browser/`. It concerns design tokens only; nothing in this slice touches styles.
- `foundations/decisions.md` D-325 and D-326: read whole while reading the handoff's batch of D-entries. The slice does not name them; they are in the card's scope.
- `src/browser/sim/types.ts` (TripPlan, TripEntry, Chest, Body definitions), `src/browser/sim/game.ts` `startRun` (lines 189-251, named), `src/browser/sim/loop.ts` `beginRun` (named), `src/browser/sim/run.ts:640-670` (named): read to find the callers of `takeTrip`/`takeFromNowhere`. Result: `takeTrip` is also called from `loop.ts` `beginRun` for solved maps, so `takeTrip` must keep the chest-clipped path whatever the map's state. This fixed the design (see Choices).
- Header comments of `tests/sim/traits.test.mjs`, `tests/sim/purity.test.mjs`, `tests/sim/loop.test.mjs`, `tests/invariants/test_simulation_isolation.py` and `tests/invariants/test_simulation_inputs.py` (docstrings and the pool section of the driver): read for the test conventions and for what the invariant checks call.
- `src/browser/view/trip-lines.ts` (grep only): confirmed it imports `clippedTake`, `tripEntryCut`, `tripLoot` and is not changed by this slice.

## Searches not found or unclear

- `guidelines/coding-simulation-module.md` "Files of this kind" table: no row for `src/browser/sim/map-card.ts`. Unclear whether a row is due in this slice; the slice's Change does not list the guideline. Not changed.
- The task passage "To do 4" gives "Las ... bez ognia 83 min — otoczenie 25 °C" and "Las — głębiej ... 33 min"; both reproduced by hand (see own-work check). The vault task file is in `.runs/` and was not re-read beyond the lines named in the handoff.
- `reserved_choices.md`: not read; no choice was needed that the task, spec and foundation did not settle.
- `ui_check.md`: not read; no screen changes in this slice.
- Whether `usualStep` should take the maps as an argument or read `MAPS` itself: the slice says "the step most maps of `MAPS` give"; I made it take the maps, so the test can give literal cases. The view can pass `Object.values(MAPS)`.

## Choices made

1. **`sendTake` takes `chest: Chest | null`; `null` means a solved map's run.** Rejected: a boolean `solvedMapRun` plus a chest that the solved path ignores (and `takeFromNowhere` has no chest to pass). Cost if wrong: a signature change in two functions and their callers (`game.ts`, `loop.ts`, slice 5's line).
2. **`takeTrip` always takes the chest-clipped path** (through `sendTake` with the chest). Rejected: making `takeTrip` solved-aware. Reason: `loop.ts` `beginRun` calls `takeTrip` whatever the map state, and the task fixes that behaviour. Cost if wrong: none found; behaviour is unchanged.
3. **Rounding is `Math.round`, so a tie rounds up.** Effect: patyk on Las — głębiej is 0.7 × 25 = 17.5 → 18, which the task states (`≈ 18 z 25`). Rejected: round-half-even, which would give 18 too but differs on other ties. Cost if wrong: one number at a future .5 tie.
4. **`minutesWithoutFire` returns `null` when the temperature does not fall, and also on a value that is not a number.** Rejected: throwing for a malformed map. Reason: the simulation-inputs invariant calls every exported function with pool values, and a throw there is allowed but a hang is not (see Problems observed). Cost if wrong: a malformed map would hide the "bez ognia" item rather than fail loudly; the real data never hits this.
5. **The usual step counts steps and takes the highest count, first in data order on a tie.** Rejected: a constant in the view or a new balance value (the Plan's Choices rule the same). Cost if wrong: one dopisek at a later map (plan's stated cost).

## Problems observed

- **The simulation-inputs invariant hung on my first `minutesWithoutFire`.** Evidence: the first run `npm test -- tests/invariants/test_simulation_inputs.py` exit 1, "Ran 2 tests in 605.113s, FAILED (failures=2)"; both failures: "… did not end within 300 s" for the driver with `minutesWithoutFire` in the exported functions. Cause (verified by one call): with a non-map value (`{ ambientTemperature: undefined }`), the temperature is NaN, so neither exit condition held and the loop never ended. Fix: the exit `if (!(next.temperature < body.temperature)) return null;` also stops on NaN. After the fix `minutesWithoutFire({ ambientTemperature: undefined })` returns `null` and the invariant run passes (exit 0).
- **Prettier.** The first run of the quality invariants flagged the three new or changed JS/TS files for format; fixed by running Prettier with the project's options. Only formatting changed; the tests were re-run after it.
- No change to the game state, the save version or `saved-game.ts`; `game.ts`, `loop.ts` and `run.ts` are unchanged.

## Questions and concerns

1. Should `map-card.ts` get a row in `guidelines/coding-simulation-module.md` "Files of this kind" (the table lists every simulation file except the new one)? My recommendation: yes, as `copy` (it is plain functions over the data, like `trip.ts`), in this slice or in the guidelines step. I did not add it: the Change does not list the guideline.
2. The loop in `minutesWithoutFire` runs once per minute of cooling; for an ambient temperature just below 37 °C (cooling of 1e-6 °C a minute) it would take about two million steps. No map in the data is near that; I did not measure its time. Recommendation: accept now; revisit if a map is ever set that close to 37 °C.
