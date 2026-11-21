# Report — executor of slice 1, task `ocena-programu-na-ziarnach`

**Status:** done

## Files changed and commits

- `tests/invariants/test_local_start_access.py`: +22 / -7 lines.
- Commit `b2114894` (base `a65b8fa4`): `test: :white_check_mark: bind the port of the busy stand-in server before it holds its process and wait for that in the case of a start on its way up, so a second start cannot pick the first one's server port while it is free (D-49, D-256)`.
- `scripts/local-start.mjs` is unchanged (I changed it for one mutation check and restored it with `git checkout -- scripts/local-start.mjs` before the commit; `git status` was clean after the commit). No game file changed; `tests/flaky-tests.md` holds no entry of this case and is unchanged.

## Where the collision came from (for the request)

The port of the collision is the **port of a start's built server**, which `scripts/local-start.mjs` picks itself: `freePort()` listens on port 0, reads the port and closes the probe, and later the built server listens on that port in the same process. Between the two, the port is free for the whole system.

In the case `test_a_start_on_its_way_up_is_not_taken_for_ended` the first start runs the stand-in `BUSY_SERVER`. That stand-in was the code of `STAND_IN_SERVER` followed by a top-level `Atomics.wait(..., 4000)`, which holds the whole process for 4 s. Node binds a `listen(port, host)` on a later turn of the event loop, so the top-level hold ran **before the bind**: for 4 s the server port the first start had picked was a port nobody listened on. The case starts a second start inside that window, and the second start's `freePort()` asks the system for a free port; the system may name the very port the first start has picked and not yet bound (or another test process in the same gate may take it). Whichever stand-in then listens second gets `EADDRINUSE`; the stand-in has no handler of the `error` event of its server, so the process dies with `Error: listen EADDRINUSE: address already in use 127.0.0.1:<port>`, which is the message of the failures in CI (Linux, `ubuntu-24.04`, where the system hands out ephemeral ports at random, so a repeat of a port in a 4 s window comes only now and then).

Verified in a working copy (a Node probe, `.runs/executor-1/`, removed):
- Old shape (hold at top level, then listen): while the child held its process, another process **bound the same port successfully** (`bound-ok`) and a connection got `ECONNREFUSED` — the port was unbound during the hold.
- New shape (listen, then hold in the listen callback): the other process got `EADDRINUSE` and a connection was accepted by the kernel.
- With the old shape, another process holding the port during the hold made the child die on its `listen` with exit code 1 and exactly `Error: listen EADDRINUSE: address already in use 127.0.0.1:<port>` / `code: 'EADDRINUSE'`.

What is not verified: I did not see the failure itself in 15 plain runs on this Windows computer (see below), so that the collision in CI is exactly this one is established by the mechanism and the message, not by a reproduced failure. The mechanism needs no change of `scripts/local-start.mjs`: the picking of the port stays as D-431 gives (the start tries no other port; D-49's "a port the system names free" is what `freePort()` does); the fix is in the stand-in and in the order of the case.

## The change

1. `BUSY_SERVER` is written out as its own text: the same server as `STAND_IN_SERVER`, but the hold (`Atomics.wait(..., 4000)`) runs in the listen callback after the `Loop: http://127.0.0.1:<port>` line is written, so the server port is bound before the hold begins.
2. The case waits, before it starts the second start, for the first start's directory **and** its `Loop:` line (`SERVER_LINE`), and has a precondition `assertRegex` that the line stands. The second start therefore picks its port only after the first one's server port is held by a listener, which the system never names free; no window is left.
3. Unchanged: every control and expected value of the case (the directory stands, the second start runs, the first's directory is still there, two directories). No other case changed. The header docstring still describes the stand-in correctly ("a stand-in that takes its time").

## Checks (command and exit code)

- `npm test -- tests/invariants/test_local_start_access.py` (from the worktree root): exit 0, `Ran 22 tests in 177.480s`, `OK`.
- The case alone, 15 times in a row, `python -B -m unittest test_local_start_access.LocalStart.test_a_start_on_its_way_up_is_not_taken_for_ended` from `tests/invariants`: 15 runs, each exit 0 (about 8 s each). The same command before the change: 1 run, exit 0, 7.98 s (the failure is rare; this baseline run does not reproduce it).
- `ruff format --config ruff.toml --check tests/invariants/test_local_start_access.py` with the repository's `.runs/quality-venv` (main checkout's): exit 0, "1 file already formatted"; `ruff check --config ruff.toml` on the same file: exit 0, "All checks passed!".
- Not run: the full gate (`npm test` with no argument), by the handoff; `foundation_check.py` and `check_instructions.py` (they are not the slice's *Checks*).

## Own-work check

- Requirement most likely not met: "without changing what any case of the file checks" — that the changed case still catches what it was written for (a start on its way up counted as ended, its directory removed by the next start).
- Check: a mutation in the working tree, `isRunning` in `scripts/local-start.mjs` made to return `false` (so every earlier start counts as ended), then the case alone with `python -B -m unittest ...` from `tests/invariants`. Result: the case **failed** at `self.assertIn(early[0], directories(self.copy))` with `'25320-59211-32f586ccab02b12b' not found in ['22876-59216-af1d91dec0e3dfcd']` (FAILED, failures=1, 5.7 s). The mutation was then reverted with `git checkout -- scripts/local-start.mjs`; the tree was clean after the commit apart from nothing else.
- Second weak point: the hold now begins a few milliseconds later than before (after the bind) and the second start launches after the poll sees the `Loop:` line (poll 20 ms), so the silent window in which the second start probes the first one's silent proxy (up to 2 s) is as wide as before; the 15 passing runs and the mutation failure above are the evidence.

## Walkthrough

The change alters no behaviour a user sees in the running product: it changes a test file only.

## Reach beyond the handoff

- `a note in the author's private notes` and `.ai\rules\git.md` (read on the hook's demand before writing a one-off script and before the commit) — the user's own rules, not part of the handoff.
- `.github/workflows/tests.yml` (a grep for `runs-on`, to know the CI system): `ubuntu-24.04`.

## Working copies

- `.runs/executor-1/` held the three Node probe scripts and the run logs; removed by its full path. None remains. The temporary copies of the tree that the product's test makes by itself (`loop2-invariant-*` in the system's temporary directory) are made by the product's tests and stay outside the rule; five such directories were left in the system temporary directory by earlier runs (mine or other agents' — not told apart) and I did not touch them.

## Unread material

none (every file and range of the handoff was read whole; `guidelines/testing.md` was read in two pages, lines 1-214 and 215-509, so whole).

## Searches not found or unclear

none. One thing is unresolved by evidence, stated above: the CI failure itself was not reproduced here.

## Choices made

- Chose to change the stand-in and the order of the case instead of giving the start a port from the test: the start picks its server port itself and reads no environment value for it (D-431, D-256's rule that no argument or value leads the start elsewhere), so the test cannot give it one, and a change of `scripts/local-start.mjs` was neither needed nor allowed. Rejected: an `error` handler in the stand-in that retries on another port — it would hide the collision, not remove it, and would change the stand-in's role. Cost if wrong: if CI's collision has another source (for example a port taken by another process of the gate between the start's `freePort()` and the stand-in's listen), it can still occur at a much narrower window; the failure line would then name the port, and an entry would go into `tests/flaky-tests.md` (D-432).
- Kept the wait for the `Loop:` line as well as the bind-before-hold: the bind alone shrinks the window to milliseconds; the wait removes it for the second start of this case.
- No invariant's test changed in what it checks; `test_a_start_on_its_way_up_is_not_taken_for_ended` is marked by decision D-256 only.
