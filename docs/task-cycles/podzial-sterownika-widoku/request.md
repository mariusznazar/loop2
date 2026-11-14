**State: ready** — two items below wait for your answer (items 1 and 2); nothing blocks the merge.

## What you will see

Nothing changes for the player. The game looks and behaves as before: the same screens, the same question "Zapisać, odrzucić, wrócić?", the same end-of-run window, the same saves. What changed is how the game's page is put together. One big piece of code that held the game's state, all five screens, the question, the end-of-run window, the keyboard focus and the moments of saving is now split into three parts with one job each: a store that holds the game state and counts the elapsed time before every act that depends on it, a table of screens through which each screen is built, shown, redrawn, focused and removed, and a small module that remembers the state of the screen of a map run (the question and the window). Adding the next screen, Wiedza, now means one new entry in that table, its address and its place on the menu bar, instead of a line in seven shared places. Nothing in the game's page file for the account, the menu bar or the login card changed.

All the existing tests pass without any change to their files; the three new parts have tests of their own. The one full run of the tests ends red only on two checks that are red on the starting point too, because the tools they need are not installed on this computer (Checks, 1).

### Underneath

The game's controller moved into one file per screen plus the three modules; the page file keeps only the composition of them, and each screen still draws in a React root of its own.

## For you to decide

### Needed from you

none

### Fix or let through

