**State: ready** — three items below wait for your answer; none of them blocks the merge.

## What you will see

Nothing a player sees changes: the screens, the messages and the trip list's number field take and refuse the same entries as before. The change tidies the code before the first new map arrives. Tests now pick a map, an item, a resource or a creature kind by its name, never by its place in the game's data, so a new map put first no longer breaks the 36 test files that picked the first map. Three functions that built screen parts and that no player ever reached are gone, and the one test that called two of them now draws those parts the way the game does. One parameter that no function read is gone from the program's rule pick in the simulation. The shared number field no longer knows the rules of the screens that use it; each screen hands it its own. The part of the map-run screen under the picture, with the tabs „Kronika” and „Teren”, got a name that says what it is now. The test helpers for a click and for a fired event stand in one place instead of in thirteen test files. The type check and the build now also check the simulation alone, against the plain JavaScript language: a use of the page, a timer or the console in it fails at compile time, in seconds. The testing guideline gained the rule about picking test data by name, with the first-map example as the bad case.

### Underneath

The simulation is now checked by the compiler in a third, check-only configuration beside the browser's and the server's, and the older Python test of the simulation's isolation stays whole beside it; the foundation records both, the kept function that only tests call, and the rule that a shared control imports no screen.

## For you to decide

### Needed from you

none

### Fix or let through

1. A new item placed first in the game's data would still break a few editor tests. When someone adds an item and puts it first, the editor offers it as the default of a new „Zapas poniżej” condition, so at least two editor cases (the acceptance case of the rule editor and the case that lists the offered items) fail, and one world test that picks the first lightable item by a property could pick the new item instead of the stick; they fail for the person adding the item, not for a player, and the task asked that tests pass wherever a new item stands. The cause is a product behaviour, not a pick the tests make: the editor takes the first item of the data as the default. Ways: (a) fix it in this request by making the editor's default an explicit item, which changes what the editor offers and is a game decision, plus a round of correction with its review, and the same behaviour shows up again for each later item; (b) make a task of it, which costs nothing now and leaves the cases as they are, since the next planned change adds a map and no item; (c) let it through, with the same effect as (b) and no task to remember it. The tests that state the whole content of the items fail for a new item on purpose, and the four Mapy-screen cases belong to the next task by this task's own scope. I recommend (b), since which item the editor offers first is a game decision, not a test fix. Fix it here, make a task of it, or let it through? (Findings outside the task's scope, 1–3)
2. The review of the whole change did not open about a dozen decisions whose titles touch the change. It read 20 decisions whole and ran through all 395 titles, but it named decisions about the shared controls, the tabs area, the rules of hooks and effects, and a few more as not opened, judging that the guidelines it read whole repeat what binds and that no behaviour changed. If one of them says something the change breaks, it would show up later as a review remark on the next change to these screens. A fresh reviewer reading them costs about one more review round (about ten to twenty minutes of agent time); letting it through costs nothing today. I recommend letting it through, since the guidelines that restate those decisions were read whole and the tests of every changed screen pass. Have them read in this request, or let it through? (Course of the cycle, Choices)
3. The foundation's log was not written the way the product requires, through the project skill that writes decisions. The author wrote the first entries by following the skill's own files and, after the review, edited two decisions (the rejected way of one and the rationale of the other) and the first wording of the harness decision by hand; it says the later correction of the harness decision went through the skill, which no file can confirm. The content passed two reviews and the foundation check shows no error, so the risk is a small wording or form slip that the skill's own checks would have caught, which a later reader would meet as an odd sentence. Redoing the entries and the three edits through the skill costs one more agent run and a review of its range; letting it through costs nothing. I recommend letting it through, since each entry and edit was reviewed against the decision template. Redo them through the skill, or let it through? (Foundation entries)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

