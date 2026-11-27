# Handoff — the fix of a review's findings (the one author, resumed)

The person who started this cycle delegated every intermediate choice to the orchestrator; nothing here is that person's approval. Your first handoff (`reports/author-handoff.md`) still holds for where you work, what you may write, and what you leave running: the worktree `the worktree of the task` only, nothing in the main checkout `the main checkout of the repository`, no shell, server or browser left running.

- Stage: **the fix of a review's findings**, method `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant in the words of its row "the fix of a review's findings", with `.the-way/task-cycle/change/fix.md` read when the method says so.
- The review: `reports/review-whole-report.md` first line `PASS ba1ccf8d5a1835123b62b20ddf7802173e7fa10d` — it passed; the findings file holds the one Minor finding within the task that is fixed now: `reports/review-whole-findings.md`. Fix it and nothing else: change no other word, file or behaviour (the other Minor finding, M1 on D-280, is outside the task's scope and is not yours). The fix's range runs from the reviewed head `ba1ccf8d5a1835123b62b20ddf7802173e7fa10d`; commit it as one commit by explicit path.
- Run the affected check again: `npm test -- tests/view/knowledge-screen.test.mjs`, plus `npx prettier --check` and `npx eslint` on the file, each with command and exit code in the report. No full gate.
- Your directory for working copies: `.runs/author-fix-1/` (create it only if you need a working copy; remove it before you return).
- Your report: `.runs/task-cycles/wyglad-ekranu-wiedzy/reports/author-fix-1-report.md`; it holds the same sections as your first report that apply (status, commit, checks with commands and exit codes, **Unread material**, **Searches not found or unclear**, working copies and what is left running — nothing). Return the status, the commit, a one-line check result and the report's path.

Working copies, word for word:

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
