PASS 7a1c8ea30bae1f4d70ba151ee12e15e1a3d34793

# Review of slice 2 (the dump of both services' log before the containers are recreated)

Range: base `0908743ea1ce8c781f046890513fa07585de7d4a`, head `7a1c8ea` (one commit). `git rev-parse HEAD` is `7a1c8ea30bae1f4d70ba151ee12e15e1a3d34793`; `.the-way` is at `294af7fde45323ac1851c014a03071a97fc38d96`. Read-only on tracked files; mutations were made only in a scratch worktree, which I removed.

Blocking findings: none. Minor: 3. Out of scope: 1.

## Findings

### Critical

None.

### Important

None.

### Minor

1. `deploy/loop2-deploy:342-343` (`append_logs_to_dump`): the header `printf` has a literal line break inside its single-quoted format string, where `\n` is the usual form. Nothing in the report explains it. The report says a multi-line `$(...)` is unreadable to the invariant tests' shell reader, but that does not apply to a `printf` format. Evidence: in a scratch worktree I replaced it with `...new commit %s\n' "$(date ...` and `tests/invariants/test_loop2_host_sharing.py` (18), `tests/invariants/test_loop2_deploy_keeps_running.py` (13) and `tests/deploy/test_loop2_deploy_dump.py` (9) all stayed green. The behaviour is correct as written; it is a readability trap for the next editor.

2. `tests/deploy/test_loop2_deploy_dump.py` (`test_a_stuck_docker_is_cut_off_by_the_time_limit_and_the_deployment_goes_on`): it asserts an elapsed time under 25 s against a stand-in that hangs 30 s with the limit set to 1 s. That leaves a margin of about 24 s, so it is unlikely to flake. It is a wall-clock bound on a loaded machine, and exit 124 plus the single `warning` line already prove the cut; the bound adds only a guard against the stand-in finishing by itself. It is fine to keep.

3. `deploy/loop2-deploy:339-345`, the dump reads the NEW commit's `compose.yaml` (spec A1 says so and `up` uses the same file). For a rollback to a commit whose `compose.yaml` lacks `app` or `cloudflared` (or has no `compose.yaml`; that case already fails the build, exit 7, before the dump), `docker compose logs` fails, the script warns and the log of the running containers is not kept. The warning text says "the log of the containers it replaces is not kept", so the loss is not silent. This is the cost D-352 accepts ("covers only containers that a deployment through the installed script replaces") and the spec's own design; the skill text of a later slice may want to mention it for rollbacks across a Compose change. No change is demanded.

### Out of scope

- The same file-append design means a deployment repeated on the same commit appends the whole log again each time (the spec rejected `--since`; D-352 accepts the growth and the logrotate size cap in `deploy/loop2-app.logrotate` handles it). Not a finding against this slice.

## Verification of the author's claims (report `10-slice2-report.md`)

