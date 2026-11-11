---
title: Cena przy czynności w panelu reguły i ikony ogniska płonącego i wygasłego na rysunku mapy
status: draft
created: 2026-11-11
updated: 2026-11-11
tags: [zadanie]
related: "the project's note"
---

# Cena przy czynności w panelu reguły i ikony ogniska płonącego i wygasłego na rysunku mapy

Status: ready for cycle
Project relation: plan item: plan_mvp2_loop2.md — koszty-i-stan-ogniska

## Description

### Need

- Nowy gracz z rozpoznania widział obok siebie „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk” i „Zasil — ognisko” bez ceny i dopiero po fakcie policzył, że ognisko kosztuje 6 patyków (`the new-player reconnaissance report in the author's notes`, chwila 17 i wniosek 5).
- Dziś panel reguły pokazuje przy czynności tylko czas jednego wykonania (D-293, `src/browser/view/rule-panel.tsx:442`, `:516`), a ceny nie pokazuje nigdzie.
- Rysunek mapy rysuje ognisko jedną ikoną, płonące i wygasłe tak samo (`src/browser/view/terrain-picture.ts:32-35`, D-70: „Accepted with it: the drawing alone does not tell a burning campfire from an extinguished one.”), więc stan ognia gracz czyta tylko z tabeli odsłoniętych kafelków.
- Świeżo wytworzone ognisko jest wygasłe (glosariusz, „extinguished campfire”: „whether it has burnt out or has not been lit yet”), czego nowy gracz się nie spodziewał.
- Pozycja zakresu w definicji: „Koszty i stan ogniska: cena przy akcji, ikona ognia na mapie (NG6).”
- Cel zadania w planie: „Panel reguły pokazuje cenę przy czynności, na przykład „Wytwórz — ognisko (6 patyków)”, a rysunek mapy odróżnia własnymi ikonami ognisko płonące od wygasłego.”
- Zadanie służy celowi projektu, bo gra ma przestać być nieczytelna: reguła, która czeka na brakujący patyk, nie ma wyglądać jak usterka (uzasadnienie projektowanego wpisu o cenie).

### To do

1. Panel reguły pokazuje przy czynności jej cenę, czytaną z danych gry — sztuki, które czynność zużywa, i energię natury, którą kosztuje czar — przy każdej komórce wyboru czynności, także wyszarzonej, i przy wybranej czynności panelu, tam gdzie stoi jej czas wykonania; wiersz reguły ceny nie pokazuje (pytanie 1).
2. Cena stoi w nawiasie po nazwie czynności, z nazwami rzeczy odmienionymi przez liczbę i z energią pełną nazwą: „(6 patyków)”, „(1 patyk)”, „(2 patyki, 10 energii natury)”, „(1 jagoda)”; dane rzeczy dostają formy liczby mnogiej (pytanie 2).
3. W przejściu cena idzie za postacią przejścia, jak czas wykonania: postaci z kupioną gałęzią „Czysty płomień” panel pokazuje „Zapal — ognisko (10 energii natury)”, a na ekranie Programy i poza przejściem stoi cena z danych, „Zapal — ognisko (2 patyki, 10 energii natury)” (pytanie 3).
4. Czynność, która niczego nie zużywa, ceny nie ma — także „Uderz — patyk”, bo patyk zostaje w plecaku po ciosie (D-145).
5. Rysunek mapy rysuje ognisko płonące obecną ikoną `assets/icons/campfire.svg`, a wygasłe, także nigdy niezapalone, nową ikoną z game-icons.net, którą wybiera cykl (pytanie 4); obie stoją w kolorze `text-strong`, jak pozostałe ikony rysunku mapy, dziś kolorem `#f4f4f5` zapisanym w pliku (D-43, pytanie 5). Minuty, które zostały, stoją dalej tylko w wierszu kafelka w tabeli odsłoniętych kafelków, a wiersz kafelka zostaje bez zmiany.
6. Nowa ikona przychodzi z game-icons.net do `assets/icons/`, jak każda ikona gry (D-27), ze wzmianką według `icon-credits` w danych wzmianek, które pokazuje każde miejsce wzmianek gry, i z faktem środowiska z tytułem ze swojej strony na game-icons.net, zapisanym przez `the-way-record-environment-fact` i dopisanym do *Rests on* niezmiennika `icon-credits`.

### Acceptance criteria

- Opis prośby o scalenie pokazuje na zrzucie rysunek mapy z ogniskiem płonącym i wygasłym obok siebie, a Mariusz przyjmuje przy prośbie ikonę ogniska wygasłego albo wskazuje inną, którą cykl wstawia w rundzie poprawek (pytanie 4).

