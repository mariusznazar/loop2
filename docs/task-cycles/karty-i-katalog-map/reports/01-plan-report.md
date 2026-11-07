# Report — planner (plan-task), karty-i-katalog-map

- **Status:** done with concerns
- **Plan:** `docs/task-cycles/karty-i-katalog-map/plan.md`
- **Size report:** `docs/task-cycles/karty-i-katalog-map/plan-size.md` — `python -B .the-way/task-cycle/slice_size.py docs/task-cycles/karty-i-katalog-map/plan.md`, exit 0, all ten slices `fits` (largest: slice 8, 6 files, about 214,752 tokens to read)
- **Method:** `.the-way/task-cycle/plan/SKILL.md` read whole; no spec; route: planned slices, as the orchestrator judged — the change does not fit one slice (ten goals across the simulation, a shared control, two screens, the page's wiring and two guideline files).

## What the plan holds

- *Foundation entries*: 28 rows — the six settlements; the two new projected entries and the nine
  projected changes written whole (D-53, D-134, D-149, D-165, D-170, D-180, D-188, D-243, D-251);
  the parts of D-280, D-281, D-282, D-133 and D-03 that this task's code makes true; D-287 and D-274
  in the wording the task gives; D-217 and D-244 extended; the examples of D-55 and D-171. No
  invariant, glossary entry, environment fact or change to the part map: every new file falls under
  the existing globs of `browser-view` and `simulation`.
- Ten slices, made one after another: 1 styleguide; 2 the card's numbers and what a send takes, in
  the simulation (`map-card.ts`, `trip.ts`); 3 the kind `main` of the shared button in both forms;
  4 the pure lines leave `headquarters.ts` (`team-lines.ts`, `map-lines.ts`); 5 the card's lines
  and the „Kto idzie” lines; 6 the addresses `#/mapy` and `#/mapy/{map}`; 7 the screen Mapy in React;
  8 sending moves to Mapy (game-view, menu item, removal of sending from Siedziba, page tests,
  three-click acceptance, browser check); 9 Siedziba in React; 10 coding guidelines, the
  `loop2-play` skill copies, `README.md` and simulation comments.
- Every *Risk* is `none`: no slice touches `src/browser/sim/saved-game.ts`, `assets/icons/**`,
  `assets/fonts/**`, `assets/sprites/**`, or any other trust boundary on the part map
  (`scripts/kitchen-sink.mjs` is not touched; slice 3 changes only `src/browser/kitchen-sink/kitchen-sink.ts`).
  *Model*: `cheaper` everywhere except slice 8, which is `same` and says why.
- The slices that draw a screen or a control (3, 7, 8, 9) carry the state check in their *Goal* —
  components, states, method, evidence — and 8 and 9 add a real-browser check through
  `.claude/skills/loop2-play/SKILL.md`.

## Carried question 4 — the saved game's version

No bump is needed. The screen Mapy draws only from fields the game state already holds
(`pickedPrograms`, `lastUsedPrograms`, `lastEnteredProgram`, `loops`, `stoppedLoops`, `run`,
`solvedMaps`, `team`, `programs`). The picked map lives in the address (D-281). The card's numbers
are pure functions over the map's data (slice 2). The only change to `src/browser/sim/types.ts` is a
comment (slice 10). No slice touches `saved-game.ts`. I checked this in `src/browser/sim/`:
`game.ts` (`send`, `startRun`, `canSendMap`), `programs.ts` (`rowProgram`, `pickProgram`), `loop.ts`
(`startLoop`, `stopLoop`), `trip.ts`, `types.ts:380`.

## Guidelines found missing or uncertain

- `guidelines/coding-browser-module.md`, *Files of this kind*: the existing React file
  `src/browser/view/end-question.tsx` has no row. This task did not add the file. I note it here and
  did not plan for it.
- `guidelines/styleguide-browser-view.md`, and the task: some parts get no role. These are the
  labels of the card's parts („Żąda”, „Teren”, …), the card's values, the run sentence at each
  character (`text-secondary` in today's code, D-287 says nothing) and the empty-team sentence on
  Mapy. Slice 1 takes the role whose meaning D-39 or D-40 already gives, which needs no new
  approval (styleguide skill: "Using a meaning that a decision of the product's log already carries
  takes no approval"). Any look that needs a new meaning or value is to be reported, not written.
- The handoff says the styleguide and coding-guideline changes "go through"
  `the-way-maintain-styleguide` and `the-way-maintain-coding-guidelines`. Both skills lead a
  refinement with the human. Inside a cycle, only their column "The cycle's author, in
  `implement-task`" applies: the author writes the file from the task document after
  `product-guidelines/template.md` and the discipline's `template.md`. Slices 1 and 10 say so and put
  those files in their *Read*.

## Relation to the styleguide's example of the order of work

The example's order is: environment and library, values in their source, one screen, its states.
This plan needs no new library and no new token value (the widths are layout dimensions D-43 leaves
out). It puts the shared control (slice 3) before the screen (7), puts the screen's states in its
test and the browser check (7, 8), and only then moves Siedziba (9). One departure: the styleguide
text comes first (slice 1), so that every slice that draws reads the new rules from the guideline
file it reads whole. The coding guidelines come last because their rows name files that exist only
then.

## Reaches beyond the handoff

- **Decisions** (by searching *Scope* lines for `browser-view`, `simulation`, `build-tools`, and
  for the words „Wyślij”, "headquarters", "row of the headquarters"): D-04, D-18, D-28, D-34, D-35,
  D-38, D-43, D-45, D-47, D-51, D-58, D-60, D-80, D-142, D-146, D-166, D-169, D-179, D-184, D-207,
  D-214, D-218, D-264, D-267, D-268, D-275, D-276, D-279, D-283, D-284, D-323. These are the slices'
  *Read*, used to place the card's numbers, saving moments, React rules and the Siedziba sections.
  Of the hits on "headquarters", D-04, D-51, D-96, D-132, D-184, D-212, D-216 and D-218 stay true.
  D-169 and D-265 are covered under concerns below.
- **Invariants:** browser-view-framework, browser-view-token-values, browser-view-focus-outline,
  application-build-kitchen-sink, trip-transfer, solved-map-manual-run, mutation-test-selection,
  node-test-selection, resurrection-renewal, uncaught-failure-game-state, document-test-memory-limit,
  icon-credits (checked: no new icon). They hold what the slices reach.
- **Code and tests not on the list:**
  - `src/browser/view/away-report.ts` (a DOM part used by Siedziba);
  - `program-editor.ts` (imports `sendMaps` from `headquarters.ts`);
  - `controls/button.ts` and `controls/react-button.tsx` (the main look is drawn from `type="submit"`);
  - `kitchen-sink/kitchen-sink.ts`, `styles.css`, `clock.ts`, `loop.ts`, `programs.ts`;
  - `stryker.config.json` with `tests/quality/test_mutation_test_selection.py` (a new `tests/sim`
    file must be listed);
  - `tests/view/account-screen.test.mjs` (it holds every page-level case of sending from Siedziba),
    `menu-bar.test.mjs`, `screen-address.test.mjs`, `uncaught-failure.test.mjs`.
- **Instructions and docs:** `.claude/skills/loop2-play/SKILL.md:63,132` and its byte-identical
  copy under `.agents/` (guarded by `tests/agent_workflow/test_loop2_play_skill.py`) tell an agent to
  click „Wyślij” at the character, and `README.md:76` describes the same manual check. After the
  change they are untrue, so slice 10 rewrites them.
- **Comments:** the simulation's comments place the pick in the "headquarters row" at
  `game.ts:359`, `programs.ts:357,532`, `types.ts:380` and `data/maps.ts:52`; slice 10 fixes them.
  The view's comments at `trip-lines.ts:23` and `program-editor.ts:174` are fixed in slices 5 and 4.
- **The old Loop:** `old-loop-repo` at `cdc7c0d`, `src/components/probe/MapPage.tsx` and
  `src/components/probe/mapFacts.ts`. Read as material only: `TYPICAL_STEP` (the step most maps
  have) and `resourceSpread` (`round(density × tiles)`), which support two *Choices*.
- **the-way:** `elements/common/way_of_working.md` ("Reading the foundation"),
  `product-guidelines/reading.md`, the head of `product-guidelines/styleguide/SKILL.md`,
  `task-cycle/skill/foundation_step.md`, `task-cycle/skill/planning.md`,
  `task-cycle/skill/SKILL.md:265-304`, `task-cycle/slice_size.py`.

## Searches not found or unclear

- **What counts as the "usual" step** („krok inny niż zwykły”): neither loop2's data nor its
  foundation defines it. Plan *Choice*: the step most maps' data give, the first in data order on a
  tie, as the old Loop counted it; no new data value.
- **„bez ognia” at a map that does not cool the body:** the task gives no text for it (the old Loop
  had „nie stygnie”). *Choice*: the item is left out. No map today is like that.
- **The chance in „{p} % szansy”:** the task gives no notation. *Choice*: Polish notation, at most
  one decimal („1 %”).
- **Focus on Mapy after „Puść w pętlę” and after „Zatrzymaj”:** the task does not say where the
  keyboard's focus goes; each button turns inactive or disappears under the keyboard. *Choice*:
  „Zatrzymaj” after „Puść w pętlę”, then „Wejdź” after „Zatrzymaj”.
- **The clipped-plan line (D-188) on the screen:** no map has an entry cap today, so the state
  cannot be reached on the screen. It is covered by the cases of `tripWarning`, and slice 7 names it
  as a state no map reaches.
- **D-265's *Verification* example:** „a new section of the headquarters built in DOM” speaks of a
  screen that slice 9 moves to React. The task lists D-265 as touched without change.
- **D-169's *Rationale*:** it names „the select lists of the program panel and of the headquarters”,
  and the list moves to „Kto idzie”. The task does not list D-169.
- **The word "card":** it now has two meanings, the card of a character on Siedziba (D-217, D-244)
  and the card of a map on Mapy. Every use qualifies it ("of a character" or "of a map"), so I
  planned no glossary entry.

## Questions and concerns

None of these blocks the plan. Each has a proposed answer.

1. **The usual step** is a *Choice*, not a foundation entry. The foundation writer of Settlement 1
   may name it in the decision ("the step most maps' data give"). If the orchestrator judges it a
   product meaning beyond the row, it goes to the human as a question the foundation step allows.
   Proposed answer: keep it as the plan's *Choice*.
2. **The stale D-265 example and D-169 rationale** (see above). Proposed answer: the
   foundation-entries agent leaves them, because the task does not carry them. The orchestrator
   names them in the request as left for the next foundation review.
3. **A blank screen between slices 6 and 8:** after slice 6 the addresses `#/mapy` and
   `#/mapy/{map}` resolve, but they show no screen until slice 8 builds it. Nothing links to them
   before slice 8, and no test uses them. The review of the whole change judges the final state.
   Proposed answer: accept it.
4. **Slice 8 is the largest** (about 215k of the 250k-token limit), because
   `tests/view/account-screen.test.mjs` (231k characters) must be read whole. If the orchestrator
   adds to its *Read*, slice 8 may need splitting. The way to split it: take the removal of sending
   from `headquarters.ts` and the migrated page cases into a slice of their own, after the wiring.
5. **Slice 9 must keep `tests/view/account-screen.test.mjs` passing without changing it.** The
   React Siedziba has to keep the class names and accessible names that test reads. If a case
   breaks only on structure, the agent will touch a file outside the slice's *Change*, which the
   orchestrator's mechanical check will report to the review.
