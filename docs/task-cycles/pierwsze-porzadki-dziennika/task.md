---
title: "loop2: pierwsze porządki dziennika decyzji — instrukcje agenta do skilli, słowa o tymczasowości ze zdań wiążących, wpis powtarzający regułę wytycznych testów"
status: draft
created: 2026-11-12T23:20
updated: 2026-11-14
tags: [zadanie]
related: "the project note of Loop in the author's notes"
---

## Po co to

- **Jak jest dziś:** Dziennik decyzji gry ma 389 wpisów i ok. 1 MB. Około 105 z nich decyzjami nie jest (liczba z analizy, z dokładnością około 10%): reguły pisania kodu, testów i wyglądu, które stoją też w wytycznych, pojedyncze napisy i liczby, które stoją też w kodzie i w teście, instrukcje pracy agenta, które stoją też w skillach, i opisy braku funkcji. Reguła zapisana w dwóch miejscach z czasem się rozjeżdża, a każdy taki wpis agent dostaje do czytania razem z prawdziwymi decyzjami.
- **Kto to odczuwa:** Agenci cyklu, którzy do każdego zadania wybierają decyzje, i agent sprawdzający całą zmianę, który ma je porównać ze zmianą. Ja pośrednio — przez przeglądy, które znają większość decyzji z tytułu.
- **Co jeśli nic:** Nowe zasady zapisu działają tylko naprzód, a te wpisy zostają na stałe; generowany spis decyzji, który agenci będą czytać, jest o ponad jedną czwartą dłuższy (około 233 KB zamiast 170 KB). Nic się nie psuje od razu — to sprawa czytelności, nie kosztu.

# loop2: pierwsze porządki dziennika decyzji — instrukcje agenta do skilli, słowa o tymczasowości ze zdań wiążących, wpis powtarzający regułę wytycznych testów

Status: ready for cycle
Project relation: independent

## Description

### Need

- Dziennik decyzji gry (`foundations/decisions.md`) niesie wpisy, które są instrukcją pracy agenta i których reguła stoi już w skillu, oraz zdania wiążące ze słowami o etapie, których szablon wpisu nie chce; agenci cyklu czytają je razem z prawdziwymi decyzjami, a reguła zapisana w dwóch miejscach się rozjeżdża.
- Wpis D-80 powtarza dla parametrów gry domyślną regułę wzoru wytycznych testów, którą dziennik przyjmuje wpisem D-73: oczekiwana wartość testu nie pochodzi z tego, co kod daje dziś.
- Zadanie robi teraz najtańsze partie porządków, niezależne od zmian w the way (Mariusz, 2026-11-12, sprawa 9, decyzja 5: „teraz tanie partie (ok. 40 wpisów), reszta partiami przy kolejnych przeglądach fundamentu gry”).

### To do

1. Wpisy D-254, D-357, D-358 i D-359 wychodzą z dziennika do skilla `loop2-play`, a D-361 do skilla `loop2-deploy` (obie kopie skilla, `.claude/skills/` i `.agents/skills/`): każdy numer trafia na listę „Withdrawn identifiers” na końcu dziennika z powodem i następcą `none`, a skill zostaje jedynym miejscem reguły. Gdzie skill nie mówi, dlaczego reguła obowiązuje, dostaje jedno zdanie powodu wzięte z uzasadnienia wycofanego wpisu.
2. Wpis D-80 wychodzi z dziennika: jego numer trafia na listę „Withdrawn identifiers” z powodem i następcą `none`, a reguła zostaje w `guidelines/testing.md`, w regule „Where the expected value comes from”, oparta na D-73 i D-82.
3. Każde odwołanie do numerów z punktów 1 i 2 zostaje w tej samej zmianie przepięte albo zdjęte — w kodzie, testach, wytycznych, skillach, niezmiennikach i w innych wpisach dziennika: m.in. komentarz w `tests/view/scene.test.mjs:7`, gdzie zostaje D-88; pole *Relations* wpisu D-347, które wyprowadza go z D-254; pole *Decision* reguły „Where the expected value comes from” w `guidelines/testing.md:82` (zostają D-73 i D-82) i „(D-80)” w jej tekście (`guidelines/testing.md:93`, przepięte na D-73); pola *Relations* wpisów D-378, D-387, D-388 i D-398 oraz „(D-80, D-82)” w uzasadnieniach D-387 i D-388 (zostaje D-82).
4. Ze zdań wiążących 23 wpisów znikają słowa „currently”, „today” i „for now”: D-42, D-64, D-123, D-143, D-144, D-145, D-167, D-169, D-181, D-187, D-188, D-194, D-196, D-199, D-200, D-201, D-208, D-243, D-244, D-246, D-247, D-249, D-385. Zmienia się tylko to słowo i składnia wokół niego; gdzie usunięcie zmieniłoby to, co zdanie wiąże, słowo zostaje, a opis prośby o scalenie wymienia taki wpis z powodem.

