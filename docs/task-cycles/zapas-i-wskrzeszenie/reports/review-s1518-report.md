PASS ad90dd334377f0a24821cef0e70f0a53388906e3

# Review of slices 15, 16, 17 and 18 of `zapas-i-wskrzeszenie` (grouped)

- Range: `16625f50..ad90dd33`. `git rev-parse HEAD` = `ad90dd334377f0a24821cef0e70f0a53388906e3`, the head given. The working tree was clean before and after the review.
- Commits: `0f810761` (slice 15), `114189c5` (slice 16), `0419a56e` (slice 17), `ad90dd33` (slice 18). Diff computed with `git diff 16625f50..ad90dd33` and `git log 16625f50..ad90dd33`: 10 files, +155 / -450.
- Pin of the-way: `.the-way` at `19e5774a`, the commit the gitlink records.

Counts: blocking 0, Minor 2, out of scope 0.

## Findings

### Critical

None.

### Important

None.

### Minor

1. **`tests/view/trip.test.mjs:211-226`, the case "the enter line of a map already solved is cut by the chest, as at any map" (slice 15).**
   - **What is wrong:** `entersLine` takes no solved state. The case passes no input that makes a map solved. So it is the unsolved case at `tests/view/trip.test.mjs:171-208` again, with different numbers.
   - **Why it matters:** its comment says it "Catches a line of a solved map that takes from nowhere". It cannot catch that. The failure it names would sit in `maps-screen.tsx`, which used to pass `null` for a solved map, and this case never runs that code.
   - **What does guard the requirement:** the jsdom case "„Wejdzie: …” is what a send takes from the chest, at an unsolved map and at a solved one alike…" (`tests/view/maps-screen.test.mjs:601-641`), which mounts the screen with `solved(...)` and expects `Wejdzie: patyk 2`, and the type `Chest` (no `null`) on `entersLine` and `sendTake`, which `npm run typecheck` holds.
   - **Who asked for it:** the plan's *Checks* asked for a red case in this file. The executor reported that the case passed at once and that the real red was the maps-screen case.
   - **Evidence:** `src/browser/view/trip-lines.ts:23-30`, signature `entersLine(plan, chest, capacity, map)`. The guideline `guidelines/testing.md` "Testy bez dodatkowej ochrony" says a duplicate case may bring no new proof.
   - **Remedy (optional):** remove the case, or rewrite its comment so it claims only what it checks. Nothing here blocks.

2. **`guidelines/styleguide-browser-view.md:679` and `tests/view/world-area.test.mjs:277` (slices 15 and 17), polish.**
   - In the styleguide, line 679 („Puść w pętlę” zwykłym przyciskiem, a obok „Pętla nic nie zarobi do skrzynki” w `warning`, gdy) was not rewrapped after the line about the warning was removed. It runs to about 100 characters, where the paragraph wraps at about 78.
   - In `world-area.test.mjs`, the constant `notReady` still names the old idea of a resurrection "not ready". The comment above it now speaks of "no use of the resurrection left".
   - Neither changes what a reader or the code does.

## The executors' concerns, judged

- **Slice 15: two reds that already failed at the base, fixed in `tests/view/trip.test.mjs` though the handoff did not list them.** Both changes have a cause on the requirement side, and that cause is named in the file.
  - "Six screens": a solved run going on now shows the preview `Wyniesie: patyk 3`. D-186 shows the preview on every map run. D-189 now says a solved run "brings its loot out to it as every other map run does". `tripLoot` does not branch on the mark (`src/browser/sim/trip.ts:74-77`).
  - "Death not yet settled": `progressLost` is now produced by spending every use (`BALANCE.resurrectionUses`), not by the old field. That follows D-190.
  - Both fit `guidelines/testing.md` "Changing an existing test". Accepted.
- **Slice 15: text of the solved run left for slice 17.** Slice 17 made it (`src/browser/view/trip-lines.ts:76-77`). It is word for word the line of D-215 and of question 6.
- **Slice 16: `tests/view/trip.test.mjs` passed 9 of 9 at its base.** That is expected. The test's constant `SOLVED_LINE` and the code still held the same old text until slice 17. No discrepancy.
- **Slice 17: the world-area case expected `Wyniesie: nic` where the code gives `patyk 3`.** The new expectation follows D-186 together with D-189 as it now reads. The red at the base came from slice 3, not from this slice. Accepted.
- **Slice 18: no case of a solved-map run that leaves the chest as it was.** I searched `tests/view/account-screen.test.mjs` for `solvedMaps`, `solvedMapRun`, "chest as it", "from nowhere", "nic nie bierze" and "takes nothing". The four `solvedMaps` hits are cases of the earning loop, of acts that save, and of a chest change through „Puść w pętlę”. None asserts that a manual solved run leaves the chest unchanged. The only such case was the case of the mark, which was removed. The plan's expectation had nothing to act on.
- **Slice 18: `usesSpent` followed instead of the plan's "uses left".** This agrees with D-216 as it stands: "the uses left {u} being that count less the uses spent that the settlement of the death holds". It also agrees with the loader, which reads `usesSpent` in `src/browser/sim/saved-game.ts:834-841`. Accepted.

