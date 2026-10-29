# Spec — Las — głębiej: napaści wilka i walka według programu

- Task: `.runs/task-cycles/walka-w-glebi-lasu/task.md`
- Open choice: wspólna postać reguł stworzenia i postaci, stan starcia i jego miejsce w minucie gry, wybór reguły w turze, odkrycie stworzenia i kolejność komunikatów.

## Intent

Las — głębiej sprawdza program wobec przeciwnika, a rozwiązanie Lasu otwiera do niego dostęp. Ta specyfikacja ustala połączenie walki z istniejącą symulacją, odkrywaniem i widokiem. Mechanika, liczby i wymagane napisy pozostają tymi z zaakceptowanego zadania.

## Goals and non-goals

Projekt zapewnia jedną gramatykę warunku i akcji dla reguł postaci oraz danych stworzenia, powtarzalne napaści niezależne od losowań ruchu i zbioru, pięć pełnych minut starcia z rozstrzygnięciem w ostatniej oraz widoczny zapis ostatniego starcia. Obejmuje odblokowanie drugiej mapy i łączne sprawdzanie passy oraz pokonanych napaści.

Nie dodaje energii natury, Płomyka, wprawy, przełączania programów, planu wyprawy, wypłat, leczenia, zużywania broni, animowanych tur, rysunku wilka ani historii wielu starć. Nie ustala minimalnej skuteczności programu na mapie i nie poprawia jej przez zmianę przyjętych liczb.

## Constraints

- Obowiązuje całe zamrożone zadanie, w szczególności To do 1–10, Q8 o pomiarze na 20 ziarnach, Q19 o domknięciu podczas starcia i Q20 o turze jako wymianie dwóch akcji. Opis zależności zadania 7 jest historyczny: kod i D-129–D-136 już dostarczają passę, domknięcie, rozwiązane mapy oraz reset przy rzeczywistej zmianie programu.
- D-04 zachowuje czyste funkcje, jawny czas i stan. Tura nie dodaje jednostki czasu. Stan wymagany przez widok pochodzi z symulacji, a nazwy i liczby treści z danych (D-18).
- D-22 i niezmienniki `map-run-repeatability`, `simulation-randomness`, `map-run-layout` oraz `minute-span-split` obejmują nowy stan i zdarzenia walki. Samodzielne losowanie napaści nie zależy od tego, czy zwykła czynność właśnie się skończyła.
- Program postaci pozostaje uporządkowanymi grupami reguł, z istniejącym repertuarem i licznikami (D-23, D-90, D-92, D-119, D-126, D-127). Zmiana programu podczas oczekiwania na rozstrzygnięcie działa w turach ostatniej minuty, nie przerywa ani nie przedłuża starcia i zeruje passę oraz pokonane napaści zgodnie z zadaniem.
- Obecny podział `minuteBeforePick` / `advanceMinutes` oddziela skutki minuty od odkrycia i wyboru reguły; rozwiązanie zachowuje tę odpowiedzialność, rozszerzając ją o walkę. Nie wolno ukryć napaści za obecnym warunkiem `stepped.picks`.
- Widok korzysta z obecnych ról `discovery`, `text`, `positive` oraz wspólnych kontrolek. Nie wymaga nowych tokenów, zasobów graficznych, usług ani bibliotek.

## Decisions

### 1. Reguła stworzenia i punkt widzenia strony

Dane stworzenia trzymają uporządkowaną listę par z tymi samymi typami warunku i akcji, z których zbudowana jest para w regule programu postaci. Tożsamość reguły, jej grupa i licznik należą do programu gracza; stworzenie ich nie otrzymuje. Obsługiwany tu program stworzenia potrzebuje warunków „Zawsze” i własnego zdrowia oraz akcji uderzenia i odskoku. Nie powstaje osobny język reguł ani parser tekstu programu wilka.

