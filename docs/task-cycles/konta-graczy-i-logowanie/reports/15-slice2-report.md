# Slice 2 — SQLite accounts and session Store

Status: done. Stopped before independent review.

Worktree: `C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie`.
Dispatch base: `7ef74576ead2668803396403110efe9616e31b51`.
Commit: `3cbb129f2ada47c7fd2f8669d603142884b7b4c4` — Add SQLite account database and session store.
Process checkout and gitlink both: `574a37b9ab9572f876298f4cc10754581222d3f0`.
The tracked tree is clean; the branch has no upstream. Nothing was pushed.

## Result and integration contract

`AccountDatabase(path, options)` owns a real `node:sqlite` DatabaseSync connection. It enables foreign keys, WAL and FULL synchronization; initializes strict version-1 accounts/sessions in one transaction; rejects unknown versions; closes on initialization failure; and closes its connection and unreferenced cleanup timer on disposal. SQL values are bound. Schema indexes cover expiry and account ID. Cleanup deletes at most 1000 indexed expired rows per invocation, at startup and at a default 60-second interval. The default lock wait is one second, configurable only within a positive five-second bound. These are implementation choices under D-110, not new product settings.

Accounts expose `createAccount(normalizedEmail, encodedPasswordHash)`, `findAccountByEmail(normalizedEmail)` and `findAccountById(id)`. The actual parameter name in code is `email`; callers supply the normalized value from account policy. Normalization and hashing remain outside this layer. A duplicate email returns null; unrelated SQLite errors propagate. IDs are generated with `randomUUID`. A successful insert returns the account including its stored hash: HTTP must project the public account response rather than return that object.

`SqliteSessionStore(database)` extends the installed package's Store, implementing get/set/touch/destroy. SessionData gains optional `accountId`. A persisted authenticated session contains exactly accountId and the library's serialized cookie metadata. Reads validate the JSON shape and matching record identity before package hydration. They use the database's absolute expiry, so stale serialized cookie expiry does not shorten a later touch. `set` inserts a fresh authenticated session or updates data/monotonic expiry for the same unexpired identity; it refuses changing that identity or replacing an expired record. `touch` only updates existing unexpired records for that identity; it cannot insert. `destroy` deletes only its supplied session ID. Both close methods are idempotent.

Later assembly must use resave=false and ordinary unchanged requests must use touch. `set` is the library's upsert contract; an explicitly delayed set after deletion can create a record, so application code must not use explicit save for ordinary authenticated reads. Credential success regenerates to a fresh ID and awaits save as the reviewed spec already requires. Cookie lifetime/attributes, no-cache policy, proxy/Origin checks, readiness/startup and secret handling remain the later HTTP slices' work. The Store does not impose that HTTP policy. Errors go to each supplied callback once; absent optional callbacks receive an error event. Callback exceptions are not reinterpreted as storage failures. Cleanup errors go to the optional database observer or a generic stderr message without row contents.

## Changed files

| File | Added | Removed |
|---|---:|---:|
| foundations/decisions.md | 31 | 1 |
| foundations/environment_facts.md | 4 | 4 |
| foundations/invariants.md | 20 | 0 |
| foundations/part_map.md | 2 | 1 |
| guidelines/coding-database-access.md | 44 | 0 |
| guidelines/coding-session-store.md | 46 | 0 |
| guidelines/coding.md | 3 | 1 |
| src/server/database.ts | 225 | 0 |
| src/server/session-store.ts | 163 | 0 |
| tests/account-storage.test.mjs | 443 | 0 |

Total: 10 files, +981/-7. No manifest, HTTP, hashing, deployment, vault or process change.

## Commands and evidence

All repository tests ran solely through `npm test`. Logs are beside this report. The verifier is a local Linux harness, not the target application image. The dispatch's base result is supplied evidence, not a test performed by this executor.

Every Docker runner used this common argument block:

```powershell
--network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount 'type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly'
```

The commands below use `COMMON` only to abbreviate that exact block; there was no literal COMMON argument.

