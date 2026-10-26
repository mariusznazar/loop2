# Slice 8 — complete group editor and native rule dragging

Status: done with concerns.

Worktree: `C:/Storage/repos/loop2-wt/grupy-regul-i-liczniki`.
Branch: `task/grupy-regul-i-liczniki`; slice base: `c32384438a678935399c1e1ee468416fa220606d`.
Model: inherited parent model, same class. No child agents.
Process gitlink and initialized submodule both: `2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c`.
Commit: `f9b76ff703f09079fbddf86d3e40582484a06a01` — `feat: :sparkles: edit rule groups and drag rules`.

## Result

The player can add empty groups with monotonic numbers, rename them through the shared text field, edit their conditions with the same condition control composition as rules, move whole groups and delete them with one destructive click. Each group adds its own default always/explore rule. Removing the last group leaves Add group available. Rule arrows retain their group boundary behavior.

Native mouse dragging moves a rule before the targeted rule, resolving that position after source removal, or appends it to a group, including an empty group. A local dragged identity and the native transfer payload must agree. Self/invalid targets return no change. Rule drop handlers stop propagation, preventing a second append by the enclosing group. Rebuilds preserve stable rule IDs for counts and explicitly recover focus; clock-only updates still touch only count spans.

Only the four assigned paths changed:

| File | Added | Removed |
|---|---:|---:|
| `README.md` | 2 | 2 |
| `src/browser/styles.css` | 23 | 1 |
| `src/browser/view/program-editor.ts` | 371 | 106 |
| `tests/view/program-editor.test.mjs` | 150 | 1 |

No shared-control kind, role, token value, asset or dependency was introduced. README changes cover only the Program panel and initial-program description.

## Checks

Every test invocation used full `npm test`; no focused test command ran. Logs are in this report's directory. Each npm invocation captured its real exit in a companion `.exit-code` file, using:

```powershell
npm test *> .runs/task-cycles/grupy-regul-i-liczniki/reports/<name>.log
$gateCode = $LASTEXITCODE
Set-Content -Encoding ascii .runs/task-cycles/grupy-regul-i-liczniki/reports/<name>.exit-code $gateCode
exit $gateCode
```

| Command / log | Exit | Result |
|---|---:|---|
| `npm test` / `slice-8-before.log` | 1 | 342 Node cases: 339 PASS, three intended assertion failures with compilable placeholder transforms. Append saw one group instead of two; group move saw `[1]` instead of `[2,1]`; downward drop saw `[1,2,3]` instead of `[2,1,3]`. Python and foundation were not reached. |
| `npm test` / `slice-8-conditions-before.log` | 1 | 343 Node cases: 339 PASS, the same three failures and the new group-condition assertion failure (`hereBelow` returned null). Python and foundation were not reached. |
| `python -B .the-way/elements/common/foundation_check.py` / `slice-8-foundation-before.log` | not retained — unchecked | Run separately after the first failing gate; the only retained result is the text `0 errors`. The tool wrapper forwarded only `.output`, without the checker exit code; the exact original shell-redirection wrapper is no longer retained in the available context. No exit code is inferred from that text. This run remains unchecked because exit-code evidence was lost, independently of the final captured run. |
| `npm run typecheck` | 0 | Browser and server compiler configurations checked after implementation. |
| `npm run build` | 0 | Built the actual application used for browser verification. |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/program-editor.ts src/browser/styles.css tests/view/program-editor.test.mjs` / `slice-8-prettier-check.log` | 0 | All changed code formatted. |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 --suppressions-location .runs/task-cycles/grupy-regul-i-liczniki/reports/slice-8-eslint-suppressions.json src/browser/view/program-editor.ts tests/view/program-editor.test.mjs` / `slice-8-eslint.log` | 0 | No findings, using an explicitly empty suppressions object. Run before the final full gate. |
| `npm test` / `slice-8-test.log` | 1 | Node 343 PASS, no skips; Python workflow 5 PASS, deploy 64 PASS, invariants 163 with one `setUpClass` error, quality 32 PASS. Python total 264 tests in four directories, no skips reported (including the Docker checks). `OneExpressProcessServesGameAndApi.setUpClass` fails when `tcp_listeners()` calls `Get-NetTCPConnection -State Listen`: no `MSFT_NetTCPConnection` objects match `Listen`. Foundation is not reached by the full command. |
| `python -B .the-way/elements/common/foundation_check.py` / `slice-8-foundation-final.log` | 0 | Separate final checker: `0 errors`, with real exit code retained in the tool result and `slice-8-foundation-final.exit-code`. Run during the final gate against the same unchanged sources. |

