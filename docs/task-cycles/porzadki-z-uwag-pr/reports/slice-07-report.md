# Slice 7 report - the local proxy ends a cut-off answer and stays quiet for a browser that left

**Status:** done

**Commit:** `ee5c375` (range `a0ddb7d..ee5c375`), branch `task/porzadki-z-uwag-pr`.

## Files changed

| File | Added | Removed |
|---|---|---|
| `scripts/local-start.mjs` | 19 | 6 |
| `tests/invariants/test_local_start_access.py` | 104 | 5 |

## What was done

- (8) `proxyRequest` in `scripts/local-start.mjs` now has one `fail` function, used by the upstream request's `error` and by a new `error` handler on the server's response. `fail` does nothing if the browser had left (`browserLeft`) or a failure was already recorded (`failed`). Otherwise it writes one `local-proxy` line with the cause (`recordFailure`) and, if headers were already sent, destroys the browser's connection (`outgoing.destroy()`); before headers it keeps the old 502 answer.
- (18) Test `test_a_browser_that_leaves_in_the_middle_of_a_request_leaves_no_failure_line`: stand-in `HOLDING_SERVER` never answers `/hold` and prints `held`/`closed` lines; the test sends `/hold`, closes the browser's TLS connection, waits for the server's `closed /hold` (the proxy has by then handled the upstream error), then sends `/drop` (known to leave one line) and asserts exactly one `local-proxy` line.
- (8) Test `test_an_answer_the_server_breaks_off_after_its_headers_ends_the_browsers_connection`: stand-in `CUT_OFF_SERVER` writes headers and `partial`, then destroys its socket. Asserts: the browser's connection ended within `HTTP_TIMEOUT`; the answer is `HTTP/1.1 200` with `partial`; it does not end with the chunked terminator `0\r\n\r\n` (a cut answer must not look whole); exactly one `local-proxy` line, code `ECONNRESET`.
- (20) Module docstring and `LocalStart` docstring now list which cases run a stand-in (headers case; start on its way up; stop with no built game; dropped request; cut-off answer; held request) and say the others run the real built server.
- New module helpers: `answer_until_end`, `wait_until`, `proxy_lines`.

## Checks (command and exit code)

All from the worktree root. `npm test -- <file>` runs the whole file (it takes one file, no `-k`), 20 tests, about 170 s each.

| Run | Command | Exit | Result |
|---|---|---|---|
| Test of (8) on the base code (before the fix), with both new tests in place | `npm test -- tests/invariants/test_local_start_access.py` | 1 | 1 failure: the cut-off test, `AssertionError: False is not true : the browser was left waiting: b'HTTP/1.1 200 OK ... 7\r\npartial\r\n'`; the test of (18) passed on the base (as expected: the guard existed) |
| After the fix | same | 0 | 20 tests OK |
| Test of (18) with the defect (`browserLeft ||` removed from `fail`'s guard, temporary) | same | 1 | 1 failure: `test_a_browser_that_leaves_...`, `2 != 1`, the log shows two `local-proxy` lines (one for the browser that left, one for `/drop`) |
| Defect taken out again | `sed` restoring the guard; `git diff` of the commit shows `if (browserLeft \|\| failed) return;` | 0 | the committed code is the code of the passing run (the file is byte-identical to the one that passed; not re-run after restoring, 170 s) |
| Ruff, pinned | `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache tests/invariants/test_local_start_access.py` | 0 | All checks passed |
| Prettier | `npx prettier --check scripts/local-start.mjs` | 0 | style OK |
| ESLint | `npx eslint scripts/local-start.mjs` | 0 | no output |

Not run: `npm test` without arguments (the cycle's job), the `foundation_check.py`.

## Own-work check

- Requirement most likely not met: "writes one failure line ... unless the browser had already left" for the combination of both (the browser leaves while the server is mid-answer), and no second line for one cut (the response's `error` and the upstream request's `error` both firing).
- Check: the cut-off test asserts exactly one line, which covers the double firing (only the `failed` flag makes that single if both events fire); the guard on `browserLeft` is shared by both paths and is the one test (18) proves. The mid-answer-and-browser-left combination has no test of its own; it rests on `outgoing`'s `close` setting `browserLeft` before `upstream.destroy()` makes the response emit its error (synchronous order in the same function). Not run separately, a guess from reading the code, not verified.
- Trust boundary (`scripts/local-start.mjs`): the failure line takes only kind, code and place through `writeFailure`, never the error's message; a crafted request cannot change what the line carries. The proxy still passes `upstreamHeaders` unchanged.

## Choices

- `outgoing.destroy()` after headers rather than `outgoing.end()`: `end()` on a chunked answer sends the closing chunk, so the browser would take the cut answer as whole. Cost if wrong: a browser sees a connection reset instead of an ended short answer (what it sees for any cut connection). Rejected: `end()`.
- A `failed` flag in addition to `browserLeft`, so one cut is one line even if both the response and the request report it. Cost if wrong: none seen (it only suppresses a second line).
- Test of (18) waits for the stand-in's own `closed /hold` line, then a `/drop` request as the end marker, instead of sleeping a fixed time (D-84). Cost if wrong: the test could miss a very late line from the first request; the dynamic import of the writer is shared, so lines come out in order of the events.
- Cut-off answer uses chunked encoding (no `content-length`) so the whole-looking-terminator check is meaningful.

## Adaptations of the plan to the code

- The plan's line numbers (`:162`-`:188`, `:467`-`:480` and so on) are those of the base before Slice 6; the code had moved. Found by name. The docstring case "at `:467`-`:480`" ran no stand-in in the current file; the stand-in cases now are the five listed in the docstring.
- The module docstring named two stand-in cases; it now lists all of them, including the stop with no built game (added by Slice 6) and the two of this slice.

## Reaches beyond the handoff

None.

## Searches not found or unclear

- `npm test -- <file>` takes exactly one file and no test selector, so each of the three runs above is a whole file of 20 tests, about 170 s.
- The handoff and the plan name the `browserLeft` guard at `:163`, `:177`-`:178`, `:183`-`:186`; in the current file it is at `:182`-`:211`. Not a mismatch of meaning.

## Questions

None.
