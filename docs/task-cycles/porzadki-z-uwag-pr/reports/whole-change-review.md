FAIL c1b371d1ce87305abe8691ab13ad51cb59371080

# Review of the whole change: porzadki-z-uwag-pr

- Range: `00aa818..c1b371d`. `git rev-parse HEAD` is `c1b371d1ce87305abe8691ab13ad51cb59371080`. `.the-way` is at `294af7fde45323ac1851c014a03071a97fc38d96`, which matches the gitlink.
- Read whole: the handoff, `.the-way/task-cycle/review/SKILL.md`, `whole_change.md`, `task.md`, `plan.md`, the executor reports of the slices that had no review of their own (`04-foundation-report.md`, slices 1, 8, 10, 11, 12), `05-docker-docs-excerpts.md` and the diff of the whole range.
- Counts: 1 blocking finding (Important, inside the task), 13 Minor findings inside the task, 3 Minor findings outside the task, 6 lines under Declined to judge.

## Blocking findings

### I-1 (Important, inside the task): D-353 and the code disagree on which session write a block's refusal silences

Source: this finding spans the Foundation entries (`c3de2a6`, D-353) and Slice 4 (`b6c70d1`).

Places:
- `foundations/decisions.md:7899` onward, D-353.
- `src/server/database.ts:18-26`, the class `BlockedSessionRefusal` and its comment.
- `src/server/app.ts:57-73`, the session callback.
- `src/server/account-routes.ts:193-222`, `establishSession`. This function is unchanged, and registration calls it at `:710` through `signIn`.

What D-353 says:
> a session write refused because the account was blocked while its registration was in progress is the intended effect of the block; neither leaves a failure line. A session write that fails for any other reason stays a failure.

Its *violates* line: "a line of `failure` for the session write that a block refused".

What the code does:
1. **Registration's first store: narrower than D-353.** A registration first stores its session in the route: `createAccount` at `account-routes.ts:687`, then `signIn` → `establishSession` → `request.session.save`. The `account-block` process runs on its own connection to the same SQLite database. If it commits a block between `createAccount` and that store, `saveSession` throws `BlockedSessionRefusal`. `establishSession` then writes `{"failure":"session",…,"place":"account-routes.establishSession"}` for it and answers 503.
   - That is a session write refused because the account was blocked while its registration was in progress, and D-353 says it leaves no line.
   - The slice-4 reviewer judged this out of scope, because To do 10 names only the stretch of the mail send. D-353, as written by this change, names the whole registration. So the change's own entry requires what its code does not do.
2. **End-of-response write of other requests: broader than D-353.** D-112's *Rationale* says "A login or a registration stores its session twice, once in its route and once as the library ends the request". The callback in `app.ts` silences `BlockedSessionRefusal` whichever request it ends, so a login whose account is blocked between its two stores now leaves no line either.
   - D-353 confines the silence to a registration and keeps "any other reason" a failure.
   - The comment at `database.ts:18-20` restates D-353 without its qualification: "the one refusal of a session write that is no failure (D-353)". The comment at `app.ts:60-62` does the same: "A write that the account's block refused … leaves no line (D-353)".

Why it matters: WAY-263 makes a change that departs from a foundation entry it writes Important when its files fail to do what the entry requires, or restate it more broadly or without its qualification. Both happen here, in opposite directions. A later agent comparing a change with D-353 finds `establishSession` already violating it. If that agent reads "any other reason" literally, it can also put the line back for logins. Today no player and no operator sees a difference, because the window is tiny. The cost is that the decision says something different from the code.

Evidence:
- Reading of `account-routes.ts:686-724` and `:193-222`, `database.ts:338-374` and `app.ts:57-73`.
- D-112's *Rationale*.
- Task To do 10 ("w trakcie wysyłki maila") against Settlement row 2 ("w trakcie rejestracji").
- Not run: I did not force the cross-process race of point 1, a block committed from a second connection between two synchronous statements. It is shown by reading alone.

Fix, recommended: rewrite D-353 through `the-way-record-decision` to say which write it means: the session write that ends a response, refused because a block was committed while the request was in progress, as while a registration waits on its message. Then narrow the comment in `database.ts` the same way.
- This matches To do 10 and the human's reason in the answer ("zamierzony skutek blokady").
- It leaves `establishSession`'s 503 and its line as they are.
- The other way is to keep D-353 and also skip the line for `BlockedSessionRefusal` in `establishSession`. That changes a route whose 503 is an existing answer, and To do 10 does not ask for it.
- The orchestrator chooses. Both ways stay within row 2's intent.

