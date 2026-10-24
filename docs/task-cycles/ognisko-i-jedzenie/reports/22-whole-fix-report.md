# Fix report — whole-change review finding I-1, cycle `ognisko-i-jedzenie`

**Status:** done

Base: c8260e6f3cda1a22a7fc83adfdfba85df99f8b3b. Commit: 4dc4ca442f963e490db204d332495473c0f478f0
("fix: let a game map's data leave out a resource's time to renew, meaning the resource does not
renew").

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/sim/data/maps.ts` | 2 | 1 |
| `src/browser/sim/world.ts` | 4 | 1 |
| `tests/sim/world.test.mjs` | 43 | 0 |

## Finding I-1 — fixed

- `MapResourceDef.renewMinutes` is optional (`renewMinutes?: number`), with a comment: left out, the
  resource does not renew. A game map's data can now omit the time by a change of data alone (D-18).
- `worldMinute` renews only a resource with a time:
  `resource.renewMinutes !== undefined && minute % resource.renewMinutes === 0`; its doc comment
  says a resource with no renewal time does not renew.
- New test in `tests/sim/world.test.mjs`: "a resource whose map data gives no time to renew does
  not renew, while the others renew" — a hand-made map (Las with the sticks' time left out), sticks
  set to 10 and 0 below a stock of 12, berries to 5 below 8; at minutes 1, 30, 40 and 120 the
  sticks stay at 10 and 0 while the berries read 5, 5, 6, 8 (hand-counted: +1 at 40, 80, 120).

## Test first — what failed and how

- The runtime test **passed on the base** (`node --test --test-name-pattern="does not renew"
  tests/sim/world.test.mjs`, exit 0): in JavaScript `minute % undefined` is `NaN` and `NaN === 0`
  is false, so the compiled code already skipped such a resource. The gap the finding names lay in
  the type, not in the runtime behaviour.
- The type-level failure, seen with an exploratory file (`src/browser/sim/data/zz-probe.ts`, a
  `satisfies MapDef` map whose one resource has no `renewMinutes`, deleted before the commit):
  - base: `npm run typecheck` → exit 1, `error TS2741: Property 'renewMinutes' is missing in type
    '{ id: "stick"; density: number; stock: number; }' but required in type 'MapResourceDef'.`
  - after the fix: `npm run typecheck` → exit 0.
- The break the runtime test catches, shown by a mutant (restored before the commit): a missing
  time read as renewing every minute (`minute % (resource.renewMinutes ?? 1) === 0`) →
  `node --test --test-name-pattern="does not renew" tests/sim/world.test.mjs` exit 1,
  "sticks at minute 1 — actual [11, 1], expected [10, 0]". It is a bug, not a deliberate decision:
  the task makes "no time meaning a resource that does not renew" true.
- No type-level test exists in the repository (no test compiles a TS snippet), so the type side
  stays protected only by `npm run typecheck` over the real data; the test guards the runtime
  behaviour and the explicit branch.

## Checks (after the fix, on 4dc4ca4)

| Command | Exit |
|---|---|
| `npm run build` | 0 |
| `npm run typecheck` | 0 |
| `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` | 0 (293 tests, 293 pass) |
| `python -B -m unittest discover -s tests/invariants -p test_map_run_tiles.py` | 0 |
| `python -B -m unittest discover -s tests/invariants -p test_map_run_layout.py` | 0 |
| `python -B -m unittest discover -s tests/invariants -p test_content_identifiers.py` | 0 |
| `python -B -m unittest discover -s tests/invariants -p test_minute_span_split.py` | 0 |
| `python -B -m unittest discover -s tests/invariants -p test_simulation_inputs.py` (calls `worldMinute`; added as a test of touched code) | 0 |
| `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier` | 0 (2 tests) |
| `python -B .the-way/elements/common/foundation_check.py` | 0 (0 errors) |

Not run: the full suite (`npm test`) — the cycle's run before the request, not this fix's; Ruff,
ShellCheck and Docker checks — absent on this machine, per the handoff.

## Own-work check

- Requirement most likely unmet: that a map with a resource lacking a time is accepted by the
  type, not only handled at runtime. Check: the exploratory `satisfies MapDef` file above under
  `npm run typecheck` — exit 1 on the base, exit 0 after the fix.
- Second: that the other resources keep renewing on such a map — the new test's berries at 40 and
  120 minutes (6 and 8).

## Choices

- Optional field over `renewMinutes: number | null`. Rejected `null`: the data would have to write
  `renewMinutes: null` for "no time", a value rather than an absence; cost if wrong — a one-line
  type change and the guard in `worldMinute`.
- The explicit `!== undefined` guard rather than relying on `NaN`: TypeScript strict mode rejects
  `minute % undefined`, and the guard states the rule.
- No change to Las's data or to `tests/sim/data.test.mjs`: Las renews all four resources.

## Reaches beyond the dispatch

- `tests/invariants/test_simulation_inputs.py` — found by a grep for `worldMinute`; it calls the
  function, so I ran it as a test of the touched code.
- `tsconfig.browser.json` and `package.json` — to see what `npm run typecheck` covers and whether a
  type-level test existed.

## Problems

None observed.
