# Loop

Aplikacja TypeScript: gra w przeglądarce zbudowana na DOM oraz serwer Express 5, który podaje jej pliki.

Wymagania: Node.js 24.x i dostarczony z nim npm. Wszystkie polecenia wykonuj w głównym katalogu repozytorium.

## Pierwsze uruchomienie

1. `npm ci` — instalacja według pliku blokady.
2. `npm run typecheck` — kontrola typów przeglądarki i serwera bez emisji plików.
3. `npm run build` — kompilacja obu części oraz skopiowanie HTML, stylów, ikon i czcionek z licencją do `dist/public`.
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

Ruff ma zgłosić `ruff 0.17.1`, a ShellCheck linię `version: 0.11.0`. Paczka `shellcheck-py==0.11.0.1` dostarcza ten plik wykonywalny ShellCheck; jej końcowe `.1` jest wersją opakowania Python. Kontrole poniżej korzystają bezpośrednio z tych lokalnych plików w `.runs/quality-venv`, bez pobierania narzędzi podczas sprawdzania. Po zmianie przypiętych narzędzi ponów instalację z pliku blokady i sprawdź obie wersje.

- `python -B scripts/check_eslint.py --configuration --record .runs/eslint-configuration.jsonl` sprawdza kompletną efektywną konfigurację TS/JS.
- `python -B scripts/check_eslint.py --record .runs/eslint.jsonl` sprawdza źródła i wyciszenia reguł.
- `python -B scripts/check_ruff.py --record .runs/ruff.jsonl` sprawdza źródła Python oraz wyciszenia blokujących reguł.
- `python -B scripts/check_shellcheck.py --record .runs/shellcheck.jsonl` sprawdza samodzielne skrypty Bash oraz dyrektywy zmieniające przyjęty zestaw kontroli.
- `python -B scripts/check_format.py --record .runs/format.jsonl` sprawdza format i LF. Edytor używa tego samego `prettier.config.mjs`; wybierz lokalny Prettier i nie nadpisuj jego ustawień osobno.
- `python -B scripts/check_dependencies.py --fork-point <commit-początku-zmiany> --record .runs/dependency-audit.jsonl` porównuje nowe rzeczywiste pary nazwa–wersja z początkiem zmiany i odpytuje publiczny rejestr npm przez lokalny npm. Podaj niezmienny commit początku zmiany jako podstawę porównania.

Kod zakończenia kontroli to `0` dla wyniku pozytywnego, `1` dla wykrytego naruszenia i `2`, gdy nie udało się wiarygodnie wykonać kontroli. Pliki wyników w `.runs/` są lokalne i ignorowane przez Git. ESLint obejmuje również nowe warianty TS/JS w częściach z kodem; pomocnicze programy API TS6 w jego konfiguracji dają informację o typach także skryptom i testom poza konfiguracjami kompilacji aplikacji. Python i Bash nie są automatycznie formatowane.

## Co pokazuje strona

- **Panel „Program”** (lewa kolumna, widoczny zawsze): uporządkowana lista reguł „warunek → akcja”. Warunki: „Zawsze” i „Tu leży mniej niż N <zasób>”; akcje: „Eksploruj”, „Wędruj” i „Idź — <zasób>”. Przyciski „↑”, „↓”, „Usuń” i „Dodaj regułę”. Program można zmieniać przed wysłaniem maga i w trakcie przejścia; zmiana działa od najbliższej wolnej minuty gry.
- **Wysyłanie** (prawa kolumna, gdy nie trwa przejście): postać „Mag żywiołów”, „Mapa: Las” i przycisk „Wyślij”. Każde wysłanie losuje nowy układ mapy.
- **Wiersz stanu** (w trakcie przejścia): „Minuta {minuta} · {bieżąca akcja}”, z dopiskiem „ (pauza)” przy zatrzymanym czasie, oraz przyciski „Pauza”/„Wznów”, „Restart” (od minuty zero, ten sam układ, bieżący program) i „Zakończ” (powrót do wysyłania). Czas płynie minutą gry na sekundę realną.
- **Panel terenu** pod wierszem stanu: rysunek całej mapy 4 × 4 z sześciokątnych kafelków — nieodsłonięte ciemne i puste, odsłonięte jaśniejsze z ikonami zasobów bez liczb, ikona przygaszona przy zapasie zero, gruby bursztynowy obrys na kafelku postaci i kreskowany na celu bieżącego kroku. Obok stoi lista odsłoniętych kafelków: etykieta `(kolumna, wiersz)` i zapas każdego zasobu mapy, „—” gdy kafelek go nie ma. Rysunek nie reaguje na kliknięcia; najechanie na kafelek podświetla jego wiersz listy, a najechanie na wiersz — jego kafelek.
- **Stopka**: wzmianki o autorach ikon — dla każdej „{zasób}: „{tytuł ikony}”, {autor}, game-icons.net, CC BY 3.0, zmienione (bez tła, jasny kolor)” z odnośnikami do źródła ikony i licencji.

