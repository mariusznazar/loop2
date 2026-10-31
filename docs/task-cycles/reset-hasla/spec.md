# Spec — Samodzielny reset zapomnianego hasła odnośnikiem wysłanym na potwierdzony adres gracza

- Task: `.runs/task-cycles/reset-hasla/task.md`
- Open choice: how a login in progress with the old password leaves no working session after a
  reset; how the set-password route checks the link before password work and again in the write
  transaction; how the answer to a request does not wait for the mail server while sending stays
  bounded and logged. Beside these, the mechanisms the rows of *Settlements to record* leave open.

"Row n" is a row of the task's *Settlements to record*; "To do n" an item of its *To do*.

## Intent

A player who forgot the password gets back to the account with a single-use link sent to the
confirmed address. Two new routes take data from the network without a session, so the design has
to keep three things true at once: the answer to a request tells nothing about any account, not
even through its time; a link changes a password only if it still works at the moment of writing;
and after a reset nothing that started with the old password can leave a working session.

## Goals and non-goals

Goals:

- One route that takes an address and always gives the same answer for a well-formed address, and
  one route that sets a new password on the authority of a link alone.
- The new password, the spent link, the removal of every session of the account and the end of the
  account's earlier links of this kind happen in one transaction (rows 12, 14, 19).
- A login or a registration in progress when the reset commits leaves no session, however far apart
  its two stores of the session stand.
- A successful reset clears the email address's failures and lock, and no reservation of a login in
  progress is lost.
- Two more states of the page: the third state of the account screen (row 1) and the form „Ustaw
  nowe hasło” in place of game and forms (row 6), neither of which builds a game.
- No schema step: the answer to the question of an irreversible operation stays **no**.

Non-goals:

- A limit of requests per client address (row 4), an attempt ticket for the set-password route
  (Decision 5), a route that tells whether a token works (row 13), a message about the change
  (row 18), a switch in code (question 11).
- Reaction to a fragment that changes while a page is open. Pasting a link into a tab that already
  holds the game does nothing until a reload, exactly as with a confirmation link at the base. A
  link opened from a mail client loads the page.
- Stopping confirmation links at a reset: rows 12 and 19 speak of reset links only.
- Any change of how messages are submitted to Outsider, so D-163 asks for nothing beyond H1.

## Constraints

- **Trust boundary:** yes. `src/server/**` is the boundary of `account-server`. Every code review of
  the cycle checks crafted input there: token forms, origin and body guards, account enumeration
  through content or time, tokens and links never reaching logs, a link of another kind, a blocked
  account, a login in progress.
- **Irreversible operation:** no. `emailed_links` admits the purpose `password-reset` since
  version 3, and `accounts.password_hash` already exists, so no step is added and code of an earlier
  commit opens the database as before.
- D-112: no transaction spans asynchronous hashing, mail sending or an HTTP response; recording a
  link reads the block in its own transaction and stops earlier links of the same purpose.
- D-155, D-156, D-160, row 19: a reset link works once, for one hour, until a later reset link is
  recorded, while its account is not blocked and unless a block stopped it, also after an unblock;
  the server gives one refusal for every token that does not work.
- D-102, D-103, D-116: password work passes the one gate; an admitted attempt is settled once, after
  its password work; a live restriction is never evicted; attempt histories live in process memory.
- D-104, D-109: both routes stand behind the transport, Origin, JSON, 16 KiB and exact-field guards;
  a request's address grants no authority.
- D-161, D-162: a message counts from the moment it is recorded; sending is bounded, reports failure
  as a result and writes no credential, token, link or message to a log.
- D-05, `loop2-one-serving-process`: one Node process serves every request, and D-112's connection is
  synchronous, so two requests interleave only where one of them awaits. The operator's block is the
  only writer from another connection.
- D-117: the browser client copies the server's contract by hand, so a route and its client change
  together.
- express-session 1.19.0 as pinned: `resave: false`, `saveUninitialized: false`, `rolling: true`.
  With these, a session the route regenerated and saved is saved a second time when the response
  ends (Decision 7).

## Decisions

### Decision 1 — Two routes, no new refusal code

- `POST /api/password-reset-message`: body exactly `{ email }`. Answers 204 with no body; a badly
  written address gets 400 `invalid-email`.
- `POST /api/password-reset`: body exactly `{ token, password, passwordConfirmation }`. Answers 204
  with no body; refusals are 400 `invalid-password`, 400 `password-mismatch`, 400 `invalid-link`,
  429 `too-many-attempts`.
