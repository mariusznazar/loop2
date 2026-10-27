# Exact slice 9 selection

````markdown
### Slice 9 — Relative browser account client

- **Goal:** Provide the typed relative-path account client with bounded abort, strict response validation and controlled outcomes. Do not store identity locally or interpret cookies. Through maintain-coding-guidelines designate the first browser-api-client exemplar and kind/index/decision. Through update-part-map add the browser-view dependency on account-server protocol and assign the root client test once to browser-view. No visual shell yet.
- **Change:** `src/browser/account-api.ts` · `tests/account-api.test.mjs` · `guidelines/coding-browser-api-client.md` · `guidelines/coding.md` · `foundations/decisions.md` · `foundations/invariants.md` · `foundations/part_map.md`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `docs/task-cycles/konta-graczy-i-logowanie/task.md:14-37` To do and Acceptance criteria · `docs/task-cycles/konta-graczy-i-logowanie/task.md:208-215` Out of scope · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:6-25` Intent, Goals and non-goals, Constraints · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:138-167` Units and code kinds; Tests and evidence · `foundations/decisions.md:1339-1507` D-73–D-85 · `foundations/decisions.md:1547-1559` D-89 · `foundations/glossary.md:94-104` unit test; integration test · `foundations/invariants.md:572-581` node-test-selection · `foundations/part_map.md:104-127` agent-workflow; product-foundation · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `foundations/decisions.md:39-93` D-03–D-04 · `foundations/decisions.md:358-376` D-18 · `foundations/decisions.md:737-751` D-36 · `foundations/decisions.md:767-931` D-38–D-48 · `foundations/decisions.md:1521-1546` D-87–D-88 · `foundations/part_map.md:3-26` browser-view · `foundations/invariants.md:35-44` browser-view-framework · `foundations/invariants.md:452-501` tokens/focus/contrast/sources/kitchen-sink · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:29-49` API and credential validation · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:126-156` Browser lifecycle; Units/code kinds · `docs/task-cycles/konta-graczy-i-logowanie/task.md:194-202` K1–K9 · `tsconfig.browser.json` · `src/browser/main.ts` · `tests/http.test.mjs` · `foundations/decisions.md:621-635` D-28 · `foundations/glossary.md:46-52` public address · `.agents/skills/the-way-maintain-coding-guidelines/SKILL.md` · `.agents/skills/the-way-record-invariant/SKILL.md` · `.agents/skills/the-way-update-part-map/SKILL.md` · `foundations/decisions.md:1650-1662` D-94 · `foundations/decisions.md:1766-1778` D-102 · `foundations/decisions.md:1836-1848` D-107 · `foundations/decisions.md:1934-1947` D-114 · `foundations/invariants.md:682-691` loop2-shared-public-origin · `foundations/invariants.md:692-701` account-session-authorization · `src/server/account-routes.ts` · `src/server/account-policy.ts` · `docs/task-cycles/konta-graczy-i-logowanie/reports/34-session-report.md:31-42` · `docs/task-cycles/konta-graczy-i-logowanie/reports/39-credentials-report.md:37-94` · `docs/task-cycles/konta-graczy-i-logowanie/reports/39-credentials-report.md:336-356` · Foundation rows F18, F20j, F23e, F25.
- **Model:** cheaper — The reviewed paths and result contract settle this adapter; no UI state machine is introduced.
- **Risk:** none
- **Checks:** Start failing tests/account-api.test.mjs against a real bounded local HTTP server: relative paths/JSON, valid and malformed response shapes, 401/refusal, timeout and connection error, no false success. Run npm test before/after and mutation fail-once evidence for new invariant checks. Run python -B .the-way/elements/common/foundation_check.py. Secure-cookie browser evidence remains Slice 11.
- **Depends on:** Slice 8 · Foundation rows F18, F20j, F23e, F25.
- **Dispatch reads to materialize:** src/server/account-routes.ts and account-policy.ts as API contract context; their relevant new kind guidelines only if changing them. Add actual files/ranges once produced and rerun slice_size.py before execution; do not treat the current size as counting unborn source. Read any newly created guideline of a kind this slice changes whole.

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

