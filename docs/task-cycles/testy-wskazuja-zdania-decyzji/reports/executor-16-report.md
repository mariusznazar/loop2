# Report — executor of slice 16 (browser framework, bundling and screen-structure decisions)

**Status:** done with concerns (the concerns: the D-408 line at `tests/view/screen-registry.test.mjs:296`, kept but doubtful, and the slice's *Change* not matching where the lines fell — both below)

## Commits

Base `40c6626020f09a2194faab3b4e0bb2d5bcbfcec2`; author address checked `mariusznn@gmail.com` (`git log -3 --format='%h %ae %s'`).

- `35c880bd` test: :white_check_mark: mark the tests that hold the sentences of the decisions on the shared controls in two forms, the output of the browser's compilation, a shared control's rule from its screen, the React roots and where the state lives, a new screen's entry and the catching up of time with lines decision:
- `fdf9ee38` docs: :memo: name the tests of D-265, D-266, D-395, D-407 and D-408, and rewrite the pair of D-265, D-266, D-270, D-395 and D-407 only for the part no invariant and no test holds

## Files changed

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 33 | 23 |
| `tests/view/react-controls.test.mjs` | 40 | 0 |
| `tests/invariants/test_application_build_output.py` | 5 | 0 |
| `tests/view/run-screen.test.mjs` | 3 | 0 |
| `tests/view/program-panel.test.mjs` | 2 | 0 |
| `tests/view/screen-registry.test.mjs` | 2 | 0 |
| `tests/view/state-store.test.mjs` | 2 | 0 |
| `tests/view/end-question.test.mjs` | 1 | 0 |
| `tests/view/end-window-game.test.mjs` | 1 | 0 |

`tests/invariants/test_application_build_kitchen_sink.py`, named in the *Change*, is unchanged: no case of it holds a sentence of D-269 (row below).

## Checks run

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`; it lists 11 decisions `held by nothing` (D-181, D-182, D-184, D-185, D-186, D-188, D-215, D-216, D-217, D-218, D-220), none of the slice's eleven. Run on the working tree that the two commits then took whole.
- `git diff -U0 40c6626020f09a2194faab3b4e0bb2d5bcbfcec2 -- foundations/decisions.md`, read: hunks at 6325 (D-265), 6364 and 6367 (D-266), 6516 (D-270), 9993 (D-395), 10212 and 10214 (D-407), 10227 (D-408), each inside the entry's *Verification* field; nothing else of an entry changed.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <file>` — exit 0 for each of `tests/view/react-controls.test.mjs`, `tests/view/screen-registry.test.mjs`, `tests/view/state-store.test.mjs`, `tests/view/run-screen.test.mjs`, `tests/view/program-panel.test.mjs`, `tests/view/end-question.test.mjs`, `tests/view/end-window-game.test.mjs`.
- `npm test -- tests/view/react-controls.test.mjs` — exit 0 (56 tests, 0 failed)
- `npm test -- tests/view/screen-registry.test.mjs` — exit 0 (13, 0 failed)
- `npm test -- tests/view/state-store.test.mjs` — exit 0 (12, 0 failed)
- `npm test -- tests/view/run-screen.test.mjs` — exit 0 (20, 0 failed)
- `npm test -- tests/view/program-panel.test.mjs` — exit 0 (53, 0 failed)
- `npm test -- tests/view/end-question.test.mjs` — exit 0 (17, 0 failed)
- `npm test -- tests/view/end-window-game.test.mjs` — exit 0 (27, 0 failed)
- `npm test -- tests/invariants/test_application_build_output.py` — exit 0 (Ran 7 tests, OK)
- `npm test -- tests/invariants/test_application_build_kitchen_sink.py` — exit 0 (Ran 3 tests, OK; run because the *Checks* name it, though the slice did not change it)
- Not run: the full gate `npm test` without a file — the cycle's run, as the handoff and the method give it. `test_ruff_source_rules` and `test_shellcheck_source_rules` were not run (failing at the base with `FileNotFoundError`, per the handoff, and outside this slice's files).
- No test was written first and no invariant's test changed, so there is no failing run to record.

## Rows of the slice's decisions

Line numbers are those after the slice's commits; each `path:line` is the line of the case's `test(` or `def`.

