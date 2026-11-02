# Lokalny start gry przez HTTPS, z bazą na to sprawdzenie, prawdziwym README i agentem grającym w przeglądarce

Status: ready for cycle
Project relation: plan item: plan_mvp2_loop2.md — lokalny-start

## Description

### Need

- Po `npm start` i otwarciu `http://127.0.0.1:3000`, jak każe README (`README.md:12`–`:13`, loop2 48544f0), strona się otwiera, ale do gry nikt nie wejdzie: „Samo `npm start` nie pozwala nikomu się zalogować” (`rozpoznanie_mvp2/technologia_obsluga_gry_przez_agenta.md`, część 1).
- Serwer bez ustawień kont odpowiada na żądania kont kodem 503 (`src/server/account-routes.ts:355`, loop2 48544f0), a to zachowanie jest zamierzone (D-111).
- Serwer z kontami wymaga dziewięciu ustawień, w tym adresu zaczynającego się od `https://` (`src/server/configuration.ts:30`, `:162`, loop2 48544f0).
- Żądania kont przechodzą tylko jako HTTPS i z dokładnie tym adresem (`src/server/transport.ts:50`, `:67`, loop2 48544f0), a sam serwer po HTTPS nie mówi (`src/server/main.ts:18`, loop2 48544f0).
- README mówi też: „Stan gry żyje tylko w pamięci strony” (`README.md:55`) i „Konta, zapis stanu i serwerowa część gry jeszcze nie istnieją” (`README.md:79`), a kod już tego nie potwierdza.
- Bez lokalnej drogi do gry agent nie sprawdzi ekranów tego projektu tak jak gracz: „the project is made of screens, and an agent that cannot use them as a player does cannot check its own work” (definicja, wpis „How does an agent operate the game as a player does?”, *Rationale*).
- Cel zadania w planie: „Jedno polecenie uruchamia grę na komputerze przez HTTPS, z bazą założoną na to sprawdzenie, README mówi prawdę o uruchamianiu, a agent gra w nią w prawdziwej przeglądarce.” (`plan_mvp2_loop2.md`, wiersz 1 tabeli zadań, stan 2026-11-01).

### To do

1. Jedno polecenie repozytorium buduje grę, a potem uruchamia ją na komputerze przez HTTPS (definicja, In scope, pozycja „Lokalny start gry”; Q10).
   - Polecenie robi własny certyfikat i przedstawia się nim przeglądarce, a człowiek klika w przeglądarce „przejdź dalej” (Q3).
   - Ustawienia poczty wskazują adres, pod którym nic nie odpowiada, a kodu serwera się nie zmienia (Q2).
2. Każdy start polecenia usuwa bazę poprzedniego startu i zakłada nową, a sprawdzenie nie dotyka serwera testowego ani zapisu gracza (plan, cel zadania; definicja, wpis „Where does the data an agent checks the game on come from?”; Q1).
3. README mówi prawdę o tym, jak uruchomić grę (definicja, In scope, pozycja „Lokalny start gry”; Q5).
   - Zmieniają się miejsca o uruchamianiu: `README.md:7`–`:15`, `:65`–`:71` i `:79` (loop2 48544f0).
   - README mówi, że konto założone po lokalnym starcie przepada przy następnym starcie, że poczta lokalnie nigdzie nie dochodzi i że przeglądarka ostrzega przed certyfikatem (Q1, Q2, Q3).
   - Sekcja „Co pokazuje strona” (`README.md:47`–`:55`, loop2 48544f0) znika z README.
   - Docstringi siedmiu testów powołują się na README i po zmianie dalej mówią prawdę: `npm start` w `tests/invariants/test_loop2_one_serving_process.py:10` i `tests/invariants/test_loop2_api_error_route.py:5`, `npm run build` w `tests/invariants/test_application_build_output.py:4` i `tests/invariants/test_application_build_kitchen_sink.py:4`, miejsca `src/browser` i `src/server` w `tests/invariants/test_browser_view_framework.py:5`, `tests/invariants/test_account_server_express_http.py:7` i `tests/invariants/test_account_server_typecheck.py:6` (loop2 48544f0).
4. Agent obsługuje działającą grę w prawdziwej przeglądarce przez Playwright CLI, a gdzie CLI zawiedzie, przez Playwright MCP, i czyta ruch ze strumienia klatek (definicja, wpis „How does an agent operate the game as a player does?”).
   - Ustawienie certyfikatu dla Playwright CLI stoi w `.playwright/cli.config.json` w katalogu głównym repozytorium (Q9).
   - Pliki robocze Playwright CLI, katalog `.playwright-cli/`, nie wchodzą do gita.
   - Repozytorium mówi agentowi, jak tą drogą dojść do gry; miejsce tego opisu wybiera cykl.
5. Cykl zapisuje w `foundations/decisions.md` przez `the-way-record-decision` to, co kod tego zadania czyni prawdziwym (WAY-126):
   - Cały wpis „How does an agent operate the game as a player does?” (plan, Projected entries: *Written by* 1).
   - Część wpisu „Where does the data an agent checks the game on come from?”, oznaczoną w *Decisions in play*; resztę dopisuje zadanie 5, przy którym plan zostawia *Written by*.
