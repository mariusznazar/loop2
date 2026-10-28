# Testing guidelines — loop2

- **Discipline:** testing
- **Applies to:** simulation · browser-view · account-server · build-tools · deployment · agent-workflow

## When to read

Przed napisaniem lub zmianą testu; przy przeglądzie porównaj test z tymi zasadami.
Ogólne kontrole jakości kodu nadal określa `guidelines/coding.md` (D-28).
Przyjęty szablon przypiętego the-way określa D-73; jego sześć odstępstw
to D-74, D-75, D-76, D-77, D-78 i D-79.
D-77 jest odstępstwem tylko w sprawie limitu czasu całego przebiegu;
wybór jednego pliku działa przez to samo `npm test`.

## Levels

| Level | Decision |
|---|---|
| unit test | D-81 |
| integration test | D-81 |
| smoke test | D-81 |

Znaczenia „unit test” i „integration test” stoją w `foundations/glossary.md`.
Poziom wynika z zasobów używanych przez test, nie z katalogu.

| Part | Where its complexity lies |
|---|---|
| simulation | W obliczeniach: regułach gry, czasie i losowaniach. |
| browser-view | W obliczaniu rysunku i list z danych gry oraz w zdarzeniach, fokusie i SVG prawdziwej przeglądarki, których ręczny model dokumentu nie dowodzi. |
| account-server | W połączeniach: HTTP, plikach gry i starcie procesu. |
| build-tools | W połączeniach: plikach, procesach i rejestrze npm. |
| deployment | W połączeniach: git, kontenerze i serwerze. |
| agent-workflow | W zgodności plików repozytorium: kopiach skilli i instrukcjach. |

`product-foundation` sprawdza skrypt the-way; ta część nie ma własnych testów.

## Rules

### Choosing the level

- **Decision:** D-73 · D-74 · D-75 · D-79 · D-81
- **Invariant:** none
- **Good:** Test utraty ciepła uruchamia regułę symulacji, a test odmowy HTTP wysyła rzeczywiste żądanie.
- **Bad:** Test błędu serwera zastępuje właśnie ten serwer uproszczonym modelem.

Autor nazywa konkretny błąd, przed którym chroni każdy stały test, i wybiera
najmniejszy fragment produktu, który rzeczywiście go wykrywa. Recenzent sprawdza
ten wybór. Nie zastępuj mechanizmu, którego awarię sprawdzasz. Nie ustalamy
procentowego udziału poziomów.

| Pytanie o zachowanie | Jeśli tak |
|---|---|
| Czy regułę lub obliczenie można wykonać bez sieci, plików i przeglądarki? | Stały unit test. |
| Czy zdanie ma być prawdziwe dla wszystkich danych, np. operacja daje się odwrócić albo zachowuje ograniczenie po każdym kroku? | Rozważ dane generowane tylko po wskazaniu reguły gry i konkretnego ryzyka wielu kombinacji, którego kilka czytelnych przykładów nie chroni; potrzebujące tego zadanie wybiera narzędzie i koszt utrzymania (D-74). |
| Czy kod rozmawia z własnymi plikami, bazą lub lokalnym serwerem? | Integration test rzeczywistej operacji, jednej zależności naraz. |
| Czy kod rozmawia z cudzą usługą? | Dla rejestru npm kontrolowane odpowiedzi wymuszają błędy w testach audytu, a prawdziwy audyt w bramce sprawdza format odpowiedzi bez osobnego testu zgodności (D-79, D-33). |
| Czy błąd może leżeć w konfiguracji lub połączeniu części? | Smoke test po budowaniu, sprawdzający start gotowej aplikacji. |
| Czy to ścieżka gracza, której awarię nazwie „gra nie działa”? | Ręczna kontrola zmienionej ścieżki i ocena warunku powrotu do automatyzacji (D-75). |
| Czy błąd wykrył dopiero test wielu części albo człowiek? | Test najmniejszego fragmentu, który ujawnia ten błąd. |
| Czy kod tylko kopiuje lub przekazuje dane, bez własnej reguły? | Bez osobnego stałego testu, chyba że to granica zaufania. |
| Czy nie da się utrzymać stałego wyniku dla tego samego kodu? | Przegląd albo jednorazowe sprawdzenie zamiast stałego testu. |

Nie dodajemy biblioteki ani testów na generowanych danych bez spełnienia D-74.

### A lower test for a bug caught high

- **Decision:** D-73
- **Invariant:** none
- **Good:** Naprawa błędu ujawnionego podczas gry dodaje przypadek symulacji, który rzeczywiście go odtwarza.
- **Bad:** Naprawę chroni tylko ponowne ręczne przejście gry.

