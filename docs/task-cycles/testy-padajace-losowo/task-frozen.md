---
title: "loop2: testy padające losowo — co sprawdzić przy następnej porażce pięciu testów, i krótki limit Dockera w teście strażnika"
status: draft
created: 2026-11-17T16:06
updated: 2026-11-17
tags: [zadanie]
related: "the author's note of the project Loop"
---

# loop2: testy padające losowo — co sprawdzić przy następnej porażce pięciu testów, i krótki limit Dockera w teście strażnika

Status: ready for cycle
Project relation: independent
Defect introduced by: https://github.com/mariusznazar/loop2/pull/71

## Description

### Need

- Pięć testów loop2 potrafi paść losowo, raz na kilka pełnych przebiegów testów, bez związku ze zmianą; pełny przebieg trwa 15–35 minut, więc każda taka porażka kosztuje Mariusza i agenta powtórkę tego czasu.
- Jeden z nich, wariant „logs *” testu strażnika z limitem Dockera 1 s, ma pokazaną przyczynę: limit 1 s ucina pod obciążeniem także szybkie wywołania `docker inspect`, więc strażnik wysyła wiadomość „gra nie działa”, której test nie oczekuje (padł w 2 z 6 przebiegów całego pliku pod największym obciążeniem).
- Trzech innym poprzedni cykl nie umiał wywołać porażki w 90–150 osobnych uruchomieniach, a piąty (`tests/account-api.test.mjs`) nie był badany; wiedza o tym, co próbowano i na co patrzeć w przebiegu, który padnie, leży dziś tylko w raportach cyklu w historii gita, więc następna porażka zacznie diagnozę od zera.
- Komunikat porażki testu transportu nie mówi, które żądanie przekroczyło termin, więc następna porażka nie da dowodu przyczyny.

### To do

1. Wariant „logs *” testu `TheDockerCommands.test_a_docker_that_never_answers_is_cut_off_and_read_as_down` w `tests/deploy/test_loop2_watch.py` dostaje limit Dockera dłuższy niż 1 s (rzędu kilku sekund), który zostawia wywołaniom `docker inspect` czas na odpowiedź pod obciążeniem, przy zawieszonym `docker logs`, które ten limit nadal przerywa; wariant „inspect *” i skrypt strażnika `deploy/loop2-watch` zostają bez zmian.
2. Pomocnik żądań w `tests/transport.test.mjs` (funkcja, która wysyła żądanie z terminem 5000 ms i przy jego upływie niszczy je błędem `"HTTP deadline exceeded"`) przy upływie terminu nazywa w komunikacie błędu żądanie: jego metodę i ścieżkę.
3. W katalogu `tests/` repozytorium (np. `tests/flaky-tests.md`) powstaje krótki rejestr testów padających losowo, których przyczyny nie ustalono, napisany po polsku, z nazwami testów i komunikatami błędów przepisanymi dosłownie; wpis to nazwa testu, co próbowano (z liczbami uruchomień i warunkami) i na co patrzeć w padniętym przebiegu, a wpis znika, gdy przyczyna się wyjaśni. Plik dostaje wiersz na mapie części w części agent-workflow, dopisany skillem `the-way-update-part-map`.
4. Rejestr dostaje cztery wpisy, z treścią z sekcji *Context* niżej: test transportu (a), test okna strażnika (b), test sygnału kopii (c) i test `tests/account-api.test.mjs` (d). Testu z punktu 1 rejestr nie dostaje, bo jego przyczyna jest ustalona.
5. Rozdział „Flaky tests” w `guidelines/testing.md` mówi jednym zdaniem, że test padający losowo bez ustalonej przyczyny dostaje wpis w rejestrze, który znika, gdy przyczyna się wyjaśni, i wskazuje plik rejestru.

### Acceptance criteria

