# Author report — testy-padajace-losowo

**Status:** done

Commits on `task/testy-padajace-losowo` (base `659b1e0255cd66d4768469191f408d9d266081a3`):

- `5206fd2d` docs: record D-432, the register `tests/flaky-tests.md` with its four entries, the sentence in the rule on flaky tests of `guidelines/testing.md`, the row in the part map.
- `4cf96da1` test: the limit of 5 s in the variant "logs *" of the watcher test, and the method and path in the error of the transport helper.

## Files changed (added / removed lines)

- `tests/deploy/test_loop2_watch.py` (+4 / -2): variant "logs *" of `TheDockerCommands.test_a_docker_that_never_answers_is_cut_off_and_read_as_down` runs with `DOCKER_WAIT_SECONDS="5"`; variant "inspect *" keeps 1; `KILL_WAIT_SECONDS` stays 1; the test and its `decision:` line are otherwise as they were; `deploy/loop2-watch` unchanged.
- `tests/transport.test.mjs` (+4 / -1): the error of the timer of `send` reads `` `HTTP deadline exceeded: ${method} ${path}` ``.
- `tests/flaky-tests.md` (+80, new): the register, in Polish, with the common rule and four entries.
- `guidelines/testing.md` (+3 / -2): chapter *Flaky tests*: one sentence naming the register, *Decision* `D-73 · D-432`, and `tests/flaky-tests.md` in *Where in code*.
- `foundations/decisions.md` (+15): D-432, at the end of the section *Testing discipline*.
- `foundations/part_map.md` (+1): `tests/flaky-tests.md` in *Files* of `agent-workflow`.

## Checks (command, exit code)

