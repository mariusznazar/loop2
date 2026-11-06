---
title: Ekran przejścia z nagłówkiem, trzema obszarami i nieruchomym kadrem lasu
status: draft
created: 2026-11-03
updated: 2026-11-03
tags: [zadanie]
related: "[[(P) Loop]]"
---

# Ekran przejścia z nagłówkiem, trzema obszarami i nieruchomym kadrem lasu

Status: ready for cycle
Project relation: plan item: plan_mvp2_loop2.md — ekran-przejscia

## Description

### Need

- Ekran ręcznego przejścia to dziś panel programu i jedna kolumna, w której jeden pod drugim stoją wiersz stanu, odkrycie, zapis starcia, wiersz ciała, plecak, rysunek mapy i tabela kafelków (`src/browser/view/game-view.ts:255-266`).
- Nic na tym ekranie nie pokazuje świata gry poza rysunkiem mapy.
- Mariusz: „obecnie gra jest strasznie nieczytelna, gdzie loop pod tym względem było dużo dalej”, a najbardziej chodzi mu o „podział na ekrany, układ elementów, interfejs tworzenia programu, animację ludzika”.
- Definicja projektu wymienia „czytelnym ekranem przejścia” w swoim celu.
- Cel zadania w planie: „Ekran ręcznego przejścia ma pod jednym nagłówkiem, z celem mapy w liczbach, świat po lewej, program pośrodku i jedną treść naraz po prawej, a w obszarze świata stoi nieruchomy kadr lasu, na którym wybrano rozmiar sceny.”
- Zadanie 7 stawia w tym kadrze maga, więc potrzebuje wybranego rozmiaru sceny.

### To do

1. Nad obszarami ekranu przejścia stoi jeden nagłówek: imię postaci, nazwa mapy, a za nimi cały dzisiejszy wiersz stanu bez zmiany brzmienia (pytanie 3).
   - Wiersz stanu to tekst „Minuta {minuta} · {czynność} · Passa {streak}/{required}”, z „ (pauza)” na końcu w pauzie, oraz „Pauza” albo „Wznów”, pięć przycisków tempa, „Restart”, ostrzeżenie o przyciętym planie i „Zakończ”, w dzisiejszej kolejności.
   - Cel w liczbach to „Passa {streak}/{required}” i „Pokonane napaści {count}/{required}”, w tej kolejności, gdy warunek mapy ma oba wymagania.
2. Pod nagłówkiem stoją obok siebie trzy osobne obszary: świat po lewej, program pośrodku i jedna treść naraz po prawej, a każdy z nich jest elementem, który węższy układ może przestawić.
3. W prawym obszarze stoi panel reguły z zadania 5, gdy gracz edytuje regułę, a w pozostałych chwilach tabela odsłoniętych kafelków.
   - Koniec przejścia nie zajmuje prawego obszaru (pytanie 4).
4. Obszar świata ma od góry kadr lasu, zapis ostatniego starcia, linie końca przejścia, wiersz ciała z plecakiem, rysunek mapy i linię kafelka (pytanie 4).
   - Linie końca przejścia to „Do skrzynki: …” albo „Do skrzynki nic nie trafiło.” po rozwiązaniu mapy i zdanie o wskrzeszeniu po śmierci postaci; stoją pod zapisem starcia, gdy on jest.
   - Linie „Mapa jest już rozwiązana…”, „Wprawa w tym przejściu…” i „Wyniesie…” stoją jak dziś między plecakiem a rysunkiem mapy.
5. Pod rysunkiem mapy stoi linia kafelka z liczbami zapasu kafelka wskazanego kursorem, a bez wskazania kafelka postaci.
   - Liczby dalej nie stoją na samym rysunku.
   - Najechanie dalej wiąże kafelek z jego wierszem w tabeli, gdy tabela stoi.
6. Na górze obszaru świata stoi nieruchomy kadr lasu w śniegu, w pełnym świetle (pytanie 2).
   - Kadr jest obrazem PNG z paczki Pixel Crawler, leży bezpośrednio w `assets/sprites/` i nie stoi na nim żaden tekst.
   - Prośba o scalenie pokazuje kadr na prawdziwym ekranie, z edytorem z zadania 5 w obszarze programu, w obu rozmiarach, 336 × 152 i 672 × 304; po uwadze Mariusza poprawka zostawia jeden z nich (pytanie 1).
