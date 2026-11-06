---
title: Scena z magiem na ekranie przejścia
status: draft
created: 2026-11-03
updated: 2026-11-03
tags: [zadanie]
related: "[[(P) Loop]]"
---

# Scena z magiem na ekranie przejścia

Status: ready for cycle
Project relation: plan item: plan_mvp2_loop2.md — scena-z-ludzikiem

## Description

### Need

- W loop2 nie ma dziś sceny: ekran przejścia to wiersz stanu, wiersz ciała i rysunek mapy (`src/browser/view/game-view.ts:255`, loop2 20d804b).
- Po zadaniu 6 w obszarze świata stoi nieruchomy kadr lasu, ale nic się w nim nie rusza i nic nie mówi, co robi postać.
- Mariuszowi w starym Loop najbardziej brakuje „podział na ekrany, układ elementów, interfejs tworzenia programu, animację ludzika” (definicja, Background).
- Mariusz o kolejności: „najbardziej zależy mi na edytorze, ludziku i stronie logowania, bo to obecnie jest w najgorszym stanie + podział na ekrany” (definicja, Inputs and constraints).
- Cel projektu to zamiana loop2 „w grę z osobnymi ekranami, czytelnym ekranem przejścia, nowym edytorem programu, sceną z ludzikiem, ładnym logowaniem i samouczkiem” (definicja, Goal).
- Zadanie zamyka fazę „Przed zgłoszeniem 10x” (plan, Phases).
- Cel zadania w planie: „W większej scenie pikselowego lasu mag chodzi do patyków i ogniska, nad głową ma ikonę zajęcia z paskiem postępu, a przy odkryciu scena zostaje kolorowa.”

### To do

1. W miejscu nieruchomego kadru z zadania 6 stoi ruchoma scena pikselowego lasu w śniegu, w pełnym świetle, w rozmiarze wybranym w zadaniu 6 (pytania 9 i 11).
2. Postacią sceny jest mag z paczki Pixel Crawler, a nie postać w kapturze ze starego Loop.
3. Mag idzie tam, dokąd prowadzi go bieżąca czynność (pytanie 2): przy „Zbierz” i „Obchód” do patyków, do krzaka jagód albo do mchu, zależnie od celu, a przy włóknie zostaje, gdzie stoi; przy „Wytwórz — ognisko”, „Zapal — ognisko” i „Zasil — ognisko” na miejsce ogniska; przy „Zapal — patyk” i „Zjedz” zostaje, gdzie stoi; przy „Eksploruj”, „Wędruj”, „Idź” i „Idź — ognisko” do prawego brzegu kadru, zawsze w to samo miejsce; przy czekaniu, gdy żadna reguła nie pasuje, wraca na środek polany; w walce zostaje, gdzie stoi.
4. Patyki, krzak jagód i mech stoją w kadrze zawsze, także gdy na kafelku postaci ich nie ma; ognisko stoi tylko wtedy, gdy stoi na kafelku postaci: płonące z ruchomym ogniem albo wygasłe, tym samym obrazkiem bez koloru i bez ruchu (pytanie 3).
5. Ruch sceny daje CSS, w stałym takcie niezależnym od tempa gry i bez pętli rysowania: klatki zmieniają się co 160 ms, a dojście maga na miejsce trwa zawsze 640 ms; gdy cel zmieni się w drodze, mag skręca z miejsca, w którym jest; na starcie przejścia, po „Restart” i po wczytaniu gry stoi od razu na miejscu, bez przechodzenia przez kadr (pytanie 4).
6. Nad głową maga stoi mała plakietka na pełnym tle `panel`: w niej ikona bieżącej czynności, ta sama co przy regule w edytorze z zadania 5, a pod ikoną pasek postępu tej czynności, z wypełnieniem w `positive` na torze w `highlight` (pytania 6 i 13); ikona ma kolor `text-strong`, ten sam co czynność w wierszu reguły (pytanie 12). Przy czekaniu i w walce plakietki nie ma (pytania 5 i 6).
7. Obraz postaci i obraz każdego zasobu, który stoi w scenie, zapisane są w danych gry, a nie w kodzie widoku.
8. Gdy gracz wciśnie „Pauza”, scena szarzeje tą samą wartością co w starym Loop (`grayscale(1) brightness(0.5)`), a cały jej ruch, ogień i mag razem, stoi; przy zatrzymaniu na odkryciu scena zostaje kolorowa, a ruch też stoi (pytanie 1).
9. Po śmierci postaci i po rozwiązaniu mapy ruch sceny stoi, a plakietka znika; po śmierci mag jest szary, a po rozwiązaniu stoi w kolorze (pytanie 7).
10. Scena nie ma błysku całej swojej powierzchni i idzie za systemowym ustawieniem ograniczenia ruchu: wtedy klatki nie chodzą, mag staje na miejscu od razu, a pasek postępu skacze przy odczytach zamiast płynąć (pytanie 4).
11. Scena jest obrazem: kliknięcie w nią niczego nie robi i nie stoi na niej znak pauzy (pytanie 8).
12. Nowe pliki obrazków leżą w `assets/sprites/`, są obrazami PNG z samymi pikselami, a `npm run build` i obraz serwera mają każdy plik, o który prosi rysunek sceny.
13. Fundament dostaje to, co *Decisions in play* oznacza do zapisania w tym zadaniu, czyli część wpisów, którą kod zadania czyni prawdziwą, oraz wpisy z przyjętych wierszy *Settlements to record*.
14. Przewodnik stylu (`guidelines/styleguide-browser-view.md`) mówi, jak scena używa ról i wartości wyglądu: plakietka, kolor ikony w niej, pasek, szarość przy pauzie i szary mag po śmierci; jego reguła „No value in place of a design token” i strażnik `browser-view-token-values` przepuszczają klatki i pozycje obrazka; zmiany idą przez `the-way-maintain-styleguide`.
15. Tabela plików w `guidelines/coding-browser-module.md` zna nowe pliki sceny, a tabela w `guidelines/coding-content-data.md` nowe pliki danych; zmiany idą przez `the-way-maintain-coding-guidelines`.