Formatting used `node node_modules/prettier/bin/prettier.cjs --write` over the changed TS/MJS, then TS/CSS/MJS; all returned 0. `git diff --check` returned 0. Initial pin checks returned the identical commit above; no branch upstream is configured. No product/test edits were made after the final full gate started.

The initial pin/upstream descriptions did not retain their exact command-and-exit evidence. The following read-only commands were repeated after the slice commit solely to complete this report, all from `C:/Storage/repos/loop2-wt/grupy-regul-i-liczniki`; these are new observations, not reconstructed initial results:

| Repeated command | Exit | Exact result |
|---|---:|---|
| `git ls-files --stage -- .the-way` | 0 | `160000 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c 0` followed by the path `.the-way`. |
| `git -C .the-way rev-parse HEAD` | 0 | `2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c` — matches the recorded gitlink. |
| `git rev-parse --abbrev-ref --symbolic-full-name '@{upstream}'` | 1 | `fatal: no upstream configured for branch 'task/grupy-regul-i-liczniki'`. |

This report-only correction changed no code and did not rerun `npm test`. The first foundation run remains explicitly unchecked with its exit code unavailable.

`git add README.md src/browser/styles.css src/browser/view/program-editor.ts tests/view/program-editor.test.mjs` and `git commit -m "feat: :sparkles: edit rule groups and drag rules"` both exited 0. `git show --format=fuller --numstat HEAD` exited 0 and confirmed the four-file statistics above and the private author email. `git status --short` exited 0 with empty output after the commit. The report and check evidence remain under ignored `.runs/`.

The final gate reproduces the same Windows listener-query failure documented in earlier slice evidence. This report does not establish its root cause and does not classify the entire gate as passing. Its traceback reaches `tests/invariants/test_loop2_one_serving_process.py:177` and the raised assertion at line 118. The affected class does not complete setup, so its behavior remains unchecked. The full command leaves the foundation checker unchecked; the separately captured final checker passes against the unchanged source tree. No unrelated test or environment repair was attempted.

No foundation invariant test was added or changed. No existing assertion was weakened, test skipped or lint rule relaxed. The count-only modeled-document test now locates the second rule's number input after the added group field and additionally protects an uncommitted group name; every input/select setter, focus and replacement remains forbidden during count-only refresh. Existing default-number expectations are reused for groups; no new numeric game rule was introduced.

## Own-work check and browser evidence

The weakest requirement was moving a rule downward or across groups while maintaining its count, and preventing its rule drop from bubbling into a second append. Pure tests explicitly check both directions, empty-group append, cross-group insertion before a rule, self/unknown/mismatched targets, unchanged input and preservation through real `setProgram`. Real native mouse input below checks the event behavior that those pure tests cannot prove.

The browser ran the actual built application from this worktree at `http://127.0.0.1:3000/`, viewport 1440 by 1000. It was started through `Start-Process -FilePath node -ArgumentList 'dist/server/main.js' -WorkingDirectory 'C:/Storage/repos/loop2-wt/grupy-regul-i-liczniki' -WindowStyle Hidden` with stdout/stderr redirected to `slice-8-server.log` and `slice-8-server-error.log`; exit 0, owned PID 21576. Every game state was created through the product UI. No fabricated state, replacement editor, injected events or accelerated clock was used. Browser calls report tool success/errors rather than shell exits.

