# Exact slice 11 selection

````markdown
### Slice 11 — Authenticated shell and game disposal

- **Goal:** Begin with session-check UI only, then forms or fresh existing game after server confirmation. Build both forms from shared controls/visible labels with Unicode-compatible validation, cross-form exclusion and one warning. Header logout is beside title; uncertain failure retains the game, success/expired session disposes it. Clear passwords on leaving and ignore stale responses. Extract game-view.ts with ownership/disposal and add clock stop/dispose, preserving pure simulation updates and empty team/Program group/headquarters. Through maintenance/element skills update browser-module copies, ownership and actual invariant status. Add no heartbeat/save or permanent unsaved-progress policy.
- **Change:** `src/browser/view/app.ts` · `src/browser/view/game-view.ts` · `src/browser/view/account-screen.ts` · `src/browser/view/clock.ts` · `src/browser/styles.css` · `tests/view/account-screen.test.mjs` · `tests/view/clock.test.mjs` · `guidelines/coding-browser-module.md` · `foundations/invariants.md` · `foundations/part_map.md`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `docs/task-cycles/konta-graczy-i-logowanie/task.md:14-37` To do and Acceptance criteria · `docs/task-cycles/konta-graczy-i-logowanie/task.md:208-215` Out of scope · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:6-25` Intent, Goals and non-goals, Constraints · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:138-167` Units and code kinds; Tests and evidence · `foundations/decisions.md:1339-1507` D-73–D-85 · `foundations/decisions.md:1547-1559` D-89 · `foundations/glossary.md:94-104` unit test; integration test · `foundations/invariants.md:572-581` node-test-selection · `foundations/part_map.md:105-128` agent-workflow; product-foundation · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `foundations/decisions.md:39-93` D-03–D-04 · `foundations/decisions.md:358-376` D-18 · `foundations/decisions.md:737-751` D-36 · `foundations/decisions.md:767-931` D-38–D-48 · `foundations/decisions.md:1521-1546` D-87–D-88 · `foundations/part_map.md:3-27` browser-view · `foundations/invariants.md:35-44` browser-view-framework · `foundations/invariants.md:452-501` tokens/focus/contrast/sources/kitchen-sink · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:29-49` API and credential validation · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:126-137` Browser and control lifecycle · `docs/task-cycles/konta-graczy-i-logowanie/task.md:52-60` Q4–Q6 · `docs/task-cycles/konta-graczy-i-logowanie/task.md:90-92` Q16 · `docs/task-cycles/konta-graczy-i-logowanie/task.md:194-199` K1–K6 · `docs/task-cycles/konta-graczy-i-logowanie/task.md:205-205` K12 · `foundations/decisions.md:468-503` D-23 · `foundations/decisions.md:968-986` D-51 · `foundations/decisions.md:1011-1032` D-53 · `foundations/decisions.md:1560-1596` D-90–D-91 · `foundations/glossary.md:87-93` headquarters · `src/browser/view/headquarters.ts:36-69` headquarters interface · `src/browser/view/status-row.ts:47-93` exemplar lifecycle · `tests/view/status-row.test.mjs:194-240` document-model scope · `src/browser/view/controls/text-field.ts` · `src/browser/view/controls/button.ts` · `.agents/skills/the-way-maintain-coding-guidelines/SKILL.md` · `.agents/skills/the-way-record-invariant/SKILL.md` · `.agents/skills/the-way-update-part-map/SKILL.md` · `foundations/decisions.md:1822-1835` D-106 · `foundations/decisions.md:1849-1863` D-108 · `foundations/decisions.md:1949-1962` D-115 · `foundations/invariants.md:782-791` account-client-requests · `foundations/invariants.md:792-801` account-client-outcomes · `foundations/invariants.md:682-691` loop2-shared-public-origin · `foundations/invariants.md:582-591` player-self-registration · `foundations/invariants.md:592-601` player-password-login · `foundations/invariants.md:602-611` email-verification-nonblocking · `foundations/invariants.md:722-731` account-startup-configuration · `foundations/invariants.md:712-721` account-request-transport · `src/browser/account-api.ts` · `guidelines/coding-browser-api-client.md` · `src/server/main.ts` · `src/server/configuration.ts` · `src/server/transport.ts` · `docs/task-cycles/konta-graczy-i-logowanie/reports/44-client-report.md:88-114` · `docs/task-cycles/konta-graczy-i-logowanie/reports/45-controls-report.md:32-53` · `docs/task-cycles/konta-graczy-i-logowanie/reports/45-controls-report.md:77-118` · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:76-85` · Foundation rows F01, F02, F12, F20a, F20b, F20c, F25.
- **Model:** same — Stale async replies and mount/dispose ownership must preserve the game's callbacks and timer lifecycle.
- **Risk:** none
- **Checks:** Start failing view-state and clock-disposal cases; run npm test before/after, without attributing DOM/cookie evidence to the document model. Perform real local HTTPS/Secure-cookie registration, headquarters, reload, logout/login and two-session journeys, invalid/duplicate/limited/network/loading states, narrow layout and focus. Confirm no game/program before identity and no timers accumulate across repeats. Apply playwright-mcp with applicable references and capture synthetic-data screenshots. Assess exclusion return conditions. Run python -B .the-way/elements/common/foundation_check.py. Public registration acceptance remains human-only and unchecked.
- **Depends on:** Slice 10 · Foundation rows F01, F02, F12, F20a, F20b, F20c, F25.
- **Dispatch reads to materialize:** src/browser/account-api.ts and its new browser-api-client guidelines. Add actual files/ranges once produced and rerun slice_size.py before execution; do not treat the current size as counting unborn source. Read any newly created guideline of a kind this slice changes whole.

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

Source: `docs/task-cycles/konta-graczy-i-logowanie/spec.md:126-137`

````markdown
### 7. Browser and control lifecycle

Start with title/footer and session-check waiting UI, no game/program construction. GET account chooses authenticated shell or forms. A 401 shows forms; network/server error gives one warning plus retry, not false signed-in/out state. No localStorage identity or cookie parsing.

Both required forms use shared controls and visible labels. Extend the shared text field with a masked-password variant rather than separately styled inputs. While submitting, disable fields/buttons, show Logowanie… or Zakładanie konta… in text-disabled and prevent overlapping transitions across both forms. Restore controls and one warning under the originating form on refusal/network error. Render plain text, not server HTML. Clear password inputs on leaving and never persist credentials in the game model.

Successful create/login/restoration mounts newGame(), existing empty team and Program group. Shared Wyloguj button stands beside title. During logout show disabled waiting state. Success or explicit expired-session response disposes game and returns to forms. Network/server failure keeps game and shows warning because server outcome is uncertain; do not claim logout succeeded.

Game mount exposes disposal: stop interval, detach owned events/DOM. Extend clock with stop/dispose so repeated login does not accumulate timers or keep hidden games running. Serialize transitions and invalidate stale async responses so they cannot remount/overwrite newer state. Current recreation is pre-save behavior, not a permanent unsaved-progress rule. No heartbeat/save retry feature.

Add loading/password/form-error samples to the existing kitchen-sink, revise D-44/styleguide through its skill, use existing tokens/wrapping and keep keyboard focus. Capture real-browser forms, waiting/error, authenticated header/headquarters, logout, narrow layout/focus and kitchen-sink loading using synthetic local data. Public post-deployment account creation/login journey belongs to the human under D-12 because it changes server data; agent may inspect signed-out public UI.

````

Source: `docs/task-cycles/konta-graczy-i-logowanie/task.md:52-60`

````markdown
- 4. Co widzi gracz niezalogowany, jak wyglądają zakładanie konta, logowanie i wylogowanie i co dzieje się z grą w przeglądarce po wylogowaniu? (Q4)
  - Answer: część z cytatów, zachowanych przez Mariusza: po założeniu konta gracz gra od razu, bez potwierdzania adresu, a zalogowany trafia do siedziby. Reszta — przebieg przyjęty w brzmieniu propozycji: „Gracz niezalogowany widzi tylko ekran z dwoma formularzami: „Zaloguj się” (adres e-mail, hasło) i „Załóż konto” (adres e-mail, hasło, powtórzone hasło); siedziby ani panelu programu nie widać, dopóki gracz się nie zaloguje.”; „po założeniu konta gracz jest od razu zalogowany i trafia do siedziby”; „Przycisk „Wyloguj” stoi w nagłówku strony obok tytułu; po wylogowaniu wraca ekran formularzy, a gra z przeglądarki przepada.”; „Przeładowanie strony z ważną sesją prowadzi prosto do siedziby.” Przyjęty koszt: „do zadania 16 każde zalogowanie i przeładowanie zaczyna nową grę z pustą drużyną, bo zapisu jeszcze nie ma; powtórzone hasło to jedno pole więcej, ale bez resetu (zadanie 21) literówka w haśle zamyka konto na stałe. Wariant bez gry dla niezalogowanych nie pozwala zajrzeć do gry przed rejestracją.” Zdanie „a gra z przeglądarki przepada” zawęziło pytanie 16 (2026-10-26) do „a gry z przeglądarki nie widać”; co dzieje się z niezapisanym postępem przy wylogowaniu, ustala zadanie 16.
  - Source: cytaty: definicja `definicja_mvp_loop2.md` (zatwierdzona 2026-10-26, odcisk 7692b28a, sha256 8dad9717784d), § In scope, pkt 1: „Każdy może sam założyć konto i od razu grać; […]”, pkt 4: „Zalogowany gracz trafia do siedziby.”; plan, wiersz 15, Goal. Przebieg: Mariusz, 2026-10-25, słowa wyżej (tura 9). Fakt z kodu, osobno: nagłówek strony ma dziś sam tytuł „Loop” (`src/browser/view/app.ts:26`–`29`), a strona przy każdym wczytaniu zaczyna nową grę (`app.ts:24`, `newGame()`), loop2 `9a5f360`.
- 5. Jakie hasło i jaki adres e-mail serwer przyjmuje i co gracz widzi przy adresie, który ma już konto, oraz przy nieudanym logowaniu? (Q5)
  - Answer: w brzmieniu propozycji: „Hasło: co najmniej 12 znaków, najwyżej 128, dowolne znaki; bez wymogu cyfr i wielkich liter.”; „Adres: spacje na początku i końcu są obcinane, a cały adres porównywany bez rozróżniania wielkości liter, więc „Ala@x.pl” i „ala@x.pl” to jedno konto; serwer sprawdza tylko, że adres ma postać „coś@coś”, bo prawdziwość adresu ustala potwierdzenie w zadaniu 20.”; „Adres, który ma już konto: komunikat „Konto z tym adresem już istnieje.””; „Nieudane logowanie: jeden komunikat „Nieprawidłowy adres e-mail lub hasło.” bez wskazania, co się nie zgadza.” Przyjęte koszty: dwa adresy różniące się tylko wielkością liter przed „@” nie dostaną osobnych kont; „każdy może sprawdzić, czy dany adres ma konto w loop2”.
  - Source: Mariusz, 2026-10-25, słowa wyżej (tura 9).
- 6. Jak długo ważna jest sesja gracza i czy gracz może być zalogowany w kilku przeglądarkach naraz? (Q6; pierwsza połowa pytania otwartego definicji „Jak długo ważna jest sesja gracza i jak chronić żądania zmieniające zapis przed podszyciem się pod gracza?”)
  - Answer: droga A: „Sesja ważna 30 dni od ostatniego żądania i przedłużana przy każdym; logowanie w kilku przeglądarkach naraz dozwolone, każda ma własną sesję; „Wyloguj” kończy sesję tylko tej przeglądarki.” Przyjęty koszt: „urządzenie, które ktoś zostawi zalogowane, daje dostęp do konta do 30 dni; więcej rekordów sesji w bazie”.
  - Source: Mariusz, 2026-10-25, słowa wyżej (tura 9).
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/task.md:90-92`

