# Report — Slice 8, the band of a discovery

(Saved by the orchestrator from the executor's returned text: the harness refused the executor's own write.)

- **Status:** done
- **Commit:** `8bac89d` (base `5389bf4`) „feat: :sparkles: add the band of a discovery in React with the text, the sentence about the rule the game wrote, "Dodaj regułę z tym" and "Wznów", D-122, D-312, D-313”.
- **Check result:** nothing failed at the end; not run: the full gate, `foundation_check.py`, a screenshot. The quality-invariants test failed once on lint (destructured method props, fixed) and passed on rerun.

## Files changed
| File | Added / removed |
|---|---|
| `src/browser/view/discovery-band.tsx` (new) | +70 / -0 |
| `src/browser/styles.css` | +20 / -0 |
| `tests/view/discovery-band.test.mjs` (new) | +287 / -0 |

## What the component is (for Slice 9)
`DiscoveryBand({ state, onAddRule, onResume })`; props are property types `onAddRule: () => void`, `onResume: () => void` (destructured method signatures fail `@typescript-eslint/unbound-method`).
- Draws nothing while `state.discovery` is null.
- Markup: `<div class="discovery-band">` holds `<p class="discovery-band-text">`, then `ReactButton` „Dodaj regułę z tym”, then `ReactButton` „Wznów”, both plain (class `button` only).
- Text: `discoveryText(discovery)` unchanged; after one space „Gra dopisała regułę w grupie „{nazwa}”: Zawsze → Eksploruj.” only when `chillRuleGroupName(state)` gives a name (D-312); „Zawsze” and „Eksploruj” from `CONDITIONS.always.label`, `ACTIONS.explore.label`; no rule number.
- „Dodaj regułę z tym” disabled when `discoveryRule(state) === null`; a click calls `onAddRule()` with no argument (Slice 9 can call `programPanel.addDiscoveredRule()`, which recomputes the rule).
- „Wznów” absent when `state.run !== null && mapRunEnded(state.run)` (after a completion and after a death); a click calls `onResume()`. „Dodaj regułę z tym” stays at an ended map run.
- CSS: `.discovery-band` a wrapping flex row, `gap: var(--space-s)`; `.discovery-band-text` `color: var(--discovery)` and a left bar `border-left: var(--bar-width) solid currentColor` (D-279). Existing tokens only.
- Untouched: the old `.discovery-text` rule and `status-row.ts`.

## Checks
| Command | Exit | Note |
|---|---|---|
| `npm test -- tests/view/discovery-band.test.mjs` before the code (stub returning null) | 1 | all 9 cases failed on their assertions; preconditions passed |
| same, after | 0 | 9 pass |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | 4 OK |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 | 3 OK |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | 1 OK |
| `npm run typecheck` | 0 | |
| `npm test -- tests/quality/test_quality_invariants.py` | 1, then 0 | first run `test_eslint_source_rules` `unbound-method` at destructured `onAddRule`, `onResume`; changed to property function types; band test, typecheck and the three invariant checks rerun, all 0 |

Not run: the whole gate; `foundation_check.py`; a screenshot.

## Cases (`tests/view/discovery-band.test.mjs`)
1. First finished exploration of a tile with sticks and berries: „Odkryto: Idź, Zbierz, Patyk, Jagoda. W regułach można teraz sprawdzić: Tu leży mniej niż … szt., Zapas poniżej … szt.”, no rule sentence, both buttons.
2. First chill in the real simulation to minute 84: the text, then „Gra dopisała regułę w grupie „Program”: Zawsze → Eksploruj.”, no rule number.
3. First group „Ogień” with „Głód” after it gives „Ogień”; after a rename „Ciepło”; after „Głód” dragged above it (order checked as a precondition) still „Ogień”.
4. The rule deleted while the band stands: the discovery text and no sentence.
5. No band without a discovery; the band at the discovery; gone after `setPaused(false)` (carries `status-row.test.mjs:442`).
6. A discovery held at a completion at minute 480: „Dodaj regułę z tym” and no „Wznów”; the same after a death; the same state not ended shows both (carries `status-row.test.mjs:582`).
7. Each button calls only its own callback.
8. Both buttons have exactly the class `button` (D-44).
9. All rule groups removed (precondition checked): „Dodaj regułę z tym” disabled and calls nothing; „Wznów” enabled.

Mutations tried and restored: „Wznów” always drawn — 3 fail; „Dodaj regułę z tym” never disabled — 3 fail; sentence always written — 7 fail; „Wznów” wired to `onAddRule` — 3 fail; band drawn without a discovery — the build refuses it.

## Own-work check
Most likely unmet: „Wznów” absent at an ended map run, and „Dodaj regułę z tym” disabled when Slice 3 gives null. Cases 6 and 9 with hand-set end states and an edited copy, each with a precondition, pass; the matching mutations fail them. Screenshot unchecked: no screen renders the band until Slice 9; the bar, spacing and wrapping need a look in the browser then.

## Reach beyond the handoff
None beyond the files and entries named; `guidelines/testing.md` read whole in parts with `sed -n`; `ui_check.md` read for the screenshot rule.

## Choices
- Bar at the text in `currentColor` (D-279 allows); alternative text alone; deleting its CSS reverts it; no test depends on it.
- One paragraph: text and sentence joined by a space (D-312 „after what was discovered”).
- No argument to the callbacks (`addDiscoveredRule()` recomputes).
- `mapRunEnded` also covers death (D-122 names only completion; death also leaves nothing to go on to; the header drops „Pauza” and „Wznów” in both).
- Untested edge: a discovery with no map run draws the band with „Wznów” — read as unreachable.

## Boundaries
No trust boundary touched; `saved-game.ts` and `SAVED_GAME_VERSION` untouched; no row of `guidelines/coding-browser-module.md` added (Slice 12's).

## Searches not found or unclear
- Nothing missing.
- The prop names `state`, `onAddRule`, `onResume` are the executor's; Slice 9 must use them or rename them with the test.
