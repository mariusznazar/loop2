**State: ready** — the change is complete and reviewed; two items below wait for your answer (a walk in a real browser that nobody has made, and how closely the review of the whole change read the decision log); the result of the final run of the tests on this request will be written under Checks when it comes.

## What you will see

The character can now make a bandage and dress a wound with it. In the program editor there are two new actions, "Wytwórz" (make) and "Opatrz" (dress), and each takes a target: "Wytwórz — Opatrunek" turns two pieces of moss into one bandage in 10 game minutes, and "Opatrz — Opatrunek" uses one bandage in 10 game minutes and gives back 25 health, never above full health, whatever took the health (cold, hunger or a wolf's blow). These numbers are provisional: the next task on the wolf map measures them and changes them in the game's data alone. A bandage is a real item: it takes room in the backpack and the chest, stands on the trip lists "Zabierz" and "Wynieś", in the condition "Zapas poniżej" and on the screen Wiedza, but it lies on no map, so it is never a target of "Idź", "Zbierz", "Obchód" or "Tu leży mniej niż".

In the pick of actions "Opatrz" stands in the group "Żywność i walka" after "Zjedz — jagoda", and "Wytwórz" stands alone in a new fifth group "Wytwarzanie". The cell "Wytwórz" shows no price and no time (they come from the item you make), the cell "Opatrz" shows its time; in the pick of targets every item shows its price and its time ("Opatrunek (2 mchy)", "10 min"); the chosen action and the rule's row read "Wytwórz — Opatrunek" and "Opatrz — Opatrunek". A rule that cannot start says why: "brakuje 2 × mech" for making, "brakuje 1 × opatrunek" or "zdrowie pełne" for dressing ("zdrowie pełne" first when both are true; dressing at full health is never carried out, and if health comes back to full while the action runs, the bandage stays in the backpack). An attack that interrupts either action takes nothing from the backpack. The mage stays where it stands during both, and the scene gets no new picture. The first gathered moss reveals the bandage and "Wytwórz"; the first bandage made reveals "Opatrz". There are two new icons from game-icons.net, with their credits.

Everything the game had before keeps working as it did, including programs written earlier and programs pulled from a previous save. The balance instrument runs, traces and describes programs with the new actions, and an overlay can add or change an item and its recipe in memory. Beside the model, one small fix asked for by the task: the result of a program's twelve-seed judging that the browser remembers no longer stays beside a program whose content is different, even when a change was lost before it reached the server. Because the shape of a saved game changed, the game discards saved games of the old version once this is deployed, and each player starts anew; the remembered judgings stored by the browser under the old form also stop showing and come back after the next judging.

The new editor states (the fifth group, the target grid with prices and times, the greyed cells, the focus after a pick) were checked by tests and by reading the code, and no one opened them in a real browser: see item 1 below.

### Underneath

The game's data now say what an item can be used for (a recipe, a healing value), and the targets of "Wytwórz" and "Opatrz" are whatever the data give those verbs, so a next item of the same sort is a row of data and not a change in several files of code; the cost of the trial is in the table under Checks.

## For you to decide

### Needed from you

none

### Fix or let through

1. No one has seen the new screens in a real browser. The editor's fifth group, the two new cells, the grid of targets with a price and a time beside each, the greyed cells, the keyboard moving through that grid and the focus after a pick were checked by tests and by reading the code only, and the rule says a check in a real browser is still required after such a change. If something is off, the first player who opens the editor finds it, for example a cell too wide for the narrow grid or a lost focus. Running the walk now costs a session with a browser and a round of review, and undoing it costs nothing; making a task of it leaves the screens unseen until someone looks; letting it through accepts that risk, and undoing it later costs a correction after someone meets the fault. I recommend running it in this request, since all of what the player sees of this change is new. Its weak point: the tests already cover each state, so the walk may find nothing and cost a round for nothing. Run it in this request, make a task of it, or let it through? The steps of the check by hand, whose result you write down as a remark:
   1. Start the game on your computer and log in; open the editor of a program on the map with moss (the forest).
   2. Gather some moss on a walk so that the bandage and "Wytwórz" are revealed, then open the pick of actions on a rule: you should see the fifth group "Wytwarzanie" with "Wytwórz", and "Opatrz" after "Zjedz — jagoda" (greyed until you have made a bandage).
   3. Choose "Wytwórz": the pick of targets should show "Opatrunek (2 mchy)" with "10 min" beside it; choose it and read the rule's row ("Wytwórz — Opatrunek").
   4. Walk the target grid with the keyboard (arrows, Enter) and check that the focus lands sensibly after a pick.
   5. Run the program: the bandage appears in the backpack, and "Opatrz — Opatrunek" can then be chosen and shows "zdrowie pełne" while health is full.
   
   (Checks, 4)
2. The review of the whole change read, in full, 12 of the 182 decisions of its selection, namely the 12 that the change writes or changes; it read the whole index of the 182 by their binding sentences and named some decisions that bear on the change as read only that way (such as those about the program check and the revealing of items). If one of those decisions says something the change breaks, it shows later, when someone relies on it. Having a fresh reviewer read what stayed unread costs another review (about as long as the first) and undoing it nothing; letting it through costs nothing today and a later correction if something is found. I recommend letting it through, since the 12 decisions the change touches were read whole and every slice that touches the program check, the saved game and the icons had a review of its own that read its decisions. Its weak point: the other 170 were read only as sentences. Read them in this request, make a task of it, or let it through? (Checks, 5)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

3. The small fix of the remembered judging was added to this task by the day advisor after you accepted the task, so you did not see it at the acceptance. The task leaves the way to the cycle. The cycle chose to store a fingerprint of the program's content beside the content revision, so a remembered judging shows only while both match; it did not change the revision counter itself, which can still repeat for different content, because nothing reads it alone now. It took this way over using the moment of each change as the revision, which would have changed four functions and their tests and the meaning of the revision across devices. If you meant that the counter itself must never repeat, say so, and that is another task.
4. The fingerprint is a 64-bit hash, so two different contents can in theory share one; the accepted chance is at most one in 2^52, and the decision now says so. Cost if it ever happens: a judging stands beside a program it did not judge until the next judging or change.
5. In the description of a program in the balance instrument the item's name is written with a capital, "Wytwórz — Opatrunek", as the game's row shows it (the task says "as the game shows it"), while the instrument's old description of a gathered resource stays lower-case ("Zbierz — patyk"); making them the same is outside this task.
6. The new decision about the data of an item and a resource and the changes the cycle made to existing decisions beyond your rows are listed under Foundation entries; the ones you did not see at the acceptance are the cycle's own: the new decision "How do the game's data tell an item from a resource?" (an item no map holds is a row of the items' data with no row among the resources; a resource is an item some map holds), the sentence that "Wytwórz" and "Opatrz" with no known target stand greyed like the other actions of their kind, the two decisions about the remembered judging, a widened rule about names in the code, the two icon titles and two corrections of the lists of what reveals things and what opens actions.
7. Several tests now hold sentences of decisions through a quotation line, and one rule about identifiers in the code was widened to items: the test of that rule was changed with it (it lists the new item), and the tests that hold the new decision, the new sentences about dressing, making, prices, groups and the remembered judging stand in a new test file for the two verbs and in the changed test files named under Foundation entries.

## Cost

About 3 hours 50 minutes from the start to the return step, 71 stages and 31 agents; working time 3 h 4 min and 44 min of waiting for tools. Tokens in all: about 350 million, almost all of it cached input (Sonnet about 195 million, Opus about 132 million, Haiku about 23 million); output about 1.5 million. Review rounds: the spec was reviewed twice (one fix); four slices had a review of their own (all passed); the review of the whole change failed once with two blocking findings and 13 Minor findings, which one fix in two parts took in, and passed on its second read; the return step was reviewed once and passed. The table of stages stands in the record's copy (the link is under Course of the cycle once the record is committed). No working copy of an agent stayed behind, and no directory of an earlier task is kept.

## How to merge

Merge it so that the commits are kept (a merge commit, not a squash or a rebase), because the link to the record of the cycle survives only then. The foundation has not waited for a review long enough to ask for one.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — zmiana jest kompletna i sprawdzona; dwie pozycje poniżej czekają na Twoją odpowiedź (przejście po nowych ekranach w prawdziwej przeglądarce, którego nikt nie zrobił, i to, jak dokładnie przegląd całej zmiany czytał dziennik decyzji); wynik końcowego przebiegu testów na tej prośbie zostanie dopisany w sekcji Checks, gdy będzie.

## Co zobaczysz

Postać może teraz wytworzyć opatrunek i opatrzyć nim ranę. W edytorze programu są dwie nowe czynności, „Wytwórz” i „Opatrz”, a każda ma cel: „Wytwórz — Opatrunek” zamienia dwie sztuki mchu w jeden opatrunek w 10 minut gry, a „Opatrz — Opatrunek” zużywa jeden opatrunek w 10 minut gry i oddaje 25 zdrowia, nigdy ponad pełne, bez względu na to, co zdrowie zabrało (zimno, głód czy cios wilka). Te liczby są wstępne: kolejne zadanie na mapie z watahą mierzy je i zmienia samymi danymi gry. Opatrunek jest prawdziwym przedmiotem: zajmuje miejsce w plecaku i w skrzynce, stoi na listach wyprawy „Zabierz” i „Wynieś”, w warunku „Zapas poniżej” i na ekranie Wiedza, ale nie leży na żadnej mapie, więc nigdy nie jest celem „Idź”, „Zbierz”, „Obchód” ani „Tu leży mniej niż”.

W wyborze czynności „Opatrz” stoi w grupie „Żywność i walka” po „Zjedz — jagoda”, a „Wytwórz” stoi sam w nowej, piątej grupie „Wytwarzanie”. Komórka „Wytwórz” nie ma ceny ani czasu (dają je przedmiot, który wytwarzasz), komórka „Opatrz” ma swój czas; w wyborze celu każdy przedmiot pokazuje cenę i czas („Opatrunek (2 mchy)”, „10 min”); wybrana czynność i wiersz reguły czytają się „Wytwórz — Opatrunek” i „Opatrz — Opatrunek”. Reguła, której nie da się zacząć, podaje powód: „brakuje 2 × mech” przy wytwarzaniu, „brakuje 1 × opatrunek” albo „zdrowie pełne” przy opatrywaniu („zdrowie pełne” najpierw, gdy prawdziwe są oba; opatrywanie przy pełnym zdrowiu nigdy się nie wykonuje, a gdy zdrowie wróci do pełna w trakcie czynności, opatrunek zostaje w plecaku). Napaść, która przerywa którąś z czynności, nie zabiera nic z plecaka. Mag stoi tam, gdzie stał, podczas obu, a scena nie dostaje nowego obrazka. Pierwszy zebrany mech odsłania opatrunek i „Wytwórz”; pierwszy wytworzony opatrunek odsłania „Opatrz”. Są dwie nowe ikony z game-icons.net, z podaniem autorów.

Wszystko, co gra miała wcześniej, działa tak jak przedtem, także programy napisane wcześniej i programy wciągnięte z poprzedniego zapisu. Przyrząd balansu wykonuje, śledzi i opisuje programy z nowymi czynnościami, a nakładka może dodać albo zmienić w pamięci przedmiot i jego przepis. Obok modelu jedna drobna poprawka, o którą prosiło zadanie: wynik oceny programu na dwunastu ziarnach, który zapamiętuje przeglądarka, nie stoi już przy programie o innej treści, także gdy zmiana zginęła, zanim dotarła na serwer. Ponieważ zmienił się kształt zapisu gry, po wdrożeniu gra odrzuci zapisy starej wersji i każdy gracz zacznie od nowa; zapamiętane przez przeglądarkę oceny w starej postaci też przestaną się pokazywać i wrócą po następnej ocenie.

Nowe stany edytora (piąta grupa, siatka celów z ceną i czasem, wyszarzone komórki, fokus po wyborze) sprawdzono testami i czytaniem kodu; nikt nie otwierał ich w prawdziwej przeglądarce: zob. pozycja 1 niżej.

### Pod spodem

Dane gry mówią teraz, do czego przedmiot może służyć (przepis, wartość leczenia), a cele „Wytwórz” i „Opatrz” to to, co dane dają tym czasownikom, więc następny przedmiot tego samego rodzaju jest wierszem danych, a nie zmianą w kilku plikach kodu; koszt próby stoi w tabeli w sekcji Checks.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

brak

### Popraw albo przepuść

1. Nikt nie widział nowych ekranów w prawdziwej przeglądarce. Piątą grupę edytora, dwie nowe komórki, siatkę celów z ceną i czasem przy każdym, wyszarzone komórki, ruch klawiaturą po tej siatce i fokus po wyborze sprawdzono tylko testami i czytaniem kodu, a zasada mówi, że po takiej zmianie wciąż trzeba sprawdzić w prawdziwej przeglądarce. Jeśli coś jest nie tak, pierwszy gracz, który otworzy edytor, to znajdzie, na przykład komórkę za szeroką dla wąskiej siatki albo zgubiony fokus. Przejście teraz kosztuje sesję z przeglądarką i turę przeglądu, cofnięcie nic; zrobienie z tego zadania zostawia ekrany niewidziane, aż ktoś na nie spojrzy; przepuszczenie przyjmuje to ryzyko, a cofnięcie później kosztuje poprawkę po tym, jak ktoś trafi na usterkę. Polecam zrobić je w tej prośbie, bo wszystko, co gracz widzi z tej zmiany, jest nowe. Słaby punkt: testy już pokrywają każdy stan, więc przejście może nic nie znaleźć i kosztować turę na darmo. Zrobić w tej prośbie, zrobić z tego zadanie czy przepuścić? Kroki sprawdzenia ręcznego, którego wynik zapiszesz jako uwagę:
   1. Uruchom grę u siebie i zaloguj się; otwórz edytor programu na mapie z mchem (las).
   2. Zbierz trochę mchu w przejściu, żeby odsłonić opatrunek i „Wytwórz”, i otwórz wybór czynności przy regule: powinna być piąta grupa „Wytwarzanie” z „Wytwórz” oraz „Opatrz” po „Zjedz — jagoda” (wyszarzone, dopóki nie wytworzysz opatrunku).
   3. Wybierz „Wytwórz”: wybór celu powinien pokazać „Opatrunek (2 mchy)” i obok „10 min”; wybierz go i przeczytaj wiersz reguły („Wytwórz — Opatrunek”).
   4. Przejdź po siatce celów klawiaturą (strzałki, Enter) i sprawdź, czy fokus po wyborze ląduje sensownie.
   5. Uruchom program: opatrunek pojawia się w plecaku, a „Opatrz — Opatrunek” da się wtedy wybrać i pokazuje „zdrowie pełne”, dopóki zdrowie jest pełne.

   (Checks, 4)
2. Przegląd całej zmiany przeczytał w całości 12 z 182 decyzji swojego wyboru, a mianowicie te 12, które zmiana pisze albo zmienia; cały indeks 182 przeczytał po zdaniach wiążących i wskazał niektóre decyzje dotyczące zmiany (takie jak o sprawdzeniu programu i o odsłanianiu przedmiotów) jako czytane tylko tak. Jeśli któraś z nich mówi coś, co zmiana łamie, wyjdzie to później, gdy ktoś na niej oprze pracę. Świeży recenzent, który przeczyta to, co zostało, kosztuje kolejny przegląd (mniej więcej tak długi jak pierwszy), cofnięcie nic; przepuszczenie nic dziś nie kosztuje, a później kosztuje poprawkę, jeśli coś się znajdzie. Polecam przepuścić, bo 12 decyzji, których zmiana dotyka, przeczytano w całości, a każdy kawałek dotykający sprawdzenia programu, zapisu gry i ikon miał własny przegląd, który czytał jego decyzje. Słaby punkt: pozostałe 170 przeczytano tylko jako zdania. Przeczytać je w tej prośbie, zrobić zadanie czy przepuścić? (Checks, 5)

### Przyjmujesz przez scalenie

Scalenie przyjmuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

3. Drobną poprawkę zapamiętanej oceny dopisał do tego zadania doradca dnia po tym, jak przyjąłeś zadanie, więc nie widziałeś jej przy akceptacji. Zadanie zostawia drogę cyklowi. Cykl wybrał zapamiętywanie odcisku treści programu obok rewizji treści, tak że zapamiętana ocena pokazuje się tylko, dopóki oba się zgadzają; nie zmienił samego licznika rewizji, który może nadal powtórzyć się dla różnej treści, bo nic nie czyta go teraz samego. Wybrał tę drogę zamiast chwili każdej zmiany jako rewizji, która zmieniłaby cztery funkcje i ich testy oraz sens rewizji między urządzeniami. Jeśli chodziło Ci o to, żeby sam licznik nigdy się nie powtarzał, powiedz to; to jest osobne zadanie.
4. Odcisk to 64-bitowy skrót, więc dwie różne treści mogą się teoretycznie zgodzić; przyjęta szansa to najwyżej jedna na 2^52, a decyzja teraz to mówi. Koszt, gdyby to się zdarzyło: ocena stoi przy programie, którego nie oceniła, do następnej oceny albo zmiany.
5. W opisie programu w przyrządzie balansu nazwa przedmiotu jest pisana wielką literą, „Wytwórz — Opatrunek”, tak jak pokazuje ją wiersz gry (zadanie mówi „tak, jak pokazuje je gra”), a dawny opis zebranego zasobu w przyrządzie zostaje małą literą („Zbierz — patyk”); wyrównanie ich jest poza tym zadaniem.
6. Nowa decyzja o danych przedmiotu i zasobu oraz zmiany, które cykl wprowadził w istniejących decyzjach poza Twoimi wierszami, są wymienione w sekcji Foundation entries; te, których nie widziałeś przy akceptacji, są własne cyklu: nowa decyzja „Jak dane gry odróżniają przedmiot od zasobu?” (przedmiot, którego nie ma żadna mapa, to wiersz danych przedmiotów bez wiersza wśród zasobów; zasób to przedmiot, który leży na jakiejś mapie), zdanie, że „Wytwórz” i „Opatrz” bez znanego celu stoją wyszarzone jak pozostałe czynności tego rodzaju, dwie decyzje o zapamiętanej ocenie, poszerzona reguła o nazwach w kodzie, dwa tytuły ikon i dwie poprawki list tego, co odsłania rzeczy i co otwiera czynności.
7. Kilka testów trzyma teraz zdania decyzji przez linię z cytatem, a jedna reguła o identyfikatorach w kodzie została poszerzona o przedmioty: jej test zmieniono razem z nią (wymienia nowy przedmiot), a testy trzymające nową decyzję, nowe zdania o opatrywaniu, wytwarzaniu, cenach, grupach i zapamiętanej ocenie stoją w nowym pliku testów dla obu czasowników i w zmienionych plikach testów wymienionych w sekcji Foundation entries.

## Cost

Około 3 godzin 50 minut od startu do kroku zwrotnego, 71 etapów i 31 agentów; czas pracy 3 h 4 min i 44 min czekania na narzędzia. Tokenów łącznie około 350 milionów, prawie wszystko to wejście z pamięci podręcznej (Sonnet około 195 mln, Opus około 132 mln, Haiku około 23 mln); wyjście około 1,5 mln. Tury przeglądu: specyfikację przejrzano dwa razy (jedna poprawka); cztery kawałki miały własny przegląd (wszystkie przeszły); przegląd całej zmiany zawiódł raz z dwiema uwagami blokującymi i 13 drobnymi, które wzięła jedna poprawka w dwóch częściach, i przeszedł przy drugim czytaniu; krok zwrotny przejrzano raz i przeszedł. Tabela etapów stoi w kopii zapisu (odnośnik w sekcji Course of the cycle, gdy zapis zostanie zatwierdzony). Żadna kopia robocza agenta nie została, nie zostaje też żaden katalog wcześniejszego zadania.

## Jak scalić

Scal tak, żeby zachować commity (commit scalający, nie squash ani rebase), bo odnośnik do zapisu cyklu przetrwa tylko wtedy. Fundament nie czekał jeszcze tak długo na przegląd, żeby o niego prosić.

</details>

## Technical changes

The cost of the trial (to do item 14 of the task), counted as the task says (`git grep -l -w` by the kind of action; code is `src` and `balance`, data files included; tests are `tests`; entries of the foundation, icons and guidelines stand beside the count). In the table the part "one-time for the model" is files changed so that any later item of the same sort is a row of data, and "the bandage alone" is what the bandage itself needed; a file changed for both counts once, in the first part.

| | Files of code | Files of tests |
|---|---|---|
| One-time for the new model (types, the module of targets, the program check, the repertoire, the revelations, the effect of the two verbs, the saved game's version, the editor and its panel, the scene, the instrument, the lists written by hand) | 22 | 18 |
| The bandage alone (the credits of its two icons; the lists written by hand that gained the bandage and its icon) | 1 | 3 |
| Beside the model: the remembered judging (to do item 15) | 2 | 4 |
| In all, changed by the trial (not counting the foundation, the two icon files, four guideline or README files and the mutation-test list) | 25 | 25 |
| For comparison: today a kind of action of its own stands in | 7–8 | 15–27 |

- **The next item of the same sort** is shown by a second item laid in tests with a recipe and a healing value and no change of code: it becomes a target of both verbs in the simulation, in the editor and in the instrument, and moss becomes a target of neither. What it costs as data: one row of the items' data (one file of code), and, if it has its own icon, its file and its credit line (one more file of code). Five files of tests that write the items or their icons out by hand gained the bandage in this trial (the lists of the data, of the trip backpacks, of the icons, of the credits and of the names in code); a next item adds its line to those lists, and no test of the verbs changes.
- **Rewriting the seven present actions with an item in the name** ("Idź — ognisko", "Wytwórz — ognisko", "Zapal — ognisko", "Zapal — patyk", "Zasil — ognisko", "Zjedz — jagoda", "Uderz — patyk"), counted at the base of this request by `git grep -l -w` over the seven kinds of action (`walkToCampfire`, `craftCampfire`, `lightCampfire`, `lightItem`, `feedCampfire`, `eat`, `strikeWithStick`): the sum over the kinds is 54 files of code (9, 8, 8, 8, 7, 7, 7) and 149 of tests (19, 24, 24, 21, 17, 29, 15), and the number of different files is 10 of code and 40 of tests. (The task gave 54 and 147 at an older commit.)
- **How the data write an item that lies on no map, and what that cost.** The items' data now hold every item with its own name, plural forms, icon and icon title; the resources' data keep one row for each item some map holds, under that item's identifier, so every resource is an item and the bandage is an item with no resource row. The lists of what lies on tiles are built from the resources and so never hold the bandage, with no filter; the lists of items are built from the items' data. It cost 7 files of code and 2 of tests (the items' data, the check's reasons, five readers in the view, the test of the data and the test of the identifiers); the two other ways the task named were rejected (a field on each resource naming its item: a change of every reader of a resource as an item for a case nobody asked for; the bandage among the resources with a filter in every list of what lies on tiles: a recurring cost for each later item and a tile of bandages the load would admit).
- Changes by group: the content fingerprint and the stored form 2 of the remembered judging (2 files of code, 4 of tests); the move of the row of one field out of the rule panel function that stood at its limit; items with words of their own (simulation and view); the bandage and the two verbs in the data and the types, the module of targets, the check, the repertoire, the saved game's version 10, the effect and the first-crafted revelation, the editor (a new module for the pick of an item target), the panel and the row, the scene, the two icons with credits, and the instrument; the foundation entries (below); the fix of the review of the whole change (the foundation, the README and a guideline; the tests and the comments) and the return step.
- The shape of the saved game changed (version 10): older saved games are discarded by the load, which refuses a document of another version, a document whose backpack lacks the bandage, a program whose "Wytwórz" or "Opatrz" holds a target the data do not give the verb or none, and a tile that holds bandages; the reader of a previous save appends a program with today's actions unchanged, and skips and names an item whose program holds such a target.

## Checks

1. **The final gate is the CI run on the request's last head**; the cycle ran no full gate on its own system and has no local time of it (the user's instruction: before every full run of the tests, the cycle says so and waits for the day advisor's signal). The result of that run will be written here when it comes.
2. **Failing on the base:** none. The base is a merge commit with the tree of its second parent, the head of the merged request 167, whose final gate (CI, run 44877923423) passed; the list of tests failing before the change is empty, taken from *Checks* of that request.
3. **What each own-work check showed:** every slice's report holds its focused checks with the command and exit code, each seen failing for the expected reason first where it changes behaviour (the exceptions are named in the reports: the test of slice 15, the helper of slice 2, some cases of slice 6 where the output is identical); the focused checks passed at each head; the foundation check, `python -B .the-way/elements/common/foundation_check.py` without a switch, exits 0 with 0 errors at the head (run by the reviewers and by the orchestrator); `python -B .the-way/instruction-files/check_instructions.py` was not run (no instruction file changed). The mutation runs (StrykerJS) by the reviewers of slices 10 and of the whole change left only equivalent mutants and two real gaps, both closed by a new test in the fix.
4. **Not checked:** a walk in a real browser; the user-interface states of the editor, the panel, the row, "Teraz" and the chronicle were checked by tests and by reading the code only (item 1 above); no screenshot was shown, because the product settles a place for screenshots (a public repository of screenshots) and none was taken for this change; slice 8's executor looked at the credits in a running copy of the game and saw both new credit lines and both SVGs served.
5. **The reading of the review of the whole change:** 12 decisions of the index read whole of 182 in full and 202 by heading; the index was read whole.
6. **The form check, the private paths and the record:** to be written when the record is committed (the form check of this description, the check of private paths on it and on the copy of the record, the image check on the copy, the remarks check on the original and on the copy).
7. **Working copies left:** none. **Directories of earlier tasks kept:** none.

## Foundation entries

- **D-443** (new, `projected`): an action is a verb with a target and the targets a verb takes follow from the properties of the items in the game's data; actions made before keep kinds of their own until a change rewrites them. The *Relations* and the *Verification* that the projected entry left open were filled by the cycle (the verification names the tests of the targets in the simulation, the editor and the instrument, and the program of every kind of today read from a previous save).
- **D-444** (new, the cycle's): the game's data tell an item from a resource so that every item has a row of its own words and a resource is an item some map holds, under that item's identifier; the bandage is an item with no resource row. It carries a pair of examples that no test holds yet (it is marked the cycle's for that pair):
  - complies: an item no game map holds, such as the bandage, standing as a row of the items' data with words of its own and with no row among the resources; the item of a resource taking its name, plural forms, icon and icon title from the resource's row
  - violates: an item no game map holds written among the resources of the data; the words of an item that is a resource written again in its item row; a resource whose gathering gives pieces of an item of another identifier
- **D-145** (rows 2, 3, 14): "Opatrz — {rzecz}" uses up one piece of its target and gives back its healing whatever took the health, is not carried out in combat or at full health, and leaves the piece in the backpack where health is full at its end; the sentence about the stick stays.
- **D-290** (row 6): the pick of actions has five groups; "Opatrz" in "Żywność i walka" after "Zjedz — jagoda", "Wytwórz" alone in "Wytwarzanie".
- **D-121** (row 5): the first gathered moss brings the bandage and "Wytwórz", the first bandage made brings "Opatrz"; "Zdrowie poniżej" stays with the first wolf attack.
- **D-318** (row 11): the mage stays where it stands at "Wytwórz" and "Opatrz"; the scene gets no new picture or effect.
- **D-363** (row 8): the price of an action whose price its target gives stands at each target and at the chosen action; the cells "Wytwórz" and "Opatrz" of the pick of actions have none.
- **D-293** (rows 9, 13): the cell "Wytwórz" shows no time, "Opatrz" its own, and a time that comes from the target stands at each target beside the price.
- **D-380** (rows 10, 15): the reasons of "Wytwórz" and "Opatrz" ("brakuje {ile} × {rzecz}", "zdrowie pełne", the second first).
- **D-142** (row 12): "Wytwórz" and "Opatrz" take what they use at their end, so an attack that interrupts either takes nothing.
- **D-289** (row 1, and the cycle's): a thing that lies on no map is no target of "Idź", "Zbierz", "Obchód" or "Tu leży mniej niż" (row 1); "Wytwórz" and "Opatrz" with no known target stand greyed with "nie znasz jeszcze celu" (the cycle's, from the spec).
- **D-441** and **D-442** (the cycle's): a remembered judging holds a fingerprint of the content it judged and stands only while the program holds that content as well as the revision and generation it was judged at, but for a chance of a collision of at most one in 2^52; the content revision itself is unchanged and the way of a fingerprint alone stays rejected.
- **D-128** and **D-120** (the cycle's, corrections of the *Verification* clauses by the return step): the first gathered moss and the first piece of an item made are among the revealing events; "Wytwórz" and "Opatrz" are among the actions no character skill grows.
- **Invariant `content-identifiers`** (the cycle's): its sentence now names an item as well as a map, a resource and an archetype; its test (`tests/invariants/test_content_identifiers.py`) was changed with it.
- **Invariant `icon-credits`** (the cycle's, *Rests on* only): the two facts below; its test (`tests/invariants/test_icon_credits.py`) takes the two new titles.
- **Environment facts** (the cycle's): the page of Lorc's `bandage-roll` on game-icons.net names it "Bandage roll icon"; the page of Delapouite's `first-aid-kit` names it "First aid kit icon".
- Rows 4 and 7 of the task's *Settlements to record* went to data and icons (the bandage's row and the two verbs' rows in `src/browser/sim/data/`, the two icon files in `assets/icons/`), not to the foundation. Two guideline files gained a sentence or a row where their text had lagged (`guidelines/coding-simulation-module.md` for the module of targets; `guidelines/coding-browser-module.md` and `guidelines/testing.md` for the widened rule and the nine hundred digits), and the README names the file that holds the bandage's icon title.
- Tests that hold a sentence of a decision by a line `decision:` and were added or changed in this change: `tests/sim/craft-and-tend.test.mjs` (D-142, D-145, D-380, D-121, D-363 and the one-minute floor of D-374), `tests/sim/action-targets.test.mjs` (the first sentence of the new decision, D-126, D-289, D-310), `tests/sim/previous-programs.test.mjs` (the second sentence of the new decision, D-401), `tests/view/program-editor.test.mjs`, `tests/view/rule-editor.test.mjs`, `tests/sim/data.test.mjs` (D-290, D-121), `tests/view/item-verb-panel.test.mjs`, `tests/view/scene-picture.test.mjs`, `tests/sim/judging-record.test.mjs` and `tests/view/judging-cache.test.mjs` (D-441, D-442), `tests/balance/overlay.test.mjs`. No test of an invariant lost its line; the foundation check at the head lists nothing.

## Minor findings

- Slice 12's test of the end of "Opatrz" and the saved-game case of a fractional dressing count: the reviewer of the whole change agreed with the executor that no saved document can be refused for the fractional count of "Opatrz" alone (the counts must be whole and sum to the game minute), so the case `tests/sim/saved-game.test.mjs:2776-2778` refuses the document for either fraction; it stays as it is.
- `tests/view/item-verb-panel.test.mjs` puts item names into a regular expression without escaping them; it breaks only if a later item's name holds a special character (Minor, found by the review of the fix).
- D-444 keeps its whole pair of examples though two cases of `tests/sim/data.test.mjs` check part of its sentence; a test counts for a decision only through its `decision:` line, which neither case carries for D-444, so the pair is allowed; moving a line would let the decision name the tests (Minor, found by the review of the return step).

## Findings outside the task's scope

- `balance/describe.mjs:21-26`: the instrument writes an item with a capital letter, as the game's row does, but keeps a resource lower-case, unlike the game's "Zbierz — Patyk"; the resource part predates the change (the review of the whole change).
- `tests/view/discovery-rule.test.mjs` and `tests/view/knowledge-lines.test.mjs` hold no case of "Dodaj regułę z tym" for the discovery of the two verbs, nor of the bandage's icon on the screen Wiedza; the generic code they go through is tested for the items of today (the review of the whole change).

## Course of the cycle

- **Task and sources:** plan item 5 of the plan of project 2 (the model of actions and items, the trial on the bandage); the task document accepted by the day advisor on 2026-11-20, with *To do* item 15 added by the day advisor afterwards; the frozen copy is in the record; the base is `aff09e98` (merge of request 167).
- **Process pin:** `19e5774aed6d1d628042e23deccc110ed9f112c0`, not moved; no gate on the base (see Checks, 2).
- **Spec:** written, because the task left open how the data tell an item that is made from what lies on maps, where the recipe and the healing stand, the shape of an action with a target, how old programs stay the same, and how the remembered judging is kept from repeating; five decisions; reviewed twice (one fix).
- **Route:** planned slices, since the change spans the simulation, the view, the instrument, the icons and the foundation; no attempt was discarded.
- **Plan:** 17 slices and 16 foundation entries; the orchestrator raised eight slices from `cheaper` to `same` and added the quotation fix of slice 9, 13 and 15 and a test file to slice 9; every slice fits the size check.
- **Choices:** 4 choices of the cycle beyond the task's content (the way of the remembered judging, the capital letter in the instrument, the repairer's two citations, the choice of D-444); the questions table is in the record.
- **Blocking findings left:** none.
- **Record:** the link to the record by the SHA of the commit that adds it stands here once the record is committed.
