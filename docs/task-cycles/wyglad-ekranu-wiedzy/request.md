**State: ready** — corrected for your answers to items of this request; the CI run on the new head has not finished yet, and no item waits for your answer.

## What you will see

The screen **Wiedza** is laid out again, with the work on the **skills** first, as you asked ("ładniej i czytelniej, zwłaszcza rozpisanie umiejętności"):

- **Rows of the trees (right area, "Umiejętności").** Each known tree is now a row across the whole width of the area, set apart from the next by a thin line, instead of a framed button as wide as its text. The small "▸" is at the start of the row, the name of the tree stands out in the strong text colour, and "3 gałęzie" sits at the right edge. A click anywhere on the row opens or folds the tree, as on the screen Postać, but with no level, bar or points. The trees are still folded each time you enter the screen.
- **An open branch.** First line: the name and the number of steps, "Wprawne oko · 3 stopnie"; under it the description; the prices "1 · 1 · 1 pkt" stand in a column of their own at the right, as in the old Loop. Under the description, new: **what each step gives**, from the same game data from which the screen Postać writes "teraz → po kupnie" — "bez gałęzi 70 %", then "I 75 % · 1 pkt", "II 80 % · 1 pkt", "III 85 % · 1 pkt". A branch with no number ("Obchód", "Czysty płomień", "Zwiad" and also "Ucisk", which the task did not list) shows only its description and its price. The line of steps stands in both layouts; on a phone it wraps between steps (see the author's choices below).
- **Understanding (left area).** The things of each group — actions, items, creatures — now stand in columns: as many as fit the width of the area, never fewer than two. That is two columns on the computer at 1600 px and 1280 px, two on a phone at 360 px, and six when the phone layout is shown in a window about 1100 px wide.

The side by side you asked for. First the old Loop of 31 October (26 known things with the trees folded; then a new game with nothing known):

![Old Loop: Wiedza with 26 known things, trees folded](https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/00-stary-loop-wiedza-26-rzeczy.png?raw=true)

![Old Loop: Wiedza of a new game](https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/00-stary-loop-wiedza-nowa-gra.png?raw=true)

loop2 **before** the change, window 1600 × 1000, 26 known things, 9 trees folded; then "Eksploracja", "Zbieranie małych przedmiotów" and "Walka bronią jednoręczną" open:

![loop2 before, 1600 × 1000, trees folded](https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/01-przed-1600-zwiniete.png?raw=true)

![loop2 before, 1600 × 1000, three trees open](https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/02-przed-1600-rozwiniete.png?raw=true)

loop2 **after** the change, the same window and the same state:

![loop2 after, 1600 × 1000, trees folded, the things in two columns](https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/05-po-1600-zwiniete.png?raw=true)

![loop2 after, 1600 × 1000, the same three trees open: a branch with a number ("Wprawne oko", "Długi krok" whose two last steps are both 1 min), one without ("Zwiad", "Obchód"), and one of four steps ("Mocniejszy cios")](https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/06-po-1600-rozwiniete.png?raw=true)

On a phone, 360 px with touch, whole page — before, trees folded and open:

![loop2 before, 360 px, trees folded](https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/03-przed-360-zwiniete.png?raw=true)

![loop2 before, 360 px, the same three trees open](https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/04-przed-360-rozwiniete.png?raw=true)

and after — "Mocniejszy cios" (four steps) wraps into two rows of steps:

![loop2 after, 360 px, trees folded](https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/07-po-360-zwiniete.png?raw=true)

![loop2 after, 360 px, the same three trees open](https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/08-po-360-rozwiniete.png?raw=true)

And the phone layout in a window about 1100 px wide, where the things of the Understanding stand in six columns:

![loop2 after, phone layout, window 1100 px wide, the things in six columns](https://github.com/mariusznazar/screenshots/blob/8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c/loop2/wyglad-ekranu-wiedzy/09-po-1100-telefon.png?raw=true)

The author measured the screen in a real Chromium: nothing scrolls to the side at 360 px, 1100 px or 1280 px, no text stands outside its frame, and at 360 px with touch every control is at least 48 × 48 px. The reviewer, who looked at all eleven screenshots, found that they agree with those numbers. Whether the screen is nicer and clearer than before, and whether the old Loop is no better, is for you to judge on these images.

### Underneath

The values of the steps come from one small function that the screen Postać now uses too, so the two screens read the same numbers; nothing in the game state or in the data of the game changed, and the screen still buys nothing.

## For you to decide

### Needed from you

none

### Fix or let through

none

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

1. You let through, in your answer, that the new look was measured only in Chromium (360 px with touch, 1100 px and 1280 px, with a made-up account), not in Firefox or on a real phone. You noted that Edge is Chromium and that the layout is plain grid and wrapping. If the columns or the wrapping of the steps behave differently in another browser, a player there would see crowded text on the first visit, and the remedy would be a correction after someone meets it. (Checks, 7)
2. You let through that the review of the whole change read two decisions only in part, the one on the shared controls and the one on the effects and prices of the skill branches: the change uses the shared button as it is and takes the prices from the data without changing them. (Checks, 4)
3. Where the task left the look to the author, it chose, inside what you chose: (a) the line of steps is a small table, each step a piece of two lines — "I · 1 pkt" over "75 %" and "bez gałęzi" over "70 %" first — and the pieces wrap between steps on a narrow screen, because in one running line the small Roman "I" of the game's font reads as a bar "|" and the value, the numeral and the price run together; it is one line taller per branch with a number, with the same words and the same data; (b) "3 gałęzie" stands in the secondary text colour at label size, like the counters of the two areas, rather than in the row's own colour; (c) the least width of a column of the Understanding is 12 em, so the window of 1100 px shows six columns, not the "about eight" the task estimated — at nine columns "Wytwórz — ognisko" and "Zapal — ognisko" broke into two lines, at 12 em none does; the gap between an icon and its name is smaller so that "Wytwórz — ognisko" fits the 142 px column of the 1600 px window; (d) a row of a tree takes no lighter background under the pointer, as the row on Postać takes none. At 1280 px the narrowest computer column is 130 px, where "Wytwórz — ognisko" still breaks into two lines, as the task's weak point foresaw. Other ways it did not take: one running line of steps (Roman numerals read as bars), and nine columns at 1100 px (names break).
4. The cycle wrote or changed three foundation entries, and one thing in them is the cycle's own: the decision on the screen Wiedza now names four branches with no number, not three, because the game data hold a fourth ("Ucisk"), and its pair of examples gained the cases no test can hold — the row of a tree across the width of its area with the line of steps in the phone layout, and what it must not be (a row as wide as its text alone, a line of steps hidden on the phone). The note on what that decision rejects says it rejects rows with level, practice, points and buying, not the shared layout of the row, as you chose. The rule of the styleguide for the screen was rewritten to say all of this. The third entry is the older decision note on the screens of the game: at your answer, its list of rejected ways now says that it rejects the same rows with level, practice, points and buying on two screens, not the layout of the row of a tree that the two screens share. (Foundation entries)
5. The cases of the tests of the screen Wiedza that quote a sentence of its decision were re-quoted to the new wording, and two new cases quote the new sentences (the line of steps and the branch with no number); the test of the value function stayed as it was. No test of an invariant was changed, and the foundation check lists no invariant for a corrected sentence. (Foundation entries)
6. This correction answered your answers to two items of this request — the one on the older decision note and the one on the finished working folder of the earlier task — and the cycle judged that the task did not require what they changed; your answers to the other two items asked for nothing to be done.

## Cost

About 59 minutes of working time at this writing, 118 million tokens counted with cache (90 million on the strongest model, Opus 5.5; 28 million on Sonnet 5.5): the author's first turn 22 minutes, one review of the whole change, one fix round for a Minor finding (stale words in a test) with its review, a return step that found nothing to correct, and this correction with its review. The table of stages is in the committed record, linked under *Course of the cycle*.

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record survives only then. The foundation has waited for a review through 70 merges since the last review (the tag `foundation-review/2026-11-13`); the review is the skill `the-way-review-foundation`, started in a session in this repository. The backlog already holds the line "Przegląd fundamentu loop2"; nothing in this request waits for it.

<details>
<summary>W Twoim języku</summary>

**State: ready** — poprawione na Twoje odpowiedzi do punktów tej prośby; przebieg CI na nowym headzie jeszcze się nie skończył, a żaden punkt nie czeka na Twoją odpowiedź.

## Co zobaczysz

Ekran **Wiedza** jest ułożony od nowa, z pracą nad **umiejętnościami** na pierwszym miejscu, jak prosiłeś („ładniej i czytelniej, zwłaszcza rozpisanie umiejętności”):

- **Wiersze drzew (prawy obszar, „Umiejętności”).** Każde poznane drzewo to teraz wiersz na całą szerokość obszaru, oddzielony od następnego cienką linią, a nie ramkowy przycisk szeroki na swój napis. Małe „▸” stoi na początku wiersza, nazwa drzewa jest wyraźniejsza (mocny kolor tekstu), a „3 gałęzie” stoi przy prawym brzegu. Kliknięcie w dowolne miejsce wiersza rozwija albo zwija drzewo, jak na ekranie Postać, tyle że bez poziomu, paska i punktów. Drzewa dalej są zwinięte przy każdym wejściu na ekran.
- **Rozwinięta gałąź.** Pierwsza linia: nazwa i liczba stopni, „Wprawne oko · 3 stopnie”; pod nią opis; ceny „1 · 1 · 1 pkt” stoją w osobnej kolumnie po prawej, jak w starym Loopie. Pod opisem, nowość: **co daje każdy stopień**, z tych samych danych gry, z których ekran Postać pisze „teraz → po kupnie” — „bez gałęzi 70 %”, potem „I 75 % · 1 pkt”, „II 80 % · 1 pkt”, „III 85 % · 1 pkt”. Gałąź bez liczby („Obchód”, „Czysty płomień”, „Zwiad”, a także „Ucisk”, którego zadanie nie wymieniło) pokazuje tylko opis i cenę. Linia stopni stoi w obu układach; na telefonie łamie się między stopniami (zob. wybory autora niżej).
- **Zrozumienie (lewy obszar).** Rzeczy każdej grupy — czynności, przedmioty, stworzenia — stoją teraz w kolumnach: tylu, ile zmieści szerokość obszaru, nigdy mniej niż dwie. To dwie kolumny na komputerze przy 1600 px i 1280 px, dwie na telefonie przy 360 px i sześć, gdy układ telefonu pokazany jest w oknie szerokim na około 1100 px.

Zestawienie, o które prosiłeś. Najpierw stary Loop z 31 października (26 poznanych rzeczy, drzewa zwinięte; potem nowa gra, nic poznanego), loop2 **przed** zmianą w oknie 1600 × 1000 (26 poznanych rzeczy, 9 drzew zwiniętych; potem „Eksploracja”, „Zbieranie małych przedmiotów” i „Walka bronią jednoręczną” rozwinięte), loop2 **po** zmianie w tym samym oknie i stanie, na telefonie przy 360 px z dotykiem przed i po (cała strona; „Mocniejszy cios” o czterech stopniach łamie się na dwa rzędy stopni) oraz układ telefonu w oknie szerokim na około 1100 px, gdzie rzeczy Zrozumienia stoją w sześciu kolumnach — wszystkie jedenaście zrzutów jest wyżej, w sekcji „What you will see”, w tej kolejności.

Autor zmierzył ekran w prawdziwym Chromium: nic się nie przewija w bok przy 360 px, 1100 px ani 1280 px, żaden napis nie wychodzi poza ramkę, a przy 360 px z dotykiem każda kontrolka ma co najmniej 48 × 48 px. Recenzent, który obejrzał wszystkie jedenaście zrzutów, uznał, że zgadzają się z tymi liczbami. Czy ekran jest ładniejszy i czytelniejszy niż przed zmianą i czy stary Loop nie jest lepszy, oceniasz Ty na tych obrazach.

### Pod spodem

Wartości stopni biorą się z jednej małej funkcji, której teraz używa też ekran Postać, więc oba ekrany czytają te same liczby; nic w stanie gry ani w danych gry się nie zmieniło, a ekran dalej niczego nie kupuje.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

none

### Napraw albo przepuść

none

### Akceptujesz przez scalenie

Scalenie oznacza zgodę na te punkty; jeśli któryś nie pasuje, powiedz który.

1. Przepuściłeś w odpowiedzi, że nowy wygląd zmierzono tylko w Chromium (360 px z dotykiem, 1100 px i 1280 px, na zmyślonym koncie), a nie w Firefoksie ani na prawdziwym telefonie. Zauważyłeś, że Edge to Chromium, a układ to zwykła siatka i łamanie wierszy. Jeśli kolumny albo łamanie stopni zachowują się inaczej w innej przeglądarce, gracz zobaczy tam ściśnięty tekst już przy pierwszej wizycie, a naprawą będzie poprawka po tym, jak ktoś na to trafi. (Checks, 7)
2. Przepuściłeś, że przegląd całej zmiany przeczytał dwie decyzje tylko częściowo — tę o wspólnych kontrolkach i tę o skutkach i cenach gałęzi umiejętności: zmiana używa wspólnego przycisku bez zmian i bierze ceny z danych, nie zmieniając ich. (Checks, 4)
3. Tam, gdzie zadanie zostawiło wygląd autorowi, wybrał on, w ramach tego, co wybrałeś: (a) linia stopni to mała tabelka, każdy stopień to kawałek o dwóch liniach — „I · 1 pkt” nad „75 %” i najpierw „bez gałęzi” nad „70 %” — a kawałki łamią się między stopniami na wąskim ekranie, bo w jednej biegnącej linii małe rzymskie „I” czcionki gry czyta się jak kreskę „|”, a wartość, cyfra i cena zlewają się; to jedna linia wyższa na gałąź z liczbą, z tymi samymi słowami i danymi; (b) „3 gałęzie” stoi w kolorze tekstu drugorzędnego, w rozmiarze etykiety, jak liczniki obu obszarów, a nie w kolorze własnym wiersza; (c) najmniejsza szerokość kolumny Zrozumienia to 12 em, więc okno 1100 px pokazuje sześć kolumn, a nie „około ośmiu”, jak szacowało zadanie — przy dziewięciu kolumnach „Wytwórz — ognisko” i „Zapal — ognisko” łamały się na dwie linie, przy 12 em żadna; odstęp między ikoną a nazwą jest mniejszy, żeby „Wytwórz — ognisko” zmieściło się w kolumnie 142 px okna 1600 px; (d) wiersz drzewa nie dostaje jaśniejszego tła pod wskaźnikiem, tak jak wiersz na Postaci. Przy 1280 px najwęższa kolumna komputera ma 130 px i „Wytwórz — ognisko” dalej łamie się tam na dwie linie, jak przewidywał słaby punkt zadania. Drogi, których nie wybrał: jedna biegnąca linia stopni (rzymskie cyfry czytane jak kreski) i dziewięć kolumn przy 1100 px (nazwy się łamią).
4. Cykl napisał albo zmienił trzy wpisy fundamentu i jedna rzecz w nich jest własna cyklu: decyzja o ekranie Wiedza nazywa teraz cztery gałęzie bez liczby, nie trzy, bo dane gry mają czwartą („Ucisk”), a jej para przykładów dostała przypadki, których nie utrzyma żaden test — wiersz drzewa na całą szerokość obszaru z linią stopni w układzie telefonu oraz to, czym wiersz być nie może (wiersz szeroki na sam napis, linia stopni ukryta na telefonie). Notatka o tym, co ta decyzja odrzuca, mówi, że odrzuca wiersze z poziomem, wprawą, punktami i kupnem, a nie wspólny układ wiersza, jak wybrałeś. Reguła styleguide'u dla ekranu została przepisana, żeby mówiła to wszystko. Trzeci wpis to starsza notatka decyzji o ekranach gry: na Twoją odpowiedź jej lista odrzuconych dróg mówi teraz, że odrzuca te same wiersze z poziomem, wprawą, punktami i kupnem na dwóch ekranach, a nie układ wiersza drzewa wspólny dla obu ekranów. (Foundation entries)
5. Przypadki testów ekranu Wiedza, które cytują zdanie jego decyzji, zostały zacytowane od nowa w nowym brzmieniu, a dwa nowe przypadki cytują nowe zdania (linia stopni i gałąź bez liczby); test funkcji wartości został bez zmian. Żaden test niezmiennika nie został zmieniony, a kontrola fundamentu nie wymienia żadnego niezmiennika dla poprawionego zdania. (Foundation entries)
6. Ta poprawka odpowiedziała na Twoje odpowiedzi do dwóch punktów tej prośby — o starszej notatce decyzji i o skończonym katalogu roboczym wcześniejszego zadania — a cykl uznał, że zadanie nie wymagało tego, co one zmieniają; Twoje odpowiedzi do pozostałych dwóch punktów nie prosiły o nic do zrobienia.

## Koszt

Około 59 minut czasu pracy w chwili pisania, 118 milionów tokenów z pamięcią podręczną (90 milionów na najsilniejszym modelu, Opus 5.5; 28 milionów na Sonnet 5.5): pierwsza tura autora 22 minuty, jeden przegląd całej zmiany, jedna runda poprawki drobnej uwagi (przestarzałe słowa w teście) z przeglądem, krok zwrotny, który nie znalazł nic do poprawienia, oraz ta poprawka z przeglądem. Tabela etapów jest w zatwierdzonym zapisie, linkowana w *Course of the cycle*.

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo link do zapisu przeżywa tylko wtedy. Fundament czeka na przegląd przez 70 scaleń od ostatniego (tag `foundation-review/2026-11-13`); przegląd to skill `the-way-review-foundation`, uruchamiany w sesji w tym repozytorium. Backlog ma już wiersz „Przegląd fundamentu loop2”; nic w tej prośbie na to nie czeka.

</details>

## Technical changes

Five commits on top of the base `a49c5f63` (the return step made none; the process record is added in a commit that is removed at once, twice, the second time after correction 1):

- `de3bbbfa` — **the decision on the screen Wiedza**: its right-area paragraph rewritten in three sentences (the row across the area, a click anywhere opens it, the fold for the keyboard; the line of steps of an open branch, in both layouts; a branch with no number — four named — shows its description and prices only), its *Verification* and the pair of examples reworded from "row" to "fold" and extended, and its *Rejected* extended (the shared layout of the row is not what is rejected, and the ways not chosen from the task's questions 1, 2 and 7).
- `ad650416` — **the screen**: `src/browser/view/knowledge-screen.tsx` split into `Tree` and `Branch` components, with the row of a tree as a clickable row holding a shared button as its fold; `src/browser/view/knowledge-lines.ts` computes the line of steps of a branch (value with no step, then each step's numeral, price and value); `src/browser/view/character-skills.ts` gains the pure function `rankValue(preview, rank)` that `branchText` of the screen Postać now calls too, so both screens read the same numbers (floor at `minimum`, decimal comma); `src/browser/knowledge-screen.css` holds the row, the branch with its price column, the table of steps and the grid of columns of the Understanding (`repeat(auto-fill, minmax(min(12em, (100% − gap)/2), 1fr))`); the tests of `tests/view/knowledge-screen.test.mjs` and `tests/view/knowledge-lines.test.mjs`, seen failing before the code and passing after it.
- `ba1ccf8d` — **the styleguide rule "The screen Wiedza"** of `guidelines/styleguide-browser-view.md`: the first line of a branch with its prices at the right, the row of a tree as on Postać with no level, bar or points, the line of steps in both layouts, the things of the Understanding in as many columns of at least 12 em as the area holds and at least two; its "Good" and "Bad" examples stand on the screen as it now is.
- `b15ef813` — **the fix of a Minor finding of the review of the whole change**: the comment and the failure message of one test said "rows of the trees" where the buttons are now the folds; two lines in `tests/view/knowledge-screen.test.mjs`.
- `8877c742` — **correction 1, item 2 of your remarks**: one clause in the *Rejected* of the older decision note on the screens of the game, in `foundations/decisions.md` (+2 −1).

## Checks

1. **The final gate is the CI run on the request's last head.** The run on the head before correction 1, `265d41cf`, was green: [run 46016981062](https://github.com/mariusznazar/loop2/actions/runs/46016981062) (`tests.yml`, the one command of the tests), check `tests`, 5 m 52 s: 3557 of 3557 node tests, 0 failed, 0 cancelled, 0 skipped; the Python tests of four directories (89, 97, 254 and 278), each passed; `foundation_check.py` 0 errors; `check_instructions.py` `0 error, 1 warn, 124 info`, the one warning being `dead-path AGENTS.md:3 ~/.the-way/locations.json does not exist`, a fact of the machine of CI, not of this change. The run on the head after correction 1 has not finished at this writing; its result is written here when it ends. The cycle has no local time of it and runs no gate of its own.
2. **Tests failing before the change:** none; the base `a49c5f63` is a merge commit whose tree equals the tree of its second parent (`ec55915556f5325e6cdf56cc649719ed8175cb56`), so no gate ran on it, and the list was taken from the final gate of the earlier cycle, the CI run 46008420935 on the merged request #185, green (copy of its record added by `3ab7b7f2`); the known flaky test named in earlier cycles is `tests/transport.test.mjs:678`.
3. **The author's focused checks, each exit 0:** `npm test -- tests/view/knowledge-lines.test.mjs` (5; first run before the code exit 1) and `tests/view/knowledge-screen.test.mjs` (7; first run before the component exit 1, 3 of 7 failed), `tests/view/character-skills.test.mjs` (8), `tests/view/character-screen.test.mjs` (16), `tests/view/account-screen.test.mjs` (132); the invariant and quality tests `test_browser_view_focus_outline.py`, `test_browser_view_framework.py`, `test_browser_view_token_values.py`, `test_content_identifiers.py`, `test_cross_part_imports.py`, `tests/quality/test_function_and_file_size.py`, `tests/quality/test_quality_invariants.py`; `npx prettier --check` (first run reported two files, which `--write` fixed, then exit 0) and `npx eslint` on the changed files; `python -B .the-way/elements/common/foundation_check.py` 0 ("0 errors", also run by the orchestrator on the final tree without the switch that skips the test citations: exit 0, no `listed:` line); `python -B .the-way/instruction-files/check_instructions.py` 0 ("0 error, 0 warn, 110 info"). After the fix: `npm test -- tests/view/knowledge-screen.test.mjs` 0 (7), prettier 0, eslint 0.
4. **The reviewers' own runs:** the review of the whole change ran the focused tests (5, 7, 8 and 16 cases, exit 0), the size test on base and head (exit 0), the foundation check and the instruction check (exit 0), and one probe — it moved the click handler of the row onto the fold alone, `npm test -- tests/view/knowledge-screen.test.mjs` exit 1, reverted — to show that the test protects "a click anywhere on the row". The review of the fix ran no test and relied on the author's run.
5. **Own-work check and walk through the running game** (author, `npm run local` of the worktree, Chromium by Playwright CLI, windows 1600 × 1000, 1280 × 720, 360 × 740 with touch and 1100 × 800, a made-up local account, a composed state of 18 actions, 6 items, 2 creatures and all 9 trees): trees folded at entry, click on the name and on the empty middle of the row, Enter and Space on the fold with the focus staying on it and the ring drawn, the line of steps of a branch with a number and none for "Zwiad", the columns (2 × 142 px at 1600, 2 at 360, 6 at 1100), no scroll to the side and no text over a frame at 1280, 360 and 1100, no control under 48 px at 360 and 1100, the screen Postać writing the same numbers after the refactor, console errors 0 — all passed, nothing needed correcting. The widest step piece at 360 px ended at 326 px inside its branch's 339 px.
6. **Screenshots:** eleven, kept in the public repository `mariusznazar/screenshots`, branch `loop2/wyglad-ekranu-wiedzy`, commit `8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c`, directory `loop2/wyglad-ekranu-wiedzy/` (the two of the old Loop, taken from the notes of the project of 31 October, show no personal datum); none in this repository or in the record.
7. **Not run:** the full gate on the cycle's own system (CI is the final gate); StrykerJS (no simulation file changed); Firefox, Edge, a real Android phone; the screen of a game that knows nothing yet opened in a browser; trees of a game state reached by playing; the reviewer's own browser measurement at 360 px (items 1 and 2 of *You accept by merging*).
8. **Working copies left:** none — the base worktree and the clone of the screenshots repository that the author made, and the reviewer's two worktrees, were removed; the databases of the local starts under `.runs/local-start/` are the product's own files and stay.
9. **Directories of earlier tasks kept:** none — the first round left one merged directory standing, `task/kafelek-postaci-w-siedzibie` under `.runs/worktrees/` of the main copy; correction 1 removed it at your answer with the script of step 4, `python -B .the-way/task-cycle/remove_merged_worktrees.py --apply --target main`, exit 0, and the script lists no directory for a human decision.
10. **The form check, the private-paths check, the record copy, the image check and the remarks check:** the form check, `python -B .the-way/task-cycle/request_check.py .runs/task-cycles/wyglad-ekranu-wiedzy/request.md --task .runs/task-cycles/wyglad-ekranu-wiedzy/task_frozen.md`, exit 0, and the check of private paths on the description, `python -B .the-way/task-cycle/private_paths_check.py .runs/task-cycles/wyglad-ekranu-wiedzy/request.md`, exit 0, 0 listed: each run before the first publication and again before this edit (2 runs each). On the copy of the record (commit `f2d3d4cd62a9ebb995f90b0522e701b3682f6913`, removed by `265d41cf`): `python -B .the-way/task-cycle/private_paths_check.py docs/task-cycles/wyglad-ekranu-wiedzy` exit 0, 0 listed in 16 files (the first run exit 1, 31 listed; after one rewriting of every text file; 2 runs); `python -B .the-way/task-cycle/image_files_check.py docs/task-cycles/wyglad-ekranu-wiedzy` exit 0, 0 listed (2 runs, before and after the rewriting); `python -B .the-way/task-cycle/remarks_check.py` on the original exit 0 after one run of exit 1 (5 items appended to the process remarks), and on the copy exit 0, `5 reports, 5 items other than none, 0 not in the process remarks` (1 run). `cycle_stages.py` and `cycle_measures.py` ran with exit 0. No working copy of an agent stayed; what stays are the product's own `node_modules/` and `.runs/local-start/` (the database of the local start), and the one merged directory of an earlier task named in item 9.

## Foundation entries

- **D-416** (rows 1, 4, 5 of *Settlements to record*; the added parts of the pair of examples are the cycle's): the row of a tree on Wiedza spans its area and opens on a click anywhere, the keyboard reaching its small fold as on Postać; an open branch shows under its description, in both layouts, its value with no step and each step's value and price from the data of Postać's preview, and a branch with no number only its description and prices; its *Rejected* says that it rejects the rows of Postać with their level, practice, points and buying, not the shared layout of the row of a tree. The pair of examples, as the entry holds it, the added parts word for word:
  - complies (added): "and the row of a tree across the width of its area with the line of steps of each open branch under its description, as in the computer layout"
  - violates (added): "the row of a tree as wide as its text alone" and "the line of steps hidden in the phone layout"
  - the rest of the pair is the old pair reworded from "row" to "fold", as the task's *Decisions in play* asks.
- **D-280** (the human's remark of correction 1, item 2 of the request's *Fix or let through*; the clause is the cycle's wording of what the human asked): its *Rejected* now says that it rejects the same rows of skills on two screens, as in loop, with their level, practice, points and buying, not the layout of the row of a tree that the two screens share (D-416); nothing else of D-280 changed, and no test cites the touched words.
- **The styleguide rule "The screen Wiedza"** in `guidelines/styleguide-browser-view.md` (rows 2, 3 and 6; not a foundation entry): the first line of a branch is "name · n stopni" with the prices in a column at the right; the row of a tree looks as on Postać without level, bar and points; the things of the Understanding stand in as many columns of at least 12 em as the area holds, at least two; its "Good" and "Bad" examples stand on the screen after the change. No rule with *Decision* `none` was found.
- Tests that hold a sentence of D-416 by a line `decision:`: in `tests/view/knowledge-screen.test.mjs` the line for the right area re-quoted and two lines added (the open tree and the branch with no number), in `tests/view/knowledge-lines.test.mjs` the same two added; no `invariant:` line was altered, no invariant test, surface or *Violated* mark changed, and `foundation_check.py` without `--skip-test-citations` lists no invariant.
- No topical section of the decision log opened; no kept row tied to an entry already stated.

## Minor findings

1. **Minor, from the review of correction 1** (`foundations/decisions.md:4600`), polish: „The head of the rejected way still reads "the skill trees shown on two screens, as in loop", while D-416 has the screen Wiedza show "the skill trees to read". Taken alone, that head phrase rejects something D-416 does. The new clause after it ("with their level, practice, points and buying, which is what this rejects, not the layout of the row of a tree that the two screens share (D-416)") settles what is rejected, so no reader who reads the whole clause gets it wrong. A shorter head such as "the same rows of skills on two screens, as in loop", the wording of D-416's *Rejected*, would avoid the clash. The remark asked only for an added sentence, so this is polish and blocks nothing.” Not fixed: a Minor finding of a correction's review is not fixed, and nobody meets it in the game.

The earlier Minor finding within the task (M2, the stale words in a test) was fixed in `b15ef813` and passed its review.

## Findings outside the task's scope

1. **M1, Minor, from the review of the whole change** — now fixed in this request by correction 1 at your answer (commit `8877c742`, `PASS`); the reviewer's words stand in the record's report of the review of the whole change. The finding was: `foundations/decisions.md:4600` (the decision on the screens of the game and the moves between them, *Rejected*): „the skill trees shown on two screens, as in loop — the same rows on Postać and in Wiedza”. The change makes the row of a tree on Wiedza stand „as the row of a tree on the screen Postać” (the decision on Wiedza, second paragraph) and gives that decision's *Rejected* the word of row 5, that it rejects the rows of Postać with their level, practice, points and buying, „not the layout of the row of a tree that the two screens share”. That *Rejected* names the same rejected option with no such word. The task gave row 5 for exactly this risk („bez słowa w *Rejected* następny czytelnik D-416 może wziąć zestaw za to, co decyzja odrzuciła”, question 2's weak point); the same reader of that note can still take the shared layout for what it rejected. A *Rejected* binds nothing and the binding sentence of the decision on Wiedza now says the opposite explicitly, so the effect is a reader's doubt, not wrong behaviour — Minor. It lies outside the task: *Decisions in play* holds that note „Bez zmiany” and quotes only its binding sentence, and the author read only that sentence (a gap the orchestrator carried). Recommendation of the reviewer: put it to the human as one more word in that note's *Rejected*, the same as row 5, or leave it; "I would add the word, it costs one clause and closes the same doubt row 5 closed."
2. No check outside the task's parts failed in a cycle run.

## Course of the cycle

- **Task and sources:** the task `wyglad-ekranu-wiedzy` (item 20 of the plan of project 2 of loop2, depends on item 25, done): the screen Wiedza nicer and clearer than today, above all the skills, judged on the comparison of screenshots; the task document accepted on 2026-11-25 (the hash the plan's log quotes, `da37b5c9d934bd27`, is not the whole-file hash of the file read on 2026-11-27, `611c676c…`, whose method the log does not state; the content read answers every question 1–7 and holds nothing open); the base `a49c5f63` of `main`, later than the `97936c24` the task cites, and the data at it hold 9 trees and 18 branches, not 8 and 14, and four branches with no number, not three.
- **Process pin:** `6ed3cb364adedacea214d2a0df690cea32f2e72f`, not moved by this task.
- **Spec:** none written — the task's questions and settlements settle every entry, and what it leaves to the author (the arrangement of the steps on a phone, the least width of a column) is a choice of how to make what the task settles.
- **Route:** one author without a plan (the `the-way-author` agent on the strongest class, `opus`, the model the probe fixed, `claude-opus-5-5`), then the review of the whole change by a fresh reviewer on the same class (`PASS`, one Minor finding within the task and one outside), the fix of the one within the task and its review (`PASS`), then the return step (nothing to correct, no commit). **Correction 1** (your remarks of the comment on this request, in the record `reports/correction-1-remarks.md`, no reset of the branch): the author resumed added the clause to the older decision note, a fresh reviewer on `opus` passed it (`PASS 8877c742`, one Minor finding of polish), and the orchestrator removed the finished directory of the earlier task with `remove_merged_worktrees.py --apply`, exit 0.
- **Plan:** none.
- **Choices:** 2 rows of the questions table of the record (the orchestrator's own; the author's departures and choices stand in item 5 above and in its report): the worktree stands beside the repository, outside the main copy, because the session forbade writing in the main copy (Q1), and the difference between the plan's hash and the file's hash is noted and does not stop the cycle (Q2).
- **Blocking findings left:** none.
- **Record:** [the record of the cycle](https://github.com/mariusznazar/loop2/tree/f2d3d4cd62a9ebb995f90b0522e701b3682f6913/docs/task-cycles/wyglad-ekranu-wiedzy), commit `f2d3d4cd62a9ebb995f90b0522e701b3682f6913` (removed from the branch by `265d41cf`), with the [table of stages](https://github.com/mariusznazar/loop2/blob/f2d3d4cd62a9ebb995f90b0522e701b3682f6913/docs/task-cycles/wyglad-ekranu-wiedzy/stages.md) and the [questions table](https://github.com/mariusznazar/loop2/blob/f2d3d4cd62a9ebb995f90b0522e701b3682f6913/docs/task-cycles/wyglad-ekranu-wiedzy/cycle.md).
