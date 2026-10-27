# Coding guidelines — browser-api-client

- **Discipline:** coding
- **Applies to:** browser-view

## When to read

Przed dodaniem lub zmianą pliku klienta API serwera w `src/browser/`: modułu,
który wysyła żądania do serwera i oddaje ekranom wynik opisany typem.
Czytaj również ogólne wytyczne kodowania.

## Files of this kind

| File | Status | Decision |
|---|---|---|
| `src/browser/account-api.ts` | exemplar | D-117 |

## Rules

### Względne ścieżki, bez przekierowań

- **Decision:** D-108 · D-117
- **Invariant:** account-client-requests
- **Good:** Klient wysyła żądanie na względną ścieżkę `/api/…` z metodą i treścią JSON, jakie ta trasa przyjmuje, a odpowiedź przekierowująca kończy się porażką.
- **Bad:** Klient wpisuje adres z nazwą hosta albo idzie za przekierowaniem pod inny adres.

Żądania idą na ścieżki względne wobec adresu strony, więc ciasteczko sesji
dociera tylko do źródła, z którego strona pochodzi. Klient ustawia
`credentials: "same-origin"` i `redirect: "error"` jawnie, a treść JSON wysyła
tylko tam, gdzie trasa jej oczekuje.

### Sukces tylko dla własnego statusu i kształtu

- **Decision:** D-117
- **Invariant:** account-client-outcomes
- **Good:** Klient zwraca konto tylko dla statusu sukcesu swojego żądania i treści z niepustymi tekstami `id` oraz `email`; resztę zwraca jako porażkę typu odmowa, niespodziewana odpowiedź albo brak połączenia.
- **Bad:** Klient uznaje za sukces każdy status 2xx albo treść, której pól nie sprawdził.

Odmowa niesie status, znany kod i komunikat serwera tylko wtedy, gdy kod jest
na liście kodów klienta; bez znanego kodu komunikat wybiera status, a słów
serwera ekran nie dostaje. Klient kopiuje z odpowiedzi tylko pola, które
nazwał, i nie przekazuje dalej niczego więcej.

### Ograniczone oczekiwanie

- **Decision:** D-117
- **Invariant:** account-client-outcomes
- **Good:** Żądanie, którego odpowiedź albo treść nie dotarła w limicie czasu, kończy się porażką z powodem „timeout”.
- **Bad:** Żądanie czeka bez końca na serwer, który milczy albo przerwał odpowiedź w trakcie treści.

Limit czasu obejmuje także odczyt treści odpowiedzi i jest parametrem
konstruktora klienta, żeby test mógł go skrócić.

### Bez własnego stanu

- **Decision:** D-117
- **Invariant:** none
- **Good:** Klient oddaje wynik wywołania i niczego nie zapamiętuje między wywołaniami.
- **Bad:** Klient zapisuje tożsamość w `localStorage`, czyta ciasteczko albo dotyka DOM.

Tożsamość gracza zna serwer, a przeglądarka tylko pyta o nią przez klienta.
Przegląd każdej zmiany porównuje klienta z tą zasadą.

## Examples

### Wynik jako dane

`src/browser/account-api.ts` zwraca `{ ok: true, value }` albo
`{ ok: false, failure }`, gdzie porażka jest jedną z trzech postaci: odmowa
serwera, brak połączenia albo odpowiedź niezgodna z kontraktem. Ekran wybiera
zachowanie po postaci porażki i nie czyta statusów ani treści odpowiedzi.

### Test na prawdziwym lokalnym serwerze

`tests/account-api.test.mjs` uruchamia prawdziwy lokalny serwer HTTP, którego
odpowiedzi każdy test ustala sam, i nadaje prawdziwemu `fetch` adres bazowy
przez globalne źródło undici, tak jak adres strony robi to w przeglądarce.
Niczego nie podstawia za `fetch`. Takie ustawienie adresu bazowego działa
w Node 24; wymaga sprawdzenia przy zmianie jego wersji.

## Where in code

- `src/browser/`
- `src/browser/account-api.ts`
- `tests/account-api.test.mjs`
