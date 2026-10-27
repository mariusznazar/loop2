FAIL c24fbffd031c5f0dee7922c813800b3f1c1d8288

## Zakres i wynik

Niezależny przegląd zakresu `7012abcfb55b4ba2b2836b574a2275eb1551df28..c24fbffd031c5f0dee7922c813800b3f1c1d8288`, obejmującego fundament `713b60d0aeea9838034ef1458f59aeb2bffb5b7f` i fragment 1 `c24fbffd031c5f0dee7922c813800b3f1c1d8288`. HEAD odpowiada przekazaniu, śledzone drzewo było i pozostaje czyste. Gitlink i checkout procesu mają `574a37b9ab9572f876298f4cc10754581222d3f0`.

Metoda: projektowy `the-way-review-change`, pełna przypięta metoda `.the-way/task-cycle/review/SKILL.md`, jej procedury czytania oraz wskazany playbook code review. Osobno sprawdziłem kod i testy, osobno dokumenty fundamentu i wytyczne. Nie zmieniłem plików produktu, testów, fundamentu, planu, indeksu ani brancha. Nie czytałem cycle.md, nie uruchamiałem innego etapu i nie delegowałem przeglądu.

Wynik: **4 Important w zakresie zadania, 0 Critical, 0 Minor, 0 poza zakresem**. Pierwsze trzy pochodzą z fragmentu 1, czwarta z poprzedzającego fundamentu i odziedziczonego rozstrzygnięcia specyfikacji/planu.

## Blokujące — Important

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

## Minor, nity i dobre elementy

Brak dodatkowych uwag Minor i nitów.

- Aktualne funkcje hash/verify faktycznie dzielą jeden licznik, zwiększają go przed pierwszym await i zwalniają w finally dopiero po zakończeniu operacji. Pełna bramka nie wywołuje callbacku. Nie znalazłem implementacyjnego obejścia w przeglądanym HEAD; uwagi 1–2 dotyczą obowiązkowej ochrony regresji.
- Argon2 jest przypięty, profil podaje jawne koszty, a niezmiennik docelowego pomiaru nadal jest naruszony. Nie przypisano lokalnemu uruchomieniu wiedzy o Mikrusie. Rzeczywisty test zachowuje spacje i znak spoza BMP oraz rozróżnia poprawne i zmienione hasło.
- Zmiana wyboru plików w `npm test` obejmuje nowy plik i zachowuje dotychczasowe testy root/sim/view. Mapa przydziela nowy test dokładnie raz. Nowy rodzaj kodu ma pierwszy plik, wytyczne i wpis indeksu zgodnie z przypiętym szablonem.
- Dokumenty fundamentu zachowują rozdział między wymaganiem a wykazaną realizacją. Wszystkie 15 wcześniejszych nowych niezmienników pozostaje `review / Violated: yes`; nowy `password-operation-gate` jest `test / Violated: no`, lecz jego test wymaga poprawek 1–2. Zmiany D-12 i D-16 zachowują wiążące ograniczenia dostępu, a obowiązek przeglądu dostępu stoi poza samym uzasadnieniem.

## Declined to judge

Brak zachowań odłożonych jako poza zakresem całego zadania. Poniższe ograniczenia odnoszą się do rozdziału pracy między fragmentami i do uprawnień przeglądu, nie są dodatkowymi uwagami poza zakresem.

## Kontrole wykonane przeze mnie

