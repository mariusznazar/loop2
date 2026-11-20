**State: blocked** — a review finding remained after its one fix: the rules of the change and the balance measurement are in, the screens' words and the last checks are not made

## What you will see

Nothing on a screen has changed yet — the screens still use the old words — but the rules under them have, and the measurement you asked for is done.

- **A manual run of a map you have already solved** now takes its supplies from the chest and brings what it gathers back into the chest, like every other run; it still pays no practice. A "Restart" after the completion that solved the map does the same.
- **The resurrection has uses.** The account now has three uses, not one. A death of a character with practice spends one while any is left; used ones come back one at a time on one clock, one every four hours of real time (both numbers stand in the game's data, so one line changes them), and the first solving of a map the account has not solved before gives one back at once while the stock is not full. A new game starts with all three. When several characters die during an absence, they are settled in the order of the list and each finds the uses and the clock as the ones above it left them.
- **Saved games of the old shape are refused as damaged** and a player would start anew; the project accepted that for every change of the state's shape.
- **The balance instrument** counts the uses with the game's own functions (the earning loop and the map check start with all three; the "no resurrection" switch starts with none and the uses then come back as in the game; a simulated player who waits for the resurrection tries again as soon as one use is left), and has a new command that measures the three maps of the game — Skraj lasu, Las and Las — głębiej — from what the maps before each of them gave: practice from the first solvings, ranks bought with it, and a supply carried out by manual runs of solved maps.
- **The measurement, as a table without the programs' contents.** The best reference program of each map solves it on this share of 500 seeds: Skraj lasu 97.4%, Las 99.4%, Las — głębiej 92.4%. All three are far above the 20% line the task set as its stopping condition, so nothing stops for that reason. The supply needs no manual run for Skraj lasu and 3 for each of the two later maps. The sentence under the full table says what the maps were measured with (the table of the best programs stands in the technical part below; the full one is in the record).
- **What is not made yet: the words.** The line about the resurrection at each character, the end-of-run window, the card of a map (with the warning under "Wejdź" that no longer holds) and the screen of a solved-map run still speak of one resurrection that is ready or not. So this branch must not be merged or deployed as it stands.

### Underneath

The game's state now holds how many uses are spent and the moment the next one returns, the saved game is a new version, and the foundation has a new decision that the progression never requires the player's absence.

## For you to decide

### Needed from you

1. **A review finding remains: the measuring tool can hang forever (Blocking findings left, 1).** The campaign of the balance instrument — the simulated player that is away for days and comes back — now steps through the absence one loop minute at a time, to count every death a use covered. It reads the length of a loop minute fresh at each step, while the game reads it once when it starts. If a test overlay (a small file of changed game data used for measuring) shortens the loop minute, the steps shrink until the game's catch-up passes no time at all, and the campaign never ends. In the reviewer's test a 30-second minute hung, while the real 60 seconds and 90 seconds finished normally. Nothing in the project sets that value today, and no player is affected: whoever first overlays it would see a measurement that never ends, not wrong numbers. The finding comes from the last fix, which made the campaign count several covered deaths in one return (the finding before it, that it counted at most one, is fixed). It is in the campaign file of the instrument, one place.
   Ways open:
   a. Take the step length from the one place the instrument already keeps the loop minute (the instrument's loop file), so the campaign and the instrument agree by construction. Cost: one correction round — one fix and one review of it, minutes of work; it touches the measuring tool only. What stays: two instrument files that must agree by hand are replaced by one (a minor finding already records the duplication). Undoing it later costs nothing.
   b. Make the campaign stop with a clear error when a step does not move the game's clock. Cost: the same round, smaller. What stays: the measurement refuses to run under such an overlay instead of working; no hang. Undoing it costs nothing.
   c. Make the game read the loop minute where it uses it, as the last fix already did for the renewal of a use. Cost: one correction round, but it changes the game's simulation, which no slice of the plan asked for. What stays: any overlay then reaches the game exactly; a change in the game for the sake of a measuring tool. Undoing it later is a further change in the game.
   d. Keep the code as it stands, with this finding named in the request. Cost: nothing now. What stays: the first person who overlays the loop minute meets the hang and has to find this note; the other remaining stages run at once, on the code as it stands.
   I recommend a, since it fixes the cause (two readings of one number) inside the measuring tool and changes nothing the game does. Its weak point: it leaves the instrument holding the number in one more place than the game does, and only the next overlay of that number would show whether that is enough.
   Which round closes it: choosing a, b or c runs one correction on this branch — one fix by a fresh agent and one review of that fix; if that review passes, the same correction goes on to everything in item 2. Choosing d skips the fix and runs item 2 at once. Fix it as the finding says (a, b or c), or keep the code despite it (d)?

2. **What has not run, and runs after your answer to item 1.** The cycle stopped after the review of the fix of slices 8–10, and by its rules it makes no further slice and no later stage on code its review has not accepted. Not made:
   - Slice 11: the foundation entries about what the screens say (the line on the screen of a solved-map run, the end-of-run window, the line at a character, the card of a map), and the withdrawal of the decision about the warning mark under "Wejdź" with every reference to it.
   - Slice 12: the line about the resurrection at each character — on the card in Siedziba, on the Postać screen and in "Kto idzie" — shows the uses ("użycia 2 z 3") and the time to the next return, red only at zero uses.
   - Slice 13: the tests of the clock (the earning loop's deaths and first solvings) read the uses.
   - Slice 14: the four lines about the resurrection in the end-of-run window, in the wordings the task fixes.
   - Slice 15: the card of a solved map counts what enters from the chest as at every other map, and the warning under "Wejdź" goes with its code and the style guide's mentions.
   - Slice 16: the leftover code that took supplies from nowhere is removed.
   - Slice 17: the line on the screen of a solved-map run says what holds now (it takes from the chest and brings out to it, pays no practice).
   - Slice 18: the test of the whole page (a very large file) is updated.
   Also not run: the review of the whole change, the return step (it compares the foundation with the code and corrects what no longer matches, among them five old uses of "resurrection is ready" the reviewers found — the entry about the saved moment, one glossary entry, two decisions' rationale and verification texts and one decision's rejected ways — and it names the tests that hold the new paragraph about the instrument), and the reconciliation with the main branch. Until they run, the gate stays red: 23 cases of the screens' tests expect the old words (Checks).
   Nothing waits for you in these stages except the answer to item 1. Answer here: go on with them as item 1 says (they run in the correction), or say which you do not want.

### Fix or let through

3. **The task asks two things of a later retuning of the number of uses that cannot both hold.** The task says that lowering the count later refuses only a saved game whose spent uses are more than the new count, and also that the load checks the uses left in an end-of-run record against the count. Lowering from 3 to 1 therefore refuses, as damaged, a save that stands at an end-of-run window of a first death (it records 2 left), although its spent uses fit the new count. A player with that window open would lose the save and start anew, once, on the day the number is retuned; the task plans such a retune after the first walls are measured. Ways: do nothing special (the check as it is, simplest, no cost, the risk above); loosen the check so that it ignores that record, which costs a change in the load at the trust boundary and a review; or make a task of settling which sentence of the task wins. I recommend letting it through, since any change of the state's shape already wipes saves and a retune by two or more is a rare act. Its weak point: nobody remembers this note on the day of the retune. Do it in this request, make a task of it, or let it through?
4. **No walk through the running game was made.** The first solved-map runs through the changed rules were tested by the cases of the simulation and the page tests, but nobody played one in a browser, because a solved-map state needs a scripted first completion and the screens that show it change in the slices not made. If something is wrong in how it plays, a player finds it when the supplies of a solved-map run do not match the chest. Doing it in this request costs a session with the running game after slice 17, and a round of review if it finds anything; undoing it costs nothing. Making a task of it leaves it unchecked until someone plays; letting it through accepts that risk. I recommend doing it in this request after the screens are made, since that is the first moment the whole path can be seen. Its weak point: it needs a scripted game state and may cost a round for nothing. Run it in this request, make a task of it, or let it through?
   (Checks, 5)

### You accept by merging

This request is blocked, so it is not to be merged now; when it is merged later, merging accepts these items, and you say which one does not suit you.

5. **A new foundation decision, and wording of existing ones, that you did not see at the task.** The new decision that the progression never requires the player's absence is written as the task quoted it; its relations are none and its way of being checked is an agent's comparison of a later change with a pair of examples (below), not a test, because a test of it would run the measurement over seeds, which the task keeps out of the gate, or would pin 20% for later maps, which the task does not. The decision on how the instrument counts the resurrection got a binding paragraph (the loop starts with all uses, the "no resurrection" switch with none and the clock started at the loop's start, a waiting player tries when one use is left), because the task placed that settlement there and the decision had no sentence for it. The decision about what a death takes was split into three paragraphs to stay within the length limits and gained the arithmetic of the numbers (a 25% wall, three uses, 58% of sittings pass on uses alone) as a calculation to correct when the first walls are measured. The decisions about how an absence settles deaths gained the last use and the clock of returns.
6. **The measurement builds its state by a sweep from a given state, not by extending the campaign.** Practice is the median per skill of the best program's solved runs on the earlier maps, ranks are bought with it for what the measured program uses, and the supply comes from manual runs of the solved map by that map's best program. The other way (extending the campaign) would run an earning loop through the whole measurement, which the task wants out of it. The cost of the chosen way: "the best program" is picked by the share of seeds it solves, so a narrowed run of the command is not a cut of the full table (written in the skill).
7. **Changed invariant sentences and tests that hold decisions.** Four invariants were reworded: a manual run of a solved map now only adds no practice; the transfer and the end-of-run deposit have no exception for it; the resurrection's renewal now speaks of uses, one clock and the one use a first solving returns. The full check of the foundation, run on this branch, lists none of them as a sentence whose test was left as it was; it reports 9 quotations in screens' tests (the clock, the maps screen, the trip and the page test) of sentences that changed — the slices not made rewrite them. The tests of the simulation, the instrument and the saved game that quote decisions by their lines were rewritten to quote the new sentences.

## Cost

Three hours and sixteen minutes of working time so far, of which 45 minutes were spent waiting for tools; 65 stages, 18 agents (one planner, ten slice executors, one agent that fixed the findings of slices 8–10 and six reviewers, resumed for the reviews of fixes and for the fixes of their own slices) in a plan of 18 slices of which 10 are made. About 264 million tokens counted with the cached reads (92 million by the strongest class, 92 million by the middle class, 78 million by the cheapest class), 1.3 million written. Review rounds: five slices or groups were reviewed and fixed once and re-reviewed (rules in the foundation, slices 3–4, slices 5–6, slice 7, slices 8–10); slice 2 passed at once; the last review of the fix did not pass. The local run of the gate took 81 seconds. The [table of stages](https://github.com/mariusznazar/loop2/blob/pending-record-sha/docs/task-cycles/zapas-i-wskrzeszenie/stages.md) is in the committed record.

## How to merge

Do not merge this request. Answer items 1 and 2 (and 3 and 4) in a comment; the cycle then runs a correction on this same branch. When the finished request is merged, use the merge that keeps the commits, because the link to the record survives only that way.

<details>
<summary>W Twoim języku</summary>

**Stan: zablokowane** — uwaga recenzenta została po jednej poprawce: zasady zmiany i pomiar balansu są gotowe, a brzmienie ekranów i ostatnie sprawdzenia nie powstały

## Co zobaczysz

Na żadnym ekranie nic się jeszcze nie zmieniło — ekrany mówią starymi słowami — ale zasady pod spodem tak, i pomiar, o który prosiłeś, jest zrobiony.

- **Ręczne przejście mapy, którą już rozwiązałeś**, bierze teraz zapas ze skrzynki i wynosi do niej to, co zbierze, jak każde inne przejście; wciąż nie płaci wprawy. „Restart” po domknięciu, które rozwiązało mapę, robi to samo.
- **Wskrzeszenie ma użycia.** Konto ma teraz trzy użycia, nie jedno. Śmierć postaci z wprawą zużywa jedno, póki jakieś zostało; zużyte wracają po jednym na jednym zegarze, jedno co cztery godziny czasu realnego (obie liczby stoją w danych gry, więc zmienia je jedna linia), a pierwsze rozwiązanie mapy, której konto jeszcze nie rozwiązało, oddaje jedno od razu, póki zapas nie jest pełny. Nowa gra zaczyna z trzema. Gdy w czasie nieobecności ginie kilka postaci, rozlicza się je w kolejności listy i każda zastaje użycia oraz zegar takie, jakie zostawiły postacie wyżej.
- **Zapisy gry w starym kształcie są odrzucane jako uszkodzone** i gracz zaczynałby od nowa; projekt przyjął to przy każdej zmianie kształtu stanu.
- **Przyrząd balansu** liczy użycia funkcjami gry (pętla zarobkowa i sprawdzenie mapy startują z trzema; przełącznik „bez wskrzeszenia” startuje z zerem, a użycia wracają potem jak w grze; symulowany gracz, który czeka na wskrzeszenie, próbuje ponownie, gdy zostanie choć jedno użycie) i ma nowe polecenie, które mierzy trzy mapy gry — Skraj lasu, Las i Las — głębiej — tym, co dały mapy przed każdą z nich: wprawą z pierwszych rozwiązań, kupionymi za nią stopniami i zapasem wyniesionym ręcznymi przejściami map rozwiązanych.
- **Pomiar, jako tabela bez treści programów.** Najlepszy program wzorcowy każdej mapy rozwiązuje ją na takim udziale z 500 ziaren: Skraj lasu 97,4%, Las 99,4%, Las — głębiej 92,4%. Wszystkie trzy są daleko ponad 20%, czyli progiem, który zadanie ustawiło jako warunek zatrzymania, więc z tego powodu nic się nie zatrzymuje. Zapas nie wymaga ręcznego przejścia na Skraju lasu, a na obu późniejszych mapach wymaga 3. Zdanie pod pełną tabelą mówi, czym mapy mierzono (tabela najlepszych programów stoi niżej, w części technicznej; pełna jest w zapisie).
- **Czego jeszcze nie ma: brzmienia.** Wiersz o wskrzeszeniu przy każdej postaci, okno końca przejścia, karta mapy (z ostrzeżeniem pod „Wejdź”, które już nie jest prawdą) i ekran przejścia mapy rozwiązanej wciąż mówią o jednym wskrzeszeniu, które jest gotowe albo nie. Dlatego tej gałęzi nie wolno scalać ani wdrażać w obecnym stanie.

### Pod spodem

Stan gry trzyma teraz liczbę zużytych użyć i chwilę powrotu następnego, zapis gry ma nową wersję, a fundament ma nową decyzję, że postęp nigdy nie wymaga nieobecności gracza.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

1. **Została uwaga recenzenta: narzędzie pomiarowe może zawisnąć na zawsze (Blocking findings left, 1).** Kampania przyrządu balansu — symulowany gracz, który jest nieobecny całymi dniami i wraca — przechodzi teraz przez nieobecność po jednej minucie pętli, żeby policzyć każdą śmierć, którą pokryło użycie. Długość minuty pętli czyta za każdym razem od nowa, a gra czyta ją raz, przy starcie. Jeśli nakładka testowa (mały plik ze zmienionymi danymi gry, używany do pomiarów) skróci minutę pętli, kroki maleją, aż doganianie gry nie przesuwa czasu wcale, i kampania nigdy się nie kończy. W teście recenzenta minuta 30-sekundowa zawisła, a prawdziwe 60 i 90 sekund skończyły się normalnie. Nic w projekcie dziś nie ustawia tej wartości i żaden gracz nie jest dotknięty: kto pierwszy ją nałoży, zobaczy pomiar, który się nie kończy, a nie błędne liczby. Uwaga pochodzi z ostatniej poprawki, która kazała kampanii liczyć kilka pokrytych śmierci w jednym powrocie (poprzednia uwaga, że liczyła najwyżej jedną, jest naprawiona). Siedzi w jednym miejscu — w pliku kampanii przyrządu.
   Warianty:
   a. Wziąć długość kroku z jedynego miejsca, w którym przyrząd już trzyma minutę pętli (plik pętli przyrządu), żeby kampania i przyrząd zgadzały się z konstrukcji. Koszt: jedna runda poprawki — jedna poprawka i jeden przegląd, minuty pracy; dotyka tylko narzędzia pomiarowego. Co zostaje: dwa pliki przyrządu, które muszą się zgadzać ręcznie, zastępuje jeden (drobna uwaga już zapisuje to powielenie). Cofnięcie później nic nie kosztuje.
   b. Kazać kampanii zatrzymać się z czytelnym błędem, gdy krok nie przesuwa zegara gry. Koszt: ta sama runda, mniejsza. Co zostaje: pomiar odmawia pracy pod taką nakładką zamiast działać; bez zawieszenia. Cofnięcie nic nie kosztuje.
   c. Kazać grze czytać minutę pętli tam, gdzie jej używa, jak ostatnia poprawka zrobiła to już dla odnowienia użycia. Koszt: jedna runda poprawki, ale zmienia symulację gry, o co żaden slice planu nie prosił. Co zostaje: każda nakładka dosięga wtedy gry dokładnie; zmiana w grze na potrzeby narzędzia pomiarowego. Cofnięcie później to kolejna zmiana w grze.
   d. Zostawić kod, jaki jest, z uwagą nazwaną w prośbie. Koszt: teraz nic. Co zostaje: pierwsza osoba, która nałoży minutę pętli, trafi na zawieszenie i musi znaleźć tę notatkę; pozostałe etapy ruszają od razu, na kodzie takim, jaki jest.
   Rekomenduję a: naprawia przyczynę (dwa odczyty jednej liczby) wewnątrz narzędzia pomiarowego i nie zmienia niczego, co robi gra. Słaby punkt: przyrząd trzyma liczbę w jednym miejscu więcej niż gra, a czy to wystarczy, pokaże dopiero kolejna nakładka tej liczby.
   Która runda to zamyka: wybór a, b albo c uruchamia jedną korektę na tej gałęzi — jedną poprawkę przez nowego agenta i jeden przegląd tej poprawki; jeśli przegląd przejdzie, ta sama korekta idzie dalej do wszystkiego z punktu 2. Wybór d pomija poprawkę i uruchamia punkt 2 od razu. Naprawić tak, jak mówi uwaga (a, b lub c), czy zostawić kod mimo niej (d)?

2. **Co nie ruszyło i ruszy po Twojej odpowiedzi na punkt 1.** Cykl zatrzymał się po przeglądzie poprawki slice'ów 8–10 i według swoich reguł nie robi dalszych slice'ów ani późniejszych etapów na kodzie, którego przegląd nie przyjął. Nie powstały:
   - Slice 11: wpisy fundamentu o tym, co mówią ekrany (wiersz na ekranie przejścia mapy rozwiązanej, okno końca przejścia, wiersz przy postaci, karta mapy) oraz wycofanie decyzji o znaku ostrzeżenia pod „Wejdź” ze wszystkimi odwołaniami do niej.
   - Slice 12: wiersz o wskrzeszeniu przy każdej postaci — na karcie w Siedzibie, na ekranie Postać i w „Kto idzie” — pokazuje użycia („użycia 2 z 3”) i czas do następnego powrotu, na czerwono tylko przy zerze użyć.
   - Slice 13: testy zegara (śmierci i pierwszych rozwiązań w pętli zarobkowej) czytają użycia.
   - Slice 14: cztery wiersze o wskrzeszeniu w oknie końca przejścia, w brzmieniach, które ustala zadanie.
   - Slice 15: karta mapy rozwiązanej liczy to, co wchodzi ze skrzynki, jak przy każdej innej mapie, a ostrzeżenie pod „Wejdź” znika razem ze swoim kodem i wzmiankami w wytycznych wyglądu.
   - Slice 16: usunięcie pozostałego kodu, który brał zapas znikąd.
   - Slice 17: wiersz na ekranie przejścia mapy rozwiązanej mówi to, co teraz obowiązuje (bierze ze skrzynki i wynosi do niej, nie płaci wprawy).
   - Slice 18: test całej strony (bardzo duży plik) jest uaktualniony.
   Nie ruszyły też: przegląd całej zmiany, krok powrotny (porównuje fundament z kodem i poprawia to, co przestało pasować, m.in. pięć starych użyć „wskrzeszenie jest gotowe”, które znaleźli recenzenci — wpis o zapisanej chwili, jedno hasło słownika, teksty uzasadnienia i sprawdzania dwóch decyzji i teksty odrzuconych dróg jednej decyzji — i wskazuje testy, które trzymają nowy akapit o przyrządzie) oraz uzgodnienie z gałęzią główną. Dopóki nie ruszą, bramka zostaje czerwona: 23 przypadki testów ekranów oczekują starych słów (Checks).
   Poza odpowiedzią na punkt 1 nic w tych etapach na Ciebie nie czeka. Odpowiedz tu: iść z nimi dalej tak, jak mówi punkt 1 (ruszają w korekcie), albo wskaż, których nie chcesz.

### Naprawić albo przepuścić

3. **Zadanie prosi o dwie rzeczy dotyczące późniejszego strojenia liczby użyć, które nie mogą obie zachodzić.** Zadanie mówi, że obniżenie liczby odrzuca tylko zapis, w którym zużytych jest więcej niż nowa liczba, a także że wczytanie sprawdza pozostałe użycia w rekordzie końca przejścia wobec tej liczby. Obniżenie z 3 do 1 odrzuca więc jako uszkodzony zapis stojący przy oknie końca po pierwszej śmierci (zapisuje 2 pozostałe), choć jego zużyte użycia mieszczą się w nowej liczbie. Gracz z otwartym takim oknem straciłby zapis i zaczął od nowa, raz, w dniu strojenia; zadanie planuje takie strojenie po zmierzeniu pierwszych ścian. Drogi: nie robić nic szczególnego (sprawdzenie takie, jakie jest, najprościej, bez kosztu, z ryzykiem wyżej); poluzować sprawdzenie tak, by ten rekord pomijało, co kosztuje zmianę wczytania na granicy zaufania i przegląd; albo założyć zadanie na rozstrzygnięcie, które zdanie zadania wygrywa. Rekomenduję przepuścić, bo każda zmiana kształtu stanu i tak kasuje zapisy, a strojenie o dwa lub więcej to rzadki akt. Słaby punkt: nikt nie będzie pamiętał tej notatki w dniu strojenia. Zrobić to w tej prośbie, założyć zadanie, czy przepuścić?
4. **Nie zrobiono przejścia przez działającą grę.** Pierwsze przejścia map rozwiązanych według zmienionych reguł sprawdziły przypadki symulacji i testy strony, ale nikt nie zagrał takiego w przeglądarce, bo stan z mapą rozwiązaną wymaga oskryptowanego pierwszego domknięcia, a ekrany, które go pokazują, zmieniają się w slice'ach, które nie powstały. Jeśli coś jest nie tak w tym, jak się gra, gracz zobaczy to, gdy zapas przejścia mapy rozwiązanej nie zgodzi się ze skrzynką. Zrobienie tego w tej prośbie kosztuje sesję z działającą grą po slice'u 17 i rundę przeglądu, jeśli coś wyjdzie; cofnięcie nic nie kosztuje. Założenie zadania zostawia sprawę niesprawdzoną, aż ktoś zagra; przepuszczenie przyjmuje to ryzyko. Rekomenduję zrobić to w tej prośbie, gdy ekrany będą gotowe, bo to pierwszy moment, w którym widać całą ścieżkę. Słaby punkt: wymaga oskryptowanego stanu gry i może kosztować rundę na próżno. Zrobić w tej prośbie, założyć zadanie, czy przepuścić?
   (Checks, 5)

### Akceptujesz przez scalenie

Ta prośba jest zablokowana, więc nie ma być teraz scalona; gdy zostanie scalona później, scalenie przyjmuje te punkty, a Ty mówisz, który Ci nie odpowiada.

5. **Nowa decyzja fundamentu i brzmienie istniejących, których nie widziałeś przy zadaniu.** Nowa decyzja, że postęp nigdy nie wymaga nieobecności gracza, jest zapisana tak, jak zadanie ją cytowało; jej relacje to brak, a sposób sprawdzania to porównanie późniejszej zmiany przez agenta z parą przykładów (niżej), nie test, bo test musiałby puszczać pomiar na ziarnach, co zadanie trzyma poza bramką, albo przypinać 20% dla dalszych map, czego zadanie nie robi. Decyzja o tym, jak przyrząd liczy wskrzeszenie, dostała wiążący akapit (pętla startuje z trzema użyciami, przełącznik „bez wskrzeszenia” z zerem i zegarem puszczonym w chwili startu pętli, czekający gracz próbuje przy jednym użyciu), bo zadanie umieściło to ustalenie tam, a decyzja nie miała na to zdania. Decyzja o tym, co zabiera śmierć, została podzielona na trzy akapity, by zmieścić się w limitach długości, i dostała rachunek liczb (ściana 25%, trzy użycia, 58% posiedzeń przechodzi samymi użyciami) jako obliczenie do poprawy po zmierzeniu pierwszych ścian. Decyzje o rozliczaniu śmierci w nieobecności dostały ostatnie użycie i zegar powrotów.
6. **Pomiar buduje swój stan przemiataniem od zadanego stanu, a nie przez rozbudowę kampanii.** Wprawa to mediana na umiejętność z rozwiązanych przejść najlepszego programu na wcześniejszych mapach, stopnie kupuje się za nią dla tego, czego używa mierzony program, a zapas pochodzi z ręcznych przejść mapy rozwiązanej przez najlepszy program tej mapy. Druga droga (rozbudowa kampanii) puszczałaby pętlę zarobkową przez cały pomiar, czego zadanie chce uniknąć. Koszt wybranej drogi: „najlepszy program” wybiera się po udziale rozwiązanych ziaren, więc zawężone uruchomienie polecenia nie jest wycinkiem pełnej tabeli (zapisane w skillu).
7. **Zmienione zdania niezmienników i testy trzymające decyzje.** Przeformułowano cztery niezmienniki: ręczne przejście mapy rozwiązanej tylko nie dodaje wprawy; przeniesienie i wniesienie przy domknięciu nie mają dla niego wyjątku; odnowienie wskrzeszenia mówi teraz o użyciach, jednym zegarze i jednym użyciu, które oddaje pierwsze rozwiązanie. Pełna kontrola fundamentu na tej gałęzi nie wymienia żadnego z nich jako zdania, którego test zostawiono bez zmian; zgłasza 9 cytatów w testach ekranów (zegar, ekran map, przejście i test strony) zdań, które się zmieniły — przepisują je slice'y, które nie powstały. Testy symulacji, przyrządu i zapisu gry, które cytują decyzje swoimi liniami, przepisano tak, by cytowały nowe zdania.

## Koszt

Trzy godziny szesnaście minut pracy dotąd, z czego 45 minut to czekanie na narzędzia; 65 etapów, 18 agentów (jeden planista, dziesięciu wykonawców slice'ów, jeden agent poprawiający uwagi slice'ów 8–10 i sześciu recenzentów, wznawianych do przeglądów poprawek i do poprawek własnych slice'ów) w planie 18 slice'ów, z których 10 powstało. Około 264 milionów tokenów liczonych z odczytami z pamięci podręcznej (92 miliony najmocniejsza klasa, 92 miliony średnia, 78 milionów najtańsza), 1,3 miliona zapisanych. Rundy przeglądu: pięć slice'ów lub grup przejrzano i poprawiono raz oraz przejrzano ponownie (zasady w fundamencie, slice'y 3–4, 5–6, 7, 8–10); slice 2 przeszedł od razu; ostatni przegląd poprawki nie przeszedł. Lokalny przebieg bramki trwał 81 sekund. [Tabela etapów](https://github.com/mariusznazar/loop2/blob/pending-record-sha/docs/task-cycles/zapas-i-wskrzeszenie/stages.md) jest w zatwierdzonym zapisie.

## Jak scalić

Nie scalaj tej prośby. Odpowiedz na punkty 1 i 2 (oraz 3 i 4) w komentarzu; cykl uruchomi wtedy korektę na tej samej gałęzi. Gdy skończona prośba będzie scalana, użyj scalenia, które zachowuje commity, bo link do zapisu przeżywa tylko tak.

</details>

## Technical changes

Ten slices of an eighteen-slice plan, 19 commits on top of `46cfec71`; each line says what the group concerns, then where.

- **Foundation rules (slice 1; `3647bb19`, fix `f30dffb7`).** The rules of the stock and the resurrection: new D-438, changes to D-189, D-179, D-214, D-190, D-220, D-240, D-242, D-428, four invariants and the glossary entry `resurrection` (`foundations/decisions.md`, `invariants.md`, `glossary.md`).
- **Load admits a solved-map run's deposit (slice 2; `814cb8b1`)** — `src/browser/sim/saved-game.ts`, `tests/sim/saved-game.test.mjs`.
- **A manual run of a solved map takes from the chest and brings out to it (slice 3; `74652031`, fix `a007dd9b`)** — `src/browser/sim/game.ts`, `trip.ts`, `types.ts`, `tests/sim/trip.test.mjs`, `run-record.test.mjs`; the take-from-nowhere functions stay until slice 16.
- **Measurement command (slice 4; `0fde9df0`)** — new mode `progression` of the balance instrument: `balance/progression.mjs`, `balance/cli.mjs`, tests, the row in `guidelines/coding-balance-instrument.md`, both copies of the skill `loop2-balance` (byte-identical).
- **Uses of the resurrection (slice 5 `fc64661c`; slice 6 `7e3869c2`, fix `20e6eaab`).** `resurrectionAt` in `game.ts`; the team holds the spent count and the moment of the next return; the data hold 3 uses and 240 minutes; saved game version 8 loaded strictly (count above the data's, moment inconsistent with the count, settlement's uses left above the count: refused as damaged) — `types.ts`, `data/balance.ts`, `game.ts`, `saved-game.ts`, `src/browser/view/team-lines.ts`, `tests/sim/team.test.mjs`, `guidelines/coding-saved-game.md`.
- **Tests (slices 7–9; `f2707957` + `f2c9c335`, `3c621606`, `b0353afa`)** — `tests/sim/saved-game|death|completion|flow|data|catch-up|loop.test.mjs`; `src/browser/sim/loop.ts` comments only.
- **The instrument counts uses (slice 10; `55a35a33`, `ab0e44ba`)** — `balance/loop.mjs`, `campaign.mjs`, `check-map.mjs`, `cli.mjs`, both skill copies, their tests.
- **Fix of slices 8–10 (`febbcfc9`, `87ae7409`, `3a00e73a`).** The game reads the renewal where it is used, so an overlay reaches it; three tests take the save version from the game's constant; the campaign counts the uses a return spends one by one (this last commit brought the finding that remains).

Measurement table for the best program of each map (labels only; seeds 1–500). The full table of 23 programs per map is in `reports/slice-04-executor-report.md` of the committed record (too long for this description); no result file is committed (the instrument's rule):

| Map | Program | Solved (seeds 1-500) | Median game minutes of solved runs | Deaths by cause | Runs at the cap |
| --- | --- | --- | --- | --- | --- |
| Skraj lasu | P23 | 97.4 % | 733 | cold 13 | 0 |
| Las | P10 | 99.4 % | 480 | cold 3 | 0 |
| Las — głębiej | P10 | 92.4 % | 654 | combat 22, cold 16 | 0 |

The sentence under the table, as the command wrote it:

> Each map was measured with the practice and ranks from the first solvings of the maps before it, each by that map's best program, and with the stock its program takes, brought out by manual runs of solved maps (Skraj lasu: no manual run, the stock not gathered in full; Las: 3 manual runs; Las — głębiej: 3 manual runs).

## Checks

- **Gate on this head (`3a00e73a`), run on the cycle's own system (unfinished code, no return step; CI's result stands on the request's page and was not waited for):** `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/zapas-i-wskrzeszenie/gate_times.md -- npm.cmd test` — exit 1, 80.6 s. The first call with `npm test` exited 2 with `Error: gate_times.py: cannot start 'npm': [WinError 2]` (no test ran; the call was wrong on this Windows machine; repeated with `npm.cmd`). The gate stops at its first failing stage: the build passed; of 2719 Node tests 2696 passed and 23 failed, all in the screens' tests — `tests/view/` `account-screen` (3), `character-screen` (1), `clock` (5), `end-window-game` (1), `end-window-lines` (1), `end-window` (1), `headquarters-screen` (1), `maps-screen` (1), `team-lines` (6), `trip` (2), `world-area` (1) — each a case of a slice not made (12–15, 17, 18). **Did not run:** the Python tests (`.the-way/gate/run_tests.py`), and inside the gate `foundation_check.py` and `check_instructions.py`: unchecked, not passed.
- **Run apart:** `python -B .the-way/elements/common/foundation_check.py` — exit 1, 9 errors, all quotations of changed sentences in the screens' tests (`account-screen.test.mjs:3133`, `clock.test.mjs` 320, 392, 538, 581, 582, 585, `maps-screen.test.mjs:749`, `trip.test.mjs:175`), no `listed:` line; `python -B .the-way/instruction-files/check_instructions.py` — exit 0, `0 error, 146 warn, 7 info` (warnings not compared with a baseline).
- **Failing on the base:** none, taken from request 165's final gate (record commit `420dffd3`, `docs/task-cycles/szkielet-progresji/cycle.md`; CI `tests` on `25ea0d3e` passed, run `actions/runs/44780012574`); the base `46cfec71` is a merge commit with the tree of that branch's head, so no gate ran on it.
- **Own-work and focused checks:** each executor's report holds them with commands and exit codes; tests written first failed on the base (slices 2, 3, 4, 6, 10). The reviewers' own probes: 22 and 70 hostile saved documents against the load (none wrongly admitted), 16 hand-made mutations of the load caught, StrykerJS 33 of 33 and 43 mutants without a survivor, a reproduction of the measurement (Skraj lasu and Las identical, Las — głębiej 91.7% on 60 seeds against 92.4%), old and new campaign code side by side on 30 campaigns (identical logs).
- **Not done (item 4):** no walk through the running game and no screenshot — no screen changed in the slices made, and a solved-map state needs a scripted first completion.
- **Working copies left:** none. **Directories of earlier tasks kept:** none.
- **Checks of the description and the record's copy:** written and checked after this commit

## Foundation entries

- `D-438` (new), `projected` (sentence, rationale, rejected word for word), *Relations* `none` and *Verification* (an agent compares a change with the pair below; no test) `the cycle's`: the progression never requires the player's absence. Pair (`the cycle's`): *complies* — a new map whose requirement of practice, items and equipment is met by what the first solutions and the manual runs of the maps before it gave, a measurement of the balance instrument showing it with the best reference program and no earning loop; *violates* — a new map whose requirement is met only by what an earning loop gathers over hours of real time; a requirement of pace counted in days.
- `D-189`, `D-179`, `D-214` (`row 1`): a manual run of a solved map takes from the chest, brings its loot out and pays no practice; the equipment-from-nowhere sentence and the mark under "Wejdź" are gone.
- `D-190` (`row 2`, `3`, `4`): uses, one clock, a first solving returns one; split into three paragraphs; its rationale gained the arithmetic of question 4 (`the cycle's`). `D-220` (`row 5`): a new game has all uses. `D-240`, `D-242` (task's *Decisions in play*, no row): last use and clock of returns.
- `D-428` (`row 10`): *Verification* says the loop starts with all uses; a new binding paragraph (`the cycle's`) for the loop, `--no-resurrection` and the waiting campaign player; four cases carry its `decision:` lines (slice 10); the return step names them in its `tests:` clause.
- Invariants `solved-map-manual-run`, `trip-transfer`, `trip-run-end`, `resurrection-renewal` (`row 3`, `4`); glossary `resurrection` (`row 9`).
- Tests holding a decision's sentence by a `decision:` line, changed by the change: `tests/sim/trip|run-record|team|death|completion|flow|data|catch-up|loop|saved-game.test.mjs`, `tests/balance/loop|campaign|check-map|cli.test.mjs`; nine quotations in screens' tests stand wrong until slices 13, 15, 17, 18.
- Still carrying the old meaning, for the return step: `D-386`, glossary `generation number`, `D-241`, `D-219`, `D-194`.

## Minor findings

The Minor findings that no fix made, in the reviewers' words (first report of each group, then the review of its fix). By the rule, Minor findings of slice reviews are not fixed.

##### slice 1 (foundation rules) (`reports/review-s01-report.md`)

### M-1 — D-190 *Rejected* lacks some of the ways the rows' sources keep

- Place: `foundations/decisions.md:6236` (D-190 *Rejected*).
- The template (`.the-way/elements/decisions/template.md`, "The *Rejected* of a decision written from a row …", WAY-134) asks *Rejected* to hold the ways not chosen that the row's source keeps, each with its cost, or `no cost to the product known`. Rows 2–4 cite questions 2, 3, 4, 5. Missing: from question 2, "Kształt Mariusza bez dalszej drogi przez wytwarzanie — jedna zmiana i koniec; zegar zostaje ceną na stałe", "Od razu pełny wytwarzany przedmiot — … do tego czasu obowiązuje dzisiejsze osiem godzin", "Wskrzeszenie jako prawdziwy przedmiot z własnymi liczbami — czekałby na zadania 8 i 10" (a cost of the plan only — then `no cost to the product known`); from question 4, "Liczby Mariusza — droga otwarta, bez kosztu w pytaniu" (`no cost to the product known`). The ways added (unchanged eight hours, shorter clock, 2/8, 5/2, own clock per use, all uses back at a completion) are right. Minor by WAY-364: form, the content agrees; the item "a resurrection as an item in the chest — set aside…" and the *Rationale*'s "a later direction, not built" cover the crafting ways in spirit.

### M-2 — D-240 *Rationale* and *Rejected* still speak of one resurrection to take

- Place: `foundations/decisions.md:8622-8630` (D-240, an entry of this slice). "a character higher on it died with the resurrection", "a character whose resurrection another's turn reaches is outside `catch-up-state`", *Rejected* "the resurrection going to the character that died first in real time". The binding sentence now says "the last use"; the prose keeps the old one-resurrection reading. Glossary template, "A changed meaning" (WAY-97): uses whose meaning the new definition of `resurrection` moves are rewritten in the same change. Minor: prose; a reader can still follow it, e.g. "the last use going to the character that died first in real time".

### M-3 — `resurrection-renewal` joins several rules in one sentence

- Place: `foundations/invariants.md:1070`. Use-up, start of the clock, return and move of the clock, the return at a first completion, deaths that leave everything, and the equal moment, in one sentence of about 150 words. The invariant template ("One entry states one invariant, in one sentence", WAY-08) — the entry joined several rules before the change too, and a split needs new identifiers, which the plan does not give. The content agrees with D-190 and the task (To do 3, questions 3, 5): checked clause by clause, including the stop of the clock when a completion or a return fills the stock ("unless the stock is then full", "while the stock is then not full"). Minor (WAY-364); the executor named it too.

##### fix of slice 1 (`reports/review-s01-fix-report.md`)

- Place: D-428 *Verification*, `foundations/decisions.md:11697-11699`.
- `.the-way/elements/decisions/skill/SKILL.md`, step 3: "*Verification*, where a test of a later slice of the same change will hold a sentence of this decision: carry a pair of examples for that part for now … the pair holds it until the test stands." Slice 10 is to write the tests of the switch and of the campaign player; until then nothing — no invariant, no test, no pair — holds the new paragraph. The foundation check does not report it because D-428's first paragraph is held by existing `decision:` lines. Minor (WAY-364): form of the entry; no code yet disagrees. Slice 10 should add the `decision:` lines and the `tests:` clause for the paragraph; a pair now would close the gap until then.

##### slice 2 (`reports/review-s02-report.md`)

1. `tests/sim/saved-game.test.mjs:2332` — the new case carries `// invariant: solved-map-manual-run`, while that invariant now says only that such a run "adds no practice to any character skill" (`foundations/invariants.md:1060`) and the case checks nothing of practice; it checks the load's rule for the deposit. The invariant's method is `test`, its check the cases that cite it, so a reader who follows the citation finds a case that would stay green were the practice rule broken. The plan asked for the invariant as the reason of the change (the clause "leaves the chest as it was" was removed from it by Slice 1), which explains the citation, and the case beside it at `saved-game.test.mjs:924` cites the same invariant for the mark alone, so this follows the file's habit. It costs nothing today; were it fixed, the reason could stand in the comment and the invariant line move to a case that holds it, or `trip-run-end`, whose dropped exception this case does check, be named too. Polish.

##### slices 3-4 (`reports/review-s34-report.md`)

**m-1 (slice 3). The cases of the from-nowhere functions now quote the new sentence of D-189, which they do not hold, and two of their names and a comment still state the old rule.**
`tests/sim/trip.test.mjs:623` ("takeFromNowhere clips ..."), `:649` ("clippedTake lists ..."), `:823` ("sendTake at a solved map takes the take list from nowhere ..."), `:834` ("sendTake at a solved map is not cut by any chest's stock ...") and `:845` ("the backpack of a solved map's run is the entries sendTake gives from nowhere") each carry `decision: D-189 "A manual map run of a map already solved takes its equipment from the chest ..."` while asserting a take from nowhere; the block comment at `:785-787` says "an unsolved map takes from the chest, a solved one from nowhere", and the name at `:845` says the backpack of a solved map's run is taken from nowhere, which is false after this slice. The plan keeps these functions and their cases until slice 16, and the quote change follows the plan's wording mechanically, so the cost is limited to that interval; Minor because the cases test functions that still exist, but the `decision:` lines are a traceability claim that is untrue. Recommended: drop the D-189 line from these five cases (or cite no decision) and rename the case at `:845` and fix the comment at `:785-787`, or let the slice that removes the functions remove the cases with them; for the orchestrator to place.

**m-2 (slice 3). `tripLoot` keeps `solvedMapRun` in its `Pick` type (`src/browser/sim/trip.ts:115`) and no longer reads it.** `src/browser/sim/loop.ts:337` and `balance/engine.mjs:193` pass it in literals. Harmless; the comment now says the mark "does not change the list". Executor's concern 3; a later cleanup.

**m-3 (slice 3). `tests/sim/trip.test.mjs:586` cites `invariant: solved-map-manual-run`, whose sentence is about practice only ("adds no practice to any character skill"), for a case that checks only the take from the chest.** `trip-transfer` is the invariant that case holds. Pre-existing citation, left as it was by the rewrite.

**m-4 (slice 3). The comment of `takeFromNowhere` (`src/browser/sim/trip.ts:94-96`) speaks of the plan, "until the slice that removes it".** Product code describing the process that will change it; it goes stale the moment the plan changes. Say what holds: no start of a map run calls it.

**m-5 (slice 4). The table is made by rendering the map check's table and cutting its last three columns from the text** (`balance/progression.mjs:41` `LOOP_COLUMN_COUNT = 3`, `withoutLoopColumns` at `:320-329`). The count 3 is knowledge of `headerOf` in `balance/check-map.mjs:79-91` held a second time, and the cut parses Markdown by `" | "`. A new column of the map check, or a loop column moved, makes this table wrong silently except for the test's exact six names (`tests/balance/progression.test.mjs:271-279`, which does guard it). Minor: guarded, and `check-map.mjs` is outside the slice's *Change* (executor's concern 2). Exporting the cell helpers, or giving `renderTable` the columns to print, is the follow-up.

**m-6 (slice 4). `neededBranches` counts only branches whose effect opens an action** (`balance/progression.mjs:47-59`); a program that needs a branch of another kind, as `wastelandCleanFlame` (P22) needs "Czysty płomień" (`cleanFlame`, `src/browser/sim/data/skills.ts:133-139`), is measured without it. The skill says so ("read such a row as measured without it"). I checked that it changes nothing in this measurement: with the practice Las — głębiej is measured with (flame spell 10), `buyBranch` cannot buy `cleanFlame` (cost 3 points; my script: `cleanFlameBought: false`), and P22 with the rank given outright solves 0 % of seeds 1-60 on Las — głębiej. Executor's concern 3; Minor.

**m-7 (slice 4). The stocking runs make the state more generous than the game in two ways the table's sentence does not say.** In `stockOnMap` (`balance/progression.mjs:99-124`) a death in a stocking run is left unsettled, so it costs no use of the resurrection and no practice; and the stocking character buys the ranks of the stocking program (`skillsFor(candidate.program, practice)`, `:100`) from the same points the measured program's ranks are bought from (`:206`), so points are spent twice. Neither matters for the measured numbers (no best program needs a branch; the stocking program P23 solves 97.4 % of Skraj lasu, and all runs of my reproduction were solved), and the first is in the skill ("its death is not settled"). The second is not written anywhere; one sentence in the skill would do.

##### fix of slice 3 (`reports/review-s34-fix-report.md`)

- **m-1 remainder.** The no-chest cases at `tests/sim/trip.test.mjs:623`, `:649`, `:824`, `:835` and `:846` still carry `decision: D-189 "A manual map run of a map already solved takes its equipment from the chest …"`, a sentence they do not hold, since they test the cut without a chest. The foundation check accepts the quotation because it stands in D-189. Only the traceability claim is wrong, and these cases are expected to go with the functions they test. This blocks nothing (WAY-162).

##### slices 5-6 (`reports/review-s56-report.md`)

**M-1. A settling function now throws a RangeError for some safe-integer moments, and its comment
says only "no safe integer"** — slice 6. `src/browser/sim/game.ts:85-91` (`momentAfter`) makes
`teamAfterDeath`, and through it `settleDeath`, throw where `nowMs + renewal` is no safe integer
(tested at `tests/sim/team.test.mjs:549-571`). The doc comments of `settleDeath`
(`game.ts:670-679`: "otherwise a `nowMs` that is no safe integer is a RangeError") and of
`teamAfterDeath` ("`nowMs` is taken as a safe integer; the caller checks it") no longer state the
whole condition; `resurrectionAt`/`resurrectionReady` can in principle throw too (`usesAt` calls
`momentAfter`), though only at clock readings near 2^53 ms. The guard itself agrees with D-386's
rationale ("a number the load would refuse must never reach a document"), so executor concern 2 is
allowed; only the comments lag. I checked that no admitted crafted save makes the view's reading
throw at real clocks: probe lines "view reading does not throw" for a moment at
`±Number.MAX_SAFE_INTEGER` and negative, read at today's moment and in 2100.

**M-2. Wrong comment at the load of `usesLeft`** — slice 6. `src/browser/sim/saved-game.ts:836-837`:
"A death spends one use of a stock that holds at most the data's count, so at most one is left
after it." At most the count minus one is left, not one; a reader fixing I-1 may read the bound
wrongly from it.

**M-3. The stored stock is not canonical; one stock has several stored forms** — slice 6 (executor
concern 3, judged allowed). `Team` keeps the uses as the last settling left them
(`types.ts:425-432` says so), so `{spent 1, next in the past}` and `{spent 0, next null}` are the
same stock. Observable behaviour goes only through `usesAt`, and I found it right (probe, 0 bad of
60). Consequence worth knowing for slices 7–9: a test that compares whole team objects across two
paths (catch-up against the open game, `catch-up-state`) compares representations, not stocks; the
two paths call the same functions at the same moments, so they agree today. Evidence of
equivalence: I mutated `settleCompletion` to subtract from the stored count and keep the stored
moment instead of the normalized ones; `tests/sim/team.test.mjs` stayed green (21/21), and the
probe showed the stored fields differ (`[2, T]` against `[1, T+R]`) while every reading at or after
the settling moment gives the same stock (`review-s56-probe-mutant.txt`, lines 13-14). Not a test
gap: the difference is not observable through the game's readings at or after the settling.

**M-4. The executor's judgment that no output a user sees changes in slice 6 is not accurate** —
slice 6 report, section "Walkthrough". With the data at 240 minutes and 3 uses, the end-of-run line
of `src/browser/view/end-window-lines.ts:98` now reads „po 4 godzinach”, and the line at a
character (`team-lines.ts:77`) stays „Wskrzeszenie drużyny gotowe” after a first and second death
instead of the countdown in `danger`. The report names the first; the plan accepts both until
slices 12–14, so no code fix is asked here; the branch must not reach a request before those slices.

**M-5 (out of scope of slices 5–6). D-386 still names "the moment the account's resurrection is
ready" and its Verification "the team's moment of readiness … stored as given when a death or a
first completion is settled".** `foundations/decisions.md:4233` and `:4238`. The game state now
holds the moment the next use returns, nullable, and a first completion no longer stores its own
moment. The rule of the decision (a safe integer of any sign, no clock compared) holds in the code
(`saved-game.ts:514-515`); only the words lag. D-386 is not in the plan's table of foundation
entries, so no slice owns it; for the orchestrator to place.

##### fix of slice 6 (`reports/review-s56-fix-report.md`)

**M-F1. The new test's comment points to the task document.** `tests/sim/team.test.mjs:657-658`:
"// Task question 15: a lowering of the count refuses only a save with more spent than the new
count, …". `guidelines/testing.md` ("Where the expected value comes from"): „Komentarz testu nie
wskazuje dokumentu spoza fundamentu”, and a requirement a test needs that the foundation does not
yet carry goes to the foundation first. The bound "at most the data's count" for a settlement
stands in the guideline (`coding-saved-game.md:119-120`) and in the frozen task, not in a
foundation entry (D-190, D-386 do not name it). It blocks nothing; the comment could name the
guideline's rule, or the bound could reach the foundation with the residual the orchestrator
records.

No Critical or Important finding in the fix diff: the change is the one comparison, its comment,
the guideline word and the tests; the team's own bound (`spent > count`, `saved-game.ts:509`) and
the moment's consistency check are untouched and still refuse (probe lines 21-42).

##### slice 7 (`reports/review-s07-report.md`)

**M1. `tests/sim/saved-game.test.mjs:3269-3273` — the marked completion's expectation pins today's eating to 2 berries instead of holding D-189's relation.**

```
  // D-189: a marked run brings its loot out to the chest as any run does, its bring list clipped to
  // what the character still carries; only its practice is not paid. Of the three berries taken from
  // the chest, the character carries two at the completion.
  assert.equal(doneMarked.run.character.backpack.berry, 2);
  assert.deepEqual(doneMarked.run.deposited, [{ item: "berry", count: 2 }]);
```

The change of the old expectation `[]` has its reason in the foundation (D-189 now: "A manual map run of a map already solved takes its equipment from the chest and brings its loot out to it as every other map run does (D-179)"), so it is no hidden fix (`guidelines/testing.md`, "Changing an existing test"). The value 2 itself is the program's output of one play (the executor's concern 3): if the eating of the four game minutes changes, the precondition fails though the rule under test holds. D-189 gives an independent expectation that this test already has at hand: the unmarked completion `done` is the same play with the mark the only difference, so `assert.deepEqual(doneMarked.run.deposited, done.run.deposited)` holds the rule "as every other map run does" without a number from today's run. I added that assertion in my working copy and the file passed (run M0 below), so the marked deposit does equal the unmarked one today. Minor: the assertion is right now and fails loudly, not silently, when the play changes.

**M2 (out of scope for this slice; within the task). D-386 still names the old moment.** `foundations/decisions.md:4233`: "A moment of real time that the game state stores, the save time and the moment the account's resurrection is ready, is a safe integer of milliseconds of any sign …", and its *Verification* "a save time and the team's moment of readiness at zero or below zero loading". The state no longer holds a moment of readiness; it holds the moment the next use returns (`types.ts:425-438`). The test at `tests/sim/saved-game.test.mjs:1021-1029` and the comment at `:2747-2748` apply D-386 to "the team's moment of the next return", which is the reasonable reading, and the quotation is word for word as D-386 stands, so the slice does what its goal asks ("quotes it as it stands now"). D-386 is not in the plan's table of foundation entries, so no slice rewrites it. Named for the review of the whole change; no change is asked of this slice.

##### slices 8-10 (`reports/review-s810-report.md`)

**M-1 — the comment of `withNoReturn` says what the game does not do** — `tests/balance/check-map.test.mjs:23-36` and `tests/balance/cli.test.mjs:57-70`: "a renewal of one use longer than any run, so no spent use returns in it". With the renewal frozen at load (I-2), a use that a death of the full-start loop spends returns after the built 240 minutes inside the run; only the spent start sees no return. The preconditions still hold (the spent start has no use, the full start has three), and they hold after I-2 is fixed too, when the comment becomes true. Fixed with I-2, or the comment narrowed to the spent start.

**M-2 — `oneLeft` is described as "the clock stopped"** — `tests/sim/catch-up.test.mjs:52-55`: the fixture sets 2 uses spent and the next return at minute 10 000 after the save, a running clock, and a state no play reaches (a next return later than the save time plus one renewal). The old `notReadyUntil(S + 10_000 * MIN)` did the same, so the fixture is acceptable (the executor's concern 1): it isolates "one use left for two deaths" from a return inside the span. Only the word "stopped" is wrong.

**M-3 — the save-and-load case of `death.test.mjs` loads a state no game function made** — `tests/sim/death.test.mjs:246-271` quotes D-386 "The load of a saved game state admits every game state the game's own functions make", but saves `usedUp(team(), ...)`, three uses spent by hand; the base case saved the state a settled death left. Three settled deaths (100, 200 minutes apart) reach the same stock through the game's functions, as my probe of the rules shows. The return after the load is tested well; the quoted sentence is held more weakly.

**M-4 — the catch-up no longer checks the clock started anew after the stock filled** — `tests/sim/catch-up.test.mjs:416-428` lost its second death (the executor's concern 2: the removal is justified, the second death is now covered). The relation case at `:491-500` checks the generation and the run number at minute 600, but neither case checks the uses and the clock after the second death at minute 486 (the stock full at 483 and the clock stopped, then one use spent and the clock started at 486 + 240). `tests/sim/team.test.mjs` holds the rule at the level of one death; an assertion in the catch-up would hold it where the earning loop settles it.

**M-5 — wrapping** — `balance/check-map.mjs:4` is a 140-character comment line in a header wrapped at about 100, and `.claude/skills/loop2-balance/SKILL.md:99` (and its copy) is a line longer than the wrapping of its paragraph. No check reads either.

**M-6 — leftover names of the one resurrection in test code** — `tests/sim/loop.test.mjs:1401-1420` keeps the loop variable `readyAt` for the moment of the next return; `tests/sim/death.test.mjs:95` and `:103` keep "ready"/"readiness" in the titles of two `resurrection-renewal` cases. The plan accepts "ready" as "with a use left" for the player descriptions; in these titles it reads well enough.

##### fix of slices 8-10 (`reports/review-s810-fix-report.md`)

**M-1 — the minute length stands in two instrument files** — `balance/campaign.mjs:361` writes `BALANCE.loopMinuteRealSeconds * MS_PER_SECOND`, the same thing `balance/loop.mjs:28` names `MS_PER_LOOP_MINUTE` (not exported), which `guidelines/coding-balance-instrument.md` ("Jedno miejsce wspólnej rzeczy") asks to keep in one place. Fixing N-1 by importing it from `balance/loop.mjs` settles both.

**M-2 — no case counts completions alongside covered deaths** — both new cases of `tests/balance/campaign.test.mjs` have 0 completions, so the new count of completions (the loop's `completed` counter of the last state with the loop alive) is held only by my comparison probe and the existing relations of the campaign tests, not by a case with completions and covered deaths in one return.

**M-3 — the fix edits a file another slice owns** — `tests/view/account-screen.test.mjs:1897-1899` (the versions) is part of Slice 18's Goal ("the version of the saved shape is 8", `plan.md:618`). The edit is right and makes 130 of 133 cases pass; Slice 18's executor should know it is done.

## Findings outside the task's scope

none — the reviewers marked none outside the task's scope; the old uses of "resurrection is ready" they marked outside a slice bear on the task and stand with the return step (item 2).

## Course of the cycle

- **Task and sources:** the task writes the rules by which a manual run of a solved map takes from and brings out to the chest and the resurrection has uses with a renewal per use, measures three maps and writes the foundation entries; plan item of the plan of the second project, after task 23 (merged in `fec2ae7e`). The task document read differs from the one the plan's log records as accepted (the document is untracked in the notes; read as the day advisor's refresh after the merge of task 23; question row 1).
- **Process pin:** `19e5774aed6d1d628042e23deccc110ed9f112c0`, not moved.
- **Spec:** none — no open design choice; the task's two questions carried to the cycle were answered by the authors of slices 1 and 4.
- **Route:** planned slices; reviewers on the strongest class (`model: opus`) as the requester asked; reviews of slices without a risk mark grouped (3–4, 5–6, 8–10, foundation slice alone).
- **Plan:** 18 slices (`plan.md`); slice 18 too large by the size script (about 227 700 tokens; its one file counts whole), accepted unsplit with the middle class (question row 4); 1–10 made, 11–18 not.
- **Choices:** 12 rows of the questions table (`cycle.md`).
- **Blocking findings left:** 1. **N-1** — `balance/campaign.mjs`, `passAway` (the line that sets the step, near line 361, and the loop of steps after it), against `src/browser/sim/loop.ts` near line 417, where the game's catch-up reads `BALANCE.loopMinuteRealSeconds` once at load: the campaign reads the minute fresh at each step, so an overlay that shortens it makes steps shrink until a catch-up passes no time and the loop never ends (30 s minute: no result in 30 s; 60 s and 90 s finish). It comes from the fix `3a00e73a` of finding I-1 of the review of slices 8–10, which counts the uses a campaign return spends one by one, stepping up to each end of a map run with the game's own functions; its logs equal the old code's on 30 campaigns. Suggested fixes: take the step from the instrument's loop file (way a) or stop when the catch-up's clock does not move (b); making `loop.ts` read the minute at use (c) is outside the plan's slices. Contradiction with the settlements: no. Report: `reports/review-s810-fix-report.md`.
- **Record:** https://github.com/mariusznazar/loop2/blob/pending-record-sha/docs/task-cycles/zapas-i-wskrzeszenie/cycle.md
