**State: draft** — the final gate, the CI run on this request, has not finished yet; no item below waits for your answer before it does.

## What you will see

You can now go from the screen of a map run straight to the character with one click, and the screen of a character has a way back to Siedziba, as in the old Loop.

- **The header of a map run.** The character's name at the start of the header is now a link written "← {name}". One click (one tap on a phone) opens the screen Postać of that character. Leaving the map run this way pauses it, as any other way out of it does, and coming back leaves it paused until you press "Wznów".
- **The screen Postać.** At its very top, above both areas, stands the link "← Siedziba", which leads to Siedziba. It is one more way beside the highlighted "Siedziba" of the menu bar, as you chose. No other back arrow was added.
- **Spending skill points while a map run waits.** "Kup" is now active on the screen Postać also when a manual map run waits in a pause or has ended and waits for "Restart" or "Zakończ". A rank bought then works from that character's next map run, also a map run of its earning loop; the map run that waits keeps the skills it started with, and "Restart" starts without the new rank. Only a map run that is going on still refuses a purchase, and the screen Postać never shows one (leaving the screen of a map run pauses it). The sentence under "Umiejętności" now says when a bought rank starts to work, and it stands only at the character of the waiting map run, not at every character as before.
- **Both links in the phone layout** are at least 48 × 48 px, and nothing scrolls to the side at 360 px.

The side by side you asked for. The old Loop of 31 October first, then loop2 after the change, in the same window, 1600 × 1000: the screen of a map run with the link at the start of the header, then the screen of a character with the link at its top.

