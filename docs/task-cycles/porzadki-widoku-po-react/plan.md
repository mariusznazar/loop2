# Plan — loop2: porządki widoku po przejściu na React

- Task: `.runs/task-cycles/porzadki-widoku-po-react/task.md`
- Spec: none
- Base: `7ba7a11669b391e61519350853f4fb60275bca16`

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| 1. A new decision: `src/browser/styles.css` stays the shared file of the game's look — the base rules, the one `:focus-visible` rule, the menu bar, the rows of sentences, the shared controls and the rules of what the kitchen-sink page draws (`terrain-drawing`, `tile-list`, `form`, `account-menu-block`) — and each screen and each part several screens use has a stylesheet of its own, a `.css` file directly in `src/browser/`, given to the player by a `<link>` of its own in `src/browser/index.html`, with no change of the build; the kitchen-sink page links `styles.css` and `kitchen-sink.css` alone. Its relations weigh D-265, D-47 and the invariant `browser-view-focus-outline`, which stay true unchanged, and D-28, under which the rule stands in the styleguide and no guidelines of their own exist for stylesheets | decision | Settlements to record, row 1 (questions 2, 8, 9; their *Not chosen* and that of question 5 of the earlier refinement, variant D6 a) | Slices 6, 7, 8 |
| 2. D-408, changed: a new screen of the game also adds its stylesheet file and its `<link>`; its *Verification* example of a new screen follows | decision | Settlements to record, row 2 (question 3) | Slice 8 |
| 3. D-407, changed: the screen Przejście and its program panel read the question „Zapisać, odrzucić, wrócić?” and the end-of-run window from the state of the screen Przejście, and no method of the game view tells them to show either; its *Verification* ("which draws each only while the game view tells it to") changes with it | decision | Settlements to record, row 3 (question 4; question 6 of the earlier refinement, variant c rejected) | Slices 1, 2 |
| 4. D-407, *Verification*: the example of compliance "a new screen … whose factory receives … the memory of its unfolded trees, shared with another screen" shows a shape D-407 allows and that does not contradict the screen Wiedza, whose open trees live in its component (D-416); written in the same change of D-407 as entry 3 | decision | To do 7 | none (Slices 1 and 2 read D-407 after it) |
| 5. D-43, changed: its binding sentence that lists where an icon with no text beside it takes `text-strong` — the badge over the mage's head, the plaque of the flying icon, the drawing of the map — covers the plaque of a discovery in the scene too, or says why not, as the stylesheet does today (at the base `.scene-discovery-plaque` sets `color: var(--text-strong)` beside `.scene-flight-plaque`, `src/browser/styles.css:2281-2288`) | decision | To do 8 | Slice 8 |

No invariant, glossary term or part-map entry is written: each new stylesheet falls under `src/browser/*.css` of `browser-view`, and each new test helper under `tests/view/**` of the same part.

## Slices

### Slice 1 — The state of the screen Przejście readable from React

- **Goal:** The state of the screen Przejście (`src/browser/view/run-screen-state.ts`) becomes readable from React as the page's memory of folding is (`Folding` and `createFolding` in `src/browser/view/program-panel.tsx`, lines 94-130 at the base): `RunScreenState` gains a `subscribe(listener)` that returns the way to stop, and a snapshot of what stands — the question, or null, and whether the window is shown, as `windowShown()` gives it — that stays the same value while neither changes, so that `useSyncExternalStore` can read it. It calls every listener after each change of either, whichever of its methods made it (`taken`, `entered`, `left`, `ask`, `closeQuestion`, `forgetQuestion`, `openWindow`, `closeWindow`, `effectEnded`), a change of whether the window is shown that a result of the store brings through `taken` included; a call that changes neither calls no listener. The module still calls no screen, no act of the store and no registry, and its other methods keep what they return and do. Its comment says what holds now. `tests/view/run-screen-state.test.mjs` gains the cases of the subscription, written first and seen failing: a listener called after a change of the question and after a change of whether the window is shown, by a method of the state and by a result taken, the snapshot unchanged while nothing changes, no call for a method that changes nothing, and no call after the stop. Nothing reads the subscription yet: Slice 2 makes the screen and its panel read it, so no other file and no other test changes, and every test stays green.
- **Change:** `src/browser/view/run-screen-state.ts` · `tests/view/run-screen-state.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:25-27` To do, item 1 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:61-65` Questions to settle, question 4 ·
  Foundation entries rows 3 and 4 (D-407) ·
  `foundations/decisions.md:4474-4490` D-407 · `foundations/decisions.md:10295-10313` D-371 ·
  `foundations/decisions.md:9957-9977` D-324 ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/program-panel.tsx:94-130` the memory of folding ·
  `src/browser/view/game-view.ts:175-300` the wiring of the store, the state of the screen and the entries ·
  `src/browser/view/state-store.ts`
