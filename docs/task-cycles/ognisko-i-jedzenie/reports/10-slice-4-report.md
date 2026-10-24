# Slice 4 report — the body and death in the one-minute step

**Status:** done. **Commit:** 46ec64d (base 7a273ae).

## Files (added/removed lines)

- `src/browser/sim/body.ts` new, +67/-0 — unit 2: `startingBody()` from `BALANCE.body`;
  `bodyMinute(body, warmth, map)` returns the body after steps 1–2 of Decision 1 and the cause of
  death (`"cold"`/`"hunger"`) or `null`. Pure. Rounds to six decimal places with
  `Math.round(x * 1e6) / 1e6` after each change.
- `src/browser/sim/types.ts` +18/-1 — `Body`, `DeathCause`, `Death`; `MapRun` gains
  `body: Body` and `death: Death | null`.
- `src/browser/sim/run.ts` +25/-4 — `GameEvent` gains `{ kind: "characterDied"; minute; cause }`;
  `newMapRun` sets the starting body and `death: null`; `stepMinute` returns a map run ended in
  death unchanged with no events, otherwise runs the body first (warmth 0, nothing burns yet), and
  at death sets `minute`, `body`, `death` and returns only `characterDied` — `current`, tiles,
  character and generator stay as they stood, no `activityFinished`, no pick.
- `src/browser/sim/game.ts` +20/-8 — `advanceMinutes` changes nothing for a map run ended in death
  and breaks its loop at death; `passRealTime` changes nothing for a map run ended in death and sets
  `realMsCarry` to 0 when the span reaches death; doc comments of `restart`/`end` say they take a
  map run ended in death. `newMapRun` and `stepMinute` keep their arguments.
- `tests/sim/body.test.mjs` new, +268/-0 — 15 tests.

## Checks (command, exit code)

Test first:
- Stub `body.ts` (returns the body unchanged, no death) and the `Body`/`DeathCause` types;
  `npm run build` → 0; `node --test tests/sim/body.test.mjs` → 1: 14 of 15 failed, every failure an
  `AssertionError` (1 passed: the check that Las is the map with ambient 25).
- After the code: `node --test tests/sim/body.test.mjs` → 0 (15 pass). One test of mine was wrong
  on its own first run after the code (it advanced 30 minutes where it meant 1, so the death came
  one call early); fixed in the test, not in the code.

Slice *Checks*:
- `npm run build` → 0
- `node --test tests/sim/body.test.mjs` → 0
- `npm run typecheck` → 0
- `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` → 0 (184 pass, 0 fail)
- `python -B -m unittest discover -s tests/invariants -p <file>` → 0 each for
  `test_action_in_progress.py`, `test_player_map_run_pace.py`, `test_restart_seed.py`,
  `test_map_run_repeatability.py`, `test_program_rule_pick.py`, `test_simulation_inputs.py`,
  `test_simulation_isolation.py`, `test_simulation_randomness.py`
- `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier` → 0
- Extra: `npx prettier --check` on the five files → 0; `python -B .the-way/elements/common/foundation_check.py`
  (new files added to the index first) → 0, 0 errors.

