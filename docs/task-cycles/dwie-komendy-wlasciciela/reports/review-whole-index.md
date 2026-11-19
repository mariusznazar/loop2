# decision_index.py: index of the decisions of the log

Log: foundations/decisions.md
Listed in full: 35. Listed by heading alone: 90.

## Listed in full

### D-114 — Which file is the exemplar for database access?

The exemplar for kind `database-access` is `src/server/database.ts`, and its kind guidelines are read before adding or changing a database-access file. Database access owns the SQLite connection, transactional schema initialization, bound SQL values and connection disposal, independently of HTTP and password hashing.

- **Scope:** account-server

### D-425 — How large may a function and a file of the code be?

A function holds at most 200 lines of code and a file at most 800, lines counted without comments and blank lines and the lines of a nested function counted in the function that holds it. The limit on a function covers every file that ESLint checks under D-29 — the application, the scripts, the tests, the balance instrument, the JavaScript of the three agent-workflow directories D-29 names and the two root configuration files — and the limit on a file covers the same files outside `tests/`.

Two exceptions stand whole over a threshold and no other does: the function `accountRoutes` in `src/server/account-routes.ts`, which is the one function that registers the routes of the server, nearly all of its lines being functions nested in it, and the file `src/browser/sim/saved-game.ts`, which keeps the whole turning of a saved document into game state, or into a refusal, in one checked file at a trust boundary. Adding an exception takes a human-accepted change of this decision.

The rule runs as an ESLint run of its own, with the two size rules of ESLint alone, apart from the run on `eslint.config.mjs` that D-29 holds; that run leaves the rule set of D-29 and its configuration as they are, and is no change of D-29.

- **Scope:** browser-view, simulation, account-server, build-tools, balance-tools, deployment, agent-workflow

### D-252 — How does loop2 write its failures to its logs, and what does it log?

Loop2 adopts all six rules on failures and logs of the coding template of its pinned the-way and departs from none of them. A log line of its Node.js code is one JSON object on one line, written through `console` with no library and under fixed field names, while its Bash scripts keep their own text, a line in the browser's console is plain text, and what a command prints to whoever ran it — the readiness line of the server, the sentence of `account-database-check` in the log of an image build, the report of `measure-passwords` for the script that ran it — is no log line, and where the command works on no value of a player's, as `account-database-check` does on a temporary database and `measure-passwords` on made-up passwords, its failure keeps the error's text there and gets no failure line in the log form of this decision, with `failure`, `kind`, `code` and `place`; the sentence by which `account-block`, `account-previous-save`, `account-role` or `account-backup` answers the operator is the matter of D-354. The product logs changes of a player's account and of access to it and operations that change what runs on the server or its backup, and no progress of a game and no housekeeping, and an agent adds alone an item that fits this principle, an identifier of a thing included, while anything that points to a person takes the human's consent. A change of the role of an account and each operation of the owner panel are such changes: each leaves one line with the number of the account changed, written after a change only, and no address and no number of the account of the owner who acted.

- **Scope:** browser-view · simulation · account-server · build-tools · balance-tools · deployment · agent-workflow

### D-253 — Which processes of loop2 have a last-resort handler of their own?

Each process that touches the data of accounts — the server, `account-block`, `account-previous-save`, `account-role` and `account-backup` — has one last-resort handler of its own, which writes the kind, the code and the place of what no code handled, because the runtime's default print could quote values. The page in the browser has one too: it cancels the event of an error that no code handled, so that the browser prints nothing itself, and writes in the console, as plain text, one line of the kind, the code and the place of the handler, never the error's message or stack, the same line once until the page is reloaded. A script run by hand or by the test gate that touches none of those data meets the rule on the last resort through the default print of Node.js or Python, which writes what nothing handled, and `account-database-check`, `src/server/measure-passwords.ts`, `deploy/loop2-watch`, `deploy/loop2-backup` and `scripts/restore-trial.mjs` already have a last-resort handling of their own, which the sentences of this decision above ask no more of, though the last two touch those data and write no kind or code.

- **Scope:** browser-view · account-server · build-tools · balance-tools · deployment

### D-354 — Is the sentence by which a service command answers the operator a log line?

The sentence by which a service command of the account server, `account-block`, `account-previous-save`, `account-role` or `account-backup`, answers the operator is no log line: the log line of such a command is its JSON line of D-252 alone, and the sentence stays beside it. A failure of the command written as that line and followed by that sentence is one failure recorded once.

