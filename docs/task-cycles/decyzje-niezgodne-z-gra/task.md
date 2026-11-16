---
title: "loop2: decyzje niezgodne z grą i sześć błędnych list niezmienników — uwagi agentów z PR-a #133"
status: draft
created: 2026-11-15T13:03
updated: 2026-11-15
tags: [zadanie]
related: "the project note of Loop in the author's backlog"
---

# loop2: decyzje niezgodne z grą i sześć błędnych list niezmienników — uwagi agentów z PR-a #133

Status: ready for cycle
Project relation: independent
Defect introduced by: https://github.com/mariusznazar/loop2/pull/32 · https://github.com/mariusznazar/loop2/pull/33 · https://github.com/mariusznazar/loop2/pull/41 · https://github.com/mariusznazar/loop2/pull/85 · https://github.com/mariusznazar/loop2/pull/129

## Description

### Need

- W sześciu decyzjach dziennika `foundations/decisions.md` lista `invariants:` w polu *Verification* nie zgadza się z polem *Derives from* niezmienników w `foundations/invariants.md`: cztery decyzje pomijają niezmiennik, który się z nich wywodzi (D-04, D-108, D-179, D-190), dwie wymieniają taki, który ich nie wymienia (D-113, D-377); szablon decyzji the-way wymaga, żeby obie strony się zgadzały („*Verification* names … the invariants … that derive from the decision …; each of them names the decision in *Derives from*”, `.the-way/elements/decisions/template.md`, sekcja „Verification”).
- Siedem decyzji mówi w zdaniu wiążącym albo w przykładzie *Verification* coś, czego gra nie robi albo robi inaczej (D-03, D-14, D-17, D-28, D-61, D-189, D-195), a niezmiennik `loop2-container-sprites` nie obejmuje tła karty logowania, które D-271 każe trzymać w `assets/sprites/`.
- Dziewiętnaście komentarzy i nazw testów mówi więcej, niż ich przypadek sprawdza, cytuje decyzję, która tego nie stanowi, wskazuje numery linii dziennika, pod którymi decyzji już nie ma, albo powołuje się na dokument spoza fundamentu, czego zabrania D-82.
- Agent, który porównuje zmianę z decyzją albo idzie za komentarzem testu, sprawdzi wtedy niewłaściwą rzecz albo „poprawi” grę pod zdanie, którego gra nie spełnia; Mariusz dowie się o rozjeździe dopiero przy kolejnej zmianie.

### To do

