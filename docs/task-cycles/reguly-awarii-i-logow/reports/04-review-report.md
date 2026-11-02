FAIL 704a03e8e5262d9865a4e707b7dc5d1969c7ced2

# Review of the whole change — reguly-awarii-i-logow

Range `54b2b7831cfb08c8e2d3eda8bfaf87b9a4205470..704a03e`, head confirmed by `git rev-parse HEAD`. Route: one author, no plan, so no finding has a slice. All blocking findings come from commit `704a03e` or `e839cbf`, as named.

Counts: 3 blocking (Important), 3 Minor, 2 out of scope.

## Blocking findings

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

## Minor findings

- **N1 — a client that hangs up writes a failure.** `src/server/app.ts:68-83` knows four body-error types, so `request.aborted` counts as 500 and writes `{"failure":"request","kind":"BadRequestError","code":"ECONNABORTED","place":"app.errors"}`. Confirmed by `probe-abort.mjs`, turning the author's guess into a fact. The line is clean, but a hang-up is no failure of the product (`### Recording a failure`), and its count is the client's to choose. A crafted body, an unknown charset and bad path escapes all gave no line.
- **N2 — one failure, two lines, in the commands.** `src/server/account-backup.ts:86-87` and `:95-97`, `src/server/account-block.ts:79-83` write a JSON line and then their sentence, both to standard error. For the backup both land in `/var/log/loop2-backup.log`. To do 6 says „dopisują”, the rule says „raz”. Choice 7 names this. The JSON line is the only one with `"failure"`, so a search still finds one.
- **N3 — reasons in a rule's text.** `guidelines/coding.md:173` („bo domyślny wypis mógłby zacytować wartości”) and `:174-175` („bo zapisuje to, czego nikt nie obsłużył”). The template: „A rule carries no reason: the reasons stand in the decisions it names (WAY-168).” D-253 already holds both.

## Out of scope

Both go beyond the task and count as out of scope.

- **O1 — the block's events reach only the owner's terminal (author's C1).** `account-blocked` and `account-unblocked` go to the standard output of a `docker exec`, which does not enter `docker logs`. The line exists, so To do 9 is met as worded. Where logs go stays with the step that settles technology (template, WAY-271). It is worth the human's eye at the merge: the promise of `### Logging scope` holds for these two only as long as the terminal does.
- **O2 — a guard with no simulation test.** `src/browser/sim/programs.ts:249`, `typeof group.name !== "string"`, survives Stryker. The condition predates the change, only its error class changed, and `tests/invariants/test_program_closed_lists.py` is outside Stryker's run, so this does not prove a gap in the gate.

## Declined to judge

- `account-block.ts` prints the address in its sentences to the owner's terminal: predates the change, is no log file, and the audit itself says „do rozważenia, nie złamanie”.
- `src/server/account-database-check.ts:83` prints `error.message`: synthetic data only, and the task counts it as already meeting the rule.
- Author's C2, a lasting fault leaves a player unable to play, with no line reaching the owner: question 16's own choice.
- Author's C3, an error while modules load gets Node's default print: outside To do 8 as settled.
- Author's C4, `account-block` exit 1 after a commit: predates the change.
- Causes 5 and 8–13: deferred by question 6.
- The untouched `deploy/loop2-deploy` and `deploy/loop2-backup`: the task's *Context* leaves them.
- How long logs live and how a human learns of a failure: *Out of scope* of the task.
- The branches the author lists as having no test of their own (`CONNECTION_ENDED`, `NOT_ENCRYPTED`, `regenerate`, the second `destroy`, `backup-output`, `server-start`, the readiness path): read, each writes through `writeFailure` correctly; broader coverage only.

## The task, item by item

| To do | State | Note |
|---|---|---|
| 1 | met | D-252, D-253, D-213 changed; D-96 follows row 3 (handoff of the author, question 3). |
| 2 | met, N3 | Six rules in the template's order after `### Dependency audit`, *Decision* D-252, *Invariant*, *Good*, *Bad* as asked; both sub-items stand. |
| 3 | **not met**, I1, I2 | The audit's 8 places all read and fixed; the paths beyond them are not. |
| 4 | met | All four places; `UNSUPPORTED_SCHEMA` is needed and right. |
| 5 | met | `coding-mail-sending.md` changed with it. |
| 6 | met, N2 | |
| 7 | met in behaviour, I3 on its test | Both callers keep their state; retry works. |
| 8 | met | `installLastResort` before the work in all three. |
| 9 | met, O1 | Nine lines; `accountId` reaches each. |
| 10 | met | 16, 6, 8 and 1 rows counted by script; no row names an absent file; the files without a kind are those of proposals P11, with `log-line.ts` new. |

*Acceptance criterion:* met for every new line. The raw print of I1 is an old line, not a new one, which is why it is a To do 3 and rule finding.

*Settlements:* rows 1, 2 and 3 are met by D-252, D-253 and D-213 with `coding-saved-game.md`. D-252 holds three binding sentences as WAY-279 asks. *Rejected* of each holds only ways its source keeps. Nothing altered or invented against questions 1, 4, 9, 10, 16. The one departure in substance is I2's second part, where the settled sentence itself is wider than the invariants.

*Reserved choice:* none; no library added.

*Own-work check:* the requirement named, „każdą awarię, którą obsłużył”, is the right one and does fit where the change is weakest. Check 2 found the real mechanism and then stopped at one position of it, so it would not catch I1.

*Screen:* `load-failed.png` shows the sentence in `warning`, the retry with its focus ring and no game. It meets the styleguide's warning role and the shared control. Read as the author's evidence; no browser run of mine.

## Handoff questions

1. **Can any line hold a secret, address, whole object or body?** Yes, by one path: I1. Every line through `writeFailure` and `writeEvent` is clean: `name` and `code` pass closed patterns, `errcode` must be a safe integer, the rest are literals, an account's number, or `listen` (the server's own host and port). `StartupFailure`'s sentences are all literals. The plain port line of I2 quotes a setting's value. The session-store and mail libraries print nothing themselves; `express-session/index.js:154` warns only for its memory store, which is unused.
2. **Once each?** Not always: I1 case C twice, I1 case A with no JSON line, N2 two lines by design. `boundedSending` and the mailer do not double up: at the equal 10-second defaults the mailer's timer fires first and its resolve clears the route's. `abandon` and its `destroy` are two failures.
3. **The eleven events.**

