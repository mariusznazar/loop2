---
title: "loop2: rodzaj kodu i plik-wzorzec dla przyrządu balansu w wytycznych kodowania"
status: draft
created: 2026-11-20T10:49
updated: 2026-11-20
tags: [zadanie]
related: "the author's note of the project"
---

# loop2: rodzaj kodu i plik-wzorzec dla przyrządu balansu w wytycznych kodowania

Status: ready for cycle
Project relation: plan item: plan_projektu_2_loop2.md — wzorzec-kodu-przyrzadu
Defect introduced by: none

## Description

### Need

- Kod przyrządu balansu, osiem plików `.mjs` w `balance/`, nie ma wiersza w tabeli `## Kinds of code` w `guidelines/coding.md` ani pliku-wzorca, więc agent, który dopisuje albo zmienia plik przyrządu, bierze za wzór ten plik, który otworzy pierwszy.
- Cztery rzeczy stoją dziś w kilku plikach przyrządu naraz — pułap 4000 minut gry, wyrażenie nazywające wynik przejścia, funkcja średniej i stała milisekund w minucie — więc zmiana jednej kopii może rozjechać dwa tryby pomiaru, a nowa reguła wytycznych o jednym miejscu takiej rzeczy nie dałaby się wykonać, dopóki kopie stoją.
- W planie na to zadanie czekają zadania 2 (`ocena-programu-na-ziarnach`), 4 (`mechanizm-drabiny`), 5 (`model-czynnosci-i-przedmiotow`) i 24 (`zapas-i-wskrzeszenie`).
- Pliki przyrządu zmieniają zadania 5 i 24; zadanie 2 zmienia miejsce pułapu 4000, jak mówi *Context*; zadanie 4 nie jest jeszcze doprecyzowane.
- Projektowi służy to przez pomiar: każda mapa przed wejściem do gry przechodzi pomiar przyrządem balansu, więc kod przyrządu zmieniają kolejne zadania projektu.

### To do

1. Napisać plik wytycznych rodzaju `balance-instrument`, `guidelines/coding-balance-instrument.md`, według `.the-way/product-guidelines/coding/template.md`, sekcje „Required form of a kind” i „Writing the files”: `Applies to: balance-tools`; `## When to read` z warunkiem „przed dodaniem lub zmianą pliku kodu przyrządu balansu w `balance/`”; tabela `## Files of this kind` z wierszem każdego z ośmiu plików `.mjs` w `balance/`, które git śledzi, bez plików JSON nakładek i opisów graczy (pytanie 5); plik-wzorzec `balance/engine.mjs` ze statusem `exemplar` i decyzją z wiersza 1 tabeli *Settlements to record* (pytanie 1); każdy z siedmiu pozostałych plików ze statusem `copy` (pytanie 3); reguły z punktów 2 i 3; przykłady z punktu 4; `## Where in code` z katalogiem `balance/`.
2. Wpisać w tym pliku reguły, które niosą obowiązujące już decyzje i niezmienniki:
   - przejście mapy z jednego ziarna kończy się w przyrządzie tak samo jak w grze, bo przyrząd uruchamia zbudowaną symulację i kroczy przejście jej własnymi funkcjami (D-427, niezmiennik `instrument-game-agreement`);
   - plik przyrządu nie importuje pliku żadnej części poza symulacją i samym przyrządem (D-351, niezmiennik `cross-part-imports`);
   - programy wzorcowe przyrząd czyta z `tests/sim/reference-programs.mjs` i nie trzyma własnej kopii żadnego (D-427).
3. Wpisać reguły, które to zadanie ustala, każdą z jednym zdaniem powodu:
   - przyrząd nie trzyma własnej kopii liczby gry, tylko bierze ją ze zbudowanej gry; liczba gry to liczba, która stoi w plikach danych gry (D-18) albo którą daje funkcja gry, a liczba potrzebna tylko pomiarowi i przelicznik jednostek, jak milisekundy w minucie, liczbą gry nie są; *Decision* `none`, *Invariant* `none`, bo liczba w kodzie nie mówi, czy jest liczbą gry, czy parametrem pomiaru, więc porównuje z nią zmianę recenzent (pytanie 2, wiersz 2 tabeli ustaleń);
   - liczba i funkcja pomocnicza przyrządu stoi w jednym pliku, a inne pliki biorą ją stamtąd; reguła obejmuje kopie tej samej rzeczy — stałą o tej samej wartości i tym samym znaczeniu, funkcję o tej samej treści, wyrażenie, które nazywa to samo — a nie fragmenty podobne, które różnią się tym, co biorą; *Decision* `none`, *Invariant* `none` (pytanie 3, wiersz 3 tabeli ustaleń);
   - wynik pomiaru przyrząd wypisuje albo zapisuje do pliku, który nazywa flaga polecenia, a plik zapisuje i katalog zakłada tylko wiersz poleceń, `balance/cli.mjs`; *Decision* D-429, *Invariant* — nowy niezmiennik z wiersza 4 tabeli ustaleń (pytanie 4);
   - przyrząd nie czyta zegara systemowego i nie losuje ze źródła innego niż ziarno pomiaru; *Decision* `none`, *Invariant* — nowy niezmiennik z wiersza 5 tabeli ustaleń (pytanie 6).
