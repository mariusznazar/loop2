PASS 85a623e466cbad62cffd864638b7500611c803dc

# Review of the return step's commits — task rana-i-opatrunek

Range `55c7d624dfde1e919febe5a1953e0c6dd78f66ad..85a623e466cbad62cffd864638b7500611c803dc`; `git rev-parse HEAD` in the worktree shows `85a623e4…`, the head given. One commit, `85a623e4`, touching `foundations/decisions.md` only (58 insertions, 66 deletions). Reviewed as section 2 of `review-change` gives for the return step's commits: against the task and the foundation entries the step writes or corrects.

## Findings

### Critical

none

### Important

none

### Minor

**m-1 — D-144 *Verification*, `foundations/decisions.md:7028-7031`.** The clause `tests:` reads „„Ucisk — Opatrunek” in a combat turn using up the bandage of the first pocket that holds one, and with none in a pocket taking one from the backpack through the first empty pocket in the same turn, an item that fits no pocket taken into none and refused, giving back …”. The words „an item that fits no pocket taken into none and refused” stand in a list whose subject is „Ucisk — Opatrunek”, but the bandage fits a pocket (D-456). The test that holds this part, `tests/sim/pressure.test.mjs:316`, lays a second healing item, „szyna”, with no place. A reader who goes by the clause might think the test covers the bandage, or might ask whether the bandage fits a pocket. The clause is no binding sentence, the script does not read it, and the test it names exists and holds the behaviour, so a reader cannot act wrongly on it. Possible wording: „„Ucisk” with another healing item that fits no pocket taking none into a pocket and refused”.

**m-2 — D-363 *Verification*, `foundations/decisions.md:10345`.** „… and no price in the row of the rule; the same for „Ucisk” with an item as the target, its price one piece of the target, …”. Directly after „no price in the row of the rule”, the words „the same for „Ucisk”” could be read as covering the row too. The next sentence then says that no test holds the row of a rule with „Ucisk”, which is true: `tests/view/rule-editor.test.mjs` and `tests/view/program-editor.test.mjs` name „Ucisk” only in the cells of the pick (`program-editor.test.mjs:1101`, `rule-editor.test.mjs:1740`). The list that follows „the same for” names exactly what is held, and the pair says what is not, so the meaning can be worked out. Only the order of the words is loose.

No blocking finding, so no mark of contradiction is needed.

## What was checked, entry by entry

Every hunk of the diff lies inside a *Verification* field, apart from the one in D-416's *Rejected*. No binding sentence changed. This was checked with the word diff of the range. The full foundation check also passes, and it compares each line `decision:` with the binding sentences.

