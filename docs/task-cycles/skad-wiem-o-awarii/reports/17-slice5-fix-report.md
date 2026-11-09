# Report 17 — fix of the blocking finding of slice 5

**Status:** done. Variant of make-change: the fix of a review's findings. Findings file: `reports/17-slice5-findings.md` (one blocking finding, I1). Head before: `048264e`. Not pushed.

## Commit

- See `git log -1` on `task/skad-wiem-o-awarii` (message: "test: :white_check_mark: put the marker in a successful but misshapen docker inspect answer of the watcher's message invariant"). One file: `tests/deploy/test_loop2_watch_message.py` (about +40 lines). The script `deploy/loop2-watch` is unchanged.

## I1 — fixed

How: a new test `test_an_inspect_that_succeeds_with_an_answer_off_the_shape_reaches_nothing`, tagged `# invariant: failure-watcher-message`. For the tunnel container, `docker inspect` exits 0 and prints an answer off the expected shape with the marker in it, in seven forms: the marker alone; the marker as the id, as the status, as the health and as the start time of an otherwise right line; a right line followed by a line of the marker; a right line with the marker appended. Each run must send exactly the fixed `down` notice and the marker must be in no argument and no standard input of `pusher`, in no standard output or error, in the log, in the state or in any other file of the run (same `everywhere` assertion as the other cases). Two preconditions in the test: the marker stands in the stand-in's answer, and the watcher asked for that container. The module docstring now names the three inspect cases that exist (right shape with the marker on standard error; off the shape with exit 0; failed command), so it is true.

Check that shows it:
- Against the real script: `python -B -m unittest test_loop2_watch_message -k off_the_shape` in `tests/deploy`: exit 0, 1 test OK.
- Against a scratch mutation of `read_container` adding `elif (( status == 0 )); then log "inspect said: $output"; fi` (the reviewer's mutation): `npm test -- tests/deploy/test_loop2_watch_message.py` exit 1, 8 tests, failures=7, all seven in the new test (the other seven tests stay green, as the reviewer found). Script restored with `cmp` against a saved copy; `git status` showed only the test file modified.

## Checks (command and exit code), after the fix

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/deploy/test_loop2_watch.py` | 0 | 76 tests OK |
| `npm test -- tests/deploy/test_loop2_watch_message.py` | 0 | 8 tests OK |
| `npm test -- tests/deploy/test_loop2_backup.py` | 0 | 26 tests OK |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests OK |
| `npm test -- tests/invariants/test_account_server_typecheck.py` | 0 | 9 tests OK |

Not run: the whole gate and `foundation_check.py` (the orchestrator's). The Minor findings M1-M5 are not in the findings file and were not touched.

## Own-work check

Requirement the fix most likely misses: that the new case would catch the *reviewer's* defect and not only a variant of mine. Check: I applied the reviewer's exact mutation (log `$output` on the `status == 0` branch) and saw the new test fail for all seven shapes, for the reason "the marker is in the log"; the same mutation passed all earlier tests (reviewer's evidence). Seen failing and passing, both runs above.

## Reaches beyond the findings

- Read `tests/deploy/test_loop2_watch_message.py` lines 55-225 to place the case; `.the-way/task-cycle/change/fix.md`. No foundation entry or guideline read beyond what the earlier slice report lists.

## Searches not found or unclear

- none. (I did not read `reports/16-review-slice5-report.md`; the findings file carries the finding in full.)
