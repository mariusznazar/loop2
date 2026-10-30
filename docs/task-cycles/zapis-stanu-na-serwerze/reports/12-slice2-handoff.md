# Handoff — Slice 2 executor, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **executor of Slice 2**, a fresh
agent. Your questions go to the orchestrator, never to the human; you return at the end of your
slice and start no other.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`. Slice base = head when you start: `b36292e`. Process pin
  `.the-way` at `a8dfe8a`.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it
  names only when the step or variant that names it comes. Variant: "a slice, or the retry of a
  slice".
- Class: `same` (plan, *Model*).
- Frozen task, spec and plan: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md`, `spec.md`,
  `plan.md` — read the passages copied below; open a file for more only where your work needs it,
  and name that reach in your report.
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/12-slice2-report.md`
- The product's instructions: `AGENTS.md` (read `guidelines/coding.md` before changing product
  code and `guidelines/testing.md` before writing tests). Commit on the task branch by path, English
  messages in the form of the existing commits. Run only your slice's focused checks, each reported
  with its command and exit code; do not run the whole gate (`npm test` with no argument).

## Answers of step 4

- Trust boundary: **yes** — your slice is on it: `src/server/database.ts` is in `src/server/**`.
  The stored game text comes from the network through the save route (Slice 3); the database must
  hold its limits itself (at most 65 536 bytes stored per player), keep the write of a save in one
  transaction with its revision and version checks, and never let one account's operation reach
  another's row. Your slice gets a review of its own aimed at that.
- Irreversible operation: **yes** — your slice writes it: schema step 4 (version 3 → 4) runs on the
  test server's persistent `loop2_accounts` when the human deploys the branch (H1, H2) and again at
  the merge (D-11); once deployed, a step is never edited (D-112), and after it code from `main`
  before this task refuses the database. The cycle prepares it and never performs it: test it only
  on temporary databases, deploy nothing, touch nothing on the server (D-12). The review checks that
  the change only prepares it.

## Done before you

- Foundation entries (`fb1ef9d`, D-97 fixed in `59cd18a`): plan row 1 is D-07, row 5 D-182, row 9
  D-186, row 10 D-187, row 15 D-104, row 18 D-112, row 23 `account-save-sqlite-store`, rows 27 and
  28 the changed `account-schema-lifecycle` and `account-database-schema`, row 34 the
  `account-server` part-map sentence.
- Slice 1 (`2923c3c`, `b4c3687`, `b36292e`, reviewed `PASS b36292e`):
  `src/browser/sim/saved-game.ts` turns a game state into the document `{ version, game }` and
  loads the server's `save` object `{ version, revision, game }` back. The server side never reads
  `game` (D-07): it stores the text and compares the version and revision only.

## Your section of the plan (copied word for word from plan.md)

### Slice 2 — Schema version 4 and the saved-game operations of the account database

- **Goal:** `src/server/database.ts` appends schema step 4 as spec decision 4 gives — one strict
  table of saved game states: the account's identifier as primary key and as foreign key that
  removes the row with its account, the version of the shape (integer from 1), the revision
  (integer from 1) and the game as text, with a check that the text's bytes are at most 65 536;
  no other table or column changes, steps 1–3 untouched. It gains two operations: read an
  account's saved game state (or none), and write one in a single transaction that reads the
  account's blocked state, the stored version and the stored revision and writes nothing when any
  of them refuses — blocked, then a stored version greater than the given one (outdated), then a
  stored revision other than the basis, no row counting as revision 0 (conflict) — and otherwise
  writes the row with revision stored + 1 (1 for the first save) and returns it, the same pattern as
  the session write. Blocking and unblocking keep the row. `tests/account-storage.test.mjs` gains:
  a version-3 database written in the test with its own schema, as task 20 left it (accounts, a
  blocked account, a confirmed address, sessions, emailed links), opens as version 4 with every row
  and value kept and no saved game state; a failing step 4 leaves it at version 3 unchanged; the
  "newer unknown version" case moves from 4 to 5; the write's outcomes, a block committed through
  another connection before the write, and the byte check of the stored text; each marked with the
  invariants it checks (`account-save-sqlite-store`, `account-schema-lifecycle`,
  `account-database-schema`).
- **Change:** `src/server/database.ts` · `tests/account-storage.test.mjs`
- **Read:** `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:19-22` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:26-26` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:95-100` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:117-123` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:188-191` Context ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:203-203` Context ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:292-293` Settlements to record ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:298-298` Settlements to record ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:81-112` 1. Two routes on one path, with a revision number and a separate version field ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:143-165` 3. D-104 and account-mutation-request-guards cover the save route, with its own limit ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:167-186` 4. Schema version 4: one table of saved game states ·
  Foundation entries row 1 · Foundation entries row 5 · Foundation entries row 9 ·
  Foundation entries row 10 · Foundation entries row 15 · Foundation entries row 18 ·
  Foundation entries row 23 · Foundation entries row 27 · Foundation entries row 28 ·
  Foundation entries row 34 ·
  `foundations/decisions.md:135-153` D-07 · `foundations/decisions.md:284-302` D-15 ·
  `foundations/decisions.md:331-354` D-17 · `foundations/decisions.md:1799-1810` D-101 ·
  `foundations/decisions.md:1963-1974` D-112 · `foundations/decisions.md:1976-1989` D-114 ·
  `foundations/decisions.md:2528-2541` D-137 · `foundations/decisions.md:2543-2554` D-138 ·
  `foundations/invariants.md:688-696` account-save-durable-storage ·
  `foundations/invariants.md:698-706` account-save-sqlite-access ·
  `foundations/invariants.md:758-766` account-schema-lifecycle ·
  `foundations/invariants.md:768-776` account-database-schema ·
  `foundations/invariants.md:778-786` account-session-storage ·
  `foundations/invariants.md:858-866` blocked-account-access ·
  `foundations/invariants.md:678-686` player-express-session-sqlite-store ·
  `foundations/environment_facts.md:250-254` node-sqlite-database ·
  `foundations/environment_facts.md:316-320` sqlite-wal-concurrency ·
  `foundations/environment_facts.md:304-308` docker-volume-lifecycle ·
  `foundations/glossary.md:157-161` blocked account · `foundations/glossary.md:32-37` deployment ·
  `foundations/glossary.md:39-44` test server ·
  `guidelines/coding.md` · `guidelines/coding-database-access.md` · `guidelines/testing.md` ·
  `src/server/account-block.ts` · `src/server/session-store.ts` ·
  `tests/startup.test.mjs:488-512`
- **Model:** same — schema step 4 cannot be edited once it reaches the test server (D-112), so its
  table, constraints and move must be right the first time.
- **Risk:** trust boundary — `src/server/**` (`src/server/database.ts`) · cannot be undone — schema
  step 4, which moves `loop2_accounts` from version 3 to version 4 when the human deploys the
  branch (H1, H2) and again at the merge (D-11); the slice writes and tests it on temporary
  databases only
- **Checks:** `npm test -- tests/account-storage.test.mjs` (its case "a version-3 database opens as
  version 4 with every row and value kept and no saved game state" written first, failing) ·
  `npm test -- tests/startup.test.mjs` ·
  `npm test -- tests/invariants/test_account_server_typecheck.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Foundation entries rows 1, 5, 9, 10, 15, 18, 23, 27, 28, 34

## Current ranges of the foundation entries your *Read* names

The foundation step (`fb1ef9d`) and earlier slices moved entries; these ranges, taken from the worktree as it stands at your base, hold where they differ from the plan's. Read each entry whole.

- plan row 1 → `foundations/decisions.md:146-171` D-07 — How is the work of the game split between the server and the browser?
- plan row 5 → `foundations/decisions.md:3270-3289` D-182 — Where are player accounts and saved game states stored?
- plan row 9 → `foundations/decisions.md:3396-3438` D-186 — Which browser's save of the game state does the server accept?
- plan row 10 → `foundations/decisions.md:3440-3465` D-187 — What does the server do with a save of the game state of a lower version than the one it holds?
- plan row 15 → `foundations/decisions.md:1863-1874` D-104 — Which request origin and body may change account state?
- plan row 18 → `foundations/decisions.md:1984-1995` D-112 — How does the account database open and preserve its schema?
- plan row 23 → `foundations/invariants.md:968-976` account-save-sqlite-store
- plan row 27 → `foundations/invariants.md:758-766` account-schema-lifecycle
- plan row 28 → `foundations/invariants.md:768-776` account-database-schema
- plan row 34 → `foundations/part_map.md:60-77` account-server
- `foundations/decisions.md:146-171` D-07 — How is the work of the game split between the server and the browser?
- `foundations/decisions.md:302-320` D-15 — How is loop2 recovered when a deployment goes wrong?
- `foundations/decisions.md:349-372` D-17 — How does loop2 share the Mikrus host with other workloads?
- `foundations/decisions.md:1820-1831` D-101 — How long do independent browser sessions last?
- `foundations/decisions.md:1984-1995` D-112 — How does the account database open and preserve its schema?
- `foundations/decisions.md:1997-2010` D-114 — Which file is the exemplar for database access?
- `foundations/decisions.md:2548-2561` D-137 — How does the operator block and unblock a player account?
- `foundations/decisions.md:2563-2574` D-138 — How is a player's login kept between requests?
- `foundations/invariants.md:688-696` account-save-durable-storage
- `foundations/invariants.md:698-706` account-save-sqlite-access
- `foundations/invariants.md:758-766` account-schema-lifecycle
- `foundations/invariants.md:768-776` account-database-schema
- `foundations/invariants.md:778-786` account-session-storage
- `foundations/invariants.md:858-866` blocked-account-access
- `foundations/invariants.md:678-686` player-express-session-sqlite-store
- `foundations/environment_facts.md:250-254` node-sqlite-database
- `foundations/environment_facts.md:316-320` sqlite-wal-concurrency
- `foundations/environment_facts.md:304-308` docker-volume-lifecycle
- `foundations/glossary.md:157-161` blocked account
- `foundations/glossary.md:32-37` deployment
- `foundations/glossary.md:39-44` test server

## Other files your *Read* names (each whole unless a range is given)

- `guidelines/coding.md`
- `guidelines/coding-database-access.md`
- `guidelines/testing.md`
- `src/server/account-block.ts`
- `src/server/session-store.ts`
- `tests/startup.test.mjs:488-512`

## Passages of the task, spec and plan your *Read* names (copied word for word)

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:19-22` To do

1. Serwer kont i zapisów przechowuje pełny zapis stanu gry każdego gracza w tej samej bazie SQLite co konta (wolumen `loop2_accounts`), w wersji 4 schematu — na `main` stoi wersja 3, którą wniosło zadanie 20 (D-112: „up to the current version 3”); baza na serwerze testowym przechodzi na nią bez utraty kont, sesji, odnośników z wiadomości i ich wartości (D-112; pytanie 13). Cykl zmienia D-112 — wersja 4, tabela zapisów stanu gry z tym, co zapis niesie (numer wersji kształtu z punktu 5, ślad ostatniego zapisu z punktu 8), i przejście bazy, które zachowuje także zapisy stanu gry — oraz niezmienniki `account-database-schema` i `account-schema-lifecycle` tak, by mówiły o zachowaniu zapisów stanu gry obok kont i sesji; inaczej następne przejście bazy (zadanie 21, wersja 5) mogłoby zgubić zapisy i przejść ich testy.
2. Przeglądarka pobiera i wysyła cały zapis stanu gry jako JSON żądaniami `fetch()` na względne ścieżki `/api/` tego samego adresu co gra, przez klienta API przeglądarki (D-108, D-117; wpisy projektowane „How does the browser exchange saved game states with the server?” i `saved-state-http-exchange/1`).
3. Zapis odczytuje i zmienia tylko zalogowany gracz i tylko zapis własnego konta: konto wskazuje ważna sesja, a identyfikator konta podany w żądaniu niczego nie uprawnia; żądanie zapisu bez ważnej sesji dostaje odmowę (jej kod wybiera cykl — Questions carried to cycle), a zablokowane konto nie korzysta z żądań zapisu (wpis projektowany „Who can create and use a player account?”, `player-save-isolation/1`, `blocked-account-access`, D-109).
4. Żądanie zmieniające zapis spełnia D-104 — nagłówek `Origin` loop2 i treść JSON — a trasa zapisu przyjmuje treść do 64 KiB, gdy inne trasy zostają przy 16 KiB; serwer przechowuje najwyżej 64 KiB zapisu na gracza. Cykl zmienia odpowiednio D-104 (pytanie 9). Niezmiennik `account-mutation-request-guards` nie podaje liczby — mówi „oversized” o każdej „state-changing account route” — więc czy obejmuje trasę zapisu i jaki rozmiar jest dla niej „oversized”, ustala cykl (Questions carried to cycle).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:26-26` To do

8. Serwer przyjmuje zapis tylko z przeglądarki, która widziała ostatni zapis na serwerze; zapis z przeglądarki, która go nie widziała, bo w międzyczasie zapisała inna, odrzuca, a ta przeglądarka porzuca swój niezapisany stan, wczytuje zapis z serwera — trwające ręczne przejście zatrzymane pauzą — pokazuje w roli `warning`: „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.” i toczy grę dalej od wczytanego zapisu, zapisując jak zwykle; zdanie znika po pierwszym udanym zapisie (pytania 3 i 16).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:95-100` Questions to settle

- 9. Jak ograniczyć rozmiar żądania i zapisu stanu gry, aby publiczny serwer nie przyjął zbyt dużych danych? (Q9; pytanie otwarte planu przypisane temu zadaniu)
  - Answer: droga B: trasa zapisu przyjmuje do 64 KiB, inne trasy zostają przy 16 KiB; serwer przechowuje najwyżej 64 KiB na gracza. Przyjęty koszt: D-104 i niezmiennik `account-mutation-request-guards` zmieniają się w cyklu; 1000 kont przy pełnym limicie to około 65 MB na kopię bazy — Strych mieści około trzy takie kopie, więc przy tylu graczach zadanie 17 musiałoby wybrać mniej kopii albo inne miejsce.
  - Not chosen:
    - A — trasa zapisu bierze limit D-104, 16 KiB, a serwer przechowuje najwyżej tyle — bez zmiany D-104, ale prawdopodobnie któreś z zadań 10, 12, 13 albo 18 trafi na limit i będzie musiało zmienić D-104; zapis za duży serwer odrzuca, a gracz widzi to jak nieudany zapis (pytanie 2); 1000 kont przy pełnym limicie to około 16 MB na kopię — Strych mieści około 12 takich kopii.
    - C — 1 MiB — zapas na długo, ale Strych mieści przy pełnym limicie około 190 zapisów łącznie, np. siedem kopii po 27 kont; jedno żądanie zajmuje więcej pamięci kontenera (512 MiB, skill `loop2-deploy`).
  - Source: Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji” — rekomendacja B pytania Q9, w pakiecie jako D9 (tura 9).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:117-123` Questions to settle

- 13. W jakiej kolejności idą cykle zadań 16, 19, 20 i 21, które wszystkie zmieniają schemat bazy kont? (Q13; pytanie kanoniczne: Q5 rozmowy refinementu zadania 19 blokada-konta)
  - Answer: kolejno 19 → 20 → 16 → 21 (droga A): zadanie 20 zależy od zadania 19, zadanie 16 od zadania 20, zadanie 21 od zadania 16. Cykl zadania 19 pisze pierwsze przejście bazy z wersji 1 — nowe brzmienie D-112, niezmienników `account-schema-lifecycle` i `account-database-schema` i reguły „Otwarcie schematu bez utraty danych” w `guidelines/coding-database-access.md` — a każde następne zadanie tylko dokłada swoją wersję. Przyjęty koszt: zapis stanu gry (16) i kopia bazy (17) czekają na cykl poczty, a do scalenia tego zadania odświeżenie strony gubi programy i postęp — w fazie „Konta na serwerze testowym” konto ma tylko właściciel.
  - Not chosen:
    - B — kolejno 19 → 16 → 20 → 21, poczta na końcu (w planie zmienia się tylko wiersz 20) — zadanie 20, refinowane wtedy, czeka na refinement i cykl zadania 16, którego refinement się jeszcze nie zaczął, a cztery pytania otwarte planu na niego czekają; to, czy poczta dochodzi, wychodzi najpóźniej; do zamknięcia fazy też cztery cykle: 19, 16, potem 20 i 21 obok 17.
    - C — kolejno 19 → 20 → 21 → 16, cała poczta przed zapisem gry — do zamknięcia fazy pięć cykli jeden po drugim (19, 20, 21, 16, 17), o jeden więcej niż w A i B; zapis gry czeka na całą pocztę.
    - D — bez nowych zależności; w dzienniku planu zasada, że cykl scalany jako drugi przenumerowuje swoją wersję na następną po scalonej i próbuje na serwerze testowym dopiero po scaleniu pierwszego — bezpieczeństwo bazy na serwerze testowym zależy od tego, czy każdy cykl o tej zasadzie pamięta, a żadne sprawdzenie jej nie pilnuje; dwa cykle piszą dwie różne reguły przechodzenia bazy, a drugi musi swoją przepisać.
  - Source: Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje” — przyjęta rekomendacja A pytania Q5 rozmowy refinementu zadania 19 (drogi niewybrane w brzmieniu tego pytania; rozmowa `C:\Storage\repos\loop2\.runs\project-refinement\blokada-konta.md` usunięta po akceptacji zadania 19, a jego dokument dróg nie przechowuje — ich tekst odczytany z zapisu sesji Claude Code `C:\Users\Mariusz\.claude\projects\C--Storage-repos-loop2\2ec66018-5c88-4133-9eb6-a5921156a480.jsonl` z 2026-10-28); zapisane w dokumencie zadania 19 `_zadania/blokada_konta_loop2.md`, pytanie 5, i w planie `plan_mvp_loop2.md` (sha256 df758d21004d): wiersze 16, 20 i 21 tabeli Tasks oraz linie dziennika zmian z 2026-10-28 (linie 245–247), z których druga mówi: „zadanie 16 zapis-stanu-na-serwerze zależy od zadania 20 potwierdzenie-adresu — oba zmieniają schemat bazy kont”.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:188-191` Context

- Schemat bazy kont: na `main` wersja 3 (`src/server/database.ts:78`, liczba kroków schematu, loop2 b8ac134) — trzecią wersję, ze stanem potwierdzenia adresu i odnośnikami z wiadomości, wniosło zadanie 20.
- Blokada konta usuwa wszystkie sesje konta (D-137), więc zablokowany gracz w trakcie gry dostaje przy najbliższym zapisie tę samą odmowę co przy wygaśnięciu sesji, a przy ponownym logowaniu — „To konto jest zablokowane.” (D-139); dokument zadania 19 zapowiada: „gracz zablokowany w trakcie gry gra więc w przeglądarce dalej, aż do przeładowania strony albo wylogowania, a od zadania 16 — do najbliższego zapisu.”
- Wdrożenie loop2 odtwarza oba kontenery projektu (skill `loop2-deploy`, `.claude/skills/loop2-deploy/SKILL.md`), więc każde kolejne wdrożenie wymienia kontener aplikacji; baza leży w wolumenie `loop2_accounts`, którego agent nie czyta.
- D-17, *Verification*: “Checks of accounts and sessions alone do not establish preservation of saved game states and cannot clear account-save-durable-storage.” — niezmiennik `account-save-durable-storage` ma dziś „Violated: yes”.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:203-203` Context

- Każde scalenie do `main` wdraża się samo (D-11). Pierwsze wdrożenie gałęzi tego zadania (H1) przenosi bazę serwera testowego na wersję 4 schematu, a kod z `main` sprzed scalenia tego zadania zna tylko wersję 3, więc odmawia bazy i nie wstaje (kod 8; `.claude/skills/loop2-deploy/SKILL.md:221`–`227`, `references/troubleshooting.md:116`–`118`, loop2 b8ac134). Od H1 do scalenia tego zadania nie scala się więc do `main` nic innego. Czynności człowieka w cyklu robi się przy zablokowanym szkicu requestu, zanim człowiek go przejrzy (`.the-way/task-cycle/skill/SKILL.md:103`–`107`, `:367`–`368`), a po H2 cykl dokłada jeszcze zdjęcie znacznika (punkt 14), więc okno trwa od H1 przez przegląd i poprawki aż do scalenia; scala człowiek, więc to on pilnuje, żeby w tym czasie nie scalić innego requestu — w tym oknie mogą czekać cykle zadań 10 i 13 (plan `plan_mvp_loop2.md`, sha256 44f443454fdd: `ready for cycle`; zadanie 9 scalone 2026-10-29, `done`). Skill zna już taką zasadę dla przejścia na tunel: „From H3 until completion and merge, merge nothing else to `main`.” (`references/setup_and_secrets.md:37`).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:292-293` Settlements to record

| 3 | Serwer przyjmuje zapis tylko z przeglądarki, która widziała ostatni zapis na serwerze; zapis z przeglądarki, która go nie widziała, bo w międzyczasie zapisała inna, odrzuca, a ta przeglądarka porzuca swój niezapisany stan, wczytuje zapis z serwera — trwające ręczne przejście zatrzymane pauzą — pokazuje w roli `warning`: „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.” i toczy grę dalej od wczytanego zapisu, zapisując jak zwykle; zdanie znika po pierwszym udanym zapisie. | decision | pytanie 3 (B; Mariusz, 2026-10-29) i pytanie 16 (A; Mariusz, 2026-10-29), które daje temu wierszowi to brzmienie; to reguła, której wymaga uzasadnienie wpisu projektowanego „How does the browser exchange saved game states with the server?”: “resolving two browsers' conflicting saves still requires a separate game rule” | czy wygrywa ostatni zapis, czy serwer odrzuca zapis przeglądarki, która nie widziała ostatniego, co wtedy widzi gracz i czy po wczytaniu ta przeglądarka zapisuje dalej, a przejście biegnie |
| 4 | Serwer odrzuca zapis o wersji niższej niż wersja zapisu, który już trzyma, a stara karta pokazuje w roli `warning`: „Gra została zaktualizowana. Odśwież stronę.” i przestaje zapisywać. | decision | pytanie 4 (B; Mariusz, 2026-10-29); obok wpisu projektowanego „What happens to a saved game state of another version?”, który zostaje bez zmian, i D-07 (serwer porównuje tylko numer wersji) | czy serwer przyjmuje każdy zapis, także karty ze starszym kodem, która może nadpisać zapis nowszej wersji, i co widzi gracz w starej karcie |

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:298-298` Settlements to record

| 9 | Trasa zapisu przyjmuje treść do 64 KiB, inne trasy zostają przy 16 KiB, a serwer przechowuje najwyżej 64 KiB zapisu na gracza. | decision | pytanie 9 (B; Mariusz, 2026-10-29); zmienia D-104 (“an application/json body with at most 16 KiB” dla każdej trasy zmieniającej stan); niezmiennik `account-mutation-request-guards` nie podaje liczby („oversized”), więc czy obejmuje trasę zapisu („account route”) i jaki rozmiar jest dla niej „oversized”, ustala cykl | czy trasa zapisu bierze limit 16 KiB z D-104 (i trafi na niego z programami gracza), czy inny, i ile serwer trzyma na gracza |

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

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:167-186` 4. Schema version 4: one table of saved game states

### 4. Schema version 4: one table of saved game states

- Step 4 appended to the schema's steps adds one strict table: the account's identifier as primary
  key and foreign key that removes the row with its account, the version of the shape (integer from
  1), the revision (integer from 1) and the game as text, with a check that the text's bytes are at
  most 65 536. No other table or column changes; accounts, sessions and emailed links and all their
  values stay. Steps 1–3 are not touched.
- Two operations of database access: read the saved game state of an account (or none), and write
  it under the rules of decision 1 in one transaction that reads the account's blocked state, the
  stored version and the stored revision and writes nothing when any of them refuses — the same
  pattern as the session write (`coding-database-access.md`, "Stan konta w instrukcji zapisu").
- Blocking keeps the saved game state; unblocking finds it again.
- Tests: a version-3 database written in the test with its own schema (as task 20 left it, with
  accounts, a blocked account, a confirmed address, sessions and emailed links) opens as version 4
  with every row and value kept and no saved game state; a failing step 4 leaves it at version 3
  unchanged; the "newer unknown version" case moves from 4 to 5.

Rejected: a column of the accounts table — a 64 KiB text in the row every login reads; a saved-at
column now — task 18 decides where the moment of saving lives, and an unused column is a schema
step no one needs.
