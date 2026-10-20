# S6 independent scoped review

Spec compliance: PASS for this slice.
Task quality: Approved.
Range: 2f33b5deb858104729ce8871f653c051740c6c49..efe6849ac267cda475d3d1feb10d56e4c9ec64b7.

## Scope and sources

Read the task reviewer prompt and code-review playbook in full, the task brief, frozen task plus accepted npm amendment, relevant original plan requirements, author handoff/report and complete supplied review package. The package lists exactly five changed files and +333/-151; every requested file has its own corresponding hunk. Reviewed the full diff in sequential chunks, without rerunning Git or any reported test.

Read the complete part map, invariant file and glossary, all decision Scope fields and complete browser-view decision entries (including superseded entries to distinguish the current versions), plus linked icon/licence and ESLint environment facts. Applied `.the-way/product-guidelines/reading.md`: only browser-view is affected, by existing browser-module files. The absent `guidelines/` is an explicit output of the enclosing task (S11), not grounds to wait for that task's own output. D-28 retains deferred disciplines, D-32 requires this formatting, and D-36 makes the selected module structure exemplary rather than mandatory. No styleguide or intended visible change applies. No foundation/check changes occur in this range, so independent foundation-method and deliberate-break acceptance is not this slice's work.

## Strengths

- The five hunks preserve imports, declaration ordering, data, callbacks and branches. app.ts:45 retains clock flushing before a program edit and app.ts:60 retains update gating; clock.ts:1 changes only import quote delimiters. There is no UI framework or dependency change.
- program-editor.ts:43 preserves empty/nonfinite handling, rounding, clamping and negative-zero conversion. Its action/condition edits retain unchanged-choice and missing-resource guards; program-editor.ts:319, :421 and :449 preserve structural edits, conditional fields, row reuse and pending focus. Wrapping expands the file to 471 lines without adding responsibility, duplication or abstraction.
- credits.ts:13 and footer.ts:21 retain credit text, source URLs, authors and ordering. footer.ts:43 keeps new-tab links with `noopener noreferrer`; footer.ts:25 retains the explicit missing-credit failure rather than swallowing it.
- The ignored preservation script checks all five files against the immutable start commit. s6-preservation.mjs:8 compares ordered node kinds, identifier/literal values and children; :29 additionally compares comments and rejects CR bytes. :40, :44 and :47 demonstrate sensitivity to a comment, visible string and edit guard. This supplements the full diff review rather than replacing it.

## Findings

Critical: none.
Important: none.
Minor: none.

No new review thread or correction is requested.

## Concrete risks checked and evidence

1. **Accidental semantic or text change during formatting.** Read every hunk of s6-review-package.txt, the complete ignored preservation script, its complete log and exact-command/exit metadata. Values of labels, resource kinds, credit strings, operators, imports and callbacks match. The script is a structural comparison, not a general proof of language equivalence: it does not serialize every possible AST flag. The independent diff reading covers this slice's actual changes; no uncovered semantic change was found.
2. **A green build that never checks both compilers' configurations.** Focused read of unchanged scripts/build.mjs:11 confirms sequential browser/server compilation via the separate TypeScript compiler alias, inherited output and nonzero failure propagation. Complete s6-typecheck.log and s6-build.log and their JSON metadata both record exit 0. s6-versions.log records API 6.0.2, compiler 7.0.2, Prettier 3.9.10 and npm 12.2.1. Normal npm script notices are invocation output, not diagnostics or warnings.
3. **Pure-helper success being overstated as DOM/browser success.** Read complete tests/view/program-editor.test.mjs and tests/view/icons.test.mjs, as required by the brief. Numeric/edit/resource/focus-target coverage uses concrete values; the footer tests use a fake document and assert complete visible text and link safety. Complete s6-view-tests.log contains 59 pass, 0 failure/cancel/skip/todo, without warnings. This supports existing helper and fake-DOM behavior, not actual browser focus or appearance.
4. **State descriptions or screenshot claims overstated.** Read s6-state-source.log and exact-command metadata and compare anchors with diff. Because the app diff cuts off inside startApp, read only its remaining tail from line 78 to verify panel toggles at :90 and initial mounting at :97. The report's empty/populated, condition/action, numeric, structural-edit and footer cases correspond to preserved code. Clock timing and browser focus are not newly behavior-tested by this review. s6-report.md:65 explicitly records no screenshot, no evidence path and no rendered-appearance/browser-focus verdict, consistently with D-19's undeclared real-browser check. The public deployment address cannot verify this local unpushed slice.
5. **Formatter success reported without exact file scope.** Read prettier.config.mjs (explicit default object), full write/check outputs and JSON metadata. Both commands name exactly the assigned five paths, exit 0, and the check reports all matched files conform. Complete diff-check and commit outputs/metadata are consistent with the scoped range. No rule suppression, frozen-check edit or failure-to-pass conversion appears in the diff.

No new tests were run: none of the reviewed code raised a specific doubt unanswered by the supplied evidence. No product file, index, branch, generated output or test was mutated. Only this named ignored review report was written.

## Declined items and limits carried forward

- Screenshot and actual browser focus remain unchecked, as honestly recorded at s6-report.md:65; the controller must retain this reason in the final request. This is an evidence limit, not a new S6 code defect or route-selection blocker.
- Whole-product lint/format compliance, remaining slices, final product gate, whole-branch review, guideline cases, independent invariant deliberate breaks and foundation acceptance remain later controller work. This scoped approval does not assert their success.
- No browser route was invented, no deployment or network access was used, and no cosmetic divergence from a future exemplar was promoted to a blocking issue.

## Assessment

The slice meets its five-file formatting requirement without identifiable semantic, string or UI-content change, and supplies meaningful preservation and existing behavior evidence. Approved within that scope, with rendered appearance and real browser focus explicitly unverified.
