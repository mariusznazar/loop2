PASS 83acc083729000e6c4c6dd093adef997dfad4b0c

# Review of the fix of the whole-change findings - "loop2: uklad na telefon dla wszystkich ekranow gry"

- Variant: the fix of earlier findings (`.the-way/task-cycle/review/SKILL.md` with `fix.md`), by the reviewer who gave the findings.
- Range: `5f5e008827df995c0707500ea9c177e3d7a4a8a4..83acc083729000e6c4c6dd093adef997dfad4b0c`, three commits: `666e50a5` (I-1, I-2, Minor 1-6 and 8), `ff645a68` and `83acc083` (Minor 7). `git rev-parse HEAD` is `83acc083...`, the head given.
- Bounds: the findings file `reports/findings-whole-review.md` (I-1, I-2, Minor 1-8; Minor 9 asks for no change) and the fix report `reports/fix-whole-report.md`.
- Result: both blocking findings fixed; Minor 1-8 fixed; no new Critical or Important finding in the fix diff; two new Minor notes, which block nothing.

## Each finding

### I-1 - fixed

The four places now say one thing:
- `foundations/decisions.md` D-396, a paragraph of its own: "Every control of the phone layout — a button, a cell of a pick, an arrow, an item of a menu — has a touch target at least 48 px high and 48 px wide, a value taken from Android's accessibility guidance. A link inside a running sentence keeps the size of its text; a link that stands by itself as a control holds the minimum." The *Rationale* gives the reason and names D-47 ("such a link is the one control the minimum leaves out"). The *Verification* gains a complies example (a link of the credits in a running sentence at the size of its text) and a violates example (a link that stands by itself as a control, under 48 px). *Rejected* gains two ways (see N-1).
- `guidelines/styleguide-browser-view.md:604-607`: "Odnośnik wewnątrz toczącego się zdania zachowuje wielkość swojego tekstu, a odnośnik, który sam jest kontrolką — … — trzyma minimum (D-396). To jedyny wyjątek od minimum: D-47 liczy każdy odnośnik jako kontrolkę …". It no longer attributes to D-396 an exemption D-396 does not hold.
- `src/browser/styles.css`, comment of the touch-target block: "A link inside a running sentence keeps the size of its text, the one exemption D-396 makes from the minimum".
- `.claude/skills/loop2-play/SKILL.md` and `.agents/skills/loop2-play/SKILL.md` (byte-identical, `cmp`): "A link inside a running sentence stands on that list too, and D-396 exempts it: it keeps the size of its text, while a link that stands by itself as a control holds the minimum."

The code agrees: the credits links and `maps-who-run-link` stand in sentences, and every standalone link holds the minimum in the phone blocks (`team-member-name`, `maps-who-name`, `maps-list-item`, `program-list-item`, `menu-bar-item`, `account-menu-panel-link`).

On the mark: a decision entry carries no mark per sentence in this log. The fix report marks the sentence, its rationale, its rejected ways and its pair of examples as `the cycle's` (fix report, I-1 and concern 1), which is where slices 1 and 2 marked theirs, for the request to show the human. That holds.

### I-2 - fixed

D-349 now reads "in the phone layout the larger of the two that the place of the scene holds, a classic scrollbar counted in the width of the window, so 336 × 152 px at a page area 360 px wide". Against the code: the place of the scene in the phone layout is the page area less 2 × 8 px of the page and 2 × 1 px of the area's frame (`.scene-place` takes the area's padding). With a classic scrollbar of up to 17 px counted, 672 px fits from 672 + 16 + 2 + 17 = 707 px, the threshold of `@media (width < 707px)` in `src/browser/run-screen.css`. The styleguide's rule "The scene of a map run" says the same, and adds the scrollbar to the arithmetic of the threshold. A line "Accepted with it" names the band where a browser with no classic scrollbar keeps the smaller scene.

Row 1 of the task holds: "największa całkowita skala, która się mieści" names no measure of the room, so "the place of the scene, a classic scrollbar counted" is a reading of "się mieści", not a new meaning. Item 5's "w szerszym oknie układu telefonu, które mieści 672 × 304 px" holds the same way. The opening of D-349 that `tests/view/world-area.test.mjs` and `tests/view/scene-picture.test.mjs` quote is unchanged (foundation check 0 errors).

### Minor 1 - fixed
D-349 *Verification*: "drawn whole at 336 × 152 px in the phone layout at a page area 360 px wide, its sides cropped slightly only where the place is narrower, …". This now matches the code.

### Minor 2 - fixed
D-311 *Rationale*: "the hover over a tile of the drawing and a tap on it (D-19) link with its row only while the table is picked".