````markdown
- 16. Przyjąłeś, że po wylogowaniu „gra z przeglądarki przepada”. Czy to zdanie ma wiązać także zadanie 16, w którym gracz wylogowany przed zapisem traciłby postęp od ostatniego zapisu, choć przy wygaśnięciu sesji ten postęp zostaje w przeglądarce? (pytanie przeciw wyborowi K2)
  - Answer: droga B: „K2 kończy się na „po czym wraca ekran formularzy, a gry z przeglądarki nie widać”, a co dzieje się z niezapisanym postępem przy wylogowaniu, ustala zadanie 16 razem z zapisem.” Przyjęty koszt: „zadanie 16 dostaje jedno pytanie więcej; jeśli wybierze zachowanie postępu, niezapisany stan gry zostaje po wylogowaniu w przeglądarce — niewidoczny na ekranie, ale zapisany w niej dla następnej osoby.” W tym zadaniu obie drogi działają tak samo, bo zapisu jeszcze nie ma (punkt 5 To do). Plan umieszcza w zadaniu 16 pytanie „Co dzieje się z niezapisanym postępem gry w przeglądarce, gdy gracz się wyloguje?” (plan: task 16).
  - Source: Mariusz, 2026-10-26: „zgodnie z rekomendacjami” (tura 16). Miejsce pytania w planie: plan `plan_mvp_loop2.md` (sha256 a03d0ca840a3), § Open questions, linia 162: „Co dzieje się z niezapisanym postępem gry w przeglądarce, gdy gracz się wyloguje? — definition: none — plan: task 16”, z linią dziennika zmian 2026-10-26 (linia 230) o dopisaniu pytania i linią 233 o jego obecnym brzmieniu. Kotwica pytania: definicja `definicja_mvp_loop2.md` (zatwierdzona 2026-10-26, odcisk 7692b28a, sha256 8dad9717784d), § Technology, „Sposób utrzymania zalogowania między żądaniami gry”: „Preferencje Mariusza: losowy identyfikator sesji w ciasteczku, rekord w SQLite; przyjęta obsługa wygaśnięcia i ponownego logowania bez utraty niezapisanego postępu.”; wpis projektowany „What happens to unsaved progress when a session expires?” (Decisions in play).
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/task.md:194-199`

````markdown
| K1 | Gracz niezalogowany widzi tylko ekran z formularzami „Zaloguj się” i „Załóż konto”, a siedziby ani panelu programu nie widać, dopóki się nie zaloguje; po założeniu konta gracz jest od razu zalogowany i trafia do siedziby. | decision | pytanie 4 (przebieg przyjęty; Mariusz, 2026-10-25) | czy niezalogowany może grać w przeglądarce bez konta — a stąd w zadaniu 16, czy łączyć stan zagrany przed zalogowaniem z zapisem konta |
| K2 | Przycisk „Wyloguj” stoi w nagłówku strony obok tytułu; wylogowanie kończy sesję tylko tej przeglądarki, po czym wraca ekran formularzy, a gry z przeglądarki nie widać. | decision | pytania 4 i 6 (A; Mariusz, 2026-10-25) i pytanie 16 (B; Mariusz, 2026-10-26): co dzieje się z niezapisanym postępem przy wylogowaniu, ustala zadanie 16; obok wpisu projektowanego „What happens to unsaved progress when a session expires?” (Decisions in play) | czy wylogowanie kończy sesje wszystkich przeglądarek gracza, gdzie stoi „Wyloguj” i czy po wylogowaniu gra zostaje na ekranie |
| K3 | Hasło gracza ma od 12 do 128 znaków dowolnego rodzaju, bez wymogu cyfr i wielkich liter. | decision | pytanie 5 (Mariusz, 2026-10-25) | najkrótsze i najdłuższe przyjmowane hasło, także dla nowego hasła z resetu w zadaniu 21 |
| K4 | Serwer obcina spacje na początku i końcu adresu e-mail, porównuje adresy bez rozróżniania wielkości liter, więc „Ala@x.pl” i „ala@x.pl” to jedno konto, i sprawdza tylko postać „coś@coś”, bo prawdziwość adresu ustala potwierdzenie. | decision | pytanie 5 (Mariusz, 2026-10-25) | czy dopasowanie adresu przy potwierdzeniu (zadanie 20) i resecie (zadanie 21) rozróżnia wielkość liter i jak ściśle sprawdzać postać adresu |
| K5 | Rejestracja adresem, który ma już konto, pokazuje „Konto z tym adresem już istnieje.”, a nieudane logowanie jeden komunikat „Nieprawidłowy adres e-mail lub hasło.” bez wskazania, co się nie zgadza. | decision | pytanie 5 (Mariusz, 2026-10-25), z przyjętym kosztem „każdy może sprawdzić, czy dany adres ma konto w loop2” | czy logowanie i reset hasła w zadaniu 21 ukrywają, że adres ma konto, i jaki tekst odmowy sprawdza test (`guidelines/testing.md`, „Behaviour, not implementation”: bez wymagania tekstu odmowy się nie utrwala) |
| K6 | Sesja gracza jest ważna 30 dni od ostatniego żądania i przedłuża się przy każdym, a gracz może być zalogowany w kilku przeglądarkach naraz, każda z własną sesją. | decision | pytanie 6 (A; Mariusz, 2026-10-25) | czas życia ciasteczka i rekordu sesji, przedłużanie przy żądaniu, a w zadaniu 19 — czy blokada kończy jedną sesję, czy wszystkie sesje konta |
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/task.md:205-205`

