# Report 10-slice2 — executor of slice 2 (the dump of both services' log before the containers are recreated)

**Status:** done

## Commits

- `7a1c8ea` feat: :sparkles: dump the log of both loop2 services before the containers are recreated and compare the installed copies of the watcher and the logrotate file (on `task/skad-wiem-o-awarii`, base `0908743`, not pushed)

## Files changed (added / removed lines)

| File | + / - |
|---|---|
| `deploy/loop2-deploy` | 48 / 2 |
| `tests/deploy/deploy_script_support.py` | about 45 / 11 |
| `tests/deploy/test_loop2_deploy_dump.py` (new) | 231 / 0 |
| `tests/deploy/test_loop2_deploy_build.py` | about 25 / 8 |
| `tests/deploy/test_loop2_deploy_switch.py` | about 19 / 6 |

(total of the commit: 367 insertions, 28 deletions)

## What was made

`deploy/loop2-deploy`:
- new constants: `DUMP_FILE=/var/log/loop2-app.log`, `DUMP_TIMEOUT_SECONDS=300`, `INSTALLED_WATCH_SCRIPT=/usr/local/bin/loop2-watch`, `INSTALLED_WATCH_SCHEDULE=/etc/cron.d/loop2-watch`, `INSTALLED_LOGROTATE=/etc/logrotate.d/loop2-app` (the paths are those of spec lines 95 and A3);
- `dump_container_logs` (with `dump_file_size` and `append_logs_to_dump`), called in `main` between `build_image` and `start_container`. `append_logs_to_dump` writes the header line `<UTC time> loop2-deploy | previous commit <prev>, new commit <new>` and then runs `timeout 300 docker compose --project-name loop2 -f <checkout>/compose.yaml logs --no-color --timestamps app cloudflared` (no `--tail`); the call is `errors=$(append_logs_to_dump 2>&1 >>"$DUMP_FILE")`, so standard output goes to the dump file and standard error is captured and handed to `append_to_log` (deploy log file only). Result in the deploy log and console: `dump: the size of <file> went from N to M bytes`, or `warning: the dump of the log of both loop2 services to <file> failed (exit S; ...)`, never any content. A failed dump returns 0, so the deployment goes on;
- the installed-copy comparison grows from three to six pairs (`deploy/loop2-watch`, `deploy/loop2-watch.cron`, `deploy/loop2-app.logrotate`), same function, same warn-only behaviour.

Tests:
- `deploy_script_support.py`: overrides of the dump file and the three installed paths in the copy, directories for them, `deployable_commit()` holds the six files, `install()` writes the six copies; the stub `answer()` gained `stderr=` and `hang_seconds=` (a stuck tool: the rule `exec sleep`s), used by the new tests;
- `test_loop2_deploy_dump.py` (new, 9 tests): dump after the build and before `up` with the exact command, header and stand-in output appended to existing content, first deployment (`previous commit none`), the `dump:` line with byte counts and no content, Docker's standard error in the deploy log file only; failing dump (Docker exit 3), unwritable dump file, stuck Docker cut by `timeout` (constant overridden to 1 second in the copy, exit 124) — each warns and reaches `up` and ends 0; deployments that stop before `up` (failed build, too little memory, held lock, refused commit) dump nothing. Two tests carry `# invariant: loop2-deploy-log-dump` (the dump that works, the dump that fails);
- `test_loop2_deploy_build.py`: docstring, the missing-sources case (3 to 6 warnings), three more pairs in the differing and unreadable cases, "all six differing";
- `test_loop2_deploy_switch.py`: the failed-start case now expects two `logs` calls, the dump (no `--tail`) before `up` and the last lines (`--tail 50`) after it, and that dumped content never reaches the console or the deploy log.

## Checks (command and exit code)

Failing run first (the script with the new constants and an empty `dump_container_logs` body, the new test file in place):
- `npm test -- tests/deploy/test_loop2_deploy_dump.py` exit 1: 7 failures of 9, all assertions reached (the 2 passing are the "stops before `up` dumps nothing" guards, which hold with no dump). An earlier run of the same had one error (a read of the missing dump file); the helper was changed to assert that the file exists, then 7 assertion failures.

Passing runs, final code:
- `npm test -- tests/deploy/test_loop2_deploy_dump.py` exit 0 (9 tests)
- `npm test -- tests/deploy/test_loop2_deploy_build.py` exit 0 (14)
- `npm test -- tests/deploy/test_loop2_deploy_switch.py` exit 0 (10)
- `npm test -- tests/deploy/test_loop2_deploy_commit.py` exit 0 (18)
- `npm test -- tests/deploy/test_loop2_deploy_input.py` exit 0 (8)
- `npm test -- tests/invariants/test_loop2_deploy_keeps_running.py` exit 0 (13)
- `npm test -- tests/invariants/test_loop2_deploy_trigger_input.py` exit 0 (10)
- `npm test -- tests/invariants/test_loop2_host_sharing.py` exit 0 (18)
- `npm test -- tests/quality/test_quality_invariants.py` exit 0 (5; shellcheck of the script included). First run exit 1: `test_ruff_source_rules` RUF015 on two `[...][0]` in the new test file; fixed with an `index_of` helper, second run exit 0.

