PASS 4bfc33cd

# Review — slice 17: flaky: the mailer's shortened deadline

- Variant: a planned slice. Range `8ac7ca4e..4bfc33cd`, one commit `4bfc33cd70b9b1b779338c45e1a8ef541d7f2744`, one file changed: `tests/account-mail.test.mjs` (+7 −2). `git rev-parse HEAD` = `4bfc33cd70b9b1b779338c45e1a8ef541d7f2744`, the head given (no later commits on the branch at the time of the review). `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the commit the gitlink records.
- `src/server/account-mail.ts` is unchanged; the slice touches no file of the trust boundary `src/server/**` and is judged for what its test shows of that boundary.

## Verdict in short

The cause is established, not guessed: the case's 300 ms deadline counts wall time from the start of the send, while the way to the held answer (smtp-server's fixed 100 ms greeting delay, then STARTTLS, TLS, AUTH, MAIL, RCPT, DATA, with client and server sharing one process) stretches with CPU load. I reproduced it independently: the unchanged case failed 9 of 10 separate runs under 40 spinning processes, every failure on `precondition: the server held its answer`, and passed 10 of 10 without load. The repair lies where the cause lies (the case's own input), gives its cause in the commit and the comment, lengthens no other limit, and keeps the case able to tell the mailer's deadline from the library's 5 s phases (a mailer that ignores its deadline fails the case with `the send exceeded 3000 ms`). No blocking finding.

## Findings

### Critical

none

### Important

none

### Minor

#### 1. The comment states 750 ms where the evidence measured 740 ms

- **Place:** `tests/account-mail.test.mjs:361`
- **What:** the comment says the way to the held answer took "up to 750 ms with four spinning processes per CPU". The executor's measurement table (`executor-17-report.md`, row "80 spinning node processes": data end 534-740 ms) and the commit message ("up to 740 ms with four") both give 740 ms.
- **Why it matters:** the comment is the stated reason for the changed limit (*Changing an existing test*); its number should be the measured one, so a later reader who checks the reason against the commit finds the same figure. The difference does not change the choice of 1500 ms.
- **Evidence:** the two texts quoted above; `git show 4bfc33cd` (message body "up to 740 ms with four").

#### 2. The comment carries one computer's measurements, which `guidelines/testing.md` sends to the foundation

- **Place:** `tests/account-mail.test.mjs:357-362`
- **What:** the six lines hold timings of this computer (130 ms idle, up to 750 ms with four spinning processes per CPU) and a fact of the library (smtp-server greets 100 ms after it accepts). `guidelines/testing.md:98-107` ("Where the expected value comes from") says a comment that carries information important for the code moves it to the foundation, and a comment without such information is not written.
- **Why it matters:** the measured timings age with the computer and the library version, and the library fact (smtp-server 3.21.1, `node_modules/smtp-server/dist/cjs/smtp-connection.js:452`) is the kind of statement the foundation keeps as an environment fact with its source and version. Minor: the comment is explanatory, it does not set an expected value, the slice asked that each changed limit name its cause, and the file already holds explanatory comments of this kind (`tests/account-mail.test.mjs:13`, `:23-25`, `:68-69`); no reader is misled about behaviour.
- **Evidence:** the guideline passage cited; the comment lines.

#### 3. The reverse DNS lookup of smtp-server can still eat the whole new deadline

- **Place:** `tests/account-mail.test.mjs:141-187` (the test's `SMTPServer` options, no `disableReverseLookup`), `tests/account-mail.test.mjs:365` (`deadline: 1500`)
- **What:** before it greets, smtp-server runs `dns.reverse` on the client's address and waits for it up to 1500 ms (`node_modules/smtp-server/dist/cjs/smtp-connection.js:526-541`, `setTimeout(..., 1500)`), after its 100 ms delay. On a computer whose resolver does not answer a PTR query for 127.0.0.1, the way to the held answer is at least 100 + 1500 ms, more than the new 1500 ms deadline, and the case would fail on the same precondition every run. The executor raised it as its concern 2 and measured 0-1 ms here.
- **Why it matters:** it is a second, unshown way to the same failure that the repair does not cover; it is not a regression (with 300 ms the case failed there too) and no run showed it, so it does not block. Setting `disableReverseLookup: true` in the test's `SMTPServer` (an option the library reads at `smtp-connection.js:527`) would remove the DNS query from every case of the file, and with it the test's one reach to the network resolver. The decision belongs to the orchestrator as a follow-up.
- **Evidence:** the library lines cited; arithmetic 100 + 1500 > 1500.

## Declined to judge

- Whether the one failure of loop2#79 (`tests/account-mail.test.mjs:350` on base `211a4ea`, one of three whole runs) was this precondition: the PR records only the case's start line (`gh pr view 79`, body lines on "Checks failing on the base"); the inference is the executor's, stated as such, and the acceptance criterion leaves the test of it to the orchestrator's 3 full gate runs under load.
- The second case with `deadline: 300` (`tests/account-mail.test.mjs:453-460`): outside the slice's change; it asserts only the `DEADLINE` code, which the deadline gives whenever it fires, so the load race of this slice does not reach it (agreeing with the executor's concern 3).

## Against the task, the foundation and the guidelines

- **Task, To do 7 and Acceptance criteria:** the failure was reproduced (executor 30/30 under 40 spinning processes; mine 9/10), so the case is changed, not left; the repair is in the test, where the cause lies. The case passes at least 30 further separate runs (executor: 30 alone, 30 under the other Node tests, 30 under 40 and 30 under 80 spinning processes; mine below).
- **D-162** ("within a bounded time"): the case still shows a silent server cut by the mailer's deadline and returned as `failed`; with the deadline option ignored the case fails (check 3 below), so it still protects D-162.
- **D-163, D-84:** still a real SMTP server on port 0 of the loopback interface, readiness and shutdown waited with limits, the close polled with a limit; no fixed sleep as proof of readiness was added.
- **account-email-nodemailer-starttls, nodemailer-require-tls, D-154:** untouched; the changed case is not an invariant test (it carries `// decision: D-162` only), so no invariant test changed.
- **`guidelines/testing.md`, *Changing an existing test*:** the lengthened deadline names its cause (data side: the way to the held answer on a busy computer) and its source (the commit's measurements); the 3000 ms limits are unchanged. *Flaky tests:* repetition served diagnosis. *Behaviour, not implementation:* the precondition is still marked and stands for the requirement (the server held its answer, so the cut is the deadline's).
- **`guidelines/coding-mail-sending.md`:** the mailer is unchanged; its deadline covers the whole send, connecting included, as the rule *Porażka jest wynikiem, nie błędem* requires — which is why the case, not the mailer, had to change.
- **`guidelines/coding.md`:** Prettier and ESLint pass on the file.
- **Reserved choice:** none taken.
- **Trust boundary:** the slice changes no file of `src/server/**`; what the test shows of it — a silent mail server cannot hold the send past its deadline — still fails when the mailer's deadline is broken.
- **Own-work check of the executor:** it named the weakest point (the link to the PR's failure) and checked what could be checked; its check would not catch a different cause of the PR's failure, which it says.

## Checks run

All from the worktree root `the repository's root`, Node v24.17.0, 20 logical CPUs; four node.exe processes not mine ran throughout.

1. `npm.cmd run build` → exit 0 (writes the ignored `dist/`; `git check-ignore -v dist/server/account-mail.js` → `.gitignore:3:dist/`).
2. Head case alone, 10 separate processes, `node --test --test-name-pattern="a server that stops answering" tests/account-mail.test.mjs` → 10 passes, 0 failures. (A first attempt at a series under load ran without load because the spinner script failed to start; its results count as no-load runs: base copy 10 passes of 10, head 15 passes of 15.)
3. Head case against a copy of the built mailer with `this.#deadline = options.deadline ?? defaultDeadline;` changed to `this.#deadline = defaultDeadline;` (copy of `dist/server/account-mail.js` and `log-line.js` and a copy of the test file importing it, in my working directory) → exit 1, `Error: the send exceeded 3000 ms`, run 4159 ms. The case still tells the mailer's deadline from the library's timeouts.
4. Under 40 spinning node processes (2 per logical CPU), each run a process of its own:
   - base copy of the case (`git show 8ac7ca4e:tests/account-mail.test.mjs`, import path adjusted only) → 1 pass, 9 failures of 10, all 9 on `AssertionError [ERR_ASSERTION]: precondition: the server held its answer`;
   - head case → 15 passes, 0 failures of 15, case 1650-1732 ms.
5. Under 80 spinning node processes (4 per logical CPU), head case → 10 passes, 0 failures of 10, case 1543-1905 ms.
6. `npm.cmd test -- tests/account-mail.test.mjs` → exit 0, 10 tests, 10 pass, 0 fail.
7. `node node_modules/prettier/bin/prettier.cjs --check tests/account-mail.test.mjs` → exit 0; `node node_modules/eslint/bin/eslint.js tests/account-mail.test.mjs` → exit 0.
8. `git status --short` after all runs → empty.

Not run: the full gate and its 3 runs under load — the orchestrator's, as the acceptance criterion and the method give; `foundation_check.py` — the range changes no `// decision:` or `// invariant:` marker and no foundation file.

## Reaches beyond the dispatch

- `node_modules/smtp-server/dist/cjs/smtp-connection.js:435-574` — to check the executor's claims of the 100 ms greeting delay and the 1500 ms reverse-lookup wait (finding 3).
- `gh pr view 79` (body, the lines naming `tests/account-mail.test.mjs`) — to see what the PR records of the failure: only the case's start line, in one of three whole runs on the base.
- `git show 8ac7ca4e:tests/account-mail.test.mjs` — the base case, to reproduce the failure.
- The author's personal instructions for scripts and for the form of a code review (outside the repository), read as the session's instructions require; they change no grade.

## Working copies

- `.runs\review-slice-17\` — held the base copy of the test file, the mutated copy of the built mailer and its test copy, the series and spinner scripts, the PR text extract and every run's output. Removed (`rm -rf`; `ls` then reported no such directory). All spinning processes ended through their stop file; node.exe count back to the four not mine.
- `dist/` was rebuilt by `npm.cmd run build` from the head's sources; it is ignored build output and stays as the build left it.

**Unread material:** none — the dispatch's passages of the task, D-84, D-154, D-162, D-163, account-email-nodemailer-starttls, nodemailer-require-tls and the part account-server were read whole; `guidelines/coding-mail-sending.md` and `guidelines/coding.md` whole; `guidelines/testing.md` whole in two reads (lines 1-214 and 215-495); `tests/account-mail.test.mjs` and `src/server/account-mail.ts` whole; the executor's report whole.

**Searches not found or unclear:**
- The failing assertion and message of the loop2#79 run: not in the PR body (it names only `tests/account-mail.test.mjs:350`, the case's start line at `211a4ea`).
