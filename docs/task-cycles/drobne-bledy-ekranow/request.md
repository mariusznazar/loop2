**State: ready** — two questions below wait for your answer ("Fix or let through"); neither stops the merge.

## What you will see

Twenty-five small faults of the screens that earlier reviews reported are fixed, and the decisions that said something else than the game does now say what the game does.

- **Map drawing and the list of revealed tiles.** Hovering a tile that is not revealed no longer draws the line that ties a tile to its row; the line appears only at a revealed tile. At the smallest supported window (1280 × 720) the whole list of revealed tiles now fits its area with no horizontal scroll: the one long cell that held the campfire and a burning stick now breaks between the two texts instead of running out of the area. ![The list of revealed tiles at 1280 × 720](https://github.com/mariusznazar/screenshots/blob/492a82d0ba300f58f25226e0059767b5511dff59/loop2/drobne-bledy-ekranow/slice-12-tile-table-1280x720.png?raw=true)
- **Numbers of conditions carry their unit everywhere.** „Zostało mniej niż — ognisko 20 min”, „Temperatura poniżej 35 °C”, „Zapas poniżej 8 szt.”, „Zdrowie poniżej 8 pkt” now read the same in the row of a rule, beside the number field of the rule panel, in the chronicle and in the wolf's sentence on the crossing screen. A test now fails if a condition with a number has no unit in its data.
- **Rule panel.** The icon of a choice stays beside the first line of its name when a long name („Wytwórz — ognisko”) breaks into two lines. A greyed choice no longer lights up under the pointer. A panel that is open on a rule now goes with the rule when you move it to another group by an arrow or by the handle, and deleting the rule closes its panel. „✕” of a panel that stands under a folded group gives the keyboard focus to the header of that group. ![A choice with a two-line name keeps its icon at the first line](https://github.com/mariusznazar/screenshots/blob/f974339f20b0a05ea68afc906a915c5de8682bc4/loop2/drobne-bledy-ekranow/pick-cell-two-line-name-1280x720.png?raw=true)
- **Arrows at the edge of a group.** The arrows of a rule are off only where no group stands before (or after) the rule's group; an empty group at the edge takes the rule from the arrow. The decision that said otherwise now says this.
- **Every new copy starts with all groups unfolded**, after a send and after switching a character to another program; the folds of the copy before do not pass on.
- **The line of a program that changed.** With no unsaved changes of the copy it reads only „Program … ma zmiany, których nie ma w tej kopii.”; the longer sentence about the save replacing them stands only when the copy has unsaved changes and the save button works.
- **The chronicle** writes a changed rule as „Zmieniono regułę 2.1: „Zawsze → Eksploruj” na „Zawsze → Wędruj””.
- **Keyboard focus no longer falls to the page** after „Zatrzymaj” at a character in an earning loop (on the headquarters and on the character's screen), and the login card takes it after a refused link from an email (reset or confirmation) and after „Anuluj” of the new-password form. A click outside the open menu „Konto” closes it and leaves the focus where you clicked, so the first click into a text field puts the cursor there; Escape and a second click on „Konto” still return the focus to „Konto”, and so does a click on a place that takes no focus.
- **A long name with no space** typed by the player breaks in its row of the headquarters instead of running out of it.
- **The mage.** A mage whose walk is cut by an action that makes it stand (eating, lighting a fire, a fight, gathering) now stops where the walk had brought it and does not run on to the old target. A walk cut because you left the screen of the run is no longer played from its start when you come back; the mage stands where the walk leads.
- **Saving.** The hidden page, the closing of the tab and the 30-second rhythm now send the game state also when the last save failed, so a change whose save failed gets one more chance when you close the tab; the rhythm does not double the planned retry (one request at a time).
- **Tidying and wording in the foundation and the code.** The decisions and the styleguide now say what the code does (the list above, the menu „Konto”, the look of a greyed choice, a typed name that breaks in its row, focus never falling to the page, the pieces of the time bar having one colour, three sources the view draws from). A few comments and tests were cleaned up. The source of the grey of a dead mage and an extinguished fire is written beside its rule: accepted by you on 2026-11-16.
- **Practice (the number „Eksploracja +1”).** I played one game and read both numbers: during a run the line reads „Wprawa w tym przejściu: Eksploracja +1”, and after „Zakończ” before the map was ever completed the skill tree reads „0/15”. Both follow the rules of the game, so nothing was changed: the first number is practice gathered in the run, and practice is paid to the character only when the run completes the map for the first time. The screen does not say that practice stays unpaid without a completion (item 3).

### Underneath

Everything is small and local (screens, one data file of conditions, a few sentences of the decisions); one failure of the full gate on the first run was a mistake of this change (the panel of a rule added from the window at the end of a run did not open) and was fixed before this request.

## For you to decide

### Needed from you

none

### Fix or let through

1. Three faults that were found and that you or the player will feel were left, because they are outside this task. (a) A flight, a dust cloud, a wolf's run or the 2-second return of the light's tint that is cut by leaving the screen of the run may play again from its start when you come back, as the walk of the mage did before; it was read in the code and not reproduced. (b) A temperature in the sentence of a rule is written with a dot („36.5 °C”) while the number field and the body row of the character write a comma („36,5”); now that the unit stands beside it, the dot looks more foreign. (c) The rule that a long typed name breaks in its row now stands in the styleguide, but only the row of the headquarters does it; the names of programs, the heading of the character's screen, the names of groups can still run out of their place. Fixing all three here costs another round of correction with a review; making a task of each leaves them where they are until someone takes them; letting them through accepts them on the main branch. I recommend making a task of (a) and (c) and letting (b) through, since (a) and (c) can show on real screens and (b) is a format already used elsewhere. Fix them in this request, make a task of each, or let them through? (Findings outside the task's scope, 1, 2 and 3)
2. The sentence of the wolf on the crossing screen was not looked at in the running game, because it needs a fight; five text tests hold its new form „Zdrowie poniżej 8 pkt → Odskocz”. If the unit sits wrong there, the player sees an odd sentence during a fight. Checking by hand costs a few minutes; letting it through accepts that the sentence was checked by tests only. I recommend letting it through, since the wolf's sentence was run through all six kinds of condition by a script and each prints its unit, and five text tests hold the new form. Check it in this request, make a task of it, or let it through? The steps of the check by hand, whose result you write down as a remark:
   1. Start the game and send a character to a map where a wolf waits.
   2. Let a fight begin and open the crossing screen of the run.
   3. Read the sentence of the wolf's rule: it should end its number with „pkt” (for example „Zdrowie poniżej 8 pkt → Odskocz”).

   (Checks, 2)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

3. **The practice line says nothing about being unpaid.** The line „Wprawa w tym przejściu: Eksploracja +1” and the tree „0/15” after ending a run before a completion are both right by the rules, but a player may read them as practice lost. The task asked only to look and to describe, and the rules of the game already accept this wording; the cycle added no hint, because a hint would change a decision, not fix lost practice.
4. **A mage that dies or whose run completes in the middle of a walk freezes where it stands.** The code that makes a mage stop where it had come does the same for these two cases, which the decision about actions that make the mage stand does not list; the cycle saw the dead mage frozen in the running game. The other way (letting the walk end first) was not taken, since it would keep the old fault for these two cases.
5. **Copies made by an earning loop are not reset.** Only a send and a switch to another program give a copy with every group unfolded, as the task names them; an earning loop starts copies too and keeps its folds as before.
6. **The long cell of the list of tiles breaks in two lines instead of the columns being narrowed.** Narrowing the columns would have left four pixels between the last number and the fire text; breaking the cell keeps every name whole, and the scroll the task allowed was not needed.
7. **One foundation sentence is the cycle's own.** In the decision about the rule panel, its examples show the number of a condition with its unit (the unit is the task's point 3), a change of examples that no row of the task named.
8. **Tests that quote a sentence of a decision were rewritten.** Thirty-two such quotations in nine tests were re-quoted to the new sentences (only comment lines changed, no test checks anything else than before), and several new tests carry a quotation of the decision they hold. No test of an invariant changed meaning.
9. **Screenshots went to a separate public repository.** Executors that looked at a screen pushed the images to the repository of screenshots the product's rules name for this, on a branch of its own; nothing of them is in this repository, and the branch can be deleted there.
10. **Wording of two cases in a decision was written before the code.** The sentence that the page moves focus to the login card after a refused link from an email and after „Anuluj” was written first; the code of the cycle was then checked against it and both cases hold.
11. **The review of the whole change did not read every decision of its selection whole.** Pass 1 read 17 decisions whole and the rest by their binding sentences in its index, and pass 2 (documents) read 16 whole and named five decisions about the change it did not open. Reading them whole costs a fresh round of review; I recommend letting it through, since every decision the change writes or changes was read whole by at least one reviewer, and the behaviour they describe was checked by tests and in the running game.

## Cost

About 3 h 36 min of working time (about 56 min of it waiting for tools), over 75 stages of the cycle (turns of its agents and stretches of its own work): 135 M tokens on sonnet, 129 M on haiku and 112 M on opus, 376 M in all, almost all of it cached input; the full gate ran twice (65 s red, then 1019 s green). Review rounds: the whole change in two passes (code, documents), one fix and its review by the same two reviewers, a fix after the first gate run and its review, a review of the return step. The table of stages is in the record (Record, below). No working copy of an agent stands in the ignored working directory except what the product's own start leaves.

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record survives only then. Nothing in this request waits for a review of the foundation.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — dwa pytania poniżej czekają na Twoją odpowiedź („Napraw albo przepuść”); żadne nie wstrzymuje scalenia.

## Co zobaczysz

Poprawionych jest dwadzieścia pięć drobnych błędów ekranów zgłoszonych w wcześniejszych przeglądach, a decyzje, które mówiły co innego niż gra, mówią teraz to, co gra robi.

- **Rysunek mapy i lista odkrytych kafelków.** Najechanie na kafelek nieodkryty nie rysuje już linii łączącej kafelek z wierszem; linia stoi tylko przy kafelku odkrytym. W najmniejszym wspieranym oknie (1280 × 720) cała lista odkrytych kafelków mieści się w swoim obszarze bez przewijania w poziomie: jedna długa komórka z ogniskiem i płonącym patykiem łamie się teraz między dwa teksty, zamiast wychodzić poza obszar.
- **Liczby warunków mają jednostkę na każdym ekranie.** „Zostało mniej niż — ognisko 20 min”, „Temperatura poniżej 35 °C”, „Zapas poniżej 8 szt.”, „Zdrowie poniżej 8 pkt” czytają się tak samo w wierszu reguły, przy polu liczby w panelu reguły, w kronice i w zdaniu wilka na ekranie przejścia. Test oblewa się teraz, gdy warunek z liczbą nie ma jednostki w danych.
- **Panel reguły.** Ikona wyboru stoi przy pierwszej linii nazwy także wtedy, gdy długa nazwa („Wytwórz — ognisko”) łamie się w dwie linie. Wyszarzony wybór nie podświetla się pod kursorem. Panel otwarty na regule idzie za regułą, gdy przenosisz ją do innej grupy strzałką albo uchwytem, a usunięcie reguły zamyka jej panel. „✕” panelu stojącego pod zwiniętą grupą oddaje fokus klawiatury nagłówkowi tej grupy.
- **Strzałki na brzegu grupy.** Strzałki reguły są wyłączone tylko tam, gdzie przed (albo za) grupą reguły nie stoi żadna grupa; pusta grupa na brzegu przyjmuje regułę ze strzałki. Decyzja, która mówiła inaczej, mówi teraz to samo co gra.
- **Każda nowa kopia zaczyna z rozwiniętymi grupami**, po wysłaniu postaci i po przełączeniu postaci na inny program; zwinięcia poprzedniej kopii nie przechodzą dalej.
- **Linia programu, który się zmienił.** Bez niezapisanych zmian kopii czyta tylko „Program … ma zmiany, których nie ma w tej kopii.”; dłuższe zdanie o zastąpieniu ich zapisem stoi tylko wtedy, gdy kopia ma niezapisane zmiany i przycisk zapisu działa.
- **Kronika** zapisuje zmienioną regułę tak: „Zmieniono regułę 2.1: „Zawsze → Eksploruj” na „Zawsze → Wędruj””.
- **Fokus klawiatury nie wypada już na stronę** po „Zatrzymaj” przy postaci w pętli (w Siedzibie i na ekranie postaci), a karta logowania przejmuje go po odrzuconym odnośniku z maila (reset albo potwierdzenie) i po „Anuluj” formularza nowego hasła. Kliknięcie poza otwartym menu „Konto” zamyka je i zostawia fokus tam, gdzie kliknąłeś, więc pierwsze kliknięcie w pole tekstowe stawia w nim kursor; Escape i drugie kliknięcie w „Konto” dalej oddają fokus „Konto”, tak samo jak kliknięcie w miejsce, które fokusu nie przyjmuje.
- **Długie imię bez spacji** wpisane przez gracza łamie się w swoim wierszu Siedziby i nie wychodzi poza niego.
- **Mag.** Mag, któremu czynność każe stać w miejscu (jedzenie, rozpalanie ogniska, walka, zbieranie), staje tam, dokąd doszedł, i nie dobiega do starego celu. Marsz przerwany wyjściem z ekranu przejścia nie rusza od początku po powrocie; mag stoi tam, gdzie prowadzi marsz.
- **Zapis.** Ukryta strona, zamknięcie karty i rytm 30 s wysyłają stan gry także wtedy, gdy ostatni zapis się nie udał, więc zmiana, której zapis zawiódł, ma przy zamknięciu karty jeszcze jedną szansę; rytm nie dubluje zaplanowanego ponowienia (jedno żądanie naraz).
- **Porządek w fundamencie i w kodzie.** Decyzje i styleguide mówią teraz to, co robi kod (lista wyżej, menu „Konto”, wygląd wyszarzonego wyboru, imię wpisane przez gracza, które łamie się w wierszu, fokus, który nigdy nie wypada na stronę, kawałki paska czasu w jednym kolorze, trzy źródła, z których rysuje widok). Kilka komentarzy i testów uporządkowano. Źródło szarości martwego maga i zgasłego ogniska stoi obok jej reguły: przyjęte przez Ciebie 2026-11-16.
- **Wprawa („Eksploracja +1”).** Rozegrałem jedną grę i odczytałem obie liczby: w przejściu linia czyta „Wprawa w tym przejściu: Eksploracja +1”, a po „Zakończ” przed pierwszym ukończeniem mapy drzewo czyta „0/15”. Obie zgadzają się z regułami gry, więc nic nie zmieniłem: pierwsza liczba to wprawa zebrana w przejściu, a postać dostaje wprawę dopiero, gdy przejście po raz pierwszy kończy mapę. Ekran nie mówi, że wprawa zostaje niewypłacona bez ukończenia (punkt 3).

### Pod spodem

Wszystko jest małe i lokalne (ekrany, jeden plik danych warunków, kilka zdań decyzji); jedno czerwone uruchomienie pełnej bramki było błędem tej zmiany (panel reguły dodanej z okna końca przejścia się nie otwierał) i zostało naprawione przed tą prośbą.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

brak

### Napraw albo przepuść

1. Zostawiono trzy znalezione usterki, które poczujesz Ty albo gracz, bo wykraczają poza to zadanie. (a) Lot, obłok pyłu, bieg wilka albo 2-sekundowy powrót barwy światła, przerwane wyjściem z ekranu przejścia, mogą po powrocie zagrać od początku, tak jak wcześniej marsz maga; odczytano to z kodu, nie odtworzono. (b) Temperatura w zdaniu reguły ma kropkę („36.5 °C”), a pole liczby i wiersz ciała postaci mają przecinek („36,5”); teraz, gdy obok stoi jednostka, kropka wygląda jeszcze bardziej obco. (c) Reguła, że długie imię wpisane przez gracza łamie się w wierszu, stoi teraz w styleguide, ale robi to tylko wiersz Siedziby; nazwy programów, nagłówek ekranu postaci i nazwy grup mogą nadal wyjść poza swoje miejsce. Naprawa wszystkich trzech tutaj kosztuje kolejną rundę poprawek z przeglądem; zadanie na każdą zostawia je tak jak są, aż ktoś je weźmie; przepuszczenie przyjmuje je na gałąź główną. Rekomenduję zadanie na (a) i (c) oraz przepuszczenie (b), bo (a) i (c) mogą być widoczne na prawdziwych ekranach, a (b) to format już używany gdzie indziej. Naprawić tutaj, zrobić z każdej zadanie czy przepuścić? (Findings outside the task's scope, 1, 2 i 3)
2. Zdania wilka na ekranie przejścia nie obejrzano w działającej grze, bo wymaga walki; pięć testów tekstu trzyma jego nową postać „Zdrowie poniżej 8 pkt → Odskocz”. Jeśli jednostka stoi tam źle, gracz zobaczy dziwne zdanie w czasie walki. Sprawdzenie ręczne kosztuje kilka minut; przepuszczenie przyjmuje, że zdanie sprawdziły tylko testy. Rekomenduję przepuszczenie, bo zdanie wilka przepuszczono skryptem przez wszystkie sześć rodzajów warunku i każdy pisze swoją jednostkę, a pięć testów tekstu trzyma nową postać. Sprawdzić w tej prośbie, zrobić zadanie czy przepuścić? Kroki sprawdzenia ręcznego, którego wynik zapiszesz jako uwagę:
   1. Uruchom grę i wyślij postać na mapę, gdzie czeka wilk.
   2. Pozwól zacząć się walce i otwórz ekran przejścia.
   3. Przeczytaj zdanie reguły wilka: liczba powinna mieć na końcu „pkt” (na przykład „Zdrowie poniżej 8 pkt → Odskocz”).

   (Checks, 2)

### Przyjmujesz przez scalenie

Scalenie przyjmuje te punkty; jeśli któryś Ci nie odpowiada, napisz który.

3. **Linia wprawy nie mówi, że wprawa jest niewypłacona.** Linia „Wprawa w tym przejściu: Eksploracja +1” i drzewo „0/15” po zakończeniu przejścia przed ukończeniem są oba zgodne z regułami, ale gracz może je odczytać jako utraconą wprawę. Zadanie kazało tylko sprawdzić i opisać, a reguły gry już przyjmują to brzmienie; cykl nie dodał podpowiedzi, bo podpowiedź zmieniałaby decyzję, a nie naprawiała utraconą wprawę.
4. **Mag, który umiera albo którego przejście się kończy w środku marszu, zastyga tam, gdzie stoi.** Kod, który każe magowi stanąć tam, dokąd doszedł, robi to samo w tych dwóch przypadkach, których decyzja o czynnościach każących stać nie wymienia; cykl widział zastygłego martwego maga w działającej grze. Drugiej drogi (dokończyć najpierw marsz) nie wybrano, bo zostawiłaby starą usterkę w tych dwóch przypadkach.
5. **Kopie z pętli zarobkowej nie są zerowane.** Kopię z wszystkimi grupami rozwiniętymi dają tylko wysłanie i przełączenie na inny program, tak jak nazywa je zadanie; pętla zarobkowa też zaczyna kopie i zachowuje ich zwinięcia jak dotąd.
6. **Długa komórka listy kafelków łamie się w dwie linie zamiast zwężenia kolumn.** Zwężenie kolumn zostawiłoby cztery piksele między ostatnią liczbą a tekstem o ogniu; złamanie komórki zachowuje każdą nazwę w całości, a przewijanie, na które pozwalało zadanie, nie było potrzebne.
7. **Jedno zdanie fundamentu jest własne dla cyklu.** W decyzji o panelu reguły jej przykłady pokazują liczbę warunku z jednostką (jednostka to punkt 3 zadania) — zmiana przykładów, której żaden wiersz zadania nie nazwał.
8. **Testy cytujące zdanie decyzji przepisano.** Trzydzieści dwa takie cytaty w dziewięciu testach przepisano na nowe zdania (zmieniły się tylko linie komentarza, żaden test nie sprawdza niczego innego niż przedtem), a kilka nowych testów niesie cytat decyzji, którą trzyma. Żaden test niezmiennika nie zmienił znaczenia.
9. **Zrzuty ekranu trafiły do osobnego publicznego repozytorium.** Wykonawcy, którzy oglądali ekran, wysłali obrazy do repozytorium zrzutów, które zasady produktu wskazują do tego celu, na osobną gałąź; nic z nich nie ma w tym repozytorium, a gałąź można tam skasować.
10. **Brzmienie dwóch przypadków w decyzji napisano przed kodem.** Zdanie, że strona przenosi fokus na kartę logowania po odrzuconym odnośniku z maila i po „Anuluj”, napisano wcześniej; kod cyklu sprawdzono potem względem niego i oba przypadki się zgadzają.
11. **Przegląd całości nie przeczytał w całości każdej decyzji swojego wyboru.** Przebieg 1 przeczytał 17 decyzji w całości, resztę po zdaniach wiążących z indeksu, a przebieg 2 (dokumenty) przeczytał 16 w całości i wymienił pięć decyzji o tej zmianie, których nie otworzył. Przeczytanie ich w całości kosztuje kolejną rundę przeglądu; rekomenduję przepuszczenie, bo każda decyzja, którą zmiana pisze albo zmienia, została przeczytana w całości przez co najmniej jednego recenzenta, a opisane przez nie zachowanie sprawdzono testami i w działającej grze.

## Koszt

Około 3 h 36 min czasu pracy (z tego około 56 min to czekanie na narzędzia), 75 etapów cyklu (tury jego agentów i odcinki własnej pracy): 135 mln tokenów na sonnecie, 129 mln na haiku i 112 mln na opusie, razem 376 mln, prawie wszystko to wejście z pamięci podręcznej; pełna bramka szła dwa razy (65 s czerwona, potem 1019 s zielona). Rundy przeglądu: cała zmiana w dwóch przebiegach (kod, dokumenty), jedna poprawka i jej przegląd tymi samymi dwoma recenzentami, poprawka po pierwszym uruchomieniu bramki i jej przegląd, przegląd kroku zwrotnego. Tabela etapów jest w zapisie cyklu (Record, niżej). W ignorowanym katalogu roboczym nie został żaden katalog roboczy agenta poza tym, co zostawia własny start produktu.

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo link do zapisu cyklu przeżywa tylko wtedy. Nic w tej prośbie nie czeka na przegląd fundamentu.

</details>

## Technical changes

Seven groups of commits on top of the base (merge of the stylesheet split): the foundation entries first (`dddbc7d5` decisions D-04, D-172, D-207, D-285, D-294, D-297, D-306, D-342, D-350, D-381 and 32 re-quoted `decision:` lines of nine tests; `fecbea47` five rules of the styleguide); then 21 slices, one commit or more each: 1 `13ac5dd9` (units of conditions required by a test), 2 `f4489d36` (pick cell: icon, no highlight when greyed, tab index from a property), 3 `a4bab0a7` (unit in the sentence of a rule), 4 `8a4194c5` (unit beside the number field), 5 `61002f91` (unit in the wolf's sentence), 6 `23aa5440` (focus types moved out of the program-editor module), 7 `412b002c` and `39ca66af` (credits checks dropped; the loaded-paused-run test truly loads), 8 `30a63b81` and `85e379de` (focus to the header of a folded group; the panel follows its rule across groups; `rule-panel.tsx` too), 9 `eb8986aa` and `bc79b284` (new copy unfolded; lint and format of slice 8's faults), 10 `855939b0` (the two sentences of the line of a changed program), 11 `2b4fdc3a` (chronicle wording), 12 `798c278a` (no line at an unrevealed tile; the fire cell breaks in two), 13 `69a42675` (long name breaks in the team row), 14 `90967593` (focus after „Zatrzymaj” on two screens), 15 `0f269e61` and `dc787331` (focus to the login card; `email-confirmation.ts` too), 16 `1130a9be` (the saver sends after a failed save), 17 `2d62c5d2` (click outside the menu „Konto”), 18 `4c256a99` (the mage stops where it reached), 19 `cf068a01` (a walk cut by leaving the screen ends on `animationcancel`), 20 no commit (the practice replay), 21 `5b3dac41` (comments of the stylesheets; the rule with the grey is in `run-screen.css`, not in `styles.css` as the task names it). Then fix 1 of the whole-change review (`5ddb7050`, `a3baf310`, `04185e09`, `99e9fe6d`, `b01ec83e`, `1822fbee`, `fe15a267`: twelve `decision:` lines, old wording of the arrows in comments and test titles, the menu test, narrower `focusAfterRemove`, the key of the fire cell, decisions and the styleguide), the return step (`614f28f2`: *Verification* of five decisions) and fix 2 (`faf603a0`: `addDiscoveredRule` sets `opening` after `editCopy`; found by the first gate run, introduced by slice 8). The fix for the Minor findings within the task ran with the blocking fix: no revert was needed.

## Checks

1. The gate: `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/drobne-bledy-ekranow/gate_times.md -- npm.cmd test` on `faf603a0`, exit 0, 1018.727 s (Node tests 2588 passed; Python tests 86 + 79 + 261 + 253 = 679; foundation check `0 errors`; check of the instruction files `0 error, 142 warn, 7 info`). Run 1 on `614f28f2` exited 1 after 64.855 s: one Node test failed (`tests/view/end-window-game.test.mjs:1022`), a regression of slice 8; the Python tests and the later checks did not run in it; fixed by fix 2 and run again. Nothing failed on the base (list taken from the record of the cycle that merged it). No other check failed or did not run in run 2; CI: the repository has a CI workflow, its run is named below.
2. Not looked at in the running game: the wolf's sentence (item 2 above), and the focus after „Zatrzymaj” on the screen Mapy (left as it is by the plan). Seen in the running game by the executors and the reviewer: the unit beside the number field and in the row, the chronicle entry, both forms of the line of a changed program, the panel following a rule dragged to another group, focus after a click on a bar item, the table of tiles at 1280 × 720 (measured scrollWidth against clientWidth: 717 against 704 before, 704 against 704 after), a 40-letter name at 340, 300 and 260 px, focus after „Zatrzymaj” on two screens, the refused reset link, „Anuluj” and the refused confirmation link, the stop of the mage where it reached and the dead mage frozen, a walk cut by leaving the screen (replayed over 630 ms before, standing after), the practice numbers of one played game.
3. Own-work checks: each report in the record's `reports/` names the requirement most likely missed, the check and its result (a mutation of the production line seen failing the test, or a measurement in the running game).
4. Screenshots shown to the human (pushed to the repository of screenshots as the product's rules settle; none is kept in this repository or in the record): the pick cell with a two-line name, the list of tiles at 1280 × 720, the headquarters at 1280 and at 300 px, focus on the header of a folded group — `https://github.com/mariusznazar/screenshots/blob/f974339f20b0a05ea68afc906a915c5de8682bc4/loop2/drobne-bledy-ekranow/pick-cell-two-line-name-1280x720.png?raw=true`, `https://github.com/mariusznazar/screenshots/blob/492a82d0ba300f58f25226e0059767b5511dff59/loop2/drobne-bledy-ekranow/slice-12-tile-table-1280x720.png?raw=true`, `https://github.com/mariusznazar/screenshots/blob/4ad23d691a4e16f04ab5ea48146bfd42f295ae78/loop2/drobne-bledy-ekranow/slice-13-siedziba-1280.png?raw=true`, `https://github.com/mariusznazar/screenshots/blob/4ad23d691a4e16f04ab5ea48146bfd42f295ae78/loop2/drobne-bledy-ekranow/slice-13-siedziba-300.png?raw=true`, `https://github.com/mariusznazar/screenshots/blob/c4ba867babdbafa10f38992e2f0ba0153b52df9c/loop2/drobne-bledy-ekranow/slice-8-focus-header.png?raw=true`.
5. Form check, check of private paths on the description and on the copy of the record, image check, remarks check: last runs pending in this description until the record's copy is committed (filled in the edit that adds the record's link).
6. The remarks check on the original: `python -B .the-way/task-cycle/remarks_check.py .runs/task-cycles/drobne-bledy-ekranow`, exit 0 after one round (74 items appended); on the copy: pending.
7. Working copies left: none beyond the local start's database and `dist/` that the product's own start writes under the ignored working directory. Directories of earlier tasks kept: none.

## Foundation entries

- D-04 (row 4): the view draws also from the player's acts on the copy with the copy before and after them (chronicle), from the page's memory of the end-of-run window and from the place the browser gives for the walking mage.
- D-172 (row 8): with no unsaved changes of the copy the line says only what the copy lacks; the promise of a save stands only with unsaved changes.
- D-207 (row 5): the rhythm and the hidden page send also where the save last sent failed; one request in flight.
- D-285 (row 6): a click outside the menu „Konto” leaves the focus where it was put; Escape, a second click and a click on a place that takes no focus give it to „Konto”.
- D-294 (row 15): each new copy has every rule group unfolded.
- D-297 (row 1): an arrow is disabled only where no group stands before (after) the rule's group; its *Verification* now holds the arrow toward an empty group at the edge (return step).
- D-306 (row 2): deleting a rule closes its panel; moving it to another group does not; its examples now show units (the cycle's).
- D-342 (row 9): the chronicle writes a changed rule as „Zmieniono regułę 2.1: „…” na „…””.
- D-350 (row 3): *Rejected* now says the player would lose the open field and the place in it.
- D-381 (row 17): the card takes focus also after a refused emailed link and after „Anuluj”; its *Verification* names both cases.
- *Verification* of D-19, D-41 (hovered tile not revealed draws no line), D-288, D-291, D-295, D-300, D-309 (units in examples, tests clauses), D-318, D-319 (walk cut by an action that stays, by leaving the screen): written by fix 1 and the return step; no binding sentence changed.
- Styleguide (rows 7, 11, 12, 13, 14): the menu „Konto” sentence (as D-285); the pieces of the time bar have one colour told apart by order, gap, length and legend, and the item leaves „Otwarte dla człowieka”; a greyed pick cell takes no highlight under the pointer and its dashed frame is in `text-disabled`; a typed name breaks in its row; focus never falls to the page.
- Row 10: the grey `grayscale(1) brightness(0.55)` has its source (accepted by you, 2026-11-16) in a comment of `src/browser/run-screen.css`; row 16: the units are in the data of conditions and a test requires them (`tests/sim/data.test.mjs`); both are code, with no entry. No invariant, glossary term, environment fact or part-map line changed, no topical section of the decision log was opened.

## Minor findings

1. `foundations/decisions.md:11086-11098`: „D-319's list of tests misses one test” (return-step review, Minor 1): the test at `tests/view/scene.test.mjs:653` quotes D-319's sentence about a target that changes during a walk and holds the case where the new action keeps the mage standing; the commit added the case to D-318's list but not to D-319's, whose examples still say no test covers a changed target (true only for a turn toward another place).
2. `foundations/decisions.md:11089` and `:11797`: „Two edited lines are wrapped unevenly” (return-step review, Minor 2): about 130 characters and a cut-short line; cosmetic, nothing reads the wrap.
3. `tests/view/rule-editor.test.mjs:1127` (a test title) and `tests/view/program-panel.test.mjs:1044` (a comment) still write „Zapas poniżej 8 · Patyk” without „szt.” (review of fix 1, code side; return step concern 1).
4. `foundations/decisions.md` D-144 keeps its example without a unit on purpose (six `decision:` lines of `tests/sim/` quote its binding sentence); the „8 pkt” of the crossing screen belongs to `combat-line.ts` and its test.

## Findings outside the task's scope

1. `src/browser/view/scene.tsx:742`, `:749`, `:759` (pass 1, O1; pass 2, O-3): „the effects of an ordinary event and the return of the tint end only on `animationend`, so a scene hidden while one runs plays it again on the return” — a flight, a dust cloud, a wolf's run (≤ 300 ms) or a 2-second tint return cut by leaving the screen keeps its element and its animation and the browser starts it again from the beginning, an overdue effect played, which D-317 drops; not verified in the browser. Fix, when taken up: call the same end from the `animationcancel` listener for those elements.
2. `src/browser/view/program-editor.ts:796`–`799` (pass 1, O2): „the decimal separator differs between the sentence of a rule and the rest of the screen” — „Temperatura poniżej 36.5 °C” against „36,5” in the number field and „36,8 °C” in the body row; `conditionSentence` writes `${condition.value}` as JavaScript prints it.
3. `guidelines/styleguide-browser-view.md:529-540` (pass 2, O-1): the new rule „A name typed by the player breaks in its row” says it holds for every row with such a text, but no stylesheet besides `src/browser/headquarters.css:155-160` breaks a typed name: the program names on the list of Programy, the name in „Kto idzie” on Mapy, the heading of Postać and the names of rule groups; not checked in a browser.
4. `foundations/decisions.md:65-71` (pass 2, O-2): the „only from” list of D-04 now names the memory of the end-of-run window but no other memory of the page the view draws from (the folding, the tab „Kronika”/„Teren”, the filter, the question of „Zakończ”); the task chose exactly three sources, so widening it is your decision.
5. `guidelines/styleguide-browser-view.md:999` (pass 2, O-4): „Escape czyta korzeń okna, nigdy dokument (D-285)” cites the decision about the menu „Konto” for the end-of-run window, whose Escape another decision settles; the sentence predates this change.
6. Not a finding: pass 1's O3 (Prettier fails on the two Markdown files) is wrong; both files fail at the base too, and the gate does not check Markdown.

## Course of the cycle

- **Task and sources:** twenty-five small faults of the screens from the reviews of six earlier requests, an independent task, accepted by the adviser of the day on your behalf on 2026-11-16; base `bd82d394` (merge of the stylesheet split), the pinned process.
- **Process pin:** `bfb2e109735b5fff98802b8be0ff3c43c799262a`, not moved.
- **Spec:** none: the task left no open design choice.
- **Route:** planned slices, since the change spans many parts; no slice had a review of its own.
- **Plan:** 21 slices and a section of foundation entries written first (`plan.md` and `plan-size.md` in the record); the model of slices 12, 16, 18, 19, 20 was raised to `same` by the orchestrator.
- **Choices:** ten other choices of the cycle, in the questions table of the record (Record, below).
- **Blocking findings left:** none.
- **Record:** pending the commit that adds it.
