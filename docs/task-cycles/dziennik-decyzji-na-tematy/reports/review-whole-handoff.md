# Handoff — review of the whole change

## Delegation

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator; its
answers below are never that person's approval. The cycle has one human contact, the request. Do not ask the
human; return `questions` to the orchestrator if you must ask.

## Where you work

- Worktree (read-only for you; work from its root): the root of the task's worktree, branch `task/dziennik-decyzji-na-tematy`.
- Your directory for working copies: `.runs/review-whole/` (directly under the ignored `.runs/`).
- Your full report: `.runs/task-cycles/dziennik-decyzji-na-tematy/reports/review-whole-report.md`. Its first line is `PASS <sha>` or `FAIL <sha>` (or `questions`).

## Method and stage

Read whole `.the-way/task-cycle/review/SKILL.md` (method `review-change`), and, as it says for the review of the whole change, `whole_change.md` beside it. The stage: the review of the whole change, made by an agent that made none of it.

## What you review

- Range: base `bea0abc1826ae794664fc6ef09043bae9d062957` (merge of request #137, `origin/main` at the start) to head `3b5af51b` (one commit, one file: `foundations/decisions.md`). Compute the diff yourself.
- Route: one author without a plan; no spec, no plan, no slices. The pin of the-way was not moved: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, equal to the gitlink; point 1 of the task's *To do* drops for that reason (the task says so).
- Frozen task, read whole: `.runs/task-cycles/dziennik-decyzji-na-tematy/task.md`. Check every item of its *To do* (points 2, 3; point 4 is written later by the orchestrator, from the author's report), its *Acceptance criteria* and *Out of scope*, and the question 2 table (28 sections: order, headings and sentences word for word).
- The author's report (a set of claims to verify, not evidence): `.runs/task-cycles/dziennik-decyzji-na-tematy/reports/author-report.md`. Its script and section listing stand beside it in `reports/` (`author-build-sections.py`, `author-sections.txt`).
- Answers of step 4: touches a trust boundary: no; holds an operation that cannot be undone: no.

## Things the orchestrator found

- `main` held 408 entries at the base: the 403 of the task's projection and five written after it (D-410 to D-414). The author assigned the five and judged seven entries doubtful in the task (D-307, D-409, D-362, D-347, D-190, D-214, D-215) and listed the final placement and its reason in its report. Judge those placements against the entries' own text and the sections' sentences; a placement you hold wrong is a finding with the section you hold right. The task says the assignment is the cycle's and the request names the doubtful ones for the human.
- The author reports that the sentences of sections 4, 7 and 11 (accepted by the human on 2026-11-15) do not name CI, secret scanning, the session-start hook, the role of an account or the list of accounts, which now sit in them. The sentences are the human's; a change of them is outside this task. Say in your report whether you find any of the five entries in a section whose sentence it plainly contradicts.
- Test-citation and foundation checks read the log; the full gate (`npm test`) is the orchestrator's run and you do not run it.

## Your report holds

The method's report (checks you ran with their command and exit code, findings by grade, each blocking finding's slice or `none`, how many decisions you read whole), plus the sections **Unread material** and **Searches not found or unclear** (`none` where none), and the line on your working copies. You run no product gate.

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
