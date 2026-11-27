**State: draft** — the change is made, reviewed and fixed; the CI run on this request has not been read yet, so the request stays a draft until it is; items 1 to 4 of "Fix or let through" wait for your answer.

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

1. The new look was measured only in Chromium, with a made-up account and a game state composed for the check, so it was never seen in Firefox or Edge, on a real phone, on the screen of a game that knows nothing yet (only unit tests hold that), or on trees reached by actually playing. If the grid of columns or the wrapping of the steps behaves differently in another browser, a player there would see crowded or cut-off text on the first visit. Running the checks in this request costs a session with a browser that starts and a round of review; undoing it, nothing. Making a task of it leaves them undone until someone does them; undoing it, nothing. Letting it through accepts the risk; undoing it later is a correction after a player meets it. I recommend letting it through, since the layout is made of the browsers' plain grid and wrapping, which the current ones all handle. Its weak point: the wrapping of the steps and the 48 px touch size were measured in one browser only. Run them in this request, make a task of it, or let it through?
   The steps of the check by hand, whose result you write down as a remark:
   1. Start the game locally by typing `npm run local` in the repository, open the address it prints in Firefox and log in with a test account.
   2. Open "Wiedza": the trees should stand as full-width rows with thin lines between them, the count on the right; click the empty middle of a row and the tree should open, click again and it should fold.
   3. Open "Walka bronią jednoręczną": "Mocniejszy cios" should show four steps with their values and prices, nothing cut off at the right edge.
   4. Narrow the window to about 360 px, or open the game on your phone: no scroll to the side, the things of the Understanding in two columns, the steps wrapping into rows.
   5. Repeat steps 2 to 4 in Edge.

   (Checks, 7)