Stan gry żyje tylko w pamięci strony: przeładowanie zaczyna od nowa, z pustym programem i bez przejścia.

## Ikony

Ikony zasobów pochodzą z game-icons.net (licencja CC BY 3.0). Ikony są zmienione względem źródła: usunięte czarne tło, kształt w jasnym kolorze. Ich źródła leżą w `assets/icons`, poza katalogiem podawanym przez serwer; `npm run build` kopiuje je do `dist/public/icons`. Tytuły ikon trzymają dane zasobów w `src/browser/sim/data/resources.ts`, obok nazwy pliku ikony; autorów ikon i commit źródła trzyma `src/browser/view/credits.ts`, a stopka strony pokazuje wymagane wzmianki.

## Lokalna strona wyglądu

`npm run kitchen-sink` buduje stronę wszystkich stanów kontrolek, ról, typografii i próbek terenu do `.runs/styleguide/public`, uruchamia serwer pod `127.0.0.1` na wolnym porcie wybranym przez system i otwiera wypisany adres w domyślnej przeglądarce. Zakończ serwer przez Ctrl+C. Po zmianie źródeł uruchom komendę ponownie.

- `npm run kitchen-sink -- --build-only` buduje pliki i kończy działanie, bez serwera i otwierania przeglądarki.
- `npm run kitchen-sink -- --no-open` buduje i udostępnia stronę, wypisując adres do ręcznego otwarcia.

Gdy automatyczne otwarcie nie powiedzie się, serwer działa dalej, a komunikat podaje użyteczny adres. Otwarcie przeglądarki nie potwierdza, że strona została poprawnie narysowana. Strona pokazuje statyczne próbki i nie steruje grą. Jej źródła są w `tools/styleguide`, a osobną kompilację opisuje `tsconfig.styleguide.json`. Zwykłe `npm run build` jej nie zawiera i nadal buduje tylko aplikację do `dist`.

## Praca lokalna i sprawdzenie

`npm run dev` buduje aplikację i uruchamia serwer. Nie obserwuje plików: po edycji zatrzymaj proces przez Ctrl+C i ponów komendę.

`npm test` buduje aplikację i wykonuje testy HTTP, test błędu startu przy zajętym porcie 3000 oraz testy symulacji i widoku w Node, bez przeglądarki. Następnie wykonuje kolejno testy narzędzi `tests/quality/*.test.mjs`, żeby budowania nie usuwały plików używanych przez inne testy. Test strony stanów sam kompiluje swoje moduły; zwykłe budowanie aplikacji ich nie kompiluje.

W przeglądarce sprawdź, że `/main.js` ładuje się bez błędu, konsola nie zawiera błędów wykonania, a strona pokazuje panel „Program”, wysyłanie maga i stopkę z wzmiankami; po „Wyślij” — wiersz stanu z minutą rosnącą co sekundę oraz panel terenu z listą kafelków.

Testy wdrożenia: `python -B .the-way/gate/run_tests.py tests/deploy` i `python -B .the-way/gate/run_tests.py tests/agent_workflow`.

Nieznane `/api`, `/api/` i ścieżki pod `/api/` otrzymują 404 JSON. Pozostałe brakujące ścieżki otrzymują zwykłe 404. Serwer podaje wyłącznie `dist/public`.

Kod przeglądarki jest w `src/browser` — symulacja gry w `src/browser/sim`, ekrany w `src/browser/view` — a kod serwera w `src/server`. Kompilacje mają osobne konfiguracje typów; zależności i plik blokady są wspólne. Konta, zapis stanu i serwerowa część gry jeszcze nie istnieją; aplikacja jest wdrażana na serwer testowy przez kontener i skill `loop2-deploy`.
