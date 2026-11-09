PASS a0ddb7d

# Review of Slice 6 - `npm run local:stop` tells every start and writes one line for one broken directory

Range `23f7e43..a0ddb7d` (one commit), worktree `the root of the repository`, `git rev-parse HEAD` = `a0ddb7d3fc324902083d7a74a81e5b3357798f84`, `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96` (confirmed). Slice review: `fix.md` and `whole_change.md` not used.

Counts: blocking 0, Minor 4 (all in scope), out of scope 0.

Changed invariant test: none. `tests/invariants/test_local_start_access.py` is the file of the invariant `local-start-access`, but the two new cases and the changed case (`test_a_planted_directory_keeps_stop_from_telling_no_other_start`) carry no `# invariant:` mark, and the invariant's method cases (`test_no_proxy_header_of_a_browser_reaches_the_server`, `test_both_ports_listen_on_this_computer_alone`) are untouched. The one assertion removed from an existing case is named under "Test changes" below.

## Findings

### Blocking

None.

### Minor (all inside the task's scope)

**M1 - With no built game, the failure of the broken directory itself leaves no line.**
Place: `scripts/local-start.mjs:89-97` (`recordFailure`/`recordReason` return at `log?.`), `:455`.
What: when `dist/server/log-line.js` is absent, `recordFailure("could not tell the start ...")` writes nothing; the only text is Node's print of the load error, which names the missing module. A person reading it learns the game is not built, exit 1, and `Local starts stopped: N`, but not which start could not be told or with what code (the EEXIST of the base's first line is gone in this one situation). This is what the plan and the executor's choice 2 call for ("the failure to load the writer is itself recorded once ... and stops nothing"), and the base wrote no line at all there (it crashed before telling anyone), so nothing that was written is lost. The cost: a rare, unbuilt-game case shows the cause of the missing writer only. The default print is what D-253 and the rule "Recording a failure" give a script that touches no account data (the stop path touches none), so this is not a departure; the finding is only that the broken directory is counted (`stopped` lower, exit 1) but not named.
Evidence: matrix run below, `a0ddb7d-nobuilt-planted-*`: stderr is only the 18-line `ERR_MODULE_NOT_FOUND` print.

**M2 - Case (6) counts Node's English message text.**
Place: `tests/invariants/test_local_start_access.py` (new case `test_stop_with_no_built_game_still_tells_every_start_and_leaves_the_missing_writer_once`, last assertion `output.count("Cannot find module"), 1`).
What: "once" is judged by the wording of Node's error message, which `guidelines/testing.md` "Behaviour, not implementation" says not to pin ("dokładnego tekstu odmowy"). The executor disclosed this. A Node release that words it differently fails the case with no defect in the product. The code `ERR_MODULE_NOT_FOUND` appears twice in one print, so it is no easy substitute; a count of the `node:internal` header line or of `Node.js v` would be steadier.
Evidence: the print seen in the matrix run shows `Cannot find module` once and `ERR_MODULE_NOT_FOUND` twice.

**M3 - Nothing protects the sort in `startDirectories` on a file system that already lists in name order.**
Place: `scripts/local-start.mjs:294-298`; test `test_a_planted_directory_keeps_stop_from_telling_no_other_start`.
What: item 19 asked that the case not depend on the listing order. The slice fixes the order in the script (an allowed choice), and the sort itself is correct (see question 3 below), but no test fails when the sort is removed on NTFS (and on any system that lists sorted), so a later removal returns the old flakiness on a hash-ordered file system without any red test. The executor named this ("Not caught by any deterministic test"). A cheap partial guard exists: two planted directories whose failure lines must appear in name order would fail on a hash-ordered listing, though not on NTFS.
Evidence: executor's own-work check; the case passes with or without the sort on this computer by construction.

**M4 - The flag `keepsWriterLoadFailure` and `writerLoadFailure` are module state read in three places.**
Place: `scripts/local-start.mjs:72-87`, `:404`, `:455`.
What: a coupling between `stop()` and `logLine()` through two module variables; correct as written (the start path never sets the flag, so a load failure there still throws as on the base), but a later caller of `logLine` inside another command would silently inherit the deferral if it ran after `stop`. Today only one command runs per process. Polish only.

## Questions of risk the orchestrator asked

