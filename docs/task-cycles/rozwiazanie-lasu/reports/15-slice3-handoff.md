# Handoff — executor of slice 3, task `rozwiazanie-lasu`

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
- Stage: the executor of slice 3 of the plan `.runs/task-cycles/rozwiazanie-lasu/plan.md`.
  Boundary: this slice. Make no other slice, and do not run the product's full gate (`npm test`
  without a file) — the orchestrator runs it.
- Commit on the branch by explicit paths (`git add <file>…`, never `-A` or `.`), messages in English
  in the repo's form (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`), and
  leave the worktree clean.
- Report path: `.runs/task-cycles/rozwiazanie-lasu/reports/15-slice3-report.md`
- Frozen task: `.runs/task-cycles/rozwiazanie-lasu/task.md`; reviewed spec:
  `.runs/task-cycles/rozwiazanie-lasu/spec.md`; plan: `.runs/task-cycles/rozwiazanie-lasu/plan.md`.

## Answers of step 4

- Trust boundary: no. Irreversible operation: no.

## Your slice — the plan's section, word for word

### Slice 3 — the streak counted in each game minute

- **Goal:** Each row of `MAPS` gains `solving`, an object of named requirements of which Las holds
  one, `streak: 480`; `solvingText`, the condition sentence without the map's name, for Las
  „480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu”; and `completionText`, for
  Las „Las rozwiązany” (spec decisions 3 and 4). `bodyMinute` also reports whether the character
  lost health to cold or hunger in that minute — chilled or starving after its step. `MapRun`
  gains `streak`, 0 when a map run starts, by send and by restart; in each game minute, after the
  body step, it grows by one where the body step reports no loss and becomes 0 where it reports
  one, in the branch of death too, so a map run ended in death holds 0. Nothing ends a map run at
  the condition yet (Slice 5), and no longest streak is kept (row 11). A data test checks that each
  map's `solving` holds at least one requirement, each a whole number above zero, and Las's three
  values against the task.
- **Change:** `src/browser/sim/data/maps.ts` · `src/browser/sim/body.ts` ·
  `src/browser/sim/types.ts` · `src/browser/sim/run.ts` · `tests/sim/data.test.mjs` ·
  `tests/sim/body.test.mjs` · `tests/sim/streak.test.mjs`
- **Read:** `.runs/task-cycles/rozwiazanie-lasu/task.md:18-19` To do ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:20-20` To do ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:23-23` To do ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:39-50` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:89-90` Context ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:97-98` Context ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:166-169` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:174-174` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:180-180` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:182-182` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:139-193` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:195-210` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:245-266` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:344-371` Left to the maker ·
  `foundations/decisions.md:356-373` D-18 · `foundations/decisions.md:440-464` D-22 ·
  `foundations/decisions.md:502-526` D-24 · `foundations/decisions.md:1142-1170` D-60, D-61 ·
  `foundations/decisions.md:1307-1320` D-71, with Foundation entries row 5 · Foundation entries
  row 11 (no longest streak) · `foundations/invariants.md:526-534` minute-span-split, with
  Foundation entries row 13 · `foundations/invariants.md:165-174` map-run-repeatability ·
  `foundations/invariants.md:212-244` simulation-isolation, simulation-inputs, content-identifiers ·
  `foundations/decisions.md:1430-1441` D-80 · `foundations/decisions.md:1456-1467` D-82 ·
  `foundations/decisions.md:1482-1493` D-84 · `foundations/glossary.md:12-23` game minute, map run ·
  Foundation entries row streak · `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-content-data.md` · `guidelines/testing.md` · `src/browser/sim/game.ts` ·
  `src/browser/sim/understanding.ts:143-175` · `src/browser/sim/data/balance.ts` ·
  `tests/sim/program-fixture.mjs` · `tests/sim/understanding-fixture.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from a failing case of `tests/sim/streak.test.mjs` in which ten game minutes
  with no loss to cold or hunger give a streak of 10 and a minute of loss sets it to 0; then
  `npm test -- tests/sim/streak.test.mjs` · `npm test -- tests/sim/body.test.mjs` ·
  `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/acceptance.test.mjs` ·
  `npm test -- tests/sim/purity.test.mjs` · `npm test -- tests/invariants/test_minute_span_split.py` ·
  `npm test -- tests/invariants/test_map_run_repeatability.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_content_identifiers.py`
