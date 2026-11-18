---
title: Przyrząd pomiarowy balansu w repozytorium loop2 — jedno polecenie, sprawdzanie mapy nakładką i test akceptacyjny, w którym program rozwiązuje Las
status: draft
created: 2026-11-13
updated: 2026-11-13
tags: [zadanie]
related: "the project note of the Loop project"
---

# Przyrząd pomiarowy balansu w repozytorium loop2 — jedno polecenie, sprawdzanie mapy nakładką i test akceptacyjny, w którym program rozwiązuje Las

Status: ready for cycle
Project relation: independent

## Description

### Need

- Przyrząd pomiarowy, który uruchamia prawdziwą symulację gry poza przeglądarką (przemiatanie wielu ziaren, ślad jednego przejścia, pętla zarobkowa, kampania gracza przez tygodnie), leży dziś w notatkach Mariusza, poza repozytorium.
- Każda sesja, która chce zadać pytanie o balans, buduje najpierw kopię gry poza repozytorium (`git archive`, skopiowane `node_modules`, budowanie) — tak pracowały obie analizy, z których pochodzi to zadanie.
- Przyrządu nic nie pilnuje: zmiana kształtu programu albo podpisu funkcji pętli zarobkowej zepsuje go po cichu (the note on the balance instrument, działanie D1, „Co jeśli nic”).
- Szkic zakresu Projektu 2 stawia przed definicją każdej paczki krok: „Każda mapa przed definicją paczki przechodzi przez symulator nakładką. Agent kładzie dane mapy na dzisiejszą grę, puszcza programy wzorcowe i ustaloną liczbę prób napisania programu, który przechodzi mapę bez rzeczy, o którą mapa pyta. Mariusz dostaje tabelę wyników bez treści programów, żeby nie znać rozwiązań. Pomiar podaje też bilans pętli” (the note on the scope of Project 2, „Paczki i kolejność”; the note on the progression critique, działanie D20).
- Test akceptacyjny symulacji sprawdza program 17 reguł, który przeżywa 480 minut gry na jednym ziarnie, a nie rozwiązuje Lasu na żadnym z 500 ziaren — test sugeruje, że Las jest przechodzalny tym programem (the note on the balance instrument, ustalenie 2.3 i działanie D9).
- Cel w słowach zadania: „żeby każde pytanie o balans i każda nowa mapa była jednym poleceniem”.
- Odbiorcy: agent, który wyważa mapę albo odpowiada na pytanie o balans, i Mariusz, który dostaje tabelę wyników.

### To do

1. Przyrząd wchodzi do repozytorium jako stałe narzędzie z poleceniami i flagami po angielsku: przemiatanie, ślad jednego przejścia, pętla zarobkowa, kampania i zapis programów. Importuje skompilowaną symulację gry i nie przepisuje żadnej jej liczby (pytanie 4).
2. Razem z nim wchodzą: programy wzorcowe obu analiz, opisy graczy do kampanii i trzy nakładki map starej gry z krytyki progresji — wataha, Pustkowie i Martwa strefa — jako nowe mapy dokładane w pamięci (pytanie 4).
3. Przyrząd uruchamia się jednym poleceniem npm, które samo buduje grę.
4. Nakładka zmienia dane gry tylko w pamięci, na czas pomiaru; pliki danych gry zostają nietknięte.
5. Tryb sprawdzania mapy: jedno polecenie bierze nakładkę i dla każdej jej mapy i każdego programu wzorcowego wypisuje tabelę: odsetek rozwiązań na ziarnach 1–500, medianę minut gry rozwiązanych przejść, porażki według przyczyny oraz bilans pętli zarobkowej — ile przejście bierze ze skrzynki, ile do niej oddaje i jak często postać ginie. Tabela nie pokazuje treści programów (pytanie 5).
6. Test w `npm test` sprawdza, że to samo ziarno puszczone drogą gry i drogą przyrządu daje to samo przejście: tę samą minutę końca, ten sam wynik i tę samą wprawę, także z zapasem ze skrzynki; test powołuje się na niezmiennik z wiersza 5 *Settlements to record*.
7. Test akceptacyjny symulacji puszcza na Lesie program z zamkniętych list, który Las rozwiązuje, na ziarnie, które sam nazywa, z magiem płacącym energią natury za rozpalanie, i sprawdza, że mapa jest rozwiązana; pusty program na tym ziarnie ginie. D-378 dostaje to brzmienie (pytanie 2, *Decisions in play*).
8. Programy wzorcowe mają w repozytorium jedno miejsce, z którego czytają przyrząd i testy symulacji, także testy z programami wzorcowymi, które wniosą zadania 9 i 10 MVP2 (pytanie 1).
9. Pliki przyrządu należą do nowej części mapy części, która zależy od `simulation` (pytanie 3).
10. Wytyczne kodu i testów obejmują nową część: jej identyfikator stoi w *Applies to* `guidelines/coding.md` i `guidelines/testing.md`, a tabela części w `guidelines/testing.md` mówi, że jej złożoność leży w obliczeniach na symulacji gry — przez skille `the-way-maintain-coding-guidelines` i `the-way-maintain-testing-guidelines` (pytanie 3).
11. Skill `loop2-balance`, na wzór `loop2-play`, opisuje polecenia przyrządu i sposób sprawdzania mapy: nakładka, programy wzorcowe, próby agenta napisania programu, który przechodzi mapę bez rzeczy, o którą mapa pyta, i tabela dla Mariusza bez treści programów; `AGENTS.md` ma linię, która do niego prowadzi (pytanie 5).
12. Wyniki pomiarów nie trafiają do repozytorium: przyrząd pisze na wyjście albo do pliku wskazanego flagą (pytanie 4).

