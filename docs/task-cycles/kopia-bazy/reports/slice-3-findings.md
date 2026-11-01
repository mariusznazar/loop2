# Blocking finding — review of slice 3, in the reviewer's words

From `reports/slice-3-review-report.md`, head `45eaf4b57ae6ff6924d82514f4f0377e97828cac`.

### 1. A run ended by a signal other than HUP, INT or TERM sends no notice, and its log says the backup was sent

- **Slice:** 3, the only one reviewed.
- **Place:** `deploy/loop2-backup:114-127` (`on_exit`, its branch at `:120`), `:251-254` (the traps), `:84` (the `printf` to standard output that raises SIGPIPE). Tests: `tests/deploy/backup_script_support.py:295`, `tests/invariants/test_account_save_backup_failure_notice.py:10-13` and `:144-150`.
- **What is wrong.** `on_exit` chooses between success and failure by `$?`. With an EXIT trap set, bash also runs that trap for a terminating signal the script has not trapped, such as SIGPIPE, SIGALRM or SIGUSR1, and `$?` is then the status of the last command that finished, usually 0. The handler takes the success branch: it writes `end: sent <file>`, calls no `pusher`, and bash then ends by the signal, with exit 141, 142 or 138. The file was never sent.
- **What it breaks.** The slice's *Goal*: "One handler at the exit makes any non-zero end, from any cause, call `pusher` once". Spec decision 8 says the same, and D-219 says "At any failed end". The invariant test's docstring claims each way the script can end non-zero, "a signal to the script" among them, is made to happen.
- **Why it matters.** The signal that can really arrive is SIGPIPE, because `log` writes every line to standard output first (`:84`, the point the handoff raised). If whatever reads that output goes away, the next log line kills the run. A hand run into `| head`, or an `ssh` without a terminal whose connection drops, does this. The night's backup is lost in silence, and the log, the one record, says it was sent. Step H2.5 reads the log for success, and the skill of Slice 6 will tell a reader to trust it. The older backup stays on Strych, so this is a missed night and a false record, not data loss.
- **How far it reaches at night.** Under cron the job's output is read by cron's own process for that job, so the script's pipe stays open unless that process dies. I did not read the server and did not run a real cron, so I claim no frequency. The finding stands on the requirement's "from any cause" and on the false log line, not on a measured rate.
- **Evidence.** Real `age` 1.0.0, `rsync` 3.2.7, `flock`, `timeout` and bash 5.1.16 in a throwaway `ubuntu:22.04`, the script unchanged but for its constants. `docker`, `pusher` and `ssh` are stand-ins, `ssh` running the `rsync` server locally.

| Run | Exit | `pusher` calls | Files on the stand-in Strych | Last log line |
|---|---|---|---|---|
| `\| true`, standard output closed at once | 141 | 0 | 0 | `end: sent ` with no file name |
| `\| head -1`, three rounds alike | 141 | 0 | 0 | `end: sent loop2-accounts-6.sqlite.age` |
| `\| head -2`, the reader leaves after the size line | 141 | 0 | 1 | `made: …`, no end line |
| SIGUSR1 during the stream | 138 | 0 | 0 | `end: sent ` |
| SIGALRM during the stream | 142 | 0 | 0 | `end: sent ` |

- **Why the tests pass.** The seam writes standard output to a file (`backup_script_support.py:295`), so no test has a reader that leaves. `FAILED_ENDS` signals only TERM, HUP and INT. The author's own-work check tried TERM alone, and its report's *Left unprotected* names SIGKILL as the only signal outside the handler.
- **A fix shown to work, for the fixer to weigh.** On a copy of the script: `trap 'exit 141' PIPE` beside the other traps, PIPE in the handler's ignore list at `:117`, and a mark set after `send_file` that the branch at `:120` requires (the copy also trapped QUIT, which showed nothing). Every run in the table except `| head -2` then gave exactly one notice and `end: failed`, and `| head -2` ended exit 0 with its file sent. The mark alone covers SIGUSR1 and SIGALRM, but those runs log `failed (exit 0)`, since `$?` is still 0. Taking standard output out of `log` would remove the SIGPIPE and not the others, and a hand run would lose its lines. A test needs a pipe whose reader leaves and one signal from outside the three, each seen failing once, and the docstring's reading must then say what it covers.