## Minor findings

Each finding carries its place, its own words and whether it lies inside the task.

### Minor findings of this review

- **m-1 (inside the task; Foundation entries, `0277f8a`).** `guidelines/coding.md:117`, rule "Recording a failure".
  - Its *Decision* field became `D-252 · D-253 · D-354`. `.the-way/product-guidelines/coding/template.md:170-174` gives this field as "the product's one decision on these rules", and says a decision for a degraded mode is not named there, or the rule would change with every such decision.
  - D-354 is a narrow decision about two commands, and the new paragraph already cites it in its body. Adding it to the field moves the rule further from the template; D-253 there was already a departure.
  - Effect: the field grows with every narrow decision. Nothing reads it wrongly today.
  - Otherwise the new paragraph follows the template's form: Polish as the file is, no reason in the rule, the decision cited.
- **m-2 (inside the task; Slice 12, `c1b371d`).** `.claude/skills/loop2-deploy/references/setup_and_secrets.md:465` and `:473`, with the same lines in the `.agents` twin.
  - `:465` says a measuring container can be left "running or stopped".
  - `:473` then says "Remove only a container whose measurement is not in progress in another shell: a running one is still measuring". The second part reads as "never remove a running one", yet an orphaned running container is exactly one to remove.
  - Suggested wording: "a running one may still be measuring for another shell".
- **m-3 (inside the task; Slice 12, `c1b371d`).** `setup_and_secrets.md:312-313`, both copies: "`docker volume prune` without `--all` removes anonymous volumes only".
  - The cited page states this in its description. The same page's own example, in `reports/05-docker-docs-excerpts.md`, shows plain `docker volume prune` deleting `my-named-vol`.
  - The bullet on `docker system prune` carries its own "Another version of Docker may document it otherwise". This bullet relies only on the general sentence about the server's Engine version, although its own source contradicts it.
  - No agent runs any prune, and `SKILL.md` forbids it, so nobody is endangered. The statement is a little stronger than the excerpt as a whole.
- **m-4 (inside the task; Slice 10, `098a708`).** Change of the type `PageAddress`.
  - `PageAddress` in `src/browser/view/email-confirmation.ts:28` gained `reload()`. The fake addresses of `tests/view/chronicle-game.test.mjs`, `tests/view/end-question.test.mjs` and `tests/view/email-confirmation.test.mjs` do not have it. The executor named this.
  - A later case in those files that follows an emailed link's fragment would throw "address.reload is not a function" instead of failing an assertion.
  - No case there does so today, and the files are not type-checked.
- **m-5 (inside the task; Slice 10).** No test proves `browserAddress().reload()` itself, because jsdom cannot.
  - The only evidence is the executor's real-browser run (marker gone after `#confirm-email=…` and after `#reset-password=…`, kept after `#/programy`), which I did not repeat.
  - This is the route "Not tested on purpose" of `guidelines/testing.md` allows. It is listed so that the request description says it.

### The Minor findings of the slice reviews, graded again

- **Slice 2, #1:** Minor, inside the task. `tests/account-backup.test.mjs`, last assertion of the new case, "the temporary copy is left in place". It holds by construction of the stand-in; I agree.
- **Slice 2, #2:** Minor, **outside the task**. `.claude/skills/loop2-deploy/references/backup_and_restore.md:58`, row for exit 6: "`docker` 1: … or a failed backup; Docker's own text stands in the line before it in the log and says which".
  - For a whole backup whose cleanup failed, the line that says which is now the command's own `backup-cleanup` line and its sentence.
  - No item of the task names this table, and the row stays broadly true.
