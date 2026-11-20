**State: draft** — the final gate, the CI run, has not ended yet; nothing below waits for your answer before it does, and three items under "Fix or let through" ask whether to do something more in this request.

## What you will see

The tool that measures the game's balance now has its own place in the rules for writing code. An agent that adds or changes a file of that tool is told which file to imitate (its engine, the file that plays one map run from a seed and sums up many of them) and which rules bind it: play a map run with the game's own functions, import only from the tool and the simulation, keep the reference programs in their one file, take a number of the game from the built game, keep a shared number or helper in one file, let only the command line write files, and never read the system clock or draw from any source but the seed.

Two of those rules now have an automatic check each, so a change that breaks them stops the tests: "only the command line writes files" and "no clock and no randomness outside the seed". The rest stay with the reviewer of each change.

The four things that stood in several files of the tool at once — the time limit of a map run, the name of how a run ended, the average of a list and the number of milliseconds in a minute — now stand in one file each and the other files take them from there. The tool prints exactly what it printed before; the cycle compared 12 commands of it before and after, byte for byte, and the review compared 6 more.

### Underneath

The change adds one rules file for the new kind of code and one row for it in the index of kinds, one decision that names the engine as the model file, two invariants with a test each, a few lines in the part map, and a small refactor of four files of the tool.

## For you to decide

### Needed from you

none

### Fix or let through

1. Two small gaps are left in the new automatic check of the clock and randomness. Its description says it catches the clock and the random functions when they are taken out as a value anywhere, but it misses a few forms — for example a value put into an object, an array, a returned value or a conditional — and nothing says so. It is also stricter than the rule it checks: it flags a few harmless uses, such as a date format that is given a date, and nobody is told. Today no file of the tool is affected. Whoever writes a new measuring mode later could be stopped by a harmless flag, or could slip a clock read past the check through one of the missed forms. Fixing it in this request costs one correction with one more review and a small edit of the check's description or its patterns; undoing it costs nothing. Making a task of it leaves the wording as it is until some later change meets it. Letting it through accepts the same risk; undoing it later costs a small change. I recommend letting it through, since no file is hit today and the gap is in the description more than in the gate. Its weak point: the next tasks that change the tool are the first to meet a false flag. Fix it in this request, make a task of it, or let it through? (Minor findings, 2 and 3)
2. The code that cuts comments and strings out of a source before the new checks read it now stands in two copies in the tests of this repository, and a third, different one is used by a simulation test. A fix to one copy does not reach the others. One shared copy needs changes in three tests of the simulation and one helper file, which this task does not own. If the copies drift apart, one check could read a file differently from another. Doing it in this request costs a correction with one review and changes files outside this task's tests; undoing it costs another correction. Making a task of it costs a later session. Letting it through leaves three copies. I recommend making a task of it, since the change reaches the checks of the simulation. Its weak point: until then each fix of a reading error has to be made three times. Do it in this request, make a task of it, or let it through? (Minor findings, 1)
3. Two checks the task asked for are only partly done. A campaign run that ends at its time limit gives the same output before and after the change, but the campaign never prints how a run ended, so the comparison cannot show that the outcome inside that branch is the same — only that nothing printed changed. The full-size map check (500 seeds, all programs, about a minute) was run only in a narrowed form, which goes through the same two code paths. If the outcome name were wrong in the campaign, the output would not show it, and the campaign's own tests would catch only part of it. Printing the outcome would change the tool's output, which this task forbids, so it cannot be done in this request. Making a task of it costs a later session; letting it through accepts a risk that is small, because the outcome name is now one shared piece of code that the engine's own comparison test already checks. Make a task of it? (Checks, 3)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

