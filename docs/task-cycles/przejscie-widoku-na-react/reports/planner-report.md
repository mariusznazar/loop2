# Planner report — przejscie-widoku-na-react

**Status:** done with concerns

- Plan: `docs/task-cycles/przejscie-widoku-na-react/plan.md`
- Size report: `docs/task-cycles/przejscie-widoku-na-react/plan-size.md`
- Size script, one line: 13 slices; 12 fit, Slice 3 is too large (about 213 065 estimated tokens against 150 000), none unchecked.

## The plan in brief

Nine foundation entries, all decisions changed (D-269, D-265, D-407, D-03, D-323; *Verification* of D-44, D-275, D-276; the rationale of D-381), written by the foundation step before any slice. Thirteen slices, made in order:

1. The kitchen-sink page bundled by its build step (trust boundary `scripts/kitchen-sink.mjs`), the page still in its DOM forms.
2. The kitchen-sink page rewritten in React (`kitchen-sink.tsx`).
3. The account screen's four structural assertions and six `fire` clicks rewritten so that they pass both on the base and after the roots (test only).
4. To do 7: the two assertions of the uncaught-failure test removed (test only).
5. To do 6: the warning sentence's constant, read by `ReactFormWarning` and by the hand-built panel of a card taken down.
6. The saver's sentence as a value, drawn by the row of saving in `header-rows.tsx`.
7. The page's state as one value, with nothing the player sees changed.
8. The waiting screen in a React root, and To do 4 (its state stopped draws nothing).
9. The sentences above the game in a React root; `createConfirmationNotice` and `createPageNotice` go.
10. The row of the failure (Decision 1), drawn at the start and shown at the error, with the table case against any root.
11. `tests/view/shared-controls.test.mjs` receiving the React-form cases; the comments of `react-*.tsx` made true without the DOM forms.
12. The five DOM forms and `react-controls.test.mjs` deleted; `SelectOption` moved into `react-select-list.tsx`.
13. The guidelines follow the change.

## Concerns

### Slice 3 is too large, and no division brings it under the limit

The size script counts a file named in *Change* whole. `tests/view/account-screen.test.mjs` has 344 238 characters, about 137 700 estimated tokens on its own. Every slice that changes it also reads `guidelines/coding.md` and `guidelines/testing.md` whole (the product's `AGENTS.md` and `product-guidelines/reading.md`), and `guidelines/styleguide-browser-view.md` whole, because the product's `AGENTS.md` asks for it before any change to a file of `browser-view`, and `tests/view/**` belongs to that part. With the file and the testing guidelines alone the slice already reads about 171 000 tokens; with the styleguide, 213 065. A split does not help: a slice that moves cases out of the file to make it smaller also names the file in *Change* and counts it whole.

I kept every change to that file in one slice, so the excess happens once instead of in each start-page slice. The work in it is small: four assertions, six clicks and one comment. The slice's *Goal* names the lines and helpers it touches, so the executor need not read the file whole.

Two ways for the orchestrator:

- a) Accept Slice 3 as it is. The script's estimate assumes the executor reads the whole file, which the work does not need. My recommendation.
- b) Split `account-screen.test.mjs` in a task of its own before this cycle goes on. That costs a separate task and a pass over the whole file. It would be the only way to get under the limit.

### The guideline slice reads the maintenance skills, which do not describe a cycle step

The handoff asks for the guideline changes in a slice whose executor reads the maintenance skills' files by their path, so Slice 13 does that. `.the-way/product-guidelines/coding/SKILL.md` and `.the-way/product-guidelines/styleguide/SKILL.md` lead a refinement with a human. They have no step for the cycle's author. What they give that author is in their tables: the cycle's author writes the guideline files after `product-guidelines/template.md` and the template of the discipline, each rule citing its decision, and never writes a meaning the task did not settle. Slice 13's *Read* holds the two skill files and the three templates. Its *Goal* says that every meaning comes from the task (questions 1 to 4) and Foundation entries rows 1 to 8, and that any other meaning goes to the orchestrator as a question.

### Reading the plan cannot count

- Slice 13 describes code that later slices write: `waiting-screen.tsx`, `header-rows.tsx`, `page-sentences.tsx` and `kitchen-sink.tsx`. Its *Goal* names them, but they cannot go in *Read* because they do not exist yet; the script would leave the slice unchecked. My estimate is 15 000 to 45 000 more characters.
- Slice 10 reads `waiting-screen.tsx` and `page-sentences.tsx` from Slices 8 and 9 to choose the values that make each root fail. That is a few thousand characters, uncounted for the same reason.
- Slice 13's *Read* names `src/browser/view/app.ts` at its size on the base. By then it is the rewritten file.

### `styles.css` changes in no slice

