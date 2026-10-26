# Slice 6 — grouped program contract and rule selection

Status: **done with concerns** — the only final gate error is the known Windows listener-query failure described below.

Worktree: `C:/Storage/repos/loop2-wt/grupy-regul-i-liczniki`.
Branch: `task/grupy-regul-i-liczniki`; base: `3399e5c69a9a445f4a097a6b2df60ac5937d4694`.
Model: inherited parent model, same class. No child agents.
Process gitlink and initialized submodule both: `2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c`.
Commit: `eac97b8` — `feat: :sparkles: select program rules through ordered groups`.

## Result and boundary

Program holds one-level ordered groups, globally unique rule identities, group identities and explicit next-identity counters. A new game starts with one empty Program group under always. Group and rule conditions use the same validator and evaluator. Selection skips false, empty and infeasible groups and starts the first qualifying rule. Activity retains its rule identity and copied action even when the originating rule is edited, removed or moved.

The existing editor shows each group's name, condition and rules, with an add button per group. Its pure edits take group identity plus rule position; focus targets carry the group identity too. Rule arrows stop at group boundaries. Field defaults, numeric rounding/clamping, resources and item selections remain covered by the migrated tests. This slice adds no group controls, drag/drop or firing counters; those remain later work.

Only the ten assigned files changed:

| File | Added | Removed |
|---|---:|---:|
| `src/browser/sim/game.ts` | 58 | 11 |
| `src/browser/sim/program.ts` | 10 | 8 |
| `src/browser/sim/types.ts` | 20 | 4 |
| `src/browser/view/program-editor.ts` | 220 | 69 |
| `tests/invariants/program_fixture.py` | 12 | 2 |
| `tests/invariants/test_program_closed_lists.py` | 32 | 3 |
| `tests/invariants/test_program_rule_pick.py` | 75 | 39 |
| `tests/sim/program-fixture.mjs` | 21 | 3 |
| `tests/sim/program.test.mjs` | 226 | 5 |
| `tests/view/program-editor.test.mjs` | 274 | 118 |

## Checks

All paths below are relative to this report's directory. All test runs used `npm test`, never a focused invocation. Each log's companion `.exit-code` stores the actual native exit code. PowerShell capture was:

```powershell
npm test *> .runs/task-cycles/grupy-regul-i-liczniki/reports/<name>.log
$gateCode = $LASTEXITCODE
Set-Content -Encoding ascii .runs/task-cycles/grupy-regul-i-liczniki/reports/<name>.exit-code $gateCode
exit $gateCode
```

| Command / log | Exit | Observed result |
|---|---:|---|
| `npm test` / `slice-6-invariant-before.log` | 1 | Before product changes: Node 318 PASS; agent workflow 5 PASS; deployment 64 PASS; invariants 163, two intended failures and the known listener error; quality 32 PASS. No skips. The new grouped selection input and positive group-condition input were refused with `program: no list of rules`. This proves the contract is absent, not the selection ordering itself. |
| `python -B .the-way/elements/common/foundation_check.py` / `slice-6-foundation-before.log` | 1 | Two new invariant annotation comments had explanatory text after the identifier; both later corrected. Foundation checking was not reached by the preceding gate. |
| `npm test` / `slice-6-node-before.log` | 1 | Still before product changes: 318 existing Node tests PASS, eight added tests FAIL. New-game assertion saw no groups; other tests' valid grouped inputs were refused. Python and foundation stages were not reached. |
| `python -B .the-way/elements/common/foundation_check.py` / `slice-6-foundation-node-before.log` | 1 | Same two malformed comments, before correction. |
| `npm test` / `slice-6-build-first.log` | 1 | First implementation build failed TS2345: the group-condition label array inferred only literal labels. Fixed by declaring `string[]`. No tests or foundation check ran in this attempt. This is not a deliberate failing-test result. |
| `npm test` / `slice-6-order-control.log` | 1 | With the migrated contract and a deliberate reversed group iteration, 325 Node tests PASS and exactly two ordering tests FAIL: rule 11/wander instead of 24/explore; after moving duplicate-content rules, 91 instead of 17. The original picker was restored byte-for-byte before the final run. Python and foundation stages were not reached. |
| `python -B .the-way/elements/common/foundation_check.py` / `slice-6-foundation-migrated.log` | 0 | Corrected annotations; foundation valid after migration and restoration of the correct picker. Covers the build/control attempts that did not reach this check. |
| `npm test` / `slice-6-test.log` | 1 | Node 327 PASS; agent workflow 5 PASS; deployment 64 PASS; invariants ran 163 tests with zero assertion failures and one known setUpClass error; quality 32 PASS. 264 Python tests across four directories. No skips, including all three Docker checks. New group tests and changed invariant cases PASS. Foundation stage was not reached by this failed gate. |
| `python -B .the-way/elements/common/foundation_check.py` / `slice-6-foundation-final.log` | 0 | Separate required final check: `0 errors`. |
| `git diff --check` | 0 | No whitespace errors. |
| `rg -n 'ruleIndex' src tests` | 1 | No matches, the expected successful removal result. |
| `rg -n 'ruleActivity' tests/sim/program-fixture.mjs tests/sim/campfire.test.mjs tests/sim/gather.test.mjs tests/sim/world.test.mjs tests/view/status-row.test.mjs` | 0 | Positive search control: constructor and all four handmade Activity consumers found. |
| `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD` | 0 each | Matching pinned commit shown above, checked at start and after commit. |
| `git status --short` after commit | 0 | Empty; all assigned changes committed and no other tracked change present. |

