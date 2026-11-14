PASS 1d6058e20d50a7b042f4f9843c67546787f12275

# Review of the fix of the Minor findings M1 to M6 (range b5a316f3..1d6058e2)

`git rev-parse HEAD` = 1d6058e2 (matches); four commits (`1ea58806`, `1de7a15c`, `c89f6a40`, `1d6058e2`); seven files; `git status --short` empty before and after my checks. Method: `review-change` SKILL.md and `fix.md`. Bound: `reports/whole-change-findings.md` (M1 to M6) and `reports/fix-report.md`. M7, M8, M9 are not in the findings file and I did not review them.

Counts: new blocking 0; remaining Minor 1 (M5, as the finding itself allowed); new Minor 0.

## Each finding

- **M1 fixed.** `deploy/loop2-watch`, `read_backup_log`: `tail` now runs as `timeout --kill-after="$KILL_WAIT_SECONDS" "$BACKUP_LOG_WAIT_SECONDS" tail … 2>/dev/null 7>&- | tr '\0' '?' 7>&- | cut … 7>&- | find_send …`, the same idiom as the Docker calls; `BACKUP_LOG_WAIT_SECONDS=60` stands in the marked constants block. Status 124 (or 137 after the kill) at `PIPESTATUS[0]` takes the existing branch to `unreadable`, which `evaluate` counts as no send, so a stalled log gives one message a day, not a stalled watcher holding its own lock. `find_send` runs in the shell (lastpipe) and cannot be given `7>&-`; the report says so and it is the same as `read_logs`. The new test `test_a_log_that_never_gives_its_lines_is_cut_off_and_counts_as_no_send` puts a real named pipe with no writer in place of the log (`make_backup_log_a_pipe_with_no_writer`, `mkfifo` by Git Bash), shortens the bound to 1 s in the copy, and asserts the `backup` message, `backup_log=unreadable` in the log and that the next run does not say "another run holds". It ran here and was not skipped. I did not repeat the executor's mutation (script with `timeout` removed, failing at the fixture's 45 s limit); the reasoning agrees: a FIFO read with no writer blocks for good without the `timeout`. The `7>&-` on `tr` and `cut` has no test (the report names it; `timeout` ends `tail`, so they end by themselves) — a defence in depth, not a defect.
- **M2 fixed.** `deploy/loop2-watch:38-43` and `:54-56` are re-wrapped under 100 columns, no word of meaning changed except the two added words about the time limit that M1 requires in the comments describing the read; the bullet of `tests/invariants/test_loop2_distinct_address.py` is re-flowed (no line over 100 columns left in that file). The script's other long lines (7, 68, 82, …) are the base file's own, not named by the finding.
- **M3 fixed.** The second blank line before `test_a_last_backup_line_is_read_as_state_and_the_next_run_writes_it` is gone (diff).
- **M4 fixed.** The seven facts that said `tail` or `ls` comes "from the package whose version `stat --version | head -1` prints" now say `tail, whose version no reading the skill allows prints` (`ls, …` where `ls`), the wording of the earlier facts of slice 7; the `stat` output that backed the package claim is dropped, every other quoted output is unchanged (I read the diff of all seven *Source* lines). `grep -c "package whose" foundations/environment_facts.md` prints 0. The finding said nine; the file held seven; the report says so and I confirm the count of the claim is now 0.
- **M5 remains in part, within what the finding allowed.** The *Source* of `loop2-app-log-sqlite-busy-lines` is brought to the allowed form (`grep -F -m 50 -- 'SQLITE_BUSY' <file>` for the dump and `.1`, "no output" for each, `grep --version | head -1` for the tool, run 2026-11-14); the `; echo "exit=$?"` form is gone; the raw outputs (`""`, `""`, `grep (GNU grep) 3.7`, the control `ls`) are in the fix report and match the entry. The other half of the finding, the coverage (the log of the running containers is not read, the dump begins 2026-11-11), is not widened: the finding offered a sentence in D-205's remark as the alternative, which is the return step's, and the report says so. The fact still has no dependant (the report notes it); the return step must name it in D-205 or withdraw it. Minor, remains, blocks nothing; for the request's list.
- **M6 fixed.** `.claude/skills/loop2-deploy/SKILL.md` (and the `.agents` copy, `cmp` identical) now says the watcher reads "state and health of both containers, the fresh failure lines of the game container's log and the last lines of the log of the nightly backup"; the rest of the paragraph is only re-flowed.

