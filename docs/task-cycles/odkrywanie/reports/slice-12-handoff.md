# Handoff — executor of slice 12, task cycle odkrywanie

## Delegation

The human (Mariusz) started this the-way task cycle and delegated every intermediate choice to the
cycle's orchestrator. You answer to the orchestrator, never to the human; send questions back in
your report with the status `questions` and do not start any other stage or slice.

## Your stage

- Method: the project skill `the-way-make-change` (pinned the-way at `.the-way`, commit 574a37b),
  as the executor of planned slice 12. Read it and what it names whole.
- Worktree (only place you write): `C:/Storage/repos/loop2/.runs/worktrees/odkrywanie`, branch
  `task/odkrywanie`. No other agent writes there while you work. Commit your work on that branch
  by explicit paths (`git add <path> …`, never `git add -A`, `git add .` or `git commit -a`),
  commit messages in English. Leave the worktree clean.
- Boundary: make only this slice, as its section below gives; change the files of its *Change*.
  Where the slice needs a file outside *Change*, an open design choice, or proves too large,
  return as your method gives (`returned`, no code for a design choice).
- Frozen task: `.runs/task-cycles/odkrywanie/task.md` (copy of the vault document
  `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/_zadania/odkrywanie_loop2.md`, accepted
  2026-10-26). A test comment locating a documentary expectation names the vault file
  `odkrywanie_loop2.md` and its line (D-82); the frozen copy has the same lines.
- No spec. Trust boundary: no. Irreversible operation: no.
- The foundation entries of this task are already written (commit dcd529d): the rows of
  *Settlements to record* stand as O1 → D-123, O2 → D-122, O3 → D-71 (changed), O4 →
  player-map-run-pace, O5 → minute-span-split, O6 → D-124, O7 → D-125, O8 → D-126, O9 → D-121;
  the projected entries as D-118 (when the player learns what the world holds), D-119 (whose is the
  knowledge), D-120 (what an archetype opens); terms predisposition, archetype, Understanding,
  repertoire in `foundations/glossary.md`; program-rule-pick's sentence changed. Write no
  foundation entry; a foundation entry that no longer matches the code goes into your report.
- Checks already failing on the base d9a2374 (`.runs/task-cycles/odkrywanie/reports/00-baseline-gate.log`),
  environment, not this task: `test_loop2_one_serving_process` setUpClass (Get-NetTCPConnection
  finds no Listen objects), `test_ruff_source_rules` and `test_shellcheck_source_rules`
  (FileNotFoundError: ruff and shellcheck are not installed on this machine). `npm test` stops
  at the Python stage because of them, so after `npm test` also run
  `python -B .the-way/elements/common/foundation_check.py` on its own. Name every check that
  failed or did not run; an unrun check is unchecked, never passed.
- Report: write your full report to `.runs/task-cycles/odkrywanie/reports/slice-12-report.md`,
  as your method gives: each check with its exact command and exit code, the own-work check, every
  reach beyond this handoff, questions and concerns. Return only: your status (`done`,
  `done with concerns`, `questions`, `returned` or `blocked`), your commits, a one-line check
  result naming what failed or did not run, and the report's path.


## Your slice — `.runs/task-cycles/odkrywanie/plan.md`, copied word for word

### Slice 12 — the line of what was discovered under the status row

- **Goal:** While the game state holds a discovery (Slice 10), a line under the status row says what was revealed, in the role `discovery`, and it goes when the player moves on. In detail:
  - the line's text is composed from the game state's `discovery` and the data: „Odkryto: ” followed by the labels of the revealed actions and the names of the revealed items, the campfire's included, each item's name with a capital first letter, joined by „, ”, closed by „.”; then, where conditions were revealed, „ W regułach można teraz sprawdzić: ” with each condition's label, followed for a condition that takes a number by „ … ” and its unit, joined by „, ” and closed by „.” — as the task's example: „Odkryto: Idź, Zbierz, Patyk, Jagoda. W regułach można teraz sprawdzić: Tu leży mniej niż … szt., Zapas poniżej … szt.”; a part with nothing revealed is left out;
  - the text is a pure exported function of `src/browser/view/status-row.ts`; the line is an element made once and updated in place, hidden while `discovery` is null, its colour from a rule of `src/browser/styles.css` reading `var(--discovery)`; `src/browser/view/game-view.ts` places it under the status row if the status row does not hold it;
  - the status row keeps „ (pauza)” and „Wznów” as for any pause.
