**State: ready** — one item below waits for your answer (the check by hand of the screen outside Chrome); the other items are Minor findings you may let through, and what you accept by merging waits for nothing. The full tests run in CI once the request opens; its result is added to *Checks*.

## What you will see

The screen of a character now looks like a screen of the game and not like a page of text. It follows the old Loop's character screen, which was the measure, and in two places it departs from it on purpose (below).

![The old Loop's screen of a character, 31 October: a new character after a run that ended in death](https://github.com/mariusznazar/screenshots/blob/2bd7b8dc2a5729c8680604685b98e8695f1d7cbe/loop2/ekran-postaci/loop-postac-31-pazdziernika.png?raw=true)

![loop2 after the change, in the nearest state: a new character after a run that ended in death, trees folded](https://github.com/mariusznazar/screenshots/blob/3a722f40bb90b90b04deb91b686960013cfcf2b2/loop2/ekran-postaci/loop2-postac-po-smierci.png?raw=true)

- **Two parts side by side**, in blocks like the other screens: a narrow left one (a quarter of the width) and a wide right one. Under 720 px the left part stands above the right one.
- **Left, at the top:** the mage who stands at the campfire at the top of the headquarters, the same picture, the same size and the same beat (standing still when your system asks for less motion). He cannot be clicked, has no caption and stands whatever the character is doing. Beside him: the name as the title, a line with "pokolenie {n}" (from the second generation), a small hooded-figure sign and "Mag żywiołów", and the resurrection line as the game words it today.
- **Left, under the facts:** a frame that always says what the character is doing now: "W obozie"; "Przejście: {mapa} · minuta {m}", with " · postać zginęła" or " · mapa rozwiązana" once the run has ended and waits for "Restart" or "Zakończ"; or the earning loop's line with "Zatrzymaj". After a loop is stopped, "W obozie" with the line of the stop under it. The frame has no other button.
- **Right, "Umiejętności":** each known tree is one row: name, "poziom {p}", a bar of practice up to the next threshold, "{wprawa} / {próg}" (a full bar and "najwyższy" after the last threshold) and "{k} pkt" only when there are points to spend. The trees start folded at every entry to the screen; a click on a row, or the keyboard, opens its branches, which read and buy as before ("Kup").
- **"+{n} pkt czeka w pętli"** stands right after a tree's name when the practice waiting in the character's earning loop would give that tree new points to spend. It is in the ordinary text colour, not green; green stays for what works or is active now.

![loop2: a character in the camp with the tree "Eksploracja" open](https://github.com/mariusznazar/screenshots/blob/3a722f40bb90b90b04deb91b686960013cfcf2b2/loop2/ekran-postaci/loop2-postac-oboz-drzewo.png?raw=true)

![loop2: a character in an earning loop, with "Zatrzymaj" in the frame and "+1 pkt czeka w pętli" at one tree](https://github.com/mariusznazar/screenshots/blob/3a722f40bb90b90b04deb91b686960013cfcf2b2/loop2/ekran-postaci/loop2-postac-petla.png?raw=true)

**Where it departs from the old Loop, on purpose.** The bar of practice is twice as thick as the thin bar in the map header, because at that thickness its empty part could hardly be seen on the block. And there is no patch of clearing under the figure: on the screenshots he does not read as a sticker on the flat block, but that is your judgment, and a correction can add the clearing if you see a sticker. The old Loop also lets you rename the character and keep a note about it; this screen does not, as you decided.

**One change outside this screen.** On the screen of a manual run of a map that is already solved, the line of practice used to read "Wprawa w tym przejściu: …" right under the sentence saying that the run pays no practice, which a player reads as a contradiction. It now says what that practice is and that it does not enter the skills: "Wprawa zebrana w tym przejściu, która nie wejdzie do umiejętności: …", in the quieter grey of that sentence.

![loop2: the screen of a manual run of a solved map, with the new line of practice](https://github.com/mariusznazar/screenshots/blob/2bd7b8dc2a5729c8680604685b98e8695f1d7cbe/loop2/ekran-postaci/loop2-przejscie-rozwiazanej-mapy.png?raw=true)

### Underneath

The figure is the picture the headquarters band already draws, and the rows are built from the shared controls; the elemental mage now carries an icon in its data, credited with the other game icons.

## For you to decide

### Needed from you

none

### Fix or let through

1. The screen was walked in a running game in one browser only (Chrome's engine, window 1600 × 1000). Not checked in a browser: Firefox and Edge (the project leaves them to a person), the figure's motion by eye (the walk read the animation setting instead of watching frames), the frame while a manual run waits in a pause (a test of the page covers it, a browser did not) and the credit line of the new icon in the credits section. If one is wrong, a player in that browser sees a figure that does not move, a broken layout or a missing credit, and finds it after the merge. Checking now costs a session on your side and, if something is wrong, a round of correction with its review; undoing it costs nothing. Making a task of it leaves them unchecked until someone opens the screen in those browsers; undoing it costs nothing. Letting it through accepts the risk; a fault found later costs a correction. I recommend letting it through, since the figure uses the same animation rule as the campfire band, the credit line is held by two tests and the walk in Chrome passed every case. Its weak point: a fault that shows only in Firefox or Edge is found by a player. Do the check in this request, make a task of it, or let it through? The steps of the check by hand, whose result you write down as a remark:
   1. Open the game in Firefox, sign in, and open a character's screen by its name on the headquarters.
   2. The mage at the top left should move like the mage at the campfire; with your system set to reduce motion he should stand still.
   3. Click a tree's row and press Tab and then Enter on its small triangle: the branches should open and close, and the rows should not overflow the right block.
   4. Open the credits section ("Autorzy grafiki") and find a line for "Mag żywiołów" naming "Cultist icon" and its author.

   (Checks, 3)
2. The empty part of the practice bars is now a medium grey that the game's styleguide reserves for things that cannot be used now. The first version used the darker grey that marks tracks elsewhere, and on the dark block it was almost invisible (a contrast of about 1.2 to 1, against about 1.3 in the old Loop), so a reviewer asked for a fix; at about 2.3 to 1 the bars now read as a column, as in the old Loop. Two things stay open. The styleguide asks that a new use of a colour role be approved by you, and nothing in the task named this one, so merging is that approval. And the game checks the contrast of no pair with that grey, so a later change of its value toward the block's colour could make the bars fade again with every test green. Fixing it in this request would mean a new colour for tracks (a colour value is your decision, so I would need it from you) or a contrast check for that pair; either costs a round of correction with its review, and undoing it costs another round. Making a task of it costs a later session; undoing it, nothing. Letting it through costs nothing today; undoing it later is one line of style and the sentences of the entries. I recommend letting it through, since the bars read well at today's value and the entry says openly what the grey is. Its weak point: nothing stops a later change of that grey from fading the bars. Fix it in this request, make a task of it, or let it through? (Minor findings, 1 and 2)
3. When the screen of a character is opened by typing its address into the browser, keyboard focus lands on the whole screen and a focus ring is drawn around it. A click on a name, the player's own way, shows no ring. It was there before this change and lies outside it, so it is not fixed here. Make a task of it? (Findings outside the task's scope, 3)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

4. The line of practice on the screen of a run of a solved map reads "Wprawa zebrana w tym przejściu, która nie wejdzie do umiejętności: …" in the quieter grey. I chose these words because they use the vocabulary of the screen of a character ("wprawa", "umiejętności") and say that the practice is gathered but not paid. I did not keep the old grey and words, which still read as a gain beside the sentence that denies it, and I did not hide the line, since you still see what the run would grow.
5. Looks the task did not fix: the small texts "poziom {p}" and "{wprawa} / {próg}" are in the quieter grey, like notes; the frame about what the character does is outlined with the same thin line as the blocks (the styleguide lists the frame of a window in that line as a question for you, so this is the same use of the line); a tree opens by a click anywhere on its row or by the keyboard on a small triangle button at the row's start, so no new kind of button was added; the bar shows the practice against the next threshold, the numbers the row shows, as the old Loop does. I did not take a whole row as one button, since the shared button takes text only and a new kind would change the rule on shared controls.
6. "+{n} pkt czeka w pętli" counts what "Odbierz" would pay at that moment, the run going on included, so the mark always equals the points you would get. I did not count the loop's stored practice alone, which would leave out the run in progress.
7. The cycle wrote entries you did not see at the task: it changed the sentence about the practice line of a run (above) and the sentence that named that line by its old words; it added to the entry on colour roles that the practice bar's track stands in that grey, and to the entry on pictures that the figure stands in the pictures the game takes from its pack; it added the title of the new icon, as the source site names it, to the facts the game stands on; and it wrote short examples of what to compare later changes with for the figure's motion, the source of the icon's file name, the keyboard on a tree's fold and the line that stays after a completion. Each is listed in *Foundation entries*.
8. Tests that hold sentences of the entries changed: the check that every icon is credited now knows the new icon's title, the tests of the character screen and of the practice line hold the new sentences by quotation, and two tests of icons now hold the archetype's icon and its credit. The foundation check run on the finished change lists no corrected sentence of an invariant.

## Cost

About 1 hour 3 minutes of working time for the author, the three reviews, the fix and the return step ([the table of stages in the record](RECORD_LINK_PLACEHOLDER/stages.md)); 175 million tokens counted, nearly all of it cached input, the author and reviewers on the strongest model and the orchestrator on a smaller one. Four review rounds, all passed: the whole change (two Minor findings, both fixed), the fix, the return step's commit (two Minor findings, not fixed by rule) and the one fix of the first two.

## How to merge

Merge with a merge commit that keeps the commits (not a squash or a rebase), since the link to the record of the cycle survives only then.

<details>
<summary>Po polsku</summary>

**Stan: gotowe** — poniżej jedna pozycja czeka na twoją odpowiedź (sprawdzenie ekranu ręcznie poza Chrome); pozostałe to uwagi drobne, które możesz przepuścić, a to, co akceptujesz przez scalenie, na nic nie czeka. Pełne testy ruszają w CI po otwarciu prośby; jego wynik dopisuję do sekcji *Checks*.

## Co zobaczysz

Ekran postaci wygląda teraz jak ekran gry, a nie strona tekstu. Idzie za ekranem postaci starego Loopa, który był miarą, i w dwóch miejscach celowo od niego odchodzi (niżej). Zrzuty, stary Loop i loop2 po zmianie, stoją wyżej w angielskiej części opisu.

- **Dwie części obok siebie**, w blokach jak inne ekrany: wąska lewa (jedna czwarta szerokości) i szeroka prawa. Poniżej 720 px lewa stoi nad prawą.
- **Lewa, u góry:** mag, który stoi przy ognisku na górze Siedziby — ten sam rysunek, ta sama wielkość i ten sam takt (nieruchomy, gdy system prosi o mniej ruchu). Nie da się go kliknąć, nie ma podpisu i stoi, cokolwiek postać robi. Obok: imię jako tytuł, wiersz „pokolenie {n}” (od drugiego pokolenia), mały znaczek postaci w kapturze i „Mag żywiołów”, a pod spodem wiersz wskrzeszenia w brzmieniu, jakie ma dziś gra.
- **Lewa, pod informacjami:** ramka, która zawsze mówi, co postać robi: „W obozie”; „Przejście: {mapa} · minuta {m}”, a gdy przejście się skończyło i czeka na „Restart” albo „Zakończ” — z dopiskiem „ · postać zginęła” albo „ · mapa rozwiązana”; albo wiersz pętli zarobkowej z „Zatrzymaj”. Po zatrzymaniu pętli „W obozie” i pod nim wiersz zatrzymania. Ramka nie ma innych przycisków.
- **Prawa, „Umiejętności”:** każde znane drzewo to jeden wiersz: nazwa, „poziom {p}”, pasek wprawy do następnego progu, „{wprawa} / {próg}” (po ostatnim progu pełny pasek i „najwyższy”) i „{k} pkt” tylko wtedy, gdy są punkty do wydania. Drzewa zaczynają zwinięte przy każdym wejściu na ekran; kliknięcie wiersza albo klawiatura otwiera gałęzie, które wyglądają i kupuje się je jak dotąd („Kup”).
- **„+{n} pkt czeka w pętli”** stoi zaraz po nazwie drzewa, gdy wprawa czekająca w pętli zarobkowej postaci da temu drzewu nowe punkty do wydania. Ma zwykły kolor tekstu, nie zielony; zieleń zostaje dla tego, co działa albo trwa teraz.

**Gdzie celowo odchodzi od starego Loopa.** Pasek wprawy jest dwa razy grubszy niż cienki pasek w nagłówku mapy, bo przy tamtej grubości jego pusta część ledwie była widać na bloku. I nie ma polany pod ludzikiem: na zrzutach nie wygląda na naklejkę na płaskim bloku, ale to twoja ocena — jeśli zobaczysz naklejkę, poprawka może dołożyć polanę. Stary Loop pozwala też zmienić imię postaci i zapisać o niej notatkę; ten ekran nie, tak jak postanowiłeś.

**Jedna zmiana poza tym ekranem.** Na ekranie ręcznego przejścia mapy już rozwiązanej wiersz wprawy brzmiał „Wprawa w tym przejściu: …” tuż pod zdaniem, że przejście nie płaci wprawy, co gracz czyta jak sprzeczność. Teraz mówi, czym ta wprawa jest i że nie wchodzi do umiejętności: „Wprawa zebrana w tym przejściu, która nie wejdzie do umiejętności: …”, cichszą szarością tego zdania.

### Pod spodem

Ludzik to obrazek, który pas Siedziby już rysuje, a wiersze są zbudowane ze wspólnych kontrolek; mag żywiołów ma teraz w danych ikonę, wpisaną w autorów razem z pozostałymi ikonami gry.

## Do rozstrzygnięcia

### Potrzebne od ciebie

brak

### Napraw albo przepuść

1. Ekran przeszedłem w uruchomionej grze tylko w jednej przeglądarce (silnik Chrome, okno 1600 × 1000). Nie sprawdzono w przeglądarce: Firefoksa i Edge'a (projekt zostawia je człowiekowi), ruchu ludzika na oko (przejście odczytało ustawienie animacji zamiast oglądać klatki), ramki w pauzie ręcznego przejścia (test strony ją obejmuje, przeglądarka nie) i wiersza autorów nowej ikony w sekcji autorów. Jeśli któreś jest złe, gracz w tej przeglądarce zobaczy ludzika, który się nie rusza, rozjechany układ albo brak wiersza autorów — i dowie się o tym po scaleniu. Sprawdzenie teraz kosztuje sesję po twojej stronie i, jeśli coś jest złe, rundę poprawki z recenzją; cofnięcie nic nie kosztuje. Zrobienie z tego zadania zostawia to niesprawdzone, aż ktoś otworzy ekran w tych przeglądarkach; cofnięcie nic nie kosztuje. Przepuszczenie przyjmuje ryzyko; usterka znaleziona później kosztuje poprawkę. Polecam przepuścić, bo ludzik używa tej samej reguły animacji co pas przy ognisku, wiersz autorów trzymają dwa testy, a przejście w Chrome przeszło wszystkie przypadki. Słaby punkt: usterkę widoczną tylko w Firefoksie albo Edge'u znajdzie gracz. Zrobić sprawdzenie w tej prośbie, zrobić z tego zadanie, czy przepuścić? Kroki sprawdzenia ręcznego, którego wynik zapisujesz jako uwagę:
   1. Otwórz grę w Firefoksie, zaloguj się i otwórz ekran postaci przez jej imię na Siedzibie.
   2. Mag u góry po lewej powinien poruszać się jak mag przy ognisku; przy ustawieniu systemu „mniej ruchu” powinien stać nieruchomo.
   3. Kliknij wiersz drzewa i wciśnij Tab, a potem Enter na jego małym trójkącie: gałęzie powinny się otwierać i zwijać, a wiersze nie powinny wychodzić poza prawy blok.
   4. Otwórz sekcję autorów („Autorzy grafiki”) i znajdź wiersz „Mag żywiołów” z „Cultist icon” i jej autorem.

   (Checks, 3)
2. Pusta część pasków wprawy ma teraz średnią szarość, którą styleguide gry zarezerwował dla rzeczy, których nie można teraz użyć. Pierwsza wersja miała ciemniejszą szarość, która gdzie indziej znaczy tory, i na ciemnym bloku była prawie niewidoczna (kontrast około 1,2 do 1, przy około 1,3 w starym Loopie), więc recenzent kazał to poprawić; przy około 2,3 do 1 paski czyta się już jak kolumnę, tak jak w starym Loopie. Dwie rzeczy zostają otwarte. Styleguide wymaga, żebyś zatwierdził nowe użycie roli koloru, a zadanie nie nazywało tego użycia, więc scalenie jest tym zatwierdzeniem. I gra nie sprawdza kontrastu żadnej pary z tą szarością, więc późniejsza zmiana jej wartości w stronę koloru bloku mogłaby znów wyblaknąć paski przy zielonych testach. Poprawa w tej prośbie oznaczałaby nowy kolor torów (wartość koloru to twoja decyzja, więc potrzebowałbym jej od ciebie) albo sprawdzenie kontrastu tej pary; jedno i drugie kosztuje rundę poprawki z recenzją, a cofnięcie kolejną rundę. Zadanie na to kosztuje późniejszą sesję; cofnięcie nic. Przepuszczenie nie kosztuje dziś nic; cofnięcie później to jedna linia stylu i zdania wpisów. Polecam przepuścić, bo paski czytają się dobrze przy dzisiejszej wartości, a wpis mówi wprost, czym ta szarość jest. Słaby punkt: nic nie powstrzyma późniejszej zmiany tej szarości przed wyblaknięciem pasków. Poprawić w tej prośbie, zrobić z tego zadanie, czy przepuścić? (Minor findings, 1 i 2)
3. Gdy ekran postaci otwiera się przez wpisanie jego adresu w przeglądarce, fokus klawiatury ląduje na całym ekranie i wokół niego rysuje się obrys fokusu. Kliknięcie imienia, czyli droga samego gracza, obrysu nie pokazuje. Było to przed tą zmianą i leży poza nią, więc tu tego nie poprawiam. Zrobić z tego zadanie? (Findings outside the task's scope, 3)

### Akceptujesz przez scalenie

Scalenie akceptuje te pozycje; jeśli któraś ci nie odpowiada, powiedz którą.

4. Wiersz wprawy na ekranie przejścia mapy rozwiązanej brzmi „Wprawa zebrana w tym przejściu, która nie wejdzie do umiejętności: …” cichszą szarością. Wybrałem te słowa, bo używają słownictwa ekranu postaci („wprawa”, „umiejętności”) i mówią, że wprawa jest zebrana, ale niewypłacona. Nie zostawiłem starej szarości i słów, bo dalej czytają się jak zysk obok zdania, które go zaprzecza, i nie ukryłem wiersza, bo dalej widać, co przejście by rozwinęło.
5. Wygląd, którego zadanie nie ustalało: drobne teksty „poziom {p}” i „{wprawa} / {próg}” stoją cichszą szarością, jak notatki; ramka o tym, co postać robi, ma ten sam cienki obrys co bloki (styleguide wymienia ramkę okna w tej linii jako pytanie do ciebie, więc to to samo użycie linii); drzewo otwiera się kliknięciem gdziekolwiek w wiersz albo klawiaturą na małym trójkącie na początku wiersza, więc nie doszedł nowy rodzaj przycisku; pasek pokazuje wprawę względem następnego progu, czyli liczby, które pokazuje wiersz, jak w starym Loopie. Nie wzięłem całego wiersza jako jednego przycisku, bo wspólny przycisk bierze sam tekst, a nowy rodzaj zmieniałby regułę o wspólnych kontrolkach.
6. „+{n} pkt czeka w pętli” liczy to, co „Odbierz” wypłaciłoby w tej chwili, razem z trwającym przejściem, więc znacznik zawsze równa się punktom, które dostaniesz. Nie liczyłem samej wprawy złożonej w pętli, bo pomijałoby trwające przejście.
7. Cykl napisał wpisy, których nie widziałeś przy zadaniu: zmienił zdanie o wierszu wprawy przejścia (wyżej) i zdanie, które nazywało ten wiersz dawnymi słowami; dopisał we wpisie o rolach kolorów, że tor paska wprawy stoi w tej szarości, a we wpisie o obrazkach, że ludzik stoi w obrazkach, które gra bierze z paczki; dopisał tytuł nowej ikony, jak nazywa go strona źródłowa, do faktów, na których stoi gra; i napisał krótkie przykłady, z czym porównywać późniejsze zmiany: dla ruchu ludzika, dla źródła nazwy pliku ikony, dla klawiatury na zwinięciu drzewa i dla wiersza, który zostaje po zakończeniu. Każdy jest na liście w sekcji *Foundation entries*.
8. Zmienione testy, które trzymają zdania wpisów: sprawdzenie, że każda ikona ma autora, zna teraz tytuł nowej ikony, testy ekranu postaci i wiersza wprawy trzymają nowe zdania przez cytat, a dwa testy ikon trzymają teraz ikonę archetypu i jej autora. Kontrola fundamentu na gotowej zmianie nie wypisuje żadnego poprawionego zdania niezmiennika.

## Koszt

Około 1 godziny 3 minut czasu pracy autora, trzech recenzji, poprawki i kroku zwrotnego ([tabela etapów w rekordzie](RECORD_LINK_PLACEHOLDER/stages.md)); policzono 175 mln tokenów, prawie wszystkie jako wejście z pamięci podręcznej, autor i recenzenci na najmocniejszym modelu, a orkiestrator na mniejszym. Cztery rundy przeglądu, wszystkie zaliczone: całej zmiany (dwie uwagi drobne, obie poprawione), poprawki, commita kroku zwrotnego (dwie uwagi drobne, nie poprawiane z reguły) i jedna poprawka tych dwóch pierwszych.

## Jak scalić

Scal commitem scalającym, który zachowuje commity (nie squash i nie rebase), bo link do rekordu cyklu przetrwa tylko tak.

</details>

## Technical changes

Six commits on top of `cfdbd267`, in the order made:

1. `b301cbe9` — the archetype gets an icon and its title (`src/browser/sim/data/archetypes.ts`): the icon `cultist` of game-icons.net is stored in `assets/icons/cultist.svg` (no background path, the light fill of the other icons; its path data is the same as the old Loop's), credited to its author in the credits (`src/browser/view/credits.ts`, `credit-lines.ts`) and held by `tests/view/icons.test.mjs` and `tests/invariants/test_icon_credits.py`.
2. `763b5363` — the screen of a character rebuilt in two areas: the figure (`src/browser/view/character-figure.tsx`, its box `CHARACTER_FIGURE` in `src/browser/sim/data/scene.ts`), the status line (`character-status.ts`), the tree rows with their fold (`character-trees.tsx`, `character-skills.ts`), the screen itself (`character-screen.tsx`) and its stylesheet (`src/browser/character-screen.css`), the new line of practice of a solved map's run (`world-area.tsx`, `src/browser/run-screen.css`), the foundation entries and the styleguide rule "The screen Postać", with the tests of the screen (`tests/view/character-screen.test.mjs`, `character-skills.test.mjs`, `world-area.test.mjs`, `account-screen.test.mjs`, `trip.test.mjs`).
3. `1e21575d` — the bar of practice drawn twice as thick as the bar of the header, so that its track is seen on the block.
4. `7344349b` — the fix of Minor finding 1 of the review of the whole change: `CHARACTER_FIGURE` with its comment moved below `CAMP` in `scene.ts`, so `CAMP` has its description again.
5. `7a10eaf0` — the fix of Minor finding 2: the track of the bar in the existing token `text-disabled` (about 2.30:1 on the block, from about 1.19:1), with the entry on the roles, the styleguide and the test following.
6. `61f5ce35` — the return step: the pairs of examples of three entries lose the parts their tests hold, which moved to their `tests:` clauses, and two `decision:` lines in `tests/view/icons.test.mjs`.

Plus the two commits of the record (adding the copy and removing it), which the target branch never holds.

## Checks

- **The final gate:** the CI run on the request's last head (`.github/workflows/tests.yml`, job `tests`); the cycle ran no full gate on its own system, by your instruction that a full gate does not start without a signal from the day advisor. Its result is added here when the run ends: RESULT_PLACEHOLDER
- **Failing on the base:** none. The base is a merge commit with the tree of its second parent, the last head of merged request 168, whose CI run `tests` passed (run 44902347081); the list of tests failing before the change is empty, taken from *Checks* of that request.
- **Not run by any agent, left to the gate:** the container tests that the new icon file is served (`tests/invariants/test_loop2_container_icons.py`, `tests/deploy/test_loop2_image_icons.py`, they need Docker), `python -B .the-way/instruction-files/check_instructions.py` (no instruction file changed) and a browser other than Chrome's engine (item 1 above).
- **Own-work checks:** the author's: the two parts of the screen measured in the browser at 1600, 1280 and 700 px (330 and 990 px side by side, 306 and 918, and one over the other at 700 px); after the fix, the computed colour of the track (`rgb(82, 82, 92)`) darker than the fill and lighter than the block. The author failed each new or changed test on the old code first (icons, skills, world area and character screen tests; the colour case again after the fix), and ran the focused tests of the changed files, the contrast and token tests of the design (`test_design_token_contrast.py`, `test_browser_view_token_values.py`, `test_design_token_sources.py`), Prettier, ESLint, `npm run typecheck`, the size rule (`node tests/quality/eslint-size-rules.mjs`, 0 over a threshold) and `python -B .the-way/elements/common/foundation_check.py` (0 errors); each with its exit code in the reports. The reviewers re-ran the foundation check and the focused tests on their ranges, all exit 0.
- **User-interface states and screenshots:** the author walked the running game (local start, Chromium through Playwright CLI, window 1600 × 1000): the character after a death with trees folded; the run ended by "Zakończ" and the frame "W obozie"; a click on a fold opening three branches with "Kup" active; an earning loop with "Zatrzymaj" and "+1 pkt czeka w pętli" at the tree that passes a threshold and none at the tree that does not; "Zatrzymaj" turning the frame into "W obozie" with the stop line; the keyboard (Tab to the fold, Enter opens, Space folds); the figure's sheet, size and 0.64 s animation equal to the band's and none under reduced motion; the solved-map line in `rgb(159, 159, 169)`; no console error. Screenshots lie in the public repository `mariusznazar/screenshots`, branch `loop2/ekran-postaci`, directory `loop2/ekran-postaci/` (commits `2bd7b8dc` and, for the three retaken after the fix, `3a722f40`); the reviewers looked at them. Not checked in a browser: Firefox and Edge, motion by eye, the frame in a pause, the credit line (item 1 of *Fix or let through*).
- **The form check:** FORM_PLACEHOLDER
- **The check of private paths, the image check and the remarks check:** CHECKS_PLACEHOLDER
- **Working copies left:** none. **Directories of earlier tasks kept:** none.

## Foundation entries

Each entry written or changed, with one English sentence of its meaning; rows are rows of the task's *Settlements to record*. No section of the decision log was opened.

- **D-272** (changed, row 1): a picture of the game also stands as the character's figure on the screen Postać, with no clearing.
- **D-271** (changed, row 2): the figure is the Pixel Crawler mage in its idle sheet, the picture the band at the top of Siedziba draws.
- **D-445** (new, row 3): the figure stands beside the name, at the band's size and beat, still under reduced motion, whatever the character does, as a picture and not a control. The cycle's pair of examples (motion, which no test holds), word for word:
  - complies: "the frames of the figure changing at the beat of the frames of the picture band by CSS, and standing on the first frame under the system's setting for reduced motion"
  - violates: "a loop of drawing that moves the figure; a figure that moves under the setting for reduced motion"
- **D-446** (new, row 5): beside the figure stand the name, the generation line, the archetype's icon and name and the resurrection line; the icon's file is named in the archetype's data. The cycle's pair of examples, word for word:
  - complies: "the view reading the name of the icon file of an archetype from the archetype's data"
  - violates: "the name of the icon file of an archetype written in the code of the view"
- **D-447** (new, row 6): a frame always says what the character does: "W obozie", "Przejście: …" with its end, the earning loop's line with "Zatrzymaj", and after a stop "W obozie" with the line of the stop; no other button.
- **D-199** (changed, rows 7, 8, 19): each known tree is a row in columns with a bar and "{k} pkt"; "+{n} pkt czeka w pętli" after the name in the ordinary text role; trees folded, opened by a click or the keyboard. Its pair of examples as the cycle rewrote it, word for word:
  - complies: "the section headed „Umiejętności”; Enter and Space on the fold of the row of a tree opening the tree in the browser, as the browser's own click of a native button; „Obchód” at rank 0 reading its description and „cena 3” with no before-and-after values"
  - violates: "the section standing with no heading „Umiejętności”; a key handler on the fold that stops Enter or Space; „false → true” beside „Czysty płomień”"
- **D-40** (changed, row 9, and the cycle's): the practice bar has a darker track and a light fill, no green, "{k} pkt" in the strong text role; **the cycle's** addition: the track stands in the role `text-disabled` (a new use of a role, item 2 above), with the *Rationale* naming the cost.
- **D-418** (changed, row 10): screenshots of the old Loop may lie in the screenshots repository, since it counts as a public product. The *complies* example the cycle extended: "a screenshot of a screen of loop put in the directory of a cycle beside the screenshot of the same screen of loop2".
- **D-201** (changed, the cycle's, from item 12 of the task): on a manual run of a solved map the practice line reads "Wprawa zebrana w tym przejściu, która nie wejdzie do umiejętności: …" in `text-secondary`. Its pair, word for word:
  - complies: "the same positive practice line standing after a completion until „Zakończ”"
  - violates: "hiding the line immediately on completion"
- **D-215** (changed, the cycle's): the solved-map sentence stands above the run's practice line (D-201), no longer naming it by its old words.
- **Styleguide** (rows 4, 18, 20; `guidelines/styleguide-browser-view.md`): the rule "The screen Postać" (two blocks, a quarter and three quarters, one column under 720 px, the roles of every part), the rows of the roles `highlight` and `text-disabled`, the paragraph on tracks in "Every background with its text" and "No value in place of a design token" naming the bar and the figure; no decision of its own for any of it beyond the above.
- **Environment fact** `game-icons-cultist-title` (new, the cycle's): game-icons.net names Lorc's icon `cultist` "Cultist icon".
- **Invariant** `icon-credits` (*Rests on* now also names that fact): the credit check rests on the new title; its test `tests/invariants/test_icon_credits.py` was widened to know it and its sentence was not corrected.
- Tests holding sentences by a line `decision:` that the change adds or alters: the screen of a character, the skills text, the world area (the line of practice), the icons (two cases now cite D-446, in `61f5ce35`) and the account screen's purchase cases (they open the tree first).

## Minor findings

Those no fix made, in the reviewers' words.

1. From the review of the fix, `src/browser/character-screen.css:214`, `foundations/decisions.md` D-40, `guidelines/styleguide-browser-view.md:29`: "the track takes a role whose meaning is „that this cannot be used now” (D-40) for a thing that is neither text nor unavailable. The fix writes this use into the binding sentence of D-40 („its track in `text-disabled` and its fill in `text`, though neither is text”), into its *Verification*, into its *Rationale* as a cost taken, and into the roles table, so the code does what the entries say and the use follows the existing pattern of D-40 (`text` as the fill of the header's bar, `text-strong` as icons, each „though it is no text”). The styleguide's rule "Each role in its meaning" asks that a new or changed use of a role be a decision approved before the code that uses it; no settlement row of the task names `text-disabled`, so the approval is the human's at the request, which the orchestrator says will put it there. Graded Minor: what the player sees is a grey track, with no sign of unavailability, and the entry agrees with the code; the open point is the human's approval of the role's new use."
2. From the review of the fix, the same track: "the visibility the fix gains rests on a role that has no contrast threshold: D-42 and the styleguide's rule "Contrast of every pair" give `text-disabled` none, and `design-token-contrast` holds no pair of `text-disabled` with `panel`. A later change of `text-disabled` toward the panel, which no check stops, would fade the track again with every test green. Graded Minor: today's value reads well (2.30:1); the risk is a future change of a token, for the human to weigh with point 1 or for a later task to hold with a pair of its own."
3. From the review of the return step's commit, `tests/view/icons.test.mjs:360`: "the quotation claims more of D-446 than the test holds. The line quotes the whole sentence "The icon of an archetype is an icon of game-icons.net (D-27) whose file the archetype's data names, and it stands before the archetype's name, drawn as a mask in the colour of that name". The test under it (`:361-363`) checks only that the data names `cultist` with its title and that the file exists; it renders nothing, so it holds neither "before the archetype's name" nor "drawn as a mask in the colour of that name". A reader who follows the `decision:` lines to find which test holds the mask and its colour lands on a test that checks neither. The line at `:344` shows the right form: quote the prefix up to "whose file the archetype's data names". Grade Minor: the template lets a quotation be any start of a sentence of three words or more, the check passes, and no behaviour depends on it; the cost is a misleading pointer."
4. From the review of the return step's commit, `foundations/decisions.md:4895-4902`: ""in the colour of that name" is now held by no test and covered by no example. The commit dropped the violation "the icon of an archetype drawn as a picture of its file, in a colour of its own". Its first half is held (the `icon-mask` class check); its second half is not. No test reads the colour of the archetype's icon: the colour comes only from `.icon-mask { background-color: currentColor }` (`src/browser/styles.css:474-481`) and the comment of `src/browser/character-screen.css:81`; a grep of `tests/` for `character-screen-archetype` and `currentColor` finds no colour assertion for it. After the commit a change that gives the archetype's icon a colour of its own passes every test, and the *Verification* no longer points the comparing agent to that part. Keeping a violation such as "the archetype's icon given a colour of its own instead of its name's" would restore it. Grade Minor: the template makes a pair optional and the binding sentence still states the colour, so an agent comparing a change reads it there." These two findings of the return step's review are not felt by a player or by you now (a hidden pointer in a test and a part of a sentence no test holds), so they stand here and not in *For you to decide*.

## Findings outside the task's scope

1. From the review of the return step's commit: "`tests/view/character-skills.test.mjs:146`, `:159` and `tests/view/world-area.test.mjs:215` quote D-201's sentence "… the positive line remains after death and completion until „Restart” or „Zakończ”", while no test holds the part after a completion (the pair rightly keeps it). The same over-quotation as Minor 1, but these lines predate this commit and lie in the whole change already reviewed twice; out of scope of this review, Minor."
2. From the review of the return step's commit: "D-445's binding sentence names the figure standing in a manual map run "paused"; the test of the figure checks going, ended (dead) and earning-loop states, not paused, and neither the tests clause nor the pair names paused. Not touched by this commit; out of scope of this review, Minor."
3. From the walk of the author (the focus ring): opening the screen `#/postac/1` by typing the address put keyboard focus on the screen's host and drew the focus ring around the whole screen; the focus on a screen opened by a change of screen predates this task (`focus()` of the screen) and a click on a name shows no ring.

No check whose file belongs to a part outside the task's parts failed in a cycle run.

## Course of the cycle

- **Task and sources:** the character screen with the figure, the facts, the status frame and the folded skill rows, at least as good as the old Loop's; a plan item of the project plan of loop2 (`ekran-postaci`, no dependencies); the task document accepted 2026-11-20, with item 12 (the solved map's practice line) added by the day advisor for you on 2026-11-21; the foundation at `cfdbd267`, later than the `ba67f045` the task cites (D-217 and D-243 now read differently; nothing of them is touched, and the screen shows the resurrection line in the game's present words).
- **Process pin:** `19e5774aed6d1d628042e23deccc110ed9f112c0`, not moved.
- **Spec:** none — the task settles the content and the look; what it leaves is how to make it.
- **Route:** one author without a plan, the strongest class; the screen's files are small and the sprite sheet already existed. No attempt was discarded.
- **Plan:** none.
- **Choices:** 17 choices beyond the task's content (12 of the author, 5 of the orchestrator), with the questions table in the record: RECORD_LINK_PLACEHOLDER/cycle.md.
- **Blocking findings left:** none.
- **Record:** RECORD_LINK_PLACEHOLDER