- **Depends on:** Slice 1 · Foundation entries rows 5, 11, 13 · `streak`

## Current ranges of the foundation entries your *Read* names

The plan's line ranges of `foundations/` are stale: the plan's *Foundation entries* were written in
commit `82bbb1c` (and later slices may have moved lines). The ranges below hold now; where they
differ from the plan's, these hold. "Foundation entries row N" of the plan maps to: row 1 D-21,
row 2 D-129, row 3 D-130, row 4 `player-map-run-pace`, row 5 D-71, row 6 D-131, row 7 D-132 and
D-62, row 8 `map run restart`, row 9 D-133, row 10 D-134, row 11 D-135, row 12 D-122, row 13
`minute-span-split`, row 14 D-93; and the rows `completion`, `solved map`, `streak`,
`manual map run` (glossary) and `streak-program-change` (invariant). Read each entry whole.

- D-18: `foundations/decisions.md:356-373`
- D-22: `foundations/decisions.md:456-480`
- D-24: `foundations/decisions.md:518-542`
- D-60: `foundations/decisions.md:1158-1171`
- D-61: `foundations/decisions.md:1173-1186`
- D-71: `foundations/decisions.md:1323-1336`
- D-80: `foundations/decisions.md:1446-1457`
- D-82: `foundations/decisions.md:1472-1483`
- D-84: `foundations/decisions.md:1498-1509`
- map-run-repeatability: `foundations/invariants.md:165-174`
- simulation-isolation: `foundations/invariants.md:214-224`
- simulation-inputs: `foundations/invariants.md:226-234`
- content-identifiers: `foundations/invariants.md:236-246`
- minute-span-split: `foundations/invariants.md:528-536`
- game minute: `foundations/glossary.md:12-16`
- map run: `foundations/glossary.md:18-23`
- streak: `foundations/glossary.md:150-155`

The ranges of `task.md` and `spec.md` in your *Read* hold as written; those passages are copied
below. Code and test files in your *Read* are named by path; read them as they stand now.

## Passages of the task and the spec your *Read* names, word for word

#### `task.md:18-19`

> 3. Wiersz mapy Las w danych gry niesie warunek rozwiązania — passę 480 minut gry — i zdanie tego warunku, które siedziba pokazuje przy mapie.
> 4. Przejście liczy passę: po kroku ciała minuty gry, w której postać nie traci zdrowia z zimna ani z głodu, passa rośnie o jeden, a minuta z taką utratą ją zeruje. Passę zeruje na każdej mapie każda zmiana reguł programu albo grup reguł wykonywanych w przejściu, po której program różni się od programu sprzed niej — dodanie, usunięcie i przestawienie reguły, zmiana jej warunku albo akcji, zmiana grupy — także w trakcie pauzy; czynność edytora, po której program jest taki sam jak przed nią, na przykład „↑” przy pierwszej regule, zostawia passę. Zerowanie passy nie przerywa trwającej akcji postaci (D-20). Każde przejście — po wysłaniu i po „Restart” — zaczyna z passą zero.

#### `task.md:20-20`

> 5. Gdy przejście spełni warunek rozwiązania mapy — w Lesie: gdy passa dojdzie do 480 — reszta tej minuty gry dzieje się do końca — ognie tracą minutę palenia, kafelki się odnawiają, kończąca się akcja postaci daje skutek — a w miejscu wyboru reguły przejście kończy się domknięciem. Po domknięciu ekran zostaje na stanie z minuty domknięcia i czas stoi; wiersz stanu mówi w Lesie „Minuta {minuta} · Las rozwiązany”, np. „Minuta 480 · Las rozwiązany”, w roli `positive` (napis dla innych map — pytanie przeniesione do cyklu); „Pauza” i przyciski tempa znikają, a zostają „Restart” (to samo ziarno, od minuty zero) i „Zakończ” (powrót do siedziby). Liczniki reguł programu zostają po domknięciu przy regułach jak po śmierci i po „Zakończ”, aż do następnego wysłania albo „Restart” (pytanie 17). Gdy w minucie domknięcia coś odkryto (zadanie 6), ekran domknięcia zastępuje pauzę po odkryciu, a pod jego wierszem stanu stoi też linia odkrycia w roli `discovery` z tym, co odsłonięto, aż gracz wybierze „Restart” albo „Zakończ”; odkrycie wchodzi do Zrozumienia (pytanie 15).

