# Report — slice 27 (view tests of the program editor point to no note)

**Status:** done (one judgment call to confirm, see *Choices*).

**Base:** `b8bee55cef3c6e045e21f66e471b316f9bba2268` (HEAD was still it; worktree clean at the start).

**Commit:** one commit on `task/martwe-odsylacze-origin`, `test: :memo: name decisions instead of notes, tasks, specs and review remarks in the comments and titles of the view tests of the program editor, the rule signs, the shared controls, the failure notice and the memory limit` (hash in the return message).

**Files changed:** `tests/view/program-panel.test.mjs`, `tests/view/program-editor.test.mjs`, `tests/view/rule-editor.test.mjs`, `tests/view/program-list.test.mjs`, `tests/view/rule-signs.test.mjs`, `tests/view/react-controls.test.mjs`, `tests/view/memory-limit.mjs`, `tests/view/uncaught-failure.test.mjs` (comments, docstrings and two test titles only; the diff outside comment lines is the two titles). `foundations/decisions.md` is unchanged: no decision was written, because the foundation already holds what each comment needed (see below).

## Checks (command, exit code)

- `npm test -- tests/view/program-panel.test.mjs` 0; `program-editor` 0; `rule-editor` 0; `program-list` 0 (10 pass); `rule-signs` 0 (6 pass); `react-controls` 0; `uncaught-failure` 0 (17 pass). Same command for each. Note: my first run started two copies of the loop at once, they rebuilt `dist/` over each other, and `program-list`, `rule-signs` and `uncaught-failure` failed once with `ERR_MODULE_NOT_FOUND` for `dist/browser/sim/game.js`; I reran those three alone, one after another, and all exited 0 (logs `.runs/slice27b-*.log`). The failure was my own overlapping builds, not the change.
- `node --check tests/view/memory-limit.mjs` 0 (`memory-limit.mjs` has no `.test.mjs` file; the memory-limit behaviour test `tests/view/memory-limit.test.mjs` is not in *Change* and was not run).
- `node node_modules/eslint/bin/eslint.js --max-warnings 0 <the 8 files>` 0.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig <the 8 files>` 0 (it first failed once on a space I dropped after a comma in a title; fixed, rerun 0).
- `python -B .the-way/elements/common/foundation_check.py` 0 (run while the 8 files were already changed; no foundation file changed).
- S1 `git grep -nIE '…'` on the 8 files: no line, exit 1.
- S2 `git grep -nIE '…'` on the 8 files: no line, exit 1 (before my change it printed 73 lines, all fixed below).
- S3 `git grep -nIE '\b[Ss]pec\b|\b[Pp]lan\b|…'`: only lines that use "plan" for something else, listed here: `tests/view/program-editor.test.mjs:136-137` the group name "Plan" typed into a rename case; `tests/view/program-panel.test.mjs:205-290` the trip plan of the game („Plan wyprawy”, `.trip-plan`, D-180) in a section title, a title, comments and messages. No hit points to a spec, plan or slice.

Additional wider search I ran (not in the slice's *Checks*), because the three searches missed some forms: `git grep -nIiE '\btasks?\b|\bTo do\b|\brow E[0-9]|finding|handoff|Mariusz|definition|concept|vault|\bspec\b|\bslice|review|report of|choice C|decision [0-9]'` on the 8 files. It found three more pointers the S-searches do not: `Row E23, D-295` (program-panel), `Review finding I-1:` and `(the slice's report names the case)` (program-editor); all fixed. Other hits are ordinary words (`settle()` helper, `note` variables, "earning loop", `.slice()`).

## Own-work check

Requirement most likely not met: a pointer in a form the slice's searches do not match (a row code, "finding I-1 of the review", "Slice 6's observed problem (the report of that slice)", "spec D4"). Check: the wider search above plus a read of every changed comment. It found the three extra pointers (fixed) and two comments naming a slice's report ("Slice 6's observed problem") that I reworded to state the problem in its own words. After the fixes the wider search shows none.

## Changed lines (old pointer -> outcome -> entry)

Outcome words: *named* = the comment now names the foundation entry; *removed* = the pointer went and the comment (or the title) already says the rest.

memory-limit.mjs
- `spec.md of the task logowanie-w-react, decision 9` -> named: D-268 (the limit of 2 GiB). The measure "1.68 GB the whole Node stage peaked at" stays as the comment's own statement, "when the limit was set" added; it is a number only the removed spec held, and D-268 says only "low and not at the memory free" (see *Choices*).

react-controls.test.mjs
- `spec decision 2, D-44` -> named: D-44, D-265. `spec decisions 1, 9 and 11` -> named: D-264, D-268. `pytania 1 and 1a of the task przyciski-i-zakladki` -> named: D-275.

program-list.test.mjs
- `task ekrany-i-menu, To do 5 and 14; questions 5 and 15` -> removed; the D-165 to D-169 already named stay.

rule-signs.test.mjs
- `task stan-i-powod-przy-regule, To do 1 to 7` -> named: D-308, D-310. `(To do 1, question 8) ... (question 7)` -> named: D-308 (a row under the pointer keeps the background of its state; an open row stands on `highlight`).

uncaught-failure.test.mjs (D-323, D-253, … already named in each)
- header `task napis-o-awarii, To do 1–5` and `the browser check of the task` -> removed. Nine comments `task napis-o-awarii, To do N` / `task skad-wiem-o-awarii, slice 4` -> removed. `task karty-i-katalog-map, handoff item 2` -> removed (D-323 stays). Invariant `uncaught-failure-game-state` read whole before touching its three citing comments; their `// invariant:` lines are untouched.

rule-editor.test.mjs
- header `task edytor-programu, To do 1–10` -> removed. `Task kronika-z-filtrami, To do 5; spec D4` -> named: D-348 (the hint of a move). `Task edytor-programu, Acceptance criteria: the row, „Zapas poniżej”, 8 …` -> named: D-306 (the six acts). `Acceptance criteria, and D-03: „a number field whose value the game clips may lose its cursor”` -> kept D-03, the sentence is now the comment's own words. `slice 13 ... case of the DOM editor` -> removed; the range and step now name D-374. `Acceptance criteria 3, found in the browser in slice 13` (number field selected on focus) -> named: D-306. `as the task gives them` -> named: D-289. `task koszty-i-stan-ogniska, To do 1 to 4; D-363` -> D-363 only. `Task proporcje-sceny-i-programu, To do 1 and 3 / finding I-1 / M-6 / M-7 of the review` -> D-288 (and D-311) kept; the review remarks removed.

program-editor.test.mjs
- header `spec section 5 ... choice C12 ... slice 13` -> named: D-288, D-306. `spec's table (Decision 3)` -> named: D-374. `(task, To do 1 and 7)` -> removed. `Task grupy-regul-i-liczniki, To do 3–4 (Mariusz, 2026-10-24)` -> removed (D-90, D-93). `Task plomyk, To do 5` -> named: D-374. `Task odkrywanie_loop2, To do 4 and 7 (vault …)` -> removed (D-124). `the task's group-bound arrows` -> named: D-297. `D-297 (task edytor-programu, To do 7)` -> D-297. `Task edytor-programu, To do 4–5, D-289 and D-290` -> D-289, D-290. Two titles `in the order of the task` -> `in the order of D-290` (titles changed; no other file cites them). `task koszty-i-stan-ogniska ... To do 2 examples` -> named: D-363. `Review finding I-1` -> removed. `the slice's report names the case` -> named: D-289.

program-panel.test.mjs
- header `task edytor-programu, To do 1, 3, 6, 8, 11` -> removed. `rows E14 and E36, question 11` (two comments) -> D-180. `To do 3 and 8 ... task proporcje-sceny-i-programu` -> D-282, D-288. `Task proporcje-sceny-i-programu, To do 1` -> D-288. `To do 10, D-124` -> D-124. `Row E31, D-302, To do 8` -> D-302. `Row E23, D-295` -> D-295. `Task programy-gracza, To do 2–3` -> D-166, D-167. `To do 3–4; spec decision 7` (new program) -> D-167, D-169. `To do 4; D-169 and spec decision 7` -> D-169. `To do 4; spec decision 7, ... (left to the maker ...)` -> removed; the comment states the behaviour in its own words (see *Choices*). `To do 3; D-167 and spec decision 7` -> D-167. `To do 2, 7 and 9; D-166, D-93 and spec decisions 6–7` -> D-166, D-93. `Task kronika-z-filtrami, To do 5; spec D4` -> D-348. `Task zapis-stanu-na-serwerze, To do 6; D-212` -> D-212. `To do 10; D-93, D-173 and spec decision 7` -> D-93, D-173. `To do 10 and 3; D-168 and spec decision 7` -> D-168, D-173. `D-36 and spec decision 7` -> D-03, D-36. `Acceptance criteria 1; D-03` -> D-03 (sentence kept as the comment's own). `Acceptance criteria 3, found in the browser` (Enter in the number field) -> D-306. `Task ekran-przejscia, To do 7, questions 5 and 10` -> removed (D-313, D-124, D-131, D-166, D-306 stay). The nine `To do 8 / 9 / 12 / 10; … spec decision 7` comments (lines about the copy: shown, saved, new program, discard, deleted program, switch button, after a death, after „Zakończ”) -> D-171, D-172, D-171 with D-169, D-168, D-174, D-173 as in the old comment's own decision numbers or the nearest entry (see *Choices*). `Slice 6's observed problem (the report of that slice)` (two comments) -> removed; the problem stated in the comment's own words. `Task ekrany-i-menu, … settlement row 11; task edytor-programu, row E5` -> D-166, D-196. `Settlement row 11, questions 15 and 17; D-196` -> D-196. `Task proporcje-sceny-i-programu, finding I-1 of the review` -> D-288, D-295.

## Choices (with the way rejected and the cost if wrong)

1. **No new decision written.** Every requirement a comment pointed to that the code needs is already held by a decision (D-165 to D-174 for the program panel and list, D-288 to D-306 for the rule panel, D-308/D-310 for rule signs, D-348 for the hint of a move, D-363, D-374, D-268, D-323). So `the-way-record-decision` was not run. Rejected: writing decisions for the two maker's choices below. Cost if wrong: a reviewer who thinks they are requirements finds them only in test titles.
2. **Maker's choices pinned by a test, not in the foundation, not recorded:** (a) the name field leaves without saving at the same action again or when another program is shown (`program-panel.test.mjs`, test "the name field leaves without saving …"); the old comment said the spec left it "to the maker". (b) „Usuń” of the shown program shows the first program of the list (D-167 says only that the last program stays; D-168 treats the copy's program). Both stand in the test titles, so I removed the pointer and did not record a decision. If the orchestrator wants them as decisions, they are two small entries to write; I did not, because the spec called (a) the maker's choice, not a requirement.
3. **Citation of nearest entry where the old comment named none** (`spec decision 7` only): I chose the decision whose text the test checks (D-171 for the copy's heading, line and three buttons; D-172 for the changed-program line; D-169 for the first free name; D-174 for the switch button; D-173 for the screens after a death/„Zakończ”). I checked each against the decision's text; D-171's "first free name" and "Porzuć zmiany active" and D-173's "the program editor shows the program the copy belongs to" are literal. The "restores the copy's program" part of „Porzuć zmiany” is only implied by D-171/D-131, not stated.
4. **`memory-limit.mjs`:** the "1.68 GB" peak is a measurement that only the removed spec held; I kept it as a plain statement of the reason, with "when the limit was set". It cannot be checked from the foundation. If the orchestrator prefers, the number can go and the comment read "D-268: low enough that several killed files add up safely".
5. Test titles in `program-editor.test.mjs` (two) changed from "in the order of the task" to "in the order of D-290". `git grep` shows no other file citing the old titles.

## Reach beyond the dispatch

- Read D-03 (its header and Rationale), D-36, D-40, D-44 (partly, to find which decision holds the secondary action and the pointer/highlight rules), D-168 to D-174 bodies, D-264, D-265, D-268, D-275, D-289, D-290, D-306, D-308, D-348, D-363, D-374 by section search; and `foundations/invariants.md` entry `uncaught-failure-game-state` whole. Why: to map each pointer to the entry holding its requirement.

## Unread material

- `.the-way/elements/decisions/skill/*` (SKILL.md, read.md, decide_entry.md, template.md), `.claude/skills/the-way-record-decision/SKILL.md`, `.the-way/elements/common/rules.md`, `way_of_working.md`, `.the-way/task-cycle/skill/foundation_step.md`: not read, because no decision was written.
- `guidelines/testing.md`: read lines 1-370 whole and 371-459 cut to 400 columns; `guidelines/coding.md`: read cut to 600 columns; `guidelines/styleguide-browser-view.md`: not read (no CSS or view file changed; only a grep for "comment"); `src/browser/AGENTS.md` not read (no file in `src/browser/` changed); `foundations/part_map.md`: the browser-view entry's first lines only.
- `task.md:17-27, 29-40, 50-57, 107-115`, `foundations/decisions.md` D-80 (first lines only), D-82 and D-362: read in the handoff copy / in the file, D-82 and D-362 whole.
- The private-source snapshot (`vault/`) was not opened: no comment needed a requirement the foundation lacked, so no note passage was read.
- Foundation entries read in part: D-93 (first lines), D-166 to D-174 (decision paragraph and a search of the rest), D-196 (first lines), D-212, D-302, D-313 (first lines).

## Searches not found or unclear

- Is "1.68 GB peak" of the Node stage anywhere in the foundation? Searched D-268 (and by `grep 1.68`): not found.
- Is "name field leaves without saving at the same action or another program shown" in the foundation? Searched D-167, D-169, D-171 and the range D-165 to D-174: not found (see *Choices* 2).
- Is "a rule dragged over the panel is accepted by no drop" and "the item holding the panel is no list item to assistive technology" in the foundation? Searched D-288 and by `assistive` / `list item`: not found; both stand in the test titles and the comments' own words, so only the review pointer was removed.
- The `.runs/` copies of the old cycle records (specs, plans) were not opened; the pointers to them were resolved from the foundation entries named beside them.

## Problems observed

- Two copies of the test loop run at once rebuild `dist/` over each other and fail with `ERR_MODULE_NOT_FOUND`. Evidence: `.runs/slice27-program-list.log`. Cause verified: both loops ran from my first, apparently silent background start and from my second one. Not a defect of the product.
