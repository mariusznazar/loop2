# Handoff — executor of slice 1, task `rozwiazanie-lasu`

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
- Stage: the executor of slice 1 of the plan `.runs/task-cycles/rozwiazanie-lasu/plan.md`.
  Boundary: this slice. Make no other slice, and do not run the product's full gate (`npm test`
  without a file) — the orchestrator runs it.
- Commit on the branch by explicit paths (`git add <file>…`, never `-A` or `.`), messages in English
  in the repo's form (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`), and
  leave the worktree clean.
- Report path: `.runs/task-cycles/rozwiazanie-lasu/reports/13-slice1-report.md`
- Frozen task: `.runs/task-cycles/rozwiazanie-lasu/task.md`; reviewed spec:
  `.runs/task-cycles/rozwiazanie-lasu/spec.md`; plan: `.runs/task-cycles/rozwiazanie-lasu/plan.md`.

## Answers of step 4

- Trust boundary: no. Irreversible operation: no.

## Your slice — the plan's section, word for word

### Slice 1 — pace in the simulation

- **Goal:** The game state holds the pace the player picked, 1 in a new game, and a new exported
  simulation function `setPace(state, pace)` sets it and nothing else — not the pause, not the
  discovery held, not the carried real time — with or without a map run, and throws on a pace
  outside the list of paces in the data. That list, 1, 2, 4, 8 and 16, stands in
  `src/browser/sim/data/balance.ts` beside `gameMinutesPerRealSecond`, which stays 1.
  `send`, `restart`, `end` and `setPaused` leave the pace as it is. `passRealTime` multiplies the
  real milliseconds by `gameMinutesPerRealSecond` and by the pace; `realMsCarry` keeps scaled
  milliseconds at the pace in force when they were passed, a change of pace leaves it, and it is
  set to zero at death and at a discovery as today (spec decision 2). The tests read the new
  wording of `player-map-run-pace` except its words on a completion ("unless it ended in it"),
  which Slice 5 adds with the completion.
- **Change:** `src/browser/sim/data/balance.ts` · `src/browser/sim/types.ts` ·
  `src/browser/sim/game.ts` · `tests/sim/time.test.mjs` · `tests/sim/flow.test.mjs` ·
  `tests/sim/data.test.mjs` · `tests/invariants/test_player_map_run_pace.py`
- **Read:** `.runs/task-cycles/rozwiazanie-lasu/task.md:16-17` To do ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:30-38` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:63-65` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:106-106` Questions carried to cycle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:166-173` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:185-189` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:84-137` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:344-371` Left to the maker ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:422-438` D-21, with
  Foundation entries row 1 · Foundation entries row 2 (the pace stays) ·
  `foundations/invariants.md:198-210` player-map-run-pace, with Foundation entries row 4 ·
  `foundations/decisions.md:1990-2012` D-118 · `foundations/decisions.md:2094-2116` D-122 ·
  `foundations/invariants.md:165-174` map-run-repeatability ·
  `foundations/invariants.md:212-232` simulation-isolation, simulation-inputs ·
  `foundations/decisions.md:1430-1441` D-80 · `foundations/decisions.md:1456-1467` D-82 ·
  `foundations/decisions.md:1482-1493` D-84 · `foundations/glossary.md:12-23` game minute, map run ·
  Foundation entries row manual map run · `guidelines/coding.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/coding-content-data.md` ·
  `guidelines/testing.md` · `tests/sim/program-fixture.mjs` · `tests/sim/understanding-fixture.mjs` ·
  `tests/invariants/program_fixture.py` · `tests/invariants/loop2_invariant_support.py:1-229`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from a failing case of `tests/sim/time.test.mjs` in which real time passed at
  16× moves the map run on by one game minute for each whole 62.5 ms; then
  `npm test -- tests/sim/time.test.mjs` · `npm test -- tests/sim/flow.test.mjs` ·
  `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/purity.test.mjs` ·
  `npm test -- tests/sim/discovery.test.mjs` ·
  `npm test -- tests/invariants/test_player_map_run_pace.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/invariants/test_map_run_repeatability.py` ·
  `npm test -- tests/invariants/test_minute_span_split.py`
- **Depends on:** Foundation entries rows 1, 2, 4 · `manual map run`

## Current ranges of the foundation entries your *Read* names

