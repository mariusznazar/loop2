FAIL 45f9b25ca433701a2f0afed1437cdaa736b0a7d1

# Review of the whole change — loop2: porządki widoku po przejściu na React

Range `7ba7a11669b391e61519350853f4fb60275bca16..45f9b25ca433701a2f0afed1437cdaa736b0a7d1` (9 commits: the foundation entries and slices 1 to 8, none reviewed before). `git rev-parse HEAD` in the worktree is `45f9b25ca433701a2f0afed1437cdaa736b0a7d1`; `.the-way` stands at the pinned `bfb2e109735b5fff98802b8be0ff3c43c799262a`.

Counts: 2 blocking (Important, within the task), 2 Minor within the task, 1 Minor out of scope.

## Findings

### Important 1 (blocking) — the foundation check fails at the head: a quotation of D-371 that begins no sentence

- **Place:** `tests/view/run-screen-state.test.mjs:309`, the case "a listener is called after each change of whether the window is shown, by a method of the state and by a result taken":
  `// decision: D-371 "it becomes open again at every entering of the screen of an ended map run"`
- **What is wrong:** a `decision:` line has to quote the beginning of a sentence of the decision. The words stand in the middle of D-371's first sentence ("Whether the end-of-run window (D-368) is open is a memory of the page, kept by the game view and never written into the game state or the save: it is open when a map run ends and when the game is built on an ended map run, it becomes open again at every entering of the screen of an ended map run, …").
- **Why it matters:** the one command of the repository runs `foundation_check.py`, whose exit 1 stops it, so the gate before the request is red until this line changes; the cycle cannot merge as it stands.
- **Evidence:** `python -B .the-way/elements/common/foundation_check.py` at the head: exit 1, `tests/view/run-screen-state.test.mjs:309: the quotation does not begin a sentence of D-371`, `1 error`. The same script on the base: exit 0, `0 errors`.
- **Comes from:** slice 1, `d0c42108`. Its executor's own-work check (a mutation of `settle()`) did not run the foundation check.
- **Fix:** quote from the start of the sentence up to the words the case needs, e.g. `// decision: D-371 "Whether the end-of-run window (D-368) is open is a memory of the page, kept by the game view and never written into the game state or the save: it is open when a map run ends and when the game is built on an ended map run, it becomes open again at every entering of the screen of an ended map run"`, and run the check again.

### Important 2 (blocking) — rules that several screens use stand where D-421 and the new rule of the styleguide do not allow them

D-421, written by this change, says: "Each screen and each part that several screens use has a stylesheet of its own", lists what `src/browser/styles.css` holds (the base rules, the `:focus-visible` rule, the menu bar, the rows of sentences, the shared controls and what the kitchen-sink page draws), and gives as a violation "the rules of a screen written into `src/browser/styles.css` or into the stylesheet of another screen". The styleguide rule "A stylesheet of its own for each screen and each shared part" (`guidelines/styleguide-browser-view.md:338-364`, slice 8) adds: "gdy tej samej reguły potrzebują dwa ekrany, część wspólna dostaje własny plik, żaden ekran nie czyta arkusza drugiego". Three places of the code depart from both:

1. **The camp of Siedziba is animated by a rule in the stylesheet of Przejście.** `src/browser/run-screen.css:1149-1158`:
   ```css
   @media (prefers-reduced-motion: no-preference) {
     .scene-mage-sprite img,
     .scene-fire[data-burning="true"] img,
     .camp-member img,
     .camp-fire img {
       animation-name: scene-frames;
   ```
   together with `@keyframes scene-frames` in the same file. `src/browser/headquarters.css:4-8` says so in its head comment. This is exactly the violation D-421 names (a rule of the screen Siedziba in the stylesheet of another screen), and the coupling D-421's *Rejected* gives as the reason against the panel's rules in Programy's file: "the screen … depends on the file of another screen and its look changes with a change of" that screen. Here an agent who changes the frames of the scene in `run-screen.css` changes the camp of Siedziba without reading `headquarters.css`, and an agent who changes Siedziba and reads `headquarters.css` and `styles.css`, as the new rule tells it, does not find the camp's motion except through a comment.
