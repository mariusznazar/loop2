# Return step — walka-w-glebi-lasu

Status: done with concerns

Worktree: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu`, branch `task/walka-w-glebi-lasu`.
Return base: `ab2e8d3552d6be4c7cd8b387e779de1c0f4d2e88`. Task base: `7a633a7ab44868427c9c824948b99d4400a631ca`.
Return head/commit: 23daea55f5984d99bacfeadb6681b44eb6705fb1.
Pinned process: `3aee7d958835cc19b95519f4d21b37538b78e3e1`, verified against both the gitlink and checkout.

The three new invariant-list failures are corrected. All three affected suites pass after the same commands first showed their intended assertion failures. No foundation wording, flag, gameplay code, view, dependency, guideline or external file changed in this step. The concerns retained from the supplied evidence are the existing nonblocking M1 citation finding, the baseline serving-process setup error, five Docker skips and browser evidence limits. They are not converted into passes. The orchestrator owns independent review and the full gate on this commit.

## Changes

| File | Added | Removed | Purpose |
|---|---:|---:|---|
| [test_content_identifiers.py](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/invariants/test_content_identifiers.py) | 1 | 0 | Adds the accepted deeper-map identifier and display name to the independent scanner expectations. |
| [test_map_run_tiles.py](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/invariants/test_map_run_tiles.py) | 5 | 1 | Adds the deeper map's four resource/stock expectations and explicitly prepares solved Las so its public sends are legal. |
| [test_program_closed_lists.py](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/invariants/test_program_closed_lists.py) | 9 | 4 | Lists both health conditions and all three combat actions, includes them in the valid rule program, and offers both health conditions on groups. |

The numbers/name come from frozen task To do 1 and 5, with the current identifiers checked in `data/maps.ts`, `data/conditions.ts` and `data/actions.ts`. The map prerequisite is the accepted D-149 behavior. The explicit expected lists remain literals. They are not computed from the modules under test; existing tripwires still fail on an omitted entry or unexpected kind. Refusal of unlisted kinds remains unchanged and is exercised both in the headquarters and in a run, in rules and groups. The legal-program control now actually includes all nine condition kinds and thirteen action kinds; its group identity counter changes from 8 to 10 for the nine valid groups.

## Return comparison

Read the complete frozen task and spec, the plan's Foundation entries/Coverage, the foundation report, whole-change review and re-review, and the measurement and browser evidence. Compared the task-changed entries, named entries and relevant whole-foundation search matches with current data, minute resolution, program selection/filtering, discovery, restart/end and view composition. The previous source sentence saying task 7 awaited acceptance is historical: this base already carries D-129–D-136 and their implemented behavior.

### All accepted settlements

| Task row / plan row | Existing entries preserved | Current code/evidence comparison |
|---|---|---|
| 1 / F01 | D-141, D-71 | `run.minuteBeforePick` freezes the body while advancing world/streak; `finishMinute` resolves at M+5 from the then-current filtered program. Encounter tests exercise the wait, edits and both completion windows. |
| 2 / F02 | D-131 | `setProgram` clears streak and defeated attacks only when a running program differs. New runs initialize zero; the ordinary body step does not reset defeated attacks. |
| 3 / F03 | D-142, D-71 | Ordinary body/world/ending-action effects precede completion and the attack; an attack sets `current: null`, so unfinished work loses its later effect. Encounter tests cover exploration and movement interruption plus ending action effects. |
| 4 / F04 | D-143, D-128 | Data revelations name attacked wolf; `discover` merges creatures with actions/conditions/items, and `advanceMinutes` pauses after the complete attack minute. Only chill can write the automatic exploration rule. The fixed lifecycle test proves permanent wolf knowledge. |
| 5 / F05 | D-144, D-151 | Data has 6/3/5 character effects, 24/7 wolf values and strict own-health threshold 8. Resolver uses one pending reduction, consumes it on a damaging enemy strike, and leaves it through a wolf dodge. |
| 6 / F06 | D-145 | Combat changes local health/result data without consuming or damaging the backpack stick; no dressing action was added. |
| 7 / F07 | D-142 | Map data supplies chance 0.01/cooldown 180; a separate attack stream advances only at eligible ordinary minutes, with strict elapsed > cooldown. Restart recreates it from the same seed. |
| 8 / F08 | D-146, D-61 | Resolver stops immediately at zero health or after at most 40 exchanges; no selected character rule produces a null action. Finish records death before completion and counts only creature defeat, with a fresh cooldown. |
| 9 / F09 | D-147, D-133 | Status includes both present requirements and combat priority at resolution minute; combat text formats stored exchanges and remains on terminal screens. Composition places discovery before combat. Browser evidence remains bounded as below. |
| 10 / F10 | D-148 | Combat has a text view; no creature image was added to terrain. Existing target drawing uses nullable current activity. |
| 11 / F11 | D-149 | `canSendMap` reads solved maps and the data prerequisite; both HQ listing and `send` use it. The corrected tile test prepares that accepted prerequisite instead of bypassing send. |
| 12 / F12 | D-150 | Three new skill entries map to the combat verbs and appear in the elemental mage predispositions. Repertoire still comes from shared knowledge and archetype skills. |
| 13 / F13 | action-in-progress, D-20 | The attack exception matches clearing current activity; ordinary program edits preserve it. The existing Python cases protect edits, while encounter cases protect attack interruption. |
| 14 / F14 | beaten attack | Only `creatureDefeated` increases the count; departure and early completion leave it alone. |
| 15 / F15 | combat turn | One recorded exchange holds one creature action and at most one character response; lethal creature strike records null response and stops. |

No accepted row is missing, deferred or rewritten with another meaning.

### Assigned projected entries

| Assigned entry / plan row | Foundation | Comparison |
|---|---|---|
| What is a map made of? / F16 | D-24 | Fixed and random entrances are supported; the random entrance draws after resource placement. Dimensions, resources/renewal/stock and attacker chance/cooldown stand in data. The corrected map-run-tiles expectation now covers the new map. |
| How is a map solved, and what opens the next one? / F17 | D-136 | `meetsSolving` checks each present requirement together; solved maps govern availability. Wounds preserve streak. Only the assigned task 7+8 portion is recorded; program switching and trip-plan behavior remain outside this request. |
| How does combat go? / F18 | D-140 | Data keeps the creature's ordered condition/action pairs; shared condition interpretation and ordered player groups drive exchanges, with attacker first, fixed elapsed game minutes and interruption. |

Carried projected meanings remain in D-22 (separate seeded randomness), D-118 (first wolf discovery), D-23 (program choice) and D-92/D-93 (firing counts and their presentation). No duplicate entry or premature task-18 randomness revision is needed.

### Other revised entries and neighboring rules

| Plan rows | Entries | Comparison |
|---|---|---|
| F19–F20, F27 | D-20, D-23, program-rule-pick | Ordinary and combat selection preserve ordered groups/rules; combat gets the current actor-relative context, and the game supplies the current repertoire-filtered program. False-condition regression checks now exist after review fix. |
| F21–F23 | D-58, D-60, D-61, D-71 | Combat skips the body's ordinary minute, changes health only in exchanges and stops on death before completion; ordinary selection follows a survived final combat minute. |
| F24, F29 | D-118, D-128, Understanding | Creature knowledge is a separate permanent list in the same game-level record. Existing Las chain D-121 and automatic exploration D-123 keep their meanings. |
| F25–F26 | D-122, D-132, D-133 | Discovery precedes combat record; terminal status takes precedence and hides pace/pause; each map supplies its completion text and required progress. |
| F28 | free game minute | Final surviving noncompleted combat minute starts ordinary work; an exchange is a distinct additional rule-pick moment, not another minute. |

D-04 still has pure state/time functions and views reading state/data. D-18 still keeps content in data, D-53/D-55 keep HQ and one manual run, and D-119/D-120/D-126/D-127 still govern shared knowledge and repertoire. D-39/D-40 roles keep their meanings. D-80 does not acquire a success threshold: the specified experiment remains **0/20 completed**, with all twenty runs ending in death; no balance number was changed. The measurement uses the specified fixed combat-first program, original 17 ordinary rules and seeds 1–20, with standard body, empty backpack and explicitly prepared legal knowledge/opening state.

The part map's `src/browser/sim/**` / `tests/sim/**` patterns include the new combat module and combat/encounter tests; `src/browser/view/**` / `tests/view/**` include the combat line and its test. Existing exact invariant-test paths include all three corrected files. Existing build-tools coverage includes `stryker.config.json`. Responsibilities, allowed dependencies, trust boundaries and external context did not change, so no map entry is changed. No new outside source supplies a condition requiring an environment fact. The changed meanings already have their glossary entries; no new product-specific term was found.

## Invariant tests, surfaces and flags

| Invariant | Changed protection in the whole task | Surface / result |
|---|---|---|
| content-identifiers | `tests/invariants/test_content_identifiers.py` in this return commit | The actual browser source scan now includes forestDeep and its display name. 4 focused cases pass, including the explicit positive/negative scanner controls for each entry. |
| map-run-tiles | `tests/invariants/test_map_run_tiles.py` in this return commit | Actual public send/restart/second-send tiles are checked for 15 inputs × 3 starts × 2 maps = 90 starts. Six cases pass, including presence/absence and off-list/wrong-stock controls. |
| program-closed-lists | `tests/invariants/test_program_closed_lists.py` in this return commit | Actual `setProgram` still rejects unlisted kinds; valid controls include the new kinds in rules and both new conditions in groups. Three cases pass. |
| program-rule-pick | `tests/invariants/test_program_rule_pick.py` (creature knowledge fixture), `tests/sim/combat.test.mjs` (ordered false/true conditions), encounter repertoire case | Existing ordinary choice plus the new per-exchange choice. Re-review has independent 11/27 test passes and killed branch-bypass mutants. M1 citation format remains explicitly unfixed. |
| simulation-inputs | `tests/invariants/test_simulation_inputs.py`, shared `program_fixture.py` | Successful combat resolver/picker/final-minute calls and availability inputs extend purity evidence; the shared fully knowing fixture includes creatures. |
| action-in-progress | `tests/sim/encounters.test.mjs`; Python test wording/code unchanged | New exploration/movement attack interruption complements old edit-continuation cases. No extra persistent test is invented merely to duplicate that coverage. |
| minute-span-split | `tests/sim/encounters.test.mjs` after review fix | Five combat/discovery/terminal scenarios compare whole state and ordered events across different chunks for both minute and real-time entry points. M1 remains about citation spelling. |
| map-run-repeatability / restart-seed | `tests/sim/encounters.test.mjs` after review fix | Actual send and restart replay the same complete combat trace; no output normalization. |
| map-run-layout / simulation-randomness / player-map-run-pace / streak-program-change | Existing invariant sentences retained; new layout/completion/encounter examples and actual source checks complement the existing Python tests | Random entrance, separate stream, real-time stop and progress reset remain within the existing meanings. No claim that this return step reran all citing files. |

`action-in-progress` and `program-rule-pick` are the only invariant sentences changed by the task; this return commit changes none. **No Violated mark is set or cleared**, no expected-failure flag is changed, and no skipped test or weakened assertion is introduced. The test suite's earlier environment error is not grounds to mark a gameplay invariant violated.

## Commands and checks

All commands ran from the assigned worktree. The three suites first failed at their known stale-list assertions, not at an import/build failure. Their red and green commands are identical.

| Command | Exit / evidence |
|---|---|
| `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD` | 0 each, both show the recorded pin. |
| `npm test -- tests/invariants/test_content_identifiers.py` before change | 1, 4 cases, one assertion failure naming omitted forestDeep/name; `41-red-content_identifiers.log`. |
| `npm test -- tests/invariants/test_map_run_tiles.py` before change | 1, 6 cases, one assertion failure naming omitted forestDeep/resources; `41-red-map_run_tiles.log`. |
| `npm test -- tests/invariants/test_program_closed_lists.py` before change | 1, 3 cases, one assertion failure reporting both missing condition and action kinds; `41-red-program_closed_lists.log`. |
| `npm test -- tests/invariants/test_content_identifiers.py` after change | 0, 4 passed; `41-green-content_identifiers.log`. |
| `npm test -- tests/invariants/test_map_run_tiles.py` after change | 0, 6 passed; `41-green-map_run_tiles.log`. |
| `npm test -- tests/invariants/test_program_closed_lists.py` after change | 0, 3 passed; `41-green-program_closed_lists.log`. |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa tests/invariants/test_content_identifiers.py tests/invariants/test_map_run_tiles.py tests/invariants/test_program_closed_lists.py` | 0, all checks passed. |
| `python -B .the-way/elements/common/foundation_check.py` | 0, 0 errors; `41-foundation-check.log`. |
| `git diff --check` | 0. |
| `git diff --numstat`; `git diff -- <three named paths>` | 0; exactly the three changes listed above. |

PowerShell records unittest stderr as NativeCommandError text even when the process exits 0 and ends OK. Each listed exit is the captured command exit, not inferred from that wrapper text. Red/green log files use PowerShell's UTF-16 output and the first red log renders the non-ASCII name imperfectly in subprocess output; the literal source name and resulting passing scanner control are UTF-8 and were read directly.

Own-work check: the likely omission was turning the tripwires green while the actual checks still missed the new map or refused valid new kinds. Read the complete drivers and ran their existing positive/negative controls. Public sends of the deeper map now succeed with a prepared legal prerequisite; every map gets exactly 45 recorded starts and each resource must occur and be absent across them. Valid new kinds are offered through real `setProgram` in both HQ and a run, including the two health conditions on groups. Unknown kinds and tripwire controls still fail when deliberately supplied as invalid inputs. The new entries expand the scanners/checks rather than bypassing them.

## Limits, choices and reaches

- No full `npm test` run here: reserved for the orchestrator. Its prior run passed 622 Node tests but had the three now-fixed assertion failures, the preexisting Windows `Get-NetTCPConnection` setup error and five Docker skips. This step neither fixes that unrelated setup nor claims Docker coverage.
- No new browser session, mutation campaign or seed measurement was run. This step changes only Python expectation/input lists. The recorded UI evidence is a component harness using real view modules and public simulation callbacks, with prepared counters for rare completion windows; it is not an uninterrupted normal-app journey. Focus, exact tool invocations, process stop proof and part of the interrupted-target path remain limited as report `browser-proof.md` states. D-75/D-87/D-88/D-89 return conditions are not newly triggered by these three test changes.
- The prior independent reviewer graded M1 nonblocking and returned PASS. Its exact citation-format issue is preserved and not silently fixed by this return work. No new broader foundation/code mismatch requiring expanded product scope was found.
- Choice: keep the explicit expected lists independent of live data. Deriving them dynamically would eliminate the maintenance edits but could hide an unreviewed content change; literals cost one deliberate update when accepted data grows.
- Choice: prepare `solvedMaps: ['forest']` locally in the tile driver. Driving an entire successful first-map program before each of 90 starts would add unrelated survival cost and failure causes. Preparing the prerequisite bypasses discovery/opening progression as test setup only; it does not bypass the public send under test or touch expected/generated tiles. Actual unlock behavior remains covered elsewhere.
- Choice: extend the existing valid-program controls rather than add a separate duplicate suite. Updating only the kind tuples would leave their documented all-kinds acceptance check incomplete. The cost is five literal examples and the correct group counter; mistaken literals are caught by the real parser and independent source review.
- Reach: the handoff named `tests/support/simulation_inputs.py`, which does not exist at that path. Repository file search found and I read `tests/invariants/test_simulation_inputs.py`, the actual task-changed invariant. No absence claim was based only on the failed direct read.
- Reach: `program_fixture.py` was read to establish that the fully knowing helper does not unlock maps. Actual map/actions/conditions data supplied their identifiers and accepted fields. The scope did not grow beyond the three test files after the orchestrator confirmed the input/control adjustments.
- Read the pinned invariant element method/template/common rules/examples and product/process glossaries. This step updates an existing invariant method's expected domain; the invariant sentences remain true in the same wording and need no invented decision. The broader comparison used complete entries, not only search lines; source task/spec meaning supplies the authority, and current code supplies the correspondence.

No question for the human remains in this return step. The next action is independent review of the return commit, followed by the orchestrator's final gate.

## Polish meanings of the task's foundation entries

No sentence below is newly added by this return commit. These are the unchanged meanings of the task's foundation work, retained for the PR. Assigned projected entries are D-24, D-136 and D-140. Settlement mappings are the fifteen rows above (D-151 also carries the health interpretation of row 5); other revisions are the F19–F29 rows above. No entry is deferred.


