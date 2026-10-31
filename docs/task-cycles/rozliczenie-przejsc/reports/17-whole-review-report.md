PASS 923391c37b716a2811fbd310190e70cee6bfc93e

# Review of the whole change, task `rozliczenie-przejsc`

Range `95de83b..923391c`, seven commits. `git rev-parse HEAD` in the worktree is the head given, and the worktree stayed clean. Process pin: gitlink and `.the-way` HEAD both `a8dfe8a`.

Counts: **0 blocking**, **2 Minor of this review**, 9 findings of the slice reviews graded again (7 Minor, 2 Minor and out of scope), 8 lines of **Declined to judge**, which count as out of scope.

No blocking finding, so no finding names a slice.

## Critical

None.

## Important

None.

## Minor

### M1. No lasting test fails when the new lines of the map-run screen vanish or change place, or when a changed generation fails to rebuild the headquarters' row

- **Slices:** Slice 4 (`3eb2a8d`) and Slice 5 (`923391c`).
- **Place:** `src/browser/view/game-view.ts:229` (`runPanel.append`, the order of To do 6 and 18), `src/browser/view/trip-lines.ts:108` and `:112` (visibility, text, role), `src/browser/view/headquarters.ts:354` (`generation` in `teamKey`), and the test `tests/view/trip.test.mjs:167`.
- **Why the code exists:** `tests/view/trip.test.mjs` pins the pure functions, `solvedRunText`, `deathSettlementLine`, `tripTexts`. What puts their results on the screen is three small places the tests never reach.
- **What is wrong:** with each of ten hand mutants of the built view, every test of `tests/view/*.test.mjs` passes:

| Mutant | Exit |
|---|---|
| A. the settlement line left out of `runPanel.append` | 0 |
| B. the solved line left out of it | 0 |
| C. the solved line below the practice line, against To do 6 | 0 |
| D. the settlement line below the body row, against To do 18 | 0 |
| E. the settlement line always hidden | 0 |
| F. its text left empty | 0 |
| G. its `danger` class never set | 0 |
| H. the solved line always hidden | 0 |
| I. its text left empty | 0 |
| J. `generation` out of `teamKey` | 0 |

Mutant J matters most to a player: a death changes neither the team's numbers nor the chest, so without that key the row would not rebuild and „pokolenie 2” would not appear after „Zakończ”. The six other mutants of the same run (K to P: the label, the resurrection line, `update`, `tick`, the clock's moment) each fail a test.

- **The test's name says more than it checks:** „…in decision 8's order of lines” at `tests/view/trip.test.mjs:167` calls functions one by one and compares no order. Mutants C and D prove it.
- **Why Minor, not Important:** the code is right today. I saw it right in a real browser, and the slice's own check read it. `guidelines/testing.md`, *Choosing the level*, lets code that only passes data go without a lasting test, spec decision 10 gives these requirements a pure-function table, and existing wiring of this kind, such as the deposit line, stands the same way. What is lost is protection against a later change, for a screen a player would notice at once. The executor's rationale in report 15 does not lower this grade; the reasons above do.
- **A fix, should the orchestrator want one:** one case in `tests/view/account-screen.test.mjs`, where the real `createGameView` already runs on a hand-made document, that loads a death and reads the order of `.run-panel`'s children, and that follows a generation change into the row. Rename the case at `:167` to what it checks.

### M2. One line of a doc comment runs to 126 characters

- **Slice:** Slice 5 (`923391c`).
- **Place:** `src/browser/view/game-view.ts:82`. The rewrite of the comment left the old wrapping in place, beside lines of about 100.
- **Why Minor:** no behaviour, and Prettier and ESLint pass. It is the same kind of thing as `src/browser/sim/game.ts:524`.

## Findings of the slice reviews, graded here

The handoff lists these. I checked each on the head; `git diff 8737dba..923391c -- src/browser/sim` is empty, so the simulation findings stand as their reviews found them.

