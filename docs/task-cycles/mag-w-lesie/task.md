# Wysłać maga żywiołów na mapę Las, po której chodzi według programu reguł

Status: ready for cycle
Project relation: plan item: plan_mvp_loop2.md — mag-w-lesie

## Description

### Need

- W loop2 nie ma jeszcze gry: szkielet z zadania 1 pokazuje pustą stronę, a symulacji, mapy ani programu postaci nie ma.
- Projekt MVP ma dać grywalny wycinek loop z magiem żywiołów sterowanym programem reguł „warunek → akcja” na mapie z sześciokątnych kafelków; to zadanie kładzie pierwszą mapę, pierwszy program i symulację, na których stoją zadania 4–14 i 18.

### To do

1. Mapa Las stoi w danych gry: siatka 4 × 4 sześciokątnych kafelków z wejściem `{ col: 1, row: 1 }`, krokiem 5 minut i zasobami patyk (gęstość 0,7, zapas 12, odnowienie co 30 min), jagoda (0,5, 8, 40), mech (0,4, 6, 60) i włókno (0,4, 6, 60).
2. Gracz wysyła na Las jedną gotową postać o archetypie mag żywiołów, podpisaną nazwą archetypu „Mag żywiołów”, bez ekranu zakładania i bez własnego imienia.
3. Przejście losuje układ mapy ze swojego ziarna na starcie, przed pierwszą minutą gry; „Restart” zaczyna przejście od minuty zero z tym samym ziarnem i bieżącym programem, więc przywraca ten sam układ, a „Zakończ” kończy przejście i wraca do wysyłania maga na Las, gdzie każde kolejne wysłanie bierze nowe ziarno.
4. Gracz układa program postaci jako uporządkowaną listę reguł „warunek → akcja”, z akcjami Eksploruj, Wędruj i Idź — <zasób mapy> oraz warunkami „Zawsze” i „Tu leży mniej niż N <zasób mapy>”, wybieranymi z zamkniętej listy; jeden program stoi w panelu obok panelu terenu, gracz zmienia go przed wysłaniem maga i w trakcie przejścia, zmiana działa od najbliższej wolnej minuty gry bieżącego przejścia, a program zostaje przy „Restart” i „Zakończ”.
5. Postać działa wyłącznie według programu: w każdej wolnej minucie gry wykonuje pierwszą regułę, której warunek zachodzi, a akcja jest w tej chwili wykonalna; gracz nie ma jak wykonać akcji ręcznie.
6. Eksploracja trwa 20 minut, odsłania kafelek, na którym postać stoi, nie da się jej powtórzyć na kafelku odsłoniętym i nie przynosi przedmiotu; krok na sąsiedni kafelek jest zwykłą akcją, po której program wybiera regułę od nowa, a akcja ruchu do rzeczy prowadzi o jeden krok w stronę najbliższego znanego kafelka z tą rzeczą, liczonego minutami drogi.
7. Panel terenu rysuje cały prostokąt mapy od pierwszej minuty: kafelki nieodsłonięte ciemne i puste, odsłonięte jaśniejsze z ikonami zasobów bez liczb, ikona przygaszona przy zapasie zero, gruby bursztynowy obrys na kafelku postaci i kreskowany na celu bieżącego kroku; obok stoi lista odsłoniętych kafelków z zapasem każdego zasobu, a najechanie łączy kafelek z jego wierszem w liście, co jest jedyną interakcją rysunku; nad panelem stoi wiersz z minutą gry i bieżącą akcją postaci.
8. Czas przejścia płynie w stałym tempie jednej minuty gry na sekundę realną, a gracz może go zatrzymać i wznowić.

### Questions to settle

- Jakie akcje i warunki ma program w tym zadaniu?
  - Answer: akcje Eksploruj, Wędruj i Idź — <zasób mapy>; warunki „Zawsze” i „Tu leży mniej niż N <zasób mapy>”. Zapas na kafelkach nie zmienia się aż do zadania 4, które dokłada zbieranie; każdy kolejny warunek wchodzi z zadaniem, które daje mu treść. Odrzucone: sam warunek „Zawsze” (program bez żadnej decyzji); pełna lista warunków loop (martwe pozycje do zadań 4 i 8). Mariusz, 2026-10-13.