1. Pole *Verification* czterech decyzji wymienia w `invariants:` niezmiennik, który się z nich wywodzi: D-04 — `minute-span-split`, D-108 — `account-client-requests`, D-179 — `trip-run-end`, D-190 — `catch-up-state` (pytanie 1).
2. Niezmiennik `player-argon2-deployment-check` wymienia w *Derives from* D-113 obok D-106, a *Verification* D-113 nie wymienia już `player-argon2-password-hash` (pytanie 2).
3. Niezmiennik `nature-energy-range` wymienia w *Derives from* D-377 obok D-63, D-71 i D-177 (pytanie 3).
4. Zdanie niezmiennika `loop2-container-sprites` kończy się „…every file the scene's drawing, the camp's drawing or the picture behind the login card asks for”, a docstring testu `tests/invariants/test_loop2_container_sprites.py`, który przytacza to zdanie i opisuje jego odczyt, idzie za nim (pytanie 6.1).
5. Zdania D-03, D-14, D-17, D-61, D-189 (z jego uzasadnieniem) i D-195 oraz przykład zgodny w *Verification* D-28 mają nowe brzmienie, które *Decisions in play* podaje przy każdej z tych decyzji (pytania 7–13).
6. Komentarze i nazwy testów mówią tylko to, co ich przypadek sprawdza, cytują decyzję, której zdanie to stanowi, albo żadnej, nie podają numerów linii dziennika i nie powołują się na dokument spoza fundamentu (D-82); asercji testów nie zmienia się, chyba że przypadek ma sprawdzić to, co jego nazwa obiecuje (pytanie 4). Miejsca, z numerem linii na `main` `b1904c5b` jako wskazówką:
   - `tests/deploy/test_loop2_log_storage.py`: komentarze „# D-355, A2:” (około wierszy 75 i 85) i „# D-355, A3:” (około 100 i 108) oraz nazwa `test_the_stanza_holds_exactly_the_directives_of_a3` — „A2”, „A3” to etykiety dokumentu spoza fundamentu.
   - `tests/view/react-controls.test.mjs`: komentarz „// The tab (pytania 2 and 2c): …” (około 402) — pytania dokumentu zadania.
   - `tests/sim/encounters.test.mjs`: „// Sources: foundations/decisions.md:2008, :2032, :2575.” (około 481) — te linie nie wskazują już D-118, D-119 i D-143.
   - `tests/sim/program-counts.test.mjs`: „// D-92 and D-93 (foundations/decisions.md:1619,1641): …” (około 16) — nieaktualne numery linii.
   - `tests/view/status-row.test.mjs`: „// D-135: the bar shows the streak as it stands, …” (około 347) — to stanowi D-133, nie D-135.
   - `tests/view/end-window-lines.test.mjs`: „(D-93 gives the percentages whole)” (około 292) — D-93 mówi tylko o licznikach „Wykonano {n}×”, udziały czasu stanowi D-368.
   - `tests/sim/flow.test.mjs`: „// D-173: „Zakończ” drops the copy; the program sent with stays.” (około 155) — D-173 mówi tylko, że „Zakończ” bez niezapisanych zmian kończy przejście od razu.
   - `tests/view/tile-list.test.mjs`: „// D-70: the campfire's state stands in the table alone.” (około 268) — D-70 nie mówi „alone”.
   - `tests/view/camp-picture.test.mjs`: pierwszy komentarz pliku „// The camp of Siedziba as data for drawing (D-272): …” — zawartość i kolejność obozu stanowi D-389, D-272 mówi tylko, gdzie obraz może stać.
   - `tests/view/headquarters-screen.test.mjs`: komentarz „Catches the camp made a control … (D-272, D-321)” (około 675–676) — o kontrolkach i czytnikach mówi D-389, nie D-272.
   - `tests/view/headquarters-screen.test.mjs`: „… at every game minute (D-36).” (około 612) oraz `tests/view/program-panel.test.mjs`: „// D-03, D-36: the controls are updated in place.” (około 903) i „// D-36: the panel leaves nothing behind.” (około 1716) — D-36 wybiera wzorzec pliku i zostawia utrzymanie kursora i sprzątanie jako przykłady, nie wymaga ich.
   - `tests/view/account-screen.test.mjs`: „D-261: the sentence stands in the card.” (około 3587) — przypadek czyta tylko tekst zdania, nie jego miejsce.
   - `tests/view/account-screen.test.mjs`: „// D-262, D-280. Catches the game's name left as a title of its own …” (około 5299) — `assertNameAloneOnBar` nie sprawdza nagłówka, o którym mówi D-262.
   - `tests/view/account-screen.test.mjs`: „// D-251, D-329. Catches a mark in the wrong place or role, …” (około 3043) — przypadek nie sprawdza roli.
   - `tests/view/map-lines.test.mjs`: „… and a minutes-without-fire line where the map does not cool the body.” (około 78) — to sprawdza następny przypadek, nie ten.
   - `tests/sim/trip.test.mjs`: „// The restart follows the completion that solved forest, so it takes from nowhere (D-214).” (około 405) — przypadek woła `end(...)` i wysyła na `forestDeep`, restartu nie ma.
   - `tests/sim/loop.test.mjs`: nazwa „every state a loop makes over a whole map run, an end and the next map run loads back, …” (około 1167) — ciało tylko woła `advanceLoopRun` przez 520 minut, końca ani następnego przejścia nie ma.
   - `tests/sim/rule-signs.test.mjs`: nazwa „of several reasons the world and the backpack come before the nature energy” (około 260) — przypadek sprawdza tylko świat przed energią.
   - `tests/view/rule-editor.test.mjs`: nazwa „a folded group shows its header alone, with name, condition and number of rules” (około 583) — przypadek nie sprawdza warunku.