### Questions to settle

- Pytanie 1. Gdzie stoi cena czynności: tylko w panelu reguły, czy także w wierszu reguły, jak czas wykonania (D-293) i jak cena w starym Loop?
  - Answer: Tylko w panelu reguły: przy każdej komórce wyboru czynności, także wyszarzonej, i przy wybranej czynności panelu, tam gdzie dziś stoi czas. Wiersz reguły w kolumnie programu o szerokości 208–304 px nie rośnie; regułę, która czeka na patyk, objaśnia w wierszu powód, „brakuje 4 × patyk” (D-310). Przyjęty koszt: czytając program, gracz nie widzi cen bez otwarcia panelu — w tym wierszu ubożej niż stary Loop.
  - Not chosen:
    - Panel i wiersz reguły, w wierszu schowana, gdy powód mówi, czego brakuje, jak w starym Loop (`src/components/probe/RulesPanel.tsx of the old Loop repository:768-779`, cdc7c0d) — dłuższy wiersz, który w wąskiej kolumnie częściej zawija się na dwie linie; wpis o cenie mówi szerzej niż zatwierdzone zdanie definicji, więc plan dostaje linię dopisku wobec definicji.
  - Source: człowiek, 2026-11-11, w pakiecie rundy zadań 23 i 24: „reszta zgodnie z rekomendacją” (rekomendacja: tylko panel). Pokazane jako materiał, nie rozstrzygnięcie: definicja, *Inputs and constraints*, wiersz 70: „Projekt bierze z nich podział na ekrany, układ i rozwiązania interakcji, a odchodzi od nich tylko wtedy, gdy wychodzi lepiej, nigdy gorzej.” — ocenę, czy wiersz bez ceny to „gorzej”, zostawiono człowiekowi.
- Pytanie 2. Jak brzmi cena: „(6 patyków)”, „(2 patyki, 10 energii natury)” z odmianą nazw rzeczy, czy „(6 × patyk)”, „(2 × patyk, 10 energii natury)” jak powód przy regule (D-310)?
  - Answer: Z odmianą: „(6 patyków)”, „(1 patyk)”, „(2 patyki, 10 energii natury)”, „(1 jagoda)” — brzmienie przykładu zatwierdzonej definicji, czytane jak zdanie, tak jak wiersz reguły (D-288); dane rzeczy dostają formy liczby mnogiej, a każda nowa rzecz będzie ich potrzebować. Energia stoi pełną nazwą, „energii natury”, jak w D-310; cena stoi w nawiasie po nazwie czynności, tym samym tekstem co nazwa, więc nie potrzebuje nowej roli przewodnika stylu i szarzeje razem z wyszarzoną komórką.
  - Not chosen:
    - Ze znakiem „×”: „(6 × patyk)”, „(1 × patyk)”, „(2 × patyk, 10 energii natury)”, „(1 × jagoda)”, ta sama forma co powód przy regule, bez nowych danych — odchodzi od przykładu definicji, czyta się jak spis, nie jak zdanie.
  - Source: człowiek, 2026-11-11, w pakiecie rundy zadań 23 i 24: „reszta zgodnie z rekomendacją” (rekomendacja: z odmianą). Przykład definicji: projektowany wpis „(new) — Where does the player read what an action costs?”: „such as „Wytwórz — ognisko (6 patyków)””.
- Pytanie 3. Czy cena w przejściu idzie za postacią przejścia — przy „Czysty płomień” „Zapal — ognisko” bez patyków — czy zawsze stoi cena z danych, bez gałęzi postaci?
  - Answer: Za postacią przejścia, jak czas wykonania (D-293, „during a map run as the simulation gives them for the character of the map run”): w przejściu postaci z „Czysty płomień” „Zapal — ognisko (10 energii natury)”, na ekranie Programy i bez przejścia „(2 patyki, 10 energii natury)”. Cena mówi prawdę o tym, co zejdzie z plecaka tej postaci, i zgadza się z powodem przy regule; przyjęty koszt: ta sama reguła pokazuje inną cenę na dwóch ekranach.
  - Not chosen:
    - Zawsze z danych, „(2 patyki, 10 energii natury)” wszędzie, jedna cena i prostszy kod — postaci z „Czysty płomień” panel podaje patyki, których zapalenie nie zabierze.
  - Source: człowiek, 2026-11-11, w pakiecie rundy zadań 23 i 24: „reszta zgodnie z rekomendacją” (rekomendacja: za postacią, jak czas).
