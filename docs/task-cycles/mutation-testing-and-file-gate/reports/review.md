FAIL 85c6e6404b4a05e6bfad6cae8098fad3d80e6e89

## Zakres i werdykt

Przegląd całej zmiany, zakres `7012abc..85c6e6404b4a05e6bfad6cae8098fad3d80e6e89`, jeden commit `85c6e64 test: add simulation mutation checks and focused test gate`. HEAD zgadzał się z przekazanym SHA, a przypięty submoduł z gitlinkiem: `574a37b9ab9572f876298f4cc10754581222d3f0`. Recenzent nie jest autorem zmiany. Bez specu i planu; uwagi pochodzą z tego jednego commita, nie z wycinków planu.

Dwa oddzielne przebiegi: najpierw kod, testy, zależności i działanie bramki; potem dokumentacja i fundament, porównane z całym zamrożonym zadaniem i jego sześcioma ustaleniami. Dwie uwagi Important w zakresie zadania blokują PASS. Critical: 0, Important: 2, Minor: 0, poza zakresem: 0 uwag. Nie zmieniono żadnego pliku produktu, indeksu ani gałęzi.

## Blokery

### 1. Wyjście z importowanego modułu Pythona daje sukces bez testów

**Grade:** Important. **Scope:** in scope — To do 4 i 7, Q3, ustalenie 4, D-77 i focused-test-execution. **Wątek:** nowy.

**Kotwica:** `scripts/test.py:29`.

**Do wklejenia:** Plik `test_*.py` zawierający `raise SystemExit(0)` albo `raise SystemExit()` kończy obecnie `npm test -- <plik>` kodem 0 bez wykonania ani jednego testu. Wyjątek wychodzi z `exec_module` przed kontrolą `testsRun`; trzeba zamienić takie przerwanie ładowania na porażkę i objąć je testem bramki.

**Dlaczego to zgłaszam:** Wybranie pliku ma dawać dowód wykonania testu, także gdy plik jest błędny lub kończy inicjalizację przed utworzeniem przypadków. Nowy loader wykonuje kod modułu w samym procesie bramki. `SystemExit` nie jest zwykłym wyjątkiem importu: z kodem 0 lub bez kodu kończy ten proces sukcesem, zanim powstanie suite i zanim linie 32–34 odmówią pustego wykonania. To różni się od istniejącego pełnego runnera, który w procesie rodzica wymaga także raportu unittest zakończonego OK.

Reprodukcja użyła rzeczywistego wpisu npm i niezmienionych skryptów z badanego commita poprzez `GateFixture`, w osobnym katalogu tymczasowym. Dla `tests/test_exit.py` o treści `raise SystemExit(0)\n` i `tests/test_exit_none.py` o treści `raise SystemExit()\n` wynik wyniósł 0, stdout był pusty, stderr zawierał tylko komunikaty npm — bez raportu testów. Kontrola pozytywna, zwykły plik z jednym `unittest.TestCase`, dała 0 z `Ran 1 test` i `OK`. Skrypt odtwarzający leży w `.runs/task-cycles/mutation-testing-and-file-gate/reports/review-probe.py`.

Poprawka powinna dopuszczać sukces wyłącznie po uzyskaniu wyniku testów z wykonaną liczbą przypadków; co najmniej przechwycić `SystemExit` podczas ładowania/zbierania modułu i zwrócić niezero. Dodany przypadek musi wywoływać bramkę przez npm. Nie chodzi o zabezpieczanie procesu przed dowolnym złośliwym kodem testu ani o `os._exit`; sprawdzony przypadek to zwykłe, obsługiwalne przerwanie importu.

### 2. Pozostawiony sandbox Strykera psuje kontrolę jakości

**Grade:** Important. **Scope:** in scope — integracja narzędzia i jego katalogów tymczasowych (To do 1–2), zgodność z D-29 i działająca bramka. **Wątek:** nowy.

**Kotwica:** `stryker.config.json:10`; powiązane miejsce: `eslint.config.mjs:32`.

**Do wklejenia:** Nowy katalog `.stryker-tmp` jest ignorowany przez git, ale nie przez ESLint. Po przebiegu pozostawiającym sandbox `npm test -- tests/quality/test_quality_invariants.py` oblewa na przerobionych źródłach Strykera — tutaj było 368 błędów — dlatego katalog trzeba wyłączyć z lintera albo umieścić kopie w już wyłączonym katalogu roboczym.

**Dlaczego to zgłaszam:** Kopia Strykera celowo zawiera `@ts-nocheck`, dodatkowy kod instrumentacji i konstrukcje niezgodne z regułami źródeł produktu. Test jakości uruchamia ESLint na `.`; lista `excluded` obejmuje `.runs`, `.the-way`, dist i zależności, lecz nie nowy katalog sandboxów. ESLint znajduje też skopiowaną konfigurację wewnątrz sandboxa i zgłasza błędy jego przerobionych plików. Sam wpis w `.gitignore` nie jest wyłączeniem tego przebiegu ESLint.

