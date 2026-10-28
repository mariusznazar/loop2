# Handoff — executor of slice 2, task `rozwiazanie-lasu`

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
- Stage: the executor of slice 2 of the plan `.runs/task-cycles/rozwiazanie-lasu/plan.md`.
  Boundary: this slice. Make no other slice, and do not run the product's full gate (`npm test`
  without a file) — the orchestrator runs it.
- Commit on the branch by explicit paths (`git add <file>…`, never `-A` or `.`), messages in English
  in the repo's form (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`), and
  leave the worktree clean.
- Report path: `.runs/task-cycles/rozwiazanie-lasu/reports/14-slice2-report.md`
- Frozen task: `.runs/task-cycles/rozwiazanie-lasu/task.md`; reviewed spec:
  `.runs/task-cycles/rozwiazanie-lasu/spec.md`; plan: `.runs/task-cycles/rozwiazanie-lasu/plan.md`.

## Answers of step 4

- Trust boundary: no. Irreversible operation: no.

## Your slice — the plan's section, word for word

### Slice 2 — pace buttons in the status row

- **Goal:** The status row shows, beside „Pauza”, five pace buttons built once from the list of
  paces in the data, each labelled as the number followed by „×”, each the shared button whose
  selected state follows `state.pace` through `setButtonSelected`. They stay visible and active
  while paused, the pause at a discovery included, and are hidden together with „Pauza” after the
  character's death. `StatusRowControls` gains `setPace(pace)`; the game view turns it into
  `clock.flush()` and then the simulation's `setPace`, so real time elapsed before the click is
  passed at the old pace. „Restart” and „Zakończ” stay as they are. No new token, role or shared
  control, so the styleguide and the kitchen-sink page are unchanged.
- **Change:** `src/browser/view/status-row.ts` · `src/browser/view/game-view.ts` ·
  `tests/view/status-row.test.mjs`
- **Read:** `.runs/task-cycles/rozwiazanie-lasu/task.md:16-17` To do ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:21-21` To do ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:33-38` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:60-65` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:166-172` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:176-176` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:84-114` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:268-279` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:344-351` Left to the maker ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:370-371` Left to the maker ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:422-438` D-21, with
  Foundation entries row 1 · Foundation entries row 2 (the pace stays) · Foundation entries row 3
  (five buttons) · `foundations/decisions.md:1172-1185` D-62, with Foundation entries row 7 ·
  `foundations/decisions.md:2094-2116` D-122 · `foundations/decisions.md:735-748` D-36 ·
  `foundations/decisions.md:795-808` D-40 · `foundations/decisions.md:855-868` D-44 ·
  `foundations/decisions.md:1363-1374` D-75 · `foundations/decisions.md:1534-1545` D-88 ·
  Foundation entries row manual map run · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/view/controls/button.ts` · `src/browser/view/clock.ts` ·
  `src/browser/sim/game.ts` · `src/browser/sim/data/balance.ts` · `src/browser/sim/types.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from a failing case of `tests/view/status-row.test.mjs` in which the row built on
  the hand-made document shows five pace buttons with the one of the state's pace selected; then
  `npm test -- tests/view/status-row.test.mjs` · `npm test -- tests/view/clock.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` ·
  `npm test -- tests/invariants/test_browser_view_framework.py`
- **Depends on:** Slice 1 · Foundation entries rows 1, 2, 3, 7

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
- D-62: `foundations/decisions.md:1188-1201`
- D-122: `foundations/decisions.md:2115-2149`
- D-36: `foundations/decisions.md:751-764`
- D-40: `foundations/decisions.md:811-824`
- D-44: `foundations/decisions.md:871-884`
- D-75: `foundations/decisions.md:1379-1390`
- D-88: `foundations/decisions.md:1550-1561`
- map run: `foundations/glossary.md:18-23`
- manual map run: `foundations/glossary.md:131-135`
- D-129: `foundations/decisions.md:2296-2318`
- D-130: `foundations/decisions.md:2320-2340`
- D-132: `foundations/decisions.md:2369-2392`

The ranges of `task.md` and `spec.md` in your *Read* hold as written; those passages are copied
below. Code and test files in your *Read* are named by path; read them as they stand now.

## Passages of the task and the spec your *Read* names, word for word

#### `task.md:16-17`

> 1. Gracz przewija czas ręcznego przejścia: w wierszu stanu przejścia obok „Pauza” stoi pięć przycisków „1×”, „2×”, „4×”, „8×” i „16×”, a wybrane tempo jest wyróżnione jak przycisk wybrany w grupie (D-44). Przejście idzie minutę gry na sekundę realną razy wybrane tempo, a pauza zostaje (pytanie 2): „Pauza” zatrzymuje przejście, a „Wznów” je wznawia. Wybranie tempa w czasie pauzy — także w zatrzymaniu przy odkryciu — zmienia tempo, a przejście stoi dalej aż do „Wznów” (pytanie 13).
> 2. Wybrane tempo zostaje, aż gracz je zmieni: przez pauzę — także zatrzymanie czasu przy odkryciu, które wnosi zadanie 6 — „Restart”, „Zakończ” i kolejne wysłanie postaci; nowa gra zaczyna od 1×.

