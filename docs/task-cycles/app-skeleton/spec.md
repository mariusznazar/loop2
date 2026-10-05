# Szkielet aplikacji loop2

Status: proposed for request review

## Cel i zakres

Kolejny wykonawca może zainstalować zależności, sprawdzić typy, zbudować i uruchomić pustą aplikację. Przeglądarka wykonuje TypeScript skompilowany do JavaScript i tworzy pusty element strony przez API DOM. Jeden serwer Express 5 napisany w TypeScripcie działa na Node.js 24 i podaje zbudowane pliki. Nieznane żądania API otrzymują błąd API.

Źródłem zakresu jest [zamrożone zadanie](../../task-cycles/app-skeleton/task.md), gotowe do cyklu, korzystające wyłącznie z odpowiednich ustaleń definicji MVP zatwierdzonej 2026-10-04. Wiążące ograniczenia źródła to TypeScript i DOM bez biblioteki widoku, Express 5 na Node.js 24 oraz rozdzielenie błędów API od strony HTML. Nie powstają konta, baza, mechanika gry ani wdrożenie. Pusta strona nie zawiera demonstracyjnych przycisków, liczników ani ekranu powitalnego.

## Budowa

Repozytorium ma jeden pakiet npm i wspólny plik blokady zależności. Kod przeglądarki i serwera ma osobne konfiguracje TypeScript: przeglądarka korzysta z typów DOM, serwer z typów Node. Kompilator TypeScript buduje obie części; mały skrypt Node kopiuje wejściowy HTML do katalogu plików publicznych. Nie potrzeba bundlera ani monorepo z osobnymi pakietami.

Proponowany podział plików:

| Miejsce | Odpowiedzialność |
|---|---|
| `src/browser/main.ts` | Utworzenie pustego elementu `main` przez DOM i umieszczenie go w dokumencie. |
| `src/browser/index.html` | Minimalny dokument HTML ładujący zbudowany moduł przeglądarki. |
| `src/server/app.ts` | Utworzenie aplikacji Express z obsługą API i statycznych plików, bez otwierania portu. |
| `src/server/main.ts` | Uruchomienie aplikacji; zgłoszenie błędu nasłuchu zamiast fałszywej informacji o gotowości. |
| `tests/startup.test.mjs` | Sprawdzenie procesu startowego, gdy port 3000 jest zajęty. |
| `scripts/build.mjs` | Koordynacja kompilacji i skopiowania HTML, zakończenie błędem po nieudanej części. |
| `tsconfig.browser.json`, `tsconfig.server.json` | Osobne środowiska typów i wyniki kompilacji. |
| `package.json`, `package-lock.json` | Zależności, powtarzalna instalacja i komendy. |
| `README.md` | Wymagana wersja Node, uruchomienie i sposób sprawdzenia wyniku. |

Wyniki trafiają do ignorowanego `dist/public` i `dist/server`. Serwer wyznacza publiczny katalog względem własnego pliku modułu, a nie przypadkowego katalogu uruchomienia. Podaje wyłącznie `dist/public`; źródła, konfiguracje i dokumenty repozytorium nie są publicznym katalogiem.

Przeglądarka dostaje JavaScript w postaci natywnych modułów. Wszystkie lokalne importy w wynikowym kodzie muszą wskazywać istniejące pliki JavaScript. Dokładne wersje zależności rozstrzyga plan i instalacja z zachowaniem Express 5 i Node 24; odtwarzalność zapewnia plik blokady. W konfiguracji i instrukcji należy jawnie wskazać linię Node 24.

## Obsługa żądań

Obsługa przestrzeni API poprzedza statyczne pliki. Dla `/api`, `/api/` oraz każdej ścieżki pod `/api/` serwer zwraca status 404 i JSON `{"error":"Not found"}`. Dotyczy wszystkich metod, również gdy klient deklaruje przyjmowanie HTML. Dla HEAD obowiązuje semantyka HTTP: ten sam status i typ odpowiedzi, bez treści. Ten kształt błędu jest wyborem wykonawczym do przeglądu, nie zatwierdzonym kontraktem przyszłych kont.

