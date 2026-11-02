FAIL d07564a31b8e8193d64482f3ef7e1bff3cc8199a

# Review of the return step — task `lokalny-start`

Range `360280114d8854886c6b06c15167ca394b8272fe..d07564a`, one commit, three Markdown files of the foundation. `git rev-parse HEAD` in the worktree is d07564a31b8e8193d64482f3ef7e1bff3cc8199a, the head given. No invariant test changed in the range.

Blocking 2, Minor 3, out of scope 2 (the lines of *Declined to judge*).

Neither blocking finding is an error in the three changed lines of the entries themselves. Both are places where an entry this cycle wrote, and this step compared with the code, says more than the code or its test does, and the return step named the gap and left it. What the commit adds is correct: every passage stands at its address, and *Part* `account-server` is right.

## Findings

### Important (blocking)

**1. `local-start-access` reads *Method: test*, and no test citing it fails when the real server listens on every address of the computer.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\foundations\invariants.md:1180`, `:1182`, `:1185`; `C:\Storage\repos\loop2-wt\lokalny-start\tests\invariants\test_local_start_access.py:197`–`:200`, `:225`–`:231`; `C:\Storage\repos\loop2-wt\lokalny-start\guidelines\testing.md:172`.
- **To paste:** The server can open its port to the whole network and every test citing `local-start-access` stays green, because both citing cases run against a stand-in server. Move the listening case to the real server and see it fail once with the server ignoring its address.
- **Why I report it:** this weighs the remark the return step left for this review under *Noticed, not changed*.
  - **What it protects:** the sentence promises that `npm run local` listens on 127.0.0.1 alone "at its HTTPS port and at its server's port". The port of the server is the one that takes `X-Forwarded-Proto` on trust from a loopback peer (D-110), and this is the one rule of the boundary `scripts/local-start.mjs`.
  - **The mechanism:** `LocalStartBoundary` replaces `dist/server/main.js` with a stand-in that reads `LOOP2_LISTEN_HOST` and listens on it. So `test_both_ports_listen_on_this_computer_alone` proves only that the command hands the value over. Whether the product's server honours it is not checked by any test citing the invariant. An invariant's result is `pass` when every citing test passes, so the invariant would report `pass` while false. The new *Part* says a change in `account-server` can make the sentence false; the test does not see that change.
  - **Measured, on a scratch worktree of the head:** with `createApp(runtime).listen(port, host)` in `src/server/main.ts:18` changed to `.listen(port)` and the game rebuilt, all 11 tests of `test_local_start_access` passed. The real start then printed `Loop: http://127.0.0.1:60549` and answered at `192.168.1.20:60549` and `127.0.0.2:60549`. With the code of the head restored, both addresses refused at the server's port. This mutation keeps the printed line, so it passes the `SERVER_LINE` pattern that caught `0.0.0.0` in review-whole finding 5.
  - **What does catch it:** on this computer, two tests of another rule: `test_occupied_address_exits_without_reporting_ready` and "exits with an error instead of reporting ready when its listening port is occupied" in `tests/startup.test.mjs`. They fail by a timeout, because on Windows the wildcard listener does not collide with the occupied 127.0.0.1 port. That is an accident of the platform. On Linux such a bind should collide, those tests should pass, and nothing would catch the mutation: reasoned, not run.
  - **Why it blocks:** To do 8 asks for a test checking the rule directly, row 4 of *Settlements to record* names listening on this computer alone, and WAY-61 says a test checks what its sentence is about. The entry claims a method that holds for half of the sentence at this port. This is a mandate of the task unmet, inside the task.
  - **Fix:** the stand-in is needed only for the header case: `guidelines/testing.md:172` gives its reason, and that reason speaks of headers only. The listening case needs nothing from it. Run it on a real start, keeping the line `# invariant: local-start-access`, and see it fail with the mutation above. Update the sentence in `guidelines/testing.md:172` if the case moves or is renamed. About ten lines of a test; no entry changes.
  - **If left as it is:** nothing is wrong today, since `src/server/main.ts:18` is correct. A later change to that line passes the invariant, and on a Linux runner possibly the whole suite. The cost of the fix is one more start in a test file that already runs eleven.

