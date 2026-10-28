# Handoff — executor of slice 6, task `rozwiazanie-lasu`

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
- Stage: the executor of slice 6 of the plan `.runs/task-cycles/rozwiazanie-lasu/plan.md`.
  Boundary: this slice. Make no other slice, and do not run the product's full gate (`npm test`
  without a file) — the orchestrator runs it.
- Commit on the branch by explicit paths (`git add <file>…`, never `-A` or `.`), messages in English
  in the repo's form (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`), and
  leave the worktree clean.
- Report path: `.runs/task-cycles/rozwiazanie-lasu/reports/18-slice6-report.md`
- Frozen task: `.runs/task-cycles/rozwiazanie-lasu/task.md`; reviewed spec:
  `.runs/task-cycles/rozwiazanie-lasu/spec.md`; plan: `.runs/task-cycles/rozwiazanie-lasu/plan.md`.

## Answers of step 4

- Trust boundary: no. Irreversible operation: no.

## Your slice — the plan's section, word for word

### Slice 6 — the screens of the streak, the completion and the solved map

- **Goal:** During a map run that has not ended the status text reads
  „Minuta {minute} · {activity} · Passa {streak}/{streak requirement of the map}”, with
  „ (pauza)” at its end while paused; after death it reads as today; after a completion it reads
  „Minuta {minute of completion} · {completionText of the map}” and the text element carries the
  role `positive` then and only then. The pause button and the pace buttons are hidden once the map
  run has ended, in death or in a completion, through the simulation's predicate of an ended map
  run; the line of a discovery held at a completion stands under the completion's status row
  until „Restart” or „Zakończ”, as the game state gives it. In the headquarters, in each
  character's row where the map is named, „Mapa: {name}” becomes „Mapa: {name} · rozwiązana” in
  `positive` once `solvedMaps` lists the map, and the condition sentence „{name} — {solvingText}”
  stands with it, solved or not; the headquarters re-renders that part when `solvedMaps` changes.
  Every name and text of a map comes from its data. `styles.css` gains rules giving the status
  text and the solved mark the colour `var(--positive)` where the module marks them; no new token,
  role or shared control.
- **Change:** `src/browser/view/status-row.ts` · `src/browser/view/headquarters.ts` ·
  `src/browser/styles.css` · `tests/view/status-row.test.mjs` · `tests/view/headquarters.test.mjs`
