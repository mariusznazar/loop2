PASS 9350cfe22adc3a693b8152bd3b03e2d8a2917c75

# Review — correction 1, pass 1 (code, tests, stylesheets), cycle `drobne-bledy-ekranow`

Range: `c015e4c6d8b55796ecf0c1af06f7d379dd7ccdf5..9350cfe22adc3a693b8152bd3b03e2d8a2917c75`
(`git rev-parse HEAD` = `9350cfe22adc3a693b8152bd3b03e2d8a2917c75`, the head given). `.the-way` at
`bfb2e109735b5fff98802b8be0ff3c43c799262a`, the commit the gitlink records. Diff computed with
`git diff c015e4c6..HEAD` and `git log`; this pass reads `src/**`, `tests/**` and `src/browser/*.css`
of it (commits `4c6b4496`, `63f615e7`, `0c539660`, `786a4ca0`, `8b068a5b`).

Counts: Critical 0, Important 0, Minor 2; out of scope 0. Blocking: none.

## Each remark of the human's

- **1(a) — made.** `src/browser/view/scene.tsx:744-808`: the ends of the flight and the dust
  (`effectOver`), of the wolf's run in, fall and run off (`creatureOver`) and of the return of the tint
  (`tintOver`) are one function each, called both by the element's own `onAnimationEnd` (still only
  where `event.target === event.currentTarget`) and by the scene's existing `animationcancel` listener
  (`watchCancel`, `scene.tsx:791-808`), by the target's class: `.scene-creature-effect` (checked
  before `.scene-effect`, which it also carries), `.scene-effect`, `.scene-creature[data-entering]`,
  `.scene-tint[data-returning]`. Checked specifically:
  - *No uncut effect ends early.* An uncut cancel would have to come from the effect's own element
    losing its animation while it runs. `.scene-effect` has one animation of its own,
    `scene-effect-life` (`src/browser/run-screen.css:874-879`), outside the reduced-motion block,
    with no rule that changes or removes it; the pause and the moments only set
    `animation-play-state: paused` (`run-screen.css:1330-1333`), which fires no cancel. The run in
    (`run-screen.css:1211-1215`) and the return (`:1170-1174`) are cancelled otherwise only when
    `data-entering`/`data-returning` is taken off mid-run; the cancel is dispatched after the attribute
    is gone, so the selector no longer matches and nothing is ended (and where it would match, the
    state is already over: `entering` false or `from` null). Children's cancels (plaque, sheets,
    `scene-flight-across/rise`, `scene-creature-out` on the sprite) match no branch. An element removed
    by a new effect's key is detached, so its cancel cannot reach the scene's listener. The author's
    browser record agrees: uncut, 306–312 ms per effect and 1998 ms for the return
    (`reports/correction-1a-browser-uncut-after-fix.txt`).
  - *No listener twice, none leaked.* `watchCancel` is a callback ref that returns a cleanup
    (`scene.tsx:806-807`); React is 19.3.1 (`package.json:24`), which calls the cleanup of the old
    callback before attaching the new one at each commit, so one listener stands, of the last
    committed render, whose `effect.serial`, `creatureFx.serial` and `tintSerial` are the ones drawn.
    The correction added no listener; it widened the existing one.
  - *Serials.* `creatureOver(creatureFx.serial)` / `effectOver(effect.serial)` take the serial of the
    render whose element was cancelled; the effects are keyed by serial, so a cancelled element is the
    current one.
  - Test `tests/view/scene.test.mjs:1990` covers the six cases (flight, dust, run in, fall, run off,
    return), each asserting the precondition, over when cut, and not played on a redraw. Ran: exit 0.
- **1(b) — made.** `src/browser/view/program-editor.ts:797-809` writes a fractional number through
  `tenths` (`src/browser/view/body-row.ts:15-23`, now exported), a whole one as before. Checked: a node
  run of the same formula over 30.0–37.0 by 0.1 (the range and step of `temperatureBelow`,
  `src/browser/sim/data/conditions.ts:53-63`) gives no value cut short (`bad 0`); „36,5”, „0,5”, „0”
  (whole) as expected; a negative fraction rounds away from zero (`-36.55` → „-36,6”), unreachable
  (min 30, and `src/browser/sim/programs.ts:96` refuses a value off the step). Other writers of a
  rule's number: the chronicle (`chronicle-entries.ts:78`) and the end window
  (`end-window-lines.ts:153`) take `ruleSentence`, so they follow; the group header takes
  `groupSummary`; the number field (`controls/react-number-field.tsx:126`) is `<input type="number">`
  whose display the browser localises; the wolf's sentence (`combat-line.ts:15`) writes
  `${condition.value}` of creature data that holds whole numbers only (unchanged, as the author
  reports); the discovery band writes no number (`discovery-band-text.ts:20`), the status row none
  (`status-row.ts:77-79`). No place reads the new sentence wrongly. Test
  `tests/view/program-editor.test.mjs` „a number with a fraction stands in the sentence …”: 36.5,
  30.1, 36 through `conditionSentence`, `ruleSentence`, `groupSummary`; expectation from the
  styleguide's rule and D-57, not from the code. Ran: exit 0.