Also run, outside the slice's list, because `deploy_script_support.py` is shared: `tests/deploy/test_loop2_backup.py` exit 0 (26), `tests/deploy/test_loop2_log_storage.py` exit 0 (4), `tests/deploy/test_loop2_tunnel_image.py` exit 1 only because its one test is skipped (needs a real Docker; the gate counts a skip-only run as a failure; not touched by this slice).

Not run: the full gate and `foundation_check.py` (the orchestrator runs them).

## Own-work check (step 3)

Requirement most likely not met: "a failed dump never stops the deployment, and nothing of the dumped content reaches the console or the deploy log". Checks that would catch it, and what they showed: the dump file made unwritable (parent directory missing), Docker exiting 3, and Docker hanging 30 s under a 1-second `timeout` each end with exit 0, one `warning:` line naming the file and the exit status (1, 3, 124), `up` called once, last line `deployed ...`; the stand-in markers of the dumped lines appear only in the dump file, not in the console output or the deploy log; Docker's standard error marker appears only in the deploy log file.

Mutations considered: dumping after `up` (order test fails); dropping `--timestamps` or adding `--tail` (exact-arguments test fails); stdout and stderr swapped in the redirection (the standard-error test fails: the marker would land in the dump file); a failed dump making the script return non-zero or `fail` (the three failing cases fail); the dump running in a stopped deployment (the four stop cases fail); a header with more than commit names (the header regex is a full match); append replaced by overwrite (the older-content line is checked first). Unprotected: the value 300 of the time limit (a constant; the test proves a `timeout` is applied, not its value, as a value only a decision changes); that the real `docker compose logs` reads a `local`-driver container (named in the spec as unprovable here).

## Choices (way chosen, way rejected, cost if wrong)

- Stand-in bytes for the watcher and its cron file in the fixture (`WATCH_SCRIPT_BYTES`, `WATCH_SCHEDULE_BYTES`), because `deploy/loop2-watch` and `deploy/loop2-watch.cron` do not exist until Slice 5; the logrotate file is read from the repository. Rejected: reading the repository files when present (the fixture would behave differently before and after Slice 5). Cost if wrong: the test does not read the real watcher files; the comparison is byte equality, so nothing is lost.
- Installed paths of the watcher (`/usr/local/bin/loop2-watch`, `/etc/cron.d/loop2-watch`) taken from spec line 95; Slice 5 and Slice 7 must use the same names.
- The command is run through a function call with `2>&1 >>"$DUMP_FILE"` inside a single-line `$(...)`, not a brace group over several lines: the shell reader of `tests/invariants/loop2_invariant_support.py` treats a multi-line `$(...)` as unreadable (its own test says so). Rejected: a multi-line group. Cost: none seen.
- The `dump:` line states sizes before and after only (`went from N to M bytes`), not a computed difference, so a rotation by copytruncate during the run cannot print a negative number.
- Header wording: `<UTC time> loop2-deploy | previous commit <prev>, new commit <new>`, the time, source, bar shape that spec A4 gives for the other lines of the file. A deployment with no running container writes `previous commit none`.
- A failed dump leaves a partial append in the file (the header and whatever Docker printed before it failed); not truncated back. Cost: a header with no content below it, with the warning in the deploy log naming the failure.
- Changed existing tests: `test_loop2_deploy_build.py` (three pairs to six; the case "all three differing" renamed "all six differing") and `test_loop2_deploy_switch.py` (one `logs` call to two). The reason is the requirement of this slice (the comparison covers six pairs; the dump is a second `logs` call), not a failing test; no assertion was weakened. No invariant test changed (`loop2-deploy-keeps-running` and `loop2-host-sharing` pass unchanged: the `logs --no-color --timestamps` form was already on the host-sharing list).

## Plan and code disagreements

None structural. Small: the plan says the new installed-copy sources are compared "with `deploy/loop2-watch`..."; those files do not exist yet, handled as above.

## Reaches beyond the dispatch

None. Everything read was named in the handoff; `tests/deploy/test_loop2_log_storage.py`, `deploy/loop2-app.logrotate`, `compose.yaml`, `tests/quality/test_quality_invariants.py` and `tests/invariants/loop2_invariant_support.py` (`docker_commands`, to see why a multi-line `$(...)` is unreadable) were looked at for context.

## Observed, not caused by this slice

- The script's clock in the sandbox prints 2026-11-08 in the log lines; irrelevant.
- Each deployment on a server where the watcher and logrotate copies are not yet installed warns twice or thrice about unreadable installed copies, as the spec accepts (human installs them in Slice 7's steps).

## Searches not found or unclear

none
