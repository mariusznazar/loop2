# Plan projektu MVP2 loop2: ekrany, oprawa i samouczek

Status: handed over 2026-11-01
Definition: definicja_mvp2_loop2.md — fingerprint 8de9ffff

## Tasks

| # | Task | Goal | Depends on | In scope | Preparatory | State | Document |
|---|---|---|---|---|---|---|---|
| 1 | lokalny-start | Jedno polecenie uruchamia grę na komputerze przez HTTPS, z bazą założoną na to sprawdzenie, README mówi prawdę o uruchamianiu, a agent gra w nią w prawdziwej przeglądarce. | — | 29 | no | done | [lokalny_start_loop2.md](_zadania/lokalny_start_loop2.md) |
| 2 | logowanie-w-react | Niezalogowany gość widzi jedną kartę z nazwą gry, jednym zdaniem o grze, przełącznikiem „Zaloguj się” i „Załóż konto” oraz zwiniętymi wzmiankami, a wszystkie formularze tej karty działają jak dotąd i są pierwszym ekranem zbudowanym w React, lokalnie i na serwerze testowym. | 1 | 19 | no | done | [logowanie_w_react_loop2.md](_zadania/logowanie_w_react_loop2.md) |
| 3 | logowanie-na-tle-gry | Karta logowania stoi na obrazie gry, tekst leży na pełnym tle, a plik obrazu idzie z `assets/sprites/` przez budowanie do obrazu serwera, lokalnie i na serwerze testowym. | 2 | 19 | no | done | [logowanie_na_tle_gry_loop2.md](_zadania/logowanie_na_tle_gry_loop2.md) |
| 27 | przyciski-i-zakladki | Na karcie logowania główny przycisk ma jasną ramkę i mocny tekst, akcje pod formularzem są podkreślonym tekstem, zakładki mają linię u dołu, zdanie po prośbie o odnośnik stoi jaśniej z belką, a rozwinięcie wzmianek niczego nie przesuwa. | 2, 3 | 19 | no | ready for cycle | [zadanie_hierarchia_przyciskow_i_karta_logowania.md](_zadania/zadanie_hierarchia_przyciskow_i_karta_logowania.md) |
| 4 | ekrany-i-menu | Zalogowany gracz przechodzi między osobnymi ekranami Siedziba, Postać i Programy pod adresami po `#`, pod jednym paskiem menu z „Konto”; odświeżenie zostaje na tym samym ekranie, a wyjście z ekranu ręcznego przejścia pauzuje je i w menu staje „Wróć do przejścia”. | 2, 3, 27 | 3 | no | to refine | — |
| 5 | edytor-programu | Na ekranie Programy i na ekranie przejścia stoi jeden nowy edytor: reguła czyta się jak zdanie, panel obok, a nie nad programem, zmienia ją wyborem z siatki, z wyszarzeniem i powodem tego, czego wybrać nie wolno, grupy się zwijają, reguły przeciąga się między grupami, a przy nich stoi „Wykonano 3×” i nagłówek „sprawdzane od góry”. | 4 | 6, 8 | no | to refine | — |
| 6 | ekran-przejscia | Ekran ręcznego przejścia ma pod jednym nagłówkiem, z celem mapy w liczbach, świat po lewej, program pośrodku i jedną treść naraz po prawej, a w obszarze świata stoi nieruchomy kadr lasu, na którym wybrano rozmiar sceny. | 5 | 4 | no | to refine | — |
| 7 | scena-z-ludzikiem | W większej scenie pikselowego lasu mag chodzi do patyków i ogniska, nad głową ma ikonę zajęcia z paskiem postępu, a przy odkryciu scena zostaje kolorowa. | 6 | 11, 14 | no | to refine | — |
| 8 | napis-o-awarii | Gdy w grze wystąpi błąd, gra mówi to na ekranie jednym zdaniem i zapisuje go w konsoli przeglądarki, zamiast stanąć bez słowa. | 1 | 28 | no | to refine | — |
| 9 | pierwsza-mapa-bez-loterii | Nowa gra zaczyna się na mapie Skraj lasu z patykami i jagodami na każdym kafelku przy każdym ziarnie, a jej rozwiązanie otwiera Las. | 1 | 21 | no | to refine | — |
| 10 | pierwsza-akcja-od-startu | Gracz ma „Eksploruj” od pierwszej sekundy, „+ reguła” nigdy nie jest wyłączone, gra dopisuje regułę przy pierwszym wychłodzeniu tylko wtedy, gdy gracz sam jej nie dodał, a u gracza, który sam dodał regułę, pierwsze odkrycie pada do 20. minuty gry. | 5 | 22 | no | to refine | — |
| 11 | stan-i-powod-przy-regule | W trakcie ręcznego przejścia przy każdej regule kopii stoi, czy wygrywa, czy jest zablokowana z konkretnym powodem, czy jej warunek nie jest spełniony, czy nie została sprawdzona. | 5 | 7 | no | to refine | — |
| 12 | pytanie-przy-zakoncz | „Zakończ” przy niezapisanych zmianach kopii pyta „Zapisać, odrzucić, wrócić?” i robi to, co gracz wybierze, a bez niezapisanych zmian kończy przejście od razu. | 6 | 1 | no | to refine | — |
| 13 | karty-i-katalog-map | Gracz wybiera na ekranie Mapy mapę z listy otwartych map, czyta na jej karcie, czego wymaga, i w sekcji „Kto idzie” wysyła postać przez „Wejdź” albo „Puść w pętlę”, przy pustej liście „Wynieś” z ostrzeżeniem „Pętla nic nie zarobi do skrzynki”; do pierwszego przejścia prowadzą z Siedziby najwyżej trzy kliknięcia. | 6 | 3, 23, 26 | no | to refine | — |
| 14 | teraz-i-potem | W trakcie przejścia gracz czyta, co postać robi teraz, co zrobi potem, ile minut wytrzyma każda potrzeba i na pasku z liczbami, ile brakuje do warunku mapy. | 11, 13 | 5 | no | to refine | — |
| 15 | kronika-z-filtrami | Gracz czyta w prawym obszarze ekranu przejścia kronikę z minutami gry — odkrycia, czynności, walkę, zmiany programu i utratę passy z przyczyną — i filtruje ją według tych rodzajów. | 7, 8, 14 | 10 | no | to refine | — |
| 16 | koniec-przejscia | Koniec przejścia w prawym obszarze mówi kolejno, co się stało, co to kosztowało albo dało, dlaczego i co dalej: przyczynę, najlepszą passę wobec warunku mapy, ostatnie minuty, na co poszedł czas, prawdziwy napis, że wprawa z tego przejścia przepada, a wcześniejsza zostaje, i że 8 godzin to czas realny, wyraźną wygraną i dalszą drogę do otwartej mapy. | 12, 15 | 2, 9 | no | to refine | — |
| 17 | zbieranie-jako-widowisko | Przy zbieraniu mag w scenie się schyla, zebrana ikona leci, a chybienie daje kurz. | 7 | 12 | no | to refine | — |
| 18 | swit-rosnacy-z-passa | Noc w scenie jaśnieje razem z passą, utrata passy ściemnia las, rozwiązanie mapy daje pełny świt, płomień ogniska maleje, a na brzegach kadru pojawia się szron. | 16, 17 | 13, 16 | no | to refine | — |
| 19 | trzy-chwile-gdy-czas-stoi | Odkrycie, śmierć i rozwiązanie mapy mają w scenie własne efekty przy zatrzymanym czasie, a żaden efekt nie błyska całą sceną. | 18 | 15 | no | to refine | — |
| 20 | wilk-wbiega | Przy napaści wilk wbiega do sceny, widać szamotaninę i jej wynik, a wzmianki wymieniają paczkę z wilkiem, jeśli jej licencja tego wymaga. | 19 | 18 | no | to refine | — |
| 21 | oboz-w-siedzibie | U góry Siedziby stoi obóz: ognisko, skrzynka i postacie drużyny. | 7 | 17 | no | to refine | — |
| 22 | ekran-wiedzy | Gracz wchodzi z menu na ekran Wiedza, który pokazuje poznane czynności, przedmioty i stworzenia oraz drzewa umiejętności do czytania, bez poziomów i kupowania. | 13 | 3, 24 | no | to refine | — |
| 23 | koszty-i-stan-ogniska | Panel reguły pokazuje cenę przy czynności, na przykład „Wytwórz — ognisko (6 patyków)”, a rysunek mapy odróżnia własnymi ikonami ognisko płonące od wygasłego. | 7 | 25 | no | to refine | — |
| 24 | spokojniejszy-wyglad | Czerwień spoczynkowa zostaje tylko dla zagrożeń: przyciski niszczące są szare, a czerwienieją pod kursorem i przy fokusie, ikony biorą kolor z tekstu obok, a wzmianki o autorach są w Siedzibie zwinięte. | 11, 23 | 20 | no | to refine | — |
| 25 | raport-z-wyplata | Po powrocie gracz widzi w raporcie z nieobecności zarobioną wprawę i przyciskiem „Odbierz” wypłaca całą zebraną wprawę, także z przejścia w toku, bez zatrzymywania pętli i bez ruszania plecaka. | 24 | 27 | no | to refine | — |
| 26 | samouczek | Nowy gracz dostaje w miejscach, których dotyczą, osiem krótkich podpowiedzi z danych gry i podpowiedź przy zimnie, a gra nie prowadzi go po ścieżce. | 9, 10, 20, 21, 22, 25 | 30 | no | to refine | — |

