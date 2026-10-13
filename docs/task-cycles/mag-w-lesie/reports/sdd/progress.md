# SDD ledger — plan: .runs/task-cycles/mag-w-lesie/plan.md

Spec: .runs/task-cycles/mag-w-lesie/spec.md (binding authority). Cycle record: .runs/task-cycles/mag-w-lesie/cycle.md.
Base of execution: bb6b8fb (after foundation step 1: 3c2a5d9, e7770cb, bb6b8fb).

Ruling: briefs extracted by awk on "### Slice N" headings into slice-N-brief.md — the skill's task-brief script matches only "Task N" headings, and the plan format of the-way's plan-task uses "Slice N" — cost if wrong: none, same text.
Ruling: foundation step 2 (part map, the-way-update-part-map) runs between Slice 6 and Slice 7 as the plan orders; it is a foundation step of the cycle, not an SDD task — cost if wrong: none.
Ruling: expected interim failures (four new invariant checks fail until Slice 5; part-map guard and invariants guard (Part `simulation`) fail until foundation step 2; decisions guard `<request link>` placeholders until the request) are not regressions; reviewers are told they are interim states, not told to ignore findings — cost if wrong: a reviewer flags them; adjudicated in the loop.

## Pre-flight scan

| Slices | Shared file or interface | Producer → consumer | Finding |
|---|---|---|---|
| 1, 5 | tests/sim/data.test.mjs | 1 creates; 5 adds validation cases | ordered (5 depends on 4 → 1); ok |
| 1, 6 | package.json test script | 1 adds tests/sim glob; 6 adds tests/view glob | ordered; ok |
| 1 → 2–5 | sim/types.ts, sim/data/*.ts | 1 produces ids/types; later consume | ok |
| 2 → 3,4,7,10 | sim/hex.ts | nearestTile, hexCenter, hexCorners, tileLabel | ok |
| 3 → 4,5 | random.ts, layout.ts | streamState, nextRandom, mixSeed, drawLayout | ok |
| 4 → 5 | program.ts, run.ts | chooseActivity, newMapRun, stepMinute | ok |
| 5 → 7,8,9 | sim/game.ts | public API of spec § 4.3 | ok |
| 5 S2 scan ↔ 6–10 | tests/sim/rules.test.mjs scans src/browser/view/** | later view slices must keep ids/names out of view code | intended (plan Choices) |
| 6 → 8 | view/credits.ts | footer reads credits | ok |
| 7 → 10 | view/terrain-picture.ts | panel draws picture | ok |
| 8, 9, 10 | view/app.ts, index.html | 8 creates; 9, 10 extend | ordered; ok |
| 4 invariant checks ↔ 3–5 | tests/invariants/test_*.py (read-only) | checks drive dist/public/sim/game.js with ids forest, elementalMage, stick, berry, fiber | slices must keep those ids and spec § 4.3 signatures |

| Slice | Self-consistency |
|---|---|
| 1 | tests named match files changed; package.json in Change; ok |
| 2 | ok |
| 3 | ok |
| 4 | ok |
| 5 | data.test.mjs listed in Change; checks require all invariant tests to pass; ok |
| 6 | icons + credits + build + test + package.json; ok |
| 7 | ok |
| 8 | status-row test pure helper; ok |
| 9 | app.ts and index.html in Change; ok |
| 10 | README in Change; ok |

Scan clean apart from the rulings above.

## Progress
Task 1: implementer a73d5677 (sonnet), base bb6b8fb, head f1c57cc
Task 1: review clean (sonnet reviewer a931b65c, slice-1-review.md); ⚠️ resolved by controller: last gate run (.runs/invariant-tests.jsonl) fails only the 9 tests of the four new checks (no dist/public/sim/game.js) — expected
Task 1: minor (deferred): data.test.mjs checks map resources ∈ RESOURCES only for forest
Task 1: minor (deferred): balance.ts exports BALANCE {gameMinutesPerRealSecond, waitMinutes} + INITIAL_SEED (shape not in spec; later slices import BALANCE)
Task 1: complete (commits bb6b8fb..f1c57cc, review clean)
Task 2: implementer dispatched, base f1c57cc
Task 2: implementer aac52617 (sonnet), head d60cc99; 23/23 npm test
Task 2: review clean (sonnet reviewer a7c1b5db, slice-2-review.md); ⚠️ types checked by reviewer; Idź whole-game effect → Slice 4/5
Task 2: minor (deferred): hex.ts DIRECTIONS constant unused (dead code)
Task 2: minor (deferred): tie test uniform costs only; no test for `from` off the tile list; unreachable `return null`
Task 2: complete (commits f1c57cc..d60cc99, review clean)
Task 3: implementer dispatched, base d60cc99
Task 3: implementer a9215c99 (sonnet), head 473f3d5; 39/39 npm test; Ruling: stream constants layout 0x4c41594f, wander 0x57414e44 chosen by implementer — spec leaves values open — cost if wrong: layouts change seed-for-seed before anything depends on them
Task 3: review clean (sonnet reviewer a80fd084, slice-3-review.md); ⚠️ entrance returned as axial Hex — consistent with MapRun.character.at: Hex (spec § 4.1); randomness scan — confirm at Slice 5 gate
Task 3: minor (deferred): no golden-value test pins mulberry32/mixSeed/draw order (contracted order could change silently)
Task 3: minor (deferred): forced-guarantee test does not assert the guarantee path ran; no seed > 2^31 case
Task 3: complete (commits d60cc99..473f3d5, review clean)
Task 4: implementer dispatched (opus — judgment on activity timing), base 473f3d5
Task 4: implementer a6c6b6da (opus), head 92143f3; 67/67 npm test
Ruling: newMapRun takes a 4th parameter { mapId, archetypeId } — MapRun needs both and map data carries no id — cost if wrong: signature tweak in Slice 5
Ruling: event order in a finishing minute: activityFinished, then tileRevealed|moved, then activityStarted — spec leaves it open; natural causal order — cost if wrong: repeatability check compares events between two runs of the same code, unaffected
Ruling: extra exports walkTarget and RunView in program.ts accepted pending review — cost: API surface
Task 4: review clean (opus reviewer a6980309, slice-4-review.md); rulings accepted on merits; ⚠️ invariant checks → Slice 5 gate; S1/S2 scans → Slice 5
Task 4: minor (deferred): zero-duration activity would freeze the run (`minute !== endMinute`); no data test that durations ≥ 1
Task 4: minor (deferred): events alias `activity` objects of the run (stepTo copied, activity not)
Task 4: minor (deferred): Idź duration test does not distinguish target tile's stepMinutes from the map's
Task 4: minor (deferred): spec § 4.3 still lists 3-arg newMapRun — recorded in cycle.md Q40
Task 4: complete (commits 473f3d5..92143f3, review clean)
Task 5: implementer dispatched (opus), base 92143f3
Task 5: implementer a7a45f50 (opus), head 64c522d; 103/103 npm test; invariant gate 44 OK incl. the four new checks; tests/invariants untouched (controller checked git diff)
Ruling: advanceMinutes throws RangeError on negative/fractional/non-finite minutes — spec silent; Infinity would loop forever — cost if wrong: a caller gets an exception instead of a no-op
Task 5: review clean (opus reviewer a32c5dbd, slice-5-review.md); ruling on advanceMinutes accepted on merits
Task 5: deliberate breaks (WAY-69/WAY-08) by reviewer a32c5dbd in scratch copies: map-run-repeatability (Date.now in wander) → 2 fail; simulation-randomness (Math.random in wander) → 3 fail; action-in-progress (setProgram cuts endMinute) → 2 fail; player-map-run-pace (paused ignored) → 1 fail; each passes unbroken. run_tests.py takes only a directory (per-check dirs used)
Task 5: minor (deferred): S2 scan file set omits src/browser/main.ts (written in Slice 8)
Task 5: minor (deferred): S2 identifier scan flags view variables named like ids (e.g. `moss`)
Task 5: minor (deferred): send does not refuse non-finite realMs
Task 5: complete (commits 92143f3..64c522d, review clean)
Task 6: implementer dispatched (sonnet), base 64c522d
Task 6: implementer ad6bbaa6 (sonnet), head 414724b; 116/116 npm test; gate 44 OK; source game-icons/icons@82d94881, delapouite/*
Task 6: review clean (sonnet reviewer accc3d57, slice-6-review.md); reviewer verified SVGs byte-identical to game-icons/icons@82d94881 delapouite/*, author Delapouite per license.txt, no crafted input
Task 6: minor (deferred, trust boundary): icon test lacks patterns for <!DOCTYPE, <!ENTITY, <style>, @import "x", <?xml-stylesheet, unquoted href
Task 6: minor (deferred): sourceUrl to game-icons.net pages unverified; commit-pinned GitHub URL would be verifiable
Task 6: minor (deferred): icons carry a black full-size background (view must expect white-on-black squares)
Task 6: complete (commits 64c522d..414724b, review clean)
Foundation step 2 (part map): dispatched, base 414724b
Foundation step 2: done, commit 41ff282 (part_map.md only); guards: part map 0 errors (dependency graph unchecked), decisions only <request link> placeholders, invariants 0; gate: port-3000 flakes in two existing checks, both pass alone
Ruling: assets/icons/** kept as the trust boundary of browser-view although WAY-48 speaks of code files — a changed icon is what must trigger the crafted-input check — cost if wrong: boundary moved to scripts/build.mjs at build-tools in a correction
Ruling: Depends on of build-tools/account-server naming simulation — left to the return step (foundation compared with code) — cost: one line
Task 7: implementer dispatched (sonnet), base 41ff282
Task 7: implementer a3e3502c (sonnet), head 2787e28; 124/124; gate 44 OK; icon layout 2 per row 0.7×size (implementer's choice)
Task 7: review clean (sonnet reviewer a7e461cf, slice-7-review.md); ⚠️ styling → Slice 10
Task 7: minor (deferred): "no stock numbers" test checks only key name `stock`; icon layout untested beyond distinct positions
Task 7: complete (commits 41ff282..2787e28, review clean)
Ruling: no browser automation (Playwright MCP) in slices 8–10 or the final check — the user allowed only the-way and Superpowers skills and asked to be told when a step seems to need another tool; running-product checks are limited to `npm run dev` + HTTP fetches and Node tests of pure helpers; the in-browser check of task items 1–8 is reported as unchecked in the request — cost if wrong: visible defects reach the human's review
Task 8: implementer dispatched (opus), base 2787e28
Task 8: implementer a62e9b6c (opus), head 986eda3; 130/130; gate 44 OK; HTTP checks 200; in-browser checks unchecked; NEXT: package review 2787e28..986eda3 and dispatch task reviewer (not yet done — session paused on usage limit)
Task 8: review clean (opus reviewer a4139025, slice-8-review.md); ⚠️ in-browser checks unchecked (ruling: no browser tool); README → Slice 10
Task 8: minor (deferred): footer credit links open in the same tab and lose the run (target=_blank missing)
Task 8: minor (carried to Slice 10): map column re-rendered every 200 ms tick because realMsCarry changes; Slice 10 must skip redraw when state.run unchanged and keep hover
Task 8: minor (deferred): focus falls to body when send/run panels hide
Task 8: minor (deferred): footerCredits and sendTargets have no committed tests (footerCredits throws on missing credit after the clock started)
Task 8: complete (commits 2787e28..986eda3, review clean)
Task 9: implementer dispatched (opus), base 986eda3
Task 9: implementer aa82c900 (opus), head 4366b8c; 145/145; gate 44 OK; six choices beyond the brief in slice-9-report.md
Task 9: review clean (opus reviewer a60aa07c, slice-9-review.md); six implementer choices judged sound; ⚠️ in-browser behaviour unchecked (no browser tool)
Task 9: minor (deferred): select not reset when withConditionKind/withActionKind returns null (map with no resources)
Task 9: minor (deferred): editor commit closure refers to clock/store declared below it in app.ts (TDZ fragility)
Task 9: minor (deferred): createProgramEditor DOM wiring and app.ts:53 guard untested
Task 9: minor (deferred): offered map without a run = first send target's map (ambiguous with several maps)
Task 9: complete (commits 986eda3..4366b8c, review clean)
Task 10: implementer dispatched (opus), base 4366b8c
Task 10: implementer a6370603 (opus), head b319b5f (5ded019, b319b5f); 150/150; gate 44 OK
Task 10: review clean (opus reviewer a8584b01, slice-10-review.md); carried redraw-skip verified; ⚠️ in-browser checks unchecked (hover tint under four black-square icons, icon blink per minute, console)
Task 10: minor (deferred): icon URL template duplicated in tile-list.ts and terrain-picture.ts
Task 10: minor (deferred): icons/header rebuilt once per game minute (possible blink; browser check)
Task 10: minor (deferred): redraw skip and highlight survival have no automated check
Task 10: complete (commits 4366b8c..b319b5f, review clean)
Final review: dispatched (opus), range 1701186..b319b5f
Final review: with fixes — Important: icons' black background (task item 7); unchecked in-browser check; fix wave dispatched (final-fix-brief.md F1–F8), base b319b5f
Ruling: icons modified (background removed, dark fill) with the change stated in the footer credits — CC BY 3.0 requires indicating changes; keeps task item 7 (revealed tiles lighter) true — cost if wrong: revert 4 files and one credit field
Final fix wave: a66b36f5 (opus), commits b319b5f..e7159a7; 166/166; gate 44 OK
Final re-review: ac7d189e (sonnet) — F1–F8 ADDRESSED, no new breakage; final review clean after one fix wave
