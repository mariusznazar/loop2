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
| `src/server/account-policy.ts` | exemplar | D-116 |

## Rules

### Rezerwacja przed pracą hasła, rozliczenie po jej końcu

- **Decision:** D-102 · D-103 · D-116 · D-226
- **Invariant:** account-attempt-limits
- **Good:** Trasa logowania albo zakładania konta dostaje zgodę na próbę przed pracą hasła i rozlicza ją raz, po jej zakończeniu: przy logowaniu pracą hasła jest sprawdzenie hasła, przy zakładaniu konta jego haszowanie.
- **Bad:** Próba jest liczona dopiero po pracy hasła (sprawdzeniu hasła przy logowaniu, haszowaniu przy zakładaniu konta) albo zwalniana, gdy klient się rozłączy.

Reguła dotyczy prób logowania i zakładania konta. Trasa ustawiania hasła
odnośnikiem nie przyjmuje próby: przed pracą hasła sprawdza, czy odnośnik
działa, a haszuje przez samą bramkę haseł (D-226).

Dopuszczenie próby rezerwuje jej miejsce w progach adresu e-mail i adresu
klienta, zanim zacznie się praca hasła, a rezerwacje liczą się do progu razem
z zapisanymi niepowodzeniami. Próbę rozlicza się dokładnie raz: sukcesem,
niepowodzeniem albo zwolnieniem, gdy praca hasła się zakończy — nigdy na
podstawie stanu połączenia. Zwolnienie nie liczy się jako nieudana próba
(odmowa z braku miejsca na pracę hasła, duplikat przy zakładaniu konta, błąd
serwera, logowanie z dobrym hasłem na zablokowane konto i logowanie, w którym
hasło konta zmieniło się podczas jego sprawdzania, bo wyprzedziło je ustawienie
hasła odnośnikiem). Czas podaje
przekazany zegar; granica okna równa upływowi czasu już nie liczy próby.

### Ograniczone tablice bez wypierania

- **Decision:** D-103 · D-116
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
zapełnić tablicę kilkoma kluczami, i próg zgłoszeń awarii przeglądarki w ciągu
godziny, żeby test mógł go wyczerpać kilkoma żądaniami. Progi prób logowania
i zakładania kont oraz okna czasu opcjami nie są, więc testy tych limitów
sprawdzają ich prawdziwe wartości.

## Where in code

- `src/server/`
- `src/server/account-policy.ts`
- `tests/http.test.mjs`