From the rules as they stand:

- `header .save-line, header .failure-line` apply to the new hosts.
- `.form-warning` has `margin: 0`.
- The notices keep their own margins inside a block host.
- `.app-main` is a block.
- `.session-check` applies to the element the waiting screen's root draws.

So I expect today's boxes to stay. If the browser check of Slice 6, 8 or 9 shows otherwise, its executor stops and reports. A slice for the stylesheet would then be added, and it reads the file's 95 295 characters on its own. This choice is in the plan's *Choices*.

## Answers carried from step 4 of the cycle

- Trust boundary: Slice 1 changes `scripts/kitchen-sink.mjs`, and its *Risk* says so. The build step stands alone in that slice, so its review reads only the build lines and the unchanged lines that serve files.
- Irreversible operation: none.
- Open design choice: none found. Reading the code turned up no entry beyond the spec's *Foundation entries*, and nothing the code makes costly to turn back. The plan settles the matters the spec leaves to the maker, each listed in *Choices*: the module names, one module for both warning rows, and the page's state staying in `app.ts`.
- Reserved choice: none. esbuild, React and jsdom are already settled (D-263, D-03, D-264).

## Tests, slice by slice

| Test file | Slice | What changes | Ground |
|---|---|---|---|
| `tests/view/account-screen.test.mjs` | 3 | assertions at about lines 3386, 3391–3395, 1325–1327 and 3340–3350 rewritten over what is shown; six `fire` clicks become `press`; the comment at line 5841 | To do 2, settlement 3, Decision 1 (the spec's Decision 7); D-264 for `press` |
| `tests/view/uncaught-failure.test.mjs` | 4 | "the clock no longer ticks" and its precondition removed; the `console.warn` count removed | To do 7, M-4, "Behaviour, not implementation" |
| same | 5 | the panel's sentence: class `form-warning` and role `alert` added | To do 6, loop2#62-7 |
| same | 8 | `assertWaitingWithSentence` gains "no „Sprawdzanie logowania…”" and "the waiting root draws no text" | To do 4, loop2#62-5, D-323 as changed |
| same | 10 | a new case, a table of roots whose drawing fails | the question carried to the cycle, Decision 1 |
| `tests/view/game-saver.test.mjs` | 6 | `sentenceOf` reads the saver's sentence value | To do 2: the saver builds no element |
| `tests/view/shared-controls.test.mjs` | 11 | new: the React-form cases moved from the comparison test | Goal 5, the spec's Decision 7 |
| `tests/view/react-controls.test.mjs` | 12 | deleted | settlement 2 changes D-265 |

Every slice says which tests stay green after it. Slice 3's rewrites are meant to pass both on the base and after the roots, so no slice leaves a test red for a later slice to repair. The risk is in *Choices*: if Slice 6, 8, 9 or 10 finds a rewritten assertion too narrow, its executor returns rather than change the file.

## The order of slices and the styleguide's example

The styleguide's example "Plan of a user-interface change" orders the work as: environment and library, then values in their source, then one screen, then its states, with the shared controls and the kitchen-sink page last. The plan follows the part of that order that applies:

- The environment comes first: the page's build step (Slice 1).
- The shared controls in their states and the kitchen-sink page come next (Slice 2), before the screens. The page has to stop using the DOM forms before they are deleted, and its bundle has to exist before it can draw React.
- No value of `tokens.css` changes, so the step "values in their source" is empty.
- The screens of the start page follow, one root at a time (Slices 6, 8, 9 and 10).

The executors of the slices that change a user interface (2, 6, 8, 9, 10) get the styleguide whole, the example included. Slice 2's *Goal* names the example explicitly.

## Guidelines found missing or uncertain

- `guidelines/coding.md` has no rule of size. The coding template of the-way (`product-guidelines/coding/template.md`) has a heading for one, and the maintenance skill looks for it at a refresh. Under the plan skill, a missing rule asks nothing of the plan, and no slice is preceded by a move. Whether the product meant to decline the rule or it is simply missing is not recorded anywhere I read.
- The product's `AGENTS.md` asks for the styleguide before any change to a file of `browser-view`, test files included. `product-guidelines/reading.md` selects the styleguide where the work changes a user interface. The two disagree for slices that change only tests (3 and 4). I followed `AGENTS.md`; this is what makes Slice 3 reach 213 000 tokens instead of about 171 000.
- `guidelines/coding-browser-module.md`, *When to read*: "Przed dodaniem lub zmianą modułu widoku w `src/browser/view/`" ("before adding or changing a view module in `src/browser/view/`"). The kitchen-sink page lies in `src/browser/kitchen-sink/`, yet the file's own rule on that page and its *Where in code* name it. I gave the file to Slice 2.
- The maintenance skills give no step to a cycle's author (see the concern above).
- The statuses in the table "Files of this kind" are a known open matter. The task carries it to a separate audit task (question 4), and the plan does not touch them.

## Reaches beyond the dispatch

- Decisions read whole that the dispatch did not name: D-210, read with D-208 and D-209 because it shares their lines, because Slice 6's saver has its sentence; D-267, for the rule on Effects behind Decision 6; D-274, for the main button on the kitchen-sink page.
- Decisions named by range in a slice's *Read* that I checked only by their heading:
  - D-207, for the saver's moments of saving (Slice 6);
  - D-36, the exemplar of browser modules, for each new `.tsx` module;
  - D-43, the token values, for `kitchen-sink.css`;
  - D-288 and D-289, the pick cell, for the kitchen-sink page and the new test.
- The invariant `browser-view-token-values` (`foundations/invariants.md:458-466`), because Slice 2 changes `kitchen-sink.css`.
- Files of the-way:
  - `task-cycle/slice_size.py`, to measure the slices;
  - `product-guidelines/reading.md`, the rule for selecting guidelines;
  - `product-guidelines/coding/SKILL.md`, `orchestrated_mode.md` and `styleguide/SKILL.md`, for the guideline slice;
  - `elements/common/foundation_check.py`, partly, to learn whether it checks the guidelines' file tables (it does not, so the guidelines can come last without turning a check red).
- Product files that bear on the cut of the slices:
  - `eslint.config.mjs`;
  - `scripts/build.mjs` and `scripts/kitchen-sink.mjs`;
  - `tests/invariants/test_application_build_kitchen_sink.py`;
  - the lines of `tests/invariants/test_browser_view_focus_outline.py`, `test_application_build_output.py` and `test_cross_part_imports.py` that mention the page;
  - `styles.css` at lines 40–64, 176–215 and 632–665;
  - `game-saver.ts`, `email-confirmation.ts`, `app.ts`, and `game-view.ts:36-170`;
  - excerpts of `uncaught-failure.test.mjs` (lines 1–200, 355–430, 655–1020), `account-screen.test.mjs` (lines 1300–1335, 3325–3404, 5836–5846) and `previous-save.test.mjs` (lines 680–704);
  - `README.md` (lines 25–39);
  - `package.json` (lines 1–40).

## Working copies

One directory, `.runs/planner/` in the task's worktree. It held a short script that computes the line ranges of decisions (`ranges.py`) and the first output of the size script (`size1.md`). I removed it before returning, and nothing of it is needed beside this report.

## Unread material

- `guidelines/testing.md` was read whole, in two parts, lines 1–336 and 337–487.
- Of the code the dispatch names "as far as the plan needs", I read in part:
  - `kitchen-sink.ts`, lines 1–90;
  - `account-card.tsx`, the matches of a search and lines 680–700;
  - `state-store.ts`, the matches of a search;
  - `react-controls.test.mjs`, `previous-save.test.mjs` and `game-saver.test.mjs`, the matches of a search and the passages listed above.
- I did not read: `menu-bar.tsx`, the other `react-*.tsx` beside `react-text-field.tsx`, `program-panel.tsx`, `trip-plan.tsx`, `owner-panel.test.mjs`, `state-store.test.mjs`. Their sizes and imports were enough to cut the slices.
- The spec's two reviews and `spec-reviewed.md`: not read. The spec left no question that needed them.

## Searches not found or unclear

- A check that the guidelines' file tables or *Where in code* name existing files: none found in `tests/`, `scripts/`, or the check scripts of the-way. So the deletion slice does not turn a check red before the guideline slice.
- A rule of size in `guidelines/coding.md`: none found (see "Guidelines found missing or uncertain").
- A test that imports `createConfirmationNotice`, `createPageNotice` or `PageSentence`: none. Only a comment at about line 5841 of `account-screen.test.mjs` names `createConfirmationNotice`, and Slice 3 rewrites that comment.
- Code outside the controls and the comparison test that names a DOM form of a control: only `app.ts`, `game-saver.ts` and `kitchen-sink.ts`, plus comments in `react-button.tsx` (line 38), `react-number-field.tsx` (line 69) and the headers of the `react-*.tsx` files. Slices 2, 6, 8, 10 and 11 cover them.
- Whether the local start can produce each state for the browser checks (a refused session check, a failed save, a page sentence above the first screen, an account with the previous-save privilege): unclear without running it. Each slice's *Goal* tells its executor to name a check it could not make.

## Questions still open

None that block the plan. One choice belongs to the orchestrator: whether to accept Slice 3 at its size (way a, which I recommend) or to split the test file in a task of its own first (way b).
</content>
</invoke>
