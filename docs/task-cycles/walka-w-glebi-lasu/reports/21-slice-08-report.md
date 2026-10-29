# Slice 8 report

**Status:** done with concerns.

**Base:** `b960201d82830ce72767fbd6f1b5f2bb9b2ac4a9`  
**Commit:** `99b2a27` (`feat: :sparkles: show combat log in the game view`)

## Change

The run column now places a wrapping combat paragraph after discovery and before the body and terrain. It reads the creature's starting health and ordered condition/action pairs from creature data, then renders the recorded exchanges and outcome without replaying combat. The paragraph stays through the encounter and frozen ending screens, and clears with the run. The status names the attacking creature through the resolution minute; death and completion remain higher priority.

| File | Added | Removed |
|---|---:|---:|
| `src/browser/styles.css` | 6 | 0 |
| `src/browser/view/combat-line.ts` | 97 | 0 |
| `src/browser/view/game-view.ts` | 4 | 0 |
| `src/browser/view/status-row.ts` | 7 | 1 |
| `tests/view/combat-line.test.mjs` | 71 | 0 |
| `tests/view/status-row.test.mjs` | 41 | 0 |
| **Total** | **226** | **1** |

## Checks

Commands and results:

- `npm test -- tests/view/combat-line.test.mjs` — first run exited 1 as expected: the empty formatter returned an empty string for both assertions. A later run exited 1 because the creature name in the action sentence was lowercase. The final run exited 0: all 3 tests passed.
- `npm test -- tests/view/status-row.test.mjs` — first run exited 1 because the new wording said `wilk` instead of `wilkiem`. After the wording fix, exited 0: all 28 tests passed.
- `npm test -- tests/view/headquarters.test.mjs` — exit 0, 6 tests passed; the shared map availability filter and editor map list still behave as required.
- `npm test -- tests/view/program-editor.test.mjs` — exit 0, 39 tests passed; resource choices remain available outside a run and follow the active map during one.
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0, 4 tests passed.
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` — exit 0, 3 tests passed.
- `npm run build` — exit 0.
- `node node_modules/prettier/bin/prettier.cjs --check src/browser/view/combat-line.ts src/browser/view/game-view.ts src/browser/view/status-row.ts src/browser/styles.css tests/view/combat-line.test.mjs tests/view/status-row.test.mjs` — exit 0.
- `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view/combat-line.ts src/browser/view/game-view.ts src/browser/view/status-row.ts tests/view/combat-line.test.mjs tests/view/status-row.test.mjs` — exit 0.
- `git diff --cached --check` — exit 0 before commit.

The full `npm test` gate and mutation tooling were not run for this slice. The full gate remains for the later task cycle and review.

## Browser proof

Detailed evidence and the D-75/D-87/D-88/D-89 return-condition assessment are in [browser-proof.md](browser-proof.md). The original Playwright invocation and the exact server readiness/stop commands were not retained; the clarification states what remains unverified.

The built app ran locally at `http://127.0.0.1:34291/`. Its `GET /api/account` response was intercepted in Playwright with a controlled test identity; no real account was used and no save or other server write was made. The owned server process and browser page were closed after collecting evidence.

The first screenshot shows the actual app before the Forest is solved: the created character has only the Forest option. The later checkpoint used a local ignored harness at [browser-proof.mjs](../reports/browser-proof.mjs). It mounted the actual headquarters, editor, status, combat, body and terrain view modules and wired their controls to the public simulation functions. The accepted program and a real simulation run solved the Forest at minute 691 on seed `1507423131`; returning to the headquarters showed the deeper map for both characters. The proof then used the actual interface to send the second character to the deeper map.

For the attack, the harness prepared a solved-Forest checkpoint with combat knowledge withheld, then used the simulation on seed `2032115451`. The first attack happened at minute 238 with 28.25 health. The actual view showed the discovery pause, the initial creature program, and `Wznów` removing the discovery line while preserving the combat line. During a later pause, the actual editor added a group with `Uderz — patyk` and `Kopnij`; resuming advanced the simulation through M+5, where the combat record showed each exchange and the wolf's defeat. A second pass without combat actions produced combat death at M+5 and kept the record on the death screen. Clicking `Restart` cleared it; clicking `Zakończ` during an unresolved attack also removed it.

The two rare completion windows used a direct checkpoint adjustment in the ignored harness: it set the simulation run's streak and defeated-attack counters immediately before the final minutes, then let the real simulation resolve the next minute(s). At M+1 it completed with `result: null` and only the attack/program description. At M+5 it resolved the wolf defeat first and completed in minute 243. These screenshots verify the presentation and ordering branches; they do not claim a natural player path to those counter values. The normal `createGameView` was also instantiated and disposed in the browser; its run-column child order was `status-row`, `discovery-text`, `combat-line`, `body-row`, `terrain-panel`, and the SVG contained no wolf image. Changing pace to 8× kept the selected button focused.

Evidence is under the ignored reports directory: `map-locked.png`, `map-open.png`, `first-attack.png`, `active-combat.png`, `combat-log.png`, `combat-death.png`, `completion-before-turns.png`, `completion.png` (M+5), and `restart.png`.

## Own-work check and choices

The most likely miss was the ordering around M+5: the status must still say the character fights while showing the already recorded result, while death and completion must win over that activity. The focused status and combat formatter tests passed, and the local browser showed M+5 win, death, and both completion windows in the expected order.

The view has no state setter. I used the permitted ignored harness to mount the existing view modules with actual simulation results and callbacks, then separately checked the normal `createGameView` composition in the browser. This keeps the rare states reproducible; its cost is that the screenshots after the initial app screen are component-harness evidence, not a continuous session through `startApp`.

The status phrase uses the creature name from data and forms the current wolf's instrumental case for “Walczy z wilkiem.” This avoids hard-coding the creature name in the status text; an irregularly declined future creature name would need an explicit form in data. The only current creature is the wolf, and the focused test and browser both confirmed the required wording.

No decision, task or spec passage beyond those carried by the dispatch was needed. `ui_check.md` and the relevant Playwright MCP references were read for the screen check and browser work.
