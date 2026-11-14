PASS b1e8ec993ffc91357c502201f1ee00ec47b698df

# Review of slice 2 of `serwer-odczyty-i-straznik` (range 3817a067..b1e8ec99)

`git rev-parse HEAD` = b1e8ec99 (matches the head given). Commits: `e7116cfd` (tests), `b1e8ec99` (script and the count in `guidelines/testing.md`). Method: `.the-way/task-cycle/review/SKILL.md`; this is a slice review, `whole_change.md` not read.

Counts: blocking 0, Minor 3, out of scope 0.

## Findings

### Critical
none

### Important
none

### Minor

1. **The reading of the backup log has no time bound.** `deploy/loop2-watch:469-470` (`read_backup_log`). Docker calls in the same script run under `timeout --kill-after`; `tail ... | tr | cut | find_send` does not. If `/var/log/loop2-backup.log` were a FIFO with no writer, or on a stalled device, `tail` would block holding the watcher's own lock, and every later run would end at once as "another run holds the lock" with one log line per run: silence that looks like "all works". Reaching it needs root on the host to replace the log, so it is not a hole from crafted log content; a log with 1 GB and no newline would only be slow (tail scans back to find 2000 newlines). Evidence: the script text; no test pushes a non-regular file other than a directory. Cost of leaving it: one more way for the watcher to stall that docker's calls already guard against; cost of fixing: wrap `tail` in `timeout "$DOCKER_WAIT_SECONDS"` and treat exit 124 as unreadable, a constant and one test.

2. **Two comment lines of the script exceed the width of the rest of the file.** `deploy/loop2-watch:42` (about 118 columns, "one word (fresh, stale or unreadable). This script never calls pusher about itself: a failing watcher that") and `deploy/loop2-watch:55` (about 130 columns, the sentence that joins the end of the old block comment to the new "and the pattern of the backup log's line stand outside it"). The surrounding comment is wrapped at about 100 columns; the edit appended to the old line instead of re-wrapping. No tool of the gate flags it (quality test passes); it is polish only.

3. **A stray extra blank line before the added test in `TheState`.** `tests/deploy/test_loop2_watch.py`, before `test_a_last_backup_line_is_read_as_state_and_the_next_run_writes_it` (two blank lines inside a class, after the previous method). Polish only; Ruff's blocking set passes.

## What I checked against the dispatch and found sound