- **Change:** `src/browser/view/status-row.ts` · `src/browser/view/game-view.ts` · `src/browser/styles.css` · `tests/view/status-row.test.mjs`
- **Read:** `.runs/task-cycles/odkrywanie/plan.md:148-165` Slice 9 · `.runs/task-cycles/odkrywanie/plan.md:167-182` Slice 10 · `.runs/task-cycles/odkrywanie/task.md:31-35` To do 5 · `.runs/task-cycles/odkrywanie/task.md:48-52` Questions to settle, 3 · `.runs/task-cycles/odkrywanie/task.md:101-101` Context, styleguide ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:735-749` D-36 · `foundations/decisions.md:780-794` D-39 · `foundations/decisions.md:825-839` D-42 · `foundations/decisions.md:840-854` D-43 · `foundations/decisions.md:1172-1186` D-62 · `foundations/invariants.md:232-243` content-identifiers · `foundations/invariants.md:452-461` browser-view-token-values · O2 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/tokens.css` · `src/browser/sim/types.ts` · `src/browser/sim/data/actions.ts` · `src/browser/sim/data/conditions.ts` · `src/browser/sim/data/items.ts` · `src/browser/sim/data/campfire.ts`
- **Model:** same — it composes the line's text from data and places a new element of the screen.
- **Risk:** none
- **Checks:** first the failing cases of `tests/view/status-row.test.mjs`: the text for the first finished exploration of a tile with sticks and berries is the task's example; the text for the first chill; a discovery of an action alone has no second sentence; the line is shown while `discovery` is set and hidden after `setPaused(false)`. Then `npm test -- tests/view/status-row.test.mjs`, `npm test`, failing nothing beyond the base's three failures, and a manual check in the browser: the line in the colour of `discovery` under the status row after the first chill, „ (pauza)” and „Wznów”, and the line gone after „Wznów” (D-88).
- **Depends on:** Slices 10, 11 · O2

## Foundation entries to read, each whole, at their current ranges in the worktree

Where a range differs from the plan's, the current one holds.

- D-04 — `foundations/decisions.md:57-93` (plan gave `foundations/decisions.md:57-93`)
- D-36 — `foundations/decisions.md:735-749` (plan gave `foundations/decisions.md:735-749`)
- D-39 — `foundations/decisions.md:780-794` (plan gave `foundations/decisions.md:780-794`)
- D-42 — `foundations/decisions.md:825-839` (plan gave `foundations/decisions.md:825-839`)
- D-43 — `foundations/decisions.md:840-854` (plan gave `foundations/decisions.md:840-854`)
- D-62 — `foundations/decisions.md:1172-1186` (plan gave `foundations/decisions.md:1172-1186`)
- content-identifiers — `foundations/invariants.md:234-245` (plan gave `foundations/invariants.md:232-243`)
- browser-view-token-values — `foundations/invariants.md:455-464` (plan gave `foundations/invariants.md:452-461`)
- O2 → D-122 — `foundations/decisions.md:2094-2117`

## Guidelines and code to read

Guideline files whole. A range of code or tests that an earlier slice changed: find the place again by its name.

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `src/browser/tokens.css`
- `src/browser/sim/types.ts`
- `src/browser/sim/data/actions.ts`
- `src/browser/sim/data/conditions.ts`
- `src/browser/sim/data/items.ts`
- `src/browser/sim/data/campfire.ts`

## Passages of the task, the plan and the orchestrator's answers its *Read* names, copied word for word

#### `.runs/task-cycles/odkrywanie/plan.md:148-165` — Slice 9