Wybór i sprawdzanie warunku dostają jawny punkt widzenia wykonawcy: własne bieżące zdrowie i zdrowie przeciwnika. „Zdrowie poniżej” porównuje zdrowie działającej strony, a „Przeciwnik ma poniżej” zdrowie strony przeciwnej. Liczby są punktami zdrowia, nie procentem maksymalnego zdrowia: wilk z 6/24 spełnia próg 8. Poza starciem własne zdrowie nadal jest dostępne, a warunek o przeciwniku jest fałszywy, bo przeciwnika nie ma. Warunki zwykłego świata w programie postaci zachowują znaczenie także w starciu; ograniczenie dotyczy wykonalnych akcji.

Każda strona wybiera regułę bezpośrednio przed swoją akcją. Wilk działa pierwszy; postać wybiera już po skutku jego akcji. Śmierć strony natychmiast kończy rozstrzyganie, więc postać zabita pierwszym ciosem nie wykonuje odpowiedzi, a zabity wilk nie dostaje następnej akcji. Postać korzysta z tego samego uporządkowanego przejścia po grupach i regułach oraz z tego samego filtrowania repertuaru co poza walką. Stworzenie korzysta z uporządkowanej listy swoich par i tego samego znaczenia wspólnych warunków. Nie korzysta ze Zrozumienia gracza.

„Uderz — patyk” pozostaje jedną pozycją akcji z ustalonym przez dane wymaganiem patyka, zgodnie z istniejącymi pozycjami „Zapal — patyk” i „Zjedz — jagoda”. Nie powstaje wybór ekwipunku ani cel wskazujący konkretny egzemplarz. Cios stworzenia używa jego własnych danych. Identyfikator stworzenia wybiera wiersz danych, nie gałąź algorytmu. Akcje walki nie wchodzą do harmonogramu zwykłych czynności jako czynności o czasie zero; każda zaczęta akcja postaci daje jedno zadziałanie swojej reguły, także odskok.

Odrzucono osobny zestaw warunków wilka: kosztowałby drugie znaczenie zdrowia i drugi sposób opisywania reguły. Odrzucono pełny program z grupami, repertuarem i identyfikatorami dla stworzenia: zadanie wymaga par, a taki stan nie daje wilkowi potrzebnego zachowania. Kosztem wspólnej pary jest jawny kontekst wykonawcy i rozdzielenie wykonalności akcji postaci od akcji stworzenia; pomylenie kontekstu zmienia strategię wilka.

### 2. Jednostki symulacji i przechowywany stan

Podział odpowiedzialności jest następujący; nazwy plików pomocniczych i funkcji wybiera autor zmiany.

| Jednostka | Wejście i wynik | Odpowiedzialność i zależności |
|---|---|---|
| Dane stworzeń i walki | Definicja stworzenia, pary reguł, liczby, teksty prezentacji | Dostarczają treść. Wymagane przedmioty i skutki akcji postaci stoją w danych akcji/przedmiotów/balansu, w zgodzie z obecnym podziałem danych. |
| Wybór reguły | Stan dostępny warunkom, kontekst walki lub zwykłego świata, program i repertuar → pierwsza wykonalna reguła albo brak | Zachowuje priorytet grup i reguł; nie losuje, nie zmienia stanu ani liczników. |
| Napaść | Stan przejścia, definicja mapy i zapisany generator → brak napaści albo zaczęte starcie z nowym stanem generatora | Obsługuje szansę i karencję; czyta wiersz napadającego stworzenia z mapy, nie program postaci. |
| Rozstrzygnięcie starcia | Stan postaci w ostatniej minucie, definicja stworzenia i aktualny program ograniczony repertuarem → zdrowie, wynik, uporządkowane akcje i zadziałania reguł | Wykonuje najwyżej 40 wymian, bez upływu czasu i bez losowań. Nie liczy świata ani domknięcia mapy. |
| Przebieg minuty | Stan gry i jedna minuta → nowy stan i zdarzenia w ustalonej kolejności | Łączy ciało, świat, starcie, odkrycia, domknięcie i następny wybór. Zachowuje istniejący publiczny sposób przekazywania czasu. |
| Prezentacja starcia | Stan ostatniego starcia i dane treści → tekst pod wierszem stanu | Formatuje zapis; nie rozgrywa tur ani nie dopisuje wyniku. |