| Decision | Held by tests in whole | Held by tests in part | Held by invariants | Held by nothing | *Verification* became |
|---|---|---|---|---|---|
| D-263 | none | none | none | the one sentence: esbuild as the bundler (searched: `esbuild`, `bundle` in `tests/`; `tests/invariants/test_application_build_output.py:274` checks that a bundle is made, not by which tool) | unchanged |
| D-265 | none | S1 ("Until its last screen … same classes and attributes"), the part that the React and the DOM form of each control draw one element tree with the same tag, classes, attributes and text, the input's `value` apart, for each kind and state compared — 39 cases of `tests/view/react-controls.test.mjs`: 117 „a plain button is the same element in both forms”, 131 „a button with an accessible name carries it as aria-label”, 145 „a submit button …”, 161 „a button selected in its group …”, 175 „a button not selected in its group …”, 191 „a secondary action …”, 215 „a secondary action locked with its text …”, 237 „a destructive button …”, 254 „a destructive button with an accessible name …”, 279 „a button in positive …”, 298 „a main button outside a form …”, 315 „a main button locked with its text …”, 336 „a button with aria-expanded true …”, 353 „… aria-expanded false …”, 370 „a button given no expanded state carries no aria-expanded in either form”, 387 „a button whose open state is set on the DOM form …”, 402 „a tab selected in its group …”, 422 „a tab not selected …”, 442 „a tab locked with its text, selected or not …”, 469 „a waiting submit button …”, 491 „a button locked with its text …”, 507 „a button of a group locked with its text …”, 524 „a button that stopped waiting …”, 695 (the loop over FIELD_CASES) „${name} is the same element tree in both forms”, 707 „a field that leaves the error state by a new render …”, 772 „the form warning …, shown and hidden”, 794 „the form note …”, 816 „a warning that was shown and then cleared …”, 839 „a pick cell available …”, 853 „a pick cell chosen …”, 867 „a greyed pick cell with its reason …”, 888 „a pick cell with its icon of an action …”, 914 „a greyed pick cell with its icon and its reason …”, 1018 „a select list with positions …”, 1037 „a select list with no positions …”, 1051 „a disabled select list …”, 1099 „a number field is the same element tree in both forms”, 1123 „a number field in the error state …”, 1148 „a disabled number field …” | none (D-265 names none) | S1: the two forms standing in `src/browser/view/controls/` as a React component and a DOM function (not a wrapper), the DOM screens staying on the DOM form, a new section of a DOM screen; S2 whole (a new screen never after the pattern of a DOM module); S3 whole: that the test covers each kind and state the React screens use, and `src/browser/styles.css` as the one place of the look | pair rewritten |
| D-266 | S2 („A build that writes them first removes both directories”) — `tests/invariants/test_application_build_output.py:300` `test_a_build_leaves_nothing_of_an_earlier_build` | S1, the part that the per-module output of every browser source file stands at its path below `dist/browser/` — same file :191 `test_build_emits_every_source_file_of_both_configurations`, :207 `test_build_compiles_made_up_source_under_each_configuration`, :227 `test_build_compiles_made_up_tsx_source_into_javascript`; S1, the part that `dist/public/` holds no JavaScript but the one bundle the page loads — :276 `test_the_page_loads_one_file_that_joins_the_browsers_code` | none (D-266 names none; application-build-output and application-build-layout derive from D-06) | S1: tests importing from `dist/browser/`, the bundle made from `dist/browser/` and not from the sources, `dist/public/` holding no file other than the bundle, the page and the static files beyond JavaScript | pair rewritten (it stood with no `tests:` clause) |
| D-267 | none | none | none | both sentences (no tool guards the rules of hooks and effects, the rules themselves, the reopening of D-29) | unchanged |
| D-269 | none | none | none | both sentences | unchanged |
| D-270 | none | none | S1 whole by browser-view-framework (its tests read a library on React by its peer dependency on `react` in the lock, by runtime dependency and by import of the browser source; R1: no line) | S2 (a task naming the library in this decision and letting it through the check in the same change) | pair rewritten |
| D-395 | none | the second clause of the sentence, that the number field commits by the rule the screen gives it and not by a range rule of its own — `tests/view/react-controls.test.mjs:1279` „a number field under the trip count rule commits nothing on text that is no whole count from 1, keeps its draft and reports it” | none | the first clause (a shared control imports no module of a screen), and a control picking a screen's rule by a value of a parameter | `tests:` added, pair rewritten |
| D-396 | none | none | none | all three sentences (searched `1280`, `720`, `Firefox`, `Safari` in `tests/`) | unchanged |
| D-407 | none | S2, the part that the state of the screen Przejście (the question and the end-of-run window) lives outside the screen's component — `tests/view/run-screen.test.mjs:283` „the question stands in the program panel … only while the screen is told to show it”, :829 „told the window stands, the screen of an ended map run draws it …”, :876 „„✕” asks the game view to close the window …”; and outside the game state and its saved document — `tests/view/end-question.test.mjs:615` „the question lives in the page alone: …”, `tests/view/end-window-game.test.mjs:994` „the window stands in no game state and no saved document: …”; S2, the part that memory several screens share is one memory of the page given to the screens' factories and read so that a change redraws the other screen — `tests/view/program-panel.test.mjs:464` „a group folded on one screen stays folded on the other for the same program, …”, :515 „a fold made on one panel redraws the other at once, with no update of its own” | none | S1 whole (a root of its own per screen and for the menu bar, none over the whole view); S2: the game state in a store outside React (no React context), the state of Przejście in a module of its own, the read through `useSyncExternalStore` itself, the state of one screen in its component | `tests:` added, pair rewritten (violates: one example narrowed to a new memory, one added) |
| D-408 | none | S1, the part „one entry in the registry of screens” (a kind of screen with no entry, or with two, refused when the registry is made) — `tests/view/screen-registry.test.mjs:131` „a kind that two entries hold throws at creation, …”; S2, the part that the registry, made from a table it knows nothing of, works through the entries — existing lines kept at :131, :172, :193, :226, :241, :261, :311, :331, :390, :421 (the line at :296 reported below), line added at :347 „start draws the instances with no events, then shows the first screen with its address replaced” | none | S1: the module of its own, the address and the menu bar; S2: other shared functions of the game view naming the screen | `tests:` clause widened by „or gives a kind two entries”; pair unchanged |
| D-409 | none | S1, the part that the store reads the clock and passes the time elapsed before the act's body — `tests/view/state-store.test.mjs:158` „an act's body runs after one reading of the clock that passed the real time elapsed” (existing line), and that the store's act reads the date — :313 „the moment of the store is the date of the clock's latest reading” (line added); S2, the part that the act without catch-up reads no clock — :178 „an act without catch-up reads no clock and passes no time” (existing line) and :313 (line added) | none | S1: no act reading the clock itself; S2: that a new character and a bought branch rank go through the act without catch-up | unchanged |

