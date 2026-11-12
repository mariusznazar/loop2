# Slice 29 report

- **Status:** done with concerns (the concerns are judgments listed under "Choices", none blocks)
- **Base:** `4ec05e2335b4176e44fe35db81a9ebbcbea38182` (HEAD at start, worktree clean)
- **Commit:** `a6ecd19ec08d94bdd439528306611d7d88fd5741` (`test: :memo: name decisions instead of notes, tasks and specs in the comments and titles of the view tests of the end, the clock and the headquarters`)
- **Files changed (9, 82 insertions, 91 deletions, comments and one test title only):** tests/view/end-question.test.mjs, game-saver.test.mjs, clock.test.mjs, away-report.test.mjs, team-lines.test.mjs, trip.test.mjs, tile-list.test.mjs, maps-screen.test.mjs, headquarters-screen.test.mjs. `foundations/decisions.md` is unchanged: no decision was written (see Choices). Verified with `git diff -U0` that the only non-comment line changed is one test title.

## Checks

| Check | Result |
|---|---|
| `npm test -- tests/view/end-question.test.mjs` | exit 0, 17 pass |
| `npm test -- tests/view/game-saver.test.mjs` | exit 0, 20 pass |
| `npm test -- tests/view/clock.test.mjs` | exit 0, 23 pass |
| `npm test -- tests/view/away-report.test.mjs` | exit 0, 14 pass (re-run after the prettier fix below) |
| `npm test -- tests/view/team-lines.test.mjs` | exit 0, 16 pass |
| `npm test -- tests/view/trip.test.mjs` | exit 0, 9 pass |
| `npm test -- tests/view/tile-list.test.mjs` | exit 0, 15 pass |
| `npm test -- tests/view/maps-screen.test.mjs` | exit 0, 20 pass |
| `npm test -- tests/view/headquarters-screen.test.mjs` | exit 0, 18 pass |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 <the 9 files>` | exit 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig <the 9 files>` | first run exit 1 (my edit of the away-report test title dropped a space after the comma), fixed, second run exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0 (0 errors) |
| S1 `git grep` (as in Checks) | no line, exit 1 |
| S2 `git grep` | no line after the change (before: about 60 lines, all pointers) |
| S3 `git grep` | 3 lines, all the game word "plan" (trip plan), see below |
| Wider search (`Row N`, `Finding`, `binding answer`, `Task item`, `review`, `answer N`, `cause N`, `loop2#`, `Settlement N`, `Decision N`, `Section N`, `C4`/`C5`, `task`, `note`, `vault`) | the only hits are code identifiers (`deathSettlement`, `end-question-note`, `maps-card-note`, `maps-who-run-note`) and the words "settlement" of the death settlement (game concept); no pointer |

Per-test logs: `docs/task-cycles/martwe-odsylacze-origin/reports/slice-29-<file>.log`.

S3 hits listed with why they point to nothing outside the repository:
- `tests/view/maps-screen.test.mjs:39` "the trip plan of the program" – the game's trip plan (take and bring lists), not a cycle plan.
- `tests/view/maps-screen.test.mjs:542` "no map of the data cuts a plan today" – the trip plan (D-188).
- `tests/view/maps-screen.test.mjs:581` string "a plan that fits stands with no line" – the trip plan.
- (`const plan`, `tripPlan`, `withPlan`, "Plan wyprawy wejdzie przycięty" are code and game texts, not comments about a document.)

## Own-work check

Requirement most likely missed: a pointer survives in a form the three searches do not match, or a comment now names a decision that does not hold the requirement. Check: wider search (above) on all nine files, and a read of every decision I named (D-19, D-27, D-70, D-72, D-97, D-190, D-215, D-217, D-221, D-242, D-244, D-245, D-246, D-247, D-248, D-282, D-283, D-284, D-287, D-324, D-327, D-329, D-330, D-173, D-172, D-171, D-168, D-207, D-04) against the sentence of the test comment it now stands beside. Result: no remaining pointer; the exceptions are the three judgments below.