````markdown
| K12 | Kontrolka czekająca na serwer jest na czas oczekiwania wyłączona (tekst w `text-disabled`), jej napis zmienia się na „Logowanie…” albo „Zakładanie konta…”, a pola formularza są zablokowane; odmowa serwera i brak połączenia stoją jednym zdaniem pod formularzem w roli `warning`. | decision | pytanie 11 (A; Mariusz, 2026-10-25); zmienia D-44: “The state of loading applies to no shared control while none of them waits for a server.” i regułę styleguide'u „States of shared controls”: „loading — nie dotyczy żadnej kontrolki […]” | wygląd stanu loading, w tym przycisków zapisu zadania 16, i rola komunikatu odmowy serwera |
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/reports/44-client-report.md:88-114`

````markdown
## Choices (rejected way, cost if wrong)

1. **Real fetch with a global base address.** `tests/account-api.test.mjs` sets `globalThis[Symbol.for("undici.globalOrigin.1")]` so that the relative paths resolve, the way a page's address does in a browser. Rejected: a base-URL option in the client (would make the client accept absolute addresses, against D-106), a fetch stand-in (forbidden). Cost: the symbol is an undici internal; a Node version that changes it breaks the test file (the guideline example says to recheck on a Node upgrade). The Linux harness runs Node 24.22.1 and passes.
2. **Success needs the call's exact status; extra body properties are ignored but dropped.** Rejected: rejecting extra properties (a harmless server addition would sign nobody in). Cost: a field the server adds is invisible to the client until the client is changed.
3. **Refusal message: the server's text only with a known code; otherwise by status.** This follows slice 7's choice 1. Rejected: showing the server's `error` always (the guard refusals carry English text). Cost: a new server code needs a client change to show its message.
4. **Generic wording is mine.** Three Polish sentences are not from the task or the server: "Brak połączenia z serwerem. Spróbuj ponownie." (no connection), "Serwer nie mógł obsłużyć żądania. Spróbuj ponownie." (server error or unexpected answer); 429 without a code reuses the required text "Za dużo prób. Spróbuj ponownie za kilka minut.". The task fixes no wording for these cases; slice 10 owns the screen and may change them. Cost: wording the owner has not seen.
5. **`redirect: "error"`.** A redirect becomes an `unreachable`/`network` failure. Rejected: following redirects (a password POST could be resent elsewhere). Cost: a legitimate future redirect on an API path would read as a network error.
6. **Default time limit 15000 ms** (a parameter for tests). Rejected: no limit; a shorter one (hashing under the password gate can queue). Cost: a slow server makes the player wait up to 15 s.
7. **One commit** for code, test, guidelines and foundation, because the intermediate states of a split would fail `foundation_check.py` (a citation without its invariant, or a pattern without its file).
8. **Two invariants, not three.** The time limit sits in `account-client-outcomes` ("an answer not complete within its time limit" is a failure). Cost: the sentence has several clauses (answer, failed connection, timeout), which the invariants template's WAY-56 asks to judge; they share one rule: a non-success is never an account.

## Concerns (for the orchestrator)

- `credentials: "same-origin"` and `cache: "no-store"` are set but unobservable under Node `fetch` (no cookie jar, no cache); the guideline and the invariant sentence therefore do not claim them as tested. Real-browser evidence belongs to slice 11.
- The hand-copied contract has no test against the real server in this slice; a server change of status or body shows only when slice 11 or a later integration test runs both. This is the weak point named in D-115.
- `guidelines/testing.md` needs the new test file in the integration test list (see above).
- The only `Violated: yes` account invariant touching this slice, `loop2-shared-public-origin`, stays marked (see above).
- Decision number D-115 and the two invariant names will need renumbering/reconciling with upstream PR 31 by the orchestrator, as the handoff says.

## Contract for slice 11 (and the screen of slice 10)

Import `createAccountClient` and the types from `./account-api.js` (path relative to `src/browser/`; compiled to `dist/public/account-api.js`). A result is `ok` or a `failure`:
- `refused` with `status`, `code` (one of the ten server codes or null) and `message` (show it as is);
- `unreachable` with `reason` and `message`;
- `unexpected` with `status` and `message`.

For the screen: `currentAccount()` with `failure.kind === "refused"` and status 401 means "show the forms"; any other failure means one warning with retry, not a signed-in or signed-out state. `logout()` success is `ok: true, value: null`; a failure is not a logout. There is no cookie handling and no storage; only one request per control should be in flight (the client does not serialize calls).
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/reports/45-controls-report.md:32-53`