## Pairs added or rewritten (for the human to accept at the merge)

Each quoted as it now stands in `foundations/decisions.md`.

**D-265 — rewritten** (the part held by tests went: „a new attribute of the button written in both forms in one change”, „a class that only the React form sets”; one example added on each side):
- complies: a DOM screen left on the DOM form by a change that moves another screen; a new section of the waiting screen of the sign-in check built in DOM; a new screen in React that imports a pure function of a DOM module; a new state of a control that a React screen uses, given its case in the test that compares the two forms in the same change
- violates: a React component that wraps the DOM function; a React form, or a state of it that a React screen uses, with no case in the test that compares the two; a new screen that builds its DOM elements with `document.createElement` after the pattern of a DOM module; the look of a control written outside `src/browser/styles.css`, as a `style` attribute both forms set

**D-266 — rewritten** (the part held by tests went: „a compiled module written into `dist/public/`”, „the page loading the one bundle from `dist/public/`”):
- complies: a test importing one module from `dist/browser/`; the bundler taking its entry from `dist/browser/`
- violates: a test importing the bundle; a bundler reading the sources; a file other than the bundle, the page and the static files, such as a copy of a TypeScript source, written into `dist/public/`

**D-270 — rewritten** to speak only of the second sentence, the first being held by the invariant browser-view-framework:
- complies: a library for dragging taken in by a change that names it in this decision and lets it through the check of browser-view-framework
- violates: a library on React let through the check of browser-view-framework by a change that leaves this decision without its name

**D-395 — rewritten** (the complies example the test now holds went):
- complies: a new shared control that takes the rule of a screen as a function the screen gives it and imports no module of a screen
- violates: a shared control that imports `program-editor.ts` or `trip-editor.ts`; a shared control that picks the rule of a screen by a value of one of its parameters, such as the trip count rule for a field whose least number is 1

