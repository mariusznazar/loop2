---
title: "loop2: pomiary pod decyzje z przeglądu fundamentu — pamięć testów (D-268), waga strony, rozmiar kroniki i zapisu, czas nadrabiania, warunek powrotu D-75"
status: draft
created: 2026-11-13
updated: 2026-11-13
tags: [zadanie]
related: "the project note of Loop in the author's notes"
---

# loop2: pomiary pod decyzje z przeglądu fundamentu — pamięć testów (D-268), waga strony, rozmiar kroniki i zapisu, czas nadrabiania, warunek powrotu D-75

Status: ready for cycle
Project relation: independent

## Description

### Need

- Kilka decyzji loop2 stoi na liczbie albo progu, którego od ich zapisu nikt nie sprawdził, a przegląd fundamentu z 13.11.2026 znalazł powody, by liczba się zmieniła.
- Próg ponownego otwarcia limitu pamięci testów z D-268 („More than ten test files on a document imitation … reopens how the limit is held”) jest przekroczony: plików testów na imitacji dokumentu jest 24, a sprawy nikt nie otworzył.
- Pomiary zrobiono w doprecyzowaniu (wyniki w *Context*); cykl przenosi do fundamentu to, co z nich rozstrzygnięto, żeby decyzje nie mówiły już „nikt nie mierzył” ani nie podawały liczb, które przestały być prawdą.

### To do

1. D-268: próg ponownego otwarcia mówi „więcej niż czterdzieści plików testów na imitacji dokumentu” zamiast dziesięciu, limit zostaje 2 GiB, a uzasadnienie podaje powód z pomiaru D-268 z *Context* (24 pliki, etap Node około 2,9 GiB bez przypadku samego limitu, największy plik 1076 MiB, komputer z 32 GB); komentarz w `tests/view/memory-limit.mjs:9` podaje ten pomiar zamiast „1.68 GB”.
2. D-04, D-147, D-339 i D-347: każde zdanie o niezmierzonym albo szacowanym rozmiarze kroniki i o dawnym pomiarze (mediana 48, najwięcej 102 wpisy, 13,4 KB) podaje pomiar kroniki z *Context*, z tym, czego nie obejmuje; wybór — kronika tylko w pamięci strony — zostaje, a niezmierzona zostaje jedynie rzadkość przeładowania strony w środku przejścia.
3. D-208: liczby rozmiaru zapisu (2947, 6150, 7075 B) i wyliczenie „about 10 earning loops on Las or 8 on „Las — głębiej”” podają pomiar zapisu gry z *Context* — 3 202, 9 838 i 12 402 B oraz policzone wprost 12 pętli na Lesie i 9 na „Las — głębiej” — z założeniami tego pomiaru.
4. D-247: zdanie o pomiarze „about 0.0068 ms … a lower estimate” podaje zmierzony zakres z *Context*, od 0,001 ms (krótkie przejścia kończone śmiercią) do 0,011 ms („Las — głębiej” z walkami z wilkiem) na minutę gry jednej postaci, bez słów o dolnym oszacowaniu.

### Questions to settle

- 1. D-268: jak dalej trzymać limit pamięci testów na imitacji dokumentu, skoro próg dziesięciu plików jest przekroczony?
  - Answer: a — limit 2 GiB zostaje, próg rośnie do 40 plików, z zapisanym w decyzji powodem z pomiaru; próg dalej liczy pliki, nie pamięć, bo to jedyna miara sprawdzalna bez pomiaru.
  - Not chosen:
    - b. Limit spada do 1,5 GiB — mniejszy najgorszy przypadek, ale największy plik (1076 MiB) ma tylko 1,4 raza zapasu, więc z nowymi ekranami grozi zabijanie zdrowych plików; jedna stała, niezmiennik `document-test-memory-limit` i decyzja.
    - c. Nadzorca etapu testów (wariant z *Rejected* D-268) — osobne, większe zadanie.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „1 a, 2 a, 3 a, 4 a, 5 a”