- **Read:** `.runs/task-cycles/rozwiazanie-lasu/task.md:20-23` To do ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:39-47` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:69-74` Questions to settle ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:97-98` Context ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:166-169` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/task.md:176-181` Settlements to record ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:171-193` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:268-293` Decisions ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:344-352` Left to the maker ·
  `.runs/task-cycles/rozwiazanie-lasu/spec.md:370-371` Left to the maker ·
  `foundations/decisions.md:356-373` D-18 · `foundations/invariants.md:234-244`
  content-identifiers · `foundations/decisions.md:735-748` D-36 · `foundations/decisions.md:780-793`
  D-39 · `foundations/decisions.md:855-868` D-44 · `foundations/decisions.md:1009-1029` D-53 ·
  `foundations/decisions.md:1172-1185` D-62, with Foundation entries row 7 ·
  `foundations/decisions.md:2094-2116` D-122, with Foundation entries row 12 · Foundation entries
  rows 9 (streak and condition shown) and 10 (solved mark) · `foundations/glossary.md:87-92`
  headquarters · Foundation entries rows completion, solved map, streak ·
  `foundations/decisions.md:1363-1374` D-75 · `foundations/decisions.md:1534-1545` D-88 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/sim/types.ts` ·
  `src/browser/sim/data/maps.ts` · `src/browser/sim/game.ts` · `src/browser/view/game-view.ts` ·
  `src/browser/view/controls/button.ts` · `src/browser/tokens.css:27-31`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from a failing case of `tests/view/status-row.test.mjs` in which a running map
  run on Las with a streak of 120 reads „Minuta 312 · Eksploruje · Passa 120/480”; then
  `npm test -- tests/view/status-row.test.mjs` · `npm test -- tests/view/headquarters.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/invariants/test_browser_view_framework.py`
- **Depends on:** Slices 2, 5 · Foundation entries rows 7, 9, 10, 12 · `completion` · `solved map`

## Current ranges of the foundation entries your *Read* names

The plan's line ranges of `foundations/` are stale: the plan's *Foundation entries* were written in
commit `82bbb1c` (and later slices may have moved lines). The ranges below hold now; where they
differ from the plan's, these hold. "Foundation entries row N" of the plan maps to: row 1 D-21,
row 2 D-129, row 3 D-130, row 4 `player-map-run-pace`, row 5 D-71, row 6 D-131, row 7 D-132 and
D-62, row 8 `map run restart`, row 9 D-133, row 10 D-134, row 11 D-135, row 12 D-122, row 13
`minute-span-split`, row 14 D-93; and the rows `completion`, `solved map`, `streak`,
`manual map run` (glossary) and `streak-program-change` (invariant). Read each entry whole.

- D-18: `foundations/decisions.md:356-373`
- D-36: `foundations/decisions.md:751-764`
- D-39: `foundations/decisions.md:796-809`
- D-44: `foundations/decisions.md:871-884`
- D-53: `foundations/decisions.md:1025-1045`
- D-62: `foundations/decisions.md:1188-1201`
- D-122: `foundations/decisions.md:2115-2149`
- D-75: `foundations/decisions.md:1379-1390`
- D-88: `foundations/decisions.md:1550-1561`
- content-identifiers: `foundations/invariants.md:236-246`
- headquarters: `foundations/glossary.md:87-92`
- completion: `foundations/glossary.md:137-141`
- solved map: `foundations/glossary.md:143-148`
- streak: `foundations/glossary.md:150-155`
- D-132: `foundations/decisions.md:2369-2392`

The ranges of `task.md` and `spec.md` in your *Read* hold as written; those passages are copied
below. Code and test files in your *Read* are named by path; read them as they stand now.

## Passages of the task and the spec your *Read* names, word for word

#### `task.md:20-23`

> 5. Gdy przejście spełni warunek rozwiązania mapy — w Lesie: gdy passa dojdzie do 480 — reszta tej minuty gry dzieje się do końca — ognie tracą minutę palenia, kafelki się odnawiają, kończąca się akcja postaci daje skutek — a w miejscu wyboru reguły przejście kończy się domknięciem. Po domknięciu ekran zostaje na stanie z minuty domknięcia i czas stoi; wiersz stanu mówi w Lesie „Minuta {minuta} · Las rozwiązany”, np. „Minuta 480 · Las rozwiązany”, w roli `positive` (napis dla innych map — pytanie przeniesione do cyklu); „Pauza” i przyciski tempa znikają, a zostają „Restart” (to samo ziarno, od minuty zero) i „Zakończ” (powrót do siedziby). Liczniki reguł programu zostają po domknięciu przy regułach jak po śmierci i po „Zakończ”, aż do następnego wysłania albo „Restart” (pytanie 17). Gdy w minucie domknięcia coś odkryto (zadanie 6), ekran domknięcia zastępuje pauzę po odkryciu, a pod jego wierszem stanu stoi też linia odkrycia w roli `discovery` z tym, co odsłonięto, aż gracz wybierze „Restart” albo „Zakończ”; odkrycie wchodzi do Zrozumienia (pytanie 15).
> 6. Po śmierci postaci przyciski tempa znikają razem z „Pauza”, a „Restart” rusza w tempie wybranym wcześniej (pytanie 12); reszta ekranu po śmierci zostaje jak dziś (D-62), a wiersz stanu mówi dalej „Minuta {minuta śmierci} · {przyczyna}”.
> 7. Pierwsze domknięcie mapy przez którąkolwiek postać gracza czyni ją mapą rozwiązaną; mapa zostaje rozwiązana także wtedy, gdy późniejsze przejście skończy się śmiercią. Od tej chwili siedziba pokazuje przy mapie „Mapa: Las · rozwiązana” w roli `positive`.
> 8. W trakcie przejścia wiersz stanu mówi „Minuta {minuta} · {czynność} · Passa {passa}/{liczba z warunku}”, np. „Minuta 312 · Eksploruje · Passa 120/480”; w pauzie wiersz kończy się dopiskiem „ (pauza)”, np. „Minuta 312 · Eksploruje · Passa 120/480 (pauza)” (pytanie 16). W siedzibie przy mapie stoi zdanie warunku rozwiązania z danych mapy, np. „Las — 480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu”.

#### `task.md:39-47`

> - 5. Gdzie i w jakiej postaci gracz widzi passę i warunek rozwiązania Lasu?
>   - Answer: Droga A — w trakcie przejścia wiersz stanu: „Minuta 312 · Eksploruje · Passa 120/480”; w siedzibie przy mapie zdanie warunku z danych mapy, np. „Las — 480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu”. Najdłuższej passy przejścia gra nie pokazuje; wiersz po śmierci zostaje jak dziś („Minuta 312 · Mag zamarzł”). Słaby punkt nazwany w pytaniu: dłuższy wiersz stanu i nowy tekst w danych mapy.
>   - Source: człowiek — Mariusz, 2026-10-25, „odpowiedzi zgodnie z rekomendacjami” (rekomendacja: A i bez najdłuższej passy). Fakt z kodu, osobno: wiersz stanu składa dziś „Minuta {minuta} · {czynność}”, z dopiskiem „ (pauza)” w pauzie (`src/browser/view/status-row.ts:27`–`35`), loop2 `9a5f360`. Materiał: test loop `src/sim/sim.test.ts:1950` („480 min · 10 × kamień”), dane loop `src/sim/data/maps.ts:165` („Osiem godzin bez jednej poprawki programu.”), `cdc7c0d`.
> - 6. Co widzi i co może zrobić gracz po domknięciu przejścia?
>   - Answer: Droga A — jak po śmierci: ekran zostaje na stanie z minuty domknięcia, czas staje, wiersz stanu mówi np. „Minuta 480 · Las rozwiązany” w roli `positive` („something works, is in order or is active now”, D-39), „Pauza” i przyciski tempa znikają, zostają „Restart” i „Zakończ”; pojęcie `map run restart` dostaje nowe brzmienie, bo dziś mówi tylko o ekranie po śmierci. Uzasadnienie przyjętej rekomendacji: jedno zachowanie dla obu końców przejścia.
>   - Source: człowiek — Mariusz, 2026-10-25, „odpowiedzi zgodnie z rekomendacjami” (rekomendacja A). Cytaty materiału: D-62 (`foundations/decisions.md`, `9a5f360`): “After a character's death the screen stays on the state of the game minute of death and time stands still, and the player has „Restart”, which starts the map run again with the same seed from game minute zero, and „Zakończ”, which returns to the screen from which the player sends the character.”; `map run restart` (`foundations/glossary.md`, `9a5f360`): “A map run restart is a map run of the same character on the same game map, which the player starts in place of the map run in progress or of a map run ended in the character's death that still stands on the screen.”
> - 7. Gdzie gracz widzi, że Las jest rozwiązany?
>   - Answer: Droga A — w siedzibie przy mapie: „Mapa: Las · rozwiązana” w roli `positive`, od pierwszego domknięcia którejkolwiek postaci. Rozwiązanie przepada przy odświeżeniu strony, dopóki zadanie 16 nie wniesie zapisu stanu gry.
>   - Source: człowiek — Mariusz, 2026-10-25, „odpowiedzi zgodnie z rekomendacjami” (rekomendacja A). Fakt z kodu, osobno: strona zaczyna od `newGame()` przy każdym wczytaniu (`src/browser/view/app.ts:24`), loop2 `9a5f360`.

#### `task.md:69-74`

> - 15. Co widzi gracz, gdy przejście domyka się w tej samej minucie gry, w której coś odkryto?
>   - Answer: Droga A — domknięcie i linia odkrycia razem: ekran domknięcia jak w pytaniu 6, a pod wierszem „Minuta 480 · Las rozwiązany” stoi też linia odkrycia w roli `discovery`, aż gracz wybierze „Restart” albo „Zakończ”; odkrycie wchodzi do Zrozumienia. Przejście kończy się w tej minucie, więc pauzy po niej nie ma (wiersz 4 *Settlements to record*), a wpis z wiersza O2 zadania 6 dostaje nowe brzmienie (wiersz 12). Słabe punkty nazwane w pytaniu: linia odkrycia dostaje drugi koniec — „Restart” albo „Zakończ” obok „Wznów”; ekran domknięcia ma dwie linie i osobną ścieżkę w kodzie i teście dla rzadkiej minuty.
>   - Source: człowiek — Mariusz, 2026-10-26, „przyjmuję rekomendacje” (rekomendacja A spośród dróg: A — domknięcie i linia odkrycia razem; B — sam ekran domknięcia, odkrycie wchodzi do Zrozumienia bez linii). Wiersz O2 dokumentu zadania 6 (sha256 755bed2ab43d): „Odkrycie zatrzymuje przejście tą samą pauzą co „Pauza” — wiersz stanu dopisuje „ (pauza)”, a gracz rusza dalej przyciskiem „Wznów” — a pod wierszem stanu stoi do wznowienia linia w roli `discovery` z tym, co odsłonięto.” — przyjęty przy cięciu tamtego zadania bez zmian (Mariusz, 2026-10-26, „wszystko zgodnie z rekomendacjami”). Materiał pytania, z danych gry loop2 `9a5f360`: obie rzeczy wypadają w jednej minucie rzadko — zanim passa dojdzie do 480, gra odkryła już pierwsze wychłodzenie, eksplorację, patyk, „Zapal” i jagodę, bo wychłodzenie i głód zerują passę (D-60; `src/browser/sim/data/maps.ts:32`, `balance.ts:9`–`17`, `items.ts:34`); w Lesie zostaje eksploracja, która w minucie domknięcia pierwszy raz odsłania kafelek z mchem albo włóknem (`items.ts:25`: “Moss and fiber have no use yet.”); że pierwsze ognisko gra też zna wcześniej, to szacunek refinera z liczb gry, nie pewność.
> - 16. Gdzie w wierszu stanu stoi dopisek „ (pauza)”, gdy wiersz pokazuje też passę?
>   - Answer: Na końcu wiersza, po passie: „Minuta 312 · Eksploruje · Passa 120/480 (pauza)”. Pauza dotyczy całego przejścia i stoi, jak dziś, na końcu wiersza; dopisek po czynności („Minuta 312 · Eksploruje (pauza) · Passa 120/480”) wyglądałby, jakby pauza dotyczyła czynności postaci.
>   - Source: człowiek — Mariusz, 2026-10-26, „zgodnie z rekomendacjami” (propozycja brzmienia To do 8 z rekomendacją przyjęcia). Fakt z kodu, osobno: wiersz stanu dopisuje dziś „ (pauza)” na końcu, po czynności (`src/browser/view/status-row.ts:27`–`35`), loop2 `9a5f360`.

#### `task.md:97-98`

> - Nazwa „Las” w tekstach ekranu — „Las rozwiązany”, „Mapa: Las · rozwiązana”, zdanie warunku — idzie z danych mapy (niezmiennik `content-identifiers`).
> - Wytyczne testów `guidelines/testing.md` (D-73): oczekiwane liczby passy i progu biorą się z dokumentu zaakceptowanego zadania i definicji (D-80, D-82), a test symulacji podaje jawny stan, upływ czasu i ziarno (D-84); zmienione ścieżki gracza w przeglądarce — przyciski tempa, ekran domknięcia, napis w siedzibie — sprawdza się ręcznie (D-75, D-88).

#### `task.md:166-169`

> Candidates: 14 shown, 14 accepted — 2026-10-28
>
> | # | Settlement | Kind | Source | What the cycle would otherwise guess |
> |---|---|---|---|---|

#### `task.md:176-181`

> | 7 | Po domknięciu ekran zostaje na stanie z minuty domknięcia i czas stoi, wiersz stanu mówi w Lesie „Minuta {minuta} · Las rozwiązany” w roli `positive`, „Pauza” i przyciski tempa znikają, a gracz ma „Restart” i „Zakończ” jak po śmierci — także po śmierci przyciski tempa znikają razem z „Pauza”. | decision | pytanie 6, droga A (Mariusz, 2026-10-25); zdanie o ekranie po śmierci — pytanie 12, droga A (Mariusz, 2026-10-26) | ekran po domknięciu — np. powrót do siedziby z komunikatem — i czy po śmierci przyciski tempa zostają, czynne albo nieaktywne |
> | 8 | Restart przejścia to przejście tej samej postaci na tej samej mapie, które gracz uruchamia w miejsce trwającego przejścia albo przejścia zakończonego śmiercią postaci albo domknięciem, które jeszcze stoi na ekranie. | glossary term | pytanie 6, droga A (Mariusz, 2026-10-25) | czy „Restart” po domknięciu jest restartem przejścia w sensie słownika |
> | 9 | W trakcie przejścia wiersz stanu pokazuje passę obok minuty i czynności, np. „Minuta 312 · Eksploruje · Passa 120/480”, a siedziba pokazuje przy mapie zdanie jej warunku rozwiązania z danych mapy. | decision | pytanie 5, droga A (Mariusz, 2026-10-25) | gdzie i w jakiej postaci gracz widzi passę i warunek — np. pasek postępu albo sam licznik |
> | 10 | Od pierwszego domknięcia mapy przez którąkolwiek postać gracza siedziba pokazuje przy mapie „Mapa: {mapa} · rozwiązana” w roli `positive`. | decision | pytanie 7, droga A (Mariusz, 2026-10-25) | czy rozwiązanie widać poza chwilą domknięcia |
> | 11 | Najdłuższej passy przejścia gra dziś nie pokazuje. | decision | pytanie 5, część (b) (Mariusz, 2026-10-25: rekomendacja „nie dodawać jej teraz”, przyjęta) | czy przenieść z loop pamiętanie najdłuższej passy przejścia (test loop `src/sim/sim.test.ts:555`, `cdc7c0d`, wymieniony w *Context*) i pokazać ją na ekranie po śmierci |
> | 12 | Odkrycie zatrzymuje przejście tą samą pauzą co „Pauza” — wiersz stanu dopisuje „ (pauza)”, a gracz rusza dalej przyciskiem „Wznów” — a pod wierszem stanu stoi do wznowienia linia w roli `discovery` z tym, co odsłonięto; gdy przejście domyka się w minucie odkrycia, ekran domknięcia zastępuje pauzę, a linia stoi pod jego wierszem stanu do „Restart” albo „Zakończ”. | decision | pytanie 15, droga A (Mariusz, 2026-10-26); część przed średnikiem — wiersz O2 dokumentu zadania 6 (`_zadania/odkrywanie_loop2.md`, sha256 755bed2ab43d), przyjęty przy cięciu tamtego zadania bez zmian (Mariusz, 2026-10-26, „wszystko zgodnie z rekomendacjami”) | czy odkrycie w minucie domknięcia zatrzymuje przejście pauzą i czy jego linia staje na ekranie domknięcia — także dla odkryć zadań 8 i 9 |

#### `spec.md:171-193`

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

#### `spec.md:268-293`

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
> - **Headquarters** (`src/browser/view/headquarters.ts`): in each character's row, where the map is
>   named, „Mapa: {name}” becomes „Mapa: {name} · rozwiązana” in the role `positive` once the game
>   state lists the map as solved, and the condition sentence of decision 4 stands with it, solved or
>   not. The headquarters re-renders that part when `solvedMaps` changes, as it now does when the team
>   changes.
> - **Styles**: a rule that gives the status text and the solved mark the colour `var(--positive)`
>   where the module marks them; no new token, role or shared control, so the styleguide and the
>   kitchen-sink page are unchanged.
>
> Way rejected for the headquarters: a section of maps of its own, holding each map's sentence and
> solved mark once — a new section the task does not ask for, while the map is named today only in
> each character's row.
>
> Cost if wrong: view only; reversible without touching the game state.

#### `spec.md:344-352`

> ## Left to the maker
>
> - The exact identifiers of the new fields, the function, the predicate of an ended map run and the
>   event, where they keep the shapes above; the TypeScript type of the pace, derived from the list of
>   paces in the data.
> - The order of the controls in the status row, provided the pace buttons stand beside „Pauza”; the
>   accessible names of the pace buttons; the CSS class names and how the status text switches its
>   role.
> - Where in a character's row of the headquarters the condition sentence stands, and on which line.

#### `spec.md:370-371`

> - The hand check in a browser of the pace buttons, the completion screen and the headquarters' texts
>   (D-75, D-88).

## Report

Write your full report to the report path as the method gives it, with each check's command and
exit code, and return only your status, your commits, a one-line check result naming what failed
or did not run, and the report path.