- **Crafted input at the trust boundary.** The reading is `tail -n 2000 -- FILE | tr '\0' '?' | cut -c 1-200 | find_send`; `find_send` keeps nothing of a line, accepts only `BACKUP_LINE` (anchored `^...$`, ranges of month/day/hour/minute/second, program name `loop2-backup:`, `end: sent loop2-accounts-[1-7][.]sqlite[.]age`), then compares the stamp as text with the stamps of NOW-26h and NOW and checks the calendar. I ran a scratch harness (functions cut from the file at `deploy/loop2-watch:109-110,135,422-474`, in the scratchpad, not in the worktree) with a real file: exact line, fresh; a high byte inside the program name, stale; CRLF line, stale; NUL after the line, stale; exact line twice or without trailing newline, fresh; exactly 26 h, fresh; equal to NOW, fresh; NOW+1 s, stale; missing file, `unreadable` (which `evaluate` treats as no send, as the task says). A line over 200 bytes is cut and can never match, since the exact line is about 72 bytes. `tr` closes the hole that bash `read` silently drops NUL.
- **The new message.** `SUBJECT_BACKUP=loop2_brak_kopii_bazy` (ASCII, URL-path characters, differs from the other five and from `kopia_bazy_loop2_nieudana`); `TEXT_BACKUP` is one sentence plus the fixed "Co dalej: skill loop2-deploy.", no number beyond the product name `loop2`, no player's data, nothing read from the log. `send_message` takes subject and text only from constants. The report line holds one word, `backup_log=fresh|stale|unreadable`, nothing read.
- **Throttle, budget, order.** `decide` uses 86400 s for `backup` and 21600 s for the rest; the kind goes through `MESSAGE_TIMES` so it counts in the six a day; `KINDS` order is down, unhealthy, restarted, failures, backup, browser; `LAST_LINE` accepts `last backup <epoch>` and `state_text` writes it. Matches D-233 (at most once a day) and D-356.
- **Order of stages and locks.** `read_backup_log` runs after `read_logs` and after the first lock look, before the second look; at the second look the reading is dropped with the others. `evaluate` runs only on a good state, so a first run or a damaged state does not evaluate the kind. The deployment lock is still only looked at (settlement row 2, `flock` behaviour, unchanged: the diff does not touch `take_own_lock`, `deploy_lock_is_held` or their handling).
- **Agreement with the backup script.** `deploy/loop2-backup:87` writes `$(date -u '+%Y-%m-%dT%H:%M:%SZ') loop2-backup: $*`, `:128` writes `end: sent $WEEKDAY_FILE`, `:215-222` makes `loop2-accounts-[1-7].sqlite.age`. The watcher's pattern matches exactly that. The test `TheWatcherCountsWhatTheBackupScriptWrites` runs the real backup script under its stand-ins and feeds its log to the watcher (the preferred variant of point (f) was possible, as the executor says).
- **Tests.** Every message test in `test_loop2_watch_message.py` still carries `# invariant: failure-watcher-message`, including the new one; the message tests check the backup log is byte-identical after a run and that the marker reaches no argument, no input of `pusher`, no log, no state, no file. The test of the first look at the lock shows the effect (no docker call, no message, state unchanged, one `skipped` line), not that the log is unread, which cannot be seen with the machine's own `tail`; the script order (`main`, lines 641-650) is what holds it. The look-alike table covers every category the plan lists; the control run shows the reading is not broken by refused lines. Tests state the break each one catches. I did not repeat the executor's eight mutations; I ran the harness above independently of them.
- **Foundation and guidelines.** D-233 and D-356 (as written in `9630fb90`) say what the code does; `guidelines/testing.md` row `deploy/` changes only "pięciu" to "sześciu" (diff of the file is one line). No other "five kinds" of the watcher remains in `deploy/`, `tests/deploy/` or the invariants file (searched). Guidelines `coding.md` reached: ShellCheck rules and no `# shellcheck disable`; I did not rerun ShellCheck (relied on the executor's run of the quality test, exit 0). No reserved choice taken (Bash, `tail`, `tr`, `cut` are tools the script already uses or the system's).
- **No operation that cannot be undone.** The watcher writes nothing new; the backup log is only read.
- **Slice contained.** The five files changed are exactly the five the plan names. The cron file and the skill `loop2-deploy` are untouched (slice 3's business).

## Declined to judge

- The wording of the sentence of `TEXT_BACKUP` ("od ponad doby" while the limit is 26 hours): the plan leaves the words to the executor and it says nothing false.
- That the first alarm for a log that never existed repeats daily until a backup runs: the task says a missing log counts as no send.
- The installed copy on the server: a human's reinstall, outside the change.
- The `skill loop2-deploy` table of kinds and "Accepted gaps": the task gives them to another slice.
- The flake of the executor's first named run of the watcher module (one `F`, bound hit): not identified by the executor; I did not rerun the whole module (the handoff forbids a heavy run). It stays for the cycle's own gate.

## Checks I ran

- `python -B -m unittest test_loop2_watch.TheBackupLogAsInput test_loop2_watch.TheWatcherCountsWhatTheBackupScriptWrites test_loop2_watch.TheConstants` from `tests/deploy`, in the worktree at the head: exit 0, 12 tests OK in 101 s.
- Scratch harness in the scratchpad (`harness.sh`, `run2.sh`) over functions cut from the head's `deploy/loop2-watch`: results listed above; no file of the worktree changed (`git status --short` was clean before and after).
- Not run: `python -B scripts/test.py tests/deploy/test_loop2_watch.py` (executor: 98 OK in 1136 s; the handoff and the machine's memory forbid repeating it), `test_loop2_watch_message.py`, `test_loop2_backup.py`, `tests/quality/test_quality_invariants.py` (ShellCheck, Ruff, Prettier), and "the new tests shown failing before the script changes" (taken from the executor's reported red run of commit `e7116cfd`, 29 failures at assertions; I did not check out that commit). These stay verified by the executor's report only.

## Reaches beyond the dispatch

- `deploy/loop2-backup` lines 37-60, 115-130, 213-232 (read in full as the dispatch's Read list names it; here re-read at those lines to compare the written line with the watcher's pattern).
- `the author's private rule file on writing scripts`: required by the global instructions before writing the scratch harness.
- A search of `deploy/`, `tests/deploy/`, `foundations/invariants.md` and the skill `loop2-deploy` for a leftover "five kinds" of the watcher: none found.

## Unread material

- `foundations/decisions.md` D-231, D-233, D-234, D-235, D-356 read whole at the ranges given (4770-4979 and 9027-9041); the invariants `failure-watcher-message` and `account-save-backup-failure-notice` and the fact `mikrus-pusher-mail` read as the ranges give them (1255-1270, 1125-1140, 483-492), not the whole files. No further foundation entry selected by "Reading the foundation"; I did not open `.the-way/elements/common/way_of_working.md` or the part map of `deployment`.
- `guidelines/coding.md` whole; `guidelines/testing.md` whole (read in two parts, lines 1-372 and 373-472).
- Task passages: lines 25-60, 100-108 and 150-156 of `docs/task-cycles/serwer-odczyty-i-straznik/task.md` (a superset of the lines the slice names: 31, 50-55, 105, 153). The executor's report read whole.
- `tests/deploy/backup_script_support.py` not read whole (only through the diff of `watch_script_support.py` and the test that uses it); the complete `test_loop2_watch.py`, `test_loop2_watch_message.py` and `watch_script_support.py` were read as diffs plus the touched context, not the whole files.
- `.the-way/task-cycle/review/SKILL.md` read whole; `fix.md` and `whole_change.md` not read (not applicable).

## Searches not found or unclear

- No existing test observes that the log is *not* read at the first lock look (only the effect); I saw no way to do it without a stand-in for `tail`, so I recorded it above, not as a finding.
- The handoff gives D-233 as 4867-4916 and D-356 as 9027-9041 while the slice's Read list has the older ranges (4867-4904, 9006-9019); I used the handoff's.
- Otherwise none.