- 2. D-04, D-147, D-339, D-347: co z kroniką, której rozmiar jest już zmierzony?
  - Answer: a — zmierzone liczby wchodzą do czterech decyzji, wybór (kronika tylko w pamięci strony) zostaje; jedyną hipotezą zostaje rzadkość przeładowania, mierzalna tylko u graczy.
  - Not chosen:
    - b. To samo plus osobne zadanie rozważenia kroniki w zapisie — około 19 KB więcej na ręczne przejście i nowa wersja zapisu.
    - c. Bez zmian — decyzje dalej podają nieprawdziwe „najwięcej 102 wpisy”.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „1 a, 2 a, 3 a, 4 a, 5 a”
- 3. D-208: co z liczbami rozmiaru zapisu gry?
  - Answer: a — liczby podmienione na dzisiejsze (3 202, 9 838, 12 402 B; 12 i 9 pętli) z założeniami pomiaru (jeden wspólny program, gra znająca wszystko).
  - Not chosen:
    - b. Zostawić — liczby pojedynczego zapisu zaniżone o 60–75%, choć wniosek o liczbie pętli przypadkiem trzyma.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „1 a, 2 a, 3 a, 4 a, 5 a”
- 4. D-247: co z pomiarem 0,0068 ms na minutę gry?
  - Answer: a — liczba zastąpiona zmierzonym zakresem 0,001–0,011 ms, bez słów „dolne oszacowanie”.
  - Not chosen:
    - b. Zostawić — wniosek (kilka sekund na postać po pół roku) mniej więcej trzyma, ale liczba zaniżona 1,6 raza dla walk.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „1 a, 2 a, 3 a, 4 a, 5 a”
- 5. D-03 i D-75: czy obie decyzje zostają bez zmian?
  - Answer: a — obie bez zmian, nic się nie zapisuje: liczba „about 218 KB” trzyma, a warunek powrotu D-75 nie zaszedł.
  - Not chosen:
    - b. Dopisać, że sprawdzono — historia w treści decyzji, a fundament opisuje stan obecny.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „1 a, 2 a, 3 a, 4 a, 5 a”

## Context

