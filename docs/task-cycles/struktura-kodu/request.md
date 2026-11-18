**State: ready** — items 1 to 3 below wait for your answer; the rest you accept by merging.

## What you will see

The game looks and behaves exactly as before: nothing a player sees has changed. What changes is the code around it, and the gate. The gate now has a check on size: a function may hold at most 200 lines of code and a file at most 800, counted without comments and blank lines, in all the code the product checks for style (the game, its scripts and its tests; the 800-line limit does not apply to tests). Two places are excused on purpose, each with its reason: the one function that registers the server's routes, and the one file that turns a saved game into the game's state (it stands at a trust boundary and is kept whole so it can be checked in one place).

Four long pieces of the game screens were divided into smaller parts, so each now fits the limit: the scene of a map run, the list of program rules in the program editor, the rule panel, and the program panel. One long function in a test of the account server was divided the same way, with every case it proves kept. The decision log gained the rule and a decision that the gate keeps no tool for unused code (a one-time trial found one dead function), and the coding guidelines gained a short rule that points to it.

The new check cannot pass yet. Code above the limit still stands in three places that this task was not asked to divide (see item 1), so the check is marked as an expected failure, and the rule is recorded as not yet met. The gate stays green; it will say so the day those places are divided and the mark can come off.

### Underneath

The check runs the product's own ESLint in a separate run with only the two size rules, taking the files from the style check's own configuration, and a second test case on made-up files proves that this run reports what it should, so a broken run cannot hide behind the expected failure.

## For you to decide

### Needed from you

none

### Fix or let through

1. Three places in the game's code are still above the limit, and nothing in this request divides them, so the new size check stays an expected failure and stops no growth until they are divided. The task expected two of them (the function that starts the page, `startApp`, which another task divides) and counted on a second function that has since been divided by a merged change; two more stand there that the task did not name: the function that builds the entry for the programs screen, `createProgramsEntry` (245 lines, with a part of it, `build`, at 225), and the file of the shared-controls page (890 lines). Until they are divided, whoever adds code to the game is stopped by review alone, not by the gate; the same holds for these three places themselves. The ways open: (a) do it in this request — a slice for each of the two new places and a review round, and the page-start function stays for its own task; (b) make a task of it — one task for the two new places, and the mark comes off when the page-start function is also divided; (c) let it through, which leaves the check a mark that no task is working off. A fourth way, an exception for a place the cycle cannot divide without harm, is yours to give and is not available to the cycle. I recommend (b), since the task you accepted counted on this wait for the page-start function, and the two new places are a separate piece of work. Do it in this request, make a task of it, or let it through? (Foundation entries, 2)

2. The reviewer of the whole change read the index of its whole selection (all 357 decisions, by heading or sentence) and opened whole 9 of the 101 decisions listed in full, and named twelve decisions about the scene, the program editor and the program panel as read only by their sentences. If one of those decisions says something about these screens that the division broke, a player would feel it in the scene, in dragging a rule or in the program panel. The slices' own checks do not leave much room for that: the existing tests of those screens passed on every slice (173 tests for the scene alone, plus the list, the panels and the end window), the agent of each slice ran the same scripted steps in a real browser on the code before and after, and the reviewer changed the new code in two places by hand and each change failed a test. Having a fresh reviewer read what stayed unread costs another round of review; letting it through costs nothing today. I recommend letting it through, since the division changes no behaviour and every check that exists said so. Have a fresh reviewer read them in this request, make a task of it, or let it through? (Checks, 5 and 7)

3. Some parts of the check in a real browser were not done, because the agents could not set up the state they needed. If one of them is broken, a player would see it in a map run: a wolf beaten or running away (the mage died in its first fight in the scripted run), a map run completed, an animation cancelled by leaving the screen, and the drag of a rule dropped exactly onto a spot (the scripted drag followed a coarse path and matched the code before the change step for step, but did not prove each landing alone). Doing it now costs a person's session with the game and, if something fails, a round of correction; making a task of it leaves them unchecked until someone plays; letting it through accepts the risk, which the tests of the scene and of the program editor cover from the other side. I recommend letting it through, since the checks that ran matched the code before the change at every step. Do it in this request, make a task of it, or let it through? The steps of the check by hand, whose result you write down as a remark:
   1. Start the game on this computer (`npm run local`) and sign in with a test account.
   2. Start a map run on a map with a wolf and let the mage fight until the wolf is beaten or runs; the effects of the fight should play once and stop, as before.
   3. While an effect plays, leave the screen of the run and come back; the scene should show no stuck effect.
   4. Finish a map run and look at the end-of-run window; it should open and close as before.
   5. In the program editor, drag one rule slowly over its own group, over another group and over a folded group, and see the line that shows where it will land; the rule should land there.

   (Checks, 6)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