- **Scope:** account-server

### D-228 — Which failure does the database backup survive?

A completed, consistent backup of the account and save database is stored outside the game server host, so the accounts and saved game states can be restored to the latest retained backup after that host is lost. Mikrus Strych is the destination when it passes a capacity and restore check with the planned retained backups; otherwise another device outside the game server host is used.

- **Scope:** account-server, deployment, agent-workflow

### D-230 — How often is a database backup made, and how many stay?

One backup of the account and save database is made each night, seven stay at the destination, and the latest is at most a day old. The seven are the weekday files `loop2-accounts-<1..7>.sqlite.age`, one for each day of the week by the UTC date of the run, so a night's backup replaces the one made seven days earlier. Only the schedule a human installed or a human's hand run replaces a backup, no command deletes one, and nothing reads the destination's list of files.

- **Scope:** deployment, agent-workflow

### D-231 — Where does the database backup run?

At 03:17 by the server's clock each night, a schedule on the game server's host starts the backup script, installed by hand outside the game container and outside the checkout, which runs a short command in the running `loop2` container, takes the finished backup from that command's standard output through `docker exec` and sends the file itself, so there is no third Compose service and no timer in the game server, and the key to Mikrus Strych never enters the game container. That command opens only an existing database file, needs its one fixed word `--to-standard-output`, without which it refuses before it opens the database and prints nothing to standard output, and is run only by the installed backup script, which its schedule or a human starts, and the file it opens is one in which the server has set up its tables, any other file being refused with the exit code of a missing file and nothing written in it. The script holds the deployment's lock, `/run/loop2-deploy.lock`, with the deployment's wait of 900 seconds, while the command and the encryption run and releases it before sending, and each deployment compares the installed script and the installed schedule with their sources at the deployed commit and only warns when they differ, installing or reinstalling them being a human's change.

- **Scope:** account-server, deployment, agent-workflow

### D-232 — How is the database backup encrypted?

A backup of the account and save database is encrypted on the game server's host before it leaves it, by `age` in the backup script's pipe, with the identity file `/etc/loop2/backup-encryption-key` of D-13 used as a symmetric key. Outside the container's writable layer of D-231, the plain database exists on the host only in that pipe; a run whose command cannot remove its temporary copy, or that a signal kills, leaves that plain copy in the container's `/tmp` until the next deployment replaces the container, one copy for each such run, and the backup is not compressed.

- **Scope:** deployment, agent-workflow

### D-233 — How does the operator learn that a database backup failed?

At any failed end of a night's backup the backup script, outside the game container, calls `pusher` once, and the operator receives a message whose fixed subject and text say only that the backup failed, with no player's data, no tool's output and no step's name, because the message may travel unencrypted. The failure watcher of D-356 reads `/var/log/loop2-backup.log` and, when the log holds no successful send of a backup from the last 26 hours, calls `pusher` with a message of its own kind, under the same limits on its content, at most once a day, so a schedule that did not start does not stay silent; a host that is down sends no message, and delivery depends on push.mikr.us. `/var/log/loop2-backup.log` holds each attempt's start and end, the weekday file and size of each encrypted backup and the stage and exit code of a failure, with no player's data and no access value, so the error text of `ssh` and `rsync` reaches no file.

- **Scope:** deployment, agent-workflow

### D-234 — What does a checked restore of the database mean?

A checked restore is a trial on the operator's computer, which the operator repeats every month and after each change of the database's schema version: a backup fetched from its destination and decrypted, the same commit run on it, a login with a test account, the saved game state seen back, and the backup removed from the computer. It does not cover building a new server, and restoring over the server's database stays a human's documented procedure, whose paths that nobody has run, `umask 077` among them, stay untried.

- **Scope:** deployment, build-tools, agent-workflow

### D-235 — How is the code that talks to Mikrus Strych and `pusher` tested?

Mikrus Strych and the `pusher` service have no contract test, and no test reaches them: the reactions of the backup script of D-231, which talks to both, and of the failure watcher `deploy/loop2-watch` of D-356, which talks to `pusher`, are tested with stand-ins for their tools, which prove reactions and not delivery. A human checks the agreement with Strych when the backup script's way of talking to it changes, and the agreement with `pusher` when the way either script talks to it changes.

- **Scope:** deployment, build-tools

### D-236 — How is the consistent database backup made?