The plan's line ranges of `foundations/` are stale: the plan's *Foundation entries* were written in
commit `82bbb1c` (and later slices may have moved lines). The ranges below hold now; where they
differ from the plan's, these hold. "Foundation entries row N" of the plan maps to: row 1 D-21,
row 2 D-129, row 3 D-130, row 4 `player-map-run-pace`, row 5 D-71, row 6 D-131, row 7 D-132 and
D-62, row 8 `map run restart`, row 9 D-133, row 10 D-134, row 11 D-135, row 12 D-122, row 13
`minute-span-split`, row 14 D-93; and the rows `completion`, `solved map`, `streak`,
`manual map run` (glossary) and `streak-program-change` (invariant). Read each entry whole.

- D-04: `foundations/decisions.md:57-92`
- D-21: `foundations/decisions.md:422-454`
- D-118: `foundations/decisions.md:2011-2033`
- D-122: `foundations/decisions.md:2115-2149`
- D-80: `foundations/decisions.md:1446-1457`
- D-82: `foundations/decisions.md:1472-1483`
- D-84: `foundations/decisions.md:1498-1509`
- map-run-repeatability: `foundations/invariants.md:165-174`
- player-map-run-pace: `foundations/invariants.md:198-212`
- simulation-isolation: `foundations/invariants.md:214-224`
- simulation-inputs: `foundations/invariants.md:226-234`
- game minute: `foundations/glossary.md:12-16`
- map run: `foundations/glossary.md:18-23`
- manual map run: `foundations/glossary.md:131-135`
- D-129: `foundations/decisions.md:2296-2318`

The ranges of `task.md` and `spec.md` in your *Read* hold as written; those passages are copied
below. Code and test files in your *Read* are named by path; read them as they stand now.

## Passages of the task and the spec your *Read* names, word for word

#### `task.md:16-17`

> 1. Gracz przewija czas ręcznego przejścia: w wierszu stanu przejścia obok „Pauza” stoi pięć przycisków „1×”, „2×”, „4×”, „8×” i „16×”, a wybrane tempo jest wyróżnione jak przycisk wybrany w grupie (D-44). Przejście idzie minutę gry na sekundę realną razy wybrane tempo, a pauza zostaje (pytanie 2): „Pauza” zatrzymuje przejście, a „Wznów” je wznawia. Wybranie tempa w czasie pauzy — także w zatrzymaniu przy odkryciu — zmienia tempo, a przejście stoi dalej aż do „Wznów” (pytanie 13).
> 2. Wybrane tempo zostaje, aż gracz je zmieni: przez pauzę — także zatrzymanie czasu przy odkryciu, które wnosi zadanie 6 — „Restart”, „Zakończ” i kolejne wysłanie postaci; nowa gra zaczyna od 1×.

#### `task.md:30-38`

