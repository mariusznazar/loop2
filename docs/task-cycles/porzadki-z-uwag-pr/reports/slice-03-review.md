PASS 6d18fb2

# Review of Slice 3 (`6d18fb2`, range `2a58095..6d18fb2`)

`git rev-parse HEAD` is `6d18fb2e2c2adfafd6c94a12789a6522425ea144`. The range is one commit, two files: `src/server/app.ts` (+3 -1) and `tests/http.test.mjs` (+41). No invariant test is changed.

## Findings

Blocking: none. Minor: 3 (all inside the task's scope). Out of scope: 0.

### Minor 1 - the test's fault comment names a fault the test cannot show
`tests\http.test.mjs:4253-4255` (the comment of the new case) says the case guards against "a server that never reads the partial body, which the arrival wait below would show as a hang". The wait is `f.listening.once("request", ...)`, which fires when the request headers arrive, whatever the body parser does. A server that never reads the body would still pass: the connection closes, no failure line is written, the 401 check passes. The case therefore protects only against "the break-off answered as a server failure, with its line written", the first fault of the comment. Why it matters: a later reader trusts a protection that is not there. Evidence: reading of the wait; no run reproduces it. Fix: drop the second fault from the comment.

### Minor 2 - nothing in the case proves the body parser was reading when the client broke the connection
After `await arrived` the case destroys the client at once. The `request` event proves only the headers arrived; the session middleware still runs before the body parser attaches its listeners. If the connection were broken before the parser attached, no error would reach the handler at all and the case would pass vacuously on the head. Measured, not only argued: on the base (`app.ts` of `2a58095`) the case failed 15 of 15 runs with the line `{"failure":"request","kind":"BadRequestError","code":"ECONNABORTED","place":"app.errors"}`, and on the head it passed 10 of 10, so on this machine the order holds. A probe with a 300 ms delay before the parser (scratch, not in the repo) showed the other order: the handler is not reached and nothing is logged, so a slow machine could make the case green without touching the change. A stronger anchor would wait for a first body byte to be consumed; the fixture has no such hook. The risk is a vacuous pass, not a flaky red, and the base shows red every time, so it does not block.

### Minor 3 - the status 400 and the answer are not checked by any test
The case checks the absence of the line and that the server still answers afterwards. The status 400 and "Invalid request body" are read from the code only. This is unavoidable by a socket test: I sent a half-close (FIN) after a partial body through a raw socket on both base and head, and the client got Node's own `400 Bad Request` with no body on both (the handler's answer is written to a socket that is already closing). So the test cannot see the handler's answer and the executor did not claim it. Mutation to consider: the group mapping to 400 replaced by a branch that keeps 500 but skips the line would pass the case; D-353 requires only "no failure line", so this is polish.

## Answers to the questions of risk

