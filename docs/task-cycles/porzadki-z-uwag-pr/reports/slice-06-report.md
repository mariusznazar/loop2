# Slice 6 report - `npm run local:stop` tells every start and writes one line for one broken directory

**Status:** done with concerns (the concerns are the mismatches and choices below; none blocks)

## Commits and files

- `a0ddb7d` (range `23f7e43..a0ddb7d`), one commit.
- `scripts/local-start.mjs`: +42 -16
- `tests/invariants/test_local_start_access.py`: +29 -2

## What changed

- (6) `logLine()` no longer lets a failed import of `dist/server/log-line.js` end `stop`. While `stop` works (`keepsWriterLoadFailure`), the first load failure is kept in `writerLoadFailure`, `recordFailure`/`recordReason` write nothing and return, and every start is still told. After `stop()` returns, the top level throws the kept error: Node.js's own print of what nothing handled (D-253, rule "Recording a failure": a script run by hand), once, exit code 1. Outside `stop` (the start path) the load failure still throws as before.
- (7) `stop` remembers the starts it could not tell (`untold`); the loop that writes `START_STILL_RUNNING` skips them. A broken directory leaves the line of `tellToStop` (it carries the original error, as the rule wants) and no second line; the start stays in `left`, so the exit code stays 1.
- (19) `startDirectories()` sorts the directory entries by name (code-unit comparison), so the order `stop` takes them in no longer depends on `readdirSync`. Names that begin with zeros (the planted name) sort before a live process number (first digit 1-9), so the case holds on any file system.
- Test file: `test_a_planted_directory_keeps_stop_from_telling_no_other_start` lost its `assertIn("START_STILL_RUNNING", output)` (see "Changed existing test"); new cases `test_a_directory_stop_cannot_be_told_to_leaves_one_failure_line_with_its_cause` (7) and `test_stop_with_no_built_game_still_tells_every_start_and_leaves_the_missing_writer_once` (6); docstring of `stop_with_a_silent_directory` says the order is the script's.

## Checks (command, exit code)

Tests written first, seen failing on the base (script at `23f7e43`, tests added):
- `cd tests/invariants && python -B -m unittest test_local_start_access.LocalStart.test_a_directory_stop_cannot_be_told_to_leaves_one_failure_line_with_its_cause test_local_start_access.LocalStart.test_stop_with_no_built_game_still_tells_every_start_and_leaves_the_missing_writer_once` -> exit 1, both failed for the expected reason: (7) `2 != 1` failure lines (the `could not tell the start ...` line and the `START_STILL_RUNNING` line); (6) the run ended with Node's uncaught `ERR_MODULE_NOT_FOUND` for `log-line.js` before telling the real start, so no `Local starts stopped` line (the first assertion after exit code 1 that failed was `stopped: 1`).
- Same command after the change -> exit 0 (2 tests OK).

Case of (19) seen failing with the defect it is to catch:
- Defect put in temporarily: `break;` after the `recordFailure` call in the `catch` of the `stop` loop (the loop stopping at its first failure). `cd tests/invariants && python -B -m unittest test_local_start_access.LocalStart.test_a_planted_directory_keeps_stop_from_telling_no_other_start` -> exit 1 (`assertFalse(accepts_connections(...start.port))` failed: `Local starts stopped: 0`, the real start never told).
- Defect taken out (file restored from a copy; `grep -c 'break;' scripts/local-start.mjs` -> 0). Same command -> exit 0.