## Against the task and the foundation

- **To do 1 and D-189, D-214.** „Wejdzie: …” is counted from `state.team.chest` at every map (`src/browser/view/maps-screen.tsx:314`). `sendTake` takes a `Chest` always (`src/browser/sim/trip.ts:41-52`). The jsdom case expects `Wejdzie: patyk 2` at a solved map with a chest of `stick: 2`.
- **To do 4, question 6, the warning under „Wejdź”.** `REHEARSAL_MARK`, `rehearsalMark`, the element `<p className="rehearsal-mark">`, the stylesheet rule `.rehearsal-mark` and every comment that named them are gone. `git grep` for `rehearsal|REHEARSAL|Próba weźmie` outside `.the-way` finds only the row of D-251 in the list of withdrawn numbers. One test comment says "from nowhere" (`tests/view/trip.test.mjs:212`); see Minor 1.
- **To do 4, question 6, the line of a solved run (D-215).** The text reads „Mapa jest już rozwiązana: to przejście nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.”. Its place, role and lifetime are unchanged: `solvedRunText` depends on `run.solvedMapRun` alone. The world-area case holds the place: `parts[4]` is the line and `parts[5]` is „Wprawa w tym przejściu”. No copy of the old text remains: `git grep -i "nic nie płaci|nic nie bierze ze skrzynki"` finds nothing.
- **To do 4, the styleguide.**
  - In "The screen Mapy", D-251 has left the *Decision* list and the warning has left the text. The line of the resurrection reads "a przy zerze użyć w `danger` (D-217)".
  - In "The end-of-run window", the line in `danger` reads "gdy wskrzeszenie nie miało żadnego użycia (D-185, D-216)".
  - The form of both rules is unchanged. I compared them with `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/styleguide/template.md`.
- **D-216 and D-217.** The lines that slice 18 tests are:
  - 0 of 3 in `danger`;
  - 1 of 3 with the next return 4 h on, out of `danger`;
  - 3 of 3 with no return named.

  The 1-of-3 maps-screen case (next return in 3 h at 9 h) follows D-190's single clock. I worked these numbers out by hand from D-190 (3 uses, 4 h): first return 8 h after the start and each next one 4 h later. The settlement of a death holds `usesSpent: 1`. That agrees with D-216.
- **D-329.** The section's lines keep their order. The `maps-who-enter` column now holds „Wejdź” alone. Its comment was rewritten (`src/browser/maps-screen.css:214`).
- **To do 7, the withdrawal of D-251.** The repository names D-251 only in the list of withdrawn numbers (`foundations/decisions.md:11712`). No `decision: D-251` line is left. `foundation_check.py` without the skip switch reports 0 errors.
- **Slice 16, no change of behaviour.** `takeFromNowhere`, `clippedTake` and the branch of `sendTake` with no chest are gone. I ran `git grep` for them in `src/`, `balance/`, `tests/`, `scripts/`, `guidelines/`, `foundations/` and `.claude/`: nothing calls them. The only callers of `sendTake` are `takeTrip` and `entersLine`, and both pass a chest. The branch that was removed served only the `null` chest, which the type now forbids, so no path the game runs has changed.
- **A changed invariant test.** Slice 16 removed one case that cited `solved-map-manual-run`: the `takeFromNowhere` case. Five citing cases stood before and four stand after in `tests/sim/trip.test.mjs`, besides two in `tests/sim/saved-game.test.mjs`. The case removed checked the clipping from nowhere, not the invariant's sentence ("adds no practice"). The removal follows from D-189.
- **Reserved choice.** None. No language, framework, library, data store, way of logging in or place to run is taken.
- **Code made to pass a test.** None found. No branch or value in `trip-lines.ts`, `maps-screen.tsx` or `trip.ts` is made for a test's input.
- **Trust boundary (`src/browser/sim/saved-game.ts`).** The range does not change the loader. I read `resurrectionUses` (`src/browser/sim/saved-game.ts:500-516`) and the reading of `resurrectionUsed` (`:834-841`). They check:
  - a count above the data's count: refused;
  - a moment standing with none spent, or missing with some spent: refused by `(nextValue === null) !== (spent === 0)`;
  - whole numbers, through `count`, `integer(…, 1)` and `integer`.

  That the crafted documents are refused is held by the cases of `tests/sim/saved-game.test.mjs`, the work of slice 6. I did not run them in this review. See *Declined to judge*.

## Declined to judge

- How the loader of `src/browser/sim/saved-game.ts` behaves under hostile input. It is not changed in this range. It is slice 6's, and the review of that slice or of the whole change judges it. I only read the two functions named above.
- The walk through the running game and its screenshots. The handoff names it as a dedicated step after this review.
- The `maps-who-enter` wrapper that now holds one button. It is a choice the executor reported, with no consequence for the user or the code.

