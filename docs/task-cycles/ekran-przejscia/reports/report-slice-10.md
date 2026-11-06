# Report — Slice 10 of the task cycle `ekran-przejscia`

(Saved by the orchestrator from the executor's returned text: the harness refused the executor's own write.)

- **Status:** done
- **Commits** (base `6c2f520`): `b8bd52d` status row; `65f03ce` body row; `0f8a3e8` combat line; `0f96357` trip lines. Each builds and passes its tests; each message names the cause (the screen moved to React, task item 8, D-265) and the case that now carries each removed behaviour.
- **Check result:** nothing failed; all nine slice checks passed. Not run: the whole gate and `foundation_check.py`.

## Files changed
| File | Added | Removed |
|---|---|---|
| `src/browser/view/status-row.ts` | 0 | 84 |
| `src/browser/view/body-row.ts` | 1 | 48 |
| `src/browser/view/combat-line.ts` | 0 | 20 |
| `src/browser/view/trip-lines.ts` | 0 | 38 |
| `tests/view/status-row.test.mjs` | 0 | 251 |
| `tests/view/body-row.test.mjs` | 0 | 79 |
| `tests/view/combat-line.test.mjs` | 1 | 28 |

What went: `createStatusRow` with `StatusRow`, `createBodyRow` with `BodyRow`, `createCombatLine` with `CombatLine`, `createTripLines`, and the imports and the `SEPARATOR` constant only they used (`BALANCE`, `createButton`, `setButtonSelected`, `tripWarning` in `status-row.ts`; the `GameState` type in `body-row.ts`); the seven DOM cases of `status-row.test.mjs`, the DOM case of `body-row.test.mjs` and of `combat-line.test.mjs`, the stand-in documents (`fakeDocument` in two files), the helper `rowAskingPaces` and imports only those used. Stayed: all pure functions, the type `StatusRowControls`, the pure cases, the whole stylesheet (`.status-row`, `.status-text`, `.discovery-text` left for the whole-change review).

## Checks (command, exit code)
- `npm test -- tests/view/status-row.test.mjs` (22 pass): 0
- `npm test -- tests/view/body-row.test.mjs` (9 pass): 0
- `npm test -- tests/view/combat-line.test.mjs` (2 pass): 0
- `npm test -- tests/view/trip.test.mjs` (7 pass): 0
- `npm test -- tests/sim/encounters.test.mjs` (29 pass): 0
- `npm test -- tests/view/headquarters.test.mjs` (19 pass): 0
- `git grep -n -E "createStatusRow|createBodyRow|createCombatLine|createTripLines" -- src tests`: 1 (no match, as required)
- `npm run typecheck`: 0
- `npm test -- tests/quality/test_quality_invariants.py` (5 pass): 0

## Which case now carries each removed behaviour
| Removed (base line) | Carried by |
|---|---|
| status-row 338: pause hidden after death, Restart and Zakończ stay | `run-header.test.mjs` „after a death the header reads the minute and the cause…” |
| status-row 442: discovery line shown while held, hidden once the player goes on; paused text and „Wznów” | `discovery-band.test.mjs` „there is no band without a discovery, and none once the player goes on”, the text cases at lines 140 and 152; the paused text and „Wznów” in `run-header.test.mjs` „the status text keeps the wording of the status row…” |
| status-row 495: five pace buttons, the state's pace selected | `run-header.test.mjs` „the header shows five pace buttons…” |
| status-row 516: a click asks for the pace; buttons stay while paused, go with death | `run-header.test.mjs` „a click on a pace button asks for that pace…” |
| status-row 550: text positive after a completion only; paces and pause gone; Restart and Zakończ stay | `run-header.test.mjs` „the status text is positive after a completion and only then…” |
| status-row 582: discovery held at a completion | `discovery-band.test.mjs` „a discovery held at a completion stands with „Dodaj regułę z tym” and no „Wznów””; its place `run-screen.test.mjs` „at a discovery the band stands in the program's area, above the program panel” |
| status-row 607: restart warning follows the copy's take list | `run-header.test.mjs` „the warning of a cut trip plan follows the current copy's take list” |
| body-row 154: danger only below the threshold, updates in place | `world-area.test.mjs` „only the value below its threshold stands in danger, and the backpack reads its pieces of the cap” |
| combat-line 49: paragraph hidden without a record, appears with one | `world-area.test.mjs` „the encounter paragraph is absent without a record and present when one appears” |
| `createTripLines` (no DOM case of its own) | `world-area.test.mjs` „the world area stands from the top…” and „the line of a death that used a resurrection is not in danger…”; the pure cases of `trip.test.mjs` |

Differences of form, not of behaviour: the DOM forms hid an element, the React forms draw nothing; the discovery line stood under the status row, the band now stands above the program panel (Slice 9, `run-screen.test.mjs`).

## Own-work check
- Most likely unmet: „change nothing the screen shows” and no lost behaviour.
- Checks: `git grep` for the removed names over the whole tree outside `.runs` and `.the-way` found nothing; `foundations/` does not name the four modules; each removed case read against the body of its carrier; typecheck and focused tests pass. No gap found; deletion leaves no new unprotected mutation.

## Reaches beyond the handoff
- The user's `C:\Storage\The Brain\The Brain\.ai\rules\git.md`; `plan.md` grepped for Slice 12 and `coding-browser-module`/`status-row`; `run-screen.test.mjs` case titles. `ui_check.md` not read (nothing on a screen changes). Five guideline files read whole (`testing.md`, `styleguide-browser-view.md` in two byte-ranges each).

## Trust boundary
None touched.

## Concerns
- `guidelines/coding-browser-module.md` now stale in two places: the example „Kontrolki w DOM i ich aktualizacja” says `status-row.ts` creates buttons once; `## Where in code` names `status-row.ts`. Slice 12 owns both.
- The comment above `StatusRowControls` still says „What the status row's buttons ask for” — roughly right for the header; left.
- A comment above the pure discovery cases in `status-row.test.mjs` still says the line „goes when the player moves on”; left (the plan limits the slice to the named cases).

## Searches not found or unclear
none
