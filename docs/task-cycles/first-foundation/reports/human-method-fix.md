# Human Method review correction

Input: `human-method-review.md` Important 2, on product commit `d366b8e3c650a86c984f0a64da54dae501e243f4`. Important 1 is reserved for the orchestrator's task-source settlement.

Correction commit: `ce649b7` (`Clarify public file assessment boundary`).

Changed only `foundations/public_file_boundary_assessment.md`: the assessment now distinguishes static asset serving from an account/save API response returning the requested application record, even when the record is filesystem-backed. Classification depends on the data returned, not the path prefix or transfer API. It still requires tracing read-and-send flows and treats an unrelated repository file such as `package.json` exposed through an API route as a disguised leak. The final verdict instruction now fails only a reachable outside-public static file or disguised file leak. The binding invariant sentence and Method are unchanged; no human verdict or test citation was added.

Verification: invariant format guard on `foundations/invariants.md` with base and merge target `44294da228ab8c27dfd1683f931f59f8d7f8d29d` exited 0: 0 errors, 0 warnings, 0 unchecked. It notes that no `human_verdicts.md` exists. `git diff --check` exited 0. Existing assessment file remains LF in the worktree. Automated tests were not rerun for this prose-only clarification; the prior 34/34 invariant runner and 5/5 npm results remain evidence for the unchanged code, not a verdict on this human Method.