![Old Loop: the screen of a map run, „← Nowa postać” at the start of the header](https://github.com/mariusznazar/screenshots/blob/6ec4ec244b159b3598fe249e1fa64e338783a120/loop2/przejscia-miedzy-ekranami/loop_06_przejscie_ekran.png?raw=true)

![loop2: the screen of a map run, „← Nowa postać” at the start of the header](https://github.com/mariusznazar/screenshots/blob/6ec4ec244b159b3598fe249e1fa64e338783a120/loop2/przejscia-miedzy-ekranami/loop2_przejscie_1600.png?raw=true)

![Old Loop: the screen of a character, „← Siedziba” at its top](https://github.com/mariusznazar/screenshots/blob/6ec4ec244b159b3598fe249e1fa64e338783a120/loop2/przejscia-miedzy-ekranami/loop_13_postac.png?raw=true)

![loop2: the screen Postać, „← Siedziba” at its top, the map run paused, „Kup” active with the sentence of when the rank acts](https://github.com/mariusznazar/screenshots/blob/6ec4ec244b159b3598fe249e1fa64e338783a120/loop2/przejscia-miedzy-ekranami/loop2_postac_1600.png?raw=true)

The same two screens in the phone layout, which the old Loop has not (360 × 740 px with touch):

![loop2, phone 360 px: the screen of a map run with „← Nowa postać”](https://github.com/mariusznazar/screenshots/blob/6ec4ec244b159b3598fe249e1fa64e338783a120/loop2/przejscia-miedzy-ekranami/loop2_przejscie_360.png?raw=true)

![loop2, phone 360 px: the screen Postać with „← Siedziba”](https://github.com/mariusznazar/screenshots/blob/6ec4ec244b159b3598fe249e1fa64e338783a120/loop2/przejscia-miedzy-ekranami/loop2_postac_360.png?raw=true)

The two states are not identical, because the old pictures cannot be reproduced: the old screen of a map run stands at minute 0 and loop2's at minute 2 of its own map; the old character screen shows an ended map run, loop2's a paused one with the tree open, the state this task adds. Whether the old Loop is now no better at moving between screens and at back arrows is for you to judge on these images; the author measured the phone layout in a real Chromium (nothing scrolls to the side, every control at least 48 × 48 px) and the reviewer looked at all six pictures and found nothing in them against the task.

### Underneath

A small function of the game's simulation now says when a purchase is open, and the button "Kup" follows it, so the screen and the game cannot disagree; the purchase writes the rank to the character in the team and never to the map run that waits.

## For you to decide

### Needed from you

none

### Fix or let through

1. The look of the two new links under the mouse pointer and with the keyboard focus ring was not looked at in a real browser, and no picture of those two states exists; the ended map run on the screen Postać was checked only by tests, not by hand in the running game. If one of them is wrong, a player sees a link that does not react to the pointer or whose focus is hard to find, on the first visit. Looking now costs a few minutes of your time and, if something is wrong, a round of correction with its review; undoing it, nothing. Making a task of it leaves the two states unchecked until someone opens them; undoing it, nothing. Letting it through accepts that, and a mistake would be found only by a player, who would then ask for a correction. I recommend letting it through: both links use the same pointer rule and the same focus rule as the items of the menu bar, which the reviewer read in the code, and the walk covered everything the task announced. Its weak point: a rule read in code is not a look, so a low-contrast pointer highlight would not show until someone sees it. Check it yourself now, make a task of it, or let it through?
   The steps of the check by hand, whose result you write down as a remark:
   1. Run the game and sign in; send a character on a map and press "Wznów" if the map run is paused.
   2. Move the mouse over "← {name}" at the start of the header: the link should get the same light background as an item of the menu bar; press Tab until the link is focused and see the focus ring.
   3. Click it: the screen Postać opens, "← Siedziba" stands at its top; point at it and focus it the same way, then click it: Siedziba opens.
   4. Press "Zakończ" of a map run that has ended (a death is enough), come back to the screen Postać, and see that "Kup" is active.

   (Checks, 5)
2. An old gap that this request did not make stays in the foundation: the decision on where an action takes the piece it uses from names, as a thing it rests on, a decision on single pieces of items that does not exist yet and is expected in a later change. Nothing in this task depends on it, and a player feels nothing today; the gap becomes a problem when the later change that makes items single pieces is written and nobody notices that this decision waits for it. Writing it now costs a session of the process for a decision that cannot be made before the later change; undoing it, a withdrawn entry. Making a task of it keeps the gap visible in the backlog at no cost today; undoing it, nothing. Letting it through leaves it standing on the main branch, as it has stood in the earlier requests. I recommend letting it through, since the gap names its own closing condition. Its weak point: this request will carry the same item until that change is made. Make a task of it, or let it through? (Foundation entries)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

3. Where the task left the look to the author, it chose, inside what you chose: (a) "← {name}" keeps the look of the name as it was, the big strong heading text, instead of the small grey text of the old Loop, because the name was already the heading of the header and the map's name beside it keeps its own size; the arrow and the name are one link, so it is read as one name; (b) "← Siedziba" is in the muted text of an unmarked menu item, close to the grey of the old Loop; (c) the sentence under "Umiejętności" keeps its first words, "the map run on the map … is unfinished", before the new words about when the rank works, so the reason "Restart" is named stands on the screen. Another way it did not take: the name alone as the link, without the arrow. In none of these does a link exist or stand anywhere else than you chose, and the rule of the purchase is yours as chosen. One consequence for the player: a rank in a branch whose action the player wants to put into a program, bought while a map run waits, is offered in the program editor only from the next map run, since the map run that waits keeps the skills of its start (the decision on the program editor's repertoire says so from now on in the same words).
4. The cycle wrote one foundation entry change that is its own and not a row of the task: the decision on the program editor and on repertoires now says that during a map run the editors use the branches the map run's character had bought at the start of that map run (before: "its bought branches", which could now be read as the branches the character holds in the team). It is the meaning the code already had; the review asked for the wording. Besides, the decision on where a rank is bought now also says what "Restart" starts with after a death that took everything — the skills the team's character was left with — which the code already did and no decision stated; that character has no points to buy with, so no rank bought in the wait can be lost there.
5. Tests that hold a sentence of a decision by a line `decision:` were changed in the quotation only, never in an assertion, so that they quote the new words of the four decisions the task changes and of the program editor's decision: the tests of the simulation (death, loops, trip, purchases, rule signs) and of the screens (accounts, character, maps, program editor, program panel). No test of an invariant was changed, and the foundation check, run on the finished change without the switch that skips the test citations, exits 0 and lists no invariant for a corrected sentence. Tests whose expectation the task changes — the purchase in a pause, the sentence under "Umiejętności", the header — were rewritten to the new behaviour; each was seen failing for the expected reason first.

## Cost

About 46 minutes of working time in all, of which 23 minutes the author's first turn and 11 minutes the whole-change review; 109 million tokens on the strongest model (the author, the two reviews and the probe) and 9 million on the orchestrator's model, counting cached input, which is most of it; one round of fixes (five Minor findings, all fixed) with its review, which passed; the table of stages is in the committed record, `stages.md` (link in *Course of the cycle*). The count is up to the opening of this request.

## How to merge

Merge with a merge commit that keeps the commits: the link to the record of the cycle, by the SHA of the commit that adds it, survives only when the commits stay in the history. (The request was opened with no record in it; the record's copy is added in two commits, the second of which removes it again, so that the target branch never holds the record.)

The foundation has waited for a review through 71 merges since the last review (the review is due from 60). The review is the skill for reviewing the foundation, started in a session in this repository; the backlog already holds its line, "Przegląd fundamentu loop2", so nothing here asks for it; nothing in this request waits for it.

<details>
<summary>W języku zadania (po polsku)</summary>

**Stan: wersja robocza** — końcowa bramka, czyli przebieg CI na tej prośbie, jeszcze się nie skończył; żadna pozycja poniżej nie czeka na Twoją odpowiedź przed jego końcem.

## Co zobaczysz

Z ekranu przejścia można teraz przejść jednym kliknięciem do postaci, a ekran postaci ma drogę powrotu do Siedziby, jak w starym Loopie.

- **Nagłówek przejścia.** Imię postaci na początku nagłówka jest teraz odnośnikiem „← {imię}”. Jedno kliknięcie (jedno dotknięcie na telefonie) otwiera ekran Postać tej postaci. Wyjście tym odnośnikiem pauzuje przejście, jak każde inne wyjście z jego ekranu, a powrót zostawia je w pauzie, dopóki nie naciśniesz „Wznów”.
- **Ekran Postać.** Na samej górze, nad obydwoma obszarami, stoi odnośnik „← Siedziba”, który prowadzi do Siedziby. To druga droga obok podświetlonej pozycji „Siedziba” paska menu, jak wybrałeś. Innych strzałek powrotu nie dodano.
- **Wydawanie punktów wprawy, gdy przejście czeka.** „Kup” jest teraz aktywne na ekranie Postać także wtedy, gdy przejście ręczne czeka w pauzie albo się skończyło i czeka na „Restart” albo „Zakończ”. Kupiony wtedy stopień działa od następnego przejścia tej postaci, także przejścia jej pętli zarobkowej; przejście, które czeka, zachowuje umiejętności ze swojego startu, a „Restart” zaczyna bez nowego stopnia. Tylko trwające przejście dalej odmawia kupna, a ekran Postać takiego stanu nigdy nie pokazuje (wyjście z ekranu przejścia je pauzuje). Zdanie pod „Umiejętności” mówi teraz, od kiedy kupiony stopień działa, i stoi tylko przy postaci czekającego przejścia, a nie przy każdej postaci jak dotąd.
- **Oba odnośniki w układzie telefonu** mają co najmniej 48 × 48 px i przy 360 px nic nie przewija się w bok.

Zestawienie, o które prosiłeś, jest na zrzutach powyżej: stary Loop z 31 października i loop2 po zmianie w tym samym oknie, 1600 × 1000 (ekran przejścia z odnośnikiem na początku nagłówka i ekran postaci z odnośnikiem u góry), oraz te same dwa ekrany w układzie telefonu, którego stary Loop nie ma (360 × 740 px z dotykiem). Stany nie są identyczne, bo starych zrzutów nie da się odtworzyć: stary ekran przejścia stoi w minucie 0, a loop2 w minucie 2 własnej mapy; stary ekran postaci pokazuje zakończone przejście, loop2 — przejście w pauzie z otwartym drzewem, czyli stan, który dodaje to zadanie. Czy stary Loop nie jest już lepszy w przechodzeniu między ekranami i w strzałkach powrotu, oceniasz Ty na tych zrzutach; autor zmierzył układ telefonu w prawdziwym Chromium, a recenzent obejrzał wszystkie sześć zrzutów i nie znalazł w nich nic przeciw zadaniu.

### Pod spodem

Mała funkcja symulacji gry mówi teraz, kiedy kupno jest otwarte, a przycisk „Kup” idzie za nią, więc ekran i gra nie mogą się rozjechać; kupno zapisuje stopień postaci w drużynie, nigdy w przejściu, które czeka.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

brak

### Popraw albo przepuść

1. Wygląd obu nowych odnośników pod wskaźnikiem myszy i z kółkiem fokusu klawiatury nie został obejrzany w prawdziwej przeglądarce i nie ma zrzutu tych dwóch stanów; zakończone przejście na ekranie Postać sprawdziły tylko testy, nie ręczne przejście przez uruchomioną grę. Jeśli któryś z tych stanów jest zły, gracz zobaczy odnośnik, który nie reaguje na wskaźnik, albo którego fokus trudno znaleźć, już przy pierwszej wizycie. Obejrzenie teraz kosztuje kilka minut Twojego czasu, a gdyby coś było źle — rundę poprawki z przeglądem; cofnięcie: nic. Zrobienie z tego zadania zostawia te dwa stany niesprawdzone, dopóki ktoś ich nie otworzy; cofnięcie: nic. Przepuszczenie przyjmuje to ryzyko, a błąd znalazłby dopiero gracz, który poprosiłby o poprawkę. Polecam przepuścić: oba odnośniki mają tę samą regułę wskaźnika i ten sam fokus co pozycje paska menu, co recenzent przeczytał w kodzie, a przejście przez grę objęło wszystko, co zadanie zapowiedziało. Słaby punkt: reguła przeczytana w kodzie nie jest wyglądem, więc słabo widoczne podświetlenie pod wskaźnikiem wyszłoby dopiero, gdy ktoś je zobaczy. Sprawdzisz to sam teraz, robisz z tego zadanie, czy przepuszczasz?
   Kroki sprawdzenia ręcznego, którego wynik zapisujesz jako uwagę:
   1. Uruchom grę i zaloguj się; wyślij postać na mapę i naciśnij „Wznów”, jeśli przejście stoi w pauzie.
   2. Najedź myszą na „← {imię}” na początku nagłówka: odnośnik powinien dostać to samo jasne tło co pozycja paska menu; naciskaj Tab, aż odnośnik dostanie fokus, i zobacz kółko fokusu.
   3. Kliknij go: otwiera się ekran Postać, u góry stoi „← Siedziba”; najedź na niego i zaznacz go tak samo, potem kliknij: otwiera się Siedziba.
   4. Naciśnij „Zakończ” w przejściu, które się skończyło (wystarczy śmierć), wróć na ekran Postać i zobacz, że „Kup” jest aktywne.

   (Sprawdzenia, 5)
2. W fundamencie stoi stara luka, której ta prośba nie zrobiła: decyzja o tym, skąd czynność bierze używany kawałek, wymienia jako to, na czym się opiera, decyzję o pojedynczych kawałkach przedmiotów, której jeszcze nie ma i która ma powstać w późniejszej zmianie. Nic w tym zadaniu od niej nie zależy, a gracz dziś niczego nie czuje; luka staje się problemem, gdy późniejsza zmiana, która robi z przedmiotów pojedyncze kawałki, powstaje, a nikt nie zauważy, że ta decyzja na nią czeka. Dopisanie jej teraz kosztuje sesję procesu na decyzję, której nie da się podjąć przed tamtą zmianą; cofnięcie: wycofany wpis. Zrobienie z tego zadania trzyma lukę widoczną w backlogu bez kosztu dziś; cofnięcie: nic. Przepuszczenie zostawia ją na głównej gałęzi, jak stała w wcześniejszych prośbach. Polecam przepuścić, bo luka sama nazywa warunek swojego zamknięcia. Słaby punkt: ta prośba, jak kolejne, będzie niosła tę samą pozycję, aż tamta zmiana powstanie. Robisz z tego zadanie, czy przepuszczasz? (Wpisy fundamentu)

### Przyjmujesz przez scalenie

Scalenie przyjmuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

3. Tam, gdzie zadanie zostawiło wygląd autorowi, wybrał on, w ramach tego, co Ty wybrałeś: (a) „← {imię}” zachowuje wygląd imienia, jaki był — duży, mocny tekst nagłówka — zamiast małego szarego tekstu starego Loopa, bo imię było już nagłówkiem tego nagłówka, a nazwa mapy obok zachowuje swój rozmiar; strzałka i imię są jednym odnośnikiem, więc czyta się je jak jedną nazwę; (b) „← Siedziba” ma przygaszony tekst niezaznaczonej pozycji menu, blisko szarości starego Loopa; (c) zdanie pod „Umiejętności” zachowuje swoje pierwsze słowa, „Przejście na mapie … jest niezakończone”, przed nowymi słowami o tym, od kiedy stopień działa, żeby na ekranie stał powód, dla którego pada „Restart”. Droga, której nie wybrał: samo imię jako odnośnik, bez strzałki. W żadnym z tych wyborów odnośnik nie stoi gdzie indziej, niż wybrałeś, a reguła kupna jest Twoja, jak wybrałeś. Jeden skutek dla gracza: stopień w gałęzi, której czynność gracz chce wpisać do programu, kupiony, gdy przejście czeka, jest oferowany w edytorze programu dopiero od następnego przejścia, bo czekające przejście zachowuje umiejętności ze startu (decyzja o repertuarze edytora mówi to od teraz tymi samymi słowami).
4. Cykl zmienił jeden wpis fundamentu, który jest jego własny, a nie wierszem zadania: decyzja o edytorze programu i repertuarach mówi teraz, że w czasie przejścia edytory używają gałęzi, które postać przejścia miała kupione na początku tego przejścia (wcześniej: „jej kupione gałęzie”, co po tej zmianie można było czytać jako gałęzie, które postać ma w drużynie). To znaczenie, które kod już miał; recenzja poprosiła o brzmienie. Poza tym decyzja o tym, gdzie kupuje się stopień, mówi teraz także, z czym zaczyna „Restart” po śmierci, która zabrała wszystko — z umiejętnościami, które zostały postaci w drużynie — co kod już robił, a żadna decyzja tego nie mówiła; ta postać nie ma punktów do wydania, więc stopień kupiony w czasie czekania nie może tam przepaść.
5. Testy, które trzymają zdanie decyzji linią `decision:`, zmieniono tylko w cytacie, nigdy w asercji, żeby cytowały nowe słowa czterech decyzji, które zmienia zadanie, i decyzji o edytorze programu: testy symulacji (śmierć, pętle, wyprawa, kupno, znaki reguł) i ekranów (konta, postać, mapy, edytor programu, panel programu). Żaden test niezmiennika nie został zmieniony, a sprawdzenie fundamentu, uruchomione na gotowej zmianie bez przełącznika pomijającego cytaty testów, kończy się kodem 0 i nie wypisuje żadnego niezmiennika dla poprawionego zdania. Testy, których oczekiwanie zadanie zmienia — kupno w pauzie, zdanie pod „Umiejętności”, nagłówek — przepisano na nowe zachowanie; każdy był najpierw widziany jako niezdany z oczekiwanego powodu.

## Koszt

W sumie około 46 minut czasu pracy, z czego 23 minuty pierwsza tura autora i 11 minut przegląd całej zmiany; 109 mln tokenów na najsilniejszym modelu (autor, dwa przeglądy i próba) i 9 mln na modelu koordynatora, licząc wejście z pamięci podręcznej, którego jest najwięcej; jedna runda poprawek (pięć drobnych uwag, wszystkie naprawione) z przeglądem, który przeszedł; tabela etapów jest w zatwierdzonym rekordzie, `stages.md` (link w *Przebiegu cyklu*). Liczba obejmuje czas do otwarcia tej prośby.

## Jak scalić

Scal commitem scalającym, który zachowuje commity: link do rekordu cyklu, po SHA commita, który go dodaje, przetrwa tylko wtedy, gdy commity zostają w historii. (Prośba została otwarta bez rekordu; kopię rekordu dodają dwa commity, z których drugi ją znów usuwa, żeby gałąź docelowa nigdy jej nie miała.)

Fundament czeka na przegląd przez 71 scaleń od ostatniego przeglądu (przegląd należy się od 60). Przegląd to skill do przeglądu fundamentu, uruchamiany w sesji w tym repozytorium; backlog ma już jego linię, „Przegląd fundamentu loop2”, więc nic tu o niego nie prosi; nic w tej prośbie na niego nie czeka.

</details>

## Technical changes

The change has five groups of files, in three commits and two fix commits (`3fc8428e`, `f1544c49`, `328562ac`; fix `1370d75a`, `caf7a814`):

1. **The foundation entries (`3fc8428e`, `1370d75a`).** D-200 (a rank is bought also while a manual map run waits in a pause or has ended, the run keeps its skills, "Restart" starts without the rank, a running map run alone refuses), D-287 (the sentence at "Umiejętności" at the waiting map run's character alone, with the new words), D-280 (a paragraph with the two links), D-311 (the header's sentence), and D-196 (rationale in `3fc8428e`, binding sentence in `1370d75a`); *Verification* of each follows.
2. **The simulation (`f1544c49`).** `purchaseOpen` in `src/browser/sim/skills.ts`; `buyBranch` refuses only while the map run goes on; the rank goes into the team's character, never into `state.run`. A comment in `src/browser/sim/run.ts` (`caf7a814`) points `mapRunEnded` back to the second copy of its test in `purchaseOpen` (an import the other way would be a cycle).
3. **The view (`f1544c49`).** `src/browser/view/run-header.tsx` (the link inside the existing heading), `src/browser/view/character-screen.tsx` (the link at the top, and the run given to the trees only for the run's own character), `src/browser/view/character-trees.tsx` (`Kup` follows `purchaseOpen`, the sentence), and the stylesheets `src/browser/run-screen.css` and `src/browser/character-screen.css` (the phone layout holds the touch target; no pointer highlight on a device that does not hover; the comment of D-396 on each block).
4. **The tests.** Written first and seen failing, then passing: `tests/sim/skills.test.mjs`, `tests/view/run-header.test.mjs`, `tests/view/character-screen.test.mjs`, an integration test in `tests/view/account-screen.test.mjs` (the link, the pause, the saved game); the quotations of `decision:` lines in eight more test files.
5. **The guidelines (`328562ac`, `1370d75a`).** The rules "The screen Postać" and "Main button, secondary action and tab" of `guidelines/styleguide-browser-view.md` (task point 6; the rule names the sentence of D-287 and does not copy it) and the example "Ekran w Reactcie: Postać" of `guidelines/coding-browser-module.md`, whose sentence about "Kup" had become false.

The files `src/browser/view/screen-address.ts` and `src/browser/sim/saved-game.ts`, the trust boundaries of the parts the change touches, are unchanged.

## Checks

1. **Final gate:** the CI run on the last head of this request (`.github/workflows/tests.yml`, trigger `pull_request` into `main`); the cycle has no local time of it and runs no full gate on its own system. Its result: pending, written here when the run ends.
2. **Failing before the change:** none. The list is taken, not measured: the base is a merge commit whose tree equals the tree of its second parent, so the gate was not run on it; the final gate of the merged cycle `wyglad-ekranu-wiedzy` ran in CI (run 46016981062 on its last head, green, 3557 of 3557 node tests, the Python tests passed; `docs/task-cycles/wyglad-ekranu-wiedzy/cycle.md` added by `3f70cbe6`), so the list is empty. A known flaky test named in earlier cycles: `tests/transport.test.mjs:678`.
3. **Focused checks of the author** (each exit 0 after the change): the test files of the simulation (purchases, death, loops, trip) and of the screens (character, header, accounts, maps, run screen, end-of-run window, menu bar, screen registry, gear), and two invariant tests (focus outline, token values), with the commands and exit codes in `reports/author-report.md`; the three new test files were seen failing first (exit 1) for the expected reason. After the fix: the five test files named in `reports/author-fix-1-report.md`, exit 0. Own-work check: the weakest requirement was the purchase in the pause reaching neither the waiting map run nor "Restart" but the next map run, through the save; the sim tests, the integration test (seen failing with the rule broken) and the walk showed it met.
4. **Reviews:** the whole change `PASS 328562ac` (`reports/review-whole-report.md`: 0 Critical, 0 Important, 5 Minor, all fixed); the fix `PASS caf7a814` (`reports/review-fix-1-report.md`: all five fixed, nothing new). The reviewer ran StrykerJS on the changed lines of `src/browser/sim/skills.ts`: 18 of 19 mutants killed; the survivor changes the events a refused purchase returns, which `buyBranch` never returns on any path, so it is no gap. StrykerJS was not rerun after the fix, which changed a comment, a quotation and one assertion. The reviewer's own checks: `foundation_check.py`, `check_instructions.py`, the size rules and the focused tests at exit 0.
5. **User-interface states and screenshots:** the author walked the running game in Chromium at 1600 × 1000 and at 360 × 740 with touch (an account with a made-up address, a state composed with the game's own functions): the header link opens the screen Postać of the map run's character and the run stays paused; "← Siedziba" leads to Siedziba; "Kup" buys in the pause (the save shows the rank at the character and none in the run's skills), at the other character with no sentence; "Restart" starts without the rank; the next send after "Zakończ" starts with it; the links measure 108 × 48 and 73 × 48 at 360 px, no scroll to the side, no small control. The six screenshots lie at `mariusznazar/screenshots`, branch `loop2/przejscia-miedzy-ekranami`, commit `6ec4ec244b159b3598fe249e1fa64e338783a120`, directory `loop2/przejscia-miedzy-ekranami/` (the reviewer looked at all six). Not checked: the look of the links under the pointer and with the focus ring in a real browser; Firefox, Edge and a real Android phone (the decision on browsers gives them to a session of their own); the ended map run on the screen Postać in the running game (held by tests); the header link while the end-of-run window stands (the header is hidden with it, held by an existing test). (Fix or let through, 1)
6. **The foundation and the instructions:** `python -B .the-way/elements/common/foundation_check.py` without the switch that skips the test citations → exit 0 (0 errors, no `listed:` line); `python -B .the-way/instruction-files/check_instructions.py` → exit 0 (0 error, 0 warn).
7. **The description:** form check and the check of private paths, last runs: pending.
8. **The copy of the record:** the private-paths check, the image-files check and the remarks check on the copy, last runs: pending (the copy is added after this description).
9. **The remarks check on the original:** run 1 exit 1 (5 items other than none), the 5 appended, run 2 exit 0 (`5 reports, 5 items other than none, 0 not in the process remarks`).
10. **Working copies and earlier directories:** no working copy of an agent stands; the product's own database of the local start, `.runs/local-start/`, stays as the product's skill for running the game gives; no directory of an earlier task was kept by the cleaning script (it removed the directory of the merged task `wyglad-ekranu-wiedzy`).
11. **Not run:** the gate on your own system (CI is the final gate), StrykerJS after the fix, Firefox, Edge.

## Foundation entries

- D-200 — a rank is bought on the screen Postać also while a manual map run waits in a pause or has ended; the map run keeps the skills of its start, "Restart" starts without the new rank, and only a map run that goes on refuses a purchase (row 1).
- D-287 — "Kup" is no longer among the buttons inactive beside a waiting or ended map run; the sentence at "Umiejętności" stands at that map run's character alone and says the rank works from its next map run, in a loop too, and "Restart" starts without it (rows 1 and 2).
- D-280 — the name at the start of the header of a map run is the link "← {imię postaci}" to that character's screen Postać, and "← Siedziba" at the top of the screen Postać leads to Siedziba, in both layouts, each holding the touch target (rows 3 and 4).
- D-311 — the header's sentence says the name stands at its start as that link, in place of the name alone, in both layouts (row 3).
- D-196 — the cycle's: its binding sentence now says the editors of a map run use the branches the character "had bought at the start of that map run", and its rationale no longer says a waiting map run stops "Kup".

No topical section of the decision log is opened, no invariant or invariant test is changed, no *Violated* mark is set or cleared, and no guidelines rule with no decision was found. A descriptive `TODO` stands in the *Relations* of decision D-451, from an earlier change: the decision on single pieces of items it derives from is expected in a later change (Fix or let through, 2).

## Minor findings

none — the five Minor findings of the review of the whole change were fixed, and the review of the fix found none new.

## Findings outside the task's scope

none — the reviewers marked nothing outside the task's scope; two things the reviewer declined to judge, both as before the change, are not findings of it: a purchase with a map run paused does not first catch up the earning loops of other characters, as no purchase did before; and the program editor of a waiting map run offers no branch action bought in the wait (D-196 as it stood; the task leaves it unchanged).

## Course of the cycle

- **Task and sources:** the task "przejscia-miedzy-ekranami" (plan item 21 of the project plan 2 of loop2, accepted 2026-11-25 at sha256 da0e9b0bc32a6fde): from the screen of a map run to the character with one click, and back arrows at least as convenient as in the old Loop; sources: the project definition (fingerprint 23150d4e), decisions D-280, D-281, D-53, D-277, D-283, D-284, D-311, D-200, D-287, D-212, D-396, D-446, D-447, D-418, D-419 of the foundation at `main` `ef53bb13`.
- **Process pin:** `6ed3cb36`, not moved.
- **Spec:** none; the task and its answers settle the behaviour, and the look of the two links, left to the author by the task's own threshold, is an execution choice inside it.
- **Route:** one author without a plan, on the strongest class (`claude-opus-5-5`, fixed by a probe), since one agent could hold the change; no discarded attempt.
- **Plan:** none.
- **Choices:** 3 choices of the cycle beyond the task's content (item 3 above, in three parts) and the rewording of one decision (items 4 and 5); the questions table is in the record (link below).
- **Blocking findings left:** none.
- **Record:** pending (added after the request opens).