Slice check:
- `npm test -- tests/invariants/test_local_start_access.py` -> exit 0 (18 tests OK, 157 s).
- `npx prettier --check scripts/local-start.mjs` -> exit 0; `npx eslint scripts/local-start.mjs` -> exit 0.
- Not run: ruff on the test file (`python -m ruff` is not installed on this computer); the full gate (`npm test` without arguments, as the cycle's run, not mine).

## Own-work check

- Requirement most likely not met: item 6/7 together - with no built game and one broken directory, every other start is told, the exit code is 1, and the missing writer shows once (not zero, not twice), while with a built game the broken directory leaves exactly one failure line that keeps the original error code.
- Checks: the two new cases above (the first asserts `len(failure lines) == 1`, its `code == "EEXIST"`, exit code 1; the second asserts exit 1, `stopped: 1`, the real start's port closed, `Cannot find module` appears once). Run: pass.
- Mutations thought through: dropping `untold.includes` fails (7); dropping `keepsWriterLoadFailure` fails (6) (base behaviour); dropping the final `throw writerLoadFailure` fails (6) (count 0); the `break` defect fails the (19) case. Not caught by any deterministic test: removing the sort in `startDirectories` (on Windows/NTFS the listing is already sorted; on a file system that lists in hash order the (19) case becomes flaky again, which is the problem item 19 names). A test for it would need control over `readdir` order, which the test cannot have.
- Trust boundary (`scripts/local-start.mjs`): a crafted input is a planted directory name or content. The name still has to pass `startDirectoryName`; sorting touches names only after that match; the `stop` file as a planted directory or symlink is refused as before (case `test_stop_writes_through_no_planted_link` passes).

## Changed existing test (named)

`test_a_planted_directory_keeps_stop_from_telling_no_other_start`: removed `assertIn("START_STILL_RUNNING", output)`. Reason: task item 7 and D-252 ("once, with the cause") - a start that could not be told no longer leaves that line; the case still asserts exit code 1 and that the real start stopped. The new case asserts the one line positively.

## Choices (way rejected, cost if wrong)

1. Which line stays for the broken directory: the line of `tellToStop` (has the original error). Rejected: keeping `START_STILL_RUNNING` (a `ReasonedFailure` with no cause, against "with the cause"). Cost if wrong: the operator would want the "did not stop" wording; swapping the two lines is a few lines.
2. Writer missing: no JSON line for the individual failures (the broken directory's line is lost in that case); only Node's print of the load error, once, after the stops. Rejected: writing a hand-made JSON line from the script (duplicates the writer's field rules, and D-253 gives a script run by hand the default print); `console.error(error)` at once (output has several occurrences of the code, hard to count, and not "default print"). Cost if wrong: a reader of the log in this rare case sees one Node error and no line for the broken directory.
3. (19) fixed in the script (sort), not in the test. Rejected: making the case independent of order (cannot be done for the "planted listed first" order the defect needs). Cost if wrong: none for behaviour; sort is a few lines.
4. Deferral limited to `stop` (flag `keepsWriterLoadFailure`); start path unchanged. Rejected: deferring everywhere (a successful start would swallow or crash on a missing writer in `removeEndedStarts`). Cost: the flag is module state.
5. Test (6) counts `Cannot find module` (Node's message text) to say "once"; the code `ERR_MODULE_NOT_FOUND` appears twice in one print. Cost if wrong: a Node version that words the message differently fails the case (a deliberate-decision text, not a bug); the count would need a different token.

## Mismatches of the plan with the code

- Plan (19): the defect "put in temporarily with the planted directory listed after the real start" cannot make the case fail: a loop that stops at the first failure fails only when the planted directory is listed before the real start (as the case's name and `planted_name` have it). I ran the defect with the planted directory first. Small mismatch, noted here.
- Line numbers in the plan/task (`:392`-`:395`, `:406`-`:410`, `:282`) matched the base; the foundation step moved no line in these two files.
- Handoff text names `npm test` without arguments nowhere in my instructions to run; I ran only the focused file.

## Reach beyond the handoff

- `git diff`/`git log`, `package.json` (`local`, `local:stop` scripts), `ruff.toml` head, `scripts/test.py` head: to see how the focused command runs and what the lint settings are. No foundation entry or task passage beyond the handoff was needed.

## Searches not found or unclear

- `python -m ruff` is not installed here, so the test file was not linted with ruff 0.17.1 (the product's pinned version); the quality gate will do it.
- The plan says "recorded once, as the rule ... and D-253 give a script run by hand": read as Node's default print of an unhandled error (uncaught throw after the work). The text does not say whether the original failure line (broken directory) should also be written somehow when no writer exists; I read it as impossible and unrecorded.
- foundation `invariants.md` `local-start-access` names only headers and listening addresses; none of the new behaviour falls under it, so no invariant test changed.
