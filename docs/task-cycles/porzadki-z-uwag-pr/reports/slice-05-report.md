# Slice 5 report - tests of the server's two guards for an error after the answer began

**Status:** `questions`
**Commit:** `4dbd144` on `task/porzadki-z-uwag-pr` (base `b6c70d1`): `test: :white_check_mark: check that a static file whose read breaks off while it is sent is cut, writes one failure line and hands no error to Express's own handler`
**Worktree:** `the root of the repository`

## Summary

- Guard 2 (the `response.headersSent` branch of the error handler, `src/server/app.ts:115-119` on this base): one test added and committed. It is seen failing under both defects I put in, and passes on the code.
- Guard 1 (`if (!response.writableEnded)` before `response.destroy()` in the session callback, `src/server/app.ts:72`): no test committed. Four versions of a test were written; under the defect (plain `destroy()`) each passed. Reason, verified in the server's own state: on this Windows host the answer's socket is already detached when the session callback runs, so `destroy()` has no effect. I did not commit a test that is not seen failing.
- No product file changed (`git status` shows only `tests/http.test.mjs` in the commit; `src/server/app.ts` is restored to `b6c70d1`).

## Files changed

| File | Added | Removed |
|---|---|---|
| `tests/http.test.mjs` | 89 | 0 |

The diff adds two imports (`node:fs` default, `node:stream` `Readable`), one helper `getUntilClosed` (a GET that resolves when the server closes the connection, reporting `complete` and `bytes`), and one test. Prettier was applied to the file; the committed file passes `npx prettier --check` and `npx eslint`.

## Checks (command and exit code)

Run only the focused check of the slice. `npm test` without arguments was not run (instruction). Foundation check not run (not a focused check of this slice).

1. Baseline before any edit: `npm test -- tests/http.test.mjs` - exit 0, 76 of 76 pass.
2. First version of the read-fault test (fault fired before the first kilobyte left): `npm test -- tests/http.test.mjs` - exit 1, `socket hang up`. A defect in my test, fixed by holding the fault until the client has the first kilobyte. Not a product mutation.
3. Guard 2, defect A (branch removed, `app.ts:115-119` deleted): `npm test -- tests/http.test.mjs` - exit 1, the read-fault test fails; the log gets Express's own `Error [ERR_HTTP_HEADERS_SENT]` stack line in place of nothing. Log: `a temporary file outside the repository (mut2a-guard2-removed.log)`.
4. Guard 2, defect B (`next()` changed to `next(error)` in the branch): `npm test -- tests/http.test.mjs` - exit 1, the read-fault test fails; the log gets the stack of `synthetic read fault`. Log: `a temporary file outside the repository (mut2b-next-error.log)`.
5. Guard 2 restored, final committed state (after Prettier): `npm test -- tests/http.test.mjs` - exit 0, 77 of 77 pass. Log: `a temporary file outside the repository (final-pass.log)`.
6. Guard 1, defect (`app.ts:72` changed to plain `response.destroy();`), four test versions, each `npm test -- tests/http.test.mjs`:
   - v1, the answer `GET /api/account` on a kept-alive connection, socket checked after 200 ms: exit 0 (`a temporary file outside the repository (mut1-guard1.log)`).
   - v2, a 16 MiB answer with the client reading normally: exit 0 (`a temporary file outside the repository (mut1b-guard1.log)`).
   - v3, a 128 MiB answer, client holds its reads until the failure is logged: exit 0 (`a temporary file outside the repository (mut1c-guard1.log)`).
   - v4, the same with 1 GiB and instrumentation: exit 0 (`a temporary file outside the repository (dbg4.log)`).
   Instrumented state at the session callback, with the mutation in place (`a temporary file outside the repository (dbg3.log)`, `dbg4.log`): `attached=false finished=true destroyed=true`. Client, resumed after the log line (`a temporary file outside the repository (dbg5.log)`): `bytes=0 paused=true sockPaused=true`. The instrumentation was removed; `app.ts` restored with `git checkout`.