Method: a scratch harness (Python, outside the product, files under `.runs/review-slice-06/`, removed afterwards) built for each of `23f7e43` and `a0ddb7d` a tree holding that version of `scripts/local-start.mjs`, a stand-in `dist/server/main.js`, and (when "built") a copy of the built `dist/server/log-line.js`; a real start was run from it, and a planted directory `0000<pid>-<silent port>-abcdefabcdefabcd/stop` (stop file a directory, port a listener that accepts and stays silent). Then `node scripts/local-start.mjs --stop` was run.

1. Matrix (game built | not built) x (broken dir | none) x (real start | none). Exit code / `Local starts stopped` / failure lines on stderr:

| game | broken dir | real start | base `23f7e43` | head `a0ddb7d` |
|---|---|---|---|---|
| built | yes | yes | exit 1, stopped 1, **2 lines** (`could not tell ... EEXIST`, `START_STILL_RUNNING`), real start stopped | exit 1, stopped 1, **1 line** (`could not tell ... EEXIST`), real start stopped |
| built | yes | no | exit 1, stopped 0, 2 lines | exit 1, stopped 0, 1 line |
| built | no | yes | exit 0, stopped 1, 0 lines | same |
| built | no | no | exit 0, stopped 0, 0 lines | same |
| not built | yes | yes | exit 1, no stdout, Node print of `ERR_MODULE_NOT_FOUND`, **real start still running** (the defect of item 6) | exit 1, stopped 1, one Node print, real start stopped |
| not built | yes | no | exit 1, no stdout, one Node print | exit 1, stopped 0, one Node print |
| not built | no | yes | exit 0, stopped 1, 0 lines | same |
| not built | no | no | exit 0, stopped 0, 0 lines | same |

A start that did not stop still gives exit 1 in every combination (the planted start stays in `left`; the exit code comes from `left.length`).

2. The single remaining line is the line of `tellToStop`: `{"failure":"could not tell the start <name> to stop","kind":"Error","code":"EEXIST","place":"local-start.stop"}`. It carries kind, code and place, no path, no token, no address; the start's name (process number, port, certificate mark) is in the sentence as on the base. The `START_STILL_RUNNING` line (a `ReasonedFailure` without an original error) is the one dropped, which agrees with "with the cause" (D-252, rule "Recording a failure").

3. Sort comparison: `a.name < b.name ? -1 : a.name > b.name ? 1 : 0`, JavaScript string comparison by UTF-16 code unit, not `localeCompare`, so it does not depend on the platform's locale. Names that pass `startDirectoryName` are ASCII (`\d{1,10}-\d{1,5}-[0-9a-f]{16}`); the sort runs before that filter, so a non-matching name is compared too but is dropped afterwards. The planted name starts `0000` and a live process number starts 1-9 (and has no leading zeros), so the planted directory sorts first on every platform. Inverse check: the temporary defect `break;` after `recordFailure` in the catch of the loop of `stop`, run on a copy of the head script: with the sort as written, `Local starts stopped: 0`, exit 1, real start still running (the case would fail); with the comparator reversed (planted listed after the real start), `Local starts stopped: 1`, real start stopped (the defect is not caught). So the case fails for the loop stopping at the first failure, and only when the planted directory comes first; the executor's note that the plan's "listed after the real start" cannot make the defect visible is correct. The case cannot pass because the loop continues by accident: `assertFalse(accepts_connections(real start))` needs the real start told and ended; and the planted directory is the sole other candidate. The harness defect was only in scratch copies; no defect was put into the reviewed worktree.

4. Missing writer: `logLine()` catches the import error only while `keepsWriterLoadFailure` is set (during `stop`), keeps the first as `writerLoadFailure`, returns `undefined`; `recordFailure`/`recordReason` then write nothing; after `stop()` returns, the top level throws the kept error, which Node prints once and ends the process with exit 1. That is Node's default print, as D-253 gives a script that touches no account data, and the rule "Recording a failure" repeats it; it falls short only in what it does not say about the individual broken directory (M1). The print quotes the absolute path of the missing module (18 lines); D-253's limit on quoting values applies to processes that touch accounts, which this path does not.

5. Proxy, `local-start-access`, TLS: the diff touches only `logLine`, `recordFailure`, `recordReason`, `startDirectories`, `stop`, and the closing statements and one header comment. `proxyRequest`, `upstreamHeaders`, `isProxyHeader`, `showsItsCertificate`, `makeCertificate`, `start()` and listening addresses are unchanged (diff read in full). `proxyRequest` still calls `recordFailure` in a start, where the load failure still throws as on the base. The invariant's cases passed (below).

