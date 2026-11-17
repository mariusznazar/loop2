# Report — executor of slice 18: flaky: the transport refusal under the helper's fixed deadline

**Status:** done with concerns

The failure did not come back. 255 counted runs of the case passed and none failed: 150 runs of the case itself and 105 of an instrumented copy, alone and under five kinds of load. Five more runs of the whole Node stage of the gate, with the copy in place of the file, gave the case no failure either. As the slice gives, **nothing changes**. The case needs the orchestrator's 3 full gate runs under load (task, Acceptance criteria; question 7).

The cause the task guessed was a fixed 5 s deadline under the load of a full run. The evidence does not confirm it as a slowdown spread evenly over the computer. Loads that make the whole case as slow as the failing run made it, or slower, keep every request of the case under 0.9 s. That is far from 5 s. The failing run needed one request held for at least 5 s while the rest of the case took at most 2.7 s. What held that request is not shown (see Cause).

## Files and commits

- No file changed. No commit. The range from the base `4bfc33cd70b9b1b779338c45e1a8ef541d7f2744` is empty.
- `tests/transport.test.mjs`: read whole, unchanged.

## The failure as recorded

The PR names no assertion, so I found the run's log in the committed record of the cycle `raport-z-wyplata` (`git show 286edc50:docs/task-cycles/raport-z-wyplata/gate-correction.log`, lines 1275 and 2532-2537):

```
test at tests\transport.test.mjs:217:1
✖ transport refuses ambiguous proxy metadata before loading live sessions (7678.5268ms)
  Error: HTTP deadline exceeded
      at Timeout._onTimeout (tests/transport.test.mjs:135:32)
```

- 7678 ms is the time of the whole case. The 5000 ms deadline belongs to one request of the helper. So one request was still open 5 s after it began, and everything else in the case (fixture, the other requests, cleanup) took at most about 2.7 s.
- In the same run, other cases of the same process were slower than in the two passing runs of the same tree. I compared them with `gate-correction-rerun.log` and `gate-final.log`:

  | case | failing run | passing runs |
  |---|---|---|
  | "local proxy mode …" | 3669 ms | 1067 / 922 ms |
  | "canonical transport identity …" | 1423 ms | 530 / 612 ms |
  | "transport refuses all four link routes …" | 2017 ms | 1112 / 1417 ms |
  | "refused state-changing requests …" (password work, normally about 4.2 s) | 4221 ms | 4204 / 4220 ms |

  So the slowness was a passing spell at the start of the file, not a load that lasted.
- Tests in other files of that run were also 1–2.5 s slower than in both passing runs, among them five cases of `tests/http.test.mjs`, `tests/account-storage.test.mjs` and the owner command. The whole Node stage took 99 s against 87 and 87 s. The computer had stalls of seconds in that run, in several processes.

## Cause, with its evidence

I measured with an instrumented copy of the test file (`.runs/executor-18/transport-timed.test.mjs`, now removed). It records the wall time of each request of the helper, from `request()` to `end` or `error`, and the time of the fixture. At exit it prints the slowest request (`MAXREQ`) and all of them.

| Conditions | runs | case duration | slowest request of the case |
|---|---|---|---|
| alone | 15 | 232–269 ms | 10 ms |
| under the other Node tests, looping | 30 | 251–995 ms | 64 ms |
| other Node tests + 40 spinning processes | 15 | 2227–3418 ms | 257 ms (`GET /main.js`) |
| 40 spinning node processes (2 per logical CPU) | 10 | 2748–3847 ms | 260 ms (`GET /main.js`) |
| 80 spinning node processes (4 per CPU) | 10 | 5797–9360 ms | 877 ms (`GET /main.js`) |
| 20 processes writing and flushing 1 MiB files and SQLite rows (`synchronous = FULL`) | 15 | 500–4520 ms | 15 ms |
| whole Node stage, the copy in place of the file, nothing else running | 3 rounds | 726–785 ms | 48 ms (round 1) |
| whole Node stage + 40 spinners + 20 disk writers | 1 round + 1 stopped | 7169 / 8319 ms | 300 / 1589 ms |

