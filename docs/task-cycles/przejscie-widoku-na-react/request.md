**State: ready** — corrected for your answer to an item of this request; nothing waits for your answer, the rest you accept by merging.

## What you will see

The player sees almost no difference: the start of the page, the waiting screen, the line that says a save failed and the sentence that confirms an email address look, read and move focus as before. The one change a player can meet is after an error that no code of the game handled: while the page waits after a sign-in, it now shows only the sentence "Coś w grze się zepsuło — odśwież stronę.", where before the words "Sprawdzanie logowania…" stood beside it.

The developer's page that shows every shared control (`npm run kitchen-sink`) is now built the way the game is built and shows the controls the player gets, not a second set made only for that page. Every shared control now has one form instead of two, and the test that kept the two forms alike is gone.

### Underneath

The whole start page — the header, the waiting screen, the sentences above the game, the line of saving and the sentence of a failure — is drawn by React in roots of its own, so an error in one root cannot take down the others; the page's many separate variables became one value that says which of three states the page is in.

## For you to decide

### Needed from you

none

### Fix or let through

none

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

1. This correction answered your answer to an item of this request, the one about the incomplete reading by the review of the whole change, and the cycle judged that neither the task nor the foundation required what it changed: a fresh reviewer read whole the decisions that review had not read and found no decision the change contradicts and nothing that needs your choice; it found two small findings of its own, a test that sent an event by hand and two sentences that named the wrong place that builds a panel, and they are fixed (Checks, 6).
2. You let through, with no task, two things: whether a screen reader announces the sentence of a failure when the page shows it, and the missing images of the pages and of three kinds of the sentence above the game; nothing is known to break (Checks, 4 and 5).
3. The sentence of a failure is drawn once when the page starts, in a root that holds nothing else and stays hidden, and the page only shows it when an error comes. The way tried first, drawing it at the moment of the error, fails when the error comes while the page is busy drawing, because React then refuses the drawing; the way built by hand outside React would have contradicted the task, which lists this row among what React draws.
4. The page's state is one value with three kinds — checking the login, the login card, the game — and the logout and the reset are parts of the game kind, not kinds of their own, because a reset can succeed while a logout waits and the game still stands.
5. After an error nothing handled, a reset that succeeds now closes the game that stood and builds none (before, the old game stayed out of sight and went on saving, which could have written an old game over the new empty save), and the saver's answer of a game a reset built is no longer lost when the old game's logout is still waiting. The page behaved differently here before, nothing tested it, and two new tests now hold both. I chose to keep the change because the entries about the reset and the menu bar require it.
6. The developer's page of controls is built with React's development build, which complains in the browser's console about a misused control, because the page is only for the developer. It types an empty text into its number-field sample after the first drawing, outside React, so that the empty state shows without a new option on the shared control; the other way, a prop used by one page, would have put code only that page needs into the game's build.
7. The button "Spróbuj ponownie" gets focus at every refusal, a refusal after a retry included, and stays one button through a refusal, a retry and the next refusal; before, focus after a second refusal was not written down anywhere, and now a test holds it.
8. The cycle wrote or corrected these entries of the foundation that you did not see in the task (Foundation entries, 1–10): the page's waiting screens are React components, so the exception for them is gone; the waiting screen after an unhandled error shows the sentence alone; the three sentences about both forms of a button now speak of one form; a reset that succeeds after an unhandled error closes the game; the saver's answer of a game a reset built is not held for the old game's logout; focus goes to "Spróbuj ponownie" at every refusal and the button stays one element; the start page's separate roots and the row of the failure; and the rewording of the reasons of three older decisions whose old reasons no longer held.
9. The tests that hold decisions changed: the large test that compared the two forms of each control is deleted and its cases that protect behaviour live in a new test of the controls (49 cases); in the case "after an error nothing handled, in the clock's own reading, the game state stays as it was and every save sends the state from before the error", the assertion that counted live timers is gone and an assertion that a tick after the error reads no clock stands in its place, and the count of console warnings of React is gone from the case about an error in the drawing of a root; the test file of the previous save, the account screen and the uncaught failure each quote the entry they hold (Foundation entries).