- Pod obciążeniem z raportu wykonawcy kroku 19 poprzedniego cyklu (6 pętli uruchamiających po kolei całe pliki `test_loop2_watch.py`, `test_loop2_backup.py`, `test_account_save_backup_failure_notice.py`, `test_loop2_watch_message.py` oraz 40 wirujących procesów node, 2 na procesor logiczny) wariant „logs *” przechodzi w 30 osobnych uruchomieniach, każde w osobnym procesie i policzone, a żadne uruchomienie nie dochodzi do limitu 45 s jednego przebiegu skryptu (`RUN_TIMEOUT` w `tests/deploy/backup_script_support.py`).

### Questions to settle

- Jak naprawić wariant „logs *” testu strażnika z limitem Dockera 1 s?
  - Answer: dłuższy limit, rzędu kilku sekund, tylko w wariancie „logs *” testu; skrypt strażnika bez zmian; wartość limitu sprawdzona pod tym samym obciążeniem co w raporcie, co wchodzi do kryteriów akceptacji.
  - Not chosen:
    - osobny limit dla `docker logs` w skrypcie strażnika — zmiana kodu, który działa na serwerze, w granicy zaufania, a druga stała istniałaby tylko dla testu, bo na serwerze oba limity i tak wynosiłyby 60 s.
  - Source: doradca dnia w imieniu Mariusza (tryb samodzielny), 2026-11-17: „1 b, 2 b, 3 e, 4 a — za Twoimi rekomendacjami. Do 1 b: wartość limitu sprawdź pod tym samym obciążeniem co w raporcie (to wchodzi do kryteriów akceptacji).”
- Czy przy okazji poprawić komunikaty testów, żeby następna porażka sama mówiła, co się stało?
  - Answer: tylko pomocnik żądań testu transportu nazywa żądanie przy upływie terminu.
  - Not chosen:
    - obie zmiany, także zapis startu każdej atrapy poza plikiem wywołań — atrapa już dziś zapisuje swój wpis jako pierwszą czynność (`tests/deploy/backup_script_support.py:69`, rewizja `0b23580b`), więc osobny zapis startu odróżniłby tylko zgubiony wpis od niewykonanego procesu, a zgubiony wpis raport poprzedniego cyklu wykluczył.
    - żadna zmiana, sama lista „co sprawdzić” — następna porażka testu transportu znowu nie powie, które żądanie zawisło.
  - Source: doradca dnia w imieniu Mariusza (tryb samodzielny), 2026-11-17: „1 b, 2 b, 3 e, 4 a — za Twoimi rekomendacjami.”
- Gdzie ma leżeć lista „co sprawdzić” po zamknięciu zadania?
  - Answer: osobny plik w repozytorium, rejestr testów padających losowo, znajdowany wyszukiwaniem nazwy testu; rejestr ma być krótki — wpis to nazwa testu, co próbowano (liczby), na co patrzeć; wpis znika, gdy przyczyna się wyjaśni; w tym zadaniu wpisy dla trzech testów bez zmian i testu account-api.
  - Not chosen:
    - rozdział „Flaky tests” w `guidelines/testing.md` jako miejsce samej listy — wytyczne to reguły, nie dziennik przypadków; plik rośnie, a zmiany idą przez skill wytycznych testowania.
    - komentarz przy każdym teście — wytyczne testowania tego zabraniają: „Komentarz, który niesie informację ważną dla kodu, przenosi ją do fundamentu… Komentarz testu nie wskazuje dokumentu spoza fundamentu” (`guidelines/testing.md`, rozdział „Where the expected value comes from”).
    - tylko historia gita — cykl zapisze tam treść zadania, ale nikt jej nie znajdzie, gdy test padnie.
    - zwykła notatka w Obsidianie w `(P) Loop` — Mariusz ją znajdzie, agent pracujący w repozytorium nie.
  - Source: doradca dnia w imieniu Mariusza (tryb samodzielny), 2026-11-17: „1 b, 2 b, 3 e, 4 a — za Twoimi rekomendacjami. […] Do 3 e: rejestr ma być krótki — wpis to nazwa testu, co próbowano (liczby), na co patrzeć; wpis znika, gdy przyczyna się wyjaśni; w tym zadaniu wpisy dla trzech testów bez zmian i testu account-api.”
