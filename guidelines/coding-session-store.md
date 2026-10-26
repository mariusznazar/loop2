# Coding guidelines — session-store

- **Discipline:** coding
- **Applies to:** account-server

## When to read

Przed dodaniem lub zmianą magazynu sesji biblioteki w części account-server.
Czytaj również ogólne wytyczne kodowania.

## Files of this kind

| File | Status | Decision |
|---|---|---|
| `src/server/session-store.ts` | exemplar | D-113 |

## Rules

### Odczyt i odnowienie sesji

- **Decision:** D-110 · D-113
- **Invariant:** account-session-storage
- **Good:** Spreparowany zapis jest odrzucany przed odtworzeniem sesji, a opóźnione odnowienie nie przywraca wylogowanej sesji.
- **Bad:** Odczyt bez walidacji albo odnowienie przez wstawienie brakującego rekordu.

Sprawdzaj kształt odczytanych danych i zgodność tożsamości z rekordem.
Przy odnowieniu aktualizuj tylko istniejącą, niewygasłą sesję tego konta
i zachowaj późniejszy termin. Sprawdzaj granicę czasu równą wygaśnięciu.
Testy adaptera nie zastępują dowodu konfiguracji ciasteczka i wdrożonego serwera.

## Examples

### Callback po operacji

`SqliteSessionStore` przekazuje błędy bazy do callbacku biblioteki. Wywołanie
callbacku leży poza blokiem przechwytującym błąd operacji, więc wyjątek jego
odbiorcy nie powoduje drugiego wywołania. Brak callbacku kieruje błąd do zdarzenia
`error` magazynu. Zapis nowej uwierzytelnionej sesji używa `set`; zwykłe żądanie
używa `touch` i nie przepisuje tożsamości. Zasady HTTP i atrybuty ciasteczka
ustala aplikacja używająca magazynu.

## Where in code

- `src/server/`
- `src/server/session-store.ts`
- `tests/account-storage.test.mjs`
