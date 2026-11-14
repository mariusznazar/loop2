---
title: Podział sterownika widoku na magazyn stanu, rejestr ekranów i stan ekranu przejścia, w kształcie rozstrzygniętym w rozmowie
status: draft
created: 2026-11-13
updated: 2026-11-13
tags: [zadanie]
related: "the author's project note of Loop"
---

# Podział sterownika widoku na magazyn stanu, rejestr ekranów i stan ekranu przejścia, w kształcie rozstrzygniętym w rozmowie

Status: ready for cycle
Project relation: independent

## Description

### Need

- Funkcja `createGameView` (`src/browser/view/game-view.ts:220-1028` na `2b4d760c`) trzyma naraz stan gry, pięć ekranów z dwiema zasadami życia (Siedziba, Programy i Przejście budowane raz i chowane; Postać i Mapy budowane przy wejściu i usuwane przy wyjściu), pytanie „Zapisać, odrzucić, wrócić?”, okno końca przejścia, fokus klawiatury i momenty zapisu.
- Dopisanie ekranu oznacza dziś dopiski we wspólnych miejscach tej funkcji: przyjęcie wyniku symulacji (`:361`), odczyt zegara (`:377-381`), pokazanie ekranu (`:882-890`), `screenHolder` (`:910-924`), `renderScreens` (`:932-941`), `shownElement` (`:944-956`) i `dispose` (`:1018-1023`).
- Protokół „najpierw dolicz czas, potem wykonaj akcję” jest powtarzany ręcznie przed każdą akcją (`clock.flush()`), więc nowa akcja, która go pominie, da błąd trudny do zauważenia.
- Następny ekran to Wiedza (zadanie 22 MVP2, `_zadania/ekran_wiedzy_loop2.md`), którego linia w backlogu czeka na to zadanie.
- Cel z linii zadania: nowy ekran nie wymaga dopisków w siedmiu wspólnych miejscach, a gracz nie widzi żadnej zmiany.

### To do

1. Stan gry ma jeden magazyn poza Reactem: przyjmuje każdy wynik symulacji (dziś `take`), a akcja gracza, która zależy od czasu, dolicza czas przed wykonaniem w jednym miejscu tego magazynu zamiast osobnego `clock.flush()` przed każdą akcją; nowa postać (`game-view.ts:451-453`) i zakup gałęzi (`:675-677`) dalej czasu nie doliczają. Momenty zapisu (D-207) i odrzucanie wyników po `halt()` (D-323) zostają takie jak dziś.
2. Ekrany mają rejestr: każdy ekran ma w nim jeden wpis — jak go zbudować, jak odświeżyć ze stanu gry i chwili zegara, jak usunąć i czy żyje stale (Siedziba, Programy, Przejście), czy tylko wtedy, gdy gracz na nim jest (Postać, Mapy). Pokazanie ekranu, odświeżenie po wyniku symulacji i po odczycie zegara, wybór elementu, który dostaje fokus, i sprzątanie przechodzą przez rejestr, bez gałęzi pisanych osobno dla każdego ekranu.
3. Stan ekranu przejścia — pytanie „Zapisać, odrzucić, wrócić?”, okno końca przejścia, czekanie okna na efekt sceny i fokus okna otwartego przed wstawieniem gry na stronę — ma osobny moduł poza Reactem, z zasadami otwierania i zamykania z D-173, D-311, D-322 i D-368 bez zmian.
4. `createGameView` zostaje jako złożenie tych modułów z tą samą granicą (`GameViewOptions`, `GameView`), więc `app.ts` się nie zmienia.
5. `guidelines/coding-browser-module.md` idzie za zmianą: przykłady „Ekran w Reactcie: Postać” (dziś opisuje odświeżanie przez `renderScreens` i odczyt zegara w `game-view.ts`) i „Gra na stronie i odpowiedzi serwera” opisują nowy kształt, a każdy nowy plik dostaje wiersz w tabeli „Files of this kind”.

### Acceptance criteria

