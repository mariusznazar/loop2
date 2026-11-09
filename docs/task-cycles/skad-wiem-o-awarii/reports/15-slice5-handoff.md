# Handoff 15-slice5 — executor of slice 5

You are the executor of slice 5 of the task cycle `skad-wiem-o-awarii` (where the owner learns that the running game of loop2 failed, and how long its logs live). Variant of `make-change`: "a slice, or the retry of a slice".

## Delegation and place

- The cycle's orchestrator has delegated intermediate choices to itself; nothing you receive is the owner's approval. Questions go to the orchestrator.
- Work from the worktree root `the root of the repository` (branch `task/skad-wiem-o-awarii`), you alone writing in it. The slice's base is the current head `7bf49e507a8a71b4e792462255d3359a7d989ec4`; the pin `.the-way` is at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), read whole, and `.the-way/task-cycle/change/slice.md` when the step that names it comes; a file the method names only when its step comes. Read the passages of your slice's *Read* below; the whole frozen task is `.runs/task-cycles/skad-wiem-o-awarii/task.md`, the reviewed spec `.runs/task-cycles/skad-wiem-o-awarii/spec.md`, the plan `.runs/task-cycles/skad-wiem-o-awarii/plan.md` (read only the passages *Read* names).
- Environment: Windows; `npm ci` is done; the quality tools are in `.runs/quality-venv`. Run focused checks only, as your slice's *Checks* name them; never the whole gate (the orchestrator runs it). Each check goes in your report with its command and its exit code.
- Commits: on the task branch, explicit paths with `git add <path>`, never `git add -A`; messages in English in the repository's style (`type: :emoji: summary`, see `git log`); do not push. Test first where the slice says so (a failing run, then a passing run, both in the report).
- Answers of step 4: trust boundary **yes** (`src/server/**`, `deploy/**`): where your files are such, expect a review aimed at crafted input; irreversible operation: none performed by the cycle — you install nothing on the server and run nothing against it.
- Forbidden for every agent of this cycle: `the earlier 10x checkout of the repository`, branches `10x/*`, tags `archive/10x-*`, the vault folder `Notes/Projects/(P) Przejście 10xDEVS/`, session records under `the session records of the earlier 10x checkout` and `the session records of the author's notes vault`.
- Report to `.runs/task-cycles/skad-wiem-o-awarii/reports/15-slice5-report.md`; return its status, commits, a one-line check result naming what failed or did not run, and the path. The report holds the checks with command and exit code, the own-work check, the reaches beyond this handoff, and **Searches not found or unclear** (`none` is an answer).

## Current ranges of foundation entries (these hold where they differ from the plan's)

The foundation step has written D-352, D-353, the new D-347 and the invariants `loop2-deploy-log-dump`, `failure-watcher-message`, `browser-failure-report`; read the ones your slice's *Read* names, whole, at these ranges:

- `foundations/decisions.md:271-290` D-12
- `foundations/decisions.md:291-306` D-13
- `foundations/decisions.md:344-369` D-16
- `foundations/decisions.md:370-394` D-17
- `foundations/decisions.md:4540-4576` D-233
- `foundations/decisions.md:4606-4627` D-235
- `foundations/decisions.md:5120-5155` D-252
- `foundations/decisions.md:7691-7718` D-347
- `foundations/decisions.md:7867-7881` D-352
- `foundations/decisions.md:7882-7895` D-353
- `foundations/environment_facts.md:454-459` cron-d-file-rules
- `foundations/environment_facts.md:27-32` mikrus-host-docker-workloads
- `foundations/environment_facts.md:442-447` mikrus-pusher-mail
- `foundations/invariants.md:1129-1138` account-save-backup-failure-notice
- `foundations/invariants.md:1269-1278` browser-failure-report
- `foundations/invariants.md:1259-1268` failure-watcher-message
- `foundations/invariants.md:135-144` loop2-deploy-keeps-running
- `foundations/invariants.md:1249-1258` loop2-deploy-log-dump
- `foundations/invariants.md:155-164` loop2-host-sharing



## The slice (copied word for word from `plan.md`)

### Slice 5 — The failure watcher and its schedule

