FAIL 0c8b97c083013cb61dc9f195a7105d0d41c121be

# Review of the correction on request #50 — task `lokalny-start`

Range `302ea89c37e14252b0dd591646c57d1596cd3d15..0c8b97c`: the merge 42ed270 of `main` at fe25b7d, then 5f403c9 and 0c8b97c. `git rev-parse HEAD` in the worktree is 0c8b97c083013cb61dc9f195a7105d0d41c121be, the head given. The method is `task-cycle/review/SKILL.md` with `fix.md`, the variant of a correction: the human's remark stands in place of a findings file.

Blocking 1, Minor 7, out of scope 3 (the lines of *Declined to judge*).

The merge is sound, the remark is carried out and the code works: the first acceptance path passes at this head in a real browser. What blocks is one clause of the sentence the human chose: it says more than the code does. The human gave those words, and they are still the fault; the method says so of anything a task mandates. Numbers below are those after the merge.

## The remark

The human, 2026-11-02: „zmieńmy to zdanie, zmieńmy też D-254 i może jak i tak się zatrzymaliśmy to uwzględnijmy też uwagi minor”.

| Part of the remark | Made? | Evidence |
|---|---|---|
| „zmieńmy to zdanie, zmieńmy też D-254”: the human's D-254 is now D-256 | **Made**, word for word as the request quoted it. **Finding 1** stands on those words | `C:\Storage\repos\loop2-wt\lokalny-start\foundations\decisions.md:5219`–`:5222`, against `reports\review-fix-2.md` and the request's quote |
| `review-whole.md` 2, what repeats the sentence | Made: `README.md:19`, the skill `:32`–`:34`, both copies; comment `scripts/local-start.mjs:20`–`:22` | diff; `cmp` of both copies |
| `review-whole.md` 3, two starts share a cookie | Made | README, skill |
| `review-whole.md` 4, the sentence of D-255's *Rationale* | Left as the handoff orders. Its own remedy was to stand in the request in full, and it stands there | `gh pr view 50`, one hit for the passage |
| `review-whole.md` 5, a start left running | Made: `Start.wait` closes it and names the line | `tests/invariants/test_local_start_access.py:162`–`:166`, read; the author's mutation row |
| `review-fix-1.md` A, reason for an unreadable path | Made | new case; JSON that does not parse also tried by hand: its own message, exit 1 |
| `review-fix-1.md` B, the viewport stays on the tab | Made | skill `:128` |
| `review-fix-1.md` C, the twins | Made as far as it can be, and the report says what stays apart. The new case fails when `frames.js` changes: I saw it | break M2 below |
| `review-return.md` 3, D-254's *Rejected* | Made. The clause is true: skill `:83`–`:85` against `.playwright/cli.config.json`. See finding 7 on who wrote it | diff: nothing else of D-254 changed but its number |
| `review-return.md` 4, `openssl` | Made: the fact stands, and D-258 names it. The second half was left, with what was searched | source fetched at the fixed commit, HTTP 200, section and passage found, the template's "markup dropped" applied |
| `review-return.md` 5, key `browser` | Made | same fetch: `browser?: {` at line 428, the two other passages at 454 and 458 |
| `review-fix-2.md` A, `stop` | Made on a built tree: a link and a directory are refused and the others are told. **Finding 2** is where it does not hold | run with and without `dist` |

## Findings

### Important (blocking)