6. Cykl zmienia przez `the-way-record-decision` fragment *Rejected* w D-234 (plan, Open questions; Q6).
   - Dotychczasowe brzmienie: „a browser on the owner's computer — a login cannot work on a locally run production image”.
   - Nowe brzmienie: „a browser on the owner's computer — a login cannot work on a locally run production image, which takes requests of the tunnel alone; the local start signs in over HTTPS, but it runs a build and not the image the trial has to prove”.
7. Mapa części obejmuje każdy nowy plik tego zadania przez `the-way-update-part-map`, bo `foundation_check.py` zgłasza plik bez części (Q7, Q9).
   - `.playwright/cli.config.json` należy do części `agent-workflow`.
   - Plik polecenia, który sam przyjmuje połączenia, stoi w *Trust boundary* części, która go obejmuje.
8. Ten plik polecenia ma regułę odmowy i stały test sprawdzający ją bezpośrednio, oznaczony niezmiennikiem i raz widziany z porażką (Q7).
   - Treść reguły stoi w wierszu 4 *Settlements to record*.
   - Przez `the-way-maintain-testing-guidelines` sekcja „Trust boundaries” w `guidelines/testing.md` dostaje wiersz tej granicy w tabeli, a jej listy *Decision* i *Invariant* (`guidelines/testing.md:149`–`:150`, loop2 48544f0) obejmują wpisy, na których ta granica stoi.

### Acceptance criteria

- Agent w świeżej sesji, wyłącznie z tego, co mówi repozytorium, uruchamia polecenie, zakłada konto formularzem, wchodzi do gry, wysyła postać, widzi rosnącą minutę, po przeładowaniu wraca na to samo trwające przejście, które stoi wstrzymane, wznawia je przyciskiem „Wznów” i dopiero wtedy odbiera strumień klatek (Q8, D-212).
- To sprawdzenie jest jednorazowe: dowód idzie do requestu, a stały test nie zostaje (D-75, D-88).

### Questions to settle

- Q1. Co dzieje się z kontami i zapisami gry między kolejnymi startami polecenia?
  - Answer:
    - Cytat z definicji: „An agent builds the game state a check needs with functions of the simulation and sends it by the ordinary save request to a local server with a database made for that check, and it reaches early states by playing. One command of the repository starts the game locally over HTTPS, and a check touches neither the test server nor a player's save.”
    - Cytat z *Rejected* tego wpisu: „a lasting local database — its saves go at a change of version”.
    - Odpowiedź człowieka: baza jest jednorazowa, a polecenie nie służy człowiekowi do grania z kontem zachowanym między startami, bo człowiek gra na serwerze testowym.
    - Start usuwa bazę poprzedniego startu, bo na Windows polecenie nie zawsze posprząta po sobie przy zamykaniu.
    - Czy plik bazy znika przy zamknięciu, czy przy następnym starcie, wybiera cykl.
    - Z tej samej bazy korzysta zadanie 5 (plan, wpis „Where does the data an agent checks the game on come from?”).
  - Not chosen:
    - Osobny przełącznik zachowujący bazę między startami — drugi tryb w poleceniu i README, a zapisy i tak przepadają przy zmianie wersji gry.
  - Source: `definicja_mvp2_loop2.md:1125`, `:1134`, `:1136`, Status approved 2026-11-01, odcisk 8de9ffff; człowiek, 2026-11-01, „zgadzam się na komplet rekomendacji”, pakiet rundy, pozycja 2, cytat nieskreślony.
- Q2. Co ma się dziać z pocztą konta przy lokalnym starcie: czy wystarczy, że wysyłka się nie udaje, czy wiadomości z odnośnikami mają dać się odebrać na komputerze?
  - Answer:
    - Odpowiedź człowieka: poczta wskazuje adres, pod którym nic nie odpowiada, serwera się nie zmienia, a całą drogę z pocztą przechodzi człowiek na serwerze testowym.
    - Ta odpowiedź dotyczy też zadania 2: potwierdzenie adresu i udane ustawienie hasła przechodzą tam do końca tylko na serwerze testowym.
    - Cytat z D-111, *Rationale*: „The mail settings count as account settings, so a server that holds accounts can always send their confirmation messages, and every local run or test that configures accounts supplies them; the mail service is not reached at startup, so its failure never keeps the game down.”
    - Cytat z D-111, *Rejected*: „mail as a separate optional group with mail switched off outside production — a second configured but incomplete mode beside the one unconfigured mode”.
    - Fakt z kodu, tak jest dziś: działający serwer tworzy nadawcę poczty bez dodatkowego certyfikatu (`src/server/configuration.ts:217`), a opcję „Tests only: one more certificate the server's chain may end in.” (`src/server/account-mail.ts:55`) przekazują tylko testy (`tests/account-mail.test.mjs:218`, `:515`).
  - Not chosen:
    - Mały odbiornik poczty na komputerze z odnośnikami wypisywanymi przez polecenie — zadanie 1 rośnie, może wymagać zmiany w serwerze, a oszczędzająca to zmienna `NODE_EXTRA_CA_CERTS` nie została uruchomiona.
  - Source: człowiek, 2026-11-01, „zgadzam się na komplet rekomendacji”, pakiet rundy, pozycja 1; `foundations/decisions.md:1997`, `:1998`, loop2 48544f0; kod loop2 48544f0 we wskazanych wierszach; `plan_mvp2_loop2.md`, Change log, ostatni wpis z 2026-11-01.
