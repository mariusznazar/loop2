# Handoff - slice 1 of the task cycle `serwer-odczyty-i-straznik`

You make one slice of a planned change. The person who requested this cycle delegated intermediate
choices to the orchestrator; nothing you receive is that person's approval.

- Worktree (work from its root): `the root of the worktree`, branch `task/serwer-odczyty-i-straznik`. The slice's base is `9630fb90ee9d405545455929a59842afe8e5a2a9`. Commit on this branch, path by path (`git add <file> ...`, never `git add -A`, `.` or `commit -a`), English commit messages in the style of `git log` of the repository. Do not push. Do NOT run the product's whole gate (`npm test`); the machine is short of memory and the gate is the orchestrator's. Run only the focused checks of the slice, one at a time.
- Method: the project skill `the-way-make-change`, whose `SKILL.md` is `.the-way/task-cycle/change/SKILL.md`; your variant is "a slice, or the retry of a slice"; read that `SKILL.md` whole, and a file it names only when the step that names it comes.
- Frozen task: `docs/task-cycles/serwer-odczyty-i-straznik/task.md` (Polish). Read the passages the slice's *Read* names. The plan: `docs/task-cycles/serwer-odczyty-i-straznik/plan.md` - the slice's section is copied below word for word; read nothing else of the plan.
- Answers of the orchestrator's step 4: the change touches a trust boundary (`deploy/**`, the watcher `deploy/loop2-watch`); no operation that cannot be undone. A slice's *Risk* is in its section.
- Report path: `docs/task-cycles/serwer-odczyty-i-straznik/reports/slice-1-report.md`. Return its status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line check result naming what failed or did not run, the report path, **Unread material** and **Searches not found or unclear**; the report has each check with its command and exit code, the own-work check your method asks for, and anything you reached beyond this handoff (name it).
- Foundation entries the earlier steps wrote: the four rows of *Settlements to record* are already written as edits of D-233, D-234 and D-356 (commit `9630fb90`); the decision ranges below are the current ones in this worktree and hold where they differ from the plan's *Read*.

## Current ranges of decisions named in the slice's *Read*

- D-235: `foundations/decisions.md:4956-4979`
- D-356: `foundations/decisions.md:9027-9041`

## The slice (copied word for word from `plan.md`)

### Slice 1 — A test for the second look at the deployment's lock with a broken `flock`

- **Goal:** the watcher looks at the deployment's lock twice in a run. The test file already shows
  that a broken `flock` (status 2 and 127) at the first look ends the run with a `skipped:` line that
  names the status and does not say the lock is held; the second look (the line that starts
  `dropped:`, in `deploy/loop2-watch`) has the same test only for a held lock (status 1). Add, in the
  class of the deployment's lock beside the held-lock case, a test in which the first look is free and
  the second look fails with `flock` status 2 and with 127: the run sends nothing, leaves the state file
  as it was so that the window stays open, writes one line that begins `dropped:` and names the status,
  and does not say the lock is held. The fixture can today only make the Nth look fail with status 1:
  extend that facility with a chosen status, the default and every existing call unchanged. The test
  cites no invariant (this is the watcher's own behaviour, loop2#71-23). Do not change
  `deploy/loop2-watch`. The test is written and seen to pass against the unchanged script (it describes
  behaviour that already exists); then show it failing once against a temporary change of
  `deploy/loop2-watch` that makes the second look treat every non-zero status as a held lock, and restore
  the file with `git checkout -- deploy/loop2-watch` before committing; `git diff` of that file is empty at
  the commit.
- **Change:** `tests/deploy/test_loop2_watch.py` · `tests/deploy/watch_script_support.py`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `deploy/loop2-watch` · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:33-33` To do, item 5 · `foundations/decisions.md:9006-9019` D-356 · `foundations/decisions.md:4935-4957` D-235
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B scripts/test.py tests/deploy/test_loop2_watch.py` · `python -B scripts/test.py tests/deploy/test_loop2_watch_message.py` (it shares the changed fixture) · `python -B scripts/test.py tests/quality/test_quality_invariants.py` · the failing run against the temporary mutation, shown in the report
- **Depends on:** none