- **Model:** cheaper — the pattern of the memory of folding is applied to one module, with its tests
- **Risk:** none
- **Checks:** `npm test -- tests/view/run-screen-state.test.mjs` (the new cases first, failing) ·
  `npm test -- tests/view/end-question.test.mjs` · `npm test -- tests/view/end-window-game.test.mjs` ·
  `npm run typecheck` · `npx --no-install eslint --max-warnings 0` on the two files ·
  `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on the two files
- **Depends on:** Foundation entries rows 3 and 4

### Slice 2 — Przejście and its program panel read the question and the window from the state of the screen

- **Goal:** The screen Przejście (`src/browser/view/run-screen.tsx`) and its program panel (`src/browser/view/program-panel.tsx`, mode `run`) draw the question „Zapisać, odrzucić, wrócić?” and the end-of-run window from the state of the screen Przejście (`src/browser/view/run-screen-state.ts`), which each of them reads itself through the subscription Slice 1 gave it (`subscribe` and the snapshot of the question and of whether the window is shown) and `useSyncExternalStore`. `setQuestion` and `setWindow` go from the type `RunScreen` and the object `createRunScreen` returns, `setQuestion` goes from `ProgramPanel`, from `RunScreenPanel` and from the panel's object, and every call of them goes from `src/browser/view/run-entry.ts`; after the slice `git grep -n -e setQuestion -e setWindow` prints nothing. The panel gets the state of the screen and the answers of the question (`EndQuestionControls`) when the entry creates it; the panel of Programy, created in `src/browser/view/programs-entry.ts` by the call that stands there (any parameter added to `createProgramPanel` is optional), gets neither and never draws the question. The player sees the question and the window at the same moments as today: where the entry moves the focus right after a change — `focusQuestion` after the question is asked, `focusWindow`, `focusHeaderButton` — the question or the window already stands in the document when the focus moves, as the synchronous drawing with `flushSync` gives it today. The focus methods `focus`, `focusQuestion`, `focusWindow` and `focusHeaderButton` stay (the task's *Out of scope*). The module comments of the three source files say what holds now, with no word of the old way. In `tests/view/run-screen.test.mjs` the cases that told the screen with `setQuestion` or `setWindow` (22 lines at the base, the helper `wiredScreen` among them) change the state of the screen the screen reads — a real `createRunScreenState` over the case's game — and keep what each case checks; by the rule "Changing an existing test" of `guidelines/testing.md` the reason is the boundary of the screen that To do 1 of the task changes, and the slice's report names it for each changed case. Start from a case of `tests/view/run-screen.test.mjs` changed to show the question by the state of the screen alone, and see it fail before the screen reads the state. The tests that show the question and the window through the real entry and the game view — `tests/view/end-question.test.mjs` and `tests/view/end-window-game.test.mjs` — and every other test stay unchanged and green: they are the evidence that the moments did not change. In the real game (`.claude/skills/loop2-play/SKILL.md` says how, with Playwright CLI): „Zakończ” of a map run whose copy holds an unsaved change shows the question in the program panel with the focus on its first answer, „Wróć” takes it away, and the end-of-run window opens over the screen after a death or a completion and closes on „✕”; where a state cannot be reached at the local start, the report says so.
- **Change:** `src/browser/view/run-screen.tsx` · `src/browser/view/run-entry.ts` ·
  `src/browser/view/program-panel.tsx` · `tests/view/run-screen.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:25-27` To do, item 1 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:61-65` Questions to settle, question 4 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:113-115` Context, the calls of setQuestion and setWindow ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:154-156` Out of scope ·
  Foundation entries rows 3 and 4 (D-407) ·
  `foundations/decisions.md:4474-4490` D-407 · `foundations/decisions.md:4156-4184` D-267 ·
  `foundations/decisions.md:7920-7951` D-173 · `foundations/decisions.md:9957-9977` D-324 ·
  `foundations/decisions.md:10211-10245` D-368 · `foundations/decisions.md:10269-10294` D-370 ·
  `foundations/decisions.md:10295-10313` D-371 ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `src/browser/view/run-screen-state.ts` · `src/browser/view/end-question.tsx` ·
  `src/browser/view/programs-entry.ts:300-345` the panel of Programy