> - 2. Czy cykl tego zadania zmienia decyzję D-21 i niezmiennik `player-map-run-pace`, które dziś trzymają przejście na jednej minucie gry na sekundę realną?
>   - Answer: Tak (droga A). Przewijanie należy do tego zadania, a cykl pisze nową odpowiedź D-21: przejście idzie minutę gry na sekundę realną razy tempo wybrane przez gracza, a pauza zostaje; niezmiennik `player-map-run-pace` i jego test dostają nowe brzmienie w tej samej zmianie, pisane po zatrzymaniu czasu przy odkryciu z zadania 6, z obiema zmianami. „Przewijanie” znaczy szybsze tempo: przejście idzie dalej minuta po minucie, widocznie, w wielokrotności minuty gry na sekundę realną — nie skok do wyniku i nie cofanie. Słaby punkt nazwany w pytaniu: zmiana zapisanej decyzji i testu, którą człowiek przegląda przy scaleniu.
>   - Source: człowiek — Mariusz, 2026-10-25: „ja miałem na myśli A” (na pytanie, co znaczy „przewijanie”: A szybsze tempo, B skok do wyniku, C oba, D cofanie) i „odpowiedzi zgodnie z rekomendacjami” (rekomendacja A); cytaty, które zostawił: plan, wiersz 7, Goal (jak w pytaniu 1); plan, Projected entries: „(new) — How fast does the earning loop go? | 7, 18 | 18”; definicja, In scope pkt 19 i wpis „(new) — How fast does the earning loop go?” (jak w pytaniu 1); obecne D-21 (`foundations/decisions.md`, loop2 `9a5f360`): “A map run the player starts passes at one game minute per real second, and the player can pause and resume it.” — *Rejected:* “[…] a faster pace while the game has no fast-forwarding.”; kolejność po zadaniu 6 — pytanie 11.
> - 3. Jakie tempa przewijania gracz wybiera i gdzie stoi przełącznik tempa?
>   - Answer: Droga A — pięć przycisków „1×”, „2×”, „4×”, „8×”, „16×” w wierszu stanu obok „Pauza”; wybrany wyróżniony jak istniejący „przycisk wybrany w grupie”, więc bez zmian w styleguidzie. 480 minut Lasu trwa 8 minut przy 1× i 30 sekund przy 16×. Słabe punkty nazwane w pytaniu: przy 16× ekran przeskakuje o 3,2 minuty gry na odświeżenie co 200 ms; tempa 2×, 4× i 8× to propozycja agenta, nie zapis z loop; czas płynie też, gdy karta przeglądarki jest ukryta, więc przy 16× przejście na inną kartę na 30 sekund przepuszcza całe 480 minut Lasu bez oglądania, z domknięciem albo śmiercią włącznie.
>   - Source: człowiek — Mariusz, 2026-10-25, „odpowiedzi zgodnie z rekomendacjami” (rekomendacja A). Materiał pytania, osobno: fakt z kodu loop2 `9a5f360` — zegar widoku czyta czas co 200 ms (`src/browser/view/clock.ts:17`, `:32`), czas ukrytej karty się liczy (`clock.ts:19`–`22`: “Time elapsed while the tab is hidden counts too”), tempo stoi w danych jako `gameMinutesPerRealSecond: 1` (`src/browser/sim/data/balance.ts:2`); dane loop `src/sim/data/balance.ts:71` (`cdc7c0d`): „Ile minut czasu gry mija w jednej sekundzie realnej przy mnożniku 1×.”; koncepcja `koncepcja_projektowa.md`, linia 949: „wprawę w 41 sekund na 16× […]”.
> - 4. Co dzieje się z wybranym tempem przy pauzie, „Restart”, „Zakończ” i kolejnym wysłaniu postaci?
>   - Answer: Droga A — wybrane tempo zostaje, aż gracz je zmieni: przez pauzę, „Restart”, „Zakończ” i kolejne wysłanie; nowa gra zaczyna od 1×. Słaby punkt nazwany w pytaniu: kto skończył przejście na 16×, zaczyna następne od razu na 16× i może przegapić jego początek; przy ukrytej karcie wysłanie maga przepuszcza wtedy całe 480 minut Lasu w 30 sekund bez oglądania.
>   - Source: człowiek — Mariusz, 2026-10-25, „odpowiedzi zgodnie z rekomendacjami” (rekomendacja A). Zatrzymanie przy odkryciu jest tą samą pauzą co „Pauza” — odpowiedź człowieka na pytanie 3 (1) zadania 6, droga P (Mariusz, 2026-10-25, „wszystko zgodnie z rekomendacjami”; dokument zadania 6 `_zadania/odkrywanie_loop2.md`, pytanie 3: „zatrzymania przez odkrycie nie da się odróżnić w stanie gry od pauzy gracza, więc wszystko, co traktuje pauzę, traktuje oba tak samo (np. wybrane tempo z pytania Q4 zadania 7)”). Fakt z kodu, osobno: wysłanie i „Restart” (wspólne `startRun`, `src/browser/sim/game.ts:215`) oraz „Zakończ” (`:329`) zdejmują dziś pauzę (`paused: false`), loop2 `9a5f360`.

#### `task.md:63-65`

> - 13. Co robi wybranie tempa w czasie pauzy — także w zatrzymaniu przy odkryciu?
>   - Answer: Droga A — wybranie tempa w pauzie, także w zatrzymaniu przy odkryciu, zmienia tempo, a przejście stoi dalej aż do „Wznów”; pauza zostaje osobnym aktem. Słaby punkt nazwany w pytaniu: gracz w pauzie klika „16×” i nic się nie rusza — musi jeszcze kliknąć „Wznów”.
>   - Source: człowiek — Mariusz, 2026-10-26, „przyjmuję rekomendacje” (rekomendacja A spośród dróg: A — zmienia tempo, przejście stoi do „Wznów”; B — zmienia tempo i wznawia przejście; C — w pauzie przyciski tempa widoczne, ale nieaktywne). Zatrzymanie przy odkryciu jest tą samą pauzą co „Pauza” — pytanie 4. Fakt z kodu, osobno: w pauzie wiersz mówi dziś „Minuta {minuta} · {czynność} (pauza)”, a przejście rusza dalej przyciskiem „Wznów” (`src/browser/view/status-row.ts:27`–`44`), loop2 `9a5f360`.