- **Slice 3, Minor 1:** Minor, inside the task. `tests/http.test.mjs`, the comment of the new case (now around `:4365-4368`) names the fault "a server that never reads the partial body", which the `request` event cannot show. Drop that half of the comment.
- **Slice 3, Minor 2:** Minor, inside the task. The break-off case can pass vacuously on a machine where the client breaks off before the body parser attaches. The base fails 15 of 15 times, so it is not a red flake.
- **Slice 3, Minor 3:** Minor, inside the task. No test checks the status 400 and "Invalid request body" for a break-off. A socket test cannot see the answer, and D-353 asks only for no line.
- **Slice 4, #1:** Minor, inside the task. `tests/account-storage.test.mjs`, new case "a session write refused because the account is blocked says so…", pins the text `/cannot be replaced/` (guideline "Behaviour, not implementation").
- **Slice 4, #2:** Minor, **outside the task**. `guidelines/coding-database-access.md` ("Stan konta w instrukcji zapisu") stays true. The `src/server/` row of "Trust boundaries" in `guidelines/testing.md` does not list the new cases; they are not refusal tests of crafted input.
- **Slice 4, #3:** Minor, inside the task. The two http cases answer the held message twice (the `finally` and `endWaitingRegistration`). It is noise only.
- **Slice 4, open point on `establishSession`:** not graded on its own. **It is part of I-1 above, inside the task**, because D-353 as written by this change covers a block during the whole registration.
- **Slice 5, #1:** Minor, inside the task. In `tests/http.test.mjs`, the guard-1 test leaves an own property `destroy` on `ServerResponse.prototype` (the same function).
- **Slice 5, #2:** Minor, inside the task. The guard-1 test is a call check. It catches a plain `destroy()`, misses an unguarded `socket.destroy()`, and is a departure from the testing guideline. I accept the departure for the slice reviewer's reasons. The request description should carry it.
- **Slice 6, M1:** Minor, inside the task. `scripts/local-start.mjs:89-97`, `:455`: with no built game, the broken directory is counted but not named; only Node's print of the missing writer shows.
- **Slice 6, M2:** Minor, inside the task. `tests/invariants/test_local_start_access.py`, `test_stop_with_no_built_game_…`, counts Node's English text `Cannot find module`.
- **Slice 6, M3:** Minor, inside the task. `scripts/local-start.mjs:310-312`: no test fails when the sort in `startDirectories` is removed on a file system that already lists in name order.
- **Slice 6, M4:** Minor, inside the task. The module state `keepsWriterLoadFailure` and `writerLoadFailure` couples `stop()` and `logLine()`.
- **Slice 7, M1:** Minor, inside the task. `scripts/local-start.mjs` (`if (browserLeft || failed) return;`): no test protects the `failed` flag, the path where the server resets the connection. The executor's own-work claim about it was false.
- **Slice 7, M2:** Minor, inside the task. `tests/invariants/test_local_start_access.py:162` and `:598`: two `with` lines lost their `\` continuation and run to 169 and 183 characters.
- **Slice 9, #1:** Minor, **outside the task**. `src/browser/sim/saved-game.ts:512`: the mutant `id > nextCharacterId` survives for characters. To do 13 names the counter check for programs only.
- **Slice 9, #2:** Minor, inside the task. `tests/sim/saved-game.test.mjs`, the chest test "a chest holding exactly its capacity loads, and one piece beyond it is refused as shape", has a refusal half without `// invariant: save-version`.

## Coverage of the task

