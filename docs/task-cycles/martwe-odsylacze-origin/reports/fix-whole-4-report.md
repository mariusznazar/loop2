# Report — fix of the review of the whole change, part 4

**Status:** done with concerns (one concern: the source of the deeper map's own numbers, see "Problems").

Base: `e6816817d155ddd225cfd71bcefc24aeb43563f4`; worktree was clean. Branch `task/martwe-odsylacze-origin`.

Commits:
- `76069f00` docs: D-387 and D-388 in `foundations/decisions.md` (+30 lines).
- `2997d338` test: comments and the three titles named, `styles.css` comment, `account-routes.ts` comment.

Entry skill: `the-way-record-decision` (read SKILL.md, read.md, decide_entry.md, template.md, rules.md, way_of_working.md, the example WAY-03; checked the log's numbers, the highest heading was D-386 and no D-387/D-388 or withdrawn list existed; searched the foundation for the numbers; drafted; wrote with the editor tool; ran `foundation_check.py`). Nothing follows from the two entries: no invariant is named, no other decision names them, and no glossary term is used in another meaning.

## I-2 — fixed

Two new decisions, split by question:

- **D-387 — What numbers do the body, the gathering, the campfire and eating have?** Binding sentences state: start/caps 37.0 °C, 100, 100; cooling 0.002 °C per degree below 37.0; satiety loss 0.6; chilled below 35.0, starving below 30; health loss 0.35 chilled + 0.35 starving; regain 0.05; gathering 10 game minutes, chance 0.7; campfire made in 20 min from 6 sticks, lit in 5 min with 2 sticks giving 60 min of burning, feeding 5 min, 1 stick, +20 min, warmth 0.5; lighting a stick 5 min, burns 3 min, warmth 0.15; eating 5 min, one berry, 25 satiety. *Verification* has complies/violates examples with arithmetic (minute 83 = 35.008, minute 84 = 34.984; satiety 30.4 at 116, 29.8 at 117; Las — głębiej 0.06 a minute). *Rejected:* "other numbers than those of the old loop game's data." (a way with no reason, as D-247).
- **D-388 — What numbers do the maps Las and Las — głębiej have?** Binding sentences state: Las 4 × 4, entrance column 1 row 1, 25 °C, step 5, streak 480; Las — głębiej 5 × 5, drawn entrance, 7 °C, step 5, Las's resources, wolf as D-142, opens after Las, streak 540 + two beaten attacks; resources table (stick 0.7/12/30, berry 0.5/8/40, moss 0.4/6/60, fiber 0.4/6/60). Both state that the numbers are requirements tests may expect.

All numbers were checked at the head against `src/browser/sim/data/balance.ts`, `campfire.ts`, `items.ts`, `actions.ts`, `maps.ts` and the data tests (`npm test -- tests/sim/data.test.mjs` passes). The body numbers and the gather chance were also checked against the old game's `balance.ts` in the snapshot (`the private snapshot of the notes (not committed)/old-loop/cdc7c0d/src/sim/data/balance.ts`: `coolingPerDegreeBelowBody` 0.002, `hypothermiaThreshold` 35.0, `healthLossPerMinute` 0.35, `satietyLossPerMinute` 0.6, `starvationThreshold` 30, `healthLossFromHungerPerMinute` 0.35, `healthRegenPerMinute` 0.05, `gatherChance` 0.7). The campfire, feeding, burning-stick, eating, gather-minutes and Las numbers are listed as "numbers of loop" accepted by the human in the snapshot note `ognisko_i_jedzenie_loop2.md` (To do 1-11, Q8, Q9) and `mag_w_lesie_loop2.md:52` (Las from the old game's `maps.ts`); the old files `activities.ts`, `items.ts`, `recipes.ts`, `maps.ts` are not in the snapshot, so these were verified against the note's statement and the code at the head, not against the old files.

Comments and titles changed (all in commit `2997d338`):
- `tests/sim/data.test.mjs`: titles at 16 and 31 now end "of D-388"; title at 247 now "…the rates and thresholds of D-387" (was "written here"); two new comments above the items test and the campfire test naming D-387.
- `tests/sim/body.test.mjs:22` "from the numbers written here" → "from the numbers of D-387"; `:436` "from the data" → "from the numbers of D-387 and D-388".
- `tests/sim/campfire.test.mjs:21-26` "written out by hand" → "written out by hand from the numbers of D-387" (and the overlong line rewrapped); `:696` "from the data" → "from D-387 and D-177" (the 10 nature energy is D-177's).
- Other comments that gave the data as the source, changed the same way: `tests/sim/world.test.mjs:14` (D-387 and D-388), `tests/sim/acceptance.test.mjs:19` (D-387), `tests/sim/map-card.test.mjs:2` (D-388 and D-142), `tests/view/program-editor.test.mjs:1424` (D-387 and D-177).

## Minor 5 — fixed
- `src/browser/styles.css:1900`: "…with the value the old Loop gave a paused scene, `grayscale(1) brightness(0.5)` (D-322)" → "…with `grayscale(1) brightness(0.5)` (D-322)" (rewrapped).
- `tests/view/scene.test.mjs:350`: "The two values are the old Loop's (D-322, D-316)." → "The two values are those D-322 and D-316 give." (D-322 gives brightness(0.5) for the pause, D-316 gives brightness(0.55) for the extinguished fire; both read in the log.)

## Minor 35 — fixed
- `src/server/account-routes.ts:472-473` comment only: "D-112 and D-210 for the write" → "D-112, D-209 and D-210 for the write". D-209 (the revision basis) read in the log. No code token changed. Needs the orchestrator's trust-boundary review.

## Checks (command, exit)
- `python -B .the-way/elements/common/foundation_check.py` — 0 errors, exit 0 (also without `--skip-test-citations`).
- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` — 0 listed, exit 0.
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- . ':(exclude).the-way'` — no line, exit 1 (no match).
- `npm test -- tests/sim/data.test.mjs` 34 pass; `body.test.mjs` 36 pass; `campfire.test.mjs` 35 pass; `tests/view/scene.test.mjs` 47 pass; `tests/account-api.test.mjs` 25 pass; `tests/http.test.mjs` 89 pass — all exit 0, one at a time. Also run: `acceptance` 5, `world` 12, `map-card` 11, `tests/view/program-editor.test.mjs` 59, all pass.
- `npx eslint` and `npx prettier --check` on the changed JS/TS files and on `styles.css` — exit 0. `npm run typecheck` — exit 0. The full gate was not run.

## Own-work check
Requirement most likely missed: "everything outside comments and the titles named stays byte-identical". Check: read `git diff -U0` of `src` and `tests` — every changed line is a comment line, a comment line added, or one of the three named titles. Result: only those. A second likely miss: a number in D-387/D-388 that the code does not hold; checked by comparing each against the data files and the data tests (above) — none differs.

## Problems and choices
- **Concern (source of the deeper map's own numbers).** The snapshot holds no old-game file for Las — głębiej. Its 5 × 5, 540-minute streak and two beaten attacks stand in the snapshot's project definition and concept note, its chance 0.01 and cooldown 180 in D-142; its 7 °C, its step 5 and the choice to reuse Las's resources are only recorded as facts of the code at the head. So D-388's *Rationale* ties "taken from the old loop game's data" to Las only, and says for Las — głębiej that the colder air, size, streak and attacks set it apart as the second map (D-136), D-142 giving the wolf. The binding sentence still makes all of D-388's numbers requirements, on the orchestrator's instruction that the human accepted them. If the orchestrator knows the old game's file for the deeper map, the *Rationale* can say so.
- Choice: the human's reservation at acceptance ("the numbers will change later, avoid decisions that categorically forbid alternatives") is carried as the accepted cost "tuning later is a change of data and tests", as D-379 does; the word MVP is not used.
- Choice: D-387 holds gather 10 minutes, burning-stick and feeding numbers too, because the same tests pin them. Not included: explore 20 minutes (a different action; no test comment points at it as "written here").
- Choice rejected: one decision for all. Two decisions split the body/campfire/eating question from the map question.
- Not done, not mine: D-374's and D-379's *Rejected* wording (Minor 1) — another part.

## Unread material
none beyond: I read `.the-way/task-cycle/change/SKILL.md` and `fix.md` whole, the record-decision skill files, `template.md`, `rules.md`, `way_of_working.md`; from the snapshot I read `ognisko_i_jedzenie_loop2.md` lines 1-50 (not the rest), `balance.ts` of the old game whole, and searched, not read whole, the other notes. Decisions read whole: D-18, 24, 26, 57-61, 63-72, 80, 82, 136, 140 (head), 142, 175-177, 187, 191, 209 (head), 210 (head), 247, 316 and 322 (heads), 374, 376-379.

## Searches not found or unclear
- The old game's `maps.ts`, `activities.ts`, `items.ts`, `recipes.ts` are not in `the private snapshot of the notes (not committed)/` (the snapshot holds only `balance.ts` and the tests of the old game), so the campfire, eating, gather-minutes and map numbers were not compared to the old files.
- No note in the snapshot gives the source of Las — głębiej's 7 °C or its step; see Concern.