- Stage order: `dump_container_logs` stands between `build_image` and `start_container` in `main` (`deploy/loop2-deploy:432`). Verified by reading and by mutation A below.
- Command: `timeout "$DUMP_TIMEOUT_SECONDS" docker compose --project-name loop2 -f "$CHECKOUT_DIR/compose.yaml" logs --no-color --timestamps app cloudflared`, no `--tail`. Matches spec A1 and the form `loop2-host-sharing` allows (the test passes unchanged).
- Streams: `errors=$(append_logs_to_dump 2>&1 >>"$DUMP_FILE")` sends stdout to the dump file and stderr to the captured variable, then `append_to_log "$errors"` (deploy log file only). The order of the two redirections is right: `2>&1` first binds stderr to the substitution pipe, then `>>` redirects stdout. If the `>>` itself fails (unwritable path), the shell's message goes to the captured stderr and status is 1; no dump content exists, so none can leak.
- Result line: `dump: the size of <file> went from N to M bytes` on success; `warning: ... failed (exit S; any message is in <log>)` on failure; `return 0` so the deployment continues. Neither line carries dumped content. `set` is `-uo pipefail` (no `-e`), as in the rest of the script, so a non-zero status inside the function cannot stop the run; there are no traps in this script. `status=$?` directly follows the assignment, so it is the substitution's status.
- Header: UTC time, `loop2-deploy`, `PREVIOUS_COMMIT` (a validated 40-hex name or `none`) and `REQUESTED` (validated 40-hex name), nothing else; the format is a constant and the values go in as `%s` arguments.
- Six pairs: the three new constants are in the block the tests replace, `compare_installed_script` compares six pairs with the existing function and warn-only behaviour; the missing-source case warns six times in `test_loop2_deploy_build.py`.
- Changed existing tests: `test_loop2_deploy_build.py` (three pairs to six) and `test_loop2_deploy_switch.py` (one `logs` call to two, the failed-start one keeps `--tail 50`). The reasons are the slice's requirements, no assertion was weakened; the switch test now also asserts the order dump, `up`, last lines, and that dumped content never reaches the console or the deploy log. This satisfies "Changing an existing test" in `guidelines/testing.md`.
- Fixture: new constants overridden in the copy, the six installed copies written by `install()`, stand-in bytes for the watcher files that do not exist before Slice 5 (a reasonable choice: the comparison is byte equality). The stub gained `stderr` and `hang_seconds` (`exec sleep`), which the new tests use; the other users of `answer()` keep the default behaviour (`test_loop2_deploy_input.py`, `_commit.py`, `_build.py`, `_switch.py` all green).

## The invariant `loop2-deploy-log-dump` (Points to weigh, first point)