Przejście przechowuje aktywne starcie z identyfikatorem stworzenia, minutą napaści M i minutą rozstrzygnięcia M+5. Przechowuje też generator napaści, początek bieżącej karencji i licznik pokonanych napaści. Ostatnie starcie ma odrębny od aktywności zapis: dane napaści, a po rozstrzygnięciu wynik i uporządkowane zdarzenia każdej wykonanej akcji. Zapis przechowuje fakty potrzebne do opisania skutku, w tym obrażenia i zdrowie po ciosie, a nie sformatowany polski akapit. Brak akcji postaci w wymianie jest jawny w przebiegu; nie udaje zadziałania reguły.

Stan tur, w tym osłona następnego ciosu, jest lokalny dla atomowego rozstrzygnięcia. Nie zapisuje się niedokończonej tury między minutami. Przerwana zwykła czynność przestaje być czynnością do wykonania; jej skutek nie może wylądować później, a cel przerwanego kroku przestaje być rysowany. Autor dobiera typ reprezentujący brak bieżącej zwykłej czynności w aktywnym starciu, zamiast pozostawić ją pod pozorem wciąż wykonywanej.

Restart tworzy nowy stan przejścia: brak starcia i jego zapisu, zero pokonanych napaści, początek karencji w minucie zero i generator odtworzony z tego samego ziarna. Zrozumienie oraz rozwiązane mapy pozostają własnością gry. Edycja programu pozostawia zapis ostatniego starcia, aktywne starcie, karencję i generator; resetuje oba wymagane liczniki tylko wtedy, gdy istniejący mechanizm uznaje program za zmieniony w trwającym przejściu.

Odrzucono walkę jako zwykłą pięciominutową regułę programu: napaść nie jest regułą gracza i nie powinna nabić jej licznika. Odrzucono odtwarzanie przebiegu w widoku: wymagałoby ponownego uruchomienia walki i mogłoby użyć później zmienionego programu. Wybrany stan kosztuje jeden ograniczony zapis ostatniego starcia, najwyżej 40 wymian; jego błędne kopiowanie narusza powtarzalność i niezmienność argumentów.

### 3. Losowania i dokładna granica karencji

Napaści mają własny strumień generatora zasiany ziarnem przejścia, z nową stałą rozdzielającą go od istniejących strumieni. Istniejące stałe strumieni nie zmieniają się. Przy obecnej mapie z jednym napastnikiem następuje jeden rzut w każdej kwalifikującej się minucie; szansa jest spełniona przy wyniku mniejszym od 0,01. W zwykłych minutach sprawdzenie następuje także w trakcie długiej czynności. Nie wykonuje się rzutu podczas karencji, aktywnego starcia, po śmierci ani po domknięciu. Las nie ma napastnika i nie zużywa tego strumienia.

Karencja chroni całe minuty 1–180 włącznie; pierwszy rzut może przypaść w minucie 181. Po zakończeniu starcia w E chroni E+1–E+180, a pierwszy rzut może przypaść w E+181. To autonomiczne doprecyzowanie orkiestratora, zapisane w `reports/03-design-answers.md`, nie nowa decyzja człowieka o balansie. Test granicy ma obejmować obie strony 180/181 i E+180/E+181. Dwa różne programy na tym samym ziarnie spotykają pierwszą napaść w tej samej minucie, o ile oba przejścia do niej trwają.

Losowane wejście wybiera jeden kafelek z całej siatki jednym rzutem strumienia układu, po obecnym losowaniu zasobów i uzupełnieniach brakujących rodzajów. Wybór korzysta z porządku kafelków wierszami. Stałe wejście nie pobiera rzutu, dzięki czemu Las zachowuje swój układ dla istniejących ziaren.

