# Revised slice 5 — configured startup, transport and rolling sessions

Status: **done**. Final committed head passed the full repository command. Stopped before independent review.

Worktree: C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie.
Branch: task/konta-graczy-i-logowanie.
Dispatch base: 8c2168084542d5f37b4a234aae5682cc56f43b5b.
Final head: **1e8a9bf1153d8cd7c58fcab210b51516ff760532**.
Process checkout and gitlink: 574a37b9ab9572f876298f4cc10754581222d3f0.

Commits:

- e75d82a15370f433e78330cdc1353b5908311b6e — Compose validated startup and secure rolling account sessions.
- 1e8a9bf1153d8cd7c58fcab210b51516ff760532 — Tighten origin parsing and retain safe assertion diagnostics.

No discarded historical code/diff was read or copied. Report 25 supplied limits and failure lessons only. No cycle.md read, scope expansion, target mutation, merge, rebase, reset, push, backlog or PR operation occurred. The final tracked tree is clean. Ignored reports, logs and the two disposable mutation scripts are evidence, not additional product paths.

## Implementation and next-slice interface

`readAccountConfiguration(environment)` accepts a supplied environment object rather than modifying shared process state. Wholly unconfigured non-production returns null. Production requires all four account settings and cloudflare-tunnel mode; partial or invalid explicit settings fail everywhere. The HTTPS origin must contain no credentials, non-root path, query or fragment, including empty query/fragment markers that URL normalization would otherwise erase. Comparison uses its serialized origin, including a nondefault port.

The external signing file is opened read-only/nonblocking, checked as a regular file, read with a 16-KiB bound and decoded as strict UTF-8. It must hold a nonempty JSON array of distinct canonical base64url strings encoding 32 bytes. The order is preserved. Errors identify the configuration setting, never file contents. No session-signing key is created. Random bytes used for the dummy password are unrelated to the external signing key.

`openAccountRuntime(environment)` opens the real AccountDatabase and SqliteSessionStore and awaits a dummy Argon2id hash through the existing bounded password module. It returns configuration, database, store, dummyHash and an idempotent close method, or null for unconfigured mode. Database/hash initialization failures close owned resources. The entrypoint awaits this runtime before listen/readiness; listen errors and shutdown close it. Shutdown stops new connections and bounds draining existing connections at five seconds. Invalid port and occupied-address outcomes remain intact.

`createApp(runtime = null)` assembles express-session before static files. It uses the actual SQLite Store, ordered keys, resave=false, saveUninitialized=false and rolling=true; cookie name __Host-loop2.sid, root path, Secure, HttpOnly, SameSite=Strict, no Domain and 30-day maxAge. Ordinary authenticated reads reach Store.touch, never explicit save. Requests with missing or invalid transport metadata bypass session loading entirely, preserving anonymous public assets/health without account authority or renewal. Eligible session middleware responses receive Cache-Control: no-store, including static responses and anonymous requests with valid proxy metadata.

`transport.ts` exports trustProxy, clientAddress, singleHeader and mutationGuards. Cloudflare mode trusts only hop zero and requires one exact https protocol and a singular valid client address. Raw headers detect duplicates rather than relying on Node's joined header map. IPv6 and IPv4-mapped spellings normalize to a common identity. Forwarded chains, X-Real-IP and forwarded Host do not choose identity/origin. Explicit loopback-proxy mode trusts only a loopback peer and uses that peer's identity; direct mode ignores forwarding. The adapter puts the canonical identity in response.locals.accountClientAddress for the next route slice.

Known account paths are /api/account, /api/register, /api/login and /api/logout. Unconfigured requests receive JSON 503; configured ones require transport, and POST requests additionally require exact Origin, JSON with an optional charset, no compressed inflation, at most 16 KiB and an object body. Empty bodies are refused explicitly. Valid configured requests still receive the planned temporary 503. Unmatched API remains JSON 404. Expected credential fields, authorization, admission, registration/login/logout sequencing and the browser gate remain Slice 6 and later work. The test-only session/identity routes live only inside the test fixture.

## Changed paths

Exact `git diff 8c2168084542d5f37b4a234aae5682cc56f43b5b..HEAD --numstat`:

| File | Added | Removed |
|---|---:|---:|
| foundations/environment_facts.md | 24 | 0 |
| foundations/invariants.md | 13 | 13 |
| foundations/part_map.md | 1 | 0 |
| src/server/app.ts | 95 | 5 |
| src/server/configuration.ts | 149 | 0 |
| src/server/main.ts | 33 | 9 |
| src/server/transport.ts | 97 | 0 |
| tests/invariants/test_account_server_default_address.py | 6 | 2 |
| tests/startup.test.mjs | 313 | 4 |
| tests/transport.test.mjs | 465 | 0 |

Total: **10 product paths, +1196/-33**.

## Commands and results

Every repository test, deliberate mutations included, ran only through **npm test**. No direct selected Node/Python test command ran. The handoff's 366 Node / 278 Python baseline belongs to the prior reviewed slice, not to this executor. Each verifier clones the rebuilt source bundle at the stated SHA, verifies the process pin, installs dependencies and the hashed quality environment, then invokes the full command. No host Docker socket or published daemon is used.

The following is the exact COMMON argument block used below:

```powershell
--network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount 'type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly'
```

TARGET in each command is exactly `7012abcfb55b4ba2b2836b574a2275eb1551df28`. It establishes this slice's declared comparison base; it does not claim to include the later upstream advance.

| Command | Exit | Evidence |
|---|---:|---|
| git -C .the-way rev-parse HEAD; git ls-files --stage -- .the-way; git status --short; git rev-parse HEAD | 0 | Matching pin, clean initial dispatch base; final reads show clean final head. |
| node node_modules/prettier/bin/prettier.cjs --write --no-config --no-editorconfig src/server/configuration.ts src/server/transport.ts src/server/app.ts src/server/main.ts tests/startup.test.mjs tests/transport.test.mjs | 0 | Formatting, repeated after the first quality failure; final repetition reports every file unchanged. Intermediate invocations used the explicitly changed subset. |
| python -B .the-way/elements/common/foundation_check.py | 0, both invocations | After foundation writes and after the source-excerpt adjustment: 0 errors. |
| git diff --check; git diff --cached --check | 0 | Whitespace checks on the prepared changes. |
| git add with the exact ten paths above, then git commit -m "Compose validated startup and secure rolling account sessions" | 0 | First commit. |
| git add src/server/configuration.ts src/server/app.ts tests/startup.test.mjs tests/transport.test.mjs foundations/environment_facts.md; git commit -m "Tighten origin parsing and retain safe assertion diagnostics" | 0 | Final commit; no assertion expectation relaxed. |
| git bundle create .runs/account-linux-inputs/product.bundle task/konta-graczy-i-logowanie | 0, both invocations | Rebuilt for e75d82a and final 1e8a9bf. |
| docker run --name loop2-task15-startup29-first COMMON loop2-task22-verifier:latest bash /inputs/verify.sh e75d82a15370f433e78330cdc1353b5908311b6e TARGET | 1 | 29-startup-first.log: 377 Node pass; 278 Python run, three Windows skips; only Prettier app.ts failed. All three production-image fixtures ran and passed. Final foundation stage not reached. |
| docker run --name loop2-task15-startup29-red-guards COMMON loop2-task22-verifier:latest bash /inputs/verify-startup29-mutation.sh e75d82a15370f433e78330cdc1353b5908311b6e TARGET guards | 1 | 29-startup-red-guards.log: build succeeded; 8 actual assertion failures, 369/377 Node pass. Python/foundation not reached. |
| docker run --name loop2-task15-startup29-red-store COMMON loop2-task22-verifier:latest bash /inputs/verify-startup29-mutation.sh e75d82a15370f433e78330cdc1353b5908311b6e TARGET store | 1 | 29-startup-red-store.log: build succeeded; 2 actual assertion failures, 375/377 Node pass. Python/foundation not reached. |
| docker run --name loop2-task15-startup29-red-default COMMON loop2-task22-verifier:latest bash /inputs/verify-startup29-mutation.sh e75d82a15370f433e78330cdc1353b5908311b6e TARGET default | 1 | 29-startup-red-default.log: 377 Node pass; default-address assertion fails on readiness at 3001 rather than 3000. Same pre-fix app.ts formatting failure also remains; 278 Python run with three skips. Foundation not reached. Runner was allowed to complete. |
| docker run --name loop2-task15-startup29-final COMMON loop2-task22-verifier:latest bash /inputs/verify.sh 1e8a9bf1153d8cd7c58fcab210b51516ff760532 TARGET | **0** | 29-startup-final.log: **377 Node pass; 278 Python tests across four directories pass with three native-Windows skips; foundation 0 errors**. This is the final committed-head restoration run. |
| docker image inspect loop2-task22-verifier:latest --format '{{.Id}}'; docker ps --filter name=loop2-task15-dind --format '{{.Names}}' | 0 | Harness identity and availability of the isolated task daemon. |
| docker inspect loop2-task15-startup29-first loop2-task15-startup29-red-guards loop2-task15-startup29-red-store loop2-task15-startup29-red-default loop2-task15-startup29-final --format '{{.Name}} {{.State.Status}} {{.State.ExitCode}}' | 0 | All five owned runners exited, respectively 1, 1, 1, 1 and 0. They retain diagnostic logs; the shared task daemon remains. |
| Get-FileHash for product.bundle, process.bundle, verify.sh, verify-startup29-mutation.sh and mutate-startup29.py -Algorithm SHA256 | 0 | Identities below. |