7. Linia odkrycia staje się pasem w roli `discovery` nad programem, z tym samym tekstem o odkryciu, z „Dodaj regułę z tym” i z „Wznów”.
   - Pas stoi do „Wznów”, a gdy przejście kończy się rozwiązaniem mapy w minucie odkrycia, do „Restart” albo „Zakończ”.
   - „Dodaj regułę z tym” dodaje regułę na końcu pierwszej grupy kopii i otwiera jej panel z pierwszą odkrytą czynnością, a gdy żadnej czynności nie odkryto, z pierwszym odkrytym warunkiem; gdy odkryto sam przedmiot albo stworzenie, działa jak „+ reguła” (pytanie 5).
   - Przy odkrytej czynności reguła ma warunek „Zawsze”, a gdy czynność potrzebuje celu, celem jest pierwszy pasujący przedmiot z tego samego odkrycia, a bez takiego pierwszy cel z siatki; „Odkryto: Zbierz, Patyk.” daje „Zawsze → Zbierz — patyk” (pytanie 10).
   - Przy samym warunku reguła to „{warunek} → Eksploruj”, a liczba i cel tego warunku są takie, jakie daje wybór tego warunku w panelu reguły z zadania 5 (odczytanie z pytania 10).
   - Panel otwiera się na polu, które przycisk wypełnił z odkrycia; gdy wypełnił z niego czynność i jej cel, otwiera się na polu czynności, pierwszym z nich w kolejności pól panelu, jak mówi pytanie 5 (odczytanie z pytań 5 i 10).
   - Dodanie reguły tym przyciskiem zeruje passę, jak każda zmiana reguł kopii (D-131).
   - Gdy w tej minucie gra dopisała regułę, pas mówi „Gra dopisała regułę w grupie „{nazwa grupy}”: Zawsze → Eksploruj.”, bez numeru reguły (pytanie 6).
   - „{nazwa grupy}” to nazwa grupy kopii, do której gra wpisała regułę, bo pas stoi nad programem przejścia, czyli nad kopią; gdy kopia nie miała grupy, to „Program” (D-123 w definicji; odczytanie z pytania 6).
   - „Wznów” w nagłówku działa dalej obok „Wznów” w pasie, bo oba robią to samo jedno wznowienie (D-122).
8. Ekran przejścia jest ekranem w React i dalej dostaje przejście jako parametr, zamiast sam czytać je ze stanu gry.
   - Przyciski nagłówka i pasa są wspólnymi kontrolkami w postaci React (D-265).
   - „Restart” i „Zakończ” biorą postać React przycisku niszczącego, którą dokłada zadanie 4; gdyby jej przy starcie cyklu nie było, dokłada ją to zadanie z przypadkiem w teście porównującym obie postaci.
9. `guidelines/coding-browser-module.md` dostaje wiersze nowych plików, a jego przykład „Kontrolki w DOM i ich aktualizacja”, który stoi na `src/browser/view/status-row.ts`, wskazuje moduł, który po tej zmianie dalej jest w DOM; zmiany idą przez `the-way-maintain-coding-guidelines`.
10. Fundament dostaje wszystko, co *Decisions in play* oznacza do zapisania w tym zadaniu, poprawiony przykład D-46 oraz zdania o miejscu w D-147, D-185 i D-216 (pytanie 7).

### Questions to settle

- Pytanie 1. Jaki rozmiar ma scena, 336 × 152 czy 672 × 304, i kiedy człowiek go wybiera, skoro „Rozstrzyga oglądanie sceny w układzie ekranu”?
  - Answer: Cykl stawia kadr na prawdziwym ekranie z nowym edytorem, prośba o scalenie pokazuje oba rozmiary, a poprawka po uwadze Mariusza zostawia jeden. Koszt przyjęty z tą drogą: jedna runda uwag przed scaleniem, która trzyma kolejne zadanie. Gdy wybór padnie na 336 × 152, słowa „Scena większa” w definicji i „W większej scenie” w celu zadania 7 idą do zmiany w swoich procesach, bo stary Loop ma scenę tej wielkości.
  - Not chosen:
    - wybór teraz, bez oglądania ekranu — odejście od zdania definicji i ryzyko, że wybór się nie utrzyma
  - Source: Mariusz, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, odpowiedź na pakiet rundy zadań 4–7, punkt B12, rekomendacja A; pytanie wspólne z zadaniem 7. Pytanie: definicja_mvp2_loop2.md (odcisk 9641f804), *Open questions*, wiersz 96: „Jaki rozmiar ma scena: 336 × 152 czy 672 × 304? Rozstrzyga oglądanie sceny w układzie ekranu. — resolved in: task: ekran przejścia”. Skutek dla 336 × 152: pakiet, część D, przyjęta tą samą odpowiedzią.
- Pytanie 2. Co pokazuje nieruchomy kadr lasu: las w śniegu czy zielony, i czy jest w pełnym świetle?
  - Answer: Las w śniegu, z gotowych obrazków starego Loop; słaby punkt przyjęty z tą drogą: szron z zadania 18 gorzej widać na bieli, a śnieg stoi też przy 25 °C. Kadr jest w pełnym świetle, bo noc to warstwa nad kadrem, którą dokłada zadanie 18; do zadania 18 scena nie ma nocy.
  - Not chosen:
    - las zielony — inny las niż na logowaniu i wycinanie z arkuszy
    - kadr ciemny w pliku, droga pokazana na wypadek skreślenia cytatów o świetle — zadanie 18 wymienia plik
  - Source: pora roku: Mariusz, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, wiersz T29. Światło: cytaty nieskreślone przez Mariusza 2026-11-03, pakiet, punkt A6: plan_mvp2_loop2.md (sha256 36c4721a), cel zadania 18: „Noc w scenie jaśnieje razem z passą, utrata passy ściemnia las, rozwiązanie mapy daje pełny świt”; tamże, *Open questions*: „Jaki kolor ma warstwa nocy i świtu? Wartość wybiera Mariusz.”; definicja_mvp2_loop2.md (odcisk 9641f804), D-132, wiersz 691: „the scene showing a full dawn”.
