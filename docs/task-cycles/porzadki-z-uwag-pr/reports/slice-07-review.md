PASS ee5c375

# Review of Slice 7 (`a0ddb7d..ee5c375`) - the local proxy ends a cut-off answer and stays quiet for a browser that left

Reviewer: did not make the change. `git rev-parse HEAD` is `ee5c37543731204540db7319962f8a36f362e45a`; `git status` of the reviewed worktree is clean, before and after. Counts: 0 blocking, 2 Minor (both inside the task's scope), 0 out of scope.

## Findings

### Blocking

None.

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

## Against the task, foundation and guidelines

- Item 8: met. `fail` ends (destroys) the browser's connection after the headers and writes one `local-proxy` line with the cause through `recordFailure` -> `writeFailure` (kind, code, place only; never the message; crafted input cannot change the line - D-252, `guidelines/coding.md` "Secrets and personal data"). One line, once, where the code handles it ("Recording a failure"). Test written first, seen failing on the base (executor's claim; I confirmed the base leaves the browser waiting in the harness).
- Item 18: met; the test was seen failing with the guard removed (my run, above) and the defect is out of the reviewed worktree (it was only ever in scratch copies under `.runs/`, removed).
- Item 20: met (answer 4).
- Acceptance criterion "each test added from items 11-19 seen failing on code with the defect it catches": met for both new tests (18: guard removed fails; 8: executor's base run, harness agrees). The `failed` flag is the one part of the new code without such a test (M1).
- D-253/D-353: a browser that leaves leaves no line; consistent with D-353's reasoning for the account server.
- Trust boundary (`scripts/local-start.mjs`): hostile input checked at it. The request path, method and headers reach `httpRequest` exactly as before (headers stripped by `upstreamHeaders`); the failure line carries only `name` and `code` of an error that matches `kindWord` / `codeWord` (`src/server/log-line.ts`). The new `response.once("error", fail)` handler cannot be fed by a browser except by leaving, which `browserLeft` silences. Nothing new for the browser to steer.
- Tests (`guidelines/testing.md`): real command and real built writer, a stand-in server only for the failure it must give (the guideline allows controlled responses to force failures, D-84); waits on conditions with a limit (`wait_until`, `HTTP_TIMEOUT`), no fixed sleep as proof; processes closed through `self.starts`. The assertions are against independent expectations (status line, bytes, the terminator, the line count, the code `ECONNRESET`).
- Changed invariant tests: `tests/invariants/test_local_start_access.py` (invariant `local-start-access`) is changed - two cases added to class `LocalStart`, two helpers and two stand-ins, docstrings. No existing case was weakened; the invariant's own cases (`LocalStartBoundary`, `test_both_ports_listen_on_this_computer_alone`) are unchanged.
- Foundation entries the change writes: none. `foundations/` is not in the diff.
- A reserved choice: none taken.

## Declined to judge

- `void recordFailure(...)` is never awaited and its rejection (a missing writer in `dist`) would be an unhandled rejection: unchanged from the base, outside the task.
- The shape of `fail` for an upload error after a finished answer (harness scenario E showed no difference): unchanged in effect, outside the task.
- Whether `http.request`'s default agent reuses sockets (keep-alive) and what that means for a cut answer: no effect seen on any scenario; outside the task.
- Preexisting 102-character line `:482` (slice 6) and the module's docstring grown to a list: outside this slice's change.

## Checks run (command and exit code)

All in separate copies of `ee5c375` under `.runs/review-wt-{a,b,c}` (git worktrees with `node_modules` junction), removed afterwards; the reviewed worktree was not edited.

| Check | Command | Exit | Result |
|---|---|---|---|
| Whole file at head | `python -B scripts/test.py tests/invariants/test_local_start_access.py` (copy a) | 0 | `Ran 20 tests in 167.044s OK` |
| Item 18 and item 8 with the guard removed (`if (failed) return;`) | `python -B -m unittest test_local_start_access.LocalStart.<test 18> .<test 8>` in `tests/invariants` of copy b | 1 | test 18 FAIL `2 != 1` (two `local-proxy` lines); test 8 passes |
| Same two tests with the `failed` flag removed (`if (browserLeft) return;`) | same command in copy c | 0 | `Ran 2 tests ... OK` - the flag is unprotected (M1) |
| Pinned ruff | `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache tests/invariants/test_local_start_access.py` | 0 | All checks passed |
| Prettier | `npx prettier --check scripts/local-start.mjs` | 0 | style OK |
| ESLint | `npx eslint scripts/local-start.mjs` | 0 | no output |
| Proxy harness | `node run.mjs base` / `node run.mjs head` / `headlog` / `run2.mjs` / `run4.mjs` (scratchpad; function text extracted with `git show <sha>:scripts/local-start.mjs`, plain HTTP, stubbed `recordFailure`) | 0 | scenarios in "Questions of risk" |

Not run: `npm test` without arguments and `foundation_check.py` (the cycle's job); the harness is not the real command over TLS (see answer 2); the guard-removed run of the full file (only the two new tests were run with the mutations).

## Reaches beyond the handoff

- `guidelines/testing.md` read in full via `grep`-guided passages (lines 44-125, 325-364) rather than whole line by line for its other sections; why: select the rules that this change reaches (levels, doubles, waits).
- `package.json`, `scripts/test.py`, `tests/invariants/loop2_invariant_support.py` (`TreeCopy`): how a single test is run and what the copy contains; why: to run the mutation in a separate checkout.
- `D-353` and `D-354` read as the handoff names; `ruff.toml` read for the rules; nothing else.

## Searches not found or unclear

- `npm test -- <file>` runs the whole file and takes no selector; the mutation runs used `python -B -m unittest <dotted names>` from `tests/invariants/`, which is the same loader without the wrapper. Not a fault.
- The plan's line numbers (`:162`-`:188`, `:467`-`:480`) refer to the base before Slice 6; found by name. Unclear to the reviewer only in that the handoff does not say so.
