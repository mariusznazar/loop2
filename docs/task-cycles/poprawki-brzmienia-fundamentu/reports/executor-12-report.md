# Executor report - slice 12 (The shared controls of D-44, and D-03)

**Status:** done with concerns (one wording to look at, see "Concerns")

**Commit:** `578d13d2` on `task/poprawki-brzmienia-fundamentu` (slice base `307cc1d4`)

**Check result:** the foundation check ends with `0 errors` (6 `listed:` lines, no error); the eleven view test files pass; `prettier --check` passes on them. The full gate (`npm test` without a file) was not run, as the handoff says.

## Files changed

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 3 | 3 |
| `tests/view/account-screen.test.mjs` | 1 | 1 |
| `tests/view/discovery-band.test.mjs` | 1 | 1 |
| `tests/view/end-question.test.mjs` | 1 | 1 |
| `tests/view/end-window.test.mjs` | 1 | 1 |
| `tests/view/headquarters-screen.test.mjs` | 2 | 2 |
| `tests/view/maps-screen.test.mjs` | 1 | 1 |
| `tests/view/program-list.test.mjs` | 2 | 2 |
| `tests/view/program-panel.test.mjs` | 1 | 1 |
| `tests/view/rule-editor.test.mjs` | 1 | 1 |
| `tests/view/run-header.test.mjs` | 1 | 1 |
| `tests/view/trip-plan.test.mjs` | 1 | 1 |

Total: 12 files, 16 insertions, 16 deletions (`git diff --stat HEAD~1 HEAD`).

## Items of the slice

1. **D-03, *Relations* "narrowed by D-265": made.** The line now reads `derives from D-04 · narrowed by D-265` (`foundations/decisions.md`, D-03 block). The wording is the task's (*Decisions in play*, D-03). See Concerns.
2. **D-03, binding sentence with the exception: made.** The first sentence now reads "...its screens written as `.tsx` components that draw from the game state, except a screen D-265 leaves in the browser's DOM APIs until a task moves it, and no other UI framework stands in its code or its runtime dependencies." The task's wording, unchanged otherwise.
3. **D-44, first sentence (seven kinds of the shared button): made.** "...from the eight shared controls of `src/browser/view/controls/` — the button, the destructive button, ..." became "...from the shared controls of `src/browser/view/controls/` — the button in its kinds (the plain button, the destructive button, the button selected in its group, the secondary action (D-275), the tab (D-276), the main look outside a form (D-274) and the button in `positive`), the select list, the number field, the text field and the pick cell —". The rest of the sentence, and the rest of D-44, stand as they were. Check against the code: `src/browser/view/controls/react-button.tsx` has `ReactButtonKind = "destructive" | "secondary" | "tab" | "main" | "positive"` plus the plain button and the button `selected` in its group, which makes seven kinds.
4. **D-44 quotations in the eleven test files (rule 4): made.** The quotations that began with the broken span were changed to the same span of the new sentence, by a text replacement limited to those eleven files (13 lines). Each file had 1 to 2 such lines. Quotations of other spans of D-44 (for example "A control awaiting a server response is disabled...", "A form's server refusal...") were not touched, as the rule says. `menu-bar.test.mjs`, `previous-save.test.mjs` and `shared-controls.test.mjs` quote only those other spans and stayed unchanged. The foundation check, which compares each `decision:` quotation with the binding sentences, reports no error after the change.
5. **Items not in the slice:** none touched. No invariant line, no plan, no record, no other slice's file.

## Checks (command, exit code)

- Before the test edits, the foundation check with the skip switch: `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` gave 13 errors, all the "quotation stands in no binding sentence of `D-44`" kind at the 13 lines listed above. This is the expected break, fixed in the next step. Exit 1.
- After the test edits, the full foundation check: `python -B .the-way/elements/common/foundation_check.py` gives `0 errors`, exit 0. It also reports six `listed:` lines, none an error:
  - `foundations/invariants.md:5` `account-server-runtime`
  - `foundations/invariants.md:354` `terrain-drawing-numbers`
  - `foundations/invariants.md:668` `player-opaque-session-cookie`
  - `foundations/invariants.md:978` `trip-plan-progress`
  - `foundations/invariants.md:1158` `loop-run-knowledge`
  - `foundations/invariants.md:1288` `sprite-credits`
  
  Each says its test reads `test`, its sentence is changed by this change, and no file citing it changed. I did not change `foundations/invariants.md`; these are for the orchestrator to judge, since the base comparison may cover earlier slices.