- Q3. Czym gra przedstawia się przeglądarce przy lokalnym starcie i co widzi człowiek, który ją otwiera?
  - Answer:
    - Odpowiedź człowieka: polecenie robi własny certyfikat, a człowiek klika w przeglądarce „przejdź dalej”.
    - Pytanie przeciw temu wyborowi, z kotwicą „protection on a computer may block the script that makes a certificate”: czy wybór zostaje, skoro blokada tego komputera zatrzymuje polecenie wpisane przez agenta, w którym pada rozszerzenie pliku klucza?
    - Odpowiedź człowieka: wybór zostaje, a czy klucz leży między startami, wybiera cykl.
    - Koszt przyjęty przy tej odpowiedzi: agent nie może wpisywać tych poleceń ręcznie, a przy zablokowanym skrypcie zadanie wróci.
  - Not chosen:
    - Lokalny urząd certyfikacji zaufany w systemie, przez mkcert albo Caddy — nowy program, trwała zmiana zaufania, klucz na dysku, czynność człowieka przed cyklem.
  - Source: człowiek, 2026-11-01, „zgadzam się na komplet rekomendacji”, pakiet rundy, pozycja 3; człowiek, 2026-11-01, „wszystko według rekomendacji”, pytanie przeciw wyborowi P1; kotwica: `definicja_mvp2_loop2.md:1133`, odcisk 8de9ffff.
- Q4. Jak Playwright MCP, zapasowa droga agenta, przyjmuje lokalny certyfikat?
  - Answer: Pytanie przechodzi do *Questions carried to cycle*, z warunkiem, który tam stoi.
  - Source: krytyka rundy, 2026-11-01, uwagi 8 i 9, przyjęte przez orkiestratora projektu; człowiek, 2026-11-01, „zgadzam się na komplet rekomendacji”, bez sprzeciwu wobec listy „Rozstrzygam bez Ciebie”.
- Q5. Jak daleko sięga poprawka README?
  - Answer:
    - Cytat z definicji, In scope: „Lokalny start gry: jedno polecenie uruchamia grę na komputerze przez HTTPS, a README mówi prawdę o tym, jak ją uruchomić.”
    - Cytat z planu, cel zadania 1: „Jedno polecenie uruchamia grę na komputerze przez HTTPS, z bazą założoną na to sprawdzenie, README mówi prawdę o uruchamianiu, a agent gra w nią w prawdziwej przeglądarce.”
    - Odpowiedź człowieka: poprawiamy uruchamianie i usuwamy sekcję „Co pokazuje strona”.
    - To rozszerzenie zakresu człowieka, nie wniosek z dokumentów: żaden wpis `foundations/` ani plik `guidelines/` nie mówi o treści README.
  - Not chosen:
    - Zostawić sekcję — README dalej mówi nieprawdę o ekranach.
    - Przepisać sekcję — praca do wyrzucenia, bo zadania 2–7 zmieniają te ekrany.
  - Source: `definicja_mvp2_loop2.md:56`, Status approved 2026-11-01, odcisk 8de9ffff; `plan_mvp2_loop2.md:10`, Status handed over 2026-11-01; człowiek, 2026-11-01, „zgadzam się na komplet rekomendacji”, pakiet rundy, pozycja 5, cytat nieskreślony.
- Q6. Czy D-234 zmienia to zadanie i jaką zmianę ma dostać, skoro zdanie, które plan kazał poprawić, po tym zadaniu nadal będzie dosłownie prawdziwe?
  - Answer:
    - Odpowiedź człowieka z planu: „wszystkie, każdy w zadaniu, którego zmiana go unieważnia: D-234 w zadaniu 1, D-196 i D-207 w zadaniu 4, a „Odbierz” dopisuje do D-207 zadanie 25, D-91 w zadaniu 5, D-46 w zadaniu 6, D-71 w zadaniu 10, D-126 i D-127 w zadaniu 11, D-55 i D-171 w zadaniu 13, D-57 w zadaniu 14, jeśli wiersz ciała się zmieni, D-47 w zadaniu 24”.
    - Odpowiedź człowieka o brzmieniu: nowe brzmienie z To do 6.
    - Fakt z kodu, tak jest dziś: obraz ustawia `NODE_ENV=production` (`Dockerfile:18`), a wtedy serwer przyjmuje tylko tryb `cloudflare-tunnel` (`src/server/configuration.ts:181`).
  - Not chosen:
    - Zostawić zdanie i skreślić poprawkę z planu — czytelnik może uznać, że lokalnie nikt się nie zaloguje.
  - Source: `plan_mvp2_loop2.md:135`, odpowiedź człowieka 2026-11-01; człowiek, 2026-11-01, „zgadzam się na komplet rekomendacji”, pakiet rundy, pozycja 6; `foundations/decisions.md:4559`–`:4560`, kod loop2 48544f0.
