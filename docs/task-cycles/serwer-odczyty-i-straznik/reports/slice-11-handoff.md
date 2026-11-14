# Handoff - slice 11 of the task cycle `serwer-odczyty-i-straznik`

You make one slice of a planned change. The person who requested this cycle delegated intermediate
choices to the orchestrator; nothing you receive is that person's approval.

- Worktree (work from its root): `the root of the worktree`, branch `task/serwer-odczyty-i-straznik`. The slice's base is `628e637b184c0519fd675d05e26ea39339a5e435`. Commit on this branch, path by path (`git add <file> ...`, never `git add -A`, `.` or `commit -a`), English commit messages in the style of `git log` of the repository. Do not push. Do NOT run the product's whole gate (`npm test`); the machine is short of memory and the gate is the orchestrator's. Run only the focused checks of the slice, one at a time.
- Method: the project skill `the-way-make-change`, whose `SKILL.md` is `.the-way/task-cycle/change/SKILL.md`; your variant is "a slice, or the retry of a slice"; read that `SKILL.md` whole, and a file it names only when the step that names it comes.
- Frozen task: `docs/task-cycles/serwer-odczyty-i-straznik/task.md` (Polish). Read the passages the slice's *Read* names. The plan: `docs/task-cycles/serwer-odczyty-i-straznik/plan.md` - the slice's section is copied below word for word; read nothing else of the plan.
- Answers of the orchestrator's step 4: the change touches a trust boundary (`deploy/**`, the watcher `deploy/loop2-watch`); no operation that cannot be undone. A slice's *Risk* is in its section.
- Report path: `docs/task-cycles/serwer-odczyty-i-straznik/reports/slice-11-report.md`. Return its status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line check result naming what failed or did not run, the report path, **Unread material** and **Searches not found or unclear**; the report has each check with its command and exit code, the own-work check your method asks for, and anything you reached beyond this handoff (name it).
- Foundation entries the earlier steps wrote: the four rows of *Settlements to record* are already written as edits of D-233, D-234 and D-356 (commit `9630fb90`); the decision ranges below are the current ones in this worktree and hold where they differ from the plan's *Read*.

## Current ranges of decisions named in the slice's *Read*

- D-153: `foundations/decisions.md:3138-3152`

## The slice (copied word for word from `plan.md`)

### Slice 11 — The delivery of mail: from an invariant's part to a fact

- **Goal:** `account-email-via-outsider` keeps only the part a file of the repository decides — the sender
  address and the mail service named in `compose.yaml` — and its sentence is narrowed through
  `the-way-record-invariant` (its method as the skill's rule gives it; no test is written here); the part about
  delivery to a mailbox leaves it. The human's result of 2026-11-14 (the reset message from the public address
  reached an external inbox; the log of the service `app` has the events `link-issued` and `message-sent` with
  `linkPurpose: password-reset` for it and no line with `"failure":"mail"`) becomes a fact where the agent
  can read those lines again by a bounded reading the skill allows of the game's log (the `mikrus` MCP tools
  `servers` and `exec`; the same conditions as slice 5) and quote them word for word, written through
  `the-way-record-environment-fact`; otherwise nothing is written as a fact, and the human's result goes to
  the return step as a remark for D-153. The confirmation message is not in the human's result: do not claim
  it, and say in the report what D-153 stays unsettled on. The report ends with "For the return step" as in
  slice 5; D-153 names the fact there.
- **Change:** `foundations/invariants.md` · `foundations/environment_facts.md`
- **Read:** `compose.yaml` · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:30-30` To do, item 2 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:120-120` Human actions, the reset message · `foundations/invariants.md:918-926` account-email-via-outsider · `foundations/decisions.md:3138-3151` D-153 · `foundations/environment_facts.md:432-436` mikrus-outsider-mail · `.claude/skills/loop2-deploy/SKILL.md:45-107` Agent or human · `.claude/skills/loop2-deploy/SKILL.md:201-250` Account mail
- **Model:** same — an invariant narrowed so that the entries that rest on it keep their meaning
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` · `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` · a search of `git diff` for the server's id, name, port and user finds none
- **Depends on:** Slice 10 · Slice 9


## Notes from the orchestrator on the readings of the server

- Tools: the `mikrus` MCP tools are deferred; load them with `ToolSearch` (`select:mcp__mikrus__servers,mcp__mikrus__exec`) before use. The ID, the server name, the SSH port, the user and the address are never written to a file, a report, a commit message or a quoted output: replace by `<server>` and say that you did.
- Only the bounded readings of the game's log that the skill's list allows (`tail -n 200`, `grep -F -m 50 -- '<fixed string>'` of `/var/log/loop2-app.log` and `/var/log/loop2-app.log.1`, `zgrep -F -m 50` of the older ones), each exactly in the listed form, one at a time, nothing added to a command (no `; echo`, no extra pipe). Search for the fixed strings `link-issued` and `message-sent` and `password-reset` separately if one fixed string cannot cover them; the log lines of a player hold identifiers and addresses: quote into a fact only the event names and the `linkPurpose`, never an account identifier or an address; replace an account identifier by `<account>` in the fact and in the report.
- If the lines of the owner's test of 2026-11-14 are no longer in the files the list allows, write no fact; say so in the report and put the owner's result under "For the return step" as a remark for D-153.
- Raw output of every command (with the identifiers replaced) goes beside the command in your report. The invariants are written through the project skill `the-way-record-invariant`, the fact through `the-way-record-environment-fact`; do not edit any decision.

