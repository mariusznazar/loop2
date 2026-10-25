# One author handoff

The user invoked the-way-implement-task on this accepted task and delegated intermediate choices. Execute it to reviewable committed work, then return; do not open PR, merge, edit backlog, or start the review/return stage yourself.

- Worktree: C:/Storage/repos/loop2-wt/przewodnik-testow (all writes here).
- Branch: task/przewodnik-testow; target main; base 8ac8584c7187c2c2bf63f0a71aeee4fb992a83f5.
- Frozen whole task: .runs/task-cycles/przewodnik-testow/task.md. Read whole. Source accepted 2026-10-25, C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/_zadania/przewodnik_testow_loop2.md.
- Method: .agents/skills/the-way-make-change/SKILL.md and all references. Read method fully. Also read the foundation-step paragraph of .the-way/task-cycle/skill/SKILL.md (under Execute, verify and review), which authorizes the full accepted settlement rows through their element skills. Do not read cycle.md.
- Report: .runs/task-cycles/przewodnik-testow/reports/author-report.md.
- Planning routing evidence: reports/planner-report.md beside this handoff. No plan or spec binds implementation. All behavior/design choices are settled; one author holds the limited substantive change plus deterministic generated installer files. If any source contradicts itself, report it rather than bend code to it.

## Pin upgrade

Current verified pin is 4302f72ba638fb222fc3d9de73decacdf7ca6682. Approved target is exactly 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c. Read .the-way/installation/README.md. The accepted task authorizes preview and confirmation of this exact upgrade; send orchestrator the preview path/summary before apply, then await its confirmation (no human intermediate approval requested). Use installer from a checkout of the exact target, within worktree ignored scratch, not arbitrary current external checkout. Installer is the only writer of its generated files. Verify target reachable at configured origin, preserve URL. Apply and commit gitlink and all installer output together; subsequent methods must use verified new pin. Preserve initial method/report requirements where upgrade adds none, and report changed method requirements. This task is expressly allowed to create testing guidelines before its test changes; it does not wait for its own output. Do not execute tests that mutate shared dependency installations.

## Scope and foundation

Implement all eleven To do points and all 25 accepted Settlements to record. Map every settlement row to its resulting entry (including reused entries), with a Polish sentence of meaning for PR. Read the whole frozen task, including Q4b exclusions, Q5h–Q5j exemplar limits, Q6 deferrals, Q7 corrections and Q11 baseline handling. No new property-test library, browser automation, helper refactor, fixed geometry orientation, simulation selector formula, or unrelated baseline fix.

Foundation reading: complete decision entries D-01 through D-09, D-11 through D-13, D-15, D-18 through D-72 insofar as their Scope includes browser-view, simulation, account-server, build-tools, agent-workflow, plus all Decisions in play. Invariants of these parts/every, particularly action-in-progress, move-reach, map-run-repeatability, simulation-randomness, introduced-npm-vulnerabilities, account-server-occupied-address; also loop2-deploy-trigger-input, icon-file-content, application-build-kitchen-sink as guide sources. Read glossary terms used and linked facts as needed. Foundation writers select/search through each element skill; use only the-way project element skills, including part-map assignment of any new file not already covered. D-28 revision is explicitly accepted. Do not re-propose accepted rows to human. Unspecified implementation choices go into report, durable decisions use foundation/return method.

Read guidelines/coding.md and guidelines/styleguide-browser-view.md whole; new guidelines/testing.md before changing tests, written via the upgraded project maintain-testing-guidelines method. Read src/browser/AGENTS.md if touching or temporarily mutating source under it. No production behavior/UI change intended. Existing kind guides do not apply just because test imports a module; read relevant ones before a temporary production mutation. Instructions change uses C:/Storage/The Brain/The Brain/.ai/skills/maintain-instruction-files/SKILL.md. Before installer-created skill changes, read C:/Storage/The Brain/The Brain/Notes/Areas/(A) Claude code/konwencje_skilli_i_commandow.md; no global skill edits.