- Q7. Czy plik polecenia, który przyjmuje połączenia przeglądarki i trzyma klucz certyfikatu, staje na mapie części jako granica zaufania, a jeśli tak, to czy dostaje stały test odmowy?
  - Answer:
    - Cytat z szablonu mapy: „A trust boundary is a pattern of the code files of a part that take in what the product does not control: data from the network, keys, the deployment, files that come from outside the product, such as one on the user's disk.”
    - Cytat z `guidelines/testing.md`: „Każda granica zaufania z mapy części ma regułę odmowy i przynajmniej jeden stały test sprawdzający odmowę bezpośrednio, oznaczony niezmiennikiem i raz widziany z porażką.”
    - Cytat z D-73: „Loop2 adopts the testing-guideline template of its pinned the-way in full, with only the departures of D-74, D-75, D-76, D-77, D-78, D-79, D-163 and D-235.”
    - Odstępstwo D-76 nie obejmuje tego pliku: mówi tylko o „font files and the local interface preview server”.
    - Rozstrzygnięcie: plik polecenia, który sam przyjmuje połączenia, jest granicą zaufania ze stałym testem odmowy.
    - Brzmienie reguły odmowy stoi w wierszu 4 *Settlements to record*, a nagłówki, które reguła obejmuje, nazywa cykl.
  - Source: `.the-way/elements/part-map/template.md:98`–`:100`, a8dfe8a; `guidelines/testing.md:154`–`:156`, `foundations/decisions.md:1412`, `:1451`, loop2 48544f0; człowiek, 2026-11-01, cytat pokazany w pakiecie rundy i nieskreślony; człowiek, 2026-11-01, „wszystko według rekomendacji”, wiersz reguły odmowy.
- Q8. Co agent ma zrobić w grze, żeby zadanie było skończone?
  - Answer:
    - Odpowiedź człowieka: droga z *Acceptance criteria*.
    - Rozstrzygnięcie orkiestratora, bez sprzeciwu człowieka: po przeładowaniu przejście wraca wstrzymane, a agent wznawia je przyciskiem „Wznów”, zanim odczyta klatki.
  - Not chosen:
    - To samo plus przeciąganie reguły, klawiatura i śmierć przy 16× — więcej tokenów, a te czynności wrócą przy edytorze.
    - Tylko konto i wejście — nie pokazuje tego, co obiecuje wpis.
  - Source: człowiek, 2026-11-01, „zgadzam się na komplet rekomendacji”, pakiet rundy, pozycja 4; człowiek, 2026-11-01, „wszystko według rekomendacji”, bez sprzeciwu wobec listy rozstrzygnięć orkiestratora; `foundations/decisions.md:3889`, loop2 48544f0 (D-212).
- Q9. Gdzie leży plik ustawień Playwrighta i która część mapy go obejmuje?
  - Answer:
    - Odpowiedź człowieka z planu: „miejsce pliku ustawień Playwrighta wskazuje zadanie 1”.
    - Cytat z definicji: „`agent-workflow` przez obsługę gry przez agenta i lokalny start”.
    - Cytat z szablonu mapy: „The files that only direct whoever carries out the repository's tasks — instructions for agents, skills, hooks and the configuration of agents' tools and of CI — are another part of their own”.
    - Rozstrzygnięcie: plik leży w `.playwright/cli.config.json` w katalogu głównym repozytorium, w części `agent-workflow`.
    - Fakt o narzędziu, odczytany, nie uruchomiony: `@playwright/cli` 0.1.22 szuka domyślnie `path.resolve(".playwright", "cli.config.json")`, liczonego od katalogu wywołania; README narzędzia: „Playwright CLI will load config from `.playwright/cli.config.json` by default”.
  - Not chosen:
    - Inne miejsce podawane przy każdym wywołaniu — agent musi pamiętać o opcji, a pominięcie daje błąd certyfikatu.
  - Source: `plan_mvp2_loop2.md:134`, odpowiedź człowieka 2026-11-01; `definicja_mvp2_loop2.md:114`, `:1118`, odcisk 8de9ffff; `.the-way/elements/part-map/template.md:73`–`:75`, a8dfe8a; `foundations/part_map.md:116`, loop2 48544f0; `C:\Program Files\nodejs\node_modules\@playwright\cli\README.md:418`, wersja 0.1.22, odczyt 2026-11-01; człowiek, 2026-11-01, „zgadzam się na komplet rekomendacji”, cytat nieskreślony.
