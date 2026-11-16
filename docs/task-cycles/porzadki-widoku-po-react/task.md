---
title: Porządki widoku po przejściu na React — ekran Przejścia odczytuje stan, przegląd tabel wzorców w wytycznych kodowania, podział arkusza stylów
status: draft
created: 2026-11-14
updated: 2026-11-16
tags: [zadanie]
related: "the author's project note of Loop"
---

# Porządki widoku po przejściu na React — ekran Przejścia odczytuje stan, przegląd tabel wzorców w wytycznych kodowania, podział arkusza stylów

Status: ready for cycle
Project relation: independent
Defect introduced by: none

## Description

### Need

- Ekran Przejścia dostaje pytanie „Zapisać, odrzucić, wrócić?” i okno końca przejścia od sterownika widoku przez metody `setQuestion` i `setWindow`, podczas gdy inne ekrany odświeżają się ze stanu; w widoku żyją więc dwa sposoby odświeżania ekranu.
- Tabele „Files of this kind” w `guidelines/coding-browser-module.md` i `guidelines/coding-simulation-module.md` mówią agentowi, który plik wolno brać za wzór (`copy`), a którego nie (`do not copy`); część statusów nie odpowiada stanowi kodu, a część nadały cykle zadań bez żadnego audytu, więc agent piszący nowy moduł weźmie za wzór plik, którego nikt nie ocenił.
- Arkusz `src/browser/styles.css` ma 95 283 bajty i 3307 linii; agent zmieniający jeden ekran czyta go w całości przy każdym kroku, a równoległe zadania o widoku spotykają się w nim przy scaleniu. Cel: agent zmieniający jeden ekran czyta plik swojego ekranu i wspólnych kontrolek zamiast całego arkusza.
- Wszystkie trzy porządkują widok po przejściu na React (`the author's task note on the move of the view to React`, loop2#141), z którego doprecyzowania zostały wydzielone; Mariusz połączył je 14.11.2026 w jedno zadanie: „wszystkie trzy porządkują widok po przejściu na React, czekają na to samo zadanie i są małe — jeden cykl zamiast trzech”.

### To do

1. Ekran Przejścia pokazuje pytanie „Zapisać, odrzucić, wrócić?” i okno końca przejścia według stanu ekranu Przejścia (`src/browser/view/run-screen-state.ts`), który sam odczytuje; metody `setQuestion` i `setWindow` znikają z granicy ekranu (typ `RunScreen` w `src/browser/view/run-screen.tsx`), a gracz widzi pytanie i okno w tych samych chwilach co dziś. Panel programu (`src/browser/view/program-panel.tsx`) też odczytuje pytanie z tego stanu i traci swoją metodę `setQuestion`; na ekranie Programy, który także używa panelu, pytania nie ma.
2. Tabele „Files of this kind” w `guidelines/coding-browser-module.md` i `guidelines/coding-simulation-module.md` mają wiersz dla każdego pliku swojego rodzaju, z siedmioma plikami widoku, które dziś wiersza nie mają, a każdy wiersz ma status z audytu tego doprecyzowania (pytanie 6); wzorce `src/browser/view/account-card.tsx` (D-36) i `src/browser/sim/game.ts` (D-35) zostają.
   - `guidelines/coding-browser-module.md`, pliki w `src/browser/view/`: `do not copy` mają `game-view.ts`, `headquarters-entry.ts`, `programs-entry.ts` i `rule-list.tsx`; każdy inny plik rodzaju ma `copy`. Zmiana względem tabeli na `e125db89`: `app.ts`, `body-row.ts`, `combat-line.ts`, `email-confirmation.ts`, `game-saver.ts`, `program-editor.ts`, `status-row.ts`, `tile-list.ts`, `trip-editor.ts`, `trip-lines.ts` przechodzą z `do not copy` na `copy`; `rule-list.tsx` z `copy` na `do not copy`; nowe wiersze `copy` dostają `camp-picture.ts`, `camp.tsx`, `end-question.tsx`, `header-rows.tsx`, `page-sentences.tsx`, `previous-save-lines.ts`, `waiting-screen.tsx`.
   - `guidelines/coding-simulation-module.md`, pliki w `src/browser/sim/`: `do not copy` mają `loop.ts` i `skills.ts`, każdy inny plik rodzaju `copy` — bez zmiany względem tabeli.
   - Miejsca, które dają `do not copy` (stan na `e125db89`):
     - `game-view.ts:178` — `document.createElement("div")` pojemnika `game-view`; reguła „Nowy ekran i moduły w DOM” pozwala budować przez API DOM tylko nagłówek i blok główny strony oraz host korzenia przez jego fabrykę.
     - `headquarters-entry.ts:50` i `programs-entry.ts:317` — wejście ekranu buduje przez API DOM ramkę `section.screen` z klasą i `tabIndex`; ta sama reguła i reguła „TypeScript i DOM”: „Żaden ekran nie powstaje przez API DOM”.
     - `rule-list.tsx:220-227` — komponent tworzy `div` przez `document.createElement` i przenosi go przez `appendChild` (miejsce panelu reguły, przyjęte w uzasadnieniu D-407); ta sama reguła.
     - `loop.ts:107-127` (`startLoop`) i `skills.ts:176-181` (`buyBranch`) — mapa, postać, program albo gałąź, których nie ma, dają niezmieniony stan bez zdarzeń, jak zwykła odmowa, gdy wzorzec `game.ts` w `send` rzuca błąd; reguła „Hiding a failure” w `guidelines/coding.md`: „Awarii nie zamieniaj ani w odpowiedź „wszystko w porządku”, ani w pustą listę.”
3. Arkusz `src/browser/styles.css` jest podzielony na pliki `.css` leżące wprost w `src/browser/`, każdy podawany graczowi osobnym znacznikiem `<link>` w `src/browser/index.html`, bez zmiany budowania; gracz widzi każdy ekran tak jak przed podziałem. W `styles.css` zostaje to, co wspólne — reguły podstawowe, reguła `:focus-visible`, pasek menu, wiersze zdań, wspólne kontrolki i reguły tego, co rysuje strona wzorcowa kontrolek (`terrain-drawing`, `tile-list`, `form`, `account-menu-block` w `src/browser/kitchen-sink/kitchen-sink.tsx`); reguły każdego ekranu idą do pliku tego ekranu, a reguły panelu programu, którego używają Programy i Przejście, do własnego pliku.
4. Komentarz w `src/browser/view/email-status.ts`, który mówi, że strona wzorcowa kontrolek „reaches no React file”, mówi to, co jest prawdą od zadania przejścia na React (reguła „Strona wszystkich stanów z Reactem” w `guidelines/coding-browser-module.md`).
5. Styleguide widoku (`guidelines/styleguide-browser-view.md`) mówi, że własny plik arkusza i własny znacznik `<link>` ma każdy ekran i każda część, której używa kilka ekranów, a nowy ekran dodaje oba; reguła stoi w styleguide, bo tam D-28 stawia reguły arkuszy widoku, a osobnych wytycznych arkuszy D-28 nie dopuszcza.
6. Miejsca, które nazywają `styles.css` jako miejsce wyglądu ekranu — styleguide widoku, `src/browser/AGENTS.md`, komentarze w kodzie i testy, które czytają prawdziwy arkusz — wskazują plik, w którym ta reguła stoi po podziale.
7. Przykład zgodności w *Verification* D-407 (`foundations/decisions.md`) — „a new screen … whose factory receives … the memory of its unfolded trees, shared with another screen” — opisuje kształt, którego ekran Wiedza nie przyjął (jego otwarte drzewa żyją w komponencie, jak wymaga ostatnia klauzula D-407 i D-416); przykład pokazuje kształt, który D-407 dopuszcza, bez sprzeczności z ekranem Wiedza. Źródło: https://github.com/mariusznazar/loop2/pull/143, „Findings outside the task's scope” 2 (dopisane przez doradcę dnia 2026-11-16).
8. Zdanie wiążące D-43, które wylicza, gdzie ikona bez tekstu obok bierze `text-strong` (odznaka, latająca ikona, rysunek mapy), obejmuje też tabliczkę odkrycia na scenie, albo mówi wprost, czemu jej nie obejmuje — według tego, co dziś robi arkusz. Źródło: https://github.com/mariusznazar/loop2/pull/143, „Findings outside the task's scope” 1 (dopisane przez doradcę dnia 2026-11-16).

### Questions to settle

- 1. Jak szeroki jest audyt statusów w tabelach plików i kiedy się odbywa?
  - Answer: a) tylko dwie tabele, `guidelines/coding-browser-module.md` i `guidelines/coding-simulation-module.md`: każdy plik rodzaju porównany w tym doprecyzowaniu z regułami wytycznych swojego rodzaju, `do not copy` z miejscem, które łamie regułę, `copy` dla każdego innego; bez próbnego uruchomienia linterów i bez innych rodzajów.
  - Not chosen:
    - b) pełne odświeżenie wytycznych kodowania przez skill — próbne uruchomienie linterów i audyt wszystkich 12 rodzajów, także serwerowych; kilka razy więcej pracy i zachodzi na zadanie `the author's task note on the structure of the code from the foundation review` (reguła rozmiaru).
    - c) audyt w cyklu — szybsze doprecyzowanie, ale cykl musi stanąć i pokazać statusy przy zablokowanym PR; dodatkowa runda w gorszym miejscu.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a”.