4. The size rule reaches every file the product's style check reads, not only the game, its scripts and its tests: it also reaches the scripts of the deployment and the helper directories of the process. None of those files is above a limit today, so no exception follows. The cycle took this wider reading so that a new directory added to the style check is covered without a second list to keep.
5. The decision on the rule says how it stands beside the decision on the style check in its own sentences and in its example of a violation, not in its list of relations, as the task asked: the list of relations takes only a fixed set of words, and the rule neither derives from nor narrows the style check. Both are written down, so a reviewer reading either will find it.
6. The new rule is recorded as not yet met, and its test is marked as an expected failure with a comment naming the three places above. Also changed in plain words: the test of the account server's refused requests was divided into smaller functions, with every route, variant and message kept; it was seen failing once against a guard of the server broken for a moment, then the server file was restored. No other test of the product's rules was changed. (Foundation entries, 2 and 5)

## Cost

About 1 hour 54 minutes of work in all (1 hour 21 minutes without waiting for tools), 137 million tokens, nearly all of them re-read cached input: 63 million on the strongest model (the plan, the scene, the reviews), 45 million on the middle model (the entries, the list of rules, the fix, the return step, this orchestration) and 29 million on the cheapest one (the rule panel, the program panel, the test function). Review rounds: the whole change once (no blocking finding, eight Minor ones, all fixed), the fix once, and the return step once; no slice had a review of its own. The gate ran once, 785 seconds. The table of stages is in the committed record (see Course of the cycle).

## How to merge

Merge it keeping the commits (a merge commit, not a squash or a rebase), since the link to the record of the cycle survives only then.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — punkty od 1 do 3 poniżej czekają na Twoją odpowiedź; resztę akceptujesz przez scalenie.

## Co zobaczysz

Gra wygląda i działa dokładnie jak przedtem: nic, co widzi gracz, się nie zmieniło. Zmienia się kod wokół niej i bramka. Bramka ma teraz kontrolę rozmiaru: funkcja może mieć najwyżej 200 linii kodu, a plik najwyżej 800, liczone bez komentarzy i pustych linii, w całym kodzie, który produkt sprawdza pod względem stylu (gra, jej skrypty i jej testy; limit 800 linii nie dotyczy testów). Dwa miejsca są świadomie wyłączone, każde z powodem: jedna funkcja, która rejestruje trasy serwera, i jeden plik, który zamienia zapis gry na stan gry (stoi na granicy zaufania i zostaje w całości, żeby dało się go sprawdzić w jednym miejscu).

Cztery długie kawałki ekranów gry podzielono na mniejsze części, żeby każdy mieścił się w limicie: scenę przejścia mapy, listę reguł programu w edytorze programu, panel reguły i panel programu. Jedną długą funkcję w teście serwera kont podzielono tak samo, z zachowaniem każdego przypadku, który dowodzi. Do dziennika decyzji doszła reguła i decyzja, że bramka nie trzyma narzędzia nieużywanego kodu (jednorazowy próbny przebieg znalazł jedną martwą funkcję), a wytyczne kodowania zyskały krótką regułę, która na nią wskazuje.

Nowa kontrola jeszcze nie może przejść. Kod ponad limitem stoi nadal w trzech miejscach, których to zadanie nie miało dzielić (punkt 1), więc kontrola jest oznaczona jako oczekiwana porażka, a reguła zapisana jako jeszcze niespełniona. Bramka zostaje zielona; powie to, gdy te miejsca zostaną podzielone i oznaczenie będzie można zdjąć.

### Pod spodem