- Both paths join `paths`, so the transport gate and `Cache-Control: no-store` reach them, and both
  join the list of routes behind `mutationGuards` with the 16 KiB limit. A body that is not exactly
  the named string fields gets 400 `invalid-request`.
- No new code in `refusalCodes`: every refusal above exists at the base.

Rejected: 200 with a body for the request — a body is a place where an outcome can leak later, and
nothing needs one; 202 — `noContentRequest` of the client already gives "only this status counts",
and a second success kind costs a helper for no gain.

### Decision 2 — The request is answered before any work on an account

The handler does only what depends on the request's own text: the fields, then the address's form
through `normalizeEmail`. It then ends the response with 204 and only after that, in a later turn of
the event loop (`setImmediate`), starts the unit `sendResetMessage`. No lookup, no `issueLink`, no
mail step comes before the response. So the same bytes leave in the same time for every well-formed
address, whatever the account's state, and a database failure on that path cannot change the answer.

`sendResetMessage(runtime, policy, email): Promise<void>` finds the account by the normalized
address, does nothing unless an account exists with a confirmed address, and hands the account to
`sendLinkMessage` (Decision 3), whose outcome it ignores. It never rejects: a failure of the lookup
is caught and leaves one fixed line in the log without the address, because a throw on this path
would have no request to fall back on and would end the process. A blocked account reaches
`issueLink`, which answers `blocked` and records nothing (D-112, row 2 and question 10). `limited`
leaves no trace beyond the count; a limit is no failure of sending.

Reading of row 3, chosen so it cannot be read two ways: "czas" is the time of this answer. The
commit of `issueLink` runs after the answer, but it does stop the event loop for its few
milliseconds, so a client that measures a second request sent right after could in principle see it.
Removing that takes a second thread and a second connection, against D-112's one connection. It is
an accepted cost, and D-105 bounds it: only a commit that writes costs a sync to disk, so a probe
gets at most three samples an hour for one account and 30 in total, and each sample mails the
account's owner.

Rejected: recording in the handler and sending in the background — `issueLink` runs under `PRAGMA
synchronous = FULL`, and its commit costs a sync to disk only when it writes, which is only for a
confirmed account that is neither blocked nor above a limit, so the answer's time would tell exactly
what row 3 forbids; a fixed or random floor on the answer's time — hides the usual
commit and not a slow one, and slows every request; a durable queue of messages — a schema step,
which would make the operation irreversible, for a message the player can ask for again.

Cost if wrong: a process stopped between the answer and the recording sends nothing, and the player
waits for a message that does not come. The sentence's own ending covers that case. If the unit
threw, the process would stop; hence the rule that it never rejects, and a test forcing a failed
lookup.

Proved by: a route test with a mailer that never answers gets its 204 at once; the same answer and
body for an unknown address, an unconfirmed one, a blocked one, one above a limit, and when recording
fails; nothing recorded and nothing handed on for the first four. Stand-in mailers prove reactions,
not delivery (D-163). Work of this kind ends after the answer, so a case that asserts "nothing
happened" sends a request for a confirmed control address after it and waits for that message:
immediates run in order, so the earlier work has finished by then.

### Decision 3 — One sending path with a table of kinds

`sendConfirmation` becomes `sendLinkMessage(runtime, policy, account, kind)`, keeping all it does
today: make the token, record the link with `accountMessageLimits`, catch a recording failure and
log a fixed line, compose, hand on, and bound the sending through `boundedSending` and
`policy.sendingDeadline`. Its result stays `"sent" | "limited" | "failed" | "blocked"`, and it still
never throws.

`kind` names what differs and nothing else: the link's purpose, its lifetime, the fragment of its
address, and the composing function. Two values of it exist, for confirmation and for reset. The two
existing callers keep reading the outcome; `sendResetMessage` ignores it, because row 3 shows it to
nobody. Bounded time and the log's content thus come from one place: `SmtpMailer` logs its failure
and `boundedSending` its missed deadline, each a fixed line.

Rejected: a copy for reset — two places for the same order of recording and sending, which is the
order D-155 and D-161 depend on; a queue or a separate bounded wrapper for the unwaited path — the
existing promise needs no one to await its result in order to stay bounded.

Cost if wrong: small; it is a rename with one parameter, covered by the existing tests of both
confirmation routes.