The backup command of D-231 makes a database backup through `backup()` of `node:sqlite`, on the connection it opens, whole in one step, by a `rate` that is a positive whole number above any page count a database of this server can reach.

- **Scope:** account-server

### D-238 — How does the backup script reach Mikrus Strych?

The backup script sends the encrypted backup by `rsync` over `ssh` into the home directory on Mikrus Strych, giving on the command line batch mode, strict host-key checking and `/etc/loop2/strych-known-hosts` as its one known-hosts file, and those options win over any SSH configuration for those options. Root's SSH configuration and the system-wide one set neither `KnownHostsCommand` nor `VerifyHostKeyDNS`, which the script does not give, so a host whose key that file does not hold fails the send. A human fills that file with the host-key line whose fingerprint a human has compared, the file holds no secret, and after a changed host key the send fails until a human repeats that comparison.

- **Scope:** deployment, agent-workflow

### D-360 — What does a restore of the database from a backup do about the passwords, sessions, blocks, roles and privileges it brings back?

A restore of the account and save database from a backup signs nobody out: the passwords, sessions, blocks, owner roles and previous-save privileges the backup holds come back as they were. After a restore over the server's database, the restore procedure has the human find in the game's log the lines of a password reset, of a block, of an unblock, of an owner role given or taken and of a previous-save privilege given or taken, written since the time of the backup, read the addresses of those accounts from the restored database with a command that only reads, tell the holder of each account with a reset to reset the password again, and repeat for each account the latest change of its block and unblock lines, of its role lines and of its privilege lines. Where the log names no account, as for a period whose log is lost, for a change made with no line written, and after a restore on a new server, which has no such log and no such step, whoever is known to have reset a password since the backup resets it again, an account known to have been blocked, unblocked, given or deprived of its role or given or deprived of its privilege since has that change repeated, and the restore procedure ends by saying so.

- **Scope:** deployment, agent-workflow

### D-86 — Which files may a visitor obtain from the public server?

Every visitor may retrieve the built game's files from its public directory and no file outside it. A request outside that directory, with a raw or encoded path, receives 400, 403 or 404 with neither that file's content nor the game's page.

- **Scope:** account-server

### D-101 — How long do independent browser sessions last?

Each browser holds its own random, opaque session identifier in a loop2 host-scoped, Secure and HttpOnly cookie, and a player may remain signed in through several browsers at once. A session expires 30 days after its last request and every request with a valid session, static-file requests included, renews the server expiry and cookie. Expired, removed or invalid sessions authorize nothing, and a delayed renewal cannot restore a destroyed session or shorten a later expiry.

- **Scope:** account-server, browser-view

### D-102 — How are account attempts limited?

Five failed logins for one normalized email address within a rolling 15-minute window lock that address for 15 minutes from the fifth failure; success clears pre-lock email history but not IP failures, a locked address remains locked even for correct credentials, and a successful password reset clears that address's failures and lock and leaves the client address's failures as they are. One client IP admits at most 20 failed logins per rolling 15 minutes and five successfully created accounts per rolling hour, with in-flight reservations counted before asynchronous password work so concurrency cannot overshoot those limits. A limited player sees „Za dużo prób. Spróbuj ponownie za kilka minut.”; invalid or duplicate registrations do not consume successful-account slots, and a capacity refusal is not a credential failure.

- **Scope:** account-server, browser-view

### D-103 — Where are attempt counters kept and how is password work bounded?

Attempt histories live in bounded process memory, with at most 10,000 live email keys and 10,000 live IP keys, fixed-size digests for email keys and threshold-bounded histories; restart or deployment clears them. Expired entries release capacity, live restrictions are not evicted to admit another key, and full capacity refuses work. One bounded admission gate without a waiting queue covers password hashing and verification, including dummy verification for an unknown account, with a concurrency cap selected by measurement within the container memory budget and slots released only when the actual operation completes.

- **Scope:** account-server, deployment

### D-104 — Which request origin and body may change account state?

The session cookie uses SameSite=Strict, and every state-changing route requires exactly the configured serialized HTTPS Origin and an application/json body with at most 64 KiB for the save route `PUT /api/saved-game` and at most 16 KiB for every other route, the reset route `POST /api/saved-game-reset` included, optional charset allowed and compressed inflation rejected, while the server stores at most 64 KiB of each player's saved game state and at most 64 KiB of the previous save of D-399, so up to two documents per player. Missing, null, duplicate, malformed or foreign Origin and wrong media type are refused before mutation or password work, and Host or forwarded host headers never choose the expected origin. Input is an object of expected fields with explicit type checks rather than coercion, and no cross-origin allowance or form-body alternative bypasses these guards.

