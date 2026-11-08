# Report 10 — the fix of the review's findings (fix 1 of the review of the whole change)

**Status:** done (with one observation for the orchestrator, see *Problems as observed*).

Base of the fix range: `38dfa8cd5329ca4070dead9a7233f71f425c7a93` (confirmed by `git rev-parse HEAD` at the start).
Worktree `the worktree's root`, branch `task/proporcje-sceny-i-programu`. Nothing pushed.

## Commits

| Commit | What | Findings |
|---|---|---|
| `a43cc8e` | `src/browser/view/rule-list.tsx`, `tests/view/rule-editor.test.mjs`, `tests/view/program-panel.test.mjs` | I-1, M-6, M-7 |
| `c6a99da` | `tests/view/world-area.test.mjs` | M-3 |
| `9f278ce` | `src/browser/styles.css`, `src/browser/view/game-view.ts` | M-2, M-4 |
| `405534e` | `guidelines/styleguide-browser-view.md` | M-1 |
| `5e81459` | `foundations/decisions.md` | M-5 |

I-1, M-6 and M-7 stand in one commit: all three are in the one function `RuleListView` and their tests are interleaved in the same two test files; splitting by hunk would have meant `git add -p` of hand-edited hunks with no gain.

Lines (added / removed): `rule-list.tsx` +~54/-~10 (git diff --stat before commit: 54 changed), `rule-editor.test.mjs` +114, `program-panel.test.mjs` +123, `world-area.test.mjs` +~24/-~15, `styles.css` +3, `game-view.ts` +1/-1, `styleguide-browser-view.md` +4/-4, `decisions.md` +3/-3 (2 lines changed in D-166).

## The eight findings

### I-1 — fixed

The one rule panel is now mounted once and never again when its place changes.

- How: `RuleListView` creates one host element (`panelHost`, `document.createElement("div")` in a `useState` initialiser) and draws `panel` into it with `createPortal`, at the end of the list's root element (after the groups). The places the list used to draw the panel in — the `<li className="rule-list-panel">` under a row and the `<div className="rule-list-panel">` under a header — are now empty slots whose ref (`seatPanel`) appends the host to the slot when it is not already its child. A fold, an unfold, „zwiń wszystkie”/„rozwiń wszystkie” or a move of the open rule to another group therefore moves the same DOM element and the same React instance: `focusedKey`, the chosen field (`shown`), the cursor and a typed group name all survive, and the panel's focus effect does not run as an opening. A real opening (the page gives another `open`) still changes `openKey`, so it takes the focus as before.
- Order of effects: the portal stands after the groups in the tree, so the slots' refs run in the layout phase before the panel's own layout effect; the panel's `focus()` on an opening finds its element attached.
- Way rejected 1: lift the panel's state (`shown`, `focusedKey`, name) out of `RulePanelView` into the list or the page so that a remount restores it. It changes the public props of `RulePanelView` and `createRulePanel`, moves five pieces of state, and still unmounts and mounts the DOM (a typed text in the number field, selection and focus would each need a restore). Cost if the chosen way is wrong: the host is moved by `appendChild`, which a browser treats as a removal, so a focus inside the panel would be lost at a move; nothing in the list moves the host while the panel holds the focus (a fold and a move of a rule are made from controls outside the panel), and the guard `parentNode !== place` makes a redraw move nothing.
- Way rejected 2: tell an opening from a move by a flag handed to the panel. It would keep the focus but not the field (the state would still reset), which the handoff asks for.
- Way rejected 3: a portal straight into the slot elements. React treats a portal with another container as a new portal and mounts its child again, so it would not fix the finding.
- Failing-first tests (all in the form „expected …, got …” on the old code, run before any code change):
  - `tests/view/program-panel.test.mjs`: „folding and unfolding the group of the open rule leaves the focus on the fold button and the panel on its field” — failed at the first assertion `the focus stays: expected <button class="button">, got <button class="button pick-cell selected">` (the finding's case, the focus in the panel's grid). It also holds the Enter case after the fold (Enter, then the click a browser makes of it, unfolds the group) and the field the player had chosen („Czynność”), the same panel element and the program untouched (`acts` empty).
  - `tests/view/program-panel.test.mjs`: „„zwiń wszystkie” and „rozwiń wszystkie” leave the focus on the button pressed and the panel on its field” — failed `after „zwiń wszystkie”: expected <button class="button">, got <button class="button pick-cell selected">`.
  - `tests/view/rule-editor.test.mjs`: „the panel is the same element wherever the list puts it: after a fold, an unfold and a move of the open rule to another group” — failed `folded: expected <div class="probe-panel">, got <div class="probe-panel">` (another element). This one holds the move across a group border at the list's level (see *Problems as observed*).
  - Guards that passed at the old code too, kept because they protect what slice 1 made: „opening a rule, and then a rule of another group, takes the focus into the panel each time” (program-panel) and „a panel closed and opened again is drawn once, at the place of the row opened” (rule-editor).