One line: nothing failed; not run: the full gate (the orchestrator's), Ruff and ShellCheck (no `.runs/quality-venv` made, so the quality tests did not run).

- Before (old limit of 1 s, test unchanged), series of 10 runs under the load, each its own process: 6 failed with `Lists differ: [ ['loop2_gra_nie_dziala'] ] != []`, 4 passed (`bash series.sh before 10 …`, below).
- After, `bash series.sh after5 30 …` under the same load: exit 0, 30 passed, 0 failed.
- `npm test -- tests/deploy/test_loop2_watch.py` → exit 0, `Ran 99 tests in 224.572s`, `OK` (no load).
- `npm test -- tests/transport.test.mjs` → exit 0, 13 pass, 0 fail.
- `node node_modules/prettier/bin/prettier.cjs --check tests/transport.test.mjs` → exit 0. `node node_modules/eslint/bin/eslint.js tests/transport.test.mjs` → exit 0.
- `python -B .the-way/elements/common/foundation_check.py` → exit 0, `0 errors` (after the first commit and after the second).
- `python -B .the-way/instruction-files/check_instructions.py` → exit 0, `0 error, 145 warn, 7 info`; the four warnings that name `guidelines/testing.md` are dead paths of lines 282–286 (Mutation testing), which my change does not touch; none names `tests/flaky-tests.md`.
- Mutation of the test: `WAIT=200 python -B run_case.py … <the case>` (the `logs *` limit raised to 200 s, so the hang is not cut) → exit 1, `AssertionError: the run did not end within 45 s; its processes were stopped`. So the variant still fails when `docker logs` is not cut off.
- Transport helper: with the timer set to 1 ms for a moment, `npm test -- tests/transport.test.mjs` → exit 1 with messages such as `HTTP deadline exceeded: GET /api/account`, `… POST /api/logout`, `… PUT /api/saved-game`; the 5000 ms was restored (`cmp` with the saved copy equal) before the commit.

## The load and the measured series

The load of executor 19, written to its description (the scripts are not in the repository): 6 loops, each running one after another the whole files `tests/deploy/test_loop2_watch.py`, `tests/deploy/test_loop2_backup.py`, `tests/invariants/test_account_save_backup_failure_notice.py`, `tests/deploy/test_loop2_watch_message.py`, and 40 spinning node processes (20 logical processors, 2 each). Each series run is one `python -B run_case.py` process, one run of the whole test case (two variants, each a priming run and a measured run of the script: four script runs). Windows 11, 20 logical processors, Node v24.17.0, Python 3.14.3. Every script run was timed (`WatchFixture.run` wrapped); the fourth is the run of the "logs *" variant.

| Limit of the "logs *" variant | Series | Runs | Passed | Failed | Longest single script run (limit of one is 45 s) | Case, seconds per run |
|---|---|---|---|---|---|---|
| 1 s (before, as the file was) | `before` | 10 | 4 | 6, each `Lists differ: [ ['loop2_gra_nie_dziala'] ] != []` | 25.33 s | 88–109 |
| 2 s (scan, `WAIT=2`) | `scan2` | 8 | 8 | 0 | 22.58 s | 86–102 |
| 3 s (scan, `WAIT=3`) | `scan3` | 8 | 8 | 0 | 25.08 s | 86–103 |
| **5 s (chosen)** | `after5` | **30** | **30** | **0** | **26.83 s** (the run of the "logs *" variant itself; 18 s under the 45 s limit) | 89–105 |

Reading: at 1 s a `docker inspect` stand-in is cut off in 6 of 10 runs under this load; at 2 s and 3 s none in 8; so the longest answer of an `inspect` stand-in under it lies between 1 s and 2 s (a reading of the pass counts, not a direct measurement of the answer time). 5 s is more than twice the lowest limit that passed, and costs 4 s over the limit of 1 s in the one run that hangs (26.83 s against 25.33 s at the extremes); no run came near the 45 s limit. The scan series (8 runs) are fewer than 30 on purpose; only the series of 5 s is the acceptance criterion.

Load stopped: both loads end by a stop file; every loop and every spinner reported its end (`file loops ended`, `spinners ended`). Count of `node` processes: 6 before I started, 46 during, 4 after; of `python`: 2 before, 8 during, 2 after. Four fewer than before are node processes of other sessions that ended meanwhile; none of mine remains. Whole-file loops ended with `loop n: 3 file runs, 1 not ok` in five of six loops (and `0 not ok` in one); I did not keep which file failed, so I do not know whether one of them was the changed case; whole-file runs under this load fail at times (executor 19 saw the same), and the acceptance criterion is the series of the case.

The series logs, the per-run script times and the scripts of the load are kept in `reports/author-load-series/` (`before.log`, `after5.log`, `scan2.log`, `scan3.log`, `*-script-runs.txt`, `spin.mjs`, `spinners.sh`, `fileload.sh`, `series.sh`, `scan.sh`, `run_case.py`).

## Own-work check (section 3)

- **Requirement most likely unmet:** the acceptance criterion — all 30 runs pass under the load of executor 19, and none reaches the 45 s limit.
- **Check:** the series `after5` above (30 separate runs, counted), with each script run timed; and the same case at the old limit (`before`) to see that the load does produce the failure.
- **Result:** 30 of 30 passed; the longest script run was 26.83 s. The failure at 1 s was reproduced in 6 of 10 runs. A second requirement, that the variant still cuts a hanging `docker logs`, was checked by the mutation above (fails at the 45 s limit when not cut).

## Foundation entries (foundation step)

Search of the whole foundation (WAY-33): searched `foundations/*.md` for `flak`, `losow` and `rejestr`/`register`; the only hits were unrelated words (`player-self-registration`, `registration`). No decision answers where the knowledge of a test that fails at random stands; D-73 (rule of the guidelines and its `violates` line on a rule kept in another file than `guidelines/testing.md`) and D-82 (no comment points to a document outside the foundation) neither collide nor answer it. No glossary term or invariant is touched; the register uses no word in another meaning than the glossary gives.

1. **D-432** — marked `row 1`.
   - English: a test that fails at random, with no cause found and no change of the code behind it, has an entry in the register `tests/flaky-tests.md`, in Polish, with the test's name, what was tried with numbers and conditions, and what to look at; the entry leaves the register in the change that explains the cause.
   - Polski: test padający losowo, bez ustalonej przyczyny i bez zmiany kodu, który go dotyczy, ma wpis w rejestrze `tests/flaky-tests.md`, po polsku, z nazwą testu, tym co próbowano (z liczbami i warunkami) i tym, na co patrzeć; wpis znika w zmianie, która wyjaśnia przyczynę.
   - *Relations:* `derives from D-73` (the task says it follows D-73 and is no departure; the list of departures of D-73 is unchanged). *Based on:* `none`. *Verification:* a pair of examples only (a register of prose gets no test). *Rejected:* the five ways of the task's *Questions to settle* (the chapter of the guidelines as the list, a comment at each test, only git history, a plain note in the author's private notes, the register in the directory of the guidelines, and the register in English), each with the reason the task keeps. *Rationale* names no file and no count, as the template asks.
