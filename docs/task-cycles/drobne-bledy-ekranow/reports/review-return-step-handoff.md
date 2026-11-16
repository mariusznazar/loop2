# Handoff — reviewer of the return step, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything; a question goes to the orchestrator in your report with status `questions`. You made none of the change. Nothing the orchestrator says is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Confirm `git rev-parse HEAD` is `614f28f2` followed by its full hash (take it from `git log -1`); on a mismatch ask which range to review.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Method: `review-change`, `.the-way/task-cycle/review/SKILL.md`, read whole. Your review is "the return step's commits": section 2 of the skill gives how they are reviewed, against the task and the foundation entries the return step writes or corrects.
- Range: base `fe15a2671b959c3162ff7dea2203c48c0c7f8137` (the head both reviewers of the whole change passed) to head `614f28f2` (one commit, changing `foundations/decisions.md` only: the *Verification* of D-297, D-318, D-319, D-41 and D-19). Compute the diff yourself.
- The return step's report (claims to verify): `.runs/task-cycles/drobne-bledy-ekranow/reports/return-step-report.md`; its handoff: `reports/return-step-handoff.md` (what it was asked to compare).
- The frozen task: `.runs/task-cycles/drobne-bledy-ekranow/task.md`. The five decisions are to be read whole with their *Rejected*. The tests each clause cites are at the head: check that each cited test exists with that title and holds what the clause says; the return step's rule: where a test holds part of a decision's sentence, that part leaves the pair of examples and the test is named by the clause `tests:`; a pair stays only for a part no test holds.
- Read-only: no edit, no commit. Run `python -B .the-way/elements/common/foundation_check.py` and `python -B .the-way/instruction-files/check_instructions.py` (command and exit code each). Do not run the full suite and do not start the local game; a focused `npm test -- <file>` of a cited test is yours to run.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/review-return-step-report.md` (first line `PASS <sha>` or `FAIL <sha>`). Your directory for working copies: `.runs/review-return-step/`.

## Working copies (first paragraph of the cycle's rule, word for word)

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

## Report

As `review-change` gives it: the first line, graded findings (anchor `path:line`, full wording, expanded justification), checks with commands and exit codes, how many decisions you read whole, reaches beyond the handoff, **Unread material**, **Searches not found or unclear**, and the line on working copies. A Minor finding blocks nothing.