Dowód z zastanego rzeczywistego sandboxa `.stryker-tmp/sandbox-5PAEpl`: `npm test -- tests/quality/test_quality_invariants.py` zakończyło się kodem 1, z jedną porażką `test_eslint_source_rules`, 368 błędami i 0 ostrzeżeń. Pierwszy raport dotyczył `.stryker-tmp/sandbox-5PAEpl/src/browser/kitchen-sink/kitchen-sink.ts:9` i zakazu `@ts-nocheck`; kolejne dotyczyły źródeł symulacji i widoku. Pozostałe cztery kontrole jakości, w tym rzeczywisty audyt zależności, przeszły.

Autor pozostawił tę kopię jawnie przez `--cleanTempDir false`, ale problem dotyczy również zwykłej obsługi błędu. Przypięty Stryker 10.0.0 domyślnie usuwa katalog dopiero po powodzeniu, a `node_modules/@stryker-mutator/core/dist/src/stryker.js:60` zachowuje go po błędzie, jeśli `cleanTempDir` nie jest `always`. Nieudany przebieg narzędzia zostawia więc repozytorium, w którym pełna bramka zacznie odrzucać wygenerowany kod zamiast oceniać zmianę produktu. Włączenie katalogu do wyjątków dla wyników tymczasowych albo przeniesienie go pod `.runs` rozwiązuje problem bez osłabienia reguł kodu; przy przeniesieniu trzeba zachować poprawną ścieżkę bezpośredniego kompilatora. Sama jednorazowa likwidacja kopii nie usuwa przyczyny.

## Warto poprawić / nity

Brak osobnych uwag Minor.

## Dobre i wyniki pozostałej kontroli

- Pełna ścieżka zachowuje kolejność i argumenty poprzedniego łańcucha: budowanie, te same pliki/wzorce Node, niezmieniony runner wszystkich katalogów Pythona, kontrola fundamentu; po błędzie zatrzymuje dalsze etapy. Sprawdzono kod obu wersji i rzeczywiste wybieranie Node w teście niezmiennika.
- Wybranie Node rzeczywiście buduje grę; Python ma dokładne ładowanie wskazanego modułu, import pomocników z sąsiedztwa i brak automatycznego budowania. Testy sprawdzają brak uruchomienia sąsiadów, brak pozostałych etapów, nieprawidłowe ścieżki, kilka argumentów, puste pliki/grupy, same pominięcia i propagację zwykłych porażek/import errors.
- Zmieniony test niezmiennika: `tests/quality/test_node_test_selection.py` (node-test-selection). Oparcie go na znacznikach rzeczywiście wykonanych plików usuwa poprzednie ręczne odtwarzanie globów. Nowe testy niezmienników: `tests/quality/test_test_gate.py` i `tests/quality/test_mutation_test_selection.py`.
- Przeczytane czerwone logi są rzeczowymi dowodami: brak guardów daje pięć porażek pustych/pominiętych przebiegów; usunięcie world.test.mjs daje różnicę zbiorów; usunięcie wzorca widoku wskazuje siedem pominiętych plików. Dowody są ograniczone do tych błędów — nie pokrywają uwagi 1.
- Stryker core i TAP runner mają dokładną wersję 10.0.0; nie dodano type checkera. Porównanie lockfile'ów daje 144 nowe ścieżki pakietów, żadnej usuniętej i żadnej zmiany wersji przy istniejącej ścieżce. Poprawiony qs jest ograniczony do zależności Strykera; kod audytu i jego próg nie zostały zmienione.
- Obejrzano zapis rzeczywistego przebiegu autora, raport JSON i istniejący sandbox, a nie tylko relację autora. Log pokazuje pojedynczy build i 18 plików testów; wynik obejmuje 772 mutanty, 87 ocalałych oraz 4 bez pokrycia i 11 timeoutów. W konsoli są lokalizacje plik:wiersz; schema przypiętego narzędzia ma domyślne `thresholds.break: null`. Konfiguracja nie narzuca nowego progu.
- W realnym sandboxie nie ma `.runs` ani `.the-way`; `dist` zawiera wynik kompilacji przeglądarki. Kod ProjectReader wyklucza podane katalogi przed kopiowaniem, własny tempDirName i node_modules. To potwierdza mechanizm zapobiegania rekurencyjnemu kopiowaniu; uwaga 2 dotyczy późniejszego lintera, nie tych wykluczeń.

## Osobny przebieg dokumentacji i fundamentu

Porównano pełne nowe/zmienione wpisy D-77, D-94, D-95, focused-test-execution, mutation-test-selection, oba fakty środowiska i część build-tools z zamrożonym zadaniem.

