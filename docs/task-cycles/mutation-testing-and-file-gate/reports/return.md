# Return step

**Status:** done with concerns

**Compared head:** `3bca186aaa955d85dea818017e02deb75ff3965c`, independently reviewed PASS in `fix-review.md` after the original implementation `85c6e64` and fix `3bca186`.

No additional product or foundation change is needed. No new commit was made in this return step; the tracked tree remains clean at the reviewed head. The concern remains the full gate's known baseline Windows listener inspection error. No full-gate success is claimed.

## Settlement comparison

| Accepted row | Foundation | Comparison with the actual code and guide |
|---|---|---|
| 1 | D-94 | Exact core and TAP-runner 10.0.0 dependencies are installed, config mutates only `src/browser/sim/**/*.ts`, `checkers` is empty and only the TAP plugin is selected. Mutation testing in the guide assigns the run to the reviewer of changed simulation files. The condition for adding browser-view requires changing D-94 after an escaped drawing/list defect. Neither runtime application code nor browser-view scope changed. |
| 2 | D-95, relation narrows D-94 and derives from D-33 | The guide carries removal and mental-check fallback when a corrected dependency cannot clear the advisory. The actual lock uses corrected fast-uri and scoped qs; audit code and refusal tests remain unchanged and pass. The removal condition is not met by the reported audit. |
| 3 | D-77 | `package.json` invokes `scripts/test.py`; its no-argument branch preserves build, the four original Node inputs, the pinned Python runner and foundation check, stopping after a failed stage. Its single-file branch builds for Node, loads only the selected Python module without a build, and omits other stages. Multiple arguments fail. No whole-run time limit is introduced, and the guide still requires the full gate before a request. |
| 4 | focused-test-execution, deriving from D-77 | Validation rejects missing/non-test files; Node requires a successful summary with an executed case, and Python requires a returned successful result with a non-skipped case. Empty, skipped-only, failed/import-error and Python SystemExit cases have real npm-level coverage. The fix closes the review's import/collection bypass without weakening the sentence. |
| 5 | mutation-test-selection, deriving from D-94 | The config lists the 18 current `tests/sim/*.test.mjs` files excluding `rules.test.mjs`; the test compares that list against the directory and has red/green evidence. The existing node-test-selection invariant still requires every Node file in the full gate and is separately verified through actual execution. |
| 6 | stryker-simulation-execution and typescript-nocheck-support, both named by D-94 | The first fact carries the pinned Stryker TAP/node:test support, instrumentation with `// @ts-nocheck`, and one `buildCommand` during initialization; the second carries TypeScript 7.0.2 accepting those files and emitting JavaScript. The recorded real run built once and ran the 18 TAP files successfully. Splitting independently changing publisher editions preserves all accepted clauses, as agreed in C6. |

The six Polish settlement sentences in `author.md` remain accurate and can be used in the request. No settlement is missing or deferred. No accepted wording needs a different meaning or a human question.

## Other entries and changed surfaces

- D-73: the guide has Mutation testing between AI in tests and Flaky tests, its Decision names D-73/D-94/D-95 and Invariant is none; the full/one-file command is in the unit recipe and inherited by integration/smoke. D-77 remains an exception only for the whole-run time limit. Survivor classification, no numeric threshold and mental checks in other parts are present.
- D-83 and node-test-selection: test languages, directories and filenames are retained. The full gate actually ran the new Python tests within its 40 quality cases; the rewritten Node inclusion test passed. No new test is counted solely from its filename.
- D-33, introduced-npm-vulnerabilities and dependency-audit-refusal: the lockfile remains the npm trust boundary, with the unchanged comparison and refusal behavior. The scoped corrected version satisfies the existing policy. The quality pass does not replace or relax that policy.
- D-85: all three named exemplar files are unchanged from base; no alternative exemplar is introduced. The selected occupied-address case was exercised during authoring and still serves its documented limited purpose.
- D-28 through D-32: the gate scripts remain build-tools under its existing deferred code-kind guidance. The new ESLint exclusion applies D-29's existing exclusion of generated temporary results; actual source file patterns, recommended rule sets, inline-configuration prohibition and warning threshold are unchanged. Ruff, ShellCheck and Prettier settings are unchanged. All quality checks pass with the retained Stryker tree present.
- Other entries selected by the initial foundation search concerning application build/serving, browser presentation, simulation, deployment, ports, input refusal, test levels, expectations and deferred exclusions remain consistent: application sources, deployment logic, audit code and exemplar files did not change. The task's deferred twelve findings remain outside this change; this comparison does not declare them repaired.
- Part map build-tools names `stryker.config.json`, already owns the new scripts and quality files through existing globs, and now explicitly describes test-gate and mutation execution. Its dependencies already include simulation and product-foundation. The guide remains agent-workflow; the modified foundation files remain product-foundation. Simulation still computes the game and remains dependency-free; no mutation tool enters its runtime imports. No public application surface, authority or trust boundary was added or changed.
- Generated sandbox, log and report paths are ignored by git. `.stryker-tmp/**` is also excluded from ESLint; `.runs`, `.the-way` and the original `dist` are excluded from Stryker copying. Artifact locations are accurately documented and remain outside the cycle archive.

