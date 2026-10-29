# Slice 8 browser evidence

This note records only the local browser evidence preserved for Slice 8. The original browser tool transcript was not saved. I therefore distinguish what the screenshots, harness, server logs and earlier report support from invocation details that cannot now be verified. No browser was reopened for this clarification.

## Local app and browser setup

The app was built with `npm run build` (exit 0, recorded in [21-slice-08-report.md](21-slice-08-report.md)). The server output file [slice8-server.out.log](slice8-server.out.log) contains `Loop: http://127.0.0.1:34291`; [slice8-server.err.log](slice8-server.err.log) is empty. The prior execution note records starting `node dist/server/main.js` with `LOOP2_LISTEN_PORT=34291`, using `Start-Process`, and stopping owned PID `36316` after the browser work. The exact PowerShell argument list, readiness probe command/result, stop command, and process-exit result were not retained. Server readiness is supported by the server's ready line and the captured local page; a separately recorded readiness check and stop/exit proof are **unchecked**.

The prior report records Playwright interception of `GET /api/account` with a controlled test identity, and says no real account or save/server write was used. The exact route handler and response body were not retained. The test identity's payload and a separately captured network log are **unavailable**. The original Playwright MCP invocation and returned tool output were not retained either. The saved callback is [browser-proof.mjs](browser-proof.mjs); it was passed to the Playwright MCP browser callback runner, but its exact call arguments and per-call results cannot be recovered. This file is evidence of the callback's content, not a claim that rerunning it now would reproduce the session.

## What the saved callback does

The callback imports the built public simulation modules and the actual headquarters, program editor, status row, combat line, body row and terrain panel modules. It creates characters, runs the normal simulation to solve the Forest, calls the public end/send/advance functions, and mounts those actual view modules in the browser document. It wires the mounted view callbacks to the public simulation functions, then renders their resulting state. The callback includes an attack search on the fixed seed and a helper that prepares the two completion windows by adjusting streak and defeated-attack counters on an attacked checkpoint before allowing the actual simulation to resolve. The latter is a direct state preparation and is not evidence of a naturally reached completion path.

The saved callback does **not** mount the ordinary full application entry point for all later screenshots. The actual start page was captured from the built app; later prepared gameplay screenshots come from the callback's mounted actual view modules and simulation callbacks. This is component-harness browser evidence, not one uninterrupted player journey through `startApp`. The standard `createGameView` was separately instantiated and disposed in the browser per the earlier report; no retained tool output proves that call independently.

## Recorded observations and images

All images below are in this ignored reports directory. They were created by the local Playwright session; the exact individual screenshot calls were not retained.

| Image | Observation recorded at the time |
|---|---|
| [map-locked.png](map-locked.png) | Built app before Forest completion; the created character's map choices showed only the Forest. |
| [forest-completion.png](forest-completion.png) | After a real simulation on seed `1507423131` solved the Forest at minute 691, the headquarters showed the deeper map available to both characters. |
| [map-open.png](map-open.png) | The second character was sent to the deeper map through the actual headquarters controls. |
| [first-attack.png](first-attack.png) | On seed `2032115451`, first attack at minute 238 and health 28.25; discovery and the creature's starting health/program appeared, with status `Walczy z wilkiem`. |
| [active-combat.png](active-combat.png) | The prepared view showed the combat description and active combat status. |
| [combat-log.png](combat-log.png) | After editing the program through the mounted editor and advancing the actual simulation through M+5, the ordered exchanges and wolf defeat appeared. |
| [combat-death.png](combat-death.png) | A run without combat actions ended in combat death at M+5 and retained the record. |
| [completion-before-turns.png](completion-before-turns.png) | Directly prepared counter values followed by one real simulation minute produced completion before turns with a null result; the line retained only attack/program facts. |
| [completion.png](completion.png) | Directly prepared counter values followed by real simulation resolution produced the M+5 wolf defeat and completion in minute 243. |
| [restart.png](restart.png) | The run record cleared after Restart. |

The report also records that `Wznów` removed the discovery line and retained the combat line, and that `Zakończ` during an unresolved attack cleared it. The exact screenshots for the resumed-only state and the end-during-attack state were not retained; those particular observations cannot be independently checked from the image set. The status line showed combat throughout the resolution minute, with death/completion taking priority on terminal screens. Changing pace to 8× left the selected pace button focused. The exact focus assertion and browser accessibility snapshots are unavailable.

The ordinary game-view composition was reported to order children as `status-row`, `discovery-text`, `combat-line`, `body-row`, `terrain-panel`. The combat line was placed after discovery and before the body/terrain. The reported SVG contained no wolf image. These checks have no retained DOM dump or screenshot isolating the child list/SVG query, so their observation is recorded from the prior execution report, not independently evidenced here. No evidence was retained for the specifically requested interrupted-target state; it is **unchecked**. The screenshot set likewise does not establish every resource/target interruption branch.

## Return-condition assessment

- **D-75 — permanent real-browser journey automation:** no critical-journey defect escaped smaller tests in this slice, and this is one journey rather than evidence that repeated manual checks have become a significant recurring cost. This run did require substantial manual setup and harness work, but one unusually broad feature check does not establish recurring cost. Keep the deferred automation decision; reconsider if an escaped journey defect occurs or repeated checks become a sustained task cost.
- **D-87 — whole-screen image comparisons:** the browser images were inspected as evidence, but no concrete visual defect or agreed requirement for exact whole-screen layout emerged. Keep whole-screen pixel comparisons deferred.
- **D-88 — real browser events, focus and SVG:** these were manually exercised/reported: interface controls changed pause, pace and run state; the selected pace control retained focus; and the terrain SVG had no wolf image. No defect was found that the document-model tests missed. Keep persistent automation deferred under the current return condition; the browser evidence itself has the limitations stated above.
- **D-89 — review of exclusions:** the author has checked the return conditions above. The evidence does not justify permanent journey, pixel-comparison or focus/SVG automation now. The reviewer still needs to make the independent D-89 assessment as part of whole review.

## Evidence not available

No source artifact records the exact `Start-Process` invocation, readiness probe, stop command/process exit, account-interception body, Playwright MCP call arguments/results, DOM dump, or assertion output. The prior slice report lists the focused test/build/format/lint commands and exit results; these were not rerun for this report-only repair. Full `npm test` and mutation tooling remain unrun for this slice. No claim is made that the missing records can be reconstructed from the saved harness or screenshots.