- **1(c) — made.** The four places the remark names have the pair (`overflow-wrap: anywhere`, and
  `min-width: 0` where a flex child): `.program-list-item` (`programs-screen.css`), `.maps-who-name`
  (`maps-screen.css`, an `<a>` in the column flex `.maps-who-member`, `maps-screen.css:156-159`),
  `.character-screen h2` (`character-screen.css`, the `h2.character-screen-name` of
  `character-screen.tsx:94`), `.rule-list-name` (`program-panel.css`). The extension adds the pair to
  `.run-header-name`, `.copy-heading`, `.program-title`, `.copy-line`, `.end-question-note`,
  `.discovery-band-text`/`.end-window-discovery-text`, `.away-report-text` (new rule),
  `.account-menu-address`/`.account-menu-sentence`, `.form-warning`/`.form-note`, `.accounts-email`;
  each selector exists in the view (searched `src/browser/**/*.{ts,tsx}`). My own search of the view
  for typed text (`{x.name}`, `${…name}`, `deletedName`, `.email}`) found no row the correction missed
  outside the native `select` exception (deliberate) and rows already holding the rule
  (`.chronicle-text`, slice 13's team row); the only `nowrap`/`ellipsis` rules of the view
  (`run-screen.css:494-550`, rows „Teraz”/„Potem”) show no typed text (`now-lines.ts`). D-421
  placement: each rule sits in the stylesheet of its screen or shared part (Siedziba →
  `headquarters.css`, list of accounts → `accounts-screen.css`, program panel → `program-panel.css`,
  run screen and end window → `run-screen.css`, account-menu block and form → `styles.css`, which
  D-421 names for them). No rule of another element changed: the stylesheet diff is added
  declarations inside the named rules, one new rule (`.away-report-text`, no other rule of that
  name, `headquarters.css:124`) and comments. No test, as the deliberate decisions give.
- **2 — let through: nothing to do.** Nothing in the range touches it.
- **3 — not judged in this pass** (a change of `foundations/decisions.md`, D-319; pass 2's scope).
- **4 — made.** `tests/view/rule-editor.test.mjs:1127` (title) and
  `tests/view/program-panel.test.mjs:1044` (comment) read „Zapas poniżej 8 szt. · Patyk”. Search of
  `tests/` and `src/` for „poniżej 8 · Patyk”: none; positive control „poniżej 8 szt\. · Patyk” finds 5
  in `tests/`.
- **5 — not judged in this pass** (D-04 in `foundations/decisions.md`; pass 2's scope).
- **6 — not judged in this pass** (`guidelines/styleguide-browser-view.md`; pass 2's scope).

## Findings

### Critical

none

### Important

none

### Minor

1. `tests/view/scene.test.mjs:1990` (against `src/browser/view/scene.tsx:799-804`) — no case shows
   that a cancel the browser fires on an element that is *not* cut leaves its effect alone: a cancel
   on `.scene-creature` without `data-entering`, on `.scene-tint` without `data-returning`, or on a
   child of an effect (`.scene-flight-across`, a sheet `img`).
   Why the code exists: the attribute guards and the target-class dispatch are what keep the listener
   from ending an effect early when an animation is replaced rather than cut. Mechanism: the new case
   fires the cancel on the cut element and everything under it, so it would pass with the guards
   removed (a mutation `.scene-creature[data-entering]` → `.scene-creature` survives). Example: at 16×
   a death 200 ms into a run in removes `data-entering`; the browser cancels `scene-creature-in` on the
   creature; without the guard `creatureOver(N)` runs — today harmless, since `creatureFx` N is the run
   in itself, but a later effect sharing the element would be dropped with no test failing. The author
   names this gap in the own-work check. Fix: one case that fires `cancelAnimation` on the creature
   after `data-entering` is gone and on a child of a running flight, and asserts the effect still
   stands. Minor: no current path reaches a wrong outcome.
2. `src/browser/program-panel.css:44-46` — two comments stacked over `.copy-line`, the second one with
   a line of about 150 characters while the file wraps its comments near 100, and saying „lets the item
   of the row shrink” although one of the two `.copy-line` paragraphs (`program-panel.tsx:625`) is a
   child of `.copy-section`, not of a row. Effect: a reader of the stylesheet; nothing in the layout.
   Fix: one comment, wrapped, naming that the line is a flex item only beside the save buttons.

## Declined to judge

- `src/browser/view/combat-line.ts:15` writes the wolf's number with its own template, apart from
  `conditionSentence`; a fractional value in creature data would show a dot. Pre-existing, outside the
  correction's diff, unreachable with today's data (`healthBelow` 8, step 1), and remark 2 / the
  author leave it as is.
- The native program `select` widened by a long name: a deliberate design choice of the correction
  that goes to the request.

## Checks

| Check | Command or method | Exit / result |
|---|---|---|
| Head | `git rev-parse HEAD` | `9350cfe2…`, the head given |
| Pinned the-way | `git -C .the-way rev-parse HEAD` vs `git ls-files --stage -- .the-way` | both `bfb2e109…` |
| ESLint | `npx eslint src/browser/view/scene.tsx src/browser/view/program-editor.ts src/browser/view/body-row.ts tests/view/scene.test.mjs tests/view/program-editor.test.mjs tests/view/rule-editor.test.mjs tests/view/program-panel.test.mjs` | 0 |
| Prettier | `npx prettier --check` on the 3 `.ts/.tsx`, the 4 `.mjs` and the 8 changed `.css` files | 0 |
| Focused tests | `npm.cmd test -- tests/view/scene.test.mjs` | 0 (73/73) |
| | `npm.cmd test -- tests/view/run-screen.test.mjs` | 0 (21/21) |
| | `npm.cmd test -- tests/view/program-editor.test.mjs` | 0 (55/55) |
| | `npm.cmd test -- tests/view/rule-editor.test.mjs` | 0 (76/76) |
| | `npm.cmd test -- tests/view/program-panel.test.mjs` | 0 (60/60) |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| `tenths` over the condition's range | `node -e` of the same formula over 30.0–37.0 step 0.1, plus 36.5, 0.5, −0.5, −36.55, 0 | `bad 0`; „36,5 0,5 -0,5 -36,6 0,0” |
| Mechanism of 1(a) | reading `scene.tsx:557-964` and the scene's rules `run-screen.css:630-930, 1140-1439` | as above |

Not run: the full suite (the cycle's own run); `check_instructions.py` (not named for this pass); the
local game — I did not start it. The cut-and-return and the uncut lengths in a real browser rest on
the author's record (`reports/correction-1a-browser-cut-before-fix.txt`, `…-cut-after-fix.txt`,
`…-uncut-after-fix.txt`), which I read and judged against the code and CSS, not reproduced: unverified
by me. The broken names at 1280 × 720 likewise rest on `reports/correction-1a-ext-browser.txt` (not
read whole, see below) and the author's report.

## Reaches beyond the handoff

- `.runs/task-cycles/drobne-bledy-ekranow/task.md`, whole: the frozen task, to see where it binds
  beyond the remarks (points 2, 3 and settlement 13).
- `src/browser/view/scene-picture.ts:498-531` (`tintShown`): whether a return is kept through a pause
  and so can be cut by leaving the screen.
- `src/browser/sim/data/conditions.ts`, `src/browser/sim/programs.ts:69-98`, `src/browser/sim/program.ts:126-141`:
  range, step and snapping of a condition's number, for `tenths`.
- `src/browser/view/{discovery-band-text,combat-line,status-row,chronicle-entries,end-window-lines,rule-panel,character-screen,maps-screen,program-panel,now-lines}.ts(x)` at the places that write a rule's number or show a typed name.
- `tests/view/scene.test.mjs:1871-1875` (`cancelAnimation`), `src/browser/maps-screen.css:156-159`,
  `src/browser/program-panel.css:40-59`, `src/browser/headquarters.css:115-135`.
- `package.json` (React version, for the ref cleanup).
- `a note in the author's private notes` (the user's rule before a one-off script).

## Working copies

None made: no worktree, clone or script file; the one-off check was an inline `node -e`. The directory
`.runs/review-corr-code/` was not created. The focused test runs rebuilt `dist/`, which the product's
own command writes. Nothing remains.

## Unread material

- `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`: read whole.
- D-316, D-317, D-319, D-367, D-57, D-178, D-421: read whole.
- `.the-way/task-cycle/review/SKILL.md`, `fix.md`, the remarks, the handoff, `reports/correction-1a-report.md`: read whole.
- `reports/correction-1b-report.md`: not opened (documents; pass 2).
- `reports/slice-19-report.md`: not opened; the cut walk's model was read in the code (`scene.tsx:731-743, 791-808`) instead.
- `reports/correction-1a-ext-browser.txt`, `correction-1a-browser-cut-before-fix.txt`, the red logs: not read (the cut-after and uncut-after records were read whole).
- `tests/view/scene.test.mjs`, `tests/view/program-editor.test.mjs`: read at the new cases and `cancelAnimation`, not whole. `src/browser/run-screen.css`: read 490-551, 630-930, 1140-1439, not whole.

## Searches not found or unclear

- „poniżej 8 · Patyk” in `tests/` and `src/`: none (positive control with „szt.” found 5).
- A row of the view that shows typed text and lacks the rule, besides the native `select`: none found
  (search of `src/browser/view` for `{…name}`, `${…name}`, `deletedName`, `.email}`; of the stylesheets
  for `white-space`/`text-overflow`).
- A rule of the scene that changes or removes `scene-effect-life` mid-effect: none found.
