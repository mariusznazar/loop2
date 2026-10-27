# Spec — Zakładanie konta, logowanie i wylogowanie gracza

- Task: `docs/task-cycles/konta-graczy-i-logowanie/task.md`
- Open choice: account/session persistence, authentication lifecycle, request trust, resource bounds, startup configuration, browser integration and evidence before deployment acceptance.

## Intent

A visitor creates an account, enters the existing headquarters, leaves through logout and can sign in again. Authentication persists across reloads and container replacement; game progress does not yet persist. The server protects accounts and the browser exposes the game only after server confirmation of a session.

These are autonomous intermediate technical choices under implement-task, not new human approvals. The task and K1–K13 remain binding. Answers and their costs stand in reports/02-designer-answers.md; the default-start invariant clarification stands in reports/04-spec-revision-handoff.md.

## Goals and non-goals

Deliver registration, login, current-account lookup, logout, durable accounts/sessions, bounded password work and attempts, same-origin JSON requests, authentication UI/loading states, first-kind guidelines, refusal tests, foundation entries and deployment instructions.

Do not add saves, mail, verification, recovery, blocking, an operator interface, backup service or second public server. Record the mail rule without implementing mail. Preserve the tunnel and existing game behavior, including empty team and empty Program group. Reload/fresh login starts newGame(). Task 16 owns future unsaved-progress behavior after logout/expiry; this task establishes no enduring policy about it.

## Constraints

- Base 7012abcfb55b4ba2b2836b574a2275eb1551df28 includes the delivered tunnel. Historical task Context does not restore a published port. Current D-10/D-13/D-15/D-17 apply.
- Node.js 24, Express 5, one serving process and npm package, separate browser/server builds, public files only, no server simulation. Use node:sqlite, express-session with a project Store and argon2 Argon2id.
- Public assets remain public under D-86. UI gating is not authorization of account data.
- Run repository tests only through npm test. Use real database/files/HTTP; manual browser evidence retains D-75/D-87/D-88 and assesses their return conditions.
- Existing design tokens, shared controls, focus rule and warning/text-disabled roles; no new token values, framework or permanent browser/pixel test suite.
- Agents do not mutate the server. Human actions are secret creation, installation of a changed deploy command if needed, request-head deployment and target-image measurement/public journey. Request remains a blocked draft until evidence exists.

## Decisions

### 1. API and credential validation

| Request | Input | Success |
|---|---|---|
| POST `/api/accounts` | email, password, passwordConfirmation | Create account, regenerate and persist browser session, then 201 with opaque account ID and normalized email. |
| POST `/api/session` | email, password | Verify, regenerate and persist browser session, then 200 with that same account representation. |
| GET `/api/account` | session cookie | 200 with the current account's ID and normalized email. |
| POST `/api/logout` | empty JSON object, session cookie | Destroy this browser's session, clear cookie, then 204. |

No endpoint accepts an account ID as authority to select the acting account. GET account and POST logout without a valid session return JSON 401. A successful credential transition replaces this browser's session, not other browsers'. No list/profile endpoint.

Expose no hashes, session IDs, secrets, SQL errors or stacks. Account responses are no-store. New errors have a machine-readable code and one user-facing message; unmatched API requests retain their existing JSON 404 contract, never HTML. Guards run before every actual state-changing route. An unmatched method/path has no mutation and may retain 404 rather than acquire authentication/body requirements.

Normalize email by ECMAScript trim and lowercase; require exactly one @ and nonempty sides, without dot/DNS/RFC/ASCII restrictions. Store this normalized value under a unique database constraint; SQLite ASCII NOCASE is not the normalization algorithm. No arbitrary email substring restriction. Bound total JSON to 16 KiB.

Count passwords in Unicode code points, inclusive 12–128, preserving content without trim/normalization. Allow emoji, whitespace and paste. Confirmation equals password exactly. Browser UTF-16 minlength/maxlength cannot be the authoritative check. Use the same explicit semantics for feedback; use a text input with an email hint rather than stricter native email validation. Password fields mask content and support password managers.

Duplicate registration is 409 with “Konto z tym adresem już istnieje.” Login rejection is “Nieprawidłowy adres e-mail lub hasło.” for unknown account and wrong password, with the same response shape. Bad credential lengths/formats do not invoke Argon2 and retain that generic login message. Malformed JSON, wrong types, excessive size, wrong media type or origin get JSON 4xx before writes/hashing; never coerce arrays, objects or numbers to strings. Structurally malformed requests do not count as admitted credential checks.

