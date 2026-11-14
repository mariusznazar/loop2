# Fix report - Minor findings M1 to M6 of the review of the whole change, task cycle `serwer-odczyty-i-straznik`

**Status:** done

Worktree `the root of the worktree`, branch `task/serwer-odczyty-i-straznik`, range from `b5a316f3`.

## Commits

| Commit | Findings | Files |
|---|---|---|
| `1ea58806` | M1, M2, M3 | `deploy/loop2-watch`, `tests/deploy/test_loop2_watch.py`, `tests/deploy/watch_script_support.py`, `tests/invariants/test_loop2_distinct_address.py` |
| `1de7a15c` | M6 | `.claude/skills/loop2-deploy/SKILL.md`, `.agents/skills/loop2-deploy/SKILL.md` |
| `c89f6a40` | M4 | `foundations/environment_facts.md` |
| `1d6058e2` | M5 | `foundations/environment_facts.md` |

Line counts (whole range): `deploy/loop2-watch` +11 -8, `tests/deploy/test_loop2_watch.py` +11 -1, `tests/deploy/watch_script_support.py` +6, `tests/invariants/test_loop2_distinct_address.py` +4 -3 (re-wrap of one bullet), the two skill copies +5 -5 each, `foundations/environment_facts.md` +8 -8.

## The findings

**M1 fixed.** `read_backup_log` in `deploy/loop2-watch` now runs `tail` under `timeout --kill-after="$KILL_WAIT_SECONDS" "$BACKUP_LOG_WAIT_SECONDS"`, the same idiom as the docker calls. `DOCKER_WAIT_SECONDS` is named for docker, so the bound is a new constant `BACKUP_LOG_WAIT_SECONDS=60`, in the marked constants block next to it. `7>&-` now stands on `tail` (as before, now on the `timeout` command that starts it, so it reaches `tail`), on `tr` and on `cut`, which is the script's own pattern for children (`read_container`, `read_logs`, `send_message`). The last command of the pipe, `find_send`, is a function run in the shell itself by `lastpipe`, so it cannot be started with `7>&-` and holds the lock as the script's owner does. A timeout gives status 124 at `PIPESTATUS[0]`, so the existing branch sets `unreadable`, which counts as no send; nothing of a line is kept. The two comments that describe the read now say so.
Check: new test `test_a_log_that_never_gives_its_lines_is_cut_off_and_counts_as_no_send` in `tests/deploy/test_loop2_watch.py` (class `TheBackupKind`); it puts a real named pipe with no writer where the log is (`mkfifo` of Git Bash, new helper `make_backup_log_a_pipe_with_no_writer` in `tests/deploy/watch_script_support.py`), sets the bound and kill delay to 1 s in the copy, and asserts that the run sends `backup`, logs `backup_log=unreadable`, and that the next run does not log "another run holds". It ran on this machine and was not skipped.
Seen failing first: with the `timeout` removed from the script (nothing else changed) the test failed in 47.4 s with `AssertionError: the run did not end within 45 s; its processes were stopped` (exit 1); with the `timeout` it passes (see the checks). The script was restored byte for byte afterwards (`git diff` shows only the fix).
Not covered by a test: the `7>&-` on `tr` and `cut`. A test of it would need a stalled `tr` or `cut`, which cannot be made without replacing them; `timeout` ends `tail`, so `tr` and `cut` end by themselves, and the descriptor closure is a second line of defence. Named here, not contested: the bound itself is tested.

**M2 fixed.** Re-wrapped, no word of meaning changed: the sentence at `deploy/loop2-watch:42` ("This script never calls pusher about itself ..."), the sentence at `:55` ("No environment variable and no argument changes one ..."), and the bullet of `tests/invariants/test_loop2_distinct_address.py:9-12` (the whole bullet re-flowed so no line is over 100 columns). In the script I added the words about the time limit only to the two comments that describe the read of the backup log, because M1 changes what they say ("or not within the time limit"). Check: `awk 'length>100'` shows no line over 100 columns in `tests/invariants/test_loop2_distinct_address.py` and lines 42 and 55 of the script are no longer in the list of long lines (the script keeps its other, older long lines, which the finding does not name).

