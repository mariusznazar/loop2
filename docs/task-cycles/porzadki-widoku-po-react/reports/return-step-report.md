# Report of the return step

**Status:** `done`. Head at the start: `370abc76`. Head now: `854e7881`. Not pushed. The product's full gate was not run (handoff).

**Method followed:** `.the-way/task-cycle/skill/return_step.md` and `foundation_step.md` (whole), `.the-way/task-cycle/change/SKILL.md` (report and checks), `elements/glossary/skill/SKILL.md`, `elements/environment-facts/skill/SKILL.md` with `decide_entry.md` and `template.md`, `elements/decisions/template.md` ("Plan test", "Where it goes", "Changing a decision"), WAY-36 and WAY-95 of the pinned the-way. No foundation entry needed a change, so no element's skill was followed to write one.

## Commits

| Commit | File | Lines +/- | What |
|---|---|---|---|
| `854e7881` | `src/browser/view/run-screen-state.ts` | 1 / 1 | Comment of `openWindow()` (line 79): it said the boolean is returned "so that the entry tells the screen (D-311, D-324)". At the base the entry did `if (screenState.openWindow()) runScreen.setQuestion(false)`; after the change the entry ignores the value (`run-entry.ts:157`) and the screen and its panel read the question from the state. The comment now says the value says whether a question was closed and that the screen and its panel read the change from the state. Comment only; no code moved. |

## The place each settlement went to

| Settlement | Where it stands | Judged by the return step |
|---|---|---|
| Row 1 (`styles.css` shared, a stylesheet of its own for each screen and each part several screens use) | D-421 (decision), with the exception for undivided rules that belong to no part with a stylesheet of its own | the code makes it true (see "Compared" below); nothing missed |
| Row 2 (a new screen adds its stylesheet and `<link>`) | sentence of D-408 | true: `index.html` has a `<link>` for each of the nine files, `knowledge-screen.css` for Wiedza |
| Row 3 (Przejście and its panel read the question and the window from the state) | sentence of D-407 | true: `run-entry.ts`, `run-screen.tsx`, `program-panel.tsx`, `run-screen-reading.ts`; no `setQuestion`/`setWindow` remains in `src` or `tests` (`git grep` empty) |
| To do 7 (D-407 *Verification* example) | D-407 *Verification*, `complies` | true at head |
| To do 8 (plaque of a discovery) | D-43 binding sentence, D-40 first paragraph, both in D-43's words; the styleguide rows `text-strong` and the rule "No value in place of a design token" | true: `.scene-discovery-plaque` sets `color: var(--text-strong)` in `styles.css` (read in the foundation step) |

## Entries compared with the code (by identifier)

