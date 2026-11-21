**State: ready** — three items wait for your answer: the room the remembered tests can take in a save, the walk's cases that could not be checked, and one thing the walk noticed outside the task; the final test run on this request passed.

## What you will see

Before you send a character into an earning loop, the game can now try the character's program on twelve fixed seeds of the map, at no cost, and show what happened on each seed.

- On the card of every map you may enter — also one you have not solved — each character in the section of who goes has a new button, „Oceń na 12 ziarnach”, beside „Wejdź”. It works also for a character that is in an earning loop or in a manual map run, and it changes nothing in either.
- The result opens under the character: a heading with how many of twelve seeds were solved, then twelve lines, each saying that the seed was solved, that the mage froze, starved or fell in a fight in a given minute, or that nothing was decided after 4000 game minutes. A grey sentence says that the test costs nothing: it takes nothing from the chest, pays no practice and uses no resurrection. The result stays until you pick another program, test again or leave the card.
- Beside the list of programs stands the last result for the program the list shows: „szczelny: 12 z 12” in green when all twelve seeds were solved, otherwise „{n} z 12”. If the chest later holds less than the test took, a note says „oceniono z zapasem, którego dziś nie ma w skrzynce” and the green badge goes out. Changing a program's rules, groups or plan of the trip erases its results; so does a death that takes all of a character's practice.
- „Puść w pętlę” now tests first. When all twelve seeds are solved the loop starts at once. Otherwise the result opens under the character, a warning says on how many seeds the program does not solve the map, the button reads „Puść mimo to”, and a second click starts the loop anyway. If you have just seen the same result from the test button, the loop starts at once.
- In the report you read after being away, a character whose loop went on gets at the end of the line the longest run of map runs without a death, in plain text and with no comparison.

Seven screenshots of the changed screens, taken in the running game:

![Skraj lasu: ocena 12 z 12 rozwiązanych, odznaka „szczelny: 12 z 12” przy liście Program](https://github.com/mariusznazar/screenshots/blob/5ddb284aa8f3ddd9a3d8d75c1d70f1428307611d/loop2/ocena-programu-na-ziarnach/01-szczelny-12-z-12.png?raw=true)
![wynik z wierszami śmierci i wierszami bez rozstrzygnięcia](https://github.com/mariusznazar/screenshots/blob/5ddb284aa8f3ddd9a3d8d75c1d70f1428307611d/loop2/ocena-programu-na-ziarnach/03-bez-rozstrzygniecia-8-z-12.png?raw=true)
![marks with the note about the stock the chest no longer has](https://github.com/mariusznazar/screenshots/blob/5ddb284aa8f3ddd9a3d8d75c1d70f1428307611d/loop2/ocena-programu-na-ziarnach/04-zapas-dopisek.png?raw=true)
![Na 12 z 12 ziaren program mapy nie rozwiązuje, przycisk Puść mimo to](https://github.com/mariusznazar/screenshots/blob/5ddb284aa8f3ddd9a3d8d75c1d70f1428307611d/loop2/ocena-programu-na-ziarnach/05-puszcz-mimo-to.png?raw=true)
![Las, mapa nierozwiązana: Wejdź i Oceń na 12 ziarnach, wynik 9 z 12](https://github.com/mariusznazar/screenshots/blob/5ddb284aa8f3ddd9a3d8d75c1d70f1428307611d/loop2/ocena-programu-na-ziarnach/06-mapa-nierozwiazana.png?raw=true)
![raport Gdy cię nie było z rekordem pętli](https://github.com/mariusznazar/screenshots/blob/5ddb284aa8f3ddd9a3d8d75c1d70f1428307611d/loop2/ocena-programu-na-ziarnach/07-raport-rekord-petli.png?raw=true)
![strona wszystkich stanów, wiersz Przycisk oceny](https://github.com/mariusznazar/screenshots/blob/5ddb284aa8f3ddd9a3d8d75c1d70f1428307611d/loop2/ocena-programu-na-ziarnach/08-kitchen-sink-przycisk-oceny.png?raw=true)

Beside that, two tidy-ups of the tests that do not change the game: four copies of the code that cuts source text into code, comments and strings became one, and a test of the local start that failed at random in CI no longer can.

### Underneath

A new function of the simulation runs twelve map runs of one program on the twelve seeds kept in the game's data, with what an earning loop would take from the chest and with no side effect; the game state remembers the last result of each character, program and map, which changes the shape of the save and raises its version, so today's saves are discarded at deployment, as the project's definition accepted.

## For you to decide

### Needed from you

none

### Fix or let through

1. A player who tests many programs on many maps can fill a save past the size the server accepts. Then every save fails with the message that the state of the game is too large, and progress since the last good save is lost when the page closes. Each remembered test takes 212 to 297 bytes; five characters with twenty programs on three maps is 300 tests, which is 108% to 167% of the 64 KiB limit; today's plausible play — three characters, about ten programs, three maps — is about 90 tests, 20 to 27 KiB beside a save of 10 to 20 KiB, and fits. The danger grows with every map the next task adds. Ways: let it through — costs nothing now, and the risk stays until a later change; shorten the stored form of a test (for example one letter for each of the twelve results) in this request — costs a correction round with review and another change of the save's shape (nothing is lost, since this version is not deployed yet), and it roughly halves the size but leaves the limit; keep only a limited number of remembered tests — changes the rule you settled, that the last test of each character, program and map is remembered, so it needs your decision, and costs a correction round; making a task of it to settle both ways together with the map catalog — costs a later session, undoing it nothing. I recommend making a task of it, since how many maps the game will hold decides which way is needed, and that is the next task's subject. Its weak point: until that task, a player who tests everything everywhere can hit the limit. Fix it in this request (by shortening or by a limit), make a task of it, or let it through? (Checks, 5; Findings outside the task's scope, 1)

2. Five cases of the walk through the running game could not be checked there: a death by hunger and a death in a fight inside a result (the walk met only deaths by cold), the form „3 przejścia” of the longest run, and three paths of the save's version and of a death without a resurrection that only the unit tests reach. If one is wrong, a player meets it in a rare situation: a wrong word in one result line or a mark left standing after a death. Checking them now costs a session that prepares those states in the running game and a round of review; undoing it nothing. Making a task of it leaves them checked by tests only; undoing it nothing. Letting it through accepts that; undoing it, a correction after someone meets one. I recommend letting it through, since the unit tests hold each of them. Its weak point: the unit tests read the code's own output, not the screen. Check them in this request, make a task of it, or let it through? (Checks, 6)

3. The walk noticed that at a character whose own manual map run is open, „Wejdź” on the card is inactive and the row offers no link back to that run; the walk reached the run only by its address, and does not know whether this was so before this change. A player with an open run may not find the way back from the card. Making a task of it? (Findings outside the task's scope, 2)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

4. A program's results are also erased when the game writes the rule of its first chill into the program, because that changes its rules; the task says a change of rules erases, and the rule of the first chill is silent about it. The other way — keeping the results — would leave a badge on a program whose rules changed.

5. „Puść mimo to” starts the loop as any start does and does not test again; picking another program or testing again removes it, a change of the chest alone does not. The task did not settle this. The other way — testing again at the second click — would risk an endless chain of warnings.

6. While „Puść w pętlę” tests, it is inactive and keeps its text, as the task says; the focus returns to it afterwards. The task did not settle the inactive state itself.

7. The review of the whole change found that „Puść w pętlę” started the loop at once also on a result left by an earlier „Puść w pętlę”; the task allows that only for a result from the test button, so it was fixed. The other way — widening the rule to any result standing under the character — is yours to choose; it would save a second click for a player who has seen the result.

8. The version of the save rises from 8 to 9, so every saved game made before the deployment is discarded; the project's definition accepts this for every change of the saved shape.

9. The page that shows every state of the shared controls got one more row, for the test button waiting, although the plan chose no sample; the styleguide asks for a new state on that page in the same change.

10. Foundation entries you did not see at the task: the new decision about judging a program, whose first sentence is the approved text and whose rest comes from three answers of the task, is marked as the cycle's; a sentence added to the decision about how the game names programs, copied from the task's own list, so that remembered tests are named by program number too; a reworded example in an older decision, because its word „judging” read against the new glossary entry; and the glossary entry for judging, which now says that the twelve seeds are the same on every map. (Foundation entries, 1 and 10)

11. Changed invariant tests, in plain words: the checks that no simulation file draws random numbers or reads the clock, that content names come from data, and that the balance instrument writes no file and uses no clock now cut source text through one shared helper, with no control case or expected value changed; the test of the local start now takes its busy stand-in's port safely; and the test of an unhandled failure holds a stronger assertion. A set of new tests also holds sentences of decisions by lines that quote them. (Foundation entries, 12)

## Cost

About 379 million tokens in 31 agents: the strongest class (193 million, planning, foundation entries, every review, the fix of the whole-change review and the return step), the ordinary class (185 million, thirteen executors, the walk and two small steps) and one cheap executor (1.5 million). Eleven reviews and three fix rounds (the slice that stores results, the screen slices, and the whole change), each fix reviewed once. The table of stages with times and tokens is in the record linked at the end.

## How to merge

Merge with a merge commit, not a squash or a rebase, since the link to the record survives only then. The foundation has waited for a review through 51 merges since the tag of the last review, below the threshold of 60; nothing is asked.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — trzy pozycje czekają na Twoją odpowiedź: ile miejsca w zapisie mogą zająć zapamiętane oceny, przypadki przejścia po grze, których nie dało się sprawdzić, i jedna rzecz, którą przejście zauważyło poza zadaniem; ostatni przebieg testów tej prośby przeszedł.

## Co zobaczysz

Zanim wyślesz postać w pętlę zarobkową, gra potrafi teraz bez kosztu sprawdzić program postaci na dwunastu stałych ziarnach mapy i pokazać, co się stało na każdym ziarnie.

- Na karcie każdej mapy, na którą możesz wejść — także nierozwiązanej — przy każdej postaci w części „Kto idzie” stoi nowy przycisk „Oceń na 12 ziarnach”, obok „Wejdź”. Działa też dla postaci, która jest w pętli albo w ręcznym przejściu, i niczego w nich nie zmienia.
- Wynik rozwija się pod postacią: nagłówek z liczbą rozwiązanych ziaren z dwunastu, potem dwanaście wierszy — ziarno rozwiązane, mag zamarzł, umarł z głodu albo zginął w walce w danej minucie, albo bez rozstrzygnięcia po 4000 minutach gry. Szare zdanie mówi, że ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci i nie zużywa wskrzeszenia. Wynik stoi, dopóki nie wybierzesz innego programu, nie ocenisz ponownie albo nie wyjdziesz z karty.
- Przy liście programów stoi ostatni wynik programu, który lista pokazuje: „szczelny: 12 z 12” na zielono, gdy rozwiązano wszystkie dwanaście ziaren, a inaczej „{n} z 12”. Gdy w skrzynce jest potem mniej, niż ocena wzięła, dopisek „oceniono z zapasem, którego dziś nie ma w skrzynce” gasi zieloną odznakę. Zmiana reguł, grup albo planu wyprawy programu kasuje jego wyniki; kasuje je też śmierć, która zabiera postaci całą wprawę.
- „Puść w pętlę” teraz najpierw ocenia. Gdy wszystkie dwanaście ziaren jest rozwiązanych, pętla rusza od razu. W przeciwnym razie wynik rozwija się pod postacią, ostrzeżenie mówi, na ilu ziarnach program nie rozwiązuje mapy, przycisk zmienia napis na „Puść mimo to”, a drugie kliknięcie i tak puszcza pętlę. Jeśli przed chwilą widziałeś ten sam wynik z przycisku oceny, pętla rusza od razu.
- W raporcie, który czytasz po nieobecności, na końcu wiersza postaci, której pętla trwała, stoi najdłuższy ciąg przejść bez śmierci, zwykłym tekstem i bez porównania.

Siedem zrzutów zmienionych ekranów z działającej gry stoi wyżej, w angielskiej części.

Poza tym dwa porządki w testach, które nie zmieniają gry: cztery kopie kodu tnącego tekst źródłowy na kod, komentarze i napisy stały się jednym, a test startu lokalnego, który w CI padał losowo, już nie może.

### Pod spodem

Nowa funkcja symulacji puszcza dwanaście przejść jednego programu na dwunastu ziarnach zapisanych w danych gry, z tym, co wzięłaby pętla ze skrzynki i bez skutków ubocznych; stan gry pamięta ostatni wynik każdej postaci, programu i mapy, co zmienia kształt zapisu i podnosi jego wersję, więc dzisiejsze zapisy przepadają przy wdrożeniu, jak przyjęła definicja projektu.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

brak

### Popraw albo przepuść

1. Gracz, który ocenia wiele programów na wielu mapach, może wypełnić zapis ponad rozmiar, który przyjmuje serwer. Wtedy każdy zapis kończy się komunikatem, że stan gry jest za duży, a postęp od ostatniego dobrego zapisu przepada przy zamknięciu strony. Jedna zapamiętana ocena zajmuje od 212 do 297 bajtów; pięć postaci po dwadzieścia programów na trzech mapach to 300 ocen, czyli od 108% do 167% limitu 64 KiB; dzisiejsza prawdopodobna gra — trzy postacie, około dziesięciu programów, trzy mapy — to około 90 ocen, od 20 do 27 KiB obok zapisu 10–20 KiB, i mieści się. Zagrożenie rośnie z każdą mapą, którą doda następne zadanie. Drogi: przepuścić — nic teraz nie kosztuje, ryzyko zostaje do późniejszej zmiany; skrócić zapisaną postać oceny (na przykład jedna litera na każdy z dwunastu wyników) w tej prośbie — kosztuje rundę poprawki z przeglądem i kolejną zmianę kształtu zapisu (nic nie przepada, bo ta wersja nie jest jeszcze wdrożona), a rozmiar zmniejsza mniej więcej o połowę, lecz limit zostaje; trzymać ograniczoną liczbę ocen — zmienia ustaloną przez Ciebie regułę, że pamięta się ostatnią ocenę każdej trójki postać, program i mapa, więc wymaga Twojej decyzji i rundy poprawki; zrobić z tego zadanie, które rozstrzygnie obie drogi razem z katalogiem map — kosztuje późniejszą sesję, cofnięcie nic. Polecam zadanie, bo to, ile map będzie miała gra, rozstrzyga, która droga jest potrzebna, a to temat następnego zadania. Słabe miejsce: do czasu tego zadania gracz, który ocenia wszystko wszędzie, może trafić w limit. Poprawić w tej prośbie (skróceniem albo limitem), zrobić zadanie czy przepuścić? (Checks, 5; Findings outside the task's scope, 1)

2. Pięciu przypadków przejścia po działającej grze nie dało się tam sprawdzić: śmierci z głodu i śmierci w walce w wyniku (przejście trafiło tylko na śmierć z zimna), formy „3 przejścia” najdłuższego ciągu oraz trzech ścieżek wersji zapisu i śmierci bez wskrzeszenia, do których docierają tylko testy jednostkowe. Jeśli któryś jest błędny, gracz trafi na niego w rzadkiej sytuacji: złe słowo w jednym wierszu wyniku albo odznaka, która została po śmierci. Sprawdzenie teraz kosztuje sesję, która przygotuje te stany w działającej grze, i rundę przeglądu; cofnięcie nic. Zadanie zostawia je sprawdzone samymi testami; cofnięcie nic. Przepuszczenie to akceptuje; cofnięcie — poprawka po tym, jak ktoś na któryś trafi. Polecam przepuścić, bo testy jednostkowe trzymają każdy z nich. Słabe miejsce: testy jednostkowe czytają wynik kodu, nie ekran. Sprawdzić w tej prośbie, zrobić zadanie czy przepuścić? (Checks, 6)

3. Przejście zauważyło, że przy postaci, która ma otwarte własne ręczne przejście, „Wejdź” na karcie jest nieaktywne, a w wierszu nie ma odnośnika z powrotem do tego przejścia; przejście dotarło do niego tylko po adresie i nie wie, czy tak było już przed tą zmianą. Gracz z otwartym przejściem może nie znaleźć drogi powrotnej z karty. Zrobić z tego zadanie? (Findings outside the task's scope, 2)

### Przyjmujesz przez scalenie

Scalenie przyjmuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

4. Wyniki programu kasuje też chwila, w której gra dopisuje do programu regułę pierwszego chłodu, bo to zmienia jego reguły; zadanie mówi, że zmiana reguł kasuje, a reguła pierwszego chłodu o tym milczy. Druga droga — zostawić wyniki — zostawiłaby odznakę przy programie ze zmienionymi regułami.

5. „Puść mimo to” puszcza pętlę jak każdy start i nie ocenia ponownie; wybór innego programu albo nowa ocena je usuwa, sama zmiana skrzynki nie. Zadanie tego nie rozstrzygało. Druga droga — ocenianie ponownie przy drugim kliknięciu — grozi niekończącym się łańcuchem ostrzeżeń.

6. Gdy „Puść w pętlę” ocenia, jest nieaktywne i zachowuje swój napis, jak mówi zadanie; fokus wraca na nie potem. Samego stanu nieaktywnego zadanie nie rozstrzygało.

7. Przegląd całej zmiany znalazł, że „Puść w pętlę” puszczało pętlę od razu także na wynik zostawiony przez wcześniejsze „Puść w pętlę”; zadanie dopuszcza to tylko dla wyniku z przycisku oceny, więc poprawiono. Druga droga — rozszerzyć regułę na każdy wynik stojący pod postacią — jest do Twojego wyboru; oszczędziłaby drugie kliknięcie graczowi, który wynik widział.

8. Wersja zapisu rośnie z 8 do 9, więc każdy zapis sprzed wdrożenia przepada; definicja projektu przyjmuje to przy każdej zmianie kształtu zapisu.

9. Strona pokazująca każdy stan wspólnych kontrolek dostała jeden wiersz więcej, dla przycisku oceny w czasie liczenia, choć plan nie przewidywał próbki; styleguide prosi o nowy stan na tej stronie w tej samej zmianie.

10. Wpisy fundamentu, których nie widziałeś przy zadaniu: nowa decyzja o ocenie programu, której pierwsze zdanie jest zatwierdzonym tekstem, a reszta pochodzi z trzech odpowiedzi zadania, oznaczona jako wpis cyklu; zdanie dopisane do decyzji o tym, jak gra nazywa programy, skopiowane z listy samego zadania, żeby zapamiętane oceny też nazywały program numerem; przeformułowany przykład w starszej decyzji, bo jej słowo „judging” czytało się wbrew nowemu hasłu słownika; oraz hasło słownika „judging”, które mówi teraz, że dwanaście ziaren jest takich samych na każdej mapie. (Foundation entries, 1 i 10)

11. Zmienione testy niezmienników, zwykłymi słowami: kontrole, że żaden plik symulacji nie losuje liczb ani nie czyta zegara, że nazwy treści biorą się z danych i że przyrząd balansu nie zapisuje plików ani nie używa zegara, tną teraz tekst źródłowy jednym wspólnym kodem, bez zmiany przypadku kontrolnego ani wartości oczekiwanej; test startu lokalnego bierze port swojego zajętego zastępnika bezpiecznie; a test niewychwyconego błędu trzyma mocniejszą asercję. Zestaw nowych testów trzyma też zdania decyzji liniami, które je cytują. (Foundation entries, 12)

## Koszt

Około 379 milionów tokenów w 31 agentach: najmocniejsza klasa (193 mln: planowanie, wpisy fundamentu, każdy przegląd, naprawa przeglądu całości i krok zwrotu), zwykła klasa (185 mln: trzynastu wykonawców, przejście po grze i dwa małe kroki) i jeden tani wykonawca (1,5 mln). Jedenaście przeglądów i trzy rundy poprawek (slice zapamiętujący wyniki, slice'y ekranu i cała zmiana), każda poprawka z jednym przeglądem. Tabela etapów z czasami i tokenami jest w zapisie linkowanym niżej.

## Jak scalić

Scal commitem scalającym, nie squashem ani rebase'em, bo link do zapisu przeżywa tylko wtedy. Fundament czeka na przegląd przez 51 scaleń od znacznika ostatniego przeglądu, poniżej progu 60; nic nie jest proszone.

</details>

## Technical changes

- **Foundation entries** (`a65b8fa4`, reworked in `f5d659f8` and `f21faa83`): two new decisions, six changed, one rationale corrected, two glossary terms (details under *Foundation entries*).
- **The judging** (`93dd78b3`): `src/browser/sim/judging.ts` with `judgeOnSeeds`, the cap `judgingCapMinutes` (4000) and the seeds `judgingSeeds` (1 to 12) beside each other in `src/browser/sim/data/balance.ts`, the types `SeedResult` and `Judging`; `tests/sim/judging.test.mjs`.
- **What the game remembers and the save** (`bae893e2`, `f93df2f6`, `9efb8a8a`, `3218a620`, `7fc40efc`): the remembered judgings of each character, program and map in the game state and the strict load of them in `src/browser/sim/saved-game.ts`; the loop record (`inARow`, `loopRecord`) counted in `takeEnd` of `loop.ts` and loaded strictly; the act of a judging, the mark of a program and the erasing in `src/browser/sim/judging-record.ts` with hooks in `game.ts`, `programs.ts` and `loop.ts`; the version of the saved game raised from 8 to 9 once, with the document of `tests/sim/saved-game.test.mjs` rewritten and the document of version 8 kept as one refused.
- **The instrument** (`b1a49f87`): `DEFAULT_CAP_MINUTES` of `balance/engine.mjs` is the cap of the game's data read from the built game.
- **The screens** (`159eca79`, `47111517`, `0095c910`, `8b280fc2`, `cf8261c8`, `25d1494d`, and the fixes `21499c5d` and `f2d28489`): `src/browser/view/judging-lines.ts` (the texts), `judging-result.tsx` (the result under a character), the button, the mark and „Puść w pętlę” judging first in `maps-screen.tsx` and `maps-entry.ts`, the styles in `src/browser/maps-screen.css`, the loop record in `src/browser/view/away-report.ts`, the page of all states `src/browser/kitchen-sink/control-samples.tsx`; the cases of `tests/view/maps-screen.test.mjs`, `judging-lines.test.mjs`, `away-report.test.mjs`, `account-screen.test.mjs`, `uncaught-failure.test.mjs`; the styleguide rules in `guidelines/styleguide-browser-view.md` (`23e0fa01`).
- **Tests apart from the game**: one cutting of source text, `tests/invariants/source_lexer.py`, in place of four copies (`afac5cd0`) — the shared code leaves regular expressions out of the scans because the *Covers* sections of the five tests leave them out, not because the sentences of the invariants say so (the executor's report named the wrong reason); the port of the busy stand-in of the local start's test bound before the process holds (`b2114894`): the stand-in held its process 4 s before it bound the port the start had picked, so a second start could pick it and die with the collision.
- **The fix of the whole-change review** (`3b411eb5`, `be6ca93d`, `eafdde35`, `f5d659f8`): the load refuses a loop record above the completed map runs; the at-once start moves the focus only if the pressed button held it; a judging answered after another map was opened is dropped; the refusal cases of the judging now fail when a guard is removed; test titles, comments and the `tests:` clauses of the new decisions.

## Checks

1. **Final gate:** the CI run on the request's last head `4e4a104b9862fe1f5a9d843638e80438e5c38d4d` (the commit that removes the record's copy): https://github.com/mariusznazar/loop2/actions/runs/44860115386/job/136711363227 — one check, `tests`, conclusion **pass**, 5 minutes 31 seconds (the build, the Node tests, the Python tests, the foundation check and the instruction-file check of the one command all ran in it). The cycle ran no full gate on its own system and has no local time of it; no check of this cycle started a full gate, as you asked.
2. **Failing on the base:** one test, `test_a_start_on_its_way_up_is_not_taken_for_ended` of `tests/invariants/test_local_start_access.py`, a random collision of ports, the only red of the final gate of the merged request 166 (CI run 44833191338); the base `c36e2739` is a merge commit with the tree of that branch's head, so no gate ran on it. This task's slice 1 fixes that test; the executor could not reproduce the failure on Windows (15 of 15 runs of the case passed), so the cause is established by the mechanism and the error message, and the fix by a probe of the unbound port.
3. **Own-work and focused checks:** every slice's report holds its commands and exit codes; the reviewers ran their own probes: 40, 70 and 38 crafted saved documents against the load (all refused as `shape` without a throw, the game's own saves loading), hand-made mutations of the changed lines (the survivors judged equivalent, except the guard of the refusals of the judging, now killed), StrykerJS on the changed ranges (91.24% on the simulation files of slices 3, 7 and 8; 42 of 46 on the new load lines), a comparison of the four old lexer copies with the new code on 326 tracked source files (no difference) and random texts.
4. **The one command's checks at the last head** (run apart by the reviewers, in a detached worktree of the head, never as the full gate): `python -B .the-way/elements/common/foundation_check.py` exit 0 with and without `--skip-test-citations` (no `listed:` line); `python -B .the-way/instruction-files/check_instructions.py` exit 0 (0 errors, 249 warnings, the same as the base); `npm run typecheck`, `npx eslint`, `npx prettier --check` and `node tests/quality/eslint-size-rules.mjs` exit 0 on the changed files; the reviewers ran 34 test files focused.
5. **The size of a save** (the task's last sentence of *To do* 6): the measure by `slice-06-measure.mjs` in the record, re-run by the reviewer of that slice with identical output: 212 to 297 bytes for one remembered judging; 300 judgings take 107.6% to 167% of 65,536 bytes; about 150 to 280 judgings fit; the figures for ten maps were measured on invented map keys, since the data holds three maps.
6. **User-interface states and the walk:** the states of the screens were checked in code by each executor (the waiting state, the three row kinds, the badge with and without the note, the result's life) and in a real browser by the walk (29 of 34 sub-cases, none wrong; chrome, the game started on this computer over HTTPS and the page of all states). The five cases left unchecked are item 2 above. The seven screenshots are pushed to the public repository of screenshots, branch `loop2/ocena-programu-na-ziarnach`, commit `5ddb284aa8f3ddd9a3d8d75c1d70f1428307611d`; the executors inspected their own screenshots and kept none.
7. **The form check and the checks of the record:** the form check `python -B .the-way/task-cycle/request_check.py .runs/task-cycles/ocena-programu-na-ziarnach/request.md --task .runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md` exit 0 (3 runs, the last on the final file); the check of private paths on the description `python -B .the-way/task-cycle/private_paths_check.py .runs/task-cycles/ocena-programu-na-ziarnach/request.md` exit 0 (3 runs); on the copy of the record `python -B .the-way/task-cycle/private_paths_check.py docs/task-cycles/ocena-programu-na-ziarnach` exit 1 on the first copy (164 places), exit 0 after the one rewriting (2 runs); the image check `python -B .the-way/task-cycle/image_files_check.py docs/task-cycles/ocena-programu-na-ziarnach` exit 0 (1 run); the remarks check `python -B .the-way/task-cycle/remarks_check.py` on the original (exit 1 at the first run with 46 items, appended word for word, then exit 0; 2 runs) and on the copy (exit 0, 1 run, nothing listed).
8. **Working copies left:** none. **Directories of earlier tasks kept:** none.

## Foundation entries

1. **D-439 — How does the game judge a program before an earning loop?** (new, marked `the cycle's`): the game runs a character's program on twelve fixed seeds of a map, on any open map and at any character, with what the earning loop would take from the chest, and shows each seed as solved, a death with cause and minute, or undecided at a cap of game minutes from the data; it takes nothing, pays nothing, settles no death and discovers nothing. Its first sentence is the projected entry word for word; the rest of the entry is rows 1–3 and the reasons of three answers of the task.
2. **D-440 — What does the game remember of a judging, and what stands beside the list „Program:”?** (new, `row 4`): the saved game keeps the last judging of each character, program and map — twelve results and the equipment taken — and beside the list stands the badge or the count, with a note and no badge where the chest holds less; a change of rules, groups or plan of the trip erases the results of a program, and a death that takes all practice erases all of a character's.
3. **D-243** (changed, `row 5`): „Puść w pętlę” judges first; the loop starts at once when all twelve are solved or the result equals the standing one from the test button, and otherwise a second click starts it.
4. **D-329** (changed, `row 6`): the remembered judging beside „Program:”, the button of a judging and the result under the character.
5. **D-325** (changed, `row 7`): the section „Kto idzie” of the card holds the judging of the characters' programs too.
6. **D-241** (changed, `row 8`): each earning loop also holds the run of completions without a death and the longest such run, the loop record.
7. **D-246** (changed, `row 9`): the line of a character whose loop goes on ends with the loop record, plain text, none at zero.
8. **D-22** (a paragraph added, `row 10`): a judging runs on twelve fixed seeds, the same on every map, and takes no new seed.
9. **D-190** (rationale corrected, `row 11`): the rationale no longer says the game has no judging over many seeds; it says the judging covers only its twelve.
10. **Glossary:** `judging` (`row 12`; the return step added that the twelve seeds are the same on every map) and `loop record` (`row 13`).
11. **Corrections of the cycle:** D-165 got a second sentence, marked `the cycle's`, copied from the task's own list of decisions in play, that the remembered judgings name programs by number; D-415's example sentence was reworded, since its word „judging” in the everyday sense read against the new glossary entry; the pairs of examples of D-22, D-241, D-325, D-246 and D-329 (in part) moved into the `tests:` clauses where tests hold them, and the clauses of D-243, D-439 and D-440 were rewritten.
12. **Changed or added tests holding sentences by `decision:`:** `tests/sim/judging.test.mjs`, `judging-record.test.mjs`, `loop-record.test.mjs`, `saved-game-judgings.test.mjs`, `tests/view/judging-lines.test.mjs`, `maps-screen.test.mjs`, `account-screen.test.mjs`, `away-report.test.mjs`, `uncaught-failure.test.mjs`; changed invariant tests: the checks of the invariants on simulation isolation, simulation randomness, content identifiers and the balance instrument's file writes and repeatability (through the shared cutting; no control case or expected value changed), the local start's test, and the case of the invariant on an unhandled failure in `tests/view/uncaught-failure.test.mjs` (a stronger assertion). No invariant written; no part-map change but the files of `test-helpers`; no environment fact.

## Minor findings

The Minor findings that no fix made, in the reviewers' words:

1. **Review of the return step, M-1:** „Parts of the `tests:` clauses of D-241 and D-329 are held by tests that carry no `decision:` line of that decision” — `foundations/decisions.md:8687-8688` (D-241: „both numbers going through a save and a load”) and `foundations/decisions.md:9984-9985` (D-329: „the judging remembered for the program the list shows beside „Program:”, the warning of seeds left unsolved above „Puść w pętlę””); the tests that hold them cite other decisions: `tests/sim/loop-record.test.mjs:340` and `:352` only `decision: D-386`; `tests/view/maps-screen.test.mjs:1156` (and `:1218`) only `decision: D-440`; `:1523` only `D-243` and `D-326`. Remedy: add `decision: D-241 …` and `decision: D-329 …` lines to those tests or narrow the two clauses.
2. **Review of the return step, M-2:** „Code comments and test titles of the judging call a judging's run a „map run”, against the glossary” — `src/browser/sim/judging.ts:19`, `:29-31`, `src/browser/sim/data/balance.ts:47`, `tests/sim/judging.test.mjs:4-5`, `:99-100`, `:136`, `:177` (title), `:217`, `:238` (title), `:418`. No behaviour is wrong; one wording commit („run”, „run of that seed”) would close it.

## Findings outside the task's scope

1. **The size of a save** (item 1 above), in the words of the reviewer of the whole change: a player who judges much can push the save over 64 KiB; from that point every save fails with „Nie udało się zapisać postępu: stan gry jest za duży. Zatrzymaj pętle albo usuń niepotrzebne programy.” and progress since the last good save is lost when the page closes; nothing erases a judging of a program the player keeps and does not edit; deleting or editing programs frees the room, while stopping loops barely does. A way out needs a decision the task does not hold — a shorter form of a judging, or a limit on the remembered ones.
2. **The walk, a manual map run's „Wejdź”** (item 3 above): at a character whose own manual map run stands, „Wejdź” on the card is inactive and the sentence says „Przejście na mapie Skraj lasu jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.”; no link in the row to that run was found, and it was reached by its address; whether it existed before the change is not known.
3. **The guideline's stale title of a test:** `guidelines/testing.md:177` names the trust-boundary case of `tests/sim/previous-programs.test.mjs` by „a document of each version from 1 to 5 …”; the case reads „… from 1 to 9 …” at the head; stale before this change, and a title that follows the version goes stale at each raise.
4. **Readings of text no parser accepts:** `tests/invariants/source_lexer.py:194-201` — on an unclosed template or string at the end of a file the new lexer gives another reading than an old copy did; no file the build accepts can hold such text.
5. **The load admits `-0`** as a count of a loop (an older helper serving every count of the save), and several surviving mutants on lines this change did not write (`events: []` of `settleDeath` and `deleteProgram`): both outside the task.
6. **The walk, cosmetic:** at 1280 px the warning sentence stands to the right of „Oceń na 12 ziarnach” and „Puść mimo to” wraps under it; the waiting text „Oceniam…” shows for one or two frames since the judging takes about 25–30 ms.
7. **A check that failed in the cycle and passed again, outside the task's parts:** none; the base's one flaky test is fixed by slice 1 (above).

## Course of the cycle

- **Task and sources:** member of the plan of the second project of loop2 (the judging on twelve fixed seeds), depending on tasks 23 and 24, both merged; the task document in the author's notes at the plan's acceptance of 2026-11-20 (its added item 13, the flaky test, came from the day advisor on your behalf; sha256 8a4c27d34a31dfc5 against the accepted 732dd44ab2ec3f85); the base is `c36e2739883002af2b959b787eb0880b748fd7e5`, the merge of request 166.
- **Process pin:** `19e5774aed6d1d628042e23deccc110ed9f112c0`, not moved.
- **Spec:** none — no open design choice at the start.
- **Route:** planned slices (a change across simulation, screens, the instrument, the foundation and the tests of three parts).
- **Plan:** `plan.md` and `plan-size.md` in the record: 13 slices and the plan's foundation entries; slice 12 (one file of about 350 KB) exceeds the size limit and was accepted; one step the plan lacked, the page of all states, was added.
- **Choices:** 26 recorded in the questions table of the record (the plan's two questions, classes raised on four slices, the first chill, the second click, the save-size finding, and others).
- **Blocking findings left:** none; three fix rounds (slice 4's quotations, the screen slices' immediate start, the whole change's clause of a decision), each reviewed once and passed.
- **Record:** https://github.com/mariusznazar/loop2/tree/4d1597047164820dcd5dd90c0eaddc124d140096/docs/task-cycles/ocena-programu-na-ziarnach (by the SHA of the commit that adds it; the table of stages is `stages.md` there).