- **Even load across the computer does not reach the deadline.** Under 80 spinning processes the case takes 5.8–9.4 s, as long as the failing case or longer, and its slowest request is still 0.88 s. Even CPU contention stretches every request by about the same factor. A 5 s deadline is more than five times the slowest request measured under any load I could make.
- **The failing run shows another shape:** one request of at least 5 s inside a case whose other work took at most 2.7 s. That points to a single stall of at least 5 s, of the test's process or of the computer, during one request. It does not point to a general slowdown.
- **Disk load** slows the case (up to 4.5 s), but the time goes to the synchronous SQLite writes and closes outside any request (seed, cleanup). The requests stay at 15 ms or less, because no request of this case writes or reads anything that is not in memory.
- **What held the request is not shown. This is a guess.** One more fact bears on it: on this computer a loopback connection whose SYN goes unanswered is retried after 1, 2 and 4 s (`netsh int tcp show global`: Initial RTO 1000, Max SYN Retransmissions 4). Three lost SYNs in a row would hold a connect for about 7 s. I saw nothing that drops a loopback SYN, and the log does not say which request failed or whether it had connected.

So the guessed cause, "a fixed 5 s deadline under the load of a full run", is not confirmed. As a slowdown spread over the computer it is refuted by the numbers above. As a stall of 5 s or more, it is neither shown nor refuted, because I could not make such a stall happen.

## Checks (each with its command and exit code)

Every series ran from the worktree root. Each run was its own process: `node --test --test-name-pattern="transport refuses ambiguous proxy metadata" <file>` from the loop in `.runs/executor-18/series.sh`, with each run's exit code recorded.

- `npm.cmd run build` → exit 0, once before the series.
- The unchanged case, `tests/transport.test.mjs`, 150 counted runs:
  - alone, 30 runs → **30 passes, 0 failures** (every run exit 0), 217–258 ms
  - under the other Node tests, 30 runs → **30 passes, 0 failures**, 256–308 ms. The load was `node --test` of every `tests/*.test.mjs`, `tests/sim/*.test.mjs` and `tests/view/*.test.mjs` file except this one, at the default concurrency, looping. Its rounds: 61 s exit 0, then 276 s exit 0, the second under 40 spinners as well, 0 failures each.
  - under 40 spinning node processes, 30 runs → **30 passes, 0 failures**, 2527–3938 ms
  - under 80 spinning node processes, 30 runs → **30 passes, 0 failures**, 5247–9569 ms
  - under 20 disk-writing processes, 30 runs → **30 passes, 0 failures**, 522–4139 ms
- The instrumented copy: 105 runs, all exit 0 (table above).
- The whole Node stage with the copy, `node --test <every Node test file but this one> .runs/executor-18/transport-timed.test.mjs`:
  - 3 rounds alone → exit 0 each, 0 failures
  - 1 round under 40 spinners + 20 disk writers → exit 1, 14 failures. None was the helper's deadline: the case passed, and the copy's "refused state-changing requests …" failed on the case's own `test timed out after 20000ms`. Other files failed too, among them `tests/account-api.test.mjs:1221` "reportBrowserFailure posts the three words …" (`2 !== 1`) and `tests/account-mail.test.mjs` "a server that stops answering …". That load is far heavier than any gate run.
  - a second such round, stopped by me after 397 s (exit 127); the case had passed in it.
- `npm.cmd test -- tests/transport.test.mjs` → exit 0, 13 tests, 13 pass, 0 fail.
- `python -B .the-way/elements/common/foundation_check.py` → not run: no `// invariant:` or `// decision:` comment changed.
- Not run, as the method and the handoff give: the full gate (`npm.cmd test` without a file, `gate_times.py`). That is the orchestrator's. The 3 full gate runs under load in the Acceptance criteria are left to it.

Conditions: Windows 11, 20 logical CPUs, 34 GB RAM (15 GB free at the start), Node v24.17.0. Four node.exe processes that are not mine (Playwright MCP) ran throughout, the same four before and after my runs.

## Own-work check

- **Requirement most likely unmet:** "the probable cause the task names is confirmed or refuted by evidence". Counting passes alone would neither confirm nor refute it.
- **Check:** I timed every request of the case under loads that make the whole case at least as slow as in the failing run (80 spinners: 5.8–9.4 s against 7.7 s). Then I compared the slowest request with the 5 s deadline. I also compared the failing run's durations with two passing runs of the same tree.
- **What it showed:** the slowest request under every load stayed at 0.88 s or less, so a slowdown spread evenly does not reach the deadline. The failing run had one request of at least 5 s, inside a case whose other work took at most 2.7 s, during a spell in which several processes of that run were 1–2.5 s slower. The guessed cause is refuted as an even slowdown and is not shown as a stall (Cause).

