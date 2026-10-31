# Slice 3 fix report

**Status:** done.

**Commit:** `0d18e4d158e31c80145f981ead4402c01dfe38e6` on `task/kopia-bazy`, on top of `45eaf4b`. Not pushed.

| File | Added | Removed |
|---|---|---|
| `deploy/loop2-backup` | 18 | 5 |
| `tests/deploy/backup_script_support.py` | 45 | 9 |
| `tests/invariants/test_account_save_backup_failure_notice.py` | 93 | 11 |

## Finding 1 — fixed

A run ended by a signal other than HUP, INT or TERM sent no notice, and its log said the backup was sent. The finding is confirmed, not contested: my tests reproduced it on Windows and the fix closes it.

**In `deploy/loop2-backup`:**

- **The mark.** `SENT=yes` is set after `send_file`. `on_exit` takes the success branch only with the mark and `$?` of 0. This covers every signal, trapped or not, and it is what stops the false `end: sent`.
- **No exit 0 in a failed line.** Where `$?` is 0 and the mark is missing, `code` becomes 1, so the log never reads `failed (exit 0)`. The header says this 1 stands in the log only: bash then ends with the signal's own status (real run: logged 1, exit 154 for VTALRM).
- **Traps with their own numbers.** PIPE 141, USR1 138, USR2 140 and ALRM 142 join HUP, INT and TERM, because the spec's log holds the exit code of a failure. All seven stand in the handler's ignore list, so the handler's own lines cannot end it when they meet the reader that left.
- **The log file first.** `log` writes the file before standard output, so the line that raises SIGPIPE still stands in the log. Standard output stays, so a hand run keeps its lines, as the handoff binds. Its `printf` and the notice's `printf` send their error text to `/dev/null`.

**SIGQUIT has no trap.** Bash ignores it in a script: on the script of `45eaf4b` a stand-in's QUIT during the stream ended in exit 0 with the backup sent, which is true. No run ends by it, so there is nothing to notify.

### Evidence with the real tools

`docker run --rm ... ubuntu:22.04 bash /check/check-fix.sh`, exit 0. The script byte-identical (`cmp`), with `age` 1.0.0-1ubuntu0.1, `rsync` 3.2.7, `flock`, `timeout`, bash 5.1.16. `docker`, `pusher` and `ssh` are stand-ins, `ssh` running the `rsync` server locally; nothing reached Strych. Each SIGNAL row left no temporary directory.

| Run | Exit | `pusher` calls | Files on the stand-in Strych | Last log line |
|---|---|---|---|---|
| Whole run, control | 0 | 0 | 1 | `end: sent loop2-accounts-6.sqlite.age` |
| `\| true`, three rounds alike | 141 | 1 | 0 | `end: failed (exit 141)` |
| `\| head -1`, three rounds alike | 141 | 1 | 0 | `end: failed (exit 141)` |
| `\| head -2`, three rounds alike | 0 | 0 | 1 | `end: sent loop2-accounts-6.sqlite.age` |
| `2>&1 \| head -1`, both outputs gone | 141 | 1 | 0 | `end: failed (exit 141)` |
| SIGUSR1 during the stream | 138 | 1 | 0 | `end: failed (exit 138)` |
| SIGUSR2 during the stream | 140 | 1 | 0 | `end: failed (exit 140)` |
| SIGALRM during the stream | 142 | 1 | 0 | `end: failed (exit 142)` |
| SIGTERM during the stream | 143 | 1 | 0 | `end: failed (exit 143)` |
| SIGVTALRM during the stream, no trap | 154 | 1 | 0 | `end: failed (exit 1)` |
| SIGXCPU during the stream, no trap | 152 | 1 | 0 | `end: failed (exit 1)` |

`pusher` read `Kopia bazy loop2 nie uda\305\202a si\304\231.\n`, by `od -c`.

### Tests

New in `tests/invariants/test_account_save_backup_failure_notice.py`, each citing the invariant and each ending by itself under the seam's time limit of 45 s, a stand-in's wait for the reader being bounded too:

- `test_a_reader_that_leaves_before_the_size_ends_the_run_with_one_notice`, reader leaving at once and after one line: non-zero, one notice, no `rsync`, the log says failed, exit 141 in both the code and the log.
- `test_the_line_that_meets_a_gone_reader_stands_in_the_log`.
- `test_control_a_reader_that_leaves_after_the_size_leaves_a_sent_backup_and_no_notice`: exit 0, the file sent, no notice, the log says sent.
- `test_a_signal_with_a_trap_is_named_by_its_exit_code_in_the_log_too`, HUP, INT, USR1, USR2, ALRM, TERM.
- Failed ends added: ALRM, USR1, USR2, VTALRM during the stream, VTALRM during the send.
- Every failed end now also asserts the log holds no `end: sent` and that its last line reads failed with a non-zero exit.

The seam gained a real pipe: a reader that reads some lines, closes its end, and only then says so, while a named stand-in waits for that, bounded. The next line the script prints therefore raises a real SIGPIPE with no race.