Odrzucono rzut przy samym końcu czynności: program wpływałby na czas pierwszej napaści. Odrzucono wspólny strumień z ruchem albo zbiorem: inne decyzje programu przesuwałyby napaści. Odrzucono pierwszy rzut w minucie 180: przyjęta interpretacja chroni 180 całych minut. Koszt zmiany tej interpretacji później to przesunięcie harmonogramów napaści zapisanych ziaren. Obsługa kilku jednocześnie napadających stworzeń nie jest osobnym wymaganiem tego zadania.

### 4. Kolejność minuty i reguła po walce

Zwykła minuta zachowuje kolejność: ciało i passa; śmierć od potrzeb; palenie i odnawianie świata; skutek czynności kończącej się w tej minucie i związane z nim odkrycia; sprawdzenie domknięcia; kwalifikujący się rzut napaści; zwykły wybór reguły, jeżeli czynność się skończyła i napaści nie było. Odkrycie może wystąpić zarówno przy ciele, przy skutku czynności, jak i przy napaści. Cała minuta kończy się przed pauzą, a jej odkrycia stanowią jeden wynik.

Napaść w M zastępuje ewentualny nowy wybór reguły, przerywa jeszcze trwającą czynność i zaczyna starcie. Ciało i zwykły świat tej minuty już wykonały swój krok. Pierwsza tura nie wykonuje się w M.

| Minuta | Ciało, passa i świat | Dalszy skutek |
|---|---|---|
| M+1…M+4 | Ciało stoi; passa rośnie o jeden; ognie tracą minutę, kafelki odnawiają się | Sprawdzenie domknięcia. Gdy spełnione, przejście kończy się w tej minucie; starcie nie ma tur ani wyniku i nie zwiększa pokonanych napaści. |
| M+5 | Ten sam krok, nadal bez zmiany potrzeb i samoczynnej regeneracji zdrowia | Wszystkie tury aktualnym programem; natychmiastowe zakończenie przy śmierci postaci albo stworzenia; wynik i reset karencji; przy żywej postaci sprawdzenie domknięcia; jeśli przejście trwa, wybór i start następnej zwykłej czynności. |
| M+6 | Jeżeli przejście nadal trwa, zwykły krok ciała, passy i świata | Nowa zwykła czynność podlega zwykłemu harmonogramowi, zaczętemu w M+5. |

W M+5 pokonana napaść zwiększa licznik przed sprawdzeniem domknięcia. Śmierć w walce ma pierwszeństwo przed domknięciem, także gdy passa właśnie osiągnęła 540. Rany i śmierć od walki nie zerują same z siebie passy; minuty starcia nie powodują strat od potrzeb. Nie następuje drugi krok świata, drugi przyrost passy ani nowy rzut napaści po turach tej samej minuty.

Zdarzenia w M+5 odtwarzają kolejność akcji, zakończenie starcia, ewentualną śmierć lub domknięcie i dopiero potem ewentualny start zwykłej czynności. Każde zadziałanie reguły postaci jest policzone raz, niezależnie od tego, czy autor zachowa dotychczasowy rodzaj zdarzenia startu, czy wprowadzi jawne zdarzenie akcji walki. Każda publiczna droga przesuwająca pełne minuty ma zachować tę kolejność; pomocnik kończący się przed wyborem nie może być prezentowany jako pełne przesunięcie gry.

`free game minute` obejmuje zakończenie starcia, gdy przejście trwa i może zacząć zwykłą czynność. Wymiana akcji w turze nie jest osobną wolną minutą: `program-rule-pick` obejmuje ją jako drugi, jawnie nazwany moment wyboru. Minuty oczekiwania na rozstrzygnięcie i sama napaść nie wykonują zwykłego wyboru.

Odrzucono domknięcie M+5 przed turami, bo zgubiłoby pokonaną wtedy napaść i ominęło przyjętą kolejność Q19. Odrzucono czekanie z następną zwykłą regułą do M+6: tworzyłoby dodatkową pustą minutę poza pięciominutowym kosztem. Kosztem przyjętej kolejności jest osobna gałąź pełnej minuty starcia oraz doprecyzowanie kilku wpisów fundamentu, które dziś mówią wyłącznie o zwykłych czynnościach.