Trust boundary: no production boundary file expected in final diff, but HTTP and audit boundary tests change. Demonstrate crafted input and failing checks required by task. Font and preview-server review-only invariants carry exactly approved deferred tests, without changing those boundary files. Irreversible operation: none; no deployment, merge or server change. No UI change means screenshot check is not applicable unless scope changes.

## Checks and environment

Every repository test runs via npm test. Author may run required failing demonstrations via npm test with controlled temporary mutations, preserving/restoring bytes in finally. Explicit task Q11 separately authorized orchestrator's baseline serving test and foundation check; don't infer general focused-test permission. Run own-work checks required by make-change; report each command and exit code, expected failure versus unrelated baseline failure, and whether targeted check actually executed. Capture output to UTF-8 files without printing non-ASCII via Python stdout.

Baseline evidence from orchestrator at base:
- python -B tests/invariants/test_loop2_one_serving_process.py: exit 1, setup at line 177 fails because Get-NetTCPConnection returns no Listen objects after HTTP probes succeeded; see base-serving.log.
- python -B .the-way/elements/common/foundation_check.py: exit 0, see base-foundation.log.
- Controlled .NET TcpListener test: actual listener active, Get-NetTCPConnection count 0, netstat count 1. Environment enumeration mismatch; exact Windows cause not diagnosed.
- Full base npm test pending; inspect base-gate.log only after orchestrator gives exit/result. Prior task-source run: 318 Node passed, Python setup error above and three Docker-dependent skips. Report those honestly; do not retry solely for green, fix unrelated test, weaken failure, or call missing checks passed.
- node_modules and .runs/quality-venv are junctions to primary checkout installations at same lockfiles. Read/use only, no installs or updates there. Built outputs are local. No npm dependency changes needed.

Preserve existing file newline conventions; English identifiers/comments and commits, Polish guide prose consistent with existing guides. Git add explicit paths only. Final working tree clean and changes committed. Report checked and unchecked requirements, failing/passing invariant evidence, source reaches, concerns and choices with evidence. Questions go only to orchestrator; report returns before next stage. Network research is not expected; if necessary, public unauthenticated queries with no private identities or local paths.

## Actual selection at the return step

Reviewed head 42522e679b27cff411ee80a0e24e336dd40ad5de, tree c31fddf732c6d329fd28d11d6dd23bafd774adc0. Installed gitlink and checkout are now both 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c; the earlier pin and pending-baseline statements above describe the original dispatch, not the current state.

Actual changed parts: simulation (action-in-progress and wander tests), browser-view (geometry test), account-server (HTTP invariant marker), build-tools (audit marker and new Node-selection test), agent-workflow (guides, instructions, wrappers and pin), product-foundation (decisions, invariants and glossary). Deployment is reached by guide policy and its boundary description, with no changed implementation. Existing guidelines/** and tests/quality/** assignments cover the new files; all seven map entries were reconciled, no map update required.

Add to the original complete entry selection: new D-73 through D-89; revised D-28; reciprocal verification changes to D-33, D-45 and D-46; new public-file-access, dependency-audit-refusal, font-file-provenance, preview-server-access and node-test-selection invariants; new unit test and integration test glossary terms. The full testing guide is now required for test work. The return checked the Mulberry32 citation against D-22, map-run-repeatability, simulation-randomness and the pinned environment-fact selection rules; it is a replaceable independent fixture source, not an additional environmental condition or algorithm commitment.

Whole-change review PASS and the completed orchestrator gate apply to this unchanged head. The gate retains the known Windows setup error and three Docker skips; standalone foundation checks pass. Return-report.md records all 25 reconciled settlement rows, source/term/durable-choice outcomes and command exits. No return correction or new commit was necessary. The original author's scope, source selection and prohibited unrelated fixes remain in force.
