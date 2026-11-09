# Handoff - review of the whole change (`review-change`, the whole change)

## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval.
You did not make any part of this change. You alone grade and scope your findings: this handoff names no finding wrong, Minor or outside the scope.
You are read-only with regard to tracked files: change none, and leave no temporary edit of a tracked file behind (a defect you put in to see a test fail is taken out again, and the report says so;
a temporary checkout goes under `.runs/` and is removed again). You never ask the human; a question to the orchestrator stands in your report.
Finish all your own background work before you return.

## What you review

- Worktree: `the root of the repository`, branch `task/porzadki-z-uwag-pr`. Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- The whole change: the range `00aa818..c1b371d` (compute it yourself: `git diff 00aa818..c1b371d`, `git log 00aa818..c1b371d`; confirm that `git rev-parse HEAD` is `c1b371d`). The task branch's base is `00aa818` (`main`).
- Method: read `.the-way/task-cycle/review/SKILL.md` whole and then `.the-way/task-cycle/review/whole_change.md` whole, and follow them. `fix.md` does not apply.
  You select your own foundation entries and guideline files by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` and `.the-way/product-guidelines/reading.md`, each whole. The part map is `foundations/part_map.md`.
- The frozen task, read whole: `.runs/task-cycles/porzadki-z-uwag-pr/task.md` (`Status: ready for cycle`; its *Settlements to record* rows 1-3 were accepted by the human, and its *Questions to settle* answered by the human).
- The plan, read whole: `.runs/task-cycles/porzadki-z-uwag-pr/plan.md` (12 slices plus the foundation step; the Models of Slices 6, 7, 10 and 12 were raised by the orchestrator; there is no spec).
- The cycle's answers at start: trust boundary - **yes** (`src/server/**`, `src/browser/sim/saved-game.ts`, `scripts/local-start.mjs`): check crafted input at those boundaries. Irreversible operation - **no** (the cycle prepares and never performs one; item 26 writes commands for a human into a skill, and nothing runs them).
- No product gate was run on the head yet; the orchestrator runs it after this review. Run only focused checks.
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/whole-change-review.md`. Its first line is `PASS c1b371d` or `FAIL c1b371d` (or `questions`). For each blocking finding name the slice it comes from by its number and commit, or say that it spans slices and name them, or that it comes from none.

## The slices, their ranges and whether each had a review of its own

| Slice | Range | Review of its own | Executor's report (claims to verify, not evidence) |
|---|---|---|---|
| Foundation entries | `00aa818..0277f8a` | none (judged by this review); none | `reports/04-foundation-report.md` |
| 1 | `0277f8a..048b4b8` | none (judged by this review); none | `reports/slice-01-report.md` |
| 2 | `048b4b8..2a58095` | own review PASS; `reports/slice-02-review.md` | `reports/slice-02-report.md` |
| 3 | `2a58095..6d18fb2` | own review PASS; `reports/slice-03-review.md` | `reports/slice-03-report.md` |
| 4 | `6d18fb2..b6c70d1` | own review PASS; `reports/slice-04-review.md` | `reports/slice-04-report.md` |
| 5 | `b6c70d1..23f7e43` | own review PASS; `reports/slice-05-review.md` | `reports/slice-05-report.md` |
| 6 | `23f7e43..a0ddb7d` | own review PASS; `reports/slice-06-review.md` | `reports/slice-06-report.md` |
| 7 | `a0ddb7d..ee5c375` | own review PASS; `reports/slice-07-review.md` | `reports/slice-07-report.md` |
| 8 | `ee5c375..378259f` | none (judged by this review); none | `reports/slice-08-report.md` |
| 9 | `378259f..f7f0726` | own review PASS; `reports/slice-09-review.md` | `reports/slice-09-report.md` |
| 10 | `f7f0726..098a708` | none (judged by this review); none | `reports/slice-10-report.md` |
| 11 | `098a708..2e884d1` | none (judged by this review); none | `reports/slice-11-report.md` |
| 12 | `2e884d1..c1b371d` | none (judged by this review); none | `reports/slice-12-report.md` |

Reports live under `.runs/task-cycles/porzadki-z-uwag-pr/reports/`. Judge every slice that had no review of its own (Foundation entries, 1, 8, 10, 11, 12) as a slice review judges a slice, its executor's own-work check included.
Mismatches the orchestrator's mechanical check passed on, for those slices: Slice 1 also fixed a second cookie loop of `tests/account-storage.test.mjs` and added a gate on `argon2.verify` in the disconnect case, both beyond the handoff;
Slice 10 removed two rows of an existing case that listed the link fragments as addresses with no screen (D-352 reverses them) and no test proves `browserAddress().reload()` itself (jsdom cannot); Slice 11's executor reports that D-253 says
`measure-passwords` already has a last-resort handler while the code has none (a mismatch from before this task), and that the container-level docker calls do not name their step; Slice 12 also changed the same prohibition in `SKILL.md` and `troubleshooting.md` from a plain volume prune to `docker volume prune --all`.
The orchestrator's own checks: `npm run typecheck` exit 0, eslint and prettier on the files of Slice 10 clean, ruff of the pinned venv on `tests/invariants/test_local_start_access.py` clean (before Slice 7).

## The Minor and out-of-scope findings of the slice reviews (word for word; grade each as a finding of this review, and say which lie outside the task)

### Slice 2 - `reports/slice-02-review.md`

## Minor findings

1. **Inside the task, Minor.** `tests/account-backup.test.mjs` (the new case, last assertion, "the temporary copy is left in place", one entry in `box.temporary`). The stand-in's `rm` throws without removing anything, so the directory stays by construction of the stand-in, not because of anything the command does. The assertion cannot fail through a defect of `account-backup.ts`; it only documents the sentence's claim. Harmless (the other assertions carry the case: exit 1, whole backup, one JSON line with the new name, the sentence, no "No backup was made", no path on standard error), and it is the only way to show the claim without an unremovable directory on Windows.
2. **Outside the task (plan-mandated), Minor.** `.claude/skills/loop2-deploy/references/backup_and_restore.md:58`, row for exit 6: "`docker` 1: ... or a failed backup; Docker's own text stands in the line before it in the log and says which". The new case (docker exit 1 after a whole backup, cleanup failed) is a "failed backup" only in a loose sense, and the log line that says which is now the command's own stderr (`backup-cleanup` JSON line plus the sentence), not Docker's text. The plan's Choices keep the skill unchanged for this slice, so this is the executor's question 2; a later slice or task may add one clause.

### Slice 3 - `reports/slice-03-review.md`

### Minor 1 - the test's fault comment names a fault the test cannot show
`tests\http.test.mjs:4253-4255` (the comment of the new case) says the case guards against "a server that never reads the partial body, which the arrival wait below would show as a hang". The wait is `f.listening.once("request", ...)`, which fires when the request headers arrive, whatever the body parser does. A server that never reads the body would still pass: the connection closes, no failure line is written, the 401 check passes. The case therefore protects only against "the break-off answered as a server failure, with its line written", the first fault of the comment. Why it matters: a later reader trusts a protection that is not there. Evidence: reading of the wait; no run reproduces it. Fix: drop the second fault from the comment.

### Minor 2 - nothing in the case proves the body parser was reading when the client broke the connection
After `await arrived` the case destroys the client at once. The `request` event proves only the headers arrived; the session middleware still runs before the body parser attaches its listeners. If the connection were broken before the parser attached, no error would reach the handler at all and the case would pass vacuously on the head. Measured, not only argued: on the base (`app.ts` of `2a58095`) the case failed 15 of 15 runs with the line `{"failure":"request","kind":"BadRequestError","code":"ECONNABORTED","place":"app.errors"}`, and on the head it passed 10 of 10, so on this machine the order holds. A probe with a 300 ms delay before the parser (scratch, not in the repo) showed the other order: the handler is not reached and nothing is logged, so a slow machine could make the case green without touching the change. A stronger anchor would wait for a first body byte to be consumed; the fixture has no such hook. The risk is a vacuous pass, not a flaky red, and the base shows red every time, so it does not block.

### Minor 3 - the status 400 and the answer are not checked by any test
The case checks the absence of the line and that the server still answers afterwards. The status 400 and "Invalid request body" are read from the code only. This is unavoidable by a socket test: I sent a half-close (FIN) after a partial body through a raw socket on both base and head, and the client got Node's own `400 Bad Request` with no body on both (the handler's answer is written to a socket that is already closing). So the test cannot see the handler's answer and the executor did not claim it. Mutation to consider: the group mapping to 400 replaced by a branch that keeps 500 but skips the line would pass the case; D-353 requires only "no failure line", so this is polish.

### Slice 4 - `reports/slice-04-review.md`

### Minor

1. **`tests/account-storage.test.mjs` (new case "a session write refused because the account is blocked says so...") pins the message text.** It asserts `assert.match(hash.message, /cannot be replaced/)` and the same for `held` and `bare`. The guideline "Behaviour, not implementation" (`guidelines/testing.md`) says not to fix the exact text of a refusal without a requirement that sets it. Here the slice itself chose to keep the message so that older cases keep matching, and the check is a loose regex, so a reword would fail the case without any behaviour changing. Effect: a later reword of the message needs a test edit it should not need. Inside the task, not blocking.
2. **Guideline and test list that describe the write are not updated.** `guidelines/coding-database-access.md` ("Stan konta w instrukcji zapisu") says the block is read "w tej samej instrukcji"; the write now also reads it in the same transaction when the statement stored nothing. The sentence stays true. The `src/server/` row of "Trust boundaries" in `guidelines/testing.md` lists the cases that guard `blocked-account-access` and `account-session-storage`-adjacent behaviour but not the new ones. Both files are outside this slice's *Change* list and the executor reported both; they belong to the cycle's return step. Outside this slice's files (not blocking).
3. **The two http cases answer the held message twice.** In the first case the `finally` answers `f.mailer.held` and `endWaitingRegistration` answers the same entries again. A second call of a resolver is harmless (the case passes and was run 4 times), so only noise. Inside the task, Minor.

### Open point of the executor: `establishSession` (outside the task's scope, not a defect of this slice)

`src/server/account-routes.ts:193`-`:222` (`establishSession`) writes `{"failure":"session",...,"place":"account-routes.establishSession"}` and answers 503 when its own `save` fails. It now receives `BlockedSessionRefusal` for a block that came before the first store, and still writes that line and answers 503. Compared with the base `6d18fb2`: identical behaviour (the base error was the plain `Error("Session cannot be replaced")` with the same handling; nothing in `establishSession` or `signIn` changed). Settlement 2 / D-353 name "a session write refused because the account was blocked while its registration was in progress"; To do 10 and the task passage `task.md:44` say "blokada konta, która zapadnie w trakcie wysyłki maila przy rejestracji" and cite `account-routes.ts:706`-`:724`, which is the registration's wait on its message, i.e. the end-of-response write that `app.ts` handles. The first store runs right after `createAccount` with no await of mail between (the registration has not yet been waiting on any message), so it is outside the stretch the task names. A login whose account is blocked between the password check and the first store is a login, not a registration, and the 503 there is the existing answer. I judge it outside the task's scope and not a missed requirement. It would be a separate decision if the human wants the first store treated like the end write. Out of scope.

### Slice 5 - `reports/slice-05-review.md`

### Minor (in scope)

1. **`tests/http.test.mjs`, the guard-1 test (about line 4740 on): the restore of `ServerResponse.prototype.destroy` leaves an own property behind.** `destroy` is defined on `OutgoingMessage.prototype`, not on `ServerResponse.prototype` (checked: `Object.hasOwn(ServerResponse.prototype, "destroy")` is `false`, `Object.hasOwn(OutgoingMessage.prototype, "destroy")` is `true`, Node v24.17.0). The test reads the inherited function, assigns a wrapper as an own property, and in `t.after` assigns the inherited function back as an own property. After the test `ServerResponse.prototype` carries an own `destroy` that is the same function, so behaviour is unchanged, but the prototype is not the one the test found. Why it matters: the testing guideline asks to clean up even after failure, and a later case that looks at where `destroy` lives would see the difference. Today nothing does, and the file's cases run one after another. Evidence: the property check above; no other test in `tests/*.mjs` touches `ServerResponse` (grep).
2. **The guard-1 test is a call check, which narrows what it protects (see the departure below).** It records every call of `ServerResponse.prototype.destroy` and asserts there is none. It fails for the defect the plan names (guard turned into plain `destroy()`, run below), and it also passes if the whole `destroy` line is removed or replaced by an unguarded `response.socket.destroy()`. The first is the other branch of the guard and not part of To do 17; the second is a different defect from the one the slice names. Not blocking, because the plan's defect is caught and the effect the guard is for cannot be seen on this host.

### Departure from the testing guideline: call check for guard 1 (graded above as Minor 2)

`guidelines/testing.md`, recipe integration test, "Doubles": a call is checked "only for an effect visible outside the product". The guard keeps an answer already ended whole; the effect is a cut-off answer at the client. The executor reports it cannot be seen on this Windows host (the answer's bytes are with the kernel when the session callback runs). I did not re-derive that mechanism and could not run a Linux host (`wsl -l -v` shows only `docker-desktop`, stopped; no Docker daemon), so whether a cut is visible on Linux is unverified by me too.

My judgement: the departure is sound enough to accept, for these reasons.
- The call is made on the real response of a real HTTP request, with the real session store failing through a real trigger; only `destroy` is wrapped, and the wrapper passes every call on unchanged. Nothing of the product is replaced.
- Closing the client's connection is an effect outside the product in general; what is missing here is only that this host does not let a small answer show the difference. The guard is defined by the call (`response.destroy()` skipped when `writableEnded`), so the call is the behaviour the guard has.
- Without it the guard has no test at all and the acceptance criterion (each added test seen once failing on the defect) could not be met; the alternative the executor named, a Linux run, is not available.
- The test says in its own comment that it is a departure and why.

Cost if wrong: a refactor that keeps the answer whole by another path still passes (correct), and one that cuts it by another path (`socket.destroy()`) is missed. The orchestrator should carry the departure into the request description so the human sees it; this is a recommendation, not a requirement of the review.

### Slice 6 - `reports/slice-06-review.md`

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

### Slice 7 - `reports/slice-07-review.md`

### Minor (inside the task's scope)

**M1. The `failed` flag in `fail` is protected by no test, and the executor's own-work claim that the cut-off test covers it is false.**
- Place: `scripts/local-start.mjs:184-186` (`if (browserLeft || failed) return; failed = true;`); the test `tests/invariants/test_local_start_access.py:571-587`; claim in `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-07-report.md`, Own-work check ("the cut-off test asserts exactly one line, which covers the double firing (only the `failed` flag makes that single if both events fire)").
- What is wrong: in the cut-off test the stand-in does `request.socket.destroy()` (a FIN). I traced this with the proxy function extracted from the head commit (scratch harness, plain HTTP, stubbed `recordFailure`): then only the response's `error` fires, `fail` is called once. So the one-line assertion passes with or without the flag. When the server resets (`resetAndDestroy()`, an RST) both events fire: `fail` is called twice, the second time with `failed=true`, and the flag keeps it to one line. That path is real and it is what the item's own complaint class ("one failure, two lines") is about, but no test reaches it.
- Evidence: a copy of the head commit with the flag taken out of the guard (`if (browserLeft) return;`) passes both new tests (`Ran 2 tests ... OK`, exit 0, see Checks). No test fails when the flag is removed.
- Why only Minor: the code is correct on the traced paths, the plan and task item 8 name no test for the double firing, and the acceptance criterion asks only that each test added be seen failing on the defect it catches (met for both). A third stand-in that resets, or a reset in `CUT_OFF_SERVER`, would close it.

**M2. Two lines of the new test code lost their line continuation and are 169 and 183 characters long.**
- Place: `tests/invariants/test_local_start_access.py:162` (`answer_until_end`) and `:598` (the test of item 18): `with socket.create_connection(...) as raw,             context.wrap_socket(...) as secure:` - the `\` and newline that `exchange` (`:140-141`) keeps are replaced by a run of spaces. Every other new line of the file is within 100 characters (`:317` is 101).
- Why it matters: the code is valid and the pinned ruff passes (the style is not among the blocking rules), but a reader gets a line that runs off the screen, with a gap in the middle, in a file whose existing `with` statements use the broken form.
- Evidence: `awk 'length>100'` on the file lists 162 (169), 317 (101), 482 (102, slice 6's, not this slice), 598 (183).

### Questions of risk (answers)

1. **Lines when the server breaks off after the headers.** One line, in both ways it can end. Scratch harness (the exact text of `proxyRequest` from `ee5c375` and from `a0ddb7d`, run against stand-in servers):
   - server `socket.destroy()` after headers + `partial` (chunked, and with `content-length: 100`): only the response's `error` fires (`ECONNRESET`, "aborted"); 1 line; the browser's side ends after `7\r\npartial\r\n`, no closing chunk (a cut, not a whole-looking answer). The base left the browser's connection open (`ended:false closed:false`), 0 lines.
   - server `resetAndDestroy()` after the headers: the request's `error` and the response's `error` both fire; `fail` is called twice, the second with `failed=true`; 1 line. So the flag does what it is for (see M1 for the missing test).
   - What the browser's connection sees: `outgoing.destroy()` closes the socket without a closing chunk; over TLS Python's `recv` gets an `SSLError`/EOF, which `answer_until_end` accepts as "ended"; the `0\r\n\r\n` check then proves it is not a whole answer.
2. **Browser leaves while the server is mid-answer.** Traced and run. In `proxyRequest` the `close` handler of `outgoing` sets `browserLeft = true` and only then calls `upstream.destroy()`; the response's `error` ("aborted", `ECONNRESET`) is emitted as a consequence of that destroy, so `fail` runs after `browserLeft` is set. Harness with an instrumented `fail` (a scratch copy printing its state): browser closes at 200 ms while the server is mid-answer: `fail called ECONNRESET browserLeft=true failed=false`, 0 lines. Server cuts and browser leaves at the same instant (both at 200 ms): `browserLeft=true`, 0 lines. Browser leaves before the headers: 0 lines (as in the base). A fail that runs before `browserLeft` is set can only come from a failure of the server that really came first, which is a genuine failure line. Not run: the same combination through the real command over TLS (no test of it exists; the argument and the harness are on the same function text).
3. **The test of item 18 and the guard.** I put the defect in a separate copy of the head commit (the guard `browserLeft ||` removed from `fail`): the test fails with `AssertionError: 2 != 1` and the log shows `held /hold`, `closed /hold` and two `local-proxy` lines (`ECONNRESET`), one from the held request of the browser that left, one from `/drop`. The cut-off test passes with that defect (it does not depend on the guard). With the guard in, the same test passes (full file run, 20 tests OK). So it fails because of the guard: the extra line is written by `fail` for the request the browser left. A possible reason to pass with the guard in place for another reason: the assertion is made when the first `local-proxy` line appears (`wait_until(proxy_lines)`), not when the `/drop` line has appeared. With the defect the stray line is already there (it comes right after `closed /hold`, before the `/drop` request), and the `/drop` line is written by `recordFailure` before the 502 reaches Python (`void recordFailure(...)` runs before `writeHead(502)`; its first `await` is a cached module), so the count read afterwards sees both. I did not find a way for the test to pass falsely with the defect, but the margin rests on that order, not on a wait for the second line. Not a finding.
4. **Docstrings of item 20.** Checked against every test of the file. `LocalStartBoundary`: both cases use `STAND_IN_SERVER` (the module text names "the case of the headers", singular; the second case, `:312`, also uses the stand-in; the sentence "The other cases run the real built server" stays true). `LocalStart` stand-in cases: start on its way up (`BUSY_SERVER`, `:432`), stop with no built game (`STAND_IN_SERVER`, `:482`, and no `log-line.js` built, as the docstring says), dropped request (`DROPPING_SERVER`), cut-off answer (`CUT_OFF_SERVER`), held request (`HOLDING_SERVER`) = the five the class docstring counts. All other `LocalStart` cases call `self.local()` (the real `npm run local`) or `npm run build` and the real server (`:521`, `:543`). Each statement is true for every case of the file; the count "five" will go stale with the next stand-in case, which is a maintenance note, not a defect.
5. **Pre-header 502 path, `upstreamHeaders`, `local-start-access`.** The diff does not touch `upstreamHeaders`, `isProxyHeader`, the `httpRequest` options, the listen host or the port; pre-header behaviour is unchanged (`recordFailure`, then `writeHead(502)`, `end()`; harness scenario "server drops before headers": 1 line, 502, whole chunked answer, identical on base and head). The invariant `local-start-access` test (class `LocalStartBoundary` and `test_both_ports_listen_on_this_computer_alone`) passes in the full file run. The one behaviour change outside the slice's intent: a request error that arrives after the headers were sent now destroys the browser's connection where it used to `end()` it; that is the item's intent (a cut answer), and a request error after a complete answer did not fire in harness scenario E (early 413 with `content-length`, then the server destroys its socket while the browser uploads): 0 lines, whole answer, base and head the same.

### Slice 9 - `reports/slice-09-review.md`

### Minor

1. **Minor, outside the task's scope.** `src/browser/sim/saved-game.ts:512`, `if (id >= nextCharacterId || ids.has(id)) refuse();`. StrykerJS leaves one mutant alive on the lines the slice guards: `id >= nextCharacterId` turned into `id > nextCharacterId`. No test refuses a document whose character has exactly the number `nextCharacterId` while the rest of it is sound. The existing case "a character's number reaching the next one" (`tests/sim/saved-game.test.mjs:1148`) sets `nextCharacterId = 2` while Ewa has number 3, so it is refused even with `>`; it does not isolate the fault. Classification: real gap. Why it matters: a load that takes such a document would later give the next new character a number already held. Why outside the task: task.md To do 13 names the counter check only for programs (`:484`, killed); for characters it names only the duplicate (`:512` `ids.has(id)`, killed). Fix would be one test on the clean base `HEADQUARTERS` with `nextCharacterId` 1. Evidence: Stryker output below.
2. **Minor, within the task.** `tests/sim/saved-game.test.mjs` (new test "a chest holding exactly its capacity loads, and one piece beyond it is refused as shape", comment at about line 1776). It holds a refusal of a crafted document at the `save-version` boundary but carries no `// invariant: save-version` tag, while the other four refusal tests of the slice and the existing refusal tests carry it (`guidelines/testing.md`, Trust boundaries: a refusal test is tagged with its invariant). The test with the same tag gap, "a completion depositing exactly the planned counts loads", only loads and asserts no refusal, so it needs none. Does not change what the tests catch; the grade is Minor because the saved-game boundary keeps its tagged tests elsewhere.

Not findings (checked):
- The chest test writes the literal 60 for `chestCapacity` (`src/browser/sim/data/balance.ts`). The comment names the source, as "Where the expected value comes from" asks; a balance parameter may use concrete numbers (D-80). A later change of the capacity would redden the test and the author would update both, which is the intended coupling.
- No assertion pins refusal wording, an internal index or an order. `assertRefused` compares the reason code `shape`, which the saved-game guideline and D-213 fix as the contract; the free text names only the failure message.


## Questions of risk the orchestrator asks, beside the full scope of the review

These are questions to compute or trace, not suspicions. The review covers the whole range regardless of them:

- Take items 1-32 of *To do* and rows 1-3 of *Settlements to record* one by one: which commit meets each, by what evidence, and does anything the change adds go beyond the task or take from its sources something altered or invented? Item 4 has no commit: is the base run (`reports/base-item4.log`, in `.runs/task-cycles/porzadki-z-uwag-pr/`) enough evidence for it?
- The new decisions D-352, D-353, D-354, the rule "Recording a failure" in `guidelines/coding.md` and the wrap of D-254: do they say what the code now does and no more? Compare the wrap of D-254 with its previous text by word (`git diff --word-diff`) and say whether any word changed. Does the rule follow `.the-way/product-guidelines/template.md` and the coding template?
- The slices share files (`src/server/app.ts` and `tests/http.test.mjs` in Slices 1, 3, 4, 5; `scripts/local-start.mjs` and `tests/invariants/test_local_start_access.py` in 6 and 7; the deploy skill in 11 and 12). Do the combined edits agree with each other, and does the final tree of those files carry a leftover (an unused helper or import, a patch of a global that another case now sees, a doubled comment)?
- The reload of Slice 10: after `location.reload()` with the fragment in the address, can the reloaded page loop (read the token, still leave the fragment, reload again) or lose a link that was not meant to be lost? Trace the start of the page for both fragments.
- Slice 4's classification of a refused session write and Slice 3's 400 for a broken-off body: with both in place, is every other failure of the server still written once with its cause, and are D-353's two named cases the only ones silenced?
- The skill text of Slice 12 (both copies): are statements about Docker only as strong as the excerpts in `reports/05-docker-docs-excerpts.md`, and does the changed paste block still let a human set the password without the next pasted line becoming it? Are all references to renamed steps (M1-M4, S1/S2) followed in `SKILL.md`, `troubleshooting.md`, `backup_and_restore.md`, and the tests of `tests/agent_workflow/` and `tests/invariants/`?
- Run the focused tests of the changed test files once each (not the gate), and `python -B .the-way/elements/common/foundation_check.py`.

## What to return

The report's first line, then: findings graded and scoped (blocking with their slice, Minor with place and own words and where they lie outside the task), the coverage table of items 1-32 and rows 1-3, a section on source fidelity, a section on the slices that had no review of their own, and a section on the Minor and out-of-scope findings of the slice reviews you were given, each graded again by you.
Name any changed invariant test. The checks you ran as command and exit code. Every reach beyond this handoff (what, where, why). **Searches not found or unclear** (each thing you looked for and did not find, or that was unclear, or `none`).
Return to the orchestrator only: the first line of the report, a one-line check result naming what failed or did not run, and the report path.