```text
### Slice 9 — discoveries in the order of the game minute, the Understanding growing and the rule at the first chill

- **Goal:** A game minute of a map run reveals what the task's chain gives, in the step of D-71 that caused it, and the pick at the end of that minute already uses what was revealed; time does not stop yet (Slice 10). In detail:
  - `src/browser/sim/run.ts` exports, beside an unchanged `stepMinute`, the minute up to the pick and the pick itself, so that `game.ts` can let the discoveries take hold between them; `stepMinute` stays those two together, with its signature and meaning;
  - `src/browser/sim/understanding.ts` gives what a minute reveals, from the map run before and after the minute up to the pick and its events, read against the revealing events of the data (Slice 1): the first chill — body temperature below the threshold of chill (`BALANCE.body.chilledBelow`) after the minute's body step; a finished exploration — the tile it revealed, with the items whose resource that tile holds; a gathering that put a stick or a berry into the backpack; a crafting that put a campfire on the tile; a "Zapal" whose lighting took hold, of a campfire or a stick; what is new enters the Understanding, and what the Understanding already holds reveals nothing;
  - in a minute in which the character dies, the effect of the ending action does not take hold, so it reveals nothing (D-71); the first chill, which the body step reveals, follows the body step as O3 gives;
  - at the first chill — the discovery of what the chill reveals — the game appends the rule "Zawsze → Eksploruj" to the first rule group of the program, with a fresh identity, or, where the program has no group, makes a group "Program" with the condition "Zawsze" and appends it there (O1); within a map run the rule's count starts from zero and counts its firings (D-92, D-93);
  - `advanceMinutes` threads the Understanding and the program through the minutes, and the game state after it holds both as they grew; a minute that revealed something gives an event of a new kind, `discovered`, with the minute and what it revealed — actions, conditions and items, each in the order of its data;
  - the Understanding belongs to the game: what one character discovers stands for the next one sent, and death, "Restart" and "Zakończ" leave it as it is.
- **Change:** `src/browser/sim/run.ts` · `src/browser/sim/understanding.ts` · `src/browser/sim/game.ts` · `src/browser/sim/types.ts` · `tests/sim/discovery.test.mjs` · `stryker.config.json` · `tests/sim/repertoire.test.mjs` (added by the orchestrator after the executor's `blocked` return: two of its tests run a partly knowing game past the first chill; Q-S9)
- **Read:** `.runs/task-cycles/odkrywanie/plan.md:33-48` Slice 1 · `.runs/task-cycles/odkrywanie/plan.md:50-64` Slice 2 · `.runs/task-cycles/odkrywanie/plan.md:135-146` Slice 8 · `.runs/task-cycles/odkrywanie/task.md:14-37` To do · `.runs/task-cycles/odkrywanie/task.md:41-47` Questions to settle, 1 and 2 · `.runs/task-cycles/odkrywanie/task.md:76-79` Questions to settle, 11 · `.runs/task-cycles/odkrywanie/task.md:84-102` Context · `.runs/task-cycles/odkrywanie/task.md:113-147` Decisions in play · `.runs/task-cycles/odkrywanie/task.md:149-165` Settlements to record ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:401-421` D-20 · `foundations/decisions.md:528-552` D-25 · `foundations/decisions.md:1142-1156` D-60 · `foundations/decisions.md:1157-1171` D-61 · `foundations/decisions.md:1187-1201` D-63 · `foundations/decisions.md:1307-1321` D-71 · `foundations/decisions.md:1322-1336` D-72 · `foundations/decisions.md:1456-1468` D-82 · `foundations/decisions.md:1560-1578` D-90 · `foundations/decisions.md:1579-1596` D-91 · `foundations/decisions.md:1597-1618` D-92 · `foundations/decisions.md:1619-1649` D-93 · `foundations/invariants.md:165-175` map-run-repeatability · `foundations/invariants.md:187-197` action-in-progress · `foundations/invariants.md:222-231` simulation-inputs · `foundations/invariants.md:244-257` program-rule-pick · `foundations/invariants.md:522-531` minute-span-split · `foundations/invariants.md:592-601` mutation-test-selection · O1 · O3 · O9 · "When does the player learn what the world holds?" · "Whose is the knowledge of the world, and what may a character use of it?" · Understanding ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/program.ts` · `src/browser/sim/body.ts` · `src/browser/sim/world.ts` · `src/browser/sim/data/balance.ts` · `tests/sim/program-fixture.mjs`
- **Model:** strongest — it places discovery inside D-71's order of the minute across `run.ts` and `game.ts`, with the rule written into the program and its count, which tasks 8 and 9 extend.
- **Risk:** none
- **Checks:** first the failing cases of `tests/sim/discovery.test.mjs`, each expectation from the task (D-82, comment naming the vault's `odkrywanie_loop2.md` and its line): a new game sent with its program of one empty group waits until minute 84, where the mage is chilled (task Context, minute 83 35,008 °C, minute 84 34,984 °C), learns "Eksploruj", "Wędruj" and "Temperatura poniżej", gets "Zawsze → Eksploruj" in the group "Program" and starts exploring in minute 84; a program with no group gets the group "Program"; the first finished exploration reveals "Idź", "Zbierz", "Tu leży mniej niż", "Zapas poniżej" and the items of that tile, read from the tile, and a later revealed tile adds its new items only; each further row of the table of To do 2 revealing exactly its row; a second chill and a known item reveal nothing; the rule written at the first chill counts its firing; a gathering ending in the minute of death reveals nothing; the Understanding standing after death, "Restart", "Zakończ" and for the next character sent. Then `npm test -- tests/sim/discovery.test.mjs`, `npm test`, failing nothing beyond the base's three failures, and `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/understanding.ts,src/browser/sim/run.ts,src/browser/sim/game.ts"`, each surviving mutant classified in the report.
- **Depends on:** Slices 1, 2, 8 · O1 · O3 · O9 · "When does the player learn what the world holds?" · "Whose is the knowledge of the world, and what may a character use of it?" · Understanding
```
#### `.runs/task-cycles/odkrywanie/plan.md:167-182` — Slice 10

```text
### Slice 10 — game time stops after the minute of a discovery

