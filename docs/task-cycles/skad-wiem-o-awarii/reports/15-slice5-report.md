# Report 15 — slice 5, the failure watcher and its schedule

**Status:** done

Branch `task/skad-wiem-o-awarii`, base `7bf49e507a8a71b4e792462255d3359a7d989ec4`, pin `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`. Not pushed.

## Commit

- `048264e` feat: :sparkles: add the failure watcher and its cron file, telling the owner through pusher of a game that is down, unhealthy, restarted or writing failures, with tests on stand-ins for its tools

## Files changed (lines added / removed)

| File | + | - |
|---|---|---|
| `deploy/loop2-watch` | 565 | 0 |
| `deploy/loop2-watch.cron` | 7 | 0 |
| `tests/deploy/watch_script_support.py` | 322 | 0 |
| `tests/deploy/test_loop2_watch.py` | 875 | 0 |
| `tests/deploy/test_loop2_watch_message.py` | 234 | 0 |
| `tests/invariants/test_account_server_typecheck.py` | 8 | 3 |
| `tests/quality/test_quality_invariants.py` | 1 | 1 |

`tests/deploy/backup_script_support.py` is imported and subclassed, not changed. All files are LF (`git ls-files --eol`: `i/lf w/lf`).

## Checks (command and exit code)

Run from `the root of the repository`. Output of each is kept in `.runs/task-cycles/skad-wiem-o-awarii/scratch/` (ignored by git).

Tests first, seen failing against an empty script (the constants block, then `exit 0`), so each test reached its assertion:

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/deploy/test_loop2_watch.py` (empty script) | 1 | 76 tests, failures=115 (subtests), errors=0 |
| `npm test -- tests/deploy/test_loop2_watch_message.py` (empty script) | 1 | 7 tests, failures=18, errors=0 |
| `python -B -m unittest test_account_server_typecheck -k no_other_deployment_route` in `tests/invariants`, before the `NOT_ROUTES` edit | 1 | fails: `['deploy/loop2-watch', 'deploy/loop2-watch.cron']` are deployment files the check does not read |

The very first run of the watch tests against the empty script showed 2 errors (an `AttributeError` on a missing state and an `IndexError` on no `flock` call); I changed those tests to assert first, so they fail as assertions. The run above is after that change.

The invariant `failure-watcher-message` seen failing a second time, with the behaviour broken in the worktree: `count_lines` kept the last line it read and `send_message` appended it to the text sent to `pusher`. `npm test -- tests/deploy/test_loop2_watch_message.py` exit 1, failures=7, each for the marker in the text. (A first mutation of this kind named its variable `LAST_LINE`, which the script already holds as a read-only regular expression, so it failed for another reason; I discarded it and redid it with `SEEN_LINE`.) The script was restored byte for byte (`cmp` against a saved copy).

Passing, with the finished code:

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/deploy/test_loop2_watch.py` | 0 | 76 tests OK |
| `npm test -- tests/deploy/test_loop2_watch_message.py` | 0 | 7 tests OK |
| `npm test -- tests/deploy/test_loop2_backup.py` (seam shared, unchanged) | 0 | 26 tests OK |
| `npm test -- tests/quality/test_quality_invariants.py` (shellcheck of the new script, ruff over the new Python, prettier, eslint, audit) | 0 | 5 tests OK |
| `npm test -- tests/invariants/test_account_server_typecheck.py` | 0 | 9 tests OK |

Not run: the whole gate (`npm test`), `foundation_check.py` (the orchestrator runs both). Nothing was left unchecked by the slice's *Checks* list.

Not proved by any test here, and not proved by me: that `pusher` delivers; that cron runs the file; what Docker's `inspect` fields and the `--since` / `--until` windowing of `docker logs` return; that the real `flock(1)` takes a shared lock on a file opened read-only and refuses it while a deployment holds the exclusive lock; and the script on the server's bash (Ubuntu 22.04, bash 5.1) — the tests ran under Git's bash 5.3 on Windows. No Linux machine with real `flock` was reachable (the only WSL distribution is Docker Desktop's own, stopped; I did not start it).

## Own-work check (section 3)

The requirement my work most likely does not meet: the watcher "looks at the deploy lock without creating it or taking it for writing" (spec C2, D-353 *violates*), because the stand-in `flock` cannot show what the real file did.

