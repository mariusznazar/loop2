# Loop

Aplikacja TypeScript: gra w przeglądarce zbudowana na DOM oraz serwer Express 5, który podaje jej pliki.

Wymagania: Node.js 24.x i dostarczony z nim npm. Wszystkie polecenia wykonuj w głównym katalogu repozytorium.

## Pierwsze uruchomienie

1. `npm ci` — instalacja według pliku blokady.
2. `npm run typecheck` — kontrola typów przeglądarki i serwera bez emisji plików.
3. `npm run build` — kompilacja obu części oraz skopiowanie do `dist/public` HTML-a, arkuszy stylów leżących bezpośrednio w `src/browser/`, ikon z `assets/icons/` i czcionek Geist z ich licencją z `assets/fonts/` (do `dist/public/fonts`).
4. `npm start` — uruchomienie zbudowanego serwera.
5. Otwórz http://127.0.0.1:3000.

`npm start` wymaga wcześniejszego builda. Serwer domyślnie nasłuchuje na 127.0.0.1:3000; adres zmienisz zmiennymi środowiska `LOOP2_LISTEN_HOST` i `LOOP2_LISTEN_PORT`. Zakończ go przez Ctrl+C.

## Narzędzia kontroli kodu

`npm ci` instaluje także narzędzia deweloperskie według wspólnego `package-lock.json`. Do pierwszej instalacji wystarcza npm dostarczony z Node.js; kontrole używają potem lokalnych przypiętych narzędzi i nie pobierają ich podczas sprawdzania. Przy świadomej aktualizacji pliku blokady lokalne ustawienie `min-release-age` może odrzucić przyjętą nową wersję narzędzia jako zbyt świeżą. Dla takiej przyjętej wersji można dodać `--min-release-age=0` do jednorazowego polecenia aktualizującego plik blokady, zachowując ustawienia globalne. Zwykła instalacja nadal używa `npm ci`.

Pakiet `typescript` dostarcza linterowi API TypeScript 6.0.2; wpis `overrides` przypina także rzeczywistą wersję API eksportowaną przez jego pakiet zgodności. Oddzielny `typescript-compiler` zawiera TypeScript 7, a skrypt budowania jawnie uruchamia jego kompilator dla obu konfiguracji aplikacji. Używaj poleceń budowania projektu; samo `npx tsc` wybiera spośród dostępnych plików wykonywalnych.

Ruff i ShellCheck wymagają Pythona 3.9 lub nowszego oraz osobnego, lokalnego środowiska. Nie wymagają aktywowania środowiska ani instalacji globalnej. Wersje deklaruje `requirements-quality.in`, a `requirements-quality.txt` przypina komplet paczek i hasze ich gotowych plików wheel. Instalacja pobiera tylko zgodne pliki wheel; na platformie bez takiego pliku kończy się błędem, bez budowania ze źródeł i bez wyboru innej wersji.

Windows (PowerShell):

```powershell
python -m venv .runs/quality-venv
.runs/quality-venv/Scripts/python.exe -m pip install --require-hashes -r requirements-quality.txt
.runs/quality-venv/Scripts/ruff.exe --version
.runs/quality-venv/Scripts/shellcheck.exe --version
```

Linux/macOS:

```sh
python3 -m venv .runs/quality-venv
.runs/quality-venv/bin/python -m pip install --require-hashes -r requirements-quality.txt
.runs/quality-venv/bin/ruff --version
.runs/quality-venv/bin/shellcheck --version
```

Ruff ma zgłosić `ruff 0.17.1`, a ShellCheck linię `version: 0.11.0`. Paczka `shellcheck-py==0.11.0.1` dostarcza ten plik wykonywalny ShellCheck; jej końcowe `.1` jest wersją opakowania Python. Po zmianie przypiętych narzędzi ponów instalację z pliku blokady i sprawdź obie wersje.

Kontrole kodu uruchamia `npm test` przez `tests/quality/test_quality_invariants.py`, wprost z lokalnych kopii w `node_modules` i `.runs/quality-venv`, bez pobierania narzędzi podczas sprawdzania. ESLint i Ruff czytają `eslint.config.mjs` i `ruff.toml`; Prettier sprawdza na ustawieniach domyślnych. Flagi stoją w tym teście. Edytor używa `prettier.config.mjs`, który nie ustawia żadnej opcji; wybierz lokalny Prettier i nie nadpisuj jego ustawień osobno. Audyt zależności (`scripts/audit_dependencies.py`) odpytuje publiczny rejestr npm tylko wtedy, gdy `package-lock.json` różni się od wersji w `git merge-base HEAD origin/HEAD`, i porównuje wtedy zgłoszenia `npm audit` obu plików blokady. ESLint obejmuje również nowe pliki TS/JS w katalogach wskazanych w jego konfiguracji; pomocnicze programy API TS6 w jego konfiguracji dają informację o typach także skryptom i testom poza konfiguracjami kompilacji aplikacji. Python i Bash nie są automatycznie formatowane.

