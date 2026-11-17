---
title: "loop2: luki w testach, testy padające losowo i znaczniki niezmienników z przeglądu fundamentu"
status: draft
created: 2026-11-13
updated: 2026-11-13
tags: [zadanie]
related: "the author's project note for Loop"
---

# loop2: luki w testach, testy padające losowo i znaczniki niezmienników z przeglądu fundamentu

Status: ready for cycle
Project relation: independent

## Description

### Need

- Kilka zachowań, które gracz by odczuł, nie ma testu, który padnie przy ich zepsuciu — np. połowa „paused” warunku wilka, ponowne rysowanie wiersza kroniki, numer postaci w spreparowanym zapisie.
- Cztery testy padają raz na jakiś czas bez związku ze zmianą; każda taka porażka to powtórzony przebieg bramki (17–36 min), a porażka uznana za „chwiejną” może przykryć prawdziwy błąd skryptu kopii albo strażnika.
- Fundament zawyża to, co sprawdzono: klauzule niezmienników nie mają testu, który się na nie powołuje, reguły z metodą „przegląd” mają testy bez znaczników, a dwa niezmienniki mówią to samo zdanie D-112.
- Jeden test sprawdza wywołanie wbrew wytycznym testowania, a wytyczne nie znają tego wyjątku, więc agent czytający jedno albo drugie dostaje sprzeczny obraz.
- Źródło: grupa G-6 przeglądu fundamentu z 13.11.2026 z F-13, F-14, F-30 i sprawdzeniami lokalnymi dotyczącymi testów.

### To do

