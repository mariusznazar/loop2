FAIL db955ab062761fbb08f642cc3c6b4a3fed949b02

# Review of the whole change — task `wyposazenie-postaci`

- Range: `f2263d0502395ea1a3113b558e5258c256589676..db955ab0` (31 commits, 89 files). `git rev-parse HEAD` = `db955ab062761fbb08f642cc3c6b4a3fed949b02`, the head given. Pin: `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`, equal to the gitlink.
- Variant: the whole change, by `.the-way/task-cycle/review/SKILL.md` and `whole_change.md`. The reviewer made none of the change.
- Counts: blocking 3 (1 Critical, 2 Important); Minor 16 (all within the task, below); out of scope 0; Declined to judge 3.

## Blocking findings

### 1. Critical — a gear act in an earning loop on a slot whose piece the map run going on holds makes a piece out of nothing

- Place: `src/browser/sim/gear.ts:143-166` (`takeOffPiece`: `pieces[held] + 1` into the chest at once), `src/browser/sim/gear.ts:124-126` (`putOnPiece`: the held piece back to the chest at once), `src/browser/sim/gear.ts:216-225` (`teamAtRunEnd`: the piece the map run left in a changed slot goes to the chest at the end); the test that writes the duplicate in as the expectation, `tests/sim/gear-transfer.test.mjs:369-390` (line 382, `{ stick: 2 }` from one stick).
- What is wrong: at a character in an earning loop, the gear the game keeps at the character (the next map run's gear) starts as the same pieces the map run going on entered with. An act on such a slot treats the piece as one lying outside the map run: „Zdejmij” puts it into the chest at once, and an exchange puts it back into the chest at once. When the map run ends, the merge (D-460) sends the piece the map run held in that changed slot to the chest as well. One piece arrives in the chest twice.
- What the player sees: a mage in an earning loop holds a stick. The player opens Postać, taps the tile „Ręka główna” and „Zdejmij”. The chest gets one stick at once. When the loop's map run ends, it gets another. The player has two sticks where there was one, and can do it again on every map run. The task requires the opposite: *To do* 7, „Skrzynka przy zmianie w pętli”: „sztuka, którą trwające przejście trzyma w zmienionym miejscu, idzie do skrzynki dopiero po jego końcu”, and only „sztuka, którą tak założył i zdjął przed końcem przejścia, wraca do skrzynki od razu”. The answer to question 5 says it too: „sztuka zdjęta w trakcie przejścia wraca do skrzynki dopiero po nim”. The same root also drops a loss at a death with no use left. The stick the player took off already stands in the chest, while the death should take the map run's stick, which is that very piece.
- Evidence: probe `reports/review-whole-probes/probe-gear-duplication.mjs`, output `reports/review-whole-probes/probe-gear-duplication.out.txt`, run on a build of the head (`node scripts/build.mjs`, exit 0; `node tests/sim/probe-gear-duplication.mjs`, exit 0):
  - Case 1: one stick, put on at the camp, then „Zdejmij” in the loop. After the act: chest 1, gear 0, map run 1. After the completion and merge: **chest 2**, gear 0.
  - Case 2: two sticks, one put on at the camp, the other put on in the loop. After the merge: **chest 2, gear 1**, so three sticks from two.
- Why it matters: it breaks conservation of pieces for the whole economy of the chest, which `trip-transfer` and the loop's balance rest on. It is an exploit that repeats, and the test suite shows it as correct.
- Comes from: Slices 2 and 3 together. Slice 2 is `5639c225..ad81cec4`: the acts never ask whether the slot's piece is the running map run's. Slice 3 is `ad81cec4..ad07d536`: the merge, and the test at `gear-transfer.test.mjs:369-390` that asserts the duplicate. Neither had a review of its own. The plan's text for Slice 2 ("A piece put on in an earning loop leaves the chest at once, and one put on there and taken off before the end of the map run returns to it at once") is right. The code applies "returns at once" to every taken-off piece, the run's own included. No foundation entry states the chest rule of *To do* 7. D-453 and D-460 are silent on it, and D-462's *complies* example ("whose map run going on holds a stick the player took off for the next one") confirms that the act is allowed.
- A fix: in an earning loop, the first act on a slot not yet changed must not put the slot's held piece into the chest, since that piece is the map run's and reaches the chest by the merge. The same holds for the refusal „skrzynka pełna” of that first take-off, and for the take-off cell of `gearPick`. A piece the player put on during the loop keeps returning at once. The test at `gear-transfer.test.mjs:369-390` gets the task's expectation (one stick in all), with a case for the exchange and one for a death with no use left.
- Contradiction: yes — the answer to question 5 under *Questions to settle* („sztuka zdjęta w trakcie przejścia wraca do skrzynki dopiero po nim”), and *To do* 7.

### 2. Important — `tests/balance/gear.test.mjs` fails at the head

- Place: `tests/balance/gear.test.mjs:88-99` (the case expects `loop … --gear mainHand=stick` to be refused) against `balance/cli.mjs` (`COMMAND_FLAGS.loop` now holds `"gear"`).
- What is wrong: Slice 21 wrote a test asserting that the command `loop` refuses `--gear`. Slice 22 gave `loop` that flag (*To do* 13, plan *Choices*: "a flag `--gear` … in `sweep`, `trace`, `loop`, `check-map` and `progression`") without changing the Slice 21 case. The test now fails: `AssertionError [ERR_ASSERTION]: Missing expected exception: loop --map forest --program forestBest --gear mainHand=stick`.
- Why it matters: the repository's one command fails on this file, and the gate stays red until it is fixed. The Slice 22 executor did not run `tests/balance/gear.test.mjs`; its report lists only loop, campaign, cli, check-map and the skill test.
- Evidence: `node --test … tests/balance/gear.test.mjs …` on a worktree of the head, exit 1, 1 of 59 failing. Output kept at `reports/review-whole-probes/focused-view.txt`.
- Comes from: Slice 22 (`abcfad51..3c6bd87b`), which changed the behaviour Slice 21's test froze.
- Contradiction: no.

### 3. Important — the new check-map case passes whether or not the gear reaches the earning loop's columns

- Place: `tests/balance/check-map.test.mjs:323-355` against `balance/check-map.mjs` (`measureRow`, the `gear` passed to `loopBalance`).
- What is wrong: the case takes its expected value from `loopBalance` itself. With today's data and `forestLoopWithStock`, a stick in the hand changes nothing measurable, because the take list brings a stick and the first strike fills the hand. So the case cannot fail when `gear` is dropped from the loop's call.
- Evidence: a mutant made by hand on a worktree of the head removed `gear,` from the `loopBalance({...})` call in `measureRow`. Then `node --test --test-name-pattern="the earning loop of a row starts with the gear" tests/balance/check-map.test.mjs` exited 0, 1 pass (`reports/review-whole-probes/checkmap-mutant.txt`). The file was restored with `git checkout` and the worktree removed.
- Why it matters: *To do* 13 requires the gear as a parameter of the starting state "we wszystkich trybach przyrządu". The test that stands for the check-map loop columns asserts nothing about it: a test that passes for a reason other than the behaviour it names. The rule "Where the expected value comes from" in `guidelines/testing.md`, which the executor flagged itself, says the same.
- A fix: a program or a take list for which the hand's stick changes the loop's figures. For example, a take list with no stick and a strike rule, compared with and without `--gear mainHand=stick`. Or a spy on the state the loop starts from.
- Comes from: Slice 22 (`abcfad51..3c6bd87b`).
- Contradiction: no.

## Minor findings (all within the task)

1. `src/browser/view/character-gear.tsx:120` — a cell of the pick reads `${name} × ${count}` („patyk × 3”). Everywhere else the game writes the count first, as „{ile} × {rzecz}” („2 × opatrunek pod ręką” in `gear-lines.ts`, D-363, D-380's „brakuje 1 × patyk”). The task line asks for "ikona, nazwa i liczba sztuk"; the order of the words is the game's convention. Within the task (Slice 20).
2. `src/browser/sim/game.ts:672` — `teamAfterDeath` takes the map run's gear as an optional fifth parameter, `runGear: Gear = died.gear`. A future caller that leaves it out silently gives the character the gear it had outside the map run. Both callers in `src/` pass it, and only tests leave it out. Make it required. Within the task (Slice 3).
3. `src/browser/view/controls/react-button.tsx:202-204` — a filled tile's accessible name is the item's name alone, so a reader of the screen hears „opatrunek” three times with no slot. It follows the task's words ("jego nazwę czyta czytnik ekranu", setting 15.1, row 32), so it is no departure. Adding the slot to the accessible name („Kieszeń: opatrunek”) would be a nice-to-have, and needs the task's owner. Within the task (Slices 16, 19).
4. `foundations/decisions.md`, D-380 first paragraph (line 8368) — it still lists „Uderz — patyk” among actions "short of a thing in the backpack". Its third paragraph says the strike is short only where the stick lies neither in the main hand nor in the backpack. Drop „Uderz — patyk” from the first list, or qualify it. Within the task: D-380 is in *Decisions in play* (F6). Raised by review-4, outside its slice.
5. `foundations/glossary.md:174-178` — „combat turn” still says the character has no action "when it finds no feasible combat rule". A turn can now be „Załóż”, which is no combat action. Within the task (the cycle's return step). Raised by review-8.
6. `foundations/decisions.md:12893` — D-463's *Rejected* reads "unknown." while the plan's *Choices* names the rejected way: the page removing the character's stored judgings at the act. Within the task. Raised by review-1.
7. D-441 does not point to D-463, which extends its lists of what a stored judging holds. Within the task. Raised by review-1.
8. D-456 "The data of each item name the place it fits" reads as if every item names a place. Only the stick and the bandage do. Within the task. Raised by review-1.
9. `guidelines/coding-content-data.md` — its table of data files lacks `src/browser/sim/data/gear.ts`. Within the task. Raised by review-1.
10. `guidelines/coding-saved-game.md` — it does not say that a change of the gear's slots (the number of pockets) raises the saved-game version. `SAVED_GAME_VERSION`'s comment in `saved-game.ts` does say it. Within the task. Raised by review-1.
11. `src/browser/sim/program.ts:424` region (`wielding`/`combatPiece`) — no test shows that a strike refills only an empty main hand. It is unreachable until a second item fits the hand. Within the task. Raised by review-4.
12. `tests/sim/saved-game.test.mjs` — the document of the current version no longer has a combat turn with no action of the character, so the refill-mark check edits a turn that has one. Another test still guards the empty turn. Within the task. Raised by review-8.
13. `tests/view/judging-cache.test.mjs` — four crafted gear-change counts (negative, fractional, text, null) pass by the equality at reading, not by the form check they are named for. Within the task. Raised by review-10.
14. `guidelines/testing.md:178` — the trust-boundary row for `judging-cache.ts` is out of date: it still says "five fields" and does not name the new test file. Within the task. Raised by review-10.
15. `src/browser/view/judging-cache.ts` — `read` and `remember` take the game state as an optional parameter, defaulting to the state the cache was opened with. A future caller that omits it compares against a stale game. Within the task. Raised by review-10.
16. `src/browser/sim/understanding.ts:227-235` (`undiscoveredPart`) — for a rule with „Puste” not yet known, the part shown is the kind's label „Puste” with no place. It is consistent with the other conditions, so this is noted only for completeness. Within the task (Slice 6).

## Declined to judge

- The layout overflows of the screen of a map run that Slice 15 reported (4 px at 1280, 12 px at 360) and Slice 23's scene of 336 px in a 318 px box at 360 px. The change adds one wrapping `<p>` to `world-area.tsx` and touches no scene size. I did not measure the base in a browser, so these stay unverified, not judged.
- The focus outline round the whole left area after a hash change (Slice 20). The executor calls it existing behaviour, and the change does not touch the screen's focus on a hash change.
- Whether Las — matecznik should let the gear in (*To do* 8): the task gives it to task 14.

## Coverage of the task

| Item | Met by | Judgment |
|---|---|---|
| *To do* 1 — eight slots, one piece each, fits in the data, the bandage in a pocket | `data/gear.ts`, `data/items.ts` (`fits`), Slice 1 | met |
| *To do* 2 — the gear is the character's, put on from the chest, goes into every map run and back, outside the trip plan | `gear.ts`, `game.ts` `startRun`, `loop.ts` `beginRun` | met, except the chest in a loop (finding 1) |
| *To do* 3 — the strike from the main hand, the refill in the same turn, „brakuje 1 × patyk”, the combat line's own element | `combat.ts` `wielding`, `program.ts` `combatRefusal`, `combat-line.ts` | met. The chronicle question: the refill happens only in a fight, and a fight stands in the chronicle only as the encounter's paragraph (D-147), which `combat-line.ts` writes, element by element with the actor. The same *To do* item gives that line's form, „Mag bierze patyk z plecaka do ręki”, after verdict 5. The words of row 25 stand in the data (`GEAR_PLACES.mainHand.refill`, „bierze patyk z plecaka do ręki”). No separate entry without the actor is needed, so I judge the requirement met. |
| *To do* 4 — the gear is no backpack | `program.ts`, `run.ts`; `gear-state.test.mjs` | met |
| *To do* 5 — refill at use, „Załóż”, „Puste”, combat carrying gear and backpack, the pick, discovery | Slices 4, 6, 7, 8, 12–14 | met |
| *To do* 6 — what takes the gear (death with no use left, a character with no practice too), the gear back as it stood | `game.ts` `teamAfterDeath`, `gear.ts` `teamAtRunEnd`/`teamAtRunStop` | met, except a death in a loop after the player's take-off (finding 1) |
| *To do* 7 — changes at the camp and in a loop, the slot-by-slot merge, the chest, tiles and sentences | Slices 2, 3, 19, 20 | **not met**: the chest at a change in a loop (finding 1) |
| *To do* 8 — caps leave the gear out | `startRun`, merge beyond the exit cap; tests | met |
| *To do* 9 — the judging with the character's gear, erasure by the player's change only | `judging.ts`, `judging-cache.ts` | met |
| *To do* 10 — the section, the figure twice its size, tiles, pick, shared control with tests and kitchen-sink, the map-run line, screenshots | Slices 15–20 | met in code and jsdom. Browser checks and screenshots are in the executors' reports (screenshots at the public screenshots repository, commits `c7aa7109`, `723a212e`, `1fe6bc18`); I did not look at them in a browser myself. |
| *To do* 11 — the styleguide's part on the gear, the changed points of the screen Postać and their examples | `guidelines/styleguide-browser-view.md` | met |
| *To do* 12 — saved-game version raised | `SAVED_GAME_VERSION = 11` | met |
| *To do* 13 — the instrument with the gear in every mode | `balance/*.mjs` | met in code; one mode's test does not guard it (finding 3), and a test is broken (finding 2) |
| *To do* 14 — the foundation entries | D-451–D-463, the changed entries, `gear`, `game-icons-gloves-title`, `icon-credits` | met (Minors 4–8) |
| *To do* 15 — one `progression` run of Las — matecznik with a stick | executor-21: 0 of 500 seeds for all 23 programs, the D-438 paragraph stays | met; the result is for the request's description |

Settlements to record (the rows the task lists: 1–10, 16–34):

| Row | Entry or place | Judgment |
|---|---|---|
| 1 | D-452 | met |
| 2 | D-190 | met; tests at `gear-transfer.test.mjs:276-325` |
| 3 | D-453 | met (the chest of a change in a loop: finding 1) |
| 4 | D-187 | met |
| 5 | D-439 | met |
| 6 | D-440, D-463 | met |
| 7 | D-311; `gear-lines.ts`, `world-area.tsx` | met |
| 8 | D-454 | met |
| 9 | styleguide, "The screen Postać" | met |
| 10 | D-455 | met |
| 16 | D-456 | met |
| 17 | `data/items.ts` `fits: "pocket"` for the bandage | met |
| 18 | D-457 | met |
| 19 | D-458 | met. „Załóż — patyk” with a stick in the hand and another in the backpack is refused „już założone: patyk”, as the task's reason words say. The end state equals D-458's *complies* example, so there is no finding. |
| 20 | D-140 | met |
| 21 | D-459 | met |
| 22 | D-143 | met |
| 23 | D-290 | met |
| 24 | D-380 | met (Minor 4) |
| 25 | data: `ACTIONS.equip.status` „Zakłada”, `GEAR_PLACES.mainHand.refill` | met |
| 26 | D-183 | met |
| 27 | D-190 | met |
| 28 | D-460 | met in the merge itself; the act before it breaks the chest (finding 1) |
| 29 | D-445 | met |
| 30 | D-446 | met |
| 31 | D-461 | met |
| 32 | styleguide | met |
| 33 | D-462 | met |
| 34 | D-287 | met |

Projected entries: the new decision "Where does an action take the piece it uses from?" is D-451, in the definition's words. The glossary term `gear` is in the definition's words, with its *Not*. Both are met.

Source fidelity of the foundation entries: I compared the statement of D-451–D-463 and the changed sentences of D-23, D-44, D-140, D-143, D-144, D-145, D-183, D-187, D-190, D-287, D-290, D-309, D-311, D-380, D-439, D-440, D-445 and D-446 with their rows and their *Decisions in play* lines. They say what the rows say. I found nothing invented and nothing changed beyond its row, apart from Minors 4–8. D-463 is new in place of a change of D-441, as the handoff says (F32). The part A gap the handoff names (Slices 15–20 not read) shows in no wording of D-454, D-461 or D-462 that departs from rows 8, 31 and 33. The part B gap (no part map or glossary read) shows in nothing I found beyond Minor 5, which predates part B.

Tests weakened: none. The changed expectations of Slices 4b, 7b and 14, and of `combat.test.mjs`, `data.test.mjs`, `encounters.test.mjs`, `rule-signs.test.mjs`, `skills.test.mjs`, `rule-editor.test.mjs` and `program-editor.test.mjs`, only change quoted decision sentences, add `equip`/`emptyPlace` to expected lists, or add assertions. Changed invariant tests: `tests/invariants/test_icon_credits.py` (the gloves icon's author and title) and `tests/invariants/test_program_closed_lists.py` (the kinds `emptyPlace` and `equip`, and an `equip` rule among the valid ones). Neither loosens an assertion.

Points the orchestrator asked about:
- The ends of a map run (rows 2, 26, 27, 28): correct in `teamAfterDeath`, `teamAtRunEnd` and `teamAtRunStop` for each end, except finding 1.
- The saved-game decoder: strict. Each slot is present and no other, an item must fit its slot, changed slots are unique and only at a character in a loop, the count is a safe integer from 0, the backpack of a combat result stays within the capacity, the refill mark is allowed only on an item-using action, and „Załóż” deals 0 damage.
- The judging cache: it reads the count by `isCount(…, 0)`, compares it at reading and removes values above the loaded count at opening.
- D-44 and the tile: one kind of `ReactButton`, styled only in `styles.css`.
- D-463 and the code agree: `acted` adds one per act, and merges and deaths add nothing.
- `instrument-game-agreement` and `trip-transfer`: the gear goes through `newMapRun` in the game and in the instrument alike, and never through `takeTrip`.
- The screen Postać against *To do* 7 and 10: the sentences, the lock and the starting state with no tile chosen are as the task gives.

## Structure

- `python -B .the-way/task-cycle/change_file_sizes.py f2263d0502395ea1a3113b558e5258c256589676 db955ab0`, exit 0 (`reports/review-whole-probes/sizes.txt`). The largest growths: `program.ts` 539→650, `saved-game.ts` 1454→1536 (the file exception of D-425), `game.ts` 994→1026, new `gear.ts` 247 and `character-gear.tsx` 246.
- The size rules on the head: `node tests/quality/eslint-size-rules.mjs` in the reviewed worktree, exit 0, "0 functions and files over a threshold in 382 files" (`reports/review-whole-probes/size-head.txt`). The head names nothing over a threshold, so the run on the base could add nothing to compare, and I did not make it. The rule's invariant is not marked violated. No finding of structure.
- Code with no user after the change: none found. The names that stopped being true were changed with it (`isCombatAction` became `isCombatVerb`/`isTurnAction`).

## Checks run

| Command or method | Where | Exit / result |
|---|---|---|
| `python -B .the-way/instruction-files/check_instructions.py` | reviewed worktree | 0; "0 error, 0 warn, 121 info" |
| `python -B .the-way/elements/common/foundation_check.py` | reviewed worktree | 0; "0 errors" |
| `python -B .the-way/task-cycle/change_file_sizes.py f2263d05… db955ab0` | reviewed worktree | 0 |
| `node tests/quality/eslint-size-rules.mjs` | reviewed worktree | 0; none over a threshold |
| `python -B .the-way/elements/common/decision_index.py --output .runs/review-whole/decision_index.md --section "Gear of a character" --decision …` (32 decisions) | reviewed worktree | 0; 45 listed |
| `node scripts/build.mjs` | worktree of the head | 0 |
| `node tests/sim/probe-gear-duplication.mjs` | worktree of the head | 0; shows finding 1 |
| `node --test` on `tests/sim/gear-{acts,transfer,state,combat,combat-wear,wear,condition}.test.mjs`, `tests/sim/saved-game.test.mjs` | worktree of the head | 0; 136 pass |
| `node --test` on `tests/view/character-gear{,-pick}.test.mjs`, `gear-words`, `gear-lines`, `judging-cache-gear`, `tests/balance/gear.test.mjs`, `tests/balance/check-map.test.mjs` | worktree of the head | **1**; 58 pass, 1 fail (finding 2) |
| `node --test` on `tests/balance/{cli,loop,campaign,agreement}.test.mjs` | worktree of the head | 0; 62 pass |
| `node --test` on `tests/view/{character-screen,world-area,shared-controls,gear-editor,gear-rule-panel,judging-cache,judging-cache-record,icons,rule-editor,program-editor}.test.mjs` | worktree of the head | 0; 496 pass |
| hand mutant: `gear,` removed from `loopBalance` in `measureRow`, then the new check-map case | worktree of the head | 0; the case passes (finding 3) |
| `assets/icons/gloves.svg` read for scripts, links and handlers | reviewed worktree | one `<path>`, nothing `icon-file-content` forbids |

Not run: the whole gate (`npm test`), which is the cycle's own run; Stryker, too long for this review; Ruff, ShellCheck and shfmt, which the gate runs; any browser check of my own, since I relied on the executors' walks for Slices 15, 17, 20 and 23. Each of these is unverified by me.

## Reaches beyond my selection

- `src/browser/view/clock.ts:80-110`: to check that a death is settled before „Restart” and before a gear act, so that `teamAtRunStop` on an ended map run never meets an unsettled death.
- `foundations/glossary.md:170-182` („combat turn”): Minor 5.
- `executor-22-report.md` and `executor-2-report.md`, searched: whether their runs covered `tests/balance/gear.test.mjs` and whether they wrote of the run's piece at a take-off.

## Working copies

- A worktree of the head at `.runs/review-whole/head`, with `.the-way` populated at the pin and a junction to the reviewed worktree's `node_modules`. I removed the junction first (`rmdir`, which leaves the target intact: 268 entries still there), then removed the worktree with `git worktree remove --force` and ran `git worktree prune`.
- The directory `.runs/review-whole/` is removed. What the report needs is kept at `reports/review-whole-probes/`: the probe and its output, the check-map mutant run, the failing test run, the decision index, the size tables.
- The mutant of `balance/check-map.mjs` was made and restored in the worktree of the head only. The reviewed worktree is clean (`git status --short` empty) at `db955ab0`.

## Unread material

- Decisions of the index read whole: **13 of 45**, D-451 to D-463. Of the other 32, I read the statement paragraph of each, and for D-44, D-190, D-380, D-439 and D-440 also the paragraphs the change added. The *Verification* and *Rationale* of D-23, D-140, D-142, D-143, D-147, D-179, D-199, D-200, D-206, D-287, D-290, D-291, D-293, D-309, D-311, D-363, D-438, D-441, D-443, D-445, D-446 and D-447 bear on the change and stayed unread beyond the index.
- Guideline files not read whole: `guidelines/coding.md` (read: "Size of a function and a file"), `guidelines/testing.md` (not read; the review-10 Minor at line 178 is taken from the handoff), `guidelines/styleguide-browser-view.md` (read: only the lines the change adds and removes), `guidelines/coding-simulation-module.md`, `guidelines/coding-browser-module.md`, `guidelines/coding-saved-game.md`, `guidelines/coding-content-data.md`, `guidelines/coding-balance-instrument.md` (not read). The invariants `trip-transfer`, `instrument-game-agreement` and `program-world-reference` were read only as quoted in the task. The part map was not read.
- Diffs read in part: `tests/sim/saved-game.test.mjs` (+488), `tests/view/shared-controls.test.mjs`, `tests/view/character-gear{,-pick}.test.mjs`, `tests/sim/gear-{combat,combat-wear,wear,state,condition}.test.mjs`, `tests/view/judging-cache-gear.test.mjs`, `src/browser/character-screen.css`, `src/browser/kitchen-sink/control-samples.tsx` and the `.agents`/`.claude` skill copies: I ran them or read their test names, but did not read them line by line. The word diff of `foundations/decisions.md` (43 KB) was read through each entry's current text, not as a diff. The executor reports were read through the handoff's carry list and searches, apart from the passages quoted above.

## Searches not found or unclear

- Whether *To do* 3 asks for a chronicle entry without the actor beside the encounter's paragraph. It is unclear in the task, which gives both forms. I judged it by the combat line's form the same item gives (Coverage, *To do* 3).
- The chest rule of *To do* 7 („Skrzynka przy zmianie w pętli”) in any foundation entry: not found in D-452, D-453 or D-460.