Choose a small explicit contract over a schema/client framework. One giant app.ts would mix HTTP, policy and persistence; the units below keep their failure boundaries clear. Future contract changes update server and browser together.

### 2. SQLite and schema lifecycle

One application-owned connection opens before readiness and closes on shutdown/start failure. Database `/app/data/accounts.sqlite` lives in Compose-managed named volume `loop2_accounts` mounted at `/app/data`. The image creates that directory owned by uid/gid 1000 before USER node. Check writes on a genuinely fresh volume as node; image ownership alone is not proof.

Version 1 has accounts with opaque random primary ID, unique normalized email, encoded password hash and creation time; sessions have primary session ID, account foreign key, serialized express-session data and absolute expiry. Index expiry and account ID. Session data holds account ID/library cookie metadata, never credentials. Add no unused saves/reset/mail/verification/blocking columns.

Enable foreign keys, bounded busy timeout, parameterized prepared statements, WAL and full synchronization. Initialize schema and version transactionally. Existing version 1 opens without resets; newer unknown schema fails closed. No destructive migration framework. Duplicate insert races produce the duplicate-account response. No transaction spans asynchronous hashing or an HTTP response.

Reject expiry on read even before cleanup. Prune indexed expired rows on startup and periodically with a bounded lifecycle timer; unref/clear the timer on disposal. Touch updates existing unexpired rows only, preserves the later expiry under out-of-order requests and cannot resurrect logout. Ordinary authenticated requests do not mutate identity or need upsert; fresh authenticated creation is a distinct path. Test delayed touch after logout.

Hash before account insertion. Success requires durable account and session. If session storage fails after account insert, return unavailable with no success cookie and leave the valid account usable by subsequent login, rather than deleting it in a race. The error wording must not claim the account never existed. This is a failed server operation, not successful registration.

File SQLite meets container replacement; in-memory storage does not. The selected built-in driver avoids another driver/ORM. Versioned startup prevents old code reinterpreting newer schema. Short synchronous operations suit one small process; measured contention may later change that. Rollback restores code, not historical accounts. Pre-account code leaves the volume intact but has no account feature; account-aware code can reuse it later. No down -v, volume deletion or prune in recovery.

### 3. Sessions

Cookie `__Host-loop2.sid`: library-generated random opaque ID, Path=/, no Domain, Secure, HttpOnly, SameSite=Strict, maxAge 30 days. Set saveUninitialized=false, resave=false, rolling=true. The custom Store implements get/set/touch/destroy and propagates database failures. Session middleware uses the app's verified proxy policy, not a separate unconditional proxy bypass.

Mount session handling before static serving as well as account routes so each request with a valid session refreshes expiry/cookie, including asset requests. Anonymous reads create no record/cookie. Supply time to storage/policy boundaries so tests advance without waiting 30 days; equality to expiry is invalid. Responses renewing cookies cannot be publicly cached.

Regenerate on successful credentials to prevent fixation, assign account identity and await save before success. Missing/tampered/unknown/expired/deleted sessions authorize nothing. Logout awaits destroy and clears the same cookie scope. Failed destruction is not successful logout; expired-session 401 may clear its obsolete cookie. Authentication failure creates no authenticated session. Parallel reads touch rather than rewrite identity, and cannot revive expired/deleted records.

Choose package sessions plus revocable SQLite records over self-contained tokens or a second signing mechanism; future blocking needs revocation and the task already selected the library.

### 4. Transport trust and Origin

Production selects explicit cloudflare-tunnel mode on the private two-service Compose topology. Express trusts exactly the immediate hop for protocol, not arbitrary forwarded chains. Before account work require one X-Forwarded-Proto=https and one syntactically valid CF-Connecting-IP, rejecting duplicated/list/malformed values. Use that address, normalized for equivalent IP representations, as the limiter key; never trust an attacker-selected leftmost X-Forwarded-For, X-Real-IP or Forwarded. The transport adapter supplies the client address explicitly; req.ip need not be policy authority. Forwarded Host never chooses the expected origin.

The boundary is private topology, not the header's name. Do not publish the application port or silently apply this policy to arbitrary development listeners. Static files and internal anonymous health probes need no proxy metadata; absent metadata cannot create or authorize an account session. Account requests without required transport metadata are refused. Local synthetic headers prove parser/policy behavior, not the real tunnel. Target acceptance checks actual secure-cookie issuance and canonical address handling. If Workers, transforms removing/replacing address headers or Pseudo IPv4 overwrite are present, review their effect before acceptance; this spec does not claim those settings were inspected.

