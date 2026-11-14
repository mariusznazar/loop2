# Handoff - slice 8 of the task cycle `serwer-odczyty-i-straznik`

You make one slice of a planned change. The person who requested this cycle delegated intermediate
choices to the orchestrator; nothing you receive is that person's approval.

- Worktree (work from its root): `the root of the worktree`, branch `task/serwer-odczyty-i-straznik`. The slice's base is `5a8b8777d8b2e8d2fefe6d81fc616f0336f43b12`. Commit on this branch, path by path (`git add <file> ...`, never `git add -A`, `.` or `commit -a`), English commit messages in the style of `git log` of the repository. Do not push. Do NOT run the product's whole gate (`npm test`); the machine is short of memory and the gate is the orchestrator's. Run only the focused checks of the slice, one at a time.
- Method: the project skill `the-way-make-change`, whose `SKILL.md` is `.the-way/task-cycle/change/SKILL.md`; your variant is "a slice, or the retry of a slice"; read that `SKILL.md` whole, and a file it names only when the step that names it comes.
- Frozen task: `docs/task-cycles/serwer-odczyty-i-straznik/task.md` (Polish). Read the passages the slice's *Read* names. The plan: `docs/task-cycles/serwer-odczyty-i-straznik/plan.md` - the slice's section is copied below word for word; read nothing else of the plan.
- Answers of the orchestrator's step 4: the change touches a trust boundary (`deploy/**`, the watcher `deploy/loop2-watch`); no operation that cannot be undone. A slice's *Risk* is in its section.
- Report path: `docs/task-cycles/serwer-odczyty-i-straznik/reports/slice-8-report.md`. Return its status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line check result naming what failed or did not run, the report path, **Unread material** and **Searches not found or unclear**; the report has each check with its command and exit code, the own-work check your method asks for, and anything you reached beyond this handoff (name it).
- Foundation entries the earlier steps wrote: the four rows of *Settlements to record* are already written as edits of D-233, D-234 and D-356 (commit `9630fb90`); the decision ranges below are the current ones in this worktree and hold where they differ from the plan's *Read*.

## Current ranges of decisions named in the slice's *Read*

- D-356: `foundations/decisions.md:9027-9041`
- D-357: `foundations/decisions.md:9042-9056`
- D-358: `foundations/decisions.md:9057-9071`

## The slice (copied word for word from `plan.md`)

### Slice 8 — Facts read again: the visibility of two repositories through `gh`, the two licences by the human

- **Goal:** the agent runs, locally, `gh` (authorised on the owner's account; the query carries the account
  name, which the human allowed) on the repositories `mariusznazar/loop2` and `mariusznazar/screenshots`,
  and writes the *Source* of the facts `loop2-repository-visibility` and `screenshots-repository-visibility`
  anew — edited in place, the output's passage word for word and the date read, in the form the two facts
  already use. If either repository is not public, change no entry and return with the reading, since D-356,
  D-357 and D-358 rest on the fact being true. The two licence facts, `smoke-fire-particle-licence` and
  `lpc-wolf-licence`, get the human's reading of 2026-11-14 as their new *read* date: the human read the
  live pages in an ordinary browser and found they say what the facts quote (the entry in *Human actions*
  names both); the sentences and the passages stay as they are. The report ends with "For the return step"
  as in slice 5 (nothing is expected unless a fact changed).
- **Change:** `foundations/environment_facts.md`
- **Read:** `foundations/environment_facts.md:690-694` loop2-repository-visibility · `foundations/environment_facts.md:774-778` screenshots-repository-visibility · `foundations/environment_facts.md:780-790` smoke-fire-particle-licence and lpc-wolf-licence · `foundations/decisions.md:9006-9019` D-356 · `foundations/decisions.md:9021-9034` D-357 · `foundations/decisions.md:9036-9049` D-358 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:38-39` To do, items 10 and 11 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:71-75` Questions to settle, who checks the visibility · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:125-125` Human actions, the licences
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` · `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py`
- **Depends on:** Slice 7


## Notes from the orchestrator on the readings through `gh`

- `gh` runs locally, authorised on the owner's account; the query carries the account name, which the owner allowed for these two readings (the task, *Questions to settle*, "Kto sprawdza fakty o widoczności repozytoriów"). It only reads (`gh api` with GET); it changes nothing on GitHub and pushes nothing.
- Quote the output of each reading word for word in the fact's *Source*, in the form the two facts already use (an address, a place in the page, the passage, `read <date>`), and put the raw output beside the command in your report. If a repository is not public, change no entry and return as the slice says.
- The two licence facts: the owner read the two live pages in an ordinary browser on 2026-11-14 and found they say what the facts quote (the frozen task's *Human actions*, the entry on the licences, word for word there). Where the template's *Source* form has no place for a reading by a person, say so in your report and put the date as the form allows; write nothing the owner's result does not carry.

