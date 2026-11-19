---
title: "loop2: podzielić trzy miejsca ponad limitem rozmiaru — startApp, createProgramsEntry i plik strony wspólnych kontrolek"
status: draft
created: 2026-11-18T02:27
updated: 2026-11-18
tags: [zadanie]
related: "the author's note of the project Loop"
---

# loop2: podzielić trzy miejsca ponad limitem rozmiaru — startApp, createProgramsEntry i plik strony wspólnych kontrolek

Status: ready for cycle
Project relation: independent
Defect introduced by: none

## Description

### Need

- W grze (repozytorium loop2) kontrola rozmiaru kodu z D-425 — funkcja najwyżej 200 linii kodu, plik najwyżej 800 — jest oznaczona jako oczekiwana porażka, bo trzy miejsca stoją ponad progiem.
- Dopóki tak jest, bramka testów przechodzi, ale nie zatrzymuje żadnej funkcji ani pliku, które urosną; pilnuje tego tylko przegląd, który widzi różnicę zmiany, a nie sumę.
- Odczuwa to agent, który dopisuje kolejny ekran albo regułę, i Mariusz przy przeglądzie zmiany; gracz nie odczuwa nic, bo gra ma wyglądać i działać tak samo — poza jedną zmianą z punktu 8 (okno końca po nieobsłużonym błędzie), dopisaną do tego zadania, bo rusza ten sam plik `app.ts`.

### To do

1. Funkcja `startApp` w `src/browser/view/app.ts`, która uruchamia stronę gry (449 linii kodu przy pomiarze z 2026-11-18), mieści się w progu funkcji, a strona robi i pokazuje to samo co przed zmianą.
2. Funkcja `createProgramsEntry` w `src/browser/view/programs-entry.ts`, która buduje wpis ekranu Programy w rejestrze ekranów (245 linii), i jej metoda `build` (225 linii) mieszczą się w progu funkcji, a ekran Programy robi i pokazuje to samo co przed zmianą.
3. Plik `src/browser/kitchen-sink/kitchen-sink.tsx`, strona pokazująca wspólne kontrolki, role i kafelki gry w każdym stanie (890 linii), mieści się w progu pliku; kod potrzebny tylko stronie może przy tym stać w kilku plikach katalogu `src/browser/kitchen-sink/` (pytanie 1).
4. Ostatni akapit reguły „The kitchen-sink page” w `guidelines/styleguide-browser-view.md` („Poza swoim modułem wejściowym strona importuje tylko moduły, których używa gra; kod potrzebny tylko jej zostaje w tym module…”) mówi, że kod potrzebny tylko stronie zostaje w katalogu `src/browser/kitchen-sink/`, z zachowanym uzasadnieniem, że kod strony nie trafia do wyniku `npm run build`; zdanie zmienia autor cyklu według znaczenia z pytania 1 i z wiersza 1 tabeli *Settlements to record* (pytanie 4).
5. Miejsce inne niż te trzy, które przy pomiarze na początku cyklu stoi ponad progiem, cykl dzieli w tej samej zmianie, gdy jego nadwyżka wynosi najwyżej 50 linii; przy większej cykl staje i pyta przy zablokowanej prośbie o scalenie (pytania 2 i 5).
6. W tej samej zmianie, w której przebieg reguły rozmiaru przestaje cokolwiek zgłaszać, przypadek `test_no_function_and_no_file_is_over_a_threshold` w `tests/quality/test_function_and_file_size.py` traci oznaczenie `@unittest.expectedFailure` razem z komentarzem nad nim, który nazywa trzy miejsca („Expected failure while code stands over a threshold…”), a niezmiennik `function-and-file-size` w `foundations/invariants.md` dostaje `Violated: no` — przez skill `the-way-record-invariant`.
7. Opisy w wytycznych, które nazywają podzielone miejsca, zgadzają się z kodem po podziale — także przykład „Gra na stronie i odpowiedzi serwera” w `guidelines/coding-browser-module.md`, gdzie stoi, że wartości przeżywające przejście między rodzajami stanu strony „stoją w `startApp` osobno”.
8. Jedyna zmiana zachowania w tym zadaniu (dopisana 2026-11-18 decyzją Mariusza, zamiast osobnego zadania): okno końca przejścia otwiera się samo i przyciskiem „Koniec przejścia” także po błędzie, którego nie obsłużył żaden kod gry — dziś po takim błędzie w chwili śmierci postaci okno się nie otwiera, a przycisk nic nie robi. To, czy okno jest otwarte, jest pamięcią strony, nie stanem gry (rozstrzygnięcie doradcy dnia w imieniu Mariusza, 2026-11-17). Miejsca: `src/browser/view/app.ts` (obsługa błędu zatrzymuje grę, ok. linii 316 na `d8e318c3`), `src/browser/view/state-store.ts` (flaga zatrzymania, ok. 202–203), `src/browser/view/run-screen-state.ts` (ignoruje „Koniec przejścia”, ok. 225, i koniec animacji śmierci, ok. 241); strażnik z commita `d0c42108` trzyma test `tests/view/run-screen-state.test.mjs` (ok. 219), który zmienia oczekiwanie. Fundament: zdanie D-323 i niezmiennik `uncaught-failure-game-state` uzgodnione z D-311 i D-371 (okno należy do pamięci strony i po błędzie dalej działa) — przez skille the-way zapisu wpisów fundamentu. Opis sprawy, zrzut i raport sesji: the author's private note on three screen matters from a session in the browser, sekcja 1. Zmiana idzie osobnym commitem, żeby przegląd odróżnił ją od podziału.