4. The decision that names the engine as the model file carries a pair of examples that you did not see in the task: one says what a rules file for the tool must do to follow it (name the selected model file, list each file of code of the tool in its table, leave the overlay and player description files out), the other says what breaks it (a second model file; a row for an overlay file or a player description). I added them so that later changes have something to compare with; the other way was to leave that part of the decision without examples. (Foundation entries, 1)
5. The description of the part that holds the tool now says that its tests also keep the tool from writing files outside its command line and from reading the clock, and three test files were added to that part: the two new checks and the small shared reader they use. The reader is a helper that no row of the task names; it had to belong to some part and belongs to the one it serves. The other way was to put the checks in the tool's own test folder, which would have needed no map change but a third copy of the comment-cutting code in another language. (Foundation entries, 5)
6. One sentence of the new rules file is the cycle's own and is no row of the task: a shared thing stands in a file that the files needing it already import, so that no import cycle arises. It gives the rule of "one place" a way to choose the place; without it the rule would not say where a new shared number goes. (Foundation entries, 6)
7. The cycle chose where each of the four shared things now stands: the time limit, the outcome name and the average in the engine file, and the milliseconds in a minute in the file of the earning loop. The reason is that every file that needs them already imported those files, so no import cycle appears. The other ways were the loop file for the average (one file would gain an import it does not have) and a new file for the four (a ninth file for a few lines). (Course of the cycle, Choices)
8. Two new automatic checks and what they miss: the first stops any file of the tool but its command line from writing a file or creating a folder; the second stops any file of the tool from reading the system clock or drawing from a source other than the seed. The second one misses a generator written from scratch, a clock reached by a name built while the program runs, one handed in from outside the file, and a method that reads the current moment under no known name; the reviewer of each change keeps those. Neither invariant is marked violated and the foundation check lists no invariant for a corrected sentence. (Foundation entries, 2 and 3)

## Cost

About 35 minutes of working time in all, 49 million tokens counted with cached input (35 million on the orchestrator's and author's model, 14 million on the strongest model, which ran every review), two reviews of the whole change — one failed, one passed on the fix — and one fix round. The table of stages is in the record, `docs/task-cycles/wzorzec-kodu-przyrzadu/stages.md` of the record's commit linked below. No working copy is left behind and no directory of an earlier task is kept.

## How to merge

Merge with a merge commit, which keeps the commits, since the link to the record survives only then. Nothing about a review of the foundation is due.

<details>
<summary>Po polsku</summary>

**Stan: wersja robocza** — końcowa bramka, czyli bieg CI, jeszcze się nie skończyła; niczego poniżej nie trzeba rozstrzygać, zanim się skończy, a trzy punkty w „Popraw albo przepuść” pytają, czy zrobić jeszcze coś w tej prośbie.

## Co zobaczysz

Narzędzie, które mierzy balans gry, ma teraz własne miejsce w zasadach pisania kodu. Agent, który dopisuje albo zmienia plik tego narzędzia, wie, który plik naśladować (silnik: plik, który rozgrywa jedno przejście mapy z ziarna i podsumowuje wiele takich przejść) i jakie reguły go wiążą: przejście mapy rozgrywać funkcjami gry, importować tylko z narzędzia i symulacji, programy wzorcowe trzymać w ich jednym pliku, liczbę gry brać ze zbudowanej gry, wspólną liczbę albo funkcję pomocniczą trzymać w jednym pliku, pozwolić zapisywać pliki tylko wierszowi poleceń i nigdy nie czytać zegara systemowego ani nie losować spoza ziarna.

Dwie z tych reguł mają teraz po jednym automatycznym sprawdzeniu, więc zmiana, która je łamie, zatrzymuje testy: „pliki zapisuje tylko wiersz poleceń” i „żadnego zegara ani losowości poza ziarnem”. Resztę dalej pilnuje recenzent każdej zmiany.

Cztery rzeczy, które stały w kilku plikach narzędzia naraz — limit czasu przejścia mapy, nazwa tego, jak przejście się skończyło, średnia z listy i liczba milisekund w minucie — stoją teraz po jednej w jednym pliku, a pozostałe pliki biorą je stamtąd. Narzędzie wypisuje dokładnie to, co wypisywało wcześniej; cykl porównał 12 jego poleceń przed zmianą i po niej, bajt w bajt, a recenzja dołożyła 6 kolejnych.

### Pod spodem

