PASS 0d18e4d158e31c80145f981ead4402c01dfe38e6

# Slice 3 fix review — the backup script's failed ends

Range `45eaf4b..0d18e4d`, one commit, `git rev-parse HEAD` equal to the head given. Blocking findings: 0. Minor: 3. Out of scope: the two lines of *Declined to judge*.

## The finding of `slice-3-findings.md`

### 1. A run ended by a signal other than HUP, INT or TERM sends no notice, and its log says the backup was sent — **fixed**

The author does not contest it. The defect no longer exists on the new head.

- **The false success is gone.** `on_exit` takes the success branch only with `SENT=yes` and a status of 0 (`deploy/loop2-backup:127`), and the mark is set only after `send_file` returned (`:257`). `send_file` leaves by `fail` on any non-zero `rsync` status, so no path reaches the mark without a finished send.
- **Every run of the finding's table now ends truthfully.** Same real tools as the review (`age` 1.0.0, `rsync` 3.2.7, `flock`, `timeout`, bash 5.1.16), run by me on a fresh export, with `docker`, `pusher` and `ssh` as stand-ins.

| Run | Exit | `pusher` calls | Files on the stand-in Strych | Last log line |
|---|---|---|---|---|
| Whole run, decrypted and compared equal | 0 | 0 | 1 | `end: sent loop2-accounts-6.sqlite.age` |
| `\| true` | 141 | 1 | 0 | `end: failed (exit 141)` |
| `\| head -1`, three rounds alike | 141 | 1 | 0 | `end: failed (exit 141)` |
| `\| head -2`, three rounds alike | 0 | 0 | 1 | `end: sent loop2-accounts-6.sqlite.age` |
| SIGUSR1 during the stream | 138 | 1 | 0 | `end: failed (exit 138)` |
| SIGALRM during the stream | 142 | 1 | 0 | `end: failed (exit 142)` |

- **The tests now hold it.** The new tests run against the script of `45eaf4b` fail (exit 1, 12 failures: the reader, the exit codes, the control after the size line, the line in the log, and five failed ends). The same tests pass on the new script on Windows and on Linux.
- **The bound answers are met.** A hand run keeps its lines: removing the `printf` from `log` fails the tests. The script has no ShellCheck directive and the gate's ShellCheck passes. The docstring now says what the test makes happen.

## What the fix itself might have broken

Nothing Critical or Important. I tried these, because each is a place the fix touches:

- **The handler now ignores ALRM, and `timeout` works by a timer.** A hanging `pusher` still ended at its 2 s limit (`pusher exit 124`), and one ignoring TERM ended at 4 s (`pusher exit 137`). `timeout` installs its own handler, so the ignored signal does not reach it.
- **Other ways to lose standard output.** Closed output and a full device both gave exit 0, a file sent, no notice and `end: sent`, all true. `2>&1 | head -1` gave exit 141 and one notice. A reader leaving during the send gave exit 0 with the file sent.
- **SIGPIPE already ignored when the script starts,** as can happen when a service manager starts a process. The trap cannot take effect then; the run went on and ended exit 0 with the file sent, and the log is true. I did not read what the server's cron does; either way the result is truthful.
- **The log line order.** `log` writes the file first, so the line that meets the gone reader stands in the log: `made: …` is there in the `| head -1` runs, and nothing is sent after it.
- **SIGQUIT.** The fix report left this open on Linux. In a foreground run on Linux, QUIT during the stream ended exit 0 with the file sent, so the docstring's sentence holds.
- **The seam.** The wait for the reader is bounded at 30 s, under the run's 45 s. A fixture is used for one reader run, so its waiting file cannot leak into another run. No `sleep.exe` stayed behind.

## Minor

### 2. The branch "failure wins over the mark" has no test

- **Place:** `deploy/loop2-backup:127`, the `(( code == 0 ))` half.
- **What it is.** Replacing the condition with `[[ $SENT == yes ]]` alone leaves the notice test at exit 0. The fix report's *Choices* names this rule. The branch differs only for a signal landing between `SENT=yes` and the end of `main`, a window of two lines, so the mutant is close to equivalent. **Left as it is:** nothing changes for any run I could make. **With a test:** it needs a contrived signal at that exact moment. I recommend leaving it.