4. Opisać w `## Examples` to z pliku-wzorca `balance/engine.mjs` i z pozostałych plików, czego reguły nie wiążą: jawne wejście i wynik oddany jako dane na `balance/engine.mjs`; odmowę nieznanego identyfikatora błędem, który nazywa brak; kształt trybu pomiaru zbudowanego na silniku (nazwane stałe pomiaru, pomiar osobno od układania tabeli, bez własnego kroczenia gry) na `balance/check-map.mjs`; odmowę wiersza poleceń zdaniem dla człowieka (`UsageError` w `balance/cli.mjs`); komentarz na początku pliku, który mówi, czym plik jest.
5. Dopisać wiersz rodzaju do tabeli `## Kinds of code` w `guidelines/coding.md`: `balance-instrument`, `guidelines/coding-balance-instrument.md` i warunek czytania z punktu 1.
6. Test każdego z dwóch nowych niezmienników (wiersze 4 i 5 tabeli ustaleń) w zestawie testów produktu, widziany raz jako porażka; plik testu, który nie należy do żadnej części mapy części, dopisany przez `update-part-map` do części `balance-tools`, bo test należy do części, którą sprawdza (`.the-way/elements/part-map/template.md`, „Tests belong to the part they test.”), a te testy czytają kod `balance/`; pole *Verification* decyzji D-429 wymienia niezmiennik z wiersza 4, a jej zdania się nie zmieniają.
7. Usunąć cztery powtórzenia w kodzie `balance/`, tak że każda z tych rzeczy stoi w jednym pliku przyrządu, który ją udostępnia, a pozostałe pliki biorą ją stamtąd: `const DEFAULT_CAP_MINUTES = 4000;` z `balance/engine.mjs`, `balance/trace.mjs` i `balance/campaign.mjs`; wyrażenie `run.completion ? "solved" : run.death ? "death" : "cap"` z tych samych trzech plików; funkcję średniej `meanNumber` z `balance/loop.mjs` i `mean` z `balance/campaign.mjs`; stałą `MS_PER_MINUTE` z `balance/loop.mjs` i `balance/campaign.mjs` (pytanie 3).

### Acceptance criteria

- Wyniki pomiarów przyrządu się nie zmieniają: polecenia `sweep`, `trace`, `loop`, `campaign` i `check-map`, każde co najmniej raz, bez flagi `--cap`, tak że działa pułap domyślny, z tymi samymi flagami i ziarnami, na tej samej zbudowanej grze, dają przed zmianą z punktu 7 i po niej identyczne wyjście; opis prośby o scalenie podaje te polecenia i wynik porównania, a samych wyników nie wnosi do repozytorium (D-429).
- Przejście zakończone na pułapie (wynik `cap`) daje przed zmianą z punktu 7 i po niej to samo wyjście: przy pułapie domyślnym żadne przejście tego nie pokazuje, więc porównanie obejmuje też `sweep` i `trace` z małym `--cap` (na przykład 30), tak że przejścia kończą się na pułapie; gałąź `cap` w `balance/campaign.mjs`, której te polecenia nie dotykają, porównanie obejmuje przez opis gracza spoza repozytorium z małym `capMinutes`, a gdzie tego nie da się zrobić, prośba o scalenie nazywa ją niesprawdzoną. To, że pułap domyślny po zmianie dalej wynosi 4000, pokazuje kod: liczba 4000 stoi w jednym miejscu przyrządu.

### Questions to settle

- Czy kod przyrządu balansu, który nie ma wiersza w tabeli rodzajów kodu ani pliku-wzorca, dostaje je w tym projekcie?
  - Answer: „tak, w osobnym zadaniu przygotowawczym 23, przez porównanie plików przyrządu i wybór wzorca; czekają na nie zadania 2, 4 i 5, a doprecyzowanie może to jeszcze lekko przesunąć”
  - Not chosen:
    - wzorzec kodu przyrządu w zadaniu 4, jak stał w planie przed tą zmianą — „krytyka pokazała, że zadania 2 i 5 zmieniają pliki przyrządu przed zadaniem 4”
  - Source: `plan_projektu_2_loop2.md`, sekcja „Open questions”, pozycja o kodzie przyrządu balansu, „(human, 2026-11-20)”, oraz sekcja „Change log”, wpis z 2026-11-20 „wzorzec kodu przyrządu balansu przechodzi z zadania 4 do nowego zadania przygotowawczego 23 … Mariusz wybrał osobne zadanie”; plik o sha256 f7f8d8fbbf0d03be (pierwsze 16 znaków), brzmienie bez zmian w pliku o sha256 94b740a8feff35d2
