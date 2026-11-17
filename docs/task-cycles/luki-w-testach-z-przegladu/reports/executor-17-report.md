# Report — executor of slice 17: flaky: the mailer's shortened deadline

**Status:** done with concerns

## Files and commits

- `tests/account-mail.test.mjs` — +7 −2 (the case's deadline 300 → 1500 ms and its comment)
- `src/server/account-mail.ts` — unchanged (the cause does not lie there; see Cause)
- Commit (range from base `8ac7ca4e2134bd3720eb2fb38a4b8bef45f9147f`):
  - `4bfc33cd70b9b1b779338c45e1a8ef541d7f2744` test: :bug: give the case of a server that stops answering a deadline of 1.5 s instead of 300 ms, ...

## Cause, with its evidence

**What fails:** the case's precondition `assert.equal(smtp.record.heldAnswers.length, 1, "precondition: the server held its answer")` — `AssertionError [ERR_ASSERTION]: precondition: the server held its answer / 0 !== 1` (at `tests/account-mail.test.mjs:372` before the change). The mailer itself does what it should: its deadline fires at ~300 ms, it writes the `DEADLINE` line and returns `failed`.

**Why:** the mailer's deadline runs from the start of `send()`, and the case needs the whole way to the held answer — TCP connect, greeting, EHLO, STARTTLS, TLS handshake, EHLO, AUTH, MAIL, RCPT, DATA and the message — to finish inside it. Two facts make that way long and load-dependent:

1. `smtp-server` 3.21.1 waits a fixed 100 ms after accepting a connection before it greets (`node_modules/smtp-server/dist/cjs/smtp-connection.js:452`, `setTimeout(() => this.connectionReady(), 100)`, "a small delay for detecting early talkers"), then does a reverse DNS lookup (lines 526-559, timeout 1500 ms) before `onConnect`.
2. The client (the mailer) and the server both run in the test's own process, so any stall of that process's event loop — a busy computer — delays the server's side of the exchange, while the deadline counts wall time.

**Measured** (an instrumented copy of the test file recording, relative to the start of the send, the server's `onConnect`, `onAuth`, the end of the message's data and the moment `send` resolved; the copy stood in `.runs/executor-17/`):

| Conditions | server's connect | data end (held answer) | send resolved |
|---|---|---|---|
| alone, 15 runs | 108-118 ms | 128-137 ms | 302-317 ms |
| under the load of the other Node tests (`node --test` of every other test file, default concurrency, looping), 15 runs | 113-163 ms | 144-226 ms | 301-329 ms |
| at the start of that load (both started at the same moment, as the gate's Node stage starts its files), whole file, 10 runs | 109-127 ms | 141-196 ms | 303-322 ms |
| 40 spinning node processes (2 per logical CPU; 20 logical CPUs), deadline 2900 ms, 10 runs | 229-256 ms | 345-379 ms | 2955-2975 ms |
| 80 spinning node processes (4 per CPU), deadline 2900 ms, 10 runs | 316-484 ms | 534-740 ms | 2914-3100 ms |

So the margin of the 300 ms deadline is ~165 ms on an idle computer, ~75 ms under the other Node tests, and negative with the computer oversubscribed. Reverse lookup of 127.0.0.1 measured 0-1 ms in 20 calls (`dns.reverse`, resolver 192.168.1.1), so it is not what eats the margin here.

**Reproductions that fail on purpose:**

- *Process stall* — the instrumented copy with the process held busy for N ms right after `send()` starts (a busy loop between `mailer.send(...)` and the `await`), deadline 300 ms, 3 runs each: N = 0, 100, 150 → 3/3 pass (data end 128-139, 237-251, 288-296 ms); N = 200, 250 → 3/3 fail each, on `precondition: the server held its answer` `0 !== 1`, with no `onConnect` at all (the client closed before the server's 100 ms timer let it greet).
- *Real case under load* — the unchanged case, 30 runs under 40 spinning processes: **0 passes, 30 failures**, every one on `precondition: the server held its answer` `0 !== 1` (`tests/account-mail.test.mjs:372:10`), case 396-442 ms.

**Link to loop2#79 (partly a guess):** PR #79 names only `tests/account-mail.test.mjs:350`, which at its base `211a4ea` is the line where the case starts (`test("a server that stops answering ...`), not an assertion; the failing assertion of that run is not recorded anywhere I found. That its failure was this precondition is an inference: it is the only way the case failed in any run I made, it fails exactly when the computer is busy, and the PR's failure came in a whole run (19 test files at once) and not alone. The other waits of the case (send limit 3000 ms, the wait for the server to see the close 3000 ms, SMTP readiness and shutdown 5000 ms each) never failed, also under 80 spinning processes.

## Repair

The cause lies in the case's own waiting — its 300 ms deadline is shorter than the way to the held answer on a busy computer — not in the mailer, whose deadline fired on time in every run. The case now passes `deadline: 1500`; its comment gives the reason (the 100 ms greeting delay, the shared process, 130 ms idle and up to 750 ms with four spinning processes per CPU, and that 300 ms cut the send before the server held anything).

The other limits stay: the send must end within 3000 ms and `Date.now() - started < 3000`, which stays well under the library's 5 s phase timeouts, so the case still tells the mailer's deadline from the library's timeouts. 1500 ms is about twice the slowest way measured (740 ms at four spinning processes per CPU), and the send's latest end measured, 2108 ms under 80 spinning processes, keeps ~900 ms from the 3000 ms limit.

**Seen failing with the mailer's deadline broken:** with `this.#deadline = options.deadline ?? defaultDeadline;` changed for a moment to `this.#deadline = defaultDeadline;` in `src/server/account-mail.ts`, then `npm.cmd run build` (exit 0) and `node --test --test-name-pattern="a server that stops answering" tests/account-mail.test.mjs` → **exit 1**, `Error: the send exceeded 3000 ms` (case 4024 ms; the library itself ended the send with `EMESSAGE` at ~4 s). Restored with `git checkout -- src/server/account-mail.ts`, `git diff --quiet -- src/server/account-mail.ts` exit 0, rebuilt with `npm.cmd run build` exit 0.

## Checks (each command with its exit code)

All series ran from the worktree root; each run is its own process, `node --test --test-name-pattern="a server that stops answering" tests/account-mail.test.mjs` (exit code of each run recorded), from a bash loop.

- `npm.cmd run build` → exit 0 (once, before the series; again after the broken-deadline check, exit 0)
- **Before the repair** (base `8ac7ca4e`):
  - alone, 30 runs → **30 passes, 0 failures** (case 324-339 ms)
  - under the load of the other Node tests (`node --test` of every `tests/*.test.mjs`, `tests/sim/*.test.mjs`, `tests/view/*.test.mjs` file except `tests/account-mail.test.mjs`, default concurrency, looping in the background; rounds of ~57-64 s, each exit 0, 0 failures), 30 runs → **30 passes, 0 failures** (case 325-344 ms)
  - instrumented copy at the start of that load (gate-like start), whole file, 10 runs → 10 passes, 0 failures (diagnostic, not a series of the case itself)
  - under 40 spinning node processes, 30 runs → **0 passes, 30 failures**, all on the precondition
- **After the repair** (`4bfc33cd`, working tree identical before the commit):
  - alone, 30 runs → **30 passes, 0 failures** (case 1527-1540 ms)
  - under the load of the other Node tests (same load as above), 30 runs → **30 passes, 0 failures** (case 1527-1608 ms)
  - under 40 spinning node processes, 30 runs → **30 passes, 0 failures** (case 1666-1744 ms)
  - under 80 spinning node processes, 30 runs → **30 passes, 0 failures** (case 1717-2108 ms)
- `npm.cmd test -- tests/account-mail.test.mjs` → exit 0, 10 tests, 10 pass, 0 fail (run after the edit, and again after restoring the mailer and rebuilding, exit 0, 10/10)
- `node node_modules/prettier/bin/prettier.cjs --check tests/account-mail.test.mjs` → exit 0
- `node node_modules/eslint/bin/eslint.js tests/account-mail.test.mjs` → exit 0
- `python -B .the-way/elements/common/foundation_check.py` — not run: the change adds or changes no `// invariant:` or `// decision:` comment.
- Not run, as the method and the handoff give: the full gate (`npm.cmd test` without a file, `gate_times.py`) — the orchestrator's.

Conditions: Windows 11, 20 logical CPUs, Node v24.17.0, nodemailer 10.2.1, smtp-server 3.21.1. Four node.exe processes that are not mine ran throughout (the same four before and after all my runs).

## Own-work check

- **Requirement most likely unmet:** "the cause … is established, not guessed" — specifically that the failure of loop2#79 was this mechanism and not another wait of the case.
- **Check:** looked for the failing run's message (PR #79 body and comments via `gh pr view 79`, `.runs` of the main checkout) and read the line the PR names at its base (`git show 211a4ea:tests/account-mail.test.mjs`, line 350); then made the case fail by load alone and by a stall alone, and checked that every other wait of the case held under the heaviest load.
- **Result:** the PR records only the case's start line, not the assertion; every failure produced (33 runs: 30 under 40 spinning processes, 6 with a stall of 200-250 ms) is the precondition `0 !== 1`; no other wait ever failed. The link to the PR's single failure stays an inference, stated as such above.

## Concerns

1. **The PR's own failure is not seen.** The mechanism is shown and repaired; that it was the one behind the 1-in-3 failure of loop2#79 is inferred (see Cause). The orchestrator's 3 full gate runs under load remain the test of that.
2. **The reverse DNS lookup of smtp-server is a further, unshown risk (a guess).** Before it greets, smtp-server queries DNS for the client's address (127.0.0.1) and waits up to 1500 ms. Here it took 0-1 ms; on a computer or network where that query is slow, the way to the held answer could again pass the deadline, and the query reaches the network resolver from a test (D-163 says no test reaches Outsider; this is a different service, the local resolver). `disableReverseLookup: true` on the test's `SMTPServer` would remove it from every case of the file. Not changed: no run showed it as a cause, and the slice repairs only a cause shown. Recommended as a follow-up for the orchestrator to weigh.
3. **The other case with `deadline: 300`** ("each failure with no error of the library names its reason …", `tests/account-mail.test.mjs:449-455` after the change) is not exposed to this race: it asserts only the `DEADLINE` code, which the deadline gives whenever it fires. Left unchanged.

## Choices

- **Lengthen the deadline (chosen)** vs. **a held phase reached sooner** (a raw TCP server that never greets, reached within milliseconds): the latter would drop the 100 ms greeting delay from the race but would change what the case shows — a server that stops answering after taking the message, past login, where the library's socket timeout and not its greeting timeout applies. Cost if wrong: on a computer much slower than four spinning processes per CPU, the way to the held answer could again pass 1.5 s; the case would fail on the same precondition with the same message.
- **1500 ms (chosen)** vs. 1000 ms (margin ×1.35 over the slowest way measured) or 2000 ms (send ending ~2.1-2.3 s under the heaviest load, close to the 3000 ms limit, which must stay under the library's 5 s). Cost: the case runs ~1.2 s longer.
- **The mailer unchanged:** its deadline fired on time in every run; nothing in `src/server/account-mail.ts` caused the failure.

## Reaches beyond the handoff

- `node_modules/smtp-server/dist/cjs/smtp-connection.js:438-569` — to see what the server does between accepting and greeting (the 100 ms delay and the reverse lookup).
- `scripts/test.py` (whole) — to see how the gate's Node stage starts the test files (one `node --test` with all patterns, default concurrency), to model the load.
- `gh pr view 79` — the body's lines on this test, to find the failing assertion (not recorded).
- `git show 7b621ce0` and `git log -S"deadline: 300"` — whether the 300 ms had a stated reason (none found); `git show 211a4ea:tests/account-mail.test.mjs` line 350 and `git diff 211a4ea 8ac7ca4e -- tests/account-mail.test.mjs src/server/account-mail.ts` (comments only changed since the PR's base).

## Working copies

All stood in `.runs\executor-17\`: the series, load, burst and spinning-process scripts, the two instrumented copies of the test file, the reverse-lookup timing script, the commit message file and every run's output. The whole directory was removed before returning (`rm -rf .runs/executor-17`; `ls` then reported no such directory). Every background process I started (load loops, 40 and 80 spinning processes) was stopped through its stop file and confirmed ended (their background tasks completed, node.exe count back to the four not mine). `git status --short` is empty.

**Unread material:** none — the handoff's passages of the task, D-84, D-154, D-162, D-163, account-email-nodemailer-starttls, nodemailer-require-tls, the account-server part, `guidelines/coding-mail-sending.md`, `guidelines/testing.md` (in two reads, lines 1-214 and 215-495) and `guidelines/coding.md` were each read whole; both changed-or-named files `tests/account-mail.test.mjs` and `src/server/account-mail.ts` were read whole.

**Searches not found or unclear:**
- The assertion and message of the failing run in loop2#79: not in the PR body (it names only `tests/account-mail.test.mjs:350`, the case's start line at `211a4ea`), not in its comments (none), not found by Grep in `the main checkout's .runs` (only the test files themselves matched; Grep respects ignore files, so logs there may be unseen).
- A stated reason for the original 300 ms deadline: none in commit `7b621ce0` or `704a03e8`.