- 2. Co zostaje w `src/browser/styles.css` po podziale?
  - Answer: a) `styles.css` zostaje plikiem wspólnym — reguły podstawowe, reguła `:focus-visible`, pasek menu, wiersze zdań i wspólne kontrolki; reguły każdego ekranu idą do pliku tego ekranu; D-265, D-47 i niezmiennik `browser-view-focus-outline` zostają prawdziwe bez zmian, a strona wzorcowa kontrolek ładuje dalej tylko `styles.css`.
  - Not chosen:
    - b) `styles.css` znika, w jego miejsce np. `base.css`, `controls.css` i pliki ekranów — czytelniejsze nazwy, ale zmiana D-265, niezmiennika i strony wzorcowej.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „2 a”.
- 3. Czy nowy ekran dostaje własny plik arkusza jako stała reguła?
  - Answer: a) tak — każdy ekran ma swój plik arkusza i swój `<link>`, a nowy ekran dodaje oba; reguła staje w wytycznych i w fundamencie.
  - Not chosen:
    - b) nie, podział jednorazowy — style ekranu Wiedza i następnych trafią, gdzie agentowi wygodnie, i wspólny plik znów rośnie.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „3 a”.
- 4. Czy panel programu traci swoją metodę `setQuestion` razem z ekranem Przejścia?
  - Answer: a) tak — panel sam odczytuje pytanie ze stanu ekranu Przejścia, jak ekran; na ekranie Programy pytania po prostu nie ma.
  - Not chosen:
    - b) nie, znikają tylko metody ekranu — ekran wołałby panel z efektu, wbrew zasadzie z `run-screen.tsx` („never from render or an effect”), albo zostaje połowa starego sposobu.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „4 a”.