**1. D-256 says a start whose port stays silent counts as running, and the code counts it so only while its process number lives; the report says the sentence now matches.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\foundations\decisions.md:5220`–`:5221`, against `C:\Storage\repos\loop2-wt\lokalny-start\scripts\local-start.mjs:265`–`:267`. The same clause: `C:\Storage\repos\loop2-wt\lokalny-start\README.md:19`, `C:\Storage\repos\loop2-wt\lokalny-start\.claude\skills\loop2-play\SKILL.md:33`–`:34` and its copy under `.agents`, `C:\Storage\repos\loop2-wt\lokalny-start\scripts\local-start.mjs:21`–`:22`. The claim: `C:\Storage\repos\loop2-wt\lokalny-start\.runs\task-cycles\lokalny-start\reports\correction.md:105`.
- **To paste:** D-256 says a start whose port takes a connection and stays silent counts as running, and a start of `npm run local` removes such a directory when no process holds its number. Add the condition to the clause, or say the sentence stands as it is.
- **Why I report it:**
  - **What it protects:** the clause exists to say the one case in which an ended start's database stays. It is the limit the human chose, and task 5 reads it first.
  - **The mechanism:** `isRunning` is `processExists(start.pid) && (await showsItsCertificate(start))`. The silence decides only after the number proved alive. The clause leaves the number out, so it covers a directory the code removes. The request described the case with another program on the old number, and the proposed clause, which I did not write but which this cycle's reviewer did, dropped that condition; the human approved the clause as shown.
  - **Measured at the head, on a real start:** two directories planted, each with an `accounts.sqlite`, both naming a port held by a listener that accepts and says nothing. `4000001-<port>-abcdefabcdefabcd`, a number no process holds: **removed** by the next start. `<number of the listener>-<port>-abcdefabcdefabc0`: **stayed**, and `--stop` wrote `START_STILL_RUNNING` for it.
  - **Why this grade:** the code removes what the entry says counts as running, so it does what the entry forbids; README and the skill repeat the wider form. WAY-263 grades that Important and names grading it Minor for its smallness as the violation. `review-fix-2.md` held the same line on the same sentence.
  - **How small it is:** nothing goes wrong. The code is right, the directory it removes is an ended start's, and that is closer to To do 2 than the sentence is. No live start is at risk, because a live start's number is alive. I ask for no change of code.
  - **Fix, a proposal, on the branch for the human's word by WAY-30:** "a start whose process number is in use and whose port takes a connection and stays silent counts as running". The same few words go to `README.md:19`, both copies of the skill and the comment at `scripts/local-start.mjs:21`–`:22`. `scripts/local-start.mjs:12`–`:13` still says "the starts that have ended": the limit stands nine lines below it in one comment, so I do not count that as a clause dropped, but a word there costs nothing while the file is open.
  - **Leave it:** no work and no harm today; the foundation holds a sentence wider than the code, in the harmless direction, and a reader of task 5 takes a silent port alone to keep a database. **Change it:** one clause and three short repeats, no code and no test, one more turn to the human and one review of a few words. The human can refuse and keep the sentence, which is theirs to say and not the cycle's.

### Minor

**2. With no `dist`, a failure of `npm run local:stop` is a crash, and the case written for it passes over that crash.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\scripts\local-start.mjs:67`–`:81`, `:386`–`:396`; `C:\Storage\repos\loop2-wt\lokalny-start\tests\invariants\test_local_start_access.py:409`–`:422`.
- **To paste:** `recordFailure` imports `dist/server/log-line.js`, so without a build the first bad directory ends `--stop` with a raw stack and the others are never told. `test_stop_writes_through_no_planted_link` runs in a tree with no `dist` and its `code == 1` is met by that crash; build first, or assert a line of the output.
- **Why I report it:** `review-fix-2.md` A asked that one bad directory not keep the others from being told. `npm run local:stop` does not build, and `TreeCopy` copies no ignored file.
  - **Measured:** two planted directories with `dist` absent: exit 1, `ERR_MODULE_NOT_FOUND` with its stack, second directory not told. The same with `log-line.js` in place: both told, the lines as the report says. In the case itself, its output printed in a scratch copy shows the same stack; the test passes.
  - **Why Minor:** it takes a tree with no build and a bad directory or a start that does not stop at once. The case still proves what matters most, that the file outside stays "kept". The report says the script "needs `dist` only when something fails" but not what that costs.
  - **If wanted:** the stop path falls back to one plain line when the import fails, and the case calls `npm run build` as its neighbours do.

