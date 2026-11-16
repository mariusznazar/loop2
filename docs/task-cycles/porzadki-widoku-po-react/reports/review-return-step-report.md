PASS 854e7881d61ed16b0daf82c98fe591407f04af0d

# Review of the return step

Range: `370abc76d3362a8496f679008bc84dc0ddd39ad5..854e7881d61ed16b0daf82c98fe591407f04af0d`, one commit (`854e7881`, "docs: :memo: drop from the comment of openWindow …"), one file, `src/browser/view/run-screen-state.ts`, lines 77-80, 1 line changed. `git rev-parse HEAD` = `854e7881d61ed16b0daf82c98fe591407f04af0d`, the head given. `.the-way` stands on `bfb2e109`, the commit the gitlink records.

## Findings

### Critical

none

### Important

none

### Minor

1. **Comments in four screen stylesheets still point "above" to the one `:focus-visible` rule, which now stands in another file.** Places: `src/browser/maps-screen.css:20` ("Focus is the one :focus-visible rule above."), `src/browser/program-panel.css:390` (same words), `src/browser/programs-screen.css:32` ("… :focus-visible rule above."), `src/browser/run-screen.css:498` ("focus is the one :focus-visible rule above (D-47)"), `src/browser/knowledge-screen.css:15-16` ("Focus is the one :focus-visible rule above."). Two more in the same vein: `src/browser/knowledge-screen.css:10` ("as the columns of Mapy (above)") and `src/browser/maps-screen.css:17` ("columns of Programy (above)"), whose columns stand in `styles.css`. At the merge-base `7ba7a116` all these comments stood in the single `styles.css`, where the rule `:focus-visible` (its line 30) and the columns did stand above them; the split moved the comments with their rules, and the rule they point to stayed in `styles.css`. A reader of one screen's file who looks above in that file finds no such rule. Why it matters only a little: the head comment of each of these files says the page links it after `styles.css`, `run-screen.css:498` cites D-47, and `knowledge-screen.css:3-4` and `maps-screen.css:4` say outright that the columns stand in `styles.css`, so the reader is not led to a wrong rule. Evidence: `git grep -n -E "\b(above|below)\b" -- 'src/browser/*.css'`; `git show 7ba7a116:src/browser/styles.css` (the comments at its lines 94, 157, 402, 553, 992, 1320, 1933, 3110, the rule at line 30). The executors of slices 6 and 7 named these pointers as left for slice 8 (`reports/slice-6-executor-report.md:72`, `reports/slice-7-executor-report.md:99`); the plan gave slice 8 only the places that name `styles.css` (To do 6), and these name none. **Outside the return step's commits and outside what the return step corrects** (comments of the stylesheets, not foundation entries), within the task's change (the split made them stale). Not blocking.

2. **Two claims of the return step's report are wrong in a detail; the code and the entries are right.** (a) `reports/return-step-report.md:21` says "`.scene-discovery-plaque` sets `color: var(--text-strong)` in `styles.css`"; the rule stands in `src/browser/run-screen.css:847-853` (`color: var(--text-strong)` at line 851), and no file of the foundation or the guidelines names a file for it, so D-40 and D-43 stay true. (b) `reports/return-step-report.md:18` says "`index.html` has a `<link>` for each of the nine files"; `src/browser/index.html:9-19` links eleven stylesheets besides `tokens.css` and `styles.css`, which are all the `.css` files directly in `src/browser/`, so the substance (every file linked) holds. The report is outside the change; no reader of the product reads it. Not blocking.

## Judgment of the commit

- **The comment now says what the code does.** `openWindow()` at `run-screen-state.ts:222-231` returns `closeQuestionNow()`'s result, true where a standing question was closed. Its callers: `run-entry.ts:156-158` calls it and ignores the value; `run-header.tsx:31,125` and `run-screen.tsx:71` are the controls' `openWindow(): void`, not this method; only `tests/view/run-screen-state.test.mjs:196,199,204,228` read the value. The screen reads the state through `createRunScreen(…, screenState)` (`run-entry.ts:231-236`) and the panel through `{ state: screenState }` (`run-entry.ts:227-230`), both by `useRunScreenSnapshot` (`run-screen-reading.ts:3-8`), so "the screen and its panel read the change from the state" is true. At the task's merge-base the entry did `if (screenState.openWindow()) runScreen.setQuestion(false);` (`git show 7ba7a116:src/browser/view/run-entry.ts`), so the old words were true then and false at `370abc76`. The new sentence keeps the citations D-311, D-324 and adds no claim the code does not hold.
- **Against D-407.** Its binding sentence "The screen Przejście and its program panel read the question and the window from the state of the screen Przejście, and the game view calls no method of either to show them" now agrees with every comment of the view: `run-screen.tsx:11-19,62-66,235`, `program-panel.tsx:7-11,139-140,343-345,694-697`, `run-entry.ts:1-9,225-226`, `game-view.ts:147-150`, `run-screen-reading.ts:1-9`.
- **Against the guidelines.** `guidelines/coding.md` and `guidelines/coding-browser-module.md` hold no rule a comment of the view's code breaks here; the comment is in English, formatted (prettier) and passes ESLint.

## The return step's claims that nothing else needed correction

- **A sentence that the game view tells the screen Przejście or its panel to show the question or the window:** none outside D-407's *Rejected* and *violates*, which name the old way on purpose. Searched foundations (decisions, invariants, glossary, environment facts, part map), `guidelines/`, `AGENTS.md`, `src/browser/AGENTS.md`, `README.md`, and also `src/` and `tests/`. Hits: `foundations/decisions.md:4476,4485,4489` (D-407, true as written); `src/browser/view/scene.tsx:47` and `tests/view/scene.test.mjs:1879` (the scene telling the screen an effect ended, unrelated); `tests/view/run-screen.test.mjs:860` (the state shows the window, true). The return step's claim holds.
- **A place that names `styles.css` for a rule that stands in another file:** none. Each of the 52 places `git grep -n "styles\.css"` finds was judged; the selectors the comments name stand in `styles.css` (`.button.secondary:hover`, `.button.destructive:hover`, `.tabs > .button.tab`, the account menu, `@keyframes scene-frames`, `.camp-member img`, the columns, `trip-warning`, `:focus-visible`), counted per file. The reverse case — a comment placing a rule of `styles.css` "above" in a screen's file — is Minor 1, outside the return step's search.
- **The places of `text-strong` for an icon with no text beside it:** D-40 (`decisions.md:4655`), D-43 (`:4700`, its *complies* and *violates* at `:4706-4707`, its rationale at `:4710`), the styleguide's row of `text-strong` (`styleguide-browser-view.md:25`) and the rule "No value in place of a design token" (`:110-113`) each name the plaque of a discovery. D-320 (`decisions.md:11043,11072-11073`), D-365 (`:11203`) and the styleguide lines 714 and 793 speak of one icon each and compare with others, without a list that could omit the plaque. The return step's claim holds.
- **An entry the return step should have written and did not:** none found. Environment fact: D-421, D-407 and D-408 carry *Based on: none*, and no binding sentence states a behaviour of the CSS cascade or of React; the only cascade fact in `foundations/environment_facts.md` is `css-wide-keywords`, unrelated. Glossary: the words of the change are read as the field reads them; I agree with the return step's weighing of "part" in D-421 (its own examples say which parts). Choices that bind after the merge: the place of a new screen's `<link>` ("po `/styles.css`") stands in the styleguide (`styleguide-browser-view.md:347`) and D-408; the order of the existing links is a transition of this split. No invariant is set by the task or a decision that none holds.

## Declined to judge

- The tables "Files of this kind" and the return step's count of their rows: not part of the return step's commits and not named by the handoff; the review of the whole change judged them.
- The Minor finding of the review of correction 1 (`styles.css:13-14`, "the rules of each other screen"): known, not raised again, as the handoff says.

## Checks

| Command | Exit | Result |
|---|---|---|
| `git rev-parse HEAD` | 0 | `854e7881d61ed16b0daf82c98fe591407f04af0d` |
| `git log --format='%H %s' 370abc76..854e7881`; `git diff 370abc76..854e7881` | 0 | one commit, one comment line of `run-screen-state.ts` |
| `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0 | both `bfb2e109…` |
| `npx --no-install prettier --check src/browser/view/run-screen-state.ts` | 0 | formatted |
| `npx --no-install eslint --max-warnings 0 src/browser/view/run-screen-state.ts` | 0 | no report |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `git grep` searches listed above (old telling path, `styles.css`, `text-strong` with icons, `above`/`below` in stylesheets, stylesheet links) | 0 | as judged above |
| `git show 7ba7a116:src/browser/view/run-entry.ts`, `git show 7ba7a116:src/browser/styles.css` | 0 | the old caller and the old place of the pointed rules |
| `git status --short` before and after | 0 | clean |

Not run: `npm test -- tests/view/run-screen-state.test.mjs` — the commit changes a comment only, so no test tells it apart from the base; the return step reports it at exit 0. The product's full gate was not run (handoff).

## Reaches beyond the handoff

- `src/browser/view/run-screen.tsx` head comment, lines 60-80 and 224-240; `program-panel.tsx` lines 3-14 and comments by grep; `game-view.ts` lines 144-157; `run-screen-reading.ts` comments by grep; `run-header.tsx` by grep: to check every comment of the view against D-407's new sentence.
- `src/browser/*.css` by grep (selectors, `above`/`below`), `src/browser/run-screen.css:847-859`, `src/browser/index.html`, `src/browser/kitchen-sink/index.html`: to test the claims about `styles.css`, the plaque and the links.
- `git show 7ba7a116:…` of `run-entry.ts` and `styles.css` (the task's merge-base): to see what the old comment and the moved pointers described.
- `foundations/decisions.md` D-320 (lines 11041-11080) and the hits of `text-strong`, `plaque` in decisions; `guidelines/styleguide-browser-view.md` lines 21-31, 109-116, 786-800, 849-862 and its hits of `plakietk`/`tabliczk`/`plaque`: for the places of `text-strong`.
- `foundations/invariants.md:460,470,480,490`, `foundations/environment_facts.md:276-282`, `foundations/part_map.md:1-20`, `src/browser/AGENTS.md` whole, `README.md` by grep: for the search the handoff names.
- `reports/slice-6-executor-report.md:72`, `slice-7-executor-report.md:99`, `slice-8-executor-report.md` and `-handoff.md`, `plan.md`, the reviews' reports by grep for "above"/"pointer": to place Minor 1.
- `package.json` scripts: to know what `npm test` runs before deciding not to run it.

## Working copies

none made; the directory `.runs\review-return-step\` was never created.

## Unread material

- `guidelines/styleguide-browser-view.md`: not named by the handoff; read only at the passages listed under Reaches.
- `.the-way/task-cycle/skill/foundation_step.md`, which `return_step.md` names for what the foundation step writes: not read; `return_step.md` was read whole.
- Otherwise none: the return step's report, `return_step.md`, `task.md`, D-421, D-408, D-407, D-43, D-40, `run-screen-state.ts`, `run-entry.ts`, `guidelines/coding.md` and `guidelines/coding-browser-module.md` read whole; `run-screen.tsx` read at its comments, not whole.

## Searches not found or unclear

- Not found: any sentence in the foundation, guidelines, `AGENTS.md`, `src/browser/AGENTS.md` or `README.md` that the game view tells the screen Przejście or its panel to show the question or the window, beyond D-407's own *Rejected* and *violates*.
- Not found: any place naming `styles.css` for a rule that stands in another file.
- Not found: a list of the places of `text-strong` for an icon without text beside it that omits the plaque of a discovery.