- Q10. Czy polecenie działa zaraz po `npm ci`, czyli samo buduje grę?
  - Answer:
    - Odpowiedź człowieka: polecenie buduje grę, a potem ją uruchamia.
    - Fakt z kodu, tak jest dziś: obok `npm start` jest polecenie, które buduje i uruchamia, `"dev": "npm run build && npm start"` (`package.json:14`).
  - Not chosen:
    - Tylko uruchamia, a budowanie jest osobnym krokiem — dwa polecenia wbrew „jedno polecenie” z definicji i ryzyko sprawdzania starej wersji.
  - Source: człowiek, 2026-11-01, „zgadzam się na komplet rekomendacji”; `definicja_mvp2_loop2.md:56`, odcisk 8de9ffff; `package.json:13`–`:14`, loop2 48544f0.

## Context

- Dwa raporty, z których wzięto wybór narzędzi i próby, leżą w `rozpoznanie_mvp2/`: `technologia_obsluga_gry_przez_agenta.md` i `technologia_dane_do_sprawdzania.md`.
- Próba z raportu pokazała, że droga działa: serwer w trybie `loopback-proxy` z dziewięcioma ustawieniami i małym programem na `node:https` przed nim dał konto, sesję i zapis w przeglądarce (`technologia_dane_do_sprawdzania.md`, część 5, opcja A).
- Tryb `loopback-proxy` już jest w serwerze: ufa tylko sąsiadowi z tego samego komputera, wymaga przekazanego `https` i liczy limity po jego adresie (`src/server/transport.ts:27`–`:39`, `:50`–`:55`, loop2 48544f0; D-110).
- Znacznik `archive/10x-m3l4` trzyma próbny kod spoza the-way: `tests/e2e/support/local-https.mjs` (253 wiersze) i `.playwright/cli.config.json` o treści `{"browser":{"contextOptions":{"ignoreHTTPSErrors":true}}}`; na `main` ich nie ma.
- Tamten skrypt podaje cztery ustawienia, a `main` wymaga dziewięciu, więc nie zadziała bez poprawki (`technologia_obsluga_gry_przez_agenta.md`, część 2).
- Test `tests/invariants/test_loop2_one_serving_process.py` uruchamia serwer przez `npm start` i oczekuje jednego procesu na jednym porcie, więc zmiana samego `npm start` dotyka niezmiennika `loop2-one-serving-process`.
- Obraz z `Dockerfile` nie zastąpi tego polecenia: ustawia `NODE_ENV=production` (`Dockerfile:18`, loop2 48544f0), a wtedy serwer przyjmuje tylko tryb `cloudflare-tunnel` (`src/server/configuration.ts:181`, loop2 48544f0).
- Baza musi być plikiem, bo serwer odmawia `:memory:` (`src/server/configuration.ts:158`, loop2 48544f0), a włączony tryb WAL zostawia przy niej pliki poboczne (`src/server/database.ts:212`, loop2 48544f0).
- Limit pięciu nowych kont na godzinę z jednego adresu żyje w pamięci serwera, więc znika po restarcie (`technologia_dane_do_sprawdzania.md`, część 3; `src/server/account-policy.ts:9`, loop2 48544f0).
- Rejestracja czeka na wynik wysyłki poczty, ograniczony terminem, a sam nadawca ma termin 10 sekund (`src/server/account-routes.ts:323`, `src/server/account-mail.ts:25`, loop2 48544f0); w próbie z raportu rejestracja bez serwera poczty przeszła, a gra pokazała adres jako niepotwierdzony (`technologia_dane_do_sprawdzania.md`, część 3).
- Ochrona komputera właściciela zablokowała polecenia tworzące certyfikat, w których treści padało rozszerzenie `.pem` (`technologia_dane_do_sprawdzania.md`, część 3), a wpis definicji zapisuje to jako ryzyko.
- Tą ochroną jest hook agenta `C:\Users\Mariusz\.claude\scripts\pretooluse-guard.sh`, który czyta wyłącznie tekst polecenia wpisanego przez agenta w narzędziach Bash i PowerShell (wiersze `:3`, `:45`, odczyt 2026-11-01).
- Skrypt repozytorium uruchamiany po nazwie tego hooka nie spotyka, czego nikt nie uruchomił.
- Komunikat hooka mówi: „Plik, który sam tworzysz na potrzeby testu i kasujesz po nim, nazwij bez rozszerzenia .pem/.p12/.pfx — to nie jest obejście.” (wiersz `:62`, odczyt 2026-11-01).
- Na komputerze właściciela `playwright-cli` jest zainstalowane globalnie w wersji 0.1.22, a raport opisuje 0.1.23 (`npm ls -g`, odczyt 2026-11-01).
- Domyślna ścieżka ustawień Playwright CLI liczy się od katalogu wywołania, a README każe wykonywać polecenia w głównym katalogu repozytorium (`README.md:5`, loop2 48544f0).
- `.gitignore` repozytorium nie obejmuje `.playwright-cli/`, a `.playwright-mcp/` ignoruje tylko osobisty plik właściciela (`C:\Users\Mariusz\.config\git\ignore:6`, odczyt 2026-11-01).
- Strumień klatek próba z raportu mierzyła biblioteką Playwright (`page.screencast`, `onFrame`), a drogę przez `run-code` w Playwright CLI raport podaje z dokumentacji (`technologia_obsluga_gry_przez_agenta.md`, części 3 i 4).
- Sprawdzenie agenta dokłada się do ręcznego sprawdzenia człowieka i niczego w nim nie zastępuje (definicja, wpis „How does an agent operate the game as a player does?”), więc po tym zadaniu w repozytorium nie zostaje stały test Playwrighta (D-75, D-88).

