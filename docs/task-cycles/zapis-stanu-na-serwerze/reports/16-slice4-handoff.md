# Handoff — Slice 4 executor, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **executor of Slice 4**, a fresh
agent. Your questions go to the orchestrator, never to the human; you return at the end of your
slice and start no other.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`. Slice base = head when you start: `fc6540c`. Process pin
  `.the-way` at `a8dfe8a`.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it
  names only when the step or variant that names it comes. Variant: "a slice, or the retry of a
  slice".
- Class: `cheaper` (plan, *Model*).
- Frozen task, spec and plan: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md`, `spec.md`,
  `plan.md` — read the passages copied below; open a file for more only where your work needs it,
  and name that reach in your report.
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/16-slice4-report.md`
- The product's instructions: `AGENTS.md` (read `guidelines/coding.md` before changing product
  code and `guidelines/testing.md` before writing tests). Commit on the task branch by path, English
  messages in the form of the existing commits. Run only your slice's focused checks, each reported
  with its command and exit code; do not run the whole gate (`npm test` with no argument).

## Answers of step 4

- Trust boundary: **yes** for the cycle (`src/server/**`, `src/browser/sim/saved-game.ts`); your
  slice's files (`src/browser/account-api.ts`, its test) are not on a trust boundary the part map
  names, but your client hands the server's answers on: it reports a success only for a
  well-formed body of its own success status and every other answer as a typed failure (D-117),
  and never reads inside `game` beyond what the spec gives.
- Irreversible operation: **yes** for the cycle (schema step 4, Slice 2), not in your slice.

## Done before you

- Foundation entries (`fb1ef9d`, D-97 fixed in `59cd18a`): plan row 4 is D-181, row 9 D-186, row
  10 D-187, row 15 D-104, row 24 `saved-state-http-exchange`, row 32 `fetch-keepalive-body-quota`.
- Slice 1 (`b36292e`): `src/browser/sim/saved-game.ts` loads the server's `save` object
  `{ version, revision, game }` as received.
- Slices 2 and 3 (`bbf6ad2`, `fc6540c`, both reviewed PASS): `GET` and `PUT /api/saved-game` on the
  server, with their status codes and refusal codes in `src/server/account-routes.ts` and
  `tests/http.test.mjs` — read them there; your client meets that contract, tested against your own
  local server (plan, *Choices*).

## Your section of the plan (copied word for word from plan.md)

### Slice 4 — The browser client's saved-game methods

- **Goal:** `src/browser/account-api.ts` gains two methods for the routes of spec decision 1. The
  load method reports success only for 200 with a body of exactly `save`, `null` or an object of
  exactly `version` and `revision` (positive integers) and `game` (an object), and hands `save` on
  as received. The save method sends `PUT /api/saved-game` with `{ version, basedOn, game }` and
  `keepalive` on every save request; it measures the UTF-8 byte length of the body before sending,
  and a body over 65 536 bytes is not sent and returns the too-large outcome (decision 3). Its typed
  outcomes: saved, with the new revision; conflict (409 `save-conflict`); outdated (409
  `save-outdated`); too large (413 `save-too-large` or measured); signed out (401); and every other
  answer, a failed connection and an answer not complete within the time limit as a failure — the
  client's rules of D-117 unchanged: relative paths, no redirect, same-origin credentials, no state
  of its own. `tests/account-api.test.mjs`, on its real local server, gains each outcome of both
  methods, a body of exactly 65 536 bytes sent and one byte more never received by the server, and
  the request each method sends, marked `invariant: saved-state-http-exchange` and, where they
  check those, `invariant: account-client-requests` and `invariant: account-client-outcomes`.
- **Change:** `src/browser/account-api.ts` · `tests/account-api.test.mjs`
- **Read:** `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:20-20` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:22-22` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:25-25` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:150-154` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:210-220` Questions carried to cycle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:81-112` 1. Two routes on one path, with a revision number and a separate version field ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:143-165` 3. D-104 and account-mutation-request-guards cover the save route, with its own limit ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:487-501` Left to maker ·
  Foundation entries row 4 · Foundation entries row 9 · Foundation entries row 10 ·
  Foundation entries row 15 · Foundation entries row 24 · Foundation entries row 32 ·
  `foundations/decisions.md:1842-1853` D-104 · `foundations/decisions.md:1896-1907` D-108 ·
  `foundations/decisions.md:1909-1920` D-109 · `foundations/decisions.md:2021-2034` D-117 ·
  `foundations/invariants.md:808-816` account-client-requests ·
  `foundations/invariants.md:818-826` account-client-outcomes ·
  `foundations/invariants.md:708-716` loop2-shared-public-origin ·
  `foundations/environment_facts.md:310-314` fetch-origin-header ·
  `foundations/environment_facts.md:256-260` fetch-same-origin-credentials ·
  `foundations/environment_facts.md:340-344` samesite-strict-cookie ·
  `guidelines/coding.md` · `guidelines/coding-browser-api-client.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/account-api.test.mjs` (its case "a save body over 65 536 bytes is
  never sent and comes back too large" written first, failing) ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Foundation entries rows 4, 9, 10, 15, 24, 32

## Current ranges of the foundation entries your *Read* names

The foundation step (`fb1ef9d`) and earlier slices moved entries; these ranges, taken from the worktree as it stands at your base, hold where they differ from the plan's. Read each entry whole.

- plan row 4 → `foundations/decisions.md:3237-3268` D-181 — How does the browser exchange saved game states with the server?
- plan row 9 → `foundations/decisions.md:3396-3438` D-186 — Which browser's save of the game state does the server accept?
- plan row 10 → `foundations/decisions.md:3440-3465` D-187 — What does the server do with a save of the game state of a lower version than the one it holds?
- plan row 15 → `foundations/decisions.md:1863-1874` D-104 — Which request origin and body may change account state?
- plan row 24 → `foundations/invariants.md:978-986` saved-state-http-exchange
- plan row 32 → `foundations/environment_facts.md:346-350` fetch-keepalive-body-quota
- `foundations/decisions.md:1863-1874` D-104 — Which request origin and body may change account state?
- `foundations/decisions.md:1917-1928` D-108 — What public address do the game and account server share?
- `foundations/decisions.md:1930-1941` D-109 — What identity authorizes an account request?
- `foundations/decisions.md:2042-2055` D-117 — Which file is the exemplar for a browser API client?
- `foundations/invariants.md:808-816` account-client-requests
- `foundations/invariants.md:818-826` account-client-outcomes
- `foundations/invariants.md:708-716` loop2-shared-public-origin
- `foundations/environment_facts.md:310-314` fetch-origin-header
- `foundations/environment_facts.md:256-260` fetch-same-origin-credentials
- `foundations/environment_facts.md:340-344` samesite-strict-cookie

## Other files your *Read* names (each whole unless a range is given)

- `guidelines/coding.md`
- `guidelines/coding-browser-api-client.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`

## Passages of the task, spec and plan your *Read* names (copied word for word)

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:20-20` To do

2. Przeglądarka pobiera i wysyła cały zapis stanu gry jako JSON żądaniami `fetch()` na względne ścieżki `/api/` tego samego adresu co gra, przez klienta API przeglądarki (D-108, D-117; wpisy projektowane „How does the browser exchange saved game states with the server?” i `saved-state-http-exchange/1`).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:22-22` To do

4. Żądanie zmieniające zapis spełnia D-104 — nagłówek `Origin` loop2 i treść JSON — a trasa zapisu przyjmuje treść do 64 KiB, gdy inne trasy zostają przy 16 KiB; serwer przechowuje najwyżej 64 KiB zapisu na gracza. Cykl zmienia odpowiednio D-104 (pytanie 9). Niezmiennik `account-mutation-request-guards` nie podaje liczby — mówi „oversized” o każdej „state-changing account route” — więc czy obejmuje trasę zapisu i jaki rozmiar jest dla niej „oversized”, ustala cykl (Questions carried to cycle).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:25-25` To do

7. Gra zapisuje stan na serwerze automatycznie: zaraz po każdej zmianie stanu wywołanej przez gracza (edycja programu, założenie postaci, wysłanie, „Restart”, „Zakończ”, pauza, tempo), zaraz po domknięciu i po śmierci postaci, a w trakcie biegnącego przejścia co 30 sekund realnych; przy zamykaniu albo ukrywaniu karty gra próbuje jeszcze jednego zapisu, bez gwarancji, że dojdzie (pytanie 1). Gdy zapis się udaje, nic nie widać; gdy się nie uda, w nagłówku pod tytułem i „Wyloguj” staje zdanie w roli `warning`: „Nie udało się zapisać postępu. Gra spróbuje ponownie.”, gra sama ponawia zapis, a zdanie znika po pierwszym udanym zapisie (pytanie 2). Odmowa za dużego zapisu (punkt 4) to osobny przypadek: gra nie ponawia tego samego zapisu, tylko próbuje znowu przy następnej chwili zapisu z początku tego punktu; w nagłówku, w miejscu zdania o nieudanym zapisie, stoi w roli `warning`: „Nie udało się zapisać postępu: stan gry jest za duży. Usuń niepotrzebne programy.” i znika po pierwszym udanym zapisie (pytanie 18).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:150-154` Questions to settle

- 18. Co robi gra, gdy serwer odrzuci zapis jako za duży (ponad 64 KiB, pytanie 9) — przy zapisie automatycznym, przy jego ponawianiu i przy zapisie przed wylogowaniem? (Q18)
  - Answer: droga A: odmowa za dużego zapisu to osobny przypadek: gra nie ponawia tego samego zapisu, tylko próbuje znowu przy następnej chwili zapisu z odpowiedzi 1; w nagłówku, w miejscu zdania z odpowiedzi 2, stoi w roli `warning`: „Nie udało się zapisać postępu: stan gry jest za duży. Usuń niepotrzebne programy.” i znika po pierwszym udanym zapisie; „Wyloguj” wylogowuje mimo tej odmowy, jak przy odmowie z pytania 3. Przyjęty koszt: postęp od ostatniego udanego zapisu przepada przy wylogowaniu albo zamknięciu karty; jedyne, co gracz może zmniejszyć, to programy — „Usuń” na liście programów (D-167), przy czym ostatni program zostaje; postaci, Zrozumienia ani rozwiązanych map usunąć nie może (w loop2 b8ac134 nie ma działania usuwającego postać), więc gracz, którego stan rośnie poza programami, zostaje bez zapisu do zmiany limitu w kolejnym zadaniu; jeden stan nagłówka więcej. Stanu gry po zadaniu 12 nikt nie mierzył (Context).
  - Not chosen:
    - B — odmowa liczona jak nieudany zapis z odpowiedzi 2 i 6 — ponawianie bez końca, obietnica „Gra spróbuje ponownie.”, która się nie spełni, i niedziałające „Wyloguj”; na wspólnym komputerze gracz zostaje zalogowany.
  - Source: Mariusz, 2026-10-29, „przyjmuję zgodnie z rekomendacjami” — rekomendacja A pytania Q18 rozmowy refinementu, droga i zdanie w brzmieniu poprawki z tury 17 (tura 19); zdanie przyjęte tak, jak je zaproponowano.

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

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:487-501` Left to maker

## Left to maker

- The names of functions, types and the client methods, and whether the save methods extend the
  client in `src/browser/account-api.ts` (recommended: one client, shared exchange and time limit)
  or a second file of kind `browser-api-client`.
- The exact list of what the load function refuses beyond decision 5's floor, and the split of its
  checks into private helpers.
- Where the save routes stand in `src/server/account-routes.ts` and how `mutationGuards` takes its
  limit; the SQL of step 4 and of the two database operations.
- How the game view reports "a game minute ended the map run" to the saver (from the events of
  `passRealTime` or from comparing the state).
- The waiting-screen markup on the conflict path, and the class of the one-time notice.
- Whether the kitchen-sink page shows the header save sentence; no shared control or role is added,
  so the styleguide does not require it.
- The order of the slices, if the cycle plans the change.