## Cost

The cycle took about 3 hours 36 minutes of work in 24 agent runs by Opus, Sonnet and Haiku, 296 million tokens in all (mostly cached input; Sonnet 156 million, Opus 131 million, Haiku 9 million), and the whole gate ran twice, in 22 minutes 36 seconds and, after the correction, in 16 minutes 2 seconds. There were nine rounds of review: the spec twice (the first failed on five findings), the first slice once, the whole change twice (the second after a fix of four small findings), the final step twice (the first failed on one finding, now fixed), and the correction's fresh reading of the decisions once and the review of its fix once. The table of stages stands in the record. Two directories of earlier tasks still stand because the script could not tell they were no longer needed; nothing in this request waits for them and you may remove them by hand.

## How to merge

Merge it with a merge commit, not a squash or a rebase, because the link to the record of this cycle survives only when the commits stay. The review of the foundation does not wait: the count of merges since the last review is 25 of 60.

<details>
<summary>W twoim języku</summary>

**Stan: gotowe** — poprawione według twojej odpowiedzi na punkt tej prośby; nic nie czeka na twoją odpowiedź, resztę akceptujesz przez scalenie.

## Co zobaczysz

Gracz prawie nic nie zauważy: początek strony, ekran oczekiwania, wiersz informujący o nieudanym zapisie i zdanie potwierdzające adres email wyglądają, brzmią i przenoszą fokus tak jak przedtem. Jedyna zmiana, na którą gracz może trafić, dotyczy błędu, którego nie obsłużył żaden kod gry: gdy strona czeka po zalogowaniu, pokazuje teraz tylko zdanie „Coś w grze się zepsuło — odśwież stronę.”, a wcześniej obok niego stało „Sprawdzanie logowania…”.

Strona dla developera, która pokazuje każdą wspólną kontrolkę (`npm run kitchen-sink`), jest teraz składana tak jak gra i pokazuje kontrolki, które dostaje gracz, a nie drugi zestaw zrobiony tylko dla tej strony. Każda wspólna kontrolka ma jedną postać zamiast dwóch, a test, który pilnował, żeby te dwie były takie same, zniknął.

### Pod spodem

Cała strona startowa — nagłówek, ekran oczekiwania, zdania nad grą, wiersz zapisu i zdanie o awarii — jest rysowana przez React w osobnych korzeniach, więc błąd w jednym korzeniu nie zdejmie pozostałych; kilkanaście osobnych zmiennych strony stało się jedną wartością, która mówi, w którym z trzech stanów jest strona.

## Do rozstrzygnięcia

### Potrzebne od ciebie

none

### Poprawić czy przepuścić

none

### Akceptujesz przez scalenie

Scalenie akceptuje te punkty; jeśli któryś ci nie odpowiada, powiedz który.