Zmiana dodaje plik reguł dla nowego rodzaju kodu i jego wiersz w indeksie rodzajów, jedną decyzję, która wskazuje silnik jako wzorzec, dwa niezmienniki z testem każdy, kilka linii w mapie części oraz drobną zmianę w czterech plikach narzędzia.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

none

### Popraw albo przepuść

1. W nowym automatycznym sprawdzeniu zegara i losowości zostały dwie drobne luki. Opis mówi, że sprawdzenie łapie zegar i funkcje losowe wzięte jako wartość gdziekolwiek, ale pomija kilka form — na przykład wartość włożoną do obiektu, do tablicy, zwracaną albo użytą w warunku — i nic o tym nie mówi. Jest też ostrzejsze niż reguła, którą sprawdza: oznacza kilka niewinnych użyć, na przykład format daty, któremu podano datę, i nikt o tym nie wie. Dziś żaden plik narzędzia tego nie dotyczy. Kto napisze później nowy tryb pomiaru, może zostać zatrzymany niewinną flagą albo przemycić odczyt zegara przez jedną z pominiętych form. Poprawa w tej prośbie kosztuje jedną korektę z jeszcze jedną recenzją i małą zmianę opisu albo wzorców sprawdzenia; cofnięcie nic nie kosztuje. Zadanie na to zostawia sformułowanie bez zmian, aż jakaś późniejsza zmiana na nie trafi. Przepuszczenie przyjmuje to samo ryzyko; cofnięcie później kosztuje małą zmianę. Polecam przepuścić, bo dziś żaden plik nie jest dotknięty, a luka jest raczej w opisie niż w bramce. Słaby punkt: najbliższe zadania, które zmieniają narzędzie, jako pierwsze trafią na fałszywą flagę. Poprawić w tej prośbie, zrobić z tego zadanie, czy przepuścić? (Minor findings, 2 i 3)
2. Kod, który wycina komentarze i napisy ze źródła, zanim przeczytają je nowe sprawdzenia, stoi teraz w dwóch kopiach w testach tego repozytorium, a trzecia, inna, służy testowi symulacji. Poprawka jednej kopii nie dociera do pozostałych. Jedna wspólna kopia wymaga zmian w trzech testach symulacji i jednym pliku pomocniczym, których to zadanie nie ma w zakresie. Gdy kopie się rozjadą, jedno sprawdzenie może czytać plik inaczej niż drugie. Zrobienie tego w tej prośbie kosztuje korektę z jedną recenzją i zmienia pliki spoza testów tego zadania; cofnięcie kosztuje kolejną korektę. Zadanie na to kosztuje późniejszą sesję. Przepuszczenie zostawia trzy kopie. Polecam zrobić z tego zadanie, bo zmiana sięga sprawdzeń symulacji. Słaby punkt: do tego czasu każdą poprawkę błędu czytania trzeba robić trzy razy. Zrobić w tej prośbie, zrobić z tego zadanie, czy przepuścić? (Minor findings, 1)
3. Dwa sprawdzenia, o które prosiło zadanie, są zrobione tylko po części. Przejście kampanii zakończone na limicie czasu daje to samo wyjście przed zmianą i po niej, ale kampania nigdy nie wypisuje, jak przejście się skończyło, więc porównanie pokazuje tylko, że nic wypisanego się nie zmieniło, a nie że wynik w tej gałęzi jest ten sam. Pełne sprawdzenie mapy (500 ziaren, wszystkie programy, około minuty) puszczono tylko w zawężonej postaci, która idzie tymi samymi dwiema ścieżkami kodu. Gdyby nazwa wyniku w kampanii była błędna, wyjście by tego nie pokazało, a własne testy kampanii wyłapałyby tylko część. Wypisanie wyniku zmieniłoby wyjście narzędzia, czego to zadanie zakazuje, więc nie da się tego zrobić w tej prośbie. Zadanie na to kosztuje późniejszą sesję; przepuszczenie przyjmuje ryzyko małe, bo nazwa wyniku jest teraz jednym wspólnym kawałkiem kodu, który sprawdza już test zgodności silnika. Zrobić z tego zadanie? (Checks, 3)