| Event | Line | Fires on | When nothing changed |
|---|---|---|---|
| konto założone | `account-routes.ts:708` | account created | no: 409 returns first |
| logowanie | `account-routes.ts:232` | session stored, both routes | no: a store that refuses throws (`database.ts:355`) |
| wylogowanie | `account-routes.ts:650` | session destroyed | no |
| odnośnik wystawiony | `account-routes.ts:330` | `issued` only | no: `limited`, `blocked` return first |
| wiadomość wysłana | `account-routes.ts:340` | `sent` only | no |
| adres potwierdzony | `account-routes.ts:502` | `confirmed` | in the letter it could: the `UPDATE` at `database.ts` has `email_confirmed_at IS NULL`, so a live link on a confirmed account would fire with nothing changed. One process cannot make such a link: resend checks and issues in one turn, and a confirmation spends all links. |
| hasło ustawione | `account-routes.ts:622` | `reset` | no |
| konto zablokowane | `account-block.ts:95` | `blocked` | no; tested. O1 |
| konto odblokowane | `account-block.ts:97` | `unblocked` | no; tested. O1 |
| kopia bazy wykonana | `deploy/loop2-backup`, `end: sent …` | sent, exit 0 | no |
| wdrożenie | `deploy/loop2-deploy:391`, `deployed …, previously …` | every finished run | yes: a redeploy of the running commit writes it, and the line shows both commits |

4. **Does a document's value reach an unexpected error?** No. I read `saved-game.ts` whole, the lines the audit only searched included, with `programs.ts`, `skills.ts`, `trip.ts`, `hex.ts`, `characterName` and `mapRunEnded`. Every value reaches a helper only after its type check; closed lists go through `Object.hasOwn`; `matches` recurses along the canonical value, so nesting in a document cannot exhaust the stack; `shown` keeps `String` from an object. No plain `throw new Error` stands on the load's path. A wider sweep agreed: 120 720 loads, 47 values and a removal at every place of three documents, among them 50 000 nested lists, 70 000-character text, `__proto__` and `constructor` as strings and keys, and numbers at their limits. Nothing threw. The risk runs the other way: I3.
5. **Does D-222 still hold?** Yes. The answer still ends before `setImmediate` starts the work; the change adds only synchronous `console` writes after it. `limited` and `blocked` still leave no line, as D-222 and its comment say. A failure shows only in the log, as a kind and code without the address. I1 does reach a reset request's renewal, but only as a log line.

## Changed invariant tests

All named by the author, and checked in the diff. Each reads `.outcome` with the same expected word or adds `accountId` to a reset's value, in `tests/http.test.mjs` and `tests/account-storage.test.mjs`. Three in `tests/http.test.mjs` under `password-reset-verified-email` count `failureLines` in place of all lines („a well-formed address gets the same answer…”, „a failed lookup after the answer…”, „no answer and no line of the server's log holds a reset link's token…”): justified, since events now share the log. The one narrowing, „the owner's command changes nothing on a usage error…” no longer forbids `SQLITE_|errcode`, follows To do 6. None weakened otherwise.

## Mutation run

`node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "<the changed ranges of saved-game.ts and programs.ts>"`, exit 0, in a separate worktree: 229 killed, 27 survived, 1 without coverage (89.11 %). The ranges are in `.runs/task-cycles/reguly-awarii-i-logow/review-scratch/stryker.out`, the report in `stryker-mutation.json` beside it.