### Decision 4 — The order of the set-password route

1. The transport gate and the guards.
2. The fields: exactly three strings, else `invalid-request`.
3. The password rules, through a new `checkNewPassword`: `invalid-password` or `password-mismatch`,
   with the sentences of registration.
4. The link: the token's form through `isLinkToken`, then the read `resetLinkWorks` of its digest;
   either failing gets `invalid-link`.
5. Hashing through `hashPassword`, so through the gate (Decision 5).
6. The write transaction `resetPassword` (Decision 6): `invalid` gets `invalid-link`.
7. `clearEmailAttempts` (Decision 9), then 204, in the same turn as the commit.

The password comes before the link. A request whose link and password are both bad gets the password
refusal. Reason: with the link first, a short password would turn the route into exactly what
row 13 rejected, an answer to anyone about whether a token works, without spending it and without
changing anything. Pure checks first also matches registration, and nothing is lost: the page checks
the same rules before it sends, so only a crafted request meets this order.

Rejected: no check before hashing — a bad token would occupy a slot of the gate, which the task
forbids; spending or reserving the link before hashing — a full gate or a failed hash would use it
up, against rows 11 and 19; one transaction around the hashing — against D-112.

Cost if wrong: only a crafted request sees the order, so changing it later changes no player's
screen.

Proved by: for each combination of a good and bad link with a good and bad password, the refusal
above, a link that still works afterwards where the link was good, and no password work where the
link was bad (a full gate does not change the bad-link answer into 429).

### Decision 5 — The gate only, no attempt ticket

The route takes no ticket of `AccountPolicy`. A ticket limits guesses, and a 256-bit token is not
guessed. Password work here is already bounded by the working links: a bad token reaches no work,
the gate admits two at a time, and the first commit spends the link, so one link costs a handful of
hashes at most, and D-105 bounds links to 30 an hour. No decision gives a threshold for this route,
and adding one would change D-102, D-103 and `account-attempt-limits` for no case the task names.

Failure of hashing: `PasswordCapacityError` answers 429 `too-many-attempts` through `limited` (row
11), and the link keeps working. Any other failure, of hashing or of the database, is left to the
application's error handler, which answers 500 without detail. Nothing was written, so the link keeps
working and the page treats it as it treats no connection (Decision 11).

Rejected: a new ticket per client address — a new limit nobody asked for; the login ticket keyed by
the account's address — a request that is no login would take the place of logins and could lock
them.

Cost if wrong: someone holding several working links occupies the gate for a few seconds. They hold
the mailbox anyway.

### Decision 6 — The database's two operations

Both in `AccountDatabase`, both on one private read, so the check before hashing and the check in the
transaction cannot drift apart. The private read takes a token digest and the time, and returns the
link's account when the link has the purpose `password-reset`, is not spent, has `expires_at` after
now (equal to now is expired, as for sessions and confirmation) and its account is not blocked.

- `resetLinkWorks(tokenDigest): boolean` — the read alone, no transaction.
- `resetPassword(tokenDigest, passwordHash): ResetOutcome` — one write transaction, with
  `ResetOutcome` being `{ outcome: "reset"; email: string } | { outcome: "invalid" }`. It runs the
  read again and returns `invalid`, having changed nothing, when no link works. Otherwise it replaces
  the account's password hash, deletes every session of the account and marks every unspent reset
  link of the account as spent, and returns the account's normalized address.

`BEGIN IMMEDIATE` holds the write lock from the start, so a block through the operator's connection
either comes first and is seen, or waits and then finds the password changed. A later link recorded
during hashing spent this one (D-155), a block spent it too (D-137), and an hour passing during
hashing fails the time check: each answers `invalid-link` and the finished hash is dropped.

A token of the other kind fails on purpose in both directions: `confirmEmailAddress` already reads
only `email-confirmation`.

Rejected: reusing `issueLink`'s shape with an outcome per reason — one refusal is all the route may
give, so reasons have nowhere to go; a column for the password's generation — a schema step that
Decision 7 does not need.

Cost if wrong: the row 19 invariant fails, which the storage tests of Decision 6 are there to catch.

Proved by: `tests/account-storage.test.mjs` cases on real SQLite for each refusal, each changing
nothing, including a block committed through a second connection between the read and the
transaction, a later link recorded between them, a link stopped by a block and an unblock after it,
expiry at the exact boundary, a confirmation link and an unknown digest; and one success in which
password, sessions and links change together.

