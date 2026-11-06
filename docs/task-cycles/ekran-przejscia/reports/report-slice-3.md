# Report — Slice 3 of `ekran-przejscia`

(Saved by the orchestrator from the executor's returned text: the harness refused the executor's own write.)

- **Status:** done with concerns
- **Commit:** `476b12a` feat: :sparkles: build the rule the button „Dodaj regułę z tym” adds from the held discovery and the copy, D-313 (base `1f899ec`).
- **Check result:** nothing failed. Not run, as the handoff says: the whole gate. Also ran `foundation_check.py` (not among the slice's checks): 0 errors.

## Files
- `src/browser/view/discovery-rule.ts` new, 109 lines: exports `discoveryRule(state): DiscoveryRule | null` and the type `DiscoveryRule = { program, open: RulePanelOpen }` (type-only import from `rule-panel.tsx`); pure, no DOM.
- `tests/view/discovery-rule.test.mjs` new, 18 cases.

## Checks (command → exit)
- Stub returning null: `npm test -- tests/view/discovery-rule.test.mjs` → 1; 15 of 18 failed (TypeError on first dereference); the 3 null cases passed trivially.
- Stub returning a non-null object: same → 1; 17 of 18 failed on assertions; „changes nothing in the state” passes for a pure stub.
- With the module: same → 0, 18 pass.
- Mutations, each seen failing, then reverted (`cmp` against a backup): target never taken from the discovery — 2 fail; target in the pick's order instead of the discovery's — 1 fails; last group instead of the first — 1 fails.
- `npm run typecheck` → 0.
- `npm test -- tests/quality/test_quality_invariants.py` → 0, 5 tests OK.
- `python -B .the-way/elements/common/foundation_check.py` → 0, „0 errors”.

## Own-work check
- Requirement most likely unmet: „first target the rule panel's grid offers” when no item of the discovery matches. The code takes `offeredResources(state)[0]`, what a pick of the action in the panel gives. The grid (`resourcePick`) lists all known resources in `RESOURCES` order, those the map lacks greyed, so its first cell could be greyed. Read `rule-panel.tsx` (`changed`, 318-351) and `program-editor.ts`, wrote a case for a target with no matching item. The two orders cannot differ on today's data (every map holds all four resources); the button never writes a greyed target.
- Mutations no test catches: none found.

## Choices made
1. Return shape `{ program, open }` or null; rejected: the program alone (the plan asks both from one function). If wrong, the wiring slice reshapes it.
2. Target source: the first item in the discovery's order among `offeredResources(state)`, else `offeredResources(state)[0]`; rejected: a greyed cell (a pick of one does nothing). Differs only when a map lacks a known resource, which does not happen today.
3. First action or condition needing a target with none offered (`withActionKind`/`withConditionKind` null): passes to the next action, then the conditions, then plain „Zawsze → Eksploruj” with the panel on the condition. D-313 is silent; null would grey the button on a state D-313 gives a rule for, and a rule without a target is not allowed by the types.
4. Streak: the module does not zero it; the app hands the program to `setProgram`, which zeroes it (D-131); one case checks `setProgram` takes the result whole and the streak goes 120 → 0.
5. Tests use the real first chill (`advanceMinutes(send(...), 100)`) and hand-written understandings and discoveries for the rest; expected rules written out.

## Concerns
1. A discovered action the character cannot use yet: D-313 says „Zawsze → {its first action}”. A discovery of „Obchód” (revealed by a skill tree) can hold an action whose branch is not bought; the panel greys it („gałąź niewykupiona”) and refuses a pick, but the button writes it into the rule and opens the panel on it. D-289 allows a held value outside the pick, shown greyed. Followed D-313 literally, no guard. Open question: should the button skip such an action? A guard is one filter by `offeredActionKinds(state)` in the first loop (`actionPick` in `program-editor.ts:655-688`).
2. „Offers” in „the first target the grid offers” read as „may be picked”; if it means the first cell whatever its state, one line and a comment change, and no test would.

## Reaches beyond the handoff
- `.the-way/task-cycle/change/slice.md`; `src/browser/view/rule-list.tsx:375-395` (`add`, how „+ reguła” opens the panel); `src/browser/sim/understanding.ts:90-150` and `src/browser/sim/game.ts:285-320`; parts of `tests/view/program-editor.test.mjs` and `tests/view/status-row.test.mjs`; `scripts.md` and `git.md` of the user's rules; a throwaway probe script in the scratchpad.
- All five guideline files read whole, `testing.md` in two reads to its end.

## Mismatches
- The plan's *Read* ranges for the foundation entries a few lines off; the handoff's ranges used.
- `guidelines/coding-browser-module.md`: no row added for `discovery-rule.ts` (this slice's *Change* names no guideline file); `foundation_check.py` passes without it. The row would be `| src/browser/view/discovery-rule.ts | copy | — |`, after `credits.ts`.
- Trust boundary: none touched; `saved-game.ts` and `SAVED_GAME_VERSION` untouched.

## Searches not found or unclear
- What D-313 prescribes when the first discovered action or condition needs a target and none is offered: not found in D-313, the task, D-124 or D-289 (choice 3).
- Whether a greyed grid cell counts as „offered”: unclear in `task.md:109-113` and D-313 (choice 2, concern 2).
- Whether the button should write a discovered action greyed for the character: unclear in D-313 (concern 1).
- The `copy`/`do not copy` status for a pure `.ts` view file with no DOM: the table's rule covers files that build elements; „copy” from the handoff taken as meant for them.