Kontrola uruchamia własny ESLint produktu w osobnym przebiegu z samymi dwiema regułami rozmiaru, biorąc pliki z konfiguracji kontroli stylu, a drugi przypadek testu na wymyślonych plikach dowodzi, że ten przebieg zgłasza to, co powinien, więc zepsuty przebieg nie schowa się za oczekiwaną porażką.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

brak

### Napraw albo przepuść

1. Trzy miejsca w kodzie gry nadal są ponad limitem i żadne z nich nie jest dzielone w tej prośbie, więc nowa kontrola rozmiaru zostaje oczekiwaną porażką i niczego nie zatrzymuje, dopóki ich nie podzielimy. Zadanie spodziewało się dwóch z nich (funkcja uruchamiająca stronę, `startApp`, którą dzieli inne zadanie) i liczyło na drugą funkcję, którą od tego czasu podzieliła scalona zmiana; stoją tam jeszcze dwa miejsca, których zadanie nie nazwało: funkcja budująca wejście ekranu programów, `createProgramsEntry` (245 linii, jej część `build` ma 225), i plik strony wspólnych kontrolek (890 linii). Dopóki ich nie podzielimy, kogoś, kto dopisuje kod do gry, zatrzyma sam przegląd, nie bramka; to samo dotyczy tych trzech miejsc. Drogi: (a) zrobić to w tej prośbie — kawałek na każde z dwóch nowych miejsc i runda przeglądu, funkcja uruchamiająca stronę zostaje dla własnego zadania; (b) zrobić z tego zadanie — jedno zadanie na dwa nowe miejsca, a oznaczenie schodzi, gdy podzielona zostanie też funkcja uruchamiająca stronę; (c) przepuścić, co zostawia kontroli oznaczenie, nad którego zdjęciem nie pracuje żadne zadanie. Czwarta droga, wyjątek dla miejsca, którego cykl nie umie podzielić bez szkody, należy do Ciebie i nie jest dostępna dla cyklu. Polecam (b), bo zadanie, które przyjąłeś, liczyło na to czekanie na funkcję uruchamiającą stronę, a dwa nowe miejsca to osobna praca. Zrobić to w tej prośbie, zrobić z tego zadanie, czy przepuścić? (Foundation entries, 2)

2. Recenzent całej zmiany przeczytał indeks całego swojego wyboru (wszystkie 357 decyzji, po nagłówku albo zdaniu) i otworzył w całości 9 ze 101 decyzji wypisanych w całości, a dwanaście decyzji o scenie, edytorze programu i panelu programu nazwał jako przeczytane tylko po zdaniach. Jeśli któraś z nich mówi o tych ekranach coś, co podział zepsuł, gracz poczułby to w scenie, w przeciąganiu reguły albo w panelu programu. Własne kontrole kawałków zostawiają na to niewiele miejsca: istniejące testy tych ekranów przeszły przy każdym kawałku (173 testy samej sceny, do tego lista, panele i okno końca), agent każdego kawałka uruchomił te same skryptowane kroki w prawdziwej przeglądarce na kodzie sprzed i po zmianie, a recenzent zmienił nowy kod ręcznie w dwóch miejscach i każda zmiana oblała test. Kolejny recenzent czytający to, co zostało nieprzeczytane, kosztuje jeszcze jedną rundę przeglądu; przepuszczenie nic dziś nie kosztuje. Polecam przepuścić, bo podział nie zmienia zachowania i każda istniejąca kontrola to potwierdziła. Niech świeży recenzent to przeczyta w tej prośbie, zrobić z tego zadanie, czy przepuścić? (Checks, 5 and 7)

