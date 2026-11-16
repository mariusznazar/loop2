# Handoff — the fix of a review's findings (task `hook-wersji-the-way`, round 2: the review of the return step)

Same worktree (`the task's worktree (the repository root)`, branch `task/hook-wersji-the-way`), same directory for working copies `.runs/author/` (empty; remove what you make). The fix's range starts at the reviewed head `e684b22a16dfa4fccd624f80a27fe91862d8dbfd` (your return-step commit; the reviewer's verdict was `FAIL`). Report path: `.runs/task-cycles/hook-wersji-the-way/reports/author-fix-2-report.md`.

## Method and variant

`.the-way/task-cycle/change/SKILL.md` (`make-change`), your variant, in the words of its row: **"the fix of a review's findings"** (read `.the-way/task-cycle/change/fix.md` when the method names it). Same rules as in your earlier handoffs: explicit paths in `git add`, English messages in the repository's form, no push, no full gate; edit D-414 through the method of `the-way-record-decision` as before.

## Findings to fix

The findings file, in the reviewer's words: `reports/review-whole-findings.md` is round 1 and is done; this round's file is `reports/review-return-findings.md`: two blocking findings, I-1 (the *Verification* clause of D-414 names a test for the unreadable checkout that the test file does not hold) and I-2 ("the folder is no repository" does not say which folder). The full report, for evidence on a contested finding only: `reports/review-return-report.md`. Fix both. Where you hold one wrong, answer it with evidence in your report; the reviewer alone grades and scopes, so do not re-grade. The Minor finding M-1 of that review (the *Rationale* of D-414 lists two silent cases under "only") is not in the findings file and is not fixed in this round, except that where fixing I-2 changes the same sentence of the *Rationale* by necessity you say so in your report; do not otherwise edit it.

Notes (the fixer's choice of form stays yours): for I-1 the reviewer names two fixes, (a) the test asserts both messages, the pinned commit and `REPAIR` for the unreadable checkout, as the uninitialized case does, or (b) narrow the clause; the orchestrator prefers (a), which keeps the new words of D-414 true; show the strengthened test fails when the agent's message or the repair command is dropped for that case (a mutation). For I-2 name the folder in both places of D-414 (the binding sentence and the *Verification* clause); keep the two `decision:` quotes of the test equal to the sentence word for word, so that the foundation check and the test agree.

## Report

As before: status; commits; each check with command and exit code (`python -B .the-way/elements/common/foundation_check.py`, the hook test file, Ruff on the test file); the own-work check; weakest point; each reach; **Unread material**; **Searches not found or unclear**; working copies. Say for each of the two findings: fixed (where) or answered (why).

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.