- Pytanie 3. Gdzie do zadania 14 stoi to, co postać robi, i gdzie stoją „Restart”, ostrzeżenie o przyciętym planie i „Zakończ”?
  - Answer: Cały wiersz stanu przechodzi do nagłówka bez zmiany brzmienia, a przed nim stają imię postaci i mapa; „Restart” i „Zakończ” stoją w nim jak dziś. Zegar czyta się dalej „Minuta 212”. Pozycja „Wróć do przejścia” stoi w menu tylko poza ekranem przejścia, więc w nagłówku jej nie ma. Słaby punkt przyjęty z tą drogą: długi nagłówek do zadania 14.
  - Not chosen:
    - nagłówek bez czynności, a pod kadrem osobny wiersz z tym, co postać robi — część pracy zadania 14 i zmiana planu
    - zegar w zapisie „03:32” — nowy zapis czasu
    - „Wróć do przejścia” także na ekranie przejścia — odnośnik do miejsca, w którym gracz już jest
  - Source: Mariusz, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, punkt B16, rekomendacja „A, C, E, czyli „Wróć do przejścia · Las · minuta 212””; pytanie wspólne z zadaniem 4.
- Pytanie 4. Gdzie do zadania 16 stoją linie końca przejścia i zapis ostatniego starcia?
  - Answer: W obszarze świata, między kadrem a wierszem ciała; prawy obszar nie przejmuje końca przed zadaniem 16.
  - Not chosen:
    - linie końca w prawym obszarze już w tym zadaniu, droga pokazana na wypadek skreślenia cytatów — część zadania 16 i większe zadanie przed terminem
  - Source: cytaty nieskreślone przez Mariusza 2026-11-03, pakiet rundy, punkt A5: plan_mvp2_loop2.md (sha256 36c4721a), cel zadania 16: „Koniec przejścia w prawym obszarze mówi kolejno, co się stało, co to kosztowało albo dało, dlaczego i co dalej”, i wiersz wpisu „(new) — What does the end of a map run explain? | 16 | 16”; foundations/decisions.md przy 20d804b, D-185: „stands below the discovery line and last-encounter paragraph when present and above the body and backpack, directly below the status row when neither is present, until „Restart” or „Zakończ”.”; definicja_mvp2_loop2.md (odcisk 9641f804), wiersz 226: „The world holds, from the top, the scene, „Teraz” and „Potem”, the body row with the minutes each need lasts, the backpack, the drawing of the map and the line of a tile under it.”
- Pytanie 5. Co robi „Dodaj regułę z tym”?
  - Answer: Dodaje regułę na końcu pierwszej grupy kopii i otwiera panel z pierwszą odkrytą czynnością, a bez czynności z pierwszym warunkiem; przy samym przedmiocie albo stworzeniu działa jak „+ reguła”. Koszt przyjęty z tą drogą: reguła działania na liście odkryć, a dodanie zeruje passę jak każda zmiana kopii.
  - Not chosen:
    - działa jak „+ reguła” — napis „z tym” obiecuje więcej
    - przycisk później — odejście od zatwierdzonego brzmienia i wskazanie zadania
  - Source: Mariusz, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, punkt B13, rekomendacja A. Przycisk nazywa definicja_mvp2_loop2.md (odcisk 9641f804), D-122, wiersz 631: „with „Dodaj regułę z tym” and „Wznów””.
- Pytanie 6. Jak pas odkrycia mówi o regule, którą dopisała gra?
  - Answer: „Gra dopisała regułę w grupie „{nazwa grupy}”: Zawsze → Eksploruj.”, bez numeru reguły. Słaby punkt przyjęty z tą drogą: dłuższe zdanie w pasie.
  - Not chosen:
    - zdanie bez grupy, „Gra dopisała regułę: Zawsze → Eksploruj.”, wybrane w pierwszym pakiecie i zmienione pytaniem kontrolnym — gracz sam szuka reguły w programie
    - z numerem „1.1” — zależność od numeracji
    - bez zdania do zadania 10 — odejście od definicji
  - Source: Mariusz, 2026-11-03: najpierw „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, wiersz T31 (zdanie bez grupy); potem „wszystko przyjmuję zgodnie z rekomendacjami”, drugi pakiet rundy, pytanie kontrolne E4, droga B, które zmieniło tamten wybór. Definicja_mvp2_loop2.md (odcisk 9641f804), D-122, wiersz 631: „names what was discovered and the program rule the game wrote”; D-123, wiersz 646: „where either holds no rule group, the game adds the rule group „Program” with the condition „Zawsze” and writes the rule into it”.
