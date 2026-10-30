PASS 404a1a7d0783f27bc031ed18f27513f1f0f78275

## Result and boundary

Independent integration review of first parent `2ce1616a0502949bce585f909e3be4b226d61430` with target `56fa0863fb04132faaefc4584397abae2b0c493f`, at merge head `404a1a7d0783f27bc031ed18f27513f1f0f78275`. New blocking findings: 0. New Minor findings: 0. Out-of-scope findings: 0. Findings: none.

The original R4/R5 remain Minor as recorded in review.md; this integration neither repairs them nor changes their grades. I did not reopen unchanged target code as a separate feature review. HEAD matched the dispatch and remained unchanged. Process checkout and gitlink both identify `a8dfe8ac62885e88bc8f463e93ab16b621d48e92`. No tracked file, index or branch was changed by this reviewer. All new evidence is ignored under `.runs/`.

## Integration assessed

- `src/browser/sim/game.ts:134` takes equipment before choosing the first activity, and `:141` supplies traits, the skill snapshot and equipment in the final `newMapRun` argument order. `src/browser/sim/run.ts:334` receives and copies both optional inputs. The only production caller is this start path. Restart takes the preceding run's skill snapshot and copy, but binds its current trip lists again and takes fresh stock from the chest. That preserves the accepted distinction between a frozen character snapshot and a newly bound trip at restart.
- `src/browser/sim/game.ts:527` retains the run's practice and the entry-bound bring snapshot. Completion computes loot, writes the resulting chest into `current.team`, then pays practice while spreading that updated team. Neither write overwrites the other. The ended-run guard prevents paying again. Death and early end do not enter the completion payment branch. Discovery edits preserve the trip plan through `withFirstChillRule`'s spread.
- The new case at `tests/sim/trip.test.mjs:67` crosses those real functions: 15 eating practice funds Szybki posiłek; 3 berries leave a stock of 10; the first eating action lasts 4 minutes; completing adds one practice to 16 and deposits 2 berries, giving stock 9. A repeated advance changes nothing; restart spends 3 again, giving stock 6, while the run snapshot remains at 15 and the team record at 16. These are independent arithmetic expectations from accepted costs and transfer rules. Its injected streak 476 places completion at the fourth minute of a 480-minute requirement. This is a meaningful integration test, not a test of copying fields alone. Stryker independently killed mutations in the combined start/payment paths.
- Carrying capacity is consistently the character's trait: `character.ts:23` returns it, and entry/exit clipping plus headquarters/restart warnings read the same field. The accepted current catalog has no capacity-raising branch, so introducing a second skill-derived capacity would be unjustified. Existing trip cases cover clipping below capacity, zero map caps and chest room; they all passed.
- The program editor keeps the running character's bought-branch repertoire while the trip editor receives the selected copy/program context. `programInRepertoire` spreads the program, preserving its trip plan; repertoire item lists stay independent of branch action ownership. Both copy and saved-program modes offered the buyer's Obchód in my browser check, while headquarters did not. Copy, saved and frozen bring counts remained 2, 5 and 3 after separate edits. Invalid numeric input did not commit to the program or leak into the other editor context.
- `src/browser/view/game-view.ts:157` preserves the combined order: status, discovery, encounter, deposited items, body/backpack, practice, live trip preview, terrain. The update calls refresh both information lines. Completion retains practice and deposit while hiding live preview; death retains practice and hides trip lines; restart clears accrued practice and shows its rebound preview. I checked these states independently with real components and simulation transitions, including 390-pixel width.
- The shared Python fixture includes both `trees` and an empty `tripPlan`; local rule-pick fixtures preserve trees before deliberate filtering and add trip fields without changing their conditions, exclusions or assertions. Closed-list data still includes patrol. The incoming world-reference test distinguishes trip count metadata by its structural location and retains rejection controls. No test assertion was relaxed by this merge.

The author's weakest-point check correctly targets completion's two writes to the team and covers start/restart in the same real scenario. No trust boundary expands, and no irreversible operational action is introduced.