### Decision 7 — A login in progress with the old password

**What the library does.** A login and a registration each store their session twice. `regenerate`
makes the new session through `store.generate`, which leaves `save` unwrapped, so the library never
learns of the route's own `request.session.save`. When the response ends, `res.end` finds `shouldSave`
true and saves the session again, and `saveSession` is an upsert that inserts a missing row. Between
the two stores a login has only `await`s on promises that settle without waiting on I/O, so no other
request runs there. A registration has `await sendConfirmation`, up to `sendingDeadline`, 10 seconds.
So guarding only the first store would leave an order open: first store, reset deletes the row,
second store puts it back. The guard has to hold for every store.

**The guard, in the statement that writes the session.** `establishSession` takes the account and, on
the regenerated session, tells the store which password hash this session stands on, through a new
`SqliteSessionStore.expectPasswordHash(session, passwordHash)`: at a login the hash the password was
checked against, at a registration the hash just made. The store keeps it in a `WeakMap` keyed by the
session object, beside the session and not in it, so it reaches no JSON, no row and no `hash` of the
library, and the stored payload stays as D-115 has it. `set` passes it to `saveSession` through an
optional field of `StoredSession`, and the statement that inserts reads the account's password hash
beside its blocked state and stores nothing when they differ. A refused write ends as a block's does
at the base: no row changed, the existing error of `saveSession`.

Why this is correct: `resetPassword` changes the hash and deletes the account's sessions in one
transaction. A session write before that commit is removed by it; a write after it finds another hash
and stores nothing. This is D-112's argument for a block, and it does not depend on the turn of the
event loop, on how many stores a request makes, on what stands between them, or on the connection.

**The comparison in the login route chooses the answer and nothing else.** The route remembers the hash
it verified against, and after `verifyPassword` it reads the account again, as it already does for a
block. If the stored hash differs, the password was replaced during the check: the route releases the
ticket and answers the common `invalid-credentials`, before it looks at the block, because the old
password no longer proves anything and D-139's sentence is not earned. `release` and not `fail`, since
the password was right when checked, so it is no wrong guess; and it is no sign-in, so it clears
nothing: the reasoning of D-139. A hash is salted, so any reset changes it, even to the same password.
Without this comparison the guard would still leave no session, but the login would answer 503 after
settling as a success.

**Registration in the wait.** A reset that commits during `await sendConfirmation` deletes the first
store's row, and the second store is refused. The 201 still goes out, as it does for a block at that
point at the base (`tests/http.test.mjs:2094`). Its cookie names no session, so the next request gets
401 and the page shows the forms. The registration route has no exception: it passes the hash it made,
like the login.

Rejected:

- Resting on the true order, with the premise moved to "no wait on real work from the comparison until
  `response.json` has returned". True of the login today. But it is a condition on a stretch of route
  and library code that no test can see, a later `await` there reopens the hole without a sign, and the
  registration route already breaks it for up to 10 seconds. That path could only be argued as
  improbable, which leaves an invariant with an exception, and a test with a held mailer would show the
  session coming back.
- A credential stamp stored in the session's data, the form of this check rejected in the first version
  of this spec — a change of the narrow payload of D-115 and of `decode`, and a value derived from the
  password in every session row. The `WeakMap` gives the statement the same value without any of that.
- A generation column on accounts, compared in the statement — a schema step, which would change the
  answer to the irreversible operation to yes, for nothing the guard does not already do. The design
  fulfils the task equally well without one, so that answer stays **no**.
- A second store unable to insert, by an update-only `set` or by remembering stored session objects —
  closes only the second store, keeps a premise about turns for the first, and an update-only `set`
  departs from the library's upsert and from the storage tests.
- Overriding `save` on the session object so that the library's second store does nothing — a route
  patching an object the library owns.
- Marking tickets in the policy at a reset — a second memory of what the database already holds, and it
  does not reach a registration, which has no login ticket.

Weak points, and cost if wrong: the expectation is optional in `saveSession`, because test seeds and
the store's own tests write sessions without one, so a session stored without it is unguarded;
`establishSession` is the only product code that stores a session, and a review of any new way to make
one checks this. The guard also rests on both `set` calls receiving the same session object, which the
pinned library does; an upgrade that hands over a copy would lose the expectation silently, and the
registration case below is what would catch it. Either failure lets a session outlive the reset until
it expires, which question 5 refused. Holding the hash in memory for the length of a request adds no
exposure: the same request has just read it from the account.

