# Coding guidelines — database-access

- **Discipline:** coding
- **Applies to:** account-server

## When to read

Przed dodaniem lub zmianą pliku dostępu do bazy danych w części account-server.
Czytaj również ogólne wytyczne kodowania.

## Files of this kind

| File | Status | Decision |
|---|---|---|
| `src/server/database.ts` | exemplar | D-114 |

## Rules

### Otwarcie schematu bez utraty danych

- **Decision:** D-112
- **Invariant:** account-database-schema
- **Good:** Ponowne otwarcie zachowuje konta, sesje i zapisane stany gry, baza w starszej znanej wersji przechodzi na bieżącą w jednej transakcji, a błąd inicjalizacji albo kroku przejścia wycofuje całą transakcję.
- **Bad:** Start resetuje istniejącą bazę, pozostawia część utworzonych tabel po błędzie albo zmienia krok przejścia, który trafił już na serwer testowy.

Sprawdź wersję w transakcji inicjalizacji; odmów otwarcia nieobsługiwanej wersji.
Schemat to uporządkowana lista kroków, po jednym na wersję: nowa baza przechodzi
wszystkie, istniejąca — kroki po swojej wersji, w tej samej transakcji, która na
końcu zapisuje bieżącą wersję. Nowa wersja schematu dokłada jeden krok na końcu
listy; kroku, który trafił już na serwer testowy, nie zmieniaj, bo istnieją bazy
w jego wersji. Krok zachowuje każdy wiersz kont, sesji i zapisanych stanów gry i każdą jego
wartość.
Sprawdzaj przejście na bazie poprzedniej wersji zapisanej w teście jej własnym
schematem, nie kodem produktu, a odmowę i wycofanie — na rzeczywistych plikach
SQLite. Kontrola tej warstwy nie dowodzi startu aplikacji ani trwałości wolumenu
kontenera.

## Examples

### Własność połączenia

`AccountDatabase` zamyka połączenie po błędzie otwarcia i przy `close`.
Przekazany zegar pozwala sprawdzić wygaśnięcie bez oczekiwania na rzeczywisty czas.
Przygotowane zapytania wiążą wartości kont i sesji jako parametry.
Sprzątanie wykonuje ograniczoną porcję pracy; jego zegar nie utrzymuje procesu
przy życiu, a zamknięcie usuwa go. Obsługa HTTP nie przejmuje transakcji.
Polecenie blokady konta otwiera własne `AccountDatabase` obok serwera, wykonuje
jedną operację i je zamyka; samo nie trzyma żadnego SQL.

### Stan konta w instrukcji zapisu

Zapis sesji czyta stan blokady konta w tej samej instrukcji, która wstawia
rekord, więc blokada zatwierdzona przez inne połączenie nie wejdzie między
sprawdzenie a zapis.

## Where in code

- `src/server/`
- `src/server/database.ts`
- `tests/account-storage.test.mjs`
