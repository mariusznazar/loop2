# NIEZATWIERDZONE — tłumaczenie do przeglądu

Tłumaczenie nie jest częścią fundamentu. Prefiks, zatwierdzenie i ocena awarii pozostają otwarte; propozycja nie nadaje się jeszcze do zapisania jako wiążąca.

## Nazwy proponowanych części

Te nazwy odsyłają do części opisanych w proponowanej mapie poniżej:

- browser-page — kod tworzący stronę w przeglądarce.
- server-http — serwer podający stronę i obsługujący żądania HTTP.
- build-tools — instalacja zależności, sprawdzanie typów, budowanie i uruchamianie aplikacji.
- agent-workflow — instrukcje dla wykonawców i dokumentacja ich pracy w repozytorium.
- product-foundation — zapis reguł produktu i mapa odpowiedzialności jego części.

## [prefiks wymagany]-01/1 — Jak wspólnie budujemy przeglądarkę i serwer?

Przeglądarka i serwer mają wspólny pakiet npm i plik blokady zależności oraz osobne konfiguracje kompilacji TypeScript i katalogi wynikowe. Budowanie aplikacji kompiluje obie konfiguracje i kopiuje HTML przeglądarki do publicznego katalogu wynikowego; kontrola typów sprawdza obie konfiguracje bez zapisywania plików wynikowych.

- Zmiana: nowa decyzja.
- Zakres: browser-page · server-http · build-tools.
- Podstawa w faktach zewnętrznych: brak.
- Relacje: brak.
- Weryfikacja: poziom 1 — application-build-layout · application-build-output · application-type-check.
- Warunek ponownego rozpatrzenia: brak.
- Miejsce pełnego uzasadnienia poza wpisem: brak.
- Zatwierdzenie: przy akceptacji.

Uzasadnienie: wspólna instalacja upraszcza lokalny punkt startu, a osobne środowiska kompilatora rozdzielają typy przeglądarki i serwera.
Odrzucone warianty: osobne pakiety wymagają koordynacji instalacji; bundler dodaje warstwę budowania bez wykazanej potrzeby w obecnej aplikacji.

## application-build-layout/1

Aplikacja ma jeden pakiet npm i plik blokady zależności oraz osobne konfiguracje TypeScript i katalogi wynikowe kodu przeglądarki i serwera.

- Metoda: TODO.
- Fakty, na których opiera się reguła: brak.
- Wynika z: TODO — „Jak wspólnie budujemy przeglądarkę i serwer?”, propozycja w foundations/decisions.md; człowiek nie wybrał prefiksu decyzji.
- Części: browser-page · server-http · build-tools.
- Korekta bez zmiany znaczenia: brak.

## application-build-output/1

Budowanie aplikacji kompiluje obie konfiguracje TypeScript — przeglądarki i serwera — i kopiuje HTML przeglądarki do publicznego katalogu wynikowego.

- Metoda: TODO.
- Fakty, na których opiera się reguła: brak.
- Wynika z: TODO — „Jak wspólnie budujemy przeglądarkę i serwer?”, propozycja w foundations/decisions.md; człowiek nie wybrał prefiksu decyzji.
- Części: browser-page · server-http · build-tools.
- Korekta bez zmiany znaczenia: brak.

## application-type-check/1

Komenda kontroli typów aplikacji sprawdza konfiguracje TypeScript przeglądarki i serwera bez zapisywania plików wynikowych i kończy się kodem różnym od zera, gdy którykolwiek sprawdzian się nie powiedzie.

- Metoda: TODO.
- Fakty, na których opiera się reguła: brak.
- Wynika z: TODO — „Jak wspólnie budujemy przeglądarkę i serwer?”, propozycja w foundations/decisions.md; człowiek nie wybrał prefiksu decyzji.
- Części: browser-page · server-http · build-tools.
- Korekta bez zmiany znaczenia: brak.

## unmatched-api-response/1

Żądanie do `/api` albo ścieżki zaczynającej się od `/api/`, dla którego nie istnieje obsługa API, otrzymuje status 404 i typ treści odpowiedzi `application/json`, także gdy żądanie dopuszcza HTML.