Every guard-1 mutation run was against the same product code, so each exit 0 is the defect passing the test, not an environment fault.

## Own-work check (`make-change` section 3)

- **Requirement most likely not met:** each test is seen failing once under the defect it catches (plan, acceptance criterion). Guard 1 fails this requirement.
- **Check written and run:** the guard-1 defect, four variants, exit 0 each (check 6 above).
- **What it showed:** the defect does not change anything observable through HTTP on this host. When the session callback runs, Node has already detached the answer's socket from the response, so `response.destroy()` does nothing. I verified this in the server state. The server reports the answer finished even for 1 GiB with the client not reading, so the answer's bytes were not pending in the server at the callback.
- **Not verified:** whether a Linux host (where the kernel buffers are smaller) leaves the bytes pending. I did not run it. The Docker CLI is present on this machine (`the Docker command-line program`), not used.
- **Trust boundary (`src/server/**`):** the new tests add no crafted input to the boundary; they reuse the suite's `proxyHeaders` and the existing account fixture. Guard 2's test forces a read fault; no request input is crafted.

## Reaches beyond the handoff (what, where, why)

- `src/server/session-store.ts:120-190`: `touch`, `set` and `complete`; the store's callback runs synchronously inside `res.end` (why the session callback runs inside the answer's end).
- `src/server/account-routes.ts:300-362` (sendLinkMessage, sendResetMessage), `:364-410`, `:540-800` (all routes): to search for a route that answers and then throws. None found; no `headersSent` or response write after an answer.
- `node_modules/express-session/index.js:240-380` (the `res.end` wrapper: the save or touch runs before the write, the callback is deferred with `setImmediate`), `node_modules/send/index.js` (stream error to `onStatError`, `:300-330`, `:490-515`, `:680-700`), `node_modules/serve-static/index.js:85-121` (forwards a 500 stream error to `next(err)`), `node_modules/finalhandler/index.js:69-125` (a headers-sent error destroys the socket). Why: to establish that guard 2 is reachable only through a stream error after the answer began, and how Express's handler behaves when the guard is removed.
- `tests/http.test.mjs`: read in parts, not whole. Read: lines 1-260, 265-445, 698-800, 1890-2170, 2742-2790, 3796-3810, 4250-4262, 4480-4650 and the new lines. This departs from the handoff's "every file you change, whole, before you change it". The edit points were verified by grep and by re-reading the regions I changed.
- `the author's private rules note on git`: read before the commit (message language, explicit paths).
- `foundations/decisions.md`: D-252, D-138, D-84, D-353, D-354 (whole), D-352 (whole; browser-view, not relevant to this slice).
- `foundations/part_map.md:62-82`, `guidelines/coding.md`, `guidelines/coding-http-application.md`, `guidelines/testing.md`, `src/server/app.ts`, `src/server/log-line.ts`: as the handoff names; read whole.

## Choices made, with the way rejected and its cost if wrong

- **Guard 2 read fault by patching `fs.createReadStream`** (restored in `t.after`). Forces the stream that the real static route opens to fail after its first kilobyte; the real file `dist/public/main.js` stays unchanged. Rejected: a real disk fault (not reproducible on either platform); a route that throws after answering (none exists in the server). Cost if wrong: the patch stops matching if serving changes; the test then fails loudly (`complete` is true), it does not pass silently.
- **Read fault waits for the client's first kilobyte** (readiness condition, D-84). Rejected: a fixed delay (depends on machine speed).
- **Guard-1 test not committed.** Rejected: committing a test that is not seen failing (breaks the acceptance criterion); keeping a test of the correct behaviour only (checks nothing the guard protects on this host). Cost if wrong: guard 1 has no test in this slice; the defect is left unguarded on Windows.

## Adaptations of the plan to the code (section 4)

- Plan and task give `src/server/app.ts:68` for `if (!response.writableEnded)`; the line is `:72` at base `b6c70d1`. `:68` is the `"app.sessions"` argument of `writeFailure`. The lines moved with the D-353 wrap.
- Plan gives the `headersSent` branch as `:109`-`:113`; it is `:115`-`:119` at base `b6c70d1`.
- Both are small mismatches: adapted, reported here.