| Polecenie lub metoda | Kod wyjścia | Wynik |
|---|---:|---|
| `git rev-parse HEAD`; `git status --short`; `git log --oneline 7012abcfb55b4ba2b2836b574a2275eb1551df28..c24fbffd031c5f0dee7922c813800b3f1c1d8288` | 0 | Dokładny HEAD, dwa wskazane commity, czyste śledzone drzewo. |
| `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD` | 0 | Zgodny pin `574a37b9ab9572f876298f4cc10754581222d3f0`. |
| `git diff --stat <base>..<head>` i odczyt pełnego diffu wszystkich 10 plików; ponowny odczyt fragmentu uciętego w wyniku narzędzia | 0 | 690 dodanych / 24 usunięte linie; źródła, testy i dokumenty ocenione osobno. |
| `git diff --check 7012abcfb55b4ba2b2836b574a2275eb1551df28..c24fbffd031c5f0dee7922c813800b3f1c1d8288` | 0 | Bez błędów whitespace. |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors`. To kontrola struktury/odwołań, nie dowód kompletności zachowań. |
| `npm ls --depth=0 argon2 express-session @types/express-session` | 0 | Tylko `argon2@0.45.1`; odczyt manifestów i lockfile potwierdza brak sesji, nie wniosek wyłącznie z pustego grep. |
| Odczyt zainstalowanego `node_modules/argon2/argon2.cjs` i wersjonowanego źródła pakietu | ręcznie | Hash generuje sól i koduje parametry; verify bierze parametry z zapisanego hasha i może odrzucić niepoprawny format. Wrapper aktualnego HEAD propaguje błąd i zwalnia miejsce w finally. |
| `docker image inspect loop2-task22-verifier:latest --format '{{.Id}}'`; `docker inspect loop2-task15-dind --format '{{.State.Running}}'`; `git bundle list-heads .runs/account-linux-inputs/product.bundle` | 0 | Obraz `sha256:75d0c821fa0c6a4d7b7aee56748bb958439ae82b536c4145c252febf7697b524`, działający lokalny daemon zadania, bundle dokładnego HEAD. |
| Przygotowanie własnego kontenera komendą podaną niżej: clone/checkout dokładnego HEAD, checkout pina, `npm ci`, venv i `pip install --require-hashes`, dokładne mutacje z uwag 1–2 | 1 całości | Instalacja i przygotowanie powiodły się. Pierwsza próba nie uruchomiła testów: PowerShell dodał CR na końcu stdin, co dało `Unknown command: test\r`. Zachowany pełny log; żadnego wyniku testów z tej próby nie zaliczam. |
| `docker start -ai loop2-task15-review-gate-mutants-01`, stdin: `cd /workspace`, `npm test`, `exit $? # end` | 0 | Rzeczywiste `npm test` na mutowanej kopii: 345 Node pass, 275 Python w czterech katalogach, trzy znane Windows-only skips, fundament `0 errors`. Jest to **dowód przepuszczenia błędów**, nie zaliczenie oryginalnego HEAD. |
| W tej samej własnej kopii: `git restore -- src/server/passwords.ts`; `git diff --exit-code`; `git rev-parse HEAD`; następnie `docker rm loop2-task15-review-gate-mutants-01` | 0 | Mutacje cofnięte, diff pusty, nadal dokładny HEAD, usunięty wyłącznie własny kontener przeglądu. Daemon zadania i cudze zasoby pozostały. |
| Końcowe `git status --short`; `git rev-parse HEAD` w przeglądanym worktree | 0 | Nadal czyste śledzone drzewo i dokładny SHA przeglądu. |

Dokładne uruchomienie własnego kontenera; stdin zawierał przygotowanie opisane w tabeli, a jego pełny wynik oraz diff zachowano w logu:

```powershell
$reviewScript | docker run -i --name loop2-task15-review-gate-mutants-01 --network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount 'type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly' loop2-task22-verifier:latest bash -s
```

Sprawdzenie używało Node `v24.22.1`, Python `3.14.9`, źródła `c24fbffd031c5f0dee7922c813800b3f1c1d8288` i pina procesu `574a37b9ab9572f876298f4cc10754581222d3f0`. Własne logi: [przygotowanie](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/docs/task-cycles/konta-graczy-i-logowanie/reports/slice1-review-gate-mutants.log), [wynik npm test](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/docs/task-cycles/konta-graczy-i-logowanie/reports/slice1-review-gate-mutants-run.log). Nie uruchamiałem żadnego testu bezpośrednio przez node --test ani unittest. Pełny przebieg był konieczny dla tej konkretnej próby mutacji, ponieważ repo nie dopuszcza zawężania; nie powtarzałem niezmienionego pełnego przebiegu HEAD należącego do cyklu.

