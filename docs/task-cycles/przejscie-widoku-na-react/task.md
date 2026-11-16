---
title: "loop2: dokończyć przejście widoku na React"
status: draft
created: 2026-11-13
updated: 2026-11-13
tags: [zadanie]
related: "the project's note in the author's notes"
---

# loop2: dokończyć przejście widoku na React

Status: ready for cycle
Project relation: independent

## Description

### Need

- Widok gry ma dwa sposoby budowania strony naraz: ekrany gry są komponentami Reacta, a strona startowa w `src/browser/view/app.ts` (nagłówek, ekran sprawdzania sesji, zdania strony, wiersz awarii), wiersz zapisu w `src/browser/view/game-saver.ts` i zdanie potwierdzenia adresu w `src/browser/view/email-confirmation.ts` budują elementy przez API DOM.
- Dlatego każda wspólna kontrolka ma dwie postaci w `src/browser/view/controls/` (D-265): nowy atrybut pisze się dwa razy, a test `tests/view/react-controls.test.mjs` (1280 linii) pilnuje, by obie się zgadzały.
- Postaci DOM `number-field.ts`, `pick-cell.ts` i `select-list.ts` (poza typem) żyją już tylko dla strony wzorcowej kontrolek (`npm run kitchen-sink`), bo D-269 każe jej pokazywać kontrolki w postaci DOM — strona pokazuje więc kontrolki, których gracz nie dostaje.
- Stan strony w `startApp` to kilkanaście osobnych zmiennych, więc da się zapisać kombinację flag, która nie odpowiada żadnemu stanowi strony.
- Cel z linii zadania: wspólnej kontrolki nie pisać dwa razy; podział arkusza stylów, drugą połowę linii, niesie osobne zadanie (pytanie 5).

### To do

