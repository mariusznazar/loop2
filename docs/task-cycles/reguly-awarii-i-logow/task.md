# Sześć reguł o awariach i logach w wytycznych kodowania loop2

Status: ready for cycle
Project relation: independent

## Description

### Need

- Szablon wytycznych kodowania przypiętego the-way wymaga w `guidelines/coding.md`, po `### Dependency audit`, sześciu nagłówków: `### Recording a failure`, `### Hiding a failure`, `### Identifiers in log lines`, `### Business events`, `### Secrets and personal data` i `### Logging scope` (`.the-way/product-guidelines/coding/template.md:44`–`:49`, the-way f45ca40).
- W `guidelines/coding.md` nie ma żadnego z nich (loop2 54b2b78).
- Pozycja To do 16 zadania 2 planu MVP2 rozszerza wytyczne kodowania (`_zadania/logowanie_w_react_loop2.md:45`), a przy każdym rozszerzeniu zadanie „is not ready without” decyzji o tych regułach (`.the-way/product-guidelines/coding/settle.md:31`–`:35`, the-way f45ca40).
- Zadanie ma wejść przed zadaniem 1 planu MVP2, żeby nowy program z zadania 1 powstał już według reguł (przekazanie sesji od Mariusza, 2026-11-01).
- Gdy coś zawodzi na serwerze, właściciel i agent widzą dziś skutek, a nie przyczynę: logi nie mają przyczyny albo nie mają nic (lista przeglądu w *Context*, przyczyny 1–4).

### To do

1. Do fundamentu wchodzą decyzje z wierszy 1 i 2 *Settlements to record*, a wiersz 3 zmienia D-213, każdy przez skill swojego elementu.
2. `guidelines/coding.md` dostaje sześć reguł po `### Dependency audit`, napisanych z szablonu wytycznych kodowania, z *Decision* wskazującym decyzję z wiersza 1, z *Invariant* `none` i z *Good* oraz *Bad* `none`.
   - `### Logging scope` niesie listę z pytania 11 oraz to, że lista jest obietnicą produktu, a nie spisem kodu, i jak dodaje się pozycję (pytanie 10).
   - `### Recording a failure` niesie odczytanie z pytania 4.
3. Serwer zapisuje każdą awarię, którą obsłużył, z jej rodzajem, kodem i miejscem, jedną drogą zapisu i w postaci z pytania 9 (przyczyna 1).
4. Komunikat serwera, który nie wstaje, zachowuje nazwę ustawienia i dopisuje rodzaj oraz kod pierwotnego błędu, bez wartości (przyczyna 2).
5. Każda porażka maila bez błędu biblioteki nazywa swój powód, a reguła „Dziennik porażki” w `guidelines/coding-mail-sending.md` zmienia się razem z nią (przyczyna 3).
6. Polecenia `account-backup` i `account-block` dopisują rodzaj i kod błędu, bez jego treści (przyczyna 4).
7. Nieoczekiwany błąd odczytu zapisu gry nie nadpisuje zapisu i zachowuje się jak w pytaniu 16 (przyczyna 6).
8. Serwer, `account-block` i `account-backup` dostają po jednej obsłudze ostatniej szansy, która pisze rodzaj, kod i miejsce (przyczyna 7).
9. Dziewięć zdarzeń z listy pytania 11, które nie mają dziś wiersza, dostaje wiersz logu z `accountId`, tam gdzie zdarzenie dotyczy konta.
   - Wiersz logowania stoi w `signIn`, więc obejmuje też logowanie po rejestracji (`src/server/account-routes.ts:215`).
   - `blockAccount` zwraca dziś tylko wynik, więc wiersz blokady wymaga dojścia do `accountId`.
10. Tabele rodzajów w `guidelines/coding-<kind>.md` dostają pliki i statusy z pytania 14, a wzorce rodzajów się nie zmieniają.

### Acceptance criteria

- Żaden z nowych wierszy logu nie zawiera sekretu, adresu e-mail, adresu klienta, całego obiektu ani treści żądania.