1. The game was compared before and after the change by a script on a simulated page, in twelve scenarios, and the records of what the page did were identical to the byte; but it was never played in a real browser, where keyboard focus and clicks are real. If something is off, the player would feel it as a window that does not take the keyboard after a reload, or a button that loses the focus after a click, on the first day. Playing it now costs a session with the game running locally and a round of review if it finds something; making a task of it leaves the focus paths unchecked until someone opens them; letting it through accepts that risk. I recommend doing it in this request, since the focus is the one thing the tests on a simulated page do not show. Run it in this request, make a task of it, or let it through? The steps of the check by hand, whose result you write down as a remark:
   1. Start the game on your computer as the project's play instructions say, log in, and send a character on a map until its trip ends or it dies.
   2. Reload the page: the window of the end of the trip should open on its own, with the keyboard inside it. Press Escape: the window closes and "Koniec przejścia" appears in the header; pressing it opens the window again.
   3. On a trip with unsaved changes to the copy of the program, press "Zakończ": the question "Zapisać, odrzucić, wrócić?" appears; "Wróć" closes it and leaves the trip as it was.
   4. On Siedziba press "Odbierz" and on Mapy press "Wejdź": the keyboard focus should land where it landed before the change (on the screen's own first control).

   (Checks, 3)
2. The review of the whole change read 38 of the 294 decisions that concern the parts the change touches whole and the rest by their titles; of the 35 decisions the author had left unread it read 23 whole, and 12 stayed unread because they govern code that was moved unchanged or not touched. If one of the 12 says something the new code breaks, the first to feel it would be the player in the situation that decision describes. Having a fresh reviewer read the 12 costs one more review; letting it through accepts that the reviewer judged them by their subject. I recommend letting it through, since the game-level tests and the byte-identical comparison cover the behaviour those decisions describe. Read them in this request, make a task of it, or let it through?

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

3. One of the three decisions the task asked to record is worded differently from the task. The task says "one React root for each screen or bar"; the code has two roots on the screens Programy and Przejście, so the decision now says each screen and the menu bar have roots of their own and none is shared between screens. I did not keep the task's wording because it would contradict the code on the first day. (Foundation entries, 1)
4. The acts that count the elapsed time first are all those that did so before: the pull of the previous save and "Odbierz" are among them; the game reset does not change the game state, so it does not go through the store; a new character and the purchase of a skill rank still do not count the time, as the task says. (Technical changes, 2)
5. The registry refuses a table of screens that holds no entry for one of the five kinds of screen as soon as it is built, using a list of the kinds placed in the module of screen addresses, which a new screen already changes. This is one more line there for the next screen; I took it because without it a forgotten table line would show only when a player opens that screen. (Technical changes, 3)
6. One sentence of the written design did not hold in the code: a refused "send" does not leave the state as it was, because the simulation throws on every refusal. The test records what really happens. Two of the three new decisions list no rejected alternative, because the task kept none for them. (Technical changes, 4)
7. New tests carry lines that name the decision they hold: eleven tests of the registry and one of the store. No existing test or its line changed. (Foundation entries, 4)

## Cost

About 1 h 27 min of working time of the agents and the orchestrator, plus 26 min of the full run of the tests and about 30 min of the same run on the starting point. The orchestrator and the author ran on Sonnet, the design of the spec and every review on Opus; tokens and per-stage times are in the table of stages in the committed record (Course of the cycle, Record). The reviews: the spec twice (FAIL, then PASS after one revision), the whole change twice (PASS, then PASS of the fix of six Minor findings), the return step twice (FAIL on one Important finding, then PASS after one fix). Directories of earlier tasks still stand because the cleaning script could not tell they were no longer needed; nothing in this request waits for them and you may remove them by hand (Checks, 9).

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record of the cycle survives only then. The review of the foundation does not wait: fewer than the threshold of merges have passed since the last one.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — dwa punkty niżej czekają na Twoją odpowiedź (punkty 1 i 2); nic nie blokuje scalenia.

### Co zobaczysz

Dla gracza nic się nie zmienia. Gra wygląda i działa jak wcześniej: te same ekrany, to samo pytanie „Zapisać, odrzucić, wrócić?”, to samo okno końca przejścia, te same zapisy. Zmieniło się to, jak składa się strona gry. Jeden duży kawałek kodu, który trzymał stan gry, wszystkie pięć ekranów, pytanie, okno końca przejścia, fokus klawiatury i momenty zapisu, jest teraz podzielony na trzy części o jednym zadaniu każda: magazyn, który trzyma stan gry i przed każdą akcją zależną od czasu dolicza upłynięty czas; tabelę ekranów, przez którą każdy ekran jest budowany, pokazywany, odświeżany, fokusowany i usuwany; oraz mały moduł pamiętający stan ekranu przejścia (pytanie i okno). Dodanie następnego ekranu, Wiedzy, to teraz jeden nowy wpis w tej tabeli, jego adres i miejsce na pasku menu, zamiast linii w siedmiu wspólnych miejscach. Nic w pliku strony od konta, paska menu i karty logowania się nie zmieniło.

Wszystkie istniejące testy przechodzą bez żadnej zmiany w swoich plikach; trzy nowe części mają własne testy. Jedyny pełny bieg testów kończy się czerwono tylko na dwóch sprawdzeniach, które są czerwone także na punkcie wyjścia, bo narzędzia, których potrzebują, nie są zainstalowane na tym komputerze (Checks, 1).

#### Pod spodem

Sterownik gry przeniósł się do jednego pliku na ekran oraz trzech modułów; plik strony zachował samo złożenie, a każdy ekran dalej rysuje się we własnym korzeniu Reacta.

### Do rozstrzygnięcia

#### Potrzebne od Ciebie

brak

#### Napraw albo przepuść

1. Grę porównano przed zmianą i po niej skryptem na symulowanej stronie, w dwunastu scenariuszach, i zapisy tego, co robiła strona, były identyczne co do bajtu; ale nigdy nie zagrano w nią w prawdziwej przeglądarce, gdzie fokus klawiatury i kliknięcia są prawdziwe. Gdyby coś było nie tak, gracz poczułby to jako okno, które po przeładowaniu nie przejmuje klawiatury, albo przycisk, który po kliknięciu traci fokus, już pierwszego dnia. Sprawdzenie teraz kosztuje sesję z grą uruchomioną lokalnie i rundę przeglądu, jeśli coś znajdzie; zrobienie z tego zadania zostawia ścieżki fokusu niesprawdzone, aż ktoś je otworzy; przepuszczenie przyjmuje to ryzyko. Rekomenduję zrobić to w tej prośbie, bo fokus jest jedyną rzeczą, której testy na symulowanej stronie nie pokazują. Zrobić to w tej prośbie, zrobić z tego zadanie, czy przepuścić? Kroki sprawdzenia ręcznego, którego wynik zapiszesz jako uwagę:
   1. Uruchom grę na swoim komputerze według instrukcji gry projektu, zaloguj się i wyślij postać na mapę, aż przejście się skończy albo postać zginie.
   2. Przeładuj stronę: okno końca przejścia powinno otworzyć się samo, z klawiaturą w środku. Naciśnij Escape: okno się zamknie, a w nagłówku pojawi się „Koniec przejścia”; jego naciśnięcie otwiera okno ponownie.
   3. Na przejściu z niezapisanymi zmianami kopii programu naciśnij „Zakończ”: pojawia się pytanie „Zapisać, odrzucić, wrócić?”; „Wróć” je zamyka i zostawia przejście bez zmian.
   4. Na Siedzibie naciśnij „Odbierz”, a na Mapach „Wejdź”: fokus klawiatury powinien trafić tam, gdzie trafiał przed zmianą (na pierwszą kontrolkę samego ekranu).

   (Checks, 3)
2. Przegląd całej zmiany przeczytał w całości 38 z 294 decyzji dotyczących części, których zmiana dotyka, a resztę po tytułach; z 35 decyzji, których autor nie przeczytał, przeczytał w całości 23, a 12 zostało nieprzeczytanych, bo dotyczą kodu przeniesionego bez zmian albo nietkniętego. Gdyby jedna z tych 12 mówiła coś, co nowy kod łamie, pierwszy odczułby to gracz w sytuacji, którą ta decyzja opisuje. Przeczytanie tych 12 przez świeżego recenzenta kosztuje jeden przegląd więcej; przepuszczenie przyjmuje, że recenzent ocenił je po temacie. Rekomenduję przepuścić, bo testy na poziomie gry i porównanie identyczne co do bajtu pokrywają zachowanie, które te decyzje opisują. Przeczytać je w tej prośbie, zrobić z tego zadanie, czy przepuścić?

#### Akceptujesz przez scalenie

Scalenie przyjmuje te punkty; jeśli któryś Ci nie odpowiada, powiedz który.

3. Jedna z trzech decyzji, które zadanie kazało zapisać, ma inne brzmienie niż w zadaniu. Zadanie mówi „po jednym korzeniu Reacta na ekran albo pasek”; w kodzie ekrany Programy i Przejście mają po dwa korzenie, więc decyzja mówi teraz, że każdy ekran i pasek menu ma własne korzenie i żaden nie jest wspólny między ekranami. Nie zostawiłem brzmienia z zadania, bo już pierwszego dnia przeczyłoby kodowi. (Foundation entries, 1)
4. Akcje, które najpierw doliczają upłynięty czas, to wszystkie, które robiły to wcześniej: pobranie poprzedniego zapisu i „Odbierz” są wśród nich; reset gry nie zmienia stanu gry, więc nie przechodzi przez magazyn; nowa postać i zakup stopnia umiejętności nadal czasu nie doliczają, jak mówi zadanie. (Technical changes, 2)
5. Rejestr odmawia tabeli ekranów, w której brakuje wpisu dla któregoś z pięciu rodzajów ekranu, już przy jej budowie, na podstawie listy rodzajów umieszczonej w module adresów ekranów, który nowy ekran i tak zmienia. To jedna dodatkowa linia tam przy następnym ekranie; wziąłem ją, bo bez niej zapomniana linia tabeli ujawniłaby się dopiero, gdy gracz otworzy ten ekran. (Technical changes, 3)
6. Jedno zdanie spisanego projektu nie sprawdziło się w kodzie: odrzucone „send” nie zostawia stanu bez zmian, bo symulacja rzuca wyjątek przy każdej odmowie. Test zapisuje to, co naprawdę się dzieje. Dwie z trzech nowych decyzji nie wymieniają odrzuconej alternatywy, bo zadanie żadnej dla nich nie zachowało. (Technical changes, 4)
7. Nowe testy mają linie nazywające decyzję, którą trzymają: jedenaście testów rejestru i jeden magazynu. Żaden istniejący test ani jego linia się nie zmieniły. (Foundation entries, 4)

</details>

## Technical changes

1. The store of the game state (`src/browser/view/state-store.ts`, commit `d01611f6`) holds the state, the clock and the saver; `take` accepts every result of the simulation, and `act` is the one place where an act that depends on time first catches up the elapsed time; `actWithoutCatchUp` serves the two acts that must not. It rejects every result after `halt()` as before.
2. The acts that count time first (`clock.flush()` before each) are now acts of the store: the nine acts of the two program panels (`program-panel-acts.ts`), and the acts of each screen (entry files `headquarters-entry.ts`, `programs-entry.ts`, `run-entry.ts`, `character-entry.ts`, `maps-entry.ts`), including the pull of the previous save and "Odbierz". The game reset does not change the game state and does not go through the store.
3. The registry of screens (`screen-registry.ts`, commit `8b68ec28`, changed in `15cf4273`) is a table of entries in the order Siedziba, Programy, Przejście, Postać, Mapy, each saying whether its screen lives all the time or only while the player is on it, with hooks to build, draw, focus and remove; showing a screen, drawing after a result and after a reading of the clock, choosing the element that gets the focus and the clean-up are loops over the table. `SCREEN_KINDS` (in `screen-address.ts`) makes the registry refuse at creation a table with no entry for a kind. It names only the screen of a map run, to tell the page the way back to it.
4. The state of the screen Przejście (`run-screen-state.ts`, commit `a6935a2c`) holds the question, the end-of-run window, its wait for the scene's effect and the focus owed to a window opened before the page holds the game; `ask`, `closeQuestion`, `openWindow`, `closeWindow` and `effectEnded` do nothing after `halt()`, while `entered` and `left` keep working, as the code did. The entry of the screen always syncs the window after `openWindow`, `closeWindow` and `effectEnded` even where the state did nothing; the screen ignores an unchanged value, so nothing shows.
5. `createGameView` (`game-view.ts`, commit `29d5d2c9`) went from 1300 to about 280 lines and is the composition of the three modules with the same `GameViewOptions` and `GameView`; `app.ts` did not change. `guidelines/coding-browser-module.md` changed in the same commit: its two examples and a row of the table for each of the nine new files.
6. Fix of the six Minor findings of the review of the whole change (commits `15cf4273` and `4f62fec5`): the registry's refusal at creation, the registry's doc sentence, the wording of two decisions, a cited decision in a test comment and an order a test no longer pins. Return step (commits `3e8fb3ef` and `4f31eb16`): lines `decision:` and the clause `tests:` for two decisions.
7. New tests: `tests/view/state-store.test.mjs` (12 cases), `tests/view/run-screen-state.test.mjs` (12) and `tests/view/screen-registry.test.mjs` (13). No existing test file changed.

Which places a new screen changes (acceptance criterion 1): its entry file, one line of the registry's table with that entry's import, its address in `src/browser/view/screen-address.ts` (the list of kinds and the address functions that already named screens) and its place on the menu bar in `src/browser/view/menu-bar.tsx`. No function that is shared between screens names it, apart from the table line.

## Checks

1. The full gate on the final tree `4f31eb16`: `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/podzial-sterownika-widoku/gate_times.md -- npm.cmd test`, exit 1, 1574.6 s. The build and the Node tests passed; `tests/agent_workflow`, `tests/deploy` and `tests/invariants` passed; `tests/quality` failed with two errors, `test_ruff_source_rules` and `test_shellcheck_source_rules` (`FileNotFoundError`: the tools are not installed on this computer). Both fail on the base `9e13af95` too (gate on the base: same command, exit 1, 1826.6 s, the same two errors); the one command stops at that stage, so the check of the foundation did not run in either run.
2. `python -B .the-way/elements/common/foundation_check.py` run on its own on the final tree: exit 0, `0 errors`; it lists 23 decisions "held by nothing", the same 23 as before the change, none of them new.
3. No screenshot and no real-browser run: no screen's look changed, and no agent of this cycle played the game in a real browser. The author's and the reviewer's byte-for-byte comparison of the base and the head builds on a simulated page, in twelve scenarios (seven by the author, five more by the reviewer), stands in for it; it does not reach the order of calls between two separate roots, "Otwarte: {mapa} →", the creation of a character, "Odbierz" and a pull that returns documents, which the existing game-level tests hold (item 1 of *Fix or let through*).
4. The author's checks, each exit 0: typecheck, eslint and prettier on the code, the 54 files of `tests/view/`, the cross-part imports, framework, content identifiers and token values invariant tests, `test_source_tool_scope.py`, `test_node_test_selection.py`. Own-work check: a differential run of the base and the new build (above). The invariant `uncaught-failure-game-state` test was seen failing once with `halted` removed from the store's `take`, and passing with the code restored.
5. The form check of this description: see the record's *Request handoff*; the check of private paths on the description and on the copy of the record, the check of image files and the remarks check on the original and the copy: last runs are in the record's *Verification* and are filled in when the record's copy is committed.
6. The author reports that `prettier --check foundations/decisions.md` exits 1 on the head of its first commits too; it was not rerun on the base and is not part of the gate, and no invariant covers Markdown.
7. Working copies left: none.
8. Process pin: `ec7929d0` (the pin of the target branch at the base; no move).
9. Directories of earlier tasks kept by the cleaning script: przewodnik-testow | task/przewodnik-testow | holds fail-node and fail-python, which stay: uncommitted changes; coding-guidelines | task/coding-guidelines | uncommitted changes; wt-L1 | task/the-way-slimmed | uncommitted changes; wt-L1a | task/slim-quality-checks | uncommitted changes; wt-pin | task/update-the-way-f0b2130 | uncommitted changes.

## Foundation entries

1. D-407 (row 1): the browser view keeps React roots of its own for each screen and for the menu bar, none shared between screens, with the game state in a store outside React, the state of the screen Przejście in a module outside React and memory shared by screens in the memory of the page; its wording differs from the task's row, as item 3 of *You accept by merging* says.
2. D-408 (row 2): a new screen of the game is a module of its own, one entry in the registry of screens, its address and its position on the menu bar, with no line in a function the game view shares between its screens.
3. D-409 (row 3): an act of the player that depends on the passing of time goes through the store of the game state, which reads the clock and passes the time elapsed to the simulation before the act runs; a new character and the purchase of a branch rank do not catch up.
4. Tests that hold a sentence by a line `decision:`, added by the change: eleven in `tests/view/screen-registry.test.mjs` (`decision: D-408`) and one in `tests/view/state-store.test.mjs` (`decision: D-409`); no existing test or invariant test changed, no surface or *Violated* mark changed. No invariant, glossary term, environment fact or part-map change.

## Minor findings

1. Of the review of the return step (not fixed, outside the fix): `tests/view/state-store.test.mjs:175-189` checks the store's side of D-409's second sentence, that the act without catch-up reads no clock, and carries no line `decision:`, and the clause `tests:` does not name it.
2. Of the review of the return step (not fixed): the words "through those entries alone" in D-408's clause `tests:` (`foundations/decisions.md`, D-408 *Verification*) go beyond what the tests hold: a branch for an unused kind of screen would pass all 13 tests; the example `violates` already covers the gap, and dropping "alone" would make the split exact.

## Findings outside the task's scope

none

## Course of the cycle

- **Task and sources:** the task "podział sterownika widoku" (independent), accepted 2026-11-13; sources: the code at base `9e13af95`, the foundation at the same commit.
- **Process pin:** `ec7929d0`, not moved; the gate on the base and on the final tree are in *Checks*.
- **Spec:** written, because the task left the boundaries of the three modules to the cycle; reviewed twice (FAIL with three findings, PASS after one revision); in the record as `spec.md` (the reviewed text as `spec-reviewed.md`).
- **Route:** one author without a plan, class same (Sonnet), after the reviewed spec: the change is one move of code, the spec's three steps each leave every existing test passing, and planning would add a planner, a plan review, three executors and three reviews.
- **Plan:** none.
- **Choices:** 4 rows in the questions table (`cycle.md`, *Questions and autonomous choices*), beside the author's choices in its report.
- **Blocking findings left:** none.
- **Record:** `<record link, added after the record's commit>`
