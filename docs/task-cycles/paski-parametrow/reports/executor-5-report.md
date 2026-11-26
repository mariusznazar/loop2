# Report — executor of slice 5 — task `paski-parametrow`

**Status:** done with concerns (two questions of choice below, none blocking)

## Files and commits
Base `2cfee2ed`. Two commits on `task/paski-parametrow`:
- `28ffeaf4` — `src/browser/view/body-blow.ts` (new, 53 lines), `tests/view/body-blow.test.mjs` (new, 158 lines).
- `3107f6f7` — `src/browser/view/body-row.ts` (+232/−4), `tests/view/body-row.test.mjs` (+371), `tests/view/body-blow.test.mjs` (the `decision:` quotations moved to the start of their sentences).

Total 810 added, 4 removed. `body-row-cells.tsx`, `world-area.tsx` and every stylesheet are untouched.

## What was made
`body-blow.ts`: `blowMarker(events, lastCombat, pace)` gives `{ text: "−21 · wilk", minute }` or null.
`body-row.ts`, new next to the functions of today (which keep their shape, so `bodyCells` and the component that uses it are unchanged):
- `bodyRowCells(run, map)`: four cells `{ id, name, number, alarm, meter, note, frame }`; meter is `{kind:"bar", share}` (0–100) or, for temperature, `{kind:"scale", share, zone}`; `frame` is `"warming" | "cooling" | "plain"` for temperature, null for the others.
- `temperatureZones()`: the three zones with `from`, `to` and `share` of the scale's width (45.45 / 36.36 / 18.18 %, that is 5:4:2).
- `bodyExplanation(id, map)`: the words of the explanations of temperature, satiety and nature energy, null for health.
- `bodyValues` now builds its text from the same `NAMES` and `bodyNumbers` the new cells use; its output is identical (its old cases pass unchanged).

## Checks (command, exit code)
- First failing runs, before the code: `npm test -- tests/view/body-blow.test.mjs` exit 1 (6 of 8 failed on the stub, 2 passed that hold for a stub: 8×/16× none, no event none); `npm test -- tests/view/body-row.test.mjs` exit 1 (17 new cases failed on the stub, the 17 old passed).
- After: `npm test -- tests/view/body-row.test.mjs` exit 0 (34 pass); `npm test -- tests/view/body-blow.test.mjs` exit 0 (8 pass).
- `npm run typecheck` exit 0.
- `npm test -- tests/invariants/test_content_identifiers.py` exit 0 (5 tests); `npm test -- tests/invariants/test_cross_part_imports.py` exit 0 (10); `npm test -- tests/quality/test_quality_invariants.py` exit 0 (8).
- Also: `npm test -- tests/view/body-row-cells.test.mjs` exit 0; `npm test -- tests/view/world-area.test.mjs` exit 0; `npx eslint` on the four files exit 0; `npx prettier --check` on them passes; `python -B .the-way/elements/common/foundation_check.py` exit 0, "0 errors" (it first reported 22 errors, each "the quotation does not begin a sentence" of a `decision:` line of mine; I moved the quotations to the start of their sentences, and it passed on the re-run).
- A first run of `npm test -- tests/view/body-row.test.mjs` hung: my test helper `withData` destructured `[owner, key, , value]` of three-element entries, so it wrote `undefined` into the data and the body's own loops never ended. Fixed to `[owner, key, value]`; the rerun passed (34). A test-helper fault, not a fault of the code under test.
- Not run: the full gate (as ordered), `tests/quality/test_function_and_file_size.py` (no file nears 800 lines or a function 200; `body-row.ts` is now about 335 lines).

