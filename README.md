# Loop

Minimalna aplikacja TypeScript: pusta strona utworzona przez DOM oraz serwer Express 5.

Wymagania: Node.js 24.x i dostarczony z nim npm. Wszystkie polecenia wykonuj w głównym katalogu repozytorium.

## Pierwsze uruchomienie

1. `npm ci` — instalacja według pliku blokady.
2. `npm run typecheck` — kontrola typów przeglądarki i serwera bez emisji plików.
3. `npm run build` — kompilacja obu części i skopiowanie HTML do `dist/public`.
4. `npm start` — uruchomienie zbudowanego serwera.
5. Otwórz http://127.0.0.1:3000. Strona ma być pusta.

`npm start` wymaga wcześniejszego builda. Serwer nasłuchuje lokalnie na porcie 3000; zakończ go przez Ctrl+C.

## Praca lokalna i sprawdzenie

`npm run dev` buduje aplikację i uruchamia serwer. Nie obserwuje plików: po edycji zatrzymaj proces przez Ctrl+C i ponów komendę.

`npm test` buduje aplikację i wykonuje testy HTTP na wolnym porcie.

W narzędziach przeglądarki sprawdź, że `document.querySelector('main')` zwraca pusty element, `/main.js` ładuje się bez błędu, a konsola nie zawiera błędów wykonania. Sama pusta strona nie dowodzi wykonania modułu.

Nieznane `/api`, `/api/` i ścieżki pod `/api/` otrzymują 404 JSON. Pozostałe brakujące ścieżki otrzymują zwykłe 404. Serwer podaje wyłącznie `dist/public`.

Kod przeglądarki jest w `src/browser`, kod serwera w `src/server`. Kompilacje mają osobne konfiguracje typów; zależności i plik blokady są wspólne. Konta, baza, mechanika gry i wdrożenie nie należą do tego szkieletu.