- **D-144.** The pair for „Ucisk” was removed. Each part of it is held by a test: `pressure.test.mjs:278` (first pocket holding the item, else the first empty pocket from the backpack, never the backpack while a pocket holds one) and `pressure.test.mjs:356` (bandage of the second pocket used, refill through the first empty pocket in the same turn, `refill: true`, backpack 2 → 1). `pressure.test.mjs:399` holds 25 + 2 × 5 and the cap at 100, `pressure.test.mjs:426` the pass-over at full health, and `pressure.test.mjs:150` and `:511` that the action is open to the buyer alone. „Opatrz” stays out of combat by `craft-and-tend.test.mjs:468`. The older pair (creature's dodge, end of an encounter) stays as it stood. Wording: m-1.
- **D-145.** The pair was removed. `craft-and-tend.test.mjs:335` holds 45.05 / 50.05 / 55.05 / 60.05 for 0–3 ranks, and `:353` holds the cap at 100 with 3 ranks. Correct.
- **D-150.** The pair was removed. `pressure.test.mjs:172` holds the bandage and a laid healing item, both growing `tending`. `tending.test.mjs:105` holds `grownBy` with `{ action: "pressure" }` and no item, which matches „every target of healing”. `tending.test.mjs:120` holds the tree among the mage's predispositions. Correct.
- **D-387.** The pair was removed. `body.test.mjs:196` holds 99.05 / 99.1 / 99.15 for 0–2 ranks, `:210` the stop at 100, and `:219` a combat minute standing still with 2 ranks. Correct.
- **D-199.** The pair for „Ucisk” was removed. `character-skills.test.mjs:170` (lines 222–227) holds „Ucisk 0/1 — … · cena 3” and „Ucisk 1/1 — …”, with no before-and-after value. The pair for the heading, the keyboard and „Obchód” / „Czysty płomień” stays. Correct.
- **D-379.** „eight of the nine” became „the nine”. `skills.test.mjs:108` iterates all nine curves, `tending` at 10·28·60·110 included. The four branches with their prices are held by `tending.test.mjs:258` (costs 1·1·2, 1·1·2, 2·3, with the effects) and `pressure.test.mjs:150` (costs `[3]`, action effect, opened to the buyer alone). The effects are held by `tending.test.mjs:233` (−2 min of „Opatrz” for each rank, „Wytwórz” unchanged) and `tending.test.mjs:286`, `craft-and-tend.test.mjs:335`, `body.test.mjs:196` (+5 for each rank, +0.05 for each rank). The remaining pair covers only „Wprawne oko”, the other prices and the numbers standing in data. Correct.
- **D-363.** Three parts moved to `tests:`, held by `pressure-pick.test.mjs:80` (no price at the cell), `:92` („Opatrunek (1 opatrunek)”), `:103` („Ucisk — Opatrunek (1 opatrunek)”) and `pressure.test.mjs:180` (one piece of the target). The pair stays only for the row of a rule, which no test holds; I checked this with a search for `pressure` / „Ucisk” across `tests/view`. Correct. Wording: m-2.
- **D-443.** `pressure.test.mjs:126` holds the targets following the healing property and a laid „szyna” becoming one. `:134` holds the check refusing `stick`, `moss`, no item and `nothing`. Correct.
- **D-195.** All four tests of `tree-entry.test.mjs` hold the clause: verb held + item new enters, item new without the verb does not, verb new without the item (held or new) does not, both held and neither new does not. Correct.
- **D-193.** `tending.test.mjs:127` holds one practice for a crafting and one for a tending of the bandage. `:147` holds none for a crafting of a laid item. `pressure.test.mjs:356` holds `tending: 2` for two turns of „Ucisk”. Correct.
- **D-380.** `pressure.test.mjs:208` holds „zdrowie pełne” at the health of the turn before „brakuje 1 × opatrunek”, a pocket or the backpack being enough, and the next rule winning when the rule is refused. Correct.
- **D-340.** `gear-words.test.mjs` (the test above line 184) holds „Bierze opatrunek z plecaka do kieszeni” with `refill: true` and no entry with `refill: false`. The words match `GEAR_PLACES.pocket.refill` in `src/browser/sim/data/gear.ts:29`, as `55c7d624` left them. Correct.
- **D-147.** `combat-line.test.mjs:52` holds 71.1 → „zdrowie 71/100” with no creature's health. `:84` holds 59.95 → 59 and 100 → 100, cut down and never rounded up. This is the function `whole` of `src/browser/view/body-row.ts:30`, which the body row uses. Correct.
- **D-120.** The word diff shows no word changed, only a re-wrap.
- **D-416.** *Rejected* now reads „about 27 rows at nine trees and eighteen branches”. `src/browser/sim/data/skills.ts` holds 9 skills (lines 34–75) and 18 branches (lines 117–259), and 9 + 18 = 27. This matches D-199's *Rationale*. Correct.
- **Stale wording.** No „which no test holds yet” remains in the entries the change wrote, except D-363's pair, which is right. The other hits at lines 12616, 12666, 12756 and 12838 are entries this task did not write.

## The choices of the handoff's item 5, against the report's reasons

1. **Pocket refill words.** Question 3 applies: it is a single text in data, held by `gear-words.test.mjs` and `combat-line.test.mjs:113`. D-340 / D-457 give the pattern. Sound.
2. **„Uciska ranę” and the health cut down.** Question 3 applies: the text is in `ACTIONS.pressure.status` and the format in the one function `whole`, both held by tests. The cut-down is the body row's existing rule. D-147's *Verification* now names it. Sound.
3. **Units of the previews and the decimal comma.** The task's own *To do* 4 sends the comma to the styleguide sentence, and the units are data (`preview.unit`, held by `tending.test.mjs:258`). Sound.
4. **Strike from the main hand alone; data shape of the effect.** D-456's binding sentence „„Uderz — patyk” takes its stick from the main hand and from no other slot.” answers this already, and `pressure.test.mjs:278` holds it (question 5). The shape of the effect falls under question 3. Sound.
5. **Refill only into an empty pocket the item fits.** D-456 („An item whose data name no place fits no slot.”) and D-457 already say this, and `pressure.test.mjs:316` holds it. Sound.
6. **Stricter reader of a saved fight.** `guidelines/coding-saved-game.md:85-86` says „Wolno odmówić więcej, niewolno mniej”. D-386 binds the load to admit what the game makes, and the game never makes such a record. The version rule is D-206 / `save-version`. Sound.
7. **`actionInRepertoire` judging an item action by kind.** Question 4 applies: it is a lack, and no entry stands on it. Sound as far as the return step goes. See Declined to judge.

The *Settlements to record* rows 1–10 were not changed by this range, so they are outside this review. The step's table of them was read as claims and not checked again.

## Declined to judge

- The gap between D-120's wording (open by the pair of verb and target) and `repertoireOf` / `actionInRepertoire` in `src/browser/sim/understanding.ts` (open by kind). It is the whole-change review's m-1, kept by the orchestrator, in code this range does not touch. The result is the same while the bandage is the only target of `craft`, `tend` and `pressure`. Out of scope.
- The return step's questions 2 and 3 to the orchestrator (the guideline on the version raise, and the decimal comma by analogy). These concern a guideline and the styleguide that this range does not touch. Out of scope.

## Checks

- `git rev-parse HEAD` in the reviewed worktree: `85a623e466cbad62cffd864638b7500611c803dc`, the head given.
- `git log --oneline 55c7d624..HEAD` and `git diff --stat 55c7d624..HEAD`: one commit, one file. `git diff --word-diff=plain 55c7d624..HEAD -- foundations/decisions.md` was read whole.
- sha256 of `task_frozen.md` starts `55c86eaf63df7156`, as the handoff gives.
- `python -B .the-way/elements/common/foundation_check.py` (no switch, test citations included), run in a worktree of the head with `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f` (the commit the gitlink records) and `node_modules` a junction to `the `node_modules` of the main checkout`: exit 0, `0 errors`.
- Manual: each `tests:` clause the range wrote was compared with the assertions of the tests named above, by reading those tests.
- Not run: the whole suite (the handoff says not to; the range changes no code and no test). `check_instructions.py` was not run, because the range touches no instruction file.

## Reaches beyond the dispatch

- `tests/sim/skills.test.mjs:108-140`, to see what holds „the thresholds of the nine character skills” in D-379.
- `tests/view/gear-words.test.mjs:160-200`, to see what holds D-340's new clause.
- `tests/view/combat-line.test.mjs:50-139`, `tests/sim/body.test.mjs:170-238`, `tests/sim/craft-and-tend.test.mjs:280-400` and `tests/sim/tree-entry.test.mjs` whole, to check the clauses of D-147, D-387, D-145 and D-195.
- `src/browser/sim/data/skills.ts`, the keys of `SKILLS` and `BRANCHES`, for the D-416 count.
- `src/browser/view/body-row.ts:20-57` and `src/browser/view/combat-line.ts:85`, for the cut-down of health.
- `foundations/decisions.md`: D-386, D-456 and D-457 (binding sentences only), plus a search for „cut down” / „whole number”, to judge the item-5 choices 2, 4, 5 and 6.
- `guidelines/coding-saved-game.md:84-86`, for the sentence the report quotes.
- A search for „no test holds yet” across `foundations/decisions.md`.

## Working copies

- `.runs/review-return/`: it held the word diff of the range (`diff.txt`), the output of the foundation check (`fc.txt`) and the detached worktree `wt/` of `85a623e4`, with `.the-way` populated by `git submodule update --init` and a `node_modules` junction. The junction was removed first with `rmdir`, and the target `the `node_modules` of the main checkout` was confirmed intact. Then `git worktree remove --force`, `git worktree prune` and removal of the directory. Nothing remains. No probe shows a finding, so nothing was kept in `reports/`.

## Unread material

- `foundations/decisions.md` (1.5 MB) was not read whole. Read whole: D-144, D-145, D-146, D-147, D-148, D-150 (lines 7009–7150) and D-363 (lines 10336–10347). Read in the hunks of the diff and their context only: D-387, D-193, D-195, D-199, D-379, D-120, D-380, D-443, D-340 and D-416. D-386, D-456 and D-457 were read in their first binding paragraph only.
- `tests/sim/pressure.test.mjs` was read for lines 1–520, not 521–632 (the saved-game tests at 554 and 585 were read by their titles and `decision:` lines only). `tests/view/character-skills.test.mjs`, `tests/view/pressure-pick.test.mjs` and `tests/sim/tending.test.mjs` 1–99 were read by their titles and `decision:` lines and the lines cited above.
- The return step's handoff, its report, the frozen task, `return_step.md`, the decisions template and `rules.md` were read whole.

## Searches not found or unclear

none