| Survivors | Class | Why |
|---|---|---|
| `saved-game.ts:258` | **real gap** | I3 |
| `programs.ts:249` | gap in a line this change did not write | O2 |
| `saved-game.ts:1257`, `:1273`; `programs.ts:50`, `:86`, `:192`, `:225` | equivalent | the conjunct after it, or `getOwnPropertyDescriptor` on a value JSON can hold, gives the same result |
| `programs.ts:80` and its no-coverage message at `:82` | equivalent | callers pass only kinds that take a number |
| `programs.ts:96` | not worth keeping | the tolerance's exact boundary |
| `programs.ts:34`, `:35` and the 15 remaining `StringLiteral`, `saved-game.ts:104` among them | not worth keeping | text of a message nobody reads; what `shown` protects, that nothing throws, is held by the sweep |

## Checks

| Check | Exit |
|---|---|
| `git rev-parse HEAD` | 0, the given head |
| `python -B .the-way/elements/common/foundation_check.py` | 0, 0 errors |
| `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` | 0 |
| `NODE_ENV=production node …/review-scratch/probe-express.mjs` | 0; shows I1 |
| `NODE_ENV=production node …/review-scratch/probe-abort.mjs` | 0; shows N1 |
| Stryker, as above | 0 |
| `node --test --test-name-pattern="no value a document can hold" tests/sim/review-fuzz.test.mjs`, a scratch copy of the test file with a wider list | 0, 120 720 loads. A first attempt reported a pass on an empty file, because the script writing it had failed; it is discarded. |
| `python -B scripts/test.py tests/sim/saved-game.test.mjs`, the mechanism of `npm test -- <file>`, in the scratch worktree | 0, 27 pass |
| same, `tests/view/account-screen.test.mjs` | 0, 69 pass |
| same, `tests/startup.test.mjs` | 0, 18 pass |
| same, `tests/account-backup.test.mjs` | 0, 9 pass |
| same, `tests/account-mail.test.mjs` | 0, 10 pass |
| same, `tests/account-storage.test.mjs` | 0, 63 pass |
| same, `tests/http.test.mjs` | 0, 71 pass |
| same two sim and view files with `saved-game.ts:258` mutated | 0, 27 and 69 pass; shows I3 |

The probes ran against the reviewed worktree's ignored `dist/`, built at 01:22 after the last source change. The scratch worktree is removed; the reviewed worktree's `git status --short` shows nothing and its head is unchanged. Probes and outputs stay in `.runs/task-cycles/reguly-awarii-i-logow/review-scratch/`.

**Not run:**
- The full gate: the orchestrator's run, as the dispatch gives.
- A browser run of the failed load: the author's screenshot was read instead.
- A real SMTP failure and `docker logs` of a deployed container: D-12 keeps sending mail from an agent, and no deployment exists for this branch.
- `python -B .the-way/instruction-files/check_instructions.py .`: the author's report only.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| Error handling of the libraries | `node_modules/express/lib/application.js`, `node_modules/express-session/index.js`, `node_modules/router` as recalled and confirmed by the probe | question 1 |
| The task's sources | `C:\Storage\repos\loop2\.runs\coding\failure-rules-proposals.md`, `failure-rules-critique-verdict.md`, `audit-server.md` | named by the handoff. `audit-browser.md` and `audit-simulation.md` were not opened; the task's own text of causes 5, 6, 8, 12 served. |
| Deploy scripts | `deploy/loop2-backup`, `deploy/loop2-deploy` | question 3 |
| The vault's task file, existence only | `Notes/Projects/(P) Loop/_zadania/reguly_awarii_i_logow_loop2.md` | *Origin* of D-96, D-213, D-252, D-253 |

## Searches not found or unclear

- **My foundation selection is narrower than the method gives.** The decisions whose *Scope* names a touched part come to about 465 KB. I searched them for log, console, error and printing and read whole only D-13, D-96, D-162, D-211, D-213, D-224, D-231, D-233, D-252, D-253, with D-222 up to its *Rationale*; of the invariants `save-version`, `account-server-occupied-address`, `account-server-default-address` and `password-reset-verified-email`. A decision of these parts that bears on the change without those words was not read.
- **Guidelines:** `coding.md` and `testing.md` read whole, the longest table row of `testing.md` only in part. Of `coding-http-application.md`, `coding-database-access.md`, `coding-session-store.md`, `coding-mail-sending.md` and `coding-browser-module.md` the rules and examples the change reaches; `coding-saved-game.md`, `coding-simulation-module.md` and `coding-content-data.md` through the diff; the styleguide through its rules on warnings. Unchanged rules there were not compared with the change.
- **Whether `failure` may hold a sentence** (choice 6, `main.ts:51`): D-252 fixes the field names, not their values. Taken as allowed; the sentences are literals.
- **Whether question 9's „wiersz logu” reaches a command's answer to its operator:** unclear in the task. Read as no for `account-block`'s terminal; for the backup, whose standard error is a log file, N2.
