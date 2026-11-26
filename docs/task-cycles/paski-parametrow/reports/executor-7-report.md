# Executor report — slice 7 — the explanation of a value under the cells

**Status:** done with concerns

**Commits:** `a7a0108a` on `task/paski-parametrow`, on top of `d5dcff73`. One commit, three files, added by path.

**Files changed**

| File | Added | Removed | Note |
|---|---|---|---|
| `src/browser/view/body-row-cells.tsx` | 47 | 10 | open state in `BodyRowCells`, toggle on the three buttons, explanation line between the cells and the backpack |
| `src/browser/run-screen.css` | 16 | 1 | `.body-explanation` rule in the body-row block; one comment line of the block updated |
| `tests/view/body-row-explanation.test.mjs` | 162 | 0 | new, four cases |

## Checks

Each command was run from the worktree root; exit code as printed.

| Check | Command | Exit | Result |
|---|---|---|---|
| New cases, before the component change (first failing) | `npm test -- tests/view/body-row-explanation.test.mjs` | 1 | 3 fail on assertions: satiety click (`expected "false", got null` on `aria-expanded`), switch between cells (`null` textContent), open state kept on redraw (`null` textContent). The fourth, health, passes at base (see below). |
| New cases, after the change | same | 0 | 4 of 4 pass (rerun after the formatter, same result) |
| Body row cases | `npm test -- tests/view/body-row-cells.test.mjs` | 0 | 9 of 9 |
| World area cases | `npm test -- tests/view/world-area.test.mjs` | 0 | 19 of 19 |
| Typecheck | `npm run typecheck` | 0 | |
| Token values invariant | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | 4 tests OK |
| Quality invariants | `npm test -- tests/quality/test_quality_invariants.py` | 0 | 8 tests OK |
| Formatter, first pass | `npx prettier --check src/browser/view/body-row-cells.tsx tests/view/body-row-explanation.test.mjs` | 1 | only the new test file: layout |
| Formatter, after `npx prettier --write` on the test file | same | 0 | all files use Prettier style |

The health case passes at base because health is already a plain block with no button; it is a guard case, not a failing-first case. The full gate was not run (the handoff keeps it for the orchestrator). `foundation_check.py` is not among this slice's checks and was not run.

## Own-work check (SKILL section 3)

- Requirements my work most likely misses: (a) at most one explanation open at a time, with a click on a cell that is already open closing it; (b) the explanation stands right under the four cells, above the backpack, in both layouts; (c) the open cell's name in `text-strong` and its background unchanged; (d) health is not a button.
- Checks: the four jsdom cases cover (a), (b) and (d) in the DOM order; the browser run covers (b), (c) and (d) in both layouts (below). Mental mutation: a toggle that never closes fails the first case; an explanation placed after the backpack fails the first case; a button on health fails the third.
- (c) is drawn by the rule `.button.value-cell[aria-expanded="true"] .value-cell-name` in `src/browser/styles.css`, which an earlier slice wrote and I did not change. Measured in the browser: open name `rgb(244, 244, 245)` (`#f4f4f5`, `text-strong`), resting names `rgb(141, 141, 151)` (`#8d8d97`, `text-label`).

## Walk of walkthrough.md (the change alters what a user sees)

The product is the running game (`npm run local`), reached through `playwright-cli` as `.claude/skills/loop2-play/SKILL.md` gives. Account made through the login card with `agent7@example.test`; character „Ala”; map „Skraj lasu” entered through „Wejdź”. The desktop run was at game minute 38 and running; the phone run was paused („Wznów” shown). All cases are checked in the browser on the page's own DOM and computed styles, not by reading the code alone.

