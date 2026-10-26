# Slice 7 — rule starts across the run lifecycle

Status: done with concerns.

The slice is implemented and committed. The final full gate retains only the known Windows listener setup error described below; no new failure remains. The affected browser journeys passed their one-time checks. Slice 8 and independent review remain for the orchestrator.

Worktree: `C:/Storage/repos/loop2-wt/grupy-regul-i-liczniki`.
Branch: `task/grupy-regul-i-liczniki`; slice base: `eac97b80290be870c992e45e55707bb6454040b6`.
Model: inherited parent model, same class. No child agents.
Process gitlink and initialized submodule: `2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c`.
Commit: `c32384438a678935399c1e1ee468416fa220606d` — `feat: :sparkles: count rule starts across map runs`. Working tree clean after commit. Only the six assigned paths were staged explicitly.

## Result

`GameState.ruleCounts` is null before the first send and otherwise stores counts by stable rule identity, outside the program and map run. Every send/restart creates zero counts before consuming minute-zero `activityStarted` events. Later spans count only rule starts from their events; waits, finishes, elapsed minutes and death do not add counts. End and death retain counts.

`setProgram` validates/canonicalizes the incoming content, matches previous rules by identity and retains the count only when their validated condition/action content is unchanged. Added rules start at zero, removed rules leave the record, and an edited rule alone resets. Group names, group conditions, group order, rule order and group transfers do not enter the comparison. A removed/edited active rule's old action still completes under D-20 without adding a count for that completion.

Each editor rule shows `N×` after the first run. `updateCounts` touches only the count span's text/visibility; the application invokes it for ordinary clock ticks and other transitions without a program/map change. Content refresh also refreshes counts after rebuilding/reordering rows. No new style token or shared control is introduced.

Only the assigned six files changed:

| File | Added | Removed |
|---|---:|---:|
| `src/browser/sim/game.ts` | 66 | 3 |
| `src/browser/sim/types.ts` | 2 | 0 |
| `src/browser/view/app.ts` | 4 | 2 |
| `src/browser/view/program-editor.ts` | 19 | 0 |
| `tests/sim/program-counts.test.mjs` | 301 | 0 |
| `tests/view/program-editor.test.mjs` | 121 | 0 |

## Checks

Every test run used full `npm test`. The complete logs and actual exit-code companion files are in this report directory. Capture uses:

```powershell
npm test *> .runs/task-cycles/grupy-regul-i-liczniki/reports/<name>.log
$gateCode = $LASTEXITCODE
Set-Content -Encoding ascii .runs/task-cycles/grupy-regul-i-liczniki/reports/<name>.exit-code $gateCode
exit $gateCode
```

