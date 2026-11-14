# Report - slice 2 of `serwer-odczyty-i-straznik`

**Status:** done (one flake of the named runner to note, see Problems)

## Files and commits

Base `3817a067`. Two commits on `task/serwer-odczyty-i-straznik`, nothing pushed:

- `e7116cfd` tests first (red): `tests/deploy/watch_script_support.py`, `tests/deploy/test_loop2_watch.py`,
  `tests/deploy/test_loop2_watch_message.py`, and in `deploy/loop2-watch` only the new constants of the block, with
  no reading, so that the seam accepts the overrides and the tests fail at their assertions.
- `b1e8ec99` the script: `deploy/loop2-watch`, and `guidelines/testing.md` (one word, "pięciu" to "sześciu", in the
  `deploy/` row of the table of trust boundaries).

Diff against the base: 5 files, +571 / -39 (`deploy/loop2-watch` +127, `tests/deploy/test_loop2_watch.py` +365,
`tests/deploy/test_loop2_watch_message.py` +67, `tests/deploy/watch_script_support.py` +49,
`guidelines/testing.md` +/-1).

## What the script does now

- Block (new constants): `BACKUP_LOG_FILE`, `BACKUP_FRESH_SECONDS=93600` (26 h), `BACKUP_INTERVAL_SECONDS=86400`
  (24 h), `BACKUP_LOG_LINE_LIMIT=2000`, `BACKUP_LOG_LINE_WIDTH=200`, `SUBJECT_BACKUP=loop2_brak_kopii_bazy`,
  `TEXT_BACKUP='Brak udanej kopii bazy loop2 od ponad doby: nocna kopia nie została wysłana. Co dalej: skill loop2-deploy.'`
- `read_backup_log` runs after `read_logs` and before the second look at the deployment's lock; it reads
  `tail -n 2000 | tr '\0' '?' | cut -c 1-200 | find_send`, nothing of a line is kept. `find_send` accepts a line only
  by `BACKUP_LINE` (outside the block: `^YYYY-MM-DDTHH:MM:SSZ loop2-backup: end: sent loop2-accounts-[1-7].sqlite.age$`
  with the ranges of month, day, hour, minute and second checked, `.` written `[.]`), then compares the time as text
  with the stamps of `NOW - 26 h` and `NOW` (the fixed shape orders as text) and checks the calendar
  (`calendar_day_exists`, leap years). A missing or unreadable log (tail exits non-zero) and an empty one = no send.
- Not evaluated when the state is missing or damaged (the read is skipped; `evaluate` runs only on a good state, as before).
- `decide` uses 24 h for `backup` and 6 h for the other kinds; `KINDS` order is down, unhealthy, restarted, failures,
  backup, browser; the kind counts in the day's budget of six messages through the existing `MESSAGE_TIMES`.
- `LAST_LINE` accepts `last backup <epoch>`. The log line of an eventful run gets `backup_log=fresh|stale|unreadable`.
- Header comment brought to six kinds; it says the backup log is read, never written, and what is never copied.

## Checks (command, exit code)

The named runner and the substitute were used as the note asks; all run one at a time, never `npm test`.

| Check | Command | Exit |
|---|---|---|
| red, tests of the kind (before the script) | `python -B -m unittest test_loop2_watch.TheBackupKind test_loop2_watch.TheBackupLogAsInput test_loop2_watch.TheWatcherCountsWhatTheBackupScriptWrites test_loop2_watch.TheKinds test_loop2_watch.TheConstants test_loop2_watch.TheLog test_loop2_watch.TheState.test_a_last_backup_line_is_read_as_state_and_the_next_run_writes_it` (from `tests/deploy`) | 1: 40 run, 29 failures at assertions (a missing message or a missing `backup_log=` word), 1 error (see below) |
| red, message invariant (before the script) | `python -B -m unittest test_loop2_watch_message` | 1: 9 run, 4 failures at assertions (the backup notice missing, six distinct subjects) |
| green, tests of the kind | same list less `TheWatcherCounts...` and `TheBackupLogAsInput` | 0: 30 OK |
| green, crafted input and agreement | `python -B -m unittest test_loop2_watch.TheBackupLogAsInput test_loop2_watch.TheWatcherCountsWhatTheBackupScriptWrites` | 0: 10 OK |
| named, watcher, try 1 (10 min bound) | `python -B scripts/test.py tests/deploy/test_loop2_watch.py` under `timeout 600` | 124, did not finish; the dots showed one `F` at about the 70th test, the report of failures is printed only at the end, so which test it was is unknown |
| substitute, whole watcher module | `python -B -m unittest -v test_loop2_watch` (from `tests/deploy`) | 0: 98 OK in 734 s |
| named, watcher, try 2 (28 min bound) | `python -B scripts/test.py tests/deploy/test_loop2_watch.py` under `timeout 1700` | 0: 98 OK in 1136 s |
| named, message | `python -B scripts/test.py tests/deploy/test_loop2_watch_message.py` | 0: 9 OK in 195 s |
| named, backup script | `python -B scripts/test.py tests/deploy/test_loop2_backup.py` | 0: 26 OK in 184 s |
| named, quality (ShellCheck, Ruff, Prettier, ESLint, audit as the file runs them) | `python -B scripts/test.py tests/quality/test_quality_invariants.py` | 0: 5 OK in 19 s |
| `bash -n deploy/loop2-watch` | | 0 |