### Akceptujesz przez scalenie

Scalenie przyjmuje te punkty; jeśli któryś Ci nie odpowiada, powiedz który.

4. Decyzja, która wskazuje silnik jako wzorzec, niesie parę przykładów, której nie widziałeś w zadaniu: jeden mówi, co musi zrobić plik reguł dla narzędzia, żeby ją spełniać (wskazać wybrany wzorzec, wymienić w tabeli każdy plik kodu narzędzia, pominąć pliki nakładek i opisów graczy), drugi — co ją łamie (drugi wzorzec; wiersz dla pliku nakładki albo opisu gracza). Dopisałem je, żeby późniejsze zmiany miały z czym się porównać; drugą drogą było zostawienie tej części decyzji bez przykładów. (Foundation entries, 1)
5. Opis części, która trzyma narzędzie, mówi teraz, że jej testy pilnują też, żeby narzędzie nie zapisywało plików poza wierszem poleceń i nie czytało zegara, a do części dopisano trzy pliki testowe: dwa nowe sprawdzenia i mały wspólny czytnik, którego używają. Czytnik jest plikiem pomocniczym, którego żaden wiersz zadania nie wymienia; musiał należeć do jakiejś części i należy do tej, której służy. Drugą drogą było umieszczenie sprawdzeń w katalogu testów samego narzędzia, co nie wymagałoby zmiany mapy, ale dałoby trzecią kopię kodu wycinającego komentarze, w innym języku. (Foundation entries, 5)
6. Jedno zdanie nowego pliku reguł jest własne cyklu i nie jest wierszem zadania: wspólna rzecz stoi w pliku, który pliki jej potrzebujące już importują, żeby nie powstał cykl importów. Daje regule „jednego miejsca” sposób wyboru miejsca; bez niego reguła nie mówiłaby, gdzie trafia nowa wspólna liczba. (Foundation entries, 6)
7. Cykl wybrał, gdzie stoi teraz każda z czterech wspólnych rzeczy: limit czasu, nazwa wyniku i średnia w pliku silnika, a milisekundy w minucie w pliku pętli zarobkowej. Powód: każdy plik, który ich potrzebuje, już importował te pliki, więc nie powstaje cykl importów. Inne drogi to plik pętli dla średniej (jeden plik zyskałby import, którego nie ma) i nowy plik na te cztery rzeczy (dziewiąty plik na kilka linii). (Course of the cycle, Choices)
8. Dwa nowe automatyczne sprawdzenia i to, czego nie łapią: pierwsze zatrzymuje każdy plik narzędzia poza wierszem poleceń, który zapisuje plik albo zakłada katalog; drugie zatrzymuje każdy plik narzędzia, który czyta zegar systemowy albo losuje ze źródła innego niż ziarno. Drugie nie łapie generatora napisanego od zera, zegara sięgniętego nazwą złożoną dopiero w trakcie działania, zegara podanego z zewnątrz pliku ani metody, która czyta bieżącą chwilę pod nieznaną nazwą; te przypadki pilnuje recenzent każdej zmiany. Żaden niezmiennik nie jest oznaczony jako naruszony, a sprawdzenie fundamentu nie wypisuje niezmiennika z poprawionym zdaniem. (Foundation entries, 2 i 3)

## Koszt

Około 35 minut pracy, 49 milionów tokenów licząc dane z pamięci podręcznej (35 milionów na modelu orkiestratora i autora, 14 milionów na najmocniejszym modelu, który prowadził każdą recenzję), dwie recenzje całości — jedna odrzucona, jedna zaakceptowana na poprawce — i jedna runda poprawek. Tabela etapów jest w rekordzie, `docs/task-cycles/wzorzec-kodu-przyrzadu/stages.md` w commicie rekordu podlinkowanym niżej. Nie został żaden katalog roboczy ani katalog wcześniejszego zadania.

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo link do rekordu przeżywa tylko wtedy. Nic nie czeka w sprawie przeglądu fundamentu.