| Case | By what | Verdict |
|---|---|---|
| A click on the temperature cell opens its explanation under the cells, above the backpack, with the words of the game's data | desktop (1600 × 1000, mouse) and phone (360 × 740, touch tap): DOM text, previous and next sibling | correct in both: text equal to the expected sentence (numbers 0,35 / 0,024 / 0,5 / 37 from `balance.ts`, ambient 25 °C of the forest); cells `aria-expanded` `true` on temperature only |
| A click on another cell switches the explanation | desktop: temperature, then satiety | correct: one explanation, the satiety sentence; temperature back to `false` |
| A second click on the open cell closes it | phone: tap on the open temperature cell | correct: no explanation, `aria-expanded` `false` on all cells |
| The open cell's name in `text-strong`, background unchanged | phone, computed style | correct (see own-work check) |
| The health cell is no button and opens nothing | DOM on desktop and phone: health is a `div`, no `button` inside | correct |
| The explanation is readable and inside the phone width | phone screenshot with temperature open, and with satiety open | correct: wraps to 4 lines inside the width, backpack below it, no text over a frame |
| Phone layout: nothing scrolls to the side, no control under 48 px | `.playwright-cli/phone-measure.js` (copy kept as `reports/executor-7-phone-measure.js`) on the phone page, temperature open | `scrollsToTheSide` false; `controlsSmallerThan48` empty; `contentWiderThanItsBox`: `div.world-area` (content 330 > box 318) and `div.scene-sheet` (256 > 64); `outsideTheWindow`: `img` spanning 156..412. The same three flags were measured again with the explanation closed: they come from the scene's picture (cropped by design, D-349), not from this slice. Not verified further. |
| Reading the game's state while the run is paused | phone run, paused („Wznów” shown), explanation opened and read | correct: the open state does not depend on game time |
| Desktop, page area 1280 × 720 | not run (see unchecked) | unchecked |
| Side observation | the explanation `p` has no `id`, and the button has no `aria-controls` to name it (`ReactButton` gives no prop for it) | noted, not changed; see concerns |

