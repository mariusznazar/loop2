# Exact slice 2 selection

````markdown
### Slice 2 — SQLite accounts and session Store

- **Goal:** Implement one versioned real SQLite connection and the express-session Store with schema transaction, uniqueness, parameterized SQL, bounded busy/cleanup behavior, expiry rejection, monotonic touch and no resurrection after deletion. Propagate Store errors and close on disposal. No hashing or HTTP policy here. Through maintain-coding-guidelines create database-access and session-store first-file exemplars, two kind guidelines/index rows and their decisions. Record versioned DB/Store facts and persistence/test ownership through element skills. Keep full deployed and HTTP cookie claims unverified until their evidence.
- **Change:** `src/server/database.ts` · `src/server/session-store.ts` · `tests/account-storage.test.mjs` · `guidelines/coding-database-access.md` · `guidelines/coding-session-store.md` · `guidelines/coding.md` · `foundations/decisions.md` · `foundations/environment_facts.md` · `foundations/invariants.md` · `foundations/part_map.md`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `docs/task-cycles/konta-graczy-i-logowanie/task.md:14-37` To do and Acceptance criteria · `docs/task-cycles/konta-graczy-i-logowanie/task.md:208-215` Out of scope · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:6-25` Intent, Goals and non-goals, Constraints · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:138-167` Units and code kinds; Tests and evidence · `foundations/decisions.md:1339-1507` D-73–D-85 · `foundations/decisions.md:1547-1559` D-89 · `foundations/glossary.md:94-104` unit test; integration test · `foundations/invariants.md:572-581` node-test-selection · `foundations/part_map.md:102-125` agent-workflow; product-foundation · `guidelines/coding-http-application.md` · `foundations/decisions.md:3-38` D-01–D-02 · `foundations/decisions.md:94-154` D-05–D-07 · `foundations/decisions.md:752-766` D-37 · `foundations/decisions.md:932-946` D-49 · `foundations/decisions.md:1508-1520` D-86 · `foundations/part_map.md:56-101` account-server; build-tools · `foundations/invariants.md:5-34` account-server-runtime/typecheck/express-http · `foundations/invariants.md:45-104` API/one-serving-process/build/package/occupied-address · `foundations/invariants.md:532-541` public-file-access · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:50-73` SQLite and schema lifecycle; Sessions · `docs/task-cycles/konta-graczy-i-logowanie/task.md:58-60` Q6 · `docs/task-cycles/konta-graczy-i-logowanie/task.md:86-89` Q15 · `docs/task-cycles/konta-graczy-i-logowanie/task.md:199-199` K6 · `package.json` · `tsconfig.server.json` · `foundations/decisions.md:621-635` D-28 · `.agents/skills/the-way-maintain-coding-guidelines/SKILL.md` · `.agents/skills/the-way-record-environment-fact/SKILL.md` · `.agents/skills/the-way-record-invariant/SKILL.md` · `.agents/skills/the-way-update-part-map/SKILL.md` · `foundations/decisions.md:1663-1677` D-95 · `foundations/decisions.md:1693-1707` D-97 · `foundations/decisions.md:1723-1735` D-99 · `foundations/decisions.md:1808-1821` D-105 · `foundations/decisions.md:1836-1848` D-107 · `foundations/decisions.md:1891-1903` D-110 · `foundations/invariants.md:652-661` player-express-session-sqlite-store · `foundations/invariants.md:662-671` account-save-durable-storage · `foundations/invariants.md:672-681` account-save-sqlite-access · `foundations/invariants.md:732-741` account-schema-lifecycle · `foundations/environment_facts.md:226-231` express-session-store-contract · `foundations/environment_facts.md:238-243` node-sqlite-database · `node_modules/express-session/package.json` · `node_modules/@types/express-session/package.json` · `node_modules/express-session/session/store.js` · `node_modules/@types/express-session/index.d.ts:337-391` · Foundation rows F06, F17, F20g, F20i, F22, F23b, F23c, F24b, F24c.
- **Model:** same — Monotonic expiry and logout ordering cross a synchronous database and asynchronous Store callbacks.
- **Risk:** trust boundary — account/session persistence and Store errors
- **Checks:** Start with failing tests/account-storage.test.mjs on real temporary databases: reopen, uniqueness races, unknown newer schema, transactional initialization, absent/expired records, equality to expiry, out-of-order touch and delayed touch after deletion. Exercise real Store callbacks/error propagation. Run npm test before/after, show new invariant tests fail once under temporary mutations through npm test and restore. Run python -B .the-way/elements/common/foundation_check.py after writes.
- **Depends on:** Slice 1 · Foundation rows F06, F17, F20g, F20i, F22, F23b, F23c, F24b, F24c.
- **Dispatch reads to materialize:** Slice 1 password-hashing guidelines only if this slice reaches that kind; the package manifest is already selected. Add actual files/ranges once produced and rerun slice_size.py before execution; do not treat the current size as counting unborn source. Read any newly created guideline of a kind this slice changes whole.

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

Source: `docs/task-cycles/konta-graczy-i-logowanie/spec.md:50-73`

````markdown
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

````

Source: `docs/task-cycles/konta-graczy-i-logowanie/task.md:58-60`

````markdown
- 6. Jak długo ważna jest sesja gracza i czy gracz może być zalogowany w kilku przeglądarkach naraz? (Q6; pierwsza połowa pytania otwartego definicji „Jak długo ważna jest sesja gracza i jak chronić żądania zmieniające zapis przed podszyciem się pod gracza?”)
  - Answer: droga A: „Sesja ważna 30 dni od ostatniego żądania i przedłużana przy każdym; logowanie w kilku przeglądarkach naraz dozwolone, każda ma własną sesję; „Wyloguj” kończy sesję tylko tej przeglądarki.” Przyjęty koszt: „urządzenie, które ktoś zostawi zalogowane, daje dostęp do konta do 30 dni; więcej rekordów sesji w bazie”.
  - Source: Mariusz, 2026-10-25, słowa wyżej (tura 9).
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/task.md:86-89`