**2. D-254 says each start removes the databases of the starts that have ended, and the code does not when the process number was taken over; the return step saw this and left the sentence.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\foundations\decisions.md:5146`–`:5147`; `C:\Storage\repos\loop2-wt\lokalny-start\scripts\local-start.mjs:182`–`:189`, `:207`–`:209`; `C:\Storage\repos\loop2-wt\lokalny-start\.runs\task-cycles\lokalny-start\reports\return-step.md:17`.
- **To paste:** D-254 says every ended start's database goes at the next start, and a directory whose process number now belongs to another program stays, through any number of starts. Either the check for a running start changes so the sentence is true, or the sentence gets the qualification, with the human's approval, since it narrows To do 2.
- **Why I report it:**
  - **What it protects:** D-254 records that no database outlives the next start.
  - **The mechanism:** `removeEndedStarts` skips a directory while `isRunning(pid)` is true, and `isRunning` asks only whether some process holds that number. After a hard kill or a reboot, a reused number makes an ended start look alive.
  - **Measured at the head:** I planted `.runs/local-start/11732-abcdefabcdef/accounts.sqlite`, 11732 being the running `explorer`. Through two starts the directory stayed while each real start's own directory was handled correctly. Each `--stop` printed `The local start of process 11732 did not stop.` and exited 1.
  - **Why this grade and not Minor:** review-whole graded this behaviour Minor against To do 2 and wrote that D-254 agrees with the code, so it did not compare the two. The return step did, and wrote "Matches, with one exception", leaving the sentence "as that finding goes to the request's lists". WAY-11 has the return step correct in the same change whatever no longer matches, and `return_step.md` saying review findings are no foundation entries does not lift that. WAY-263 grades a departure from an entry the change writes as Important, and names the failure to do what it requires and the lack of a qualification. Its *Verification* lists grading such a finding Minor as the violation. The harm is small, which is why the sentence "the row's meaning holds" is true, but it does not change the grade.
  - **Two ways to close it:**
    - **(a) Change the code**, as review-whole proposed: a start writes its HTTPS port into its directory, and running means that port accepts a connection. The sentence and To do 2 then hold to the letter, and `--stop` stops reporting a false failure. It costs a change to a trust-boundary file, a test and one more review. I recommend this way.
    - **(b) Qualify the sentence**, for example "the starts whose process number no longer runs". One clause, no code, but it narrows "Każdy start polecenia usuwa bazę poprzedniego startu" of To do 2, so it goes to the human by WAY-30, and `--stop` keeps its false failure.
  - **If left as it is:** no check runs on old data, since each start has a fresh database. But the foundation holds a known false sentence, and a later reader, task 5 first of all since it uses this database, takes it as true.

### Minor

**3. D-252 *Rejected* counts "a setting outside the repository" against Playwright MCP, and the fact this commit adds shows the fallback needs no such setting.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\foundations\decisions.md:5096`, `:5113`; `C:\Storage\repos\loop2-wt\lokalny-start\.claude\skills\loop2-play\SKILL.md:81`–`:90`; `reports\return-step.md:15`, `:42`.
- **To paste:** D-252 rejects Playwright MCP partly for a setting outside the repository, while the skill reaches the game on MCP with no setting at all. Should the human reword that clause, or does it stand as the reason at the time of choosing?
- **Why I report it:** the return report's row reads "Matches", yet its own reason for writing `chrome-devtools-ignore-certificate-errors` is that MCP gets through "with no setting outside the repository". Both now stand in the foundation's reach. Minor because *Rejected* is not binding, the other reason (more tokens) stands, and the per-tab command is a real cost in place of the setting. It is approved wording, so a change is the human's by WAY-30. If left, a later reader weighing MCP as the first way sees one reason that does not hold.