Formatting command, exit 0: `node node_modules/prettier/bin/prettier.cjs --write src/browser/sim/types.ts src/browser/sim/game.ts src/browser/sim/program.ts src/browser/view/program-editor.ts tests/sim/program-fixture.mjs tests/sim/program.test.mjs tests/view/program-editor.test.mjs`. The editor was formatted again after its type fix, exit 0. No tests were skipped, assertions weakened or lint rules changed.

The deliberate reverse-order run supplies evidence about selection order after accepting grouped inputs; the initial contract refusals are not presented as that evidence. The grouped Python cases were introduced before implementation and both were observed failing in the first full gate. Their final result is recorded above.

The final failure is `test_loop2_one_serving_process.OneExpressProcessServesGameAndApi.setUpClass`, at `tests/invariants/test_loop2_one_serving_process.py:177` / `tcp_listeners` line 118. PowerShell `Get-NetTCPConnection -State Listen` reports no `MSFT_NetTCPConnection` objects. This exactly recurs from the provided baseline and first failing-first run. The class's serving-process check remains unverified on this host; neither the full gate nor that check is reported as passing. No unrelated test or host setting was changed, and no root cause beyond the observed command failure is asserted.

Own diff inspection covered all ten files after migration, including the unchanged-field assertions in the editor, fixture malformed-input handling and the long-run checker expectations. No additional blocker was found. The final gate and browser checks ran against the committed source content; no product or test file changed during that final gate. No subsequent stage, push or PR was started.

## Browser evidence and weakest point

The most likely missed requirement was retaining the correct group and focus during a structural edit, especially when a group is not first and identities differ from positions. The pure two-group test and real-browser checks below exercise that requirement. The pure test also compares the unchanged original program and unchanged other group, and validates each edited program through `setProgram`.

The local built product ran using `node dist/server/main.js`, with `LOOP2_LISTEN_HOST=127.0.0.1` and an OS-selected available port obtained by a temporary `TcpListener(..., 0)`. The actual address was `http://127.0.0.1:60389/`. The server announced listening, the browser loaded it, and the owned server was stopped with Ctrl-C after the checks (process exit 1 from interruption). No production server or external writes were involved.

Browser operations used the available `mcp__playwright__browser_run_code_unsafe`, navigate, resize and console tools after reading the playwright-mcp skill and its applicable references. Browser operations have tool success/error results rather than shell exit codes.

Observed at 1440 × 1000:

- Actual application new game: one empty Program group, condition Zawsze, no rule rows. Adding a rule focuses Warunek. Switching that focused control to temperature preserves focus and shows 36.5 with range 30–37 and step 0.1.
- Typing 36.57 leaves the partial value and focus intact until Tab; it then commits 36.6 and focuses Akcja. Adding a second rule focuses its condition. Moving it upward keeps focus on W górę in its new first row. Deleting it focuses the following Usuń; deleting the last rule focuses Dodaj regułę. Keyboard Enter adds again and the new condition has `:focus-visible` with a solid outline.
- Actual application journey: created Ala, sent that character to Las and observed minute 4 / Eksploruje plus the SVG terrain. Paused the run. An initial send locator based on visible text timed out because its accessible name is `Wyślij: Ala, mapa Las`; the inspected accessible name then worked. This was an automation selector error, not an application failure.
- For groups unavailable to create through this intermediate UI, mounted the actual `createProgramEditor` in the same panel using a state returned by `setProgram(newGame(), literalProgram)`. Its commit callback called real `setProgram` and `editor.update`; it did not fabricate GameState or implement a substitute editor. Group ids were 8 and 3, rule ids initially `[1]` and `[2,4]`.
- Add in group 3 produced `[2,4,11]`, nextRuleId 12, and focused that group's third condition. Down at its last row committed nothing. Up produced `[2,11,4]` and focused that group's middle up arrow. Selecting item moss and action resource berry updated only the addressed rules. Deleting repeatedly preserved focus in group 3; after the last deletion it focused that group's add button. Adding again produced rule id 12, not a reused id, with nextRuleId 13; group 8 remained `[1]`.
- The new rule in group 3 switched to hereBelow with default 1, range 0–50, step 1 and the map's four resources. Empty number input restored 1 without a commit. ArrowDown on the focused condition-resource select chose berry while retaining visible focus. Entering 99 and Tab clamped to 50.
- Fresh navigation restored the real initial application and showed no console errors. The first navigation had only a favicon.ico 404; no application exception was observed.

Screenshots saved in this report directory and actually opened with `view_image`:

- `slice-6-browser-initial.png`: real initial application, empty Program group and headquarters.
- `slice-6-browser-groups.png`: two-group editor, visible keyboard focus in group 3 after deleting and re-adding. The right panel shows the paused actual application run; this is explicitly the one-time editor mounting described above, not a full multi-group application journey.
- `slice-6-browser-number.png`: second group's numeric/resource row, clamped 50 and visible focus on berry. Rule controls wrap inside the panel without overlap.

### Screenshot capture for the next slices

The screenshot tool rejected a direct worktree path: its allowed roots are `C:/Storage/repos/loop2` and that checkout's `.playwright-mcp`. No screenshot was deliberately written outside the task worktree. Navigation's automatic artifacts remain a tool property. The orchestrator approved this memory-only capture, which succeeded without truncation:

1. Call `browser_run_code_unsafe` with `async (page) => (await page.screenshot({fullPage:true})).toString('base64')` — no `path` and no filesystem operation inside browser code.
2. In `functions.exec`, hold the tool result without printing it. Join text content and extract the quoted result with `/### Result\r?\n"([A-Za-z0-9+/=]+)"/`. The group screenshot yielded 99,252 base64 characters.
3. Use `tools.apply_patch` to write that extracted string to the corresponding `.b64` file in this worktree's reports directory; never print the string with `text()`.
4. Decode with `exec_command`, explicit task worktree, e.g. `[IO.File]::WriteAllBytes((Join-Path (Get-Location) '.runs/task-cycles/grupy-regul-i-liczniki/reports/slice-6-browser-groups.png'), [Convert]::FromBase64String([IO.File]::ReadAllText((Join-Path (Get-Location) '.runs/task-cycles/grupy-regul-i-liczniki/reports/slice-6-browser-groups.b64'))))`. Exit 0 for all three captures.
5. Open each resulting PNG with `view_image` and inspect it. This obeys the screenshot tool's refusal; it does not bypass path checks using a browser-side write.

D-89 exclusions revisited: complete player journeys, pixel comparisons and real browser events/focus remain manual for this slice. No critical journey defect or repeated manual-check burden was found to trigger permanent browser automation. No new shared control, visual token, SVG algorithm, loading state or error presentation was added. Existing common button/select/number behavior and visible focus were exercised. Group creation/rename/reorder/delete, transfers and drag/drop are not implemented or claimed checked here; their full journey belongs to Slice 8.

## Expectations and implementation choices