### 5. Odskok i kontrolne rachunki walki

Postać po odskoku ma jedną oczekującą redukcję 5 obrażeń następnego zadającego obrażenia ciosu przeciwnika. Kolejny odskok ją odświeża, nie dodaje następnej. Cios zużywa tę redukcję; obrażenia nie spadają poniżej zera. Odskok stworzenia nie przyznaje mu ochrony i nie zużywa oczekującej ochrony postaci. Koniec starcia usuwa osłonę. To autonomiczne doprecyzowanie orkiestratora z `reports/03-design-answers.md`; odrzucone gromadzenie ochrony tworzyłoby dodatkowy zasób, którego zadanie nie opisuje. Test musi odróżniać odświeżenie od gromadzenia oraz odskok stworzenia od ciosu.

Kontrolne wyniki wyprowadzone z zaakceptowanych liczb, dla pełnego zdrowia 100 i niezmiennego programu od początku tur: same uderzenia patykiem pokonują wilka w czwartej wymianie po trzech ugryzieniach, pozostawiając 79 zdrowia; same kopnięcia pokonują go w ósmej wymianie po sześciu ugryzieniach, pozostawiając 58; brak wykonalnej reguły walki kończy się śmiercią przy piętnastym ugryzieniu; same odskoki pozwalają wilkowi odejść po 40 wymianach, pozostawiając 15 zdrowia (pierwszy cios 7, następne 39 po 2). Te rachunki chronią kolejność stron, ścisły próg zdrowia wilka, znaczenie wymiany i liczników; nie są wymogiem grywalności całej mapy.

### 6. Odkrycie i wspólny wynik minuty

Rodzaj zdarzenia odsłaniającego otrzymuje napaść z identyfikatorem stworzenia. Dane każdej odsłanianej akcji, warunku i stworzenia wskazują to zdarzenie przy tej rzeczy. Zrozumienie zyskuje osobną listę identyfikatorów odkrytych stworzeń; stworzenie nie jest przedmiotem plecaka. Ten zapis jest wspólny dla wszystkich postaci, trwa po restartach i śmierci, a repertuar nadal wylicza się ze Zrozumienia i predyspozycji. Odkrycie stworzenia nie tworzy nowej listy sterującej zachowaniem postaci ani przycisku ręcznej walki.

Po pierwszej napaści do jednego wyniku odkrycia trafiają wilk, trzy akcje i dwa warunki z zadania. Jeżeli w tej samej minucie skutek zakończonej czynności odkrył inne rzeczy, wynik zawiera także je, bez duplikatów, w obecnym porządku katalogów. Stan Zrozumienia i programu po wcześniejszych odkryciach minuty pozostaje widoczny przy późniejszych krokach tej minuty. Napaść nie dopisuje reguły. Późniejsze napaści znanego stworzenia same z siebie nie zatrzymują czasu.

Odrzucono specjalną flagę „pierwszy wilk” poza Zrozumieniem: dublowałaby wspólną wiedzę i wiązała silnik z nazwą stworzenia. Odrzucono traktowanie wilka jako przedmiotu: mieszałoby odkrycie przeciwnika z zasobami i plecakiem. Kosztem nowej listy jest aktualizacja tworzenia, łączenia, sprawdzania pustego odkrycia i prezentacji Zrozumienia we wszystkich istniejących użytkownikach jego typu.

### 7. Widok oraz dostęp do drugiej mapy

W kolumnie przejścia kolejność jest stała: wiersz stanu, linia odkrycia jeśli istnieje, linia ostatniego starcia jeśli istnieje, wiersz ciała i plecaka, teren. Linia starcia jest zwykłym zawijanym akapitem w roli `text`; akcje są opisane po kolei i zakończone wynikiem. Przed rozstrzygnięciem pokazuje napaść, początkowe zdrowie i program stworzenia, czytane z jego danych. Przedstawiony program jest formatowany z tych samych par, których używa walka, z nazwami z danych; nie jest drugim ręcznie zapisanym programem.

