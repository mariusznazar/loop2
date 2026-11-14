# Handoff - slice 7 of the task cycle `serwer-odczyty-i-straznik`

You make one slice of a planned change. The person who requested this cycle delegated intermediate
choices to the orchestrator; nothing you receive is that person's approval.

- Worktree (work from its root): `the root of the worktree`, branch `task/serwer-odczyty-i-straznik`. The slice's base is `629521e6048f7c7c9a4d5cc28b8a412236c9f5ba`. Commit on this branch, path by path (`git add <file> ...`, never `git add -A`, `.` or `commit -a`), English commit messages in the style of `git log` of the repository. Do not push. Do NOT run the product's whole gate (`npm test`); the machine is short of memory and the gate is the orchestrator's. Run only the focused checks of the slice, one at a time.
- Method: the project skill `the-way-make-change`, whose `SKILL.md` is `.the-way/task-cycle/change/SKILL.md`; your variant is "a slice, or the retry of a slice"; read that `SKILL.md` whole, and a file it names only when the step that names it comes.
- Frozen task: `docs/task-cycles/serwer-odczyty-i-straznik/task.md` (Polish). Read the passages the slice's *Read* names. The plan: `docs/task-cycles/serwer-odczyty-i-straznik/plan.md` - the slice's section is copied below word for word; read nothing else of the plan.
- Answers of the orchestrator's step 4: the change touches a trust boundary (`deploy/**`, the watcher `deploy/loop2-watch`); no operation that cannot be undone. A slice's *Risk* is in its section.
- Report path: `docs/task-cycles/serwer-odczyty-i-straznik/reports/slice-7-report.md`. Return its status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line check result naming what failed or did not run, the report path, **Unread material** and **Searches not found or unclear**; the report has each check with its command and exit code, the own-work check your method asks for, and anything you reached beyond this handoff (name it).
- Foundation entries the earlier steps wrote: the four rows of *Settlements to record* are already written as edits of D-233, D-234 and D-356 (commit `9630fb90`); the decision ranges below are the current ones in this worktree and hold where they differ from the plan's *Read*.

## Current ranges of decisions named in the slice's *Read*

- D-10: `foundations/decisions.md:295-310`
- D-14: `foundations/decisions.md:369-384`
- D-16: `foundations/decisions.md:406-431`
- D-17: `foundations/decisions.md:432-456`
- D-228: `foundations/decisions.md:4681-4707`
- D-231: `foundations/decisions.md:4770-4829`
- D-238: `foundations/decisions.md:5046-5080`
- D-355: `foundations/decisions.md:9012-9026`
- D-356: `foundations/decisions.md:9027-9041`

## The slice (copied word for word from `plan.md`)

### Slice 7 — Server readings of the host's facts, the installed copies, the backup log and `flock`

- **Goal:** the same conditions as slice 5; the facts' file only. Readings: (1) the six facts about the
  server (`loop2-host-forced-command-entry`, `loop2-host-installed-command`,
  `loop2-host-ssh-host-key-options`, `mikrus-host-docker-workloads`, `mikrus-host-swap`,
  `mikrus-tunnel-outbound-tcp`) are read again with the command each fact's *Source* names, within the
  allowed list (the counting command for root's SSH configuration is the one of "What an agent may read"
  in `references/backup_and_restore.md`), and each entry's *Source* is brought to the new run — edited in
  place, the sentence unchanged where the output says the same; a changed output changes the sentence,
  and the report names every decision and invariant that names the fact, for the return step;
  (2) the agreement of the six installed files (the deploy script, the backup script and its schedule, the
  watcher and its schedule, the logrotate file) with their sources in `/srv/loop2/deploy` by `cmp`, with the
  commit of that checkout named: one new fact; (3) the backup log: a bounded tail showing the nightly
  `made:` and `end: sent` lines of the recent nights: one new fact, the one that replaces the invariant
  `account-save-backup`, which the return step withdraws; (4) `flock`: that it works on the test server,
  shown by a bounded tail of `/var/log/loop2-watch.log` with a `skipped:` line for a held lock and
  `flock exit 1`: one new fact for D-356 (row 2 wrote D-356's sentence on a server without a working `flock`
  before this slice). Write nothing of the server's id, name, port or user that is not already in a fact.
  The report ends with "For the return step" as in slice 5.
- **Change:** `foundations/environment_facts.md`
- **Read:** `foundations/environment_facts.md:15-69` the facts of the server's host, from the forced command to the swap · `foundations/environment_facts.md:312-316` mikrus-tunnel-outbound-tcp · `foundations/decisions.md:295-308` D-10 · `foundations/decisions.md:369-383` D-14 · `foundations/decisions.md:406-430` D-16 · `foundations/decisions.md:432-455` D-17 · `foundations/decisions.md:4681-4706` D-228 · `foundations/decisions.md:4770-4828` D-231 · `foundations/decisions.md:5025-5058` D-238 · `foundations/decisions.md:8991-9004` D-355 · `foundations/decisions.md:9006-9019` D-356 · `foundations/invariants.md:1098-1106` account-save-backup · `foundations/environment_facts.md:480-484` sqlite-online-backup · `.claude/skills/loop2-deploy/references/backup_and_restore.md:44-97` The log · `.claude/skills/loop2-deploy/references/backup_and_restore.md:189-249` What an agent may read · `.claude/skills/loop2-deploy/SKILL.md:45-107` Agent or human · `deploy/loop2-watch:168-188` the watcher's own lock · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:32-32` To do, item 4 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:37-37` To do, item 9 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:97-103` Context, the readings of 2026-11-13 and 2026-11-14 · row 2 of the plan's Foundation entries, written as D-356 before this slice
- **Model:** same - a fact quotes the server's output word for word; a mis-transcription is a false fact in the foundation, and the report must hold the raw output (secrets removed) so that the whole-change review can compare it
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` · `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` · a search of `git diff` for the server's id, name, port and user finds none
- **Depends on:** Slice 6 · row 2


## Notes from the orchestrator on the readings of the server

- Tools: the `mikrus` MCP tools are deferred; load them with `ToolSearch` (`select:mcp__mikrus__servers,mcp__mikrus__exec`) before use. `servers` gives the server id the `exec` tool needs; keep it in your head only. The ID, the server name, the SSH port, the user and the address are never written to a file, a report, a commit message or a quoted output: where an output holds one, replace it by `<server>` in the report and in the fact and say that you did.
- Only the readings the skill `loop2-deploy` allows (section "Agent or human" of `.claude/skills/loop2-deploy/SKILL.md`, as it stands in this worktree), each exactly in the form the list gives, one at a time. Add nothing to a command: no `; echo`, no extra pipe or option beyond what the list allows for that reading. If a fact's *Source* command is not a reading the list allows, do not run it; keep that fact's entry as it is and say so in the report.
- Quote the output word for word in each fact (as the facts of slices 5 and 6 in `foundations/environment_facts.md` show), and put the raw output of every command, with secrets and the server identity removed, into your report beside the command. A claim in a fact the output does not carry is a defect.
- Facts are written through the project skill `the-way-record-environment-fact`; read its files when the step that names them comes. Do not edit any decision or invariant. Edit an existing fact's *Source* in place (the entry holds only its current wording).
- Do not read the account database, any secret file or the backup key: the backup log is read by a bounded tail only, as the list allows.