- W którym katalogu leży rejestr i w jakim języku jest napisany?
  - Answer: w `tests/` (np. `tests/flaky-tests.md`), z wierszem na mapie części dopisanym w cyklu skillem `the-way-update-part-map`; `guidelines/testing.md` może go wskazać jednym zdaniem; po polsku, nazwy testów i komunikaty błędów dosłownie.
  - Not chosen:
    - w `guidelines/` (np. `guidelines/flaky-tests.md`) — folder ma już część na mapie, ale the-way bierze każdy plik w `guidelines/` za wytyczne, więc rejestr bez nagłówków „Discipline / Applies to” mógłby być zgłaszany przez kolejne cykle jako uszkodzone wytyczne, a wybór rejestru opierał się na tym, że wytyczne to reguły, nie dziennik przypadków.
    - po angielsku — pasowałby do fundamentu i `AGENTS.md`, ale rejestr czyta też Mariusz.
  - Source: doradca dnia w imieniu Mariusza (tryb samodzielny), 2026-11-17: „1 b — rejestr w `tests/` (np. `tests/flaky-tests.md`), wiersz na mapie części dopisany w cyklu skillem the-way-update-part-map; `guidelines/testing.md` może go wskazać jednym zdaniem. 2 — po polsku, nazwy testów i komunikaty błędów dosłownie.”
- Czy zadanie bada test `tests/account-api.test.mjs`, który raz padł na `2 !== 1`, czy tylko zapisuje go na następne wystąpienie?
  - Answer: tylko zapisuje, jako wpis w rejestrze.
  - Not chosen:
    - zbadać go w tym zadaniu — przy trzech pozostałych testach 90–150 uruchomień na każdy nie wywołało porażki, więc szansa jest mała, a koszt to godziny pracy komputera pod obciążeniem.
  - Source: doradca dnia w imieniu Mariusza (tryb samodzielny), 2026-11-17: „1 b, 2 b, 3 e, 4 a — za Twoimi rekomendacjami.”

## Context

