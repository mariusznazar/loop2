**State: draft** — the final test run (CI on the last head) has not finished yet; three items below wait for your answer

## What you will see

The game now has two layouts and one threshold between them. A window 1280 px wide or wider shows the layout you know, unchanged. Every narrower window — a phone, and also a narrow window of a computer — shows the phone layout, made for a phone held upright with a page 360 px wide: one column, nothing scrolls to the side (not even inside a frame), no text crosses the border of its frame, and everything is done by a finger. The login card with all four forms, the waiting screens, the menu bar with the account menu, Siedziba, Postać, Mapy, Programy with the editor, Wiedza, the screen of a map run, the end-of-run window and the owner panel's list of accounts were each checked at 360 px and fit. I played the whole loop of the project's success signal by taps alone at 360 px in Chromium: sign up and sign in, write and change a program, send a map run and an earning loop, read the report of the return, take the practice, buy a branch of a skill tree. Real Chrome on a real Android phone is not covered (you try that after the merge, on the test server).

What changed besides the layout, in the order of the task:

- The names of the cells of the pick of actions („Wytwórz”, „Eksploruj”, „Obchód”, „Wytwórz — ognisko”, „Zapal — ognisko”) stay inside their frames at 360 px and, on the screen of a map run, at 1100 px (the repair of the earlier request, taken over).
- The scene of a map run is drawn at the size of its picture (336 × 152) in the phone layout, so it is never scaled by a fraction; from a window 707 px wide it has the larger size, 672 × 304, which the computer layout keeps. At 360 px nothing of it is cropped. The plaques of a discovery are drawn smaller there so that they do not cover one another.
- A rule group has „↑” and „↓” in its header, like a rule, in both layouts; dragging by the handle stays for the mouse.
- A tap on a tile of the drawing of the map marks its row in the table of revealed tiles and the line under the drawing shows that tile; a tap elsewhere takes the mark off. Hovering with a mouse works as before.
- The destructive buttons („Usuń”, „Zakończ”, „Restart” and the like) have red text already at rest, and get the lighter background under the pointer.
- In the phone layout every control is at least 48 px high and wide; on a touch screen the highlight no longer stays on a button after a tap.

The screenshots, all at a page 360 px wide except the last (1100 px):