- Both cases carry `# invariant: loop2-deploy-log-dump` as the first line of the test body: `test_a_deployment_appends_the_log_of_the_containers_it_replaces` (`test_loop2_deploy_dump.py:88`) and `test_a_failing_dump_warns_and_the_deployment_still_starts_the_containers` (`:165`). The module docstring names D-352 and the invariant.
- Would each case fail if the property broke? I mutated the script in a scratch worktree of the head commit and ran `test_loop2_deploy_dump.py`:
  - A, dump moved after `start_container`: FAIL, 3 failures (the order test, the byte-count test, the failing-dump order test).
  - B, a failed dump ends the deployment (`exit 9` in place of `return 0`): FAIL, 3 failures (failing dump, unwritable file, stuck Docker).
  - The missing warning (dump not run at all) is covered by the author's failing-first run: 7 of 9 failed with an empty body, and the exact-arguments and `warning` assertions would also fail on a dropped `warning:` line (`assert_warned_and_went_on` requires exactly one `warning` line naming the file and `exit N`).
  - The test file was a failing run first, as the slice requires (author's report; the empty-body run is plausible, since the two stop-guard tests pass with no dump, which is right).
- The invariant text says "appends the log of the containers it replaces to `/var/log/loop2-app.log` before it starts the new ones, and when that append fails it says so in the deploy log and goes on". The code and the two tagged cases match it; the path is the constant `DUMP_FILE=/var/log/loop2-app.log`.

## Trust boundary (`deploy/**`) and irreversible operations

- Crafted commit names: only validated names reach the header or any command; the dump adds no new input. `loop2-deploy-trigger-input` and `test_loop2_deploy_input.py` pass.
- Hostile content of the dumped log: it is written only to the dump file by Docker's stdout, never read back, evaluated or printed by the script. The script reads only the file's size (`stat -c %s`), validated as digits. Hostile Docker stderr goes to the deploy log file only through `append_to_log` (a `printf '%s\n'`), not to the console, as the other Docker output already does.
- A symlink or a non-writable file at the dump path: `>>` follows a symlink, as it does for the existing `LOG_FILE` and `LOCK_FILE` of the same script; the path is a constant in `/var/log`, which an unprivileged party does not control, so this adds no new reach. A non-writable path is tested (`test_a_dump_file_that_cannot_be_written_warns_and_the_deployment_goes_on`, warning with `exit 1`, `up` still called). A directory or other non-regular file at the path fails the redirection the same way.
- A stuck `docker`: bounded by `timeout 300`; tested with the constant overridden to 1 s (exit 124 warning, deployment reaches `up`), so the deployment lock cannot be held by the dump.
- Dump stage vs `loop2-deploy-keeps-running`: it changes no container, runs after all stop stages and before `up`; the stop cases (failed build, memory, held lock, refused commit) dump nothing (tested). The invariant test passes unchanged.
- Dump stage vs `loop2-host-sharing` / D-17: the only new Docker command is `compose logs --no-color --timestamps` on the project's own two services, which the host-sharing test already allows; it passes unchanged.
- The change prepares what a human installs; it runs nothing against a server (every Docker, `flock` and `git`-network call in the tests is a stand-in under a temporary tree; the fixture overrides every path). Verified by reading the fixture diff and by the guard in `guard_stubs`, which the existing tests keep.
- Umask 027 applies to the dump file's creation (0640), as for the deploy log; it holds `accountId` lines for weeks, which D-352 states as accepted.

## Declined to judge

- Whether Docker's real `compose logs` reads a `local`-driver container, and how `logrotate` behaves on the file: facts the spec names as unprovable in the sandbox (human check E3 in a later slice).
- The exact retention numbers (the 300 s limit, the four generations): chosen bounds in the spec and D-352, not part of this slice's correctness.
- The `deploy/loop2-watch` and `deploy/loop2-watch.cron` files and the skill text: Slices 5 and later.

## Checks I ran (all in the reviewed worktree unless noted)

| Command | Exit |
|---|---|
| `npm test -- tests/deploy/test_loop2_deploy_dump.py` (9 tests) | 0 |
| `npm test -- tests/deploy/test_loop2_deploy_build.py` (14) | 0 |
| `npm test -- tests/deploy/test_loop2_deploy_switch.py` (10) | 0 |
| `npm test -- tests/deploy/test_loop2_deploy_commit.py` (18) | 0 |
| `npm test -- tests/deploy/test_loop2_deploy_input.py` (8) | 0 |
| `npm test -- tests/invariants/test_loop2_deploy_keeps_running.py` (13) | 0 |
| `npm test -- tests/invariants/test_loop2_deploy_trigger_input.py` (10) | 0 |
| `npm test -- tests/invariants/test_loop2_host_sharing.py` (18) | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` (5, shellcheck and ruff of the new files included) | 0 |
| Scratch worktree of `7a1c8ea`, mutation A (dump after `up`), `python -B scripts/test.py tests/deploy/test_loop2_deploy_dump.py` | 1 (3 failures, as intended) |
| Same, mutation B (failed dump ends the run) | 1 (3 failures, as intended) |
| Same, header `\n` instead of the literal line break: host-sharing, keeps-running, dump tests | 0, 0, 0 |

Not run: the full gate, `foundation_check.py` (the cycle's own run), the author's extra files (`test_loop2_backup.py`, `test_loop2_log_storage.py`, `test_loop2_tunnel_image.py`), which I did not need for this slice. The mutation C in the author's list (stdout and stderr swapped) I checked by reading the redirection order rather than by running it.

## Reaches beyond the handoff

- `compose.yaml` (head): to see whether `docker compose logs` needs `LOOP2_COMMIT` (it does not: the variable has a default, `${LOOP2_COMMIT:-unknown}`) and whether the services carry `logging: local` (they do, Slice 1).
- `foundations/decisions.md:7867-7881` (D-352) and `7882-7895` (D-353): D-352 is the decision the invariant derives from, and its *complies*/*violates* list is what I compared the code with. D-353 was read for the watcher's reliance on the dump, which this slice does not touch.
- `scripts/test.py`: to run a single Python test file in a scratch worktree without `npm`.
- `guidelines/coding.md` (lines 125-165, on last-resort handling and logging scope) and `guidelines/testing.md`: for the "Hiding a failure", "Changing an existing test" and "Flaky tests" rules. The failed dump is neither hidden nor swallowed: it is a logged warning.

## Searches not found or unclear

none