7. Starsze teksty nazywają „owner” osobę, która prowadzi serwer, a od panelu właściciela słownik mówi, że „owner” to konto z rolą właściciela: około siedemdziesięciu linii starszych decyzji, cztery linie skilla wdrożenia, kilka komentarzy w kodzie i tytuły części testów. Te miejsca nazywają tę osobę „operator” (albo słowem, które słownik dla niej przyjmie), bez zmiany znaczenia. Źródło: pozycja 5 „Fix or let through” w https://github.com/mariusznazar/loop2/pull/134 i komentarz doradcy https://github.com/mariusznazar/loop2/pull/134#issuecomment-6899844956 (dopisane przez doradcę dnia 15.11 jako drobiazg przy okazji, po scaleniu #134).
8. Niezmiennik `cross-part-imports` opiera się na fakcie oznaczonym `TODO` od 2026-11-08 (do uzupełnienia przez człowieka). Cykl szuka źródła tego faktu w fundamencie i w procesie the way; gdy je znajdzie — wpisuje fakt ze źródłem, gdy nie — zostawia `TODO` i wypisuje to w „Needed from you” PR-a. Źródło: pozycja 4 „Fix or let through” i „Foundation entries, 10” w https://github.com/mariusznazar/loop2/pull/135 (dopisane przez doradcę dnia 16.11 jako drobiazg przy okazji).

### Acceptance criteria

- Porównanie wszystkich decyzji dziennika z *Derives from* wszystkich niezmienników — skryptem `docs/task-cycles/testy-wskazuja-zdania-decyzji/reports/return-step-inv_names.py` z commita `30a78d5931db6beadac8af260d5341c8c4db1542` albo równoważnym — nie znajduje żadnego rozjazdu na gałęzi zadania.

### Questions to settle

- 1. Co z czterema decyzjami, w których niezmiennika brakuje na liście `invariants:` (D-04, D-108, D-179, D-190)?
  - Answer: dopisać brakujący niezmiennik do `invariants:` każdej z czterech decyzji.
  - Not chosen:
    - zostawić — agent zmieniający taką decyzję nie dowie się z niej, że musi sprawdzić niezmiennik;
    - wykreślić decyzję z *Derives from* niezmiennika — nieprawdziwe, bo treść niezmiennika z niej wynika.
  - Source: Mariusz przez doradcę dnia, 2026-11-15, „1 tak”.
- 2. D-113 wymienia `player-argon2-deployment-check` i `player-argon2-password-hash`, które wywodzą się tylko z D-106 — co z nimi?
  - Answer: b — dopisać D-113 do *Derives from* niezmiennika `player-argon2-deployment-check` (to pomiar, o którym mówi końcówka D-113: „measured with that gate in the deployed container image”) i wykreślić z listy D-113 tylko `player-argon2-password-hash` (wybór biblioteki z D-106).
  - Not chosen:
    - a) wykreślić oba z listy D-113 — ktoś zmieniający profil albo bramkę w D-113 nie dostanie wskazówki, że pomiar na serwerze trzeba powtórzyć.
  - Source: Mariusz przez doradcę dnia, 2026-11-15, „2 b”.
- 3. D-377 wymienia `nature-energy-range`, którego *Derives from* to D-63, D-71 i D-177 — co z nim?
  - Answer: b — dopisać D-377 do *Derives from* niezmiennika: odnawianie energii „up to its cap” to jedna z dróg, którą energia może przekroczyć limit.
  - Not chosen:
    - a) wykreślić go z listy D-377 — część „nie ponad limit” i tak trzymają testy D-377, ale zmiana D-377 nie kazałaby spojrzeć na niezmiennik.
  - Source: Mariusz przez doradcę dnia, 2026-11-15, „3 b”.