Przy naprawie błędu wykrytego wysoko dodaj test na najniższym poziomie, który
rzeczywiście go wykrywa. Nie wymuszaj drugiego testu niżej, gdy wymagałoby to
zastąpienia mechanizmu, którego awarię sprawdzasz.

### Where the expected value comes from

- **Decision:** D-73 · D-80 · D-82
- **Invariant:** none
- **Good:** Oczekiwana suma plecaka wynika z jawnych składników i arytmetyki.
- **Bad:** Oczekiwany czas przeżycia zapisano z dzisiejszego wyniku symulacji bez uzgodnionego wymagania.

Oczekiwanie pochodzi z uzgodnionego dokumentu, niezależnej zależności, awarii
liczonej jako niepowodzenie lub jawnej oceny człowieka. Dzisiejszy wynik
programu nie jest dowodem poprawności, również w zapisanych obrazach i stanach.
Test parametru gry może użyć konkretnych liczb; oczekiwany czas przeżycia,
tempo postępu lub trudność mapy wymagają uzgodnionego wymagania (D-80).

Dokumentami źródłowymi są fundament loop2 — decyzje, niezmienniki i słownik —
zaakceptowane zadania w `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/`
i jego podkatalogu zadań (stan `ready for cycle` lub wykonane) oraz zatwierdzona
`C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md` (D-82).
`C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/koncepcja_projektowa.md`
jest szkicem: źródłem jest tylko fragment przytoczony
przez zaakceptowany dokument. Q7c zadania przewodnika przytacza linię 1261
koncepcji jako źródło jednego losowania przy wyborze kroku.

Gdy nazwa testu nie wyjaśnia źródła wartości, komentarz wskazuje plik i linię
albo osobę i datę rozstrzygnięcia. Recenzent pyta przy każdym sprawdzeniu:
„skąd ta wartość?”. Źródła poza repozytorium wymagają dostępu do vaultu;
sam odsyłacz nie jest odczytem źródła.

### Test inputs and expected values

- **Decision:** D-73 · D-74
- **Invariant:** none
- **Good:** Przypadek podaje zawartość plecaka i niezależnie zapisaną sumę.
- **Bad:** Obie strony porównania używają funkcji produktu wyliczającej punkty sześciokąta.

Zapisuj jawnie dane, których dotyczy sprawdzenie, i oczekiwaną wartość tam,
gdzie inaczej wyliczałby je kod produktu. Z uruchomienia produktu pochodzi
wynik sprawdzany. Wolno niezależnie sprawdzać zależność geometryczną.
Jeżeli przyszłe zadanie przyjmie dane generowane (D-74), pochodzą one
z generatora biblioteki testowej; oczekiwanie nadal wynika z niezależnej
zależności — odwrócenia operacji, niezmiennika lub prostszego rozwiązania
napisanego z wymagania, nie skopiowanego z kodu. Znaleziony kontrprzykład
zostaje zwykłym testem z wartościami wypisanymi wprost.

### Changing an existing test

- **Decision:** D-73
- **Invariant:** none
- **Good:** Usunięcie sprawdzenia numeru reguły wskazuje wymaganie chroniące zachowanie i pozostawia kontrolę jego skutku.
- **Bad:** Zmieniono oczekiwanie tylko dlatego, że test nie przechodził.

Zmiana oczekiwania, osłabienie sprawdzenia, usunięcie, pominięcie i wyłączenie
testu wymagają przyczyny po stronie danych albo wymagania oraz wskazania jej
źródła. Bez niej przegląd traktuje zmianę jako ukrywanie błędu. Dotyczy to
także zastąpienia równości sprawdzeniem zawierania, usunięcia liczby elementów
i zwiększenia tolerancji. Błędny test można poprawić na tej samej zasadzie.

### Behaviour, not implementation

- **Decision:** D-73
- **Invariant:** none
- **Good:** Po zmianie programu test sprawdza koniec rozpoczętej akcji, jej skutek i kolejną wybraną akcję.
- **Bad:** Wymaga tego samego numeru reguły albo całej struktury bieżącej akcji, choć reguła gry ich nie określa.

Sprawdzaj wymagane zachowanie. Przy każdej asercji recenzent ocenia, czy
poprawna zmiana wykonania zachowująca wymaganie mogłaby ją złamać; jeśli tak,
jest to szczegół implementacji. Nie utrwalaj indeksu reguły, dokładnego tekstu
odmowy ani kolejności wewnętrznych wywołań bez wymagania, które je ustala.
Porównanie całego stanu również wymaga uzasadnienia. Kontrola przygotowania
stoi przed działaniem, jest oznaczona jako warunek wstępny i sprawdza cechę
przypadku wynikającą z wymagania, nie techniczną strukturę danych.