### Minor 3 - fixed
`tests/view/run-screen.test.mjs:518` quotes "The drawing of the game map is a picture, not a control: its only interactions are hovering a tile", which is what the case holds.

### Minor 4 - fixed
The line `decision: D-297 …` of the case "„↓” on a group's header moves the group one place down …" in `tests/view/rule-editor.test.mjs` is gone.

### Minor 5 - fixed
`.end-window { max-height: calc(100svh - 220px) }` in the phone block of `src/browser/run-screen.css`, with the reason in its comment. The styleguide rule "The end-of-run window" names `svh` in the phone layout. D-370 ("up to a part of the height of the browser window") still holds. D-43 is no obstacle: `svh` is no length in `px`, `rem` or `em`, and `max-height` is a layout dimension; the token test passes. Firefox and Chrome have supported `svh` for several releases. Checked only in Chromium emulation, where `svh` equals `vh`; the fix report says so.

### Minor 6 - fixed for what the finding named; the residual is N-2
The finding named the hover backgrounds of `src/browser/styles.css` (`.menu-bar-item:hover`, `.button:hover:not(:disabled)` "and the other `:hover` backgrounds"). The new block `@media (width < 1280px) and (hover: none)` resets to `transparent`:
- `.menu-bar-item:hover`
- `.account-menu-panel-link:hover`
- `.button:hover:not(:disabled)`
- `.select-list:hover:not(:disabled)`
- `.input-field input:hover:not(:disabled)`

These are every `:hover` background of that file. I checked:
- Every control the block reaches has a transparent background at rest. No `.button` kind of `styles.css` or of a screen's stylesheet sets a background at rest: the button selected in its group and the main look set frame and text only, the secondary action is transparent. So the reset takes away no state colour.
- The selectors have the same specificity as the base hover rules and stand after them, so they win.
- The block applies only below 1280 px and only where the primary pointer cannot hover, so the computer layout and a mouse in a narrow window keep their hover. The fix report shows a positive control: the rule removed through the CSSOM brings the highlight back.
- jsdom does not apply the block (no `screen` in its media list). The styleguide's rule "Two layouts and one threshold between them" says that `hover: none` is no width threshold and no layout of its own.

The sticky highlight that stays is in the screens' stylesheets, which the finding did not name: `.maps-list-item:hover`, `.program-list-item:hover`, `.rule-list-header:hover, .rule-list-row:hover`, `.now-row[tabindex]:hover, .next-row[tabindex]:hover`. I judge it beyond the fix of this finding, as a note of its own (N-2 below), for two reasons:
- The finding placed the defect in `styles.css`.
- A tap on a rule row or a group header opens its panel, whose `open` state takes `highlight` anyway. The rule rows also carry state backgrounds (`winning`, `running`) that a blunt reset placed later would wipe; the fix report names this.

### Minor 7 - fixed
`.git-blame-ignore-revs` names `e8d0212793a1bb7cfb31b98087c45caffb8467f2` under "# A test case of JavaScript by Prettier 3.9.10". It is added in a later commit, as the rule of `guidelines/coding.md` asks, and Prettier is `3.9.10` in `package.json`. The slip of `ff645a68` was corrected by `83acc083`, with no rewrite of history.

### Minor 8 - fixed
Both pick-cell cases of `tests/view/shared-controls.test.mjs` now cite D-396 "In the phone layout every screen fits the width of the window with no scroll to the side and no text over the border of its frame". This is what their "Breaks" comments guard. The fix agent's reason against D-289 and D-290 holds: neither has a binding sentence on a name staying inside its cell. D-396's *Verification* gains a `tests:` clause that says what the two cases hold, and says it accurately. The assertions on declarations stay. The finding accepted that, since jsdom computes no layout; the browser checks of slices 11 and 19 hold the behaviour.

## New notes in the fix diff (Minor, blocking nothing)