- 4. Czy zadanie poprawia komentarze i nazwy testów, które agenci PR-a #133 wskazali jako błędne albo nieaktualne?
  - Answer: a — tak, w tym zadaniu.
  - Not chosen:
    - b) nie ruszać ich teraz — komentarze dalej łamią D-82 i wskazują złe decyzje, a następny agent, który pójdzie za takim komentarzem, sprawdzi niewłaściwą decyzję.
  - Source: Mariusz przez doradcę dnia, 2026-11-15, „4 a”.
- 5. Co z uwagami o regułach procesu, a nie gry (cięcie zdania wiążącego na kropce w polskim cytacie w D-216, D-222, D-345; słowa etapu jak „today” w uzasadnieniach i tytułach D-55, D-71, D-145, D-148 i podobne)?
  - Answer: a — wyłączyć wszystkie z tego zadania i zaparkować zadanie the-way o cięciu zdań na kropce w cytacie (zaparkowane 2026-11-15 jako `the note of the parked task of the-way on the sentence cut at a full stop in a quotation, in the author's backlog`).
  - Not chosen:
    - b) wyłączyć bez parkowania — reguła dalej tnie cytaty i nikt tego nie zapisze;
    - c) jak a, a do tego usunąć „today” z tytułów D-145 i D-148 w tym zadaniu.
  - Source: Mariusz przez doradcę dnia, 2026-11-15, „5 a (zadanie the-way o cięciu zdania na kropce w cytacie zaparkuj jako [>] z 📅 2026-11-15)”.
- 6.1. Niezmiennik `loop2-container-sprites` obejmuje tylko pliki, które zamawia rysunek sceny albo obozu, a D-271 trzyma w `assets/sprites/` także tło karty logowania — co z tym?
  - Answer: a — dopisać tło do zdania niezmiennika: „…every file the scene's drawing, the camp's drawing or the picture behind the login card asks for”.
  - Not chosen:
    - b) zostawić — dziś nic się nie psuje, bo test czyta cały katalog, ale gdyby ktoś zawęził test do treści niezmiennika, tło wypadnie spod kontroli.
  - Source: Mariusz przez doradcę dnia, 2026-11-15, „6.1 a”.
- 6.2. Czy D-397 i D-398 mają przestać wymieniać `first-map-stock` i `first-map-balance`, skoro te niezmienniki nie trzymają ich zdań wiążących?
  - Answer: nie — uwagę odrzucić: oba niezmienniki wymieniają D-397 (i D-398) w *Derives from*, listy są spójne, a szablon nie wymaga, żeby niezmiennik powtarzał zdanie wiążące decyzji.
  - Source: Mariusz przez doradcę dnia, 2026-11-15, „6.2 tak (odrzucić)”.
- 7. Czy przykład w drugim zdaniu D-195 ma podawać drzewo pełną nazwą umiejętności, tak jak pisze ją gra?
  - Answer: tak — „Odkryto: Zbierz, drzewo umiejętności Zbieranie małych przedmiotów.”
  - Not chosen:
    - zostawić „Zbieranie” — agent piszący test albo zmianę z samej decyzji uzna krótką nazwę za wymaganą.
  - Source: Mariusz przez doradcę dnia, 2026-11-15, „7–11 tak”; kod: `src/browser/sim/data/skills.ts:30` „Zbieranie małych przedmiotów”, `tests/view/status-row.test.mjs:251`, rewizja `b1904c5b`.
- 8. Czy trzecie zdanie D-61 ma nazywać przyczynę śmierci w walce tak jak pozostałe przyczyny, bez polskiego cudzysłowu?
  - Answer: tak — „…dies with the cause combat in the game minute of the combat turns.”
  - Not chosen:
    - zostawić „walka” — w polskim cudzysłowie wygląda na napis, który gracz widzi, a gracz widzi „Mag zginął w walce”.
  - Source: Mariusz przez doradcę dnia, 2026-11-15, „7–11 tak”; kod: `src/browser/sim/types.ts:232` `DeathCause = "cold" | "hunger" | "combat"`, `src/browser/view/now-lines.ts:23`, rewizja `b1904c5b`.
