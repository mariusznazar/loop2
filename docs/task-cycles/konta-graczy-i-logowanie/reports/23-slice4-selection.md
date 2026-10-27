# Exact slice 4 selection

````markdown
### Slice 4 — Startup configuration, transport and rolling sessions

- **Goal:** Implement mandatory configured production startup, wholly unconfigured non-production static/503 mode, ordered secret parsing and lifecycle cleanup. Compose real DB/Store/password readiness and rolling session middleware before static files; anonymous assets and internal health probes remain public. Implement exact transport/Origin/JSON/size guards as HTTP middleware. Known configured account routes can remain unavailable until Slice 5; unmatched API retains JSON 404. Reconcile only default-address invariant/precondition and its existing single test. Configuration is the deferred entrypoint kind; transport is http-application. No generated secret, MemoryStore, insecure cookie or unrestricted proxy trust. Update reached version contracts and ownership through skills.
- **Change:** `src/server/configuration.ts` · `src/server/transport.ts` · `src/server/main.ts` · `src/server/app.ts` · `tests/startup.test.mjs` · `tests/transport.test.mjs` · `tests/invariants/test_account_server_default_address.py` · `foundations/environment_facts.md` · `foundations/invariants.md` · `foundations/part_map.md`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `docs/task-cycles/konta-graczy-i-logowanie/task.md:14-37` To do and Acceptance criteria · `docs/task-cycles/konta-graczy-i-logowanie/task.md:208-215` Out of scope · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:6-25` Intent, Goals and non-goals, Constraints · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:138-167` Units and code kinds; Tests and evidence · `foundations/decisions.md:1339-1507` D-73–D-85 · `foundations/decisions.md:1547-1559` D-89 · `foundations/glossary.md:94-104` unit test; integration test · `foundations/invariants.md:572-581` node-test-selection · `foundations/part_map.md:103-126` agent-workflow; product-foundation · `guidelines/coding-http-application.md` · `foundations/decisions.md:3-38` D-01–D-02 · `foundations/decisions.md:94-154` D-05–D-07 · `foundations/decisions.md:752-766` D-37 · `foundations/decisions.md:932-946` D-49 · `foundations/decisions.md:1508-1520` D-86 · `foundations/part_map.md:56-102` account-server; build-tools · `foundations/invariants.md:5-34` account-server-runtime/typecheck/express-http · `foundations/invariants.md:45-104` API/one-serving-process/build/package/occupied-address · `foundations/invariants.md:532-541` public-file-access · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:64-85` Sessions; Transport trust and Origin · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:104-124` Startup, secrets and measured deployment · `docs/task-cycles/konta-graczy-i-logowanie/task.md:64-66` Q8 · `docs/task-cycles/konta-graczy-i-logowanie/task.md:70-72` Q10 · `docs/task-cycles/konta-graczy-i-logowanie/task.md:199-204` K6–K11 · `docs/task-cycles/konta-graczy-i-logowanie/reports/04-spec-revision-handoff.md` · `foundations/invariants.md:502-511` account-server-default-address · `foundations/decisions.md:195-210` D-10 · `foundations/decisions.md:253-268` D-13 · `foundations/environment_facts.md:196-201` compose-file-secret-permissions · `tests/http.test.mjs` · `compose.yaml` · `Dockerfile` · `.agents/skills/the-way-record-environment-fact/SKILL.md` · `.agents/skills/the-way-record-invariant/SKILL.md` · `.agents/skills/the-way-update-part-map/SKILL.md` · `foundations/decisions.md:1650-1662` D-94 · `foundations/decisions.md:1663-1677` D-95 · `foundations/decisions.md:1723-1735` D-99 · `foundations/decisions.md:1766-1778` D-102 · `foundations/decisions.md:1794-1807` D-104 · `foundations/decisions.md:1808-1821` D-105 · `foundations/decisions.md:1822-1835` D-106 · `foundations/decisions.md:1836-1848` D-107 · `foundations/decisions.md:1849-1863` D-108 · `foundations/decisions.md:1864-1876` D-109 · `foundations/decisions.md:1891-1903` D-110 · `foundations/decisions.md:1877-1890` D-111 · `foundations/decisions.md:1904-1918` D-112 · `foundations/decisions.md:1919-1932` D-113 · `foundations/invariants.md:642-651` player-opaque-session-cookie · `foundations/invariants.md:652-661` player-express-session-sqlite-store · `foundations/invariants.md:692-701` account-session-authorization · `foundations/invariants.md:702-711` account-mutation-request-guards · `foundations/invariants.md:712-721` account-request-transport · `foundations/invariants.md:722-731` account-startup-configuration · `foundations/invariants.md:732-741` account-schema-lifecycle · `foundations/invariants.md:752-761` account-session-storage · `foundations/invariants.md:742-751` account-database-schema · `foundations/invariants.md:632-641` password-operation-gate · `foundations/environment_facts.md:226-231` express-session-store-contract · `foundations/environment_facts.md:232-237` session-secret-rotation · `foundations/environment_facts.md:238-243` node-sqlite-database · `foundations/environment_facts.md:250-255` express-session-cookie-lifecycle · `foundations/environment_facts.md:256-261` cookie-serialization-validation · `src/server/passwords.ts` · `src/server/database.ts` · `src/server/session-store.ts` · `guidelines/coding-password-hashing.md` · `guidelines/coding-database-access.md` · `guidelines/coding-session-store.md` · `tests/invariants/account_container_support.py` · `node_modules/express-session/index.js` · `node_modules/express-session/session/cookie.js` · `node_modules/express-session/session/session.js` · `docs/task-cycles/konta-graczy-i-logowanie/reports/15-slice2-report.md:11-19` · `docs/task-cycles/konta-graczy-i-logowanie/reports/17-slice2-fix-report.md` · `tests/invariants/loop2_invariant_support.py:551-631` · `package.json` · Foundation rows F06, F09, F11, F15, F17, F20f, F20g, F21, F22, F24d.
- **Model:** same — Startup disposal, cookies on static responses and proxy/input guards interact across settled contracts.
- **Risk:** trust boundary — configuration, session key, forwarded identity, Origin/media/body
- **Checks:** Start failing production missing/partial/invalid configuration cases plus explicit valid default-start precondition. Exercise real middleware through local HTTP for duplicate/list/malformed forwarded headers, canonical equivalent addresses, spoofed X-Forwarded-For/Host, wrong Origin and non-JSON/oversized/compressed input. Use real files/DB and bounded waits/cleanup. Check old signatures accepted, newest signing, rolling asset requests, no anonymous cookie/record and no public caching of renewal. Run npm test before/after, prove new invariant refusal checks fail once under mutations, restore. Run python -B .the-way/elements/common/foundation_check.py. The production image fixtures of Slice 3 must pass without developer mode.
- **Depends on:** Slice 3 · Foundation rows F06, F09, F11, F15, F17, F20f, F20g, F21, F22, F24d.
- **Dispatch reads to materialize:** src/server/passwords.ts, database.ts and session-store.ts, with all three new kind guidelines. Add actual files/ranges once produced and rerun slice_size.py before execution; do not treat the current size as counting unborn source. Read any newly created guideline of a kind this slice changes whole.