What I did not check, and why: the computer layout at a page area of 1280 × 720 (the desktop run used 1600 × 1000, which is the computer layout too, and the explanation has no width threshold of its own; the handoff and D-396 ask for 1280 × 720); a desktop close by click in the browser (the jsdom case covers it, and the phone close was checked in the browser); a desktop switch from the explanation of nature energy (covered by jsdom only); hover on the desktop (the rule exists in `styles.css`, untouched); reduced motion (this slice adds no motion, so there is nothing to check); a page area of 1100 px (no fault seen at it for this slice); Firefox and Edge (manual, per D-396, outside this slice's checks).

Errors outside the task's scope: none found.

## Working copies

- Screenshots taken for my own inspection: `.playwright-cli/desk-temp.png`, `desk-satiety.png`, `phone-temp.png`, `phone-satiety.png` (desktop 1600 × 1000 and phone 360 × 740). Viewed here and removed with the directory. Not pushed to the public screenshots repository (see concerns).
- `.playwright-cli/` (the CLI's own session logs, its probe script): removed, `rm -rf` on the full path.
- `.runs/executor-7/` (my probe outputs and test output files): removed. The outputs that matter are quoted above.
- Kept: `.runs/task-cycles/paski-parametrow/reports/executor-7-phone-measure.js`, the input of the phone measurement.
- Local start: `npm run local` was started and stopped (`npm run local:stop` reported one start stopped). The browser was closed. No worktree was made.

## Choices and departures

- The open state is `useState<BodyCellId | null>` in `BodyRowCells` (D-407). The toggle is a functional update (`setOpen`), so the click on the open cell closes it.
- The header comment of `body-row-cells.tsx` said the module holds no state of its own; I changed that sentence, since it now holds the one open state.
- The explanation is a `p` with the class `body-explanation`. Its rule is in `run-screen.css` in the body-row block (the plan's place), `text-secondary` at `--font-size-detail`, which is the role the styleguide gives explanations and notes. No new token and no new value.
- No TypeScript reads reduced motion; the slice has no motion (D-04 limits the view's reading of that setting to the scene).
- `body-row.ts` is not changed; `bodyExplanation` is used as it stands.
- The test file copies the helpers `draw`, `cellsOf` and `withRun` and the `sent` setup of `tests/view/body-row-cells.test.mjs`; it drops the `practice` parameter of `sent`, which only a death case needs, and the trip-plan parameter is kept at its default. Its `decision:` lines quote D-450 (two sentences, exact words) and D-337 and D-407 (one sentence each).
- The plan's *Read* range `src/browser/run-screen.css:600-672` is stale: the body-row block stands at about lines 632–765 of the current file (the dispatch's range). I read the whole file.

## Concerns and questions

1. Screenshots for the human. The handoff keeps none in the repository or the record, so I did not push them. `ui_check.md` and D-418/D-419 send a screenshot the human is shown to the public repository `mariusznazar/screenshots`, pushed by the agent with the owner's `gh` account. Decision for the orchestrator: push the four screenshots as this slice's evidence (they show the account `agent7@example.test`, a made-up address, and no secret), or keep them out. I recommend deciding this at the request stage, where the screenshots are embedded anyway.
2. The desktop check at 1280 × 720 was not run (see the walk). If the orchestrator wants it for the cycle, it is a short rerun on the same flow.
3. `aria-controls` (a link from the button to its explanation, for a screen reader) is not in place. Adding it needs a prop on the shared `ReactButton`, a change of the shared control, which this slice did not take on. I recommend a note for review rather than a change now.

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1–~700 (Roles, every rule up to „Main button, secondary action and tab”, including „Two layouts and one threshold”, „Nothing scrolls to the side”, „Everything is done by touch”, „A change is checked in both layouts”). Not read: lines ~700–1650 — the rules about the screens Mapy, Wiedza, Postać, the program editor, the scene, the picture band, the chronicle, the end-of-run window and the list of accounts, and the examples; they hold nothing this slice changes. Read selectively for the rules the change touches.
- `foundations/decisions.md` D-04: read its statement (lines 59–98); its verification part not read. D-04 is named by the plan as a dependency, not in its *Read*.
- `.runs/task-cycles/paski-parametrow/task.md`: read lines 1–160 of 249 (the *To do* passage at 31–35 is among them). Lines 161–249 not read; the plan's *Read* does not name them.
- `src/browser/styles.css`: read lines 300–490 and 489–589 and 690–749 (the shared controls, the `.button.value-cell` look, the phone block of the controls). Not read: the rest of the file (lines 1–300, 589–690, 749 to end), which the plan does not name.
- `foundations/decisions.md` D-39, D-40, D-42, D-47 (cited by the styleguide and the tokens file, not named by my *Read*): not read.
- Read whole: `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `walkthrough.md`, `ui_check.md`; `src/browser/run-screen.css` (whole, 1681 lines); `src/browser/view/body-row.ts`, `body-row-cells.tsx`, `controls/react-button.tsx`; `src/browser/tokens.css`; `guidelines/coding.md`, `coding-browser-module.md`, `testing.md`; `src/browser/AGENTS.md`; `tests/view/page-document.mjs`, `tests/view/game-stylesheets.mjs`; `tests/view/body-row-cells.test.mjs` lines 1–222; `.claude/skills/loop2-play/SKILL.md`; D-337, D-450, D-311, D-407, D-396, D-421 at the current ranges.

## Searches not found or unclear

- None unresolved. Two points were clear only after reading: the plan's `run-screen.css` range is stale (above), and the open-cell name rule is in `styles.css`, not in `run-screen.css` (already present, verified in the browser).

## Repair after the orchestrator's check

The coordinator's `foundation_check.py` run on this slice reported five errors, all in `tests/view/body-row-explanation.test.mjs`: the `decision:` quotations at lines 83, 84, 116, 135 and 149 did not begin a binding sentence. The repair changes only those five quotation lines; no other line and nothing under `foundations/`.

Re-read whole as they stand (ranges unchanged): D-450 (`foundations/decisions.md:11299-11355`), D-337 (`10966-11078`), D-407 (`4784-4800`). Quotes now copy the beginning of a sentence exactly:

| Line | Decision | Quote now begins the sentence at |
|---|---|---|
| 83 | D-450 | `A click on the cell of temperature, satiety or nature energy (D-337) opens, right under the four` (line 11301) |
| 84 | D-450 | same sentence (line 11301): the same sentence states the second click that closes |
| 116 | D-450 | same sentence (line 11301): the same sentence states the switch and that at most one stands open |
| 135 | D-337 | `The cells of temperature, satiety and nature energy are buttons that open the explanation of their` (line 10999); the sentence states that the health cell is no button |
| 149 | D-407 | `The game state lives in a store outside React …  the state of one screen lives in the component of that screen.` (line 4786, the whole sentence) |

Reason for lines 84 and 116 sharing the quote of line 83: the decision states the open, the close and the switch in one sentence, and the checker requires a quote that begins a sentence. The first attempt at line 83 left out the parenthetical `(D-337)` of the decision, which made it fail; the corrected quote is exact.

Commands and exit codes (worktree root, HEAD before the repair `bb600781`):

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (before the repair) | 1 | 5 errors, the five lines above |
| same, after the first repair attempt | 1 | 3 errors (lines 83, 84, 116: quotes lacked `(D-337)`) |
| same, after the final repair | 0 | `0 errors` |
| `npm test -- tests/view/body-row-explanation.test.mjs` | 0 | 4 of 4 pass |
| `npx prettier --check tests/view/body-row-explanation.test.mjs` | 0 | formatted |

Commit: `8836c61a` (`test: :white_check_mark: quote in the decision lines ...`), added by path, on top of `bb600781`. The repaired file's behaviour is unchanged; the working files of the repair (`.runs/fc*.txt`, `.runs/test*.txt`) are removed.