- **D-421** (whole, at head). Compared with `src/browser/*.css`, `index.html`, `kitchen-sink/index.html`, `scripts/static-files.mjs`: `styles.css` holds the base rules, the `:focus-visible` rule, the menu bar, the rows of sentences, controls, the four kitchen-sink rule groups, the common layout, and the two undivided rules named (`trip-warning` at `styles.css:517`, the frames rule at `:645` with `@keyframes scene-frames` at `:652`); the columns rule stands there too; the nine other files exist, each linked in `index.html`; `credits.css` holds the credits rules; the kitchen-sink page links `/tokens.css`, `/styles.css`, `/kitchen-sink.css` alone. Matches.
- **D-408** (whole). Matches `index.html` and the registry; its test lines (`tests/view/screen-registry.test.mjs`) quote sentences unchanged.
- **D-407** (whole). Matches `run-entry.ts`, `run-screen.tsx`, `program-panel.tsx`, `run-screen-reading.ts`, `run-screen-state.ts`: the state is in `run-screen-state.ts`, not in `game-view.ts`; the screen and the panel read it through `useSyncExternalStore`; the tests clause quotes `closeWindow` by the game view (`tests/view/run-screen.test.mjs:917`). The *violates* example about a `set…` method has no test and no code against it (searched).
- **D-43, D-40** (whole). Compared with `styles.css` and `scene.tsx` (plaque of a discovery holds one `span.icon-mask`, `--text-strong` set by the plaque rule). D-40 and D-43 say the same of the four places. The decision-quotation lines of the tests (`decision: D-40`, `decision: D-43`) end before the added words; `foundation_check` reports 0 errors.
- **D-416, D-265, D-47, D-28** (whole). D-416: its trees open in the component (D-407's example cites it truly). D-265: the look of controls stands in `styles.css` (`.button`, `.tabs` found there); the comments of the five `react-*.tsx` and `shared-controls.test.mjs` name `styles.css` for exactly that, which is true. D-47: the `:focus-visible` rule is in `styles.css` only (invariant test passes per the fix report); D-421 reads D-47's "the game's stylesheet" as `styles.css`. D-28: "a second stylesheet then has no designated model" still true with more stylesheets; no kind and no exemplar of stylesheets was added.
- **D-368, D-370, D-371, D-311** (read, found by the search for "end-of-run window"/"question"): none says the game view tells the screen to show the question or the window. D-371 says the window's open state is "a memory of the page, kept by the game view"; this is as it was at the base (the state module was already `run-screen-state.ts`) and D-407 already says where it lives, so the change did not make it newly false; left as it stands.
- **D-36, D-35** and the two tables: `guidelines/coding-browser-module.md` has a row for each of the 75 files of `src/browser/view/` plus the 5 of `controls/` and no row for a missing file (script: tracked files against the table's rows, equal for `view`); `guidelines/coding-simulation-module.md` has a row for each file of `sim/` but `saved-game.ts`, which `guidelines/coding-saved-game.md` holds as that kind's exemplar. The six `do not copy` rows are the ones the task lists (`game-view.ts`, `headquarters-entry.ts`, `programs-entry.ts`, `rule-list.tsx`; `loop.ts`, `skills.ts`). Rows beyond the task's list (`counted-name.ts`, `knowledge-entry.ts`, `knowledge-lines.ts`, `knowledge-screen.tsx`, `run-screen-reading.ts`) are `copy`: files the base or slice 2 added that the task text does not name; they carry the same status as "every other file of the kind".
- **Invariants** `browser-view-focus-outline`, `browser-view-token-values` (whole). Both stay true as written: the first needs `styles.css` to hold the one `:focus-visible` rule and scans every `.css` directly in `src/browser/`; the second reads the files of the part by its own list. No sentence names a file the change moved.
- **Part map** (whole). `browser-view` claims `src/browser/*.css`, `src/browser/index.html`, `src/browser/view/**` and `tests/view/**` (so `tests/view/game-stylesheets.mjs`); `agent-workflow` claims `guidelines/**` and `src/browser/AGENTS.md`; `product-foundation` claims `foundations/**`. Every file the change adds falls in one of them; nothing to write. `foundation_check` reports 0 errors and no `listed:` line.

## Searches run (with results)

| Search | Result |
|---|---|
| `git grep -n "styles\.css"` over the repository without `src/browser/*.css`, `.runs`, `.the-way` | every line read. Each is true at head: D-265, D-421 (the shared file), the styleguide (the shared file; the rule on stylesheets), `coding-browser-module.md:181,185` (look of a control), the invariant `browser-view-focus-outline`, the five `react-*.tsx` comments (look of a control), `kitchen-sink.tsx:142` (`.tabs > .button.tab` stands at `styles.css:383`), `src/browser/AGENTS.md:5` (already says the screen's own file or `styles.css` for the shared), both `index.html`. No place names `styles.css` for a rule that stands in another file. |
| `git grep -n -i "stylesheet\|style sheet\|arkusz\|\.css"` in `README.md`, `AGENTS.md`, `CLAUDE.md`, glossary, environment facts, part map, invariants, `guidelines/` but the styleguide | `README.md:33,76` ("the style sheets that lie directly in `src/browser/`", the kitchen-sink sheet "outside the style sheets copied to `dist/public`") true; the rest are D-43/invariant/guideline lines true at head. |
| `git grep -n -i "stylesheet\|style sheet"` in `foundations/decisions.md` outside D-421 and D-408 | every hit read. None says the game's stylesheet is one file except D-47's "the game's stylesheet" (the one holding the `:focus-visible` rule; D-421 ties it to `styles.css`) and the tests clauses "through the real stylesheet" (D-39, D-40, D-41, D-43, D-46), which name the sheets the page links as one reading, as the helper `tests/view/game-stylesheets.mjs` gives them. Left as they stand: true. |
| the same in `guidelines/styleguide-browser-view.md` (`arkusz`) | 18 hits read; true (the rule "A stylesheet of its own …" was rewritten by the change). |
| `git grep -n -i "setQuestion\|setWindow\|tells it to\|tells the screen\|told to show\|to show the question\|to show the window"` over the repository | one stale sentence (`run-screen-state.ts:79`), corrected in `854e7881`; D-407's *Rejected* holds the two old ways on purpose; `scene.tsx:47` ("the scene tells the screen") is the scene telling the screen that an effect ended, unrelated. |
| `git grep` for "end-of-run window", "the question „Zapisać", `run-entry`, `runScreen` in foundations, guidelines, `AGENTS.md`, `README.md` | read D-368, D-370, D-371, D-311 and the guideline passage at `coding-browser-module.md:374` (`createGameView` composes the state of the screen Przejście): true. |
| `git grep -n -i "no text stand\|no text beside\|where no text\|with no text\|though no text\|though it is no text"` and for plaque/badge/flying-icon words | the lists of places of `text-strong` for an icon with no text beside it stand in D-40, D-43 (both now with the plaque of a discovery) and the styleguide rows at `styleguide-browser-view.md:25,113` (with it). D-320 and D-365 compare with the icons of the map and the row but do not list places. No list omits the plaque. |
| `git grep "decision: D-421\|D-408"` in `tests/` | D-408 sentences quoted truly; no test quotes D-421 (it has `no test holds it yet`); `tests/view/game-stylesheets.mjs` and four tests cite D-421 in comments. |

## What I wrote, and what I judged not to need an entry

- **Environment fact:** none written. The change rests on the order rule of the CSS cascade (equal-specificity rules of different files resolve by the order of the `<link>`s) and on React's `useSyncExternalStore`/`flushSync`. The template writes a fact only where a decision's *Based on* names a citation that would call the decision into question if it stopped being true; D-421 and D-407 carry *Based on: none* and their binding sentences state no behaviour of those sources (D-407 already named `useSyncExternalStore` before this change). The order of the links is a fact of `index.html` that `tests/view/rule-signs.test.mjs` and the helper read. Adding a *Based on* citation would be a new claim for the human, not a correction.
- **Glossary term:** none. The words the change uses (screen, program panel, state of the screen Przejście, stylesheet of its own, registry of screens, window) take no glossary entry under WAY-95: they mean what a reader of the field reads. The glossary entry `copy` is a noun for the copy of a program; the guideline tables' status `copy` (the template's word, as "do not copy") is not that noun, appears in guidelines and not in foundation sentences, and this change added no use of it against the entry. One word I weighed: "part" in D-421 ("each part several screens use", "no part with a stylesheet of its own") against the part map's "part" (e.g. `browser-view`); D-421 uses it in the plain sense (the program panel, the credits), names the part map's parts only through `Scope:` and "the part browser-view" elsewhere, and a reader of D-421 is told by its own examples which parts are meant. Not made an entry; if a human finds the two readings confusable, that is a wording matter of D-421.
- **Choices that bind after the merge (WAY-36), each judged:**
  - Slice 6 "choices the plan did not settle": (1) the frames rule in the screen's file: superseded by fix 1, which moved it to `styles.css` and wrote the exception into D-421 (already an entry); (2) `trip-warning` in `styles.css`: the same exception, in D-421; (3) rules no file draws moved with their neighbours, not deleted: ends with this change (plan test: no longer binds), stays a row of the questions table; (4)-(5) which file a rule goes to: answered by D-421's rule (a rule of a screen in that screen's file; a rule of a part several screens use in that part's file), so the log already answers it (the decisions template's question 5), no second entry; (6) comment pointers: slice 8's, done.
  - Slice 7: the order of the `<link>`s follows the first rule of each file in the base `styles.css`: a transition rule of this migration (it ends with the merge); it also stays checked, because `tests/view/rule-signs.test.mjs` reads the files in link order. No rule is invented for a new screen's place in the order, which no source of the task states: stays a row of the questions table. `.rehearsal-mark` in `maps-screen.css`: one location in code, which D-421's rule already gives (the screen that draws it); no entry. The credits in `credits.css`: in D-421's examples.
  - Slice 2: the hook `src/browser/view/run-screen-reading.ts` (a place of code: the file's head comment says why it flushes synchronously, and `tests/view/run-screen.test.mjs` fails without it, as the slice report shows by mutation) and the optional fourth parameter of `createRunScreen` (a convenience for a test that calls it with three arguments, which the slice report says only tests use): neither is a choice someone who does not know it would make otherwise and a test not tell them why; the decisions template ("An entry stands only where …") gives no entry. Where a guidelines place would carry the reading of the stylesheet by tests (`tests/view/game-stylesheets.mjs`), that place is `guidelines/testing.md`, written by its own skill, not by the return step; no entry here.
- **A decision with a pair of examples and a test holding part of it (item 3):** D-407 (the tests clause already names the held parts; the pair's `complies` and `violates` examples that remain are not held by a test: searched `tests/` for a check that the screen or the panel has no method `set…`, none), D-408 (no test holds the stylesheet clause), D-421 (none), D-43 and D-40 (a plaque's icon in `text-strong` is held by no test: `scene.test.mjs` reads the plaque's icon `--icon` only, not its colour). Nothing moved out of a pair.

## Checks (commands and exit codes)

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (without `--skip-test-citations`, before and after the commit) | 0 | `0 errors`; no `listed:` line |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 142 warn, 7 info` (the number correction 1 reports; warnings do not stop the gate) |
| `npx --no-install prettier --check src/browser/view/run-screen-state.ts` | 0 | formatted |
| `npx --no-install eslint --max-warnings 0 src/browser/view/run-screen-state.ts` | 0 | no report |
| `npm test -- tests/view/run-screen-state.test.mjs` | 0 | 18 tests pass (comment-only change) |

The product's full gate was not run (handoff).

## Reaches beyond the handoff

- `tests/view/game-stylesheets.mjs` (whole) and `src/browser/index.html`, `src/browser/kitchen-sink/index.html`: to judge the test-reading choice and D-421's kitchen-sink sentence.
- `src/browser/view/run-entry.ts` (to line 140 and a grep), `run-screen-reading.ts` (whole), `run-screen.tsx` and `program-panel.tsx` (comments by grep): to compare D-407 and find the stale comment.
- `foundations/environment_facts.md` and `foundations/glossary.md`: headings and the entries `copy`, `loop`, and the CSS and React facts, to judge the environment-fact and glossary duties.
- `.the-way/foundations/decisions.md` WAY-36 and WAY-95, `elements/decisions/template.md` lines 140-172, `elements/environment-facts/template.md` "Which facts are written": the rules of the two judgments above.
- `guidelines/coding-saved-game.md:18`: to see where `saved-game.ts` has its row.
- `the author's rules for git`: before the commit.

## Unread material

- `.the-way/task-cycle/change/SKILL.md`: lines 1-40 only through the first 2 KB of the tool's saved-output preview (frontmatter, the start of section 1), lines 40 to the end whole.
- `reports/slice-6-executor-report.md`, `slice-7-executor-report.md`, `slice-2-executor-report.md`: only the sections "choices"/"mismatches" the handoff names; `foundation-entries-report.md`, `correction-1-report.md` whole; `fix-1-report.md` its first 60 lines; `correction-1-remarks.md` whole. The reviews' reports were not opened beyond a grep for the stale comment.
- `plan.md`: *Foundation entries* and *Choices* only, as the handoff says. `task.md` whole.
- D-28, D-265: read the passages of the decision down to *Rationale* (D-28) and to the second paragraph of D-265 (lines 4108-4143); not their *Rejected*.
- The whole `guidelines/styleguide-browser-view.md`: not read whole; read the rule on stylesheets (lines 336-375), the table of roles around line 25, lines 146-156 and 1098-1125, and by search every hit of `arkusz`, `plaque`-words and `styles.css`.
- `guidelines/coding-browser-module.md`: read the table, the rules "TypeScript i DOM" and "Nowy ekran i moduły w DOM", the start of the examples and lines 366-385; not the rest of the examples.
- `foundations/decisions.md` hits of "stylesheet" (23) read at their lines, not each entry whole except those named above.

## Searches not found or unclear

none.

## Working copies

`.runs\return-step\` held only my outputs (`files-*.txt`, `rows-*.txt`, `fc.txt`, `ci.txt`, `t.txt`); removed before I returned. No worktree, clone, screenshot or game was made.