### Questions to settle

- 1. Którą z dróg bierze produkt: wszystkie sześć reguł, trzy reguły (`### Recording a failure`, `### Hiding a failure`, `### Secrets and personal data`) z odstąpieniem od `### Logging scope`, czy odstąpienie od wszystkich?
  - Answer: Produkt przyjmuje wszystkie sześć reguł.
  - Not chosen:
    - trzy reguły z odstąpieniem od `### Logging scope` — wiersz awarii nie mówi, czyje to konto, i nic nie przypomina o powrocie do reguł przy pierwszym obcym graczu.
    - odstąpienie od wszystkich reguł — przy pierwszej awarii serwera ani człowiek, ani agent nie widzą przyczyny, a nowy kod loguje jak popadnie.
  - Source: Mariusz, 2026-11-01: „pełny prces poproszę, droga A”.
- 2. W jakim zakresie biegnie przegląd kodu i badanie narzędzi?
  - Answer: Pełny proces: badanie każdego z trzech sprawdzeń kodu i przegląd każdego rodzaju kodu.
  - Not chosen:
    - wariant węższy z zapisanym odstępstwem od WAY-278, bez badania i z przeglądem około 5 tys. wierszy — około 0,3–0,5 mln tokenów zamiast około 1,8 mln, ale awaria ukryta poza czytanymi plikami zostaje, a 40 plików pozostaje poza tabelami rodzajów.
  - Source: Mariusz, 2026-11-01: „pełny prces poproszę, droga A”.
- 3. Czy reguła o obsłudze ostatniej szansy dla kodu w przeglądarce należy do tego zadania, skoro napis o awarii w grze ma zadanie 8 planu MVP2?
  - Answer: Nie: reguła obowiązuje przeglądarkę od przyjęcia, a jej brak to przyczyna 5, odłożona do zadania 8.
  - Source: Mariusz, 2026-11-02: „przyjmuję rekmendacje”.
- 4. Które osobno działające programy dostają obsługę ostatniej szansy (serwer, polecenia `account-block`, `account-backup`, `measure-passwords` i ewentualne inne)?
  - Answer: Własną obsługę dostają programy dotykające danych kont, serwer, `account-block` i `account-backup`, bo domyślny wypis mógłby zacytować wartości; w skryptach uruchamianych ręcznie albo przez bramkę testów regułę spełnia domyślny wypis Node i Pythona, bo zapisuje to, czego nikt nie obsłużył; `account-database-check`, `measure-passwords`, `deploy/loop2-backup` i `scripts/restore-trial.mjs` już ją mają, a brak w `deploy/loop2-deploy` to odłożona przyczyna 9.
  - Not chosen:
    - własna obsługa w każdym skrypcie — robi to samo, co domyślny wypis, i tylko dokłada kodu.
  - Source: Mariusz, 2026-11-02: „przyjmuję rekmendacje”.
- 5. Czy kodu do naprawy dotyczy tylko część serwerowa?
  - Answer: Nie: przyczyny 1, 2, 3, 4 i 7 dotyczą `account-server`, a przyczyna 6 sięga `simulation` i `browser-view`.
  - Source: Mariusz, 2026-11-02: „przyjmuję rekmendacje”.
- 6. Które przyczyny z listy przeglądu zadanie naprawia?
  - Answer: Przyczyny 1, 2, 3, 4, 6 i 7; przyczyna 5 idzie do zadania 8, a przyczyny 8–13 są odłożone.
  - Source: Mariusz, 2026-11-02: „przyjmuję rekmendacje”.
- 7. Czy zapisywanie tego, co robi gracz w grze (jakie programy wysyła na które mapy i z jakim skutkiem), należy do tego zadania, czy do osobnego?
  - Answer: Do osobnego zadania, zaparkowanego do rozpoznania w backlogu.
  - Not chosen:
    - w tym zadaniu — dane zbierają się od razu, ale dochodzi nowa droga z przeglądarki na serwer z jej sprawdzaniem i testami, zanim ruszy zadanie 1, oraz ustalenie, jak długo takie dane żyją.
  - Source: Mariusz, 2026-11-02: „zróbmy to osobnym zadaniem i na razie zaparkujmy je do rozpoznania do backlogu”.