The first formatting failure was real: rerunning the pinned formatter changed only the response.status(...).json(...) layout in app.ts, and the final full command passed its check. It was not a product behavioral failure or a reason to weaken a lint rule. Additional own-work inspection found that URL normalization can erase an empty ?/# or a dot-segment path; the final parser rejects their original syntax and the startup table covers those inputs. Cookie comparisons retain exact equality/attribute requirements but use boolean assertions with safe messages to avoid printing ephemeral test-cookie values on future failures. The first red run emitted synthetic temporary-fixture cookie values; the retained record now masks them as described below. No production credential was involved.

Harness image: sha256:75d0c821fa0c6a4d7b7aee56748bb958439ae82b536c4145c252febf7697b524. Observed Node v24.22.1 and Python 3.14.9. This harness is not a deployment image or a target benchmark.

| Input | SHA-256 |
|---|---|
| e75d82a product bundle used by first/red runs | 8d1a98592867811f0d7ab9f51b6c3fc51be4a9b2a65c58631e821fc426aef9e1 |
| final product bundle | 69637337a150ca9ce7f0429bb81a9e2750508e0daf78d04eb2be7c35d3cca2c7 |
| process bundle | 59d33febc440c6d9e70494a226ee5293040b5970d524277035a4fae4299fab08 |
| verify.sh | b779043832c421080097ebf1bda5a1534e2788749897b5a3a848d472d2776d8b |
| verify-startup29-mutation.sh | 79419c024900c9dacad16c919aa66f0f1f8af9a3ed13f3968450e439091f545e |
| mutate-startup29.py | b03f025a4e9600bcfb4df280a19a69c4bf319e3ab750178ada991bb9928383a9 |

## Deliberate failures and restoration

Mutations run only in disposable clones. Their script requires each exact anchor once; the real worktree is never weakened. Every named test below failed at an assertion, not at import, compilation, setup or runner termination, and its unmutated counterpart passed in the final full command.

| Invariant / test | Deliberate fault | Actual failure |
|---|---|---|
| account-startup-configuration / production missing settings... | Allow missing production settings to return unconfigured mode | Forbidden readiness line appears. The assertion checks it before timeout/error checks. |
| account-startup-configuration / secret files reject... | Disable duplicate-key check | Missing expected rejection for duplicate keys. |
| account-schema-lifecycle / configured startup refuses unknown schema... | Treat schema 99 as initialization input | Forbidden readiness line appears for the future schema. |
| account-request-transport / transport refuses ambiguous proxy metadata... | Return a fixed identity before Cloudflare validation | Invalid account request returns 503 instead of 403. |
| account-request-transport / canonical transport identity... | Same fixed-identity bypass | 127.0.0.1 instead of independently specified 2001:db8::1. |
| player-opaque-session-cookie / rolling static responses... | Reverse signing-key order | Renewed cookie does not have the independently computed newest-key signature. |
| player-opaque-session-cookie / new opaque sessions... | Set newly issued cookie secure=false | Actual response lacks Secure. |
| player-express-session-sqlite-store / rolling static responses... | Replace assembled Store with MemoryStore | Seeded real SQLite session is not loaded/renewed. |
| player-express-session-sqlite-store / new opaque sessions... | Same MemoryStore replacement | No actual SQLite row exists after successful fixture issuance. |
| account-server-default-address / existing single Python test | Change default from 3000 to 3001 | Exact readiness-address assertion rejects 3001. |

