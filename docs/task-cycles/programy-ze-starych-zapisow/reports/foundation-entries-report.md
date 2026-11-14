# Foundation entries — report

Commit: `809fbf6b` on `task/programy-ze-starych-zapisow` (one commit, files `foundations/decisions.md`, `foundations/invariants.md`, `foundations/glossary.md`, `foundations/part_map.md`). Author address `mariusznn@gmail.com`, the private address.

Marks: `row n` = written whole from a row of *Settlements to record*; `the cycle's` = no row carries it whole (the plan's consequences of the rows, and the entries the search of the foundation added), for the request to put before the human (WAY-114). No entry is `projected`.

## Entries

| Entry | Identifier | English | Polski | Mark |
|---|---|---|---|---|
| E1 | D-206 (changed) | The game still discards a saved game state of another version and starts anew, but the server keeps it as the previous save and an account with the privilege appends its programs one by one. | Gra dalej odrzuca zapis innej wersji i zaczyna od nowa, ale serwer odkłada go jako poprzedni zapis, a konto z uprawnieniem wciąga z niego programy po jednym. | row 1, row 3, row 4 |
| E2 | D-104 (changed) | The 64 KiB limit covers the previous save too, so up to two documents per player; the reset route takes the 16 KiB of the small routes. | Limit 64 KiB obejmuje też poprzedni zapis, więc do dwóch dokumentów na gracza; trasa resetu ma 16 KiB małych tras. | the cycle's |
| E3 | D-109 (changed) | The session alone authorizes reading its own previous save and starting its own game from zero, each for an account with the privilege; the two new routes answer 401 without a session. | Sama sesja uprawnia do odczytu własnego poprzedniego zapisu i do resetu własnej gry, każde dla konta z uprawnieniem; obie nowe trasy bez sesji odpowiadają 401. | the cycle's |
| E4 | D-112 (changed) | Schema version 5 adds the privilege flag and the table of previous saves; the save write, the reset and the privilege write read their conditions in their transaction, and the move is made in the transaction of the save. | Wersja schematu 5 dodaje znacznik uprawnienia i tabelę poprzednich zapisów; zapis, reset i zmiana uprawnienia czytają warunki w swojej transakcji, a odłożenie dzieje się w transakcji zapisu. | the cycle's |
| E5 | D-210 (changed; its question now covers a version that differs) | An accepted save of a higher version moves the stored saved game state to the previous save in the same transaction, the server comparing only the two numbers. | Przyjęty zapis wyższej wersji odkłada przechowywany zapis jako poprzedni w tej samej transakcji, a serwer porównuje tylko dwa numery. | the cycle's |
| E6 | D-167, D-169 (changed) | The list of programs gains the pull button for a privileged account with a previous save; a pulled program with a taken name takes „(n)”, n the smallest from 2. | Lista programów zyskuje przycisk wciągania dla konta z uprawnieniem i poprzednim zapisem; wciągnięty program o zajętej nazwie dostaje „(n)”, n najmniejsze od 2. | row 3, row 4 |
| E7 | D-354 (changed) | The service commands whose sentence is no log line are `account-block`, `account-previous-save` and `account-backup`. | Polecenia serwisowe, których zdanie nie jest linią logu, to `account-block`, `account-previous-save` i `account-backup`. | the cycle's |
| E8 | D-355 (changed) | A human's run of `account-block` or of `account-previous-save` appends its JSON lines, those only, to the log file. | Uruchomienie `account-block` albo `account-previous-save` przez człowieka dopisuje do pliku logu ich linie JSON, tylko je. | the cycle's |
| E9 | D-393 (new) | The server keeps for every account at most one previous save, written only by an accepted save of a higher version and by the reset and never read by the game's load. | Serwer trzyma na każdym koncie najwyżej jeden poprzedni zapis, zapisywany tylko przez przyjęty zapis wyższej wersji i przez reset i nigdy nieczytany przez wczytanie gry. | row 1 |
| E10 | D-394 (new) | The privilege is one flag on the account, granted and revoked by the operator's container command, read by the server at each request, answered with 403 on the two routes and carried as `previousSaveAllowed`. | Uprawnienie to jeden znacznik na koncie, nadawany i zdejmowany poleceniem operatora w kontenerze, czytany przez serwer przy każdym żądaniu, z odpowiedzią 403 na dwóch trasach i polem `previousSaveAllowed`. | row 2 |
| E11 | D-395 (new) | The pull button, shown to a privileged account with a previous save, fetches it again and appends its programs through a reader of its own that takes each program one by one through the editor's check and names the skipped ones. | Przycisk wciągania, widoczny dla konta z uprawnieniem i poprzednim zapisem, pobiera zapis jeszcze raz i dopisuje jego programy czytnikiem osobnym od wczytania, który przepuszcza każdy program po jednym przez sprawdzenie edytora i podaje nazwy pominiętych. | row 3, row 4 |
| E12 | D-396 (new) | „Zacznij od zera” behind a confirmation sends no save first, makes the server move the current save to the previous one, and builds a new game with revision 0; D-209 stays as it is. | „Zacznij od zera” za potwierdzeniem nie wysyła wcześniej zapisu, każe serwerowi przenieść bieżący zapis na miejsce poprzedniego i buduje nową grę z rewizją 0; D-209 bez zmiany. | row 5 |
| E13 | `save-version` (changed) | The game loads nothing from a saved game state of another version, except the programs a privileged account pulls one by one through the editor's check. | Gra nie wczytuje niczego z zapisu innej wersji, poza programami, które konto z uprawnieniem wciąga po jednym przez sprawdzenie edytora. | the cycle's |
| E14 | `account-client-outcomes` (changed) | The account the client returns holds also the boolean `previousSaveAllowed`. | Konto zwracane przez klienta ma też wartość logiczną `previousSaveAllowed`. | the cycle's |
| E15 | `account-session-authorization` (changed) | `GET /api/previous-saved-game` and `POST /api/saved-game-reset` answer JSON 401 without a session. | `GET /api/previous-saved-game` i `POST /api/saved-game-reset` bez sesji odpowiadają JSON 401. | the cycle's |
| E16 | `account-mutation-request-guards` (changed) | The reset route is a state-changing route under the guards of D-104. | Trasa resetu zmienia stan i podlega ochronom z D-104. | the cycle's |
| E17 | `player-save-isolation` (changed) | The previous save belongs to the account like the current one. | Poprzedni zapis należy do konta jak bieżący. | the cycle's |
| E18 | `account-schema-lifecycle`, `account-database-schema` (changed) | The rows kept across a schema move include the previous saves and the privilege of each account. | Wiersze zachowane przy przejściu schematu obejmują poprzednie zapisy i uprawnienie każdego konta. | the cycle's |
| E19 | `previous-save-slot` (new, test, account-server) | A stored saved game state moves to the previous save only at an accepted save of a higher version and at the reset; the reset and the previous-save route refuse an account without the privilege. | Przechowywany zapis przechodzi na miejsce poprzedniego tylko przy przyjętym zapisie wyższej wersji i przy resecie; reset i trasa poprzedniego zapisu odmawiają kontu bez uprawnienia. | the cycle's |
| E20 | `previous-save-programs-reader` (new, test, simulation) | The reader reads only version, list of programs and items, accepts programs only through the editor's check, skips an item that is not exactly `id`, `name`, `program`, and throws for no value. | Czytnik czyta tylko wersję, listę programów i elementy, przyjmuje programy tylko przez sprawdzenie edytora, pomija element, który nie ma dokładnie kluczy `id`, `name`, `program`, i nie rzuca wyjątku dla żadnej wartości. | the cycle's |
| E21 | glossary **previous save** | The one saved game state the server keeps beside the current one: the one a save of a higher version or a reset replaced. | Jedyny zapis, który serwer trzyma obok bieżącego: ten, który zastąpił zapis wyższej wersji albo reset. | the cycle's |
| E22 | glossary **previous-save privilege** | The flag the operator sets on an account that allows pulling programs of the previous save and starting the game from zero. | Znacznik, który operator nadaje kontu i który pozwala wciągać programy z poprzedniego zapisu i zaczynać grę od zera. | the cycle's |
| E23 | part map: `account-server`, `simulation` | The description of `account-server` names the privilege command (and the previous save beside the saved game state), and the trust boundary of `simulation` gains `src/browser/sim/previous-programs.ts`. | Opis `account-server` wymienia polecenie uprawnienia (i poprzedni zapis obok zapisu gry), a granica zaufania `simulation` zyskuje `src/browser/sim/previous-programs.ts`. | the cycle's |
| E24 | D-44 (changed) | „Zacznij od zera” joins the destructive buttons, neutral until the pointer or focus reaches it and then in `danger`, disabled while its reset waits. | „Zacznij od zera” dołącza do przycisków niszczących: neutralny, dopóki nie dotrze do niego wskaźnik lub fokus, wtedy w `danger`, wyłączony, gdy reset czeka. | the cycle's (orchestrator's plan row) |

