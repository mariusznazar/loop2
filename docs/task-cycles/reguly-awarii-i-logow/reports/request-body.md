**Ready for review, with one failed gate run to read first.** Every review ended in `PASS`. No question is open and no human action is waiting.

When something fails on the server, the owner and an agent now see why. Each handled failure writes one line with its kind, code and place. Eleven events of an account's life and the server's operation are promised in the logs, and nine new lines make that true in the code. A fault in the game's own code while reading a save no longer overwrites the save: the player sees „Nie udało się wczytać gry. Spróbuj ponownie.” with a retry button.

## Before you merge

- **The last gate run on this tree failed once, on a flaky test this change did not touch.** `npm test` on `b891590` gave exit 1; see *Checks*. The reason is known and is in the test, not in the code of this task. The fix is not in this request, because the task does not ask for it. Leaving it means the same test can stop a later gate at random, about once in 7 000 readings of that value. A separate task fixes it with one line of the test.
- **The block and unblock events reach only your terminal.** `account-block` runs through `docker exec`, whose output does not enter `docker logs`, so „konto zablokowane” and „konto odblokowane” are written, but they stay on the screen. To do 9 is met as worded. Where logs go is out of scope (WAY-271), so the promise in `### Logging scope` holds for these two only as long as your terminal does.
- **A lasting fault in the load leaves a player unable to play until the code is fixed,** with the save intact. That is question 16's own choice. The line stands in the player's browser console alone, so nothing reaches you as the owner, until task 8 of the MVP2 plan.
- **The readiness line `Loop: <address>` stays plain text** beside the JSON lines. Two invariants fix its exact form, and the six rules speak of failure and event lines, so D-252's *Verification* names it as complying. This was the cycle's reading (Q4), not your answer. If you read it as a log line, those two invariants change in a later task.
- **The reviews read less of the foundation than the method gives.** The first reviewer searched the decisions of the touched parts, about 465 KB, for log, console, error and printing, and read only the hits whole. A decision that bears on the change without those words was not compared with it.

## Task and sources

- Task: `reguly_awarii_i_logow_loop2.md` (vault, `Notes/Projects/(P) Loop/_zadania`), accepted 2026-11-02; independent of the MVP2 plan, to enter before its task 1.
- Sources: the task's cited audit and proposals at `54b2b78`, the commit the task names; unchanged.
- Process pin: `.the-way` at `f45ca40`, not moved. Base `54b2b78`; `main` has not moved since, so nothing was merged in.

## The cycle

- **No spec:** the task's settlements leave no open design choice. How the load's unexpected error reaches the view was a way of making row 3, which the author made and named.
- **Route: one author without a plan,** class `same` as the orchestrator's, because ten items with their places and fixes stated in the task fit one agent, across five parts and two trust boundaries.
- **Trust boundary:** yes, `src/server/**` and `src/browser/sim/saved-game.ts`; each review checked crafted input there. **Irreversible operation:** none.

| Stage | Commits | Result |
|---|---|---|
| Whole change | `3400178`, `e839cbf`, `704a03e` | `FAIL`: three blocking |
| Fix | `a62d20f`, `717ed83`, `43f596f` | `PASS` |
| Return step | `defa71f` | `FAIL`: one blocking |
| Fix of the return step | `b891590` | `PASS` |

The findings that blocked: Express still printed a failure's stack by a path after the answer had left; a refused listening port wrote plain text; no test protected the narrowed catch at the program check; D-253 kept an exception outside its binding sentences. Each was fixed once, with a failing run or a mutation behind its test. One detail the first reviewer asked for was contested with evidence and dropped by the same reviewer: a route and a session renewal that both fail write two lines, because they are two failures.

## What changed and why

- **The six rules (To do 1, 2):** `guidelines/coding.md` gains them after `### Dependency audit`, under D-252, with the logging list, and the rule on a last-resort handler under D-253.
- **One way of writing (To do 3):** new `src/server/log-line.ts`; a line is one JSON object through `console`. All 8 places of cause 1 write through it, and so does the path found beyond them: a failed session renewal after the answer has left, which reached Express and printed a stack.
- **A server that does not start (To do 4):** the message keeps the setting's name and adds the kind and code of the original error, without its value; an unsupported database schema now names itself.
- **Mail (To do 5):** each failure with no library error names its reason, and „Dziennik porażki” changes with it. Two of the four places cannot be reached today; both still name a reason.
- **The commands (To do 6, 8):** `account-backup` and `account-block` write a line with kind and code and then their sentence, and each has a last-resort handler, as the server has.
- **The load of a saved game (To do 7):** a value of a document is still a refusal; only a fault of the code leaves the load as an error, through the new `ProgramCheckError`. The page keeps the save and a state kept in page memory for the retry.
- **Events (To do 9):** nine lines with `accountId`. To reach it, `blockAccount`, `unblockAccount`, `confirmEmailAddress` and `resetPassword` now return it; the task named only the first.
- **Kind tables (To do 10):** 16, 6 and 8 files and `src/server/account-routes.ts`, with `do not copy` on the three the task names.
- **Beyond the task's list:** the deploy skill, in both copies, told an agent to look for a line that no longer exists; its text changed. Proposals P13 had said it stays untouched. No deployment step changes.