Proved by:

- A route case in the shape of "a block committed while the password is checked": a login with the old
  password is admitted, `resetPassword` commits directly on the database during its password work, and
  the login gets 401, no session and no change to the failure count. Fault caught: a login deciding on
  the account it read before the password check.
- A route case with a held mailer: a registration waits on its message, a reset of that account commits
  directly on the database, the mailer answers, the answer is 201, no session row exists and its cookie
  gets 401. Fault caught: a second store that writes without the guard. The login case does not catch
  this, since it commits before either store.
- Storage cases on real SQLite: a store with an expectation that still holds writes, also a second time
  with the same session object; after the hash changes, through a second connection too, the same
  object stores nothing and no row appears; a store with no expectation behaves as at the base.

### Decision 8 — The session a set-password request brought with it

The route never touches `request.session`: no `regenerate`, no `destroy`, no field written. Its
outcome then follows from the library, read in `node_modules/express-session/index.js`:

- `hash` ignores the cookie, so a session loaded from a cookie whose data did not change is not
  modified; `resave: false` makes `shouldSave` false, and `saveSession` is never called, so the upsert
  that could bring a row back does not run. A session regenerated during the request behaves otherwise
  (Decision 7), and this route regenerates nothing.
- `shouldTouch` is true, so the end of the request calls `store.touch`, which reaches `renewSession`.
  That is an `UPDATE` of an existing, unexpired row, and it changes nothing once the row is gone
  (D-101, D-112).
- With `rolling: true` the response sends the same cookie again. It names no session, so the next
  request gets a fresh, unsaved session and 401, as after a block.

A session of the same account therefore ends with all the others and nothing brings it back. A
session of another account is neither used nor changed, as the confirmation route already says of a
session sent along. A request with no cookie stores nothing, since `saveUninitialized` is false.

Rejected: `request.session.destroy` for a session of the same account — it would need an await and a
branch on whose session it is, for a row the transaction already removed; clearing the cookie — two
`Set-Cookie` headers with `rolling: true` for a cookie that is already harmless.

Cost if wrong: an upgrade of express-session that changes this end-of-request behaviour could revive
a session. That is why this rests on a new environment fact (see *Foundation entries*).

Proved by: a route case that sets a password while sending a valid session of the same account,
another browser's session of it and a session of a second account: the first two authorize nothing
afterwards, even though the first was renewed at the end of that very request, and the third still
works.

### Decision 9 — Clearing the address's history

`AccountPolicy.clearEmailAttempts(email)` takes the normalized address that `resetPassword` returned.
If the address has an entry, it empties `failures` and sets `lockedUntil` to none, keeps `reserved`,
and frees the entry when nothing live remains, through the existing `forget`. If there is no entry,
it creates none. No client-address entry changes (row 15).

The entry object stays and only its fields change. A ticket holds that object, and its settlement
calls `forget` on the key; a replaced entry would let an old ticket drop a live one, against D-103,
and reservations would stop counting. So a login in progress at the reset settles once, as D-116
says, on the same entry: `succeed` and `release` change nothing further, and `fail` adds one failure
to the emptied history. That is a real wrong guess after the moment of the reset. The gate holds at
most two such logins, so the clear cannot end in a lock by itself.

Order: the clear comes after the commit, in the same turn. A failed write must clear nothing, because
row 15 says a successful reset; and no await stands between them, so no login can be admitted against
the old lock after the password changed. If the process stops between them, D-103's restart clears
the history anyway.

Rejected: deleting the entry — the fault above; clearing before the commit — a failed reset would
lift a lock; waiting for logins in progress to finish — a wait in a route, for nothing a player sees.

Cost if wrong: at worst one or two failures remain on the address after a reset, far below the lock.

Proved by: policy cases with an explicit clock: a locked address admits a login after the clear; the
client address's failures still count; a login in progress keeps its reservation, settles once and
leaves the count of `inFlight` right; clearing an unknown address adds no key; a full table is not
disturbed. A route case: a locked address logs in with the new password straight after a reset, and
a refused set-password clears nothing.

### Decision 10 — The page's start

`src/browser/view/password-reset.ts` (new) reads the fragment with `readResetToken(hash)`, which
returns what follows `#reset-password=` as it stands, even when empty or malformed, and null for any
other fragment. The server's refusal is the one place that judges a token. The two prefixes cannot
both match, so each reader stays independent.