### Acceptance criteria

- Przed scaleniem Mariusz ogląda scenę uruchomioną z gałęzi zadania przez `npm run local` przy 1×, 4× i 16× (pytanie 10).

### Questions to settle

- Pytanie 1. Co dzieje się ze sceną, gdy gracz sam wciśnie „Pauza”, i czym różni się to od zatrzymania przy odkryciu?
  - Answer: Pauza gracza szarzeje scenę tą samą wartością co w starym Loop i zatrzymuje cały jej ruch. Przy zatrzymaniu na odkryciu kolor zostaje, a ruch też stoi; do zadania 19 chwila odkrycia to kolorowy, nieruchomy obraz.
  - Not chosen:
    - Ogień i mag ruszają się dalej przy odkryciu — świat się rusza, choć czas gry stoi, a stary Loop celowo tego unikał.
  - Source: szarość przy pauzie i kolor przy odkryciu — cytaty, których człowiek nie skreślił (pakiet rundy, A7, 2026-11-03): „the scene greyed at a stop at a discovery, as at a pause — it would dim the moment of the reward” (definicja_mvp2_loop2.md@efc19197, wiersz 640, D-122, *Rejected*); „kolorowa pauza przy odkryciu” (tamże, wiersz 38); stary Loop: `filter: paused ? 'grayscale(1) brightness(0.5)' : undefined` (`C:\Storage\repos\loop\src\components\probe\Scene.tsx:169`, cdc7c0d). Pauza bez szarości odpadła na tych cytatach, nie z wyboru. Ruch przy odkryciu — człowiek, 2026-11-03, pakiet rundy, T30: „poza tym nie mam zastrzeżeń do rekomendacji”.
- Pytanie 2. Dokąd w scenie idzie mag przy każdej czynności?
  - Answer: Jak w *To do* 3: Zbierz i Obchód do patyków, krzaka albo mchu, przy włóknie stoi; Wytwórz, Zapal i Zasil ognisko do ogniska; Zapal patyk stoi, wbrew staremu Loop, w którym szedł do ogniska; Eksploruj, Wędruj, Idź i Idź — ognisko do prawego brzegu kadru; Zjedz stoi; czekanie na środek polany; walka stoi do zadania 20. Prawy brzeg nie mówi, w którą stronę mag idzie naprawdę po mapie.
  - Not chosen:
    - Tylko patyki i ognisko, a przy reszcie mag stoi — mniej niż w starym Loop, a „Eksploruj” nie daje ruchu.
  - Source: człowiek, 2026-11-03, pakiet rundy, T32: „poza tym nie mam zastrzeżeń do rekomendacji”; plan_mvp2_loop2.md@54d8d854, wiersz 18: „mag chodzi do patyków i ogniska”; stary Loop `C:\Storage\repos\loop\src\components\probe\Scene.tsx:77-95`, cdc7c0d.