### Trust boundaries

- **Decision:** D-73 · D-76 · D-86 · D-96 · D-97 · D-99 · D-100 · D-102 · D-103 · D-104 · D-109 · D-110 · D-129 · D-131 · D-27 · D-33 · D-45 · D-46 · D-09 · D-11
- **Invariant:** icon-file-content · public-file-access · account-session-authorization · blocked-account-access · account-mutation-request-guards · account-request-transport · account-attempt-limits · account-attempt-tracking · dependency-audit-refusal · font-file-provenance · preview-server-access · loop2-deploy-trigger-input
- **Good:** Spreparowana zakodowana ścieżka dostaje odmowę i nie ujawnia pliku spoza katalogu publicznego.
- **Bad:** Sprawdzenie samego uruchomienia serwera jest przedstawione jako dowód odmowy.

Każda granica zaufania z mapy części ma regułę odmowy i przynajmniej jeden
stały test sprawdzający odmowę bezpośrednio, oznaczony niezmiennikiem i raz
widziany z porażką. Oczekiwanie bierze się z decyzji uprawnień. Wykorzystuj
istniejącą ochronę, bez drugiego testu dla samego przewodnika. Kompletność tej
kontroli zależy od kompletności mapy. Granica, która nie odmawia, wymaga
zaakceptowanego oznaczenia niezmiennika jako naruszonego; brak testu sam tego
nie dowodzi. Granicę będącą wyłącznie konfiguracją cudzej usługi sprawdza
przegląd każdej dotyczącej jej zmiany.

| Granica z mapy | Reguła i bezpośrednie sprawdzenie |
|---|---|
| `assets/icons/` | `icon-file-content`: spreparowane prawdziwe pliki, `tests/invariants/test_icon_file_content.py`, przypadek `test_control_the_scan_flags_each_forbidden_form`. |
| `assets/fonts/` | `font-file-provenance`: przegląd pochodzenia z wydania github.com/vercel/geist-font; czasowe odstępstwo D-76. |
| `src/server/` | `public-file-access`: przypadek „raw and encoded traversal cannot expose files outside dist/public” w `tests/http.test.mjs`. `account-session-authorization`: przypadki „a stored session alone selects the account, whatever identifier the request supplies” oraz „absent, tampered, unknown, expired and deleted sessions authorize neither lookup nor logout” w `tests/http.test.mjs`, na prawdziwym HTTP i SQLite. `blocked-account-access`: przypadki „no session of a blocked account authorizes lookup or logout, in any browser, also after unblocking” oraz „a blocked account's correct password gets its own refusal and no session, a wrong one the common message, and only the wrong one counts” w `tests/http.test.mjs`, na prawdziwym HTTP i SQLite. `account-mutation-request-guards`: przypadek „refused state-changing requests change no account or session and do no password work” w `tests/transport.test.mjs`, dla trzech tras zmieniających stan. `account-request-transport`: przypadek „transport refuses ambiguous proxy metadata before loading live sessions” w `tests/transport.test.mjs`; sprawdza odmowę dla `GET /api/account` z ważną sesją, a to, że bramka transportu stoi też przed trasami `POST`, pilnuje przegląd. `account-attempt-limits`: przypadki „five failed logins lock an address for 15 minutes from the fifth, also for its correct password”, „one client address is admitted twenty failed logins per rolling 15 minutes and success does not clear them”, „one client address creates five accounts per rolling hour, and refused registrations take no slot” oraz „a disconnected login keeps its reservation until its password work completes and still counts” w `tests/http.test.mjs`; to, że odmowa poprzedza pracę hasła, pilnuje przegląd. `account-attempt-tracking`: przypadek „full limiter tables refuse newcomers without evicting a live restriction” w `tests/http.test.mjs`, dla logowania; rejestrację pilnuje przegląd. |
| `package-lock.json` | `dependency-audit-refusal`: odmowa nieczytelnego raportu i nowego zgłoszenia w `tests/quality/test_audit_dependencies.py`; kontrola samego lockfile'u pozostaje osobnym `introduced-npm-vulnerabilities`. |
| `scripts/audit_dependencies.py` | Ten sam test odmowy audytu, bez dublowania; podstawiona odpowiedź nie dowodzi działania prawdziwego rejestru (D-79). |
| `scripts/kitchen-sink.mjs` | `preview-server-access`: przegląd ograniczenia do własnego katalogu podglądu i komputera dewelopera; czasowe odstępstwo D-76. |
| `deploy/` | `loop2-deploy-trigger-input`: spreparowane wejścia i commit spoza gałęzi wdrożenia w `tests/invariants/test_loop2_deploy_trigger_input.py`. |

