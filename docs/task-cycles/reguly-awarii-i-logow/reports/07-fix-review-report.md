PASS 43f596f5e83aa3a6bbfc42c4022a01b3e060c9af

# Review of the fix — reguly-awarii-i-logow

Range `704a03e..43f596f`, head confirmed by `git rev-parse HEAD`. Bounded by `05-findings.md`, as `fix.md` gives.

Counts: 0 blocking, 3 Minor, 0 out of scope.

## The findings

### I1 — fixed; the contested detail is not kept

**Fixed.** The session layer now has its own `next` (`src/server/app.ts:60-73`). An error arriving with the headers sent is written there and never enters the router, so it cannot reach Express's `finalhandler`. My probe, on a fresh build of `43f596f`, with one case added for a file served:

```
--- A a missing file, session renewal fails: status 404, 1 line(s) on standard error
{"failure":"session","kind":"Error","code":"ERR_SQLITE_ERROR","errcode":1811,"place":"app.sessions","accountId":"…"}
--- B control: a route answered, session renewal fails: status 200, 1 line(s) on standard error
{"failure":"session",…,"place":"app.sessions","accountId":"…"}
--- D a file served, session renewal fails: body whole: status 200, 1 line(s) on standard error
{"failure":"session",…,"place":"app.sessions","accountId":"…"}
--- C a route fails and the renewal fails too (one database fault): status 500, 2 line(s) on standard error
{"failure":"request",…,"place":"app.errors","accountId":"…"}
{"failure":"session",…,"place":"app.sessions","accountId":"…"}
```

No stack and no error text in any case. All of express-session's late reports (`defer(next, err)` in `res.end`, and the cookie failure in `onHeaders`) pass through this one `next`. The fix tests are real: with the wrapper removed, `tests/http.test.mjs` fails exactly those three cases (exit 1, 70 pass, 3 fail).

**The contested detail: I do not keep it.** My direction asked for „exactly one JSON line” in case C. The author is right, and the slip was mine:

- The renewal and the save are two operations that failed, and each is now written once, with its own `failure` and `place`. „Raz” forbids one failure recorded twice; it does not merge two. My phrase „one fault gets two records” described where they may come from, not what the rule counts.
- What was wrong with C was the second record's form, a raw stack quoting the error's text. That is gone.
- Reducing C to one line would hide a failure, against To do 3's „każdą awarię”.

So the test's two expected lines stand.

### I2 — fixed

**First part.** The refused port goes through `writeFailure` (`src/server/main.ts:16-21`). Run directly, `LOOP2_LISTEN_PORT=abc` gives one JSON line and exit 1; a value holding a new line and a forged event stays inside its field, on one line. The test `rejects LOOP2_LISTEN_PORT=…` gained the line's fields and lost nothing.

**Second part, as the coordinator bound it.** The readiness line stays, and D-252's *Verification* names it under *complies*, citing both invariants. The binding sentences are unchanged and `foundation_check.py` passes.

### I3 — fixed

The test gains two rows: a fault at the program check through a `get` trap, and a fault at the comparison through `getOwnPropertyDescriptor`. With `if (error instanceof ProgramCheckError)` removed, `tests/sim/saved-game.test.mjs` now fails (exit 1, 26 pass, 1 fail), where it passed at my review. Stryker on `saved-game.ts:252-261`: 7 killed, 0 survived.

## What the fix itself broke

Nothing Critical or Important. I looked at the wrapper's other paths: an error before the headers (a failed session read) still reaches `errors`; a normal `next()` passes through; `writableEnded` is true on all the late paths, so a whole answer is no longer cut, which case D shows; `sessionFields` keeps the old behaviour. No guideline or skill cites the replaced test's title or the old port sentence.

## Minor notes

None of these reopens the review.

- **N1 — two guards without a test,** which the author names himself. `if (!response.writableEnded)` at `src/server/app.ts:68` is told apart from a plain `destroy()` by nothing. The `headersSent` branch in `errors` lost its only test with the case it replaced. That branch is not dead: a read that fails while `express.static` is streaming a file reaches it, which I read in the library and did not run.
- **N2 — `listen` now holds a raw setting in one line and an address in another** (author's choice). It keeps `LineFields` closed, and the value is a port setting, neither a secret nor a person. Field meaning only.
- **N3 — D-252's *Origin* does not name the source of the new *complies* item,** the cycle's Q4, while the other edits in this task extended *Origin*. The entry's text is right as bound.

Minor findings N1–N3 and O1–O2 of the first review stay as they were, unfixed as `fix.md` gives; the numbers above are this report's own.

## Declined to judge

Nothing beyond the first review's list; `fix.md` bounds this review to the findings and the fix diff.

## Checks

All in a separate worktree of `43f596f`, built with `node scripts/build.mjs` (exit 0), unless marked. Test files ran as `python -B scripts/test.py <file>`, the mechanism of `npm test -- <file>`.

| Check | Exit |
|---|---|
| `git rev-parse HEAD`, reviewed worktree | 0, the given head |
| `NODE_ENV=production node …/probe-express-fix.mjs` (the first probe plus case D) | 0, shows I1 fixed |
| `tests/http.test.mjs` | 0, 73 pass |
| `tests/startup.test.mjs` | 0, 18 pass |
| `tests/sim/saved-game.test.mjs` | 0, 27 pass |
| `tests/transport.test.mjs` | 0, 10 pass |
| `tests/view/account-screen.test.mjs` | 0, 69 pass |
| `tests/invariants/test_account_server_occupied_address.py` | 0 |
| `tests/invariants/test_account_server_default_address.py` | 0 |
| Session wrapper removed, `tests/http.test.mjs` | 1, 70 pass, 3 fail, the three I1 cases |
| Catch-all at the program check, `tests/sim/saved-game.test.mjs` | 1, 26 pass, 1 fail |
| `LOOP2_LISTEN_PORT=abc node dist/server/main.js` | 1, one JSON line |
| The same with a new line and a forged event in the value | 1, one JSON line |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0` on the five changed code and test files | 0 |
| `prettier --no-config --no-editorconfig --ignore-path .gitignore --check` on the same files | 0 |
| `node scripts/build.mjs --check` | 0 |
| `python -B .the-way/elements/common/foundation_check.py`, reviewed worktree | 0, 0 errors |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/saved-game.ts:252-261"` | 0, 7 killed, 0 survived |

The scratch worktree is removed. The reviewed worktree's `git status --short` shows nothing. Outputs stay in `.runs/task-cycles/reguly-awarii-i-logow/review-scratch/`.

**Not run:**
- The full gate: the orchestrator's run, as the dispatch gives.
- `docker logs` of a deployed container.
- The in-flight branch of the wrapper and the `headersSent` branch in `errors`: read only, see N1.

## Reaches beyond the dispatch

`node_modules/express-session/index.js`, its cookie failure in `onHeaders`, read to check that every late report passes the new `next`.

## Searches not found or unclear

none