</details>

## Technical changes

Each item opens with what it concerns in plain words, then the places in the code.

- The four repeats in the balance tool stand once each (commit `59081e9f`): the time limit of a map run, the name of a run's outcome and the average of a list now live in `balance/engine.mjs` (`DEFAULT_CAP_MINUTES`, `outcomeOf`, `meanNumber`, exported), and the milliseconds in a minute in `balance/loop.mjs` (`MS_PER_MINUTE`, exported); `balance/trace.mjs`, `balance/loop.mjs` and `balance/campaign.mjs` import them. The tool prints the same output: 12 commands compared before and after by the author, 6 by the reviewer, all identical. The default limit is still 4000, and `grep -n 4000 balance/*.mjs` finds one line, `balance/engine.mjs:31`.
- Two automatic checks of the tool's files (commit `4b0d615f`, with the patterns of the fix round `dcb27cbd`): `tests/invariants/test_balance_instrument_file_writes.py` (no file of `balance/` but `balance/cli.mjs` writes a file or creates a directory) and `tests/invariants/test_balance_instrument_repeatability.py` (no file of `balance/` reads the system clock or draws from a source other than the seed), with the shared reader `tests/invariants/balance_source_scan.py`. Each was seen failing once against a temporary edit of `balance/trace.mjs` and passing after the edit was reverted.
- The rules file for the new kind, `guidelines/coding-balance-instrument.md`, and its row in `guidelines/coding.md` (commit `ce67fbd7`, corrected by `001349f5`): the table of the eight `.mjs` files (the engine `exemplar`, seven `copy`), the rules with their decisions and invariants, the examples, and `## Where in code`.
- Foundation entries (commit `ce67fbd7`; the part sentence corrected by `001349f5`): see *Foundation entries*.

## Checks

- **Final gate:** the CI run on the request's last head. Its result: PENDING — written here when the run ends. The cycle ran no gate on its own system and has no local time of one.
- **Failing on the base:** none. The base `4ee41c5f` is a merge whose tree equals the tree of its second parent, that branch holds no copy of a cycle record, so the list was taken from the *Checks* of the merged request #163, whose last head `44db659f` had `tests` passing (https://github.com/mariusznazar/loop2/actions/runs/44762065994/job/136377036598); no gate was run on the base.
- **Not checked, named as the task asks (item 3 above):** (a) in `balance/campaign.mjs`, whether the outcome of a manual map run is `cap` rather than `death`: nothing prints it, so the comparison with a small `capMinutes` (a description outside the repository, `capMinutes: 30`, `days: 1`) shows only that the output did not change, by the author's command 10 and the reviewer's own run; (b) `check-map` over 500 seeds and all programs, which was run in a narrowed form (`check-map --overlay balance/overlays/forest-pack.json --maps forestPack --programs forestDecent,emptyProgram`, about 6 seconds), the same code paths; (c) writing a result by `--out`, which no changed line touches.
- **Equality of the measurements** (acceptance criteria; the outputs are not in the repository, D-429): the author ran, on the base code and on the head, `sweep --map forest --program forestNaive --seeds 1-30` (default limit), `sweep --map forest --program forestDecent --seeds 1-30 --cap 30`, `sweep --map forestEdge --program emptyProgram --seeds 1-20 --cap 30`, `trace --map forest --program forestNaive --seeds 3` (default limit and `--cap 30`), `trace --map forestEdge --program forestDecent --seeds 1`, `loop --map forest --program forestDecent --seeds 1-5 --hours 8,24`, `loop --map forest --program forestNaive --seeds 1-3 --hours 8,24 --no-resurrection`, `campaign --player edge-daily-decent --seeds 1-2`, `campaign --player <a copy with days 1 and capMinutes 30 outside the repository> --seeds 1-2`, a narrowed `check-map` and `programs`; standard output, standard error and exit codes identical (`cmp`). The reviewer repeated six of them with other seeds and flags on a worktree of the base; identical too. The sweeps with `--cap 30` show `capped` equal to the number of seeds, and the trace with `--cap 30` ends `end: cap at minute 30`, so runs that end at the limit are covered.
- **Tests of the part and linters** (author and reviewers): `node --test tests/balance/*.test.mjs` exit 0 (64 pass); `npx eslint --max-warnings 0 balance tests/balance` exit 0; Prettier exit 0; Ruff format and lint on the three new Python files exit 0; the two new tests exit 0 (3 and 2 tests); `tests/invariants/test_cross_part_imports.py` exit 0; `tests/quality/test_function_and_file_size.py` exit 0 (on the base too).
- **Foundation check:** `python -B .the-way/elements/common/foundation_check.py`, without `--skip-test-citations`, on head `001349f5`: exit 0, `0 errors`, no `listed:` line.
- **Instruction files:** `python -B .the-way/instruction-files/check_instructions.py`: exit 0, `0 error, 144 warn, 7 info`; none of the warnings names a file of the change.
- **Own-work checks:** the author's check of the requirement "the output of a run that ends at the limit is the same before and after" for `campaign` showed identical output but not the outcome's value (item 3); the author's check on the fix, that no new pattern flags a clean file of the instrument, passed (the first case of the test scans the real `balance/`).
- **Review of the whole change:** the reviewer read 5 decisions whole (D-28, D-83, D-427, D-429, D-437) and the index of the rest of its selection (32 in full, 49 by heading) and named none unread that bears on the change; `tests/balance/*.test.mjs` it searched but did not read whole.
- **Form check on this description:** TO FILL.
- **Private-paths check on this description, on the copy of the record, image check and remarks check on the copy:** TO FILL.
- **Working copies left:** none. **Directories of earlier tasks kept:** none.