- Pytanie 1: który plik przyrządu jest plikiem-wzorcem rodzaju?
  - Answer: `balance/engine.mjs` — silnik: jedno przejście mapy z ziarna, przegląd wielu ziaren i ich podsumowanie; to, czego nowy plik nie może zgubić — prawdziwa gra, jawne ziarno, odmowa błędnego wejścia — stoi w silniku, a kształt trybu pokazuje przykład na `balance/check-map.mjs`, który nie wiąże.
  - Not chosen:
    - `balance/check-map.mjs` — „plik jest mały (141 wierszy) i nie pokazuje ani styku z funkcjami gry, ani odmowy błędnego wejścia; zadanie, które zmienia sam silnik, zostaje bez wzorca”
  - Source: human, 2026-11-20, „ok dla wszystkich dotychczas” — przyjęcie listy wariantów domyślnych, którą prowadzący projekt pokazał według filtra Mariusza (pytania tylko o to, co zmienia grę dla gracza, reszta jako wariant domyślny do weta; „2a - myślałem, że taka jest też Twoja rola”, 2026-11-20); wariant w słowach prowadzącego: „plik-wzorzec `balance/engine.mjs` (Q1 a)”. Drogi niewybrane i ich koszty pochodzą z pytania Q1 w brzmieniu z tury 5 rozmowy doprecyzowania `.runs/project-refinement/wzorzec-kodu-przyrzadu.md`; Mariusz zobaczył wariant domyślny, nie pełne pytanie.
- Pytanie 2: czy zakaz własnej kopii liczby gry w przyrządzie wiąże jako reguła wytycznych rodzaju, czy zostaje przykładem?
  - Answer: zakaz wiąże — przyrząd nie trzyma własnej kopii liczby gry, tylko bierze ją ze zbudowanej gry; reguła stoi w wytycznych przyrządu z jednym zdaniem powodu, fundament nie dostaje nowego wpisu i żadna decyzja się nie zmienia; pilnuje jej recenzent każdej zmiany.
  - Not chosen:
    - przykład, który nic nie wiąże — „dziś nic; agent może wpisać w przyrząd liczbę gry na sztywno, testy przejdą, a po zmianie tej liczby w danych gry przyrząd będzie mierzył inną grę niż ta, w którą gra gracz”
    - dopisanie zakazu do D-18, pokazane jako niezaproponowane — „ta decyzja mówi, gdzie stoi treść gry, a zakaz dotyczy samego kodu przyrządu i może się zmienić bez niej”
    - osobna nowa decyzja, pokazana jako niezaproponowana — „to reguła pisania kodu przyrządu, a droga odwrotna nie ma zalety, którą ktoś mógłby rozsądnie wybrać, bo przyrząd i tak czyta zbudowaną grę”
  - Source: human, 2026-11-20, „ok dla wszystkich dotychczas”, jak przy pytaniu 1; wariant w słowach prowadzącego: „reguła: przyrząd nie trzyma własnej kopii liczby gry (Q2 a)”. Drogi niewybrane z pytania Q2 w brzmieniu z tury 5 tej samej rozmowy.
- Pytanie 3: co zrobić z liczbą i funkcjami pomocniczymi przyrządu, które stoją w kilku plikach naraz — zostawić, oznaczyć pliki z powtórzeniem jako „nie kopiuj”, czy usunąć powtórzenia w tym zadaniu?
  - Answer: reguła „liczba i funkcja pomocnicza przyrządu stoi w jednym pliku, a inne pliki biorą ją stamtąd” i usunięcie czterech dzisiejszych powtórzeń w tym zadaniu, bez zmiany wyników pomiaru; wszystkie pliki poza wzorcem mają status `copy`. Cel wiersza 23 planu poszerzono o tę zmianę kodu.
  - Not chosen:
    - zostawić, bez reguły, wszystkie pliki poza wzorcem `copy` — „dziś nic; następny tryb może wpisać 4000 po raz czwarty, a gdy ktoś zmieni jedną kopię, ślad przejścia i przegląd ziaren mogą dać inny koniec dla tego samego przejścia, które dochodzi do limitu — test porównuje je tylko na swoich ziarnach”
    - reguła bez zmiany kodu, `trace.mjs` i `campaign.mjs` ze statusem `do not copy` — „dwa z ośmiu plików przestają być wzorem także w tym, co mają dobre. Powtórzenia zostają w kodzie i żadne zadanie planu nie ma ich usunąć. Reguły nie da się też od razu wykonać: plik, który sam potrzebuje liczby 4000 albo funkcji średniej, nie ma skąd ich wziąć, dopóki ktoś nie udostępni ich w pliku, który je trzyma”
  - Source: human, 2026-11-20, „ok dla wszystkich dotychczas”, jak przy pytaniu 1; wariant w słowach prowadzącego: „reguła: liczba albo funkcja pomocnicza stoi w jednym pliku, a zadanie usuwa przy tym cztery dzisiejsze powtórzenia, co poszerza cel zadania 23 w planie o małą zmianę kodu (Q3 c)”. Drogi niewybrane z pytania Q3 w brzmieniu z tury 5 tej samej rozmowy. Poszerzony cel: `plan_projektu_2_loop2.md`, sekcja „Tasks”, wiersz 23, i wpis „Change log” z 2026-11-20 „cel zadania 23 mówi też, że cztery rzeczy powtórzone w plikach przyrządu balansu stoją po zmianie w jednym pliku”; plik o sha256 94b740a8feff35d2.
