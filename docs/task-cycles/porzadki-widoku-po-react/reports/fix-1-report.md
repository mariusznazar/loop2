# Report of fix 1 (the fix of the findings of the review of the whole change)

**Status:** `done`

**Base:** `45f9b25ca433701a2f0afed1437cdaa736b0a7d1`. **Worktree:** `the worktree's root`, branch `task/porzadki-widoku-po-react`. Not pushed. The product's full gate was not run.

## Commits (in order)

| Commit | Files | Lines +/- | What |
|---|---|---|---|
| `30076f2b` | `tests/view/run-screen-state.test.mjs` | 1 / 1 | Important 1 |
| `f8621033` | `foundations/decisions.md` | 6 / 6 | Important 2 (D-421, the entry's side), M1 (D-407) |
| `2af9b3ed` | `guidelines/styleguide-browser-view.md` | 12 / 4 | Important 2 (the styleguide's side), M2 |
| `a9a95479` | `src/browser/styles.css`, `src/browser/run-screen.css`, `src/browser/headquarters.css` | styles.css 41 / 4 (with the head comment), run-screen.css 6 / 22, headquarters.css 5 / 6 | Important 2 (the code: the frames rule moved, comments) |

Whole fix, `git diff --stat 45f9b25c HEAD`: 6 files, 71 insertions, 43 deletions.

## The findings

### Important 1 — fixed (`30076f2b`)
`tests/view/run-screen-state.test.mjs:309`: the line `decision: D-371` now quotes the sentence from its start, "Whether the end-of-run window (D-368) is open is a memory of the page, … it becomes open again at every entering of the screen of an ended map run", the words the reviewer's *Fix* line gives, with no other change.
Check: `python -B .the-way/elements/common/foundation_check.py` exit 0, `0 errors` (it was exit 1, one error, before); run again at the final head: exit 0, `0 errors`.

### Important 2 — fixed, route (a), in four places

1. **D-421** (`foundations/decisions.md`, `f8621033`), written by the foundation step's way (`elements/decisions/skill/SKILL.md` and `elements/decisions/template.md`, read; I have no skill tool), edited in place:
   - The binding sentences stay three: the first (what `styles.css` holds) is unchanged; the second is new and says that `src/browser/styles.css` holds also "the common layout of the screens — the place of the screens (`.app-main`, `.screen`, `.screen-area`) and the columns of Programy, Mapy and Wiedza with their `@media` — and each rule that the elements of several screens need and that cannot be divided without changing its text: a rule whose selector list names classes of more than one screen, or the rule of a sentence that several screens draw, which today are the sentence `trip-warning` and the animation of the frames of the sprites of the scene and of the camp"; the third is the old second and third joined (it begins "Every other screen and every other part that several screens use has a stylesheet of its own …", it ends with the kitchen-sink sentence). No test quotes D-421 by a line `decision:` (searched), so no quotation broke.
   - *Verification*: a *complies* example (the animation of the frames of the sprites of the scene and of the camp, one rule whose selector list names classes of Przejście and of Siedziba, with its keyframes in `styles.css`) and a *violates* example (a rule that the elements of two screens need, written into the stylesheet of one of them, so that the other screen reads a file of the first).
   - *Rationale*: the sentence "what stays shared …" gains the undivided rules; "Accepted with it" gains the reason (dividing the list changes the text of the rule and the order of the cascade). *Rejected* gains the way "each such rule in a stylesheet of its own, the selector lists divided between the files", with its cost.
   - D-47 and D-265 (read as D-421 weighs them) are untouched: the `:focus-visible` rule and the look of the controls stay in `styles.css` as before.
2. **The styleguide rule "A stylesheet of its own for each screen and each shared part"** (`guidelines/styleguide-browser-view.md`, `2af9b3ed`): the paragraph "`src/browser/styles.css` trzyma to, co wspólne" now names the common layout of the screens and the rules that several screens need undivided (a selector list of more than one screen; the sentence several screens draw; today `trip-warning` and the animation of the frames with its `@keyframes`), says such a rule stands whole in `styles.css` and that the comment at it says why. Nothing else of the rule changed, the *Good* and *Bad* lines and its first paragraph included (the first paragraph's sentence "gdy tej samej reguły potrzebują dwa ekrany, część wspólna dostaje własny plik" now has the exception stated in the next paragraph).
3. **The code** (`a9a95479`): the rule `.scene-mage-sprite img, .scene-fire[data-burning="true"] img, .camp-member img, .camp-fire img` with its four declarations, no selector and no declaration changed, and `@keyframes scene-frames` moved out of `run-screen.css` into `styles.css`, at its end, in a block `@media (prefers-reduced-motion: no-preference)` of its own, with a comment that carries the text of the first bullet that stood over the rule in `run-screen.css` and says why the rule stands there by the exception of D-421. Search for `scene-frames`: the other rules that name it stay in `run-screen.css` where they were (`.scene-dust img`, `.scene-creature-bite img, .scene-scuffle img`, `.scene-creature[data-entering] .scene-creature-run img, .scene-creature-effect[data-kind="out"] img`, each with its own duration and fill); the name of keyframes is global, so they stay true.
   Comments changed to say what holds now: the head comment of `styles.css` (the exception and its three rules), the comments at the columns rule (`styles.css`) and at `trip-warning` (`styles.css`: they stand there by the exception of D-421); the head comment of `headquarters.css` (the camp's frames are animated by a rule that stands whole in `styles.css`) and its line "its motion is the rule for the frames in styles.css"; the head comment of `run-screen.css` (the motion and keyframes are its, but for the frames rule and `scene-frames`) and the first bullet of the comment over the block of motion (it points to `styles.css`).
4. **The cascade and the game:** below.

### M1 — fixed (`f8621033`)
D-407's *Verification* tests clause reads now "…which draws each only while that state shows it and asks the game view to close the window, and outside the game state and the document it saves; …". The test case `„✕” asks the game view to close the window and the focus goes to „Koniec przejścia” in the header; „Koniec przejścia” asks to open it` (`tests/view/run-screen.test.mjs:916`) holds it: it asserts `game.acts` equal to `["closeWindow"]`, then `["closeWindow", "openWindow"]`. I put back the close clause only, as the finding asks; the case holds the opening by the header button too, which D-407's clause does not need.

### M2 — fixed (`2af9b3ed`)
The row `text-strong` of the table of roles (`guidelines/styleguide-browser-view.md:25`): the *Decision* column reads `D-40 · D-43` (the file's separator for several decisions is ` · `). The width of the column is not re-padded to the longest cell: the table's other rows keep their padding and the cell is wider than the column header; a Markdown reader is unaffected and no check of the repository reads the padding. To re-pad the table is a diff of every row of it; I did not make it.

## Checks (commands and exit codes)

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (before the commits and at the final head) | 0, `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0, `0 error, 134 warn, 7 info` (warnings are not errors; I did not compare them with the base) |
| `npm test -- tests/view/scene.test.mjs` | 0 (71 tests) |
| `npm test -- tests/view/world-area.test.mjs` | 0 |
| `npm test -- tests/view/run-header.test.mjs` | 0 |
| `npm test -- tests/view/rule-signs.test.mjs` | 0 |
| `npm test -- tests/view/run-screen-state.test.mjs` | 0 |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/invariants/test_application_build_output.py` | 0 |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 |
| `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/styles.css src/browser/run-screen.css src/browser/headquarters.css tests/view/run-screen-state.test.mjs` | 0 |
| `node .runs/fix-1/order-check.mjs …` (the order script, below) | 0 |
| the recording in the real game, before and after (below) | `total differences 0` |

Mismatch in the handoff: it names `npm test -- tests/view/scene.test.mjs, tests/view/world-area.test.mjs, …` as one list; `npm test -- <file>` takes exactly one test file (`Expected exactly one test file, or no argument for the full gate.`, exit 2 with two), so each file was run by its own command. `index.html` is unchanged, so it was not run through prettier.

## The order of the cascade (point 4)

The script of slice 7 (`order-check7.mjs`) was copied and adapted: the "before" is the eleven game stylesheets at `45f9b25c` (read with `git show` into a directory of the working copies), the "after" is the stylesheets the page links now (`tests/view/game-stylesheets.mjs`); the recorded pages of point 5 are its DOM evidence. Full output: `reports/fix-1-evidence/order-report.txt`.

- Rules and at-rules: 444 before, 444 after (the moved at-rule `@keyframes scene-frames` included). **Rules in one and not the other: 0.** No rule lost.
- Pairs whose order changed, with equal specificity and a common property: **1**:
  `run-screen.css:778 .scene-mage-sprite .scene-mage-death img` (unconditional; declares `translate` and `animation-name: none`; specificity 0.2.1) stood before the moved rule's selector `.scene-fire[data-burning="true"] img` (in `@media (prefers-reduced-motion: no-preference)`; specificity 0.2.1; declares `animation-name`) and now stands after it. Common property: `animation-name`.
  **Judgement:** the two selectors cannot match one element. `.scene-fire` (`scene.tsx:811`) is a `div` that holds one `Sheet` of the fire's own picture and nothing of the mage; `.scene-mage-death` is a sheet inside `.scene-mage-sprite`, a sibling branch of the scene. An `img` that stood under both would have to be inside the fire and inside the mage's death sheet. The script's own check against the recorded pages (`2c`) finds no element matched by both (0 of 1, 0 selectors it could not evaluate). The other selectors of the moved rule, `.scene-mage-sprite img` (0.1.1), `.camp-member img` (0.1.1) and `.camp-fire img` (0.1.1), differ in specificity from every rule of `run-screen.css` that declares an animation property on an `img`, so their order decides nothing; for the same reason the rules `.scene-dust img` and the creature's, now after the moved rule, change nothing. No pair shows that the move changes which rule wins for an element of the game.

## The game as the player sees it (point 5)

Method as slices 6 and 7: `npm run local` at the base tree (the CSS not yet changed) and again at the changed tree, Playwright CLI (`playwright-cli open`, `run-code --filename`), viewport 1280 × 720, an account made through the page's own request, the saved document sent by the ordinary save request, a reload, then the computed style (all properties) of every element of the page and of its `::before` and `::after` that has content, keyed by the element's place in the tree with its classes, written to a file, and the two recordings compared by a script. **New in this fix:** before the recording every animation of the page is paused at time 0 (`document.getAnimations()`), so the values of an animated property do not depend on the time; and the list of animations of the page (element, `animationName`, duration, iterations, easing, fill, delay, direction) is recorded and compared too. Two recordings at the base, one after the other, differ in **0** values (the recording is deterministic).

States (saved documents composed with the functions of the built simulation, `compose.mjs`):

| State | What it shows | Elements | Animations (of which `scene-frames`) |
|---|---|---|---|
| `run-live` | Przejście, a paused map run at minute 124, the mage | 809 | 2 (2) |
| `run-fire` | Przejście, the same run with a campfire of 40 minutes put on the character's tile: the fire burns | 814 | 3 (3) |
| `run-fire-walk` | the same, with `data-walking` and `--walk-start` set by hand on the mage's element and the badge's carrier, and `data-burning` set on the fire: the walk's rules and the frames rule meet | 814 | 7 (3) |
| `run-discovery` | Przejście paused at a discovery | 830 | 2 (2) |
| `run-death` | the end of a map run by death | 874 | 0 |
| `run-completion` | the end of a map run by completion | 879 | 0 |
| `headquarters` | Siedziba, the camp with the fire; the character is in a map run, so no member of the camp | 810 | 1 (1) |
| `headquarters-camp` | Siedziba with two characters at home: the camp's fire and two members | 186 | 3 (3) |

**Result: differences 0 in every state, in the computed style of every element (with the pseudo-elements) and in the list of animations**, with the changed tree: `https://127.0.0.1:51640/styles.css` serves one `@keyframes scene-frames` and `run-screen.css` none (checked with `curl`), so the comparison was between the two real stylesheets. The comparison and the recorded values: `reports/fix-1-evidence/diff-before-after.txt` (empty) and `diff-noise.txt` (empty).

**What the recording does not reach, said plainly:**
- A real walk and a real burning fire in a map run in motion were not reached by playing: a paused page holds no walk, and the state "a fire burning on the character's tile" was composed by putting the campfire in the document by hand; the walk was set by hand as attributes (`data-walking`, `--walk-start`), as React would set them. The cascade for those elements is the one recorded; the timing of the real events is not.
- The wolf's bite and the cloud of the scuffle (`.scene-creature-bite img`, `.scene-scuffle img`, rules that stay in `run-screen.css`) were not in any recorded state; the order script covers them (above: they differ in specificity from the moved rule or cannot meet it on one element).
- The animation was recorded as declared (name, duration, steps, iterations) with the animations paused at 0, not as a stream of frames; I did not watch the frames move. A change that left the declaration identical and broke the keyframes would show in the list of animations (a missing `@keyframes` gives no animation): the lists are equal.

## Own-work check (WAY-164)

The requirement most likely not met: "the player sees the scene and the camp as before" (a rule that moves before every rule of `run-screen.css` could lose against a later rule of equal specificity, or the keyframes could be lost to the page). Checks: the order script (no rule lost, one pair, judged by the structure of the scene); the recording of the real game in eight states with differences 0 and equal animations; the served files. Result above. A second requirement, "no selector and no declaration changes": the multiset of rules in the script's step 1 is equal before and after (0 rules in one and not the other, which compares the text of every rule with its conditions).

Mutation in the head: leaving the keyframes in `run-screen.css` and moving only the rule would change nothing on the page; leaving them out of both would show as three animations less in `run-fire` and `headquarters-camp`; the script's step 1 would report a missing at-rule. The scene test reads the stylesheets as the page links them, so the rule is found at its new place (it passes).

## Reaches beyond the dispatch

- `elements/decisions/skill/read.md`, `decide_entry.md`, `elements/decisions/template.md` (whole): to edit D-421 and D-407 as the decisions element's way gives it (the handoff names `SKILL.md`; those files are what it sends to).
- `grep`/`git grep` for `decision: D-421`, `run-screen.css`, `scene-frames`, `headquarters.css`, `trip-warning` in `tests`, `guidelines`, `src`, `foundations` (not whole files): to see which comments and lines say where the camp's animation stands and whether a test quotes D-421; the only places found are the ones changed.
- `src/browser/view/scene.tsx:795-830` and `scene-picture.ts:418-432` (excerpts): the structure of the scene and how the fire is drawn, for the judgement of the one pair and for the state with a burning fire.
- `tests/view/run-screen.test.mjs:916-935` (excerpt): the case of „✕” for M1.
- `.runs/task-cycles/porzadki-widoku-po-react/reports/slice-6-executor-evidence/compose.mjs`, `record-all.sh`, `slice-7-executor-evidence/gen-driver7.mjs`, `gen-driver-run6.mjs`, `compose7.mjs`, `compare-styles.mjs`, `order-check7.mjs`, `noise.txt`, and the slice 6 report (lines found by search for `noise`, `compose`, `walk`): the scripts the handoff names, to adapt them.
- `src/browser/index.html` (by search for `stylesheet`), `git ls-files --eol` of two files.

## Choices

- **The place of the moved block in `styles.css`: the end of the file**, after the table of tiles. Rejected: next to the base rules or the menu bar — the rule is neither; after `trip-warning` — the other two exception rules stand in the middle of the file with the layout, and a block of motion of a different kind reads better apart. Cost if wrong: a later task moves one block.
- **The comment at the moved rule in `styles.css`** is a new one made of the first bullet that stood over the block in `run-screen.css` plus the reason for the place, not the whole long comment of the scene's motion (which describes the rules that stay). In `run-screen.css` the first bullet shrinks to a pointer to `styles.css`. Rejected: copying the whole comment — it would describe rules that do not stand in `styles.css`. Cost if wrong: a reader of the scene's motion follows one pointer.
- **D-421's binding sentences kept at three** (the template allows one to three): the exception is a new second sentence and the two old sentences about the files of screens and the kitchen-sink page are joined. Rejected: a fourth sentence (template), a paragraph of its own (it is no other question). Cost if wrong: a longer third sentence.
- **M1 closed with the close clause only**, as the finding words it; the case also holds the opening by the header button.
- **The styleguide's table not re-padded** for the cell `D-40 · D-43` (above).

## Unread material

- `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, `foundations/part_map.md`, `.runs/task-cycles/porzadki-widoku-po-react/task.md`: **not read** (the fix touches no product code but comments of stylesheets and no part-map entry; the task document was not opened). The handoff names them; I did not read them. The fix stays in the places its findings name.
- `guidelines/styleguide-browser-view.md`: read in the parts I changed and in the passages about the stylesheet rule (lines 8-30, 100-135, 330-370), about the scene (lines 700-740) and by search for `run-screen.css`, `camp`, `scene-frames`; not read whole.
- The head comments of the eleven stylesheets: read in full for `styles.css`, `run-screen.css`, `headquarters.css`; the others only by search for `run-screen.css`/`styles.css` (the lines where they name another file); `src/browser/index.html` by search for `stylesheet` (lines 7-19).
- D-371, D-407, D-408, D-43, D-421: each read whole. D-47 and D-265: the first paragraph of each only (what they say of `styles.css`).
- `.the-way/task-cycle/change/SKILL.md` and `fix.md`: whole; `.the-way/task-cycle/skill/foundation_step.md`: whole; `.the-way/elements/decisions/skill/SKILL.md` whole (its first 80 lines were all of it), `read.md`, `decide_entry.md`, `template.md` whole; `elements/common/way_of_working.md` and `rules.md` (named by the skill): not read.
- `.claude/skills/loop2-play/SKILL.md`: whole.

## Searches not found or unclear

- none found missing. Unclear: the handoff's "the comment that stands over the rule now" is the whole long comment of the scene's motion, not a comment of the rule alone; I took its first bullet (the one about the frames) as the comment of the rule (choice above). The handoff's list of comments that "said the camp's animation stands in `run-screen.css`" includes the head comment of `run-screen.css`, which did not say it; I changed that comment to say the frames rule stands elsewhere, so that it does not claim what is not true.

## Working copies

- `.runs\fix-1\` (the scripts, the saved documents, the two recordings of 14-15 MB each per state, the copies of the base stylesheets, the logs of the two starts and of the test runs) and `.playwright-cli\` of the worktree: **removed** before I returned. `npm run local:stop` ended both starts of the game (`Local starts stopped: 1` each). Kept beside this report, in `.runs\task-cycles\porzadki-widoku-po-react\reports\fix-1-evidence\` (ignored by git, not part of the change): `order-check.mjs`, `compare.mjs`, `compose.mjs`, `gen-driver.mjs`, `record-all.sh`, `order-report.txt`, `diff-before-after.txt`, `diff-noise.txt`. `.runs/local-start/` (the databases of the starts, made by the product's own tool) stays by the rule of the skill.
- No screenshot was made or shown.

## Problems observed

- None in the product. One of my own: the first `npm test -- <several files>` was refused (above), the files were run one by one.