GET `/` podaje zbudowany HTML, a żądania istniejących publicznych plików podają ich zawartość z właściwym typem. Brakujący plik lub inna nieznana ścieżka dostaje zwykłe 404. Nie ma przekierowania dowolnej ścieżki na stronę główną. Serwer nie analizuje ani nie zapisuje danych użytkownika. Domyślny serwer lokalny nasłuchuje na interfejsie loopback; instrukcja podaje jego adres i sposób zakończenia procesu. Jeśli port jest zajęty, proces wypisuje błąd na stderr i kończy się niezerowym kodem; komunikat gotowości pojawia się wyłącznie po udanym nasłuchu.

## Komendy

| Komenda | Wynik |
|---|---|
| `npm ci` | Instalacja według zatwierdzonego pliku blokady. |
| `npm run typecheck` | Kontrola typów przeglądarki i serwera bez emisji; błąd jednej części kończy komendę błędem. |
| `npm run build` | Zbudowanie obu części i skopiowanie HTML; nieudana kompilacja nie uruchamia serwera. |
| `npm start` | Uruchomienie zbudowanego serwera. |
| `npm run dev` | Zbudowanie aplikacji i uruchomienie jej lokalnie. Po edycji wykonawca zatrzymuje proces i ponawia komendę. |
| `npm test` | Zbudowanie aplikacji i testy HTTP oraz błędu startu przy zajętym porcie. |

Automatyczne przeładowanie nie jest wymagane. Ten wybór upraszcza obsługę procesów kosztem ręcznego restartu po zmianach. README podaje komendy w kolejności dla świeżej kopii repozytorium i wyjaśnia, że `npm start` wymaga wcześniejszego builda.

## Weryfikacja

Testy zachowania HTTP sprawdzają uruchomioną aplikację, nie tylko kolejność middleware: strona główna i moduł przeglądarki są dostępne; nieznane API daje 404 JSON dla GET, POST i HEAD; nagłówek przyjmujący HTML nie zmienia błędu API. Sprawdzenie obejmuje `/api`, `/api/`, zagnieżdżoną ścieżkę i parametr zapytania. `/apix` nie należy do API. Brakujące pliki nie zwracają strony głównej.

Granica dostępu do plików wymaga prób z surowymi i zakodowanymi segmentami przechodzenia do katalogu nadrzędnego oraz żądaniami plików źródłowych i konfiguracji. Wynik nie może ujawnić plików spoza katalogu publicznego. Próby trzeba przesłać bez normalizacji ścieżki przez klienta testowego. Testy HTTP uruchamiają serwer na wolnym porcie i zamykają go po zakończeniu. Osobny test zajmuje port 3000 własnym serwerem, uruchamia wejście procesu w podprocesie i sprawdza niezerowy kod wyjścia, użyteczny błąd oraz brak komunikatu gotowości; zamyka wyłącznie własny serwer blokujący.

Sprawdzenie całości obejmuje instalację z blokady, kontrolę typów obu części, build, start zbudowanego serwera oraz lokalne uruchomienie zgodnie z README. W prawdziwej przeglądarce strona pozostaje wizualnie pusta, utworzony przez moduł element `main` istnieje, a konsola i ładowanie modułu nie wykazują błędów. Same puste piksele nie dowodzą wykonania modułu.

## Fundament i ograniczenia oceny

Zadanie korzysta ze źródła bez przypisania mu pracy nad wpisami fundamentu. Istniejące pliki fundamentu nie zawierają wpisów. W tej implementacji pozostają niezmienione; nowe propozycje części, reguł i sposobów ich kontroli powstają w wymaganym kroku powrotu do fundamentu, podlegają niezależnej ocenie i trafiają do PR jako niezatwierdzone. Nie wolno przedstawiać decyzji wykonawczych tego dokumentu jako akceptacji człowieka dla nowych wpisów.

Brak ocenionych trybów awarii oznacza najwyższą ostrość kontroli, a HTTP i dostęp do plików są granicą zaufania. Pustej mapy części nie uznaje się za zaliczoną kontrolę przypisań. Kontrole dotyczące kontenera lub wdrożenia pozostają niewykonane, ponieważ te elementy nie należą do zadania. Ewentualna konieczna zmiana istniejącej wiążącej reguły lub zaakceptowanego testu niezmiennika wymaga powrotu do kroku fundamentu przed zależnym kodem.