- Zadanie wydzielone 2026-11-13 z the author's note on the gaps in tests found by that review: pomiary, których wynik dopiero ma przynieść decyzję, nie czekają tam na siebie z gotowymi zmianami testów (odpowiedź doradcy dnia w imieniu Mariusza, 2026-11-13: „b”).
- Dane przeglądu: the author's note of the foundation review of 2026-11-13, sekcje „F-6”, „2. Słabe punkty” (wiersze D-03, D-04/D-147/D-339, D-75, D-208, D-247, D-268) i „Sprawdzenia do zamówienia” (wiersze 9, 10, 11, 15, 16).
- Pomiary zrobione 2026-11-13 na `main` `fc00c406`, w osobnym worktree po `npm ci` i `npm run build`, na komputerze właściciela (20 rdzeni, 32 GB pamięci), przy dwóch innych bramkach loop2 biegnących równolegle; skrypty i surowe wyniki leżą w scratchpadzie tej sesji, który może zniknąć — liczby niżej są ich jedynym trwałym zapisem.
- D-268 — pełny `npm test` ze śledzeniem pamięci drzewa procesów co 100 ms: etap Node przeszedł cały (2257 testów, 0 błędów, 96 s); dwa błędy `tests/quality` to brak `.runs/quality-venv` w świeżym worktree, jak w rekordzie PR #72.
- D-268 — szczyt pamięci etapu Node: 5558 MiB w pełnym `npm test` i 5033 MiB w powtórce samego etapu Node; w powtórce 2096 MiB z tego to przypadek `page-document.test.mjs` „memory growing on a stuck main thread”, który celowo rośnie do limitu, więc reszta etapu to około 2,9 GiB (zapis z chwili ustanowienia limitu: 1,68 GB, `tests/view/memory-limit.mjs:9`).
- D-268 — największy prawdziwy plik testów: `tests/view/account-screen.test.mjs`, 1076 MiB szczytu, czyli około połowy limitu 2 GiB; następne `rule-editor.test.mjs` 464 MiB, `scene.test.mjs` 375 MiB, `end-window-game.test.mjs` 372 MiB.
- D-268 — `scripts/test.py:44` uruchamia `node --test` na wszystkich plikach naraz, a Node puszcza domyślnie tyle plików równocześnie, ile rdzeni minus jeden (tu 19); w szczycie pracowało 21–25 procesów Node.
- D-03 — React w zbudowanej stronie (`dist/public/main.js`, 453 757 B, minifikowany, bez kompresji): `react-dom` 209 806 B, `react` 8 435 B, `scheduler` 3 713 B, razem 221 954 B (około 217 KiB) — liczba „about 218 KB” trzyma.
- Kronika — prawdziwe `createChronicle` z widoku, karmione odczytami co 200 ms przy tempie 16, 30 ziaren na wariant, gra znająca wszystko, jedna postać: Las z programem 17 reguł z `tests/sim/loop.test.mjs` — przejście do minuty 1670 (mediana; 341–1816), 227,5 wpisu (mediana; najwięcej 255), 16 990 B surowego JSON (mediana; najwięcej 18 892 B), około 75 B na wpis.
- Kronika — „Las — głębiej” z programem walczącym i zapasami ze skrzyni: mediana 118 wpisów i 8 822 B, najwięcej 186 wpisów i 13 853 B.
- Kronika — pomiar nie obejmuje zmian gracza w kopii programu, odkryć (gra znała wszystko) ani akapitu ostatniego spotkania, który ekran składa ze stanu gry; każde przejście skończyło się śmiercią, żadne ukończeniem mapy.
- Kronika — dawny pomiar z D-347 (mediana 48 wpisów, najwięcej 102, najwięcej 13,4 KB) jest nieaktualny: dziś długie przejście Lasu ma 4–5 razy więcej wpisów; szacunek „50–60 bajtów na wpis i kilkaset wpisów” z D-04 i D-147 jest bliżej prawdy niż tamten pomiar.
- Zapis gry — wersja zapisu to dziś 5 (`src/browser/sim/saved-game.ts:78`), nie 4; mierzone jako bajty UTF-8 tego, co wysyła `account-api.ts`: siedziba z jedną postacią 3 202 B (w D-208: 2947), przejście Lasu w minucie 300 mediana 9 838 B (w D-208: 6150), „Las — głębiej” w minucie 300 mediana 12 402 B (w D-208: 7075).
- Zapis gry — przyczyna wzrostu (wniosek, nie pomiar): ręczne przejście niesie program trzy razy — na liście programów (1 772 B) i jako kopię z jej podstawą (3 521 B).
- Zapis gry — policzone wprost, ile pętli zarobkowych mieści się pod 64 KiB (65 536 B), przy jednym wspólnym programie, bez ręcznego przejścia i z pustym raportem nieobecności: 12 na Lesie (13 to 67 272 B), 9 na „Las — głębiej” (10 to 66 675 B); metoda z D-208 (cały zapis ręcznego przejścia na pętlę) dałaby dziś 6 i 5 i zawyża koszt pętli.
- Nadrabianie — `catchUp` w `src/browser/sim/loop.ts`, jedna postać w pętli, okno 30 dni, mediana z 5 powtórzeń: krótkie przejścia Lasu kończone śmiercią (pusty program) 0,00105 ms na minutę gry; Las z programem 17 reguł 0,00519 ms; Las z programem dłużej przeżywającym 0,00759 ms; „Las — głębiej” z walkami z wilkiem 0,01080 ms (1,6 razy więcej niż 0,0068 ms z D-247).
- Nadrabianie — pętla kończy liczenie przy śmierci, której wskrzeszenie nie pokrywa (`loop.ts:576`–`:588`), więc w pomiarze żadna pętla nie przeszła całych 30 dni; „sekundy po wielu miesiącach” z D-247 dotyczą pętli, która nie pada.
- D-75 — `932da64a` to poprawka w PR #43 przed scaleniem, po decyzji człowieka o uwadze I-2 przeglądu tej prośby: wczytywanie zapisu nie obejmowało jeszcze stanu dociągniętego scaleniem `main`; usterka nie trafiła do gry.
- D-75 — `098a7084` (PR #72) zmienia zachowanie, które autor PR #55 sam wypisał przy scaleniu jako otwartą uwagę (loop2#055-3: link z maila wklejony do karty z otwartą grą ląduje w Siedzibie); dotychczasowy test utrwalał je jako zamierzone, a odwróciła je dopiero nowa decyzja D-352.
- D-75 — żadna z dwóch poprawek nie jest więc usterką krytycznej ścieżki gracza, która wymknęła się mniejszym testom; warunek powrotu D-75 nie zaszedł.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- D-03 — „it adds about 218 KB to the page, which the server does not compress” (*Rationale*).
- D-04 — „the size of a chronicle was never measured — an estimate gives 50 to 60 bytes an entry and several hundred entries in a long map run” i „That choice rests on two things nobody measured, the size of a chronicle and how rarely a page is refreshed in the middle of a map run, and both are hypotheses.” (*Rationale*).
- D-75 — „Permanent tests of complete player journeys in a real browser are deferred, and a changed journey is checked manually. Automation is reconsidered when a critical-journey defect escapes smaller tests or repeated manual checking becomes a significant task cost; that task settles the tool and scope.”
- D-147 — „The choice rests on two unmeasured assumptions: the size of a chronicle, for which an agent's estimate gives 50 to 60 bytes an entry and several hundred entries in a long map run, and the rarity of a refresh in the middle of a map run.” (*Rationale*).
- D-208 — „measured, the headquarters with one character came to 2947 bytes and a map run of Las at game minute 300 to 6150 bytes, of „Las — głębiej” to 7075, each with the copy of the program and its basis, which puts the limit at most at about 10 earning loops on Las or 8 on „Las — głębiej”, an upper estimate that counts neither the other characters nor the report” (*Rationale*).
- D-247 — „The seconds rest on one measurement, made on short map runs ended by death: about 0.0068 ms for a game minute of one character, a lower estimate, since the cost of a game minute grows with the length of a map run.” (*Rationale*).
- D-268 — „More than ten test files on a document imitation, or memory running away in a test on none, reopens how the limit is held.”; limit „2 GiB of its process's memory, read every 100 ms by a worker thread”; *Rejected*: „a supervisor over the test stage reading the process tree from outside — a reader for each system, slower readings, a wrapper on two commands with a direct run of the test runner still bare, and a sum it cannot pin on one file, though it stays the way to go if tests not on an imitation need this”.
- D-339 — „The choice rests on two hypotheses: the estimate of the chronicle's size, which a measurement under narrower conditions (given in D-347) puts at fewer entries, and that a reload in the middle of a map run is rare, which nobody measured.” (*Rationale*) oraz w *Rejected* zdanie o pomiarze „at most 102 entries and 13.4 KB of raw JSON in a map run beside a save of about 9.5 KB”.
- D-347 — „The size of the chronicle was measured when this was weighed, on 30 seeds of one character in Las with a ready program of 17 rules: a map run gave a median of 48 entries of the kinds the chronicle holds and 102 at most, as raw JSON 8.0 KB on average and 13.4 KB at most, beside a save of about 9.5 KB” (*Rationale*).
- Niezmiennik `document-test-memory-limit` (z D-268) — „a process of such a file whose memory … stands above 2 GiB is killed”.

## Settlements to record

Candidates: 5 shown, 4 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Limit pamięci testów na imitacji dokumentu zostaje 2 GiB, a sprawę otwiera na nowo dopiero więcej niż czterdzieści takich plików, z powodem z pomiaru z 2026-11-13. | decision | pytanie 1 w *Questions to settle* | jaki próg wpisać w D-268 i czy ruszać limit |
| 2 | Rozmiar kroniki jest zmierzony i kronika zostaje tylko w pamięci strony; niezmierzona zostaje jedynie rzadkość przeładowania w środku przejścia. | decision | pytanie 2 w *Questions to settle* | czy przy poprawce liczb zmieniać wybór miejsca kroniki w D-04, D-147, D-339, D-347 |
| 3 | D-208 podaje dzisiejsze rozmiary zapisu i policzoną wprost liczbę pętli pod 64 KiB, z założeniami pomiaru. | decision | pytanie 3 w *Questions to settle* | które liczby i którą metodę liczenia pętli wpisać |
| 4 | D-247 podaje zmierzony zakres 0,001–0,011 ms na minutę gry jednej postaci, bez słów o dolnym oszacowaniu. | decision | pytanie 4 w *Questions to settle* | czy zostawić „lower estimate” i jaką jedną liczbę wpisać |

## Out of scope

- Kronika w zapisie gry (wariant 2 b, niewybrany).
- Pomiar rzadkości przeładowania strony w środku przejścia — możliwy tylko u graczy.
- D-03 i D-75 — bez zmian (pytanie 5).