**Violated marks set or cleared:** none. The three selection/execution invariants remain `Violated: no` with passing checks. The baseline listener error prevents a successful test of its own existing invariant; it is not evidence that the product now violates that invariant and does not justify changing its mark. No new invariant is inferred merely from an implementation detail.

## Outside sources, terminology and choices

The Stryker and compiler facts already record the two source editions on which D-94 rests, with immutable publisher addresses, passages and read dates. The fix review independently checked those sources. No additional such fact was discovered at return.

Node summary and Python import/unittest documentation informed the replaceable execution mechanism; they do not supply a condition of a foundation invariant or a premise whose loss would call D-77's one-file requirement into question. The environment-fact template's “Which facts are written” explicitly distinguishes runner behavior from a fact an invariant rests on. Thus no unattached API-documentation fact is added. The effective npm release-age observation is an installation choice recorded in the cycle, not a new permanent product requirement.

Gate, invariant and standing check retain the pinned process meanings, and the product glossary's simulation terms are not changed. Mutation testing, TAP, test file, sandbox, compiler and reviewer use ordinary tool/process meanings. There is no new product-specific word or use contrary to an existing glossary entry.

Binding choices are already captured in D-77, D-94 and D-95. Python loader mechanics, Node reporter, fixed concurrency, artifact paths and corrected scoped dependency versions are implementation choices documented in author/fix reports; no new post-merge rule was silently inferred from them. Review findings are corrected behavior, not new foundation entries. There is no omitted projected entry, and no entry is proposed for later.

## Checks and limits

Return-step commands ran from `C:/Storage/repos/loop2/.runs/worktrees/mutation-gate`:

| Command | Exit | Result |
|---|---:|---|
| `git rev-parse HEAD` | 0 | Matches reviewed `3bca186aaa955d85dea818017e02deb75ff3965c`. |
| `git status --short` | 0 | Empty tracked status before and after comparison. |
| `git diff --name-only 7012abc..HEAD` | 0 | Changed surfaces match the ownership and scope comparison above. |
| `git diff --quiet 7012abc -- scripts/audit_dependencies.py tests/quality/test_audit_dependencies.py tests/sim/traits.test.mjs tests/http.test.mjs tests/invariants/test_account_server_occupied_address.py src/browser src/server .the-way` | 0 | Audit/refusal code, exemplars, application sources and pinned process unchanged from base. |
| Invariant search below | 0 | All three invariant identifiers and their test cases are present. |

Exact invariant-search command:

```powershell
rg -n 'invariant: (focused-test-execution|mutation-test-selection|node-test-selection)|^    def test_' tests/quality/test_test_gate.py tests/quality/test_mutation_test_selection.py tests/quality/test_node_test_selection.py
```

The following are completed checks supplied by the orchestrator, not rerun by this return step: `npm test` on the reviewed head exited 1, with 343 Node, 5 agent-workflow and 65 deployment tests passing, 168 invariant cases run with only the known Windows CIM listener setUpClass error, and all 40 quality cases passing. The end of `final-gate.log` was read and agrees with those counts and failure. The chained foundation stage did not execute; separately, the orchestrator's `python -B .the-way/elements/common/foundation_check.py` exited 0 with 0 errors, as the return handoff records. The skipped chained stage is not marked PASS.

No tests were rerun and no new product validation result is inferred from a document comparison. The full gate's failure remains explicit. Other-platform execution, exhaustive mutation and the deferred old-test findings remain unchecked as previously reported. There is no UI change.

Required foundation-step paragraph and step 11 were read whole; current foundation entries, relevant map sections, reviewed implementation, fix review and final gate evidence were compared using the previously selected coding/testing guidelines and element methods. No new external research, other product surface or reach beyond this handoff was needed. No code/foundation discrepancy requiring a return-step commit was found.