### Acceptance criteria

- Na świeżym klonie, po `npm install`, jedno polecenie daje wynik przemiatania — bez ręcznego budowania i bez kopii gry poza repozytorium.
- Przyrząd w repozytorium daje na tych samych ziarnach te same liczby co przyrząd z notatek na tym samym commicie, dla co najmniej przemiatania Lasu programem `las_najlepszy` na ziarnach 1–500; sprawdza to cykl raz, bez stałego testu (D-80).

### Questions to settle

- Pytanie 1. Kiedy to zadanie wchodzi wobec zadań 9 i 10 MVP2, które same wnoszą do testów symulacji programy wzorcowe (`las_przyzwoity`, `las_naiwny`, `las_najlepszy`), i czy programy wzorcowe mają mieć jedno miejsce?
  - Answer: a — po scaleniu zadań 9 i 10; programy wzorcowe z ich testów trafiają do jednego miejsca, z którego czytają i testy, i przyrząd; nakładki Skraju lasu odpadają, bo po zadaniu 9 Skraj lasu jest w danych gry. Linia zadania czeka na obie linie (⛔).
  - Not chosen:
    - b. Teraz, równolegle — trzy zadania zmieniają ten sam test i tę samą decyzję, więc przy scalaniu będą konflikty; te same programy w dwóch–trzech kopiach, które mogą się rozjechać.
    - c. Po scaleniu, ale przyrząd z własnymi kopiami programów — taniej, ale test pilnuje jednej kopii, a przyrząd mierzy drugą.
  - Source: Mariusz przez doradcę dnia, 2026-11-13: „1 a” oraz „Przy 1 dopisz w linii zadania zależność ⛔ na 🆔 zadań 9 i 10 MVP2”.
- Pytanie 2. Co ma sprawdzać test akceptacyjny z programem, który Las rozwiązuje, i czy zmienia się D-378?
  - Answer: a — D-378 zmienia się z „utrzymuje maga przy życiu 480 minut” na „rozwiązuje Las” na ziarnie, które test nazywa; test sprawdza rozwiązanie, więc zmiana liczb, która uczyni Las nierozwiązywalnym, zostanie zgłoszona.
  - Not chosen:
    - b. Tylko wymienić program, test dalej sprawdza samo przeżycie — program rozwiązuje Las, ale nic tego nie pilnuje.
    - c. Zostawić test jak jest — test dalej sugeruje, że program, który tylko przeżywa, przechodzi mapę.
  - Source: Mariusz przez doradcę dnia, 2026-11-13: „2 a”.
