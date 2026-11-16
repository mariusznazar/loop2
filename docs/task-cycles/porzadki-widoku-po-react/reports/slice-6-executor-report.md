# Report — slice 6 (slice-6-executor): the stylesheet split, part 1

**Status:** done with concerns (the concerns are the choices below that the plan did not settle; none blocks the slice).

**Commit:** `581d09bb` `refactor: :recycle: split the rules of Przejście, the program panel and Programy out of styles.css` (base `f515ac66`, one commit, nothing pushed).

**Files changed** (`git diff --minimal --numstat f515ac66 HEAD`):

| File | Added | Removed |
|---|---|---|
| `src/browser/styles.css` | 8 (its head comment) | 1976 |
| `src/browser/run-screen.css` (new) | 1459 | 0 |
| `src/browser/program-panel.css` (new) | 477 | 0 |
| `src/browser/programs-screen.css` (new) | 55 | 0 |
| `src/browser/index.html` | 3 (three `<link>`s after `/styles.css`, in the order `run-screen.css`, `program-panel.css`, `programs-screen.css`) | 0 |

`styles.css` went from 3406 to 1438 lines. 418 top-level units before; 200 + 142 + 70 + 6 after. The files were written by a script (`split.mjs` in the evidence directory) that moves each rule whole with the comment standing over it, in order; nothing was typed by hand except the four head comments.

## Checks (command, exit code)