Fulfil D-73's adopted mental-mutation obligation: author names plausible faults and assertions that catch them. This task makes no new mutation-tool choice and changes connection-based accounts/browser auth, not simulation/computational drawing. The old task-base guideline gap is settled upstream by PR 31 at 2c1d64c; preserve its adopted mutation rule and full/focused gate during final reconciliation, combine the account permission/refusal additions, and report the final merged state rather than an unresolved tool choice. See reports/29a-target-advance.md; no unrelated audit.
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/spec.md:29-49`

````markdown
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

````

Source: `docs/task-cycles/konta-graczy-i-logowanie/spec.md:126-156`

````markdown
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

````

Source: `docs/task-cycles/konta-graczy-i-logowanie/task.md:194-202`

````markdown
| K1 | Gracz niezalogowany widzi tylko ekran z formularzami „Zaloguj się” i „Załóż konto”, a siedziby ani panelu programu nie widać, dopóki się nie zaloguje; po założeniu konta gracz jest od razu zalogowany i trafia do siedziby. | decision | pytanie 4 (przebieg przyjęty; Mariusz, 2026-10-25) | czy niezalogowany może grać w przeglądarce bez konta — a stąd w zadaniu 16, czy łączyć stan zagrany przed zalogowaniem z zapisem konta |
| K2 | Przycisk „Wyloguj” stoi w nagłówku strony obok tytułu; wylogowanie kończy sesję tylko tej przeglądarki, po czym wraca ekran formularzy, a gry z przeglądarki nie widać. | decision | pytania 4 i 6 (A; Mariusz, 2026-10-25) i pytanie 16 (B; Mariusz, 2026-10-26): co dzieje się z niezapisanym postępem przy wylogowaniu, ustala zadanie 16; obok wpisu projektowanego „What happens to unsaved progress when a session expires?” (Decisions in play) | czy wylogowanie kończy sesje wszystkich przeglądarek gracza, gdzie stoi „Wyloguj” i czy po wylogowaniu gra zostaje na ekranie |
| K3 | Hasło gracza ma od 12 do 128 znaków dowolnego rodzaju, bez wymogu cyfr i wielkich liter. | decision | pytanie 5 (Mariusz, 2026-10-25) | najkrótsze i najdłuższe przyjmowane hasło, także dla nowego hasła z resetu w zadaniu 21 |
| K4 | Serwer obcina spacje na początku i końcu adresu e-mail, porównuje adresy bez rozróżniania wielkości liter, więc „Ala@x.pl” i „ala@x.pl” to jedno konto, i sprawdza tylko postać „coś@coś”, bo prawdziwość adresu ustala potwierdzenie. | decision | pytanie 5 (Mariusz, 2026-10-25) | czy dopasowanie adresu przy potwierdzeniu (zadanie 20) i resecie (zadanie 21) rozróżnia wielkość liter i jak ściśle sprawdzać postać adresu |
| K5 | Rejestracja adresem, który ma już konto, pokazuje „Konto z tym adresem już istnieje.”, a nieudane logowanie jeden komunikat „Nieprawidłowy adres e-mail lub hasło.” bez wskazania, co się nie zgadza. | decision | pytanie 5 (Mariusz, 2026-10-25), z przyjętym kosztem „każdy może sprawdzić, czy dany adres ma konto w loop2” | czy logowanie i reset hasła w zadaniu 21 ukrywają, że adres ma konto, i jaki tekst odmowy sprawdza test (`guidelines/testing.md`, „Behaviour, not implementation”: bez wymagania tekstu odmowy się nie utrwala) |
| K6 | Sesja gracza jest ważna 30 dni od ostatniego żądania i przedłuża się przy każdym, a gracz może być zalogowany w kilku przeglądarkach naraz, każda z własną sesją. | decision | pytanie 6 (A; Mariusz, 2026-10-25) | czas życia ciasteczka i rekordu sesji, przedłużanie przy żądaniu, a w zadaniu 19 — czy blokada kończy jedną sesję, czy wszystkie sesje konta |
| K7 | Po 5 nieudanych logowaniach na jeden adres e-mail serwer odrzuca kolejne próby tego adresu przez 15 minut, z jednego adresu IP przyjmuje najwyżej 20 nieudanych logowań na 15 minut i najwyżej 5 nowych kont na godzinę, a gracz, którego próby ograniczono, widzi „Za dużo prób. Spróbuj ponownie za kilka minut.” | decision | pytanie 7 (Mariusz, 2026-10-25) | progi i okna ograniczania prób oraz to, czy zadania 20 i 21 dzielą komunikat ograniczenia |
| K8 | Liczniki prób stoją w pamięci procesu serwera, z górną granicą liczby śledzonych adresów, więc restart albo wdrożenie je zeruje, a liczenie skrótów haseł naraz jest ograniczone tak, żeby zmieściło się w pamięci kontenera. | decision | pytanie 7 (Mariusz, 2026-10-25), obok alternatywy, której Mariusz nie wybrał: „liczniki w bazie SQLite — przeżywają restart, ale każda próba to zapis w bazie” | czy liczniki stoją w bazie, czy w pamięci, i czy liczba równoczesnych skrótów ma górną granicę |
| K9 | Ciasteczko sesji ma ustawienie `SameSite=Strict`, a serwer odrzuca każde żądanie zmieniające stan, którego nagłówek `Origin` nie jest adresem loop2, i przyjmuje dane tylko jako JSON. | decision | pytanie 8 (A; Mariusz, 2026-10-25); wpis projektowany „How is a player's login kept between requests?” nie wiąże `SameSite` | czy żądania zapisu zadania 16 dostają osobny token i czy przyjmują dane formularza |
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/reports/34-session-report.md:31-42`