- **Goal:** After a game minute that revealed something, the map run stands in the pause of "Pauza" and the game state holds what that minute revealed until the player moves on. In detail:
  - `advanceMinutes` ends its span at the minute of a discovery, whatever number of minutes it was given, and leaves the game paused (`paused`), as it ends today at the minute of death; called again it goes on from there, also while paused, as today;
  - `passRealTime`, where the span it passed ended at a discovery, keeps none of the real time it was given beyond that minute: `realMsCarry` is 0, and the run stays paused until `setPaused(false)`;
  - `GameState` gains a field `discovery`: what the last minute of a discovery revealed — actions, conditions and items as the event of Slice 9 gives them — or null; it is set with the pause and cleared when the player moves on: `setPaused(false)`, `restart`, `end` and `send`;
  - `player-map-run-pace` and `minute-span-split` stand in the foundation with the sentences of rows O4 and O5; their tests check the new sentences: a span of real time or of minutes crossing the first chill of a new game stops at that minute, paused, with no carry, and every split of such a span reaches the same state and events at every minute up to and including the minute of discovery.
- **Change:** `src/browser/sim/game.ts` · `src/browser/sim/types.ts` · `tests/sim/discovery.test.mjs` · `tests/sim/time.test.mjs` · `tests/invariants/test_player_map_run_pace.py` · `tests/invariants/test_minute_span_split.py`
- **Read:** `.runs/task-cycles/odkrywanie/plan.md:93-107` Slice 5 · `.runs/task-cycles/odkrywanie/plan.md:148-165` Slice 9 · `.runs/task-cycles/odkrywanie/task.md:31-36` To do 5 and 6 · `.runs/task-cycles/odkrywanie/task.md:48-52` Questions to settle, 3 · `.runs/task-cycles/odkrywanie/task.md:76-79` Questions to settle, 11 · `.runs/task-cycles/odkrywanie/task.md:97-97` Context, pause and real time · `.runs/task-cycles/odkrywanie/task.md:102-102` Context, task 7 ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:422-439` D-21 · `foundations/decisions.md:1172-1186` D-62 · `foundations/decisions.md:1307-1321` D-71 · `foundations/invariants.md:198-209` player-map-run-pace · `foundations/invariants.md:522-531` minute-span-split · O2 · O3 · O4 · O5 · "When does the player learn what the world holds?" ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/run.ts` · `tests/invariants/program_fixture.py` · `tests/invariants/loop2_invariant_support.py`
- **Model:** same — it rewrites two invariant tests to new sentences and decides how a span ends at a discovery.
- **Risk:** none
- **Checks:** first the failing cases: in `tests/sim/discovery.test.mjs`, `advanceMinutes` of a new game sent, given 100 minutes, ends at minute 84 paused with `discovery` holding what the chill revealed, and called again goes on; `passRealTime` of 100 000 ms ends at minute 84 paused with `realMsCarry` 0, and further real time moves nothing until `setPaused(false)`, which clears `discovery`; `restart`, `end` and `send` clear it; in `tests/sim/time.test.mjs`, nothing of its existing cases changes; the two invariant tests' new cases, marked with their invariants, each with a control seen failing. Then `npm test -- tests/invariants/test_player_map_run_pace.py`, `npm test -- tests/invariants/test_minute_span_split.py`, `npm test -- tests/sim/discovery.test.mjs`, `npm test`, failing nothing beyond the base's three failures, and `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/game.ts"`, each surviving mutant classified in the report.
- **Depends on:** Slices 6, 9 · O2 · O3 · O4 · O5 · "When does the player learn what the world holds?"
```
#### `.runs/task-cycles/odkrywanie/task.md:31-35` — To do 5

```text
5. Gdy coś się odsłoni, czas gry staje sam (pytania 3 i 11):
   - odkrycie zapada w kroku kolejności minuty gry (D-71), który je wywołał — wychłodzenie przy ciele, zakończona akcja przy jej skutku; reszta minuty dzieje się do końca, a wybór reguły na końcu tej minuty bierze już Zrozumienie i program po odkryciu, więc reguła wpisana przy odkryciu (punkt 6) może zadziałać jeszcze w tej minucie; w minucie śmierci skutek kończącej się akcji nie zapada (D-71), więc nie zapada też jej odkrycie;
   - czas staje po całej minucie, w tę samą pauzę co po „Pauza”: wiersz stanu dopisuje „ (pauza)”, a gracz rusza dalej przyciskiem „Wznów”; reszta czasu realnego przekazanego w chwili odkrycia przepada;
   - pod wierszem stanu staje linia tekstem w roli `discovery` z tym, co odsłonięto, słowami jak w kronice loop (`src/sim/sim.test.ts:633`, loop `cdc7c0d`) — przykład z materiału pytania 3: „Odkryto: Idź, Zbierz, Patyk, Jagoda. W regułach można teraz sprawdzić: Tu leży mniej niż … szt., Zapas poniżej … szt.”; kilka odsłonięć jednej minuty idzie w jednej linii; linia znika, gdy gracz ruszy dalej;
   - cykl przepisuje niezmiennik `player-map-run-pace` (odcinek czasu przerwany odkryciem nie przesuwa przejścia o każdą sekundę) i `minute-span-split` (odcinek minut kończy się także na minucie odkrycia), każdy z jego testem.