#### `task.md:23-23`

> 8. W trakcie przejścia wiersz stanu mówi „Minuta {minuta} · {czynność} · Passa {passa}/{liczba z warunku}”, np. „Minuta 312 · Eksploruje · Passa 120/480”; w pauzie wiersz kończy się dopiskiem „ (pauza)”, np. „Minuta 312 · Eksploruje · Passa 120/480 (pauza)” (pytanie 16). W siedzibie przy mapie stoi zdanie warunku rozwiązania z danych mapy, np. „Las — 480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu”.

#### `task.md:39-50`

> - 5. Gdzie i w jakiej postaci gracz widzi passę i warunek rozwiązania Lasu?
>   - Answer: Droga A — w trakcie przejścia wiersz stanu: „Minuta 312 · Eksploruje · Passa 120/480”; w siedzibie przy mapie zdanie warunku z danych mapy, np. „Las — 480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu”. Najdłuższej passy przejścia gra nie pokazuje; wiersz po śmierci zostaje jak dziś („Minuta 312 · Mag zamarzł”). Słaby punkt nazwany w pytaniu: dłuższy wiersz stanu i nowy tekst w danych mapy.
>   - Source: człowiek — Mariusz, 2026-10-25, „odpowiedzi zgodnie z rekomendacjami” (rekomendacja: A i bez najdłuższej passy). Fakt z kodu, osobno: wiersz stanu składa dziś „Minuta {minuta} · {czynność}”, z dopiskiem „ (pauza)” w pauzie (`src/browser/view/status-row.ts:27`–`35`), loop2 `9a5f360`. Materiał: test loop `src/sim/sim.test.ts:1950` („480 min · 10 × kamień”), dane loop `src/sim/data/maps.ts:165` („Osiem godzin bez jednej poprawki programu.”), `cdc7c0d`.
> - 6. Co widzi i co może zrobić gracz po domknięciu przejścia?
>   - Answer: Droga A — jak po śmierci: ekran zostaje na stanie z minuty domknięcia, czas staje, wiersz stanu mówi np. „Minuta 480 · Las rozwiązany” w roli `positive` („something works, is in order or is active now”, D-39), „Pauza” i przyciski tempa znikają, zostają „Restart” i „Zakończ”; pojęcie `map run restart` dostaje nowe brzmienie, bo dziś mówi tylko o ekranie po śmierci. Uzasadnienie przyjętej rekomendacji: jedno zachowanie dla obu końców przejścia.
>   - Source: człowiek — Mariusz, 2026-10-25, „odpowiedzi zgodnie z rekomendacjami” (rekomendacja A). Cytaty materiału: D-62 (`foundations/decisions.md`, `9a5f360`): “After a character's death the screen stays on the state of the game minute of death and time stands still, and the player has „Restart”, which starts the map run again with the same seed from game minute zero, and „Zakończ”, which returns to the screen from which the player sends the character.”; `map run restart` (`foundations/glossary.md`, `9a5f360`): “A map run restart is a map run of the same character on the same game map, which the player starts in place of the map run in progress or of a map run ended in the character's death that still stands on the screen.”
> - 7. Gdzie gracz widzi, że Las jest rozwiązany?
>   - Answer: Droga A — w siedzibie przy mapie: „Mapa: Las · rozwiązana” w roli `positive`, od pierwszego domknięcia którejkolwiek postaci. Rozwiązanie przepada przy odświeżeniu strony, dopóki zadanie 16 nie wniesie zapisu stanu gry.
>   - Source: człowiek — Mariusz, 2026-10-25, „odpowiedzi zgodnie z rekomendacjami” (rekomendacja A). Fakt z kodu, osobno: strona zaczyna od `newGame()` przy każdym wczytaniu (`src/browser/view/app.ts:24`), loop2 `9a5f360`.
> - 8. W której chwili minuty gry przejście się domyka i co z akcją postaci kończącą się w tej minucie?
>   - Answer: Droga A — passa rośnie po kroku ciała w minucie bez utraty zdrowia z zimna i głodu; gdy dojdzie do 480, reszta minuty dzieje się do końca (ognie, odnawianie, skutek kończącej się akcji), a potem przejście się domyka, bez wyboru nowej reguły; ekran po domknięciu pokazuje stan po całej minucie. Słaby punkt nazwany w pytaniu: dopisany ostatni krok D-71.
>   - Source: człowiek — Mariusz, 2026-10-25, „odpowiedzi zgodnie z rekomendacjami” (rekomendacja A). Cytat materiału: D-71 (`foundations/decisions.md`, `9a5f360`): “A game minute of a map run takes effect in this order: first the character's body […]; then, where its health has reached zero, the character dies in that minute and the map run ends there; otherwise what burns loses a minute of burning, tiles renew their stock, the action of the character ending in that minute takes effect, and the program picks a program rule from what that minute has made.” Materiał: test loop `src/sim/sim.test.ts:543` (`cdc7c0d`) — 10 minut bez uszczerbku daje passę 10.