- Pytanie 7. Czy to zadanie poprawia zdania o miejscu w D-147, D-185 i D-216, których plan mu nie przydzielał?
  - Answer: Tak, tylko zdania o miejscu; plan dołączył zadanie 6 do wierszy D-147, D-185 i D-216, a pisze je dalej zadanie 16.
  - Source: Mariusz, 2026-11-03, przyjęcie części D pakietu rundy („Pewne: zadanie 6 dołącza do wierszy D-147, D-185 i D-216 planu, tylko dla zdań o miejscu”); plan_mvp2_loop2.md (sha256 36c4721a), *Change log*, wpis 2026-11-03 „zadanie 6 dołącza do D-147, D-185 i D-216 tylko dla zdań o miejscu, a pisze je dalej zadanie 16”.
- Pytanie 8. Czy to zadanie, które dokłada plik obrazu do `assets/sprites/`, dodaje stały test odmowy?
  - Answer: Nie: „odstępstwo kończy tylko zmiana zasady granicy, więc kolejny plik PNG nie kończy go; zadania 6 i 7 nie dodają stałego testu, a przydziały w tabeli wpisów zostają”.
  - Not chosen:
    - każda zmiana plików granicy — test przy zadaniu 6, które pierwsze dokłada obrazek, zmiana odpowiedzi „pliki testów żadne”, zmiana planu
    - nowe pliki się liczą, a zmiana budowania nie — te same koszty
  - Source: plan_mvp2_loop2.md, *Change log*, wpis 2026-11-01 o pytaniu w sprawie `assets/sprites/**` (human, 2026-11-01); ways not chosen: logowanie_na_tle_gry_loop2.md, pytanie 3, human, 2026-11-01, „zgadzam się na komplet rekomendacji”, pozycja 13.
- Pytanie 9. Które nieaktualne przykłady poprawia to zadanie?
  - Answer: D-46: „D-46 w zadaniu 6”.
  - Source: plan_mvp2_loop2.md, *Open questions*, pytanie o nieaktualne przykłady i uzasadnienia, odpowiedź (human, 2026-11-01).
- Pytanie 10. Co jeszcze stoi w regule, którą dodaje „Dodaj regułę z tym”: jaki warunek przy odkrytej czynności, jaki cel, gdy czynność go potrzebuje, i na którym polu otwiera się panel?
  - Answer: Przy odkrytej czynności warunek „Zawsze”; gdy czynność potrzebuje celu, celem jest pierwszy pasujący przedmiot z tego samego odkrycia, a bez takiego pierwszy cel z siatki. Przy samym warunku reguła to „{warunek} → Eksploruj”. Panel otwiera się na polu, które przycisk wypełnił z odkrycia. Koszt przyjęty z tą drogą: jedno zdanie zasady; zysk: „Odkryto: Zbierz, Patyk.” daje od razu „Zawsze → Zbierz — patyk”.
  - Not chosen:
    - cel zawsze pierwszy w siatce, bez patrzenia na odkrycie — „Odkryto: Zbierz, Patyk.” może dać „Zbierz — jagoda”
  - Source: Mariusz, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami”, odpowiedź na drugi pakiet rundy zadań 4, 5, 6, 7 i 11, punkt C2, rekomendacja A; pytanie wspólne z zadaniem 5, którego panel przycisk otwiera. Dla porównania definicja_mvp2_loop2.md (odcisk 9641f804), D-124, wiersz 661: „„+ reguła” adds a program rule at the end of its rule group and opens its rule panel on the condition, „Zawsze → Eksploruj” standing there until the player picks otherwise”.

## Context