- **Model:** same — two React roots learn of a state that lives outside React, and the focus moves that follow a change depend on when they draw
- **Risk:** none
- **Checks:** `npm test -- tests/view/run-screen.test.mjs` · `npm test -- tests/view/run-screen-state.test.mjs` ·
  `npm test -- tests/view/end-question.test.mjs` · `npm test -- tests/view/end-window-game.test.mjs` ·
  `npm test -- tests/view/end-window.test.mjs` · `npm test -- tests/view/program-panel.test.mjs` ·
  `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/view/chronicle-game.test.mjs` ·
  `npm test -- tests/view/uncaught-failure.test.mjs` ·
  `npm run typecheck` · `npx --no-install eslint --max-warnings 0` on the four files ·
  `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on the four files ·
  `git grep -n -e setQuestion -e setWindow` printing nothing · the check in the real game above
- **Depends on:** Slice 1 · Foundation entries rows 3 and 4

### Slice 3 — The tables of files of the two kinds after the audit

- **Goal:** The tables „Files of this kind” of `guidelines/coding-browser-module.md` and `guidelines/coding-simulation-module.md` hold one row for each file of their kind at this slice's head — in the first, each file git tracks under `src/browser/view/`, `controls/` included; in the second, each file git tracks directly under `src/browser/sim/` other than `saved-game.ts` (kind `saved-game`), the files of `src/browser/sim/data/` being kind `content-data` — each with the status of the task's audit (To do 2, question 6). The exemplars stay: `src/browser/view/account-card.tsx` (D-36) and `src/browser/sim/game.ts` (D-35). In the first table `do not copy` stands at `game-view.ts`, `headquarters-entry.ts`, `programs-entry.ts` and `rule-list.tsx`, and `copy` at every other file the task's audit judged: `app.ts`, `body-row.ts`, `combat-line.ts`, `email-confirmation.ts`, `game-saver.ts`, `program-editor.ts`, `status-row.ts`, `tile-list.ts`, `trip-editor.ts` and `trip-lines.ts` go from `do not copy` to `copy`, `rule-list.tsx` from `copy` to `do not copy`, and `camp-picture.ts`, `camp.tsx`, `end-question.tsx`, `header-rows.tsx`, `page-sentences.tsx`, `previous-save-lines.ts` and `waiting-screen.tsx` get rows `copy`. In the second, `do not copy` stands at `loop.ts` and `skills.ts` and `copy` at every other file, as today. The task's audit was made on `e125db89`; the base is later, so the slice also does four things. (a) It finds again in the current files each place that gives `do not copy` — at the base `src/browser/view/game-view.ts:179`, `src/browser/view/headquarters-entry.ts:50`, `src/browser/view/programs-entry.ts:317`, `src/browser/view/rule-list.tsx:220-224`, `startLoop` in `src/browser/sim/loop.ts` and `buyBranch` in `src/browser/sim/skills.ts` — and confirms that each still breaks the rule the task names; where one no longer does, it stops and reports. (b) It compares the four files of the kind the audit did not see, which the screen Wiedza added — `src/browser/view/counted-name.ts`, `src/browser/view/knowledge-entry.ts`, `src/browser/view/knowledge-lines.ts` and `src/browser/view/knowledge-screen.tsx` — with the rules of the kind as the audit compared each file: every rule under "Rules" of `guidelines/coding-browser-module.md` and of `guidelines/coding.md`, read against the file, with no run of a linter; each gets `copy` where it breaks none, and `do not copy` otherwise. (c) It reads the changes made since the audit to the files of the first table — those between `e125db89` and the base (`credit-lines.ts`, `credits.ts`, `game-view.ts`, `map-lines.ts`, `maps-screen.tsx`, `menu-bar.tsx`, `program-editor.ts`, `scene-picture.ts`, `screen-address.ts`, with `git diff e125db89 7ba7a116 -- <file>`) and those Slices 1 and 2 made (`git diff 7ba7a116 HEAD -- src/browser/view/`) — and keeps the task's status unless a change breaks a rule, where the file gets `do not copy`. (d) It lists the files of each kind against the rows at its head: no file without a row and no row without a file (at the base only the eleven files named above lacked a row, and no row lacked its file). Each table keeps the template's three columns — File, Status and Decision, `—` on every row but the exemplar's — and its rows in the order of the path; no table takes the place of a `do not copy`: the place of each `do not copy` (file and line, with the rule it breaks) and the results of (a) to (d) stand in the slice's report. Nothing else of the two files changes.
- **Change:** `guidelines/coding-browser-module.md` · `guidelines/coding-simulation-module.md`
- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:28-35` To do, item 2 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:45-50` Questions to settle, question 1 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:71-75` Questions to settle, question 6 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:116-119` Context, the files without a row and the rule of a file added after the audit ·
  `.the-way/product-guidelines/coding/template.md:255-270` the form of "Files of this kind" ·
  `.the-way/product-guidelines/coding/kinds.md:1-29` Kinds, the statuses copy and do not copy ·
  `guidelines/coding.md` ·
  `foundations/decisions.md:519-533` D-35 · `foundations/decisions.md:534-548` D-36 ·
  `foundations/decisions.md:4108-4155` D-265 · `foundations/decisions.md:4474-4490` D-407 ·
  `foundations/decisions.md:1781-1850` D-252 ·
  `foundations/part_map.md:123-140` agent-workflow ·
  `src/browser/view/counted-name.ts` · `src/browser/view/knowledge-entry.ts` ·
  `src/browser/view/knowledge-lines.ts` · `src/browser/view/knowledge-screen.tsx` ·
  `src/browser/view/game-view.ts:170-190` · `src/browser/view/headquarters-entry.ts:44-60` ·
  `src/browser/view/programs-entry.ts:310-330` · `src/browser/view/rule-list.tsx:210-232` ·
  `src/browser/sim/loop.ts:95-135` · `src/browser/sim/skills.ts:165-190`
- **Model:** same — orchestrator's change in the plan's review: the four new files are judged against every rule of two guideline files, and a judgment missed here leaves a `copy` nobody evaluated, which is the very reason of the task; the rest is settled by the task
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` · the listing of (d), run at the slice's head and pasted into the report
- **Depends on:** Slice 2

### Slice 4 — Tests read the game's stylesheets as the page links them