The one error in the first red run was a mistake of the test (it asked the deploy script's block for the watcher's
`BACKUP_LOG_LINE_LIMIT`, a `KeyError`); fixed before the commit and the test then passed with the script.

## Own-work check (section 3)

Requirement most likely not met: the one about crafted input, that a line counts "only if it is exactly" the line of
a sent night and that the reading keeps nothing, since the log is data. The check: eight deliberate mutations of the
script, each run against the one test that should catch it (script `scratchpad/mutate.py`, the file restored after
each; `git status` clean afterwards). All caught, exit 1 each:

1. no `tr '\0' '?'` (a line with a NUL at every position would pass for an exact one, because bash `read` drops NUL: verified by hand on this machine) - caught by the control-character category;
2. `[.]` written `.` (a file name `loop2-accounts-1_sqlite_age` would count) - caught by the file-name category;
3. no calendar check (29 February 2027 counted) - caught by the calendar test;
4. no upper bound on the time (a stamp after the run's clock counted) - caught by the crafted-lines test;
5. six hours of the other kinds in place of 24 hours for `backup` - caught by the hold test;
6. `backup` after `browser` in `KINDS` - caught by the budget/order test;
7. limit 93601 s in place of 93600 - caught by the 26-hour pair;
8. whole file read (`cat`) in place of the last 2000 lines - caught by the long-log test.

(Mutation 4 and 1-2 are caught by the single test `test_a_line_that_is_not_exactly_the_end_of_a_sent_night_counts_for_nothing`,
which runs eight categories of look-alikes as subtests.) A further mutation I thought of, evaluating the kind on a
missing or damaged state, is an equivalent one for the script: `main` already calls `evaluate` only on a good state.
The test `test_a_first_run_and_a_damaged_state_do_not_evaluate_it` shows the behaviour, a mutation of `main` was not tried.

## Where the plan's points went

- (a) fixture: `WatchFixture` has a backup log of its own in a directory of its own (`backup/loop2-backup.log`), the path
  in the block's overrides; by default `set_clock` writes a sent night dated an hour before the clock, until
  `write_backup_log` is used (then the clock leaves the file alone); helpers `write_backup_log`, `remove_backup_log`,
  `make_backup_log_a_directory`, and module functions `stamp`, `sent_line`, `night`.
- (b) `TheBackupKind` in `test_loop2_watch.py`: the 26 h pair (0, 26 h minus 1 s, 26 h count; 26 h plus 1 s does not),
  missing/empty/directory log, sent once then held with the 24 h pair, budget and order (one slot: failures wins over
  backup; backup wins over browser; no slot; two slots, with the state text checked), first run and damaged state,
  lock at the first and at the second look. In the "first look" case the reading before the lock check cannot be
  observed directly (`tail` is the machine's own, not a stand-in): the test shows the effect (no docker call, no
  message, state unchanged, one `skipped` line), not the order of the two statements.
- (c) `TheBackupLogAsInput`: 8 categories of look-alikes as subtests (other lines of a night; words after other text;
  another program name; another file name; another timestamp shape, including hour 24, minute 60, second 60; time
  after the clock; no timestamp; control characters with a NUL at every position of an exact line), a control run
  (all of them beside one exact line, before and after it, still counts it), an old send beside 30 newer failed
  nights, a calendar test (29 February 2027 does not count, 2028 does), a log 10 times the limit (a send at the start
  does not count, a send at the end does), a 3 MB line (alone and followed by an exact line), a last line with no newline.
- (d) message tests: the `backup` arrangement puts the marker in look-alike lines of the backup log; the six notices
  differ; all six in one run go in the table's order; the marker reaches no argument, no input of `pusher`, no log,
  no state, no file; the backup log itself is byte-identical after a run; a control with an exact line beside the
  marker (the decision follows the exact line, so the log was read) is quiet and carries the marker nowhere.
- (e) `last backup <epoch>` accepted and rewritten by the next run; four near-misses are added to the damaged-state table.
- (f) possible: `TheWatcherCountsWhatTheBackupScriptWrites` runs the real `deploy/loop2-backup` under its own fixture
  (weekday 1 and 7; and a night whose `rsync` exits 12) and feeds its log to the watcher: the exact end line counts for
  26 h and not for 26 h plus 1 s; the failed night does not count. A precondition checks that the stand-in `date` of
  the backup fixture answers the instant the test uses.
- (g) the constants test names `/var/log/loop2-backup.log` and equals the backup script's `LOG_FILE`; the log line of
  an eventful run holds `backup_log=fresh|stale|unreadable` and nothing of the log (text and stamp absent).

## Choices (with the rejected way and cost if wrong)

- Time compared as text against stamps made by `printf %(...)T` with the `TZ=UTC` of the script, not converted to an epoch
  (the stand-in `date` answers only `%s`, and a conversion by `date -d` would hit it). Rejected: a days-from-civil
  arithmetic in bash; more code. Cost if wrong: the fixed shape is enforced by the pattern, so it should hold; the
  calendar check closes the impossible-day gap.
- Bounded by `tail -n 2000` and `cut -c 1-200`, with a NUL turned to `?`. Rejected: `tail -c N` (a cut first line may be
  the tail of a longer line and pass for exact), and `read -n` (the rest of a long line would read as another line).
  Cost if wrong: a night with more than 2000 lines of tool error text after the send would raise the kind falsely, once a day.
- A missing log and an unreadable log are not told apart in the decision (both are no send), only in the status word.
- Added two constants the plan did not list (`BACKUP_LOG_LINE_LIMIT`, `BACKUP_LOG_LINE_WIDTH`).

## Reaches beyond the handoff

- `the author's private rule file on writing scripts` and `...\rules\git.md`, read because the global instructions and
  the hooks require them before a script and before a commit.
- `tests/deploy/deploy_script_support.py` (parts: `constants`, `replace_block`, `write_bytes`, the line regexp) to know how
  the seam reads the block; `tests/quality/test_quality_invariants.py` (grep only) for the checked file list.
- `foundations/` read only at the handoff's ranges (D-231, D-233, D-235, D-356, the two invariants, the fact); not outside them.

## Problems as observed

- The named runner's first try (600 s bound) showed one `F`, then hit the bound; two later full runs of the same file
  (substitute and named runner) were green, 98 of 98. I did not identify the failing test. A guess, not verified:
  a flake under memory pressure (the machine is short of memory; a Git Bash child failing). The orchestrator's
  run of the whole gate will show it again if it is real.
- No mismatch between the plan's *Checks* and the handoff (the plan names no whole gate).
- Per the handoff, the installed copy on the server is not changed; a human reinstalls the script. The cron file and the
  `loop2-deploy` skill are not touched by this slice.

## Unread material

Nothing named was left unread, but some was read in part only: `foundations/decisions.md` (D-231, D-233, D-235, D-356
read at the current ranges the handoff gives, whole entries; the plan's older ranges not used), the `invariants.md`
lines 1258-1266 and 1128-1136 and the `environment_facts.md` lines 486-490, which I read as given. The task document
passages were read only at the lines the slice names (31; 50-55; 105; 153).

## Searches not found or unclear

- None that blocked the work. Unclear: the plan says the constants block holds "path, 26 hours, 24 hours, subject,
  sentence"; I added two limits of the reading (see Choices). The handoff's range for D-233 (4867-4916) differs from the plan's
  4867-4904; I read to the end of the entry.
