# Assessment-settlement independent scoped review

## Spec compliance

**Spec compliance: Spec compliant. Task quality: Approved.** No new Critical, Important or Minor finding in this scoped range. No blocking finding requires the permitted correction/re-review round.

- Range: `52bd7f7f1608774113cdc3039a9e49b51e87bc97..712117b84b20dca607c160964c7b85440759f74b`.
- Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`.
- Scope: later code/document review of the settlement of FA-1 and FA-2 from the single completed independent foundation assessment; not another foundation assessment or another whole-branch review.
- Diff: complete supplied `.superpowers/sdd/plan/assessment-settlement-review-package.txt`, read once: exactly three tracked documents, 9 additions and 10 removals. The operational addition to ignored cycle `plan.md` was also read as an assigned deliverable.
- Authority: complete scoped review handoff including its appended boundary; settlement handoff and author report; both original remarks in `reports/foundation-assessment.md`; frozen task, including complete Q8/Q9 and settlement 1, all 22 rows and npm12 amendment; complete current execution plan; root C35/C36 in settlement handoff and `cycle.md:326`. Required code-review playbook and Superpowers 6.4.1 task-reviewer prompt were read whole.

All product-relative paths below resolve under the worktree above. Evidence paths resolve under its `.runs/task-cycles/coding-guidelines/reports/` directory unless stated otherwise.

## Guideline and foundation selection

Verified the selection against actual changed work before relying on it. The map change affects build-tools/product-foundation; the D-28 discipline covers the six code parts; guideline prose belongs to agent-workflow. Read `.the-way/product-guidelines/reading.md`, the complete current map and general `guidelines/coding.md`, all five guideline headers/reading conditions and the complete four-row kind index. Selected general coding.md. None of the four kind conditions matches changing foundation/guideline prose: no content-data, simulation-module, browser-module or HTTP-application source changes. No malformed/missing header, broken kind-index destination or uncertain condition was found. The initial broad handoff mentions the earlier S11/S12 reading sets; its appended settlement boundary correctly narrows this review to general coding.md. No expansion is needed for this range and no rule is waived.

Read the whole current foundation: decisions, invariants, environment facts, glossary and part map. Long environment-fact source lines were reread after output truncation. Read changed foundation/guideline documents beyond the diff because the handoff expressly requires complete current applicable sources; this is not a second scan for unrelated implementation defects. Relevant pinned decision Plan test/version rules and part-map dependency semantics were inspected against the two named risks. No source contradiction requiring a new policy or glossary entry was found.

## Strengths and settlement judgments

### FA-1: addressed within scope

`foundations/part_map.md:85` adds only build-tools -> product-foundation. The dependency is real: `scripts/quality_support.py:69` reads the current map in `_part_patterns`, called by `discover_files` at line 109; `scripts/check_dependencies.py:101` reads the fork-point map through `_snapshot`, then applies ownership discovery. The handoff's `_base_files` name is inaccurate, but the author explicitly identifies the actual `_snapshot` function and records the correct mechanism. The map assigns scripts/** to build-tools and foundations/** to product-foundation. The pinned map template defines Depends on as allowed dependencies, so a data read belongs here even without a conventional module import.

Keeping the earlier map would leave this actual relationship undeclared. Recording one relationship costs no runtime machinery; replacing discovery with another scope catalogue would duplicate ownership policy. No responsibility, ownership, trust boundary, failure mode or separation is changed by this hunk. This fixes FA-1 without claiming that a missing product graph reporter has become checked.

### FA-2: addressed without losing the human settlement

`foundations/decisions.md:825` replaces only the second binding sentence with: “For the adopted linters, full-compliance source invariants apply without a transitional per-file no-regression invariant.” This preserves the enduring choice for these adopted tools. The first and final sentences preserve all deferrals, first-implementation exemplar choices, comparison requirement, whole-code coverage and test example. The Verification example at line 833 describes the lasting state; the violating example still excludes transition debt without a new decision. Rationale/Rejected retain the useful maintenance tradeoff without introduction timing.

The frozen Q8 explicitly accepts complete removal of blocking violations before this merge, no transition check, and return to a decision if repairs exceed accepted task scope. Cycle `plan.md:9` now carries both execution conditions in full. It also states why settlement 1 is split between enduring D-28 and this execution record. The original frozen task and amendment remain intact. This destination split faithfully preserves settlement 1 rather than reinterpreting it as a permanent rule for every future tool introduction. Keeping the old second sentence would send future readers looking for a completed task's accepted scope; dropping its execution conditions entirely would waive the human settlement. The adopted split costs one operational paragraph and one dependent reference update.

`guidelines/coding.md:311` retains lasting deferrals and whole accepted code scope, and replaces only task-specific introduction/repair conditions with the matching full-compliance/no-transition description. It does not silently remove an applicable source rule: D-29 through D-33 and invariant sentences at `foundations/invariants.md:390` onward remain intact.

D-28 remains /1 with Change new decision, consistent with editing an unmerged entry absent at the original fork rather than inventing a later merged version. The fingerprint changes from `719c9a67` to `550e88d6`; the sole dependent at `guidelines/coding.md:10` is updated with matching text. The inspected proof uses the pinned fingerprint function and enumerates both foundation/guideline reference populations; captured current/merge-reference guards pass. No stale dependent reference was found.

## Coverage retained

Compared the frozen settlement rows with actual complete current entries and the plan, rather than treating the author's row counter as semantic proof. The exact three-file diff leaves rows 2–22 unchanged; row 1 is deliberately split as described above.

| Frozen rows | Current destinations | Scoped result |
|---|---|---|
| 1 | decisions.md:823, guideline deferrals, cycle plan.md:9 | Lasting choice plus both one-time execution conditions retained. |
| 2–6 | decisions.md:841,857,873,889,905 | ESLint/API6/compiler7, Ruff393/14, ShellCheck defaults/severities, Prettier/LF and amended npm12.2.1/exact original-fork low+ audit unchanged. |
| 7–10 | decisions.md:921,939,957,975 | Four exemplars and explicit boundary between example and obligation unchanged. |
| 11–14 | environment_facts.md:138,146,154,162 | Four complete release-composition facts unchanged; TODO Methods remain unchecked. |
| 15–20 | invariants.md:390,400,410,420,430,440 | Source/configuration/format/audit sentences, Methods, Parts and bindings unchanged. |
| 21–22 | invariants.md:450,460 | Exact copied form/reference sentences and pinned Methods unchanged; D-28 dependent updated. |

The plan still names all 22 rows in order and retains every unit/dependency. No new invariant, check algorithm, executable source, adopted rule set, configuration or lockfile changes. Recorded independent check-author identities remain distinct from covered-code/configuration authors (`cycle.md:22`); this prose settlement assigns no covered implementation to a check author.

## Evidence inspected and concrete risks checked

This reviewer ran no tests, guards, helpers, process/port probes or container commands. Manual checks by this reviewer used source/diff/evidence reading; test command/exit fields are not applicable to those manual checks. No suite was rerun just to reproduce existing evidence. The following actual author command/exit records and complete outputs were inspected, including `.log.json` command metadata for every row; this is reviewed evidence, not new reviewer execution.

| Existing captured command (repository root) | Exit / observed result | Complete output |
|---|---|---|
| `python -B .runs/task-cycles/coding-guidelines/reports/assessment-settlement-proof.py` | 0 | assessment-settlement-proof.log |
| `python -B .the-way/elements/decisions/format_guard.py foundations/decisions.md --base c379207bfd8bd148d3589ea75604ba5165915d01 --merge-onto c379207bfd8bd148d3589ea75604ba5165915d01` | 0; 0 errors/warnings/unchecked | assessment-settlement-decisions.log |
| `python -B .the-way/elements/part-map/format_guard.py foundations/part_map.md --base c379207bfd8bd148d3589ea75604ba5165915d01` | 0; 2 warnings, 1 unchecked, not a pristine global pass | assessment-settlement-part-map.log |
| `python -B .the-way/product-guidelines/form_check.py` | 0; form checks pass, merge comparison expressly unrun here | assessment-settlement-guidelines-form.log |
| `python -B .the-way/product-guidelines/form_check.py --merge-onto c379207bfd8bd148d3589ea75604ba5165915d01` | 0; current/merged references and form pass | assessment-settlement-guidelines-reference.log |
| `git diff --check` | 0; existing LF-to-CRLF checkout notice retained | assessment-settlement-diff-check.log |
| `python -B .runs/task-cycles/coding-guidelines/reports/return-collision-search.py` | 0; complete heading results read alongside complete foundation | assessment-settlement-collision.log |

1. **Losing an approved condition while simplifying D-28.** Compared complete original Q8/Q9/row 1 with replacement sentence, full new operational paragraph, current plan and guideline hunk. Both conditions remain concrete for this PR; no unapproved general future rollout rule appears.
2. **A relationship invented from an import-only model.** Inspected the actual two map-read functions and call to discovery, plus complete map and pinned Depends on definition. These inputs demonstrably govern check scope.
3. **Hidden weakening through map propagation or ownership.** Inspected the complete preservation proof and output, not just its success code. It parses original fork, assessed start and settled maps through the pinned guard; all seven computed levels stay high, delta empty. It compares actual Git matcher ownership for all 178 tracked paths, and all map fields/binding text except the one dependency; ownership is identical. Adding this unseparated relationship cannot lower a criticality in the reviewed maps. The existing graph comparison remains unchecked.
4. **Stale fingerprint or outdated dependent wording.** Inspected exact binding substitution, pinned fingerprint call, entire incoming-reference search population, actual guideline changes and captured merge-reference guard. The only dependent carries 550e88d6. Scope does not require inventing an invariant deriving from D-28.
5. **Prior acceptance invalidated by concealed code/case changes.** The supplied committed diff contains only these three prose documents; inspected proof checks all other tracked paths unchanged against the assessed start and compares all 26 good/bad blocks exactly. Read prior final-review acceptance and final-fix/return-citation acceptance chain: 13 separate actual good/bad pairs and 15 independent deliberate breaks, with affected native process methods separately reaccepted after the one final fix. No algorithm, invariant sentence, executable/config source or case block changes here. Their earlier acceptance remains applicable under this bounded preservation argument; this review does not claim fresh execution, a fresh external advisory result or another independent assessment.

## Issues and declined scope

**Critical: none. Important: none. New Minor: none.** No new user-visible appearance change exists in the reviewed range; no screenshot or visual acceptance is claimed. No rule weakening or silent successful verdict is introduced.

Existing part-map output at part_map.md:85 and :134 warns that account-server's computed high exceeds its own failure-mode level through unseparated dependencies. These are disclosed unchanged propagation facts, not a newly introduced incorrect result. No product command reports an actual dependency graph, so the dependency/violation comparison remains unchecked. Four new release-fact Methods remain TODO. This review neither turns those limits into passes nor adds an unrelated graph/fact implementation.

Declined: another foundation assessment; another whole-branch review; new invariant/check design; rerunning unchanged cases/breaks or broad suites; native POSIX/browser validation; live advisory/installation work; processes, ports, containers or external writes; next-stage work and fixes. Root owns the current settled-head full gate. An earlier run at the assessed start is intermediate after these document changes; no final integration verdict is issued here.

Four previously graded Minor findings remain unresolved and unchanged, outside this settlement's fix scope: development minimum Node version wording, pip update notice, unsupported send-target test claim and instruction-scan package warning. Their complete original words and prior independent judgments are carried below without new grading or shortening. No new correction of those entries is authorized by this review.

## Read-only boundary and final assessment

Only this named ignored report was written. No product file, index, HEAD, branch, process, container, helper agent, fixture, global configuration or vault source was changed. No git inspection was rerun after reading the supplied review package. Failed initial navigation to author-contract.md and a Windows literal-wildcard rg argument were corrected by locating the existing reports contract and `rg -g`; they are not test evidence. No prohibited 10x source was read.

**Final spec compliance: Spec compliant. Final task quality: Approved. Scope: assessment-settlement range only. New unresolved findings: none.** The existing four deferred Minors and disclosed evidence limits remain for root's final reconciliation; full-gate currency remains root's responsibility.

## Carried deferred findings (unchanged)

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