1. Ta poprawka odpowiedziała na twoją odpowiedź na punkt tej prośby, o niepełnym czytaniu przez przegląd całości, a cykl uznał, że ani zadanie, ani fundament nie wymagały tego, co zmieniła: świeży recenzent przeczytał w całości decyzje, których tamten przegląd nie przeczytał, i nie znalazł decyzji, której zmiana przeczy, ani niczego, co wymaga twojego wyboru; znalazł dwie drobne uwagi własne, test, który wysyłał zdarzenie ręcznie, i dwa zdania wskazujące złe miejsce budowy panelu, i są poprawione (Checks, 6).
2. Przepuściłeś bez zadania dwie rzeczy: czy czytnik ekranu ogłasza zdanie o awarii, gdy strona je pokazuje, oraz brak obrazów stron i trzech rodzajów zdania nad grą; nic nie jest znane jako zepsute (Checks, 4 i 5).
3. Zdanie o awarii jest rysowane raz przy starcie strony, w korzeniu, który nic innego nie trzyma i jest ukryty, a strona tylko je pokazuje, gdy przyjdzie błąd. Sposób próbowany pierwszy, rysowanie w chwili błędu, zawodzi, gdy błąd przychodzi, kiedy strona akurat rysuje, bo React odmawia wtedy rysowania; sposób zbudowany ręcznie poza Reactem przeczyłby zadaniu, które ten wiersz zalicza do tego, co rysuje React.
4. Stan strony to jedna wartość o trzech rodzajach — sprawdzanie logowania, karta logowania, gra — a wylogowanie i reset są częściami rodzaju „gra”, nie osobnymi rodzajami, bo reset może się udać, gdy wylogowanie jeszcze czeka, a gra nadal stoi.
5. Po błędzie, którego nic nie obsłużyło, udany reset zamyka teraz grę, która stała, i nie buduje żadnej (wcześniej stara gra zostawała poza ekranem i zapisywała dalej, co mogło nadpisać nowy pusty zapis starą grą), a odpowiedź zapisu gry zbudowanej przez reset nie ginie już, gdy wylogowanie starej gry jeszcze czeka. Strona zachowywała się tu inaczej, żaden test tego nie sprawdzał, a teraz dwa nowe testy trzymają oba przypadki. Zostawiłem zmianę, bo wpisy o resecie i o pasku menu jej wymagają.
6. Strona developera z kontrolkami jest składana z deweloperskim wydaniem Reacta, które w konsoli przeglądarki skarży się na źle użytą kontrolkę, bo strona służy tylko developerowi. Po pierwszym narysowaniu wpisuje pusty tekst do próbki pola liczbowego, poza Reactem, żeby stan pusty był widać bez nowej opcji we wspólnej kontrolce; drugi sposób, opcja używana przez jedną stronę, wniósłby do paczki gry kod potrzebny tylko tej stronie.
7. Przycisk „Spróbuj ponownie” dostaje fokus przy każdej odmowie, także po ponowieniu, i zostaje jednym przyciskiem przez odmowę, ponowienie i następną odmowę; wcześniej fokus po drugiej odmowie nie był nigdzie zapisany, a teraz trzyma go test.
8. Cykl zapisał albo poprawił te wpisy fundamentu, których nie widziałeś przy zadaniu (Foundation entries, 1–10): ekrany oczekiwania strony to komponenty Reacta, więc wyjątek dla nich zniknął; ekran oczekiwania po nieobsłużonym błędzie pokazuje samo zdanie; trzy zdania o obu postaciach przycisku mówią teraz o jednej postaci; udany reset po nieobsłużonym błędzie zamyka grę; odpowiedź zapisu gry zbudowanej przez reset nie czeka na wylogowanie starej gry; fokus idzie na „Spróbuj ponownie” przy każdej odmowie, a przycisk zostaje jednym elementem; osobne korzenie strony startowej i wiersz awarii; oraz przepisane powody trzech starszych decyzji, których dawne powody już nie obowiązywały.
9. Zmieniły się testy trzymające decyzje: duży test, który porównywał dwie postaci każdej kontrolki, jest usunięty, a jego przypadki chroniące zachowanie żyją w nowym teście kontrolek (49 przypadków); w przypadku „po błędzie, którego nic nie obsłużyło, w odczycie zegara, stan gry zostaje taki jak był i każdy zapis wysyła stan sprzed błędu” zniknęła asercja licząca żywe liczniki, a w jej miejsce stoi asercja, że tyknięcie po błędzie nie czyta zegara, i zniknęło liczenie ostrzeżeń Reacta w przypadku o błędzie rysowania korzenia gry; testy poprzedniego zapisu, ekranu konta i nieobsłużonej awarii cytują każdy wpis, który trzymają (Foundation entries).

## Koszt