```
#### `.runs/task-cycles/odkrywanie/task.md:48-52` — Questions to settle, 3

```text
- 3. Jak czas gry staje przy odkryciu i co wtedy widzi gracz?
  - Answer, cytat z dokumentu (zachowany przez człowieka): czas staje sam w chwili odkrycia — definicja `definicja_mvp_loop2.md`, § Projected foundation changes, „(new) — When does the player learn what the world holds?”: “When something is discovered, game time stops by itself.”; komunikat o odkryciu w kolorze sygnałowym bierze rolę `discovery` — `foundations/decisions.md` D-39: “`discovery` means that something new was discovered”.
  - Answer, wybór człowieka: (1) P — przejście przechodzi w tę samą pauzę co po „Pauza”: wiersz stanu dopisuje „ (pauza)”, a gracz rusza dalej przyciskiem „Wznów”; przyjęte z kosztem: zatrzymania przez odkrycie nie da się odróżnić w stanie gry od pauzy gracza, więc wszystko, co traktuje pauzę, traktuje oba tak samo (np. wybrane tempo z pytania Q4 zadania 7). (2) A — pod wierszem stanu staje linia tekstem w roli `discovery` z tym, co odsłonięto, słowami jak w kronice loop, kilka odsłonięć jednej minuty w jednej linii, a linia znika, gdy gracz ruszy dalej; przyjęte z kosztem: kto szybko ruszy dalej, traci listę odkryć, bo gra nie ma kroniki. Wspólne dla wszystkich dróg pytania: reszta czasu realnego przekazanego w chwili odkrycia przepada, a niezmiennik `player-map-run-pace` trzeba przepisać.
  - Source: wybór — Mariusz, 2026-10-25, „wszystko zgodnie z rekomendacjami” (Turn 8 rozmowy refinementu: cytaty zachowane, (1) P, (2) A); cytaty — definicja (zatwierdzona 2026-10-26, odcisk 7692b28a, sha256 8dad9717784d), linia 1120 — zdanie brzmi tak samo jak w tekście z odciskiem 9e480247, z którego przedstawiono je człowiekowi; D-39 w `foundations/decisions.md`, loop2 `9a5f360`. „Odkryto coś nowego.” to opis znaczenia roli w tabeli styleguide'u (`guidelines/styleguide-browser-view.md:30`), nie tekst komunikatu.
  - Fakt z kodu, osobno: przekazany czas realny nie przesuwa dziś przejścia, gdy `paused` jest ustawione (`src/browser/sim/game.ts:346`–`357`, warunek w `:350`), a wiersz stanu dopisuje „ (pauza)” (`src/browser/view/status-row.ts:7`, `:31`–`35`); loop2 `9a5f360`.
