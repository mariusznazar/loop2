# Handoff 16-review-slice5 — review of slice 5

You review slice 5 of the task cycle `skad-wiem-o-awarii` as an agent that did not make it, with `review-change`, read-only.

## Delegation and place

- The cycle's orchestrator has delegated intermediate choices to itself; nothing you receive is the owner's approval. Questions go to the orchestrator.
- Work from the worktree root `the root of the repository` (branch `task/skad-wiem-o-awarii`). Pin `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`. Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`), read whole; `fix.md` and `whole_change.md` only when their step comes. Change no tracked file; write only your report.
- **Range to review:** base `7bf49e507a8a71b4e792462255d3359a7d989ec4`, head `048264e` (`git diff 7bf49e507a8a71b4e792462255d3359a7d989ec4..048264e`, `git log 7bf49e507a8a71b4e792462255d3359a7d989ec4..048264e`); confirm `git rev-parse HEAD` is the head. 
- Report path: `.runs/task-cycles/skad-wiem-o-awarii/reports/16-review-slice5-report.md`; its first line is `PASS <sha>` or `FAIL <sha>` (or `questions`).
- Author's report(s), a set of claims to verify: executor's `.runs/task-cycles/skad-wiem-o-awarii/reports/15-slice5-report.md`
- Answers of step 4 you must apply: trust boundary **yes** (`src/server/**`, `deploy/**`) — check crafted input at that boundary where the range touches it; irreversible operation: none performed by the cycle — check that the change only prepares what a human installs on the server and runs nothing against it.
- Task and spec: the whole frozen task is `.runs/task-cycles/skad-wiem-o-awarii/task.md`; the reviewed spec `.runs/task-cycles/skad-wiem-o-awarii/spec.md`; the plan `.runs/task-cycles/skad-wiem-o-awarii/plan.md`. Judge the slice against the passages of the task and the spec named in the slice's *Read* below, not against the plan alone. Guideline files and foundation entries are those the slice's *Read* names, each whole, at the current ranges below.
- Forbidden for every agent of this cycle: `the earlier 10x checkout of the repository`, branches `10x/*`, tags `archive/10x-*`, the vault folder `Notes/Projects/(P) Przejście 10xDEVS/`, session records under `the session records of the earlier 10x checkout` and `the session records of the author's notes vault`.
- You do not run the product's whole gate; you may run focused checks, each with command and exit code in your report. Windows; `npm ci` is done; quality tools are in `.runs/quality-venv`.

## Current ranges of foundation entries

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

## Points to weigh (the orchestrator's, not findings)

- The invariant `failure-watcher-message` (foundations/invariants.md, written with `Method: test` before this slice): check the `# invariant:` lines and that the message cases would fail if a marker from a log line, from `docker` output or from a state file reached `pusher`, the log or any file.
- The script runs as root on a host shared with other workloads and reads container output that an outside party can influence through the report route and the game. Check crafted input: hostile or huge lines, lines with a newline or NUL, a name or id that looks like an option, a state file that is damaged, missing or written by someone else, a log or state path that is a symlink, a clock that goes backwards, two runs at once, the deploy lock file absent or being held, a stuck `docker` or `pusher`.
- The spec's design (C1-C7, the trust-boundary table) is the reference: lock behaviour (read-only look at the deploy lock, never creating it), windowing, throttles, `restarted` by container id and start time, the 'from now' rule for a lost state, no `pusher` call about itself. The executor's choices to judge: the state is written before the messages are sent; the two anchored prefixes stand as literals in `count_lines` instead of constants; one log line per eventful run.
- The executor names five things no test proved (pusher delivery, cron, Docker's inspect and logs windowing, shared flock on a read-only file, bash 5.1 on the host); judge whether the script or the tests claim any of them as proved.

## The slice (copied word for word from `plan.md`)

### Slice 5 — The failure watcher and its schedule

- **Goal:** the repository holds `deploy/loop2-watch` (Bash, constants block between the two markers like the other two scripts, shellcheck-clean) and `deploy/loop2-watch.cron` (`MAILTO=""`, every 5 minutes, as root, per `cron-d-file-rules`), exactly as spec C1-C7 give: reads only (`docker inspect --type container` of `loop2` and `loop2-cloudflared` with one fixed format; `docker logs` of `loop2` for a time window), every Docker and `pusher` call under `timeout` with a kill delay; looks at the deploy lock without creating or taking it for writing; its own exclusive lock; the five kinds (down, unhealthy, restarted, failures, browser failures) with the window, the strict state file and the "from now" rule; counting by anchored prefix only, never copying content; per-kind and 24-hour throttles; one `pusher` call per message, fixed Polish subject and sentence per kind built from constants, nothing read from a log or Docker; its own log with one line per eventful run and an exit line on an abnormal end, never a `pusher` call about itself. Tests are written first: `tests/deploy/watch_script_support.py` (stand-in `docker`, `pusher`, `flock`, `date` and the others on the seam of `backup_script_support.py`, which it imports and does not change) and `tests/deploy/test_loop2_watch.py` prove each behaviour of spec "Tests the change must bring", Watcher bullet; `tests/deploy/test_loop2_watch_message.py` carries the invariant of row 5 (a marker in a stand-in log line and in stand-in `docker` output never reaches `pusher`, the state, the log or any file; fixed subject and text), tagged `# invariant: <name>` with the name the foundation step gave row 5. `tests/quality/test_quality_invariants.py` adds `deploy/loop2-watch` to `BASH_SCRIPTS`; `tests/invariants/test_account_server_typecheck.py` names `deploy/loop2-watch` and `deploy/loop2-watch.cron` in `NOT_ROUTES`. Leaves for the human (Slice 7 writes the steps): installing the script as `/usr/local/bin/loop2-watch` and the cron file as `/etc/cron.d/loop2-watch`, one run by hand, the deliberate restart of the game container to see the `restarted` message arrive, and reading the log and the state file's age the next morning. Proved by no test: that `pusher` delivers, that cron runs the file, what Docker's `inspect` fields and the `--since` and `--until` windowing of `docker logs` really return.
- **Change:** `deploy/loop2-watch` · `deploy/loop2-watch.cron` · `tests/deploy/watch_script_support.py` · `tests/deploy/test_loop2_watch.py` · `tests/deploy/test_loop2_watch_message.py` · `tests/invariants/test_account_server_typecheck.py` · `tests/quality/test_quality_invariants.py`
- **Read:** `.runs/task-cycles/skad-wiem-o-awarii/spec.md:35-46` Constraints · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:84-84` B3, the line the watcher counts · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:93-127` C. The watcher · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:166-180` Trust boundaries and the crafted input each refuses · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:188-189` the watcher and routes tests in "Tests the change must bring" · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:217-225` Left to the maker · Foundation entries row 2 · Foundation entries row 5 · `foundations/decisions.md:4540-4575` D-233 · `foundations/decisions.md:4606-4626` D-235 · `foundations/decisions.md:271-289` D-12 · `foundations/decisions.md:291-304` D-13 · `foundations/decisions.md:344-368` D-16 · `foundations/decisions.md:370-393` D-17 · `foundations/decisions.md:5120-5154` D-252 · `foundations/invariants.md:155-163` loop2-host-sharing · `foundations/invariants.md:1129-1137` account-save-backup-failure-notice · `foundations/invariants.md:135-143` loop2-deploy-keeps-running · `foundations/environment_facts.md:442-446` mikrus-pusher-mail · `foundations/environment_facts.md:454-458` cron-d-file-rules · `foundations/environment_facts.md:27-31` mikrus-host-docker-workloads · `guidelines/coding.md` · `guidelines/testing.md` · `deploy/loop2-backup` · `deploy/loop2-backup.cron` · `deploy/loop2-deploy:1-60` header and constants block · `tests/deploy/backup_script_support.py` · `tests/deploy/test_loop2_backup.py` · `tests/invariants/test_account_save_backup_failure_notice.py`
- **Model:** same — an intricate Bash script (window, strict state file, locks, two throttles) whose test seam is built here, though the design is settled
- **Risk:** trust boundary — `deploy/**` (a root script on the shared host that reads container output an attacker can influence through the report route)
- **Checks:** `npm test -- tests/deploy/test_loop2_watch.py` (first failing) · `npm test -- tests/deploy/test_loop2_watch_message.py` (first failing) · `npm test -- tests/deploy/test_loop2_backup.py` (the seam is shared, unchanged) · `npm test -- tests/quality/test_quality_invariants.py` (shellcheck of the new script) · `npm test -- tests/invariants/test_account_server_typecheck.py`
- **Depends on:** Slice 1 (same file `tests/invariants/test_account_server_typecheck.py`) · Foundation entries rows 2 and 5

## Return

First line of the report as above, graded findings (Critical, Important, Minor, out of scope) with the reason, the checks you ran, your reaches beyond this handoff, and **Searches not found or unclear**.
