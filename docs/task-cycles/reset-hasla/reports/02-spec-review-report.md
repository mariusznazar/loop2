FAIL

# Spec review — task `reset-hasla`

Spec: `.runs/task-cycles/reset-hasla/spec.md`, at base `95de83b`. Two findings, both in the argument for
a login in progress (Decision 7) and what the spec records from it. Neither changes the design or the
login code the spec calls for; both change what the build writes down. Nothing else was found.

## Findings

### 1. A contradiction with the library: Decision 7's proof stops at the first of two session stores

The spec (`spec.md:243`–`248`, `:266`–`269`):

> The comparison, `ticket.succeed()` and `signIn` run in one turn of the event loop with no `await`
> between them […] So either the reset commits first, and the comparison sees it, or the session is
> stored first, and the transaction's delete removes it. No third order exists.

> Weak point, and cost if wrong: the proof rests on no `await` standing between the comparison and the
> store […] The code carries one comment saying so, and every review of the login route checks it.

What the library does: a login stores its session **twice**. `regenerate` makes the new session through
`store.generate` (`node_modules/express-session/index.js:158`–`172`), which does not wrap `save`, so the
route's own `request.session.save` never updates `savedHash` (`:418`–`422`). At `response.json`,
`res.end` finds `shouldSave` true, because `originalId !== sess.id` (`:462`–`464`, `:441`, `:446`), and
calls `req.session.save` again (`:349`–`356`). That reaches `SqliteSessionStore.set` and the upsert
`saveSession`, which inserts a row that is missing (`src/server/database.ts:307`–`325`).

Run on the pinned library, with the options of `src/server/app.ts` and the shape of `establishSession`
(`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\b53bd467-98b7-4854-82f4-f3b0f2c4c4c9\scratchpad\second_save.cjs`):

```
login, no cookie sent:   before-signIn > destroy > set > before-response > set > after-response > macrotask
login, valid cookie sent: before-signIn > destroy > set > before-response > set > after-response > macrotask
```

So there is a third order the spec does not name: first store, reset deletes the row, second store puts
it back, and a login with the old password keeps a working session, which question 5 refused. At the
base it does not happen, but for a reason the spec does not give: between the two stores the login route
has only `await`s on promises that settle with no wait on I/O, so no other request's work can run there
(the marker `macrotask` above comes after both).

Why this changes the build:

- The premise the spec tells the maker to put in the code comment, and every review to check, covers the
  wrong stretch of code. The true condition runs to the return of `response.json`, not to the first
  store, and it is not "no `await`": two `await`s stand in that stretch.
- A later `await` on real work between `signIn` and `response.json` passes the stated check and reopens
  the hole. The route case of Decision 7 does not catch it, since it commits the reset during the
  password work, before either store.
- The same stretch is real work in the registration route: `await sendConfirmation` stands between
  `signIn` and `response.status(201).json` (`src/server/account-routes.ts:531`–`536`), up to the sending
  deadline of 10 seconds. A reset there would need the address confirmed and a reset message read within
  that wait, so it is out of practical reach, but `password-reset-ends-sessions` is stated without
  exception and the spec should say why this path does not break it.

Asked of the revision: state the second store in Decision 7; move the premise, the comment and the review
check to "no wait on real work from the comparison until `response.json` has returned"; say why
registration is outside it. If the designer prefers to close it rather than rest on order, that is a
reopening of the rejected check in the statement that writes the session, which is theirs to weigh.

### 2. A contradiction inside the foundation entries: the new environment fact is untrue on the path the invariant rests on, and misses what Decision 7 needs

The spec (`spec.md:507`–`509`):

> `express-session-end-of-request` — express-session 1.19.0 at the end of a request saves a session only
> when its data changed, the cookie not counted, and otherwise touches it. Decision 8 and
> `password-reset-ends-sessions` rest on it.

- For a session regenerated and saved by the route, the library saves again at the end of the request
  although nothing changed since that save (finding 1). A reader of this fact concludes the opposite, and
  that is the login path, the second clause of the invariant. The sentence holds for what Decision 8 uses,
  a session loaded from a cookie and left unchanged. It is also untrue of a request with no cookie, whose
  new session is neither saved nor touched (`index.js:462`, `:475`), though nothing rests on that.
