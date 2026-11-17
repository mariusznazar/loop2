---
title: "loop2: zbiorcze poprawki brzmienia fundamentu, wytycznych i komentarzy z przeglądu"
status: draft
created: 2026-11-13
updated: 2026-11-13
tags: [zadanie]
related: "the note of the project"
---

# loop2: zbiorcze poprawki brzmienia fundamentu, wytycznych i komentarzy z przeglądu

Status: ready for cycle
Project relation: independent

## Description

### Need

- Przegląd fundamentu z 13.11.2026 zebrał drobne poprawki tekstu, które nie zmieniają zachowania gry: uzasadnienia i przykłady decyzji, które się zestarzały, powiązania niezmienników, słowa słownika, cytaty faktów środowiska, zdania wytycznych i komentarze testów odsyłające do przesuniętych linii.
- Agent czytający te teksty dosłownie dostaje zły obraz: szuka znaku na liście map, którego nie ma (D-189), liczy 312 > 300 i może usunąć zabezpieczenie sceny (D-316), rysuje ikonę mapy kolorem z pliku (D-70), oznacza poprawną kartę logowania jako błąd wobec przewodnika stylu, idzie za odsyłaczem do pustej linii `decisions.md`.
- Zakres: sekcja 4 i grupa G-7 w the note of the review of the foundation of 13 November, F-10, F-23, F-36, F-37 z sekcji 1 i trzy wiersze sekcji 4 rozstrzygnięte przez człowieka (D-231, D-232, D-380); do tego te same usterki w miejscach obok, znalezione przy sprawdzeniu wierszy na `main` (oznaczone „+”).
- Wpisy fundamentu zmienia się tylko przez skille `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-update-part-map`, `the-way-record-environment-fact`.

### To do

1. Dziennik decyzji: każda zmiana wymieniona przy decyzji w *Decisions in play* (sekcja „Zmieniane”), z zachowaniem tego, co decyzja wiąże.
2. Niezmienniki (`foundations/invariants.md`):
   1. `minute-span-split` — D-04 *Verification* dostaje `minute-span-split` (zob. D-04).
   2. `password-operation-gate` — D-103 *Verification* dostaje `password-operation-gate`; *Derives from* zostaje „D-103 · D-113” (zob. D-103).
   3. `account-client-requests` — D-108 *Verification* dostaje `account-client-requests` (zob. D-108).
   4. `trip-run-end` — D-179 *Verification* dostaje `trip-run-end` (zob. D-179).
   5. `player-argon2-deployment-check` — *Derives from* „D-106 · D-113”; `player-argon2-password-hash` zostaje przy D-106 i wypada z *Verification* D-113 (zob. D-113).
   6. `nature-energy-range` — *Derives from* dostaje D-377 (D-176 nie: ustala tylko wartość startową i nie wymienia niezmiennika).
   7. `account-message-limits` — „or three for the same email address” → „or three for the same account” (kod liczy na konto, `database.ts:474-486`; D-161).
   8. `password-reset-verified-email` — usunąć „is single-use and” (powtarza `password-reset-link`).
   9. `loop-run-knowledge` — usunąć „currently” (nie znaczy stanu przejściowego: D-249 nie podaje warunku ani zadania). To samo słowo w D-249 zostaje dla zadania „pierwsze porządki dziennika decyzji”, punkt 3.
   10. `terrain-drawing-numbers` — „The drawing of the game map” → „The drawing of the game map (the terrain drawing, not the scene)”.
   11. `account-server-occupied-address` — *Derives from* „D-111” zamiast „recovered from code — …”; D-111 *Verification* dostaje `account-server-occupied-address` (zob. D-111).
   12. `player-opaque-session-cookie` — nazwać prefiks `__Host-` (`account-routes.ts:38` `"__Host-loop2.sid"`).
   13. `sprite-credits` — dopisać, że paczkę każdego pliku nazywa lista plików obrazków w `README.md`; w `README.md` (punkt 2 listy obrazków) dopisać brakujące pliki: `mage-bend` i `fire-small` pod Pixel Crawler, `wolf-*` pod LPC Wolf, `dust` pod Smoke & Fire.
   14. + `trip-plan-progress` (`invariants.md:980`) — „defeated-attack count” → „count of beaten attacks” (jedno słowo słownika, `beaten attack`).
   15. + `account-server-runtime` (`invariants.md:7`) — „TypeScript source and deployment” → „TypeScript source and its container image”; `player-argon2-deployment-check` (`invariants.md:650`) — „its 512 MiB deployment limit” → „the 512 MiB memory limit `compose.yaml` gives the application container” (słownik: `deployment` to czynność, nie działająca rzecz).
