# Handoff — a correction for the human's remarks (the one author, resumed)

The human reviewed the open request and answered through the day advisor. Their remarks bind; the orchestrator did not judge them. Your first handoff (`reports/author-handoff.md`) holds for where you work and what you leave running: the worktree `the worktree of the task` only, nothing in the main checkout `the main checkout of the repository`, no shell, server or browser left running.

- Stage: **a correction for the human's remarks**, method `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant in the words of its row "a correction for the human's remarks", with `.the-way/task-cycle/change/fix.md` where the method sends you to it, and `.the-way/task-cycle/skill/foundation_step.md` (read it whole) for the entry you change.
- The remarks, word for word: `reports/correction-1-remarks.md` (the human's comment on the request). Of them only **item 2** of *Fix or let through* is yours: the older decision note on the screens of the game and the moves between them (D-280) lists among its *Rejected* ways "the same rows on Postać and in Wiedza" without the reservation that D-416's *Rejected* now has; the human says to correct it **in this request**: add the sentence that it rejects rows with the level, points and buying on two screens, not the shared layout of the row of a tree, in the same way as it was closed in the decision on the screen Wiedza (D-416). Items 1 and 3 are let through (nothing to do), item 4 the orchestrator has done itself, and items 5–7 are accepted.
- The task document kept D-280 "without change" (*Decisions in play*); the human's remark now binds and overrides that for the one clause. Change **only** that clause of D-280's *Rejected*, by the project skill for changing a decision, `.claude/skills/the-way-record-decision/SKILL.md` (read it by its path, you have no skill tool), following `foundation_step.md`; read D-280 whole and D-416's *Rejected* as the model of the wording; keep D-280's binding sentences, *Rationale*, *Verification* and every other *Rejected* way as they are. Where a test holds a sentence of D-280 by a line `decision:` and your change touches that sentence, say so; the clause you add is in a *Rejected*, which binds nothing, so none is expected. Change no other file.
- Checks: `python -B .the-way/elements/common/foundation_check.py` (full, without a switch that skips test citations), each with command and exit code in the report. No full gate (CI is the final gate). Commit by explicit path in one commit; do not push.
- Your directory for working copies: `.runs/author-correction-1/` (only if needed; remove before you return). Your report: `.runs/task-cycles/wyglad-ekranu-wiedzy/reports/author-correction-1-report.md`: status, the commit, what you changed with the meaning of the entry in one English sentence and one Polish sentence as your foundation step marks it, the checks with commands and exit codes, **Unread material**, **Searches not found or unclear**, working copies and what is left running (nothing). Return the status, the commit, a one-line check result and the report's path.

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
