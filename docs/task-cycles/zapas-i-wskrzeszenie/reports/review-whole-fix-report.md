PASS 5d20e26e11f1932a13b518b63cef36a5b8aa13d0

# Review of the fix of the Minor findings of the review of the whole change — task `zapas-i-wskrzeszenie`

Range: `ad90dd33..5d20e26e` (`003f27c0`, `192aa021`, `edc79bff`, `2a360f2d`, `5d20e26e`); `git rev-parse HEAD` = `5d20e26e…`, as given. Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md`. Read: the findings file `reports/findings-whole.md` (its 17 Minor findings within the task), the fix report `reports/whole-fix-report.md`, the fix diff whole. By the cycle's rule only a new Critical or Important finding in the fix fails this review.

## Findings

### Critical

none

### Important

none — no new Critical or Important finding in the fix diff.

### Minor (block nothing)

- **Finding 12, part remains — `.claude/skills/loop2-balance/SKILL.md:101` (and its copy).** The rewrap of the paragraph at the old line 99 moved its long tail one line down: line 101 now runs to 150 characters ("per map run, and the share of map runs that end in death. The label is `P1`, `P2`... : the program's number in the list that `programs` prints, the"), while the paragraph wraps at about 98. No check reads it.
- **Outside the fix diff (note): `tests/view/end-window-lines.test.mjs:209`** — the comment "(D-216, question 16)" points at the task document, the same defect as finding 3 (`guidelines/testing.md`, "Where the expected value comes from"). The executor named it. It stood in the reviewed range and my review of the whole change missed it.

## Each finding of the findings file

1. **Fixed.** The skill's section "Measuring whether each map can be solved…" and the header comment of `balance/progression.mjs` now say that each stocking run is made with the best program of the map it is made on, that the stock is what that program brings out and not what another program could bring, that an item it does not bring ends the stock "not gathered in full" after 100 runs (`MAX_STOCK_RUNS`), and that such a row is measured with less than a generous state. The stocking code is unchanged (the first remedy of the finding).
2. **Fixed, as the finding allows.** The function is renamed `resurrectionHasUse` (`src/browser/sim/game.ts:120`), and its doc comment names the kind and says the function does not mean a full stock. Rename complete: `git grep resurrectionReady` finds the settlement kind alone (`types.ts:304`, `game.ts:744`, `saved-game.ts:881` and the test cases that build or expect that kind), the option `resurrectionReady` of `balance/loop.mjs` with its callers (`check-map.mjs:62`, `cli.mjs:347`, tests of `tests/balance/`), and the new comment. That option means "the loop starts with every use" and is not the function. The callers of the function (`balance/campaign.mjs`, `tests/sim/completion`, `death`, `team`) use the new name. No skill, guideline or foundation entry named the function. The saved document's kind key is unchanged: `saved-game.ts` and `types.ts` are not in the diff.
3. **Fixed.** The comment "Task question 15: …" is gone from `tests/sim/team.test.mjs`. The same defect at `end-window-lines.test.mjs:209` is noted above; it is not in the findings file.
4. **Fixed.** `tripLoot` picks `"bringPlan" | "character"` (`trip.ts:80`), and `loop.ts` and `balance/engine.mjs` no longer pass `solvedMapRun`. Typecheck passes.
5. **Fixed.** `LOOP_COLUMN_COUNT` stands once, exported beside `headerOf` in `balance/check-map.mjs:80`, and `progression.mjs` imports it. The cutting of Markdown cells stays in `withoutLoopColumns`; the executor names it, and the test of the six column names guards it. No behaviour change: `progression.test.mjs` and `check-map.test.mjs` pass.
6. **Fixed.** One sentence in the skill and in the header of `progression.mjs` says that the stocking character and the measured one buy ranks from the same practice.
7. **Fixed.** The comments of `teamAfterDeath`, `settleDeath` and `settleCompletion` now name the RangeError of a safe `nowMs` whose moment of the clock lies beyond the safe integers (D-386). No code changed.
8. **Fixed.** `tests/sim/saved-game.test.mjs:3280-3286` compares the marked completion's backpack and deposit with those of the unmarked run `done`, the independent expectation D-189 gives. The pinned 2 berries are gone.
9. **Fixed.** D-240 *Rationale* ("died with the last use of the resurrection", "whose uses of the resurrection or the clock of their return another's turn reaches") and *Rejected* ("the last use of the resurrection going to the character that died first in real time") now agree with its binding sentence. The diff of D-240 touches only those two lines; the binding sentence and the fields are unchanged.
10. **First half fixed; second half contested, and I accept the reason.**
    - D-190 *Rejected* gains four ways, from the sources of rows 2-4 (questions 2 and 4): the shape with no path through crafting ("the clock stays the price of progress for good", the cost the source keeps); the full crafted item at once and the resurrection as a real item with numbers of its own; and numbers of the human's own choosing. The last three each carry `no cost to the product known`: their sources keep only a wait for later tasks of the plan, a cost of the process, or no cost at all, as `.the-way/elements/decisions/template.md` asks. The ways of questions 3 and 5 and the other ways of question 2 already stood in the entry. No other sentence of D-190 changed (the diff of D-190 is the one *Rejected* line).
    - Not splitting `resurrection-renewal`: a split needs new identifiers, which the plan does not give, and the identifier is cited by D-190, D-219 and many tests. The content was judged right. It remains Minor.
11. **Fixed.** The names and comments are rewritten: `oneLeft` ("the clock running…"), `nextReturnMs` in `loop.test.mjs`, the title in `team-lines.test.mjs`, "about two hours after the reading" in `clock.test.mjs`, `usedUp` in `world-area.test.mjs`, and "the stock of uses was found full" in the two end-window files. No assertion changed.
12. **Partly fixed.** The header of `balance/check-map.mjs` and the styleguide paragraph (`guidelines/styleguide-browser-view.md:679-682`) are rewrapped with no word changed (I compared them word by word). The skill paragraph remains long at line 101 (above).
13. **Fixed.** The citations of `solved-map-manual-run` are gone from the chest case of `tests/sim/trip.test.mjs` and from the marked-deposit case of `tests/sim/saved-game.test.mjs`. The cases of `trip.test.mjs` that check no practice keep it, so the invariant keeps its tests.
14. **Fixed.** The case is removed from `tests/view/trip.test.mjs`, and the requirement stays held:
    - the jsdom case of `tests/view/maps-screen.test.mjs:601` ("„Wejdzie: …” is what a send takes from the chest, at an unsolved map and at a solved one alike…"), which mounts a solved map; I ran it at this head, and it passes;
    - the type `Chest` of `entersLine`, which typecheck holds;
    - the unsolved enter-line case kept in `trip.test.mjs`.
    The removal gives its reason in the source, D-189.
15. **Fixed.**
    - (a) `tests/sim/death.test.mjs:246-280` builds the used-up stock from three deaths the game settles, with preconditions on the count and the clock.
    - (b) `tests/sim/catch-up.test.mjs:500-506` asserts one use spent and the clock at minute 486 plus the renewal, after the stock refilled at 483.
    - (c) `tests/balance/campaign.test.mjs` has a new case. Its expectation comes from the game's own `catchUp` over the same 24 hours (completions; uses = ended runs − completions), with preconditions that both are above zero. The executor saw it fail with `completions: 0` in `campaign.mjs`. It passes.
16. **Remains; contested, and the reason holds.** The `spawnSync` case catches a campaign that never ends. In the gate's process, a regression would hang the whole run, which has no overall time limit (D-77). The integration recipe lists its files by name in `guidelines/testing.md`, so moving the case needs a guideline change through its skill, outside this change. Minor; blocks nothing.
17. **No change, by decision; agreed.** The settlement check counts the settlement's own spent uses, which follows remark 3 as written ("odrzuca … tylko zapis, w którym zużytych jest więcej niż nowa liczba"). This is the reading I gave in the whole review.

## The fix diff on its own

- **No behaviour change where none was meant.**
  - `balance/progression.mjs`: a comment and an import; the same constant, the same value.
  - `balance/check-map.mjs`: a rewrapped comment and a new exported constant, not used inside the file.
  - `balance/engine.mjs`, `src/browser/sim/loop.ts`: one dropped property of an object literal that `tripLoot` no longer reads.
  - `src/browser/sim/game.ts`: a rename and comments.
  - The skill copies are byte-identical (`cmp`), and their only changes are text.
  - The guideline change is a rewrap.
- No test changed an assertion except where its finding asked: findings 8 and 15, and finding 14's removal. No code passes a test by a special case.
- Foundation: only the D-240 *Rationale* and *Rejected* and the D-190 *Rejected* changed; no binding sentence, so no `decision:` line moves. The foundation check reports 0 errors.

## Declined to judge

- Whether `resurrection-renewal` should be split, and under which identifiers: a plan matter, as finding 10 says.
- Where the `spawnSync` case of finding 16 should live: a change of `guidelines/testing.md`, outside this fix.
- Whether to rename the settlement kind with a version raise: a later change (finding 2).

## Checks run

| Check | Result |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, 0 errors |
| `npm run typecheck` | exit 0 |
| `npm test -- <file>`, one at a time: `tests/sim/death` (33), `catch-up` (35), `completion` (27), `team` (24), `loop` (46), `saved-game` (44), `trip` (24); `tests/view/clock` (27), `end-window-game` (27), `end-window` (14), `team-lines` (19), `trip` (8), `world-area` (23), `maps-screen` (20); `tests/balance/campaign` (16), `check-map` (7), `progression` (13), `cli` (23), `engine` (7), `loop` (7); `tests/agent_workflow/test_loop2_balance_skill.py` (3) | each exit 0, 0 failed |
| `npx eslint` and `npx prettier --check` on the changed `.ts`/`.mjs` files | exit 0 both |
| `cmp` of the two skill copies | identical |
| `git grep resurrectionReady` / `resurrectionHasUse` | as in finding 2 |

Not run: the full gate, by the handoff; StrykerJS (the simulation change is a rename and comments; no rule changed).

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md`, the rule on *Rejected* for a row's sources: to judge the new ways of D-190.
- `tests/view/maps-screen.test.mjs:601` and `tests/view/end-window-lines.test.mjs:200-215`: for finding 14 and the executor's note.

## Working copies

`.runs/review-whole-fix/` held the logs of the typecheck and the test runs; removed by its full path. No worktree was made. `git status` of the reviewed worktree is clean.

## Unread material

- `reports/review-s810-report.md`, `review-s01-report.md` and the other reports the fix report names: not read (the findings file carries the findings' words).
- The fix report's kept files `reports/whole-fix-check-results.txt` and `whole-fix-foundation-check.txt`: not read; I ran the checks myself.
- `tests/view/end-window-lines.test.mjs`: read around line 209 only.

## Searches not found or unclear

none