## Projected entries

| Entry | Realized by | Written by |
|---|---|---|
| (new) — Which screens does the game have, and how does the player move between them? | 4, 13, 22 | 22 |
| (new) — How does an address name a screen? | 4, 6, 13, 22 | 22 |
| (new) — What happens to a manual map run when the player leaves its screen? | 4 | 4 |
| (new) — What do the screens leave room for from the start? | 4, 5, 6, 13, 22 | 5 |
| (new) — How is the screen of a map run laid out? | 6, 14 | 14 |
| (new) — What does the end of a map run explain? | 16 | 16 |
| (new) — How does the player write a program rule? | 5 | 5 |
| (new) — What state does a program rule show during a map run? | 11 | 11 |
| (new) — What does the chronicle of a map run hold? | 15 | 15 |
| (new) — What does the scene show, and from what does it draw? | 7, 17, 18, 20 | 20 |
| (new) — How long do the scene's effects last? | 7, 17, 18, 19, 20 | 20 |
| (new) — Where do the scene's pictures come from? | 3, 6, 7, 17, 18, 19, 20 | 20 |
| (new) — Where may a picture of the game stand? | 3, 6, 7, 21 | 21 |
| (new) — Which map does a new game open on? | 9 | 9 |
| (new) — What does the screen Mapy show? | 13 | 13 |
| (new) — What does the screen Wiedza show? | 22 | 22 |
| (new) — Where does the player read what an action costs? | 23 | 23 |
| (new) — What does the game say before an earning loop that earns nothing? | 13 | 13 |
| (new) — How does the game teach a new player? | 26 | 26 |
| D-04 — What is the game built with? | 7, 15 | 15 |
| D-27 — Where do the game's icons come from? | 2, 5, 7, 23, 24 | 24 |
| D-40 — What do the neutral roles of the browser view mean? | 11 | 11 |
| D-42 — Which accessibility requirements does the browser view keep? | 11, 19 | 19 |
| D-43 — What counts in the browser view as a value written in place of a design token? | 7, 24 | 24 |
| D-44 — Which controls do the screens of the browser view build on? | 4, 5, 24 | 24 |
| D-53 — Where does the player send a character from, and where does „Zakończ” lead? | 4, 13 | 13 |
| D-62 — What does the screen show, and what can the player do, after a character's death? | 16 | 16 |
| D-70 — How does the browser view show a campfire? | 23 | 23 |
| D-93 — What does a program rule show the player? | 5 | 5 |
| D-96 — What does a player see before and after signing in? | 2, 3, 4 | 4 |
| D-121 — What brings each action, item and condition of the first maps into the Understanding? | 10 | 10 |
| D-122 — What does a map run do, and what does the player see, when something is discovered? | 6, 7, 15, 16 | 16 |
| D-123 — What does the game write into the program at a discovery? | 10 | 10 |
| D-124 — What does „+ reguła” do? | 5, 10 | 10 |
| D-130 — Where does the player pick the pace, and with which control? | 6 | 6 |
| D-132 — What does the screen show, and what can the player do, after a completion? | 16, 18 | 18 |
| D-133 — Where does the player see a map run's streak and a map's solving condition? | 13, 14 | 14 |
| D-134 — Where does the player see that a map is solved? | 13 | 13 |
| D-135 — Does the game show the longest streak of a map run? | 16 | 16 |
| D-147 — What record of an encounter does the player read? | 14, 15, 16 | 16 |
| D-148 — Where is an attacking creature pictured today? | 20 | 20 |
| D-149 — When does the game offer a map opened by another map? | 13 | 13 |
| D-157 — What does a signed-in player see of an unconfirmed address, and who may ask for another confirmation message? | 4 | 4 |
| D-166 — Where does the player see the player's programs and pick the one to edit? | 4, 5 | 5 |
| D-170 — Where does the player pick the program a character enters a map with, and which one stands there first? | 13 | 13 |
| D-173 — What can the player do with the copy after a map run ends? | 12 | 12 |
| D-180 — Where does the player arrange the trip plan? | 5, 13 | 13 |
| D-185 — Where does the player read what completion deposited? | 16 | 16 |
| D-199 — What does the screen Postać show of character skills? | 4 | 4 |
| D-200 — Where does the player buy a branch rank, and when does it act? | 4 | 4 |
| D-208 — What does the player see of saving the game state? | 4 | 4 |
| D-216 — Where does the player read what a character's death took? | 16 | 16 |
| D-217 — What does the game show of a character's resurrection? | 4 | 4 |
| D-244 — What does the player see of an earning loop? | 4 | 4 |
| D-245 — What does „Zatrzymaj” do? | 4, 24, 25 | 25 |
| D-246 — What does the player read after being away? | 25 | 25 |
| D-188 — Where does the player learn that a map cuts the trip plan? | 13 | 13 |
| D-189 — What pays, and what takes from the chest? | 25 | 25 |
| D-243 — How does the player start an earning loop? | 13 | 13 |
| D-251 — How does the card of a map mark a rehearsal the loop cannot repeat? | 13 | 13 |
| D-03 — How is the browser view built? | 2, 4, 5, 6, 13 | 2 |
| D-06 — How are the browser and server built together? | 2 | 2 |
| (new) — How does an agent learn what went wrong in the running game? | 8, 15 | 15 |
| (new) — How does an agent operate the game as a player does? | 1 | 1 |
| (new) — Where does the data an agent checks the game on come from? | 1, 5 | 5 |
| D-19 — How does the player interact with the terrain panel's drawing of the game map? | 6 | 6 |
| D-36 — Which file is the exemplar for browser modules? | 2 | 2 |
| D-39 — What do the signal colours of the browser view mean? | 11, 24 | 24 |
| D-97 — What does the player's logout do? | 4 | 4 |
| D-118 — When does the player learn what the world holds? | 10 | 10 |
| D-128 — Where does what reveals an action, an item, a condition or a creature stand? | 10 | 10 |
| D-165 — How does the game state tell one program from another? | 13 | 13 |
| D-195 — When does a character skill tree become known? | 10 | 10 |
| browser-view-framework | 2 | 2 |
| rule-state-from-pick | 11, 14 | 14 |
| sprite-file-content | 3 | 3 |
| sprite-credits | 20 | 20 |
| loop2-container-sprites | 3, 6, 7, 17, 18, 19, 20 | 20 |
| first-map-stock | 9 | 9 |
| icon-credits | 2, 5, 7, 23, 24 | 24 |
| design-token-contrast | 11 | 11 |
| chronicle | 15 | 15 |
| Understanding | 10 | 10 |
| headquarters | 4 | 4 |
| pixel-crawler-terms | 3 | 3 |
| lpc-wolf-licence | 20 | 20 |
| browser-view (changed) | 2, 3 | 3 |

