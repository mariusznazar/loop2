# Blocking findings from review 11

### 1. Test limitu nie sprawdza, czy właściwe haszowanie i weryfikacja przestrzegają limitu

**Rodzaj:** nowy wątek. **Waga:** Important. **Zakres:** fragment 1, `c24fbff`.

**Kotwica:** [tests/passwords.test.mjs:21](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/tests/passwords.test.mjs:21). Powiązane miejsca: [tests/passwords.test.mjs:40](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/tests/passwords.test.mjs:40), [src/server/passwords.ts:37](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/src/server/passwords.ts:37), [src/server/passwords.ts:46](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/src/server/passwords.ts:46).

**Do wklejenia:** Test odmowy wywołuje tylko `withPasswordCapacity`, a test rzeczywistego Argon2 uruchamia operacje pojedynczo. Po usunięciu bramki z `hashPassword` i `verifyPassword` cały `npm test` nadal przechodzi, więc test oznaczony niezmiennikiem nie chroni ograniczenia właściwej pracy haseł. Dodaj przypadki na skompilowanych funkcjach z rzeczywistym pakietem, które wykazują wspólny limit i natychmiastową odmowę nadmiarowego hash oraz verify.

**Dlaczego to zgłaszam:** Limit ma chronić proces przed równoczesnymi operacjami natywnymi, których koszt pamięci jest znaczny. Obecny kod używa wspólnej bramki poprawnie; problemem jest brak wymaganej ochrony tej integracji. Dwa zatrzymane callbacki dowodzą działania samego licznika, lecz żadna asercja nie wiąże jego zapełnienia z funkcjami, które faktycznie wywołują Argon2. Osobny proces sprawdza wyłącznie sekwencyjne hash, poprawne verify i niepoprawne verify.

W mojej odizolowanej kopii dokładnego HEAD zastąpiłem obie funkcje bezpośrednimi `return argon2.hash(password, PASSWORD_HASH_PROFILE)` oraz `return argon2.verify(hash, password)`. Pozostawiłem bramkę dostępną dla obecnego testu. Uruchomiony przeze mnie `npm test` przeszedł: 345 testów Node, 275 testów Pythona, trzy znane pominięcia Windows, kontrola fundamentu `0 errors`. Ta sama kopia zawierała też niezależną zmianę z uwagi 2; pełny diff jest w logu przygotowania. Żadna z tych zmian nie wprowadza ścieżki kompensującej drugą: funkcje Argon2 całkowicie przestają korzystać z licznika, a test licznika nie wywołuje ich.

Przykładowa regresja dopuszcza trzy wywołania `hashPassword` rozpoczęte bez czekania na poprzednie, zamiast odrzucić trzecie; przy wybranym profilu są to trzy operacje po 64 MiB zamiast kandydata ograniczonego do dwóch. Jeszcze większy napływ nie ma już granicy ustanowionej przez moduł. Zgodnie ze specyfikacją §5 oraz Checks fragmentu 1 testy mają chronić właśnie tę wspólną granicę, również weryfikację hasła nieistniejącego konta korzystającą później z tego samego API. Nie potrzeba do tego czekać na trasy HTTP. Wystarczy sprawdzić przeciążenie przez oba rzeczywiste API, ich współdzielenie zajętych miejsc i błąd bez kolejki w ograniczonym czasowo procesie. Powtórna kontrola powinna osobno oblać ominięcie bramki dla hash i verify.

Dowód: [przygotowanie i dokładny diff mutacji](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/docs/task-cycles/konta-graczy-i-logowanie/reports/slice1-review-gate-mutants.log), [pełny wynik mojego npm test](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/docs/task-cycles/konta-graczy-i-logowanie/reports/slice1-review-gate-mutants-run.log).

### 2. Po błędzie test sprawdza tylko jedno wolne miejsce i przepuszcza wyciek drugiego

**Rodzaj:** nowy wątek. **Waga:** Important. **Zakres:** fragment 1, `c24fbff`.

**Kotwica:** [tests/passwords.test.mjs:34](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/tests/passwords.test.mjs:34). Powiązane miejsce: [src/server/passwords.ts:29](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/src/server/passwords.ts:29).

