# Report — executor of slice 11 (transport, startup, database and server-save decisions)

**Status:** done with concerns — the concerns are the choices 1 and 2 below (what counts as holding a sentence and how R1 reads a referenced value), the two files of the *Change* that got no line, and the pairs listed for the human.

## Commits (base `cc91ac0383ee839c31d7151bb147837117b70791`)

- `0ab0080d` test: lines `decision:` in the server tests (`tests/transport.test.mjs`, `tests/startup.test.mjs`, `tests/account-storage.test.mjs`, `tests/account-backup.test.mjs`, `tests/http.test.mjs`, `tests/deploy/test_account_storage.py`)
- `542d1701` test: lines `decision:` in the page and client tests (`tests/view/game-saver.test.mjs`, `tests/view/account-screen.test.mjs`, `tests/view/previous-save.test.mjs`, `tests/account-api.test.mjs`)
- `104dd9d6` test: two lines of D-400 in `tests/http.test.mjs`
- `93a65534` docs: the *Verification* fields of the twelve decisions in `foundations/decisions.md`
- `e5f15269` test: lines of D-402 in `tests/view/program-list.test.mjs`

Author address of the commits: `mariusznn@gmail.com` (`git log -1 --format=%ae`), the same as the branch's earlier commits.

## Files changed (`git diff --stat cc91ac03..HEAD`)

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 82 | 38 |
| `tests/account-storage.test.mjs` | 49 | 0 |
| `tests/http.test.mjs` | 31 | 0 |
| `tests/view/previous-save.test.mjs` | 14 | 0 |
| `tests/startup.test.mjs` | 11 | 0 |
| `tests/transport.test.mjs` | 10 | 0 |
| `tests/view/game-saver.test.mjs` | 4 | 0 |
| `tests/view/program-list.test.mjs` | 4 | 0 |
| `tests/account-api.test.mjs` | 3 | 0 |
| `tests/view/account-screen.test.mjs` | 3 | 0 |
| `tests/account-backup.test.mjs` | 1 | 0 |
| `tests/deploy/test_account_storage.py` | 1 | 0 |

In total 12 files, 213 insertions, 38 deletions. No test's code, name or assertion changed; every change in a test file is an added comment line `decision:` at the start of a case's body, after the lines `invariant:` and `decision:` already there, as the earlier slices placed them.

Files beyond the slice's *Change* (item 5 of "Work of every slice"), one line each:
- `tests/http.test.mjs` — the HTTP cases of the save, previous-save and reset routes, the cookie, registration, the limit by client address and the unconfigured server (part account-server).
- `tests/account-backup.test.mjs` — a backup beside a separate writer, for D-112 (account-server).
- `tests/deploy/test_account_storage.py` — accounts outliving the replacement of the container, for D-205 (deployment).
- `tests/account-api.test.mjs` — the browser's client of the save and reset routes (browser-view).
- `tests/view/game-saver.test.mjs`, `tests/view/account-screen.test.mjs`, `tests/view/previous-save.test.mjs`, `tests/view/program-list.test.mjs` — the page's side of D-202, D-209, D-210, D-400 and D-402 (browser-view).

## Checks

