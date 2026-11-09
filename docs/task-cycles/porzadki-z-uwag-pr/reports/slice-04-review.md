PASS b6c70d1

# Review of Slice 4 - a block during a registration leaves no failure line of the session write

Range `6d18fb2..b6c70d1` (one commit). `git rev-parse HEAD` is `b6c70d1c65f7c4092a68ec3bd5b083cc3625f5c1`, as given. Files changed: `src/server/database.ts`, `src/server/app.ts`, `tests/http.test.mjs`, `tests/account-storage.test.mjs`. `src/server/session-store.ts` is unchanged (see the answer to question 3). No invariant test was changed or weakened; two cases were added (names below).

## Findings

Blocking: none. Critical: none. Important: none.

### Minor

1. **`tests/account-storage.test.mjs` (new case "a session write refused because the account is blocked says so...") pins the message text.** It asserts `assert.match(hash.message, /cannot be replaced/)` and the same for `held` and `bare`. The guideline "Behaviour, not implementation" (`guidelines/testing.md`) says not to fix the exact text of a refusal without a requirement that sets it. Here the slice itself chose to keep the message so that older cases keep matching, and the check is a loose regex, so a reword would fail the case without any behaviour changing. Effect: a later reword of the message needs a test edit it should not need. Inside the task, not blocking.
2. **Guideline and test list that describe the write are not updated.** `guidelines/coding-database-access.md` ("Stan konta w instrukcji zapisu") says the block is read "w tej samej instrukcji"; the write now also reads it in the same transaction when the statement stored nothing. The sentence stays true. The `src/server/` row of "Trust boundaries" in `guidelines/testing.md` lists the cases that guard `blocked-account-access` and `account-session-storage`-adjacent behaviour but not the new ones. Both files are outside this slice's *Change* list and the executor reported both; they belong to the cycle's return step. Outside this slice's files (not blocking).
3. **The two http cases answer the held message twice.** In the first case the `finally` answers `f.mailer.held` and `endWaitingRegistration` answers the same entries again. A second call of a resolver is harmless (the case passes and was run 4 times), so only noise. Inside the task, Minor.

### Open point of the executor: `establishSession` (outside the task's scope, not a defect of this slice)

`src/server/account-routes.ts:193`-`:222` (`establishSession`) writes `{"failure":"session",...,"place":"account-routes.establishSession"}` and answers 503 when its own `save` fails. It now receives `BlockedSessionRefusal` for a block that came before the first store, and still writes that line and answers 503. Compared with the base `6d18fb2`: identical behaviour (the base error was the plain `Error("Session cannot be replaced")` with the same handling; nothing in `establishSession` or `signIn` changed). Settlement 2 / D-353 name "a session write refused because the account was blocked while its registration was in progress"; To do 10 and the task passage `task.md:44` say "blokada konta, która zapadnie w trakcie wysyłki maila przy rejestracji" and cite `account-routes.ts:706`-`:724`, which is the registration's wait on its message, i.e. the end-of-response write that `app.ts` handles. The first store runs right after `createAccount` with no await of mail between (the registration has not yet been waiting on any message), so it is outside the stretch the task names. A login whose account is blocked between the password check and the first store is a login, not a registration, and the 503 there is the existing answer. I judge it outside the task's scope and not a missed requirement. It would be a separate decision if the human wants the first store treated like the end write. Out of scope.

## Answers to the orchestrator's questions of risk

