# Slice 2 report — Preserve validation and screen calculations through program construction

**Status:** done with concerns

**Worktree:** `C:/Storage/repos/loop2-wt/grupy-regul-i-liczniki` on `task/grupy-regul-i-liczniki`.

**Change:** Extended the test-only program fixture with `programRules(program)` and `programWithRules(rules)`. The latter keeps malformed rule-list inputs malformed; `programFromRules(...rules)` delegates to it without validation or normalization. Migrated remaining simulation and view test inputs to the shared fixture. Kept the 480-minute acceptance case, source comments, immutable-input checks, resource validation, and view calculation expectations. No product code changed.

| File | Added | Removed |
|---|---:|---:|
| `tests/sim/acceptance.test.mjs` | 25 | 24 |
| `tests/sim/conditions.test.mjs` | 9 | 4 |
| `tests/sim/data.test.mjs` | 32 | 25 |
| `tests/sim/flow.test.mjs` | 34 | 41 |
| `tests/sim/program-fixture.mjs` | 8 | 0 |
| `tests/sim/purity.test.mjs` | 9 | 10 |
| `tests/view/status-row.test.mjs` | 2 | 1 |
| `tests/view/terrain-picture.test.mjs` | 2 | 1 |
| `tests/view/tile-list.test.mjs` | 2 | 1 |

**Changed expectations and their basis:**

- `flow.test.mjs` checks the action kind, action, start minute and destination directly instead of requiring `ruleIndex` in started activities. The selection behavior remains explicit. The incidental position was not a game requirement, per `guidelines/testing.md`, “Behaviour, not implementation” (D-73); the replacement retains observable action and timing expectations from the slice's task passages and D-23.
- The new-game check now explicitly verifies the empty rule list and every existing required game-state property individually. The end check likewise verifies every existing required property individually. This preserves the assertions if future state adds unrelated fields; the new-game test deliberately does not assert group-specific defaults, which are reserved for Slice 5.
- The closed-list acceptance input and its condition/action enumeration now use the shared constructor/accessor; its named seed, 480-minute survival, required finished actions and empty-program death case are unchanged.
- Resource and condition validators still receive the same deliberately invalid values. `programWithRules("none")` preserves the malformed list type. Top-level `null` and `{}` remain raw invalid inputs because they do not contain a rule list to construct; they still reach `setProgram`'s refusal assertion.

**Choices:**

- Added `programWithRules` alongside the requested accessor so a malformed list can pass through the shared test fixture unchanged. The alternative was leaving this malformed input as a raw object; that would require another migration when the fixture's program envelope changes. The small cost is maintaining one additional test-only constructor.
- Removed the flow test's incidental `ruleIndex` expectation while keeping explicit action and timing checks. The alternative was retaining equality with an internal activity position; a valid refactor that stores selection differently would then break an unrelated flow test.
- Replaced whole-state checks for `newGame` and `end` with per-property assertions while retaining whole-value comparisons for canonical program/team inputs. The alternative was comparing the entire state and making unrelated state additions alter these assertions.

**Checks:**

- `npm test` (final tree): exit 1. Build and all 318 Node tests passed. Python ran 261 tests across four directories: agent-workflow (5), deploy (64), invariants (160) and quality (32). Agent-workflow, deploy and quality passed. Invariants had one `setUpClass` error in `test_loop2_one_serving_process.OneExpressProcessServesGameAndApi`: PowerShell `Get-NetTCPConnection -State Listen` returned no `MSFT_NetTCPConnection` objects. This is the same documented baseline environment error, not a pass. The gate stopped before its built-in foundation check. No Python tests were reported skipped. Full output is in `reports/slice-2-test.log`.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, 0 errors; run separately because `npm test` stopped before it.
- `node_modules/.bin/prettier --check tests/sim/program-fixture.mjs tests/sim/acceptance.test.mjs tests/sim/conditions.test.mjs tests/sim/data.test.mjs tests/sim/flow.test.mjs tests/sim/purity.test.mjs tests/view/status-row.test.mjs tests/view/tile-list.test.mjs tests/view/terrain-picture.test.mjs`: exit 0.
- `node_modules/.bin/eslint tests/sim/program-fixture.mjs tests/sim/acceptance.test.mjs tests/sim/conditions.test.mjs tests/sim/data.test.mjs tests/sim/flow.test.mjs tests/sim/purity.test.mjs tests/view/status-row.test.mjs tests/view/tile-list.test.mjs tests/view/terrain-picture.test.mjs --max-warnings 0`: exit 0.
- `git diff --check`: exit 0.

**Weakest-point check:** The likely weak point was preserving the validator's refusal of malformed rule content while switching test construction. `npm test` ran the changed `tests/sim/data.test.mjs` and `tests/sim/conditions.test.mjs`; all 318 Node tests passed, including invalid resource/kind/range values and malformed rule entries, and the 480-minute acceptance test passed. The separate Python environment error does not affect these Node results.

**Reads beyond the dispatch:** Read `reports/slice-1-report.md` and the relevant plan choice in `plan.md` to align the helper with the prior slice and confirm the shared fixture's intended scope. No production code or other consumers were changed.

**Not run:** No browser screenshot check was run because no browser-view product file or rendered behavior changed; the three view test files only changed how their program inputs are constructed. No separate focused test command was run because this repository's instructions require tests through `npm test`.

**Commit:** `98c629f` — `test: migrate remaining program fixtures`.