- 8. Jakie Mariusz ma życzenia co do narzędzi sprawdzających kod i ich zestawów reguł?
  - Answer: Obecne narzędzia raczej zostają, a badanie ma sprawdzić, czy potrzeba jeszcze czegoś.
  - Source: Mariusz, 2026-11-02: „te wydaje się powinny raczej zostać, pytanie czy potrzebujemy jeszcze czegoś”.
- 9. Jaką postać ma wiersz logu?
  - Answer: Wiersz logu w kodzie Node.js to jeden obiekt JSON w jednym wierszu, pisany przez `console`, bez biblioteki, ze stałymi nazwami pól; skrypty Bash zostają przy swoim tekście, a w przeglądarce wiersz konsoli jest zwykłym tekstem.
  - Not chosen:
    - tekst `pole=wartość` — czyta się przyjemniej, ale wartość ze spacją albo nowym wierszem psuje wyszukiwanie.
  - Source: Mariusz, 2026-11-02: „przyjmuję rekmendacje”.
- 10. Jaka jest zasada zakresu logowania i granica tego, co agent dodaje sam?
  - Answer: Produkt loguje zmiany konta gracza i dostępu do niego oraz operacje zmieniające to, co działa na serwerze, albo jego kopię, a nie loguje postępu gry ani prac porządkowych; agent dodaje sam pozycję pasującą do zasady, także identyfikator rzeczy, a wszystko, co wskazuje na osobę, wymaga zgody człowieka.
  - Source: Mariusz, 2026-11-02: „przyjmuję rekmendacje”.
- 11. Jaka jest dzisiejsza lista identyfikatorów i zdarzeń?
  - Answer: Identyfikator: `accountId`.
  - Answer: Zdarzenia: konto założone, logowanie, wylogowanie, odnośnik wystawiony, wiadomość wysłana, adres potwierdzony, hasło ustawione odnośnikiem, konto zablokowane, konto odblokowane, kopia bazy wykonana, wdrożenie.
  - Source: Mariusz, 2026-11-02: „przyjmuję rekmendacje”.
- 12. Czy numer konta trafia do logów?
  - Answer: Tak, `accountId` stoi na liście za zgodą Mariusza.
  - Not chosen:
    - bez numeru konta — wiersz nie mówi, czyje konto dotknęła awaria, i nie da się połączyć zdarzeń jednego konta.
  - Source: Mariusz, 2026-11-02: „przyjmuję rekmendacje”.
- 13. Czy sprawdzenia kodu się zmieniają?
  - Answer: Nie: lintery, formatter i audyt zależności zostają bez zmian, a reguły spoza zestawów nie wchodzą.
  - Not chosen:
    - dołożenie `no-throw-literal` i `prefer-promise-reject-errors` dla skryptów JS, `B904` dla Pythona — 0 i 3 zgłoszenia w próbie, zmiana D-29 albo D-30, a związek `B904` z zapisem przyczyny jest częściowy.
  - Source: Mariusz, 2026-11-02: „przyjmuję rekmendacje”.
- 14. Jakie statusy dostają pliki rodzajów?
  - Answer: Wzorce zostają; do `browser-module` dochodzi 16 plików, do `content-data` 6, do `simulation-module` 8, a do `http-application` `src/server/account-routes.ts`; `do not copy` po zadaniu mają `src/browser/view/game-saver.ts`, `src/browser/sim/loop.ts` i `src/browser/sim/skills.ts`, a pozostałe nowe wiersze to `copy`.
  - Source: Mariusz, 2026-11-02: „przyjmuję rekmendacje”.