| Element zadania | Wynik |
|---|---|
| To do 1 | Przypięte narzędzie, prawdziwy przebieg i raportowanie są obecne; audyt w przeglądzie przeszedł. Integracja jakości wymaga uwagi 2. |
| To do 2 | Git i sandbox pomijają wymagane artefakty; linter nie pomija pozostawionego sandboxa (uwaga 2). |
| To do 3 | Mutation testing stoi w wymaganym miejscu, ma D-73/D-94/D-95 i Invariant none, polecenie, ocenę ocalałych kopii i mentalne sprawdzanie pozostałych części. |
| To do 4 | Routing działa w sprawdzonych przypadkach poza sukcesem bez testu z uwagi 1. |
| To do 5 | Command unit test podaje pełny i zawężony przebieg; dwa pozostałe przepisy poprawnie dziedziczą go przez „as in unit test”, co przewiduje szablon. Reguła plików i When to read są zaktualizowane. |
| To do 6 | Zmieniony test nadal obejmuje wszystkie obecne pliki Node. |
| To do 7 | Są dwa nowe niezmienniki i dowody czerwone/zielone; test focused-test-execution nie chroni jeszcze przypadku uwagi 1. |
| To do 8 | Nowa konfiguracja przypisana build-tools; nowe skrypty i testy obejmują już istniejące wzorce tej części. |
| To do 9 | Where in code obejmuje nowe pliki wejścia, konfigurację i testy, a wspólny pomocnik leży w wymienionym tests/quality. |
| Acceptance criterion | Statycznie zachowano wszystkie etapy; test Node potwierdza wybór i wywołanie obu dalszych etapów w fixture. Cały rzeczywisty przebieg należy do orkiestratora i nie jest tu deklarowany jako PASS. |
| Ustalenia 1–5 | Zachowano zakres simulation, brak type checkera, warunek dołączenia widoku i usunięcia narzędzia, jeden plik, odmowę pustego wyniku i kompletność listy. Treść ustalenia 4 jest właściwa, lecz wykonanie narusza ją w uwadze 1. |
| Ustalenie 6 | Rozdzielenie na dwa fakty zachowuje TAP/node:test, instrumentację z @ts-nocheck i pojedynczy build oraz przyjęcie źródeł przez TypeScript. Oba fakty są podstawą D-94. |