- 9. Czy drugie zdanie D-17 ma mówić, że wdrożenie buduje także przy wartości równej progowi?
  - Answer: tak — „…stay at or above thresholds the repository sets, …”.
  - Not chosen:
    - zostawić „above” — agent wierny decyzji może zmienić warunek na ostry, a wtedy wdrożenie przy wartości równej progowi zacznie odmawiać i test będzie przeczył decyzji.
  - Source: Mariusz przez doradcę dnia, 2026-11-15, „7–11 tak”; kod: `deploy/loop2-deploy:277` i `:280` (warunek `<`), test `test_exact_thresholds_pass` w `tests/deploy/test_loop2_deploy_build.py`, rewizja `b1904c5b`.
- 10. Czy ostatnie zdanie D-189 i jego uzasadnienie mają wskazywać znacznik na karcie mapy, a nie na liście map?
  - Answer: tak — w zdaniu „…and the card of the map marks it, under „Wejdź” at the character in „Kto idzie”, as not predicting the earning loop when the chest lacks that equipment.”, a w uzasadnieniu „the mark on the card of the map” w miejscu „the mark on the list of maps”.
  - Not chosen:
    - zostawić — ktoś szukający znacznika na liście map uzna, że go brakuje, i dorobi drugi.
  - Source: Mariusz przez doradcę dnia, 2026-11-15, „7–11 tak”; kod: `src/browser/view/maps-screen.tsx:329` (`rehearsal-mark` w „Kto idzie”), rewizja `b1904c5b`.
- 11. Czy D-14 ma mówić o obu kontenerach loop2?
  - Answer: tak — „loop2's containers, the application's and the connector's, are Docker containers.”
  - Not chosen:
    - zostawić — nic się nie psuje, bo łącznik opisuje D-10; zostaje zdanie węższe niż stan.
  - Source: Mariusz przez doradcę dnia, 2026-11-15, „7–11 tak”; kod: `compose.yaml` (kontenery `loop2` i `loop2-cloudflared`), rewizja `b1904c5b`.
- 12. D-03 mówi, że ekrany są komponentami `.tsx`, a ekrany oczekiwania z D-262 buduje `src/browser/view/app.ts` przez `document.createElement` — co z tym?
  - Answer: a — zapisać wyjątek w zdaniu D-03: „…its screens written as `.tsx` components that draw from the game state, except the waiting screens of D-262, which `src/browser/view/app.ts` builds, and no other UI framework…”.
  - Not chosen:
    - b) zostawić zdanie i przepisać ekrany oczekiwania na komponenty `.tsx` — zmiana kodu widoku, wytycznych stylu i testów ekranów logowania, większa recenzja, w zamian dziennik bez wyjątku;
    - c) zostawić bez zmian — zdanie dalej mówi nieprawdę, a agent zgłosi `app.ts` jako naruszenie albo uzna, że wolno pisać kolejne ekrany w `.ts`.
  - Source: Mariusz przez doradcę dnia, 2026-11-15, „12 a”; kod: `src/browser/view/app.ts:184-189`, rewizja `b1904c5b`.
- 13. Czy zdanie D-28 „The general coding quality checks cover all code, tests included” zostaje, a nieaktualny przykład „four kind guidelines” w *Verification* się zmienia?
  - Answer: tak — zdanie zostaje (ogólne wytyczne kodu obejmują wszystkie części: `guidelines/coding.md`, „Przed każdą zmianą kodu produktu, także skryptów i testów”; zasięg ESLinta rozstrzyga D-29), a przykład zgodny brzmi „general and kind guidelines follow the pinned templates, …”.
  - Not chosen:
    - zostawić przykład — nic się nie psuje, tylko przykład mówi „cztery” przy 11 rodzajach kodu w `guidelines/coding.md`.
  - Source: Mariusz przez doradcę dnia, 2026-11-15, „13 tak”.

