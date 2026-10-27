# Exact slice 3 selection

````markdown
### Slice 3 — Durable image and production smoke fixtures

- **Goal:** Create node-owned /app/data, own named data volume, application-only session secret grant and fixed production settings, preserving private tunnel topology, connector-only token and memory limits. Amend host-sharing checks to allow exactly these own resources, still refusing arbitrary host mounts/grants/privileges. Existing production container smoke tests get real temporary secret/database resources before startup refusal lands; never select a developer bypass. Shared local-container setup lives in the named helper, assigned once to build-tools. This slice proves fresh-volume node writability; account replacement preservation is Slice 9.
- **Change:** `Dockerfile` · `compose.yaml` · `tests/invariants/account_container_support.py` · `tests/invariants/test_loop2_one_serving_process_container.py` · `tests/deploy/test_loop2_image_icons.py` · `tests/invariants/test_loop2_host_sharing.py` · `tests/invariants/test_loop2_container_isolation.py` · `foundations/decisions.md` · `foundations/invariants.md` · `foundations/part_map.md`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `docs/task-cycles/konta-graczy-i-logowanie/task.md:14-37` To do and Acceptance criteria · `docs/task-cycles/konta-graczy-i-logowanie/task.md:208-215` Out of scope · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:6-25` Intent, Goals and non-goals, Constraints · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:138-167` Units and code kinds; Tests and evidence · `foundations/decisions.md:1339-1507` D-73–D-85 · `foundations/decisions.md:1547-1559` D-89 · `foundations/glossary.md:94-104` unit test; integration test · `foundations/invariants.md:572-581` node-test-selection · `foundations/part_map.md:103-126` agent-workflow; product-foundation · `guidelines/coding-http-application.md` · `foundations/decisions.md:3-38` D-01–D-02 · `foundations/decisions.md:94-154` D-05–D-07 · `foundations/decisions.md:752-766` D-37 · `foundations/decisions.md:932-946` D-49 · `foundations/decisions.md:1508-1520` D-86 · `foundations/part_map.md:56-102` account-server; build-tools · `foundations/invariants.md:5-34` account-server-runtime/typecheck/express-http · `foundations/invariants.md:45-104` API/one-serving-process/build/package/occupied-address · `foundations/invariants.md:532-541` public-file-access · `foundations/decisions.md:155-357` D-08–D-17 · `foundations/part_map.md:127-164` deployment; External context · `foundations/invariants.md:105-164` container-isolation/distinct-address/deploy-trigger/keeps-running/application-port/host-sharing · `foundations/environment_facts.md:166-207` node-listen-port-zero; tunnel contracts; Compose permissions · `foundations/glossary.md:32-52` deployment; test server; public address · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:50-63` SQLite and schema lifecycle · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:104-124` Startup, secrets and measured deployment · `docs/task-cycles/konta-graczy-i-logowanie/task.md:82-89` Q14–Q15 · `docs/task-cycles/konta-graczy-i-logowanie/task.md:204-204` K11 · `deploy/loop2-deploy` · `tests/invariants/loop2_invariant_support.py:1-140` temporary-copy and process support · `.agents/skills/the-way-record-decision/SKILL.md` · `.agents/skills/the-way-record-invariant/SKILL.md` · `.agents/skills/the-way-update-part-map/SKILL.md` · `foundations/decisions.md:1723-1735` D-99 · `foundations/decisions.md:1794-1807` D-104 · `foundations/decisions.md:1808-1821` D-105 · `foundations/decisions.md:1864-1876` D-109 · `foundations/decisions.md:1891-1903` D-110 · `foundations/invariants.md:662-671` account-save-durable-storage · `foundations/invariants.md:722-731` account-startup-configuration · `foundations/invariants.md:732-741` account-schema-lifecycle · `foundations/environment_facts.md:214-219` argon2-native-platform · `foundations/environment_facts.md:238-243` node-sqlite-database · `foundations/environment_facts.md:232-237` session-secret-rotation · `src/server/database.ts` · `src/server/session-store.ts` · `guidelines/coding-database-access.md` · `guidelines/coding-session-store.md` · `tests/invariants/test_loop2_container_isolation.py` · Foundation rows F11, F14, F20h.
- **Model:** same — Specific secret/volume allowances must preserve the existing host-sharing refusal boundary.
- **Risk:** trust boundary — Compose host resources and production container configuration
- **Checks:** Start with failing unauthorized resource/grant cases and positive allowed topology in host-sharing tests, run npm test before/after. Through npm test build/run the real image with a fresh disposable volume and temporary secret as node, keeping 512 MiB and the existing process/icons probes. Deliberately mutate an allowed grant/source to prove the amended test fails, restore and rerun npm test. Run python -B .the-way/elements/common/foundation_check.py. No target mutation; no claim that generic writable volume evidence proves account persistence.
- **Depends on:** Slice 2 · Foundation rows F11, F14, F20h.
- **Dispatch reads to materialize:** Slice 2 DB and Store public lifecycle contracts, and their new kind guidelines if changed. Add actual files/ranges once produced and rerun slice_size.py before execution; do not treat the current size as counting unborn source. Read any newly created guideline of a kind this slice changes whole.

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

