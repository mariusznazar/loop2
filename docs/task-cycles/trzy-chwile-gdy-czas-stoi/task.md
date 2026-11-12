---
title: Trzy chwile, gdy czas stoi — efekty odkrycia, śmierci i rozwiązania mapy w scenie
status: draft
created: 2026-11-11
updated: 2026-11-11
tags: [zadanie]
related: "the project's note"
---

# Trzy chwile, gdy czas stoi — efekty odkrycia, śmierci i rozwiązania mapy w scenie

Status: ready for cycle
Project relation: plan item: plan_mvp2_loop2.md — trzy-chwile-gdy-czas-stoi

## Description

### Need

- Cel zadania w planie: „Odkrycie, śmierć i rozwiązanie mapy mają w scenie własne efekty przy zatrzymanym czasie, a żaden efekt nie błyska całą sceną.”
- Pozycja zakresu w definicji: „Trzy chwile, gdy czas stoi: efekt odkrycia, śmierci i rozwiązania mapy (F5).”
- Dziś scena nie ma żadnego efektu tych chwil: przy zatrzymaniu na odkryciu jest kolorowa i nieruchoma, po śmierci stoi bez ruchu z szarym magiem, a po rozwiązaniu mapy stoi bez ruchu z magiem w kolorze, bez plakietki nad głową (D-322; `src/browser/view/scene-picture.ts:101-108`, `src/browser/styles.css:1709-1724`).
- Raport rozpoznania: „Bez tego: najważniejsze chwile gry zostają wierszami tekstu, a pauza przy odkryciu wygląda jak zatrzymanie gry.” (`rozpoznanie_mvp2\rozpoznanie_frajda.md`, część 8, propozycja 5).
- W tych trzech chwilach minuty gry nie płyną, więc efekt może trwać sekundy przy każdym tempie, także przy 16× (tamże, część 5, zasada 2).
- Definicja wiąże projekt z kryterium WCAG 2.3.1, bo scena w dwukrotności obrazu, 672 × 304 px (D-349), przekracza powierzchnię, poniżej której błyski są dozwolone, a systemowe ograniczenie ruchu tego nie załatwia (projektowane D-42, *Rationale*).

### To do

1. Przy zatrzymaniu na odkryciu ikony tego, co odkryła minuta gry i co ma ikonę w danych gry, wychodzą z lasu nad polanę, każda w plakietce na tle `panel`, jak plakietka nad głową maga (D-320), z ramką w roli `discovery`, i stoją tam do „Wznów”; rzecz bez ikony nazywa tylko pas odkrycia nad programem (D-122), a scena zostaje kolorowa (pytanie 2).
2. Po śmierci postaci mag upada w sześciu klatkach arkusza śmierci postaci „Wizzard” z paczki Pixel Crawler i leży na ostatniej, szary jak dziś (D-322). Po śmierci z zimna nad całą sceną leży chłodna, niebieskawa warstwa, jako stan sceny do „Restart” albo „Zakończ”, w kolorze, który odróżnia się od chłodnego szarozielonego odcienia światła sceny przy passie 0 z zadania 18; po śmierci z głodu i w walce warstwy nie ma, a scena nie szarzeje (pytanie 3).
   - Arkusz `the Pixel Crawler pack in the predecessor game's repository, Entities\Npc's\Wizzard\Death\Death-Sheet.png` (loop `cdc7c0d`, 384 × 32 px, sześć klatek po 64 × 32 px) dochodzi do `assets/sprites/` przeniesiony do ramki 64 × 64 px, w której scena rysuje maga, tak jak przeniesiono `mage-idle.png`, jako PNG z samymi pikselami (D-271, `sprite-file-content`); nazwę pliku, rozmiar klatki i liczbę klatek podają dane gry w `src/browser/sim/data/scene.ts` (`SCENE_MAGES`), nie kod widoku (D-316).