## Context

- Źródło: pozycja 1 z listy „Fix or let through” opisu PR-a https://github.com/mariusznazar/loop2/pull/133; Mariusz (przez doradcę dnia, 2026-11-15) kazał zrobić z niej zadanie.
- Uwagi agentów stoją słowo w słowo w raportach rekordu cyklu tego PR-a: `docs/task-cycles/testy-wskazuja-zdania-decyzji/reports/executor-<n>-report.md` w commicie `30a78d5931db6beadac8af260d5341c8c4db1542` (gałąź `task/testy-wskazuja-zdania-decyzji`); przegląd całości z uwagą M2 o listach niezmienników: `reports/review-whole-report.md` tamże.
- PR #133 scalono 2026-11-15 (commit `b1904c5b` na `main`), więc wpisy mają już nowy kształt (`tests:`, linie `decision:` w testach) i zadanie na niego nie czeka.
- Uwagi sprawdzono na `main` `b1904c5b` przed doprecyzowaniem: rozbite na 119 osobnych twierdzeń, z których zostały te z *To do*; reszta stoi w *Out of scope*.
- Równolegle doprecyzowane jest zadanie loop2 o podziale dziennika decyzji na tematy (`the note of the task on the split of the decision log into topics, in the author's backlog`), które przestawia wszystkie wpisy w `foundations/decisions.md`; oba cykle nie biegną naraz, a ten, który idzie drugi, scala gałąź docelową i przenosi zmiany brzmienia do nowych miejsc wpisów.
- Linia `Defect introduced by:` wskazuje PR-y, w których powstały rozjazdy list niezmienników: #32 (D-108 i D-113), #33 (D-04), #41 (D-179), #85 (D-377), #129 (D-190). Pozostałe pozycje to luki wcześniejszych zadań albo komentarze, które zestarzały się po późniejszych zmianach dziennika; zakaz z D-82 dotyczący dokumentów spoza fundamentu wszedł 2026-11-11, po PR-ach #54 i #71, które dodały „pytania 2 and 2c” i „A2”/„A3”.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- **D-04** — *Verification*: „invariants: simulation-isolation · simulation-inputs.” → zmiana: dochodzi `minute-span-split` (pytanie 1).
- **D-108** — *Verification*: „invariants: loop2-shared-public-origin.” → zmiana: dochodzi `account-client-requests` (pytanie 1).
- **D-179** — *Verification*: „invariants: trip-transfer.” → zmiana: dochodzi `trip-run-end` (pytanie 1).
- **D-190** — *Verification*: „invariants: trip-run-end · resurrection-renewal · death-settled-once · catch-up-death-moment.” → zmiana: dochodzi `catch-up-state` (pytanie 1).
- **D-113** — „The exemplar for kind `password-hashing` is `src/server/passwords.ts`, and its kind guidelines are read before adding or changing a password-hashing file. Hashing and verification share one bounded admission gate, preserve password content, and use one explicit Argon2id profile, measured with that gate in the deployed container image.”; *Verification*: „invariants: password-operation-gate · player-argon2-password-hash · player-argon2-deployment-check.” → zmiana: z listy wypada `player-argon2-password-hash`; `player-argon2-deployment-check` dostaje D-113 w *Derives from* (pytanie 2).
- **D-377** — „In a game minute outside combat in which the mage's satiety, taken after its fall in that minute, is at least 60, the mage's nature energy comes back by 0.5, up to its cap; in a game minute in which satiety after the fall is below 60 it comes back by nothing.”; *Verification*: „invariants: nature-energy-range. …” → zmiana: `nature-energy-range` dostaje D-377 w *Derives from* (pytanie 3).
- **D-271** — „The scene's pictures and the picture of the game behind the login card are sprites of the packs Pixel Crawler and LPC Wolf, … all kept in `assets/sprites/` outside the directory the account and save server serves and copied into it when the application is built.” → bez zmiany; zmienia się wywiedziony z niej niezmiennik `loop2-container-sprites` (pytanie 6.1).
- **D-195** — drugie zdanie: „The band of a discovery names the tree beside the action, as „Odkryto: Zbierz, drzewo umiejętności Zbieranie.”, followed by the sentence naming newly discovered conditions when the same game minute reveals one.” → zmiana: przykład „Odkryto: Zbierz, drzewo umiejętności Zbieranie małych przedmiotów.” (pytanie 7).
- **D-61** — trzecie zdanie: „A character whose health reaches zero through combat dies with the cause „walka” in the game minute of the combat turns.” → zmiana: „…dies with the cause combat in the game minute of the combat turns.” (pytanie 8).
- **D-17** — drugie zdanie: „It builds only while the host's available memory and free disk stay above thresholds the repository sets, and each loop2 container runs under its own memory limit.” → zmiana: „…stay at or above thresholds the repository sets, …” (pytanie 9).
- **D-189** — ostatnie zdanie: „A manual map run of a map already solved takes nothing from the chest: it takes its equipment from nowhere, cut only by the character's carrying capacity and the map's cap, and the list of maps marks it as not predicting the earning loop when the chest lacks that equipment.”; *Rationale*: „…and the mark on the list of maps shows the one price of that.” → zmiana: „…and the card of the map marks it, under „Wejdź” at the character in „Kto idzie”, as not predicting the earning loop when the chest lacks that equipment.”; w *Rationale* „the mark on the card of the map” (pytanie 10).
- **D-14** — „The loop2 container is a Docker container.” → zmiana: „loop2's containers, the application's and the connector's, are Docker containers.” (pytanie 11).
- **D-03** — „The browser view is built in TypeScript with React, its screens written as `.tsx` components that draw from the game state, and no other UI framework stands in its code or its runtime dependencies.” → zmiana: „…its screens written as `.tsx` components that draw from the game state, except the waiting screens of D-262, which `src/browser/view/app.ts` builds, and no other UI framework stands in its code or its runtime dependencies.” (pytanie 12).
- **D-28** — *Verification*, przykład zgodny: „complies: general and four kind guidelines follow the pinned templates, retain the stated deferrals and direct test authors to the testing guidelines, with no transitional per-file no-regression invariant beside the full-compliance source invariants” → zmiana: „general and kind guidelines follow the pinned templates, …”; zdanie wiążące bez zmiany (pytanie 13).
- **D-82** — „…a test comment names as the source of an expectation no document outside the foundation — a task document and a copy of one kept in the record of a task cycle included — and a comment that carries nothing the code needs is not written.” → bez zmiany; poprawki komentarzy z punktu 6 *To do* idą za nią.
- **D-262** — „The waiting screens — „Sprawdzanie logowania…”, „Potwierdzanie adresu…”, the warning with „Spróbuj ponownie” and the moment after a sign-in that succeeded — stand outside the card, with the header, for a signed-in player too.” → bez zmiany; nowe brzmienie D-03 się na nią powołuje.

