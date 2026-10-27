# Handoff — executor of slice 11, task cycle odkrywanie

## Delegation

The human (Mariusz) started this the-way task cycle and delegated every intermediate choice to the
cycle's orchestrator. You answer to the orchestrator, never to the human; send questions back in
your report with the status `questions` and do not start any other stage or slice.

## Your stage

- Method: the project skill `the-way-make-change` (pinned the-way at `.the-way`, commit 574a37b),
  as the executor of planned slice 11. Read it and what it names whole.
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
- Report: write your full report to `.runs/task-cycles/odkrywanie/reports/slice-11-report.md`,
  as your method gives: each check with its exact command and exit code, the own-work check, every
  reach beyond this handoff, questions and concerns. Return only: your status (`done`,
  `done with concerns`, `questions`, `returned` or `blocked`), your commits, a one-line check
  result naming what failed or did not run, and the report's path.


## Your slice — `.runs/task-cycles/odkrywanie/plan.md`, copied word for word

### Slice 11 — the program editor offers the repertoire

- **Goal:** The program editor's lists of conditions, actions and their targets offer the repertoire of the program's character (Slice 2, Q-C1), and "Dodaj regułę" is inactive while that repertoire holds no action. In detail:
  - the condition selects of rules and groups offer the repertoire's conditions; the action select its actions; the resource selects of "Tu leży mniej niż", "Idź" and "Zbierz" the repertoire's items that are resources of the shown map, in the map's order; the item select of "Zapas poniżej" the repertoire's items of the backpack; a choice that switches kind takes its first target from these lists; a select whose rule or group holds a value outside the list still shows that value, as the resource selects do today;
  - "Dodaj regułę" is the shared button disabled (D-44) while the repertoire holds no action, and appends "Zawsze → Eksploruj" as today once it holds one;
  - `src/browser/view/game-view.ts` updates the editor when the Understanding changes, as it does when the program or the run's map changes;
  - the body row, the backpack, the list of revealed tiles and the drawing of the map show what they show today (O7).
- **Change:** `src/browser/view/program-editor.ts` · `src/browser/view/game-view.ts` · `tests/view/program-editor.test.mjs`
- **Read:** `.runs/task-cycles/odkrywanie/plan.md:50-64` Slice 2 · `.runs/task-cycles/odkrywanie/task.md:30-30` To do 4 · `.runs/task-cycles/odkrywanie/task.md:37-37` To do 7 · `.runs/task-cycles/odkrywanie/task.md:53-56` Questions to settle, 4 · `.runs/task-cycles/odkrywanie/task.md:60-63` Questions to settle, 6 · `.runs/task-cycles/odkrywanie/reports/01-planner-handoff.md:44-57` The orchestrator's answers at start ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:466-501` D-23 · `foundations/decisions.md:735-749` D-36 · `foundations/decisions.md:855-869` D-44 · `foundations/decisions.md:900-914` D-47 · `foundations/decisions.md:1560-1578` D-90 · `foundations/decisions.md:1579-1596` D-91 · `foundations/decisions.md:1619-1649` D-93 · `foundations/invariants.md:35-44` browser-view-framework · `foundations/invariants.md:232-243` content-identifiers · O6 · O7 · "Whose is the knowledge of the world, and what may a character use of it?" · repertoire ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/controls/button.ts` · `src/browser/view/controls/select-list.ts` · `src/browser/view/headquarters.ts:1-40` · `src/browser/sim/types.ts`
- **Model:** same — it rewires every list of the editor and its focus-preserving updates.
- **Risk:** none
- **Checks:** first the failing cases of `tests/view/program-editor.test.mjs`: a new game's editor offers "Zawsze" alone among conditions and no action, and its "Dodaj regułę" is disabled; after the first chill's Understanding it offers "Eksploruj" and "Wędruj" and "Temperatura poniżej", and "Dodaj regułę" appends "Zawsze → Eksploruj"; targets follow the Understanding's items within the shown map; a rule holding a value outside the lists still shows it. Then `npm test -- tests/view/program-editor.test.mjs`, `npm test`, failing nothing beyond the base's three failures, and a manual check in the browser (`npm run build`, then the game served as `README.md` gives): a new game's lists and the inactive button, and their change after the first chill (D-88).
- **Depends on:** Slices 2, 5 · O6 · O7 · "Whose is the knowledge of the world, and what may a character use of it?" · repertoire