```
#### `.runs/task-cycles/odkrywanie/task.md:101-101` — Context, styleguide

```text
- Styleguide (`guidelines/styleguide-browser-view.md:30`, § Roles) opisuje rolę tekstu `discovery` znaczeniem „Odkryto coś nowego.” (D-39), a stan nieaktywnej kontrolki tekstem w `text-disabled` (`:26`, `:172`).
```

## Base

This slice starts at `706c97ee8c3851bf8d0618f2a97d47b3f93741b6` (slice 11 head). Slice 10 added `GameState.discovery` — what the last discovery minute revealed (actions, conditions, items by data identifier, the campfire as `"campfire"`), or null — set with the pause and cleared by `setPaused(false)`, `restart`, `end` and `send`; see `.runs/task-cycles/odkrywanie/reports/slice-10-report.md` for its exact type in `src/browser/sim/types.ts`. Slice 11 changed `src/browser/view/game-view.ts` to refresh the program editor when the Understanding changes; see `reports/slice-11-report.md`.

O2 → D-122 stands in `foundations/decisions.md` (range above).

Manual browser check: your slice's *Checks* names one. If you cannot drive a browser in this environment, record it as unchecked with that reason; do not claim it.

Known flaky tests outside this task: `tests/account-storage.test.mjs:357` (`5001 !== 5000`) and the container tests `test_built_image_serves_every_icon_and_the_page`, `test_replaced_container_keeps_accounts_and_sessions`, `test_container_serves_each_icon_with_the_file_bytes` (SQLite "database is locked" or Docker exit 137) each failed once and passed alone; if one fails for you, rerun it alone and report both runs.

Test discipline: show each new test case failing before the code that makes it pass, and record that run (command and exit code) in your report. A test outside your *Change* that fails because of this slice: return it with status `blocked`, naming the test and the smallest fix, without changing it.
