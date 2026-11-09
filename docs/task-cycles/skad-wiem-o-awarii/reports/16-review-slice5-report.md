FAIL 048264e19f5c3e8f33961afa3379a308be61891c

# Review of slice 5, the failure watcher and its schedule

Range `7bf49e507a8a71b4e792462255d3359a7d989ec4..048264e` (one commit, `048264e`); `git rev-parse HEAD` is `048264e19f5c3e8f33961afa3379a308be61891c`; `.the-way` is at `294af7fde45323ac1851c014a03071a97fc38d96`. I changed no tracked file.

Counts: 1 blocking (Important), 5 Minor, 0 out-of-scope findings (the set-aside behaviours are listed under Declined to judge).

The script itself holds up: I found no Critical bug and no hostile input that makes it run a command, write a marker or read an option. The one blocking finding is in the test of the invariant `failure-watcher-message`: a break of the very thing it protects survives it (shown by a mutation).

## Important (blocking)

### I1. The invariant test does not reach the path where `docker inspect` succeeds with an answer off the expected shape

- Place: `tests/deploy/test_loop2_watch_message.py:60-62` (`arrange_down`), `:209-218` (`test_docker_text_on_a_failed_reading_reaches_nothing`), docstring `:16-19`; the code path is `deploy/loop2-watch:304-319` (`read_container`, the case `status == 0` and the answer not matching `INSPECT_LINE`).
- What is wrong: the docstring says the marker stands "in the standard output and the standard error of the stand-in `docker` for `inspect` (an answer of the right shape, and one off it)". In the test the only inspect answer carrying the marker on standard output is `exit_code=1` (a failed command), and the right-shape answers carry the marker on standard error only. An inspect that exits 0 and prints an answer off the shape, with the marker in it, is not in any message test. `tests/deploy/test_loop2_watch.py:144-164` (`test_an_answer_off_the_expected_shape_is_down_and_never_used`) has that shape but no marker, and asserts the messages and the state only, not the log.
- Why it matters: the spec's row 5 test says a marker in "the stand-in `docker` output" "never reaches `pusher`, the state, the log or any file", and the handoff asks that the cases would fail if Docker output reached `pusher` or the log. This is the branch where the script holds the whole raw answer in `$output` and could be changed to quote it; the invariant is the only guard for that on a root script. A claimed coverage that is not there is a test that does not protect what it says.
- Evidence: I copied `deploy/`, `tests/deploy/` and `tests/invariants/` to `a scratch directory of the orchestrator's session` and added to `read_container` an `elif (( status == 0 )); then log "inspect said: $output"; fi`. Then `python -B -m unittest test_loop2_watch_message test_loop2_watch.TheFiveKinds` gave 22 tests OK (exit 0), and the whole `test_loop2_watch` gave 76 tests OK (exit 0). So the mutation that writes Docker's raw output to the watcher's log survives all 83 tests of the slice. (The same change on the failed-command branch is caught by `test_docker_text_on_a_failed_reading_reaches_nothing`; I did not run that one, I read it.)
- Fix size: one more arrangement in the message test (inspect exit 0, stdout `"<marker> running none <time>"` or the marker alone, for one container), run through the same "marker reaches nothing" assertions, plus the docstring made true. No script change.

## Minor

### M1. The header comment claims more than the script does

`deploy/loop2-watch:23-25`: "Nothing read from a log or from Docker, no number and no name of a commit or an account goes into one, into the state or into the log of this script". The state holds the id and start time read from Docker (shape-checked), and the log holds counts and exit statuses. Only the message is free of them (which is what the invariant and the spec say). Also `:39`: "Every constant stands in this block" while the patterns (`:72-84`) and the two anchored prefixes in `count_lines` (`:336-337`) stand outside it; the executor's reason for the prefixes (the repository's shell reader breaks on a value ending in a quote) is sound, and it is a spec "left to the maker" choice, so only the sentence needs to be narrowed. A reader of the comment could carry a wrong rule to a later edit.

### M2. A clock that goes backwards holds messages longer than the throttle says

`deploy/loop2-watch:424-428` and `:437`: a `last <kind>` or `message` stamp in the future makes `NOW - stamp` negative, which is less than the interval, so that kind (and the day budget) stays held until the clock passes the stamp; the window handling is covered by a test (`test_a_state_from_the_future_reads_no_window_and_restarts_from_now`), the throttle is not. A step back of an hour holds a kind up to seven hours instead of six. Rare and bounded; no test and no comment names it.

### M3. Reading the log is bash `read` over a pipe, so the speed is the limit

