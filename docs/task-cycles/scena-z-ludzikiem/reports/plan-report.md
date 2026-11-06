# Report — planner of the task `scena-z-ludzikiem`

- Status: **done with concerns**
- Plan: `docs/task-cycles/scena-z-ludzikiem/plan.md` — 6 slices, foundation entries E1-E10 and Rows 1-9
- Size report: `docs/task-cycles/scena-z-ludzikiem/plan-size.md` — `python -B .the-way/task-cycle/slice_size.py docs/task-cycles/scena-z-ludzikiem/plan.md` exit 0, all 6 slices fit (largest Slice 4, about 120k estimated tokens, 5 files). A first run left Slices 4-6 unchecked because their *Read* named files earlier slices create; those files now stand in the slices' *Goal* (as task 6's plan did), so their reading is not counted by the script.
- Method: `.the-way/task-cycle/plan/SKILL.md` at the pin `61c72fb` (gitlink and `git -C .the-way rev-parse HEAD` agree). `too_large.md` not read: no attempt or slice proved too large.
- Written: only `plan.md`, `plan-size.md` and this report. No code, test or foundation entry.

## Open design choice and reserved choice

- Open design choice: none. Reading the code showed no entry the change needs beyond the task's rows and the projected entries it carries, and no way that is costly to turn back. The five questions carried to the cycle are answered in the plan's *Choices*, rows 1, 2, 3, 6 and 7. Two things looked like candidates and are not:
  - The invariant `loop2-container-sprites` is missing from `foundations/invariants.md` at the base. The task carries it ("zapis wpisu, jeśli nie zapisało go zadanie 6", task line 191), so the foundation step writes it (E10). Its check is a choice of how (plan *Choices*).
  - The mage's place when it "stays" and its instant placement need the scene's previous reading and the event `mapRunStarted`. The projected part of D-04 the task carries (task lines 180-181) allows exactly this (E5). No field enters the game state.
- Reserved choice: none. React and CSS only; the one-off Pillow script stays under `.runs/` and enters no part of the product, as in task 6.

## Order of slices and the styleguide's example

The styleguide's example "Plan of a user-interface change" (`guidelines/styleguide-browser-view.md:519-526`) runs: environment and library, then values in their source, then one screen, then its states. The plan follows that order:

1. Slice 1: the sprite files (environment).
2. Slice 2: the container check.
3. Slice 3: the data file and the pure function (the values in their source, the game's data).
4. Slice 4: the scene drawn still (one screen).
5. Slice 5: its motion and its stops (its states).
6. Slice 6: the guidelines.

The example does not say where guideline edits go. Putting them last is the plan's own choice: their text describes code that exists by then.

## Guidelines found missing or uncertain

1. `guidelines/styleguide-browser-view.md` has no rule for the scene yet. To do 14 adds one in Slice 6. This gap is expected, not a defect.
2. The styleguide lists the kinds of values that become tokens: font stacks, sizes, spacing, frame, bar and line widths, dash, opacity, weight. Neither motion durations (160 ms, 640 ms, 200 ms) nor filters (`grayscale(…) brightness(…)`) are on the list, and D-43 does not count them either. It is uncertain whether they belong in `src/browser/tokens.css`. The plan keeps them as values of the scene's rules in `src/browser/styles.css`, each with its source (plan *Choices*). If the orchestrator reads the styleguide differently, five values move to the token file, and each needs a source settled with the human.
3. The rule "Every background with its text" says that every element with a `highlight` or `panel` background gets a text colour. The bar's track (`highlight`) holds no text, and the rule does not say whether it still needs a text role. Slice 4 follows the rule as written. Slice 6 may need to say how the rule reads for a track.
4. `guidelines/coding-browser-module.md` has no example of CSS animation in a React component. D-03 accepts the risk that "a rebuilt node may restart a CSS animation". Slice 5 handles it from the risk's wording alone, with no exemplar, so the plan gives Slice 5 the strongest model class.
5. `guidelines/testing.md` has no recipe for checking motion. D-254 and `.claude/skills/loop2-play/SKILL.md` cover the agent's stream of frames, and D-75 and D-88 leave the rest with a person. Nothing is missing, but no fixed test of motion exists by design.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| The event kinds and `restart` | `src/browser/sim/run.ts:62-82`, `src/browser/sim/game.ts:188-260`, `:425-443` | to confirm that `mapRunStarted` marks a start and a „Restart”, for instant placement (Slice 5) |
| `renderScreens` and the run screen's update | `src/browser/view/game-view.ts:530-556` | to confirm that the events reach `createRunScreen.update`, so Slice 5 needs only to pass them down |
| How the rule's row draws an action's icon | `src/browser/view/rule-list.tsx:476-487`, `src/browser/styles.css:465-477` (`.action-icon`), `src/browser/view/controls/pick-cell.ts`, `react-pick-cell.tsx` | the badge reuses the same icon (D-291) |
| Build and image paths for sprites | `.dockerignore`, `Dockerfile:10`, `README.md:25` | To do 12; the README sentence that Slice 1 extends |
| The pattern for a container test and the guard of token values | `tests/invariants/test_loop2_container_icons.py:1-80`, `tests/invariants/test_browser_view_token_values.py:1-80` | the check of E10 (Slice 2); whether a `px` written in TypeScript is read by the guard (it is not, so Slice 4 keeps the guard unchanged) |
| The icons test's case for "each icon the data names exists" | `tests/view/icons.test.mjs:255-270` (case names) | the model for Slice 3's case marked with E10 |
| Further decisions: D-21, D-38, D-47, D-68, D-75, D-88, D-212, D-265, D-267, D-268, D-279 (headings and first lines, D-68 and D-212 whole) | `foundations/decisions.md` | named in the slices' *Read* as the parts they touch need |
| Invariants of `browser-view` and `every` | `foundations/invariants.md` (*Part* lines, then entries 35-73, 187-246, 319-364, 409-497, 1189-1217) | the method's "invariants the slice reaches" |
| Glossary entries | `foundations/glossary.md:18-23, 65-71, 80-85, 111-115, 130-134, 136-140` | the terms the plan uses |
| `.the-way/product-guidelines/reading.md` | first part | how to choose the guideline files for each slice's *Read* |
| The old Loop's chunks of `fire.png`, `moss.png`, `sticks.png`, `bush.png` (IHDR, IDAT, IEND only) and the pack's Bonfire directory | `C:\Storage\repos\loop\public\sprites\`, `C:\Storage\repos\loop\assets\pixel-crawler\Environment\Structures\Stations\Bonfire\` | to settle whether the fire and props can be copied as they are (Slice 1), read-only |
| The old Loop's notes on the packs | `C:\Storage\repos\loop\assets\README.md` | how the old Loop cut the mage's frames |
| Task 6's cycle record and plan, from git history | `git show 2aae30a` (`docs/task-cycles/ekran-przejscia/cycle.md`, `plan.md`, `plan-size.md`) | whether the human chose the scene's size; how that plan named files created by earlier slices |

## Searches not found or unclear

- **`loop2-container-sprites`**: not in `foundations/invariants.md`, and not in any test, guideline or script. Task 6 carried the invariant but did not write it. This task writes it (E10).
- **The scene's size**: unclear. At the base, `SCENE_SCALE` is still 2 (`src/browser/view/world-area.tsx:30`), with the comment "Committed as 2 until that choice". Task 6's record (`git show 2aae30a`, `cycle.md` line 188) says request #58 was made ready "the human's choice of the scene's size waiting in it". The request was merged with 2. The tree does not record whether the human chose 672 × 304 or merged without choosing (report, question 2).
- **The value of grey for the dead mage and the extinguished fire**: the task says the dead mage is "szary" (To do 9) and the extinguished fire stands "bez koloru" (To do 4). It gives no value for either; only the pause has one, `grayscale(1) brightness(0.5)` (report, question 1).
- **Where the old Loop's `sticks.png`, `bush.png` and `moss.png` came from in Pixel Crawler**: not found by file name in the pack. The fire probably comes from `Environment\Structures\Stations\Bonfire`. Slice 1 confirms each source, or leaves the picture out.
- **D-122's "Accepted with it"**: it says "a stop at a discovery cannot be told apart in the game state from the player's pause", but the code's `state.discovery` contradicts this. The task leaves the correction to task 16 (task line 132). The plan relies on `state.discovery`. The foundation step should leave that sentence for task 16 and not use it.
- **The badge's size**: not settled anywhere. The task leaves it to the cycle (carried question 5), and Slice 4 chooses it by viewing.

## Questions, with the proposed answers the plan adopts

1. **What grey do the dead mage and the extinguished fire take?** Proposed: one value for both, the old Loop's `grayscale(1) brightness(0.55)` (`C:\Storage\repos\loop\src\components\probe\sprites.tsx:64`, cdc7c0d). This is the value the old Loop draws for both cases (`Scene.tsx:217`, `:236`). The task's question 3 cites that drawing for "the same picture without colour" (`Scene.tsx:210`).
   - Way not taken: `grayscale(1)` alone, read from "bez koloru".
   - If nothing is chosen: Slice 4 has no source for the value. The rule "Every value with its source" asks for a source settled with the human.
   - Cost of the proposal: one value. The human may see it at the request and change it.
   - The plan proceeds with the proposal. Slice 4's *Goal* names the answer as the orchestrator's, so a different answer changes one sentence.
2. **Does the scene stay at 672 × 304?** Proposed: keep the base's `SCENE_SCALE` of 2 and give every place in pixels of the 336 × 152 frame, drawn at the scale. Either size then works without a change of this plan. Task question 9 says the task returns to refinement only if 336 × 152 wins, and the base does not show that.
3. **Is a second Docker image build in the gate acceptable for the check of `loop2-container-sprites`?** Proposed: yes. The check is a container test modelled on `test_loop2_container_icons.py` (Slice 2), together with a case in `tests/view/scene-picture.test.mjs` (Slice 3).
   - Way not taken: the method `review`, which costs nothing in the gate. The sentence would then rest on review while tasks 17-20 add sprites.
   - Cost of the proposal: some minutes of gate time where Docker answers, and a skip (unchecked) where it does not.
   - It also adds a file of the part `deployment`, a part the orchestrator's route did not name, together with a change to the part map.

## Concerns

- Slice 2 reaches the part `deployment` and `foundations/part_map.md` (through `the-way-update-part-map`). The route the orchestrator gave named `browser-view`, `simulation`, `agent-workflow` and `product-foundation` (question 3 above).
- Slice 5 is the riskiest slice:
  - motion that freezes at four kinds of stop;
  - a walk that turns on the way;
  - a redraw five times a second that must restart nothing.

  No fixed test can show motion. jsdom shows classes and places, the agent's stream of frames shows what it shows, and the human's viewing at 1×, 4× and 16× stays before the merge (D-254 records that frames may miss a jerk at 16×).
- Slice 1 is the only slice with a risk of its own (`trust boundary — assets/sprites/**`), so it gets a review of its own. Slices 2-6 are judged by the review of the whole change.
- The plan names `sticks.png`, `berry-bush.png` and `moss.png` as files. Their names are free of the content-identifiers rule, which covers TypeScript only. The view still reads them from the data alone.
