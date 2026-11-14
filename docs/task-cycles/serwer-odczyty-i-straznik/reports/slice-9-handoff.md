# Handoff - slice 9 of the task cycle `serwer-odczyty-i-straznik`

You make one slice of a planned change. The person who requested this cycle delegated intermediate
choices to the orchestrator; nothing you receive is that person's approval.

- Worktree (work from its root): `the root of the worktree`, branch `task/serwer-odczyty-i-straznik`. The slice's base is `96cb8c9ceba20958f5039e65d40db498b3f57a31`. Commit on this branch, path by path (`git add <file> ...`, never `git add -A`, `.` or `commit -a`), English commit messages in the style of `git log` of the repository. Do not push. Do NOT run the product's whole gate (`npm test`); the machine is short of memory and the gate is the orchestrator's. Run only the focused checks of the slice, one at a time.
- Method: the project skill `the-way-make-change`, whose `SKILL.md` is `.the-way/task-cycle/change/SKILL.md`; your variant is "a slice, or the retry of a slice"; read that `SKILL.md` whole, and a file it names only when the step that names it comes.
- Frozen task: `docs/task-cycles/serwer-odczyty-i-straznik/task.md` (Polish). Read the passages the slice's *Read* names. The plan: `docs/task-cycles/serwer-odczyty-i-straznik/plan.md` - the slice's section is copied below word for word; read nothing else of the plan.
- Answers of the orchestrator's step 4: the change touches a trust boundary (`deploy/**`, the watcher `deploy/loop2-watch`); no operation that cannot be undone. A slice's *Risk* is in its section.
- Report path: `docs/task-cycles/serwer-odczyty-i-straznik/reports/slice-9-report.md`. Return its status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line check result naming what failed or did not run, the report path, **Unread material** and **Searches not found or unclear**; the report has each check with its command and exit code, the own-work check your method asks for, and anything you reached beyond this handoff (name it).
- Foundation entries the earlier steps wrote: the four rows of *Settlements to record* are already written as edits of D-233, D-234 and D-356 (commit `9630fb90`); the decision ranges below are the current ones in this worktree and hold where they differ from the plan's *Read*.

## Current ranges of decisions named in the slice's *Read*

- D-356: `foundations/decisions.md:9027-9041`

## The slice (copied word for word from `plan.md`)

### Slice 9 — The rhythm of the scheduled check of the address, as GitHub gives it

- **Goal:** the agent reads locally, through `gh` (`gh run list --workflow check-address.yml --event schedule`,
  with a limit and the fields that give the run's times; the form slice 3 put on the list), the times of the
  most recent scheduled runs and the gaps between them, and writes them as an environment fact with its
  date, in the form of the template for a source that is a service's public answer; if the template gives no
  form for it, say so in the report and write the result for the return step as a remark for D-356. In the
  skill, in both copies, byte for byte the same: the second of "The three ways the owner learns the game
  failed" (the scheduled check) and "The four limits of the scheduled check" speak of the rhythm GitHub
  gives, and say that with the server or the tunnel down the alarm of GitHub may come only after hours; the
  cause of the gaps is not established, and the text says so. The workflow `check-address.yml` does not
  change, and neither does its schedule (the comment in it that says "every five minutes" states what the
  schedule asks for; leave it and mention it in the report). Edit one skill copy and copy its bytes to the
  other with `cp`; no provider host name and no IPv6 literal in the skill. D-356 is not edited here: its
  sentence about the rhythm and its *Rationale* are corrected by the return step from the fact. The report
  ends with "For the return step" as in slice 5.
- **Change:** `foundations/environment_facts.md` · `.claude/skills/loop2-deploy/SKILL.md` · `.agents/skills/loop2-deploy/SKILL.md`
- **Read:** `.github/workflows/check-address.yml` · `tests/agent_workflow/test_loop2_deploy_skill.py` · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:40-40` To do, item 12 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:86-91` Questions to settle, the rhythm of the check · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:103-103` Context, the reading of 2026-11-14 · `foundations/decisions.md:9006-9019` D-356 · `foundations/environment_facts.md:720-724` github-schedule-shortest-interval · `foundations/environment_facts.md:684-688` github-scheduled-workflow-disabling
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` · `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` · `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` · `python -B scripts/test.py tests/deploy/test_check_address_workflow.py` (the workflow is unchanged; it must still pass)
- **Depends on:** Slice 8 · Slice 3


## Notes from the orchestrator

- `gh` runs locally, authorised on the owner's account; it only reads. Quote the output of the reading word for word in the fact's *Source* (the form `reading: <command> on <host>, <tool and its version> - "<output>"; run <date>`, with the tool version from `gh --version` if you run it) and put the raw output beside the command in your report. The times of the runs are data of GitHub, not of a player; no secret is involved.
- The skill's two copies must end byte for byte the same: edit one, `cp` over the other, `cmp`. The text of the skill says what the reading shows and no more: the gaps are what the output shows, and the cause is not established.
- Task, *Questions to settle*, the last question, and *Context* (the reading of 2026-11-14) are the source of what D-356 and the skill say; do not repeat a number from the Context that your own reading does not show.

## Note from the orchestrator on running tests on this machine

The machine is short of memory and the Git Bash child processes the tests start are slow. In the previous slice the named runner `python -B scripts/test.py <file>` did not finish in 17 minutes, and the same module run by `python -B -m unittest -v <module>` from the test file's directory (per class where a module is slow) did. Try the named runner first only with a bounded wait of about 10 minutes in the background; if it does not finish, run the substitute and report both commands and what each did, with exit codes. Run one check at a time. Never run `npm test`.
