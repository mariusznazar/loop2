# Handoff - slice 6 of the task cycle `serwer-odczyty-i-straznik`

You make one slice of a planned change. The person who requested this cycle delegated intermediate
choices to the orchestrator; nothing you receive is that person's approval.

- Worktree (work from its root): `the root of the worktree`, branch `task/serwer-odczyty-i-straznik`. The slice's base is `55170ef8f9867411a08a94985795680eb5b3e09c`. Commit on this branch, path by path (`git add <file> ...`, never `git add -A`, `.` or `commit -a`), English commit messages in the style of `git log` of the repository. Do not push. Do NOT run the product's whole gate (`npm test`); the machine is short of memory and the gate is the orchestrator's. Run only the focused checks of the slice, one at a time.
- Method: the project skill `the-way-make-change`, whose `SKILL.md` is `.the-way/task-cycle/change/SKILL.md`; your variant is "a slice, or the retry of a slice"; read that `SKILL.md` whole, and a file it names only when the step that names it comes.
- Frozen task: `docs/task-cycles/serwer-odczyty-i-straznik/task.md` (Polish). Read the passages the slice's *Read* names. The plan: `docs/task-cycles/serwer-odczyty-i-straznik/plan.md` - the slice's section is copied below word for word; read nothing else of the plan.
- Answers of the orchestrator's step 4: the change touches a trust boundary (`deploy/**`, the watcher `deploy/loop2-watch`); no operation that cannot be undone. A slice's *Risk* is in its section.
- Report path: `docs/task-cycles/serwer-odczyty-i-straznik/reports/slice-6-report.md`. Return its status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line check result naming what failed or did not run, the report path, **Unread material** and **Searches not found or unclear**; the report has each check with its command and exit code, the own-work check your method asks for, and anything you reached beyond this handoff (name it).
- Foundation entries the earlier steps wrote: the four rows of *Settlements to record* are already written as edits of D-233, D-234 and D-356 (commit `9630fb90`); the decision ranges below are the current ones in this worktree and hold where they differ from the plan's *Read*.

## Current ranges of decisions named in the slice's *Read*

- D-10: `foundations/decisions.md:295-310`
- D-12: `foundations/decisions.md:333-352`
- D-205: `foundations/decisions.md:3965-3987`
- D-355: `foundations/decisions.md:9012-9026`

## The slice (copied word for word from `plan.md`)

### Slice 6 — Server readings of the running containers, the game's log and `logrotate`: ports, memory, `SQLITE_BUSY`, Compose, rotation

- **Goal:** the same conditions as slice 5 (the `mikrus` MCP tools; only the allowed readings, which now
  include the three of slice 3; no copy of the server's id, name, port, user, address or a secret; nothing
  changed on the server; each result a fact whose source is the reading word for word, written through
  the project skill `the-way-record-environment-fact`; no decision edited). Readings: (D-10, and the
  invariant `loop2-application-port`) `docker stats --no-stream` of the two containers, and the ports the
  containers publish, from `docker ps` and `docker compose -p loop2 ps` — write the published ports as a
  fact of their own, because slice 10 takes the server part out of `loop2-application-port` and the
  return step makes D-10 name this fact; (D-205) the failure lines with `SQLITE_BUSY` in the game's log, by
  a bounded `grep -F` of the running containers' log, the dump and its rotated files, and how many there
  are; (D-355) the version of Compose, whether `logrotate` runs every day, and the names of the files
  `/var/log/loop2-app.log*` (D-355's *Rationale* says nobody has checked the daily run and the version; the
  return step corrects it from these facts). Besides: slice 3 added to the skill's list of readings three expectations that were not read on the server - `systemctl is-enabled logrotate.timer` expects `enabled`, `systemctl cat logrotate.timer` holds the line `OnCalendar=daily`, and `ls /etc/cron.daily/logrotate` and the names of `/var/log/loop2-app.log*`; read each of them on the server and bring the skill's text in "Agent or human" to what the reading shows (a different expectation, or the reading removed from the list where the server answers otherwise), in both copies of `SKILL.md`: edit one and copy it over the other with `cp`, then `cmp`; that is the only change to the skill here. The report ends with "For the return step" as in slice 5.
- **Change:** `foundations/environment_facts.md` · `.claude/skills/loop2-deploy/SKILL.md` · `.agents/skills/loop2-deploy/SKILL.md`
- **Read:** `compose.yaml` · `deploy/loop2-app.logrotate` · `.claude/skills/loop2-deploy/SKILL.md:45-107` Agent or human · `.claude/skills/loop2-deploy/SKILL.md:251-342` The failure record and alerts · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:36-37` To do, items 8 and 9 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:97-103` Context, the readings of 2026-11-13 and 2026-11-14 · `foundations/decisions.md:295-308` D-10 · `foundations/decisions.md:3965-3986` D-205 · `foundations/decisions.md:8991-9004` D-355 · `foundations/decisions.md:333-351` D-12 · `foundations/environment_facts.md:312-316` mikrus-tunnel-outbound-tcp · `foundations/invariants.md:145-153` loop2-application-port
- **Model:** same - a fact quotes the server's output word for word; a mis-transcription is a false fact in the foundation, and the report must hold the raw output (secrets removed) so that the whole-change review can compare it
- **Risk:** none
- **Checks:** `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` · `python -B .the-way/elements/common/foundation_check.py` · `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` · a search of `git diff` for the server's id, name, port and user finds none
- **Depends on:** Slice 5


## Notes from the orchestrator on the readings of the server

- Tools: the `mikrus` MCP tools are deferred; load them with `ToolSearch` (`select:mcp__mikrus__servers,mcp__mikrus__exec`) before use. `servers` gives the server id the `exec` tool needs; keep it in your head only. The ID, the server name, the SSH port, the user and the address are never written to a file, a report, a commit message or a quoted output: where an output holds one, replace it by `<server>` in the report and in the fact and say that you did.
- Only the readings the skill `loop2-deploy` allows (section "Agent or human" of `.claude/skills/loop2-deploy/SKILL.md`, as it stands in this worktree, with the readings slice 3 added), bounded, one at a time. If a reading seems to need something not on that list, stop that reading and say so in the report; do not run it.
- Quote the output word for word in each fact (the form of the template, as the facts of slice 5 in `foundations/environment_facts.md`, commit `55170ef8`, show), and put the raw output of every command, with secrets and the server identity removed, into your report beside the command, so that the review of the whole change can compare the fact with it. A claim in a fact the output does not carry is a defect.
- Facts are written through the project skill `the-way-record-environment-fact`; read its files when the step that names them comes. A new fact stands without a dependant until the return step names it; do not edit any decision or invariant.
- The slice section above has the one change to the skill (the expectations of slice 3); the skill's two copies must end byte for byte the same. The tool `exec` shows an apostrophe as `&#039;` in its output; the facts of slice 5 quote the apostrophe, as the script's own text has it.