## Foundation comparison

I reviewed documentation separately from code. An independent exact-text comparison (`merge-review-foundation.py`) confirms all twelve target entries D-179–190 are unchanged. The eleven former unmerged entries D-179–189 become D-191–201, with all internal references translated by the same offset. The sole wording difference is the justified D-196 rationale qualification to edits of the copy's **rules or rule groups**, preserving the target's trip-plan-only exception. The script reported no unexplained difference. A search of source, tests, guidelines and foundation outside decisions found old-range references only in the incoming trip invariants, where they correctly retain target meanings.

Accepted-row mapping remains: 1 → D-193; 2 and 12 → D-194; 3 → D-195; 4 → D-195/D-196 plus D-119/D-120; 5 → D-197/D-198 plus D-63; 6 → D-64; 7 → action-duration-minimum; 8 → D-199; 9 → D-200; 10 → D-201. Rejected rows 11 and 13 remain unwritten. The projected growth and character-description entries are D-191/D-192, and the shared knowledge/branch-ownership portion remains D-119. The task still delegates server persistence to task 16 and first-solution-only payment to task 14; the integration makes neither a new claim of implementation nor a new waiver. The new trip rules and current repeat-practice payment coexist as the two accepted tasks require.

The glossary retains practice, trait and branches in Understanding alongside the incoming trip-plan meaning. The action-duration invariant is retained verbatim beside trip-transfer, trip-run-end and trip-plan-progress, whose derivations still refer to the published trip entries. Changed invariant-test files in this integration are `tests/sim/trip.test.mjs`, `tests/invariants/test_program_rule_pick.py`, `tests/invariants/test_program_closed_lists.py` and `tests/invariants/test_program_world_reference.py`, with shared support in program_fixture.py. The newly added integration case does not introduce another invariant; existing citations remain intact. No surface, part assignment, dependency allowance or violation marker requires a further change. Standalone foundation check returned 0 errors.

## Declined to judge

None. The review boundary is the integration and its consequences, not another review of the already merged target feature or the unchanged earlier feature implementation.

## Checks and exact outcomes

Commands ran from `C:/Storage/repos/loop2-wt/wprawa-i-drzewa`. Each selected test ran through the repository command, one file at a time.

| Command | Exit / result |
|---|---|
| `git rev-parse HEAD` | 0; dispatched head, confirmed again at end |
| `git ls-files --stage -- .the-way` | 0; pinned gitlink |
| `git -C .the-way rev-parse HEAD` | 0; matching checkout |
| `git log --oneline 2ce1616a0502949bce585f909e3be4b226d61430..404a1a7d0783f27bc031ed18f27513f1f0f78275` | 0; target history and merge identified |
| `git diff --stat 2ce1616a0502949bce585f909e3be4b226d61430..404a1a7d0783f27bc031ed18f27513f1f0f78275` | 0; 36 files, incoming target included |
| `git show --cc --format=fuller 404a1a7d0783f27bc031ed18f27513f1f0f78275` | 0; initial large output was truncated; conflict resolutions subsequently read in focused file projections and the foundation compared independently |
| `git show --cc --format= 404a1a7 -- src/browser/sim/game.ts src/browser/sim/run.ts src/browser/view/game-view.ts src/browser/view/headquarters.ts` | 0; complete code resolution inspected |
| `git diff 56fa086..404a1a7 -- tests/sim/trip.test.mjs` | 0; complete added integration test inspected |
| `git diff 2ce1616..404a1a7 -- src/browser/sim/programs.ts src/browser/sim/types.ts src/browser/sim/understanding.ts tests/invariants` | 0; combined contracts and fixture changes inspected |
| `git diff 2ce1616..404a1a7 -- src/browser/view/program-editor.ts src/browser/view/status-row.ts src/browser/view/program-panel.ts src/browser/styles.css` | 0; automatically combined editor/status changes inspected |
| `git diff 2ce1616..404a1a7 -- foundations/invariants.md` | 0; full invariant resolution inspected |
| `npm test -- tests/sim/trip.test.mjs` | 0 twice; 15 passed each time, no skips; second run retained a distinct log after the first log was overwritten by the same-basename view test |
| `npm test -- tests/sim/skills.test.mjs` | 0; 18 passed, no skips |
| `npm test -- tests/view/program-editor.test.mjs` | 0; 39 passed, no skips |
| `npm test -- tests/view/status-row.test.mjs` | 0; 29 passed, no skips |
| `npm test -- tests/view/trip.test.mjs` | 0; 4 passed, no skips |
| `npm test -- tests/invariants/test_program_rule_pick.py` | 0; 8 passed, no skips |
| `npm test -- tests/invariants/test_program_closed_lists.py` | 0; 3 passed, no skips |
| `npm test -- tests/invariants/test_program_world_reference.py` | 0; 3 passed, no skips |
| `python -B .runs/task-cycles/wprawa-i-drzewa/merge-review-foundation.py` | 0; target entries unchanged and renumbered task entries equal after the explicit allowed rationale edit |
| `python -B .the-way/elements/common/foundation_check.py` | 0; 0 errors |
| `git diff --check 2ce1616..404a1a7` | 0 |
| `git status --short` | 0; empty |

