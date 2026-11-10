---
title: Uzgodnić z kodem fundament, wytyczne, README i stronę wszystkich stanów loop2
status: draft
created: 2026-11-08
updated: 2026-11-08
tags: [zadanie]
related: "the project note of the author's backlog"
---

# Uzgodnić z kodem fundament, wytyczne, README i stronę wszystkich stanów loop2

Status: ready for cycle
Project relation: independent

## Description

### Need

- Decyzje, fakty środowiska, słownik, wytyczne kodu i testów, styleguide, `src/browser/AGENTS.md`, README i strona wszystkich stanów mówią miejscami co innego niż kod albo niż inny wiążący tekst, a agenci czytają je przy każdym zadaniu i idą za tekstem.
- Skutki: agent zaszyje w kodzie adres nadawcy poczty, wstawi klasę strony wszystkich stanów do arkusza gry, weźmie za rozważony wariant, którego nikt nie proponował, albo zaproponuje drogę, którą już odrzucono; osoba stawiająca loop2 według README trafi na odmowę npm.

### To do

README, `package.json`:

1. README:5 i `engines.node` w `package.json` (z głównym wpisem `package-lock.json`) wymagają Node 24.15.0 lub nowszego w linii 24 (`^24.15.0`), bo tyle deklarują przypięte npm 12.2.1 i jsdom, zamiast „Node.js 24.x” / `"24.x"` (pytanie 1; loop2#016-1, 052-25).
2. Punkt README o sprawdzeniu gry w przeglądarce (README:76) mówi „ze stopką”, nazywa ekran tak, jak gra go dziś nazywa (ekran przejścia), i nie wymienia panelu terenu z listą kafelków, który usunął PR #58; zdanie ma orzeczenie (loop2#055-1).
3. Punkt README o budowaniu (README:25) nie powtarza zdania o grafikach Anokolisy i nie łączy trzech spraw w jednym punkcie listy (loop2#059-7).

Strona wszystkich stanów, `src/browser/AGENTS.md`, opis testu:

4. Strona wszystkich stanów rysuje ikony na kafelku tak, jak gra (`src/browser/view/terrain-picture.ts`, rozmieszczenie `iconPlaces`, mniejsze ikony przy większej liczbie na kafelku), zamiast własnej kopii starego układu (`kitchen-sink.ts:42` `TILE_SIZE`, `:678` ikony 0.7), więc próbki zmieniają się razem z grą (loop2#021-20).
5. Strona wszystkich stanów nie twierdzi, że w grze zapas zasobu nie spada do zera (`kitchen-sink.ts:785` „Ten stan widać tylko tutaj: w grze zapas zasobu nie spada dziś do zera.”) — zbieranie wyczerpuje dziś zapas, a gra przygasza wtedy ikonę (loop2#021-21).
6. `src/browser/AGENTS.md:5` mówi, że klasa elementu strony wszystkich stanów ma regułę w `kitchen-sink.css`, a nie w `styles.css`, który trafia do graczy (loop2#021-22).
7. `src/browser/AGENTS.md:9` obejmuje zmianę istniejącej wartości pliku tokenów, nie tylko nową wartość, tak jak reguła styleguide'u „Every value with its source” (loop2#021-24).
8. Opis testu `tests/invariants/test_loop2_container_sprites.py:12-13` wskazuje przypadek w `tests/view/scene-picture.test.mjs`, a nie „Slice 3 of task `scena-z-ludzikiem`”, który istnieje tylko w ignorowanym `.runs/` (loop2#059-12).

Wytyczne kodu i testów (przez `the-way-maintain-coding-guidelines` i `the-way-maintain-testing-guidelines`):

9. `guidelines/testing.md:313` mówi, że pełny przebieg `scripts/test.py` przekazuje Node wzorce, nie „pliki i wzorce” (`scripts/test.py:11` `NODE_TESTS` trzyma same wzorce) (loop2#032-18).
10. `guidelines/testing.md` zalicza `tests/view/page-document.test.mjs`, który uruchamia procesy (`spawnSync`, `:4`, `:88`), do poziomu, którego reguły do niego pasują, a nie do testów jednostkowych (loop2#052-8).
11. `guidelines/coding-mail-sending.md:41-43` mówi, że adres nadawcy pochodzi z ustawień (`src/server/account-mail.ts:186` `from: { name: senderName, address: from }`), a w pliku wysyłki są ustalone nazwa wyświetlana, temat i treść (loop2#037-2).
12. Przykład *Good* w `guidelines/coding-account-policy.md:24` nie mówi o sprawdzeniu hasła przy zakładaniu konta, gdzie hasło się haszuje (loop2#045-24).
13. Lista zwolnień próby w `guidelines/coding-account-policy.md:34-35` wymienia każdy przypadek, który kod zwalnia, także zablokowane logowanie i logowanie, które wyprzedził reset (loop2#045-34).
14. Statusy `src/browser/view/email-status.ts` i `src/browser/view/character-skills.ts` w tabeli `guidelines/coding-browser-module.md` (dziś `do not copy`, :21, :42) odpowiadają temu, czym te pliki są dziś — czystymi funkcjami, które nie budują DOM (loop2#055-6 = 056-13).

Styleguide (przez `the-way-maintain-styleguide`):

15. Lista kontrolek odstępujących od listy stanów (`guidelines/styleguide-browser-view.md:227` i dalej) nazywa także formy React (`react-button.tsx` i pozostałe), nie tylko pliki DOM (loop2#052-9).
16. Reguła „Every value with its source” zna rodzaj źródła, który już stoi w pliku tokenów: wybór Mariusza z podglądu wariantów (`src/browser/tokens.css:73`, `--bar-width`) (loop2#054-5).
17. Uzasadnienie wyglądu listy programów (`styleguide-browser-view.md:494`, „(D-40, D-280)”) powołuje się tylko na decyzje, które o tej liście mówią (loop2#055-2).
18. Sekcja „Program editor” nie mówi, że edytor nie dokłada żadnej nowej roli (`:545`), skoro niżej opisuje `rule-winning`, `rule-running` i paski (loop2#057-5).
19. Przykład *Bad* strony wszystkich stanów (`:345` „Strona rysuje panel terenu ze stanu gry złożonego ręcznie.”) mówi o czymś, co strona dziś ma (loop2#058-11).
20. Reguła „Contrast of every pair” (`:156`) wymienia parę wypełnienia paska postępu nad głową maga z torem, dla której reguła sceny wymaga 3:1 (loop2#059-15).

Fundament (każdy wpis przez skill swojego elementu):

21. *Based on* decyzji D-01, D-02 i D-05 cytuje przy każdej stronie fragment słowo w słowo z miejscem i datą odczytu, w formie szablonu decyzji the-way (loop2#018-2).
22. Cztery fakty środowiska o stanie serwera (`loop2-host-forced-command-entry`, `loop2-host-installed-command`, `mikrus-host-docker-workloads`, `mikrus-host-swap`, `environment_facts.md:19`, `:25`, `:31`, `:37`) mają źródło w formie „reading: `<polecenie>` on <host>, <narzędzie i wersja> — "<wynik słowo w słowo>"; run <data>” (loop2#018-1); wszystkie cztery odczytuje w cyklu agent przez MCP `mikrus` (pytanie 2).
23. Lista „Allowed” odczytów agenta w `.claude/skills/loop2-deploy/SKILL.md` i w jej kopii w `.agents/` zawiera dwa polecenia tylko do odczytu: liczbę wierszy `authorized_keys` z wymuszonym poleceniem `/usr/local/bin/loop2-deploy` (sama liczba, bez treści kluczy) i `stat -c '%a %U:%G' /usr/local/bin/loop2-deploy` (pytanie 2).
24. *Origin* D-48 mówi, że nazwy tokenów innych niż role wybrał cykl (Decision 1 jego specu), a nie pytanie Q18 (loop2#021-27).
25. *Rejected* D-54 nie podaje sortowania po imieniu jako wariantu odrzuconego, skoro żadne źródło go nie proponowało; przykład naruszenia zostaje (loop2#024-1).
26. D-54 i D-56 używają „place on the list” w jednym znaczeniu: kolejność postaci na liście nie zmienia się, a numer pozycji przesuwa się, gdy odchodzi postać przed nią (loop2#024-6).
27. Zdanie wiążące D-56 podaje numer, który dostaje pierwsza postać gry, tak jak daje go kod (loop2#024-7).
28. Pierwszy przykład *complies* D-67 mówi o kafelku, któremu brakuje dwóch patyków, skoro tylko taki odzyskuje dwa (loop2#025-9).
29. Serwer odmawia startu, gdy plik hasła poczty daje po dekodowaniu puste hasło, także plik z samym znacznikiem BOM (dziś `src/server/configuration.ts:128` odmawia tylko zera bajtów, a dekoder wycina BOM), a D-111 mówi, że hasło nie może być puste (pytanie 3; loop2#037-14, 037-7).
30. Uzasadnienie D-156 nie nazywa „mail service” strony poczty gracza w przeglądarce, skoro w fundamencie te słowa znaczą usługę SMTP Outsidera (D-111) (loop2#037-15).
31. *Rejected* D-183 podaje wariant odrzucony z pytania Q6 zamrożonego zadania (`git show 1b09f80:docs/task-cycles/plan-wyprawy/task.md`): „Zakończ” przed domknięciem oddaje do skrzynki to, co postać wniosła, jako darmowe cofnięcie pobrania — zamiast „unknown” (loop2#041-1).
32. D-04 i D-213 nie nazywają „saved game state” stanu, który D-211 nazywa „the unsaved game state” — stanu trzymanego w pamięci strony po zapisie, który nie zastał sesji (loop2#043-19).
33. D-101 i testy mówią „restore” tam, gdzie dziś „resurrect” znaczy przywrócenie usuniętej sesji albo licznika: D-101 „a delayed renewal cannot restore a destroyed session”, komentarz `tests/http.test.mjs:657` i nazwa testu `tests/sim/program-counts.test.mjs:258` („completion does not restore it”), więc „resurrect” zostaje tylko przy wskrzeszeniu postaci ze słownika (pytanie 4; loop2#044-2).
34. Fakt `docker-build-cache-invalidation` cytuje fragment „Build arguments do result in cache invalidation.”, a uzasadnienie D-237 mówi, że krok sprawdzenia wydania wraca przy nowym commicie przez argument budowania `LOOP2_COMMIT`, nie przez zmianę kodu (loop2#046-39).
35. *Rejected* D-207 mówi przy rytmie 30 sekund dla pętli, że karta zostawiona otwarta na dobę wysyła około 2880 zapisów, zamiast „a tab left overnight sends about 1440 saves a day” (pytanie 5; loop2#047-1).
36. Hasło słownika `catch-up` (`foundations/glossary.md:225`, „the computing of the game minutes that passed while the game was closed”) mówi to, co D-247: doliczanie liczy minuty gry od zapisu i biegnie po każdym wczytaniu zapisu, także przy otwartej karcie, po zapisie przegranym z innej przeglądarki i po ponownym zalogowaniu ze stanem trzymanym w pamięci strony (loop2#047-2).
37. D-252 i reguła „Recording a failure” w `guidelines/coding.md` mówią, że to, co `account-database-check` (zdanie w logu budowania obrazu, `src/server/account-database-check.ts:83-85`) i `measure-passwords` (raport JSON dla skryptu, który go uruchomił, `src/server/measure-passwords.ts:384`) wypisują przy awarii, nie jest wierszem logu, tylko komunikatem dla tego, kto je uruchomił, jak wiersz gotowości serwera — więc zostaje z treścią błędu i bez wiersza JSON; kod obu poleceń się nie zmienia (pytanie 7; loop2#051-13).
38. D-269 w *Based on* wskazuje fakt środowiska o tym, że przeglądarka nie rozwiązuje gołego importu, na którym stoi jej uzasadnienie (loop2#052-18).
39. *Rejected* D-313 nie podaje wariantu, którego Mariusz nie rozważał (ostatnia pozycja: grupa „Program” z warunkiem „Zawsze” dodana, gdy kopia nie ma żadnej) (loop2#058-7).
40. Uzasadnienie D-313 mówi, dlaczego czynność, dla której panel reguły nie podaje celu, ustępuje następnej (loop2#058-12); powód stoi w zapisie cyklu `docs/task-cycles/ekran-przejscia/cycle.md:230` przy commicie `2aae30a`, a gdy go tam nie ma, cykl pyta Mariusza.
41. *Rejected* D-147 i D-185 nie uzasadniają odrzucenia kolejnością „above discovery”, której ekran już nie ma (loop2#058-8).
42. „Its further cost” w D-312 wymienia trzecią drogę, którą inna grupa trafia przed tę, do której gra wpisała regułę: reguła gry przeniesiona do późniejszej grupy (loop2#058-9).

### Questions to settle

- 1. Czy wymaganie Node 24.15.0 lub nowszego w linii 24 trafia tylko do README, czy też do `engines.node` w `package.json` (dziś `"24.x"`)?
  - Answer: B — README i `engines.node` = `^24.15.0`, z plikiem blokady; npm sam ostrzega przy instalacji na zbyt starym Node, a test niezmiennika `account-server-runtime` czyta z zakresu główną wersję 24 i dalej przechodzi.
  - Not chosen:
    - A. tylko README — jedno zdanie, ale `package.json` dalej dopuszcza wersje, na których narzędzia nie działają
  - Source: Mariusz, 2026-11-08: „tak jak rekomendujesz”; `package.json:7`; `package-lock.json` `^22.22.2 || ^24.15.0 || >=26.0.0`; `tests/invariants/test_account_server_runtime.py:35-45`
- 2. Kto odczytuje na serwerze dwa fakty, których polecenia nie stoją na liście odczytów dozwolonych agentowi w `.claude/skills/loop2-deploy/SKILL.md` (liczba wierszy `authorized_keys` z wymuszonym poleceniem, `stat` `/usr/local/bin/loop2-deploy`)? Dwa pozostałe (`docker ps`, `free`) agent odczytuje sam.
  - Answer: B — zadanie dopisuje oba polecenia do listy odczytów dozwolonych agentowi w skillu wdrożenia i jego kopii, a cykl odczytuje wszystkie cztery fakty sam.
  - Not chosen:
    - A. Mariusz odczytuje dwa fakty przed cyklem i wkleja wynik — kilka minut na serwerze teraz i przy każdym kolejnym sprawdzeniu, zadanie czeka na odczyt
    - C. fakty zostają w starej formie — zero pracy, ale nikt nie sprawdzi, czy są prawdziwe, a uwaga wraca przy następnym przeglądzie fundamentu
  - Source: Mariusz, 2026-11-08: „B”; lista odczytów: `.claude/skills/loop2-deploy/SKILL.md:43-50`
- 3. Plik hasła poczty z samym znacznikiem BOM przechodzi dziś jako puste hasło (`src/server/configuration.ts:128-131`) — odmowa w kodzie czy tylko zdanie w D-111?
  - Answer: A — kod odmawia też hasła pustego po dekodowaniu, a D-111 mówi, że hasło nie może być puste; błąd wychodzi przy starcie, jak chce własny powód odrzucenia D-111: „trimming the password file — hides a rotation mistake until the first failed login to the mail service”.
  - Not chosen:
    - B. tylko tekst D-111 „plik ma co najmniej jeden bajt” — zero kodu, ale plik z samym BOM dalej daje puste hasło i błąd dopiero przy logowaniu do poczty, a zdanie musiałoby wspomnieć o wycinaniu BOM
  - Source: Mariusz, 2026-11-08: „tak jak rekomendujesz”; loop2#037-7; `src/server/configuration.ts:128-131`
- 4. Jakim słowem zastąpić „resurrect” tam, gdzie znaczy przywrócenie zniszczonej sesji albo licznika?
  - Answer: A — „restore”, neutralne słowo, którego gra nie używa w żadnym innym znaczeniu.
  - Not chosen:
    - B. „bring back” — tak samo jasne, trochę mniej techniczne
    - C. „revive” — za blisko wskrzeszenia, problem wraca
  - Source: Mariusz, 2026-11-08: „A”; `foundations/glossary.md` (hasło `resurrection`); D-101
- 5. Co ma mówić *Rejected* D-207 o liczbie zapisów: „about 1440 saves a day” przy rytmie 30 sekund to około 12 godzin, a doba to 2880?
  - Answer: A — „a tab left open for a day sends about 2880 saves”; liczba zgadza się z rytmem, a „na noc” znika.
  - Not chosen:
    - B. „a tab left overnight sends about 1440 saves” — zostaje obraz nocy (około 12 godzin), znika „na dobę”
    - C. bez zmian — kto przeliczy, trafi na błąd o połowę, a uwaga wróci w następnym przeglądzie
  - Source: Mariusz, 2026-11-08: „A”; pochodzenie liczby: zapis cyklu pętli zarobkowej (commit `2b641e6`, `docs/task-cycles/petla-zarobkowa/cycle.md`, Q11, wariant B), policzona przez agenta w opisie wariantu nie wybranego, przy odpowiedzi Mariusza z 2026-10-30 „przyjmuję rekomendacje”
- 6. Czy hasło `catch-up` („while the game was closed”) zmienia się w tym zadaniu, czy przez zatwierdzoną definicję MVP2, skoro recenzent mówi, że zmiana słowa zmienia zatwierdzoną definicję?
  - Answer: w tym zadaniu — hasło zapisało zadanie pętli zarobkowej (commit `96d7b45`, 2026-10-31, „write the foundation entries of the earning loop and the catch-up”), a definicja MVP2 (`the approved definition of the second milestone in the author's backlog`, „Status: approved 2026-11-03”) nie rzutuje hasła `catch-up` ani jego brzmienia.
  - Source: `git log -S'while the game was closed' -- foundations/glossary.md` i przeszukanie definicji MVP2 po „game was closed”, „computing of the game minutes”, „catch-up”, 2026-11-08, na `72287c2`
- 7. Co wypisują przy awarii `account-database-check` i `measure-passwords`, które dziś podają treść błędu i nie mają wiersza awarii JSON?
  - Answer: C — zostaje jak jest; fundament i wytyczne mówią, że wynik tych dwóch poleceń nie jest wierszem logu, tylko komunikatem dla tego, kto je uruchomił, jak wiersz gotowości serwera w D-252; treść błędu zostaje w logu budowania i w raporcie pomiaru, gdzie nie trafiają dane graczy (oba działają na tymczasowej bazie i sztucznych hasłach).
  - Not chosen:
    - A. wiersz awarii JSON w obu poleceniach i zdanie bez treści błędu — jednolite logi, ale zmiana kodu i testów, a przy nieudanym budowaniu albo pomiarze Mariusz widzi kod błędu zamiast opisu
    - B. wiersz awarii JSON i obok zdanie z treścią błędu — nic nie ginie, ale zmiana kodu i testów i dwa wiersze na każdą awarię
  - Source: Mariusz, 2026-11-08: „C”; tło: odpowiedź (3a) na pytanie „Co jest awarią…” w `a note of another task in the author's backlog` dotyczy poleceń, które obok zdania mają wiersz JSON

## Context

- Źródło pozycji: `the file of the review remarks of the foundation in the author's notes`, sekcja „Zadanie 4 (loop2): fundament, wytyczne i README rozjechane z kodem”; kolumna „Słowa recenzenta” niesie brzmienie uwagi z opisu PR-a, a numery linii dokumentu są z `72287c2`.
- Mariusz wybrał jedno zadanie zamiast podziału na wytyczne, fundament i odczyt serwera — „osobiście wolałbym jedno zadanie” (2026-11-08).
- loop2#046-45 (D-238 bez faktu o konfiguracji SSH roota) przeszła do Zadania 1, `a note of another task in the author's backlog`, punkt 16, bo tamto zadanie dodaje odczyt, z którego fakt powstaje — Mariusz, 2026-11-08: „tak, przenosimy do zadania 1”.
- loop2#051-4 (wiersz gotowości `Loop: <address>`) nie ma pozycji: D-252 w przykładzie *complies* mówi już „the readiness line `Loop: <address>` as plain text”.
- loop2#037-7 (plik z samym BOM) jest powtórzeniem 037-14 i stoi w pytaniu 3; loop2#052-25 jest powtórzeniem 016-1.
- Ponowne sprawdzenie 2026-11-08 na `72287c2`: wszystkie sprawdzone pozycje stoją jak w źródle; D-313 ma od `226d7d0` brzmienie z ustępowaniem czynności bez celu, jego uzasadnienie nadal o tym milczy.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- D-01 — What runs the account and save server?: *Based on* „Node.js 24.21.0 TypeScript documentation, "no type checking is performed" (https://nodejs.org/download/release/v24.21.0/docs/api/typescript.html, read 2026-10-04) · State of JS 2025 runtime survey … · Bun 1.4.2 documentation … · Deno release documentation … · Go SQL driver list (https://go.dev/wiki/SQLDrivers, read 2026-10-04)”
- D-02 — How does the account and save server handle HTTP requests?: *Based on* „Express 5 API, routing and JSON request parsing (https://expressjs.com/en/5x/api/express/, read 2026-10-04) · … · Fastify 5.12 validation and serialization (…, read 2026-10-04)”
- D-05 — What serves the built game and account requests in the container?: *Based on* „Express 5 static file serving (…, read 2026-10-04) · … · Docker multiple processes in one container (https://docs.docker.com/engine/containers/multi-service_container/, read 2026-10-04)”
- D-04 — What is the game built with?: „…changes the game state only through functions of the simulation, to which it passes the player's choices, the passing of real time and a saved game state the browser downloaded from the server or kept in the page's memory after a save found no session (D-211).”
- D-48 — How are the design tokens of the browser view named?: „…each role of its styleguide's table of roles is the custom property `--<role>`, under the role's own name, and every other value of appearance is a custom property named by what it is for, never by its colour or by its number alone.” *Origin*: „styleguide_loop2.md …, "Q18. Jak nazywają się role w kodzie i czy jakieś odstępstwa zostają celowo?"”
- D-54 — In what order do the characters of the team stand?: „The characters of the team stand on its list in the order they were created.” *Rationale*: „…which no other event of the game changes, so a character keeps its place on the list…” *Rejected*: „the list sorted by name — two characters may bear one name, and a new character would move the others.”
- D-56 — How does the game state tell one character from another?: „Each character carries a number the game gives it when the character is created, one more than the number the game state gave last, so the numbers of two characters of one game differ.” *Rationale*: „…a character's place on the list moves when a character before it leaves…”
- D-67 — How does a tile's stock renew?: *complies* „a tile of Las whose sticks fall below its starting stock in game minute 45 gaining a stick in game minute 60 and another in game minute 90…”
- D-101 — How long do independent browser sessions last?: „…a delayed renewal cannot resurrect a destroyed session or shorten a later expiry.”
- D-111 — When is account configuration sufficient to start the server?: „…the password file a regular file of at most 1 KiB of UTF-8 with no control character, so a trailing newline is refused, read once; … startup does not contact the mail service.”
- D-147 — What record of an encounter does the player read?: *Rejected* „…putting it above discovery — moves the explanation of the pause…”
- D-156 — How does an emailed link confirm a player's email address?: *Rationale* „A navigation from a mail service on another site brings no session cookie, but the page's own requests do…”
- D-183 — What happens to carried items when the player stops a run or completes with items outside its plan?: „When „Zakończ” or „Restart” ends a map run before completion, … that map run's carried items — brought in and gathered — are lost.” *Rejected*: „unknown”
- D-185 — Where does the player read what completion deposited?: *Rejected* „placing it above discovery — changes the established order…”
- D-207 — When does the game save the game state on the server?: *Rejected* „…the 30-second rhythm for earning loops too — a tab left overnight sends about 1440 saves a day, which at one earning loop protect nothing…”
- D-211 — What does the player see when a save of the game state finds no session?: „…and the unsaved game state stays in the page's memory only, never in the browser's lasting storage…”
- D-213 — Which file is the exemplar for saved-game code?: „…an unknown value — a saved game state downloaded from the server or kept in the page's memory (D-211) — into a game state or a refusal naming why…”
- D-237 — How is a Node.js release checked before it is deployed?: *Rationale* „Docker reruns the build step when the base image or the built code changes, so a step taken from the cache means the same release and the same code passed before; the release shows in the deployment's log at the first build of a commit.”
- D-247 — When is time away computed, and how much?: „It runs on its own after each load of a saved game state: after a sign-in, after a reload of the page, after a save lost to another browser's (D-209) and after a sign-in to the same account with the state kept in the page's memory (D-211).”
- D-252 — How does loop2 write its failures to its logs, and what does it log?: „A log line of its Node.js code is one JSON object on one line, written through `console` with no library and under fixed field names…”
- D-269 — Does the kitchen-sink page hold React?: *Based on* „none”; *Rationale* „the page's own command compiles its modules one by one and the browser resolves no bare import, so a module that reaches React leaves a blank page while its build passes.”
- D-280 — Which screens does the game have, and how does the player move between them?: „The game has the screens Siedziba, Postać, Mapy, Programy and Przejście, all of one content width under one menu bar…” (powołana w styleguide przy liście programów)
- D-312 — How does the band of a discovery name the program rule the game wrote?: *Rationale* „Its further cost: where a rule „Zawsze → Eksploruj” of the player's own … stands in another group that comes first — dragged above the one the game wrote into, or left standing after the game's rule or its group is deleted — the band names that group…”
- D-313 — What does „Dodaj regułę z tym” do?: „…where the discovery holds an action that takes no target or one the rule panel offers a target for, the rule is „Zawsze → {the first such action}”…” *Rejected*, ostatnia pozycja: „the rule group „Program” with the condition „Zawsze” added where the copy holds none, as the game does at the first chill (D-123) — reachable only by deleting every group in the pause.”

## Settlements to record

Candidates: 7 shown, 2 accepted — 2026-11-08

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | To, co `account-database-check` i `measure-passwords` wypisują przy awarii, nie jest wierszem logu, tylko komunikatem dla tego, kto je uruchomił, więc zostaje z treścią błędu i bez wiersza awarii JSON. | decision | pytanie 7, Answer i Not chosen; pytanie kontrolne wobec przykładu naruszenia D-252 „an error's message written where it may quote a value” — Mariusz, 2026-11-08: „C obowiązuje” (oba polecenia działają na tymczasowej bazie i sztucznych hasłach, więc treść błędu nie cytuje danych gracza) | czy D-252 w *Rejected* zapisuje wiersz JSON obok zdania (A, B), więc czy następny agent zaproponuje go jeszcze raz |
| 2 | Serwer odmawia startu, gdy plik hasła poczty daje po dekodowaniu puste hasło, także gdy plik ma sam znacznik BOM. | decision | pytanie 3, Answer i Not chosen | czy D-111 w *Rejected* zapisuje samo zdanie „plik ma co najmniej jeden bajt” bez zmiany kodu (B) |

## Out of scope

- Pozostałe *Rejected: unknown* w `foundations/decisions.md` poza D-183.