- Metoda: TODO.
- Fakty, na których opiera się reguła: brak.
- Wynika z: brak.
- Części: server-http · build-tools.
- Korekta bez zmiany znaczenia: brak.

## public-file-boundary/1

Serwer obsługuje żądania plików statycznych wyłącznie względem zbudowanego katalogu publicznego położonego względem własnego modułu, niezależnie od bieżącego katalogu procesu.

- Metoda: TODO.
- Fakty, na których opiera się reguła: brak.
- Wynika z: brak.
- Części: server-http · build-tools.
- Korekta bez zmiany znaczenia: brak.

## missing-page-response/1

Żądanie poza ścieżkami API, które nie pasuje do żadnego publicznego pliku, otrzymuje status 404 zamiast strony głównej.

- Metoda: TODO.
- Fakty, na których opiera się reguła: brak.
- Wynika z: brak.
- Części: server-http · browser-page · build-tools.
- Korekta bez zmiany znaczenia: brak.

Listy wycofanych, odłożonych i odzyskanych niezmienników są puste.

## Mapa części

Skala dotkliwości awarii: TODO — wymaga oceny człowieka; nie przypisano stopni.

| Partner zewnętrzny | Kierunek wymiany | Dane wejściowe | Aktualizuje się wraz z produktem |
|---|---|---|---|
| Klienci HTTP | obustronny | niezaufane | nie |

Listy zasad zmiany publicznych obietnic, celowo pominiętych plików i wycofanych identyfikatorów są puste.

### browser-page

Część tworzy stronę w przeglądarce.

- Pliki: `src/browser/**`.
- Dopuszczalne zależności: brak.
- Tryby awarii: TODO — człowiek nie podał awarii, szkód, dotkliwości ani sposobu wykrycia.
- Granica przyjmowania niezaufanych danych: brak.

### server-http

Część podaje zbudowaną stronę i obsługuje żądania HTTP.

- Pliki: `src/server/**`, `tests/http.test.mjs`, `tests/startup.test.mjs`.
- Dopuszczalne zależności: browser-page.
- Tryby awarii: TODO — człowiek nie podał awarii, szkód, dotkliwości ani sposobu wykrycia.
- Granica przyjmowania niezaufanych danych: `src/server/app.ts`.

### build-tools

Część instaluje zależności, sprawdza typy oraz buduje i uruchamia aplikację.

- Pliki: `package.json`, `package-lock.json`, `tsconfig.browser.json`, `tsconfig.server.json`, `scripts/build.mjs`, `.gitignore`, `README.md`.
- Dopuszczalne zależności: browser-page · server-http.
- Tryby awarii: TODO — człowiek nie podał awarii, szkód, dotkliwości ani sposobu wykrycia.
- Granica przyjmowania niezaufanych danych: brak.

### agent-workflow

Część kieruje pracą wykonywaną w tym repozytorium i ją dokumentuje.

- Pliki: `AGENTS.md`, `.agents/**`, `.claude/**`, `.gitmodules`, `.the-way`.
- Dopuszczalne zależności: product-foundation.
- Tryby awarii: TODO — człowiek nie podał awarii, szkód, dotkliwości ani sposobu wykrycia.
- Granica przyjmowania niezaufanych danych: brak.

### product-foundation

Część przechowuje reguły produktu i mapę odpowiedzialności jego części.

- Pliki: `foundations/**`.
- Dopuszczalne zależności: brak.
- Tryby awarii: TODO — człowiek nie podał awarii, szkód, dotkliwości ani sposobu wykrycia.
- Granica przyjmowania niezaufanych danych: brak.

Wszystkie 44 pozycje śledzone w ocenianym commicie mają po jednym przypisaniu. Po panelu usunięto wzorce `docs/superpowers/**` i `docs/task-cycles/**`, ponieważ w ocenianym commicie nie pasują do żadnego śledzonego pliku. Gdy dokumenty pracy zostaną zapisane w historii, ich przypisanie wymaga ponownej oceny przy faktycznym przyjęciu mapy; wykracza to poza obecny commit kodu.

