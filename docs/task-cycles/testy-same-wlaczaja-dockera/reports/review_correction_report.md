PASS b6ee3cb824f975b6be3ee571897d4d7beaa40f8b

# Review of the correction for the human's remarks — `review-change`

Range `50bb46a2ddb25bca8e3a7fd8cd6324ab25b8ece8..b6ee3cb8` (commits `c6d51cba`, `b6ee3cb8`); `git rev-parse HEAD`
= `b6ee3cb824f975b6be3ee571897d4d7beaa40f8b`, worktree clean after all runs. Read-only; no Docker Desktop
started or stopped; no full `npm test`. Read whole: the handoff, `correction_remarks.md`, `fix.md`,
`correction_report.md`, and the diff `git diff 50bb46a2..HEAD` (3 files).

Result: remarks 1(a) and 1(b) both made; no Critical, no Important; 2 Minor findings (new, in the correction's
diff), which block nothing.

## Changed files (range diff)

| File | + / - |
|---|---|
| `scripts/docker_gate.py` | 18 / 12 |
| `tests/quality/test_docker_gate.py` | 25 / 0 |
| `foundations/part_map.md` | 1 / 1 |

## Each remark

**1(a) — made.** The `build-tools` sentence (`foundations/part_map.md`, section `build-tools`) is back to
"…runs the test gate and mutation analysis, checks code quality and types, …" with no Docker clause between the
gate and the mutation analysis, so it no longer reads as if the test run also started the mutation analysis.
The Docker clause now ends the sentence: "…and starts Docker Desktop, where it is installed, for a test of the
test gate that needs a Docker daemon when none answers." It says "where it is installed" (what D-390 and the
code mean: the `docker desktop` command exists; and the no-Desktop skip at once). One sentence, as the part
map template asks; *Files*, *Depends on*, *Trust boundary* unchanged. `foundation_check.py`: 0 errors. See
Minor 1 for one phrase.

**1(b) — made.** `scripts/docker_gate.py:daemon_gap`: the deadline is now taken at the first ask (after the
recorded gap is read, before the first `docker version`), and each call of `docker` in it — the first ask,
`desktop --help`, `desktop start`, and each poll — takes `within(deadline, cap)` = `max(1, min(cap, remaining))`
as its time limit. I traced the hanging case with the defaults: first ask 30 s (0-30), `desktop --help` 30 s
(30-60), start up to 60 s (60-120), polls of 30 s (120-150, 150-180); the loop then ends at about 180 s plus
at most the 1 s floor — not 180 s plus a minute, which the old code gave (a first ask of 30 s and a
`desktop --help` of 30 s stood before the deadline). `desktop_present` and `start_desktop` take the limit as
a parameter with the old caps as defaults, so callers other than `daemon_gap` (none) would behave as before.

## The new test: does it prove the bound, and what does it not prove

`test_a_daemon_that_hangs_instead_of_refusing_is_waited_for_within_the_limit_alone`: limit 6 s, stand-in `docker`
for `desktop --help` and `desktop start`, and `subprocess.run` patched so that an ask of `version` sleeps as long
as the timeout it was given and raises `TimeoutExpired`; it asserts that the whole `daemon_gap` ends in under
12 s, that it returned a gap, and that the start was asked once.

- It fails for the right reason on the old code: the author's run shows "36.12 not less than 12" with the
  timeouts `[30, 5.9…]`, i.e. the first ask was given 30 s although the limit was 6, which is exactly
  the defect of remark 1(b). It passes now: I ran `python -B scripts/test.py tests/quality/test_docker_gate.py`
  twice, both OK, 12 tests (30-32 s). (I did not re-run it against the old code myself; the old-code
  failure is the author's, checked by reading: the old code gave the first ask a fixed 30 s timeout, which
  the patched `run` would sleep in full.)
- What it proves: every ask of `version` is handed a timeout not larger than the time that remains to the
  limit, so, given that `subprocess.run` enforces the timeout it is handed, a hanging daemon cannot hold the
  first test beyond the limit by more than the 1 s floor per call. The sleep inside the patch also makes the
  elapsed time real, not just an argument inspection.
- What it does not prove: that the real `docker.exe`, hung, is actually cut at the timeout by `subprocess.run`
  on Windows (a kill followed by a wait for the pipes: if `docker.exe` has a child that keeps the pipes open,
  for example a credential helper, the wait after the kill could hold longer; not observable without a real hung
  Docker); that `desktop start` hanging is bounded (same helper, but untested, the author says so); and the
  default 180 s (nothing waits it). Replacing the ask at the `subprocess.run` boundary instead of making the
  stand-in hang is justified: a timeout of the Windows `.cmd` stand-in kills only the wrapper and waits for the
  pipes its Python child holds, so a hung stand-in would measure the sleep, not the limit. I agree with that
  reason; it is named in the test's comment only partly ("the ask is cut at the limit it was given").
  All of this is within the unproven part that task step 6 or a later real check covers; the code does not look
  unable to work.

## Did the correction break a case that held

- D-390 "at most 3 minutes": the code now holds closer to it (see 1(b)). The wording of D-390 is unchanged and
  true.