Focused logs are `reports/merge-review-<test filename>.log`; the simulation trip rerun is `merge-review-sim-trip.test.mjs.log`, and `merge-review-trip.test.mjs.log` holds the view trip result.

No product assertion failed in these focused checks. Earlier failed gates remain failed: gate.log and gate-2.log are not replaced by this review. The full gate, full invariant/quality/deployment suites and the five Docker checks were not run here; the orchestrator owns the full gate on this exact tree. The standalone foundation result is not a claim that the skipped foundation stage of either earlier gate ran.

### Mutation evidence

First attempt:

```text
node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate 'src/browser/sim/game.ts:132-166,src/browser/sim/game.ts:525-566,src/browser/sim/run.ts:332-365' --jsonReporter.fileName '.runs/task-cycles/wprawa-i-drzewa/reports/merge-review-mutation.json'
```

Exit 1: unsupported CLI option `--jsonReporter.fileName`; no mutation tests ran. Log retained as merge-review-mutation.log. Corrected invocation, with the existing configuration and a subsequent copy of its report:

```text
node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate 'src/browser/sim/game.ts:132-166,src/browser/sim/game.ts:525-566,src/browser/sim/run.ts:332-365'
```

Exit 0. Independent dry run covered the 29 configured simulation test files. 58 mutants: 57 killed, 1 survived, 0 uncovered, 0 timeout, 0 error. Logs/report: merge-review-mutation-2.log and merge-review-mutation.json. Stryker used its separate generated sandbox and no type checker; reviewed files were unchanged.

The sole survivor is ID 57 at `src/browser/sim/run.ts:363`, replacing `streamState(seed, "attack")` with `streamState(seed, "")`. Classification: **noncompilable code**, not a missed behavioral assertion. `random.ts` defines Stream as the four named literals; the empty string is not one. The independent virtual-source check `node .runs/task-cycles/wprawa-i-drzewa/merge-review-mutant-type.mjs` exited 0 and recorded TS2345, `Argument of type '\"\"' is not assignable to parameter of type 'Stream'.`, in merge-review-mutant-type.json. It used the locally installed TypeScript API and did not modify a file. No exact random sequence assertion is needed for this invalid input. All mutants in the combined game start and completion ranges were killed.

### Independent browser evidence

`python -B .runs/task-cycles/wprawa-i-drzewa/preview-server.py` served only loopback port 8765; stopped deliberately with Ctrl-C after review (exit 1 from cancellation). `node .runs/task-cycles/wprawa-i-drzewa/merge-review-ui.mjs` used a separate headless Chrome process and fresh context; no shared MCP profile was used or closed.

