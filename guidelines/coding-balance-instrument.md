# Coding guidelines — balance-instrument

- **Discipline:** coding
- **Applies to:** balance-tools

## When to read

Przed dodaniem lub zmianą pliku kodu przyrządu balansu w `balance/`. Pliki JSON
nakładek i opisów graczy w `balance/overlays/` i `balance/players/` są danymi,
które przyrząd czyta, i do rodzaju nie należą. Czytaj również ogólne wytyczne
kodowania.

## Files of this kind

| File                       | Status   | Decision |
| -------------------------- | -------- | -------- |
| `balance/engine.mjs`       | exemplar | D-437    |
| `balance/campaign.mjs`     | copy     | —        |
| `balance/check-map.mjs`    | copy     | —        |
| `balance/cli.mjs`          | copy     | —        |
| `balance/describe.mjs`     | copy     | —        |
| `balance/loop.mjs`         | copy     | —        |
| `balance/overlay.mjs`      | copy     | —        |
| `balance/trace.mjs`        | copy     | —        |

## Rules

### Przejście mapy jak w grze

- **Decision:** D-427
- **Invariant:** instrument-game-agreement
- **Good:** Tryb pomiaru przeprowadza przejście mapy funkcjami zbudowanej gry, na przykład `newMapRun` i `stepMinute`, `send` i `advanceMinutes` albo `catchUp`.
- **Bad:** Tryb liczy przebieg albo koniec przejścia własnymi regułami zamiast funkcjami gry.

Przejście mapy z jednego ziarna kończy się w przyrządzie tak samo jak w grze, bo
przyrząd uruchamia zbudowaną symulację i kroczy przejście jej własnymi
funkcjami; reguł gry nie liczy po swojemu.

### Importy przyrządu

- **Decision:** D-351
- **Invariant:** cross-part-imports
- **Good:** Plik przyrządu importuje pliki przyrządu i zbudowaną symulację.
- **Bad:** Plik przyrządu importuje plik widoku, serwera albo budowania.

Plik przyrządu importuje tylko pliki przyrządu i pliki symulacji. Pliku żadnej
innej części nie importuje.

### Programy wzorcowe

- **Decision:** D-427
- **Invariant:** none
- **Good:** Tryb bierze program wzorcowy z `tests/sim/reference-programs.mjs`.
- **Bad:** Tryb zapisuje program wzorcowy w swoim pliku albo czyta go z pliku danych na dysku.

Programy wzorcowe przyrząd czyta z `tests/sim/reference-programs.mjs` i nie
trzyma własnej kopii żadnego.

### Liczba gry

- **Decision:** none
- **Invariant:** none
- **Good:** Tryb bierze liczbę gry ze zbudowanej gry.
- **Bad:** Tryb wpisuje na sztywno liczbę, która stoi w danych gry.

Przyrząd nie trzyma własnej kopii liczby gry, tylko bierze ją ze zbudowanej
gry. Liczba gry to liczba, która stoi w plikach danych gry (D-18) albo którą daje
funkcja gry. Liczba potrzebna tylko pomiarowi, jak ziarna, godziny odczytu,
krok przejścia ręcznego albo dni raportu, i przelicznik jednostek, jak
milisekundy w minucie, liczbą gry nie są i przyrząd może je trzymać. Powód:
przyrząd z własną kopią liczby gry mierzy inną grę niż ta, w którą gra gracz, gdy
liczba w danych gry się zmieni, a liczba w kodzie nie mówi, czy jest liczbą gry,
czy parametrem pomiaru, więc porównuje z nią zmianę recenzent.

### Jedno miejsce wspólnej rzeczy

- **Decision:** none
- **Invariant:** none
- **Good:** Nowy tryb importuje funkcję średniej z pliku, który ją udostępnia.
- **Bad:** Nowy tryb pisze własną funkcję średniej o tej samej treści co ta, która już stoi w innym pliku.

Liczba i funkcja pomocnicza przyrządu stoi w jednym pliku, a inne pliki biorą ją
stamtąd. Reguła obejmuje kopie tej samej rzeczy: stałą o tej samej wartości
i tym samym znaczeniu, funkcję o tej samej treści, wyrażenie, które nazywa to
samo. Fragmentów podobnych, które różnią się tym, co biorą, jak dwa zaokrąglenia
do różnej liczby miejsc, nie obejmuje. Rzecz stoi w pliku, który pliki jej
potrzebujące już importują, żeby nie powstał cykl importów. Powód: kopia
zmieniona w jednym miejscu rozjeżdża dwa tryby pomiaru, które dla tego samego
przejścia dają wtedy różne wyniki.