Checks written and run:
- the lock file is read-only (`chmod 0444`) and holds a sentence; the run still reads, sends, and leaves the bytes and the modification time unchanged — an open for writing would have failed the run (`test_the_lock_file_is_never_opened_for_writing_or_changed`);
- the lock file missing before the run is still missing after it (`test_a_missing_lock_file_means_no_deployment_and_is_not_created`);
- every `flock` call the script makes is `--exclusive --nonblock 7` (own lock), `--shared --nonblock 8` and `--unlock 8`; none names the path, none waits;
- a static test that no line of the script has a writing redirection or `touch` / `flock` on the lock constant.

Mutations I made to the finished script, one at a time, each seen to fail the named test and restored afterwards (`cmp` clean): unanchored `case` patterns; the browser prefix without its closing quote; no second look at the lock; no 24-hour clamp of the window; per-kind throttle off; day budget off; damaged state lines skipped instead of refused; a replaced container read as a restart; the lock file created (`: >>`); the end of the window taken by a second `date`; no `timeout` around `pusher` (run test and static test); no exit line for a signal with no trap; `pusher` called in the exit handler. Two mutations of mine survived and I judged them not gaps: "a failed `pusher` clears the sent mark" (the state is written before the call, so the mutation changed nothing) and the first form of "end of the window taken late" (also had no effect; replaced by the second-`date` form, caught after I made the stand-in `date` advance one second per ask in a run).

## Reaches beyond the dispatch (section 1)

- `.runs/task-cycles/skad-wiem-o-awarii/spec.md` whole (the handoff named passages by line; I read it whole to have the settlements at the end of the file) and `tests/invariants/test_loop2_host_sharing.py` lines 1-15 and the shell reader in `tests/invariants/loop2_invariant_support.py` (lines 760-1040): to see how the repository's own `docker_commands` reads a script, because my test of "every Docker command" uses it. Why: the reader rejected my first form of the prefix constants (see problem 2), so the script is written to be readable by it.
- `tests/deploy/deploy_script_support.py` whole and `tests/deploy/test_loop2_deploy_dump.py` lines 1-80: the block reader and the stand-in conventions the seam imports.
- `a note in the author's notes vault` and `git.md` (the instruction files name them for scripts and commits). I read `scripts.md` after one Python rewrite had turned the LF of `tests/deploy/test_loop2_watch.py` into CRLF; I converted it back before any commit, and the file is LF in the commit.

## Searches not found or unclear

- None for the passages of the handoff. One thing unclear: the plan says the test file for the message carries "the name the foundation step gave row 5"; the name in `foundations/invariants.md` is `failure-watcher-message` and I used it.
- `foundations/invariants.md` gives `failure-watcher-message` the method `test` and part `deployment`; whether the foundation check expects the `# invariant:` tag on each test of the file (I put it on every test of `test_loop2_watch_message.py`) I did not run, as the check is the orchestrator's.

## Choices made, with the way rejected and the cost if wrong

