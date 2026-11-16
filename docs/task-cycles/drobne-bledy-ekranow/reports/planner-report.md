# Planner report — drobne-bledy-ekranow

**Status:** done with concerns

- Plan: `.runs/task-cycles/drobne-bledy-ekranow/plan.md` — Foundation entries (17 rows, 15 of them
  for the agent of the entries), 21 slices, all `cheaper`, all with *Risk* `none`.
- Size report: `.runs/task-cycles/drobne-bledy-ekranow/plan-size.md`.
- Check: `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/drobne-bledy-ekranow/plan.md`
  exit 0, every slice `fits` (largest: Slice 18, 147 008 estimated tokens; Slice 2, 142 973). Not
  run: the foundation check and every test — the plan writes no code.

## Concerns

1. **Decision rows are written by the agent of the foundation entries, not by the slices.** The
   handoff asks that a slice changing a decision's sentence come with the code that makes it true,
   or after it. `foundations/decisions.md` is about 1.24 M characters, so any slice whose *Change*
   names it is "too large" for `slice_size.py`, whatever else it holds (a file in *Change* counts
   whole). So every decision and styleguide row (1–9, 11–15, 17) goes to the agent of the
   foundation entries before Slice 1. To keep the foundation check green at its head, that agent
   re-quotes each `decision:` line of a test whose quotation its change leaves standing in no
   binding sentence (`foundation_check.py`, WAY-12). The plan lists the lines found at the base:
   D-297, D-207, D-381, D-172 and D-285, and possibly D-306 and D-294, in nine test files. Cost:
   between the commit of the entries and the slice of the code, the foundation says what the code
   does not do yet, and some tests holding the old behaviour quote the new sentence. Rows 10 and 16
   go to code and data, so Slices 21 and 1 write them.
2. **The agent of the foundation entries changes test files.** It changes only `decision:` comment
   lines, in up to nine files: `tests/view/program-editor.test.mjs`, `tests/view/rule-editor.test.mjs`,
   `tests/account-api.test.mjs`, `tests/view/account-screen.test.mjs`, `tests/view/game-saver.test.mjs`,
   `tests/sim/copy-actions.test.mjs`, `tests/sim/trip.test.mjs`, `tests/view/program-panel.test.mjs`
   and `tests/view/menu-bar.test.mjs`. The mechanical check of slice 1 against the Foundation
   entries should expect them. The note under the table names them.
3. **Slice 3 leaves `tests/view/rule-editor.test.mjs` red until Slice 4.** The unit in the rule's
   sentence changes four expectations there. That file (97 k characters), `program-editor.test.mjs`
   (69 k) and `program-editor.ts` cannot share one slice under the reading limit. Slice 4 follows at
   once and fixes them. Slice 3's report is told to name the red file.
4. **Slice 20 (To do 12) may end with no commit.** Where the replay shows both numbers follow D-194
   and D-201 — which the rules suggest: „Zakończ” before a completion pays nothing — the slice
   changes no file, and its result is its report for the request. The orchestrator's mechanical
   check asks for a non-empty range. Proposed: record Slice 20 as made with no commit when its
   report says nothing was fixed. The handoff asked for a slice of its own, so the plan did not
   attach it to another slice.
5. **Examples in decisions that are not binding will lack the unit after Slice 3.** Nothing checks
   these: the *Verification* and *Rationale* of D-306 („Zapas poniżej 8 · Patyk → Zbierz — Patyk”)
   and the complies line of D-295 („Temperatura poniżej 35”). No settlement row carries them.
   Proposed: the writer of row 2, who rewrites D-306 anyway, brings D-306's examples in line and
   marks that part `the cycle's`; D-295 stays and becomes a Minor finding. Or both stay. This is the
   orchestrator's call.
6. **Row 10 and To do 22 name `src/browser/styles.css`**, but since loop2#145 the rule with
   `grayscale(1) brightness(0.55)` stands in `src/browser/run-screen.css` (line 744 at the base).
   Slice 21 writes the comment where the rule stands, as the handoff's "find them by their content"
   allows.

## Questions

None that block the plan. Concern 4 (an empty range for Slice 20) and concern 5 (examples in D-306)
need the orchestrator's decision. For each, the proposed answer is in the concern above.

## Order and the styleguide's example

The order follows the example "Plan of a user-interface change" in
`guidelines/styleguide-browser-view.md`: values in their source first (Slice 1, the units in the
data), then the shared control (Slice 2, the pick cell), then the screens and their states. The
example's first steps (fonts, tokens) do not arise here: no token or font changes.

## Guidelines found missing or uncertain

- `guidelines/coding.md` holds no rule of size (WAY-365), so the plan holds no slice that moves code
  first.
- No guideline file is missing for the parts the work touches. `guidelines/coding-browser-api-client.md`
  was read as the handoff asked, but no slice changes a client of the API: `game-saver.ts` is a view
  module, so no slice's *Read* names that file.