- Pytanie 4: czy reguła „pliki zapisuje tylko wiersz poleceń” dostaje własne automatyczne sprawdzenie (niezmiennik z testem), jak każe WAY-198, czy zostaje bez niego na mocy decyzji produktu, która od tego odstępuje?
  - Answer: nowe automatyczne sprawdzenie — żaden plik kodu w `balance/` poza `cli.mjs` nie zapisuje pliku ani nie zakłada katalogu; jeden nowy niezmiennik, jeden test, który czyta kod plików przyrządu, i dopisek w polu *Verification* D-429, bez zmiany jej zdań. Test nie łapie polecenia dopisanego w samym `cli.mjs`, które zapisze wynik pod stałą ścieżką w repozytorium; ten przypadek zostaje dwóm dzisiejszym testom i recenzentowi.
  - Not chosen:
    - bez nowego testu, jako świadome odstępstwo zapisane decyzją produktu — „dziś nic w kodzie; trzeba podać powód, a ja żadnego mocnego nie widzę, bo wszystkie pliki regułę już spełniają, a test jest tani; nowy plik trybu, który sam zapisze plik wyniku, przejdzie testy i zatrzyma go dopiero uważny recenzent”
  - Source: human, 2026-11-20, „ok dla wszystkich dotychczas”, jak przy pytaniu 1; wariant w słowach prowadzącego: „dwa automatyczne testy — tylko wiersz poleceń przyrządu zapisuje pliki (Q4 b)”. Drogi niewybrane z pytania Q4 w brzmieniu z tury 8 tej samej rozmowy.
- Pytanie 5: jaki identyfikator ma rodzaj i które pliki obejmuje?
  - Answer: jeden rodzaj `balance-instrument` dla ośmiu plików kodu `.mjs` w `balance/`, plik wytycznych `guidelines/coding-balance-instrument.md`; sześć plików JSON nakładek i opisów graczy zostaje poza rodzajem jako dane, które przyrząd czyta.
  - Not chosen:
    - ten sam rodzaj z sześcioma plikami JSON w tabeli plików — „tabela rośnie z każdą nową nakładką, plików JSON nie czytają narzędzia jakości kodu, na których stoją reguły rodzaju, a rodzaj w wytycznych kodowania oznacza kod, nie dane”
    - dwa rodzaje, moduły pomiaru i osobno wiersz poleceń z własnym wzorcem — „drugi plik wytycznych i druga decyzja dla jednego pliku. Plan mówi o jednym rodzaju, więc najpierw zmiana planu. Ten wariant zmienia też decyzję D-28, która dziś odkłada osobny wzorzec dla punktów uruchomienia”
  - Source: human, 2026-11-20, „ok dla wszystkich dotychczas”, jak przy pytaniu 1; wariant w słowach prowadzącego: „rodzaj `balance-instrument` dla ośmiu plików kodu, pliki JSON poza nim (Q5 a)”. Drogi niewybrane z pytania Q5 w brzmieniu z tury 5 tej samej rozmowy.
