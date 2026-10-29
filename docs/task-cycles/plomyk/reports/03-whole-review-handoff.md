# Handoff — review of the whole change, task `plomyk`

## Delegation

The human (Mariusz) started this the-way task cycle with `/the-way-implement-task` and delegated
every intermediate choice to the cycle's orchestrator. Nothing here is the human's approval; the
human decides at the pull request. Questions go to the orchestrator through your report, never to
the human. You did not make any part of this change.

## What you review

**The whole change.** Method: read `.the-way/task-cycle/review/SKILL.md` whole, from the worktree
below, and follow it — for the whole change it sends you to `whole_change.md` beside it. Read a file
it names only when the step that names it comes. You select your own foundation entries and
guidelines by the parts of the change, as your method gives. The review is read-only: no commit, no
edit of tracked files.

- Worktree: `C:\Storage\repos\loop2-wt\plomyk` (work from its root), branch `task/plomyk`.
- Range: base `b8ac134a1157dae687a2ba97b58a5d4e9feec121` (`main`) to head `c12faa3`.
  Commits: `1d25143` (the pin move, the orchestrator's), `bf99953` (code and tests), `c12faa3`
  (foundation entries).
- Frozen task, read whole: `.runs/task-cycles/plomyk/task.md`.
- No spec and no plan: the orchestrator found no open design choice and chose one author without a
  plan (reasons in the author's handoff `.runs/task-cycles/plomyk/reports/01-author-handoff.md`,
  section *Task*, which you may read for the selection and the reading of *Questions carried to
  cycle* the author was given).
- Author's report: `.runs/task-cycles/plomyk/reports/02-author-report.md` — claims to verify, not
  evidence. Beside it the To do 8 measurement: `measurement-20-seeds.md`, `measurement.mjs`,
  `measurement-20-seeds.json`.

## The pin move

The task branch's first commit `1d25143` moves the-way's pin from `3aee7d9` to `a8dfe8a` (head of
the-way's `origin/foundations`, its default branch), at the human's request. It was made by the
installer (`installation/install.py` of a clone at `a8dfe8a`): check that it holds only the gitlink
at `a8dfe8ac62885e88bc8f463e93ab16b621d48e92` and what the installer owns — the `the-way-*` entry
points in `.claude/skills/` and `.agents/skills/` (and in `AGENTS.md` the block between its markers,
which this move left unchanged). Checks the move carried: none — `npm test` on `1d25143` exit 0.
On the base, no check fails with the documented environment.

## Answers of step 4

- Trust boundary: no — the only boundary in the parts touched is `assets/icons/**` and
  `assets/fonts/**` of `browser-view`, not touched.
- Irreversible operation: no.

## Notes for your checks

- `.runs/quality-venv` holds ruff 0.17.1 and ShellCheck 0.11.0; do not delete it.
- The orchestrator runs the product's full gate (`npm test`) itself after your review; run the
  checks your method gives.

## Report

Write the full report to `.runs/task-cycles/plomyk/reports/04-whole-review-report.md` as your
method gives it, first line `PASS <sha>`, `FAIL <sha>` or `questions`, including **Searches not
found or unclear**. Return: the first line, a one-line check result naming what failed or did not
run, and the report's path.
