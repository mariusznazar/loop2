# Handoff — Slice 3 executor, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **executor of Slice 3**, a fresh
agent. Your questions go to the orchestrator, never to the human; you return at the end of your
slice and start no other.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`. Slice base = head when you start: `bbf6ad2`. Process pin
  `.the-way` at `a8dfe8a`.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it
  names only when the step or variant that names it comes. Variant: "a slice, or the retry of a
  slice".
- Class: `cheaper` (plan, *Model*).
- Frozen task, spec and plan: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md`, `spec.md`,
  `plan.md` — read the passages copied below; open a file for more only where your work needs it,
  and name that reach in your report.
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/14-slice3-report.md`
- The product's instructions: `AGENTS.md` (read `guidelines/coding.md` before changing product
  code and `guidelines/testing.md` before writing tests). Commit on the task branch by path, English
  messages in the form of the existing commits. Run only your slice's focused checks, each reported
  with its command and exit code; do not run the whole gate (`npm test` with no argument).

## Answers of step 4

- Trust boundary: **yes** — your slice is on it: the save routes in `src/server/**` take a whole
  saved game state as JSON from the network, authorized by the session alone. Every request must
  meet D-104's guards (exact Origin, `application/json`, no compressed body, 64 KiB for the save
  route and 16 KiB for the others), name no account in its fields, and get JSON 401 without a valid
  session or for a blocked account; crafted bodies (wrong types, extra keys, non-integer or huge
  `version` and `basedOn`, oversized or multi-byte text) are refused without changing what is
  stored. Your slice gets a review of its own aimed at that.
- Irreversible operation: **yes** for the cycle (schema step 4, written by Slice 2), not in your
  slice; deploy nothing and touch no server (D-12).

## Done before you

- Foundation entries (`fb1ef9d`, D-97 fixed in `59cd18a`) — the plan's rows map to: row 1 D-07,
  row 2 D-179, row 4 D-181, row 9 D-186, row 10 D-187, row 15 D-104, row 17 D-109, row 21
  `player-save-isolation`, row 26 `account-mutation-request-guards`, row 29
  `account-session-authorization`, row 30 `blocked-account-access`, row 34 the `account-server`
  part-map sentence.
- Slice 1 (`b36292e`, reviewed PASS): `src/browser/sim/saved-game.ts` in the simulation; the server
  never reads `game` (D-07).
- Slice 2 (`bbf6ad2`, reviewed `PASS bbf6ad2`): `src/server/database.ts` has schema step 4 and the
  read and guarded write of an account's saved game state; read its exported operations there and
  in `tests/account-storage.test.mjs` before building on them.

## Your section of the plan (copied word for word from plan.md)

### Slice 3 — The save routes

- **Goal:** `src/server/account-routes.ts` serves `GET /api/saved-game` and `PUT /api/saved-game`
  as spec decision 1 gives: the answers and their exact fields; the codes `unauthenticated` (401),
  `invalid-request` (400), `save-too-large` (413), `save-outdated` and `save-conflict` (409); the
  order of the checks, the version check before the revision check; no field of either request
  naming an account and an extra field refused; the stored text serialized from the parsed `game`
  measured at most 65 536 bytes before the write; `game` returned unchanged inside `save.game`;
  the database operations of Slice 2. The save path joins the router's `paths` table, so the
  transport check covers it. `mutationGuards` in `src/server/transport.ts` takes the route's body
  limit as a parameter: 64 KiB for the save route, 16 KiB for the five other state-changing routes,
  the Origin, media-type, compression and object checks the same for all six (decision 3).
  `tests/http.test.mjs` gains, on real HTTP and SQLite: two accounts' sessions each read and replace
  only their own saved game state and no body field selects another (`invariant:
  player-save-isolation`); no session, a forged or removed session, and a session of a blocked
  account each get JSON 401 on both routes and leave the stored state unchanged (`invariant:
  account-session-authorization`, `invariant: blocked-account-access`, spec decision 10); and the
  contract — `null` with no save, the first save's revision 1, conflict, outdated before conflict,
  each malformed body 400, a stored text over the limit 413. `tests/transport.test.mjs` gains the
  save route among the guarded routes — refused requests change no saved game state, a body over
  64 KiB on it and over 16 KiB on the others refused — and the transport check's refusal on the save
  path (`invariant: account-mutation-request-guards`, `invariant: account-request-transport`).
- **Change:** `src/server/account-routes.ts` · `src/server/transport.ts` · `tests/http.test.mjs` ·
  `tests/transport.test.mjs`
- **Read:** `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:20-23` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:26-26` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:54-64` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:95-100` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:210-220` Questions carried to cycle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:292-293` Settlements to record ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:298-298` Settlements to record ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:51-77` Constraints ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:81-112` 1. Two routes on one path, with a revision number and a separate version field ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:143-165` 3. D-104 and account-mutation-request-guards cover the save route, with its own limit ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:366-388` 10. Guideline passages the change makes untrue (settled by the orchestrator) ·
  Foundation entries row 1 · Foundation entries row 2 · Foundation entries row 4 ·
  Foundation entries row 9 · Foundation entries row 10 · Foundation entries row 15 ·
  Foundation entries row 17 · Foundation entries row 21 · Foundation entries row 26 ·
  Foundation entries row 29 · Foundation entries row 30 · Foundation entries row 34 ·
  `foundations/decisions.md:17-37` D-02 · `foundations/decisions.md:94-113` D-05 ·
  `foundations/decisions.md:135-153` D-07 · `foundations/decisions.md:763-776` D-37 ·
  `foundations/decisions.md:1799-1810` D-101 · `foundations/decisions.md:1842-1853` D-104 ·
  `foundations/decisions.md:1896-1907` D-108 · `foundations/decisions.md:1909-1920` D-109 ·
  `foundations/decisions.md:1922-1935` D-110 · `foundations/decisions.md:2528-2541` D-137 ·
  `foundations/decisions.md:2543-2554` D-138 ·
  `foundations/invariants.md:25-33` account-server-express-http ·
  `foundations/invariants.md:45-53` loop2-api-error-route ·
  `foundations/invariants.md:708-716` loop2-shared-public-origin ·
  `foundations/invariants.md:718-726` account-session-authorization ·
  `foundations/invariants.md:728-736` account-mutation-request-guards ·
  `foundations/invariants.md:738-746` account-request-transport ·
  `foundations/invariants.md:858-866` blocked-account-access ·
  `foundations/invariants.md:868-876` player-server-session ·
  `foundations/invariants.md:678-686` player-express-session-sqlite-store ·
  `foundations/environment_facts.md:310-314` fetch-origin-header ·
  `foundations/environment_facts.md:340-344` samesite-strict-cookie ·
  `foundations/environment_facts.md:298-302` cgroup-memory-accounting ·
  `foundations/glossary.md:157-161` blocked account ·
  `guidelines/coding.md` · `guidelines/coding-http-application.md` · `guidelines/testing.md` ·
  `src/server/database.ts` · `src/server/app.ts` · `src/server/session-store.ts` ·
  `src/server/account-block.ts`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/**` (`src/server/account-routes.ts`,
  `src/server/transport.ts`): routes that take a whole saved game state as JSON from the network,
  authorized by the session alone
- **Checks:** `npm test -- tests/http.test.mjs` (its case "each account's session reads and replaces
  only its own saved game state" written first, failing) ·
  `npm test -- tests/transport.test.mjs` ·
  `npm test -- tests/invariants/test_loop2_api_error_route.py` ·
  `npm test -- tests/invariants/test_account_server_express_http.py` ·
  `npm test -- tests/invariants/test_account_server_typecheck.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 2 · Foundation entries rows 1, 2, 4, 9, 10, 15, 17, 21, 26, 29, 30, 34

## Current ranges of the foundation entries your *Read* names

The foundation step (`fb1ef9d`) and earlier slices moved entries; these ranges, taken from the worktree as it stands at your base, hold where they differ from the plan's. Read each entry whole.

- plan row 1 → `foundations/decisions.md:146-171` D-07 — How is the work of the game split between the server and the browser?
- plan row 2 → `foundations/decisions.md:3200-3218` D-179 — Who can create and use a player account?
- plan row 4 → `foundations/decisions.md:3237-3268` D-181 — How does the browser exchange saved game states with the server?
- plan row 9 → `foundations/decisions.md:3396-3438` D-186 — Which browser's save of the game state does the server accept?
- plan row 10 → `foundations/decisions.md:3440-3465` D-187 — What does the server do with a save of the game state of a lower version than the one it holds?
- plan row 15 → `foundations/decisions.md:1863-1874` D-104 — Which request origin and body may change account state?
- plan row 17 → `foundations/decisions.md:1930-1941` D-109 — What identity authorizes an account request?
- plan row 21 → `foundations/invariants.md:948-956` player-save-isolation
- plan row 26 → `foundations/invariants.md:728-736` account-mutation-request-guards
- plan row 29 → `foundations/invariants.md:718-726` account-session-authorization
- plan row 30 → `foundations/invariants.md:858-866` blocked-account-access
- plan row 34 → `foundations/part_map.md:60-77` account-server
- `foundations/decisions.md:17-37` D-02 — How does the account and save server handle HTTP requests?
- `foundations/decisions.md:105-124` D-05 — What serves the built game and account requests in the container?
- `foundations/decisions.md:146-171` D-07 — How is the work of the game split between the server and the browser?
- `foundations/decisions.md:781-794` D-37 — Which file is the exemplar for the HTTP application?
- `foundations/decisions.md:1820-1831` D-101 — How long do independent browser sessions last?
- `foundations/decisions.md:1863-1874` D-104 — Which request origin and body may change account state?
- `foundations/decisions.md:1917-1928` D-108 — What public address do the game and account server share?
- `foundations/decisions.md:1930-1941` D-109 — What identity authorizes an account request?
- `foundations/decisions.md:1943-1956` D-110 — Which proxy information identifies an account request?
- `foundations/decisions.md:2548-2561` D-137 — How does the operator block and unblock a player account?
- `foundations/decisions.md:2563-2574` D-138 — How is a player's login kept between requests?
- `foundations/invariants.md:25-33` account-server-express-http
- `foundations/invariants.md:45-53` loop2-api-error-route
- `foundations/invariants.md:708-716` loop2-shared-public-origin
- `foundations/invariants.md:718-726` account-session-authorization
- `foundations/invariants.md:728-736` account-mutation-request-guards
- `foundations/invariants.md:738-746` account-request-transport
- `foundations/invariants.md:858-866` blocked-account-access
- `foundations/invariants.md:868-876` player-server-session
- `foundations/invariants.md:678-686` player-express-session-sqlite-store
- `foundations/environment_facts.md:310-314` fetch-origin-header
- `foundations/environment_facts.md:340-344` samesite-strict-cookie
- `foundations/environment_facts.md:298-302` cgroup-memory-accounting
- `foundations/glossary.md:157-161` blocked account

## Other files your *Read* names (each whole unless a range is given)

- `guidelines/coding.md`
- `guidelines/coding-http-application.md`
- `guidelines/testing.md`
- `src/server/database.ts`
- `src/server/app.ts`
- `src/server/session-store.ts`
- `src/server/account-block.ts`

## Passages of the task, spec and plan your *Read* names (copied word for word)

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:20-23` To do

2. Przeglądarka pobiera i wysyła cały zapis stanu gry jako JSON żądaniami `fetch()` na względne ścieżki `/api/` tego samego adresu co gra, przez klienta API przeglądarki (D-108, D-117; wpisy projektowane „How does the browser exchange saved game states with the server?” i `saved-state-http-exchange/1`).
3. Zapis odczytuje i zmienia tylko zalogowany gracz i tylko zapis własnego konta: konto wskazuje ważna sesja, a identyfikator konta podany w żądaniu niczego nie uprawnia; żądanie zapisu bez ważnej sesji dostaje odmowę (jej kod wybiera cykl — Questions carried to cycle), a zablokowane konto nie korzysta z żądań zapisu (wpis projektowany „Who can create and use a player account?”, `player-save-isolation/1`, `blocked-account-access`, D-109).
4. Żądanie zmieniające zapis spełnia D-104 — nagłówek `Origin` loop2 i treść JSON — a trasa zapisu przyjmuje treść do 64 KiB, gdy inne trasy zostają przy 16 KiB; serwer przechowuje najwyżej 64 KiB zapisu na gracza. Cykl zmienia odpowiednio D-104 (pytanie 9). Niezmiennik `account-mutation-request-guards` nie podaje liczby — mówi „oversized” o każdej „state-changing account route” — więc czy obejmuje trasę zapisu i jaki rozmiar jest dla niej „oversized”, ustala cykl (Questions carried to cycle).
5. Zapis niesie numer wersji swojego kształtu, a gra wczytuje w całości tylko zapis o bieżącej wersji; zapis każdej innej wersji, zapis, którego postać ma archetyp nieobecny w danych, i zapis o złym kształcie gra odrzuca w całości, razem z programami gracza, i zaczyna dla gracza grę od nowa (wpis projektowany „What happens to a saved game state of another version?”, `save-version/1`; pytanie 10). Po odrzuceniu zapisu innej wersji albo z archetypem spoza danych gracz widzi jednorazowe zdanie w roli `warning`: „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” (pytanie 7); po odrzuceniu zapisu o złym kształcie widzi w tym samym miejscu, tak samo jednorazowo, własne zdanie w roli `warning`: „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.” (pytanie 21). Serwer odrzuca zapis o wersji niższej niż wersja zapisu, który już trzyma, a stara karta pokazuje wtedy w roli `warning` „Gra została zaktualizowana. Odśwież stronę.” i przestaje zapisywać (pytanie 4).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:26-26` To do

8. Serwer przyjmuje zapis tylko z przeglądarki, która widziała ostatni zapis na serwerze; zapis z przeglądarki, która go nie widziała, bo w międzyczasie zapisała inna, odrzuca, a ta przeglądarka porzuca swój niezapisany stan, wczytuje zapis z serwera — trwające ręczne przejście zatrzymane pauzą — pokazuje w roli `warning`: „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.” i toczy grę dalej od wczytanego zapisu, zapisując jak zwykle; zdanie znika po pierwszym udanym zapisie (pytania 3 i 16).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:54-64` Questions to settle

- 3. Co się dzieje, gdy ta sama gra jest otwarta w dwóch przeglądarkach — który zapis wygrywa? (Q3; pytanie otwarte planu przypisane temu zadaniu)
  - Answer: droga B: serwer przyjmuje zapis tylko z przeglądarki, która widziała ostatni zapis na serwerze; zapis z przeglądarki, która go nie widziała (bo w międzyczasie zapisała inna), odrzuca. Ta przeglądarka przestaje zapisywać, wczytuje zapis z serwera i pokazuje w roli `warning`: „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.” — jej niezapisany postęp przepada. Przyjęty koszt: dodatkowy numer przy zapisie na serwerze i stan ekranu do zbudowania; postęp z przeglądarki, która przegrała, przepada.
  - Not chosen:
    - A — wygrywa ostatni zapis — przy zapisie automatycznym (pytanie 1) stara karta, np. na komputerze, nadpisze przy najbliższym zapisie, bez słowa, godzinę gry z drugiej przeglądarki, np. z telefonu.
    - C — jedna przeglądarka naraz: wczytanie gry w nowej przeglądarce wyłącza zapisy w starej (w praktyce B, widziane od strony nowej przeglądarki) — koszt jak B: dodatkowy numer przy zapisie na serwerze i stan ekranu do zbudowania; postęp z przeglądarki, która przegrała, przepada.
  - Source: Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji” — rekomendacja B pytania Q3, w pakiecie jako D3 (tura 9).
- 4. Co robi przeglądarka ze starszym kodem gry — karta otwarta przed wdrożeniem — gdy na serwerze leży zapis nowszej wersji? (Q4)
  - Answer: droga B: serwer odrzuca zapis o wersji niższej niż wersja zapisu, który już trzyma, a stara karta pokazuje w roli `warning`: „Gra została zaktualizowana. Odśwież stronę.” i przestaje zapisywać. Wpis projektowany o zapisie innej wersji zostaje bez zmian; serwer tylko porównuje numer wersji i nie liczy nic z gry (D-07). Przyjęty koszt: serwer musi znać numer wersji przyjmowanego zapisu; jeden stan ekranu więcej.
  - Not chosen:
    - A — dosłownie jak we wpisie projektowanym, bez żadnej ochrony — stara karta po wdrożeniu może skasować grę zaczętą w nowej karcie: zapisuje swój stan starej wersji albo, po odmowie z pytania 3, wczytuje nowy zapis, odrzuca go jako „inną wersję”, zaczyna od nowa i zapisuje pustą grę; przy częstych wdrożeniach w fazie testów to realne dla właściciela.
  - Source: Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji” — rekomendacja B pytania Q4, w pakiecie jako D4 (tura 9).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:95-100` Questions to settle

- 9. Jak ograniczyć rozmiar żądania i zapisu stanu gry, aby publiczny serwer nie przyjął zbyt dużych danych? (Q9; pytanie otwarte planu przypisane temu zadaniu)
  - Answer: droga B: trasa zapisu przyjmuje do 64 KiB, inne trasy zostają przy 16 KiB; serwer przechowuje najwyżej 64 KiB na gracza. Przyjęty koszt: D-104 i niezmiennik `account-mutation-request-guards` zmieniają się w cyklu; 1000 kont przy pełnym limicie to około 65 MB na kopię bazy — Strych mieści około trzy takie kopie, więc przy tylu graczach zadanie 17 musiałoby wybrać mniej kopii albo inne miejsce.
  - Not chosen:
    - A — trasa zapisu bierze limit D-104, 16 KiB, a serwer przechowuje najwyżej tyle — bez zmiany D-104, ale prawdopodobnie któreś z zadań 10, 12, 13 albo 18 trafi na limit i będzie musiało zmienić D-104; zapis za duży serwer odrzuca, a gracz widzi to jak nieudany zapis (pytanie 2); 1000 kont przy pełnym limicie to około 16 MB na kopię — Strych mieści około 12 takich kopii.
    - C — 1 MiB — zapas na długo, ale Strych mieści przy pełnym limicie około 190 zapisów łącznie, np. siedem kopii po 27 kont; jedno żądanie zajmuje więcej pamięci kontenera (512 MiB, skill `loop2-deploy`).
  - Source: Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji” — rekomendacja B pytania Q9, w pakiecie jako D9 (tura 9).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:210-220` Questions carried to cycle

## Questions carried to cycle

- Jak przeglądarka rozpoznaje, że ponowne zalogowanie po wygaśnięciu sesji jest na to samo konto (np. identyfikator konta z odpowiedzi `GET /api/account`) — wybór cyklu w granicach D-109.
- Ścieżki, metody i kody odmowy tras zapisu oraz ich klient w przeglądarce — wybór cyklu w granicach D-104, D-108, D-109 i D-117.
- Czy niezmiennik `account-mutation-request-guards` (“Every state-changing account route refuses … a non-JSON, compressed, oversized or structurally invalid body …”) obejmuje trasę zapisu i jaki rozmiar jest dla niej „oversized” (punkt 4) — wybór cyklu w granicach D-104 po jej zmianie.
- Gdzie stoi numer wersji kształtu zapisu i co pilnuje, żeby zmiana kształtu stanu gry podbiła ten numer — wybór cyklu w granicach `save-version/1`; skąd serwer zna numer wersji przyjmowanego zapisu (osobne pole żądania albo kolumna, pytanie 4) — wybór cyklu w granicach D-07.
- Czym przeglądarka pokazuje serwerowi, że widziała ostatni zapis (pytanie 3) — wybór cyklu.
- Jak wysłać ostatni zapis przy zamykaniu albo ukrywaniu karty (pytanie 1) — wybór cyklu w granicach D-104 i D-117 oraz limitu treści żądań wysyłanych przy zamykaniu strony (`keepalive`, `sendBeacon`), który przy zapisie do 64 KiB może nie przepuścić ostatniego zapisu — limit do sprawdzenia w standardzie Fetch; w repozytorium nie ma o nim faktu środowiskowego.
- Jak często gra ponawia nieudany zapis (pytanie 2) — wybór cyklu.
- Kolejność zdania o nieudanym zapisie i wiersza niepotwierdzonego adresu (D-157), gdy oba stoją w nagłówku — wybór cyklu w granicach `guidelines/styleguide-browser-view.md`.
- *Scope* wpisów, które zapisuje to zadanie, stoi w definicji jako `TODO`; cykl ustala je z mapy części.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:292-293` Settlements to record

| 3 | Serwer przyjmuje zapis tylko z przeglądarki, która widziała ostatni zapis na serwerze; zapis z przeglądarki, która go nie widziała, bo w międzyczasie zapisała inna, odrzuca, a ta przeglądarka porzuca swój niezapisany stan, wczytuje zapis z serwera — trwające ręczne przejście zatrzymane pauzą — pokazuje w roli `warning`: „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.” i toczy grę dalej od wczytanego zapisu, zapisując jak zwykle; zdanie znika po pierwszym udanym zapisie. | decision | pytanie 3 (B; Mariusz, 2026-10-29) i pytanie 16 (A; Mariusz, 2026-10-29), które daje temu wierszowi to brzmienie; to reguła, której wymaga uzasadnienie wpisu projektowanego „How does the browser exchange saved game states with the server?”: “resolving two browsers' conflicting saves still requires a separate game rule” | czy wygrywa ostatni zapis, czy serwer odrzuca zapis przeglądarki, która nie widziała ostatniego, co wtedy widzi gracz i czy po wczytaniu ta przeglądarka zapisuje dalej, a przejście biegnie |
| 4 | Serwer odrzuca zapis o wersji niższej niż wersja zapisu, który już trzyma, a stara karta pokazuje w roli `warning`: „Gra została zaktualizowana. Odśwież stronę.” i przestaje zapisywać. | decision | pytanie 4 (B; Mariusz, 2026-10-29); obok wpisu projektowanego „What happens to a saved game state of another version?”, który zostaje bez zmian, i D-07 (serwer porównuje tylko numer wersji) | czy serwer przyjmuje każdy zapis, także karty ze starszym kodem, która może nadpisać zapis nowszej wersji, i co widzi gracz w starej karcie |

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:298-298` Settlements to record

| 9 | Trasa zapisu przyjmuje treść do 64 KiB, inne trasy zostają przy 16 KiB, a serwer przechowuje najwyżej 64 KiB zapisu na gracza. | decision | pytanie 9 (B; Mariusz, 2026-10-29); zmienia D-104 (“an application/json body with at most 16 KiB” dla każdej trasy zmieniającej stan); niezmiennik `account-mutation-request-guards` nie podaje liczby („oversized”), więc czy obejmuje trasę zapisu („account route”) i jaki rozmiar jest dla niej „oversized”, ustala cykl | czy trasa zapisu bierze limit 16 KiB z D-104 (i trafi na niego z programami gracza), czy inny, i ile serwer trzyma na gracza |

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:51-77` Constraints

## Constraints

- The task's answers 1–23 and rows 1–10 fix every sentence the player sees, its role and the
  behaviour at each outcome; this spec does not reopen them.
- D-04 (state changed only through the simulation), D-07 (the server computes nothing of the game),
  D-96, D-97, D-101 (several browsers signed in at once), D-104 (Origin and JSON body guard),
  D-108 (relative `/api/` paths), D-109 (the session alone authorizes; a supplied identifier grants
  nothing — its closed lists of what a session authorizes and of the routes that answer JSON 401
  change in this change to take the save routes, see *Foundation entries*), D-112 (one step per schema version, appended, never edited; refuse a newer schema),
  D-117 (client: relative paths, no redirect, typed failure, time limit, no state of its own),
  D-137 (blocking deletes sessions), D-12 (no agent changes the server).
- Invariants `simulation-isolation` and `simulation-inputs` bind the new simulation file; the file
  must not import from outside `src/browser/sim/` nor change its argument.
- `src/server/**` is a trust boundary; the saved game state the server returns is untrusted for the
  simulation (step 4 answer of the handoff). Both places refuse crafted input.
- Environment: the Fetch Standard caps the bodies of all in-flight `keepalive` requests of a page at
  64 kibibytes together — "If the sum of contentLength and inflightKeepaliveBytes is greater than
  64 kibibytes, then return a network error." (whatwg/fetch `fetch.bs`, commit e9460d1b22ea, §
  HTTP-network-or-cache fetch); MDN: a transition to `hidden` "is the last event that's reliably
  observable by the page" (mdn/content `files/en-us/web/api/document/visibilitychange_event/index.md`,
  commit 9a0e5c1cfa8d). Both read 2026-10-29.
- Code as it stands (dce2970): `GameState` is plain JSON-able data (`src/browser/sim/types.ts:279`);
  `checkProgram` already checks an unknown value as a program (`src/browser/sim/programs.ts:196`);
  `createGameView()` always starts from `newGame()` (`src/browser/view/game-view.ts:47`); the page
  builds the game right after `GET /api/account` (`src/browser/view/app.ts:87`); `mutationGuards`
  fixes the body limit at 16 KiB for every route it guards (`src/server/transport.ts:82`); the
  router's transport check covers every path of its `paths` table (`src/server/account-routes.ts`).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:81-112` 1. Two routes on one path, with a revision number and a separate version field

### 1. Two routes on one path, with a revision number and a separate version field

- `GET /api/saved-game` — with a valid session, 200 and a JSON object with exactly the field
  `save`: `null` when the account has no saved game state, else an object with exactly `version`
  (positive integer), `revision` (positive integer) and `game` (the object as stored). Without a
  valid session, or for a blocked account, JSON 401 `unauthenticated` as `GET /api/account`.
- `PUT /api/saved-game` — body exactly `{ "version", "basedOn", "game" }`: `version` a positive safe
  integer, `basedOn` a safe integer from 0 (0 = "I saw no saved game state"), `game` a JSON object
  (not null, not an array). Checks in this order: the D-104 guards with a 64 KiB limit (decision 3);
  the exact fields and their types, else 400 `invalid-request`; a valid session of a non-blocked
  account, else 401 `unauthenticated`; the stored text of `game` at most 64 KiB, else 413
  `save-too-large`; then, in one write transaction that also reads the account's blocked state:
  a blocked account stores nothing and gets 401; a stored version greater than `version` gives 409
  `save-outdated`; a stored revision different from `basedOn` (no row counts as revision 0) gives
  409 `save-conflict`; otherwise the row is written with revision = stored revision + 1 (1 for the
  first save) and the answer is 200 with exactly `{ "revision" }`.
- The version check comes before the revision check, so an old tab whose basis is also stale reads
  "Gra została zaktualizowana. Odśwież stronę." instead of loading a save its code cannot read.
- The server never reads inside `game` beyond "is a JSON object"; it stores the text it serializes
  from the parsed value and returns it unchanged inside `save.game` (D-07 complies example).
- No field of either request names an account; the stored session alone selects the row (D-109).
  An extra field is refused as `invalid-request`.

Rejected: `POST` for the save (works, but a whole-resource replacement reads as `PUT`; the guards
are wired per method either way); 404 for "no saved game state" — an unmatched `/api/` path also
answers 404 (D-05), so a server without the route would read as "no save" and the first save of a
new game would overwrite a real one; an opaque random tag or an `If-Match` header for the basis —
a counter is as safe inside one transaction, readable in tests, and keeps the body the only input
(D-104 "object of expected fields"); the server reading `game.version` — the server would read the
game's document (D-07) and the version would stand in two places; the conflict answer carrying the
current save — saves one request but gives the save route a second answer shape, and logout does
not want it. Cost if wrong: the server and client contract changes together (D-117 weak point).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:143-165` 3. D-104 and account-mutation-request-guards cover the save route, with its own limit

### 3. D-104 and `account-mutation-request-guards` cover the save route, with its own limit

- `mutationGuards` takes the route's body limit as a parameter; the save route gets 64 KiB
  (65 536 bytes), every other state-changing route keeps 16 KiB. The Origin, media-type,
  compression and object checks stay the same for all six routes.
- The invariant `account-mutation-request-guards` keeps covering every state-changing route, the
  save route included, and "oversized" means over that route's limit in D-104.
- The stored limit is checked apart from the body limit on the text the server stores (decision 1):
  re-serializing parsed JSON can lengthen it (`1e21` becomes `1e+21`), so the body limit alone does
  not bound the stored text. One row per account (primary key) gives "najwyżej 64 KiB na gracza".
- Fit with `keepalive`: the server's body limit and the page's keepalive quota are the same number,
  65 536 bytes, and the browser refuses a larger keepalive body as a network error before sending
  it. So the client measures the UTF-8 byte length of the save body it is about to send: up to
  65 536 bytes it sends it with `keepalive` (within the quota while it is the only keepalive
  request in flight, which decision 6 guarantees); above that it sends nothing and returns the
  too-large outcome, the same typed outcome as the server's 413. The server's own 413 stays for a
  body that reaches it over the limit from any other client and for the stored-text check below
  it. The client's limit is a copy of the server's contract (D-117's weak point): both change
  together, and a test pins each side.

Rejected: a separate guard stack for the save route — two copies of the Origin and JSON rules that
can drift; leaving the invariant to the five account routes — the save route would change state
outside the one guarded set D-104 names.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:366-388` 10. Guideline passages the change makes untrue (settled by the orchestrator)

### 10. Guideline passages the change makes untrue (settled by the orchestrator)

Finding 4 of the spec's re-review (`reports/04-spec-rereview-report.md`) remained after the one
revision and is settled here by the orchestrator (step 7 of `implement-task`), on the smallest
reading that fulfils the task: guidelines the change makes false are corrected in the same change
(WAY-172, WAY-199), each through the skill the spec already uses for its discipline, with no new
meaning beyond what this spec's decisions and the task's settlements carry. The change also does,
beyond the guideline changes named above:

- `guidelines/coding-browser-module.md`, § „Gra na stronie i odpowiedzi serwera”, rewritten to the
  page of decisions 7 and 8: the game is built only after the session and then the saved game state
  are answered; the game is removed when a save gets 401 and when a save gets a conflict (then built
  again from the loaded save); conflict, outdated code and too-large have their own sentences
  instead of the one warning — through `the-way-maintain-coding-guidelines`.
- `guidelines/testing.md`, § Trust boundaries, permissions table: the D-109 row, the D-137 row and
  the row of an account identifier supplied in a request extended to `GET /api/saved-game` and
  `PUT /api/saved-game`, together with the D-104 rows already named (the save route's body limit of
  64 KiB); the transport row's count of paths changed from six to seven — through
  `the-way-maintain-testing-guidelines`.
- Direct refusal tests of both save routes — no session, a forged or removed session, and a session
  of a blocked account each get JSON 401 and leave the stored saved game state unchanged — marked
  with `invariant: account-session-authorization` and `invariant: blocked-account-access`, on real
  HTTP and SQLite like the existing cases of `tests/http.test.mjs`.
