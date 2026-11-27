# Handoff — review of the whole change (task kafelek-postaci-w-siedzibie)

You are the reviewer of the whole change in the task cycle of the-way (`implement-task`). You did not
make the change. The person who requested this cycle has delegated intermediate choices to the
orchestrator; no human answers questions during the review.

## Where and what

- Worktree (your working directory): `the root of the task's worktree`, branch `task/kafelek-postaci-w-siedzibie`. Pinned the-way: `.the-way` of the worktree at `6ed3cb364adedacea214d2a0df690cea32f2e72f`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), the review of the whole change — read it whole, then `whole_change.md` beside it as it directs; other files it names only when the step or variant that names them comes.
- Range: base `d79ad0b7fc3972bf2b2fb3124c593522f01eda92` to head `d19e5445` (confirm `git rev-parse HEAD`; compute the diff yourself with `git diff d79ad0b7..HEAD` and `git log d79ad0b7..HEAD`). Three commits: `3d8cb03d` (foundation entries and the requoted tests), `03ff7633` (code and tests), `d19e5445` (styleguide).
- The frozen task, the whole of it: `.runs/task-cycles/kafelek-postaci-w-siedzibie/task_frozen.md`. There is no spec and no plan; one author without a plan made the change (a slice-less change: you judge the whole change).
- The author's report (claims to verify, not evidence): `.runs/task-cycles/kafelek-postaci-w-siedzibie/reports/author-report.md`.
- Answers of the orchestrator at start: trust boundary: no; irreversible operation: no; the task moved no pin; no task decision was renumbered. The checks that failed on the base: none (list empty, from the green CI of the merged request #184).
- The cycle's return step (comparison of the foundation with the code, the glossary, the part map) comes after your review: do not ask for it, but judge the foundation entries the author wrote.

## Carried from the author's report (gaps for you to judge, from the orchestrator's reading of its **Unread material**)

- The author read the decisions of the task's *Decisions in play* that the change does not alter (D-218, D-244, D-245, D-282, D-287, D-54, D-51, D-52, D-279, D-275, D-265, D-396, D-418, D-419, D-38, D-43, D-40) by their binding sentences only; the glossary and the part-map entry `browser-view` (beyond its first 30 lines) were not read; `.claude/skills/loop2-scene-art/SKILL.md` was not read (no picture or effect of the scene changed).
- The author's own search found: the rationale of D-389 still says „since „Drużyna” speaks of earning loops alone” — judge whether it is now false and whether it belongs to this change (the orchestrator's return step can correct a foundation entry that no longer matches the code).
- The author made eight choices of look, words and spacing inside the limits of the task's To do 13 and answer 5 (its report, "Departures"); judge that each stays inside the human's answers and that none takes a variant the human did not choose.
- The change contains screenshots, published at the public repository `mariusznazar/screenshots`, branch `loop2/kafelek-postaci-w-siedzibie`, commit `c47fe3e51ca0c483600d2d5adf0a3964db0adeb4`, directory `loop2/kafelek-postaci-w-siedzibie/` (file names in the author's report). You may look at them where your tools allow (`gh api`/raw link); judge the appearance from them and from the code, as `whole_change.md` and the criteria for appearance in `review-change` give; where you cannot see a screenshot, say so in your report as unchecked, never as passed.

## What you read (the orchestrator's selection for the guidelines; you select your own foundation)

- You select your own foundation and guidelines by the parts of the change, as `whole_change.md` gives. The parts: `browser-view` (all code, the styleguide) and the foundation file entries the change edits. The task's *Decisions in play* are the decisions it names. Guidelines (whole): `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`; `src/browser/AGENTS.md`.
- Old Loop (read-only, for the comparison of the tile): repository `the old Loop's repository`, branch `origin/test` at `715026e`, `git -C the old Loop's repository show origin/test:src/components/probe/CharacterTile.tsx` (and `RosterPanel.tsx`, `AwaySummary.tsx`).

## Rules you carry (the human's, via the orchestrator)

- No full gate: never run the product's full gate (`npm test` of the whole repository, `gate_times.py`); its run is the orchestrator's or CI's. You may run focused checks (one test file by the repository's way for one file, `npm run typecheck`, `python -B .the-way/elements/common/foundation_check.py`) and mutation probes of your own in your working copy, never in the worktree's tracked files without restoring them; leave the worktree clean.
- No shell left behind: stop every process you start in the background (local server, browser) before you return, and name it in the line on working copies.
- You are read-only toward the code: you write no commit.

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

Your directory for working copies: `.runs/review-whole/`. (`reports/` means `.runs/task-cycles/kafelek-postaci-w-siedzibie/reports/`.)

## Your report

Write the full report to `.runs/task-cycles/kafelek-postaci-w-siedzibie/reports/review-whole-report.md` (the file is the input of the cycle's scripts — `task-cycle/remarks_check.py` reads it). Where you are refused the write, return the report whole as your answer. Its first line is `PASS <sha>` or `FAIL <sha>`, as the method gives; then the form the method gives: graded findings with the mark of contradiction with the settlements, each blocking finding naming that it comes from no slice (a one-author change has no slices), the Minor findings you list that fall within the task (to be fixed before the request opens) separated from those outside the task's scope, the count of decisions you read whole, the checks you ran with command and exit code, **Unread material** and **Searches not found or unclear**, and the line on working copies. `cycle.md` and the other files of the record's directory are not yours to read: this handoff names the frozen task, the author's report and its own handoff only.

Return to the orchestrator: the report's first line, a one-line check result naming what failed or did not run, and the report's path.