Additional entries the search of the foundation made (not in the plan): **D-252** and **D-253** (changed) — the sentence naming the commands whose answer is no log line, and the list of processes that touch accounts' data and each have a last-resort handler, both named `account-block` and `account-backup` by one; each now names `account-previous-save` too. Mark: the cycle's. Meaning: the new command follows the same rules as the block command (D-253: "each process that touches the data of accounts … has one last-resort handler of its own"). Polski: nowe polecenie podlega tym samym zasadom co polecenie blokady.

## Wording changes shown against `{fork-point}` (changed invariants), and the tests that cite them

- `save-version`: old "…current version of the saved game state's shape." — new adds "except the programs that an account with the previous-save privilege pulls from its previous save one by one, each accepted only through the check of the program editor." Citing tests: `tests/sim/saved-game.test.mjs` (the load) — still true, the load loads nothing from another version; the exception is carried by the new reader's tests of slice 6 (marker of E13/E20).
- `account-client-outcomes`: old "`id` and `email` and a boolean `emailConfirmed`" — new "…and the booleans `emailConfirmed` and `previousSaveAllowed`". Citing tests `tests/account-api.test.mjs` (17 citing lines): their fixtures of account bodies lack the new field, so under the new wording a body without it is a failure; slice 5 changes the fixtures as its Goal says.
- `account-session-authorization`: adds the two routes to the list; citing tests `tests/http.test.mjs` (six) check the old routes and stay true; slice 2 adds the cases of the new routes.
- `account-mutation-request-guards`: names the reset route; citing tests `tests/http.test.mjs`, `tests/transport.test.mjs` stay true; slice 2 adds the reset route.
- `player-save-isolation`: "the saved game states, the previous save included"; citing test `tests/http.test.mjs:3830` stays true; slices 1 and 2 add the previous save.
- `account-schema-lifecycle`, `account-database-schema`: "with the privilege of each, … and previous saves" kept across a move; citing tests of `tests/account-storage.test.mjs`, `tests/deploy/test_account_storage.py`, `tests/startup.test.mjs` check the move of an older database and read schema version 4 as current in places (the plan's slice 1 lists them); the new cases of slice 1 carry the rows.

## Search of the foundation (WAY-33) and what it found

Searched `foundations/*.md` for: `account-block`, `account-backup`, last-resort, "operator command", `D-206`, `D-210`, "current version", schema version, `emailConfirmed`, `api/saved-game`, `api/logout`, saved game state held per account, "previous", "privilege", "pull", and the-way's glossary for "previous", "privilege", "pull", "save", "reset", "move".

Found and done:
- D-252 and D-253 name the commands one by one: changed (above).
- D-112's first sentence names the operator's commands: the privilege command added.
- The part map's `account-server` sentence says it owns "each player's saved game state": "and previous save" added.
- No entry of the-way's glossary holds "previous", "privilege" or "pull" (the word "pull" in the product's foundation otherwise stands in "pull request" and "the server pulls the code"); the two new terms do not collide.

