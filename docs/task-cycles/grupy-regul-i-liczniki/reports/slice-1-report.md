# Slice 1 report — Preserve action and world checks through program construction

**Status:** done with concerns

**Worktree:** `C:/Storage/repos/loop2-wt/grupy-regul-i-liczniki` on `task/grupy-regul-i-liczniki`.

**Change:** Added test-only `programFromRules(...rules)` in `tests/sim/program-fixture.mjs`. It returns the existing flat `{ rules }` shape and performs no validation or repair. Migrated all program inputs, including deliberately malformed actions, in the eight named simulation tests. No production files changed.

| File | Added | Removed |
|---|---:|---:|
| `tests/sim/program-fixture.mjs` | 3 | 0 |
| `tests/sim/actions.test.mjs` | 60 | 60 |
| `tests/sim/body.test.mjs` | 7 | 8 |
| `tests/sim/campfire.test.mjs` | 29 | 29 |
| `tests/sim/gather.test.mjs` | 20 | 19 |
| `tests/sim/team.test.mjs` | 5 | 3 |
| `tests/sim/time.test.mjs` | 5 | 3 |
| `tests/sim/traits.test.mjs` | 2 | 1 |
| `tests/sim/world.test.mjs` | 2 | 1 |

**Changed expectations and their basis (D-73):**

- `actions.test.mjs`, “a map run starts…”: the expected activity now specifies Explore and retains event kind, minute, and null destination; it no longer requires rule position 0.
- `actions.test.mjs`, “explore takes 20 minutes…”: the started activity checks Explore, minutes 0–20, and no destination. The finishing events still require `activityFinished` before `tileRevealed` at minute 20 and the entrance location. The former `ruleIndex: 0` is not a game requirement.
- `actions.test.mjs`, “the next activity is chosen…”: checks that Wander starts in minute 20, independent of its position in the program.
- `actions.test.mjs`, “a step lasts…”: checks Wander, minutes 1–10, the selected destination, and the ordered finish/move events; after arrival it checks Explore. The previous rule position carried no independent requirement.
- `campfire.test.mjs`, “each action lasts…”: each action kind remains explicit, as do its start, duration, destination and unchanged backpack; the rule position is removed.
- `campfire.test.mjs`, “Idź — ognisko takes one move…”: checks the walking action, start and end minute, and the nearer campfire tile as destination.
- `campfire.test.mjs`, “Idź — ognisko is passed over…”: replaces `ruleIndex === 1` with the selected Wander action when walking to a campfire is infeasible on the character’s tile.

The remaining `ruleIndex` occurrences in these files construct a hand-made current activity for the simulation state (`campfire.test.mjs`, `gather.test.mjs`, `world.test.mjs`); they are not assertions about which program rule should win. `types.ts` and `run.ts` confirm that the current run state still represents an activity with a rule position. The index remains in these state fixtures so the tests preserve their intended setup.

**Choices:**

- A variadic helper accepts rule objects and returns only `{ rules }`; rejected duplicating the flat constructor in each test file. The small maintenance cost is keeping one test helper aligned with the test input contract; it cannot silently normalize invalid fixtures.
- Behaviour assertions now name action, time, destination, effect and event order where relevant; rejected preserving whole-activity equality as the oracle. If future tests omit an actual behaviour while removing an implementation detail, the loss would be visible in review; the migrated assertions retain each independent expectation described above.
- No failing-first run was added: the helper copies test inputs only and adds no behaviour, as the slice instructions specify.

**Checks:**

- `npm test` (first run, begun before the final event assertion and formatting were settled): Node 318 passed, 0 failed, 0 skipped; `tests/agent_workflow` 5 passed; `tests/deploy` 64 passed; `tests/invariants` 160 run, one `setUpClass` error; `tests/quality` 32 passed. Exit 1. This is not the authoritative check of the final tree.
- `node_modules/.bin/prettier --write tests/sim/program-fixture.mjs tests/sim/actions.test.mjs tests/sim/campfire.test.mjs tests/sim/gather.test.mjs tests/sim/body.test.mjs tests/sim/team.test.mjs tests/sim/time.test.mjs tests/sim/traits.test.mjs tests/sim/world.test.mjs`: exit 0; formatted the changed tests.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, 0 errors. The npm gate stopped before its built-in foundation check, so this was run separately.
- `npm test` (final tree): Node 318 passed, 0 failed, 0 skipped; `tests/agent_workflow` 5 passed; `tests/deploy` 64 passed; `tests/invariants` ran 160 tests with one `setUpClass` error; `tests/quality` 32 passed. Exit 1. No skipped tests were reported: Node reports 0 skipped, and the Python runner output contained no skip markers in any group. The Docker-backed image-icons test in `tests/deploy` and the container checks in `tests/invariants` did not skip, so the three Docker skips from the base run did not recur. The error was `test_loop2_one_serving_process.OneExpressProcessServesGameAndApi.setUpClass`: PowerShell `Get-NetTCPConnection -State Listen` found no `MSFT_NetTCPConnection` objects. This is the documented baseline environment failure; it is not reported as a passing check. The gate therefore did not reach its own foundation check. Raw output for both `npm test` runs remained in the tool transcript; I did not save log files despite the handoff instruction.
- `git diff --check`: exit 0.
- Weakest-point check command: `rg -n 'ruleIndex|rules:|const program|function program|\bprogram\(' tests/sim/actions.test.mjs tests/sim/campfire.test.mjs tests/sim/gather.test.mjs tests/sim/body.test.mjs tests/sim/team.test.mjs tests/sim/time.test.mjs tests/sim/traits.test.mjs tests/sim/world.test.mjs`; exit code 0. It returned only the no-rules comment, the three current-activity fixtures, and `programBefore`; there are no raw `rules:` inputs or local program builders in the selected files. The final `npm test` exercised the changed Node tests successfully.

**Reads beyond the slice’s named material:** `src/browser/sim/types.ts`, `src/browser/sim/run.ts`, and `src/browser/sim/game.ts` were checked to distinguish rule-position expectations from the current-run activity representation. No other code or product behaviour was changed.

**Commit:** `2dfc91f` — `test: build simulation programs from explicit rules`.