## Pytania do człowieka na przeglądzie PR

1. Jaki prefiks mają otrzymać decyzje produktu? Bez odpowiedzi nie da się zapisać poprawnych identyfikatorów i powiązań. Wybranie prefiksu domknie odwołania, ale nie zastąpi akceptacji wpisów.
2. Jakie awarie każdej części są istotne, jaką powodują szkodę, jak dotkliwe są ich skutki i co wykrywa je przed wydaniem? To otwarte pytanie oceny. Nieznane skutki oznaczają najwyższą ostrość kontroli, a nie brak awarii.
3. Czy przyjmujesz pokazane wpisy jako trwałe reguły i podział produktu? Pozostawienie samego kodu zachowuje swobodę późniejszego podziału, ale kolejne zadania nie dostają reguł wykrywających cofnięcie tej konstrukcji. Przyjęcie wpisów pozwala rozpoznawać takie zmiany, lecz zmiana układu budowania wymaga później rewizji decyzji. Rekomendacja: ocenić ten mały zestaw bez utrwalania portu, dokładnego tekstu błędu, pustej strony ani sposobu restartu.

Metody sześciu proponowanych niezmienników mają wartość TODO. Obecne testy HTTP nie zapisują ich werdyktów i nie przeszły wymaganego przez WAY-69 rozdzielenia autorstwa zdania, testu i celowego złamania. Przyjęcie reguły z TODO jest dozwolone, ale pozostawia ją niesprawdzoną; przygotowanie metody wymaga osobnej pracy i oceny.

## Po panelu — dwa dodatkowe pytania, bez przyjęcia wpisów

Oba rozstrzygnięcia panelu zalecają przedstawienie propozycji po usunięciu dwóch wzorców dokumentów. Poprawka jest naniesiona; nie oznacza to zatwierdzenia fundamentu. Poniższe zdania są kandydatami do decyzji człowieka, poza sześcioma obecnymi propozycjami i poza patchem.

### H1 — poprawne podanie strony

Oryginał z rozstrzygnięcia, bez zmian:

> After a successful build, a running server returns the built browser HTML with status 200 for GET / and its compiled entry script with status 200 and a JavaScript content type for GET /main.js.

Tłumaczenie:

> Po pomyślnym zbudowaniu aplikacji działający serwer zwraca zbudowany HTML przeglądarki ze statusem 200 dla GET / oraz skompilowany skrypt wejściowy ze statusem 200 i typem treści JavaScript dla GET /main.js.

Pozostawienie tego poza fundamentem zachowuje zwykłe testy HTTP, ale nie daje niezmiennika dla poprawnego podania strony. Przyjęcie dodaje jeden niezmiennik i koszt przygotowania oraz utrzymywania jego sprawdzania. Rekomendacja panelu: przyjąć, jeśli ta obietnica ma wiązać następne zmiany. Ewentualne uznanie drogi przez budowanie, serwer i przeglądarkę za przepływ krytyczny wymaga osobnej decyzji człowieka; nie dopisano stopnia dotkliwości ani metody.

Czy poprawne podanie strony ma być trwałą obietnicą produktu?

### H2 — zajęty adres nasłuchiwania

Oryginał z rozstrzygnięcia, bez zmian:

> When the configured listening address is already in use, the server process exits nonzero and does not report that it is ready.

Tłumaczenie:

> Gdy skonfigurowany adres nasłuchiwania jest już zajęty, proces serwera kończy się kodem różnym od zera i nie informuje, że jest gotowy.

Pozostawienie tego poza fundamentem zachowuje zwykły test błędu startu. Przyjęcie dodaje jeden niezmiennik i koszt jego sprawdzania. Rekomendacja panelu: zostawić człowiekowi decyzję o tym konkretnym zachowaniu; jeden test zajętego adresu nie uzasadnia rozszerzenia reguły na wszystkie awarie startu.

Czy zachowanie przy zajętym adresie ma być trwałą obietnicą produktu?
