---
title: "loop2: przyjąć krótszą bramkę procesu"
status: draft
created: 2026-11-13T21:40
updated: 2026-11-13
tags: [zadanie]
related: "the project's note"
---

# loop2: przyjąć krótszą bramkę procesu

Status: ready for cycle
Project relation: independent

## Description

### Need

- Pełny przebieg testów gry (bramka, `npm test`) trwa 23–24 minuty na wolnej maszynie i do 28 minut, gdy obok pracuje inny cykl (pomiar z 2026-11-12), a cykl zadania czeka na niego średnio trzy razy.
- Ok. 22 z tych minut to dwa katalogi testów Pythona, `tests/invariants` i `tests/deploy`, które skrypt bramki przypiętej wersji procesu uruchamia jeden po drugim.
- Proces ma już, po scaleniu zadania the way „krótsza bramka”, skrypt bramki uruchamiający katalogi jednocześnie i krok startu cyklu, który nie powtarza bramki na stanie sprawdzonym chwilę wcześniej przez końcową bramkę poprzedniego cyklu; gra dostaje jedno i drugie dopiero po przesunięciu przypiętej wersji procesu (podmoduł `.the-way`).
- Na bramkę czeka Mariusz, bo czeka na wynik cyklu, i agent prowadzący cykl, kolejnymi turami, za które Mariusz płaci; przy kilku cyklach naraz bramki wydłużają się nawzajem.
- Nikt nie sprawdził, czy testy gry używające Dockera wytrzymują jednoczesne uruchomienie obu ciężkich katalogów; od tego zależy, czy szybsza bramka nadaje się dla gry.

### To do