**Do wklejenia:** Po odrzuconej operacji test uruchamia tylko jedną kolejną, więc przechodzi również wtedy, gdy po błędzie stale pozostaje zajęte jedno z dwóch miejsc. Sprawdziłem to przez przeniesienie zmniejszania licznika za udane `await`: cały `npm test` pozostał zielony. Po błędzie trzeba potwierdzić przyjęcie dwóch równoczesnych operacji i odmowę trzeciej, również po błędzie rzeczywistej funkcji haszowania lub weryfikacji.

**Dlaczego to zgłaszam:** Zwolnienie miejsca po porażce utrzymuje dostępność logowania po błędach. Licznik zaczyna od zera, dwa zatrzymane callbacki go zapełniają, a ich sukcesy zwalniają oba miejsca. Następnie błąd podnosi licznik do jednego. Gdy uszkodzony kod nie zmniejszy go po odrzuceniu, obecna końcowa operacja nadal mieści się w limicie: podnosi go z jednego do dwóch, kończy się sukcesem i ponownie zostawia jeden. Asercja `"available"` niczego tu nie odróżnia.

Dokładna mutacja mojego sprawdzenia zastąpiła `try { return await operation(); } finally { activeOperations -= 1; }` następującym kodem:

```ts
const result = await operation();
activeOperations -= 1;
return result;
```

Wynik `npm test` był pozytywny, łącznie z testem noszącym nazwę „is released after success or failure”. Gdyby taki błąd trafił do funkcji używanych przez aplikację, pierwszy odrzucony hash/verify trwale zmniejszyłby dostępność do jednej operacji, a drugi zamknąłby logowanie i rejestrację do restartu. Sam przegląd potwierdza, że aktualny `finally` nie ma tego błędu; uwaga dotyczy testu, który ma wykrywać jego regresję, i fałszywego zakresu dowodu własnego autora. Jego mutacja limitu z dwóch do trzech sprawdza odmowę trzeciej operacji, nie odzyskiwanie miejsc po błędzie.

Naprawa testu powinna wykazać odzyskanie całej pojemności, a nie dowolnej dodatniej pojemności, i sprawdzić propagację rzeczywistego błędu API, np. niepoprawnie zakodowanego hasha, bez zastępowania Argon2. Nie wymaga zmiany poprawnego `finally`. Dowody są w tych samych dwóch logach, które wskazuje uwaga 1.

### 3. Integracja zależności nie dostarcza biblioteki sesji wymaganej przez następny fragment

**Rodzaj:** nowy wątek. **Waga:** Important. **Zakres:** fragment 1, `c24fbff`.

**Kotwica:** [package.json:17](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/package.json:17). Powiązany plan: [plan.md:74](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/docs/task-cycles/konta-graczy-i-logowanie/plan.md:74).

**Do wklejenia:** Fragment integrujący zależności dodaje wyłącznie `argon2`; w manifestach i lockfile nadal nie ma `express-session` ani jego deklaracji typów. Następny fragment ma implementować rzeczywisty Store tej biblioteki, ale nie ma manifestów w zakresie zmiany. Uzupełnij przypiętą zależność sesji i potrzebne typy w tym fragmencie albo jawnie skoryguj właściciela tego wymagania przed uznaniem integracji za ukończoną.

**Dlaczego to zgłaszam:** Zamrożone zadanie To do 7 wymaga sesji `express-session` i własnego Store na SQLite. Cel fragmentu 1 obejmuje przypięcie wybranych bibliotek i typów po sprawdzeniu dostępności; fragment 2 zależy od fragmentu 1 i ma budować adapter rzeczywistej biblioteki. Jego Change obejmuje moduły, testy i dokumentację, ale nie `package.json` ani `package-lock.json`. Odczytałem oba manifesty, wyszukałem `express-session` oraz `@types/express-session` i wykonałem `npm ls --depth=0 argon2 express-session @types/express-session`: jedyną znalezioną z tych zależności było `argon2@0.45.1`.

