# Slice 6 executor report — dispatch scope question

Status: questions

## Identity and resulting state

- Worktree: C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie.
- Branch: task/konta-graczy-i-logowanie.
- Dispatch base and unchanged HEAD: 1e8a9bf1153d8cd7c58fcab210b51516ff760532.
- Pinned process: checkout and gitlink both 574a37b9ab9572f876298f4cc10754581222d3f0.
- Product files changed: none; added/removed lines: 0/0; commits: none. The worktree was clean on both status checks. This ignored report is the only authored artifact.
- No code, test, guideline or foundation edit was started. No review was started. cycle.md was not read.

## Question requiring the orchestrator

The frozen specification names POST /api/accounts and POST /api/session (spec.md:33–34). The reviewed startup assembly in src/server/app.ts instead names /api/register and /api/login. The selected startup report and handoff repeat those temporary route names.

The existing tests/transport.test.mjs is outside this dispatch's ten Change paths, but contains assertions that must change when the planned API becomes available:

1. Lines 203–205 require configured GET /api/account without a session to return temporary 503. The frozen API contract requires JSON 401.
2. Line 310 sends malformed media/body cases to /api/register. These cases must exercise the actual registration endpoint /api/accounts after its correction.
3. Lines 325–331 send an empty object to /api/login and require temporary 503. Under the frozen contract the route is /api/session and structurally malformed credentials must receive a JSON 4xx.

Question: may the revised slice change tests/transport.test.mjs in addition to the current ten paths, using the frozen-spec endpoints and replacing only obsolete temporary-503 assertions with the corresponding credential/authorization refusal assertions?

Recommendation: yes. The source already settles the endpoint contract; no human design choice is needed. Refresh the plan selection and size check for this eleventh path before execution. Keeping the test unchanged leaves either a false test failure or obsolete credential routes in the implementation. Correcting it preserves the actual transport/body refusal cases at the cost of one explicitly owned path. Do not add legacy endpoint aliases merely to retain obsolete tests.

## Size concern for the orchestrator

The handoff reports 169420 estimated tokens for this concrete slice. The root clarified that its 92 foundation groups describe the plan-wide index, not this executor's reading obligation; this report does not treat 92 groups as assigned reading.

The slice combines three distinct implementation obligations: credential validation and rate reservations (including native-work completion after disconnect); session-authoritative account/logout and credential transitions with durable save/destroy failures; and first-kind guideline/foundation work plus HTTP concurrency and deliberate failure/restoration evidence. The concrete test mismatch adds another changed file. Reconsider a split before extending the slice: account lookup/logout and their session-authority/refusal evidence can precede credential registration/login with admission policy and their coupled HTTP/DB evidence. Keep rate admission and credential work together in that later slice because their lifetime is the same operation. This is a suggested replanning seam, not a plan edit or a claim that a size tool rejected the slice. No silent subdivision was performed.

## Reading completed and limits

Read the dispatch handoff, local make-change wrapper and pinned change method. Inspected the current app and password modules, existing HTTP tests, source API/rate/session/transport excerpts, selected task contract excerpts, the target-advance memo, and the named coding/testing method wrappers. Read the pinned testing-maintenance method; initial combined tool results truncated portions of the selection, guideline material and coding-maintenance method, so those must not be counted as completed full prerequisite reading. The complete selected foundation and linked element-method prerequisites were not read because the required path mismatch was identified before edits.

No reading beyond the dispatch's named material produced a new source dependency. The exact frozen-spec lines and transport-test passages were reopened to confirm the mismatch. An attempted optional lookup of .the-way/task-cycle/plan/slice_size.py failed because that guessed path does not exist; an rg invocation with a literal reports/31* Windows path also failed. Neither failure supports a conclusion about the tool or report contents, and neither was used as evidence of absence.

## Commands and checks

All commands ran from the worktree above. The following are this executor's checks, not prior-slice evidence:

- git -C .the-way rev-parse HEAD — exit 0; exact pin above.
- git ls-files --stage -- .the-way — exit 0; gitlink matches checkout.
- git status --short — exit 0 on initial and final pre-report checks; no output.
- git rev-parse HEAD — exit 0; unchanged dispatch base.
- git diff --stat — exit 0; no output.
- git branch --show-current — exit 0; assigned branch.
- rg -n 'api/(register|login|accounts|session)|503' tests/transport.test.mjs tests/startup.test.mjs tests/http.test.mjs docs/task-cycles/konta-graczy-i-logowanie/reports/02-designer-answers.md docs/task-cycles/konta-graczy-i-logowanie/spec.md — exit 0; source/test discrepancy confirmed and then read in context.
- Get-Content reads of the dispatch, source excerpts, guidelines, methods and implementation — returned exit 0; output truncation limitations stated above.
- Combined optional Get-Content .the-way/task-cycle/plan/slice_size.py and rg against a literal reports/31* path — exit 1; lookup/argument failures described above, no product check executed.

npm test was not run: no implementation or test was changed, and the executor is returning a required-scope question before mutation. No failing-first case, deliberate mutation, restoration run, native hash exercise, runner/container, foundation check or final committed-head gate was executed. The previous slice's result is supplied evidence only. Three native-Windows skips, target-image profile acceptance and durable saved-game storage remain unchecked; this report does not clear any of them.

## Own-work and weakest-point findings

The immediate weakest point is the claim that API delivery can preserve existing controls within the ten allowed paths. The check was source comparison: frozen API routes and error requirements versus existing transport assertions, with the exact commands and passages above. It disproved that premise. It did not test runtime behavior or identify a defect in the completed policy, which does not exist yet.

Plausible future faults still requiring actual implementation tests and assertion failures include: successful response before session persistence, request-supplied identity overriding the session, capacity released on HTTP disconnect while native work continues, parallel attempts exceeding email/IP limits, and live restriction eviction at full capacity. Naming those faults is not fulfillment of the mutation duty; no such test or mutation ran in this executor turn.

## Foundation, guidelines and surface consequences

None were written. No new decision, invariant, exemplar, permission row or map claim was made. Every current Violated mark remains unchanged; this report asserts no invariant transition. In Polish: uprawnienia wynikajace z sesji, odmowa bez waznej sesji, ograniczenia rownoleglych prob oraz zapis sesji przed sukcesem nadal wymagaja implementacji i dowodu w tej czesci zadania. The saved-game meaning of durable account/save storage remains debt. Upstream PR 31's mutation/testing adoption is settled and must be preserved at final reconciliation; no new tool choice is proposed.

Return boundary: await the orchestrator's scope resolution; do not start independent review.