| Finding | Still stands | Grade here | What I found |
|---|---|---|---|
| Report 08 M1, no crafted document for the mark on a run ended in death | yes | Minor | The hand mutant `!ended.death && solvedMapRun !== mapSolved` at `src/browser/sim/saved-game.ts:918` still leaves `tests/sim/saved-game.test.mjs` at exit 0 |
| Report 08 M2, a broken line in the doc comment of `advanceMinutes` | yes | Minor | Now `src/browser/sim/game.ts:524`, `nothing; where that minute is` |
| Report 08 M3, the verb `resurrect` beside the new term | yes | Minor | The human's choice by the glossary's template; it stays for the request |
| Report 08 O1, seven mutants on unchanged lines of the load | yes | Minor, out of scope | Now `saved-game.ts:763` (2) and `:914` (5), by my StrykerJS run |
| Report 10 M1, the comment at the test's version | yes | Minor | `tests/view/account-screen.test.mjs:1059`, 131 characters, and „2 since To do 21” goes false at the next raise |
| Report 12 M1, a moment that is no moment of 2025 | yes | Minor | `tests/sim/saved-game.test.mjs:456` holds `1760000028800000`, the year 57742, under a comment saying 2025. The value is legal, so no check weakens |
| Report 12 O1, the case „two characters of one number” | yes | Minor, out of scope | Case at `tests/sim/saved-game.test.mjs:969`, guarded line `saved-game.ts:501`, neither in this task |
| Report 14 Minor 1, a forged settlement gives back what a death took | yes | Minor | No code change called for: the load cannot tell the two apart, and D-07 accepts forging one's own progress |
| Report 14 Minor 2, a forged top generation | yes | Minor | Costs its own player alone, and real play never reaches it |

## Against the task

Every item of *To do* is met. Texts compared character for character with the task.

| To do | Met by | Evidence |
|---|---|---|
| 1 | `startRun`, `advanceMinutes` | `tests/sim/trip.test.mjs`, marker `solved-map-manual-run` |
| 2 | `!endedRun.solvedMapRun`, `run.practice` kept | the same, and `src/browser/sim/game.ts:641` |
| 3 | the mark bound in `startRun`, which `restart` goes through | the same; browser: a restart on a solved map saved `solvedMapRun: true` |
| 4 | carried through `endedRun`, `savedGame`, the load | `tests/view/trip.test.mjs`, loaded screens; browser, loaded screens |
| 5 | `takeFromNowhere`, `src/browser/sim/trip.ts:65` | browser: chest `stick: 10` unchanged through start, death and restart |
| 6 | `solvedRunText`, order in `game-view.ts:229` | screenshots, browser |
| 7 | `tripLoot` empty on a marked run | `tests/view/trip.test.mjs`, screenshots `s4-going-marked-*`, `s4-done-marked-*` |
| 8 | `createCharacter` | `tests/sim/team.test.mjs` |
| 9 | `BALANCE.resurrectionRenewalRealMinutes` | `tests/sim/data.test.mjs` |
| 10 | `settleDeath` | `tests/sim/death.test.mjs`; browser: a real death at 16× saved a moment of readiness 8 hours after the clock's reading (*Checks*) |
| 11, 12, 15 | `settleDeath`, `resurrectionReady` | `tests/sim/death.test.mjs` |
| 13 | a stored moment, read by the clock | `tests/view/clock.test.mjs` |
| 14 | ends as before, pays nothing | `tests/sim/trip.test.mjs`, `tests/sim/death.test.mjs`; browser, a death on a marked run |
| 16 | `deathSettlement` held, the load settles nothing | `tests/sim/death.test.mjs`; browser: a load on the screen after a death sent no save |
| 17 | `restart`, `src/browser/sim/game.ts:361` | `tests/sim/death.test.mjs` |
| 18 | `deathSettlementLine`, order in `game-view.ts:229` | screenshots, browser, loaded too |
| 19 | `resurrectionLine`, `tick` | `tests/view/headquarters.test.mjs`, `tests/view/account-screen.test.mjs`; browser and my screenshot of a line turned ready |
| 20 | `generationLabel` | the same; browser after „Zakończ”: „pokolenie 2” |
| 21 | `SAVED_GAME_VERSION` 2 | `tests/sim/saved-game.test.mjs`; browser: a version 1 save gave the sentence of D-96 and a new game saved at version 2 on `basedOn` 7 |
| 22 | the entries below | `foundation_check.py`, 0 errors |