- Pytanie 4. Kiedy i jak Mariusz wybiera ikonę ogniska wygasłego z game-icons.net, skoro stary Loop takiej ikony nie miał? (Wspólne pytanie o wartości wyglądu zadań 18, 19 i 23; to zadanie dotyczy w całości.)
  - Answer: Przy prośbie o scalenie, jako kryterium akceptacji: cykl bierze jedną ikonę z game-icons.net i pokazuje ją na zrzucie rysunku mapy obok ogniska płonącego w opisie prośby, a Mariusz przyjmuje ją albo wskazuje inną. Zadanie może być gotowe bez drugiej rundy; odrzucona ikona to runda poprawek w otwartej prośbie, a cykl nie staje w środku pracy. (Podgląd przed gotowością dostaje tylko zadanie 18.)
  - Not chosen:
    - Jeden wspólny podgląd przed gotowością zadań 18, 19 i 23, z 2–3 ikonami ogniska wygasłego do wyboru w drugiej rundzie — druga runda przed gotowością wszystkich trzech zadań i praca jednego agenta; zadania czekają.
    - Wybór przy prośbie o scalenie dla wszystkich trzech zadań, także dla zadania 18 — każda odrzucona wartość to runda poprawek w otwartej prośbie; noc odrzucona już po scaleniu zadania 18 to osobna zmiana.
    - Wartości podane teraz słowami albo kodem, bez podglądu — najtańsze dziś, ale wartość oceniana na próbce, nie na obrazie; poprawka po scaleniu to osobne zadanie.
  - Source: człowiek, 2026-11-11, w rundzie zadań 16–24, przy wspólnym pytaniu o wartości wyglądu zadań 18, 19 i 23: „a odpowiedzi - zgodnie z rekomendacją” (rekomendacja: podgląd tylko dla zadania 18, kolory zadania 19 i ikona zadania 23 przy prośbie o scalenie).
- Pytanie 5. W jakim kolorze stoją ikony ogniska na rysunku mapy, skoro obok nich nie stoi żaden tekst, a projektowany D-43 daje ikonie kolor „from the text beside it”? (Wspólne pytanie zadań 24 i 23; rozstrzygnięte w zadaniu 24, które zapisuje D-43 i D-40.)
  - Answer: `text-strong`, tak jak ikona czynności w plakietce nad głową maga; mapa wygląda dokładnie jak dziś, bo pliki ikon mają ten sam kolor co `text-strong` (`#f4f4f5`, `src/browser/tokens.css:24`); kontrast z odsłoniętym kafelkiem 4,39:1. Przyjęty koszt: rola tekstu stoi na tle spoza pięciu teł, które pilnuje test kontrastu, więc późniejsza zmiana `tile-revealed` może pogorszyć czytelność ikon bez sygnału z testu — tak samo jak dziś.
  - Not chosen:
    - `text`, ikony ciemniejsze — kontrast z odsłoniętym kafelkiem spada do 3,27:1; ikony mapy ciemniejsze niż ikona w wierszu reguły i w plakietce, a D-40 odrzuciło `text` dla plakietki właśnie z tego powodu.
    - Ikony mapy zostają obrazkami z kolorem w pliku — dwa sposoby rysowania ikon zostają, cel zadania 24 „Wszystkie ikony biorą kolor z tekstu obok” nie jest spełniony, a projektowany D-43 wróciłby do definicji i jej bramki.
  - Source: człowiek, 2026-11-11, w pakiecie rundy zadań 23 i 24: „reszta zgodnie z rekomendacją” (rekomendacja: `text-strong`).

## Context

