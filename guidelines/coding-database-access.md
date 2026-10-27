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
- **Good:** Ponowne otwarcie zachowuje konta i sesje, a błąd inicjalizacji wycofuje całą transakcję.
- **Bad:** Start resetuje istniejącą bazę albo pozostawia część utworzonych tabel po błędzie.

Sprawdź wersję w transakcji inicjalizacji; odmów otwarcia nieobsługiwanej wersji.
Zachowaj istniejące rekordy. Sprawdzaj odmowę na rzeczywistych plikach SQLite.
Kontrola tej warstwy nie dowodzi startu aplikacji ani trwałości wolumenu kontenera.

## Examples

### Własność połączenia

`AccountDatabase` zamyka połączenie po błędzie otwarcia i przy `close`.
Przekazany zegar pozwala sprawdzić wygaśnięcie bez oczekiwania na rzeczywisty czas.
Przygotowane zapytania wiążą wartości kont i sesji jako parametry.
Sprzątanie wykonuje ograniczoną porcję pracy; jego zegar nie utrzymuje procesu
przy życiu, a zamknięcie usuwa go. Obsługa HTTP nie przejmuje transakcji.

## Where in code

- `src/server/`
- `src/server/database.ts`
- `tests/account-storage.test.mjs`
