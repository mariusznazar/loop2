**State: ready** — four items of *Fix or let through* wait for your answer, and you accept the rest by merging

## What you will see

In the rule panel, the list of actions to pick from now shows what each action costs, in brackets after its name: „Wytwórz — ognisko (6 patyków)”, „Zapal — ognisko (2 patyki, 10 energii natury)”, „Zasil — ognisko (1 patyk)”, „Zjedz — jagoda (1 jagoda)”. The names of things take the form their count asks for (1 patyk, 2 patyki, 6 patyków). An action that uses nothing up shows no price, and „Uderz — patyk” is one of them, since the stick stays in the backpack after a strike. The price stands in the cell of the list, also when the cell is greyed, and at the action chosen in the panel; the row of a rule in the program shows no price. During a map run the price follows the character: a character with the branch „Czysty płomień” sees „Zapal — ognisko (10 energii natury)”, because lighting takes no sticks from them; on the screen of programs and outside a map run the price is the one from the game's data.

On the drawing of the game map, a burning campfire keeps its flame icon, and a campfire that has burnt out, or that was crafted and not yet lit, now has an icon of its own, a pile of logs. The minutes a campfire has left still stand only in its row in the list of revealed tiles. The pile of logs is an icon from game-icons.net and is credited next to the flame icon in the footer and in the credits of the login card.