- **Goal:** A test helper module `tests/view/game-stylesheets.mjs` gives the text of the game's stylesheets as the game's page links them: it reads `src/browser/index.html`, takes the `href` of each `<link rel="stylesheet">` in the order they stand, leaves out `/tokens.css`, the file of design tokens, which no case reads today, reads each named file from `src/browser/` and joins their texts in that order; it may also give them one by one. At the base it gives the text of `src/browser/styles.css` alone, so no case sees anything other than today. It imports no jsdom and is no `*.test.mjs` file. `tests/view/world-area.test.mjs`, `tests/view/run-header.test.mjs` and `tests/view/rule-signs.test.mjs` read the stylesheet through it instead of naming `src/browser/styles.css`, and their comments say "the game's stylesheets" where they named the one file; the check of `rule-signs.test.mjs` of the order of the rules then reads the order across the files as the cascade reads it. No expectation changes: by the rule "Changing an existing test" of `guidelines/testing.md` the reason is To do 3 and 6 of the task — the stylesheet is split into files the page links, and a test has to read a rule where it stands after the split — and the slice's report says so for each file. After this slice, Slice 5 points `tests/view/scene.test.mjs` at the helper, and Slices 6 and 7 split the stylesheet with no change of a test.
- **Change:** `tests/view/game-stylesheets.mjs` · `tests/view/world-area.test.mjs` ·
  `tests/view/run-header.test.mjs` · `tests/view/rule-signs.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:36-36` To do, item 3 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:39-39` To do, item 6 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:120-122` Context, the build, the links and the files that name the stylesheet ·
  Foundation entries row 1 ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/index.html` · `src/browser/kitchen-sink/index.html` · `scripts/static-files.mjs`
- **Model:** cheaper — a helper of a few lines and three reads pointed at it, with no expectation changed
- **Risk:** none
- **Checks:** `npm test -- tests/view/world-area.test.mjs` · `npm test -- tests/view/run-header.test.mjs` ·
  `npm test -- tests/view/rule-signs.test.mjs` ·
  `npx --no-install eslint --max-warnings 0` on the four files ·
  `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on the four files
- **Depends on:** none

### Slice 5 — The test of the scene reads the game's stylesheets as the page links them

- **Goal:** `tests/view/scene.test.mjs` reads the stylesheet through the helper tests/view/game-stylesheets.mjs, which Slice 4 created (a few lines: it reads the `<link rel="stylesheet">` of `src/browser/index.html` in their order, leaves out `/tokens.css` and joins the texts), instead of naming `src/browser/styles.css` — its constant of the stylesheet's text and the cases that lay that text on their page or search it (at the base `STYLES` at lines 30-33, used at lines 347 and 2237) — and its comments say "the game's stylesheets" where they named the one file. No expectation changes: by the rule "Changing an existing test" the reason is To do 3 and 6 of the task, and the slice's report says so. At the base the helper gives the text of `styles.css` alone, so every case sees what it sees today.
- **Change:** `tests/view/scene.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:36-36` To do, item 3 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:39-39` To do, item 6 ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/index.html`
- **Model:** cheaper — one read of a large test pointed at an existing helper
- **Risk:** none
- **Checks:** `npm test -- tests/view/scene.test.mjs` ·
  `npx --no-install eslint --max-warnings 0 tests/view/scene.test.mjs` ·
  `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore tests/view/scene.test.mjs`
- **Depends on:** Slice 4

### Slice 6 — The stylesheet split, part 1: Przejście, the program panel and Programy

