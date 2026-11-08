PASS 5e814591a904063749c6a0471779e75a4fbc83c7

# Report 11 — review of fix 1 (task proporcje-sceny-i-programu)

- Range: `38dfa8c..5e81459` (`git rev-parse HEAD` = `5e814591a904063749c6a0471779e75a4fbc83c7`, as the handoff gives); five commits `a43cc8e`, `c6a99da`, `9f278ce`, `405534e`, `5e81459`; diff and log computed as `git diff 38dfa8c..HEAD`, `git log 38dfa8c..HEAD`.
- Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md`. Bounded by `reports/10-findings-fix1.md` (I-1, M-1 to M-7); fix report `reports/10-fix1-report.md` read as claims.
- Counts: blocking 0 · Minor 1 (new in the fix diff, within the task) · out of scope 1 (the line of *Declined to judge*). Every finding of the findings file: fixed.

## The findings of the findings file

### I-1 — fixed

- The panel is now one React subtree drawn once by `createPortal(panel, panelHost)` at the end of the list's root (`src/browser/view/rule-list.tsx:763-764`), into one host element (`:232-241`). The two places the list used to draw it — the `<li>` under a row (`:578-584`) and the `<div>` under a header (`:684`) — are empty slots whose stable ref `seatPanel` appends the host when it is not already their child. A change of place therefore moves one DOM element and keeps the same `RulePanelView` instance: `focusedKey`, the field shown and the cursor stay, and the panel's focus effect does not run as an opening.
- The order of effects holds: the portal is the last child of the root, so in the layout phase the slots' refs (in the groups, earlier in the tree) attach the host before the panel's layout effect calls `focus()` on an opening. The new case „opening a rule, and then a rule of another group, takes the focus into the panel each time” passes, and the fix report gives a real-browser run of opening with the focus in the panel.
- Evidence:
  - My own scratch case from the review of the whole change (open rule 1 on Programy, focus „Zwiń grupę”, click it, read `document.activeElement`), run again at `5e81459`: passes. The focus stays on the button. At `38dfa8c` it failed.
  - The fix's cases in `tests/view/program-panel.test.mjs` (fold and unfold with Enter, „zwiń wszystkie”/„rozwiń wszystkie”, the field „Czynność” kept, the same `.rule-panel` element, `acts` empty) and in `tests/view/rule-editor.test.mjs` (the same element after a fold, an unfold and a move to another group) pass at the head. The orchestrator reports them failing on `38dfa8c`.
- The handoff's question, whether I-1 is fixed for what a player can do on the page:
  - Fold, unfold, „zwiń wszystkie” and „rozwiń wszystkie” — the part of I-1 a player meets — are fixed at the page's level (`program-panel.test.mjs` through `createProgramPanel`; the fix report adds a real-browser check with Enter and Space).
  - The move across a group border: my finding said the field resets there. The fix report shows that in the page the panel closes at such a move, at the base as at the head. `program-panel.tsx` keeps `open.target.groupId` of the opening, and `panelStands` needs the rule in that group; the same code stands at `01b26d5`. I accept that: that half of my finding described a list-level case the page does not reach. Closing the panel at such a move is behaviour from before this task, not a finding of it. The list's own contract is covered by the identity case.
  - I also checked a move within the group, which the page does reach. A scratch case, „↓” on the open rule 1 of two in one group, after moving the field to „Czynność”: the panel is the same element, under row 1 in its new place, the field still „Czynność”, one panel. The focus lands on „W górę” of rule 1, since „W dół” is now disabled — the list's `move` keys, as before.
- What the fix itself might break — inspected, nothing found:
  - Focus: the guard `panelHost.parentNode !== place` means a redraw at a game tick moves nothing. The two 16× typed-number cases (`rule-editor.test.mjs`, `program-panel.test.mjs:902`) pass.
  - DOM move of the host while the focus is inside the panel: the host moves only when the slot changes. That follows a fold, a move or an opening, all made from controls outside the panel. When React reorders keyed items within a group, the panel item may move, but those reorders come from a row's arrows or a drag handle, so the focus is outside the panel.
  - Keyboard: React events from the panel now bubble through the portal to the list's root and on to the program panel, no longer through `ol`/`section`. Those only held drag handlers, so key handling is unchanged.
  - Drag: see M-7.
  - Kitchen-sink page: `src/browser/kitchen-sink/` and `scripts/kitchen-sink.mjs` hold no reference to `rule-list` or `program-panel`, so the page does not import the changed module (D-269).

### M-1 — fixed

`guidelines/styleguide-browser-view.md:84` and `:579` now name D-349. `:129` and `:597` say the fact with D-349 and no „bo”. `foundation_check.py`: `0 errors`.

### M-2 — fixed

`src/browser/styles.css:246-248` says the 320 px and the 526 px hold without a classic scrollbar. It also gives the case with one: about 511 px at 1280 px, and under 320 px from 1074 px to about 1090 px. That matches the arithmetic (window − scrollbar − 32 − 706 − 16). No layout value changed, which the finding allowed.

### M-3 — fixed

The checks of the absent export names are gone. In their place the case draws the scene in a window of 800 px with a completed map run and of 1920 px with a running one (`tests/view/world-area.test.mjs:411-433`). Each time it requires 672 × 304 on the background and no inline `style` on the frame. That checks behaviour, D-349's *violates* by window width or game state. As the fix report says, a scale keyed by a media rule alone stays outside what jsdom can see. The test passes at the head.

### M-4 — fixed

`src/browser/view/game-view.ts:646-647` no longer names a host.

### M-5 — fixed

D-166 (`foundations/decisions.md:3072`, its *complies* example at `:3078-3079`) says „on the right”. The rest of the entry is unchanged. See the new Minor N-1 on its *Origin*.

### M-6 — fixed

The slot under a row is `<li className="rule-list-panel" role="presentation">` (`rule-list.tsx:579-584`). The test checks the attribute and passes.

### M-7 — fixed

The panel is drawn through the portal, so a `dragover` over it reaches no group `section`. The root's `overPanel` (`rule-list.tsx:400-404`, bound at `:739`) takes the line away and does not cancel the event, so the browser accepts no drop there. The new case covers a rule and a group dragged over the panel: no line, the event not accepted, a `drop` committing nothing. The old case still passes. A drop on the panel now lands nowhere instead of at the end of the group; that is a choice the fix report names, and no decision makes the panel a drop target.

## New findings of the fix diff

- **N-1 (Minor, within the task)** — `foundations/decisions.md`, D-166 *Origin* (line `:3085` area). The binding sentence and the example changed („on the right”), but *Origin* names no source for the change. In this task every other changed decision (D-282, D-288, D-311, D-19, D-338, D-343, D-345, D-346, D-334) gained `zadanie_proporcje_sceny_i_programu_loop2.md … Decisions in play` or the item that carries it. The reason for the new wording lives in that task: the third column is gone (To do 3, question 3). Effect: a reader of D-166 who wants the reasoning behind „on the right” finds no pointer. Fix: add the task document to *Origin*, as the other entries have it. This blocks nothing.

No new Critical or Important finding.

## Declined to judge

- The page closing the open rule's panel when „↑”/„↓” moves the rule across a group border (`open.target.groupId` in `src/browser/view/program-panel.tsx`): the base `01b26d5` behaves the same and no part of this task asks for the panel to follow the rule; it is for the orchestrator or a later task to decide whether the page should update `open` at such a move.

## Checks run

All in a separate worktree of `5e81459` at `.runs/review-fix1-wt`, with `node_modules` joined from the reviewed worktree. The worktree and its junction were removed afterwards. The reviewed worktree, its index and its branch were not changed (`git status --short` empty; HEAD `5e81459`).

| Command | Exit | Result |
|---|---|---|
| `npm run build` | 0 | |
| `node scripts/test-node-file.mjs tests/view/rule-editor.test.mjs` | 0 | 73 pass |
| `… tests/view/program-panel.test.mjs` | 0 | 53 pass |
| `… tests/view/run-screen.test.mjs` | 0 | 13 pass |
| `… tests/view/account-screen.test.mjs` | 0 | 128 pass |
| `… tests/view/world-area.test.mjs` | 0 | 21 pass |
| `… tests/view/end-question.test.mjs` | 0 | 17 pass |
| `… tests/view/right-area.test.mjs` | 0 | 13 pass |
| `… tests/view/scene.test.mjs` | 0 | 19 pass |
| `… tests/view/rule-signs.test.mjs` | 0 | 6 pass |
| `… tests/view/program-editor.test.mjs` | 0 | 52 pass |
| `… tests/view/react-controls.test.mjs` | 0 | 55 pass |
| scratch copy of `program-panel.test.mjs` with two cases: A (fold keeps the focus on the button, my I-1 case) and B („↓” within the group keeps panel, field and focus) | 0 | 55 pass; A passes; B: same panel, under row 1, field „Czynność”, focus „W górę” of rule 1 |
| `npm run typecheck` | 0 | |
| `npx eslint --max-warnings 0 src/browser/view/rule-list.tsx src/browser/view/game-view.ts tests/view/program-panel.test.mjs tests/view/rule-editor.test.mjs tests/view/world-area.test.mjs` | 0 | |
| `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore $(git diff --name-only 38dfa8c..HEAD -- src tests)` | 0 | |
| `python -B scripts/test.py tests/invariants/test_browser_view_token_values.py` | 0 | |
| `python -B scripts/test.py tests/invariants/test_browser_view_focus_outline.py` | 0 | |
| `python -B scripts/test.py tests/invariants/test_browser_view_framework.py` | 0 | |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `grep -rln "rule-list\|program-panel" src/browser/kitchen-sink scripts/kitchen-sink.mjs` | 1 | no match: the kitchen-sink page does not reach the changed module |

A command `npm run kitchen-sink -- --help`, which I meant as a quick probe, started the preview server instead. I stopped it and its npm parent (PIDs 30412, 10388) at once, and no node process of it remains. It wrote nothing to the reviewed worktree.

Not run:
- The full `npm test` (the orchestrator's run).
- Any check in a real browser. The fix report gives one for fold and unfold, which I did not repeat. My evidence for the focus is jsdom plus the explicit `focus()` path, as in the review of the whole change.
- The fix's failing-first runs on `38dfa8c`: the orchestrator reports them (exit 1 with 2 and 3 failures); I did not repeat them.

## Reaches beyond the handoff

- `.the-way/elements/decisions/template.md` and `.the-way/elements/decisions/skill/decide_entry.md`, a search for „Origin”, for N-1.
- `foundations/decisions.md`, D-166 whole, for M-5 and N-1.
- `src/browser/kitchen-sink/` and `scripts/kitchen-sink.mjs`, a search, for what the handoff asks about the kitchen-sink page.
- `tests/sim/program-fixture.mjs`, the signature of `programFromRules`, for scratch case B.

## Searches not found or unclear

- No test or check covers the panel's host being moved while the focus is inside the panel. I found no path on the page that does that; this is a reading of the code, not a check.
- Whether the decisions skill requires *Origin* to grow when an entry changes: the template says *Origin* points to where the full reasoning lives; I found no sentence that says an edit must add to it. N-1 rests on that pointer and on the practice of this task's other entries.