## Open questions

- Jaki rozmiar ma scena: 336 × 152 czy 672 × 304? Rozstrzyga oglądanie sceny w układzie ekranu. — definition: task: ekran przejścia — plan: task 6
- Jaką passę wymaga Skraj lasu: 720 minut jak w starym Loop czy 480 jak w pomiarze weterana? — definition: task: pierwsza mapa bez loterii — plan: task 9
- Którym narzędziem składać kod przeglądarki? — definition: breakdown — answer: esbuild (human, 2026-11-01)
- Jakie pliki testów nowych niezmienników, jakie miejsce pliku ustawień Playwrighta i jacy zewnętrzni partnerzy (paczki Pixel Crawler i LPC Wolf) dochodzą do mapy części? — definition: breakdown — answer: pliki testów żadne, bo pięć nowych niezmienników ma w definicji metodę `review`; miejsce pliku ustawień Playwrighta wskazuje zadanie 1; partnera Pixel Crawler dopisuje zadanie 3, a LPC Wolf zadanie 20 (human, 2026-11-01)
- Które nieaktualne przykłady i uzasadnienia poprawić przy okazji: D-46, D-47, D-55, D-57, D-71, D-91, D-126, D-127, D-171, D-196, D-207, D-234? — definition: breakdown — answer: wszystkie, każdy w zadaniu, którego zmiana go unieważnia: D-234 w zadaniu 1, D-196 i D-207 w zadaniu 4, a „Odbierz” dopisuje do D-207 zadanie 25, D-91 w zadaniu 5, D-46 w zadaniu 6, D-71 w zadaniu 10, D-126 i D-127 w zadaniu 11, D-55 i D-171 w zadaniu 13, D-57 w zadaniu 14, jeśli wiersz ciała się zmieni, D-47 w zadaniu 24 (human, 2026-11-01)
- Czym zastąpić ręczny model dokumentu w testach ekranów przechodzących na React? — definition: breakdown — plan: task 2
- Czy strona źródłowa LPC Wolf potwierdza licencję CC BY i jakiej wzmianki żąda? Strony nie udało się pobrać, a fakt opiera się na notatce starego Loop. — definition: task: wilk wbiega — plan: task 20
- Jakie wartości mają role tła `rule-winning` i `rule-running` i skąd się biorą? — definition: task: stan i powód przy regule — plan: task 11
- Czy kronika żyje w pamięci strony, czy w zapisie gry z limitem 64 KB? Gdy w zapisie, z D-04 wypada zdanie o kronice, a wczytany stan ma jej wpisy; gdy w pamięci strony, zdanie zostaje, a wczytany stan ma kronikę pustą. — definition: task: kronika z filtrami — plan: task 15
- Skąd brać 2–3 klatki schylania się maga: z przeróbki ręcznej czy z generowania? — definition: task: zbieranie jako widowisko — plan: task 17
- Jaki kolor ma warstwa nocy i świtu? Wartość wybiera Mariusz. — definition: task: świt rosnący z passą — plan: task 18
- Ile razy projekt podbija wersję zapisu i w których zadaniach? — definition: breakdown — answer: liczby nie ustalamy z góry: każde zadanie, które zmienia kształt stanu gry, podbija wersję raz w swojej zmianie; pewne jest zadanie 16, zadanie 15 podbija, jeśli kronika wejdzie do zapisu, a zadania 9 i 25 mogą podbić; utratą zapisu przy podbiciu projekt na razie się nie przejmuje (human, 2026-11-01)
- Jaka jest dokładna treść podpowiedzi samouczka i ile samouczek kosztuje? — definition: task: samouczek — plan: task 26
- Czy `assets/sprites/**`, nowa granica zaufania, dostaje stały test odmowy, jak każe zasada „Trust boundaries” w `guidelines/testing.md`, czy czasowe odstępstwo na wzór D-76, skoro `sprite-file-content` ma w definicji metodę `review`? — definition: none — answer: czasowe odstępstwo na wzór D-76: przegląd zamiast stałego testu do pierwszej zmiany tej granicy, a zapisuje je zadanie 3 (human, 2026-11-01)