- Numery wierszy kodu są z commitu `20d804b`; cytowane pliki poza `src/browser/styles.css` nie zmieniły się od `799d1ff`, a cytowane wiersze `styles.css` stoją tak samo.
- Dzisiejsze kolumny stoją w `src/browser/view/game-view.ts:94-104` i `src/browser/styles.css:106-117`.
- Tekst wiersza stanu składa `src/browser/view/status-row.ts:51-76`, a jego przyciski `:171-197`.
- Linia odkrycia to `src/browser/view/status-row.ts:176-178`, a jej dane `src/browser/sim/types.ts:414-417`.
- Rysunek mapy i tabela stoją dziś razem w `src/browser/view/terrain-panel.ts:32-42`.
- `tests/invariants/test_terrain_drawing_numbers.py` buduje panel przez `createTerrainPanel()` i liczy jako tekst rysunku wszystko poza tabelą, więc przeniesienie tabeli i nowa linia kafelka zmieniają jego odczyt; przyczyna zmiany stoi w D-19 (`guidelines/testing.md`, „Changing an existing test”).
- Testy widoku ekranu przejścia stoją w `tests/view/` (`status-row`, `body-row`, `combat-line`, `tile-list`, `terrain-picture`, `trip`), a test ekranu w React idzie na wspólnej uprzęży D-264.
- Strona wszystkich stanów nie importuje modułów ekranu przejścia (`src/browser/kitchen-sink/`), więc przejście tych modułów na `.tsx` nie łamie D-269.
- W `src/browser/view/controls/react-button.tsx` przy `20d804b` postać React zna rodzaje `secondary` i `tab`, a przycisku niszczącego nie ma.
- Postać React przycisku niszczącego należy do zadania 4, „bo tam pierwszy raz jest potrzebny”: odczytanie agenta z drugiego pakietu rundy, część F, bez sprzeciwu Mariusza 2026-11-03 („wszystko przyjmuję zgodnie z rekomendacjami”).
- Plan stawia zadanie 6 po zadaniach 5 i 11, więc w obszarze programu stoi już nowy edytor z tłami, paskiem i powodem przy regule.
- Plan, wpis 2026-11-03 o zależności od zadania 11: zadanie 6 rozstrzyga rozmiar sceny, „oglądając na prawdziwym ekranie kolumnę programu o szerokości 208–304 px, jaka zostaje przy większej scenie”.
- Pakiet rundy liczył na program około 640 px przy 336 i 304 px przy 672 w szerokim oknie, a przy oknie 1280 px około 544 i 208 px.
- Treść ekranów ma najwyżej 1344 px szerokości, a w węższym oknie zajmuje całą szerokość: wiersz 9 kandydatów zadania 4, przyjęty przez Mariusza 2026-11-03 („wszystko przyjmuję zgodnie z rekomendacjami”, drugi pakiet rundy, część D); do fundamentu zapisuje go cykl zadania 4.
- Scena 672 × 304 to ten sam obraz 336 × 152 w skali 2:1 (`rozpoznanie_mvp2\rozpoznanie_frajda.md:201`, `:251`), więc oba rozmiary pokazuje jeden plik.
- Scena starego Loop ma 336 × 152 i skaluje się całymi krotnościami (`C:\Storage\repos\loop\src\components\probe\Scene.tsx:18-22`).
- Wycięte obrazki starego Loop leżą w `C:\Storage\repos\loop\public\sprites\`, między innymi `ground.png`, `pine_tall.png`, `tree_snow.png` i `sap_snow.png`, a ich ułożenie w `Scene.tsx:28`.
- Pliki paczki i sposób ich cięcia opisuje *Context* dokumentu `logowanie_na_tle_gry_loop2.md`.
- Budowanie kopiuje tylko pliki PNG leżące bezpośrednio w `assets/sprites/` (`scripts/static-files.mjs:32-46`), a do obrazu serwera wchodzą przez `.dockerignore:9` i `Dockerfile:10`.
- Paczka Pixel Crawler nie wymaga wzmianki, więc zadanie nie dopisuje jej do wzmianek, o ile kadr pochodzi tylko z tej paczki.
- Mapa Las ma 25 °C (`src/browser/sim/data/maps.ts:66`), a Las — głębiej 7 °C (`:84`).
- Szkic ekranu stoi w `rozpoznanie_mvp2\rozpoznanie_projektant.md`, części A.4, B.1 i B.2; to materiał, nie zatwierdzone wymaganie.
- Roboczy dokument zadania 4 (`ekrany_i_menu_loop2.md`) bierze na siebie adres `#/postac/{n}/przejscie` i przekazanie przejścia jako parametru.
- Plan, 2026-11-01: „cel zadania 6 mówi o nieruchomym kadrze lasu zamiast o miejscu sceny”, bo „sceny jeszcze nie ma, a pytanie o rozmiar rozstrzyga oglądanie”.
- Zadanie nie zmienia sposobu wdrażania ani miejsca działania gry.

## Questions carried to cycle

- Jak złożyć kadr z kawałków paczki i czy skrypt składający wchodzi do repozytorium?
- Jaką szerokość mają obszary świata i prawy, skoro program bierze resztę?
- Od jakiej szerokości okna trzy obszary stoją obok siebie, skoro dziś kolumny składają się dopiero poniżej 720 px?
- Jak symulacja mówi widokowi o regule, którą dopisała, i o grupie, do której ją wpisała, i czy zmienia to kształt zapisu gry? Plan: „każde zadanie, które zmienia kształt stanu gry, podbija wersję raz w swojej zmianie”.

## Human actions

none

## Decisions in play

Wpisy obecne cytuje `foundations/decisions.md` przy loop2 `20d804b`. Wpisy projektowane cytuje `definicja_mvp2_loop2.md`, zatwierdzona 2026-11-03, odcisk 9641f804. Przydziały pochodzą z sekcji *Projected entries* planu (sha256 36c4721a).

*Relations* i *Verification* wpisu projektowanego mają `TODO`, więc cykl ustala je przy zapisie.