## Questions carried to cycle

- Jak nazywa się polecenie i czy `npm run dev` zostaje obok niego.
- Jaki adres i port dostaje gra, i czy dwa równoległe starty mają sobie nie wchodzić w drogę; start uruchamiany przez test bierze wolny port (D-49).
- Czy start usuwa bazę, której używa inny działający start (To do 2).
- Skąd biorą się lokalne pliki sekretów, których wymaga serwer z kontami: `LOOP2_SESSION_SECRET_FILE` i `LOOP2_SMTP_PASSWORD_FILE` (`src/server/configuration.ts:185`–`:188`, loop2 48544f0).
- Które nagłówki pośrednika obejmuje reguła odmowy z wiersza 4 *Settlements to record*; nazywa je cykl (człowiek, 2026-11-01).
- Czy plik bazy znika przy zamknięciu polecenia, czy leży do następnego startu, oraz jak agent kończy polecenie, skoro na Windows proces potomny zakończony sygnałem SIGTERM nie uruchomił obsługi sygnału (próba krytyki rundy, 2026-11-01); usunięcie bazy przy starcie obejmuje też jej pliki poboczne.
- Jaki adres poczty podać, żeby wysyłka kończyła się od razu, a rejestracja nie czekała na termin.
- Czym powstaje certyfikat i jak nazywają się jego pliki, tak by zadziałało to na komputerze z ochroną opisaną w Context, i czy certyfikat leży między startami.
- Czy `.playwright/cli.config.json` z treścią z `archive/10x-m3l4` działa na zainstalowanej wersji Playwright CLI; ścieżka i treść są odczytane, nie uruchomione.
- Czy `run-code` zainstalowanej wersji Playwright CLI daje strumień klatek.
- Jak Playwright MCP przyjmuje lokalny certyfikat (Q4), pod warunkiem: bez czynności człowieka i bez zmiany wpisu definicji; w przeciwnym razie cykl pyta człowieka.
  - Znana możliwość: plik `.mcp.json` w repozytorium z flagą `--ignore-https-errors`, a wtedy dochodzi wiersz w mapie części.
  - Czy Claude Code poprosi człowieka o zgodę na serwer z tego pliku, nikt nie sprawdził; taka zgoda liczy się jako czynność człowieka z warunku wyżej, więc cykl wtedy pyta człowieka.
  - Znana możliwość: zmienna `PLAYWRIGHT_MCP_IGNORE_HTTPS_ERRORS` (`C:\Program Files\nodejs\node_modules\@playwright\cli\README.md:583`), której dojścia do serwera wtyczki nikt nie sprawdził.
- Skąd agent bierze Playwright CLI: przypięte w `devDependencies`, co zmienia `package-lock.json` i uruchamia audyt (D-33), czy globalnie zainstalowane; czynność poza repozytorium, którą cykl tu znajdzie, trafia do człowieka (WAY-140).
- Gdzie repozytorium opisuje agentowi drogę do gry: w skillu projektu czy w pliku instrukcji.
- Pola *Based on*, *Relations* i *Verification* wpisu „How does an agent operate the game as a player does?” oraz pola *Relations* i *Verification* wpisu „Where does the data an agent checks the game on come from?” stoją w definicji jako `TODO` i wypełnia je cykl przy zapisie wpisu albo jego części.

## Human actions

none

## Decisions in play

Przydział z planu: to zadanie urzeczywistnia i pisze wpis o obsłudze gry przez agenta, a wpis o danych do sprawdzania urzeczywistnia częściowo, a jego *Written by* stoi przy zadaniu 5.

Część, którą kod tego zadania czyni prawdziwą, zadanie zapisuje w fundamencie (WAY-126; rozstrzygnięcie orkiestratora, człowiek bez sprzeciwu, 2026-11-01).

### Wpisy rzutowane (definicja `definicja_mvp2_loop2.md`, odcisk 8de9ffff)

**(new) — How does an agent operate the game as a player does?** Realizes: 1. Written by: 1. Kod tego zadania czyni wpis prawdziwym w całości, a cykl zapisuje go w całości (To do 5).

