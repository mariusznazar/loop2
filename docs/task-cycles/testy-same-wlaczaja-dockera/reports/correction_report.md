# Correction report — the human's remarks on the request

**Status: done.** Branch `task/testy-same-wlaczaja-dockera`, range `50bb46a2..b6ee3cb8`, tree clean. The merge `50bb46a2` was not touched.

## Commits

- `c6d51cba` fix — remark 1(b): `scripts/docker_gate.py` (+13/-10 approx.), `tests/quality/test_docker_gate.py` (+25)
- `b6ee3cb8` docs — remark 1(a): `foundations/part_map.md` (+1/-1)

## Each remark

- **1(a) fixed.** The `build-tools` sentence no longer carries the Docker clause mid-list. It is back to "…runs the test gate and mutation analysis, checks code quality and types, …" and ends with "…, builds and serves the browser view's kitchen-sink page on the developer's machine, and starts Docker Desktop, where it is installed, for a test of the test gate that needs a Docker daemon when none answers." One sentence, as the template's "The binding part" asks; *Files*, *Depends on* and *Trust boundary* are unchanged. I wrote it by the element's rules (template, `decide_entry.md`, `write.md` read in the return step; the skill has no human step that this edit needed). `foundation_check.py` → `0 errors`.
- **1(b) fixed.** In `daemon_gap` the deadline is now taken at the first ask (after the recorded failure is read, before the first `docker version`), and each call of `docker` in it — the first ask of the daemon, the check for the `desktop` command, `desktop start`, and each poll — takes as its time limit the lesser of its own cap (30 s, 30 s, 60 s, 30 s) and what remains until the deadline, never under 1 s (new helper `within`). `desktop_present` and `start_desktop` take the limit as a parameter. So a daemon that hangs instead of refusing holds the first test for the limit (180 s by default) plus at most about a second, not the limit plus a minute.
- **1(c) let through, 2 let through:** nothing changed for them.

## Test (the case added) and its failing run

`test_a_daemon_that_hangs_instead_of_refusing_is_waited_for_within_the_limit_alone` in `tests/quality/test_docker_gate.py`: limit 6 s, the stand-in `docker` for `desktop --help` and `desktop start`, and the asks of `docker version` replaced at the `subprocess.run` boundary by a hang that lasts as long as the time limit the ask was given and then raises `TimeoutExpired`; it asserts the whole `daemon_gap` ends within 12 s and that the start was asked once. I did not make the stand-in program itself hang: on Windows the stand-in is a `.cmd` that runs Python as a child, and when `subprocess.run` times out it kills only the `.cmd` and then waits for the pipes the child still holds, so the real timing would be that of the stand-in's sleep, not of the helper's limit. What this proves: every ask is given a limit within the remaining time. It does not prove how the real `docker` behaves when hung.

- Failing run on the code as it stood: `python -B scripts/test.py tests/quality/test_docker_gate.py` → exit 1, `Ran 12 tests`, one failure "36.12 not less than 12 : asks of the daemon were given the time limits [30, 5.9…]".
- After the fix, same command → exit 0, `Ran 12 tests`, OK (~32 s); the other 11 cases kept unchanged.

## Return step again: what I compared, what stayed

- D-390 ("at most 3 minutes"): the code now keeps to it more exactly; wording true, unchanged. D-391, D-392, `gate-docker-start-waits-once`, `docker-desktop-start-detach`: unaffected (the recorded failed start and the single start per run are as before; test of the invariant passes).
- Part map: only the sentence above changed; the files of the change are still claimed (`foundation_check.py` 0 errors). Glossary: nothing used in a new meaning. No entry written. `guidelines/testing.md` unchanged (the way to ask for a daemon is as before).

## Checks (from the worktree root, `npm_execpath` set)

- `python -B scripts/test.py tests/quality/test_docker_gate.py` → 0 (12 tests); before the fix → 1 (above).
- `python -B scripts/test.py tests/quality/test_quality_invariants.py` → 0 (5 tests)
- `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` → 0 (10 tests)
- `python -B scripts/test.py tests/quality/test_test_gate.py` → 0 (7 tests)
- `python -B scripts/test.py tests/deploy/test_loop2_tunnel_image.py` → 0 (1 test; real daemon answering, not skipped)
- `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa .` → 0
- `python -B .the-way/elements/common/foundation_check.py` → `0 errors`
- Not run: full `npm test`; Docker Desktop not started or stopped.

## Own-work check

- Requirement most likely not met: "the first test must not wait about a minute beyond the 3 minutes" — the case where the hang comes before the start. Check: the added case (hang on every ask of the daemon from the first one) — red before, green after. A hang in `desktop start` itself is bounded by the same `within` limit; not separately tested (the code path is the same helper call; a `desktop start` that outlasts its cap would be cut by `subprocess.run` at the limit given).
- Overshoot left: floors of 1 s per call and the launch of the stand-in or real processes; at most a few seconds beyond the limit, not a minute.

## Unread material

none (the handoff, the remarks and the files changed were read whole; `review_whole_report.md` and `review_return_report.md` were not read — the handoff quotes the two remarks they led to).

## Searches not found or unclear

none
