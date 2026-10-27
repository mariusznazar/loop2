# Exact slice 10 selection

````markdown
### Slice 10 — Shared password and waiting controls

- **Goal:** Extend the shared field with masked password support and shared button form capability where needed. Show required waiting labels, disabled fields and form warning in the kitchen sink using existing tokens. Through maintain-styleguide revise D-44 and the state rule; through maintain-coding-guidelines update existing browser-module copy listings. Every affected state has a sample or precise nonapplicability. No new token value/framework; samples do not counterfeit game state.
- **Change:** `src/browser/view/controls/text-field.ts` · `src/browser/view/controls/button.ts` · `src/browser/kitchen-sink/kitchen-sink.ts` · `src/browser/kitchen-sink/kitchen-sink.css` · `src/browser/styles.css` · `guidelines/styleguide-browser-view.md` · `guidelines/coding-browser-module.md` · `foundations/decisions.md` · `foundations/part_map.md`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `docs/task-cycles/konta-graczy-i-logowanie/task.md:14-37` To do and Acceptance criteria · `docs/task-cycles/konta-graczy-i-logowanie/task.md:208-215` Out of scope · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:6-25` Intent, Goals and non-goals, Constraints · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:138-167` Units and code kinds; Tests and evidence · `foundations/decisions.md:1339-1507` D-73–D-85 · `foundations/decisions.md:1547-1559` D-89 · `foundations/glossary.md:94-104` unit test; integration test · `foundations/invariants.md:572-581` node-test-selection · `foundations/part_map.md:105-128` agent-workflow; product-foundation · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `foundations/decisions.md:39-93` D-03–D-04 · `foundations/decisions.md:358-376` D-18 · `foundations/decisions.md:737-751` D-36 · `foundations/decisions.md:767-931` D-38–D-48 · `foundations/decisions.md:1521-1546` D-87–D-88 · `foundations/part_map.md:3-27` browser-view · `foundations/invariants.md:35-44` browser-view-framework · `foundations/invariants.md:452-501` tokens/focus/contrast/sources/kitchen-sink · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:126-137` Browser and control lifecycle · `docs/task-cycles/konta-graczy-i-logowanie/task.md:73-75` Q11 · `docs/task-cycles/konta-graczy-i-logowanie/task.md:205-205` K12 · `src/browser/tokens.css` · `src/browser/kitchen-sink/index.html` · `src/browser/view/status-row.ts:47-93` shared control exemplar · `.agents/skills/the-way-maintain-styleguide/SKILL.md` · `.agents/skills/the-way-maintain-coding-guidelines/SKILL.md` · `.agents/skills/the-way-update-part-map/SKILL.md` · `foundations/decisions.md:857-871` D-44 · `foundations/decisions.md:1365-1377` D-75 · `foundations/decisions.md:1521-1533` D-87 · `foundations/decisions.md:1534-1546` D-88 · `docs/task-cycles/konta-graczy-i-logowanie/reports/44-client-report.md:88-97` · `docs/task-cycles/konta-graczy-i-logowanie/reports/44-client-report.md:107-114` · Foundation rows F12, F25.
- **Model:** cheaper — The accepted waiting semantics and existing controls/tokens supply the implementation pattern.
- **Risk:** none
- **Checks:** Run npm test for compilation, token/focus/contrast and kitchen-sink isolation. After npm run kitchen-sink inspect masking, disabled/waiting labels, warning and keyboard focus in a real browser; retain screenshots and assess D-75/D-87/D-88 return conditions. Apply playwright-mcp and its grounding/session/evidence references before use. No implementation-mirroring control test or permanent browser suite is required. Run python -B .the-way/elements/common/foundation_check.py.
- **Depends on:** Slice 9 · Foundation rows F12, F25.
- **Dispatch reads to materialize:** none beyond updated guideline/foundation files already selected. Add actual files/ranges once produced and rerun slice_size.py before execution; do not treat the current size as counting unborn source. Read any newly created guideline of a kind this slice changes whole.

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

Source: `docs/task-cycles/konta-graczy-i-logowanie/spec.md:126-137`

````markdown
### 7. Browser and control lifecycle

Start with title/footer and session-check waiting UI, no game/program construction. GET account chooses authenticated shell or forms. A 401 shows forms; network/server error gives one warning plus retry, not false signed-in/out state. No localStorage identity or cookie parsing.

Both required forms use shared controls and visible labels. Extend the shared text field with a masked-password variant rather than separately styled inputs. While submitting, disable fields/buttons, show Logowanie… or Zakładanie konta… in text-disabled and prevent overlapping transitions across both forms. Restore controls and one warning under the originating form on refusal/network error. Render plain text, not server HTML. Clear password inputs on leaving and never persist credentials in the game model.

Successful create/login/restoration mounts newGame(), existing empty team and Program group. Shared Wyloguj button stands beside title. During logout show disabled waiting state. Success or explicit expired-session response disposes game and returns to forms. Network/server failure keeps game and shows warning because server outcome is uncertain; do not claim logout succeeded.

Game mount exposes disposal: stop interval, detach owned events/DOM. Extend clock with stop/dispose so repeated login does not accumulate timers or keep hidden games running. Serialize transitions and invalidate stale async responses so they cannot remount/overwrite newer state. Current recreation is pre-save behavior, not a permanent unsaved-progress rule. No heartbeat/save retry feature.

Add loading/password/form-error samples to the existing kitchen-sink, revise D-44/styleguide through its skill, use existing tokens/wrapping and keep keyboard focus. Capture real-browser forms, waiting/error, authenticated header/headquarters, logout, narrow layout/focus and kitchen-sink loading using synthetic local data. Public post-deployment account creation/login journey belongs to the human under D-12 because it changes server data; agent may inspect signed-out public UI.

````

Source: `docs/task-cycles/konta-graczy-i-logowanie/task.md:73-75`

````markdown
- 11. Jak wygląda kontrolka czekająca na serwer i jak odmowa serwera? (Q11)
  - Answer: droga A: „Na czas oczekiwania przycisk jest wyłączony (tekst w `text-disabled`), a jego napis zmienia się na „Logowanie…” albo „Zakładanie konta…”; pola formularza są zablokowane. Odmowa serwera i brak połączenia stoją jednym zdaniem pod formularzem w roli `warning` („Uwaga: coś się nie wykona…”), tak jak dziś błędny wpis w polu.” Przyjęty koszt: „brak ruchomego wskaźnika — przy długim czekaniu widać tylko zmieniony napis”.
  - Source: Mariusz, 2026-10-25, słowa wyżej (tura 9); D-44: “The state of loading applies to no shared control while none of them waits for a server.” (`foundations/decisions.md`, loop2 `9a5f360`).
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/task.md:205-205`

