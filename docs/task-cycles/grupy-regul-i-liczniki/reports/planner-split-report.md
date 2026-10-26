# Planner split report — remaining rule-group migration

**Status:** done with concerns.

The revised plan is complete. No open product design choice or question remains. Only the ignored planning artifacts changed; no product code, tests or foundation entries changed, no tests were run, no commit or push was made, and no executor was started. I did not read cycle.md.

- Plan: `.runs/task-cycles/grupy-regul-i-liczniki/plan.md`
- Final size report: `.runs/task-cycles/grupy-regul-i-liczniki/plan-size.md`
- Worktree: `C:/Storage/repos/loop2-wt/grupy-regul-i-liczniki`
- Branch: `task/grupy-regul-i-liczniki`
- Current HEAD: `e8ab9cd53398b7f40f9f05bcca0ef07ac08f5d40`
- Original task base: `9a5f3605f73da87fc5c87089c8166d2658c0add6`
- Verified process pin: `2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c`

## Division

Completed Slices 1–4 stay completed. Their goals, changed-file sets, model classes, risks, checks and dependencies are preserved, apart from references to the renumbered remaining slices. Their foundation ranges and the plan's Choices addresses now point to the current entries. Their implementation commits remain `2dfc91f`, `98c629f`, `65ad040` and `e8ab9cd`; no completed work is to be repeated. The old plan and size report remain in the orchestrator's `plan-before-slice-5-split.md` and `plan-size-before-slice-5-split.md` unchanged.

| Remaining slice | Goal | Files to change |
|---|---|---:|
| 5 | Put the four handmade active-action inputs behind a small constructor in the existing JS fixture | 5 |
| 6 | Switch the grouped program and stable activity identity contract, validators, picker, fixture helpers and minimally adapted editor together | 10 |
| 7 | Count action starts and preserve/reset/display counts through the run lifecycle | 6 |
| 8 | Complete group controls, native rule dragging, focus/state checks and related README instructions | 4 |

The returned Slice 5 made no changes. Its ten-file switch reached four additional input sites: `campfire.test.mjs:endingNext`, `gather.test.mjs:gatheringEndingNext`, the exploration/renewal setup in `world.test.mjs`, and `status-row.test.mjs:doing`. All four currently construct a rule activity with `ruleIndex: 0`. These are setup objects, not incidental expectations that can be removed. The current Activity definition requires the reference.

New Slice 5 adds only `ruleActivity(action)` to the existing `tests/sim/program-fixture.mjs` and uses it at those four sites. The helper initially emits exactly the current valid shape, preserving the action and existing first-rule reference. No assertion, time, resource, destination, state field or source comment changes. It does not invoke product selection or calculate an expected outcome. Slice 6 switches the helper's representation in the same change as Activity. It already changes that fixture file, so its file count stays ten. All four consumers then receive the valid new shape without another edit.

The campfire, gathering and world fixtures deliberately finish actions while their current program is empty. They must remain valid: D-20 requires an action already in progress to finish despite a program change or removal. The revised plan explicitly keeps the copied action and does not require a lookup of its old rule in the current program. It does not fabricate program entries to make a test setup match an incidental identity.

The cost is one additional full `npm test` gate and one small input constructor. The rejected alternatives are a fourteen-file switch, leaving malformed Activity inputs after the switch, or carrying two production formats. This preparation is reversible and keeps the production program runnable throughout. It adds no framework, generic fixture layer, runtime adapter or new product behaviour.

The returned editor focus suggestion was assessed as a local implementation choice. Slice 6 uses a group identity plus a rule index within that group for existing edit helpers and carries group identity with pending focus targets. Stable rule identity remains program data for counters and transfers. This avoids flattening the grouped model or moving the complete group/drag interface into the contract switch. Slice 8 must still resolve moved-rule locations and preserve focus. This is a reversible helper API, not a new foundation decision.

## Foundation, coverage and guidelines