W minutach M+1…M+5 czynność w stanie widocznym brzmi jak wymaga zadanie. W M+5 zwykła następna czynność może już być zaplanowana, lecz napis starcia ma w tej minucie pierwszeństwo przed jej napisem; służy temu minuta rozstrzygnięcia ostatniego starcia. Napis śmierci albo domknięcia ma pierwszeństwo przed napisem walki. Napaść M może od razu pokazać trwające starcie, zamiast opisywać przerwaną czynność jako nadal wykonywaną.

„Wznów” usuwa linię odkrycia, pozostawiając linię starcia. Kolejna napaść zastępuje zapis poprzedniej. Na zamrożonym ekranie śmierci lub domknięcia zapis pozostaje widoczny; w przypadku domknięcia przed turami zachowuje sam opis napaści i programu, bez wymyślonego zwycięstwa, porażki ani odejścia. „Restart” i „Zakończ” usuwają go razem ze starym przejściem. To wykonuje szczególny przypadek Q19 i umożliwia przeczytanie rozstrzygnięcia po śmierci.

Warunek rozwiązania pozostaje obiektem wymagań nazwanych rodzajem: passa, pokonane napaści, osobno albo razem; obecne pola sprawdza się łącznie. Teksty interfejsu pokazują wymagania obecne w danych, więc mapa prosząca o samą liczbę napaści nie wyświetla nieistniejącego celu passy. Nie dodaje się mapy testowej do treści produktu.

Opcjonalna mapa otwierająca stoi w danych mapy. Jedno czyste sprawdzenie dostępności, zależne od rozwiązanych map gry, obsługuje zarówno listę siedziby, jak i odmowę wysłania przez symulację. Widok nie pokazuje zamkniętej mapy. Przy dostosowaniu `sendMaps` trzeba uwzględnić także obecne użycie przez edytor do ustalenia zasobów poza przejściem; jego listy zachowują dotychczasowe reguły repertuaru. Otworzenie mapy jest wspólne dla wszystkich postaci i nie tworzy drugiego zapisu odblokowanych map obok `solvedMaps`.

Odrzucono linię walki nad odkryciem: zmieniałaby stałe miejsce informacji wyjaśniającej pauzę. Odrzucono ukrycie wyniku wraz ze śmiercią: odbierałoby graczowi wymagany przebieg starcia. Odrzucono sam filtr w siedzibie: symulacja dopuszczałaby mapę, której warunek dostępu nie został spełniony. Wybrany układ kosztuje miejsce na długi, zawijany tekst; nie zamienia się go w nowy ekran lub historię.

### 8. Pomiar na 20 ziarnach i dowód mechaniki

Jednorazowy pomiar obejmuje dokładnie ziarna przejścia 1–20. Każde zaczyna się w minucie zero ze standardowym ciałem i pustym plecakiem, na rzeczywistych danych Lasu — głębiej. Przygotowanie jawnie zapewnia wiedzę dostępną po odkryciach Lasu i pierwszym wilku oraz otwarty Las — głębiej; nie daje przedmiotów, zdrowia ponad start, dodatkowych umiejętności ani późniejszych czarów. To pomiar ustalonego programu, nie test drogi samouczka do pierwszego wilka.

Program pomiaru jest ten sam na wszystkich ziarnach i pozostaje niezmieniony w przejściu: pierwsza grupa pod „Zawsze” zawiera kolejno „Zawsze → Uderz — patyk”, „Zawsze → Kopnij”; druga grupa pod „Zawsze” zachowuje 17 reguł programu `ACCEPTANCE_PROGRAM` z `tests/sim/acceptance.test.mjs` w bazowym commicie `7a633a7ab44868427c9c824948b99d4400a631ca`, w ich kolejności i z ich progami. Jest to istniejący program utrzymujący jedzenie i ogień, rozszerzony o dwa wykonalne sposoby zadania obrażeń. Autor raportu wypisuje pełny faktycznie użyty program, obie grupy i wszystkie progi, oraz jawne przygotowanie wiedzy.

