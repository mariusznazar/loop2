FAIL 5f5e008827df995c0707500ea9c177e3d7a4a8a4

# Review of the whole change - "loop2: uklad na telefon dla wszystkich ekranow gry"

- Variant: the whole change of a plan (20 slices, none reviewed on its own), method `.the-way/task-cycle/review/SKILL.md` with `whole_change.md`.
- Range: `0a2254cd3a6e53c5c569c18b24499fac68bdad6e..5f5e008827df995c0707500ea9c177e3d7a4a8a4`; `git rev-parse HEAD` of the worktree is the head given. `.the-way` at `80006b25feb4c5a6ffdb8f75d993051eecbc745d`, the pinned commit.
- Counts: 2 blocking (Important), 9 Minor within the task, 0 out of scope.

## Blocking findings

### I-1 (Important) - a link inside a running sentence is held to no touch target, while D-396 holds "every control" to 48 px and D-47 makes every link a control

- **Where:** `foundations/decisions.md` D-396, second paragraph ("Every control of the phone layout - a button, a cell of a pick, an arrow, an item of a menu - has a touch target at least 48 px high and 48 px wide"); `guidelines/styleguide-browser-view.md:598-601` (rule "Everything is done by touch, and every control holds the touch target", last bullet: "Odnośnik wewnątrz toczącego się zdania leży poza minimum ... a D-396 nazywa kontrolkami przycisk, komórkę wyboru, strzałkę i pozycję menu, nie odnośnik w zdaniu"), with the same rule's own sentence at `:585-586` "Kontrolką jest to, co reguła Visible focus nazywa kontrolką: każdy element, na który klawiatura wchodzi, odnośniki też"; `src/browser/styles.css` comment of the touch-target block ("A link inside a sentence is no such control and keeps its size"); `src/browser/credits.css` and `src/browser/maps-screen.css` phone blocks (the credits links and `maps-who-run-link` left under the minimum); `.claude/skills/loop2-play/SKILL.md` section "Check the phone layout" ("the source cited in D-396, not this list, says whether it counts"), and its copy in `.agents/`.
- **What is wrong:** D-47 (unchanged) defines a control of the browser view as "every HTML element the browser lets the keyboard reach, links included". D-396 as written by slice 1 holds "every control of the phone layout" to 48 × 48 px and carries no exemption; its dashes list examples, and nothing in it says the list is closed. The styleguide (slice 8, second commit `19034995`, the orchestrator's ruling Q6) exempts a link inside a running sentence and attributes that exemption to D-396, which does not say it; the cited source, the fact `android-touch-target-size`, does not exempt an inline target either (it exempts only precise input, mouse and trackpad), which is the plan's own condition for an exemption (plan, *Choices*: "a link inside a sentence only where the cited source does not exempt an inline target"). The skill still tells the agent that the source decides, so the three places give three answers.
- **Why it matters:** in the phone layout the player meets links under 48 px: the 44 links of the credits (16-33 px high, slice 20, observation 1) and `maps-who-run-link`, the link „...” in the sentence of a waiting manual map run on the card of a map, which leads to that map run (slice 17's concern; the menu bar's „Wróć do przejścia” is a 48 px way there too). A later task designing a screen by the styleguide follows the exemption; a reviewer holding the code to D-396 and D-47 finds every such link a violation. The ruling binds after the merge, yet the foundation the human approves says the opposite.
- **Evidence:** the texts quoted above; `foundations/decisions.md:5131` (D-47); `foundations/environment_facts.md` `android-touch-target-size` (both passages); slice 8 report, concern 1; slice 20 report, observation 1.
- **Slices:** spans slice 1 (`587f74f6`, D-396), slice 8 (`19034995`, the styleguide), slices 16 (`2b4bbeaa`) and 17 (`b5615e32`, the code that leaves the links), slice 6 (`ebe00ef2`, the skill).
- **Fix I recommend:** write the exemption into D-396 as a sentence of its own, marked the cycle's for the human (for example "A link inside a running sentence keeps the size of its text; a link that stands by itself as a control holds the minimum"), with its reason in the rationale and its rejected way ("every link held, inside a sentence too - the line of text breaks"), and bring the skill's sentence to it. The other way, holding every link to 48 px, would break the credits' lines.
- Contradiction: yes - D-396 (read with D-47), and the plan's *Choices* row on the touch target.

### I-2 (Important) - D-349 says the phone layout draws the larger scene wherever it fits the width of the page area; the code draws the smaller one below 707 px

- **Where:** `foundations/decisions.md` D-349, first sentence ("in the phone layout the larger of the two that fits the width of the page area, so 336 × 152 px at a page area 360 px wide"); `guidelines/styleguide-browser-view.md` rule "The scene of a map run" ("większy z dwóch, który mieści się w szerokości obszaru strony"); `src/browser/run-screen.css:1186-1217` (`@media (width < 707px)` and its comment).
- **What is wrong:** 672 px fits the width of a page area from 672 px up, yet the code draws 336 × 152 at every page area below 707 px. The comment says so itself: "A browser that draws no classic scrollbar, as a phone does, could hold 672 px from 690 px and draws the smaller size between the two". So in the band 672-706 px (690-706 px even counted against the scene's real place) the files do what D-349 forbids - the smaller scene where the larger fits. The threshold is a sound engineering choice (the world area's padding and frame, and a classic scrollbar of up to 17 px that a media query counts in the width); the decision's words do not say it.
- **Why it matters:** the decision is the binding text a later change of the scene or of the phone shell is held to; a reviewer measuring at 700 px finds a violation, and an agent "fixing" it to the decision's words lowers the threshold and crops the larger scene behind a classic scrollbar. The effect on a player is small (a smaller scene in a band of 35 px), the inconsistency in the foundation is not.
- **Evidence:** the two texts quoted; slice 15 report, concern 4.
- **Slices:** slice 2 (`66ce37c0`, the wording of D-349) and slice 15 (`5acdcdbb`, the threshold).
- **Fix I recommend:** D-349 names the place, not the page area: "the larger of the two that the place of the scene holds, a classic scrollbar counted in the width of the window", which stays within row 1 ("największa całkowita skala, która się mieści" names no measure of the place); the styleguide sentence follows.
- Contradiction: yes - D-349 (written by this change).

## Minor findings (within the task)

1. `foundations/decisions.md` D-349 *Verification*, complies: "drawn 336 × 152 px in the phone layout at a page area 360 px wide, its sides cropped slightly, the mage standing at the right edge ...". Since slice 15 the scene at 360 px is not cropped at all (place of 342 px for a picture of 336 px, `run-screen.css` comment of `.scene-place`); the example describes a state the product never shows. A later agent may read the crop as expected at 360 px. Fix: "drawn whole at 336 × 152 px ..., its sides cropped slightly only where the place is narrower". Slice 2/15.
2. `foundations/decisions.md` D-311 *Rationale*: "the hover over a tile of the drawing, and in the phone layout a tap on it (D-19), links with its row only while the table is picked". D-19 and the code give the tap in every layout (any touch pointer, `terrain-drawing.tsx` `onPointerUp`); the rationale restates it narrower. Fix: "and a tap on it (D-19)". Slice 1.
3. `tests/view/run-screen.test.mjs:518`: the hover case quotes D-19 through "its only interactions are hovering a tile and tapping it, ... which shows the hovered or the tapped tile", but holds hovering alone; the tap is held by the four new cases, which cite the second sentence. The quotation claims more than the case holds. Fix: cut it at "its only interactions are hovering a tile". Slice 3 (`0b99767b`).
4. `tests/view/rule-editor.test.mjs`, case "„↓” on a group's header moves the group one place down and hands the group as the hint of the move": its second line `decision: D-297 "„↓” on the last program rule of a rule group moves it to the start of the next group"` cites a decision about a rule at the edge of a group, which the case (a group swapping with its neighbour) does not hold. Fix: drop the line. Slice 13 (`48bbe99c`).
5. `src/browser/run-screen.css:505-523`, `.end-window { max-height: calc(100vh - 220px) }` in the phone layout. It stays within D-370 ("up to a part of the height of the browser window"; the value stands in the rule `end-window` in `vh`, as the styleguide asks), so it is no departure. But on Chrome on Android `vh` is the height with the address bar hidden, and the page is at its top when the window opens (D-370), so the bar is shown: by the comment's own arithmetic the window then ends about 8 px below the visible edge, and with the row of warnings (a failed save, D-208) about 56 px below it, its buttons with it - the "violates" example of D-370. Measured only in Chromium emulation, which has no dynamic bar. Fix: `100svh` (Chrome 108+, Firefox 101+) in the phone block. Slice 19 (`5f5e0088`).
6. `src/browser/styles.css` `.menu-bar-item:hover`, `.button:hover:not(:disabled)` and the other `:hover` backgrounds: on a touch screen the background `highlight` stays on the element last tapped (slice 20, observation 4, „Mapy” after a tap). With D-44 the destructive button now takes `highlight` under the pointer too, so after a tap on „Usuń” the next row's button that slides under the finger may stand highlighted. A phone-layout block `@media (hover: none)` that drops the hover background, or the hover rules under `@media (hover: hover)`, leaves the computer layout as it is. Slices 7/10.
7. `guidelines/coding.md`, rule "Reformatting commits": `e8d02127` is a commit of formatting alone, and its hash is not in `.git-blame-ignore-revs`. Two lines of a test, so the cost is small; adding the line in a later commit, or folding the formatting into `f40ec226` before the merge, keeps the rule. Slice 11.
8. `tests/view/shared-controls.test.mjs`, case "the stylesheets let the name of a pick cell wrap beside its icon and break where no space helps": it asserts declaration values (`inline-flex`, `wrap`, `break-word`, `min-width 0`, `flex-shrink 1`), so a correct rewrite of the cell (for example a grid with `min-content` columns) fails it - an implementation detail by `guidelines/testing.md` "Behaviour, not implementation". jsdom computes no layout, so no behavioural test exists at this level; the browser check holds the behaviour. The two new cases also carry no `// decision:` line where the file's other cases do (D-289, D-290 would fit). Slice 11.
9. The orchestrator's choice Q3 (48 px from Android's guidance) and `src/browser/AGENTS.md` ("A value the token file does not hold yet ... enter it only with their source settled with the human"): the task's answer to question 7 settles "a value from a source with a quotation" and the token's `Source:` quotes it, so I find no breach; the choice of Android's 48 dp over another source (Apple's 44 pt, WCAG 2.5.5's 44 CSS px) is the cycle's and the request has to put it before the human, as the handoff says it does. Listed here so it is not lost.