## What the fix itself could have broken

Trust boundary again (`deploy/loop2-watch`): the parsing of the backup log is untouched by the fix (`BACKUP_LINE`, the 2000-line and 200-byte bounds, NUL replacement, calendar check, window, nothing kept), and the classes that feed it crafted lines passed with the new script (see checks). The new `timeout` bounds a log that blocks, including a named pipe with no writer and one with a writer that never closes (killed after 60 s, `unreadable`, at most one message a day, reachable only with root on the host). The descriptor of the watcher's own lock is now closed in `timeout`/`tail`, `tr` and `cut`, as `read_container`, `read_logs` and `send_message` do. The time added to a run is at most 60 s plus the 10 s kill wait, inside the five minutes of the schedule and counted before the second look at the deployment lock, so a slow read is dropped with the others, not advanced. The `timeout` that starts `tail` is the machine's own in the tests, as for the other kinds. No Critical or Important finding in the fix diff; no new Minor finding.

## Declined to judge

- M7, M8, M9 (not given to the fix, as the coordinator says).
- The facts' dependants (D-205 and the others), which the return step writes.

## Checks I ran (one at a time, from the worktree, no `npm test`)

| Check | Command | Result |
|---|---|---|
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | exit 0, "0 errors" |
| M1 test and the neighbouring unreadable-log test (from `tests/deploy`) | `python -B -m unittest -v test_loop2_watch.TheBackupKind.test_a_log_that_never_gives_its_lines_is_cut_off_and_counts_as_no_send test_loop2_watch.TheBackupKind.test_a_missing_empty_or_unreadable_log_counts_as_no_send` | exit 0, 2 OK in 26 s, neither skipped |
| Skill test (from `tests/agent_workflow`) | `python -B -m unittest test_loop2_deploy_skill` | exit 0, 5 OK |
| Twins | `cmp` of both copies of `SKILL.md` | exit 0 |
| M4 | `grep -c "package whose" foundations/environment_facts.md` | 0 |
| M2 | `awk 'length>100'` over the distinct-address test and the script | the test has none; the script's remaining long lines are lines 7, 68, 82 and later, none of the two named (42, 55) |

Taken from the fix report, not rerun: the other classes of `test_loop2_watch.py` one by one, `test_loop2_watch_message`, `test_quality_invariants` (exit 0 each), the failing run of the new test with the `timeout` removed, `test_tracked_file_private_paths`, `test_loop2_distinct_address`. Not run on purpose: `npm test`, `scripts/test.py` (did not finish on this machine in earlier slices).

## Reaches beyond the dispatch

- `.the-way/task-cycle/review/fix.md` (the method named by SKILL.md for a fix).
- `deploy/loop2-watch` whole read paths (`read_backup_log`, `find_send`, `read_logs`, `main`) and `tests/deploy/watch_script_support.py` at the changed method, to judge the pipe and the fixture.

## Unread material

- Decisions: the counts of my review of the whole change stand (29 read whole, 42 by title only); for this fix I read no decision again, because the fix edits no decision and the findings are about a script, a skill sentence and the Sources of facts.
- Guidelines: not re-read in this review (read whole in the review of the whole change); the fix report says its author read both whole.
- `foundations/environment_facts.md` read by the diff of the fix only (the seven Sources and the one of M5), not whole; the fix's other files (the skill, the script, the three test files) read by their diffs plus the surrounding function for the script.
- The fix report's account of the mutation run and of the per-class runs: read, not repeated.

## Searches not found or unclear

- None unclear. I could not check from the diff that `7>&-` on `tr` and `cut` has an effect that a test would show; the fix report states the same and I agree it needs no test.
- The exit status of the server readings of M5 is not obtainable through the tool, so the entry now says "no output" (found consistent with the raw outputs in the report).