## Phases

- Przed zgłoszeniem 10x — zadania 1, 2, 3, 27, 4, 5, 6, 7 — zamyka ją nowe logowanie, ekrany Siedziba, Postać i Programy, nowy edytor i ludzik w scenie, działające na serwerze testowym; termin 2026-11-04 dotyczy zgłoszenia i podpowiada tylko kolejność, a zakres i proces zostają

## Change log

- 2026-11-01 — plan napisany z definicji o odcisku 8de9ffff
- 2026-11-01 — pytanie o to, czym zastąpić ręczny model dokumentu w testach, przekazane z rozbicia do zadania 2 — to pierwszy ekran, który traci ten model, a raport technologii nie policzył, ile przypadków czyta wnętrze modelu, więc wybór między jsdom a happy-dom zapada na tym zadaniu, nie w ciemno
- 2026-11-01 — ekran Map (zadanie 13) idzie po edytorze (zadanie 5), a do tej chwili postać rusza z Siedziby jak dziś — edytor stoi w definicji wyżej niż podział na ekrany, a przy końcu tokenów przed terminem przepada tylko ekran Map; decyzja człowieka 2026-11-01
- 2026-11-01 — nowe ikony przypisane zadaniom 5, 7 i 23, a zadanie 23 zależy od 7, zadanie 24 od 23 — w repozytorium jest 5 ikon, dane czynności nie mają pola ikony, a wiersz reguły, ikona zajęcia i ognisko wygasłe ich potrzebują; zależność 23 od 7 rozdziela też pracę na rysunku mapy; uwaga krytyki
- 2026-11-01 — cel zadania 6 mówi o nieruchomym kadrze lasu zamiast o miejscu sceny, a zadanie 6 dołącza do wpisów o obrazkach — sceny jeszcze nie ma, a pytanie o rozmiar rozstrzyga oglądanie; uwaga krytyki
- 2026-11-01 — zadanie 14 dołącza do D-147, a zadanie 15 zależy od 14 — „Teraz” z D-147 powstaje w zadaniu 14, a droga z końca przejścia do otwartej mapy wymaga ekranu Map z zadania 13; uwaga krytyki
- 2026-11-01 — wpis o adresach ekranów urzeczywistniają też zadania 13 i 22, a pisze go zadanie 22; zadanie 13 zależy od 6 — zadanie 6 nie mogłoby zapisać adresów, których jeszcze nie ma, a zadania 6 i 13 ruszają te same pliki `game-view.ts` i `trip-lines.ts`, więc dotychczasowy wpis pozwalający im iść obok siebie usunięty; uwaga krytyki
- 2026-11-01 — zadanie logowania podzielone na 2 logowanie-w-react i 3 logowanie-na-tle-gry, a zadanie 4 zależy od 3 — sam `account-screen.test.mjs` ma 3262 wiersze i 67 przypadków, więc React, esbuild i wymiana modelu dokumentu to dość ryzyka na jeden cykl, a kłopot z obrazem nie zablokuje Reacta; uwaga krytyki, decyzja człowieka 2026-11-01
- 2026-11-01 — pozycja 1 zakresu i D-173 przeszły z zadania 16 do nowego zadania 12 pytanie-przy-zakoncz, a zadanie 16 zależy od 12 — to mała ochrona zwycięskiego programu, która nie potrzebuje kroniki i nie ma czekać na późny etap; uwaga krytyki
- 2026-11-01 — skład stanu gry symulacją przeszedł z zadania 1 do zadania 5, które pisze też wpis o danych do sprawdzania — pozycja 29 mówi tylko o starcie i README, a edytor jest pierwszym zadaniem, które potrzebuje stanów niedostępnych graniem: czasowniki walki i wykupione gałęzie w wyborze czynności; uwaga krytyki, poprawiona przez autora
- 2026-11-01 — zadanie 10 nie zależy już od 9 — „Eksploruj” trwa 20 minut na każdej mapie, a D-121 mówi „on whichever map”; uwaga krytyki
- 2026-11-01 — zadanie 24 dołącza do D-245 i D-39 i zależy od 11, a zadanie 25 zależy od 24 — definicja zmienia kolor „Zatrzymaj” i przykład w D-39, a wypłata jest dla człowieka mniej pilna niż spokojniejszy wygląd; uwaga krytyki
- 2026-11-01 — wiersze wpisów o ekranach, efektach sceny, kontrolkach i `loop2-container-sprites` uzupełnione o zadania, które ich dotykają, cele 5, 6, 16, 23 i 26 uzupełnione o słowa definicji, a faza przemianowana i zawężona do trzech ekranów — ograniczenie o układzie ma dojść do każdego ekranu, a faza nie obejmuje Map ani Wiedzy; uwagi krytyki
- 2026-11-01 — pytanie o test odmowy dla `assets/sprites/**` dopisane i rozstrzygnięte: czasowe odstępstwo na wzór D-76, zapisywane w zadaniu 3 — zasada „Trust boundaries” żąda stałego testu każdej granicy zaufania, a definicja daje `sprite-file-content` metodę `review`; uwaga krytyki, decyzja człowieka 2026-11-01
- 2026-11-01 — uwaga dla zadania 2: `tests/invariants/test_browser_view_token_values.py` nie czyta plików `.tsx`, więc pierwszy ekran w React wypadłby spod strażnika wartości wyglądu — strażnik ma objąć `.tsx` w tej samej zmianie; uwaga krytyki
- 2026-11-01 — zadania przenumerowane w kolejności pracy, a numery w pytaniach, fazie i tym dzienniku poprawione, nazwy zadań bez zmian — numery zadań dopisanych po krytyce stały poza kolejnością i mieszały; prośba człowieka 2026-11-01
- 2026-11-01 — plan oddany człowiekowi — człowiek przyjął plan po krytyce i swoich decyzjach
- 2026-11-01 — zadania 1, 2 i 3 w stanie `waiting for human`, z linkami do ich dokumentów — człowiek potwierdził rundę z tych trzech zadań, a pakiet pytań po niezależnej krytyce został mu przedstawiony
- 2026-11-01 — zadania 1, 2 i 3 wracają do `to refine` — człowiek odpowiedział na cały pakiet, a świeże agenty przenoszą odpowiedzi do dokumentów; odpowiedź ogranicza cel zadania 2: potwierdzenie adresu i udane ustawienie hasła przechodzą do końca tylko na serwerze testowym, bo lokalnie poczta nigdzie nie dochodzi (human, 2026-11-01)
- 2026-11-01 — zadania 1, 2 i 3 w stanie `waiting for human` — drugi pakiet rundy, z kandydatami na wpisy do fundamentu, po niezależnej krytyce przedstawiony człowiekowi
- 2026-11-01 — zadania 1, 2 i 3 wracają do `to refine` — człowiek odpowiedział na drugi pakiet, a świeże agenty domykają dokumenty
- 2026-11-01 — zadanie 1 w stanie `waiting for human` — jego pełny dokument czeka na akceptację człowieka
- 2026-11-01 — zadanie 1 w stanie `ready for cycle` — człowiek przyjął jego pełny dokument: „przyjmuję zadanie 1”
- 2026-11-01 — zadania 2 i 3 w stanie `waiting for human` — ich dokumenty są domknięte i czekają kolejno na akceptację człowieka
- 2026-11-01 — zadanie 2 w stanie `ready for cycle` — człowiek przyjął jego pełny dokument: „tak”
- 2026-11-01 — zadanie 3 w stanie `ready for cycle` — człowiek przyjął jego pełny dokument: „tak”
- 2026-11-01 — odpowiedź na pytanie o `assets/sprites/**` doprecyzowana: odstępstwo kończy tylko zmiana zasady granicy, więc kolejny plik PNG nie kończy go; zadania 6 i 7 nie dodają stałego testu, a przydziały w tabeli wpisów zostają (human, 2026-11-01)
- 2026-11-02 — uwaga dla zadania 20: zadanie 3 zapisało część „Where do the scene's pictures come from?” jako D-271 w brzmieniu szerszym niż definicja — „The scene's pictures and the picture of the game behind the login card are sprites of the pack Pixel Crawler …” — więc zadanie 20, dopisując LPC Wolf, wzmianki i maga sceny, wychodzi od obecnego D-271, a nie od zdania z definicji, i zachowuje obraz za kartą logowania; uwaga przeglądu zadania 3 (M2, PR 53), decyzja człowieka 2026-11-02
- 2026-11-02 — zadanie 1 w stanie `done` — ślad cyklu i rekord `docs/task-cycles/lokalny-start/cycle.md` na `origin/main` 799d1ff, PR #50 scalony
- 2026-11-02 — zadanie 2 w stanie `done` — ślad cyklu i rekord `docs/task-cycles/logowanie-w-react/cycle.md` na `origin/main` 799d1ff, PR #52 scalony
- 2026-11-02 — zadanie 3 w stanie `done` — ślad cyklu i rekord `docs/task-cycles/logowanie-na-tle-gry/cycle.md` na `origin/main` 799d1ff, PR #53 scalony
- 2026-11-02 — dopisane zadanie 27 przyciski-i-zakladki: zależy od 2 i 3, dostarcza część pozycji 19 zakresu i należy do fazy „Przed zgłoszeniem 10x”, a zadanie 4 zależy od 27 — przewodnik stylu nie zna głównego przycisku ani zakładek, karta logowania jest wzorcem kolejnych ekranów, a zadanie 27 daje zadaniu 4 znak bieżącej pozycji menu i statusy starych ekranów; decyzja człowieka 2026-11-02
- 2026-11-02 — zadanie 27 mieści się w zatwierdzonym zakresie, więc definicja i jej odcisk zostają bez zmian — cel definicji mówi o „ładnym logowaniem”, praca należy do pozycji 19 zakresu, a *Deliverables* mówią: „przewodnik stylu widoku i wytyczne kodowania widoku uzupełnione o to, co ten projekt ustala”; decyzja człowieka 2026-11-02
- 2026-11-02 — rozjazd z projektowanym D-44 zostaje w definicji: zadania 4, 5 i 24 biorą z bieżącego fundamentu akcję poboczną rysowaną jako tekst i wygląd odpowiedzi na prośbę o odnośnik do zmiany hasła, a zadanie 27 nie wchodzi do tabeli wpisów, bo nie urzeczywistnia żadnego wpisu projektowanego — projektowany D-44 nie zna akcji pobocznej rysowanej jako tekst i każe tej odpowiedzi stać w `text-secondary`, a zadanie 27 zmienia oba miejsca; decyzja człowieka 2026-11-02. Osobno, z punktu 11 *To do* dokumentu zadania: zadanie 27 zmienia też przykład w *Verification* D-40 (wybór zakładki pokazuje linia), a wiersz D-40 zostaje, bo pole czekające na zadanie zostaje takie, jak w fundamencie (definicja, „Projected foundation changes”), więc zadanie 11 zachowuje ten przykład; uwaga krytyki
- 2026-11-02 — numer 27 stoi poza kolejnością pracy — zadanie idzie przed zadaniem 4, a przenumerowanie rozjechałoby się ze wszystkimi notatkami, które mówią „zadanie 4”; wybór człowieka 2026-11-02
- 2026-11-02 — wiersz zadania 27 stoi między wierszami 3 i 4, a numer 27 na liście fazy między 3 i 4 — tabela i faza czytają się dzięki temu w kolejności pracy; wybór autora planu, nie człowieka, uwaga krytyki
- 2026-11-02 — uwaga dla zadania 13: główny wygląd z zadania 27 obejmuje tylko przycisk wysyłający formularz, więc wygląd „Wejdź” rozstrzyga dokument zadania 13 — pytanie 1b dokumentu zadania 27 mówi: „o głównych działaniach poza formularzami, jak „Wejdź”, rozstrzyga zadanie ich ekranu” (human, 2026-11-02), a „Wejdź” należy do zadania 13; uwaga krytyki
- 2026-11-02 — zadanie 6 dołącza do `loop2-container-sprites`, a pisze go dalej zadanie 20 — nieruchomy kadr lasu z zadania 6 jest pierwszym plikiem, o który prosi rysunek sceny, a obraz z zadania 3 stoi za kartą logowania, nie w scenie; bez tego dokument zadania 6 nie niósłby tego niezmiennika; uwaga krytyki
- 2026-11-02 — zadanie 27 w stanie `waiting for human` — jego pełny dokument czeka na akceptację człowieka
- 2026-11-02 — zadanie 27 w stanie `ready for cycle` — człowiek przyjął jego pełny dokument: „tak”
