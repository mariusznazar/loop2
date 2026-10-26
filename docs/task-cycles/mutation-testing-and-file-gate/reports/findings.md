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