````markdown
## What was built

`src/server/account-routes.ts` (HTTP kind, a copy of the `app.ts` exemplar's kind; its copy-list row awaits a refresh, as the handoff allows) exports `accountRoutes(runtime)`, an Express router mounted by `createApp` before the `/api` 404 handler, plus `sessionCookieName` and `sessionCookieScope`, which `app.ts` now uses for issuing the cookie, so logout clears exactly the scope it issued. The values are unchanged: `__Host-loop2.sid`, Path `/`, Secure, HttpOnly, SameSite Strict, no Domain; maxAge stays in `app.ts`. The rest of the security assembly in `app.ts` (proxy trust, session flags, transport bypass, app-level no-store, error handler, static serving) is untouched.

Contract, for slices 7 and 9:

- The canonical four paths: `POST /api/accounts`, `POST /api/session`, `GET /api/account`, `POST /api/logout`. `/api/register` and `/api/login` are gone with no alias and now get the JSON 404 for an unmatched API request.
- Any method on a known path: `Cache-Control: no-store`. When unconfigured: JSON 503 `{error:"Accounts unavailable"}`. When the request has no valid transport: JSON 403 (as before). Configured, a method/path pair that is not one of the four routes falls to the JSON 404.
- POST routes then run the existing `mutationGuards` (exact Origin, JSON media, no inflation, 16 KiB, object body), unchanged and in the same order.
- `GET /api/account`: the account comes only from `request.session.accountId` of a session the real Store loaded, looked up again with `findAccountById`. 200 `{id, email}` and nothing else. Otherwise 401 `{code:"unauthenticated", error:<Polish message>}`. Ordinary reads stay touch-only (resave=false; no explicit save).
- `POST /api/logout`: the body must be an empty object, else 400 `{code:"invalid-request", …}`. No valid session gives 401. Otherwise `request.session.destroy` is awaited. A failure gives 500 `{code:"logout-failed", …}`, sets no cookie and leaves the record in place. Success gives `clearCookie` with the shared scope, then 204 with an empty body. Session.destroy removes `req.session` first, so the middleware neither touches nor re-issues the cookie on that response.
- `POST /api/accounts` and `POST /api/session` reach the guards and then the guarded JSON 503 until slice 7. No credential, hashing or admission code was added.
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/reports/39-credentials-report.md:37-94`

````markdown
## What was built

**`src/server/account-policy.ts`** is new and is the first file of kind `account-policy`, so it is that kind's exemplar. It holds no HTTP, password-hashing or database code. It contains:

- `normalizeEmail`: ECMAScript `trim()` plus `toLowerCase()`; the address must contain exactly one `@`, with text on both sides.
- `acceptablePassword`: length counted in Unicode code points with `[...password]`, from 12 to 128 inclusive. The content is never changed.
- `checkRegistration` and `checkLogin`: return typed outcomes, not HTTP responses.
- `AccountPolicy`: takes a supplied clock (`now`) and a key capacity (`keyCapacity`, default 10,000); the thresholds and windows are fixed constants.
  - `admitLogin(email, address)` and `admitRegistration(address)` either refuse (`null`) or return a ticket. A ticket settles exactly once: `succeed()`, `fail()` or `release()` for a login; `created()` or `release()` for a registration.
  - `inFlight` reports how many admitted attempts are not yet settled.
- Email keys are SHA-256 digests (base64url) of the normalized address. Histories are trimmed to their windows.
  - An email address locks for 15 minutes from its fifth failure, and the lock clears its failures.
  - A success clears the email's failures, not the address's.
  - A window entry still counts while `time + window > now`, so it stops counting at the exact instant the window ends. A lock is active while `lockedUntil > now`.
  - Admission counts failures plus unsettled reservations against 5 (email), 20 (address logins) and 5 (address registrations per hour).
  - A full table first sweeps expired entries. An entry is live while it holds a reservation, an active lock or history inside its window. If no room remains, the table refuses; it never evicts a live entry. Room for both keys of a login is checked before either key is created.

**`src/server/account-routes.ts`** (HTTP kind) replaces the two guarded 503 placeholders with real routes. Its other routes from slice 6 are unchanged.

- Both routes first take exactly the expected fields, each a string (`stringFields`). An absent, extra, array, object, number or null field gives 400 `invalid-request`. This happens before any admission, hash or write.
- `POST /api/accounts` `{email, password, passwordConfirmation}`, in order:
  1. A credential check, which can give 400 `invalid-email`, `invalid-password` or `password-mismatch`, with Polish messages.
  2. `admitRegistration(verified address)`, or 429.
  3. A duplicate pre-check: an existing account gives release and 409.
  4. `hashPassword`. A full gate gives release and 429; any other error gives release and the error handler's 500.
  5. `createAccount`. A lost race (null) gives release and 409 `account-exists`, "Konto z tym adresem już istnieje.".
  6. `created()`.
  7. Sign-in: 201 `{id, email}`.
- `POST /api/session` `{email, password}`, in order:
  1. A malformed address or password length gives 401 `invalid-credentials`, "Nieprawidłowy adres e-mail lub hasło.", with no admission and no Argon2.
  2. `admitLogin(email, verified address)`, or 429.
  3. `findAccountByEmail`, then `verifyPassword(account hash or the startup dummy hash)` through the shared gate. A full gate gives release and 429; any other error gives release and 500.
  4. If the account is unknown or the password is wrong: `fail()` and the same 401.
  5. Otherwise `succeed()`, then sign-in: 200 `{id, email}`.
- Every settlement happens right after the awaited password operation. No route listens to the connection, so a client that disconnects can neither release its reservation early nor erase its outcome.
- Sign-in (`establishSession`) calls `session.regenerate`, sets `accountId`, then awaits `session.save` before the response.
  - If regenerate or save fails, `session.destroy` detaches the fresh session from the request. With no session attached, express-session sets no cookie and does not save again when the response ends. The response is then 503 `session-unavailable`, "Nie udało się zalogować. Spróbuj zalogować się ponownie.".
  - A stored account stays and can sign in later; it is not deleted.
  - No database transaction spans hashing or HTTP: every database call is a single synchronous statement.
- Limitation and capacity both give 429 `too-many-attempts`, "Za dużo prób. Spróbuj ponownie za kilka minut.". I send no Retry-After (choice 4).

**`src/server/app.ts`**: `createApp(runtime = null, policy?)` passes an optional policy to `accountRoutes`. Production (`main.ts`, unchanged) gets the default policy. The session and security assembly is unchanged.

**Contract for slice 9 (browser client).** Every refusal body has a string `error`, the one user-facing message. Every refusal from the four account routes' own handlers also carries `code` (choice 1).

| Status | `code` | Meaning |
|---|---|---|
| 400 | `invalid-request` | Wrong field set or types |
| 400 | `invalid-email`, `invalid-password`, `password-mismatch` | Registration feedback |
| 401 | `invalid-credentials` | Login failure (generic) |
| 401 | `unauthenticated` | No valid session (slice 6) |
| 409 | `account-exists` | Duplicate address |
| 429 | `too-many-attempts` | Limit or capacity |
| 503 | `session-unavailable` | Credentials accepted, session not stored |
| 500 | `logout-failed` | Logout failed (slice 6) |

The guard and transport refusals from slice 5 (403/415/413/400/503, and the error handler's 500) keep `{error}` without a code. 201 and 200 carry `{id, email}`.

````

Source: `docs/task-cycles/konta-graczy-i-logowanie/reports/39-credentials-report.md:336-356`

````markdown
## Choices made (rejected way, and cost if wrong)

1. **Refusal shape: `{error}` always, plus `code` on every refusal from the account routes' own handlers. Slice 5's guard and transport refusals stay `{error}`.**
   - Rejected: adding codes to the guard refusals. They live in `src/server/transport.ts`, outside this slice's Change list, and a browser that sends correct requests never meets them.
   - Cost: slice 9's client must treat a missing `code` as a generic failure, and choose its message by status when `code` is absent.
2. **A login with a malformed address or an out-of-range password gets the generic 401 before admission, and is not counted.**
   - Rejected: counting it as a failure. Such a password can never be correct, so the attempt brings no brute-force gain, and counting it would let cheap requests lock an address without Argon2 cost.
   - Cost: a locked address answers such a request with 401 rather than 429. Both are failures, and neither reveals anything.
3. **Registration admission comes before the duplicate pre-check; the pre-check runs before hashing.**
   - Rejected: pre-check before admission. The order makes a limited client always get 429, and the pre-check avoids Argon2 work for an existing address.
   - Cost: none in limits, because a duplicate releases its slot. The existence of an address remains discoverable, a cost the task accepts (K5).
4. **No Retry-After.** The spec says "may".
   - Rejected: computing it for every kind of limit, which would add untested arithmetic.
   - Cost: clients cannot show a precise wait.
5. **Capacity refusals and limits share 429 `too-many-attempts`** and the one required message. Rejected: 503 for capacity. The spec says all limitations show that text, and a capacity refusal is not a failure.
6. **A credential success is settled before the session is stored.** If the save then fails (503), the email's failures stay cleared. Rejected: settling after the save, which would tie admission accounting to session storage. Cost: none against the decisions.
7. **The test seams are a supplied clock and a key capacity on `AccountPolicy`, plus a read-only `inFlight` count** used only as a wait condition, with a deadline. Rejected: a test-only HTTP route or facade. The thresholds and windows are deliberately not options.
8. **Gate occupation in tests uses the real module.** The test calls `hashPassword` from `dist/server/passwords.js`, the same module instance the app uses, to fill both native slots. Rejected: replacing the gate.
9. **`policy` is an optional second parameter of `createApp`**, rather than a field of `AccountRuntime`. `configuration.ts` is not a Change path, and production uses the default.

Adaptations (method section 4): none structural. The spec's optional `rate-limits.ts` was not needed: one file holds the policy.
````
