**State: ready** — the change is made, reviewed and fixed; item 1 of "Fix or let through" waits for your answer, and the full test run is the CI run on this request, whose result is written under *Checks* when it ends.

## What you will see

On Siedziba, each character of the team now stands in a **card** with a thin frame, and the cards stand side by side in a grid: as many as fit in a row on a computer (five at the full width of the game window, four at 1280 px) and two in a row on a phone. Where the old Loop showed a one-line text row, loop2 now shows what the old Loop showed in its tile, and more:

- In the card: the hooded-mage icon in the colour of the name, the name, "pokolenie {n} · Mag żywiołów" (the generation from the second on), and always a line of what the character does — "W obozie", "Przejście: {mapa} · minuta {m}" (with "· postać zginęła" or "· mapa rozwiązana" after the run), or the line of its earning loop with "Zatrzymaj"; after a stop, "W obozie" and "Pętla zatrzymana …" under it.
- While the earning loop of a character goes on, a green dot "●" stands beside its name and the frame of its card is green; outside a loop the frame is the ordinary one.
- The whole card leads to the screen of that character, the name being its link; the card takes a lighter background under the pointer, and "Zatrzymaj" and "Odbierz" stay separate buttons that do not open the screen.
- The line about the resurrection of the team stands once, under the heading "Drużyna", above the cards, and no card repeats it.
- The report "Gdy cię nie było" is no longer a section with a title: above "Drużyna" stands one row with a sentence counting the loops ("Bez ciebie 1 pętla stanęła, 2 chodziły bez przeszkód.", red when a loop stopped, green otherwise; "Skrzynka jest pełna." after it when the chest is full) and one "Zamknij" that clears the report from all cards at once; the lines of each character stand in its own card, under a thin line, with "Odbierz" beside its line.
- The grid ends with a dashed "+ postać" card. A touch opens it in place into the field of a name with "Załóż" and "Anuluj" (Escape does the same as "Anuluj"); with an empty team it stands open from the start, with the sentence "Drużyna nie ma jeszcze postaci." and no "Anuluj".

The side by side you asked for — the old Loop's Siedziba first, then loop2 after the change, in the same window size 1600 × 1000 and in the nearest state (one character in the camp):