- 5. Kiedy rusza cykl, skoro podział arkusza wymaga okna bez zadań o wyglądzie w toku?
  - Answer: a) linia zadania dostaje zależność `⛔ plan-mvp2-loop2-ekran-wiedzy`; pozostałe zadania w toku sprawdza się przy starcie cyklu. Ekran Wiedza nie jest jeszcze w cyklu — jest następny w kolejce Loop po skillu grafiki sceny.
  - Not chosen:
    - b) bez zależności, konflikty w arkuszu rozwiązywane przy scaleniu — ryzyko, że zmiana wyglądu Wiedzy zginie w konflikcie, czego żaden test nie wychwyci.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „5 a. Do 5: ekran Wiedza nie jest jeszcze w cyklu — jest następny w kolejce Loop po skillu grafiki sceny; zależność ⛔ od niego zostaje słuszna.”
- 6. Czy przyjąć statusy z audytu obu tabel, zapisane w punkcie 2 „To do”?
  - Answer: a) tak, w całości; `game-view.ts` zostaje `do not copy`, bo reguła pozwala budować przez API DOM tylko nagłówek i blok główny strony oraz host korzenia, a pojemnik ekranów żadnym z nich nie jest.
  - Not chosen:
    - b) tak, ale `game-view.ts` dostaje `copy`, czytając pojemnik jako część strony — zmienia regułę bez decyzji.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a” (na pytanie o listę statusów); audyt: trzy agenci porównali pliki z regułami, każde miejsce `do not copy` sprawdzone w kodzie na `e125db89`.
- 7. Czy zadanie poprawia nieprawdziwy komentarz w `src/browser/view/email-status.ts`?
  - Answer: a) tak, jako punkt „To do” — jedna linia, a zadanie i tak dotyka tabeli tego rodzaju plików.
  - Not chosen:
    - b) nie, do zbiorczych poprawek brzmienia `the author's task note on wording fixes of the foundation`.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „2 a”.