Każde ziarno kończy pomiar przy domknięciu, śmierci albo osiągnięciu minuty 5000, zależnie od tego, co nastąpi pierwsze. Jeżeli mimo przygotowanej wiedzy wystąpi nowe odkrycie, pomiar rejestruje je i wznawia bez edycji programu. Limit 5000 jest granicą jednorazowego pomiaru, nie zasadą gry. Osiągnięcie limitu oznacza „nierozstrzygnięte w limicie”, nie śmierć i nie dowód niemożliwości rozwiązania. Raport podaje liczbę domknięć z 20 oraz dla każdego ziarna wynik, minutę, passę i liczbę pokonanych napaści. Nie zmienia przyjętych liczb ani nie dopisuje minimalnego wyniku do stałych testów. Nowa strategia wymaga osobno opisanego pomiaru; nie zastępuje po cichu tej próby.

Stałe testy chronią mechanikę i granice wynikające z zadania: powtarzalność i dzielenie czasu, odrębność strumieni, karencję, skutek czynności w minucie napaści i utratę czynności dłuższej, pięć minut świata przy stojącym ciele, aktualny program i liczniki w turach, oba rodzaje domknięcia podczas starcia, śmierć, limit wymian, odskok, odkrycia oraz reset postępu. Przykłady liczb walki z sekcji 5 są niezależnymi rachunkami oczekiwań. Kontrola przeglądarkowa obejmuje otwarcie mapy, pierwszą napaść z edycją i wznowieniem, zapis po turach, oba ekrany końca oraz zachowanie przycisków i fokusu; ręczny model dokumentu nie zastępuje tego dowodu. Pełny `npm test` i przegląd mutacyjny pozostają obowiązkami dalszych etapów, a nie dowodem wykonanym przez projektanta.

## Foundation entries

Wpisy poniżej nazywają znaczenie, nie proponują gotowego brzmienia fundamentu. Ich sformułowanie i kontrola należą do kroku zapisu fundamentu oraz kroku powrotu; obowiązuje zastrzeżenie Q15 o obecnym MVP i języku kandydatów.