#### `task.md:21-21`

> 6. Po śmierci postaci przyciski tempa znikają razem z „Pauza”, a „Restart” rusza w tempie wybranym wcześniej (pytanie 12); reszta ekranu po śmierci zostaje jak dziś (D-62), a wiersz stanu mówi dalej „Minuta {minuta śmierci} · {przyczyna}”.

#### `task.md:33-38`

> - 3. Jakie tempa przewijania gracz wybiera i gdzie stoi przełącznik tempa?
>   - Answer: Droga A — pięć przycisków „1×”, „2×”, „4×”, „8×”, „16×” w wierszu stanu obok „Pauza”; wybrany wyróżniony jak istniejący „przycisk wybrany w grupie”, więc bez zmian w styleguidzie. 480 minut Lasu trwa 8 minut przy 1× i 30 sekund przy 16×. Słabe punkty nazwane w pytaniu: przy 16× ekran przeskakuje o 3,2 minuty gry na odświeżenie co 200 ms; tempa 2×, 4× i 8× to propozycja agenta, nie zapis z loop; czas płynie też, gdy karta przeglądarki jest ukryta, więc przy 16× przejście na inną kartę na 30 sekund przepuszcza całe 480 minut Lasu bez oglądania, z domknięciem albo śmiercią włącznie.
>   - Source: człowiek — Mariusz, 2026-10-25, „odpowiedzi zgodnie z rekomendacjami” (rekomendacja A). Materiał pytania, osobno: fakt z kodu loop2 `9a5f360` — zegar widoku czyta czas co 200 ms (`src/browser/view/clock.ts:17`, `:32`), czas ukrytej karty się liczy (`clock.ts:19`–`22`: “Time elapsed while the tab is hidden counts too”), tempo stoi w danych jako `gameMinutesPerRealSecond: 1` (`src/browser/sim/data/balance.ts:2`); dane loop `src/sim/data/balance.ts:71` (`cdc7c0d`): „Ile minut czasu gry mija w jednej sekundzie realnej przy mnożniku 1×.”; koncepcja `koncepcja_projektowa.md`, linia 949: „wprawę w 41 sekund na 16× […]”.
> - 4. Co dzieje się z wybranym tempem przy pauzie, „Restart”, „Zakończ” i kolejnym wysłaniu postaci?
>   - Answer: Droga A — wybrane tempo zostaje, aż gracz je zmieni: przez pauzę, „Restart”, „Zakończ” i kolejne wysłanie; nowa gra zaczyna od 1×. Słaby punkt nazwany w pytaniu: kto skończył przejście na 16×, zaczyna następne od razu na 16× i może przegapić jego początek; przy ukrytej karcie wysłanie maga przepuszcza wtedy całe 480 minut Lasu w 30 sekund bez oglądania.
>   - Source: człowiek — Mariusz, 2026-10-25, „odpowiedzi zgodnie z rekomendacjami” (rekomendacja A). Zatrzymanie przy odkryciu jest tą samą pauzą co „Pauza” — odpowiedź człowieka na pytanie 3 (1) zadania 6, droga P (Mariusz, 2026-10-25, „wszystko zgodnie z rekomendacjami”; dokument zadania 6 `_zadania/odkrywanie_loop2.md`, pytanie 3: „zatrzymania przez odkrycie nie da się odróżnić w stanie gry od pauzy gracza, więc wszystko, co traktuje pauzę, traktuje oba tak samo (np. wybrane tempo z pytania Q4 zadania 7)”). Fakt z kodu, osobno: wysłanie i „Restart” (wspólne `startRun`, `src/browser/sim/game.ts:215`) oraz „Zakończ” (`:329`) zdejmują dziś pauzę (`paused: false`), loop2 `9a5f360`.

#### `task.md:60-65`