- 8. Gdzie idą reguły panelu programu, którego używają dwa ekrany, Programy i Przejście (od „The program panel's list „Program:”” w `src/browser/styles.css`, ok. linii 776, przez kilkaset linii)?
  - Answer: a) własny plik arkusza panelu programu, z własnym znacznikiem `<link>`; reguła z pytania 3 brzmi: „własny plik arkusza ma każdy ekran i każda część, której używa kilka ekranów”.
  - Not chosen:
    - b) zostaje w `styles.css` — wspólny plik zostaje duży, a kto zmienia ekran Przejścia albo Programy, czyta te kilkaset linii.
    - c) w pliku ekranu Programy — ekran Przejścia zależy od cudzego pliku i zmienia wygląd przy zmianie Programów.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a … Do 1: reguła z odpowiedzi 3 w brzmieniu „własny plik arkusza ma każdy ekran i każda część, której używa kilka ekranów”.”
- 9. Co z regułami, które rysuje strona wzorcowa kontrolek, a które nie są wspólnymi kontrolkami — rysunek mapy (`terrain-drawing`), tabela pól (`tile-list`), formularz (`form`), blok menu konta (`account-menu-block`), użyte w `src/browser/kitchen-sink/kitchen-sink.tsx`?
  - Answer: a) zostają w `styles.css`; strona wzorcowa kontrolek ładuje dalej tylko `styles.css` i `kitchen-sink.css`.
  - Not chosen:
    - b) idą do plików ekranów, a strona wzorcowa dostaje dodatkowe `<link>` — mniejszy plik wspólny, ale zmiana odpowiedzi 2 i zależność strony od plików ekranów.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „2 a”.
- Jakie statusy dostają pliki w tabeli „Files of this kind” — siedem plików, które nie budują już elementów strony, pliki dodane przez cykle ze statusem `copy` bez audytu i pliki, które doda zadanie przejścia na React? (pytanie 4 doprecyzowania `the author's task note on the move of the view to React`)
  - Answer: a) zadanie przejścia na React tylko usuwa wiersze skasowanych plików i poprawia reguły; pliki, które doda, nie dostają wiersza, jak reguła mówi o pliku dodanym po ostatnim audycie tabeli. Statusy siedmiu plików i `copy` nadane bez audytu rozstrzyga osobne zadanie: audyt tabeli przez `the-way-maintain-coding-guidelines`.
  - Not chosen:
    - b) audyt tabeli w zadaniu przejścia na React — przegląd ok. 60 wierszy w już dużym zadaniu.
    - c) siedem plików dostaje teraz `copy`, reszta zostaje — najtaniej, ale utrwala praktykę statusów nadawanych bez audytu, którą wytknęła grupa G-2.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „4 a”.
- Czy podział arkusza stylów zostaje w zadaniu przejścia na React? (pytanie 5 tamtego doprecyzowania)
  - Answer: b) nie — podział arkusza idzie osobnym zadaniem, wykonanym po tamtym, w oknie bez zadań o wyglądzie, wariantem z karty D6 (a): kilka plików `.css` wprost w `src/browser/` i osobne znaczniki `<link>`, bez zmiany budowania.
  - Not chosen:
    - a) jedno zadanie, jak w linii — osiem punktów w dwóch częściach repo; cały cykl czeka na okno bez zadań o wyglądzie (33 z 47 scaleń zmieniało arkusz) i przez cały czas koliduje z każdą zmianą widoku.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „5 b”.
- Co z metodami, którymi sterownik każe ekranowi Przejścia pokazać pytanie albo okno (`setQuestion`, `setWindow`)? (pytanie 6 tamtego doprecyzowania; zadanie podziału sterownika `the author's task note on splitting the view's driver`, odpowiedź na pytanie 2: „Metody, którymi sterownik każe ekranowi Przejścia pokazać pytanie albo okno, zostają do zadania o dokończeniu przejścia widoku na React.”)
  - Answer: b) osobne zadanie, po scaleniu podziału sterownika widoku; zadanie przejścia na React ich nie zmienia.
  - Not chosen:
    - a) usunięcie ich w zadaniu przejścia na React, ekran sam czyta stan z magazynu — zmiana 4 plików z ich wywołaniami (22 w `tests/view/run-screen.test.mjs`), każda z uzasadnieniem wobec reguły zmiany testu; zadanie rośnie dalej.
    - c) zostają na stałe, a obietnica z zadania podziału jest skreślona — nic nie kosztuje, ale ekran Przejścia zostaje wyjątkiem wśród ekranów.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „6 b”.

