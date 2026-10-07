# Re-review of the human Method clarification

Range: `d366b8e3c650a86c984f0a64da54dae501e243f4..ce649b7`.
Scope: only Important 2 of `human-method-review.md` and `foundations/public_file_boundary_assessment.md`.

## Spec Compliance

**Important 2 resolved.** `foundations/public_file_boundary_assessment.md:7` now explicitly allows an account/save API response to return its requested application record from storage outside `dist/public`. It classifies the response by its data and purpose rather than by `/api/` or the transfer API. The same sentence instructs the assessor to treat an unrelated repository file such as `package.json` sent through an API route, even wrapped as data, as a leak. Line 9 narrows a fail verdict to an outside-public static file or disguised file leak. These instructions preserve the invariant's static-file boundary without rejecting valid save-data responses.

**The whole task remains noncompliant.** Important 1 of the prior review is unchanged: the finite test has no citation, the Method is human-assessed, and no human verdict row exists. `public-file-boundary/1` remains `unchecked`; this re-review does not grant it a pass or resolve the task's test-backed protection requirement.

## Strengths

- `foundations/public_file_boundary_assessment.md:7` gives both sides of the classification with concrete examples, including a disguised repository-file leak under an API path.
- `foundations/public_file_boundary_assessment.md:5-9` still requires a complete route and dependency assessment at a named commit and no verdict when paths remain unassessed.
- `git diff --check d366b8e ce649b7` exited 0. The changed file is prose only; no automated suite was rerun for this review.

## Issues

No new issue in the scoped correction.

## Declined to judge

- The earlier Important 1 is outside this correction and remains open for the orchestrator's blocked-draft settlement.
- I did not perform the human assessment or write `foundations/human_verdicts.md`.

## Assessment

**Scoped correction quality: Approved. Overall task quality: Needs fixes.** The clarification resolves the false-positive account/save case and retains review of disguised static-file leaks. The unfulfilled citing-check requirement remains the controlling task issue.