2. One decision note of the game still lists, among the ways it rejected, "the same rows on Postać and in Wiedza", without saying what this change made clear in the note about the screen Wiedza: it rejects rows with the level, points and buying on two screens, not a layout of the row of a tree that the two screens share. Nobody meets this in the game; a person or an agent who reads that old note later may take the shared layout for what it rejected and undo it. The reviewer found it outside the task, and the task kept that note unchanged. Adding the clause in this request costs one clause and a round of correction with its review; undoing it, one more edit. Making a task of it costs a later session; undoing it, nothing. Letting it through costs nothing today, and the doubt stays in the note. I recommend adding it in this request, since the same doubt was closed in the other note for the same reason and it takes one clause. Its weak point: it changes a decision the task left unchanged. Add it in this request, make a task of it, or let it through? (Findings outside the task's scope, 1)
3. The review of the whole change read 15 of the 74 decisions of its selection whole and the rest through the index of its whole selection. Two it read only in part — the one on the shared controls and the one on the effects and prices of the skill branches — and it did not read the process's glossary, because the change uses no word of the process. The change uses the shared button as it is and takes the prices of the branches from the data without changing them, so the reviewer judged that nothing further bears on them. If one of those two says something the reviewer missed, it shows in a later change to a control or to the prices of the branches, not on this screen. Having a fresh reviewer read what stayed unread costs one more review of about ten minutes; undoing it, nothing. Making a task of it costs a later review; undoing it, nothing. Letting it through accepts a small chance of a missed point. I recommend letting it through, since the unread parts were not touched by this change. Its weak point: the reviewer's own judgment that nothing bears on them is the only evidence. Have it read in this request, make a task of it, or let it through? (Checks, 4)
4. The working folder of the previous task, which is already merged, still stands in the main copy of the repository. The cycle would normally remove it at its start, but you told this session to write nothing in the main copy, so the removal was not run. Nothing waits for it; the next cycle removes it by itself, and removing it by hand now costs nothing. Remove it now, make a task of it, or let it through? I recommend letting it through, since it is harmless and the next cycle removes it. Its weak point: it stays until a later cycle runs. (Checks, 9)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

5. Where the task left the look to the author, it chose, inside what you chose: (a) the line of steps is a small table, each step a piece of two lines — "I · 1 pkt" over "75 %" and "bez gałęzi" over "70 %" first — and the pieces wrap between steps on a narrow screen, because in one running line the small Roman "I" of the game's font reads as a bar "|" and the value, the numeral and the price run together; it is one line taller per branch with a number, with the same words and the same data; (b) "3 gałęzie" stands in the secondary text colour at label size, like the counters of the two areas, rather than in the row's own colour; (c) the least width of a column of the Understanding is 12 em, so the window of 1100 px shows six columns, not the "about eight" the task estimated — at nine columns "Wytwórz — ognisko" and "Zapal — ognisko" broke into two lines, at 12 em none does; the gap between an icon and its name is smaller so that "Wytwórz — ognisko" fits the 142 px column of the 1600 px window; (d) a row of a tree takes no lighter background under the pointer, as the row on Postać takes none. At 1280 px the narrowest computer column is 130 px, where "Wytwórz — ognisko" still breaks into two lines, as the task's weak point foresaw. Other ways it did not take: one running line of steps (Roman numerals read as bars), and nine columns at 1100 px (names break).
6. The cycle wrote or changed two foundation entries, and one thing in them is the cycle's own: the decision on the screen Wiedza now names four branches with no number, not three, because the game data hold a fourth ("Ucisk"), and its pair of examples gained the cases no test can hold — the row of a tree across the width of its area with the line of steps in the phone layout, and what it must not be (a row as wide as its text alone, a line of steps hidden on the phone). The note on what that decision rejects says it rejects rows with level, practice, points and buying, not the shared layout of the row, as you chose. The rule of the styleguide for the screen was rewritten to say all of this. (Foundation entries)
7. The cases of the tests of the screen Wiedza that quote a sentence of its decision were re-quoted to the new wording, and two new cases quote the new sentences (the line of steps and the branch with no number); the test of the value function stayed as it was. No test of an invariant was changed, and the foundation check lists no invariant for a corrected sentence. (Foundation entries)

## Cost

About 43 minutes of working time at this writing, 98 million tokens counted with cache (86 million on the strongest model, Opus 5.5; 12 million on Sonnet 5.5): the author's first turn 22 minutes, one review of the whole change, one fix round for a Minor finding (stale words in a test) with its review, and a return step that found nothing to correct and made no commit. The table of stages is in the committed record, linked under *Course of the cycle*.

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record survives only then. The foundation has waited for a review through 70 merges since the last review (the tag `foundation-review/2026-11-13`); the review is the skill `the-way-review-foundation`, started in a session in this repository. The backlog already holds the line "Przegląd fundamentu loop2"; nothing in this request waits for it.

<details>
<summary>W Twoim języku</summary>

**State: draft** — zmiana jest zrobiona, sprawdzona i poprawiona; przebieg CI na tej prośbie nie został jeszcze odczytany, więc prośba zostaje szkicem, dopóki go nie będzie; punkty 1–4 w „Napraw albo przepuść” czekają na Twoją odpowiedź.

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

1. Nowy wygląd zmierzono tylko w Chromium, na zmyślonym koncie i na stanie gry złożonym na potrzeby sprawdzenia, więc nikt nie widział go w Firefoksie ani Edge, na prawdziwym telefonie, na ekranie gry, która jeszcze nic nie zna (trzymają to tylko testy jednostkowe), ani na drzewach, do których doszło się grą. Jeśli siatka kolumn albo łamanie stopni zachowuje się inaczej w innej przeglądarce, gracz zobaczy tam ściśnięty albo ucięty tekst już przy pierwszej wizycie. Zrobienie tych sprawdzeń w tej prośbie kosztuje sesję z przeglądarką, która się uruchomi, i rundę przeglądu; cofnięcie — nic. Zrobienie z tego zadania zostawia je niezrobione, dopóki ktoś ich nie zrobi; cofnięcie — nic. Przepuszczenie przyjmuje ryzyko; cofnięcie później to poprawka po tym, jak gracz na nie trafi. Polecam przepuścić, bo układ składa się ze zwykłej siatki i łamania wierszy, które obsługują wszystkie obecne przeglądarki. Słaby punkt: łamanie stopni i rozmiar dotyku 48 px zmierzono tylko w jednej przeglądarce. Zrobić je w tej prośbie, zrobić z tego zadanie czy przepuścić?
   Kroki sprawdzenia ręcznego, którego wynik zapisujesz jako uwagę:
   1. Uruchom grę lokalnie, wpisując w repozytorium `npm run local`, otwórz wypisany adres w Firefoksie i zaloguj się kontem testowym.
   2. Otwórz „Wiedza”: drzewa mają stać jako wiersze na całą szerokość z cienkimi liniami między nimi, liczba po prawej; kliknij puste miejsce pośrodku wiersza — drzewo ma się otworzyć, kliknij jeszcze raz — zwinąć.
   3. Otwórz „Walka bronią jednoręczną”: „Mocniejszy cios” ma pokazać cztery stopnie z wartościami i cenami, nic nie ucięte przy prawym brzegu.
   4. Zwęź okno do około 360 px albo otwórz grę na telefonie: bez przewijania w bok, rzeczy Zrozumienia w dwóch kolumnach, stopnie łamią się na rzędy.
   5. Powtórz kroki 2–4 w Edge.

   (Checks, 7)
2. Jedna notatka decyzji w grze dalej wymienia wśród odrzuconych dróg „te same wiersze na Postaci i w Wiedzy”, nie mówiąc tego, co ta zmiana wyjaśniła w notatce o ekranie Wiedza: odrzuca wiersze z poziomem, punktami i kupnem na dwóch ekranach, a nie układ wiersza drzewa wspólny dla obu ekranów. W grze nikt na to nie trafi; osoba albo agent, który później przeczyta tę starą notatkę, może wziąć wspólny układ za to, co odrzuciła, i go cofnąć. Recenzent znalazł to poza zadaniem, a zadanie zostawiło tę notatkę bez zmian. Dopisanie zdania w tej prośbie kosztuje jedno zdanie i rundę poprawki z przeglądem; cofnięcie — jedna edycja więcej. Zadanie na później kosztuje późniejszą sesję; cofnięcie — nic. Przepuszczenie nie kosztuje dziś nic, a wątpliwość zostaje w notatce. Polecam dopisać w tej prośbie, bo tę samą wątpliwość zamknięto w drugiej notatce z tego samego powodu i to jedno zdanie. Słaby punkt: zmienia decyzję, którą zadanie zostawiło bez zmian. Dopisać w tej prośbie, zrobić z tego zadanie czy przepuścić? (Findings outside the task's scope, 1)
3. Przegląd całej zmiany przeczytał w całości 15 z 74 decyzji swojego wyboru, a resztę przez indeks całego wyboru. Dwie przeczytał tylko częściowo — tę o wspólnych kontrolkach i tę o skutkach i cenach gałęzi umiejętności — i nie czytał słownika procesu, bo zmiana nie używa żadnego słowa procesu. Zmiana używa wspólnego przycisku bez zmian i bierze ceny gałęzi z danych, nie zmieniając ich, więc recenzent uznał, że nic więcej ich nie dotyczy. Jeśli któraś z tych dwóch mówi coś, co recenzent pominął, wyjdzie to przy późniejszej zmianie kontrolki albo cen gałęzi, a nie na tym ekranie. Przeczytanie przez świeżego recenzenta tego, co zostało nieprzeczytane, kosztuje jeszcze jeden przegląd, około dziesięciu minut; cofnięcie — nic. Zadanie na później kosztuje późniejszy przegląd; cofnięcie — nic. Przepuszczenie przyjmuje małą szansę pominiętego punktu. Polecam przepuścić, bo nieprzeczytanych części ta zmiana nie dotyka. Słaby punkt: jedynym dowodem jest sąd samego recenzenta, że nic ich nie dotyczy. Dać do przeczytania w tej prośbie, zrobić z tego zadanie czy przepuścić? (Checks, 4)
4. Katalog roboczy poprzedniego zadania, już scalonego, dalej stoi w głównej kopii repozytorium. Cykl zwykle usuwa go na starcie, ale kazałeś tej sesji nic nie zapisywać w głównej kopii, więc usunięcia nie uruchomiono. Nic na niego nie czeka; następny cykl usunie go sam, a usunięcie ręczne teraz nic nie kosztuje. Usunąć teraz, zrobić z tego zadanie czy przepuścić? Polecam przepuścić, bo jest nieszkodliwy, a następny cykl go usunie. Słaby punkt: stoi, dopóki nie ruszy kolejny cykl. (Checks, 9)

### Akceptujesz przez scalenie

Scalenie oznacza zgodę na te punkty; jeśli któryś nie pasuje, powiedz który.

5. Tam, gdzie zadanie zostawiło wygląd autorowi, wybrał on, w ramach tego, co wybrałeś: (a) linia stopni to mała tabelka, każdy stopień to kawałek o dwóch liniach — „I · 1 pkt” nad „75 %” i najpierw „bez gałęzi” nad „70 %” — a kawałki łamią się między stopniami na wąskim ekranie, bo w jednej biegnącej linii małe rzymskie „I” czcionki gry czyta się jak kreskę „|”, a wartość, cyfra i cena zlewają się; to jedna linia wyższa na gałąź z liczbą, z tymi samymi słowami i danymi; (b) „3 gałęzie” stoi w kolorze tekstu drugorzędnego, w rozmiarze etykiety, jak liczniki obu obszarów, a nie w kolorze własnym wiersza; (c) najmniejsza szerokość kolumny Zrozumienia to 12 em, więc okno 1100 px pokazuje sześć kolumn, a nie „około ośmiu”, jak szacowało zadanie — przy dziewięciu kolumnach „Wytwórz — ognisko” i „Zapal — ognisko” łamały się na dwie linie, przy 12 em żadna; odstęp między ikoną a nazwą jest mniejszy, żeby „Wytwórz — ognisko” zmieściło się w kolumnie 142 px okna 1600 px; (d) wiersz drzewa nie dostaje jaśniejszego tła pod wskaźnikiem, tak jak wiersz na Postaci. Przy 1280 px najwęższa kolumna komputera ma 130 px i „Wytwórz — ognisko” dalej łamie się tam na dwie linie, jak przewidywał słaby punkt zadania. Drogi, których nie wybrał: jedna biegnąca linia stopni (rzymskie cyfry czytane jak kreski) i dziewięć kolumn przy 1100 px (nazwy się łamią).
6. Cykl napisał albo zmienił dwa wpisy fundamentu i jedna rzecz w nich jest własna cyklu: decyzja o ekranie Wiedza nazywa teraz cztery gałęzie bez liczby, nie trzy, bo dane gry mają czwartą („Ucisk”), a jej para przykładów dostała przypadki, których nie utrzyma żaden test — wiersz drzewa na całą szerokość obszaru z linią stopni w układzie telefonu oraz to, czym wiersz być nie może (wiersz szeroki na sam napis, linia stopni ukryta na telefonie). Notatka o tym, co ta decyzja odrzuca, mówi, że odrzuca wiersze z poziomem, wprawą, punktami i kupnem, a nie wspólny układ wiersza, jak wybrałeś. Reguła styleguide'u dla ekranu została przepisana, żeby mówiła to wszystko. (Foundation entries)
7. Przypadki testów ekranu Wiedza, które cytują zdanie jego decyzji, zostały zacytowane od nowa w nowym brzmieniu, a dwa nowe przypadki cytują nowe zdania (linia stopni i gałąź bez liczby); test funkcji wartości został bez zmian. Żaden test niezmiennika nie został zmieniony, a kontrola fundamentu nie wymienia żadnego niezmiennika dla poprawionego zdania. (Foundation entries)

## Koszt

Około 43 minut czasu pracy w chwili pisania, 98 milionów tokenów z pamięcią podręczną (86 milionów na najsilniejszym modelu, Opus 5.5; 12 milionów na Sonnet 5.5): pierwsza tura autora 22 minuty, jeden przegląd całej zmiany, jedna runda poprawki drobnej uwagi (przestarzałe słowa w teście) z przeglądem oraz krok zwrotny, który nie znalazł nic do poprawienia i nie zrobił commita. Tabela etapów jest w zatwierdzonym zapisie, linkowana w *Course of the cycle*.

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo link do zapisu przeżywa tylko wtedy. Fundament czeka na przegląd przez 70 scaleń od ostatniego (tag `foundation-review/2026-11-13`); przegląd to skill `the-way-review-foundation`, uruchamiany w sesji w tym repozytorium. Backlog ma już wiersz „Przegląd fundamentu loop2”; nic w tej prośbie na to nie czeka.

</details>

## Technical changes

Four commits on top of the base `a49c5f63` (the return step made none; the process record is added later, in a commit that is removed at once):

- `de3bbbfa` — **the decision on the screen Wiedza**: its right-area paragraph rewritten in three sentences (the row across the area, a click anywhere opens it, the fold for the keyboard; the line of steps of an open branch, in both layouts; a branch with no number — four named — shows its description and prices only), its *Verification* and the pair of examples reworded from "row" to "fold" and extended, and its *Rejected* extended (the shared layout of the row is not what is rejected, and the ways not chosen from the task's questions 1, 2 and 7).
- `ad650416` — **the screen**: `src/browser/view/knowledge-screen.tsx` split into `Tree` and `Branch` components, with the row of a tree as a clickable row holding a shared button as its fold; `src/browser/view/knowledge-lines.ts` computes the line of steps of a branch (value with no step, then each step's numeral, price and value); `src/browser/view/character-skills.ts` gains the pure function `rankValue(preview, rank)` that `branchText` of the screen Postać now calls too, so both screens read the same numbers (floor at `minimum`, decimal comma); `src/browser/knowledge-screen.css` holds the row, the branch with its price column, the table of steps and the grid of columns of the Understanding (`repeat(auto-fill, minmax(min(12em, (100% − gap)/2), 1fr))`); the tests of `tests/view/knowledge-screen.test.mjs` and `tests/view/knowledge-lines.test.mjs`, seen failing before the code and passing after it.
- `ba1ccf8d` — **the styleguide rule "The screen Wiedza"** of `guidelines/styleguide-browser-view.md`: the first line of a branch with its prices at the right, the row of a tree as on Postać with no level, bar or points, the line of steps in both layouts, the things of the Understanding in as many columns of at least 12 em as the area holds and at least two; its "Good" and "Bad" examples stand on the screen as it now is.
- `b15ef813` — **the fix of a Minor finding of the review of the whole change**: the comment and the failure message of one test said "rows of the trees" where the buttons are now the folds; two lines in `tests/view/knowledge-screen.test.mjs`.

## Checks

1. **The final gate** is the CI run on the request's last head, `.github/workflows/tests.yml` on the event `pull_request` into `main`; the cycle runs no full gate on its own system and has no local time of it. At this writing the run has not started, and its link, each check by name and its conclusion are written here when it ends.
2. **Tests failing before the change:** none; the base `a49c5f63` is a merge commit whose tree equals the tree of its second parent (`ec55915556f5325e6cdf56cc649719ed8175cb56`), so no gate ran on it, and the list was taken from the final gate of the earlier cycle, the CI run 46008420935 on the merged request #185, green (copy of its record added by `3ab7b7f2`); the known flaky test named in earlier cycles is `tests/transport.test.mjs:678`.
3. **The author's focused checks, each exit 0:** `npm test -- tests/view/knowledge-lines.test.mjs` (5; first run before the code exit 1) and `tests/view/knowledge-screen.test.mjs` (7; first run before the component exit 1, 3 of 7 failed), `tests/view/character-skills.test.mjs` (8), `tests/view/character-screen.test.mjs` (16), `tests/view/account-screen.test.mjs` (132); the invariant and quality tests `test_browser_view_focus_outline.py`, `test_browser_view_framework.py`, `test_browser_view_token_values.py`, `test_content_identifiers.py`, `test_cross_part_imports.py`, `tests/quality/test_function_and_file_size.py`, `tests/quality/test_quality_invariants.py`; `npx prettier --check` (first run reported two files, which `--write` fixed, then exit 0) and `npx eslint` on the changed files; `python -B .the-way/elements/common/foundation_check.py` 0 ("0 errors", also run by the orchestrator on the final tree without the switch that skips the test citations: exit 0, no `listed:` line); `python -B .the-way/instruction-files/check_instructions.py` 0 ("0 error, 0 warn, 110 info"). After the fix: `npm test -- tests/view/knowledge-screen.test.mjs` 0 (7), prettier 0, eslint 0.
4. **The reviewers' own runs:** the review of the whole change ran the focused tests (5, 7, 8 and 16 cases, exit 0), the size test on base and head (exit 0), the foundation check and the instruction check (exit 0), and one probe — it moved the click handler of the row onto the fold alone, `npm test -- tests/view/knowledge-screen.test.mjs` exit 1, reverted — to show that the test protects "a click anywhere on the row". The review of the fix ran no test and relied on the author's run.
5. **Own-work check and walk through the running game** (author, `npm run local` of the worktree, Chromium by Playwright CLI, windows 1600 × 1000, 1280 × 720, 360 × 740 with touch and 1100 × 800, a made-up local account, a composed state of 18 actions, 6 items, 2 creatures and all 9 trees): trees folded at entry, click on the name and on the empty middle of the row, Enter and Space on the fold with the focus staying on it and the ring drawn, the line of steps of a branch with a number and none for "Zwiad", the columns (2 × 142 px at 1600, 2 at 360, 6 at 1100), no scroll to the side and no text over a frame at 1280, 360 and 1100, no control under 48 px at 360 and 1100, the screen Postać writing the same numbers after the refactor, console errors 0 — all passed, nothing needed correcting. The widest step piece at 360 px ended at 326 px inside its branch's 339 px.
6. **Screenshots:** eleven, kept in the public repository `mariusznazar/screenshots`, branch `loop2/wyglad-ekranu-wiedzy`, commit `8bbd785817bdc68e1cec6aa7634f0b6c82ab1a6c`, directory `loop2/wyglad-ekranu-wiedzy/` (the two of the old Loop, taken from the notes of the project of 31 October, show no personal datum); none in this repository or in the record.
7. **Not run:** the full gate on the cycle's own system (CI is the final gate); StrykerJS (no simulation file changed); Firefox, Edge, a real Android phone; the screen of a game that knows nothing yet opened in a browser; trees of a game state reached by playing; the reviewer's own browser measurement at 360 px (item 1 above; item 3 for the unread decisions).
8. **Working copies left:** none — the base worktree and the clone of the screenshots repository that the author made, and the reviewer's two worktrees, were removed; the databases of the local starts under `.runs/local-start/` are the product's own files and stay.
9. **Directories of earlier tasks kept:** the script of the cycle's start listed none for a human decision; one merged one, `task/kafelek-postaci-w-siedzibie` under `.runs/worktrees/` of the main copy, was left standing because the removal was not applied (item 4).
10. **The form check, the private-paths check, the record copy, the image check and the remarks check:** written when the record's copy is committed.

## Foundation entries

- **D-416** (rows 1, 4, 5 of *Settlements to record*; the added parts of the pair of examples are the cycle's): the row of a tree on Wiedza spans its area and opens on a click anywhere, the keyboard reaching its small fold as on Postać; an open branch shows under its description, in both layouts, its value with no step and each step's value and price from the data of Postać's preview, and a branch with no number only its description and prices; its *Rejected* says that it rejects the rows of Postać with their level, practice, points and buying, not the shared layout of the row of a tree. The pair of examples, as the entry holds it, the added parts word for word:
  - complies (added): "and the row of a tree across the width of its area with the line of steps of each open branch under its description, as in the computer layout"
  - violates (added): "the row of a tree as wide as its text alone" and "the line of steps hidden in the phone layout"
  - the rest of the pair is the old pair reworded from "row" to "fold", as the task's *Decisions in play* asks.
- **The styleguide rule "The screen Wiedza"** in `guidelines/styleguide-browser-view.md` (rows 2, 3 and 6; not a foundation entry): the first line of a branch is "name · n stopni" with the prices in a column at the right; the row of a tree looks as on Postać without level, bar and points; the things of the Understanding stand in as many columns of at least 12 em as the area holds, at least two; its "Good" and "Bad" examples stand on the screen after the change. No rule with *Decision* `none` was found.
- Tests that hold a sentence of D-416 by a line `decision:`: in `tests/view/knowledge-screen.test.mjs` the line for the right area re-quoted and two lines added (the open tree and the branch with no number), in `tests/view/knowledge-lines.test.mjs` the same two added; no `invariant:` line was altered, no invariant test, surface or *Violated* mark changed, and `foundation_check.py` without `--skip-test-citations` lists no invariant.
- No topical section of the decision log opened; no kept row tied to an entry already stated.

## Minor findings

none — the one Minor finding within the task that the review of the whole change gave (M2: the comment at `tests/view/knowledge-screen.test.mjs:313` and the message at line 344 said "rows of the trees" where the buttons are now the folds) was fixed in `b15ef813` and the fix passed its review (`PASS b15ef813`, no new finding).

## Findings outside the task's scope

1. **M1, Minor, from the review of the whole change** (no slice; the route has none): `foundations/decisions.md:4600` (the decision on the screens of the game and the moves between them, *Rejected*): „the skill trees shown on two screens, as in loop — the same rows on Postać and in Wiedza”. The change makes the row of a tree on Wiedza stand „as the row of a tree on the screen Postać” (the decision on Wiedza, second paragraph) and gives that decision's *Rejected* the word of row 5, that it rejects the rows of Postać with their level, practice, points and buying, „not the layout of the row of a tree that the two screens share”. That *Rejected* names the same rejected option with no such word. The task gave row 5 for exactly this risk („bez słowa w *Rejected* następny czytelnik D-416 może wziąć zestaw za to, co decyzja odrzuciła”, question 2's weak point); the same reader of that note can still take the shared layout for what it rejected. A *Rejected* binds nothing and the binding sentence of the decision on Wiedza now says the opposite explicitly, so the effect is a reader's doubt, not wrong behaviour — Minor. It lies outside the task: *Decisions in play* holds that note „Bez zmiany” and quotes only its binding sentence, and the author read only that sentence (a gap the orchestrator carried). Recommendation of the reviewer: put it to the human as one more word in that note's *Rejected*, the same as row 5, or leave it; "I would add the word, it costs one clause and closes the same doubt row 5 closed." (Item 2 of *Fix or let through*.)
2. No check outside the task's parts failed in a cycle run.

## Course of the cycle

- **Task and sources:** the task `wyglad-ekranu-wiedzy` (item 20 of the plan of project 2 of loop2, depends on item 25, done): the screen Wiedza nicer and clearer than today, above all the skills, judged on the comparison of screenshots; the task document accepted on 2026-11-25 (the hash the plan's log quotes, `da37b5c9d934bd27`, is not the whole-file hash of the file read on 2026-11-27, `611c676c…`, whose method the log does not state; the content read answers every question 1–7 and holds nothing open); the base `a49c5f63` of `main`, later than the `97936c24` the task cites, and the data at it hold 9 trees and 18 branches, not 8 and 14, and four branches with no number, not three.
- **Process pin:** `6ed3cb364adedacea214d2a0df690cea32f2e72f`, not moved by this task.
- **Spec:** none written — the task's questions and settlements settle every entry, and what it leaves to the author (the arrangement of the steps on a phone, the least width of a column) is a choice of how to make what the task settles.
- **Route:** one author without a plan (the `the-way-author` agent on the strongest class, `opus`, the model the probe fixed, `claude-opus-5-5`), then the review of the whole change by a fresh reviewer on the same class (`PASS`, one Minor finding within the task and one outside), the fix of the one within the task and its review (`PASS`), then the return step (nothing to correct, no commit).
- **Plan:** none.
- **Choices:** 2 of the orchestrator's own and the author's choices of how to make the change (its report, "Choices" and "Departures"); the orchestrator's in the questions table of the record: the worktree stands beside the repository, outside the main copy, because the session forbade writing in the main copy (Q1), and the difference between the plan's hash and the file's hash is noted and does not stop the cycle (Q2).
- **Blocking findings left:** none.
- **Record:** the link by the SHA of the commit that adds the copy of the record is written here after that commit.