## Foundation entries to read, each whole, at their current ranges in the worktree

Where a range differs from the plan's, the current one holds.

- D-04 — `foundations/decisions.md:57-93` (plan gave `foundations/decisions.md:57-93`)
- D-23 — `foundations/decisions.md:466-501` (plan gave `foundations/decisions.md:466-501`)
- D-36 — `foundations/decisions.md:735-749` (plan gave `foundations/decisions.md:735-749`)
- D-44 — `foundations/decisions.md:855-869` (plan gave `foundations/decisions.md:855-869`)
- D-47 — `foundations/decisions.md:900-914` (plan gave `foundations/decisions.md:900-914`)
- D-90 — `foundations/decisions.md:1560-1578` (plan gave `foundations/decisions.md:1560-1578`)
- D-91 — `foundations/decisions.md:1579-1596` (plan gave `foundations/decisions.md:1579-1596`)
- D-93 — `foundations/decisions.md:1619-1649` (plan gave `foundations/decisions.md:1619-1649`)
- browser-view-framework — `foundations/invariants.md:35-44` (plan gave `foundations/invariants.md:35-44`)
- content-identifiers — `foundations/invariants.md:234-245` (plan gave `foundations/invariants.md:232-243`)
- O6 → D-124 — `foundations/decisions.md:2141-2161`
- O7 → D-125 — `foundations/decisions.md:2162-2182`
- Whose is the knowledge of the world, and what may a character use of it? → D-119 — `foundations/decisions.md:2014-2039`
- repertoire — `foundations/glossary.md:125-130`

## Guidelines and code to read

Guideline files whole. A range of code or tests that an earlier slice changed: find the place again by its name.

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `src/browser/view/controls/button.ts`
- `src/browser/view/controls/select-list.ts`
- `src/browser/view/headquarters.ts:1-40`
- `src/browser/sim/types.ts`

## Passages of the task, the plan and the orchestrator's answers its *Read* names, copied word for word

#### `.runs/task-cycles/odkrywanie/plan.md:50-64` — Slice 2

```text
### Slice 2 — the Understanding in the game state and the repertoire computed from it

- **Goal:** The game state holds the Understanding, and the simulation computes from it the repertoire; nothing is gated by it yet. In detail:
  - `src/browser/sim/types.ts` gains the type of the Understanding — the discovered actions, conditions and items by their data identifiers, the campfire under the identifier Slice 1 gave it — and `GameState` a field `understanding`, one for the whole game and every character; `newGame()` gives an Understanding holding the condition "Zawsze" alone; `createCharacter`, `send`, `restart`, `end`, `setPaused`, `setProgram` and death leave it as it is;
  - a new simulation module `src/browser/sim/understanding.ts` exports: the Understanding of a new game; the repertoire computed from an Understanding and a list of predispositions — an action of the Understanding is in it where a skill among the predispositions grows it or no skill grows it; a condition and an item of the Understanding are in it whatever the predispositions; an action or a condition naming a resource or an item ("Idź", "Zbierz", "Tu leży mniej niż", "Zapas poniżej") is in it with each target the Understanding holds; the repertoire is never saved; whether a program rule — its condition, its action and their targets — lies in a repertoire; the program reduced to a repertoire: the same groups and rules, with their identities, less every rule outside the repertoire and every group whose condition lies outside it, which is passed over as a group whose condition does not hold; and the repertoire of the program the editor shows (Q-C1): the repertoire of the archetype of the character in the map run during one, otherwise of the archetype every created character takes (`CREATED_ARCHETYPE`), the archetype's predispositions read from its data;
  - `stryker.config.json` lists the new test file.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/understanding.ts` · `src/browser/sim/game.ts` · `tests/sim/repertoire.test.mjs` · `stryker.config.json`