- Co zużywają czynności w danych dziś: „Wytwórz — ognisko” 6 patyków (`src/browser/sim/data/campfire.ts:32`), „Zapal — ognisko” 2 patyki (`campfire.ts:33`) i 10 energii natury (`src/browser/sim/data/actions.ts:120`), „Zapal — patyk” jeden patyk (`src/browser/sim/run.ts:293`) i 10 energii natury (`actions.ts:130`), „Zasil — ognisko” jedną sztukę opału, dziś jedynym opałem jest patyk (`run.ts:306`, `src/browser/sim/data/items.ts:35`), „Zjedz — jagoda” jedną jagodę (`run.ts:326`, `items.ts:41`).
- Nazwy rzeczy stoją dziś tylko w mianowniku liczby pojedynczej: „patyk”, „jagoda”, „mech”, „włókno” (`src/browser/sim/data/resources.ts:16-19`).
- „Czysty płomień” zapala ognisko bez patyków, za energię natury zwykłego zapalenia (D-63; `src/browser/sim/run.ts:270-284`).
- Czas wykonania liczy dla postaci przejścia `actionTime` (`src/browser/view/program-editor.ts:774-786`) i stoi dziś w komórkach wyboru czynności, przy wybranej czynności panelu i w wierszu reguły (`src/browser/view/rule-panel.tsx:442`, `:516`, `src/browser/view/rule-list.tsx:479`).
- D-63 nazywa ceną czaru patyki i energię natury: „whose price is the sticks they use and nature energy”.
- Raport nowego gracza proponuje „Wytwórz — ognisko (6 patyków)”, „Zapal — ognisko (2 patyki, 10 energii)” „na liście akcji” (`the new-player reconnaissance report in the author's notes`, propozycja 6).
- Stary Loop pokazywał cenę w panelu, „Zużywa: 6 × Patyk · energia natury 10”, i w wierszu reguły, tylko na szerokim ekranie, chowając ją, gdy powód mówi już, czego brakuje (`src/components/probe/RulesPanel.tsx of the old Loop repository:457-466`, `:768-779`, commit cdc7c0d).
- Ikonę ogniska na kafelku rysuje `src/browser/view/terrain-drawing.tsx:92-94` z miejsca liczonego w `src/browser/view/terrain-picture.ts:108-137`; obecna ikona `assets/icons/campfire.svg` (Lorc, „Campfire icon”) przedstawia płomień, a stary Loop nie miał ikony ogniska wygasłego (`public/icons/ of the old Loop repository`).
- Ikony terenu mają kolor w swoim pliku (`#f4f4f5`), a nie są rysowane maską (reguła „No value in place of a design token” przewodnika stylu, D-43); rysowanie maską wszystkich ikon w kolorze `text-strong` daje zadanie 24, które zależy od tego zadania.
- Wzmianki o ikonach stoją w danych `src/browser/view/credits.ts`; w chwili tego cyklu pokazują je stopka i sekcja wzmianek na karcie logowania, a zadanie 24 przenosi je do zwiniętych sekcji w Siedzibie i na karcie logowania i usuwa stopkę.
- Scena już odróżnia ognisko wygasłe — ten sam obrazek bez koloru i bez ruchu (D-316, przewodnik stylu, „The scene of a map run”).

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

### Zadanie zapisuje w całości

- Definicja, „(new) — Where does the player read what an action costs?”: „The rule panel shows beside an action what it costs, read from the game's data, such as „Wytwórz — ognisko (6 patyków)”.” *Rationale:* „the four verbs of a campfire stand side by side with no price, so a rule that waits for a missing stick looks like a fault.” *Rejected:* „none considered”. Kod zadania czyni wpis prawdziwym w całości; zadanie go zapisuje razem z rozstrzygnięciami 1–3 z *Settlements to record*, które plan przyjął jako dopisek szerszy niż to zdanie, a zdanie zostaje prawdziwe (plan, *Change log*, 2026-11-11, „dopisek wobec wpisu „(new) — Where does the player read what an action costs?””).
- Definicja, D-70 — How does the browser view show a campfire?: „A campfire shows on the drawing of the game map as an icon on its tile, one icon for a burning campfire and one for an extinguished one, and its minutes left stand in the tile's row of the list of revealed tiles.” *Rejected:* „the minutes shown on the drawing — a number would stand on the drawing; one icon for both states — the drawing alone does not tell a burning campfire from an extinguished one.” Zmienia obecne D-70; zadanie je zapisuje.

### Zadanie urzeczywistnia część, a resztę pisze zadanie 24

- Definicja, D-27 — Where do the game's icons come from?: „The game's icons are SVG files from game-icons.net, kept in `assets/icons/` outside the directory the account and save server serves and copied into that directory when the application is built. An icon file holds nothing that runs and refers to nothing outside itself.” Zadanie czyni to prawdziwym dla nowej ikony; zwinięte wzmianki w Siedzibie daje zadanie 24.
- Definicja, `icon-credits`: „For each SVG icon file directly in `assets/icons/`, the game's section of credits holds a credit that names the icon's title as its page on game-icons.net gives it, the icon's author, that page and the licence CC BY 3.0, and says how the icon file differs from its source.” Zadanie daje wzmiankę nowej ikonie tam, gdzie w chwili cyklu stoją wzmianki (stopka i karta logowania), a resztę wpisu pisze zadanie 24.

### Obecne decyzje, których zadanie dotyka

