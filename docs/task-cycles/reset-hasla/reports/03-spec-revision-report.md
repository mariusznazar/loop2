# Spec revision report — task `reset-hasla`

Status: done. Spec revised in place: `.runs/task-cycles/reset-hasla/spec.md`. No commit made; `npm test`
not run. No question sent.

**The design stays free of a schema step. The answer to the second question at the start stays no.**

## What I got wrong

The review's first finding is correct, and the fault was mine. The first version of Decision 7 said
"no third order exists". I read `index.js:349`–`356` and `shouldSave` only for a session loaded from a
cookie, which is the case of Decision 8, and did not follow it for a regenerated session. Run on the
pinned library, a login reaches `Store.set` twice: `destroy > set > before-response > set`. I ran the
reviewer's `second_save.cjs` myself and got the same output before relying on it.

## The choice for finding 1

Decision 7 now **closes the order instead of resting on it**, with the check in the statement that
writes the session. This reverses my earlier rejection, and the reason is specific: I rejected that
check because I assumed it needed a stamp stored in the session's data. It does not. The expected hash
can stand beside the session object in a `WeakMap`, so it reaches no JSON and no row.

Ways weighed:

| Way | Closes | Cost | Verdict |
|---|---|---|---|
| Rest on the true order: premise "no wait on real work from the comparison until `response.json` returned" | Login today, by order only | No code. But a premise on route and library code that no test sees; a later `await` reopens the hole silently; registration already breaks it for up to 10 seconds, so `password-reset-ends-sessions` would need an exception argued from improbability | Rejected |
| **Statement check, expectation in a `WeakMap`** | Every store, any order, any distance, any connection | One optional field through store and database, one clause, one parameter on `establishSession` and `signIn` | **Chosen** |
| Statement check, stamp in the session's data | The same | Changes D-115's narrow payload and `decode`; a value derived from the password in every row | Rejected |
| Generation column | The same | A schema step, so the second question would become yes, for nothing more | Rejected |
| Second store unable to insert (update-only `set`, or remembered objects) | Second store only | Keeps a premise on turns for the first store; an update-only `set` departs from the library's upsert and from the storage tests | Rejected |
| Override `save` on the session object | Second store only | A route patching a library object | Rejected |

Weighed in the light of the registration wait: that path is out of practical reach, since it needs a
confirmed address and a reset within a wait that normally ends at the mail server's answer. It was still
decisive, for two reasons. Resting on order leaves a path where the invariant is simply false, so the
honest test of it would fail. And the same wait gives the guard a deterministic test, through the
existing `mailer.outcome = "hold"`, which the login path can never have.

What this does to the proof: the argument is now D-112's for a block. A write before the reset's commit
is removed by it, and a write after it finds another hash. The comparison in the login route stays, but
it only chooses the answer. The "no `await`" comment and the review check are gone from Decision 7,
because nothing depends on them any more.

## Evidence for the chosen way

Run on the pinned express-session with the options of `src/server/app.ts`, with
`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\b53bd467-98b7-4854-82f4-f3b0f2c4c4c9\scratchpad\second_save_identity.cjs`:

```
set pinned=hash-old same=true leak=false
rows-after-first=1
reset-committed
set pinned=hash-old same=true leak=false
rows-after-second=0
client status=201 body={"ok":true}
error-handler headersSent=true Session cannot be replaced
```

Both stores get the same session object, the value kept beside it reaches both, the session's JSON does
not hold it, a store refused after the reset leaves no row, the client still gets 201, and the refused
store reaches the error handler after the headers. This is a model store, not the product's statement.
The statement itself is not built yet, and the storage cases of Decision 7 are what will prove it.

`tests/http.test.mjs:2094` already passes through the same refused second store for a block.

## What changed in the spec

- **Decision 7:** rewritten. It states the two stores, the guard, why it is correct, the comparison's
  smaller role, registration in the wait, the ways rejected, the weak points, and three kinds of case. The
  new held-mailer case catches what the login case cannot, since that one commits before either store.
- **Decision 8:** first bullet narrowed to a session loaded from a cookie, pointing to Decision 7 for
  a regenerated one.