36 files, +1876 −278.

## Checks

- **`npm test` on `b891590`, the tree of this request: exit 1.** Node 1165 pass, 2 fail, then the gate stopped. The failure is „unrepresentable renewal age” and its parent „persisted cookies must be usable after database expiry replacement and package renewal” (`tests/account-storage.test.mjs:1828`), `5001 !== 5000`.
  - **Runs of the gate in this cycle: failed in 1, passed in 2** (base `54b2b78` and `43f596f`). Rerun of the file for diagnosis only: 40 of 40 passed.
  - **Why it happens:** `Store.createSession` of express-session rebuilds the cookie through `maxAge`, reading `Date.now()` twice, so a clock tick between the two moves the expiry by 1 ms. A probe saw it in 393 of 3 000 000 runs. The test expects the exact value. Its lines are unchanged here, and `src/server/session-store.ts` is unchanged.
  - **Not run in that gate, because it stopped:** the Python tests and `foundation_check.py`. Run on their own on `b891590`: `python -B .the-way/gate/run_tests.py` exit 0, 377 tests; `python -B .the-way/elements/common/foundation_check.py` exit 0, 0 errors. This does not make the gate run a pass.
- `npm test` on `43f596f`, the reviewed code, before two commits of text alone: **exit 0**, Node 1167/1167, 0 skipped; 377 Python tests; 0 errors.
- On the base: no check fails.
- Mutation run by the reviewer on the changed ranges of the load: 229 killed, 27 survived, 1 without coverage; one survivor was a real gap, fixed as I3; after the fix 7 killed, 0 survived on that catch.
- A sweep by the reviewer, 120 720 loads with 47 hostile values at every place of three documents: nothing threw.
- **Unchecked:** a real SMTP failure and `docker logs` of a deployed container; a real saved game through the browser check, where the server's answers were stood in; the Node.js release of the built image, since `Dockerfile` floats on `node:24-slim`.
- **Code with no test of its own:** the mail reasons `CONNECTION_ENDED` and `NOT_ENCRYPTED`, the `regenerate` branch and second `destroy` of `establishSession`, the line `backup-output`, the `server-start` branch of `main.ts`, the password-readiness path, the guard `!response.writableEnded` at `src/server/app.ts:68` and the `headersSent` branch in `errors`. Each was read, not run.
- Own-work checks (WAY-164): every `catch` and `console` of `src/server` read, which found the path after the answer; a sweep of hostile values, which found a throw inside the program check's message.
- UI state, in a real browser on the built game: the sentence in `warning` (`--warning` `#fe9a00`), focus on „Spróbuj ponownie”, no game built, a `GET` alone so nothing saved, a game after the retry. The screenshot stands in the author's scratchpad and not in the record.

## What this request settles

New entries, from *Settlements to record*:

- **D-252 (row 1):** Produkt przyjmuje wszystkie sześć reguł o awariach i logach; wiersz logu w Node.js to jeden obiekt JSON przez `console`; zasada zakresu i granica tego, co agent dodaje sam, stoją w decyzji.
- **D-253 (row 2):** Własną obsługę ostatniej szansy mają serwer, `account-block` i `account-backup`; skrypty uruchamiane ręcznie albo przez bramkę, które nie dotykają danych kont, spełniają regułę domyślnym wypisem Node i Pythona; `account-database-check`, `measure-passwords`, `deploy/loop2-backup` i `scripts/restore-trial.mjs` już mają swoją obsługę i decyzja nie wymaga od nich więcej.

Changed entries:

- **D-213 (row 3):** Żadna wartość dokumentu nie powoduje wyjątku, a błąd własnego kodu nie jest odmową: wychodzi jako wyjątek, zapis zostaje nienaruszony, a gracz dostaje zdanie z D-96. *Scope* gains `browser-view`, since the view writes the line.
- **D-96 (follows row 3):** Błąd kodu przy wczytaniu niczego nie odrzuca i pokazuje „Nie udało się wczytać gry. Spróbuj ponownie.” w `warning` z tym samym ponowieniem.

New environment facts, which D-253 rests on:

- **`node-uncaught-default-print`:** Domyślny wypis nieobsłużonego błędu w Node.js 24: stos z nazwą klasy i treścią błędu oraz kod wyjścia 1.
- **`python-uncaught-default-print`:** Domyślny wypis nieobsłużonego wyjątku w Pythonie 3.14 na standardowe wyjście błędów.

Beside them:

- **Invariant tests altered (WAY-03):** 7 in `tests/http.test.mjs` read the outcome through `.outcome`; 3 there count failure lines instead of all lines, since events now share the log; 12 in `tests/account-storage.test.mjs` read `.outcome` or expect `accountId`. One narrowing: „the owner's command changes nothing on a usage error…” no longer forbids `SQLITE_` and `errcode`, as To do 6 requires. Each is named in the author's report, *Changed tests*.
- **Surfaces altered (WAY-49):** none; the part map names none for these files. **Violated marks (WAY-51):** none.
- No invariant, glossary term or part-map entry is written or changed.

## Questions

None.

## Minor findings, for you to choose which become tasks

Whole-change review (`reports/04-review-report.md`):

- **N1 — a client that hangs up writes a failure.** `src/server/app.ts:68-83` knows four body-error types, so `request.aborted` counts as 500 and writes `{"failure":"request","kind":"BadRequestError","code":"ECONNABORTED","place":"app.errors"}`. The line is clean, but a hang-up is no failure of the product (`### Recording a failure`), and its count is the client's to choose.
- **N2 — one failure, two lines, in the commands.** `src/server/account-backup.ts:86-87` and `:95-97`, `src/server/account-block.ts:79-83` write a JSON line and then their sentence, both to standard error. To do 6 says „dopisują”, the rule says „raz”. The JSON line is the only one with `"failure"`, so a search still finds one.
- **N3 — reasons in a rule's text.** `guidelines/coding.md:173` and `:174-175`. The template: „A rule carries no reason: the reasons stand in the decisions it names (WAY-168).” D-253 already holds both.

Review of the fix (`reports/07-fix-review-report.md`):

- **N1 — two guards without a test.** `if (!response.writableEnded)` at `src/server/app.ts:68` is told apart from a plain `destroy()` by nothing. The `headersSent` branch in `errors` lost its only test with the case it replaced, and a read that fails while `express.static` is streaming a file reaches it.
- **N2 — `listen` now holds a raw setting in one line and an address in another** (`src/server/main.ts:16-21`). Field meaning only.
- **N3 — D-252's *Origin* does not name the source of the new *complies* item.** Answered in the return report: the template does not want it there, and the later reviewer agreed.

Review of the return step (`reports/10-return-review-report.md`):

- **N1. Four of the five quoted passages keep the source's markup** (`foundations/environment_facts.md:422`, `:428`), while the template wants the text a reader sees.
- **N2. The reading left open on D-252 is wider than the return report says** (`src/server/account-database-check.ts:83`-`:85`, `src/server/measure-passwords.ts:384`). These lines have no JSON line beside them and quote `error.message`, on made-up data. Whether a line to the person running a command is a log line stays unclear in the task.

Review of its fix (`reports/13-return-fix-review-report.md`):

- **N1. „które” in the guideline can attach to the tests** (`guidelines/coding.md:173`-`:174`); placing the qualifier by „skryptach” removes the doubt.

## Outside the task's scope

- **O1 — the block's events reach only the owner's terminal (`src/server/account-block.ts:95`, `:97`).** See *Before you merge*.
- **O2 — a guard with no simulation test.** `src/browser/sim/programs.ts:249`, `typeof group.name !== "string"`, survives Stryker. The condition predates the change, only its error class changed.

No check outside the task's parts failed and passed again.

## Choices and the record

- 22 other choices, in the record's questions table.
- Record: [cycle.md](https://github.com/mariusznazar/loop2/blob/RECORD_SHA/docs/task-cycles/reguly-awarii-i-logow/cycle.md), with the reports, the frozen task and the time, models and tokens in `stages.md` beside it.
- **Please merge with a merge commit, as earlier requests were,** so that this link keeps working.
