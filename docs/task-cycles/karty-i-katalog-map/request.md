**State: ready** — the change is complete and checked; seven things below wait for your yes (the first lines of "For you to decide").

## What you will see

The game gets a new screen, **Mapy**, between "Siedziba" and "Programy" in the menu bar. On the left it lists the maps you can send a character to; before you pick one, the right side says "Wybierz mapę z listy.". Pick a map and its card shows what the map asks of you (the sentence of its solving condition), its terrain (grid, entrance, step, and how many minutes a body lasts without fire), what lies there (each resource with how many of the tiles are expected to hold it and when it renews), what lurks there (the wolf's health and strike, and how often it attacks) and, only where a map sets one, what it limits. Nothing is hidden because you have not met it yet. A solved map says "rozwiązana" in green.

Under the card, "Kto idzie" lists every character of the team, each with its resurrection line, its earning loop (with "Zatrzymaj") when it has one, the "Program:" list, what will go in from the trip plan ("Wejdzie: …"), a warning when the map cuts the plan, and the two buttons: **"Wejdź"** (opens the map run, with the strong look of a main button) and, on a solved map, **"Puść w pętlę"** (stays on the card). When the list "Wynieś" of the chosen program is empty, "Pętla nic nie zarobi do skrzynki" stands beside "Puść w pętlę" and the button still works. A player with one character gets from Siedziba to a first map run in three clicks: "Mapy", the row of the map, "Wejdź". The addresses are `#/mapy` and `#/mapy/{map}`; a reload stays on the same screen and map.

**Siedziba** no longer sends anyone: the program list, the "Mapa: …" lines, "Wyślij" and the map-condition sentences are gone from it. It keeps the report of your absence, the team (name link, generation, archetype, resurrection, loop), founding a character, and the chest. It is now drawn with React, like the other new screens.

I used the screens in a real browser while making it (menu, the three clicks, the focus after each button, the two areas side by side and, under 720 px, one under the other, reload on a map address, the loop started and stopped); the screenshots were taken during the checks and are not attached here.

### Underneath

The numbers on the card are counted by the game's simulation from the maps' data and only written out by the screen, so a change of balance changes the card by itself. The shared button gained a "main" kind so that "Wejdź" can look like a main button without being a form button.

## For you to decide

1. A decision the cycle added that you have not seen: the card's numbers are counted by the simulation, not by the screen, and "usual step" (the dopisek "drożej niż zwykle" / "taniej niż zwykle" appears when a map's step differs from it) means the step most maps' data give, the first one in the data's order on a tie. No map shows the dopisek today. Accept it? (Foundation entries, 1.)
2. The reasoning of one approved decision, the one about when a new map is offered, says that the end of a map run names the way to the next map. That comes with a later task and is not true in the game yet. It was written as approved. Merge as it stands?
3. The coding guidelines now carry rows for the new files, and the old Siedziba file gone; their "copy" or "do not copy" statuses (which file a later author may use as a model) were set without a rule in the task. Accept the statuses? (Minor findings, 1.)
4. This request also moves the process the repository follows (the pinned version of the process folder) to the newest published version, on your instruction at the start of the session, as its first commit. It changed no file besides the pointer, and the full test run passes on it. Merge it together with the change?
5. Choices the cycle made that you will see: the list is a narrower column and the card a wider one (one column under 720 px); after "Puść w pętlę" the keyboard focus goes to "Zatrzymaj" and after "Zatrzymaj" to "Wejdź"; the chance of an attack is written with at most one decimal ("1 %"); the card's heading joins its marks with a dot ("Las — głębiej · odsłania ją Las"). Accept them? (Course of the cycle, Choices.)
6. The change leaves an inconsistency in earlier approved text to the task that owns it (task 25): two decisions about "Zatrzymaj" and the report after your absence, and one about the list of maps marking a rehearsal the loop cannot repeat, still describe the old places. Merge without correcting them here?
7. Two small wording points were left unfixed on purpose and you may want them fixed now: the card's heading separator has no look rule in the style guide yet, and the comments in the card's code point to the decision that was split in two. Fix them in this request, or make a task of it? (Minor findings, 2 and 3.)

## Cost