- **Scope:** account-server, browser-view

### D-106 — How are player passwords hashed and checked?

The account server hashes and verifies player passwords with the `argon2` package using Argon2id. Its cost parameters are set explicitly after measuring hash and verify operations under concurrent login attempts in the intended Mikrus container image.

- **Scope:** account-server, build-tools, deployment

### D-107 — Which library maintains player sessions?

The account server uses `express-session` to issue and maintain player sessions, with a project-owned session Store backed by the chosen `node:sqlite` database. The deployed server does not use the package's default `MemoryStore`.

- **Scope:** account-server, build-tools, deployment

### D-108 — What public address do the game and account server share?

The built game and the account and save server use one public HTTPS origin at loop2's address. The browser sends account and save requests to relative `/api/` paths at that origin.

- **Scope:** browser-view, account-server, deployment

### D-109 — What identity authorizes an account request?

A visitor may create an account or attempt credential login subject to the transport, origin, input and admission guards, and may ask for a password-reset link subject to the transport, origin and input guards; an emailed confirmation link alone, under the transport, origin and input guards, authorizes confirming the address of its own account; a password-reset link alone, under the same guards and with or without a session, authorizes setting a new password of its own account and nothing else; and a valid server-side session alone authorizes reading its own account, reading and replacing its own account's saved game state, reading its own account's previous save and starting its own account's game from zero, each of those two for an account that holds the previous-save privilege (D-400), asking for a confirmation message to its own account's address or destroying that browser's session. `GET /api/account`, `GET /api/saved-game`, `PUT /api/saved-game`, `GET /api/previous-saved-game`, `POST /api/saved-game-reset`, `POST /api/email-confirmation-message` and `POST /api/logout` without a valid session return JSON 401, while an account identifier or email address supplied in a request grants no authority, the address in a request for a password-reset link naming only the account to whose own confirmed address a link may go, and no field of a request for the saved game state, for the previous save or for the reset names an account. Credential success regenerates and persists the session before success is returned, logout awaits destruction, and account responses are not cacheable and expose no password hash, session identifier, link token, secret, database error or stack.

A valid server-side session of an account with the owner role (D-410) alone also authorizes reading the list of accounts, `GET /api/owner/accounts`, and blocking, unblocking, granting the previous-save privilege to and revoking it from another account, `POST /api/owner/block`, `POST /api/owner/unblock`, `POST /api/owner/grant-previous-save` and `POST /api/owner/revoke-previous-save`, the role being read from the database at each request and never from the session, and the address in the body of those four routes naming the target and granting no authority. Each of those five routes returns JSON 401 with the code `unauthenticated` without a valid session and JSON 403 with the code `owner-forbidden` to a valid session of an account without the owner role, checked after the session and before any field of the body is read, with no field of the body read and nothing changed. Each of the five routes answers JSON 503 where accounts are not configured and otherwise first meets the transport check of D-110, and the four `POST` routes then meet the origin and body guards of D-104, so a request that fails one of them is refused as that decision gives, whatever its session.

A visitor, with or without a session, may also report an error that no code of the page handled, with `POST /api/browser-failure`, subject to the transport, origin and input guards and to the limit on reports of D-356: the route needs no session, the session of the request gives it only the `accountId` of the line it writes and authorizes nothing else, and no field of the body names an account.

- **Scope:** account-server, browser-view

### D-110 — Which proxy information identifies an account request?

In the private Cloudflare Tunnel topology of D-10, account requests require exactly one X-Forwarded-Proto value of https and one syntactically valid CF-Connecting-IP, normalized for equivalent IP representations and used directly for admission limits; Express trusts only the immediate hop for protocol. Duplicate, list or malformed values are refused, and X-Forwarded-For, X-Real-IP, Forwarded and forwarded host values never select account authority, limiter identity or expected origin. Explicit local loopback-proxy mode trusts only a loopback peer, requires forwarded https and uses the actual peer as identity, while direct mode trusts no forwarding and anonymous static and health requests require no proxy metadata.

- **Scope:** account-server, deployment

### D-111 — When is account configuration sufficient to start the server?

