# Planner report — testing guidelines

Status: returned to orchestrator for route correction; no plan and no implementation.

Worktree: C:/Storage/repos/loop2-wt/przewodnik-testow

The orchestrator instructed this return after the installer inspection: use one author without a plan, because the wide installer diff is deterministic generated output and the remaining substantive work is settled. This is not an open design choice and no spec is called for. No exception to the planned-slice limits was taken.

## Why planned slices do not fit this operation

The verified current gitlink and submodule HEAD both name `4302f72ba638fb222fc3d9de73decacdf7ca6682`. The task explicitly requires the target `2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c`.

The target diff adds `maintain-testing-guidelines` to `SKILLS` in `.the-way/installation/install.py:44`. The installer builds `sibling_names()` from all `SKILLS` (`:108–110`), inserts that full list into every generated wrapper (`:138`), and builds the root guidance's skill list from the same dictionary (`:148–149`). Thus this single new skill changes every existing wrapper, even where the wrapper's own method is unchanged.

`git ls-files` lists 19 existing the-way wrappers in each tool directory: 38 existing regular files. The target adds two wrappers and rewrites the managed block in root `AGENTS.md`: at least 41 regular files, plus the `.the-way` gitlink, change together. This count follows from the generator and tracked inventory; an installer preview has not run yet and must establish the final manifest.

The pinned `.the-way/task-cycle/slice_size.py:59` sets `CHANGE_LIMIT = 10`; `measure()` counts every explicitly named Change path. A truthful installer slice therefore exceeds that limit before adding substantive work. Additionally, its locator accepts regular files only, so a gitlink named as a Change path points to a directory and is reported unchecked. Hiding wrappers under a directory or a glob, hand-editing generated output, staging it in artificial batches, or moving implementation outside slices would not resolve that conflict honestly. The proposed pre-slice routing was rejected by the orchestrator; no such step was performed.

The task's settled scope needs no new product design. The one-author route can retain the installer's atomic operation and avoid pretending it is several independent reviewed changes.

## Suggested order for the one author

1. Follow the current pin's foundation-step rules, recording the accepted settlements through the project foundation skills. Settle a concrete order with the orchestrator for entries that cite not-yet-marked or not-yet-created tests; do not report their transitional missing-test results as a pass. The new tests and their failing demonstrations must exist before the final checks and review.
2. Run the target version's installer from a checkout actually at the target commit with the repository's existing submodule URL: preview, inspect its exact manifest, then its confirmation-bearing apply. Keep all generated changes together, verify gitlink equals submodule HEAD, and use the new pinned methods thereafter. Do not edit generated wrappers or its root block by hand.
3. Write `guidelines/testing.md` from the target template and the accepted task settlements before changing any test. Align `guidelines/coding.md` and D-28, including moving the explicit-time example without editing its test. Add the root testing-guideline pointer outside the installer block through `maintain-instruction-files`.
4. Make the three test corrections and the boundary-test markings, then add the Node selection invariant test. Demonstrate the required failures using temporary, reversible counterexamples, restore every counterexample, and record assertions that failed, not merely nonzero whole-gate status. The environment's pre-existing serving-process failure otherwise makes a nonzero gate exit ambiguous.
5. Run `npm test`; run `python -B .the-way/elements/common/foundation_check.py` separately if the earlier failed part prevents its execution. Report the known environmental failure and Docker checks that did not run. The orchestrator owns backlog Q9 and the PR; no external source was written here.

This is suggested ordering, not a plan or an authorization to skip any foundation or implementation method. Where an invariant entry cannot yet pass the structural check because its test marker has not been written, keep that transitional failure explicit and close it once the authorized test work is done.

## Settlement coverage for the author's handoff

The accepted rows name distinct questions; do not silently merge or omit any. Actual new identifiers belong to the foundation author, not this report.

