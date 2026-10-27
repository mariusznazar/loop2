# Independent review of the whole change: player accounts and login

Worktree C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie; branch task/konta-graczy-i-logowanie. Process checkout and gitlink must both equal 574a37b9ab9572f876298f4cc10754581222d3f0. All short record paths mean docs/task-cycles/konta-graczy-i-logowanie/. The user delegated intermediate decisions through the-way-implement-task. You made none of this change.

Method: .claude/skills/the-way-review-change/SKILL.md with the complete pinned method and references it names, including the user's code-review playbook C:/Storage/The Brain/The Brain/Notes/Areas/(A) Claude code/playbook_code_review.md. This is the review of the whole change. Select your own foundation entries and guidelines by the parts the change touches, as the method gives. Do not read cycle.md. You cannot message the orchestrator mid-run: questions go into your report with first line `questions`.

Range: from the task's base 7012abcfb55b4ba2b2836b574a2275eb1551df28 to head bf36040ed5f916a01fea53af4ae0bc3c779bad5b (32 commits, 61 files, +9794/-296). Read whole: the frozen task task.md, the reviewed spec spec.md and the plan plan.md.

Slices, their ranges and whether each had a review of its own:

| Slice | Range | Own review |
|---|---|---|
| Foundation entries + 1 | 7012abc..7ef7457 | yes: FAIL c24fbff, fix, PASS 7ef7457 (reports/11-slice1-review.md, 14-slice1-rereview.md) |
| 2 | 7ef7457..c85518a | yes: FAIL 3cbb129, fix, PASS c85518a (16, 18) |
| 3 | c85518a..c9af9d4 | yes: PASS (20) |
| 4 | c9af9d4..8c21680 | yes: PASS (28) |
| 5 | 8c21680..1e8a9bf | yes: PASS (30) |
| 6 | 1e8a9bf..480309c | yes: FAIL 4101fb9, fix, PASS 480309c (36, 38) |
| 7 | 480309c..9490083 | yes: FAIL 8aa2e9c, fix, PASS 9490083 (40, 42) |
| 8 | 9490083..f34ed3f | no — judge it: executor report reports/43-evidence-report.md |
| 9 | f34ed3f..3144816 | no — judge it: reports/44-client-report.md |
| 10 | 3144816..be82211 | no — judge it: reports/45-controls-report.md (screenshots reports/45-controls-*.png) |
| 11 | be82211..9c2173d | no — judge it: reports/46-shell-report.md (screenshots reports/46-shell-*.png) |
| 12 | 9c2173d..19695d6 | yes: FAIL 19695d6, fix without commit (reports/49-target-measurement-procedure.md), PASS (48, 50) |
| 13 | 19695d6..bf36040 | no — judge it: reports/51-deploy-skill-report.md |

For each blocking finding name the slice it comes from, or that it comes from none.

Mismatches the orchestrator's mechanical checks passed on, as information, not findings or grades:
- Slice 8 returned two evidence gaps (reports/43-evidence-report.md, "Returned to the orchestrator"): no POST credential-route test with invalid forwarding headers for `account-request-transport`, and the untested registration branch of `account-attempt-tracking`; it kept both entries whole and Violated no.
- Slice 11 cleared Violated on `player-self-registration`, `player-password-login`, `email-verification-nonblocking` and `loop2-shared-public-origin` from the local HTTPS browser journey, before the human's public journey (reports/46-shell-report.md, "Foundation, guidelines and surfaces"); it added copy rows for `account-screen.ts` and `game-view.ts` to guidelines/coding-browser-module.md despite WAY-200 (same section).
- Slices 9 and 11 wrote user-facing Polish sentences the task does not fix (reports/44-client-report.md choice 4; reports/46-shell-report.md choice 3).
- Slice 10 and 13 left a planned Change path unchanged with a reason (decisions.md and part_map.md; none in 13); slice 12 left Dockerfile unchanged.
- The orchestrator will, at its return step, add the missing copy row for `account-routes.ts` in guidelines/coding-http-application.md, the integration test files tests/account-api.test.mjs and tests/password-measurement.test.mjs to guidelines/testing.md, and align D-114's settlement wording with the reworded `account-attempt-limits`; do not count these as missing unless you judge them differently.

Minor and out-of-scope findings of the slice reviews (WAY-164), for you to take into account; their reviewers' grades stand there, yours are your own:
- reports/36-session-review.md Minor 2, 3, 4 (3 later addressed by slice 8's rewording; 4 removed by slice 7's change).
- reports/40-credentials-review.md Minor 2, 3, 4, 5, 6 (2 later addressed by slice 8's rewording).
- reports/42-slice7-rereview.md: the Minor note on the Polish meaning of `account-attempt-limits` (a request-text matter).
- reports/48-measure-review.md Minor 2-7 and out-of-scope finding 8.

Two questions at start (WAY-13): the change touches a trust boundary — src/server/**, the deployment (compose.yaml, Dockerfile, the image measurement), the dependency lockfile — so check crafted input at that boundary: HTTP bodies and headers, session and cookie forgery, Origin and proxy spoofing, limits and capacity, persistence and the image measurement's attribution. Irreversible operations — server setup, deployment, the target measurement — are only prepared: check that the change only prepares them and that the loop2-deploy skill's human sequences are safe and correct under D-12, D-13, D-15, D-16, D-17. Upstream PR 31 (reports/29a-target-advance.md) is not merged yet; the orchestrator merges the target after this review and resolves the decision-number collision, which is not a finding of this range.

No product, foundation, process, vault, global or target writes. No server command. If disputed evidence warrants running tests, run only full npm test through the established Linux harness (reports/linux-verification.md; exact docker arguments in reports/51-deploy-skill-report.md, "Checks", and reports/44-client-report.md, "Checks"; pass 7012abcfb55b4ba2b2836b574a2275eb1551df28 as the target ref; rebuild the product bundle first; a uniquely named owned container on loop2-task15-dind), never selected node/unittest commands. Do not repeat the final gate merely to advance; the orchestrator runs it after your review. Every executed check carries its exact command and exit code; skips stay unchecked; source inspection is distinct from executed evidence. If a user's command guard or permission rule refuses a command, do not work around it; record the refusal. No secret, password or session value in your report.

Write the full report to reports/52-whole-review.md with first line `PASS <sha>`, `FAIL <sha>` or `questions`, complete findings with file:line anchors, grades, the slice each comes from, and reasons in the review format; the Minor and out-of-scope findings as separate lists; checks run; reading reaches. Read it back. Return the verdict, the counts, a one-line check result and the report path; stop before any fix.