## Declined to judge

- The accessible names „Grupa w górę” / „Grupa w dół” repeating on every group's header with no group's name: D-42 keeps four criteria of WCAG and no criterion of names; the rule's arrows already repeat their names the same way.
- The table of revealed tiles drawn as blocks and flex rows in the phone layout (`styles.css`), with the empty last `th` hidden: table semantics in engines other than Chromium are a matter of WCAG 1.3.1, which D-42 does not keep.
- The size of the badge over the mage's head against the mage at 1× (slice 20, observation 3): the plan's *Choices* leave that look to the human on the screenshot.
- The long owner list at 360 px (about 1300 px for four accounts): it fits and nothing scrolls; its density is the look of a screen, not a requirement of the task.
- Firefox, Edge and a real phone: outside an agent's reach by D-396; question 5 puts the real phone after the merge.

## Checks I ran

| Check | Command or method | Result |
|---|---|---|
| Head and pin | `git rev-parse HEAD`, `git -C .the-way rev-parse HEAD`, `git ls-files --stage -- .the-way` | `5f5e0088...`, `80006b25...` both |
| Foundation and citations | `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | exit 0, "0 errors" |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` (reviewed worktree) | exit 0, 0 error, 144 warn, 7 info |
| Sizes of changed files | `python -B .the-way/task-cycle/change_file_sizes.py 0a2254cd 5f5e0088` | exit 0; +1597 lines over 40 files; largest growth `guidelines/styleguide-browser-view.md` +188, `run-screen.test.mjs` +163, `styles.css` +161, the two skill copies +162 each |
| Size invariant on base and head | `node tests/quality/eslint-size-rules.mjs <worktree of base>` and `<worktree of head>` | exit 0 both: "0 functions and files over a threshold" in 346 and 347 files; the change pushed nothing over a threshold (`RuleListView`, `program-editor.ts`, `scene.tsx` stay under) |
| Focused view tests on head | `npm run build`, then `node scripts/test-node-file.mjs tests/view/<f>.test.mjs` for group-arrows, rule-editor, run-screen, shared-controls, world-area, tile-list, program-editor, scene-picture, item-verb-panel, headquarters-screen, program-list, scene, program-panel | exit 0 each (run-screen 25/25, rule-editor 80/80) |
| Skill and token invariants on head | `python -B -m unittest discover -s tests/agent_workflow -p "test_loop2_*skill.py"`; `... -s tests/invariants -p "test_browser_view_*.py"`; `... -p "test_design_token_sources.py"` | OK: 23, 16 and 2 tests |
| Skill copies | `cmp` of `.claude/skills/{loop2-play,loop2-scene-art}/SKILL.md` with `.agents/...` | identical |
| Thresholds | `git grep -n "@media" -- src/browser/*.css` | only `width < 1280px`, `width < 707px` and `prefers-reduced-motion`; no 720 or 1074 left in rules |
| `.playwright-cli/` ignored | `git check-ignore -v` on a file I made there and removed | ignored by `.gitignore:6` |
| Screenshots of slice 20 | downloaded `09-run-discovery-360`, `12-run-pick-czynnosc-1100`, `07b-programs-editor-360`, `11-owner-accounts-360`, `10a-end-window-death-360`, `05b-postac-tree-open-360`, `06b-mapy-card-360`, `04-siedziba-360`, `03-menu-konto-360` from `mariusznazar/screenshots@e8a16687`; looked at 09, 12, 07b, 11, 10a, 06b | no side scroll and no text over a frame in what I looked at; at 360 the scene whole with the mage, the badge and three plaques; at 1100 every cell of „Czynność” holds its name; header arrows of groups enabled/disabled as D-288 gives; destructive buttons red at rest. Not looked at: 04, 03, 05b (downloaded, not opened) and the other 13 files |
| Source fidelity of D-396 | read the projected entry in `definicja_projektu_2_loop2.md:374-393` (the folder the key `projects` names) | the committed D-396 is the projected entry word for word, with the sentences of rows 5 and 6, their rationale, rejected ways and examples added |