1. Przypięta wersja procesu w grze (gitlink podmodułu `.the-way`) wskazuje najnowszy commit `origin/foundations` repozytorium the way w chwili startu cyklu (14.11 wieczorem: `ec7929d`, scalenie prośby #125) — Mariusz 14.11: podpiąć najnowszą wersję, nie `715ae20` (#111), który zawiera już równoległe katalogi bramki.
2. Na drzewie zmiany biegną trzy pełne przebiegi `npm test` pod rząd, z katalogami Pythona uruchamianymi jednocześnie, na maszynie takiej, jaka jest, także obok bramek innych cykli; każdy test, który w nich padł, biegnie jeszcze raz na tym samym drzewie przy katalogach po kolei (`--jobs 1`). Prośba podaje dla każdego przebiegu czas całości i czas każdego katalogu obok pomiaru z 2026-11-12, to, co biegło wtedy na maszynie obok, i padające testy z wynikiem przebiegu po kolei.
3. Gdy test pada przy katalogach uruchamianych jednocześnie, a przechodzi na tym samym drzewie przy `--jobs 1`: `scripts/test.py` przekazuje skryptowi bramki procesu `--jobs 1`, fundament gry dostaje decyzję, która mówi, dlaczego gra uruchamia katalogi po kolei i co trzeba naprawić w izolacji testów, a prośba nazywa ten test i naprawę jako zadanie do założenia.

### Acceptance criteria

- Gdy `scripts/test.py` nie przekazuje `--jobs 1`, każdy test, który padł w którymkolwiek z trzech przebiegów, pada też na tym samym drzewie przy `--jobs 1`.

### Questions to settle

- 1. Czy testy Node mają biec jednocześnie z katalogami Pythona?
  - Answer: Nie: pełna bramka zostaje w kolejności budowanie, testy Node, katalogi Pythona, kontrola fundamentu i kończy na pierwszym etapie, który padnie; `scripts/test.py` się nie zmienia.
  - Not chosen:
    - testy Node obok katalogów Pythona — ok. minuta zysku na ok. 15, za to bardziej złożony `scripts/test.py` i jego test oraz więcej pamięci w szczycie (obok dwóch ciężkich katalogów z Dockerem biegną testy na jsdom z limitem 2 GiB na proces), czego nikt nie zmierzył
  - Source: Mariusz (przez doradcę dnia), 2026-11-13: „1 a”.
- 2. Co zadanie robi, gdy test pada tylko przy katalogach uruchamianych jednocześnie?
  - Answer: Gra wpisuje w `scripts/test.py` `--jobs 1`, fundament dostaje decyzję z przyczyną i tym, co naprawić w izolacji testów, a prośba nazywa zadanie naprawy, które zakłada Mariusz.
  - Not chosen:
    - cykl naprawia izolację w tym zadaniu — zakres nieznany, bo nie wiadomo, co padnie; zadanie może urosnąć kilkakrotnie
    - cykl staje i otwiera prośbę zablokowaną z wynikami — jedna runda więcej, za to decyzja na faktach
  - Source: Mariusz (przez doradcę dnia), 2026-11-13: „2 a”.
- 3. Na który commit procesu przesunąć przypiętą wersję?
  - Answer: Dokładnie na `715ae20`, scalenie prośby #111 repozytorium the way; późniejsze scalenia the way to osobne przesunięcie.
  - Not chosen:
    - najnowszy commit the way w chwili startu cyklu — gra dostaje zmiany procesu, których doprecyzowanie nie obejrzało
  - Source: Mariusz (przez doradcę dnia), 2026-11-13: „3 a”.
- 4. Kiedy trzy przebiegi liczą się jako przebiegi „bez losowych porażek”?
  - Answer: Gdy każdy test, który padł przy katalogach uruchamianych jednocześnie, pada też na tym samym drzewie przy `--jobs 1`; porażki środowiska, które padają tak czy tak, się nie liczą; przebiegi idą na maszynie takiej, jaka jest, a prośba mówi, co biegło obok.
  - Not chosen:
    - trzy przebiegi z kodem wyjścia 0 — porażka środowiska niezwiązana z równoległością blokuje zadanie
  - Source: Mariusz (przez doradcę dnia), 2026-11-13: „4 a”.
- 5. Czy regułę rozmiaru funkcji i pliku, której nowa wersja szablonu wytycznych kodu wymaga, pisze to zadanie, czy zadanie gry „struktura kodu”?
  - Answer: Zadanie gry the note of the code-structure task of the game, które w swojej linii zadania czeka na to zadanie; między scaleniem tego zadania a tamtego `guidelines/coding.md` nie ma reguły, której wymaga szablon przypiętej wersji.
  - Not chosen:
    - to zadanie pisze regułę — wymaga próby rozmiarów na istniejącym kodzie i decyzji o progach, dubluje gotowe zadanie i miesza dwa tematy
  - Source: Mariusz (przez doradcę dnia), 2026-11-13: „5 a (z ⛔ w linii „struktury kodu” na to zadanie — nadaj temu zadaniu 🆔)”.

## Context

- Zadanie the way, od którego to zależy: the way: krótsza bramka — katalogi testów równolegle i bez powtarzania przebiegu na stanie wyjściowym, scalone jako prośba #111 repozytorium the way, commit scalenia `715ae20` na gałęzi `foundations`.
- Pomiar bramki gry: sekcja 1 notatki the author's note of measurements before changes of the process — `tests/invariants` 11,5–12,8 min, `tests/deploy` 9,6–10,2 min, testy Node ok. 1 min; przy jednym cyklu obok 24,0–28,0 min; pamięć bramki w szczycie 3–4 GB, maszyna przy jednym cyklu obok najwyżej 20,8 z 31,8 GB.
- Szacunek zysku, ok. 15–16 minut zamiast 23–24, jest przeliczeniem, nie pomiarem; pamięci przy katalogach uruchamianych jednocześnie nikt nie mierzył.
- Skąd pomysł i ryzyko z Dockerem: the author's card D1 of the improvements of the-way; według niej Dockera używa 18 z 20 plików `tests/deploy` i 16 z 57 plików `tests/invariants`.
- Pomocnicy testów nadają kontenerom nazwy z losowym przyrostkiem (`tests/invariants/account_container_support.py:85`, `tests/deploy/test_loop2_tunnel_image.py:44`, revision `fc00c406`); czy tak samo jest z obrazami, wolumenami i sieciami, nie sprawdzono.
- Nowy skrypt bramki procesu (`.the-way/gate/run_tests.py` w `715ae20`) przyjmuje `--jobs N` (ile katalogów naraz; bez opcji wszystkie, 1 uruchamia je po kolei) i `--slowest N` (najwolniejsze testy katalogu); raport katalogu stoi w całości pod linią `== <katalog>`, w kolejności, w jakiej katalogi kończą; kod wyjścia 1 daje też proces katalogu, który kończy się zerem bez raportu zakończonego `OK`.
- `scripts/test.py` dziś uruchamia w pełnej bramce budowanie, `node --test` z wzorcami plików, `.the-way/gate/run_tests.py` i kontrolę fundamentu, po kolei, i kończy na pierwszym etapie, który padnie (`scripts/test.py:41-52`, revision `fc00c406`); jego zachowanie pilnuje `tests/quality/test_test_gate.py`.
- Przesunięcie z `55afa8e` na `715ae20` niesie osiem scaleń the way (#104–#111), nie samo zadanie „krótsza bramka”: m.in. skrypty pomiarów cyklu (`task-cycle/cycle_measures.py`, `task-cycle/gate_times.py`, `task-cycle/change_file_sizes.py`), zmienione instrukcje cyklu i szablon prośby oraz regułę rozmiaru w szablonie wytycznych kodu.
- Po przesunięciu cykl gry pomija bramkę na stanie wyjściowym, gdy ten jest commitem scalenia o drzewie plików identycznym z głową scalonej gałęzi; w grze tak było w 65 z 69 scalonych gałęzi zadań.
- Kontrola fundamentu (`.the-way/elements/common/foundation_check.py`) jest w `55afa8e` i `715ae20` tym samym plikiem i nie sprawdza, czy wytyczne mają reguły wymagane przez szablon.
- Szablon wytycznych kodu w `715ae20` wymaga reguły `### Size of a function and a file` (WAY-360); `guidelines/coding.md` gry jej nie ma, a zadanie gry the note of the code-structure task of the game pisze ją w kształcie z WAY-360 (pytanie 5).
- Na tym komputerze biegną bramki innych cykli gry.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- **D-77 — How are tests selected and limited as a whole?** „`npm test` without arguments runs the full gate; `npm test -- <test file>` accepts exactly one test file and runs only it, building the game first for Node but not for Python, without other tests or the foundation check. A focused run with no executed test or a file that is not a test fails, and only the full gate suffices before a request. There is no configuration file limiting the whole run; a whole-run limit is reconsidered on a concrete problem with diagnosis time or a hanging run, while new or changed tests still bound their own waiting.” Zadanie jej nie zmienia: `--jobs 1` z punktu 3 ogranicza liczbę katalogów naraz, nie czas przebiegu, i stoi w tym samym jednym poleceniu.
- **D-83 — Where are tests written and how do they enter the gate?** „Tests keep Node and Python, their existing directories, and the names `*.test.mjs` and `test_*.py`. Every `*.test.mjs` file under `tests/` is selected by `npm test`, and a new `test_*.py` file is counted as covered by the gate only after its execution there is verified.” Zadanie jej nie zmienia: nowy skrypt bramki znajduje katalogi tak samo jak dotychczasowy.
- **D-49 — Which port does a loop2 test give the server it starts?** „Every start of the loop2 server process by a loop2 test on the machine that runs the tests gives the server, in `LOOP2_LISTEN_PORT`, a port the system names free at that start, never a fixed port. (…)” Jednoczesne katalogi to kolejny przypadek przebiegów obok siebie, na które ta decyzja jest odpowiedzią; zadanie jej nie zmienia.
- **D-73 — Which testing discipline does loop2 adopt?** „Loop2 adopts the testing-guideline template of its pinned the-way in full, with only the departures of D-74, D-75, D-76, D-77, D-78, D-79, D-82, D-163, D-235 and D-273. (…)” Przesunięcie nie zmienia szablonu wytycznych testów; reguła wytycznych o testach niestabilnych („Ponowne uruchomienie niestabilnego testu służy diagnozie, nigdy uzyskaniu zielonej bramki”) obejmuje przebieg po kolei z punktu 2 — służy on rozpoznaniu przyczyny, nie zazielenieniu przebiegu.
- **D-28 — Which coding-guideline discipline does loop2 adopt?** „Loop2 adopts the coding-guideline templates of its pinned the-way, while deferring automatic formatting of Python and Bash and separate exemplars for building, deployment, entry points, HTML and CSS; (…)” Po przesunięciu szablon przypiętej wersji wymaga reguły rozmiaru, której `guidelines/coding.md` nie ma, aż scali się zadanie „struktura kodu” (pytanie 5); zadanie nie zmienia D-28 i nie pisze odstępstwa.

## Settlements to record

Candidates: 6 shown, 1 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Pełna bramka gry uruchamia testy Node przed katalogami Pythona, nie jednocześnie z nimi, i kończy na pierwszym etapie, który padnie. | decision | pytanie 1, odpowiedź Mariusza (przez doradcę dnia) z 2026-11-13 | czy przestawić testy Node obok katalogów Pythona w `scripts/test.py` |

## Out of scope

- Równoległość plików testów w obrębie jednego katalogu — osobny, późniejszy krok, do rozważenia dopiero po trzech zielonych przebiegach z katalogami uruchamianymi jednocześnie.
- Naprawa izolacji testów z Dockerem, gdyby padały przy katalogach uruchamianych jednocześnie — osobne zadanie (pytanie 2).
- Reguła rozmiaru funkcji i pliku w wytycznych kodu — zadanie gry „struktura kodu” (pytanie 5).