## Co pokazuje strona

- **Panel „Program”** (lewa kolumna, widoczny zawsze): uporządkowane grupy reguł „warunek → akcja”. Każda grupa ma edytowalną nazwę i własny warunek, wybierany tymi samymi listami i polem liczby co warunek reguły. „Dodaj grupę” dopisuje pustą „Grupę 2”, „Grupę 3”…; numery nie są używane ponownie po usunięciu ani zmianie nazwy. Strzałki przy grupie zmieniają jej kolejność, a „Usuń” kasuje całą grupę z regułami jednym kliknięciem. „Dodaj regułę” w grupie dopisuje „Zawsze → Eksploruj”. Regułę można przeciągnąć przed inną regułę albo na koniec grupy, również pustej; jej strzałki działają tylko we własnej grupie. Po usunięciu wszystkich grup nadal można dodać nową. Program można zmieniać przed wysłaniem maga i w trakcie przejścia; zmiana działa od najbliższej wolnej minuty gry, po zakończeniu rozpoczętej akcji. Grupa z niespełnionym warunkiem jest pomijana, a grupa bez wykonalnej reguły przepuszcza do następnej. Przy regule liczba „N×” liczy rozpoczęcia jej akcji, nie minuty trwania. Nie ma jej przed pierwszym przejściem; po śmierci i „Zakończ” pozostaje do następnego wysłania albo „Restart”. Nowe przejście zeruje liczniki przed pierwszą akcją; edycja warunku lub akcji reguły zeruje jej licznik. Przestawianie reguł, przenoszenie między grupami i edycja grup zachowują liczniki.
- **Wysyłanie** (prawa kolumna, gdy nie trwa przejście): postać „Mag żywiołów”, „Mapa: Las” i przycisk „Wyślij”. Każde wysłanie losuje nowy układ mapy.
- **Wiersz stanu** (w trakcie przejścia): „Minuta {minuta} · {bieżąca akcja}”, z dopiskiem „ (pauza)” przy zatrzymanym czasie, oraz przyciski „Pauza”/„Wznów”, „Restart” (od minuty zero, ten sam układ, bieżący program) i „Zakończ” (powrót do wysyłania). Czas płynie minutą gry na sekundę realną.
- **Panel terenu** pod wierszem stanu: rysunek całej mapy 4 × 4 z sześciokątnych kafelków — nieodsłonięte ciemne i puste, odsłonięte jaśniejsze z ikonami zasobów bez liczb, ikona przygaszona przy zapasie zero, gruby bursztynowy obrys na kafelku postaci i kreskowany na celu bieżącego kroku. Obok stoi lista odsłoniętych kafelków: etykieta `(kolumna, wiersz)` i zapas każdego zasobu mapy, „—” gdy kafelek go nie ma. Rysunek nie reaguje na kliknięcia; najechanie na kafelek podświetla jego wiersz listy, a najechanie na wiersz — jego kafelek.
- **Stopka**: wzmianki o autorach ikon — dla każdej „{zasób}: „{tytuł ikony}”, {autor}, game-icons.net, CC BY 3.0, zmienione (bez tła, jasny kolor)” z odnośnikami do źródła ikony i licencji.

Stan gry żyje tylko w pamięci strony: przeładowanie zaczyna od nowa, z jedną pustą grupą „Program” o warunku „Zawsze”, bez liczników i bez przejścia.

## Ikony

Ikony zasobów pochodzą z game-icons.net (licencja CC BY 3.0). Ikony są zmienione względem źródła: usunięte czarne tło, kształt w jasnym kolorze. Ich źródła leżą w `assets/icons`, poza katalogiem podawanym przez serwer; `npm run build` kopiuje je do `dist/public/icons`. Tytuły ikon trzymają dane zasobów w `src/browser/sim/data/resources.ts`, obok nazwy pliku ikony; autorów ikon i commit źródła trzyma `src/browser/view/credits.ts`, a stopka strony pokazuje wymagane wzmianki.

