# Handoff — the review of the second return step's commit (task rana-i-opatrunek)

You review the commit of the return step over correction 1 with `review-change`, as a fresh agent of the type `the-way-stage` that made none of the change, on `opus` (the human asked for this round's reviews on `opus`). Read `.the-way/task-cycle/review/SKILL.md` whole; the return step's commits are reviewed as its section 2 gives, against the task and the foundation entries the step writes or corrects. Read-only on the reviewed worktree.

- Range: `26c0209e8a9bb9b882fce390ab61b12300562059` to `69b8d977…` (`git rev-parse HEAD` in the worktree `the worktree's root` shows the head; one commit, `foundations/decisions.md` only: the clause `tests:` of the *Verification* of D-120). Compute the diff yourself.
- The step's report (claims to verify): `.runs/task-cycles/rana-i-opatrunek/reports/return-step-2-report.md`; its handoff: `reports/return-step-2-handoff.md`; the method: `.the-way/task-cycle/skill/return_step.md` (whole). The correction that the step compared: `reports/correction-1-remarks.md`, range `83204edc..26c0209e`, tests `tests/sim/action-targets.test.mjs` and `tests/sim/repertoire.test.mjs`; the frozen task `.runs/task-cycles/rana-i-opatrunek/task_frozen.md` binds.
- Check: that the new clause names tests that really hold the sentence of D-120 as the correction left it (the test names it cites exist and fail when the pair is judged by the kind); that no binding sentence changed; the form of the entry (`.the-way/elements/decisions/template.md`); that the step's decision to write **no** entry for the guideline sentence of the correction (D-206 unchanged) is sound against `return_step.md` (the rule for a choice that binds after the merge, and the human's remark that asked for the guideline sentence only), and its report's list of entries it found unchanged. `python -B .the-way/elements/common/foundation_check.py` in a worktree of the head (`.runs/review-return-2/`, `.the-way` populated, `node_modules` a junction to the main checkout's; remove the junction first with `rmdir`), exit 0.
- Do not run the whole suite. Report: `.runs/task-cycles/rana-i-opatrunek/reports/review-return-2-report.md`, first line `PASS <head sha>` or `FAIL <head sha>`; findings by grade; **Declined to judge**; checks with command and exit code; reaches; working copies; **Unread material**; **Searches not found or unclear**. Return the first line, the counts, a one-line check result and the path.

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