1. Strona wzorcowa kontrolek (`npm run kitchen-sink`) jest składana w paczkę tak jak gra i pokazuje każdą wspólną kontrolkę w postaci Reacta, tej, którą dostaje gracz, w tych samych stanach co dziś (pytanie 1).
2. Strona startowa z `app.ts` — nagłówek, ekran sprawdzania sesji („Sprawdzanie logowania…”, „Potwierdzanie adresu…”, ostrzeżenie z „Spróbuj ponownie”), zdania strony nad grą i w karcie, wiersz awarii — oraz wiersz zapisu z `game-saver.ts` i zdanie potwierdzenia adresu z `email-confirmation.ts` są rysowane w React, w osobnych korzeniach Reacta (pytanie 2); gracz widzi te same teksty, role, miejsca i fokus co dziś.
3. Stan strony w `startApp` — sprawdzanie sesji, karta, gra, wylogowywanie — jest jedną wartością z danymi właściwymi dla stanu; wartości, które mają przeżyć przejście między stanami (dziś `pendingNotice`, `pendingMessage`, `kept`, `entry`, `afterConflict`, `latest`, `failed`, `failureLine`), mogą zostać osobno.
4. Po błędzie, którego nie obsłużył żaden kod gry, ekran oczekiwania po zalogowaniu pokazuje samo zdanie „Coś w grze się zepsuło — odśwież stronę.”, bez „Sprawdzanie logowania…” (loop2#62-5).
5. Postaci DOM wspólnych kontrolek (`button.ts`, `text-field.ts`, `number-field.ts`, `pick-cell.ts`, `select-list.ts` w `src/browser/view/controls/`) i test porównujący `tests/view/react-controls.test.mjs` znikają; typ, który ekrany Reacta biorą dziś z `select-list.ts`, zostaje im dostępny.
6. Panel stawiany w miejscu karty logowania zdjętej przez React (`createFailureCard` w `src/browser/view/account-card.tsx`) dalej powstaje poza Reactem, a znacznik, klasy i rolę zdania ostrzeżenia bierze z jednej stałej, którą czyta też komponent Reacta tego zdania (pytanie 3, loop2#62-7).
7. Dwie asercje `tests/view/uncaught-failure.test.mjs` — liczba żywych timerów i to, że wersja deweloperska Reacta woła `console.warn` dokładnie raz — sprawdzają wymagane zachowanie zamiast szczegółu wykonania (loop2#62-10).
8. Wytyczne idą za zmianą: w `guidelines/coding-browser-module.md` reguły „Wspólna kontrolka w dwóch postaciach”, „Nowy ekran i moduły w DOM” i „Strona wszystkich stanów bez Reacta” oraz przykłady „Kontrolki w DOM i ich aktualizacja” i „Gra na stronie i odpowiedzi serwera” opisują stan po zmianie; w tabeli „Files of this kind” znikają wiersze skasowanych plików, a pliki dodane przez to zadanie nie dostają wiersza (pytanie 4); w `guidelines/styleguide-browser-view.md` reguła „The kitchen-sink page” mówi o postaci Reacta.

### Questions to settle

- 1. Czy strona wzorcowa kontrolek ma być składana w paczkę jak gra i pokazywać kontrolki w postaci Reacta (zmiana D-269 i D-265)?
  - Answer: a) tak. `scripts/kitchen-sink.mjs` składa paczkę tak jak gra, a strona rysuje każdą wspólną kontrolkę w postaci Reacta; powód, dla którego D-269 odrzuciło ten wariant („a second bundle and a second set of samples for nothing the comparison of the two forms leaves open”), znika razem z testem porównującym, a bez zmiany strona pokazywałaby postać, której gracz nie dostaje. Granica serwera podglądu się nie zmienia (D-76).
  - Not chosen:
    - b) strona bez Reacta, a do D-265 dopisany tylko powód, dla którego postaci DOM żyją (nota F-17, wariant a) — dziś nic nie kosztuje, ale każda nowa kontrolka i każdy nowy atrybut powstaje dwa razy, test porównujący (1280 linii) zostaje i połowa celu zadania odpada.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „1 a”.
- 2. Czy strona startowa po przejściu na React ma osobne korzenie Reacta, czy jeden? (Pytanie przekazane przez zadanie podziału sterownika widoku, `_zadania/podzial_sterownika_widoku_loop2.md`, odpowiedź na pytanie 1: „Do pytania o jedno drzewo wraca się przy zadaniu o dokończeniu przejścia widoku na React, które przepisuje `app.ts`.”)
  - Answer: a) osobne korzenie Reacta — nagłówek, ekran oczekiwania i wiersze zdań mają własne korzenie, tym samym kształtem, który zadanie podziału sterownika przyjęło dla ekranów gry; błąd w jednym korzeniu nie zdejmuje reszty strony.
  - Not chosen:
    - b) jeden korzeń na szkielet strony (nagłówek, oczekiwanie, karta), ekrany gry osobno — wspólny kontekst Reacta dla szkieletu, ale błąd rysowania zdejmuje cały szkielet z wierszem awarii, więc zdanie o awarii (D-323) trzeba trzymać poza nim; dwa kształty w jednym widoku.
    - c) jeden korzeń na cały widok, sterownik gry jako komponent — odwraca decyzję podjętą tego samego dnia w zadaniu podziału sterownika; ok. 800 linii sterownika do przepisania, 11 plików testów woła fabryki ekranów wprost.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „2 a”.
- 3. Skąd panel w miejscu zdjętej karty bierze zdanie ostrzeżenia, gdy postaci DOM kontrolek znikną, a D-323 każe mu stać „outside React”?
  - Answer: b) panel dalej powstaje ręcznie poza Reactem, a znacznik, klasy i rolę zdania ostrzeżenia bierze z jednej stałej, którą czyta też komponent Reacta tego zdania; to wariant, który D-265 odrzuciło jako „a shared function of class names under both forms”, z powodem „it changes the DOM controls for what the comparison already catches” — porównania po tym zadaniu już nie ma. D-323 się nie zmienia.
  - Not chosen:
    - a) zostaje jedna mała funkcja DOM zdania ostrzeżenia i test porównujący tylko dla niej — „dwie postaci” zostają dla jednej kontrolki, D-265 zawęża się zamiast znikać.
    - c) panel rysuje nowy, osobny korzeń Reacta — zmienia D-323 z „outside React” na „poza korzeniem, który upadł”; ryzyko (hipoteza): przy błędzie w samym Reakcie panel też nie wstanie.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „3 b”.