2. **The sentence `trip-warning`, which Przejście (`run-header.tsx:133`, `end-window.tsx:238`) and Mapy (`maps-screen.tsx:328`) draw, stays in `src/browser/styles.css:509-512`.** The head comment of `styles.css:6-7` names it as an addition. D-421 gives such a part a stylesheet of its own and does not list it among what `styles.css` holds; the styleguide's sentence above sends it to a file of its own.
3. **The columns of Programy, Mapy and Wiedza (`styles.css:233-246`, `.screen.programs-screen, .screen.maps-screen, .screen.knowledge-areas` and its `@media`) stay in `styles.css`.** The plan chose this on purpose (its *Choices*: splitting a selector list changes the text of a rule), and the head comment of `styles.css` names "the place of the screens and their common layout", but neither D-421's list of what `styles.css` holds nor the styleguide rule names it, and the styleguide's sentence sends a rule two screens need to a file of its own.

- **Why it matters:** the decision and the guideline this change writes say one thing and the files the same change writes do another; the next agent reads D-421 or the styleguide, finds them contradicted by `styles.css` and `run-screen.css`, and either copies the exception or "fixes" it in an unrelated task. Under WAY-263 a change whose files do what the entry it writes forbids is Important. What the player sees is not affected (see the checks below).
- **Comes from:** spans slices 6 (`581d09bb`, which moved the frames rule into `run-screen.css` and kept `trip-warning` and the columns in `styles.css`), 7 (`deed67af`, which kept both and wrote the comment of `headquarters.css`) and 8 (`45f9b25c`, the styleguide rule), and the plan's *Foundation entries* (D-421 in `f5b1c0e4`, written without the exception the plan's *Choices* and slice 7's *Goal* allow: "a rule that reaches classes of two screens and of no shared part goes to the file of the part they share or stays in `styles.css`").
- **Fix, two routes for the orchestrator:**
  - (a) Name the exception in the entry and the guideline: D-421's sentence and its *Verification*, and the styleguide's paragraph on `styles.css`, say that `styles.css` also holds the common layout of the screens and a rule several screens draw that is no part of its own (today `trip-warning`); and the frames rule of the scene and the camp moves whole, with `@keyframes scene-frames`, out of `run-screen.css` into `styles.css` (no selector changes; the order check and a look at the scene and the camp in the game again). Smaller change, keeps the plan's "no selector changes", but makes `styles.css` the home of shared screen rules, which D-421's rationale wanted to avoid.
  - (b) Keep D-421 and the styleguide as they are and move the code: a shared stylesheet for the frames of the sprites (the scene's and the camp's), with the selector list split between it and nothing else, `trip-warning` in a file of its own, and the columns rule in a shared file or split across the three screens' files. Follows the written rule, at the cost of more files and of selector changes the plan ruled out.
  - Recommended: (a). Each of the three is a handful of lines; route (b) adds three files of a few lines each, and a selector split, for no reader's gain.

### Minor (within the task)

