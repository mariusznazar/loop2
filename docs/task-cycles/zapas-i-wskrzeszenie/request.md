**State: ready** — corrected for your answers; every stage has run and every review passed; two small questions below wait for you, and nothing blocks the merge

## What you will see

This is the whole change, now finished: the rules, the words on the screens, the measurement of three maps, and a walk through the running game that I made as you asked.

- **A manual run of a map you have already solved** takes its supplies from the chest and brings what it gathers back into the chest, like every other run; it still pays no practice. A "Restart" does the same. On the card of a solved map "Wejdzie: …" now counts what enters from the chest, and the warning under "Wejdź" that the earning loop would not get the supplies is gone. The screen of such a run says: "Mapa jest już rozwiązana: to przejście nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne."

![Card of the solved map Skraj lasu: line of the resurrection with uses 3 of 3, „Wejdzie: patyk 3, jagoda 2” and no warning under „Wejdź”](https://github.com/mariusznazar/screenshots/blob/5e0dee8a904c5e83627e254ecc72113506d8fc91/loop2/zapas-i-wskrzeszenie-correction-1/01-card-solved-map.png?raw=true)
![Screen of a run on a solved map with the line „Mapa jest już rozwiązana: to przejście nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.”](https://github.com/mariusznazar/screenshots/blob/5e0dee8a904c5e83627e254ecc72113506d8fc91/loop2/zapas-i-wskrzeszenie-correction-1/08-run-screen-solved-line.png?raw=true)

- **The resurrection has three uses.** A death of a character with practice spends one while any is left; used ones come back one at a time, one every four hours of real time (both numbers stand in the game's data), and the first solving of a map the account has not solved before gives one back at once while the stock is not full. A new game starts with all three. The line at each character reads "użycia 3 z 3", "użycia 1 z 3, następne za 3 godz. 10 min czasu realnego" and, at zero, in red, "użycia 0 z 3 … śmierć zabierze wprawę i wykupione stopnie"; the end-of-run window tells which of these happened.

![Card of the solved map with the line „użycia 1 z 3, następne za 3 godz. 10 min czasu realnego”](https://github.com/mariusznazar/screenshots/blob/5e0dee8a904c5e83627e254ecc72113506d8fc91/loop2/zapas-i-wskrzeszenie-correction-1/02-resurrection-line-part.png?raw=true)
![Card of the solved map with the line „użycia 0 z 3 … śmierć zabierze wprawę i wykupione stopnie” in red](https://github.com/mariusznazar/screenshots/blob/5e0dee8a904c5e83627e254ecc72113506d8fc91/loop2/zapas-i-wskrzeszenie-correction-1/04-resurrection-line-zero.png?raw=true)
![End-of-run window after a death covered by a use: „Zużyte jedno użycie wskrzeszenia drużyny … zostały użycia 2 z 3 …”](https://github.com/mariusznazar/screenshots/blob/5e0dee8a904c5e83627e254ecc72113506d8fc91/loop2/zapas-i-wskrzeszenie-correction-1/03-end-window-death-use-spent.png?raw=true)
![End-of-run window after a death with no use of the resurrection left: the character lost the practice, generation 2](https://github.com/mariusznazar/screenshots/blob/5e0dee8a904c5e83627e254ecc72113506d8fc91/loop2/zapas-i-wskrzeszenie-correction-1/06-end-window-death-no-use.png?raw=true)
![End-of-run window after the completion of a solved map: „Do skrzynki: patyk 3, jagoda 2.” and no line of a returned use](https://github.com/mariusznazar/screenshots/blob/5e0dee8a904c5e83627e254ecc72113506d8fc91/loop2/zapas-i-wskrzeszenie-correction-1/07-end-window-solved-completion.png?raw=true)

- **Saved games.** The saved game has a new shape; saves of the old shape are refused as damaged, as the project accepted for every change of the state's shape. As you decided, lowering the number of uses later refuses only a saved game that has more used uses than the new number — also one that stands at an open end-of-run window after the first death. To keep that true, a save now stores the uses as they stand at the moment of the save, so uses that already came back by the clock are no longer stored as spent.
- **The balance instrument** counts the uses with the game's own functions, takes its step through an absence from the one place where it keeps the loop minute (the finding that could hang it, which you asked to fix that way, is gone), and has a new command that measures the three maps from what the maps before each of them gave. The best reference program of each map solves it on this share of 500 seeds: Skraj lasu 97.4%, Las 99.4%, Las — głębiej 92.4% — all far above the 20% line the task set, with no manual run needed on Skraj lasu and 3 on each later map for the supply. The table is in the technical part below.
- **The walk through the running game** (one scripted state, deaths and completions played in a browser): ten cases, all passed, no fault found — the card, the supplies out of and back into the chest, "Restart" and "Zakończ", the line at the character, the end-of-run window after a death covered by a use, after a death with no use left, after the death of a character with no practice, after a completion and after a first solving that returned a use. The screenshots above lie in the public screenshots repository and nothing of them is in this repository.

### Underneath

The game's state holds how many uses are spent and the moment the next one returns, the foundation has a new decision that the progression never requires the player's absence, and the foundation entries about the screens, the saved shape and the resurrection say what the code does.

## For you to decide

### Needed from you

none

### Fix or let through

1. **A player may read two lines on the screen of a solved-map run as contradicting each other.** Under "to przejście nie płaci wprawy" the screen still shows "Wprawa w tym przejściu: Eksploracja +1", the practice that the run gathers and keeps with itself. That is how the game decided it before this task, and this task changed only the sentence above it, so the reviewers marked it outside the task. A player who reads both lines will wonder whether the run pays or not, on every manual run of a solved map. Ways: change it in this request (a decision about what the practice line of such a run shows, one more fix and review, undoing it later costs one more change); make a task of it (a later session decides what the line should say, nothing changes today); let it through (the two lines stay). I recommend making a task, since it is a question about the older rule of the run's practice, not about this task. Its weak point: until then the contradiction stays on every such run. Make a task of it, or let it through? (Findings outside the task's scope, 1)
2. **A save at an open end-of-run window after the second death, made hours later, is refused if the number of uses is lowered to one.** After a first death the window loads at any lowered number; after a second death the record says two spent, which is more than one, so a lowering to one refuses that save as damaged and the player starts anew, once, on the day of such a retune. Your remark named the window after the first death, and the rule as you wrote it ("more used than the new number") refuses this one, so the code does. Ways: let it through (the rule as written); make a task of it (a later session decides whether a record of a past death should count at all). I recommend letting it through, since retuning to one use is unlikely and the loss is one save. Its weak point: nobody will remember this on the day of the retune. Make a task of it, or let it through? (Minor findings, return-step review)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

3. **Foundation entries you did not see at the task.** The decision on how a saved game holds the uses of the resurrection now has a second paragraph with your rule (a lowered number refuses only a save with more spent uses, an open end-of-run window included; a save stores the uses as they stand at the moment of the save) and its reasons; the first paragraph says the stored moment is the moment the next spent use returns. Several older entries had their words corrected where "ready" or "pay nothing" no longer matched (a decision's wording about warnings beside the buttons, one heading, one glossary entry, the checks of four decisions). The new decision about the player's absence is verified by an agent's comparison with a pair of examples, not by a test, because a test would run the measurement over seeds, which the task keeps out of the gate. The decision on how the instrument counts the resurrection got a binding paragraph for the loop, the "no resurrection" switch and the waiting player. The decision about what a death takes gained the arithmetic of the numbers as a calculation to correct when the first walls are measured, and its rejected ways were completed.
4. **Choices of the cycle.** The measurement builds its state by a sweep from a given state, not by extending the campaign (the other way would run an earning loop through the whole measurement). The settlement of a death stores the uses spent after it, not the uses left (you chose the rule, the cycle the way; the window's uses left is computed when it is drawn, so it describes the moment of the death for as long as the number in the data stays the same). A save stores the uses as they stand at the save moment (the other ways were to reckon them at the load, which would repair a state, or to weaken the entry's wording, which needed you). The descriptions of two campaign players of the instrument were reworded, which the plan had left as they were, because they said the next map is tried "while the resurrection is ready".
5. **Changed invariant sentences and tests that hold decisions.** Four invariants were reworded: a manual run of a solved map only adds no practice; the transfer and the end-of-run deposit have no exception for it; the resurrection's renewal speaks of uses, one clock and the one use a first solving returns. The full check of the foundation, run on the finished change, reports no error and lists none of them as a sentence whose test was left as it was. The tests that quote decisions by their lines were rewritten to quote the new sentences, in the simulation, the screens, the instrument and the saved game.
6. **What started this correction.** It answered your answers to items 1, 3 and 4 of the earlier description: the cycle judged that the task or the foundation required what items 1 (the finding that could hang the measuring tool and the stages that had not run) and 3 (the rule that a lowered number of uses refuses only a save with more spent uses) changed, and that the walk through the running game of item 4 was not required by them.

## Cost

Five hours and thirty-six minutes of working time in all, 1 hour 15 of them waiting for tools; 33 agents; about 540 million tokens counted with cached reads (162 million by the strongest class, 234 million by the middle class, 144 million by the cheapest class), 2.2 million written. Nine rounds of review and fix (the rules in the foundation, slices 3–4, slices 5–6, slice 7, slices 8–10, slices 11–14, the Minor findings of the whole change, the return step, and the correction's own fix); five reviews of a fix passed at once or after one fix; the review of the fix of slices 8–10 failed once and its finding was fixed in the correction. The [table of stages](https://github.com/mariusznazar/loop2/blob/pending-record-sha/docs/task-cycles/zapas-i-wskrzeszenie/stages.md) is in the committed record.

## How to merge

Use the merge that keeps the commits, because the link to the record survives only that way. Nothing in this request waits for a review of the foundation.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — poprawione według Twoich odpowiedzi; wszystkie etapy ruszyły i każdy przegląd przeszedł; dwa małe pytania czekają na Ciebie i nic nie blokuje scalenia

## Co zobaczysz

To cała zmiana, już skończona: zasady, słowa na ekranach, pomiar trzech map i przejście przez działającą grę, które zrobiłem, jak prosiłeś.

- **Ręczne przejście mapy, którą już rozwiązałeś**, bierze zapas ze skrzynki i wynosi do niej to, co zbierze, jak każde inne przejście; wciąż nie płaci wprawy. „Restart” robi to samo. Na karcie mapy rozwiązanej „Wejdzie: …” liczy teraz to, co wchodzi ze skrzynki, a ostrzeżenie pod „Wejdź”, że pętla zarobkowa nie dostanie zapasu, znikło. Ekran takiego przejścia mówi: „Mapa jest już rozwiązana: to przejście nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.”
- **Wskrzeszenie ma trzy użycia.** Śmierć postaci z wprawą zużywa jedno, póki jakieś zostało; zużyte wracają po jednym, jedno co cztery godziny czasu realnego (obie liczby stoją w danych gry), a pierwsze rozwiązanie mapy, której konto jeszcze nie rozwiązało, oddaje jedno od razu, póki zapas nie jest pełny. Nowa gra zaczyna ze wszystkimi trzema. Wiersz przy każdej postaci mówi „użycia 3 z 3”, „użycia 1 z 3, następne za 3 godz. 10 min czasu realnego”, a przy zerze, na czerwono, „użycia 0 z 3 … śmierć zabierze wprawę i wykupione stopnie”; okno końca przejścia mówi, co się stało. (Zrzuty ekranu są wyżej, w części angielskiej.)
- **Zapisy gry.** Zapis ma nowy kształt; zapisy starego kształtu są odrzucane jako uszkodzone, co projekt przyjął przy każdej zmianie kształtu stanu. Jak zdecydowałeś, obniżenie liczby użyć odrzuca później tylko zapis, w którym zużytych jest więcej niż nowa liczba — także ten z otwartym oknem końca przejścia po pierwszej śmierci. Żeby to było prawdą, zapis trzyma teraz użycia takie, jakie są w chwili zapisu, więc użycia, które wróciły już zegarem, nie są zapisane jako zużyte.
- **Przyrząd balansu** liczy użycia funkcjami gry, bierze krok przez nieobecność z jedynego miejsca, w którym trzyma minutę pętli (uwaga, która mogła go zawiesić, a którą kazałeś naprawić tym sposobem, zniknęła), i ma nowe polecenie, które mierzy trzy mapy tym, co dały mapy przed każdą z nich. Najlepszy program wzorcowy każdej mapy rozwiązuje ją na takim udziale z 500 ziaren: Skraj lasu 97,4%, Las 99,4%, Las — głębiej 92,4% — wszystko daleko ponad 20%, czyli progiem z zadania; zapas nie wymaga ręcznego przejścia na Skraju lasu, a na każdej późniejszej mapie wymaga 3. Tabela jest w części technicznej niżej.
- **Przejście przez działającą grę** (jeden oskryptowany stan, śmierci i domknięcia rozegrane w przeglądarce): dziesięć przypadków, wszystkie przeszły, bez usterek — karta, zapas wychodzący ze skrzynki i wracający do niej, „Restart” i „Zakończ”, wiersz przy postaci, okno końca po śmierci pokrytej użyciem, po śmierci bez użycia, po śmierci postaci bez wprawy, po domknięciu i po pierwszym rozwiązaniu, które przywróciło użycie. Zrzuty ekranu leżą w publicznym repozytorium zrzutów, a w tym repozytorium nie ma po nich nic.

### Pod spodem

Stan gry trzyma liczbę zużytych użyć i chwilę powrotu następnego, fundament ma nową decyzję, że postęp nigdy nie wymaga nieobecności gracza, a wpisy fundamentu o ekranach, kształcie zapisu i wskrzeszeniu mówią to, co robi kod.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

none

### Naprawić albo przepuścić

1. **Gracz może odczytać dwa wiersze na ekranie przejścia mapy rozwiązanej jako sprzeczne.** Pod „to przejście nie płaci wprawy” ekran wciąż pokazuje „Wprawa w tym przejściu: Eksploracja +1”, czyli wprawę, którą przejście zbiera i zachowuje przy sobie. Tak grę zdecydowano przed tym zadaniem, a to zadanie zmieniło tylko zdanie nad nią, więc recenzenci uznali to za poza zadaniem. Gracz, który przeczyta oba wiersze, zastanowi się, czy przejście płaci, czy nie, przy każdym ręcznym przejściu mapy rozwiązanej. Drogi: zmienić to w tej prośbie (decyzja o tym, co pokazuje wiersz wprawy takiego przejścia, jedna poprawka i przegląd więcej, cofnięcie później kosztuje jeszcze jedną zmianę); założyć zadanie (późniejsza sesja rozstrzyga, co wiersz ma mówić, dziś nic się nie zmienia); przepuścić (oba wiersze zostają). Rekomenduję założyć zadanie, bo to pytanie o starszą regułę wprawy takiego przejścia, nie o to zadanie. Słaby punkt: do tego czasu sprzeczność zostaje przy każdym takim przejściu. Założyć zadanie, czy przepuścić? (Findings outside the task's scope, 1)
2. **Zapis przy otwartym oknie końca po drugiej śmierci, zrobiony po kilku godzinach, jest odrzucany, jeśli liczbę użyć obniży się do jednego.** Po pierwszej śmierci okno wczytuje się przy każdej obniżonej liczbie; po drugiej rekord mówi dwa zużyte, czyli więcej niż jeden, więc obniżenie do jednego odrzuca taki zapis jako uszkodzony, a gracz zaczyna od nowa, raz, w dniu takiego strojenia. Twoja uwaga nazwała okno po pierwszej śmierci, a reguła tak, jak ją napisałeś („zużytych więcej niż nowa liczba”), odrzuca ten zapis, więc kod też. Drogi: przepuścić (reguła tak, jak napisana); założyć zadanie (późniejsza sesja rozstrzyga, czy rekord dawnej śmierci ma w ogóle się liczyć). Rekomenduję przepuścić, bo strojenie do jednego użycia jest mało prawdopodobne, a strata to jeden zapis. Słaby punkt: nikt nie będzie pamiętał tej notatki w dniu strojenia. Założyć zadanie, czy przepuścić? (Minor findings, return-step review)

### Akceptujesz przez scalenie

Scalenie przyjmuje te punkty; jeśli któryś Ci nie odpowiada, powiedz który.

3. **Wpisy fundamentu, których nie widziałeś przy zadaniu.** Decyzja o tym, jak zapis gry trzyma użycia wskrzeszenia, ma teraz drugi akapit z Twoją regułą (obniżona liczba odrzuca tylko zapis z większą liczbą zużytych, okno końca przejścia włącznie; zapis trzyma użycia takie, jakie są w chwili zapisu) i jej uzasadnienie; pierwszy akapit mówi, że zapisana chwila to chwila powrotu następnego zużytego użycia. Kilka starszych wpisów dostało poprawione słowa tam, gdzie „gotowe” albo „nic nie płaci” już nie pasowało (słowa decyzji o ostrzeżeniach przy przyciskach, jeden nagłówek, jedno hasło słownika, sprawdzenia czterech decyzji). Nowa decyzja o nieobecności gracza jest sprawdzana porównaniem przez agenta z parą przykładów, a nie testem, bo test puszczałby pomiar na ziarnach, co zadanie trzyma poza bramką. Decyzja o tym, jak przyrząd liczy wskrzeszenie, dostała wiążący akapit o pętli, przełączniku „bez wskrzeszenia” i czekającym graczu. Decyzja o tym, co zabiera śmierć, dostała rachunek liczb jako obliczenie do poprawy po zmierzeniu pierwszych ścian, a jej odrzucone drogi uzupełniono.
4. **Wybory cyklu.** Pomiar buduje swój stan przemiataniem od zadanego stanu, a nie rozbudową kampanii (druga droga puszczałaby pętlę zarobkową przez cały pomiar). Rozliczenie śmierci trzyma użycia zużyte po niej, a nie pozostałe (Ty wybrałeś regułę, cykl sposób; pozostałe użycia okno liczy przy rysowaniu, więc opisuje chwilę śmierci, dopóki liczba w danych się nie zmieni). Zapis trzyma użycia takie, jakie są w chwili zapisu (inne drogi to liczenie ich przy wczytaniu, co naprawiałoby stan, albo osłabienie brzmienia wpisu, co wymagałoby Ciebie). Opisy dwóch graczy kampanii przyrządu przeformułowano, choć plan zostawiał je bez zmian, bo mówiły, że następną mapę próbuje się „póki wskrzeszenie jest gotowe”.
5. **Zmienione zdania niezmienników i testy trzymające decyzje.** Przeformułowano cztery niezmienniki: ręczne przejście mapy rozwiązanej tylko nie dodaje wprawy; przeniesienie i wniesienie przy domknięciu nie mają dla niego wyjątku; odnowienie wskrzeszenia mówi o użyciach, jednym zegarze i jednym użyciu, które oddaje pierwsze rozwiązanie. Pełna kontrola fundamentu na skończonej zmianie nie zgłasza błędu i nie wymienia żadnego z nich jako zdania, którego test zostawiono bez zmian. Testy cytujące decyzje swoimi liniami przepisano tak, by cytowały nowe zdania — w symulacji, ekranach, przyrządzie i zapisie gry.
6. **Co zaczęło tę korektę.** Odpowiadała na Twoje odpowiedzi do punktów 1, 3 i 4 wcześniejszego opisu: cykl uznał, że zadanie albo fundament wymagały tego, co zmieniły punkty 1 (uwaga, która mogła zawiesić narzędzie pomiarowe, i etapy, które nie ruszyły) i 3 (reguła, że obniżona liczba użyć odrzuca tylko zapis z większą liczbą zużytych), a przejście przez działającą grę z punktu 4 nie było przez nie wymagane.

## Koszt

Pięć godzin i trzydzieści sześć minut pracy w sumie, z czego 1 godzina 15 minut to czekanie na narzędzia; 33 agentów; około 540 milionów tokenów liczonych z odczytami z pamięci podręcznej (162 miliony najmocniejsza klasa, 234 miliony średnia, 144 miliony najtańsza), 2,2 miliona zapisanych. Dziewięć rund przeglądu i poprawki (zasady w fundamencie, slice'y 3–4, 5–6, 7, 8–10, 11–14, drobne uwagi całej zmiany, krok powrotny i własna poprawka korekty); pięć przeglądów poprawki przeszło od razu albo po jednej poprawce; przegląd poprawki slice'ów 8–10 raz nie przeszedł, a jego uwaga została naprawiona w korekcie. [Tabela etapów](https://github.com/mariusznazar/loop2/blob/pending-record-sha/docs/task-cycles/zapas-i-wskrzeszenie/stages.md) jest w zatwierdzonym zapisie.

## Jak scalić

Użyj scalenia, które zachowuje commity, bo link do zapisu przeżywa tylko tak. Nic w tej prośbie nie czeka na przegląd fundamentu.

</details>

## Technical changes

39 commits on top of `46cfec71`, in nine groups; each says what it concerns, then where.

- **Foundation rules (slice 1; `3647bb19`, `f30dffb7`).** D-438 new; D-189, D-179, D-214, D-190, D-220, D-240, D-242, D-428; four invariants; glossary `resurrection` (`foundations/*.md`).
- **Solved-map run, load of its deposit, measurement (slices 2–4; `814cb8b1`, `74652031`, `a007dd9b`, `0fde9df0`).** A run of a solved map takes from and brings out to the chest (`src/browser/sim/game.ts`, `trip.ts`, `types.ts`, `saved-game.ts`); the new mode `progression` of the instrument (`balance/progression.mjs`, `balance/cli.mjs`, both copies of the skill `loop2-balance`, the row in `guidelines/coding-balance-instrument.md`).
- **Uses of the resurrection (slices 5–10; `fc64661c`, `7e3869c2`, `20e6eaab`, `f2707957`, `f2c9c335`, `3c621606`, `b0353afa`, `55a35a33`, `ab0e44ba`).** `resurrectionAt` in `game.ts`; the team's spent count and the moment of the next return, 3 uses and 240 minutes in `data/balance.ts`, saved game version 8 loaded strictly (`saved-game.ts`, `guidelines/coding-saved-game.md`); the catch-up and the earning loops; the instrument counts uses (`balance/loop.mjs`, `campaign.mjs`, `check-map.mjs`).
- **Findings of slices 8–10 and of the correction (`febbcfc9`, `87ae7409`, `3a00e73a`, `fae769a4`, `14f9b8da`).** The game reads the renewal where it is used; the version of the saved game comes from the game's constant in three tests; the campaign counts a return's spent uses one by one with the loop minute from `balance/loop.mjs`; the settlement of a death stores `usesSpent`.
- **Foundation texts of the screens (slice 11; `8d0e49cb`).** D-215, D-216, D-217, D-329 rewritten, D-251 withdrawn.
- **The words on the screens (slices 12–15, 17; `fe59bd56`, `fd5eb418`, `16625f50`, `25223337`, `0f810761`, `0419a56e`).** `src/browser/view/team-lines.ts`, `end-window-lines.ts`, `trip-lines.ts`, `maps-screen.tsx`, `clock.ts` comments, two stylesheets, `guidelines/styleguide-browser-view.md`, and the screens' tests.
- **Removal of taking from nowhere, the page test (slices 16, 18; `114189c5`, `ad90dd33`).** `src/browser/sim/trip.ts`; `tests/view/account-screen.test.mjs`.
- **Minor findings of the whole change (`003f27c0`..`5d20e26e`).** The function renamed `resurrectionHasUse`; the stock of the measurement named in the skill; D-240 and D-190 prose; tests' words (the foundation, the skill, the instrument, tests).
- **Return step and its fix (`3d171140`, `f1205477`, `ad465c76`).** D-386 second paragraph and corrected words; `withSaveTime` stores the uses as reckoned at the save moment (`game.ts`, `types.ts`, `saved-game.ts` comment).

Measurement table for the best program of each map (labels only; seeds 1–500). The full table of 23 programs per map is in `reports/slice-04-executor-report.md` of the committed record; no result file is committed (the instrument's rule):

| Map | Program | Solved (seeds 1-500) | Median game minutes of solved runs | Deaths by cause | Runs at the cap |
| --- | --- | --- | --- | --- | --- |
| Skraj lasu | P23 | 97.4 % | 733 | cold 13 | 0 |
| Las | P10 | 99.4 % | 480 | cold 3 | 0 |
| Las — głębiej | P10 | 92.4 % | 654 | combat 22, cold 16 | 0 |

The sentence under the table, as the command wrote it:

> Each map was measured with the practice and ranks from the first solvings of the maps before it, each by that map's best program, and with the stock its program takes, brought out by manual runs of solved maps (Skraj lasu: no manual run, the stock not gathered in full; Las: 3 manual runs; Las — głębiej: 3 manual runs).

## Checks

- **Final gate:** the CI run on the request's last head (job `tests`, `.github/workflows/tests.yml`): pending
- **The cycle's own gate run, at the first stop (head `3a00e73a`, before slices 11–18):** `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/zapas-i-wskrzeszenie/gate_times.md -- npm.cmd test` — exit 1, 80.6 s: 23 of 2719 Node tests failed, all in the screens' tests that slices 12–18 then changed; the first call with `npm test` exited 2 with `Error: gate_times.py: cannot start 'npm': [WinError 2]` (no test ran; the call was wrong on this Windows machine). It stands as history, not as a result of the final tree.
- **Run apart on the final tree (head `ad465c76`):** `python -B .the-way/elements/common/foundation_check.py` — exit 0, 0 errors; `python -B .the-way/instruction-files/check_instructions.py` — exit 0, 0 errors (warnings not compared with a baseline).
- **Failing on the base:** none, taken from request 165's final gate (record commit `420dffd3`, `docs/task-cycles/szkielet-progresji/cycle.md`; CI `tests` on `25ea0d3e` passed, run `actions/runs/44780012574`); the base `46cfec71` is a merge commit with the tree of that branch's head, so no gate ran on it.
- **Own-work and focused checks:** each executor's report holds them with commands and exit codes; the reviewers ran their own probes (hostile saved documents against the load, hand-made mutations, StrykerJS on the changed ranges of `game.ts` with 85 of 89 mutants killed, a reproduction of the measurement, the old and the new campaign code side by side, 1,050 comparisons of a normalised and a held team state).
- **The walk through the running game and its screenshots:** ten cases, all passed (`reports/walk-report.md`); the screenshots lie in the public repository `mariusznazar/screenshots`, directory `loop2/zapas-i-wskrzeszenie-correction-1/`, commit `5e0dee8a904c5e83627e254ecc72113506d8fc91`, none in this repository or in the record.
- **Working copies left:** none. **Directories of earlier tasks kept:** none.
- **Checks of the description and the record's copy:** written and checked after this commit

## Foundation entries

- `D-438` (new), `projected` (sentence, rationale, rejected word for word), *Relations* `none` and *Verification* (an agent compares a change with the pair below; no test) `the cycle's`: the progression never requires the player's absence. Pair (`the cycle's`): *complies* — a new map whose requirement of practice, items and equipment is met by what the first solutions and the manual runs of the maps before it gave, a measurement of the balance instrument showing it with the best reference program and no earning loop; *violates* — a new map whose requirement is met only by what an earning loop gathers over hours of real time; a requirement of pace counted in days.
- `D-189`, `D-179`, `D-214` (`row 1`): a manual run of a solved map takes from the chest, brings its loot out and pays no practice. `D-190` (`row 2`, `3`, `4`; its *Rejected* completed, `the cycle's`): uses, one clock, a first solving returns one. `D-220` (`row 5`). `D-240`, `D-242` (task's *Decisions in play*; the *Rationale* and *Rejected* of D-240 `the cycle's`): the last use and the clock of returns.
- `D-215` (`row 8`), `D-216` (`row 7`; heading `the cycle's`), `D-217` (`row 6`), `D-329` (task's *Decisions in play*; its binding sentence corrected, `the cycle's`): what the screens say; `D-251` withdrawn, no successor.
- `D-386` (`the cycle's`): first paragraph — the stored moment is the moment the next spent use returns; second paragraph (your remark 3) — the count spent and the moment, the settlement of a death holds the uses spent after it, a save stores the uses not yet returned at the moment of the save, lowering the number refuses only a save with more spent uses than the new number; its *Rationale* and *Rejected*.
- `D-428` (`row 10`): *Verification* says the loop starts with all uses and its `tests:` clause names four cases; a new binding paragraph (`the cycle's`) for the loop, `--no-resurrection` and the waiting campaign player.
- Corrected words (`the cycle's`): `D-04`, `D-194`, `D-219`, `D-241`, glossary `generation number`.
- Invariants `solved-map-manual-run`, `trip-transfer`, `trip-run-end`, `resurrection-renewal` (`row 3`, `4`); glossary `resurrection` (`row 9`).
- Tests that hold a decision's sentence by a `decision:` line and were changed: the simulation tests `trip`, `run-record`, `team`, `death`, `completion`, `flow`, `data`, `catch-up`, `loop`, `saved-game`; the screens' tests `team-lines`, `character-screen`, `headquarters-screen`, `clock`, `end-window-lines`, `end-window`, `end-window-game`, `trip`, `maps-screen`, `world-area`, `account-screen`; the instrument's tests `loop`, `campaign`, `check-map`, `cli`.

## Minor findings

The Minor findings that no fix made, in the reviewers' words. Those of the slice reviews that the review of the whole change listed were fixed in one fix (15 of 17 findings), so what stands here is what that fix and the later reviews left; the full set of the earlier Minor findings is in the record's reports.

##### reports/review-whole-report.md — the findings the fix did not take in (10 second half, 12 in part, 16, 17)

10. `foundations/decisions.md`, D-190 *Rejected* — lacks some ways not chosen of questions 2 and 4 (review-s01 M-1); `foundations/invariants.md`, `resurrection-renewal` — several rules in one sentence (review-s01 M-3).
12. Wrapping: `balance/check-map.mjs:4`, `.claude/skills/loop2-balance/SKILL.md:99` (and its copy), `guidelines/styleguide-browser-view.md:679` (review-s810 M-5, review-s1518 2).
16. `tests/balance/campaign.test.mjs:289-321` runs a process (`spawnSync`) in a file of the unit recipe of `guidelines/testing.md` (correction-1 m-3).
17. `src/browser/sim/saved-game.ts` settlement check (around `:834-841`) — a window whose death spent more uses than the team now stores spent is refused at a count between the two; this follows remark 3 if "zużytych" counts the settlement's spent, not if it counts only the team's (correction-1 m-1). For the orchestrator to put to the human only if the stricter reading was meant.

##### reports/review-whole-fix-report.md — review of the fix of the Minor findings

- **Finding 12, part remains — `.claude/skills/loop2-balance/SKILL.md:101` (and its copy).** The rewrap of the paragraph at the old line 99 moved its long tail one line down: line 101 now runs to 150 characters ("per map run, and the share of map runs that end in death. The label is `P1`, `P2`... : the program's number in the list that `programs` prints, the"), while the paragraph wraps at about 98. No check reads it.
- **Outside the fix diff (note): `tests/view/end-window-lines.test.mjs:209`** — the comment "(D-216, question 16)" points at the task document, the same defect as finding 3 (`guidelines/testing.md`, "Where the expected value comes from"). The executor named it. It stood in the reviewed range and my review of the whole change missed it.

##### reports/review-return-report.md — review of the return step

2. **D-386 has no `derives from D-190`.** `foundations/decisions.md`, D-386 *Relations* (`derives from D-213 · derives from D-221 · derives from D-248`). The new paragraph is about the uses of the resurrection that D-190 sets. Its *Rationale* says it exists "so that the number of uses in the balance data can be tuned", which is D-190's sentence that both numbers are lines of the balance data. By the template ("`derives from` — a higher decision this one serves", "written in the entry that depends on the other"), D-386 now depends on D-190: a change of D-190 that dropped the uses would have to change this paragraph. Without the relation, the search of the foundation (WAY-33) from D-190 does not reach it. D-216 and D-220, which depend on the uses the same way, carry `derives from D-190`. No sentence is misread for lack of it, so the grade is Minor (WAY-364). Recommended: add `derives from D-190`.

3. **D-386 *Rejected* does not keep, with its own reason, the second way remark 3 names.** Remark 3 names two ways for the cycle to choose from: "rekord końca przejścia trzyma zużyte zamiast pozostałych … albo sprawdzenie pozostałych przycięte do nowej liczby". By the template (`.the-way/elements/decisions/template.md:106`), the *Rejected* of a decision marked `the cycle's` holds the ways a statement of the human names. The third item of *Rejected*, "the uses left cut to the new number at the load — it repairs a state", is the way under *Not chosen* of question 15 (the load clips instead of refusing). Its reason does not fit a check that is only clipped while the stored uses left stay as they are. That way repairs nothing; what it costs is a window reading "zostały użycia 2 z 1". Recommended: one item for the clipped check, with that cost. The binding sentences are unaffected.

4. **Stale wording about "readiness" stays in a comment of the product and in three test titles.** The code no longer has a moment of readiness, but these places still use the word:
   - `src/browser/sim/saved-game.ts:1268` ("The save time is a safe integer of any sign, as a moment of readiness is")
   - `tests/sim/death.test.mjs:103` ("a moment of readiness below zero is ready at every moment from zero on")
   - `tests/balance/loop.test.mjs:135` ("a loop that starts with the resurrection ready …")
   - `tests/balance/cli.test.mjs:135` ("… the resurrection ready …")

   They are not foundation entries and they mislead no one about behaviour, but they are the same kind of correction the return step made in `tests/view/end-window-lines.test.mjs`. The comments in `tests/sim/saved-game.test.mjs` and `tests/view/account-screen.test.mjs` that describe the old versions of the document stay true and are not part of this finding.

##### reports/review-return-fix-report.md — review of the return-step fix

1. `src/browser/sim/types.ts:429-433` still says "The state holds the uses as they stood when a death or a first solving last settled". A state loaded from a document holds them as they stood at that save. The sentence added after it says so for the document, but not for the state the load gives. It misleads no one about behaviour; the wording could read "…last settled, or the save it was loaded from".

##### reports/correction-1-review-report.md — review of the correction's fix

**m-1 — a window whose death spent more uses than the team now holds is refused at a count between the two** — `src/browser/sim/saved-game.ts:839-840` checks the settlement's `usesSpent` against the new count on its own. A game can hold an open end-of-run window whose death spent the third use while the team's stored count is lower: an earning loop's death settled later, after uses returned, stores the count `usesAt` gives (for example 2). Lowering the count to 2 then refuses that save, though the team has 2 spent. My probe: such a document (settlement 3, team 2) at count 2 — `shape`. Reading "zużytych" of the remark as the uses spent the save records, the settlement's included, the refusal follows the rule; reading it as the team's current count, it does not. Refusing is also the only answer without a clamp, since the window would say "uses left" of 2 − 3. The case the remark names (a lowering from 3 to 1 with the window after the first death) loads. For the orchestrator to put to the human if the stricter reading was meant.

**m-2 — the plan and the frozen task still speak of the uses left in the settlement** — `plan.md:278`, `:283`, `:323`, `:523`, `:529`, `:621`, `:644` and the task's To do 3 ("rozliczenie śmierci, która zużyła użycie, trzyma liczbę użyć, które po niej zostały") describe the old field; remark 3 authorizes the change. Slice 14 (the window's line) and Slice 18 need their passages read as "the data's count less `usesSpent`", and the return step needs to record the change. One consequence of computing it at display time: after a later change of the count, the window's "Po tej śmierci zostały użycia N z M" is computed against the new count, not the count at the moment of death (question 6: "Liczba użyć mówi o chwili śmierci"); with a raised count from 3 to 5 the first-death window would read 4 of 5 where 2 of 3 were left. The correction report names this cost.

**m-3 — a unit-test file now starts a process** — `tests/balance/campaign.test.mjs:289-321` runs the return in `spawnSync` with a 20-second limit, the only way to stop a synchronous endless loop. `guidelines/testing.md` sets the level by the resources ("unit test ... bez ... procesów"; the integration recipe lists its files by name, `tests/view/memory-limit.test.mjs` among them for the same reason), and this file is not listed there. Polish: list it in the integration recipe, or say why it stays in the unit recipe.

**m-4 — the guideline was edited by hand** — the correction report says `guidelines/coding-saved-game.md` was edited "by hand ... not through the skill `the-way-maintain-coding-guidelines`", which `AGENTS.md` names for that work. The edited sentence is right (above); the process departure is for the record.

## Findings outside the task's scope

- On the screen of a manual run of a solved map, „Wprawa w tym przejściu: Eksploracja +1” stands under „Mapa jest już rozwiązana: to przejście nie płaci wprawy; …” (walk report, side observation). That is D-194 and D-201 as they stood before this task (a run of a solved map keeps its practice with the run); the task changed only the line of D-215. A player may read the two lines as contradicting each other. Outside the task.
- `guidelines/coding-saved-game.md` was edited by hand, not through `the-way-maintain-coding-guidelines` (correction-1 m-4); the slice 14 executor wrote no failing run first (review-s1114 M-3). Process records, no consequence in the files.

## Course of the cycle

- **Task and sources:** the task writes the rules by which a manual run of a solved map takes from and brings out to the chest and the resurrection has uses with a renewal per use, measures three maps and writes the foundation entries; plan item of the plan of the second project, after task 23 (merged in `fec2ae7e`). The task document read differs from the one the plan's log records as accepted (the document is untracked in the notes; read as the day advisor's refresh after the merge of task 23; question row 1).
- **Process pin:** `19e5774aed6d1d628042e23deccc110ed9f112c0`, not moved.
- **Spec:** none — no open design choice; the task's two questions carried to the cycle were answered by the authors of slices 1 and 4.
- **Route:** planned slices; reviewers on the strongest class (`model: opus`) as the requester asked; the reviews of slices without a risk mark grouped in the plan's order.
- **Plan:** 18 slices (`plan.md`); slice 18 too large by the size script (about 227 700 tokens; its one file counts whole), accepted unsplit with the middle class; all made.
- **Choices:** 12 rows of the questions table (`cycle.md`).
- **Corrections:** correction 1, remarks `reports/correction-1-remarks.md` (your comment on this request): `item 1 · defect`, `item 8 · defect`, `item 4 · not-required`; reset base: none (the branch continued from `3a00e73a`).
- **Blocking findings left:** none. The finding that blocked the first run (the campaign could hang under an overlay shortening the loop minute) was fixed in the correction by the way you chose; the review of the return step found one blocking finding (a save kept uses that had come back as spent), fixed by `ad465c76` and passed.
- **Record:** https://github.com/mariusznazar/loop2/blob/pending-record-sha/docs/task-cycles/zapas-i-wskrzeszenie/cycle.md
