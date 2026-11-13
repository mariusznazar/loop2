**State: ready** — corrected for your remarks; one item under *Fix or let through* waits for your answer; nothing blocks the merge, and everything under *You accept by merging* waits for nothing.

## What you will see

After a night away, the report on the headquarters screen ("Gdy cię nie było") now shows the practice the earning loop has gathered, and a green „Odbierz” button beside it pays that practice out. Before, a line of the report named practice only from map runs that had finished while you were away, so after a night in which no run finished the report showed none, although the loop had gathered some; the only way to get it was „Zatrzymaj”, which ends the loop and loses the backpack of the map run going on.

- A character's line now reads, for example, "Ala: 480 min · skrzynka: patyk +3, jagoda −2 · wprawa do odebrania: Eksploracja +14, Jedzenie +4", with „Odbierz” beside it. The number is the whole of what the button will pay at that moment: the practice of finished map runs and of the map run still going on, also from before this absence. While the game stays open the loop goes on, so the number grows as you read.
- „Odbierz” adds that practice to the character's skills at once, saves the game at once, and leaves the backpack, the map run going on, the loop and the chest as they were. The practice part of the line and the button disappear; the rest of the line stays until you press „Zamknij”. When the loop gathers more, the part and the button come back. The keyboard focus moves to „Zamknij”.
- Paid practice is never paid twice: when the map run it was gathered in finishes, only what came after „Odbierz” is added to the loop, and a later „Zatrzymaj” pays only that too.
- A character whose loop a death stopped, and a character with nothing waiting, have no button.
- The button is an ordinary button with its text in the green already used for "works / in order", in rest and under the pointer. The page of sample controls shows it in every state.
- A game saved before this change is not loaded by the new version: the shape of the saved report changed, so the version of the saved game went up once, from 4 to 5. The project accepted losing such a save for now.

As you asked, the three things that had not been seen were looked at in a real browser, with made-up characters, and nothing was off: the report on the merged screen under the camp picture, the page of sample controls with the new button in its states, and the button coming back about five seconds after „Odbierz”, once the loop had passed another minute and gathered one more point of practice.