**3. A response the server cuts after its headers leaves the browser waiting, with no line from the proxy.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\scripts\local-start.mjs:170`–`:173`, against `C:\Storage\repos\loop2-wt\lokalny-start\src\server\app.ts:68`, `:110`.
- **To paste:** When the server destroys a response after its headers, `response.pipe(outgoing)` never ends the browser's answer, so the request hangs. End it when the response stops short.
- **Why I report it:** this is where this change meets `main`. #51 brought two paths on which the real server calls `response.destroy()` after its answer began. Before the tunnel a browser sees the connection cut; behind this proxy it sees nothing. Measured with a stand-in that sends headers, a chunk, then destroys the socket: the client still waited 6 s later, when I stopped it, and the output held no `local-proxy` line.
- **Why Minor:** both paths need a failure inside the server, and the server writes its own line there, so the cause is not lost and "once" argues against a second one. What is lost is a clean end for the one request. The line of code is older than this range. About two lines: `response.once("close", ...)` destroying `outgoing` when the response is not complete.

**4. One bad directory writes two failures.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\scripts\local-start.mjs:390`, `:404`.
- **To paste:** A directory that could not be told writes "could not tell" and then "did not stop". `guidelines/coding.md` asks for a failure to be recorded once.
- **Why I report it:** measured: `{"failure":"could not tell the start …1 to stop",…,"code":"EEXIST",…}` followed by `{"failure":"the local start …1 did not stop",…,"code":"START_STILL_RUNNING",…}`. The second follows from the first, and the report's own table counts "once" as met. Minor: both say something true and neither hides anything. `test_a_planted_directory_keeps_stop_from_telling_no_other_start` reads the second line, so a fix touches the case.

**5. The report's "a browser that left writes no line" has no test.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\scripts\local-start.mjs:176`.
- **To paste:** Nothing fails when `if (browserLeft) return;` goes, though each browser that leaves then writes a false failure. A client that leaves mid-request in the case of the dropped request would hold it.
- **Why I report it:** with the guard removed in a scratch copy, a client that left wrote a second `local-proxy` line, so the guard does real work. No case has a client leave. Minor: broader coverage, and the code is right at the head.
- **Also, reasoned and not run:** `planted_name` sorts first only where the system lists names in order, so on Linux `test_a_planted_directory_keeps_stop_from_telling_no_other_start` may pass without the bad directory coming first.

**6. The test file's docstrings no longer say which cases run the real server.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\tests\invariants\test_local_start_access.py:8`–`:11`, `:256`.
- **To paste:** "The other cases run the real server" and "The real command on the real built server" no longer hold: the case of the dropped request runs a stand-in in that class.
- **Why I report it:** the stand-in is right there, since the proxy is what that case tests. The sentence names the stand-ins because a reader judges the file by them, and `review-return.md` finding 1 came from exactly that doubt. Minor: one clause.

