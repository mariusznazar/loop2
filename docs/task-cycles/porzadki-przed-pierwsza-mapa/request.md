**State: ready** — corrected for your remarks; nothing below waits for your answer.

## What you will see

Nothing a player sees changes: the screens, the messages and the trip list's number field take and refuse the same entries as before. The change tidies the code before the first new map arrives. Tests now pick a map, an item, a resource or a creature kind by its name, never by its place in the game's data, so a new map put first no longer breaks the 36 test files that picked the first map. Three functions that built screen parts and that no player ever reached are gone, and the one test that called two of them now draws those parts the way the game does. One parameter that no function read is gone from the program's rule pick in the simulation. The shared number field no longer knows the rules of the screens that use it; each screen hands it its own. The part of the map-run screen under the picture, with the tabs „Kronika” and „Teren”, got a name that says what it is now. The test helpers for a click and for a fired event stand in one place instead of in thirteen test files. The type check and the build now also check the simulation alone, against the plain JavaScript language: a use of the page, a timer or the console in it fails at compile time, in seconds. The testing guideline gained the rule about picking test data by name, with the first-map example as the bad case.

### Underneath

The simulation is now checked by the compiler in a third, check-only configuration beside the browser's and the server's, and the older Python test of the simulation's isolation stays whole beside it; the foundation records both, the kept function that only tests call, and the rule that a shared control imports no screen.

## For you to decide

### Needed from you

none

### Fix or let through

none

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

