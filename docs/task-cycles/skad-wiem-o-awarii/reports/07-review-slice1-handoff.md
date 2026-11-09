# Handoff 07-review-slice1 — review of slice 1

You review slice 1 of the task cycle `skad-wiem-o-awarii` as an agent that did not make it, with `review-change`, read-only.

## Delegation and place

- The cycle's orchestrator has delegated intermediate choices to itself; nothing you receive is the owner's approval. Questions go to the orchestrator.
- Work from the worktree root `the root of the repository` (branch `task/skad-wiem-o-awarii`). Pin `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`. Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`), read whole; `fix.md` and `whole_change.md` only when their step comes. Change no tracked file; write only your report.
- **Range to review:** base `00aa818e59ab484358970f98af1f4ab61e969e4c`, head `89dfbcb` (`git diff 00aa818e59ab484358970f98af1f4ab61e969e4c..89dfbcb`, `git log 00aa818e59ab484358970f98af1f4ab61e969e4c..89dfbcb`); confirm `git rev-parse HEAD` is the head. The range also holds the foundation entries written before the slice (slice 1 only): the commits `00aa818..bbefd44` are part of what you review for this slice.
- Report path: `.runs/task-cycles/skad-wiem-o-awarii/reports/07-review-slice1-report.md`; its first line is `PASS <sha>` or `FAIL <sha>` (or `questions`).
- Author's report(s), a set of claims to verify: executor's `.runs/task-cycles/skad-wiem-o-awarii/reports/06-slice1-report.md`; and for the entries of the range, the foundation-entries agent's `.runs/task-cycles/skad-wiem-o-awarii/reports/05-foundation-entries-report.md`
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

- Compare the logrotate stanza with every directive and effect that spec A3 names (spec lines 64-66) and with what each directive does under logrotate(8); the executor's report raises one concern about it.
- The foundation entries of the range (D-352, D-353, the edit of D-347, the three invariants, the three environment facts) are reviewed against the task's rows 1-8 and the spec; the invariants of rows 4-6 carry `Method: test` before their tests exist (the tests come with slices 2, 3 and 5).

## The slice (copied word for word from `plan.md`)

### Slice 1 — The `local` log driver and the logrotate file

- **Goal:** `compose.yaml` gives both services `app` and `cloudflared` the log driver `local` and no other `logging` option (spec A2); the repository holds `deploy/loop2-app.logrotate`, the one stanza of spec A3 for `/var/log/loop2-app.log` (weekly or past 100 MiB, four rotated files, `delaycompress`, `missingok`, `notifempty`, `copytruncate`, `su root root`, no `create`, no user name); a new test `tests/deploy/test_loop2_log_storage.py` (written first, failing) reads `compose.yaml` and the logrotate file as text with the standard library and requires exactly that; `tests/invariants/test_account_server_typecheck.py` names `deploy/loop2-app.logrotate` in `NOT_ROUTES` so the route test still passes. Leaves for the human (written into the skill by Slice 7): creating the log file with the deployment account's owner, installing the logrotate file as `/etc/logrotate.d/loop2-app`, a dry run and one forced rotation, and checking that logrotate runs daily on the host.
- **Change:** `compose.yaml` · `deploy/loop2-app.logrotate` · `tests/deploy/test_loop2_log_storage.py` · `tests/invariants/test_account_server_typecheck.py`
- **Read:** `.runs/task-cycles/skad-wiem-o-awarii/spec.md:35-46` Constraints · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:64-66` A2 and A3 in "A. The record of the game's log" · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:187-187` the Compose test in "Tests the change must bring" · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:189-189` the routes test in the same section · `.runs/task-cycles/skad-wiem-o-awarii/spec.md:217-225` Left to the maker · `foundations/decisions.md:370-393` D-17 · `foundations/decisions.md:291-304` D-13 · `foundations/decisions.md:214-232` D-09 · `foundations/invariants.md:155-163` loop2-host-sharing · `guidelines/coding.md` · `guidelines/testing.md` · `deploy/loop2-backup.cron` · `tests/deploy/test_deploy_workflow.py` (example of a standard-library text test)
- **Model:** cheaper
- **Risk:** trust boundary — `deploy/**` (the logrotate file is a new file of `deploy/`)
- **Checks:** `npm test -- tests/deploy/test_loop2_log_storage.py` (first written failing, then passing) · `npm test -- tests/invariants/test_account_server_typecheck.py` · `npm test -- tests/invariants/test_loop2_host_sharing.py`
- **Depends on:** none

## Return

First line of the report as above, graded findings (Critical, Important, Minor, out of scope) with the reason, the checks you ran, your reaches beyond this handoff, and **Searches not found or unclear**.