#### `task.md:106-106`

> - Czy przy odkryciu przepada też niepełna reszta czasu realnego przeniesiona z wcześniejszych przekazań, jak przy śmierci (`src/browser/sim/game.ts:361`–`362`, loop2 `9a5f360`: “Where the character dies, time stops there and nothing carries over.”) — wiersz O4 dokumentu zadania 6 i wiersz 4 *Settlements to record* mówią tylko o reszcie czasu przekazanego w tym samym wywołaniu; gracz różnicy nie widzi, bo reszta jest krótsza niż 1/tempo sekundy realnej, ale test niezmiennika `player-map-run-pace` ją ustala.

#### `task.md:166-173`

> Candidates: 14 shown, 14 accepted — 2026-10-28
>
> | # | Settlement | Kind | Source | What the cycle would otherwise guess |
> |---|---|---|---|---|
> | 1 | Przejście, które gracz uruchamia, idzie minutę gry na sekundę realną razy tempo, które gracz wybiera spośród 1×, 2×, 4×, 8× i 16×, a pauza zostaje: wybranie tempa w pauzie, także w zatrzymaniu przy odkryciu, zmienia tempo, a przejście stoi dalej aż do „Wznów”. | decision | pytania 2 i 3, drogi A (Mariusz, 2026-10-25); zdanie o wybraniu tempa w pauzie — pytanie 13, droga A (Mariusz, 2026-10-26) | jakie tempa daje gra, czy D-21 dalej odrzuca szybsze tempo i czy wybranie tempa w pauzie wznawia przejście |
> | 2 | Wybrane tempo zostaje, aż gracz je zmieni — przez pauzę, „Restart”, „Zakończ” i kolejne wysłanie postaci — a nowa gra zaczyna od 1×. | decision | pytanie 4, droga A (Mariusz, 2026-10-25) | czy każde nowe przejście albo restart wraca do 1× |
> | 3 | Gracz wybiera tempo pięcioma przyciskami „1×”, „2×”, „4×”, „8×”, „16×” w wierszu stanu przejścia obok „Pauza”, a wybrane tempo jest przyciskiem wybranym w grupie. | decision | pytanie 3, droga A (Mariusz, 2026-10-25) | gdzie stoi przełącznik tempa i z której kontrolki go zbudować |
> | 4 | Czas realny przekazany symulacji dla przejścia, które gracz uruchamia, przesuwa je, aż się skończy, o jedną minutę gry za każdą pełną 1/tempo sekundy realnej przekazanej poza pauzą — przy 16× za każdą pełną 1/16 sekundy — a niepełna reszta przechodzi na następne przekazanie czasu; w czasie pauzy przejście stoi, a po minucie gry, w której coś odkryto, przejście staje w pauzie, chyba że się w niej skończyło, i reszta czasu realnego przekazanego w tym samym wywołaniu przepada. | invariant | pytania 2, 3 i 11, drogi A (Mariusz, 2026-10-25); „niepełna reszta przechodzi na następne przekazanie czasu” — fakt z kodu, nie odpowiedź człowieka: dziś każda pełna przeskalowana sekunda staje się minutą gry, a reszta przechodzi na następne wywołanie (`src/browser/sim/game.ts:357`–`359`, loop2 `9a5f360`); część o odkryciu — wiersz O4 dokumentu zadania 6 (`_zadania/odkrywanie_loop2.md`, sha256 755bed2ab43d; pytanie 3 (1) P i pytanie 11 A tamtego zadania, Mariusz, 2026-10-25), przyjęty przy cięciu tamtego zadania bez zmian (Mariusz, 2026-10-26, „wszystko zgodnie z rekomendacjami”): „po minucie gry, w której coś odkryto, przejście staje w pauzie, a reszta czasu realnego przekazanego w tym samym wywołaniu przepada”; „chyba że się w niej skończyło” — pytanie 6, droga A (Mariusz, 2026-10-25): po domknięciu czas stoi, a „Pauza” znika | czy test niezmiennika sprawdza tempo inne niż 1× i odkrycie w środku jednej sekundy realnej przy 16×, gdy sekunda niesie do 16 minut gry, czy tempo przesuwa przejście minutami co 1/tempo sekundy, czy skokiem o tempo minut raz na sekundę, i czy niezmiennik łączy obie zmiany |