**D-407 — rewritten** (complies unchanged; violates: „a memory two screens share held in the component of one of them” became „a new memory …”, since the folding memory is now held by tests, and one example added):
- complies: a new screen built as a root of its own, whose factory receives the game state from the store and the memory of its unfolded trees, shared with another screen, as a memory of the page read through `useSyncExternalStore`; a setting only that screen reads kept in its component
- violates: one root mounted over the screens of the game; a context of React that carries the game state; a new memory two screens share held in the component of one of them; the state of the screen Przejście moved from `run-screen-state.ts` into the game view's controller, `game-view.ts`

D-408: pair unchanged; only its `tests:` clause gained „or gives a kind two entries”.

New `tests:` clauses (not pairs, listed for completeness): D-265, D-266, D-395 and D-407 got one; D-408's was widened. Their words stand in the log's *Verification* fields of those entries.

## Existing lines judged

- D-408, eleven lines standing at the base in `tests/view/screen-registry.test.mjs`, each quoting „No function the game view shares between its screens names the new screen”: kept at the cases of lines 131, 172, 193, 226, 241, 261, 311, 331, 390 and 421 — each runs the registry on entries written in the test and fails where the registry builds, shows, draws, focuses or takes down a screen otherwise than through its entry, which is the part of that sentence the `tests:` clause names.
- **Reported, kept:** the line at the case of line 296, „the address gets the fragment with a new entry, in place of the current one or not at all”. The case asserts only which address calls (`go`, `replace`, none) the registry makes for the mode the caller asks; the fragment comes from the module of addresses, not from the entries. A registry that named a screen in a branch of its own would pass this case unless the branch changed the address written, so in my judgment it does not hold the sentence; it holds D-281's address rules. The plan's item 3 says to report such a line, so I left it in place for the cycle to decide. If it is wrong, the cost is one stray line that tells a reviewer the address modes guard D-408.
- D-409, two lines at the base in `tests/view/state-store.test.mjs` (cases at 158 and 178): both kept; each holds the part of its sentence the existing `tests:` clause names.
- D-44's line at `tests/view/react-controls.test.mjs:470` (another slice's) left as it stands; the D-265 line stands after it in the same case.

## Choices made, with the way rejected