Nothing was added that the task, the spec or the plan does not ask for. The changes outside To do 22's list, D-03, D-04, D-179 and D-212's *Verification*, each serve a decision of the spec or a new invariant's link.

## Settlements and projected entries

| Source | Entry | Result |
|---|---|---|
| Row 1 | D-214 | met; the code binds the mark at the start |
| Row 2 | D-194 | met; cost, Q4's ways and the turned *Rationale* stand |
| Row 3 | D-215 | met, text word for word |
| Row 4 | D-216 | met, both texts word for word |
| Row 5 | D-217 | met; „za {m} min” below an hour, rounding before the split |
| Row 6 | D-218 | met |
| Row 7 | D-219 | met |
| Row 8 | D-220 | met |
| Row 9 | `resurrection-renewal` | met, tests under its marker in `tests/sim/death.test.mjs`, `tests/view/headquarters.test.mjs`, `tests/view/clock.test.mjs` |
| Row 10 | `death-settled-once` | met, tests under its marker, the load case included |
| Row 11 | `resurrection` | met |
| Row 12 | `generation number` | met, with its *Not* |
| `solved-map-manual-run/1` | invariant | word for word |
| „What pays…” | D-189 | the sentences To do 22 gives, in approved wording; two approved sentences joined by a semicolon, meaning unchanged; the mark and the earning loop stay for task 18 |
| „What does a character's death take?” | D-190 | approved wording less the clause on the earning loop, To do 17 added; spec decision 11 kept |
| `manual map run` | glossary | stands; nothing to write |

- **Q9's rule:** a search of D-214–D-220 and the two terms for `only`, `never`, `always`, `without`, `solely`, `merely`, `alone`, `must`, `cannot` finds none.
- **Entries against the code:** each changed or new entry says what the code does. `tests/invariants/` and `tests/quality/` are not in the range.
- **A search of the foundation for sentences the change makes false** (`pays`, `every completion`, `from the chest`, `already solved`, `manual repeat`) leaves none. D-186, D-188, D-201 and D-134 stay true.

## Changed invariant tests

- `tests/sim/trip.test.mjs`: cases under `trip-transfer` and `trip-run-end` changed for To do 2, 3 and 5, as report 08 names them; six new markers `solved-map-manual-run`, one new `trip-run-end`.
- `tests/sim/saved-game.test.mjs`: cases under `save-version`, another version moved to 3, the document of version 1 kept and refused, `CRAFTED` grown by the rows of decision 9; one new marker `solved-map-manual-run`.
- New: `tests/sim/death.test.mjs`, `tests/view/clock.test.mjs` and `tests/view/headquarters.test.mjs`, under `resurrection-renewal` and `death-settled-once`.
- Each change names its requirement. No expectation is weakened.

## Trust boundary and the operation that cannot be undone

- **`src/browser/sim/saved-game.ts`:** I crafted no new documents. Reports 08, 12 and 14 fed the load hostile input for `solvedMapRun`, `deposited`, `generation`, `resurrectionReadyAtMs` and `deathSettlement`, and `git diff 8737dba..923391c -- src/browser/sim` is empty, so that code is what they tried. On the head the table `CRAFTED` passes under `tests/sim/saved-game.test.mjs`, and I read `deathSettlement`, `SETTLEMENTS`, `deposited` and the check of the mark in the diff. A version 1 document through the real page was refused as another version. StrykerJS leaves no real gap on a changed line of the load: its survivors at `:763` and `:914` stand on unchanged lines, and the two at `:867` are equivalent, as report 14 says. The one gap on a changed line is report 08's M1, a hand mutant StrykerJS does not make.
- **Irreversible:** `git diff 95de83b..923391c -- deploy src/server .github compose.yaml Dockerfile` is empty, and the range only changes the constant. Nothing was performed on a server. The discard happens only when the merge deploys `main`, a cost the human accepted (Q4, *Context*).

