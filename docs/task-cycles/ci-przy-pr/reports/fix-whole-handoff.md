# Handoff — the fix of the Minor findings of the review of the whole change (task `ci-przy-pr`)

You are the one author, resumed. Variant of `make-change`: **"the fix of a review's findings"** (`.the-way/task-cycle/change/SKILL.md`; read the part that variant names again). Same worktree `the task's worktree`, branch `task/ci-przy-pr`, same rules as in `reports/author-handoff.md` (no full gate, no push, commit by path, English messages in the repository's style, working copies in `.runs/author/`, the same working-copies paragraph).

## What to fix

The findings file: `reports/fix-whole-findings.md` — the five Minor findings m1–m5 of the review of the whole change, in the reviewer's words (the full review is `reports/review-whole-report.md`, `PASS` on `51596257`). There is no blocking finding. All five are within the task; the review marked none as outside its scope. Fix each, or answer with evidence a finding you hold wrong (`make-change` says how).

The orchestrator's rulings, so that you take no open choice:

- **m1:** assert that no line of `.github/workflows/tests.yml` holds `continue-on-error`, in `tests/quality/test_ci_workflow.py`; show the test failing on the mutation first (step-level and job-level), then passing.
- **m2:** take the reviewer's first way: one decision of the cycle's own, written through `the-way-record-decision` as `.the-way/task-cycle/skill/foundation_step.md` gives (the one you wrote, D-412, is the model of an entry marked as the cycle's), whose sentences carry the properties the test holds — the event `pull_request` and never `pull_request_target`, a read-only token and no secret, no text of the request in a command, actions at commits, `.the-way` at the commit of the gitlink, `origin/HEAD` set before the one command, the fixed job name `tests` and why it is fixed (the repository's rule of the required check names it) — and cite it by `decision:` lines in `tests/quality/test_ci_workflow.py`; bring the docstring and the "Breaking it" comments of the test to what D-82 and `guidelines/testing.md` ask (a requirement stands in the foundation; the test names no document outside it). Put no property in a sentence that no check holds, and state in the decision's *Verification* what holds each sentence. The identifier and the *Scope* follow the log's rules; D-412's relation to it is yours to judge.
- **m3:** move the line and the sentence to `agent-workflow`, where the template puts the configuration of CI. Check every selection the move changes: the invariant tests that count files per part, `foundation_check.py`, and any test or document that names the part of the workflow (for example in `guidelines/testing.md`).
- **m4:** add `.github/workflows/tests.yml` to the *Trust boundary* of the part that owns it after m3, with review as its check as `guidelines/testing.md:166-167` gives; check what the *Trust boundary* list of that part asks of the entry (`.the-way/elements/part-map/` files) and what `foundation_check.py` and the tests say of it.
- **m5:** change the sentence of D-412's *Rationale* to "refuses a push that holds a secret of a kind it recognizes", and make no other claim about GitHub there. Do not write GitHub's address or a passage from memory: the source of D-412's *Based on* is a task of the return step, not of this fix.

## Boundaries

- Your fix range runs from the reviewed head `51596257`. Check that your changes keep `test_ci_workflow.py`, `test_test_gate.py`, `test_docker_gate.py`, `test_node_test_selection.py`, `test_account_server_typecheck.py` and `foundation_check.py` green by focused runs; name each with command and exit code.
- Not yours: the full gate, the return step (a separate resumption), the request.

## Report

`.runs/task-cycles/ci-przy-pr/reports/fix-whole-report.md` (as in `reports/author-handoff.md`: status, commits, checks with commands and exit codes, the own-work check, **Unread material**, **Searches not found or unclear**, working copies, and for each of m1–m5 what you did or why you hold it wrong).
