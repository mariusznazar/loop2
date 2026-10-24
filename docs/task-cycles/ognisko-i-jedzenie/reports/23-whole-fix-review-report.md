PASS 4dc4ca442f963e490db204d332495473c0f478f0

# Review of the fix of the whole-change review — cycle `ognisko-i-jedzenie`

- Fix range: `c8260e6f3cda1a22a7fc83adfdfba85df99f8b3b..4dc4ca442f963e490db204d332495473c0f478f0`,
  one commit `4dc4ca4`, three files (`src/browser/sim/data/maps.ts`, `src/browser/sim/world.ts`,
  `tests/sim/world.test.mjs`); `git rev-parse HEAD` in the worktree is the given head.
- Read: the findings file `reports/21-whole-fix-findings.md`, the fix report
  `reports/22-whole-fix-report.md`, the diff of the range, and every use of `renewMinutes` under
  `src/` and `tests/` at the head.

## The findings file

**I-1 — a resource with no time to renew cannot be written in a game map's data — fixed.**

- `src/browser/sim/data/maps.ts:10` — `renewMinutes?: number;`, with a comment that a resource
  without it does not renew. A game map's data can now leave the time out by a change of data alone
  (D-18).
- `src/browser/sim/world.ts:52-54` — a resource renews only where
  `resource.renewMinutes !== undefined && minute % resource.renewMinutes === 0`; the doc comment
  says so.
- Evidence it no longer exists on the new head:
  - a probe file in a scratch worktree of `4dc4ca4` (`src/browser/sim/data/zz-probe.ts`, a map
    `satisfies MapDef` whose one resource has no `renewMinutes`), `npm run typecheck` → exit 0; the
    fixer's report gives exit 1 with TS2741 for the same probe on the base;
  - the new test „a resource whose map data gives no time to renew does not renew, while the others
    renew” passes: on a hand-made Las without the sticks' time, sticks stay at 10 and 0 at minutes
    1, 30, 40, 120 while berries renew to 5, 5, 6, 8 (hand-counted: +1 at 40, 80, 120 — checked);
  - the guard is held by the type check: with `resource.renewMinutes !== undefined &&` replaced by
    `true &&`, `npm run typecheck` reports an error (strict mode refuses `minute % undefined`).
- The fixer's caveat holds and lowers nothing: the runtime test also passed before the fix, since
  `minute % undefined` is `NaN`; what the finding named was the type, and the type side is held by
  `npm run typecheck` over the data, as the report says. The test still guards the runtime branch
  against a reading of a missing time as renewing every minute (the fixer's mutant, exit 1).

## What the fix itself might break

Nothing found. The other readers of `renewMinutes` — `tests/sim/world.test.mjs:62` and
`tests/sim/data.test.mjs:21-24` — read Las's data, which keeps all four times; Las's data and its
renewal are unchanged. No new Critical or Important finding.

## Minor

None.

## Declined to judge

None — the review is bounded by the findings file; the Minor and out-of-scope findings of the
whole-change review are not reopened here.

## Checks

Run in a separate detached worktree of `4dc4ca4` (scratchpad, `node_modules` linked, removed after):

| Command | Exit |
|---|---|
| `npm run build` | 0 |
| `npm run typecheck` | 0 |
| `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` | 0 (293 pass) |
| probe: a map `satisfies MapDef` with a resource lacking `renewMinutes`, `npm run typecheck`, probe removed | 0 |
| mutation: the `!== undefined` guard dropped, `npm run typecheck`, source restored | 1 (a type error) |
| `python -B -m unittest discover -s tests/invariants -p <file>` for `test_simulation_inputs.py`, `test_map_run_tiles.py`, `test_map_run_layout.py`, `test_minute_span_split.py`, `test_content_identifiers.py` | 0 each |
| `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree, read only) | 0 |

Not run: the full `npm test` (the cycle's run); Ruff and ShellCheck (not installed); container
checks (Docker's daemon does not run here).

## Reaches beyond the dispatch

- `git grep renewMinutes` at `4dc4ca4` over `src/` and `tests/` — to find every reader the optional
  field could break.