Dla fontów i serwera podglądu do pierwszej zmiany danej granicy obowiązuje
przegląd zamiast stałego testu (D-76). Brak testu nie jest dowodem skutecznej
odmowy. Pierwsze zadanie zmieniające granicę wprowadza jej test odmowy
i przestawia metodę niezmiennika na `test`. `application-build-kitchen-sink`
sprawdza oddzielenie wyniku budowania, nie serwowanie podglądu.

| Who | Resource | Action | Expected result | Decision |
|---|---|---|---|---|
| Każdy odwiedzający | Plik zbudowanej gry w katalogu publicznym | GET | Plik podany | D-86 |
| Każdy odwiedzający | Plik spoza katalogu publicznego, również przez zakodowaną ścieżkę | GET | 400, 403 albo 404, bez treści pliku i bez strony gry | D-86 |
| Odwiedzający bez ważnej sesji: brak, podrobione, nieznane, wygasłe albo usunięte ciasteczko | Konto i sesja | GET /api/account; POST /api/logout spełniający wymagania Origin, JSON i pustego obiektu | JSON 401 z kodem odmowy, bez danych konta i bez zmiany rekordów sesji | D-109 |
| Gracz z ważną sesją tej przeglądarki | Własne konto | GET /api/account | 200 z samym identyfikatorem konta i znormalizowanym adresem, bez zapisu w pamięci podręcznej, bez skrótu hasła i identyfikatora sesji | D-109 |
| Gracz z ważną sesją tej przeglądarki | Sesja tej przeglądarki | POST /api/logout | 204 dopiero po usunięciu rekordu, z ciasteczkiem wyczyszczonym w tym samym zakresie; sesje innych przeglądarek zostają; nieudane usunięcie daje błąd zamiast 204 | D-109 · D-97 |
| Każdy wywołujący | Inne konto albo sesja wskazane identyfikatorem w żądaniu | GET /api/account, POST /api/logout | Identyfikator w żądaniu nie daje uprawnień: odczyt zwraca własne konto albo 401, a wylogowanie kończy co najwyżej sesję tej przeglądarki, bez ważnej sesji zwraca 401, a sesje wskazanego konta zostają | D-109 · D-97 |
| Odwiedzający bez konta, bez zatwierdzenia przez właściciela i bez potwierdzania adresu | Nowe konto | POST /api/accounts z nieużywanym adresem, hasłem i jego powtórzeniem w żądaniu spełniającym wymagania Origin i JSON | 201 z identyfikatorem konta i znormalizowanym adresem dopiero po zapisaniu świeżej sesji tej przeglądarki; błąd zapisu sesji nie daje sukcesu, a utworzone konto zostaje do późniejszego logowania | D-96 · D-109 |
| Odwiedzający z adresem bez ważnej postaci albo z hasłem poza zakresem 12–128 punktów kodowych lub różnym od powtórzenia | Nowe konto | POST /api/accounts | Odmowa 4xx bez konta, bez sesji i bez pracy hasła | D-98 · D-99 |
| Odwiedzający z adresem, który ma już konto, także w równoległych żądaniach albo zapisany inną wielkością liter lub z otaczającymi spacjami | Nowe konto | POST /api/accounts | Odmowa 409 z komunikatem „Konto z tym adresem już istnieje.”; jeden adres ma jedno konto | D-99 · D-100 |
| Odwiedzający ze znanym adresem niezablokowanego konta i poprawnym hasłem | Sesja tej przeglądarki | POST /api/session | 200 z identyfikatorem konta i znormalizowanym adresem dopiero po zapisaniu odnowionej sesji; błąd zapisu sesji nie daje sukcesu, a konto zostaje | D-109 |
| Odwiedzający z nieznanym adresem albo błędnym hasłem | Sesja tej przeglądarki | POST /api/session | Odmowa 401 o tej samej postaci i z tym samym komunikatem „Nieprawidłowy adres e-mail lub hasło.” w obu przypadkach | D-100 |
| Gracz konta zablokowanego przez operatora, z sesją sprzed blokady w dowolnej przeglądarce, także po odblokowaniu konta | Własne konto i sesja tej przeglądarki | GET /api/account; POST /api/logout spełniający wymagania Origin, JSON i pustego obiektu | JSON 401 z kodem odmowy, jak bez ważnej sesji; blokada usunęła rekordy sesji konta, a odblokowanie żadnego nie przywraca | D-129 · D-109 |
| Odwiedzający ze znanym adresem konta zablokowanego przez operatora i poprawnym hasłem | Sesja tej przeglądarki | POST /api/session | Odmowa 403 z kodem `account-blocked` i komunikatem „To konto jest zablokowane.”, bez sesji i bez ciasteczka; próba nie dodaje niepowodzenia do progów prób i żadnego nie zeruje | D-131 |
| Odwiedzający ze znanym adresem konta zablokowanego przez operatora i błędnym hasłem | Sesja tej przeglądarki | POST /api/session | Odmowa 401 z komunikatem „Nieprawidłowy adres e-mail lub hasło.”, jak przy każdym błędnym haśle, liczona jako nieudane logowanie | D-100 · D-131 |
| Odwiedzający przekraczający próg prób: pięć nieudanych logowań na adres e-mail, dwadzieścia na adres klienta w 15 minutach albo pięć utworzonych kont z adresu klienta w godzinie, liczone razem z próbami w toku | Logowanie i rejestracja | POST /api/session, POST /api/accounts | Odmowa 429 z komunikatem „Za dużo prób. Spróbuj ponownie za kilka minut.”; zablokowany adres e-mail odmawia także poprawnego hasła; rejestracja nieważna lub zdublowana i odmowa z powodu pełnej bramki haseł nie zużywają limitu | D-102 · D-103 |
| Każdy wywołujący, gdy tablica śledzonych adresów e-mail lub adresów klienta jest pełna żywych wpisów | Wpisy śledzenia prób | Próba wymagająca nowego klucza | Odmowa bez wypierania żywego wpisu; wpis o zakończonych historiach, blokadach i rezerwacjach zwalnia miejsce | D-103 |
| Każdy wywołujący | Trasy zmieniające stan konta | POST /api/accounts, POST /api/session, POST /api/logout z nagłówkiem Origin brakującym, null, zdublowanym, błędnym albo obcym; Host i nagłówki przekazanego hosta nie wybierają oczekiwanego Origin | Odmowa 4xx przed zmianą konta lub sesji i przed pracą hasła | D-104 |
| Każdy wywołujący | Trasy zmieniające stan konta | POST /api/accounts, POST /api/session, POST /api/logout z treścią inną niż JSON (opcjonalny charset dozwolony), skompresowaną, większą niż 16 KiB, niebędącą obiektem oczekiwanych pól albo z polem niewłaściwego typu | Odmowa 4xx przed zmianą konta lub sesji i przed pracą hasła | D-104 |
| Każdy wywołujący przez pośrednika | Żądania kont na czterech trasach | Brakujący, zdublowany, listowy albo błędny X-Forwarded-Proto lub CF-Connecting-IP; X-Forwarded-For, X-Real-IP i Forwarded nie wybierają adresu klienta | Odmowa 4xx przed odczytem sesji i pracą hasła; pliki publiczne nadal podane bez metadanych pośrednika; adres klienta dla limitów to znormalizowana wartość CF-Connecting-IP | D-110 |