## Strona wszystkich stanów

`npm run kitchen-sink` buduje stronę wszystkich stanów z `src/browser/kitchen-sink/` — każdą wspólną kontrolkę w każdym stanie albo z powodem, dla którego stan jej nie dotyczy, każdą rolę koloru i próbki kafelków — do `dist/kitchen-sink/`, podaje ją na 127.0.0.1 pod portem wybranym przez system, wypisuje jej adres i otwiera go w domyślnej przeglądarce; gdy przeglądarka się nie otworzy, wejdź na wypisany adres. Zakończ przez Ctrl+C. `npm run kitchen-sink -- --build-only` tylko składa `dist/kitchen-sink/`, bez serwera i przeglądarki. Komenda nie pisze nic poza `dist/kitchen-sink/`. `npm run build` nie zawiera tej strony, więc nie trafia ona na serwer testowy; jej arkusz stylów leży w `src/browser/kitchen-sink/`, poza arkuszami kopiowanymi do `dist/public`.

## Praca lokalna i sprawdzenie

`npm run dev` buduje aplikację i uruchamia serwer. Nie obserwuje plików: po edycji zatrzymaj proces przez Ctrl+C i ponów komendę.

`npm test` to jedno polecenie wszystkich testów. Buduje aplikację i wykonuje testy HTTP, testy startu serwera oraz testy symulacji i widoku w Node, bez przeglądarki. Każdy test, który uruchamia serwer, podaje mu w `LOOP2_LISTEN_PORT` wolny port wskazany przez system, więc dwa przebiegi `npm test` na jednym komputerze nie zderzają się na porcie, a port 3000 może być w tym czasie zajęty. Wyjątkiem jest jeden test domyślnego adresu: uruchamia serwer bez `LOOP2_LISTEN_HOST` i `LOOP2_LISTEN_PORT` i przechodzi, gdy serwer zgłosi gotowość na 127.0.0.1:3000 (test od razu go zamyka) albo zakończy się błędem zajętego 127.0.0.1:3000. Potem uruchamia testy w Pythonie z każdego katalogu `tests/` (niezmienniki, wdrożenie, jakość, praca agenta) przez `python -B .the-way/gate/run_tests.py` i sprawdza fundament przez `python -B .the-way/elements/common/foundation_check.py`. Pierwszy błąd zatrzymuje dalsze kroki. Wymaga Pythona 3.14 na `PATH` jako `python`, zainicjowanego submodułu `.the-way`, środowiska `.runs/quality-venv` opisanego wyżej, a gdy zmiana dotyka `package-lock.json` — także dostępu do rejestru npm.

W przeglądarce sprawdź, że `/main.js` ładuje się bez błędu, konsola nie zawiera błędów wykonania, a strona pokazuje panel „Program”, wysyłanie maga i stopkę z wzmiankami; po „Wyślij” — wiersz stanu z minutą rosnącą co sekundę oraz panel terenu z listą kafelków.

Jeden plik testu: `npm test -- tests/sim/hex.test.mjs` albo `npm test -- tests/quality/test_audit_dependencies.py`. Bramka przyjmuje dokładnie jeden plik: Node uruchamia po budowaniu, Python bez budowania, bez pozostałych testów i kontroli fundamentu. Błędny plik lub przebieg bez wykonanego testu kończy się porażką. Przed requestem wymagany jest pełny `npm test` bez argumentów.

Testy mutacyjne symulacji uruchamia recenzent na zmienionych plikach: `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/hex.ts"`. Zakres, ocenę ocalałych zmian i warunek usunięcia narzędzia opisuje reguła Mutation testing w `guidelines/testing.md`. To osobna kontrola, poza zwykłym `npm test`.

Nieznane `/api`, `/api/` i ścieżki pod `/api/` otrzymują 404 JSON. Pozostałe brakujące ścieżki otrzymują zwykłe 404. Serwer podaje wyłącznie `dist/public`.

Kod przeglądarki jest w `src/browser` — symulacja gry w `src/browser/sim`, ekrany w `src/browser/view` — a kod serwera w `src/server`. Kompilacje mają osobne konfiguracje typów; zależności i plik blokady są wspólne. Konta, zapis stanu i serwerowa część gry jeszcze nie istnieją; aplikacja jest wdrażana na serwer testowy przez kontener i skill `loop2-deploy`.