- Pytanie 3. Do której części mapy części należą pliki przyrządu?
  - Answer: a — nowa część („narzędzia balansu”), zależna od `simulation`; wytyczne kodu i testów obejmują ją, a tabela części w wytycznych testów mówi, że jej złożoność leży w obliczeniach.
  - Not chosen:
    - b. Istniejąca `build-tools`, skrypty w `scripts/` — taniej, bo ta część już obejmuje `scripts/**` i zależy od symulacji, ale zbiera coraz różniejsze rzeczy (budowanie, start lokalny, pomiar haseł, balans), a jej wiersz w wytycznych testów mówi o plikach, procesach i rejestrze npm, nie o obliczeniach.
  - Source: Mariusz przez doradcę dnia, 2026-11-13: „3 a”.
- Pytanie 4. Co z notatek przechodzi do repozytorium?
  - Answer: a — rdzeń (przemiatanie, ślad, pętla, kampania, zapis programów), programy wzorcowe obu analiz, opisy graczy do kampanii i trzy nakładki map starej gry z krytyki (wataha, Pustkowie, Martwa strefa); bez jednorazowych skryptów i bez wyników. Programy, które przechodzą Las — głębiej, watahę, Pustkowie i Martwą strefę, będą do przeczytania w publicznym repozytorium, także dla Mariusza jako gracza — ten koszt padł w pytaniu.
  - Not chosen:
    - b. Sam rdzeń i programy na dwie dzisiejsze mapy — mniej rozwiązań w publicznym repozytorium, ale pierwsze sprawdzenie mapy paczki zaczyna się od przenoszenia nakładki.
    - c. Wszystko, łącznie z jednorazowymi skryptami — około tysiąca wierszy kodu, którego nikt drugi raz nie uruchomi, a każdy musi przejść kontrolę stylu i dostać część w mapie.
  - Source: Mariusz przez doradcę dnia, 2026-11-13: „4 a”.
- Pytanie 5. Co wypisuje tryb sprawdzania mapy i czy agent dostaje skill opisujący przyrząd?
  - Answer: a — tabela dla każdej mapy nakładki i każdego programu wzorcowego: odsetek rozwiązań na ziarnach 1–500, mediana minut, porażki według przyczyny i bilans pętli (ile przejście bierze ze skrzynki, ile oddaje, jak często postać ginie), bez treści programów; plus skill `loop2-balance` na wzór `loop2-play` i linia w `AGENTS.md`, która do niego prowadzi.
  - Not chosen:
    - b. Tabela bez bilansu pętli — bilans trzeba liczyć osobnym poleceniem pętli przy każdej mapie, a zakres Projektu 2 (punkt 10) go wymaga.
    - c. Tabela bez skilla — sesja paczki sama szuka poleceń i zgaduje sposób pracy.
  - Source: Mariusz przez doradcę dnia, 2026-11-13: „5 a”.

## Context