### Zadanie zapisuje w całości

- D-130 — Where does the player pick the pace, and with which control? (definicja): „The player picks the pace with five buttons „1×”, „2×”, „4×”, „8×” and „16×” beside „Pauza” in the header of the screen of a map run, and the button of the pace in force is a button selected in its group.”
- D-19 — How does the player interact with the terrain panel's drawing of the game map? (definicja): „The terrain panel's drawing of the game map is a picture, not a control: its only interaction is hovering, which links a tile with its row in the list of revealed tiles, and the numbers of stock stand in that list and in the line under the drawing, which shows the hovered tile or else the character's tile, never on the drawing.”
  - *Rationale* dostaje zdanie: „The list stands in the right area, which the editing of a rule takes, so the line under the drawing keeps the numbers beside the program while the player writes.”

### Zadanie urzeczywistnia część, a resztę pisze inne zadanie

Część, którą kod tego zadania czyni prawdziwą, zadanie zapisuje w fundamencie (WAY-126), bo inaczej fundament mówiłby nieprawdę o scalonej grze.

- (new) — How is the screen of a map run laid out? (definicja; pisze zadanie 14): „The screen of a map run has three areas under one header: the world on the left, the program in the middle, and on the right one content at a time, the end of the map run first, then the editing of a program rule, then the chronicle and the table of revealed tiles. The world holds, from the top, the scene, „Teraz” and „Potem”, the body row with the minutes each need lasts, the backpack, the drawing of the map and the line of a tile under it. The header holds the character, the map, the clock, a bar of the solving condition with its numbers, and the pace.”
  - Część tego zadania: trzy obszary pod jednym nagłówkiem, edycja reguły przed tabelą, świat bez „Teraz” i „Potem”, nagłówek z postacią, mapą i całym wierszem stanu zamiast paska; koniec przejścia nie zajmuje prawego obszaru (pytania 3 i 4).
- D-133 — Where does the player see a map run's streak and a map's solving condition? (definicja; pisze zadanie 14): „During a map run the header shows a bar with numbers for the requirements present in the map's solving condition: „Passa {streak}/{required}” for a streak and „Pokonane napaści {count}/{required}” for beaten attacks, in that order when both are present. The card of each open map shows the sentence of its solving condition from the map's data, as „Las — 480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu”.”
  - Część tego zadania: liczby celu stoją w nagłówku, w wierszu stanu; pasek dokłada zadanie 14, a zdanie warunku na karcie mapy zadanie 13.
  - Obecne brzmienie: „During a map run the status row shows progress for the requirements present in the map's solving condition beside the game minute and the character's activity: „Passa {streak}/{required}” for a streak and „Pokonane napaści {count}/{required}” for beaten attacks, in that order when both are present”.
- D-147 — What record of an encounter does the player read? (definicja; pisze zadanie 16): „From an attack the map run keeps its last encounter's facts and shows a wrapping paragraph as an entry of the chronicle and at the end of the map run”.
  - Część tego zadania: tylko zdanie o miejscu; zapis stoi w obszarze świata pod kadrem i nad wierszem ciała (pytania 4 i 7).
  - Obecne brzmienie: „shows a wrapping paragraph in `text`, below any discovery line and above the body and backpack”.
- D-185 — Where does the player read what completion deposited? (definicja; pisze zadanie 16): „After completion the line „Do skrzynki: {item} {count}, …” or „Do skrzynki nic nie trafiło.” in `text-secondary` stands in the section of the end of the map run saying what it gave, until „Restart” or „Zakończ”.”
  - Część tego zadania: tylko zdanie o miejscu; linia stoi w obszarze świata pod kadrem i zapisem starcia, gdy on jest, i nad wierszem ciała (pytania 4 i 7).
  - Obecne brzmienie: „stands below the discovery line and last-encounter paragraph when present and above the body and backpack, directly below the status row when neither is present, until „Restart” or „Zakończ”.”
- D-216 — Where does the player read what a character's death took? (definicja; pisze zadanie 16): „After a character's death, in the section of the end of the map run saying what it cost, until „Restart” or „Zakończ” and after a load too, a line stands”.
  - Część tego zadania: tylko zdanie o miejscu; linia stoi na miejscu linii „Do skrzynki: …” (pytania 4 i 7).
  - Obecne brzmienie: „at the place of the line „Do skrzynki: …” below the discovery line and last-encounter paragraph when present and above the body row”.
- (new) — How does an address name a screen? (definicja; pisze zadanie 22): „The screen of a map run takes its map run as a parameter and reads no map run of the game state by itself.”
  - Część tego zadania: zachowanie tego zdania przy przebudowie ekranu; adres stawia zadanie 4.
- (new) — What do the screens leave room for from the start? (definicja; pisze zadanie 5): „Each column of a screen is an area of its own that a narrower layout can rearrange”.
  - Część tego zadania: trzy obszary ekranu przejścia.