3. Po rozwiązaniu mapy nad polaną, w części kadru, nie na całej scenie, unoszą się raz drobinki światła i gasną, nad pełnym złotem odcienia światła sceny z zadania 18; mag stoi w kolorze jak dziś (pytanie 4). Drobinki to kwadraty jednego piksela obrazu sceny, na jego siatce, w kolorach z palety paczek sceny, każdy ze źródłem w pikselu nazwanego obrazka paczki, dobranych tak, żeby odróżniały się od tła, na którym stoją (pytania 8 i 13).
4. Żaden z trzech efektów nie ma limitu 300 ms zwykłego efektu (projektowany wpis „How long do the scene's effects last?”). Każdy gra raz, a potem scena stoi na jego ostatnim obrazie, aż chwila się skończy — „Wznów”, „Restart” albo „Zakończ”; „Wznów” w trakcie efektu odkrycia ucina go i scena idzie dalej (pytanie 1). W czasie efektu rusza się tylko sam efekt — ikony wychodzące z lasu, upadający mag, drobinki — a ogień i mag przy odkryciu i rozwiązaniu stoją jak przy każdym zatrzymaniu (pytanie 12).
5. Scena narysowana ponownie na tej samej chwili — po powrocie na ekran przejścia, po odświeżeniu strony, po wczytaniu zapisu — pokazuje od razu ostatni obraz efektu, bez ruchu, tak jak mag po wczytaniu staje od razu na miejscu (D-319) (pytanie 1).
6. Pod systemowym ustawieniem ograniczenia ruchu scena pokazuje od razu ostatni obraz efektu odkrycia, śmierci albo rozwiązania, a klatki stoją (pytanie 7).
7. Okno końca przejścia z zadania 16 otwiera się samo dopiero po efekcie śmierci albo rozwiązania, tak żeby efekt było widać; gdy scena pokazuje ostatni obraz od razu (punkty 5 i 6), nie ma na co czekać i okno otwiera się od razu (pytanie 10).
8. Gdy w minucie gry odkrycia mag umiera albo mapa zostaje rozwiązana, scena pokazuje tylko efekt końca — upadek maga albo drobinki światła — bez plakietek odkrycia; odkrycie nazywa okno końca przejścia z zadania 16 (pytania 11 i 15).
9. Żaden efekt nie rozjaśnia ani nie przyciemnia na chwilę całego obszaru sceny (D-317).
10. D-322 zmienia się tak, jak mówi *Decisions in play*: dziś mówi, że przy odkryciu, po śmierci i po rozwiązaniu cały ruch sceny stoi, i odrzuca gotowy arkusz śmierci maga.
11. D-39, zapisany przez zadanie 11, dostaje dopisek, że `discovery` stoi też jako ramka plakietki odkrycia w scenie, z co najmniej 3:1 wobec `panel` (pytanie 2).
12. D-42 dostaje czwarte kryterium, 2.3.1 Three Flashes or Below Threshold, i zachowuje zdanie „`condition-unmet` has no threshold.” oraz zdanie uzasadnienia o ciemnym pasku reguły, a jego *Verification* mówi o czterech kryteriach (pytanie 5; plan: D-42 urzeczywistniają zadania 11 i 19, pisze zadanie 19); wśród par z progiem 3:1 staje ramka plakietki odkrycia w `discovery` wobec `panel` (pytanie 2). Jego *Based on* zyskuje fakt środowiska o kryterium 2.3.1 ze strony W3C, którego dziś w `foundations/environment_facts.md` nie ma (są `wcag-text-contrast`, `wcag-non-text-contrast`, `wcag-focus-visible` i `wcag-contrast-ratio`).
13. Część „The scene of a map run” przewodnika stylu (`guidelines/styleguide-browser-view.md`) mówi to, co zmienione D-322 i nowe efekty, przez `the-way-maintain-styleguide`; dziś mówi: „Przy zatrzymaniu — pauzie, odkryciu, śmierci i ukończeniu — cały ruch sceny, także ogień i mag, stoi (D-322).”
14. README wymienia nowy plik arkusza śmierci maga razem z pozostałymi plikami sceny wyciętymi z paczki Pixel Crawler (`README.md:26`).

### Acceptance criteria

- Przed scaleniem Mariusz ogląda w grze uruchomionej z gałęzi zadania przez `npm run local` odkrycie, śmierć z zimna, z głodu i w walce oraz rozwiązanie Lasu (pytanie 6).
- Kolory efektów, których żadne źródło nie ustala — chłodnej warstwy po śmierci z zimna i drobinek światła — proponuje cykl, pokazuje je na zrzutach w opisie prośby o scalenie, a wybiera je Mariusz przy tej prośbie (pytanie 9).

### Questions to settle

- Pytanie 1 (rozmowa, Q1). Jak długo gra efekt każdej z trzech chwil i co pokazuje scena, gdy rysuje tę samą chwilę ponownie — po powrocie na ekran przejścia, odświeżeniu strony albo wczytaniu zapisu?
  - Answer: Efekt gra raz, a potem scena stoi nieruchomo na jego ostatnim obrazie, aż chwila się skończy („Wznów”, „Restart”, „Zakończ”); „Wznów” w trakcie efektu odkrycia ucina go i scena idzie dalej. Scena narysowana ponownie na tej samej chwili pokazuje od razu ostatni obraz efektu, bez ruchu, tak jak mag po wczytaniu staje od razu na miejscu (D-319). Przyjęty koszt: gracz, który przegapi efekt, nie zobaczy go już przy tej chwili; zasada D-322, że zatrzymany świat się nie rusza, zostaje poza czasem samego efektu. Część o systemowym ograniczeniu ruchu daje pytanie 7.
  - Not chosen:
    - B, efekt w pętli tak długo, jak chwila — świat rusza się, choć czas gry stoi, czego D-322 celowo unika; ekran końca żyje bez końca, a ruch w pętli trzeba sprawdzać pod 2.3.1 przez cały czas trwania.
    - C, efekt powtarzany przy każdym ponownym narysowaniu — powrót na ekran po śmierci zabija maga drugi raz, a odświeżenie strony powtarza nagrodę, czego D-319 nie robi z dojściem maga.
  - Source: Mariusz, 2026-11-11, „odpowiedzi zgodnie z rekomendacją dla 19” — droga A.
- Pytanie 2 (rozmowa, Q2). Co pokazuje scena przy zatrzymaniu na odkryciu?
  - Answer: Ikony tego, co minuta odkryła i co ma ikonę, wychodzą z lasu nad polanę, każda w plakietce na `panel`, jak plakietka nad głową maga (D-320), z ramką w `discovery`, i stoją tam do „Wznów”; rzecz bez ikony nazywa tylko pas nad programem. Przyjęte koszty: D-39 się zmienia — `discovery` staje także jako ramka plakietki w scenie, z co najmniej 3:1 wobec `panel` (1.4.11 w D-42); przy pierwszym odkryciu stoi kilka plakietek naraz; odkrycie samych warunków albo samego wilka nie ma w scenie żadnej ikony.
  - Not chosen:
    - B, jeden znak odkrycia nad magiem, bez nazywania, co odkryto — scena nie mówi, co odkryto, mówi to tylko pas; też zmiana D-39.
    - C, ikony w plakietkach na `panel` z ikoną w `text-strong`, bez ramki w kolorze — odkrycie słabiej odróżnia się od zwykłej plakietki czynności.
  - Source: Mariusz, 2026-11-11, „odpowiedzi zgodnie z rekomendacją dla 19” — droga A.
- Pytanie 3 (rozmowa, Q3). Co pokazuje scena po śmierci postaci, przy każdej z trzech przyczyn: zimnie, głodzie i walce?
  - Answer: Mag upada w sześciu klatkach arkusza śmierci postaci „Wizzard” (`Npc's/Wizzard/Death/Death-Sheet.png`, 384 × 32 px, przeniesionego do ramki 64 × 64 px z `SCENE_MAGES`) i leży na ostatniej, szary jak dziś. Po śmierci z zimna nad całą sceną kładzie się raz chłodna, niebieskawa warstwa, jak warstwa nad obrazem z D-315, i leży jako stan sceny do „Restart” albo „Zakończ”; po śmierci z głodu i w walce warstwy nie ma — głód nie szarzy sceny, żeby koniec nie wyglądał jak pauza, a wilka przy śmierci w walce dokłada zadanie 20. Chłodna warstwa musi odróżniać się od chłodnego odcienia światła sceny przy passie 0 z zadania 18. Przyjęte koszty: nowy plik w `assets/sprites/` i przeniesienie klatek do ramki 64 × 64 px; tylko zimno ma kolor przyczyny; wartość koloru do wybrania (pytanie 9). To, czy warstwa zmienia D-317, nie jest częścią tej odpowiedzi — zob. odczyt przy D-317 w *Decisions in play*.
  - Not chosen:
    - B, każda przyczyna z własną warstwą: zimno chłodną, głód wyblakłą, walka ciepłą — trzy wartości kolorów do wybrania i obejrzenia; czerwonawa warstwa po walce zbliża się do czerwieni, którą gra zostawia dla zagrożeń.
    - C, sam upadek, bez koloru przyczyny — przyczynę mówi tylko „Teraz” („Mag zamarzł”, „Mag umarł z głodu”, „Mag zginął w walce”), scena nie.
  - Source: Mariusz, 2026-11-11, „odpowiedzi zgodnie z rekomendacją dla 19” — droga A, w materiale poprawionym po krytyce rundy (właściwy arkusz postaci „Wizzard”).
- Pytanie 4 (rozmowa, Q4). Co pokazuje scena po rozwiązaniu mapy, ponad pełnym złotem odcienia światła sceny z zadania 18?
  - Answer: Nad polaną unoszą się raz drobinki światła, w części kadru, nie na całej scenie, i gasną; mag stoi w kolorze jak dziś. Drobinki są kwadratami jednego piksela sceny w kolorach palety paczki (pytanie 8). Przyjęty koszt: nie bierze się „ogniska” z raportu rozpoznania.
  - Not chosen:
    - B, drobinki i mag podchodzący do ogniska — gdy ogniska nie ma na kafelku postaci, scena go nie rysuje i mag nie ma dokąd iść; ruch maga po rozwiązaniu wygląda jak dalsza gra.
    - C, bez własnego efektu, sam pełny odcień z zadania 18 — cel planu („własne efekty”) nie spełnia się dla rozwiązania, a zadania 18 i 19 dają tu tę samą rzecz.
  - Source: Mariusz, 2026-11-11, „odpowiedzi zgodnie z rekomendacją dla 19” — droga A.
- Pytanie 5 (rozmowa, Q5). Czy D-42 z czwartym kryterium zachowuje to, co do obecnego wpisu dopisało zadanie 11 — „`condition-unmet` has no threshold” i zdanie uzasadnienia o ciemnym pasku — choć projektowane brzmienie w definicji tego nie ma?
  - Answer: Tak. Cykl dopisuje 2.3.1 do obecnego D-42 i zmienia „three” na „four” w jego *Verification*, a zdanie o `condition-unmet` i uzasadnienie o ciemnym pasku zostają. Projektowane D-42 różni się tu od obecnego pominięciem, które plan nazywa znaną luką, nie wyborem, by zwolnienie usunąć.
  - Not chosen:
    - B, projektowane brzmienie słowo w słowo — ciemny pasek reguły traci zwolnienie z progu kontrastu, które dało zadanie 11, i sprawdzanie kontrastu albo uwaga przeglądu zacznie go trzymać do 3:1.
  - Source: plan `plan_mvp2_loop2.md`, *Change log*, linia z 2026-11-03: „rozjazd z projektowanym D-39 zostaje w definicji: odpowiedź człowieka C4 A z drugiego pakietu rundy dopisuje do D-39, że `positive` i `warning` stoją też jako pasek stanu reguły i pasek postępu nad głową maga, każdy z co najmniej 3:1 wobec każdego tła wiersza, a ciemny pasek ma własną rolę bez progu; […] (human, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami”)”, i linia z 2026-11-03: „luka przy zadaniu 11 z linii tego dnia o pasku wobec D-39, D-42 i `design-token-contrast` zostaje po bramce, bo zmiana definicji jej nie objęła”; obecne D-42 (`foundations/decisions.md`, loop2 `211a4ea`): „`condition-unmet` has no threshold.” i *Rationale*: „The dark bar of a program rule says that nothing is going on, so it is held to no threshold, while the green and the amber bar keep the threshold of the text roles they share a colour with.” Cytat pokazano Mariuszowi 2026-11-11 w pakiecie rundy i nie został skreślony.
- Pytanie 6 (rozmowa, Q6). Czy przed scaleniem Mariusz ogląda trzy chwile w grze uruchomionej z gałęzi zadania?
  - Answer: Tak — przed scaleniem Mariusz ogląda w grze z gałęzi zadania przez `npm run local` odkrycie, śmierć z zimna, z głodu i w walce oraz rozwiązanie Lasu, w jednej sesji. Przyjęty koszt: jego sesja i doprowadzenie gry do każdej z chwil; wilk staje w scenie dopiero z zadaniem 20, więc śmierć w walce ogląda bez wilka.
  - Not chosen:
    - B′, bez oglądania, same zrzuty w opisie prośby o scalenie (D-357) — ruchu efektu na zrzucie nie widać.
  - Source: Mariusz, 2026-11-11, „odpowiedzi zgodnie z rekomendacją dla 19” — droga A′.
- Pytanie 7 (wspólne pytanie Q7 rozmowy zadania 17, `zbieranie-jako-widowisko.md`; dotyczy zadań 17, 18, 19 i 20). Co pokazuje scena przy systemowym ustawieniu ograniczenia ruchu?
  - Answer: Pod tym ustawieniem klatki stoją, każdy ruch z miejsca na miejsce i każda zmiana stanu sceny pokazuje od razu swój koniec (jak dojście maga dziś), krótki efekt zwykłego zdarzenia pojawia się nieruchomo na swoim miejscu najwyżej na 300 ms i znika, a efekt chwili, gdy czas stoi, pokazuje od razu swój ostatni obraz. Dla tego zadania: scena od razu pokazuje ostatni obraz efektu odkrycia, śmierci albo rozwiązania. Przyjęty koszt: taki gracz dalej dostaje krótkie bodźce pojawienia się i zniknięcia.
  - Not chosen:
    - B, jak A, ale efekty zwykłych zdarzeń w ogóle się nie pojawiają — najmniej bodźców; wynik zbierania i walki taki gracz czyta tylko z liczb i „Teraz”.
  - Source: Mariusz, 2026-11-11, „pozostałe elementy zgodnie z rekomendacją na ten moment” — droga A wspólnego pytania.
- Pytanie 8 (wspólne pytanie Q8 rozmowy zadania 17, `zbieranie-jako-widowisko.md`; dotyczy zadań 17, 18 i 19). Czy kształt narysowany w CSS w kolorze z tokenu jest „obrazkiem sceny”, który według D-271 musi pochodzić z paczki?
  - Answer: W CSS wolno rysować warstwy (noc, szron) i drobinki: kwadraty jednego piksela sceny na jej siatce, w kolorach z palety paczki; wszystko, co ma rysunek — postacie, stworzenia, rzeczy — pochodzi z paczki. Warunek do tej zasady: kolor efektu dobiera się tak, żeby odróżniał się od tła, na którym stoi. Dla tego zadania: drobinki światła po rozwiązaniu są takimi kwadratami. Przyjęte koszty: kolory drobinek wchodzą do palety gry ze źródłem w pikselu nazwanego obrazka paczki; D-271 dostaje zdanie o tej granicy (kto je zapisuje — pytanie 13). Gdy Mariusz wybierał tę drogę, scena miała jedną paczkę; od bramki definicji z 2026-11-11 ma trzy, a linia planu o tej zasadzie mówi „w kolorach palety paczek”.
  - Not chosen:
    - A, w CSS każdy kształt w kolorze z tokenu — gładkie kształty CSS obok pikseli rozjeżdżają jeden pikselowy styl, który D-271 daje jako powód.
    - B, w CSS tylko warstwy i plakietka, drobinki z obrazka paczki — brakujące drobinki trzeba przerobić z pikseli innego arkusza.
    - E, wstrzymać pytanie do researchu paczek efektów i narzędzi — zadania 17, 18 i 19 czekają na research.
  - Source: Mariusz, 2026-11-11, „wybieram D i zaparkowanie wątku skill'a” — droga D; warunek: Mariusz, 2026-11-11, „warunek do zasady D również”.
- Pytanie 9 (wspólne pytanie Q6 rozmowy zadania 18, `swit-rosnacy-z-passa.md`; dotyczy zadań 18, 19 i 23). Kiedy i jak Mariusz wybiera wartości wyglądu, których żadne źródło nie ustala?
  - Answer: Podgląd przed gotowością tylko dla zadania 18; kolory efektów zadania 19 i ikona zadania 23 przy prośbie o scalenie, jako kryterium akceptacji: cykl proponuje wartości i pokazuje je na zrzutach w opisie prośby, a Mariusz przyjmuje albo wskazuje inne. Przyjęty koszt: każda odrzucona wartość to runda poprawek w otwartej prośbie.
  - Not chosen:
    - A, jeden wspólny podgląd przed gotowością zadań 18, 19 i 23 — wszystkie trzy zadania czekają na drugą rundę.
    - B, wybór przy prośbie o scalenie we wszystkich trzech zadaniach — odrzucona wartość odcienia po scaleniu zadania 18 to osobna zmiana.
    - D, wartości podane od razu słowami albo kodem, bez podglądu — kolor oceniany na próbce, nie na zaśnieżonym lesie.
  - Source: Mariusz, 2026-11-11, „a odpowiedzi - zgodnie z rekomendacją” — droga C wspólnego pytania.
- Pytanie 10 (wspólne pytanie Q1 rozmowy zadania 16, `koniec-przejscia.md`; dotyczy zadań 16, 18 i 19). Gdzie na ekranie przejścia stoi koniec przejścia?
  - Answer: W oknie nad ekranem przejścia. Dla tego zadania wiążą dwa szczegóły przyjętego okna: „a. the window opens by itself at the end of the map run, after the end effect of task 19, so that the effect is seen; until task 19 it opens at once” i „e. the window opens again at each entry to the screen of an ended map run, after a reload of the page too”; okno przykrywa ekran przejścia razem z nagłówkiem, a „✕” albo Escape odsłania scenę.
  - Not chosen:
    - A, A2, B, C i D, miejsca na ekranie, w których stało dotąd coś innego (na górze kolumny programu, pod „Teraz” i „Potem”, trzecia zakładka pod światem, miejsce sceny) — „jakoś nie kupuję tego, żeby to miało wskoczyć gdzieś w jakieś miejsce w którym do tej pory było coś innego” (Mariusz).
  - Source: Mariusz, 2026-11-11, „tak, przyjmuję w tej postaci” — okno ze szczegółami a–f.
  - Część wyprowadzona: gdy scena pokazuje ostatni obraz efektu od razu — po powrocie na ekran, po odświeżeniu strony, pod ograniczeniem ruchu — okno końca otwiera się od razu. Tego zdania nie mówi żaden ze szczegółów a i e; wynika z nich razem z pytaniami 1 i 7, pokazano je Mariuszowi jako wyprowadzone. Źródło: Mariusz, 2026-11-11, „zgadzam się z rekomendacjami we wszystkich przypadkach” — przyjęte.
- Pytanie 11 (rozmowa, Q7). Co pokazuje scena, gdy w minucie gry odkrycia mag umiera albo mapa zostaje rozwiązana?
  - Answer: Scena pokazuje tylko efekt końca — upadek maga albo drobinki światła; plakietek odkrycia nie ma, a odkrycie nazywa okno końca przejścia (przy rozwiązaniu według drogi A1 pytania Q5 rozmowy zadania 16, przy śmierci według pytania 15). Przyjęty koszt: w tej jednej minucie nagroda odkrycia nie pojawia się w scenie.
  - Not chosen:
    - B, efekt końca i plakietki odkrycia razem, plakietki do „Restart” albo „Zakończ” — dwie chwile naraz w jednym kadrze, plakietki nad leżącym magiem albo obok drobinek; więcej przypadków do sprawdzenia przy oglądaniu; D-322 dostaje o tym osobne zdanie.
  - Source: Mariusz, 2026-11-11, „zgadzam się z rekomendacjami we wszystkich przypadkach” — droga A.
- Pytanie 12 (rozmowa, Q8). Czy w czasie efektu chwili w scenie rusza się coś poza samym efektem — ogień, a przy odkryciu i rozwiązaniu mag w klatkach bezczynności?
  - Answer: Nie. Rusza się tylko sam efekt — ikony wychodzące z lasu, upadający mag, drobinki; ogień i mag (przy odkryciu i rozwiązaniu) stoją jak dziś przy każdym zatrzymaniu, a D-322 zmienia się tylko o sam efekt. Przyjęty koszt: przez kilka sekund efektu ogień stoi nieruchomo obok ruchu efektu.
  - Not chosen:
    - B, przez czas efektu scena żyje: ogień płonie, a mag przy odkryciu i rozwiązaniu oddycha w klatkach bezczynności — świat rusza się, choć czas gry stoi, D-322 zmienia się szerzej niż o sam efekt, a scena wyraźnie zamiera w chwili, gdy efekt się kończy.
  - Source: Mariusz, 2026-11-11, „zgadzam się z rekomendacjami we wszystkich przypadkach” — droga A.
- Pytanie 13 (wspólne pytanie Q10 rozmowy zadania 17, `zbieranie-jako-widowisko.md`; dotyczy zadań 17, 18, 19 i 20). Które zadanie zapisuje w fundamencie zasadę z pytania 8 z jej warunkiem?
  - Answer: Zadanie 18 — pierwsze, którego kod robi z zasady prawdę (szron z kwadratów pikseli, odróżniony od śniegu); dopisuje zdanie do D-271, a zadania 19 i 20 je zachowują, zadanie 17 niesie warunek w *Decisions in play*; plan dostaje linię. Przyjęty koszt: zdanie powstaje, zanim zadanie 19 sprawdzi je na drobinkach — jeśli nie pasuje, zadanie 19 je zmienia.
  - Not chosen:
    - B, zapisuje zadanie 20 razem z całym D-271 — od scalenia 18 do scalenia 20 szron i drobinki stoją w kodzie bez zdania w fundamencie, a przeglądy zadań 18 i 19 sprawdzają je tylko wobec swoich dokumentów.
  - Source: Mariusz, 2026-11-11, „obojętne mi to, więc mogą być oba tak jak rekomendujesz” — droga A.
- Pytanie 14 (wspólne pytanie Q11 rozmowy zadania 17, `zbieranie-jako-widowisko.md`; dotyczy zadań 17, 18, 19 i 20). Które zadanie zapisuje w fundamencie całą zasadę ograniczenia ruchu z pytania 7?
  - Answer: Zadanie 20, razem z wpisem „(new) — How long do the scene's effects last?”, jak zasadę, czym jest efekt zwykłego zdarzenia (pytanie Q6 rozmowy zadania 17); jedna linia planu dla całej odpowiedzi; zadania 17 i 19 niosą zasadę w *Decisions in play*. Przyjęty koszt: zadania 17–19 scalają kod pod tym ustawieniem bez zdania w fundamencie.
  - Not chosen:
    - A, zapisuje zadanie 17 w całości — zadanie 17 zapisuje też części o chwilach i wilku, których jego kod jeszcze nie robi.
  - Source: Mariusz, 2026-11-11, „obojętne mi to, więc mogą być oba tak jak rekomendujesz” — droga B.
- Pytanie 15 (wspólne pytanie Q11 rozmowy zadania 16, `koniec-przejscia.md`; dotyczy zadań 16 i 19). Gdy postać umiera w minucie gry odkrycia, czy okno końca nazywa to odkrycie tak jak przy rozwiązaniu, czy pas odkrycia stoi pod oknem jak dziś?
  - Answer: Jak przy rozwiązaniu: okno końca nazywa odkrycie w części „co się stało”, z „Dodaj regułę z tym”, a pas odkrycia nie stoi. D-122 z tym dopiskiem zapisuje zadanie 16; plan dostaje linię dla odpowiedzi szerszej niż zatwierdzone zdanie D-122. Dla tego zadania: przy śmierci w minucie odkrycia scena pokazuje sam upadek (pytanie 11), a odkrycie widać od razu w oknie.
  - Not chosen:
    - B, pas stoi pod oknem jak dziś, a okno odkrycia nie nazywa — po śmierci gracz dowiaduje się o odkryciu dopiero po zamknięciu okna; dwa końce zachowują się różnie.
    - C, okno nazywa odkrycie i pas też stoi — to samo odkrycie dwa razy na ekranie; przy rozwiązaniu ten układ odrzucono (A2 pytania Q5 rozmowy zadania 16).
  - Source: Mariusz, 2026-11-11, „tak jak rekomendujesz” — droga A.

## Context

- Numery wierszy kodu loop2 są z commitu `211a4ea`; kod przeglądarki jest tam ten sam co przy `f672c7b`.
- Scena wie, jak stoi, z `standingOf` w `src/browser/view/scene-picture.ts:101-108`: najpierw śmierć, potem rozwiązanie, potem odkrycie, potem pauza gracza; na tej wartości stoi atrybut `data-standing` sceny (`src/browser/view/scene.tsx:235`), na którym wiszą szarości w `src/browser/styles.css:1709-1724`.
- Przyczyna śmierci to w stanie gry `run.death.cause`, jedna z `"cold"`, `"hunger"`, `"combat"` (`src/browser/sim/types.ts:232-235`), rozwiązanie to `run.completion`, a to, co odkryła ostatnia minuta odkrycia, `state.discovery` (`src/browser/sim/types.ts:413-417`), z listami drzew, czynności, warunków, przedmiotów i stworzeń (`Understanding`, `:160-166`).
- Ikonę w danych gry mają czynności (`src/browser/sim/data/actions.ts`, pole `icon`), zasoby — patyk, jagoda, mech, włókno (`src/browser/sim/data/resources.ts:16-19`) — i ognisko (`src/browser/sim/data/campfire.ts:36`); warunki, stworzenia i drzewa umiejętności ikony nie mają. Pierwsze odkrycie w Lesie odsłania naraz m.in. „Idź, Zbierz, Patyk, Jagoda” i warunki.
- Mag sceny to postać „Wizzard” z części `Entities/Npc's` paczki Pixel Crawler: `assets/sprites/mage-run.png` ma te same piksele co `the Pixel Crawler pack in the predecessor game's repository, Entities\Npc's\Wizzard\Run\Run-Sheet.png` (loop `cdc7c0d`), a arkusz z katalogu `Skeleton - Mage` to inna postać, szkielet. Arkusz śmierci postaci „Wizzard” ma 384 × 32 px i sześć postaci, każdą w swoim pasie szerokim na 64 px; `mage-idle.png` (256 × 64 px) powstał tak samo, z arkusza 128 × 32 px przeniesionego do ramek 64 × 64 px (`src/browser/sim/data/scene.ts:43-47`).
- Warunki paczki Pixel Crawler nie wymagają wzmianki o autorze (`README.md:26`, fakt `pixel-crawler-terms`).
- Niezmiennik `design-token-contrast` trzyma już `discovery` co najmniej 4.5:1 wobec `panel`, więc ramka w `discovery` na plakietce na `panel` spełnia próg 3:1 bez nowej pary w sprawdzaniu kontrastu.
- Raport rozpoznania proponuje: „odkrycie: scena zostaje kolorowa, a odkryta rzecz wychodzi z lasu ze złotą ramką; śmierć: mag upada w 6 klatkach, a kolor sceny mówi, od czego zginął; rozwiązanie: pełny świt, drobinki światła i ognisko” (`rozpoznanie_frajda.md`, część 8, propozycja 5), a w tabeli reakcji: „Mróz i chłód kolorów, głód szarość, walka wilk zostaje” (część 6); to materiał, z którego wyszły drogi pytań 2–4.
- Dokument zrobionego zadania 7 (scena-z-ludzikiem) odłożył te efekty tutaj: „do zadania 19 chwila odkrycia to kolorowy, nieruchomy obraz” (pytanie 1) i odrzucił „Gotowy arkusz śmierci maga — część zadania 19 przechodzi tutaj.” (pytanie 7); dokument usunięto z sejfu, a jego treść stoi w historii sejfu przed commitem `7c692492` (`Notes/Projects/(P) Loop/_zadania/scena_z_ludzikiem_loop2.md`).
- Wilk wbiega do sceny dopiero w zadaniu 20, które zależy od tego zadania. Zadanie 20 ustala, że po śmierci maga wilk zostaje nieruchomo obok niego w klatce bezczynności, a przy pierwszej napaści, gdy przejście staje na odkryciu wilka, wilk stoi już obok maga, a jego bieg jest pominięty (rozmowa zadania 20, Q4 i Q5, drogi A, Mariusz 2026-11-11).
- Odcień światła sceny idący za passą — chłodny szarozielony przy passie 0, pełne złoto przy rozwiązaniu — daje zadanie 18, od którego to zadanie zależy; odcień to warstwa nad obrazem tła (projektowane D-315), a przy śmierci i rozwiązaniu stoi od razu tam, gdzie stawia go passa albo rozwiązanie (projektowany wpis „What does the scene show, and from what does it draw?”).
- Efekt rozwiązania kończy się zgaśnięciem drobinek, więc jego ostatni obraz — pokazywany przy ponownym narysowaniu i pod ograniczeniem ruchu — to scena bez drobinek, w pełnym złocie odcienia.
- Ręczne przejście pauzuje się, gdy gracz opuszcza jego ekran (D-283: „Leaving the screen of a manual map run pauses it as „Pauza” does.”), więc każda z trzech chwil zaczyna się na ekranie przejścia; scena rysuje tę samą chwilę ponownie po powrocie na ekran, po odświeżeniu strony i po wczytaniu zapisu.
- Nowa wartość koloru wchodzi do pliku tokenów tylko ze źródłem ustalonym z Mariuszem (`src/browser/AGENTS.md`); wzór źródła: `src/browser/tokens.css:40`.
- Zadanie nie zmienia kształtu zapisu gry ani sposobu wdrażania i miejsca działania gry.

## Questions carried to cycle

- Jak scena odróżnia chwilę, która właśnie nastała, od tej samej chwili narysowanej ponownie: ze zdarzeń wywołania symulacji, jak przy starcie przejścia (`mapRunStarted` w `src/browser/view/scene.tsx:171`), czy inaczej?
- Ile trwa każdy z trzech efektów w milisekundach i gdzie stoją te czasy — dziś czasy ruchu sceny stoją w regułach sceny w `src/browser/styles.css`, a źródła w komentarzach przy nich (przewodnik stylu, „No value in place of a design token”).
- Czy chłodna warstwa po śmierci z zimna kładzie się razem z upadkiem maga, czy od razu, w granicach D-317 (żadnego rozjaśnienia ani przyciemnienia całej sceny na chwilę); wybór oceni Mariusz przy oglądaniu przed scaleniem.
- Skąd plakietka odkrycia bierze się nad polaną — miejsce wyjścia ikon z lasu i ich ułożenie przy kilku naraz — w granicach sceny jako obrazu bez tekstu (D-272, D-321).

## Human actions

none

## Decisions in play

Wpisy obecne cytuje `foundations/decisions.md` i `foundations/invariants.md` przy loop2 `211a4ea`. Wpisy projektowane cytuje `definicja_mvp2_loop2.md`, zatwierdzona 2026-11-11, odcisk 2d919ee3. Przydziały pochodzą z sekcji *Projected entries* planu `plan_mvp2_loop2.md`, sprawdzonego po bramce wobec definicji o odcisku 2d919ee3 (`plan_check.py`: nothing found), a dopiski szersze niż zatwierdzone zdania — z linii jego *Change log* z 2026-11-11.

### Zadanie zapisuje w całości

- D-42 — Which accessibility requirements does the browser view keep? (definicja, wiersz 516; urzeczywistniają zadania 11 i 19, pisze zadanie 19): „For now every screen of the browser view keeps four success criteria of WCAG 2.2, the W3C Recommendation of 12 December 2024 — 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast, 2.3.1 Three Flashes or Below Threshold and 2.4.7 Focus Visible — and no other requirement of WCAG, with no date or event set for returning to it. Every role of the kind text but `text-disabled`, the signal colours included, has a contrast ratio of at least 4.5:1 on `page`, `panel`, `highlight`, `rule-winning` and `rule-running`, and `text-disabled` has no threshold. `control-border`, `focus` and `character` have a contrast ratio of at least 3:1 against the colours they touch, and so has `tile-revealed` against `tile-hidden`.”
  - *Based on* projektowanego wpisu: „wcag-text-contrast · wcag-non-text-contrast · wcag-focus-visible · TODO”; *Verification*: „invariants: design-token-contrast · browser-view-focus-outline. TODO”; *Rationale* dopisuje: „A scene scaled up passes the area below which flashing is allowed, and the setting for reduced motion does not answer that.”; znaczenie: „Do trzech kryteriów WCAG dochodzi czwarte, zakaz częstych błysków.”
  - Obecne brzmienie: „keeps three success criteria of WCAG 2.2 […] — 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast and 2.4.7 Focus Visible — […] and so has `tile-revealed` against `tile-hidden`; `condition-unmet` has no threshold.”, a *Verification* mówi: „violates: a review that holds a change back for a success criterion of WCAG other than the three, without a change of this decision.”
  - Zmiana, którą robi zadanie: obecne brzmienie z 2.3.1 jako czwartym kryterium, ze zdaniem o `condition-unmet` i zdaniem uzasadnienia o ciemnym pasku reguły, z „four” w *Verification* (pytanie 5); do par z progiem 3:1 dochodzi ramka plakietki odkrycia w `discovery` wobec `panel` (pytanie 2; linia planu z 2026-11-11 o D-39: „para ramki w `discovery` z `panel` przy 3:1 szerzej niż […] z wiersza 518, w projektowanym D-42, który zapisuje zadanie 19”).

### Zadanie urzeczywistnia część, a resztę pisze inne zadanie

- (new) — How long do the scene's effects last? (definicja, wiersz 317; urzeczywistniają zadania 7, 17, 18, 19 i 20, pisze zadanie 20): „An effect of an ordinary event lasts at most 300 ms and shows no text at 8× and 16×, and an effect overdue when its turn comes is dropped. The three moments in which time stands still — a discovery, a death and the solving of a map — have no such limit. The scene follows the system's setting for reduced motion and shows no flash of its whole area.”
  - Część tego zadania: zdanie o trzech chwilach bez limitu, z dopiskiem planu: efekt chwili gra raz, a potem scena stoi na jego ostatnim obrazie, aż chwila się skończy; scena narysowana ponownie na tej samej chwili pokazuje od razu ostatni obraz, a „Wznów” ucina efekt odkrycia (pytanie 1; linia planu: „tę część urzeczywistnia zadanie 19, a wpis dalej zapisuje zadanie 20”).
  - Zasada ograniczenia ruchu z pytania 7 — „pod systemowym ustawieniem ograniczenia ruchu klatki stoją, każdy ruch z miejsca na miejsce i każda zmiana stanu sceny pokazuje od razu swój koniec, jak dziś dojście maga, krótki efekt zwykłego zdarzenia pojawia się nieruchomo na swoim miejscu najwyżej na 300 ms i znika, a efekt chwili, gdy czas stoi, pokazuje od razu swój ostatni obraz” (linia planu z 2026-11-11) — zapisuje ją w całości zadanie 20 razem z tym wpisem (pytanie 14); to zadanie urzeczywistnia jej część o chwilach (punkt 6 *To do*).
  - Zasada, czym jest efekt zwykłego zdarzenia (pytanie Q6 rozmowy zadania 17, droga A; zapisuje zadanie 20 z tym wpisem): „efektem jest krótki znak jednego zdarzenia przy postaci albo w części sceny — lot ikony, kurz, wbiegnięcie wilka, wynik walki — do 300 ms, a nie jest nim trwające zajęcie postaci (schylanie przez całe zbieranie, szamotanina przez całe starcie) ani stan całej sceny” (linia planu z 2026-11-11, która dodaje: „zadanie 19 niesie ją w *Decisions in play* (warstwa po śmierci z zimna jest stanem sceny)”).
  - Obecne brzmienie, D-317 zapisany przez zadanie 7: „The scene follows the system's setting for reduced motion and shows no flash of its whole area.”
- D-271 — Where do the scene's pictures come from? (definicja, wiersz 332; urzeczywistniają zadania 3, 6, 7, 17, 18, 19 i 20, pisze zadanie 20): „The scene's pictures and the picture of the game behind the login card are sprites of the packs Pixel Crawler and LPC Wolf, and the dust of a miss and the cloud of a scuffle are sprites of the pack Smoke & Fire Animated Particle [16x16] recoloured to the scene's colours, all kept in `assets/sprites/` outside the directory the account and save server serves and copied into it when the application is built. A sprite file holds pixels alone, the game credits each pack whose licence asks for a credit, and the character of the scene is the mage of Pixel Crawler.”
  - Część tego zadania: arkusz śmierci maga z paczki Pixel Crawler w `assets/sprites/`.
  - Zdanie o granicy rysowania w CSS z pytania 8 zapisuje do D-271 zadanie 18, od którego to zadanie zależy (pytanie 13); dopisek planu: „CSS rysuje w scenie warstwy (odcień światła, który zastąpił noc z odpowiedzi, i szron) i drobinki z kwadratów jednego piksela sceny na jej siatce, w kolorach palety paczek, a kolor efektu odróżnia się od podłoża, na którym stoi; wszystko, co ma rysunek — postacie, stworzenia, rzeczy — pochodzi z paczki”. To zadanie je zachowuje, a jeśli zdanie nie pasuje do drobinek, zmienia je (przyjęty koszt pytania 13).
  - Obecne brzmienie: „The scene's pictures and the picture of the game behind the login card are sprites of the pack Pixel Crawler, kept in `assets/sprites/` outside the directory the account and save server serves and copied into it when the application is built. A sprite file holds pixels alone, and the character of the scene is the pack's mage.”
- `loop2-container-sprites` (definicja, wiersz 1396; urzeczywistniają zadania 3, 6, 7, 17, 18, 19 i 20, pisze zadanie 20; w fundamencie już w tym brzmieniu): „The loop2 container built from the repository serves, at the path `/sprites/<file name>` and with the same bytes as that file in `assets/sprites/`, every file the scene's drawing asks for.”
- (new) — What does the scene show, and from what does it draw? (definicja, wiersz 302; urzeczywistniają zadania 7, 17, 18, 19 i 20, pisze zadanie 20): „The tint of its light, never blue and never greying the scene as the pause does, follows the streak, from a cool grey-green at streak 0 to a warm gold that is full only at a completion, […] while at a death, at a completion, at the start of a map run, after „Restart” and after a load it stands at once where the streak, or the completion, puts it.”; *Rationale*: „Blue says cold, which the frost says, and grey says that time stands still, which the pause says (D-322).”
  - Część tego zadania: scena rysuje chwile odkrycia, śmierci i rozwiązania ze zdarzeń. Linia planu z 2026-11-11 mówi, że odpowiedzi na pytania 2–4 są szersze niż zatwierdzone zdania, które mówią, że chwile mają efekty, ale nie jakie, i że „zadanie 19 wpisuje odpowiedzi do obecnego D-322, którego definicja nie rzutuje”; tak samo odpowiedzi na pytania 11 i 12.

### Wpisy zapisane przez zrobione zadania, do których zadanie dopisuje swoją część

- D-39 — What do the signal colours of the browser view mean? (plan: urzeczywistniają zadania 5, 7, 11, 14 i 19, pisze zrobione zadanie 11): obecne brzmienie: „[…] `discovery` means that something new was discovered […]. Each of the five is a role of the kind text and stands as text on the backgrounds `page`, `panel`, `highlight`, `rule-winning` and `rule-running`. […] `positive` also stands as the fill of the progress bar over the mage's head, on a track in `highlight` in a badge on `panel`, with a contrast ratio of at least 3:1 against what it stands on; […]”
  - Zmiana, którą robi zadanie (pytanie 2): `discovery` stoi też jako ramka plakietki odkrycia w scenie, na `panel`, z co najmniej 3:1 wobec tego, na czym stoi — dopisek do zapisanego wpisu, jak zrobiły to zadania 7 i 14 (linia planu z 2026-11-11).
- (new) — How is the screen of a map run laid out? (definicja, wiersz 227; urzeczywistniają zadania 6, 14, 15, 16 i 19, pisze zrobione zadanie 14 — obecne D-311): okno końca przejścia wpisuje do D-311 zadanie 16; według przyjętego szczegółu a okno „opens by itself at the end of the map run, after the end effect of task 19, so that the effect is seen; until task 19 it opens at once”.
  - Zmiana, którą robi zadanie (pytanie 10 z częścią wyprowadzoną): zdanie o oknie w D-311 mówi, że okno otwiera się samo po efekcie śmierci albo rozwiązania, a od razu, gdy scena pokazuje ostatni obraz efektu od razu (linie planu z 2026-11-11 o wierszu tego wpisu i o pytaniach 11 i 12).

### Wpisy projektowane, które pisze inne zadanie, a których zadanie dotyka

- D-132 — What does the screen show, and what can the player do, after a completion? (definicja, wiersz 711; pisze zadanie 18): „[…] the end of the map run stands, in the place that task 16 of the MVP2 plan, koniec-przejscia, settles, under the title „{mapa} rozwiązana”, such as „Las rozwiązany”, in the role `positive`, the light of the scene in full gold.” — pełne złoto daje zadanie 18, a efekt rozwiązania tego zadania stoi nad nim (pytanie 4).
- D-315 — Where does the tint of the scene's light stand? (definicja, wiersz 364; pisze zadanie 18): „The background picture of the scene is in full light and with no tint, and the tint of the scene's light is a layer over that picture, never a tint or a darkness in the picture's file.” — chłodna warstwa po śmierci z zimna jest, jak odcień, warstwą nad obrazem, a nie zmianą pliku tła.
- D-122 (definicja, wiersz 651; pisze zadanie 16): „A band in the role `discovery` above the program names what was discovered and the program rule the game wrote, the discoveries of one game minute in one band, with „Dodaj regułę z tym” and „Wznów”, and it stands until the player goes on, the scene keeping its colours, and what it named enters the chronicle. Where the map run ends in a completion in the game minute of a discovery, the end of the map run takes the place of the pause and names that discovery until „Restart” or „Zakończ”.” — z dopiskiem planu (pytanie 15): „gdy postać umiera w minucie gry odkrycia, okno końca przejścia nazywa to odkrycie tak jak przy rozwiązaniu, w części „co się stało”, z „Dodaj regułę z tym”, a pas odkrycia nie stoi”.

### Obecne decyzje, których zadanie dotyka

- D-322 — What does the scene show while time stands still?: „While the player's pause holds a map run, the scene is greyed with `grayscale(1) brightness(0.5)` and all its motion, the fire and the mage together, stands still. At a stop at a discovery the scene keeps its colours (D-122) and its motion stands still too. After a death the motion of the scene stands still, no badge stands over the head and the mage is grey with `grayscale(1) brightness(0.55)`, and after a completion the motion stands still, no badge stands there and the mage stands in colour.”; *Rejected*: „the fire and the mage moving on at a stop at a discovery — the world would move while game time stands still, which loop avoided on purpose; the scene as at the player's pause after a death — the end of a game would look like a pause; a ready sheet of the mage's death — part of what the effects of a death are to bring would come into the scene.”
  - Zmiana, którą robi zadanie (pytania 1–4, 7, 11 i 12): efekt odkrycia, śmierci i rozwiązania gra raz, a potem scena stoi na jego ostatnim obrazie do końca chwili; „Wznów” ucina efekt odkrycia; scena narysowana ponownie na tej samej chwili i scena pod ograniczeniem ruchu pokazują od razu ostatni obraz. W czasie efektu rusza się tylko on sam, a ogień i mag stoją jak dziś. Przy odkryciu ikony odkrytych rzeczy stoją nad polaną w plakietkach z ramką w `discovery`; po śmierci mag upada w klatkach arkusza śmierci i leży szary, a po śmierci z zimna nad sceną leży chłodna, niebieskawa warstwa; po rozwiązaniu unoszą się i gasną drobinki światła. Gdy przejście kończy się w minucie odkrycia, scena pokazuje tylko efekt końca, bez plakietek odkrycia. Odrzucenie „a ready sheet of the mage's death” znika z *Rejected*, bo zadanie ten arkusz wnosi. Pauza gracza zostaje bez zmian.
- D-317 — How long do the scene's effects last?: „The scene follows the system's setting for reduced motion and shows no flash of its whole area.”; *Verification*: „violates: an effect that lights or darkens the whole area of the scene for a moment; a scene that moves under the system's setting for reduced motion as it does without it”; *Rationale*: „pictures scaled up can pass the area below which flashing is allowed, so no effect takes the whole area of the scene”.
  - Bez zmiany — odczyt refinera, nie odpowiedź Mariusza: drobinki stoją w części kadru, a chłodna warstwa po śmierci z zimna, która leży do „Restart” albo „Zakończ”, jest stanem całej sceny, nie efektem, według zasady z pytania Q6 rozmowy zadania 17 (Mariusz, 2026-11-11, „pozostałe elementy zgodnie z rekomendacją na ten moment”, droga A), cytowanej wyżej przy wpisie o efektach; materiał pytania 3 nazwał ten odczyt drogą, przy której D-317 zostaje, a linia planu o tej zasadzie mówi „warstwa po śmierci z zimna jest stanem sceny”.
- D-62 — What does the screen show, and what can the player do, after a character's death?: „After a character's death the screen stays on the state of the game minute of death and time stands still for that map run”.
- D-132 — What does the screen show, and what can the player do, after a completion? (obecne): „After a completion the screen stays on the state of the game minute of the completion and time stands still for that map run”.
- D-122 — What does a map run do, and what does the player see, when something is discovered? (obecne): „A band in the role `discovery` above the program names what was discovered and the program rule the game wrote, the discoveries of one game minute in one band, with „Dodaj regułę z tym” and „Wznów”, […] and it stands until the player goes on, the scene keeping its colours […]. Where the map run ends in a completion in the game minute of a discovery, the screen after the completion takes the place of the pause, and the band stands, with no „Wznów”, until „Restart” or „Zakończ”.”
- D-316 — What does the scene show, and from what does it draw?: „The scene draws the character and its campfire from the game state and holds no state of the game, the picture of each resource and archetype it shows standing in the game's data. […] Motion comes from CSS at a fixed beat that does not depend on the pace, with no loop of drawing.”
- D-319 — How does the mage walk to its place?: „At the start of a map run, after „Restart”, after a load and under the system's setting for reduced motion the mage stands at its place at once, and under that setting the frames stand still.”
- D-320 — What stands over the mage's head?: „Over the mage's head stands a badge on a solid `panel` background, never an icon or a bar straight on the picture of the forest”.
- D-321 — Does a click on the scene do anything?: „The scene is a picture, not a control: a click on it does nothing and no pause sign stands on it.”
- D-272 — Where may a picture of the game stand?: „A picture of the game stands behind the login card and as the scene, and text stands on a solid background, never on a picture.”
- D-314 — What does the background of the scene show?: „The background of the scene is a still picture of a forest in snow, composed from the pictures of the pack Pixel Crawler that the predecessor game, loop, cut out.”
- D-315 (obecne) — Where does the darkness of the scene stand?: „The background picture of the scene is in full light, and a night or a dawn of the scene is a layer over that picture, never darkness in the picture's file.”
- D-349 — What size is the scene on the screen of a map run?: „The scene has one size, 672 × 304 px, twice the size of its picture, and the game keeps no second scale of it. Whatever the scene draws is drawn for this size alone.”
- D-43 — What counts in the browser view as a value written in place of a design token?: wartością wpisaną zamiast tokenu nie są m.in. „the geometry of the terrain drawing or of the scene computed in TypeScript, the frames and positions of a sprite”.
- `sprite-file-content`: „Every file the build copies from `assets/sprites/` is a PNG image.”
- `design-token-contrast`: „[…] each of `text-strong`, `text`, `text-secondary`, `text-label`, `positive`, `warning`, `danger`, `discovery` and `player-change` has a contrast ratio of at least 4.5:1 against each of `page`, `panel`, `highlight`, `rule-winning` and `rule-running` […]”.

## Settlements to record

Candidates: 9 shown, 7 accepted — 2026-11-11

Dwa wiersze pokazane wcześniej zeszły z tabeli na odpowiedź Mariusza: zasada ograniczenia ruchu dla chwil (pytanie 7) — całą zasadę zapisuje zadanie 20 (pytanie 14); granica rysowania w CSS z drobinkami (pytanie 8) — zdanie do D-271 zapisuje zadanie 18 (pytanie 13). Obie stoją w *Decisions in play*.

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Efekt odkrycia, śmierci i rozwiązania gra raz, a potem scena stoi na jego ostatnim obrazie, aż chwila się skończy; „Wznów” ucina efekt odkrycia, a scena narysowana ponownie na tej samej chwili pokazuje od razu ostatni obraz. Zmienia D-322. | decision | Pytanie 1 — wybór Mariusza | Czy efekt gra w pętli, czy powtarza się po powrocie na ekran i po odświeżeniu strony |
| 2 | Przy odkryciu ikony odkrytych rzeczy, które mają ikonę, stoją nad polaną w plakietkach na `panel` z ramką w `discovery` do „Wznów”, a rzecz bez ikony nazywa tylko pas nad programem. Zmienia D-39 i D-322. | decision | Pytanie 2 — wybór Mariusza | Jeden znak odkrycia albo plakietki bez ramki; jaki kolor ma ramka |
| 3 | Po śmierci mag upada w klatkach arkusza śmierci i leży szary; po śmierci z zimna nad sceną leży chłodna, niebieskawa warstwa do „Restart” albo „Zakończ”, inna niż chłodny odcień przy passie 0, a po głodzie i walce warstwy nie ma. Zmienia D-322, także jego *Rejected*. | decision | Pytanie 3 — wybór Mariusza | Czy każda przyczyna ma kolor, czy scena szarzeje po głodzie |
| 4 | Po rozwiązaniu nad częścią polany unoszą się raz i gasną drobinki światła, a mag stoi w kolorze. Zmienia D-322. | decision | Pytanie 4 — wybór Mariusza | Czy mag idzie do ogniska, czy efekt bierze całą scenę |
| 5 | Gdy przejście kończy się w minucie gry odkrycia, scena pokazuje tylko efekt końca — upadek maga albo drobinki światła — bez plakietek odkrycia. Zmienia D-322. | decision | Pytanie 11 — wybór Mariusza | Czy plakietki odkrycia stoją nad leżącym magiem albo obok drobinek |
| 6 | W czasie efektu chwili rusza się tylko sam efekt; ogień i mag stoją jak przy każdym zatrzymaniu. Zmienia D-322. | decision | Pytanie 12 — wybór Mariusza | Czy ogień płonie, a mag oddycha, póki trwa efekt |
| 7 | Okno końca przejścia otwiera się samo dopiero po efekcie śmierci albo rozwiązania, a gdy scena pokazuje ostatni obraz od razu, otwiera się od razu. Zmienia zdanie o oknie w D-311. | decision | Pytanie 10 — wybór Mariusza (szczegół a); część wyprowadzona, o otwieraniu od razu, przyjęta przez Mariusza 2026-11-11 | Czy okno zasłania efekt od pierwszej klatki albo czeka na efekt, którego scena nie gra |

## Out of scope

- Wilka w scenie, także przy śmierci w walce, daje zadanie 20.
- Odcień światła sceny idący za passą, pełne złoto po rozwiązaniu mapy, płomień ogniska i szron daje zadanie 18.
- Efekty zwykłych zdarzeń, jak zbieranie, daje zadanie 17.
- Okno końca przejścia daje zadanie 16; to zadanie tylko opóźnia jego otwarcie do końca efektu.