3. Słownik (`foundations/glossary.md`):
   1. `test server` — usunąć „once the game has them”.
   2. `chronicle` — „the record a manual map run keeps” → „the record the page keeps of a manual map run for the player to read” (D-339); w *Not* „which no map run keeps” → „which nothing keeps”.
   3. `Understanding` — „…creatures and branches that the player has discovered” → „…creatures and character skill trees, each with all its branches (D-195), that the player has discovered” (`types.ts:161` `trees: SkillId[]`).
   4. `combat turn` — „each side has one action” → „each side has at most one action, the character none when it finds no feasible combat rule (D-146)” (`combat.ts:85-87`).
   5. `copy`, `beaten attack`, `deployment` — hasła trzymają (odczyt kodu); poprawki idą do zdań, które słowa używają (punkty 2.14, 2.15 i 7.10).
   6. Nowe hasło `reading` (loop2#77-12): „A reading is one pass of the browser view in which it reads the browser's clock, passes the real time elapsed to the simulation where game time runs, and draws the screen from the game state it then holds, the previous reading being the pass before it.”; *Not*: „a command's output that an environment fact's Source quotes — "reading:"”.
4. Mapa części (`foundations/part_map.md`):
   1. `deployment` — „builds the application into the loop2 container” → „builds the application into the loop2 container and the image of the Cloudflare tunnel in front of it” (`deploy/cloudflared.Dockerfile`).
   2. `simulation` — dopisać „and holds the game's data, the pictures of its scene and the words that name the game included” (`data/scene.ts`, `data/about.ts` czyta tylko widok).
   3. `build-tools` — *Trust boundary* `/package-lock.json`, jak w *Files*.
   4. `foundations/part_map.md:89` i `:156` — „owner” o osobie prowadzącej serwer → „operator” (jak w decyzjach po loop2#137); „telling the owner” czytelnik weźmie za rolę właściciela konta (loop2#137, „Fix or let through” 1, poza zakresem 1; dopisane przez doradcę dnia 2026-11-16).
5. Fakty środowiska (`foundations/environment_facts.md`); cytat zawsze przepisany ze źródła, nie z przeglądu:
   1. Fakty z wersją Node (`:362`, `:530` — 24.21.0; `:578` — 24.17.0) — zdanie mówi o linii 24 („Node.js 24, as its 24.21.0 documentation says, …”), dokładne wydanie zostaje w *Source* jako przeczytane; obraz `node:24-slim` jest nieprzypięty (D-237), a dziś zbudowany ma 24.22.x.
   2. `password-hash-work-factor` — adres „§ Recommendations” → „§ Introduction, the summary of recommendations”.
   3. `compose-file-secret-permissions` — cytat do końca: „…when the secret source of the secret is a [`file`](09-secrets.md), as bind-mount used under the hood doesn't allow uid remapping.”
   4. `cloudflare-tunnel-transport` — adres „§ Overview” → wstęp strony przed „## How it works” (strona nie ma nagłówka „Overview”).
   5. `express-session-end-of-request` — „calls the Store's `touch`” → „calls the Store's `touch`, when the Store implements it” (`storeImplementsTouch`).
   6. `docker-compose-down-volumes` — dopisać trzecią pozycję listy „The default network, if one is used.” (bez skutku dla wolumenów).
   7. `nodemailer-require-tls` — „whether or not the server announces it” → „on a connection not already secure, whether or not the server announces it”.
   8. `npm-lock-peer-dependencies` — npm przepisuje `peerDependencies` tylko przy niepustym polu (`shrinkwrap.js`, `metaFieldFromPkg`).
   9. `pixel-crawler-terms` — „ask for no credit” → „ask for no credit except where the project has a saxophone solo” (punkt 5).
   10. `playwright-cli-sessions-per-workspace` (loop2#74-10) — dopisać do cytatu `loadEntry` i `clientKey` z `registry.js`.
   11. `docker-volume-prune-scope` (loop2#72-16) — „lists a named volume” → „lists a volume called `my-named-vol`”.
6. Wytyczne:
   1. `guidelines/styleguide-browser-view.md` (loop2#62-11), reguła States of shared controls — zdanie „Formularz stawia pod swoim przyciskiem jedno zdanie w `warning` …” dopuszcza na karcie logowania po błędzie, którego nie obsłużył żaden kod gry, drugie zdanie w `warning`, „Coś w grze się zepsuło — odśwież stronę.” (D-323); lista *Decision* tej reguły dostaje D-323.
   2. `guidelines/styleguide-browser-view.md` (loop2#84-7) — „z dwoma rodzajami dołożonymi później: grubością belki i linii zakładki (2026-11-02) oraz wyglądem sceny (2026-11-11):” → „z trzema rodzajami dołożonymi później: grubością belki i linii zakładki (2026-11-02), wyglądem sceny (2026-11-11) oraz kolorami trzech chwil sceny (2026-11-12):”.
   3. `guidelines/testing.md:14-16` (loop2#85-5) — zgodnie z D-82: odstępstwo jest jedno, w sprawie komentarza nazywającego źródło wartości; ocena człowieka, którą szablon wskazywał komentarzem, wchodzi przez decyzję fundamentu.
   4. + `guidelines/testing.md:319-324` — to samo zdanie o plikach Pythona co D-83 (zob. D-83), zmienione razem z nim.
7. Komentarze i opisy testów (bez znaczników `invariant:` — niesie je zadanie luk w testach):
   1. loop2#85-17 — odsyłacze do numerów linii plików fundamentu w `tests/` zamienione na numery decyzji albo nazwy niezmienników: `tests/sim/combat.test.mjs:184` i `:222` (D-23, D-144); `tests/sim/encounters.test.mjs:415`, `:624`, `:727` (wiersz usunąć — komentarz tuż wyżej nazywa D-118, D-119, D-143, `minute-span-split`, D-144); `:762` (D-22; `map-run-repeatability`, `restart-seed` po nazwie); `tests/sim/program-counts.test.mjs:17` (D-92, D-93).
   2. loop2#80-3 — `tests/view/headquarters-screen.test.mjs:773`: „lead to game-icons.net” → „lead outside the game”.
   3. `tests/invariants/test_action_in_progress.py` i `test_program_rule_pick.py` — docstring cytuje obecne brzmienie niezmiennika; to, czego test z niego nie sprawdza (przerwanie przez napaść; wybór przed czynnością w turze walki), stoi w „Does NOT cover”.
   4. `tests/invariants/test_copy_save.py:21-23` — przełączenie zeruje passę razem z pokonanymi napaściami i licznikami reguł (`programs.ts:744-760`).
   5. ~~`tests/invariants/test_player_map_run_pace.py:50-51` — śmierci nie prowadzi ten test; `minute-span-split` sprawdza śmierć przy podziale zakresu minut, nie tempo ani pauzę.~~ Przeniesione do a note of the author's backlog, które dopisuje do tego testu scenariusz śmierci (decyzja doradcy dnia w imieniu Mariusza, 2026-11-13).
   6. `tests/invariants/test_program_world_reference.py:22-24` — liczby porównujące zapas niosą `hereBelow` (na kafelku) i `itemBelow` (w plecaku); `COMPARES_STOCK` dostaje `"itemBelow"`, żeby opis i kod mówiły to samo (test dziś nie oferuje `itemBelow`, więc sprawdzenie nie słabnie dla żadnego przypadku).
   7. `tests/invariants/test_loop2_deploy_keeps_running.py:2` — „container” → „containers”.
   8. `tests/invariants/test_loop2_application_port.py:1` — docstring zaczyna się od „Invariant loop2-application-port: The application port is inaccessible from the Internet outside Cloudflare.”, potem zdanie o tym, że plik sprawdza stronę źródeł.
   9. + `tests/view/scene.test.mjs:2583-2585` — komentarz powtarza rachunek „312 ms” z D-316; idzie za nowym uzasadnieniem D-316.
   10. + `scripts/measure-passwords.mjs` (`:2`, `:6`, `:8`, `:23`, `:47`) — „the deployment's memory limit” → „the container's memory limit”; nazwa stałej `DEPLOYMENT_MEMORY_LIMIT` zostaje.
   11. `tests/deploy/test_loop2_backup.py:17` i `:119` — „operator” → „the human” (człowiek, który ustalił brzmienie powiadomienia jako autor produktu, nie osoba prowadząca serwer) (loop2#137, Minor N1; dopisane przez doradcę dnia 2026-11-16).
   12. `tests/sim/encounters.test.mjs:726` — dopisana linia komentarza powtarza jego pierwszą linię; usunąć (loop2#137, Minor N2; dopisane przez doradcę dnia 2026-11-16).
   13. Drobne uwagi z przeglądów korekty loop2#146 (opis PR-a https://github.com/mariusznazar/loop2/pull/146, „Minor findings” 2–9; dopisane przez doradcę dnia 2026-11-17): `src/browser/program-panel.css:44-46` — dwa komentarze nad `.copy-line`, drugi częściowo nieścisły; D-04 cytuje D-207 przy zdaniu o zapisie, a rozstrzyga je D-208; D-04 nie wymienia uprawnienia konta do poprzedniego zapisu (D-400), z którego Programy rysują przyciski pobrania i resetu; nowy akapit reguły o łamaniu wpisanej nazwy w `guidelines/styleguide-browser-view.md` wylicza dzisiejsze miejsca (szablon wytycznych zabrania stanu bieżącego, a lista pomija kronikę) — zostaje sama reguła; `tests/view/scene.test.mjs:1990` dostaje linię `decision: D-367`, a `tests/view/program-editor.test.mjs:1573` komentarz `decision:` (D-57); przykład „violates” D-367 mówi o scenie, która wraca po „✕”, nie o ekranie; *Verification* D-57 wymienia przecinek dziesiętny, którego zdanie D-57 nie mówi — zdanie D-57 dostaje przecinek dziesiętny (już tak robi kod, styleguide i test wiersza ciała); przykład D-367 koło linii 11309 — „are” albo dwukropek przed „over at once”.
   14. Uwagi z loop2#147 (opis PR-a https://github.com/mariusznazar/loop2/pull/147, pozycja 2 „Fix or let through” i „Minor findings” 1–4; dopisane przez doradcę dnia 2026-11-17): (a) hasło słownika `at the camp` — z *Not* znika „the screen Siedziba”, której to słowo nigdy nie znaczyło; (b) pas z obrazem u góry ekranu Siedziba dostaje nazwę bez gołego „camp” (np. „the picture band”), żeby „camp” znaczyło tylko miejsce postaci (reguła the way o słowie z dwoma znaczeniami) — D-389, komentarze `src/browser/view/camp.tsx` i nazwy testów idą za tym; nazwa pliku zostaje; (c) klauzula `tests:` D-208 mówi też, że ponowienie wysyła stan swojej chwili i że zdanie znika po udanym ponowieniu (`tests/view/game-saver.test.mjs:925-930`); (d) komentarz `tests/view/game-saver.test.mjs:857-859` idzie za tabelą (`extra`/`client` zamiast `breaks(), mend()`).
   15. Uwagi z loop2#150 (opis PR-a https://github.com/mariusznazar/loop2/pull/150, pozycja 3 „Fix or let through” i „Minor findings” 1–6; dopisane przez doradcę dnia 2026-11-17): (a) klauzula D-104 (`foundations/decisions.md:2594-2595`) mówi, że każdą ścieżkę zmieniającą stan wymienia przypadek sprawdzający jej strażników, a test sprawdza tylko, że ścieżka stoi na liście, którą sam trzyma (sześć wpisanych ręcznie) — zdanie mówi to, co test sprawdza; (b) klauzula D-271 (`foundations/decisions.md:4887-4888`) „assigned to the pack it comes from” — test sprawdza tylko, że plik ma przypisanie w tabeli, nie że jest trafne; zdanie idzie za tym; (c) linia `decision:` w `tests/invariants/account_container_support.py:128` stoi przy funkcji pomocniczej, nie przy teście — zamienić na zwykły komentarz nazywający decyzję; (d) `README.md:84` dalej mówi „one test of the default address” — idzie za nowym brzmieniem D-49 (jeden plik testów z przypadkiem dla każdego z dwóch startów); (e) `foundations/decisions.md:1059` — nazwa niezmiennika w nowym zdaniu D-49 bez znaczników kodu; (f) test `test_replaced_container_keeps_accounts_and_sessions` w `tests/deploy/test_account_storage.py` sprawdza teraz też zapisy gry — nazwa idzie za tym.
8. Strona dla recenzentów (`security-notes.md`):
   1. `security-notes.md:8` (punkt „GitHub account”) opisuje jedną regułę gałęzi `main`. Od 2026-11-16 jest druga, `main_tests`: wymaga przejścia sprawdzenia CI `tests` przed scaleniem i ma obejście dla roli administratora repozytorium (always). Zdanie ma ją wymienić i powiedzieć wprost, że obejście ma konto operatora, więc także agent pracujący na tym koncie — scalenie bez zielonego `tests` wymaga jawnego scalenia z uprawnieniem administratora; stara reguła `main` dalej nie ma obejścia (źródło: loop2#139; stan reguł z `gh api repos/mariusznazar/loop2/rulesets`, 2026-11-16; dopisane przez doradcę dnia 2026-11-16).

### Questions to settle

- Uwaga loop2#85-17 (odsyłacze testów do numerów linii `decisions.md`) — w tym zadaniu czy w zadaniu „pierwsze porządki dziennika decyzji” (punkt 4: testy wskazują zdania decyzji)?
  - Answer: w tym zadaniu — odsyłacze zamienione na numery decyzji albo nazwy niezmienników (To do 7.1).
  - Not chosen:
    - zostawić zadaniu „pierwsze porządki dziennika decyzji” — martwe odsyłacze stoją, póki tamten punkt czeka na dwa zadania the way
  - Source: Mariusz przez doradcę dnia, 2026-11-13: „1 a”
- Czy brzmienia, które agent wybrał tam, gdzie przegląd zostawił dwa kierunki albo „rozważyć/uzgodnić”, są przyjęte?
  - Answer: tak, wszystkie; stoją w To do i w *Decisions in play*.
  - Not chosen:
    - zostawić kierunki otwarte — cykl wybrałby je sam, bez człowieka
  - Source: Mariusz przez doradcę dnia, 2026-11-13: „2 tak (wszystkie brzmienia ◆ przyjęte)”
- Uwaga loop2#80-2 („the old Loop” obok „predecessor game”) — w tym zadaniu czy w zadaniu, które niesie F-38 (hasło słownika dla poprzedniej gry)?
  - Answer: w zadaniu, które niesie F-38 (loop2: zmiany decyzji o grze i ekranach z przeglądu fundamentu); tutaj „the old Loop” zostaje.
  - Not chosen:
    - zamienić tutaj 9 wystąpień na „the predecessor game” — ryzyko drugiej poprawki, gdy hasło z F-38 ustali inną nazwę
  - Source: Mariusz przez doradcę dnia, 2026-11-13: „3 b”; the note of the review of the foundation of 13 November, sekcja 4, „Do rozważenia”, i F-38 (źródła: loop2#80-2)
- Wiersze słownika „do rozstrzygnięcia przy doprecyzowaniu” (R7a–e) — które hasła przeczą kodowi?
  - Answer: `Understanding` i `combat turn` przeczą kodowi; `copy`, `beaten attack`, `deployment` trzymają, a rozjazd siedzi w zdaniach, które ich używają (To do 2.14, 2.15, 7.10).
  - Source: kod przy `fc00c406`: `src/browser/sim/types.ts:161` `trees: SkillId[];`; `src/browser/sim/combat.ts:85-87` `if (!rule) { exchanges.push({ creatureAction: creatureRecord, characterAction: null }); continue; }`; `src/browser/sim/types.ts:345`, `src/browser/sim/loop.ts:157`; `src/browser/sim/run.ts:712-713`; `invariants.md:7`, `:650`, `:980`.

## Context

- Dane przeglądu: the note of the review of the foundation of 13 November — sekcja 4, G-7, F-10, F-23, F-36, F-37; numery linii tam są ze sprawdzanego commitu `1b0c8ad4`.
- Każdy wiersz sprawdzono 13.11.2026 na `main` przy `fc00c406` (po scaleniu PR #88): żaden nie jest naprawiony; numery linii w tym dokumencie są z `fc00c406`.
- Zadanie 25 (PR #88) przepisało część D-44, D-189 i D-207, ale nie poprawiło zdań, które ten dokument zmienia.
- Znaczniki `invariant:` w testach (druga, trzecia i ostatnia pozycja „Opisy i znaczniki testów” przeglądu) niesie zadanie a note of the author's backlog (G-6, F-13).
- Hasło słownika dla poprzedniej gry „loop” i skróty „the loop” → „the earning loop” niesie loop2: zmiany decyzji o grze i ekranach z przeglądu fundamentu (F-38).
- Słowa „currently/today/for now” w zdaniach wiążących decyzji niesie a note of the author's backlog, punkt 3.
- `guidelines/testing.md:95-104` pozwala komentarzowi testu wskazać tylko fundament (D-82), więc numer decyzji w komentarzu jest dozwolony.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

Zmieniane (cytat obecnego brzmienia przy `fc00c406` → zmiana):

- **D-03** (`decisions.md:41`): „The browser view is built in TypeScript with React, its screens written as `.tsx` components that draw from the game state, and no other UI framework stands in its code or its runtime dependencies.” → *Relations* dostaje „narrowed by D-265”, a zdanie wyjątek: „…draw from the game state, except a screen D-265 leaves in the browser's DOM APIs until a task moves it, and no other UI framework…”.
- **D-04** (`:67`): „**Verification:** invariants: simulation-isolation · simulation-inputs.” → dopisać `minute-span-split`.
- **D-17** (`:424`): „…its named database volume `loop2_accounts`, log and lock, and the build cache…” → „its logs and lock” (`deploy/loop2-deploy:38-39`).
- **D-28** (`:802`, `:808`): „session, saved-game and mail exemplars are selected with their first implementations”; „complies: general and four kind guidelines follow the pinned templates” → „the session, saved-game and mail exemplars were selected with their first implementations (D-115, D-213, D-162)”; „general and every kind guideline”.
- **D-44** (`:1038`): „…from the eight shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the secondary action (D-275), the select list, the number field, the text field and the pick cell — …” → „…from the shared controls of `src/browser/view/controls/` — the button in its kinds (the plain button, the destructive button, the button selected in its group, the secondary action (D-275), the tab (D-276), the main look outside a form (D-274) and the button in `positive`), the select list, the number field, the text field and the pick cell — …” (`button.ts:2-4`, siedem rodzajów).
- **D-46** (`:1068`): „…sets the chronicle and the clock of the map run in Geist Mono…” → „the chronicle, its entries in the end-of-run window included, and the clock…” (`styles.css:1712-1714`).
- **D-70** (`:1526`, *Rationale*): „The extinguished campfire's icon, like the other icons of the map, holds its colour in its file, and the scene of a map run already tells…” → „Both icons are drawn as masks in `text-strong`, like the other icons of the map (D-43), so the two states differ by shape, and the scene of a map run already tells…” (F-36).
- **D-83** (`:1695`, `:1703`): „…and a new `test_*.py` file is counted as covered by the gate only after its execution there is verified.”; *Rationale* „one small test guards the inclusion” → gałąź Pythona: runner bramki `.the-way/gate/run_tests.py` uruchamia każdy katalog ze śledzonym przez git `test_*.py`, więc nowy plik Pythona biegnie, gdy git go śledzi; ręczny wybór plików i jego test (`tests/quality/test_node_test_selection.py`) zostają dla Node.
- **D-84** (`:1708`, `:1714`): „The HTTP helper in `tests/http.test.mjs` takes these waiting and cleanup rules when that helper changes.” → „…keeps these waiting and cleanup rules.” (zrobione w `8d2dff33`); + to samo w *Rationale* („…so the rules left the helper to take them at its next change”).
- **D-85** (`:1729`, *Rationale*): „…when the case was chosen, the HTTP helper limited idleness, not the whole operation, and the wait for listening had no limit; …” → usunąć ten powód historyczny; zostaje, że wybór nie zatwierdza całego pliku ani pomocników.
- **D-103** (`:2043`, `:2048`): „One bounded gate without a waiting queue covers password hashing and verification”; *Verification* „invariants: account-attempt-limits · account-attempt-tracking.” → „One bounded admission gate …”; *Verification* dostaje `password-operation-gate`.
- **D-105** (`:2071`): „…and at most three per email address per hour.” → „…(per account, whose address never changes, D-159).”
- **D-108** (`:2117`): „**Verification:** invariants: loop2-shared-public-origin.” → dopisać `account-client-requests`.
- **D-111** (`:2158`): „**Verification:** invariants: account-server-default-address · account-startup-configuration.” → dopisać `account-server-occupied-address`.
- **D-113** (`:2171`): „**Verification:** invariants: password-operation-gate · player-argon2-password-hash · player-argon2-deployment-check.” → bez `player-argon2-password-hash` (ten wywodzi się tylko z D-106).
- **D-119** (`:2311`, *Rationale*): „…a fresh character cannot carry out „Obchód” or „Zawierucha”, for which it has not paid with a single execution. A branch of another character's tree reads „nie dla tej postaci” and not a promise „wykup ją”, because that character has no way to reach it.” → „…a fresh character cannot carry out „Obchód”, for which it has not paid with a single execution.”; zdanie o „nie dla tej postaci” usunięte (F-37; żadna decyzja ani kod go nie planuje).
- **D-161** (`:3254`, *Rationale*): „the count reads at most a day of messages” → „the table holds at most about a day of messages, and the count reads the last hour of them”.
- **D-170** (`:3384`): „…on the select list „Program: {name}” at that character…” → „…on the select list beside the label „Program:”, whose options are the names of the player's programs, at that character…” („Program: {imię postaci}” to etykieta dostępności, `maps-screen.tsx:305-307`).
- **D-179** (`:3561`): „**Verification:** invariants: trip-transfer. …” → dopisać `trip-run-end`.
- **D-185** (`:3638`): „„Do skrzynki: {item} {count}, …”” → „„Do skrzynki: {item} {count}, ….”” (`trip-lines.ts:84`).
- **D-189** (`:3690`, `:3700`): „…and the list of maps marks it as not predicting the earning loop when the chest lacks that equipment.”; *Rationale* „the mark on the list of maps shows the one price of that” → „…and the card of a map marks it under „Wejdź” as not predicting the earning loop when the chest lacks that equipment (D-251).”; + w *Rationale* „the mark under „Wejdź””. Wybór człowieka (F-23, wariant a, 2026-11-13).
- **D-207** (`:4014-4017`): „…right after each change of it the player makes — an edit of a program or of the copy, an act on the list of programs, … a pause and a pace — …” → „…right after each change of it the player makes — among them an edit of a program or of the copy, …, a pause and a pace — …” (kod zapisuje po każdej zmianie jedną drogą, `game-view.ts:264-267`).
- **D-218** (`:4377-4378`): „The headquarters shows „pokolenie {n}” beside a character's name…” → „The headquarters and the screen Postać show…” (`character-screen.tsx:73`, `:94`).
- **D-220** (`:4424`): „*Rejected:* the tests of loop taken as material.” → „*Rejected:* the tests of loop taken only as material, from which each behaviour would be chosen anew.”
- **D-231** (`:4768-4769`): „…and is run only by a human or the installed backup script.” → „…and is run only by the installed backup script, which its schedule or a human starts.” Wybór człowieka (wariant a, 2026-11-13: człowiek uruchamia skrypt, nie samo polecenie; `backup_and_restore.md:41-42`).
- **D-232** (`:4824-4825`, `:4832`): „The plain database exists on the host only in that pipe, and the backup is not compressed.”; *Verification* „violates: a plain database file on the host's disk on its way to the encryption” → „Outside the container's writable layer of D-231, the plain database exists on the host only in that pipe; a run whose command cannot remove its temporary copy, or that a signal kills, leaves that plain copy in the container's `/tmp` until the next deployment replaces the container, one copy for each such run, and the backup is not compressed.”; *Verification* „violates: a plain database file written by the script on the host's disk on its way to the encryption”. Wybór człowieka (2026-11-13, z nazwaniem pozostałości po nieudanym sprzątaniu, loop2#72-24); warunki z `src/server/account-backup.ts:15-22`, `:118-127`.
- **D-236** (`:4951-4953`, `:4959`): „…above any page count the database can reach.” → „…above any page count a database of this server can reach” (`database.ts:162-163`); + to samo w *Verification* „complies”.
- **D-253** (`:5542-5544`): „`account-database-check`, `measure-passwords`, `deploy/loop2-backup` and `scripts/restore-trial.mjs` already have…” → `src/server/measure-passwords.ts`; `deploy/loop2-watch` dopisany przed `deploy/loop2-backup`, żeby „the last two” dalej znaczyło kopię i próbę odtworzenia.
- **D-255** (`:5705`, *Rejected*): „and the owner has a save without these states” → „the owner's save then held none of these states”.
- **D-262** (`:5855`): „Nothing stands on the screen of the login card but the card, not even the header.” → „… but the card over the picture of D-272, not even the header.”
- **D-271** (`:6254-6255`, *Rejected*): „hand pixel work whose look is judged only at the request” → „…only once it is made” (jak *Rationale* `:6235-6236`).
- **D-278** (`:6473-6474`, *Rationale*): „…and the card with its credits unfolded ends at 682 px.” → usunąć tę liczbę (sekcja zasług urosła; zdanie wiążące jej nie potrzebuje).
- **D-280** (`:6516-6517`): „…in at most three clicks: the choice of a map, the map's row and „Wejdź”.” → „…the item „Mapy” of the menu bar, the map's row and „Wejdź”.”
- **D-310** (`:7342-7344`): „…the one of combat comes first, then the world and the backpack, and the nature energy last.” → dopisać „and a branch the character did not buy after them” (`program.ts:287-288`).
- **D-311** (`:7379-7382`): „„Pauza” or „Wznów”, the pace, „Restart”, the warning of a cut trip plan and „Zakończ”, and after the end of the map run „Koniec przejścia”, …”; „that window (D-368) stands over this screen, its header included” → „Koniec przejścia” przed „Restart” (D-371, `run-header.tsx:4-5`); „stands in place of this screen, its header included (D-370)”.
- **D-316** (`:7730-7732`, *Rationale*; `:7756-7758`, *Rejected*): „At 16× the combat is decided 312 ms after the attack, so a death can come within the 300 ms of the run, …”; „— it does not meet the scope of the project, which says the wolf runs in;” → „The view reads the game every 200 ms, so the reading that shows a combat decided, 312.5 ms after the attack at 16×, can come 200 ms after the reading that showed the attack, and a completion can come in any earlier minute of the combat; a death or a completion can thus fall within the 300 ms of the run, and a scene that then stands still for good would hold the creature on its way; it stands beside the mage instead.” (F-10; `clock.ts:60`, `balance.ts:5`, `:19`, `scene.tsx:835`); *Rejected* „— the player would not see where the creature came from;”. Zdanie wiążące i *Verification* zostają.
- **D-317** (`:7822-7823`, `:7843`): „One whose turn has passed would show something that is no longer so;”; ostatnia pozycja *Rejected* bez kropki → „An effect whose turn has passed …”; kropka.
- **D-322** (`:7970`, `:7995-7996`): „…so a scene drawn again on the same moment, after a return to the screen, a reload or a load, and a scene under the system's setting for reduced motion show the last image of the effect at once (D-317, D-319).”; *Rationale* „…which loop avoided on purpose.” → dwa zdania: pierwsze o scenie narysowanej ponownie (D-319), drugie „A scene under the system's setting for reduced motion shows the last image at once too (D-317).”; *Rationale* „…, so only the effect of a moment moves, once and for less than three seconds.” (`styles.css:2437-2443`: od 960 ms do ok. 2,7 s).
- **D-335** (`:8259`): „„Zasil — Ognisko”” → „„Zasil — ognisko”” (`actions.ts:146`).
- **D-342** (`:8497-8498`): „the same for rule groups, such as „Dodano grupę „Ogień””” → „…and for rule groups „Dodano grupę „Ogień””, „Usunięto grupę „…””, „Zmieniono grupę „…”” and „Przesunięto grupę „…””, with no numbers” (`chronicle-entries.ts:237-251`).
- **D-347** (`:8688`): „a tab left overnight may slow down under a growing chronicle.” → „…, though D-382 bounds the rows drawn, so the risk is left to the memory the chronicle takes.”
- **D-355** (`:8964`, *Rationale*): „…except two things nobody has checked, that `logrotate` runs daily there and which release of Compose the server has, …” → „…except the file and its owner, which a human creates, and the release of Compose the server has, which nobody has checked; the `local` driver and the rotation give … an upper bound, the rotation's bound by size only where `logrotate` runs daily there, which nobody has checked either.”
- **D-356** (`:8979`, *Rationale*): „the test gate would refuse a new workflow file, since it counts every file in the folder of workflows as a route of deployment;”; „and without it a flood past the limit would look like a quiet hour.” → pierwsze usunąć (plik i test są, `test_account_server_typecheck.py:80-82`); „…would leave the same thirty lines as a flood of thirty.”
- **D-358** (`:9009-9010`): „*Rejected:* unknown” → „*Rejected:* a hand-over of the screenshot to the human to upload — it would put a step of the human into every cycle that shows a screen.”, przeniesione z *Rationale*.
- **D-363** (`:9084`, *Rationale*): „…only where the result is better, never worse (D-311);” → bez „(D-311)” (D-311 ustala tę regułę tylko dla ekranu przejścia).
- **D-368** (`:9159`, *Accepted with it*): „the keyboard, Escape and the return to the window are to build;” → usunąć (zbudowane, D-370, D-371).
- **D-373** (`:9263`): „20 minutes is what one stick adds to a burning fire” → dopisać „without the branch „Oszczędne dorzucanie” (D-379)”.
- **D-380** (`:9374`, `:9380`): *Relations* „derives from D-308 · derives from D-310”; *Rationale* „the words of each refusal are fixed once, for every refusal of the game's check, in the form D-310 gives — …” → *Relations* dostaje „derives from D-309”; *Rationale* „…in the form D-310 gives — … — here, and those of combat, „tylko w walce” and „trwa walka”, in D-309, …”. Wybór człowieka (wariant a, 2026-11-13).
- **D-384** (`:9440`): „it is also the last of the programs D-170 offers to a character.” → „it is also the last fallback of the order D-170 gives the list „Program:”.”

Czytane, bez zmiany (zdania, z którymi poprawki się zgadzają): D-43 (ikony jako maski), D-82 (źródło oczekiwania testu), D-106 (Argon2), D-146 (tura walki), D-159 (adres się nie zmienia), D-164 (kopia pętli), D-195 (drzewo w Rozumieniu), D-237 (obraz Node nieprzypięty), D-249 („currently” — zadanie z linii 61), D-251 (znak pod „Wejdź”), D-265 (ekrany DOM), D-272 (obrazek pod kartą), D-274, D-276 (rodzaje przycisku), D-309 (odmowy walki), D-323 (zdanie o awarii na karcie logowania), D-339 (kronika w pamięci strony), D-370, D-371 (okno końca), D-377 (górna granica energii natury), D-379 (Oszczędne dorzucanie), D-382 (wiersze kroniki).

## Settlements to record

Candidates: 2 shown, 0 accepted — 2026-11-13

none

## Out of scope

- Zmiany zachowania gry i zmiany tego, co wpisy wiążą, poza trzema wyborami człowieka (D-231, D-232, D-380).
- Znaczniki `invariant:` w testach (zadanie luk w testach).
- Zmiana nazwy stałej `DEPLOYMENT_MEMORY_LIMIT`.