- D-122 — What does a map run do, and what does the player see, when something is discovered? (definicja; pisze zadanie 16): „When something is discovered in a map run the player starts, the map run stops in the same pause as after „Pauza”, and the player goes on with „Wznów”. A band in the role `discovery` above the program names what was discovered and the program rule the game wrote, the discoveries of one game minute in one band, with „Dodaj regułę z tym” and „Wznów”, and it stands until the player goes on, the scene keeping its colours, and what it named enters the chronicle. Where the map run ends in a completion in the game minute of a discovery, the end of the map run takes the place of the pause and names that discovery until „Restart” or „Zakończ”.”
  - Część tego zadania: pas nad programem z treścią i przyciskami; kolory sceny robi zadanie 7, kronikę zadanie 15, a koniec zadanie 16.
  - Obecne brzmienie, które zadanie zmienia: „Below the status row a line in the role `discovery` names what was discovered, the discoveries of one game minute in one line, and it stands until the player goes on; where the last encounter has a line, it stands below the discovery line and above the body and backpack.”
- D-272 — Where may a picture of the game stand? (definicja; pisze zadanie 21): „A picture of the game stands behind the login card, in a band at the top of Siedziba and as the scene, and text stands on a solid background, never on a picture.”
  - Obecne brzmienie: „A picture of the game stands behind the login card, and text stands on a solid background, never on a picture.”
  - Część tego zadania: słowa „as the scene” i przykład *Verification* „the waiting screens and the game with no picture”, który przestaje być prawdą.
- D-271 — Where do the scene's pictures come from? (definicja; pisze zadanie 20): „The scene's pictures and the picture of the game behind the login card are sprites of the packs Pixel Crawler and LPC Wolf, kept in `assets/sprites/` outside the directory the account and save server serves and copied into it when the application is built. A sprite file holds pixels alone, the game credits each pack whose licence asks for a credit, and the character of the scene is the pack's mage.”
  - Obecne brzmienie: „The scene's pictures and the picture of the game behind the login card are sprites of the pack Pixel Crawler, kept in `assets/sprites/` outside the directory the account and save server serves and copied into it when the application is built. A sprite file holds pixels alone.”
  - Zadanie nie zmienia brzmienia; kadr jest pierwszym obrazem sceny.
- `loop2-container-sprites` (definicja, niezmiennik; pisze zadanie 20): „The image of the application holds in the directory the account and save server serves every file the scene's drawing asks for.”
  - Część tego zadania: kadr jest pierwszym plikiem, o który prosi rysunek sceny, a wpis zapisuje zadanie 20.
- D-03 — How is the browser view built? (obecny, w definicji bez zmiany brzmienia; pisze zadanie 2): „The browser view is built in TypeScript with React, its screens written as `.tsx` components that draw from the game state, and no other UI framework stands in its code or its runtime dependencies.”
  - Część tego zadania: ekran przejścia.

### Przykład do poprawy w tym zadaniu

- D-46 (*Verification*): „the clock of the map run in the status row set in Geist Mono”; zegar stoi teraz w wierszu stanu w nagłówku ekranu przejścia.

### Obecne decyzje, których zadanie dotyka bez zmiany