- 15. Czy sześć reguł dostaje niezmienniki?
  - Answer: Nie: żaden tani test nie sprawdza całej reguły, więc pilnuje ich przegląd każdej zmiany.
  - Source: Mariusz, 2026-11-02: „przyjmuję rekmendacje”.
- 16. Co widzi gracz, gdy odczyt zapisu gry zawiedzie nieoczekiwanym błędem?
  - Answer: Gracz widzi „Nie udało się wczytać gry. Spróbuj ponownie.” i przycisk ponowienia, a zapis zostaje nienaruszony.
  - Not chosen:
    - jak dziś, plus wiersz w konsoli — gracz gra dalej, ale traci zapis.
  - Source: Mariusz, 2026-11-02: „A i przyjmuję”.

## Context

- Zadanie przyszło z przekazania sesji od Mariusza, 2026-11-01; jego podstawą jest `.the-way/product-guidelines/coding/SKILL.md` i decyzje WAY-271 do WAY-279 (the-way f45ca40).
- Zadanie jest niezależne, bo wykracza poza zakres definicji MVP2, a wejście do planu wymagałoby zmiany definicji, nowej bramki i ponownego sprawdzenia planu.
- Do końca Projektu 2 gra tylko Mariusz (`definicja_mvp2_loop2.md:71`).
- Termin zgłoszenia projektu to 2026-11-04 (`definicja_mvp2_loop2.md:72`).
- Badanie narzędzi: formatter i audyt zależności nie sięgają żadnej z sześciu reguł, a lintery łapią większość fragmentów reguł `### Recording a failure` i `### Hiding a failure` w kodzie TypeScript (`.runs/coding/linter-failure-and-log-rules.md`, `.runs/coding/formatter-failure-and-log-rules.md`, `.runs/coding/dependency-audit-failure-and-log-rules.md`, każdy zakończony `critique: passed`).
- Próba reguł linterów spoza zestawu, loop2 54b2b78: `no-throw-literal` i `prefer-promise-reject-errors` dały 0 zgłoszeń na 195 plikach (`.runs/coding/eslint-trial-failure-rules.json`), a `TRY400`, `RUF006` 0 i `B904` 3, wszystkie w kodzie pomocniczym testów (`.runs/coding/ruff-trial-failure-rules.txt`).
- Obecny zestaw linterów nie ma zgłoszeń, więc próba nie miała czego oceniać.
- Przegląd kodu, loop2 54b2b78: `.runs/coding/audit-server.md`, `.runs/coding/audit-browser.md`, `.runs/coding/audit-simulation.md`.
- Przegląd nie uruchamiał kodu, a zawartość pliku `src/browser/sim/saved-game.ts` w wierszach 400–1225 sprawdził tylko wyszukiwaniem.
- Krytyka kompletu propozycji i werdykt autora: `.runs/coding/failure-rules-proposals.md`, `.runs/coding/failure-rules-critique-verdict.md`.
- `deploy/loop2-deploy` i `deploy/loop2-backup` żyją na serwerze jako kopie instalowane ręcznie (`deploy/loop2-deploy:221`), więc zadanie ich nie zmienia.
- Symulacja nie ma dostępu do `console` (`tests/invariants/test_simulation_isolation.py:41`), więc wiersz z przyczyny 6 pisze widok.
- The audit's list; places 1 to 5 are its top.
- 1 — `heavy` — Serwer obsłużył awarię, a w logu nie ma jej przyczyny albo nie ma nic, więc właściciel widzi skutek i nie dojdzie do powodu.
  - Places: `src/server/app.ts:60`, `src/server/database.ts:197`, `src/server/account-routes.ts:198`, `:250`, `:309`, `:319`, `:341`, `:617`
  - Fix: każde z tych miejsc zapisuje awarię z jej rodzajem, kodem i miejscem, jedną drogą zapisu.
  - Removes: 8 miejsc
  - Reaches: `one part`
  - Checked: wszystkie 8 miejsc przeczytane; błędy 500 znikają bez wiersza, a `regenerate`, `save` i `destroy` odrzucają błąd bez wiersza; stoi pierwsza, bo bez niej reszta przyczyn serwera i tak nie daje obrazu.
  - Taken: To do 3