Production requires valid `LOOP2_DATABASE_PATH`, `LOOP2_SESSION_SECRET_FILE`, `LOOP2_PUBLIC_ORIGIN`, `LOOP2_PROXY_MODE`, `LOOP2_MAIL_FROM`, `LOOP2_SMTP_HOST`, `LOOP2_SMTP_PORT`, `LOOP2_SMTP_USER` and `LOOP2_SMTP_PASSWORD_FILE`, and every partial or invalid explicit configuration refuses before listening; wholly unconfigured non-production may serve public files with JSON 503 from known account routes, without anonymous gameplay or generated-secret, in-memory-database or MemoryStore fallback. The configured origin is HTTPS without credentials, non-root path, query or fragment; the signing file is at most 16 KiB of UTF-8 JSON containing a nonempty array of distinct base64url strings, each encoding exactly 32 random bytes with the newest first; the sender is one address of printable ASCII with exactly one `@` and no whitespace or address delimiter, the SMTP host at most 253 characters of labels of ASCII letters, digits and hyphens joined by dots, the port a decimal integer from 1 to 65535, the login text of at most 254 characters without whitespace or control character, and the password file a regular file of at most 1 KiB of UTF-8 that decodes to a password with no control character that is nonempty once every U+FEFF is taken out, so an empty file, a file of byte-order marks and nothing else and a trailing newline are refused while a byte-order mark followed by other characters is accepted with the mark dropped by the decoder, read once; unreadable or invalid settings report their setting or path rather than contents, and startup does not contact the mail service. After configuration and required resources validate, a start with neither listen variable set retains `127.0.0.1:3000` and the existing occupied-address error, and startup failure or shutdown disposes opened resources.

- **Scope:** account-server, deployment, build-tools

### D-112 — How does the account database open and preserve its schema?

The account server opens one application-owned SQLite connection before readiness, and the operator's blocking command of D-137, its command for the previous-save privilege of D-400, its command for the role of an account of D-410 and the backup command of D-231 each open one short-lived connection beside it under the same rules; opening reads the schema version and, in the same transaction, applies in order every migration step after it up to the current version 6 — one step per version, a step never edited once deployed, a later version adding one step at the end — so it initializes a new database, moves an existing older known version forward keeping every account, session, emailed link and saved game state and their values, and refuses an unknown newer schema without changing it. Accounts have an opaque random primary identifier, uniquely normalized email, encoded password hash, creation time, blocked state, the time their email address was confirmed, unset until it is, the previous-save privilege, off until the operator grants it, and the role, `player` or `owner`, which the step to version 6 adds to the accounts of the database with the value `player` for every account it holds and which a new account has as `player` (D-410); sessions have their identifier, account foreign key, serialized library data and absolute expiry with account and expiry indexes; emailed links have the SHA-256 digest of their token as key, an account foreign key that removes them with their account, a purpose of email confirmation or password reset, creation and expiry times and a mark that they no longer work, with account and creation-time indexes; saved game states have their account's identifier as key and as a foreign key that removes them with their account, the version of their shape, their revision and the game's text of at most 65 536 bytes, and the previous saves of D-399 are kept in a table of the same fields, one row for each account; foreign keys, parameterized statements, WAL, full synchronization and a bounded busy timeout apply, and no transaction spans asynchronous hashing, mail sending or an HTTP response. Expired sessions are rejected on reads and pruned at startup and periodically with a disposed lifecycle timer, together with emailed links both expired and older than one hour, pruned in bounded batches, while touch updates existing unexpired rows only, preserves the later expiry and never recreates a removed session; blocking an account sets its state, deletes its sessions and marks all its emailed links as no longer working in one transaction, a session write for a blocked account stores nothing, and recording an emailed link reads its account's blocked state in the transaction that writes it, writes nothing for a blocked account, and in the same transaction marks every earlier link of the same account and purpose as no longer working; setting a password by a password-reset link is one transaction that reads whether the link still works, its account's blocked state included, and either changes nothing or replaces the account's password hash, deletes its sessions and marks all its password-reset links as no longer working, and a session write that names a password hash stores nothing once the account holds another; writing a saved game state reads its account's blocked state, its stored version and its stored revision in the transaction that writes it and writes nothing when the account is blocked or D-209 or D-210 refuses the save, and, when the save passes and the stored saved game state is of a lower version, moves the stored one into the previous save in that same transaction, replacing the one it held (D-210); the reset of the game reads the account's blocked state, its privilege and its saved game state in the transaction that moves the saved game state into the previous save and removes it from its table, and changes nothing when the account is blocked, lacks the privilege or holds no saved game state (D-402); granting and revoking the privilege is one write by the account's address, which reports whether the account was changed, already was so or does not exist (D-400); giving and taking the role is one write by the account's address, which reports the same three outcomes and ends no session and stops no link (D-410); the block of the owner panel reads the account's role in the transaction that marks the account, and changes nothing for an account with the owner role (D-137); and blocking keeps the account's saved game state and its previous save. The version is read, and an unknown newer schema refused, before the journal mode of the file changes, so that the refused file stays as it was; the version is read again in the transaction that sets up or moves the database, so that two processes cannot both do it.