Zweryfikowano wskazane niezmienne źródła wydawców: [TAP runner](https://raw.githubusercontent.com/stryker-mutator/stryker-js/cb3bd8fe25d5215422c9b632357062d3a43fcf92/docs/tap-runner.md), [konfigurację Strykera](https://raw.githubusercontent.com/stryker-mutator/stryker-js/cb3bd8fe25d5215422c9b632357062d3a43fcf92/docs/configuration.md), [inicjalizację sandboxa](https://raw.githubusercontent.com/stryker-mutator/stryker-js/cb3bd8fe25d5215422c9b632357062d3a43fcf92/packages/core/src/sandbox/sandbox.ts) i [baseline kompilatora](https://raw.githubusercontent.com/microsoft/typescript-go/2bd066d87f5bafd315be9f40889d0a60b9e58e0b/testdata/baselines/reference/submodule/conformance/tsNoCheckForTypescript.js). Lokalne package.json wydawców potwierdzają odpowiadające im gitHead i wersje 10.0.0 oraz 7.0.2. Brak osobnej uwagi o wierności dokumentów; D-73, D-83, D-33 i D-85 pozostają bez zmiany znaczenia.

## Declined to judge

- Dwanaście istniejących zarzutów audytu testów wymienionych w Context zadania: jawnie odłożone przez Q5; nie są naprawą tej zmiany.
- Naprawa istniejącego problemu Windows CIM/listener detection: kod tego testu nie zmienił się, a przekazano dowód występowania na bazie; nie oceniam go jako nowej usterki tej zmiany.
- Indywidualna akceptacja lub naprawa 87 historycznych mutantów kalibracyjnego przebiegu: nie zmieniono kodu simulation; zadanie wdraża narzędzie i jego procedurę.
- Limit całego przebiegu: jawnie poza zakresem; nie dodano go.

## Wykonane kontrole

Wszystkie polecenia repozytorium uruchamiano z `C:/Storage/repos/loop2/.runs/worktrees/mutation-gate`. Żadnego testu repozytorium nie uruchamiano z pominięciem `npm test`.

| Polecenie / metoda | Exit | Wynik |
|---|---:|---|
| `git rev-parse HEAD`; `git log --oneline 7012abc..85c6e6404b4a05e6bfad6cae8098fad3d80e6e89` | 0 | Jeden przekazany commit, zgodny HEAD. |
| `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD` | 0 | Zgodne 574a37b9ab9572f876298f4cc10754581222d3f0. |
| `git diff 7012abc..85c6e6404b4a05e6bfad6cae8098fad3d80e6e89 -- scripts tests package.json stryker.config.json .gitignore`; analogiczny diff foundations, README.md, guidelines/testing.md | 0 | Pełne hunki dwóch przebiegów; lockfile dodatkowo porównany strukturalnie. |
| `python -B .runs/task-cycles/mutation-testing-and-file-gate/reports/review-probe.py` | 0 | Reprodukcja przez npm: dwa pliki z SystemExit kończą się 0 bez testów; kontrola rzeczywistego testu daje 0 z raportem. Zero skryptu oznacza zakończone badanie, nie spełnienie wymagania. |
| `npm test -- tests/quality/test_test_gate.py` | 0 | 6 testów; nie obejmują przypadku uwagi 1. |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | 1 test, realne wybieranie plików Node i znaczniki późniejszych etapów. |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 | 1 test, lista 18 plików zgodna z katalogiem poza rules. |
| `npm test -- tests/quality/test_audit_dependencies.py` | 0 | 2 testy, w tym odmowa nieczytelnego raportu i nowego advisory. |
| `npm test -- tests/quality/test_quality_invariants.py` | 1 | 5 testów: 4 przechodzą, ESLint pada na 368 błędach sandboxa (uwaga 2). Audyt rzeczywistego lockfile'u przeszedł. |
| `python -B .runs/task-cycles/mutation-testing-and-file-gate/reports/inspect-lock.py` | 0 | 144 added_paths, 0 removed_paths, brak zmienionych wersji istniejących ścieżek. Skrypt przeczytany przed użyciem. |
| `git diff --check 7012abc..85c6e6404b4a05e6bfad6cae8098fad3d80e6e89`; `git status --short` | 0 | Brak błędów odstępów i zmian śledzonych. |
| Odczyt czerwonych logów autora, runtime.log, sandboxa, schemy i kodu Strykera | 0 | Mechanizmy i dowody opisane wyżej; nie jest to ponowiony przebieg mutacyjny. |
| Odczyt czterech oficjalnych źródeł przez web | n/a | Dostępne; treść potwierdza oba fakty. Bez uwierzytelnienia i bez danych właściciela w żądaniach. |

Jedno pomocnicze wyszukanie rg zakończyło się niepowodzeniem, ponieważ zgadnięta ścieżka `node_modules/@stryker-mutator/api/dist/src/core/stryker-options.js` nie istnieje. Nie potraktowano tego jako dowodu braku ustawienia: właściwy domyślny próg odczytano ze `node_modules/@stryker-mutator/core/schema/stryker-schema.json`.

Niewykonane: pełny post-change `npm test` (własność orkiestratora), osobne powtórzenie pełnego Strykera (zweryfikowano rzeczywiste istniejące artefakty, źródła i konfigurację), inne platformy, ręczne oględziny UI (brak zmiany UI). Nie nadaję tym kontrolom wyniku PASS. Kontroli fundamentu nie powtarzano niezależnie od cyklu; relacja autora o jej sukcesie pozostaje relacją autora.

## Sięgnięcia poza przekazanie

Własny wybór fundamentu i wytycznych objął build-tools, agent-workflow oraz zmienione wpisy odnoszące się do simulation/browser-view, odpowiednie decyzje i niezmienniki, słowniki produktu i przypiętego procesu; przeczytano całe guidelines/coding.md i guidelines/testing.md. Pliki rodzaju kodu nie są potrzebne dla nowego skryptu bramki: budowanie i punkty wejścia mają odłożone osobne wzorce w D-28. Żaden plik interfejsu nie zmienia się.

Dodatkowo odczytano:
- `.the-way/product-guidelines/testing/template.md` i `product-guidelines/template.md`: ocena kolejności, pól i dziedziczenia Command.
- `.the-way/gate/run_tests.py`: rzeczywisty kontrakt pełnego przebiegu i sposób odmowy wyjścia bez raportu.
- `scripts/audit_dependencies.py`, `tests/quality/test_audit_dependencies.py`, `tests/quality/test_quality_invariants.py`, `eslint.config.mjs`: granica rejestru, odmowa błędów i przyczyna wykrytego błędu sandboxa.
- Zainstalowany kod ProjectReader, TemporaryDirectory i stryker.js oraz schema i metadane pakietów: wykluczenia kopiowania, domyślny brak progu, zachowanie sandboxa przy błędzie i zgodność cytowanych wersji.
- Cztery źródła wydawców podlinkowane wyżej: niezależne sprawdzenie nowych faktów środowiska.
- Logi czerwonych prób autora oraz istniejący raport i sandbox mutacyjny: sprawdzenie jego twierdzeń o dowodach.

Pytania do orkiestratora: brak.

