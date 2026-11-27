# Handoff — the review of the return step's commits (task rana-i-opatrunek)

You review the commits of the return step with `review-change` as an agent of the type `the-way-stage` that made none of the change (read `.the-way/task-cycle/review/SKILL.md` whole; the return step's commits are reviewed as its section 2 gives: **against the task and the foundation entries the return step writes or corrects**). You are read-only on the reviewed worktree.

- Range: `55c7d624dfde1e919febe5a1953e0c6dd78f66ad` to `85a623e4…` (`git rev-parse HEAD` in the worktree `the worktree's root` shows the head; one commit, `85a623e4`, touching `foundations/decisions.md` only). Compute the diff yourself.
- The return step's report (claims to verify): `.runs/task-cycles/rana-i-opatrunek/reports/return-step-report.md`; its handoff, which says what it was to do: `reports/return-step-handoff.md`. The frozen task: `.runs/task-cycles/rana-i-opatrunek/task_frozen.md` (read whole; sha256 `55c86eaf63df7156`). The method of the return step: `.the-way/task-cycle/skill/return_step.md` (read whole), and `.the-way/elements/decisions/template.md` and `.the-way/elements/common/rules.md` for the form of the entries you judge.
- What to check: that each entry the return step changed (D-144, D-145, D-150, D-199, D-387, D-379, D-363, D-443, D-195, D-193, D-380, D-340, D-147, D-120, D-416) says what the code does and what the tests hold (the clause `tests:` names a test that really holds the sentence; a pair of examples stays only for a part no test holds; the D-416 count is right: nine trees and eighteen branches — check the data); that no binding sentence changed in meaning without a reason; that no choice that binds after the merge was left out that the handoff's item 5 lists (or that the report's reason for leaving it as a row is sound); that the foundation check passes (`python -B .the-way/elements/common/foundation_check.py`, exit 0, run in a worktree of the head in `.runs/review-return/` with `.the-way` populated and `node_modules` a junction to `the `node_modules` of the main checkout` — remove the junction first with `rmdir` before you remove the worktree).
- Do not run the whole suite. Report: `.runs/task-cycles/rana-i-opatrunek/reports/review-return-report.md`, first line `PASS <head sha>` or `FAIL <head sha>`; findings by grade as the method gives; **Declined to judge**, checks with command and exit code, reaches, working copies, **Unread material**, **Searches not found or unclear**. Return the first line, the counts, a one-line check result and the path.

## Working copies (word for word)

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