The command that the restore procedure of D-360 gives for reading the addresses of accounts opens one short-lived connection beside the server's as well, only to read, and changes neither the schema nor any data.

Beyond the rules above, no command that the owner runs on the server and that changes or copies the account database sets up a new database, the blocking command of D-137, the backup command of D-231, the command for the previous-save privilege of D-400 and the command for the role of an account of D-410 among them, and a command added later as well: each opens only a file in which the server has set up its tables, refuses a file that is empty, is no SQLite database or is a SQLite database with no schema version with the exit code 3 of a missing file and a sentence that names that case, and writes nothing in it. Two openings are not bound by this: the command of the restore procedure of D-360 that only reads the addresses of accounts, and the check of the database at the build of the image, which sets up a temporary database of its own.

- **Scope:** account-server, deployment

### D-137 — How is a player account blocked and unblocked?

The operator blocks and unblocks a player account, named by its email address normalized as at login, with a command run in the `loop2` container, which reports that the account was blocked or unblocked, that it was already in the state asked for, or that no account has that address, and which changes nothing when it refuses. Blocking marks the account blocked, deletes every session of the account and stops every emailed link of the account in one transaction; unblocking clears the account's blocked mark and restores no session and no link. The `loop2-deploy` skill describes the command, and only a human runs it on the server.

An account with the owner role (D-410) also blocks and unblocks a player account, named by its email address in the body of `POST /api/owner/block` or `POST /api/owner/unblock` of the owner panel, which the server answers only to a valid session of such an account, with the same effects in the same one transaction and the answers `blocked`, `already-blocked`, `unblocked` or `not-blocked`, JSON 404 with the code `unknown-account` where no account has that address, and which changes nothing when it refuses. The panel never blocks an account that has the owner role, the caller's own included: the transaction of the block reads the role and the server answers JSON 409 with the code `owner-not-blockable`, also where a second connection gave the role just before the block, and the command stays beside the panel as the emergency way, for a panel that does not work and for an account with the owner role that is to be blocked. The address in the body of the four routes of the panel is normalized as at login, and an address written as no address is the address of no account.

- **Scope:** account-server, deployment, agent-workflow

### D-138 — How is a player's login kept between requests?

The browser holds an opaque, random session identifier in a host-scoped, Secure and HttpOnly cookie. The account server keeps the session record in SQLite, checks it on authenticated requests and can invalidate it on logout, on account blocking or at a password reset, which deletes every session of the account in the same operation as the change of password and signs nobody in, so the player signs in with the new password on the form.

- **Scope:** account-server, browser-view

### D-139 — What does the login of a blocked account tell the player?

A login of a blocked account with the correct password is refused with „To konto jest zablokowane.”, status 403 and the code `account-blocked`, and no session, while a wrong password of a blocked account gets the login message of D-100. That refusal is neither a failed nor a successful login for the attempt limits of D-102: it adds no failure and clears none, and an address locked by failures refuses it as it refuses every login.

- **Scope:** account-server, browser-view

### D-160 — What does an emailed link of a blocked account do?

An emailed link of a blocked account, of an email confirmation or of a password-reset message, changes nothing and leaves the account as it is, and a player who opens such a confirmation link, or sends the form of such a password-reset link, sees „Odnośnik jest nieważny albo wygasł.” in `warning` above the account forms or above the game, as D-156 and D-225 give. A link that a block stopped stays stopped after the account is unblocked, and the player, signed in again, asks for a new confirmation message with „Wyślij ponownie”.

- **Scope:** account-server, browser-view

### D-202 — Who can create and use a player account?

Anyone can create a player account and start playing without approval. A signed-in player can read and change only their own saved game state. The operator can block an account from signing in and using the game.