### Zapis plików

- **Decision:** D-429
- **Invariant:** balance-instrument-file-writes
- **Good:** Tryb oddaje wynik jako dane, a plik zapisuje wiersz poleceń, pod ścieżką z flagi.
- **Bad:** Tryb sam zakłada katalog albo zapisuje plik wyniku.

Wynik pomiaru przyrząd wypisuje albo zapisuje do pliku, który nazywa flaga
polecenia. Plik zapisuje i katalog zakłada tylko wiersz poleceń,
`balance/cli.mjs`. Test nie łapie polecenia dopisanego w samym `balance/cli.mjs`,
które zapisze wynik pod stałą ścieżką w repozytorium; ten przypadek zostaje
testom w `tests/balance/cli.test.mjs` i recenzentowi każdej zmiany tego pliku.

### Zegar i losowość

- **Decision:** none
- **Invariant:** balance-instrument-repeatability
- **Good:** Tryb liczy czas od stałej chwili, a losowość bierze z generatorów gry zasilonych ziarnem pomiaru.
- **Bad:** Tryb czyta zegar systemowy albo losuje przez `Math.random`.

Przyrząd nie czyta zegara systemowego i nie losuje ze źródła innego niż ziarno
pomiaru. Powód: pomiar, który zależy od zegara albo od losowości spoza ziarna,
nie powtarza się z tymi samymi flagami i ziarnami, więc nie wiadomo, czy zmiana
wyniku pochodzi od zmiany gry. Test nie łapie generatora napisanego od zera,
zegara ani losowości sięgniętych nazwą złożoną dopiero w trakcie działania albo
przez obiekt podany z zewnątrz pliku (`Date` albo `Math` wzięte jako argument),
ani metody, która czyta bieżącą chwilę, a żadna z jego postaci jej nie nazywa;
te przypadki pilnuje recenzent.

## Examples

### Jawne wejście i wynik jako dane

`balance/engine.mjs` przyjmuje wejście jawnie, jako obiekt z mapą, programem,
ziarnem, umiejętnościami i skrzynią, a wynik przejścia oddaje jako dane: jak
przejście się skończyło, w której minucie, z jakiej przyczyny i co pokazało po
drodze. Funkcje silnika oddają nowe wartości i nie zmieniają przekazanych.

### Odmowa nieznanego identyfikatora

Silnik odmawia identyfikatora, którego dane gry nie mają, błędem, który nazywa
brak, na przykład mapę albo umiejętność z nazwy. Testy w `tests/balance/`
sprawdzają to funkcja po funkcji; żaden test nie sprawdzi odmowy na pliku, którego
jeszcze nie ma, więc nowy plik odmawia sam.

### Tryb zbudowany na silniku

`balance/check-map.mjs` pokazuje kształt trybu pomiaru: stałe pomiaru, jak
ziarna przeglądu i godziny pętli, są nazwane i eksportowane, pomiar wiersza
(`measureRow`) stoi osobno od układania tabeli (`renderTable`), a plik sam nie
kroczy gry i niczego nie zapisuje. Tryb, który mierzy przez `runOnce` albo
`sweep`, nie potrzebuje własnego pułapu minut przejścia: bierze wartość domyślną
silnika.

### Odmowa wiersza poleceń

`balance/cli.mjs` odmawia tego, co człowiek wpisał źle, zdaniem dla niego,
błędem `UsageError` bez śladu stosu; każdy inny błąd wychodzi jako błąd kodu.
Polecenia oddają to, co ma być wypisane, i listę plików do zapisania, a zapisuje
je jedna funkcja, `main`.

### Komentarz na początku pliku

Każdy plik przyrządu zaczyna się komentarzem, który mówi, czym plik jest i na
czym stoi, a przy pliku, który ma odpowiadać grze, wskazuje niezmiennik.
Komentarz opisuje plik, więc test sprawdziłby samo jego istnienie, nie treść.

### Punkt uruchomienia

`balance/cli.mjs` jest też punktem uruchomienia przyrządu. Jego wiersz w tabeli
plików rodzaju nie wyznacza wzorca punktów uruchomienia, którego wybór D-28
odkłada.

## Where in code

- `balance/`
- `balance/engine.mjs`
- `tests/sim/reference-programs.mjs`
- `tests/invariants/test_balance_instrument_file_writes.py`
- `tests/invariants/test_balance_instrument_repeatability.py`
- `tests/invariants/balance_source_scan.py`