Source: `docs/task-cycles/konta-graczy-i-logowanie/spec.md:50-63`

````markdown
### 2. SQLite and schema lifecycle

One application-owned connection opens before readiness and closes on shutdown/start failure. Database `/app/data/accounts.sqlite` lives in Compose-managed named volume `loop2_accounts` mounted at `/app/data`. The image creates that directory owned by uid/gid 1000 before USER node. Check writes on a genuinely fresh volume as node; image ownership alone is not proof.

Version 1 has accounts with opaque random primary ID, unique normalized email, encoded password hash and creation time; sessions have primary session ID, account foreign key, serialized express-session data and absolute expiry. Index expiry and account ID. Session data holds account ID/library cookie metadata, never credentials. Add no unused saves/reset/mail/verification/blocking columns.

Enable foreign keys, bounded busy timeout, parameterized prepared statements, WAL and full synchronization. Initialize schema and version transactionally. Existing version 1 opens without resets; newer unknown schema fails closed. No destructive migration framework. Duplicate insert races produce the duplicate-account response. No transaction spans asynchronous hashing or an HTTP response.

Reject expiry on read even before cleanup. Prune indexed expired rows on startup and periodically with a bounded lifecycle timer; unref/clear the timer on disposal. Touch updates existing unexpired rows only, preserves the later expiry under out-of-order requests and cannot resurrect logout. Ordinary authenticated requests do not mutate identity or need upsert; fresh authenticated creation is a distinct path. Test delayed touch after logout.

Hash before account insertion. Success requires durable account and session. If session storage fails after account insert, return unavailable with no success cookie and leave the valid account usable by subsequent login, rather than deleting it in a race. The error wording must not claim the account never existed. This is a failed server operation, not successful registration.

File SQLite meets container replacement; in-memory storage does not. The selected built-in driver avoids another driver/ORM. Versioned startup prevents old code reinterpreting newer schema. Short synchronous operations suit one small process; measured contention may later change that. Rollback restores code, not historical accounts. Pre-account code leaves the volume intact but has no account feature; account-aware code can reuse it later. No down -v, volume deletion or prune in recovery.

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

Source: `docs/task-cycles/konta-graczy-i-logowanie/task.md:82-89`