Every mutating route requires exactly the configured serialized HTTPS Origin, including port when present; missing/null/duplicate/foreign/suffix-lookalike values fail. Do not derive it from Host. Accept application/json with optional charset only, reject compressed body inflation, cap at 16 KiB, and validate an object of expected fields. No CORS allowance or URL-encoded/text/plain workaround. Logout obeys the same guards; GET account is read-only and session-protected.

Configured local checks may use explicit loopback-proxy mode: trust a loopback peer only, require forwarded https and use the actual local peer as client identity, ignoring supplied Cloudflare headers. Real-browser checks use a temporary local HTTPS proxy and fixed HTTPS origin, preserving Secure. Ordinary direct mode trusts no forwarding. The local fixture adds no production service or insecure cookie mode.

Generic trust-proxy=true/leftmost forwarded IP was rejected as spoofable. Fixed container IP/subnet was rejected as added coordination without benefit over the existing closed topology. The chosen policy depends on topology and Cloudflare semantics; automated crafted-input checks and actual deployment checks prove different aspects.

### 5. Password work and rate limits

Provisional profile: Argon2id, memoryCost 65536 KiB, timeCost 3, parallelism 1, hashLength 32, package-generated salt; at most two active hash/verify operations. No waiting queue: capacity returns the limitation response immediately. One gate covers registration hashing, known-account verify and unknown-account dummy verify; release on every completion/error. No hash fallback or weaker production/test profile.

Create one dummy hash with the configured profile before configured readiness; unknown-account login verifies against it through the same gate. This avoids an obvious no-hash path but does not claim identical timings. Reject invalid/oversized credentials before expensive work. Ordinary logs/benchmark output contain no real email/IP/password/hash/cookie/secret.

| Counter | Behavior |
|---|---|
| Email | Five failures in rolling 15 minutes start a 15-minute lock at failure five. During lock all attempts, including correct credentials, fail. Success clears pre-lock email failures. |
| IP login | Twenty failures in rolling 15 minutes block further login attempts until history permits one. Success does not clear IP failures. |
| IP registration | Five successfully created accounts in rolling one hour; invalid/duplicate requests do not consume successful-account slots. |

Reserve email/IP failure capacity before asynchronous credential work; convert to failure or release on success. Registration reserves a creation slot and converts it after insert. Reservations count toward admission to prevent parallel overshoot. Cancelled requests release reservations only after actual work finishes; disconnect does not release active hashing early.

Keep at most 10,000 live email keys and 10,000 live IP keys (IP histories combined). Use a fixed-size digest of normalized email as the limiter key, avoiding retained arbitrary-size strings. Expire empty entries, never evict a live restriction to admit a new key. Capacity fails closed, not bypasses tracking. History arrays are bounded by thresholds, reservations by the hash gate. Restart/deployment resets all counters.

All limitations show “Za dużo prób. Spróbuj ponownie za kilka minut.” Retry-After may report a known wait without replacing the text. Capacity refusal is not a failed credential check. Item 5 of orchestrator answers settles the unspecified email collection window. Lifetime accumulation was rejected because stale partial failures fill bounded memory indefinitely; rolling windows let widely spaced attempts avoid email lock. Durable counters were already rejected by the task; unbounded maps/queues defeat the resource goal. Capacity values remain reversible engineering bounds.

### 6. Startup, secrets and measured deployment

Configured startup uses LOOP2_DATABASE_PATH, LOOP2_SESSION_SECRET_FILE, LOOP2_PUBLIC_ORIGIN and LOOP2_PROXY_MODE. Production Compose supplies the durable path, mounted secret path, `https://loop2.mariusznazar.com` and cloudflare-tunnel mode. Validate the origin as HTTPS with no credentials, path beyond root, query or fragment, retaining its serialized origin for comparisons. Production requires all settings, validates before readiness and has no generated-key/in-memory/MemoryStore fallback. Partial/invalid explicit configuration fails everywhere. Preserve invalid-port/occupied-address behavior and dispose resources on failure. Production/container smoke tests supply isolated explicit account configuration; they must not silently exercise the unconfigured developer mode.

Non-production with none of those four settings retains static/developer startup. Known account routes return explicit JSON 503; UI shows account unavailability, never an anonymous game. Production forbids this mode. Tests construct configured apps with explicit real temporary SQLite and test secrets, avoiding process-wide environment changes shared across cases.

