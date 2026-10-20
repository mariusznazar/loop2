# S7 independent scoped review

## Spec compliance

**Verdict: Spec compliant.** Reviewed `efe6849ac267cda475d3d1feb10d56e4c9ec64b7..1efd0c87134064ec960bb73cc1c461004a482bdc` from the complete supplied review package. The change is confined to the seven assigned browser files: six TypeScript modules and `src/browser/index.html`, +270/-143. It removes only the accepted `centres[index]!` non-null assertion and applies formatting. No configuration, invariant method, dependency, tracked test or foundation entry changes in this slice.

**Cannot verify actual rendering:** no screenshot, viewport rendering, pointer interaction or browser focus observation was performed. This is the explicit no-settled-route case in `.the-way/task-cycle/skill/SKILL.md:322`, consistent with `foundations/decisions.md:561` (D-19). The author records the affected states and limitation at `s7-report.md:58` and `s7-report.md:69`; root must carry the unchecked screenshot into the request. This is an evidence limit, not a product defect found by this review.

## Strengths

- `src/browser/view/terrain-picture.ts:56`: the only non-formatting edit removes the erased postfix assertion. `centres` is produced from `run.tiles` immediately before the same array is mapped, and neither array is changed between those operations. The coordinate expressions, resource ordering, dimming and outline choices remain intact.
- `s7-preservation.mjs:25`: the preservation oracle requires exactly the accepted replacement in the immutable starting text, then exact equality with pinned formatter output for each of the seven current files. It checks LF, parse diagnostics, ordered syntax structure and literal values for all six TS files. `prettier.config.mjs:1` is the empty adopted default configuration, so the helper's formatter invocation has the appropriate options. The supplied diff independently shows the same one-token deletion and formatting-only remainder.
- `s7-preservation.mjs:35` and `s7-preservation.log:8`: cumulative inventory uses the original fork `c379207bfd8bd148d3589ea75604ba5165915d01`, checks every tracked source TS file, requires the per-file removal counts and retained-expression order, and totals sixteen. Counts are hex 12; layout, program, run and terrain-picture one each. `walkTarget(run, action.resource)!` and `tileAt(run.tiles, next)!` remain. The prior S4 exact-edit oracle and final proof substantiate its fifteen deletions; S7 adds precisely the remaining terrain assertion.
- `src/browser/index.html:5` and `s7-preservation.mjs:64`: the meta-tag void closing syntax is HTML-equivalent, body content and whitespace are byte-identical, and the embedded CSS has equal parsed canonical formatting. Inspection of the complete HTML diff preserves selector combinators, rule/declaration order, values, the 720px breakpoint, grid columns, hidden handling, hover colors, nowrap, dimming and outline layering. The helper deliberately detects a changed CSS value and a changed visible label (`s7-preservation.log:15`).
- `src/browser/view/status-row.ts:40`, `src/browser/view/terrain-panel.ts:40`, and `src/browser/view/tile-list.ts:101`: control creation, callbacks, conditional text updates, hover delegation and the icon/name separating space are preserved. No new interaction or manual character action was introduced.

## Issues

### Critical

None.

### Important

None.

### Minor

#### 1. New thread ? correct the unsupported send-target test claim

**Anchor:** `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/s7-report.md:62`

**Ready to paste:** The statement ?Existing send-target tests pass? is not supported by the recorded view run: its 59 test names contain no send-target test, and `tests/view` contains no test reference to `sendTargets`. Please describe the send panel as covered by source inspection and the exact preservation check, retaining the existing note that no real click was observed.

**Why I report this:** This row communicates how the send choices and click dispatch were checked. The captured view suite at `s7-view-tests.log:1` through `s7-view-tests.log:66` tests icons/credits, editor behavior, status text, terrain-picture data and tile-list data; its summary is genuinely 59 passed, none failed/skipped, but those results cannot be attributed to send-target behavior. A focused search of all `tests/view` for `sendTargets|send.target` found no references; the positive control `statusText` finds the actual status tests in `tests/view/status-row.test.mjs`. The consequence is an overstated coverage claim that a later reader could repeat as behavioral test evidence. Correct the report row; adding a new product test is not required for this formatting-only slice. Exact accepted-edit plus formatter equality already covers the unchanged send-panel source at `s7-preservation.log:1`, so this report-only issue does not make the implementation untrustworthy or block progression.

## Concrete risks checked