`start()` in `app.ts` gains a branch before the confirmation branch and the session check: when a
reset token is present, the page places the reset screen in `main` and stops there. It sends no
request (row 13), so it does not check the session, and it builds no game. So nothing of `game-saver`
exists while the form stands for a signed-in player: no timer, no save, no state to keep. Another tab
holding the game is untouched and meets D-211 at its next save, which is the cost question 5 accepted.

When the screen ends (Decision 11), the page goes on as its ending says:

| Ending | The page then |
|---|---|
| `changed` | Sets the sentence of row 9 as the pending notice, in `positive`, shows the forms with no session check, and moves focus to the address field of „Zaloguj się”. |
| `refused` | Sets the sentence of row 10 as the pending notice, in `warning`, and runs the usual `checkSession`, so the existing pending-notice path puts it above the forms or the game. |
| `cancelled` | Runs the usual `checkSession`, with no notice. |

Row 9 is read as written: after a success the page does not ask about the session. A browser signed
in to another account therefore sees the forms with the sentence, and a reload returns to that
account's game. Nothing is lost by it, and the extra request row 10 pays for was not accepted for
success.

Rejected: the form as a fourth state of `account-screen.ts` — that screen is what a signed-out player
sees, and `showForms` runs its `reset`; the form stands before anyone knows who is signed in. A
session check before the form — one more request and a game built only to be removed, against row 6.

Cost if wrong: small; the branch is a few lines and its cases stand in the tests of the page.

### Decision 11 — The reset screen

`createResetScreen(options)` in `password-reset.ts` takes the client (`Pick<AccountClient,
"setPassword">`), the token, the `PageAddress`, and a callback `finished(ending)`, and returns its
element. It holds the section „Ustaw nowe hasło”, the fields „Nowe hasło” and „Powtórz hasło” with
`new-password` autocompletion, the submit button „Ustaw hasło” and the plain button „Anuluj”.

- Before sending, it checks the rules through the shared password check (Decision 12). A problem
  stands under its field, nothing is sent, and the link stays (rows 7, 19).
- While waiting, the button reads „Ustawianie…”, and the fields and „Anuluj” are disabled, so one
  request runs at a time and a cancel cannot race a write.
- The answer is sorted by the pure `resetOutcome(result)`. Success is `changed`. A refusal with the
  code `invalid-link` is `refused`, whatever its reason (row 10). Everything else — no connection, a
  timeout, 429, 500, an unexpected answer, and a password refusal from the server — keeps the form,
  stands as the client's one sentence under it, and returns focus to where the player sent it from
  (row 11).

The fragment goes first: on `changed`, on `refused` and on „Anuluj” the screen calls
`address.clearFragment()` and only then `finished(ending)`. `clearFragment` uses `history.replaceState`,
so neither a reload nor the back button returns to the token, and nothing can send it again. The
token otherwise lives only in the screen's closure.

Accepted cost, following row 11: an answer lost after the server committed leaves the form standing,
and a second send then gets `invalid-link`, though the password did change. The player's new password
works on the form, or a new link can be requested.

Rejected: clearing the fragment in `app.ts` — three places instead of one, and a screen test could
not see it; sharing `confirmFromAddress` — that function sends on load and this one must not.

Proved by: unit cases of `readResetToken` and `resetOutcome`; page cases with the test's address for
each ending: which request goes out, when the fragment goes, what stands where, for a signed-in and a
signed-out player, and that no game is built and no save is sent while the form stands.

### Decision 12 — The third state of the account screen

Within `createAccountScreen`, whose client gains `requestPasswordReset`:

- `accountForm` takes the button's text apart from the title, since „Nie pamiętam hasła” is sent by
  „Wyślij odnośnik” and „Ustaw nowe hasło” by „Ustaw hasło”, and is exported for `password-reset.ts`.
- `registrationProblems` is split so that the address's rule and the two-password rule can each be
  used alone, the messages staying in `PROBLEM_MESSAGES`, with the same result for registration.
- The request form joins the list `forms`, so `lock`, `clearMessages` and `reset` cover it, and the
  two buttons „Nie pamiętam hasła” and „Wróć do logowania” lock with the rest.
- `send` becomes generic over the answer, with what to do on success passed in, so that one waiting
  and focus path serves all three forms.