A new account has the role `player` (D-410), and no registration and no request gives an account the owner role; an account with the owner role can also block an account from signing in and using the game, from the owner panel (D-137).

- **Scope:** account-server, browser-view

### D-410 — What is the role of an account, who gives it and where does the server read it?

Every account has a role, `player` or `owner`, stored with the account in the account database; a new account has the role `player`, and an account of either role signs in on the same card, plays and keeps its own saved game state. The role `owner` is given and taken by the command `account-role`, run in the `loop2` container and naming the account by its email address normalized as at login, which reports that the account was made an owner or made a player, that it already was so, or that no account has that address, which changes nothing when it refuses and ends no session and stops no link, and which only a human runs on the server (D-12). The server reads the role of an account from the database at each request that depends on it and never from the session, so a role given or taken holds from the next request, and no registration, no request and no field of a request gives an account a role.

The answers that carry the account — `GET /api/account`, the login and the registration — hold `"role":"owner"` for an account with the owner role and no field `role` for an account with the role `player`.

- **Scope:** account-server, browser-view, deployment, agent-workflow

### D-430 — What do the commands that the owner runs on the server say when they cannot open or change the account database?

When a command that the owner runs on the server and that changes or copies the account database cannot open or change it for a reason other than a file in which the server has set up no tables, which the command refuses with the exit code 3 (D-112), it ends with the exit code 1 and one sentence that says that nothing changed or that no backup was made. The sentence advises to run the command again only where the database stayed busy longer than the bounded busy timeout of D-112 allowed, since only then does a second run help; for any other failure of the database, such as a newer schema or a damaged file, it gives no such advice. The two openings that D-112 leaves out, the command of the restore procedure of D-360 that only reads the addresses of accounts and the check of the database at the build of the image, are left out here too.

- **Scope:** account-server

### D-400 — What is the previous-save privilege and who gives it?

The previous-save privilege is a flag on the player account, off when the account is created, which the operator grants and revokes, naming the account by its email address normalized as at login, with the command `account-previous-save` run in the `loop2` container as D-137 gives for the block — the command reports that the privilege was granted or revoked, that the account already was in the state asked for, or that no account has that address, and changes nothing when it refuses — and only a human runs it on the server. One flag covers pulling the programs of the previous save (D-401) and the reset (D-402), and the server reads it in the request: `GET /api/previous-saved-game` and `POST /api/saved-game-reset` answer JSON 403 with the code `previous-save-forbidden` to a signed-in account without it, whatever its previous save holds. The answers that carry the account — `GET /api/account`, the login and the registration — hold the flag as the boolean `previousSaveAllowed` and nothing of the previous save, so the page shows no control for the privilege and sends no request for the previous save or the reset where the flag is false.

An account with the owner role (D-410) also grants and revokes the privilege of any account, an account with the owner role included, from the owner panel, by `POST /api/owner/grant-previous-save` and `POST /api/owner/revoke-previous-save` with the account's email address in the body, which the server answers only to a valid session of such an account, with the answers `granted`, `already-granted`, `revoked` or `not-granted` and JSON 404 with the code `unknown-account` where no account has that address, and which change nothing when they refuse; a grant or a revoke through the panel, like through the command, ends no session and stops no link, and the command stays beside the panel. The address in the body of those routes is normalized as at login, and an address written as no address is the address of no account.

- **Scope:** account-server, browser-view, deployment, agent-workflow

## Listed by heading alone