````markdown
| K12 | Kontrolka czekająca na serwer jest na czas oczekiwania wyłączona (tekst w `text-disabled`), jej napis zmienia się na „Logowanie…” albo „Zakładanie konta…”, a pola formularza są zablokowane; odmowa serwera i brak połączenia stoją jednym zdaniem pod formularzem w roli `warning`. | decision | pytanie 11 (A; Mariusz, 2026-10-25); zmienia D-44: “The state of loading applies to no shared control while none of them waits for a server.” i regułę styleguide'u „States of shared controls”: „loading — nie dotyczy żadnej kontrolki […]” | wygląd stanu loading, w tym przycisków zapisu zadania 16, i rola komunikatu odmowy serwera |
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/reports/44-client-report.md:88-97`

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
````

Source: `docs/task-cycles/konta-graczy-i-logowanie/reports/44-client-report.md:107-114`

````markdown
## Contract for slice 11 (and the screen of slice 10)

Import `createAccountClient` and the types from `./account-api.js` (path relative to `src/browser/`; compiled to `dist/public/account-api.js`). A result is `ok` or a `failure`:
- `refused` with `status`, `code` (one of the ten server codes or null) and `message` (show it as is);
- `unreachable` with `reason` and `message`;
- `unexpected` with `status` and `message`.

For the screen: `currentAccount()` with `failure.kind === "refused"` and status 401 means "show the forms"; any other failure means one warning with retry, not a signed-in or signed-out state. `logout()` success is `ok: true, value: null`; a failure is not a logout. There is no cookie handling and no storage; only one request per control should be in flight (the client does not serialize calls).
````