The default-address guarantee applies after startup configuration/resource validation succeeds: eligible configurations include wholly unconfigured non-production startup and fully configured startup that passes validation of account settings and required resources. With neither listen variable set, an eligible start retains exactly the readiness address `Loop: http://127.0.0.1:3000`, or the existing nonzero address-in-use outcome naming `127.0.0.1:3000`. Missing production settings and every partial/invalid explicit account configuration refuse readiness before listening; they are outside that conditional address guarantee. Amend account-server-default-address through the invariant skill to state this precondition and derive it from the task's external-secret requirement and resulting startup validation, rather than retaining the obsolete unconditional scope. The occupied-address invariant's nonzero/no-readiness promise remains unchanged.

The existing single default-address test explicitly establishes wholly unconfigured non-production startup: remove both inherited listen variables and all four account variables, and select non-production. Separate startup tests check missing, partial and invalid production configuration refusing before readiness; fully configured successful startup uses ephemeral ports. These cases follow D-49 and do not introduce a second default-port test. The intentional existing invariant/test amendment reconciles the accepted account requirement; it is not silent coverage weakening or a claim of human approval. Keeping the old unconditional entry would be false, while weakening production validation would allow unsafe startup.

Host `/etc/loop2/session-secrets` is root:1000 mode 0440, granted only to app at `/run/secrets/loop2_session_secrets`. Retain existing tunnel token, directory permissions and connector-only grant. The application reads the mounted secret without traversing the host directory. Human creation/replacement preserves the directory's tunnel access; file-backed Compose permission attributes do not remap host permissions.

Secret format: UTF-8 JSON array of distinct base64url strings, each encoding exactly 32 random bytes, newest first. Allow surrounding whitespace, reject empty/malformed/duplicate/short values, and bound input file to 16 KiB. Supply ordered keys to express-session. Invalid/unreadable input reports configuration setting/path, never contents.

Human rotation prepends a private random key, updates private backup, preserves ownership/mode and deploys to remount/reload. Old signatures remain accepted; rolling responses use the new key. Remove old key after at least 30 days from the last deployment able to sign with it, then redeploy; restoring old configuration resets that retirement reference. No secret in argv, logs, environment values, repo or request text. Update both deploy skill copies for these operations, database location and data-preserving rollback.

Build and exercise the actual image locally at 512 MiB with fresh disposable volume/secrets, verifying node ownership and persistence across replacement. Provide a bounded measurement executable in the built image importing the production profile/gate, using synthetic in-memory credentials, never opening account DB or session secrets. Report exact application commit, verified image identity, Node/argon2 versions, profile/gate, concurrency, operation counts, timings, peak process/container memory, memory limit and errors. Check correct/wrong verification, two active operations and overload refusal; run after warmup at least 20 hash and 20 verify operations at concurrency two. Bound total execution and exit nonzero for errors/budget failure.

On Mikrus the human runs an isolated disposable container from the deployed image, with the same 512 MiB bound, rather than an extra hashing load inside the live app. Verify image against deployed commit. Collect cgroup/container peak including native Argon2 memory: heapUsed alone is insufficient. Require no OOM/restart, peak below 80% of 512 MiB and correct bounds; remaining headroom is for application work. Report latency without inventing a player SLA. Failing candidate requires tuning code, rebuilding, redeploying and repeating exact-image measurement. Local/old-image evidence cannot certify target code.

The profile, two-slot candidate and 80% margin are engineering choices, not prior measured Mikrus facts. Keep player-argon2-deployment-check unchecked until target evidence. Request remains blocked until measurement and public browser journey. Prepare installed-script changes only if necessary and extract them from exact request commit; no agent server mutation.

### 7. Browser and control lifecycle

Start with title/footer and session-check waiting UI, no game/program construction. GET account chooses authenticated shell or forms. A 401 shows forms; network/server error gives one warning plus retry, not false signed-in/out state. No localStorage identity or cookie parsing.

Both required forms use shared controls and visible labels. Extend the shared text field with a masked-password variant rather than separately styled inputs. While submitting, disable fields/buttons, show Logowanie… or Zakładanie konta… in text-disabled and prevent overlapping transitions across both forms. Restore controls and one warning under the originating form on refusal/network error. Render plain text, not server HTML. Clear password inputs on leaving and never persist credentials in the game model.