> - 12. Czy po śmierci postaci przyciski tempa znikają tak jak po domknięciu?
>   - Answer: Droga A — po śmierci przyciski tempa znikają razem z „Pauza”; zostają „Restart” i „Zakończ”, a „Restart” rusza w tempie wybranym wcześniej. D-62 dostaje to zdanie (wiersz 7 *Settlements to record*). Słabe punkty nazwane w pytaniu: na ekranie końca gracz nie widzi, w jakim tempie ruszy „Restart”; kto chce powtórzyć przejście wolniej, zmienia tempo dopiero po „Restart”, gdy przejście już idzie.
>   - Source: człowiek — Mariusz, 2026-10-26, „przyjmuję rekomendacje” (rekomendacja A spośród dróg: A — znikają razem z „Pauza”; B — po śmierci zostają czynne, po domknięciu znikają; C — na obu ekranach końca widoczne i nieaktywne; D — na obu ekranach końca widoczne i czynne). Cytat materiału: D-62 jak w pytaniu 6. Fakt z kodu, osobno: po śmierci przycisk pauzy znika (`src/browser/view/status-row.ts:38`–`44`: “null after the character's death, when time stands still and the button is gone (D-62)”), loop2 `9a5f360`.
> - 13. Co robi wybranie tempa w czasie pauzy — także w zatrzymaniu przy odkryciu?
>   - Answer: Droga A — wybranie tempa w pauzie, także w zatrzymaniu przy odkryciu, zmienia tempo, a przejście stoi dalej aż do „Wznów”; pauza zostaje osobnym aktem. Słaby punkt nazwany w pytaniu: gracz w pauzie klika „16×” i nic się nie rusza — musi jeszcze kliknąć „Wznów”.
>   - Source: człowiek — Mariusz, 2026-10-26, „przyjmuję rekomendacje” (rekomendacja A spośród dróg: A — zmienia tempo, przejście stoi do „Wznów”; B — zmienia tempo i wznawia przejście; C — w pauzie przyciski tempa widoczne, ale nieaktywne). Zatrzymanie przy odkryciu jest tą samą pauzą co „Pauza” — pytanie 4. Fakt z kodu, osobno: w pauzie wiersz mówi dziś „Minuta {minuta} · {czynność} (pauza)”, a przejście rusza dalej przyciskiem „Wznów” (`src/browser/view/status-row.ts:27`–`44`), loop2 `9a5f360`.

#### `task.md:166-172`

> Candidates: 14 shown, 14 accepted — 2026-10-28
>
> | # | Settlement | Kind | Source | What the cycle would otherwise guess |
> |---|---|---|---|---|
> | 1 | Przejście, które gracz uruchamia, idzie minutę gry na sekundę realną razy tempo, które gracz wybiera spośród 1×, 2×, 4×, 8× i 16×, a pauza zostaje: wybranie tempa w pauzie, także w zatrzymaniu przy odkryciu, zmienia tempo, a przejście stoi dalej aż do „Wznów”. | decision | pytania 2 i 3, drogi A (Mariusz, 2026-10-25); zdanie o wybraniu tempa w pauzie — pytanie 13, droga A (Mariusz, 2026-10-26) | jakie tempa daje gra, czy D-21 dalej odrzuca szybsze tempo i czy wybranie tempa w pauzie wznawia przejście |
> | 2 | Wybrane tempo zostaje, aż gracz je zmieni — przez pauzę, „Restart”, „Zakończ” i kolejne wysłanie postaci — a nowa gra zaczyna od 1×. | decision | pytanie 4, droga A (Mariusz, 2026-10-25) | czy każde nowe przejście albo restart wraca do 1× |
> | 3 | Gracz wybiera tempo pięcioma przyciskami „1×”, „2×”, „4×”, „8×”, „16×” w wierszu stanu przejścia obok „Pauza”, a wybrane tempo jest przyciskiem wybranym w grupie. | decision | pytanie 3, droga A (Mariusz, 2026-10-25) | gdzie stoi przełącznik tempa i z której kontrolki go zbudować |

#### `task.md:176-176`

> | 7 | Po domknięciu ekran zostaje na stanie z minuty domknięcia i czas stoi, wiersz stanu mówi w Lesie „Minuta {minuta} · Las rozwiązany” w roli `positive`, „Pauza” i przyciski tempa znikają, a gracz ma „Restart” i „Zakończ” jak po śmierci — także po śmierci przyciski tempa znikają razem z „Pauza”. | decision | pytanie 6, droga A (Mariusz, 2026-10-25); zdanie o ekranie po śmierci — pytanie 12, droga A (Mariusz, 2026-10-26) | ekran po domknięciu — np. powrót do siedziby z komunikatem — i czy po śmierci przyciski tempa zostają, czynne albo nieaktywne |

#### `spec.md:84-114`

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

#### `spec.md:268-279`

> ### 6. The screens
>
> - **Status row** (`src/browser/view/status-row.ts`): during a map run that has not ended, the text
>   is „Minuta {minute} · {activity} · Passa {streak}/{streak requirement of the map}”, with
>   „ (pauza)” at its end while paused (To do 8, question 16). After death it is as today. After a
>   completion it is the text of decision 4, and the text element carries the role `positive` then
>   and only then. The five pace buttons are made once, beside „Pauza”, each a shared button whose
>   selected state follows `state.pace` through `setButtonSelected`; they stay visible and active
>   during a pause, the pause at a discovery included, and are hidden, with „Pauza”, once the map run
>   has ended, in death or in a completion. „Restart” and „Zakończ” stay as they are.
>   `StatusRowControls` gains `setPace(pace)`, which the game view turns into `clock.flush()` and
>   `setPace`.

#### `spec.md:344-351`

> ## Left to the maker
>
> - The exact identifiers of the new fields, the function, the predicate of an ended map run and the
>   event, where they keep the shapes above; the TypeScript type of the pace, derived from the list of
>   paces in the data.
> - The order of the controls in the status row, provided the pace buttons stand beside „Pauza”; the
>   accessible names of the pace buttons; the CSS class names and how the status text switches its
>   role.

#### `spec.md:370-371`

> - The hand check in a browser of the pace buttons, the completion screen and the headquarters' texts
>   (D-75, D-88).

## Report

Write your full report to the report path as the method gives it, with each check's command and
exit code, and return only your status, your commits, a one-line check result naming what failed
or did not run, and the report path.