- Jakie zasoby leżą w Lesie i z jakimi liczbami?
  - Answer: wszystkie cztery zasoby lasu z loop — patyk, jagoda, mech i włókno — z liczbami loop; wymiary, wejście, krok i czas eksploracji też z loop. Mech i włókno nikomu nie będą wadzić, a to nie jest duży koszt. Odrzucone: tylko patyk i jagoda; patyk, jagoda i mech. Mariusz, 2026-10-13.
- Jak płynie czas przejścia — w jakim tempie i czy gracz może go zatrzymać?
  - Answer: stałe tempo jak w loop przy mnożniku 1× — minuta gry na sekundę realną — z pauzą i wznowieniem; szybsze tempo daje dopiero przewijanie w zadaniu 7. Odrzucone: to samo tempo bez pauzy; szybsze tempo do czasu zadania 7. Mariusz, 2026-10-13.
- Którego maga gracz wysyła — gotową postać czy zakładaną w tym zadaniu?
  - Answer: jedną gotową postać o archetypie „Mag żywiołów”, bez ekranu zakładania i bez własnego imienia; zakładanie postaci wprowadza zadanie 11. Odrzucone: zakładanie postaci z imieniem w tym zadaniu (ekran zakładania przed siedzibą i drużyną, w których ma stać). Mariusz, 2026-10-13.
- Gdzie i kiedy gracz zmienia program i od kiedy zmiana działa?
  - Answer: jeden program w panelu obok panelu terenu, zmieniany przed wysłaniem maga i w trakcie przejścia; zmiana działa od najbliższej wolnej minuty gry bieżącego przejścia (po skończeniu trwającej akcji); program zostaje przy „Restart” i „Zakończ”. Kopię programu wziętą na starcie przejścia wprowadza zadanie 12. Odrzucone: zmiana tylko poza przejściem (każda poprawka wymaga końca przejścia, a warunek rozwiązania Lasu z zadania 7 zakłada zmianę w trakcie); zmiana działająca dopiero po „Restart” (dwie wersje programu naraz). Mariusz, 2026-10-13.
- Czy stan gry przetrwa przeładowanie strony?
  - Answer: na razie bez zapisu — stan żyje w pamięci strony, a przeładowanie zaczyna od nowa, z pustym programem i bez przejścia; zapis stanu wprowadza zadanie 16. Odrzucone: sam program zapisany w przeglądarce; cały stan zapisany w przeglądarce (oba to zapis bez numeru wersji, który zadanie 16 musiałoby przejąć albo wyrzucić). Mariusz, 2026-10-13.
- Jak gracz uruchamia restart przejścia i nowe przejście?
  - Answer: przyciski „Restart” (od minuty zero, to samo ziarno, bieżący program) i „Zakończ” (koniec przejścia z woli gracza i powrót do wysyłania maga; ponowne wysłanie bierze nowe ziarno). Odrzucone: „Restart” i „Nowe przejście” bez kończenia (przejście bez końca z woli gracza, dwa podobne przyciski); sam „Restart” (nowy układ tylko przez przeładowanie strony). Mariusz, 2026-10-13.
- Co znaczy „widok” w zdaniu wpisu projektowanego „What is the game built with?” — “The view draws only from the game state and changes nothing in it.” — skoro D-03/1 nazywa „browser view” wszystkie ekrany, z edytorem programu, a gracz w tym zadaniu zmienia stan gry z ekranów (edytor, wysłanie, pauza, „Restart”, „Zakończ”)?
  - Answer: otworzyć ponownie ten wpis projektowany w definicji `definicja_mvp_loop2.md` skillem `the-way-define-project` i przepisać zdanie tak, by mówiło, jak ekrany zmieniają stan gry; zadanie zapisuje wpis w nowym brzmieniu, gdy definicja przejdzie dla niego kontrolę gotowości. Definicja przeszła ją 2026-10-13 (odcisk 9e480247). Odrzucone: wąskie znaczenie „widoku” z przemianowaniem D-03/1, `browser-view-framework/1` i części `browser-view`; zostawienie brzmienia bez zmian. Mariusz, 2026-10-13.