### AI in tests

- **Decision:** D-73
- **Invariant:** none
- **Good:** Przypadek znaleziony przez agenta staje się zwykłym testem z niezależnym oczekiwaniem.
- **Bad:** Automatyczna naprawa testu osłabia asercję, żeby uzyskać sukces.

AI nie jest poziomem testów. Test napisany przez AI spełnia wszystkie te
zasady; agent badający produkt znajduje przypadki dla zwykłych testów.
Sędzia AI może wejść do stałego testu tylko tam, gdzie zwykłe porównanie
nie sprawdza zachowania: daje tak/nie, jest sprawdzony na przykładach
ocenionych przez człowieka, działa na przypiętej wersji modelu, a przewodnik
określa postępowanie z rozrzutem ocen. Narzędzie samodzielnie naprawiające
test zmienia tylko sposób odnalezienia obiektu działania; zmiana asercji
lub pominięcie czerwonego testu podlega Changing an existing test.
Zachowanie każdego narzędzia AI używanego w testach wymaga faktu środowiska
z wersją i datą odczytu źródła. Testy loop2 nie używają takiego narzędzia.

### Mutation testing

- **Decision:** D-73 · D-94 · D-95
- **Invariant:** none
- **Good:** Recenzent uruchamia narzędzie na zmienionym pliku symulacji i wskazuje, którą przeoczoną zmianę zachowania wykryje dodana asercja.
- **Bad:** Autor dopisuje asercje wyłącznie po to, by podnieść procent zabitych mutacji.

Dla zmienionych plików `simulation` recenzent uruchamia lokalny StrykerJS
bez dodatku sprawdzającego typy:

```sh
node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/hex.ts"
```