- 2 — `heavy` — Serwer nie wstaje, a komunikat wskazuje złą przyczynę, na przykład nieobsługiwana wersja bazy wygląda jak zła ścieżka do bazy.
  - Places: `src/server/configuration.ts:93`, `:125`, `:206`, `:220`
  - Fix: komunikat zachowuje nazwę ustawienia i dopisuje rodzaj oraz kod pierwotnego błędu, bez wartości.
  - Removes: 4 miejsca
  - Reaches: `one file`
  - Checked: 4 miejsca przeczytane; błąd `Unsupported account database schema` z `src/server/database.ts:248` kończy jako `LOOP2_DATABASE_PATH`.
  - Taken: To do 4
- 3 — `heavy` — Nieudany mail daje w logu „unknown” dla czterech różnych powodów, także dla braku szyfrowania u dostawcy.
  - Places: `src/server/account-mail.ts:125`, `:143`, `:191`, `:196`
  - Fix: każda porażka bez błędu biblioteki nazywa swój powód, a reguła „Dziennik porażki” w `guidelines/coding-mail-sending.md` zmienia się razem z nią.
  - Removes: 4 miejsca
  - Reaches: `one file`
  - Checked: 4 miejsca przeczytane; dzisiejsza reguła rodzaju dopuszcza „unknown”, więc to zmiana reguły, nie tylko kodu; D-162 zakazuje poświadczeń, tokenów, odnośników i wiadomości, a rodzaju porażki nie.
  - Taken: To do 5
- 4 — `heavy` — Nocna kopia bazy i blokada konta padają bez przyczyny, a właściciel dostaje tylko radę, żeby spróbować ponownie.
  - Places: `src/server/account-backup.ts:82`, `:90`, `src/server/account-block.ts:75`
  - Fix: polecenia dopisują rodzaj i kod błędu, bez jego treści, która może cytować wartości.
  - Removes: 3 miejsca
  - Reaches: `one part`
  - Checked: 3 miejsca przeczytane; `src/server/account-block.ts:18` celowo nie wypisuje błędu bazy, ale żadna decyzja tego nie ustala, a rodzaj i kod nie cytują wartości.
  - Taken: To do 6
- 5 — `heavy` — Błąd, którego nic nie złapie w przeglądarce, daje pustą stronę, zamrożoną grę albo wiszący przycisk, bez zdania dla gracza i bez wiersza w logu.
  - Places: `src/browser/main.ts`, `src/browser/view/clock.ts:90`, cały `src/browser`
  - Fix: zadanie 8 planu MVP2 daje zdanie na ekranie i wiersz w konsoli.
  - Removes: wszystkie błędy przeglądarki, których nic nie łapie
  - Reaches: `several parts`
  - Checked: wyszukiwanie nie znajduje w `src/browser` ani `console`, ani `error`, ani `unhandledrejection`; `src/browser/main.ts` woła start bez obsługi błędu, a co dokładnie widzi gracz, pokazałoby dopiero uruchomienie.
  - Deferred: należy do zadania 8 planu MVP2, które już ma ten wynik.
- 6 — `heavy` — Błąd programisty w odczycie zapisu wygląda jak uszkodzony zapis, a gra od razu nadpisuje go nową grą, bez śladu dla właściciela.
  - Places: `src/browser/sim/saved-game.ts:1306`, `src/browser/view/app.ts:225`
  - Fix: odczyt odróżnia odmowę od nieoczekiwanego błędu, zapis nie jest nadpisywany przy tym drugim, a wiersz w konsoli pisze widok, bo symulacja nie ma dostępu do konsoli.
  - Removes: 1 miejsce
  - Reaches: `several parts`
  - Checked: droga prześledzona od `src/browser/sim/saved-game.ts:1306` przez `src/browser/view/app.ts:61` do `:225` i się potwierdza; żadne znane wejście dziś jej nie uruchamia, a wiersze 400–1225 sprawdzono wyszukiwaniem; waga obniżona z `grave`, bo dotąd to tylko możliwa droga, ale wyżej niż przyczyna 8, bo kończy się nadpisaniem istniejących danych.
  - Taken: To do 7