> An agent operates the running game in a real browser with Playwright CLI, and with Playwright MCP where the CLI fails, and reads motion from a stream of frames. This inspection adds to the checks D-75 and D-88 leave with a person and replaces none of them.
>
> *Rationale:* the project is made of screens, and an agent that cannot use them as a player does cannot check its own work. Its maker recommends the CLI to agents writing code for the tokens it saves, its setting for a certificate stands in a file of the repository, and it holds the same engine as the MCP server, so going back costs almost nothing. Lacks of the option chosen: its version is below 1.0 and leans on an alpha of Playwright, a session with no window closes by itself after an hour, the text of a page shows no motion, and images cost tokens. Risks taken, each a hypothesis: a drag may catch a select list instead of a handle; an agent judging motion from a few frames may report that a scene works while a person sees it jerk at 16×.
>
> *Rejected:* Playwright MCP as the first way — more tokens and a setting outside the repository; Chrome DevTools MCP and agent-browser — no clock, and their frames unchecked; Puppeteer, Selenium, WebdriverIO, Cypress and Stagehand — nothing above Playwright; computer use, direct calls to the API, a document model and a person clicking — an agent does not check the running product this way.

**(new) — Where does the data an agent checks the game on come from?** Realizes: 1, 5. Written by: 5. Część tego zadania, którą jego kod czyni prawdziwą i którą cykl zapisuje (To do 5): „a local server with a database made for that check”, „it reaches early states by playing”, „One command of the repository starts the game locally over HTTPS” i „a check touches neither the test server nor a player's save”. Resztę, budowanie stanu funkcjami symulacji i wysyłanie go zwykłym zapisem, dopisuje zadanie 5.

> An agent builds the game state a check needs with functions of the simulation and sends it by the ordinary save request to a local server with a database made for that check, and it reaches early states by playing. One command of the repository starts the game locally over HTTPS, and a check touches neither the test server nor a player's save.
>
> *Rationale:* the late states of the game take too long to reach by playing, and a state built by the simulation goes through the same load as any save, so a change of the save's version costs nothing here. Lacks of the option chosen: it needs a start over HTTPS that the repository does not hold yet, and the repository holds no program that solves a map. Risks taken, each a hypothesis: a loaded save carries no events, so effects of the scene and the chronicle may stand empty until the game passes a stretch; a state built by the game's own code agrees with the game even where both are wrong; protection on a computer may block the script that makes a certificate.
>
> *Rejected:* swapping the server's answer in the browser — it passes over signing in and saving; writing straight into the database — it passes over the way of a save; ready files of saves — every change of version renews them; a developer screen like the old probe — much work and a new entry for a game state; a lasting local database — its saves go at a change of version; a lasting environment on a server — much work for the owner; the test server itself — it rests on how D-12 reads.

### Wpisy fundamentu (`foundations/decisions.md`, loop2 48544f0)

**D-05 — What serves the built game and account requests in the container?**

> One Node.js process running Express 5 serves both the built game's static files and the `/api/` account and save routes in the loop2 container. An unmatched `/api/` request receives an API error, not the game's HTML page.

**D-12 — What access to the server does an agent have?**

> An agent reads the server only through the `mikrus` MCP server and changes nothing on it. Every change on the server that is not a deployment started by the automation is made by a human.

**D-33 — Which introduced dependency vulnerabilities block a change?** Dotyczy zadania tylko wtedy, gdy zmieni ono `package-lock.json`.

> The dependency audit passes without a network request where `package-lock.json` equals its version at {fork-point}, and otherwise fails on each advisory of low, moderate, high or critical severity that local pinned npm 12.2.1, run as `npm audit --json --package-lock-only --audit-level=low --include=dev --include=optional --include=peer --registry=https://registry.npmjs.org/`, reports for that lockfile and not for its version at {fork-point}, reading the npm/GitHub Advisory Database through the public npm registry when the check runs.

**D-49 — Which port does a loop2 test give the server it starts?**

> Every start of the loop2 server process by a loop2 test on the machine that runs the tests gives the server, in `LOOP2_LISTEN_PORT`, a port the system names free at that start, never a fixed port. The one exception is a single test of the default address, which starts the server with neither `LOOP2_LISTEN_HOST` nor `LOOP2_LISTEN_PORT` set. A test giving `LOOP2_LISTEN_PORT` a value the server is to reject before it listens, and a server started inside a container a test runs, fall outside this rule.

**D-73 — Which testing discipline does loop2 adopt?**

> Loop2 adopts the testing-guideline template of its pinned the-way in full, with only the departures of D-74, D-75, D-76, D-77, D-78, D-79, D-163 and D-235. Its testing rules and the recipes of its levels stand in `guidelines/testing.md`, read before writing or changing a test.

**D-75 — When are complete player journeys tested in a real browser?**

> Permanent tests of complete player journeys in a real browser are deferred, and a changed journey is checked manually. Automation is reconsidered when a critical-journey defect escapes smaller tests or repeated manual checking becomes a significant task cost; that task settles the tool and scope.

**D-76 — When do fonts and the preview server gain refusal tests?**

> Permanent refusal tests for font files and the local interface preview server are deferred until the first task changing the respective boundary, which introduces its refusal test and changes its invariant to method test. Until then, review checks font provenance and that the preview server serves only its own directory and only on the developer's machine.