First UI run exited 1 on my harness assumption that the invalid draft `0` would be restored after switching away and back. Source inspection showed the incoming trip editor deliberately recreates rows on a context change, displaying the committed `3`; draft retention across changing the edited program is not an accepted requirement. The check already proved the invalid draft stayed visible within its original context and did not commit. I corrected that extra assumption, not the product, and the second run exited 0. Both attempts are disclosed; this is not a flaky rerun.

The passing run verified purchase, absence of Obchód in headquarters, presence in both owner editors, invalid count warning and unchanged committed count, independent copy/saved/frozen trip lists, completion's deposit and practice, death's retained practice, and restart clearing practice while rebinding its preview. It recorded no page exceptions or failing HTTP responses. All five screenshots were opened and visually inspected:

- merge-review-hq.png — skill controls coexist with chest capacity and the two trip lists.
- merge-review-running.png — bought Obchód and edited copy list coexist with the original frozen preview; visible focus remains on the control.
- merge-review-completed.png — deposited berry above body/backpack; practice below; preview absent.
- merge-review-narrow.png — 390-pixel width, stacked panels, readable wrapping, no clipped completion information.
- merge-review-death.png — positive practice retained, trip preview/deposit hidden, restart/end controls available.

The fixture source was read before reuse. It composes real view components and applies real simulation transitions to prepared state. This is component/simulation browser evidence, not a natural complete playthrough, account/server verification or real-time clock test. The production game-view ordering was checked in source; the fixture has no encounter paragraph, so a combined encounter/discovery screenshot was not newly taken. No new common control or role is introduced by the manual merge resolution. No concrete condition requiring new permanent browser automation or pixel comparisons emerged.

## Reading and reaches

Read the project review skill and pinned method, repository/browser AGENTS, global review playbook, scripts/search rules, complete frozen task in bounded portions, merge handoff and merge author report. Read original author report and prior whole-change, fix, gate-correction, return and return-review evidence for the existing boundaries; those earlier outcomes remain attributed rather than repeated claims. No cycle.md was read.

Read coding, testing, content-data, simulation-module, browser-module and styleguide files whole, the process reading procedures, both glossaries, and affected part-map entries. Selected foundation entries were read whole, including D-04,18,23,53,55,63,64,71,119,120,122,126,131,132,136,164,173, the relevant target trip entries and all renumbered skill entries; the relevant run, program, trip and duration invariants were compared with their tests. The archived other task's To do and Q5–Q12 supplied accepted transfer, restart, progress and UI expectations. The target review report was consulted only as history after its actual path was located.

Additional selective reaches: character.ts and all production newMapRun call sites for effective capacity and argument order; program/repertoire and trip-editor paths for interactions; random.ts and the local compiler API for the surviving mutant; existing ignored preview/server for isolated UI execution. These reaches introduced no new product choice or trust boundary.

## Searches not found or unclear

- Several combined reads exceeded the output limit. The affected task questions, guidelines, foundation entries and merge-resolution code were reread in smaller portions. Historical reports were used for their named prior boundaries; no absence conclusion depends on an omitted tail.
- `git show 1b09f80:docs/task-cycles/plan-wyprawy/reports/review.md` failed because that filename does not exist. `git ls-tree -r --name-only 1b09f80 -- docs/task-cycles/plan-wyprawy` located reports/review-report.md, which was then read. This was a path correction, not evidence that target review was absent.
- The first Stryker CLI attempt used an unsupported reporter option; the existing config's output path was read and the successful report copied afterward. No test result is claimed for that failed attempt.
- The first UI harness assumed retention of an invalid draft after changing editor context. Direct reading of trip-editor.ts resolved that unsupported expectation; the committed value and context isolation were checked explicitly on the corrected run.
- The batch's basename-only log naming overwrote the successful simulation trip log with the view trip log. Exit 0 was captured in the batch output; the simulation file was rerun once to retain its own complete log. No failed test was overwritten or relabelled.

No unresolved question remains. Return at this review boundary; no full gate, push or request was performed by this reviewer.