## Reaches beyond the dispatch

- `foundations/decisions.md`, D-194 and D-201 whole: to cut Slice 20 and see what the rules say of
  the two numbers of To do 12.
- `.the-way/elements/common/foundation_check.py:60-89` and `.the-way/elements/decisions/template.md:228-247`:
  how `decision:` quotations of tests are checked. This decides who may change a decision's sentence
  without turning the check red.
- `.the-way/task-cycle/skill/SKILL.md:380-419`: how the orchestrator dispatches the plan's Foundation
  entries and checks slices mechanically.
- `.the-way/product-guidelines/reading.md` whole and `.the-way/product-guidelines/styleguide/SKILL.md:1-40`:
  how a slice's guidelines are selected, and who writes a styleguide row in the cycle.
- `.the-way/task-cycle/change/ui_check.md` whole: named in the *Read* of the slices that change a look.
- `.the-way/task-cycle/slice_size.py:1-62`: the limits, to cut slices.
- Code and tests read only to cut slices and name files: `src/browser/sim/data/conditions.ts`,
  `src/browser/view/program-editor.ts` (parts), `rule-panel.tsx` (parts), `program-panel.tsx`
  (parts), `rule-list.tsx` (parts), `terrain-drawing.tsx`, `headquarters.tsx` (parts), `app.ts`
  (parts), `end-question.tsx` (head), `scene.tsx` (parts), `maps-screen.tsx` (parts),
  `game-view.ts` (parts), `src/browser/styles.css` (parts), `program-panel.css` (parts),
  `tests/view/game-stylesheets.mjs` (head), `tests/view/account-screen.test.mjs` (harness index),
  and searches across `src/browser` and `tests`.

## Working copies

None made. The directory `.runs/planner/` was not created, so nothing remains.

## Unread material

- D-316, D-322, D-336, D-348, D-370, D-371 and D-396: read in part — their binding sentences in the
  decision index (`decision-index.md`), not the whole entries. None of them is changed by the task,
  and the handoff asked for whole entries only for the changed ones. D-41, D-208, D-294, D-318,
  D-319 and D-421 were read whole. So were the nine changed decisions (D-04, D-172, D-207, D-285,
  D-297, D-306, D-342, D-350, D-381), with *Rejected*.
- Invariants: of those whose *Part* names browser-view, simulation or `every`, I read whole the
  seventeen the handoff names and these others: simulation-isolation, simulation-inputs,
  content-identifiers, map-run-tiles, restart-seed, exploring-reveal, icon-file-content,
  icon-credits, loop2-container-icons, map-run-layout, application-build-kitchen-sink, character-team,
  minute-span-split, streak-program-change, saved-program-edit, copy-save,
  expired-session-unsaved-progress, saved-state-http-exchange, document-test-memory-limit,
  sprite-file-content, loop2-container-sprites, rule-state-from-pick, uncaught-failure-game-state and
  cross-part-imports. The others of those parts I read only by heading and *Part*, from a search of
  the headings: for example the account invariants, nature-energy-range, the trip invariants, the
  catch-up invariants, loop-practice-payment, first-map-stock and new-account-first-pass.
- Every other file the handoff names was read whole: the task, the decision index, `sections.md`,
  the part map, the glossary, the seven guideline files, `src/browser/AGENTS.md` and
  `foundation_step.md`.

## Searches not found or unclear

- To do 3 says the task "adds the unit to the data of conditions", but every condition with a
  number already has a `unit` in `src/browser/sim/data/conditions.ts`. No view reads it except the
  band of a discovery (`status-row.ts`). Slice 1 therefore makes the type or a test require the unit.
- To do 4, „odrzucony odnośnik z maila”: unclear whether this covers only the refused link of
  „Ustaw nowe hasło” or also a refused link confirming an address (D-156). Both end in the session
  check in `app.ts`. The plan reads it as every emailed link the server refused, and row 17's
  wording settles it for the decision.
- To do 5, „przy postaci w pętli”: the task does not name the screen. „Zatrzymaj” stands on
  Siedziba, Postać and Mapy. Mapy already moves the focus after it (`OwedFocus` in
  `src/browser/view/maps-screen.tsx`), so Slice 14 covers Siedziba and Postać.
- To do 13, "the comments of the old DOM editor" in `program-editor.ts`: a search for „DOM” and
  „createElement” found none. The only candidate seen is the doc comment of `focusAfter`
  („… the new row's condition select”). Slice 6 is to find them.
- To do 25, "seven comments … above": a search for „above” in the screens' stylesheets finds seven
  that point to a rule in another file. They are `maps-screen.css` (2), `knowledge-screen.css` (2),
  `program-panel.css`, `programs-screen.css` and `run-screen.css`. Slice 21 names them by file and
  finds them by content.
- Row 10 and To do 22 name `src/browser/styles.css`, but the rule stands in
  `src/browser/run-screen.css` (concern 6).
