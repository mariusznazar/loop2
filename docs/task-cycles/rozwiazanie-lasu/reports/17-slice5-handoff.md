# Handoff — executor of slice 5, task `rozwiazanie-lasu`

## Delegation

The person who requested this cycle (the product's owner) has delegated every intermediate choice of
the cycle to its orchestrator. Send your questions to the orchestrator, never to the human; the
orchestrator's answers are not the human's approval.

## Where and how

- Worktree: `C:\Storage\repos\loop2-wt\rozwiazanie-lasu` — work from its root. Branch
  `task/rozwiazanie-lasu`. The-way is pinned at `3aee7d9` (moved by the branch's first commit
  `c0c51a0`).
- Method: `.the-way/task-cycle/change/SKILL.md`, read whole. Your variant: **a slice, or the retry
  of a slice** — read `slice.md` beside it when that row sends you there.
- Stage: the executor of slice 5 of the plan `.runs/task-cycles/rozwiazanie-lasu/plan.md`.
  Boundary: this slice. Make no other slice, and do not run the product's full gate (`npm test`
  without a file) — the orchestrator runs it.
- Commit on the branch by explicit paths (`git add <file>…`, never `-A` or `.`), messages in English
  in the repo's form (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`), and
  leave the worktree clean.
- Report path: `.runs/task-cycles/rozwiazanie-lasu/reports/17-slice5-report.md`
- Frozen task: `.runs/task-cycles/rozwiazanie-lasu/task.md`; reviewed spec:
  `.runs/task-cycles/rozwiazanie-lasu/spec.md`; plan: `.runs/task-cycles/rozwiazanie-lasu/plan.md`.

## Answers of step 4

- Trust boundary: no. Irreversible operation: no.

## Your slice — the plan's section, word for word

### Slice 5 — a completion ends the map run and solves its map