Otworzyłem siedem niezmiennych adresów nowych faktów i porównałem istotne fragmenty, nie tylko raport autora: [API Argon2](https://raw.githubusercontent.com/ranisalt/node-argon2/786de7152f95881b0683aea1d2ca60ed0d6d9e2f/argon2.cjs), [platformy i typy Argon2](https://raw.githubusercontent.com/ranisalt/node-argon2/786de7152f95881b0683aea1d2ca60ed0d6d9e2f/README.md), [Store sesji](https://raw.githubusercontent.com/expressjs/session/c10b2a383841766899f6dcf53c8aff8c7fd3d2e7/README.md), [kolejność kluczy sesji](https://raw.githubusercontent.com/expressjs/session/c10b2a383841766899f6dcf53c8aff8c7fd3d2e7/index.js), [node:sqlite](https://raw.githubusercontent.com/nodejs/node/955266bfdd854cd280dffd47548673914484e4c0/doc/api/sqlite.md), [poświadczenia Fetch](https://raw.githubusercontent.com/mdn/content/fe1d7fb9b67ce826c4a748ce00e7b35ac4a54c7f/files/en-us/web/api/fetch_api/using_fetch/index.md), [dobór kosztu haszowania](https://raw.githubusercontent.com/OWASP/CheatSheetSeries/3c07d4aa45a33ffc6a68408621064942358dee61/cheatsheets/Password_Storage_Cheat_Sheet.md). Fragmenty wspierają zakres zapisanych twierdzeń; nie stanowią testu wdrożenia ani dowodu wersji sesji zainstalowanej w produkcie. Dla Argon2 odnotowałem też, że README opisuje wsparcie Node ≥22, mimo niższego pola engines w paczce; produkt używa Node 24, więc nie powstała tu sprzeczność z wymaganym runtime.

## Dostarczone dowody i ograniczenia

Przeczytałem pełne raporty autora fundamentu i wykonawcy fragmentu. W dostarczonym [logu poprawnego HEAD](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/docs/task-cycles/konta-graczy-i-logowanie/reports/slice1-password-gate-pass.log) potwierdziłem SHA, wykonanie obu nowych testów, 345 Node pass, wyniki 5/65/173/32 testów Pythona, trzy pominięcia i `0 errors`. W [logu mutacji autora](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/docs/task-cycles/konta-graczy-i-logowanie/reports/slice1-password-gate-mutation.log) potwierdziłem `Missing expected rejection (PasswordCapacityError)` po zmianie limitu 2 → 3. Są to cudze wykonania, nie moje.

Własna próba obala twierdzenie raportu autora, że istniejący test łapie wyciek miejsca po porażce. Jego wskazanie pomiaru docelowego jako najsłabszego wymagania jest uczciwe co do nieprzeprowadzonego pomiaru, ale nie zastępuje sprawdzenia słabej strony ukończonego lokalnego modułu. Pomiar należał od początku do późniejszego etapu i człowieka; zależność testu odmowy od właściwych funkcji i pełne odzyskiwanie pojemności należą już do tego fragmentu.

Autor wykonał dwa testy poza npm test i sam odnotował naruszenie. Nie przedstawiam późniejszego pełnego przebiegu jako unieważnienia tego zdarzenia. Nie dodaję osobnego blokera za historyczną metodę uruchomienia: wskazane błędy pokrycia oraz brak zależności mają własne konkretne skutki i wymagają naprawy.

Nie wykonałem wdrożenia, tworzenia/rotacji sekretu, pomiaru Mikrusa, publicznej rejestracji ani publicznej ścieżki przeglądarki. Nie ma zatem mojego pozytywnego dowodu tych zachowań. Nie powtarzałem znanego Windowsowego błędu enumeracji listenerów. Trzy Windows-only testy pominięte w moim Linuxie nie są przeze mnie zaliczone. Nowe funkcje nie są jeszcze wywoływane przez trasy kont; brak dowodu kont, sesji, transportu, bazy i dummy-hash przy readiness pozostaje przypisany późniejszym fragmentom. Przygotowany profil i wspólne API umożliwiają te użycia, lecz ich nie implementują.

D-44 zmienia wymagany stan oczekiwania przed aktualizacją styleguide'u zaplanowaną w fragmencie 7; odczytany plan jawnie obejmuje to domknięcie. To nie jest dowód gotowego interfejsu ani osobny defekt fragmentu 1. Luka istniejącego narzędzia mutacji/zakresu części pozostaje jawna; specyfikacja przypisuje przywrócenie obowiązku myślowego do fragmentu 5 i nie ustanawia stałego zwolnienia. Ten przegląd użył jednorazowej kontrolowanej mutacji, nie przyjął nowego narzędzia produktu.

## Reaches — dodatkowe odczyty

- `node_modules/argon2/argon2.cjs`, manifest pakietu i `tsconfig.server.json`: sprawdzenie rzeczywistej granicy natywnej, błędów, zachowania verify oraz skutku brakującej zależności/typów; bez zmiany tych plików.
- Specyfikacja §1–3 i Foundation entries, pełne K1–K13 zamrożonego zadania oraz jego pełna lista przypisanych wpisów projektowanych: porównanie poprzedzającego fundamentu ze źródłem, szczególnie zmiany przedmiotu trwałości danych. Nie użyłem tego jako upoważnienia do realizacji kolejnych fragmentów.
- Plan fragmentu 2, wyłącznie Goal/Change/Depends on i kontekst manifestu: ustalenie, czy deklarowana przez autora późniejsza instalacja ma rzeczywistego właściciela. Nie rozpocząłem fragmentu 2.
- Raport `09-foundation-source-answer.md` i wyszukane fragmenty `08-foundation-handoff.md`, `04-spec-revision-handoff.md`, `02-designer-answers.md`: ustalenie granicy korekt źródeł i tego, czy rozjazd wpisu trwałości wynika z jawnego rozstrzygnięcia. Wskazana odpowiedź 09 rozstrzyga termin zapisu faktów o bibliotekach, nie zastąpienie zapisanych stanów gry sesjami.
- Przypięte szablony wytycznych ogólnych/kodowania oraz metody elementów nazwane przez przekazanie: kontrola nowego rodzaju, mapowania testu i statusów, bez wykonywania operacji zapisu elementu. Jedna próba odczytu nieistniejącej nazwy `coding/kind_template.md` została zastąpiona odczytem rzeczywistego `coding/template.md` wskazanego przez metodę; nie wyciągnąłem wniosku o braku szablonu.
- Nie przeprowadzałem ponownego wyboru całego fundamentu; wpisy D-94–D-110 i zmienione wcześniejsze decyzje odczytałem jako sam przedmiot diffu, wraz z wybranymi przez przekazanie wpisami bazowymi. Siedem wskazanych wyżej adresów zewnętrznych otworzyłem dla weryfikacji faktów w diffie.

## Przekazanie

Przegląd kończy się na tym raporcie. Poprawki, decyzja o rozjeździe źródła, ewentualne przeniesienie instalacji i ponowny przegląd należą do orkiestratora. Żadnej uwagi nie naprawiłem w produkcie.