1. Test, który pada, gdy wiersz kroniki już narysowany rysuje się ponownie, gdy nad nim przybywa wpis (D-382), czyli po usunięciu `memo` z wiersza w `src/browser/view/right-area.tsx` (loop2#66-7), napisany bez zmiany kodu produktu; jeśli się nie da, PR opisuje, co sprawdzono, i luka zostaje.
2. Przypadek pauzy i wznowienia w trakcie 300 ms wbiegania wilka, który pada po usunięciu połowy `paused` z warunku w `src/browser/view/scene.tsx` (loop2#86-2).
3. Przypadek wczytania zapisu, który pada po zamianie `id >= nextCharacterId` na `id > nextCharacterId` w `src/browser/sim/saved-game.ts`: dokument poprawny poza postacią o numerze równym `nextCharacterId` dostaje odmowę (loop2#72-20).
4. Test strażników żądania w `tests/transport.test.mjs` pada, gdy aplikacja ma trasę zmieniającą stan spoza jego listy (raport stanu, próba 3, #6).
5. Test kompletności wzmianek paczek grafik (loop2#77-10): test przypisuje każdy plik PNG z `assets/sprites/` do paczki, z której pochodzi, nowy plik bez przypisania wywraca test, a każda paczka, której licencja wymaga wzmianki, ma linię w zasługach gry; metoda niezmiennika `sprite-credits` zmienia się na `test`.
6. Wyjątek dla testu strażnika `destroy` (loop2#72-4): `guidelines/testing.md` (przepis integration test, *Doubles*) dopuszcza sprawdzenie wywołania w przypadku „a failed renewal after an answer that has ended writes one line of the session and calls no destroy on the response” w `tests/http.test.mjs`, bo urwania odpowiedzi nie widać na Windowsie, na którym biegnie bramka; wyjątek wchodzi do listy odstępstw D-73.
7. Ustalona przyczyna każdego z sześciu testów padających losowo i naprawa testu albo skryptu, w którym leży przyczyna:
   - `tests/account-mail.test.mjs`, „a server that stops answering yields failed within the shortened deadline and loses the connection” — 1 na 3 pełne przebiegi w PR #79 (loop2#79-7);
   - `test_loop2_watch` `TheWindow.test_a_clock_that_stands_still_reads_no_window` — raz na niezmienionej bazie w PR #87 (loop2#87-2);
   - `test_account_save_backup_failure_notice` `EveryFailedEndCallsPusher.test_a_signal_with_a_trap_is_named_by_its_exit_code_in_the_log_too [INT]` — raz na niezmienionej bazie w PR #87, „0 != 130” (loop2#87-2);
   - `tests/invariants/test_loop2_one_serving_process_container.py` `test_running_container_has_one_listening_node_process` — kod 137 przy limicie 512 MiB w PR #78 (loop2#78-10);
   - `tests/transport.test.mjs`, „transport refuses ambiguous proxy metadata before loading live sessions” — `HTTP deadline exceeded` po 7678 ms wobec 5000 ms terminu pomocnika żądań (`tests/transport.test.mjs:135`) w pierwszym pełnym przebiegu na `76389bff` w PR #88, sam w pięciu przebiegach 0,53–0,70 s; prawdopodobna przyczyna to stały termin 5 s pod obciążeniem pełnego przebiegu (loop2#88, „Findings outside the task's scope” 2; dopisane przez doradcę dnia 2026-11-14 za zgodą Mariusza);
   - `test_built_image_serves_every_icon_and_the_page` — Docker nie zaczął budowy obrazu, bo jego plik ustawień był zajęty przez inny proces; w tym samym czasie biegł drugi pełny przebieg testów; sam przechodzi (3,6 s); na Linuksie w CI zielony (loop2#136, „Fix or let through” 1; dopisane przez doradcę dnia 2026-11-16).
8. Znaczniki `// invariant: <id>` (F-13) na testach, które już sprawdzają klauzulę bez powołania: napaść przerywająca akcję w `tests/sim/encounters.test.mjs` (`action-in-progress`), tura walki w `tests/sim/combat.test.mjs` ze znacznikiem w poprawnej postaci zamiast `// Invariant program-rule-pick:` (`program-rule-pick`), minuty walki w `tests/sim/encounters.test.mjs` (`minute-span-split`), liczniki zerowane przy przełączeniu w `tests/sim/copy-actions.test.mjs` (`copy-save`), raport nieczytelny w `test_audits_only_a_lockfile_changed_from_the_fork_point` (`dependency-audit-refusal`), zatrzymanie nadrabiania w `tests/sim/catch-up.test.mjs` (`catch-up-minutes`, klauzula „until it stops”).
9. Nowy przypadek startu serwera kont w pełni skonfigurowanego, bez zmiennych nasłuchu, z powołaniem na `account-server-default-address` (klauzula „fully configured valid startup”; F-13).
10. Testy sięgające tak daleko jak zdanie niezmiennika (sekcja 2 przeglądu, „test sięga węziej niż zdanie”): `program-world-reference` z warunkami `temperatureBelow` i `itemBelow`; `catch-up-state` i `simulation-randomness` z napaścią wilka; `program-closed-lists` i `character-team` także przez wczytanie zapisu i pętlę.
11. F-14 — metoda `test` i znaczniki w testach, które je sprawdzają, dla `player-express-session-sqlite-store`, `player-self-registration`, `player-password-login`, `email-verification-nonblocking`, `account-save-durable-storage` (znacznik z `tests/deploy/test_account_storage.py`, przypadek `test_replaced_container_keeps_accounts_and_sessions`, przepięty z `account-schema-lifecycle`) i `loop2-shared-public-origin` (powołanie w testach `account-client-requests`).
12. F-30 — `account-schema-lifecycle` wycofany do *Withdrawn identifiers*; `account-database-schema` mówi też „before readiness” i o linkach z maili; znaczniki w `tests/account-storage.test.mjs` przepięte na `account-database-schema`; *Verification* D-112 bez `account-schema-lifecycle`.
13. Sześć testów skryptów serwera wymagających basha z Gita (`loop2-deploy-trigger-input`, `loop2-deploy-keeps-running`, `loop2-deploy-log-dump`, `account-save-backup-encrypted`, `account-save-backup-failure-notice`, `failure-watcher-message`) uruchomione z bashem; wynik w zapisie cyklu, porażka naprawiona.
14. Fakt środowiska o tym, jak `express-session` w wersji z `package-lock.json` tworzy identyfikator sesji, z cytatem źródła, w *Rests on* niezmiennika `player-opaque-session-cookie`.
15. Stały przypadek testu `cross-part-imports`, w którym sprawdzarka dostaje import spoza dozwolonych zależności części i zgłasza go.
16. Reguły lintera JavaScript (D-29) obejmują skrypt hooka startu sesji w `.claude/hooks/` i starsze skrypty skilla grania — dziś nie sprawdza ich żadna reguła, a hook biegnie u każdego przy starcie sesji (loop2#136, „Fix or let through” 2, Minor 2; dopisane przez doradcę dnia 2026-11-16).
17. Wiersz `guidelines/testing.md` o teście workflow wdrożenia (`tests/deploy/test_deploy_workflow.py`), który wylicza postacie nieczytane przez jego przypadki, wymienia też klucz z odstępem przed dwukropkiem i wartość z `$` zapisanym jako ucieczka (`\u0024`) — bez tego recenzent ufa testowi przy tych dwóch postaciach (loop2#149, Minor c-1; dopisane przez doradcę dnia 2026-11-17).

### Acceptance criteria

- Test z punktu 7, którego porażki cykl nie odtworzy w co najmniej 30 osobnych uruchomieniach i 3 pełnych przebiegach bramki pod obciążeniem, zostaje bez zmian, PR opisuje, co próbowano, a na liście zadań zostaje linia na jego następne wystąpienie.

### Questions to settle

- 1. Pomiary z wynikiem prowadzącym do decyzji (F-6 i D-268, D-03, rozmiar kroniki, D-208, D-247, D-75) — w tym zadaniu czy osobno?
  - Answer: osobno — pomiary idą do zadania loop2: pomiary pod decyzje z przeglądu fundamentu — pamięć testów (D-268), waga strony, rozmiar kroniki i zapisu, czas nadrabiania, warunek powrotu D-75, a to zostaje przy testach i znacznikach.
  - Not chosen:
    - pomiary w tym doprecyzowaniu — zadanie stoi do końca pomiarów, jeden PR miesza testy ze zmianami decyzji i dalej rośnie
    - pomiary w cyklu — cykl staje w połowie, bo agent cyklu nie zmienia decyzji sam, a decyzja o D-268 i tak wraca do człowieka, później i z gotowymi zmianami testów czekającymi na nią
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „b. Osobne zadanie na pomiary załóż w (P) Loop ze statusem [>] i datą 📅 2026-11-13”.
- 2. Test sprawdzający wywołanie `destroy` wbrew wytycznym testowania (loop2#72-4) — wyjątek w wytycznych, przepisanie testu czy nic?
  - Answer: wyjątek w wytycznych testowania (To do 6).
  - Not chosen:
    - przepisać test na skutek — urwanie widać tylko na Linuksie, a bramka biegnie na Windowsie, więc tam test by się pomijał i ochrona zniknęłaby tam, gdzie biegnie bramka
    - nic nie zmieniać — rozjazd wytycznych i testu zostaje
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „2 a”.
- 3. Wzmianki paczek grafik (`sprite-credits`, loop2#77-10) — test kompletności czy przegląd?
  - Answer: test kompletności (To do 5).
  - Not chosen:
    - zostawić przegląd — nową paczkę bez wzmianki złapie tylko recenzent, a błąd łamie cudzą licencję
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „3 a”.
- 4. Przeładowanie po linku z maila (loop2#72-6) — test w prawdziwej przeglądarce czy zostawić?
  - Answer: zostawić; obejmuje to D-75.
  - Not chosen:
    - test w prawdziwej przeglądarce — pierwszy w bramce, wymaga nowego poziomu testów w wytycznych i środowiska przeglądarki, dużo jak na jedną linię
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „4 a”.
- 5. Ponowne rysowanie wiersza kroniki (loop2#66-7) — czy test może wymagać zmiany kodu produktu?
  - Answer: nie; cykl szuka testu bez zmiany kodu produktu, a jeśli się nie da, opisuje to w PR i luka zostaje (To do 1).
  - Not chosen:
    - mały punkt zaczepienia w kodzie produktu tylko dla testu — kod produktu niesie coś, czego gra nie potrzebuje
    - zostawić teraz — luka zostaje bez próby
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „5 a”.
- 6. `trip-transfer` — limity wejścia i wyjścia testowane na danych podstawionych, bo żadna mapa ich nie ustawia — zostawić?
  - Answer: zostawić; prawdziwą mapę z limitami sprawdzi zadanie, które ją doda.
  - Not chosen:
    - mapa testowa z limitami — robota bez dodatkowej ochrony
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „6 a”.
- 7. Test padający losowo, którego przyczyny cykl nie odtworzy — kiedy cykl kończy szukanie i co zostawia?
  - Answer: po co najmniej 30 osobnych uruchomieniach i 3 pełnych przebiegach bramki pod obciążeniem; test zostaje bez zmian, PR opisuje próby, na liście zadań zostaje linia na następne wystąpienie (Acceptance criteria).
  - Not chosen:
    - bez progu, do skutku — cykl bez końca na teście, który pada raz na kilka przebiegów
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „7 a (30 i 3 zostają)”.
- 8. Czekać na scalenie PR #89 (testy same włączają Dockera), który zmienia te same pliki testów kontenera?
  - Answer: czekać; linia zadania ma zależność od zadania linii 63.
  - Not chosen:
    - bez czekania — konflikty w `tests/deploy/test_account_storage.py` i pliku testu kontenera, a do diagnozy testu kontenera trzeba ręcznie włączać Dockera
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „8 a”.
- 9. Losowość identyfikatora sesji — wynik jako fakt środowiska czy test?
  - Answer: fakt środowiska z cytatem źródła, podpięty pod niezmiennik (To do 14).
  - Not chosen:
    - test losowości — statystyczny test w bramce dowodzi mało i może padać losowo
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „9 a”.
- 10. Kontrola testu `cross-part-imports` — stały przypadek czy jednorazowe sprawdzenie?
  - Answer: stały przypadek (To do 15).
  - Not chosen:
    - jednorazowe sprawdzenie zapisane w cyklu — po zmianie sprawdzarki nikt nie wie, czy dalej działa
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „10 a”.

## Context

- Dane przeglądu: the note of the foundation review of 2026-11-13 in the author's notes, sekcje „G-6”, „F-13”, „F-14”, „F-30”, „2. Słabe punkty” (wiersze „test sięga węziej niż zdanie”, testy bez basha z Gita, `player-opaque-session-cookie`, mapa części) i „Sprawdzenia do zamówienia” (wiersze 17, 18, 20).
- Numery linii w danych przeglądu są z commita `1b0c8ad4`; po nim PR #88 zmienił m.in. `tests/sim/catch-up.test.mjs` i `tests/sim/saved-game.test.mjs`, więc miejsca szuka się po nazwie przypadku.
- Nazwy dwóch testów z loop2#87-2 pochodzą z dziennika bramki w zapisie cyklu: `git show 4955a906:docs/task-cycles/oboz-w-siedzibie/base-gate.log`, ok. linii 2509–2580.
- Pliki w `assets/sprites/` leżą płasko, bez katalogów paczek; dziś test `tests/view/icons.test.mjs` przypina dwie linie paczek (`PACK_LINES`: kurz i wilk).
- Pokrewne zadanie linii 61 („pierwsze porządki dziennika decyzji”) robi przejście „testy wskazują zdania” dla decyzji, nie dla niezmienników.
- Opisy testów bez znaczników z sekcji 4 przeglądu („Opisy i znaczniki testów”) niesie the author's note of corrections to the foundation's wording.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- D-73 — „Loop2 adopts the testing-guideline template of its pinned the-way in full, with only the departures of D-74, D-75, D-76, D-77, D-78, D-79, D-82, D-163, D-235 and D-273. Its testing rules and the recipes of its levels stand in `guidelines/testing.md`, read before writing or changing a test.” — zadanie dodaje odstępstwo: test strażnika `destroy` sprawdza wywołanie (pytanie 2, wiersz 1 *Settlements to record*).
- D-382 — „A draw in which neither the chronicle, nor the filter, nor the window, nor the last encounter changed draws no row again, and a row already drawn is not drawn again when an entry is added above it.” — To do 1 dodaje test tej klauzuli.
- D-112 — „**Verification:** invariants: account-schema-lifecycle · account-database-schema · account-session-storage · password-reset-link · password-reset-ends-sessions.” — zadanie zdejmuje z tej listy `account-schema-lifecycle` (To do 12).
- D-75 — „Permanent tests of complete player journeys in a real browser are deferred, and a changed journey is checked manually. Automation is reconsidered when a critical-journey defect escapes smaller tests or repeated manual checking becomes a significant task cost; that task settles the tool and scope.” — trzyma przeładowanie po linku z maila poza testami (pytanie 4).
- D-271 — „A sprite file holds pixels alone, the game credits each pack whose licence asks for a credit, …” — To do 5 sprawdza tę klauzulę testem.

## Settlements to record

Candidates: 3 shown, 3 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Test strażnika `destroy` po skończonej odpowiedzi sprawdza wywołanie, nie skutek, bo urwania odpowiedzi nie widać na Windowsie, na którym biegnie bramka; to odstępstwo od szablonu testowania stoi w D-73 i w wytycznych. | decision | pytanie 2 (wybór człowieka) | czy wyjątek zapisać tylko w wytycznych, czy jako odstępstwo D-73, i jak szeroko go sformułować |
| 2 | Każdy plik PNG pod `assets/sprites/` ma w teście przypisaną paczkę, a nowy plik bez przypisania wywraca test; `sprite-credits` jest sprawdzany testem. | invariant | pytanie 3 (wybór człowieka) | czy test kompletności ma łapać nowy plik, czy tylko nową paczkę, i czy metoda niezmiennika zostaje „review” |
| 3 | To, jak `express-session` tworzy identyfikator sesji, stoi jako fakt środowiska z cytatem źródła, na którym opiera się `player-opaque-session-cookie`. | environment fact | pytanie 9 (wybór człowieka) | czy wynik odczytu zapisać jako fakt, test losowości, czy tylko w zapisie cyklu |

## Out of scope

- Nowe tanie testy wpisów z metodą „przegląd” bez testu (`preview-server-access`, `account-save-sqlite-access`, `sprite-file-content`, `font-file-provenance`) — F-14, wariant odrzucony na teraz.
- Pomiary pod decyzje z przeglądu — niesie loop2: pomiary pod decyzje z przeglądu fundamentu — pamięć testów (D-268), waga strony, rozmiar kroniki i zapisu, czas nadrabiania, warunek powrotu D-75.
- Test przeładowania po linku z maila w prawdziwej przeglądarce (loop2#72-6) — pytanie 4.
- Mapa testowa z limitami wejścia i wyjścia dla `trip-transfer` — pytanie 6.
