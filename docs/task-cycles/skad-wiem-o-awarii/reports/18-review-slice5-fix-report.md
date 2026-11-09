PASS 996e42ca8a85e23fdc5c71950148b4baebd01859

# Review of the fix of slice 5 (finding I1)

Fix range `048264e19f5c3e8f33961afa3379a308be61891c..996e42c` (one commit, `996e42c`); `git rev-parse HEAD` is `996e42ca8a85e23fdc5c71950148b4baebd01859`. I changed no tracked file; `git status --short` is empty. Method: `.the-way/task-cycle/review/SKILL.md` and `fix.md`. Inputs: `reports/17-slice5-findings.md`, `reports/17-slice5-fix-report.md`.

Counts: 0 blocking, 0 Minor new, 0 out-of-scope.

## I1 — fixed

The diff touches one file, `tests/deploy/test_loop2_watch_message.py` (34 lines added, 1 removed); `deploy/loop2-watch` is unchanged (`git diff 048264e..996e42c -- deploy` is empty).

- New test `test_an_inspect_that_succeeds_with_an_answer_off_the_shape_reaches_nothing`, tagged `# invariant: failure-watcher-message`. For the tunnel container the stand-in `docker inspect` exits 0 and prints seven answers off the shape, each with the marker: the marker alone; as the id, as the status, as the health and as the start of an otherwise right line; a right line followed by a line holding the marker; a right line with the marker appended. Each run must send exactly the fixed `down` notice (`assert_one_fixed_notice`) and the marker must appear in no `pusher` argument or input, no standard output or error, not in the log, the state or any file of the machine (`everywhere`). Two preconditions: the marker stands in the stand-in's answer, and the watcher asked for that container. The shapes really are off `INSPECT_LINE` (the id is not 64 hex characters, the status/health are not in the allowed words, the start is not a time, extra text or a second line).
- The module docstring now names the three inspect cases that exist, so its claim is true.
- The reason it catches the defect: the test sets the marker on the very branch (`status == 0`, answer not matching) I named in the finding.

## Does the new case fail on the mutation, and why seven

I ran it myself in a fresh copy of the head (`deploy/`, `tests/deploy/`, `tests/invariants/` under `a scratch directory of the orchestrator's session`), in `tests/deploy`:

| Command | Exit | Result |
|---|---|---|
| `python -B -m unittest test_loop2_watch_message` on the copy of the real script | 0 | 8 tests OK |
| same, after adding to `read_container` the mutation of the first review (`elif (( status == 0 )); then log "inspect said: $output"; fi`) | 1 | `FAILED (failures=7)`; all seven are subtests `[the marker alone]`, `[the marker for the id]`, `[... status]`, `[... health]`, `[... start]`, `[a good line and the marker after it]`, `[a good line with the marker appended]` of the new test; the other seven tests of the file pass |

So yes, it really fails on the mutation, and the number is 7 because the unittest counts one failure per `subTest`, and the new test has seven subtests, one per shape; each of the seven shapes reaches the mutated branch and puts the marker in the log. (8 tests in the file: the 7 old plus 1 new; the failures are 7 subtests of that 1 new test, not 7 tests.)

## Check of the fix itself

- `npm test -- tests/quality/test_quality_invariants.py` (ruff over the changed Python, shellcheck): exit 0, 5 tests OK.
- I did not rerun the other focused checks of the slice (the watcher file, backup, route test): the fix changes only a test file that none of them reads, and the script is byte-identical to the head I reviewed. The executor reports them green; unverified by me.
- Nothing new Critical or Important in the fix diff; the one wording to watch (`"the marker for the id"` passes the marker through `healthy_line(MARKER)`) is correct as written.

## Minor findings M1-M4 of the first review

Not in the findings file and not fixed, as the findings file says; they remain open and block nothing.

## Declined to judge

- Real `flock`, `pusher`, Docker, cron, bash 5.1: as in the first report.

## Reaches beyond the dispatch

- None beyond the fix diff, the two named reports, `fix.md`, and a scratch copy of the head under the scratchpad (new directory `rvmut2`; the earlier directory `mut` of another session was not touched this time).

## Searches not found or unclear

- none