1. **Constants block holds the state of the whole contract, not the log prefixes.** The two anchored prefixes (`{"failure":"browser"` and `{"failure":"`) stand as literals in the `case` patterns of `count_lines`, not as constants. Rejected: constants `FAILURE_PREFIX` and `BROWSER_PREFIX` in the block. Reason: the repository's reader of shell scripts (`shell_commands`) expands every fixed variable into the line before tokenizing, and the value of `FAILURE_PREFIX` ends in a quote character, so the reader raised "No closing quotation" on the `case` line — any later test that reads this script with it would crash. Cost if wrong: the prefixes are two places in one function, not in the block; the tests do not replace them.
2. **State is written before the messages are sent.** Rejected: send, then write. A failing state write ends the run with exit 6 and sends nothing; a message that `pusher` reports as failed, or that is cut off by `timeout`, still counts as sent (spec C4). Cost if wrong: a run killed between the write and the sends loses that run's messages; the alternative repeats messages at every run when the state cannot be written, which is the flood the spec forbids.
3. **Exactly one log line per eventful run, with the `pusher` exit statuses inside it** (`run: due=…; sent=…; held=…; pusher=kind:status; containers=…; failure_lines=N browser_lines=M`), written after the sends; `skipped:` and `dropped:` runs write their own single line. Rejected: one line per notice. Cost if wrong: a run killed during a send leaves only the exit line, not the line for that run.
4. **A deployment lock that exists but cannot be opened for reading counts as held** (the run is skipped). Rejected: counting it as free. Cost if wrong: if the file ever became unreadable for root (it cannot under normal permissions), the watcher would skip every run and log a `skipped:` line each time, and no alert would come.
5. **`restarted` is judged from a container read now against the state's entry; a container that cannot be read keeps its old entry**, so a container that was down and comes back with the same id and a new start time raises `restarted` after the `down`. Rejected: dropping the entry while unreadable (then every return would be silent). Cost if wrong: one extra `restarted` message after a `down`, within the same per-kind throttles.
6. **`last <kind>` lines are kept in the state for good, not pruned after six hours**, only the `message` lines are pruned at 24 hours. At most five lines more; the throttle reads the age itself.
7. **The state directory is made with `(umask 077 && mkdir -- DIR)`, not `mkdir -m 0700`.** `mkdir -m` fails here under Git's bash on Windows ("cannot change permissions"); the umask form gives mode 0700 on Linux and works in both. Rejected: `mkdir -p -m 0700` (shellcheck SC2174 forbids it besides).
8. **The state is replaced by writing `state.new` and `mv -f` over it**; the exit handler removes a leftover `state.new`.
9. **Seam: `WatchFixture` subclasses `BackupFixture`** and generates the same ten stand-ins (`docker`, `pusher`, `flock`, `date`, and `age`, `rsync`, `ssh`, `scp`, `sftp`, `curl` that must never be called), so the backup seam's answers, hang, signal action and guard are reused unchanged. The stand-in `date` returns the clock plus one second for each further ask in the same run; the stand-in `flock` can refuse the shared lock from its Nth look on. Rejected: a separate copy of the seam (two places to keep alike).
10. **The Polish wording** (spec: the maker's). Subjects `loop2_gra_nie_dziala`, `loop2_usluga_niezdrowa`, `loop2_ponowny_start`, `loop2_awarie_serwera`, `loop2_awarie_przegladarek`; the texts are in the constants block and, as the expected bytes, in `NOTICES` of `watch_script_support.py`. The `restarted` text says "kontener gry albo tunelu", because the kind covers either container. Cost if wrong: only wording; the human can change both places.
11. **`test_the_numbers_are_the_spec_s` was written and removed:** it could fail only by a deliberate change of a constant; the boundaries of 6 hours, 24 hours and 6 messages are tested by behaviour at the second.

## Adaptations of section 4 (plan and code)

- Small: the handoff's *Change* list says `tests/invariants/test_account_server_typecheck.py` names `deploy/loop2-watch` and `deploy/loop2-watch.cron` in `NOT_ROUTES`; slice 1 had already made the tuple (with the logrotate file), so I added the two names to it and a short comment and docstring sentence, and added a `WATCH_SCRIPT` constant. No test was added to that file for the watcher; the watcher's Docker commands are tested in `test_loop2_watch.py`.
- The deploy script's tests keep their own stand-in bytes for the watcher files (`WATCH_SCRIPT_BYTES` in `tests/deploy/deploy_script_support.py`, written by an earlier slice); they still pass and I did not change them. They could now read the real files; left as it is.

## Problems as observed

1. `mkdir -m 0700` fails under Git's bash on this Windows machine ("cannot change permissions of ... Permission denied") although the directory is made. Verified by running it by hand. Cause not investigated (guess: MSYS permission mapping on this volume). Worked around as in choice 7.
2. The repository's shell reader raised on `case $line in "$FAILURE_PREFIX"*)`: verified from the traceback (`line 330: cannot be read (No closing quotation)`); cause verified: the variable's value `{"failure":"` ends with a quote and is pasted into the line before tokenizing. See choice 1.
3. A signal that the script has no trap for (`VTALRM` from a stand-in) ended the run under Git's bash with exit status 6656 and no exit line in the first version, because the exit handler found `$?` still 0 and printed nothing. Fixed with a mark set only at a proper end (`DONE`), as the backup script does with `SENT`; the test `test_a_signal_with_no_trap_still_leaves_the_exit_line` shows the line and a non-zero code. The exact exit status Linux gives for this case may differ from Windows; the test accepts any non-zero.
4. The test run of `test_loop2_watch.py` takes about 140 to 170 seconds on this machine (each run starts bash several times); the other four checks take 10 to 35 seconds.

## What stays for the human (Slice 7 writes the steps)

Installing the script as `/usr/local/bin/loop2-watch` (root, 0755) and the cron file as `/etc/cron.d/loop2-watch` (root, 0644); one run by hand (it prints one `first run` line and sends nothing); restarting the game container deliberately to see the `restarted` message arrive; reading the watcher's log and the age of the state file the next morning. The deploy script's installed-copy comparison already knows both files (slice 3).