- D-62 — What does the screen show, and what can the player do, after a character's death?: „After a character's death the pace buttons are gone together with „Pauza”.”; zmianę pisze zadanie 16.
- D-132 — What does the screen show, and what can the player do, after a completion?: „„Pauza” and the pace buttons are gone, and the player has „Restart” and „Zakończ” as after a character's death.”; zmianę pisze zadanie 18.
- D-188 — Where does the player learn that a map cuts the trip plan?: „The same line stands in the status row beside „Restart” for the current copy and map”; zmianę pisze zadanie 13.
- D-186 — What does the running map show of the frozen bring plan?: „During a map run, below the backpack, „Wyniesie: {item} {count}, …” in `text-secondary`”.
- D-201 — What does the map-run view show of its practice?: „Below the body row the map-run view currently shows a line in the role `text`, „Wprawa w tym przejściu: {umiejętność} +{n} · …””.
- D-215 — Where does the player read that a manual run of a solved map pays and takes nothing?: „below the body row and the backpack and above the line „Wprawa w tym przejściu””.
- D-125 — What do the body row, the backpack and the terrain panel show of what is not yet discovered?: „The body row, the backpack, the list of revealed tiles and the drawing of the game map show what the game state holds, whatever the Understanding holds”.
- D-70 — How does the browser view show a campfire?: „its state — burning, with the minutes it has left, or extinguished — stands in the tile's row of the list of revealed tiles”.
- D-21 — How does time pass in a map run the player starts?: „Picking a pace while the map run is paused, the pause at a discovery included, changes the pace and leaves the map run paused until „Wznów”.”
- D-129 — How long does the pace the player picks stay?: „through a pause, the pause at a discovery included, „Restart”, „Zakończ” and the next send of a character”.
- D-131 — Which changes of the program a map run carries out reset its solving progress?: „Of the edits of the copy a map run carries out, an edit after which the copy's rules or rule groups differ from those before it, the discard of the copy's unsaved changes included, sets the streak and the number of beaten attacks of the map run in progress to zero”.
- D-123 — What does the game write into the program at a discovery?: „Today the game writes one such rule, „Zawsze → Eksploruj”, when the first chill brings „Eksploruj” into the Understanding.”; zmianę pisze zadanie 10.
- D-43 — What counts in the browser view as a value written in place of a design token?: „the `width` and `height` attributes of an image, a layout dimension — a width or height with its minimum and maximum, or the sizes of the columns of a layout grid”.
- D-44 — Which controls do the screens of the browser view build on?: „the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program” and „Zatrzymaj” are destructive buttons”; zmianę wyglądu przycisków niszczących pisze zadanie 5.
- D-265 — How does a shared control stand in a screen built with React while other screens stay in DOM?: „a shared control that a React screen uses has two forms in `src/browser/view/controls/`, a React component and a DOM function, drawing one tree of DOM elements with the same classes and attributes”.
- D-276 — What is a tab of the browser view?: „the pace buttons of D-130 keep the look of the button selected in its group.”
- D-279 — What colour does a frame or a bar that sets a text apart take?: „A frame or a bar drawn at a text to set it apart […] takes the colour of that text and is part of it, so the text's role keeps the meaning D-39 and D-40 give it.”
- D-264 — What does a test of a screen built with React run on?: „One harness, `tests/view/page-document.mjs`, carries those files”.
- D-269 — Does the kitchen-sink page hold React?: „no module it imports, directly or through other modules, reaches a `.tsx` file while `scripts/kitchen-sink.mjs` bundles nothing”.
- D-273 — When do the files of `assets/sprites/` gain a refusal test?: „what changes the boundary is read as D-76 reads it, so a further PNG file does not”.
- D-87 — When are whole-screen pixel comparisons used?: „Whole screens are not preserved by pixel-by-pixel image comparison, while agreed appearance rules keep their checks and a changed appearance is inspected in a browser.”
- D-88 i D-254: zachowanie w prawdziwej przeglądarce sprawdza agent i człowiek, a imitacja dokumentu tego nie dowodzi.

## Settlements to record

Candidates: 9 shown, 5 accepted — 2026-11-03

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Do zadania 14 cały wiersz stanu stoi w nagłówku ekranu przejścia bez zmiany brzmienia, za imieniem postaci i mapą, a „Restart”, ostrzeżenie o przyciętym planie i „Zakończ” stoją w nim jak dziś. | decision | pytanie 3 | Czy „Restart” i „Zakończ”, których projektowany wpis o układzie nie wymienia w nagłówku, zapisać przy nagłówku, czy pominąć ich miejsce w fundamencie. |
| 2 | Kadr sceny to las w śniegu, z gotowych obrazków starego Loop. | decision | pytanie 2 | Jaki las złożyć, na którym zadanie 7 postawi maga, a zadanie 18 szron. |
| 3 | Kadr sceny jest w pełnym świetle, a noc to warstwa nad kadrem. | decision | pytanie 2 | Czy przyciemnić plik kadru, jak obraz za kartą logowania. |
| 4 | „Dodaj regułę z tym” dodaje regułę na końcu pierwszej grupy kopii: przy odkrytej czynności „Zawsze → {pierwsza odkryta czynność}”, z celem z pierwszego pasującego przedmiotu tego odkrycia, a bez takiego z pierwszym celem siatki; bez czynności „{pierwszy odkryty warunek} → Eksploruj”; przy samym przedmiocie albo stworzeniu działa jak „+ reguła”; panel otwiera się na polu, które przycisk wypełnił z odkrycia. | decision | pytania 5 i 10 | Co robi przycisk, który definicja tylko nazywa, i co wpisuje w pola reguły. |
| 5 | Pas odkrycia mówi o regule dopisanej przez grę „Gra dopisała regułę w grupie „{nazwa grupy}”: Zawsze → Eksploruj.”, bez numeru reguły. | decision | pytanie 6 | Brzmienie zdania, czy dać numer reguły i czy nazwać grupę. |

## Out of scope

- „Teraz”, „Potem”, prognozę potrzeb i pasek celu robi zadanie 14.
- Koniec przejścia w prawym obszarze robi zadanie 16.
- Maga, ruch, ikonę zajęcia i szarość sceny przy pauzie robi zadanie 7.
- Noc i świt nad kadrem robi zadanie 18.
- Kronikę i zakładki prawego obszaru robi zadanie 15.
- Stan i powód przy regule robi zadanie 11.
- Nowy edytor i panel reguły robi zadanie 5.
- Adresy, menu z „Wróć do przejścia” i pauzę przy wyjściu z ekranu robi zadanie 4.
- Układ na telefon: zadanie tylko zostawia na niego miejsce.