- Pytanie 3. Co stoi w kadrze poza drzewami: czy patyki, krzak i mech stoją zawsze, także gdy na kafelku postaci ich nie ma, i kiedy stoi ognisko?
  - Answer: Patyki, krzak i mech stoją zawsze, a ognisko tylko wtedy, gdy stoi na kafelku postaci, płonące albo wygasłe. W Lesie scena pokazuje więc rzeczy, których na kafelku nie ma; liczby dalej podają tabela i linia pod mapą.
  - Not chosen:
    - Rekwizyt tylko wtedy, gdy zasób leży na kafelku postaci — kawałek wyłączonej pozycji F7 (scena pokazująca kafelek postaci) wchodzi do projektu, a kadr zmienia się przy „Eksploruj” bez przejścia.
    - Bez rekwizytów — mag nie chodzi do patyków.
  - Source: człowiek, 2026-11-03, pakiet rundy, T33: „poza tym nie mam zastrzeżeń do rekomendacji”; wygasłe ognisko jako ten sam obrazek bez koloru: stary Loop, `C:\Storage\repos\loop\src\components\probe\Scene.tsx:210`, cdc7c0d („wygaszone jest tym samym sprite'em bez koloru”).
- Pytanie 4. Jak długo mag idzie na miejsce, co robi, gdy cel zmieni się w drodze, i co się dzieje przy systemowym ograniczeniu ruchu?
  - Answer: Dojście trwa zawsze 640 ms, jak w starym Loop, a klatki zmieniają się co 160 ms; przy zmianie celu mag skręca z miejsca, w którym jest; na starcie, po „Restart” i po wczytaniu stoi od razu na miejscu; przy ograniczeniu ruchu w systemie staje od razu, a pasek skacze. Koszt przyjęty: przy 16× mag często idzie jeszcze, gdy czynność się kończy.
  - Not chosen:
    - Krótszy z dwóch czasów, 640 ms albo czas czynności — długość zależy od tempa, a definicja chce rytmu niezależnego od tempa.
    - 300 ms — mag przeskakuje przez kadr.
    - Czas zależny od odległości — nie mieści się przy 16×.
  - Source: człowiek, 2026-11-03, pakiet rundy, T34: „poza tym nie mam zastrzeżeń do rekomendacji”; stary Loop `C:\Storage\repos\loop\src\components\probe\Scene.tsx:65-67` i `:121`, cdc7c0d.
- Pytanie 5. Co pokazuje ikona nad głową: czynność czy rzecz, której czynność dotyczy, i co stoi nad głową przy czekaniu i w walce?
  - Answer: Ikonę czynności, tę samą co przy regule, bo jedna czynność ma w grze jedną ikonę; zbieranie patyka i jagody wygląda nad głową tak samo, a różnicę widać po tym, dokąd mag poszedł. Przy czekaniu nie ma ikony ani paska, bo przy 16× czekanie trwa 0,06 s. W walce nie ma ikony do zadania 20, więc przez 5 minut gry mag stoi bez znaku. Wszystkie 11 ikon czynności przynosi zadanie 5, więc to zadanie nie dokłada plików ikon.
  - Not chosen:
    - Ikona rzeczy, gdy czynność ma cel — „Idź — patyk” i „Zbierz — patyk” wyglądają tak samo.
    - Ikona walki z paskiem do minuty rozstrzygnięcia — ikona, której zadanie 20 może nie zostawić.
  - Source: człowiek, 2026-11-03, pakiet rundy, B9, ikona nad głową a, c i bez ikony przy czekaniu: „poza tym nie mam zastrzeżeń do rekomendacji”; plan_mvp2_loop2.md@54d8d854, dziennik zmian, linia z 2026-11-03 o D-43.
- Pytanie 6. Jak wyglądają ikona i pasek na obrazie lasu?
  - Answer: Mała plakietka na pełnym tle `panel` (rola „osobny, wydzielony blok”), w niej ikona, a pod nią pasek: wypełnienie w `positive` („jest teraz aktywne”) na torze `highlight`, bez nowych ról. Plakietka zasłania kawałek lasu nad głową. Rozmiar plakietki wybiera cykl, oglądając scenę.
  - Not chosen:
    - To samo, ale pasek w kolorze mocnego tekstu (`text-strong`) — pasek nie odróżnia się od ikony.
    - Ikona i pasek wprost na obrazie — na jasnym drzewie ikona może zniknąć, a żaden test tego nie złapie.
  - Source: człowiek, 2026-11-03, pakiet rundy, B14: „poza tym nie mam zastrzeżeń do rekomendacji”.
- Pytanie 7. Co pokazuje scena po śmierci postaci i po rozwiązaniu mapy, zanim efekty tych chwil przyjdą w zadaniach 18 i 19?
  - Answer: Ruch sceny stoi, ikona i pasek znikają, po śmierci mag jest szary, a po rozwiązaniu stoi w kolorze. Rozwiązanie mapy nie różni się w scenie od zatrzymania.
  - Not chosen:
    - Gotowy arkusz śmierci maga — część zadania 19 przechodzi tutaj.
    - Scena jak przy pauzie gracza — koniec gry wygląda jak pauza.
  - Source: człowiek, 2026-11-03, pakiet rundy, T35: „poza tym nie mam zastrzeżeń do rekomendacji”.
- Pytanie 8. Czy kliknięcie w scenę pauzuje grę, jak w starym Loop, i czy na scenie stoi znak pauzy?
  - Answer: Scena jest obrazem, bez kliknięcia i bez znaku pauzy. To odejście od starego Loop: gracz traci skrót, choć „Pauza” stoi w tym samym widoku, a szarość mówi, że gra stoi.
  - Not chosen:
    - Kliknięcie jak w starym Loop — nowy rodzaj wspólnej kontrolki i zmiana decyzji o kontrolkach (D-44).
    - Sam znak pauzy — mówi to samo co szarość i „Wznów”.
  - Source: człowiek, 2026-11-03, pakiet rundy, B15: „poza tym nie mam zastrzeżeń do rekomendacji”; stary Loop `C:\Storage\repos\loop\src\components\probe\Scene.tsx:240` i `:260`, cdc7c0d.
- Pytanie 9. Jaki rozmiar ma scena? (Rozstrzyga zadanie 6; tu tylko skutek dla słowa „większej” z celu tego zadania.)
  - Answer: Rozmiar wybiera człowiek w cyklu zadania 6: cykl stawia kadr na prawdziwym ekranie z nowym edytorem, prośba o scalenie pokazuje 336 × 152 i 672 × 304, a poprawka po uwadze człowieka zostawia jeden. To zadanie bierze wybrany rozmiar. Stary Loop ma kadr 336 × 152, więc gdy wygra ten rozmiar, cel tego zadania w planie („W większej scenie”) i słowa definicji („Scena większa”) zmienia ich właściciel, a ten dokument wraca do dopracowania.
  - Not chosen:
    - Wybór teraz, bez oglądania ekranu — odejście od zdania definicji i ryzyko, że wybór się nie utrzyma.
  - Source: człowiek, 2026-11-03, pakiet rundy, B12, droga A: „poza tym nie mam zastrzeżeń do rekomendacji” (pytanie kanoniczne: `ekran-przejscia.md`, Q1); definicja_mvp2_loop2.md@efc19197, wiersz 96: „Jaki rozmiar ma scena: 336 × 152 czy 672 × 304? Rozstrzyga oglądanie sceny w układzie ekranu.”; pakiet rundy, część D: „B12, gdy wygra 336 × 152: zmiana celu zadania 7 i słów definicji”; stary Loop `C:\Storage\repos\loop\src\components\probe\Scene.tsx:22`, cdc7c0d.
- Pytanie 10. Kiedy i gdzie człowiek ogląda ruch sceny?
  - Answer: Przed scaleniem, lokalnie: Mariusz uruchamia gałąź zadania przez `npm run local` i ogląda scenę przy 1×, 4× i 16×, bo szarpanie przy 16× ocenia człowiek. Zadanie nie ma działań człowieka poza repozytorium.
  - Not chosen:
    - Zrzuty w prośbie o scalenie, a granie po scaleniu — ruchu nie widać na zrzucie.
    - Wdrożenie gałęzi na serwer testowy przed scaleniem — to samo co lokalnie, plus wdrożenie.
  - Source: człowiek, 2026-11-03, pakiet rundy, B17, wiersz „7 scena”, droga Y: „poza tym nie mam zastrzeżeń do rekomendacji”; foundations/decisions.md@20d804b, D-254: „This inspection adds to the checks D-75 and D-88 leave with a person and replaces none of them.”
- Pytanie 11. Co pokazuje kadr lasu: las w śniegu czy zielony, i czy jest w pełnym świetle?
  - Answer: Las w śniegu z gotowych obrazków starego Loop, w pełnym świetle; noc to warstwa nad kadrem, którą dokłada zadanie 18. Słaby punkt: szron z zadania 18 gorzej widać na bieli, a śnieg stoi też przy 25 °C.
  - Not chosen:
    - Las zielony — inny las niż na logowaniu i wycinanie z arkuszy.
  - Source: pora roku — człowiek, 2026-11-03, pakiet rundy, T29: „poza tym nie mam zastrzeżeń do rekomendacji”; światło — cytaty, których człowiek nie skreślił (pakiet rundy, A6): „Noc w scenie jaśnieje razem z passą, utrata passy ściemnia las, rozwiązanie mapy daje pełny świt” (plan_mvp2_loop2.md@54d8d854, wiersz 28), „Jaki kolor ma warstwa nocy i świtu? Wartość wybiera Mariusz.” (tamże, wiersz 144), „the scene showing a full dawn” (definicja_mvp2_loop2.md@efc19197, wiersz 691). Pytanie kanoniczne: `ekran-przejscia.md`, Q2; kadr robi zadanie 6.
- Pytanie 12. Jaki kolor ma ikona w plakietce nad głową?
  - Answer: `text-strong`, mocny tekst, ten sam co czynność w wierszu reguły edytora („W wierszu warunek jest drugoplanowy, czynność mocna”, pakiet 2, C9, wiersz f). Plakietka nie ma tekstu, więc żadna zasada tego nie rozstrzygała: zatwierdzony D-43 daje ikonie maski kolor „from the text beside it”, a obok ikony w plakietce tekstu nie ma. Wynik przyjęty: ikona nad głową wygląda jak ta sama ikona przy czynności w działającym wierszu reguły i jak ikony na rysunku mapy, które też nie stoją przy tekście; jest jaśniejsza niż ta sama ikona w niewybranej komórce panelu wyboru reguły, gdzie stoi przy zwykłym tekście. D-40 pozwala kolorom tekstu stać tylko jako tekst, więc każda droga go poszerza, a różni się tylko kolorem; tę część D-40 i D-43 zapisuje to zadanie (wiersz 9 *Settlements to record*).
  - Not chosen:
    - `text`, zwykły tekst — ikona nad głową ciemniejsza niż w wierszu reguły obok i niż ikony na mapie; obie wartości dobrze czytelne (11,99:1 i 16,12:1 wobec tła plakietki).
  - Source: człowiek, 2026-11-03, pakiet 2, C8, droga b: „wszystko przyjmuję zgodnie z rekomendacjami”; pytanie przeciw temu wyborowi, pakiet 3, G1, droga A, wybór utrzymany: „przyjmuję zgodnie z rekomendacjami” (człowiek, 2026-11-03); plan_mvp2_loop2.md@a4be7015, dziennik zmian, linie z 2026-11-03 o D-40 i D-43 (zadanie 7 dołącza do wiersza D-40; ikona wychodzi poza D-43). Wcześniejsza odpowiedź cytatem (D-40, reguła „Every background with its text”, D-43) wycofana po niezależnej krytyce, bo krok od „the text beside it” do koloru tekstu plakietki był wnioskiem agenta, a nie cytatem.
- Pytanie 13. Jaką rolę bierze zielony pasek postępu w plakietce, skoro D-39 mówi, że `positive` stoi tylko jako tekst?
  - Answer: Pasek postępu w plakietce bierze `positive` w znaczeniu, jakie ta rola ma w tekście: wypełnienie w `positive` na torze `highlight`, w plakietce na tle `panel`, z co najmniej 3:1 wobec tła, na którym stoi. D-39 dopisuje, że `positive` i `warning` stoją też jako pasek stanu reguły, co zapisuje zadanie 11, a `positive` także jako wypełnienie paska postępu nad głową maga, co zapisuje to zadanie; `warning` nie stoi w pasku postępu. Ciemny pasek przy regule (#27272a, bez progu, prawie niewidoczny na każdym wierszu) to sprawa zadania 11, nie tej plakietki.
  - Not chosen:
    - Ciemny pasek przy regule w wartości widocznej wszędzie, z co najmniej 3:1 wobec każdego tła wiersza — wyraźny szary pasek przy większości reguł, program bardziej pstrokaty, odejście od Loop.
    - Trzy nowe role, po jednej na kolor paska, dwie równe kolorom tekstu — pary ról o równych wartościach, które przy zmianie jednej się rozjadą.
  - Source: człowiek, 2026-11-03, pakiet 2, C4, droga A: „wszystko przyjmuję zgodnie z rekomendacjami”; pytanie przeciw temu wyborowi, pakiet 3, G2, droga A, wybór utrzymany: „przyjmuję zgodnie z rekomendacjami” (człowiek, 2026-11-03); pytanie kanoniczne: `C:\Storage\repos\loop2\.runs\project-refinement\stan-i-powod-przy-regule.md`, Q2 (zadanie 11); plan_mvp2_loop2.md@a4be7015, wiersz D-39 w *Projected entries* (realizują zadania 5, 7 i 11, pisze zadanie 11) i linia dziennika z 2026-11-03 „zadanie 7 dołącza do wiersza D-39”; foundations/decisions.md@20d804b, D-39: „Each of the five is a role of the kind text and stands as text on the backgrounds `page`, `panel` and `highlight`.”

## Context

- Numery wierszy kodu loop2 są z 20d804b; pliki symulacji, zegara i danych nie zmieniły się od 799d1ff, a przesuną się po zadaniach 4, 5 i 6.
- Bieżąca czynność, jej początek i koniec stoją w `run.current` (`src/browser/sim/types.ts:184`), więc ani ikona, ani pasek nie wymagają zmiany stanu gry.
- W walce `run.current` jest puste (`src/browser/sim/types.ts:260`).
- Zatrzymanie przy odkryciu różni się od pauzy gracza polem `state.discovery`, ustawianym razem z pauzą i czyszczonym przy pójściu dalej (`src/browser/sim/types.ts:414`, `src/browser/sim/game.ts:422`, `:693`), a pole to przechodzi przez zapis gry (`src/browser/sim/saved-game.ts:1209`).
- Zatwierdzona definicja mówi przy D-122: „Accepted with it: a stop at a discovery cannot be told apart in the game state from the player's pause.” Kod przeczy temu zdaniu przez pole `state.discovery`, a scena opiera na tym polu *To do* 8; zdanie poprawia zadanie 16, które zapisuje D-122 (dziennik planu, uwaga dla zadania 16 z 2026-11-03).
- Zegar widoku czyta czas co 200 ms (`src/browser/view/clock.ts:60`), więc płynność ruchu i paska musi dać CSS.
- Styl gry nie ma dziś żadnej animacji ani przejścia.
- Kontrast według wzoru WCAG przy wartościach `src/browser/tokens.css` z 20d804b: `positive` (#00bc7d) wobec `panel` (#18181b) 7,16:1 i wobec `highlight` (#27272a) 6,02:1, a `text-strong` (#f4f4f5) wobec `panel` 16,12:1, więc pasek mieści się w progu 3:1 z pytania 13, a ikona stoi na plakietce z dużym zapasem.
- Ikony gry mają dziś w plikach kolor #f4f4f5, wartość `text-strong` (`assets/icons/*.svg`, `src/browser/tokens.css:21`), a na rysunku mapy stoją bez tekstu obok (`src/browser/view/terrain-picture.ts:110-115`).
- Czasy czynności stoją w `src/browser/sim/data/actions.ts`: zbieranie 10 minut gry, eksploracja i wytwarzanie ogniska 20, zapalanie, zasilanie i jedzenie 5, obchód 40.
- Dojście maga to ruch postaci, nie efekt zwykłego zdarzenia: ruch daje zdanie „Motion comes from CSS at a fixed beat that does not depend on the pace, with no loop of drawing.” wpisu o tym, co pokazuje scena, a limit 300 ms ze zdania „An effect of an ordinary event lasts at most 300 ms” wpisu o efektach go nie obejmuje (pytanie 4; uwaga niezależnej krytyki planu, obserwacja 8).
- Scena starego Loop to `C:\Storage\repos\loop\src\components\probe\Scene.tsx`, a jej arkusze `C:\Storage\repos\loop\src\components\probe\sprites.tsx`; zakaz czytania kodu interfejsu Loop z definicji MVP w tym projekcie nie obowiązuje (definicja, Inputs and constraints).
- Widoki starego Loop są „punktem wyjścia i minimum”, a projekt odchodzi od nich „tylko wtedy, gdy wychodzi lepiej, nigdy gorzej” (definicja, Inputs and constraints); odejścia tego zadania przyjął człowiek: „Zapal — patyk” bez dojścia (pytanie 2) i scena bez kliknięcia (pytanie 8).
- Mag leży w `C:\Storage\repos\loop\assets\pixel-crawler\Entities\Npc's\Wizzard\`: `Idle-Sheet.png` ma 128 × 32, `Run-Sheet.png` 384 × 64, `Death-Sheet.png` 384 × 32 (odczytane 2026-11-03).
- Bezczynność i bieg mają w paczce różne ramki, więc bez wspólnej ramki postać podskakuje przy przełączeniu (`C:\Storage\repos\loop\assets\README.md`, „Zanim czegokolwiek użyjesz”).
- Arkusze paczki mają w pliku kawałek `sRGB`, a D-271 dopuszcza tylko same piksele, więc plik sceny powstaje na nowo, a nie jako kopia arkusza.
- Wycięte obrazki starego Loop leżą w `C:\Storage\repos\loop\public\sprites\` i mają same piksele, wśród nich las w śniegu (`tree_snow.png`, `sap_snow.png`), ale `char_idle.png` i `char_walk.png` to łotrzyk, a nie mag (`rozpoznanie_mvp2\rozpoznanie_frajda.md`, wiersz 92).
- `rozpoznanie_mvp2\rozpoznanie_frajda.md` jest materiałem, a nie zatwierdzonym wymaganiem.
- Drogę plików do obrazu serwera otworzyło zadanie 3: `copySpriteFiles` w `scripts/static-files.mjs:35` i `.dockerignore`; kolejny plik PNG nie kończy czasowego odstępstwa D-273, więc zadanie nie dodaje testu odmowy.
- Paczka Pixel Crawler nie wymaga wzmianki (`pixel-crawler-terms`).
- Wszystkie 11 ikon czynności, pole ikony w danych czynności i rysowanie ikon maską przynosi zadanie 5; to zadanie nie dodaje plików do `assets/icons/` i wyszło z wierszy D-27 i `icon-credits` planu (dziennik zmian planu, linia z 2026-11-03 o D-43).
- Niezmiennik `content-identifiers` zabrania nazywać zasoby i archetypy w kodzie widoku, więc miejsca rekwizytów i obrazy stoją w plikach `src/browser/sim/data/`.
- Scena nie staje na stronie wszystkich stanów, bo ta nie rysuje gry ze stanu gry (D-45).
- Definicja notuje ryzyko przyjęte przy React: „a rebuilt node may restart a CSS animation and make the figure shake” (D-03, definicja), a zegar odświeża ekran 5 razy na sekundę, więc to ryzyko sprawdza się na tej scenie.
- Ruch agent czyta ze strumienia klatek (D-254, `.claude/skills/loop2-play/SKILL.md`), a D-254 notuje, że „an agent judging motion from a few frames may report that a scene works while a person sees it jerk at 16×”.

## Questions carried to cycle

- Czy kadr z zadania 6 zostaje tłem sceny, czy scena składa tło z osobnych plików?
- Jak pociąć arkusze maga, ognia i rekwizytów do wspólnej ramki i czy skrypt tnący wchodzi do repozytorium?
- W których plikach danych stoją miejsca rekwizytów i obraz maga?
- Jak pasek napełnia się płynnie przy odczytach co 200 ms?
- Jaki rozmiar ma plakietka nad głową? Wybiera go cykl, oglądając scenę w wybranym rozmiarze (pytanie 6); raport frajdy zaznacza, że ikona przy 16× jest czytelna, „jeśli jest duża”.

## Human actions

none

## Decisions in play

Wpisy projektowane cytuje zatwierdzona definicja `definicja_mvp2_loop2.md` (odcisk 9641f804), sekcja *Projected foundation changes*. Wpisy obecne cytuje `foundations/` przy loop2 20d804b. Przydziały pochodzą z sekcji *Projected entries* planu (sha256 a4be7015). Część, którą kod tego zadania czyni prawdziwą, zadanie zapisuje w fundamencie, o ile fundament jej jeszcze nie ma (WAY-126).

### Zadanie urzeczywistnia część, a resztę pisze inne zadanie

- (new) — What does the scene show, and from what does it draw? (urzeczywistniają zadania 7, 17, 18 i 20, zapisuje zadanie 20): „The scene draws a character, its campfire, what attacks it and the moment of the map run from the game state, its previous reading and the events the simulation returned, and it holds no state of the game, the picture of each resource, creature and archetype standing in the game's data. Motion comes from CSS at a fixed beat that does not depend on the pace, with no loop of drawing. Its night and dawn follow the streak and have no effect in the game, and a fight shows as a scuffle that pictures no single blow.”
  - Część tego zadania: postać i ognisko, rysowane ze stanu gry, brak stanu gry w scenie, obraz zasobu i archetypu w danych, ruch z CSS w stałym takcie. Atak, noc, świt i szamotanina należą do zadań 18 i 20.
- (new) — How long do the scene's effects last? (urzeczywistniają zadania 7, 17, 18, 19 i 20, zapisuje zadanie 20): „An effect of an ordinary event lasts at most 300 ms and shows no text at 8× and 16×, and an effect overdue when its turn comes is dropped. The three moments in which time stands still — a discovery, a death and the solving of a map — have no such limit. The scene follows the system's setting for reduced motion and shows no flash of its whole area.”
  - Część tego zadania: ostatnie zdanie. Dojście maga nie jest efektem zwykłego zdarzenia (pytanie 4), więc pierwszego zdania to zadanie nie urzeczywistnia.
- D-271 — Where do the scene's pictures come from? (urzeczywistniają zadania 3, 6, 7, 17, 18, 19 i 20, zapisuje zadanie 20). Definicja: „The scene's pictures and the picture of the game behind the login card are sprites of the packs Pixel Crawler and LPC Wolf, kept in `assets/sprites/` outside the directory the account and save server serves and copied into it when the application is built. A sprite file holds pixels alone, the game credits each pack whose licence asks for a credit, and the character of the scene is the pack's mage.”
  - Część tego zadania: „the character of the scene is the pack's mage”. Obecne brzmienie stoi niżej.
- D-272 — Where may a picture of the game stand? (urzeczywistniają zadania 3, 6, 7 i 21, zapisuje zadanie 21). Definicja: „A picture of the game stands behind the login card, in a band at the top of Siedziba and as the scene, and text stands on a solid background, never on a picture.”
  - Część tego zadania: „as the scene”, jeśli nie zapisało jej zadanie 6. Obecne brzmienie stoi niżej.
- D-04 — What is the game built with? (urzeczywistniają zadania 7 i 15, zapisuje zadanie 15). Obecne brzmienie: „The browser view draws the game only from the game state, the game's content data and the moment of the browser's clock”. Definicja: „The browser view draws the game only from the game state, the game's content data, the moment of the browser's clock, which it reads and passes to the simulation, and, for the scene and the chronicle, its previous reading of the game state and the events the simulation returned”; w *Rejected*: „new fields in the game state for what an effect needs — state of a drawing would enter the save.”
  - Część tego zadania: wyjątek dla sceny, w takim zakresie, w jakim jej kod czyta poprzedni odczyt albo zdarzenia. Kronika należy do zadania 15.
- D-43 — What counts in the browser view as a value written in place of a design token? (urzeczywistniają zadania 5, 7 i 24, zapisuje zadanie 24). Definicja dopisuje do wyjątków: „the geometry of the terrain drawing or of the scene computed in TypeScript, the frames and positions of a sprite”, a ikonę opisuje: „the content of an icon file in `assets/icons/`, which is drawn as a mask and takes its colour from the text beside it”.
  - Część tego zadania: wyjątki geometrii sceny oraz klatek i pozycji obrazka, a także ikona bez tekstu obok. Rysowanie ikon maską zaczyna zadanie 5, a kończy zadanie 24; ikona w plakietce korzysta z tego, co przyniesie zadanie 5. Obok ikony w plakietce nie stoi tekst, więc zdanie „takes its colour from the text beside it” nie daje jej koloru; jej kolor daje pytanie 12, a cykl zapisuje tę część według wiersza 9 *Settlements to record*, którą zadanie 24, piszące D-43, zastaje i zachowuje (plan, linia dziennika z 2026-11-03 o D-43).
- D-39 — What do the signal colours of the browser view mean? (urzeczywistniają zadania 5, 7 i 11, zapisuje zadanie 11). Obecne brzmienie (foundations@20d804b): „the role `positive` means that something works, is in order or is active now”; „Each of the five is a role of the kind text and stands as text on the backgrounds `page`, `panel` and `highlight`.” Definicja: „Each of the five is a role of the kind text and stands as text on the backgrounds `page`, `panel`, `highlight`, `rule-winning` and `rule-running`.”
  - Część tego zadania: `positive` jako wypełnienie paska postępu nad głową maga, na torze `highlight` w plakietce `panel`, z co najmniej 3:1 wobec tła, na którym stoi; `warning` w pasku postępu nie stoi (pytanie 13). Zadanie 11 scala się przed tym zadaniem (7 zależy od 6, a 6 od 11) i zapisuje resztę wpisu, w tym pasek stanu reguły; cykl tego zadania dopisuje swoją część do wpisu, który zastanie (plan, linia dziennika z 2026-11-03 „zadanie 7 dołącza do wiersza D-39”).
- D-40 — What do the neutral roles of the browser view mean? (urzeczywistniają zadania 7 i 11, zapisuje zadanie 11). Obecne brzmienie (foundations@20d804b): „the background `page` means that here is the game, `panel` a block set apart, and `highlight` that this row or track is marked or that this control is under the pointer”; „Of the roles of the kind text, `text-strong` means a name, heading or value looked at first”; „Each of the five stands as text on `page`, `panel` and `highlight`, and `text` is the text each of the three backgrounds is written with.” Definicja: „Each of the five stands as text on `page`, `panel`, `highlight`, `rule-winning` and `rule-running`, and `text` is the text each of these backgrounds is written with.”
  - Część tego zadania: plakietka stoi na `panel`, tor paska bierze `highlight`, a ikona w plakietce stoi w `text-strong`, choć nie jest tekstem i nie stoi przy tekście (pytanie 12). Cykl dopisuje tę część do wpisu zapisanego przez zadanie 11 według wiersza 9 *Settlements to record* (plan, linia dziennika z 2026-11-03 „zadanie 7 dołącza do wiersza D-40”).
- D-122 — What does a map run do, and what does the player see, when something is discovered? (urzeczywistniają zadania 6, 7, 15 i 16, zapisuje zadanie 16): „it stands until the player goes on, the scene keeping its colours”; *Rejected*: „the scene greyed at a stop at a discovery, as at a pause — it would dim the moment of the reward.”
  - Część tego zadania: „the scene keeping its colours”.
- `loop2-container-sprites` (urzeczywistniają zadania 3, 6, 7, 17, 18, 19 i 20, zapisuje zadanie 20), definicja: „The image of the application holds in the directory the account and save server serves every file the scene's drawing asks for.”
  - Część tego zadania: niezmiennik zostaje prawdziwy dla nowych plików; zapis wpisu, jeśli nie zapisało go zadanie 6.

### Wpisy projektowane, na których zadanie stoi, a których nie zmienia

- (new) — How does an address name a screen?: „The screen of a map run takes its map run as a parameter and reads no map run of the game state by itself.”
- (new) — How is the screen of a map run laid out?: „The world holds, from the top, the scene, „Teraz” and „Potem”, the body row with the minutes each need lasts, the backpack, the drawing of the map and the line of a tile under it.”
- D-03 (definicja) — How is the browser view built?: „The browser view is built in TypeScript with React, its screens written as `.tsx` components that draw from the game state, and no other UI framework stands in its code or its runtime dependencies.”
- D-130 (definicja) — Where does the player pick the pace, and with which control?: „The player picks the pace with five buttons „1×”, „2×”, „4×”, „8×” and „16×” beside „Pauza” in the header of the screen of a map run”.

### Obecne decyzje, których zadanie dotyka

- D-18 — Where does the game's content live?: „The game's content — game maps, items, creatures, character skills and their numbers — stands in data files.” Pilnuje go `content-identifiers`.
- D-21 — How does time pass in a map run the player starts?: „A map run the player starts passes at one game minute per real second times the pace the player picks of 1×, 2×, 4×, 8× and 16×, and the player can pause and resume it.”
- D-42 — Which accessibility requirements does the browser view keep?: „`control-border`, `focus` and `character` have a contrast ratio of at least 3:1 against the colours they touch”; kryterium o błyskach dopisuje zadanie 19.
- D-44 — Which controls do the screens of the browser view build on?: „The screens of the browser view build every button, select list, number field and text field from the seven shared controls of `src/browser/view/controls/`”. Scena nie dostaje kliknięcia, więc nie wymaga nowej kontrolki (pytanie 8).
- D-45 — Where does the browser view's kitchen-sink page stand?: „The page shows every shared control in each of its states or the reason a state does not apply, every role, and samples of tiles in each state drawn with the roles, never a drawing of the game from a game state.”
- D-47 — Which elements of the browser view are controls, and how does their focus show?: „A control of the browser view is every HTML element the browser lets the keyboard reach, links included, and the code marks none.”
- D-62 — What does the screen show, and what can the player do, after a character's death?: „After a character's death the screen stays on the state of the game minute of death and time stands still for that map run”.
- D-68 — What becomes of a campfire that burns out?: „A campfire that burns out stays on its tile, extinguished, and can be lit again.”
- D-125 — What do the body row, the backpack and the terrain panel show of what is not yet discovered?: „The body row, the backpack, the list of revealed tiles and the drawing of the game map show what the game state holds, whatever the Understanding holds”.
- D-132 — What does the screen show, and what can the player do, after a completion?: „After a completion the screen stays on the state of the game minute of the completion and time stands still for that map run”.
- D-148 — Where is an attacking creature pictured today?: „An attacking creature currently appears in the encounter’s text, and the terrain drawing currently has no picture of it.” Wilka w scenie dopisuje zadanie 20.
- D-212 — How does a manual map run come back from a loaded saved game state?: „A manual map run of a loaded saved game state that goes on comes back at the game minute of the save, paused, with the pace of the save, and the player resumes it with „Wznów””.
- D-254 — How does an agent operate the game as a player does?: „An agent operates the running game in a real browser with Playwright CLI, and with Playwright MCP where the CLI fails, and reads motion from a stream of frames. This inspection adds to the checks D-75 and D-88 leave with a person and replaces none of them.”
- D-270 — Which libraries built on React may the browser view take?: „A library built on React — a package other than `react` and `react-dom` whose entry in `package-lock.json` declares a peer dependency on `react` — counts as another UI framework under D-03, whether it draws anything or not, so none stands in the browser view's code or its runtime dependencies.”
- D-271 — Where do the scene's pictures come from?: „The scene's pictures and the picture of the game behind the login card are sprites of the pack Pixel Crawler, kept in `assets/sprites/` outside the directory the account and save server serves and copied into it when the application is built. A sprite file holds pixels alone.”
- D-272 — Where may a picture of the game stand?: „A picture of the game stands behind the login card, and text stands on a solid background, never on a picture.”
- D-273 — When do the files of `assets/sprites/` gain a refusal test?: „A permanent refusal test for the files the build copies from `assets/sprites/` is deferred until the first task changing that boundary, which introduces its refusal test and changes the method of sprite-file-content to test; what changes the boundary is read as D-76 reads it, so a further PNG file does not.”

## Settlements to record

Candidates: 11 shown, 9 accepted — 2026-11-03

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Pauza gracza szarzeje scenę (`grayscale(1) brightness(0.5)`, jak stary Loop) i zatrzymuje cały jej ruch; przy zatrzymaniu na odkryciu scena zostaje kolorowa, a ruch też stoi. | decision | pytanie 1 | czy przy odkryciu ogień i mag dalej się ruszają, i czy pauza gracza w ogóle szarzeje scenę, skoro wiążące zdanie D-122 mówi tylko o kolorze przy odkryciu |
| 2 | Mag idzie tam, dokąd prowadzi go bieżąca czynność, według przypisania z *To do* 3: do patyków, krzaka albo mchu przy zbieraniu, do ogniska przy jego czynnościach, do prawego brzegu kadru przy ruchu po mapie, na środek polany przy czekaniu, a przy włóknie, „Zapal — patyk”, „Zjedz” i w walce zostaje, gdzie stoi. | decision | pytanie 2 | dokąd mag idzie przy czynnościach, których plan nie nazywa; bez wiersza zadania 17 i 20 mogą je przestawić, a „Zapal — patyk” wróci do ogniska jak w starym Loop |
| 3 | Patyki, krzak i mech stoją w kadrze zawsze, także gdy na kafelku postaci ich nie ma, a ognisko tylko wtedy, gdy stoi na kafelku postaci, płonące albo wygasłe. | decision | pytanie 3 | czy rekwizyt znika, gdy zasobu nie ma na kafelku, czyli kawałek wyłączonej pozycji F7 |
| 4 | Dojście maga trwa zawsze 640 ms, a klatki zmieniają się co 160 ms, przy każdym tempie; to ruch postaci, a nie efekt zwykłego zdarzenia, więc limit 300 ms go nie obejmuje; przy zmianie celu mag skręca z miejsca, a na starcie, po „Restart”, po wczytaniu i przy systemowym ograniczeniu ruchu staje na miejscu od razu. | decision | pytanie 4 | czy dojście dłuższe niż 300 ms łamie wpis o efektach — recenzent zmiany albo zadania 17 i 19 skróciłyby je do 300 ms albo uzależniły od tempa |
| 5 | Przy czekaniu nad głową maga nie ma ani ikony, ani paska, a w walce ikony nie ma do zadania 20. | decision | pytanie 5; zasadę, że nad głową stoi ta sama ikona czynności co przy regule, niesie wiersz 3 tabeli zadania 5 (`edytor_programu_loop2.md`), który zapisuje cykl zadania 5 | czy przy czekaniu i w walce stoi nad głową jakiś znak — ikona czekania, która przy 16× miga, albo ikona walki postawiona przed zadaniem 20 |
| 6 | Ikona i pasek nad głową stoją na plakietce z pełnym tłem `panel`, nigdy wprost na obrazie lasu, a pasek ma wypełnienie w `positive` na torze w `highlight`. | decision | pytanie 6; rola paska wobec D-39 według pytania 13 | czy ikona i pasek mogą stać wprost na obrazie, skoro D-272 mówi o pełnym tle tylko dla tekstu, i jakie role bierze pasek |
| 7 | Scena jest obrazem: kliknięcie w nią niczego nie robi i nie stoi na niej znak pauzy, choć w starym Loop cała scena była przyciskiem pauzy. | decision | pytanie 8 | czy przenieść ze starego Loop pauzę kliknięciem w scenę i znak pauzy, skoro stary Loop jest minimum |
| 8 | Do zadań 18 i 19 po śmierci postaci i po rozwiązaniu mapy ruch sceny stoi, a ikona i pasek znikają; po śmierci mag jest szary, a po rozwiązaniu stoi w kolorze. | decision | pytanie 7; pytanie kontrolne E5 (pakiet 2, 2026-11-03): człowiek nie zmienił wyboru | co scena pokazuje po końcu przejścia, na przykład żywego maga z paskiem niedokończonej czynności, i czy użyć arkusza śmierci z zadania 19 |
| 9 | Ikona czynności w plakietce nad głową maga ma mocny kolor `text-strong`, choć obok niej nie stoi tekst, więc wygląda jak ta sama ikona w działającym wierszu reguły i jak ikony na rysunku mapy. | decision | pytanie 12; pytanie przeciw wyborowi, pakiet 3, G1, droga A (2026-11-03) | jaki kolor dać ikonie bez tekstu obok: D-40 pozwala rolom tekstu stać tylko „as text”, a D-43 daje ikonie maski kolor „from the text beside it”, więc cykl albo zadanie 24, które zapisuje D-43, mogłoby przestawić ją na `text` jak w niewybranej komórce panelu albo zostawić bez zasady |

## Out of scope

- Rozmiar sceny i nieruchomy kadr lasu w śniegu robi zadanie 6.
- Schylanie się maga, lecącą ikonę i kurz robi zadanie 17.
- Noc, świt, malejący płomień i szron robi zadanie 18.
- Efekty odkrycia, śmierci i rozwiązania mapy robi zadanie 19.
- Wilka w scenie, ikonę i ruch maga w walce oraz wzmiankę o paczce wilka robi zadanie 20.
- Obóz w Siedzibie robi zadanie 21.
- Odróżnienie ogniska płonącego od wygasłego na rysunku mapy robi zadanie 23.
- Ikony czynności i ich rysowanie maską przynosi zadanie 5, a rysowanie maską wszystkich ikon i zwinięte wzmianki — zadanie 24.