The guards run has one additional, expected assertion failure in the configured process smoke case: the transport bypass changes the missing-metadata account response from 403 to 503. Eight Node failures therefore correspond to the seven listed guard/cookie/startup invariant cases plus that smoke assertion. The store run has two failures. The default run has the one intentional address failure plus the already known formatting failure. None is hidden by the final pass.

The existing default-address invariant already contained D-109's precondition at dispatch. Its binding sentence was not rewritten or duplicated. Only its existing single test establishes wholly unconfigured non-production explicitly by removing all account/listen variables and selecting NODE_ENV=test. All other process starts take freshly selected ports, except the existing invalid-port cases and container starts allowed by D-49.

## Own-work check and plausible faults

Weakest requirement: a valid session on a static response must renew both cookie and database expiry without rewriting identity, choosing an old signing key, or being publicly cached. The real HTTP/SQLite test seeds an old-key session with only one day remaining, requests built main.js, independently calculates the first-key HMAC, checks attributes/no Domain/no-store, checks the 30-day expiry bounds and unchanged serialized row data. It passed at both unmutated heads; the key-order and MemoryStore mutations failed at its actual assertions. This exercises production assembly, not a replacement Store.

Other plausible faults and the protecting checks:

- resave=true rewrites serialized cookie data; the unchanged-data assertion fails.
- Session middleware mounted after static files produces no renewal; the asset-cookie assertion fails.
- Invalid forwarding reaching session handling changes a seeded live record; the repeated row-equality and no-cookie assertions fail, while the asset remains public.
- Trusting leftmost X-Forwarded-For or ignoring equivalent IP representations changes the explicit canonical-address result.
- Treating malformed/duplicate headers as the library's first accepted value breaks direct refusal cases.
- Deriving Origin from Host admits the crafted wrong-origin request with spoofed host headers; its 403 assertion fails.
- Inflating bodies, accepting form/text data, accepting empty JSON or increasing the body cap breaks the corresponding status assertions.
- Accepting a wrong signature for a live record breaks the identity-null assertion before that row is destroyed. The test does not use only nonexistent records to prove signature refusal.
- Missing saveUninitialized=false creates anonymous cookies/rows; their absence is checked before explicit fixture issuance.
- Failing to stop the listener or drain active connections can keep the real process alive until SIGKILL; the bounded shutdown assertion rejects that outcome. Process exit alone does not prove an explicit database close, because the cleanup timer is unreferenced. The separate direct runtime-close test checks a failed use of the closed connection and a successful real reopen retaining the account. The startup catch paths are inspected but no forced native-hash failure is claimed as an executed disposal test.
- Accepting new schema versions or failing production open causes the actual process readiness/refusal cases to fail. Existing storage tests retain direct expiry-equality, callback and delayed-touch/no-resurrection coverage.

No screenshot or full browser journey is claimed: this slice changes server assembly and guards, not rendered components. The future public journey still requires its prescribed human evidence. This work did not observe a new browser automation return condition.

## Foundation, source and guideline consequences