- Opis prośby o scalenie wymienia miejsca, które zmienia dodanie nowego ekranu, i żadne z nich nie jest wspólną funkcją sterownika poza wpisem w rejestrze.
- Każdy istniejący test przechodzi bez żadnej zmiany w swoim pliku (pytanie 2); nowe moduły dostają własne testy.

### Questions to settle

- 1. Czy widok ma jeden korzeń Reacta, czy zostają osobne wyspy, i gdzie mieszka stan widoku?
  - Answer: a) wyspy zostają. Stan gry mieszka w magazynie poza Reactem; stan ekranu przejścia (pytanie i okno) w osobnym module poza Reactem; pamięć wspólna dla kilku ekranów idzie wzorem pamięci strony podawanej fabrykom i czytanej przez `useSyncExternalStore` (zwijanie grup, kronika); stan, który dotyczy jednego ekranu, mieszka w jego komponencie. Rejestr ekranów to tabela w zwykłym TypeScripcie. Do pytania o jedno drzewo wraca się przy zadaniu o dokończeniu przejścia widoku na React, które przepisuje `app.ts`.
  - Not chosen:
    - b) jeden korzeń z portalami do dzisiejszych miejsc strony — daje wspólny kontekst Reacta, ale nie usuwa ręcznego przenoszenia panelu reguły (przy zmianie miejsca portalu React buduje zawartość od nowa i pole traci fokus), strona dalej jest budowana ręcznie; w praktyce przystanek w drodze do c).
    - c) jeden korzeń, sterownik jako komponent — samouczek dostaje kontekst za darmo i znikają dwie zasady życia ekranów, ale to ok. 800 linii do przepisania, 11 plików testów woła fabryki wprost, większe ryzyko zmiany widocznej dla gracza tuż przed ekranem Wiedzy, a pasek menu i karta konta w `app.ts` dalej są wyspami.
    - d) najpierw próba jednego drzewa na ekranie Programów (karta D12) — średnia robota agenta i rozmowa o wyniku, ekran Wiedzy czeka dłużej.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „1 a. Rekomendacja przekonuje: magazyn i stan przejścia przeżyją każdy wariant, a zmiana zdania kosztuje tylko rejestr ekranów.”
- 2. Które istniejące testy mają przejść bez żadnej zmiany?
  - Answer: a) wszystkie. Fabryki ekranów zachowują dzisiejsze wejście (`update(props)`, a ekran Przejścia także `setQuestion` i `setWindow`); rejestr odświeża istniejące ekrany jedną wspólną pętlą ze stanu gry i chwili zegara. Metody, którymi sterownik każe ekranowi Przejścia pokazać pytanie albo okno, zostają do zadania o dokończeniu przejścia widoku na React.
  - Not chosen:
    - b) bez zmian tylko 4 pliki testów wchodzące przez `createGameView`, a fabryki same zapisują się na magazyn i metody rozkazujące znikają — w tym samym zadaniu zmienia się 11 plików testów (`tests/view/run-screen.test.mjs` woła `setQuestion`/`setWindow` 21 razy), każdą zmianę recenzent musi uzasadnić wbrew regule „Changing an existing test” z `guidelines/testing.md`, a refaktor traci dowód z niezmienionych testów.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „2 a — niezmienione testy to najmocniejszy dowód, że gracz nic nie zauważy, a sprzątanie metod rozkazujących pasuje do zadania o dokończeniu przejścia na React.”

## Context