- `npm test -- tests/view/<file>.test.mjs`, exit 0 for each of the eleven files: account-screen (133 pass, 0 fail), discovery-band (10 pass, 0 fail), and the other nine with exit 0. Run the same way, not the full gate.
- `npx prettier --check` on the eleven files, exit 0 ("All matched files use Prettier code style!").

Test runs were made before the commit, from the worktree root. No test was seen failing, so no failing-run record applies. I wrote no test in this slice.

## Own-work check

- **Requirement:** the new D-44 sentence names seven kinds of the shared button, and each quoted span in the tests must match the new sentence word for word. Otherwise the foundation check would say so, or a test would quote text the entry no longer holds.
- **Check:** compared the seven names in D-44 with `ReactButtonKind` and the plain and selected forms in `react-button.tsx` (read whole). Ran the foundation check, which compares every `decision: D-44 "..."` line with the binding sentences.
- **Showed:** the seven kinds match the code; the check passes with 0 errors after the test quotations were changed.

## Concerns

- **"narrowed by D-265" is not in the closed list of relation types.** The template's *Relations* list is `derives from` and `narrows`. The task settles the wording "narrowed by D-265" for D-03, and rule 2 says to write it as the task gives it, so I did. The check did not object. The inverse side of the pair is missing: D-265 (not in this slice's change list, and the task keeps it unchanged) reads `derives from D-44 · derives from D-03` and does not say `narrows D-03`. The orchestrator should decide whether D-265 needs `narrows D-03` in a later slice, or whether "narrowed by" stands as written.
- The task text in *Decisions in play* cites `button.ts:2-4` as the source of the seven kinds. That path is stale: the code is `src/browser/view/controls/react-button.tsx`. It has no bearing on the entry text, and I did not change the task.

## Unread material

- `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md`: not opened. The handoff copies its rules and slice 12.
- `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md`: read at lines 20-31 (the goal, the To do intro and item 1 and the start of item 2), 128-200 (*Decisions in play*, *Settlements to record*, *Out of scope*). Not read in full; the lines outside those ranges hold other items not in this slice.
- `foundations/decisions.md`: read by range only, as the handoff says: D-03 (44-58), D-265 (4171-4218), D-44 (4792-4806), D-274 to D-276 (5032-5156). Not opened whole, as rule 7 says.
- `foundations/invariants.md`: not opened.
- Guidelines: `guidelines/coding.md` whole; `guidelines/testing.md` whole (read in three pages); `guidelines/styleguide-browser-view.md` whole (read in two pages). Nothing in them conflicts with the change: it changes entry wording and quotations in comments only, and no test expectation.
- The eleven test files: not read whole (rule 7). Only the lines of the `decision:` quotations were found by `git grep`, and those lines were edited in place.
- `.the-way/elements/decisions/template.md`, `examples.md`, `skill/SKILL.md`, `skill/read.md`, `skill/decide_entry.md`, `.the-way/elements/common/rules.md`, `way_of_working.md`, `.the-way/task-cycle/change/SKILL.md`, `slice.md`: read whole.
- `src/browser/view/controls/react-button.tsx`: read whole.

## Searches not found or unclear

- Searched for a closed-list relation type "narrowed by" in the decision template: not in the list (see Concerns).
- `git grep -n 'decision: D-44 "'` lists the quotations of D-44 across many test files. Eleven files hold the lines that break; `menu-bar`, `previous-save` and `shared-controls` hold only quotations of other spans, which stay.
- No other `decision: D-03 "` quotation breaks: the one in `tests/invariants/test_browser_view_framework.py:209` quotes "The browser view is built in TypeScript", which still stands.

## Reach beyond the handoff

- Read the guideline files named in the handoff, whole (see Unread material for what was in pages).
- Read `.the-way/task-cycle/change/slice.md`, `.the-way/elements/decisions/template.md` and `examples.md` and the decisions skill files. They are in the method's reading list, not the handoff's, which names them.
- Read `task.md` at ranges beyond the handoff's line ranges for the "Settlements to record" and "Decisions in play" sections, to check the wording.

## Working copies

- I made no working copy in `.runs/executor-12/`; the directory was not created.
- I wrote check logs (`.runs/executor-12-*.log`) during the test runs. I deleted them. The `find -delete` removal succeeded, so nothing stays.
- Nothing is left in the system temp directory or in the main checkout.