Zastąp ścieżkę zmienionym plikiem albo listą plików oddzielonych przecinkami;
zakres wierszy można podać jako `src/browser/sim/hex.ts:10-30`.
`stryker.config.json` ogranicza domyślny zakres do `simulation` i wymienia
pliki `tests/sim/*.test.mjs` poza `rules.test.mjs`, który sprawdza tekst źródeł.
Wynik w konsoli pokazuje plik i wiersz ocalałej zmiany; raport JSON trafia
do `.runs/stryker/mutation.json`, a kopie robocze do `.stryker-tmp/`.
Krok `buildCommand` kompiluje przerobione źródła raz na przebieg.
Testy Pythona i widoku nie biorą udziału w tym przebiegu, więc ocalała
zmiana nie dowodzi sama w sobie braku ochrony w pełnej bramce.

Każdą ocalałą zmianę recenzent klasyfikuje: rzeczywista luka wymagająca
asercji, zmiana równoważna, kod niekompilowalny albo zachowanie niewarte
utrwalania. Dla trzech ostatnich podaje powód. Nie ustalamy procentowego
progu wyniku ani nie utrwalamy szczegółu implementacji dla poprawy liczby.
Autor dodaje asercję tylko dla rzeczywistej luki w wymaganym zachowaniu.

W pozostałych częściach autor sprawdza w głowie, czy test wykryje prostą
błędną zmianę kodu. `browser-view` dołącza do narzędzia zmianą D-94, gdy błąd
w wyliczaniu rysunku albo list przejdzie przez testy i recenzję.
Jeśli audyt zgłosi ostrzeżenie w zależności wniesionej przez StrykerJS,
którego nie usuwa poprawiona wersja, usuwamy narzędzie i przywracamy
sprawdzanie w głowie autora (D-95); nie osłabiamy audytu.

### Flaky tests

- **Decision:** D-73
- **Invariant:** none
- **Good:** Powtórzenie służy ustaleniu przyczyny różnych wyników na tym samym kodzie.
- **Bad:** Późniejszy sukces usuwa z raportu wcześniejszą porażkę.

Ponowne uruchomienie niestabilnego testu służy diagnozie, nigdy uzyskaniu
zielonej bramki. Wyłączenie lub usunięcie podlega Changing an existing test.

### Test files in the gate

- **Decision:** D-83 · D-77 · D-94
- **Invariant:** node-test-selection · focused-test-execution · mutation-test-selection
- **Good:** Nowy plik ma potwierdzone uruchomienie w `npm test`.
- **Bad:** Plik leży poza wzorcami polecenia, lecz jego obecność jest traktowana jak pokrycie.

Każdy plik `*.test.mjs` pod `tests/` ma wejść do `npm test`; sprawdza to
`tests/quality/test_node_test_selection.py`. `package.json` kieruje bramkę
do `scripts/test.py`, który w pełnym przebiegu przekazuje Node pliki i wzorce.
Pythonowy runner
the-way znajduje katalogi mające śledzony przez git i obecny plik `test_*.py`,
a następnie uruchamia w nich odkrywanie testów unittest. Nowy plik Pythona
jest objęty bramką dopiero po potwierdzeniu jego wykonania; szczególnie nowy
katalog potrzebuje śledzonego pliku. Sama nazwa ani obecność na dysku nie
jest dowodem wykonania.

`npm test -- <plik testu>` przyjmuje dokładnie jeden istniejący plik:
`*.test.mjs` uruchamia po zbudowaniu gry, a `test_*.py` bez budowania.
Nie uruchamia innych testów ani kontroli fundamentu. Błędna ścieżka,
plik niebędący testem i przebieg bez wykonanego testu kończą się porażką;
pusty plik, pusta grupa i same pominięte testy nie są sukcesem.
Chroni to `tests/quality/test_test_gate.py`. Przed requestem nadal wymagany
jest pełny `npm test` bez argumentów. Lista plików symulacji dla narzędzia
mutacyjnego ma osobną kontrolę `tests/quality/test_mutation_test_selection.py`.

## Recipes

### unit test