Observed operations and results:

- New game: empty Program group under always. Added explore, wander and eat rules; all count spans were hidden with empty text. Add group created empty Grupa 2 and focused its name field.
- Native `page.mouse.move/down/move/up` dragged explore from the first group to empty Grupa 2: groups became `[wander,eat]` and `[explore]`; focus moved to the moved rule's condition in group 2.
- Native drag from group 2 onto eat in group 1 produced `[wander,explore,eat]`, leaving group 2 empty. The moved rule stood before eat rather than being appended again by the group's handler.
- Native downward drag of wander onto eat in the same group produced `[explore,wander,eat]`, proving the target was resolved after removal.
- Group temperature condition showed default 36.5, minimum 30, maximum 37, step 0.1. Set 30, created Ala and sent: minute 1 reported waiting and all three counts were zero. Selecting always let exploration start at minute 2 with `[1×,0×,0×]`.
- Typed the uncommitted group name `Rozgrzewka w toku` with the native keyboard. At minute 39 counts were `[2×,1×,0×]`, the same text input remained connected and focused with `:focus-visible`, and its partial text remained unchanged. The screenshot at minute 60 shows `[3×,2×,0×]` and the same visible input/focus. Clicking Pause committed the name and retained those counts at minute 61.
- Keyboard Enter on the first group's down button swapped the groups and recovered focus on that group's down button in position 2 with visible focus. Moving it back restored the order and preserved counts.
- The empty second group's item condition offered stick, berry, moss and fiber with default 8. Choosing berry and filling/committing 9 retained the existing counts. Dragging explore, now at 3×, into that group left `[wander 2×,eat 0×]` in the first and `[explore 3×]` in the second.
- Deleting the first group with keyboard Enter removed its two rules in one action, retained explore at 3×, and recovered visible focus on the following group's Remove. Stop returned to headquarters retaining 3×. Sending again gave minute zero and 1×; Restart again gave minute zero and 1×.
- Native keyboard partial `3e` in the group's number field survived an ordinary clock tick to minute 23: same connected/focused input, empty DOM value with `validity.badInput=true`. Tab restored its committed value 9. This checks native typing separately from the earlier valid fill/commit.
- Stop and deletion of the last group left zero groups and rules, with Add group visible and visibly focused. Enter added empty Grupa 3 and focused its name, demonstrating no number reuse after deletion/rename. Emptying its name showed the existing `Nazwa grupy` placeholder and committed an empty string accepted by the unchanged simulation contract. Deleting it again left the editable empty program.
- Hover on Add group produced the existing highlight background (`rgb(39,39,42)`, token `#27272a`). Name, select and number fields, destructive text and visible focus use existing controls and roles. No control is disabled by the new editor: boundary arrows remain enabled no-ops as required. Buttons/selects have no error value; empty names are allowed by the current contract, and incomplete numbers restore their previous valid value on commit. No new error or loading presentation is introduced; loading does not apply.

Screenshots saved here and actually inspected with `view_image`:

- `slice-8-browser-empty.png`: initial empty Program group.
- `slice-8-browser-populated.png`: running multi-group editor, live counts and visible focus on the uncommitted group-name text.
- `slice-8-browser-post-run.png`: headquarters after Stop, explore retained at 3× in its destination group.
- `slice-8-browser-no-groups.png`: no groups, with Add group available.

The inspected layout keeps group boundaries and row controls readable within the panel, with no overlap. Screenshots use the handoff's memory-only capture: `page.screenshot({fullPage:true}).toString('base64')`, extraction from the tool result without printing image data, local `.b64` write, normal `[IO.File]::WriteAllBytes` decode (all four exit 0). No browser-side filesystem write bypassed the screenshot path restriction.

