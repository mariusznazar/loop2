# Handoff — reviewer of fix 2, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything; a question goes to the orchestrator in your report with status `questions`. You made none of the change. Nothing the orchestrator says is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Method: `review-change`, `.the-way/task-cycle/review/SKILL.md`, read whole; for the review of a fix read `.the-way/task-cycle/review/fix.md` and follow it.
- What is reviewed: **fix 2**, the fix of the one failure of the first gate run. Range: base `614f28f2` (the head that both reviews of the whole change and the review of the return step passed; take the full hash from `git log`) to head `faf603a0170750ded0474ee46d983901151956e3` (one commit, changing `src/browser/view/program-panel.tsx`). Compute the diff yourself; confirm `git rev-parse HEAD` is that head.
- The findings file the fix was given: `reports/gate-failure-findings.md` (`.runs/task-cycles/drobne-bledy-ekranow/reports/gate-failure-findings.md`). The fix report (claims to verify): `reports/fix-2-report.md`. The failing test: `tests/view/end-window-game.test.mjs:1022`. The cause the fix names: slice 8 (`85e379de`) made the rule panel close for good when it cannot find its open rule; `addDiscoveredRule` set `opening` before `controls.editCopy`, whose clock reading redraws the panel before the rule exists.
- The frozen task: `.runs/task-cycles/drobne-bledy-ekranow/task.md` (points 6, 7 and 15 are what slice 8 and 9 do and the fix must not undo); read D-306, D-350 and D-313 (the decision that gives the end-of-run window's „Dodaj regułę z tym”) whole, and `guidelines/coding-browser-module.md` whole (the rule „Efekty”).
- Judge: is the finding fixed (the defect no longer exists at the new head: run `npm.cmd test -- tests/view/end-window-game.test.mjs`); did the fix break anything else (a new Critical or Important finding counts as one that remains): check the other paths that set `opening` or that reach the open state in `program-panel.tsx` (the panel opened from a rule row, from the arrows, from the handle, from „✕”, from the end-of-run window and from a discovery band), and say whether the new order can open a panel on a rule that does not exist yet, or leave a panel open for a rule that was removed; run the focused tests of `tests/view/program-panel.test.mjs`, `tests/view/rule-editor.test.mjs`, `tests/view/program-editor.test.mjs`, `tests/view/run-screen.test.mjs`. The fix reports it left a sturdier alternative alone (closing the open state only when a rule that was once present is gone): say whether leaving it is acceptable or a finding.
- Read-only: no edit, no commit. Do not run the full suite (`npm test` without a file) and do not start the local game. Run `python -B .the-way/elements/common/foundation_check.py` (command and exit code).
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/review-fix-2-report.md` (first line `PASS <sha>` or `FAIL <sha>`); your directory for working copies: `.runs/review-fix-2/`.

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

As `review-change` gives it: the first line, graded findings (anchor `path:line`, full wording, expanded justification), checks with commands and exit codes, reaches beyond the handoff, **Unread material**, **Searches not found or unclear**, and the line on working copies. A Minor finding blocks nothing.