![The drawing of the game map: an extinguished campfire, a pile of logs, on the upper tile and a burning campfire on the lower tile where the character stands](https://github.com/mariusznazar/screenshots/blob/1408fa30384ae5c5a4938add4a5fa33591dae6ba/loop2/koszty-i-stan-ogniska/campfires.png?raw=true)

![The rule panel on the pick of the action: the cells of the actions that use something carry their price in brackets, the chosen one among them](https://github.com/mariusznazar/screenshots/blob/1408fa30384ae5c5a4938add4a5fa33591dae6ba/loop2/koszty-i-stan-ogniska/rule-panel-prices.png?raw=true)

### Underneath

The price is read from the game's data and from the character of the map run, through the same rule the simulation uses when it takes things from the backpack, so the price shown cannot drift from what the action takes; the names of things in the data got their plural forms.

## For you to decide

### Needed from you

none

### Fix or let through

1. The task asks you to accept the icon of the extinguished campfire at this request, or to name another. The cycle chose a pile of logs. A player sees it on every campfire without fire, including a freshly crafted one, so it is the first thing that tells a new player a campfire waits to be lit. The ways: accept it, which costs nothing; or name another icon from game-icons.net, which costs one round of correction with its review, since the file, its credit, the title fact in the foundation and several tests change together, and a missed place is caught by the checks. The author looked at the alternatives with a flame, an ember, a fire ring, a fireplace, a pyre, a brazier, a single log, dead wood and a forest camp, and found them either showing a flame or being a different object. I recommend accepting it, since the author and the reviewer both looked at the screenshot above and found it clearly different from the flame icon at the icon's small size. Accept the pile of logs, or name another icon? (Technical changes, 1)
2. One state of the rule panel was not looked at in a browser: a greyed cell that carries a price. It exists only for an action you hold but whose understanding the character lacks, which no play reaches today, so the author checked it in the code and with two tests, and looked at the other states (cell, chosen cell, greyed cell without a price) in the running game. If the greyed price looks wrong, a player will first see it when a later task makes that state reachable. Looking at it now costs a session in which the state is composed by hand; letting it through costs nothing today. I recommend letting it through, since the price is the cell's own text and greys with it, as the tests show. Look at it in this request, make a task of it, or let it through? (Checks)
3. In the four-column list of actions at a window 1440 pixels wide, the three longest cells wrap to two or three lines, for example „Zapal — ognisko (2 / patyki, 10 energii / natury)”, and their cells grow taller than their neighbours; the time under each cell stands at different heights. It stays readable and no rule of the style guide is broken, but a player has to read across line breaks to find the price. It follows from the wording you chose for the price. The ways: let it through, which leaves the wording as you chose it; shorten the wording or widen the column, which changes what you settled and costs a round of correction with its review, and a shorter price (for example „10 energii”) would no longer name the full thing; or make a task of it. I recommend letting it through for now, since the wording is the one you chose and the unevenness is cosmetic; look at the screenshot above and say if it bothers you. Let it through, fix it in this request, or make a task of it? (Minor findings, 1)
4. The review of the whole change read 21 of the 299 decisions it selected whole and ran through the other 278 by their titles; it named nine decisions whose titles point to a bearing on the change and that it left unread (they concern the neutral controls, the testing discipline and the state of a rule's reason, among others). If one of them bears on the change, it would show up later as a finding in another change, not as a breakage today; the tests of the touched areas and the checks of the foundation pass. The ways: a fresh reviewer reads what stayed unread, which costs one more round of review; make a task of it; or let it through. I recommend letting it through, since the reviewer judged that none of the nine changes a finding and its own runs, including a mutation run on the changed simulation lines, found nothing. Have it read in this request, make a task of it, or let it through? (Course of the cycle)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

5. Choices of the cycle beyond the task: (i) the price is part of the cell's own text, so a greyed cell greys its price and a screen reader reads the price with the name; the other way, a separate price element with its own look, would need a change of the shared control of the pick, for no visible difference; (ii) an action that uses a kind of thing (fuel, food, a thing to light) names the first thing the game's data marks for that use, as the reason of a rule does today, and with a second fuel in the data the price would name only the first; the other way, naming what the backpack holds, would make the panel change with the backpack; (iii) the credit of the pile of logs says only that its colour was changed, since the file was taken without a background, while the other sixteen icons keep the shared sentence; the other way, one sentence for all, would say something untrue about this file; (iv) the main branch merged a decision with the same number as the decision on prices written here, so the decision on prices carries the next number, and the process version the main branch moved to meanwhile came with the merge. (Course of the cycle, Choices)
6. Entries of the foundation you did not see in the task: a fact that the icon's page on game-icons.net names it „Wood Pile icon”, which the credits rest on; the credits rule now lists that fact among the facts it rests on; and the decision on prices was completed by the return step with two sentences, that the price stands in the same text as the action's name and so greys with it, and that an action using a kind of thing names the first one of the data. (Foundation entries)
7. One test of a rule changed: the test of the rule on icon credits knows the author and the title of the new icon. No surface of the product and no *Violated* mark changed. (Foundation entries)

## Cost

About 1 hour 36 minutes of working time in 15 stages (the computer hung twice during the cycle and the work resumed from the files), all on one model (Sonnet 5.5), about 87 million tokens counted (almost all of it cached input), with one author, four reviews (the whole change, its fix, the return step, the merge with the main branch), one fix of four Minor findings and the return step; the table of stages is in the record, linked under *Course of the cycle*.

## How to merge

Merge it with a merge that keeps the commits, since the link to the record survives only then. A reminder, which asks for no yes: the foundation has waited for a review through 74 merges since the start of the history, above the 30 at which the process owner's script reminds; the review is the skill `the-way-review-foundation`, started in a session in this repository, and nothing in this request waits for it.

<details>
<summary>Po polsku</summary>

**Stan: gotowy** — cztery punkty z grupy „Popraw albo przepuść” czekają na Twoją odpowiedź, a resztę akceptujesz przez scalenie

### Co zobaczysz

W panelu reguły lista czynności do wyboru pokazuje teraz, ile czynność kosztuje, w nawiasie po nazwie: „Wytwórz — ognisko (6 patyków)”, „Zapal — ognisko (2 patyki, 10 energii natury)”, „Zasil — ognisko (1 patyk)”, „Zjedz — jagoda (1 jagoda)”. Nazwy rzeczy mają formę, jakiej wymaga ich liczba (1 patyk, 2 patyki, 6 patyków). Czynność, która niczego nie zużywa, nie ma ceny, a „Uderz — patyk” jest jedną z nich, bo patyk zostaje w plecaku po ciosie. Cena stoi w komórce listy, także gdy komórka jest wyszarzona, i przy wybranej czynności panelu; wiersz reguły w programie ceny nie pokazuje. W przejściu cena idzie za postacią: postać z gałęzią „Czysty płomień” widzi „Zapal — ognisko (10 energii natury)”, bo zapalenie nie zabiera jej patyków; na ekranie Programy i poza przejściem stoi cena z danych gry.

Na rysunku mapy ognisko płonące zachowuje ikonę płomienia, a ognisko wygasłe albo wytworzone i jeszcze niezapalone ma teraz własną ikonę, stos polan. Minuty, które ognisku zostały, stoją dalej tylko w jego wierszu na liście odsłoniętych kafelków. Stos polan to ikona z game-icons.net i ma wzmiankę obok ikony płomienia w stopce i we wzmiankach na karcie logowania.

![Rysunek mapy gry: ognisko wygasłe, stos polan, na górnym kafelku i ognisko płonące na dolnym kafelku, na którym stoi postać](https://github.com/mariusznazar/screenshots/blob/1408fa30384ae5c5a4938add4a5fa33591dae6ba/loop2/koszty-i-stan-ogniska/campfires.png?raw=true)

![Panel reguły przy wyborze czynności: komórki czynności, które coś zużywają, niosą cenę w nawiasie, wybrana wśród nich](https://github.com/mariusznazar/screenshots/blob/1408fa30384ae5c5a4938add4a5fa33591dae6ba/loop2/koszty-i-stan-ogniska/rule-panel-prices.png?raw=true)

#### Pod spodem

Cenę czyta się z danych gry i z postaci przejścia, tą samą regułą, której używa symulacja, gdy zabiera rzeczy z plecaka, więc pokazana cena nie może rozjechać się z tym, co czynność zabiera; nazwy rzeczy w danych dostały formy liczby mnogiej.

### Do rozstrzygnięcia

#### Potrzebne od Ciebie

none

#### Popraw albo przepuść

1. Zadanie prosi, żebyś przy tej prośbie przyjął ikonę ogniska wygasłego albo wskazał inną. Cykl wybrał stos polan. Gracz widzi go na każdym ognisku bez ognia, także świeżo wytworzonym, więc to pierwsza rzecz, która mówi nowemu graczowi, że ognisko czeka na zapalenie. Drogi: przyjąć, co nic nie kosztuje; albo wskazać inną ikonę z game-icons.net, co kosztuje rundę poprawek z recenzją, bo plik, jego wzmianka, fakt o tytule w fundamencie i kilka testów zmieniają się razem, a pominięte miejsce wyłapują kontrole. Autor obejrzał alternatywy z płomieniem, żarem, kręgiem ogniska, kominkiem, stosem, koszem na ogień, pojedynczym polanem, martwym drewnem i obozem w lesie i uznał, że albo pokazują płomień, albo są innym przedmiotem. Rekomenduję przyjąć, bo autor i recenzent obejrzeli powyższy zrzut i uznali, że stos wyraźnie różni się od ikony płomienia przy małym rozmiarze ikony. Przyjąć stos polan, czy wskazać inną ikonę? (Technical changes, 1)
2. Jeden stan panelu reguły nie był obejrzany w przeglądarce: wyszarzona komórka, która niesie cenę. Istnieje tylko dla czynności, którą masz, ale której zrozumienia postaci brakuje, a tego dziś żadna gra nie osiąga, więc autor sprawdził ją w kodzie i dwoma testami, a pozostałe stany (komórka, wybrana komórka, wyszarzona bez ceny) obejrzał w działającej grze. Jeśli wyszarzona cena wygląda źle, gracz zobaczy to dopiero, gdy późniejsze zadanie uczyni ten stan osiągalnym. Obejrzenie teraz kosztuje sesję, w której stan trzeba złożyć ręcznie; przepuszczenie nie kosztuje dziś nic. Rekomenduję przepuścić, bo cena jest własnym tekstem komórki i szarzeje razem z nią, co pokazują testy. Obejrzeć w tej prośbie, zrobić zadanie, czy przepuścić? (Checks)
3. W czterokolumnowej liście czynności przy oknie o szerokości 1440 pikseli trzy najdłuższe komórki zawijają się do dwóch lub trzech linii, na przykład „Zapal — ognisko (2 / patyki, 10 energii / natury)”, i ich komórki rosną wyżej niż sąsiednie; czas pod każdą komórką stoi na różnych wysokościach. Zostaje czytelne i żadna reguła przewodnika stylu nie jest złamana, ale gracz musi czytać przez łamania linii, żeby znaleźć cenę. Wynika to z brzmienia ceny, które wybrałeś. Drogi: przepuścić, co zostawia brzmienie takie, jak wybrałeś; skrócić brzmienie albo poszerzyć kolumnę, co zmienia to, co rozstrzygnąłeś, i kosztuje rundę poprawek z recenzją, a krótsza cena (na przykład „10 energii”) nie nazywałaby już pełnej rzeczy; albo zrobić zadanie. Rekomenduję na razie przepuścić, bo brzmienie jest tym, które wybrałeś, a nierówność jest kosmetyczna; obejrzyj zrzut powyżej i powiedz, czy Ci przeszkadza. Przepuścić, poprawić w tej prośbie, czy zrobić zadanie? (Minor findings, 1)
4. Recenzja całości przeczytała w całości 21 z 299 wybranych decyzji, a pozostałe 278 przejrzała po tytułach; wskazała dziewięć decyzji, których tytuły sugerują związek ze zmianą i które zostawiła nieprzeczytane (dotyczą m.in. neutralnych kontrolek, dyscypliny testów i stanu powodu reguły). Jeśli któraś z nich dotyczy zmiany, wyjdzie to później jako uwaga w innej zmianie, nie jako awaria dziś; testy dotkniętych obszarów i kontrole fundamentu przechodzą. Drogi: świeży recenzent czyta to, co zostało nieprzeczytane, co kosztuje jeszcze jedną rundę recenzji; zrobić zadanie; albo przepuścić. Rekomenduję przepuścić, bo recenzent uznał, że żadna z dziewięciu nie zmienia uwagi, a jego własne uruchomienia, z testem mutacyjnym na zmienionych liniach symulacji, nic nie znalazły. Przeczytać w tej prośbie, zrobić zadanie, czy przepuścić? (Course of the cycle)

#### Akceptujesz przez scalenie

Scalenie akceptuje te punkty; jeśli któryś Ci nie odpowiada, powiedz który.

5. Wybory cyklu poza treścią zadania: (i) cena jest częścią własnego tekstu komórki, więc wyszarzona komórka szarzeje razem z ceną, a czytnik ekranu czyta cenę razem z nazwą; inna droga, osobny element ceny z własnym wyglądem, wymagałaby zmiany wspólnej kontrolki wyboru, bez widocznej różnicy; (ii) czynność, która zużywa rodzaj rzeczy (opał, jedzenie, rzecz do zapalenia), nazywa pierwszą rzecz, którą dane gry oznaczają do tego użycia, tak jak robi to dziś powód przy regule, a przy drugim opale w danych cena nazwałaby tylko pierwszy; inna droga, nazwanie tego, co trzyma plecak, sprawiłaby, że panel zmieniałby się z plecakiem; (iii) wzmianka stosu polan mówi tylko, że zmieniono kolor, bo plik wzięto bez tła, a pozostałe szesnaście ikon zachowuje wspólne zdanie; inna droga, jedno zdanie dla wszystkich, mówiłaby o tym pliku nieprawdę; (iv) główna gałąź scaliła w międzyczasie decyzję o tym samym numerze co decyzja o cenach napisana tutaj, więc decyzja o cenach nosi następny numer, a wersja procesu, na którą główna gałąź się w międzyczasie przesunęła, przyszła ze scaleniem. (Course of the cycle, Choices)
6. Wpisy fundamentu, których nie widziałeś przy zadaniu: fakt, że strona ikony na game-icons.net nazywa ją „Wood Pile icon”, na którym opierają się wzmianki; reguła wzmianek wymienia teraz ten fakt wśród faktów, na których się opiera; oraz decyzja o cenach, uzupełniona w kroku powrotnym dwoma zdaniami: że cena stoi w tym samym tekście co nazwa czynności i dlatego szarzeje razem z nią, i że czynność zużywająca rodzaj rzeczy nazywa pierwszą z danych. (Foundation entries)
7. Zmienił się jeden test reguły: test reguły o wzmiankach ikon zna autora i tytuł nowej ikony. Żadna powierzchnia produktu i żadne oznaczenie *Violated* się nie zmieniły. (Foundation entries)

### Koszt

Około 1 godziny 36 minut czasu pracy w 15 etapach (komputer zawiesił się dwa razy w trakcie cyklu i praca wznowiona z plików), wszystko na jednym modelu (Sonnet 5.5), około 87 milionów policzonych tokenów (prawie całość to wejście z pamięci podręcznej), z jednym autorem, czterema recenzjami (całości, jej poprawki, kroku powrotnego i scalenia z główną gałęzią), jedną poprawką czterech uwag Minor i krokiem powrotnym; tabela etapów jest w rekordzie, z linkiem w *Course of the cycle*.

### Jak scalić

Scal to scaleniem, które zachowuje commity, bo link do rekordu przeżywa tylko wtedy. Przypomnienie, które nie prosi o zgodę: fundament czeka na przegląd od 74 scaleń od początku historii, ponad 30, przy których skrypt właściciela procesu przypomina; przegląd to skill `the-way-review-foundation`, uruchamiany w sesji w tym repozytorium, a nic w tej prośbie na niego nie czeka.

</details>

## Technical changes

Each item says what it concerns first; the commits are on the task branch.

- The icon of the extinguished campfire (commit `6bf97a4`): `assets/icons/wood-pile.svg`, the file of the page of Delapouite's icon on game-icons.net with only its fill changed to `#f4f4f5`, the colour of the other map icons; `CAMPFIRE.extinguished` in `src/browser/sim/data/campfire.ts`; `src/browser/view/terrain-picture.ts` draws `campfire.svg` while minutes are left and `wood-pile.svg` otherwise, a crafted campfire never lit included, in the same place and size; its credit in `src/browser/view/credits.ts` and `src/browser/view/footer.ts`; tests in `tests/view/terrain-picture.test.mjs`, `tests/view/world-area.test.mjs`, `tests/view/icons.test.mjs`, `tests/sim/data.test.mjs`, `tests/sim/campfire.test.mjs`, `tests/invariants/test_icon_credits.py`. The credit sentence for this icon was made true in the fix (`5f0793f`).
- The price (commit `0f74e19`): `actionPrice` and `campfireLightCount` in `src/browser/sim/program.ts`, used also by the effect in `src/browser/sim/run.ts` and by the refusal; `plural: { few, many }` in the data of things in `src/browser/sim/data/resources.ts`; `countedName` and `actionPick` in `src/browser/view/program-editor.ts` put the price into the label of each pick cell, which `src/browser/view/rule-panel.tsx` draws unchanged. The three forms of the name of nature energy moved into `src/browser/sim/data/actions.ts` in the fix (`a00f10a`). The test of the price following the character with „Czysty płomień” is in `99b9ce9`.
- The foundation (commits `0e50960`, `0611dfa`, `92e0baed`): the decision on prices (D-363), the changed decision on the campfire's icons (D-70), the title fact and its place in the invariant on icon credits; see *Foundation entries*.
- The fix for Minor findings of the review of the whole change (`5f0793f`, `a00f10a`, `0611dfa`): the credit sentence of the new icon, the forms of the name of energy in the data, and the missing link in the decision on prices; reviewed `PASS 0611dfa`. The review's fourth finding, on the wrapping of the price, was left, as it follows from the wording you chose.
- The merge with the main branch (`0f315ab5`): the conflict was one clash of decision numbers in `foundations/decisions.md`; the main branch's decision keeps its number, this task's decision on prices was renumbered, with its two mentions in `src/browser/view/program-editor.ts` and `tests/view/rule-editor.test.mjs`; the merge also brought the process version `52f8164` and the main branch's test of private paths in tracked files.

## Checks

- Gate: `npm test` on the final tree (head `0f315ab5`, process pin `52f8164`), exit 0: 544 tests in four directories, every directory passed, and the check of the foundation as its last stage, 0 errors. On the base commit `211a4ea` the same command exited 0 with 543 tests.
- A check that failed once and passed again: the gate run on head `0611dfa`, before the return step and the merge, exited 1 with one failure, `tests/invariants/test_loop2_one_serving_process_container.py`, test `test_running_container_has_one_listening_node_process`: `AssertionError: 137 != 0 : node cannot use fresh account resources` (the probe run inside a container started with a 512 MiB limit was killed). Run alone, the test passed (exit 0, 3 tests, 7 seconds); it also passed in the gate on the base and in the final gate. In this cycle it failed in 1 gate run and passed in 3 runs. The cause was not found; the change touches no container, `Dockerfile`, `deploy/` or invariant test other than the one on icon credits, and the computer hung twice during the cycle. An earlier run of the gate on that head did not finish when the computer hung and counts as not run. The check of the foundation was run on its own on that head, exit 0, 0 errors, since the gate stopped before reaching it.
- Mutation testing by the reviewer of the whole change on the changed simulation lines (`program.ts` 44–100 and 345–358, `run.ts` 271–275): exit 0, 62 of 66 mutants killed; the four survivors are equivalent or a guard that stood before this change.
- Focused checks by the author (all exit 0): `npm run build`, `npm run typecheck`, `npx eslint src tests/sim tests/view`, `npx prettier --check src tests/sim tests/view`, `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` (1807 tests, later 1808), the invariants on icon file content, container icons, drawing numbers, token values, content identifiers, token contrast and icon credits; the invariants on icon credits and icon file content were seen failing on a deliberate break and passing once restored.
- Own-work checks: the author named the price following the character with „Czysty płomień” as the requirement most likely unmet, and checked it by tests that give „(10 energii natury)” with the branch and „(2 patyki, 10 energii natury)” without a run and with a run of a character that bought nothing, and by a test that ties the price to what a finished action takes; it passed.
- User-interface states: the author looked at the rule panel in the running game (the pick cells of the fire and food groups with their prices, the chosen cell, the greyed cell without a price, the rows of rules without a price) and at the drawing with a burning and an extinguished campfire, and kept the two screenshots in the public screenshots repository, branch `loop2/koszty-i-stan-ogniska`, commit `1408fa30384ae5c5a4938add4a5fa33591dae6ba`, from which they are embedded above; a greyed cell that carries a price was not looked at in a browser (item 2).
- The form check of this description: written and checked after the record's copy is made.
- The check of private paths on this description and on the record's copy, the check of image files on the record's copy and the remarks check on the original and on the copy: filled in with the record's link, after the copy is committed.

## Foundation entries

- D-363 (new): the rule panel shows an action's price in brackets after its name, from the data, at every cell of its pick and at the chosen action but not in the row of a rule, with the names of things in the form their count takes, and the price follows the character of the map run; marked `row 1`, `row 2`, `row 3` and `projected` (the definition's entry on where the player reads what an action costs). The return step completed it with two sentences, marked `the cycle's`: the price stands in the same text as the name and so greys with it, and an action using a kind of thing names the first one of the data; and with the relation to D-310. Its number was D-362 until the merge.
- D-70 (changed): a campfire shows on the drawing of the map as one icon when it burns and another when it is extinguished, and its minutes stay in the tile's row of the list; marked `projected`.
- `game-icons-wood-pile-title` (new environment fact): the page of Delapouite's icon `wood-pile` on game-icons.net names it „Wood Pile icon”; marked `the cycle's`.
- `icon-credits` (*Rests on* only): gains the title fact; marked `the cycle's`.
- Invariant test altered: `tests/invariants/test_icon_credits.py` (the author and the title of `wood-pile.svg` added). No surface altered, no *Violated* mark set or cleared.
- Kept rows tied to an entry already stated: none. Three choices that bind only as code (the price in the label of the pick cell, the price function, the shape of the extinguished icon's data) stayed rows of the questions table by the return step's judgment, which the review of the return step accepted.

## Minor findings

- M3 of the review of the whole change, left: "The price is cut in the middle by line breaks in the four-column pick" — in the screenshot of the rule panel the cells read `Zapal — ognisko (2 / patyki, 10 energii / natury)`, `Zapal — patyk (1 / patyk, 10 energii / natury)`; the cells of the fire row grow to three lines while „Wytwórz — ognisko (6 patyków)” takes two, so they are uneven; "still readable, no role or state broken"; it "follows from the task's own form" and the reviewer demanded no change; place: the four-column grid of the pick (`styles.css`, around lines 1244–1248) and `src/browser/view/program-editor.ts` `actionCellLabel`.
- m1 of the review of the return step, not fixed: "takes the name's role" in the first sentence of the decision on prices uses a word of the style guide without saying so; a reader of the decision alone can read "role" as the part the price plays; nothing is false, the meaning is carried by the rest of the sentence. Place: `foundations/decisions.md`, D-363, first sentence.
- m2 of the review of the return step, not fixed: "as the reason of its rule does (D-310)" attributes the first-item rule to a decision whose text does not state it; the rule stands in D-363 and in the code (`firstItemFor` in `src/browser/sim/program.ts`), and the entry stays correct. Place: `foundations/decisions.md`, D-363.
- A note of the review of the fix, no finding to fix: the new constant of the nature energy's name stands between the type of an action and the list of action ids in `src/browser/sim/data/actions.ts`, apart from the fields it is described as standing beside; position without effect.

## Findings outside the task's scope

- O1 of the review of the whole change: the label of the pick cell is no longer equal to the action's name for any consumer that compares them; no consumer in `src/` does so today (`rule-panel.tsx` only shows it), but a later task that finds a cell by its action name (a keyboard shortcut, a search in the pick) would need the bare name. Place: `actionPick` in `src/browser/view/program-editor.ts`.
- A check whose file belongs to a part outside the task's parts, failed once and passed again: `tests/invariants/test_loop2_one_serving_process_container.py` belongs to the part `deployment`; see *Checks* (failed in 1 gate run, passed in 3 runs; rerun alone, exit 0).

## Course of the cycle

- **Task and sources:** a task of the plan of the second stage of the game: the price at an action in the rule panel and the icons of the burning and the extinguished campfire; sources: the task document (ready for cycle, accepted by the human on 11 November 2026) and the approved definition and plan of that stage; base commit `211a4ea` of the main branch.
- **Process pin:** `e3825a82386a61930a86f8517fc0c5f422fc2833` at start; the main branch moved it to `52f8164a354ee1a704af0d58add2f3be8e4f0247` in a task merged during the cycle (not by this task), and the merge `0f315ab5` took it. Gate on the base: `npm test` exit 0; gate on the final tree: exit 0.
- **Spec:** none; the task leaves no open design choice (its questions 1 to 5 and settlement rows 1 to 3 settle the place, wording, the character rule, the icon's route and the colour; how to make them was the author's).
- **Route:** one author without a plan, class `same`; the change is one thread across the data of things, the price function, the pick, the drawing, one icon and the foundation entries. No discarded attempt. The author's first session ended when the computer hung, before any commit; the same author was resumed from its transcript and reviewed the leftover work against its handoff before continuing.
- **Plan:** none.
- **Choices:** 11 beyond the contents of the task (rows Q2 to Q12 of the questions table; item 5 above names those whose result you will see), in the record's questions table.
- **Blocking findings left:** none; no review blocked.
- **Record:** the link is added when the record is committed.
