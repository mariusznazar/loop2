# Author report — reguly-awarii-i-logow

**Status:** `done with concerns`

The whole change stands: entries, guidelines and code. The concerns are in *Concerns*. None stops the
review; two of them (C1, C2) are worth the human's eye at the merge.

- Branch `task/reguly-awarii-i-logow`, base `54b2b78`, pin `f45ca40`.

## Commits

| Commit | Subject |
|---|---|
| `3400178` | docs: :memo: adopt the six rules on failures and logs (D-252, D-253), an error of the code in the load is no refusal (D-213, D-96), and the files of each kind |
| `e839cbf` | fix: :bug: an error of the code in the load keeps the save and offers a retry, while a crafted document stays a refusal |
| `704a03e` | feat: :sparkles: write each failure with its kind, code and place and each business event through one log line, with a last-resort handler in each program that touches accounts |

`e839cbf` and `704a03e` were remade once, unpushed, to take the repository's subject form; the tree did
not change. Stage was by explicit paths.

## Foundation entries, for the request

Each with one sentence of its meaning in the task document's language.

- **D-252 (new, row 1):** Produkt przyjmuje wszystkie sześć reguł o awariach i logach; wiersz logu w Node.js to jeden obiekt JSON przez `console`; zasada zakresu i granica tego, co agent dodaje sam, stoją w decyzji.
- **D-253 (new, row 2):** Własną obsługę ostatniej szansy mają programy dotykające danych kont, a skrypty uruchamiane ręcznie albo przez bramkę spełniają regułę domyślnym wypisem środowiska.
- **D-213 (changed in place, row 3):** Żadna wartość dokumentu nie powoduje wyjątku, a błąd własnego kodu nie jest odmową: wychodzi jako wyjątek, zapis zostaje nienaruszony, a gracz dostaje zdanie z D-96. *Scope* gains `browser-view`, since the view now writes the line.
- **D-96 (changed in place, follows row 3):** Błąd kodu przy wczytaniu niczego nie odrzuca i pokazuje „Nie udało się wczytać gry. Spróbuj ponownie.” w `warning` z tym samym ponowieniem.

Rows stand as they were; no question for the human arose. *Rejected* of each holds only the ways the
row's source keeps (questions 1, 9, 4, 16). Question 10 keeps none. Question 12's not-chosen way stays
out of D-252, as row 1's *Source* does not name it.

## Files changed (added / removed lines, against `54b2b78`)

| File | + | − |
|---|---|---|
| `src/server/log-line.ts` (new) | 70 | 0 |
| `src/server/account-routes.ts` | 46 | 22 |
| `src/server/database.ts` | 31 | 17 |
| `src/server/account-mail.ts` | 27 | 21 |
| `src/server/configuration.ts` | 22 | 10 |
| `src/server/app.ts` | 20 | 5 |
| `src/server/account-block.ts` | 16 | 8 |
| `src/server/main.ts` | 12 | 7 |
| `src/server/account-backup.ts` | 9 | 4 |
| `src/browser/view/app.ts` | 61 | 17 |
| `src/browser/sim/programs.ts` | 45 | 24 |
| `src/browser/sim/saved-game.ts` | 25 | 13 |
| `foundations/decisions.md` | 80 | 13 |
| `guidelines/coding.md` | 112 | 0 |
| `guidelines/coding-browser-module.md` | 21 | 1 |
| `guidelines/coding-saved-game.md` | 13 | 4 |
| `guidelines/coding-mail-sending.md` | 9 | 6 |
| `guidelines/coding-simulation-module.md` | 8 | 0 |
| `guidelines/coding-content-data.md` | 6 | 0 |
| `guidelines/testing.md` | 2 | 2 |
| `guidelines/coding-http-application.md` | 1 | 0 |
| `.claude/skills/loop2-deploy/SKILL.md`, and its twin in `.agents/` | 14 | 10 |
| `…/references/troubleshooting.md`, twin too | 4 | 4 |
| `…/references/setup_and_secrets.md`, twin too | 2 | 2 |
| `tests/http.test.mjs` | 371 | 27 |
| `tests/account-storage.test.mjs` | 246 | 39 |
| `tests/view/account-screen.test.mjs` | 119 | 0 |
| `tests/sim/saved-game.test.mjs` | 108 | 0 |
| `tests/startup.test.mjs` | 93 | 0 |
| `tests/account-backup.test.mjs` | 61 | 0 |
| `tests/account-mail.test.mjs` | 45 | 0 |
| `tests/account-database-check-standin.mjs` | 21 | 2 |

