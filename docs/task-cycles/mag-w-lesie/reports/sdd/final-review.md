# Final whole-branch review — task/mag-w-lesie, 1701186..b319b5f

Reviewed in three passes over the review package: foundation and data; simulation; view and tests. Re-run in a detached temporary worktree at b319b5f, removed afterwards: `npm run typecheck` clean; `npm test` 150/150; `run_tests.py tests/invariants` 44 OK. Probe: 24 h of real time passed in one call took 113 ms and reached minute 86400. Across 200 seeds, tiles holding 0/1/2/3/4 resources: 174/813/1214/827/172.

### Strengths
- The simulation's functions are pure and keep to their rules. `game.ts` validates against the closed list read from data (`checkProgram`, `allowedResources`). Every state-changing call returns `{state, events}`, and real time enters only through `passRealTime`/`send`. No id or name of a map, resource or archetype is written in code, and `rules.test.mjs` checks both rules (S1, S2) with control cases.
- The timing follows the task: `stepMinute` (run.ts:99-131) picks the next rule in the minute the action finishes, using the program in force then. Program edits never touch `current`, and `app.ts` flushes elapsed time before every edit and every button, so time already passed runs under the program it ran under.
- Randomness has one stream per kind, the draw order is a contract, and every check of a feasible action leaves the generator untouched. The two-process repeatability check and the throwing replacements for every random source are strong checks.
- The view holds one game state and replaces it only with results of simulation functions. The editor updates its controls in place (focus is kept), the terrain panel skips redraws when the map run object is unchanged, and the hovered tile survives redraws. Text goes in through `textContent` only, with no `innerHTML`.
- The pure view functions (`statusText`, `tileList`, `terrainPicture`, the editor's commit rules) are tested, including "every program the editor builds passes `setProgram`".

### Issues

#### Critical (Must Fix)
None.

#### Important (Should Fix)
1. **Resource icons draw as black squares, which darkens revealed tiles (task item 7: „odsłonięte jaśniejsze z ikonami”).**
   - Files: `assets/icons/*.svg` (each starts with `<path d="M0 0h512v512H0z"/>`, a black background, with the glyph drawn `fill="#fff"`); `src/browser/view/terrain-picture.ts:51` (icon side 0.7 × radius, up to 2×2 icons); `src/browser/index.html:69`.
   - What the player sees: a revealed tile is light (#dfe7cf), but each icon covers about 19% of the hex with a black square. With 3–4 resources (31% of tiles in the probe) that is 57–75% black, so revealed tiles can look like the dark unrevealed ones. Dimmed icons turn into grey squares. The tile-list header shows the same black squares.
   - Why it matters: item 7 depends on telling revealed tiles from unrevealed ones at a glance. This was deferred at Task 6 and never seen in a browser.
   - Fix: remove the background path from the four files and set the glyph fill to a dark colour. The icon test still passes, since it scans only for unsafe content. Changing the files is an adaptation, which CC BY 3.0 allows if the credit says the icon was changed. Alternatively, the human looks at it in the browser and accepts it.
2. **The check of task items 1–8 in a running browser was never done** (ruling: no browser automation). Hover tint, the per-minute icon redraw and the console are unverified. The request must report them as unchecked, never as passed, and should ask the human to run the plan's step-10 check. Issue 1 is the kind of defect that check would catch.

#### Minor (Nice to Have)
1. `src/browser/view/footer.ts:32-36`: the credit links open in the same tab. The state lives only in page memory, so a click mid-run loses the run and the program. Add `target="_blank"` (`rel` is already set).
2. `src/browser/sim/run.ts:101`: `minute !== run.current.endMinute` never fires for an activity of 0 minutes. A map added through data alone (D-08) with `stepMinutes: 0` would freeze the run without any error. Use `>=`, or reject durations below 1 when the data is loaded.
3. `src/browser/view/terrain-picture.ts:37`: icons follow the global `RESOURCES` order, while the tile list follows the map's order. They are the same for Las and will drift apart for other maps. Use `MAPS[run.mapId].resources`.
4. `src/browser/sim/hex.ts:4`: `DIRECTIONS` is never used.
5. `tests/view/icons.test.mjs:15-29`: the untrusted-input check does not reject `<!DOCTYPE`/`<!ENTITY`, `<?xml-stylesheet`, `<style>`/`@import` or an unquoted `href`. The files are drawn only through `<img>`/`<image>`, where nothing external loads, so the risk today is low.

### Recommendations
- Before saving arrives (task 16), add one test with fixed expected values that pins the generator, `mixSeed` and the layout draw order. Today a change to the order D-12 calls fixed would not fail any test.
- After „Wyślij” and „Zakończ”, move focus to the panel that appears.
- Settle the ruling's open item before the request: `build-tools`/`account-server` *Depends on*. `build.mjs` now copies files that belong to `browser-view`.

### Declined to judge
- Decisions D-12/1…D-16/1 are written now, by ruling Q28. The frozen task says those entries are only made partly true here and are written by tasks 4, 5, 8 and 18. The ruling is recorded; I flag it as a departure from the task for the human to confirm, and leave the wording to the independent foundation assessment. The code agrees with every entry on the branch: D-04/3, D-08…D-16, the four invariants, the glossary terms and the part map.
- During a run the mage's name „Mag żywiołów” is not shown, only on the send panel. Item 2 is met by the send panel, as the spec designed it.
- Visual quality beyond issue 1 (blink, hover tint, layout on phones): this needs a browser.
- Whether `performance.now()` advances while the computer sleeps: that depends on the platform.
- The four invariant checks were read for consistency with the code only. They are read-only, and their deliberate breaks ran at Task 5.

### Assessment

**Ready to merge?** With fixes

**Reasoning:** The simulation and the view are correct, tested and faithful to the task. Every test and invariant check passes on a clean build. The one issue that matters to the player is the black-square icons undermining item 7. Fix it, or have the human accept it in the browser check, which the request must list as not done.

### Triage of deferred minors and rulings
| Ledger line | Fix before merge? |
|---|---|
| T1 data test checks `forest` only | No: `satisfies MapDef` types ids at compile time |
| T1 `BALANCE` shape | No |
| T2 `DIRECTIONS` unused | No (Minor 4) |
| T2 tie/off-list tests, unreachable `return null` | No |
| T3 no fixed-value test of generator/draw order | No; add before task 16 |
| T3 guarantee path/seed > 2³¹ | No |
| T4 zero-duration freeze | No (Minor 2); data has 5 and 20 |
| T4 events share `activity` objects | No |
| T4 Idź duration test | No: the Wędruj test separates tile cost from map cost |
| T4 spec lists 3-arg `newMapRun` | No (Q40) |
| T5 S2 scan omits `main.ts` | No |
| T5 S2 flags variables named like ids | No |
| T5 `send` accepts non-finite `realMs` | No: the seed still changes through `lastSeed` |
| T6 icon test gaps | No (Minor 5) |
| T6 `sourceUrl` unverified | No |
| T6 icons' black background | **Yes**: Important 1, or the human accepts it in the browser |
| T7 "no numbers" test checks the key only | No |
| T8 credit links same tab | No, but a one-line fix (Minor 1) |
| T8 focus to body | No |
| T8 `footerCredits`/`sendTargets` untested | No: the icon test guards that every icon has a credit |
| T9 select not reset on null | No: unreachable with today's data |
| T9 editor closure uses names declared later | No: it runs only on user events after `startApp` |
| T9 editor DOM wiring untested | No: browser check |
| T9 offered map = first target | No: one map |
| T10 icon URL template duplicated | No |
| T10 per-minute icon rebuild | No: browser check |
| T10 redraw skip/hover untested | No |
| Ruling: briefs by awk | No |
| Ruling: foundation step 2 after Slice 6 | No |
| Ruling: expected interim failures | No: all resolved, gate 44 OK |
| Ruling: stream constants | No |
| Ruling: `newMapRun` 4th parameter | No |
| Ruling: event order | No |
| Ruling: extra exports `walkTarget`/`RunView` | No: `walkTarget` is shared by `run.ts` |
| Ruling: `advanceMinutes` RangeError | No: sound, guards an endless loop |
| Ruling: `assets/icons/**` trust boundary | No |
| Ruling: `build-tools`/`account-server` *Depends on* | Not code; settle in the return step before the request |
| Ruling: no browser automation | Not code; the request must report items 1–8 unchecked in the browser (Important 2) |