**7. The report credits the human with words the human did not see, and one number now means two things.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\.runs\task-cycles\lokalny-start\reports\correction.md:116`, `:121`.
- **To paste:** "the clause of *Rejected* the human changed" and "D-254 (*Rejected*, the human's remark)" overstate it: the human took the finding in, and the words are the orchestrator's. The human's "D-254" is today's D-256. The request should quote the new clause, say whose words they are, and give the mapping.
- **Why I report it:** the handoff of this review says the human saw no such words. WAY-30 leaves a change of approved wording to that person, so the request is where they first see it. Read with today's numbers, "zmieńmy też D-254" looks like a mandate for this clause, and it was not one. The report's *For the request* names the departure from the vault and neither of these. Minor: the clause is not binding and is true.

**8. One line of D-254 was not wrapped again.**

- **Place:** `C:\Storage\repos\loop2-wt\lokalny-start\foundations\decisions.md:5187`.
- **To paste:** The line runs to about 135 characters where the file wraps at 100.
- **Why I report it:** polish, for the next time the file is open.

## Declined to judge

- A start ends on a `stop` planted as a directory, by `existsSync` at `scripts/local-start.mjs:367`: the report names it; it takes someone already writing under `.runs/` as the same user and only ends a throwaway start. The finding it answers was about `--stop`.
- `.runs/local-start` itself being a link: as `review-fix-2.md`; this range does not touch it.
- A local program reaching the server's port directly with a made-up `X-Forwarded-Proto`: declined by `review-whole.md`, since row 4 of *Settlements to record* speaks of a browser.

## The merge and how this change meets `main`

- **Conflict resolution:** right. `git diff fe25b7d HEAD -- foundations/decisions.md` removes two lines of `main`, the two this change means to change (D-110 *Verification*, D-234 *Rejected*), and `main`'s D-252 and D-253 stand whole. No file of `src/` differs from fe25b7d.
- **Renumbering:** right. The entries of 302ea89 with each number +2, compared with those of the head: they differ in the three changes of the correction and nowhere else. `foundations/invariants.md:1184`, `guidelines/testing.md:149` (D-255, D-258) and the test's docstring mean this change's entries; `guidelines/testing.md:168` keeps `main`'s D-252. `grep` for D-252 to D-258 in the README, the skill, the part map, the facts and the script finds no other.
- **The server's handler in this process:** `installLastResort` holds from the import on, `process.exitCode` is still set on a failed start, and a failed start writes one line: `test_a_server_that_cannot_start_ends_the_start_with_no_address` passes, and I read the path.
- **D-253:** the process is the server once imported. Before that it reads no account's data; `removeEndedStarts` deletes files and reads none, and sits inside the `try` whose failure writes no message.
- **`save-frames.mjs`, the way the report names:** no finding. Its two lines answer the agent that ran it, hold its own words and `error.name`, and take the form `scripts/restore-trial.mjs` keeps. Whether D-252 means them is under *Searches*.
- **The rest of the rule table of the report:** agrees with the code.

## Trust boundary and the removal

- **What a line can carry:** `writeFailure` reads only a `name`, `code` and `errcode` through patterns. The only values put into a `failure` text are `start.name`, which passed `startDirectoryName`, so digits and hex. No line of the script holds a path, a message or anything of a request.
- **Crafted request at a real start, proxy on a stand-in:** a marker in the path, in `Cookie` and in a header of its own, the server dropping the request: 502, one line `{"failure":"local-proxy","kind":"Error","code":"ECONNRESET","place":"local-start.proxy"}`, and the marker nowhere in the output.
- **`stop` with `wx`:** a link and a directory refused, the file outside kept (the test file), a plain file taken as told before (read).
- **Removal:** in this range `removeEndedStarts` changed only in its `catch`, and `startDirectories` gained `name`. The path still comes from the file's place and the anchored pattern. It cannot be led outside `.runs/local-start/`; the case of the argument and the environment passes.
- **Not repeated:** the 773 crafted requests of `review-whole.md`. The header path did not change.

## Other checks of the diff

- **Foundation against the code:** D-254, D-255, D-257 and D-258 hold. D-256 is finding 1. `local-start-access` holds, and its test runs on the real server.
- **Changed invariant test:** `tests/invariants/test_local_start_access.py`, 72 lines in and 3 out. No `# invariant:` line changed, and the two citing cases are as they were.
- **Reserved choice:** none.
- **The author's "seen failing":** the two gaps it named are closed by M1 and M2 below. The proxy case now fails at its own assertion, and the twin case fails when `frames.js` changes.
- **The first acceptance path at the merged head:** the report left it out since no screen of this change moved, but the merge brought `main`'s `src/browser/view/app.ts`, so I ran it. It stands, below.

## Checks run