- **Goal:** The rules of the screen Przejście, of the program panel, which Programy and Przejście both use, and of the screen Programy move out of `src/browser/styles.css` into three files directly in `src/browser/`: `run-screen.css` (Przejście: the grid of its areas, the area under the drawing with the tabs and the chronicle, its header with the bar of the solving condition, the band of a discovery, the question „Zapisać, odrzucić, wrócić?”, the end-of-run window, the rows „Teraz” and „Potem”, the body row, the world area with the scene — its layers, effects, frost, `@property --tint` and its `@keyframes` — and `.run-practice`), `program-panel.css` (the list „Program:” and its actions, the name field, the copy's section, the rule list, the rule panel, the drop line and the trip plan the panel holds) and `programs-screen.css` (what only Programy draws: the list of programs and the confirmation of „Zacznij od zera”). `src/browser/index.html` links each with a `<link rel="stylesheet">` of its own after `/styles.css`; the build does not change (`scripts/static-files.mjs` already copies every `.css` file directly in `src/browser/` into both builds) and the kitchen-sink page keeps linking `styles.css` and `kitchen-sink.css` alone. In `styles.css` stays what is shared, as the task's To do 3 and Foundation entries row 1 give it: the base rules, the one rule `:focus-visible`, the header with the menu bar and the menu „Konto”, the rows of sentences, the place of the screens and their common layout (`.app-main`, `.screen`, `.screen-area` and the rule that gives Programy, Mapy and Wiedza their columns, with its `@media`), the shared controls with the icon mask and the forms, and the rules of what the kitchen-sink page draws (`terrain-drawing`, `tile-list`, `form`, `account-menu-block`, and every other class `src/browser/kitchen-sink/kitchen-sink.tsx` gives an element). Which file a rule goes to is read from where its classes are drawn (a search of `src/browser/` for each class), not from where it stands today: a rule whose classes only Przejście draws goes to `run-screen.css` wherever it stands, a rule whose classes the panel draws goes to `program-panel.css`; a rule that reaches classes of two of these and of no shared part goes to the file of the part they share, and the report names it; a rule whose classes no file draws moves with the part its comment names and the report names it, and nothing is deleted. The rules of the other screens stay in `styles.css` for Slice 7. No selector and no declaration changes: rules move whole, with the comments that stand over them; each new file opens with a comment saying what screen or part it holds, and the head comment of `styles.css` says what it holds now. The cascade that decides which rule wins stays as it is: the three files are linked in the order in which their first rule stands in the base `styles.css`, and a one-off script in the slice's directory for working copies compares the concatenation, in `<link>` order, of the stylesheets the game's page links before the slice with the same after it — no rule may be in one and not the other (text compared with its white space normalised, comments aside), and the script lists every pair of style rules whose order changed, whose selectors have the same specificity and that declare a common property (a shorthand and its longhands count as common) under the same or overlapping conditions; each pair is judged in the report — no element the game draws carries both selectors, named with the files that draw their classes, or the winner of the base is kept — and the same script shows that no moved rule reaches an element of the kitchen-sink page. The player sees each screen as before the split: before changing any file, the slice starts the game at its head with `npm run local` and, with Playwright CLI as `.claude/skills/loop2-play/SKILL.md` gives (Playwright MCP only from a session that started in the worktree, D-420), records for each state below the computed style of every element of the page and of its `::before` and `::after`, keyed by the element's place in the tree and its classes, into a file in its directory for working copies; after the change it records the same states again and compares. Every difference is either fixed before the slice ends or named and explained as nothing the player sees (an animation in its course, the text of the clock). States: Przejście of a paused map run with „Kronika” and with „Teren” picked, with a rule panel open, with the band of a discovery, with the question standing, and with the end-of-run window after a death or a completion; Programy with a program shown; the kitchen-sink page (`npm run kitchen-sink`). A state the local start cannot reach is named in the report as unchecked in the game, its rules covered by the script alone. The new files and `index.html` stand as Prettier leaves them, and they hold no `outline` and no value in place of a design token.
- **Change:** `src/browser/styles.css` · `src/browser/index.html` · `src/browser/run-screen.css` ·
  `src/browser/program-panel.css` · `src/browser/programs-screen.css`
- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:36-36` To do, item 3 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:51-55` Questions to settle, question 2 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:81-91` Questions to settle, questions 8 and 9 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:120-123` Context, the build, the links, the files that name the stylesheet and the invariant of focus ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:154-157` Out of scope ·
  Foundation entries row 1 ·
  `foundations/decisions.md:4108-4155` D-265 · `foundations/decisions.md:4743-4757` D-47 ·
  `foundations/decisions.md:4683-4697` D-43 · `foundations/decisions.md:414-428` D-28 ·
  `foundations/decisions.md:4713-4727` D-45 · `foundations/decisions.md:474-488` D-32 ·
  `foundations/decisions.md:1444-1509` D-417 · `foundations/decisions.md:1540-1554` D-420 ·
  `foundations/invariants.md:438-446` prettier-source-format ·
  `foundations/invariants.md:458-466` browser-view-token-values ·
  `foundations/invariants.md:468-476` browser-view-focus-outline ·
  `foundations/invariants.md:498-506` application-build-kitchen-sink ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` ·
  `scripts/static-files.mjs` · `src/browser/kitchen-sink/index.html`
- **Model:** same — a move across a stylesheet of 3400 lines whose correctness rests on keeping the cascade, judged by a script of the slice's own and a check in the real game
- **Risk:** none
- **Checks:** the order script above, its list judged in the report · the comparison in the real game above ·
  `npm test -- tests/view/scene.test.mjs` · `npm test -- tests/view/world-area.test.mjs` ·
  `npm test -- tests/view/run-header.test.mjs` · `npm test -- tests/view/rule-signs.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_application_build_output.py` ·
  `npm test -- tests/invariants/test_application_build_kitchen_sink.py` ·
  `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/*.css src/browser/index.html`
- **Depends on:** Slice 5 · Foundation entries row 1

### Slice 7 — The stylesheet split, part 2: the other screens and the credits

- **Goal:** The rules of every other screen move out of `src/browser/styles.css` into files of their own directly in `src/browser/`, and those of the credits, which the login card and Siedziba both show, into a file of their own: `headquarters.css` (Siedziba: the camp, its sections, the team, the chest, the report of earning loops, the creation of a character), `character-screen.css` (Postać), `maps-screen.css` (Mapy: the list of maps, the card of a map, the section „Kto idzie”), `knowledge-screen.css` (Wiedza: every rule of the classes `knowledge-*`, added at the end of `styles.css` by the screen Wiedza after the task's numbers were taken, goes here as every other screen's rules go to its file), `account-card.css` (the screen of the login card and the card), `waiting-screen.css` (the waiting screen, `session-check`), `accounts-screen.css` (the list of accounts, `#/konta`) and `credits.css` (the folded credits, the rules naming `.account-card` and `.headquarters` beside `.credits` included). `src/browser/index.html` links each with a `<link rel="stylesheet">` of its own; all the screen files stand after `/styles.css`, in the order in which their first rule stood in the base `styles.css` of the task (`7ba7a116`), the three files Slice 6 linked keeping their places in that order. The build does not change and the kitchen-sink page keeps linking `styles.css` and `kitchen-sink.css` alone. What stays in `styles.css` is the shared part Slice 6 left there: the base rules, the one rule `:focus-visible`, the header with the menu bar and the menu „Konto”, the rows of sentences, the place of the screens and their common layout (`.app-main`, `.screen`, `.screen-area` and the rule that gives Programy, Mapy and Wiedza their columns, with its `@media`), the shared controls with the icon mask and the forms, and the rules of what the kitchen-sink page draws (`terrain-drawing`, `tile-list`, `form`, `account-menu-block`, and every other class `src/browser/kitchen-sink/kitchen-sink.tsx` gives an element). Which file a rule goes to is read from where its classes are drawn (a search of `src/browser/` for each class), not from where it stands; a rule that reaches classes of two screens and of no shared part goes to the file of the part they share or stays in `styles.css`, and the report names it; a rule whose classes no file draws moves with the screen its comment names and the report names it, and nothing is deleted. No selector and no declaration changes: rules move whole, with the comments over them; each new file opens with a comment saying what it holds, and the head comment of `styles.css` says what it holds now. The cascade stays as it is, checked as Slice 6 checked it: a one-off script in the slice's directory for working copies compares the concatenation, in `<link>` order, of the stylesheets the game's page links before this slice with the same after it — no rule in one and not the other (white space normalised, comments aside), and every pair of style rules whose order changed, whose selectors have the same specificity and that declare a common property (a shorthand and its longhands count as common) under the same or overlapping conditions is listed and judged in the report — and shows that no moved rule reaches an element of the kitchen-sink page. The player sees each screen as before: before changing any file, the slice starts the game at its head with `npm run local` and, with Playwright CLI as `.claude/skills/loop2-play/SKILL.md` gives (Playwright MCP only from a session that started in the worktree, D-420), records for each state below the computed style of every element and of its `::before` and `::after`, keyed by the element's place in the tree and its classes, into a file in its directory for working copies, then records the same states after the change and compares; every difference is fixed or named and explained as nothing the player sees. States: the login card in „Zaloguj się”, „Załóż konto” and „Nie pamiętam hasła”, with its credits opened; Siedziba with a character, its camp and its credits opened; Postać; Mapy before a pick and with the card of a map; Wiedza with a tree opened; the list of accounts where the local start can give an account the owner role; the waiting screen where it can be held; the kitchen-sink page. A state the local start cannot reach is named in the report as unchecked in the game, its rules covered by the script alone. The new files and `index.html` stand as Prettier leaves them, with no `outline` and no value in place of a design token. The files Slice 6 made, `src/browser/run-screen.css`, `src/browser/program-panel.css` and `src/browser/programs-screen.css`, show the form a file takes and do not change.
- **Change:** `src/browser/styles.css` · `src/browser/index.html` · `src/browser/headquarters.css` ·
  `src/browser/character-screen.css` · `src/browser/maps-screen.css` · `src/browser/knowledge-screen.css` ·
  `src/browser/account-card.css` · `src/browser/waiting-screen.css` · `src/browser/accounts-screen.css` ·
  `src/browser/credits.css`
- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:36-36` To do, item 3 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:51-55` Questions to settle, question 2 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:56-60` Questions to settle, question 3 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:87-91` Questions to settle, question 9 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:120-123` Context, the build, the links, the files that name the stylesheet and the invariant of focus ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:154-157` Out of scope ·
  Foundation entries row 1 ·
  `foundations/decisions.md:4108-4155` D-265 · `foundations/decisions.md:4743-4757` D-47 ·
  `foundations/decisions.md:4683-4697` D-43 · `foundations/decisions.md:414-428` D-28 ·
  `foundations/decisions.md:4713-4727` D-45 · `foundations/decisions.md:474-488` D-32 ·
  `foundations/decisions.md:1444-1509` D-417 · `foundations/decisions.md:1540-1554` D-420 ·
  `foundations/invariants.md:438-446` prettier-source-format ·
  `foundations/invariants.md:458-466` browser-view-token-values ·
  `foundations/invariants.md:468-476` browser-view-focus-outline ·
  `foundations/invariants.md:498-506` application-build-kitchen-sink ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` ·
  `scripts/static-files.mjs` · `src/browser/kitchen-sink/index.html`
- **Model:** same — orchestrator's change in the plan's review: the slice runs the same order script and the same comparison in the real game as Slice 6 over eight new files, and a missed order shows only when those checks are carried out with care
- **Risk:** none
- **Checks:** the order script above, its list judged in the report · the comparison in the real game above ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_application_build_output.py` ·
  `npm test -- tests/invariants/test_application_build_kitchen_sink.py` ·
  `npm test -- tests/view/world-area.test.mjs` · `npm test -- tests/view/scene.test.mjs` ·
  `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/*.css src/browser/index.html`
- **Depends on:** Slice 6 · Foundation entries row 1

### Slice 8 — The rule of the stylesheets in the styleguide, and the places that name `styles.css`

- **Goal:** `guidelines/styleguide-browser-view.md` gains a rule, in the form of its other rules (*Decision* naming the decision of Foundation entries row 1, D-408 and D-28; *Invariant* none; *Good*; *Bad*; then how to apply it, in Polish as the file is), that each screen and each part several screens use has a stylesheet of its own, a `.css` file directly in `src/browser/` with a `<link>` of its own in `src/browser/index.html`, and that a new screen adds both; that `src/browser/styles.css` keeps what is shared — the base rules, the one rule `:focus-visible`, the menu bar, the rows of sentences, the shared controls and what the kitchen-sink page draws — and that the kitchen-sink page links `styles.css` and `kitchen-sink.css` alone. The rule stands in the styleguide because D-28 puts the rules of the view's stylesheets there and allows no guidelines of their own for stylesheets (To do 5). Every place of the styleguide that names `src/browser/styles.css` as the place of rules that now stand elsewhere names the file where they stand — at the base lines 126, 134, 679, 708, 727, 743, 756, 773, 819, 838, 907 and 921, the scene's and the end-of-run window's rules now in `src/browser/run-screen.css` — while the place of the rule `:focus-visible` (line 149) and the look of the shared controls stay in `styles.css` (To do 6). The styleguide's restatement of where an icon with no text beside it takes `text-strong` (rule "No value in place of a design token", base line 113) follows D-43 as Foundation entries row 5 writes it. `src/browser/AGENTS.md` (its rule of design tokens, which sends a class's rule to `src/browser/styles.css`) names the stylesheet of the screen or part, or `styles.css` for what is shared. The comments that name `styles.css` for a screen's rules name the file where they stand: `src/browser/view/accounts-screen.tsx` (line 20 at the base), `src/browser/view/knowledge-screen.tsx` (line 17) and `src/browser/view/rule-panel.tsx` (line 99, the class `two-columns`, now in `src/browser/program-panel.css`). The comment of `src/browser/view/email-status.ts` that says the kitchen-sink page "reaches no React file" says what is true since the page holds React (rule "Strona wszystkich stanów z Reactem" of `guidelines/coding-browser-module.md`, D-269): the menu „Konto” and the kitchen-sink page write the same words from this module (To do 4). The comments of the shared controls (`src/browser/view/controls/react-*.tsx`), of `src/browser/kitchen-sink/kitchen-sink.tsx`, `src/browser/kitchen-sink/kitchen-sink.css` and `tests/view/shared-controls.test.mjs` name `styles.css` for the controls and the menu, which stay there, and do not change. After the slice, `git grep -n "styles\.css"` lists no place that names `styles.css` for a rule that stands in another file; the slice's report pastes that listing.
- **Change:** `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/email-status.ts` · `src/browser/view/accounts-screen.tsx` ·
  `src/browser/view/knowledge-screen.tsx` · `src/browser/view/rule-panel.tsx`
- **Read:** `.runs/task-cycles/porzadki-widoku-po-react/task.md:36-41` To do, items 3 to 8 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:56-60` Questions to settle, question 3 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:76-80` Questions to settle, question 7 ·
  `.runs/task-cycles/porzadki-widoku-po-react/task.md:134-142` Decisions in play ·
  Foundation entries rows 1, 2 and 5 ·
  `foundations/decisions.md:414-428` D-28 · `foundations/decisions.md:4491-4505` D-408 ·
  `foundations/decisions.md:4683-4697` D-43 · `foundations/decisions.md:4185-4217` D-269 ·
  `foundations/decisions.md:4108-4155` D-265 · `foundations/decisions.md:4743-4757` D-47 ·
  `foundations/part_map.md:3-28` browser-view · `foundations/part_map.md:123-140` agent-workflow ·
  `.the-way/product-guidelines/template.md:39-133` the form of guidelines and of a rule ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `src/browser/index.html`
- **Model:** same — orchestrator's change in the plan's review: the slice writes a rule of the styleguide in Polish in the form of its other rules and restates a binding sentence of D-43 in two places, which a cheaper class gets wrong more easily than it moves a name
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` ·
  `python -B .the-way/instruction-files/check_instructions.py` ·
  `npm run typecheck` ·
  `npx --no-install eslint --max-warnings 0` on the four TypeScript files ·
  `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on the four TypeScript files ·
  `git grep -n "styles\.css"`, its listing judged in the report
- **Depends on:** Slice 7 · Foundation entries rows 1, 2 and 5

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Outcome: one way of refreshing a screen — Przejście reads the question and the window from its state | Slices 1, 2 · entries 3, 4 |
| Outcome: the tables of files of the kind tell which file to copy, audited | Slice 3 |
| Outcome: an agent changing one screen reads the file of its screen and of the shared controls | Slices 4, 5, 6, 7, 8 · entries 1, 2 |
| To do 1 — Przejście and its panel read the question and the window; `setQuestion` and `setWindow` go; same moments for the player; no question on Programy | Slices 1, 2 |
| To do 2 — the two tables, each file of its kind with the audit's status; exemplars stay; the reconciliation's four files and line numbers found again | Slice 3 |
| To do 3 — the stylesheet split into `.css` files directly in `src/browser/`, each with its `<link>`, no build change; what stays in `styles.css`; each screen's rules in its file; the panel's in its own; the player sees each screen as before | Slices 6, 7 (with Slices 4, 5 so the tests read the rules where they go) · entry 1 |
| To do 4 — the comment of `email-status.ts` | Slice 8 |
| To do 5 — the styleguide's rule of a stylesheet and a `<link>` for each screen and shared part, a new screen adding both | Slice 8 · entries 1, 2 |
| To do 6 — the styleguide, `src/browser/AGENTS.md`, the comments and the tests that read the real stylesheet point at the file where each rule stands | Slices 4, 5 (tests) · Slice 8 (styleguide, `AGENTS.md`, comments) |
| To do 7 — the example of compliance of D-407 | entry 4 |
| To do 8 — D-43's sentence on the icon with no text covers the plaque of a discovery, or says why not | entry 5 · Slice 8 (the styleguide's restatement) |
| Settlements to record, row 1 | entry 1 |
| Settlements to record, row 2 | entry 2 |
| Settlements to record, row 3 | entry 3 |
| Out of scope — the focus methods of Przejście stay | Slice 2 (its *Goal* keeps them) |
| Out of scope — `tokens.css` and `kitchen-sink.css` are not split | Slices 6, 7 (neither file is in their *Change*) |
| Reconciliation (b) — the rules of Wiedza go to a file of that screen | Slice 7 (`knowledge-screen.css`) |
| Reconciliation (c), (d) — rows for the four files the audit did not see; any other file the tables lack or list wrongly | Slice 3 |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The state of the screen Przejście gains `subscribe` and a stable snapshot, and the screen and its panel read it with `useSyncExternalStore`, as the page's memory of folding is read | the entry keeps calling one general redraw method of the screen, which reads `question()` and `windowShown()` at each draw — a method by which the game view still tells the screen when to draw, which row 3 rules out | the subscription's shape is changed again in four files and their tests; the state and its readers are cut in two slices (1 and 2) so that each slice's reading stays under its limit |
| The panel of mode `run` gets the state of the screen and the answers of the question at its creation; the panel of Programy gets neither | the answers passed through `update` at each draw, or the panel finding the question through the screen | one more parameter of `createProgramPanel` to change later |
| The tests of the real stylesheet read it through one helper that follows the `<link>` tags of `src/browser/index.html`, pointed at it before the split (Slices 4, 5), so the split's slices change no test | each split slice repointing the tests at the files it creates — every test changed twice, and each split slice past the limit of its reading | a helper of a few lines to change if the page's links change form |
| The tests' change is cut in two slices, the test of the scene alone, because each slice reads the styleguide and the testing guidelines whole | one slice for all four tests | one more slice to dispatch |
| The new files are named after the module of the screen or part (`run-screen.css`, `program-panel.css`, `headquarters.css`, `character-screen.css`, `maps-screen.css`, `knowledge-screen.css`, `account-card.css`, `waiting-screen.css`, `accounts-screen.css`) or after the screen's class (`programs-screen.css`, which has no module of its own), and the credits after their class (`credits.css`) | names of the screens in Polish, or one file per module | renaming files and their `<link>` tags |
| The screens of the page — the login card, the waiting screen and the list of accounts — get files of their own as screens | keeping them in `styles.css` as part of the page's skeleton, which the task's list of what stays does not name | two small files, of a few rules each |
| The credits, shown on the login card and on Siedziba, get a file of their own as a part two screens use | the credits in `headquarters.css`, which would make the login card depend on Siedziba's file, or in `styles.css` | moving a few rules |
| The common layout of the screens (`.app-main`, `.screen`, `.screen-area`, the rule of the columns of Programy, Mapy and Wiedza with its `@media`) stays in `styles.css` | splitting a selector list across three files, which changes the text of a rule | three small rules moved later |
| Rules move whole and none is rewritten; a rule whose classes no file draws moves with the part its comment names and is reported, not deleted | deleting rules that look unused, which the task does not ask for | the dead rules stay until a task removes them |
| The new files are linked after `styles.css`, in the order their first rule stood in the base `styles.css`, and two checks keep the cascade: a one-off script that lists the pairs of rules whose order changed with equal specificity and a common property, and a comparison of computed styles in the real game before and after, in the slice's own worktree | trusting the order of the files alone, or a second worktree of the parent commit for the "before" side (an `npm ci` more) | a missed pair shows as a changed look of one screen, found by the real-game comparison or the review |
| The split is cut in two slices by what shares elements: Przejście, the program panel and Programy first, the other screens after | one slice per screen — eight runs of the real-game comparison; one slice — more than ten files | one more run of the comparison |
| The place that gives each `do not copy` stands in the report of Slice 3, not in the table | a fourth column in the tables — against the template of the pinned the-way, whose table holds no place | none |
| The comment of `email-status.ts` (To do 4) is made with the other comments in Slice 8, so that Slice 3 changes no file of `browser-view` | in Slice 3 beside the tables | none |
| To do 7 and 8, changes of D-407 and D-43, are written by the agent of the foundation entries, D-407 once with row 3 | made in the slices of code | none |
| The styleguide's order-of-work example (environment, values, one screen, its states) is not followed: the change adds no value, control or screen; it moves rules by what shares elements and then writes the rule that describes the files | following the example's order | none |