````markdown
## User-interface states and screenshots

The browser check ran through the Playwright MCP tools (available), after `npm run kitchen-sink`, with the user's playwright-mcp skill and its five references read first. Screenshots are in `reports/`:

- `reports/45-controls-kitchen-sink-full.png` (viewport 1400 wide, full page): the table of shared controls in the seven states with the new row "Pole hasła" and the loading column filled, and the new section "Formularze czekające na serwer".
- `reports/45-controls-focus-submit.png`: the submit button of the refusal form reached by Tab, with the focus outline.
- `reports/45-controls-narrow-forms.png` (viewport 375 wide): the four forms stacked, no horizontal page scroll (`scrollWidth` 360 against `innerWidth` 375).

| State | Sample on the page | Read from the real browser |
|---|---|---|
| Masking | "Pole hasła" row, all seven states, and the password fields of the forms | the inputs have `type=password`; the screenshot shows dots, no letters |
| Button waiting | "Przycisk" row, loading column: "Logowanie…"; form samples with "Logowanie…" and "Zakładanie konta…" | button `disabled`, `aria-busy=true`, computed text colour `rgb(82, 82, 92)`, which is `--text-disabled` `#52525c` |
| Fields locked | "Pole tekstowe" and "Pole hasła" loading cells; fields of both waiting forms | `disabled` on every input, text in `text-disabled` |
| Warning under the form | refusal form ("Nieprawidłowy adres e-mail lub hasło.") and no-connection form ("Brak połączenia z serwerem. Spróbuj ponownie.") | colour `rgb(254, 154, 0)`, which is `--warning` `#fe9a00`; element `role=alert`, one sentence, wraps at 260 px |
| Keyboard focus | form samples | Tab from the e-mail field goes to the password field and then to the submit button; the button matches `:focus-visible` with `solid 2px rgb(244, 244, 245)` (`--focus`); Enter in the password field fires `submit` once (the page cancels it) |
| Visible labels | form samples | each input has a `<label for>` that matches its `id` (`labels[0]` read for all ten inputs of the four forms) |
| Not applicable, with reasons on the page | destructive and selected buttons, select list, number field in loading | the reason texts of `NOT_APPLYING` |