About 2 h 53 min of working time over 35 stages (the table is in the record, `stages.md`), 16 subagents: the planner and the reviewer of the whole change on the strongest model; the foundation entries, four slices, the fix, the return step and its review on the middle one; and six slices on the cheapest (the rest of the work was the orchestrator's). About 212 million tokens counted, nearly all of them cached input. The review of the whole change failed once (two blocking findings); one fix and one review of the fix followed, which passed.

## How to merge

Merge with "Create a merge commit": the link to the record of the cycle survives only if the commits are kept. The foundation has waited for a review through 61 merges since the start of the history (no review tag yet; the limit is 30); the review is the skill `the-way-review-foundation`, started in a session in this repository. Nothing in this request waits for it.

<details>
<summary>W języku zadania (po polsku)</summary>

**Stan: gotowe** — zmiana jest kompletna i sprawdzona; siedem rzeczy poniżej czeka na Twoje „tak”.

**Co zobaczysz.** W grze jest nowy ekran **Mapy**, w pasku menu między „Siedziba” a „Programy”. Po lewej stoi lista map, na które można wysłać postać; zanim wybierzesz mapę, po prawej jest zdanie „Wybierz mapę z listy.”. Karta wybranej mapy mówi, czego mapa wymaga (zdanie warunku), jaki jest teren (siatka, wejście, krok i na ile minut starcza ciała bez ognia), co tam leży (każdy zasób z tym, ile kafelków go ma i kiedy się odnawia), co tam czyha (zdrowie i cios wilka, jak często napada) i, tylko gdy mapa ma pułap, co odbiera. Nic nie jest ukryte dlatego, że jeszcze tego nie spotkałeś. Mapa rozwiązana ma „rozwiązana” na zielono.

Pod kartą „Kto idzie” pokazuje każdą postać drużyny: wiersz wskrzeszenia, pętlę zarobkową z „Zatrzymaj”, listę „Program:”, to, co wejdzie z planu wyprawy („Wejdzie: …”), ostrzeżenie o przyciętym planie i dwa przyciski: **„Wejdź”** (otwiera przejście, z głównym wyglądem przycisku) oraz, na mapie rozwiązanej, **„Puść w pętlę”** (zostajesz na karcie). Gdy lista „Wynieś” wybranego programu jest pusta, obok „Puść w pętlę” stoi „Pętla nic nie zarobi do skrzynki”, a przycisk dalej działa. Gracz z jedną postacią dochodzi z Siedziby do pierwszego przejścia w trzech kliknięciach: „Mapy”, wiersz mapy, „Wejdź”. Adresy to `#/mapy` i `#/mapy/{map}`; odświeżenie zostaje na tym samym ekranie i tej samej mapie.

**Siedziba** już nikogo nie wysyła: zniknęły z niej lista programów, linie „Mapa: …”, „Wyślij” i zdania warunków map. Zostały raport z nieobecności, drużyna, zakładanie postaci i skrzynka. Jest teraz rysowana w React, jak inne nowe ekrany.

Podczas pracy używałem ekranów w prawdziwej przeglądarce (menu, trzy kliknięcia, fokus po każdym przycisku, dwa obszary obok siebie i pod 720 px jeden pod drugim, odświeżenie na adresie mapy, start i zatrzymanie pętli); zrzuty ekranu powstały przy sprawdzaniu i nie są tu załączone.

**Pod spodem.** Liczby na karcie liczy symulacja gry z danych map, a ekran tylko je zapisuje, więc zmiana wyważenia sama zmienia kartę. Wspólny przycisk dostał rodzaj „główny”, żeby „Wejdź” mógł wyglądać jak główny przycisk, choć nie wysyła formularza.

**Do rozstrzygnięcia.**

1. Decyzja dodana przez cykl, której nie widziałeś: liczby karty liczy symulacja, nie ekran, a „krok zwykły” (dopisek „drożej niż zwykle” / „taniej niż zwykle” pojawia się, gdy krok mapy jest inny) to krok, który mają najczęściej mapy w danych, a przy remisie pierwszy w kolejności danych. Dziś żadna mapa nie ma dopisku. Przyjąć? (Foundation entries, 1.)
2. Uzasadnienie jednej zatwierdzonej decyzji, o tym, kiedy gra pokazuje nową mapę, mówi, że koniec przejścia wskazuje drogę do następnej mapy. To przyjdzie z późniejszym zadaniem i w grze jeszcze nie jest prawdą. Zapisane tak, jak zatwierdzono. Scalić tak, jak stoi?
3. Wytyczne kodu mają teraz wiersze dla nowych plików, a bez starego pliku Siedziby; ich statusy „kopiuj” / „nie kopiuj” (który plik późniejszy autor może brać za wzór) ustawiono bez reguły w zadaniu. Przyjąć statusy? (Minor findings, 1.)
4. To żądanie przesuwa też proces, według którego pracuje repozytorium (przypięta wersja katalogu procesu), na najnowszą opublikowaną, na Twoje polecenie na początku sesji, jako pierwszy commit. Zmienił tylko wskaźnik, a pełny przebieg testów na nim przechodzi. Scalić razem ze zmianą?
5. Wybory cyklu, które zobaczysz: lista jest węższą kolumną, a karta szerszą (pod 720 px jedna kolumna); po „Puść w pętlę” fokus klawiatury idzie na „Zatrzymaj”, a po „Zatrzymaj” na „Wejdź”; szansa napaści ma najwyżej jedno miejsce po przecinku („1 %”); nagłówek karty łączy oznaczenia kropką („Las — głębiej · odsłania ją Las”). Przyjąć? (Course of the cycle, Choices.)
6. Zmiana zostawia niezgodność we wcześniej zatwierdzonym tekście zadaniu, które nią zarządza (zadanie 25): dwie decyzje o „Zatrzymaj” i o raporcie po nieobecności oraz jedna o liście map zaznaczającej próbę, której pętla nie powtórzy, opisują jeszcze stare miejsca. Scalić bez poprawiania ich tutaj?
7. Dwa drobne słowne punkty zostawiono celowo niepoprawione i możesz chcieć poprawić je teraz: separator nagłówka karty nie ma jeszcze reguły wyglądu w przewodniku stylu, a komentarze w kodzie karty wskazują decyzję, którą rozdzielono na dwie. Poprawić w tym żądaniu, czy zrobić z tego zadanie? (Minor findings, 2 i 3.)

**Koszt.** Około 2 godz. 53 min pracy w 35 etapach (tabela w rekordzie, `stages.md`), 16 subagentów: planista i recenzent całości na najmocniejszym modelu; wpisy fundamentu, cztery wycinki, poprawka, krok powrotny i jego przegląd na średnim; sześć wycinków na najtańszym (resztę zrobił orkiestrator). Policzono około 212 mln tokenów, prawie całość to wejście z pamięci podręcznej. Przegląd całości raz nie przeszedł (dwie uwagi blokujące); była jedna poprawka i jeden przegląd poprawki, który przeszedł.

**Jak scalić.** Scal przez „Create a merge commit”: odnośnik do rekordu cyklu przetrwa tylko przy zachowanych commitach. Fundament czeka na przegląd od 61 scaleń od początku historii (brak jeszcze tagu przeglądu; próg to 30); przegląd to skill `the-way-review-foundation`, uruchamiany w sesji w tym repozytorium. Nic w tym żądaniu na niego nie czeka.

</details>

## Technical changes

The change is on the branch `task/karty-i-katalog-map`, 19 commits on top of `main` (`2136709`), in this order:

- `58d4849` — the pin of the process folder moved to `294af7f` (only the pointer changed).
- `afe5920`, `a76c4e5`, `23d42ab` — foundation entries: written before the code, corrected after the whole-change review (their reasons and rejected ways now come from the approved definition), and corrected by the return step.
- Slice 1 `ce5e865` (style guide of the screen Mapy, of the menu item and of the main look of "Wejdź"); slice 2 `45c9e7e`, `284641e` (the card's numbers in the simulation: `map-card.ts`; one function in the trip plan gives what a send takes, and the send and the line "Wejdzie: …" both use it); slice 3 `00b807c` (kind "main" of the shared button in its DOM and React forms, with a sample on the kitchen-sink page); slice 4 `57f8d25` (the pure lines of Siedziba move to `team-lines.ts` and `map-lines.ts`); slice 5 `ef77de7` (lines of the card and "Wejdzie: …"); slice 6 `6ef8213` (addresses); slice 7 `64d94de`, `ee2d0a2` (the screen Mapy in React); slice 8 `df293aa` (sending moves to Mapy: game wiring, menu item, removal of sending from Siedziba, page tests, the three-click case); slice 9 `d16b01d` (Siedziba in React); slice 10 `57f9578`, `f0f3b07` (coding guidelines, the `loop2-play` skill copies, README, comments of the simulation).
- The fix for the review of the whole change: `a76c4e5` (foundation entries), `3c9b2f3` (style guide: the stopped-loop line removed from "Kto idzie", the sentences on "Wejdź" and the run sentence), `c2a7853` (heading separator, step note returned apart instead of cut out by a regular expression, stale words about "Wyślij", a case for the screen Mapy after a halted game).
- Slice 9 changed two cases of the page test for Siedziba that asserted DOM-drawing details (a hidden "Zatrzymaj" in every row, and writes counted on the line's text); each case keeps the requirement it states. The reviewer judged it so.

## Checks

- The gate, `npm test` from the worktree root, on the final tree `23d42ab`: exit 0 — the Node tests, then 412 Python tests in 4 directories, every directory passed; its last step `python -B .the-way/elements/common/foundation_check.py`, `0 errors`. Nothing failed, and nothing was left unrun by it.
- On the base (`2136709`) the same command exited 1 only because the quality tools (`ruff`, `shellcheck`) were not installed in the new worktree; with `.runs/quality-venv` installed from the README the gate passes. On the pin commit `58d4849` it exits 0.
- Focused checks of every slice and of the fix exited 0 as their reports state (a case written first failed first, with the expected reason, where the plan asked for it); two quality-invariant runs failed once on formatting or an unused import and passed after the fix (slices 2, 5, 6 and 7).
- Reviewers also ran StrykerJS on `map-card.ts` and on the new function of the trip plan: 30 mutants killed, 7 timed out, none survived.
- User-interface states: the shared button's kind "main" (at rest, under the pointer, at focus, disabled) in a real browser on the kitchen-sink page (slice 3); the screen Mapy by tests before it was routed (slice 7) and in a real browser from slice 8 (the three clicks; the list, the card and "Kto idzie" with two characters, a loop, a warning and a rehearsal mark; the focus after each button; side by side at 1280 px and one under the other at 680 px; the reload; Siedziba without sending); Siedziba in React in a real browser without console errors (slice 9). Not reachable in the browser, covered by tests only: a clipped plan (no map has an entry cap), the sentence for a map run that waits, and a stopped loop on Mapy (absent by design). The screenshots are not attached.
- Form check of this description: `python -B .the-way/task-cycle/request_check.py docs/task-cycles/karty-i-katalog-map/request.md --task docs/task-cycles/karty-i-katalog-map/task.md` — see the last run in the record. Private-paths check of the description and of the copy of the record, and the remarks check on the original and on the copy: see the record, `Request handoff`.

## Foundation entries

1. D-333 — the card's numbers that follow a rule of the game are counted by simulation functions and the screen only writes them out; minutes without fire, tiles holding a resource, the mean gap between attacks and the usual step are defined (`the cycle's`, written by the return step; it carries the usual step moved out of D-327).
2. D-327 to D-332 (`row 1` to `row 6`) — the card of a map and its parts; the card shows everything whether discovered or not; the lines at each character in "Kto idzie"; the first of three clicks is "Mapy"; "Wybierz mapę z listy." and the row of the list; `{map}` is the map's identifier in the data. No row was already stated by an existing entry, so each became its own entry (row 6 is its own entry, D-332, with D-281 pointing to it).
3. D-325, D-326 (the two new projected entries, `projected`), D-53, D-134, D-149, D-165, D-170, D-180, D-188, D-243, D-251 (`projected`, written whole; their reasons and rejected ways follow the approved definition; D-251's reasons also keep true detail added by an earlier task, which differs from the definition's and predates this change); D-280, D-281, D-282, D-133 (`projected`, the part the code makes true); D-03 (`projected`, tied, unchanged).
4. D-287, D-274, D-217, D-244 (`the cycle's`, in the wording the task gives), D-55 and D-171 (examples of *Verification* corrected) — all written by the foundation step; D-169 *Rationale* and D-265 *Verification* corrected by the return step (`the cycle's`) because they named a Siedziba that had a program list or a section built in DOM.
5. Left on purpose: D-189, D-245 and D-246 (task 25 writes their change); no invariant, glossary entry, environment fact or part-map line was needed, and no invariant test, surface or Violated mark was changed (the new case in `tests/view/uncaught-failure.test.mjs` serves the existing invariant `uncaught-failure-game-state`). The *Origin* lines of the decision log name the approved definition file as the log has always done; the change adds 11 such lines.

## Minor findings

1. (Review of the whole change, M4, left open) `guidelines/coding-browser-module.md` and `guidelines/coding-simulation-module.md` — "the statuses `copy` of the new rows (`headquarters.tsx`, `map-lines.ts`, `maps-screen.tsx`, `team-lines.ts`, `map-card.ts`) and the change of `away-report.ts` from `do not copy` to `copy` are not settled by the task (To do 10 asks for the rows only); the template takes every status from the task's settlements. The request should name them for the human." The fix agent held that the cycle may not set them; they stand as the executor wrote them (for you to decide, item 3).
2. (Review of the fix, N2) "the styleguide gives no role for the new ' · ' separator in the card heading. The code draws it in `text-secondary`." (`guidelines/styleguide-browser-view.md`, rule of the screen Mapy; `src/browser/view/maps-screen.tsx`.)
3. (Review of the return step) the comments in `src/browser/sim/map-card.ts` (and `src/browser/view/map-lines.ts`) cite D-327 for definitions that now stand in D-333; "the citation is still true, and the code is outside this range" (no fix: a Minor finding of the return step is not fixed).
4. (Review of the fix, N1) "in the new `uncaught-failure` case, the check 'no earning loop took the button' proves nothing. The helper finds a disabled button too. The case still protects the invariant through 'no act started a save'." (`tests/view/uncaught-failure.test.mjs`.)

## Findings outside the task's scope

1. (M8) `src/browser/sim/map-card.ts:10-21` — "`minutesWithoutFire` steps minute by minute and runs at every draw of the card, the clock's readings included; for an ambient temperature just below 37 °C it could take hundreds of thousands of steps or more per draw. No map in the data comes near (83 and 33 steps). A closed form or a cap would remove it when such a map comes."
2. (M9) `guidelines/coding-browser-module.md` — "no row for `src/browser/view/end-question.tsx`, which the plan's notes gave to slice 10; slice 10 left it under WAY-200. The task's To do 10 asks only for the rows of the new files." (The file was not made by this task.)

## Course of the cycle

- **Task and sources:** the task "Ekran Mapy z listą otwartych map, kartą mapy i sekcją „Kto idzie”" (plan item 13 of the plan for the project MVP2 of loop2); its sources are the approved project definition (fingerprint 9641f804, read by the fix agent for the projected entries), the plan, and the foundation at `main` `2136709`. The task document is accepted by the human, 2026-11-07.
- **Process pin:** moved at the start of the cycle from `52889bc` to `294af7f` (the newest published) by the first commit `58d4849`, on the human's instruction at the session's start. The gate on that commit: exit 0, 412 tests, `0 errors`; no check fails there that passed on the base.
- **Spec:** none — the task leaves no open design choice (the four questions carried to the cycle were choices of how to make what the task settles).
- **Route:** planned slices (the change spans a new screen, the move of Siedziba to React, the simulation's numbers, two guideline files and many foundation entries; one agent cannot hold it).
- **Plan:** the plan of 10 slices after the foundation entries (`plan.md` in the record); every slice fits in the size check (largest: slice 8, about 215 thousand tokens to read). Classes: six slices on the cheapest model; slices 3, 7 and 9 raised to the middle one (they read 120–153 thousand tokens) and slice 8 on the middle one by the plan.
- **Choices:** the planner's choices C1–C15 and the other choices of the cycle are rows of the questions table in the record; the ones you will see are listed in "For you to decide", item 5.
- **Blocking findings left:** none. The review of the whole change returned two blocking findings (the style guide's stopped-loop line, and reasons and rejected ways of the projected entries that were not copied from the approved definition because the cycle's handoff had told the writer not to read it — a mistake of the orchestrator); both were fixed in one fix and the review of the fix passed.
- **Record:** pending — the link by the SHA of the commit that adds it.