Successful create/login/restoration mounts newGame(), existing empty team and Program group. Shared Wyloguj button stands beside title. During logout show disabled waiting state. Success or explicit expired-session response disposes game and returns to forms. Network/server failure keeps game and shows warning because server outcome is uncertain; do not claim logout succeeded.

Game mount exposes disposal: stop interval, detach owned events/DOM. Extend clock with stop/dispose so repeated login does not accumulate timers or keep hidden games running. Serialize transitions and invalidate stale async responses so they cannot remount/overwrite newer state. Current recreation is pre-save behavior, not a permanent unsaved-progress rule. No heartbeat/save retry feature.

Add loading/password/form-error samples to the existing kitchen-sink, revise D-44/styleguide through its skill, use existing tokens/wrapping and keep keyboard focus. Capture real-browser forms, waiting/error, authenticated header/headquarters, logout, narrow layout/focus and kitchen-sink loading using synthetic local data. Public post-deployment account creation/login journey belongs to the human under D-12 because it changes server data; agent may inspect signed-out public UI.

### 8. Units and code kinds

Paths below identify the designed first files; the maker may adjust names while preserving interfaces and honest first-file designation.

| Unit | Contract/dependencies | Kind |
|---|---|---|
| src/server/database.ts | Schema/open/close, account/session operations, supplied clock; owns node:sqlite/SQL, no HTTP/hash. | New database-access exemplar. |
| src/server/session-store.ts | Express Store callback/expiry adapter over DB, no route policy. | New session-store exemplar. |
| src/server/passwords.ts | Argon2 hash/verify and bounded gate/profile, no DB/HTTP. | New password-hashing exemplar. |
| src/server/account-policy.ts; optional rate-limits.ts | Normalize/validate and reserve/complete attempts, supplied clock, HTTP-independent outcomes. | New account-policy; first file exemplar, others copies. |
| src/server/account-routes.ts; optional transport middleware | HTTP guards/identity/sequencing over preceding units. | Existing http-application, app.ts exemplar retained. |
| src/browser/account-api.ts | Relative fetch, bounded abort timeout, response validation/typed outcomes, no DOM/game state. | New browser-api-client exemplar. |
| src/browser/view/account-screen.ts and shell/clock integration | Controls, transitions, game lifecycle. | Existing browser-module. |
| Runtime/build/deploy/measurement entrypoints | Compose/start/check existing units, no duplicate account policy. | Existing deferred entrypoint/build/deployment kinds when responsibilities match. |

Through maintain-coding-guidelines, each genuinely new kind gets its first-file exemplar, kind guidelines and coding.md row. Do not invent a new kind solely for a new filename or disguise a new responsibility as deferred. Measurement is an entrypoint using password operations. Return unexpected additional kinds to orchestrator. Existing exemplars and deferred HTML/CSS/build/deployment decisions remain.

Browser API/screen belong to browser-view; map gains account-server protocol dependency. Account-server description gains persistence. Assign each new test path exactly once; scripts belong to build-tools unless an operational deployment entrypoint lives under deploy. Include new tests in npm test. No foundation reorganization.

### 9. Tests and evidence

Use existing Node/Python tools, real temporary DB/files/local HTTP, bounded readiness/requests and cleanup on failures. Test account policies through real HTTP/DB where appropriate; do not silently broaden glossary unit test, currently simulation/view logic. View-state tests may be unit tests; real focus/events/rendering remain manual evidence.

Protect concrete faults: concurrent duplicate normalized email; code-point boundary/exact preservation; missing/tampered/expired/deleted session; foreign Origin/non-JSON/oversized requests; forwarded-chain spoof changing limiter key; sixth registration or sixth/twenty-first failure admitted concurrently; delayed touch resurrecting logout/shortening expiry; excess native password concurrency; success before persistence; request-supplied account ID changing authority; container replacement losing records; malformed secrets/new schema reaching readiness; unconfigured production falling back; game mounted before identity; timers left by logout.

At least one direct unauthorized-account refusal test carries its invariant and is seen failing once with controlled temporary guard removal then restoration. Every new invariant test has fail-once evidence with exact mutation/restoration, npm test command and exit. Do not leave weakened code or claim static grep proves session persistence/cookie safety.

Through maintain-testing-guidelines extend authorization table: visitor create/login allowed subject to guards; signed-in player reads own account/destroys own session; absent valid session denied; supplied other ID grants nothing; wrong Origin/media/transport denied before mutation. Bind rows to new decisions/invariants. Preserve public-file and unknown-API protections.