- **Goal:** the repository holds `deploy/loop2-watch` (Bash, constants block between the two markers like the other two scripts, shellcheck-clean) and `deploy/loop2-watch.cron` (`MAILTO=""`, every 5 minutes, as root, per `cron-d-file-rules`), exactly as spec C1-C7 give: reads only (`docker inspect --type container` of `loop2` and `loop2-cloudflared` with one fixed format; `docker logs` of `loop2` for a time window), every Docker and `pusher` call under `timeout` with a kill delay; looks at the deploy lock without creating or taking it for writing; its own exclusive lock; the five kinds (down, unhealthy, restarted, failures, browser failures) with the window, the strict state file and the "from now" rule; counting by anchored prefix only, never copying content; per-kind and 24-hour throttles; one `pusher` call per message, fixed Polish subject and sentence per kind built from constants, nothing read from a log or Docker; its own log with one line per eventful run and an exit line on an abnormal end, never a `pusher` call about itself. Tests are written first: `tests/deploy/watch_script_support.py` (stand-in `docker`, `pusher`, `flock`, `date` and the others on the seam of `backup_script_support.py`, which it imports and does not change) and `tests/deploy/test_loop2_watch.py` prove each behaviour of spec "Tests the change must bring", Watcher bullet; `tests/deploy/test_loop2_watch_message.py` carries the invariant of row 5 (a marker in a stand-in log line and in stand-in `docker` output never reaches `pusher`, the state, the log or any file; fixed subject and text), tagged `# invariant: <name>` with the name the foundation step gave row 5. `tests/quality/test_quality_invariants.py` adds `deploy/loop2-watch` to `BASH_SCRIPTS`; `tests/invariants/test_account_server_typecheck.py` names `deploy/loop2-watch` and `deploy/loop2-watch.cron` in `NOT_ROUTES`. Leaves for the human (Slice 7 writes the steps): installing the script as `/usr/local/bin/loop2-watch` and the cron file as `/etc/cron.d/loop2-watch`, one run by hand, the deliberate restart of the game container to see the `restarted` message arrive, and reading the log and the state file's age the next morning. Proved by no test: that `pusher` delivers, that cron runs the file, what Docker's `inspect` fields and the `--since` and `--until` windowing of `docker logs` really return.
- **Change:** `deploy/loop2-watch` · `deploy/loop2-watch.cron` · `tests/deploy/watch_script_support.py` · `tests/deploy/test_loop2_watch.py` · `tests/deploy/test_loop2_watch_message.py` · `tests/invariants/test_account_server_typecheck.py` · `tests/quality/test_quality_invariants.py`
- **Read:** `.runs/task-cycles/skad-wiem-o-awarii/spec.md:35-46` Constraints · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:84-84` B3, the line the watcher counts · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:93-127` C. The watcher · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:166-180` Trust boundaries and the crafted input each refuses · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:188-189` the watcher and routes tests in "Tests the change must bring" · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:217-225` Left to the maker · Foundation entries row 2 · Foundation entries row 5 · `foundations/decisions.md:4540-4575` D-233 · `foundations/decisions.md:4606-4626` D-235 · `foundations/decisions.md:271-289` D-12 · `foundations/decisions.md:291-304` D-13 · `foundations/decisions.md:344-368` D-16 · `foundations/decisions.md:370-393` D-17 · `foundations/decisions.md:5120-5154` D-252 · `foundations/invariants.md:155-163` loop2-host-sharing · `foundations/invariants.md:1129-1137` account-save-backup-failure-notice · `foundations/invariants.md:135-143` loop2-deploy-keeps-running · `foundations/environment_facts.md:442-446` mikrus-pusher-mail · `foundations/environment_facts.md:454-458` cron-d-file-rules · `foundations/environment_facts.md:27-31` mikrus-host-docker-workloads · `guidelines/coding.md` · `guidelines/testing.md` · `deploy/loop2-backup` · `deploy/loop2-backup.cron` · `deploy/loop2-deploy:1-60` header and constants block · `tests/deploy/backup_script_support.py` · `tests/deploy/test_loop2_backup.py` · `tests/invariants/test_account_save_backup_failure_notice.py`
- **Model:** same — an intricate Bash script (window, strict state file, locks, two throttles) whose test seam is built here, though the design is settled
- **Risk:** trust boundary — `deploy/**` (a root script on the shared host that reads container output an attacker can influence through the report route)
- **Checks:** `npm test -- tests/deploy/test_loop2_watch.py` (first failing) · `npm test -- tests/deploy/test_loop2_watch_message.py` (first failing) · `npm test -- tests/deploy/test_loop2_backup.py` (the seam is shared, unchanged) · `npm test -- tests/quality/test_quality_invariants.py` (shellcheck of the new script) · `npm test -- tests/invariants/test_account_server_typecheck.py`
- **Depends on:** Slice 1 (same file `tests/invariants/test_account_server_typecheck.py`) · Foundation entries rows 2 and 5