## Against the task, foundation, guidelines

- Item 6: met (matrix rows "not built"). Item 7: met (rows "built" with a broken directory). Item 19: met by the sort; M3 notes what it does not protect.
- Acceptance criterion "each test of items 11-19 seen failing on code with the defect": the new cases were run by the executor on the base (claimed; I confirmed the base behaviours independently by the matrix, base rows give 2 lines and a running real start). The (19) case: defect shown failing in my scratch run above, and the executor's report names command and exit code.
- D-252/D-253/D-354 and "Recording a failure" / "Hiding a failure": one line per failure with the cause; no failure turned into success (exit code kept); the writer's absence is surfaced by Node's print. D-255/D-256/D-258: unaffected. `local-start-access`: no departure.
- Trust boundary (`scripts/local-start.mjs`): the planted-name input still passes `startDirectoryName` before any use; `tellToStop` unchanged (`wx` flag, refuses links and directories; `test_stop_writes_through_no_planted_link` passes); the sort reads names only.
- Guidelines `coding.md`: English code and comments, comment states the present, no lint silencing; prettier and eslint pass. `testing.md` "Changing an existing test": see below. "Behaviour, not implementation": M2.
- No reserved choice taken (no new library or store). No glossary or foundation entry written by this change.

## Test changes

- `test_a_planted_directory_keeps_stop_from_telling_no_other_start`: the assertion `assertIn("START_STILL_RUNNING", output)` was removed. Reason and source: task item 7 and D-252 ("raz, z przyczyną"); the line is no longer written for a start that could not be told, and the case keeps `code == 1` and the real start's port closed. The new case asserts the single line positively. Accepted under "Changing an existing test" (the reason lies in the requirement, with its source cited).
- Two new cases (items 7 and 6), the docstring of `stop_with_a_silent_directory` updated.

## Declined to judge

- Whether the unbuilt-game case should also write a hand-made JSON line for the broken directory: outside the plan's settled choice; named as M1 only.
- Ruff on the test file: not installed on this computer; left to the gate.
- The full gate (`npm test` with no argument): the cycle's own run.

## Checks run (command, exit code)

- `git rev-parse HEAD` -> `a0ddb7d3fc324902083d7a74a81e5b3357798f84`; `git -C .the-way rev-parse HEAD` -> `294af7fde45323ac1851c014a03071a97fc38d96`.
- Scratch matrix, 16 runs of `node scripts/local-start.mjs --stop` (base and head, 8 combinations each), harness `scratchpad\matrix.py`, exit 0; results in the table above.
- Scratch defect runs, 2 runs on copies of the head script (`break;` with the sorted order, then with the comparator reversed), harness `scratchpad\defect.py`, exit 0; results under question 3.
- `npm test -- tests/invariants/test_local_start_access.py` in the worktree -> exit 0, `Ran 18 tests in 156.946s OK`.
- `npx prettier --check scripts/local-start.mjs` -> exit 0; `npx eslint scripts/local-start.mjs` -> exit 0.
- `git status --short` in the worktree after all runs -> empty. The scratch directory `.runs/review-slice-06` was created by me and removed again; no edit to the product was made, none left.

Not run: ruff (not installed here), full `npm test`, a run of the new cases on the base (taken from the executor's report; the matrix reproduces both base behaviours independently), the executor's own `break` defect in the worktree (reproduced in scratch copies instead, to keep the worktree unchanged).

## Reach beyond the handoff

- `foundations/decisions.md` D-253 passage was already in the handoff; I additionally read D-257 (lines 5284-5304) only as part of the contiguous range I printed (5230-5330), not otherwise used.
- `tests/invariants/test_local_start_access.py` lines 1-260 and 330-440 (whole new and changed cases, `Start`, `planted_name`, `write_stand_in`): to judge whether the cases fail for the defect and what the copy holds.
- `git show 23f7e43:scripts/local-start.mjs` (base script) and `dist/server/log-line.js` of the worktree (copied into scratch trees): to run the base/head matrix.

## Searches not found or unclear

- The handoff's "recorded once, as the rule ... and D-253 give": it does not say whether the broken directory's own failure should still appear somewhere when no writer exists; I took the plan as settling that (M1, Minor).
- `local-start-access` in `foundations/invariants.md` names headers and listening addresses only; no passage ties the stop path to it; none found.