- **D-265 S3 („A test draws both forms for each kind and state … and `src/browser/styles.css` stays the one place of the look of both”) judged held by no test.** The sentence is about the test itself: weakening the comparison or leaving a state without a case fails no test, so by the plan's measure (a test holds what it would fail on if the code broke the sentence) nothing holds it. Rejected: a second line quoting S3 at each of the 39 comparing cases — 39 more lines pointing at the sentence the cases *are*, not one they guard. Cost if wrong: the pair carries S3, which a reviewer reads anyway; adding the lines later is mechanical.
- **D-270 S1 judged held by the invariant browser-view-framework (R1), no line added** to `tests/invariants/test_browser_view_framework.py`. The invariant derives from D-270, its statement („no other UI framework in its code or runtime dependencies”) is S1's conclusion, and its tests read D-270's definition (peer dependency on `react` in the lock). Rejected: lines at its four cases on the ground that the invariant's sentence does not spell out the peer-dependency criterion. Cost if wrong: four lines missing; the field would gain a `tests:` clause.
- **D-267: the mention at `tests/view/run-screen.test.mjs:694` („D-336, D-267. Catches a program that follows the rule (a scroll made by an effect on every update)…”) holds no sentence.** The case fails on a scroll on every update, by an Effect or not, and passes a click handled through an Effect that scrolls once; so it holds D-336's behaviour, not the rule that an Effect never handles a user event. The mention stays (out of scope to remove). I also checked whether the rule-set test of ESLint would catch `eslint-plugin-react-hooks` („No tool guards …”): `unmet_rules` in `tests/quality/test_source_tool_scope.py` reports only rules of the published sets missing from the configuration, not rules added, so it would not; D-267 stays held by nothing.
- **D-407: lines added in three files outside the *Change*** (`tests/view/program-panel.test.mjs`, `tests/view/end-question.test.mjs`, `tests/view/end-window-game.test.mjs`), found by searching for the memory of the page and for the state of Przejście. Rejected: holding to the *Change*'s files only, which would leave tests that hold the sentence unmarked, against item 2 of the plan.
- **D-407: `tests/view/run-screen.test.mjs:849` („what the window covers stays in the tree and keeps its state …”) not marked**: it would pass with the picked tab kept in a memory of the page as well as in the component, so it does not hold „the state of one screen lives in the component of that screen”. Likewise the store's tests in `tests/view/state-store.test.mjs` do not hold „The game state lives in a store outside React”: a React context carrying the game state would fail none of them.
- **D-408: a line for its first sentence added at the case of line 131** (a kind with no entry or two entries refused at creation) — it holds „one entry in the registry of screens”; and **a line for S2 added at the case of line 347** („start draws the instances with no events …”), which draws every instance through its entry as the other marked cases do. The case of line 365 („the page is told its place once …”) stays unmarked: it asserts only what the page is told.
- **D-409: two lines added at the case of line 313** („the moment of the store is the date of the clock's latest reading”), which also asserts that `act` reads the date once and `actWithoutCatchUp` none. Rejected: leaving it unmarked because its main subject is the moment (D-247). Cost if wrong: two lines more than needed.
- **D-395: one line, at the case of line 1279** (the trip count rule). The cases of the range rule (1139, 1171, 1206 at the base) are not marked: a field that ignored the rule given and clamped by its own range would pass them.
- **Placement of lines:** inside the case's body as its first line in `tests/view/*` files whose earlier lines stand there (as slice 15 placed them), above the case where the file's lines stand above (`screen-registry.test.mjs`, `state-store.test.mjs`), and after the lines `invariant:` in the Python file. In `tests/view/react-controls.test.mjs:469` the D-265 line follows the D-44 line already first in the body.
- The lines were inserted with a throwaway script, `.runs/executor-16/insert_lines.py`, that checked each target line's text before inserting; its run stopped at a second insertion at one line of `state-store.test.mjs` (the check saw the first insertion), before that file was written; the state-store and Python lines were then added by hand.

## Remarks on the log's wording (R3)

- D-263's *Rationale* says the lockfile was written on Windows while the image is built on Linux, so it carries both packages of esbuild; nothing in this slice checked that, and no test holds it. No mismatch found.
- D-269's *Rationale* says „nothing fails when a module lets React in, so review keeps this decision”; that stands — no test holds it.
- D-408's existing lines quote S2 at cases whose subject is mostly D-280/D-281 behaviour of the registry; the case at line 296 (above) holds no part of D-408 in my judgment.
- No sentence of the slice's decisions found stale against the code. Checked in passing: the bundler's entry is `dist/browser/main.js` and the build removes `dist/public/` and `dist/browser/` first (`scripts/build.mjs`), as D-266 says; the state of Przejście stands in `src/browser/view/run-screen-state.ts` and the folding memory is read through `useSyncExternalStore` (`src/browser/view/program-panel.tsx:351`), as D-407 says.

## Files beyond the slice's *Change*

- `tests/view/program-panel.test.mjs` (part browser-view) — two D-407 lines; `guidelines/styleguide-browser-view.md` read as below; `npm test -- tests/view/program-panel.test.mjs` exit 0.
- `tests/view/end-question.test.mjs` (part browser-view) — one D-407 line; `npm test -- tests/view/end-question.test.mjs` exit 0.
- `tests/view/end-window-game.test.mjs` (part browser-view) — one D-407 line; `npm test -- tests/view/end-window-game.test.mjs` exit 0.

**Mismatch with the plan (small, adapted):** the *Change* names `tests/invariants/test_application_build_kitchen_sink.py`, which got no line (D-269 is held by nothing), and does not name the three files above, which hold D-407.

## Own-work check

- Requirement most likely unmet: „every test that holds one of its binding sentences carries a line `decision:`” — the likeliest miss was one of the many form-comparing cases of `tests/view/react-controls.test.mjs`.
- Check: an `awk` pass over that file that, for each `test(` case, reports a case whose body calls `drawnTree(` (compares the React form with the DOM form) without a D-265 line, and a D-265 line in a case that does not compare.
- Result: no case reported either way (39 comparing cases, 39 lines).
- Second check: `foundation_check.py` reads every quotation against the binding sentences; 0 errors.

## Reaches beyond the dispatch

- `foundations/invariants.md`, entries application-build-output, application-build-layout and application-build-kitchen-sink — to see which decision each derives from (D-06, D-45), for R1 on the Python tests.
- `tests/invariants/test_browser_view_framework.py:1-335` — the tests of browser-view-framework, for D-270 and R1.
- `tests/quality/test_source_tool_scope.py:38-99`, `tests/quality/eslint-rule-sets.mjs:1-40`, `tests/quality/test_quality_invariants.py:1-79` — whether a test catches a hooks plugin (D-267).
- `scripts/build.mjs:1-60` — the bundler's entry and the removal of output directories (D-266's pair and R3).
- `src/browser/view/screen-address.ts:1-40`, and a search of `src/browser/view` for `setWindow`, `createFolding`, `useSyncExternalStore` — where the state of Przejście and the folding memory live (D-407).
- `tests/view/program-panel.test.mjs:455-540`, `tests/view/end-question.test.mjs:605-636`, `tests/view/end-window-game.test.mjs:1-20` and `:985-1060` — candidate cases for D-407.
- `.the-way/task-cycle/change/slice.md` whole — the method names it for this variant.
- `the author's rules on writing scripts, outside the repository` and `git.md` — the session's own rules before a script and a commit.