- Przyrząd i jego opis: `a file of the author's private notes` (`README.md`, katalogi `przyrzad\`, `programy\`, `nakladki\`, `polityki\`, `wyniki\`); rdzeń to `silnik.mjs` (542 wiersze), `kampania.mjs` (326), `balans.mjs` (205, wiersz poleceń), `programy.mjs` (107), `slad.mjs` (74); reszta katalogu `przyrzad\` to jednorazowe skrypty pojedynczych pomiarów i skróty wyników. Test zgodności ma pierwowzór w `przyrzad\sprawdzenie_zgodnosci.mjs`.
- Pomiary krytyki progresji leżą w `a file of the author's private notes`: trzy nakładki map starej gry jako nowe mapy (`nakladki\wataha.json`, `pustkowie.json`, `martwa_strefa.json`, każda z polem `opis`, czego nie oddaje), programy w `programy\` i w `przyrzad\wspolne.mjs`, cztery jednorazowe skrypty.
- Przyrząd liczono na commicie `20bcc58d`; od niego do `1b0c8ad4` w `src/browser/sim` zmieniły się tylko komentarze w `data/balance.ts` i `trip.ts` oraz dane sceny w `data/scene.ts`. Przyrząd z notatek puszczony 2026-11-13 na zbudowanym `1b0c8ad4` daje dla `las_najlepszy` na Lesie, ziarna 1–500: 359 z 500 (71,8 %), mediana 754 minut — jak w notatce — a dla programu z testu akceptacyjnego 0 z 500; przemiatanie 500 ziaren trwało 1,3 sekundy.
- Granica nakładki: zmienia dane, nie silnik — mapa z nowym rodzajem warunku (Zbocze) albo przedmiot z własną czynnością (opatrunek, tłuk) wymagają kodu gry (`the balance instrument's notes folder\README.md`, „Czego przyrząd nie robi”).
- Zadanie 9 MVP2 (`a file of the author's private notes`) dodaje Skraj lasu jako pierwszą mapę, poprawia uzasadnienie D-378 i dokłada test symulacji z programami przyzwoitym i naiwnym wpisanymi w sam test (To do 6). Zadanie 10 (`a file of the author's private notes`) dokłada test z programem `las_najlepszy` (To do 8). Zadanie porządków (`a file of the author's private notes`) przestawia testy, w tym akceptacyjny, na wybór mapy po identyfikatorze; zadanie 9 czeka na nie.
- Opisy graczy do kampanii `skraj_*` kładą Skraj lasu nakładką `skraj_lasu_480_25.json`; po zadaniu 9 Skraj lasu stoi w danych gry.
- Repozytorium jest publiczne (D-362).
- Pliki repozytorium nie nazywają notatek ani plików prywatnego repozytorium starej gry (D-362, niezmienniki `tracked-file-private-paths` i `tracked-file-private-names`); nakładki map starej gry mówią o swoim pochodzeniu własnymi słowami.
- Nowe pliki `.mjs` podlegają ESLintowi i Prettierowi (`guidelines/coding.md`, „Linter”, „Formatter”); kod z notatek nie był pod nie pisany.
- Katalog `.runs/` repozytorium jest ignorowany przez git (`AGENTS.md`, „Pinned the-way process”).

## Questions carried to cycle

- Gdzie w drzewie repozytorium stoją pliki przyrządu i programy wzorcowe, jak nazywa się nowa część, polecenie npm i jego podpolecenia.
- Jak nakładka zmienia dane gry w pamięci i przywraca je po pomiarze.
- Jak długą pętlę i na ilu ziarnach liczy bilans pętli w trybie sprawdzania mapy.
- Co z przypadkiem testu akceptacyjnego „the program holds every kind of condition and action of the closed list”, gdy test dostaje program, który Las rozwiązuje — zmiana albo usunięcie sprawdzenia idzie regułą „Changing an existing test” wytycznych testów.
- Jak opisy graczy do kampanii `skraj_*` biorą Skraj lasu z danych gry zamiast z nakładki.

## Human actions

none

## Decisions in play

- D-378 — „On Las a program built of the closed lists of conditions and actions keeps the mage alive for 480 game minutes, paying nature energy for its lightings as well as sticks, on at least one seed that a test of the simulation names, and the empty program dies there.” — **zmiana przez to zadanie (pytanie 2, a):** program z zamkniętych list **rozwiązuje** Las, płacąc energią natury za rozpalanie, na co najmniej jednym ziarnie, które nazywa test symulacji, a pusty program na nim ginie; *Verification* i *Rationale* idą za tym zdaniem. Zadanie 9 poprawia wcześniej uzasadnienie D-378 („the first map is passed by writing a program”), więc cykl bierze D-378 w brzmieniu po scaleniu zadania 9.
- D-80 — „A test of a game parameter, such as survival time, progress rate or map difficulty, may check calculations on concrete numbers, but takes its expectation from an agreed requirement. Current parameters or the simulation's current result are not themselves evidence of correctness.” — przyrząd nie wnosi żadnego stałego testu odsetka rozwiązań; test zgodności porównuje dwie drogi tej samej symulacji, nie balans; test akceptacyjny bierze oczekiwanie ze zmienionego D-378.
- D-388 (fragment) — „These numbers are requirements of the game, held in its data (D-18), that tests of the simulation may expect.” *Rationale* (fragment): „This decision forbids other numbers until it is changed, so tuning the numbers of either map later is a change of this decision as well as of data and tests (D-18).” — nakładka zmienia liczby tylko w pamięci pomiaru i nie jest zmianą danych gry.
- D-18 (fragment) — „The game's content — game maps, items, creatures, character skills and their numbers — stands in data files. A game map, an item or a creature of a kind the simulation already handles is added by a change of data alone.”
- D-22 (fragment) — „Every random draw of the simulation comes from generators seeded by the seed saved in the map run's state, one generator for each kind of draw […]” — na tym stoi powtarzalność przemiatania i test zgodności (niezmiennik `map-run-repeatability`).
- D-82 (fragment) — „[…] a test comment names as the source of an expectation no document outside the foundation […]”.
- D-83 (fragment) — „Every `*.test.mjs` file under `tests/` is selected by `npm test` […]”.
- D-266 (fragment) — „The per-module output of the browser's compilation stands in `dist/browser/`, where tests import it and from where the bundle is made […]”.
- D-351 (fragment) — „One invariant keeps every import of loop2's code within its part map […]” — pliki przyrządu importują zbudowaną symulację, więc nowa część ma `simulation` w *Depends on*; testy symulacji, które czytają programy wzorcowe, nie mogą przez to zależeć od nowej części.
- D-362 (fragment) — „No file git tracks names a note the author keeps outside the repository or the folder it lies in, or a file of a repository its readers cannot reach, such as the private repository of the old loop game; what a reader needs of such a source stands in the foundation or in the file itself.”

## Settlements to record

Candidates: 5 shown, 5 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Programy wzorcowe mają w repozytorium jedno miejsce, z którego czytają przyrząd i testy symulacji. | decision | pytanie 1 (wybór człowieka, *Not chosen* tam) | czy programy wpisane w testy zadań 9 i 10 zostają w testach jako osobne kopie obok kopii przyrządu |
| 2 | Tryb sprawdzania mapy wypisuje dla każdej mapy nakładki i każdego programu wzorcowego odsetek rozwiązań na ziarnach 1–500, medianę minut, porażki według przyczyny i bilans pętli, bez treści programów, żeby Mariusz nie znał rozwiązań. | decision | pytanie 5 (wybór człowieka, *Not chosen* tam) | co wypisuje tabela i czy pokazuje programy, które przechodzą mapę |
| 3 | Wyniki pomiarów przyrządu nie trafiają do repozytorium. | decision | pytanie 4 (wybór człowieka, *Not chosen* tam) | czy zapisać wyniki pomiarów w repozytorium obok przyrządu |
| 4 | Nakładka to plik, który na czas pomiaru zmienia dane gry w pamięci — na przykład dokłada nową mapę albo zmienia passę czy temperaturę — a pliki danych gry zostają nietknięte. | glossary term | Mariusz przez doradcę dnia, 2026-11-13: „dopisz oba ustalenia (1 hasło słownika nakładka […])”; znaczenie z To do 4 | czy słowo „overlay” w kodzie, skillu i wpisach dostaje hasło słownika i czy nakładkę wolno brać za zmianę danych gry (D-388) |
| 5 | To samo ziarno puszczone drogą gry i drogą przyrządu daje to samo przejście: tę samą minutę końca, ten sam wynik i tę samą wprawę, także z zapasem ze skrzynki; test z To do 6 się na to powołuje. | invariant | Mariusz przez doradcę dnia, 2026-11-13: „2 stała reguła: to samo ziarno w grze i w przyrządzie daje to samo przejście — test z punktu 6 się na nią powołuje”; treść z To do 6 | czy test zgodności cytuje niezmiennik i czy zmiana symulacji, która rozjedzie drogę przyrządu z drogą gry, łamie regułę fundamentu, czy tylko test |

## Out of scope

- Jednorazowe skrypty pojedynczych pomiarów z obu analiz, ich surowe wyniki, nakładki Skraju lasu i nakładki prób czułości Lasu (`las_passa_*`, `las_otoczenie_*`).
- Przestawienie skryptów krytyki progresji w notatkach na przyrząd w repozytorium.
- Liczba prób agenta i progi, które wpisuje definicja każdej paczki — należą do definicji paczek.