- Cały dokument przyjęty: doradca dnia w imieniu Mariusza, 2026-11-17 (tryb samodzielny, upoważnienie z 14.11 do akceptacji całego dokumentu zadania).
- Strażnik to skrypt `deploy/loop2-watch`, który z crona sprawdza na serwerze kontenery gry przez `docker` i wysyła wiadomość przez `pusher`, gdy coś nie działa; test podstawia zamiast `docker` atrapy, czyli własne skrypty, a w kopii skryptu podmienia stałe między znacznikami `# >>> constants >>>`.
- W skrypcie strażnika jedna stała `readonly DOCKER_WAIT_SECONDS=60` obejmuje oba wywołania Dockera, `docker inspect` w funkcji `read_container` i `docker logs` w funkcji `read_logs` (`deploy/loop2-watch`, rewizja `0b23580b`).
- Wariant „logs *” testu z punktu 1 dziś ustawia `fixture.write_copy(DOCKER_WAIT_SECONDS="1", KILL_WAIT_SECONDS="1")` i oczekuje braku wiadomości (`result.of("pusher") == []`) oraz okna stanu zostawionego na `T0`; padł z `Lists differ: [ ['loop2_gra_nie_dziala'] ] != []`.
- Pod największym obciążeniem pojedynczy przebieg strażnika trwał do ok. 30 s, a jeden przebieg kopii ma limit 45 s, więc margines na dłuższy limit Dockera w teście jest wąski (raport wykonawcy kroku 19).
- Wariant „logs *” powstał w PR #71 (commit `048264e1`, „add the failure watcher and its cron file…”), stąd linia `Defect introduced by:`.
- Raporty poprzedniego cyklu (zadanie „luki w testach…”, PR https://github.com/mariusznazar/loop2/pull/150) leżą w historii gita: `git show 28ab60c9:docs/task-cycles/luki-w-testach-z-przegladu/reports/<plik>`, z plikami `executor-18-report.md` (transport), `executor-19-report.md` (strażnik, z sekcją o teście z limitem 1 s) i `executor-20-report.md` (kopia); każdy zaczyna się podsumowaniem, dalej sekcje „Cause” i „Every attempt”.
- Wspólna reguła dla wpisów rejestru: zachowaj cały zapis padniętego przebiegu (log bramki albo wyjście testu), bo w przypadkach b i c jedyną wskazówką był ślad w zapisie jednego padniętego przebiegu.
- Wspólne warunki prób poprzedniego cyklu: każde uruchomienie w osobnym procesie i policzone; sam; pod ok. 40 wirującymi procesami node (2 na procesor logiczny); pod 24 pętlami startującymi bez przerwy krótkie procesy (ponad 30 tysięcy startów); pod pętlami uruchamiającymi całe pliki testów; pod obciążeniem dysku, gdzie test z niego korzysta. Żadne obciążenie nie wywołało porażki.
- Wpis a, `tests/transport.test.mjs`, „transport refuses ambiguous proxy metadata before loading live sessions”: porażka `HTTP deadline exceeded` po 7678 ms przy terminie 5000 ms, w pierwszym pełnym przebiegu w PR #88; sam trwa 0,53–0,70 s. Próbowano 150 z 150 osobnych uruchomień w pięciu warunkach, 105 z 105 kopii z pomiarami, pięć przebiegów całego etapu Node; pod 80 wirującymi procesami przypadek trwał 5,8–9,4 s, a najwolniejsze pojedyncze żądanie nie przekroczyło 0,9 s. Hipoteza, nie wynik: jedno żądanie zawisło na 5 s albo dłużej. Patrz: które żądanie przekroczyło termin (metodę i ścieżkę podaje komunikat błędu pomocnika żądań).
- Wpis b, `tests/deploy/test_loop2_watch.py`, `TheWindow.test_a_clock_that_stands_still_reads_no_window`: porażka raz na niezmienionej bazie w PR #87 (zapis `git show 4955a906:docs/task-cycles/oboz-w-siedzibie/base-gate.log`, ok. linii 2509–2580). Próbowano 150 z 150 osobnych uruchomień w pięciu warunkach, 6 w przebiegach całego pliku pod najcięższym obciążeniem, 1000 startów atrapy samej i 400 pod pętlami startów, bez złego startu. Zapis porażki: atrapa `docker inspect` kontenera tunelu nie zostawiła wpisu, strażnik uznał to za „down” i wysłał wiadomość; ten ślad cykl odtworzył, skracając limit Dockera do 0,01 s. Hipoteza: Windows nie uruchomił procesu atrapy pod obciążeniem (w tym samym przebiegu bramki druga atrapa też milczała, przebieg był o ok. 45% wolniejszy od sąsiednich, a w innych logach projektu Windows nie uruchamiał procesów z kodem 0xC0000142). Patrz: czy brakuje wpisu którejś atrapy, choć strażnik ją wywołał; czy inne atrapy tego przebiegu też milczą; jak długo trwał przebieg wobec sąsiednich.
- Wpis c, `tests/invariants/test_account_save_backup_failure_notice.py`, `EveryFailedEndCallsPusher.test_a_signal_with_a_trap_is_named_by_its_exit_code_in_the_log_too [INT]`: porażka `0 != 130` raz na niezmienionej bazie w PR #87, w tym samym zapisie co b. Próbowano 90 z 90 osobnych uruchomień (30 sam, 30 pod 40 wirującymi procesami, 30 pod 6 pętlami całych plików i 4 pętlami wysyłającymi sygnały) i 320 z 320 powtórzeń przebiegu INT w jednym procesie. Zapis porażki: atrapa `docker` kopii nie zostawiła wpisu i nie wysłała sygnału, a jej etap odczytał status 0. Wykluczone dowodami: zgubiony wpis przy dwóch jednoczesnych zapisach, zgubiony sygnał INT, Ctrl+C, inny `docker` w PATH, INT ignorowany na starcie skryptu kopii. Bash z Cygwina uruchomiony w tle (`&`) ignoruje INT i daje `0 != 130`, ale nie pasuje do porażki, w której brakowało też wpisu atrapy. Patrz: to samo co w b, i jeśli się da, wyjście standardowe i błędów etapu atrapy.
- Wpis d, `tests/account-api.test.mjs`, test „reportBrowserFailure posts the three words as one JSON POST to the report path, with no keepalive, same-origin credentials and no redirect”: raz padł na `2 !== 1` (sprawdzenie liczby zarejestrowanych żądań, wtedy linia 1221) pod skrajnym, łączonym obciążeniem w uruchomieniach wykonawcy kroku 18 poprzedniego cyklu. Nie badany. Patrz: który przypadek pada i czy obciążenie jest jedyną wspólną cechą.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- **D-73 — Which testing discipline does loop2 adopt?** „Loop2 adopts the testing-guideline template of its pinned the-way in full, with only the departures of D-74, D-75, D-76, D-77, D-78, D-79, D-82, D-163, D-235 and D-273. Its testing rules and the recipes of its levels stand in `guidelines/testing.md`, read before writing or changing a test.” Zadanie dopisuje do rozdziału „Flaky tests” tych wytycznych regułę rejestru (punkt 5), nie zmieniając decyzji: decyzja z wiersza 1 *Settlements to record* wynika z D-73 jako dalsza reguła wytycznych testowania, nie jest odstępstwem od przyjętego szablonu, więc lista odstępstw D-73 zostaje bez zmian.
- **D-77 — How are tests selected and limited as a whole?** „`npm test` without arguments runs the full gate; `npm test -- <test file>` accepts exactly one test file and runs only it, building the game first for Node but not for Python, without other tests, the foundation check or the check of the instruction files. A focused run with no executed test or a file that is not a test fails, and only the full gate suffices before a request. There is no configuration file limiting the whole run; a whole-run limit is reconsidered on a concrete problem with diagnosis time or a hanging run, while new or changed tests still bound their own waiting.” Zmieniony wariant „logs *” dalej ogranicza własne czekanie.
- **D-356 — How does the operator learn that the running game failed?** Test z punktu 1 trzyma jej zdanie przez linię `decision:`: „A watcher script on the server, outside the game container, run by cron every few minutes, reads the state and the health of the game's containers, a restart of either of them, the new lines of failures in the game container's log and, in the log of the nightly backup, the lack of a successful send that D-233 gives, passes over the window of a deployment and limits how many messages it sends, and calls `pusher` with a fixed subject and text that say only which kind of trouble it found, with no player's data and no tool's output, because the message may travel unencrypted.” Zadanie nie zmienia skryptu strażnika ani tej decyzji.

## Settlements to record

Candidates: 1 shown, 1 accepted — 2026-11-17

| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Wiedza o teście padającym losowo, którego przyczyny nie ustalono, stoi w krótkim rejestrze w `tests/`, po polsku: wpis to nazwa testu, co próbowano (liczby), na co patrzeć; wpis znika, gdy przyczyna się wyjaśni. | decision | pytania „Gdzie ma leżeć lista «co sprawdzić» po zamknięciu zadania?” i „W którym katalogu leży rejestr i w jakim języku jest napisany?” w *Questions to settle*; wybór człowieka spośród pokazanych dróg | czy wiedzę o takim teście trzymać w wytycznych, w komentarzu przy teście, w historii gita czy w notatce poza repozytorium, w którym katalogu i języku, i czy wpis zostaje po wyjaśnieniu przyczyny |

## Out of scope

- Zmiana trzech testów bez ustalonej przyczyny (transport, okno strażnika, sygnał kopii) poza komunikatem pomocnika żądań z punktu 2.
- Badanie przyczyny porażki testu `tests/account-api.test.mjs`.
- Zapis startu atrapy poza plikiem wywołań w `tests/deploy/backup_script_support.py`.
- Ponawianie nieudanych przebiegów w testach i pomocnikach (rozdział „Flaky tests” wytycznych testowania: ponowne uruchomienie służy diagnozie, nigdy zielonej bramce).