## Foundation entries

1. **D-437** — "Which file is the exemplar for the code of the balance instrument?": the exemplar for kind `balance-instrument`, the files of code of the balance instrument in `balance/` without the JSON files of overlays and player descriptions, is `balance/engine.mjs`. Marked **the cycle's** (its meaning is row 1's; the pair of examples in its *Verification* is the author's). The pair, word for word:
   - `complies: balance-instrument guidelines designate the selected exemplar, list each file of code of the instrument in the table of the kind and leave the overlay files and the player descriptions out of it`
   - `violates: a second exemplar for the kind; a row for an overlay file or a player description in the table of the kind`
2. **`balance-instrument-file-writes`** — no file of code in `balance/` other than `balance/cli.mjs` writes a file or creates a directory. Marked `row 4`. Its test: `tests/invariants/test_balance_instrument_file_writes.py`.
3. **`balance-instrument-repeatability`** — no file of code in `balance/` reads the system clock or draws a random number from any source other than the seed of its measurement. Marked `row 5`; *Derives from* is the recovered-from-code form the invariants template gives for what a human chose from what the product already did. Its test: `tests/invariants/test_balance_instrument_repeatability.py`.
4. **D-429's *Verification*** — now names the invariant of item 2; its binding sentences, *Rationale*, *Rejected* and pair of examples are unchanged. Marked `row 4`.
5. **Part map, `balance-tools`** — three files added to its *Files* (the two tests above are marked `rows 4 and 5`; the shared reader `tests/invariants/balance_source_scan.py` is marked **the cycle's**) and its sentence widened to say that its tests also keep the instrument from writing files outside its command line and from reading the clock or drawing outside the seed (marked **the cycle's**, from the fix round).
6. **A guidelines rule with no decision that the cycle found itself:** the sentence "Rzecz stoi w pliku, który pliki jej potrzebujące już importują, żeby nie powstał cykl importów." in the rule "Jedno miejsce wspólnej rzeczy" of `guidelines/coding-balance-instrument.md`; the rule's *Decision* reads `none`. Rows 2 and 3 of *Settlements to record* are the rules "Liczba gry" and "Jedno miejsce wspólnej rzeczy" of the same file, each with *Decision* `none` and *Invariant* `none`, as the task settles.