**4. `openssl` was weighed out of the facts by a test that is not the template's.**

- **Place:** `reports\return-step.md:52`; `C:\Storage\repos\loop2-wt\lokalny-start\foundations\decisions.md:5197`–`:5201`; `C:\Storage\repos\loop2-wt\lokalny-start\scripts\local-start.mjs:70`–`:93`.
- **To paste:** "A failure shows at once" does not answer whether the citation would call D-256 into question. D-256 says the command needs no new program and counts an instruction to install one as a violation, and on Windows that rests on `openssl` coming with Git for Windows.
- **Why I report it:** the template's test (WAY-90) is whether a citation, once no longer true, would call the decision into question. D-256's *Rationale* "needs no new program" and its *Verification* do depend on it, and its *Rejected* counts "a key on the disk" against the other way, which rests on `openssl` writing the key to standard output. Minor because the outcome may still be right: a fact needs a source of the template's forms, and neither the report nor I looked for one. Nothing goes wrong silently: the command stops with a message naming the lack. On this computer the program is at `C:\Program Files\Git\mingw64\bin\openssl.exe`, as the code expects. If left, the cost is that nobody is pointed at D-256 when that changes, until the command fails.

**5. The passages of `playwright-cli-context-options` do not hold the key `browser` its sentence names.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\foundations\environment_facts.md:432`, `:434`.
- **To paste:** The sentence says `browser.contextOptions`, and the quoted passages show only `contextOptions`. Add `browser?: {` as a passage, or drop `browser.` from the sentence.
- **Why I report it:** the sentence is true: the README at that commit nests `contextOptions` inside `browser?:` (fetched, its lines 428 and 458). But the passage is what a reader compares with the source (WAY-78), and `.playwright/cli.config.json` depends on exactly that nesting. Minor: the source is one click away, and a wrong nesting shows at once as a certificate error.

## Declined to judge

- Minor findings 2 to 5 of `review-whole.md` and A to C of `review-fix-1.md`, as behaviour of code outside this range: not graded again, except where finding 2 meets D-254 above. They stay for the request's lists.
- A local program reaching the server's port directly with a made-up `X-Forwarded-Proto`: declined by review-whole, since row 4 speaks of a browser. Not judged again.

## What held

| Claim of the return report | Checked how | Result |
|---|---|---|
| `playwright-cli-context-options`: address and both passages | fetched at the fixed commit, HTTP 200, passages found | holds, finding 5 |
| `chrome-devtools-ignore-certificate-errors`: address and passage | fetched at the fixed commit, HTTP 200, passage found; the command has no deprecation mark | holds; the skill sends this command at `SKILL.md:88` |
| Both facts are named by a decision (WAY-73) | D-252 *Based on* | holds |
| One fact each, present tense, no more than the source | read against the template | holds |
| *Part* `build-tools · account-server` | `src/server/main.ts:4`, `:18`; WAY-62, "a writer in doubt names more" | correct, and it is what exposes finding 1 |
| The sentence of `local-start-access` against the code | `scripts/local-start.mjs:34`, `:53`–`:68`, `:145`, `:228` | holds at the head |
| The foundation says what the boundary does | part map `:114`, D-110 `:1974`, `:1979`, `guidelines/testing.md:150`, `:172` | holds, with finding 1 on how it is proved |
| No entry changed beyond the report | diff | D-252 *Based on* only, *Part* only, two new facts |
| Rows 1 to 4 of *Settlements to record* written | D-254, D-255, D-256, `local-start-access` | yes, finding 2 on D-254 |
| Weighed out: screencast viewport, MCP file roots, Windows and SIGTERM | against "Which facts are written" | I agree: no source, or no decision depends on it |
| Weighed out: `openssl` | the same | finding 4 |

**Reserved choice:** none, no code changed. **Guidelines:** none changed. **Author's own-work check:** the report's `foundation_check.py` cannot see either blocking finding, and the report named both places itself rather than hiding them. **Irreversible operation:** none in the range.

## Checks run

| Command or method | Exit | Result |
|---|---|---|
| `git rev-parse HEAD` | 0 | the head given |
| `git -C .the-way rev-parse HEAD` against `git ls-files --stage -- .the-way` | 0 | both f45ca40 |
| `python -B .the-way/elements/common/foundation_check.py` in the reviewed worktree | 0 | 0 errors |
| `curl` of the two new facts' addresses, then `grep` for each passage | 0 | HTTP 200, passages found |
| Mutation of `src/server/main.ts:18` to `.listen(port)`, scratch worktree: `python -B -m unittest test_local_start_access test_account_server_occupied_address test_account_server_default_address` | 1 | 13 tests, 1 error: all 11 of `test_local_start_access` passed; the error is the occupied-address test, a timeout |
| The same mutation: `node --test tests/startup.test.mjs` | 1 | the occupied-port test failed by a timeout at `tests/startup.test.mjs:118`; I read only the end of the output, so other failures are not excluded |
| Real start with the mutation, TCP connections to 127.0.0.1, 127.0.0.2, 192.168.1.20 | 0 | server's port open on all three, HTTPS port on 127.0.0.1 alone |
| The same on the head, as the control | 0 | both ports on 127.0.0.1 alone |
| Directory planted with a live number, two starts and `node scripts/local-start.mjs --stop`, at the head | 1 from each stop | finding 2 |

**Not run:**

- The full `npm test`, the orchestrator's (WAY-160), so ESLint, Prettier, Ruff, ShellCheck, the audit and every test not named above stayed unchecked by me.
- The mutation on Linux: no such machine here, so the sentence on Linux in finding 1 is reasoned.
- The tests at the unmutated head: the range changes no code and the earlier reviews ran them.
- Playwright MCP: the range changes nothing on that way.

**Left behind:** nothing of mine. The scratch worktree is removed, its link to `node_modules` removed first and the real directory intact, no node process of the checks runs, and `git status --short` in the reviewed worktree prints nothing. The main checkout was not touched. Five `%TEMP%\loop2-invariant-*` directories date from 2026-10-27 to 2026-10-29 and are not mine. The other files in my scratchpad were there before and are not mine either.

## Reaches beyond the dispatch

- `.the-way/foundations/decisions.md`, WAY-11, WAY-30, WAY-61, WAY-62, WAY-263: to grade the findings.
- `.the-way/elements/environment-facts/template.md` and `skill/decide_entry.md`, `skill/write.md`, `skill/draft.md`; `.the-way/elements/invariants/template.md`: what a fact and *Part* and *Method* must be.
- `foundations/part_map.md:60`–`:131`, `foundations/decisions.md:1972`–`:1985` (D-110): the boundary and the parts.
- `.claude/skills/loop2-play/SKILL.md` whole, `scripts/local-start.mjs` whole, `tests/invariants/test_local_start_access.py` whole, `src/server/main.ts` whole, `tests/startup.test.mjs:108`–`:175`, `tests/invariants/loop2_invariant_support.py`: to check the entries against what they describe.
- `.claude`-level global instructions of the owner: `playbook_code_review.md` for the form of each finding, `.ai\rules\scripts.md` before the one-off scripts.

## Searches not found or unclear

- Whether a publisher's page at a frozen address says Git for Windows ships `openssl`: not searched, finding 4.
- The return report's "as ordered" and "goes to the request's lists": I found no such order in `cycle.md`, and did not look for the return step's own handoff. It would not bind this grade anyway.
- Whether the facts went through `the-way-record-environment-fact` cannot be read from the commit. The results fit the template and the report shows the mechanical check of `skill/write.md`.
- `cycle.md` *Return step* reads `Pending`, as the report says; that file is the orchestrator's.