3. Części sprawdzenia w prawdziwej przeglądarce nie wykonano, bo agenci nie umieli ustawić potrzebnego stanu. Jeśli któraś jest zepsuta, gracz zobaczyłby to w przejściu mapy: pokonanego albo uciekającego wilka (w skryptowanym przebiegu mag zginął w pierwszej walce), ukończone przejście mapy, animację przerwaną wyjściem z ekranu oraz upuszczenie przeciąganej reguły dokładnie w miejscu (skryptowane przeciąganie szło zgrubną ścieżką i krok po kroku zgadzało się z kodem sprzed zmiany, ale nie dowiodło każdego lądowania osobno). Zrobienie tego teraz kosztuje sesję człowieka z grą i, jeśli coś zawiedzie, rundę poprawek; zrobienie z tego zadania zostawia to niesprawdzone, dopóki ktoś nie zagra; przepuszczenie przyjmuje ryzyko, które testy sceny i edytora programu pokrywają z drugiej strony. Polecam przepuścić, bo kontrole, które się odbyły, w każdym kroku zgadzały się z kodem sprzed zmiany. Zrobić to w tej prośbie, zrobić z tego zadanie, czy przepuścić? Kroki sprawdzenia ręcznego, którego wynik zapiszesz jako uwagę:
   1. Uruchom grę na tym komputerze (`npm run local`) i zaloguj się kontem testowym.
   2. Zacznij przejście mapy z wilkiem i pozwól magowi walczyć, aż wilk zostanie pokonany albo ucieknie; efekty walki powinny zagrać raz i zgasnąć, jak przedtem.
   3. Gdy gra efekt, wyjdź z ekranu przejścia i wróć; scena nie powinna pokazywać zawieszonego efektu.
   4. Zakończ przejście mapy i spójrz na okno końca przejścia; powinno się otwierać i zamykać jak przedtem.
   5. W edytorze programu przeciągnij powoli jedną regułę nad jej własną grupę, nad inną grupę i nad zwiniętą grupę i zobacz linię pokazującą, gdzie wyląduje; reguła powinna tam wylądować.

   (Checks, 6)

### Akceptujesz przez scalenie

Scalenie akceptuje te punkty; jeśli któryś Ci nie odpowiada, powiedz który.

4. Reguła rozmiaru obejmuje każdy plik, który czyta kontrola stylu produktu, nie tylko grę, jej skrypty i jej testy: dosięga też skryptów wdrożenia i katalogów pomocniczych procesu. Żaden z tych plików nie jest dziś ponad limitem, więc nie wynika z tego żaden wyjątek. Cykl przyjął to szersze czytanie, żeby nowy katalog dodany do kontroli stylu był objęty bez drugiej listy do pilnowania.
5. Decyzja o regule mówi, jak stoi obok decyzji o kontroli stylu, w swoich zdaniach i w przykładzie naruszenia, nie na swojej liście powiązań, jak prosiło zadanie: lista powiązań przyjmuje tylko ustalony zestaw słów, a reguła ani z kontroli stylu nie wynika, ani jej nie zawęża. Oba zapisy są, więc recenzent, który czyta którąkolwiek, to znajdzie.
6. Nowa reguła jest zapisana jako jeszcze niespełniona, a jej test oznaczony jako oczekiwana porażka z komentarzem nazywającym trzy miejsca powyżej. Zmieniono też, prostymi słowami: test odrzuconych żądań serwera kont podzielono na mniejsze funkcje, z zachowaniem każdej trasy, wariantu i komunikatu; raz widziano go padającego przy chwilowo zepsutej ochronie serwera, po czym plik serwera przywrócono. Żaden inny test reguł produktu nie został zmieniony. (Foundation entries, 2 i 5)

## Koszt

Łącznie około 1 godziny 54 minut pracy (1 godzina 21 minut bez czekania na narzędzia), 137 milionów tokenów, prawie wszystkie to ponownie czytane wejście z pamięci podręcznej: 63 miliony na najmocniejszym modelu (plan, scena, przeglądy), 45 milionów na średnim (wpisy, lista reguł, poprawka, krok powrotny, ta orkiestracja) i 29 milionów na najtańszym (panel reguły, panel programu, funkcja testu). Rundy przeglądu: cała zmiana raz (bez uwagi blokującej, osiem drobnych, wszystkie poprawione), poprawka raz i krok powrotny raz; żaden kawałek nie miał własnego przeglądu. Bramka przeszła raz, 785 sekund. Tabela etapów jest w zapisanym rekordzie (patrz Course of the cycle).

## Jak scalić

Scal z zachowaniem commitów (commit scalający, nie squash ani rebase), bo link do rekordu cyklu przeżywa tylko wtedy.

</details>

## Technical changes