## Searches not found or unclear

- Searched `src/server` for `headersSent`, `writeHead`, `.write(`, `next(` and `touch`: no route writes its answer and then throws; the only guard-2 path is a stream error after the answer began (the static route).
- Unclear: why the server reports the answer finished before the deferred callback on this host, even at 1 GiB with the client held. The mechanism was not verified (it is consistent with synchronous kernel acceptance on this Windows host, not proven).
- Not found on this machine: a Linux environment to run the guard-1 mutation.

## Questions for the orchestrator (recommended answer for each)

1. **Guard 1 test:** how should the guard-1 defect be shown failing? Options: (a) run the defect on a Linux host (the Docker CLI is here; the image would need the repo and its native `argon2` build); (b) drop the guard-1 requirement from this slice and record the guard as defensive, unverified on Windows. **Recommended:** (a) first. If the defect is still invisible there, take (b) and record in the plan that guard 1 has no discriminating test.
2. **Plan line numbers:** adapt as in the section above (`:72`, `:115`-`:119`). **Recommended:** accept; no action.

## Commits

- `4dbd144` - `tests/http.test.mjs` (+89 -0): guard-2 test and its helper.

Branch state: committed work stays; nothing uncommitted.

---

## Addendum - guard 1 by a call check (after the orchestrator's answer)

**Status now:** `done with concerns`. Guard 2 committed as before (`4dbd144`). Guard 1 committed as a call check (`23f7e43`), which fails under its defect here; the earlier cut-off attempts remain unverifiable on this host (see the runs above). No Linux run (the orchestrator's answer: no Docker daemon).

**Commit:** `23f7e43` - `tests/http.test.mjs` (+32 -1): the guard-1 test and the import of `ServerResponse` from `node:http`.

**Test:** "a failed renewal after an answer that has ended writes one line of the session and calls no destroy on the response". A real `GET /api/account` with a session whose renewal the database refuses (the existing `refusingRenewal` trigger). `ServerResponse.prototype.destroy` is wrapped for this test only: each call records `this.writableEnded` and calls the original unchanged. The patch is restored in `t.after`. Assertions: the answer is 200; the session failure is logged once; no call of `destroy` was recorded.

**Why a call check, and the departure:** on this Windows host the answer's socket is already detached when the session callback runs, so a cut-off answer is never visible (see runs 6 above and `a temporary file outside the repository (dbg3.log)`, `dbg5.log`). The test therefore observes the call itself, which the guideline allows only for an effect visible outside the product. This is a departure; the reviewer should judge it. The patch is on the real class; nothing else is replaced.

**Checks (command and exit code):**
- Test on correct code, before the defect: `npm test -- tests/http.test.mjs` - exit 0, 78 of 78 (`scratchpad\s5-g1-pass.log`).
- Defect (`app.ts:72` changed to `response.destroy();`): `npm test -- tests/http.test.mjs` - exit 1, 77 pass, 1 fail; the new test fails with `no destroy of an answer that has ended`, the recorded call `{ writableEnded: true }` (`scratchpad\s5-g1-mut.log`).
- Defect taken out again (`git checkout -- src/server/app.ts`), correct code: `npm test -- tests/http.test.mjs` - exit 0, 78 of 78 (`scratchpad\s5-g1-final.log`).

**Files changed:** `tests/http.test.mjs` only; no product file in the commit.

**Searches not found or unclear:** unchanged from above; plus, not verified whether Node's own internals ever call `ServerResponse.prototype.destroy` on a normal answer (the test saw no such call on the correct code, so none on this path).

**Own-work check:** the requirement most likely not met is the departure above (a call check instead of an observed cut). Checked: the guard's defect fails the call check and the correct code passes it (runs above). Trust boundary: no crafted input added.

**Questions for the orchestrator:** none new. Reviewer's judgment needed on the call-check departure.