#### `task.md:89-90`

> - Dane loop (`src/sim/data/`, commit `cdc7c0d`): Las ma `survivalMinutes: 480` (`maps.ts:154`) i zdanie celu „Osiem godzin bez jednej poprawki programu.” (`maps.ts:165`); tempo zapisano jako minuty gry na sekundę „przy mnożniku 1×” (`balance.ts:71`–`72`).
> - Testy loop (`src/sim/sim.test.ts`, commit `cdc7c0d`): passa liczy minuty bez uszczerbku — 10 minut daje 10 (`:543`); utrata zdrowia z zimna ją zeruje (`:548`); przejście pamięta najdłuższą passę, bo w chwili śmierci z zimna albo głodu bieżąca passa jest zerem (`:555`); edycja programu ją zeruje (`:569`); osiągnięcie progu domyka mapę i zamraża stan (`:574`); warunek mapy widać w skrócie „480 min · 10 × kamień” (`:1950`).

#### `task.md:97-98`

> - Nazwa „Las” w tekstach ekranu — „Las rozwiązany”, „Mapa: Las · rozwiązana”, zdanie warunku — idzie z danych mapy (niezmiennik `content-identifiers`).
> - Wytyczne testów `guidelines/testing.md` (D-73): oczekiwane liczby passy i progu biorą się z dokumentu zaakceptowanego zadania i definicji (D-80, D-82), a test symulacji podaje jawny stan, upływ czasu i ziarno (D-84); zmienione ścieżki gracza w przeglądarce — przyciski tempa, ekran domknięcia, napis w siedzibie — sprawdza się ręcznie (D-75, D-88).

#### `task.md:166-169`

> Candidates: 14 shown, 14 accepted — 2026-10-28
>
> | # | Settlement | Kind | Source | What the cycle would otherwise guess |
> |---|---|---|---|---|

#### `task.md:174-174`

> | 5 | Passa przejścia rośnie o jeden po kroku ciała minuty gry, w której postać nie traci zdrowia z zimna ani z głodu; gdy przejście spełni warunek rozwiązania mapy (w Lesie: passa dojdzie do 480), reszta minuty dzieje się do końca — ognie, odnawianie, skutek kończącej się akcji — a w miejscu wyboru reguły przejście się domyka. | decision | pytanie 8, droga A (Mariusz, 2026-10-25) | czy domknięcie przychodzi zaraz po kroku ciała, jak śmierć, i czy skutek kończącej się akcji przepada |

#### `task.md:180-180`