`deploy/loop2-watch:328-340`. Measured through the test seam on this Windows machine (Git bash 5.3, not the server's): about 5.4 MB in 200 000 lines, a whole run in 16 s; a single 3 MB line without structure, a whole run in 8.5 s; a 30 MB single line did not finish within the seam's 45 s limit. On the server the limit that matters is `DOCKER_WAIT_SECONDS=60`: if the reader cannot take the window's output in that time, `timeout` kills `docker logs`, the run logs "logs unreadable" and keeps the window open, and the next window is longer (up to 24 hours), so the two log kinds could stay blind while down, unhealthy and restarted still work. At the game's real log volume (small, and the report route is limited to 30 an hour) this does not arise, and the failure is visible in the log, never silent in the state; I did not measure on Linux. Grade Minor because no input the task lets an outside party send reaches that size.

### M4. A missing or broken `flock` is logged as a held lock

`deploy/loop2-watch:171-176` and `:201-208`: any non-zero status of `flock` (including 127, command not found) is read as "another run holds the lock" or "the deployment's lock is held", so a host without `flock` makes every run end with a `skipped:` line and no message, and the log line names the wrong cause. The spec forbids a `pusher` call about the watcher itself, and the human's next-morning check (log and state age) shows it, so nothing is lost silently; the line could say the status instead of naming a cause. Not shown by a test.

### M5. Behaviour the executor named and I agree with, one remark each

- State written before the messages are sent: consistent with spec C4 ("counts as sent") and the test `test_a_state_that_cannot_be_written_is_a_failed_run_and_sends_nothing`; cost named correctly (a run killed between write and send loses that run's messages).
- One log line per eventful run: consistent with C6; held kinds are named in it.
- A NUL byte inside the counted prefix is dropped by `read`, so `{"fail<NUL>ure":"database"}` counts as a failure line (I ran it through the seam: one `pusher` call, subject `loop2_awarie_serwera`). Harmless (only a count above zero), noted because the handoff asked for NUL.

## Declined to judge (outside the task or not provable here)

- Real `flock(1)` behaviour: that a shared non-blocking lock on a file opened read-only is refused while the deployment holds the exclusive lock (unproved; the stand-in `flock` answers by pattern). The script and the tests do not claim it proved; the executor lists it.
- That `pusher` delivers, that cron runs the file, what Docker's `inspect` fields and the `--since`/`--until` windowing of `docker logs` return, and bash 5.1 on the host (tests ran under bash 5.3). No file of the slice claims them proved (the docstrings of `watch_script_support.py` and `test_loop2_watch.py` say the opposite).
- A state directory, log file or lock file that is a symlink or is owned by someone else: the directories are root-owned and made by the human at install (D-12); the script does not refuse a symlink (`a note of the author's notes vault`, `>>` follow it) and no test covers it. Outside the task's boundary table, which lists only the state file's content.
- The unchanged `WATCH_SCRIPT_BYTES` stand-ins in `tests/deploy/deploy_script_support.py` (Slice 3's), which could now read the real files: the executor left them as they are; not this slice's change.
- The stale rows of `guidelines/testing.md` (the `deploy/` trust-boundary row does not name the watcher): scheduled by the spec (S2) and not edited by this change.
- The skill text and the installation steps (Slice 7).

## Against the task, spec, foundation and guidelines

- Spec C1-C7: files and cron line (`MAILTO=""`, `*/5 * * * * root /usr/local/bin/loop2-watch`, no dot in the installed name, ends with a newline) match; the Docker commands are `inspect --type container --format <one string>` of the two names and `docker logs --since --until` of `loop2`, both streams, all three external calls (two Docker forms, `pusher`) under `timeout --kill-after`; the deploy lock is opened with `8<` only, never named to `flock`, looked at twice, a missing file means free, a file that cannot be read counts as held; own lock on fd 7, exclusive, non-blocking, first call; five kinds in the table order; window from the last end to the run's start (one `date` call, tested by a clock that advances per ask), clamp at 24 h, window kept open on unreadable log or game container; strict state (four shapes, duplicates and unknown lines refuse the whole file, 40-line cap) and the "from now" rule; counting by `case` on `{"failure":"browser"` first, then `{"failure":"` (the browser variant is tested against a word that merely begins with `browser`); per-kind 6 h and 6 per 24 h with the boundary seconds tested; one `pusher` call per message with a fixed Polish subject (ASCII, underscores) and one fixed sentence, built from constants; exit handler writes an exit line and never calls `pusher`; a signal with no trap still leaves the line (mark `DONE`).
- Invariant `failure-watcher-message`: the `# invariant:` line is on every test of `test_loop2_watch_message.py` and `foundation_check.py` reports 0 errors. The message cases fail when a marker from a counted or uncounted log line, from `docker logs` standard error, from a failed inspect's standard output or standard error, or from a damaged state file reaches `pusher`, the log, the state or any file of the machine (executor's mutation, plus mine on the other branch). They do not cover I1.
- Task-level checks: nothing is installed or run against the server; the change only adds repository files, and the script is never executed by any test against a real Docker or `pusher` (the stand-ins for `age`, `rsync`, `ssh`, `scp`, `sftp`, `curl` assert not-called). D-12 and D-13 hold: no account name, host or secret in the new files.
- D-353 "violates" list: no message holds a count, a commit name or an account id (the log may hold counts, which the spec allows); the watcher takes no lock for writing and runs no Docker command that changes a container (tests list every Docker command, static and per run).
- `guidelines/coding.md`: shellcheck passes without a `# shellcheck disable`; `tests/quality/test_quality_invariants.py` adds the script to `BASH_SCRIPTS`; `.gitattributes` (`deploy/** text eol=lf`) covers both new deploy files (`git ls-files --eol`: `i/lf w/lf`). Python and English identifiers/comments follow the repository's convention.
- `guidelines/testing.md` (rules read: levels, expected values, behaviour not implementation, trust boundaries, mutation sections): the expected values (subjects, texts, state lines, epochs) are written out by hand or built by small helpers that restate the spec's format, not computed by the script; the exact order and arguments of Docker calls are asserted, which the spec fixes ("one fixed form"). Not applicable: the mutation tool is for `simulation` files.
- Changed invariant tests: `tests/invariants/test_account_server_typecheck.py` (`NOT_ROUTES` gains the script and its cron file, plus a docstring sentence and a `WATCH_SCRIPT` constant); no assertion weakened. `tests/quality/test_quality_invariants.py` (`BASH_SCRIPTS`): one name added.
- Reserved choices: none taken (Bash, `cron.d`, `pusher`, `flock` are the task's and the spec's).

## Checks I ran (command, exit code)

All from `the root of the repository`:

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/deploy/test_loop2_watch.py` | 0 | 76 tests OK, 183.6 s |
| `npm test -- tests/deploy/test_loop2_watch_message.py` | 0 | 7 tests OK |
| `npm test -- tests/deploy/test_loop2_backup.py` | 0 | 26 tests OK (shared seam unchanged) |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests OK (shellcheck of the new script, ruff, prettier, eslint, audit) |
| `npm test -- tests/invariants/test_account_server_typecheck.py` | 0 | 9 tests OK |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| scratch `hostile.py` (in the scratchpad) through the fixture: 200 000 normal lines plus one failure line | 0 | one `pusher` call, run 16 s |
| same: a 3 MB line then a failure line | 0 | one `pusher` call, run 8.5 s |
| same: a 30 MB line then a failure line | not finished | exceeded the seam's 45 s limit (see M3) |
| same: NUL before the prefix; NUL inside the prefix; no trailing newline; option-like lines (`--since`, `-f`) | 0 | each counted as a failure (one call), none read as an option; a CR before the prefix is not counted |
| mutation in a copy under `...\scratchpad\rvmut1`: log the raw output of a successful off-shape inspect; `test_loop2_watch_message` plus `test_loop2_watch.TheFiveKinds`, then the whole `test_loop2_watch` | 0, 0 | 22 and 76 tests OK, the mutation survives (I1) |

Not run: the whole gate (`npm test`), which the cycle runs itself; any check on Linux or with a real `flock`, `pusher`, Docker or cron (none reachable here; they are unverified, not passed).

## Reaches beyond the handoff

- `.runs/task-cycles/skad-wiem-o-awarii/spec.md` whole (the handoff named line ranges; I read it whole to have the settlements S1-S2 and the trust-boundary table) and `reports/15-slice5-report.md`.
- `foundations/decisions.md` D-352 and D-353 whole (lines 7867-7895) and D-235 (4606-4626): to check the "violates" lists and the stand-in rule against the script and the tests.
- `foundations/invariants.md` 1249-1278 and 155-164 (the handoff's ranges), `foundations/environment_facts.md` 27-31, 442-446, 454-458 (the handoff's Read).
- `deploy/loop2-deploy` and `deploy/loop2-backup` (lock constants and `exec 9>>`, constants-block markers), `tests/invariants/test_loop2_host_sharing.py` (lines 1-60) and the file list of `git ls-files -s deploy tests/deploy`: to see how the new script's lock sits against the others and that file modes match.
- `guidelines/testing.md` lines 38-327 (rules and the trust-boundary section); I did not read the recipes and examples below line 327.
- `a note in the author's notes vault` (the instruction files name it for any script I write: the scratch runs).
- A scratch directory `...\scratchpad\mut` already stood in the session's scratchpad, holding an earlier copy of this worktree (not mine). My first copy command wrote into it by mistake (it created `deploy/deploy`, `tests/deploy/deploy`, `tests/invariants/invariants` inside it); I removed exactly those three directories by literal path and left everything else as I found it. My mutation work then went to the new `rvmut1` directory.

## Searches not found or unclear

- None for the handoff's passages. One unclear point: the handoff says the foundation step gave row 5 a name; `foundations/invariants.md` names it `failure-watcher-message` and the tests use it (same as the executor found).
- The Linux speed of the `read` loop (M3) and the real `flock` behaviour were not found out here (no Linux with `flock` reachable); both are unverified.
