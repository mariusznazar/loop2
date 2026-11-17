# Handoff — review of the return step's commits

You review the commits of the return step of the task cycle `luki-w-testach-z-przegladu`, as an agent that did not make them and did not review the change (`review-change`).

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human.
- Worktree: `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Range to review: `e0d2b678..36e6825b`** (three commits `6fb4e876`, `b124f637`, `36e6825b`, all in `foundations/decisions.md`); compute the diff yourself and confirm `git rev-parse HEAD` is `36e6825b`. Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole; the return step's commits are reviewed as its section 2 gives, **against the task and the foundation entries the return step writes or corrects**. Read the rules of the return step in `.the-way/task-cycle/skill/return_step.md`, and the element `SKILL.md` for decisions that `foundation_step.md` names, since the commits are decisions of the log.
- Read-only except your report; no load processes; no product gate. A check you run carries its command and exit code; `python -B .the-way/elements/common/foundation_check.py` you may run.
- The frozen task, whole: `.runs/task-cycles/luki-w-testach-z-przegladu/task.md`. The return step's handoff (what was asked) `.runs/task-cycles/luki-w-testach-z-przegladu/reports/return-step-handoff.md` and its report `reports/return-step-report.md` (claims to verify, not evidence). The review of the whole change (`reports/review-whole-report.md`, finding M-6 recommends the D-49 rewording) and of its fix (`reports/review-fix-1-report.md`).
- You select your own foundation entries and guidelines for the decisions the commits change: D-382, D-49, D-104, D-205, D-271, and the invariant `account-server-default-address`, each whole, and the tests the changed *Verification* clauses name (do they exist and hold what the clause says?).
- Points to judge: (1) D-382's *Verification* names a test that exists at `tests/view/tabs-area.test.mjs` and holds the clause; the pair of examples removal is right by `return_step.md`; (2) D-49: the rewording changes a binding sentence ("a single test" → "a single test file … one case for each startup the invariant names"); is it the smallest rewording that makes the decision and `tests/invariants/test_account_server_default_address.py` agree, and does it widen D-49 in any way? The request puts it before the human at the merge as an entry the cycle wrote that was not accepted with the task; (3) the commit `36e6825b` goes beyond the handoff's list (verification lists of D-104, D-205, D-271): does `return_step.md` license it, does each clause say what the named test holds, and is nothing in a binding sentence changed; (4) the return step's concern 1 (`decision: D-112` on `wait_until_ready` in `tests/invariants/account_container_support.py`: the helper depends on the sentence but does not test it): grade it as a finding of this review, if it is one; (5) the comparison it reports for the rest (D-422, D-29, D-73, D-390, the four environment facts, the invariants, the guideline rows, the part map): did it miss a mismatch you can find against the code at `36e6825b`?
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/review-return-step-report.md`; first line `PASS 36e6825b` or `FAIL 36e6825b`. Your directory for working copies: `.runs/review-return-step/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return and state in the report where each stood and that it was removed.)

## Return

The first line of your report, graded findings (Critical, Important, Minor; each Minor with its place and its own words, and whether it lies outside the task), the checks you ran with their commands and exit codes, the report path. The report ends with **Unread material:** and **Searches not found or unclear:** (each `none` where so).