**The docstring** now says exactly what the test makes happen, and what it does not (SIGQUIT, and the other signals no trap names, which take VTALRM's path). The handoff asks for this. To make the sentence true I added `encryption_leaves_no_file`, the missing run of the review's Minor finding 5; no other Minor finding was touched.

## Checks

Failing run, the new tests against the script of `45eaf4b`:

- `npm test -- tests/invariants/test_account_save_backup_failure_notice.py`: exit 1, 9 failures: the reader at once and after one line, the control after the size line, the line in the log, ALRM, USR1, USR2, VTALRM, and QUIT (the case I then removed, see above).

Final runs:

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/invariants/test_account_save_backup_encrypted.py` | 0 | 2 tests |
| `npm test -- tests/invariants/test_account_save_backup_failure_notice.py` | 0 | 8 tests |
| `npm test -- tests/deploy/test_loop2_backup.py` | 0 | 26 tests |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests: ESLint, Ruff, ShellCheck, Prettier, the audit |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors, before and after the commit |
| `.runs/quality-venv/Scripts/shellcheck.exe --norc --shell=bash --extended-analysis=true deploy/loop2-deploy deploy/loop2-backup` | 0 | no report, no directive in the script |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache tests/deploy/backup_script_support.py tests/invariants/test_account_save_backup_failure_notice.py` | 0 | all checks passed |
| `python3 -B -m unittest` of the three test files, on Linux in `ubuntu:22.04` | 0 | 26, 2 and 8 tests |

Mutants of the fix, each `npm test -- tests/invariants/test_account_save_backup_failure_notice.py` exit 1, restored after each (`restored: True`, by bytes):

- Success by `$?` alone, no mark · the mark set before the send · no fallback for `$?` of 0 · no PIPE trap · no USR1 trap · no USR2 trap · no ALRM trap · PIPE not ignored in the handler · the `printf` before the log file.

9 of 9 caught. **On the first run, of eight mutants, four survived with exit 0:** the mark set before the send, no PIPE trap, no USR1 trap, no ALRM trap. The mark and the fallback alone gave a truthful end, so these changed only the log's number or a window inside the send. That is why VTALRM during the send and the exit-code test were added, and the rerun above, with USR2 as a ninth mutant, shows them caught.

**Not run:** full `npm test` (the orchestrator's); `tests/invariants/test_account_server_typecheck.py` and `test_account_server_runtime.py`, since the handoff does not name them and no Docker command of the script changed; anything against Strych, `pusher` or the server, by the handoff; a real cron, which is H2.8.

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| `trap 'exit 141' PIPE`, so a reader that leaves ends the run with a notice | `trap '' PIPE` for the whole run, so a run with no reader finishes its backup: children inherit an ignored SIGPIPE, so the `docker` stage of the pipe would no longer die the way the gate has been shown on | A hand run into `\| head -1` loses that run's backup, with a message; the next night repairs it |
| Traps for USR1, USR2 and ALRM beside the mark | The mark alone: the log would read `exit 1` for a run that exits 138 | Three lines |
| Failure wins over the mark: a non-zero `$?` with the mark set takes the failure branch | The mark alone deciding: an exit after the send would stay unnoticed | At worst a false message for a file really sent, in the moment between the send's end and the exit |
| The rest of the signals rely on the mark, with 1 in the log | Trapping all of them: a long list for signals nothing here sends | A log number that is not the process's; the header says so |
| The exit-code test holds six literals | Asserting only non-zero | They are Linux's numbers written out in the script; a test comment says so |

## Left open

- **A signal with no trap does not wait for the pipe.** Bash ends at once, so the running `timeout docker ...` and `timeout age ...` outlive the script for up to 300 s. They inherited descriptor 9, so the deployment's lock stays held for that time, and they write into a directory the handler removed. Bounded by the stream's limit, and only for a signal nothing here sends. Not tested.
- **A signal landing during the handler:** a test holds PIPE in the ignore list, since the reader's runs meet it there. HUP, INT, USR1, USR2, ALRM and TERM arriving during the handler are a matter of timing, with no test.
- **`--kill-after`** has no test (the review's Minor 3), and the comment on the notice's source (Minor 4) stands; neither is this fix's. The review's concern about the empty stream (Minor 2) stands too.

## Reach beyond the handoff

- `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\8602360d-b02d-44a0-8dc2-b547067927f8\scratchpad\check\check2.sh`, the reviewer's run, read for the shape of the table.
- `kill -l` of Git's bash, to find a signal with no trap that both systems name.

## Searches not found or unclear

- That bash ignores SIGQUIT in a script: observed here (exit 0 with the backup sent, on Git's bash), and it agrees with what I recall of bash's source, which I did not read. On Linux the review could not tell, since its run was in the background, and a run in the foreground on Linux was not made. If a QUIT did end a run there, the mark would still give one notice and a failed last line, as VTALRM shows.
- Whether cron's job process on the server can go away while the script runs: unclear, as the review says; the fix does not depend on it.
- `.the-way/task-cycle/change/fix.md` asks only for each finding fixed or contested; I kept the fuller form of the report the handoff's checks need.