#### `task.md:185-189`

> Uwagi do wierszy:
>
> - Wiersz 1 jest nową odpowiedzią D-21; wiersz 4 — nowym brzmieniem `player-map-run-pace`, które łączy tempo z zatrzymaniem przy odkryciu, zapisanym przez zadanie 6 z wiersza O4 jego dokumentu; wiersz 5 — zdaniem dopisanym do D-71, obok zdań o odkryciu, które zadanie 6 zapisało z wiersza O3 jego dokumentu; wiersz 7 — także zdaniem o przyciskach tempa po śmierci, dopisanym do D-62; wiersz 8 — nowym brzmieniem pojęcia `map run restart`; wiersz 12 — nowym brzmieniem D-122, którą zadanie 6 zapisało z wiersza O2 jego dokumentu; wiersz 13 — nowym brzmieniem `minute-span-split`, po brzmieniu z minutą odkrycia, które zadanie 6 zapisało z wiersza O5 jego dokumentu; wiersz 14 — domknięciem dopisanym do zdania D-93 o końcach przejścia, po których liczniki zostają.
> - Wiersz 6 mówi o edycji programu: przełączenie postaci na inny program w trakcie ręcznego przejścia, które wnosi zadanie 12, zeruje passę także wtedy, gdy nowy program ma te same reguły (`streak-program-change/1` w definicji zatwierdzonej ponownie 2026-10-28). Słowa „Spośród edycji programu” i „edycja” w miejscu „zmiana” zawężają wiersz do tego, o co pytało pytanie 9 — odświeżenie dokumentu 2026-10-28 po uwadze krytyki planu; znaczenie przyjętego wiersza dla edycji się nie zmienia.
> - Wiersz 4: „chyba że się w niej skończyło” wynika z przyjętej drogi A pytania 6 (po domknięciu czas stoi, a „Pauza” znika) i idzie razem z wierszem 12: przejście domknięte w minucie odkrycia nie staje w pauzie. O4 zostaje bez zmian: w zadaniu 6 przejście nie ma domknięcia, a w minucie śmierci odkrycie nie zapada — skutek kończącej się akcji wtedy nie zapada (To do 5 zadania 6, D-71), a pierwsze wychłodzenie przychodzi w pierwszym przejściu nowej gry, gdy postać ma pełne zdrowie; wyjątek wnosi wiersz 4 razem z domknięciem.

#### `spec.md:84-137`

> ### 1. The pace stands in the game state, and the simulation applies it
>
> The game state gains the field `pace`, the multiplier the player picked; `newGame` sets it to 1. A
> new simulation function `setPace(state, pace)` sets it and changes nothing else — not the pause, not
> the discovery held, not the carried real time — with or without a map run, and throws on a pace
> outside the list of paces in the data. `send`, `restart`, `end` and `setPaused` leave it as it is,
> so it survives them as row 2 requires. `passRealTime` multiplies the real milliseconds it receives
> by `BALANCE.gameMinutesPerRealSecond` and by `state.pace`.
>
> The list of paces stands in `src/browser/sim/data/balance.ts` beside `gameMinutesPerRealSecond`,
> which stays 1 and keeps the meaning loop gives it — game minutes per real second at 1×. The view
> builds its five buttons from that list and labels each as the number followed by „×”.
>
> The view's handler for a pace button first flushes the clock, as `togglePause` and the program
> editor already do, then applies `setPace`; real time elapsed before the click is passed at the old
> pace.
>
> Ways rejected:
>
> - the pace held by the view, which multiplies the elapsed milliseconds before `passRealTime` — the
>   simulation would receive scaled time as if it were real, which D-04's verification lists as what
>   complies only when the view passes the real time elapsed; `player-map-run-pace` could no longer be
>   tested on the simulation; the earning loop of task 18, which the speed control must not reach,
>   would receive the same scaled time;
> - the pace held by the view and passed to `passRealTime` as an extra argument — the simulation stays
>   pure, but the view would draw which button is selected from a value outside the game state,
>   against D-04's "draws the game only from the game state", and a saved game (task 16) would not
>   carry it.
>
> Cost if wrong: small. The pace is one field and one function; moving it to the view later changes
> the signature of `passRealTime` and the view's wiring, not the map run.
>
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
