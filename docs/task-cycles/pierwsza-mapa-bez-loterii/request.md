**State: ready** — corrected for your remarks; nothing waits for your answer, and merging accepts the items under "You accept by merging".

## What you will see

A new game now starts on a new map, **Skraj lasu**, and solving it opens Las. On the screen Mapy of a new game the list holds Skraj lasu alone, and its card shows what the map asks for and holds: a 4 × 4 grid, a fixed entrance, 5 minutes to enter a tile, 25 °C, sticks and berries on every one of its 16 tiles on every seed (12 sticks that renew every 30 minutes, 8 berries that renew every 40), no moss, no fiber and no wolf, and it is solved by 480 game minutes with no loss of health to cold or hunger and no change of the program. Once Skraj lasu is solved, Las appears in the list and its card says „odsłania ją Skraj lasu”. Las — głębiej still opens after Las.

![The screen Mapy of a new game: the list holds Skraj lasu alone](https://github.com/mariusznazar/screenshots/blob/ef28017dee3195447d2cc677e1f4056b1d60cbb1/loop2/pierwsza-mapa-bez-loterii/mapy-new-game-list.png?raw=true)

![The card of Skraj lasu: sticks and berries on 16 of 16 tiles](https://github.com/mariusznazar/screenshots/blob/ef28017dee3195447d2cc677e1f4056b1d60cbb1/loop2/pierwsza-mapa-bez-loterii/mapy-skraj-lasu-card.png?raw=true)

![The card of Las once Skraj lasu is solved: „odsłania ją Skraj lasu”](https://github.com/mariusznazar/screenshots/blob/ef28017dee3195447d2cc677e1f4056b1d60cbb1/loop2/pierwsza-mapa-bez-loterii/mapy-las-card.png?raw=true)

Pressing „Wejdź” on the card opens the screen of a map run on Skraj lasu, which, looked at on the game with this request merged with the newest main, reads „Ala · Skraj lasu · Minuta 1 · Passa 1/480” over the scene, the body, the map and the copy of the program. About twelve real seconds later the same screen read minute 15 and streak 15 of 480, and frost had begun on the edge of the scene; the mage stood still, since the program was empty.

![The screen of the map run on Skraj lasu at game minute 1](https://github.com/mariusznazar/screenshots/blob/914c60ae33de6d550d243237dc67bd32344bb137/loop2/pierwsza-mapa-bez-loterii/run-skraj-lasu-start.png?raw=true)

![The same screen at game minute 15: streak 15 of 480, frost on the edge of the scene](https://github.com/mariusznazar/screenshots/blob/914c60ae33de6d550d243237dc67bd32344bb137/loop2/pierwsza-mapa-bez-loterii/run-skraj-lasu-later.png?raw=true)

A saved game made before this change is discarded whole, programs included, and the player starts a new game on Skraj lasu under the sentence „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” The program editor, before a map run, now offers the resources of every map, so moss and fiber are offered again even though the first map holds only sticks and berries. In a brand-new game the editor shows an empty group with „+ reguła” greyed out until the first chill, as it did before this change; in a game where everything is discovered and nothing is solved, the target of „Tu leży mniej niż” offers Patyk, Jagoda, Mech and Włókno.

![The program editor of a new game: the group is empty and „+ reguła” is disabled](https://github.com/mariusznazar/screenshots/blob/914c60ae33de6d550d243237dc67bd32344bb137/loop2/pierwsza-mapa-bez-loterii/editor-new-game.png?raw=true)

![The rule panel with nothing solved: the target of „Tu leży mniej niż” offers Patyk, Jagoda, Mech and Włókno](https://github.com/mariusznazar/screenshots/blob/914c60ae33de6d550d243237dc67bd32344bb137/loop2/pierwsza-mapa-bez-loterii/editor-resource-pick-nothing-solved.png?raw=true)

On the game's real engine, over 500 map runs, the decent program of 12 rules solves Skraj lasu in 483 (96.6 %) and the naive program of 6 rules in 81 (16.2 %): a loss on the first map is now a fault in the program, as the task wanted. A new test pins both numbers, and the game fails its tests if either threshold breaks.

### Underneath

The map is one entry in the game's data, the saved game's version number is raised once, and about sixty existing test files now start from a game with Skraj lasu already solved, because a new game can no longer be sent to Las; the foundation gains the decision about the first map, the numbers of Skraj lasu and two rules, six existing entries are corrected, and the newest main is merged in, whose one conflict was a clash of decision numbers.

## For you to decide

### Needed from you

none

### Fix or let through

none

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

1. The new map's name in the game's data and in the address `#/mapy/forestEdge` is `forestEdge`, as the old game called it and in the style of the other two maps, and it stands first in the data, so the list of the screen Mapy opens with the map that opens first. I did not put it after Las, because Las would then stand above its opener whenever both are shown, and I did not give it a Polish identifier, against the style of the data.
2. The saved game's version is raised from 5 to 6, once. The task spoke of raising it from 4; the game was already at 5 when the work began, so the single raise is 5 to 6, and every earlier save of yours is dropped at the first load, as you chose.
3. The program editor now offers the resources of every map before a map run, not only those of the first map of the data. Without this, moss and fiber could never be offered, since the first map now holds only sticks and berries; the task did not name this file, but an existing rule of the game says that with no map run every discovered target may be picked, and the change keeps it true. The other way, offering the resources of the maps that can be sent to, would tie the editor to the solved maps.
4. Foundation entries the cycle wrote that you did not see at the task: one sentence in the list of rejected ways of the decision on how tiles are drawn said „four in the first game map”; it now says „four in Las”, because the first map no longer holds four resources. The five corrections the task listed read: the decision on what brings actions into the Understanding no longer names Las in its title, first sentence and reasoning; the decision on the button that cannot be used says the first 84 minutes pass on Skraj lasu; the decision on the first walk-through says the row of Skraj lasu is the one to click; the decision on a program keeping the mage alive says it is Las that is passed by writing a program; the decision on the numbers of Las says Las — głębiej is now the third map.
5. The two projected entries (the decision on which map a new game opens on, and the rule that every tile of Skraj lasu holds sticks and berries) were written as approved, apart from three things the template forces: the decision's line listing related decisions names the two it rests on instead of a placeholder; its line on how it is checked also names the new balance rule; and the stock rule is checked by a test instead of by review.
6. Four invariant tests and their shared helper started their games from a new game and sent it to Las; they now start from a game with Skraj lasu solved. One control in the tile test, which demanded that every resource be missing from some tile, is excepted for a map whose density is 1, since it cannot hold there.
7. While this request waited, main gained a decision of its own on browsers and the smallest window, and it took the same number as this request's decision on the first map. Main's decision kept its number, untouched, and this request's two new decisions took the two numbers after it; every reference to them was rewritten, and nothing but the numbers of the two entries changed. I did not renumber main's decision, since other work may already cite it.

## Cost

About 1 hour 35 minutes of working time across the stages (45 minutes of it waiting for tools), by an author and reviewers, all on the same model as the orchestrator, Claude Sonnet 5.5, with about 153 million tokens counted, nearly all of it read from a cache; plus three runs of the whole gate of about an hour each (on the base, on the tree before the merge and on the merged tree), which `stages.md` does not count, and one attempt that Claude Code stopped for lack of memory. One review of the whole change, one fix of its four Minor findings with one review of that fix, a return step that committed nothing, and for the correction a merge of main with its review and a look at two screens in a real browser. The table of stages is in [the record](https://github.com/mariusznazar/loop2/blob/RECORDSHA/docs/task-cycles/pierwsza-mapa-bez-loterii/stages.md).

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record survives only then; the repository's earlier requests were merged that way.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — poprawione według Twoich uwag; nic nie czeka na Twoją odpowiedź, a scalenie przyjmuje pozycje z „Przyjmujesz przez scalenie”.

## Co zobaczysz

Nowa gra zaczyna się teraz na nowej mapie, **Skraj lasu**, a jej rozwiązanie otwiera Las. Na ekranie Mapy nowej gry lista ma tylko Skraj lasu, a jego karta pokazuje, czego mapa wymaga i co leży na niej: siatka 4 × 4, stałe wejście, 5 minut na wejście na kafelek, 25 °C, patyki i jagody na każdym z 16 kafelków przy każdym ziarnie (12 patyków, z których jeden odrasta co 30 minut, i 8 jagód, z których jedna odrasta co 40), bez mchu, włókna i wilka; rozwiązuje ją 480 minut gry bez utraty zdrowia od zimna i głodu i bez zmiany programu. Po rozwiązaniu Skraju lasu Las pojawia się na liście, a jego karta mówi „odsłania ją Skraj lasu”. Las — głębiej dalej otwiera się po Lesie.

Przycisk „Wejdź” na karcie otwiera ekran przejścia na Skraju lasu, który obejrzano na grze z tą prośbą scaloną z najnowszym `main`: nagłówek „Ala · Skraj lasu · Minuta 1 · Passa 1/480” nad sceną, ciałem, mapą i kopią programu. Po około dwunastu sekundach rzeczywistych ten sam ekran pokazywał minutę 15 i passę 15 z 480, a na brzegu sceny zaczynał się szron; mag stał w miejscu, bo program był pusty.

Zapis gry zrobiony przed tą zmianą jest odrzucany w całości, razem z programami, a gracz zaczyna nową grę na Skraju lasu pod zdaniem „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” Edytor programu przed przejściem proponuje teraz zasoby każdej mapy, więc mech i włókno są znów proponowane, choć pierwsza mapa ma tylko patyki i jagody. W całkiem nowej grze edytor pokazuje pustą grupę z wyszarzonym „+ reguła” do pierwszego wychłodzenia, tak jak przed tą zmianą; w grze, w której wszystko jest odkryte, a nic nierozwiązane, cel warunku „Tu leży mniej niż” proponuje Patyk, Jagodę, Mech i Włókno.

Na prawdziwym silniku gry, na 500 przejściach, program przyzwoity (12 reguł) rozwiązuje Skraj lasu w 483 (96,6 %), a naiwny (6 reguł) w 81 (16,2 %): przegrana na pierwszej mapie jest teraz błędem programu, jak chciało zadanie. Nowy test pilnuje obu liczb i gra nie przejdzie testów, gdy któryś próg pęknie.

### Pod spodem

Mapa to jeden wpis w danych gry, wersja zapisu rośnie raz, a około sześćdziesięciu istniejących plików testów zaczyna teraz od gry z rozwiązanym Skrajem lasu, bo nowej gry nie da się już wysłać do Lasu; fundament dostaje decyzję o pierwszej mapie, liczby Skraju lasu i dwie reguły, sześć istniejących wpisów jest poprawionych, a najnowszy `main` jest scalony, z jednym konfliktem: zbiegiem numerów decyzji.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

none

### Napraw albo przepuść

none

### Przyjmujesz przez scalenie

Scalenie przyjmuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

1. Nazwa nowej mapy w danych gry i w adresie `#/mapy/forestEdge` to `forestEdge`, tak jak nazywała ją stara gra i w stylu dwóch pozostałych map, a w danych stoi pierwsza, więc lista ekranu Mapy zaczyna się od mapy, która otwiera się pierwsza. Nie postawiłem jej po Lesie, bo Las stałby wtedy nad swoją mapą otwierającą, gdy widać obie, i nie nadałem jej polskiego identyfikatora wbrew stylowi danych.
2. Wersja zapisu rośnie z 5 na 6, raz. Zadanie mówiło o podniesieniu z 4; gra miała już 5, gdy zaczęła się praca, więc jedno podniesienie to 5 na 6, a każdy wcześniejszy Twój zapis jest odrzucany przy pierwszym wczytaniu, jak wybrałeś.
3. Edytor programu proponuje teraz przed przejściem zasoby każdej mapy, nie tylko pierwszej mapy z danych. Bez tego mech i włókno nigdy by się nie pojawiły, bo pierwsza mapa ma tylko patyki i jagody; zadanie nie wymieniło tego pliku, ale istniejąca reguła gry mówi, że bez przejścia można wybrać każdy odkryty cel, a zmiana utrzymuje ją prawdziwą. Druga droga, zasoby map, do których można wysłać postać, wiązałaby edytor z rozwiązanymi mapami.
4. Wpisy fundamentu, które cykl napisał, a których nie widziałeś przy zadaniu: jedno zdanie w odrzuconych drogach decyzji o losowaniu kafelków mówiło „cztery na pierwszej mapie gry”, a teraz mówi „cztery w Lesie”, bo pierwsza mapa nie ma już czterech zasobów. Pięć poprawek, które wymieniło zadanie: decyzja o tym, co wprowadza czynności do Zrozumienia, nie nazywa już Lasu w tytule, w pierwszym zdaniu i w uzasadnieniu; decyzja o przycisku, którego nie da się użyć, mówi, że pierwsze 84 minuty mijają na Skraju lasu; decyzja o pierwszym przejściu mówi, że klika się wiersz Skraju lasu; decyzja o programie utrzymującym maga przy życiu mówi, że to Las przechodzi się pisząc program; decyzja o liczbach Lasu mówi, że Las — głębiej jest teraz trzecią mapą.
5. Dwa wpisy projektowane (decyzja o mapie, na której otwiera się nowa gra, i reguła, że każdy kafelek Skraju lasu ma patyki i jagody) zapisano tak, jak je zatwierdzono, z trzema rzeczami, które wymusza szablon: linia decyzji z powiązanymi decyzjami nazywa dwie, na których się opiera, zamiast wypełniacza; jej linia o sposobie sprawdzania nazywa też nową regułę balansu; a regułę o zasobach sprawdza test zamiast przeglądu.
6. Cztery testy niezmienników i ich wspólny pomocnik zaczynały grę od nowej gry i wysyłały ją do Lasu; teraz zaczynają od gry z rozwiązanym Skrajem lasu. Jedna kontrola w teście kafelków, która żądała, by każdy zasób brakował na jakimś kafelku, ma wyjątek dla mapy o gęstości 1, bo tam nie może się spełnić.
7. Gdy ta prośba czekała, `main` dostał własną decyzję o przeglądarkach i najmniejszym oknie, która dostała ten sam numer co decyzja tej prośby o pierwszej mapie. Decyzja z `main` zachowała swój numer, nietknięta, a dwie nowe decyzje tej prośby dostały dwa numery po niej; wszystkie odwołania do nich przepisano i nic poza numerami tych dwóch wpisów się nie zmieniło. Nie zmieniałem numeru decyzji z `main`, bo inna praca może już na nią wskazywać.

## Koszt

Około 1 godziny 35 minut czasu pracy w etapach (45 minut z tego to oczekiwanie na narzędzia), przez autora i recenzentów, wszystkich na tym samym modelu co orkiestrator, Claude Sonnet 5.5, z około 153 milionami policzonych tokenów, prawie wszystkie z pamięci podręcznej; do tego trzy przebiegi całej bramki po około godzinie (na bazie, na drzewie przed scaleniem i na drzewie scalonym), których `stages.md` nie liczy, i jedna próba, którą Claude Code zatrzymał z braku pamięci. Jeden przegląd całej zmiany, jedna poprawka jego czterech uwag drobnych z jednym przeglądem tej poprawki, krok powrotny, który niczego nie zacommitował, a dla poprawki scalenie `main` z jego przeglądem i obejrzenie dwóch ekranów w prawdziwej przeglądarce. Tabela etapów jest w [zapisie](https://github.com/mariusznazar/loop2/blob/RECORDSHA/docs/task-cycles/pierwsza-mapa-bez-loterii/stages.md).

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo link do zapisu przeżywa tylko wtedy; wcześniejsze prośby tego repozytorium scalano tak.

</details>

## Technical changes

The change is five commits and three more of the fix, from the base `e54f23c0`, and a merge of main:

- `f513b34f` adds the map `forestEdge` as the first key of the game's maps (4 × 4, entrance column 1 row 1, 25 °C, 5 minutes a step, sticks 1 / 12 / 30, berries 1 / 8 / 40, streak 480), makes Las open after it, and raises the saved game's version constant from 5 to 6.
- `d5bb06de` makes the resource selects of the program editor offer the resources of every map before a map run (`src/browser/view/program-editor.ts`).
- `32fb9908` adds the balance test `tests/sim/first-map-balance.test.mjs` and the stock test in `tests/sim/layout.test.mjs`, adds `withEdgeSolved` to `tests/sim/understanding-fixture.mjs`, migrates 62 existing test files (29 in `tests/sim`, 33 in `tests/view`) to start from a game with Skraj lasu solved where they send to Las, updates four invariant tests and `tests/invariants/program_fixture.py`, and lists the new test in `stryker.config.json`.
- `78d2aa2b` writes the foundation entries and corrections; `23981674` tells `README.md` and the `loop2-play` skill (both its copies, and its `compose-state.mjs`) to enter the first map by the row Skraj lasu.
- The fix of the Minor findings of the whole-change review: `c6a1c17b` gives the saved document of the current version the maps `["forestEdge", "forest"]`; `fb85bf26` cites D-289 in the comment of `offeredResources` and starts its test from a game with nothing solved; `3b378a8b` takes the count, the clock constant and the entrance-tile clause out of the invariant `first-map-balance`.
- The correction for your remarks: `1d6cce30` merges main (request #94) into the branch. The one conflict, in `foundations/decisions.md`, was that both sides had written D-396; main's D-396 stays as it is, and this branch's two decisions are D-397 and D-398, with the references in the two invariants, `tests/invariants/test_map_run_tiles.py` and `tests/sim/data.test.mjs` rewritten. The version constant is still 6, and main's changed comment of it is true for 6.

## Checks

- The whole gate, `npm test`: on the base `e54f23c0` exit 0; on the tree before the merge `3b378a8b` exit 0; on the merged tree `1d6cce30`, the tree of this request, exit 0 — 562 tests in 4 directories, `0 errors` of the foundation check, no check failed or left unrun. A first attempt on `3b378a8b` was stopped by Claude Code for lack of memory on the machine and left no result; every later run ran alone.
- Own-work checks. The author saw the new tests fail for the expected reason before they passed (the balance test with Las's densities: 236 of 500; the stock test; the saved game's version test) and ran 2023 of 2023 Node tests of `tests/sim` and `tests/view`, typecheck, build, ESLint and Prettier. The fix's author re-ran them after the fix (2023 of 2023) and showed the editor test red under a mutation that offered only the resources of Skraj lasu. After the merge the author ran the foundation check (`0 errors`), typecheck, build, the data, saved-game and balance tests (35, 38 and 5 pass) and `test_map_run_tiles.py`, each exit 0; the whole sim and view sets were not rerun, since the merge changed in code and tests only one comment of `saved-game.ts`.
- The mutation tool, run by the reviewer on `src/browser/sim/data/maps.ts` and on `saved-game.ts:78-78`: exit 0 with 0 mutants each, since both are only literals; the proof that the data and the version are tested is the red runs above.
- User interface: the screen Mapy of a new game, the card of Skraj lasu, the list after Skraj lasu is solved, the card of Las and the program editor were looked at in the running game by the route of the `loop2-play` skill, in a session of their own, with 0 console errors. After the merge the author looked again, at 1280 × 720, at the program editor in a new game, the resource choice in a game with everything discovered and nothing solved, and the screen of a map run on Skraj lasu at minute 1 and minute 15, and found no defect of this change. The nine screenshots above lie in the public screenshots repository, in the directory of this cycle on its branch `loop2/pierwsza-mapa-bez-loterii`, in commits `ef28017dee3195447d2cc677e1f4056b1d60cbb1` and `914c60ae33de6d550d243237dc67bd32344bb137`.
- Form check of this description: `python -B .the-way/task-cycle/request_check.py .runs/task-cycles/pierwsza-mapa-bez-loterii/request.md --task .runs/task-cycles/pierwsza-mapa-bez-loterii/task.frozen.md`, FORMRUNS. Check of private paths on this description: `python -B .the-way/task-cycle/private_paths_check.py .runs/task-cycles/pierwsza-mapa-bez-loterii/request.md`, PPRUNS.
- The copy of the record, `docs/task-cycles/pierwsza-mapa-bez-loterii/`, was cleaned by one rewriting and checked: COPYRUNS

## Foundation entries

- D-397, projected: a new game opens Skraj lasu, and solving it opens Las.
- D-398, row 1: Skraj lasu is 4 × 4, entrance column 1 row 1, 25 °C, 5 minutes a step, no attacker and no cap, solved by a streak of 480; sticks and berries with density 1, no moss or fiber; tests may expect these numbers.
- `first-map-stock`, projected: every tile of Skraj lasu holds sticks and berries, whatever the seed.
- `first-map-balance`, row 2: from a game with everything discovered, the decent 12-rule program solves Skraj lasu in at least 95 % of several hundred map runs the test names, and the naive 6-rule program in at most 50 %.
- D-121, D-124, D-330, D-378 and D-388, as the task lists them, and D-19, the cycle's, found by the search of the foundation: corrected as item 4 says. The two new decisions were numbered D-396 and D-397 until the merge of main; they are D-397 and D-398 now.
- Invariant tests altered: the `save-version` cases in `tests/sim/saved-game.test.mjs` (version 5 refused, version 6 loads); no surface and no *Violated* mark changed.

## Minor findings

- Remaining after the fix, of its review: the header comment of `tests/sim/first-map-balance.test.mjs` says the naive program never leaves the entrance tile; true of the program as written, not asserted by any test.
- The four Minor findings of the whole-change review within the task were fixed (the saved-game test document, the editor's comment and test, the invariant's wording) or answered (the screenshot check); its review passed. The review of the merge found no Minor finding.

## Findings outside the task's scope

- The loader of the saved game accepts a version-6 list of solved maps that does not fit the order of opening (Las without Skraj lasu, Las — głębiej alone), as it already did for Las — głębiej without Las (`src/browser/sim/saved-game.ts:1214`): only a hand-edited save of a player's own account shows it. Reviewer: out of the task; "a one-line decision plus a test would settle it".
- The reasoning of D-136 („Las teaches keeping the loop going, Las — głębiej adds combat”) is now half the picture, since Skraj lasu is the first step; not false, and the task lists D-136 as checked and left. The review of the merge names it again, and names the wording of D-121 about moss and fiber, which task 10 rewrites.
- The sentence of D-325 that counts the maps was written for a game of two maps; the return step found it incomplete, not false, and left it.
- `guidelines/testing.md:111` gives as a bad example choosing the first map of the data and naming it `forest`; after this change the first map is `forestEdge`, so the example is still a bad one and needs no change.
- Seen in the browser, not a fault of this change: a new player's first minutes on Skraj lasu show „Czeka — żadna reguła nie pasuje” with „+ reguła” disabled until the first chill at minute 84, which is how the rules on the first minutes are written; task 10 changes it.

## Course of the cycle

- **Task and sources:** the task of the plan item "pierwsza-mapa-bez-loterii" (MVP2 task 9), accepted by you on 2026-11-13; project definition approved 2026-11-13; it depends on the done task "lokalny-start", and its wait for the code tidy-up before it was over, since that request merged first. Your remarks of 2026-11-14 on the request are the input of the correction: merge main and resolve the conflict; look at the program editor with nothing solved and the screen of a map run in a real browser, with screenshots; let items 2 and 3 of *Fix or let through* through (the reading of four decisions by one reviewer only, and the old gap under the rule on imports between parts, which waits as a task from the foundation review of 2026-11-13); items 4–9 accepted.
- **Process pin:** `55afa8e57aa1b83c77108576a36642722e0dda15`, unchanged by the task and the same on main; gate on the base `e54f23c0`: exit 0.
- **Spec:** none; the task left no open design choice.
- **Route:** one author without a plan, class `same` as the orchestrator, Claude Sonnet 5.5, since the change is one piece of data, a saved-game version, tests and entries in one part, with the foundation entries beside it; one review of the whole change by a fresh reviewer (`PASS`), one fix of its four Minor findings and its review (`PASS`), and a return step that committed nothing. For the correction: the author resumed for the merge and the screens, and a fresh reviewer for the merge (`PASS`); the gate on the merged tree. No discarded attempt.
- **Plan:** none.
- **Choices:** 9 choices in the questions table of the record: 3 settled by the orchestrator for the author (the identifier, the first place in the data, the number of seeds), 5 made by the author (the horizon of 5000 game minutes that defines „solved” in the balance test, the seeds named as real moments, the maps of the saved-game test document, the older version of the account screen test, and the resources the editor offers), and 1 forced by the merge (main's decision keeps its number, ours are renumbered).
- **Blocking findings left:** none.
- **Record:** [the record](https://github.com/mariusznazar/loop2/tree/RECORDSHA/docs/task-cycles/pierwsza-mapa-bez-loterii), by the SHA of the commit that adds it; the next commit removes it, so the target branch never holds it.