- **Goal:** `MapRun` gains `completion`, null until the map run completes and then an object
  holding the game minute of the completion, beside `death`. One exported predicate of the
  simulation says a map run has ended — it has a death or a completion — and every place of the
  simulation that reads `run.death` to mean "ended" uses it: `passRealTime`, `advanceMinutes`,
  `minuteBeforePick` and the guard of the zeroing in `setProgram`; places that need the death
  itself keep reading `death`. A function of `run.ts` beside `minuteBeforePick` and `pickActivity`
  takes the run and its map's data and says whether the run meets every requirement of the map's
  `solving`; in the minute loop of `advanceMinutes`, after `minuteBeforePick` and after that
  minute's discovery has taken hold, a run that meets it gains its completion, the event
  `{ kind: "mapRunCompleted", minute }` follows the minute's other events, no program rule is
  picked whether or not the minute is free, and the loop stops. `GameState` gains `solvedMaps`, `[]`
  in a new game, the identifiers of the maps solved in the order of their first completion, each
  once; the minute of a completion adds the run's map where it is not there yet, and nothing
  removes it. Where the minute of the completion is also a discovery's, the state holds the
  discovery and is not paused. `passRealTime` does nothing on an ended map run and sets the carry to
  zero where its span ends in a completion. „Restart” after a completion keeps the seed and starts
  with a streak of 0 and no completion; the counts of the rules stay after a completion until the
  next send or restart. The doc comments of `restart`, `end` and `passRealTime` name the
  completion beside death. The tests of `player-map-run-pace` and `minute-span-split` read their
  new wordings; no scenario of `tests/sim/acceptance.test.mjs` or of `test_minute_span_split.py`
  completes today (on the current build the ALIVE program first loses health in game minute 84 and
  ends minute 480 with a streak of 26, and DIES_BUSY dies in minute 347), so the completion cases
  start from explicit state, such as a map run whose streak stands at 479.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/run.ts` · `src/browser/sim/game.ts` ·
  `tests/sim/completion.test.mjs` · `tests/invariants/test_player_map_run_pace.py` ·
  `tests/invariants/test_minute_span_split.py`
- **Read:** `.runs/task-cycles/rozwiazanie-lasu/task.md:19-22` To do ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:42-50` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:66-71` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:75-77` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:105-106` Questions carried to cycle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:166-190` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:45-80` Constraints ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:116-137` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:195-266` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:344-371` Left to the maker ·
  `foundations/decisions.md:401-420` D-20 · `foundations/decisions.md:440-464` D-22 ·
  `foundations/decisions.md:1157-1185` D-61, D-62, with Foundation entries row 7 ·
  `foundations/decisions.md:1307-1320` D-71, with Foundation entries row 5 ·
  `foundations/decisions.md:1619-1648` D-93, with Foundation entries row 14 ·
  `foundations/decisions.md:1990-2012` D-118 · `foundations/decisions.md:2094-2116` D-122, with
  Foundation entries row 12 · `foundations/invariants.md:165-174` map-run-repeatability ·
  `foundations/invariants.md:187-210` action-in-progress, player-map-run-pace, with Foundation
  entries row 4 · `foundations/invariants.md:224-232` simulation-inputs ·
  `foundations/invariants.md:246-260` program-rule-pick · `foundations/invariants.md:307-315`
  restart-seed · `foundations/invariants.md:526-534` minute-span-split, with Foundation entries
  row 13 · `foundations/glossary.md:18-23` map run · `foundations/glossary.md:65-78` map run
  restart, free game minute, with Foundation entries row 8 · Foundation entries rows completion,
  solved map, streak · `foundations/decisions.md:1430-1441` D-80 ·
  `foundations/decisions.md:1456-1467` D-82 · `foundations/decisions.md:1482-1493` D-84 ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/data/maps.ts` · `src/browser/sim/understanding.ts:143-293` ·
  `tests/sim/discovery.test.mjs:577-683` · `tests/sim/program-counts.test.mjs:91-131` ·
  `tests/sim/program-fixture.mjs` · `tests/sim/understanding-fixture.mjs` ·
  `tests/invariants/program_fixture.py` · `tests/invariants/loop2_invariant_support.py:1-229`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from a failing case of `tests/sim/completion.test.mjs` in which a map run whose
  streak stands at 479 completes at the end of the next game minute without a loss, with the rest
  of that minute taken effect and no program rule picked; then
  `npm test -- tests/sim/completion.test.mjs` · `npm test -- tests/sim/time.test.mjs` ·
  `npm test -- tests/sim/discovery.test.mjs` · `npm test -- tests/sim/program-counts.test.mjs` ·
  `npm test -- tests/sim/flow.test.mjs` · `npm test -- tests/sim/streak.test.mjs` ·
  `npm test -- tests/sim/acceptance.test.mjs` · `npm test -- tests/sim/purity.test.mjs` ·
  `npm test -- tests/invariants/test_player_map_run_pace.py` ·
  `npm test -- tests/invariants/test_minute_span_split.py` ·
  `npm test -- tests/invariants/test_map_run_repeatability.py` ·
  `npm test -- tests/invariants/test_restart_seed.py` ·
  `npm test -- tests/invariants/test_action_in_progress.py` ·
  `npm test -- tests/invariants/test_program_rule_pick.py` ·
  `npm test -- tests/invariants/test_streak_program_change.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py`
- **Depends on:** Slices 1, 3, 4 · Foundation entries rows 4, 5, 7, 8, 12, 13, 14 · `completion` ·
  `solved map`

## Current ranges of the foundation entries your *Read* names

The plan's line ranges of `foundations/` are stale: the plan's *Foundation entries* were written in
commit `82bbb1c` (and later slices may have moved lines). The ranges below hold now; where they
differ from the plan's, these hold. "Foundation entries row N" of the plan maps to: row 1 D-21,
row 2 D-129, row 3 D-130, row 4 `player-map-run-pace`, row 5 D-71, row 6 D-131, row 7 D-132 and
D-62, row 8 `map run restart`, row 9 D-133, row 10 D-134, row 11 D-135, row 12 D-122, row 13
`minute-span-split`, row 14 D-93; and the rows `completion`, `solved map`, `streak`,
`manual map run` (glossary) and `streak-program-change` (invariant). Read each entry whole.

- D-20: `foundations/decisions.md:401-420`
- D-22: `foundations/decisions.md:456-480`
- D-61: `foundations/decisions.md:1173-1186`
- D-62: `foundations/decisions.md:1188-1201`
- D-71: `foundations/decisions.md:1323-1336`
- D-93: `foundations/decisions.md:1635-1669`
- D-118: `foundations/decisions.md:2011-2033`
- D-122: `foundations/decisions.md:2115-2149`
- D-80: `foundations/decisions.md:1446-1457`
- D-82: `foundations/decisions.md:1472-1483`
- D-84: `foundations/decisions.md:1498-1509`
- map-run-repeatability: `foundations/invariants.md:165-174`
- action-in-progress: `foundations/invariants.md:187-196`
- player-map-run-pace: `foundations/invariants.md:198-212`
- simulation-inputs: `foundations/invariants.md:226-234`
- program-rule-pick: `foundations/invariants.md:248-262`
- restart-seed: `foundations/invariants.md:309-317`
- minute-span-split: `foundations/invariants.md:528-536`
- game minute: `foundations/glossary.md:12-16`
- map run: `foundations/glossary.md:18-23`
- free game minute: `foundations/glossary.md:73-78`
- completion: `foundations/glossary.md:137-141`
- solved map: `foundations/glossary.md:143-148`
- streak: `foundations/glossary.md:150-155`
- D-132: `foundations/decisions.md:2369-2392`
- map run restart: `foundations/glossary.md:65-71`

The ranges of `task.md` and `spec.md` in your *Read* hold as written; those passages are copied
below. Code and test files in your *Read* are named by path; read them as they stand now.

## Passages of the task and the spec your *Read* names, word for word

#### `task.md:19-22`

> 4. Przejście liczy passę: po kroku ciała minuty gry, w której postać nie traci zdrowia z zimna ani z głodu, passa rośnie o jeden, a minuta z taką utratą ją zeruje. Passę zeruje na każdej mapie każda zmiana reguł programu albo grup reguł wykonywanych w przejściu, po której program różni się od programu sprzed niej — dodanie, usunięcie i przestawienie reguły, zmiana jej warunku albo akcji, zmiana grupy — także w trakcie pauzy; czynność edytora, po której program jest taki sam jak przed nią, na przykład „↑” przy pierwszej regule, zostawia passę. Zerowanie passy nie przerywa trwającej akcji postaci (D-20). Każde przejście — po wysłaniu i po „Restart” — zaczyna z passą zero.
> 5. Gdy przejście spełni warunek rozwiązania mapy — w Lesie: gdy passa dojdzie do 480 — reszta tej minuty gry dzieje się do końca — ognie tracą minutę palenia, kafelki się odnawiają, kończąca się akcja postaci daje skutek — a w miejscu wyboru reguły przejście kończy się domknięciem. Po domknięciu ekran zostaje na stanie z minuty domknięcia i czas stoi; wiersz stanu mówi w Lesie „Minuta {minuta} · Las rozwiązany”, np. „Minuta 480 · Las rozwiązany”, w roli `positive` (napis dla innych map — pytanie przeniesione do cyklu); „Pauza” i przyciski tempa znikają, a zostają „Restart” (to samo ziarno, od minuty zero) i „Zakończ” (powrót do siedziby). Liczniki reguł programu zostają po domknięciu przy regułach jak po śmierci i po „Zakończ”, aż do następnego wysłania albo „Restart” (pytanie 17). Gdy w minucie domknięcia coś odkryto (zadanie 6), ekran domknięcia zastępuje pauzę po odkryciu, a pod jego wierszem stanu stoi też linia odkrycia w roli `discovery` z tym, co odsłonięto, aż gracz wybierze „Restart” albo „Zakończ”; odkrycie wchodzi do Zrozumienia (pytanie 15).
> 6. Po śmierci postaci przyciski tempa znikają razem z „Pauza”, a „Restart” rusza w tempie wybranym wcześniej (pytanie 12); reszta ekranu po śmierci zostaje jak dziś (D-62), a wiersz stanu mówi dalej „Minuta {minuta śmierci} · {przyczyna}”.
> 7. Pierwsze domknięcie mapy przez którąkolwiek postać gracza czyni ją mapą rozwiązaną; mapa zostaje rozwiązana także wtedy, gdy późniejsze przejście skończy się śmiercią. Od tej chwili siedziba pokazuje przy mapie „Mapa: Las · rozwiązana” w roli `positive`.

#### `task.md:42-50`

> - 6. Co widzi i co może zrobić gracz po domknięciu przejścia?
>   - Answer: Droga A — jak po śmierci: ekran zostaje na stanie z minuty domknięcia, czas staje, wiersz stanu mówi np. „Minuta 480 · Las rozwiązany” w roli `positive` („something works, is in order or is active now”, D-39), „Pauza” i przyciski tempa znikają, zostają „Restart” i „Zakończ”; pojęcie `map run restart` dostaje nowe brzmienie, bo dziś mówi tylko o ekranie po śmierci. Uzasadnienie przyjętej rekomendacji: jedno zachowanie dla obu końców przejścia.
>   - Source: człowiek — Mariusz, 2026-10-25, „odpowiedzi zgodnie z rekomendacjami” (rekomendacja A). Cytaty materiału: D-62 (`foundations/decisions.md`, `9a5f360`): “After a character's death the screen stays on the state of the game minute of death and time stands still, and the player has „Restart”, which starts the map run again with the same seed from game minute zero, and „Zakończ”, which returns to the screen from which the player sends the character.”; `map run restart` (`foundations/glossary.md`, `9a5f360`): “A map run restart is a map run of the same character on the same game map, which the player starts in place of the map run in progress or of a map run ended in the character's death that still stands on the screen.”
> - 7. Gdzie gracz widzi, że Las jest rozwiązany?
>   - Answer: Droga A — w siedzibie przy mapie: „Mapa: Las · rozwiązana” w roli `positive`, od pierwszego domknięcia którejkolwiek postaci. Rozwiązanie przepada przy odświeżeniu strony, dopóki zadanie 16 nie wniesie zapisu stanu gry.
>   - Source: człowiek — Mariusz, 2026-10-25, „odpowiedzi zgodnie z rekomendacjami” (rekomendacja A). Fakt z kodu, osobno: strona zaczyna od `newGame()` przy każdym wczytaniu (`src/browser/view/app.ts:24`), loop2 `9a5f360`.
> - 8. W której chwili minuty gry przejście się domyka i co z akcją postaci kończącą się w tej minucie?
>   - Answer: Droga A — passa rośnie po kroku ciała w minucie bez utraty zdrowia z zimna i głodu; gdy dojdzie do 480, reszta minuty dzieje się do końca (ognie, odnawianie, skutek kończącej się akcji), a potem przejście się domyka, bez wyboru nowej reguły; ekran po domknięciu pokazuje stan po całej minucie. Słaby punkt nazwany w pytaniu: dopisany ostatni krok D-71.
>   - Source: człowiek — Mariusz, 2026-10-25, „odpowiedzi zgodnie z rekomendacjami” (rekomendacja A). Cytat materiału: D-71 (`foundations/decisions.md`, `9a5f360`): “A game minute of a map run takes effect in this order: first the character's body […]; then, where its health has reached zero, the character dies in that minute and the map run ends there; otherwise what burns loses a minute of burning, tiles renew their stock, the action of the character ending in that minute takes effect, and the program picks a program rule from what that minute has made.” Materiał: test loop `src/sim/sim.test.ts:543` (`cdc7c0d`) — 10 minut bez uszczerbku daje passę 10.

#### `task.md:66-71`

> - 14. Czy cykl zmienia niezmiennik `minute-span-split` tak, by obejmował odcinek minut kończący się domknięciem, obok minuty śmierci i minuty odkrycia z zadania 6?
>   - Answer: Tak (droga A, brzmienie A2) — cykl zmienia niezmiennik i jego test, w brzmieniu ogólnym: „Przejście przesuwane odcinkiem minut gry dochodzi do tego samego stanu, z tymi samymi zdarzeniami w tej samej kolejności, w każdej minucie gry, jakkolwiek podzielić odcinek na wywołania symulacji, aż do końca przejścia albo minuty odkrycia włącznie.” (wiersz 13 *Settlements to record*). Część o minucie odkrycia idzie za wierszem O5 dokumentu zadania 6. Słabe punkty nazwane w pytaniu: zmiana zasady i testu ponad to, o co pytano przy pytaniach 6 i 8, przeglądana przy scaleniu; zasada nie wymienia końców, które sprawdza test — czytelnik bierze je ze słownika („przejście” kończy domknięcie, śmierć postaci albo przerwanie przez gracza), a przerwanie przez gracza („Zakończ”) nie jest minutą symulacji, więc test go nie obejmuje.
>   - Source: człowiek — Mariusz, 2026-10-26, „przyjmuję rekomendacje” (rekomendacja A w brzmieniu A2 spośród: A1 — „… aż do minuty śmierci postaci, minuty odkrycia albo minuty domknięcia włącznie.”; A2 jak wyżej; B — bez nowego brzmienia, cykl sam decyduje o teście). Wiersz O5 dokumentu zadania 6 `_zadania/odkrywanie_loop2.md` (sha256 755bed2ab43d): „Przejście przesuwane odcinkiem minut gry dochodzi do tego samego stanu, z tymi samymi zdarzeniami w tej samej kolejności, w każdej minucie gry, jakkolwiek podzielić odcinek na wywołania symulacji, aż do minuty śmierci postaci albo minuty odkrycia włącznie.” — przyjęty przy cięciu tamtego zadania bez zmian (Mariusz, 2026-10-26, „wszystko zgodnie z rekomendacjami”). Cytaty materiału (`9a5f360`): `minute-span-split`: “A map run advanced by a span of game minutes reaches the same game state, with the same events in the same order, at every game minute, however the span is split into calls of the simulation, up to and including the character's death.” (obecne brzmienie, z minutą odkrycia — pod *Decisions in play*); pojęcie `map run` (`foundations/glossary.md`): “A map run is one attempt of one character at one game map, from entering it until a completion, the character's death or the player stopping it.” Fakt z kodu, osobno: zegar podaje upływ czasu co 200 ms (`src/browser/view/clock.ts:17`, `:32`), a każda pełna przeskalowana sekunda staje się minutą gry, reszta przechodzi dalej (`src/browser/sim/game.ts:357`–`359`), loop2 `9a5f360` — przy 16× ekran dostaje naraz 3 albo 4 minuty gry, więc domknięcie może wypaść w środku takiego odcinka.
> - 15. Co widzi gracz, gdy przejście domyka się w tej samej minucie gry, w której coś odkryto?
>   - Answer: Droga A — domknięcie i linia odkrycia razem: ekran domknięcia jak w pytaniu 6, a pod wierszem „Minuta 480 · Las rozwiązany” stoi też linia odkrycia w roli `discovery`, aż gracz wybierze „Restart” albo „Zakończ”; odkrycie wchodzi do Zrozumienia. Przejście kończy się w tej minucie, więc pauzy po niej nie ma (wiersz 4 *Settlements to record*), a wpis z wiersza O2 zadania 6 dostaje nowe brzmienie (wiersz 12). Słabe punkty nazwane w pytaniu: linia odkrycia dostaje drugi koniec — „Restart” albo „Zakończ” obok „Wznów”; ekran domknięcia ma dwie linie i osobną ścieżkę w kodzie i teście dla rzadkiej minuty.
>   - Source: człowiek — Mariusz, 2026-10-26, „przyjmuję rekomendacje” (rekomendacja A spośród dróg: A — domknięcie i linia odkrycia razem; B — sam ekran domknięcia, odkrycie wchodzi do Zrozumienia bez linii). Wiersz O2 dokumentu zadania 6 (sha256 755bed2ab43d): „Odkrycie zatrzymuje przejście tą samą pauzą co „Pauza” — wiersz stanu dopisuje „ (pauza)”, a gracz rusza dalej przyciskiem „Wznów” — a pod wierszem stanu stoi do wznowienia linia w roli `discovery` z tym, co odsłonięto.” — przyjęty przy cięciu tamtego zadania bez zmian (Mariusz, 2026-10-26, „wszystko zgodnie z rekomendacjami”). Materiał pytania, z danych gry loop2 `9a5f360`: obie rzeczy wypadają w jednej minucie rzadko — zanim passa dojdzie do 480, gra odkryła już pierwsze wychłodzenie, eksplorację, patyk, „Zapal” i jagodę, bo wychłodzenie i głód zerują passę (D-60; `src/browser/sim/data/maps.ts:32`, `balance.ts:9`–`17`, `items.ts:34`); w Lesie zostaje eksploracja, która w minucie domknięcia pierwszy raz odsłania kafelek z mchem albo włóknem (`items.ts:25`: “Moss and fiber have no use yet.”); że pierwsze ognisko gra też zna wcześniej, to szacunek refinera z liczb gry, nie pewność.

#### `task.md:75-77`

> - 17. Co pokazują liczniki reguł programu po domknięciu przejścia — zostają przy regułach jak po śmierci i po „Zakończ”, aż do następnego wysłania albo „Restart”?
>   - Answer: Droga A — po domknięciu liczniki reguł zostają przy regułach jak po śmierci i po „Zakończ”, aż do następnego wysłania albo „Restart”; cykl dopisuje domknięcie do zdania D-93 o końcach przejścia (wiersz 14 *Settlements to record*). Uzasadnienie przyjętej rekomendacji: gracz ogląda, które reguły pracowały w przejściu, które rozwiązało Las, a oba końce przejścia zachowują się tak samo, jak przy pytaniu 6. Słaby punkt nazwany w pytaniu: jedno zdanie więcej w D-93 do przejrzenia przy scaleniu.
>   - Source: człowiek — Mariusz, 2026-10-28, „tak” (rekomendacja A spośród dróg: A — liczniki zostają jak po śmierci i po „Zakończ”, do następnego wysłania albo „Restart”, a cykl dopisuje domknięcie do zdania D-93; B — liczniki znikają po domknięciu; C — nie ustalać teraz, cykl rozstrzyga; tym samym słowem człowiek przyjął wiersz 14 i ponownie wiersz 6 *Settlements to record*). Pytanie z odświeżenia dokumentu 2026-10-28: odpowiedź na pytanie 6 (2026-10-25) liczników nie wymienia, bo fundament `9a5f360` nie miał jeszcze D-93. Cytat materiału: D-93 (`foundations/decisions.md`, loop2 `6540e4c`): “[…] Before the game's first map run the rules show no counts, and after a map run ends, in death or through „Zakończ”, its counts remain beside the rules until the next send or map run restart, subject to the same reset on a change of a rule's content.” — domknięcia, które wnosi to zadanie, D-93 nie wymienia; jej uzasadnienie: “Keeping the last run's counts lets the player inspect the program after that run ends.” Związek z zadaniem 12 (inny zakres, materiał, nie odpowiedź na to pytanie): odpowiedź człowieka na pytanie Q9 rozmowy refinementu zadania 12 programy-gracza, droga A (Mariusz, 2026-10-28), mówi, że po zadaniu 12 na ekranie po śmierci i po domknięciu panel dalej pokazuje kopię programu z licznikami. Fakt z kodu, osobno: wszystkie liczniki zeruje start przejścia (`src/browser/sim/game.ts:335`), licznik jednej reguły — zmiana jej treści (`:272`), a nowa gra zaczyna bez liczników (`:357`); żadne miejsce w `game.ts` nie czyści liczników na końcu przejścia, loop2 `6540e4c`.

#### `task.md:105-106`

> - Jak przejście przechowuje passę i domknięcie, a stan gry — mapy rozwiązane, tak by niezmienniki `minute-span-split` w nowym brzmieniu z końcem przejścia (pytanie 14, wiersz 13 *Settlements to record*) i `map-run-repeatability` dalej obowiązywały.
> - Czy przy odkryciu przepada też niepełna reszta czasu realnego przeniesiona z wcześniejszych przekazań, jak przy śmierci (`src/browser/sim/game.ts:361`–`362`, loop2 `9a5f360`: “Where the character dies, time stops there and nothing carries over.”) — wiersz O4 dokumentu zadania 6 i wiersz 4 *Settlements to record* mówią tylko o reszcie czasu przekazanego w tym samym wywołaniu; gracz różnicy nie widzi, bo reszta jest krótsza niż 1/tempo sekundy realnej, ale test niezmiennika `player-map-run-pace` ją ustala.

#### `task.md:166-190`

> Candidates: 14 shown, 14 accepted — 2026-10-28
>
> | # | Settlement | Kind | Source | What the cycle would otherwise guess |
> |---|---|---|---|---|
> | 1 | Przejście, które gracz uruchamia, idzie minutę gry na sekundę realną razy tempo, które gracz wybiera spośród 1×, 2×, 4×, 8× i 16×, a pauza zostaje: wybranie tempa w pauzie, także w zatrzymaniu przy odkryciu, zmienia tempo, a przejście stoi dalej aż do „Wznów”. | decision | pytania 2 i 3, drogi A (Mariusz, 2026-10-25); zdanie o wybraniu tempa w pauzie — pytanie 13, droga A (Mariusz, 2026-10-26) | jakie tempa daje gra, czy D-21 dalej odrzuca szybsze tempo i czy wybranie tempa w pauzie wznawia przejście |
> | 2 | Wybrane tempo zostaje, aż gracz je zmieni — przez pauzę, „Restart”, „Zakończ” i kolejne wysłanie postaci — a nowa gra zaczyna od 1×. | decision | pytanie 4, droga A (Mariusz, 2026-10-25) | czy każde nowe przejście albo restart wraca do 1× |
> | 3 | Gracz wybiera tempo pięcioma przyciskami „1×”, „2×”, „4×”, „8×”, „16×” w wierszu stanu przejścia obok „Pauza”, a wybrane tempo jest przyciskiem wybranym w grupie. | decision | pytanie 3, droga A (Mariusz, 2026-10-25) | gdzie stoi przełącznik tempa i z której kontrolki go zbudować |
> | 4 | Czas realny przekazany symulacji dla przejścia, które gracz uruchamia, przesuwa je, aż się skończy, o jedną minutę gry za każdą pełną 1/tempo sekundy realnej przekazanej poza pauzą — przy 16× za każdą pełną 1/16 sekundy — a niepełna reszta przechodzi na następne przekazanie czasu; w czasie pauzy przejście stoi, a po minucie gry, w której coś odkryto, przejście staje w pauzie, chyba że się w niej skończyło, i reszta czasu realnego przekazanego w tym samym wywołaniu przepada. | invariant | pytania 2, 3 i 11, drogi A (Mariusz, 2026-10-25); „niepełna reszta przechodzi na następne przekazanie czasu” — fakt z kodu, nie odpowiedź człowieka: dziś każda pełna przeskalowana sekunda staje się minutą gry, a reszta przechodzi na następne wywołanie (`src/browser/sim/game.ts:357`–`359`, loop2 `9a5f360`); część o odkryciu — wiersz O4 dokumentu zadania 6 (`_zadania/odkrywanie_loop2.md`, sha256 755bed2ab43d; pytanie 3 (1) P i pytanie 11 A tamtego zadania, Mariusz, 2026-10-25), przyjęty przy cięciu tamtego zadania bez zmian (Mariusz, 2026-10-26, „wszystko zgodnie z rekomendacjami”): „po minucie gry, w której coś odkryto, przejście staje w pauzie, a reszta czasu realnego przekazanego w tym samym wywołaniu przepada”; „chyba że się w niej skończyło” — pytanie 6, droga A (Mariusz, 2026-10-25): po domknięciu czas stoi, a „Pauza” znika | czy test niezmiennika sprawdza tempo inne niż 1× i odkrycie w środku jednej sekundy realnej przy 16×, gdy sekunda niesie do 16 minut gry, czy tempo przesuwa przejście minutami co 1/tempo sekundy, czy skokiem o tempo minut raz na sekundę, i czy niezmiennik łączy obie zmiany |
> | 5 | Passa przejścia rośnie o jeden po kroku ciała minuty gry, w której postać nie traci zdrowia z zimna ani z głodu; gdy przejście spełni warunek rozwiązania mapy (w Lesie: passa dojdzie do 480), reszta minuty dzieje się do końca — ognie, odnawianie, skutek kończącej się akcji — a w miejscu wyboru reguły przejście się domyka. | decision | pytanie 8, droga A (Mariusz, 2026-10-25) | czy domknięcie przychodzi zaraz po kroku ciała, jak śmierć, i czy skutek kończącej się akcji przepada |
> | 6 | Spośród edycji programu passę zeruje edycja, po której program różni się od programu sprzed niej — dodanie, usunięcie i przestawienie reguły, zmiana jej warunku albo akcji, zmiana grupy — także w trakcie pauzy; czynność edytora, po której program jest taki sam jak przed nią, zostawia passę. | decision | pytanie 9, cytat i droga A (Mariusz, 2026-10-25); brzmienie „Spośród edycji programu passę zeruje edycja, …” przyjęte ponownie po pokazaniu obok dawnego „Passę zeruje zmiana, po której …” (Mariusz, 2026-10-28, „tak”) | czy „↑” przy pierwszej regule albo inna czynność bez skutku zeruje passę |
> | 7 | Po domknięciu ekran zostaje na stanie z minuty domknięcia i czas stoi, wiersz stanu mówi w Lesie „Minuta {minuta} · Las rozwiązany” w roli `positive`, „Pauza” i przyciski tempa znikają, a gracz ma „Restart” i „Zakończ” jak po śmierci — także po śmierci przyciski tempa znikają razem z „Pauza”. | decision | pytanie 6, droga A (Mariusz, 2026-10-25); zdanie o ekranie po śmierci — pytanie 12, droga A (Mariusz, 2026-10-26) | ekran po domknięciu — np. powrót do siedziby z komunikatem — i czy po śmierci przyciski tempa zostają, czynne albo nieaktywne |
> | 8 | Restart przejścia to przejście tej samej postaci na tej samej mapie, które gracz uruchamia w miejsce trwającego przejścia albo przejścia zakończonego śmiercią postaci albo domknięciem, które jeszcze stoi na ekranie. | glossary term | pytanie 6, droga A (Mariusz, 2026-10-25) | czy „Restart” po domknięciu jest restartem przejścia w sensie słownika |
> | 9 | W trakcie przejścia wiersz stanu pokazuje passę obok minuty i czynności, np. „Minuta 312 · Eksploruje · Passa 120/480”, a siedziba pokazuje przy mapie zdanie jej warunku rozwiązania z danych mapy. | decision | pytanie 5, droga A (Mariusz, 2026-10-25) | gdzie i w jakiej postaci gracz widzi passę i warunek — np. pasek postępu albo sam licznik |
> | 10 | Od pierwszego domknięcia mapy przez którąkolwiek postać gracza siedziba pokazuje przy mapie „Mapa: {mapa} · rozwiązana” w roli `positive`. | decision | pytanie 7, droga A (Mariusz, 2026-10-25) | czy rozwiązanie widać poza chwilą domknięcia |
> | 11 | Najdłuższej passy przejścia gra dziś nie pokazuje. | decision | pytanie 5, część (b) (Mariusz, 2026-10-25: rekomendacja „nie dodawać jej teraz”, przyjęta) | czy przenieść z loop pamiętanie najdłuższej passy przejścia (test loop `src/sim/sim.test.ts:555`, `cdc7c0d`, wymieniony w *Context*) i pokazać ją na ekranie po śmierci |
> | 12 | Odkrycie zatrzymuje przejście tą samą pauzą co „Pauza” — wiersz stanu dopisuje „ (pauza)”, a gracz rusza dalej przyciskiem „Wznów” — a pod wierszem stanu stoi do wznowienia linia w roli `discovery` z tym, co odsłonięto; gdy przejście domyka się w minucie odkrycia, ekran domknięcia zastępuje pauzę, a linia stoi pod jego wierszem stanu do „Restart” albo „Zakończ”. | decision | pytanie 15, droga A (Mariusz, 2026-10-26); część przed średnikiem — wiersz O2 dokumentu zadania 6 (`_zadania/odkrywanie_loop2.md`, sha256 755bed2ab43d), przyjęty przy cięciu tamtego zadania bez zmian (Mariusz, 2026-10-26, „wszystko zgodnie z rekomendacjami”) | czy odkrycie w minucie domknięcia zatrzymuje przejście pauzą i czy jego linia staje na ekranie domknięcia — także dla odkryć zadań 8 i 9 |
> | 13 | Przejście przesuwane odcinkiem minut gry dochodzi do tego samego stanu, z tymi samymi zdarzeniami w tej samej kolejności, w każdej minucie gry, jakkolwiek podzielić odcinek na wywołania symulacji, aż do końca przejścia albo minuty odkrycia włącznie. | invariant | pytanie 14, droga A w brzmieniu A2 (Mariusz, 2026-10-26); część o minucie odkrycia — wiersz O5 dokumentu zadania 6 (sha256 755bed2ab43d), przyjęty przy cięciu tamtego zadania bez zmian (Mariusz, 2026-10-26, „wszystko zgodnie z rekomendacjami”) | czy test niezmiennika sprawdza domknięcie wypadające w środku odcinka minut, gdy przy 16× ekran dostaje naraz 3 albo 4 minuty gry, i czy zasada wymienia końce przejścia z osobna |
> | 14 | Po domknięciu liczniki reguł zostają przy regułach jak po śmierci i po „Zakończ”, aż do następnego wysłania albo „Restart”. | decision | pytanie 17, droga A (Mariusz, 2026-10-28, „tak”) | czy ekran domknięcia czyści liczniki reguł i czy D-93 wymienia domknięcie |
>
> Uwagi do wierszy:
>
> - Wiersz 1 jest nową odpowiedzią D-21; wiersz 4 — nowym brzmieniem `player-map-run-pace`, które łączy tempo z zatrzymaniem przy odkryciu, zapisanym przez zadanie 6 z wiersza O4 jego dokumentu; wiersz 5 — zdaniem dopisanym do D-71, obok zdań o odkryciu, które zadanie 6 zapisało z wiersza O3 jego dokumentu; wiersz 7 — także zdaniem o przyciskach tempa po śmierci, dopisanym do D-62; wiersz 8 — nowym brzmieniem pojęcia `map run restart`; wiersz 12 — nowym brzmieniem D-122, którą zadanie 6 zapisało z wiersza O2 jego dokumentu; wiersz 13 — nowym brzmieniem `minute-span-split`, po brzmieniu z minutą odkrycia, które zadanie 6 zapisało z wiersza O5 jego dokumentu; wiersz 14 — domknięciem dopisanym do zdania D-93 o końcach przejścia, po których liczniki zostają.
> - Wiersz 6 mówi o edycji programu: przełączenie postaci na inny program w trakcie ręcznego przejścia, które wnosi zadanie 12, zeruje passę także wtedy, gdy nowy program ma te same reguły (`streak-program-change/1` w definicji zatwierdzonej ponownie 2026-10-28). Słowa „Spośród edycji programu” i „edycja” w miejscu „zmiana” zawężają wiersz do tego, o co pytało pytanie 9 — odświeżenie dokumentu 2026-10-28 po uwadze krytyki planu; znaczenie przyjętego wiersza dla edycji się nie zmienia.
> - Wiersz 4: „chyba że się w niej skończyło” wynika z przyjętej drogi A pytania 6 (po domknięciu czas stoi, a „Pauza” znika) i idzie razem z wierszem 12: przejście domknięte w minucie odkrycia nie staje w pauzie. O4 zostaje bez zmian: w zadaniu 6 przejście nie ma domknięcia, a w minucie śmierci odkrycie nie zapada — skutek kończącej się akcji wtedy nie zapada (To do 5 zadania 6, D-71), a pierwsze wychłodzenie przychodzi w pierwszym przejściu nowej gry, gdy postać ma pełne zdrowie; wyjątek wnosi wiersz 4 razem z domknięciem.
> - Wiersz 11: żadne zadanie planu nie dodaje najdłuższej passy, więc wykluczenie trwa dłużej niż zadanie i stoi tu, nie w *Out of scope*.

#### `spec.md:45-80`

> ## Constraints
>
> - The frozen task: its *To do* 1–8, its 17 settled questions and its 14 rows of *Settlements to
>   record*, taken as given.
> - D-04: the simulation is pure functions over the game state and a span of game minutes; real time
>   enters only as an argument; the view draws only from the game state and the content data, and
>   changes the game state only through simulation functions, passing the player's choices and the
>   passing of real time. `simulation-isolation`, `simulation-inputs`.
> - D-18 and `content-identifiers`: game maps' names and numbers stand in data; no TypeScript file of
>   `src/browser/` outside `src/browser/sim/data/` writes the name „Las” or the identifier `forest`.
> - D-71: the order of a game minute — body; death; burning, renewal, the effect of an ending action;
>   the pick — with a discovery landing where that order brings it and taking hold before the pick.
> - D-20 and `action-in-progress`: an edit of the program interrupts no action in progress; a map run
>   that ends first ends it. The completion ends the map run, so the action in progress ends with it.
> - `program-rule-pick` speaks of free game minutes; a free game minute is one at which the map run
>   goes on (glossary), so the game minute of a completion, like that of death, picks nothing without
>   breaking it.
> - D-22 and `restart-seed`: „Restart” after a completion is a map run restart and keeps the seed.
> - D-93: counts stay after the map run ends and reset on the next send or restart; nothing in
>   `game.ts` clears them at an end (code at `6540e4c`), so a completion keeps them by itself.
> - D-122: a discovery stops the map run in the pause of „Pauza”; row 12 makes a completion in the
>   game minute of a discovery replace that pause.
> - D-44 and the styleguide: the pace buttons are the shared „button selected in its group” of
>   `src/browser/view/controls/button.ts` (`setButtonSelected`); `positive` (D-39) is a role of the
>   kind text and already stands in `src/browser/tokens.css`.
> - The code as it stands (`6540e4c`): `passRealTime` scales real milliseconds by
>   `BALANCE.gameMinutesPerRealSecond`, turns every whole scaled second into a game minute and keeps
>   the rest in `realMsCarry`, and sets that carry to zero where the span ends in death or a
>   discovery; `advanceMinutes` runs the minute of D-71 through `minuteBeforePick`, `discover` and
>   `pickActivity` (`src/browser/sim/game.ts:498`–`591`); `bodyMinute` computes chilled and starving
>   but reports only death (`src/browser/sim/body.ts:44`–`78`); `tests/sim/data.test.mjs:177`
>   expects `BALANCE.gameMinutesPerRealSecond` to be 1.
> - `guidelines/testing.md`: expected numbers — 480, the paces 1, 2, 4, 8, 16 — come from the task
>   (D-80, D-82); simulation tests give explicit state, elapsed time and seed (D-84); the changed
>   journeys in the browser — pace buttons, completion screen, headquarters texts — are checked by
>   hand (D-75, D-88).

#### `spec.md:116-137`

> ### 2. The carried real time is a fraction of a game minute, and a stop drops all of it
>
> `realMsCarry` keeps its present meaning: real milliseconds already scaled — now by the pace in force
> when they were passed — that have not yet made a game minute, from 0 up to, not including, 1000.
> Real time thus counts at the pace in force when it was passed: 500 ms passed at 1× and then 31.25 ms
> passed at 16× make one game minute. A change of pace leaves the carry as it is.
>
> Where a call's span ends in death, in a completion or in the game minute of a discovery, the whole
> carry is set to zero, as the code does today at death and at a discovery. This answers the fifth
> carried question: the carry from earlier passes is dropped too, and this is the same quantity as
> the "rest of the real time passed in the same call" of row 4. The carry from earlier passes is
> always less than one game minute, so it is used up in the first game minute the call makes; a call
> that reaches a discovery has made at least that minute, so whatever is left beyond the discovery's
> minute was passed in that call. The test of `player-map-run-pace` that expects a carry of zero
> after a discovery holds under both readings.
>
> Way rejected: carrying unscaled real milliseconds, converted at the pace of the next call — 500 ms
> passed at 1× followed by a switch to 16× would yield eight game minutes for half a second the player
> spent at 1×, and the reading of row 4, "each whole 1/pace of a real second passed", would depend on
> the pace of a later call.
>
> Cost if wrong: small; one line of `passRealTime` and the cases of its test.

#### `spec.md:195-266`

> ### 5. A map run holds its streak and its completion; the game state holds its solved maps
>
> Units and their interfaces:
>
> - **The body step reports a loss.** `bodyMinute` (`src/browser/sim/body.ts`) also says whether the
>   character lost health to cold or hunger in that minute — chilled or starving after its step, as
>   D-60 counts the loss. The streak reads this report, not a comparison of health before and after,
>   so that wounds of combat (task 8), which lower health, can leave the streak as the definition
>   requires.
> - **`MapRun.streak`** — a whole number, 0 when a map run starts, by send and by restart. In each
>   game minute, after the body step, it grows by one where the body step reports no loss and becomes
>   0 where it reports one (To do 4). The game minute of death is always a minute of such a loss —
>   health falls only for being chilled or starving (D-60), so it reaches zero (D-61) only in such a
>   minute — so a map run ended in death holds a streak of 0, as loop's test cited by the task
>   expects (`src/sim/sim.test.ts:555`, `cdc7c0d`). The death branch of `minuteBeforePick` sets it
>   from the same report as the branch of a living character.
> - **`MapRun.completion`** — `null` while the map run has not completed; once it completes, an
>   object holding the game minute of the completion, beside `death` and of the same kind. A map run
>   has ended when it has a death or a completion; one exported predicate of the simulation says so,
>   and every place that today reads `run.death` to mean "the map run has ended" — `passRealTime`,
>   `advanceMinutes`, `minuteBeforePick`, `pauseLabel` and the status row — uses it, while the places
>   that need the death itself, its minute or its cause, keep reading `death`.
> - **The completion check** stands in the minute loop of `advanceMinutes`, at the place of the pick:
>   after `minuteBeforePick` and after the discovery of that minute has taken hold, where the run
>   meets the solving condition of its map, the run gains its completion, the event
>   `{ kind: "mapRunCompleted", minute }` follows the minute's other events, no program rule is
>   picked whether or not the minute is a free one, and the loop stops, as it stops at death.
>   Otherwise the pick goes on as today. The check is a function of `run.ts` beside
>   `minuteBeforePick` and `pickActivity` that takes the run and the map's data.
> - **`GameState.solvedMaps`** — the identifiers of the maps solved in this game, each at most once,
>   in the order of their first completion; `[]` in a new game. The game minute of a completion adds
>   the run's map where it is not there yet. Nothing removes it: death, `restart`, `end`, `send` and
>   later deaths on that map leave it.
> - **The pause at a completion.** Where the game minute of the completion is also that of a
>   discovery, the state holds the discovery, so its line shows, and is not paused (row 4, "chyba że
>   się w niej skończyło"; row 12). `restart` and `end` clear the discovery as they do today.
> - **`passRealTime`** does nothing on a map run that has ended, and sets the carry to zero where its
>   span ends in a completion (decision 2).
> - **Zeroing on an edit.** `setProgram` compares the checked program with the program the state
>   holds; where they differ and the state holds a map run that has not ended, the run's streak
>   becomes 0, paused or not. "Differ" is deep inequality of the two programs as the game state holds
>   them — the groups in order with their identities, names and conditions, the rules of each in order
>   with their identities, conditions and actions, and the identity counters. So „↑” on the first rule
>   and any editor act that hands back the same program leave the streak; swapping two rules of the
>   same content zeroes it, since the rules are two rules, told apart by identity and by their counts
>   in the editor. A map run that has ended keeps the streak it ended with, since its screen stands on
>   the state of its last minute (D-62). The rule the game writes at the first chill (D-123) does not
>   go through `setProgram` and does not zero the streak; in that minute the character is chilled, so
>   the streak is 0 anyway.
>
> Since the streak, the completion and the solved maps change only inside the minute loop of the
> simulation, one game minute at a time, and depend only on the run, the map's data and the program,
> a span split into any calls reaches the same state with the same events at every game minute up to
> the end of the map run, which keeps `minute-span-split` in its new wording (row 13), and two
> simulations of one program from one state with one seed and the same real-time inputs give the
> same map run, which keeps `map-run-repeatability`.
>
> Ways rejected:
>
> - one field `end` replacing `death`, holding either a death or a completion — the cleaner shape, but
>   every reader of `run.death` in the code and the tests would change for no behaviour this task
>   needs;
> - the completion decided inside `minuteBeforePick` — its event would precede the `discovered` event
>   of the same minute, and a discovery in that minute would land after the end of the map run,
>   against D-71's place of the pick;
> - the streak held in the game state beside `paused` — it belongs to one map run, starts with it and
>   ends with it;
> - solved maps as a record keyed by map — the same meaning; a list keeps the order of solving and
>   matches what loop kept (`src/sim/tick.test.ts:41` of loop, cited by the task).
>
> Cost if wrong: moderate. The fields enter the game state that task 16 will save; renaming them
> after task 16 means a migration of saved games.

#### `spec.md:344-371`

> ## Left to the maker
>
> - The exact identifiers of the new fields, the function, the predicate of an ended map run and the
>   event, where they keep the shapes above; the TypeScript type of the pace, derived from the list of
>   paces in the data.
> - The order of the controls in the status row, provided the pace buttons stand beside „Pauza”; the
>   accessible names of the pace buttons; the CSS class names and how the status text switches its
>   role.
> - Where in a character's row of the headquarters the condition sentence stands, and on which line.
> - Whether `stepMinute` of `run.ts`, which nothing outside `run.ts` calls, also learns the
>   completion or is left as it is.
> - The tests, per `guidelines/testing.md`: the new cases and the changed ones of
>   `tests/invariants/test_player_map_run_pace.py` (a pace other than 1×; a change of pace between
>   passes, with the carry as decision 2 sets it; a discovery inside one real second at 16×; a
>   completion that stops the map run unpaused with the carry dropped) and of
>   `tests/invariants/test_minute_span_split.py` (a completion inside a span, reached by splits of
>   several minutes, as 16× gives on a 200 ms tick), each with its docstring reading the new wording;
>   simulation cases on explicit state — for example a map run whose streak stands at 479 — for the
>   streak's growth and reset, a streak of 0 in the game minute of death, the zeroing by a differing edit and not by an identical one, the rest
>   of the minute of completion taking effect, the solved map surviving a later death, „Restart”
>   after a completion keeping the seed, and the counts kept after a completion; view cases for the
>   status text with the streak and after a completion, the pause label and the pace buttons after an
>   end, and the headquarters' texts. Existing tests whose scenario reaches 480 minutes without a loss
>   — the ALIVE scenario of `test_minute_span_split.py` and `tests/sim/acceptance.test.mjs` may — now
>   end in a completion; a changed expectation there names the task as its cause, per *Changing an
>   existing test*.
> - The hand check in a browser of the pace buttons, the completion screen and the headquarters' texts
>   (D-75, D-88).

## Report

Write your full report to the report path as the method gives it, with each check's command and
exit code, and return only your status, your commits, a one-line check result naming what failed
or did not run, and the report path.
