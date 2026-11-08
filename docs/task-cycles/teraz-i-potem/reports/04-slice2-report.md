# Report 04 — slice 2 (make-change)

**Status:** done

## Commits and files

Base `02e41f3`. One commit: `35f53cd` (`feat: :sparkles: count the minutes each need lasts in the simulation and let the card of a map read the same count`).

| File | Added / removed |
|---|---|
| `src/browser/sim/body.ts` | +83 / -1 |
| `src/browser/sim/map-card.ts` | +4 / -14 (`minutesWithoutFire` now one line; the loop and the `BALANCE` import removed) |
| `tests/sim/body.test.mjs` | +164 / -1 (15 new cases, plus the import block) |

## What was made

Exports of `src/browser/sim/body.ts`, beside `bodyMinute` (the plan said "named by the slice" but the slice names none; these names are my choice):

- `minutesUntilChilled(body, map): number | null` — (a). Steps `bodyMinute` with no warmth from the given body; null where the temperature stops falling without crossing the threshold. The loop is the former loop of `minutesWithoutFire`, moved.
- `minutesUntilStarving(body, map): number` — (b). Same step; `map` only serves `bodyMinute`. Written with `>=` negated so a satiety that is not a number stops the count instead of looping.
- `needNotes(run, map): { temperature, satiety }` — (c). `run` is `Pick<MapRun, "body" | "character" | "campfires" | "burningItems">`. Temperature note is `{kind:"chilled"} | {kind:"fire"} | {kind:"not-cooling"} | {kind:"minutes", minutes}`; satiety note is `{kind:"starving"} | {kind:"minutes", minutes}`. Order as the slice gives. Types `TemperatureNote`, `SatietyNote`, `NeedNotes` exported from `body.ts` (not `types.ts`, which the slice does not name).
- `minutesWithoutFire(map)` in `map-card.ts` is `minutesUntilChilled(startingBody(), map)`.

## Checks

| Command | Exit | Note |
|---|---|---|
| `npm test -- tests/sim/body.test.mjs` before the code (stubs returning wrong values) | 1 | 12 of the 15 new cases failed on their assertions; the 3 that passed were the ones the stub happened to satisfy (0 minutes at 35.0 °C and for a chilled body, chilled by the fire, frozen inputs) |
| `npm test -- tests/sim/body.test.mjs` after | 0 | |
| `npm test -- tests/sim/map-card.test.mjs` | 0 | cases unchanged |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 | Ran 2 tests, OK |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 | Ran 5 tests, OK |
| `npm run typecheck` | 0 | |
| `npx prettier --no-config --no-editorconfig --check` on the three files | 0 | |
| `npx eslint --max-warnings 0` on the three files | 0 | |

Not run: the whole gate (`npm test` with no argument), by the handoff.

The invariant tests were not seen failing first: the slice adds no breach of them (no argument is written to, no import leaves the simulation) and they are run for the new code; the freeze case in `body.test.mjs` ("the notes read the run they are given and change none of its values") exercises `simulation-inputs` on the new functions.

## Own-work check

Requirement most likely unmet: D-337's "violates" line, `bez ognia 80 min` where the body is chilled after 79.6 game minutes, together with "chilled by the fire still chilled" and the order of the temperature note. Checks written: 36.9 °C in Las gives 79 (the 80th minute ends at 34.98 °C); 35.0 °C gives minutes 0 and 34.99 °C gives chilled; a campfire on the character's tile with a body at 34.5 °C gives chilled; fire on the tile at 37 °C on a map at 37 °C gives fire, without fire it gives not cooling; an extinguished campfire and fire on another tile give minutes. All pass. Mutations considered: `<` to `<=` at the threshold (35.0 and 30.6 cases), `warmthAt > 0` to `>= 0` (the "minutes" cases), the tile of the check (the other-tile cases), fire before chilled (the chilled-by-fire case), rounding up (36.9 and 82 cases) — each is caught.

Expected values are hand-worked in the test comments from the data (0.024 and 0.06 °C a minute, 0.6 satiety a minute), not computed by the code.

## Reaches beyond the dispatch

- `npx prettier --write` on `body.ts` and `body.test.mjs` (formatter, no content change beyond layout). No other reach: every file read was in the handoff's *Read*; I opened `src/browser/sim/data/items.ts` lines 25-45 and `data/campfire.ts` lines 25-45 only to name the fixtures' burning item and campfire fields (not in the *Read*).
- `guidelines/testing.md` was read whole; the handoff's *Read* names it whole.

## Values that do not pass my own reckoning

None. All values of the task (83, 33, 116, 79, 86) reproduced by hand and by the code.

## Choices

- Names of the three functions and the shape of the note (tagged union) — mine. Rejected: returning the Polish words from the simulation (the words belong to the view, D-337 puts the wording in the body row). Cost if wrong: slice 3 adapts one import and a switch.
- `minutesUntilStarving` takes a `map` only because `bodyMinute` needs one. Rejected: a closed formula from `satietyLossPerMinute` (a second formula of the fall, D-333 *Rejected* for cooling by analogy). Cost if wrong: a signature with an argument that has no effect.
- `needNotes` takes a `Pick` of the run, so a view test can pass a light object. Cost if wrong: none.

## Questions and concerns

None.

## Searches not found or unclear

- The slice says the three functions are "named by the slice", but it names none; I chose the names above.
- `foundations/decisions.md` D-04 says the view reads the game state and the content data; a function of the simulation that returns structured notes (not text) fits it; nothing unclear beyond that.
