# Slice 1 report - pace in the simulation

**Status:** done

## Files and commits
One commit on `task/rozwiazanie-lasu` (message `feat: :sparkles: hold the pace the player picks in the game state and scale real time by it`):
`src/browser/sim/data/balance.ts` (+3: `paces: [1,2,4,8,16]`), `src/browser/sim/types.ts` (+`Pace` type derived from the data, `GameState.pace`),
`src/browser/sim/game.ts` (`newGame` pace 1, exported `setPace`, `passRealTime` scales by `state.pace`),
`tests/sim/time.test.mjs`, `tests/sim/flow.test.mjs`, `tests/sim/data.test.mjs`, `tests/invariants/test_player_map_run_pace.py`.

## Checks (command, exit code)
- Failing runs first (setPace stubbed as a no-op, so assertions failed, not a missing function):
  `npm test -- tests/sim/time.test.mjs` exit 1; `... flow.test.mjs` exit 1; `... tests/invariants/test_player_map_run_pace.py` exit 1
  (pace tests failed, the 16x control passed as expected). `data.test.mjs` was not seen failing: the data change was made before its test.
- After the implementation, all exit 0: time, flow, data, purity, discovery (tests/sim); test_player_map_run_pace, test_simulation_inputs,
  test_simulation_isolation, test_map_run_repeatability, test_minute_span_split (tests/invariants).
- `npx eslint --max-warnings 0 src/browser/sim` and the three changed sim tests: exit 0. Prettier applied (--no-config).
- Not run: ruff on the changed Python test (not installed in this environment); the full gate (`npm test` without a file), per handoff.

## Own-work check
Requirement most likely missed: carry counted at the pace it was passed (spec decision 2) and unchanged by `setPace`. Checks: time test
"a change of pace leaves the carried real time..." (500 ms at 1x + 31.25 ms at 16x = 1 minute; carry 500 kept across the switch) and the
invariant scenarios (PACE_SCENARIO, DISCOVERY_PACE_SCENARIO: 5200 ms at 16x leaves carry 200, the next 1000 ms stops in minute 84 with carry 0,
the carry of 200 dropped). All pass.

## Reaches beyond the dispatch
None.

## Choices
- Type `Pace = (typeof BALANCE.paces)[number]` in `types.ts` (type-only import of `BALANCE`); `newGame` writes the literal `1`. Rejected: reading `BALANCE.paces[0]` (widens meaning "starts at 1" to "first of list"). Cost if wrong: trivial.
- `setPace` validates with `includes` over the data list; non-numbers, 3, 1.5, NaN, "2" throw. State is left untouched on a throw.
- Invariant test `test_player_map_run_pace.py` changed: docstring reads the new wording without the completion words ("unless the map run ends in it"; the docstring's "Does NOT cover" names the completion); the existing four cases unchanged; the driver now also records `pace`; three new cases (pace scenario with the pace staying through pause, restart, end, send; the 16x control at pace 1; a discovery inside one real second at 16x with a pace chosen in the stop).

## Plan vs code
No mismatch. The handoff's updated foundation ranges were used; `foundations/invariants.md` already holds the new `player-map-run-pace` wording (including "unless the map run ends in it"), which this slice's docstring deliberately omits until Slice 5.

## Problems observed
None.