- The state is which sections `element` holds. Each of the two buttons runs `reset`, which empties
  every field and removes every message, then swaps the sections and moves focus to the address
  field of the form it opened. `reset` from outside always returns to the two forms.
- Sending: the address's rule first, with its sentence under the field and nothing sent (row 3). On
  204 the field is emptied, the sentence of row 3 stands in the form's note under the form, and the
  form and „Wróć do logowania” stay. A failure stands as the form's warning and keeps the field.
- `createFormNote` in `controls/text-field.ts`, beside `createFormWarning`, gives the sentence in
  `text-secondary` with `role="status"`. The kitchen-sink page imports it from there, as it does the
  warning. D-44's sentence about refusals does not cover it, which is why it has its own control.

Rejected: a second screen module for the request — it would duplicate lock, focus and reset for one
field; reusing `createFormWarning` with a changed colour — the warning role carries a meaning this
sentence does not have (D-39).

Cost if wrong: the changes to `accountForm`, `send` and `registrationProblems` touch two working
forms; the existing cases of `tests/view/account-screen.test.mjs` are what protect them.

### Decision 13 — The browser client

`AccountClient` gains `requestPasswordReset(email)` and `setPassword(token, password,
passwordConfirmation)`, both through `noContentRequest`, so only 204 counts as success (D-117).
Nothing about an account comes back and nothing is kept.

### Decision 14 — The messages

`account-mail.ts` gains `composePasswordResetMessage(address, link)` with the subject and body of
question 7, and `composeConfirmationMessage` gains row 17's paragraph before its last one; the texts
stay in that file (D-162). `account-policy.ts` gains `passwordResetLinkLifetime`, one hour (D-155).
The way messages reach Outsider does not change.

### Decision 15 — Kitchen-sink and style

`formSample` in `kitchen-sink.ts` gains the two new forms waiting and with a refusal, and the request
form with its sentence (To do 11). Stylesheet rules of `.form-note` and of the one-form layouts use
existing tokens. `.confirmation-notice` carries both notices of the reset, so no new rule is needed
for them.

### The units at a glance

| Unit | File | Does | Used by |
|---|---|---|---|
| `checkNewPassword`, `passwordResetLinkLifetime`, `clearEmailAttempts` | `src/server/account-policy.ts` | Password rules alone; link lifetime; clears an address's history keeping reservations | routes, `checkRegistration` |
| `resetLinkWorks`, `resetPassword`, `ResetOutcome` | `src/server/database.ts` | Decision 6 | set-password route |
| optional expected hash of `StoredSession`, read by the statement of `saveSession` | `src/server/database.ts` | Decision 7 | the session store |
| `expectPasswordHash`, and `set` passing the expectation on | `src/server/session-store.ts` | Decision 7 | `establishSession` |
| `composePasswordResetMessage` | `src/server/account-mail.ts` | Composes the message | the kind table |
| `sendLinkMessage`, `sendResetMessage`, two routes, the login's comparison | `src/server/account-routes.ts` | Decisions 1–5, 7 | Express |
| `requestPasswordReset`, `setPassword` | `src/browser/account-api.ts` | Decision 13 | the two screens |
| `readResetToken`, `resetOutcome`, `createResetScreen` | `src/browser/view/password-reset.ts` (new) | Decisions 10, 11 | `app.ts` |
| third state, `accountForm`, split rules | `src/browser/view/account-screen.ts` | Decision 12 | `app.ts`, `password-reset.ts` |
| `createFormNote` | `src/browser/view/controls/text-field.ts` | Decision 12 | account screen, kitchen-sink |

## Foundation entries

Written through the project's skills, worded by the foundation step. "Row" and "To do" name the
task's source of each.

Decisions changed:

| Entry | Meaning of the change | Source |
|---|---|---|
| D-44 | The waiting texts „Wysyłanie…” of „Wyślij odnośnik” and „Ustawianie…”, the two new forms on the kitchen-sink page, and the sentence in `text-secondary` under the request form. Through `the-way-maintain-styleguide`, with the rule „States of shared controls”. | rows 1, 8; To do 11 |
| D-96 | The third state of the screen, and the form standing in place of game and forms, also for a signed-in player. | rows 1, 6 |
| D-98 | The repeated password's rule holds for the new password too, with no comparison to the old one. | row 7 |
| D-102 | A successful reset clears the address's failures and lock and leaves the client address's. | row 15 |
| D-105 | The ending of the sentence of row 3 is the "try later" of a limit; the hourly limit's exhaustion is an accepted cost. | rows 3, 4 |
| D-109 | Who may ask for a link and what a reset link alone authorizes. | row 2 |
| D-112 | Setting a password by a link is one transaction that reads the link and the block, replaces the hash, deletes the account's sessions and spends the reset links; and a session write that names a password hash stores nothing once the account holds another. Its *Rationale* gains the second store. | rows 12, 14, 19; Decisions 6, 7 |
| D-138 | The server also invalidates sessions at a reset. | row 14 |
| D-152, D-153, D-154 | Their parts on password reset enter, as the task's *Decisions in play* assigns. | To do 12 |
| D-155 | A reset link is spent only together with the new password. | row 12 |
| D-158 | The fourth paragraph; its *Rejected* no longer holds. | row 17 |
| D-160 | The refusal's sentence and place hold for a reset link too. | row 10 |
| D-211 | A reset is a third cause in its list of what ended a session. | row 14 |

New decisions:

| Subject | Meaning | Source |
|---|---|---|
| The answer to a request for a link | Row 3's one answer, and that it leaves before any work on an account. Its accepted cost is the stall of a recording commit, which D-105 bounds to three samples an hour per account, each mailing the owner. | row 3; Decision 2 |
| No limit per client address | The accepted cost and its review condition. | row 4 |
| The form of a reset link | Parallel to D-156. | row 5 |
| The form „Ustaw nowe hasło” | Its buttons, its outcomes, and that the page does not check the link first. | rows 8–11, 13 |
| The order of the set-password route, and its gate without a ticket | Password rules before the link, the read before hashing, the check again in the transaction. | Decisions 4, 5 |
| The reset message and no message about the change | Sender, subject and body; the accepted departure from OWASP. | rows 16, 18 |

Invariants changed: `account-session-authorization` (the two routes, and a request's address may name
the account a link goes to, only to that account's own confirmed address; row 2);
`player-server-session` (row 14); `account-session-storage` (it stores no session named with a password
hash the account no longer holds; Decision 7); `account-attempt-limits` (row 15);
`unblock-restores-no-link` (a reset link beside a confirmation link; row 19);
`account-email-via-outsider` and `account-email-nodemailer-starttls` (reset messages, as the projected
versions say).

New invariants: `password-reset-verified-email` (projected, To do 12); `password-reset-link` (row 19);
`password-reset-ends-sessions` (no session the account held authorizes a request that starts after the
reset, and no login or registration in progress at the reset leaves a session; row 14 and Decision 7).
Each has method `test`. The wording names requests that start after the reset on purpose: a request that
loaded its session before the commit is still authorized when its handler runs, because
`sessionAccount` has no mark to read, as at a logout at the base, and a stricter sentence could not be
tested true.

New environment facts, two, because they hold for different sessions:

- `express-session-end-of-request` — express-session 1.19.0 at the end of a request touches a session
  loaded from the cookie whose data did not change, the cookie not counted, and does not save it.
  Decision 8 rests on it.
- `express-session-regenerated-session-saved-again` — express-session 1.19.0 saves a session made by
  `regenerate` again at the end of the request, even though the route saved it, and hands `Store.set`
  the same session object each time. Decision 7 rests on it.

`password-reset-ends-sessions` rests on both.

Guidelines: `guidelines/styleguide-browser-view.md` through `the-way-maintain-styleguide` (To do 11);
`guidelines/testing.md` through `the-way-maintain-testing-guidelines` (To do 14): the rows of both
routes, both in its Origin and JSON rows, and the route counts that change.

Part map: no change, since every new file falls under an existing pattern. Glossary: no term proposed;
the foundation step judges again.

## Left to the maker

- The division into slices, and the names of private helpers.
- The wording of the fixed log lines, as long as none holds an address, token or link.
- Where „Nie pamiętam hasła”, „Wróć do logowania” and „Anuluj” stand within their sections, and the
  stylesheet of the one-form states, within `guidelines/styleguide-browser-view.md`; sentences under a
  form stay under it. The result is looked at in a browser (D-87).
- How tests are distributed among the existing files, and whether page cases get a file of their own.
  Refused cases carry their invariant marks and are seen failing once (*Trust boundaries*).
- Updating comments that say "both sending routes", "a registration or a resend" and the like.