### 3. A signal no trap names leaves the deployment's lock held for up to the stream's limit

- **Place:** `deploy/loop2-backup:125`, `exec 9>&-`, against the `timeout` processes that inherited descriptor 9.
- **Evidence.** With a stream limit of 6 s, VTALRM ended the script at once (exit 154, one notice, `failed (exit 1)`), and the lock stayed held for 5 s more. That confirms the fix report's *Left open*. It is bounded by the 300 s limit, under the deployment's 900 s wait, and only a signal nothing here sends takes this path.

### 4. Slice 6 must take the new exit codes

- **Place:** the header, `deploy/loop2-backup:26-28`. The skill's reading of the log must now name 138, 140, 141 and 142, and that a logged 1 can stand for a process status of a signal. The earlier list in the slice's report is out of date. This is a note for Slice 6, not a change to this one.

The review's Minor findings 2, 3 and 4 stand unchanged, as the handoff of the fix said they should. Minor finding 5 is closed by `encryption_leaves_no_file`, which the docstring's new sentence needed.

## Declined to judge

- Whether the server's real cron keeps the job's output open or passes SIGPIPE ignored: the server is out of bounds; H2.8 is the human's.
- HUP, INT, USR1, USR2, ALRM or TERM landing during the handler: a matter of timing, named in the fix report; removing ALRM from the ignore list leaves the test at exit 0; I did not try the others.

## Checks

| Check | Exit | Result |
|---|---|---|
| `npm test -- tests/deploy/test_loop2_backup.py` | 0 | 21 s |
| `npm test -- tests/invariants/test_account_save_backup_encrypted.py` | 0 | 11 s |
| `npm test -- tests/invariants/test_account_save_backup_failure_notice.py` | 0 | 30 s |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 7 s; ESLint, Ruff, ShellCheck, Prettier, the audit |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | |
| `docker run --rm … ubuntu:22.04 bash /check/check3.sh`, real tools | 0 | the table and the scenarios above |
| `python3 -B -m unittest` of the three test files on Linux, read-only mount | 0, 0, 0 | 26, 2, 8 tests |
| `python -B -m unittest test_account_save_backup_failure_notice`, new tests with the script of `45eaf4b`, scratch copy | 1 | 12 failures, as they should |
| Mutants of the fix, on a copy in the container, by the notice test | see below | |

Mutants caught, each exit 1: `log` printing nothing to standard output, no 1 for a failure with status 0, PIPE not ignored in the handler, no PIPE trap, no mark, the mark before the send, success by status alone, standard output before the log file.

Mutants that survived, each exit 0: ALRM not ignored in the handler (named above), success by the mark alone (finding 2).

The tests ran in the reviewed worktree, which stayed clean: `git status --short` empty, head unchanged. Mutations stood only in scratch copies and in a container that `--rm` removed. No `sleep.exe` and no `loop2-review` container remain.

Scripts and outputs: `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\8602360d-b02d-44a0-8dc2-b547067927f8\scratchpad\check\check3.sh`, `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\8602360d-b02d-44a0-8dc2-b547067927f8\scratchpad\out\linux3.txt`, `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\8602360d-b02d-44a0-8dc2-b547067927f8\scratchpad\out\fix-old-script.txt`.

**Could not run:** anything against Strych, `pusher` or the server, by the handoff; a real cron, which is H2.8; the full `npm test`, which is the cycle's own run. `tests/invariants/test_account_server_typecheck.py` and `test_account_server_runtime.py` were not repeated: the fix changes no Docker command, and they passed at `45eaf4b`.

## Reach beyond the dispatch

- `.the-way/task-cycle/review/fix.md`, named by the handoff.
- The review's own earlier scripts, `check.sh` and `check2.sh`, as the base of `check3.sh`.

## Searches not found or unclear

- Whether the server's cron passes SIGPIPE ignored to its jobs: unclear, not looked for on the server; both cases end truthfully.