Found and left (no change), for the orchestrator:
- D-07 says "the server holds … each player's saved game state". The previous save is a second saved game state of the player; the sentence stays true and the task and the orchestrator keep D-07 unchanged.
- Two rationales (the chronicle decision near `foundations/decisions.md:124` and its *Rejected* near line 8425) say that a raising of the version loses the saved game state "with the programs in it (D-206)". True for an account without the privilege, imprecise for one with it. Recommended: leave; a change there is a rewording of decisions unrelated to this task.
- D-97 (logout) and D-211 do not mention that „Wyloguj” is not pressable while a reset waits; I put that rule in D-396 (spec decision 6, step 2) and left D-97 alone.

## Questions / concerns

1. `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` ends with exit 1: `foundations/part_map.md:61: the pattern src/browser/sim/previous-programs.ts in the Trust boundary of simulation matches no file git tracks` — the file is made by slice 6. Cause: E23 as the plan words it. The error clears when slice 6 adds the file. Recommendation: keep the entry here (as the plan has it) and treat that one error as expected until slice 6, or move that one line of the trust boundary to slice 6's commit. Orchestrator to choose.
2. E19 is one invariant of three clauses (the two moves, the refusal of the reset, the 403 of the route), as the plan words it. If the review wants one sentence per rule, it splits into three identifiers; the tests of slices 1 and 2 carry one marker, `previous-save-slot`.
3. Not the human's decision, but visible in the request: D-104's rationale now says the previous save doubles the figures at the full limit, with no new number (the old "about three copies" figure was a measurement I cannot redo).
4. D-396 *Rationale* records the prices of keeping D-209 (the four of spec decision 2) as "Accepted with it", as the entry's form carries costs there.

## Answers of the orchestrator after the report

- Q1: the trust-boundary line of `src/browser/sim/previous-programs.ts` stays in E23; the one `foundation_check.py` error (`foundations/part_map.md:61`) is expected until slice 6 creates the file.
- Q2: E19 stays one invariant, `previous-save-slot`, with three clauses, as the plan words it.
- No foundation file was changed after the commit `809fbf6b`; there is no further commit.

## Own-work check

Re-read the whole diff of `809fbf6b` against the handoff's rows and the spec; removed process wording ("the task asks…", "the source's default") from *Rationale* and *Rejected* fields; checked that each decision's *Verification* names the invariants that derive from it and the reverse; ran `foundation_check.py --skip-test-citations` once (exit 1, the single expected error above). The gate was not run.

## Reach beyond the handoff

D-252 and D-253 (changed: the new command named beside `account-block` and `account-backup`), D-112's first sentence (the privilege command added), D-396 (the rule that „Wyloguj” is not pressable while a reset waits, from spec decision 6 step 2), the `account-server` sentence of the part map ("and previous save"). Left unchanged and named above: D-07, two chronicle rationales, D-97.

## Unread material

none

## Searches not found or unclear

none (no entry of the-way's glossary holds "previous", "privilege" or "pull")
