# Return report — raport-z-wyplata (the return step, the one author resumed)

**Status:** done

**Commit:** `92b8311a` (range `e3f64ea9..92b8311a`; 3 files: `foundations/invariants.md`, `foundations/decisions.md`, `tests/sim/loop.test.mjs`). Nothing else was committed.

**Check:** `python -B .the-way/elements/common/foundation_check.py` → `0 errors`, exit 0, after the commit (also without `--skip-test-citations`, so the new invariant's citation is found). Not run: the full gate.

## Foundation compared with code

Compared one by one with the code at `e3f64ea9` (`src/browser/sim/loop.ts`, `types.ts`, `saved-game.ts`, `view/away-report.ts`, `view/headquarters.tsx`, `view/game-view.ts`, `view/controls/*`, `styles.css`, `kitchen-sink`):

- The entries the change wrote or changed — D-189, D-245, D-246, D-241, D-207, D-39, D-44 and the styleguide (the Roles table row, "States of shared controls", "Main button, secondary action and tab", the kitchen-sink rule): all match the code. Checked: the report line holds no practice (`AwayReportLine` without `practice`); the waiting practice is `loop.practice` plus the going run's practice, read at drawing; „Odbierz” empties both and leaves backpack, run, loop and chest; a completion afterwards adds only the run's later practice and a stop pays and records only what waits; a line stopped by a death and a line without a loop have no part and no button; `act` saves at once; the button kind `positive` draws text in `positive` at rest and under the pointer, `text-disabled` when disabled (the rule is later in the sheet than `.button.positive`); the kitchen-sink sample shows the states and the reasons the others do not apply. Result: nothing no longer matched.
- Entries the task names — D-274 (its "an action of the headquarters made with the plain shared button" and "any other action … keeps the button D-44 gives it": „Odbierz” is the button D-44 gives it, kept), D-190 (a death with no resurrection ready takes all practice, the practice gathered at the loop included; taken practice is the character's practice, so it goes with the rest — the accepted cost in D-189), D-240, D-183, D-206 (the bump 4 → 5 discards a saved game state of version 4 whole, as D-206 says), the invariants `trip-run-end`, `catch-up-state`, `save-version`, `death-settled-once` (sentences unchanged and still true; their tests ran green), the glossary entries `practice` and `resurrection`: nothing untrue.
- Part map `browser-view`, `simulation`, `product-foundation`, `agent-workflow`: read whole; no file added, moved or re-assigned; the view depends on the simulation as before. Nothing to correct.
- The gaps the earlier stages left, each read whole now: D-239, D-242, D-247, D-248, D-249, D-201, D-216, D-221, D-212, D-193, D-194, D-62, D-185 (and, because the search found them, D-85, D-369); the glossary whole (all 38 entries); the invariants whose sentence names an earning loop, practice, the catch-up, a saved game state or the report. D-201 (the manual run's practice line), D-193, D-194, D-62, D-185, D-216 and D-85 are about a manual map run, the end-of-run window or test exemplars; D-239, D-242, D-247, D-248, D-221, D-212, D-249, D-369 are about time, the catch-up, the save time, the settling of a death, what a manual map run keeps and the discovery of a loop's map run. None says what a report line holds, none says when practice of a loop is paid, none lists the button kinds. D-249's "a discovery named in the report" and D-212/D-369's remarks on the version stay true. Nothing to correct.
- The search of the whole foundation (decisions, invariants, glossary, part map, guidelines, `AGENTS.md`, `src/browser/AGENTS.md`) for: the former wording „wprawa: …” of the report line (only D-245's „Pętla zatrzymana · wprawa: …”, which is the stop line, not the report), „until the loop stops” / „when the loop stops” / „at the stop” beside practice (D-189, D-241, D-245, D-190: all four now say what holds after „Odbierz”, or are the stop's own wording), the report line's practice part, and any sentence that says the report holds the practice gained in the catch-up (none left: D-246's verification example was corrected in the change, `catch-up-state` speaks of character and chest only). Entries found by the search of *Part* / words and read whole: D-04, D-07, D-96, D-109, D-209, D-237 (they speak of the saved game state in general, not of the loop's practice or the report). `guidelines/coding-saved-game.md` says the reader's `practice` reads "the practice of a run and of a combat" with values from 1: still true for the loop's practice and the run's practice (an emptied record is `{}`).

## Decisions written or changed

D-189 *Verification* only: `loop-practice-payment` added to the invariants it names (the new invariant derives from it). No other decision changed in this step (the change's own edits of D-189, D-245, D-246, D-241, D-207, D-39 and D-44 stand in `caf7bf39`, `be946654` and `1a4b79b8`).

## Invariants written or changed

`loop-practice-payment` — "The practice an earning loop gathers is added to its character's skills once, whichever of „Odbierz”, the completion of the map run it was gathered in and the stop of the loop pays it." Method `test`, *Derives from* D-189, *Part* simulation, *Rests on* none, *Violated* no. Rule set by the task (item 3: "Wypłacona wprawa nie wraca drugi raz … ukończenie tego przejścia dodaje do pętli tylko wprawę zebraną po „Odbierz”, a późniejsze „Zatrzymaj” wypłaca … tylko to") and by the approved D-246 ("after „Odbierz” it and the button are gone until the earning loop gathers more"). Tests citing it, `tests/sim/loop.test.mjs`: "practice taken is paid once: the completion of the map run it was taken in adds only what came after, and so does the stop" (re-tagged from `trip-run-end`, whose sentence is about carried items) and "taking the practice twice in a row pays it once …".
Seen failing once with the command that later shows it passing: with `takeLoopPractice` leaving `loop.practice` unemptied, `npm test -- tests/sim/loop.test.mjs` → exit 1 (four tests failed, both citing tests among them); code restored, the same command → exit 0, 44 pass.

## Environment facts

none (the change rests on no source outside the product; the public screenshots repository is already in the part map's external context).

## Glossary terms

none. "Practice waiting" / "practice taken" use `practice` in the entry's meaning; no word is used against its entry. The glossary's `headquarters` ("shows the player's team with its characters and its chest") was already incomplete before this change (the report stood there); not caused by it and left.

## Part-map changes

none.

## Projected entries written whole or in part

D-189, D-245 and D-246 were written in the foundation step (`caf7bf39`, brought to the approved wording in `be946654`, `1a4b79b8`); the return step wrote none more.

## Rows of *Settlements to record* written

Row 1 (the number „wprawa do odebrania” follows the game, gone and back after „Odbierz”): written as part of D-246 (`caf7bf39`, as the task's note says). Row 2 („Odbierz” as the plain button with text in `positive`): written in D-44 and D-39 (`caf7bf39`, `be946654`). None written in this step.

## Choices that bind after the merge

- **How the state remembers that practice was paid: nothing is remembered; a payment empties what waits** (`EarningLoop.practice` = practice gathered since the last „Odbierz”, and the going run's practice is emptied with it). **Written:** D-241 (binding sentence and rationale), D-246 (the waiting practice is read from the loop), and now the invariant `loop-practice-payment`. Version bump 4 → 5: written by the code and D-206's general rule; no extra entry.
- The button kind `positive` and its look: **written** (D-44, D-39, styleguide).
- Focus goes to „Zamknij” when „Odbierz” takes the last practice of the section's lines and its button leaves the page: **stays a question-table row** (not written): a detail of how the screen is made, held by one jsdom case; the existing rule for „Zamknij” (focus to „Drużyna”) has no entry either, and no task or decision sets it.
- The accessible name of the button, „Odbierz: {imię}”, as „Zatrzymaj: {imię}” has: **stays a question-table row** for the same reason.
- The line's layout (text and button side by side): **stays** — stylesheet detail, no rule.

## Unread material

Read whole in this step: `return-handoff.md`, `.the-way/task-cycle/skill/return_step.md`, `foundation_step.md` (read before), `elements/common/way_of_working.md`, `elements/invariants/template.md` and `skill/*.md`, the record template's *Return step*, the glossary, D-239, D-242, D-247, D-248, D-249, D-201, D-216, D-221, D-212, D-193, D-194, D-62, D-185, D-85, D-369 and, from earlier in the cycle, D-39, D-44, D-45, D-189, D-190, D-183, D-206, D-207, D-213, D-240, D-241, D-244, D-245, D-246, D-265, D-269, D-274, D-275, D-326, D-386, the part map.
Not read whole: D-04, D-07, D-96, D-109, D-209, D-237 (found by the search of words and judged from the passages around the hits, since they speak of the saved game state in general); `foundations/invariants.md` other than the entries named above (read by their sentences, found by a search of the words "practice", "report", "earning loop", "catch-up", "saved game state", "button", "positive"); the decision log beyond the entries named (a search of the log by those words, not a reading of it); `elements/decisions/examples.md`, `elements/invariants/examples.md`, the skills of the glossary, part-map and environment-fact elements (no entry of those elements written).

## Searches not found or unclear

- The invariant template is marked "Draft" and its identifier rule says the name constrains "what", not what it demands; I chose `loop-practice-payment`; whether the other test citing `trip-run-end` for chest-related checks in „Odbierz” tests should stay (I left the `trip-run-end` tag on "taking the practice pays what the loop and its map run going on gathered …", which asserts the chest stayed as it was) is a judgement of mine.
- No rule in `return_step.md` says whether a rule set by a task item ("paid once") is an invariant or a plain consequence of D-189; I wrote the invariant on the reading "a rule the task … sets"; if the orchestrator reads it as "behaviour merely because no invariant covers it", dropping it is: delete the entry, its name in D-189 *Verification* and the two citations.
- No entry was found for the focus rule of „Zamknij” or for the accessible names of the report's buttons.