- **Purpose:** Reguły symulacji i logika widoku w pamięci, także kilku funkcji razem; bez sieci, plików danych testu, procesów i przeglądarki. Import zbudowanego modułu nie jest operacją na danych testowych w pliku. Ręczny model dokumentu nie dowodzi prawdziwych zdarzeń, fokusu ani SVG. (D-81)
- **Files:** `tests/sim/` i `tests/view/`, pliki `*.test.mjs`; poziomu nie wyznacza katalog. Włączanie do bramki opisuje Test files in the gate. (D-83)
- **Shape:** Nazwa opisuje zachowanie i warunek; przygotowanie, działanie, sprawdzenie; jedno zachowanie, ewentualnie tabela jawnie nazwanych wariantów. Bez odtwarzania algorytmu produktu i wybierania oczekiwania po wyniku. (D-78)
- **Doubles:** Brak zależności zewnętrznych do zastąpienia; kod pod testem i generator gry pozostają rzeczywiste. (D-84)
- **Data:** Każdy przypadek ma własne dane, które zmienia; wspólne tylko niemodyfikowane dane i przygotowanie. Wartość rozstrzygająca oczekiwanie stoi w przypadku. (D-73)
- **Time and randomness:** Jawny stan, upływ czasu i ziarno, rzeczywisty generator gry; bez czekania na minuty komputera. Powtarzalność nie zastępuje niezależnego oczekiwania. (D-84)
- **Exemplar:** `tests/sim/traits.test.mjs`, wyłącznie „the count of a hand-made backpack is the pieces of all items together”: jawne dane i niezależne sumy; nie wzorzec czasu ani całej rozgrywki. (D-85)
- **Command:** Pełny przebieg: `npm test`; jeden plik: `npm test -- <plik testu>` (Node po budowaniu, Python bez niego; bez innych testów i kontroli fundamentu). Przed requestem pełny przebieg. (D-77)
- **Time limit:** Brak pliku konfiguracji limitu całego przebiegu. Lokalnych ograniczeń innych testów nie przedstawiaj jako limitu całości. Powrót: konkretny problem czasu diagnozy albo zawieszony przebieg. (D-77)

### integration test

- **Purpose:** Konkretna operacja lub połączenie na prawdziwych plikach, lokalnym HTTP lub procesach, także kontrola plików repozytorium skryptem; start gotowej aplikacji należy do smoke test. (D-81)
- **Files:** `tests/http.test.mjs`, `tests/transport.test.mjs`, `tests/account-storage.test.mjs`, `tests/passwords.test.mjs`, `tests/account-api.test.mjs` i `tests/password-measurement.test.mjs` oraz przypadki `test_*.py` w `tests/invariants/`, `tests/quality/`, `tests/deploy/` i `tests/agent_workflow/`, zgodnie z zasobami, które sprawdzają. Włączanie do bramki opisuje Test files in the gate. (D-83)
- **Shape:** as in `unit test`. (D-78)
- **Doubles:** Rzeczywista zależność, gdy jest szybka, powtarzalna i prosta, potem działające uproszczenie, potem podstawiona odpowiedź lub kontrola wywołania; obce typy za własnym adapterem. Nie zastępuj kodu pod testem; wywołanie sprawdzaj tylko dla skutku widocznego poza produktem. Błąd plików lub HTTP sprawdzaj na prawdziwych plikach tymczasowych lub lokalnym serwerze; podstawiona odpowiedź dowodzi reakcji na błąd, nie zastąpionej operacji. (D-73, D-84)
- **Data:** as in `unit test`; wspólny niemodyfikowany serwer lub kopia zbudowanej aplikacji są dozwolone. (D-73)
- **Time and randomness:** Czekaj na sygnał lub warunek z limitem i obsługą błędu, nie na sam upływ stałej pauzy; okresowe sprawdzanie warunku jest dozwolone. Sprzątaj zasoby także po porażce. Porty procesów serwera wybieraj zgodnie z D-49. (D-84, D-49)
- **Exemplar:** `tests/http.test.mjs`, wyłącznie „raw and encoded traversal cannot expose files outside dist/public”: rzeczywiste żądanie i odmowa. Nie zatwierdza całego pliku ani jego pomocników. (D-85)
- **Command:** as in `unit test`. (D-77)
- **Time limit:** Brak centralnego pliku; lokalne ograniczenia stoją w `tests/http.test.mjs` i `tests/invariants/loop2_invariant_support.py`, a testy procesów także przy swoich wywołaniach. Nie są limitem całego przebiegu; do zmiany wracamy jak w `unit test`. (D-77)

### smoke test

- **Purpose:** Start zbudowanej aplikacji przez jej punkt wejścia lub kontener, gotowość albo prosta odpowiedź; kontrola budowania, konfiguracji i startu, bez dowodu całej gry. (D-81)
- **Files:** `tests/startup.test.mjs` i przypadki `test_*.py` uruchomienia aplikacji lub kontenera w `tests/invariants/` oraz `tests/deploy/`; zasoby, nie katalog, ustalają poziom. Włączanie do bramki opisuje Test files in the gate. (D-83)
- **Shape:** as in `unit test`. (D-78)
- **Doubles:** as in `integration test`; start aplikacji i badane połączenie są rzeczywiste. (D-73, D-84)
- **Data:** as in `integration test`. (D-73)
- **Time and randomness:** as in `integration test`. (D-84, D-49)
- **Exemplar:** `tests/invariants/test_account_server_occupied_address.py`, wyłącznie `test_occupied_address_exits_without_reporting_ready`: normalny start, wymuszony zajęty port, błąd bez gotowości, ponowny normalny start. Wzorzec startu i odmowy, nie pełnego HTTP, kontenera ani gry. (D-85)
- **Command:** as in `unit test`. (D-77)
- **Time limit:** Brak centralnego pliku; lokalne ograniczenia stoją w `tests/startup.test.mjs`, `tests/invariants/loop2_invariant_support.py` oraz przy uruchomieniach procesów i kontenerów w testach. Nie są limitem całego przebiegu; do zmiany wracamy jak w `unit test`. (D-77)