Console: one error, `favicon.ico` 404, a file the page does not have; nothing from the page's code.

A finding that the contract below carries: a focused button that becomes `disabled` loses keyboard focus. After two animation frames `document.activeElement` was `BODY`. The styleguide rule and the guideline now say that the screen must move focus back after the wait.

````

Source: `docs/task-cycles/konta-graczy-i-logowanie/reports/45-controls-report.md:77-118`

````markdown
## Contract of the controls for slice 11

From `src/browser/view/controls/button.ts`:
- `createButton(text, { kind?, label?, submit? })`; `submit: true` makes `type="submit"`, otherwise `type="button"` as before.
- `setButtonWaiting(button, waitingText | null)`: with text, disabled + `aria-busy=true` + the text shown (the resting text is remembered); with `null`, the resting text and the enabled state come back; a button that was not waiting is left as it is. It never changes focus.

From `src/browser/view/controls/text-field.ts`:
- `createPasswordField(options)` returns the same `Field` as the text field (`element`, `input`, `setError`); the browser masks the value.
- `FieldOptions` gained `visibleLabel?: boolean` (the label is a `<label for>` above the input; otherwise `aria-label`, as before) and `autocomplete?: string` (such as `email`, `current-password`, `new-password`).
- `createFormWarning()` returns `{ element, set(sentence | null) }`: a hidden `<p role="alert" class="form-warning">` that shows one sentence in `warning`. Place `element` under the form.
- Fields are locked with `field.input.disabled = true`; there is no wrapper that locks a whole form.