````markdown
- 14. Odpowiedź na pytanie 10 kładzie sekret w pliku „tylko do odczytu dla roota, który Compose przekazuje kontenerowi”, a proces gry działa w kontenerze jako użytkownik `node`, który takiego pliku nie przeczyta. Jak proces gry dostaje sekret? (Q14)
  - Answer: droga A: „Plik czytelny dla roota i dla użytkownika gry: właściciel root, grupa o numerze 1000, prawa 0440 (odczyt dla właściciela i grupy, nic dla innych). Reszta odpowiedzi na Q10 — miejsce poza checkoutem, kopia w notatce, wymiana nowym sekretem przed starym — bez zmian.” Przyjęty koszt: „na serwerze plik przeczyta też każdy proces działający jako użytkownik albo grupa o numerze 1000 (inny kontener tylko wtedy, gdy ma ten plik zamontowany; czy na serwerze ktoś ma ten numer, nie sprawdzono); przy tworzeniu i wymianie sekretu ustawiasz grupę i prawa, jedno polecenie więcej w czynności „Utworzenie sekretu podpisu sesji””. Odrzucone: sekret ze źródła `environment` podawany przez skrypt wdrożenia oraz start kontenera jako root z przełączeniem procesu gry na `node`.
  - Source: Mariusz, 2026-10-26: „zgodnie z rekomendacjami” (tura 16); pytanie z krytyki niezależnej rozmowy, tura 13, N11.
  - Fakty, osobno: `Dockerfile:25` `USER node` (loop2 `9a5f360`); w obrazie `node:24-slim` użytkownik `node` ma numer 1000 i grupę 1000 (`docker run --rm node:24-slim id node`, 2026-10-26, na komputerze refinera, nie na serwerze); dokumentacja Compose (https://docs.docker.com/reference/compose-file/services/#secrets, odczyt 2026-10-26): obsługa `uid`, `gid` i `mode` jest w Docker Compose tylko dla sekretu ze źródłem `environment`; dla źródła `file` „Compose uses a bind-mount under the hood” i te ustawienia są „silently ignored”, więc w kontenerze obowiązują właściciel i prawa pliku na hoście.
- 15. Gdzie leży plik bazy kont na serwerze: w nazwanym wolumenie Dockera czy w katalogu hosta zamontowanym do kontenera? (Q15)
  - Answer: droga A: „Nazwany wolumen Dockera — miejsce na dane, które Docker zakłada i trzyma sam w swoim katalogu na serwerze. Zakłada go samo wdrożenie, więc czynność „Utworzenie na serwerze katalogu na plik bazy” odpada.” Przyjęty koszt: „plik leży w katalogu Dockera, do którego zagląda się jako root albo poleceniem Dockera; polecenie czyszczące nieużywane wolumeny, puszczone wtedy, gdy kontenera loop2 akurat nie ma, skasuje konta; obraz musi założyć katalog na bazę jako własność `node`, inaczej gra nie zapisze bazy (sprawdza cykl)”. Odrzucone: katalog hosta poza checkoutem, zakładany ręcznie przed pierwszym wdrożeniem z kontami.
  - Source: Mariusz, 2026-10-26: „zgodnie z rekomendacjami” (tura 16); pytanie z krytyki niezależnej rozmowy, tura 13, N15.
  - Fakty, osobno: `compose.yaml` nie ma dziś wolumenu, a kontener loop2 na serwerze nie ma zamontowanych wolumenów (Context); proces gry działa jako `node` (`Dockerfile:25`); D-17 nie wylicza miejsca na dane loop2 wśród tego, co wdrożenie zmienia na hoście.
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/task.md:204-204`

````markdown
| K11 | Sekret podpisu sesji leży w pliku na serwerze poza checkoutem, z właścicielem root, grupą o numerze 1000 i prawami 0440, czytelnym dla roota i dla użytkownika gry, który Compose przekazuje kontenerowi, z kopią w prywatnej notatce właściciela; wymiana dopisuje nowy sekret przed starym, serwer podpisuje nowym i przyjmuje ciasteczka podpisane starym, a po czasie ważności sesji stary sekret się usuwa. | decision | pytanie 10 (A; Mariusz, 2026-10-25) i pytanie 14 (A; Mariusz, 2026-10-26); zmienia D-13: “stay outside the repository, in the repository's GitHub secrets and the owner's private note” — wiersz dokłada trzecie miejsce sekretów | gdzie leży sekret sesji, jak proces gry go czyta, czy wymiana wylogowuje graczy i czy D-13 dostaje plik na serwerze jako miejsce sekretów |
````