- 4. Jakie statusy dostają pliki w tabeli „Files of this kind” — siedem plików, które nie budują już elementów strony (karta D24), pliki dodane przez cykle ze statusem `copy` bez audytu (loop2#62-8, loop2#64-3) i pliki, które doda to zadanie?
  - Answer: a) to zadanie tylko usuwa wiersze skasowanych plików i poprawia reguły; pliki, które doda, nie dostają wiersza, jak reguła mówi o pliku dodanym po ostatnim audycie tabeli. Statusy siedmiu plików i `copy` nadane bez audytu rozstrzyga osobne zadanie: audyt tabeli przez `the-way-maintain-coding-guidelines`.
  - Not chosen:
    - b) audyt tabeli w tym zadaniu — przegląd ok. 60 wierszy w już dużym zadaniu.
    - c) siedem plików dostaje teraz `copy`, reszta zostaje — najtaniej, ale utrwala praktykę statusów nadawanych bez audytu, którą wytknęła grupa G-2.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „4 a”.
- 5. Czy podział arkusza stylów zostaje w tym zadaniu?
  - Answer: b) nie — podział arkusza idzie osobnym zadaniem, wykonanym po tym, w oknie bez zadań o wyglądzie, wariantem z karty D6 (a): kilka plików `.css` wprost w `src/browser/` i osobne znaczniki `<link>`, bez zmiany budowania.
  - Not chosen:
    - a) jedno zadanie, jak w linii — osiem punktów w dwóch częściach repo; cały cykl czeka na okno bez zadań o wyglądzie (33 z 47 scaleń zmieniało arkusz) i przez cały czas koliduje z każdą zmianą widoku.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „5 b”.
- 6. Co z metodami, którymi sterownik każe ekranowi Przejścia pokazać pytanie albo okno (`setQuestion`, `setWindow`)? (Zadanie podziału sterownika, odpowiedź na pytanie 2: „Metody, którymi sterownik każe ekranowi Przejścia pokazać pytanie albo okno, zostają do zadania o dokończeniu przejścia widoku na React.”)
  - Answer: b) osobne zadanie, po scaleniu podziału sterownika widoku; to zadanie ich nie zmienia.
  - Not chosen:
    - a) usunięcie ich w tym zadaniu, ekran sam czyta stan z magazynu — zmiana 4 plików z ich wywołaniami (22 w `tests/view/run-screen.test.mjs`), każda z uzasadnieniem wobec reguły zmiany testu; zadanie rośnie dalej.
    - c) zostają na stałe, a obietnica z zadania podziału jest skreślona — nic nie kosztuje, ale ekran Przejścia zostaje wyjątkiem wśród ekranów.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „6 b”.

## Context