From `src/browser/styles.css`: class `form` (a column with the spacing token, for a `<form>` of the screen); `form-warning`, `input-field-label`. The kitchen-sink page's `formSample` in `src/browser/kitchen-sink/kitchen-sink.ts` is the reference for composing a form (a `<form>` whose submit handler is the screen's, the fields, the submit button, the warning).

The screen must: show the client's three generic Polish failure sentences and the server's own messages as the client returns them (slice 9, unchanged here); serialize transitions; clear password inputs when leaving; and, after the answer, call `setButtonWaiting(button, null)`, unlock the fields and move focus to the field or button the player began from (the disabled button drops it to `body`).

## Reaches beyond the dispatch

- `scripts/kitchen-sink.mjs:1-60`, to learn how the page is built and served, and `tests/invariants/test_application_build_kitchen_sink.py:1-40`, to know what `npm test` holds the page to.
- `src/browser/view/controls/number-field.ts` (whole, it builds on `createInputField` which I changed), `.the-way/product-guidelines/styleguide/SKILL.md`, `.the-way/product-guidelines/coding/template.md` (grep for the status rules), `docs/task-cycles/konta-graczy-i-logowanie/reports/44-client-report.md:42-57` and `linux-verification.md` for the harness command.
- `guidelines/coding.md:1-243`, `src/browser/AGENTS.md`, `foundations/decisions.md:857-871, 1365-1377, 1521-1546` and the invariant entries `browser-view-*`, `design-token-*`, `application-build-kitchen-sink`: as named by the dispatch.
- I did not invoke the five project skills as tools; I followed `the-way-make-change` and `the-way-maintain-styleguide` by hand from the pinned files (the styleguide skill is written for a refinement, so I took from it the order of work and the rule that an accepted meaning is only applied, not invented). I did not read `cycle.md`.
- Playwright MCP wrote its snapshot and console logs to `.playwright-mcp/` under the main checkout `C:\Storage\repos\loop2\` (its root is the session that started the server, not this worktree) and the screenshots first landed there; I copied the three screenshots to this worktree's `reports/`, deleted the copies and removed `.playwright-mcp/` in the main checkout. Nothing else was touched there.

## Choices (rejected way, cost if wrong)

1. **`setButtonWaiting` in `button.ts` with a `WeakMap` of resting texts.** Rejected: leaving the text swap to each screen (two screens and the logout button would each repeat it, and the disabled state, `aria-busy` and the restore could drift); a `data-` attribute for the resting text (a second source of state in the DOM). Cost: module-level state; one more exported function for a thing the guidelines call "the screen adds its own handler".
2. **`createFormWarning` in `text-field.ts`**, not a new file. Rejected: a new controls file (the Change list has nine paths, and a new file would be a new path and a part-map entry). Cost: the text-field module now holds one non-field control.
3. **Visible label as an option of the field** (`visibleLabel`), not a separate label element each screen builds. Rejected: `aria-label` plus a screen-built text (a screen reader would read the name twice, and each screen would style its own labels). Cost: `FieldOptions` is a little wider; the number field gets the option too.
4. **The kitchen-sink samples of the waiting state are four composed forms plus the loading column of the table**, built from the real shared controls through the same functions a screen will use. Rejected: only the table (it does not show the label change on a button in its form or the warning under the form). Cost: the page grew by about 150 lines and holds sentences from slice 9 and the task; they are copied by hand and can drift from `account-api.ts` (the page is not allowed to import the client: the page imports only modules the game uses, and the client is not one yet).
5. **Loading for the text field and password field shows the locked field**, which looks like disabled. Rejected: declaring loading not applicable to fields (the task says the fields are locked while waiting). Cost: two columns look the same; the difference is the context (the form samples show the pair together).
6. **Loading does not apply to the destructive and selected buttons, the select list or the number field**, each with a reason on the page. Rejected: showing a waiting sample for all (no form waits on them; a counterfeit sample). Cost: a future screen that makes one of these wait changes the reason (the reason text says "żaden formularz … nie ma …").
7. **Did not rewrite D-44 or record a new decision**, because D-44 already carries the rule (see above). Rejected: re-recording it. Cost: none; if the orchestrator renumbers decisions with upstream PR 31, D-44 is not among them.
8. **The `form` class of `styles.css` is a layout helper** with the spacing token, `align-items: flex-start` (the button keeps its natural width). Rejected: a stretched button (a full-width button is a new look no decision settles). Cost: slice 11 may want the forms side by side or in a panel; the panel is the screen's.

## Concerns and problems as observed

- **The wording of the three generic failure sentences is still mine from slice 9** (reports/44-client-report.md, choice 4); this slice shows two of them on the page as samples and did not change them. The owner has not seen the wording.
- **A disabled button drops focus** (verified in Chrome, two frames after the change). Not a defect of this slice, since no screen uses the button yet; it is stated in the contract and in the styleguide. If slice 11 omits the focus return, that would be a defect (D-88's return condition, above).
- **`role=alert` on a hidden-then-shown paragraph** announces in most readers by convention; I did not test a reader (not exercised, stated above).
- **The empty list sample** (`select` with no options) has no reason text; it is the state "empty" of an existing control and predates the slice.
- **A guess, not verified:** that the first error of the Playwright console (favicon 404) would also appear on the served game page; I did not open it.
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/spec.md:76-85`