- **Read:** `.runs/task-cycles/odkrywanie/plan.md:33-48` Slice 1 · `.runs/task-cycles/odkrywanie/task.md:14-37` To do · `.runs/task-cycles/odkrywanie/task.md:67-69` Questions to settle, 8 · `.runs/task-cycles/odkrywanie/task.md:80-82` Questions to settle, 12 · `.runs/task-cycles/odkrywanie/task.md:96-99` Context, loop2 code · `.runs/task-cycles/odkrywanie/task.md:113-147` Decisions in play · `.runs/task-cycles/odkrywanie/reports/01-planner-handoff.md:44-57` The orchestrator's answers at start ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:356-374` D-18 · `foundations/decisions.md:466-501` D-23 · `foundations/decisions.md:720-734` D-35 · `foundations/decisions.md:966-984` D-51 · `foundations/decisions.md:1070-1096` D-56 · `foundations/decisions.md:1560-1578` D-90 · `foundations/decisions.md:1579-1596` D-91 · `foundations/invariants.md:210-221` simulation-isolation · `foundations/invariants.md:222-231` simulation-inputs · `foundations/invariants.md:232-243` content-identifiers · `foundations/invariants.md:358-368` program-closed-lists · `foundations/invariants.md:592-601` mutation-test-selection · `foundations/glossary.md` · O8 · "When does the player learn what the world holds?" · "What does an archetype open to a character?" · "Whose is the knowledge of the world, and what may a character use of it?" · predisposition · archetype · repertoire · Understanding ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/program.ts` · `src/browser/sim/data/archetypes.ts` · `src/browser/sim/data/actions.ts` · `src/browser/sim/data/conditions.ts` · `src/browser/sim/data/items.ts` · `src/browser/sim/data/campfire.ts` · `tests/sim/program-fixture.mjs`
- **Model:** same — it decides the shape of the Understanding and of the repertoire that every later slice reads.
- **Risk:** none
- **Checks:** first the failing cases of `tests/sim/repertoire.test.mjs`: a new game's Understanding holds "Zawsze" alone; the mage's repertoire of an Understanding is that Understanding (all five skills); with a hand-written list of predispositions lacking a skill, the actions that skill grows leave the repertoire while "Wędruj", "Idź" and "Idź — ognisko" stay, and conditions and items stay; targets follow the items of the Understanding; a rule with a condition, an action or a target outside the repertoire lies outside it; the reduced program keeps identities and order and drops exactly those rules and groups; creating, sending, restarting and ending leave the Understanding unchanged. Then `npm test -- tests/sim/repertoire.test.mjs`, `npm test` (as Slice 1 gives for the base's three failures) and `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/understanding.ts"`, each surviving mutant classified in the report as `guidelines/testing.md` § Mutation testing gives.
- **Depends on:** Slice 1 · O8 · "When does the player learn what the world holds?" · "What does an archetype open to a character?" · "Whose is the knowledge of the world, and what may a character use of it?" · predisposition · archetype · repertoire · Understanding
```
#### `.runs/task-cycles/odkrywanie/task.md:30-30` — To do 4

```text
4. Edytor programu proponuje w listach warunków, akcji i ich celów repertuar postaci, a to samo wyliczenie rozstrzyga, co symulacja pozwala postaci wykonać. Regułę programu, której warunek, akcja albo cel nie należy do repertuaru postaci, symulacja pomija i przechodzi do następnej, jak akcję niewykonalną w tej minucie, a reguła zostaje w programie (pytanie 8). Wiersz ciała, plecak, lista odsłoniętych kafelków i rysunek mapy pokazują to, co pokazują dziś (pytanie 6).
```
#### `.runs/task-cycles/odkrywanie/task.md:37-37` — To do 7

```text
7. Do odkrycia pierwszej akcji przycisk „Dodaj regułę” jest nieaktywny, a potem dokłada „Zawsze → Eksploruj” jak w zadaniu 5 (pytanie 4).
```
#### `.runs/task-cycles/odkrywanie/task.md:53-56` — Questions to settle, 4

```text
- 4. Co robi „Dodaj regułę”, zanim gracz odkryje jakąkolwiek akcję?
  - Answer: A — do odkrycia pierwszej akcji przycisk „Dodaj regułę” jest nieaktywny, a potem dokłada „Zawsze → Eksploruj” jak w zadaniu 5 — po pierwszym wychłodzeniu Eksploruj jest zawsze znane. Przyjęte z kosztem: przez pierwsze 84 sekundy gracz widzi przycisk, którego nie może użyć.
  - Source: Mariusz, 2026-10-25, „wszystko zgodnie z rekomendacjami” (Turn 8 rozmowy refinementu), czytana wobec rekomendacji A. Materiał: dokument zadania 5 (sha256 2962181907a4), § To do, pkt 3: „„Dodaj regułę” w każdej grupie dokłada regułę „Zawsze → Eksploruj” na końcu tej grupy.”; D-55, Verification: “„Wyślij” beside the other characters inactive wherever the headquarters shows during a manual map run”.
  - Fakt z kodu, osobno: dziś „Dodaj regułę” dokłada „Zawsze → Eksploruj” na końcu płaskiej listy (`src/browser/view/program-editor.ts:126`–`133`, loop2 `9a5f360`).
```
#### `.runs/task-cycles/odkrywanie/task.md:60-63` — Questions to settle, 6

```text
- 6. Czy odkrywanie zasłania coś poza listami edytora programu — wiersz ciała, plecak, listę odsłoniętych kafelków, rysunek mapy?
  - Answer: A — odkrywanie bramkuje listy edytora programu (warunki, akcje, ich cele) i to, co symulacja pozwala wykonać; wiersz ciała, plecak, lista odsłoniętych kafelków i rysunek mapy pokazują to, co dziś. Przyjęte z kosztem: gracz widzi sytość w wierszu ciała, zanim może napisać o niej warunek.
  - Source: Mariusz, 2026-10-25, „wszystko zgodnie z rekomendacjami” (Turn 8 rozmowy refinementu), czytana wobec rekomendacji A.
  - Fakt z kodu, osobno: wiersz ciała pokazuje dziś „Temperatura … °C”, „Sytość … %” i „Zdrowie …” (`src/browser/view/body-row.ts:28`, `:32`, `:35`, loop2 `9a5f360`).
```
#### `.runs/task-cycles/odkrywanie/reports/01-planner-handoff.md:44-57` — The orchestrator's answers at start

```text
  whole, or the part the code makes true where the task says so).
