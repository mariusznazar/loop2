# Fix report — reguly-awarii-i-logow, review at `704a03e`

**Status:** `done with concerns`

I1, I2 and I3 are fixed. One detail of I1 I hold wrong and contest: case C writes two lines, not the one
the finding's direction asks for. It is the only thing a re-review need decide; see *I1, the contested
detail*. The Minor and out-of-scope findings were left alone, as the dispatch gives.

## Commits

| Commit | Subject |
|---|---|
| `a62d20f` | docs: :memo: name the readiness line in D-252's verification as what complies |
| `717ed83` | fix: :bug: stop a late failure of the session store at the session layer, and write a refused listening port through the one log line |
| `43f596f` | test: :white_check_mark: place the load's faults inside a program, at the check and at the comparison |

## Files changed (against `704a03e`)

| File | + | − |
|---|---|---|
| `src/server/app.ts` | 30 | 15 |
| `src/server/main.ts` | 10 | 3 |
| `foundations/decisions.md` | 4 | 1 |
| `tests/http.test.mjs` | 75 | 21 |
| `tests/sim/saved-game.test.mjs` | 24 | 1 |
| `tests/startup.test.mjs` | 15 | 0 |

## I1 — fixed, with one detail contested

**How.** `src/server/app.ts` gives `sessions(request, response, …)` its own `next`, as the direction says.
An error arriving with the headers sent is written there, as `failure: "session"`, `place: "app.sessions"`,
and never enters the router, so it cannot reach Express's `finalhandler`. Before the response has started
the error goes on to `errors` as it did.

Three things differ from, or add to, the direction:

- **The response is destroyed only while still in flight.** Every late `defer(next, err)` in express-session stands beside `writeend()`, so the answer has normally ended, and destroying its socket could cut off a slow client's data. `if (!response.writableEnded) response.destroy();`.
- **`sessionFields(request)`** is shared by both places that write an account's number.
- **The `headersSent` branch in `errors` stays,** for a route's own error after its answer began. It now has no caller in the code and no test. See *Left unprotected*.

**The evidence.** The reviewer's own probe, on real HTTP and SQLite, after the fix:

`NODE_ENV=production node .runs/task-cycles/reguly-awarii-i-logow/review-scratch/probe-express.mjs`, exit 0:

```
--- A a missing file, session renewal fails: status 404, 1 line(s) on standard error
{"failure":"session","kind":"Error","code":"ERR_SQLITE_ERROR","errcode":1811,"place":"app.sessions","accountId":"…"}
--- B control: a route answered, session renewal fails: status 200, 1 line(s) on standard error
{"failure":"session","kind":"Error","code":"ERR_SQLITE_ERROR","errcode":1811,"place":"app.sessions","accountId":"…"}
--- C a route fails and the renewal fails too (one database fault): status 500, 2 line(s) on standard error
{"failure":"request","kind":"Error","code":"ERR_SQLITE_ERROR","errcode":1811,"place":"app.errors","accountId":"…"}
{"failure":"session","kind":"Error","code":"ERR_SQLITE_ERROR","errcode":1811,"place":"app.sessions","accountId":"…"}
```

No raw stack in any case, and no text of the error.

**Tests.** In `tests/http.test.mjs`, the old case „a failure after the answer has left…”, whose title claimed
more than it covered, is replaced by three, each with a real trigger refusing the renewal:

- „a failed renewal after a route answered writes one line of the session, and no stack” (B)
- „a failed renewal of a request for a missing file, past every layer, writes one line of the session, and no stack” (A)
- „a route that fails and a renewal that fails write one line each, with their own place, and no stack” (C)

**Failing run on the code before the fix.** `npm test -- tests/http.test.mjs` at `704a03e` with the tests added: exit 1, 70 pass, 3 fail, those three. A and C are the raw-stack failures the finding names. B fails there only because its expected `place` is new.

### I1, the contested detail

The direction asks for „exactly one JSON line” in case C. C keeps two, and the test says so. I hold this
is right, for three reasons:

1. **The direction's own mechanism gives two.** `errors` writes the save's failure, then the session layer writes the renewal's. Only a further mechanism could reduce them to one.
2. **They are two failures, each written once.** The probe itself sets two triggers, on two statements, in two operations. „Raz” in `### Recording a failure` forbids one failure recorded twice, as the raw stack was. It does not merge different failures. The two lines differ in `failure` and `place`.
3. **One line would hide a failure.** To do 3 says „każdą awarię, którą obsłużył”. Dropping the second means that a renewal failing for another reason, on a request that already failed, leaves no record.

What the finding rightly objected to is gone: the second record no longer quotes the error's text, and it
goes the one way of writing.

- **If you hold otherwise:** a flag on `response.locals` set by `errors` and read by the session layer gives one line, in about four lines of code. Its cost is reason 3, and the test's expected value changes. That is a decision I would not take without saying so.

## I2 — fixed

**First part.** `src/server/main.ts` writes the refused port through `writeFailure`, with the sentence kept as
`failure`, like its neighbours:

```json
{"failure":"Loop could not start: LOOP2_LISTEN_PORT must be an integer from 1 to 65535","kind":"ReasonedFailure","code":"INVALID_LISTEN_PORT","place":"main.start","listen":"abc"}
```

The value stands in the existing field `listen`, so `LineFields` stays as it was, and the old assertion that
standard error names the value stands unchanged. I also retract choice 7's „its test requires the value” as
a reason: the finding is right that a JSON field meets it. A search of the repository finds no reader of
the old sentence but `main.ts`.