- **N-1 (Minor) - D-396 *Rejected* gains two ways the writer derived.** The two ways are "every link held to the minimum, inside a running sentence too — the line of text breaks" and "a link inside a sentence left out of the minimum by the exception of WCAG 2.5.8 … — D-42 keeps four criteria …". `.the-way/elements/decisions/template.md:100-101` says "A way the writer derives … never enters it (WAY-134)". Line 106 says the *Rejected* of a decision marked `the cycle's` takes `unknown` unless a statement of the human names the ways weighed. Neither way comes from the human: the first came from my own recommendation in I-1, the second from the plan's *Choices* and the review. Read against that rule, the log claims the human weighed and refused them. The content agrees with the code, so it is a departure of form and Minor by WAY-364. The fix report's concern 1 already puts these ways before the human at the merge. If the human does not adopt them as their own, recommend dropping both from *Rejected* and leaving the rationale's reason, which is the cycle's and allowed there.
- **N-2 (Minor) - sticky `:hover` backgrounds in the screens' stylesheets.** The rules are `src/browser/maps-screen.css` `.maps-list-item:hover`, `src/browser/programs-screen.css` `.program-list-item:hover`, `src/browser/program-panel.css` `.rule-list-header:hover, .rule-list-row:hover`, and `src/browser/run-screen.css` `.now-row[tabindex]:hover, .next-row[tabindex]:hover`. On a touch screen they keep `highlight` on the row last tapped until the next tap: a row of the list of maps or programs after it leads to its screen, and „Teraz”/„Potem” after a tap scrolls the program. This is outside the fix diff and outside what Minor 6 named, so it does not reopen the review. A later change can add each screen's rows to a `hover: none` block in its own stylesheet. For the rule rows, the selectors must leave `winning`, `running` and `open` their backgrounds.

## Declined to judge

- How `svh` behaves on a real Chrome on Android: no real phone in reach, and question 5 of the task puts the real phone after the merge.
- Whether a touch-only device with a page area of 1280 px or more (a large tablet held sideways) should also drop the sticky hover. That device shows the computer layout, which the acceptance criterion keeps as before, and the fix report names it as its choice.

## Checks I ran

| Check | Command or method | Result |
|---|---|---|
| Head | `git rev-parse HEAD` | `83acc083729000e6c4c6dd093adef997dfad4b0c` |
| Foundation and citations | `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | exit 0, "0 errors" |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` (reviewed worktree) | exit 0, "0 error, 144 warn, 7 info" |
| Focused tests on head | worktree of `83acc083` in `.runs/review-fix/head`, `npm run build` (exit 0), then `node scripts/test-node-file.mjs tests/view/<f>.test.mjs` | run-screen 25/25, rule-editor 80/80, shared-controls 53/53, world-area 24/24, scene-picture 75/75; exit 0 each |
| Token and focus invariants | `python -B -m unittest discover -s tests/invariants -p "test_browser_view_*.py"` (head) | OK |
| Skill test | `python -B -m unittest discover -s tests/agent_workflow -p "test_loop2_play_skill.py"` (head) | OK |
| Skill copies | `cmp .claude/skills/loop2-play/SKILL.md .agents/skills/loop2-play/SKILL.md` | identical |
| Format | `node node_modules/prettier/bin/prettier.cjs --check` on `styles.css`, `run-screen.css` and the three changed test files (head) | all match |
| Backgrounds at rest under the hover reset | read every `background` of `src/browser/styles.css` and of the screens' stylesheets that touches a `.button` or a row | no control the reset reaches has a background at rest |

Not run: the full `npm test` (the orchestrator's gate); a browser session of my own. For the hover block and `svh` I rely on the fix report's browser checks, with its positive control, plus my reading of the cascade.

## Reaches beyond the dispatch

- `.the-way/task-cycle/review/fix.md`, read whole: the method of this variant.
- `.the-way/elements/decisions/template.md:86-111`: to judge the new *Rejected* of D-396 (N-1).
- `src/browser/styles.css:365-405`, `src/browser/program-panel.css:280-302, 408-416`, `src/browser/maps-screen.css:30-40`, `src/browser/run-screen.css:560-570`: to check what the hover reset reaches and what stays (Minor 6, N-2).

## Working copies

- `.runs/review-fix/head` (worktree of `83acc083`, with a junction `node_modules` to the reviewed worktree's `node_modules`): the junction removed with `rmdir` first (the reviewed worktree's `node_modules` checked intact, 268 entries), then the worktree removed with `git worktree remove --force` and `git worktree prune`.
- `.runs/review-fix` (build and test logs): removed.
- No remainder; nothing kept in `reports/`.

## Unread material

- The fix diff: read whole (all ten files).
- The fix report and the findings' text: read whole. `reports/findings-whole-review.md` itself was not opened: the orchestrator says it holds my findings copied in my words, and I judged each finding against my own report's text.
- D-396, D-349 and D-311: read in the changed paragraphs and the hunks' context in the diff. D-396's whole entry stands in the diff hunk. D-349 and D-311 were not re-read whole beyond what the hunks show.
- `guidelines/styleguide-browser-view.md`: read in the three changed hunks with their context, not whole.
- The rest of the decisions template (lines 1-85, 112 onward): not read.

## Searches not found or unclear

- Whether a mixed entry, made of a projected entry, rows of the task and the cycle's sentences, should give `unknown` for the cycle's part of *Rejected* beside the human's ways: the decisions template addresses an entry marked wholly `the cycle's` and says nothing of a mixed one (N-1).