1. The cycle widened or chose some things the task left to it. The removal of the unread map parameter went through the whole chain of functions that passed it on, not only the two places the task names, so eight public functions of the simulation lost that argument and about a hundred test calls and one invariant test were rewritten for it (the task's own source note says the parameter was passed on and read nowhere). The area under the picture is now called the tabs area, next to the world area; the click and fire helpers live in the existing test harness rather than a new file, in one form; and the shared number field takes its rule as a function from the screen. I did not take narrower ways: removing only the two named lines would have left the same unread parameter in nine other functions, and a separate helper module would have added an import to every test file. (Course of the cycle, Choices)
2. Two foundation entries came from the cycle, not from the task. The harness decision now says that the harness carries the click and fire helpers and that a test file of a screen keeps no copy of them, and the rule that keeps the simulation isolated now also derives from the new decision that pairs it with the compiler check. A reviewer noted twice, as a small remark, that the harness sentence is a new rule next to an old decision, which by the template could be its own question with its own number; I kept it as an edit because it extends what the harness carries. (Foundation entries, Minor findings)
3. Two invariant tests changed. The new test of the simulation's type check plants uses of the page, a timer, the console and a copy function in a copy of the tree, requires both the type check and the build to refuse them with the compiler's error codes, and requires that the build writes no files beside the simulation's sources. The existing test of the simulation's inputs only lost the map argument at five call lines; what it checks is unchanged. (Foundation entries)
4. The correction you asked for ran as far as it could. A fresh reviewer read whole the twenty-two decisions the first review had left unread or read in part and found none of them broken by the change. The checks of the decision skill, which are the decisions template and rules read by hand plus the foundation check, flagged two lines, and they were reworded: one claimed the compiler's refusal comes "within seconds" with no measurement behind it, the other named the earlier state of the code in the rejected way. The skill has no tool that writes, so the agent typed the two lines itself, in the skill's form; the earlier hand edits were left as they stood since the checks flagged nothing in them. The decision about the editor's default item stays out of this request, as you wrote. (Course of the cycle, Route)

## Cost

About 1 hour 33 minutes of working time (43 minutes of it waiting for tools), 129.2 million tokens counted with cache reads, all on one model, Sonnet 5.5. The review of the whole change failed once and its findings were fixed in one round and reviewed; the review of the return step failed once and was fixed in one round and reviewed; the merge of the target branch was reviewed; your correction took a reading review and a review of its one fix, both passed. The table of stages stands in the committed record: [stages](https://github.com/mariusznazar/loop2/blob/0000000000000000000000000000000000000000/docs/task-cycles/porzadki-przed-pierwsza-mapa/stages.md).

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record survives only then.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — poprawione według Twoich uwag; nic poniżej nie czeka na Twoją odpowiedź.

## Co zobaczysz

Nic, co widzi gracz, się nie zmienia: ekrany, komunikaty i pole liczby na liście wyprawy przyjmują i odrzucają te same wpisy co dotąd. Zmiana porządkuje kod przed pojawieniem się pierwszej nowej mapy. Testy wybierają teraz mapę, przedmiot, zasób albo rodzaj stworzenia po nazwie, nigdy po miejscu w danych gry, więc nowa mapa postawiona na początku nie wywróci już 36 plików testów, które brały pierwszą mapę. Trzy funkcje, które budowały części ekranu i do których nikt w grze nie docierał, zniknęły, a jedyny test, który wołał dwie z nich, rysuje te części tak jak gra. Z wyboru reguły programu w symulacji zniknął jeden parametr, którego żadna funkcja nie czytała. Wspólne pole liczby nie zna już reguł ekranów, które go używają; każdy ekran podaje mu własną. Część ekranu przejścia pod rysunkiem, z zakładkami „Kronika” i „Teren”, dostała nazwę, która mówi, czym jest dziś. Pomocniki testów do kliknięcia i wywołania zdarzenia stoją w jednym miejscu zamiast w trzynastu plikach testów. Sprawdzenie typów i budowanie sprawdzają teraz symulację osobno, według samego języka JavaScript: użycie strony, timera albo konsoli w niej jest błędem kompilacji, w kilka sekund. Wytyczne testów zyskały regułę o wyborze danych testu po nazwie, z przykładem pierwszej mapy jako złym przypadkiem.

### Pod spodem

Symulację sprawdza teraz kompilator w trzeciej konfiguracji, tylko sprawdzającej, obok konfiguracji przeglądarki i serwera, a starszy test izolacji symulacji w Pythonie zostaje obok w całości; fundament zapisuje oba, zachowaną funkcję, którą wołają tylko testy, i regułę, że wspólna kontrolka nie importuje ekranów.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

brak

### Popraw albo przepuść

brak

### Akceptujesz przez scalenie

Scalenie przyjmuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

1. Cykl poszerzył albo wybrał rzeczy, które zadanie zostawiło jemu. Usunięcie nieczytanego parametru z mapą poszło przez cały łańcuch funkcji, które go przekazywały, nie tylko dwa miejsca, które wymienia zadanie, więc osiem publicznych funkcji symulacji straciło ten argument, a około stu wywołań w testach i jeden test niezmiennika przepisano (źródłowa notatka zadania mówi, że parametr był przekazywany dalej i nigdzie nie czytany). Część pod rysunkiem nazywa się teraz obszarem z zakładkami, obok obszaru świata; pomocniki kliknięcia i zdarzenia stoją w istniejącym stanowisku testów, nie w nowym pliku, w jednej postaci; a wspólne pole liczby dostaje regułę jako funkcję od ekranu. Nie wzięto węższych dróg: usunięcie tylko dwóch nazwanych linii zostawiłoby ten sam nieczytany parametr w dziewięciu innych funkcjach, a osobny moduł pomocników dołożyłby import do każdego pliku testów. (Przebieg cyklu, Wybory)
2. Dwa wpisy fundamentu pochodzą od cyklu, nie od zadania. Decyzja o stanowisku testów mówi teraz, że stanowisko niesie pomocniki kliknięcia i zdarzenia, a plik testów ekranu nie trzyma ich kopii, a reguła izolacji symulacji pochodzi teraz także z nowej decyzji, która łączy ją z kontrolą kompilatora. Recenzent dwa razy zauważył, jako drobną uwagę, że zdanie o stanowisku to nowa reguła obok starej decyzji, która wg szablonu mogłaby być osobnym pytaniem z własnym numerem; zostawiłem ją jako zmianę, bo rozszerza to, co stanowisko niesie. (Wpisy fundamentu, Drobne uwagi)
3. Zmieniły się dwa testy niezmienników. Nowy test sprawdzania typów symulacji wstawia w kopii drzewa użycia strony, timera, konsoli i funkcji kopiującej, wymaga, żeby sprawdzenie typów i budowanie je odrzuciły kodami błędów kompilatora, i żeby budowanie nie zapisywało plików obok źródeł symulacji. Istniejący test danych wejściowych symulacji tylko stracił argument z mapą w pięciu liniach wywołań; to, co sprawdza, się nie zmieniło. (Wpisy fundamentu)
4. Poprawka, o którą prosiłeś, poszła tak daleko, jak się dało. Świeży recenzent przeczytał w całości dwadzieścia dwie decyzje, które pierwsza recenzja zostawiła nieotwarte albo przeczytane częściowo, i nie znalazł żadnej złamanej przez zmianę. Kontrole skilla decyzji, czyli szablon i reguły decyzji przeczytane ręcznie oraz sprawdzenie fundamentu, wskazały dwie linie i przepisano je: jedna twierdziła, że kompilator odrzuca użycie „w kilka sekund”, bez pomiaru, druga w odrzuconej drodze wspominała dawny stan kodu. Skill nie ma narzędzia, które zapisuje, więc agent wpisał te dwie linie sam, w formie skilla; wcześniejsze ręczne zmiany zostały, bo kontrole niczego w nich nie wskazały. Decyzja o domyślnym przedmiocie edytora zostaje poza tym PR, jak napisałeś. (Przebieg cyklu, Trasa)

## Koszt

Około 1 godziny 33 minut czasu pracy (z tego 43 minuty czekania na narzędzia), 129,2 mln tokenów liczonych z odczytami z pamięci podręcznej, wszystko na jednym modelu, Sonnet 5.5. Recenzja całej zmiany raz nie przeszła, jej uwagi poprawiono w jednej rundzie i sprawdzono; recenzja kroku zwrotnego raz nie przeszła i też poprawiono ją w jednej rundzie z recenzją; scalenie gałęzi docelowej zrecenzowano; Twoja korekta wymagała recenzji czytającej i recenzji jednej poprawki, obie przeszły. Tabela etapów stoi w zatwierdzonym zapisie: [etapy](https://github.com/mariusznazar/loop2/blob/0000000000000000000000000000000000000000/docs/task-cycles/porzadki-przed-pierwsza-mapa/stages.md).

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
- Correction for your remarks (`d7cddb27`): D-393's *Rationale* no longer states an unmeasured bound ("within seconds of a change") and D-395's *Rejected* no longer names the earlier state of the code; two single lines of `foundations/decisions.md`.

The part you do not see changed: the removed parameter is a change of public signatures inside the simulation, which only tests and one other function of the simulation call. The one risk is a test or tool outside this repository calling those functions with the old argument; none is known.

## Checks

- The gate, `npm test`, on the final tree `d7cddb27` (after the correction): exit 0; 562 tests in 4 directories, every directory passed, 0 errors. On the tree `7d61f0f3` before the correction it passed too (exit 0, 562 tests), and on the base `6ab6a32b` (exit 0, 554 tests), so no check was failing before the change. No check failed or did not run in any gate run.
- Own-work checks: the author named criterion 1 (the trip list's number field) and checked it with the existing trip-rule case, the trip-plan test and the same-tree cases, all passing; criterion 2 (a new map or item first in the data) it checked with a trial that put a made-up map and item first, which found 10 failing cases, read in the author's report; after the fix the program-editor file fails only one case with such an item. The fix author checked F1 with the same trial and M6 with a failing run without `noEmit`.
- The invariant test of the type check was seen failing (exit 1) before `tsconfig.sim.json` and passing (exit 0) after; the reviewer of the fix saw its new case fail again with `noEmit` removed. Planting `document`, `setTimeout`, `console` and `structuredClone` in a simulation file made `npm run typecheck` exit 1 with four errors, and the real code exits 0.
- A mutation run (StrykerJS) on the changed simulation files by the reviewer: 328 mutants, 308 killed, 17 survived, 2 not covered, score 94.21; none of the surviving mutants lies in a line this change opened.
- User-interface states: no screen's drawing, class or value changed; no screenshot was taken, nothing visible changed.
- Form check of this description, `python -B .the-way/task-cycle/request_check.py .runs/task-cycles/porzadki-przed-pierwsza-mapa/request.md --task .runs/task-cycles/porzadki-przed-pierwsza-mapa/task.md`: last run exit 0 (2 runs, both exit 0). Check of private paths on the description, `python -B .the-way/task-cycle/private_paths_check.py .runs/task-cycles/porzadki-przed-pierwsza-mapa/request.md`: last run exit 0 (2 runs, both exit 0).
- On the committed copy of the record: check of private paths, `python -B .the-way/task-cycle/private_paths_check.py docs/task-cycles/porzadki-przed-pierwsza-mapa`: last run exit 0 (`checked: 26 files, 0 listed`); its first runs, on the copy before the cleaning, exit 1 with 22 places listed, which the cleaning rewrote; 4 runs. Image check, `python -B .the-way/task-cycle/image_files_check.py docs/task-cycles/porzadki-przed-pierwsza-mapa`: exit 0, 0 listed, 3 runs. Remarks check, `python -B .the-way/task-cycle/remarks_check.py docs/task-cycles/porzadki-przed-pierwsza-mapa`: exit 0 (`checked: 9 reports, 18 items other than none, 0 not in the process remarks`), 3 runs; on the original it ran twice, exit 1 with 18 items listed and then exit 0 after they were appended word for word.
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
- The entries were not written through `the-way-record-decision` as `AGENTS.md` requires: the first ones by an agent following the skill's files, and the later edits of D-394, D-395 and the first edit of D-264 by hand. After your remark 3 the skill was invoked and its checks (the template and `rules.md` read by hand, and `python -B .the-way/elements/common/foundation_check.py`, exit 0) ran over D-393, D-394, D-395, D-06 and D-264; they flagged D-393's *Rationale* and D-395's *Rejected*, redone in `d7cddb27`, and nothing in the other three. The skill has no tool that writes, so the two lines were typed by the author in its form.

## Minor findings

- The new rule in D-264 may by the template be a new question with its own number, as D-268 answers the same kind of question; two reviewers find keeping it as an edit defensible, and the author reads the sentence as part of D-264's one question. (Review of the return step, Minor 1; review of the correction, Minor 1; `foundations/decisions.md`, D-264.)
- A *Rationale* clause of D-264 ("no test file keeps a copy") restates the binding sentence in prose; it is the tail of a reason, so the harm is small. (Review of the correction, Minor 2, `foundations/decisions.md`, D-264.)
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
- **Route:** one author without a plan, since the change is mostly mechanical and fits one agent; no discarded attempt; the cycle was then corrected once for your remarks ([the comment](https://github.com/mariusznazar/loop2/pull/93#issuecomment-6869958931)), from the head `76fb7bcb` with no reset: remark 1 (make a task of the editor default) asked for nothing in this request; remark 2 ran as a reading review of 22 decisions (`PASS`); remark 3 ran as the checks of the decision skill over the five decisions the cycle wrote or changed, with the two flagged lines redone in `d7cddb27` and reviewed (`PASS`); remarks 4–6 were accepted.
- **Plan:** none.
- **Choices:** 7 questions and autonomous choices, in the questions table of the record (`cycle.md`); the author's four choices and the answer on criterion 2 stand among them, and your answers on the editor default, the unread decisions and the hand-written entries are in the correction's events.
- **Blocking findings left:** none.
- **Record:** [the record](https://github.com/mariusznazar/loop2/tree/0000000000000000000000000000000000000000/docs/task-cycles/porzadki-przed-pierwsza-mapa).
