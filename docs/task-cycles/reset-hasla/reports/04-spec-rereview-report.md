PASS

# Spec re-review — task `reset-hasla`

Revised spec: `.runs/task-cycles/reset-hasla/spec.md`, at base `95de83b`, with the revision report
`.runs/task-cycles/reset-hasla/reports/03-spec-revision-report.md`. Both earlier findings are resolved,
and the revision broke nothing besides.

## Earlier findings

### 1. Decision 7's proof stopped at the first of two session stores: resolved

The spec now states the two stores (`spec.md:242`–`249`) and no longer rests on order. A login's or a
registration's session write names the password hash it stands on, and the statement stores nothing
when the account holds another. "No third order exists", the "no `await`" premise, its code comment and
its review check are gone. The registration path is named and has its own case (`spec.md:276`–`280`,
`:319`–`322`).

Checked in the code and the library, not from the spec's words:

- **Both stores receive one object.** `Session.prototype.save` hands `this` to the store
  (`node_modules/express-session/session/session.js:71`–`74`), `res.end` calls it on `req.session`
  (`index.js:350`), and nothing replaces `req.session` between them: the only assignment is in
  `store.generate` (`index.js:160`). So a `WeakMap` keyed by the regenerated session reaches both.
- **The value stays out of every stored or hashed form.** It is not a property of the session, so
  `JSON.stringify`, the library's `hash` and `decode`'s strict key list in `src/server/session-store.ts:46`
  never meet it.
- **The store is reachable.** `AccountRuntime.store` is typed `SqliteSessionStore`
  (`src/server/configuration.ts:23`), and no test replaces it.
- **`establishSession` is the only product code that stores a session.** A search of `src/` finds one
  `regenerate`, one `save` and one `saveSession` caller.
- **The account object carries the right hash.** At a login, after the comparison, the re-read account
  holds the verified hash. At a registration, `createAccount` returns the hash just made
  (`src/server/database.ts:245`–`252`).
- **The base comparison the spec cites holds.** `tests/http.test.mjs:2084`–`2108` passes a block through
  the same refused second store and asserts 201.
- **The designer's open item is settled.** With headers sent, the refused store ends in
  `req.socket.destroy()` (`node_modules/finalhandler/index.js:118`–`121`) after the response has been
  written, and `logerror` prints the stack of the fixed text "Session cannot be replaced"
  (`node_modules/express/lib/application.js:615`–`618`). No address, hash or token is in it.

The designer's check used a model store, so I ran the statement itself: the base's `saveSession` with
the hash clause added, on the schema of `src/server/database.ts`, with the pinned express-session and the
options of `src/server/app.ts`
(`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\b53bd467-98b7-4854-82f4-f3b0f2c4c4c9\scratchpad\guarded_statement.cjs`):

```
store ok rows=1
store ok rows=1
plain answer 201, /who 200
store ok rows=2
reset committed rows=0
store refused: Session cannot be replaced rows=0
error handler: Session cannot be replaced
held answer 201 {"ok":true}, cookie yes
held /who 401, rows=0
unknown account: FOREIGN KEY constraint failed
no expectation after reset: rows=1
blocked, no expectation: Session cannot be replaced
```

So an expectation that holds writes twice with a real wait between. A reset in that wait leaves no row, a
201 and a cookie that gets 401. An unknown account still fails on the foreign key, a write with no
expectation behaves as at the base, and a block still stops it. The same run with a hash already replaced
refuses the first store and answers 503. It shows a second refused store too, because my script has no
`abandon`; the product's `establishSession` destroys the session there (`src/server/account-routes.ts:184`),
so `res.end` finds none (`index.js:338`).

**Schema:** the design stays free of a schema step. The guard reads `accounts.password_hash`, which
exists, and changes one statement. No table, column or stored payload changes, so the second question
stays **no**.

### 2. The new environment fact was untrue on the login path and missed what Decision 7 needed: resolved

The one fact is split in two (`spec.md:567`–`576`). `express-session-end-of-request` is narrowed to a
session loaded from the cookie, which is true of `index.js:455`–`476` with the options in use.
`express-session-regenerated-session-saved-again` holds the second save and the same object, confirmed
above and by the run. `password-reset-ends-sessions` rests on both. The fact I proposed, that `regenerate`
and `save` reach the store in one turn, was rightly dropped: with the guard in the statement, nothing
rests on it. If that timing changed, the first store would be refused and the login would answer 503,
leaving no session.

## What the revision broke besides

Nothing. I compared the rest of the revised spec with the first version:

- Decisions 1, 3–6 and 9–15 are as reviewed.
- Decision 8's first bullet is narrowed correctly, and Decision 2's corrected passage is true of
  `src/server/database.ts:406`–`458`.
- The foundation tables follow the mechanism: D-112 and `account-session-storage` gain the write's check.
  D-115 needs no change, since its narrow payload and its boundary with HTTP both stand.
- `password-reset-ends-sessions` now covers requests that start after the reset. The goals, the
  *Constraints* line and the units table agree with Decision 7.

The weak points the spec names, an optional expectation and the same-object hand-over, are stated with
what catches each, so they are costs the spec accepts, not gaps.

## Reaches beyond the dispatch

- `src/server/configuration.ts`, lines 1–60 and by search: the type of `runtime.store`, for how
  `establishSession` reaches the store.
- `foundations/decisions.md` D-107, whole: Decision 7 now depends further on the library's session objects.
- `tests/http.test.mjs:385`–`405`, `:1655`–`1660`, `:2084`–`2130`; `tests/transport.test.mjs:175`–`195`;
  tests by search for `runtime.store`, `saveSession`, `SqliteSessionStore` and `"hold"`: the seeds that keep
  the expectation optional, the held-mailer path and whether a test replaces the store.
- `node_modules/finalhandler/index.js` and `node_modules/express/lib/application.js` by search: what a
  refused second store does after the headers.
- The designer's script `second_save_identity.cjs` in the scratchpad, read to see what it models.

## Searches not found or unclear

- `guarded_statement.cjs` uses one possible wording of the statement, since the spec leaves the wording to
  the maker. It proves the clause works, not the statement the maker will write; the storage cases of
  Decision 7 do that.
- The check ran on the local Node 24.17.0, while `node-sqlite-database` records 24.21.0. The statement's
  behaviour comes from SQLite and matches the base statement's, so I expect no difference, but I did not
  run the other version.
- `tests/account-storage.test.mjs`, `tests/account-mail.test.mjs`, `tests/account-api.test.mjs` and
  `tests/view/account-screen.test.mjs` are still not read whole, as in the first report.
- `establishSession` and `signIn` need the store as well as the account, so the change is more than the
  "one parameter" the revision report counts. The route has `runtime` and the spec leaves helpers to the
  maker, so a wrong guess cannot harm the build.
- Still open from the first report, not raised again as a finding: whether the rule „Rezerwacja przed
  pracą hasła, rozliczenie po jej końcu” (`guidelines/coding-account-policy.md:20`) covers every password
  work.
