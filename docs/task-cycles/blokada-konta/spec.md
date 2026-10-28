# Spec — Blokada konta gracza przez właściciela na serwerze testowym loop2

- Task: `.runs/task-cycles/blokada-konta/task.md`
- Open choice: the four *Questions carried to cycle* of the task — how a database of schema
  version 1 moves to the version with blocking (and how later versions follow it); how the
  server invalidates the session records of a blocked account so that neither a login in
  progress at the moment of blocking nor a later unblocking gives access; how a blocked
  account's login counts towards D-102's attempt thresholds; how the owner's command reaches the
  database beside the running server under D-112's "one application-owned SQLite connection".

## Intent

The owner must be able to cut an account off from the game before giving the game's address to
other players, and to undo that. The change adds a per-account blocked state to the account
database, a command the owner runs in the `loop2` container to set and clear it, removal of every
session of an account at the moment it is blocked, a login refusal that tells a blocked player
who knows their password „To konto jest zablokowane.”, and the first forward migration of the
account database, from schema version 1 to version 2, in a form the later tasks 20, 16 and 21
extend with one step each.

## Goals and non-goals

Goals:

1. The owner blocks and unblocks an account named by its email address with one command run in
   the container; the command says which outcome it reached (To do 1, 2).
2. Blocking removes every session record of the account, in every browser, in the same
   transaction that marks the account blocked; no session of a blocked account is stored
   afterwards, also by a login that was in progress when the block committed (To do 3).
3. Every request that needs a signed-in player and carries a cookie of such a session gets
   JSON 401 `unauthenticated`, as with no valid session (D-109); the browser returns to the
   forms on reload (To do 3).
4. Unblocking restores the ability to log in and nothing else: no session removed by the block
   comes back (To do 2; settlement row 2).
5. A blocked account with the correct password gets „To konto jest zablokowane.” in the login
   form's warning and no session; with a wrong password it gets the unchanged
   „Nieprawidłowy adres e-mail lub hasło.” (To do 4).
6. Opening a version-1 database migrates it to version 2 in one transaction, keeping every account
   and session; accounts migrated are not blocked; existing sessions keep working (To do 5,
   acceptance criterion).
7. The deploy skill, its copy and the troubleshooting reference describe the command and the new
   schema with its rollback consequence (To do 6); the testing and database-access guidelines
   gain their rows and rule (To do 7, 8).

Non-goals:

- Refusing save requests of a blocked account — task 16 (task, *Out of scope*).
- Any view of blocking in the browser, an owner role or panel, a reason or a history of blocks.
- Telling a player who is blocked while the game is open; they play on until reload or logout,
  as the task's *Context* accepts.
- Stopping a blocked person from registering with another address (task *Context*, D-100).
- A copy of the database before migration, a downgrade step, or any way back from version 2 to
  version 1; the skill states the consequence instead.
- Changing the attempt limits, the password gate or the email lock of D-102 and D-103.

## Constraints

- The task: To do 1–8, the acceptance criterion, the four settlements and the answers to
  questions 1–7, among them: the command is run only by the human on the server (D-12); the
  wording of the login refusal is fixed („To konto jest zablokowane.”); exclusive words are
  allowed in this task's candidate entries (question 6).
- D-07: the server computes nothing of the game — untouched.
- D-12: the agent never runs the command or reads the database; the cycle prepares, the human
  runs.
- D-99: the command normalizes the address as login does (`normalizeEmail` of
  `src/server/account-policy.ts`) and finds the account by the normalized address.
- D-100: unknown address and wrong password remain indistinguishable at login.
- D-101 and `account-session-storage`: removed sessions authorize nothing and renewal never
  recreates a removed session (`renewSession` updates existing rows only).
- D-102, D-103, D-116, `account-attempt-limits`: admission before password work, exactly one
  settlement after it; an email lock refuses even correct credentials before password work.
- D-104, D-109, D-110, `account-mutation-request-guards`, `account-session-authorization`: guards
  and 401 shapes stay as they are; the login route's input checks are unchanged.
- D-112, D-114: database access owns the connection, the schema, every SQL statement and bound
  values (`src/server/database.ts`); no transaction spans password work or an HTTP response;
  WAL, full synchronization, foreign keys and a bounded busy timeout apply; an unknown newer
  schema is refused before readiness. D-112's sentence "opens one application-owned SQLite
  connection before readiness" is about the server and changes with this spec (see *Foundation
  entries*).