- D-70: „A campfire shows on the drawing of the game map as an icon on its tile, and its state — burning, with the minutes it has left, or extinguished — stands in the tile's row of the list of revealed tiles.” Zmienia je projektowane D-70 powyżej.
- D-19: „The drawing of the game map is a picture, not a control: its only interaction is hovering, […] and the numbers of stock stand in that list and in the line under the drawing, […] never on the drawing.”
- D-27: „The game's footer and a section of credits on the login card, folded and opened with one click, each credit each icon with its title as game-icons.net gives it, its author, its page on game-icons.net and its licence, and say how the icon file differs from its source.”
- D-43: „[…] or the content of an icon file in `assets/icons/` — that of an icon of an action drawn as a mask, taking its colour from the text beside it […], and that of any other icon holding its colour in the file, changed by hand when the value of `text-strong` changes.” Nowa ikona ogniska wygasłego trzyma kolor w pliku, jak pozostałe ikony mapy; zmianę D-43 i D-40, po której ikony mapy stoją maską w `text-strong` (pytanie 5), pisze zadanie 24.
- D-63: „A mage lights a campfire and a stick with the spell Płomyk: the actions „Zapal — ognisko” and „Zapal — patyk”, ordinary actions of the character carried out outside combat, whose price is the sticks they use and nature energy. […] With the bought branch „Czysty płomień”, „Zapal — ognisko” requires and consumes no sticks and costs the nature energy of ordinary lighting.”
- D-145: „A stick currently stays in the backpack after a strike, with its condition unchanged, and the game currently has no action for dressing wounds.”
- D-288: „A rule's row reads as a sentence and a rule panel changes it, opening in place on the list under the row of the rule or the header of the rule group it changes […]”.
- D-289: „The pick of the rule panel holds nothing undiscovered, and what is discovered but may not be picked stands greyed with its reason […]”.
- D-290: „The pick of the rule panel sets the actions in four named groups: […] Ogień — „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk”, „Zasil — ognisko”; […]”.
- D-293: „Beside a program rule's action, in its row and in the rule panel, stands the time one carrying out of the action takes, such as „10 min”, „tura” for an action of combat, for a movement during a map run the time of a step on that map, and nothing for a movement outside a map run.”
- D-310: „The reason names the thing refused as the game writes it, in lower case and without a dot before the name, such as „tu nie leży mech”, „brakuje 4 × patyk”, „brak opału: patyk” and „brak energii natury: 7 z 10” […]”.
- Glosariusz, „extinguished campfire”: „An extinguished campfire is a campfire standing on its tile with no minutes of burning left, whether it has burnt out or has not been lit yet.”
- Niezmienniki `icon-file-content`, `icon-credits`, `loop2-container-icons` (D-27) i `terrain-drawing-numbers` (D-19) dotyczą nowej ikony i rysunku mapy.

## Settlements to record

Candidates: 3 shown, 3 accepted — 2026-11-11

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Cena czynności stoi tylko w panelu reguły — przy każdej komórce wyboru czynności, także wyszarzonej, i przy wybranej czynności panelu — a nie w wierszu reguły. | decision | Pytanie 1 (wybór człowieka między pokazanymi drogami) | czy dopisać cenę także w wierszu reguły, jak czas wykonania (D-293) i jak w starym Loop |
| 2 | Cena brzmi w nawiasie po nazwie czynności, z nazwami rzeczy odmienionymi przez liczbę i z energią pełną nazwą, „(6 patyków)”, „(1 patyk)”, „(2 patyki, 10 energii natury)”, „(1 jagoda)”, a dane rzeczy mają formy liczby mnogiej. | decision | Pytanie 2 (wybór człowieka między pokazanymi drogami) | zapis „(6 × patyk)” jak powód przy regule, bez form liczby mnogiej w danych rzeczy |
| 3 | W przejściu cena idzie za postacią przejścia, jak czas wykonania — z „Czysty płomień” „Zapal — ognisko (10 energii natury)” — a na ekranie Programy i poza przejściem stoi cena z danych. | decision | Pytanie 3 (wybór człowieka między pokazanymi drogami) | czy liczyć cenę zawsze z danych, z patykami, których zapalenie postaci z „Czysty płomień” nie zabierze |

## Out of scope

- Ognisko w scenie, które już odróżnia stan wygasły; malejący płomień daje zadanie 18.
- Rysowanie maską ikon terenu i zwinięte wzmianki w Siedzibie, które daje zadanie 24.
- Płonący patyk na rysunku mapy, który stoi dalej tylko w tabeli odsłoniętych kafelków.
