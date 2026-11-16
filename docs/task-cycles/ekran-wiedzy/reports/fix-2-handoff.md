# Handoff — the fix of the return step's review (fix round 2), task `ekran-wiedzy`

You are the one author, resumed, and you fix the one blocking finding of the review of your return step with `make-change`, variant **"the fix of a review's findings"** (`.the-way/task-cycle/change/SKILL.md`, and `fix.md` beside it, which you did not open in round 1: read it now). The orchestrator's notes are provisional, never the human's approval.

- Worktree: `the root of the task's worktree`, branch `task/ekran-wiedzy`, the reviewed head `42e15a5daf2a3ecf00da8ff9d5737063802d0531` (your return-step commit). Your fix range starts there. Your directory for working copies: `.runs/author-fix-2/`.
- The findings file: `reports/review-return-findings.md` (full path `docs/task-cycles/ekran-wiedzy/reports/review-return-findings.md`) — the one blocking finding **I1** in the reviewer's words; there are no Minor findings. The full review: `reports/review-return-report.md`.
- Your report: `docs/task-cycles/ekran-wiedzy/reports/fix-2-report.md`.

## What to do

Fix I1 as small as the finding asks: in D-280's *Rejected* (`foundations/decisions.md`, the sentence that calls „Konta” "a fourth item" of the menu bar) change only the ordinal, so that the sentence is true for a bar of four items. Of the two wordings the reviewer gives, prefer "one more item" (it needs no correcting at the next screen); "a fifth item" is acceptable. Change nothing else in D-280 or elsewhere — **m2** and **n1** stay for the request's list, and the reviewer found no other stale sentence (it searched `foundations/` for the ordinals and the item lists). Check for yourself, with a search of the whole of `foundations/` and `guidelines/` for "fourth", "third item", "three items", "first three" and the like, that no other sentence counts the bar's items or screens in a way the change made untrue; name in your report each hit and why it is true or what you corrected (a correction of another sentence of the same kind belongs in this fix, and the report names it).

Commit by explicit paths, one commit, English message in the style of `42e15a5d`. Run the affected checks again (`python -B .the-way/elements/common/foundation_check.py`, with test citations, and `python -B .the-way/instruction-files/check_instructions.py`) and give each command with its exit code. No full gate (`npm test` without a file); no push. Do not touch the record `.runs/task-cycles/` besides your report.

## Working copies (word for word from the cycle's skill)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Return

The full report as `fix.md` gives it — the finding fixed with how and the check that shows it, or contested with evidence — with your **Unread material** and **Searches not found or unclear** (`none` is an answer), checks with commands and exit codes, the commit, and your working copies.