- Real browser (D-88, `loop2-play`): `npm run local`, account made through the card, a state composed with `compose-state.mjs` (so that „+ reguła” is enabled), screen Programy. „+ reguła” opened the panel with the focus in its grid. The field was moved to „Czynność”; the focus was put on „Zwiń grupę”; Enter folded the group: `document.activeElement` stayed the fold button, now „Rozwiń grupę”, the panel's `aria-label` of the field still „Czynność”, rows 0, the panel standing right after the header. Enter again unfolded it: focus on „Zwiń grupę”, field „Czynność”, one row, the panel after the row. Space folded it again the same way. One `.rule-panel` in the DOM each time. Clicking the row opened the panel with the focus in it, on the condition („Warunek”). A screenshot of the unfolded state shows the panel under the row 1.1 with its usual look. The game was stopped (`npm run local:stop`: „Local starts stopped: 1”), the browser closed (`playwright-cli close`), `.playwright-cli/` and the log removed.

### M-1 — fixed (`405534e`)
`guidelines/styleguide-browser-view.md`: D-349 added to the *Decision* line of „No value in place of a design token” (where the paragraph at `:124-129` stands, line 84) and of „The scene of a map run” (line 579). The two sentences say the fact without „bo”: „… jest wymiarem układu, który stoi w `src/browser/styles.css`, przy jednym rozmiarze sceny (D-349).” and „Pasek ma grubość `--bar-width` podwojoną, `calc(var(--bar-width) * 2)`; cała scena jest rysowana w dwukrotności swojego obrazu (D-349).” `foundation_check.py`: `0 errors`.

### M-2 — fixed (`9f278ce`)
The comment of `.run-screen-areas` in `src/browser/styles.css` now says the 320 px and the 526 px hold in a browser that draws no classic scrollbar, that a media query counts a scrollbar of 15 to 17 px in the window's width, and that with one the program is about 511 px in a window 1280 px wide and under 320 px from 1074 px to about 1090 px. No threshold or layout value changed. The figures check by hand: with a scrollbar `s`, program width = window − s − 32 − 706 − 16, so ≥ 320 from window 1074 + s − … = about 1089 (s = 15) and 1091 (s = 17).

### M-3 — fixed (`c6a99da`)
The two assertions that `SCENE_SCALE` and `sceneSize` are not exported are removed, with the now unused `import * as worldArea`. The case now draws the scene in a window 800 px wide with a completed map run's state and in one 1920 px wide with the running state (a `resize` event and a new render each), and requires the background to be 672 × 304 and the scene frame to carry no inline `style`, in both. The literal 672 × 304 of the old case stays. It follows the *violates* line of D-349: a second size chosen by the width of the window. The test passes on the current code; it was not a failing-first case, the change being the removal of a name check. Mutation check by reading: a scale brought back by the window width through attributes or an inline style would fail it; one brought back by a style rule keyed by width alone would not (jsdom has no layout) — that stays the browser check's.

### M-4 — fixed (`9f278ce`)
`src/browser/view/game-view.ts`: the clause „, so no host is placed for it here” is dropped.