| Command | Exit | Result / log |
|---|---:|---|
| `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0 each | Exact pin match above. |
| `git bundle create .runs/account-linux-inputs/product.bundle task/konta-graczy-i-logowanie` | 0 | Rebuilt first for the base and again for the final commit. |
| `docker run --name loop2-task15-slice2-red COMMON loop2-task22-verifier:latest bash /inputs/verify-slice2-red.sh 7ef74576ead2668803396403110efe9616e31b51 7012abcfb55b4ba2b2836b574a2275eb1551df28` | 1 | `15-slice2-red.log`: npm test reached the new account insertion assertion against a compiling empty implementation and failed because returned account was null. One failure, not a missing-import/setup failure. |
| `npm run typecheck` | 1 | Development diagnostic: @types/express-session declares a no-argument Cookie constructor. Changed hydration to construct Cookie without arguments, then assign individually validated metadata. Final npm test typechecking passes. |
| `docker commit loop2-task15-slice2-red loop2-task15-slice2-verifier:latest` | 0 | Cached local verifier dependencies only; image sha256:8e72cda25a3761bbea54f7d4d595c9e3dea9ce9e3e2fd567cefc5af5d93a12d2. No target image claim. |
| `docker run --name loop2-task15-slice2-development COMMON loop2-task15-slice2-verifier:latest bash /inputs/verify-slice2-development.sh` | 1 | `15-slice2-development.log`: 355/357 Node pass. The delayed Cookie.expires assignment changed originalMaxAge using real wall time; the test now preserves the supplied lifetime as the runtime adapter does. Invalid JSON was correctly rejected but its SyntaxError did not match the assertion; the implementation now emits a fixed safe invalid-data error instead of passing parser text. No assertions were weakened. |
| `docker run --name loop2-task15-slice2-development2 COMMON loop2-task15-slice2-verifier:latest bash /inputs/verify-slice2-development.sh` | 0 | `15-slice2-development2.log`: 357 Node tests passed, 275 Python tests completed with three native-Windows skips; foundation 0 errors. This was the earlier source snapshot, before adding genuinely simultaneous worker inserts and same-identity metadata update. |
| `python -B .runs/account-linux-inputs/make-slice2-mutation.py` | 0 | Built the disposable mutated source archive without changing the task tree. |
| `docker run --name loop2-task15-slice2-mutation COMMON loop2-task15-slice2-verifier:latest bash /inputs/verify-slice2-mutation.sh` | 1 | `15-slice2-mutation.log`: all six targeted invariant cases fail with AssertionError, 351 pass / 6 fail. npm test stops after Node failures; Python/foundation did not run in this intentionally failing run. |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | After foundation writes and again before commit: 0 errors. |
| `git diff --cached --check` | 0 | Before commit. |
| `docker run --name loop2-task15-slice2-final COMMON loop2-task22-verifier:latest bash /inputs/verify.sh 3cbb129f2ada47c7fd2f8669d603142884b7b4c4 7012abcfb55b4ba2b2836b574a2275eb1551df28` | 0 | `15-slice2-final.log`: final exact-commit restoration/full gate passed: 357 Node tests; 275 Python tests completed, three native-Windows skips; foundation 0 errors. |

Formatting used the repository's pinned Prettier with `--write --no-config --no-editorconfig` on the three new code/test files; exit 0. No separate test invocation was used to select a file or case.

The final bundle SHA-256 is `4d4f87dc79809ba1c1f97d2d91bb7ed261ec2a5165535b0818f7cf4bde9ed80a`. Each overlay run logs its archive hash. Development2 archive hash: `85b646fd21fd65356c48df6edb9314c7bcba68b602aa6bc9ada9575f02bdaa87`. Mutation archive hash: `a540575a0def5d84f9038448b43d21c09dc155de5ea452876edc996c54d62f17`. The original red source copied from the runner is retained outside the publishable record under `.runs/account-linux-inputs/slice2-red-source/` in the worktree. The mutation archive and generator remain under `.runs/account-linux-inputs/`. Final runner tools report Node v24.22.1 and Python 3.14.9.

## Invariant fail-once and restoration

Every new citing test was deliberately failed through npm test in one disposable batch. Mutations are exact, asserted single-occurrence replacements in `make-slice2-mutation.py`:

| Invariant / citing test | Mutation | Observed assertion |
|---|---|---|
| account-database-schema / schema reopen and newer-version refusal | Replace version-1 comparison with a number-type comparison, admitting version 2. | Missing expected exception. |
| account-database-schema / transactional initialization failure | Remove BEGIN IMMEDIATE, COMMIT and ROLLBACK. | Newly created accounts table remains after sessions-table collision. |
| account-session-storage / missing, expired and exact expiry | Change expiry read condition from `>` to `>=`. | Expected null at exact expiry, got session. |
| account-session-storage / out-of-order renewal | Replace `MAX(expires_at, ?)` with incoming `?`. | Expected a live session at 4000 after renewals to 5000 then 3000, got null. |
| account-session-storage / delayed touch after destroy | Add `AND 0` to session deletion. | Expected deleted session to be absent, got session after delayed touch. |
| account-session-storage / crafted persisted payloads | Convert the malformed JSON payload `{` into a valid synthetic session before decode. | Missing expected rejection for invalid JSON through the real package's Store.load. |

The task source was never mutated. Restoration is a fresh clone of the committed source via the rebuilt bundle, not reuse of a mutated directory. Its exact full npm test result is reported above. The final same-identity set metadata update and stronger worker-race test do not change any mutated expression or the six citing cases.

## Own-work check and plausible faults

Weakest requirement: expired/malformed persisted data or delayed requests could be accepted by the actual session package despite apparently correct SQL. The tests use actual temporary SQLite files, actual session.Cookie and the package's inherited Store.load/Session hydration. They check equality to expiry before cleanup, a later expiry followed by an earlier renewal, attempted wrong-identity renewal, a destroyed session followed by delayed touch, and malformed JSON/arrays/missing cookie/mismatched identity/prototype-shaped metadata/invalid dates/credential fields/invalid max age. The negative cases were observed to fail under the mutations above and pass in restored source.

Other plausible faults and catching assertions:

- Removing email uniqueness admits both insertions: two actual worker threads establish separate connections, report readiness, then are released together through Atomics; exactly one insert succeeds. The workers have start/result deadlines and are terminated in finally.
- Interpolating input into SQL changes its meaning: SQL-looking email values remain data and a crafted lookup does not select an existing account.
- Resetting schema on reopen loses records: the schema test checks both the stored hash and existing session after closing and reopening.
- Swallowing SQLite write failures reports successful session creation: a real second connection holds BEGIN IMMEDIATE; set reports a lock error within a bound, the existing account remains usable, and a retry after rollback succeeds.
- Dropping foreign-key enforcement admits a nonexistent account: Store.set rejects a nonexistent account ID.
- Changing a session's account on set or touch grants the wrong identity: both cases retain the original account; identity-changing set reports failure.
- Calling a callback twice or catching its exception as an operation error: explicit callback counter and sentinel exception cases detect it. Closed database operations all return an Error; no-callback failure emits error.
- Cleanup deletes live data or grows unbounded: startup removes an expired row and retains a live one; a batch of 1001 expired rows leaves exactly one after a single manual prune; the periodic timer removes that remaining row by a bounded condition wait.
- Disposal leaves cleanup running: after close, the supplied cleanup-error observer remains empty across three configured intervals. An unclosed connection also fails later resource cleanup; the timer is explicitly unreferenced in source.

Foreign keys, bound statements, WAL/FULL and expiry/account indexes were inspected in product source; the race, lock, FK and durability checks exercise real SQLite rather than proving these properties through a fake driver. This is not evidence of a deployed named volume or public cookies.

## Choices, adaptations and reaches

- Kept API policy, normalization, hashing and runtime assembly outside the two storage modules. Rejected moving them into SQL/Store: that would duplicate later policy. Cost if wrong: callers must honor the documented normalized-email and fresh-session contracts; later HTTP integration tests must verify this.
- Used narrowly validated library data and real Cookie objects. Rejected returning arbitrary parsed JSON: package hydration copies properties. Cost: future session fields require an explicit adapter change.
- Followed runtime touch(error) semantics even though the installed declaration types describe a no-argument callback. The runtime index.js and versioned README both show error delivery. Store method signatures remain assignable to the installed types.
- Used upsert only for set and update-only for touch. Existing same-identity set persists metadata while retaining later expiry. Rejected upsert renewal: it revives a destroyed session.
- Used a bounded cleanup batch and unreferenced timer owned by the connection. Rejected deleting all expired rows synchronously each time: work grows with the backlog. Cost: very large expired backlogs take several cycles, but reads reject expiry immediately.
- Kept broad pending invariants whole. Added narrow database/schema and Store checks instead of claiming runtime readiness, deployed wiring or container replacement from layer tests. Their statements do not weaken the broader entries.

Additional selective reads beyond the dispatch: installed `node_modules/express-session/session/cookie.js` and `session/session.js` for serialization, expiry setters and actual hydration/save/destroy behavior; `node_modules/express-session/index.js:345-370` for runtime touch error callback and the references to shouldSave/shouldTouch. The database and Store versioned source URLs already in the foundation were opened, including DatabaseSync timeout/close, StatementSync binding, and Store get/set/touch/destroy sections. Element and coding template/example prerequisites were read through the pinned skills, including record-decision for the first-kind decisions, complete part map, and glossary examples. No cycle.md, whole task or whole plan was read; foundation row identifiers were searched selectively in plan.md.

Observed API difference: @types/express-session 1.19.0 Cookie declares no constructor parameters while the installed JavaScript accepts options. Product code uses the typed no-argument constructor and validated assignments; tests exercise the actual package option constructor. Node's chosen DatabaseSync APIs are supported by the recorded 24.21.0 contract and exercised on 24.22.1 in the harness; no newer API was introduced from current unpinned docs.

## Foundation consequences

New decisions: D-112 (database-access exemplar) and D-113 (session-store exemplar). Changed D-110 only by adding the two lower-layer checks to Verification; its binding sentences are unchanged. New invariants: account-database-schema and account-session-storage, both test/no. Updated environment fact descriptions and citations: node-sqlite-database and express-session-store-contract; existing dependents D-99/D-105/D-110 and their invariants remain consistent. Part map account-server now explicitly owns account/session persistence and claims the new integration test exactly once. Existing src/server/** already covers both new trust-boundary modules. No new part dependency or external service was added.

Polish meanings:

- D-112: Pierwszy moduł bazy pokazuje, jak utrzymywać połączenie, transakcję schematu i parametry zapytań poza obsługą HTTP.
- D-113: Pierwszy magazyn sesji pokazuje walidację zapisu i przekazanie wyniku operacji do callbacku biblioteki.
- D-110, zmienione Verification: Testy warstwy bazy i magazynu sprawdzają część zasad, a uruchomienie aplikacji nadal wymaga osobnego dowodu.
- account-database-schema: Otwarcie bazy zachowuje istniejące dane, wycofuje nieudaną inicjalizację i odmawia nieznanej nowszej wersji.
- account-session-storage: Magazyn odrzuca błędny lub wygasły zapis, a odnowienie nie zmienia konta, nie skraca ważności i nie odtwarza usuniętej sesji.
- node-sqlite-database: Wbudowany moduł Node udostępnia synchroniczne połączenie, limit oczekiwania na blokadę, parametry zapytań i jawne zamknięcie.
- express-session-store-contract: Biblioteka przechowuje dane po stronie serwera i przekazuje błąd operacji przez callback magazynu, także przy odnowieniu.
- account-server: Część serwerowa odpowiada również za zapis kont i sesji oraz testy tej warstwy.

Violation states set or cleared: none. New narrow invariants start at no with mutation/restoration evidence. Existing player-express-session-sqlite-store, account-save-sqlite-access, account-schema-lifecycle and account-save-durable-storage remain yes/review. In particular, durable-storage covers accounts AND saved game states; no game-save code or evidence was added and no obligation was cleared.

## Unchecked and remaining limits

The three native Windows tests were skipped by the Linux gate, not passed here: `test_native_windows_readers_reject_nonterminating_cim_errors`, `test_native_windows_readers_keep_owned_child_in_healthy_observation`, `test_failed_descendant_query_still_terminates_known_main_process`. Windows listener-enumeration baseline failure was not rerun or represented as evidence about this slice.

No target server mutation, deployment, secret creation/rotation, target-image password measurement, named-volume replacement or public browser journey was performed. Later slices retain all of those obligations. There is no UI change in this slice and no screenshot claim. The known unresolved computational mutation-tool/parts settlement in testing guidelines is unchanged; no tool was adopted and the mandatory mental mutation checks above cover this connection-oriented change. No consequential open question or structural plan mismatch remains in this slice.

## Full new and amended foundation entries

### D-110 — How does the account database open and preserve its schema?

The account server opens one application-owned SQLite connection before readiness, transactionally initializes version 1 with accounts and sessions on a new database, retains an existing version 1 without resetting records and refuses an unknown newer schema. Accounts have an opaque random primary identifier, uniquely normalized email, encoded password hash and creation time, and sessions have their identifier, account foreign key, serialized library data and absolute expiry with account and expiry indexes; foreign keys, parameterized statements, WAL, full synchronization and a bounded busy timeout apply, and no transaction spans asynchronous hashing or an HTTP response. Expired sessions are rejected on reads and pruned at startup and periodically with a disposed lifecycle timer, while touch updates existing unexpired rows only, preserves the later expiry and never recreates a removed session.

- **Scope:** account-server, deployment
- **Based on:** node-sqlite-database
- **Relations:** derives from D-15 · derives from D-17 · derives from D-97 · derives from D-99 · derives from D-105
- **Verification:** invariants: account-schema-lifecycle · account-database-schema · account-session-storage.
- **Origin:** none

*Rationale:* An explicit schema version prevents old code from interpreting a newer layout or resetting existing accounts, and short synchronous database operations keep transaction ownership simple. Container replacement preserves the database, but rollback restores code rather than historical data and cannot repair an incompatible schema.
*Rejected:* A destructive startup reset — loses accounts; unversioned schema assumptions — let old code misread newer data; transactions held across password work — prolong locks; session touch implemented as an upsert — revives logout.

### D-112 — Which file is the exemplar for database access?

The exemplar for kind `database-access` is `src/server/database.ts`, and its kind guidelines are read before adding or changing a database-access file. Database access owns the SQLite connection, transactional schema initialization, bound SQL values and connection disposal, independently of HTTP and password hashing.

- **Scope:** account-server
- **Based on:** node-sqlite-database
- **Relations:** derives from D-28 · derives from D-110
- **Verification:** an agent compares a change with the decision:
  - complies: database-access guidelines identify the first implementation as exemplar and keep SQL and connection ownership together
  - violates: a different exemplar or database access that spans asynchronous password work
- **Origin:** none

*Rationale:* A concrete model keeps persistence and failure handling visible for later account operations, while synchronous ownership limits transaction lifetimes.
*Rejected:* Scattered SQL in HTTP handlers — obscures connection ownership and makes persistence failures harder to exercise independently.

### D-113 — Which file is the exemplar for the session Store?

The exemplar for kind `session-store` is `src/server/session-store.ts`, and its kind guidelines are read before adding or changing a session-store file. The Store adapts the library's callbacks to database operations, validates stored session identity and cookie metadata before library hydration, and leaves HTTP and cookie policy to application assembly.

- **Scope:** account-server
- **Based on:** express-session-store-contract
- **Relations:** derives from D-28 · derives from D-105 · derives from D-110
- **Verification:** invariants: account-session-storage. An agent compares a change with the decision:
  - complies: session-store guidelines identify the first implementation as exemplar and preserve callback failures
  - violates: treating parsed JSON as a valid library session without checking its shape
- **Origin:** none

*Rationale:* The adapter makes malformed persisted data and storage failures explicit before the library restores a session; a deliberately narrow payload requires conscious changes when session data grows.
*Rejected:* Unchecked deserialization — passes arbitrary stored properties to library objects; a second session middleware — duplicates the chosen library's lifecycle.

## account-database-schema

Opening an account database initializes version 1 atomically, preserves its existing accounts and sessions on reopen, and rejects an unknown newer schema without changing its version or records.

- **Method:** test
- **Rests on:** node-sqlite-database
- **Derives from:** D-110
- **Part:** account-server
- **Violated:** no

## account-session-storage

The SQLite session Store returns only valid stored account identity and cookie data for unexpired records, and renewal preserves identity and the later expiry without recreating removed or expired sessions.

- **Method:** test
- **Rests on:** express-session-store-contract · node-sqlite-database
- **Derives from:** D-110 · D-113
- **Part:** account-server
- **Violated:** no

## node-sqlite-database

Node.js 24.21.0 exposes SQLite through the built-in node:sqlite module with synchronous DatabaseSync operations, a busy timeout, parameterizable prepared statements and explicit connection closing.

- **Source:** https://raw.githubusercontent.com/nodejs/node/955266bfdd854cd280dffd47548673914484e4c0/doc/api/sqlite.md § Class: DatabaseSync — "All APIs exposed by this class execute synchronously." · § new DatabaseSync, timeout — "The busy timeout in milliseconds." · § Class: StatementSync — "Prepared statements are parameterizable" · § database.close — "Closes the database connection."; read 2026-10-27

## express-session-store-contract

Express-session 1.19.0 keeps session data server-side, requires Store get, set and destroy callbacks, uses set to upsert a session, and recommends touch for idle expiry with an error callback, while its default MemoryStore is not intended for production.

- **Source:** https://raw.githubusercontent.com/expressjs/session/c10b2a383841766899f6dcf53c8aff8c7fd3d2e7/README.md § API — "Session data is stored server-side." · "not designed for a production environment." · § store.set — "upsert a session" · § store.touch — "callback(error)"; read 2026-10-27

## account-server

The part is the account and save server: it serves the built game, handles the HTTP requests sent to it and owns account and session persistence.

- **Files:** src/server/**
  tests/http.test.mjs
  tests/startup.test.mjs
  tests/passwords.test.mjs
  tests/account-storage.test.mjs
  tests/invariants/test_account_server_express_http.py
  tests/invariants/test_loop2_api_error_route.py
  tests/invariants/test_loop2_one_serving_process.py
  tests/invariants/test_account_server_occupied_address.py
  tests/invariants/test_account_server_default_address.py
- **Depends on:** browser-view · simulation · build-tools
- **Trust boundary:** src/server/**