Not run: full `npm test` (the cycle's run). No invariant test was written or changed in this slice,
so none had to be seen failing.

## What the tests hold (expected values by hand)

On Las: cooling 0.002 × 12 = 0.024 °C/min. Named minutes with program explore → walk to stick →
wander: minute 1 {36.976, 99.4, 100}; 83 {35.008, 50.2, 100}; 84 {34.984, 49.6, 99.65}; 116
{34.216, 30.4, 88.45}; 117 {34.192, 29.8, 87.75}; 167 {32.992, 0, 52.75}; 242 {31.192, 0, 0.25};
243 {31.168, 0, 0}, death {243, cold}, events of the call only `characterDied`; a wander 240→245 is
in progress at death (asserted) and stays as `current`. Hand-made bodies: warm but hungry
{37, 10, 0.35} → dies of hunger in minute 1 at exactly 0; chilled not starving {34, 50, 0.7} → 0.35
then dies of cold in minute 2 during an explore ending at 20; both {30, 10, 1} → loses 0.7 a minute,
dies of cold; health 99.9 → 99.95 → 100 → 100; satiety 0.4 → 0; warmth 0.5/0.15/0.03 through
`bodyMinute` with the cap on the sum. Exactness: 35.24 − 10 × 0.024 = 35.0 (binary
34.99999999999998) is not chilled and health rises; 33 − 5 × 0.6 = 30 (binary
29.999999999999993) is not starving. Span split: five splits of 260 minutes against one-minute calls,
the state after each call and all events deep-equal. Death passes no minute: `advanceMinutes` 0/1/50
and `passRealTime` 1/1000/60000 ms return the same state and no events. Restart of a dead run equals
the restart of the run sent anew (same seed, minute 0, fresh body); end gives no run and
`mapRunEnded`.

## Own-work check

Requirement most likely missed: the six-decimal rounding — that each threshold falls where decimal
arithmetic puts it. Check: a mutation making `decimal()` return its input unchanged, built and run
against `tests/sim/body.test.mjs` → 5 tests failed (the exactness test, named minutes, minute 243,
both-chilled-and-starving, satiety floor); code restored from a copy, rebuilt, 15 pass, `git diff`
showed no change to `body.ts` before the commit. Other mutations reasoned: `< 0` for `<= 0` → the
hunger test (health exactly 0) fails; cause swapped → hunger test fails; cap dropped → warmth test
fails; no carry reset → the real-time split test fails (500 vs 0); dropping both death guards → the
Las and "passes no minute" tests fail. Dropping only one of the two guards (`stepMinute` returning a
dead run unchanged, `advanceMinutes` breaking at death) is caught by no test, since either alone
gives the same behaviour — kept both as defence, noted here.

## Choices (way rejected, cost if wrong)

- **Body on `MapRun.body`, not inside `character`.** Rejected: `character.body` — `RunView` would
  give it to the program at once, but `tests/sim/actions.test.mjs:115` deep-equals `character` at
  minutes 0 and 20 and that file is outside this slice. Cost if wrong: Slice 9's conditions widen
  `RunView` to `"tiles" | "character" | "body"` (one line).
- **Death as `MapRun.death: { minute, cause } | null` plus event `characterDied`.** Cause values
  `"cold"`/`"hunger"`.
- **`mapRunEnded` stays at „Zakończ”/„Restart”, not at death** (left to the maker): a map run gives
  `mapRunEnded` once, when it leaves the state. Cost if wrong: Slice 11 adds it at death and drops
  it from restart/end of a dead run.
- **`passRealTime` sets `realMsCarry` to 0 when the span reaches death**, so the state at death does
  not depend on how real time was split (243.5 s in one call and 242.5 s + 1.5 s give the same
  state). Rejected: leaving the carry — a dead state differing by a carry nobody can use. Not
  required by the plan's text; cost if wrong: one line and one test.
- **Rounding:** cooling, the temperature sum, satiety and each health change are each rounded; caps
  and floors apply after rounding. Warmth is passed in as a number and rounded in the sum.
- **Warmth on the tile is the literal 0 in `stepMinute`**, with a comment that nothing burns yet;
  Slice 6 replaces it.
- `bodyMinute`'s returned body is always a new object (simulation-inputs).

## Adaptations (section 4)

None. The foundation-map ranges were used for D-35, D-50…D-55, D-64, the glossary and
`minute-span-split`.

## Reaches beyond the dispatch

- `src/browser/AGENTS.md` (repo `AGENTS.md` names it for work in `src/browser/`) — design tokens only,
  nothing for the simulation.
- `tests/sim/rules.test.mjs` S1/S2 scan and `tests/invariants/test_simulation_inputs.py` head —
  to see whether a new exported module and a `1e6` constant would be flagged (they are not; new
  exports are called with a pool of values, changes forbidden, throws allowed).
- `tests/sim/data.test.mjs:296-312` (an activity of 0 minutes) — to confirm `stepMinute` still
  finishes it; it passes.
- Slice 3 report — what the data holds.

## Problems observed

None. The known base failures (`test_loop2_one_serving_process.py`, Ruff, ShellCheck) were not met:
`npm test` was not run.
