# Planner report — loop2: porządki widoku po przejściu na React

- **Status:** done with concerns
- **Plan:** `.runs/task-cycles/porzadki-widoku-po-react/plan.md`
- **Size report:** `.runs/task-cycles/porzadki-widoku-po-react/plan-size.md` — `slice_size.py` exit 0, every slice `fits` (Slice 2 the largest, 144 079 estimated tokens of 150 000)
- **Base:** `7ba7a116` (worktree clean before and after; the plan and its size report are the only files written, both under the ignored `.runs/`)

## The plan in short

Five foundation entries first (a new decision for Settlements row 1; D-408 for row 2; D-407 for row 3 and To do 7 in one change; D-43 for To do 8), then eight slices, made in this order:

1. The state of the screen Przejście gains `subscribe` and a stable snapshot, as `createFolding` has (cheaper).
2. The screen Przejście and its panel read the question and the window from it through `useSyncExternalStore`; `setQuestion` and `setWindow` go; `tests/view/run-screen.test.mjs` changes its 22 lines (same).
3. The two tables „Files of this kind” after the audit, with the reconciliation's (a)–(d) (cheaper).
4. A test helper `tests/view/game-stylesheets.mjs` that follows the `<link>` tags of `src/browser/index.html`; `world-area`, `run-header` and `rule-signs` tests read through it (cheaper).
5. `scene.test.mjs` reads through it (cheaper).
6. Split, part 1: `run-screen.css`, `program-panel.css`, `programs-screen.css` (same).
7. Split, part 2: `headquarters.css`, `character-screen.css`, `maps-screen.css`, `knowledge-screen.css`, `account-card.css`, `waiting-screen.css`, `accounts-screen.css`, `credits.css` (cheaper).
8. The styleguide's rule of the stylesheets, the places that name `styles.css`, `src/browser/AGENTS.md`, the comment of `email-status.ts` and the styleguide's restatement of D-43 (cheaper).

Every slice's *Risk* is `none`: no file of the trust boundary of `browser-view` (`assets/icons/**`, `assets/fonts/**`, `assets/sprites/**`) is touched, and nothing cannot be undone.