**M3 fixed.** The stray blank line before `test_a_last_backup_line_is_read_as_state_and_the_next_run_writes_it` in `tests/deploy/test_loop2_watch.py` is gone. Check: `tests/quality/test_quality_invariants.py` (Ruff's blocking set) passes.

**M4 fixed.** Seven facts carried the claim "tail/ls from the package whose version `stat --version | head -1` prints on the same host as "stat (GNU coreutils) 8.32"" (the finding says nine and names seven; the file held seven, and the other two reads of that kind do not occur): `loop2-deploy-dump-to-deployed-time`, `loop2-deploy-resource-gate-lines`, `loop2-deploy-stage-exit-lines`, `mikrus-host-logrotate-schedule`, `loop2-app-log-file-names`, `loop2-backup-log-nightly-sends`, `loop2-watch-log-flock-status`. In each, the claim, with its quoted stat output (which was the output of another command, not of the reading the entry names), is replaced by `tail, whose version no reading the skill allows prints` (`ls, ...` in the two facts that use `ls`), the wording slice 7's facts already use. Every other quoted output is unchanged. No sentence of a fact changed. Edited in place through the project skill `the-way-record-environment-fact`, which I read (SKILL.md, template, read.md, decide_entry.md, draft.md, write.md). Check: `grep -c "package whose" foundations/environment_facts.md` prints 0; `python -B .the-way/elements/common/foundation_check.py` exits 0.

**M5 fixed, within the limit the finding itself names.** The fact `loop2-app-log-sqlite-busy-lines` is brought to a reading in exactly the form the skill's list allows. Its sentence is unchanged (already "the dump file and its rotated copy"). New *Source*: `grep -F -m 50 -- 'SQLITE_BUSY' /var/log/loop2-app.log` and the same with `/var/log/loop2-app.log.1`, grep (GNU grep) 3.7 whose version `grep --version | head -1` prints, no output from either; run 2026-11-14. The `; echo "exit=$?"` form is gone from the entry. The MCP tool returns only standard output, so the exit status (1, no match) is no longer shown; the entry says "no output", which is what was read.
No fact or decision names `loop2-app-log-sqlite-busy-lines` in `foundations/` (only its own heading matches), so the fact has no dependant today; whether it stays, and what D-205's remark says about the span the facts cover, is for the return step (I edited no decision, as ruled).
Readings, one at a time through the `mikrus` MCP tool `exec` (the server's identity is not written here). Raw outputs:

1. `grep -F -m 50 -- 'SQLITE_BUSY' /var/log/loop2-app.log` -> `{"output": ""}`
2. `grep -F -m 50 -- 'SQLITE_BUSY' /var/log/loop2-app.log.1` -> `{"output": ""}`
3. `grep --version | head -1` -> `{"output": "grep (GNU grep) 3.7"}`
4. `ls -1 /var/log/loop2-app.log*` (allowed, a control that both files exist; not quoted in the entry, the fact `loop2-app-log-file-names` holds the same output) -> `{"output": "/var/log/loop2-app.log\n/var/log/loop2-app.log.1"}`

Also run: the `servers` tool (no arguments), which lists one server. Limit that remains, as the finding said: the reading covers the dump and its `.1` copy only, not the log of the running containers, and the dump begins on 2026-11-11 by the executor's earlier control; no widening was made.

**M6 fixed.** In `.claude/skills/loop2-deploy/SKILL.md` the sentence now reads "It reads state and health of both containers, the fresh failure lines of the game container's log and the last lines of the log of the nightly backup, skips a run while a deployment or the backup holds the deploy lock, and calls `pusher` ..." (the rest of that paragraph re-flowed). One copy edited, `cp` over `.agents/skills/loop2-deploy/SKILL.md`, `cmp` printed no difference. Check: `tests/agent_workflow/test_loop2_deploy_skill.py` and `tests/agent_workflow/test_tracked_file_private_paths.py` pass.

## Checks (command, exit code)

All run from the test file's directory with `python -B -m unittest <module>[.<Class>]`, one at a time. The named runner `python -B scripts/test.py <file>` was not run: the handoff says it did not finish in 17 minutes in one slice and the machine is short of memory; the substitute finished here. `npm test` was not run, as instructed.

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (root; last line "0 errors") | 0 |
| `tests/agent_workflow`: `python -B -m unittest test_loop2_deploy_skill` (5 tests) | 0 |
| `tests/agent_workflow`: `python -B -m unittest test_tracked_file_private_paths` (1 test) | 0 |
| `tests/invariants`: `python -B -m unittest test_loop2_distinct_address` (2 tests) | 0 |
| `tests/quality`: `python -B -m unittest test_quality_invariants` (5 tests, 17 s) | 0 |
| `tests/deploy`: `python -B -m unittest test_loop2_watch.TheBackupKind` (7 tests, with the new test) | 0 |
| `test_loop2_watch.` `TheConstants`, `TheDockerCommands`, `TheBackupLogAsInput`, `TheWatcherCountsWhatTheBackupScriptWrites`, `TheDeploymentLock`, `TheWatchersOwnLock`, `TheLog`, `TheKinds`, `TheWindow`, `TheState`, `TheThrottles`, `TheAbnormalEnds`, `TheScheduleAsCronReadsIt` (each class on its own) | 0 for each |
| `tests/deploy`: `python -B -m unittest test_loop2_watch_message` | 0 |
| the new test against the script with the `timeout` removed (the break) | 1 (45 s limit of the fixture exceeded) |

Together these are every class of `test_loop2_watch.py` (`WithFixture` is the base class, with no tests).

## The own-work check

The requirement of the findings that the work most likely does not meet: M1's "keep every guarantee the watcher's tests give (nothing of a line of the log is kept, a missing or unreadable log counts as no send)" together with its new bound. Check: the classes `TheBackupKind`, `TheBackupLogAsInput` (look-alike lines, huge lines, lines without a newline, a log far longer than the part read) and `TheWatcherCountsWhatTheBackupScriptWrites` ran against the changed script and pass, as does `TheConstants` (the copy differs from the script only inside the marked block, and the new constant is inside it). The mutation in the head: the bound removed (caught by the new test, seen failing); the bound set to a value that is too small, e.g. 0 (`timeout 0` means no limit, so the read would stay unbounded: not a mutation the tests can catch, and not one to guard against by a test of a constant); `7>&-` dropped from `tr` or `cut` (not caught, see M1); the status of the pipe not read (caught by `test_a_missing_empty_or_unreadable_log_counts_as_no_send`).

## Reaches beyond the dispatch

- `tests/deploy/watch_script_support.py`, the fixture seam, read whole before its one added method (the dispatch names `test_loop2_watch.py` and the support only through the tests it reaches). Why: the test of M1 needs a pipe in place of the log.
- `.the-way/elements/environment-facts/skill/{SKILL,read,decide_entry,draft,write}.md` and `template.md` (the dispatch names the skill; the files are what it points to).
- `foundations/environment_facts.md`: whole file not read; I read the seven entries and the entry of M5 (via `grep -n` and `sed` of the line ranges), and the neighbouring entries for the wording (`curl`, `systemctl`, `cmp`, `docker stats`).
- `.claude/skills/loop2-deploy/SKILL.md` lines 56-100 and 284-320 (the list of allowed readings and the sentence of M6).

## Choices

- New constant `BACKUP_LOG_WAIT_SECONDS=60` instead of reusing `DOCKER_WAIT_SECONDS`: the existing constant is named for docker and a test changes it for the docker hang test; reusing it would tie two unrelated bounds together. Cost if wrong: one more constant in the marked block, none beyond.
- In the facts of M4 I also dropped the quoted `stat --version` output. It was the output of another command, quoted only to back the package claim; the handoff says to keep every quoted output "as it is" of the reading the entry names, not of the claim. Cost if wrong: the claim returns by one line in git history.
- The fact of M5 does not quote the exit status, since the tool returns standard output only and a form with `echo` is not on the list.
- M2: three comment lines were named; in the script I did not touch the other lines over 100 columns that the base file already had.

## Problems as observed

- The review's M4 says nine facts; the file held seven with the claim (both slice reports I did not need to open: the grep of the claim found seven). No other fact held it.
- The fact `loop2-app-log-sqlite-busy-lines` has no dependant in `foundations/` (grep of its identifier finds only its heading). By the template ("A fact stands only while an invariant's Rests on or a decision's Based on names it") this is for the return step with D-205: either the decision names the fact in its *Based on*, or the fact is withdrawn. Not a guess about cause, a reading of the file.

## Unread material

- `guidelines/coding.md` and `guidelines/testing.md`: read whole (testing.md in two reads, 1-372 and 373-472).
- `reports/slice-<n>-report.md`, `task.md`, `reports/whole-change-review.md`: not read; the findings file and the handoff sufficed, and no finding sent me to a slice report.
- `foundations/environment_facts.md`, `deploy/loop2-watch`: the script read whole; the facts file read only in part as listed above.
- The rest of `.claude/skills/loop2-deploy/SKILL.md` and `references/`: not read.

## Searches not found or unclear

- The handoff's "M5 ... exactly the form the skill's list allows" is clear: the skill's list (lines 81-85 of the skill) allows `grep -F -m 50 -- '<fixed string>'` of the dump and of `.1`; no unclear point.
- The finding M4 says nine facts and names seven; searched for the claim in the whole file, found seven.
- The exit status of a read through the MCP tool is not returned; the form with `echo` that gave it is not on the list, so the entry no longer records it.
- Named runner `scripts/test.py <file>`: not run (the handoff says it does not finish on this machine); the substitute is reported above.