## Own-work check (section 3)
Requirement most likely not met: the blow marker must come from the simulation's real events, with the creature named though the attack comes five game minutes before the blows, in an earlier call. A check against the real simulation (`.runs/task-cycles/paski-parametrow/reports/executor-5-probe.mjs`, run from a directory two levels under the worktree root, `node probe.mjs`; it sends a character on Las — głębiej with Las solved, steps one game minute per call and calls `blowMarker` on the call that holds `combatExchange` events) showed three combats (seeds 2, 4, 6), each with no `attacked` event in the call, and the marker came out `−7 · wilk`, `−14 · wilk`, `−28 · wilk` at 1× (name from `lastCombat`), and null at 8×. Sums equal the sums of the strikes' `damage`. All three were killing blows, so it also shows that a killing blow gives the marker.
Mutations tried by hand and caught: health alarm `<` to `<=`, pace limit `>` to `>=`, zone border `<` to `<=` at 39 °C (each made a case fail; sources restored). Mutations I reasoned about and the cases that hold them: no clamp at the left end (the cases at 28.4 and 18 °C), the character's own damage counted in the sum (the case with `characterAction.damage`), a hard-coded cap instead of the data (the case that changes the data), the frame ignoring an extinguished campfire or another tile (the frame case), no reset between two combats of one call (the two-combat case).

## Behaviour a user sees
The change alters none: it adds pure functions that no screen calls yet (`bodyRowCells`, `temperatureZones`, `bodyExplanation`, `blowMarker`); `body-row-cells.tsx` still draws from `bodyCells`. No walk, no screenshot.

## Choices I made (with the way rejected and the cost if wrong)
1. **The sum of a combat's blows is the sum of the creature's `damage` of each strike, not the health the character lost.** In a killing blow they differ: seed 4 above lost 8.65 health and the marker reads „−14”. D-450 says „the sum of the creature's blows”, and its example „−21 · wilk” is three blows of 7. Rejected: the health actually lost (needs the health before the combat, which the events do not carry, and the marker would then be found by a comparison, which D-450 forbids). Cost if wrong: a killing marker shows more than was lost; the change is one line in `blowMarker`.
2. **The border of the chill and safe zones is the game's threshold of chill (`BALANCE.body.chilledBelow`, 35), not a number of the look.** The plan lists 30, 35, 39 and 41 as numbers of the look; I made 30, 39 and 41 constants of the view module and the health alarm 35 another, and tied the border to the data so that the marker is in the zone of chill exactly when the temperature is in alarm (a case holds this with the data changed). Cost if wrong: if the human wants the border to stay at 35 whatever the data, it is a one-line change; today the two are equal.
3. **Which combat's marker a call gives:** the call's events are split into combats at `combatEnded`; the last combat whose sum is at least 2 gives the marker (a later combat with a smaller sum leaves the earlier one standing). The creature is the one of the `attacked` event of the call before those blows, else the creature of `run.lastCombat`. The simulation puts the attack five minutes before the blows, and a call spans at most 3.2 game minutes at 16× (about one at 4×), so in practice the creature comes from `lastCombat`, as the check above showed. A call that spans more (a hidden tab) and holds an attack after the blows of another creature's combat would name the creature of the last combat; every map has one attacker, so that cannot differ today. Rejected: reading only `attacked` events (would name no creature in nearly every call).
4. **The number apart keeps its unit, as today**: „36,9 °C”, „82 %”, „100”, „90”. The plan says „the numbers as today”; D-337's example shows „14” at the right of satiety with no sign. Cost if wrong: remove the ` %` in `bodyNumbers`.
5. **Cool or plain is read from the body's own step** (`bodyMinute(body, 0, map)` lowers the temperature or not), not from a comparison of the map's air with the body's temperature, so the frame says „plain” exactly where the note says „nie stygnie” and the body does not cool, whatever the body's temperature.
6. **Shares are exact, not cut down** (satiety 82.5 gives 82.5 %), while the numbers are cut down as today. Bars at 100 stand full.
7. **Explanation wording** (after the old Loop's lines the task quotes, with the data's numbers; names of items and maps avoided, as the invariant `content-identifiers` requires):
   - temperature, Las: „Poniżej 35 °C postać marznie — traci 0,35 zdrowia na minutę, a passa się zeruje. Otoczenie 25 °C: temperatura spada tu o 0,024 °C na minutę, a ognisko podnosi ją o 0,5 °C na minutę, najwyżej do 37 °C.”; on a map that does not cool: „… Otoczenie 37 °C: ciało tu nie stygnie.”
   - satiety: „Poniżej 30 % postać głoduje — traci 0,35 zdrowia na minutę, a passa się zeruje. Sytość spada o 0,6 % na minutę, tak samo na każdej mapie.”
   - nature energy: „Czary kosztują energię natury; pusta energia nie odbiera zdrowia, zamyka tylko czary. Energia wraca o 0,5 na minutę, ale tylko przy sytości od 60 %, najwyżej do 100.”
   They name no burning item's warmth (0,15 °C), since naming it would need the item's identifier; the human may want it added. Passa zeroing and the health losses follow D-136, D-60 and D-387; the regain follows D-377.