- Co pokazuje panel terenu?
  - Answer: panel jak w koncepcji (§5), bez ogniska, które wchodzi w zadaniu 4: siatka, lista odsłoniętych kafelków z zapasami, przygaszona ikona przy zapasie zero, obrysy kafelka postaci i celu kroku, najechanie łączące kafelek z wierszem listy; do tego wiersz z minutą gry i bieżącą akcją postaci. Odrzucone: sama siatka bez listy i liczb (warunek „Tu leży mniej niż N” pisany bez widocznej liczby); liczby wpisane w kafelki (nieczytelne przy czterech zasobach). Mariusz, 2026-10-13.

## Context

- Cel z planu: „Gracz wysyła maga żywiołów na mapę Las ułożoną z ziarna przejścia i widzi w panelu terenu siatkę sześciokątnych kafelków, po której postać według programu reguł eksploruje i przechodzi na sąsiednie kafelki; restart przywraca ten sam układ mapy.”
- Punkty „In scope” definicji `definicja_mvp_loop2.md`, które zadanie realizuje według planu: 6 „Postać zakłada się w jednym archetypie: magu żywiołów.”; 7 „Program: uporządkowana lista reguł „warunek → akcja” z warunkami wybieranymi z zamkniętej listy, grupy reguł o jednym piętrze, licznik zadziałań każdej reguły w bieżącym przejściu (D14, D15).”; 10 „Mapa jako siatka sześciokątnych kafelków: szkielet stały, układ losowany z ziarna przejścia; eksploracja odsłania kafelek; krok jest zwykłą akcją; program odwołuje się do „najbliższego” (D32–D34).”; 21 „Losowość wyłącznie z ziarna zapisanego w stanie przejścia; restart bierze to samo ziarno (D19).”; 23 „Rysunek siatki mapy w panelu terenu (§5).”
- Według planu część punktu 7 robią inne zadania: grupy reguł i liczniki zadziałań — zadanie 5; programy gracza wybierane przy wejściu na mapę — zadanie 12.
- Według planu dalsze zadania dokładają: potrzeby, zbieranie, plecak, ognisko i śmierć — zadanie 4; odkrywanie czynności, przedmiotów i warunków — zadanie 6; przewijanie czasu i rozwiązanie Lasu — zadanie 7; siedzibę i zakładanie postaci — zadanie 11; zapis stanu na serwerze — zadanie 16.
- Definicja pozwala zadaniom czytać z kodu loop (`C:\Storage\repos\loop`) wyłącznie pliki danych (`src/sim/data/`) i testy; kodu silnika i interfejsu loop zadania nie czytają.
- Liczby Lasu w punkcie 1 „To do” pochodzą z danych loop (`src/sim/data/maps.ts`, mapa `forest`); czas eksploracji w punkcie 6 — z `src/sim/data/activities.ts`.
- Czynności w danych loop (`src/sim/data/activities.ts`): Wędruj bez celu i Idź z celem trwają tyle, ile krok z kafelka.
- Warunek „Tu leży mniej niż” w danych loop (`src/sim/data/conditions.ts`) czyta zapas na kafelku postaci, a nieodsłonięty kafelek liczy się jak pusty.
- Koncepcja (`koncepcja_projektowa.md`, §5): „Wędruj” idzie w losową stronę, najchętniej w nieodsłoniętą; „Idź — patyk” prowadzi o jeden krok w stronę najbliższego znanego kafelka z patykami.
- Testy loop (`src/sim/movement.test.ts`): Wędruj woli sąsiada nieodsłoniętego, a gdy wszyscy sąsiedzi są odsłonięci, idzie na któregoś z nich; jest wykonalne, dopóki kafelek ma sąsiada; sprawdzenie wykonalności nie rusza generatora.
- Testy loop (`src/sim/movement.test.ts`): Idź celuje w najbliższy odsłonięty kafelek z zapasem większym od zera i podaje pierwszy krok; nie jest wykonalne, gdy takiego kafelka nie ma albo gdy postać stoi na kafelku celu; krok kosztuje tyle, ile kafelek docelowy.
- Opis panelu terenu w punkcie 7 „To do” pochodzi z koncepcji (`koncepcja_projektowa.md`, §5).
- Tempo jednej minuty gry na sekundę realną pochodzi z danych loop (`src/sim/data/balance.ts`, `gameMinutesPerRealSecond: 1` przy mnożniku 1×).
- W tym zadaniu nie ma odkrywania (zadanie 6), więc gracz od początku widzi wszystkie akcje, warunki i zasoby, które zadanie dostarcza.
- Kod przeglądarki szkieletu: `src/browser/main.ts` tworzy pusty element `main`; budowanie kompiluje `src/browser` konfiguracją `tsconfig.browser.json`.