Each topical section of the decision log opened by the change: none (D-437 stands in the existing section "Code rules, exemplars and static checks"). Each test that holds a sentence of a decision by a line `decision:` that the change adds, drops or alters: none (the lines `decision: D-429` of `tests/balance/cli.test.mjs` stand unchanged and D-429's binding sentences are unchanged). No *Violated* mark is set or cleared; no surface is altered.

## Minor findings

Minor findings that no fix made, in the reviewers' words:

1. Review of the whole change, Minor 5, contested by the author and accepted by the reviewer of the fix; place `tests/invariants/balance_source_scan.py:59-164`: "copies the cut of `tests/invariants/test_simulation_isolation.py`; `test_simulation_randomness.py` holds a third, different one. A fix to one lexer (a regular-expression case it misreads, say) does not reach the others. The author named it and proposed one lexer in `test-helpers` as later work; importing from the simulation's test file would break `cross-part-imports`, so the copy is the cheap way inside this task." The reviewer of the fix: "One lexer means moving it into `tests/invariants/loop2_invariant_support.py` (part `test-helpers`). It also means changing both tests of the simulation, which hold two different lexers […], and choosing one against both tests' control cases. That reaches three files outside this task's tests. The copy is still a fact; it goes to the request as a later item (one lexer in `test-helpers`)."
2. Review of the fix, Minor 1 (new, within the task), place `tests/invariants/test_balance_instrument_repeatability.py:13-14` and `:54-56`: "the docstring's reading claims every use of `Math`, `Date` or `performance` as a value; the pattern catches only some places. […] `CLOCK_OR_DRAW_AS_VALUE` matches only after `=`, `,` or `(` and before `;`, `,` or `)`. My probes, not flagged: `const o = { m: Math }; … o.m.random()`; `const [m] = [Math]; … m.random()`; `function g() { return Math; } … g().random()`; `const g = () => Date; … g().now()`; `const m = true ? Math : null; … m.random()`. None of these is in the "Does NOT cover" list or in the rule's sentence on what the reviewer keeps. […] The gap is in the wording more than in the gate. Either narrow the reading to the places the pattern reads, or add `:`, `[`, `return`, `=>` and `?` to its left side, each with a control case."
3. Review of the fix, Minor 2 (new, within the task), same place: "the stricter patterns flag uses the invariant's sentence allows, and the docstring does not say the reading is stricter. These are flagged though none reads the clock or draws a number: `new Intl.DateTimeFormat('pl').format(new Date(0))`; `Object.keys(Math)`; `String(row.Date)` (a field named `Date` passed on); a local variable named `uptime`; `const { UTC } = Date`. […] No file of `balance/` is flagged today, and a rewrite of the line clears it. One sentence in the docstring would do ("stricter than the sentence: …"). Minor."

## Findings outside the task's scope

none

## Course of the cycle

- **Task and sources:** the task "loop2: rodzaj kodu i plik-wzorzec dla przyrządu balansu w wytycznych kodowania", item 23 of the plan of project 2 (`wzorzec-kodu-przyrzadu`), accepted through the day advisor on 2026-11-20 (the plan's change log); the frozen copy's hash differs from the accepted hash named there, and the cycle found no effect (record, Q-1). Target branch `main` at `4ee41c5f`.
- **Process pin:** `19e5774aed6d1d628042e23deccc110ed9f112c0`, not moved by this task.
- **Spec:** none — the five rows of the task settle the choices; no open design choice stood.
- **Route:** one author without a plan, class `same` as the orchestrator, because one agent could hold the change; one fix round after the first review.
- **Plan:** none.
- **Choices:** 10 rows in the questions table (Q-1 to Q-10), of which Q-6 to Q-9 are the cycle's choices of how to make the change; see the record's table.
- **Blocking findings left:** none. The first review of the whole change failed with two blocking findings; both were fixed in the one fix and the review of the fix passed.
- **Record:** https://github.com/mariusznazar/loop2/tree/RECORD_SHA/docs/task-cycles/wzorzec-kodu-przyrzadu