35 files, +1740 −274. The part map does not change: the new file lies in `src/server/**`.

## Checks run

All at the final commit `704a03e`, tree clean, unless marked otherwise.

| Command | Exit |
|---|---|
| `npm test -- tests/http.test.mjs` (71 pass) | 0 |
| `npm test -- tests/account-storage.test.mjs` (63 pass) | 0 |
| `npm test -- tests/account-backup.test.mjs` (9 pass) | 0 |
| `npm test -- tests/startup.test.mjs` (18 pass) | 0 |
| `npm test -- tests/account-mail.test.mjs` (10 pass) | 0 |
| `npm test -- tests/sim/saved-game.test.mjs` (27 pass) | 0 |
| `npm test -- tests/view/account-screen.test.mjs` (69 pass) | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` (5) | 0 |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` (5, the twins byte-identical) | 0 |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 |
| `npm test -- tests/invariants/test_account_server_occupied_address.py` | 0 |
| `npm test -- tests/invariants/test_account_server_default_address.py` | 0 |
| `npm test -- tests/invariants/test_program_closed_lists.py` | 0 |
| `npm test -- tests/sim/rules.test.mjs` | 0 |
| `npm test -- tests/sim/trip.test.mjs` | 0 |
| `npm test -- tests/sim/program.test.mjs` | 0 |
| `npm test -- tests/sim/purity.test.mjs` | 0 |
| `npm test -- tests/view/game-saver.test.mjs` | 0 |
| `npm test -- tests/password-measurement.test.mjs` | 0 |
| `npm test -- tests/account-database-check.test.mjs` | 0 |
| `npm test -- tests/transport.test.mjs` | 0 |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 src tests/*.mjs tests/sim/saved-game.test.mjs tests/view/account-screen.test.mjs` | 0 |
| `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig --ignore-path .gitignore --check` on the same paths | 0 |
| `npm run typecheck` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` (0 errors) | 0 |
| `python -B .the-way/instruction-files/check_instructions.py .` (0 errors, 58 warnings; none on the new text) | 0 |

The 15 files of the table from `tests/quality/…` down ran on `704a03e` too, after the remade commits.

### Failing runs, in order

The `save-version` invariant's test seen failing, then passing, with the same command:

| Step | Command | Exit | What failed |
|---|---|---|---|
| tests written, no code | `npm test -- tests/sim/saved-game.test.mjs` | 1 | „an error of the code in the load is no refusal…”: `Missing expected exception (TypeError)`. The sweep passed: the behaviour existed through the catch-all. |
| the catch narrowed alone, to break the behaviour | same | 1 | „a crafted document of the current version is refused whole as shape” and „no value a document can hold…”: `"program: a rule has no action"`, thrown out of the load. The expected reason. |
| `ProgramCheckError` and `shown` added | same | 0 | |
| view tests written, no code | `npm test -- tests/view/account-screen.test.mjs` | 1 | both new load cases |
| page changed | same | 0 | |

The server's tests were written after its code, so they have no first failing run of their own, and two
failed at first on my assumptions: `npm test -- tests/account-backup.test.mjs` exit 1 (the stand-in's own
`standin-reached` line) and `npm test -- tests/account-mail.test.mjs` exit 1 (a server that closes at once
gives the library's `ECONNECTION`). Both were test fixes; see *Problems observed*.

### Mutation runs in place of a first failing run

21 temporary mutations, each a named bug, each restored after its run. Each row is
`npm test -- <file>` on the mutated code, exit 1 unless said. Raw log:
`~\AppData\Local\Temp\claude\C--Storage-repos-loop2\01850c25-c166-4fe4-9f66-851847009f35\scratchpad\mutations.txt`.

| Mutation | File run | Test that failed |
|---|---|---|
| M1 error handed on to Express after headers sent | `tests/http.test.mjs` | „a failure after the answer has left…” |
| M2 the line reads the error's message | `tests/http.test.mjs` | 5 tests |
| M3 server without last resort | `tests/startup.test.mjs` | both last-resort cases |
| M4 `account-block` without last resort | `tests/account-storage.test.mjs` | its last-resort case |
| M5 `account-backup` without last resort | `tests/account-backup.test.mjs` | its last-resort case |
| M6 program check formats with `String` | `tests/sim/saved-game.test.mjs` | the sweep alone, which `CRAFTED` does not catch |
| M7 kept state dropped when its load fails | `tests/view/account-screen.test.mjs` | the kept-state case |
| M8 error of the load starts a new game | same | both load cases |
| M9 no line for signing in | `tests/http.test.mjs` | the events case |
| M10 message written as sent whatever its outcome | same | the refusal-and-unsent case |
| M11 program refusal not turned into the load's | `tests/sim/saved-game.test.mjs` | `CRAFTED` and the sweep |
| M12 version reading takes every error for a refusal | same | the fault case |
| M13 archetype reading takes every error for a refusal | same | **exit 0, survived**, then exit 1 after the test's fault fired once |
| M14 database error lost from a failed start | `tests/startup.test.mjs` | the two-causes case |
| M15 refused recipient names no reason | `tests/account-mail.test.mjs` | the reasons case |
| M16 event for a block that changed nothing | `tests/account-storage.test.mjs` | the events case |
| M17 cleanup failure writes no line | same | the cleanup case |
| M18 block's error left out | same | the database-failure case |
| M19 backup's error left out | `tests/account-backup.test.mjs` | the failed-backup case |
| M20 refused session writes no line | `tests/http.test.mjs` | the failures case |
| M21 logout's failure writes no line | same | the failures case |

M13 was a real gap: a lasting fault at `team` hit the later reading too, so that catch was never
tested. The fix is in the test (`faultyAt` fires once). M12 and M13 ran again: exit 1 both.

### Checks not run

- **The full gate, `npm test` with no argument:** the orchestrator's run, as the dispatch gives.
- **Stryker on `src/browser/sim/`:** the reviewer's tool for these files (`guidelines/testing.md`).
- **The other `tests/invariants/`, `tests/deploy/`, `tests/quality/` and `tests/sim/` files:** left to the gate.
- **A real SMTP failure on the test server, and `docker logs` of a deployed container:** nobody ran them; D-12 keeps sending mail from an agent.
- **A real saved game state through the browser check:** the check stood in the server's two answers.
- **Code with no test of its own:** the reasons `CONNECTION_ENDED` and `NOT_ENCRYPTED` (see *Task values*), the `regenerate` branch and the second `destroy` of `establishSession`, the line `backup-output`, the `server-start` branch of `main.ts` for an error that is no `StartupFailure`, and the `:220` path „Account password readiness failed”. Each was read, none was run.

## Own-work check (section 3)

**Requirement likeliest unmet:** „Serwer zapisuje każdą awarię, którą obsłużył”, beyond the 8 places the
audit lists.

- **Check 1:** every `catch` and every `console` call in `src/server` listed by search, then read. **Showed:** each remaining bare `catch` is an expected refusal, a stored value's decode passed on as an error, a settings check, or `measure-passwords.ts`, whose lines 74 and 108 are deferred cause 10.
- **Check 2, what the search alone would miss:** the path after the answer has left. express-session hands a failed renewal to the error handler with the headers sent. The handler then called `next(error)`, and Express's own handler prints `err.stack` outside `NODE_ENV=test`: one failure, two records, the second quoting values, not in the audit's list. **Showed:** fixed, with a test (M1).

**Second requirement, „a crafted saved document stays a refusal”:** see *Handoff question 5* and the sweep. Every place of three documents takes 14 hostile values and a removal, and nothing throws. It found what `CRAFTED` could not: `String()` on `{toString:1,valueOf:1}` throws a `TypeError` inside the program check's message (M6).

**Changed screen (`ui_check.md`):** by D-87's route, in a browser, on the built game served locally, with
the real page and the real load, the server's two answers stood in and one language function faulted.

- Shown: the sentence „Nie udało się wczytać gry. Spróbuj ponownie.”, colour `rgb(254, 154, 0)` = token `--warning` `#fe9a00`.
- Focus on „Spróbuj ponownie”, visible ring in the screenshot; no game built; `GET` alone, so nothing saved.
- Console: `saved-game-load kind=TypeError code=none place=view/app.startFrom accountId=…`, no error text.
- After the retry: a second `GET`, game built.
- Screenshot: `~\AppData\Local\Temp\claude\C--Storage-repos-loop2\01850c25-c166-4fe4-9f66-851847009f35\scratchpad\load-failed.png`.
- The kitchen-sink page gains nothing: no new control or state; the sentence uses the existing warning and retry of the session check.

## Answers to the handoff's questions

1. **Both callers keep what they had.** The downloaded save stays on the server: nothing is built, so nothing saves. The kept state needed a change: `enter` set `kept = null` before the load, so a retry would have found nothing and loaded the older save. It now drops the state only after a successful load. A retry runs `checkSession`, that is the account request, then the kept state's load or the save's request. No save at the failure or at the retry of a downloaded save. On a retry that succeeds, the kept state is sent at once, as D-211 gives. A retry that finds another account drops the kept state (tested). A reload loses it, as D-211 accepts.
2. **„Nic tajnego w dzienniku” holds, reworded.** Its *Good* named „unknown”, and its text forbade anything coming from the mail server, which the library's kind and code arguably are. Now: of a library's error only its kind and code, nothing else; a failure with no library error names a reason code. The example „Dziennik porażki” changed with it. D-162 needs no change: it forbids credentials, tokens, links and messages.
3. **D-96 needs a clause, and has it.** Its *what the player sees* list would otherwise stay silent on a state D-213 now creates. The sentence itself lives in D-96, and D-213 points to it, so it stands once. This is no meaning beyond row 3.
4. **Yes, more than the question asks.** No test and not `deploy/loop2-backup`: that script reads exit codes alone, and sends the command's standard error to its log file, where the JSON line is safe under D-233. **But the deploy skill does**: three files in two copies quote `Account mail failed: <code>` as the thing to read in the logs. See *Task values*. Three tests read the old text and changed: see *Changed tests*.
5. **The line reads `name`, `code` and `errcode`, and never `message`, `stack`, `cause.message` or any other field.** A request or a document cannot reach them: `name` and `code` come from code and libraries and pass a closed pattern, `errcode` must be a safe integer, and everything else in a line is a literal of the code, an account's number from the database, or a constant. Anything else on the line goes through `JSON.stringify`, so no value can end a line. Observed: SQLite's `message` does quote values, a trigger's text with an address in it, and every SQLite error has the one `code` `ERR_SQLITE_ERROR`, so without `errcode` (14 no file, 26 not a database, 5 busy) the fix would have been hollow.

## Task values that did not pass my reckoning

- **„The deploy skill is not touched” (proposals P13; the task's *Human actions*: none).** False for its text: it told an agent to look for a line that no longer exists. I changed it, in both copies; *Human actions* stays `none`. No test would have caught this; only `test_both_copies_are_byte_identical` applied.
- **Cause 3's four places.** `:196` (`!connection.secure`) cannot be reached while `requireTLS` is set: the library refuses first with `ETLS`, which the new test shows. `:191` (`end` with no error) fires only for a server that closes an idle session; a close before the greeting is the library's `ECONNECTION`. The audit's „także dla braku szyfrowania” therefore never read „unknown” in practice. Both branches still name a reason, and the type `Finish` makes a reason compulsory.
- **Cause 2's fix as worded.** A kind and a code do not tell the cause apart for `Unsupported account database schema`, a bare `Error` with no code: the line would read `Error none`. It takes `ReasonedFailure("UNSUPPORTED_SCHEMA")`, with the old message kept.
- **To do 9 names only `blockAccount`.** `unblockAccount`, `confirmEmailAddress` and `resetPassword` lacked `accountId` the same way; `confirmEmailAddress` reads it only inside its transaction.

Counts passed: 16, 6 and 8 files, plus `account-routes.ts`; 9 new event lines.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| Whole-foundation search | `foundations/*.md` | the record-decision skill's step 2; D-13 read whole |
| `checkProgram` and its neighbours, read and changed | `src/browser/sim/programs.ts` | the load's catch-all was the only thing turning its errors into refusals |
| `skillProgress`, `pieceCount`, `characterName` | `src/browser/sim/` | to see what else the load can throw |
| Session store, transport, account policy | `src/server/` | to find every handled failure and the deadline |
| The mail library's close path | `node_modules/nodemailer/dist/esm/smtp-connection/index.js` | when `end` fires with no error |
| Tests and helpers | `tests/*`, `tests/deploy/*`, `tests/invariants/loop2_invariant_support.py` | question 4 |
| Deploy skill, changed | `.claude/skills/loop2-deploy/**`, `.agents/skills/loop2-deploy/**` | question 4 |
| The decision template's example, WAY-03 | `.the-way/foundations/decisions.md` | the skill's step 1; it adds *Changed tests* below |

I did not use a subagent. The browser tool left one log in `C:\Storage\repos\loop2\.playwright-mcp\`,
which I removed; the main checkout's status is clean.

## Searches not found or unclear

- **Screenshot route:** nothing in the foundation says „screenshot”. D-87 („a changed appearance is inspected in a browser”) was taken as the route.
- **The glossaries** hold no entry for a log, a failure or a refusal, in either file. „Case flow”, „last resort” stay plain words; no new term seemed needed.
- **Whether `accountId` belongs in the player's own browser console line:** the rule says a case-flow line carries it, and the player sees only their own account's number. Taken as yes.
- **Whether „wiersz logu” reaches the owner-facing sentences.** Unclear; see choice 7.

## Choices, the way rejected and the cost if wrong

1. **The load's error reaches the view as a thrown error.** Rejected: a third result. A caller that forgets a third result reads `ok: false` and starts a new game over the save; one that forgets a throw overwrites nothing. If wrong: an uncaught error, until task 8, for a future caller.
2. **`ProgramCheckError`, 18 throw sites.** Rejected: a catch-everything around `checkProgram`. It is shorter but brings cause 6 back for any fault inside that function. If wrong: a line more for each new throw site, and a site left as a plain `Error` becomes a retry; the sweep catches that.
3. **`shown()` in the check's messages.** Rejected: leaving `String()`. Cost: an object reads „an object” in a message; no test read the old text.
4. **`BlockOutcome`, `UnblockOutcome` and `ConfirmOutcome` became objects, `ResetOutcome` gained `accountId`,** as `SaveOutcome` stands. Rejected: a read before or after the block, which is racy, or after the commit could turn a success into „Nothing changed”. Cost: about 60 test lines.
5. **`Mailer.send(message, fields?)`.** Rejected: a mail line with no account, against *Identifiers in log lines*; or a second line from the route, against „once”. Cost: an optional parameter the mailer only passes on. D-162 holds: HTTP and the database stay unknown to it.
6. **The failure line of a start keeps the sentence as `failure`:** `Invalid or unavailable account configuration: LOOP2_…`. Rejected: a stable word with a `setting` field. It keeps the skill's table of log texts and To do 4's „zachowuje”. Cost: that one field's value varies. Only a `StartupFailure`'s own sentence stands there; `main.ts` no longer reads any other error's `message`, which it did.
7. **The commands write a JSON line and then their sentence unchanged.** Rejected: appending kind and code to the sentence, a second way of writing. The usage refusals, `LOOP2_LISTEN_PORT` (its test requires the value) and the readiness line `Loop: …` (the invariant requires it) stay plain: they are no failure with an original error, or are read by exact form. If the review reads Q9 more widely, those lines change with their tests.
8. **`errcode` as a further field.** Rejected: folding it into `code`. Cost: one more field.
9. **With headers sent, the handler calls `response.destroy()`, then `next()` with no error.** `next` must stay used, since Express needs four parameters and the linter refuses an unused last one; with no error Express's handler stays silent.
10. **`failure` values are stable words,** `place` a literal `file.function`. Rejected: parsing the stack, whose text can quote the message; line numbers drift.
11. **Events go to standard output, failures to standard error.** `account-backup` writes no event, so its standard output stays the backup's bytes.
12. **`already-blocked` and `not-blocked` write no event:** nothing changed.
13. **Event names added beside the task's words in `### Logging scope`,** for a search. Rejected: only the words. Cost: the list names code words.

No section 4 adaptation: there is no plan.

## Changed tests

Reasons per *Changing an existing test*. No assertion was weakened, with the one narrowing named.

**Invariant tests altered (WAY-03: the request names them).** All in `tests/http.test.mjs` and
`tests/account-storage.test.mjs`. The change in each: the outcome read through `.outcome` with the same
expected word, or `accountId` added to a reset's expected value, so the assertion is stricter.

- `tests/http.test.mjs`, `.outcome` only: „no session of a blocked account authorizes lookup or logout…”; „a blocked account's correct password gets its own refusal…”; „only a valid session of an unblocked account asks for a message…”; „a block committed through another connection while the message is on its way…”; „every token that does not work gets the one refusal…”; „a block, a later link or an expiry committed during the hashing…”; „no session, a forged or removed session and a session of a blocked account…”.
- `tests/http.test.mjs`, counting `failureLines` instead of all lines, since 9 events now share the log (requirement: To do 9): „a well-formed address gets the same answer…”, „a failed lookup after the answer…”, „no answer and no line of the server's log holds a reset link's token…”. The invariant is `password-reset-verified-email`; the line's expected content is unchanged or stricter.
- `tests/account-storage.test.mjs`: „a version-1 database opens as version 4…”; „a version-2 database opens as version 4…”; „a block committed through another connection before a save…”; „a confirmation link confirms its account once…”; „an unknown link or a link of another kind…”; „a confirmation link works until the millisecond before its expiry…”; „issuing a confirmation link stops the account's earlier one…”; „a confirmation link of a blocked account changes nothing…”; „a block committed through another connection stops every link issued before it…”; „a block committed through another connection between the check and the reset…”; „blocking deletes every session of that account…”; „the owner's command stops every emailed link…”.

**The one narrowing:** „the owner's command changes nothing on a usage error…” forbade `SQLITE_|errcode` in the command's output; it now forbids `database is locked` and the rest, without those two. Source: To do 6, cause 4, which names `src/server/account-block.ts:18`.

**Stand-in:** `tests/account-database-check-standin.mjs` gained modes `uncaught` and `rejected`. `DatabaseSync` is a subclass there now; the release check's tests still pass.

## Concerns

- **C1. The block's event reaches only the owner's terminal.** `docker exec` output does not enter `docker logs`, so the lines „konto zablokowane” and „konto odblokowane” exist once, on the screen, and the promise of the list is kept only in the letter. Where logs go is out of scope (WAY-271), so I changed nothing. Same for the commands' failure lines, except that the backup's reach `/var/log/loop2-backup.log`.
- **C2. A lasting fault in the load leaves a player unable to play** until the code is fixed, by question 16's own choice, with the save intact. A reload loses a kept state. No line reaches the owner: it stands in the player's console alone.
- **C3. The last resort starts after the imports.** An error while a module loads still gets Node's default print. Nothing there touches data.
- **C4. `account-block` exit 1 after a commit.** The skill says every non-zero exit changed nothing. A last-resort exit after the commit, an output failure say, would be untrue there, as Node's default exit was before.
- **C5. The test title** „…one fixed line in the log…” is kept, since `guidelines/testing.md` cites it, though the line is now JSON.

## Problems observed

- **`npm test -- tests/account-mail.test.mjs` exit 1 at first:** I assumed a close before the greeting fires `end`. The library's source and the run showed `ECONNECTION`. Verified by reading `_onClose`.
- **`npm test -- tests/account-backup.test.mjs` exit 1 at first:** the stand-in writes `standin-reached` to standard error. Verified by the `SyntaxError` on that text.
- **Guess, unverified:** a client that aborts in the middle of a body may reach the handler as a 500 with `type` `request.aborted`, since the handler knows only four types, and write a `failure` line. The line would be clean; only its count is the client's to choose.
- **A long heredoc failed the shell once** with `unexpected EOF`; the cause is unknown, nothing ran, and the script went through a file instead.
