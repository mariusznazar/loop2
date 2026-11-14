# Handoff - slice 5 of the task cycle `serwer-odczyty-i-straznik`

You make one slice of a planned change. The person who requested this cycle delegated intermediate
choices to the orchestrator; nothing you receive is that person's approval.

- Worktree (work from its root): `the root of the worktree`, branch `task/serwer-odczyty-i-straznik`. The slice's base is `9f4d6657dd9edc7f5375f0b79f6daabd9e99b3df`. Commit on this branch, path by path (`git add <file> ...`, never `git add -A`, `.` or `commit -a`), English commit messages in the style of `git log` of the repository. Do not push. Do NOT run the product's whole gate (`npm test`); the machine is short of memory and the gate is the orchestrator's. Run only the focused checks of the slice, one at a time.
- Method: the project skill `the-way-make-change`, whose `SKILL.md` is `.the-way/task-cycle/change/SKILL.md`; your variant is "a slice, or the retry of a slice"; read that `SKILL.md` whole, and a file it names only when the step that names it comes.
- Frozen task: `docs/task-cycles/serwer-odczyty-i-straznik/task.md` (Polish). Read the passages the slice's *Read* names. The plan: `docs/task-cycles/serwer-odczyty-i-straznik/plan.md` - the slice's section is copied below word for word; read nothing else of the plan.
- Answers of the orchestrator's step 4: the change touches a trust boundary (`deploy/**`, the watcher `deploy/loop2-watch`); no operation that cannot be undone. A slice's *Risk* is in its section.
- Report path: `docs/task-cycles/serwer-odczyty-i-straznik/reports/slice-5-report.md`. Return its status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line check result naming what failed or did not run, the report path, **Unread material** and **Searches not found or unclear**; the report has each check with its command and exit code, the own-work check your method asks for, and anything you reached beyond this handoff (name it).
- Foundation entries the earlier steps wrote: the four rows of *Settlements to record* are already written as edits of D-233, D-234 and D-356 (commit `9630fb90`); the decision ranges below are the current ones in this worktree and hold where they differ from the plan's *Read*.

## Current ranges of decisions named in the slice's *Read*

- D-09: `foundations/decisions.md:273-294`
- D-12: `foundations/decisions.md:333-352`
- D-17: `foundations/decisions.md:432-456`
- D-237: `foundations/decisions.md:5013-5045`

## The slice (copied word for word from `plan.md`)

### Slice 5 — Server readings from the deploy log: the break at a deployment, the resource gate, the build exit

- **Goal:** the agent reads the server and writes down what it read as environment facts. This slice
  needs the `mikrus` MCP tools (`servers` and `exec`) — deferred tools whose schemas must be loaded
  first — and reads only within the list "Agent or human" of the skill `loop2-deploy` as slice 3 left it,
  by bounded commands; if a reading seems to need something not on the list, stop and return. It copies
  the server's id, name, SSH port, user, address or any secret into no file and no request, and changes
  nothing on the server. Readings, from the deploy log: (D-09) the interval, by the log's own times,
  between the line `dump:` and the line `deployed` of the recent deployments — the real break in access
  of a deployment; (D-17) the `resources:` lines of the recent deployments (available memory and free
  Docker space against the thresholds) and whether any run ended at exit 5; (D-237) whether any run ended
  at exit 7 and what the log names then. Each result is written, through the project skill
  `the-way-record-environment-fact`, as a fact whose source is the reading: the command, the host, the
  tool and its version, the output (the lines the sentence rests on) word for word, and the date it ran.
  The slice changes only the facts' file: it edits no decision (the return step names the facts in
  *Based on* and corrects the *Rationale* of D-09, which says "a dozen or so seconds") and withdraws no
  invariant. The slice's report ends with the part "For the return step": for each fact, the decisions that
  should name it and, in plain words with the date, what the reading shows against what the decision says.
  Where a reading contradicts an entry in a way the writer cannot resolve, return with it.
- **Change:** `foundations/environment_facts.md`
- **Read:** `deploy/loop2-deploy` · `.claude/skills/loop2-deploy/SKILL.md:45-107` Agent or human · `.claude/skills/loop2-deploy/SKILL.md:109-165` Seeing deployments and Log stages and exit codes · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:37-37` To do, item 9 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:97-103` Context, the readings of 2026-11-13 and 2026-11-14 · `foundations/decisions.md:273-293` D-09 · `foundations/decisions.md:432-455` D-17 · `foundations/decisions.md:4992-5023` D-237 · `foundations/decisions.md:333-351` D-12
- **Model:** same - a fact quotes the server's output word for word; a mis-transcription is a false fact in the foundation, and the report must hold the raw output (secrets removed) so that the whole-change review can compare it
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` · `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` · the executor searches `git diff` for the server's id, name, port and user it saw and finds none
- **Depends on:** Slice 3


## Notes from the orchestrator on the readings of the server

- Tools: the `mikrus` MCP tools are deferred; load them with `ToolSearch` (`select:mcp__mikrus__servers,mcp__mikrus__exec`) before use. `servers` gives the server id the `exec` tool needs; keep it in your head only. The ID, the server name, the SSH port, the user and the address are never written to a file, a report, a commit message or a quoted output: where an output holds one, replace it by `<server>` in the report and in the fact and say that you did.
- Only the readings the skill `loop2-deploy` allows (section "Agent or human" of `.claude/skills/loop2-deploy/SKILL.md`, as it stands in this worktree), bounded, one at a time. If a reading seems to need something not on that list, stop that reading and say so in the report; do not run it.
- Quote the output word for word in each fact (the form of the template: `reading: <command> on <host>, <tool and its version> - "<output>"; run <date>`), and put the raw output of every command, with secrets and the server identity removed, into your report beside the command, so that the review of the whole change can compare the fact with it. A claim in a fact the output does not carry is a defect.
- Facts are written through the project skill `the-way-record-environment-fact`; read its files when the step that names them comes. A new fact stands without a dependant until the return step names it; do not edit any decision or invariant.
- "wyjscia 7" in item 9 of the task is read as exit 7 of the deploy script, as the skill's table of exit codes gives; if the deploy log holds no exit 7, the fact says what the log shows (no run ended so) and for which window.