- D-23 / program-rule-pick and D-90 require group gating and ordered selection; D-91 requires the initial empty Program group. New tests use explicit unrelated group/rule IDs so treating positions as identities fails. The plan's stable identity choice changes old positional activity expectations to deterministic fixture IDs; the expected action, wait durations, order and long-run semantics remain independently written out.
- D-20 / action-in-progress: the new integration case edits, removes and transfers an active rule, checks the unchanged running action before completion and its actual tile-reveal/finished event. The existing action-copy and no-mutation coverage stays. Handmade activities can outlive their source rule; `ruleActivity` does not look up that source.
- program-closed-lists now checks all seven legal group conditions and malformed group kinds in headquarters and during a run, with legal positive controls. Existing rule-condition/action and field refusal tests remain.
- Changed invariant tests: `test_program_rule_pick.py` adds grouped ordering and migrates its long-run checker and negative controls to stable IDs; its checker additionally rejects a matching ID carrying a wrong action. `test_program_closed_lists.py` adds group conditions. The invariant foundation prose was already grouped by the prior foundation commit, so no foundation write was necessary.
- Private validation checks positive safe integers, uniqueness, next-counter bounds and one-level groups, then copies canonical conditions/actions through existing validators. Alternative: retain a flat compatibility model; rejected because it would create two production sources of truth. Cost if wrong: migration omissions cause boundary refusal, covered by the full suite and scans. No new simulation function is exported.
- JS/Python fixtures allocate deterministic IDs only on object/dict rule inputs and wrap the unchanged malformed list when it is not an array/list. They neither validate invalid fields away nor predict outcomes. Alternative: individually rewrite every consumer; rejected because the already-prepared constructors were the assigned migration boundary. Cost if wrong: fixtures could mask malformed input, so the existing malformed inputs continue through the shared validator tests.
- Editor operations address group ID and row position; replacement preserves other groups and identity counters. Structural changes rebuild rows and apply a group-scoped pending focus target; ordinary field changes retain the controls. Alternative: flatten groups for editing; rejected because arrows and deletion could affect another group. Cost: later drag work must resolve a moved rule's location; this slice deliberately does not add that interaction.
- Group headings and read-only condition summaries use existing data labels and shared controls, with no new styles/tokens. Alternative: full group editing here; rejected as Slice 8 scope. Cost: existing groups can be edited rule-by-rule now, but users cannot yet create/rename/transfer groups through this intermediate UI.

## Reading beyond the handoff and adaptations

Read all named guidelines in full, assigned source/test files in full before editing, and the selected foundation entries. No whole task, whole plan or cycle file was opened. Additional selective reading:

- `C:/Users/Mariusz/.codex/AGENTS.md`, nested browser instructions and pinned change skill: required operating rules.
- `.the-way/gate/run_tests.py`, `package.json`, existing invariant support and quality configuration: understand full gate ordering, log capture and why the foundation stage needs a separate run after failure.
- `tests/invariants/test_simulation_inputs.py` in full: investigate its raw `s.program.rules.push`. It is part of a synthetic negative-control state created by that checker, not product input. It remains intentionally unchanged; no out-of-scope test migration was needed.
- Existing container/deployment test code and Slice 5 report: distinguish actual current Docker coverage from historical skips and the known Windows listener failure.
- `src/server/main.ts`, README and the existing browser app wiring: start only the local built product and mount the real editor for the one-time two-group check.
- Global code-review playbook (after the required Obsidian rulebook), for checking the authored diff; playwright-mcp skill plus grounding, session setup, page reading, selectors/clicking, timing, false positives, session patterns and API/state references for actual UI checks.
- `ruff.toml` and quality runner: retain repository formatting/lint conventions. An attempted read of nonexistent `tests/quality/test_source_quality.py` failed and was not used as evidence.

Adaptation: browser tool names in the handoff were hints; actual callable metadata was discovered. The screenshot path restriction was handled as described above. A prepared script briefly failed to match a Unicode comment through PowerShell stdin; it stopped before the order mutation, and edits were completed with `apply_patch`. The resulting build failure and later deliberate ordering failure are separately logged and never conflated.

No other scope change, unresolved design question, irreversible operation or external publication.