````

Source: `docs/task-cycles/konta-graczy-i-logowanie/task.md:14-37`

````markdown
### To do

1. Gracz zakłada na serwerze testowym konto adresem e-mail, hasłem i powtórzonym hasłem, bez zatwierdzenia przez właściciela i bez potwierdzania adresu, a po założeniu konta jest od razu zalogowany i trafia do siedziby (pytanie 4).
2. Serwer przyjmuje hasło od 12 do 128 znaków dowolnego rodzaju, bez wymogu cyfr i wielkich liter; adres e-mail przyjmuje z obciętymi spacjami na początku i końcu, porównuje go bez rozróżniania wielkości liter i sprawdza tylko postać „coś@coś”; przy adresie, który ma już konto, gracz widzi „Konto z tym adresem już istnieje.” (pytanie 5).
3. Gracz niezalogowany widzi tylko ekran z dwoma formularzami: „Zaloguj się” (adres e-mail, hasło) i „Załóż konto” (adres e-mail, hasło, powtórzone hasło); siedziby ani panelu programu nie widać, dopóki gracz się nie zaloguje (pytanie 4).
4. Gracz loguje się adresem e-mail i hasłem i trafia do siedziby, a przeładowanie strony z ważną sesją prowadzi prosto do siedziby; nieudane logowanie pokazuje jeden komunikat „Nieprawidłowy adres e-mail lub hasło.” bez wskazania, co się nie zgadza (pytania 4 i 5).
5. Przycisk „Wyloguj” stoi w nagłówku strony obok tytułu; wylogowanie unieważnia na serwerze rekord sesji tej przeglądarki, po czym wraca ekran formularzy, a gry z przeglądarki nie widać (pytania 4, 6 i 16).
6. Żądanie konta bez ważnej sesji serwer odrzuca odpowiedzią błędu API, a nieznane żądanie `/api/` dalej dostaje błąd API, nigdy stronę gry.
7. Przeglądarka trzyma losowy identyfikator sesji w ciasteczku ograniczonym do adresu loop2, z ustawieniami Secure i HttpOnly; serwer prowadzi sesje przez `express-session` z własnym magazynem opartym na `node:sqlite`, nie przez domyślny `MemoryStore`. Sesja jest ważna 30 dni od ostatniego żądania i przedłuża się przy każdym; gracz może być zalogowany w kilku przeglądarkach naraz, każda z własną sesją (pytanie 6).
8. Serwer zapisuje dla hasła skrót Argon2id z biblioteki `argon2` i sprawdza nim hasło przy logowaniu; ustawienia kosztu są jawne i dobrane po pomiarze równoległego tworzenia i sprawdzania skrótów w docelowym obrazie kontenera na Mikrusie.
9. Konta i sesje leżą w bazie SQLite, do której serwer sięga przez wbudowany moduł `node:sqlite`, w pliku na trwałym miejscu poza wymienialną warstwą kontenera, tak że wdrożenie nowego commitu, które wymienia kontener, zachowuje konta. Plik bazy leży w nazwanym wolumenie Dockera, który zakłada samo wdrożenie (pytanie 15).
10. Po 5 nieudanych logowaniach na jeden adres e-mail serwer odrzuca kolejne próby tego adresu przez 15 minut; z jednego adresu IP przyjmuje najwyżej 20 nieudanych logowań na 15 minut i najwyżej 5 nowych kont na godzinę; liczenie skrótów haseł naraz ogranicza tak, żeby zmieściło się w pamięci kontenera, z liczbą ustaloną pomiarem z punktu 8. Liczniki stoją w pamięci procesu serwera, z górną granicą liczby śledzonych adresów, a restart albo wdrożenie je zeruje. Gracz, którego próby ograniczono, widzi „Za dużo prób. Spróbuj ponownie za kilka minut.” (pytanie 7).
11. Ciasteczko sesji ma ustawienie `SameSite=Strict`, a serwer odrzuca każde żądanie zmieniające stan, którego nagłówek `Origin` nie jest adresem loop2, i przyjmuje dane tylko jako JSON (pytanie 8).
12. W fundamencie staje zasada ograniczania wysyłki wiadomości o koncie, którą stosują zadania 20 i 21: serwer wysyła łącznie najwyżej 30 wiadomości na godzinę i najwyżej 3 na jeden adres na godzinę, a ponad pułap wiadomość nie wychodzi i gracz widzi, że ma spróbować później (pytanie 9).
13. Sekret podpisu sesji leży w pliku na serwerze poza checkoutem, z właścicielem root, grupą o numerze 1000 i prawami 0440 (odczyt dla roota i dla użytkownika `node`, którym w kontenerze działa proces gry, nic dla innych), który Compose przekazuje kontenerowi, a jego kopia stoi w prywatnej notatce właściciela. Przy wymianie nowy sekret stoi przed starym: serwer podpisuje nowym, a ciasteczka podpisane starym dalej przyjmuje, więc wymiana nie wylogowuje graczy; stary sekret usuwa się po czasie ważności sesji z punktu 7 (pytania 10 i 14).
14. Serwer bierze protokół i adres gracza z nagłówków pośrednika szyfrowanej drogi od Cloudflare, którą wprowadza zadanie 22 szyfrowana-droga-do-serwera (Cloudflare Tunnel z `cloudflared`, pytania 1 i 2), tak że bezpieczne ciasteczko sesji działa na serwerze testowym, a progi na adres IP z punktu 10 liczą adres gracza.
15. Kontrolka, która czeka na odpowiedź serwera, ma stan oczekiwania (loading), pokazany na stronie wszystkich stanów: na czas oczekiwania przycisk jest wyłączony (tekst w `text-disabled`), jego napis zmienia się na „Logowanie…” albo „Zakładanie konta…”, a pola formularza są zablokowane; odmowa serwera i brak połączenia stoją jednym zdaniem pod formularzem w roli `warning` — przez `maintain-styleguide`, ze zmianą D-44 (pytanie 11).
16. Skill `loop2-deploy` (`.claude/skills/loop2-deploy/` i jego kopia w `.agents/skills/loop2-deploy/`) mówi, gdzie leży sekret podpisu sesji i jak się go wymienia, gdzie leży plik bazy kont oraz co wycofanie wdrożenia robi z kontami w bazie (WAY-139, pytanie 13).
17. Pierwszy plik każdego nowego rodzaju kodu, który powstaje w tym zadaniu — wśród nich pierwszy plik sesji (`guidelines/coding.md:221`: „Wzorce sesji, zapisu gry i poczty powstaną przy pierwszych implementacjach”) — zostaje wzorcem swojego rodzaju, z wytycznymi rodzaju i wierszem w indeksie `guidelines/coding.md` — przez `maintain-coding-guidelines` (WAY-200). Plików sesji ani dostępu do bazy produkt dziś nie ma (`src/server/` ma tylko `app.ts` i `main.ts`, a `app.ts` żadnej trasy `/api/`; loop2 `9a5f360`), więc to pierwsze pliki swoich rodzajów, nie wybór wzorca spośród istniejących plików, który według `guidelines/coding.md:222` poprzedza porównanie. Trasy kont należą do rodzaju `http-application`, który ma już wzorzec `src/server/app.ts` (D-37), a jego wytyczne pokazują plik trasy Express jako przykład rodzaju (`guidelines/coding-http-application.md`, „HTTP przez Express”); pliki odłożonych istniejących rodzajów, które zadanie zmienia — wdrożenia (`compose.yaml`, `Dockerfile`), punktu uruchomienia (`src/server/main.ts`), HTML — zmienia bez wyboru ich wzorca.
18. Tabela uprawnień i granic zaufania w `guidelines/testing.md` dostaje wiersze dla tras kont: kto, który zasób, jakie działanie i oczekiwana odmowa, z testem odmowy żądania bez ważnej sesji, oznaczonym niezmiennikiem i raz widzianym z porażką — przez `maintain-testing-guidelines`.