## Concerns

1. **The failure is not reproduced, and its cause is not established.** The slice gives the outcome for that: nothing changes, and the 3 full gate runs under load decide. If the failure comes back, the log will say no more than this one did.
2. **A recommended follow-up, not made here:** let the helper's deadline error name the request's method and path, the time it took, and whether the socket had connected. For example, `HTTP deadline exceeded: GET /main.js after 5003 ms, connected`. The next occurrence would then show which request stalled and in which phase. That would tell a held connect from a held answer, and settle the SYN guess above. It is a change of the test without a shown cause, so under *Changing an existing test* it needs its own reason. I left it to the orchestrator.
3. **Seen while loading the computer far beyond a gate run:** `tests/account-api.test.mjs:1221` "reportBrowserFailure posts the three words as one JSON POST …" failed once on `2 !== 1` at line 1234, under 40 spinners + 20 disk writers + the whole Node stage. I did not examine it. It is outside this slice and was seen only under that extreme load.

## Choices

- **No change (chosen)** against **raising the helper's deadline**. A longer deadline would hide a stall I could not show, and the slice forbids a change without a shown cause. Cost if wrong: the case stays flaky at the rate it showed, once in the cycle's runs of PR #88.
- **Load kinds:** the other Node tests (the gate's own neighbours), CPU oversubscription (2 and 4 processes per CPU), disk flushes, and the whole Node stage, alone and combined. I did not try memory pressure. With 15 GB free and no sign of paging in the failing log, it was not tried.

## Reaches beyond the handoff

- `gh pr view 88`: the body's lines on this failure ("Checks" and "Findings outside the task's scope" 2), to find the failing run.
- `git show 286edc50:docs/task-cycles/raport-z-wyplata/{gate-correction,gate-correction-rerun,gate-final,base-gate}.log` and `flaky-transport-1..5.log`: the failing run's message, the case's place in it, and the durations of every test against passing runs.
- `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-17-report.md`: the way slice 17 made and counted load, so the series of both slices compare.
- `scripts/test.py`: how the gate's Node stage starts the files (one `node --test`, default concurrency).
- `src/server/passwords.ts`, `src/server/configuration.ts:200-243`, `src/server/database.ts:240-309`, `src/server/app.ts`, `src/server/transport.ts`: whether any work of the case runs in the background or writes during a request. None does: the dummy hash is awaited before the server listens, and no request of the case loads a session.
- `netsh int tcp show global` and `netsh int ipv4 show dynamicport tcp`: the retry timing of a loopback connect (Cause).

## Working copies

All stood in `.runs\executor-18\`. They were the series, load, spinner, disk-writer and stage scripts, the instrumented copy and the script that made it, the comparison script, three logs copied out of commit `286edc50`, and every run's output. The disk writers removed their own directories when stopped. The whole directory was removed before returning.

Every background process I started was stopped and confirmed ended: the test-load loop and the spinners through their stop files, the disk writers through theirs, and the second heavy stage round with TaskStop plus `Stop-Process` of its two remaining node.exe. After that only the four node.exe that are not mine remained.

Two temporary directories that tests of my heavy rounds left in the system temp directory (`loop2-account-http-j2TAbW` from 09:08, `loop2-http-TmYeHM` from 09:02, each holding only a test's SQLite files and keys) were removed. Thirty-one `loop2-deploy-test-*` directories from 07:23–07:24, before this session, are not mine and were left. `git status --short` is empty.

**Unread material:** none. The handoff's passages of the task, D-84, D-49, D-110, account-request-transport, the account-server part, `guidelines/testing.md` (in two reads, lines 1-214 and 215-495) and `guidelines/coding.md` were each read whole, and so was `tests/transport.test.mjs`.

**Searches not found or unclear:**
- Which request of the case exceeded the deadline, and whether it had connected: not in the failing log. The helper's error names neither.
- The conditions of the computer during the failing run (other work running at the same time): not recorded. PR #88 mentions only that an earlier run on the base failed because two installs ran at once.