**D-88 — How are real browser events, focus and SVG checked?**

> Real browser events, focus and SVG rendering are checked manually after a change and are not automated; tests using a hand-made document model prove only its modelled logic. Automation is reconsidered on a defect that the model missed or together with the player-journey automation of D-75, and this exclusion never covers a trust boundary.

**D-101 — How long do independent browser sessions last?**

> Each browser holds its own random, opaque session identifier in a loop2 host-scoped, Secure and HttpOnly cookie, and a player may remain signed in through several browsers at once.

**D-104 — Which request origin and body may change account state?**

> The session cookie uses SameSite=Strict, and every state-changing route requires exactly the configured serialized HTTPS Origin and an application/json body with at most 64 KiB for the save route `PUT /api/saved-game` and at most 16 KiB for every other route, optional charset allowed and compressed inflation rejected, while the server stores at most 64 KiB of each player's saved game state.

**D-108 — What public address do the game and account server share?**

> The built game and the account and save server use one public HTTPS origin at loop2's address. The browser sends account and save requests to relative `/api/` paths at that origin.

**D-110 — Which proxy information identifies an account request?**

> Explicit local loopback-proxy mode trusts only a loopback peer, requires forwarded https and uses the actual peer as identity, while direct mode trusts no forwarding and anonymous static and health requests require no proxy metadata.

**D-111 — When is account configuration sufficient to start the server?**

> Production requires valid `LOOP2_DATABASE_PATH`, `LOOP2_SESSION_SECRET_FILE`, `LOOP2_PUBLIC_ORIGIN`, `LOOP2_PROXY_MODE`, `LOOP2_MAIL_FROM`, `LOOP2_SMTP_HOST`, `LOOP2_SMTP_PORT`, `LOOP2_SMTP_USER` and `LOOP2_SMTP_PASSWORD_FILE`, and every partial or invalid explicit configuration refuses before listening; wholly unconfigured non-production may serve public files with JSON 503 from known account routes, without anonymous gameplay or generated-secret, in-memory-database or MemoryStore fallback.

**D-212 — How does a manual map run come back from a loaded saved game state?**

> A manual map run of a loaded saved game state that goes on comes back at the game minute of the save, paused, with the pace of the save, and the player resumes it with „Wznów”; one that ended in a completion or in the character's death comes back on its screen after its end, with „Restart”, „Zakończ” and the copy open to editing as D-62, D-132 and D-173 give. No time that passed between the save and the load advances it, the computing of time away included.

**D-234 — What does a checked restore of the database mean?** Zmienia je to zadanie (To do 6).

> A checked restore is one trial on the owner's computer before the change that brings the backups merges: a backup fetched from its destination and decrypted, the same commit run on it, a login with a test account, the saved game state seen back, and the backup removed from the computer. It does not cover building a new server, and restoring over the server's database stays a human's documented procedure.
>
> *Rejected* (fragment): a browser on the owner's computer — a login cannot work on a locally run production image.

## Settlements to record

Candidates: 9 shown, 4 accepted — 2026-11-01

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Polecenie nie służy człowiekowi do grania z kontem zachowanym między startami, bo człowiek gra na serwerze testowym. | decision | Questions to settle, Q1; wiersz przyjęty: człowiek, 2026-11-01, „wszystko według rekomendacji” | Czy dołożyć przełącznik zachowujący bazę, żeby człowiek grał lokalnie na jednym koncie. |
| 2 | Przy lokalnym starcie poczta wskazuje adres, pod którym nic nie odpowiada, a całą drogę z pocztą przechodzi człowiek na serwerze testowym. | decision | Questions to settle, Q2; wiersz przyjęty: człowiek, 2026-11-01, „wszystko według rekomendacji” | Czy dołożyć lokalny odbiornik poczty i co kolejne zadania mają sprawdzać lokalnie, a co tylko na serwerze testowym. |
| 3 | Polecenie robi własny certyfikat, a człowiek klika w przeglądarce „przejdź dalej”. | decision | Questions to settle, Q3, razem z odpowiedzią na pytanie przeciw wyborowi; wiersz przyjęty: człowiek, 2026-11-01, „wszystko według rekomendacji” | Czy sięgnąć po mkcert albo Caddy, gdy ostrzeżenie przeglądarki albo ochrona komputera przeszkodzi. |
| 4 | Polecenie słucha tylko na tym komputerze i nie przepuszcza nagłówków pośrednika przysłanych przez przeglądarkę. | invariant | Questions to settle, Q7; treść z pakietu rundy, przyjęta: człowiek, 2026-11-01, „wszystko według rekomendacji” | Czego dokładnie odmawia stały test tej granicy zaufania. |

## Out of scope

- Budowanie stanu gry funkcjami symulacji i wysyłanie go zwykłym zapisem: to praca zadania 5 (`plan_mvp2_loop2.md`, Change log, wpis o składzie stanu gry symulacją).
- Napis o awarii i błędy w konsoli przeglądarki: to praca zadania 8 (`plan_mvp2_loop2.md`, tabela zadań).