## Slices without a review of their own

- **Slice 4:** to spec decision 8's table and the plan's Goal. Its own-work check named a loaded screen and an unsettled death and would catch them. The executor's report saw three of 16 screenshots; I opened all 16. Every state stands as decision 8 gives it, at both widths: order, wrapping at 480, nothing overflowing. The executor read each line's role from the DOM; I read the `danger` line and the order of the screen myself, on a loaded death. Its gap is M1.
- **Slice 5:** to spec decisions 7 and 8 and the plan's Goal. Its own-work check, no new state and no save on a tick, fits the weakest point, and its test fails when `tick` goes. The one console error is `favicon.ico`, 404 on the harness page, read from the console; it is no fault of the product. The turn of a line to ready, read from the DOM alone by the executor, I saw too: a row 45 s from ready stood, after the moment, as „Wskrzeszenie gotowe” in `text-secondary` with no `danger`, in the DOM and in a screenshot, on the page's own clock with no reload. I did not time the turn; `tests/view/account-screen.test.mjs` pins it within a tick.
- **The way through an account, left unobserved by both slices:** I ran it through the real `index.html`, `app.ts` and `account-api.ts`, with the two API routes answered by `page.route`. See *Checks*.

## Declined to judge

- The owner's saved game state lost at the merge: accepted in Q4 and *Context*.
- When the merge may happen against the window of the plan's change log, line 304: the orchestrator's, no matter of code.
- A later caller of `advanceMinutes` that forgets `settleDeath`: spec decision 4 gives that review to task 18.
- The load's equality of the mark against runs of an earning loop: task 18's, as spec decision 9 says.
- The copy editor on the screen after a death that took everything, which still offers the bought branch of the run's own skills: D-196 and D-200 say so, and the rule is passed over after „Restart”.
- A moment of readiness taken from the clock's reading rather than the game minute's real moment, and a stale reading in a throttled tab: Q11 accepts the clock's limits, and the difference is at most one reading.
- The list of maps not marking a repeat that does not predict the loop: task 18, Q5.
- `/favicon.ico` answering 404 outside the harness: not this change.

## Checks

Run in two detached scratch worktrees of the head with dependencies linked, both removed afterwards, except `foundation_check.py`, which needs `.the-way`. The product's gate was not run, as the handoff gives.

| Command or method | Exit | Result |
|---|---|---|
| `npm run build` | 0 | |
| `npm run typecheck` | 0 | |
| `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` | 0 | 798 pass, 0 fail |
| Prettier `--no-config --no-editorconfig --ignore-path .gitignore --check`, every changed `.ts`, `.mjs`, `.css` | 0 | |
| ESLint `--max-warnings 0`, every changed `.ts`, `.mjs` | 0 | |
| `npm test -- tests/invariants/test_minute_span_split.py` | 0 | |
| `npm test -- tests/invariants/test_restart_seed.py` | 0 | |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 | |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 | |
| `npm test -- tests/invariants/test_map_run_repeatability.py` | 0 | |
| `npm test -- tests/invariants/test_character_team.py` | 0 | |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 | |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 | |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 | |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 | |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | 0 | 0 errors |
| StrykerJS on the changed lines of `trip.ts`, `game.ts`, `saved-game.ts` | 0 | 210 killed, 13 survived, 1 no coverage; `trip.ts` 100% |
| 16 hand mutants of the built view, `node --test tests/view/*.test.mjs` | as in M1 | A–J exit 0; K–P exit 1 |
| Hand mutant of the load (report 08 M1), `node --test tests/sim/saved-game.test.mjs` | 0 | survives |
| `git log --format='%h %ae %s' 95de83b..923391c` | 0 | every commit at `mariusznn@gmail.com` |

The 14 StrykerJS results not killed, classified as `guidelines/testing.md` asks:

| Place | Class and reason |
|---|---|
| `game.ts:273`, `:274` (unchanged lines) | not worth pinning: `createCharacter`'s guard and the text of its error |
| `game.ts:360`, `:440` | not worth pinning: text of an error |
| `game.ts:475` | not worth pinning: `events` of a settlement, as report 14 says |
| `saved-game.ts:763` (2), `:914` (5, one with no coverage) | on unchanged lines, report 08's O1: `:763:9` equivalent, the others a real gap |
| `saved-game.ts:867` (2) | equivalent: without it `owner.archetypeId` throws, and the catch gives the same `shape` |

Manual check in a real browser (Playwright), on the build of the head served locally, `/api/account` and `/api/saved-game` answered by `page.route`, saved documents made by the real simulation:

| State | What it showed |
|---|---|
| Save of version 1 | „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” above a new game, one `PUT` at version 2, `basedOn` 7 |
| Save on the screen after a death that took everything | The line in `danger` (`rgb(255, 100, 103)`) between the status row and the body row; no `PUT` in 1.5 s after the load; after „Zakończ”, „pokolenie 2” in `text-secondary` and the line in `danger` with its time; console 0 errors |
| A marked run, played to a real death by the real clock at 16× | Paused at its discovery as Q1 gives, the line of To do 6 above „Wyniesie: nic”; the `PUT` at the death held `resurrectionUsed` and a moment of readiness 28 799 997 ms after the request reached the route, so 8 hours after a reading 3 ms earlier; „Restart” sent `solvedMapRun: true`, chest unchanged; the headquarters then read „Wskrzeszenie za 8 godz. 0 min…” in `danger` |
| Harness `#hq` | One console error, `/favicon.ico` 404; „Dan” turned ready with the role of a ready line, seen in a screenshot |

A negative control for the routes: the version 1 and the two version 2 documents gave three different screens, so the answers did reach the page. The server itself, its session and its save routes, was not run: its answers were stood in for, and `git diff` shows no change under `src/server`.

Not run: the product's gate, so `tests/*.test.mjs` at the top of `tests/`, the other Python tests and the other quality checks stay unchecked here; none of them is in the range.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| Global playbook of code review | `C:\Storage\The Brain\The Brain\Notes\Areas\(A) Claude code\playbook_code_review.md` | the user's instructions ask it read before a review |
| Rules of scripts | `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` | named by the handoff |
| Playwright method | `C:/Storage/The Brain/The Brain/.ai/skills/playwright-mcp/SKILL.md` and its `references/` on setup, reading, timing, false positives and mocking | the user's instructions, before a verdict from a browser |
| `src/browser/view/game-saver.ts:1-120` | the saver's start | whether a read at construction could reach `headquarters` before it stands; it does not |
| `src/browser/account-api.ts` | a search for routes | the browser check |
| The cycle's harness | `.runs/task-cycles/rozliczenie-przejsc/harness/` | the console error of Slice 5 |

## Searches not found or unclear

- **Unclear, the handoff against the method:** the handoff says to carry no Minor or out-of-scope finding of the slice reviews forward unless found again, while `.the-way/task-cycle/review/whole_change.md` says to grade each. I graded each, in a table of its own, and counted them apart.
- **Unclear, the selection of decisions:** the search by *Scope* of `.the-way/elements/common/way_of_working.md`, step 2, gives 193 of the log's 220 entries here, 3 581 lines, while the same step says the whole log is not read. I read whole D-03, D-04, D-07, D-18, D-21, D-39, D-40, D-50–D-56, D-61, D-62, D-71, D-96, D-118, D-119, D-122, D-132–D-136, D-168, D-173, D-174, D-179, D-183–D-192, D-194, D-196, D-199–D-201, D-206, D-207, D-210, D-212–D-220, and every invariant, both glossaries and the part map. The rest I picked out by title alone, so those entries are unread.
- **Not found:** a lasting test of the screen's wiring for To do 6 and 18, which is M1.
- **Unverified:** the behaviour against a real account server. D-111 keeps an unconfigured server from answering, so the browser check stood in for its answers.