## Working copies

Directory `.runs/executor-16/` (in the worktree) held the insertion script `insert_lines.py`, the foundation check's output, the log of the focused runs and their outputs, and the added lines of the log. Removed before return (see the last line of this report). No worktree or clone was made; the Python tests make and remove their own copies of the tree.

## Unread material

- `guidelines/styleguide-browser-view.md` — read lines 1-420 (roles, rules up to „The kitchen-sink page”) and the headings of the rest; lines 421-986 (rules of the look of single screens, the scene, the camp, the chronicle, the end-of-run window, examples) not read: they govern the look, and the slice adds only comment lines to browser-view test files.
- `foundations/part_map.md` — read lines 1-30 (browser-view) and 85-124 (build-tools), plus a search for the slice's files; the other parts not read.
- `foundations/glossary.md` — searched by its headings and for `memory of the page`, `registry`, `store`; no entry read whole (none of them names a term of the slice's decisions beyond „catch-up”, whose heading was seen).
- `tests/view/react-controls.test.mjs` — read 1-560 in parts (1-135, 135-205, 360-560), 660-1292; lines 205-360 and 560-660 read only through the case titles and the check that each case compares `drawnTree` with `domTree` (FIELD_CASES data, button variants).
- `tests/view/run-screen.test.mjs` — read 1-352, 680-740, 822-891 and the case list; the rest only by titles.
- `tests/view/state-store.test.mjs` — read 1-195 and 296-325; the rest by search.
- `.the-way/elements/decisions/template.md` — read 105-264, which holds the plan's ranges 111-127, 162-166 and 220-260.
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md:16-73` — read as copied in the handoff, not from the file.

## Searches not found or unclear

- A test naming esbuild as the bundler (D-263): searched `esbuild|bundle` (case-insensitive) in `tests/` — only a comment in `tests/invariants/test_browser_view_framework.py:294` and the bundle checks of application-build-output, which do not name the tool. Not found.
- A test of the browsers or the smallest window (D-396): searched `1280|Firefox|Safari|\b720\b` in `tests/` — no match.
- A test that the kitchen-sink page reaches no `.tsx` (D-269): searched `kitchen` in `tests/` — five files, none checking imports of the page for React.
- A test that a shared control imports no module of a screen (D-395): searched `view/controls|controls/` in the Python tests — no match; no Node test reads imports of `src/browser/view/controls/`.
- A test of React roots per screen or of no React context for the game state (D-407): searched `createRoot(`, `useSyncExternalStore`, `memory of the page` in `tests/view` — only harness roots in tests and the folding memory; not found.
- A test that the act of a new character or of a bought branch rank goes through `actWithoutCatchUp` (D-409): searched `actWithoutCatchUp|catch-up` in `tests/` — only `tests/view/state-store.test.mjs` calls it directly; not found.
- Unclear: whether D-265 S3, a sentence that a test exists, can be „held” by that test (my answer and its cost under Choices).
- Removal: `.runs/executor-16/` removed with `rm -rf`; `test ! -e` confirmed it gone. No remainder.