- D-115: the Store adapts callbacks to database operations and validates before hydration; the
  guideline "Callback po operacji" keeps failures in the callback.
- D-117, `account-client-outcomes`: the browser client shows a server message only for a code on
  its list; a new refusal code needs the server and the client changed together.
- `guidelines/coding.md`, § „Odłożone rodzaje i formatowanie”: an entry point has no pattern; the
  command is added without choosing one, as `src/server/measure-passwords.ts` was.
- The container: `docker exec loop2` runs as user `node` with the service's environment, so
  `LOOP2_DATABASE_PATH=/app/data/accounts.sqlite` is set and the volume is writable by that user
  (`Dockerfile`, `compose.yaml`).
- The code as it stands: `initializeSchema` reads `user_version` inside `BEGIN IMMEDIATE`;
  `saveSession` upserts by session id; `sessionAccount` in `src/server/account-routes.ts` reads
  the account by the session's identifier; the login route reads the account before the awaited
  `verifyPassword`, so a block can commit between that read and the session write.
- The existing test "schema reopen preserves accounts and sessions and rejects a newer version
  without rewriting it" in `tests/account-storage.test.mjs` uses version 2 as the unknown newer
  version; version 2 becomes known, so that case moves to a version above the current one — a
  change justified by the changed requirement (*Changing an existing test*).

## Decisions

### 1. Schema version 2 and the forward migration

**Decision.** Version 2 is version 1 plus one per-account blocked state: a non-null column of
`accounts` that is false for every account the migration carries over and for every new
account. Opening keeps one transaction (`BEGIN IMMEDIATE`, as today) in which it reads
`user_version` and then:

- version 0 (new database): applies every step in order, from the empty database to the current
  version;
- a known older version (today only 1): applies the steps after it, in order;
- the current version: applies nothing;
- any other value: refuses with the existing "Unsupported account database schema" error,
  changing nothing.

The steps form one ordered list in `src/server/database.ts`. Step 1 creates the version-1 tables
and indexes exactly as today; step 2 adds the blocked state. After the last step the
transaction sets `user_version` to the current version and commits; any failure rolls back
every step and the version, and the open fails before readiness, as today (startup reports
`LOOP2_DATABASE_PATH`, the deployment ends with exit 8).

The rule for tasks 20, 16 and 21: each adds exactly one step at the end and raises the current
version by one; a step already deployed to the test server is never edited, because databases
at its version exist. The migration of a version-1 database keeps every account and session row
and every value in them.

**Ways weighed.**

- A — one ordered list of steps for new and existing databases (chosen). A new database and a
  migrated one are built by the same statements, so they cannot drift apart; each later task
  adds one step. Cost: a new database runs through the history of steps (a few statements).
- B — create the latest schema directly on a new database and keep separate upgrade steps for
  existing ones. Rejected: two definitions of the same schema that must agree, and a test that
  compares them for every later version; the first divergence shows only on the test server's
  migrated database.
- C — rebuild tables (create new, copy, drop old) at every version. Rejected: needed only for
  changes SQLite's adding of a column cannot make; it moves every row and lengthens the write
  lock for nothing here. A later task that needs a rebuild writes it as its own step.

**If wrong.** A migration that loses or alters rows would destroy the test server's accounts with
no copy to restore (troubleshooting, § „Rollback and the accounts”). The tests on real temporary
SQLite files (see *Left to the maker* for their shape) are the protection; the human's
acceptance check after deployment is the last one.

### 2. Invalidation of a blocked account's sessions: removal, in one transaction, plus a write guard