| Item | Met by | Evidence |
|---|---|---|
| 1 cookie case independent of a millisecond | Slice 1 `048b4b8` | `t.mock.timers` freezes `Date` in both loops of `tests/account-storage.test.mjs`; the executor forced 5003 on the base. Focused run 64/64 |
| 2 occupied port under load | Slice 1 | `timeout: 20000` with a comment (`tests/startup.test.mjs:120-122`); the bound stays (D-77, D-84). 18/18 |
| 3 three `inFlight === 1` waits | Slice 1 | `nextAccountRead` on the hook `afterFind`, which runs synchronously after `findAccountByEmail`, before argon2's thread-pool callback can answer; a gate on `argon2.verify` in the disconnect case. Traced; 78/78 |
| 4 `OneExpressProcessServesGameAndApi` runs | no commit | `base-item4.log`: 5 tests, all five of the class (`test_loop2_one_serving_process.py:158-233`), no skip mark. `base-gate.log` lists only the container file's skip. **Enough** for the item's condition ("gdy jej przygotowanie pada"), which did not occur. It shows one state of the machine; the head's gate runs the class again |
| 5 `account-backup` after a whole backup | Slice 2 `2a58095` | `backup-cleanup` line plus one sentence, exit 1; the new case passes (10/10) |
| 6 `local:stop` without a built game | Slice 6 `a0ddb7d` | deferred `writerLoadFailure`, rethrown after every start is told; new case |
| 7 one line per broken directory | Slice 6 | `untold` skips `START_STILL_RUNNING`; the identity of start objects holds through `runningStarts`; new case |
| 8 proxy ends a cut answer, one line | Slice 7 `ee5c375` | `response.once("error", fail)`, `outgoing.destroy()` after headers; new case |
| 9 broken-off body refused, no line | Slice 3 `6d18fb2` | `request.aborted` → 400, no `writeFailure`; new case |
| 10 block during registration, no session line; other causes keep it | Slice 4 `b6c70d1` | met for the stretch the item names (mail send); see I-1 for the entry |
| 11 `keepalive` test | Slice 8 `378259f` | my defect run: `true`→`false` gives exit 1 on the new case |
| 12 to 16 load and loop tests | Slice 9 `f7f0726` | reviewed; 33/33 and 37/37 |
| 17 two guards of `app.ts` | Slice 5 `4dbd144`, `23f7e43` | reviewed; 78/78 |
| 18 browser that left, no line | Slice 7 | `HOLDING_SERVER` case |
| 19 planted directory independent of order | Slice 6 | sort in `startDirectories`; defect run (`break;`) in the slice report; see Slice 6 M3 |
| 20 docstrings | Slice 7 | module docstring and class `LocalStart` docstring; checked against all 20 cases (both `LocalStartBoundary` cases are header cases) |
| 21 emailed link in an open game reloads | Slice 10 `098a708` | listener at `game-view.ts:824-830`; my defect run (reload removed) gives exit 1; traced: no reload loop, because `clearFragment`/`replace` use `replaceState`, which fires no `hashchange`, and the reloaded page's start reads the token first |
| 22 distinct step names | Slice 12 `c1b371d` | M1–M4, S1/S2; every reference followed (grep below) |
| 23 "no save button" | Slice 12 | rewritten against D-207 and the three buttons |
| 24 D-254 line, play-skill line | `c931b73`, Slice 12 | word diff empty; token comparison identical; play skill `:35-36` |
| 25 failed measurement names step and status | Slice 11 `2e884d1` | `failure()` and `reportForFile`; my defect run (docker's text kept in the file) gives exit 1 |
| 26 leftover measuring container | Slice 12 | `setup_and_secrets.md:463-474`; see m-2 |
| 27 a dozen or so seconds | Slice 12 | `:460-461` |
| 28 only commands that remove the volume | Slice 12 | against the excerpts; see m-3 |
| 29 usage line at wrong arguments | Slice 12 | matches `account-block.ts:21`, `:38-40` |
| 30 unblock leaves links stopped | Slice 12 | D-137, D-160 |
| 31 password block takes no next line | Slice 12 | my bash run (below) |
| 32 rule "Recording a failure" | `0277f8a` | paragraph present; see m-1 |
| Settlement row 1 | D-352 `8e0e32a` | matches answer A and *Not chosen* B and C |
| Settlement row 2 | D-353 `c3de2a6` | faithful to the row's words; see I-1 |
| Settlement row 3 | D-354 `dabf0d8` | matches (3a), 3b and 3c; the sentence "one failure recorded once" comes from To do 32 |
| Acceptance criterion (items 11–19 seen failing) | slices 5 to 9 | 11, 21 and 25 checked again by me; the others rest on the slice reports and reviews |

## Source fidelity

- **Wrap of D-254.** `git diff --word-diff=porcelain c931b73~1..c931b73` shows no `+` or `-` word. Joining whitespace of the old and new paragraph gives identical text. **No word changed.**
- **D-352.** Its sentence, its *Rationale*, including "Accepted with it … up to 30 real seconds", and its *Rejected* follow answer A and *Not chosen* B and C. It adds nothing.
- **D-353 against the code: the code does more.**
  - Slice 3 silences only `type === "request.aborted"`.
  - Slice 4 silences only `BlockedSessionRefusal`, which `saveSession` throws only when the write stored nothing and `blocked = 1` in the same transaction.
  - Every other failure still writes its line once, with its cause. The trigger case and the reset case check this, and the existing "every failure the server handles…" case passes.
  - The silenced set is wider than D-353 says (end-of-response write of any request) and, at registration's first store, narrower. See I-1.
- **D-354.** It says what the code does: `backup-cleanup` is one JSON line plus one sentence; `account-block` is unchanged. The added sentence "is one failure recorded once" comes from To do 32. It is no invention.
- **The rule "Recording a failure".** It says what D-354 says. Form against the template: see m-1.
- **Skill text and Docker.** Each bullet of item 28 rests on a line of `05-docker-docs-excerpts.md`, with the tags and the date cited. See m-3 for the one contradiction inside the source.
- **The paste block.** The changed block still lets the human type the password: the second paste is made after the prompt returns, and `f` is set in the outer shell by the first paste.
- **Item 25's three causes.** They come from the task item and are hedged with "usually". Their exact Docker wording is not quoted, and no SSH host was available.
- **Item 27.** "A dozen or so seconds" is the task's own figure.

## The slices that had no review of their own

- **Foundation entries (`c931b73..0277f8a`).**
  - *Scope* matches the part map, and *Origin* names an existing vault file (`zadanie_loop2_porzadki_z_uwag_pr.md` exists).
  - `foundation_check.py` gives 0 errors.
  - Own-work check: the wrap verification fits the weakest point and would catch a changed word.
  - Its one gap is I-1: D-353's qualification. The executor's check did not look at which session writes the code would silence.
- **Slice 1 (`048b4b8`).**
  - Sound. The `afterFind` hook lets the block or reset land after the read and before argon2's thread-pool answer, whatever the check's speed.
  - The gate on `argon2.verify` is restored in `t.after`, and the gated attempt's later login is refused by the attempt limit before any verify. The two reaches beyond the handoff serve items 1 and 3.
  - Own-work check: the mutants of the expiry replacement and of the re-read fit the weakest points.
  - I did not repeat the forced runs.
- **Slice 8 (`378259f`).**
  - The wrapper passes `(input, init)` on unchanged, and the server-side assertion shows the request arrived.
  - My defect run confirms the failure. Own-work check fits.
- **Slice 10 (`098a708`).**
  - The listener uses the same `startsWith` readers as the page start.
  - A crafted fragment can only cause one reload per `hashchange`.
  - The `#/postac/1#confirm-email=…` row stays a screen address.
  - The two removed rows of the old case have their reason (D-352) in the case's comment, as "Changing an existing test" asks.
  - My defect run confirms the failure. See m-4 and m-5.
- **Slice 11 (`2e884d1`).**
  - Docker's text goes only to `report.stderr` and to the terminal; `problems` carries step and status.
  - My defect run (field kept in the file) fails the case.
  - The executor's two questions are listed under Declined to judge.
- **Slice 12 (`c1b371d`).**
  - Twins are byte-identical (`cmp`, four pairs).
  - Step references were followed: the remaining `H1`–`H5` are the tunnel's, plus the backup's H2 in `test_account_save_backup_encrypted.py:23`.
  - Item 31 was reproduced by me.
  - Changing the two other prohibitions to `docker volume prune --all` keeps the skill consistent with item 28, and both stay prohibitions.
  - See m-2 and m-3.

## Changed invariant tests

- `tests/invariants/test_local_start_access.py` (`local-start-access`):
  - `test_a_planted_directory_keeps_stop_from_telling_no_other_start` lost `assertIn("START_STILL_RUNNING", output)`. The reason is item 7; the one-line assertion is in the new case.
  - Four cases were added, and the module and `LocalStart` docstrings changed.
- `tests/account-storage.test.mjs` (`account-session-storage`): a frozen clock in two loops, and a new case.
- `tests/http.test.mjs`:
  - `account-attempt-limits` and `password-reset-ends-sessions`: the waits changed, the assertions did not.
  - New cases tagged `blocked-account-access` and `password-reset-ends-sessions`.
- `tests/sim/saved-game.test.mjs`: new cases tagged `save-version`.

## Declined to judge

- D-253 says `measure-passwords` has a last-resort handling of its own while the code has none. This was there before the task; the task does not touch it.
- The container-level docker calls of the launcher (`inspect`, `logs`, `kill`, `rm`) do not name their step. To do 25 names the login, the socket permission and the image, which the named steps cover.
- `account-backup`, when the database fails and the removal fails too, writes the removal's error instead of the database's. This is unchanged from the base, where the `finally`'s throw replaced the error.
- `account-backup` leaves a plain copy in the container's `/tmp` after a failed cleanup. This is unchanged and is the plan's choice.
- The 5-second `timeout` of `refusedStart` (`tests/startup.test.mjs:95`) is the plan's choice; no item names it.
- `establishSession`'s 503 for a block before the first store, as an answer to the player. It is unchanged; only its line is judged, in I-1.

## Checks

| Check | Exit | Result |
|---|---|---|
| `npm test -- tests/account-storage.test.mjs` | 0 | 64/64 |
| `npm test -- tests/startup.test.mjs` | 0 | 18/18 |
| `npm test -- tests/http.test.mjs` | 0 | 78/78 |
| `npm test -- tests/account-backup.test.mjs` | 0 | 10/10 |
| `npm test -- tests/account-database-check.test.mjs` (stand-in changed) | 0 | 8/8 |
| `npm test -- tests/account-api.test.mjs` | 0 | 23/23 |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 130/130 |
| `npm test -- tests/password-measurement.test.mjs` | 0 | 12/12 |
| `npm test -- tests/sim/loop.test.mjs` | 0 | 37/37 |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 | 33/33 |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | 5 OK |
| `npm test -- tests/agent_workflow/test_loop2_play_skill.py` | 0 | 8 OK |
| `npm test -- tests/invariants/test_local_start_access.py` | 0 | 20 OK, 177 s |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |
| Defect: `saveGame`'s `keepalive` `true`→`false` (`src/browser/account-api.ts:381`), `npm test -- tests/account-api.test.mjs` | 1 | only the new keepalive case fails; file restored with `git checkout` |
| Defect: `address.reload()` removed (`game-view.ts:828`), `npm test -- tests/view/account-screen.test.mjs` | 1 | only the new reload case fails; restored |
| Defect: `reportForFile` keeps `stderr` (`measure-passwords.mjs:197`), `npm test -- tests/password-measurement.test.mjs` | 1 | only the new step case fails; restored |
| `git status --short` after the defects | 0 | empty; HEAD still `c1b371d` |
| Item 31: the old and new block from `setup_and_secrets.md`, fed to Git Bash through standard input with `/etc/loop2` replaced by a scratch directory and a stub `chown`, followed by a typed line (and, for the new block, the `stat` line) | new 0, old 127 | new: the file holds the typed line, and `stat` ran as a second command. Old: the file holds `stat -c '%U %g %a' "$f"`, and the typed password ran as a command |
| `cmp` of the four skill twins | 0 | identical |
| `git diff --word-diff=porcelain c931b73~1..c931b73` | 0 | no changed word |

Not run:
- The product gate. By the handoff, the orchestrator runs it.
- StrykerJS. No file of `simulation`'s source changed.
- The real browser of Slice 10.
- The cross-process race of I-1, point 1.

`npm test -- <file>` rebuilt `dist/`, which is ignored. The last build ran on clean sources.

## Reaches beyond the handoff

- Foundation: D-252, D-253, D-112, D-137, D-233 and D-281, read whole, to judge D-353, D-354 and D-352 and the failure lines.
- Code read to trace the change's callers and contracts: `account-routes.ts:185-262` and `:686-724`, `session-store.ts` and `database.ts:165-260` and `:376-412`. The page start was traced in `src/browser/view/app.ts:560-600`, with `email-confirmation.ts` and `password-reset.ts`.
- Guidelines: `guidelines/coding-http-application.md` and `coding-database-access.md` (whole), and `guidelines/testing.md:77-301` (the rules section).
- `.the-way/product-guidelines/coding/template.md:160-184`, for m-1.
- `compose.yaml`, for item 28's `name: loop2_accounts`.
- `.runs/.../cycle.md`, for item 4's evidence lines.
- `the author's private rules note on scripts`, the user's rule for scripts, read before the bash run.

## Searches not found or unclear

- I did not read every decision whose *Scope* names a touched part, which is nearly every part of the map. I read the ones the task, the plan and the new entries name. A narrower selection than `way_of_working.md` step 2 gives is unclear coverage.
- `guidelines/testing.md:302-455` and `guidelines/coding.md` beyond its "Recording a failure" and neighbouring rules, `coding-browser-module.md` and `coding-session-store.md` were not read whole.
- I found no test or log that shows the registration's first store refused by a block (I-1, point 1). It rests on reading.
- Docker's documentation for the Engine version of the test server is not recorded anywhere, as the handoff says.