- 7 — `medium` — Serwer i polecenia właściciela nie mają obsługi ostatniej szansy, więc błąd, którego nic nie złapie, pisze tylko domyślny wypis Node, po czym program kończy pracę.
  - Places: `src/server/main.ts`, `src/server/account-block.ts`, `src/server/account-backup.ts`
  - Fix: każdy z tych programów dostaje jedną obsługę ostatniej szansy.
  - Removes: 3 programy
  - Reaches: `one part`
  - Taken: To do 8
- 8 — `medium` — Wyjątek przy zapisie gry zatrzymałby zapisywanie po cichu i zostawił wylogowanie w zawieszeniu.
  - Places: `src/browser/view/game-saver.ts:135`
  - Fix: wyjątek kończy wysyłkę tak samo jak nieudana odpowiedź.
  - Removes: 1 miejsce
  - Reaches: `one file`
  - Deferred: below the top
- 9 — `medium` — Zabite wdrożenie nie zostawia ostatniego wiersza w dzienniku wdrożeń.
  - Places: `deploy/loop2-deploy:23`, `:376`
  - Fix: skrypt dostaje wyjście z wierszem końcowym, jak `deploy/loop2-backup`.
  - Removes: 1 miejsce
  - Reaches: `one file`
  - Deferred: below the top
- 10 — `medium` — Skrypty pomocnicze gubią przyczynę, więc pomiar, próba odtworzenia i audyt zależności zawodzą bez powodu.
  - Places: `src/server/measure-passwords.ts:74`, `scripts/audit_dependencies.py:22`, `:36`, `scripts/measure-passwords.mjs:126`, `:197`, `scripts/restore-trial.mjs:311`, `:578`
  - Fix: skrypty wypisują rodzaj i kod albo przechwycony tekst błędu, bez wartości.
  - Removes: 7 miejsc
  - Reaches: `several parts`
  - Deferred: below the top
- 11 — `light` — Brak sieci, błąd DNS i odrzucone przekierowanie wyglądają tak samo, choć gracz dostaje właściwe zdanie.
  - Places: `src/browser/account-api.ts:257`
  - Fix: klient zapisuje rodzaj pierwotnego błędu w konsoli.
  - Removes: 1 miejsce
  - Reaches: `one file`
  - Deferred: below the top
- 12 — `light` — Błędne wejście z widoku kończy się w symulacji cichym pustym wynikiem, jak zwykła odmowa, choć widok podaje tam identyfikatory z własnych list.
  - Places: `src/browser/sim/loop.ts:43`, `:110`, `src/browser/sim/skills.ts:152`
  - Fix: błąd wywołującego rzuca wyjątek, jak w `send`, a zwykłe odmowy zostają.
  - Removes: 3 miejsca
  - Reaches: `one part`
  - Deferred: below the top
- 13 — `light` — Strona pokazowa nie otwiera się sama, gdy zawiedzie przeglądarka, i nie zostawia wiersza, ale jej adres jest wypisany.
  - Places: `scripts/kitchen-sink.mjs:63`
  - Fix: skrypt wypisuje, że strony nie udało się otworzyć.
  - Removes: 1 miejsce
  - Reaches: `one file`
  - Deferred: below the top
- Withdrawn: Zepsuty zegar po cichu zatrzymuje czas gry w `passRealTime` — it weighed `light`
  - Checked: `src/browser/view/clock.ts:86`–`:90` podaje różnicę dwóch odczytów `performance.now()`, więc zawsze skończoną liczbę, a `src/browser/sim/game.ts:526`–`:542` opisuje to jako zachowanie wzorca rodzaju.