![Old Loop: Siedziba with one character](https://github.com/mariusznazar/screenshots/blob/4a84337406ca49bbced96ac4debbe25da1120dad/loop2/kafelek-postaci-w-siedzibie/loop_13_siedziba.png?raw=true)

![loop2 after the change: Siedziba with one character](https://github.com/mariusznazar/screenshots/blob/4a84337406ca49bbced96ac4debbe25da1120dad/loop2/kafelek-postaci-w-siedzibie/loop2_siedziba_jedna_postac.png?raw=true)

The old Loop with the resurrection ready, for the second state it has:

![Old Loop: start](https://github.com/mariusznazar/screenshots/blob/4a84337406ca49bbced96ac4debbe25da1120dad/loop2/kafelek-postaci-w-siedzibie/loop_01_start.png?raw=true)

States the old screenshot does not have, loop2 only. Five characters (in the camp, in an earning loop with the green frame and dot, in a manual map run, after a stop, of the second generation):

![loop2: five characters](https://github.com/mariusznazar/screenshots/blob/4a84337406ca49bbced96ac4debbe25da1120dad/loop2/kafelek-postaci-w-siedzibie/loop2_siedziba_kilka_postaci.png?raw=true)

The same with the pointer over one card and the keyboard focus on another name:

![loop2: pointer and focus](https://github.com/mariusznazar/screenshots/blob/4a84337406ca49bbced96ac4debbe25da1120dad/loop2/kafelek-postaci-w-siedzibie/loop2_siedziba_kursor_i_fokus.png?raw=true)

The report of an absence, with the counting sentence and the lines in the cards:

![loop2: the report in the cards](https://github.com/mariusznazar/screenshots/blob/4a84337406ca49bbced96ac4debbe25da1120dad/loop2/kafelek-postaci-w-siedzibie/loop2_siedziba_raport.png?raw=true)

The empty team with the open field of a name, and one card with the open "+ postać":

![loop2: empty team](https://github.com/mariusznazar/screenshots/blob/4a84337406ca49bbced96ac4debbe25da1120dad/loop2/kafelek-postaci-w-siedzibie/loop2_siedziba_pusta_druzyna.png?raw=true)

![loop2: open + postać](https://github.com/mariusznazar/screenshots/blob/4a84337406ca49bbced96ac4debbe25da1120dad/loop2/kafelek-postaci-w-siedzibie/loop2_siedziba_plus_postac_otwarte.png?raw=true)

The phone layout at 360 px with touch — two cards in a row with a long unspaced name broken inside its card; the open "+ postać"; the report:

![loop2 phone: cards](https://github.com/mariusznazar/screenshots/blob/4a84337406ca49bbced96ac4debbe25da1120dad/loop2/kafelek-postaci-w-siedzibie/loop2_siedziba_telefon.png?raw=true)

![loop2 phone: open + postać](https://github.com/mariusznazar/screenshots/blob/4a84337406ca49bbced96ac4debbe25da1120dad/loop2/kafelek-postaci-w-siedzibie/loop2_siedziba_telefon_plus_postac.png?raw=true)

![loop2 phone: the report](https://github.com/mariusznazar/screenshots/blob/4a84337406ca49bbced96ac4debbe25da1120dad/loop2/kafelek-postaci-w-siedzibie/loop2_siedziba_telefon_raport.png?raw=true)

### Underneath

The cards are a new part of the browser view with their own grid styles, the report is now counted and split into lines per character by the view, and the dashed "+ postać" is a new kind of the shared button; the game's simulation did not change.

## For you to decide

### Needed from you

none

### Fix or let through

1. Some checks of the new look were done only in one browser and by reading the code, never by a person: the cards in Firefox and Edge, the cards on a real phone, the page that shows all states of the shared controls (the new dashed button was added to it and its build was tested, but the page was not opened), a full chest with the report in a real browser, and the pointer over the dashed "+ postać" in a real browser. If the grid, the frame or the lighter background behaves differently in one of them, the player who uses it meets a card that looks worse than the old Loop's tile, which is what you judge in this request. Checking now costs you a few minutes by hand and, if something is wrong, a round of correction with its review; undoing the check, nothing. Making a task of it leaves the cards unchecked in those browsers until someone opens them; undoing it, nothing. Letting it through accepts the risk; undoing it, a correction after a player sees it. I recommend letting it through, since the card was measured in Chromium at 1600, 1280 and 360 px, the tests read the real stylesheet, and the layout uses the same grid and touch rules as the other screens. Its weak point: a rule that Chromium reads and another browser does not shows only on that browser, and this change is purely visual. Check it by hand in this request, make a task of it, or let it through?
   The steps of the check by hand, whose result you write down as a remark:
   1. Start the game locally by typing `npm run local` in the repository and open the address it prints in Firefox, then log in with a test account.
   2. Open Siedziba with a team of at least two characters (create them with "+ postać" if needed): the cards should stand side by side with a thin frame, the name should be the link, and the card should take a lighter background under the pointer.
   3. Press "+ postać": the field of a name with "Załóż" and "Anuluj" should open in its place; press Escape and the dashed card should come back with the focus on it.
   4. Narrow the window to about 360 px, or open the game on your phone: two cards in a row, no side scroll, nothing outside a frame.
   5. Repeat steps 2 and 3 in Edge.

   (Checks, 4)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

2. Where the task left the look to the author, it chose: the open "+ postać" card starts with a line of the archetype (the icon and "Mag żywiołów") in place of today's label "Nowa postać: Mag żywiołów", and its frame is dashed like the closed card; the line that sets the report apart inside a card is a solid faint line, not the dashed one of the old Loop, because a dash in that colour vanishes; the cards are 250 px wide so that five fit at the full width (the old Loop's are about 192 px); the text of the closed "+ postać" is in the ordinary text colour, not the dimmer grey of the old Loop, and the closed card is as tall as its row; the name is in the heading size at the emphasis weight, the two lines under it in the smaller sizes; "Zamknij" stands right after the counting sentence, not at the far end of the row; and after "Odbierz" or "Zatrzymaj" the focus goes to the name of that card, since the button that had it leaves the screen. It did not take a variant you did not choose; the other ways (a dashed line, wider or narrower cards, a dimmer grey, "Zamknij" at the far end) cost nothing to take later but a correction and its review.
3. The cycle corrected three foundation entries on its own, beyond what the task wrote. The reason behind the decision on the picture band at the top of Siedziba no longer says that "Drużyna" speaks of earning loops alone and that Siedziba nowhere else says a character is in a manual map run, since the cards now say it, and two of its rejected ways were reworded the same way; the verification of the decision on contrast names the test that now holds the green frame of a card, instead of keeping an example for it; and the decision on the report lost an older rejected way, "closing at each character", since the old Loop's deployed version closes all at once and the way is now the one the task rejects. The cycle also added to the decision on shared controls one example of what it forbids: the closed "+ postać" built as a button of the screen with a dashed frame of its own. (Foundation entries)
4. The cases of the view tests of Siedziba, of the report, of the account screen and of several screens that quote a sentence of a decision were re-quoted to the new wording, as the foundation check demands, and new cases were written for the cards, the report row, the dashed button and the open "+ postać". No test of an invariant was changed, and the foundation check lists no invariant for a corrected sentence. (Foundation entries)

## Cost

About an hour of working time at this writing (the author's first turn 33 minutes, the reviews and fixes the rest), 158 million tokens counted with cache (149 million on Opus, 9.5 million on Sonnet), one round of fix after the review of the whole change (one blocking finding about a stale sentence in a decision, and two Minor findings, all fixed and passed), one review of the fix, the return step with one commit and its review. The table of stages is in the committed record, linked under *Course of the cycle*.

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record survives only then. The foundation has waited for a review through 69 merges since the last review (the tag `foundation-review/2026-11-13`); the review is the skill `the-way-review-foundation`, started in a session in this repository. The backlog already holds the line "Przegląd fundamentu loop2"; nothing in this request waits for it.

<details>
<summary>W Twoim języku</summary>

**State: ready** — zmiana jest zrobiona, sprawdzona i poprawiona; punkt 1 w „Napraw albo przepuść” czeka na Twoją odpowiedź, a pełny przebieg testów to przebieg CI na tej prośbie, którego wynik trafia do *Checks*, gdy się skończy.

## Co zobaczysz

W Siedzibie każda postać drużyny stoi teraz w **kafelku** z cienką ramką, a kafelki stoją obok siebie w siatce: tyle w rzędzie, ile się mieści, na komputerze (pięć przy pełnej szerokości okna gry, cztery przy 1280 px), a na telefonie dwa w rzędzie. Tam, gdzie stary Loop pokazywał wiersz tekstu, loop2 pokazuje to, co stary Loop pokazywał w kafelku, i więcej:

- W kafelku: ikona maga w kapturze w kolorze imienia, imię, „pokolenie {n} · Mag żywiołów” (od drugiego pokolenia) i zawsze wiersz tego, co postać robi — „W obozie”, „Przejście: {mapa} · minuta {m}” (z „· postać zginęła” albo „· mapa rozwiązana” po końcu przejścia) albo wiersz pętli zarobkowej z „Zatrzymaj”; po zatrzymaniu „W obozie” i pod nim „Pętla zatrzymana …”.
- Dopóki pętla postaci chodzi, przy imieniu stoi zielona kropka „●”, a ramka kafelka jest zielona; poza pętlą ramka jest zwykła.
- Cały kafelek prowadzi do ekranu tej postaci, a jego odnośnikiem jest imię; pod kursorem kafelek ma jaśniejsze tło, a „Zatrzymaj” i „Odbierz” zostają osobnymi przyciskami, które ekranu nie otwierają.
- Wiersz o wskrzeszeniu drużyny stoi raz, pod nagłówkiem „Drużyna”, nad kafelkami, i żaden kafelek go nie powtarza.
- Raport „Gdy cię nie było” nie jest już sekcją z tytułem: nad „Drużyną” stoi jeden wiersz ze zdaniem liczącym pętle („Bez ciebie 1 pętla stanęła, 2 chodziły bez przeszkód.”, czerwony, gdy któraś stanęła, inaczej zielony; po nim „Skrzynka jest pełna.”, gdy skrzynka jest pełna) i jedno „Zamknij”, które zdejmuje raport ze wszystkich kafelków naraz; wiersze każdej postaci stoją w jej kafelku, pod cienką kreską, z „Odbierz” przy swoim wierszu.
- Siatkę kończy przerywany kafelek „+ postać”. Dotknięcie otwiera go w tym samym miejscu jako pole imienia z „Załóż” i „Anuluj” (Escape robi to samo co „Anuluj”); przy pustej drużynie stoi otwarty od razu, ze zdaniem „Drużyna nie ma jeszcze postaci.” i bez „Anuluj”.

Zestawienie zrzutów, o które prosiłeś, stoi wyżej: najpierw Siedziba starego Loopa, potem loop2 po zmianie, w tym samym rozmiarze okna 1600 × 1000 i w najbliższym stanie (jedna postać w obozie); dalej stany, których stary zrzut nie ma: kilka postaci, kursor i fokus, raport, pusta drużyna z otwartym polem imienia, otwarty „+ postać” oraz układ telefonu przy 360 px z dotykiem.

### Pod spodem

Kafelki są nową częścią widoku przeglądarki z własnymi stylami siatki, raport jest teraz liczony i dzielony na wiersze każdej postaci przez widok, a przerywany „+ postać” to nowy rodzaj wspólnego przycisku; symulacja gry się nie zmieniła.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

none

### Napraw albo przepuść

1. Część sprawdzeń nowego wyglądu zrobiono tylko w jednej przeglądarce i przez czytanie kodu, a nigdy przez człowieka: kafelki w Firefoksie i Edge, kafelki na prawdziwym telefonie, strona pokazująca wszystkie stany wspólnych kontrolek (dodano do niej nowy przycisk przerywany i przetestowano jej zbudowanie, ale strony nie otwarto), pełna skrzynka z raportem w prawdziwej przeglądarce oraz kursor nad przerywanym „+ postać” w prawdziwej przeglądarce. Jeśli siatka, ramka albo jaśniejsze tło zachowuje się inaczej w jednej z nich, gracz, który z niej korzysta, trafi na kafelek wyglądający gorzej niż kafelek starego Loopa, a właśnie to oceniasz w tej prośbie. Sprawdzenie teraz kosztuje Ciebie kilka minut ręcznie, a gdy coś jest źle — rundę poprawki z przeglądem; cofnięcie sprawdzenia nic nie kosztuje. Zrobienie z tego zadania zostawia kafelki niesprawdzone w tych przeglądarkach, aż ktoś je otworzy; cofnięcie nic nie kosztuje. Przepuszczenie przyjmuje ryzyko; cofnięcie to poprawka po tym, jak zobaczy to gracz. Polecam przepuścić, bo kafelek zmierzono w Chromium przy 1600, 1280 i 360 px, testy czytają prawdziwy arkusz stylów, a układ używa tej samej siatki i tych samych reguł dotyku co inne ekrany. Słaby punkt: regułę, którą Chromium czyta, a inna przeglądarka nie, widać tylko w tej przeglądarce, a ta zmiana jest czysto wizualna. Sprawdzić ręcznie w tej prośbie, zrobić z tego zadanie czy przepuścić?
   Kroki sprawdzenia ręcznego, którego wynik zapisujesz jako uwagę:
   1. Uruchom grę lokalnie, wpisując w repozytorium `npm run local`, i otwórz adres, który wypisze, w Firefoksie, a potem zaloguj się kontem testowym.
   2. Otwórz Siedzibę z drużyną co najmniej dwóch postaci (w razie potrzeby załóż je przez „+ postać”): kafelki powinny stać obok siebie z cienką ramką, imię powinno być odnośnikiem, a kafelek pod kursorem powinien mieć jaśniejsze tło.
   3. Naciśnij „+ postać”: pole imienia z „Załóż” i „Anuluj” powinno otworzyć się w tym samym miejscu; naciśnij Escape, a przerywany kafelek powinien wrócić z fokusem na nim.
   4. Zwęź okno do około 360 px albo otwórz grę na telefonie: dwa kafelki w rzędzie, bez przewijania w bok, nic poza ramką.
   5. Powtórz kroki 2 i 3 w Edge.

   (Checks, 4)

### Akceptujesz przez scalenie

Scalenie przyjmuje te punkty; jeśli któryś Ci nie odpowiada, powiedz który.

2. Tam, gdzie zadanie zostawiło wygląd wykonawcy, wybrał on: otwarty kafelek „+ postać” zaczyna się wierszem archetypu (ikona i „Mag żywiołów”) zamiast dzisiejszej etykiety „Nowa postać: Mag żywiołów”, a jego ramka jest przerywana jak zamkniętego kafelka; kreska odgradzająca raport w kafelku jest ciągłą, bladą linią, a nie przerywaną jak w starym Loopie, bo kreska w tym kolorze znika; kafelki mają 250 px szerokości, żeby pięć mieściło się przy pełnej szerokości (kafelki starego Loopa mają około 192 px); napis zamkniętego „+ postać” jest w zwykłym kolorze tekstu, a nie w przygaszonej szarości starego Loopa, a zamknięty kafelek jest tak wysoki jak jego rząd; imię ma rozmiar nagłówka i wagę wyróżnienia, a dwa wiersze pod nim mniejsze rozmiary; „Zamknij” stoi zaraz po zdaniu liczącym pętle, nie na końcu wiersza; a po „Odbierz” albo „Zatrzymaj” fokus idzie na imię tego kafelka, bo przycisk, który go miał, znika z ekranu. Nie wybrał wariantu, którego nie wybrałeś; inne drogi (przerywana kreska, szersze lub węższe kafelki, przygaszona szarość, „Zamknij” na końcu wiersza) nic nie kosztują później poza poprawką i jej przeglądem.
3. Cykl sam poprawił trzy wpisy fundamentu, poza tym, co zapisało zadanie. Uzasadnienie decyzji o pasie obrazu u góry Siedziby nie mówi już, że „Drużyna” mówi tylko o pętlach zarobkowych i że Siedziba nigdzie indziej nie mówi, że postać jest w przejściu ręcznym, bo kafelki to teraz mówią, a dwa odrzucone warianty tej decyzji przeredagowano tak samo; weryfikacja decyzji o kontraście wskazuje test, który teraz trzyma zieloną ramkę kafelka, zamiast zostawiać dla niej przykład; a decyzja o raporcie straciła starszy odrzucony wariant „zamykanie przy każdej postaci”, bo wdrożona wersja starego Loopa zamyka wszystko naraz i ten wariant jest teraz tym, który zadanie odrzuca. Cykl dopisał też do decyzji o wspólnych kontrolkach jeden przykład tego, czego ona zabrania: zamknięte „+ postać” zbudowane jako przycisk ekranu z własną przerywaną ramką. (Foundation entries)
4. Przypadki testów widoku Siedziby, raportu, ekranu konta i kilku innych ekranów, które cytują zdanie decyzji, zacytowano na nowo w nowym brzmieniu, jak wymaga tego sprawdzenie fundamentu, i napisano nowe przypadki dla kafelków, wiersza raportu, przycisku przerywanego i otwartego „+ postać”. Żaden test niezmiennika nie został zmieniony, a sprawdzenie fundamentu nie wymienia żadnego niezmiennika ze względu na poprawione zdanie. (Foundation entries)

## Koszt

Około godziny pracy w chwili pisania (pierwsza tura autora 33 minuty, reszta to przeglądy i poprawki), 158 milionów tokenów licząc z pamięcią podręczną (149 milionów na Opus, 9,5 miliona na Sonnet), jedna runda poprawki po przeglądzie całej zmiany (jedna uwaga blokująca o nieaktualnym zdaniu w decyzji i dwie drobne, wszystkie poprawione i przyjęte), jeden przegląd poprawki oraz krok powrotu z jednym commitem i jego przeglądem. Tabela etapów jest w zatwierdzonym rekordzie, do którego link stoi w *Course of the cycle*.

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo link do rekordu przeżywa tylko wtedy. Fundament czekał na przegląd przez 69 scaleń od ostatniego przeglądu (tag `foundation-review/2026-11-13`); przegląd to skill `the-way-review-foundation`, uruchomiony w sesji w tym repozytorium. Backlog ma już linię „Przegląd fundamentu loop2”; nic w tej prośbie na nią nie czeka.

</details>

## Technical changes

The change in five commits since the base, by group of files, each item opening with what it concerns:

- **The foundation of the cards** (`3d8cb03d`, then `e2d75976` and `61584722`): the decisions D-280, D-446, D-447, D-39, D-42, D-217, D-246 and D-44 say what the cards, the report row and the dashed button do; every test comment that quoted an old sentence quotes the new wording (`foundations/decisions.md`, the tests of `tests/view/` and two of `tests/sim/`).
- **The cards, the report and the open "+ postać"** (`03ff7633`): the new module `src/browser/view/team-cards.tsx` draws the card and the tile; `src/browser/view/headquarters.tsx` shrank to the section; `src/browser/view/away-report.ts` now gives the lines of one character and a counting sentence (`reportLinesOf`, `reportSummary` replace `reportEntries` and `reportTitle`); the grid and card styles are in `src/browser/headquarters.css`.
- **The dashed button** (`03ff7633`): a new kind of the shared button in `src/browser/view/controls/react-button.tsx` and `src/browser/styles.css`, with a sample on the page of all states (`src/browser/kitchen-sink/control-samples.tsx`) and a case in `tests/view/shared-controls.test.mjs`.
- **The tests** (`03ff7633`): `tests/view/headquarters-screen.test.mjs` (37 cases), `tests/view/away-report.test.mjs`, `tests/view/account-screen.test.mjs` and the quotation-only changes in nine more files.
- **The styleguide** (`d19e5445`): the new rule "The section „Drużyna” of Siedziba" in `guidelines/styleguide-browser-view.md`, the dashed button in its rules on shared controls, the green frame in its table of roles and its rule on contrast, and the picture band leading to the characters by their cards.
- **The fix of the review's findings** (`e2d75976`, `aeb2711a`): the reasoning and two rejected ways of D-389 corrected; the play skill of the repository, `.claude/skills/loop2-play/SKILL.md` and its byte-identical copy `.agents/skills/loop2-play/SKILL.md`, names the report as the sentence "Bez ciebie …" above "Drużyna" with the lines in the cards and creates a character in the tile at the end of the cards. The screenshot of one character was retaken after the review found it showed an underlined name that the code does not draw.
- **The return step** (`61584722`): the verification of D-42 names the test that holds the green frame of a card and keeps no example for it.

## Checks

1. **The final gate is the CI run on the request's last head.** The cycle ran no gate of its own and has no local time of it; its result is not yet at this writing and is written here when the run ends.
2. **Tests failing before the change:** none; the list was taken from the final gate of the earlier cycle, the CI run 45998628925 on the merged request #184, green; the known flaky test named in earlier cycles is `tests/transport.test.mjs:678`. The base is a merge commit whose tree equals that of its second parent, so no gate ran on it.
3. **The checks the author and the reviewers ran, each with exit code 0:** `npm run typecheck`; ESLint and Prettier on the changed files; `tests/quality/test_function_and_file_size.py`; `python -B .the-way/elements/common/foundation_check.py` (`0 errors`, also without the switch that skips the test citations) and `python -B .the-way/instruction-files/check_instructions.py` (`0 error, 0 warn`); `npm test -- tests/view/headquarters-screen.test.mjs` (37), `account-screen` (132), `away-report` (23), `shared-controls` (71), `camp-picture` (7), `scene-picture` (78), `tests/agent_workflow/test_loop2_play_skill.py`, and the invariant tests of token values, focus outline, contrast, framework, the build of the page of all states and cross-part imports. The token-values test failed once on the string `"field"` read as a CSS system colour; it was renamed and passed. The play-skill test failed once because its two copies differed; the copy was updated and it passed.
4. **What did not run:** the full gate on this machine (CI is the final gate), StrykerJS (no simulation file changed), Firefox, Edge, a real phone, the page of all states opened in a browser, a full chest and the pointer over "+ postać" in a real browser — the last five stand in item 1 of *For you to decide*. The own-work check of the author (Enter in the name field in a real Chromium) failed first — the browser pressed the newly focused "+ postać" with the same key — and was fixed with a case that fails without the fix.
5. **The walk through the running game** (author; `npm run local`, Chromium by Playwright CLI at 1600 × 1000, 1280 × 720 and 360 × 740 with touch, a made-up local account): one character in the camp; five characters; the report in red and in green; the pointer and the keyboard focus on a card; the empty team; the open "+ postać" with Escape, "Anuluj" and "Załóż"; the phone with the long name "Konstantynopolitańczykowianeczka" broken in its card, no side scroll, no control smaller than 48 px; a tap on a card opens the screen, a tap on "Zatrzymaj" stops the loop without leaving Siedziba — all passed, one failed and was corrected (Enter in the field). The eleven screenshots lie in the public repository `mariusznazar/screenshots`, commit `4a84337406ca49bbced96ac4debbe25da1120dad`, directory `loop2/kafelek-postaci-w-siedzibie/` (D-418, D-419); no image is in this repository or in the record.
6. **The reviews:** the whole change `FAIL` at `d19e5445` (one Important, two Minor), the fix reviewed `PASS aeb2711a`; the return step reviewed `PASS 61584722`.
7. **Form check, private paths, record copy, image check, remarks check:** written after the record's copy is committed.

## Foundation entries

No new decision, invariant, glossary term or part-map line. Entries changed, each by identifier and meaning:

- **D-280** (row 8): the whole card of a character on Siedziba is one link, named by the name, to its screen; "Zatrzymaj" and "Odbierz" on it are buttons that open no screen.
- **D-446** (row 2): the archetype's icon stands before the name on the card, as a mask in the name's colour.
- **D-447** (row 3): the card always shows the same line of what the character does as the frame of the screen Postać; after a stop, "W obozie" with the line of the stop under it.
- **D-39** (row 4): `positive` also stands as the frame of a card and the dot beside the name while the character's earning loop goes on.
- **D-42** (row 5): that green frame has at least 3:1 against the colours it touches; its Verification (the cycle's, `61584722`) names the test that holds it.
- **D-217** (row 6): the line of the team's resurrection stands once under "Drużyna" on Siedziba and no card holds it; its example (complies) now names "under „Drużyna” on Siedziba, on the screen Postać and in „Kto idzie”".
- **D-246** (rows 7, 11, 12): the report lines stand in the cards; one row above "Drużyna" holds the counting sentence, "Skrzynka jest pełna." and one "Zamknij"; its Rejected adds the task's rejected ways and drops the older "closing at each character" (the cycle's).
- **D-44** (row 15): the closed "+ postać" is built from a new kind of the shared button, the dashed button. Marked the cycle's because its writer added an example the row does not give — the violates example, word for word: „the closed „+ postać” made as a `<button>` of the screen with a dashed frame of its own.”
- **D-389** (the cycle's, `3d8cb03d` and `e2d75976`): the way to a character stays its card; its Rationale and two Rejected ways no longer say that "Drużyna" speaks of earning loops alone or that nothing on Siedziba says a character is on a map.
- **Guidelines:** `guidelines/styleguide-browser-view.md` rows 1, 9, 10, 13 and 14 of *Settlements to record*: the new rule "The section „Drużyna” of Siedziba", the dashed button in "States of shared controls" and "Main button, secondary action and tab", the green frame in the roles and in "Contrast of every pair", "Anuluj" of the open tile as a secondary action. No rule with *Decision* `none` was found.
- **Tests holding a sentence by `// decision:`** were re-quoted in `tests/view/headquarters-screen.test.mjs`, `account-screen`, `away-report`, `character-screen`, `clock`, `maps-screen`, `menu-bar`, `screen-address`, `team-lines` and in `tests/sim/catch-up.test.mjs` and `tests/sim/loop.test.mjs`; no `// invariant:` line was altered, and the foundation check lists no invariant.

## Minor findings

The review of the whole change left no Minor finding unfixed (its two were fixed). The review of the return step found one, within the task, that no fix made:

- **The verification of D-42 claims slightly more than the case reads.** `foundations/decisions.md:5104` says the green frame "touches `panel` at rest and `highlight` under the pointer"; the case at `tests/view/headquarters-screen.test.mjs:459` reads neither colour (the colour under the pointer is checked by the next case, at line 501, which cites D-280, and no case checks that the block behind the cards is `panel`). Since `positive` keeps its contrast on all five backgrounds, nothing the player sees is unguarded; the wording only claims slightly more than that one case reads. (Reviewer of the return step.)

## Findings outside the task's scope

none

## Course of the cycle

- **Task and sources:** the task of the plan "kafelek-postaci-w-siedzibie" (item 17 of the plan of project 2), accepted through the day's advisor on 2026-11-25; the frozen copy differs from the accepted version in one line, its status. Sources: the old Loop's code at `origin/test` 715026e (the tile and the sentence of the report, read only) and its screenshots of 2026-10-31.
- **Process pin:** `6ed3cb364adedacea214d2a0df690cea32f2e72f`, not moved by the task.
- **Spec:** none; the answers of the task settle every entry, and what it left to the author is a choice of how to make what is settled.
- **Route:** one author without a plan, `the-way-author` on Opus (the strongest class; model fixed `claude-opus-5-5` by the probe of this session), resumed for the fix and the return step; no discarded attempt.
- **Plan:** none.
- **Choices:** 2 other choices of the cycle, none changing what the user sees; the eight choices of look stand in item 2 of *For you to decide* (questions table of the record).
- **Blocking findings left:** none.
- **Record:** to be linked by the SHA of the commit that adds it.