## Settlements to record

Candidates: 15 shown, 15 accepted — 2026-11-15

| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | *Verification* D-04 wymienia `minute-span-split`. | sentence of D-04 | pytanie 1 | czy dopisać niezmiennik do decyzji, czy wykreślić decyzję z niezmiennika |
| 2 | *Verification* D-108 wymienia `account-client-requests`. | sentence of D-108 | pytanie 1 | jak wyżej |
| 3 | *Verification* D-179 wymienia `trip-run-end`. | sentence of D-179 | pytanie 1 | jak wyżej |
| 4 | *Verification* D-190 wymienia `catch-up-state`. | sentence of D-190 | pytanie 1 | jak wyżej |
| 5 | *Verification* D-113 nie wymienia `player-argon2-password-hash`. | sentence of D-113 | pytanie 2 | czy wykreślić oba niezmienniki z D-113, czy dopisać D-113 do ich *Derives from* |
| 6 | `player-argon2-deployment-check` wywodzi się także z D-113. | invariant | pytanie 2 | jak wyżej |
| 7 | `nature-energy-range` wywodzi się także z D-377. | invariant | pytanie 3 | czy wykreślić niezmiennik z D-377, czy dopisać D-377 do niezmiennika |
| 8 | `loop2-container-sprites` obejmuje też tło karty logowania. | invariant | pytanie 6.1 | czy rozszerzać niezmiennik, czy go zostawić |
| 9 | Przykład paska odkrycia w D-195 podaje drzewo pełną nazwą umiejętności. | sentence of D-195 | pytanie 7 | czy poprawić decyzję, czy grę albo test |
| 10 | D-61 nazywa przyczynę śmierci w walce „combat”, bez polskiego cudzysłowu. | sentence of D-61 | pytanie 8 | brzmienie przyczyny |
| 11 | D-17: wdrożenie buduje przy wartościach równych progom lub wyższych. | sentence of D-17 | pytanie 9 | czy poprawić decyzję, czy warunek w skrypcie wdrożenia |
| 12 | D-189: znacznik przejścia ze sprzętem znikąd stoi na karcie mapy pod „Wejdź” w „Kto idzie”. | sentence of D-189 | pytanie 10 | czy poprawić decyzję, czy przenieść znacznik na listę map |
| 13 | D-14: oba kontenery loop2, aplikacji i łącznika, są kontenerami Dockera. | sentence of D-14 | pytanie 11 | czy w ogóle zmieniać zdanie prawdziwe dla kontenera aplikacji |
| 14 | D-03: ekrany oczekiwania z D-262 buduje `src/browser/view/app.ts`, poza `.tsx`. | sentence of D-03 | pytanie 12 | czy zapisać wyjątek, czy przepisać ekrany oczekiwania na `.tsx` |
| 15 | Przykład zgodny D-28 mówi o wytycznych rodzajów kodu bez ich liczby. | sentence of D-28 | pytanie 13 | czy poprawić liczbę, czy zdanie wiążące D-28 |

