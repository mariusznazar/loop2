# Handoff 06-slice1 — executor of slice 1

You are the executor of slice 1 of the task cycle `skad-wiem-o-awarii` (where the owner learns that the running game of loop2 failed, and how long its logs live). Variant of `make-change`: "a slice, or the retry of a slice".

## Delegation and place

- The cycle's orchestrator has delegated intermediate choices to itself; nothing you receive is the owner's approval. Questions go to the orchestrator.
- Work from the worktree root `the root of the repository` (branch `task/skad-wiem-o-awarii`), you alone writing in it. The slice's base is the current head `bbefd44e2d88a7536809d4acc9df907eabf14f66`; the pin `.the-way` is at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), read whole, and `.the-way/task-cycle/change/slice.md` when the step that names it comes; a file the method names only when its step comes. Read the passages of your slice's *Read* below; the whole frozen task is `.runs/task-cycles/skad-wiem-o-awarii/task.md`, the reviewed spec `.runs/task-cycles/skad-wiem-o-awarii/spec.md`, the plan `.runs/task-cycles/skad-wiem-o-awarii/plan.md` (read only the passages *Read* names).
- Environment: Windows; `npm ci` is done; the quality tools are in `.runs/quality-venv`. Run focused checks only, as your slice's *Checks* name them; never the whole gate (the orchestrator runs it). Each check goes in your report with its command and its exit code.
- Commits: on the task branch, explicit paths with `git add <path>`, never `git add -A`; messages in English in the repository's style (`type: :emoji: summary`, see `git log`); do not push. Test first where the slice says so (a failing run, then a passing run, both in the report).
- Answers of step 4: trust boundary **yes** (`src/server/**`, `deploy/**`): where your files are such, expect a review aimed at crafted input; irreversible operation: none performed by the cycle — you install nothing on the server and run nothing against it.
- Forbidden for every agent of this cycle: `the earlier 10x checkout of the repository`, branches `10x/*`, tags `archive/10x-*`, the vault folder `Notes/Projects/(P) Przejście 10xDEVS/`, session records under `the session records of the earlier 10x checkout` and `the session records of the author's notes vault`.
- Report to `.runs/task-cycles/skad-wiem-o-awarii/reports/06-slice1-report.md`; return its status, commits, a one-line check result naming what failed or did not run, and the path. The report holds the checks with command and exit code, the own-work check, the reaches beyond this handoff, and **Searches not found or unclear** (`none` is an answer).

## Current ranges of foundation entries (these hold where they differ from the plan's)

The foundation step has written D-352, D-353, the new D-347 and the invariants `loop2-deploy-log-dump`, `failure-watcher-message`, `browser-failure-report`; read the ones your slice's *Read* names, whole, at these ranges:

- `foundations/decisions.md:214-233` D-09
- `foundations/decisions.md:291-306` D-13
- `foundations/decisions.md:370-394` D-17
- `foundations/decisions.md:7691-7718` D-347
- `foundations/decisions.md:7867-7881` D-352
- `foundations/decisions.md:7882-7895` D-353
- `foundations/invariants.md:1269-1278` browser-failure-report
- `foundations/invariants.md:1259-1268` failure-watcher-message
- `foundations/invariants.md:1249-1258` loop2-deploy-log-dump
- `foundations/invariants.md:155-164` loop2-host-sharing



## The slice (copied word for word from `plan.md`)

### Slice 1 — The `local` log driver and the logrotate file

- **Goal:** `compose.yaml` gives both services `app` and `cloudflared` the log driver `local` and no other `logging` option (spec A2); the repository holds `deploy/loop2-app.logrotate`, the one stanza of spec A3 for `/var/log/loop2-app.log` (weekly or past 100 MiB, four rotated files, `delaycompress`, `missingok`, `notifempty`, `copytruncate`, `su root root`, no `create`, no user name); a new test `tests/deploy/test_loop2_log_storage.py` (written first, failing) reads `compose.yaml` and the logrotate file as text with the standard library and requires exactly that; `tests/invariants/test_account_server_typecheck.py` names `deploy/loop2-app.logrotate` in `NOT_ROUTES` so the route test still passes. Leaves for the human (written into the skill by Slice 7): creating the log file with the deployment account's owner, installing the logrotate file as `/etc/logrotate.d/loop2-app`, a dry run and one forced rotation, and checking that logrotate runs daily on the host.
- **Change:** `compose.yaml` · `deploy/loop2-app.logrotate` · `tests/deploy/test_loop2_log_storage.py` · `tests/invariants/test_account_server_typecheck.py`
- **Read:** `.runs/task-cycles/skad-wiem-o-awarii/spec.md:35-46` Constraints · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:64-66` A2 and A3 in "A. The record of the game's log" · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:187-187` the Compose test in "Tests the change must bring" · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:189-189` the routes test in the same section · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:217-225` Left to the maker · `foundations/decisions.md:370-393` D-17 · `foundations/decisions.md:291-304` D-13 · `foundations/decisions.md:214-232` D-09 · `foundations/invariants.md:155-163` loop2-host-sharing · `guidelines/coding.md` · `guidelines/testing.md` · `deploy/loop2-backup.cron` · `tests/deploy/test_deploy_workflow.py` (example of a standard-library text test)
- **Model:** cheaper
- **Risk:** trust boundary — `deploy/**` (the logrotate file is a new file of `deploy/`)
- **Checks:** `npm test -- tests/deploy/test_loop2_log_storage.py` (first written failing, then passing) · `npm test -- tests/invariants/test_account_server_typecheck.py` · `npm test -- tests/invariants/test_loop2_host_sharing.py`
- **Depends on:** none
