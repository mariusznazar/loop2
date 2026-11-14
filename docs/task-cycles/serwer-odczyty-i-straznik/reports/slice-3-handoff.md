# Handoff - slice 3 of the task cycle `serwer-odczyty-i-straznik`

You make one slice of a planned change. The person who requested this cycle delegated intermediate
choices to the orchestrator; nothing you receive is that person's approval.

- Worktree (work from its root): `the root of the worktree`, branch `task/serwer-odczyty-i-straznik`. The slice's base is `b1e8ec993ffc91357c502201f1ee00ec47b698df`. Commit on this branch, path by path (`git add <file> ...`, never `git add -A`, `.` or `commit -a`), English commit messages in the style of `git log` of the repository. Do not push. Do NOT run the product's whole gate (`npm test`); the machine is short of memory and the gate is the orchestrator's. Run only the focused checks of the slice, one at a time.
- Method: the project skill `the-way-make-change`, whose `SKILL.md` is `.the-way/task-cycle/change/SKILL.md`; your variant is "a slice, or the retry of a slice"; read that `SKILL.md` whole, and a file it names only when the step that names it comes.
- Frozen task: `docs/task-cycles/serwer-odczyty-i-straznik/task.md` (Polish). Read the passages the slice's *Read* names. The plan: `docs/task-cycles/serwer-odczyty-i-straznik/plan.md` - the slice's section is copied below word for word; read nothing else of the plan.
- Answers of the orchestrator's step 4: the change touches a trust boundary (`deploy/**`, the watcher `deploy/loop2-watch`); no operation that cannot be undone. A slice's *Risk* is in its section.
- Report path: `docs/task-cycles/serwer-odczyty-i-straznik/reports/slice-3-report.md`. Return its status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line check result naming what failed or did not run, the report path, **Unread material** and **Searches not found or unclear**; the report has each check with its command and exit code, the own-work check your method asks for, and anything you reached beyond this handoff (name it).
- Foundation entries the earlier steps wrote: the four rows of *Settlements to record* are already written as edits of D-233, D-234 and D-356 (commit `9630fb90`); the decision ranges below are the current ones in this worktree and hold where they differ from the plan's *Read*.

## Current ranges of decisions named in the slice's *Read*

- D-12: `foundations/decisions.md:333-352`
- D-361: `foundations/decisions.md:9102-9116`

## The slice (copied word for word from `plan.md`)

### Slice 3 — The skill `loop2-deploy`: the allowed readings, the new kind and the accepted gaps

- **Goal:** in the skill's `SKILL.md`, in both copies, which stay byte for byte the same:
  (1) the list in "Agent or human" gains three readings for the agent — `docker compose version`;
  whether `logrotate` runs every day on the server (its timer or its entry in cron, a fixed read-only
  form the writer names); the names of the files `/var/log/loop2-app.log*`, without their content — and
  the form `gh run list --workflow check-address.yml --event schedule` (with a limit and the fields that
  give the times) next to the `gh` forms already there; each with the output it expects where that is
  fixed, as the neighbouring items do; nothing else of the list changes (D-12 does not change);
  (2) the table of the watcher's kinds in "The failure record and alerts" gains the sixth kind with
  its subject, the words copied from the constants of `deploy/loop2-watch` as slice 2 wrote them, and
  what an agent reads; the sentences on the throttle and the order say that this kind goes at most once
  in 24 hours, and that the browser kind still comes last;
  (3) "Accepted gaps of the watcher" says what the new signal covers and what it does not (a schedule of
  the backup that did not start is heard after about a day; the watcher reads only the line `end: sent`
  of the backup log, so the wording of that line is not changed without the watcher), names the case of
  a server without a working `flock` (the watcher ends with success and writes a line `skipped:` in its
  own log, nothing comes), and says the new kind works only once a human reinstalls `loop2-watch` from
  the merge commit, as "Installing a script from an exact commit" gives;
  (4) the sentence in "Database backups" that a cron that did not start writes nothing says that the
  watcher now reports a night without a send after 26 hours.
  Edit one copy and copy its bytes to the other with `cp`, never by two hand edits. The skill's test
  refuses an IPv6 literal and the host name of the provider's service (the text `mikr.us` and the
  provider's server names) in any file of the skill: use the words the neighbouring text uses.
  The rhythm of GitHub's scheduled runs (the same section) belongs to a later slice.
- **Change:** `.claude/skills/loop2-deploy/SKILL.md` · `.agents/skills/loop2-deploy/SKILL.md`
- **Read:** `.claude/skills/loop2-deploy/references/backup_and_restore.md:44-97` The log · `tests/agent_workflow/test_loop2_deploy_skill.py` · `deploy/loop2-watch:41-73` the constants of the watcher · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:31-32` To do, items 3 and 4 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:36-36` To do, item 8 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:40-40` To do, item 12 (only the form of the gh command it names) · `foundations/decisions.md:333-351` D-12 · `foundations/decisions.md:9081-9094` D-361 · rows 1 and 2 of the plan's Foundation entries, written as D-233 and D-356 before this slice
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` (it fails unless the two copies hold the same files byte for byte) · `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py`
- **Depends on:** Slice 2 · row 1 · row 2


## Notes from the orchestrator on the slice's *Read*

- The constants of the watcher, which the plan names as `deploy/loop2-watch:41-73`, now stand in the marked block at `deploy/loop2-watch:53-92`, after slice 2 added the sixth kind; the subject and the sentence of the sixth kind are there. Read `deploy/loop2-watch:1-110`. The words of the new kind in the skill are copied from those constants as they stand, never from memory.
- Slice 2's report, `docs/task-cycles/serwer-odczyty-i-straznik/reports/slice-2-report.md`, section "What the script does now", says what the watcher reads and what it ignores; read that section too.
- The two skill copies must end byte for byte the same: edit one, copy it over the other with `cp`, then compare with `cmp`.

## Note from the orchestrator on running tests on this machine

The machine is short of memory and the Git Bash child processes the tests start are slow. In the previous slice the named runner `python -B scripts/test.py <file>` did not finish in 17 minutes, and the same module run by `python -B -m unittest -v <module>` from the test file's directory (per class where a module is slow) did. Try the named runner first only with a bounded wait of about 10 minutes in the background; if it does not finish, run the substitute and report both commands and what each did, with exit codes. Run one check at a time. Never run `npm test`.