**Decision.** Blocking is one database operation that, in one write transaction, sets the
account's blocked state and deletes every session row of that account. Unblocking clears the
blocked state and touches no session. A session write (`saveSession`, reached through the
Store's `set`) stores nothing when the account it names is blocked: the check of the account's
state and the insert are one statement, so they cannot be separated by another connection's
write; a write that stores nothing fails as an unknown account's write fails today
("Session cannot be replaced" through the Store's callback), so the login answers 503
`session-unavailable` and issues no cookie.

Because SQLite lets one write transaction hold the database at a time across connections and
processes, a login's session write either commits before the block — and the block deletes it —
or after it — and the guard stores nothing. Either way no session of a blocked account exists
once the block has committed, and none can appear while it stays blocked. Unblocking cannot
bring a deleted row back, so settlement row 2 holds by construction.

As the supplement the task allows, `sessionAccount` in `src/server/account-routes.ts` treats a
blocked account as no account: a request whose session was read just before a block committed
and whose account is read just after gets 401 `unauthenticated`, not the account. Every route
that needs a signed-in player authorizes through `sessionAccount`; today that is
`GET /api/account` and `POST /api/logout`.

**Ways weighed.**

- A — delete the rows, guard the write, check at authorization (chosen). The same removal as
  logout (`destroySession`), so D-101's "removed sessions authorize nothing" and the Store's
  "never recreates a removed session" apply unchanged; nothing is left for unblocking to revive.
  Cost: one guarded statement in `saveSession` and one field read in `sessionAccount`.
- B — mark the rows invalid and keep them. Rejected: every read and every renewal must check the
  mark, cleanup must learn to prune marked rows, and unblocking must be written never to clear
  it — exactly the risk the task names; a forgotten check in a later route revives a session.
- C — a per-account counter of session generations, copied into each session and compared on
  read; blocking raises it. Rejected: a new column on both tables and a comparison on every read
  for the same effect as deletion; the race with a login in progress still needs the counter to
  be read in the same statement as the insert.
- Deleting without the write guard. Rejected: a login whose password check was running when the
  block committed would store a session afterwards, which the task rules out.

**If wrong.** A blocked player keeps playing through an existing session until it expires
(30 days), or an unblocked player returns to an old session the owner meant to end.

### 3. Login of a blocked account and the attempt thresholds

**Decision.** The login route keeps its order: input check, admission (`admitLogin`, which still
refuses a locked address or IP before any password work), account lookup, password check through
the gate (dummy hash for an unknown address). Then:

- unknown address or wrong password, blocked or not: `fail()` and the unchanged 401
  `invalid-credentials` „Nieprawidłowy adres e-mail lub hasło.”;
- known address, correct password, account blocked: `release()` and a refusal 403 with the new
  code `account-blocked` and the message „To konto jest zablokowane.”; no session, no cookie;
- known address, correct password, account not blocked: `succeed()` and sign-in as today.

A blocked login with the correct password is therefore neither a failed login (it adds nothing to
the email or IP failure histories and cannot lock the address) nor a successful one (it does not
clear the email's failure history), as D-102 already treats a capacity refusal. An address
locked by earlier wrong passwords stays locked for its 15 minutes and answers 429
„Za dużo prób. Spróbuj ponownie za kilka minut.” even to the correct password of a blocked
account, unchanged from D-102.

`src/browser/account-api.ts` adds `account-blocked` to its list of refusal codes, so the login
form's warning shows the server's message; no screen file changes, because
`src/browser/view/account-screen.ts` already puts a refusal's message in the form's warning and
`src/browser/view/app.ts` treats only a 401 of the session check or logout as signed out.

**Ways weighed.**

- A — release (chosen): the refusal is not a guess of credentials, so it does not count as one,
  and the login did not succeed, so it clears nothing. Cost: someone who knows a blocked
  account's password may repeat the attempt without being slowed by the email or IP threshold;
  each attempt still passes the bounded password gate, and a non-blocked account's correct
  logins are equally unthrottled today.
- B — count it as a failure. Rejected: after five tries with the correct password the address
  locks and the blocked player sees „Za dużo prób…” instead of the message To do 4 asks for;
  it also spends the shared IP failure budget of people behind the same address.
- C — count it as a success. Rejected: it would clear the email's failure history on a refused
  login, so wrong guesses interleaved with the correct password would never lock the address.
- Status 401 for the refusal. Rejected: 401 is the code of "no valid credentials or session"
  in this API; 403 says the credentials were recognized and access is refused, and keeps the
  refusal apart from `invalid-credentials` for any later reader of the status.

**If wrong.** Either a blocked player's correct password triggers a lock with the wrong message
(B), or the email lock weakens (C); both are confined to the login route and the policy calls.

### 4. The owner's command and its connection

**Decision.** A new entry point `src/server/account-block.ts`, built to
`dist/server/account-block.js`, run by the owner as
`docker exec loop2 node dist/server/account-block.js block <email>` and
`docker exec loop2 node dist/server/account-block.js unblock <email>`. It:

- takes exactly two arguments, the action `block` or `unblock` and an address; anything else is
  a usage error that opens nothing;
- normalizes the address as login does (D-99) and refuses an address without a valid form before
  opening the database;
- reads only `LOOP2_DATABASE_PATH` from the environment (no session secret, no other setting) and
  refuses when it is unset, `:memory:`, or names no existing file — the command never creates a
  database;
- opens its own `AccountDatabase` on that file — a second, short-lived connection beside the
  server's, under the same opening rules (WAL, full synchronization, foreign keys, bounded busy
  timeout, schema check and migration, pruning) — runs one operation and closes it;
- calls the database operation for its action and prints one line for its outcome:
  for `block` — blocked, already blocked (its sessions are deleted again, there are none), or no
  account with that address; for `unblock` — unblocked, was not blocked, or no account with that
  address;
- exits 0 when the account ends in the requested state, and nonzero for no such account, a usage
  error, a missing database or a database failure, saying which and that nothing changed;
- prints no password hash, session identifier or database error detail.

The database operations live in `AccountDatabase` (D-114): one to block by normalized email and
one to unblock by normalized email, each returning which outcome it reached. The command holds
no SQL. Arguments, output and verbs are English, like the existing entry point
`src/server/measure-passwords.ts` and the English deploy skill that will quote them; the task's
`zablokuj` was an illustration in the question's material, not a settled spelling.

**Ways weighed.**

- A — a second connection from a separate process, through `AccountDatabase` (chosen). SQLite in
  WAL mode lets the server keep reading while the command writes, and the busy timeout makes
  either side wait out the other's short transaction; the code that opens, migrates and
  validates is the server's own. Cost: D-112's "one application-owned connection" must be
  reworded to admit this connection; a busy timeout exceeded by the server's write fails the
  command with nothing changed, and the owner retries.
- B — an owner-only HTTP route on the running server, called from inside the container.
  Rejected: a new route inside the trust boundary that must prove it cannot be reached through
  the tunnel, plus a secret or an address check to guard it — far more to defend than a
  terminal the owner already reaches by SSH.
- C — a signal or a file the running server watches. Rejected: a new channel into the server
  with its own failure modes, and no outcome to report back to the owner.

**If wrong.** Under A the risk is a lock held longer than the busy timeout: the command reports a
failure and changes nothing; the server's own write waits at most its busy timeout and fails
one request. No state is half-applied, since each operation is one transaction.

### Units and interfaces

| Unit | File | What it does | Used by | Depends on |
|---|---|---|---|---|
| Account database | `src/server/database.ts` (changed) | Opens and migrates the schema by ordered steps; returns accounts with their blocked state; blocks (state plus session deletion, one transaction) and unblocks by normalized email, reporting the outcome; stores a session only for an existing, unblocked account | Store, routes, command | `node:sqlite` |
| Session Store | `src/server/session-store.ts` (unchanged unless the maker finds a needed change) | Passes the database's refusal of a blocked account's session to the callback, as for an unknown account | `express-session` | Account database |
| Account routes | `src/server/account-routes.ts` (changed) | Treats a blocked account as no session in `sessionAccount`; refuses a blocked login with the correct password with 403 `account-blocked` and settles it by `release()` | Application | Account database, account policy, passwords |
| Owner command | `src/server/account-block.ts` (new) | Parses `block`/`unblock` and an address, opens the existing database, calls one operation, prints its outcome, exits 0 or nonzero | The owner, by `docker exec` | Account database, `normalizeEmail` |
| Browser account client | `src/browser/account-api.ts` (changed) | Knows the code `account-blocked`, so the screen shows the server's message | Account screen | — |
| Deploy skill | `.claude/skills/loop2-deploy/SKILL.md`, `references/troubleshooting.md` and their byte-identical copies in `.agents/skills/loop2-deploy/` (changed) | Tells the owner how to block and unblock and what each outcome means; states schema version 2 and that a rollback to a commit before this task fails health with exit 8 on the migrated database, recovered only by deploying a commit that knows version 2 | The human, an agent | — |
| Guidelines | `guidelines/testing.md` (through `the-way-maintain-testing-guidelines`), `guidelines/coding-database-access.md` (through `the-way-maintain-coding-guidelines`) | Rows for the blocked account in the permissions table with a refusal test marked `blocked-account-access`; the forward-migration rule of Decision 1 | Later changes | — |

## Foundation entries

Words are the foundation step's; each is named with its kind and its meaning.

- **New decision** (settlement row 1) — the owner blocks and unblocks an account named by its
  email address with a command run in the `loop2` container, which reports blocked or unblocked,
  the state it was already in, or that no account has that address; the deploy skill describes
  it; it opens a second, short-lived connection to the database beside the server.
- **New decision** (settlement row 3) — a blocked account's login with the correct password is
  refused with „To konto jest zablokowane.” (403, code `account-blocked`) and no session, a wrong
  password still gets D-100's message, and the refusal neither counts as a failed login nor
  clears the address's failure history.
- **Changed decision D-100** — its sentence on unsuccessful login applies to an unknown address
  and a wrong password; a blocked account with the correct password has its own message (the new
  decision above).
- **Changed decision D-112** — the account server opens one application-owned connection before
  readiness and the owner's command may open one short-lived connection under the same rules;
  opening migrates a known older version forward by ordered steps in one transaction to the
  current version (2, adding the per-account blocked state), keeps every account and session,
  and refuses an unknown newer version; blocking sets the state and deletes the account's
  sessions in one transaction, and a session write for a blocked account stores nothing.
- **New decision, projected** "(new) — How is a player's login kept between requests?" — written
  by this task as the plan assigns it; this change makes its invalidation on account blocking
  true (Decision 2).
- **New invariant, projected** `blocked-account-access/1` — written by this task and checked by the
  trust-boundary refusal test this change adds; true for today's authenticated routes (`GET /api/account`, `POST /api/logout`) and for login;
  save requests come with task 16.
- **New invariant, projected** `player-server-session/1` — written by this task, with tests of this
  change behind it; removal at logout exists, removal at blocking comes with Decision 2.
- **New invariant** (settlement row 2) — a session removed when its account was blocked gives no
  access after the account is unblocked; a test of this change checks it.
- **New glossary term** (settlement row 4) — *blocked account*: an account the operator cut off
  from logging in and playing, which stays so until the operator unblocks it; distinct from the
  *locked address* of D-102 (15 minutes after five failed logins). In schema and code the account
  state is "blocked" and the refusal code `account-blocked`; "locked" stays with the email
  limiter (`lockedUntil`) and `too-many-attempts`.
- **Changed invariants** `account-schema-lifecycle` and `account-database-schema` — opening
  initializes the current version on a new database, migrates an existing older known version
  in one transaction keeping its accounts and sessions, and refuses an unknown newer version
  without changing its version or records.
- **Changed invariant** `account-session-storage` — the Store also stores no session for a
  blocked account.
- **Unchanged, checked by the foundation step:** `account-session-authorization` (a blocked
  account's session is a removed session, so its 401 is the existing one), D-101, D-102, D-109,
  the part map (`src/server/**` already holds the new file and is the trust boundary).
- **Possible environment fact** — that SQLite, as Node.js 24's `node:sqlite` bundles it, lets
  one write transaction hold a database at a time across connections and processes (WAL mode)
  and runs adding a column inside a transaction; the foundation step decides whether D-112's
  *Based on* needs it beyond `node-sqlite-database`, and reads a pinned source if so.

## Left to the maker

- The column's name and SQL form for the blocked state (an integer limited to two values or
  equivalent under `STRICT`), the form of the guarded insert, and the names of the database
  operations and their outcome type.
- Whether the login route re-reads the account after the password check to choose between the
  blocked refusal and sign-in in the rare race with a block; without it that race ends in 503
  `session-unavailable` and no session, which the spec accepts.
- The exact lines the command prints and its nonzero exit codes, within Decision 4.
- How the command refuses a missing database file (an existence check before opening or an open
  mode that does not create).
- The tests and their files, following `guidelines/testing.md`, at least these behaviours, each on
  real SQLite files, real HTTP or a real spawned process as the guidelines' integration recipe
  asks: a version-1 database written in the test from the version-1 schema stated there (not
  produced by product code) opens as version 2 with its accounts and sessions intact and its
  accounts not blocked; a failing step leaves version 1 and its rows unchanged; an unknown newer
  version is refused unchanged; blocking deletes every session of that account and no other;
  a session write for a blocked account stores nothing; a blocked account's cookie gets JSON 401
  on `GET /api/account` and `POST /api/logout`, also after unblocking; the blocked and wrong-password
  logins get their two refusals and only the wrong one counts towards the thresholds; the browser
  client returns the server's message for `account-blocked`; the command, spawned beside an open
  connection, reports each outcome, changes nothing on a usage error or unknown address and
  creates no database. The trust-boundary refusal test is marked `blocked-account-access` and
  seen failing once.
- The wording of the skill's paragraphs and of the guideline rows and rule, within the units
  table.
- The manual journey of the acceptance criterion is the human's after deployment (D-75); the
  cycle prepares its steps in the request.
