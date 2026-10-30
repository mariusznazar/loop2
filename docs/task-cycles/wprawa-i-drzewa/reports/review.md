FAIL adc6e548095e56860964fc7f1e4df71d3a11db0f

## Wynik i zakres

3 uwagi Important blokujące, 2 Minor, 0 uwag poza zakresem. Nie potwierdziłem błędu działania obecnego kodu. Blokują utrata przyjętego zastrzeżenia w fundamencie oraz dwie rzeczywiste luki testów nowych obliczeń, wykazane mutacjami, które przechodzą testy i analizę typów.

Niezależnie przejrzany cały zakres `dce297060aeec3154e50593ee400c28b98649435..adc6e548095e56860964fc7f1e4df71d3a11db0f`, obliczony własnym `git diff` i `git log`. To jeden commit, bez planu i bez podziału na części. Wszystkie uwagi pochodzą z tego commita. HEAD przed i po przeglądzie odpowiada zleceniu. Gitlink oraz checkout `.the-way` wskazują `a8dfe8ac62885e88bc8f463e93ab16b621d48e92`. Produkt, fundament, indeks i branch pozostały nietknięte; końcowy `git status --short` jest pusty. Własne raporty, skrypty i dowody są wyłącznie pod `.runs/`.

## Important

### R1. Tymczasowe ustalenia MVP zapisano jako bezwarunkowe decyzje