### Acceptance criteria

- `python -B .the-way/elements/common/foundation_check.py` nie zgłasza odwołania do wycofanego numeru.

### Questions to settle

- 1. Czy zadanie zostaje jednym, skoro punkty 2, 4 i 5 pierwotnej notatki (reguły pisania kodu i testów do wytycznych, testy wskazujące zdania decyzji, podział dziennika na tematy) nie mogą ruszyć przed scaleniem zadań the way „co trafia do dziennika decyzji” i „jak agent czyta dziennik decyzji” i przesunięciem przypiętej wersji the way w grze?
  - Answer: (a) — to zadanie obejmuje punkty 1 i 3 notatki i idzie do cyklu od razu; punkty 4 i 5 są osobnymi zadaniami: punkt 4 czeka na „co trafia do dziennika decyzji”, punkt 5 na „jak agent czyta dziennik decyzji” i na punkt 4. Punkt 2, wydzielony najpierw jako osobne zadanie, wrócił do tego zadania 14.11.2026, gdy zadanie the way „co trafia do dziennika decyzji” zostało scalone (PR #120); jego zakres rozstrzyga pytanie 4.
  - Not chosen:
    - (b) jak (a), ale punkty 2 i 4 w jednym zadaniu — jeden cykl mniej, za to jedna wielka prośba o scalenie, w której ocena na mocnym modelu (przejście po ok. 270 decyzjach) miesza się z przenoszeniem reguł.
    - (c) jedno zadanie czeka na oba zadania the way — punkty 1 i 3, gotowe od ręki, stoją przez dni, a dokument nie może się zamknąć, bo forma linii przy teście, reguła wytycznych bez wpisu i reguła wyboru po temacie jeszcze nie istnieją.
  - Source: Mariusz (przez doradcę dnia), 2026-11-13, „1 a, 2 a, 3 a” (odpowiedź na pytanie z drogami a, b, c i rekomendacją a); powrót punktu 2: Mariusz, 2026-11-14, połączenie zadania `zadanie_loop2_regula_wytycznych_bez_wpisu` z tym zadaniem („oba wycofują wpisy z tego samego dziennika, przepinają odwołania do wycofanych numerów i kończą tym samym sprawdzeniem fundamentu”).
- 2. Które z 9 wpisów z instrukcjami pracy agenta (rodzaj O w tabeli analizy: D-12, D-234, D-254, D-255, D-347, D-357, D-358, D-359, D-361) wychodzą z dziennika do skilla?
  - Answer: (a) — wychodzą D-254, D-357, D-358, D-359 i D-361; zostają D-12 (granica ochrony serwera, na której stoją inne wpisy i skill wdrożenia), D-234 (próba odtworzenia bazy przez właściciela, z odrzuconymi wariantami o realnym koszcie, cytowana przez skrypt i test), D-255 (wyprowadzono z niej niezmiennik `local-start-access`) i D-347 (zachowanie i budowa gry: błąd na ekranie i w konsoli, bez zewnętrznej usługi).
  - Not chosen:
    - (b) wycofać wszystkie 9, jak w pierwotnej notatce — niezmiennik `local-start-access` traci jedną z dwóch decyzji, z których go wyprowadzono, zadanie dodające Sentry albo klucz SSH agenta nie zderzy się z żadnym wpisem, a odrzucone warianty D-254 i D-234 przepadają.
    - (c) wycofać tylko wpisy, do których nic nie prowadzi (D-358, D-359, D-361) — D-254 i D-357, czyste instrukcje pracy agenta, dalej dublują skill.
  - Source: Mariusz (przez doradcę dnia), 2026-11-13, „1 a, 2 a, 3 a” (odpowiedź na pytanie z tabelą dziewięciu wpisów, drogami a, b, c i rekomendacją a; cena drogi a podana w pytaniu: przepadają odrzucone warianty D-254 — lista sprawdzonych narzędzi do przeglądarki — i D-357 — prywatne repozytorium na zrzuty).
- 3. Czy reguła przeniesiona do skilla dostaje w nim jedno zdanie powodu?
  - Answer: (a) — tak, tam, gdzie skill nie mówi, dlaczego; tak jak pierwotna notatka przewiduje dla reguł przenoszonych do wytycznych.
  - Not chosen:
    - (b) skill bez zmian — po wycofaniu wpisu powód nie stoi nigdzie, a następna zmiana skilla może regułę po cichu odwrócić.
  - Source: Mariusz (przez doradcę dnia), 2026-11-13, „1 a, 2 a, 3 a” (odpowiedź na pytanie z drogami a, b i rekomendacją a).
- 4. Które z 26 wpisów z regułami pisania kodu i testów (pliki wzorcowe rodzajów kodu D-34–D-37, D-113–D-117, D-162, D-213; dyscyplina testów D-73, D-74, D-78–D-85; jej świadome wyłączenia D-75, D-76, D-87–D-89) wychodzą z dziennika, skoro wzory wytycznych the way wymagają wpisu dla 25 z nich (tabela w *Context*)?
  - Answer: (a) — wychodzi tylko D-80; pozostałe 25 zostaje, a przypięta wersja the way w grze się nie przesuwa, bo do wycofania D-80 nie jest potrzebna.
  - Not chosen:
    - (b) nic — przyłączona część wypada w całości, najmniej pracy, a D-80 dalej dubluje wzór, bez szkody.
    - (c) najpierw zadanie w the way, które pozwoli trzymać pliki wzorcowe, odstępstwa i wyłączenia w samych wytycznych, potem przesunięcie przypiętej wersji the way w grze i wycofanie około 19 wpisów — zysk największy, ale odwraca świadomy wybór the way (zmiana pliku wzorcowego wymaga dziś akceptacji człowieka jak zmiana decyzji, WAY-199), a punkty 1 i 4 tego zadania czekałyby; doradca dnia: „Wariant c odwraca świadomy wybór procesu the way (WAY-199) — tego nie rozstrzygam za Mariusza.”
  - Source: Mariusz (przez doradcę dnia), 2026-11-14, „1 — a, tylko D-80. […] 2 — nie dotyczy.” (odpowiedź na pytanie z drogami a, b, c i rekomendacją a; pytanie 2 tamtej wiadomości dotyczyło przesunięcia przypiętej wersji the way).

## Context

- Analiza dziennika: `analiza dziennika decyzji w prywatnych notatkach autora` — ustalenie 2 (rodzaje wpisów), karta D5 i wiersz D8.
- Tabela wpisów z rodzajem (kolumna `class`): `tabela wpisów dziennika z rodzajem każdego, w prywatnych notatkach autora`; obejmuje wpisy do D-373, a żaden z wpisów D-374–D-389 nie jest instrukcją pracy agenta (przeczytane tytuły, 2026-11-13).
- Decyzje Mariusza z 12.11.2026: `notatka z rozstrzygnięciami autora w jego prywatnych notatkach`, sekcja „Sprawa 9”.
- Wycofany wpis znika z dziennika w całości, z uzasadnieniem i wariantami odrzuconymi; jego numer trafia do listy „Withdrawn identifiers” na końcu dziennika (`.the-way/elements/decisions/template.md`, sekcje „Changing a decision” i „Withdrawn numbers”). Dziennik gry nie ma jeszcze tej listy.
- Skrypt kontroli fundamentu zgłasza jako błąd odwołanie do wycofanego numeru w każdym pliku, który śledzi git (`.the-way/elements/common/foundation_check.py`, docstring, linie 26–27).
- Szablon wpisu mówi, że zdanie wiążące „states what holds today and names no stage” (`.the-way/elements/decisions/template.md`, sekcja „Binding sentences”).
- Odwołania do wycofywanych numerów poza dziennikiem, policzone `git grep -w`: D-254 w `tests/view/scene.test.mjs`; D-357, D-358, D-359 i D-361 nigdzie (2026-11-13); D-80 tylko w `guidelines/testing.md` (2026-11-14). W dzienniku D-254 wymieniają inne wpisy (D-347, D-357, D-359), D-357 — D-358, a D-80 — D-378, D-387, D-388 i D-398.
- Reguły wycofywanych wpisów D-254–D-361 stoją już w skillach: `loop2-play` (Playwright CLI i MCP, zrzuty w `mariusznazar/screenshots` z `?raw=true`, sesja MCP w worktree cyklu) i `loop2-deploy` (`references/backup_and_restore.md`, komenda licząca linie konfiguracji SSH roota); kopie w `.claude/skills/` i `.agents/skills/` są dziś identyczne.
- Wzór wytycznych testów the way niesie regułę „Where the expected value comes from”: wartość oczekiwana „never comes from what the code gives today, snapshots and characterization tests included” (`.the-way/product-guidelines/testing/template.md`, opis tej reguły w „What each section carries”); D-73 przyjmuje ten wzór w całości.
- Dlaczego 25 z 26 wpisów zostaje (pytanie 4) — wzory wytycznych the way, na przypiętej wersji i na najnowszej (z PR #120 i późniejszymi), wymagają wpisu w dzienniku produktu dla pliku wzorcowego rodzaju kodu (WAY-199: „beside the exemplar's path the decision that designates it”), przyjęcia wzoru i każdego odstępstwa od niego (WAY-173: „the product departs from any of them only by a decision of its log that gives the reason”), wzorcowego testu poziomu (WAY-242), kategorii świadomie nietestowanej (WAY-237) i pola przepisu poziomu, które ma wiązać (`.the-way/product-guidelines/testing/template.md`: „a field naming no decision stands as an example”):

  | Wpisy | Dokąd | Dlaczego zostają |
  |---|---|---|
  | D-34, D-35, D-36, D-37, D-114 | zostają | wskazują plik wzorcowy rodzaju kodu (WAY-199) |
  | D-113, D-115, D-116, D-117, D-162, D-213 | zostają | wskazują plik wzorcowy i niosą zachowanie gry albo serwera z odrzuconymi wariantami |
  | D-73 | zostaje | przyjęcie wzoru wytycznych testów (WAY-173) |
  | D-74, D-76, D-78, D-79, D-82 | zostają | odstępstwa od wzoru z powodem (WAY-173) |
  | D-81 | zostaje | tabela poziomów testów we wzorze ma kolumnę „Decision” |
  | D-83, D-84 | zostają | bez nich pola przepisów poziomów przestają wiązać; z D-83 wyprowadzono niezmiennik `node-test-selection` |
  | D-85 | zostaje | wskazuje wzorcowe testy poziomów (WAY-242) |
  | D-75, D-87, D-88, D-89 | zostają | sekcja „Not tested on purpose” (WAY-237); D-89 to jedyny wpis za kategorią „kod, który tylko przekazuje dane” (`guidelines/testing.md:383`) |

- Punkty 4 i 5 pierwotnej notatki są osobnymi zadaniami (pytanie 1): `zadanie_loop2_testy_wskazuja_zdania_decyzji` i `zadanie_loop2_dziennik_decyzji_na_tematy` w tym samym folderze `_zadania`.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

Wycofywane (zmiana z pytań 2 i 4):

- D-254 — „An agent operates the running game in a real browser with Playwright CLI, and with Playwright MCP where the CLI fails, and reads motion from a stream of frames. This inspection adds to the checks D-75 and D-88 leave with a person and replaces none of them.” — wycofana, reguła zostaje w `loop2-play`.
- D-357 — „The screenshots that a task cycle shows the human lie in the public GitHub repository `mariusznazar/screenshots`, in its directory `loop2/` and in that a directory for each cycle, named as the directory of the cycle's own record, on a branch of that repository named `loop2/` and the name of that directory, never on `main`, and the description of the request embeds each as an image by a link to its file in a particular commit of that repository, with `?raw=true` appended. That repository holds only the screenshots of public products and may be cleared after a long time, and the images of old requests then stop showing.” — wycofana, reguła zostaje w `loop2-play`.
- D-358 — „The agent that shows a screenshot pushes it itself to the repository `mariusznazar/screenshots` with the `gh` account of the human who owns that repository, with no step of the human.” — wycofana, reguła zostaje w `loop2-play`.
- D-359 — „An agent uses Playwright MCP, the fallback way of D-254, only from a session of the agent started in the worktree of its cycle.” — wycofana, reguła zostaje w `loop2-play`.
- D-361 — „An agent reads root's SSH configuration and the system-wide one on the server only as a count of the lines that set `KnownHostsCommand` or `VerifyHostKeyDNS` in them and in the files they pull in with `Include`, by the one command the `loop2-deploy` skill gives, which returns the number and nothing else; it never reads their content.” — wycofana, reguła zostaje w `loop2-deploy`.
- D-80 — „A test of a game parameter, such as survival time, progress rate or map difficulty, may check calculations on concrete numbers, but takes its expectation from an agreed requirement. Current parameters or the simulation's current result are not themselves evidence of correctness.” — wycofana, reguła zostaje w `guidelines/testing.md` („Where the expected value comes from”, oparta na D-73 i D-82).

Zostające (pytanie 2), bez zmiany zdań wiążących:

- D-12 — „An agent reads the server only through the `mikrus` MCP server and changes nothing on it. Every change on the server that is not a deployment started by the automation is made by a human.”
- D-234 — „A checked restore is one trial on the owner's computer before the change that brings the backups merges: a backup fetched from its destination and decrypted, the same commit run on it, a login with a test account, the saved game state seen back, and the backup removed from the computer. It does not cover building a new server, and restoring over the server's database stays a human's documented procedure.”
- D-255 — „An agent builds the game state a check needs with functions of the simulation and sends it by the ordinary save request to a local server with a database made for that check, and it reaches early states by playing. One command of the repository starts the game locally over HTTPS, and a check touches neither the test server nor a player's save.”
- D-347 — „An agent learns what went wrong in the game running in the browser from what a player reads, the screen and the chronicle, and from the browser's console, through the browser it operates, with no outside service. An exception in the game shows on the screen as a sentence that something broke and goes to the console.” — zmienia się tylko jej pole *Relations*: znika „derives from D-254”.

Wyprowadzone z D-80 (pytanie 4), bez zmiany zdań wiążących; z pola *Relations* znika „derives from D-80”, a w uzasadnieniach D-387 i D-388 „(D-80, D-82)” staje się „(D-82)”:

- D-378 — „On Las a program built of the closed lists of conditions and actions keeps the mage alive for 480 game minutes, paying nature energy for its lightings as well as sticks, on at least one seed that a test of the simulation names, and the empty program dies there.”
- D-387 — „These numbers are requirements of the game, held in its data (D-18), that tests of the simulation may expect: the body starts at 37.0 °C, 100 satiety and 100 health, which are also its caps; in a game minute outside combat it cools by 0.002 °C for each degree its map's ambient temperature lies below 37.0, loses 0.6 satiety, is chilled below 35.0 °C and starving below 30 satiety, loses 0.35 health for being chilled and another 0.35 for starving, and regains 0.05 health in a game minute in which it is neither. A gathering lasts 10 game minutes and succeeds with the chance 0.7. Making a campfire lasts 20 game minutes and uses 6 sticks; lighting it lasts 5 game minutes, uses 2 sticks (besides the nature energy of D-63) and gives it 60 minutes of burning; feeding it lasts 5 game minutes, uses one stick and adds 20 minutes of burning; a burning campfire warms the character on its tile by 0.5 °C a game minute; lighting a stick lasts 5 game minutes and uses the stick, which burns 3 minutes and warms the character on its tile by 0.15 °C a game minute; eating lasts 5 game minutes, uses one berry and gives 25 satiety.”
- D-388 — „Las is a grid of 4 × 4 tiles with its entrance fixed at column 1, row 1, an ambient temperature of 25 °C and 5 game minutes to enter a tile, and it is solved by a streak of 480 game minutes (D-136); Las — głębiej is a grid of 5 × 5 tiles with its entrance drawn by the map run (D-24), an ambient temperature of 7 °C, 5 game minutes to enter a tile and the resources of Las, a wolf that attacks as D-142 gives, and it opens when Las is solved and is solved by a streak of 540 game minutes together with two beaten attacks. The resources of both maps, each with its density, its stock per tile and the game minutes to renew one piece, are: sticks 0.7, 12 and 30; berries 0.5, 8 and 40; moss 0.4, 6 and 60; fiber 0.4, 6 and 60. These numbers are requirements of the game, held in its data (D-18), that tests of the simulation may expect.”
- D-398 — „Skraj lasu is a grid of 4 × 4 tiles with its entrance fixed at column 1, row 1, an ambient temperature of 25 °C and 5 game minutes to enter a tile, with no attacking creature and no cap on what is carried in or out, and it is solved by a streak of 480 game minutes (D-136). Its resources are sticks, with density 1, a stock of 12 per tile and one piece renewed in 30 game minutes, and berries, with density 1, a stock of 8 per tile and one piece renewed in 40 game minutes, and it has no moss and no fiber. These numbers are requirements of the game, held in its data (D-18), that tests of the simulation may expect.”

Zdania wiążące ze słowem o etapie (punkt 4 „To do”; znaczenie bez zmian):

- D-42: „For now every screen of the browser view keeps four success criteria of WCAG 2.2, the W3C Recommendation of 12 December 2024 — 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast, 2.3.1 Three Flashes or Below Threshold and 2.4.7 Focus Visible — and no other requirement of WCAG, with no date or event set for returning to it.”
- D-64: „Carrying capacity is currently 15 pieces, and the character skill trees currently have no branch that raises it.”
- D-123: „Today the game writes one such rule, „Zawsze → Eksploruj”, when the first chill brings „Eksploruj” into the Understanding.”
- D-143: „The discovery leaves writing combat rules to the player; the game currently adds no rule at this attack, and later attacks of an already known creature leave time running unless the minute discovers something else.”
- D-144: „The character currently uses „Uderz — patyk”, which requires a stick in the backpack and deals a base 6 damage increased by its bought branch ranks, „Kopnij”, which deals a base 3 damage increased by its bought branch ranks and needs neither an item nor a target, and „Odskocz”, which sets one pending reduction of a base 5 damage increased by its bought branch ranks for the next damaging enemy strike.”
- D-145: „A stick currently stays in the backpack after a strike, with its condition unchanged, and the game currently has no action for dressing wounds.”
- D-167: „The game has today no action that duplicates a program.”
- D-169: „A program's name is the typed text trimmed of the white space at its start and end, and it is not empty; the game takes no name another program bears, comparing names regardless of letter case, and sets today no limit to a name's length.”
- D-181: „The game currently accepts an item once on each trip list, and the same item can stand on both lists.” oraz „A position's count is a safe integer from 1 up — at most 9007199254740991, the largest integer a saved game state holds exactly — and below that bound its upper range is currently left to reality's clipping of the plan; an invalid entry keeps the previous count in the position and stays visible in the field, whose frame and message „Wpisz liczbę całkowitą od 1.” below it take the role `warning` until the player enters a valid count.”
- D-187: „The entry cap clips the trip plan when the character enters and the exit cap at completion; gathering during the run is currently bounded by the character's carrying capacity, which the map cap currently leaves unchanged.”
- D-188: „The same line stands on the screen of a map run beside „Restart” for the current copy and map; when carrying capacity itself clips the plan and the map does not, this line is currently absent.”
- D-194: „A manual map run holds the practice it gathers separately by character skill and currently pays all of it once to the character making the run in the game minute of the completion that first solves its map, while a manual run of a solved map keeps its practice with the run.” oraz „A run cut short by „Restart” or „Zakończ” before completion currently leaves the character’s practice and bought ranks as they were.”
- D-196: „Outside a map run the program editor currently offers the repertoire computed from the Understanding through the archetype’s predispositions; bought branches currently contribute no actions to that editor's offer.”
- D-199: „… before the first known tree the section is currently absent.”, „… while „Obchód”, „Czysty płomień” and „Zwiad” give the price and currently omit numerical before-and-after values.” oraz „A fully bought branch keeps its present value if numerical and currently omits the next value and price.”
- D-200: „The player currently buys a branch rank with „Kup” on the screen Postać outside a manual map run, …” oraz „The game currently has no purchase in the map-run view and no undo of a purchase.”
- D-201: „Below the body row the map-run view currently shows a line in the role `text`, „Wprawa w tym przejściu: {umiejętność} +{n} · …”, listing the skills with positive practice gathered in that run.” oraz „Zero-valued skills and the line at zero are currently absent, and the positive line remains after death and completion until „Restart” or „Zakończ”.”
- D-208: „… the game currently sets no limit on the number of earning loops, and the limits of a save stay as D-104 and D-207 give them.”
- D-243: „The player currently starts an earning loop with „Puść w pętlę”, …” oraz „At a character in an earning loop „Wejdź” and „Puść w pętlę” are currently inactive, and the player stops the earning loop first.”
- D-244: „A running earning loop currently shows on the card and the screen of its character, …” oraz „The game currently opens no map of an earning loop's map run, so what the map-run view and the program editor show during a map run stands for a manual map run; …”
- D-246: „After being away the player currently reads a report in the section „Gdy cię nie było” of Siedziba, above „Drużyna”, …”
- D-247: „The catch-up currently computes all the missed game minutes, and the game currently sets no upper bound on them.”
- D-249: „A map run of an earning loop currently discovers nothing: the Understanding and the program stay as they stand, …”
- D-385: „An item burning on a revealed tile, a lit stick today, stands in that tile's row of the list of revealed tiles after the text of the tile's campfire, …”

## Settlements to record

Candidates: 1 shown, 0 accepted — 2026-11-14

none

## Out of scope

- Punkty 4 i 5 pierwotnej notatki — dwa osobne zadania (pytanie 1).
- Pozostałe 25 wpisów z regułami pisania kodu i testów (tabela w *Context*) — wzory wytycznych the way wymagają ich jako wpisów (pytanie 4).
- Pozostałe reguły wytycznych, 31 pojedynczych napisów i liczb, 7 opisów braku funkcji i scalanie wpisów jednego ekranu w jeden — partiami przy przeglądach fundamentu gry (sprawa 9, decyzja 5).