- Foundation entries, `e1e6b127` (and the wording fixes `e7fb0a7d`, the `tests:` clause `6cc90484`): the decision D-425 (the rule of size), the invariant `function-and-file-size` (*Violated* `yes`), the decision D-426 (no tool for unused code in the gate).
- The rule's test, `78f081b5`: `tests/quality/eslint-size-rules.mjs` (its own ESLint run with the two size rules `max-lines-per-function` and `max-lines`, blank lines and comments skipped, files and ignores taken from `eslint.config.mjs`, the two exceptions as filters, an entry of `eslint.config.mjs` it cannot read stops the run) and `tests/quality/test_function_and_file_size.py` (the main case, citing the invariant and marked `unittest.expectedFailure`, with a comment naming `startApp`, `createProgramsEntry` with `build` and `kitchen-sink.tsx`; an unmarked control case on made-up files, seen failing against five configurations broken for a moment); the rule `### Size of a function and a file` in `guidelines/coding.md`.
- `Scene` divided, `2fc6b1e0`: `src/browser/view/scene.tsx` (366 → 184 lines of code for `Scene`) and the new `src/browser/view/scene-memory.ts` (the memory the scene keeps between readings in one object, its advance as pure functions); the component `Ground` and three handler helpers in `scene.tsx`.
- `RuleListView` divided, `2935e093`: the hook `useRuleDrag` in the new `src/browser/view/rule-drag.ts`, and `RuleRow`, `GroupHeader`, `GroupSection` and `DropLine` as components of `src/browser/view/rule-list.tsx` (511 → 179).
- `RulePanelView` divided, `e0cd12e5`: `changedProgram`, `fieldsOf`, `GroupNameField`, `PickGrid` and `NumberRow` in `src/browser/view/rule-panel.tsx` (345 → 200, exactly at the limit: the next added line goes over, and only review stops it while the check is an expected failure).
- `ProgramPanelView` divided, `d7493a85`: `RunHead` and `ProgramsHead` in `src/browser/view/program-panel.tsx` (293 → 194).
- The function of `tests/transport.test.mjs` divided, `11d266bc`: `refusedVariants` and `guardedControls`, the case keeps its name, its `invariant:` and `decision:` lines and every route, variant and assertion (238 → 127).
- The fix of the eight Minor findings of the review of the whole change, `e7fb0a7d`, `1ffbe7b1`, `d2e41b63`, `2b9b2cd3`; the return step, `6cc90484`.
- Out of scope, not changed: `src/browser/view/game-view.ts`, `src/browser/view/app.ts`, `src/browser/view/programs-entry.ts`, `src/browser/kitchen-sink/kitchen-sink.tsx`, a stylesheet and `src/browser/view/trip-plan.tsx`.

## Checks