- Pytanie 6: w jakiej postaci reguła „przyrząd nie czyta zegara systemowego ani nie losuje poza ziarnem” dostaje automatyczne sprawdzenie, jak każe WAY-198 — nowy niezmiennik z testem albo rozszerzenie dwóch niezmienników symulacji na przyrząd — czy zostaje przykładem na mocy decyzji produktu, która od tego odstępuje?
  - Answer: nowe automatyczne sprawdzenie przyrządu — żaden plik kodu w `balance/` nie czyta zegara systemowego ani nie losuje ze źródła innego niż ziarno pomiaru; jeden nowy niezmiennik, jeden test, który czyta kod plików przyrządu tymi samymi wzorcami, jakimi dwa dzisiejsze sprawdzenia czytają kod gry, i reguła w wytycznych przyrządu; żadna decyzja się nie zmienia. Test nie łapie generatora liczb losowych napisanego od zera ani zegara sięgniętego nazwą złożoną dopiero w trakcie działania.
  - Not chosen:
    - przykład, który nic nie wiąże, jako świadome odstępstwo zapisane decyzją produktu — „dziś nic w kodzie; trzeba podać powód, a ja żadnego mocnego nie widzę, bo wszystkie osiem plików cechę już ma, a test jest tani; plik, który sięgnie po zegar albo po losowość spoza ziarna, przejdzie testy, chyba że trafi w jeden z dzisiejszych testów powtarzalności (jest taki dla kampanii gracza), a pomiar przestanie być powtarzalny bez żadnego sygnału”
    - rozszerzenie na przyrząd dwóch sprawdzeń gry, `simulation-randomness` i części o czasie systemowym `simulation-isolation` — „nazwy obu wpisów mówią o symulacji, a będą obejmować też przyrząd; każda późniejsza zmiana któregoś z nich musi pamiętać o obu częściach produktu; wpis o odcięciu wskazują dziś trzy pliki wytycznych kodu gry, więc jego zmiana dotyka też ich reguł”
  - Source: human, 2026-11-20, „ok dla wszystkich dotychczas”, jak przy pytaniu 1; wariant w słowach prowadzącego: „żaden plik przyrządu nie czyta zegara ani nie losuje spoza ziarna pomiaru (Q6 a)”. Drogi niewybrane z pytania Q6 w brzmieniu z tury 8 tej samej rozmowy.

## Context

