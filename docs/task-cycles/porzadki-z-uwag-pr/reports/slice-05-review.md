PASS 23f7e43230745cad85d43ad626c108fb1d585170

# Review of Slice 5 - tests of the server's two guards for an error after the answer began

Range `b6c70d1..23f7e43` (two commits, `4dbd144` and `23f7e43`), worktree `the root of the repository`. `git rev-parse HEAD` is `23f7e43230745cad85d43ad626c108fb1d585170`. The diff touches `tests/http.test.mjs` only (+121 -1); no product file changed (`git diff --stat`). Counts: blocking 0, Minor 2 (both in scope), out of scope 0.

## Findings

### Blocking

None.

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

## Answers to the orchestrator's questions of risk

1. **Patches restored, leaks, concurrency.** Guard 2 patches `fs.createReadStream` and restores it in `t.after`; guard 1 wraps `ServerResponse.prototype.destroy` and restores it in `t.after`. `t.after` runs after a pass, a failure and a timeout of the test, so every path restores (the patch is set after `accountFixture` and `captureLog`, and nothing between registering `t.after` and the patch can throw). I found no `concurrency` option in `tests/http.test.mjs`, `scripts/test-node-file.mjs` or `scripts/test.py`; `node:test` runs the cases of one file one after another, and each file runs in its own process, so a patch cannot reach another case in flight. Residue: Minor 1 (own `destroy` property). The `fs.createReadStream` replacement ignores its arguments, so it replaces every read stream opened while the case runs; during the case only the static route opens one. Seen: `npm test -- tests/http.test.mjs` twice, both exit 0, 78 of 78; the two new cases alone (`node --test --test-name-pattern=...`) exit 0, 2 of 2.
2. **Each guard taken out (in a copy under `.runs/review-s5-tmp`, compiled `dist/server/app.js`, junction to `node_modules`; removed again).**
   - Guard 1 `if (!response.writableEnded)` replaced by `if (true)`: guard-1 test fails with `no destroy of an answer that has ended`, `actual: [ { writableEnded: true } ]`; guard-2 test passes. Fails for the reason the slice names. Could it pass for another reason: yes, if the destroy line is removed altogether (Minor 2); Node itself does not call `ServerResponse.prototype.destroy` on this path (the test passes on correct code with the wrapper recording).
   - Guard 2 branch removed: guard-2 test fails; the log holds Express's own `Error [ERR_HTTP_HEADERS_SENT]` stack line after the expected `app.errors` line. The route did reach the error handler first (the `request / app.errors` line is present).
   - Guard 2 `next()` turned into `next(error)`: guard-2 test fails; the log holds the stack of `synthetic read fault`.
   - Guard 2 `response.destroy()` removed (keeping `next()`): guard-2 test fails after 5177 ms, the deadline of `getUntilClosed` firing because the connection is left open.
   - Unmutated copy: both cases pass.