How the cascade order is kept in Slices 6 and 7 (the handoff's constraint): rules move whole, with no change of a selector or a declaration; the new files are linked after `styles.css` in the order their first rule stood in the base `styles.css`; a one-off script in the slice's directory for working copies compares the concatenation, in `<link>` order, before and after the slice, and lists each pair of rules whose order changed, with equal specificity and a common property, for judgement in the report; and a comparison of computed styles (with `::before` and `::after`) of every element of each reachable screen state, before and after, in the real game by Playwright CLI (D-417; Playwright MCP only as D-420 allows), and on the kitchen-sink page. The tests that read the real stylesheet are pointed at the page's links before the split (Slices 4, 5), so the split's slices change no test.

## Open design choice and reserved choice

None found. Reading the code shows one way to make To do 1 that the foundation already settles: D-407 says shared memory of the page is read through `useSyncExternalStore`, and `createFolding` in `src/browser/view/program-panel.tsx:94-130` is the product's pattern of it. The plan writes it under *Choices*. No language, framework, library, store of data, way of logging in or place to run is added.

## Rule of size (WAY-365)

The product's coding guidelines hold no rule of size (`guidelines/coding.md` has none; the task names it as the subject of another task), so the plan begins with no move slice.

## The styleguide's order-of-work example

Not followed, and the plan says so under *Choices*: the example (environment and library, values in their source, one screen, its states) is the order of building a look. This change adds no value, control or screen; it moves rules by what shares elements — the program panel with its two screens first — and writes the rule that describes the files last, after the files stand.

## Guidelines found missing or uncertain

1. `AGENTS.md` asks for `guidelines/styleguide-browser-view.md` before changing any file of `browser-view`, test files under `tests/view/` included, while `.the-way/product-guidelines/reading.md` selects a styleguide for work that changes a user interface. The plan follows `AGENTS.md`, so the test-only Slices 4 and 5 read the styleguide whole (87 KB); this is why the change of the four tests is cut in two slices. Uncertain which rule the product means for test-only work.
2. D-40 lists the same three places as D-43 where an icon with no text beside it stands in `text-strong` (the badge over the mage's head, the plaque of the flying icon, the drawing of the map), and so does the styleguide's table Roles, row `text-strong`. To do 8 changes D-43 alone. After entry 5, D-40 and the row of the table would not name the plaque of a discovery. See question 1 below.
3. D-47 speaks of "one `:focus-visible` rule of the game's stylesheet", in the singular. Task question 2 settles that D-47 stays true unchanged; the writer of entry 1 may want the new decision to say that the game's stylesheet of D-47 is `styles.css`, which keeps the rule. Not a gap of the guidelines, but a wording the foundation agent should weigh.
4. The template of the kind table (`.the-way/product-guidelines/coding/template.md`) has no column for the place that gives `do not copy`, and `.the-way/product-guidelines/coding/kinds.md` says the table takes none. Task question 1 (a) asks for "`do not copy` with the place that breaks the rule". The plan puts the places in the report of Slice 3, not in the table. Certain, listed so the reviewer of the plan sees it.
5. `guidelines/styleguide-browser-view.md`, section "Where in code", lists `src/browser/tokens.css`, the controls and the kitchen-sink page, not the stylesheets. Slice 8 does not have to add the new files there; whether it should is left to that slice's judgement.

## Concerns

1. Slice 2 reads about 144 000 estimated tokens, near the limit of 150 000. If its agent runs long, the next cut is to move the check in the real game into a slice of its own.
2. The checks in the real game of Slices 2, 6 and 7 may not reach every state at the local start: the end-of-run window needs a map run that ended (a composed state can bring one), the list of accounts needs an account with the owner role (I did not check whether the local start can give it), and the waiting screen stands only for a moment. Each slice names such a state as unchecked in the game, its rules covered by the order script.
3. The comparison of computed styles of every element yields a large output. Its agent should write it to a file through `playwright-cli run-code`, not read it in the answer. `playwright-cli` answers `0.1.22` on this computer.
4. Slice 3 writes the statuses the task settles and compares the four new files itself, without running `the-way-maintain-coding-guidelines`. Task question 1 (a) chose an audit in the refinement over a refresh by that skill. `AGENTS.md` asks for the project skill "for their named work". I read the task's answer as covering this work. See question 2.
5. The choice that the screens of the page — the login card, the waiting screen and the list of accounts — get stylesheets of their own rests on reading "every screen" of Settlements row 1 to include the page's screens (D-262), not only the six screens of the game (D-280). It costs two small files where it is wrong. See question 3.

## Questions still open, with proposed answers

1. **D-40 beside D-43 (To do 8).** What the player sees: the icon on the plaque of a discovery stands in `text-strong`, as the stylesheet sets it. The task changes D-43's list of those places. D-40 and the styleguide's table Roles hold the same list and would lag. Proposed answer: the agent of the foundation entries writes D-43 as entry 5. It reports D-40's sentence and the table's row as the same gap in its report, and the orchestrator puts them before the human in the request. Changing D-40 in this cycle widens To do 8 beyond its words. Evidence: `foundations/decisions.md:4638-4652` (D-40), `foundations/decisions.md:4683-4697` (D-43), `guidelines/styleguide-browser-view.md:25` (row `text-strong`), `src/browser/styles.css:2281-2288`.
2. **The skill of the coding guidelines.** Proposed answer: Slice 3 edits the two tables directly, as the plan gives. Task question 1 (a) settles an audit made in the refinement, with the statuses written into To do 2, and rejects (b), the full refresh by the skill. Evidence: `.runs/task-cycles/porzadki-widoku-po-react/task.md:45-50`.
3. **Page screens as screens.** Proposed answer: keep the plan's choice. Evidence: the task's list of what stays in `styles.css` names no page screen (`task.md:36`), and D-262 calls them screens (the waiting screens and the screen of the login card).

## Reaches beyond the handoff

- `.the-way/product-guidelines/reading.md` (lines 1-80), to settle which guidelines each slice's *Read* names.
- `.the-way/product-guidelines/coding/template.md:95-120` and `:255-275`, and `.the-way/product-guidelines/coding/kinds.md:1-29`, for the form of the kind table and where the place of a `do not copy` stands.
- `.the-way/product-guidelines/template.md` (headings and the field lines only, by search), for the form of a rule that Slice 8 writes.
- `.the-way/task-cycle/slice_size.py` (whole), to know what it measures.
- The plan of an earlier cycle, `docs/task-cycles/przejscie-widoku-na-react/plan.md` at commit `9a76c65c` (lines 1-60), for the product's conventions of a plan.
- `src/browser/view/program-panel.tsx` (lines 1-190, 310-369, 550-789), `src/browser/view/game-view.ts` (searches), `src/browser/view/programs-entry.ts:315-330`, `src/browser/view/headquarters-entry.ts:35-66`, `src/browser/view/email-status.ts:1-8`, and searches of `knowledge-*.ts(x)`, `counted-name.ts`, `rule-list.tsx`, `accounts-screen.tsx` and `rule-panel.tsx`, to name files and places for Slices 1-3 and 8.
- `package.json`, `tests/quality/test_quality_invariants.py` (search of CSS patterns), `scripts/build.mjs` and `scripts/kitchen-sink.mjs` (search of `index.html`), to name the checks.
- `git diff --stat e125db89 7ba7a116 -- src/browser/view src/browser/sim`, for reconciliation (c) of Slice 3.
- `.runs/task-cycles/porzadki-widoku-po-react/cycle.md` (search), for the classes of model in use.
- Commands run once at the base to confirm that each slice's checks run: `npm test -- tests/view/run-screen-state.test.mjs` (12 passed), `npm test -- tests/invariants/test_browser_view_focus_outline.py` (3 passed), `npx --no-install prettier --check …` on `styles.css` and `index.html` (passed), `npx --no-install eslint --max-warnings 0` on two files (passed), `npm run typecheck` (passed), `playwright-cli --version` (0.1.22).

## Working copies

`.runs/planner/` held the table rows of the two guideline files (`vt.txt`, `st.txt`), a copy of the first slice section (`old-slice1.md`) and two one-off scripts that renumbered the slices (`renumber.py`, `renumber2.py`). All were removed, with the directory. The focused test run built `dist/` — the product's own output, outside the rule. Nothing remains.

## Unread material

- `foundations/invariants.md`: read by selection (lines 1-125, 165-247, 319-588, 838-869, 1008-1307), as the handoff asks. Not read: the invariants of the part `browser-view` together with other parts at lines 608-637 (`player-self-registration`, `player-password-login`, `email-verification-nonblocking`), 668-677 (`player-opaque-session-cookie`), 708-717 (`loop2-shared-public-origin`) and 818-837 (`account-client-requests`, `account-client-outcomes`), whose subjects (accounts, sessions, HTTP) no slice touches. Not read: the rest of the file, of other parts.
- `foundations/decisions.md`: D-417 and D-420 are named in the *Read* of Slices 6 and 7 by range, from their headings, without my reading them whole; I relied on `.claude/skills/loop2-play/SKILL.md`, which I read whole and which cites them. Of the further decisions named in *Read*, D-173, D-252, D-324, D-368, D-370, D-371 and D-40 I read in the index's statements only, not whole; D-267, D-269, D-32 and D-45 I read whole (they stand in the passages of the log I read for the handoff's decisions).
- `src/browser/styles.css`: not read whole. I read the first lines of each comment, the list of every top-level selector with its line, and lines 2281-2295.
- `src/browser/view/program-panel.tsx`: lines 1-190, 310-369 and 550-789 read; 190-310, 369-550 and 789-end not read.
- `tests/view/run-screen.test.mjs`: lines 1-320 read, and the whole file searched for `setQuestion`, `setWindow` and the names of its cases.
- `src/browser/kitchen-sink/`: `index.html` read whole; `kitchen-sink.tsx` lines 1-14 and 636-680 read and the file searched for its classes; `kitchen-sink.css` only searched for `styles.css`.
- The tests that read the stylesheet: `tests/view/scene.test.mjs` lines 26-45 and searches; `tests/view/world-area.test.mjs` lines 26-45 and searches; `tests/view/run-header.test.mjs` lines 425-440; `tests/view/rule-signs.test.mjs` lines 241-263; `tests/view/shared-controls.test.mjs` only its line 2 found by search.
- `tests/invariants/test_browser_view_focus_outline.py`: searched and run, not read whole.
- The other tests that the searches of `setQuestion` and `setWindow` find: none beyond `tests/view/run-screen.test.mjs`.
- Read whole: the handoff, the plan skill, the frozen task, the index of decisions, D-407, D-408, D-265, D-47, D-36, D-35, D-28, D-43, D-416, the part map, the glossary, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/coding-simulation-module.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`, `src/browser/view/run-screen.tsx`, `src/browser/view/run-entry.ts`, `src/browser/view/run-screen-state.ts`, `src/browser/index.html`, `scripts/static-files.mjs`, `.claude/skills/loop2-play/SKILL.md` and `.the-way/task-cycle/skill/foundation_step.md`.
- `src/browser/view/programs-entry.ts`: lines 315-330 only.

## Searches not found or unclear

- Invariants cited by the tests the plan changes (`run-screen`, `run-screen-state`, `scene`, `world-area`, `run-header`, `rule-signs`): a search for "invariant" in those six files found none.
- The first search for files without a row in the kind tables matched a path anywhere in the guideline file. It took `waiting-screen.tsx`, named in the section Examples, for a listed file. A second search, of the table rows alone, found it without a row. The final listing (eleven view files without a row, `saved-game.ts` rightly outside the simulation table, no row without a file) comes from the second search.
- `rg` skips hidden directories, so the search of `styles.css` in `.claude/`, `.agents/` and `.github/` was repeated with `git grep`: no mention there.
- Unclear, not checked: whether the local start can give an account the owner role (for the list of accounts in Slice 7), and how long a composed state takes to reach the end-of-run window in the real game (Slices 2 and 6).
- Many comments say "the stylesheet" without a file name (`run-screen.tsx`, `scene.tsx`, `camp.tsx` and others). Task To do 6 speaks of places that name `styles.css`. The plan covers the places that name the file, not these, which stay true after the split.