One browser selector attempt used the placeholder `Imię` as an exact accessible label and timed out; the following pending send attempt was cancelled with its orchestration cell. Inspecting the actual field identified `Imię nowej postaci`; the real character creation/send then succeeded. This is an automation selector mistake, not a product defect. The final console query (all messages, error level) held only the existing favicon.ico 404 and no application exception. `browser_close` succeeded with no open tabs; `Stop-Process -Id 21576` returned 0, stopping only this slice's own server.

D-89 assessment: no critical player-journey defect escaped the smaller tests; no real-event/focus defect or visual defect was found, and the one-time native-drag journey did not establish a significant ongoing manual-check cost. D-75/D-87/D-88 therefore retain one-time journey, rendering and native-event/focus checks. No permanent browser automation, framework or pixel comparison was added. Death retention was previously checked in Slice 7 and remains covered by the full simulation suite; it was not repeated in this browser journey.

## Choices, expectations and scope

- Shared condition composition: `ConditionView`, one creation/update path and the existing pure condition edits with `index=null` meaning the group's condition. Alternative: duplicate four group-condition transformations and their event/render paths. Cost if wrong: a caller could select the wrong level; group/rule tests and real group gating cover the distinction. This is an implementation extension of the existing group-ID/rule-index convention, not a new product choice.
- Group names commit their exact text on change, matching the existing string contract; no extra trimming, length cap or nonempty requirement is invented. Alternative: new validation unsupported by the task. Cost: unnamed groups are permitted; the shared field's empty placeholder still gives a usable editing target.
- Group/rule structure rebuilds the existing editor and carries explicit focus targets: new group name, moved group's same arrow, next group's Remove or Add group after deletion, moved rule's condition after a drop. Alternative: leave focus on detached controls, or introduce a larger keyed-DOM reconciliation. Cost: structural edits rebuild controls, while ordinary count ticks and field edits keep the relevant live controls.
- Native drags use the existing row, a local rule ID and an agreeing custom data-transfer entry. Alternative: a dependency or a second keyboard/menu transfer mechanism. Cost: event routing needs browser evidence; native dragging has no added keyboard transfer behavior. Self/invalid drops are ignored and control-origin drags are prevented.
- New spacing/borders/cursor rules only arrange existing controls with existing token roles; `width` is an exempt layout dimension under D-43. Alternative: new shared-control kinds, token values or meanings. Cost: native ghost/cursor supplies drag feedback rather than a new visual drag system.
- Task To do 3–4 and D-90/D-93 supply ordering, identity and count expectations. Four pure cases cover new transforms; the existing modeled count-refresh case gains group-name partial input. No existing expectation was removed or weakened. No invariant test changed.

README out-of-scope findings, left unchanged as the dispatch requires: the sending bullet still describes the older single-character screen instead of headquarters/team creation; the status/terrain descriptions omit the body/backpack row, death presentation and campfire information already implemented by earlier tasks. Its sample focused Python test command also conflicts with D-77's full-command rule. These are flagged for the orchestrator, not silently broadened into this change.

## Reading and own inspection

Read the selected task/plan passages from the full handoff, the selected foundation entries, the named guidelines in full, all four changed files before editing, the simulation contract/program/game and app/status/shared-control/token files, and prior Slice 6/7 reports. No whole task, whole plan or cycle.md was opened. Broad contiguous selected-entry ranges also exposed neighboring D-05, D-33, D-37, D-49, D-86 and glossary/invariant entries; no unrelated change follows from them.

Additional reading: global and worktree agent instructions; Playwright skill and grounding/session setup/page reading/selectors/timing/false-positive/session-pattern references for the one-time browser check; Obsidian rulebook before the global code-review playbook for own diff inspection; package.json and src/server/main.ts to use the repository's build/start commands. The handoff already explicitly selected the latter serving files where useful.

Own inspection read the TS/CSS/test diff and, separately, the README diff. It checked source-removal ordering, target membership, source identity through moves, rejected targets, propagation, focus after removal of the last group, shared condition field selection, token-role meanings and test expectations. No further blocker was found. The observed out-of-scope README discrepancies above remain separate. No deployment, external write, push, PR, whole-change review or return step was performed.