## Context

- Liczby i miejsca w tym dokumencie są z `e125db89` (scalenie loop2#141); wcześniejsze wersje sekcji podawały stan z `fc00c406`.
- Linie z `setQuestion` albo `setWindow`: `src/browser/view/run-screen.tsx` 10, `src/browser/view/run-entry.ts` 5, `src/browser/view/program-panel.tsx` 3, `tests/view/run-screen.test.mjs` 22.
- `src/browser/view/run-entry.ts` po każdej zmianie stanu ekranu Przejścia woła `runScreen.setQuestion(...)` albo `runScreen.setWindow(screenState.windowShown())`; ekran przekazuje pytanie dalej do panelu programu przez `panel.setQuestion(...)`, a panel programu ma też drugiego odbiorcę, ekran Programy (`src/browser/view/programs-entry.ts`).
- Zmiana wywołań w `tests/view/run-screen.test.mjs` podlega regule „Changing an existing test” w `guidelines/testing.md`: przyczyną jest zmiana granicy ekranu, którą cykl wskazuje.
- Pliki widoku bez wiersza w tabeli: `camp-picture.ts`, `camp.tsx`, `end-question.tsx`, `header-rows.tsx`, `page-sentences.tsx`, `previous-save-lines.ts`, `waiting-screen.tsx` w `src/browser/view/`; każdy plik symulacji ma wiersz.
- Siedem plików `do not copy`, które według karty D24 w `the author's architecture note of loop2` nie budują już elementów strony przez API DOM — `body-row.ts`, `combat-line.ts`, `status-row.ts`, `tile-list.ts`, `trip-editor.ts`, `trip-lines.ts`, `program-editor.ts` — nie zawiera na `e125db89` ani `createElement`, ani `appendChild`.
- Przykładowe wiersze `copy` dopisane przez cykle bez audytu: `last-resort.ts`, `headquarters.tsx`, `map-lines.ts`, `maps-screen.tsx`, `team-lines.ts`, `away-report.ts` w `guidelines/coding-browser-module.md` i `src/browser/sim/map-card.ts` w `guidelines/coding-simulation-module.md`; `away-report.ts` zmieniło `do not copy` na `copy` (uwagi z próśb loop2#62-8 i loop2#64-3, grupa G-2 przeglądu fundamentu `the author's note of the foundation review of 2026-11-13`).
- Reguła „Nowy ekran i moduły w DOM” w `guidelines/coding-browser-module.md` mówi: „Plik dodany po ostatnim audycie tabeli nie ma w niej wiersza i też nie jest wzorem.”
- `scripts/static-files.mjs` kopiuje do wyniku obu budowań każdy plik `.css` leżący wprost w `src/browser/`, więc nowe pliki arkusza w tym katalogu nie wymagają zmiany budowania; podkatalog by jej wymagał.
- `src/browser/index.html` ładuje `/tokens.css` i `/styles.css`; strona wzorcowa kontrolek (`src/browser/kitchen-sink/index.html`) ładuje `/tokens.css`, `/styles.css` i `/kitchen-sink.css`.
- Arkusz `styles.css` nazywają z nazwy: `guidelines/styleguide-browser-view.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, oba `index.html`, `src/browser/kitchen-sink/kitchen-sink.css` i `kitchen-sink.tsx`, `accounts-screen.tsx`, `rule-panel.tsx`, pięć plików `react-*.tsx` kontrolek; testy `tests/view/scene.test.mjs`, `world-area.test.mjs`, `run-header.test.mjs`, `rule-signs.test.mjs` czytają go jako prawdziwy arkusz, `tests/view/shared-controls.test.mjs` wspomina go w komentarzu.
- Niezmiennik `browser-view-focus-outline` (`foundations/invariants.md`) mówi o arkuszach części w liczbie mnogiej, ale wymaga, żeby to `src/browser/styles.css` miał regułę `:focus-visible`; jego test (`tests/invariants/test_browser_view_focus_outline.py`) już sprawdza każdy plik `.css` wprost w `src/browser/`.
- Od 47 scaleń dotykających `src/` 33 zmieniało arkusz (karta D6 w `the author's architecture note of loop2`, stan z `7846213c`).

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- D-407 (`foundations/decisions.md`, sekcja „Browser view: screens, navigation and their code”): „The game state lives in a store outside React and the state of the screen Przejście, which is the question „Zapisać, odrzucić, wrócić?” and the end-of-run window, in a module of its own outside React; memory several screens share is a memory of the page, given to the factories of the screens and read through `useSyncExternalStore`, and the state of one screen lives in the component of that screen.” Zadanie dopisuje do niej zdanie z wiersza 3 *Settlements to record*; jej *Verification* („which draws each only while the game view tells it to”) przestaje wtedy być prawdą i zmienia się razem z tym zdaniem.
- D-408 (ta sama sekcja): „A new screen of the game is added as a module of its own, one entry in the registry of screens, its address and its position on the menu bar.” Zadanie dopisuje do niej zdanie z wiersza 2 *Settlements to record*.
- D-265: „Each shared control in `src/browser/view/controls/` has one form, a React component, and `src/browser/styles.css` stays the one place of the look of the controls.”
- D-47: „One `:focus-visible` rule of the game's stylesheet draws the focus of every control from the role `focus`, and no other style or code of the part browser-view sets `outline` or an `outline-*` property, except that the kitchen-sink page's stylesheet repeats that rule with one more selector, for its sample of the focused state.”
- D-36: „The exemplar for kind `browser-module` is `src/browser/view/account-card.tsx`, the first screen built with React, and its kind guidelines are read before adding or changing a file of that kind.”
- D-35: „The exemplar for kind `simulation-module` is `src/browser/sim/game.ts`, and its kind guidelines are read before adding or changing a file of that kind.”
- D-28: „Loop2 adopts the coding-guideline templates of its pinned the-way, while deferring automatic formatting of Python and Bash and separate exemplars for building, deployment, entry points, HTML and CSS; …”; z jego uzasadnienia: „The rules of the browser view's stylesheets that a cheap test keeps already stand in its styleguide, so a kind of their own would add no rule”, a jako naruszenie podaje „a stylesheet exemplar or guidelines of their own for stylesheets”.

## Settlements to record

Candidates: 7 shown, 3 accepted — 2026-11-16

| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | `styles.css` zostaje plikiem wspólnym — reguły podstawowe, reguła `:focus-visible`, pasek menu, wiersze zdań, wspólne kontrolki i to, co rysuje strona wzorcowa kontrolek — a własny plik arkusza ma każdy ekran i każda część, której używa kilka ekranów: plik `.css` wprost w `src/browser/`, podawany graczowi osobnym znacznikiem `<link>`, bez zmiany budowania. | decision | pytania 2, 8 i 9 (ich *Not chosen*) i pytanie 5 doprecyzowania przejścia na React, przeniesione wyżej (wariant D6 a, jego *Not chosen*) | czy `styles.css` zniknąć i rozdzielić na `base.css` i `controls.css`, czy pliki ekranów włożyć do podkatalogu ze zmianą budowania |
| 2 | Nowy ekran gry dodaje też swój plik arkusza i swój znacznik `<link>`. | sentence of D-408 | pytanie 3 (jego *Not chosen*) | czy style nowego ekranu (pierwszy: Wiedza) dopisać do `styles.css` albo do pliku innego ekranu |
| 3 | Ekran Przejścia i jego panel programu odczytują pytanie „Zapisać, odrzucić, wrócić?” i okno końca przejścia ze stanu ekranu Przejścia; sterownik widoku nie każe im ich pokazać żadną metodą. | sentence of D-407 | pytanie 4 (jego *Not chosen*) i pytanie 6 doprecyzowania przejścia na React, przeniesione wyżej (wariant c „zostają na stałe”, odrzucony) | czy nową rzecz pokazywaną na ekranie Przejścia dodać kolejną metodą `set…` wołaną ze sterownika |

## Out of scope

- Metody fokusu ekranu Przejścia (`focus`, `focusQuestion`, `focusWindow`, `focusHeaderButton`) zostają: fokus przenosi obsługa zdarzenia.
- `src/browser/tokens.css` i `src/browser/kitchen-sink/kitchen-sink.css` nie dzielą się.