| Command or method | Exit | Result |
|---|---|---|
| `git rev-parse HEAD`, `git status --short` in the reviewed worktree | 0 | the head given, clean |
| `git -C .the-way rev-parse HEAD` against `git ls-files --stage -- .the-way` | 0 | both f45ca40 |
| `python -B .the-way/elements/common/foundation_check.py` in the reviewed worktree | 0 | 0 errors |
| `cmp` of `SKILL.md`, `save-frames.mjs`, `frames.js` between `.claude` and `.agents` | 0 | identical |
| `python -B -m unittest -v test_local_start_access`, scratch worktree of the head | 0 | 16 tests, 142 s, none skipped |
| `python -B -m unittest test_loop2_play_skill`, same worktree | 0 | 8 tests |
| M1: the line of `local-proxy` removed; the case of the dropped request | 1 | fails at its assertion, `0 != 1` |
| M2: `quality: 61` in `frames.js`; `test_loop2_play_skill` | 1 | 2 failures: the twin case and the byte-identity case |
| Link case with its output printed | 0 | the test passes, the output is the stack of `ERR_MODULE_NOT_FOUND`: finding 2 |
| Two planted directories, `--stop`, with and without `log-line.js` | 1, 1 | finding 2, finding 4 |
| Dead number and live number on a silent port, a real start, `--stop` | 0, 1 | finding 1 |
| Crafted, dropped, cut and abandoned requests at a real start | 0 | finding 3, *Trust boundary* |
| The same with `if (browserLeft) return;` removed | 0 | two `local-proxy` lines: finding 5 |
| `PATH` with neither `openssl` nor Git | 1 | one line, `OPENSSL_NOT_FOUND`, written whole to a file before the exit |
| `save-frames.mjs` on text that is no JSON | 1 | its own message |
| `prettier --check` of the script and `save-frames.mjs`, `eslint --max-warnings 0` of the script | 0, 0 | clean |
| `curl` of the two sources of the facts | 0 | HTTP 200, passages found |
| Real browser through Playwright CLI at the head | 0 | account through the form, „Rev” made and sent, `Minuta 2` then `Minuta 4`, reload `Minuta 7 … (pauza)`, „Wznów”, `Minuta 9`, then four frames at +0, +873, +1873, +2885 ms; output held the one expected `"failure":"mail"` line; `npm run local:stop` printed `Local starts stopped: 1` |

My first two runs of that browser path failed on my own script, which looked for a button named „Wyślij”; its accessible name is „Wyślij: Rev, mapa Las”. One of them pressed „Wyślij ponownie” by a loose match, which is why that run's output held two mail lines.

**Not run:**

- The full `npm test`, the orchestrator's (WAY-160), so `tests/quality/test_quality_invariants.py`, Ruff, ShellCheck, the audit and every other test stayed unchecked by me at this head.
- Any run on Linux or macOS: not available here. The sentence on `planted_name` in finding 5 is reasoned.
- Playwright MCP: the range changes nothing on that way but one sentence, and its working directory is the main checkout.
- The 773 crafted requests: see above.

**Left behind:** nothing of mine. The scratch worktree is removed, its link to `node_modules` first and the real directory intact (235 entries); the scratch files are deleted; no start or listener of mine runs. `git status --short` prints nothing in the reviewed worktree and in the main checkout. The five `%TEMP%\loop2-invariant-*` directories are the same count `review-fix-2.md` found. The other files in the scratchpad are not mine. This report is the one file written.

## Reaches beyond the dispatch

- `.runs/task-cycles/lokalny-start/reports/handoff-correction.md`, `cycle.md` by `grep`, and `gh pr view 50`: the question the remark answers, and whether finding 4 of `review-whole.md` stands in the request.
- `.the-way/foundations/decisions.md`, WAY-30 and WAY-263; `.the-way/elements/environment-facts/template.md` by `grep`, on what a passage is: to grade and to read the new fact.
- `src/server/app.ts:55`–`:119`, `src/server/log-line.ts`, `src/server/main.ts`, `src/server/account-mail.ts` by `grep`: what `main` brought and how the proxy meets it.
- `guidelines/coding.md` and `guidelines/testing.md` whole; `tests/invariants/loop2_invariant_support.py`, for `TreeCopy`.
- `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` and `playbook_code_review.md` in the vault: the owner's rules for one-off scripts and for the form of a finding.

## Searches not found or unclear

- What „to zdanie” and „D-254” mean as two things in one remark: the question held one sentence, of D-254. Read either way the sentence of D-256 changes, so nothing here turns on it. `reports/handoff-review-correction.md` gives the same reading.
- Whether a helper's answer to the agent that ran it is "a log line of its Node.js code" (D-252): unclear, as the report says. #51 left such lines plain in `scripts/`, and I read that as settling this case.
- Whether a reachable failure of the real server gives a cut response at the local start: I saw the two calls in `src/server/app.ts` and reproduced the effect on a stand-in, and did not make the real server fail there.
- *Own-work check:* `reports/correction.md` has no section of that name; I judged its *Checks* and *Seen failing* in its place.