4. The cycle widened or chose some things the task left to it. The removal of the unread map parameter went through the whole chain of functions that passed it on, not only the two places the task names, so eight public functions of the simulation lost that argument and about a hundred test calls and one invariant test were rewritten for it (the task's own source note says the parameter was passed on and read nowhere). The area under the picture is now called the tabs area, next to the world area; the click and fire helpers live in the existing test harness rather than a new file, in one form; and the shared number field takes its rule as a function from the screen. I did not take narrower ways: removing only the two named lines would have left the same unread parameter in nine other functions, and a separate helper module would have added an import to every test file. (Course of the cycle, Choices)
5. Two foundation entries came from the cycle, not from the task. The harness decision now says that the harness carries the click and fire helpers and that a test file of a screen keeps no copy of them, and the simulation-isolation rule now also derives from the new decision that pairs it with the compiler check. A reviewer noted that the harness sentence is a new rule next to an old decision, which by the template could be its own question with its own number; I kept it as an edit because it extends what the harness carries. (Foundation entries)
6. Two invariant tests changed. The new test of the simulation's type check plants uses of the page, a timer, the console and a copy function in a copy of the tree, requires both the type check and the build to refuse them with the compiler's error codes, and requires that the build writes no files beside the simulation's sources. The existing test of the simulation's inputs only lost the map argument at five call lines; what it checks is unchanged. (Foundation entries)

## Cost

About 1 hour 19 minutes of working time (37 minutes of it waiting for tools), 105.8 million tokens counted with cache reads, all on one model, Sonnet 5.5. The review of the whole change failed once and its findings were fixed in one round and reviewed; the review of the return step failed once and was fixed in one round and reviewed; the merge of the target branch was reviewed. The table of stages stands in the committed record: [stages](https://github.com/mariusznazar/loop2/blob/RECORD_SHA/docs/task-cycles/porzadki-przed-pierwsza-mapa/stages.md).

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record survives only then.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — trzy pozycje poniżej czekają na Twoją odpowiedź; żadna nie blokuje scalenia.

## Co zobaczysz

Nic, co widzi gracz, się nie zmienia: ekrany, komunikaty i pole liczby na liście wyprawy przyjmują i odrzucają te same wpisy co dotąd. Zmiana porządkuje kod przed pojawieniem się pierwszej nowej mapy. Testy wybierają teraz mapę, przedmiot, zasób albo rodzaj stworzenia po nazwie, nigdy po miejscu w danych gry, więc nowa mapa postawiona na początku nie wywróci już 36 plików testów, które brały pierwszą mapę. Trzy funkcje, które budowały części ekranu i do których nikt w grze nie docierał, zniknęły, a jedyny test, który wołał dwie z nich, rysuje te części tak jak gra. Z wyboru reguły programu w symulacji zniknął jeden parametr, którego żadna funkcja nie czytała. Wspólne pole liczby nie zna już reguł ekranów, które go używają; każdy ekran podaje mu własną. Część ekranu przejścia pod rysunkiem, z zakładkami „Kronika” i „Teren”, dostała nazwę, która mówi, czym jest dziś. Pomocniki testów do kliknięcia i wywołania zdarzenia stoją w jednym miejscu zamiast w trzynastu plikach testów. Sprawdzenie typów i budowanie sprawdzają teraz symulację osobno, według samego języka JavaScript: użycie strony, timera albo konsoli w niej jest błędem kompilacji, w kilka sekund. Wytyczne testów zyskały regułę o wyborze danych testu po nazwie, z przykładem pierwszej mapy jako złym przypadkiem.

### Pod spodem

Symulację sprawdza teraz kompilator w trzeciej konfiguracji, tylko sprawdzającej, obok konfiguracji przeglądarki i serwera, a starszy test izolacji symulacji w Pythonie zostaje obok w całości; fundament zapisuje oba, zachowaną funkcję, którą wołają tylko testy, i regułę, że wspólna kontrolka nie importuje ekranów.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

brak

### Popraw albo przepuść

1. Nowy przedmiot postawiony na początku danych gry nadal wywróciłby kilka testów edytora. Gdy ktoś doda przedmiot i postawi go pierwszy, edytor zaproponuje go jako domyślny w nowym warunku „Zapas poniżej”, więc co najmniej dwa przypadki edytora (przypadek akceptacyjny edytora reguł i przypadek wypisujący proponowane przedmioty) padną, a jeden test świata, który wybiera pierwszy przedmiot do rozpalenia po właściwości, mógłby wziąć nowy przedmiot zamiast patyka; padną osobie dodającej przedmiot, nie graczowi, a zadanie chciało, żeby testy przechodziły, gdziekolwiek stanie nowy przedmiot. Przyczyną jest zachowanie produktu, nie wybór w testach: edytor bierze pierwszy przedmiot z danych jako domyślny. Drogi: (a) poprawić w tym PR, robiąc domyślny przedmiot edytora jawnym, co zmienia to, co edytor proponuje, i jest decyzją o grze, plus runda poprawki z recenzją, a to samo zachowanie wróci przy każdym kolejnym przedmiocie; (b) zrobić z tego zadanie, co nic dziś nie kosztuje i zostawia przypadki, jak są, bo następna planowana zmiana dodaje mapę, nie przedmiot; (c) przepuścić, ze skutkiem jak (b) i bez zadania, które to przypomni. Testy, które podają całą zawartość przedmiotów, padają przy nowym przedmiocie celowo, a cztery przypadki ekranu Mapy należą do następnego zadania według jego własnego zakresu. Polecam (b), bo to, który przedmiot edytor proponuje pierwszy, jest decyzją o grze, nie poprawką testu. Poprawić tu, zrobić z tego zadanie czy przepuścić? (Uwagi poza zakresem zadania, 1–3)
2. Recenzja całej zmiany nie otworzyła kilkunastu decyzji, których tytuły dotykają zmiany. Przeczytała w całości 20 decyzji i przejrzała wszystkie 395 tytułów, ale wskazała decyzje o wspólnych kontrolkach, obszarze z zakładkami, regułach hooków i efektów i kilka innych jako nieotwarte, uznając, że wytyczne przeczytane w całości powtarzają to, co wiąże, i że żadne zachowanie się nie zmieniło. Gdyby któraś z nich mówiła coś, co zmiana łamie, wyszłoby to później jako uwaga przy następnej zmianie tych ekranów. Świeży recenzent czytający je kosztuje około jednej rundy recenzji więcej (około dziesięciu do dwudziestu minut pracy agenta); przepuszczenie nic dziś nie kosztuje. Polecam przepuścić, bo wytyczne powtarzające te decyzje przeczytano w całości, a testy każdego zmienionego ekranu przechodzą. Kazać je przeczytać w tym PR czy przepuścić? (Przebieg cyklu, Wybory)
3. Dziennika decyzji fundamentu nie zapisano tak, jak wymaga produkt, przez projektowy skill zapisujący decyzje. Autor pierwsze wpisy napisał, idąc za plikami skilla, a po recenzji poprawił ręcznie dwie decyzje (odrzuconą drogę jednej i uzasadnienie drugiej) oraz pierwsze brzmienie decyzji o stanowisku testów; późniejszą poprawkę tej decyzji, jak twierdzi, zrobił przez skill, czego żaden plik nie potwierdza. Treść przeszła dwie recenzje, a sprawdzenie fundamentu nie pokazuje błędu, więc ryzykiem jest drobna usterka brzmienia albo formy, którą wychwyciłyby własne kontrole skilla, a późniejszy czytelnik trafiłby na dziwne zdanie. Powtórzenie wpisów i trzech zmian przez skill kosztuje jeszcze jedno uruchomienie agenta i recenzję jego zakresu; przepuszczenie nic nie kosztuje. Polecam przepuścić, bo każdy wpis i każdą zmianę zrecenzowano względem szablonu decyzji. Powtórzyć je przez skill czy przepuścić? (Wpisy fundamentu)

### Akceptujesz przez scalenie

Scalenie przyjmuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

4. Cykl poszerzył albo wybrał rzeczy, które zadanie zostawiło jemu. Usunięcie nieczytanego parametru z mapą poszło przez cały łańcuch funkcji, które go przekazywały, nie tylko dwa miejsca, które wymienia zadanie, więc osiem publicznych funkcji symulacji straciło ten argument, a około stu wywołań w testach i jeden test niezmiennika przepisano (źródłowa notatka zadania mówi, że parametr był przekazywany dalej i nigdzie nie czytany). Część pod rysunkiem nazywa się teraz obszarem z zakładkami, obok obszaru świata; pomocniki kliknięcia i zdarzenia stoją w istniejącym stanowisku testów, nie w nowym pliku, w jednej postaci; a wspólne pole liczby dostaje regułę jako funkcję od ekranu. Nie wzięto węższych dróg: usunięcie tylko dwóch nazwanych linii zostawiłoby ten sam nieczytany parametr w dziewięciu innych funkcjach, a osobny moduł pomocników dołożyłby import do każdego pliku testów. (Przebieg cyklu, Wybory)
5. Dwa wpisy fundamentu pochodzą od cyklu, nie od zadania. Decyzja o stanowisku testów mówi teraz, że stanowisko niesie pomocniki kliknięcia i zdarzenia, a plik testów ekranu nie trzyma ich kopii, a reguła izolacji symulacji pochodzi teraz także z nowej decyzji, która łączy ją z kontrolą kompilatora. Recenzent zauważył, że zdanie o stanowisku to nowa reguła obok starej decyzji, która wg szablonu mogłaby być osobnym pytaniem z własnym numerem; zostawiłem ją jako zmianę, bo rozszerza to, co stanowisko niesie. (Wpisy fundamentu)
6. Zmieniły się dwa testy niezmienników. Nowy test sprawdzania typów symulacji wstawia w kopii drzewa użycia strony, timera, konsoli i funkcji kopiującej, wymaga, żeby sprawdzenie typów i budowanie je odrzuciły kodami błędów kompilatora, i żeby budowanie nie zapisywało plików obok źródeł symulacji. Istniejący test danych wejściowych symulacji tylko stracił argument z mapą w pięciu liniach wywołań; to, co sprawdza, się nie zmieniło. (Wpisy fundamentu)

## Koszt

Około 1 godziny 19 minut czasu pracy (z tego 37 minut czekania na narzędzia), 105,8 mln tokenów liczonych z odczytami z pamięci podręcznej, wszystko na jednym modelu, Sonnet 5.5. Recenzja całej zmiany raz nie przeszła, jej uwagi poprawiono w jednej rundzie i sprawdzono; recenzja kroku zwrotnego raz nie przeszła i też poprawiono ją w jednej rundzie z recenzją; scalenie gałęzi docelowej zrecenzowano. Tabela etapów stoi w zatwierdzonym zapisie: [etapy](https://github.com/mariusznazar/loop2/blob/RECORD_SHA/docs/task-cycles/porzadki-przed-pierwsza-mapa/stages.md).

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo tylko wtedy zostaje link do zapisu.

</details>

## Technical changes

The change is thirteen commits and one merge on top of the target branch, in this order.

- Items 3 and 5 of the task (`cc833e42`): `createTripPlan`, `createRuleList` and `createRulePanel`, their option and handle types and the style rule of the host nothing built are gone; `tests/view/rule-editor.test.mjs` draws the list and the panel through `RuleListView` and `RulePanelView`; `ReactNumberField` takes a required `rule: NumberRule` function and imports neither `program-editor.ts` nor `trip-editor.ts`; `trip-plan.tsx` passes `readTripCount`, `rule-panel.tsx` passes the range rule.
- Items 1 and 4 (`1ebd37e4`): 36 test files pick map, item, resource and creature kind by identifier; the unread map parameter leaves `conditionHolds`, `actionRefusal`, `actionFeasible`, `judgeProgram`, `chooseActivity`, `chooseCombatRule`, `pickActivity`, `resolveCombat` and the callers `startActivity` and `ruleSigns`; 111 test call sites were rewritten by a script and `tests/invariants/test_simulation_inputs.py` follows the signatures.
- Item 6 (`39179ee7`): `right-area.tsx` becomes `tabs-area.tsx` (`TabsArea`), with its test, the coding guideline's file table and one sentence of the styleguide.
- Item 7 (`e4151075`): `press` and `fire` stand once in `tests/view/page-document.mjs`, with three cases in `tests/view/page-document.test.mjs`; 13 test files import them.
- Item 2 (`abff7827`): the sentence and the bad example in `guidelines/testing.md`.
- Item 8 (`aa542f3f`): `tsconfig.sim.json`, its run first in `scripts/build.mjs`, and the invariant test `tests/invariants/test_simulation_type_check.py`.
- Foundation (`8e5af859`): D-393, D-394, D-395, the invariant `simulation-type-check`, the change to D-06 and the part map.
- Fix of the whole-change review (`e305ba3f`, `29d2ebe0`, `8c5d3d7b`, `b6b4bbff`): the item list of the program-editor cases is explicit; the comment and type of the number field and `readTripCount`; the rejected way of D-395 and the rationale of D-394; the test pins the build's `noEmit` and the error code of each refused name.
- Return step (`e8ea984a`) and its fix (`9e7f586e`): D-264 names `press` and `fire`.
- Merge of the target branch (`7d61f0f3`), no conflict.

The part you do not see changed: the removed parameter is a change of public signatures inside the simulation, which only tests and one other function of the simulation call. The one risk is a test or tool outside this repository calling those functions with the old argument; none is known.

## Checks

- The gate, `npm test`, on the final tree `7d61f0f3`: exit 0; 562 tests in 4 directories, every directory passed, 0 errors. On the base `6ab6a32b` it passed too (exit 0, 554 tests), so no check was failing before the change. No check failed or did not run in the gate.
- Own-work checks: the author named criterion 1 (the trip list's number field) and checked it with the existing trip-rule case, the trip-plan test and the same-tree cases, all passing; criterion 2 (a new map or item first in the data) it checked with a trial that put a made-up map and item first, which found 10 failing cases, read in the author's report; after the fix the program-editor file fails only one case with such an item. The fix author checked F1 with the same trial and M6 with a failing run without `noEmit`.
- The invariant test of the type check was seen failing (exit 1) before `tsconfig.sim.json` and passing (exit 0) after; the reviewer of the fix saw its new case fail again with `noEmit` removed. Planting `document`, `setTimeout`, `console` and `structuredClone` in a simulation file made `npm run typecheck` exit 1 with four errors, and the real code exits 0.
- A mutation run (StrykerJS) on the changed simulation files by the reviewer: 328 mutants, 308 killed, 17 survived, 2 not covered, score 94.21; none of the surviving mutants lies in a line this change opened.
- User-interface states: no screen's drawing, class or value changed; no screenshot was taken, nothing visible changed.
- The form check of this description: RUN_FORM; the check of private paths on it: RUN_PRIVATE; on the record's copy: RUN_COPY; the image check on the copy: RUN_IMAGE; the remarks check on the original (exit 1 first, 18 items appended, then exit 0, 2 runs) and on the copy: RUN_REMARKS_COPY.

## Foundation entries

- D-393 (`row 1`): the compiler, under a configuration of its own with the library of the language alone, and the test of the simulation's isolation, kept whole, guard the simulation together, and neither is shortened because of the other.
- D-394 (`row 2`): `actionFeasible` stays in the simulation because tests use it to observe whether an action is allowed.
- Invariant `simulation-type-check` (`row 3`): the simulation's files are type-checked under a configuration of their own that covers all of them, holds the library of the language alone and no ambient types, and that `npm run typecheck` and `npm run build` run.
- D-395 (`row 4`): a shared control imports no module of a screen that uses it and takes a rule that belongs to one screen from that screen.
- D-06 (the change the task names): the build type-checks the simulation under a third configuration that emits nothing, besides compiling the browser and server ones.
- Part map `build-tools` (`row 3`, the task's part-map line): claims `tsconfig.sim.json` and `tests/invariants/test_simulation_type_check.py`.
- `simulation-isolation` (`the cycle's`): its *Derives from* gains D-393; its sentence and test are unchanged.
- D-264 (`the cycle's`): the harness carries `press`, which clicks inside `act`, and `fire`, which only sends the event, and a test file of a screen keeps no copy of either.
- Changed invariant tests: `tests/invariants/test_simulation_type_check.py` is new and `tests/invariants/test_simulation_inputs.py` follows the new signatures. No surface changed and no *Violated* mark was set or cleared.
- The entries were not written through `the-way-record-decision` as `AGENTS.md` requires: the first ones by an agent following the skill's files, and the later edits of D-394, D-395 and the first edit of D-264 by hand (item 3 above).

## Minor findings

- The *Rejected* line of D-395 speaks of the source and of the earlier state of the code ("as `rule="trip"` did — the source keeps no cost or reason beside it"), where the template says *Rejected* describes the decision as it stands; the control still has a parameter named `rule`, now a function. The reviewer suggests one rewording. (Review of the fix, N1, `foundations/decisions.md`, D-395.)
- The new rule in D-264 may by the template be a new question with its own number, as D-268 answers the same kind of question; the reviewer finds keeping it as an edit defensible and leaves the choice to you at the merge. (Review of the return step, Minor 1, `foundations/decisions.md`, D-264.)
- One *Rationale* line of D-264 is about 116 characters where the rest of the entry wraps near 100. (Review of the fix of the return step, `foundations/decisions.md`, D-264.)

## Findings outside the task's scope

1. The editor's default for a new „Zapas poniżej” condition is the first item of the data, so the rule-editor acceptance case and the program-editor case that lists the offered items fail for a new item first. (Review of the whole change, O1, `tests/view/rule-editor.test.mjs`, `tests/view/program-editor.test.mjs:1208`.)
2. Four cases of the Mapy screen and the account screen list every open map, so a new open map first in the data changes them; the task leaves the order of that list to the next task. (O2, `tests/view/maps-screen.test.mjs`, `tests/view/account-screen.test.mjs`.)
3. `tests/sim/world.test.mjs:25` picks the lightable item by a property, not by position, but a new lightable item before the stick would make it pick that item while the file asserts it is the stick; naming `"stick"` and asserting it is lightable would not depend on the order. (M7.) The cases that state the whole content of the items and resources in `tests/sim/data.test.mjs` fail for a new item by design (O3).

No check outside the task's parts failed and passed again.

## Course of the cycle

- **Task and sources:** the task's goal is to tidy the code before the first new map; its relation is independent; it used the task note frozen on 2026-11-14 (state of 2026-11-13) and the analysis the note cites, read at commit `7846213c` by the author and reviewers where they cite it.
- **Process pin:** `55afa8e57aa1b83c77108576a36642722e0dda15`, not moved.
- **Spec:** none; the task leaves no open design choice, and the two questions it carries to the cycle are choices of how to make what it settles.
- **Route:** one author without a plan, since the change is mostly mechanical and fits one agent; no discarded attempt.
- **Plan:** none.
- **Choices:** 7 questions and autonomous choices, in the questions table of the record (`cycle.md`); the author's four choices and the answer on criterion 2 stand among them.
- **Blocking findings left:** none.
- **Record:** [the record](https://github.com/mariusznazar/loop2/tree/RECORD_SHA/docs/task-cycles/porzadki-przed-pierwsza-mapa).
