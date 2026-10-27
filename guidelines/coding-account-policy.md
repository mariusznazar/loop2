# Coding guidelines — account-policy

- **Discipline:** coding
- **Applies to:** account-server

## When to read

Przed dodaniem lub zmianą pliku zasad kont w części account-server: sprawdzania
danych logowania i rejestracji albo dopuszczania i liczenia prób.
Czytaj również ogólne wytyczne kodowania.

## Files of this kind

| File | Status | Decision |
|---|---|---|
| `src/server/account-policy.ts` | exemplar | D-114 |

## Rules

### Rezerwacja przed pracą hasła, rozliczenie po jej końcu

- **Decision:** D-100 · D-101 · D-114
- **Invariant:** account-attempt-limits
- **Good:** Trasa dostaje zgodę na próbę przed haszowaniem i rozlicza ją raz, po zakończeniu sprawdzenia hasła.
- **Bad:** Próba jest liczona dopiero po haszowaniu albo zwalniana, gdy klient się rozłączy.

Dopuszczenie próby rezerwuje jej miejsce w progach adresu e-mail i adresu
klienta, zanim zacznie się praca hasła, a rezerwacje liczą się do progu razem
z zapisanymi niepowodzeniami. Próbę rozlicza się dokładnie raz: sukcesem,
niepowodzeniem albo zwolnieniem, gdy praca hasła się zakończy — nigdy na
podstawie stanu połączenia. Zwolnienie nie liczy się jako nieudana próba
(odmowa z braku miejsca na pracę hasła, duplikat, błąd serwera). Czas podaje
przekazany zegar; granica okna równa upływowi czasu już nie liczy próby.

### Ograniczone tablice bez wypierania

- **Decision:** D-101 · D-114
- **Invariant:** account-attempt-tracking
- **Good:** Pełna tablica najpierw usuwa wygasłe wpisy, a gdy nadal brak miejsca, odmawia próbie z nowym kluczem.
- **Bad:** Nowy klucz wypiera najstarszy wpis albo próba przechodzi bez śledzenia.

Adres e-mail jest kluczem w postaci skrótu o stałej długości, nie samym tekstem.
Wpis żyje, dopóki ma niezakończoną rezerwację, aktywną blokadę albo historię
w oknie; dopiero wpis bez nich zwalnia miejsce. Sprawdź miejsce dla wszystkich
potrzebnych kluczy, zanim utworzysz którykolwiek.

## Examples

### Sprawdzanie danych bez HTTP

`src/server/account-policy.ts` normalizuje adres e-mail (obcięcie spacji i małe
litery, dokładnie jeden znak `@` z tekstem po obu stronach) i liczy długość
hasła w punktach kodowych Unicode, bez zmiany jego treści. Wynikiem jest opis
problemu, a nie odpowiedź HTTP; komunikat i kod odpowiedzi dobiera trasa.
Sprawdzanie typów i zestawu pól w treści żądania należy do trasy, przed
wywołaniem tych funkcji.

### Zegar w testach

Testy przekazują własny zegar przez opcję konstruktora i przesuwają go, zamiast
czekać 15 minut albo godzinę. Pojemność tablic też jest opcją, żeby test mógł
zapełnić tablicę kilkoma kluczami; wartości progów i okien opcjami nie są.

## Where in code

- `src/server/`
- `src/server/account-policy.ts`
- `tests/http.test.mjs`