1. Gate, run 1 on the final tree `6cc90484`: `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/struktura-kodu/gate_times.md -- npm.cmd test`, exit 0, 785.222 s: Node 2601 tests, 2601 passed, 0 failed, 0 cancelled, 0 skipped; Python 86 + 89 + 254 + 271 = 700 tests in four directories, all OK (`tests/quality` `OK (expected failures=1)`, the expected failure of the invariant `function-and-file-size`); foundation check `0 errors`; check of the instruction files `0 error, 142 warn, 7 info`. It started after the signal `start` of the adviser of the day. No check failed or did not run.
2. Checks failing on the base `a3d913da`: none; the list was taken from the final gate of the earlier cycle (`docs/task-cycles/drobne-poprawki-po-pr-92-94/cycle.md`, added in `1ff8ea95` on the merged branch): exit 0, nothing failing.
3. Foundation check without `--skip-test-citations` on the final tree: exit 0, `0 errors`, no `listed:` line.
4. Own-work checks: slice 1 (the exceptions): the control case failed on each of five configurations broken for a moment, and the first run of the main case named nine places before it was marked; slice 2 (`Scene` changes nothing on screen): three breaks of the new code, each seen failing a test, and a manual check in a real browser, the mage walking, gathering, pausing, the wolf's attack and deaths; slices 3 and 5 (behaviour of the list and panel): scripted steps in a real browser on the base and on the new build with identical results; slice 4: the same, with the greyed cell, after the report was repaired once; slice 6: the Origin guard of the account server broken for a moment, the case failed naming the route, the file restored, and `git diff --stat d7493a85 -- src` empty. The review of the whole change changed the new code by hand in two places (`rule-panel.tsx`, `rule-drag.ts`), each change failed a test.
5. Reviews: whole change `PASS 11d266bc` (8 Minor, all within the task); fix `PASS 2b9b2cd3`; return step `PASS 6cc90484` (2 Minor). Unread by the whole-change reviewer: the decisions about scene behaviour, the program editor and the program panel, by sentence only (see item 2), and most invariants of the touched parts; the executors' unread lists were carried to it.
6. Manual checks in a real browser (D-88), by Playwright CLI, no screenshot kept since nothing the player sees changes: slice 2 (the scene) saw the mage walking, bending to gather, the flying icon and the dust of a miss each end after about 310 ms, discoveries playing once, pause and resume, a wolf's attack (about 314 ms) and deaths of cold and in a fight; not seen live: a wolf beaten or running away, a completed map, an animation cancelled by leaving the screen (the scene tests cover all three and pass). Slice 3 (the list): scripted drags, arrow moves and removals gave identical output on the base build and on the changed build (`reports/executor-3-manual-check.txt`), over a coarse pointer path, so each landing is not proved alone. Slice 4 (the rule panel): opening, arrows, Enter, the number field, a group renamed, the focus after the cross, the greyed cell; the same steps on the base and the new build gave identical logs. Slice 5 (the program panel): the copy saved in the program and as a new program, the question "Zapisać, odrzucić, wrócić?", the switch of the character, a program renamed and deleted, with the focus after each step; identical on both builds; not covered: a Tab walk through the whole screen and the rule panel's inputs beyond opening.
7. The review of the whole change read 9 decisions whole of the 101 listed in full of an index of 357.
8. Process remarks check on the original: the first run exit 1 listing 22 items, then exit 0 after they were appended (2 runs, the last exit 0).
9. Review of the foundation: `review_reminder.py origin/main` → 38 merges since `foundation-review/2026-11-13`, threshold 60, `reminder: no`; nothing is written about it.
10. Working copies left: `.runs/executor-6/` of the worktree (three test logs of slice 6, `executor-6-break.log`, `executor-6-run1.log`, `executor-6-run2.log`; its agent did not remove them, nothing waits for them). `.runs/local-start/` and `dist/` are files of the product's own tools.
11. Slice 6's agent wrote two comparison files into the main checkout's `.runs/` and deleted them; none remain (checked).
12. Form check of this description, check of private paths on it, the checks of the copy of the record and CI on the pushed head: written after the record's commit.

## Foundation entries

1. D-425 (`row 1`): a function holds at most 200 lines of code and a file at most 800, counted without comments and blank lines with nested functions counted in the function that holds them, in the scope of the linter of D-29 (the file limit outside `tests/`), with two exceptions, `accountRoutes` and `src/browser/sim/saved-game.ts`, each with its reason; the rule runs as an ESLint run of its own beside D-29, which it does not change. Its *Verification* names the test by the clause `tests:`. It stands in the section "Code rules, exemplars and static checks".
2. `function-and-file-size` (`row 2`, invariant, *Method* `test`, *Violated* `yes`): no function and no file of the code the rule covers is over its threshold other than the rule's exceptions, as ESLint reports them with its two size rules alone. Its test, `tests/quality/test_function_and_file_size.py`, is marked as an expected failure; the set that keeps it so is named in the comment at the marking. This sets the *Violated* mark (WAY-51).
3. D-426 (`row 3`): the gate keeps no tool for unused code; a run of such a tool is a one-time review, and adding one takes a human-accepted change of the decision.
4. No topical section of the decision log was opened; no kept row tied to an earlier entry; no surface changed; no part-map change (both new files of the test stand under `tests/quality/`, which build-tools holds).
5. Invariant tests the change alters: the case "refused state-changing requests change no account or session and do no password work" of `tests/transport.test.mjs` (invariant `account-mutation-request-guards`, decision D-226), only reshaped. The new test cites `function-and-file-size` by the line `invariant:` and D-425 by the line `decision:`.
6. Guidelines: `### Size of a function and a file` in `guidelines/coding.md`, its *Decision* D-425 and its *Invariant* `function-and-file-size`, no threshold or exception repeated; one sentence of `guidelines/styleguide-browser-view.md` names `scene-memory.ts`.

## Minor findings