2. **Part map, `agent-workflow`, *Files*: `tests/flaky-tests.md`** — marked `row 1` (the task's point 3 asks for it as a consequence of the register).
   - English: the register file belongs to the part that directs and records the work of the repository.
   - Polski: plik rejestru należy do części, która kieruje pracą nad repozytorium i ją zapisuje.
   - The sentence of the part is unchanged: a register of what was tried on a failing test is a record of the work done on the repository, which its sentence already says. The row was written by following `the-way-update-part-map`'s `SKILL.md` as a file (step 2: no existing entry for a part of its kind, so a change to `agent-workflow`; step 4: no other entry names a file pattern).
3. **`guidelines/testing.md`, chapter *Flaky tests*** — a rule of a discipline, not an entry (point 5 of the task); *Decision* now `D-73 · D-432`, the sentence names the register, `tests/flaky-tests.md` is listed in *Where in code*. No new rule with *Decision* `none` is added, so nothing needs a row of acceptance of its own.
   - English: a test that fails at random with no established cause gets an entry in the register, which leaves when the cause is explained.
   - Polski: test padający losowo bez ustalonej przyczyny dostaje wpis w rejestrze, który znika, gdy przyczyna się wyjaśni.
   - Marked: `row 1`.

I changed `guidelines/testing.md` after reading `.the-way/product-guidelines/testing/SKILL.md` and `.the-way/product-guidelines/template.md` and `testing/template.md` (the section on the *Flaky tests* rule) as the handoff names: the SKILL gives that the cycle's author writes this file and the changes to the part map, in the foundation step, from the task document.

## Choices (with the way rejected and its cost if wrong)

- **Limit of 5 s for "logs *"**, the variant "inspect *" kept at 1 s. Rejected: 2 s or 3 s (passed 8 of 8 each, but only 1 s under the margin of the one value seen to fail; cost if wrong: the failure comes back under a heavier load); 8 s or more (the run of the hang grows past 30 s under this load, near the 45 s limit; cost if wrong: `RUN_TIMEOUT` is reached before the hang is cut). The value was chosen by the numbers above.
- **A tuple of (pattern, limit) in the test** rather than a branch on the pattern inside the loop. Rejected: a second test for "logs *" (it would duplicate the preparation and split a behaviour of one name).
- **One comment** in the test, of the form the neighbours use (`# The break: …`), stating that one limit covers `inspect` and `logs`. It carries information the code needs (why the two variants differ) that no foundation entry says; D-356 does not give it. If the reviewer reads this as a comment D-82 asks to move into the foundation, the cost is a single comment line.
- **The common rule of the register and the "where the numbers come from" section** are in the register; the register's own wording of the common conditions says "each test in a part of them", because the task's *Context* gives one list of conditions for all, while the reports of the earlier cycle give different ones per test (see *Searches*).
- **The size rule of D-425** (function limit of 200 lines reaches tests): the changed test function is 15 lines, the helper `fixture` of `transport.test.mjs` is far under 200 lines; no function over the threshold was changed, so no move-out commit was needed (section 1 of `make-change`).

## Reaches beyond the handoff (what, where, why)

- `git show 28ab60c9:docs/task-cycles/luki-w-testach-z-przegladu/reports/executor-18-report.md` (first 80 lines) and `executor-20-report.md` (first 90 lines), `executor-19-report.md` whole: the handoff permits reading the earlier reports for a fact the *Context* leaves open. I used from them only: the five conditions of the transport test (executor 18: alone; under the other Node tests in a loop; 40 spinners; 80 spinners; 20 disk-writing processes), which stand in the register, named as quoted from that report.
- `.the-way/elements/decisions/skill/{read,decide_entry}.md`, `decisions/template.md`, `common/way_of_working.md`, `common/rules.md`, `part-map/template.md`, `part-map/skill/{decide_entry,write}.md`, `product-guidelines/template.md`, `testing/template.md` (lines 1–60 and the grep of *Flaky tests*): named by the `SKILL.md` files of the elements that the foundation step requires.
- `deploy/loop2-watch` (the lines of `DOCKER_WAIT_SECONDS` and the three `timeout` calls) and `tests/deploy/backup_script_support.py` (`RUN_TIMEOUT`, `HANG_SECONDS`): the handoff names them.
- `scripts/test.py` (first 80 lines): to give my runner the same import paths as the focused run.
- `~\.claude`-side rule files `scripts.md` and `git.md` of the author's instructions: read as the instructions require before a script and a commit.

## Unread material

- `tests/deploy/test_loop2_watch.py`: read lines 1–200 and 1100–1280 (the case, the fixtures and the neighbours), not the rest of the file (1380 lines); the changed function stands in the part read, and the whole file ran green (99 tests).
- `tests/transport.test.mjs`: read lines 60–190, not the rest; the whole file ran green (13 tests).
- `foundations/decisions.md`: read whole D-73 to D-85 (one range), D-422, D-425, D-426 and D-356. The index at `.runs/task-cycles/testy-padajace-losowo/index.md` was read as the first 60 lines only; I did not open the other decisions of the parts deployment, account-server and product-foundation that it lists.
- `guidelines/testing.md` and `guidelines/coding.md`: read whole.
- `foundations/part_map.md`: read whole.
- `.the-way/task-cycle/change/SKILL.md`, `.the-way/task-cycle/skill/foundation_step.md`, `.the-way/product-guidelines/testing/SKILL.md`, both element `SKILL.md` files: read whole.

## Searches not found or unclear

- The *Context* of the task lists "common conditions of the trials of the earlier cycle" as one list; the reports give different conditions per test (the transport test: alone, under other Node tests, 40 and 80 spinners, 20 disk writers; the watcher window test: alone, 40 spinners, 24 loops of starts, 6 loops of whole files, the last two together; the backup signal test: alone, 40 spinners, 6 file loops with 4 signal loops). I kept the list in the register as "each test in a part of them" and gave the transport test's five conditions from the report. A reviewer of the register may want the other two entries' conditions named the same way; the *Context* gives them only as "five conditions" and "30 alone, 30 under…", which the entries carry.
- Which test files failed in the whole-file loops of my load (five of six loops had one file run "not ok"): the output of those runs was not kept, so not established.
- The glossary has no entry for "rejestr"/"register" as a word; the search found none that the register would use in another meaning.

## Problems observed

- `npm ci` in the worktree, started while the load ran, took over 35 minutes (it stood at 268 of the modules for most of that time) and the `npm test -- tests/transport.test.mjs` run under the load did not get past the build for over an hour; both finished once the load ended or at the end of it. This is an observation of how the load starves other work, not a finding about the product.

## Working copies

All my working copies stood in `.runs/author/` of the worktree (`.runs/author`): the scripts of the load, the runner, every run's output and a saved copy of `tests/transport.test.mjs`. The directory was removed before returning; the series logs and the scripts needed by this report were first copied into `reports/author-load-series/` beside this report. The worktree's `node_modules` (from `npm ci`, an ignored install the handoff asked me to make) stays. No worktree or clone was made.