## Changed lines: old pointer, outcome, entry

Outcome words: named (entry named), removed. No entry was written.

### tests/view/end-question.test.mjs
| Old pointer | Outcome | Entry |
|---|---|---|
| header: "task pytanie-przy-zakoncz, To do 1 to 7" | removed; D-324 added to the list | D-173, D-324 |
| "D-172 and row 3" | named | D-172 |
| "To do 1, rows 4 and 7 of the settlements" | named | D-173, D-324 |
| "To do 2 and the second clause of D-173" | named | D-173 |
| "To do 3, rows 1 and 3 and D-172" | named | D-173, D-172 |
| "To do 3 last clause, row 2, D-171, D-168" | named | D-173, D-171, D-168 |
| "To do 4, row 1" | named | D-173 |
| "To do 5, row 5" | named | D-324 |
| "To do 6, row 6" | named | D-324, D-283, D-284 |
| "To do 6 second clause, row 6, D-212" | named | D-324, D-212 |
| "To do 6 third group, row 7" | named | D-324 |
| "To do 6 last group, row 7, D-173 read as the task gives" | named | D-324 with D-173 |
| "To do 6 third bullet of the last group, row 7" | named | D-324 |
| "Row 4 and row 8, D-122, D-173" | named | D-173, D-122 |
| "Row 7 with row 4" | named | D-324 with D-173 |

### tests/view/away-report.test.mjs
| Old pointer | Outcome | Entry |
|---|---|---|
| header "task petla-zarobkowa, To do 16; spec section 11" and "written out from To do 16" | named | D-246 |
| test title "wordings of To do 16" (the one title changed) | named | D-246 |
| "(Q19)" twice | named | D-246 (it holds the title by where the stop happened and the minutes of a stop in the open game) |