The foundation is already recorded by commit `e5ea04757c56bf80e84059ee403c854b7087ea3a`; no duplicate writing is planned. The plan maps F1 to D-90, F2 to D-91, F3 to D-92, F4/F5/F7 to D-93, F6 to the complete D-23, F8 to rule group and the consequent program glossary change, F9 to program-rule-pick and its existing check, and F10 to the Python fixture's simulation ownership. Remaining Read fields include the actual D-90–D-93 and rule-group entries as well as the original table references.

The required outcome, all seven To do items, all five accepted settlement rows and the assigned projected entries remain mapped. Counters, native mouse dragging, one-click destructive group deletion and the related README description stay in scope. Player-program storage, copied runtime programs, discovery and combat implementation remain outside this task. No human decision is needed for the split.

The five applicable guideline files were read whole for the original plan: `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-browser-module.md` and `guidelines/styleguide-browser-view.md`. A comparison against the task base shows none changed in completed Slices 1–4. The styleguide was reread for this split, including its order-of-work example. No missing, malformed or contradictory guideline was found. CSS continues under the existing explicitly deferred exemplar arrangement; this plan adds no code kind or test level.

The styleguide example begins with environment/library, sourced values, a screen and its states. The environment, shared controls and tokens already exist and remain unchanged. Preparing inputs and switching the contract before completing the editor therefore preserves the original justified order. UI slices still require real-browser focus/event evidence; the final slice requires a native mouse drag journey and screenshots. Pure transformations or a modelled DOM are not substituted for browser behaviour. No permanent browser automation is introduced.

## Reading and reaches

Read the new handoff, the whole frozen task and current plan, current size report, the complete returned-size and foundation reports, and all four completed slice reports. Read global, worktree and browser AGENTS instructions. The pinned plan skill and its reading procedures were checked; the process gitlink and checkout match. The changed foundation entries were read whole, and all plan foundation ranges were refreshed from current headings.

The split specifically required complete setup reads of `campfire.test.mjs:1-128`, `gather.test.mjs:1-106`, `world.test.mjs:1-125` plus its full exploration/renewal test, and the complete `status-row.test.mjs`. These were named by the new handoff and resolve the returned author's truncated supplemental output. `tests/sim/program-fixture.mjs`, the Activity definition in `src/browser/sim/types.ts`, and the selector's complete final function in `src/browser/sim/program.ts` confirm the current construction contract. The repository-wide `rg -n 'ruleIndex' src tests` found only the four reached sites and the type/picker/direct-selection tests already included in the atomic switch.

Additional reaches for this revision were narrow: the existing planner report to keep its guideline and visual-order findings, the current foundation heading inventory to verify ranges, and a read-only comparison of the five guideline files with the task base to avoid treating unchanged instructions as new. No external documentation, other repository, vault source or new part was needed. No interpretation from the returned author was accepted as a product requirement.

## Checks and concerns

The exact final command was:

```text
python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/grupy-regul-i-liczniki/plan.md
```

It exited **0**; all eight slices fit and none is unchecked. The final stdout is saved in `plan-size.md`. Remaining slices have 5, 10, 6 and 4 changed files and approximately 110,472, 126,842, 117,733 and 122,450 estimated tokens respectively. These are estimates at the current tree; authors still return if their actual scope exceeds them. No size limit was waived.

A structural comparison confirmed all 24 completed-slice fields (six fields across four slices) unchanged after accounting only for later-slice renumbering. Foundation range checks confirmed that every referenced range starts at its named heading and stays within its file. Tracked `git status --short` was empty after writing the plan. No product verification result is claimed from this planning stage.

The exact read-only structural/range verification was repeated while supplementing this report, from the task worktree. Both the Python process and the PowerShell command exited **0**. It printed `Completed-slice fields preserved: 24/24` and `Foundation heading/range checks: passed`:

```powershell
@'
from pathlib import Path
import re
root = Path('.runs/task-cycles/grupy-regul-i-liczniki')
old = (root / 'plan-before-slice-5-split.md').read_text(encoding='utf-8')
new = (root / 'plan.md').read_text(encoding='utf-8')
for number in range(1, 5):
    section = rf'^### Slice {number} .*?(?=^### Slice |^## Coverage)'
    before_section = re.search(section, old, re.M | re.S)[0]
    after_section = re.search(section, new, re.M | re.S)[0]
    for field in ['Goal', 'Change', 'Model', 'Risk', 'Checks', 'Depends on']:
        pattern = rf'^- \*\*{field}:\*\* (.*)$'
        before = re.search(pattern, before_section, re.M)[1]
        after = re.search(pattern, after_section, re.M)[1]
        before = re.sub(r'\bSlices? [1-7](?:[\u2013-][1-7])?(?:, [1-7])*', lambda m: re.sub(r'[5-7]', lambda n: str(int(n[0]) + 1), m[0]), before)
        assert before == after, (number, field)
print('Completed-slice fields preserved: 24/24')
for filename, start, end, name in re.findall(r'`(foundations/[^`:]+):(\d+)-(\d+)` ([^\n\u00b7]+?)(?= \u00b7|\n|$)', new):
    lines = Path(filename).read_text(encoding='utf-8').splitlines()
    selected = lines[int(start)-1:int(end)]
    assert selected and name.strip() in selected[0], (filename, start, name)
    assert int(end) <= len(lines), (filename, end)
print('Foundation heading/range checks: passed')
'@ | python -
$plannerStructureExit = $LASTEXITCODE
Write-Output "structure and range check exit: $plannerStructureExit"
exit $plannerStructureExit
```

The exact status verification below exited **0**, explicitly printing `git status --short exit: 0`; the Git command itself produced no status entries:

```powershell
git status --short
$plannerStatusExit = $LASTEXITCODE
Write-Output "git status --short exit: $plannerStatusExit"
exit $plannerStatusExit
```

The other read-only checks cited in this report have these exact Git/search commands and exit codes:

| Command | Exit | Result |
|---|---:|---|
| `git ls-files --stage -- .the-way` | 0 | Gitlink is `2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c`. |
| `git -C .the-way rev-parse HEAD` | 0 | Checkout is the same commit. |
| `git diff 9a5f3605f73da87fc5c87089c8166d2658c0add6 -- guidelines/coding.md guidelines/testing.md guidelines/coding-simulation-module.md guidelines/coding-browser-module.md guidelines/styleguide-browser-view.md` | 0 | Empty diff; all five guideline files are unchanged from the task base. |
| `rg -n 'ruleIndex' src tests` | 0 | Matches are the four setup sites and the type/picker/direct-selection test sites included in the contract slice. |
| `rg -n '^## |^### ' foundations/part_map.md foundations/invariants.md` | 0 | Current headings supplied the range inventory; the Python check above verifies the plan's resulting references. |

The first three Git checks were repeated with `$LASTEXITCODE` captured immediately after each command, printed and returned by PowerShell. The repeated checks did not change the plan or run product tests. The earlier full-gate outcomes below are attributed evidence from the completed slice report, not checks executed by this planner.

Current product evidence comes from the completed Slice 4 report: Node 318 passed, agent workflow 5 passed, deploy 64 passed, invariants ran 161 with the one known listener-enumeration setup error, and quality 32 passed. The unchanged-tree retry passed all three Docker checks with no skips; the earlier transient Docker context-file lock is not a permanent environment blocker. The whole `npm test` gate still exited 1 and did not reach its foundation step; the separate foundation check passed. Neither the baseline error nor a skipped/unreached check is a pass.

Every remaining slice uses `npm test`, saves its full log and exit code, checks actual Docker execution, reports the listener error if it recurs, and runs the foundation check separately if the failed gate never reaches it. Behaviour-changing slices retain failing-first tests through the full gate. The new copying-only preparation needs no invented failing-first test. Focused tests and redundant reruns are not planned. The baseline environment error is not to be hidden by unrelated test changes.

Remaining evidence is the actual implementation, its required full gates, browser checks and whole-change review. The plan preserves those requirements and stops before code.

## Questions

none