Not run: the full `npm test` (the orchestrator's gate); `tests/quality/test_quality_invariants.py` (needs `.runs/quality-venv` in a worktree; the gate runs it); StrykerJS on `src/browser/sim/data/scene.ts` (the change there is a comment alone). The real tap events were not driven by me in a browser; I judged the tap from the code and the jsdom cases, and the executors' browser walks.

## Coverage of the task

- To do 1: one threshold of 1280 px in every rule (`git grep` above), the run screen's two columns the base and one column a phone block; D-396 and the styleguide say it. Met.
- To do 2: every listed screen measured at 360 px by slices 16-20, screenshots of each; the table of tiles wraps (slice 19), the list of accounts fits with no change (slice 16). Met, with I-1 for links in sentences.
- To do 3: the loop by taps in slice 20, two steps on composed states (earning loop on a solved map, return after hours), with the reasons given. Met.
- To do 4: `8591aa82` taken over; screenshot 12 at 1100 px. Met.
- To do 5: two sizes, nothing cropped at 360 px, small elements of their own size (the plaques of a discovery 20 px at 1×). Met, with I-2 and Minor 1.
- To do 6: `moveGroup`, `groupArrows`, header arrows on both screens, cases written red-first (slice 12, 13 reports). Met.
- To do 7: tap marks, tap elsewhere takes off, mouse click marks nothing, hover stays (`terrain-drawing.tsx`, `run-screen.tsx`, four cases). Met.
- To do 8: `.button.destructive { color: var(--danger) }` outside any block, case in `shared-controls`. Met.
- To do 9: the token, the shared-control block and the screens' blocks; the value cited. Met but for I-1.
- To do 10: the styleguide's four new rules and the follow-ups. Met, with I-1.
- To do 11: section "Check the phone layout" in both copies, the phone config file. Met.
- To do 12: 22 screenshots in `mariusznazar/screenshots`, as D-418/D-419 give; the description is the orchestrator's.
- Acceptance at 1280 × 720: every rule outside a phone block is either an item 6-9 change (the destructive button, the arrows, the tap handlers) or keeps its look at 1280 px (the pick cell, checked by slice 11 at 1280 x 720; the run grid moved to the base; the scene's place). Slices 7, 9, 10, 11, 16 and 19 compared screenshots before and after at 1280 × 720; I did not repeat it.
- Settlements rows 1-6: row 1 in D-349 (I-2 on its wording), row 2 in D-288, row 3 in D-19, row 4 in D-44, rows 5 and 6 in D-396 (I-1 on row 6's reach). No meaning moved beyond a row but the cycle's clauses each slice report names (D-19's line under the drawing, Q5; D-396's 48 px, Q3; D-372's thickness).
- *Decisions in play* D-295, D-297, D-41, D-70, D-42, D-166, D-417-D-419 unchanged in the diff.

## Reaches beyond the dispatch

- The projected D-396 in the author's notes, `the approved definition of project 2 (a note in the author's folder of projects):374-393`, found through `~/.the-way/locations.json` key `projects` under `loop2`: to judge the fidelity of D-396 to its source.
- `foundations/decisions.md` D-42-D-48 (5052-5158), D-297 (9538-9569), D-421 (4852-4866), read whole: D-47 for I-1, D-297 for Minor 4, D-421 for the place of the table's rules.
- `src/browser/view/tile-list.ts` (`tileLine`), `src/browser/view/maps-screen.tsx:505-527` (`RunWaitingNote`), the lines `<a` of `src/browser/view/`: to judge a tap on an unrevealed tile and which links stand in sentences.
- `tests/quality/eslint-size-rules.mjs` (head) and `tests/quality/test_function_and_file_size.py` (head): to run the size rule on the base and head worktrees.

## Working copies

- `.runs/review-whole/base` (worktree of `0a2254cd`) and `...\review-whole\head` (worktree of `5f5e0088`, with a junction `node_modules` to the reviewed worktree's `node_modules`): the junction removed with `rmdir` first (the reviewed worktree's `node_modules` checked intact), then both removed with `git worktree remove --force` and `git worktree prune`.
- `...\review-whole\shots\` (nine downloaded PNG files, opened as images only): removed.
- `...\review-whole\` (the decision index `index.md`, `sections.md`, the build and test logs): removed before returning.
- `.playwright-cli/x.js` (an empty file to test the ignore rule): removed with its directory.
- No remainder. I kept nothing in `reports/`.

## Unread material

- Decisions: the index of my selection (`decision_index.py` with the sections "Browser view: screens, navigation and their code", "Look of the browser view ...", "Program editor", "Screen of a map run and the end-of-run window", "Scene", "Screen Mapy and Siedziba", "The gate, test tools and the local start", the parts browser-view, simulation, agent-workflow, product-foundation, and D-396, D-19, D-41, D-70, D-297, D-295, D-336, D-39, D-47) holds 119 decisions in full and about 270 by heading. **I read 10 decisions whole: D-42, D-43, D-44, D-45, D-46, D-47, D-48, D-297, D-421 from the log, and D-396 (its whole entry stands in the diff and in the projected source).** Of the index I read the binding sentences of lines 140-269, 354-413 and 598-687 (D-265-D-447, D-271-D-279, D-396, D-311-D-385) and the list of headings; lines 6-139, 270-353, 414-597 and 688-789 of the index not read.
- Decisions that bear on the change and that I did not read whole, only their binding sentences in the index and every changed line with its context in `git diff --word-diff`: D-280, D-282, D-311, D-370, D-389, D-416, D-44 (read whole, above), D-19, D-288, D-349, D-372. Their rationale and *Rejected* I read only where the diff showed them. Not read at all: D-41, D-70, D-295, D-166, D-417, D-418, D-419, D-420 beyond their index lines or headings.
- Guidelines: `guidelines/coding.md`, `guidelines/testing.md`, `src/browser/AGENTS.md` read whole. `guidelines/styleguide-browser-view.md` (1456 lines) not read whole: read its diff (every added and changed line with context) and lines 1272-1306 ("The end-of-run window"). `guidelines/coding-browser-module.md` read lines 96-238 (its rules), not its kind table and examples. `guidelines/coding-simulation-module.md` and `guidelines/coding-content-data.md` not read (the change to `src/browser/sim/data/scene.ts` is a comment alone).
- Invariants, part map and glossary of the touched parts: not read; the invariant tests of the token values, the focus outline, the token sources and the size rule were run instead.
- Reports: slices 1, 2, 7, 11, 16, 19, 20 read whole; slices 3, 4, 5, 6, 8, 9, 10, 12, 13, 14, 15, 17, 18 read in their status line and their sections of concerns, questions and problems only.
- The diff: the view code, the stylesheets, the foundation, the styleguide and the tests `run-screen`, `shared-controls`, `group-arrows` and `rule-editor` read in full; `.claude/skills/loop2-play/SKILL.md` read in its added lines up to "Go back to 1280 × 720 px" (about 120 of 162); `loop2-scene-art`, `world-area.test.mjs`, `tile-list.test.mjs`, `item-verb-panel.test.mjs`, `program-editor.test.mjs`, `scene-picture.test.mjs`, `program-list.test.mjs`, `headquarters-screen.test.mjs` diffs not read (comment lines and the `nameOf` helper by the slices' reports; their tests pass).
- Screenshots: 13 of the 22 files not downloaded, 3 downloaded and not opened (above).

## Searches not found or unclear

- `python -B .the-way/elements/common/decision_index.py --decision 396` refused ("no decision 396"); the switch takes `D-396`. Not a fault of the product.
- `python -B -m unittest tests.agent_workflow.test_loop2_scene_art_skill` from the root fails to import `scene_art_support`; the tests run by discovery in their directory (as the gate runs them). Not a fault of the change.
- `.the-way` is not initialized in a fresh worktree of the head, so `check_instructions.py` ran in the reviewed worktree, whose tree is the head.
- Whether the plan's condition on inline links ("only where the cited source does not exempt an inline target") was meant to be read against WCAG 2.5.8's inline exception rather than the cited Android source: unclear; the cited source is Android's, which has none (I-1).
