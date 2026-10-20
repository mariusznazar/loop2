# Independent S4 review

## Spec compliance

**Spec compliance: PASS.** The complete supplied review package for `fc7445a540c0beb524ea821cd30d9c25a3ce0e92..e127aa4db9104b596cafd078caed40e0d4c46203` implements Task 4: all seven named modules are changed, exactly fifteen accepted postfix non-null assertions are removed, the two necessary assertions remain, and the remaining edits are adopted formatting. No extra product behavior, dependencies, policy changes or test changes enter this range.

**Task quality: Approved.** No Critical, Important or Minor finding in the S4 change. Approval is scoped to S4, not the entire coding-guidelines task or merge readiness.

Review location: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`.
Commit reviewed: `e127aa4 style: format simulation modules and remove redundant assertions`.
Changed-file coverage: seven files, +316/-132. Read the complete supplied diff once; used targeted searches afterward only to locate report anchors. No separate whole reads of changed source files, product mutations, git commands, tests, subagents or next-stage actions were performed by this reviewer.

## Strengths

- `src/browser/sim/hex.ts:47`: the removal preserves Dijkstra's selection, relaxation, costs, tie order and first-step logic. Its twelve removed assertions are precisely five in relaxation, four in candidate selection, two in the selected result and one in the reverse-cost lookup. None is replaced with a cast, changed operation or weaker check.
- `src/browser/sim/run.ts:58`: only the unnecessary candidate element assertion is removed. `src/browser/sim/run.ts:64` and `src/browser/sim/run.ts:66` retain the `walkTarget(...)!` and `tileAt(...)!` assertions required by the assigned scope. The feasibility check in `src/browser/sim/program.ts:64` continues to govern selecting a walk.
- `.runs/task-cycles/coding-guidelines/reports/s4-preservation.mjs:47`: exact equality to pinned Prettier's output over the baseline with only accepted postfix deletions constrains the whole text, including comments and literal values. This is stronger than relying on the large visual formatting diff or an AST checksum alone.
- `.runs/task-cycles/coding-guidelines/reports/s4-report.md`: the author distinguishes TS6's auxiliary AST/transpile proof from real TS7 compilation, records the expected global lint failure honestly, and does not claim full product-gate or visual acceptance.

## Issues

### Critical

None.

### Important

None.

### Minor

None.

There are no new inline review threads or additions to existing threads. No correction is requested for S4.

## Requirements coverage

| Assigned file | Independently checked change |
|---|---|
| `src/browser/sim/game.ts:1` | Formatting only: import layout, quote delimiters, parameters, guards and object/return layout; validation, event order and simulation inputs remain the same. |
| `src/browser/sim/hex.ts:47` | Twelve postfix removals plus formatting; unchanged coordinates, distance arithmetic, traversal, tie breaking and result selection. |
| `src/browser/sim/layout.ts:48` | One postfix removal at the guaranteed resource placement; fixed seeded draw order and resource placement logic retained. |
| `src/browser/sim/program.ts:77` | One postfix removal from `program.rules[ruleIndex]`; first matching feasible rule, copied action and wait fallback retained. |
| `src/browser/sim/random.ts:2` | Only Stream union quote formatting changes. Generator and seed arithmetic are outside the edits. |
| `src/browser/sim/run.ts:58` | One candidate postfix removal plus formatting; both required walk assertions retained at lines 64 and 66; durations, event order and state transitions unchanged. |
| `src/browser/sim/types.ts:36` | Quote and union layout formatting; public member names, alternatives and types preserved. |

The full diff contains no lint suppression, exception or configuration edit. The original task's sixteen total removals comprise these fifteen and one terrain-picture removal explicitly assigned to S7; the latter is not missing S4 work.

## Foundation and guidelines selection

Read the complete part map, the current decision Scope list, current invariant Part/method list and the selected whole entries. All changed files map to **simulation** (`foundations/part_map.md:21`), with no new responsibility, integration, UI surface, trust boundary or irreversible effect. Its recorded failure modes are none; no invented low/high criticality classification is needed for this mechanical change. The concrete risk is accidental simulation behavior drift.

The expected current simulation Scope matches reconcile with whole-read entries D-04/3, D-06/3, D-18/1, D-20/1 through D-32/1, D-34/1 and D-35/1 in `foundations/decisions.md`. Relevant binding rules preserve explicit inputs, immutability, seeded layout/wander streams, action duration, time arithmetic, first feasible rule, map data and movement semantics. The diff introduces no conflict with them. D-28 and D-35 preserve the exemplar selection without requiring every helper to return GameResult. D-29 and D-32 govern these assertion and formatting changes. D-33's current accepted npm pin is 12.2.1, consistent with the amendment; this slice changes no dependencies.

Read the complete invariants file, product glossary, pinned process glossary and relevant linked environment facts. The inspected source changes preserve the behavioral invariant sentences; none of their checks or methods changes in S4. Global/every-Part invariants were read for applicability, but the author's 17-module run is not presented here as execution of all those methods.

Verified the selection against `.the-way/product-guidelines/reading.md` and `.the-way/elements/common/way_of_working.md`. A direct existence check confirms there is still no `guidelines/` directory. The missing general and `simulation-module` guidelines remain this task's S11 output, as the accepted task and plan explicitly state. There is no existing guideline file to select/read, no newly discovered discrepancy and no inferred exemption. The changed code is simulation code, not UI code, so appearance grading and screenshots are not applicable.

## Concrete risks checked

1. **Behavior hidden by reformatting.** Read every hunk and inspected the proof helper plus its complete successful output. The helper obtains the exact fc7445a baseline, parses it, deletes accepted non-null tokens only and requires the installed formatter's exact output to equal each actual file. Expected removal counts are fixed per file at `s4-preservation.mjs:10`; retained expressions are asserted at line 51. LF is asserted separately. All seven files are present in `s4-preservation-final.txt`, with the expected 0/12/1/1/0/1/0 removals.
2. **An overly permissive preservation oracle.** Inspected `s4-preservation.mjs:25` and `:47`. Structural normalization ignores SourceFile text and redundant expression parentheses; in isolation it is not a universal semantic equivalence proof. Exact baseline-to-formatter equality independently prevents arbitrary additional source changes. Parsing rejects diagnostics, source ASTs are compared and emitted JavaScript ASTs are compared through TS API6 at line 54. The helper does not establish TS7 byte-identical output, and neither does this review. Real TS7 typecheck/build and runtime tests supply the complementary evidence required here.
3. **Deleting required assertions or moving the random draw.** The complete run/program/layout hunks retain feasibility, draw count, candidate order and required nullable-result assertions. Baseline ESLint output independently lists 12 hex plus 1 layout, 1 program, 1 run and 1 terrain-picture diagnostic. Final output lists only the same terrain-picture diagnostic. No silent failure or rule weakening is present in this range.
4. **Tests exercising stale or irrelevant output.** Read the four assigned existing test files: hex/layout/program/time import built `dist/public/sim` modules and assert concrete costs, tie results, golden seeded stocks, program choice, carried time, pause behavior and event order. Inspected the complete recorded build and test outputs and their command/exit metadata. Existing invariant launcher explicitly loads the 17 simulation-owned modules unchanged, and its output names their executed tests. No need for a routine rerun or a new test mirroring formatting was found.
5. **Reported checks passing with warnings or partial execution.** Complete recorded runtime and invariant outputs have no warnings, failed cases, skipped cases or cancellations. The two failed intermediate scratch proof attempts are disclosed as oracle development failures and superseded by the final exact-equality proof; their visible failures concern SourceFile trivia and redundant parentheses, consistent with the correction. They are not product test passes.

## Recorded check evidence inspected

All paths in this section are under `.runs/task-cycles/coding-guidelines/reports/`. Inspected complete outputs and adjacent `.txt.json` files carrying exact commands and actual exits. These are author executions, not reviewer executions.

| Check | Recorded result | Evidence |
|---|---|---|
| Local pinned Prettier write on exactly the seven assigned paths | Exit 0; seven paths listed | `s4-prettier-write.txt` and metadata |
| Local pinned Prettier check on exactly those seven paths | Exit 0; all matched files formatted | `s4-prettier-check.txt` and metadata |
| `npm.cmd run typecheck` | Exit 0 | `s4-typecheck.txt` and metadata |
| `npm.cmd run build` | Exit 0 | `s4-build.txt` and metadata |
| `node --test tests/sim/*.test.mjs` | Exit 0; 103 tests passed, zero failed/cancelled/skipped/todo | `s4-sim-tests.txt` and metadata |
| `python -B .runs/task-cycles/coding-guidelines/reports/s4-invariants.py` | Exit 0; 51 tests from 17 named modules, OK | `s4-invariants.py`, `s4-invariants.txt` and metadata |
| Final preservation helper | Exit 0; all seven modules checked | `s4-preservation.mjs`, `s4-preservation-final.txt` and metadata |
| ESLint before/final | Exit 1 in both; 16 baseline diagnostics become exactly one unchanged view diagnostic | `s4-eslint-before.txt`, `s4-eslint-final.txt` and metadata |
| `git diff --check` | Exit 0; no output | `s4-diff-check.txt` and metadata |
| Installed versions | Exit 0; Node 24.17.0, Prettier 3.9.10, TS API6.0.2, compiler7.0.2, ESLint10.12.0, npm12.2.1 | `s4-versions.txt` and metadata |

No reviewer test was run: the existing evidence answers the concrete risks raised by this diff. The review performs evidence inspection, not recertification of the preceding tool-installation slice or its independently authored check configuration.

## Declined or out-of-scope items and limits

- `s4-eslint-final.txt:1`: the terrain-picture diagnostic remains a real global lint failure, explicitly scheduled for S7. It does not block this correctly bounded S4 approval. It must be removed before whole-task compliance/merge.
- `plan.md`: whole-product gate, global format compliance, all changed-part directories, dependency audit against the original c379207 fork, guideline files/cases and deliberate breaks remain later integration work. No pass for them is inferred from the simulation subset. The original fork remains c379207bfd8bd148d3589ea75604ba5165915d01.
- The missing guidelines are acknowledged S11 output, not silently waived. No exemplar/architecture expansion, screenshot task or general simulation refactor was requested here.
- The auxiliary emitted-AST proof uses TS API6 rather than the actual TS7 compiler API. For this exact formatting/type-erasure change, exact formatter equality plus real TS7 checks and behavioral suites are sufficient; exhaustive runtime equivalence is not claimed.
- The reported overlap of the first final-source ESLint read with the tail of the invariant run was a sequential-execution deviation. The author retained the actual failing lint result and recorded a subsequent sequential final lint run. It produces no unresolved S4 code/evidence defect and is not represented as compliance with concurrent-writer permission.

**Unresolved S4 concerns: none.** Remaining concerns for the controller are the known S7 view lint failure, S11 guideline creation and the explicitly pending final whole-task validation/independent acceptance. No product or frozen-check correction is requested by this review.