- "A recorded failed start makes later tests skip at once": unchanged — `recorded_gap()` is still read first and
  returns before any call; `test_after_a_start_that_did_not_finish_the_next_ask_gives_the_gap_at_once` and the
  invariant test `test_one_run_of_the_whole_gate_waits_for_a_docker_that_does_not_rise_once` pass.
- "No Docker Desktop skips at once": unchanged — `desktop_present()` false returns the same sentence at once;
  the two no-plugin cases pass. The order changed in one place: the first `daemon_answers` now runs before the
  `docker_command() is None` check, but `daemon_answers` returns False for a missing `docker`, so the result is
  the same (`docker` not on PATH).
- D-391 (no stop or restart) and D-392 (no memory query): untouched; the stand-in's `stops()` stays asserted
  empty in the two whole-run cases.

## New findings

### Critical / Important

none

### Minor

1. **Wording of the part-map sentence — "a test of the test gate".** `foundations/part_map.md`, `build-tools`
   sentence, last clause: "for a test of the test gate that needs a Docker daemon". The tests that need Docker
   are tests the gate runs (of the game's container, the backup stream, the restore trial), not tests *of* the
   test gate; `tests/quality/test_docker_gate.py` is the one that tests the gate. A reader may take the clause
   to mean only tests of the gate itself. The earlier wording ("for a test that needs a Docker daemon") had no
   such ambiguity, and the human's remark asked only for the move and "where it is installed". Not blocking; a
   fix is "for a test the gate runs that needs a Docker daemon". It lies within the correction's diff and
   the task.
2. **The new test leaves the stand-in only the 1-second floor for its launches.** `tests/quality/test_docker_gate.py`,
   the new test: with the limit 6 s the patched first ask sleeps the whole 6 s, so the real stand-in calls that
   follow (`desktop --help`, `desktop start`) are each given the floor of 1 s by `within`; on a heavily loaded
   computer a launch of the `.cmd` wrapper and Python slower than 1 s would turn `desktop --help` into a timeout,
   the gap into "no Docker Desktop to start", and `len(docker.starts())` from 1 to 0 — a failure that says
   nothing of the bound. I timed a bare `.cmd` -> Python launch on this machine: about 0.06 s (the stand-in's
   own imports add little), and two runs of the file passed, so the margin is about 6x here; the same kind of
   tightness I graded Minor in the earlier review (Minor 4). A limit of 10 s with the same bound relation
   would leave the same floor, so the remedy is to let the ask hang for only part of the limit, or drop the
   `starts()` assertion's dependence on the stand-in; the author may leave it. Within the task.

## Declined to judge

- Remark 1(c) and 2 (let through by the human); the real start of Docker Desktop (the orchestrator's check); the
  merge of `main` into the branch (the base `50bb46a2` is the merge commit, reviewed earlier).

## Checks run (command, exit code)

All from the worktree root with `npm_execpath` set to the installed npm.

1. `git rev-parse HEAD`, `git log --oneline 50bb46a2..HEAD`, `git diff --stat 50bb46a2..HEAD`,
   `git diff 50bb46a2..HEAD` -> exit 0; two commits, three files.
2. `python -B .the-way/elements/common/foundation_check.py` -> exit 0, `0 errors`.
3. `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` -> exit 0, `Ran 10 tests`, OK.
4. `python -B scripts/test.py tests/quality/test_docker_gate.py` (twice) -> exit 0 both, `Ran 12 tests in 32.063s`
   and `in 30.399s`, OK (stand-in `docker` only).
5. `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa .` -> exit 0.
6. A scratch timing of a `.cmd` wrapper launching Python (`desktop --help`, 8 runs) -> about 0.05-0.09 s each
   (a measure for Minor 2; written nowhere).
7. `git status --short` after the runs -> empty.

Not run: full `npm test`; the Docker tests that build images; a re-run of the new test against the old code (the
author's run is taken, its mechanism checked by reading); any real start of Docker Desktop.

## Reaches beyond the dispatch

none beyond the dispatch's own list; I read `scripts/docker_gate.py` and `tests/quality/docker_standin.py` as
seen earlier in this task, and traced the timing from the diff.

## Unread material

- Foundation entries: D-390, D-391, D-392, `gate-docker-start-waits-once`, `docker-desktop-start-detach`, the
  `build-tools` part-map entry were read whole in this task's earlier reviews, and in this review I re-read only
  the changed `build-tools` sentence and compared the behaviour to D-390/D-391/D-392 from that earlier reading;
  I did not re-open the entries in full here (the correction changes none of them).
- Guideline files: `guidelines/coding.md` and `guidelines/testing.md` read whole in the earlier reviews of this
  task; not re-read whole in this one (the correction touches no rule of either: no new test kind and the testing
  rule about asking for a daemon is unchanged). The diff of the earlier fix to `testing.md` is not part of this
  range.
- `correction_handoff.md` and the other reports (`review_whole_report.md`, `review_return_report.md`) not read
  in this review; the handoff quotes the remarks.

## Searches not found or unclear

none
