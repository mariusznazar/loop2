# Handoff — review of a correction for the human's remarks

You review, as an agent that did not make it, one correction made to the open request of a task in a task cycle of the-way. The human's remarks bind and the orchestrator did not judge them. You ask no human anything: a question goes to the orchestrator as your method gives.

## Where you work

- Worktree (read it; change nothing in it): `the worktree of the task`, branch `task/wyglad-ekranu-wiedzy`. **Write nothing in the main checkout `the main checkout of the repository`**; run every command from the worktree.
- Your directory for working copies: `.runs/review-correction-1/` of the worktree (only if you need one; remove it before you return). Your report: `.runs/task-cycles/wyglad-ekranu-wiedzy/reports/review-correction-1-report.md`, first line `PASS <sha>` or `FAIL <sha>` (or `questions`).
- `cycle.md` and the other files of the record directory are not yours to read, except the ones this handoff names. Leave no shell, server or browser running.

## Method and range

- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole, and `.the-way/task-cycle/review/fix.md` (a correction made for the human's remarks), as the method says. The human's remarks stand in place of a findings file.
- What is reviewed: **the correction**, range from `265d41cf` (the request's earlier head, whose whole change was reviewed `PASS`) to `8877c742a75a3853be0ce7d5bc337858ab1f6273` (one commit, one file, `foundations/decisions.md`, +2 −1). Compute `git diff 265d41cf..8877c742a75a3853be0ce7d5bc337858ab1f6273` yourself and confirm `git rev-parse HEAD`.
- The remarks, word for word: `.runs/task-cycles/wyglad-ekranu-wiedzy/reports/correction-1-remarks.md`. Of them only item 2 of *Fix or let through* is the correction's (add to the *Rejected* of the older decision D-280 the sentence that it rejects the rows with level, points and buying on two screens, not the shared layout of the row of a tree, as it was closed in D-416); items 1 and 3 are let through, item 4 the orchestrator did itself (removal of a merged task's directory), items 5–7 accepted.
- The author's report, claims to verify: `.runs/task-cycles/wyglad-ekranu-wiedzy/reports/author-correction-1-report.md`. Read, whole, from `foundations/decisions.md`: D-280 and D-416 (with its *Rationale* and *Rejected*), and, as the model of the wording, the clause of D-416's *Rejected* the correction copies. The task's frozen copy `.runs/task-cycles/wyglad-ekranu-wiedzy/task_frozen.md` says D-280 stays "without change"; the human's remark overrides that for this one clause — judge only whether the clause is what the remark asks, does not contradict a binding sentence of D-280 or D-416, changes nothing else in D-280, and is true to D-416.
- Run `python -B .the-way/elements/common/foundation_check.py` yourself (command and exit code in the report). No full gate. Grade and scope are yours; a new Critical or Important finding in the correction fails this review.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.

## Report

First line `PASS <sha>` or `FAIL <sha>`; blocking findings and Minor findings apart, each with its grade, its place and your words; the checks with commands and exit codes; **Unread material** and **Searches not found or unclear** (each `none` where none); the working copies you made and removed. Return the first line, the path and a one-line result.