- D-01 — What runs the account and save server?
- D-02 — How does the account and save server handle HTTP requests?
- D-05 — What serves the built game and account requests in the container?
- D-06 — How are the browser and server built together?
- D-07 — How is the work of the game split between the server and the browser?
- D-229 — How does the account and save server access SQLite?
- D-237 — How is a Node.js release checked before it is deployed?
- D-266 — Where does the output of the browser's compilation stand?
- D-28 — Which coding-guideline discipline does loop2 adopt?
- D-29 — Which rules check TypeScript and JavaScript?
- D-30 — Which Python rules block a change?
- D-31 — Which Bash rules block a change?
- D-32 — How is web code formatted?
- D-37 — Which file is the exemplar for the HTTP application?
- D-113 — Which file is the exemplar for password hashing?
- D-115 — Which file is the exemplar for the session Store?
- D-116 — Which file is the exemplar for account policy?
- D-213 — Which file is the exemplar for saved-game code?
- D-351 — How does loop2 keep the imports of its parts within the dependencies its part map allows?
- D-362 — How does loop2 point to places outside the repository that its readers cannot reach?
- D-412 — What looks for secrets in loop2's repository?
- D-73 — Which testing discipline does loop2 adopt?
- D-74 — When are tests on generated inputs considered?
- D-75 — When are complete player journeys tested in a real browser?
- D-76 — When do fonts and the preview server gain refusal tests?
- D-77 — How are tests selected and limited as a whole?
- D-78 — How is one test case shaped?
- D-79 — How is the npm registry response contract checked?
- D-81 — At which levels do loop2 tests stand?
- D-82 — Which product documents supply test expectations?
- D-83 — Where are tests written and how do they enter the gate?
- D-84 — Which real mechanisms do new or changed tests exercise?
- D-85 — Which cases are the exemplars of the test levels?
- D-87 — When are whole-screen pixel comparisons used?
- D-88 — How are real browser events, focus and SVG checked?
- D-89 — Who revisits a deliberate testing exclusion?
- D-422 — How is the guard that keeps a failed renewal from destroying an answer that has ended tested?
- D-432 — Where does the knowledge of a test that fails at random with no cause found stand?
- D-49 — Which port does a loop2 test give the server it starts?
- D-255 — Where does the data an agent checks the game on come from?
- D-256 — Does the local start keep an account between its starts?
- D-257 — Where does account mail go at the local start?
- D-258 — What does the game present to a browser at the local start?
- D-268 — What keeps a test on a document imitation from taking the machine's memory?
- D-413 — How does CI check a pull request into `main`?
- D-414 — What does a Claude Code session of loop2 show at its start where `.the-way` is not at the commit the repository pins?
- D-417 — How does an agent operate the game as a player does?
- D-418 — Where do the screenshots that a task cycle of loop2 shows the human lie, and how does the description of its request embed them?
- D-419 — Who puts a screenshot into the repository for screenshots?
- D-420 — From which session may an agent use Playwright MCP?
- D-431 — What does the local start do when another program takes the port of its server?
- D-12 — What access to the server does an agent have?
- D-13 — Where do the server's access values and secrets live?
- D-15 — How is loop2 recovered when a deployment goes wrong?
- D-347 — How does an agent learn what went wrong in the game running in the browser?
- D-353 — Which refusals of the account server are an expected course and leave no failure line?
- D-355 — Where does the log of the running game on the server lie, how long does it live and how does an agent read it?
- D-356 — How does the operator learn that the running game failed?
- D-96 — What does a player see before and after signing in?
- D-97 — What does the player's logout do?
- D-98 — Which player passwords are accepted?
- D-99 — How are player email addresses compared and checked?
- D-100 — What do duplicate registration and failed login tell the player?
- D-105 — How is sending account email limited?
- D-152 — How does a player sign in and reset a forgotten password?
- D-153 — Which service delivers account emails?
- D-154 — How does the account server send email through Outsider?
- D-155 — How long and how often does an emailed link work?
- D-156 — How does an emailed link confirm a player's email address?
- D-157 — What does a signed-in player see of an unconfirmed address, and who may ask for another confirmation message?
- D-158 — From whom does the email confirmation message come, and what does it say?
- D-159 — Can an account's email address change?
- D-161 — How does the account server count account messages against the limits of D-105?
- D-162 — Which file is the exemplar for mail sending?
- D-163 — How is the code that talks to Mikrus Outsider's SMTP service tested?
- D-222 — What does a request for a password-reset link answer?
- D-223 — Does a request for a password-reset link have a limit of its own per client address?
- D-224 — What form does a password-reset link take?
- D-225 — What does the form „Ustaw nowe hasło” hold, and how does it end?
- D-226 — How does the route that sets a password by a link check its request and bound its password work?
- D-227 — Which messages does a password reset send, and what do they say?
- D-204 — How does the browser exchange saved game states with the server?
- D-205 — Where are player accounts and saved game states stored?
- D-209 — Which browser's save of the game state does the server accept?
- D-210 — What does the server do with a save of the game state whose version differs from the one it holds?
- D-399 — Which saved game state does the server keep beside the current one?
- D-402 — How does an account with the privilege start the game from zero?
- D-411 — What does the screen of the list of accounts show, and how does it run the four operations?
- D-38 — Which styleguide discipline does loop2 adopt for the browser view?
- D-396 — In which browsers and from which window size does the game have to work?
