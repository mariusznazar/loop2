# Slice 6 returned for size before implementation

Status: returned
Reason: executor size, with a verified required eleventh Change path. This is a no-code size return, not a failed executor retry, review fix or unresolved API design choice.

## Identity and unchanged state

- Worktree: C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie.
- Branch: task/konta-graczy-i-logowanie.
- Dispatch base and current HEAD: 1e8a9bf1153d8cd7c58fcab210b51516ff760532.
- Process checkout and gitlink: 574a37b9ab9572f876298f4cc10754581222d3f0, matching.
- Product changes: none. Added/removed lines: 0/0. Staged changes: none. New commits: none.
- Only ignored reports were authored. No code, tests, guideline or foundation entries were changed; no reset, review or next stage was started. cycle.md was not read.

## Concrete source and path dependency

The canonical reviewed API is spec.md:33–36: POST /api/accounts, POST /api/session, GET /api/account and POST /api/logout. The current placeholders in src/server/app.ts:47–50 instead name /api/register and /api/login. Implement the canonical contract without permanent aliases.

The existing tests/transport.test.mjs must change with the owning implementation:

- :203–205 expects temporary 503 for configured unauthenticated GET /api/account, which must become the specified JSON 401.
- :310 sends the real media/body refusal cases to the placeholder registration path; those cases must protect /api/accounts.
- :325–331 sends valid JSON syntax with missing credential fields to the placeholder login path and expects temporary 503. It must use /api/session and assert the contract's credential-structure refusal, while preserving accepted-media controls.

The existing ten-path Change list omits this test file. Delivering the canonical behavior and retaining the old assertions is inconsistent; preserving obsolete aliases or weakening/removing those tests is not a resolution. Root independently confirmed this dependency and resolved the endpoint question in reports/32-api-size-return-handoff.md. No new binding design choice remains.

Root also verified that tests/startup.test.mjs:403–406 probes /api/account without trusted transport metadata and expects 403. That expectation remains required, so this finding does not justify adding the startup test file to Change. That particular startup inspection is root's supplied evidence, not this executor's own test run or source read.

## Where the size lies

The original handoff reports 169420 estimated tokens for the concrete slice. The 92 foundation groups discussed by root are the plan-wide reference index, not this executor's assigned reading. I did not independently run the sizing tool and do not claim it rejected the slice.

The actual workload combines session-authoritative lookup/logout; credential validation, native hashing and durable credential transitions; three bounded admission histories with in-flight reservations and disconnect behavior; real HTTP/SQLite concurrency and storage-failure cases; first-kind coding guidance and its foundation consequences; and permission/refusal documentation with deliberate mutation/restoration evidence. The required eleventh path takes the original Change list over its ten-file limit. My executor-size assessment and that verified dependency warrant a smaller plan, rather than an undocumented scope expansion.

## Proposed responsibility split for the planner

This is a recommendation, not a plan edit. Keep the work serial on the declared base and preserve every completed slice. Each proposed implementation slice owns behavior that can be checked independently; no existing test is moved merely to reduce file count.

1. **Current-account lookup and browser-specific logout, including canonical route assembly** — at most seven Change paths: src/server/account-routes.ts, src/server/app.ts, tests/http.test.mjs, tests/transport.test.mjs, guidelines/testing.md, foundations/invariants.md and foundations/part_map.md. Implement session authority, projection of the public account, refusal of absent/tampered/expired/deleted sessions and supplied foreign IDs, and destroy-before-success logout with cookie scope and other-browser preservation. Correct the placeholder route names to the canonical paths while leaving unfinished credential routes explicitly unavailable. Evolve the affected transport assertions, retain all actual guards, and add the lookup/logout rows through maintain-testing-guidelines. Use real SQLite sessions and HTTP, with deliberate unauthorized-guard failure/restoration. Do not mark registration/login or credential admission delivered.

2. **Credential registration/login and their admission policy as one coupled operation** — at most ten Change paths: src/server/account-policy.ts, src/server/account-routes.ts, src/server/app.ts, tests/http.test.mjs, tests/transport.test.mjs, guidelines/coding-account-policy.md, guidelines/coding.md, foundations/decisions.md, foundations/invariants.md and foundations/part_map.md. Keep reservations coupled to the actual native-work lifetime, including disconnects, and keep persistence-before-success with credential transitions. This slice owns the first account-policy exemplar, kind file and index through maintain-coding-guidelines and the relevant element methods. Test real HTTP, native hashes and database state for validation, duplicate races, correct/unknown login, all counter boundaries, expiry, full maps, failed saves and reservation release. Update remaining temporary credential expectations in the existing transport test. Both HTTP test files remain in their existing locations. Record any pending credential permission-table reconciliation explicitly for the following slice; do not claim the documentation obligation complete.