### Acceptance criteria

- Zmieniona ścieżka gracza — założenie konta, siedziba, wylogowanie, ponowne zalogowanie — jest sprawdzona ręcznie w przeglądarce pod `https://loop2.mariusznazar.com/` po wdrożeniu (D-75), a pomiar skrótów Argon2id odbył się na obrazie wdrożonym z commitu tego zadania (`player-argon2-deployment-check`).
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/task.md:208-215`

````markdown
## Out of scope

- Szyfrowanie drogi od Cloudflare do serwera i zamknięcie bezpośredniego dostępu do portu aplikacji — zadanie 22 szyfrowana-droga-do-serwera (pytanie 1).
- Wysyłka wiadomości, potwierdzenie adresu i konfiguracja poczty Outsidera — zadanie 20.
- Reset hasła — zadanie 21.
- Blokada konta przez właściciela — zadanie 19.
- Zapis stanu gry na serwerze, jego wczytanie po zalogowaniu i niezapisany postęp po wygaśnięciu sesji i przy wylogowaniu — zadanie 16 (pytanie 16).
- Kopia bazy poza serwerem gry — zadanie 17.
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/spec.md:6-25`

````markdown
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
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/spec.md:138-167`

````markdown
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

Restore D-73's adopted mental-mutation obligation: author names plausible faults and assertions that catch them. Adopt no mutation tool. The missing tool/parts settlement for computational work is an unresolved existing guideline gap, not a permanent exemption or complete template compliance. This task changes connection-based accounts and browser auth, not simulation/computational drawing. Preserve gap, scope and reason in request; no unrelated audit.
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/spec.md:64-85`

