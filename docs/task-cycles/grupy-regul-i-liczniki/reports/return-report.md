# Return step — groups and firing counts

Status: done with concerns.

The return step is complete. No missing settlement, assigned projection, new binding choice or mismatch introduced by this change requires another foundation write. The concern is the retained failed full gate and its unchecked serving-process behavior, not a new finding in the return step.

Worktree: `C:/Storage/repos/loop2-wt/grupy-regul-i-liczniki`.
Branch: `task/grupy-regul-i-liczniki`.
Compared range: `9a5f3605f73da87fc5c87089c8166d2658c0add6..f9b76ff703f09079fbddf86d3e40582484a06a01`.
Starting and ending HEAD: `f9b76ff703f09079fbddf86d3e40582484a06a01`.
Pinned process: `2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c`, identical in the index and initialized submodule.
Method: project `the-way-make-change`, its pinned method, and implement-task step 11 with the foundation-step paragraphs.
Model: inherited parent, same class. No subagents. Did not open cycle.md.

## Changes

Tracked files changed: none; added 0, removed 0. Commits: none. No empty commit.
The only file written by this stage is this ignored report. No product code, test, guideline, foundation entry, backlog or external file was changed. No review, target reconciliation, publication, deployment or merge was started.

## Settlement and projection comparison

The comparison read the complete frozen task and current plan, the foundation-stage report, reports of Slices 6–8 and the whole-change review. It then checked the final foundation diff and final implementation directly; the authors' explanation was not substituted for the code.