### Acceptance criteria

- Testy w `tests/view/` przechodzą bez zmiany swoich oczekiwań, poza przypadkiem strażnika okna końca w `tests/view/run-screen-state.test.mjs` (punkt 8).
- Po błędzie, którego nie obsłużył żaden kod gry, w chwili śmierci postaci okno końca otwiera się samo, a „Koniec przejścia” je otwiera (punkt 8).
- Strona wspólnych kontrolek zbudowana przez `npm run kitchen-sink` pokazuje po zmianie te same próbki, w tej samej kolejności i w tych samych stanach co przed nią.

### Questions to settle

- 1. Czy kod potrzebny tylko stronie wspólnych kontrolek może stać w kilku plikach katalogu `src/browser/kitchen-sink/`, skoro styleguide każe mu dziś zostać w module wejściowym strony?
  - Answer: Tak. Zdanie styleguide'u zmienia się tak, że kod potrzebny tylko stronie zostaje w katalogu `src/browser/kitchen-sink/`, a nie w jej module wejściowym, i zachowuje uzasadnienie: kod strony nie trafia do gry wysyłanej na serwer. Kto zmienia zdanie — pytanie 4.
  - Not chosen:
    - zostawić zdanie i odchudzić plik o około 90 linii bez wynoszenia kodu — ściskanie tabel próbek grozi zgubieniem stanu kontrolki, który strona ma pokazywać (D-45), a plik zostaje tuż pod progiem i następna kontrolka znów go przekroczy
    - wyjątek w D-425 dla pliku strony — przeczy rozstrzygnięciu z 2026-11-18 „zadanie, nie wyjątek”, a plik z wyjątkiem rośnie bez limitu
  - Source: doradca dnia w imieniu Mariusza (upoważnienie z 2026-11-14), 2026-11-18: „1 a […] Do 1 a: zmiana zdania wytycznych idzie przez ich skill i trzyma uzasadnienie (kod strony nie trafia do gry wysyłanej na serwer).”; zdanie dziś: `guidelines/styleguide-browser-view.md`, reguła „The kitchen-sink page”, ostatni akapit, około linii 456, rewizja 6a7b0acb: „Poza swoim modułem wejściowym strona importuje tylko moduły, których używa gra; kod potrzebny tylko jej zostaje w tym module, bo w `src/browser/view/` trafiłby do wyniku `npm run build`.”