| Command / evidence | Exit | Result |
|---|---:|---|
| `npm test` / `slice-7-before.log` | 1 | Before implementation: 338 Node tests, 328 PASS and 10 FAIL. Nine failures reached assertions for missing counts or missing content reset. The split/batch case instead hit a missing-count TypeError, which is not represented as deliberate assertion-failure evidence. The canonical-equivalence case already passed because the old implementation retained the supplied history unchanged. Python and foundation stages were not reached. |
| `python -B .the-way/elements/common/foundation_check.py` / `slice-7-foundation-before.log` | 0 | Separate check after the failed initial gate; 0 errors. |
| `npm test` / `slice-7-first-final.log` | 1 | 339 Node PASS; 264 Python tests across four directories. Existing Windows listener `setUpClass` error and one new quality failure: `tests/view/program-editor.test.mjs:166:20`, `Setter cannot return a value`, `no-setter-return`. No skips; all three Docker checks exercised. Foundation stage not reached. |
| `python -B .the-way/elements/common/foundation_check.py` / `slice-7-foundation-first-final.log` | 0 | Separate check after the first final gate; 0 errors. |
| `npm test` / `slice-7-test.log` | 1 | Final rerun: 339 Node PASS; 264 Python tests (workflow 5 PASS, deploy 64 PASS, invariants 163 run with the one known Windows setup error, quality 32 PASS). No skips; the three Docker checks ran. Foundation stage not reached. |
| `python -B .the-way/elements/common/foundation_check.py` / `slice-7-foundation-final.log` | 0 | Separate final check; 0 errors. This does not turn the failed npm gate into a pass. |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 --suppressions-location .runs/task-cycles/grupy-regul-i-liczniki/reports/slice-7-eslint-suppressions.json src/browser/sim/types.ts src/browser/sim/game.ts src/browser/view/program-editor.ts src/browser/view/app.ts tests/view/program-editor.test.mjs tests/sim/program-counts.test.mjs` / `slice-7-eslint.log` | 0 | Static check with an explicitly empty suppression object; no findings. |
| `node node_modules/prettier/bin/prettier.cjs --check src/browser/sim/types.ts src/browser/sim/game.ts src/browser/view/program-editor.ts src/browser/view/app.ts tests/view/program-editor.test.mjs tests/sim/program-counts.test.mjs` / `slice-7-prettier-check.log` | 0 | All six files formatted. |
| `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD` | 0 each | Matching pinned commit above. |
| `git diff --check` | 0 | No whitespace errors. |
| `git add src/browser/sim/game.ts src/browser/sim/types.ts src/browser/view/app.ts src/browser/view/program-editor.ts tests/view/program-editor.test.mjs tests/sim/program-counts.test.mjs`; `git commit -m "feat: :sparkles: count rule starts across map runs"`; `git show --format=fuller --numstat HEAD`; `git status --short` | 0 each | Commit above; 513 added and 5 removed lines across exactly six files; author address is the private-repository address; clean working tree. |

The final remaining failure is `ERROR: setUpClass (test_loop2_one_serving_process.OneExpressProcessServesGameAndApi)`, at `tests/invariants/test_loop2_one_serving_process.py:177`, calling `tcp_listeners()` at line 118. The captured command reports `Get-NetTCPConnection failed: ... No MSFT_NetTCPConnection objects found with property 'State' equal to 'Listen'` and `CmdletizationQuery_NotFound_State,Get-NetTCPConnection`. This matches the dispatch's existing baseline error and the Slice 6 log; the serving-process invariant is not claimed checked successfully. No host workaround or test alteration was made. The final deploy stage finished in 204.414 s, invariants in 455.711 s and quality in 21.917 s.

Formatting commands (each exit 0): `node node_modules/prettier/bin/prettier.cjs --write tests/sim/program-counts.test.mjs`; then the same command over `src/browser/sim/types.ts src/browser/sim/game.ts src/browser/view/program-editor.ts src/browser/view/app.ts tests/view/program-editor.test.mjs`; then over `tests/view/program-editor.test.mjs tests/sim/program-counts.test.mjs` after test preparation improvements; finally over `tests/view/program-editor.test.mjs` after the lint correction. The first final gate's concise setter arrow returned the expression calling `assert.fail`; the corrected block invokes exactly the same assertion without returning its value. This fixes the reported `no-setter-return` failure without weakening the test. The rerun had already started when the orchestrator requested static checks before the rerun; the orchestrator accepted running those read-only checks during the gate. No product/test edit was made after the final rerun began.

No focused test was run. No existing assertion was weakened or removed; no test was skipped, lint rule relaxed, dependency installed, or unrelated host/test workaround applied. No foundation invariant test was changed or added. The new counter test file is confirmed executed by its named cases in the Node gate output.

## Own-work check and browser evidence

The weakest requirement was that a count changing on a normal clock tick must leave a partially typed number and the focused control untouched. The permanent modeled-DOM test protects the update path by making every input/select value setter, child replacement and focus operation fail, while checking count visibility and text through real simulation transitions. It proves only modeled logic; browser evidence below checks actual focus and native number-field behavior.

The one-time browser check used the actual built application from this worktree at `http://127.0.0.1:3000`, viewport 1440 × 1000, through Playwright MCP. The server was started with `Start-Process -FilePath node -ArgumentList 'dist/server/main.js' -WorkingDirectory 'C:/Storage/repos/loop2-wt/grupy-regul-i-liczniki' -WindowStyle Hidden` and log redirection to `slice-7-server.log` / `slice-7-server-error.log`; command exit 0, own PID 40060. The application state was created through its UI and simulation, with no fabricated GameState, no replaced editor and no alternate rendering implementation.