````markdown
Production selects explicit cloudflare-tunnel mode on the private two-service Compose topology. Express trusts exactly the immediate hop for protocol, not arbitrary forwarded chains. Before account work require one X-Forwarded-Proto=https and one syntactically valid CF-Connecting-IP, rejecting duplicated/list/malformed values. Use that address, normalized for equivalent IP representations, as the limiter key; never trust an attacker-selected leftmost X-Forwarded-For, X-Real-IP or Forwarded. The transport adapter supplies the client address explicitly; req.ip need not be policy authority. Forwarded Host never chooses the expected origin.

The boundary is private topology, not the header's name. Do not publish the application port or silently apply this policy to arbitrary development listeners. Static files and internal anonymous health probes need no proxy metadata; absent metadata cannot create or authorize an account session. Account requests without required transport metadata are refused. Local synthetic headers prove parser/policy behavior, not the real tunnel. Target acceptance checks actual secure-cookie issuance and canonical address handling. If Workers, transforms removing/replacing address headers or Pseudo IPv4 overwrite are present, review their effect before acceptance; this spec does not claim those settings were inspected.

Every mutating route requires exactly the configured serialized HTTPS Origin, including port when present; missing/null/duplicate/foreign/suffix-lookalike values fail. Do not derive it from Host. Accept application/json with optional charset only, reject compressed body inflation, cap at 16 KiB, and validate an object of expected fields. No CORS allowance or URL-encoded/text/plain workaround. Logout obeys the same guards; GET account is read-only and session-protected.

Configured local checks may use explicit loopback-proxy mode: trust a loopback peer only, require forwarded https and use the actual local peer as client identity, ignoring supplied Cloudflare headers. Real-browser checks use a temporary local HTTPS proxy and fixed HTTPS origin, preserving Secure. Ordinary direct mode trusts no forwarding. The local fixture adds no production service or insecure cookie mode.

Generic trust-proxy=true/leftmost forwarded IP was rejected as spoofable. Fixed container IP/subnet was rejected as added coordination without benefit over the existing closed topology. The chosen policy depends on topology and Cloudflare semantics; automated crafted-input checks and actual deployment checks prove different aspects.

````
