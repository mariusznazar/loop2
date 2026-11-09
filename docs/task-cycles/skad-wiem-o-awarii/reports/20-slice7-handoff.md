# Handoff 20-slice7 — executor of slice 7

You are the executor of slice 7 of the task cycle `skad-wiem-o-awarii` (where the owner learns that the running game of loop2 failed, and how long its logs live). Variant of `make-change`: "a slice, or the retry of a slice".

## Delegation and place

- The cycle's orchestrator has delegated intermediate choices to itself; nothing you receive is the owner's approval. Questions go to the orchestrator.
- Work from the worktree root `the root of the repository` (branch `task/skad-wiem-o-awarii`), you alone writing in it. The slice's base is the current head `fc493baafaf8674c75202e270945c63c650fe633`; the pin `.the-way` is at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), read whole, and `.the-way/task-cycle/change/slice.md` when the step that names it comes; a file the method names only when its step comes. Read the passages of your slice's *Read* below; the whole frozen task is `.runs/task-cycles/skad-wiem-o-awarii/task.md`, the reviewed spec `.runs/task-cycles/skad-wiem-o-awarii/spec.md`, the plan `.runs/task-cycles/skad-wiem-o-awarii/plan.md` (read only the passages *Read* names).
- Environment: Windows; `npm ci` is done; the quality tools are in `.runs/quality-venv`. Run focused checks only, as your slice's *Checks* name them; never the whole gate (the orchestrator runs it). Each check goes in your report with its command and its exit code.
- Commits: on the task branch, explicit paths with `git add <path>`, never `git add -A`; messages in English in the repository's style (`type: :emoji: summary`, see `git log`); do not push. Test first where the slice says so (a failing run, then a passing run, both in the report).
- Answers of step 4: trust boundary **yes** (`src/server/**`, `deploy/**`): where your files are such, expect a review aimed at crafted input; irreversible operation: none performed by the cycle — you install nothing on the server and run nothing against it.
- Forbidden for every agent of this cycle: `the earlier 10x checkout of the repository`, branches `10x/*`, tags `archive/10x-*`, the vault folder `Notes/Projects/(P) Przejście 10xDEVS/`, session records under `the session records of the earlier 10x checkout` and `the session records of the author's notes vault`.
- Report to `.runs/task-cycles/skad-wiem-o-awarii/reports/20-slice7-report.md`; return its status, commits, a one-line check result naming what failed or did not run, and the path. The report holds the checks with command and exit code, the own-work check, the reaches beyond this handoff, and **Searches not found or unclear** (`none` is an answer).

## Current ranges of foundation entries (these hold where they differ from the plan's)

The foundation step has written D-352, D-353, the new D-347 and the invariants `loop2-deploy-log-dump`, `failure-watcher-message`, `browser-failure-report`; read the ones your slice's *Read* names, whole, at these ranges:

- `foundations/decisions.md:271-290` D-12
- `foundations/decisions.md:291-306` D-13
- `foundations/decisions.md:2635-2649` D-137
- `foundations/decisions.md:344-369` D-16
- `foundations/decisions.md:4540-4576` D-233
- `foundations/decisions.md:5120-5155` D-252
- `foundations/decisions.md:7691-7718` D-347
- `foundations/decisions.md:7867-7881` D-352
- `foundations/decisions.md:7882-7895` D-353
- `foundations/environment_facts.md:454-459` cron-d-file-rules
- `foundations/environment_facts.md:442-447` mikrus-pusher-mail
- `foundations/invariants.md:1269-1278` browser-failure-report
- `foundations/invariants.md:1259-1268` failure-watcher-message
- `foundations/invariants.md:1249-1258` loop2-deploy-log-dump



## The slice (copied word for word from `plan.md`)

### Slice 7 — The `loop2-deploy` skill: record, alerts and the human's steps

- **Goal:** the skill says what spec E gives, in both byte-identical copies (`.claude/skills/loop2-deploy/` and `.agents/skills/loop2-deploy/`; write one, copy it, never leave them different): `SKILL.md` gets the new rows of the resource table, the new allowed reads and the still-forbidden ones (E1), a new section on the record and the alerts (where the log lies, how long each part lives, how an agent reads it, the three ways the owner learns of a failure and what each catches, the accepted gaps of C3, the four limits of D, the two messages on one outage, that the file holds `accountId` lines), the A4 command for `account-block` beside the plain one with the anchored filter of S1 (begins with one of the two exact starts and ends with `}`) and the residual risk of a deliberately imitated address, the `dump:` and `warning:` lines in *Seeing deployments*, the rollback consequences, and a `description` still under 400 characters; `references/setup_and_secrets.md` gets one section with the human's ordered steps 1-7 of E3, the abandonment note and the pre-merge reinstall of `loop2-deploy`; `references/troubleshooting.md`'s *Installed-script warning* names the six installed copies now compared. No deploy-account name, server name, port, IPv6 literal or `mikr.us` name in any text; no new reference file. The A4 command is typed by the human and no test runs it, so the executor tries the filter on made-up event, failure and sentence lines with Git Bash. This slice is where the request's list of unchecked work comes from: no automated proof exists for Docker's log driver and `inspect` fields, the `--since` and `--until` windowing of `docker logs`, logrotate, `pusher` delivery, cron and the GitHub e-mail; all stay with the human.
- **Change:** `.claude/skills/loop2-deploy/SKILL.md` · `.claude/skills/loop2-deploy/references/setup_and_secrets.md` · `.claude/skills/loop2-deploy/references/troubleshooting.md` · `.agents/skills/loop2-deploy/SKILL.md` · `.agents/skills/loop2-deploy/references/setup_and_secrets.md` · `.agents/skills/loop2-deploy/references/troubleshooting.md`
- **Read:** `.runs/task-cycles/skad-wiem-o-awarii/spec.md:8-10` Intent · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:35-46` Constraints · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:52-70` A. The record of the game's log · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:72-91` B. The browser's report · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:93-164` C, D and E · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:192-195` Settlements after the spec's review · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:217-225` Left to the maker · Foundation entries row 1 · Foundation entries row 2 · Foundation entries row 3 · Foundation entries row 7 · Foundation entries row 8 · `foundations/decisions.md:271-289` D-12 · `foundations/decisions.md:291-304` D-13 · `foundations/decisions.md:344-368` D-16 · `foundations/decisions.md:2635-2648` D-137 · `foundations/decisions.md:4540-4575` D-233 · `foundations/decisions.md:5120-5154` D-252 · `foundations/decisions.md:7691-7719` D-347 · `foundations/environment_facts.md:442-446` mikrus-pusher-mail · `foundations/environment_facts.md:454-458` cron-d-file-rules · `.claude/skills/loop2-deploy/references/backup_and_restore.md` · `tests/agent_workflow/test_loop2_deploy_skill.py`
- **Model:** same — the shell command the human types is proved by no test and must be right by reading and a hand trial
- **Risk:** none
- **Checks:** `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` (two copies identical, four files each, no IPv6 literal or `mikr.us` name, `description` under 400 characters) · the A4 filter tried by hand on made-up lines in Git Bash
- **Depends on:** Slices 1, 2, 3, 4, 5, 6 (the files and behaviour it names exist) · Foundation entries rows 1, 2, 3, 7 and 8