The Minor findings of the review of the whole change were all fixed (`e7fb0a7d`, `1ffbe7b1`, `d2e41b63`, `2b9b2cd3`) and its fix passed review with no new finding. The two Minor findings of the review of the return step, not fixed, in the reviewer's words (both lie within the task):

1. **`foundations/decisions.md:833` with `tests/quality/test_function_and_file_size.py:147` — the clause `tests:` names parts of two sentences that no line `decision:` quotes.** The clause says the test holds the scope ("the limit on a function reaching …", sentence 2 of the first paragraph) and the exceptions ("the two exceptions standing whole and no other", the second paragraph), but the test carries one line, `# decision: D-425 "A function holds at most 200 lines of code and a file at most 800"`, which quotes sentence 1 only. The template has a test that holds a sentence carry a line `decision:` beside it (`template.md:232-240`) and the skill names tests in the clause "once their lines `decision:` stand" (`.the-way/elements/decisions/skill/SKILL.md:34-35`); the repository has more than one line per test where a test holds more than one sentence (`tests/sim/data.test.mjs:206-207`). Why Minor: the content of the clause agrees with the code — the control case does hold these parts — and `foundation_check.py` counts a decision as held by any line naming its number (`.the-way/elements/common/foundation_check.py:82-88`), so no check and no reader goes wrong; a later change that rewrites the scope or the exceptions sentence leaves no quotation to mismatch, which is the cost. The fix would be two more lines `decision: D-425 "The limit on a function covers every file …"` and `decision: D-425 "Two exceptions stand whole over a threshold …"` at the test (a test file, outside this commit). Evidence: `grep "decision: D-425"` over the repository finds the one line at `:147`.

2. **`foundations/decisions.md:833` — two edges of the clause are held only by construction, not by a case of the control.** (a) "the limit on a function reaching … the scripts": the control has no function in `scripts/`, only `scripts/over-file.mjs` for the file limit; the function limit reaches the scripts because both rules sit in one entry of the run's configuration (`eslint-size-rules.mjs:66-76`), so an override turning the function rule off for `scripts/**` would pass the control. (b) "no other function or file": the control has no function over 200 inside `saved-game.ts` and no file over 800 that is `account-routes.ts`, so an override widening the file exception to the function rule (or the reverse) would pass the control. Why Minor: the code does neither (`eslint-size-rules.mjs:81-92`), and the pair's *violates* example, "a function or a file added to the exceptions of the run's configuration, or given a limit of its own", still sends an agent to compare such an override by hand, so no change goes unchecked; it is broader coverage that would be nice. The clause also leaves out "the two root configuration files" the scope sentence names; that understates, so it misleads no one.

The reviewer of the whole change also left unjudged, as no finding, that the gate stops no growth while the test is an expected failure (item 1), and that `guidelines/coding-browser-module.md` has no rows for `scene-memory.ts` and `rule-drag.ts` (its rule says a file added after the last audit takes no row).

## Findings outside the task's scope

none

## Course of the cycle

- **Task and sources:** an independent task: a rule on the size of a function and a file in the product's checks, four long functions and one long test function divided, and the decision that no tool for unused code stays in the gate; the task document of 2026-11-14 as frozen in the record; the base `a3d913da`, the process at `bfb2e109`.
- **Process pin:** `bfb2e109735b5fff98802b8be0ff3c43c799262a`, unchanged; no move of the pin; the gate on the final tree is in *Checks*.
- **Spec:** none: no open design choice.
- **Route:** planned slices (one planner on the strongest class, six slices: the rule's test and guideline; `Scene` on the strongest class; `RuleListView` on the middle class; `RulePanelView`, `ProgramPanelView` and the test function on the cheapest class); no discarded attempt, no slice returned too large, no retry. The change crosses five parts and divides four large functions of different content, so one author would have held too much.
- **Plan:** `plan.md` in the record, six slices, all `fits` by the size report, no slice marked with a risk (no trust boundary, nothing irreversible).
- **Choices:** 7 recorded in the questions table of the record (the set above the limit at the base, the class of each stage, where the set is named, the scope of the rule, the plan's choices, and two unread-material gaps carried on).
- **Blocking findings left:** none.
- **Record:** to be linked once the record is committed.