| Task row | Intended foundation treatment | Dependent work |
|---|---|---|
| 1 | New decision adopting the pinned testing template | Whole testing guide, with only rows 2–7 as the six accepted departures |
| 2 | New decision on the trigger for reconsidering generated test data | Choosing the level; no library or generated-data tests now |
| 3 | New decision deferring whole player journeys in a real browser | Exclusion and return condition |
| 4 | New decision on temporary font and preview-server refusal-test deferral | Trust-boundary section and review-method invariants, not general exclusions |
| 5 | New decision on full gate only and no whole-run timeout configuration | Every recipe's Command and Time limit |
| 6 | New decision permitting named variants of one behavior | Every recipe's Shape |
| 7 | New decision on the npm registry contract-check departure | Choosing the level and dependency audit |
| 8 | New decision on expected game-balance values | Independent expected-value rule |
| 9 | New decision on three test levels | Levels and Purpose of recipes |
| 10 | New decision naming accepted expected-value source documents | Expected-value rule, preserving the draft-concept limitation |
| 11 | New decision keeping Node/Python conventions and verified gate inclusion | Recipe Files, Node selection invariant |
| 12 | New decision on actual generator, actual files/local HTTP, readiness and cleanup | Doubles and Time and randomness, preserving the existing HTTP-helper deferral |
| 13 | New decision designating exactly the three selected cases | Recipe Exemplar, with their stated limits |
| 14 | New server permission decision | Two-row authorization table and row 19 |
| 15 | New decision excluding pixel comparison of entire screens | Exclusion and return condition |
| 16 | New decision on unautomated real browser events/focus/SVG | Separate exclusion and return condition |
| 17 | New decision requiring author/reviewer to examine return conditions | Exclusion maintenance |
| 18 | Revise existing D-28, all affected fields included | Coding/testing discipline alignment; preserve unrelated deferrals and quality scope |
| 19 | New refusal invariant derived from row 14 | Existing traversal case in `tests/http.test.mjs`, marker and one observed failure |
| 20 | New audit-operation invariant derived from D-33 | Existing malformed-report and newly introduced advisory checks, each marked and each seen failing; retain `introduced-npm-vulnerabilities` unchanged |
| 21 | New review-method font provenance invariant derived from D-46 | Trust boundaries and temporary departure row 4 |
| 22 | New review-method preview-server invariant derived from D-45 | Trust boundaries and temporary departure row 4 |
| 23 | New test-method invariant on all `tests/**/*.test.mjs` files reaching `npm test` | One small test, seen failing on an omitted file; preserve full `npm test` as entry point |
| 24 | New glossary term `unit test` | Level names and recipe purpose; do not copy its definition into the Levels table |
| 25 | New glossary term `integration test` | Level names and recipe purpose; no glossary entry for industry-standard smoke |

Existing mapped entries remain sources rather than duplicate new entries: D-04 and D-22 for explicit time/randomness, D-20 and `action-in-progress` for the first correction, D-24 for geometry, D-33 and `introduced-npm-vulnerabilities` for the separate audit-operation invariant, D-45/D-46 for review-only boundaries, `icon-file-content` and `loop2-deploy-trigger-input` for the existing boundary protections. `guidelines/**` already belongs to agent-workflow. A new test under `tests/quality/` is already mapped to build-tools; placing it elsewhere may require a part-map entry through its project skill. No new environment fact is needed for AI: the task says no AI tool runs in the tests.

## Relevant code findings for the handoff