- Dokument przyjął z góry 2026-11-13 doradca dnia w imieniu Mariusza: „Dokument przyjmuję z góry: jeśli nic nowego nie wyjdzie — zapisz, oznacz gotowy do cyklu i zakończ.”; po odpowiedziach na pytania 1–6 nie wyszedł żaden wiersz ustaleń czekający na decyzję.
- Źródło zadania: notatka `the author's architecture note of the product`, karty D5 (zamknąć przejście na React), D13 (stan „gra stoi” jako jedna wartość), D24 (tabela plików w wytycznych) i D6 (podział arkusza, wariant a); badany tam stan to commit `7846213c`, liczby w tym dokumencie są z `fc00c406`.
- Przegląd fundamentu z 2026-11-13 (`the author's note of the foundation review`) dał temu zadaniu notę F-17 (D-265: formy DOM żyją tylko dla strony wzorcowej, bo D-269 każe jej pokazywać postać DOM) i grupę G-2 (cztery wiersze, pięć uwag z próśb: loop2#62-5, #62-7, #62-10, #62-8 z #64-3). Uwaga loop2#62-4 (`game-saver.ts`, zapis staje na stałe po wyjątku) przeszła do F-26 i nie należy do tego zadania.
- Zadanie podziału sterownika widoku (`_zadania/podzial_sterownika_widoku_loop2.md`, linia w toku) zostawiło temu zadaniu `startApp` w `app.ts`, pasek menu i kartę konta, pytanie o jeden korzeń Reacta i metody `setQuestion`/`setWindow`; oba zmieniają `guidelines/coding-browser-module.md`.
- Ze wspólnych kontrolek w postaci DOM korzystają dziś: `app.ts` (`createButton`, `setButtonWaiting`, `createFormWarning`), `game-saver.ts` (`createFormWarning`), strona wzorcowa (`number-field.ts`, `pick-cell.ts`, `select-list.ts` i inne) i test porównujący; `program-panel.tsx` i `trip-plan.tsx` biorą z `select-list.ts` tylko typ. Postaci DOM to razem 385 linii.
- `scripts/kitchen-sink.mjs` kompiluje moduły strony wzorcowej po jednym (`tsc -p tsconfig.kitchen-sink.json`) i nie składa paczki; gra składa paczkę przez esbuild w `scripts/build.mjs`. Moduł strony, `src/browser/kitchen-sink/kitchen-sink.ts`, ma 835 linii.
- D-76: „a change of how the kitchen-sink page is built does not change the boundary of the preview server” — przebudowa składania strony nie wymaga testu odmowy serwera podglądu, przegląd zostaje.
- Nowe zadania wydzielone przy doprecyzowaniu: podział arkusza stylów (`loop2: podzielić arkusz stylów na pliki ekranów`, pytanie 5), metody `setQuestion`/`setWindow` (`loop2: zastąpić metody setQuestion i setWindow ekranu Przejścia odczytem stanu`, pytanie 6) i audyt statusów w tabeli plików (`loop2: audyt statusów w tabelach plików wytycznych kodowania`, pytanie 4).
- Zadanie czeka na scalenie podziału sterownika widoku (zależność w linii zadania): oba zmieniają `guidelines/coding-browser-module.md`, a tamto przekazuje temu `app.ts`.
- Wytyczne testów (`guidelines/testing.md`) i styleguide widoku (`guidelines/styleguide-browser-view.md`) przeczytano przy doprecyzowaniu w części (reguły o zmianie testu, o zachowaniu zamiast wykonania, o granicach zaufania, regułę strony wzorcowej i miejsca, które nazywają arkusz); orkiestrator cyklu czyta je w całości.

## Questions carried to cycle

- Gdzie stoi zdanie „Coś w grze się zepsuło — odśwież stronę.” po przejściu strony startowej na React, tak żeby błąd w którymkolwiek korzeniu Reacta go nie zdjął — D-323 ustala, gdzie gracz je widzi; sposób zostaje cyklowi.

## Human actions

none

## Decisions in play

- D-03: „The browser view is built in TypeScript with React, its screens written as `.tsx` components that draw from the game state, and no other UI framework stands in its code or its runtime dependencies.”
- D-265: „Until its last screen in the browser's DOM APIs moves to React, a shared control that a React screen uses has two forms in `src/browser/view/controls/`, a React component and a DOM function, drawing one tree of DOM elements with the same classes and attributes, and a screen no task has moved to React yet stays in those APIs on the DOM form, where a new section of such a screen may be built too, moving to React with that screen. A new screen is never written after the pattern of a module that builds its DOM elements through the DOM APIs, though it may import that module's pure functions. A test draws both forms for each kind and state the React screens use and compares their tag, attributes and text, the input's `value` attribute apart, and `src/browser/styles.css` stays the one place of the look of both.” — zmiana (pytania 1 i 3): ostatni ekran w API DOM przechodzi do Reacta, więc każda wspólna kontrolka ma jedną postać, komponent Reacta, a test porównujący znika; panel w miejscu karty zdjętej przez React, budowany poza Reactem (D-323), bierze znacznik, klasy i rolę zdania ostrzeżenia z jednej stałej, którą czyta też komponent Reacta tego zdania — wariant, który D-265 odrzucało jako „a shared function of class names under both forms”, bo „the comparison already catches” to, czego porównania już nie ma. Zdanie o `src/browser/styles.css` jako jedynym miejscu wyglądu zmienia zadanie podziału arkusza.
- D-269: „The kitchen-sink page holds no React: it shows each shared control in its DOM form, and no module it imports, directly or through other modules, reaches a `.tsx` file while `scripts/kitchen-sink.mjs` bundles nothing. A task that needs React on the page makes that script bundle, by a change of its build step and never of its lines that serve files.” — zmiana (pytanie 1): strona wzorcowa jest składana w paczkę tak jak gra, zmianą kroku budowania w `scripts/kitchen-sink.mjs`, a nie linii podających pliki, i pokazuje każdą wspólną kontrolkę w postaci Reacta; odrzucony dotąd wariant wraca, bo jego koszt — „a second set of samples for nothing the comparison of the two forms leaves open” — przestaje istnieć razem z porównaniem.
- Ustalenie zadania podziału sterownika widoku (jego *Settlements to record*, wiersz 1, do zapisania w jego cyklu): „Widok zostaje przy osobnych korzeniach Reacta, po jednym na ekran albo pasek […]; do pytania o jeden korzeń wraca zadanie o dokończeniu przejścia widoku na React.” — odpowiedź na pytanie 2 rozciąga je na stronę startową.
- D-44 (fragment): „[…] and the kitchen-sink page shows the waiting and refusal states of every form, „Nie pamiętam hasła” and „Ustaw nowe hasło” included, and the form „Nie pamiętam hasła” with that answer.”
- D-45 (fragment): „The kitchen-sink page of the browser view is built from `src/browser/kitchen-sink/` and opened on the developer's machine by its own command, `npm run kitchen-sink`, and nothing `npm run build` writes, which is what reaches the test server, holds it.”
- D-76 (fragment): „Only a change of a boundary's principle — another kind of file, another way in, another recipient — changes that boundary, and a change of how the kitchen-sink page is built does not change the boundary of the preview server.”
- D-262 (fragment): „Nothing stands on the screen of the login card but the card, not even the header.”
- D-323 (fragment): „[…] the page builds no game until it is reloaded, so a sign-in, whatever load or kept game state it leads to, stays at the waiting screen with the sentence […]. Until the page is reloaded the sentence „Coś w grze się zepsuło — odśwież stronę.” stands once, in `warning`: on a screen with the header, a game screen or a waiting screen, in the row under the menu bar beside the sentence of a failed save, on the screen of the login card in the card under the form, and, where React takes the card down, alone in the card's place (D-262).” — bez zmian (pytanie 3, wariant b).

## Settlements to record

Candidates: 7 shown, 3 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Strona wzorcowa kontrolek jest składana w paczkę tak jak gra i pokazuje każdą wspólną kontrolkę w postaci Reacta, tej, którą dostaje gracz; zmienia D-269. | decision | pytanie 1 (sposób niewybrany stoi pod nim) | czy przepisać D-269 na stronę z Reactem, czy zostawić stronę przy postaci DOM i jedną postać kontrolek tylko dla niej |
| 2 | Każda wspólna kontrolka ma jedną postać, komponent Reacta; panel w miejscu karty zdjętej przez React, budowany poza Reactem (D-323), bierze znacznik, klasy i rolę zdania ostrzeżenia z jednej stałej, którą czyta też komponent Reacta tego zdania; zmienia D-265. | decision | pytanie 3 (sposoby niewybrane stoją pod nim) | czy zostawić funkcję DOM zdania ostrzeżenia z testem porównującym, czy rysować panel osobnym korzeniem Reacta wbrew „outside React” w D-323 |
| 3 | Strona startowa po przejściu na React ma osobne korzenie Reacta — nagłówek, ekran oczekiwania i wiersze zdań — tym samym kształtem co ekrany gry. | decision | pytanie 2 (sposoby niewybrane stoją pod nim) | czy złożyć szkielet strony w jeden korzeń Reacta, a z nim wiersz awarii, który D-323 każe zachować |

## Out of scope

- Podział `src/browser/styles.css` — zadanie `loop2: podzielić arkusz stylów na pliki ekranów`.
- Metody `setQuestion` i `setWindow` ekranu Przejścia — zadanie `loop2: zastąpić metody setQuestion i setWindow ekranu Przejścia odczytem stanu`.
- Statusy siedmiu plików z karty D24 i statusy `copy` nadane bez audytu — zadanie `loop2: audyt statusów w tabelach plików wytycznych kodowania`.
- loop2#62-4 (`game-saver.ts`, zapis staje na stałe po wyjątku) — nota F-26 przeglądu fundamentu.