All from the worktree's root, after the last commit `e5f15269` unless noted.

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (base, before any edit) | 0 | `0 errors`; 11 decisions `held by nothing`, none of the twelve |
| `python -B .the-way/elements/common/foundation_check.py` (after `93a65534` and again after `e5f15269`) | 0 | `0 errors`; 11 decisions `held by nothing` (D-181, D-182, D-184, D-185, D-186, D-188, D-215, D-216, D-217, D-218, D-220 — other slices'), none of the twelve |
| `npm test -- tests/transport.test.mjs` | 0 | 12 tests, 12 pass |
| `npm test -- tests/startup.test.mjs` | 0 | 18 tests, 18 pass |
| `npm test -- tests/account-storage.test.mjs` | 0 | 82 tests, 82 pass |
| `npm test -- tests/account-backup.test.mjs` | 0 | 10 tests, 10 pass |
| `npm test -- tests/http.test.mjs` | 0 | 95 tests, 95 pass |
| `npm test -- tests/account-api.test.mjs` | 0 | 32 tests, 32 pass |
| `npm test -- tests/view/game-saver.test.mjs` | 0 | 20 tests, 20 pass |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 131 tests, 131 pass |
| `npm test -- tests/view/previous-save.test.mjs` | 0 | 44 tests, 44 pass |
| `npm test -- tests/view/program-list.test.mjs` | 0 | 23 tests, 23 pass |
| `npm test -- tests/invariants/test_account_server_default_address.py` | 0 | 1 test, OK |
| `npm test -- tests/invariants/test_account_save_sqlite_upgrade.py` | 0 | 2 tests, OK |
| `npm test -- tests/deploy/test_account_storage.py` | 0 | 1 test, OK in 13.9 s — it ran with Docker, not skipped |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` on the nine changed `.mjs` files of `0ab0080d`…`104dd9d6`, then on `tests/view/program-list.test.mjs` | 0, 0 | all use Prettier code style |
| `git diff -U0 cc91ac03 -- foundations/decisions.md`, read | — | twelve hunks, each starting at and staying within the *Verification* field of D-104, D-110, D-111, D-112, D-202, D-204, D-205, D-209, D-210, D-399, D-400 or D-402 |

The runs of `tests/transport.test.mjs` … `tests/deploy/test_account_storage.py` ran on the commit `93a65534`; `tests/view/program-list.test.mjs` was changed after (`e5f15269`, comments only) and was run on its own then. Each quotation was checked by a script before it was written: it starts at the start of a sentence of its decision's binding sentences, holds at least three words and no `"` (0 problems for every line).

Not run: the full gate `npm test` (the cycle's run; WAY-160). `test_ruff_source_rules` and `test_shellcheck_source_rules` of `tests/quality/test_quality_invariants.py` fail at the base with `FileNotFoundError`, as the handoff says; I did not run that file (no Python file of the quality part changed).

## Table of the decisions (item 6)

Parts of sentences are named by the sentence's opening words (S1, S2, S3 in the order of the binding sentences). Each test is given as `path:line` of its name line after the slice.

### D-104 — request origin and body
- **S1** (SameSite, Origin, JSON body and its limits, storage limits), in part by tests: `tests/transport.test.mjs:419` "mutation guards reject foreign origins, non-JSON and malformed bodies" (Origin, media, charset, compression, 16 KiB); `tests/transport.test.mjs:774` "rolling static responses use the newest signing key…" and `tests/transport.test.mjs:826` "new opaque sessions persist in SQLite…" (SameSite=Strict); `tests/http.test.mjs:597` "logout destroys only this browser's session and clears the same host cookie" (SameSite on clearing); `tests/http.test.mjs:4304` "the stored text of a game is measured in bytes after re-serializing, at most 65 536…"; `tests/account-storage.test.mjs` "the stored game text holds at most 65 536 bytes…" and "the table of previous saves holds at most 65 536 bytes of text…" (stored limits).
- **S2** (refusals; Host and forwarded host never choose the origin), in whole with the invariant: `tests/transport.test.mjs:419`.
- **S3** (object of expected fields, explicit types, no form or cross-origin bypass), in part: `tests/transport.test.mjs:419`; `tests/http.test.mjs` "each malformed save body is a 400 that stores nothing…"; `tests/http.test.mjs` "a reset with any field is a 400 that moves nothing, and no request names an account".
- **Invariants:** account-mutation-request-guards — the refusals of Origin, media, compression, structure and size on every state-changing route before mutation or password work. Its marked tests (`tests/transport.test.mjs` "refused state-changing requests…", "refused requests to the save route…", "refused reset requests…", `tests/http.test.mjs` "the guards and the gate stand before the body of a report…") get no D-104 line (R1).
- **Held by nothing:** nothing.
- **Verification:** `tests:` added; no pair (none stood).

### D-110 — proxy information of an account request
- **S1** (exactly one forwarded https and one valid CF-Connecting-IP, normalized, used for limits; Express trusts the immediate hop), in part: `tests/transport.test.mjs` "canonical transport identity ignores caller-selected forwarding chains" (normalization); `tests/http.test.mjs` "one client address creates five accounts per rolling hour…" (the limit keys on the normalized address); `tests/http.test.mjs` "the guards and the gate stand before the body of a report…" (missing protocol or client address refused).
- **S2** (duplicate, list, malformed refused; forwarded chains and forwarded host select nothing), in part: `tests/transport.test.mjs` "mutation guards reject foreign origins…" (forwarded host never the expected origin); `tests/http.test.mjs` "one client address creates five accounts…" (a forwarding chain never the limiter identity).
- **S3** (loopback-proxy and direct modes; static and health need no metadata), in part: `tests/transport.test.mjs` "local proxy mode uses the peer and direct mode ignores forwarded HTTPS"; `tests/transport.test.mjs` "transport refuses ambiguous proxy metadata before loading live sessions" (static file served with any metadata); `tests/startup.test.mjs` "configured process becomes ready with public health response…" (start page with no metadata).
- **Invariants:** account-request-transport (refusal of missing, duplicate, list or malformed metadata before session or password work; the chain cannot replace the limiter identity), local-start-access (`npm run local`).
- **Held by nothing:** Express trusting only the immediate hop; loopback-proxy mode trusting only a loopback peer and requiring forwarded https; the deployed tunnel route itself (the old pair).
- **Verification:** `tests:` added; pair **rewritten** (see the list below).

### D-111 — configuration sufficient to start
- **S1** (production requires all settings; partial or invalid refuse; unconfigured non-production serves JSON 503 without fallbacks), in part: `tests/http.test.mjs:204` "unconfigured accounts answer the canonical account routes as unavailable JSON".
- **S2** (the form of each setting; reports name the setting, not contents; no mail contact at startup), in part: `tests/startup.test.mjs` "production missing settings and partial or invalid explicit configuration refuse readiness", "secret files reject noncanonical keys…", "each mail setting that is invalid refuses readiness…", "the SMTP password file must be…", "a full valid set of settings starts… without contacting the mail server", "configured startup refuses unknown schema and unavailable database before readiness", "a start that fails names the setting and the original error's kind and code…".
- **S3** (default address; disposal at failure and shutdown), in part: `tests/startup.test.mjs` "configured runtime has a real database and dummy hash and releases its connection", "configured process becomes ready with public health response and exits on shutdown".
- **Invariants:** account-startup-configuration (refusal before listening of production without settings and of partial or invalid settings); account-server-default-address (S3's default address and occupied-address error). `tests/invariants/test_account_server_default_address.py` tests that invariant only, so it gets no line (R1).
- **Held by nothing:** disposal of opened resources when a start fails; the password file read once; the unconfigured mode making no signing key, in-memory database or MemoryStore.
- **Verification:** `tests:` added; pair **added**.

### D-112 — the account database and its schema
- **S1** (one connection; the operators' commands and backup beside it; migration steps; unknown newer schema refused), in part: `tests/account-storage.test.mjs` "the owner's command blocks and unblocks by address beside an open connection…", "the previous-save command grants and revokes by address beside an open connection…"; `tests/account-backup.test.mjs` "a backup made beside a separate writer finishes…"; `tests/startup.test.mjs` "a start that fails names the setting…" (unknown schema refuses the start).
- **S2** (columns, keys, WAL, busy timeout; no transaction across async work), in part: `tests/account-storage.test.mjs` "an account insertion returns an opaque identity…", "two connections cannot insert the same normalized email…", "the stored game text holds at most 65 536 bytes…", "a saved game state goes with its account…", "the table of previous saves holds at most 65 536 bytes…", "set rejects unknown accounts…", "busy writes fail within a bound…", "opening a new database waits within the busy timeout…", "opening a new database fails within the busy timeout…".
- **S3** (pruning; blocking; links; password reset; save writes; the move; the reset; the privilege write; blocking keeps saves), in part: `tests/account-storage.test.mjs` "a save is stored only on the revision it names…", "a block committed through another connection before a save…", "a save of a higher version moves the stored save…", "a save refused as blocked, outdated or conflicting moves nothing…", "a save whose write fails after its move…", "a reset of a privileged, unblocked account…", "a reset replaces the previous save…", "a reset moves nothing without the privilege…", "blocking, unblocking, granting and revoking the privilege leave the previous save…", "the privilege write answers granted…", "issuing a confirmation link stops the account's earlier one at once…", "a block committed through another connection stops every link issued before it…", "cleanup removes, in bounded batches…", "blocking deletes every session of that account…", "startup and bounded periodic cleanup remove expired rows…", "the owner's command stops every emailed link of the account it blocks…"; `tests/http.test.mjs` "a block committed between the session check and the write stores nothing…", "a block committed between the session check and the reset moves nothing…".
- **Invariants:** account-schema-lifecycle, account-database-schema (schema initialization, moves and refusal), account-session-storage (session reads, blocked and password-hash guards, renewal), password-reset-link, password-reset-ends-sessions. Their marked tests get no D-112 line (R1).
- **Held by nothing:** one step per version, a deployed step never edited, a later version adding a step at the end; the indexes; full synchronization; no transaction spanning hashing, mail sending or an HTTP response.
- **Verification:** `tests:` added; pair **rewritten** — the old pair spoke of the session write naming a password hash and of the reset in one transaction, which account-session-storage, password-reset-link and password-reset-ends-sessions now hold.

### D-202 — who can create and use an account
- **S1** "Anyone can create…", in part (with the review invariant): `tests/http.test.mjs` "registration stores an Argon2id hash… and signs this browser in at once", "registration answers 201 with its message's outcome in every case and the player stays signed in"; `tests/view/account-screen.test.mjs` "a created account enters the game at once…".
- **S2** — held by player-save-isolation; its marked tests get no line (R1).
- **S3** "The operator can block…", in part: `tests/account-storage.test.mjs` "a block committed through another connection before a save makes it store nothing…", "the owner's command blocks and unblocks by address…"; the rest by blocked-account-access (its marked tests get no line).
- **Held by nothing:** nothing.
- **Verification:** `tests:` added; no pair.

### D-204 — the exchange of saved game states
- **S1** (HTTPS, JSON, `fetch()`): held by saved-state-http-exchange except HTTPS.
- **S2** (`GET` answers the state with version and revision or none; `PUT` with version, basis and game): `tests/http.test.mjs` "each account's session reads and replaces only its own saved game state", "the save routes answer null with no save, count revisions from 1…"; `tests/account-api.test.mjs` "loadSavedGame sends a bodiless GET… and the save call a JSON PUT of exactly version, basedOn and game", "loadSavedGame gives the save exactly as received, or null for an account with none".
- **Held by nothing:** the public endpoint being HTTPS.
- **Verification:** `tests:` added; pair **rewritten** (its half on the answer for no saved game state went, the tests hold it).

### D-205 — where accounts and saves are stored
- **S1**, in part: `tests/account-storage.test.mjs` "an account insertion returns an opaque identity and persists across reopen"; `tests/deploy/test_account_storage.py` `test_replaced_container_keeps_accounts_and_sessions`. The rest by account-save-sqlite-store (its four marked tests get no D-205 line) and account-save-durable-storage (review).
- **Held by nothing:** nothing.
- **Verification:** `tests:` added; no pair.

### D-209 — which browser's save the server accepts
- **S1** (revisions from 1; basis; every other refused): `tests/account-storage.test.mjs` "a save is stored only on the revision it names…", "a save of a higher version moves…", "a save refused as blocked, outdated or conflicting…", "a reset replaces the previous save…"; `tests/http.test.mjs` "each account's session reads and replaces only its own saved game state", "the save routes answer null…", "each malformed save body is a 400…", "the stored text of a game is measured in bytes…", "a privileged account reads null…", "the reset moves the save to the previous slot…"; `tests/transport.test.mjs` "refused requests to the save route change no saved game state…".
- **S2** (the browser drops, loads, shows the sentence until a save succeeds, plays on): `tests/view/game-saver.test.mjs` "a save that succeeds keeps its revision… and takes away the sentence that stood from a conflict", "a conflict and a missing session go to the page's callback, and the saver sends nothing more"; `tests/view/account-screen.test.mjs` "a conflict drops the game, asks for the server's save and builds from it…".
- **Held by nothing:** the sentence's role `warning` (the tests read its text, not its role).
- **Verification:** `tests:` added; pair **rewritten**.

### D-210 — a save of another version
- **S1** (lower version refused before the basis, reading nothing of the game), in part: `tests/account-storage.test.mjs` "a save is stored only on the revision it names…", "a save refused as blocked, outdated or conflicting…"; `tests/http.test.mjs` "the save routes answer null… refuse an outdated version before a stale basis…".
- **S2** (the tab shows the sentence and saves nothing more, the game staying), in part: `tests/view/game-saver.test.mjs` "a save refused as outdated shows its sentence…", "a saver stopped as outdated reports so before logout without sending anything"; `tests/view/account-screen.test.mjs` "a tab that stopped saving as outdated logs out without a save…".
- **S3** (the move at a higher version): previous-save-slot; its marked tests get no D-210 line.
- **Held by nothing:** the server reading nothing of the game; the role `warning`.
- **Verification:** `tests:` added; pair **rewritten**.

### D-399 — the previous save
- **S1** (every account, one, a later move replacing): `tests/account-storage.test.mjs` "a save of a higher version moves the stored save into the previous slot, a second move replaces it…", "a reset replaces the previous save the earlier moves left…", "the move, the reset and the privilege write touch only the account they name…" (an account without the privilege keeps one); `tests/http.test.mjs` "a privileged account reads null, then the document of its slot…".
- **S2** (same form; limit; removed only with its account): `tests/account-storage.test.mjs` "a save of a higher version moves…", "blocking, unblocking, granting and revoking the privilege leave the previous save as it is", "the table of previous saves holds at most 65 536 bytes…"; `tests/http.test.mjs` "a privileged account reads null…".
- **S3** (no other act writes it; the load never reads it), in part: `tests/account-storage.test.mjs` "blocking, unblocking, granting and revoking…"; the rest by previous-save-slot.
- **Held by nothing:** the load of the game never reading the previous save; the server computing nothing of it; a load writing nothing.
- **Verification:** `tests:` added; pair **rewritten**.

### D-400 — the previous-save privilege
- **S1** (flag off at creation; the command, its outcomes, nothing changed on refusal; only a human runs it): in part, `tests/account-storage.test.mjs` "the privilege write answers granted, already granted…", "the previous-save command grants and revokes by address beside an open connection…", "the previous-save command changes nothing on a usage error…".
- **S2** (one flag; read in the request; JSON 403 `previous-save-forbidden`; no HTTP route grants it): in part, `tests/http.test.mjs` "an account without the previous-save privilege gets 403 on both routes…", "a privileged account reads null…".
- **S3** (the account's answers carry the flag and nothing of the previous save; the page shows no control and sends no request without it): `tests/http.test.mjs` "a stored session alone selects the account…", "registration stores an Argon2id hash…", "a privileged account reads null…"; `tests/view/previous-save.test.mjs` "an account without the flag, or with it false, never asks and has no button…", "the page gives the game the account's flag…", "the reset control stands only for a privileged account…", "the page gives the reset control to a privileged account alone…".
- **Invariants:** previous-save-slot, account-client-outcomes.
- **Held by nothing:** only a human running the command on the server; no HTTP route granting or revoking the privilege.
- **Verification:** `tests:` added; pair **rewritten**.

### D-402 — the reset
- **S1** (the control, its confirmation, the click that opens it, no control without the privilege), in part: `tests/view/previous-save.test.mjs` "the reset control stands only for a privileged account…", "the click that opens the confirmation sends nothing and changes nothing", "the confirmation names the replacement of an earlier previous save…", "the page gives the reset control to a privileged account alone…"; `tests/view/program-list.test.mjs` "without a reset state the list has no reset control…", "at rest the reset is an enabled destructive button… a press only asks for the confirmation", "opened, the confirmation names what the reset does…".
- **S2** (no save of its own, the request, held outcomes, disabled control and „Wyloguj”; the server's transaction and 204): `tests/view/previous-save.test.mjs` "a confirmed reset calls the page once…", "a confirmed reset is the next call after the confirmation…", both cases of "… of the old saver during the reset waits, and a failed reset acts on it" and "… is dropped when the reset succeeds", "a conflict that the old saver gets after the reset is not acted on"; `tests/view/program-list.test.mjs` "while the reset waits the control is disabled…"; `tests/account-api.test.mjs` "loadPreviousSavedGame sends a bodiless GET… and resetSavedGame a JSON POST…"; `tests/account-storage.test.mjs` "a reset moves nothing without the privilege, for a blocked account, and with no current save"; `tests/http.test.mjs` "a block committed between the session check and the reset moves nothing…", "the reset moves the save to the previous slot and answers 204…".
- **S3** (on 204 a new game on revision 0 with the sentence and no save; a later save on another revision refused): `tests/view/previous-save.test.mjs` "on 204 the page builds a new game on revision 0…"; `tests/http.test.mjs` "the reset moves the save to the previous slot and answers 204…".
- **Invariants:** previous-save-slot.
- **Held by nothing:** the confirmation saying that the programs of the previous save already there can no longer be pulled (the tests match "poprzedniego zapisu", "zastąp" and "zera" only).
- **Verification:** `tests:` added; pair **rewritten**.

## Pairs added or rewritten (for the human to accept at the merge)

Each pair stands after the clause `tests:` in the decision's *Verification*, introduced by "An agent compares a change with the part no invariant and no test holds:" (D-209: "…the part no test holds:"; D-204: "…the part no invariant and no test holds, the public HTTPS endpoint:").

- **D-110 (rewritten):**
  - complies: target acceptance checks actual cookie issuance and client-address handling through the tunnel, including provider transformations; Express trusting the forwarded protocol of the immediate hop alone; loopback-proxy mode refusing an account request from a peer other than loopback or without forwarded https
  - violates: treating synthetic header tests as proof of the deployed provider route; `trust proxy` set to trust every hop or more than one; loopback-proxy mode taking forwarded metadata from a peer other than loopback
- **D-111 (added):**
  - complies: a start that fails after its database opened closing that connection before the process exits; the password file read once at startup; wholly unconfigured non-production holding no account state of its own
  - violates: an unconfigured start that makes a signing key, opens an in-memory database or keeps sessions in a MemoryStore; the password file read again for each message
- **D-112 (rewritten):**
  - complies: a new schema version added as one migration step at the end of the list, the deployed steps unchanged; a password check, a message or an HTTP response between two short transactions
  - violates: an edit of a migration step a deployed version already ran; a transaction held open across password hashing, the sending of a message or an HTTP response; synchronization lowered below full; an index of the account or the expiry of sessions, or of the account or the creation time of emailed links, dropped
- **D-204 (rewritten; the half on the answer for no saved game state removed):**
  - complies: the browser loads the game and exchanges saved states through an HTTPS address
  - violates: a deployed game sends saved states to an HTTP address visible to the browser
- **D-209 (rewritten):**
  - complies: the sentence of a save refused for another browser's save standing on the header line in `warning`
  - violates: that sentence in `text`, `positive` or `danger`
- **D-210 (rewritten):**
  - complies: the server comparing the version field of the save with the stored version and reading nothing of the game; the sentence of the update on the header line in `warning`
  - violates: the server reading the version from inside the game; the sentence of the update in `text`, `positive` or `danger`
- **D-399 (rewritten):**
  - complies: the load of the game reading the saved game state of `GET /api/saved-game` alone; the server copying the stored text into the previous save without reading the game
  - violates: the load of the game reading the previous save or falling back to it; a previous save written by a load; the server parsing the game of the previous save
- **D-400 (rewritten):**
  - complies: the owner runs `docker exec loop2 node dist/server/account-previous-save.js grant <email>` on the server by hand
  - violates: an HTTP route of the account server that grants or revokes the privilege; a skill instruction in which an agent runs the command through the `mikrus` MCP server
- **D-402 (rewritten):**
  - complies: the confirmation saying that the programs of a previous save already there can no longer be pulled
  - violates: a confirmation that names the replacement of the previous save but not the loss of its programs

D-104, D-202 and D-205 carry no pair (held in whole, none stood before).

## Choices, with the way rejected

1. **An assertion of a test's own body counts, a helper's side check does not.** A case holds a sentence where its body asserts what the sentence states, also where the case's subject is another decision (so the revisions asserted by save tests carry a line of D-209 S1). The checks a shared helper makes on the way — the cookie attributes `issuedSession` of `tests/http.test.mjs` asserts for every registration and login — are not counted for their callers; only cases whose body asserts SameSite carry D-104's line. Rejected: marking every caller of the helper (dozens of lines naming SameSite on tests about passwords). Cost if wrong: a reviewer reads D-104 S1 as held by fewer cases than hold it; nothing is unheld.
2. **R1 for a referenced value.** account-mutation-request-guards refuses a body "over that route's body limit of D-104"; I read the limits as stated by the invariant, so its marked cases carry no D-104 line. Likewise the cases of account-startup-configuration carry D-111 S2 only for what that invariant does not state (the form of each setting, the message naming the setting and not its value, the values accepted).
3. **Quotations.** Where a case holds a part deep inside a long sentence, the quotation starts at the sentence's start and runs to the part (or to the sentence's end); for D-112 S2 and S3, whose sentences are very long, the line quotes only their opening words ("Accounts have an opaque random primary identifier", "Expired sessions are rejected on reads and pruned at startup and periodically with a disposed lifecycle timer"), and the *Verification* clause says which part each holds. Rejected: quoting the whole of D-112's sentences (lines of over 2 000 characters).
4. **D-110's pair keeps the deployed tunnel route.** The old pair (target acceptance through the tunnel; synthetic header tests as no proof of the deployed route) stays inside the rewritten pair, because no test holds the sentence for the real provider route; the parts nothing holds are added beside it.

## Mismatches with the plan or handoff

- The slice's *Change* names `tests/invariants/test_account_server_default_address.py` and `tests/invariants/test_account_save_sqlite_upgrade.py`; neither got a line. The first tests account-server-default-address alone, which states the whole of what it checks of D-111 (R1). The second tests account-save-sqlite-upgrade, which derives from D-229, and holds no sentence of the slice's decisions (it reads the `Dockerfile`'s check step; that holds D-237, already marked). Both were still run as the *Checks* ask.
- The slice's *Change* names no `tests/http.test.mjs` and no file of `browser-view`, while the server-side sentences of D-104, D-202, D-204, D-209, D-210, D-399, D-400 and D-402 are held mostly there and their page-side sentences in `tests/view/`. Item 5 covers this; the files are listed above.
- *Checks* ask `npm test -- <file>` "one run per file" — done; the full gate was not run (the method's section 3, WAY-160).

## Remarks on the log's wording (R3)

- D-112 S1 says the backup command of D-231 opens its connection "under the same rules" as the server's; the backup case shows a backup beside a separate writer only, so "the same rules" (WAL, busy timeout) for the backup's connection is not shown by a test. Nothing changed.
- D-111 S3 speaks of "startup failure … disposes opened resources"; no test makes a start fail after a resource opened and checks the release. Left to the pair.

## Own-work check (section 3)

- **Requirement most likely missed:** a test that holds a sentence of the twelve decisions and carries no line, because it cites the number or the content but not in a case I read.
- **Check:** `python -B .runs/executor-11/unmarked.py` (a working script) listing every case under `tests/` whose body or the six lines above it names one of the twelve numbers or one of their content terms (`save-conflict`, `save-outdated`, „zapisana w innej”, „zaktualizowana”, `previous-save-forbidden`, `previousSaveAllowed`, `account-previous-save`, `saved-game-reset`, „Zacznij od zera”, `resetSavedGame`, `SameSite`, `save-too-large`) without a line `decision:` of that number; exit 0, 139 rows.
- **What it showed:** four cases of `tests/view/program-list.test.mjs` hold D-402 S1 and S2 and had no line; they got one (`e5f15269`), and D-402's *Verification* already named what they hold. The other rows I read and judged: a mention in a neighbouring comment caught by the window of six lines; a case of another decision's subject that only uses the term (the client mapping of refusal codes in `tests/account-api.test.mjs`, D-97's logout cases, D-401's pull cases, the account fixtures carrying `previousSaveAllowed`); cases already judged under R1 (schema migrations, `tests/account-storage.test.mjs` "schema reopen preserves…"); `tests/sim/saved-game.test.mjs` "the server's save of the current version loads…", which uses the server's shape but would not fail if the server answered otherwise; `tests/view/account-screen.test.mjs` "a game built again after a conflict stays on the screen the address names…", whose subject is the screen and which reaches the conflict as a precondition; `tests/invariants/test_loop2_host_sharing.py` `test_production_account_configuration_is_fixed`, which holds the Compose settings of D-13 and D-17, not D-111's server rules.

## Reaches beyond the dispatch

- `foundations/invariants.md` entries player-opaque-session-cookie, player-express-session-sqlite-store, player-server-session, account-client-requests and account-save-sqlite-upgrade, read by heading, to know what decision they derive from (R1 applies only to an invariant derived from the judged decision).
- `guidelines/styleguide-browser-view.md` (item 5) before adding lines to `tests/view/**` and `tests/account-api.test.mjs`; see Unread material.
- `the author's rules on writing scripts, outside the repository` and `.ai\rules\git.md` (the session's own rules before a script and a commit).

## Working copies

- `.runs/executor-11/` under the worktree held the scripts `mark.py` and `unmarked.py`, their inputs `specs-server.json`, `specs-view.json`, `specs-flag.json`, `specs-list.json`, the extract `sentences.txt`, the output of the foundation check and the logs of the focused runs. The directory was removed with `rm -rf .runs/executor-11` before returning; nothing of it remains, and the report carries what it needed of the logs (the counts above). No worktree or clone was made. The files `npm test` writes by itself (`dist/`) stay as the product's own output.

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1–120 and every heading of the file (the sections on roles, tokens, focus, contrast, controls, screens, mockups); not read whole. The slice adds only comment lines to the tests of `browser-view` and changes nothing a screen shows, and no section of the file speaks of test comments; I did not read the remaining 860 lines for that reason.
- `foundations/part_map.md` and `foundations/glossary.md`: not read whole; I did not need a part or a term from them beyond what the handoff gives (the files of `browser-view` the handoff lists).
- `tests/http.test.mjs`, `tests/account-storage.test.mjs`, `tests/view/account-screen.test.mjs`, `tests/view/previous-save.test.mjs`: read by case and line range, not whole, as the dispatch asks; every case I judged, I read.

## Searches not found or unclear

- A test of „Express trusts only the immediate hop for protocol” (D-110): none found (`trust proxy` appears only in `src/server/app.ts:34`).
- A test of loopback-proxy mode refusing a peer other than loopback or a request without forwarded https: none found.
- A test of the role `warning` of the sentences of D-209 and D-210: none found; the cases read the text of the header line.
- A test of a start that fails after the database opened releasing it (D-111 S3): none found.
- Whether the cases on a block committed during hashing or while a message is on its way (`tests/http.test.mjs` "a block, a later link or an expiry committed during the hashing…", "a block committed while the password is checked…", "a block committed through another connection while the message is on its way…") would fail if a transaction spanned the hashing or the sending (D-112 S2): unclear without a probe; I did not count them, and the pair keeps that part.