Observed states and operations:

- Before sending: added two rules. First `always → explore`; second `itemBelow stick 8 → wander`. Both count spans had empty text and `hidden=true`; the screenshot confirms no visible counts.
- Created Ala and sent to Las. At minute 1, counts were `[1×, 0×]` and status was `Eksploruje`.
- Used the native keyboard to enter partial `3e` in the second rule's number field, without blur. Browser `value` was empty with `validity.badInput=true`, while the actual visible field showed `3e`. Saved the element reference only for identity observation. At minute 20, an ordinary unmodified application clock tick changed counts to `[1×, 1×]` and status to `Wędruje`. The same element was connected and focused, still had badInput, and matched `:focus-visible`. The screenshot shows the partial entry and focus outline.
- Paused at minute 22: counts stayed `[1×, 1×]`; leaving the invalid field restored its committed number 8. Filling 2 and pressing Tab reset only the second count, giving `[1×, 0×]`. This separately checks a valid fill/commit as well as native partial typing.
- Moved the second rule up: actions became `[wander, explore]`, counts moved with them to `[0×, 1×]`, and the focused up button belonged to row 0.
- `Zakończ` showed headquarters with `[0×, 1×]` retained. Sending again showed minute zero and `[1×, 0×]`. After a later normal start produced `[2×, 0×]`, `Restart` returned to minute zero and `[1×, 0×]`.
- For the death check, installed Playwright's browser clock and reloaded before creating a fresh game through the UI. This is explicitly accelerated browser time, separate from the normal-tick focus check above. An explore rule showed 1× after sending. `page.clock.fastForward(300000)` passed time through the real application's clock and simulation, reaching the observed status `Minuta 243 · Mag zamarzł`, still 1×, with Pause absent and Restart visible. This minute is observed evidence, not a newly imposed balance expectation. After another 60000 ms, status and count were unchanged. Restart returned to minute zero, count 1× and a visible Pause button.

Screenshots saved here and actually opened with `view_image`:

- `slice-7-browser-before.png`: two rules before the first send, with no counts.
- `slice-7-browser-partial.png`: minute 20, both counts 1×, partial `3e` and visible focus.
- `slice-7-browser-death.png`: frozen death screen, count 1× retained and no Pause.

Counts inherit the existing readable text role on the panel; wrapping stays inside rule rows with no overlap in the inspected screenshots. Existing controls retain their normal/hover/focus appearance and behavior. There is no new shared control, error presentation, disabled/loading state, role, token or SVG change requiring a new kitchen-sink sample.

Screenshot capture followed the prior approved memory-only method because the MCP screenshot path policy excludes this worktree: `page.screenshot({fullPage:true}).toString('base64')` without a path; `functions.exec` extracted the result without printing it, `apply_patch` stored a `.b64` in this report directory, and `[IO.File]::WriteAllBytes(...,[Convert]::FromBase64String(...))` decoded it locally. Each decode exited 0. No deliberate screenshot output was written to the original checkout.

Browser commands have tool success/error results rather than shell exit codes. The initial resize/navigate/wait attempts failed with a profile lock. A read-only process check showed the Chrome profile had a live MCP parent. The orchestrator asked Slice 6 to close its session through `browser_close`; after that these checks succeeded. No other process was terminated. The final console query (`all=true`, level error) found only the pre-existing `/favicon.ico` 404 and no application exception. `browser_close` completed with no open tabs, and `Stop-Process -Id 40060` stopped only this slice's server, exit 0.

D-89 assessment: full journeys, whole-screen pixel comparisons and real events/focus remain one-time browser checks. No critical-journey defect escaping smaller tests, missed real-focus defect, concrete visual defect or significant repeated manual-check cost was found that calls for permanent browser automation. No permanent browser framework or test was installed. Name editing/group controls/dragging remain Slice 8 and are not claimed checked here.

## Expectations, choices and limits

