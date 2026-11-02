# Findings to fix — review of the whole change, `reports/04-review-report.md`, first line `FAIL 704a03e8e5262d9865a4e707b7dc5d1969c7ced2`

The blocking findings, in the reviewer's words.

### I1 — Important — Express still prints a failure's stack and message, the path the change says it closed (`704a03e`)

**Place:** `src/server/app.ts:39-50` (the session layer's `next`), `src/server/app.ts:92-98` (the branch that was meant to close it); `node_modules/express/lib/application.js:617`, `node_modules/express-session/index.js` (`defer(next, err)` in its `res.end`).

**What is wrong.** express-session reports a failed renewal or save by calling the `next` it was given, after the response has ended. The router's `next` carries on from wherever that request stopped. The change handles the case where the app's `errors` layer still lies ahead. Where it does not, the error runs off the end of the router into Express's `finalhandler`, whose `logerror` prints `err.stack`. Two ordinary requests get there:

- **A missing file with a session.** The request has walked every layer, including `errors`, to the 404. The failure then writes no JSON line at all, only the raw stack.
- **A route that failed, with the renewal failing too.** This is the usual shape of one database fault. `errors` answers 500 and writes its line, `res.end` then fails the renewal, and no layer is left. One fault gets two records, and the second quotes the error's text.

**Why it matters.** This is handoff questions 1 and 2. It breaks `### Secrets and personal data` („nigdy `message` ani `stack`”), D-252's *violates* („an error's message written where it may quote a value”), and To do 3's „jedną drogą zapisu”. The author's own report shows SQLite's `message` quoting a stored value. The image runs with `NODE_ENV=production` (`Dockerfile:18`), so Express prints. The test title „…and Express prints no stack beside it” claims more than it covers: it exercises only a route that answered.

**Evidence.** `NODE_ENV=production node .runs/task-cycles/reguly-awarii-i-logow/review-scratch/probe-express.mjs`, exit 0, on real HTTP and SQLite with a trigger refusing the renewal:

```
--- A a missing file, session renewal fails: status 404, 1 line(s) on standard error
Error: synthetic first@example.test |     at AccountDatabase.renewSession (file:///…/dist/server/database.js:272:14)
--- B control: a route answered, session renewal fails: status 200, 1 line(s) on standard error
{"failure":"request","kind":"Error","code":"ERR_SQLITE_ERROR","errcode":1811,"place":"app.errors","accountId":"…"}
--- C a route fails and the renewal fails too (one database fault): status 500, 2 line(s) on standard error
{"failure":"request","kind":"Error","code":"ERR_SQLITE_ERROR","errcode":1811,"place":"app.errors","accountId":"…"}
Error: synthetic first@example.test |     at AccountDatabase.renewSession (file:///…/dist/server/database.js:272:14)
```

**Direction, not binding.** Give `sessions(request, response, …)` its own `next`: an error arriving with the headers sent is written and the response destroyed there, and it never enters the router. The `headersSent` branch in `errors` then has no caller left from the session library. Tests: A and C above, each asserting exactly one JSON line and no stack.

### I2 — Important — a failed start still writes plain text beside the one way of writing (`704a03e`)

**Place:** `src/server/main.ts:12-14`; also `src/server/main.ts:23`, see the second part.

**What is wrong.** `Loop could not start: LOOP2_LISTEN_PORT must be…` is a failure the server handles: it does not start. Its neighbours `Invalid or unavailable account configuration: …` went through `writeFailure`; this one stayed a plain `console.error`, with the setting's value in the sentence. To do 3 says „każdą awarię, którą obsłużył… jedną drogą zapisu i w postaci z pytania 9”. D-252's binding sentence says a log line of Node.js code is one JSON object, and its *complies* names „a failure the server handled written as one line with `failure`, `kind`, `code` and `place`”. By WAY-263 a change that departs from an entry it writes is Important; the author's rationale (choice 7) does not lower that.

**The test does not stop this.** `tests/startup.test.mjs:196-198` asserts only `result.stderr.includes(JSON.stringify(value))`, which a JSON field holding the value meets as it stands. Choice 7's „its test requires the value” does not rule out the line.

**Second part: the entry against the invariants.** The readiness line `Loop: <address>` at `main.ts:23` is plain text in the same log. The invariants `account-server-occupied-address` and `account-server-default-address` require that exact form, so the code is right and D-252 is broader than the product. Keep the code. Name the line in D-252's *Verification* as what complies, or in `### Identifiers in log lines`, so the entry stops forbidding what an invariant requires. If the orchestrator holds that this needs the human, because question 9's words are his, the rest of I2 does not wait for it.

### I3 — Important — no test protects the narrowed catch at the program check, the one the author chose it for (`e839cbf`)

**Place:** `src/browser/sim/saved-game.ts:258`; `tests/sim/saved-game.test.mjs`, „an error of the code in the load is no refusal…”.

**What is wrong.** `if (error instanceof ProgramCheckError) refuse();` is what stops a fault inside `checkProgram` or `matches` from reading as a damaged save. Replaced by a plain `refuse();` it is the catch-all of cause 6 again, at that site: a fault of the code answers `shape`, the page starts a new game and saves it over a save that may be whole. That is D-213's *violates* („a load that catches every error and answers a fault of the code with a refusal”). The author rejected exactly this in choice 2 („brings cause 6 back for any fault inside that function”), and yet it passes.

The test places its faults at the version, the team and the chest, and the view's fault at the document's root. None reaches a program. M12 and M13 covered the other catches; this one was never mutated.

**Evidence.** Stryker: `src/browser/sim/saved-game.ts:258` ConditionalExpression `true`, Survived. A real gap under *Mutation testing* in `guidelines/testing.md`. Confirmed by hand in the scratch worktree, with the condition removed: `tests/sim/saved-game.test.mjs` exit 0, 27 pass; `tests/view/account-screen.test.mjs` exit 0, 69 pass.

**Direction.** One more case for that test: a fault inside a program of the document, thrown through a `get` trap since `checkProgram` reads by property, asserted to leave the load as the error it is.