1. **Causes of "stores nothing", error and line** (traced in `database.ts` `saveSession`, and run in the storage case and the two http cases):
   - account blocked (any expectation, also a moved one): `BlockedSessionRefusal`; at the end of a registration's response, no line.
   - expected password hash replaced, account not blocked: plain `Error("Session cannot be replaced")`; one line `{failure:"session",kind:"Error",code:"none",place:"app.sessions",accountId}` (http case, exact `deepEqual`).
   - identifier held by another account's row, account not blocked: plain `Error`; line (storage case).
   - expired own row (`sessions.expires_at > now` false in the upsert's WHERE), account not blocked: plain `Error`; line. Traced, not in a test; the read is `blocked = 1` only, so it cannot be read as a block.
   - unknown account: the foreign key fails inside the statement; the `transaction` helper rolls back and rethrows the library's error unchanged, so the line is as on the base (`code` of the SQLite error). Covered by the earlier cases of the suite, which still pass.
   - a trigger / database error: line with `code` `ERR_SQLITE_ERROR`, `errcode` 1811, no text of the error (http case, `assertPlainLines`).
   - Only `row?.blocked === 1` makes "blocked". A cause other than a block is therefore never classified as a block; I broke this on purpose (below) and both the storage case and the http case failed.
   - Two causes at once (blocked and hash replaced, or blocked and a held row of another account or an expired row): reported as the block, so no line. The block alone refuses the write and nothing is stored for a blocked account (D-112, D-137), and a reset link cannot be used on a blocked account (the block stops the links), so a replaced password with a live reset after the block does not arise. The storage case covers "blocked and moved hash" explicitly. This is a stated choice (executor's "Block wins"), consistent with D-353 ("refused because the account was blocked"); I see no way by which it hides a failure that the block did not itself cause.
2. **Unit of the statement and the read.** `this.transaction` is `BEGIN IMMEDIATE` ... `COMMIT`, so the write lock is taken at the start and held across the statement and the classifying read; another connection's block or unblock (`blockAccount` / `unblockAccount` are themselves `transaction`s) waits (busy timeout) and cannot commit between them. So the reason is the state the statement saw; an unblock between them cannot turn a block's refusal into a line, nor the reverse. This is what the plan's Choice asked for (and avoids the second query it rejected). Cost: every successful session write is now an explicit transaction with the same lock it took as one autocommit statement; a busy database fails with the same `SQLITE_BUSY` error as before (thrown by `BEGIN IMMEDIATE`, before the `try`, so no stray `ROLLBACK`).
3. **`instanceof` after the trip.** `SqliteSessionStore.complete` passes the thrown object through `failure()`, which returns an `Error` instance as it is; express-session `save` -> `defer(next, err)` hands the same object to the `next` in `app.ts`. The handler's `instanceof BlockedSessionRefusal` therefore holds. Shown by running, not only by reading: with the head code, the http case has no line; with only `app.ts`'s exemption removed (`if (true)`), the same case fails with the line `{"failure":"session","kind":"Error","code":"none","place":"app.sessions",...}` in the log. So `session-store.ts` needs no change, and the plan's *Change* list over-listed it. (Executor's claim confirmed.)
4. **`establishSession`**: see the open point above.
5. **Storage test.** The diff of `tests/account-storage.test.mjs` is the import (adds `BlockedSessionRefusal`) plus one new case; no assertion of an earlier case changed. Fails without the change: on the base the file stops at the import of a name that does not exist (not an assertion failure, as the executor said), so I ran a stronger check at the head instead: in a temporary worktree of `b6c70d1` I made the blocked branch throw a plain `Error` (what the base throws); the new case failed ("no expectation"), all other storage cases passed. The worktree was removed again.

## Against the task and the foundation

- Goal and To do 10: a block committed while the registration waits leaves no line; 201 and body stay; the cookie is refused with 401; nothing is stored. Another cause (replaced password, trigger) keeps exactly one line of kind/code/place/accountId with no text. Matches Settlement 2 / D-353 (complies and violates lists both honoured by the two http cases).
- D-112 / invariants `account-session-storage`, `blocked-account-access`: what is stored and when the write refuses are unchanged (the INSERT statement is textually the same; only the wrapper and the read after it are new). Nothing is stored for a blocked account (asserted, also for the moved-hash and guarded variants).
- Trust boundary (`src/server/**`): the new error type can only be constructed by `saveSession` from the database state; no request field reaches it or the log line. The line is unchanged for all other errors; `assertPlainLines` holds with the trigger's text and the address. No new input path.
- Guidelines: `coding.md` "Recording a failure" (record once, with cause; expected refusal is no failure) is met; "Secrets and personal data" is met (kind, code, errcode only). `coding-database-access.md` and `coding-http-application.md` rules reached by the change are kept. No reserved choice is taken.
- Language of code: English identifiers and comments; comments cite D-137, D-353. Code style: eslint and prettier clean.
- Tests: the http cases run on real HTTP and SQLite, with a barrier request (`GET /api/account` after the answer) that makes the absence of a late line a fact rather than a timing, since the library reports a failed save in a later turn; the "another cause" case guards the exemption against being too wide, and the storage case guards the classifier. The first http case was seen failing against the base behaviour (my removal of the exemption reproduced the base's line) and the storage case against the base's error type. The `// invariant:` markers (`blocked-account-access`, `password-reset-ends-sessions`, `account-session-storage`) sit in the position the neighbouring cases use.

## Declined to judge

- Whether D-112's and `guidelines/coding-database-access.md`'s wording should name the in-transaction read: foundation text is not changed by this slice; left to the cycle's return step.
- Whether `establishSession`'s first store should also leave no line (see above): a separate decision of the task's scope.
- Behaviour of `touch` / `renewSession` failures under a block (a different write, not the session write the task names).

## Checks run (command, exit)

- `git rev-parse HEAD` -> b6c70d1c65f7c4092a68ec3bd5b083cc3625f5c1; `git diff 6d18fb2..b6c70d1`, `git log 6d18fb2..b6c70d1` read.
- `npm test -- tests/account-storage.test.mjs` exit 0 (64 pass, 0 fail).
- `npm test -- tests/http.test.mjs` exit 0 (76 pass, 0 fail), run 4 times in all (1 + 3 repeats for flakiness), all exit 0.
- `npm test -- tests/transport.test.mjs` exit 0 (10 pass).
- `python -B .the-way/elements/common/foundation_check.py` exit 0 ("0 errors").
- `npx eslint` of the four changed files exit 0; `npx prettier --check` of them exit 0.
- Mutation 1 (temporary worktree `.runs/rev-s4` of `b6c70d1`, removed): blocked branch throws plain `Error` -> `npm test -- tests/account-storage.test.mjs` fails on the new case only (1 fail).
- Mutation 2 (same worktree, `git checkout` between): `app.ts` exemption replaced by `if (true)` -> `npm test -- tests/http.test.mjs`: the new "no line" case fails with the base's line, the "another cause" case passes.
- Not run: the full `npm test` (the cycle's run), `tests/startup.test.mjs`, other test files. The executor's third mutation (`row ? "blocked" : "refused"`) I did not repeat; its effect follows from the same code path as the "another cause" cases, which pass only because only `blocked === 1` counts.

No edit remains in the reviewed worktree: `git status --short` is empty; the temporary worktree and its `node_modules` junction under `.runs/rev-s4` were removed (the junction with `rmdir`, so the real `node_modules` is intact).

## Reaches beyond the handoff

- `node_modules/express-session/index.js` lines ~340-375 (`end` -> `save` -> `defer(next, err)`), to confirm the error object reaches the handler unchanged.
- `src/server/account-routes.ts:150-262` and `:640-740` (read whole as the *Read* list says) and `src/server/database.ts` around `transaction`, `blockAccount`, `unblockAccount` and `saveSession`, to answer the concurrency question.
- `guidelines/testing.md` sections "Behaviour, not implementation", "Changing an existing test", "Trust boundaries" (the file is long; I read these sections, not every line of the file), and `foundations/decisions.md` D-353, D-112, D-137, D-138 and `foundations/invariants.md` entries as named.

## Searches not found or unclear

- Not found: a test that runs `storage` against the base for the assertion-level reason; the base cannot import `BlockedSessionRefusal`, so the check was replaced by mutation 1.
- Unclear: the plan's *Read* names the sources by line ranges of `foundations/*.md` (e.g. `decisions.md:5120-5154` for D-252); I read entries by identifier as the handoff's instruction says, and did not check that those line ranges still match.
- Otherwise none.