3. **Complete the account permission/refusal documentation and evidence reconciliation** — at most two Change paths: guidelines/testing.md and foundations/invariants.md. Through maintain-testing-guidelines and record-invariant, add the credential/admission rows to the already implemented lookup/logout rows, tie every row to the actual refusal tests and collected assertion-failure evidence, and reconcile each applicable Violated mark without clearing unrelated debt. This owns the remaining documentation obligation, rather than moving production code or tests out of their natural files. If its inspection finds missing behavior or evidence, return that to the owning implementation slice; do not paper over it by weakening the table or marking a requirement passed.

The planner must materialize and size each resulting Read selection again. The second slice still carries the coupled concurrency risk; splitting documentation and session-only endpoints removes independent responsibilities, but does not prove that the remaining slice fits. If it remains too large, the planner should make a further coherent split and recheck, not waive the cap. No product contract, test criterion or foundation method is relaxed by this proposal.

## Evidence obligations retained by the split

All repository tests, including deliberately broken and restored variants, run through npm test with the current declared base. Use the existing isolated Linux verification route and exact rebuilt bundles, with uniquely owned resources and retained credential-safe logs. No runtime check ran in this executor turn. Existing refusal tests, accepted-input controls, unknown-API behavior and public-file protections remain required.

Every new invariant/refusal test still needs its actual expected assertion failure and subsequent restoration result. Compilation/setup failure does not satisfy that duty. Each implementation author must report its weakest-point check and plausible faults independently of describing the code. The final committed head still requires the complete gate. The later documentation slice may consume recorded evidence but may not manufacture or infer a passing run from source inspection.

## Actual reading, commands and reaches

The initial executor read reports/31-api-handoff.md, the project make-change wrapper, the pinned change method, the current app/password modules and existing HTTP tests. It inspected the dispatched API/session/transport/rate/task excerpts, the target-advance memo, the project coding/testing wrappers and pinned maintenance methods. Some initial combined outputs truncated portions of the selection, guideline material and coding-maintenance method; those are not claimed as complete prerequisite reads. The complete selected foundation and linked element prerequisites were not read because the scope dependency was found before edits.

This resumed turn read reports/32-api-size-return-handoff.md in full and checked the unchanged repository identity. There were no new source reaches outside the named material. The source/test passages confirming the mismatch had been reopened in the prior turn. The prior report, reports/31-api-report.md, retains the detailed questions-stage record and limitations.

Own commands and exits, from this worktree:

- Get-Content -LiteralPath 'docs/task-cycles/konta-graczy-i-logowanie/reports/32-api-size-return-handoff.md' -Encoding UTF8 — exit 0.
- git rev-parse HEAD — exit 0; unchanged base above.
- git status --short — exit 0; empty.
- git diff --stat — exit 0; empty.
- git diff --cached --stat — exit 0; empty.
- git branch --show-current — exit 0; assigned branch.
- git -C .the-way rev-parse HEAD — exit 0; matching process commit.
- git ls-files --stage -- .the-way — exit 0; matching gitlink.

Earlier own checks retained in reports/31-api-report.md:

- The identity/status/diff/pin commands above, without the cached-diff check, exited 0.
- rg -n 'api/(register|login|accounts|session)|503' tests/transport.test.mjs tests/startup.test.mjs tests/http.test.mjs docs/task-cycles/konta-graczy-i-logowanie/reports/02-designer-answers.md docs/task-cycles/konta-graczy-i-logowanie/spec.md — exit 0; relevant matches reopened in context.
- Get-Content reads — exit 0, with the output-truncation limitations stated above.
- An optional combined Get-Content lookup of .the-way/task-cycle/plan/slice_size.py and rg against the literal reports/31* Windows path exited 1: guessed nonexistent file and invalid wildcard argument. Neither was used as evidence that a tool/report was absent. No size result came from this command.

No npm test, mutation, restoration, foundation checker, benchmark, container runner or target-server action ran. No test failure or passing test count is claimed. Writing and reading this report is record maintenance, not a product check.

## Unchanged consequences and return boundary

All existing foundation meanings and Violated marks remain unchanged. No exemplar, kind, permission row or map entry was written. Po polsku: nadal trzeba wdrożyć i sprawdzić uprawnienia wynikające z sesji, odmowę bez ważnej sesji, ograniczenia równoległych prób oraz zapis sesji przed odpowiedzią o sukcesie. Ten zwrot nie potwierdza żadnego z tych zachowań.

Upstream PR 31 already settles its mutation/testing adoption; preserve that decision and its full/focused test gate at final reconciliation, including identifier reconciliation. Durable account/save storage still includes saved game states and remains debt. Three native-Windows skips and target-image profile acceptance remain unchecked. Human-only deployment, secrets, rotation, public-account operations and target acceptance remain outside executor authorization.

Return to root for recording and replanning. No failed-executor retry or review-fix round is consumed. Stop before any implementation, independent review or next stage.