````markdown
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

````

Source: `docs/task-cycles/konta-graczy-i-logowanie/spec.md:104-124`

````markdown
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
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/task.md:64-66`

````markdown
- 8. Jak serwer chroni żądania zmieniające przed podszyciem się pod zalogowanego gracza? (Q8; druga połowa pytania otwartego definicji o sesji)
  - Answer: droga A: „Ciasteczko sesji z ustawieniem `SameSite=Strict`, a serwer odrzuca każde żądanie zmieniające stan, którego nagłówek `Origin` nie jest adresem loop2, i przyjmuje dane tylko jako JSON.” Przyjęty koszt: „zależność od tego, że przeglądarka wysyła nagłówek `Origin` (bardzo stare przeglądarki mogą tego nie robić i zostaną odrzucone)”.
  - Source: Mariusz, 2026-10-25, słowa wyżej (tura 9).
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/task.md:70-72`

````markdown
- 10. Jak sekret podpisu `express-session` trafia na serwer i jak się go wymienia? (Q10; część pytania otwartego definicji „Jak dostarczać i rotować sekret podpisu `express-session` oraz ustawić zaufanie do pośrednika HTTPS tak, by bezpieczne ciasteczko działało na Mikrusie?”)
  - Answer: droga A: „Sekret leży w pliku na serwerze poza checkoutem, tylko do odczytu dla roota, który Compose przekazuje kontenerowi; jego kopia stoi w Twojej prywatnej notatce. Wymiana: dopisujesz nowy sekret przed starym i wdrażasz — serwer podpisuje nowym, a stare ciasteczka dalej przyjmuje; po czasie ważności sesji (Q6) usuwasz stary.” Przyjęty koszt: D-13 wylicza dziś miejsca sekretów jako “the repository's GitHub secrets and the owner's private note”, więc cykl dopisuje plik na serwerze. Słowa „tylko do odczytu dla roota” uzupełnia pytanie 14 (2026-10-26): plik czytelny dla roota i dla użytkownika gry; reszta tej odpowiedzi bez zmian. Druga część pytania otwartego — zaufanie do pośrednika — punkt 14 To do i Questions carried to cycle.
  - Source: Mariusz, 2026-10-25, słowa wyżej (tura 9); D-13 (`foundations/decisions.md`, loop2 `9a5f360`).
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/task.md:199-204`

````markdown
| K6 | Sesja gracza jest ważna 30 dni od ostatniego żądania i przedłuża się przy każdym, a gracz może być zalogowany w kilku przeglądarkach naraz, każda z własną sesją. | decision | pytanie 6 (A; Mariusz, 2026-10-25) | czas życia ciasteczka i rekordu sesji, przedłużanie przy żądaniu, a w zadaniu 19 — czy blokada kończy jedną sesję, czy wszystkie sesje konta |
| K7 | Po 5 nieudanych logowaniach na jeden adres e-mail serwer odrzuca kolejne próby tego adresu przez 15 minut, z jednego adresu IP przyjmuje najwyżej 20 nieudanych logowań na 15 minut i najwyżej 5 nowych kont na godzinę, a gracz, którego próby ograniczono, widzi „Za dużo prób. Spróbuj ponownie za kilka minut.” | decision | pytanie 7 (Mariusz, 2026-10-25) | progi i okna ograniczania prób oraz to, czy zadania 20 i 21 dzielą komunikat ograniczenia |
| K8 | Liczniki prób stoją w pamięci procesu serwera, z górną granicą liczby śledzonych adresów, więc restart albo wdrożenie je zeruje, a liczenie skrótów haseł naraz jest ograniczone tak, żeby zmieściło się w pamięci kontenera. | decision | pytanie 7 (Mariusz, 2026-10-25), obok alternatywy, której Mariusz nie wybrał: „liczniki w bazie SQLite — przeżywają restart, ale każda próba to zapis w bazie” | czy liczniki stoją w bazie, czy w pamięci, i czy liczba równoczesnych skrótów ma górną granicę |
| K9 | Ciasteczko sesji ma ustawienie `SameSite=Strict`, a serwer odrzuca każde żądanie zmieniające stan, którego nagłówek `Origin` nie jest adresem loop2, i przyjmuje dane tylko jako JSON. | decision | pytanie 8 (A; Mariusz, 2026-10-25); wpis projektowany „How is a player's login kept between requests?” nie wiąże `SameSite` | czy żądania zapisu zadania 16 dostają osobny token i czy przyjmują dane formularza |
| K10 | Serwer wysyła wiadomości o koncie łącznie najwyżej 30 na godzinę i najwyżej 3 na jeden adres na godzinę, a ponad pułap wiadomość nie wychodzi i gracz widzi, że ma spróbować później. | decision | pytanie 9 (b) (Mariusz, 2026-10-25, tura 10) i pytanie 17 (A; Mariusz, 2026-10-26): bez pułapu miesięcznego; dziennik zmian planu 2026-10-11: zasadę zapisuje to zadanie, a zadania 20 i 21 ją stosują | pułapy wysyłki potwierdzeń adresu i odnośników resetu w zadaniach 20 i 21 i to, co gracz widzi ponad pułapem |
| K11 | Sekret podpisu sesji leży w pliku na serwerze poza checkoutem, z właścicielem root, grupą o numerze 1000 i prawami 0440, czytelnym dla roota i dla użytkownika gry, który Compose przekazuje kontenerowi, z kopią w prywatnej notatce właściciela; wymiana dopisuje nowy sekret przed starym, serwer podpisuje nowym i przyjmuje ciasteczka podpisane starym, a po czasie ważności sesji stary sekret się usuwa. | decision | pytanie 10 (A; Mariusz, 2026-10-25) i pytanie 14 (A; Mariusz, 2026-10-26); zmienia D-13: “stay outside the repository, in the repository's GitHub secrets and the owner's private note” — wiersz dokłada trzecie miejsce sekretów | gdzie leży sekret sesji, jak proces gry go czyta, czy wymiana wylogowuje graczy i czy D-13 dostaje plik na serwerze jako miejsce sekretów |
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/reports/15-slice2-report.md:11-19`