- **M1 — D-407's *Verification* lost a clause that is still true.** `foundations/decisions.md`, D-407, *Verification*, the tests clause, now "which draws each only while that state shows it"; before the change it ended "and asks the game view to close the window". The screen still asks the game view to close the window: the window's „✕”, Escape and „Dodaj regułę z tym” call `controls.closeWindow()` (`src/browser/view/run-screen.tsx`, `windowControls`), which is `screenState.closeWindow()` in `src/browser/view/run-entry.ts:160-162`, and the case "„✕” asks the game view to close the window and the focus goes to „Koniec przejścia” …" of `tests/view/run-screen.test.mjs` still holds it. The foundation agent dropped it because it could not know whether slices 1 and 2 would keep the call (its report, *Choices*); they kept it. Putting the clause back makes the *Verification* name what the tests hold. Within the task (entry 3 of the plan's *Foundation entries*).
- **M2 — the row `text-strong` of the styleguide's table of roles names D-40 for a place only D-43 names.** `guidelines/styleguide-browser-view.md:25`: the row now says the role stands "na ikonie na każdej plakietce odkrycia w scenie", and its *Decision* column says `D-40`, whose sentence names the badge, the flying icon and the drawing of the map but not the plaque of a discovery (D-43 does, since this change). A reader who follows the column to D-40 does not find the words. Add `D-43` to the column (or change D-40, which is outside the task: see the out-of-scope finding). Within the task (slice 8, `45f9b25c`).

### Minor (outside the task)

- **O1 — D-40 still lists three places where an icon with no text beside it stands in `text-strong`.** `foundations/decisions.md`, D-40, first paragraph: "… the icon in the badge stands in `text-strong`, though it is no text and no text stands beside it; so does the icon flying to the mage, on its plaque in `panel`, and so do the icons of the drawing of the map, on `tile-revealed`." The plaque of a discovery, which D-43 now names, is missing. D-40 is not wrong (it lists, it does not say "only"), and To do 8 of the task changes D-43 alone, so this lies outside the task; the foundation agent named it for the human. It goes to the human or to the task of wording fixes of the foundation.

## Judgements the handoff asked for

1. **The quotation of D-371** (handoff item 1): Important 1 above.
2. **`src/browser/view/run-screen-reading.ts`** (item 2), a file the plan did not name: kept. Both roots need the same Hook (`useSyncExternalStore` over the state's subscription, with `flushSync` so that the question or the window stands before the entry moves the focus); one file of 33 lines avoids two copies of that rule, and keeps React out of `run-screen-state.ts`, which D-407 keeps outside React. Its row `copy` in `guidelines/coding-browser-module.md:75` is right: the file existed when slice 3 audited the table, breaks no rule of the kind (a custom Hook called at the top level, no effect, no DOM API), and the slice 2 mutation (`flushSync` taken out: three test files fail) shows the tests hold its one decision.
3. **`run-screen.tsx` as `copy`** (item 3): it stays `copy`. Its new effect (`run-screen.tsx:161-163`, `useEffect(() => { if (covering) document.documentElement.scrollTop = 0; }, [covering])`) reads one reactive value and lists it; it connects to nothing outside React (no listener, no subscription, no timer), so the rule "Efekty" asks for no cleanup function; and it synchronizes the page's scroll with a change of what is drawn, which may come from the clock as well as from a click, so it is no handler of a user event. `guidelines/coding-simulation-module.md` unchanged is right: its table holds a row for each file of its kind (listed against `git ls-files`), with `do not copy` at `loop.ts` and `skills.ts`.
4. **The foundation agent's choices** (item 4): D-43's sentence with the plaque after the list reads correctly and keeps eight `decision:` quotations valid; the dropped clause of D-407 is M1; D-40 is O1; the styleguide's two restatements follow D-43 (line 113 and line 25, the latter with M2).
5. **Unread material of the executors** (item 5): I read `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md` and `guidelines/testing.md` whole and judged the slices against them; besides the findings above, I found no departure (the tests' changes name their reason per "Changing an existing test", the new helper loads no jsdom, the new stylesheets hold no `outline` and no value in place of a token, as the invariant tests confirm).
6. **`.rehearsal-mark` in `maps-screen.css`, `trip-warning`, the camp classes, rules no file draws** (item 7): `.rehearsal-mark` belongs to Mapy, which alone draws it — right; `trip-warning` and the camp classes are Important 2; rules no file draws moved with the part their comment names, which the plan asked for.
7. **States not reached in the real game** (item 8): I did not repeat the real-game comparison. My own order check of the whole range (below) found no rule lost or added and no pair of rules whose order changed that one element carries; that covers the cascade for the states no slice reached, not the look of a state no one saw.

## The task, item by item

- To do 1: met. `git grep -n -e setQuestion -e setWindow` prints nothing; the screen (`RunScreenView`) and the panel (`EndQuestionSlot`) read the state through `useRunScreenSnapshot`; the panel of Programy gets no source (`programs-entry.ts` unchanged) and draws no question; `focus`, `focusQuestion`, `focusWindow` and `focusHeaderButton` stay (Out of scope).
- To do 2: met. Both tables list every file of their kind and no row lacks its file; the statuses are the audit's; the exemplars stay.
- To do 3: met, except Important 2. Eleven files directly in `src/browser/`, each with a `<link>` in `src/browser/index.html`; `scripts/static-files.mjs` copies them (the head's build has all thirteen `.css` files in `dist/public/`); the kitchen-sink page links `tokens.css`, `styles.css` and `kitchen-sink.css` alone.
- To do 4: met (`src/browser/view/email-status.ts:4-6`).
- To do 5: met, with the departure of Important 2 between the rule and the code.
- To do 6: met. `git grep -n "styles\.css"` at the head lists only places that name it for the controls, the menu, the focus rule, the kitchen-sink page and the order of the links.
- To do 7: met (D-407's example names the folding of the rule groups and the open trees of Wiedza).
- To do 8: met (D-43), with M2 and O1.
- *Settlements to record* rows 1 to 3: D-421, D-408's third sentence, D-407's third sentence — written; Important 2 is the departure of the code from row 1.
- Out of scope: kept (the focus methods stay; `tokens.css` and `kitchen-sink.css` unchanged).
- Questions 1 to 9 and the three carried answers: followed.

## Structure of the code the change leaves

`guidelines/coding.md` holds no rule `### Size of a function and a file`, so there is no size test and a finding of structure would be Minor. Sizes by `change_file_sizes.py`: `src/browser/styles.css` 3406 → 617; the largest new file is `src/browser/run-screen.css` (1459 lines), which an agent changing Przejście reads instead of the 3406 lines before; `run-screen-state.ts` 199 → 261 (the subscription), `program-panel.tsx` 798 → 821, `run-screen.tsx` 325 → 315, `run-entry.ts` 281 → 277. No code is left without a user (`setQuestion`, `setWindow`, `syncWindow`, `drawn` and `windowOpen` are gone with their callers) and I found no name that stopped being true. `NO_WINDOW` (`run-screen.tsx:52-59`) holds no question either, which its comment says. Nothing to report.

## Declined to judge

- The real look of each screen in a browser: not re-checked by me; the slices' comparisons and my order check stand for it (see item 7 above).
- The 142 warnings of `check_instructions.py`: warnings do not stop the gate; I did not compare them with the base.

## Checks

| Check | Where | Exit | Result |
|---|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | reviewed worktree (head) | 1 | 1 error, `tests/view/run-screen-state.test.mjs:309` (Important 1) |
| `python -B ../../../.the-way/elements/common/foundation_check.py` | worktree of the base | 0 | 0 errors |
| `python -B .the-way/instruction-files/check_instructions.py` | head | 0 | 0 error, 142 warn, 7 info |
| `python -B .the-way/task-cycle/change_file_sizes.py 7ba7a116 45f9b25c` | head | 0 | table under "Changed files" |
| `npm run build` | worktree of the head | 0 | |
| `node scripts/test-node-file.mjs tests/view/<name>.test.mjs` for `run-screen-state`, `run-screen`, `end-question`, `end-window-game`, `end-window`, `program-panel`, `previous-save`, `chronicle-game`, `uncaught-failure`, `world-area`, `run-header`, `rule-signs`, `scene`, `shared-controls` (after the build, as `npm test -- <file>` runs them) | worktree of the head | 0 each | all pass |
| `npm run typecheck` | worktree of the head | 0 | |
| `npx --no-install eslint --max-warnings 0` on the nine changed source files and the seven changed test files | worktree of the head | 0 | |
| `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/*.css src/browser/index.html` and the same sixteen files | worktree of the head | 0 | |
| `python -B scripts/test.py tests/invariants/<file>` for `test_browser_view_focus_outline`, `test_browser_view_token_values`, `test_application_build_output`, `test_application_build_kitchen_sink`, `test_cross_part_imports`, `test_browser_view_framework` | worktree of the head | 0 each | all pass |
| Order check of the whole range: slice 7's `order-check7.mjs` with the base's `styles.css` as the one "before" file, run on the head | reviewed worktree, read only | 0 | 444 rules and at-rules before and after, 0 in one and not the other; 4220 pairs whose order changed with equal specificity and a common property, all but 8 judged by the script; the 8 (`.chronicle-minute` against `.trip-warning`, seven scene rules against `.terrain-drawing .icon .icon-mask`) carried by no one element (`span` against `p`; the scene holds no terrain drawing) |
| Tables of kinds against `git ls-files src/browser/view` and `src/browser/sim` | head | — | no file without a row, no row without a file, in both |
| Kitchen-sink classes (`kitchen-sink.tsx`) against the eleven new stylesheets | head | — | only `.account-form .form > .button` in `account-card.css`, scoped under `.account-form`, which the page does not draw |
| Not run: the product's full gate (`npm test` without a file) | — | — | the handoff reserves it to the orchestrator |

The evidence of the order check and of the runs is kept in `.runs/task-cycles/porzadki-widoku-po-react/reports/review-whole-evidence/` (`order-check.mjs`, `order-report.txt`, `results.txt`, `run_tests.sh`, `foundation_check.txt`, `fc_base.txt`); `order-check.mjs` names `.runs/review-whole` as its directory, which no longer exists.

## Changed files (lines before → after)

| File | Before | After | Change |
|---|---|---|---|
| `foundations/decisions.md` | 11277 | 11292 | +15 |
| `guidelines/coding-browser-module.md` | 408 | 420 | +12 |
| `guidelines/styleguide-browser-view.md` | 1075 | 1104 | +29 |
| `src/browser/AGENTS.md` | 9 | 9 | +0 |
| `src/browser/account-card.css` | — | 92 | +92 |
| `src/browser/accounts-screen.css` | — | 105 | +105 |
| `src/browser/character-screen.css` | — | 99 | +99 |
| `src/browser/credits.css` | — | 45 | +45 |
| `src/browser/headquarters.css` | — | 193 | +193 |
| `src/browser/index.html` | 13 | 24 | +11 |
| `src/browser/knowledge-screen.css` | — | 102 | +102 |
| `src/browser/maps-screen.css` | — | 220 | +220 |
| `src/browser/program-panel.css` | — | 477 | +477 |
| `src/browser/programs-screen.css` | — | 55 | +55 |
| `src/browser/run-screen.css` | — | 1459 | +1459 |
| `src/browser/styles.css` | 3406 | 617 | −2789 |
| `src/browser/view/accounts-screen.tsx` | 391 | 391 | +0 |
| `src/browser/view/email-status.ts` | 46 | 46 | +0 |
| `src/browser/view/knowledge-screen.tsx` | 192 | 192 | +0 |
| `src/browser/view/program-panel.tsx` | 798 | 821 | +23 |
| `src/browser/view/rule-panel.tsx` | 574 | 574 | +0 |
| `src/browser/view/run-entry.ts` | 281 | 277 | −4 |
| `src/browser/view/run-screen-reading.ts` | — | 33 | +33 |
| `src/browser/view/run-screen-state.ts` | 199 | 261 | +62 |
| `src/browser/view/run-screen.tsx` | 325 | 315 | −10 |
| `src/browser/waiting-screen.css` | — | 18 | +18 |
| `tests/view/game-stylesheets.mjs` | — | 45 | +45 |
| `tests/view/rule-signs.test.mjs` | 263 | 261 | −2 |
| `tests/view/run-header.test.mjs` | 647 | 644 | −3 |
| `tests/view/run-screen-state.test.mjs` | 278 | 386 | +108 |
| `tests/view/run-screen.test.mjs` | 1040 | 1054 | +14 |
| `tests/view/scene.test.mjs` | 2739 | 2740 | +1 |
| `tests/view/world-area.test.mjs` | 1191 | 1189 | −2 |

33 files (13 added, 20 modified); 25152 lines before, 25560 after. No invariant test changed.

## Selection and reaches

- Parts touched: `browser-view`, `agent-workflow` (guidelines, `src/browser/AGENTS.md`), `product-foundation` (`foundations/decisions.md`, whose entries name `browser-view`). Part-map entries of the three read.
- Decision index: `decision_index.py` with the sections "Browser view: screens, navigation and their code", "Look of the browser view: styleguide, controls, pictures and fonts", "Code rules, exemplars and static checks", "Screen of a map run and the end-of-run window", "Testing discipline", the three parts, and `--decision` for the decisions the task names and those the `decision:` lines of the changed tests hold: 132 listed in full, 186 by heading; I read the index whole and ran through the headings (none outside the sections pointed to a bearing beyond those opened).
- Guidelines read whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`.
- Reaches beyond the selection: `guidelines/coding-simulation-module.md`, its table "Files of this kind" only, to check To do 2 for the simulation's table; slice 7's order script, adapted, to check the cascade over the whole range; `src/browser/view/state-store.ts:55-212` and `src/browser/view/game-view.ts:170-310`, to check that every change of the game state reaches `taken` (it does: `take` is the one place, and `onTaken` calls `screenState.taken` first); `src/browser/view/scene.tsx:720-770`, to see where `effectEnded` is called from (animation handlers, not a render or an effect).

## Unread material

- Decisions read whole: 9 of the index (D-407, D-408, D-421, D-43 through the diff, which shows each from its heading to its *Rejected*; D-265, D-267, D-47, D-28, D-371). Bearing on the change and read by their binding sentences in the index only: D-35 and D-36 (the exemplars stay; their rows unchanged), D-40 (O1), D-269, D-416, D-311, D-368, D-324, D-173 and D-370 (quoted by changed cases of `run-screen-state.test.mjs` and `run-screen.test.mjs`, whose quotations other than line 309 the foundation check accepts), and the decisions the `decision:` lines of `scene.test.mjs`, `world-area.test.mjs`, `run-header.test.mjs` and `rule-signs.test.mjs` hold (those files changed only where they read the stylesheets).
- Guideline files: none left unread among those selected.
- `foundations/glossary.md` and the-way's glossary: not read (no term the change uses is new or used in another meaning, by my reading of the diff).
- `foundations/invariants.md`: not read whole; the invariants `browser-view-focus-outline` and `browser-view-token-values` judged by their tests, which pass, and line 470.
- Executors' reports: slice 2 and the foundation agent's read whole; slices 1, 3, 6 and 7 by search and in part; slices 4, 5 and 8 by their status lines only. `plan-size.md` and `.the-way/task-cycle/change/ui_check.md` not read; no screenshot was taken.

## Searches not found or unclear

- Slice 7's report (its *Working copies*) names its kept evidence at `.runs\task-cycles\porzadki-widoku-po-react\reports\slice-7-executor-evidence\`, under the main checkout; no such directory exists there. The evidence stands in the worktree's `.runs/task-cycles/porzadki-widoku-po-react/reports/slice-7-executor-evidence/`. A wrong path in the report, nothing lost.
- `check_instructions.py` reported 141 warnings to the foundation agent and 142 at the head; I did not find which warning is new.

## Working copies

- `.runs\review-whole\head` (worktree of `45f9b25c`) and `…\.runs\review-whole\base` (worktree of `7ba7a116`), each with a junction `node_modules` to the reviewed worktree's `node_modules`: the junctions were unlinked first (`rmdir`, the reviewed worktree's `node_modules` intact), then both worktrees removed with `git worktree remove --force` and `git worktree prune`.
- `.runs\review-whole\` (the decision index, the outputs, the scripts): removed. What the report needs stays in `.runs/task-cycles/porzadki-widoku-po-react/reports/review-whole-evidence/`.
- The reviewed worktree: unchanged (`git status --short` empty, HEAD `45f9b25c`).