Cykl zajął około 3 godzin 36 minut pracy w 24 uruchomieniach agentów Opus, Sonnet i Haiku, 296 milionów tokenów w sumie (głównie wejście z pamięci podręcznej; Sonnet 156 mln, Opus 131 mln, Haiku 9 mln), a cała bramka przeszła dwa razy, w 22 minuty 36 sekund i, po poprawce, w 16 minut 2 sekundy. Przeglądów było dziewięć rund: specyfikacja dwa razy (pierwszy nie przeszedł na pięciu uwagach), pierwszy plasterek raz, cała zmiana dwa razy (drugi po poprawce czterech drobnych uwag), krok końcowy dwa razy (pierwszy nie przeszedł na jednej uwadze, już poprawionej) oraz świeże czytanie decyzji przy poprawce raz i przegląd jego poprawki raz. Tabela etapów stoi w rekordzie. Dwa katalogi wcześniejszych zadań nadal stoją, bo skrypt nie potrafił poznać, że nie są już potrzebne; nic w tej prośbie na nie nie czeka i możesz je usunąć ręcznie.

## Jak scalić

Scal commitem scalającym, nie squashem ani rebase'em, bo link do rekordu tego cyklu przetrwa tylko wtedy, gdy commity zostaną. Przegląd fundamentu nie czeka: liczba scaleń od ostatniego przeglądu to 25 z 60.

</details>

## Technical changes

The change is 30 commits on `task/przejscie-widoku-na-react` (36 files, +3621 −3105): the foundation entries first, then 13 slices, one fix of four small findings and the return step.