- `tests/invariants/test_action_in_progress.py` explicitly compares `ruleIndex` and entire current-activity objects. Preserve its main scenario and all three controls, replace technical-shape expectations with finish times, effects and subsequent action choice, and observe an erroneous interruption failing. Its driver already calls public game operations and its snapshots can be projected to behavior without changing production code.
- `tests/view/terrain-picture.test.mjs:49–64` computes expected points with `hexCenter`, `hexCorners` and the product-returned offsets. A small explicit map and size should establish regular six-sided geometry and shared edges independently. The current size and shape assertions must not be replaced by fixed world coordinates; rotation/translation cannot themselves fail the correction.
- `tests/sim/actions.test.mjs:192–204` repeats `candidates[floor(u × n)]`. Earlier cases already protect unrevealed-neighbor preference and neighbor reach; a later case protects repeatability. Reuse or improve those protections, add only missing evidence for one draw, and keep the real generator. The independent expectation must not copy the step-selection formula or candidate ordering. Q7c explicitly accepts one draw from the cited concept fragment; D-22 alone does not establish that count.
- `tests/http.test.mjs:123–147` already sends crafted traversal requests and checks allowed refusal statuses, no outside file content, and no home page. Marker work is authorized; its unbounded listening wait and request idle timeout are accepted deferrals, not authorization for a helper rewrite.
- In `tests/quality/test_audit_dependencies.py`, the malformed-report assertion and the introduced-advisory assertion are inside the same existing test method. Each assertion needs distinct failing evidence even if one test name holds both. A nonzero command caused by another assertion is not evidence that both were demonstrated.
- `package.json:15` selects root HTTP/startup files and only sim/view globs for Node, so an otherwise valid Node test in a new directory is omitted. A new invariant test should fail when such an omitted file exists, without adding selectors, another runner, or a property-test library. The implementation choice for establishing selection belongs to the author; this report does not prescribe a parser.
- The Python runner discovers directories from tracked `test_*.py` files, then unittest-discovery within them. A new Python file in existing `tests/quality/` is discovered; a new directory needs tracked discovery evidence. Final guide wording should match the runner, not simply promise recursive discovery of all files.

## Guidelines, boundaries, and reading

Read `guidelines/coding.md` and `guidelines/styleguide-browser-view.md` whole. Testing guidelines are absent as expected; writing them is this task's outcome, not a prerequisite that blocks it. Existing kind guidelines do not apply to test-only changes. Their broader parts' quality rules still do.

The styleguide's order-of-work example is fonts/library, token source, one screen, then states. This task changes no interface rendering or control behavior, so that example is inapplicable; guide-before-tests is the relevant ordering here.

No persistent production trust-boundary file needs a change. HTTP and audit test changes still require a reviewer to examine the crafted inputs and their observed failures. If the author actually changes `src/server/**`, `scripts/audit_dependencies.py`, `package-lock.json`, fonts, icons, preview-server files or deployment files, reassess boundaries and scope before proceeding. Deliberate temporary mutations used for failing demonstrations must be restored and must not become part of the product diff.

Read the whole frozen task in chunks, the pinned planning skill and its referenced guideline reading/way-of-working methods, the installer README, selected complete foundation entries, both supplied guidelines, and the touched test files. Read the target testing skill/template via `git show` solely as upgrade evidence. Reads beyond the dispatch's directly named paths: source modules `random.ts`, `hex.ts`, `terrain-picture.ts`, `src/server/app.ts`, `scripts/audit_dependencies.py`, the Python runner, and installer/slice-size script internals, to identify the test mechanisms, file ownership and the atomic-generator size conflict. `src/browser/AGENTS.md` was read before examining the browser source. No external source file was opened or modified. No cycle record was read.

## Checks and limitations

| Command | Exit | Result |
|---|---:|---|
| `git ls-files --stage -- .the-way` | 0 | Gitlink is the current accepted pin |
| `git -C .the-way rev-parse HEAD` | 0 | Matches gitlink exactly |
| `git -C .the-way diff 4302f72ba638fb222fc3d9de73decacdf7ca6682 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c -- installation/install.py` | 0 | Target adds one SKILLS item; generator then rewrites sibling lists |
| `git -C .the-way show 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c:product-guidelines/testing/template.md` | 0 | Target template is available and read |
| `git ls-files '.agents/skills/the-way-*/SKILL.md' '.claude/skills/the-way-*/SKILL.md'` | 0 | 38 existing tracked wrappers |
| `git status --short` | 0 | No product changes at planner return |

No plan or `plan-size.md` was written, so `slice_size.py` was not run; the route was corrected before a plan existed. No installer preview/apply, repository tests, foundation edits, product-code edits or commits were performed by this planner. The one author's final checks remain unchecked.

The orchestrator separately reported Q11 diagnostic exit 1 with the same existing class-setup failure, and standalone foundation check exit 0. Its controlled listener was visible to netstat and absent from Get-NetTCPConnection, identifying an environment enumeration mismatch. This is received evidence, not a check repeated here. Its full baseline gate was still running when that message arrived.

Open questions: none for product design. Route revision is owned by the orchestrator and already instructed; this report returns before implementation.