**Second part, as bound by the dispatch.** The readiness line stays as it is and no invariant changes. D-252's
*Verification* names it under *complies*, through `the-way-record-decision`: neither a failure nor an event,
a program's announcement to what launches it, in the exact form `account-server-occupied-address` and
`account-server-default-address` fix. The binding sentences do not change.

W języku zadania: wiersz gotowości `Loop: <adres>` zostaje zwykłym tekstem, bo reguły dotyczą wierszy awarii i zdarzeń, a to zapowiedź programu dla tego, co go uruchamia.

**Tests.** `tests/startup.test.mjs`, „rejects LOOP2_LISTEN_PORT=… without a readiness line”, gains the assertion of one JSON line with its fields; nothing was removed from it.

**Failing run on the code before the fix.** `npm test -- tests/startup.test.mjs` at `704a03e` with the assertion added: exit 1, 13 pass, 5 fail, the five values `""`, `"0"`, `"3000x"`, `"65536"`, `"abc"`.

## I3 — fixed

**How.** `tests/sim/saved-game.test.mjs`, „an error of the code in the load is no refusal…”, gains two rows, not
one, because that `try` holds two readings:

- **„the program check”:** a `get` trap on a program of the document, as the direction says (`faultyOnRead`).
- **„the comparison with the program checked”:** the check passes, since it reads by property, and `matches` meets the fault through `getOwnPropertyDescriptor` (`faultyAt`).

No product code changed: the code was right and unprotected.

**Failing run, by mutation, since the code already had the behaviour.**

| Mutation | Command | Exit | What failed |
|---|---|---|---|
| `if (error instanceof ProgramCheckError) refuse(); throw error;` → `refuse();` | `npm test -- tests/sim/saved-game.test.mjs` | 1 | 26 pass, 1 fail: `Missing expected exception (TypeError): the program check` |
| `matches` alone wrapped in a catch that refuses | same | 1 | the same test |

The review's run of the first mutation before this test: exit 0, 27 pass.

**Stryker, the tool that found it.** `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/saved-game.ts:252-260"`, exit 0: 6 killed, 0 survived, the reviewer's line 258 inside the range.

## Checks

All at the final commit `43f596f`, tree clean, unless marked.

| Command | Exit |
|---|---|
| `npm test -- tests/http.test.mjs` (73 pass) | 0 |
| `npm test -- tests/startup.test.mjs` (18 pass) | 0 |
| `npm test -- tests/sim/saved-game.test.mjs` (27 pass) | 0 |
| `npm test -- tests/invariants/test_account_server_occupied_address.py` | 0 |
| `npm test -- tests/invariants/test_account_server_default_address.py` | 0 |
| `npm run typecheck` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` (0 errors) | 0 |
| `npm test -- tests/transport.test.mjs` (10 pass), on the same content before the commits | 0 |
| `npm test -- tests/view/account-screen.test.mjs` (69 pass), same | 0 |
| `npm run build`, same | 0 |
| `NODE_ENV=production node …/review-scratch/probe-express.mjs`, same | 0 |
| ESLint `--max-warnings 0` on the five changed code and test files, same | 0 |
| Prettier `--check` on those five, same | 0 |
| Stryker, as above, same | 0 |

Further mutations of the fix, each restored after its run:

| Mutation | Command | Exit | Failing |
|---|---|---|---|
| late session error handed to the router again (`&& false`) | `npm test -- tests/http.test.mjs` | 1 | the three I1 cases |
| a late session error writes no line | same | 1 | the same three |
| the port's `listen` field dropped | `npm test -- tests/startup.test.mjs` | 1 | the five port cases |

**Not run:** the full gate, as the dispatch gives. Also the other test files; `tests/account-mail`, `account-backup` and `account-storage` touch nothing these commits changed.

## Left unprotected

- **`if (!response.writableEnded) response.destroy();`:** no test tells this from a plain `response.destroy()`, and the in-flight branch has no test. Read, not run. The only path I can see to it is express-session's cookie failure in `onHeaders`.
- **The `headersSent` branch in `errors`:** it was reached through the session library, and the fix takes that caller away, so mutation M1 of the first report no longer applies. No product route throws after its answer begins. Kept as a guard: without it `response.status()` throws and Express prints the stack.

## Questions, concerns, choices

- **Choice, way rejected, cost if wrong:** `listen` reused for the raw port. Rejected: a new field `listenPort`. Cost: the field holds an address in one line and a raw setting in another.
- **Choice:** I3's test stands in a commit of its own, since it changes no product code.
- **A changed invariant test:** none in these commits. The startup cases and the I3 test carry no change of an invariant's test; the I3 test's neighbours carry `save-version` but the altered case does not.
- **Reach beyond the dispatch:** `node_modules/express-session/index.js` and `node_modules/express/lib/application.js`, read to check the finding; the invariant `account-server-default-address`, read whole; both named by the finding.

**Searches not found or unclear:** whether „exactly one JSON line” in the direction meant C as written, given that its own mechanism gives two. Taken as a slip of the direction, which the finding marks as not binding; see *I1, the contested detail*.

## Problems observed

- **One of my mutations did not apply at first:** the search text assumed one line, and the call stands on several after formatting. The script reported `MUTATION NOT APPLIED`, and it ran separately, exit 1.
- **Stryker's and the mutations' temporary changes** left the tree clean: `git status --short` shows nothing at `43f596f`.