8. **Tests change the game's data** (`BALANCE` is mutable at run time) inside `try/finally` to show that bars, thresholds and explanation numbers are read from the data and not written in the code; the data is put back after each case.
9. **Plan's *Change* list is kept**, but `temperatureZones()` is an addition of mine (the plan names the marker's place and zone, not the zones' widths); slice 6 needs the 5:4:2 widths and I would not leave them to a literal in CSS or the component.
10. **Old `bodyValues` / `bodyCells` stay** (the plan says what the component uses today stays). `bodyValues` still gives health `danger: false`; the new `bodyRowCells` gives the health alarm. Whoever moves the component to the new cells removes the old functions and the old case „satiety below 30 stands in danger and 30 does not; health never does”, which then checks behaviour the task changes.

## Departures from the task's answers and the plan
- Choice 2 (border of the zones from the data) is a departure from the plan's wording „numbers of the look (30, 35, 39, 41) in the view module” for the number 35 of the zones, with its reason there.
- Choice 9 (`temperatureZones`) adds an export the plan does not name.
- No value of a role was chosen in this slice (no CSS, no token), so there is nothing for the human's veto from it.

## Reaches beyond the dispatch
- `src/browser/sim/combat.ts`, `src/browser/sim/world.ts` (`warmthAt`), `src/browser/sim/data/campfire.ts`, `src/browser/sim/data/maps.ts` (attackers, ambient temperatures), `src/browser/sim/game.ts` (the export of `GameEvent`), `src/browser/view/body-row-cells.tsx`, `src/browser/view/world-area.tsx`, `tests/view/body-row-cells.test.mjs` (head) and `tests/invariants/test_content_identifiers.py`: read to see what an event holds, what burns warmth, which names the invariant forbids and what the component uses today. The handoff's additions and the plan name some of them in part only.

## Questions / concerns for the orchestrator
No blocking question. For the human's veto in the request, two choices change what a player sees: choice 1 (a killing blow's marker shows the blow, not the health left) and choice 4 (the unit stays with the number). I recommend keeping both.

## Working copies
`.runs/executor-5/` (backups of two sources for the mutations, a one-off probe and its second probe) stood in the worktree and was removed with `rm -rf`. The probe that shows the own-work finding is kept as `.runs/task-cycles/paski-parametrow/reports/executor-5-probe.mjs` (it imports `../../dist/…` and `../../tests/…`, so it runs from a directory two levels under the worktree root, such as `.runs/executor-5/`). Nothing remains outside the worktree.

## Unread material
- `guidelines/styleguide-browser-view.md` (1633 lines): read lines 1–740 (roles, contrast, states of shared controls, source rule, kitchen-sink, layouts, touch target, both-layout check, main button), 1193–1398 (the scene of a map run), 1600–1633; not read: lines 741–1192 and 1399–1599 (the rules of the menu bar, Mapy, Wiedza, Postać, the program editor, the picture band of Siedziba, the chronicle, the end-of-run window, the list of accounts) — screens that this slice's pure functions do not touch; I chose not to spend the reading on them, not because they could not be read.
- `guidelines/testing.md`: read whole (lines 1–510).
- `.runs/task-cycles/paski-parametrow/task.md`: read lines 20–50 and 150–243 (the passages the *Read* names); the rest is not mine.
- `.the-way/task-cycle/change/slice.md` and `SKILL.md`: read whole; `walkthrough.md` and `ui_check.md` not read, since the slice alters no behaviour a user sees.
- Every other file and decision the *Read* and the handoff name was read whole.

## Searches not found or unclear
- No `foundations/decisions.md` line ranges of the plan were used (the handoff's current ranges held).
- Unclear: whether „the numbers as today” includes the unit `%` next to the satiety number (choice 4); D-337's „14” says nothing of the unit.
- Unclear: whether a killing blow's marker should show the blow or the health lost (choice 1).