````markdown
## Result and integration contract

`AccountDatabase(path, options)` owns a real `node:sqlite` DatabaseSync connection. It enables foreign keys, WAL and FULL synchronization; initializes strict version-1 accounts/sessions in one transaction; rejects unknown versions; closes on initialization failure; and closes its connection and unreferenced cleanup timer on disposal. SQL values are bound. Schema indexes cover expiry and account ID. Cleanup deletes at most 1000 indexed expired rows per invocation, at startup and at a default 60-second interval. The default lock wait is one second, configurable only within a positive five-second bound. These are implementation choices under D-110, not new product settings.

Accounts expose `createAccount(normalizedEmail, encodedPasswordHash)`, `findAccountByEmail(normalizedEmail)` and `findAccountById(id)`. The actual parameter name in code is `email`; callers supply the normalized value from account policy. Normalization and hashing remain outside this layer. A duplicate email returns null; unrelated SQLite errors propagate. IDs are generated with `randomUUID`. A successful insert returns the account including its stored hash: HTTP must project the public account response rather than return that object.

`SqliteSessionStore(database)` extends the installed package's Store, implementing get/set/touch/destroy. SessionData gains optional `accountId`. A persisted authenticated session contains exactly accountId and the library's serialized cookie metadata. Reads validate the JSON shape and matching record identity before package hydration. They use the database's absolute expiry, so stale serialized cookie expiry does not shorten a later touch. `set` inserts a fresh authenticated session or updates data/monotonic expiry for the same unexpired identity; it refuses changing that identity or replacing an expired record. `touch` only updates existing unexpired records for that identity; it cannot insert. `destroy` deletes only its supplied session ID. Both close methods are idempotent.

Later assembly must use resave=false and ordinary unchanged requests must use touch. `set` is the library's upsert contract; an explicitly delayed set after deletion can create a record, so application code must not use explicit save for ordinary authenticated reads. Credential success regenerates to a fresh ID and awaits save as the reviewed spec already requires. Cookie lifetime/attributes, no-cache policy, proxy/Origin checks, readiness/startup and secret handling remain the later HTTP slices' work. The Store does not impose that HTTP policy. Errors go to each supplied callback once; absent optional callbacks receive an error event. Callback exceptions are not reinterpreted as storage failures. Cleanup errors go to the optional database observer or a generic stderr message without row contents.
````