## Checks run

- `npm run typecheck`: exit 0.
- `npm test -- tests/view/trip.test.mjs`: exit 0.
- `npm test -- tests/view/maps-screen.test.mjs`: exit 0 (20 pass).
- `npm test -- tests/sim/trip.test.mjs`: exit 0 (24 pass).
- `npm test -- tests/view/world-area.test.mjs`: exit 0 (23 pass).
- `npm test -- tests/view/account-screen.test.mjs`: exit 0 (132 pass).
- `npm test -- tests/invariants/test_browser_view_token_values.py`: exit 0 (4 tests).
- `python -B .the-way/elements/common/foundation_check.py`, without the skip switch: exit 0, "0 errors".
- `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/trip.ts:41-52"` (`sendTake`, a changed file of `simulation`, as `guidelines/testing.md` "Mutation testing" asks of the reviewer): exit 0. 3 mutants, 3 killed, 0 survived. Its report went where the product's tool puts it, `.runs/stryker/mutation.json`.
- `npx eslint` on the eight changed TS/JS files: exit 0.
- `npx prettier --check` on the nine changed TS/JS/CSS files: exit 0.
- `python -B .the-way/instruction-files/check_instructions.py`: exit 0, 0 errors. The 145 warnings are dead-path warnings for address fragments such as `#/mapy` and for test file names; none of them comes from a line this range adds.
- `git grep` for `D-251`, `rehearsal`, `takeFromNowhere`, `clippedTake`, `Próba weźmie`, `nic nie bierze ze skrzynki` and `nic nie płaci` (see above).
- Not run: the full `npm test`. It is the cycle's own run before the request.

## Reaches beyond the dispatch

- `src/browser/sim/saved-game.ts:495-569` and `:834-841`, read because the handoff names that file as the trust boundary of the task.
- `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/styleguide/template.md`, read whole because the method compares a changed styleguide with them.
- `foundations/invariants.md`, the entries `trip-transfer`, `trip-run-end`, `solved-map-manual-run` and `resurrection-renewal`, read whole because the removed and changed cases cite them or depend on them.
- `foundations/decisions.md` D-186 and D-190, read whole because the changed cases quote D-186 and the new expectations of uses follow D-190. D-240 was read whole too; it is named in slice 18's row of the table.
- `tests/view/account-screen.test.mjs`, read by search and in ranges (2235-2275, 2390-2420, 2785-2800, 3080-3126), to verify the claim of slice 18 about solved-map cases. The diff of the range covers the rest of what changed.
- `tests/view/maps-screen.test.mjs:596-645`, `tests/view/trip.test.mjs:290-372`, `tests/view/world-area.test.mjs:90-110` and `src/browser/sim/trip.ts:31-80`, read in ranges to see the changed cases in full.

## Working copies

- `.runs/review-s1518/` held the logs of the checks and the summary of exit codes. I removed it with `rm -rf` and its full path, and confirmed it gone. No git worktree was made. Remainder: none.
- `.runs/stryker/mutation.json` and `.stryker-tmp/` are written by the product's own tool, so they are not a working copy of mine.

## Unread material

- `.runs/task-cycles/zapas-i-wskrzeszenie/task.md` beyond the passages copied in the handoff: not opened.
- `.runs/task-cycles/zapas-i-wskrzeszenie/plan.md`: not opened. The handoff copies slices 15-18 and the table of foundation entries.
- `tests/view/account-screen.test.mjs`: read only by search and the ranges above, as the plan directs for this file of about 359 000 characters.
- `tests/view/maps-screen.test.mjs`, `tests/view/trip.test.mjs`, `tests/view/world-area.test.mjs` and `tests/sim/trip.test.mjs`: read in the diff and in the ranges above, not whole.
- D-251: it has no entry of its own. I read its row in the list of withdrawn numbers (`foundations/decisions.md:11712`).
- Every guideline file the handoff names was read whole: `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-browser-module.md`, `guidelines/coding-simulation-module.md` and `guidelines/styleguide-browser-view.md`. `src/browser/AGENTS.md` was read whole too, as were the foundation entries D-188, D-189, D-214, D-215, D-216, D-217, D-326, D-327 and D-329, and the ranges `foundations/part_map.md:3-64` and `:139-157`.

## Searches not found or unclear

- A case in `tests/view/account-screen.test.mjs` expecting a manual run of a solved map to leave the chest as it was. Not found; see the judgment of slice 18 above.
- A heading `### D-251` in `foundations/decisions.md`. Not found. It stands only as a row of the withdrawn list, as the withdrawal intends.
- A case that expects nothing to stand under „Wejdź” at a solved map with a short chest, now that the mark is gone. Not found. The removal is plain in the code, and no decision asks for a test of absence there.
