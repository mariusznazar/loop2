**State: ready** — three items under "Fix or let through" wait for your answer; nothing is needed from you before you merge.

## What you will see

A new game now starts on a new map, **Skraj lasu**, and solving it opens Las. On the screen Mapy of a new game the list holds Skraj lasu alone, and its card shows what the map asks for and holds: a 4 × 4 grid, a fixed entrance, 5 minutes to enter a tile, 25 °C, sticks and berries on every one of its 16 tiles on every seed (12 sticks that renew every 30 minutes, 8 berries that renew every 40), no moss, no fiber and no wolf, and it is solved by 480 game minutes with no loss of health to cold or hunger and no change of the program. Once Skraj lasu is solved, Las appears in the list and its card says „odsłania ją Skraj lasu”. Las — głębiej still opens after Las.

![The screen Mapy of a new game: the list holds Skraj lasu alone](https://github.com/mariusznazar/screenshots/blob/ef28017dee3195447d2cc677e1f4056b1d60cbb1/loop2/pierwsza-mapa-bez-loterii/mapy-new-game-list.png?raw=true)

![The card of Skraj lasu: sticks and berries on 16 of 16 tiles](https://github.com/mariusznazar/screenshots/blob/ef28017dee3195447d2cc677e1f4056b1d60cbb1/loop2/pierwsza-mapa-bez-loterii/mapy-skraj-lasu-card.png?raw=true)

![The card of Las once Skraj lasu is solved: „odsłania ją Skraj lasu”](https://github.com/mariusznazar/screenshots/blob/ef28017dee3195447d2cc677e1f4056b1d60cbb1/loop2/pierwsza-mapa-bez-loterii/mapy-las-card.png?raw=true)

A saved game made before this change is discarded whole, programs included, and the player starts a new game on Skraj lasu under the sentence „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” The program editor, before a map run, now offers the resources of every map, so moss and fiber are offered again even though the first map holds only sticks and berries.

![The program editor before a map run offers Patyk, Jagoda, Mech and Włókno](https://github.com/mariusznazar/screenshots/blob/ef28017dee3195447d2cc677e1f4056b1d60cbb1/loop2/pierwsza-mapa-bez-loterii/program-editor-resource-pick.png?raw=true)

On the game's real engine, over 500 map runs, the decent program of 12 rules solves Skraj lasu in 483 (96.6 %) and the naive program of 6 rules in 81 (16.2 %): a loss on the first map is now a fault in the program, as the task wanted. A new test pins both numbers, and the game fails its tests if either threshold breaks.

### Underneath

The map is one entry in the game's data, the saved game's version number is raised once, and about sixty existing test files now start from a game with Skraj lasu already solved, because a new game can no longer be sent to Las; the foundation gains the decision about the first map, the numbers of Skraj lasu and two rules, and six existing entries are corrected.

## For you to decide

### Needed from you

none

### Fix or let through

1. Two views were not looked at in a real browser: the program editor in a game where nothing is solved yet, and the screen of a map run on Skraj lasu. If the editor offered too few resources in a brand-new game, the player would find out when writing the first rule that uses moss or fiber; the screen of the run was not changed by this task. An automated test starts the editor from a game with nothing solved and fails if fewer than four resources are offered, so only the look is unseen. Checking them now costs one more session on the local game and a round of review; letting it through costs nothing today. I recommend letting it through, since the test covers the behaviour and no look of either screen changed. Check them in this request, make a task of it, or let it through?
2. The review of the whole change read 35 of about 180 selected decisions whole and ran through the rest by title, and it named four decisions that bear on the change as left unread (what the game writes into the program at a discovery, the screen Mapy, the rule that no tracked file names a private note, and the end window). The author read those four whole afterwards and found no sentence made false, and the reviewer's search by meaning found none either, but no reviewer other than the author read them. Having a fresh reviewer read them costs one more review round; merging now risks one false sentence staying in the foundation until the next review of it. I recommend letting it through, since two independent searches found nothing. Have a fresh reviewer read them in this request, make a task of it, or let it through?
3. An old gap stands in the foundation, not touched by this change: the rule that no file of a part imports a file of another part has no named fact it rests on. It stays unwritten until you name the fact and its source. Writing it now costs your answer and a small change; leaving it costs nothing, and the rule is checked by a test either way. I recommend making a task of it, since this request does not concern it. Name the fact in this request, make a task of it, or let it through?

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

4. The new map's name in the game's data and in the address `#/mapy/forestEdge` is `forestEdge`, as the old game called it and in the style of the other two maps, and it stands first in the data, so the list of the screen Mapy opens with the map that opens first. I did not put it after Las, because Las would then stand above its opener whenever both are shown, and I did not give it a Polish identifier, against the style of the data.
5. The saved game's version is raised from 5 to 6, once. The task spoke of raising it from 4; the game was already at 5 when the work began, so the single raise is 5 to 6, and every earlier save of yours is dropped at the first load, as you chose.
6. The program editor now offers the resources of every map before a map run, not only those of the first map of the data. Without this, moss and fiber could never be offered, since the first map now holds only sticks and berries; the task did not name this file, but an existing rule of the game says that with no map run every discovered target may be picked, and the change keeps it true. The other way, offering the resources of the maps that can be sent to, would tie the editor to the solved maps.
7. Foundation entries the cycle wrote that you did not see at the task: one sentence in the list of rejected ways of the decision on how tiles are drawn said „four in the first game map”; it now says „four in Las”, because the first map no longer holds four resources. The five corrections the task listed read: the decision on what brings actions into the Understanding no longer names Las in its title, first sentence and reasoning; the decision on the button that cannot be used says the first 84 minutes pass on Skraj lasu; the decision on the first walk-through says the row of Skraj lasu is the one to click; the decision on a program keeping the mage alive says it is Las that is passed by writing a program; the decision on the numbers of Las says Las — głębiej is now the third map.
8. The two projected entries (the decision on which map a new game opens on, and the rule that every tile of Skraj lasu holds sticks and berries) were written as approved, apart from three things the template forces: the decision's line listing related decisions names the two it rests on instead of a placeholder; its line on how it is checked also names the new balance rule; and the stock rule is checked by a test instead of by review.
9. Four invariant tests and their shared helper started their games from a new game and sent it to Las; they now start from a game with Skraj lasu solved. One control in the tile test, which demanded that every resource be missing from some tile, is excepted for a map whose density is 1, since it cannot hold there.

## Cost

About 1 hour 14 minutes of working time across the stages (36 minutes of it waiting for tools), by an author and a reviewer, all on the same model as the orchestrator, Claude Sonnet 5.5, with about 118 million tokens counted, nearly all of it read from a cache; plus two runs of the whole gate of about an hour each (one on the base, one on the final tree), which `stages.md` does not count. One review of the whole change, one fix of its four Minor findings with one review of that fix, and a return step that committed nothing. The table of stages is in the record, linked below.

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record survives only then; the repository's earlier requests were merged that way.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — trzy pozycje w „Napraw albo przepuść” czekają na Twoją odpowiedź; przed scaleniem nic od Ciebie nie jest potrzebne.

## Co zobaczysz

Nowa gra zaczyna się teraz na nowej mapie, **Skraj lasu**, a jej rozwiązanie otwiera Las. Na ekranie Mapy nowej gry lista ma tylko Skraj lasu, a jego karta pokazuje, czego mapa wymaga i co leży na niej: siatka 4 × 4, stałe wejście, 5 minut na wejście na kafelek, 25 °C, patyki i jagody na każdym z 16 kafelków przy każdym ziarnie (12 patyków, z których jeden odrasta co 30 minut, i 8 jagód, z których jedna odrasta co 40), bez mchu, włókna i wilka; rozwiązuje ją 480 minut gry bez utraty zdrowia od zimna i głodu i bez zmiany programu. Po rozwiązaniu Skraju lasu Las pojawia się na liście, a jego karta mówi „odsłania ją Skraj lasu”. Las — głębiej dalej otwiera się po Lesie.

Zapis gry zrobiony przed tą zmianą jest odrzucany w całości, razem z programami, a gracz zaczyna nową grę na Skraju lasu pod zdaniem „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” Edytor programu przed przejściem proponuje teraz zasoby każdej mapy, więc mech i włókno są znów proponowane, choć pierwsza mapa ma tylko patyki i jagody.

Na prawdziwym silniku gry, na 500 przejściach, program przyzwoity (12 reguł) rozwiązuje Skraj lasu w 483 (96,6 %), a naiwny (6 reguł) w 81 (16,2 %): przegrana na pierwszej mapie jest teraz błędem programu, jak chciało zadanie. Nowy test pilnuje obu liczb i gra nie przejdzie testów, gdy któryś próg pęknie.

### Pod spodem

Mapa to jeden wpis w danych gry, wersja zapisu rośnie raz, a około sześćdziesięciu istniejących plików testów zaczyna teraz od gry z rozwiązanym Skrajem lasu, bo nowej gry nie da się już wysłać do Lasu; fundament dostaje decyzję o pierwszej mapie, liczby Skraju lasu i dwie reguły, a sześć istniejących wpisów jest poprawionych.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

none

### Napraw albo przepuść

1. Dwa widoki nie były oglądane w prawdziwej przeglądarce: edytor programu w grze, w której nic jeszcze nie jest rozwiązane, i ekran przejścia na Skraju lasu. Gdyby edytor w całkiem nowej grze proponował za mało zasobów, gracz przekonałby się przy pierwszej regule o mchu albo włóknie; ekranu przejścia ta zmiana nie ruszała. Automatyczny test uruchamia edytor w grze bez rozwiązanych map i pada, gdy proponuje mniej niż cztery zasoby, więc niewidziany jest tylko wygląd. Sprawdzenie ich teraz kosztuje jeszcze jedną sesję na lokalnej grze i rundę przeglądu; przepuszczenie nie kosztuje dziś nic. Rekomenduję przepuścić, bo zachowanie pilnuje test, a wygląd żadnego z tych ekranów się nie zmienił. Sprawdzić je w tej prośbie, zrobić z tego zadanie czy przepuścić?
2. Przegląd całej zmiany przeczytał w całości 35 z około 180 wybranych decyzji, resztę przejrzał po tytułach i wskazał cztery decyzje związane ze zmianą jako nieprzeczytane (co gra wpisuje do programu przy odkryciu, ekran Mapy, reguła, że żaden śledzony plik nie nazywa prywatnej notatki, i okno końca). Autor przeczytał te cztery w całości potem i nie znalazł zdania, które zmiana czyni fałszywym, a przeszukanie recenzenta według znaczenia też nie, ale żaden recenzent poza autorem ich nie czytał. Przeczytanie ich przez świeżego recenzenta kosztuje jeszcze jedną rundę przeglądu; scalenie teraz ryzykuje jedno fałszywe zdanie w fundamencie do jego następnego przeglądu. Rekomenduję przepuścić, bo dwa niezależne przeszukania nic nie znalazły. Dać je do przeczytania świeżemu recenzentowi w tej prośbie, zrobić z tego zadanie czy przepuścić?
3. W fundamencie stoi stara luka, której ta zmiana nie dotyka: reguła, że żaden plik jednej części nie importuje pliku innej części, nie ma nazwanego faktu, na którym się opiera. Zostaje niezapisana, dopóki nie nazwiesz faktu i jego źródła. Zapisanie jej teraz kosztuje Twoją odpowiedź i małą zmianę; zostawienie nie kosztuje nic, a regułę i tak sprawdza test. Rekomenduję zrobić z tego zadanie, bo ta prośba jej nie dotyczy. Nazwać fakt w tej prośbie, zrobić z tego zadanie czy przepuścić?

### Przyjmujesz przez scalenie

Scalenie przyjmuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

4. Nazwa nowej mapy w danych gry i w adresie `#/mapy/forestEdge` to `forestEdge`, tak jak nazywała ją stara gra i w stylu dwóch pozostałych map, a w danych stoi pierwsza, więc lista ekranu Mapy zaczyna się od mapy, która otwiera się pierwsza. Nie postawiłem jej po Lesie, bo Las stałby wtedy nad swoją mapą otwierającą, gdy widać obie, i nie nadałem jej polskiego identyfikatora wbrew stylowi danych.
5. Wersja zapisu rośnie z 5 na 6, raz. Zadanie mówiło o podniesieniu z 4; gra miała już 5, gdy zaczęła się praca, więc jedno podniesienie to 5 na 6, a każdy wcześniejszy Twój zapis jest odrzucany przy pierwszym wczytaniu, jak wybrałeś.
6. Edytor programu proponuje teraz przed przejściem zasoby każdej mapy, nie tylko pierwszej mapy z danych. Bez tego mech i włókno nigdy by się nie pojawiły, bo pierwsza mapa ma tylko patyki i jagody; zadanie nie wymieniło tego pliku, ale istniejąca reguła gry mówi, że bez przejścia można wybrać każdy odkryty cel, a zmiana utrzymuje ją prawdziwą. Druga droga, zasoby map, do których można wysłać postać, wiązałaby edytor z rozwiązanymi mapami.
7. Wpisy fundamentu, które cykl napisał, a których nie widziałeś przy zadaniu: jedno zdanie w odrzuconych drogach decyzji o losowaniu kafelków mówiło „cztery na pierwszej mapie gry”, a teraz mówi „cztery w Lesie”, bo pierwsza mapa nie ma już czterech zasobów. Pięć poprawek, które wymieniło zadanie: decyzja o tym, co wprowadza czynności do Zrozumienia, nie nazywa już Lasu w tytule, w pierwszym zdaniu i w uzasadnieniu; decyzja o przycisku, którego nie da się użyć, mówi, że pierwsze 84 minuty mijają na Skraju lasu; decyzja o pierwszym przejściu mówi, że klika się wiersz Skraju lasu; decyzja o programie utrzymującym maga przy życiu mówi, że to Las przechodzi się pisząc program; decyzja o liczbach Lasu mówi, że Las — głębiej jest teraz trzecią mapą.
8. Dwa wpisy projektowane (decyzja o mapie, na której otwiera się nowa gra, i reguła, że każdy kafelek Skraju lasu ma patyki i jagody) zapisano tak, jak je zatwierdzono, z trzema rzeczami, które wymusza szablon: linia decyzji z powiązanymi decyzjami nazywa dwie, na których się opiera, zamiast wypełniacza; jej linia o sposobie sprawdzania nazywa też nową regułę balansu; a regułę o zasobach sprawdza test zamiast przeglądu.
9. Cztery testy niezmienników i ich wspólny pomocnik zaczynały grę od nowej gry i wysyłały ją do Lasu; teraz zaczynają od gry z rozwiązanym Skrajem lasu. Jedna kontrola w teście kafelków, która żądała, by każdy zasób brakował na jakimś kafelku, ma wyjątek dla mapy o gęstości 1, bo tam nie może się spełnić.

## Koszt

Około 1 godziny 14 minut czasu pracy w etapach (36 minut z tego to oczekiwanie na narzędzia), przez autora i recenzenta, wszystkich na tym samym modelu co orkiestrator, Claude Sonnet 5.5, z około 118 milionami policzonych tokenów, prawie wszystkie z pamięci podręcznej; do tego dwa przebiegi całej bramki po około godzinie (jeden na bazie, jeden na końcowym drzewie), których `stages.md` nie liczy. Jeden przegląd całej zmiany, jedna poprawka jego czterech uwag drobnych z jednym przeglądem tej poprawki i krok powrotny, który niczego nie zacommitował. Tabela etapów jest w zapisie, z linkiem niżej.

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo link do zapisu przeżywa tylko wtedy; wcześniejsze prośby tego repozytorium scalano tak.

</details>

## Technical changes

The change is five commits and three more of the fix, from the base `e54f23c0`:

- `f513b34f` adds the map `forestEdge` as the first key of the game's maps (4 × 4, entrance column 1 row 1, 25 °C, 5 minutes a step, sticks 1 / 12 / 30, berries 1 / 8 / 40, streak 480), makes Las open after it, and raises the saved game's version constant from 5 to 6.
- `d5bb06de` makes the resource selects of the program editor offer the resources of every map before a map run (`src/browser/view/program-editor.ts`).
- `32fb9908` adds the balance test `tests/sim/first-map-balance.test.mjs` and the stock test in `tests/sim/layout.test.mjs`, adds `withEdgeSolved` to `tests/sim/understanding-fixture.mjs`, migrates 62 existing test files (29 in `tests/sim`, 33 in `tests/view`) to start from a game with Skraj lasu solved where they send to Las, updates four invariant tests and `tests/invariants/program_fixture.py`, and lists the new test in `stryker.config.json`.
- `78d2aa2b` writes the foundation entries and corrections; `23981674` tells `README.md` and the `loop2-play` skill (both its copies, and its `compose-state.mjs`) to enter the first map by the row Skraj lasu.
- The fix of the Minor findings of the whole-change review: `c6a1c17b` gives the saved document of the current version the maps `["forestEdge", "forest"]`; `fb85bf26` cites D-289 in the comment of `offeredResources` and starts its test from a game with nothing solved; `3b378a8b` takes the count, the clock constant and the entrance-tile clause out of the invariant `first-map-balance`.

## Checks

- The whole gate, `npm test`, on the base `e54f23c0`: exit 0. On the final tree `3b378a8b`: exit 0, 562 tests in 4 directories, `0 errors` of the foundation check, no check failed or left unrun. A first attempt on the final tree was stopped by Claude Code for lack of memory on the machine and left no result; the second ran alone.
- Own-work checks. The author saw the new tests fail for the expected reason before they passed (the balance test with Las's densities: 236 of 500; the stock test; the saved game's version test) and ran 2023 of 2023 Node tests of `tests/sim` and `tests/view`, typecheck, build, ESLint and Prettier. The fix's author re-ran them after the fix (2023 of 2023) and showed the editor test red under a mutation that offered only the resources of Skraj lasu.
- The mutation tool, run by the reviewer on `src/browser/sim/data/maps.ts` and on `saved-game.ts:78-78`: exit 0 with 0 mutants each, since both are only literals; the proof that the data and the version are tested is the red runs above.
- User interface: the screen Mapy of a new game, the card of Skraj lasu, the list after Skraj lasu is solved, the card of Las and the program editor were looked at in the running game by the route of the `loop2-play` skill, in a session of its own, with 0 console errors; the four screenshots above lie in the public screenshots repository, in the directory of this cycle on its branch `loop2/pierwsza-mapa-bez-loterii`. Not seen in the browser: the editor with nothing solved (the automated test covers it) and the screen of a map run on Skraj lasu (item 1).
- Form check of this description: written after this description's last run, see the record's *Request handoff*. The checks of the copy of the record are added in the edit that links it.

## Foundation entries

- D-396, projected: a new game opens Skraj lasu, and solving it opens Las.
- D-397, row 1: Skraj lasu is 4 × 4, entrance column 1 row 1, 25 °C, 5 minutes a step, no attacker and no cap, solved by a streak of 480; sticks and berries with density 1, no moss or fiber; tests may expect these numbers.
- `first-map-stock`, projected: every tile of Skraj lasu holds sticks and berries, whatever the seed.
- `first-map-balance`, row 2: from a game with everything discovered, the decent 12-rule program solves Skraj lasu in at least 95 % of several hundred map runs the test names, and the naive 6-rule program in at most 50 %.
- D-121, D-124, D-330, D-378 and D-388, as the task lists them, and D-19, the cycle's, found by the search of the foundation: corrected as item 7 says.
- Invariant tests altered: the `save-version` cases in `tests/sim/saved-game.test.mjs` (version 5 refused, version 6 loads); no surface and no *Violated* mark changed.

## Minor findings

- Remaining after the fix, of its review: the header comment of `tests/sim/first-map-balance.test.mjs` says the naive program never leaves the entrance tile; true of the program as written, not asserted by any test.
- The four Minor findings of the whole-change review within the task were fixed (the saved-game test document, the editor's comment and test, the invariant's wording) or answered (the screenshot check); its review passed.

## Findings outside the task's scope

- The loader of the saved game accepts a version-6 list of solved maps that does not fit the order of opening (Las without Skraj lasu, Las — głębiej alone), as it already did for Las — głębiej without Las (`src/browser/sim/saved-game.ts:1214`): only a hand-edited save of a player's own account shows it. Reviewer: out of the task; "a one-line decision plus a test would settle it".
- The reasoning of D-136 („Las teaches keeping the loop going, Las — głębiej adds combat”) is now half the picture, since Skraj lasu is the first step; not false, and the task lists D-136 as checked and left.
- The sentence of D-325 that counts the maps was written for a game of two maps; the return step found it incomplete, not false, and left it.
- `guidelines/testing.md:111` gives as a bad example choosing the first map of the data and naming it `forest`; after this change the first map is `forestEdge`, so the example is still a bad one and needs no change.

## Course of the cycle

- **Task and sources:** the task of the plan item "pierwsza-mapa-bez-loterii" (MVP2 task 9), accepted by you on 2026-11-13; project definition approved 2026-11-13; it depends on the done task "lokalny-start", and its wait for the code tidy-up before it was over, since that request merged first.
- **Process pin:** `55afa8e57aa1b83c77108576a36642722e0dda15`, unchanged by the task; gate on the base `e54f23c0`: exit 0.
- **Spec:** none; the task left no open design choice.
- **Route:** one author without a plan, class `same` as the orchestrator, Claude Sonnet 5.5, since the change is one piece of data, a saved-game version, tests and entries in one part, with the foundation entries beside it; one review of the whole change by a fresh reviewer (`PASS`), one fix of its four Minor findings and its review (`PASS`), and a return step that committed nothing. No discarded attempt.
- **Plan:** none.
- **Choices:** 8 choices in the questions table of the record: 3 settled by the orchestrator for the author (the identifier, the first place in the data, the number of seeds) and 5 made by the author (the horizon of 5000 game minutes that defines „solved” in the balance test, the seeds named as real moments, the maps of the saved-game test document, the older version of the account screen test, and the resources the editor offers).
- **Blocking findings left:** none.
- **Record:** to be linked by the SHA of the commit that adds it.