Used the project make-change entrypoint and the pinned environment-fact, invariant and part-map element methods, their common rules/templates and examples. Added tests/transport.test.mjs to account-server; src/server/** already owns the two new modules and their trust boundary. No allowed dependency, surface, external-context exchange or binding part responsibility changed. Configuration/main are the deferred entrypoint kind; app/transport use the existing HTTP kind. No new kind or guideline was invented.

Verified the installed Express 5.2.1 protocol/secure getters and express-session 1.19.0 lifecycle/cookie/session implementations against the selected immutable publisher sources. Express takes the first comma-separated forwarded protocol after trusting the immediate peer, so application duplicate/list refusal remains required. Session middleware without an explicit proxy override uses Express's security assessment. Source links:

- https://raw.githubusercontent.com/expressjs/express/dbac741a49a5a64336b70c06e85c2e2706e36336/lib/request.js
- https://raw.githubusercontent.com/expressjs/session/c10b2a383841766899f6dcf53c8aff8c7fd3d2e7/index.js
- https://raw.githubusercontent.com/cloudflare/cloudflare-docs/1603d9d13a2889c5792a287f2452440594fac225/src/content/docs/fundamentals/reference/http-headers.mdx

All three addresses opened successfully; targeted source finds displayed issecure and X-Forwarded-Proto. The fact text quotes selected source passages and distinguishes provider semantics from actual target settings. Workers, managed transforms and Pseudo IPv4 settings on the target were **not checked**; synthetic local headers cannot establish those settings or actual tunnel identity/cookie behavior.

Changes to invariant metadata, with binding sentences unchanged:

| Entry | Method before → after | Violated before → after | Rests on after |
|---|---|---|---|
| player-opaque-session-cookie | review → test | yes → no | express-session-cookie-lifecycle · session-secret-rotation · session-proxy-security |
| player-express-session-sqlite-store | review → review | yes → no | express-session-store-contract · node-sqlite-database |
| account-request-transport | review → test | yes → no | express-forwarded-protocol · session-proxy-security · cloudflare-client-address · cloudflare-forwarded-protocol |
| account-startup-configuration | review → test | yes → no | session-secret-rotation |
| account-schema-lifecycle | review → test | yes → no | node-sqlite-database |

The deployed Store entry retains review because local assembly tests alone cannot certify a running target. Its implementation is now present in the built production application. account-session-authorization and account-mutation-request-guards remain review/violated: complete route authorization and expected credential-field checks are not this slice. Generic mutation guards are tested against D-102 without falsely claiming complete coverage of that invariant.

Polish meaning sentences for every changed entry:

- express-forwarded-protocol: Express ufa protokołowi pośrednika po sprawdzeniu bezpośredniego adresu połączenia, lecz z listy bierze pierwszą wartość, więc aplikacja odrzuca listę sama.
- session-proxy-security: Biblioteka sesji bez osobnego obejścia proxy korzysta z oceny bezpiecznego połączenia dokonanej przez Express.
- cloudflare-client-address: Cloudflare przekazuje adres klienta, ale Worker albo przekształcenie nagłówków może tę informację zmienić lub usunąć.
- cloudflare-forwarded-protocol: Cloudflare ustawia protokół użyty przez klienta i zastępuje inną wartość przesłaną przez klienta.
- player-opaque-session-cookie: Rzeczywiście wydane ciasteczko przenosi losowy identyfikator sesji i ma wymagane ograniczenia hosta oraz dostępu.
- player-express-session-sqlite-store: Składana aplikacja korzysta z biblioteki sesji połączonej z rzeczywistym magazynem SQLite.
- account-request-transport: Niepełne lub niejednoznaczne dane pośrednika nie dopuszczają żądania do sesji konta.
- account-startup-configuration: Błędne ustawienia kont nie pozwalają serwerowi ogłosić gotowości.
- account-schema-lifecycle: Nieznana wersja bazy zatrzymuje start, a prawidłowe otwarcie zachowuje dane.
- account-server, zmienione Files: Nowy test transportu należy do części serwera kont; odpowiedzialność tej części i dozwolone zależności pozostają te same.

The required debt remains verbatim: **“Replacing the application container preserves the SQLite database of player accounts and saved game states.”** account-save-durable-storage remains Violated: yes, Method: review. This middleware slice does not supply container-replacement persistence evidence, target Argon2 measurement or saved-game storage. It clears no target-measurement debt.

## Reading reaches, choices and limitations

Read the handoff/selection, copied source passages and selected foundation entries, whole coding/testing and HTTP/password/database/Store guidelines, current application/storage/password modules, existing HTTP/startup/default-address tests, package/runtime source, production fixtures/helper and verification scripts. Only the selected foundation rows were found in plan.md; neither whole plan nor task was opened. Report 25 and planner/fixture reports were inputs about scope and evidence, never approval to import the discarded attempt.

Additional reading reaches:

- The pinned change/element methods, common rules, templates, examples and selected example entries, plus the complete short part map and pinned glossary, as required by those methods.
- Plan rows F06/F09/F11/F15/F17/F20f/F20g/F21/F22/F24d, located by identifier to resolve the selection's row references.
- The exact current account-save-durable-storage entry, to retain its full saved-game wording and debt accurately in this report.
- The root-supplied 29a-target-advance.md and revised spec.md:167, read after the root's steering message. This changes reporting of later integration, not this slice's security or test contract.

Implementation choices and rejected alternatives:

- Bound secret reads and reject nonregular files rather than use an unrestricted readFile; this prevents unbounded allocation and FIFO blocking, with a small explicit loop to maintain.
- Require canonical base64url round-tripping rather than decoded length alone; the latter admits alternate encodings and makes duplicate detection ambiguous.
- Reject raw origin delimiters/dot paths before relying on URL normalization; relying only on parsed search/hash can silently accept an explicitly forbidden empty component.
- Normalize IPv6 using the platform URL representation after isIP validation and fold mapped IPv4, rather than add a second IP package. Tests give independent equivalent spellings; runtime changes affecting normalization would surface there.
- Mark every transport-eligible response no-store, rather than attempt to predict whether the package will emit a cookie later. This conservatively disables caching even for anonymous requests carrying valid proxy metadata; anonymous internal health/assets without it retain static behavior. The cost is cache efficiency, not account correctness.
- Keep the single existing default-address test with its explicit prerequisite rather than duplicate a fixed-port test or weaken production refusal.
- Use real file/DB/HTTP tests and a test-only session consumer rather than a fake Store or prematurely implement account routes. The cost is that credential policy/authorization remain unproven until their slice.

The final Linux command skips exactly test_native_windows_readers_reject_nonterminating_cim_errors, test_native_windows_readers_keep_owned_child_in_healthy_observation and test_failed_descendant_query_still_terminates_known_main_process. Their guarded source was read; this run claims no native-Windows pass. The known Windows listener-enumeration baseline was not rerun. No target deployment, private signing-file creation/rotation, provider inspection, target measurement, public registration or browser acceptance ran. Test-owned resources used real synthetic inputs and their cleanup hooks; all owned verifier processes are exited. No unrelated shared daemon resource was removed.

Final target integration remains pending. Root's memo records origin/main at 2c1d64ca287d014eb4b6f86be03849b55838428e, with PR 31's settled mutation rule and full/focused test route. This slice intentionally keeps the declared older branch gate; later integration must preserve that upstream policy, reconcile colliding decision identifiers and rerun the merged full gate. The upstream tool choice is **not** globally unresolved. No simulation change or new tool adoption was made here.

## Retained-artifact sanitation

Following 29b-startup-log-redaction.md, reviewed all five 29-startup*.log files. Sanitized **29-startup-red-guards.log only**, replacing **6 occurrences** of complete synthetic session-cookie values (identifiers and signatures) with `[REDACTED_SESSION_VALUE]`. Cookie names and safe attributes, test names, assertion expectations/outcomes, stack anchors and counts remain intact. No raw fragment was copied into another record. The other four logs had zero such values and remained byte-identical. No encoded Argon2 hash or credential-bearing secrets/dummyHash/passwordHash field was found. UTF-16 encoding, BOM, line counts and CRLF counts were preserved. Sanitized log SHA-256: e631199b4c61cc6c020b35442ddd094ee20378e6db7d4e3ec3dde8cd9678d974.

Commands used: `rg --files --hidden docs/task-cycles/konta-graczy-i-logowanie/reports -g '29-startup*.log' -g '!cycle.md'` exited 0 and identified the five artifacts. The first `python -c` scan failed with SyntaxError (exit 1) because PowerShell removed its quotes; no file changed. The subsequent ASCII here-string piped to `python -` exited 0, but a byte-regex scan returned an invalid all-zero result against UTF-16 logs; this was not accepted as evidence. The corrected encoding-aware read-only `python -` scan exited 0, passed its positive text control and found six cookie occurrences in the guards log, zero in the other logs. The byte-preserving sanitation/check `python -` command exited 0 and asserted exact replacement-only content, unchanged line/CRLF counts, absence of every removed value and byte identity of each untouched file. Final read-only verification used `python -` to assert that every remaining cookie value is the explicit marker, exactly six markers occur in the guards log and none in the others, with no encoded password hashes; it exited 0. No code change, commit or test rerun accompanied this sanitation. Stopped owned runners retain local ephemeral execution evidence and are not copied into the record raw.
