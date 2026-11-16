# Slice 1 report — the unit of each condition with a number, held by a test

## Status

`done with concerns`

Concerns are in the section "Questions and concerns" below. The main one: the requirement the test holds has no entry in the foundation.

## Commits

- `13ac5dd9` — `test: :white_check_mark: require the unit of each condition that takes a number and no unit of one that takes none`
  - `tests/sim/data.test.mjs`: +27, −0
- Range of this slice: base `fecbea47f64b4fbdb69f1458862d2e75672e186a` to head `13ac5dd9`.

## Files changed

- `tests/sim/data.test.mjs` — one new test, 27 lines added, no line removed.
- `src/browser/sim/data/conditions.ts` — not changed in the end. The handoff's *Change* line lists it. The test alone meets the goal, so I did not add a type-level rule. Net diff of this file: none (checked with `git status`).

## What the test holds

New test in `tests/sim/data.test.mjs`, after "conditions carry labels and the value range of hereBelow":

"each condition that takes a number carries its unit, and a condition that takes none carries no unit"

- A condition takes a number when it has any of `defaultValue`, `min`, `max`, `step`. Then all four must be present, `unit` must be a non-empty string.
- A condition with none of these must have no `unit` key.
- The test reads `CONDITIONS` from `dist` (the built data), as the rest of the file does. The expected values are the rule, not computed by the code under test.
- The current data holds `unit` on the 8 numeric conditions and on none of the 2 plain ones (`always`, `awayFromCampfire`). No value was changed.

## Checks

Each command was run from the worktree root. No full suite was run.

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `npm test -- tests/sim/data.test.mjs` (new test written, data unchanged) | 0 | 37 of 37 pass |
| 2 | Failing run: `unit: "szt."` removed from `itemBelow` in `src/browser/sim/data/conditions.ts` (worktree only), then `npm test -- tests/sim/data.test.mjs` | 1 | The new test fails with `AssertionError: itemBelow takes a number without a unit` (the test's own assertion, not a build error) |
| 3 | Unit restored in `conditions.ts`, then `npm test -- tests/sim/data.test.mjs` | 0 | 37 of 37 pass; `git status` shows `conditions.ts` unchanged |
| 4 | `npx prettier --check tests/sim/data.test.mjs src/browser/sim/data/conditions.ts` (first run before `--write` exited 1 on `data.test.mjs` only; `prettier --write` changed only the new lines) | 0 | All matched files use Prettier style |
| 5 | `npm test -- tests/sim/data.test.mjs` after prettier | 0 | 37 of 37 pass |
| 6 | `npm test -- tests/invariants/test_program_closed_lists.py` | 0 | 3 tests OK |
| 7 | `npm test -- tests/invariants/test_simulation_type_check.py` | 0 | 4 tests OK |

Not run: `python -B .the-way/elements/common/foundation_check.py` and the other checks, as they are outside the slice's *Checks* and the orchestrator runs the gate.

Test first: the new test was written before any run. It passes on the unchanged data, since the data already holds the units. The failing run (check 2) is the seen-failing step the method asks for in place of a test-first failure.

Mutation testing (StrykerJS) is for the reviewer of `simulation` changes, per `guidelines/testing.md` "Mutation testing"; I did not run it.

## Own-work check

- Requirement most likely not met: a condition that takes a number, but has a unit missing or an empty one, passes unnoticed; or a condition with a unit and no number slips in. Also: a number condition that has only some of its four number fields, so the test would miss it.
- Check: check 2 above removes one unit from a numeric condition and runs the test on the built data.
- Run: check 2 → exit 1, the assertion names `itemBelow`. After restoring the unit, check 3 → exit 0.
- Not run: a removed unit from a plain condition, and a partial set of number fields. The test code covers both by its `else` branch and by the per-field `assert.ok`, but I did not run a mutation for them. Reviewer may add one.

## Questions and concerns

1. **The requirement has no foundation entry.** `guidelines/coding.md` / `guidelines/testing.md` (Where the expected value comes from): a requirement a test needs that the foundation does not carry goes into the foundation first, then the test uses it. The settlement 16 in the task says "Goes to: data or code", so no decision records that every number condition needs a unit. D-376 does not state it either (it gives ranges, steps and numbers). The test cites D-376 only for the definition of "takes a number". Recommendation: the orchestrator decides whether to record the unit rule in D-376 (or a new decision) through `the-way-record-decision`, as the guideline asks. Cost of leaving it: a later reviewer asks "skąd ta wartość?" for the rule and finds only the task. Cost of recording it: one foundation change in this cycle, outside my slice. I did not write a foundation entry.
2. **`conditions.ts` is in the handoff's *Change* but not changed.** I took the test-only option the goal allows. The alternative — a type-level rule in `ConditionDef` (a union where number conditions require `unit`) — would also cover new conditions at compile time, but it touches consumers (`program.ts`, `understanding.ts`, `status-row.ts`) and needs `npm run typecheck`. I did not run that. Orchestrator may ask for it in a later slice if wanted.
3. No design choice of the test's wording was left open; the test name follows the goal.

## Unread material

- `foundations/part_map.md:30-61` — not read by me; the part `simulation` file list. Its only use would be the reviewer's part check. `tests/sim/data.test.mjs` and `src/browser/sim/data/conditions.ts` match the `simulation` part's globs (`src/browser/sim/**`, `tests/sim/**`).
- `.runs/task-cycles/drobne-bledy-ekranow/task.md` — not opened; the passages used are those in the handoff, word for word, as the handoff gives them.
- `src/browser/view/status-row.ts` — read only lines 60–85 (the range the handoff names is 70–80). Not changed.
- `foundations/decisions.md` D-376 and D-23 and `foundations/invariants.md` `program-closed-lists` and `simulation-isolation` — read at the ranges the handoff names.
- Read whole: `guidelines/coding.md`, `guidelines/coding-content-data.md`, `guidelines/testing.md`, `src/browser/sim/data/conditions.ts`, `tests/sim/data.test.mjs` (the parts I changed and their context), `tests/invariants/test_program_closed_lists.py`, `tests/invariants/test_simulation_type_check.py`, `.the-way/task-cycle/change/SKILL.md`, `.the-way/task-cycle/change/slice.md`, `src/browser/AGENTS.md`.

## Searches not found or unclear

- `grep` for "jednostk" in `foundations/decisions.md`: no hit. So no decision states the unit rule (see concern 1).
- `unit` in `src/browser/sim/program.ts` and `understanding.ts` (both use `ConditionDef`): not read in full; not affected because the data file's shape did not change.

## Reaches beyond the handoff

- Read `guidelines/testing.md` in two pages (the first page was partial), so the whole file is covered.
- Read `src/browser/AGENTS.md` because my change is under `src/browser/`. Its rules (colour and length tokens in the browser view) do not apply to this change: no style value is touched.
- Read `.the-way/AGENTS.md` and `.the-way/task-cycle/change/*` only as the method names them.

## Working copies

- I made no worktree, clone or script. The check logs went to `.runs/slice-1/` (the directory the handoff names). I removed that directory before returning; the outputs of the checks are the table above. Nothing was left behind; `git worktree` was not used.