1. **Unintended executable/literal changes among formatting churn:** read the complete review package once and inspected the preservation helper and its full captured output; all six TS paths have exact formatter equality and AST/literal preservation. No silent error or rule suppression appears in the diff. No routine rerun was needed.
2. **Wrong assertion removed or cumulative inventory overstated:** inspected S7's explicit single replacement, source-wide inventory, exact baseline revision, expected count map, and retained run assertions. Also inspected `s4-preservation.mjs` and `s4-preservation-final.txt` for the earlier fifteen deletions. The cumulative claim is supported without rerunning tests or Git commands.
3. **HTML whitespace/CSS changes alter the screen:** inspected all HTML diff hunks plus shell/body/CSS preservation checks and deliberate-change sensitivity. Only meta-tag slash syntax changes outside CSS; the body is untouched. This supports source preservation; it is not an observed rendering result.
4. **Hover/no-run redraw behavior hidden by a truncated hunk:** the supplied terrain-panel hunk stops inside `update`. As expressly permitted by the review contract, read only the continuation at `src/browser/view/terrain-panel.ts:102`: same-run skip, no-run hover reset, drawing/list refresh and re-marking are retained. No other changed file was reread separately.
5. **Green checks that did not execute the intended compiler/source scope:** inspected complete captured typecheck/build/ESLint/formatter/version/view outputs and the adjacent command/exit JSON. The existing `scripts/build.mjs:11` runs the actual TS7 alias for both browser and server configs and propagates failures; the author used local npm 12.2.1. Captured typecheck, build, whole-source ESLint, seven-path formatting check and preservation commands all exit 0. The view suite records 59 passed, zero failed/skipped. No new validation tests were executed by this reviewer.
6. **Report makes a stronger observation claim than evidence supports:** verified screenshot is explicitly unchecked and D-19 has no declared real-browser method; found the Minor send-target test overclaim above. Code inspection supports unchanged behavior but establishes no rendered appearance.

## Foundation and guideline selection

The seven paths belong to `browser-view` by the complete current part map (`foundations/part_map.md:3`). Read `.the-way/product-guidelines/reading.md` and the common whole-entry selection method. An exhaustive latest-version Scope inspection of all 37 decision identifiers yields these browser-view matches, all read whole: D-03/2 (`decisions.md:509`), D-04/3 (:467), D-06/3 (:767), D-18/1 (:529), D-19/1 (:551), D-21/1 (:604), D-23/1 (:654), D-26/1 (:737), D-27/1 (:787), D-28/1 (:823), D-29/1 (:841), D-30/1 (:857), D-31/1 (:873), D-32/1 (:889), D-36/1 (:957). There were no missing Scope fields or unmatched selected browser-view decisions. Foundation is the supplied current foundation for head 1efd0c8, unchanged by S7.

Read the entire invariants file and product/process glossaries. Expanded to whole linked relevant decisions D-01/1, D-02/1, D-05/3, D-08/1, D-20/1 and D-22/1 and the handoff's D-33/1 npm-pin amendment; read whole relevant Node support, icon licence/credit/title and ESLint/typechecked-set environment facts. The complete part map and current Scope inspection distinguish entries merely discovered from those selected/read. Selected-decision text is kept as local evidence in `s7-review-foundation-selection.txt`.

Searched all five foundation elements for terrain, browser, assertion, whitespace, styleguide, formatting, Prettier, screenshot and running-product concepts; no additional current meaning affecting this formatting-only slice was found. Source search hits with long-line previews were resolved by the full selected-entry reads, not treated as absent. Relevant linked simulation rules are preserved, not redesigned.

Verified `guidelines` is absent by literal filesystem check. This parent task creates the general and browser-module guidelines later (S11), so S7 does not wait for its own task's output. No styleguide state catalogue exists; D-28 defers separate entry-point/HTML exemplars. This slice creates no new code kind. D-36's focus-preserving organization remains an example; nothing in this review elevates it to a new blocking structural rule.

## Declined and outside scope

- No request for broader UI testing, new send-target tests or a new browser route for this mechanical slice. The unsupported report claim needs only an evidence correction.
- No restyling, architecture revision, exemplar rewrite, additional assertions/guards or task expansion. No concrete user defect justifies these here.
- No invariant/configuration changes in S7; final deliberate-break and guideline-case acceptance belong to the later complete-code stage, as assigned by the handoff.
- This is a task-scoped review, not the final whole-branch review, gate or merge assessment. No subagents, source edits, routine check reruns, dependency installs, push or deployment occurred.

## Assessment

**Task quality: Approved.** The bounded one-token edit and exact preservation evidence make the formatting change reviewable; the recorded checks are consistent with the code and intended tool pins. No Critical or Important finding. One nonblocking report-only coverage correction remains, and actual screenshots/rendering/hover/focus remain explicitly unobserved for the stated no-route reason.