- Decision 7 rests on library behaviour no entry holds: that `regenerate` and `save` reach the store in
  the same turn (`session/store.js:50`–`56`, `session/session.js:71`–`74`). Decision 8 gives its reason
  for a fact as "an upgrade of express-session that changes this end-of-request behaviour could revive a
  session" (`spec.md:298`–`299`). The same reason applies here, more strongly: Decision 7's route case
  would not detect such an upgrade, for the reason in finding 1. A search of
  `foundations/environment_facts.md` for `regenerate`, `.save(`, `shouldSave` and `synchronous` finds
  nothing of the kind (`synchronous` does hit `node-sqlite-database`, so the search works).

Asked of the revision: word the fact for what is true, naming the regenerated case and the same-turn
store, or split it in two, so that `password-reset-ends-sessions` rests on what its second clause needs.

## Answers to the handoff

- **Irreversible operation:** the design needs no schema step. `emailed_links` admits `password-reset`
  since step 3 (`src/server/database.ts:85`–`93`), `accounts.password_hash` exists, and
  `sessions_account` serves the delete. Code of an earlier commit opens the database as before.
- **Trust boundary:** token forms, origin and body guards, enumeration by content, tokens and links in
  logs, a link of another kind and a blocked account all hold against the code. A login in progress holds
  at the base, with findings 1 and 2 on how it is argued.
- **Library claims, checked in the source:** Decision 8's are right (`hash` at `index.js:611`–`620`,
  `shouldSave` and `shouldTouch` at `:455`–`476`, `shouldSetCookie` at `:479`–`488`, `renewSession` in
  `src/server/database.ts:351`–`363`). So is Decision 7's claim that `regenerate`, `save`, `destroy` and
  `set` complete synchronously.

Two points looked at, not findings, for whoever words the entries:

- Enumeration through time (Decision 2's accepted cost): beyond what the spec says, D-105 bounds it, since
  only a recording commit costs a sync to disk, so a probe gets at most three samples an hour per account
  and each mails the owner.
- `password-reset-ends-sessions` says no session authorizes a request after a reset. A request with a body
  that loaded its session before the commit is still authorized when its handler runs: `sessionAccount`
  has no mark to read, unlike a block. A wrong guess costs nothing and the base has the same at logout, but
  the invariant's wording should cover requests that start after the reset, so its test can be true.

## Reaches beyond the dispatch

- `foundations/decisions.md` D-05, first lines: the one-process claim of the spec's *Constraints*.
- `foundations/environment_facts.md`, the session facts: what finding 2 compares the new fact with.
- `src/browser/view/controls/text-field.ts`, whole; `src/browser/styles.css` by search: what
  `createFormNote` sits beside and the notice and form rules.
- `src/browser/AGENTS.md`: the design-token rule for the new stylesheet rules.
- `node_modules/argon2/argon2.cjs`, first 60 lines: how the promise of password work resolves, for the
  order of continuations in finding 1.
- `compose.yaml`, `deploy/loop2-deploy:298`–`316` by search: whether two serving processes overlap at a
  deployment. `--force-recreate` replaces the container, so the one-process claim stands there.
- `tests/http.test.mjs:1579`–`1609`, `tests/transport.test.mjs:255`–`275`, `:490`–`520`: how a login in
  progress is staged and which route lists exist.
- `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` and `search.md`: the user's rules before writing
  the check above and before stating that no fact holds something.

## Searches not found or unclear

- `tests/account-storage.test.mjs`, `tests/account-mail.test.mjs`, `tests/account-api.test.mjs` and
  `tests/view/account-screen.test.mjs` were searched, not read whole. The spec leaves the distribution of
  cases to the maker, so no claim of it depends on them.
- D-11, D-15, D-36, D-37, D-39, D-40, D-42, D-45, D-47, D-81, D-84, D-85, D-107, D-202, D-204, D-207 and
  D-208 were not opened: the dispatch names them as far as a claim rests on them, and no claim I checked
  rested on them beyond the task's own quotes and the guidelines' references.
- Unclear: the spec counts `issueLink` as running "only for a confirmed, unlimited account"
  (`spec.md:113`). It also runs for a limited or blocked account, without a write. The argument holds,
  since only a commit that writes costs a sync to disk.
- Unclear: whether the guideline rule "Rezerwacja przed pracą hasła, rozliczenie po jej końcu"
  (`guidelines/coding-account-policy.md:20`) is meant for every password work or for login and registration
  only. Its invariant `account-attempt-limits` names those two, so Decision 5 does not break it, but a
  reviewer of the code may ask; the return step may want to say so in the guideline.