- 2. Co cykl robi z miejscem, które przy ponownym pomiarze na początku cyklu stoi ponad progiem, a nie jest jednym z trzech miejsc tego zadania?
  - Answer: Cykl dzieli w tej samej zmianie także takie miejsce, gdy przekracza ono próg o niewiele; gdy jego nadwyżka przekracza 50 linii (pytanie 5), cykl staje i pyta człowieka przy zablokowanej prośbie o scalenie.
  - Not chosen:
    - cykl dzieli tylko trzy miejsca, test zostaje oczekiwaną porażką z nowym miejscem w komentarzu, a nowe miejsce idzie do osobnego zadania — kontrola dalej niczego nie zatrzymuje
    - cykl zawsze staje i pyta przy zablokowanej prośbie — jedna runda więcej także przy przekroczeniu o kilka linii
  - Source: doradca dnia w imieniu Mariusza (upoważnienie z 2026-11-14), 2026-11-18: „2 a […] Do 2 a: dotyczy miejsca, które przekracza próg o niewiele; gdyby nowe miejsce wymagało podziału większego niż którekolwiek z trzech, cykl staje i pyta (wariant c) zamiast rosnąć bez końca.”; poprawka przy akceptacji, doradca dnia w imieniu Mariusza, 2026-11-18: „zamień je na »gdy jego nadwyżka przekracza 50 linii (pytanie 5), cykl staje i pyta człowieka przy zablokowanej prośbie o scalenie«”; pytanie z notatki zadania, 2026-11-18: „Przed pracą zmierz jeszcze raz […], bo `main` mógł się ruszyć.”
- 3. Co cykl robi, gdy któregoś z trzech miejsc nie da się sprowadzić pod próg bez szkody dla kodu?
  - Answer: Cykl nie wpisuje wyjątku sam: zgłasza go człowiekowi jako propozycję zmiany D-425 przy zablokowanej prośbie o scalenie.
  - Source: `guidelines/coding.md`, „Size of a function and a file”, około linii 264, rewizja 6a7b0acb: „Kod, którego zmiana nie sprowadzi pod próg bez szkody, zmiana zgłasza człowiekowi jako propozycję wyjątku i sama go nie wpisuje.”; `foundations/decisions.md`, D-425, rewizja 6a7b0acb: „Adding an exception takes a human-accepted change of this decision.”
- 4. Kto zmienia zdanie styleguide'u z pytania 1, skoro skill wytycznych wyglądu działa tylko w doprecyzowaniu zadania?
  - Answer: Autor cyklu, według znaczenia ustalonego w pytaniu 1 i w wierszu 1 tabeli *Settlements to record*, z zachowanym uzasadnieniem; skill wytycznych wyglądu nie jest potrzebny, bo znaczenie ustaliło to doprecyzowanie.
  - Not chosen:
    - uruchomić skill wytycznych wyglądu w tym doprecyzowaniu dla tej jednej sprawy — ten sam wynik za dodatkową rundę na jedno zdanie
    - zostawić punkt 4 z nazwą skilla — cykl go nie wywoła i stanie przy zablokowanej prośbie o scalenie
  - Source: doradca dnia w imieniu Mariusza (upoważnienie z 2026-11-14), 2026-11-18: „1 a […] (mój warunek o skillu był błędny […])”; `.the-way/product-guidelines/styleguide/SKILL.md`, „Where the skill works”, rewizja bfb2e109: „It runs inside the refinement of one task whose outcome is a styleguide”, a tabela obok daje autorowi cyklu „the styleguide's file”.
- 5. Jak mierzyć, że nowe miejsce przekracza próg „o niewiele” (pytanie 2)?
  - Answer: Nadwyżką linii ponad próg, liczoną tak, jak wypisuje ją test rozmiaru; do 50 linii nadwyżki cykl dzieli miejsce w tej samej zmianie, powyżej staje i pyta.
  - Not chosen:
    - granica dosłowna: nadwyżka nie większa niż największa z trzech miejsc (249 linii) — cykl prawie nigdy nie staje
    - bez liczby: cykl ocenia sam i uzasadnia w prośbie — niejednoznaczny wynik
  - Source: doradca dnia w imieniu Mariusza (upoważnienie z 2026-11-14), 2026-11-18: „2 b […] granica 50 linii nadwyżki liczona jak w teście rozmiaru”.

## Context

