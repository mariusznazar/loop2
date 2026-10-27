FAIL 1f3e2917a0b0aa5e90b976777f9e6f01c74079ed

# Review of the whole change — task cycle odkrywanie

- Range: `d9a237435f22c29b7d37430054f6fa7ed0a81323..1f3e2917a0b0aa5e90b976777f9e6f01c74079ed` (14 commits, the plan's foundation entries and slices 1–12). `git rev-parse HEAD` in the worktree is the head given.
- Method: project skill `the-way-review-change` → `.the-way/task-cycle/review/SKILL.md` (pinned 574a37b, gitlink and checkout agree), with "Reading the foundation" of `.the-way/elements/common/way_of_working.md` and `.the-way/product-guidelines/reading.md`.
- Read: the frozen task `.runs/task-cycles/odkrywanie/task.md` whole, the plan whole, the planner handoff's orchestrator answers (Q-C1–Q-C3), the foundation-entries report and the report of every slice (none had a review of its own).
- Counts: blocking 1 (Important), Minor 6, out of scope 3 (the lines of Declined to judge).

## Findings

### Important (blocking)

**I-1. In about one game in 27 the program editor offers „Idź”, „Zbierz”, „Tu leży mniej niż” and „Zapas poniżej” with no target. Choosing one of them leaves the select showing a rule the program does not hold.**
Slice 11, commit 706c97e (`src/browser/view/program-editor.ts`). Slice 2's repertoire shape (339f94f) is where it starts, but the slice-2 functions themselves are correct.

- What the player sees: in a new game, Las sometimes has no resource on the entrance tile. When it does not, the first finished exploration (minute 104) reveals „Idź”, „Zbierz”, „Tu leży mniej niż” and „Zapas poniżej” with no item. The line under the status row reads „Odkryto: Idź, Zbierz. …”. The action and condition selects now list the four kinds, but the resource and item lists are empty.
  - When the player picks „Idź” or „Zbierz” in a rule's action select, `withActionKind` gets `offer.resources = []` and returns null (`program-editor.ts:421-422`). The change handler (`program-editor.ts:899-908`) then calls `edit(null)`, which returns without committing or redrawing (`program-editor.ts:638`).
  - So the select keeps showing „Idź" while the program still holds „Eksploruj", and no target select appears. A condition select switched to „Tu leży mniej niż” or „Zapas poniżej” behaves the same way (`newCondition` returns null for no resource or item, `program-editor.ts:341-345`).
  - The player reads a program that is not the one the character runs. The character keeps waiting at minute 104, because exploring a revealed tile is infeasible (D-25), and nothing on the screen says why.
- Why it is within the task and blocking:
  - To do 4 has the editor offer "w listach warunków, akcji i ich celów repertuar postaci". By D-120, an action is a pair of verb and target. By the change's own `actionInRepertoire`/`conditionInRepertoire` (`understanding.ts:59-87`), „Idź”/„Zbierz” and the two conditions are outside the repertoire with every possible target while the Understanding holds no item. The editor therefore offers kinds of which no rule in the repertoire can be made.
  - The view also departs from D-04: the view draws the game from the game state, but here the select shows a state the game does not hold.
  - Before this task the resource list was empty only when no map existed, which never happens in play. The task makes it reachable at the second step of the tutorial.
- Evidence:
  - Scratch run on the built head (`scratchpad/entr.mjs`): 11 of 300 sends to Las at different real times have an entrance tile with an empty stock. One of them is the real time 1760000000000 that many tests use.
  - Scratch run `scratchpad/entr2.mjs` at that real time: at minute 104 the event is `{"kind":"discovered","minute":104,"actions":["walkTo","gather"],"conditions":["hereBelow","itemBelow"],"items":[]}`, with `offeredActionKinds` = `["explore","wander","walkTo","gather"]`, `offeredResources` = `[]`, `offeredItems` = `[]`, `withActionKind(…, "walkTo", [])` = `null` and `withConditionKind(…, "hereBelow", [], [])` = `null`.
  - The slice's test „a condition switching to „Zapas poniżej” takes the first of the offered items; with none offered nothing is committed” (`tests/view/program-editor.test.mjs:867`) checks that nothing is committed, but not what the select shows afterwards.
- Possible fixes, both local to `program-editor.ts`, either one sufficient:
  - leave out of the action and condition lists a kind that names a target while no target is offered;
  - or redraw the row to its rule when an edit yields nothing.

  Either fix needs a test that the select shows the rule's kind after such a choice.

### Minor

**M-1. D-124 says "disabled while the Understanding holds no action", but the code disables „Dodaj regułę” while the repertoire holds no action.**
`foundations/decisions.md` D-124 (from dcd529d); `program-editor.ts:1050`. The plan chose the repertoire and named the cost: "none with one archetype". The two diverge only once an archetype lacks the skill that grows „Eksploruj”. Then the button would also add a rule outside that character's repertoire. The task that adds a second archetype should settle which one the decision means.

**M-2. The file table of `guidelines/coding-content-data.md` does not list the new data files `src/browser/sim/data/skills.ts` and `src/browser/sim/data/revelations.ts`.**
Slice 1 reported this. The table already lacked `items.ts` and `campfire.ts` at the base. The rules of the file apply to the new files and they follow them (typed catalogue with `satisfies` and `keyof typeof`, no clock or environment). Only the list is incomplete.

**M-3. When a discovery changes the Understanding, the editor rebuilds its rows (JSON comparison of the offer, `program-editor.ts:1026-1028`).**
A number typed but not yet committed, and the focus, are lost at that moment. The slice-11 report names this cost. Time is paused by then, but the loss comes from the rebuild itself, not from the pause.

**M-4. The new case of `tests/invariants/test_program_rule_pick.py` checks the clause "action … in the repertoire" alone.**
It does not check the clauses on condition and target, or "leaves every program rule it passes over in the program", which the changed sentence adds. These clauses are covered one level down, in `tests/sim/repertoire.test.mjs` (tests at lines 424, 445, 461, 475, 503), so nothing is unprotected. The invariant's own check is just narrower than its sentence.

**M-5. Slices 1 and 2 wrote their tests together with the code, not failing first (`guidelines/testing.md`).**
Both reports say so. The mutation runs stand in for that. I checked the five surviving mutants of slice 2 (`editorRepertoire`, one archetype in the data) and the classified survivors of slices 9 and 10: I agree they are equivalent under today's data.

**M-6. The change from `game-view.ts` (refresh the editor on an Understanding change) and the line's colour and placement have no automated test (slices 11 and 12; D-88 leaves those to a manual check).**
Neither slice ran that manual check. I ran it myself (see Checks); it showed the expected behaviour. So this is no longer an unchecked state, only one without an automated guard.

### Slices judged (each had no review of its own)

- **Foundation entries (dcd529d).**
  - Every row O1–O9 has its entry: O1 D-123, O2 D-122, O3 D-71 changed in place, O4 `player-map-run-pace`, O5 `minute-span-split`, O6 D-124, O7 D-125, O8 D-126 (narrows D-23, P-2 kept), O9 D-121.
  - Projected entries:
    - D-118 and D-120 are written whole;
    - D-119 is written in the part this task makes true;
    - the terms predisposition, archetype and repertoire are written whole, and Understanding in its part;
    - `program-rule-pick` is changed as P-1 gives.
  - Fidelity against the task's quotations:
    - the meaning is kept. „Zawsze”/„Wytwórz” stand for the approved "Always"/"Make", consistent with the log's other entries.
    - the *Rejected* lines of D-121–D-126 match the alternatives the task names; the refinement conversation they would otherwise quote is gone, as the author says.
    - the rows' wording follows Q7 (B).
  - `foundation_check.py` passes.
- **Slice 1 (4ddad16).** The data match To do 2 and To do 3 row for row. „Zawsze” has no revealing event. The campfire has an identifier outside `ITEMS`. No content identifier leaves `data/`.
- **Slice 2 (339f94f).** `repertoireOf`, `ruleInRepertoire`, `programInRepertoire` and `editorRepertoire` do what the plan gives. One function serves the editor and the simulation (D-119).
- **Slices 3 and 4 (629a5bd, 4a06041).** I agree with the executor's reading that left `actions`, `campfire`, `conditions`, `gather`, `traits`, `world` and `clock` on `newGame()`: none of those files passes game time after a send (grep: no `advanceMinutes`/`passRealTime`; their `send` calls only check `setProgram` and the restart seed).
- **Slices 5–7.** The fully knowing game is read from the built data, not typed by hand. No invariant sentence or expected value changed in them.
- **Slice 8 (0044ccb).** The program reduced to the repertoire enters at `newMapRun` and at the pick. The counts stay on the full program by rule identity.
- **Slice 9 (f7fef76, 3b03486).** `minuteBeforePick`/`pickActivity` split D-71's minute with `stepMinute` kept. Discovery happens between the effect and the pick. The first-chill rule goes into the first group, or into a new group „Program”, and counts from zero. The minute of death reveals only the chill. The repertoire-test change stays within Q-S9.
- **Slice 10 (166c3c9).** The span ends at the minute of a discovery, paused, with `discovery` held and the carry dropped. `discovery` is cleared by resume, restart, end and send. Both invariant tests check their new clauses, and each has a control.
- **Slice 11 (706c97e).** The lists come from the repertoire; values outside the lists still show; „Dodaj regułę” is disabled. Finding I-1.
- **Slice 12 (1f3e291).** The text matches the task's example exactly, the line is in the role `discovery`, and it is hidden after „Wznów”.

## Coverage of the task (WAY-136)

- To do 1–7: met. The one exception is To do 4's "lists of targets" in the case of I-1.
- Rows O1–O9: each written, and each one is true in the code, with tests: `tests/sim/discovery.test.mjs`, `tests/sim/repertoire.test.mjs`, `tests/view/program-editor.test.mjs`, `tests/view/status-row.test.mjs`, and the three invariant tests.
- Q-C1–Q-C3: followed.
- Trust boundary: no file under `assets/` changed, so it stays as the handoff says.

## Declined to judge

- How the editor's repertoire and the „Dodaj regułę” rule behave with a second archetype. No archetype other than the elemental mage exists. That belongs to the task that adds one (tasks 10/12).
- Saving the Understanding and the transient `discovery` field (task 16).
- Whether the *Rejected* lines of D-121–D-126 match the options actually shown to the human. The refinement conversation they cite is no longer on disk, so only the task document could be compared, and it matches.

## Checks run

- `python -B .the-way/elements/common/foundation_check.py` (in the reviewed worktree, read-only): exit 0, "0 errors".
- A separate worktree of the head in the scratchpad, with `node_modules` linked, removed after use:
  - `npm run build`: exit 0.
  - `node --test tests/sim/*.test.mjs tests/view/*.test.mjs`: exit 0, 428 pass, 0 fail.
  - `python -B scripts/test.py tests/invariants/<file>`, each exit 0, for: `test_player_map_run_pace.py`, `test_minute_span_split.py`, `test_program_rule_pick.py`, `test_program_closed_lists.py`, `test_simulation_inputs.py`, `test_map_run_repeatability.py`, `test_content_identifiers.py`, `test_simulation_isolation.py`.
  - prettier `--check` on the changed `.ts`/`.mjs`/`.css`/`.json` files: exit 0.
  - eslint on the changed `.ts`/`.mjs` files: exit 0.
  - The scratch scripts for I-1 (`entr.mjs`, `entr2.mjs`): results above.
- Manual browser check (D-88), done in place of slices 11 and 12. Method: the built server started on port 38917 without account settings, `/api/account` answered by a Playwright route as a signed-in account, then Chromium driven by Playwright. What it showed:
  - New game: the group condition offers „Zawsze” alone. „Dodaj regułę” is disabled, its text in rgb(82,82,92) = `--text-disabled` #52525c, and a forced click adds nothing.
  - Created and sent „Ala”: the status row reads „Minuta 1 · Czeka — żadna reguła nie pasuje”, the discovery line is hidden.
  - At minute 84: „Minuta 84 · Eksploruje (pauza)”, and below it, in rgb(255,210,48) = `--discovery` #ffd230, the line „Odkryto: Eksploruj, Wędruj. W regułach można teraz sprawdzić: Temperatura poniżej … °C.” The order in the panel is status row, discovery line, body row, terrain panel. The buttons read „Wznów”, „Restart”, „Zakończ”. The lists offer „Zawsze”/„Temperatura poniżej” and „Eksploruj”/„Wędruj”. „Zawsze → Eksploruj 1×” stands in the group „Program”, and „Dodaj regułę” is enabled.
  - Still at minute 84 and paused after 3 s.
  - After „Wznów”: the line is hidden and the minute moves on (86 after 2.2 s).
  - At minute 104: paused, with the line „Odkryto: Idź, Zbierz, Patyk, Jagoda, Mech. W regułach można teraz sprawdzić: Tu leży mniej niż … szt., Zapas poniżej … szt.”, and the lists grown accordingly.
  - Screenshots: `C:/Users/Mariusz/AppData/Local/Temp/claude/C--Storage-repos-loop2/c7a2d5a0-f871-47c5-8c1f-6c77826684ad/scratchpad/s1-new-game.png`, `…/s2-first-chill.png`, `…/s3-first-exploration.png`.
- Not run:
  - The full `npm test`: it is the cycle's own run.
  - Stryker: the slices' runs were read, not repeated.
  - The I-1 select desync in a real browser: the send's real time cannot be set from the page. The desync is shown by the code path and the scratch run above.

## Reaches beyond the dispatch

- `src/browser/sim/layout.ts`: whether a tile can hold no resource (density draws, lines 38-49), for I-1.
- `src/server/configuration.ts` and `src/browser/account-api.ts`: how to serve the game without accounts for the browser check.
- `guidelines/coding-content-data.md` and the kind index of `guidelines/coding.md`: selected by `reading.md` for the data files (M-2).
- D-88 in `foundations/decisions.md`: the manual check of slices 11 and 12.
- `src/browser/tokens.css` and `guidelines/styleguide-browser-view.md` (roles `text-disabled`, `discovery`; disabled state): to judge the browser check.
- Playwright wrote its console log and snapshot to `C:/Storage/repos/loop2/.playwright-mcp/`, outside the reviewed worktree. I deleted them; the reviewed worktree is unchanged (`git status` clean, HEAD 1f3e291).