W obecnym HEAD nie ma jeszcze importu sesji, dlatego jego build może być zielony. Przykładowo planowany moduł `session-store.ts` rozszerzający `session.Store` z `express-session` nie ma jednak z czego rozwiązać importu po czystym `npm ci`; opcja strict i `noEmitOnError` w konfiguracji serwera nie pozwalają ominąć również wymaganego typowania. Naprawa wymaga ustalenia i przypięcia dostępnej wersji oraz potrzebnych deklaracji, sprawdzenia instalacji/audytu i zgodności z zapisanym kontraktem. Argon2 dostarcza własne typy — nie zgłaszam braku osobnego pakietu typów dla Argon2. Samo opisanie brakującej zależności jako „późniejszej” w raporcie nie przenosi jej do uprawnionego zakresu następnego wykonawcy. Alternatywą dla instalacji tutaj jest jawna korekta planu przez orkiestratora; jej koszt to dodatkowa zmiana zakresu i kontroli zależności, a pozostawienie stanu zatrzyma następny fragment.

### 4. Wpis trwałości zastępuje zapisane stany gry sesjami, choć zadanie przypisuje pełne brzmienie źródła

**Rodzaj:** nowy wątek. **Waga:** Important. **Zakres:** fundament `713b60d`; rozjazd pochodzi także z zawężenia w specyfikacji/planu.

**Kotwica:** [foundations/invariants.md:664](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/foundations/invariants.md:664). Źródło: [task.md:168](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/docs/task-cycles/konta-graczy-i-logowanie/task.md:168).

**Do wklejenia:** Zadanie każe zapisać w całości `account-save-durable-storage` dotyczący bazy kont i zapisanych stanów gry, a wpis zastępuje stany gry sesjami. Oznaczenie `Violated: yes` pozwala zachować pełne wymaganie bez twierdzenia, że zapis gry już działa; nie trzeba w tym celu zmieniać jego przedmiotu. Przywróć przypisane brzmienie albo uzyskaj rozstrzygnięcie zmieniające zamrożone źródło i jego dokumenty pochodne.

**Dlaczego to zgłaszam:** Ten niezmiennik ma przekazywać późniejszym zadaniom obowiązek zachowania danych przy wymianie kontenera. Zamrożone zadanie w sekcji „Zadanie zapisuje w całości” podaje dokładnie:

> Replacing the application container preserves the SQLite database of player accounts and saved game states.

Aktualny wpis brzmi:

> Replacing the application container preserves the SQLite database of player accounts and sessions.

To są różne wymagania. Kontrola zachowująca konto i sesję, lecz usuwająca tabele zapisów gry, spełniłaby drugie zdanie i naruszyła pierwsze. Nie chodzi o domaganie się implementacji zapisów gry teraz: zadanie wyraźnie pozostawia ją zadaniu 16, a stan `review / Violated: yes` uczciwie odnotowuje niepełną realizację. Problemem jest usunięcie części przyjętego zobowiązania ze źródła, do którego sięgną kolejni autorzy.

Sprawdziłem nie tylko diff, lecz także Foundation entries specyfikacji i planu. Specyfikacja nakazuje zawęzić zapis do wykazanej trwałości bazy kont, a plan F20h oraz akapit po tabeli powtarzają, że nie ma być twierdzenia o zapisanej grze. To wyjaśnia, skąd autor wziął zmianę, ale nie usuwa rozjazdu: niższy dokument nie zastępuje jawnego przypisania pełnego zdania przez zamrożone zadanie. Nie ma potrzeby fikcyjnego dowodu zapisów gry ani blokowania kodu kont do ich wdrożenia. Można zachować pełny niezmiennik z długiem i osobno opisać dowód zachowania kont/sesji; jeśli zamiarem jest rozdzielenie albo zawężenie przyjętego niezmiennika, trzeba rozstrzygnąć zmianę źródła i przenieść ją do dokumentów pochodnych. Pozostawienie obecnego tekstu gubi wymaganie, zachowanie pełnego tekstu kosztuje jawny dług do czasu późniejszej implementacji. Nie znalazłem analogicznej podmiany w pozostałych dziewięciu przypisanych niezmiennikach ani w trzech pełnych decyzjach projektowanych.