1. Error types the body parser raises, from `node_modules\body-parser\lib\read.js` and `node_modules\raw-body\index.js` (body-parser 2.4.0, raw-body 3.0.2): `encoding.unsupported` and `charset.unsupported` (415), `entity.too.large` (413), `request.aborted`, `request.size.invalid`, `stream.encoding.set`, `stream.not.readable`, `entity.parse.failed`, and `entity.verify.failed` (the `verify` callback; its own `type` wins when it has one). The handler reads only `error.type`, never `error.status`. On the head, as on the base: 413, 415 and 400 for parse/verify keep their status and line (none for a refusal, as on the base); `request.size.invalid`, `stream.encoding.set` and `stream.not.readable` still fall to 500 with the failure line, because the handler ignores their library status of 400/500. Only `request.aborted` changes, 500 with line to 400 without. `request.size.invalid` looks unreachable in practice (Node's parser enforces the length; a short body ends as an abort). A body that ends before its declared `Content-Length` raises `request.aborted` (code `ECONNABORTED`, `received` < `expected`), measured with a probe app (`express.json` with `mutationGuards` from the build) for: destroy mid-body, half-close mid-body, reset mid-body, destroy before the body, and chunked bodies with destroy and with half-close. A body longer than declared is cut by Node and ends as `entity.parse.failed` (400, unchanged).
2. Yes. The new case sends `Content-Length: 64`, writes a 30-byte part, waits for the `request` event, destroys the client and waits for 0 connections. It reaches the handler through the parser's abort path: on the base it fails with the `ECONNABORTED` line above (15 of 15), so it fails for the reason the slice names, not before the handler. It cannot pass for a reason other than the change except by the ordering race of Minor 2 (vacuous pass). It does not break the connection after the body is complete (the body is deliberately incomplete).
3. `request.aborted` is created only by `raw-body` `onAborted`. Nothing in `src\server\` sets a `type` (grep for `type:` and `.type =` finds only the password profile and the new line). A store, SQLite or route error carries no `type: "request.aborted"`. Server-initiated closings of a slow body (Node's default request timeout) also end as `request.aborted`, and a slow body cut by the server is not a server failure either. Residual, unchanged from the base: a connection that breaks before the parser attaches never reaches the handler (probe: nothing logged), and `stream.not.readable` keeps its failure line. No real server failure can reach the 400 branch under this type.
4. On the base a broken-off body wrote exactly one line: the failure line from `app.errors` (the log capture on the half-close probe held that single line on the base and none on the head). The handler's answer is now status 400 `{"error":"Invalid request body"}` with `Cache-Control: no-store`, the same code path a refused body takes (`entity.parse.failed`). For an open connection (half-close), the answer the client receives was Node's own `400 Bad Request` on both base and head, so the handler's answer does not differ visibly; for a connection that stays open the handler's 400 is written where before it wrote a 500 "Account service failed". After the change `response.headersSent` is false for these errors, so `destroy()` does not run.

## Against the task, the foundation and the guidelines
- Task item 9 and Settlement 2 (first half): met; `request.aborted` joins the 400 group of `src\server\app.ts:98-104`. Every other error keeps status and line (verified through the 74 cases of `tests\http.test.mjs`, including "every failure the server handles leaves a line of its kind, code and place, with the account's number, and no text of the error or the request").
- D-353 (break-off part): the change complies (verification: "a request whose body the browser stopped sending, refused with no line of `failure`"); the second part (session write refused by a block) is not in this slice, as the report says. D-252, D-104, D-84: the case uses a real local server and real HTTP, waits for a condition with a limit, cleans up through the fixture; the invariant `account-mutation-request-guards` is untouched (guards, limits and the 400 for a crafted body unchanged). `guidelines\coding.md` "Recording a failure": an expected refusal is no failure line; met. `guidelines\coding-http-application.md`: `app.ts` stays the exemplar; no rule broken.
- Nothing added that was not asked; no reserved choice taken (not read: no library, store or login change).
- Trust boundary (`src\server\**`): crafted input at the boundary checked by probe: abort in 7 shapes (above) and the existing parse/verify/size cases; none reaches 500 or a line; no new input path.

## Declined to judge
- The second half of D-353 (blocked-account session write) and D-354: not in this slice.
- Whether the guideline `guidelines\testing.md` trust-boundary row for `src/server/` should name the new case: the row lists boundary refusals; the change adds no boundary rule, and the guideline file is not in the change.
- The unchecked rows of the full `npm test` and `foundation_check.py`: the cycle's own run.

## Checks run
- `git rev-parse HEAD` -> `6d18fb2e2c2adfafd6c94a12789a6522425ea144`.
- In a separate throwaway worktree of `6d18fb2` (node_modules junctioned, removed afterwards; the reviewed worktree, index and branch untouched):
  - `node scripts/test-node-file.mjs tests/http.test.mjs` on the head: exit 0, 74 of 74.
  - Same file with `src/server/app.ts` replaced by `2a58095:src/server/app.ts` (base) after `node scripts/build.mjs` (exit 0), filter `breaks off sending`, 15 runs: 15 failed, exit 1 each, assertion "no failure line for a break-off" (3 of them read in full). The temporary base app.ts was taken out again (`git checkout`).
  - Head, same filter, 10 runs: 10 passed, exit 0.
  - `node scripts/test-node-file.mjs tests/transport.test.mjs`: exit 0, 10 of 10.
  - `npx prettier --check src/server/app.ts tests/http.test.mjs`: exit 0. `npx eslint src/server/app.ts tests/http.test.mjs`: exit 0.
  - Scratch probes (not left behind): `probe.mjs` (error types in 7 break-off shapes), `probe2.mjs` (delay before the parser), a temporary appended case to the scratch copy of `tests\http.test.mjs` (half-close answer and log, on head and on base). Those lived only in the scratch worktree and the scratchpad.
- Not run: the full `npm test` and `python -B .the-way/elements/common/foundation_check.py` (the cycle's own run before the request).

## Reaches beyond the handoff
- `node_modules/body-parser/lib/read.js` and `...\raw-body\index.js`: to list the error types and see how `request.aborted` and `request.size.invalid` arise (the questions of risk 1 and 3).
- `src/server/transport.ts:59-102`: for the guards and the parser configuration, to build the probe app.
- `package.json` and `scripts\test.py`: to learn how a single test file is run and built.
- `the author's private rules note on scripts`: the user's rule before writing probe scripts.
- `tests\http.test.mjs` (fixture, `captureLog`, `failureLines`, `waitFor`, header constants): to judge the new case.

## Searches not found or unclear
- A way to see the handler's own 400 answer on a broken-off connection: not found; Node closes the socket before it can be sent, on both base and head (so the "answer where the connection still takes one" is unobservable by test).
- `foundations\decisions.md` D-353 was read whole at its heading (line 7899 to its end); D-352 and D-354 headings found at 7870 and 7927. D-252, D-104, D-84 and the invariant `account-mutation-request-guards` read whole. `foundations\part_map.md` account-server entry, `src\server\log-line.ts` and `tests\transport.test.mjs` were not read whole: the slice's check runs the latter (passed), and nothing in the change reaches `log-line.ts` beyond the unchanged `writeFailure` call.
- `project-level/technology/reserved_choices.md`: not read; the change takes no reserved choice.