![the report with „Odbierz” under the camp band on the merged Siedziba](https://github.com/mariusznazar/screenshots/blob/dc34f817ee3f75bfe2cde7aa0d2ef6adff74bdb0/loop2/raport-z-wyplata/a-report-camp.png?raw=true)

![the page of sample controls, the row of the green button in its states](https://github.com/mariusznazar/screenshots/blob/dc34f817ee3f75bfe2cde7aa0d2ef6adff74bdb0/loop2/raport-z-wyplata/b-kitchen-sink.png?raw=true)

![the report after the loop gathered one more practice: „Odbierz” is back beside „Eksploracja +1”](https://github.com/mariusznazar/screenshots/blob/dc34f817ee3f75bfe2cde7aa0d2ef6adff74bdb0/loop2/raport-z-wyplata/c-button-back.png?raw=true)

### Underneath

The practice waiting is no longer stored in the report; the game reads it from the loop each time the screen is drawn, and „Odbierz” empties it from the loop and from the map run going on, so nothing has to remember what was paid.

## For you to decide

### Needed from you

none

### Fix or let through

1. You asked for the guideline that lists the kinds of the shared button to be extended "through the guideline's own maintenance skill". That skill leads a refinement of the coding guidelines with you and never writes the guideline itself, so none of its steps ran inside this cycle; the author wrote one sentence naming the green kind, in a paragraph of examples that binds nothing, and the reviewer judged that a fair way to carry it out. If you meant a separate refinement task for the guidelines, it does not exist yet. Making one costs a refinement round with you; leaving it costs nothing today, and the sentence only repeats what the decision on the shared controls already says, so nobody builds on a wrong rule. I recommend letting it through. Make a task of it, or let it through? (Minor findings, 1)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

2. The cycle did not add a second record of what was paid. „Odbierz” pays the waiting practice and empties it, both in the loop and in the map run going on, so what the loop and the run hold is always what is still waiting. The other way, a separate "already paid" figure beside the gathered practice, would have needed its own rule for loading a saved game and a subtraction after every death a resurrection covers and every ended run, or the waiting figure could go negative. The price of the chosen way: the number a map run of a loop holds now means "not paid yet", which is written into the entry about how the game state holds earning loops.
3. One sentence is not in the entry about what the player reads after being away: the costs you accepted for the live number (a line that changes while you read it, a button that comes back a moment after a payment, one line that joins two moments). The approved definition does not hold it, and it is the only source of that entry's wording, so the cycle left it out; the costs remain in the task and here. The same kind of sentence stays in the entry about the shared controls, because your answer about the button's look holds it.
4. After „Odbierz”, the keyboard focus moves to „Zamknij”, so the next key press stays in the report instead of falling to the page. A second Enter then closes the report. No written rule decides this; it follows the focus rule already used for „Zamknij”. It was seen working in the browser check you asked for.
5. Two foundation entries are the cycle's own, and you did not see them at the task: the entry about how the game state holds earning loops now says the loop keeps the practice gathered since the player last took it, that „Odbierz” empties it together with the practice of the map run going on, and that a death with no resurrection ready takes what waits; and a new rule says the practice an earning loop gathers is never added to the character's skills twice, whichever of „Odbierz” and the stop pays it and whether a finished map run came between. Following your remarks, the rule's sentence now names only „Odbierz” and the stop as the ways that pay into skills, and the rule is linked to all four decisions that say it.
6. The tests that carry the rules about finishing a map run, catching up on an absence and the version of the saved game were rewritten for the report line without practice and for version 5; none was weakened, and the old version-4 document is kept in them and refused as a document of another version. The new rule is carried by three tests that fail when „Odbierz” leaves the practice unemptied, one of them the test that checks „Odbierz” leaves backpack, run and chest as they were. No rule is marked as violated, and no surface or part of the map changed.
7. You let two items through in your comment, so the cycle did nothing for them: the fresh reading of nine decisions by a new reviewer (the author who checked the written rules had already read all nine whole, and the merge review found no contradiction), and the old gap under the rule that no part of the code imports another part unless allowed (you say it is in the open review of the foundation).

## Cost

About 1 h 30 min of working time, of which 40 min waiting for tools, on one model (the orchestrator and its agents; about 134 million tokens, 130 million of them cached input, 384 thousand output), the correction after your remarks included. Review rounds: one review of the whole change with one fix of three small remarks and one review of that fix; one review of the step that checks the written rules; one review of the merge with the target branch; one review of the correction after your remarks; the author's report was sent back once for repair. The table of stages is in the committed record: https://github.com/mariusznazar/loop2/blob/RECORDSHA/docs/task-cycles/raport-z-wyplata/stages.md

## How to merge

Merge with a merge commit that keeps the commits (not a squash or a rebase), because the link to the record of the cycle survives only then.

The foundation has waited for a review through 85 merges since the start of the history (no review has been tagged yet). The review is the skill `the-way-review-foundation`, started in a session in this repository. Nothing in this request waits for it.

<details>
<summary>Po polsku</summary>

**Stan: gotowa** — poprawiona po Twoich uwagach; jeden punkt w części „Popraw albo przepuść” czeka na Twoją odpowiedź; nic nie blokuje scalenia, a to, co jest w części „Przyjmujesz przez scalenie”, na nic nie czeka.

## Co zobaczysz

Po nocy nieobecności raport na ekranie Siedziby („Gdy cię nie było”) pokazuje teraz wprawę, którą zebrała pętla zarobkowa, a zielony przycisk „Odbierz” obok wypłaca ją. Wcześniej wiersz raportu podawał wprawę tylko z przejść, które skończyły się w czasie nieobecności, więc po nocy bez żadnego ukończonego przejścia raport nie pokazywał jej, choć pętla coś zebrała; jedyną drogą było „Zatrzymaj”, które kończy pętlę i traci plecak przejścia w toku.

- Wiersz postaci brzmi teraz np. „Ala: 480 min · skrzynka: patyk +3, jagoda −2 · wprawa do odebrania: Eksploracja +14, Jedzenie +4”, a obok stoi „Odbierz”. Liczba to całość tego, co przycisk wypłaci w tej chwili: wprawa z ukończonych przejść i z przejścia w toku, także sprzed tej nieobecności. Póki gra jest otwarta, pętla chodzi dalej, więc liczba rośnie w trakcie czytania.
- „Odbierz” od razu dodaje tę wprawę do umiejętności postaci, od razu zapisuje grę i zostawia plecak, przejście w toku, pętlę i skrzynkę, jak były. Część wiersza o wprawie i przycisk znikają; reszta wiersza zostaje do „Zamknij”. Gdy pętla zbierze więcej, część i przycisk wracają. Fokus klawiatury przechodzi na „Zamknij”.
- Wypłaconej wprawy nie dostaje się drugi raz: gdy ukończy się przejście, w którym ją zebrano, do pętli dochodzi tylko to, co zebrało się po „Odbierz”, i późniejsze „Zatrzymaj” wypłaca tylko to.
- Postać, której pętlę zatrzymała śmierć, i postać bez czekającej wprawy nie mają przycisku.
- Przycisk jest zwykłym przyciskiem z tekstem w zieleni, której gra już używa dla „działa / w porządku”, w spoczynku i pod kursorem. Strona z przykładami kontrolek pokazuje go we wszystkich stanach.
- Zapis gry sprzed tej zmiany nie wczyta się w nowej wersji: zmienił się kształt zapisanego raportu, więc wersja zapisu wzrosła raz, z 4 do 5. Projekt przyjął na razie utratę takiego zapisu.

Zgodnie z Twoją prośbą trzy rzeczy, których wcześniej nie widziano, obejrzano w prawdziwej przeglądarce, z wymyślonymi postaciami, i nic nie było nie tak: raport na scalonym ekranie pod obrazem obozu, stronę z przykładami kontrolek z nowym przyciskiem w jego stanach oraz powrót przycisku około pięciu sekund po „Odbierz”, gdy pętla przeszła kolejną minutę i zebrała jeszcze jeden punkt wprawy.

### Pod spodem

Czekająca wprawa nie jest już zapisana w raporcie; gra czyta ją z pętli za każdym razem, gdy rysuje ekran, a „Odbierz” opróżnia ją w pętli i w przejściu w toku, więc nic nie musi pamiętać, co już wypłacono.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

brak

### Popraw albo przepuść

1. Poprosiłeś, żeby wytyczna wymieniająca rodzaje wspólnego przycisku została rozszerzona „przez własny skill utrzymania wytycznej”. Ten skill prowadzi z Tobą doprecyzowanie wytycznych kodu i sam nigdy wytycznej nie pisze, więc żaden jego krok nie mógł się wykonać w cyklu; autor dopisał jedno zdanie z nazwą zielonego rodzaju, w akapicie przykładów, który niczego nie wiąże, a recenzent uznał to za uczciwe wykonanie. Jeśli myślałeś o osobnym zadaniu doprecyzowania wytycznych, jeszcze go nie ma. Zrobienie go kosztuje rundę doprecyzowania z Tobą; zostawienie nic dziś nie kosztuje, a zdanie powtarza tylko to, co mówi już decyzja o wspólnych kontrolkach, więc nikt nie zbuduje na błędnej regule. Rekomenduję przepuścić. Zrobić zadanie czy przepuścić? (Drobne uwagi, 1)

### Przyjmujesz przez scalenie

Scalenie przyjmuje te punkty; jeśli któryś Ci nie odpowiada, powiedz który.

2. Cykl nie dodał drugiego zapisu tego, co wypłacono. „Odbierz” wypłaca czekającą wprawę i opróżnia ją, i w pętli, i w przejściu w toku, więc to, co trzymają pętla i przejście, jest zawsze tym, co jeszcze czeka. Druga droga, osobna liczba „już wypłacone” obok zebranej wprawy, wymagałaby własnej reguły przy wczytywaniu zapisu i odejmowania po każdej śmierci pokrytej wskrzeszeniem i po każdym zakończonym przejściu, inaczej liczba czekającej wprawy mogłaby zejść poniżej zera. Cena obranej drogi: liczba, którą trzyma przejście pętli, znaczy teraz „jeszcze niewypłacona”, co zapisano we wpisie o tym, jak stan gry trzyma pętle zarobkowe.
3. We wpisie o tym, co gracz czyta po nieobecności, nie ma jednego zdania: kosztów, które przyjąłeś przy liczbie na żywo (wiersz zmienia się, gdy go czytasz, przycisk wraca chwilę po wypłacie, jeden wiersz łączy dwie chwile). Zatwierdzona definicja go nie zawiera i jest jedynym źródłem brzmienia tego wpisu, więc cykl je pominął; koszty zostają w zadaniu i tutaj. Zdanie tego samego rodzaju zostaje we wpisie o wspólnych kontrolkach, bo trzyma je Twoja odpowiedź o wyglądzie przycisku.
4. Po „Odbierz” fokus klawiatury przechodzi na „Zamknij”, więc następny klawisz zostaje w raporcie, a nie spada na stronę. Drugi Enter zamyka wtedy raport. Żadna zapisana reguła tego nie rozstrzyga; wynika z reguły fokusu, której „Zamknij” już używa. Widziano to w przeglądarce w sprawdzeniu, o które prosiłeś.
5. Dwa wpisy fundamentu są własnymi wpisami cyklu, których nie widziałeś przy zadaniu: wpis o tym, jak stan gry trzyma pętle zarobkowe, mówi teraz, że pętla trzyma wprawę zebraną od ostatniego odebrania, że „Odbierz” opróżnia ją razem z wprawą przejścia w toku i że śmierć bez gotowego wskrzeszenia zabiera to, co czeka; oraz nowa reguła mówi, że wprawa zebrana przez pętlę zarobkową nigdy nie trafia do umiejętności postaci dwa razy, którąkolwiek drogą jest wypłacana („Odbierz” albo zatrzymanie) i czy między jednym a drugim ukończyło się przejście. Po Twoich uwagach zdanie reguły wymienia tylko „Odbierz” i zatrzymanie jako drogi wypłaty do umiejętności, a reguła jest powiązana ze wszystkimi czterema decyzjami, które ją zapisują.
6. Testy niosące reguły o ukończeniu przejścia, nadrabianiu nieobecności i wersji zapisu gry przepisano pod wiersz raportu bez wprawy i pod wersję 5; żaden nie został osłabiony, a stary dokument wersji 4 zostaje w nich i jest odrzucany jako dokument innej wersji. Nową regułę niosą trzy testy, które padają, gdy „Odbierz” zostawia wprawę nieopróżnioną, w tym test sprawdzający, że „Odbierz” zostawia plecak, przejście i skrzynkę, jak były. Żadna reguła nie jest oznaczona jako naruszona i żadna powierzchnia ani część mapy się nie zmieniły.
7. Dwa punkty przepuściłeś w komentarzu, więc cykl nic dla nich nie robił: świeże przeczytanie dziewięciu decyzji przez nowego recenzenta (autor, który sprawdzał zapisane reguły, przeczytał wszystkie dziewięć w całości, a przegląd scalenia nie znalazł sprzeczności) oraz starą lukę pod regułą, że żadna część kodu nie importuje innej, chyba że wolno (piszesz, że jest w otwartym przeglądzie fundamentu).

## Koszt

Około 1 h 30 min czasu pracy, z czego 40 min oczekiwania na narzędzia, na jednym modelu (orkiestrator i jego agenci; około 134 mln tokenów, z czego 130 mln to wejście z pamięci podręcznej, 384 tys. wyjścia), łącznie z poprawką po Twoich uwagach. Rundy przeglądu: jeden przegląd całej zmiany z jedną poprawką trzech drobnych uwag i jednym przeglądem tej poprawki; jeden przegląd etapu sprawdzającego zapisane reguły; jeden przegląd scalenia z gałęzią docelową; jeden przegląd poprawki po Twoich uwagach; raport autora wrócił raz do naprawy. Tabela etapów jest w zatwierdzonym zapisie cyklu: https://github.com/mariusznazar/loop2/blob/RECORDSHA/docs/task-cycles/raport-z-wyplata/stages.md

## Jak scalić

Scal commitem scalającym, który zachowuje commity (bez squasha i bez rebase), bo odnośnik do zapisu cyklu przeżywa tylko wtedy.

Fundament czeka na przegląd od 85 scaleń od początku historii (żaden przegląd nie został jeszcze oznaczony tagiem). Przeglądem jest umiejętność `the-way-review-foundation`, uruchamiana w sesji w tym repozytorium. Nic w tej prośbie na nią nie czeka.

</details>

## Technical changes

The change is a button and a changed meaning of one number, so most of it is in three groups. Where a number or a line is named, a human can check it without the code.

- **The state of the game (`a9a9b257`).** `src/browser/sim/loop.ts` gets `waitingPractice` (the loop's practice plus the practice of the map run going on, none when that run ended in death) and `takeLoopPractice`, which pays it into the character's skills and sets the practice of the loop and of its map run to `{}`; the loop, backpack, chest, counts and seed stay. `stopLoop` pays `waitingPractice`; `endLoopRun` adds only what the run gathered after „Odbierz”. The report line no longer holds `practice` (`AwayReportLine` in `src/browser/sim/types.ts`, the catch-up in `loop.ts`, and `practiceGain` is removed). `src/browser/sim/saved-game.ts` refuses a line that still holds `practice`, and `SAVED_GAME_VERSION` goes from 4 to 5.
- **The screen (`a9a9b257`).** `src/browser/view/away-report.ts` composes the line „wprawa do odebrania: …” from the loop and offers the act; `src/browser/view/headquarters.tsx` draws „Odbierz” beside the line, moves the focus to „Zamknij” and passes the act on; `src/browser/view/game-view.ts` maps it to `takeLoopPractice`, which saves at once through the existing act; `src/browser/view/controls/button.ts` and `react-button.tsx` add the kind `positive`; `src/browser/styles.css` adds `.button.positive` and makes the report line a wrapping row; the sample page `src/browser/kitchen-sink/kitchen-sink.ts` shows "Przycisk w zieleni" in all states. Tests: `tests/sim/loop.test.mjs`, `catch-up.test.mjs`, `saved-game.test.mjs`, `tests/view/away-report.test.mjs`, `headquarters-screen.test.mjs`, `react-controls.test.mjs`, `account-screen.test.mjs`.
- **The foundation and the styleguide (`caf7bf39`, `be946654`, `1a4b79b8`).** See *Foundation entries*; the styleguide gets the new look in "States of shared controls" and "Main button, secondary action and tab" and the sample page rule.
- **The fix of the Minor findings of the first review (`e3f64ea9`).** One commit: the Roles table row for the green text, the events asserted in the refusal paths of „Odbierz” (and one test for a map run that ended in death), the comments and the entry about the loop re-wrapped to about 100 columns, and one typo in a comment. 28 lines of the Roles table changed only by padding that Prettier added; `git diff -w` shows two real differences.
- **The return step (`92b8311a`).** The new rule `loop-practice-payment` in `foundations/invariants.md`, its name in the *Verification* of the decision on what pays, and two test citations in `tests/sim/loop.test.mjs`.
- **The merge (`840b59f0`).** The target branch moved while this change was in review (the camp at the top of the headquarters). One conflict in `src/browser/view/headquarters.tsx`: the camp's fragment kept, and the report's `onTake` and `closeRef` put back on `AwayReport`.
- **The correction for your remarks (`950f0751`, `76389bff`).** `950f0751` (remark 2): the sentence of `loop-practice-payment` now reads "The practice an earning loop gathers is never added to its character's skills twice, whichever of „Odbierz” and the stop of the loop pays it and whether the completion of the map run it was gathered in came between."; its *Derives from* is D-189 · D-241 · D-245 · D-246, each of which names it in its *Verification*; the comment `// invariant: trip-run-end` moved to `loop-practice-payment` on the test "taking the practice pays what the loop and its map run going on gathered …". `76389bff` (remark 3): one sentence in `guidelines/coding-browser-module.md`, section "Kontrolki w DOM i ich aktualizacja" (under Examples), naming the kind `positive` beside `secondary`, `tab` and `main`, citing D-44. Remark 1 changed nothing in the repository.

## Checks

- **The gate:** `npm test` on the corrected tree `76389bff` (reviewed; the target branch unchanged at `1b0c8ad4`) → **failed once, then passed**: the first run → exit 1, one failing test (see below), and it stopped there, so the Python directories and the foundation check did not run in it; the same command run again on the same tree → exit 0, 542 tests in 4 directories, every directory passed, 0 foundation errors. The failure stays in this report. The failing test is `tests/transport.test.mjs`, "transport refuses ambiguous proxy metadata before loading live sessions": `HTTP deadline exceeded` after 7678 ms against the 5000 ms limit its request helper sets; run alone five times (diagnosis only) it passed each time in 0.53–0.70 s, so the cause is that fixed deadline under the load of a full run, where test files run side by side; it is a file of the account server, which this change does not touch (see *Findings outside the task's scope*). Cycle runs of the gate on the corrected tree: 1 failed, 1 passed. Before the correction, on `840b59f0`, the same command → exit 0, 542 tests, 0 errors; on the base `2b4d760c` → exit 0, 542 tests, 0 errors, so nothing fails on the base. A first run of the gate on the base failed on a broken dependency install (two installs ran at the same time), not on the base; it was repeated after a clean reinstall.
- **Unrun or unseen:** the report at a narrow window width and the closed-menu states of the camp were not looked at (not asked); the full gate was not run by the authors, only by the orchestrator; the mutation tool was run only on `loop.ts` lines 168–242, not on the whole change.
- **The three things that had not been seen (your remark 1), in a real browser:** the author ran the game locally over HTTPS, composed a saved game by the ordinary save request (three characters: Ala and Ola in loops, Ela's loop stopped by a death; Ala's map run one game minute from its end) and looked with Playwright. (a) The report on the merged screen: the camp band over the panel with `aria-hidden`, the report inside the panel; Ela's line in the danger colour with no button, Ala's line „… · wprawa do odebrania: Jedzenie +4” with the green „Odbierz” beside it, Ola's line with nothing waiting and no button; nothing overlapped. (b) The page of sample controls, row "Przycisk w zieleni" by computed styles: rest — text `rgb(0,188,125)` (the green role), no fill; under the pointer — the same text on the highlight fill; focus — the same text with the common outline; disabled — the disabled text colour; error, empty and loading — the "Nie dotyczy" reasons the styleguide gives; the only console error was the page's missing `favicon.ico`. (c) The button back: after „Odbierz” the line lost the practice part and the button (the loop at minute 0); at about 7 s, the loop at minute 1, the line read „… · wprawa do odebrania: Eksploracja +1” with „Odbierz” beside it again. The reviewer fetched the three images from the screenshots repository and found them to show what is reported; it could not see a browser itself.
- **Focused checks (authors, reviewers):** typecheck, ESLint, Prettier, `node --test` on `tests/sim` (775) and `tests/view` (1128) → exit 0 each; the invariant tests `test_browser_view_token_values`, `test_design_token_contrast`, `test_cross_part_imports`, `test_browser_view_focus_outline`, `test_browser_view_framework`, `test_application_build_kitchen_sink`, `test_simulation_isolation`, `test_simulation_inputs` → exit 0 each; `test_loop2_container_sprites` after the merge → exit 0. Mutation tool on `src/browser/sim/loop.ts` lines 168–242 → 33 of 34 mutants killed; the survivor is the events of `stopLoop` when there is no loop (`loop.ts:192`, code older than this task, left as it is). For the correction: `foundation_check.py` → exit 0 (0 errors), `npm test -- tests/sim/loop.test.mjs` → exit 0 (44 pass), ESLint and Prettier → exit 0; the reviewer repeated them in a scratch copy → exit 0 each.
- **Own-work check:** the requirement most likely unmet, "paid practice does not come back", was checked by the test "practice taken is paid once: the completion of the map run it was taken in adds only what came after, and so does the stop" (skills end at +49 and +1 exploration; the stop writes `{ exploration: 1 }`); it fails when `takeLoopPractice` leaves the practice unemptied (`npm test -- tests/sim/loop.test.mjs` exit 1, 4 fail) and passes (exit 0, 44 pass). The version test failed with `SAVED_GAME_VERSION` set back to 4 (exit 1).
- **The checks of this description and the record (WAY-290, WAY-309, WAY-316, WAY-294):** CHECKRUNS

## Foundation entries

- **D-189** (projected, written whole in the approved wording): a player takes the practice an earning loop gathered with „Odbierz” without stopping the loop, the map run going on included; the loop's practice is also paid at the stop; a death with no resurrection takes it with the rest (D-190). *Verification* names the new rule.
- **D-245** (projected): „Zatrzymaj” keeps its price, „Odbierz” pays without it. *Verification* names the new rule.
- **D-246** (projected, with row 1): the line of the report reads „wprawa do odebrania: …” with „Odbierz” in the green role where practice waits; the number is read from the loop whenever the section is drawn, and after „Odbierz” it and the button are gone until the loop gathers more. The *Verification* example "from completions in this catch-up" is corrected to the waiting practice read from the loop, and it names the new rule; *Origin* stays `none`.
- **D-241** (the cycle's): the loop holds the practice gathered since the player last took the practice waiting; „Odbierz” empties it with the practice of the map run going on. *Verification* names the new rule.
- **D-207** (task item 5): „Odbierz” is added to the acts after which the game saves.
- **D-39** (row 2): the green role also stands as the text of the button that pays waiting practice.
- **D-44** (row 2): the plain shared button gets a look with its text in the green role, in rest and under the pointer; the two ways not taken are in *Rejected*.
- **`loop-practice-payment`** (the cycle's, by the return step, reworded after your remarks; derives from D-189 · D-241 · D-245 · D-246, part `simulation`, method test, `Violated: no`): the practice an earning loop gathers is never added to its character's skills twice, whichever of „Odbierz” and the stop of the loop pays it and whether the completion of the map run it was gathered in came between. Changed invariant tests: the tests carrying `trip-run-end`, `catch-up-state` and `save-version` in `tests/sim/catch-up.test.mjs` and `tests/sim/saved-game.test.mjs` were rewritten for the line without practice and for version 5; three tests cite the new rule. No *Violated* mark and no surface was changed; the part map is unchanged.
- **The guideline of the browser modules** (not an entry of the foundation): one sentence names the kind `positive` beside `secondary`, `tab` and `main`.
- **Row 1 and row 2 of *Settlements to record*:** row 1 is written in D-246's binding sentence; row 2 in D-44 and D-39. A TODO that stands in the foundation: the invariant `cross-part-imports` has "TODO — the fact is not named in the foundation (a bare TODO since 2026-11-08, commit 842beb7)" in *Rests on*; this change did not write or touch it, and you let it through.

## Minor findings

The three Minor findings of the review of the whole change were fixed (one fix, reviewed: PASS) and the three Minor findings of the review of the return step were fixed by your remark 2 (reviewed: PASS). What stands is the one Minor note of the review of the correction, in the reviewer's words (the cycle fixes no Minor finding of a correction's review):

1. **Remark 3, "through the maintenance skill" — a note, not a finding to fix** (`guidelines/coding-browser-module.md`, section "Kontrolki w DOM i ich aktualizacja", under Examples). The skill leads the matters of coding guidelines inside a task's refinement with the human, and its own table says it never writes the guideline: the cycle's author writes the files, from the task document. `reading.md` adds that an extension of an existing guideline belongs in the current task, through the entry the author writes, unless the human separates it. The author read the skill and its template, wrote one sentence as the template gives, and named which steps (recognize, starting set, trial run and audit, settle with the human, hand back) did not run and why: nothing here is a standing check, an exemplar, an invariant or a rule to settle. "I judge that a fair carrying out: the skill cannot be run to the end inside a cycle, and the sentence settles no new meaning. If the human meant that a refinement task should be opened through the skill, that is not done and cannot be inside this cycle; the orchestrator can ask. It blocks nothing."

## Findings outside the task's scope

(2. is a failed check, not a reviewer's finding; 1. is the guideline sentence.)

1. **`guidelines/coding-browser-module.md`, section "Kontrolki w DOM i ich aktualizacja" (line 289-291)** named the kinds `secondary`, `tab` and `main` and not `positive` (review of the whole change, Minor 4, outside the task, no contradiction). Fixed in this request by your remark 3 (`76389bff`); it stays here with its kind and grade.

2. **A check outside the task's parts failed in a cycle run and passed again:** `tests/transport.test.mjs` (part account-server), "transport refuses ambiguous proxy metadata before loading live sessions" — `HTTP deadline exceeded`, 7678 ms against the helper's 5000 ms (`tests/transport.test.mjs:135`), in the first full gate run on `76389bff`; the same test alone, 5 runs → exit 0, 0.53–0.70 s; the full gate run again → exit 0. Cycle runs of the gate on that tree: 1 failed, 1 passed. The likely cause is the fixed 5 s deadline of the test's request helper under load; no reviewer graded it, since no review saw it. Make a task of it if the test is to be made steady.

## Course of the cycle

- **Task and sources:** a plan item of the second project plan, task 25, whose dependency (task 24) is done; the goal: after a return the player sees the earned practice in the report and pays it with „Odbierz” without stopping the loop or touching the backpack. Sources: the approved project definition (fingerprint `e6c61098`, 2026-11-13) and the foundation at `2b4d760c`.
- **Process pin:** `55afa8e57aa1b83c77108576a36642722e0dda15`, not moved.
- **Spec:** none: how the state remembers a payment is a choice of how to make what the task and the approved decisions settle, which the author made and named.
- **Route:** one author without a plan, on the same class as the orchestrator, because the change is one chain from state to screen to entries; no discarded attempt. The correction for the human's remarks of 2026-11-13 (the comment on the request, answering *Fix or let through* items 1–3 with "fix in this request" and 4–5 with "let through") resumed the same author; the target branch was unchanged (`1b0c8ad4`), so no merge was needed; the return step was repeated for what the remarks touched and committed nothing; one review of the correction (PASS); the gate was run again on the corrected tree.
- **Plan:** none.
- **Choices:** 3 of the cycle's own besides the questions of the task (the way of remembering a payment, the deleted sentence, the focus after „Odbierz”); the questions table is in the record.
- **Blocking findings left:** none.
- **Record:** https://github.com/mariusznazar/loop2/tree/RECORDSHA/docs/task-cycles/raport-z-wyplata