## Not tested on purpose

- Kod jedynie przekazujący lub kopiujący dane, bez własnej decyzji: bez osobnego stałego testu; powrót, gdy pojawi się reguła, przekształcenie lub błąd wymagający ochrony. Nie obejmuje granic zaufania. (D-73)
- Całe ekrany porównywane piksel po pikselu: zmieniony wygląd oglądamy w przeglądarce; powrót przy konkretnej usterce wyglądu lub uzgodnionym wymaganiu dokładnego układu. Reguły wyglądu zachowują istniejące kontrole, a bezpieczeństwo ikon i fontów nie jest wyłączone. (D-87)
- Całe ścieżki gracza w prawdziwej przeglądarce: ręczne sprawdzenie po zmianie; powrót przy błędzie krytycznej ścieżki niewykrytym przez mniejsze testy albo istotnym koszcie powtarzanego sprawdzania ręcznego; zadanie wybiera narzędzie i zakres. (D-75)
- Prawdziwe zdarzenia, fokus i rysowanie SVG: ręczne sprawdzenie w przeglądarce po zmianie; powrót przy usterce niewykrytej przez ręczny model dokumentu albo razem z automatyzacją całych ścieżek. Nie obejmuje granic zaufania. (D-88)

Autor i recenzent sprawdzają warunek powrotu przy każdej zmianie dotyczącej
wyłączonej kategorii (D-89). Wyłączenie nie pozwala usuwać istniejącego testu
bez uzasadnienia według Changing an existing test. Fonty i podgląd mają
czasowe odstępstwo opisane wyłącznie przy Trust boundaries.

## Examples

### Test z jawnym czasem

`tests/sim/time.test.mjs` pokazuje konkretne wejście i oczekiwany wynik bez
czekania na zegar. Test „1000 ms of real time moves the run on by one game minute”
wywołuje `passRealTime(sent(), 1000)` i sprawdza minutę 1 oraz resztę czasu 0.
Inne przypadki tego pliku obejmują przenoszenie ułamków sekundy i pauzę.
To ilustracja jawnego czasu, nie dodatkowy wzorzec poziomu.

### Testy bez dodatkowej ochrony

Duplikat istniejącego testu, osobny test trywialnego przekazania danych lub
pętla po niemal identycznych danych mogą nie wnosić nowego dowodu. Tabela
nazwanych wariantów jednego zachowania, np. różnych spreparowanych ścieżek,
może pokazywać rzeczywiście różne ryzyka.

## Where in code

- `AGENTS.md`
- `guidelines/coding.md`
- `foundations/glossary.md`
- `assets/icons/`
- `assets/fonts/`
- `src/server/`
- `deploy/`
- `scripts/audit_dependencies.py`
- `scripts/kitchen-sink.mjs`
- `package-lock.json`
- `package.json`
- `stryker.config.json`
- `scripts/test.py`
- `scripts/test-node-file.mjs`
- `.the-way/gate/run_tests.py`
- `tests/sim/`
- `tests/view/`
- `tests/invariants/`
- `tests/quality/`
- `tests/deploy/`
- `tests/agent_workflow/`
- `tests/http.test.mjs`
- `tests/transport.test.mjs`
- `tests/account-storage.test.mjs`
- `tests/passwords.test.mjs`
- `tests/account-api.test.mjs`
- `tests/password-measurement.test.mjs`
- `tests/startup.test.mjs`
- `tests/sim/traits.test.mjs`
- `tests/sim/time.test.mjs`
- `tests/invariants/test_account_server_occupied_address.py`
- `tests/invariants/loop2_invariant_support.py`
- `tests/invariants/test_icon_file_content.py`
- `tests/invariants/test_loop2_deploy_trigger_input.py`
- `tests/quality/test_audit_dependencies.py`
- `tests/quality/test_node_test_selection.py`
- `tests/quality/test_test_gate.py`
- `tests/quality/test_mutation_test_selection.py`