> | 11 | Najdłuższej passy przejścia gra dziś nie pokazuje. | decision | pytanie 5, część (b) (Mariusz, 2026-10-25: rekomendacja „nie dodawać jej teraz”, przyjęta) | czy przenieść z loop pamiętanie najdłuższej passy przejścia (test loop `src/sim/sim.test.ts:555`, `cdc7c0d`, wymieniony w *Context*) i pokazać ją na ekranie po śmierci |

#### `task.md:182-182`

> | 13 | Przejście przesuwane odcinkiem minut gry dochodzi do tego samego stanu, z tymi samymi zdarzeniami w tej samej kolejności, w każdej minucie gry, jakkolwiek podzielić odcinek na wywołania symulacji, aż do końca przejścia albo minuty odkrycia włącznie. | invariant | pytanie 14, droga A w brzmieniu A2 (Mariusz, 2026-10-26); część o minucie odkrycia — wiersz O5 dokumentu zadania 6 (sha256 755bed2ab43d), przyjęty przy cięciu tamtego zadania bez zmian (Mariusz, 2026-10-26, „wszystko zgodnie z rekomendacjami”) | czy test niezmiennika sprawdza domknięcie wypadające w środku odcinka minut, gdy przy 16× ekran dostaje naraz 3 albo 4 minuty gry, i czy zasada wymienia końce przejścia z osobna |

#### `spec.md:139-193`

> ### 3. The solving condition is an object of named requirements in the map's row
>
> Each row of `MAPS` (`src/browser/sim/data/maps.ts`) gains three fields:
>
> - `solving` — the solving condition, an object whose fields are its requirements, each named by its
>   kind; today it holds one, `streak`, the number of successive game minutes the streak must reach.
>   Las holds `streak: 480`. A map run meets the condition when it meets every requirement the object
>   holds;
> - `solvingText` — the sentence of the condition without the map's name, for Las the words after
>   „Las — ” in To do 8;
> - `completionText` — the whole text the status row shows after a completion, for Las
>   „Las rozwiązany”.
>
> Task 8 adds a requirement of beaten attacks as a second field of `solving`, and the map that opens a
> map as a field of the row beside `solving`, not inside it: opening a map is not solving it. Where a
> later map has no streak requirement, task 8 makes `streak` optional; that is a change of a type,
> not of the shape.
>
> A data test checks that each map's `solving` holds at least one requirement and that every
> requirement is a whole number above zero.
>
> Ways rejected:
>
> - a list of requirement objects, each with a `kind` — "all must hold" would read the same, but a list
>   admits two requirements of one kind and an order that means nothing, and checks one more level of
>   structure for no case the definition names;
> - flat fields on the row, as loop's `survivalMinutes` — the requirements of solving would stand
>   among the map's layout numbers, and "the condition" would have no single place for the simulation
>   to read or for the headquarters to name.
>
> Cost if wrong: a rename or a reshaping of one data row and the one function that reads it.
>
> ### 4. The texts after a completion and of the condition come from the map's data
>
> The status row after a completion reads „Minuta {minute of completion} · {completionText}”. The
> whole `completionText` stands in the data because its ending agrees with the map's name in gender
> and form — „Las rozwiązany”, a feminine name would take „rozwiązana”, and a name of several words,
> such as „Las — głębiej”, may need its own wording — which no pattern built from the name gives
> reliably.
>
> The headquarters shows the condition sentence as „{name} — {solvingText}”, the name taken from the
> map's data, which reproduces the example of To do 8 and keeps the name in one place of the row; the
> dash makes the composition correct for a name of any gender. The solved mark „Mapa: {name} ·
> rozwiązana” agrees with „Mapa”, not with the name, so the view composes it from the name alone.
>
> Ways rejected:
>
> - a pattern „{name} rozwiązany” in the view — wrong for a feminine or neuter name;
> - a grammatical gender field in the data from which the view picks the ending — more machinery than
>   one text per map, and still wrong for names that read badly with a bare participle;
> - the whole condition sentence, name included, in the data — the name would stand twice in one row
>   and could drift from `name`.
>
> Cost if wrong: a field renamed or a text moved between the data and the view; nothing in the
> simulation depends on it.

#### `spec.md:195-210`

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

#### `spec.md:245-266`

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
