# S9 independent scoped review

## Spec compliance

**Spec compliance: PASS.** Reviewed range `6bdc613d5fe8a0eb7fbdc51501d956009ea8eb9d..8f5657458c12fd16c58ad6abc282a025c15f134b` against `.superpowers/sdd/plan/task-9-brief.md`. All ten named simulation test files have their required formatting hunk, and no other product file appears in the supplied full diff. No missing, extra or misunderstood S9 requirement found.

File-by-file scope verification (anchors in the full review package `.superpowers/sdd/plan/s9-review-package.txt`): actions:13, data:465, flow:781, hex:975, layout:1172, program:1355, purity:1559, random:1688, rules:1781, time:2251. Each is quote/layout/parenthesis/trailing-comma formatting; fixtures, assertion operations, expected values, descriptions and statement order are preserved. The package was read fully in bounded ranges after the first combined display truncated; no truncated output was treated as complete evidence.

## Strengths

- The change stays sharply within the authorized ten files. In particular the exact layout golden numbers and stock order remain present (review package:1305), and time boundary/invalid-value assertions remain intact (review package:2300 onward).
- The risky scanner implementation and its adversarial string fixtures retain their literal values, regexes, branches and control tests while becoming easier to follow (review package:1853 onward). No weakening directive, skip or swallowed error was introduced.
- Preservation evidence is stronger than a passing suite alone: `reports/s9-preservation.mjs:9` retains syntax kinds, literal text and identifier text; `:22` compares all ten files against the actual base and exact configured Prettier output and rejects CR bytes. The four controls at `:31` through `:34` demonstrate detection of changed input, expected output, assertion operation and test description.

## Issues

### Critical

None.

### Important

None.

### Minor

None.

## Selection and applicable foundation

Read the complete part map and verified that the changed paths belong to simulation: existing Node tests, not simulation-module/content-data production files and not a UI change. Read the current decision Scope entries and applicable whole decisions D-04/3, D-06/3, D-18/1, D-20/1 through D-32/1, D-34/1 and D-35/1, the applicable simulation/every invariants and product glossary. D-19 concerns the browser only. The current D-33 npm pin is 12.2.1; the historical frozen task's original npm wording is not authority to revert it.

Followed `.the-way/product-guidelines/reading.md`. A direct directory existence check confirms that `guidelines/` is absent at this review. This is the known output of the enclosing coding-guidelines task, to be authored in S11, rather than an S9 omission or inferred waiver. D-28 (`foundations/decisions.md:823`) explicitly defers a formal test kind and retains time.test.mjs as an example. D-32 (`foundations/decisions.md:889`) requires these existing tests to receive the adopted formatting with no historical exception. No selected guideline file exists to read; no additional exemplar obligation was inferred from the production module kinds.

## Concrete risks checked and evidence

All report/evidence references below are relative to `.runs/task-cycles/coding-guidelines/`.

1. **Accidental test weakening hidden in formatting churn.** Read the full before/after diff, including assertions, fixtures, regexes and template contents. Read `reports/s9-preservation.mjs` and complete `reports/s9-preservation.log` plus its command metadata. All ten normalized trees and literal values match; all ten equal the formatter's output for the base; all ten are LF. The four in-memory negative comparisons succeed. Parentheses are normalized and source metadata omitted by this helper, but exact formatter-output equality bounds those omissions; I do not claim it is an independently implemented semantic proof.
2. **Tests silently omitted or warnings hidden by a successful exit.** Read complete `reports/s9-tests.log` and `.log.json`: exact argv is `node --test tests/sim/*.test.mjs`, exit 0, 103 tests, 103 pass, zero failed/cancelled/skipped/todo, with named results from all ten files. No warning or unexplained stderr appears. Existing real behavior and scanner positive controls remain exercised.
3. **Stale compiled code or formatter scope mismatch.** Read complete build and formatter logs and metadata. `cmd /d /c npm run build` exited 0 and invokes `node scripts/build.mjs`; local Prettier `--write` and `--check` explicitly name the same ten required paths and exit 0. Read the unchanged explicit `prettier.config.mjs` (`export default {};`), consistent with D-32 default nonexperimental options. Preservation records Prettier 3.9.10, TypeScript API 6.0.2, compiler 7.0.2 and npm 12.2.1. `reports/s9-diff-check.log` is empty with captured exit 0.

No validation command was rerun: the existing full captured outputs and source comparison resolve the risks raised by this formatting-only slice. Review commands only read supplied files, selected foundation and the unchanged configuration; only this ignored review file was written. No product/index/branch edits and no subagents.

## Declined and out of scope

- No new tests were requested or needed for unchanged behavior; a new test mirroring the existing code would add maintenance without testing an S9 behavior change.
- No UI screenshots, new test exemplar rules, scanner redesign or unrelated test cleanup: this slice only formats existing simulation tests.
- Full invariant methods, ESLint configuration acceptance, guideline cases and deliberate-break acceptance remain the controller's later complete-product checks. This review does not claim a whole-branch or merge verdict.

## Assessment

**Task quality: Approved.** The complete diff and captured tests support the formatting-only claim, and preservation evidence specifically checks the values and operations that could otherwise weaken these tests. No unresolved S9 concern was found.