Fulfil D-73's adopted mental-mutation obligation: author names plausible faults and assertions that catch them. This task makes no new mutation-tool choice and changes connection-based accounts/browser auth, not simulation/computational drawing. The old task-base guideline gap is settled upstream by PR 31 at 2c1d64c; preserve its adopted mutation rule and full/focused gate during final reconciliation, combine the account permission/refusal additions, and report the final merged state rather than an unresolved tool choice. See reports/29a-target-advance.md; no unrelated audit.

## Foundation entries

Actual entries go only through project element skills. Foundation/return stages assign identifiers, precise binding sentences and methods; this spec changes no foundation.

| Entry | Meaning |
|---|---|
| K1/K2 decisions | Anonymous forms/authenticated headquarters; header logout ends one browser session and hides game, with no future save policy. |
| K3/K4/K5 decisions | Password range, email normalization/loose format and required duplicate/login messages. |
| K6/K7/K8 decisions | Independent sliding 30-day sessions, required attempt thresholds/message, bounded in-memory counters/hash work; distinguish autonomous window/capacity clarifications from human words. |
| K9 decision | Strict cookie, exact Origin and JSON-only state changes. |
| K10 decision | Future mail 30/hour global, 3/hour/address, refusal above, no monthly cap; no implemented mail invariant. |
| K11 / D-13 | Session-file permissions, ordered rotation/private backup alongside unchanged tunnel-secret provisions. |
| K12 / D-44 | Server waiting states, disabled controls, labels/warnings and kitchen-sink samples. |
| K13 / D-12/D-16 | Preserve binding access restrictions, correct owner-only-before-public-launch rationale; put access review before account-phase closure in a binding review/return field, not only rationale. |
| D-17 / loop2-host-sharing | Own durable volume and app session-secret read-only grant alongside connector grant; retain neighbor/resource protections. |
| account-server-default-address invariant amendment | Through the-way-record-invariant, condition its unchanged default address/address-in-use result on successful startup configuration/resource validation, explicitly including wholly unconfigured non-production and fully configured valid startup; derive that precondition from the task's external-secret requirement and this startup design. Adapt the existing single test to its explicit non-production/no-account-settings precondition; retain D-49 and leave account-server-occupied-address unchanged. |
| Three projected decisions assigned fully | Argon2id with explicit measured cost; express-session own SQLite Store; shared public HTTPS origin/relative API. |
| Authorization decision/invariants | Session account only and browser-session logout; direct unauthorized denial; Origin/JSON/transport cheap refusal checks. |
| Exemplar decisions | First files and kind guidelines/index through maintain-coding-guidelines. |
| Part map | New protocol dependency, persistence responsibility and exact new files/tests/measurement ownership. |
| Environment facts | Versioned package/runtime Store/Argon2/SQLite/proxy contracts actually relied upon; never invented target measurements. |

Task-assigned full invariants: player-self-registration, player-password-login, email-verification-nonblocking, player-argon2-password-hash, player-argon2-deployment-check, player-opaque-session-cookie, player-express-session-sqlite-store, account-save-durable-storage, account-save-sqlite-access and loop2-shared-public-origin. Record account-save-durable-storage in full exactly as assigned: "Replacing the application container preserves the SQLite database of player accounts and saved game states." Keep its actual debt visible until the full rule has evidence; account/session replacement checks prove only their stated portion and do not prove saved-game preservation. This task does not implement saved-game round trips. Target hash check remains unchecked until measured evidence; no foundation assertion may misreport evidence.

Task 15 implements portions, but does not write the full projected future server/browser split, unrestricted account use with blocking, password/reset, session with blocking, account/save persistence or SQLite backup-release checks. Assigned writers remain tasks 16, 19, 21 and 17 as the frozen task specifies. Preserve D-07's no-game-computation rule; do not add future save/block/reset clauses early. Ordinary account/session vocabulary needs no new glossary entry.

## Left to the maker

Choose final decomposition/names within these interfaces, SQL column names, warning text beyond required messages, error codes, fixtures, measurement serialization and layout dimensions within styleguide exemptions. Verify pinned package availability/exports during implementation; selected libraries are fixed, incompatible changes return to orchestrator.

Implement and test without inventing target-host success, secret values or server permission. Profile adjustments require measured memory/latency proposal and exact-image remeasurement after correction. Human gets concrete prepared commands and blockers at the draft request, not an intermediate architecture question.
