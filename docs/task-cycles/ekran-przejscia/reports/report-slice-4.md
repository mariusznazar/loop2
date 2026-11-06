# Report — Slice 4 of the task cycle `ekran-przejscia`

(Saved by the orchestrator from the executor's returned text: the harness refused the executor's own write.)

- **Status:** done
- **Variant:** a slice (`.the-way/task-cycle/change/SKILL.md`, `slice.md`)
- **Base:** `476b12a`. **Commit:** `64a2fcf` feat: :sparkles: let the program panel add the rule of the held discovery and open it on the field the discovery filled, D-313
- **Check result:** all the slice's checks pass (program-panel 49/49, account-screen 128/128, typecheck, quality 5 OK). Not run: the whole gate; a check in a real browser.

## Files changed
| File | Added | Removed |
|---|---|---|
| `src/browser/view/program-panel.tsx` | 68 | 11 |
| `tests/view/program-panel.test.mjs` | 163 | 0 |

No trust boundary touched; `src/browser/sim/saved-game.ts` untouched.

## What was made
- `ProgramPanel` gains `addDiscoveredRule()`: returns in mode `programs` or with no state yet; commits uncommitted editor text through `commitEditor()` (the same blur `show` uses); takes `discoveryRule(state)` and returns where null; otherwise sets the program shown to the copy and records the request to open (`opening = found.open`); sends the program through `controls.editCopy` and draws.
- `ProgramPanelView` gains the prop `opening` (`RulePanelOpen` or null): each request a new object; during render the view compares it with the last seen (kept with `useState`) and opens that rule once, under the program shown — the pattern the view already uses to drop the open rule of another program. `OpenRule.target` widens from `RuleListTarget` to `RulePanelOpen`. Opening on the field with the focus there is what `RulePanelView` already does for an `open` with a `field`; the portal into the host and `onOpen` through `onRuleOpen` unchanged.
- Hooks: one `useState` added at the top level, after the existing ones and before any early return; no effect added or changed.

## Checks
| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/program-panel.test.mjs`, empty stub, new cases first | 1 | 46 pass, 2 fail (first-chill and saved-program cases, `expected [["editCopy"]], got []`); the „no discovery / Programy” case passed against the stub; M1, M2 showed it failing |
| same, with the implementation | 0 | 48/48 |
| M1: mode guard removed | 1 | „no discovery / Programy” fails: `expected [], got [["editCopy"]]` |
| M2: copy shown before the null check | 1 | same case: `the program shown stays: expected "1", got "copy"` |
| M3: request forced to the field `condition` | 1 | first-chill case: `the focus is in the action's pick: expected "Czynność", got "Warunek"` |
| M4: request applied again whenever the panel is closed | 1 | saved-program case: `closed by ✕: expected 0, got 1` |
| a cruder first try at M4 | 1 | React loop („Too many re-renders”), not evidence; replaced by M4 |
| `npm test -- tests/quality/test_quality_invariants.py`, first run | 1 | `test_prettier_source_format` failed on the test file; formatted with the local Prettier (`--no-config --no-editorconfig --write`) |
| M6, own-work check: `commitEditor()` removed | 1 | case 4: `expected "Las nocą", got "Program"` |
| `npm test -- tests/view/program-panel.test.mjs`, final | 0 | 49/49 |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 128/128 |
| `npm run typecheck` | 0 | — |
| `npm test -- tests/quality/test_quality_invariants.py`, final | 0 | 5 tests OK |

Each mutation made, run and reverted from a byte copy, checked with `cmp`. Final runs on the committed code. Not run: the whole gate; a check of real focus and events in a browser (D-88, D-264). This slice adds no caller.

## Cases written (`tests/view/program-panel.test.mjs`, section „Dodaj regułę z tym”)
1. At the first chill „Dodaj regułę z tym” adds „Zawsze → Eksploruj” at the end of the copy's group „Program”, opens it in the host on the action with the focus there, and the streak goes to zero — on a real first chill (`advanceMinutes(…, 100)` stops at minute 84); the cold has already set the real streak to 0, so the case sets it to 40 by hand, with a comment.
2. With a saved program shown on „Program:”, the call shows the copy and opens the new rule there, once; „✕” closes that panel, the focus goes to the new rule's row, the panel stays closed after a redraw.
3. With no discovery held, and on Programy, the call changes nothing and opens nothing.
4. Text typed into the copy's editor and not yet committed lands in the copy before the call adds its rule (the own-work check, kept as a case).

Expected values from D-313, D-124, D-131, D-166 and To do 7: `ALWAYS_EXPLORE`, „Reguła 1.2”, „Czynność”, „Eksploruj”; none computed by the editor's functions.

## Own-work check
- Requirement most likely unmet: the rule built on the copy as the player sees it — an uncommitted field of the copy's panel removed without a blur would lose its text.
- Check: case 4, run with `commitEditor()` removed (M6, exit 1: the name lost) and with it (exit 0: name and new rule).

## Choices made
- `commitEditor()` at the start of the call, before `discoveryRule`; rejected: only when the program shown changes, as `show` does (loses text typed into the copy's editor). Cost: with no discovery held, uncommitted text is still committed before the call returns; through the real button the click has already blurred the field.
- No guard that the game took the edit; the request recorded before `editCopy`. Rejected: opening only where the copy afterwards holds the new rule. Cost: a refused program would leave the open rule pointing at the next rule number; `setProgram` takes every program during a map run through `checkProgram`, and „+ reguła” opens without such a guard too.
- The request a new object, applied during render; rejected: moving the open-rule state out of the view into the boundary (larger than „nothing else of the panel changes”).

## Reaches beyond the handoff
- `src/browser/view/game-view.ts:170-250` (`editCopy` wiring); `src/browser/view/rule-list.tsx:72`; `src/browser/view/rule-panel.tsx:330-585`; `src/browser/view/controls/react-pick-cell.tsx`; `src/browser/sim/game.ts:296-316` (`setProgram`); `tests/view/discovery-rule.test.mjs`.

## Concerns
- A folded first group: the call opens the panel on a rule whose row is hidden; „✕” has no row to give the focus back to. The plan does not say whether to unfold; no case covers it.
- The module's header comment now names `addDiscoveredRule` and D-313 (inside `program-panel.tsx`, in *Change*).

## Searches not found or unclear
- Whether the call should unfold a folded first group: not in the plan, the task passages or D-313.
- How `tests/quality/test_quality_invariants.py` finds the tools of `.runs/quality-venv`: both runs put `.runs/quality-venv/Scripts` (and `bin`) first on `PATH`.

## Guidelines read
Whole: `src/browser/AGENTS.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md` (452 lines, to its end), `guidelines/styleguide-browser-view.md`, `tests/view/page-document.mjs`.