## Questions carried to cycle

- Która część mapy części trzyma symulację, czyli które pliki obejmuje niezmiennik `simulation-randomness/1` — pytanie otwarte planu przekazane temu zadaniu; kodu symulacji jeszcze nie ma, więc część i jej pliki ustala cykl, który ten kod pisze, i zapisuje je w mapie części.
- Skąd biorą się ikony zasobów i czynności — w granicach koncepcji (§7): paczki zewnętrzne na licencjach dopuszczających użycie komercyjne, źródła w repozytorium poza katalogiem serwowanym, wymagane wzmianki w stopce gry.

## Human actions

none

## Decisions in play

Obecny fundament loop2:

- D-04/2 „What is the game built with?”: “The game is written in TypeScript and runs in the browser.” — zadanie dopisuje resztę wpisu projektowanego o tym samym pytaniu (niżej).
- D-03/1 „How is the browser view built?”: “The browser view is built in TypeScript with the browser's DOM APIs, without an additional UI framework.” — jego *Relations* wskazuje `derives from D-04@b703ab2a`; nowe zdania wiążące D-04 zmieniają ten odcisk, więc wpis D-03 idzie za nimi (WAY-31).
- D-06/2 „How are the browser and server built together?”: “The browser and server share one npm package and lockfile, and have separate TypeScript compilation configurations and output directories. Building the application compiles both configurations.”
- D-07/1 „How is the work of the game split between the server and the browser?”: “The server computes nothing of the game.”
- `browser-view-framework/1`: “The browser view uses TypeScript and browser APIs to render its screens, with no UI framework in its code or runtime dependencies.”
- `application-build-output/1`: “Building the application compiles both the browser and the server TypeScript configurations.”
- `application-package-layout/1`: “The browser and server use a single shared npm package and lockfile, with no separate application package for either side.”
- `application-build-layout/1`: “The browser and server have distinct TypeScript compilation configurations and output directories.”
- Pojęcie `program`: “A program is the written behaviour by which a character acts, made of ordered program rules and holding a trip plan.” — zadanie urzeczywistnia część o uporządkowanych regułach programu; plan wyprawy wnosi zadanie 13.

Wpisy projektowane definicji `definicja_mvp_loop2.md` (§ Projected foundation changes); przydział według planu, zadanie 3.

Zadanie zapisuje:

- „(new) — What is the game built with?” — zadanie zapisuje część jeszcze nieobecną w D-04/2: “The game is written in TypeScript and runs in the browser. Its simulation is a set of pure functions that take a game state and a span of game minutes and return the next game state together with the events it produced, and real time enters the simulation only as an argument. The browser view draws the game only from the game state, and changes the game state only through functions of the simulation, to which it passes the player's choices and the passing of real time.” — ostatnie zdanie w brzmieniu zatwierdzonym przy ponownej kontroli gotowości definicji 2026-10-13 (pytanie o „widok” w „Questions to settle”).
- „(new) — Where does the game's content live?”: “The game's content — maps, items, creatures, character skills and their numbers — stands in data files. A map, an item or a creature of a kind the simulation already handles is added by a change of data alone.”
- `map-run-repeatability/1`: “Two simulations of one program from one starting game state with one seed give the same map run, game minute by game minute, when they receive the same real-time inputs.”
- `simulation-randomness/1`: “No file of the simulation draws a random number from any source other than the generator seeded from the map run's state.” — które pliki są plikami symulacji, ustala cykl (Questions carried to cycle).
- Pojęcie `program rule`: “A program rule is a pair of a condition and an action that a program holds.”
- Pojęcie `map run`: “A map run is one attempt of one character at one map, from entering it until a completion, the character's death or the player stopping it.”
- Pojęcie `game minute`: “A game minute is the unit of the simulation's time.”

Zadanie urzeczywistnia część, a zapisuje inne zadanie:

- „(new) — Where does the simulation's randomness come from?” — zapisuje zadanie 18; zadanie 3 czyni prawdziwym: “Every random draw of the simulation comes from generators seeded by the seed saved in the map run's state, one generator for each kind of draw — attacks, gathering, the map's layout and wandering among them — and the map run draws its map's layout at its start, before the first game minute, in a fixed order. A restart of a map run keeps its seed, any other map run outside an earning loop takes a new seed” — z rodzajów losowania układ mapy i wędrówkę; napaści, zbiór i ziarno przejść pętli zarobkowej wnoszą zadania 4, 8 i 18.
- „(new) — How does a character act by its program?” — zapisuje zadanie 5; zadanie 3 czyni prawdziwym: “A character acts only by its program: in each free game minute it carries out the first program rule whose condition holds and whose action can be carried out then […]. Conditions are chosen from a closed list, never written as expressions […], and the player has no way to carry out an action by hand.” — grupy reguł wnosi zadanie 5, wybór sztuki przedmiotu przez symulację zadanie 4.
- „(new) — What is a map made of?” — zapisuje zadanie 8; zadanie 3 czyni prawdziwym: “A map is a grid of hexagonal tiles whose dimensions, entrance — fixed, or drawn by the map run —, cost of a move, […] and resources stand in the map's data, each resource with its density, stock per tile and time to renew one piece […]. What is not on the map's list of resources cannot be gathered or revealed there. Which tile gets what is drawn by the map run from its seed, within the bounds the map sets.” — stałe wejście i odsłanianie; napadające stworzenia i wejście losowane wnosi zadanie 8, zbieranie zadanie 4.
- „(new) — How does a character move?” — zapisuje zadanie 4; zadanie 3 czyni prawdziwym: “A move onto a neighbouring tile is an ordinary action, after which the program picks a program rule anew, as after any action. Exploring reveals the tile the character stands on, cannot be repeated on a revealed tile and brings no item” — część o zbieraniu wnosi zadanie 4.
- „(new) — How does a program point at things of the world?” — zapisuje zadanie 4; zadanie 3 czyni prawdziwym: “A program points at a thing of the world only as the nearest known one of its kind, counted in game minutes of walking, never by a number of its own.” — część o ognisku wnosi zadanie 4.

## Settlements to record

Candidates: 13 shown, 4 accepted — 2026-10-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Rysunek siatki w panelu terenu jest obrazem, nie sterowaniem: jedyną interakcją jest najechanie, które łączy kafelek z jego wierszem w liście, a liczby zapasów stoją w liście, nie na rysunku. | decision | odpowiedź pod pytaniem „Co pokazuje panel terenu?”; punkt 7 „To do”; `koncepcja_projektowa.md` §5 | czy kliknięcie kafelka coś robi i czy zapasy pisać na kafelkach — także w zadaniach 4 i 8, które dokładają do rysunku ognisko i stworzenia |
| 2 | Restart to nowe przejście tej samej postaci na tej samej mapie, które gracz uruchamia w miejsce przejścia w toku. | glossary term | odpowiedź pod pytaniem „Jak gracz uruchamia restart przejścia i nowe przejście?” („od minuty zero”); wobec pojęcia projektowanego `map run` przejście zastąpione restartem kończy się zatrzymaniem przez gracza (Mariusz, 2026-10-13) | czy restart cofa to samo przejście, czy zaczyna nowe — od tego zależy, czy liczniki zadziałań z zadania 5 zerują się przy restarcie |
| 3 | Trwającej akcji nie przerywa ani zmiana programu, ani warunek innej reguły: program wybiera regułę dopiero po jej skończeniu. | decision | odpowiedź pod pytaniem „Gdzie i kiedy gracz zmienia program…?” („po skończeniu trwającej akcji”); wobec D18 koncepcji („Napaść przerywa bieżącą akcję”): napaści na razie nie ma, więc wiersz jej nie wymienia, a przerwanie akcji napaścią zostaje zadaniu 8 (Mariusz, 2026-10-13) | czy zmiana programu albo spełniony warunek innej reguły przerywa trwającą akcję, na przykład 20-minutową eksplorację |
| 4 | Ręczne przejście płynie minutą gry na sekundę realną, a gracz może je zatrzymać i wznowić. | decision | odpowiedź pod pytaniem „Jak płynie czas przejścia…?” | tempo podstawowe, które przewijanie w zadaniu 7 mnoży, i czy przejście da się wstrzymać bez kończenia |

## Out of scope

- Zapis stanu gry: przeładowanie strony zaczyna od nowa, z pustym programem i bez przejścia; zapis stanu wprowadza zadanie 16.