| Check | Result |
|---|---|
| `node .runs/slice-6-executor/order-check.mjs …` (kept as `reports/slice-6-executor-evidence/order-check.mjs`) | exit 0, see below |
| `npm test -- tests/view/scene.test.mjs` | exit 0, 71 pass |
| `npm test -- tests/view/world-area.test.mjs` | exit 0, 22 pass |
| `npm test -- tests/view/run-header.test.mjs` | exit 0, 24 pass |
| `npm test -- tests/view/rule-signs.test.mjs` | exit 0, 6 pass |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | exit 0, 3 OK |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | exit 0, 4 OK |
| `npm test -- tests/invariants/test_application_build_output.py` | exit 0, 7 OK |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | exit 0, 3 OK |
| `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/*.css src/browser/index.html` | exit 0 (run before the commit) |
| `python -B .the-way/elements/common/foundation_check.py` (not in the slice's checks, run for the new files) | 1 error, the known one at `tests/view/run-screen-state.test.mjs:309`; no new error, so the three new files are claimed by the part `browser-view` |

No test is new or changed, so no failing-first run of a test applies; the invariants' tests already held and still hold on the three new files (the focus test and the token test read every `.css` directly in `src/browser/`). I did not run the product's gate (`npm test` without a file).

### The order script (`order-check.mjs`, base text kept as `styles-base.css`, after text read through `gameStylesheetNames()` of `tests/view/game-stylesheets.mjs`, so in `<link>` order)

1. **Rules in one and not the other: 0.** 444 style rules and at-rules (nested ones counted one by one, with their `@media` / `@starting-style` conditions) in the base and 444 after; compared as a multiset, comments left out, white space normalised.
2. **Pairs whose order changed, with the same specificity and a common property: 6961.** Rules of `run-screen.css` that stood before rules of `styles.css` now stand after them (2385 pairs); `program-panel.css` after `run-screen.css` (1583) and after `styles.css` (2398); `programs-screen.css` after `program-panel.css` (149), `run-screen.css` (174) and `styles.css` (272). Judgement, each pair by the first reason that applies:
   - **18 pairs**: the subjects (the rightmost compounds) name different element types, so no element carries both.
   - **6935 pairs**: no `.ts` or `.tsx` file of `src/browser/` gives an element the classes of both selectors (a file "gives" a class where the class is a quoted string on a line that speaks of a class; for a subject with no class, as `.trip-entry > *`, the classes of its ancestors count). The two selectors belong to different parts. Among them are all pairs of the legacy rows `.rule`, `.rules`, `.rule > *`, `.trip-editor h3`, `.trip-entry > *` with rules of other parts; no file gives an element the class `rule`, `rules`, `rule-group`, `group-condition`, `rule-group-header`, `trip-editor` or `program-switch`, so no element carries them.
   - **8 pairs judged by hand** (the script could not exclude them):
     - `.chronicle-minute` (`run-screen.css`, `color`) against `.trip-warning` (`styles.css`, `color`): `.chronicle-minute` is a `span` (`end-window.tsx:164`, `tabs-area.tsx:80`) and `.trip-warning` a `p` (`end-window.tsx:238`, `run-header.tsx:133`, `maps-screen.tsx:328`); no element carries both.
     - seven scene rules (`.scene-mage[data-bending] .scene-mage-bend`, `.scene-mage[data-bending] .scene-mage-idle`, `.scene-creature:not([data-scuffling]) .scene-creature-bite`, `… .scene-creature-idle`, `.scene[data-standing="dead"] .scene-mage-death`, `… .scene-mage-idle`, `.scene[data-standing="going"] .scene-badge-fill`; `display` or `width`) against `.terrain-drawing .icon .icon-mask` (`styles.css`): the target of the last is the `span.icon-mask` inside the drawing of the map (`terrain-drawing.tsx:51,103`, in `div.world-drawing`, which `world-area.tsx:111` places after `<Scene>` at line 75), and no scene element is inside the drawing; the scene elements carry no `icon-mask` (the badge and the plaques do, with other selectors, not in these pairs).
   - **Dynamic evidence for all 6961 (2c): 0.** The page of each of the 12 recorded states (11 game states and the kitchen-sink page) was loaded into jsdom, state pseudo-classes and pseudo-elements left out of the selectors so that the match is a superset; no element in any of them matches both selectors of any listed pair. (The hidden screens stand in the DOM, so Programy is in the Przejście pages and the reverse.)
3. **Moved rules and the kitchen-sink page: 0 selectors of the 296 selectors of the three files match an element of the kitchen-sink page** (page DOM recorded from the real page), and **0 selectors have every class given an element by `kitchen-sink.tsx` or `kitchen-sink.css`.**
4. **What the recorded game pages do not exercise:** 95 of the 296 selectors match no element of any recorded game page (`UNMATCHED` lines of `order-report.txt`). These are covered by the script alone, not by the game: the wolf, the flight of an icon, the specks and the dust of the scene, the burning fire, the walk and the return of the tint (a paused run holds no motion), the cold layer and the frost's moments, the chronicle's entries and their roles (a loaded save carries no events), the discovery inside the end-of-run window, `.end-window-minutes`, `.end-question-note`, `.now-text.warning`, `.run-header-requirement.positive`, `.rule-list-row.running`, `.rule-list-header.open`, `.rule-list-header.bar-unmet`, `.rule-list-empty`, `.drop-line`, `.program-name` (the name field of „Zmień nazwę”, not opened) and `.copy-save .copy-line`; and the undrawn legacy rules named below.

### The real-game comparison

Before changing any file I started the game at the slice's base with `npm run local`, and recorded with Playwright CLI the computed style (all properties) of every element of the page and of its `::before` and `::after` that has content, keyed by the element's place in the tree with its classes. After the commit's tree I started it again and recorded the same states. Viewport 1280 × 720. The saved documents were composed with the functions of the built simulation (`compose.mjs`) and sent by the ordinary save request, as the skill gives; the account has the previous-save privilege, granted with the operator command `node dist/server/account-previous-save.js grant` on the database of the local start, so that „Zacznij od zera” stands on Programy.

- **Noise:** two recordings at the base, one after the other, differ in **0** values: the recording is deterministic (the paused run keeps animations at their start).
- **States (12 recorded):** Przejście of a paused map run with „Kronika” (`run-kronika`) and with „Teren” (`run-teren`), with a rule panel open and its pick of the action open (`run-rulepanel`), with the band of a discovery (`run-discovery`), with the question „Zapisać, odrzucić, wrócić?” standing (`run-question`), with the end-of-run window after a death by cold (`run-death`) and after a completion (`run-completion`); Programy with a program shown (`programs`), with the confirmation of „Zacznij od zera” (`programs-reset`), with its trip plan open (`programs-trip`) and with a rule panel open (`programs-rulepanel`); the kitchen-sink page.
- **Result:** in the **11 game states, 3 differences each, the same three**: the three new `<link>` elements of `html > head` (`link:6`, `link:7`, `link:8`) exist after and not before. **Every other element, every property, every `::before` and `::after` is identical** (the one normalisation: the icon masks carry the address of their start, so `127.0.0.1:<port>` is read as the same). In the **kitchen-sink page, 873 differences, all one**: `--tint: "0" -> undefined` on every element. The rule `@property --tint` stands now in `run-screen.css`, so the page, which links `tokens.css`, `styles.css` and `kitchen-sink.css` alone, no longer registers `--tint`, whose initial value 0 every element then reports. Nothing on the page reads `--tint` (no `.scene-tint`, nothing in `src/browser/kitchen-sink/`), so the player sees nothing; the plan puts `@property --tint` in `run-screen.css`.
- **States the local start did not reach in the game** (their rules covered by the script alone, as item 4 above): a run in motion (walk, flight, dust, specks, the wolf), the chronicle's entries, the name field of „Zmień nazwę”, the frost and the cold layer in motion, and the hover and focus states of the moved controls (the recording takes the page at rest; state pseudo-classes are not entered).

The kitchen-sink page was recorded from `node scripts/kitchen-sink.mjs --build-only` served by a ten-line static server of mine (`express.static` over `dist/kitchen-sink/`, port 8765), because `npm run kitchen-sink` opens the default browser of the computer; it serves the same files.

### Own-work check (requirement most likely unmet)

*The requirement:* „the player sees each screen as before the split”, most at risk through the cascade — a rule that is not linked, or two rules of one element whose order flipped. *The checks:* (a) the multiset (nothing lost), (b) the order pairs with DOM evidence, (c) the 11-state comparison, and (d) a break test of the tests that read the stylesheet through the helper: with the `<link>` of `run-screen.css` taken out of `index.html`, `npm test -- tests/view/scene.test.mjs` exit 1 (15 of 71 fail) and `tests/view/run-header.test.mjs` exit 1 (3 of 24 fail); with the `<link>` of `program-panel.css` taken out, `tests/view/rule-signs.test.mjs` exit 1 (1 of 6 fails). `world-area.test.mjs` exited 0 with the `run-screen.css` link out (it reads no rule that moved); with the links back, all four exit 0. The `index.html` was restored from a copy and the diff against the commit is empty. *What it showed:* nothing is missing and no listed pair is carried by one element; the tests of the stylesheet notice a missing link.

## Mismatches between the plan and the code, and choices the plan did not settle

1. **A rule that reaches the scene and the camp of Siedziba.** The `@media (prefers-reduced-motion: no-preference)` block of the scene's motion (base lines 2585–2754) holds the selector list `.scene-mage-sprite img, .scene-fire[data-burning="true"] img, .camp-member img, .camp-fire img`, the frames of the scene's sprites and of the camp's. A rule moves whole, so the whole block, with its comment („The camp's fire and the idle sheet of each character in it run at this beat too”), went to `run-screen.css`; the camp's animation now stands in the file of Przejście, linked on the same page, so Siedziba looks as before. **For Slice 7:** Siedziba has no stylesheet of its own yet and, when it gets one, it depends on `run-screen.css` for the frames of the camp unless the list is split (a change of selector, which the slice forbids). Rejected: leaving the block in `styles.css` (then the scene's motion would stay in the shared file) and splitting the list (changes a selector). Cost if wrong: a later slice moves one rule.
2. **`.trip-warning` stays in `styles.css`.** It is drawn by `run-header.tsx` and `end-window.tsx` (Przejście) and by `maps-screen.tsx` (Mapy, whose rules stay for Slice 7), so no file of this slice is its part and the shared file is where both screens can read it. Rejected: `run-screen.css` (Mapy would read a file of another screen). Cost if wrong: Slice 7 may move it to a shared place.
3. **Rules whose classes no file draws moved with the part their comment, or their neighbours, name** (nothing deleted): to `program-panel.css`, `.program-switch` (its comment names the list's actions of the panel), and, with no comment of their own, `.rule-group`, `.trip-editor`, `.trip-editor h3, .trip-editor h4`, `.trip-editor section`, `.rule-group-header, .group-condition`, `.rule-group-header input`, `.rules`, `.rule`, `.rule > *`, `.rule input[type="number"], .group-condition input[type="number"]` — remains of the editor built by the DOM, among the rules of the trip plan and the rule list. No `className` anywhere in `src/browser/` gives an element these classes (words `rule` and `rules` stand in `.ts` as kinds and properties only; checked with the class-token search of the script and by `grep` of `className`).
4. **`.program-list, .program-actions, .program-name`** is one rule whose classes are drawn by `program-panel.tsx` (the list „Program:” of the copy) and `program-list.tsx` (Programy's actions and name field); it reaches two of the three parts and the panel is what they share, so `program-panel.css`. The confirmation of „Zacznij od zera” (`.program-reset-confirm`, `.program-reset-text`) and the list of programs (`.program-list-items`, `.program-list-item`) are drawn by `program-list.tsx` alone, so `programs-screen.css`.
5. **Single-screen rules found outside the stretch the plan names:** `.run-practice` (base line 1555, among the headquarters) and `.trip-result` (base line 1063, among the trip rules; drawn by `world-area.tsx` alone) went to `run-screen.css`; `.world-drawing` and `.tile-line` (base lines 2886–2895, drawn by `world-area.tsx` alone) went to `run-screen.css` too, while `.terrain-drawing` and `.tile-list`, which the kitchen-sink page draws, stay.
6. **The pointers inside comments are not updated** ("the rule above", "below", "(above)", the `.screen` comment's „own, below”): rules move whole with their comments, and the plan's Slice 8 holds the comments (To do 6). The styleguide's sentences that name `src/browser/styles.css` for the scene's rules and the window's rules are likewise Slice 8's.
7. **Wiedza** (`knowledge-*`) was not touched, as the handoff says.
8. `dist/kitchen-sink/` now holds `run-screen.css`, `program-panel.css` and `programs-screen.css`, because the build copies every `.css` directly in `src/browser/`; the page links none of them and `test_application_build_kitchen_sink.py` passes.
9. The plan's tables of line numbers of the task and of the foundation differ from the file in some places; the handoff's current ranges were used for the decisions. Nothing else differed.

## Problems seen

- A stray file `nul` appeared in the worktree root: my own `compare-styles.mjs` was given `/dev/null` as its report path and Node on Windows made a file of that name. Removed with `rm -f nul` (it was untracked; `git status` is clean).
- `playwright-cli open` run from a directory other than the root lacks the setting for the certificate (`.playwright/cli.config.json` is found from the working directory): a session opened from `.runs/slice-6-executor/` failed with `ERR_CERT_AUTHORITY_INVALID`; I reopened it from the root. Verified by the two outcomes, not by reading the tool.

## Reaches beyond the handoff

- `src/browser/view/*.tsx`, `src/browser/kitchen-sink/kitchen-sink.tsx`: read by search and by lines to find which file draws a class (the rule of the plan: where the classes are drawn). Why: placement.
- `tests/sim/understanding-fixture.mjs`, `tests/sim/program-fixture.mjs`, `tests/sim/acceptance.test.mjs`, `src/browser/sim/game.ts`, `src/browser/sim/saved-game.ts` (by search): how to compose a document of a run that ends in a completion; the first try, with a streak above the minute, is refused on load (`streak > minute`), so the composer lowers the solving condition of the map in its own process alone (`MAPS.forestEdge.solving.streak = 5`) and the page loads the document with the real condition (the load checks shape, not the goal).
- `src/server/account-previous-save.ts`, `scripts/local-start.mjs`, `scripts/kitchen-sink.mjs`, `scripts/static-files.mjs`: to give the test account the previous-save privilege and to build the kitchen-sink page without opening a browser. The operator command ran on the database of the local start only.
- `.runs/task-cycles/…/reports/slice-2-executor-evidence/compose-live.mjs` and `compose-ended.mjs`: read as the handoff offers; not reused as they stand.

## Unread material

- `guidelines/testing.md` and `.the-way/task-cycle/change/ui_check.md`: not read; the slice writes no test, and it changes no look (the comparison shows none), so neither was needed. The screenshot I took once to see a state was deleted; none stays.
- `task.md` itself: not opened; the passages of the task were read as the handoff carries them word for word.
- Every other file, entry or passage the handoff names was read whole: `.the-way/task-cycle/change/SKILL.md` and `slice.md`; D-265, D-47, D-43, D-28, D-45, D-32, D-417, D-420, D-421 at the handoff's ranges; the four invariants and `part_map.md:3-28`; `guidelines/coding.md`, `guidelines/styleguide-browser-view.md` (both halves), `src/browser/AGENTS.md`, `.claude/skills/loop2-play/SKILL.md`; `scripts/static-files.mjs`, `src/browser/kitchen-sink/index.html`; `tests/view/game-stylesheets.mjs`; `src/browser/styles.css` whole before the change.

## Searches not found or unclear

- A comment that names the part of `.rule-group`, `.trip-editor*`, `.rule`, `.rules` and their neighbours: **none** (point 3); I took the neighbouring rules and the editor's domain.
- Whether a selector list that reaches two parts (point 1) may be split: the slice says „no selector changes”, so I did not; unclear whether the author would have preferred a split with a changed selector.
- Where `.trip-warning` should live once Mapy has its file (point 2): not stated in the plan.

## Working copies

- `.runs\slice-6-executor\` (scripts, saved documents, recordings of about 15 MB each, logs, the base copy of `styles.css`): **removed** before I returned. What the report needs stays in `.runs\task-cycles\porzadki-widoku-po-react\reports\slice-6-executor-evidence\` (ignored by git): `order-check.mjs`, `compare-styles.mjs`, `gen-driver.mjs`, `compose.mjs`, `split.mjs`, `analyze.mjs`, `record-all.sh`, `heads.json`, `order-report.txt` (the full output of the order script, with the 95 unmatched selectors and the 8 pairs), `diff-before-after-summary.txt`, `placement-analysis.txt` (every unit of the base file with the files that draw its classes). The scripts are not part of the change.
- `.playwright-cli\` (the CLI's own session files in the worktree root, one screenshot of mine deleted at once): **removed**.
- The local start and the static server of the kitchen-sink page were stopped (`npm run local:stop`, "Local starts stopped: 1"; the node process of the static server killed). `dist/` and `.runs/local-start/` are products of the game's own tools and stay.
