# Handoff - slice 4 of the task cycle `serwer-odczyty-i-straznik`

You make one slice of a planned change. The person who requested this cycle delegated intermediate
choices to the orchestrator; nothing you receive is that person's approval.

- Worktree (work from its root): `the root of the worktree`, branch `task/serwer-odczyty-i-straznik`. The slice's base is `f91123b3bcb802df6a82453a52da33a2079d420f`. Commit on this branch, path by path (`git add <file> ...`, never `git add -A`, `.` or `commit -a`), English commit messages in the style of `git log` of the repository. Do not push. Do NOT run the product's whole gate (`npm test`); the machine is short of memory and the gate is the orchestrator's. Run only the focused checks of the slice, one at a time.
- Method: the project skill `the-way-make-change`, whose `SKILL.md` is `.the-way/task-cycle/change/SKILL.md`; your variant is "a slice, or the retry of a slice"; read that `SKILL.md` whole, and a file it names only when the step that names it comes.
- Frozen task: `docs/task-cycles/serwer-odczyty-i-straznik/task.md` (Polish). Read the passages the slice's *Read* names. The plan: `docs/task-cycles/serwer-odczyty-i-straznik/plan.md` - the slice's section is copied below word for word; read nothing else of the plan.
- Answers of the orchestrator's step 4: the change touches a trust boundary (`deploy/**`, the watcher `deploy/loop2-watch`); no operation that cannot be undone. A slice's *Risk* is in its section.
- Report path: `docs/task-cycles/serwer-odczyty-i-straznik/reports/slice-4-report.md`. Return its status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line check result naming what failed or did not run, the report path, **Unread material** and **Searches not found or unclear**; the report has each check with its command and exit code, the own-work check your method asks for, and anything you reached beyond this handoff (name it).
- Foundation entries the earlier steps wrote: the four rows of *Settlements to record* are already written as edits of D-233, D-234 and D-356 (commit `9630fb90`); the decision ranges below are the current ones in this worktree and hold where they differ from the plan's *Read*.

## Current ranges of decisions named in the slice's *Read*

- D-234: `foundations/decisions.md:4917-4955`
- D-360: `foundations/decisions.md:9087-9101`

## The slice (copied word for word from `plan.md`)

### Slice 4 — The instruction of the restore trial: the rhythm and the list "Not tried"

- **Goal:** in `references/backup_and_restore.md`, in both copies, byte for byte the same:
  (1) the instruction of the trial on the owner's computer ("Trying a backup on the owner's computer")
  says that the owner repeats the trial every month and after each change of the database's schema
  version or of the saved game's version, instead of one trial before the change that brings the backups
  merges, in the words D-234 now has (row 3); (2) the list "Not tried" of "Restoring over the server's
  database" names also the `( umask 077; … )` subshells of step 2, of step 2 for the old key and of the
  secrets file in step 8, and says the paths of the list stay untried as an accepted cost (row 4); (3) the bullet
  of "The log" that says a cron that did not start writes nothing, and that the notice comes only
  from a run that started, says also that the watcher reports a night without a send after 26 hours.
  Touch nothing else in the file: another task changes its restore procedure and D-360 later. Edit one
  copy and copy its bytes to the other with `cp`. No IPv6 literal and no provider host name in the
  file (the skill's test refuses them).
- **Change:** `.claude/skills/loop2-deploy/references/backup_and_restore.md` · `.agents/skills/loop2-deploy/references/backup_and_restore.md`
- **Read:** `tests/agent_workflow/test_loop2_deploy_skill.py` · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:34-35` To do, items 6 and 7 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:56-65` Questions to settle, the schedule of the trial and the untried paths · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:154-156` Settlements to record, rows 2 to 4 · `foundations/decisions.md:4906-4933` D-234 · `foundations/decisions.md:9066-9079` D-360 (read, never changed here) · rows 3 and 4 of the plan's Foundation entries, written as D-234 before this slice
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` · `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py`
- **Depends on:** Slice 3 · row 3 · row 4


## Note from the orchestrator

The slice before you (commit f91123b3) already changed `SKILL.md` of the skill in both copies; do not touch it. Edit one copy of `references/backup_and_restore.md`, copy it over the other with `cp`, compare with `cmp`.
## Note from the orchestrator on running tests on this machine

The machine is short of memory and the Git Bash child processes the tests start are slow. In the previous slice the named runner `python -B scripts/test.py <file>` did not finish in 17 minutes, and the same module run by `python -B -m unittest -v <module>` from the test file's directory (per class where a module is slow) did. Try the named runner first only with a bounded wait of about 10 minutes in the background; if it does not finish, run the substitute and report both commands and what each did, with exit codes. Run one check at a time. Never run `npm test`.