| Rodzaj / wpis | Znaczenie zmiany |
|---|---|
| decision — D-24, „What is a game map made of?” | Wykonać przydzielony wpis projektowany o wejściu stałym lub losowanym, stworzeniach napadających i zasobach mapy, w zakresie uczynionym prawdziwym przez zadania 3, 4 i 8. |
| decision — D-136, warunek rozwiązania i otwieranie map | Rozszerzyć istniejącą decyzję o pokonane napaści, łączenie wymagań, mapę otwierającą i zachowanie passy przy ranach walki; części o przełączaniu programów i planie wyprawy pozostają przypisane zadaniom 12 i 13. |
| decision — nowa, przebieg walki | Zapisać przydzielony wpis projektowany o wymianie akcji, pierwszeństwie napastnika, stałym koszcie czasu, danych programu stworzenia i przerwaniu czynności. |
| decision — D-20, przerwanie czynności | Dodać napaść jako przyczynę utraty wykonywanej czynności, zachowując zasadę nieprzerywania jej przez edycję programu. |
| decision — D-23, wybór reguły | Objąć wybór reguły postaci w każdej jej akcji wymiany przy zachowaniu grup, repertuaru i istniejącego znaczenia liczników. |
| decision — D-58, chłodzenie ciała | Ograniczyć zwykłą regułę chłodzenia do minut poza starciem, zachowując temperaturę otoczenia w danych mapy i jej dotychczasowy wpływ na tempo chłodzenia. |
| decision — D-60 i D-61, zdrowie i śmierć | Ograniczyć zwykły krok potrzeb i samoczynną regenerację do minut poza starciem oraz uwzględnić śmierć z przyczyną walki. |
| decision — D-71, kolejność minuty | Ująć napaść po kończącym się skutku i sprawdzeniu domknięcia, stojące ciało w minutach starcia oraz tury, wynik i kolejny wybór w ostatniej minucie. |
| decision — kandydaci zadania 1, 3, 7, 8 | Zapisać stałe minuty oczekiwania, miejsce napaści, karencję od startu i końca starcia oraz rozstrzygnięcie i limit wymian, z doprecyzowaną granicą karencji. |
| decision — kandydat zadania 2 / D-131 | Ująć reset pokonanych napaści przez tę samą rzeczywistą zmianę programu, która zeruje passę, przy zachowaniu napaści po stracie zdrowia od potrzeb. |
| decision — kandydaci zadania 4, 5, 6 i 12 | Ująć pierwsze odkrycie walki, obecne akcje i umiejętności, osłonę pojedynczego ciosu oraz obecny brak zużycia broni i opatrywania. |
| decision — D-118, D-128 oraz odkrycie napaści | Ująć stworzenie w wiedzy gracza i zdarzenie napaści w danych odsłanianych rzeczy; wpis D-121 o łańcuchu Lasu zachowuje dotychczasowe zachowanie. |
| decision — D-122 oraz kandydaci zadania 9–11 | Ująć kolejność linii odkrycia i starcia, ostatni zapis na ekranie końca, brak wilka na rysunku i widoczność mapy po rozwiązaniu otwierającej. |
| decision — D-133 i D-132 | Dostosować opis stanu do obecnych wymagań mapy, pokonanych napaści i napisu po domknięciu drugiej mapy. |
| invariant — `action-in-progress` | Ująć napaść jako wyjątek od pełnego czasu trwającej czynności, zgodnie z zaakceptowanym kandydatem 13. |
| invariant — `program-rule-pick` | Objąć wybór reguły w akcji postaci każdej wymiany oraz zwykłe wolne minuty. |
| glossary term — `free game minute` | Objąć minutę końca starcia, gdy przejście trwa i zaczyna zwykłą czynność. |
| glossary term — pokonana napaść i tura | Zapisać zaakceptowane znaczenia kandydatów 14 i 15, z końcem starcia przy śmierci przed odpowiedzią drugiej strony. |
| glossary term — `Understanding` | Ująć odkryte stworzenia obok dotychczasowych akcji, przedmiotów i warunków. |

`minute-span-split`, `map-run-repeatability`, `map-run-layout`, `streak-program-change` i pozostałe przywołane niezmienniki zachowują znaczenie; ich ochrona ma obejmować nowe przypadki. D-22 już dopuszcza strumienie według rodzaju losowania; nie zapisuje się przedwcześnie pełnego wpisu projektowanego przydzielonego zadaniu 18. Nowe pliki pozostają w obecnych częściach `simulation` i `browser-view` objętych wzorcami mapy części; nie ma nowej granicy zaufania, zależności między częściami ani faktu środowiska.

## Left to the maker

Autor wybiera nazwy typów, funkcji i pomocniczych plików, dokładny układ pól zwykłej aktywności i starcia, sposób współdzielenia uporządkowanego wyboru reguły oraz granicę między modułami przy zachowaniu odpowiedzialności i kolejności powyżej. Dobiera zapis zdarzeń i połączenie ich z licznikami tak, aby pojedynczy start liczył się raz, a zapis przebiegu pozostał w stanie.

Autor dobiera polskie sformułowania tych elementów przebiegu, których zadanie nie podaje dosłownie, oraz istniejące tokeny odstępów i zawijanie akapitu. Wymagane napisy, role i kolejność linii są ustalone. Wybiera najmniejsze testy chroniące wymienione ryzyka i wykonuje jawny pomiar zgodnie z sekcją 8. Nowe pytanie zmieniające zachowanie wraca do orkiestratora zamiast stawać się założeniem kodu.
