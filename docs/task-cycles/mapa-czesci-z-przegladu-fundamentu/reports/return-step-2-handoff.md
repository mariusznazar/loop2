# Handoff — the return step after correction 1 (the one author, resumed)

You are the one author, resumed for the return step again, because correction 1 changed what the return step compares (step 11 of `implement-task`, repeated by `correction.md`: "repeat only what the remarks touch — the return step included"). Same worktree, same pinned the-way. Correction 1 is the range `6bc246ab..0fb68aa6`; it passed its review (`reports/review-correction-1-report.md`, `PASS 0fb68aa6`).

Read whole: `.the-way/task-cycle/skill/return_step.md` and `.the-way/task-cycle/skill/foundation_step.md`; the `SKILL.md` of an element, at the path `foundation_step.md` gives, when you write an entry of that element. Your method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), which names the return step. Your directory for working copies: `.runs/author/`. Report: `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/return-step-2-report.md`, with the fields of the record's *Return step* (copy their names), **Unread material**, **Searches not found or unclear**, each check with command and exit code, your working copies. No full gate (`npm test`); commit by path, English messages; where you commit nothing, say so (then there is no range to review).

## What the step compares this time

What correction 1 changed, against the code at the head `0fb68aa6`: the invariant `deploy-workflow-input` (does its sentence still match what the test of the deployment workflow reads, and does the mark on the new mutation case, `test_an_expression_after_a_comment_mark_in_a_script_is_refused`, match the invariants template — the reviewer judged the mark Minor c-2 and the cycle does not fix it), the rows of the table of trust boundaries of `guidelines/testing.md` for `.github/workflows/deploy.yml` (every sentence true of the cases as they stand), the decisions D-09 and D-11 and the part-map entry of `deployment`. Correct in the same change whatever no longer matches. Compare as the step's rules give; write an entry only for what the rules make you write, and no entry is deferred.

The remarks of the human bind and are not reopened: item 2 let through M-4, m-2, m-3, n-3 and N-3. The reviewer's Minor findings of the review of correction 1 — c-1 (the row's list of unread forms misses `run : …` with a space before the colon and a quoted value written with `$`) and c-2 (the mark of the mutation case) — are **not fixed** here: a Minor finding of a correction goes to the request's list. Do not change the row or the mark for them. If, comparing the row with the code, you find a sentence of it that is **false** of the cases at the head, correct that sentence only and say so.

## Working copies (word for word)

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

## What you return

Status, your commits (the range from `0fb68aa6`, or none), one line naming each check that failed or did not run, the report path, questions, reaches, **Unread material**, **Searches not found or unclear**.
