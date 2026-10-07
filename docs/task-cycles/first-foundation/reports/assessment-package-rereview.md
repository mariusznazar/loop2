# Spec Compliance

**Spec compliant.** Both Important findings from the independent package review are resolved in immutable range `53621c5490f838630ffa89857f0812dbc48ce478..237c137e6769569631f2e1252d3bc960633816be`. The independently created valid bullet tooling control is now GREEN; the overlapping application/tool ownership mutation is now RED with the two owners named.

HEAD was verified as `237c137e6769569631f2e1252d3bc960633816be`. This is a correction review of the two previous findings, not a new whole-branch review. The original review's pinned WAY-69, Superpowers 6.4.1 task-review criteria and code-review playbook apply.

# Strengths

- `tests/invariants/test_application_package_layout.py:33-34` restores the pinned map guard's optional `- ` prefix normalization. The exact previously failing compliant tooling fixture passes without changing the product check or fixture ownership.
- `tests/invariants/test_application_package_layout.py:36,42,50-58` gives each part a separate Git attribute and rejects more than one part claiming a path. A later tooling claim can no longer erase an application claim.
- `tests/invariants/test_application_package_layout.py:50,93-95` retains explicit `unspecified` ownership for unmatched paths and the actionable classification diagnostic for unowned/new parts.

# Issues

## Critical

None.

## Important

None remaining in this correction scope.

## Minor

None.

# Repeated independent cases

Executed the unchanged focused product test against the retained independently authored disposable cases, with the support root and file listing pointed at each case. The runner and all temporary attribute files remain below ignored `.runs`. No build/server process was started and port 3000 was unused.

| Case | Before correction | After correction | Observed diagnostic |
|---|---|---|---|
| Valid `- tools/review/**` pattern assigned to build-tools | RED, false positive | GREEN | One test passes. |
| `src/server/extra/main.ts` and its nested manifest claimed by account-server and build-tools | GREEN, focused false pass | RED | `src/server/extra/main.ts has overlapping part owners: account-server, build-tools` |
| Baseline | GREEN | GREEN | One test passes. |
| Full Vite browser package, separate new part | RED | RED | Names `rogue-browser` and asks to classify the separate package. |
| Unknown tooling part with its own package | RED | RED | Names `review-tool` and asks to classify it. |
| Unowned browser package/source | RED | RED | Names owner `unspecified` and asks to classify it. |

The Vite and unknown-tool disposable maps now use `/package.json` for the root manifest claim so their expected failure is classification, not a cross-part claim caused by the original basename pattern. The bullet control already had that anchoring when it established the initial false positive; its pinned map guard result was 0 errors and 0 warnings, with four explicitly unchecked items appropriate to the disposable repository. These are fixture corrections only.

Evidence: `C:/Storage/repos/loop2-first-foundation/.runs/task-cycles/first-foundation/package-review-cases/rereview-results.json` contains all six method outputs and full RED tracebacks. Reproducer: `C:/Storage/repos/loop2-first-foundation/.runs/task-cycles/first-foundation/package-rereview-runner.py`.

# Pinned map semantics

The relevant supported prefix normalization now matches `.the-way/elements/part-map/format_guard.py:704-714`; Git matching remains case-sensitive in both implementations. Separate attributes preserve distinct-part overlaps instead of applying last-match-wins classification, agreeing with the guard's rejection at `:833-836`.

This function is still not a replacement for the full map guard: it records one claim per part, while the guard records one claim per pattern and can reject duplicate patterns within the same part; it also does not validate all map fields or intentionally omitted files. This distinction does not recreate either reviewed defect: same-part overlap cannot convert an application owner into tooling, and the dedicated map guard remains required. No claim of full parser/validator equivalence is made.

# Assessment

**Task quality: Approved.** The correction closes both independently reproduced failures, preserves baseline/tooling acceptance and keeps new or unowned application packages fail-closed with explicit diagnostics. Wider foundation and merge gates remain the controller's separate responsibility.

No product edits, commits, branch changes, or index mutations in the reviewed checkout. Only ignored review artifacts and disposable fixture indexes were written.