- Dokument przyjął w całości 2026-11-13 doradca dnia w imieniu Mariusza, który był wtedy poza komputerem: „Cały dokument przyjmuję w imieniu Mariusza, jeśli poza tym nic się w nim nie zmienia”; poza zamknięciem tabeli *Settlements to record* nic się po tym nie zmieniło.
- Wytyczne testów (`guidelines/testing.md`) i styleguide widoku (`guidelines/styleguide-browser-view.md`) przeczytano przy doprecyzowaniu tylko w części (nagłówki reguł i reguły o zmianie testu, testach na imitacji dokumentu i zakresie styleguide'u); orkiestrator cyklu czyta je w całości. Zadanie nie zmienia niczego, co widzi gracz, więc styleguide nie dał żadnej uwagi.
- Źródło zadania: notatka `the author's architecture note of loop2`, karty D22 (rozmowa o korzeniu), D4 (podział sterownika) i D12 (próba jednego drzewa, niepotrzebna po odpowiedzi na pytanie 1); badany tam stan to commit `7846213c`, numery linii w tym dokumencie są z `2b4d760c`.
- W grze jest 11 wywołań `createRoot` (`git grep "createRoot(" src/browser` na `2b4d760c`): osiem fabryk ekranów i paska działa w grze, `createRuleList`, `createRulePanel` i `createTripPlan` zostały po wcześniejszym układzie.
- Cztery pliki testów (8387 linii: `account-screen`, `chronicle-game`, `end-question`, `end-window-game` w `tests/view/`) wchodzą przez `createGameView`; jedenaście plików testów woła fabryki ekranów wprost.
- Wzór pamięci strony podawanej kilku wyspom i czytanej przez `useSyncExternalStore` stoi w kodzie: zwijanie grup (`createFolding`, `src/browser/view/program-panel.tsx:92-125`, D-295) i kronika (`createChronicle`, D-339).
- Dwa miejsca przenoszą element ręcznie, poza wiedzą Reacta: panel programu wkładany w ekran Przejścia (`src/browser/view/run-screen.tsx:152-158`) i panel reguły przenoszony w liście reguł, żeby jego pole i fokus przeżyły zmianę miejsca (`src/browser/view/rule-list.tsx`); oba zostają.
- Zadanie „drobne porządki kodu przed zadaniem 9 MVP2” (`_zadania/porzadki_przed_pierwsza_mapa_loop2.md`, gotowe do cyklu) zmienia nazwę `right-area` (także w `run-screen.tsx`) i przenosi pomocniki testów widoku do jednego pliku; równoległe cykle obu zadań spotkają się w tych plikach przy scaleniu.

## Questions carried to cycle

- Granice trzech modułów i podział akcji dziś zebranych w `panelControls`, `mapsControls` i fabrykach ekranów między magazyn, rejestr i stan ekranu przejścia — wybór cyklu; karta D4 zakłada, że cykl napisze do tego specyfikację.

## Human actions

none

## Decisions in play

- D-03: „The browser view is built in TypeScript with React, its screens written as `.tsx` components that draw from the game state, and no other UI framework stands in its code or its runtime dependencies.” — odpowiedź na pytanie 1 dopowiada, że ekrany zostają osobnymi korzeniami Reacta i gdzie mieszka stan widoku; brzmienia D-03 nie zmienia.
- D-04 (fragment): „The browser view draws the game only from the game state, the game's content data, the moment of the browser's clock, which it reads and passes to the simulation, and, for the scene and the chronicle, its previous reading of the game state and the events the simulation returned, and changes the game state only through functions of the simulation […]”
- D-207 (fragment): „The game saves the game state on the server by itself right after each change of it the player makes […], right after a manual map run ends in a completion or in the character's death, right after a reading of the clock or a catch-up whose result ended map runs of earning loops, with one save for that result […]”
- D-280 (fragment): „The game has the screens Siedziba, Postać, Mapy, Programy and Przejście, all of one content width under one menu bar […]”
- D-281 (fragment): „An address names a screen in the fragment after `#` […] and an address that leads to no existing screen silently opens the nearest one […]. The screen of a map run takes its map run as a parameter and reads no map run of the game state by itself.”
- D-283: „Leaving the screen of a manual map run pauses it as „Pauza” does.”
- D-284: „A return to the screen of a manual map run that waits in a pause leaves it in that pause until the player presses „Wznów”, whether or not it went on before the player left.”
- D-173 (fragment): „„Zakończ” and „Otwarte: {mapa} →”, a button of the end-of-run window (D-368), with no unsaved changes of the copy end the map run at once, and with unsaved changes […] they ask „Zapisać, odrzucić, wrócić?” […]; „Wróć” closes the question and leaves the map run as it was; where a button of the window asks, the window closes when the question stands and stays closed after „Wróć” […]”
- D-311 (fragment): „[…] it opens again at every entry on the screen of an ended map run, and it closes when the question „Zapisać, odrzucić, wrócić?” of D-173 stands. It opens of itself at the end of the map run once the scene's effect of the death or the completion has played, so that the effect is seen, and at once where the scene shows the last image of that effect at once (D-322) […]”
- D-322 (fragment): „In the three moments in which time stands still, a discovery, a death and a completion, the scene plays an effect once and then stands on its last image until the moment ends with „Wznów”, „Restart” or „Zakończ” […]”
- D-368 (fragment): „„✕” in the window and the key Escape pressed in it (D-370) close it and uncover the screen of the map run, whose header then holds „Koniec przejścia”, which opens it again, and the window opens again at every entry on the screen of an ended map run, after leaving by the menu bar and after a reload too.”
- D-295 (pamięć zwijania grup w stronie, wspólna dla dwóch paneli) i D-339 (kronika w pamięci strony): „The chronicle lives in the memory of the page and enters neither the game state nor the save […]” — wzór pamięci strony, który odpowiedź na pytanie 1 przyjmuje dla rzeczy wspólnych wielu ekranom.
- D-323 (fragment): „After an error that no code of the game handled […] the game state held in the page changes no more until the page is reloaded, and saving goes on as D-207, D-208 and D-97 give it […]”

## Settlements to record

Candidates: 6 shown, 3 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Widok zostaje przy osobnych korzeniach Reacta, po jednym na ekran albo pasek; stan gry mieszka w magazynie poza Reactem, stan ekranu przejścia w osobnym module poza Reactem, pamięć wspólna dla kilku ekranów w pamięci strony podawanej fabrykom i czytanej przez `useSyncExternalStore`, a stan jednego ekranu w jego komponencie; do pytania o jeden korzeń wraca zadanie o dokończeniu przejścia widoku na React. Wpis mówi „osobny korzeń Reacta”, nie „wyspa” (doradca dnia w imieniu Mariusza, 2026-11-13: „w decyzji 1 pisz „osobny korzeń Reacta” zamiast „wyspa””). | decision | pytanie 1 (sposoby niewybrane stoją pod nim) | czy ekran Wiedzy i podpowiedzi samouczka dostają wspólny kontekst Reacta, czy pamięć strony podaną fabrykom; gdzie ekran trzyma rozwinięte drzewa |
| 2 | Nowy ekran gry to jego moduł, jeden wpis w rejestrze ekranów, jego adres i pozycja na pasku menu, bez linii we wspólnych funkcjach sterownika widoku. | decision | Need, punkt 5; To do 2; linia zadania („żeby nowy ekran nie wymagał dopisków w siedmiu wspólnych miejscach”); przyjęte przez doradcę dnia w imieniu Mariusza, 2026-11-13 | czy cykl ekranu Wiedzy dopisuje gałęzie w funkcjach sterownika, czy tylko wpis w rejestrze |
| 3 | Akcja gracza, która zależy od upływu czasu, idzie przez magazyn stanu, który sam dolicza czas przed jej wykonaniem; nowa postać i zakup gałęzi czasu nie doliczają. | decision | Need, punkt 3; To do 1; przyjęte przez doradcę dnia w imieniu Mariusza, 2026-11-13 | czy nowa akcja sama woła `clock.flush()` przed wywołaniem symulacji, czy idzie przez magazyn |

## Out of scope

- `startApp` w `app.ts`, pasek menu i karta konta — należą do zadania o dokończeniu przejścia widoku na React.
- Instrukcje `switch` w `src/browser/view/screen-address.ts` — zostają; ich kompletności pilnuje kompilator.
- Próba jednego drzewa Reacta na ekranie Programów (karta D12).
- Ekran Wiedza — zadanie 22 MVP2.