- **Decision 2, the unclear item at `spec.md:113`:** corrected. `issueLink` runs for a limited or blocked
  account too, and only a commit that writes costs a sync to disk. The accepted cost now says how D-105
  bounds a timing probe.
- **Goals and Constraints:** the second store is stated, and the goal covers a registration.
- **Units table:** two rows added.
- **Foundation entries, finding 2:** one fact split in two, each true of its own kind of session.
  `express-session-end-of-request` is narrowed to a loaded, unchanged session.
  `express-session-regenerated-session-saved-again` is new and names the same-object hand-over, which the
  `WeakMap` depends on. `password-reset-ends-sessions` rests on both. I did not ask for a fact that
  `regenerate` and `save` reach the store in one turn, which the review proposed: with the guard in the
  statement nothing rests on that any more.
- **Foundation entries, the review's two points:** `password-reset-ends-sessions` now covers requests that
  start after the reset and says why; the new decision on the answer carries D-105's bound.
- **Foundation entries, follow-ons of the choice:** D-112 gains the session write's check;
  `account-session-storage` is added to the invariants that change.

Nothing else changed. Decisions 1, 3–6 and 9–15 are as reviewed.

## Costs the orchestrator should see

- **Scope of the change grew by three files' worth of small edits:** `src/server/session-store.ts`
  and `saveSession` in `src/server/database.ts` were not touched by the first version, and
  `establishSession` and `signIn` gain a parameter. `session-store.ts` is a new file in the change, so
  `guidelines/coding-session-store.md` applies to the maker.
- **The expectation is optional**, because `tests/http.test.mjs:396` and `tests/transport.test.mjs:183`
  seed through `saveSession` and the storage tests call `set` with plain data. Requiring it would change
  those tests with no gain today. So a future way of making a session that skips it is unguarded, and only
  review stands there.
- **A refused second store after the answer goes the way a block's does at the base:** it reaches the
  error handler with headers sent, and the connection may close. No player-visible difference; the 201
  has left. I did not add a way to silence it, since telling a first store from a second is more code for
  a path that is out of practical reach.

## The four checks, on the revised spec

1. Placeholder, `TBD` or empty section: none, checked by search.
2. Contradictions: `spec.md` no longer says "No third order exists". Decision 7, Decision 8, the
   *Constraints* line, the units table and the entries agree on two stores and two facts. D-05's sentence
   in *Constraints* stays, since Decision 9 uses it for the order of commit and clear.
3. Several independent changes: no.
4. Requirements readable two ways: the comparison's role (answer only), and which hash a registration
   passes (the one just made), both written down.

## Reaches beyond the dispatch

- `tests/account-storage.test.mjs`, lines 1355–1375, 1540–1560, 1590–1606 and by search; `tests/http.test.mjs`,
  lines 392–402, 2088–2125 and by search; `tests/transport.test.mjs` line 183 by search — how sessions are
  seeded, which decides whether the expectation can be required, and the held-mailer path.
- `node_modules/express-session/index.js`, lines 155–172; `session/session.js`, lines 66–76 — the two
  stores and what `set` receives.
- `.the-way/task-cycle/spec/review.md` — what the reviewer of this revision will check.
- `foundations/` was not opened again beyond what the first report names.

## Searches not found or unclear

- `tests/account-storage.test.mjs`, `tests/account-mail.test.mjs`, `tests/account-api.test.mjs` and
  `tests/view/account-screen.test.mjs` are still not read whole; no decision depends on more than the
  passages named above.
- Whether finalhandler closes the connection on the refused second store was not observed: the check shows
  the error handler reached and the 201 received, not the socket's fate. Nothing rests on it.
- From the review, unclear and left open: whether the rule „Rezerwacja przed pracą hasła, rozliczenie po
  jej końcu” (`guidelines/coding-account-policy.md:20`) covers every password work or only login and
  registration. Decision 5 stands either way, since its invariant names those two. The return step may
  want to say so in the guideline.
- `guidelines/coding-session-store.md` and `guidelines/coding-database-access.md` have examples this design
  extends („Zapis nowej uwierzytelnionej sesji używa `set`”, „Stan konta w instrukcji zapisu”). No To do item
  asks to change them, so the spec does not; the return step may.
