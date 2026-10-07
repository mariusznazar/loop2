# Review of `ce55c6cda70aea18f8f4ec647776abad45574058..d366b8e3c650a86c984f0a64da54dae501e243f4`

## Spec Compliance

**Issues found.** A file-path human Method is valid under the pinned invariant template, but this revision does not deliver the task's protected invariant test for `public-file-boundary/1`. The test still runs and its earlier deliberate breaks remain useful supporting evidence; its removed citation means the gate records no automated verdict for the invariant. Without a human row, the invariant is `unchecked`. The task calls for each deferred invariant to have a test and deliberate break, specifically to move protection out of ordinary tests that an implementer can change without a foundation signal. The reviewed spec and original plan explicitly require a cited check. This is a material scope change that should be shown as an unresolved task-source conflict, not presented as a completed automatic check.

## Strengths

- `foundations/invariants.md:99` uses the pinned path form of Method; `.the-way/elements/invariants/template.md:83-86` permits it. The invariant sentence and version remain unchanged.
- `foundations/public_file_boundary_assessment.md:5-9` names the commit, built output, entry point, routes, dependency behavior, filesystem path resolution and limits of finite HTTP probes. It gives no fabricated pass and requires no verdict for incomplete work.
- `tests/invariants/test_public_file_boundary.py:1-13` accurately describes the finite probe and no longer claims that its sample proves a universal statement. The existing probe and deliberate-break evidence remain intact.
- `git show --format= --check d366b8e3c650a86c984f0a64da54dae501e243f4` exited 0. `python -B .the-way/elements/invariants/format_guard.py foundations/invariants.md --base 44294da228ab8c27dfd1683f931f59f8d7f8d29d --merge-onto 44294da228ab8c27dfd1683f931f59f8d7f8d29d` exited 0 with 0 errors, 0 warnings and 0 unchecked. That format result is not a verdict on the human Method.

## Issues

### Important 1. The public-file test no longer gives the invariant a verdict

**New thread. Anchor:** `tests/invariants/test_public_file_boundary.py:27` (removed `# invariant: public-file-boundary/1` from this test).

**To paste:** This keeps a useful runtime test, but it is no longer a test that can give `public-file-boundary/1` a foundation verdict. The pinned rule records no verdict for an invariant a check does not cite; without a human assessment row this entry is `unchecked`, so the task's promised test-backed protection is not complete. Please reconcile that change with the task's requirement for each invariant to have a test and deliberate break, and report the resulting unchecked state explicitly.

**Why I report it:** The task's Need says these rules currently have only ordinary tests that an implementer can change without a foundation signal; To do item 1 asks for each deferred invariant with a test and deliberate break. The reviewed specification's `Independent checks` and plan's Task 3 require a citing runtime check. The pinned template at `.the-way/elements/invariants/template.md:207-213` says a check gives a verdict only when it cites the invariant, and lines 255-263 say a path Method without a human verdict is `unchecked`. The diff removes the only citation at line 27 and changes the Method to a path; no `foundations/human_verdicts.md` exists. For example, a later implementation could add a header-selected `/api/export` branch serving `package.json`; the finite test would still be green, while this invariant remains unchecked until someone performs and records a complete human review. That is truthful evidence, but not the automatic protected check this task described. Restoring the citation alone is not a fix because the finite check demonstrably false-passes ordinary route shapes. The orchestrator should either establish an authorized sound checking method, obtain a completed human assessment while explicitly settling the source requirement for a test-backed invariant, or carry this task-source conflict and its cost into a blocked draft request. The existing deliberate breaks of the finite probe must not be reported as an accepted break of a citing invariant check after this change.

### Important 2. The assessment procedure can reject allowed application data responses

**New thread. Anchor:** `foundations/public_file_boundary_assessment.md:7`.

**To paste:** The procedure treats every filesystem-derived byte transferred to a response as a static file that must come from `dist/public`. The invariant only confines files the server serves as static assets; a future account API can read a saved game from its data store and return that data without exposing an outside static asset. Please define that boundary in the assessment so such responses are not automatically called violations.

**Why I report it:** The binding sentence at `foundations/invariants.md:97` is about static files. The new procedure's step 3 says to inspect every path transferring filesystem bytes, including reads followed by `send`/`end`, and to confirm every possible file is within `dist/public`. A future `GET /api/saves/:id` could read `data/saves/<id>.json` and return its JSON content. That would transfer bytes from a file outside public yet still be the account/save response, not a static-file route. Step 3's only explicit exemption is an internal read whose bytes cannot reach a response, so the assessor is told to fail the valid API case. This false positive can block the product's named account/save responsibility. Clarify how to distinguish static asset serving from application data returned by an API, while still checking that a route cannot leak a file such as `package.json` by reading it and sending its bytes. If the product instead intends to prohibit all filesystem-backed response data outside public, that is a broader binding rule and needs its own source decision.

## Declined to judge

- I did not reassess the existing finite test's route-sampling false negatives: the independent assessment already demonstrated them, and this diff accurately stops treating its pass as the universal verdict.
- I did not issue a human pass/fail on the current server: this review judges the procedure and source compliance; the Method reserves that verdict to a completed human assessment at a named commit.

## Assessment

**Task quality: Needs fixes.** The path Method is structurally legal and avoids a false pass, but it changes the task's verification outcome, and its broad data-flow instruction risks a false failure for account/save API responses. A reviewable request should disclose the `unchecked` invariant and the unresolved source tradeoff rather than call this invariant complete.
