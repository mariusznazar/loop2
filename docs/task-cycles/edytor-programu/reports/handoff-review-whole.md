# Handoff — review of the whole change, task `edytor-programu`

## Delegation
The person who requested this cycle delegated every intermediate choice to the orchestrator of `implement-task`. You never ask the human; a question goes back in your report. You are read-only: change no tracked file, commit nothing. You may run `npm run typecheck`, `npm run build` (writes only the ignored `dist/`) and single focused test files (`npm test -- <file>`); do NOT run the full gate `npm test` with no argument: the orchestrator runs it once afterwards.

## Where you work
- Worktree (work from its root): `C:/Storage/repos/loop2-wt/edytor-programu`, branch `task/edytor-programu`. Pinned process: `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
- Method: read in full `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`), then `.the-way/task-cycle/review/whole_change.md`. You review **the whole change** (planned route, 14 slices). You alone select your own foundation and guidelines: the parts the change touches are browser-view, simulation, agent-workflow, product-foundation (by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` and `.the-way/product-guidelines/reading.md`); each entry and guideline file whole.
- Range: `6fec0ea2de6033b4e46c43fc8593014b08eef542..01363a5` (the task's base to the head; confirm `git rev-parse HEAD` is `01363a5...`). 
- Report: `docs/task-cycles/edytor-programu/reports/report-review-whole.md` (if your tool refuses the file, return the whole report as text); first line `PASS <sha>` or `FAIL <sha>`. For each blocking finding name the slice it comes from by its number and commit, or say that it spans slices, or that it comes from none (a gap of the plan, or of the plan's *Foundation entries*).

## What you read (besides your own selection)
- Frozen task, whole: `docs/task-cycles/edytor-programu/task.frozen.md`. Plan: `docs/task-cycles/edytor-programu/plan.md`; the plan's review and the cycle's choices are in `docs/task-cycles/edytor-programu/cycle.md` (questions and autonomous choices Q1–Q10, P1–P28).
- The change is: the foundation step first, then 14 slices made one after another. Ranges (base..head) and whether the slice had a review of its own:

| Part | Range | Own review |
|---|---|---|
| Foundation entries (agent of the plan's *Foundation entries*) | `6fec0ea..083b347` (commits 4a6fe50, 18e2afa, 083b347) | none — covered by your review; its report `reports/report-foundation.md` |
| Slice 1 styleguide | `083b347..5836c0b` | none |
| Slice 2 composed game state | `5836c0b..fccc084` | none |
| Slice 3 six icons | `fccc084..9a8c4e2` | yes — PASS 9a8c4e2 (`reports/report-review-3.md`) |
| Slice 4 five icons | `9a8c4e2..ad60b00` | yes — PASS ad60b00 (`reports/report-review-4.md`) |
| Slice 5 pure offer and rules | `ad60b00..23ad6bf` | none |
| Slice 6 pick cell | `23ad6bf..69158b7` | none |
| Slice 7 select list and number field | `69158b7..ba30024` | none |
| Slice 8 destructive buttons | `ba30024..3afd424` | none |
| Slice 9 rule list | `3afd424..2bf7d42` | none |
| Slice 10 rule panel | `2bf7d42..ee9cab2` | none |
| Slice 11 trip plan (second dispatch; first attempt returned with no code) | `ee9cab2..9d1d5f2` | none |
| Slice 12 program panel (commits d88b366, 3d81280) | `9d1d5f2..3d81280` | none |
| Slice 13 editor in place, DOM editor gone | `3d81280..3664173` | none |
| Slice 14 coding guidelines | `3664173..01363a5` | none |

- Executor reports (claims to verify, not evidence), each in `docs/task-cycles/edytor-programu/reports/`: `report-slice-1.md` … `report-slice-14.md` (`report-slice-11-returned.md` is the first attempt of slice 11), plus the screenshots `slice-6-*.png`, `slice-8-*.png`, `slice-12-*.png`, `slice-13-*.png` in the same directory. Handoffs (`handoff-slice-N.md`, `extra-slice-N.md`) show what each executor was told.
- Mechanical-check mismatches the orchestrator passed on (files outside a slice's *Change* list): slice 3 and 4: `tests/sim/data.test.mjs`, `tests/view/icons.test.mjs` (slice 3 only); slice 5: `tests/sim/data.test.mjs`; slice 8: `src/browser/view/controls/button.ts`, `react-button.tsx` (comments only); slice 12: `src/browser/view/rule-panel.tsx` (Enter fix); slice 13: `src/browser/view/rule-panel.tsx`, `tests/view/program-panel.test.mjs`, `tests/view/rule-editor.test.mjs`; slice 11: `react-number-field.tsx` and `tests/view/react-controls.test.mjs` were added to its *Change* by the orchestrator (Q9). Judge each.
- The base gate (`npm test` on 6fec0ea) already failed on `tests/quality` for two tests (`test_ruff_source_rules`, `test_shellcheck_source_rules`: ruff and shellcheck are not installed on this computer). That is the base's state.
- The change touches a trust boundary: **yes** — `assets/icons/**` (11 SVG files from game-icons.net, slices 3–4; both slices reviewed PASS). Check crafted input there again as part of the whole. No operation that cannot be undone.
- Autonomous choices of the orchestrator that bind (Q1–Q10 in `cycle.md`), among them: D-196 corrected; D-282 changed instead of a second entry; cells carry the data's full labels; `narrows D-119` kept in D-289; a held value no reason fits is shown chosen and greyed with no reason text (Q7); Q8 focus after a cross-group move; Q9 the opt-in trip rule on the shared number field; Q10 item change drops a pending invalid count.

## Minor and out-of-scope findings of the slice reviews and points the orchestrator collected (grade each as a finding of this review)
Review findings listed so far (Minor, in scope, from slice reviews — to go to the request):
- slice 3 review: `src/browser/sim/data/actions.ts` — `icon` and `iconTitle` optional, no test asserts each of the nine actions carries one (acceptable until slice 4 makes them required).
- slice 3 review: `src/browser/view/footer.ts` — footer line for a shared icon joins the action labels (e.g. "Idź, Idź — ognisko"); no foundation rule settles the format; tested literally.

- slice 4 review Minor: `assets/icons/boot-kick.svg` and `assets/icons/dodge.svg` end with a newline, the other 14 icon files do not (no effect on drawing or invariants).
- slice 4 review Minor (outside slice's change list): `src/browser/view/footer.ts:32-34` — dead checks `icon === undefined` / `iconTitle === undefined` now both fields are required.

- Points for the whole-change review (slice 6): greyed cell's dashed frame in `text-disabled` (styleguide gives no colour); icon height `1lh`; greyed cell still takes the `highlight` background under the pointer.
- Points for the whole-change review (slice 7): `react-number-field.tsx` imports `readNumberField` from `program-editor.ts` (a shared control depends on a screen module); the number-field error structure exists in two React files.
- Points for the whole-change review (slice 8): the Tab order to each destructive button was not walked; the program-level „Usuń” on Programy was disabled in every state the executor reached (why not investigated); rest colour of Zakończ and Zatrzymaj judged from screenshots only; `button.ts`/`react-button.tsx` comment-only edits outside *Change*.
- Points for the whole-change review (slice 9): "+ dodaj grupę" is in a footer below the groups while To do 8 and D-304 say beside "+ reguła" — judge whether this meets the task and the foundation entry; a rule row is an `li` with `tabIndex=0` (assistive-technology semantics unsettled); real drag/focus-ring/`pointer-events` behaviour shows only in a real browser.
- Points for the whole-change review (slice 10): leaving the number field commits but does not open the next field (task: "każdy wybór… przechodzi do następnego pola… liczbę zatwierdza Enter albo wyjście z pola"); `tabIndex` of pick cells written by a layout effect (a prop on the pick cell would be cleaner); panel words („Warunek”, „Liczba”, „Cel warunku”, „Czynność”, „Cel czynności”, „Nazwa grupy”, „Reguła 2.1”, „Zamknij panel”) and the `text-secondary` role of the copy's sentence are the executor's choices; the look of the panel is unseen until slice 12.
- Points for the whole-change review (slice 11): the opt-in trip rule added to the shared `ReactNumberField` (default path unchanged; `handleFocus` now keeps a non-null draft); the count's `max` is `Number.MAX_SAFE_INTEGER`; Enter on the folded line and focus after edits are unverified in a browser.
- Points for the whole-change review (slice 12): `rule-panel.tsx` was changed outside the slice's *Change* to consume Enter in the number field's wrapper (a real-browser defect found by the acceptance walk); `game-view.ts` also disposes both panels; the rule panel stands under the rows on the run screen until slice 13; the program's name on Programy is an `h2` in `text-strong` (looks unspecified by the task); „nie ma go na tej mapie” was not shown in a browser (no map lacks a resource; covered by a test); caret position at 16× rests on element, text and focus; hover/focus-ring colours and widths other than 1400 px not checked.
- Points for the whole-change review (slice 13): `rule-panel.tsx` selects the number when its field takes focus (a defect of the six-action walk, fixed outside *Change*); `createProgramPanel` still has a path that draws the rule panel beside the rows when no host is placed (only tests use it); the Programy third area and its breakpoints (1100 px, 720 px) are in the CSS but not in the styleguide or a decision — D-282 says each column is an area of its own; widths below 1000 px not seen in a browser.
- Points for the whole-change review (slice 14): the row `src/browser/view/program-editor.ts` in `guidelines/coding-browser-module.md` stays `do not copy` although its DOM part is gone and React files import its pure functions; `copy` statuses of the new files follow the plan, not an audit against D-265.
- Open for the human (from slice 5): a held value that no reason of D-289 fits shows chosen and greyed with no reason text; the task and D-289 name no reason for it (Q7).

Process remarks on the-way (stage reports' *Searches not found or unclear*, word for word):
- planner (`reports/report-planner.md`): see that report's section.
- foundation (`reports/report-foundation.md`): see that report's section.
- slice 1: Glossary has no entries for "pick cell", "rule panel" or "drop line" (plan row E39 was only a candidate)...; Plan names no ids for rows E1/E3/E10/E11 beyond handoff text.
- slice 2: The plan names `discover` "or the other functions it needs" — fine. The save route's code (`src/server/`) was not read.
- slice 5: the meaning of "where counts stand" (row E4) reached the executor only through D-93's text; E37 (D-196 Verification) noted false before the foundation step's correction; rows E1, E21, E24, E26 only grepped by id.
- slice 4: no foundation entry says how a footer line names several actions sharing one icon file; the five pages not reopened; the screenshot route of `ui_check.md` is `loop2-play`, which the handoff did not name.
- slice 3: format of a footer line for shared icons not settled; no direct test of the icon field of each action; titles not re-read from pages.

## What the orchestrator wants you to look at first (not a verdict)
- Whether the commits meet every item of *To do* (1–17), every acceptance criterion, every row 1–19 of *Settlements to record* and every projected entry the task carries; whether the foundation entries D-288..D-307 and the changed ones say what the task's rows and the approved definition say (source fidelity: nothing altered or invented).
- The orchestrator's own doubts: „+ dodaj grupę” in a footer (task: beside „+ reguła”); leaving the number field commits but does not open the next field; `createProgramPanel` still draws a rule panel beside the rows when no host is placed; styleguide/part map do not mention the Programy third area and the breakpoints; `program-editor.ts` row `do not copy`; the shared `ReactNumberField` imports a screen module and has the new trip rule; „nie ma go na tej mapie” never shown in a browser.

## Report
Per your method: first line, graded findings with place and reason, the checks you ran with command and exit code, what you checked at the trust boundary, per-slice judgement of the slices without a review of their own (executor's own-work check included), **Searches not found or unclear:** or `none`. Return only: the first line, a one-line check result, and the report path.