- Pliki `do not copy` w dniu przeglądu, z numerem przyczyny; wzorce rodzajów zostają w tabelach wierszem `exemplar`, a to oznaczenie stoi tylko tutaj:
  - `src/server/app.ts:60` — przyczyna 1
  - `src/server/database.ts:197` — przyczyna 1
  - `src/server/account-routes.ts:198`, `:250`, `:309`, `:319`, `:341`, `:617` — przyczyna 1
  - `src/server/account-mail.ts:125`, `:143`, `:191`, `:196` — przyczyna 3
  - `src/browser/sim/saved-game.ts:1306` — przyczyna 6
  - `src/browser/view/game-saver.ts:135` — przyczyna 8
  - `src/browser/account-api.ts:257` — przyczyna 11
  - `src/browser/sim/loop.ts:43`, `:110` — przyczyna 12
  - `src/browser/sim/skills.ts:152` — przyczyna 12

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- D-28 — „Loop2 adopts the coding-guideline templates of its pinned the-way, while deferring automatic formatting of Python and Bash and separate exemplars for building, deployment, entry points, HTML and CSS”; zadanie nie zmienia tej decyzji (WAY-279).
- D-162 — „Mail sending composes account messages and submits each to the mail service, independently of HTTP and the database, within a bounded time, and reports a failure as its result rather than as an error thrown to its caller, writing no credential, token, link or message to a log.”
- D-213 — „Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value — a saved game state downloaded from the server or kept in the page's memory (D-211) — into a game state or a refusal naming why, inside the simulation, never throwing and changing nothing passed to it.”
- D-222 — „Only after the answer does the server record and send a link, and only for an account with a confirmed address that is not blocked and within the limits of D-105, and a failure of that work shows only in the server's log.”
- Wpis projektowany definicji MVP2, nagłówek „How does an agent learn what went wrong in the running game?” — „An agent learns what went wrong in the running game from what a player reads, the screen and the chronicle, and from the browser's console, through the browser it operates, with no outside service. An exception in the game shows on the screen as a sentence that something broke and goes to the console.”; to zadanie go nie realizuje, bo należy do planu MVP2.

## Settlements to record

Candidates: 3 shown, 3 accepted — 2026-11-02

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Produkt przyjmuje wszystkie sześć reguł; wiersz logu w kodzie Node.js to jeden obiekt JSON w jednym wierszu, pisany przez `console`; produkt loguje zmiany konta gracza i dostępu do niego oraz operacje zmieniające to, co działa na serwerze, albo jego kopię, a agent dodaje sam pozycję pasującą do zasady, gdy to, co wskazuje na osobę, wymaga zgody człowieka. | decision | Pytania 1, 9, 10 | Treść jedynej decyzji o tych regułach, której WAY-279 wymaga |
| 2 | Własną obsługę ostatniej szansy dostają programy dotykające danych kont, a w skryptach uruchamianych ręcznie albo przez bramkę testów regułę spełnia domyślny wypis środowiska. | decision | Pytanie 4 | Czy każdy skrypt dostaje własną obsługę |
| 3 | Nieoczekiwany błąd odczytu zapisu gry nie jest odmową: zapis zostaje nienaruszony, a gracz dostaje zdanie z pytania 16; ta zmiana zmienia D-213 i regułę „Odmowa zamiast wyjątku” w `guidelines/coding-saved-game.md`. | decision | Pytanie 16 | Czy błąd odczytu dalej nadpisuje zapis i co mówi gracz |

## Out of scope

- Jak długo żyją logi i jak człowiek dowiaduje się o awarii: to sprawy kroku technologii (WAY-271, WAY-165, WAY-270).
- Zmiana definicji MVP2, tabeli zadań w planie i dokumentów zadań 1–3.
- Zapisywanie tego, co robi gracz w grze: osobne zadanie `zadanie_zapisywac_dzialania_gracza.md`.