- Pomiar z 2026-11-18 na `main` przy 6a7b0acb (scalony PR #154), `node tests/quality/eslint-size-rules.mjs` z korzenia repozytorium: `kitchen-sink.tsx` 890 linii przy progu 800, `startApp` 449, `createProgramsEntry` 245 i jej metoda `build` 225 przy progu 200; linie liczone bez komentarzy i pustych linii, z funkcjami zagnieżdżonymi wliczanymi do funkcji, która je zawiera.
- Zadanie, które miało podzielić `startApp`, jest zamknięte, a funkcja nadal stoi ponad progiem; `createProgramsEntry` stanęła ponad progiem po podziale sterownika widoku, a ani ona, ani plik strony nie były nazwane w zadaniu PR #154.
- PR #154 podzielił cztery inne funkcje widoku: pamięć sceny przeniesiona do czystych funkcji w `scene-memory.ts`, przeciąganie reguł wyniesione do Hooka w `rule-drag.ts`, nagłówki i części paneli wydzielone jako komponenty w `program-panel.tsx` i `rule-panel.tsx`; to przykład, nie wymóg.
- Strona wspólnych kontrolek kompiluje każdy plik `.ts` i `.tsx` katalogu `src/browser/kitchen-sink/` (`tsconfig.kitchen-sink.json`), a budowanie gry ten katalog wyklucza (`tsconfig.browser.json`), więc moduł obok `kitchen-sink.tsx` nie trafia do wyniku `npm run build`.
- Stała `PAGE_MARKER` stoi według komentarza przy niej tylko w module wejściowym strony i w jej HTML, a test niezmiennika `application-build-kitchen-sink` szuka jej w wynikach obu budowań.
- Zachowanie `startApp` i ekranu Programy pokrywają testy w `tests/view/`, między innymi `account-screen`, `login-card-focus`, `owner-panel`, `previous-save`, `uncaught-failure` i `program-list`; treści strony wspólnych kontrolek żaden test nie sprawdza, więc jej obraz do porównania trzeba zebrać przed podziałem.
- Plików `src/browser/view/` nie dzielić równolegle z innym zadaniem, które je zmienia (notatka zadania, 2026-11-18).
- Cały dokument zaakceptował doradca dnia w imieniu Mariusza, 2026-11-18, z poprawką odpowiedzi na pytanie 2.
- Przed doprecyzowaniem odrzucono wyjątki D-425 dla tych trzech miejsc zamiast podziału: doradca dnia w imieniu Mariusza przy PR #154, 2026-11-18, „zadanie, nie wyjątek”.

## Questions carried to cycle

- Jak podzielić `startApp`, `createProgramsEntry` z jej metodą `build` i plik strony wspólnych kontrolek — na przykład plik strony według grup próbek (kontrolki, formularze, część menu „Konto”, role, kafelki) czy inaczej (notatka zadania, 2026-11-18, otwarty wątek).

## Human actions

none

## Decisions in play

- D-425 — „A function holds at most 200 lines of code and a file at most 800, lines counted without comments and blank lines and the lines of a nested function counted in the function that holds it. […] Two exceptions stand whole over a threshold and no other does: the function `accountRoutes` in `src/server/account-routes.ts` […] and the file `src/browser/sim/saved-game.ts` […]. Adding an exception takes a human-accepted change of this decision.” Zadanie sprawia, że kod spełnia tę decyzję, a jej niezmiennik przestaje być naruszony.
- D-45 — „The kitchen-sink page of the browser view is built from `src/browser/kitchen-sink/` and opened on the developer's machine by its own command, `npm run kitchen-sink`, and nothing `npm run build` writes, which is what reaches the test server, holds it.”
- D-269 — „`scripts/kitchen-sink.mjs` bundles it in its build step as the game's browser code is bundled, the compiler emitting the page's modules and esbuild joining them into the one file the page loads (D-263, D-266). A change of how the page is built is made in that build step and never in the script's lines that serve files.”
- D-407 — „The game state lives in a store outside React and the state of the screen Przejście […] in a module of its own outside React; memory several screens share is a memory of the page, given to the factories of the screens and read through `useSyncExternalStore`, and the state of one screen lives in the component of that screen.”

## Settlements to record

Candidates: 2 shown, 1 accepted — 2026-11-18

| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Kod potrzebny tylko stronie wspólnych kontrolek zostaje w katalogu `src/browser/kitchen-sink/`, nie w jej module wejściowym, bo kod strony nie trafia do gry wysyłanej na serwer. | guidelines: styleguide | pytanie 1 pod *Questions to settle* (doradca dnia w imieniu Mariusza, 2026-11-18), z odrzuconymi drogami pod nim | czy wolno rozbić plik strony na kilka modułów, czy trzeba go ścisnąć w jednym pliku albo zaproponować wyjątek D-425 |

## Out of scope

- Statusy `copy` i `do not copy` nowych plików z podziału w tabeli „Files of this kind” w `guidelines/coding-browser-module.md`; plik bez wiersza nie jest wzorem.
