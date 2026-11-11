---
title: Spokojniejszy wygląd — ikony w kolorze tekstu obok i zwinięte wzmianki w Siedzibie
status: draft
created: 2026-11-11
updated: 2026-11-11
tags: [zadanie]
related: "the project note"
---

# Spokojniejszy wygląd — ikony w kolorze tekstu obok i zwinięte wzmianki w Siedzibie

Status: ready for cycle
Project relation: plan item: plan_mvp2_loop2.md — spokojniejszy-wyglad

## Description

### Need

- Definicja projektu ma w zakresie: „Spokojniejszy wygląd: czerwień tylko dla zagrożeń, zwinięte wzmianki o autorach (P10).”
- Cel zadania w planie: „Wszystkie ikony biorą kolor z tekstu obok, a wzmianki o autorach są w Siedzibie zwinięte.”
- Dziś pod każdym ekranem zalogowanego gracza stoi otwarta stopka z wzmianką o każdej ikonie (obecny D-27: „The game's footer and a section of credits on the login card, folded and opened with one click, each credit each icon […]”; `src/browser/view/app.ts:174`, `:267`), a każda nowa ikona dokłada w niej wiersz na każdym ekranie.
- Raport rozpoznania zapisał, że właściciel uważa stopkę za zbyt rozbudowaną: „Wilk i nowe ikony dokładają wiersze do stopki, którą właściciel uważa za zbyt rozbudowaną.” (`rozpoznanie_mvp2/rozpoznanie_frajda.md:419`).
- Dziś ikony rysuje się na dwa sposoby (obecny D-43; styleguide, reguła „No value in place of a design token”: „Dwa sposoby stoją obok siebie do zadania 24”): ikony czynności są maską w kolorze tekstu obok, a ikony zasobów i ogniska są obrazkami z kolorem zapisanym w pliku (`#f4f4f5`, `assets/icons/wood-stick.svg`), więc nie szarzeją ani nie zmieniają koloru razem z tekstem przy nich.
- Projekt ma zamienić loop2 z gęstej strony, która wygląda jak formularz, w grę, w którą Mariusz zacznie grać; stały blok wzmianek na każdym ekranie i ikony jaśniejsze od tekstu, przy którym stoją, dokładają tej gęstości.

### To do

1. Stopka ze wzmiankami o ikonach znika ze wszystkich ekranów zalogowanego gracza.
   - Ekrany oczekiwania — „Sprawdzanie logowania…”, „Potwierdzanie adresu…”, ostrzeżenie ze „Spróbuj ponownie” i chwila po udanym logowaniu — stoją z samym nagłówkiem, bez stopki i bez sekcji wzmianek (pytanie 2).
2. Na samym dole ekranu Siedziba, jako ostatnia część ekranu, stoi zwinięta sekcja wzmianek otwierana jednym kliknięciem (pytania 3 i 4; wiersz 3 *Settlements to record*) — ta sama co na karcie logowania, z podpisem „Autorzy grafiki” i tą samą treścią: przy każdej ikonie jej tytuł, jak podaje go game-icons.net, autor, strona ikony na game-icons.net, licencja i to, czym plik ikony różni się od źródła (D-27 w brzmieniu projektowanym).
   - Wiersze wzmianek o paczkach obrazków — o paczce z wilkiem, którą przynosi zadanie 20, i o paczce Smoke & Fire Animated Particle [16x16], którą przynosi zadanie 17 — stoją tam, gdzie D-27 stawia wzmianki w chwili cyklu danego zadania. Jeśli któreś z tych zadań wejdzie przed tym zadaniem, to zadanie przenosi jego wiersz ze stopki do sekcji w Siedzibie razem z resztą wzmianek; jeśli wejdzie po nim, dopisuje swój wiersz od razu do zwiniętych sekcji w Siedzibie i na karcie logowania.
3. Karta logowania zachowuje swoją zwiniętą sekcję wzmianek bez zmian.
4. Każda ikona z `assets/icons/` stojąca przy tekście jest rysowana maską i bierze kolor tego tekstu, jak dziś ikony czynności: ikona zasobu w części „Leży tu” karty mapy na ekranie Mapy, ikony zasobów w nagłówkach kolumn tabeli odsłoniętych kafelków i ikony w linii planu wyprawy.
5. Ikony zasobów i ogniska na rysunku mapy gry, także ikony ogniska płonącego i wygasłego, które przynosi zadanie 23, są rysowane maską w `text-strong`, jak ikona czynności w plakietce nad głową maga (pytanie 1).
   - Ikona zasobu o zapasie 0 przygasa dalej o krycie roli `depleted`, jak dziś (D-41).
6. Ikona czynności w plakietce nad głową maga zostaje maską w `text-strong`, jak dziś (D-43, D-40).
7. Strona wszystkich stanów rysuje swoje próbki ikon tak, jak rysuje je gra, także próbkę ikony wyczerpanej przy roli `depleted` (`src/browser/kitchen-sink/kitchen-sink.ts:601`; styleguide, reguła „The kitchen-sink page”: „próbki wyglądu kafelków w każdym stanie, narysowane rolami”).
8. Fundament dostaje D-27, D-43 i niezmiennik `icon-credits` w brzmieniu projektowanym z *Decisions in play*, D-27 z dopiskiem z pytania 3, D-43 ze zmianą z pytania 1, a zapisane już D-40 i D-262 dostają zmiany z pytań 1 i 2, jak podaje *Decisions in play*; test niezmiennika `icon-credits` przestaje szukać stopki.
9. D-47 traci przykład i odrzucenie oparte na linkach stopki: przykład „a link of the footer showing the outline of `focus` when the keyboard reaches it” i odrzucenie „the links of the footer would show no focus” mówią o linkach zwiniętej sekcji wzmianek (plan, *Open questions*: „D-47 w zadaniu 24”).
10. Styleguide widoku (`guidelines/styleguide-browser-view.md`) idzie za zmianą:
    - reguła „No value in place of a design token” opisuje jeden sposób rysowania ikon — maską, w kolorze tekstu obok, a bez tekstu obok w `text-strong` — zamiast akapitu „Dwa sposoby stoją obok siebie do zadania 24 […]”;
    - przykład „Good” reguły „Visible focus” („Link stopki pokazuje obwódkę w roli `focus` […]”) mówi o linku zwiniętej sekcji wzmianek;
    - wiersz roli `text-strong` w tabeli Roles mówi, że rola stoi na ikonie czynności nad głową postaci i na ikonach rysunku mapy, choć obok nich nie ma tekstu.

### Questions to settle

- Pytanie 1. W jakim kolorze stoją ikony zasobów i ogniska na rysunku mapy gry, gdy zadanie rysuje je maską, skoro obok nich nie stoi żaden tekst, a projektowany D-43 daje ikonie tylko kolor „from the text beside it”? Pytanie wiąże też zadanie 23 (koszty-i-stan-ogniska): jego ikony ogniska płonącego i wygasłego stoją na rysunku mapy (projektowany D-70).
  - Answer: `text-strong`, tak jak ikona czynności w plakietce nad głową maga. Mapa wygląda dokładnie jak dziś, bo plik ma ten sam kolor co `text-strong` (`src/browser/tokens.css:24`); kontrast z odsłoniętym kafelkiem 4,39:1. D-43 mówi, że ikona bez tekstu obok — w plakietce i na mapie — bierze `text-strong`, a D-40 dostaje zdanie, że ikony rysunku mapy stoją w `text-strong` na `tile-revealed`, choć obok nich nie ma tekstu. Przyjęty koszt: rola tekstu stoi na tle spoza pięciu teł, które pilnuje test kontrastu, więc późniejsza zmiana `tile-revealed` może pogorszyć czytelność ikon bez sygnału z testu — tak samo jak dziś.
  - Not chosen:
    - B, `text`: ikony na mapie ciemniejsze, spokojniejsze — kontrast z odsłoniętym kafelkiem spada z 4,39:1 do 3,27:1, nadal powyżej progu 3:1 dla elementu, który nie jest tekstem; ikony mapy ciemniejsze niż ikona w wierszu reguły i w plakietce, a D-40 odrzuciło `text` dla plakietki właśnie dlatego, że byłaby „darker than the icon in the row of a rule and than the icons on the map”.
    - C, ikony mapy zostają obrazkami z kolorem w pliku („zostawić jak jest”) — dwa sposoby rysowania ikon zostają, cel zadania „Wszystkie ikony biorą kolor z tekstu obok” nie jest spełniony, a projektowany D-43 („the content of an icon file […] which is drawn as a mask”) musiałby wrócić do definicji i jej bramki.
  - Source: human, 2026-11-11, „apropo autorów grafiki - czy to jest możliwe żeby wszędzie byli zwinięci? w sensie czy to jest ok licencyjnie? no bo robi się tego sporo i wypadałoby to właśnie wszędzie pokazywać w taki sam sposób - w formie zwiniętej, albo w formie przycisku otwierającego pełną listę / reszta zgodnie z rekomendacją” — „reszta zgodnie z rekomendacją” przyjmuje rekomendowaną drogę A.
- Pytanie 2. Czy po zniknięciu stopki ekrany oczekiwania — „Sprawdzanie logowania…”, „Potwierdzanie adresu…”, ostrzeżenie ze „Spróbuj ponownie” i chwila po udanym logowaniu — stoją z samym nagłówkiem, co zmienia obecny D-262?
  - Answer: Sam nagłówek z nazwą gry; D-262 zmienia „with the header and the footer” na „with the header”, a stopka znika też z jego uzasadnienia i odrzucenia. Przyjęty koszt: na ekranie, który trwa chwilę, nie ma wzmianek — są jedno kliknięcie dalej na karcie logowania i w Siedzibie, jak każe D-27.
  - Not chosen:
    - B, w miejscu stopki zwinięta sekcja wzmianek, a D-262 zmienia tylko słowo stopki na sekcję — linia w planie dla odpowiedzi szerszej niż zatwierdzone zdanie D-27, trzecie miejsce wzmianek do utrzymania i sekcja na ekranie, który zwykle znika po chwili.
    - „Zostawić jak jest” nie istniało: stopki po zadaniu nie ma, więc D-262 i tak przestaje być prawdą.
  - Source: human, 2026-11-11, ta sama wypowiedź co przy pytaniu 1 — „reszta zgodnie z rekomendacją” przyjmuje rekomendowaną drogę A.
- Pytanie 3. W którym miejscu ekranu Siedziba stoi zwinięta sekcja wzmianek?
  - Answer: Na samym dole Siedziby, jako ostatnia część ekranu, bez względu na to, gdzie stoi skrzynka — tak jak w starej Loop. Przyjęty koszt: przy długiej drużynie i skrzynce trzeba do niej przewinąć, a licencja wymaga tylko, żeby była osiągalna; zadania 21 i 25, dokładając części Siedziby, zostawiają sekcję ostatnią.
  - Not chosen:
    - B, wyżej, na przykład pod nagłówkiem „Siedziba” — pierwszą rzeczą na głównym ekranie gry staje się podpis wzmianek, a ekran odchodzi od starej Loop bez zysku dla gracza.
    - Droga A w brzmieniu „pod skrzynką” — gdy zadanie 21 przeniesie skrzynkę do obozu u góry Siedziby, sekcja stanęłaby tuż pod obozem, wysoko na głównym ekranie, wbrew „na samym dole” z tej samej odpowiedzi; linia planu dla D-27 wymagałaby poprawki, a cykl albo zadanie 21 musiałby wybrać jedno z dwóch miejsc.
  - Source: human, 2026-11-11, ta sama wypowiedź co przy pytaniu 1 — „reszta zgodnie z rekomendacją” przyjmuje rekomendowaną drogę A, pokazaną jako „Na samym dole Siedziby, pod skrzynką, jako ostatnia część ekranu — tak jak w starej Loop.”; potem, 2026-11-11, przy wierszu 3 *Settlements to record*, gdy wyszło, że zadanie 21 stawia skrzynkę w obozie u góry Siedziby: „apropo 24 tak - przyjmujemy ten wiersz bez skrzynki”. Materiał pokazany przy pytaniu, nie rozstrzygnięcie: definicja, *Inputs and constraints* — „Wejście: widoki starego Loop są punktem wyjścia i minimum. Projekt bierze z nich podział na ekrany, układ i rozwiązania interakcji, a odchodzi od nich tylko wtedy, gdy wychodzi lepiej, nigdy gorzej.”; Siedziba starej Loop kończy się wzmiankami, po raporcie z nieobecności i drużynie (`a file of the old Loop repository, src/components/probe/HomeScreen.tsx:58`, `:60`, `:80-101`, commit cdc7c0d), tam jako otwarta stopka, nie zwinięta sekcja.
- Pytanie 4. W jakiej formie stoją wzmianki o autorach grafiki — zwinięta sekcja otwierana na miejscu czy przycisk „Autorzy grafiki” otwierający okno z pełną listą?
  - Answer: Z — zwinięta sekcja otwierana na miejscu, jak podaje projektowany D-27 i jak ma ją już karta logowania (zadanie 27, otwarcie niczego nie przesuwa), taka sama w Siedzibie (na jej dole, pytanie 3) i na karcie logowania. Przyjęty koszt: po otwarciu na karcie logowania długa lista.
  - Not chosen:
    - P, przycisk „Autorzy grafiki” otwierający okno z pełną listą, taki sam z Siedziby i z karty logowania — przeróbka sekcji karty logowania z zadania 27, zmiana brzmienia D-27 („a section of credits, folded”) przez bramkę definicji, okno do zbudowania (klawiatura, Escape).
  - Source: human, 2026-11-11, „Z”. Orkiestrator projektu zapisał przy odpowiedzi, że do drogi P można wrócić, gdyby lista stała się nieczytelna — to jego uwaga, nie koszt pokazany człowiekowi. Pytanie zadał orkiestrator projektu po pytaniu człowieka, czy wszędzie zwinięte wzmianki są w porządku licencyjnie; orkiestrator odpowiedział z faktów środowiska fundamentu — licencja CC BY 3.0 prosi o wzmiankę „reasonable to the medium or means You are utilizing” (`cc-by-3-adaptation-credit`), Pixel Crawler nie prosi o wzmiankę (`pixel-crawler-terms`); to odczyt zapisanych warunków, nie porada prawna.

## Context

- Część „czerwień tylko dla zagrożeń” z pozycji zakresu zrobiło zadanie 5: przyciski niszczące są neutralne w spoczynku, a czerwienieją pod kursorem i przy fokusie (obecny D-44; plan, dziennik zmian, 2026-11-03).
- Ikony stojące dziś jako obrazki z kolorem w pliku: `src/browser/view/maps-screen.tsx:183`, `src/browser/view/tile-table.tsx:49`, `src/browser/view/trip-plan.tsx:207`, `src/browser/view/terrain-picture.ts:119` i `:124` (rysunek mapy przez `src/browser/view/terrain-drawing.tsx:37`); maską rysuje dziś klasa `.action-icon` w `src/browser/styles.css:552`.
- Treść stopki i zwiniętej sekcji bierze się z jednej funkcji, `footerCredits()` w `src/browser/view/footer.ts`, a sekcję rysuje `CreditsSection` w `src/browser/view/credits-section.tsx`, którą dziś wstawia tylko karta logowania (`src/browser/view/account-card.tsx:662`).
- Stopkę tworzy i pokazuje `src/browser/view/app.ts` (`:174`, `:267`, `:293`, `:615`), także na ekranach oczekiwania.
- Tabela plików wytycznych kodowania modułów widoku wymienia `src/browser/view/footer.ts` (`guidelines/coding-browser-module.md:43`).
- Wzmianka każdej ikony mówi dziś „zmienione (bez tła, jasny kolor)” (`src/browser/view/credits.ts`), co pozostaje prawdą, póki pliki ikon zostają bez zmian.
- Ekran Siedziba to `src/browser/view/headquarters.tsx`; ma dziś raport z nieobecności, drużynę i sekcję „Skrzynka {n}/{cap}”. Obóz u góry Siedziby przynosi zadanie 21 (cel w planie: „U góry Siedziby stoi obóz: ognisko, skrzynka i postacie drużyny.”), które nie ma kolejności wobec tego zadania, a zmiany raportu zadanie 25, które idzie po nim.
- Stara Loop stawia wzmianki jednym akapitem, niezwiniętym, na dole ekranu głównego, pod listą postaci (`a file of the old Loop repository, src/components/probe/HomeScreen.tsx:80`, commit cdc7c0d).

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

Przydział z planu (*Projected entries*): zadanie urzeczywistnia i zapisuje D-27 („Realized by 2, 5, 23, 24”, „Written by 24”), D-43 („Realized by 5, 7, 24”, „Written by 24”) i niezmiennik `icon-credits` („Realized by 2, 5, 23, 24”, „Written by 24”), a urzeczywistnia też część D-40 („Realized by 7, 11, 14, 24”, „Written by 11” — zadanie 11 jest zrobione, więc to zadanie dopisuje swoją część do zapisanego wpisu; plan, dziennik zmian, 2026-11-11); do zadania należy też poprawka przykładu D-47 (plan, *Open questions*, odpowiedź człowieka z 2026-11-01).

- D-27 — Where do the game's icons come from? Obecne brzmienie: „The game's icons are SVG files from game-icons.net, kept in `assets/icons/` outside the directory the account and save server serves and copied into that directory when the application is built. An icon file holds nothing that runs and refers to nothing outside itself. The game's footer and a section of credits on the login card, folded and opened with one click, each credit each icon with its title as game-icons.net gives it, its author, its page on game-icons.net and its licence, and say how the icon file differs from its source.”
  - Brzmienie projektowane (definicja, *Projected foundation changes*, „D-27 — Where do the game's icons come from?”): „The game's icons are SVG files from game-icons.net, kept in `assets/icons/` outside the directory the account and save server serves and copied into that directory when the application is built. An icon file holds nothing that runs and refers to nothing outside itself. A section of credits, folded and opened with one click, stands on Siedziba and on the login card and credits each icon with its title as game-icons.net gives it, its author, its page on game-icons.net and its licence, and says how the icon file differs from its source.”
  - Uzasadnienie projektowane: „With dozens of icons a list of credits on every screen takes more room than the game can give, and folded on two screens it stays one click away, which keeps what the licence asks.” Odrzucenie projektowane: „the credits open in a footer of every screen — dozens of rows standing below the game.”
  - Dopisek z pytania 3 (plan, dziennik zmian, 2026-11-11): „dopisek wobec projektowanego D-27: zwinięta sekcja wzmianek stoi na samym dole Siedziby, jako jej ostatnia część, jak w starym Loop, szerzej niż „stands on Siedziba” z wiersza 488 definicji; zadanie 24 zapisuje wpis z tym dopiskiem; droga nie wybrana: wyżej, pod nagłówkiem, gdzie wzmianki byłyby pierwszą rzeczą głównego ekranu gry”.
- D-43 — What counts in the browser view as a value written in place of a design token? Obecne brzmienie: „In the files of the part browser-view other than its file of design tokens, a value written in place of a design token is a colour in any notation — hexadecimal, functional, a named colour or a system colour — in styles and in TypeScript and, in styles, a size or spacing in `px`, `rem` or `em`, a font name, or a unitless stroke width, dash pattern, opacity or font weight, those four unitless kinds being all. None is `0`, a percentage, a size in `fr`, `vw` or `vh`, a keyword such as `transparent`, `currentColor`, `inherit` or `none`, a screen-width threshold of an `@media` rule, the geometry of the terrain drawing or of the scene computed in TypeScript, the frames and positions of a sprite, the `width` and `height` attributes of an image, a layout dimension — a width or height with its minimum and maximum, or the sizes of the columns of a layout grid — or the content of an icon file in `assets/icons/` — that of an icon of an action drawn as a mask, taking its colour from the text beside it or, in the badge over the mage's head where no text stands beside it, from `text-strong`, and that of any other icon holding its colour in the file, changed by hand when the value of `text-strong` changes.”
  - Brzmienie projektowane (definicja, *Projected foundation changes*, „D-43 — What counts in the browser view as a value written in place of a design token?”), w części o ikonach: „[…] or the content of an icon file in `assets/icons/`, which is drawn as a mask and takes its colour from the text beside it.” Uzasadnienie projektowane: „An icon drawn as a mask takes the role of the text beside it, so dimmed and amber icons need no files of their own and a change of `text-strong` reaches them at once.” Odrzucenie projektowane: „the colour of an icon standing in its file and changed by hand — every state of an icon takes a file”.
  - Plan, dziennik zmian, 2026-11-03: zadanie 24, „które zapisuje D-43 i daje ikonom kolor tekstu obok, zastaje ikonę bez tekstu obok w `text-strong` i ją zachowuje” — chodzi o ikonę w plakietce nad głową maga.
  - Zmiana z pytania 1 (droga A): D-43 mówi, że ikona bez tekstu obok — w plakietce i na mapie — bierze `text-strong`. Plan, dziennik zmian, 2026-11-11, nazywa ją dopiskiem wobec projektowanego D-43 i D-40, szerszym niż „which is drawn as a mask and takes its colour from the text beside it”, i mówi, że ikony ogniska płonącego i wygasłego z zadania 23 „trzymają do zadania 24 kolor `text-strong` zapisany w pliku, jak dziś pozwala obecne D-43, a maskę dostają w zadaniu 24”.
- `icon-credits` (niezmiennik, *Derives from* D-27). Obecne brzmienie: „For each SVG icon file directly in `assets/icons/`, the game's footer and the game's section of credits each hold a credit that names the icon's title as its page on game-icons.net gives it, the icon's author, that page and the licence CC BY 3.0, and says how the icon file differs from its source.”
  - Brzmienie projektowane (definicja, *Projected foundation changes*, „icon-credits”): „For each SVG icon file directly in `assets/icons/`, the game's section of credits holds a credit that names the icon's title as its page on game-icons.net gives it, the icon's author, that page and the licence CC BY 3.0, and says how the icon file differs from its source.”
- D-47 — Which elements of the browser view are controls, and how does their focus show? Brzmienie: „A control of the browser view is every HTML element the browser lets the keyboard reach, links included, and the code marks none. One `:focus-visible` rule of the game's stylesheet draws the focus of every control from the role `focus`, and no other style or code of the part browser-view sets `outline` or an `outline-*` property, except that the kitchen-sink page's stylesheet repeats that rule with one more selector, for its sample of the focused state.” Zadanie zmienia tylko przykład w *Verification* („a link of the footer showing the outline of `focus` when the keyboard reaches it”) i odrzucenie („the shared controls alone, without links — the links of the footer would show no focus”), jak podaje *To do* 9.
- D-262 — What stands on the screen of the login card, and where do the waiting screens stand? Brzmienie: „Nothing stands on the screen of the login card but the card, neither header nor footer. The waiting screens — „Sprawdzanie logowania…”, „Potwierdzanie adresu…”, the warning with „Spróbuj ponownie” and the moment after a sign-in that succeeded — stand outside the card, with the header and the footer, for a signed-in player too. When React takes the card down after an exception no code of the game handled, the sentence „Coś w grze się zepsuło — odśwież stronę.” stands alone in the card's place (D-323).” Uzasadnienie, część o stopce: „Accepted with it: at each entry a signed-out visitor sees the header and the footer for a moment before the card comes.” Odrzucenie, część o stopce: „the header and the footer beside the card too — the visitor sees one card (D-96), with the credits in it (D-27).” Przykład w *Verification*: „a reload showing „Sprawdzanie logowania…” with the header and the footer, and then the card alone or the game”.
  - Zmiana z pytania 2 (droga A): D-262 zmienia „with the header and the footer” na „with the header”, a stopka znika też z jego uzasadnienia i odrzucenia; przykład w *Verification*, który mówi o stopce, idzie za tą zmianą.
- D-40 — What do the neutral roles of the browser view mean? Zdania o ikonie bez tekstu obok: „The badge over the mage's head stands on `panel` and the track of its progress bar in `highlight`, and the icon in the badge stands in `text-strong`, though it is no text and no text stands beside it.” Uzasadnienie: „the icon in it takes `text-strong`, which the action has in the row of a rule and the icons of the drawing of the map have, though no text stands beside it.”
  - Zmiana z pytania 1 (droga A): D-40 dostaje zdanie, że ikony rysunku mapy stoją w `text-strong` na `tile-revealed`, choć obok nich nie ma tekstu — szerzej niż zdanie projektowanego D-40 „Each of the five stands as text on `page`, `panel`, `highlight`, `rule-winning` and `rule-running`” (plan, dziennik zmian, 2026-11-11).
- D-41 — What do the roles of the terrain grid and of keyboard focus mean? Zdanie, przy którym zadanie zostaje: „`tile-revealed` a place known, whose icons say what lies there […] `depleted` that what was here is gone […]”.
- D-291 — Which icon stands for an action? Brzmienie: „Each action has one icon, which stands for it in a program rule's row, in its cell of the pick, over the mage's head and in the rows „Teraz” and „Potem” under the scene; an action with a target shows the icon of the action, never one of its target.” Zadanie go nie zmienia; ikony czynności są już maską.

## Settlements to record

Candidates: 1 shown, 1 accepted — 2026-11-11

Wiersze 1 i 2 powtarzają wybory Mariusza między pokazanymi drogami i weszły jako przyjęte; wiersz 3 był wyprowadzony i Mariusz go przyjął.

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Ikony, przy których nie stoi tekst — w plakietce nad głową maga i na rysunku mapy, także ikony ogniska płonącego i wygasłego — są rysowane maską w `text-strong`; zmienia D-43 i D-40. | decision | Pytanie 1 (human, 2026-11-11, droga A; *Not chosen* pod pytaniem) — wybór Mariusza | kolor ikon rysunku mapy rysowanych maską (`text-strong` czy `text`) i to, czy D-43 i D-40 mówią o ikonie bez tekstu obok poza plakietką |
| 2 | Ekrany oczekiwania stoją z samym nagłówkiem, bez stopki i bez sekcji wzmianek; zmienia D-262. | decision | Pytanie 2 (human, 2026-11-11, droga A; *Not chosen* pod pytaniem) — wybór Mariusza | czy na ekranach oczekiwania zostaje stopka albo staje trzecia sekcja wzmianek, i brzmienie D-262 |
| 3 | Zwinięta sekcja „Autorzy grafiki” stoi na samym dole Siedziby, jako ostatnia część ekranu; zmienia projektowany D-27. | decision | Pytanie 3 (human, 2026-11-11, droga A bez słów „pod skrzynką”; *Not chosen* pod pytaniem); wiersz przyjęty przez człowieka 2026-11-11: „apropo 24 tak - przyjmujemy ten wiersz bez skrzynki”; droga nie wybrana przy cięciu: bez wiersza — cykl czytałby dwa brzmienia, „na samym dole” z linii planu dla D-27 i „pod skrzynką” z odpowiedzi | miejsce sekcji w Siedzibie, gdy zadania 21 i 25 dokładają obóz u góry i zmieniają raport — także czy sekcja stoi tuż pod skrzynką w obozie, czy na dole ekranu |

## Out of scope

- Wiersze wzmianek o paczce z wilkiem i o paczce Smoke & Fire Animated Particle [16x16] i ich treść — przynoszą je zadania 20 (cel w planie: „wzmianki wymieniają paczkę z wilkiem, jeśli jej licencja tego wymaga”) i 17; to zadanie tylko przenosi wiersze, które zastanie w stopce, jak podaje *To do* 2.
