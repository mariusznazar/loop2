## Finding Verdicts

### I-1 — Reject non-terminating PowerShell observation errors — ADDRESSED

**Grade/scope:** Original Important, in scope; existing thread I-1. No downgrade or dismissal. The author accepts the finding; there is no contested finding to adjudicate.

**Anchors:** [test_loop2_one_serving_process.py:72](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/tests/invariants/test_loop2_one_serving_process.py#L72) and [loop2_invariant_support.py:83](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/tests/invariants/loop2_invariant_support.py#L83).

**Ready to paste:** Both process readers now reject nonempty error output before parsing stdout, including the native PowerShell case that exits 0 after a non-terminating CIM error. Independent final-version probes reject that failed partial observation, detect two actual HTTP-serving processes with the unchanged assertion, and accept the baseline and restored healthy observation.

**Why this is addressed:** The invariant's existing one-process sentence and the frozen task's requirement to reject failed observations still govern. A real error stream previously left a partial table usable; the added `or result.stderr.strip()` guard in each reader prevents either process-tree assertions or descendant cleanup from consuming that table. A harmless future diagnostic would also stop the check, a conservative limitation rather than successful evidence from an incomplete read. The query, policy, age/parent filtering, POSIX paths and actual process-count assertion are unchanged. Deterministic exit-0 regressions are present in [test_process_observation.py:26](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/tests/quality/test_process_observation.py#L26) and [test_invariant_support.py:128](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/tests/quality/test_invariant_support.py#L128); the native error/healthy cases start at [test_process_observation.py:32](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/tests/quality/test_process_observation.py#L32) and [test_process_observation.py:58](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/tests/quality/test_process_observation.py#L58). These are meaningful failure-path cases, and successful fixtures now have empty stderr rather than the helper's old unconditional failure text.

**Independent native acceptance:** Executed the separately written [reviewer probe](final-fix-recheck-native.py) against the final task methods, using only owned processes and ephemeral ports in ignored scratch. It imports the actual current functions and invokes the actual unchanged process-count assertion; it does not substitute a mock process table or CompletedProcess. The only assertion adaptation is the expected port in memory, matching the ephemeral parent listener. The other four invariant assertions are covered by the author's retained actual product run, not claimed as independently executed by this probe.

1. A single real Node HTTP listener was accepted by the actual process-count assertion.
2. Its real child HTTP listener was started. Parent PID 1016/port 52403 and child PID 52020/port 52425 each answered HTTP 200 with distinct expected bodies. A healthy native table made the actual assertion reject the second server at port 52425. The actual cleanup descendant reader also retained the child.
3. For each reader, the real installed PowerShell executed the reader's formatting pipeline over a real CIM query that deliberately omitted PID 52020, followed by `Get-CimInstance RecheckMissingCimClass`. Each native command exited **0**, supplied nonempty partial stdout and a real `Get-CimInstance : Invalid class` diagnostic. Both final readers raised `Get-CimInstance failed` before the partial observation could be accepted. The probe explicitly asserts the omitted child is absent from native stdout; this exercises the original false-pass condition rather than an unrelated nonzero failure.
4. After removing the injected error and ending the owned child, the actual process-count assertion accepted the restored single server. The actual cleanup descendant reader then contained no child. The parent was terminated with taskkill directed only at its owned PID/tree.

**Exact independent execution evidence:** Outer argv/cwd/exit and byte-exact captured streams are in [final-fix-recheck-native.json](final-fix-recheck-native.json), exit **0**. The [complete outer stdout/stderr](final-fix-recheck-native.log) records each acceptance/rejection. Every real native requested/executed argv, exit, full stdout and stderr is in [final-fix-recheck-native-calls.json](final-fix-recheck-native-calls.json); base64 streams preserve exact bytes alongside readable decoding. Healthy process reads, listener reads, both exit-0 errors, owned Node parent and cleanup are included. No natural frequency of CIM failure is asserted.

### I-2 — Remove overlapping ownership of the dependency fixture files — ADDRESSED

**Grade/scope:** Original Important, in scope; existing thread I-2. No downgrade or dismissal. The author accepts the finding; there is no contested finding to adjudicate.

**Anchor:** [part_map.md:68](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/foundations/part_map.md#L68), with the second corrected pattern at line 69 and the existing tests/quality assignment at line 73.

**Ready to paste:** The two root manifest patterns are now `/package.json` and `/package-lock.json`, so the nested fixture companions are claimed only by `tests/quality/**`. The actual pinned map guard passes, and independent inspection through its real Git matcher and the product's real dependency collection confirms that all four manifests/locks remain owned exactly once and remain in audit scope.

**Why this is addressed:** Root anchoring removes the two duplicate pattern claims without transferring ownership or omitting the fixture. The actual pinned `guard.check_files` returned exactly `[build-tools]` once for each of `package.json`, `package-lock.json`, `tests/quality/fixtures/dependency-audit/package.json` and `tests/quality/fixtures/dependency-audit/package-lock.json`. The product's unchanged real `discover_files(root, ('build-tools',))` selected all four; actual [check_dependencies.py:167](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/scripts/check_dependencies.py#L167) `_collect` consumed their real JSON and produced **332** distinct package/version pairs and **694** dependency requirements, retaining the fixture's `minimist` 1.2.8 pair. This independently checks the weakest point of narrowing the map: nested audit coverage has not disappeared. Collection was not mocked, and no network verdict is inferred from this collection-only probe. The author's retained live audit separately supplies actual service evidence.

**Exact independent map-guard invocation:** `[python.exe, -B, .the-way/elements/part-map/format_guard.py, foundations/part_map.md, --base, c379207bfd8bd148d3589ea75604ba5165915d01]` from the task root; actual exit **0**. The executable's full absolute argv/cwd, exact stream bytes and exit are in [final-fix-recheck-map.json](final-fix-recheck-map.json), and [full stdout/stderr](final-fix-recheck-map.log). It reports **0 errors, 2 warnings, 1 unchecked**: build-tools and deployment criticality warnings remain; inter-part dependency graph agreement remains unchecked because no product command reports it. These are preserved limitations, not duplicate-ownership errors or a claimed graph pass.

**Exact independent ownership/collection evidence:** [final-fix-recheck-map-collection.json](final-fix-recheck-map-collection.json) gives all four claims, all four selected paths and actual collection counts; exit **0**. The complete Python stdin source, outer argv, complete stdout and empty stderr are retained in [final-fix-recheck-map-collection-source.txt](final-fix-recheck-map-collection-source.txt). Both guard and collection use the unchanged pinned checker/product code; temporary matcher files were restricted to ignored `.runs/final-fix-recheck`.

## New Breakage

**None.** Reviewed the supplied complete fix package once, covering the exact range **e31f6a4051f33b832cb8603d67e815240af5464f..ef057111b09f0b081e1c9c1dd61678bb29040a07**, one commit, five changed files, 61 additions and 6 removals. The changes are two pre-parse error guards, two root pattern anchors, two deterministic regressions, two native integration tests and the fixture helper's explicit stderr argument/default. No invariant sentence, method CLI, covered application/configuration code or pinned process checker changes. Scope was findings I-1/I-2 plus breakage introduced by this fix, not another whole-branch review.

**Review authority/selection check:** Read the complete scoped review handoff, required code-review playbook and Superpowers 6.4.1 re-review prompt, frozen task together with its npm 12.2.1 amendment, applicable final-fix handoff, final author report and original final-review report. Read the complete current part map, invariants, glossary and applicable whole decision/fact entries, including the one-process policy, shared package, D-28 deferrals, D-30 Python rules and D-33 complete audit reach. Inspected the current decision scopes, all five guideline headers/reading conditions and full kind index, and read the selected general [guidelines/coding.md](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/guidelines/coding.md) whole. The Python observation methods/tests and map correction affect account-server, build-tools and product-foundation; no indexed application kind's condition matches. No new kind selection or discrepancy is needed. The supplied pin is d829e3aa6242a9b8901274531dd82fd5c7d87628; original audit fork is c379207bfd8bd148d3589ea75604ba5165915d01. No external alternate process checkout was substituted.

**Existing exact author test evidence inspected, without rerunning suites:**

| Covering run | Actual retained result | Full output and exact argv/exit |
|---|---|---|
| Complete quality suite, including added regressions | 131 passed, no skips; exit 0 | [output](final-fix-quality.log), [metadata](final-fix-quality.log.json) |
| Process observation focused suite | 11 passed; native healthy/error tests actually run; exit 0 | [output](final-fix-green-process.log), [metadata](final-fix-green-process.log.json) |
| Invariant support focused suite | 9 passed, including known-main-process cleanup after observation failure; exit 0 | [output](final-fix-green-support.log), [metadata](final-fix-green-support.log.json) |
| Actual one-serving-process invariant | 5 passed; exit 0 | [output](final-fix-serving.log), [metadata](final-fix-serving.log.json) |
| Actual API error invariant | 2 passed; exit 0 | [output](final-fix-api.log), [metadata](final-fix-api.log.json) |
| Ruff | pass record, exit 0 | [output](final-fix-ruff.log), [metadata](final-fix-ruff.log.json) |
| npm test/build | 173 application tests passed, no skips; exit 0 | [output](final-fix-npm-test.log), [metadata](final-fix-npm-test.log.json) |
| Actual live audit with current ownership, original fork, npm 12.2.1 | actual collection contains four files; actual compare/match bridge returns success; exit 0 | [output](final-fix-ownership-audit-retry.log), [metadata](final-fix-ownership-audit-retry.log.json) |

**Acceptance retained:** The unchanged 13 guideline good/bad pairs and other unchanged deliberate-break methods retain their final-review acceptance. Their source cases, covered code and observation policy were not changed; the affected process method was independently reaccepted above, and affected manifest routing was independently checked through real map/collection. This review does not claim a new execution of all pairs. The author also retains successful form and merge-reference outputs; form-only output explicitly distinguishes an unrun merge comparison from the separately passing merge-reference run.

**Failed/unchecked outcomes preserved:** The author retains expected failing old-code red runs and one ownership-evidence wrapper UnicodeEncodeError before the corrected successful retry; these are not relabeled product passes. No independent live advisory query, native POSIX run, rendered browser behavior or whole root gate was performed here. The native probe checks process-count mechanics rather than the full HTTP/Express sentence by itself; the retained five actual invariant tests supply the product success evidence. The two map warnings and missing dependency-graph comparison remain. The independent assessor is distinct from the final method-fix author and makes no covered-code changes. All reviewer writes are ignored report/scratch files; no product/index/HEAD mutation, bytecode cleanup, helper agent, 10x read, push, merge, deployment, return step or foundation assessment was performed.

## Out-of-Scope Observations

**No new observation.** The four original nonblocking Minor findings remain unresolved and deferred; their full original text and final whole-branch judgments follow unchanged as carried material, not new scoped findings or a second reassessment. No fix is authorized or made by this reviewer.

Original source: [s1-resume-review.md](s1-resume-review.md#L31).

### Minor — state the development toolchain's minimum Node 24 release

**Thread:** new.

**Anchor:** [README.md:19](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/README.md#L19); supporting dependency constraint: [package-lock.json:2186](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/package-lock.json#L2186).

**Do wklejenia:** The new setup paragraph should state that the pinned development tools require Node 24.15.0 or newer within the Node 24 line. npm 12.2.1 declares `^24.15.0` support, whereas the README's existing `24.x` requirement also admits older Node 24 installations, leaving a contributor following the setup instructions with an unsupported local npm.

**Dlaczego to zgłaszam:** The README helps a contributor choose a runtime before installing the quality tools. S1 introduces npm 12.2.1, whose lock entry explicitly requires `^22.22.2 || ^24.15.0 || >=26.0.0`; the product requires Node 24, so the relevant minimum is 24.15.0. For example, Node 24.14.0 satisfies the README's stated `24.x` requirement but does not satisfy this new development dependency. That mismatch can yield engine warnings, or installation refusal where engine-strict is enabled, before the contributor reaches the documented checks. Document the development minimum in this setup section while retaining the accepted npm pin. This is Minor because the retained execution uses supported Node 24.17.0, no tested installation/build is broken, and I did not reproduce failure on an older Node release. The application's existing major-version runtime policy need not be broadened or otherwise redesigned to fix this wording.

**Final independent judgment:** Minor retained, in scope documentation. Independently verified README still states Node 24.x and the actual npm 12.2.1 lock entry requires ^24.15.0 within that major. This is a concrete setup-description mismatch, not evidence of a failed tested install. No older-runtime installation was performed. Leaving it unchanged can confuse contributors; a minimum-version clarification costs only prose. It does not change the accepted tool pin.

Original source: [s2-review.md](s2-review.md#L31).

### Minor — installation output contains a pip update notice (new observation)

**Anchor:** `.runs/task-cycles/coding-guidelines/reports/s2-install.txt:10`.

**Do wklejenia:** The successful installation output includes pip's update notice. For quieter future captured installations, `--disable-pip-version-check` can suppress that notice without changing the pinned tool versions.

**Dlaczego to zglaszam:** The review contract asks that reported output noise be recorded. Installation is successful and the notice concerns pip 25.3 versus 26.2.1, not Ruff or ShellCheck; it does not undermine a test or version result and is not a reason to update pip or block this slice. The offline installation evidence already uses the flag and is quiet. Leaving this as-is costs only incidental output; using the flag costs one installation option. No product change is required for approval.

**Final independent judgment:** Minor retained only as an evidence-output note, not a code defect or approval blocker. The complete installation log really records success followed by the pip 25.3-to-26.2.1 notice; the pinned tool results are unaffected. Leaving it costs a little output noise; the optional installation flag is the only proposed cost. No pip upgrade is warranted.

Original source: [s7-review.md](s7-review.md#L27).

### Minor

#### 1. New thread ? correct the unsupported send-target test claim

**Anchor:** `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/s7-report.md:62`

**Ready to paste:** The statement ?Existing send-target tests pass? is not supported by the recorded view run: its 59 test names contain no send-target test, and `tests/view` contains no test reference to `sendTargets`. Please describe the send panel as covered by source inspection and the exact preservation check, retaining the existing note that no real click was observed.

**Why I report this:** This row communicates how the send choices and click dispatch were checked. The captured view suite at `s7-view-tests.log:1` through `s7-view-tests.log:66` tests icons/credits, editor behavior, status text, terrain-picture data and tile-list data; its summary is genuinely 59 passed, none failed/skipped, but those results cannot be attributed to send-target behavior. A focused search of all `tests/view` for `sendTargets|send.target` found no references; the positive control `statusText` finds the actual status tests in `tests/view/status-row.test.mjs`. The consequence is an overstated coverage claim that a later reader could repeat as behavioral test evidence. Correct the report row; adding a new product test is not required for this formatting-only slice. Exact accepted-edit plus formatter equality already covers the unchanged send-panel source at `s7-preservation.log:1`, so this report-only issue does not make the implementation untrustworthy or block progression.

**Final independent judgment:** Minor retained, report-only. Independently searched current tests/view: sendTargets and send.target have no hits, while the statusText positive control finds actual tests. The independent complete-source preservation proof covers send-panel.ts, but neither it nor the passing 59-view-test claim proves an observed send click. The original report overclaims coverage. Leaving it risks repeating that overclaim; correcting the evidence description is sufficient, without new product tests or browser work.

Original source: [s12-review.md](s12-review.md#L25).

### Minor — new instruction-scan noise (new thread, nonblocking)

**Anchor:** `guidelines/coding.md:31` (unchanged content newly reached through `AGENTS.md:6`).

**To paste:** The new pointer makes the instruction checker inspect the guidelines and report `@eslint/js` as a missing file import. This is an npm package name, so the warning is misleading; consider formatting this package name as inline code in the guideline's owning scope to keep future instruction scans clearer.

**Why report this:** The scanner is intended to expose broken instruction routes. Its `pointed_files` function (`.the-way/instruction-files/check_instructions.py:568`) follows Markdown paths in root instruction backticks, and `check_file` (`:507-535`) scans non-code prose for `@` imports. The ordinary package reference in the guideline therefore matches `AT_IMPORT` (`:60`) and cannot resolve as a local file. The before/after logs show ten baseline warnings becoming eleven with precisely this additional diagnostic. Its concrete effect is one recurring false missing-import warning that a maintainer must distinguish from real broken instructions; it does not break code, prevent the guideline read or fail this checker, whose exit at `:724` depends only on errors. S12 uses a backtick pointer rather than an import, so this warning does not demonstrate that the general guideline or package is loaded as an unconditional instruction import. No fresh runtime loading experiment was performed. This is a Minor evidence-quality issue, not a reason to block the required pointer or weaken/change the frozen checker. A prose-format correction would belong to the guideline's owning scope, subject to the controller's scope decision; no product fix was made here.

**Final independent judgment:** Minor retained, in scope guideline prose. The final root instruction scan independently records the precise @eslint/js missing-import warning and exits 0. The package token is not a missing instruction file. Leaving it keeps a recurring false warning; inline-code formatting can clarify the intended package reference. No measured failure to load or follow the real conditional pointer is established.

## Fix-round verdict

**All findings addressed, no new Critical/Important breakage.** I-1 and I-2 are ADDRESSED for e31f6a4051f33b832cb8603d67e815240af5464f..ef057111b09f0b081e1c9c1dd61678bb29040a07. No open Critical/Important finding. Four original nonblocking Minors remain deferred: development minimum Node 24 version wording, pip update output notice, unsupported send-target test claim and false instruction-scan package warning. This is scoped fix-round acceptance only; no next-stage work is entered.