| Task requirement | Recorded entry | Comparison with final code |
|---|---|---|
| Settlement 1: ordered groups, exactly one enclosing group per rule | D-90, decisions.md:1582 | Program/RuleGroup in types.ts:38–54 carry ordered arrays, no top-level rule array. game.ts:199 validates one-level groups and globally unique rule IDs. dropRule in program-editor.ts:89 removes from the source before insertion at the destination. |
| Settlement 2: one empty Program/always group in a new game | D-91, decisions.md:1601 | newGame in game.ts:317 constructs precisely that group, with an empty rules array and null counts. The editor renders its shared condition controls and Add rule. |
| Settlement 3: firing means an action starts, including its accepted future combat meaning | D-92, decisions.md:1619 | countStarts in game.ts:266 increments only activityStarted events whose activity is a rule. run.ts:58 emits the start once, newMapRun at :264 exposes the initial event, and stepMinute at :309 emits another only after an activity ends. Waits, elapsed minutes, finishes and death add no firing. The binding combat sentence remains whole; this task does not implement combat and does not claim combat execution evidence. |
| Settlement 4: no numbers before the first run; during/after run numbers retained until send/restart | D-93, decisions.md:1641 | newGame stores null; startRun at game.ts:284 creates zeros before consuming the minute-zero start. send/restart use startRun. end at :433 retains ruleCounts. Death stops advancement without discarding them. updateCounts at program-editor.ts:958 hides only null counts and otherwise renders N×. app.ts keeps the Program panel on headquarters and death screens. |
| Settlement 5: transfer and a group's name/condition changes preserve its rules' counts | D-93 | reconcileCounts at game.ts:241 compares each rule's own canonical condition/action by stable identity. Group membership, group order/name/condition and rule position do not enter that comparison. Group edits and moves in the editor retain the rule records and IDs. |
| Assigned projection: how a character acts by its program, whole | D-23, decisions.md:490 | chooseActivity at program.ts:226 iterates groups then rules, requires both conditions and feasibility, and falls through false, empty or infeasible groups. Both conditions use the same validator/evaluator and closed data lists. No direct-action UI was added. itemFor at program.ts:79 and finishUse in run.ts select the consumed piece in the simulation. |
| Assigned projection: what a rule shows, interpreted by the accepted lifecycle | D-93 | N× presentation, start-of-run reset, reset on the rule's condition/action change and preservation on rearrangement are all present. Post-run content edits use the same reconciliation as edits during a run. Deletion drops that identity and a new rule begins at zero. |
| Assigned projection: rule group | glossary.md:59 | A named group with its own condition contains program rules. RuleGroup, shared condition controls and ordered selection use the same meaning. |
| Consequent program glossary update | glossary.md:25 | The changed portion says ordered groups containing ordered rules, matching the new contract. The pre-existing trip-plan clause is preserved; this task neither implements a trip plan nor authorizes removing its established meaning. No second meaning of program or program rule was introduced. |
| Revised invariant | program-rule-pick, invariants.md:234 | Its grouped ordering/fallthrough sentence matches chooseActivity. The existing test file retains long single-always-group scenarios and adds explicit false/empty/infeasible groups, a false inner rule and ordered qualifying rules, with unrelated stable identities. It has checks for wrong choices, wrong action under a matching identity, interruption and a missed free minute. Slice 6 provides the failing and final execution evidence; this step changes no invariant test. |
| Added helper ownership | simulation, part_map.md:27 | tests/invariants/program_fixture.py exists and only constructs/accesses test inputs. Simulation owns it explicitly. tests/sim/program-fixture.mjs and program-counts.test.mjs fall under existing tests/sim/**; all view changes fall under browser-view. |

All five rows are represented whole; rows 4 and 5 correctly share D-93 with the assigned counter projection. No second entry is needed for them. Existing Polish meaning sentences in foundation-report.md remain the request's sentences. This stage writes or changes no entry, so it adds no meaning sentence of its own.

## Other entries compared and search

Read the selected decisions whole: D-03, D-04, D-06, D-18–D-32, D-34–D-36, D-38–D-48, D-50–D-85 and D-87–D-93. D-86 was also exposed and read with its neighbors; it changes no scope here. Read all invariant entries named by return-handoff.md whole, the whole short part map and product glossary, and the pinned process glossary. Read the five selected guideline files whole and their relevant code/test examples.

Searched all five actual foundation stores, including environment_facts.md, using program, rule group, firing, counter, drag, the affected decision identifiers and program_fixture. A first overly broad search matched ordinary uses of “rule” and “account” and its output was truncated; it was not used to infer absence. The narrower whole-entry search produced D-03, D-04, D-19, D-20, D-22, D-23, D-25, D-26, D-39, D-44, D-53, D-55, D-57, D-59, D-60, D-62, D-63, D-65, D-68, D-69, D-71, D-72 and D-90–D-93, the three program glossary entries, map-run-repeatability, action-in-progress, program-rule-pick, exploring-reveal, walk-target, program-closed-lists, walk-feasibility, program-world-reference and the simulation map entry. These were read whole; none supplied another unresolved consequence.

- D-20/action-in-progress remain true: chooseActivity copies the action, setProgram leaves run untouched, and stepMinute finishes the stored action even after its rule moves, changes or disappears. Counting a start does not change the point at which effects land.
- D-26/program-world-reference remain about things of the world. Group and rule IDs refer to program structure, not tiles, campfires or item pieces. The validator keeps condition/action content limited to the existing kind-based contract. No change to that invariant's meaning is needed.
- program-closed-lists already says any condition held by a program; the common group/rule checkCondition path fits it. The added group acceptance/refusal scenarios extend its evidence without needing another invariant.
- D-21, D-22, D-25, D-57–D-72 and the selected time/world/team invariants retain their behavior: only activity selection is enlarged; neither elapsed-time rules, seed handling, action completion, death order, item selection nor map generation is changed by counting or grouping. The migrated fixture helpers wrap inputs and do not select expected outcomes. The existing full review assessed their entire migration range.
- D-03/D-04 and simulation-isolation/simulation-inputs still fit: computation remains in simulation with explicit state, and app.ts applies the result of setProgram; the editor does not mutate GameState. The part dependency direction stays browser-view → simulation.
- D-39–D-48 and browser appearance invariants need no update: the new editor uses the existing shared controls and existing token meanings/values. The CSS adds group separation and layout, no new token, role or shared-control type. Destructive group deletion uses the destructive shared button. The width is an existing D-43 layout exemption.
- D-73–D-89 remain applicable. The reports document real native-drag/focus checks, distinct from modeled DOM evidence, and the full reviewer judged their screenshots. This return step changes no interface and does not claim fresh browser or screenshot evidence. No newly observed trigger requires rewriting the deliberate browser-test exclusions.
- browser-view, simulation, build-tools and product-foundation retain their mapped responsibilities and files. No new trust boundary, external partner, permitted dependency or promised external surface was introduced. No Violated mark is set or cleared.

No new source outside the product is a premise this change needs recorded as an environment fact. It uses the existing TypeScript/DOM architecture and existing shared controls/data; it adds no package, asset, license, external service or new contrast threshold. The relevant existing WCAG/CSS entries were read in their store. No new domain word is used in a meaning missing from the glossary. Native dragging, stable IDs, canonical comparison and nullable storage are implementation mechanisms; they do not redefine program, rule, group, firing or map run.

## Checks and evidence

All shell checks ran from the explicit task worktree above.

| Command | Exit | Result |
|---|---:|---|
| `git rev-parse HEAD` | 0 | Reviewed HEAD f9b76ff703f09079fbddf86d3e40582484a06a01, unchanged. |
| `git ls-files --stage -- .the-way` | 0 | Gitlink 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c. |
| `git -C .the-way rev-parse HEAD` | 0 | Same process commit. |
| `git status --short` | 0 | Empty, before report creation. |
| `git diff --stat 9a5f3605f73da87fc5c87089c8166d2658c0add6..HEAD` | 0 | Complete 51-file range identified. |
| `git diff 9a5f3605f73da87fc5c87089c8166d2658c0add6..HEAD -- foundations` | 0 | Only the expected D-23/D-90–D-93, glossary, invariant and map changes. |
| `git diff 9a5f3605f73da87fc5c87089c8166d2658c0add6..HEAD -- src/browser/styles.css` | 0 | Existing token roles and layout changes only. |
| `git diff --check 9a5f3605f73da87fc5c87089c8166d2658c0add6..HEAD` | 0 | No whitespace errors. |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | Fresh return-step structural check, 0 errors. |
| `rg --files foundations` | 0 | The five actual entry stores; no invented extra store relied on. |
| `rg -n -i -e '\bprogram\b' -e '\brule groups?\b' -e '\bfiring\b' -e '\bcounters?\b' -e '\bdrag(ging)?\b' foundations/environment_facts.md` | 1 | No matching entry; checked against the real file and positive header inventory, not treated as proof without inspection. |
| `rg -n '^## ' foundations/environment_facts.md` | 0 | Positive inventory of existing facts, including WCAG/CSS and tooling facts. |

The exact historical commands for the narrower cross-store whole-entry scan and symbol-location searches were not retained in the report. These two read-only checks were repeated for this documentation correction; the commands and observed exits below replace the undocumented historical exit claims. They ran in PowerShell from the worktree named above. No npm test or tracked-file change was made.

Repeated narrower cross-store whole-entry scan, observed process exit **0**. It matches the full contents of each entry, then prints its heading; it returned exactly the entry list above, including D-03 through D-93 as listed and no environment-fact match. Decisions use level-three headings and the other stores use level-two headings. An initial correction attempt handled only level-two headings and was discarded as incomplete despite its exit 0; the command below handles both.

```powershell
$ErrorActionPreference = 'Stop'
$entryPattern = '(?i)\bprogram\b|\brule groups?\b|\bfiring\b|\bcounters?\b|\bdrag(ging)?\b|\bD-(23|90|91|92|93)\b|program_fixture'
$stores = @('foundations/decisions.md', 'foundations/environment_facts.md', 'foundations/glossary.md', 'foundations/invariants.md', 'foundations/part_map.md')
foreach ($store in $stores) {
    $body = Get-Content -LiteralPath $store -Encoding UTF8 -Raw
    foreach ($entry in [regex]::Split($body, '(?m)(?=^#{2,3} )')) {
        if ($entry -match '(?m)^#{2,3} ' -and $entry -match $entryPattern) {
            $heading = [regex]::Match($entry, '(?m)^#{2,3} [^\r\n]+').Value
            Write-Output ($store + ': ' + $heading)
        }
    }
}
exit 0
```

Repeated symbol-location search, observed process exit **0**. It returned all declaration anchors used above, including the indented updateCounts declaration at program-editor.ts:958. Earlier correction attempts missed that indented declaration and were superseded by this command.

```powershell
rg -n '^[ ]*(export )?(type (ProgramRule|RuleGroup|Program)\b|function (checkProgram|reconcileCounts|countStarts|startRun|newGame|setProgram|send|restart|end|advanceMinutes|itemFor|chooseActivity|startActivity|newMapRun|stepMinute|addGroup|dropRule|moveRule|updateCounts)\b)' src/browser/sim/types.ts src/browser/sim/game.ts src/browser/sim/program.ts src/browser/sim/run.ts src/browser/view/program-editor.ts
```

The historical preliminary search that named a nonexistent critical_flows.md reported a missing-path error; that attempted read supplies no absence claim. The actual store inventory resolved the mistaken path. No check result is inferred from that multi-command wrapper's last exit.

Own-work check: the most likely missed requirement was losing part of a settlement by merging the lifecycle rows into D-93, or counting completion/minutes rather than starts. Compared all five rows plus all three projections to full entries, then followed newMapRun → startRun/countStarts, stepMinute → advanceMinutes/countStarts, setProgram → reconcileCounts and app/editor refresh. Every required branch is represented, and no combined row disappeared. The fresh foundation check confirms structural consistency, not runtime behavior.

Retained root gate, not rerun: `npm test`, exit 1, final-gate.log and final-gate.exit-code. Read the actual tail and exit file: Node 343 passed, zero failures/skips; Python 264 in four directories, workflow 5/deploy 64/quality 32 passed, invariants 163 ran with zero assertion failures and one setUpClass error. The error is OneExpressProcessServesGameAndApi: Get-NetTCPConnection reports no MSFT_NetTCPConnection matching Listen. Its behavior remains unchecked; this step establishes no root cause. No Docker skips were reported. The full command did not reach foundation checking. Root's separate `python -B .the-way/elements/common/foundation_check.py`, exit 0, is confirmed in final-foundation.log/.exit-code, separately from the fresh check above. Neither turns the full gate into a pass.

Not run here: npm test (unchanged reviewed sources, explicit dispatch says not to repeat it); no focused tests (D-77); no invariant mutation/failing-first test (no test or invariant changed); no new browser run or screenshots (no UI changed); no new build/typecheck (no code changed). The inherited missing early Slice 1 logs and unretained early Slice 8 foundation exit remain limits recorded by the whole reviewer, not repaired by assertion in this report.

## Reaches and choices

Additional selective reading beyond the handoff's selected-entry list:

- Pinned common foundation-reading and guideline-reading methods and process glossary, to apply the return-step search and distinguish an environment fact from product behavior.
- Actual foundation store inventory and relevant WCAG/CSS fact entries, to check external premises; terrain-drawing-numbers, reached through the migrated view invariant and D-19, remains unchanged.
- Final types.ts, game.ts, program.ts, program-editor.ts and app.ts in full; run.ts, status-row.ts and headquarters.ts in full; both fixture helpers; test_program_rule_pick.py and the relevant group-condition/counter test passages. These verify the foundation against the actual path and ownership rather than reports alone. The guideline examples were located in traits/time, HTTP and occupied-address tests. None justified a code change.
- Whole README and its CSS diff, for the changed user-facing meaning. The previously reviewed M1 (README:50) and M2 (README:73) remain review findings outside scope. They were not fixed or converted into foundation entries.
- Root's final-gate/foundation logs and exit files, to report the current evidence exactly. Global review playbook and prerequisite Obsidian rulebook were read; neither vault was edited.

Autonomous choices:

1. Keep implementation details (positive stable IDs, next-ID metadata, nullable separate counts, canonical serialization, DOM rebuilding/focus targets and the drag payload) out of new foundation entries. Alternative: freeze each mechanism as a new product decision. The existing product meanings are already binding; freezing the machinery would make later equivalent implementations require unnecessary foundation changes. Cost if this judgment were wrong: a later task would miss a durable contract. Inspection found no persistence/external consumer or promised surface making those mechanisms such a contract.
2. Make no new invariant merely to restate observed counts. Alternative: introduce another invariant without a rule source requiring that form. D-92/D-93 already settle the behavior and permanent behavioral tests protect it; the return step expressly prohibits invented invariants. No accepted row is deferred by leaving the verification form unchanged.
3. Reuse the final full-gate evidence and run only the cheap foundation/cleanliness checks. Alternative: repeat the unchanged full suite and browser journey. That would spend time without changed code or disputed behavior; the actual remaining failure is reported plainly, with its unchecked behavior. No success is inferred for the failed class.

Questions: none. No entry is deferred, and no further foundation work is proposed. Return before independent review, target reconciliation and request publication.