- Tryb pracy nad wytycznymi: jeden rodzaj, którego pliki produkt już ma (`.the-way/product-guidelines/coding/recognize.md`), więc porównanie plików tego rodzaju bez przebiegu próbnego narzędzi i bez audytu reszty kodu.
- Stan porównania: commit `77a612cb` gałęzi `main`; osiem plików `.mjs` w `balance/`, każdy dodany 2026-11-18, z historią ośmiu commitów tego jednego dnia; przy `ba67f045` żaden plik `balance/` ani `tests/balance/` się nie zmienił.
- Wspólne wszystkim ośmiu plikom: komentarz na początku mówi, czym plik jest; grę czytają z `../dist/browser/sim/`, czyli ze zbudowanej symulacji; żaden nie czyta zegara systemowego ani losowości spoza ziarna.
- Gdzie trafia każda z tych wspólnych cech: czytanie gry ze zbudowanej symulacji niosą reguły punktu 2; brak zegara systemowego i losowości spoza ziarna — reguła z niezmiennikiem z punktu 3; komentarz na początku pliku jest przykładem, bo test sprawdziłby samo istnienie komentarza, a nie to, czy mówi, czym plik jest.
- `balance/engine.mjs` (357 wierszy): silnik — jedno przejście mapy z ziarna, przegląd wielu ziaren i ich podsumowanie. Importuje go pięć z siedmiu pozostałych plików (`campaign.mjs`, `check-map.mjs`, `cli.mjs`, `loop.mjs`, `trace.mjs`). Przejście kroczy funkcjami gry `newMapRun` i `stepMinute`; wejście jest jawne (mapa, program, ziarno, umiejętności, skrzynia), wynik to dane; nieznany identyfikator kończy się błędem, który nazywa brak.
- `balance/check-map.mjs` (141 wierszy): sprawdzenie mapy — tryb zbudowany na silniku i na pętli. Stałe pomiaru są nazwane i eksportowane (`CHECK_SWEEP_SEEDS`, `CHECK_LOOP_SEEDS`, `CHECK_LOOP_HOURS`), pomiar (`measureRow`) stoi osobno od układania tabeli (`renderTable`), plik sam nie kroczy gry i niczego nie zapisuje.
- `balance/loop.mjs` (258 wierszy): pętla zarobkowa przez `startLoop` i `catchUp` gry, z własnymi stałymi czasu i funkcjami średnich; czas liczy od stałej chwili `LOOP_START_MS`, nie z zegara systemowego.
- `balance/trace.mjs` (125 wierszy): ślad jednego przejścia; start bierze z `startOf` silnika, kroki liczy własną pętlą, bo potrzebuje zdarzeń każdej minuty.
- `balance/campaign.mjs` (615 wierszy): kampania gracza przez funkcje gry; jeden zmieniany zapis `ctx` idzie przez kilkanaście funkcji, inaczej niż w silniku, którego funkcje oddają nowe wartości.
- `balance/describe.mjs` (114 wierszy): opis programu słowami gry, z danych; niczego nie mierzy.
- `balance/overlay.mjs` (112 wierszy): nakładka — z założenia zmienia tabele danych gry w pamięci i oddaje funkcję, która je przywraca; czyta plik nakładki.
- `balance/cli.mjs` (529 wierszy): wiersz poleceń — czyta flagi, odmawia zdaniem (`UsageError`), woła tryby; jedyny plik, który zapisuje pliki (funkcja `main`, wywołania `mkdirSync` i `writeFileSync`, około wierszy 502–503), i jedyny punkt uruchomienia. Polecenia stoją w tym samym pliku i oddają do zapisania listę plików, którą zapisuje `main`.
- Miejsca czterech powtórzeń przy `ba67f045`: `DEFAULT_CAP_MINUTES` w `balance/engine.mjs` (około wiersza 31), `balance/trace.mjs` (około wiersza 16) i `balance/campaign.mjs` (około wiersza 61); wyrażenie wyniku w `balance/engine.mjs` (około wiersza 228), `balance/trace.mjs` (około wiersza 121) i `balance/campaign.mjs` (około wiersza 236); `meanNumber` w `balance/loop.mjs` (około wiersza 32) i `mean` w `balance/campaign.mjs` (około wiersza 509), o tej samej treści; `MS_PER_MINUTE` w `balance/loop.mjs` (około wiersza 21, `60 * 1000`) i `balance/campaign.mjs` (około wiersza 59, `60 * MS_PER_SECOND`), o tej samej wartości.
- Żadna z czterech rzeczy nie jest dziś udostępniona innym plikom: `DEFAULT_CAP_MINUTES` w `balance/engine.mjs` oraz `meanNumber` i `MS_PER_MINUTE` w `balance/loop.mjs` nie mają `export`, a wyrażenie wyniku nie jest funkcją. Który plik przyrządu trzyma każdą z nich, wybiera cykl; importy między `engine.mjs`, `loop.mjs`, `campaign.mjs` i `trace.mjs` już dziś istnieją i zostają w części `balance-tools`.
- Tryb zbudowany nad `runOnce` albo `sweep` silnika dostaje pułap 4000 jako wartość domyślną (`capMinutes = DEFAULT_CAP_MINUTES` w `runOnce`) i samej liczby nie potrzebuje; potrzebuje jej plik, który kroczy przejście własną pętlą, jak `balance/trace.mjs`.
- Podobne, ale nie te same fragmenty, których reguła z punktu 3 nie obejmuje i których zadanie nie zmienia: udział w procentach z jednym miejscem po przecinku jako `percent(numerator, denominator)` w `balance/loop.mjs` (około wiersza 25), `shareOf(list, test)` w `balance/campaign.mjs` (około wiersza 518) i wyrażenia w `balance/engine.mjs` (około wierszy 314 i 334); zaokrąglenie do dwóch miejsc w `meanOf` w `balance/engine.mjs` (funkcja, która sumuje po kluczach, około wiersza 277), `perMapRun` w `balance/loop.mjs` (około wiersza 229) i `rounded` w `balance/campaign.mjs` (około wiersza 497). Po punkcie 7 regułę da się wykonać dla kopii tej samej rzeczy; te fragmenty zostają, jak są.
- Testy `tests/balance/agreement.test.mjs` trzymają własne 4000 i własne wyrażenie wyniku z założenia: liczą niezależnie od przyrządu, a testy nie są kodem rodzaju (`.the-way/product-guidelines/coding/template.md`, „A kind is code of the product other than its tests”).
- Stan przypadków, przed którymi stoją nowe reguły, w ośmiu plikach przy `77a612cb`: powtórzenia tej samej rzeczy między plikami — cztery; kopia liczby gry — żadna, bo liczby wpisane w przyrząd to parametry pomiaru (ziarna, godziny, pułap minut przejścia, krok przejścia ręcznego, dni raportu, przeliczniki czasu); plik poza `balance/cli.mjs`, który zapisuje plik — żaden; odczyt zegara systemowego albo `Math.random` — żaden.
- Żaden z ośmiu plików nie łamie reguły, którą produkt trzyma dziś: mieszczą się w progach rozmiaru D-425, żaden nie trzyma kopii programu wzorcowego (D-427) i żaden poza `balance/cli.mjs` nie zapisuje pliku (D-429).
- D-18 („The game's content — game maps, items, creatures, character skills and their numbers — stands in data files.”) ma w *Scope* części `simulation` i `browser-view`, bez `balance-tools`, dlatego zakaz kopii liczby gry w przyrządzie stoi jako reguła wytycznych przyrządu (pytanie 2), a D-18 się nie zmienia.
- D-22 („Every random draw of the simulation comes from generators seeded by the seed saved in the map run's state”) i niezmienniki `simulation-randomness` i `simulation-isolation` obejmują pliki symulacji, nie przyrządu, i zostają, jak są; nowy test z punktu 6 może brać wzorce, którymi `tests/invariants/test_simulation_randomness.py` i `tests/invariants/test_simulation_isolation.py` czytają kod gry.
- Niezmiennik pytania 6 nie wynika z żadnej decyzji produktu: utrwala to, co wszystkie osiem plików robi już dziś, a jak taki wpis wypełnia *Derives from*, mówi `.the-way/elements/invariants/template.md`, sekcja „Links”, akapit, który zaczyna się od „An entry a human chose from what the product already did”. Niezmiennik pytania 4 wynika z D-429.
- WAY-198, decyzja procesu the-way: „what of that exemplar a script can check — where a file of the kind lies, what it calls, how it validates its input — stands in the coding guidelines of that kind as rules, each naming an invariant. The rest of the exemplar stands there as an example and binds no later code.” Szablon wytycznych kodowania, który produkt przyjął decyzją D-28, wiąże produkt, a produkt odstępuje od niego tylko decyzją z podanym powodem (`.the-way/product-guidelines/coding/template.md`, akapit, który zaczyna się od „The rules this template carries bind a product”). Plik-wzorzec `balance/engine.mjs` nie wywołuje ani zegara, ani losowości, ani zapisu pliku, więc reguły pytań 4 i 6 stoją z niezmiennikiem.
- Pułap 4000 a zadanie 2: w doprecyzowaniu zadania 2 Mariusz wybrał pułap minut przejścia zapisany w danych gry, „4000 to start” (`.runs/project-refinement/ocena-programu-na-ziarnach.md`, odpowiedź na pytanie 5 z 2026-11-20; plan, wiersz 2, „po pułapie minut gry zapisanym w danych gry”), a tutaj zakaz kopii liczby gry wiąże (pytanie 2). Zadanie 23 wchodzi wcześniej i zostawia 4000 w jednym pliku przyrządu jako parametr pomiaru; zadanie 2 zastępuje potem to jedno miejsce odczytem liczby gry.
- Odmowa nieznanego identyfikatora zostaje przykładem: testy w `tests/balance/` sprawdzają ją funkcja po funkcji (mapa, umiejętność i gałąź, tabela nakładki, przedmiot skrzyni, program gracza, warunek i czynność opisu), a żaden tani test nie sprawdzi jej na pliku, którego jeszcze nie ma.
- Sześć plików JSON w `balance/overlays/` i `balance/players/` to nakładki i opisy graczy, które przyrząd czyta; ESLint i Prettier ich nie obejmują (wzorce `balance/**/*` dotyczą plików TS i JS); zostają poza rodzajem (pytanie 5), a pilnują ich dzisiejsze testy nakładek i opisów graczy.
- `balance/cli.mjs` jest też punktem uruchomienia, a D-28 odkłada osobny wzorzec punktów uruchomienia; wiersz tego pliku w tabeli rodzaju przyrządu nie wyznacza wzorca punktów uruchomienia.
- Wskazówka `AGENTS.md` do `guidelines/coding.md` już stoi („Before changing product code, including scripts and tests, read `guidelines/coding.md`.”), a `guidelines/**` należy w mapie części do `agent-workflow`, więc zadanie nie zmienia ani pliku instrukcji, ani mapy części poza przypadkiem z punktu 6.
- Polecenia przyrządu i ich flagi opisuje `.claude/skills/loop2-balance/SKILL.md`, sekcje „Commands” i „Flags”; `check-map` dla jednej nakładki trwa około 55 sekund.
- Przy pułapie domyślnym 4000 przejścia dziś do niego nie dochodzą: `sweep` mapy `forest` z programami `forestNaive` i `emptyProgram` na ziarnach 1–4 daje `"capped": 0`, a z `--cap 30` daje `"capped": 4` (przy `ba67f045`); pułap domyślny nie trafia też do nagłówka wyniku, który przy braku flagi podaje `cap: null`.
- Decyzja z wiersza 1 tabeli ustaleń nazywa granicę rodzaju — pliki kodu w `balance/`, bez plików JSON nakładek i opisów graczy — a liczbę plików zostawia tabeli `## Files of this kind`, bo liczba przestaje być prawdą z dziewiątym plikiem; tak samo decyzje o wzorcach D-35 i D-162 nie wymieniają plików.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- D-28 — „Loop2 adopts the coding-guideline templates of its pinned the-way, while deferring separate exemplars for building, deployment, entry points, HTML and CSS; the session, saved-game and mail exemplars were selected with their first implementations (D-115, D-213, D-162), and any deferred existing kind is compared before its exemplar is selected.” Zadanie wybiera wzorzec przez porównanie plików, jak każe to zdanie; brzmienie D-28 się nie zmienia (pytanie 5).
- D-427 — „The reference programs, the programs that the tests of the simulation and the balance instrument run to see how a map is solved, stand in one file of the tests of the simulation, `tests/sim/reference-programs.mjs`, and both read them from it. The balance instrument is the tool of the part `balance-tools` that runs the game's built simulation outside the browser; no test of the simulation and no file of the instrument holds a copy of a reference program of its own.”
- D-429 — „The results of the measurements of the balance instrument do not enter the repository. The instrument prints each result, or writes it to the file that a flag of its command names, and writes no file into the repository of its own accord.” Zmiana: pole *Verification* wymienia nowy niezmiennik z wiersza 4 tabeli ustaleń; zdania decyzji się nie zmieniają (pytanie 4).
- D-351 — „One invariant keeps every import of loop2's code within its part map, and its test counts as a test every file git tracks under `tests/`, helpers and stand-ins included, so that only a file outside `tests/` is kept from importing the part of test helpers.” Mapa części daje `balance-tools` zależność tylko od `simulation`.
- Niezmiennik `instrument-game-agreement` — „A map run of one seed, from one starting game state with one program and the equipment its trip plan takes from the chest, ends in the same game minute, with the same outcome, the same cause of that outcome and the same practice gained, whether it is run through the game's own functions or through the balance instrument of the part `balance-tools`.”
- Niezmiennik `cross-part-imports` — „No file of a part imports a file of another part, unless the *Depends on* of the importing file's part names the other part, the importing file stands under `tests/` and the imported file belongs to the part `test-helpers`, or an invariant "the part `<X>` does not depend on `<Y>`" reading `Violated: yes` says that the part `<X>` of the importing file depends on the part `<Y>` of the imported file today.”
- Plan nie przypisuje temu zadaniu żadnego wpisu z sekcji „Projected foundation changes” definicji projektu.

## Settlements to record

Candidates: 5 shown, 5 accepted — 2026-11-20

| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Plikiem-wzorcem rodzaju `balance-instrument`, który obejmuje osiem plików kodu `.mjs` w `balance/` bez plików JSON nakładek i opisów graczy, jest `balance/engine.mjs`. | decision | *Questions to settle*, pytania 1 i 5 — wybór Mariusza spośród pokazanych dróg | który plik nowy kod przyrządu naśladuje, jaki identyfikator ma rodzaj i plik wytycznych oraz czy pliki JSON wchodzą do tabeli plików |
| 2 | Przyrząd nie trzyma własnej kopii liczby gry, tylko bierze ją ze zbudowanej gry. | guidelines: coding | *Questions to settle*, pytanie 2 — wybór Mariusza spośród pokazanych dróg | czy nowy tryb może wpisać liczbę gry na sztywno, na przykład pułap minut, który zadanie 2 przenosi do danych gry |
| 3 | Liczba i funkcja pomocnicza przyrządu stoi w jednym pliku, a inne pliki biorą ją stamtąd. | guidelines: coding | *Questions to settle*, pytanie 3 — wybór Mariusza spośród pokazanych dróg | czy nowy tryb może zdefiniować własny pułap minut, własną średnią albo własne nazwanie wyniku przejścia, i czy pliki z powtórzeniami mają status `copy` |
| 4 | Żaden plik kodu w `balance/` poza `cli.mjs` nie zapisuje pliku ani nie zakłada katalogu. | invariant | *Questions to settle*, pytanie 4 — wybór Mariusza spośród pokazanych dróg | czy reguła zapisu dostaje test, czy zostaje recenzentowi, i czy nowy tryb może sam zapisać plik wyniku |
| 5 | Żaden plik kodu w `balance/` nie czyta zegara systemowego ani nie losuje ze źródła innego niż ziarno pomiaru. | invariant | *Questions to settle*, pytanie 6 — wybór Mariusza spośród pokazanych dróg | czy powtarzalność pomiaru jest regułą z testem, przykładem, czy rozszerzeniem niezmienników symulacji |

## Out of scope

- Rodzaje i wzorce dla innych plików bez wiersza w tabeli rodzajów: budowania, wdrożenia, punktów uruchomienia, HTML i CSS, które odkłada D-28.
- Testy w `tests/balance/`: ich zasady stoją w `guidelines/testing.md`, a ich własne kopie 4000 i wyrażenia wyniku zostają.
- Fragmenty przyrządu podobne, ale nie te same, wymienione w *Context* (udział w procentach, zaokrąglenia do dwóch miejsc).
- Zastąpienie pułapu 4000 odczytem liczby z danych gry: należy do zadania 2.