- D-92 and D-93 supply the independent count expectations: minute-zero starts, multi-minute actions counted once, waits/finishes excluded, later starts, duplicate-content identities, per-content reset, unchanged canonical content, added/deleted rules, moves and group edits, end/death retention and new-run reset. New fixtures explicitly hold groups and unrelated identities; they do not use the test-only single-group builder. The body near death is deliberate simulation input; the reconciliation table supplies an explicit prior history `{17:4,91:2}` to isolate content reset from earning those counts.
- The split/batch test retains its same substantive requirement; optional lookup replaced its early missing-field TypeError so a future missing-count defect becomes a failed precondition assertion. Its first run is not claimed as an assertion failure. The view test uses an explicit empty-backpack condition for the second rule, avoiding an expected wander that depends on drawn tile stock. These are preparation improvements, not weakened expectations or changes to old tests.
- Counts use a nullable numeric-key record in GameState. Rejected: counters inside MapRun or Program. Cost if wrong: Stop would lose history or ticks would become program edits. Separate state matches the agreed lifecycle and supports JSON state.
- Incoming programs are canonicalized by the existing closed-list validators before comparing `JSON.stringify([condition, action])` against previously validated content. This ignores raw key insertion order, extra raw fields and binary rounding normalized by validation. Rejected: raw input serialization or a second hand-maintained content-field comparison. Cost if wrong: new validator shapes must stay canonical; the explicit equivalent-content test covers the current representation.
- Both run start and minute advancement consume existing start events through one private helper. The helper copies the record lazily before incrementing and counts no untracked/deleted identity. Rejected: minute/completion counting or putting another firing calculation into the action picker. Cost if wrong: a new event-producing path must feed this helper. Current send/restart/advance/passRealTime paths are covered.
- `updateCounts` accepts only the count record and updates existing spans using the row identities already held by the editor. Rejected: calling full editor update on every tick, which could rewrite incomplete numbers or later group-name fields. Cost if wrong: future group/drag rebuilding must keep row identity metadata aligned; the current full update refreshes counts after structural work, and the actual reorder check confirms current alignment.
- No combat engine is added. Settlement row 3 / D-92 already records the future requirement for task 8: each combat turn in which a rule starts a combat action adds one firing even for a zero-minute action. The current event-based implementation does not turn a zero duration into no count; integrating combat's start events remains task 8's work.

## Own inspection and reading beyond the selection

Own inspection covered the full six-file change (the new untracked test was also read directly), mutations of start/finish event filtering, input copying, single-rule reset, unknown/deleted IDs and row identity mapping. No additional blocker was found. The report is the own-work record; independent review and Slice 8 were not started.

Read all assigned guidelines in full, assigned source/tests in full before changing them, selected foundation entries and the copied task/plan passages in the handoff. Did not open whole task, whole plan or cycle.md. Additional reading:

- `src/browser/view/controls/select-list.ts` and the modeled-document passage in `tests/view/status-row.test.mjs`: determine the minimal existing DOM operations needed for the new logic test; no browser focus claim is based on this model.
- `package.json`, `.the-way/gate/run_tests.py` and `tests/deploy/test_loop2_image_icons.py`: gate selection/order, command capture and the distinction between a long Docker build and a stopped gate. A single read-only descendant-process investigation during deployment showed an active local test clone; no repeating process monitor or test restart was introduced.
- `tests/quality/test_quality_invariants.py` through the ESLint/format command definitions: use the same explicit empty suppressions policy for the static lint check requested after the first final gate's quality failure. Also read timing/results from `reports/slice-6-test.log` to assess the long invariant stage without probing processes again.
- `src/server/main.ts` and README startup instructions: serve only the built local worktree application for the browser check.
- Global Obsidian rulebook before the global code-review playbook; the playbook for own diff inspection.
- Playwright MCP skill plus its grounding, session setup, page reading, selectors/clicking, timing, false positives, session patterns and API/state references for browser checks.

Adaptations: none to the slice's product scope. Browser profile ownership was resolved by normal session closure through the orchestrator. The same memory screenshot capture as Slice 6 was reused. No external publication, push, PR, deployment, server/asset/lockfile change or return step was performed.