## Out of scope

- Uwagi o regułach procesu, nie gry (pytanie 5): cięcie zdania wiążącego na kropce w cytacie (D-216, D-222, D-345 — zaparkowane jako zadanie the-way), słowa etapu w uzasadnieniach i tytułach (D-55, D-71, D-145, D-148), zdanie D-403 opisujące zmianę, D-206 powtarzający treść D-399–D-401, zdanie wiążące w uzasadnieniu D-244 i D-237, słowo „currently” w niezmienniku `loop-run-knowledge`, długość cytatu przy D-156 i brak linii D-153 przy `test_production_account_configuration_is_fixed`.
- 32 uwagi, w których zdanie decyzji jest prawdziwe, a testy sprawdzają mniej, niż mówi (np. osobny limit pamięci kontenera w D-17, rola `warning` w D-171–D-173, „by that size” w D-382): ich część trzyma para przykładów *Verification*, zadanie nie dopisuje testów.
- 39 uwag, które same nie znalazły rozjazdu albo są już nieaktualne na `b1904c5b` (np. D-103 poprawiony w PR #133).
- D-397 i D-398 z niezmiennikami `first-map-stock` i `first-map-balance` (pytanie 6.2).
- Dwie uwagi o testach odrzucone po sprawdzeniu: docstring `tests/deploy/test_loop2_image_icons.py` cytuje D-05 słusznie, bo test pobiera z kontenera pliki statyczne, które według D-05 serwuje Express; nazwa przypadku w `tests/view/maps-screen.test.mjs` „a manual map run going on, waiting and ended keeps „Wejdź” inactive …” obejmuje stan trwającego przejścia, który trzyma cytowana w nim D-55, więc nie jest fałszywa.
- Komentarze `src/browser/view/*.tsx`, które cytują D-36 przy budowie ekranu „behind one boundary”: idą za wzorcem, który D-36 wybiera, więc zostają.