### M-5 — fixed (`5e81459`)
Through `the-way-record-decision` (the skill's `SKILL.md`, then `elements/common/way_of_working.md`, `elements/decisions/skill/read.md`, `decide_entry.md` and `template.md` of the pinned `.the-way` at `294af7fd…`, which equals the gitlink). D-166 edited in place: „in the middle the program editor” became „on the right the program editor”, and the *complies* example „in the middle of the screen” became „on the right of the screen”. The rest of the entry is unchanged. Search of the foundation for another „middle”/„środku”/third-column wording of the program editor found none besides D-166 (line 3072 and its *Verification*). `python -B .the-way/elements/common/foundation_check.py`: `0 errors`. Meaning, English: on Programy the program editor stands on the right, beside the list of programs on the left. Znaczenie po polsku: na Programach edytor programu stoi po prawej, obok listy programów po lewej. Marked `the cycle's` (no row, no projected entry carries it): the human sees it at the merge.

### M-6 — fixed (`a43cc8e`)
The item under a row is `<li className="rule-list-panel" role="presentation">`. Test (failing first, `expected "presentation", got null`): „the item that holds the panel under a row is no list item to assistive technology”. Choice: `presentation` rather than `none` (the same meaning in ARIA 1.2, older support for `presentation`). Cost if wrong: a checker of list structure such as axe's `list` rule may flag a `role`-carrying `li` inside an `ol`; none runs in this repository. The alternative of two `<ol>` elements around the panel was rejected as a larger change of the markup and of the drop line.

### M-7 — fixed (`a43cc8e`)
Smallest change that makes a drop on the panel predictable: the panel is no drop target. Because the panel is now drawn into the portal at the list's root, a drag event over it no longer reaches the group's `section` handlers; the list's root takes `onDragOver={overPanel}`, which takes the drop line away when the event comes from inside the panel host. A `dragover` over the panel is not cancelled, so the browser accepts no drop there and fires no `drop`. Test (failing first, `dragover on the panel is not accepted: expected true, got false`): „a rule or a group dragged over the panel shows no line, is not accepted there, and a drop on the panel changes nothing” — a rule dragged over row 3 shows a line, over the panel the line is gone, the event is not accepted, a `drop` commits nothing; the same for a group dragged to the lower half of group 2. The old case („no line before the row the panel stands under”) stays and still passes. Cost if wrong: a player who drops on the panel wanting the end of the group lands nowhere and drags again; no decision of the foundation says a panel is a drop target (D-288 says only that rules move by a handle with a line showing where they land).

## Checks (command, exit code)

All from the worktree root. `npm test -- <file>` runs `npm run build` and then the one file; the failing runs below were of that command and ended with the runner's `✖` and `ℹ fail` counts (the exit code was not printed separately; the runner exits non-zero on a failing test).

Failing first:
- `npm test -- tests/view/program-panel.test.mjs`: 3 failed of 54 (fold, „zwiń wszystkie”, and a page-level move test that I removed, see *Problems*), 51 passed.
- `npm test -- tests/view/rule-editor.test.mjs`: 3 failed of 73 (identity, role, drag), 70 passed.

Passing, after the code (final run after `prettier --write`, a rebuild `npm run build` exit 0):
- `node scripts/test-node-file.mjs tests/view/rule-editor.test.mjs`: exit 0, 73 pass.
- `… tests/view/program-panel.test.mjs`: exit 0, 53 pass.
- `… tests/view/world-area.test.mjs`: exit 0, 21 pass.
- `… tests/view/account-screen.test.mjs`: exit 0, 128 pass (it holds the Programy panel-placement cases at `:4300`).
- `… tests/view/run-screen.test.mjs`: exit 0, 13 pass; `right-area.test.mjs`: exit 0, 13; `program-editor.test.mjs`: exit 0, 52; also exit 0 earlier for `rule-signs`, `scene`, `react-controls`, `run-header`.
- `python -B scripts/test.py tests/invariants/test_browser_view_focus_outline.py`, `…_framework.py`, `…_token_values.py`: exit 0 each.
- `python -B .the-way/elements/common/foundation_check.py`: `0 errors`.
- `npx prettier --check` on the five changed code and test files: clean; `npx eslint` on the four changed `.tsx`/`.mjs` files: exit 0 (note: `rule-list.tsx` and the two test files were clean at the head and were reformatted by `prettier --write` after my edits).

Not run: `npm test` without an argument (the full gate is the orchestrator's run); the other `tests/sim` and server tests (the change touches no code they read). The kitchen-sink page (D-269) was not built: `rule-list.tsx` is a `.tsx` that the page does not import.

## Own-work check

The requirement most likely unmet: the one in the task and slice 1's *Goal* that the focus behaviour of the panel stays as at the base — the panel takes the focus when the player opens it and only then — in each place the list can draw it. Checks: the fold and Enter case, the „zwiń wszystkie” case and the field case in `program-panel.test.mjs`; the opening guards (a rule, then a rule of another group, takes the focus each time); the old cases of `rule-editor.test.mjs` and `account-screen.test.mjs` for the panel's place and focus; and the real-browser run above (opening focuses the panel on the condition, fold/unfold with Enter and Space leave the focus on the button and the field on „Czynność”). Showed: all pass. A second likely gap — a panel redraw at a game tick moving the host and dropping a typed number's focus — is held by the existing test „a number typed in the panel keeps its text and the focus while the game at 16× redraws the panel” (passes, `rule-editor.test.mjs`) and by the program-panel case with three seconds of redraws (passes), because the guard `parentNode !== place` makes a redraw move nothing.

Mutation by reading: dropping the guard in `seatPanel` is caught by those two number cases; dropping `overPanel` by the M-7 case; dropping `role` by the M-6 case; rendering `panel` in the slots again by the identity and focus cases. Not caught: a panel mounted while no slot exists (`panelSeated` true with a group but a `ruleId` of a rule the group lacks) — it falls to the header slot by the old `panelUnderRow` logic and is covered by the old „after the open header” case only for a group's own panel.

## Reaches beyond the handoff

- `.the-way/elements/common/way_of_working.md`, `.the-way/elements/decisions/skill/read.md`, `decide_entry.md` and `.the-way/elements/decisions/template.md` — read, as `the-way-record-decision` names them for M-5. Not in the handoff's list; the skill's own `SKILL.md` calls for them.
- `foundations/decisions.md` search for „middle”/„środku”/„third column” (a grep, then a read of D-166 whole): to check that D-166 is the only decision saying the editor stands in the middle.
- `git show 01b26d5:src/browser/view/program-panel.tsx` (the base), a grep of `panelStands`: to see how the page treats a move of the open rule across a group border (see *Problems*).
- `src/browser/view/controls/react-button.tsx` (the first 80 lines), for the `aria-label` of the fold button in the tests.
- `scripts/test.py`, `package.json` scripts, `tests/view/page-document.mjs` (`inAct`, `withPage`): to know what `npm test -- <file>` runs and which globals a test window gives (`Node` is not one of them; the first draft of `overPanel` used `instanceof Node` and every drag case failed on a `console.error`; it uses `Element`, as `leave` does).

## Searches not found or unclear

- The finding I-1 says the open rule moved across a group border also resets the panel's field, and that the list's effect then puts the focus on the arrow. I looked for that in the page and did not find it: see the next section.
- The handoff and the finding name no check of the styleguide's *Decision* lines by a script; `foundation_check.py` reports `0 errors`, but I did not find whether it checks the styleguide's decision identifiers at all.
- No command or file in the repository says whether a screen of the kitchen-sink page (`scripts/kitchen-sink.mjs`) holds the rule list; I left the page unbuilt.

## Choices, with the way rejected and its cost if wrong

- The portal into a movable host instead of lifting the panel's state: see I-1 above.
- `role="presentation"` instead of `none` or of two `<ol>` elements: see M-6.
- `overPanel` on the list's root, scoped by `panelHost.contains(event.target)`, instead of a handler on a wrapper element inside the portal: a wrapper would add an element between the slot and the panel and a rule of the stylesheet might need it; a handler on the root with no scope would also take the line away over the heading and the add buttons, which is a wider change of behaviour than M-7 asks. Cost if wrong: another drag path into the host (none known) would also clear the line.
- M-3: the replacement check holds the window width and the game state, which D-349's *violates* line names; the width alone cannot be seen in jsdom without a layout.
- A changed invariant test: none. The existing tests of the invariants were not edited.

## Problems as observed

- **The move of the open rule across a group border does not reach the panel in the real page, at the base as at the head.** In the page, `open` keeps the group id of the rule when it was opened (`program-panel.tsx`, `open.target.groupId`); after „↑”/„↓” across a border the rule is in another group, `panelStands` is false and the panel closes (the first draft of my page-level test, „„↑” on the open rule across a group border …”, failed with `the same panel: expected <section class="rule-panel">, got null`, at the head; the base code of `panelStands` is the same). I did not verify this in a real browser. So the second half of I-1 (the reset of the field by a move across a border) is a case of the list's own contract (the page may give another group id) and I covered it at the list's level only (`rule-editor.test.mjs`, the identity case, which moves rule 2 to group 2 and gives `open: { groupId: 2, ruleId: 2 }`). That the page closes the panel at such a move is pre-existing and no finding of this review; I made no change to it. If the player expects the panel to follow the rule, the page would have to update `open` at a move — a decision for the orchestrator, not made here.
- `rule-list.tsx`, `rule-editor.test.mjs` and `program-panel.test.mjs` were reformatted by `prettier --write` after my edits to match the head's clean state; the diff shows only my own changes.

## Questions

None.