- Answers to the task's *Questions carried to cycle* and one further reading (bind your plan):
  - Q-C1 — The program editor offers the repertoire computed from the Understanding through the
    predispositions of the archetype of the character the program serves. With one program per game
    and every character an elemental mage today, the editor uses the elemental mage's repertoire,
    computed by the same function the simulation uses for the character in a map run.
  - Q-C2 — The Understanding records discovered actions, conditions and items by their data
    identifiers; the campfire enters it under an identifier the data files give it as a
    discoverable thing, without becoming a backpack item. The exact representation is a
    how-to-make choice inside that.
  - Q-C3 — The chain of revelations and the five character skills with their predispositions stand
    in data files of `src/browser/sim/data/`, beside the actions, items and conditions they concern
    (D-18; `guidelines/coding-content-data.md`). The decision written from row O9 carries the
    chain's meaning, not its location.
```

## Base

This slice starts at `166c3c9cc934a059fe395df54e2bf63d4cb3944d` (slice 10 head). Slice 2 gave `src/browser/sim/understanding.ts` with `editorRepertoire(state)` — the repertoire of the character in the map run during one, otherwise of `CREATED_ARCHETYPE` (Q-C1) — and `repertoireOf`; the repertoire has the shape of the Understanding (actions, conditions, items by data identifier, the campfire id `"campfire"` among items). Slice 10 added `GameState.discovery` and the pause after a discovery minute. See `.runs/task-cycles/odkrywanie/reports/slice-2-report.md` and `slice-10-report.md`. Slice 5 moved `tests/view/program-editor.test.mjs` games that are sent and timed to the fully knowing fixture `tests/sim/understanding-fixture.mjs`.

O6 → D-124 and O7 → D-125 stand in `foundations/decisions.md` (ranges above).

Manual browser check: your slice's *Checks* names one. If you cannot drive a browser in this environment, record it as unchecked with that reason; do not claim it.

Known flaky tests outside this task: `tests/account-storage.test.mjs:357` (`5001 !== 5000`) and the container tests `test_built_image_serves_every_icon_and_the_page`, `test_replaced_container_keeps_accounts_and_sessions`, `test_container_serves_each_icon_with_the_file_bytes` (SQLite "database is locked" or Docker exit 137) each failed once and passed alone; if one fails for you, rerun it alone and report both runs.

Test discipline: show each new test case failing before the code that makes it pass, and record that run (command and exit code) in your report. A test outside your *Change* that fails because of this slice: return it with status `blocked`, naming the test and the smallest fix, without changing it.