### tests/view/clock.test.mjs
| Old pointer | Outcome | Entry |
|---|---|---|
| header "spec section 7 ... task rozliczenie-przejsc, To do 13 and 16; spec, decisions 4 and 7" | named | D-97 (logout disposes the game's timers), D-221, D-242 |
| "480 real minutes (task, Context)" | named | D-190 (eight hours to start) |
| "Spec, decision 7" before "a send takes the one reading of its flush" | removed (the test title says it) | none |
| "Spec, decision 4" (one result per reading) | named | D-221 |
| "Spec, decision 4" (retained death, same step) | named | D-221 |
| "Spec, decision 7" before the "moment" test, before "a send makes a reading", before "a call follows each flush" | removed (each title says it) | none |
| section line "task petla-zarobkowa, To do 2, 11, 13 and 17; spec sections 6 and 8" | named | D-242, D-247 |
| "To do 2, 17; spec section 6" | named | D-221, D-242 |
| "Spec section 6" (k-th minute moment) | named | D-242 |
| "Spec section 6, the clock takes its new value before ..." | named | D-242 |
| "To do 11 ... spec section 6" (clock set back) | named | D-242 |
| "Spec section 6" (first loop gets a full minute) | named | D-242 |
| "To do 11, 13; spec section 8" (catch-up span) | named | D-247, D-242 |

### tests/view/game-saver.test.mjs
| Old pointer | Outcome | Entry |
|---|---|---|
| header "task zapis-stanu-na-serwerze, To do 7, 8 and 10; spec sections 6 and 8" and "task petla-zarobkowa, To do 10 and row 13" | removed; D-207 ... D-97 and D-248 stay | D-207, D-208, D-209, D-210, D-211, D-97, D-248 |
| "To do 10 with D-206 and row 13" (helper comment, retry stamp, "every document is stamped") | named (D-206 is the version of the save and does not hold the stamp; D-248 does) | D-248 |
| "Task petla-zarobkowa, To do 17, row 18 (Q11); spec section 10; D-207" | named | D-207 |
| "Spec section 9; D-248" and "Spec section 9; D-207, D-248" | named | D-248, D-207 |

### tests/view/team-lines.test.mjs
| Old pointer | Outcome | Entry |
|---|---|---|
| "To do 19, Q12" and "Q12's three examples" | named | D-217 (rounding up and the three examples are in its Rationale) |
| "D-244, To do 9" | named | D-244 |
| "D-245, To do 8, Q18" | named | D-245 |
| "To do 8, row 1; question 3" (sentence beside an inactive send) | named | D-287 |

### tests/view/trip.test.mjs
| Old pointer | Outcome | Entry |
|---|---|---|
| "D-251, To do 18" | named | D-251 |
| "D-180, D-189, To do 5 item 4" | named | D-180, D-189 |
| "To do 6, D-326" | named | D-326 |
| "in decision 8's order, for the six screens" | removed (the case lists the six screens itself; "order" was not asserted); solved-map line now names its decision | D-215 |
| "To do 10 with D-206; row 13" | named | D-248 |

### tests/view/tile-list.test.mjs
| Old pointer | Outcome | Entry |
|---|---|---|
| "spec section 5, choices C4 and C5" | named | D-19 |
| "task, To do 15; spec Decision 5; D-70" | named | D-70, D-72 |

### tests/view/maps-screen.test.mjs
| Old pointer | Outcome | Entry |
|---|---|---|
| header "task karty-i-katalog-map, To do 3 to 7" | removed; the decision list stays | D-325 to D-331 and the rest of the list |
| "as To do 4 gives it" (card of Las) | named | D-327 |
| "as To do 4 gives it and as the old Loop joins them" | named; the old Loop as a game stays said | D-327 |
| "in the order the task gives" | named | D-329 |

### tests/view/headquarters-screen.test.mjs
| Old pointer | Outcome | Entry |
|---|---|---|
| header "task karty-i-katalog-map, To do 8 and question 11" | removed; the decision list stays | D-282, D-246, D-217, D-218, D-244, D-245, D-184, D-51, D-330 |
| "the task's settlement 3" (credits last) | named | D-27 (the credits are the last part of Siedziba) |
| "Settlement 4, D-330" | named | D-330 |

## Choices (judgments, with the way rejected and its cost if wrong)

1. **No new decision written; `foundations/decisions.md` untouched.** Everything the pointers led to was found in the foundation, except three kinds of detail where I judged that the test title already says the requirement and removed or replaced the pointer instead of writing a decision:
   - clock contract (`tests/view/clock.test.mjs`): "the clock gives the moment of its latest reading, also at the start", "a send makes a reading, the moment is that one", "the view is told after each flush, once the store has the result", "a send takes the one reading of its flush". These came from a spec of an earlier cycle (now only in git history). D-04 and D-221 hold the principle (one reading of the browser's clock, one result per reading) but not these four points of the clock's interface. Rejected: a decision "what the clock hands the view" recovered from code with its reasoning from that old spec; the slice asks for reasoning from a vault note, and these have none. Cost if wrong: a reviewer who reads D-82 strictly will say a test expects something the foundation does not state; the fix is one decision with the reasoning of `docs/task-cycles/rozliczenie-przejsc/spec.md` decision 7 (read from git history, commit `a8d3990b`).
   - burning stick row (`tests/view/tile-list.test.mjs`): the row text "patyk — płonie, zostało N min" and its place after the campfire line. D-70 gives the campfire wording and D-72's Rationale says the list shows the burning stick's state; the exact stick wording is only in the test and the code (the vault note of the fire task said only that a burning stick shows in this row alone, `ognisko_i_jedzenie_loop2.md` line 30 of the snapshot). Rejected: a new decision "how the list shows a burning stick"; the wording follows the campfire's in D-70 and the test title states the placement. Cost if wrong: same as above.
   - cells of the tile list (columns = the map's resources in the map's order, "—" where a tile lacks a resource, "0" when used up, rows labelled "(col, row)"): D-19 holds only that the list keeps the stock of every resource of a tile; the layout comes from an early spec (choices C4 and C5, not found in git history under that name). Test titles state each point. Same rejection and cost.
   If the orchestrator wants any of the three written, it is a `the-way-record-decision` entry with *Origin* `none`; say which.
2. **`resurrection-renewal` invariant lines** (three tests cite it, in `clock.test.mjs` and `team-lines.test.mjs`) kept untouched; their neighbouring comments now name D-221 and D-190/D-217.
3. In `game-saver.test.mjs` and `trip.test.mjs` "To do 10 with D-206; row 13" pointed to the stamp of a document; D-206 (version of the save) does not hold that, D-248 does, so the new pointer is D-248, not D-206. The plan's pointer in the source was imprecise.
4. "as the old Loop joins them" (`maps-screen.test.mjs:283`) stays: it says what the old game did, no file of its repository.

## Reaches beyond the dispatch

- Read decisions D-168, D-171, D-172, D-173, D-190, D-206, D-207, D-212, D-215, D-217, D-219, D-221, D-240, D-242, D-244, D-245, D-246, D-247, D-248, D-250, D-282, D-283, D-284, D-287, D-324, D-325, D-327, D-329, D-330, D-27, D-19, D-70, D-72 (one line only), D-04, D-97, D-125 and `foundations/invariants.md` entries `resurrection-renewal` and `tracked-file-private-names`, to find the entry that holds each requirement (the handoff lists only D-80, D-82, D-362, D-368 and the guidelines).
- Read `git show a8d3990b:docs/task-cycles/rozliczenie-przejsc/spec.md` section 7 (git history of loop2) to understand "Spec, decision 7" of the clock tests; nothing from it entered a file.
- Read `the private snapshot of the notes (not committed)/vault/ognisko_i_jedzenie_loop2.md` lines 30 and 154 for the burning stick.

## Unread material

- Did not read in full: `.the-way/elements/decisions/template.md`, `.the-way/elements/common/rules.md`, `.the-way/task-cycle/skill/foundation_step.md`, `.the-way/elements/decisions/skill/SKILL.md` was read in full, `read.md`, `decide_entry.md` and `way_of_working.md` were read in full; the template, rules.md and foundation_step.md stayed unread because no decision was written.
- `guidelines/coding.md`, `guidelines/testing.md` read whole; `guidelines/styleguide-browser-view.md` read whole (818 lines).
- The invariant `resurrection-renewal` read whole; the other invariants the test files cite: none (only that one is cited by `invariant:` lines in the nine files). The part-map entry of browser-view read (lines 3-29), the rest of that file not read.
- The task passages were copied in the handoff; I did not open `task.md` or `plan.md` themselves. The decisions D-80, D-82, D-362, D-368 read; D-80 read; the new invariant `tracked-file-private-names` read.
- `src/browser/AGENTS.md` not read: no file of `src/browser/` was changed.

## Searches not found or unclear

- Spec section 5 "choices C4 and C5" for `tile-list.test.mjs`: a `git log -S'choices C4'` found only the record of an unrelated cycle (skad-wiem-o-awarii); the spec of the tile list itself was not located in git history, so the cells' layout rests on test titles (see Choices 1).
- Which task the comment "task, To do 15; spec Decision 5" of `tile-list.test.mjs` meant: inferred as the fire task (`ognisko_i_jedzenie_loop2.md` row 15 in the snapshot) because its wording matches D-70.
- The plan's slice text says "Q-numbers and rows" are pointers; I found them all by S2 and by reading. No hit of the wider search was a pointer.
- The handoff names D-80 at `foundations/decisions.md:1520-1532` in *Read*, the *Current ranges* give 1651-1663; I read it at the current range.
