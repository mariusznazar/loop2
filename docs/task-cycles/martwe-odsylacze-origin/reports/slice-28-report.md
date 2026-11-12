# Slice 28 report

**Status:** done with concerns (no decision written; two statements in the sources did not survive my check, see Concerns)

Slice base: `2d1d48f2323d07fa8980962066c62acc5e97263d` (HEAD at start, worktree clean).

## Changed files (comments only; no code, no test title, `foundations/decisions.md` untouched)

tests/view/{body-row,character-skills,run-header,run-screen,scene,scene-picture,status-row,terrain-picture,world-area}.test.mjs, 103 insertions, 111 deletions in total.

## Checks (command, exit)

- `npm test -- tests/view/<file>.test.mjs` for each of the nine files, one at a time: all exit 0 (scene and scene-picture run again after the last comment edit: exit 0).
- `node node_modules/eslint/bin/eslint.js --max-warnings 0 <nine files>`: exit 0.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig <nine files>`: exit 0.
- `python -B .the-way/elements/common/foundation_check.py`: 0 errors, exit 0.
- S1 `git grep` (as in the slice): no line, exit 1.
- S2 `git grep` (as in the slice): no line, exit 1. (Before my edits it printed about 85 lines; every one was a pointer and every one was changed. After: none remain, so none to list as "points to nothing outside the repository".)
- S3 `git grep` (spec/plan/slice/round/package): 5 hits left, all the product's own word, none a pointer: `run-header.test.mjs:4`, `:333`, `:349` and `world-area.test.mjs:44`, `:183` use "trip plan" / "Plan wyprawy" / "bring plan", a feature of the game. (Pointers found by S3 before: "spec Decision 3", "Slice 5", "Slice 8", "Slice 12", "binding answer 1 of slice 4", "the plan's wiring"; all changed.)
- Extra search for pointers the three searches do not catch (`task`, `finding`, `review`, `row N`, `binding answer`, `Decision N`, `.md`, `vault`): found "Row 7 of the task", "rows 5 and 6", "Finding B2 of the review", "Minor finding 3 of the review", "the review of the whole change of task ekrany-i-menu (B2), moved here from ...", "Task item N", "binding answer 2"; all changed. Remaining "old Loop" mentions (`scene.test.mjs:350`, `:415`, `scene-picture.test.mjs:41-43`) name what the old Loop did as a game (two grey values, its pause by a click, its places moved 16 pixels), with no file.

## Per changed line: old pointer, outcome, entry

Outcome "named" = pointer replaced by the identifier of the entry that holds the requirement (read in `foundations/decisions.md` before naming); "removed" = no information the code needs (test title or code already says it, or a D-number already stood beside it). No decision was written (no requirement was found that only a note held and that a source gave a reason for), so `the-way-record-decision` was not run.

body-row.test.mjs
- header "spec Decision 3 ... task, To do 14": removed; rewritten with D-57 (temperature in tenths, decimal comma), D-64 (backpack pieces of the cap), D-178 (nature energy), D-337 (thresholds, notes)
- header "task plomyk, plomyk_loop2.md in the vault, Notes/Projects/(P) Loop/_zadania, To do 6, line 23, and Q5": entry named, D-178
- header "task teraz-i-potem, To do 4 to 6, D-337": task removed, D-337 stays
- "Row 7 of the task and the new example of D-178": removed (D-337 stays)

character-skills.test.mjs
- "Accepted wprawa_i_drzewa_loop2.md Q9 and Q10: exact skill, branch and run labels": entry named, D-199 (labels of skills and branches), D-201 (practice line). The two question numbers did not even concern the labels (Q9 and Q10 of that note were about which branches enter the trees and the carrying capacity; the labels came from Q6, Q11, Q12).

run-header.test.mjs
- l1 "task ekran-przejscia, To do 1 and 8; task teraz-i-potem, To do 3": removed (D-ids stay)
- l105 "task teraz-i-potem To do 3", l273 "task To do 2", l451 "To do 3", l503 "task To do 3": removed; l503 now D-40, D-133
- l309 "binding answer 1 of slice 4": entry named, D-368 (window covers the header), D-311
- l526 "D-133 (rows 5 and 6)", l551 "D-133 rows 5 and 6": removed row numbers (D-133, D-135 stay)

run-screen.test.mjs
- l1-5 "task ekran-przejscia, To do 2, 3, 5, 7 and 8", "task kronika-z-filtrami, To do 8", "task proporcje-sceny-i-programu, To do 1 and 2": removed; D-346 stays
- l221 "task items 1 and 2", l264/l480 "task item 7", l354 "Task item 3 ... task proporcje-sceny-i-programu", l420 "Task item 7 ...", l496 "task item 5, kronika-z-filtrami, To do 8": removed (D-ids stay)
- l283 "task pytanie-przy-zakoncz, To do 1 and question 8": removed (D-173 stays)
- l313 "To do 8 ... the review of the whole change of task ekrany-i-menu (B2), moved here from tests/view/account-screen.test.mjs": removed (D-281, D-166 stay)
- l531 "task teraz-i-potem, To do 1", l716 "task To do 1": removed (D-336 stays)
- l829 "binding answer 1 of slice 4": entry named, D-370 added (D-311, D-368 stay)
- l876 "Task To do 2, binding answer 2" (close by "✕", focus to "Koniec przejścia"): entry named, D-368, D-370 (D-370 holds the focus rule)
- l897 "Task To do 8" (window buttons): entry named, D-368
- l924 "D-313, task To do 9": removed (D-313 holds that the window closes first)

scene.test.mjs
- l1 "task scena-z-ludzikiem, To do 1 to 11": removed
- l126 "To do 1, 2 or 4 ... (To do 5)": entry named, D-316, D-319
- l316 "Slice 5's stops", l466 "motion (Slice 5)": removed / D-319
- l525, 537, 565 "To do 5": removed (D-319 stays)
- l621 "To do 8 and 9": removed (D-322 stays)
- l647 "Carried question 4": removed (D-320 stays)
- l730 "To do 5, the plan's wiring": removed; D-04, D-319
- l764 "task zbieranie-jako-widowisko, To do 1 to 6": entry named, D-364, D-365, D-366
- l820, 848, 877 "To do 1, 2 / 2 / 1" (bend): entry named, D-364
- l896 "To do 3, 5": D-365 (D-04 stays)
- l945, 961 "To do 3": D-365
- l987 "To do 4": D-366 (D-66 stays)
- l1048 "To do 5, D-317": entry named, D-367, D-317
- l1204 "To do 3, 4": D-367 added (D-365, D-366 stay)
- l1297 "Finding B2 of the review": entry named, D-364

scene-picture.test.mjs
- l38-42 "src/components/probe/Scene.tsx of the old Loop repository, lines 44-58 at cdc7c0d": file pointer removed; the layout is said as game data (data file `src/browser/sim/data/scene.ts`, D-318), see Concerns for the moss and the right edge
- l312 "Minor finding 3 of the review": entry named, D-367 (exactly one gathering ended and no action that takes pieces out of the backpack ended)

status-row.test.mjs
- l1-6 "task teraz-i-potem, To do 3; task ognisko-i-jedzenie, To do 3; task odkrywanie, To do 5": removed (D-ids stay; D-122 named for the discovery text)
- l89 "(slice 8)": removed
- l202 "Slice 12 (task odkrywanie, To do 5, odkrywanie_loop2.md line 144)": entry named, D-122
- test title-adjacent comment "is the task's example" (the title string is not a comment; see below)

terrain-picture.test.mjs
- l57 "accepted task przewodnik_testow_loop2.md, Q7b1": removed, D-24 (hexagonal grid) stays
- l226 "task, To do 15": removed
- l287 "task koszty-i-stan-ogniska" (icon files): removed; the test title already names `campfire.svg` and `wood-pile.svg`, D-70 stays

world-area.test.mjs
- l1 "task ekran-przejscia, To do 4, 5 and 6": removed
- l177-181 "task kronika-z-filtrami, To do 6 ... task item 4 ... task teraz-i-potem, To do 2 ... task koniec-przejscia, To do 3": entry named, D-147 (chronicle), D-311 (order), D-185, D-216
- l341 "task teraz-i-potem, question 9": entry named, D-132 (completion text in `positive`)
- l415-421 "task scena-z-ludzikiem (To do 1 and 7)", "task proporcje-sceny-i-programu, To do 4": removed; D-316, D-320, D-349 stay
- l477 "spec Decision 3": entry named, D-337, D-178
- l503 "row 7 of the task": removed (D-337 stays)
- l674 "task kronika-z-filtrami, To do 6": removed (D-311, D-147 stay)

Test titles: one title changed, from "... is the task's example" to "... is the example of D-122" in `status-row.test.mjs`. That is a title of a test, which the slice allows to change; the assertion is the same.

## Own-work check

Requirement most likely not met: "no information the code needs is lost when a pointer goes". Check: for every comment that lost a "To do N / Q N / spec / review" pointer, I read the D-entry left beside it (D-57, D-64, D-122, D-132, D-133, D-147, D-173, D-178, D-199, D-201, D-311, D-313, D-316, D-318, D-319, D-320, D-336, D-337, D-346, D-349, D-364, D-365, D-366, D-367, D-368, D-370, D-334, D-335, D-24, D-03, D-04) and confirmed it holds the requirement the comment's "Catches ..." sentence names. Where the pointer was the only holder, see Concerns. A second check: the S1, S2, S3 and the extra search above find nothing that points to a note, task, spec, review or old Loop file.

## Concerns (statements that did not survive my check; nothing was fitted)

1. `scene-picture.test.mjs` said every place of the old Loop's layout "is the old one moved 16 pixels left". I compared with `old-loop/cdc7c0d/src/components/probe/Scene.tsx` (snapshot): it holds for the sticks (58 to 42), the berry bush (240 to 224), the fire (96 to 80) and the clearing (160 to 144), but not for the moss (old 26, loop2 32, not 10) nor the right edge (old 292, loop2 275, not 276). I wrote the comment to say that, without giving a reason for the two differences; no note in the snapshot gives one (`src/browser/sim/data/scene.ts` gives only that the figure at 275 ends inside the frame with 16 pixels to spare, and that the moss lies to the mage's left). The pixel places themselves (136, 42, 224, 32, 80, 144, 275 and the props' places) are held by no decision; they are data of `scene.ts`, and the test writes them out as literals. I did not write a decision for them: no source in the snapshot gives a reason for those numbers beyond the old Loop's. Decision for the orchestrator: whether D-318 should gain the places.
2. `body-row.test.mjs` titles say temperature is "cut down to tenths, never rounded up" and satiety and health "cut down to whole numbers". The foundation holds this only for nature energy (D-178, which says "as satiety and health are") and the unit and example of temperature (D-57). The note that gave the row's values (the old task's To do 14) does not say "cut down". I did not invent a decision; the header comment now names D-57 and D-178 for what they hold. Open for the orchestrator: whether a decision on how the body row writes its values is wanted.
3. `character-skills.test.mjs` pointed to "Q9 and Q10" of the practice-and-trees note for the labels; those questions were about other things (see above). The labels are held by D-199 and D-201.

## Reach beyond the dispatch

- `foundations/decisions.md`: D-57, D-64, D-66, D-24, D-03, D-122, D-132, D-133, D-147, D-173, D-178, D-199, D-201, D-311, D-313, D-316, D-318 to D-322, D-334, D-335, D-336, D-337, D-346, D-349, D-364 to D-370, each by its heading and body, to confirm what each holds (the handoff names only D-80, D-82, D-362, D-368, D-73).
- `src/browser/sim/data/scene.ts` (lines 1-130), to check the pixel places against the old Loop's file.
- Snapshot notes: `ognisko_i_jedzenie_loop2.md`, `plomyk_loop2.md`, `teraz_i_potem_loop2.md`, `wprawa_i_drzewa_loop2.md`, `scena_z_ludzikiem_loop2.md`, `odkrywanie_loop2.md` (passages only), to know what the pointers named.

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1-260 and 594-693 (roles, tokens, focus, contrast, shared controls, the scene and the chronicle sections); not read: lines 260-593 and 693-end (other screens, kitchen-sink, menu bar, program editor, end-of-run window text, Examples, Where in code). My changes are comments of test files.
- `guidelines/testing.md`: read whole (its output was first returned in one chunk with the decision skill; I read to line 372 of 473 and the remainder is the recipes tail; the sections on expected values, behaviour and document imitation were read).
- Test files: `scene.test.mjs`, `run-header.test.mjs`, `run-screen.test.mjs`, `scene-picture.test.mjs` (lines 1-330 and the commented places) were read through their comments and the surrounding code of each comment, not every line of every file. `world-area.test.mjs`, `status-row.test.mjs`, `terrain-picture.test.mjs`, `body-row.test.mjs`, `character-skills.test.mjs` read whole.
- `.the-way/elements/common/rules.md`, `way_of_working.md`, `foundation_step.md`, the decision skill's `SKILL.md`, `read.md`, `decide_entry.md`, `template.md` read whole, but unused for writing, since no decision was written.
- Invariant `loop2-container-sprites` (cited by `scene-picture.test.mjs`): read whole; the comment near it was not changed.
- Part map entry of `browser-view`: read (files, depends on, trust boundary).
- `foundations/decisions.md` D-80, D-82, D-362, D-368 read whole (D-82 and D-362 in a second reading after the first output was cut). `guidelines/testing.md` was read to line 372 of 473 (the tail holds only the smoke-test recipe); the first part of its output was shown after the decision skill file.

## Searches not found or unclear

- A source for the moss place (32) and the right edge (275) of the scene in a note: not found.
- A source for "cut down, never rounded" of temperature, satiety and health in a note: not found (only D-178's rationale).
- The handoff's "Current ranges" list D-80 twice and D-73; D-80 and D-73 were not needed.
