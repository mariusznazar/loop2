# Handoff — reviewer of Slice 2, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You review one slice of a plan, a fresh agent that
did not make it. Your questions go to the orchestrator, never to the human.

- Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`). Read it
  whole; read a file it names when the step that names it comes.
- What is reviewed: Slice 2, the range `b9efe52..0fdaffe`.
- The executor's report, claims to verify: `.runs/task-cycles/reset-hasla/reports/11-slice2-report.md`
- Report path: `.runs/task-cycles/reset-hasla/reports/12-slice2-review-report.md`; its first line is
  `PASS <sha>`, `FAIL <sha>` or `questions`.
- Worktree (work from its root): `C:\Storage\repos\loop2-wt\reset-hasla`, branch `task/reset-hasla`. Process pin `.the-way` at
  `a8dfe8a`, not moved.
- Trust boundary (step 4): **yes**, `src/server/**`. Two new routes take data from the network
  without a session. Every code review checks crafted input at that boundary: token forms, origin
  and body guards, account enumeration through content or time, tokens and links never reaching
  logs, a link of another kind, a blocked account, a login in progress.
- Irreversible operation (step 4): **no**; the design has no schema step. No agent deploys, sends
  real mail through Outsider or changes anything on the server (D-12); tests never reach the real
  Outsider.
- The plan's labels are now: N1 = `D-214`, N2 = `D-215`, N3 = `D-216`, N4 = `D-217`, N5 = `D-218`, N6 = `D-219`, I1 = `password-reset-verified-email`, I2 = `password-reset-link`, I3 = `password-reset-ends-sessions`, F1 = `express-session-end-of-request`, F2 = `express-session-regenerated-session-saved-again`.
- The line ranges of foundation entries below are current in the worktree; where they differ from
  the plan's section, these hold. Ranges of code or tests in the section may have moved with earlier
  slices: find them again by name.
- Do not change any file. Do not run the product's gate; run focused checks where a claim needs it.

## Your section of the plan (`.runs/task-cycles/reset-hasla/plan.md`), word for word

### Slice 2 — No session from a login or registration in progress at a reset

- **Goal:** Decision 7 stands whole. `saveSession` takes an optional expected password hash through
  `StoredSession`, and its statement stores nothing when the account holds another hash, at either
  store of a session. `SqliteSessionStore.expectPasswordHash(session, passwordHash)` keeps the hash
  in a `WeakMap` beside the session object, so the stored payload stays as D-115 has it, and `set`
  passes it on. `establishSession` takes the account and names the hash: at a login the one the
  password was checked against, at a registration the one just made. The login route, after
  `verifyPassword`, compares the stored hash with the one it checked against; where they differ it
  releases the ticket and answers `invalid-credentials`, before it looks at the block. A store with
  no expectation behaves as at the base.
- **Change:** `src/server/database.ts` · `src/server/session-store.ts` ·
  `src/server/account-routes.ts` · `tests/account-storage.test.mjs` · `tests/http.test.mjs`
- **Read:** `.runs/task-cycles/reset-hasla/spec.md:71-73` Constraints, express-session ·
  `.runs/task-cycles/reset-hasla/spec.md:240-325` Decision 7 — A login in progress with the old
  password · `.runs/task-cycles/reset-hasla/task.md:135-135` Questions carried to cycle, first
  question · `.runs/task-cycles/reset-hasla/task.md:214-214` Settlements to record, row 14 ·
  `foundations/decisions.md:1985-1996` D-112 · `foundations/decisions.md:2013-2026` D-115 ·
  `foundations/decisions.md:1905-1916` D-107 · `foundations/decisions.md:1821-1832` D-101 ·
  `foundations/decisions.md:1849-1862` D-103 · `foundations/decisions.md:2028-2041` D-116 ·
  `foundations/decisions.md:2577-2590` D-139 · `foundations/decisions.md:1806-1819` D-100 ·
  `foundations/invariants.md:778-786` account-session-storage ·
  `foundations/invariants.md:858-866` blocked-account-access ·
  `foundations/invariants.md:678-686` player-express-session-sqlite-store ·
  `foundations/environment_facts.md:238-242` express-session-store-contract ·
  `foundations/environment_facts.md:262-266` express-session-cookie-lifecycle ·
  Foundation entries rows I3 and F2 ·
  `guidelines/coding.md` · `guidelines/coding-http-application.md` ·
  `guidelines/coding-database-access.md` · `guidelines/coding-session-store.md` ·
  `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/session-store.ts`, `src/server/database.ts` and
  `src/server/account-routes.ts`: a login in progress at a reset, and every way a session comes to be
  stored
- **Checks:** Start from the route case in the shape of „a block committed while the password is
  checked” (`tests/http.test.mjs:1578`): `resetPassword` commits directly on the database during a
  login's password work, and the login gets 401, no session and no change to the failure count. Then
  the route case with a held mailer, a reset committing while a registration waits on its message:
  201, no session row, and its cookie gets 401. Then the storage cases of Decision 7's *Proved by*:
  an expectation that holds writes, also twice with the same object; after the hash changes, also
  through a second connection, the same object stores nothing; no expectation behaves as at the base.
  Cases carry `invariant: password-reset-ends-sessions` and `invariant: account-session-storage`;
  each is seen failing once, then passing, with `npm test -- tests/account-storage.test.mjs` and
  `npm test -- tests/http.test.mjs`. Also `npm run typecheck` and
  `npm test -- tests/quality/test_quality_invariants.py`.
- **Depends on:** Slice 1

## Passages of the task and spec its *Read* names, word for word

### `.runs/task-cycles/reset-hasla/spec.md:71-73`

> - express-session 1.19.0 as pinned: `resave: false`, `saveUninitialized: false`, `rolling: true`.
>   With these, a session the route regenerated and saved is saved a second time when the response
>   ends (Decision 7).

### `.runs/task-cycles/reset-hasla/spec.md:240-325`

> ### Decision 7 — A login in progress with the old password
>
> **What the library does.** A login and a registration each store their session twice. `regenerate`
> makes the new session through `store.generate`, which leaves `save` unwrapped, so the library never
> learns of the route's own `request.session.save`. When the response ends, `res.end` finds `shouldSave`
> true and saves the session again, and `saveSession` is an upsert that inserts a missing row. Between
> the two stores a login has only `await`s on promises that settle without waiting on I/O, so no other
> request runs there. A registration has `await sendConfirmation`, up to `sendingDeadline`, 10 seconds.
> So guarding only the first store would leave an order open: first store, reset deletes the row,
> second store puts it back. The guard has to hold for every store.
>
> **The guard, in the statement that writes the session.** `establishSession` takes the account and, on
> the regenerated session, tells the store which password hash this session stands on, through a new
> `SqliteSessionStore.expectPasswordHash(session, passwordHash)`: at a login the hash the password was
> checked against, at a registration the hash just made. The store keeps it in a `WeakMap` keyed by the
> session object, beside the session and not in it, so it reaches no JSON, no row and no `hash` of the
> library, and the stored payload stays as D-115 has it. `set` passes it to `saveSession` through an
> optional field of `StoredSession`, and the statement that inserts reads the account's password hash
> beside its blocked state and stores nothing when they differ. A refused write ends as a block's does
> at the base: no row changed, the existing error of `saveSession`.
>
> Why this is correct: `resetPassword` changes the hash and deletes the account's sessions in one
> transaction. A session write before that commit is removed by it; a write after it finds another hash
> and stores nothing. This is D-112's argument for a block, and it does not depend on the turn of the
> event loop, on how many stores a request makes, on what stands between them, or on the connection.
>
> **The comparison in the login route chooses the answer and nothing else.** The route remembers the hash
> it verified against, and after `verifyPassword` it reads the account again, as it already does for a
> block. If the stored hash differs, the password was replaced during the check: the route releases the
> ticket and answers the common `invalid-credentials`, before it looks at the block, because the old
> password no longer proves anything and D-139's sentence is not earned. `release` and not `fail`, since
> the password was right when checked, so it is no wrong guess; and it is no sign-in, so it clears
> nothing: the reasoning of D-139. A hash is salted, so any reset changes it, even to the same password.
> Without this comparison the guard would still leave no session, but the login would answer 503 after
> settling as a success.
>
> **Registration in the wait.** A reset that commits during `await sendConfirmation` deletes the first
> store's row, and the second store is refused. The 201 still goes out, as it does for a block at that
> point at the base (`tests/http.test.mjs:2094`). Its cookie names no session, so the next request gets
> 401 and the page shows the forms. The registration route has no exception: it passes the hash it made,
> like the login.
>
> Rejected:
>
> - Resting on the true order, with the premise moved to "no wait on real work from the comparison until
>   `response.json` has returned". True of the login today. But it is a condition on a stretch of route
>   and library code that no test can see, a later `await` there reopens the hole without a sign, and the
>   registration route already breaks it for up to 10 seconds. That path could only be argued as
>   improbable, which leaves an invariant with an exception, and a test with a held mailer would show the
>   session coming back.
> - A credential stamp stored in the session's data, the form of this check rejected in the first version
>   of this spec — a change of the narrow payload of D-115 and of `decode`, and a value derived from the
>   password in every session row. The `WeakMap` gives the statement the same value without any of that.
> - A generation column on accounts, compared in the statement — a schema step, which would change the
>   answer to the irreversible operation to yes, for nothing the guard does not already do. The design
>   fulfils the task equally well without one, so that answer stays **no**.
> - A second store unable to insert, by an update-only `set` or by remembering stored session objects —
>   closes only the second store, keeps a premise about turns for the first, and an update-only `set`
>   departs from the library's upsert and from the storage tests.
> - Overriding `save` on the session object so that the library's second store does nothing — a route
>   patching an object the library owns.
> - Marking tickets in the policy at a reset — a second memory of what the database already holds, and it
>   does not reach a registration, which has no login ticket.
>
> Weak points, and cost if wrong: the expectation is optional in `saveSession`, because test seeds and
> the store's own tests write sessions without one, so a session stored without it is unguarded;
> `establishSession` is the only product code that stores a session, and a review of any new way to make
> one checks this. The guard also rests on both `set` calls receiving the same session object, which the
> pinned library does; an upgrade that hands over a copy would lose the expectation silently, and the
> registration case below is what would catch it. Either failure lets a session outlive the reset until
> it expires, which question 5 refused. Holding the hash in memory for the length of a request adds no
> exposure: the same request has just read it from the account.
>
> Proved by:
>
> - A route case in the shape of "a block committed while the password is checked": a login with the old
>   password is admitted, `resetPassword` commits directly on the database during its password work, and
>   the login gets 401, no session and no change to the failure count. Fault caught: a login deciding on
>   the account it read before the password check.
> - A route case with a held mailer: a registration waits on its message, a reset of that account commits
>   directly on the database, the mailer answers, the answer is 201, no session row exists and its cookie
>   gets 401. Fault caught: a second store that writes without the guard. The login case does not catch
>   this, since it commits before either store.
> - Storage cases on real SQLite: a store with an expectation that still holds writes, also a second time
>   with the same session object; after the hash changes, through a second connection too, the same
>   object stores nothing and no row appears; a store with no expectation behaves as at the base.

### `.runs/task-cycles/reset-hasla/task.md:135-135`

> - Jak logowanie starym hasłem, które trwa w chwili ustawienia nowego hasła, nie zostawia działającej sesji po usunięciu sesji konta (pytanie 5): D-112 mówi to dla blokady (“a session write for a blocked account stores nothing”, *Rejected*: “a login in progress at the block stores its session afterwards”), a dla resetu żaden wpis tego nie mówi.

### `.runs/task-cycles/reset-hasla/task.md:214-214`

> | 14 | Reset usuwa wszystkie sesje konta w tej samej operacji co zmiana hasła i nikogo nie loguje; gracz loguje się nowym hasłem na formularzu. | decision | pytanie 5 (A; Mariusz, 2026-10-30, pozycja D31: „Reset usuwa wszystkie sesje konta i nikogo nie loguje.”), *Not chosen* tam; propozycja refinera: „w tej samej operacji co zmiana hasła”; zmienia D-138 (jak trwa logowanie): “can invalidate it on logout or account blocking”, `player-server-session` (niezmiennik o sesji na serwerze) i wyliczenie w D-211 (co widzi gracz, gdy zapis nie znajdzie sesji): “an expiry or a block of the account” | czy sesje zostają, czy gracz wchodzi od razu do gry |

## Foundation entries, each whole, by identifier and current range

- `foundations/decisions.md:1985-1999` D-112
- `foundations/decisions.md:2015-2029` D-115
- `foundations/decisions.md:1905-1917` D-107
- `foundations/decisions.md:1821-1833` D-101
- `foundations/decisions.md:1849-1863` D-103
- `foundations/decisions.md:2030-2044` D-116
- `foundations/decisions.md:2579-2593` D-139
- `foundations/decisions.md:1806-1820` D-100
- `foundations/invariants.md:778-787` account-session-storage
- `foundations/invariants.md:858-867` blocked-account-access
- `foundations/invariants.md:678-687` player-express-session-sqlite-store
- `foundations/environment_facts.md:238-243` express-session-store-contract
- `foundations/environment_facts.md:262-267` express-session-cookie-lifecycle
- `foundations/invariants.md:1058-1067` password-reset-ends-sessions
- `foundations/environment_facts.md:364-369` express-session-regenerated-session-saved-again

## Guideline files, each whole

- `guidelines/coding.md`
- `guidelines/coding-http-application.md`
- `guidelines/coding-database-access.md`
- `guidelines/coding-session-store.md`
- `guidelines/testing.md`

## Product files and method passages its *Read* names

- none

## Return

Write your report to its path as the method gives. Return its first line and the path.