![Login card, sign in](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/01a-login-signin-360.png?raw=true)
![Login card, sign up](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/01b-login-signup-360.png?raw=true)
![Login card, forgotten password](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/01c-login-forgot-360.png?raw=true)
![Login card, new password](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/01d-login-newpassword-360.png?raw=true)
![Login card with the credits open](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/01e-login-credits-open-360.png?raw=true)
![A waiting screen](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/02-waiting-screen-360.png?raw=true)
![Menu bar with the account menu open](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/03-menu-konto-360.png?raw=true)
![Menu bar with the account menu of an owner](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/03b-menu-konto-owner-360.png?raw=true)
![Siedziba with its picture band](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/04-siedziba-360.png?raw=true)
![Siedziba with the report of a return](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/04b-siedziba-return-report-360.png?raw=true)
![Postać](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/05-postac-360.png?raw=true)
![Postać with a tree open](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/05b-postac-tree-open-360.png?raw=true)
![Mapy, the list of maps](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/06a-mapy-list-360.png?raw=true)
![Mapy, the card of a map](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/06b-mapy-card-360.png?raw=true)
![Programy, the list of programs](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/07a-programs-list-360.png?raw=true)
![Programy, the editor with a rule open](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/07b-programs-editor-360.png?raw=true)
![Wiedza](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/08-wiedza-360.png?raw=true)
![The screen of a map run with the plaque of a discovery and the badge over the mage's head](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/09-run-discovery-360.png?raw=true)
![End-of-run window after a death](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/10a-end-window-death-360.png?raw=true)
![End-of-run window after a solved map](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/10b-end-window-solved-360.png?raw=true)
![The owner panel's list of accounts](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/11-owner-accounts-360.png?raw=true)
![The screen of a map run at 1100 px with the pick of actions open](https://github.com/mariusznazar/screenshots/blob/e8a16687a167c93268f9aa8ef2b987f740617ed7/loop2/uklad-na-telefon/12-run-pick-czynnosc-1100.png?raw=true)

### Underneath

The phone rules stand in blocks that apply below 1280 px, after the computer rules they change, so the computer layout is untouched; the foundation now states the two layouts and their one threshold, and the guide to the look of the screens carries the rules by which the next screen tasks design in both layouts.

## For you to decide

### Needed from you

none

### Fix or let through

1. The checks in the browser did not reach a few places, and one thing is known to misbehave in a way you can only judge on a real phone. Not reached: the moment right after a successful sign-in, the sentence above the login card, the card that says something in the game broke, the real links of the emails, a real discovery band's wiring (its stylesheet was checked on a copy of the element), a map other than 4 × 4, and the height of the end-of-run window on Chrome on Android with its address bar shown (the new rule uses the unit of the visible height, which Chromium's emulation cannot tell from the old one). Known: a tap at the very centre of a rule's row in the editor at 360 px lands on the small „↑” button next to it and moves the rule instead of opening it, because the phone's browser sends a tap to the nearest control; a tap on the rule's text or on its empty strip further away opens it. If one of these is wrong, you meet it on the first evening you play on the phone. Checking it in this request costs a session on a real phone (which the task already puts after the merge, on the test server) and a correction round; undoing it, nothing. Making a task of the tap on a row costs a later task (a row with more room around its buttons). Letting it through accepts the risk until you try. I recommend letting it through and trying the steps below after the merge, since the task chose to test on the phone after the merge. Its weak point: a mis-tap in the editor is the first thing you will meet, and it costs a round of correction. Check it now, make a task of it, or let it through?
   The steps of the check by hand, whose result you write down as a remark:
   1. On the phone, in Chrome, open the test server and sign in; open Programy and the editor.
   2. Tap the middle of a rule's row and then its text: the rule should open each time; note when „↑” fires instead.
   3. Open the screen of a map run, tap Zakończ and read the whole question: its buttons should be in sight with the address bar shown.
   (Checks, 2)
2. Two small faults of looks were left because they are cheap to live with. The greyed reason inside a cell of the pick of actions („gałąź niewykupiona”) breaks inside a word at 360 px, though it stays inside its frame; and after a tap, the lighter background still stays on the rows of the lists of maps and programs, on the rows of a program's rules and on the rows „Teraz” and „Potem” (the new rule that drops it covers the buttons and the menu, not these rows, whose backgrounds carry state). If you meet them they look careless but do nothing wrong. Fixing them in this request costs a correction round and one review; undoing it, nothing. Making a task of them costs a later small task. Letting them through costs nothing today. I recommend letting them through, since nothing in the success signal depends on them. Their weak point: the stuck background on the rule rows can mislead about which rule is selected. Fix them now, make a task of them, or let them through? (Minor findings, 2 and 3)
3. The review of the whole change read only a part of what it had selected: of about 119 decisions in its index it read 10 whole, and the index itself only in part. A second reading found a stale sentence of the foundation that the first one had missed (the screen Mapy placed on the left and on the right); the second reviewer's own search found no other such sentence, but the first reviewer's unread decisions were not all read by anyone. If a sentence of the foundation still says something false about the phone layout, the next task that designs a screen reads it as binding. Having a fresh reviewer read the rest costs about half an hour and a round of correction if it finds something; undoing it, nothing. Making a task of it leaves the gap standing. Letting it through accepts that gap on the main branch. I recommend letting it through, since the return step's search for such sentences was repeated by placement words and found nothing more. Its weak point: that search finds only sentences with those words. Have the rest read, make a task of it, or let it through? (Checks, 3)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

4. The least size of a control in the phone layout is 48 px. The task asked for a value from a source the cycle cites; I took Android's own accessibility guidance (48 × 48 dp, read as 48 px), since the phone is Chrome on Android. The other ways were 44 px (Apple, WCAG's enhanced target), a little shorter, or 24 px, which you rejected. A link inside a running sentence keeps the size of its text, since a 48 px target would break the line; a link that stands alone as a control holds the 48 px. The credits' links and one link in the sentence of a waiting map run are therefore smaller than 48 px.
5. The scene of a map run stands at the size of its picture in the phone layout and takes the padding of its frame, so at 360 px nothing is cropped (an even crop would have cut the tail of a wolf standing at the right edge). It gets the larger size from 707 px, which counts a classic scrollbar; between 672 and 706 px a browser without a scrollbar shows the smaller scene where the larger would fit. The plaques of a discovery are drawn smaller (20 px with a 16 px icon) there so that two of them do not cover each other; the badge over the mage's head and the flying icon keep their sizes, so at the small scene the badge looks large beside the mage. You judge the look on the screenshot of the map run.
6. The line under the drawing of the map gives the tapped tile as it gives the hovered one, and a tap marks a row only with a finger: a click of a mouse changes nothing, as before. The arrows of a rule group are off on the first group („↑”) and on the last („↓”), like a rule's arrows.
7. The page's side padding in the phone layout is 8 px and the padding of an area 12 px; the menu bar wraps, so on a phone the account button stands on its own row; the end-of-run window is as tall as the window less the menu bar and the room above it, so its buttons stay in sight; the table of revealed tiles puts the state of a campfire on a line of its own under a row's numbers.
8. New entries the foundation did not have at the task: the sentence about a link inside a running sentence, together with its reason and two ways rejected that I weighed myself — no human weighed them, and the template of decisions says such ways do not enter the rejected list, so say if you want them removed; a short account of the source of the 48 px (Android's text, quoted); a short account of why a window's width in a media query counts a scrollbar (the W3C text, quoted); two terms of the glossary, "phone layout" (the look in every window narrower than 1280 px, a computer's too) and "computer layout"; an added clause in the decision about Programy (the editor stands under the list in the phone layout); and corrections of the decisions about Mapy, about the destructive button and about the hover on the drawing so that they are true in both layouts. (Foundation entries)
9. The skill that tells an agent how to play the game in a browser now also says how to check the phone layout (Chromium, 360 px, touch), how to tap a tile of the drawing, how to give a local account the owner role and how to compose a character in an earning loop; the guide to the look of the screens has four new rules (the two layouts and their one threshold, nothing scrolling to the side, everything by touch with the 48 px, how a change is checked in both layouts).
10. Tests that hold a sentence of a decision by a quotation: the quoted wording was updated in the tests of the program editor, the rule editor, the screen of a map run, the list of revealed tiles, the area of the world and the picture of the scene, plus one quotation of the destructive button in a test of Siedziba; new cases hold the arrows of a group, the tap on a tile, the destructive button at rest and the names of the cells. The foundation check lists no corrected sentence whose test was left as it was.
11. The phone layout gets no permanent test: the test environment does not apply a layout rule of the phone's width, so only checks in a browser and the screenshots see it.

## Cost

About 4 h 37 min of working time (1 h 42 min of it waiting for tools), 373 million tokens counted with cached input (365 million cached): Sonnet 233 million, Opus 118 million (the plan, the reviews and the fix of the whole change), Haiku 22 million (five small slices). One round of fix after the review of the whole change and one after the review of the return step, each reviewed once. The table of stages is in the committed record, `stages.md`, linked below under *Course of the cycle*.

## How to merge

Merge in a way that keeps the commits (a merge commit, not a squash or a rebase): the link to the record of the cycle survives only then. The merge deploys the change to the test server, where you try the loop on the phone, as the task decided.

<details>
<summary>W Twoim języku</summary>

**Stan: wersja robocza** — końcowy przebieg testów (CI na ostatniej głowie) jeszcze się nie skończył; trzy punkty niżej czekają na Twoją odpowiedź

## Co zobaczysz

Gra ma teraz dwa układy i jeden próg między nimi. Okno szerokie na 1280 px albo więcej pokazuje układ, który znasz, bez zmian. Każde węższe okno — telefon, ale też wąskie okno komputera — pokazuje układ telefonu, projektowany pod telefon trzymany pionowo ze stroną szeroką na 360 px: jedna kolumna, nic nie przewija się w bok (także w ramkach), żaden napis nie wychodzi poza ramkę, a wszystko robi się palcem. Kartę logowania ze wszystkimi czterema formularzami, ekrany oczekiwania, pasek menu z menu konta, Siedzibę, Postać, Mapy, Programy z edytorem, Wiedzę, ekran przejścia, okno końca przejścia i listę kont panelu właściciela sprawdziłem przy 360 px i wszystko się mieści. Całą pętlę sygnału sukcesu projektu przeszedłem samym dotykiem przy 360 px w Chromium: założenie konta i logowanie, pisanie i zmiana programu, puszczenie przejścia i pętli, odczyt raportu z powrotu, odbiór wprawy, kupno gałęzi drzewka. Prawdziwy Chrome na prawdziwym telefonie z Androidem nie jest sprawdzony (robisz to po scaleniu, na serwerze testowym).

Co jeszcze się zmieniło, w kolejności zadania:

- Napisy komórek wyboru czynności („Wytwórz”, „Eksploruj”, „Obchód”, „Wytwórz — ognisko”, „Zapal — ognisko”) mieszczą się w ramkach przy 360 px i, na ekranie przejścia, przy 1100 px (naprawa z wcześniejszej prośby, przejęta).
- Scena przejścia stoi w układzie telefonu w wielkości swojego obrazka (336 × 152), więc nigdy nie jest skalowana o ułamek; od okna szerokiego na 707 px ma większą wielkość, 672 × 304, którą zachowuje układ komputera. Przy 360 px nic z niej nie jest przycięte. Płytki odkrycia są tam rysowane mniejsze, żeby na siebie nie nachodziły.
- Grupa reguł ma w nagłówku „↑” i „↓”, jak reguła, w obu układach; przeciąganie uchwytem zostaje dla myszy.
- Dotknięcie kafelka rysunku mapy zaznacza jego wiersz w tabeli odkrytych kafelków, a linia pod rysunkiem pokazuje ten kafelek; dotknięcie gdzie indziej zdejmuje zaznaczenie. Najechanie myszą działa jak dotąd.
- Przyciski niszczące („Usuń”, „Zakończ”, „Restart” i podobne) mają czerwony tekst już w spoczynku, a pod kursorem dostają jaśniejsze tło.
- W układzie telefonu każda kontrolka ma co najmniej 48 px wysokości i szerokości; na ekranie dotykowym jaśniejsze tło nie zostaje już na przycisku po dotknięciu.

Zrzuty stoją wyżej, w angielskiej części opisu.

### Pod spodem

Reguły telefonu stoją w blokach, które działają poniżej 1280 px, po regułach komputera, które zmieniają, więc układ komputera jest nietknięty; fundament opisuje teraz dwa układy i ich jeden próg, a przewodnik po wyglądzie ekranów niesie zasady, według których kolejne zadania o ekranach projektują w obu układach.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

none

### Napraw albo przepuść

1. Sprawdzenia w przeglądarce nie dotarły w kilka miejsc, a jedno zachowanie może zawodzić tak, że ocenisz je tylko na prawdziwym telefonie. Nie dotarłem do: chwili tuż po udanym logowaniu, zdania nad kartą logowania, karty „coś w grze się zepsuło”, prawdziwych linków z maili, prawdziwego paska odkrycia (sprawdziłem tylko jego arkusz na kopii elementu), mapy innej niż 4 × 4 i wysokości okna końca przejścia w Chrome na Androidzie z widocznym paskiem adresu (nowa reguła używa jednostki widocznej wysokości, której emulacja Chromium nie odróżnia od starej). Wiadomo: dotknięcie samego środka wiersza reguły w edytorze przy 360 px trafia w sąsiedni mały przycisk „↑” i przesuwa regułę zamiast ją otworzyć, bo przeglądarka telefonu kieruje dotknięcie do najbliższej kontrolki; dotknięcie tekstu reguły albo pustego paska dalej od przycisku ją otwiera. Jeśli któraś z tych rzeczy jest zła, spotkasz ją już pierwszego wieczoru grania na telefonie. Sprawdzenie tego w tej prośbie kosztuje sesję na prawdziwym telefonie (którą zadanie i tak stawia po scaleniu, na serwerze testowym) i rundę poprawki; cofnięcie nic nie kosztuje. Zadanie na dotknięcie wiersza kosztuje późniejsze zadanie (wiersz z większym luzem wokół przycisków). Przepuszczenie przyjmuje ryzyko do chwili, gdy sprawdzisz. Polecam przepuścić i zrobić kroki niżej po scaleniu, bo zadanie wybrało test na telefonie po scaleniu. Słaby punkt: pomyłkowe dotknięcie w edytorze to pierwsza rzecz, którą spotkasz, i kosztuje rundę poprawki. Sprawdzić teraz, zrobić zadanie czy przepuścić?
   Kroki sprawdzenia ręcznego, którego wynik zapisujesz jako uwagę:
   1. Na telefonie, w Chrome, otwórz serwer testowy i zaloguj się; otwórz Programy i edytor.
   2. Dotknij środka wiersza reguły, a potem jej tekstu: reguła powinna się otworzyć za każdym razem; zanotuj, kiedy zamiast tego działa „↑”.
   3. Otwórz ekran przejścia, dotknij Zakończ i przeczytaj całe pytanie: jego przyciski powinny być w zasięgu wzroku z widocznym paskiem adresu.
   (Checks, 2)
2. Dwie drobne usterki wyglądu zostawiłem, bo łatwo z nimi żyć. Wyszarzony powód w komórce wyboru czynności („gałąź niewykupiona”) łamie się w środku słowa przy 360 px, choć zostaje w ramce; a po dotknięciu jaśniejsze tło dalej zostaje na wierszach list map i programów, na wierszach reguł programu i na wierszach „Teraz” i „Potem” (nowa reguła, która je zdejmuje, obejmuje przyciski i menu, nie te wiersze, których tła niosą stan). Jeśli na nie trafisz, wyglądają niedbale, ale nic nie psują. Poprawa w tej prośbie kosztuje rundę poprawki i jeden przegląd; cofnięcie nic nie kosztuje. Zadanie na nie kosztuje późniejsze małe zadanie. Przepuszczenie nic dziś nie kosztuje. Polecam przepuścić, bo nic z sygnału sukcesu od nich nie zależy. Słaby punkt: zalegające tło na wierszach reguł może wprowadzać w błąd, która reguła jest wybrana. Poprawić teraz, zrobić zadanie czy przepuścić? (Minor findings, 2 i 3)
3. Przegląd całej zmiany przeczytał tylko część wybranego materiału: z około 119 decyzji w swoim indeksie przeczytał 10 w całości, a sam indeks tylko częściowo. Drugi przegląd znalazł nieaktualne zdanie fundamentu, które pierwszy przeoczył (ekran Mapy ustawiony po lewej i po prawej); własne wyszukiwanie drugiego recenzenta nie znalazło innych takich zdań, ale nieprzeczytanych decyzji pierwszego recenzenta nikt w całości nie przeczytał. Jeśli jakieś zdanie fundamentu mówi jeszcze coś nieprawdziwego o układzie telefonu, następne zadanie projektujące ekran odczyta je jako wiążące. Przeczytanie reszty przez świeżego recenzenta kosztuje około pół godziny i rundę poprawki, jeśli coś znajdzie; cofnięcie nic nie kosztuje. Zadanie na to zostawia lukę. Przepuszczenie przyjmuje tę lukę na głównej gałęzi. Polecam przepuścić, bo wyszukiwanie takich zdań po słowach miejsca powtórzono i nic więcej nie znalazło. Słaby punkt: takie wyszukiwanie znajduje tylko zdania z tymi słowami. Przeczytać resztę, zrobić zadanie czy przepuścić? (Checks, 3)

### Akceptujesz przez scalenie

Scalenie akceptuje te punkty; jeśli któryś Ci nie odpowiada, napisz który.

4. Najmniejszy rozmiar kontrolki w układzie telefonu to 48 px. Zadanie prosiło o wartość ze źródła, które cykl cytuje; wziąłem własne wytyczne Androida o dostępności (48 × 48 dp, czytane jako 48 px), bo telefon to Chrome na Androidzie. Inne drogi to 44 px (Apple, rozszerzony cel WCAG), nieco niższe kontrolki, albo 24 px, które odrzuciłeś. Link wewnątrz toczącego się zdania zachowuje rozmiar swojego tekstu, bo cel 48 px łamałby linię tekstu; link stojący sam jako kontrolka trzyma 48 px. Linki autorów grafiki i jeden link w zdaniu czekającego przejścia mapy są więc mniejsze niż 48 px.
5. Scena przejścia stoi w układzie telefonu w wielkości swojego obrazka i zajmuje odstęp swojej ramki, więc przy 360 px nic nie jest przycięte (równe przycięcie ucięłoby ogon wilka stojącego przy prawym brzegu). Większą wielkość dostaje od 707 px, co liczy klasyczny pasek przewijania; między 672 a 706 px przeglądarka bez paska pokazuje mniejszą scenę tam, gdzie większa by się zmieściła. Płytki odkrycia są tam rysowane mniejsze (20 px z ikoną 16 px), żeby dwie nie zasłaniały się nawzajem; znaczek nad głową maga i latająca ikona zachowują wielkość, więc przy małej scenie znaczek wygląda na duży przy magu. Wygląd oceniasz na zrzucie ekranu przejścia.
6. Linia pod rysunkiem mapy podaje dotknięty kafelek, jak podaje najechany, a dotknięcie zaznacza wiersz tylko palcem: kliknięcie myszą nic nie zmienia, jak dotąd. Strzałki grupy reguł są wyłączone na pierwszej grupie („↑”) i na ostatniej („↓”), jak strzałki reguły.
7. Odstęp boczny strony w układzie telefonu to 8 px, a odstęp obszaru 12 px; pasek menu zawija się, więc na telefonie przycisk konta stoi w osobnym wierszu; okno końca przejścia jest tak wysokie jak okno bez paska menu i miejsca nad nim, więc jego przyciski zostają w zasięgu wzroku; tabela odkrytych kafelków stawia stan ogniska w osobnej linii pod liczbami wiersza.
8. Nowe wpisy, których fundament nie miał przy zadaniu: zdanie o linku wewnątrz toczącego się zdania razem z uzasadnieniem i dwiema odrzuconymi drogami, które sam rozważyłem — żaden człowiek ich nie ważył, a szablon decyzji mówi, że takie drogi nie wchodzą do odrzuconych, więc napisz, jeśli chcesz je usunąć; krótki opis źródła 48 px (cytat z Androida); krótki opis, dlaczego szerokość okna w zapytaniu o media liczy pasek przewijania (cytat z W3C); dwa terminy słownika, „układ telefonu” (wygląd w każdym oknie węższym niż 1280 px, także komputera) i „układ komputera”; dodane zdanie w decyzji o Programach (edytor stoi pod listą w układzie telefonu); oraz poprawki decyzji o Mapach, o przycisku niszczącym i o najechaniu na rysunek, żeby były prawdziwe w obu układach. (Foundation entries)
9. Skill, który mówi agentowi, jak grać w grę w przeglądarce, mówi teraz także, jak sprawdzić układ telefonu (Chromium, 360 px, dotyk), jak dotknąć kafelka rysunku, jak nadać lokalnemu kontu rolę właściciela i jak złożyć postać w pętli zarabiania; przewodnik po wyglądzie ekranów ma cztery nowe reguły (dwa układy i ich jeden próg, nic nie przewija się w bok, wszystko dotykiem z 48 px, jak sprawdza się zmianę w obu układach).
10. Testy, które trzymają zdanie decyzji przez cytat: zaktualizowano cytowane brzmienie w testach edytora programu, edytora reguł, ekranu przejścia, listy odkrytych kafelków, obszaru świata i obrazka sceny, a także jeden cytat o przycisku niszczącym w teście Siedziby; nowe przypadki trzymają strzałki grupy, dotknięcie kafelka, przycisk niszczący w spoczynku i napisy komórek. Kontrola fundamentu nie wypisuje poprawionego zdania, którego test zostawiono bez zmian.
11. Układ telefonu nie ma stałego testu: środowisko testów nie stosuje reguły układu dla szerokości telefonu, więc widzą go tylko sprawdzenia w przeglądarce i zrzuty ekranu.

## Koszt

Około 4 h 37 min czasu pracy (z czego 1 h 42 min oczekiwania na narzędzia), 373 mln tokenów licząc wejście z pamięci podręcznej (365 mln z pamięci): Sonnet 233 mln, Opus 118 mln (plan, przeglądy i poprawka przeglądu całej zmiany), Haiku 22 mln (pięć małych slice'ów). Jedna runda poprawki po przeglądzie całej zmiany i jedna po przeglądzie kroku powrotnego, każda sprawdzona jednym przeglądem. Tabela etapów jest w zapisanym rekordzie, w pliku `stages.md`, z linkiem niżej w *Course of the cycle*.

## Jak scalić

Scal tak, żeby zachować commity (commit scalający, nie squash ani rebase): link do rekordu cyklu przetrwa tylko wtedy. Scalenie wdraża zmianę na serwer testowy, gdzie sprawdzasz pętlę na telefonie, jak zdecydowało zadanie.

</details>

## Technical changes

- The foundation (commits `587f74f6`, `66ce37c0`, `68ce5c37`, `5bb7ad56`, `55773884` and part of `666e50a5`): D-396 holds the two layouts and the two added sentences; D-349, D-372, D-288, D-19, D-44, D-280, D-282, D-311, D-370, D-389, D-416, D-39, D-346, D-166, D-325 and D-331 follow; two environment facts and two glossary terms. This is what a later change is held to.
- Tests (commits `0b99767b`, `69a84584`, `628dfd7a`, `e8d02127`): the quotations of the decisions were brought to the new wording; one commit only reformats test lines of an earlier slice, and its hash is listed in the file of formatting commits by `ff645a68` and `83acc083`.
- The skill `loop2-play` and the phone configuration of the browser tool (`ebe00ef2`, `c254ba21`), the scene-art skill and the styleguide (`7f2aacb0`, `19034995`, parts of `666e50a5` and `55773884`).
- The code of the layouts: the touch-target token and shared controls (`9cb58f9f`), the one threshold and the page shell (`347adcb7`), the destructive button (`f40ec226`), the names in the cells of the pick (`9b12062d`), the move of a rule group and its arrows (`e88be6b5`, `48bbe99c`), the tap on a tile (`986377e3`), the scene's two sizes (`5acdcdbb`), the screens at 360 px (`2b4bbeaa`, `b5615e32`, `137a2267`, `5f5e0088`).
- The fix of the review of the whole change (`666e50a5`, `ff645a68`, `83acc083`): the exemption for a link in a sentence written into the decision, the wording of the scene's size, the `svh` unit of the end-of-run window, the hover rule of touch screens, and the quotations and citations the findings named.

## Checks

- The final gate is the CI run on the last head of this request; its result is written here when it ends (not yet at this draft).
- No gate was run on the base: the list of tests failing before the change was taken from the checks of the merged request of the base (nothing failed; the run of that request was green).
- The foundation check (`python -B .the-way/elements/common/foundation_check.py`, without the skip switch): exit code 0, 0 errors, no `listed:` line. The instruction-file check: exit code 0, 0 errors. Focused tests of each slice passed, each with its command and exit code in the record's reports.
- 1. The user-interface states and screenshots: each screen of the task's item 2 was measured in Chromium at 360 px with touch (no side scroll, no text over a frame, no control under 48 px but the links of a sentence) and screenshot; at 1280 × 720 the screens were compared before and after by screenshots or computed styles; the screenshot of the screen of a map run at 1100 px shows the names inside their frames.
- 2. Not reached in the browser: the moment right after a sign-in, the sentence above the login card, the failure card, real mail links, a real discovery band's wiring, a map other than 4 × 4, `svh` on a real Android phone, Firefox and Edge; a tap at the centre of a rule's row lands on the neighbouring „↑” (Chromium's touch adjustment).
- 3. The review of the whole change read 10 of about 119 selected decisions whole and the index of its selection in part; the review of the return step read the decisions its search found, D-325, D-331, D-445 and D-446 whole.
- The form check, the check of private paths on the description and on the record's copy, the image check and the remarks check: results written when the record is committed (below).
- Working copies left: none.

## Foundation entries

- D-396 — which browsers and from which window size the game works: the computer layout from 1280 px, the phone layout below it, in which nothing scrolls to the side and every control is at least 48 px, a link inside a running sentence excepted: marked `projected`, `row 5`, `row 6` and `the cycle's` (the exemption and its rejected ways).
- D-349 — the size of the scene: the larger of the two sizes that the place of the scene holds, a classic scrollbar counted: `row 1`; its *Based on* gains the fact `media-query-width-and-scrollbar` (`the cycle's`).
- D-288 — the arrows of a rule group in its header in every layout, the handle for the mouse: `row 2`.
- D-19 — a tap marks a tile's row, a tap elsewhere takes the mark off, the line under the drawing follows the tapped tile: `row 3`, and `the cycle's` for the line under the drawing.
- D-44 — the destructive button in `danger` at rest, `highlight` under the pointer: `row 4`.
- D-280, D-282, D-311, D-370, D-389 — the content width, the areas, the screen of a map run, the end-of-run window and the picture band of Siedziba now speak of the two layouts: `the cycle's`, as the task's *Decisions in play* asked.
- D-372, D-416, D-39, D-346, D-166, D-325, D-331 — the frost's thickness, the example of Wiedza, the example of the destructive button, the rationale of the hover, Programy, Mapy and the card of Mapy corrected to be true in both layouts: `the cycle's`.
- Environment facts `android-touch-target-size` and `media-query-width-and-scrollbar`; glossary terms "phone layout" and "computer layout": `the cycle's`.
- Tests that hold a sentence by a `decision:` line and were changed: the program editor, rule editor, screen of a map run, list of revealed tiles, area of the world, picture of the scene, Siedziba and the list of programs (quotations or comments), and the new cases of the rule group arrows, the tap on a tile, the destructive button and the names of the cells. No invariant was written, changed or marked violated; the part map did not change.
- Pairs of examples added by the cycle that no row or projected entry gave (word for word): D-19 complies "in a browser with touch at a page area 360 px wide, a tap with a finger on a revealed tile marking its row in that list and the line under the drawing giving its numbers, and a tap elsewhere taking the mark off"; D-19 violates "a tap on a tile in a browser with touch that leaves its row unmarked, or a mark that stays after a tap elsewhere"; D-288 complies "in the phone layout at a page area 360 px wide the arrows „↑” and „↓” in the header of every rule group, as in the computer layout"; D-166 complies "in the computer layout the list of programs in the left column of Programy and the program editor in the right one; in the phone layout the list of programs with the program editor under it" and its violates "… on its right in the computer layout".

## Minor findings

1. D-396 *Rejected*: two ways (every link held to 48 px, inside a sentence too; an exemption read from WCAG's inline exception) that no human weighed; the decisions template says such ways do not enter *Rejected*; the content agrees with the code (the review of the fix, N-1; `foundations/decisions.md`, D-396).
2. The hover background stays after a tap on the list rows of Mapy and Programy, the rows of a rule and the rows „Teraz” and „Potem”: their rules lie in the screens' own stylesheets, beyond the finding the fix answered; the rule rows carry state backgrounds a plain reset would wipe (the review of the fix, N-2; `src/browser/styles.css` and the screens' stylesheets).
3. The greyed reason inside a pick cell breaks inside a word at 360 px (slice 11's report; `src/browser/styles.css`).
4. From the return step's first review: D-166's first clause still says left and right for every width before the phone-layout clause takes it back, and its rationale says "Programy keeps two columns"; recipe (c) of the skill does not say that starting a loop returns the state with the events and that a refusal gives the state back unchanged; the new fact names its place "§ 4.1 width" while the page's heading is "4.1. Width: the width feature" (`foundations/decisions.md` D-166; `.claude/skills/loop2-play/SKILL.md`; `foundations/environment_facts.md`).

## Findings outside the task's scope

none

## Course of the cycle

- **Task and sources:** loop2: the phone layout for all screens of the game, a plan item of the project "drabina map, mag w pełni, przedmioty i wygląd"; the task document accepted as ready for cycle (hash b57a87b59202a9be) and the approved project definition, the commit `0a2254cd` of `main` as the base.
- **Process pin:** `80006b25feb4c5a6ffdb8f75d993051eecbc745d`, not moved; no gate on the pin.
- **Spec:** none: the task's questions were all answered and rows 1–6 settled what the cycle would otherwise guess; what it left to the cycle was how to make it.
- **Route:** planned slices (20), because the change crosses four parts and eleven screens; no attempt discarded.
- **Plan:** `plan.md` of the record, 20 slices, every slice fits the size check; slices 1–2 write the foundation, slices 3–5 bring the test quotations, 6 the skill, 7–11 shared controls and the pick cell, 12–14 behaviours, 15 the scene, 16–19 the screens, 20 the evidence.
- **Choices:** 6 autonomous choices of the cycle beyond the plan's 15 *Choices* (the 48 px value, the line under the drawing following the tap, the exemption for links in a sentence, the places of `100svh` and the hover rule, and the crop of the scene), in the questions table of the record.
- **Blocking findings left:** none; the review of the whole change failed once with two blocking findings and the one fix passed its review; the review of the return step failed once with one and its one fix passed.
- **Record:** pending (the link by the SHA of the commit that adds the record).
