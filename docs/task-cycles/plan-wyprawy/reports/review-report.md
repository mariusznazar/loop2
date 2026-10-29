FAIL c39e10ca539ee79048d6989f1287582119751c8c

# Niezależny przegląd całej zmiany — Plan wyprawy

Zakres: `dce297060aeec3154e50593ee400c28b98649435..c39e10ca539ee79048d6989f1287582119751c8c`, gałąź `task/plan-wyprawy`, katalog `C:/Storage/repos/loop2-wt/plan-wyprawy`. HEAD zgadza się z przekazaniem. Jeden commit autora, 36 plików, +1422/-46. Recenzent nie tworzył tej zmiany. Droga jednego autora, bez specyfikacji, planu ani wycinków. Nie czytałem cycle.md.

Wynik: **1 blokująca uwaga Important, 1 Minor, 3 pozycje poza zakresem (Declined to judge)**. Brak uwag Critical i pytań produktowych. Bieżąca implementacja przechodzi sprawdzone scenariusze. Blokuje rzeczywista luka w ochronie wymaganego zachowania, potwierdzona mutacją, dla której D-94 i przewodnik testowania wymagają asercji.

## Important — w zakresie zadania

### I1. Test poprawnego planu pomija minimalną dozwoloną liczbę 1

Nowy wątek. Miejsce: [tests/sim/trip.test.mjs:409](https://github.com/mariusznazar/loop2/blob/c39e10ca539ee79048d6989f1287582119751c8c/tests/sim/trip.test.mjs#L409), sprawdzany kod: [programs.ts:207](https://github.com/mariusznazar/loop2/blob/c39e10ca539ee79048d6989f1287582119751c8c/src/browser/sim/programs.ts#L207). Pochodzenie: zmiana jednego autora, commit `c39e10ca539ee79048d6989f1287582119751c8c`; brak wycinków.

**Do wklejenia:** Dodaj sprawdzenie, że poprawny plan przyjmuje pozycję z liczbą `1`, najlepiej przez operację edycji programu, którą uruchamia dodanie przedmiotu. Mutacja `count < 1` na `count <= 1` w walidacji przechodzi obecne testy, choć odrzuca każdą nową pozycję dodawaną przez interfejs z domyślną liczbą `1`.

**Dlaczego:** To do 3 i D-181 wymagają liczby całkowitej od 1 oraz dodawania z liczbą 1. W teście poprawnym są tylko `1e12` i `3`; liczba `1` występuje w zestawach, które mają zostać odrzucone z innych powodów (duplikat, ognisko, nieznany przedmiot). Stryker, mutant **53**, zmienił dolną granicę na `<= 1` i przeżył wszystkie przypisane testy symulacji. Przeszukanie testów planu i wywołań walidacji poza symulacją nie pokazało sprawdzenia sukcesu tego przypadku; test widoku sprawdza poprawne wartości 12 i 1000000000 oraz inne plany z liczbami większymi od 1. Usterka po takiej regresji byłaby widoczna przy pierwszym kliknięciu „Dodaj przedmiot”: widok buduje pozycję z 1, a symulacja jej odmawia. Obecny kod jest poprawny i kliknięcie działało podczas ręcznej kontroli; uwaga dotyczy obowiązkowego domknięcia wykrytej luki, a nie twierdzenia, że obecnie interfejs odmawia. Wystarczy asercja na zachowanie przy dolnej granicy, bez utrwalania diagnostycznego tekstu wyjątku. D-94 i guidelines/testing.md wymagają asercji dla rzeczywistej luki w wymaganym zachowaniu.

## Minor — w zakresie zadania

### M1. D-183 nazywa odrzuconą alternatywę nieznaną, choć źródło ją podaje

Nowy wątek. Miejsce: [foundations/decisions.md:3244](https://github.com/mariusznazar/loop2/blob/c39e10ca539ee79048d6989f1287582119751c8c/foundations/decisions.md#L3244). Źródło: [zamrożone zadanie, Q6:58](../task.md#L58).

**Do wklejenia:** Zastąp `Rejected: unknown` w D-183 odrzuconym wariantem z Q6: oddawaniem do skrzynki wniesionych przedmiotów przy „Zakończ” przed domknięciem. Źródło nazywa ten wariant darmowym cofnięciem pobrania oraz wyjątkiem dla zadań 14 i 18.

**Dlaczego:** Wiążąca reguła D-183 wiernie przenosi ustalenie i odpowiada kodowi. Nieznane nie jest jednak to, co odrzucono: Q6 podaje wariant B i jego koszt. Pozostawienie `unknown` gubi powód odrzucenia powrotu wyposażenia; przyszły autor może ponownie proponować rozwiązanie już rozważone. Nie zmienia to bieżącej reguły ani działania gry, dlatego Minor.

## Pokrycie zadania i kryteriów

Źródłem wymagań był cały zamrożony task.md, łącznie z pytaniami i odpowiedziami, zakresem, wpisami projektowanymi i jedenastoma ustaleniami. Nie zastępowałem go raportem autora. Nie ma osobnego zestawu kryteriów akceptacji wykraczającego poza te wymagania.

| To do | Ocena | Dowód i granica oceny |
|---|---|---|
| 1. Dwie uporządkowane listy w programie i kopii, nowe puste | Spełnione | Typy Program/TripPlan, emptyProgram, walidacja i kopiowanie; test nowych programów. |
| 2. Edytor pod grupami, wspólne kontrolki, zapisany program i kopia, kolejność | Spełnione | createTripEditor w createProgramEditor, kontekst panelu; kliknięcia dodawania i przeniesienia wiersza, kontrola fokusu, edycja kopii i ekranu domknięcia. Ekranu po śmierci nie renderowałem osobno: ta sama ścieżka panelu pozostaje dostępna. |
| 3. Odkryte przedmioty, bez ogniska, unikatowość listy, liczby i błędny wpis | Kod spełnia; ochrona testami niepełna — I1 | Repertuar i kolejność ITEMS, niezależność list, filtrowanie zajętych pozycji; zero pozostało w polu z komunikatem, a w stanie została wcześniejsza 1. Dodawanie kolejno stick/berry/moss/fiber i disabled po wyczerpaniu. Brak odkryć sprawdzony na rzeczywistym createGameView. |
| 4. Wyślij/Restart, obecny zapas, częściowe pobranie, od minuty 0 | Spełnione | takeTrip przed newMapRun i pierwszą akcją, osobna kopia bringPlan; testy kolejności, braków, restartu z niezapisanej kopii, pierwszej akcji i pełnego plecaka. |
| 5. Odłożenie migawki raz, straty przy końcu bez domknięcia i rzeczy niewymienionych | Spełnione | tripLoot i pojedyncze przejście do completion, guard stanu terminalnego; testy powtórnego advance/end, restartu, śmierci, ograniczeń i kolejnego przejścia. |
| 6. Niezależne limity map, zero, bez limitów w mapach MVP, zapowiedź | Spełnione | Opcjonalne pola danych, brak ustawionych limitów map gry; testy granic i zbierania z carryIn=0; zapowiedź liczona z planu i udźwigu bez zapasu, widoczna w HQ i przy Restart. |
| 7. Skrzynka 60 łącznie i nagłówek | Spełnione | BALANCE.chestCapacity=60, budżet wyjścia odejmuje sumę skrzynki; rzeczywisty nowy widok „Skrzynka 0/60” i „Skrzynka jest pusta.”, fixture „22/60”. |
| 8. Zmiana programu nie zmienia migawki | Spełnione | bringPlan należy do przejścia, switchProgram go nie podmienia; test przełączenia wraz z ręcznym przejściem rozwiązanej mapy. |
| 9. Zapis, nowy program, porzucenie, konflikt, postęp | Spełnione | Walidacja/sameData obejmują plan; reset postępu porównuje grupy i liczniki identyfikatorów, pomijając plan. Testy save/saveAs/discard/conflict i izolacji zapisanej edycji, zachowanie streak/defeatedAttacks/ruleCounts. |
| 10. Faktyczne odłożenie i zapowiedź z migawki | Spełnione | tripTexts, testy dokładnych tekstów, pustej/mienionej migawki i ukrycia po śmierci/domknięciu; ręcznie „Wyniesie: patyk 1” mimo edycji kopii na 7, następnie „Do skrzynki: patyk 1.” nad ciałem i bez preview. Kolejność względem discovery/combat potwierdzona w składaniu game-view, nie osobnym zrzutem z oboma komunikatami. |

Wymaganie „brak górnego limitu” znaczy brak narzuconego limitu rozgrywki, nie obsługę liczb większych niż reprezentuje JavaScript. Nie zmieniono publicznego modelu liczb ani nie dodano arbitralnego maksimum.

## Wierność fundamentu — osobno od działania kodu

| Ustalenie do zapisania | Zapis i ocena |
|---|---|
| 1. Miejsce i skład edytora | D-180, wierne. |
| 2. Unikatowość, minimum 1, błędny wpis | D-181, wierne; kod zgodny, luka I1. |
| 3. Puste nowe plany | D-182, wierne. |
| 4. Zakończ/Restart i pozostałości | D-183, wiążące zdanie wierne; utrata odrzuconej alternatywy M1. |
| 5. Zachowanie passy i napaści | D-131 i D-136, wyjątek zmiany samego planu oraz porzucenia uwzględniony. |
| 6. Nagłówek skrzynki | D-184, wierne. |
| 7. Linia faktycznego odłożenia | D-185, wierne. |
| 8. Zapowiedź, warunki widoczności, rola | D-186, wierne. |
| 9. Dwa pułapy map, bez ustawienia na MVP | D-187, wierne. |
| 10. Warunek i położenie zapowiedzi przycięcia | D-188, wierne. |
| 11. Przejściowo każde wejście pobiera i każde domknięcie odkłada | D-189, wierne; zmiana świadomie nie wprowadza wyjątku przypisanego zadaniu 14. |

Sprawdzone wpisy projektowane: D-179 zachowuje pełny wymagany kontrakt dwóch list i jego przyszłe zastrzeżenie dotyczące ręcznej rozwiązanej mapy; D-189 mówi też o obowiązującym teraz stanie przejściowym. D-50 zmienia skrzynkę na wspólną pojemność przedmiotów, D-90 używa „holds” dla listy grup, D-136 zawiera wymagany wyjątek samego planu. D-190 zapisuje tylko część o niesionych przedmiotach i nietkniętej skrzynce, którą ten kod realizuje. Pojęcie trip plan wiernie przeniesione, istniejący program już go uwzględniał. Nie dopisano mechanizmu zapisu gry ani wersji nieistniejącego formatu.

Nowe niezmienniki trip-transfer, trip-run-end, trip-plan-progress mają uprawnione źródła w zadaniu i zapisanych decyzjach; nie są wyprowadzone wyłącznie z nowego testu. D-93 otrzymuje odsyłacz do ochrony liczników. Mapa części obejmuje nowe pliki istniejącymi regułami.

Zmienione testy niezmienników: program_fixture.py (wspólny poprawny program), test_program_closed_lists.py, test_program_rule_pick.py i test_program_world_reference.py. Dodanie tripPlan do starych danych wynika z wymaganego nowego pola. Wyjątek skanera odwołań do świata ograniczono do liczbowego count w pozycji dwóch konkretnych list; nie otwiera dowolnego miejsca programu na arbitralne liczby. Wrogie przykłady nadal sprawdzają odrzucenie. Zmiana selektorów w status-row testach wynika z nowej zapowiedzi w wierszu; nie usuwa sprawdzenia działania przycisków.

## Sprawdzenie własnej pracy autora

Najbardziej ryzykowną częścią jest pomylenie limitów na granicach przejścia z pojemnością plecaka w jego trakcie oraz rozliczenie tej samej minuty, która domyka mapę. Test autora z carryIn=0 pozwala realnej akcji zebrać 3 sztuki, następnie przy carryOut=1 odkłada 1. Oczekiwania są zapisane liczbowo z wymagania; nie pochodzą z tripLoot. To trafny test słabego miejsca i zepsucie ograniczenia zbierania lub pominięcie ostatniej minuty powinno go złamać. Test pierwszej akcji i zamrożonych wejściowych danych dodatkowo osłania kolejność i brak mutowania wejścia. Ta ocena nie zastępuje I1.

## Sprawdzenia recenzenta

Wszystkie komendy wykonano w katalogu tego worktree. Odczyty git potwierdziły zakres i czyste drzewo. `git -C .the-way rev-parse HEAD` i `git ls-files --stage -- .the-way`: exit 0, oba wskazują `a8dfe8ac62885e88bc8f463e93ab16b621d48e92`.

| Komenda | Exit i wynik |
|---|---|
| `git rev-parse HEAD`; `git log dce297060aeec3154e50593ee400c28b98649435..c39e10ca539ee79048d6989f1287582119751c8c`; `git diff --stat` / `--numstat` / pełny diff tego samego zakresu | 0; potwierdzony jeden commit i 36 plików. |
| `npm test -- tests/sim/trip.test.mjs tests/view/trip.test.mjs` | 1; błąd wywołania recenzenta: runner przyjmuje dokładnie jeden plik. Testy nie ruszyły. |
| `npm test -- tests/sim/trip.test.mjs` | 0; build i 13/13 testów. |
| `npm test -- tests/view/trip.test.mjs` | 0; build i 4/4 testy. |
| `git status --short` po sprawdzeniach | 0, bez wpisów. Produkt, indeks i gałąź niezmienione. |

Pełne `npm test`, niezależna pełna bramka jakości i ponowne foundation_check nie zostały uruchomione przez recenzenta: zgodnie z przekazaniem końcowy komplet wykonuje orkiestrator po przeglądzie. Nie oznaczam tych kontroli jako zaliczonych. Odczytałem raport autora i jego poprawkę, w tym rozróżnienie brakującego samodzielnego exit formatowania od późniejszego pełnego quality5/5. Nie traktuję wcześniejszej bramki nakładającej się na pracę autora jako wyniku tego HEAD.

### Mutacje

Dokładna komenda (exit **0**):

```text
node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/trip.ts,src/browser/sim/game.ts:130-155,src/browser/sim/game.ts:518-541,src/browser/sim/programs.ts:196-214,src/browser/sim/programs.ts:249-254,src/browser/sim/programs.ts:304-304,src/browser/sim/programs.ts:550-555,src/browser/sim/run.ts:305-305,src/browser/sim/run.ts:317-317,src/browser/sim/understanding.ts:328-328,src/browser/sim/data/balance.ts:3-3,src/browser/sim/data/maps.ts:33-38,src/browser/sim/types.ts:65-78,src/browser/sim/types.ts:272-279,src/browser/sim/types.ts:291-292" > .runs/task-cycles/plan-wyprawy/reports/reviewer-mutation.log 2>&1
```

Lokalna przypięta wersja, bez dodatku kontroli typów; zmienione miejsca istniejących modułów oraz cały nowy trip.ts. 8 plików instrumentowanych, 114 mutantów, 104 zabite, 8 ocalałych, 2 bez pokrycia, 0 timeoutów i 0 błędów. Wstępny przebieg 28 jednostek plikowych TAP udany. Wynik per plik z mutantami: game.ts 29 zabitych; programs.ts 34 zabite/7 ocalałych/2 bez pokrycia; run.ts 1 zabity; trip.ts 40 zabitych/1 ocalały. Zmiany typów i spreadu oraz liczby w danych nie wygenerowały osobnych mutantów w raporcie; nie twierdzę, że narzędzie zbadało mutację każdego takiego wyrażenia. Domyślne testy Pythona i widoku nie uczestniczą w tym przebiegu.

Dowody: [log](reviewer-mutation.log), [pełny JSON](reviewer-mutation.json).

| ID | Miejsce i status | Klasyfikacja i powód |
|---|---|---|
| 32 | programs.ts:197, guard Array.isArray → false, Survived | Równoważna dla danych programu: niebędąca tablicą wartość JSON nadal odmawia przez brak działającego map; kontrakt nie wymaga konkretnego tekstu ani miejsca wyjątku. Obiekt z własną funkcją map nie jest reprezentacją danych programu. |
| 34 | programs.ts:197, tekst błędu → pusty, Survived | Zachowanie niewarte utrwalania: diagnostyczny tekst nie jest kontraktem użytkownika; odmowa pozostaje. |
| 38 | programs.ts:200, guard isObject(entry) → false, Survived | Równoważna dla danych programu: null odmawia przy odczycie pola, prymityw nie przechodzi sprawdzania item/count. |
| 40 | programs.ts:200, tekst błędu → pusty, NoCoverage | Zachowanie niewarte utrwalania: szczegół diagnostyki odmowy nie jest wymagany; sam brak pokrycia tego literału nie dowodzi luki odmowy. |
| 48 | programs.ts:205, typeof count guard → false, Survived | Równoważna: Number.isInteger już odmawia wartościom innym niż number. |
| 53 | programs.ts:207, count < 1 → count <= 1, Survived | Rzeczywista luka wymaganego zachowania: odmawia poprawnej 1, I1. |
| 56 | programs.ts:209, tekst błędu → pusty, Survived | Zachowanie niewarte utrwalania: diagnostyka, odmowa nadal zachodzi. |
| 61 | programs.ts:249, guard isObject(tripPlan) → false, Survived | Równoważna dla danych programu: brak/null odmawia przy odczycie, inne prymitywy i tablice odmawiają przy walidacji wymaganych list. |
| 63 | programs.ts:249, tekst błędu → pusty, NoCoverage | Zachowanie niewarte utrwalania: brak kontraktu dokładnego tekstu diagnostycznego. |
| 111 | trip.ts:84, map.carryIn !== undefined → true, Survived | Równoważna w typowanym kontrakcie MapDef: dla undefined następne porównanie undefined < liczba jest false; dla liczby stary guard był true. |

### Widok i dowody wizualne

Autor nie zachował dostępnych recenzentowi PNG: raport wyjaśnia obrazy oglądane w pamięci. Nie przyjąłem tego jako własnego obejrzenia. Po zwolnieniu przeglądarki autora odtworzyłem widoki w Playwright pod `http://127.0.0.1:8768/trip-inspect.html`; fixture montuje faktyczne komponenty i wywołuje faktyczną symulację, ma jawne odkrycia/zapas/limity testowe. `?real` montuje createGameView bez wstrzykiwania stanu. Serwer fixture jest lokalnym narzędziem dowodowym, nie kodem produktu ani dowodem serwerowego zapisu gry.

Zrzuty oglądałem, następnie skopiowałem do katalogu raportu:

- [Błędna liczba i widoczny fokus](ui-invalid-focus.png): 1280×1000, default, error, disabled strzałki, fokus po Tab; zero pozostaje w polu, stan zachowuje 1.
- [Wyczerpane pozycje i zapowiedź w HQ](ui-exhausted-warning.png): cztery różne pozycje, disabled dodawanie, hover przycisku niszczącego, fokus listy, dokładny komunikat limitu2.
- [Przejście z migawką](ui-frozen-preview.png): plecak2/15, preview patyk1 przy kopii Wynieś patyk7; dirty i przyciski zapisu widoczne.
- [Domknięcie](ui-completion.png): wynik patyk1 nad ciałem, preview ukryte, edytor nadal działa.
- [Domknięcie przy 800 px](ui-completion-800.png): kontrolki zawijają się, pozostają czytelne; nie znalazłem nowego nachodzenia.
- [Rzeczywista nowa gra](ui-real-empty.png): puste obie listy, dodawanie nieczynne, Skrzynka0/60 z dotychczasową linią pustej skrzynki.

Sprawdzony ręcznie fokus po przeniesieniu wiersza na koniec: trafia na select wiersza zamiast wyłączonej strzałki. Ręcznie sprawdziłem także kolejność pierwszych dostępnych przedmiotów i nieobecność ogniska. Zrzuty są dowodem layoutu, odczyt stanu fixture potwierdzał wynik interakcji.

Stany wymagane styleguide: default, hover, visible focus, disabled i error obejrzane na użytych kontrolkach; empty listy/skrzyneczki obejrzany w nowej grze. Osobny pusty wpis liczbowy sprawdzają testy helpera, nie mój screenshot (ręczny screenshot błędu dotyczy zera). Loading nie dotyczy tych synchronicznych operacji; select i number-field mają też wyłączenie loading w styleguide, przyciski planu nie czekają na serwer. Nie renderowałem całej strony kitchen-sink ani osobnego disabled pola liczby; wspólna kontrolka zmienia tylko opcjonalność istniejącego max, nie reguły wyglądu. Nie oglądałem osobnego widoku śmierci, pustego faktycznego odłożenia ani jednoczesnego discovery+combat+deposited — odpowiednie warunki/teksty i kolejność sprawdzają kod oraz testy; te warianty wyglądu pozostają wizualnie niesprawdzone. Konsola fixture przy pierwszym wejściu zgłosiła 1 błąd zasobu; nie ustaliłem jego treści, nie przedstawiam więc konsoli jako czystej. Żaden z wykonanych kroków nie wykazał błędu działania.

## Zakres, źródła i dodatkowe sięgnięcia

Samodzielnie wybrałem fundament po częściach z part_map: simulation, browser-view, build-tools i product-foundation (wpisy opisujące dotknięte części). Przeczytałem całe wybrane decyzje, niezmienniki — również te, które mają dotkniętą część na dalszym miejscu listy — i potrzebne pojęcia. Dodatkowo sprawdziłem powiązania D-21/D-23/D-40/D-141/D-144 wskazane w raporcie autora oraz D-94/D-95 i fakty stryker-simulation-execution/typescript-nocheck-support potrzebne do oceny mutacji.

Przeczytane całe przewodniki: coding.md, coding-content-data.md, coding-simulation-module.md, coding-browser-module.md, testing.md i styleguide-browser-view.md, ponadto src/browser/AGENTS.md. Metody: przypięte review/SKILL.md i whole_change.md, way_of_working.md, product-guidelines/reading.md oraz globalny playbook review. Dla rzeczywistej przeglądarki użyłem skilla playwright-mcp z jego wskazanymi materiałami o gruncie, sesji, odczycie, selektorach, czasie i fałszywych pozytywach. Dla komend pomocniczych odczytałem globalne scripts.md i search.md.

Sięgnięcie poza bezpośredni diff: callers send/restart/advanceMinutes, walidacja/save/switch/discard, first-chill-rule oraz składanie panelu i game-view — potrzebne do sprawdzenia migawki, postępu, pierwszej akcji i pozycji komunikatów. Zakres narzędzi budowania obejmuje stryker.config.json; nie jest to ukryta zmiana procesu wdrożenia. Nie znaleziono nowej granicy sieci, uprawnień, sekretów lub nieodwracalnej operacji; plan i limity są stanem/katalogiem lokalnej gry, bez nowego wejścia zewnętrznego. Nie przeprowadzałem audytu niezwiązanych granic account-server.

## Declined to judge

- Wyjątek rozliczenia ręcznego przejścia rozwiązanej mapy — zadanie jawnie zostawia go zadaniu14 i przyjmuje obecnie pobranie oraz wypłatę; oceniałem zgodność z tym stanem przejściowym, nie implementację przyszłego wyjątku.
- Trwały zapis/wczytanie gry i wersjonowanie formatu — zadanie16, nieobecne w bazie i niewymagane w tym zadaniu; nie wymagałem nowego pipeline ani schematu.
- Pętla zarobkowa i pozostałe konsekwencje śmierci przewidziane dla zadania18 — poza zakresem części D-190 realizowanej teraz; oceniałem niesione przedmioty i nietkniętą skrzynkę.

## Searches not found or unclear

- Nie znaleziono utrwalonych zrzutów autora, co zgadza się z przekazaniem; zastąpione własnymi zrzutami, z wymienionymi wariantami nieobejrzanymi.
- Playwright początkowo odmawiał otwarcia zajętego profilu. Orkiestrator poprosił właściciela sesji o browser_close; po zwolnieniu udało się podłączyć. Nie kończyłem procesów cudzej sesji.
- Nie znaleziono testu sukcesu walidacji/edycji planu przy count1 poza przebiegiem Strykera; pozytywną kontrolą wyszukiwania były istniejące testy planu i wystąpienia count1 w odrzucanych danych. I1 wskazuje znaleziony brak ochrony.
- Nieustalona treść pojedynczego błędu zasobu w konsoli lokalnego fixture; bez stwierdzenia wpływu na obejrzane działanie. Brak innych otwartych pytań wymagających decyzji człowieka.