- Foundation (commit `e3a58f45`, then `937e4b0a`, `80cdb843`, `d164271d`): see *Foundation entries*.
- Kitchen-sink page bundled (commit `7c0fda9f`, `scripts/kitchen-sink.mjs`, `tsconfig.kitchen-sink.json`): the compiler emits the page's modules into a staging directory inside `dist/kitchen-sink/`, esbuild joins them into the one file the page loads, React's development build, the staging directory removed; the lines of the script that serve files and open the browser are unchanged.
- Kitchen-sink page in React (`e2d82b34`, `d3c20034`): `src/browser/kitchen-sink/kitchen-sink.tsx` replaces `kitchen-sink.ts`; hover and focus samples are forced by a wrapper's class; the empty number-field sample is typed after the first drawing.
- Tests first: `6cbdc8b7` four structural assertions of the account screen's test no longer take a sentence for a direct child of the header or of the main block (the six clicks on "Spróbuj ponownie" go through `press`); `fc00bda6` the two assertions of loop2#62-10 are removed (the count of live timers and the count of React's console warnings), and a tick after the error is asserted to read no clock.
- The warning sentence's one constant (`4a0c516b`, `f0e6eea9`): `src/browser/view/controls/react-text-field.tsx` exports it; `createFailureCard` of `src/browser/view/account-card.tsx` reads it.
- The saver's sentence as a value (`51f26f01`): `src/browser/view/game-saver.ts` builds no element; `src/browser/view/header-rows.tsx` draws the row of saving in a root of its own.
- The page's state as one value (`db8f0f3f`, `src/browser/view/app.ts`), then the waiting screen (`efbe8ff8`, `5c4ce66b`, `src/browser/view/waiting-screen.tsx`), the sentences above the game (`1bffa4e6`, `src/browser/view/page-sentences.tsx`) and the row of the failure (`9b523357`, `4437ebd7`, in `header-rows.tsx`) each in a root of its own.
- Shared controls: the new test `tests/view/shared-controls.test.mjs` (`e8b68dda`), comments of the five `react-*.tsx` files (`6839f5b1`), then the deletion of `button.ts`, `text-field.ts`, `number-field.ts`, `pick-cell.ts`, `select-list.ts` and `tests/view/react-controls.test.mjs`, with the type `SelectOption` moved into `react-select-list.tsx` (`fb523235`, `7226e369`).
- Guidelines (`46e57217`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`): the rules about the two forms of a control, a screen in the DOM and the page without React describe the state after the change; three headings were renamed (they named what is no longer true); the meaning of the status `copy` for the files of `controls/` follows the entry that now says one form; the table of files lost the rows of the five deleted files and gained none (the task's fourth answer).
- The fix of the four small findings of the review of the whole change (`f8a2bbc4`, `ce4b4a38`, `8b8709f0`, `c5583a04`, `8bdd5273`, `f89dbd09`): a test of the focus on "Spróbuj ponownie" and of the same button across a retry; two tests of the page's two changed edge cases; one comment of the stylesheet; two places of the coding guideline.
- The return step (`937e4b0a`, `6df956ae`, `80cdb843`, `d164271d`): see *Foundation entries*; two comments of tests now quote the foundation.
- Correction 1 (`de69f1f5`, `bac81eb1`, `c246b627`): the select-list case of the new test of the controls sends its event through the test helper's `fire`; the rationale of D-264 and the *Good* line of the guideline rule on a new screen say that the panel of a card taken down is built by `createFailureCard`, and the page and the factories of its roots build the rest by hand.

## Checks

1. **Gate.** `python -B .the-way/task-cycle/gate_times.py --output docs/task-cycles/przejscie-widoku-na-react/gate_times.md -- npm.cmd test` on `d164271d`, one run, started 2026-11-16 08:54:34 UTC on the signal `start` of the adviser of the day: exit code 0, 1355.6 s, no other gate run at the same time; Node tests 2535 passed, 0 failed, 0 skipped; Python tests 24 + 79 + 261 + 253 in four directories, every directory passed; foundation check `0 errors`; check of the instruction files `0 error, 138 warn, 7 info`. Nothing failed and nothing did not run. The checks failing on the base: none (taken from the final gate of the earlier merged cycle, commit `a46d3413`, `docs/task-cycles/proba-bez-wersji-zapisu/cycle.md`; the base is a merge commit with the same tree as the merged branch, so no gate ran on the base). **Correction 1:** the same command on `c246b627`, run 1 of 1 after the correction, started 2026-11-16 09:46:30 UTC on the signal `start` of the adviser of the day: exit code 0, 962.1 s, no other gate run at the same time; Node tests 2535 passed, 0 failed, 0 skipped; Python tests 24 + 79 + 261 + 253, every directory passed; foundation check `0 errors`; check of the instruction files `0 error, 138 warn, 7 info`.
2. **Foundation check without `--skip-test-citations`** on the final tree: exit 0, `0 errors`, no `listed:` line.
3. **Focused checks and own-work checks** of each slice, with their commands and exit codes, stand in the reports of the record; mutation checks (a deliberate break of the code to see the new case fail) were made for slices 5, 10 and 11 and for the fix (five logs, `reports/fix-1-logs/`).
4. **Not checked: the announcement of the failure sentence by a screen reader** (no screen reader at hand; assumed by the spec's first decision, with the fallback written in its cost line).
5. **Screenshots**: slices 2, 6, 8, 9 and 10 and the review of the whole change inspected the page in a real browser and kept no image; the sentence after "Zacznij od zera", the positive confirmation and the refused-load sentence were not brought about on the local start and were checked by the tests of the account screen and of the previous save only.
6. **Reading of the decisions the review of the whole change left unread** (the remark of item 3, correction 1; report of the fresh reviewer, `opus`, `PASS 4f694742`): 85 decisions of the full list of its index read whole, 19 more of the heading list read whole (D-01, D-02, D-06, D-29, D-117, D-130, D-152, D-156, D-222, D-252, D-258, D-263, D-266, D-268, D-289, D-290, D-291, D-347, D-351), 218 read by title only, the invariants, the glossary entries and the five guideline files about the browser view read whole; no decision that the change contradicts, makes untrue or leaves unchecked by a test it names, and no finding that needs your choice; two Minor findings, both fixed in this correction and checked by the same reviewer once (`PASS c246b627`). The earlier review's own account: 2 decisions read whole (D-265, D-269) and 7 through the word-by-word difference of 61 in its index, 257 by heading only.
7. **State checks of the user interface**: the waiting screen in its states asking, refused and retrying has the same box as the old structure; the header with no sentence has the height of the bar; the sentence of a failed save appears under the bar and is cleared after the retry; the sentence of the failure stands once, under the bar, beside the line of saving; the kitchen-sink page shows 15 focus samples with the outline on the control itself and the empty number-field sample.
8. **Preview server** (trust boundary of `scripts/kitchen-sink.mjs`): reviewed in slice 1 with 23 crafted request paths — only the page and its bundle answered 200, nothing outside `dist/kitchen-sink/` was served, the server listens on 127.0.0.1 only; nothing after that slice touched the script or the served paths.
9. **Form check** of this description: `python -B .the-way/task-cycle/request_check.py docs/task-cycles/przejscie-widoku-na-react/request.md --task docs/task-cycles/przejscie-widoku-na-react/task.md`, exit 0, 5 runs (before opening, after two phrases were changed, after the record's link was added, after the result of CI was added, and for this correction).
10. **Check of private paths** on this description (`python -B .the-way/task-cycle/private_paths_check.py docs/task-cycles/przejscie-widoku-na-react/request.md`, exit 0, 3 runs) and on the copy of the record (`python -B .the-way/task-cycle/private_paths_check.py docs/task-cycles/przejscie-widoku-na-react`, 2 runs: exit 1 with 16 listed places, cleaned by one rewriting, then exit 0); **check of image files** on the copy (`python -B .the-way/task-cycle/image_files_check.py docs/task-cycles/przejscie-widoku-na-react`, 1 run, exit 0); **remarks check** on the original (`python -B .the-way/task-cycle/remarks_check.py docs/task-cycles/przejscie-widoku-na-react`, exit 1 on the first run with 55 listed items, exit 0 on the second after they were appended word for word) and on the copy (`python -B .the-way/task-cycle/remarks_check.py docs/task-cycles/przejscie-widoku-na-react`, 1 run, exit 0). After correction 1: the same checks on the new copy of the record (`docs/task-cycles/przejscie-widoku-na-react`), results in the record.
11. **CI** (`tests` job, Linux): on the head `4f694742` of the first run (the tree of `d164271d`) success in 5 min 26 s, https://github.com/mariusznazar/loop2/actions/runs/43839284110/job/133203736065; on the head of this correction: to be filled after the run.
12. **Directories of earlier tasks kept** (name, branch, reason): `przewodnik-testow` (`task/przewodnik-testow`; holds `fail-node` and `fail-python`, each with uncommitted changes), `coding-guidelines` (`task/coding-guidelines`; uncommitted changes). **Working copies left**: none.

## Foundation entries

1. D-269, row 1: the kitchen-sink page is bundled by the build step of its script, never by the script's lines that serve files, and shows each shared control in its React form; its *Based on* gained the fact `react-entry-build` that the foundation already held.
2. D-265, row 2: a shared control has one form, a React component, and the panel in place of a card React took down takes the tag, class and role of the warning sentence from one constant that the React component reads; the test comparing two forms is gone and its *Verification* names the test of the React forms.
3. D-407, row 3 and the cycle's: the start page keeps roots of its own — the menu bar, the row of the failure, the row of saving, the waiting screen and the sentences above the game — none shared; and, the cycle's precision, the row of the failure holds nothing else, is drawn when the page starts and is shown by the page at the error without a render; its examples were shortened and its clause `tests:` names the case that holds the row.
4. D-03, the cycle's: its exception for the waiting screens built by the page's own code is gone, since they are React components.
5. D-323, the cycle's: the waiting screen at which a sign-in stays after an error nothing handled shows the sentence alone, without "Sprawdzanie logowania…".
6. D-44, D-275, D-276, the cycle's, *Verification*: "both forms" of the shared button became its React form; D-276's *Rejected* now speaks of the one form.
7. D-381, the cycle's, rationale: "the page around the card is built another way than the card" no longer stands.
8. D-402, the cycle's, a second paragraph: a reset that succeeds after an error nothing handled closes the game that stood and builds none; "An outcome of the saver of the game a reset built is not held for the logout of the old game, which may still wait for its answer." Its clause `tests:` names the cases of the previous save that hold it (the test file quotes the sentence).
9. D-262, the cycle's, a second paragraph: at each entry into the warning with "Spróbuj ponownie" focus moves to that button, and the button is one element through the refusal, the retry and the next refusal.
10. D-264, the cycle's, rationale: no screen is built in the DOM any more; what is built by hand outside React is the header, the main block, the hosts of the roots and the panel of a card taken down, and the sentence says no more (corrected again in correction 1).

Tests that hold a sentence of a decision by a line `decision:` and changed: `tests/view/react-controls.test.mjs` (deleted; its lines for D-265, D-44, D-275, D-276, D-274 went with it), `tests/view/shared-controls.test.mjs` (new, quotes D-265, D-44, D-275, D-276, D-289), `tests/view/account-screen.test.mjs` (two quotations of D-262 added), `tests/view/uncaught-failure.test.mjs` (a quotation of D-402 and one of D-323 changed), `tests/view/previous-save.test.mjs` (a quotation of D-402 added). The invariant test changed: the case of `uncaught-failure-game-state` ("after an error nothing handled, in the clock's own reading, the game state stays as it was and every save sends the state from before the error") lost the count of live timers and gained the assertion that a tick after the error reads no clock; the invariant's sentence was left as it was. No invariant, glossary term or part-map entry was written; the foundation check lists no corrected invariant sentence.

## Minor findings

none — the two Minor findings of the review of the return step and of the correction's review are fixed (`c246b627`, `bac81eb1`).

## Findings outside the task's scope

none

## Course of the cycle

- **Task and sources:** finish the move of the view to React — the page of shared controls built like the game and showing the React forms, the rest of the start page in React in roots of its own, the page's state as one value, the DOM forms of the controls and the comparing test removed, the corrections of group G-2 of the foundation review; an independent task, accepted 2026-11-13, with the notes' commit `181392e5`.
- **Process pin:** `bfb2e109735b5fff98802b8be0ff3c43c799262a` (the gitlink of the base `d850f760`); the task moved no pin.
- **Spec:** written, because the task left the way of the failure sentence, the shape of the page's one state value and the way the page of controls is bundled to the cycle; reviewed twice (the first failed on five findings, the revised passed); settled two small notes in its own section.
- **Route:** planned slices, because the change reaches five parts and has a forced order; the foundation entries first, then 13 slices of which the first (a trust-boundary script) had a review of its own. Correction 1 (your answer to the item about the incomplete reading, remarks in the record, `reports/correction-1-remarks.md`; no reset, it runs on top of `4f694742`): a fresh review, one fix of two Minor findings, the review of that fix, the gate on the corrected tree and the record's pair of commits again.
- **Plan:** 13 slices after nine foundation entries; one slice (the account screen's tests) is above the size limit because the size script counts the test file whole, accepted (Choices, Q1).
- **Choices:** 4 choices of the cycle beyond the task, in the questions table of the record: Q1 the slice above the size limit, Q2 the page's changed edge cases not returned for repair, Q3 the entries' writer's unread material accepted, Q4 one quotation line allowed in a test.
- **Blocking findings left:** none.
- **Record:** https://github.com/mariusznazar/loop2/tree/aa424573f9f0d1cbb85e4b63def7cd10c2d9dbbb/docs/task-cycles/przejscie-widoku-na-react (the commit `aa424573` adds it; the next commit removes it from the final tree).