````markdown
- 15. Gdzie leży plik bazy kont na serwerze: w nazwanym wolumenie Dockera czy w katalogu hosta zamontowanym do kontenera? (Q15)
  - Answer: droga A: „Nazwany wolumen Dockera — miejsce na dane, które Docker zakłada i trzyma sam w swoim katalogu na serwerze. Zakłada go samo wdrożenie, więc czynność „Utworzenie na serwerze katalogu na plik bazy” odpada.” Przyjęty koszt: „plik leży w katalogu Dockera, do którego zagląda się jako root albo poleceniem Dockera; polecenie czyszczące nieużywane wolumeny, puszczone wtedy, gdy kontenera loop2 akurat nie ma, skasuje konta; obraz musi założyć katalog na bazę jako własność `node`, inaczej gra nie zapisze bazy (sprawdza cykl)”. Odrzucone: katalog hosta poza checkoutem, zakładany ręcznie przed pierwszym wdrożeniem z kontami.
  - Source: Mariusz, 2026-10-26: „zgodnie z rekomendacjami” (tura 16); pytanie z krytyki niezależnej rozmowy, tura 13, N15.
  - Fakty, osobno: `compose.yaml` nie ma dziś wolumenu, a kontener loop2 na serwerze nie ma zamontowanych wolumenów (Context); proces gry działa jako `node` (`Dockerfile:25`); D-17 nie wylicza miejsca na dane loop2 wśród tego, co wdrożenie zmienia na hoście.
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/task.md:199-199`

````markdown
| K6 | Sesja gracza jest ważna 30 dni od ostatniego żądania i przedłuża się przy każdym, a gracz może być zalogowany w kilku przeglądarkach naraz, każda z własną sesją. | decision | pytanie 6 (A; Mariusz, 2026-10-25) | czas życia ciasteczka i rekordu sesji, przedłużanie przy żądaniu, a w zadaniu 19 — czy blokada kończy jedną sesję, czy wszystkie sesje konta |
````