**Nowy wątek. Kotwica:** [foundations/decisions.md:1232](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/foundations/decisions.md#L1232). Dalsze miejsca: [D-182:3226](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/foundations/decisions.md#L3226), [D-184:3256](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/foundations/decisions.md#L3256), [D-188:3316](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/foundations/decisions.md#L3316).

**Do wklejenia:** W przyjętych ustaleniach udźwig 15, brak gałęzi podnoszącej udźwig, brak gałęzi w edytorze poza przejściem, brak cofania zakupów i zapłata za każde domknięcie opisują to, co gra robi **dziś**; nowe decyzje pomijają to zastrzeżenie. Przywróć tę kwalifikację w D-64, D-182, D-184 i D-188 oraz zastosuj przyjętą w Q7 zasadę brzmienia nowych wpisów. Inaczej fundament mówi o trwałym wykluczeniu wariantów, które człowiek świadomie zostawił otwarte.

**Dlaczego to zgłaszam:** Fundament jest podstawą późniejszych zmian, więc istotna jest nie tylko zgodność z obecnym kodem, lecz także zakres przyjętej decyzji. [Zamrożone zadanie, Q7:71](../task.md#L71) przyjmuje zastrzeżenie „to są elementy na potrzeby mvp / docelowo się zmienią” i wymaga, aby wykluczenia opisywały to, czego gra dziś nie ma. Wiersze 4, 6, 9 i 12 tabeli [Settlements to record:171](../task.md#L171) zawierają tę kwalifikację wprost. Tymczasem D-64 mówi „Carrying capacity is 15 pieces, and the character skill trees have no branch that raises it.”, a D-188 „There is no purchase in the map-run view and no undo of a purchase.” D-182 utrwala każde domknięcie bez „currently”, choć zadanie 14 ma zmienić tę zasadę. To rozszerzenie przyjętego znaczenia, nie uwaga o stylistyce. D-184, a także nowe D-187 i D-189 wracają ponadto do wykluczającego „without”/„only”, przed którym Q7 ostrzega. Poprawka dotyczy nowych zapisów przez właściwy skill fundamentu; projektowane wpisy, które Q7 jawnie wyłącza z tej reguły, mają zachować uzgodnione brzmienie. Ocena Important wynika z utraty kwalifikacji przy zapisie źródła, zgodnie z regułą przeglądu WAY-263.

### R2. Test walki nie sprawdza dopisania jej wprawy do przejścia

**Nowy wątek. Kotwica:** [tests/sim/skills.test.mjs:430](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/tests/sim/skills.test.mjs#L430). Mechanizm: [src/browser/sim/skills.ts:128](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/src/browser/sim/skills.ts#L128) oraz [src/browser/sim/run.ts:611](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/src/browser/sim/run.ts#L611).

**Do wklejenia:** Test sprawdza wprawę zwróconą przez `resolveCombat`, ale nie sprawdza wprawy przejścia po odebraniu wyniku walki. Stryker pozostawił mutację 575, która w `sumPractice` odejmuje wynik walki zamiast go dodawać. Dodaj przypadek rozstrzygnięcia walki przez przejście z wcześniejszą wprawą i jawną oczekiwaną sumą.

**Dlaczego to zgłaszam:** Właśnie suma w przejściu trafia na ekran i przy domknięciu do postaci. Obecny test daje dowód, że walka policzyła np. dwa skuteczne ciosy, lecz nie dowodzi, że gracz je dostanie. Zmiana `+ right[id]!` na `- right[id]!` przechodzi cały zestaw mutacyjny 28 plików, a dodatkowa analiza typów nie zgłasza dla niej błędu. Przykładowo przejście z `smallItemGathering: 7, oneHandedCombat: 3`, po walce dającej dwa ciosy, powinno mieć odpowiednio 7 i 5; mutacja daje 7 i 1. Przypadek powinien przekroczyć rzeczywiste rozstrzygnięcie walki w minucie przejścia, sprawdzić obie umiejętności i zachowanie wejścia. To ochrona głównego nowego wymagania — sumowania skutecznych działań — a nie podnoszenie wyniku mutacji. Dowód: ID 575 w [raporcie Strykera](review-mutation.json) i [klasyfikacji](review-mutations.md).

### R3. Testy premii nie odróżniają działania własnej gałęzi od premii innych akcji

**Nowy wątek. Kotwica:** [tests/sim/skills.test.mjs:220](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/tests/sim/skills.test.mjs#L220). Mechanizm: [src/browser/sim/skills.ts:75](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/src/browser/sim/skills.ts#L75).

**Do wklejenia:** Wszystkie przypadki skracania akcji ustawiają pojedynczą gałąź pasującą do badanej akcji, więc przechodzą także po całkowitym wyłączeniu filtrowania premii po akcji — mutacja 538. Sprawdź postać z co najmniej dwiema różnymi gałęziami skracającymi czas i potwierdź osobno czas ich akcji. Na przykład Szybki posiłek 1 oraz Długi krok 1 powinny dać jedzenie 4 minuty i krok 3 minuty.

**Dlaczego to zgłaszam:** W grze postać może legalnie kupić jednocześnie gałęzie wielu drzew. Nowy wspólny kalkulator sumuje efekty wszystkich gałęzi, a ich lista akcji jest tym, co powstrzymuje przenikanie premii. Mutacja 538 zastępuje całe sprawdzenie tej listy wartością `false`: w przykładzie obie akcje trwają po 2 minuty, ponieważ obie dostają sumę 1+2. Wszystkie testy mutacyjne nadal przechodzą, a kod nadal przechodzi analizę typów. Dodatkowy przypadek z różnymi premiami i liczbami wyprowadzonymi z zadania ochroni regułę, że każda gałąź zmienia wskazane działanie. Nie potrzeba testować każdej kombinacji zakupów. Dowód: ID 538 w [raporcie Strykera](review-mutation.json).

## Minor

### R4. Sprawdź także zasoby pozostałych kafelków po zbieraniu

**Nowy wątek. Kotwica:** [tests/sim/skills.test.mjs:334](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/tests/sim/skills.test.mjs#L334). Mechanizm: [src/browser/sim/run.ts:195](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/src/browser/sim/run.ts#L195).

**Do wklejenia:** Testy Pełnej garści i Obchodu sprawdzają plecak i wprawę, ale nie zapas innego kafelka. Mutacja 313, która aktualizuje wszystkie kafelki zamiast bieżącego, pozostaje zielona. W jednym z istniejących przypadków warto dodać drugi kafelek z innym zapasem i sprawdzić, że pozostaje niezmieniony.

**Dlaczego to zgłaszam:** Obchód ma przenieść do plecaka zasób z bieżącego pola. Gdy tutaj leży 12 patyków, obok 5 i postać zabiera 12, sąsiednie pole powinno nadal mieć 5; mutacja ustawia tam 0, bo używa zapasu bieżącego pola. Obecna implementacja poprawnie porównuje tożsamość kafelka, a wcześniejsze zachowanie zwykłego zbioru jest zachowane, dlatego traktuję to jako szerszą ochronę przed regresją, Minor. Potrzebna jest asercja wyniku mapy, nie kolejna kombinacja wielkości plecaka. Dowód: ID 313 w [klasyfikacji mutacji](review-mutations.md).

### R5. Odkrycie po zapaleniu warto sprawdzić przy już znanym drzewie ogniska

**Nowy wątek. Kotwica:** [tests/sim/discovery.test.mjs:396](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/tests/sim/discovery.test.mjs#L396). Mechanizm: [src/browser/sim/understanding.ts:305](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/src/browser/sim/understanding.ts#L305).

**Do wklejenia:** Przypadki pierwszego zapalenia startują z pustego Zrozumienia i odkrywają przy okazji drzewo ogniska. Dodaj wariant z drzewem już poznanym przy zebraniu patyka: zapalenie ma odkryć Zasil oraz warunek energii także wtedy, gdy nie dodaje żadnego drzewa. Obecna mutacja 820 gubi to odkrycie, choć obecne testy przechodzą.

**Dlaczego to zgłaszam:** W zwykłej drodze do pierwszego zapalenia gracz wcześniej zbiera patyk, poznając drzewo ogniska i Płomyka. Pierwsze zapalenie daje wtedy jedną nową akcję i jeden warunek, a zero drzew i przedmiotów. Mutacja zmienia `actions.length + conditions.length` na odejmowanie, uznaje wynik 1−1 za pusty i zwraca brak odkrycia. Przy sztucznie pustym Zrozumieniu nowy w tym zadaniu warunek `trees.length === 0` ratuje test, bo drzewo właśnie przybyło. Obecny kod liczy poprawnie; Minor dotyczy szerszego sprawdzenia regresji wcześniejszego odkrywania po dodaniu drzew. Dowód: ID 820 w [klasyfikacji mutacji](review-mutations.md).

## Declined to judge

none. Zadanie nie obejmuje zapisu gry na serwerze ani późniejszych zasad pętli zarobkowych i strat po śmierci; nie oceniałem żadnej ich implementacji, ponieważ ten zakres jej nie wprowadza. Nie zgłaszam tu odłożonego znaleziska ani propozycji pracy poza zadaniem.

## Sprawdzenia i granice dowodu

### Lektura i zgodność

- Przeczytałem cały [zamrożony dokument zadania](../task.md), [handoff](reviewer-handoff.md) i [raport autora](author.md). Brak specyfikacji i planu jest zgodny z handoffem, nie brakiem wyszukiwania.
- Sam wybrałem fundament według części simulation, browser-view, build-tools i product-foundation. Przeczytałem pełne odpowiednie wpisy, z uzasadnieniami i odrzuconymi wariantami, oraz słownik produktu i procesu. Zmiany w fundamencie przeczytałem osobno od kodu; porównałem wszystkie 11 przyjętych wierszy tabeli i przypisane zadaniu wpisy projektowane z [planem](<C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/plan_mvp_loop2.md>) oraz [definicją MVP](<C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md>) — opisy postaci, wzrostu, własności wiedzy, zapłaty oraz pojęcia practice, trait, character skill i Understanding. Poza R1 nie stwierdziłem zmiany uzgodnionego znaczenia. Część o wspólnym zapisie Zrozumienia pozostaje przypisana zadaniu 16, a późniejsza zapłata pierwszego rozwiązania zadaniu 14; kod tej zmiany nie udaje ich wykonania.
- Przeczytane całe właściwe przewodniki: [coding.md](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/guidelines/coding.md), [testing.md](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/guidelines/testing.md), [coding-content-data.md](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/guidelines/coding-content-data.md), [coding-simulation-module.md](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/guidelines/coding-simulation-module.md), [coding-browser-module.md](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/guidelines/coding-browser-module.md), [styleguide-browser-view.md](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/guidelines/styleguide-browser-view.md), instrukcje repo i przeglądarki, metoda przeglądu przypiętego the-way i globalny playbook code review.
- Dane progów, kosztów, efektów i limitów odpowiadają zadaniu. Kod rozdziela wprawę przejścia i postaci, kopiuje rangi przy wysłaniu/restarcie, wypłaca w przejściu do completion i odrzuca zakupy przy każdym zachowanym przejściu. Odkrywanie drzewa i Obchodu, repertuar obu edytorów, limit 15, podłoga minuty oraz efekty gałęzi są zgodne przy lekturze. Nie znalazłem nowej granicy zaufania ani operacji na zewnętrznym stanie.
- Nowy test niezmiennika `action-duration-minimum` jest w [skills.test.mjs:192](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/tests/sim/skills.test.mjs#L192). Zmiany oczekiwań istniejących testów uwzględniają nowe pola, drzewa, Obchód i podłogę czasu; nie usunięto dowodu wcześniejszego zachowania. Rejestracja nowego pliku w Strykerze jest poprawna. Własne sprawdzenie autora dotyka wymaganych efektów, ale nie wyłapuje R2 i R3.

### Polecenia

Wszystkie polecenia produktu uruchomiono z `C:/Storage/repos/loop2-wt/wprawa-i-drzewa`.

| Polecenie / metoda | Wynik |
|---|---|
| `git rev-parse HEAD`; `git log dce297060aeec3154e50593ee400c28b98649435..adc6e548095e56860964fc7f1e4df71d3a11db0f`; `git diff dce297060aeec3154e50593ee400c28b98649435..adc6e548095e56860964fc7f1e4df71d3a11db0f` | exit 0; zakres i commit zgodne; diff przeczytany własnym odczytem |
| `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | exit 0; oba wskazują ten sam przypięty commit |
| `npm test -- tests/sim/skills.test.mjs` | exit 0; 16 testów, 16 pass, zero skips; [log](review-skills.log) |
| `npm test -- tests/view/character-skills.test.mjs` | exit 0; 4 testy, 4 pass, zero skips; [log](review-view.log) |
| Stryker, dokładne polecenie poniżej | exit 0; dry-run 28 plików udany; 828 mutacji, 761 killed, 63 survived, 4 no coverage, zero timeout i error; [log](review-mutation.log) |
| `node .runs/task-cycles/wprawa-i-drzewa/reports/review-mutant-types.mjs` | Pierwsza próba exit 1: pakiet kompilatora 7.0.2 nie udostępnia dawnego API `ts.sys`. Poprawiony wyłącznie skrypt analizy użył obecnego w repo API TypeScript 6.0.2; exit 0, 67 wirtualnych źródeł przeanalizowanych, 28 z diagnostykami. Nie zmieniono kompilatora ani kodu produktu. [Skrypt](review-mutant-types.mjs), [wynik](review-mutant-types.json) |
| `node .runs/task-cycles/wprawa-i-drzewa/reports/review-classify.mjs` | exit 0; wszystkie 67 pozostałych mutacji dostało klasyfikację i powód w [załączniku](review-mutations.md) |
| `python -B .runs/task-cycles/wprawa-i-drzewa/preview-server.py` | Lokalny serwer podał podgląd; zakończony przeze mnie Ctrl-C po sprawdzeniu, exit 1/KeyboardInterrupt oznacza sprzątnięcie procesu, nie błąd produktu |
| `node .runs/task-cycles/wprawa-i-drzewa/reports/review-ui.mjs` | Pierwsza próba exit 1: zła nazwa w moim selektorze „Sokole oko”, timeout. Po odczycie danych i poprawieniu na „Wprawne oko” exit 0; szczegóły poniżej |
| `git status --short`; `git rev-parse HEAD` na końcu | exit 0; czyste drzewo produktu, nadal oceniany HEAD |

Dokładne polecenie mutacyjne:

```text
node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate 'src/browser/sim/skills.ts,src/browser/sim/data/skills.ts,src/browser/sim/data/actions.ts:58-66,src/browser/sim/combat.ts:60-112,src/browser/sim/game.ts:105-150,src/browser/sim/game.ts:230-246,src/browser/sim/game.ts:505-540,src/browser/sim/program.ts:160-250,src/browser/sim/programs.ts:134-150,src/browser/sim/run.ts:100-145,src/browser/sim/run.ts:160-210,src/browser/sim/run.ts:245-300,src/browser/sim/run.ts:340-390,src/browser/sim/run.ts:475-550,src/browser/sim/run.ts:600-620,src/browser/sim/understanding.ts:27-75,src/browser/sim/understanding.ts:90-105,src/browser/sim/understanding.ts:140-170,src/browser/sim/understanding.ts:195-235,src/browser/sim/understanding.ts:265-350'
```

Raport [review-mutation.json](review-mutation.json) jest kopią wyniku Strykera zachowaną dla tego przeglądu. Narzędzie objęło 9 plików; dla dwóch plików danych nie wygenerowało mutacji. Dane oceniono przez lekturę i jawne wartości testów, a nie przez procent mutacji. Deklaracje typów nie mają zachowania do mutowania. Stryker uruchomił własną piaskownicę, bez checkera, zgodnie z przewodnikiem; testy widoku i Pythona nie należą do tego przebiegu. [Załącznik klasyfikacji](review-mutations.md) rozdziela rzeczywiste luki od zmian równoważnych, niekompilowalnych i niewartych utrwalania. Nie stosuję progu procentowego.

Nie uruchamiałem pełnego `npm test` ani osobnej kontroli fundamentu — zgodnie z handoffem pełną bramkę wykonuje orkiestrator po przeglądzie. Nie są tu zaliczone jako pass. Wczesny pełny baseline przerwany przez orkiestratora również nie jest pełnym pass; pozostaje wynikiem opisanym w handoffie. Nie wykonywałem wdrożenia ani kontroli na realnym koncie.

### Przeglądarka i wygląd

Przeczytałem skill Playwright MCP i jego właściwe odniesienia. Wspólny profil MCP był według handoffu zajęty; nie przejmowałem go ani nie zamykałem cudzej sesji. Użyłem autoryzowanego odwracalnego wariantu: osobny headless Chrome z zainstalowanego Playwrighta i nowy profil, lokalny podgląd na `127.0.0.1:8765`, realne moduły symulacji i widoku z ocenianego buildu.

Obejrzałem 7 zrzutów autora: [siedziba](ui-hq.png), [właściciel Obchodu](ui-owner-run.png), [inna postać](ui-nonowner-run.png), [domknięcie](ui-completed.png), [śmierć](ui-dead.png), [odkrycie](ui-discovery.png), [początek gry](ui-fresh.png). Zrzuty pokazują wymagane role i stany bez usterek wyglądu uzasadniających uwagę.

Własny [skrypt sprawdzenia](review-ui.mjs) oraz [zapis wyników](review-ui-results.json) potwierdzają:

- Kupno Wprawnego oka klawiszem Enter zmienia 0/3 na 1/3, 70%→75% na 75%→80%, odejmuje punkt i zachowuje fokus z widocznym obramowaniem. Druga postać nie ma aktywnych przycisków zakupu. [Własna siedziba](review-ui-headquarters.png).
- Przy szerokości 390 px treść mieści się w 390 px, opisy się zawijają, przyciski pozostają widoczne. [Wąski widok](review-ui-narrow.png).
- [Domknięcie](review-ui-completed.png) zachowuje pod ciałem „Zbieranie małych przedmiotów +5 · Jedzenie +1”; Restart ukrywa pustą linię. [Śmierć](review-ui-dead.png) zachowuje +5 zbierania, a Zakończ usuwa widok linii. [Odkrycie](review-ui-discovery.png) nazywa drzewo Eksploracja w tej samej pauzie i zachowuje zdanie o warunkach. Świeży stan nie pokazuje sekcji umiejętności. Zero `pageerror`.

To sprawdzenie komponentów z przygotowanym stanem wejściowym, przepuszczonym przez rzeczywiste przejścia symulacji. Nie twierdzę, że ręcznie zdobyłem 1000 wprawy ani rozegrałem naturalną całą mapę. Podgląd składa te same moduły widoku osobno; podłączenie w `createGameView` oceniono przez lekturę diffu, nie przez podmieniony stan realnego konta. Żadna nowa wspólna kontrolka ani rola nie wymaga uzupełnienia strony wszystkich stanów. Nie stwierdziłem warunku powrotu do automatyzacji pełnych ścieżek przeglądarkowych ani porównań ekranów piksel po pikselu.

## Sięgnięcia poza wskazane materiały

Wybór pełnych wpisów fundamentu i przewodników był moim obowiązkiem w przeglądzie całości. Dodatkowo sprawdziłem bieżące dane akcji i warunków oraz `programOf`, `checkProgram`, `itemFor`, wywołania repertuaru i `finishMinute`, aby ustalić osiągalność ocalałych mutacji; test odkrywania przy pierwszym zapaleniu, aby wyjaśnić ID 820; definicję typów i konfigurację kompilatora, aby odróżnić luki testów od mutacji odrzucanych przez typy. Odczytałem lokalne metadane dwóch istniejących pakietów TypeScript po nieudanej próbie API. Nie pobierałem zależności i nie korzystałem z innych wersji procesu.

## Searches not found or unclear

- Niektóre zbiorcze odczyty zadania, decyzji, diffu i przewodników zostały ucięte przez limit wyjścia. Odczytałem odpowiednie części ponownie mniejszymi porcjami; żaden wniosek o braku nie opiera się na uciętym wyniku.
- Odczyt hipotetycznego `src/browser/sim/data/tiles.ts` zwrócił brak pliku. Właściwe `stepMinutes` odnalazłem i przeczytałem w istniejącym [maps.ts](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/src/browser/sim/data/maps.ts); brak tamtego pliku nie stał się znaleziskiem produktu.
- Odczyt `tsconfig.base.json` zwrócił brak pliku. [tsconfig.browser.json](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/tsconfig.browser.json) jest samodzielny i nie ma `extends`, więc nie potrzebował tego pliku.
- Pierwsza pomocnicza projekcja pozycji mutacji użyła kolumn od zera zamiast od jedynki i zgłosiła błędy `Substring`. Poprawny odczyt oryginalnych fragmentów i analiza typów używają numeracji raportu Strykera, od jedynki. Nie opieram klasyfikacji na błędnej projekcji.
- Timeout selektora Wprawnego oka oraz brak starego API kompilatora opisano jawnie przy poleceniach. Oba problemy dotyczyły własnego narzędzia sprawdzenia, zostały rozstrzygnięte z lokalnych źródeł i nie są błędami produktu.

Brak pytań wymagających rozstrzygnięcia przed oddaniem tego przeglądu.