3. **The call-check departure:** judged above; Minor, not blocking.
4. **Does the guard-2 route reach the `headersSent` branch, and what does it assert?** Yes. `fs.createReadStream` is replaced for the case by a `Readable` that pushes 1 KiB and then destroys itself with an error once the client has received data (`firstBytes` is resolved by the client's `data` event, a condition and not a fixed delay, D-84). `GET /main.js` goes through the real app and `express.static`; `serve-static` forwards the stream error to `next(err)`, so it reaches the `errors` handler after the answer began (mutation A shows both the `app.errors` line and, with the branch gone, the failure at `setHeader`). Assertions: status 200 (answer began), `complete === false` (cut, not ended), and the whole captured log deep-equals one line `{ failure: "request", kind: "Error", code: "none", place: "app.errors" }`. Because the capture holds every console line, a stack line from Express's handler or a second line would make the comparison fail, as mutations A and B show. The text of the error is absent from the expected line, matching D-252 and the guideline "Secrets and personal data".

## Against the task, foundation and guidelines

- Task To do 17: both guards have a test on real HTTP. Guard 2 observes the cut; guard 1 observes the call (departure above).
- Acceptance "each test added from items 11-19 seen once failing on code with the defect": the executor's report gives the runs; I reproduced the failing runs above for both tests (guard 1 once, guard 2 three ways).
- No product file changed, as the slice requires.
- D-252 / `coding.md` "Secrets and personal data": the expected log line carries no message or stack; the faults in the comment are named. D-353 not touched. D-84: waiting is on a condition (`firstBytes`, `waitFor` in `settledLog`) with a deadline (5 s in the helper, 20 s per case); servers and temporary files are cleaned by the fixture's `t.after`, and the patches by their own `t.after`. D-138 (session store failure is a failure) consistent with the existing line shape `failedRenewal`.
- Trust boundary (`src/server/**`): the new tests add no crafted input; they reuse `proxyHeaders`, the existing account fixture and the existing `refusingRenewal` trigger. No hostile-input check is missing for what the slice does.
- Irreversible operation: none.
- Reserved choice: none (no new library; `node:fs`, `node:stream`, `node:http` only).
- Linter / formatter (`coding.md`): `npx prettier --check tests/http.test.mjs` exit 0; `npx eslint tests/http.test.mjs` exit 0; `git diff --check` exit 0; file is LF, UTF-8.
- Language of code (instructions): identifiers, comments and test titles in English.
- No invariant test changed.
- Plan line numbers differ from the code (`:68` is `:72`, `:109-:113` is `:115-:119` at the base); the executor reported it; harmless.

## Declined to judge

- A test that `destroy` IS called when the answer has not ended (the other branch of the callback's `if`): outside To do 17, which names only the `writableEnded` guard.
- Whether a cut-off answer is visible on a Linux host for guard 1: no Linux available to me; outside what this change claims.
- The executor's reading of the Windows socket state (`attached=false`): not re-derived; the review rests on the call check and its mutation runs, not on that mechanism.

## Checks run (command and exit code)

1. `git rev-parse HEAD`: `23f7e43230745cad85d43ad626c108fb1d585170`; `git status --short`: clean before and after.
2. `npm test -- tests/http.test.mjs` (run 1): exit 0, 78 of 78 pass.
3. `npm test -- tests/http.test.mjs` (run 2): exit 0, 78 of 78 pass.
4. `node --test --test-name-pattern="read breaks off|failed renewal after an answer that has ended" tests/http.test.mjs`: exit 0, 2 of 2.
5. Guard 1 mutation (`if (true)`), same focused command in the copy: exit 1, guard-1 test fails, guard-2 passes.
6. Guard 2 mutation A (branch removed): exit 1, guard-2 test fails, guard-1 passes.
7. Guard 2 mutation B (`next(error)`): exit 1, guard-2 test fails, guard-1 passes.
8. Guard 2 mutation C (no `destroy`): exit 1, guard-2 test fails (5177 ms), guard-1 passes.
9. Unmutated copy: exit 0, 2 of 2.
10. `npx prettier --check tests/http.test.mjs`: exit 0. `npx eslint tests/http.test.mjs`: exit 0. `git diff b6c70d1..23f7e43 --check`: exit 0.
11. `node -e` property check of `ServerResponse.prototype.destroy` ownership: `false true` (Node v24.17.0).

Not run: the full `npm test` and `foundation_check.py` (the cycle's own run); a Linux run (no host available). The logs of the runs are in `a temporary directory outside the repository` (`r1.log`, `r2.log`, `r3.log`, `m1.log`, `mA.log`, `mB.log`, `mC.log`, `mOK.log`).

Temporary state: the mutations were made in a copy of the compiled `dist/server/app.js` under `.runs/review-s5-tmp` (with a junction to `node_modules`); the junction was removed first with `rmdir` and then the directory; `Test-Path` is `False`, and `node_modules\argon2` still exists. `npm test` rebuilt the ignored `dist/` of the worktree twice, as that command does; no tracked file changed.

## Reaches beyond the handoff (what, where, why)

- `a temporary output file of the agent harness`: the saved output of `cat guidelines/testing.md`, read whole because the tool truncated the first print.
- `tests/http.test.mjs` fixture and helper regions (`accountFixture`, `readAccount`, `captureLog`, `refusingRenewal`, `settledLog`, lines 225-470, 2755-2800, 4540-4650): to judge what the new cases reuse; not the whole file.
- `scripts/test-node-file.mjs`, `scripts/test.py` (grep for `concurrency`): to answer whether cases run concurrently.
- `dist/server/app.js`: the compiled counterpart of `src/server/app.ts`, mutated in the copy.
- `wsl -l -v`: to see whether a Linux host exists.

## Searches not found or unclear

- A Linux host to run the guard-1 defect: not found (only a stopped `docker-desktop` WSL distribution); so the visibility of a cut-off answer on Linux is unverified.
- The executor's explanation of why the answer's socket is already detached at the session callback on this host: unclear and not re-derived by me.
- A `concurrency` setting for `node:test` in `tests/http.test.mjs` and the test scripts: none found (searched with grep); the default is sequential within a file.
