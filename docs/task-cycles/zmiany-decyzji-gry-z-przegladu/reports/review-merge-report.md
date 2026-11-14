PASS c9365b7e0e7755f68b5a32646aef98a081dbe84f

# Review of the reconciliation with the target branch

Range `fd1a7e89..c9365b7e` (merge `23634ee9` of `origin/main` = `e54f23c0`, then the renumbering `c9365b7e`). `git rev-parse HEAD` = `c9365b7e0e7755f68b5a32646aef98a081dbe84f`, as given. The worktree was clean before and after my checks. The pin of the-way is unchanged: `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` both give `55afa8e57aa1b83c77108576a36642722e0dda15`.

## Findings

Critical: none. Important: none. Minor: none. Out of scope: none.

## What I verified

1. Conflict resolution in `foundations/decisions.md`.
   - The tail of the merged file from `### D-393` up to `### D-396` is line for line the tail of `origin/main:foundations/decisions.md` from `### D-393` to its end (D-393, D-394, D-395). The only difference is the one blank line that separates D-395 from our decision. The target's file ends with a newline; so does the merged file.
   - Every decision heading D-390 to D-396 appears once, in order (`grep -n "^### D-39"`: lines 9609, 9624, 9639, 9654, 9667, 9682, 9697).
   - Nothing of ours is lost and nothing of the target's is changed. I compared our patch against the base (`git diff -U0 5159e8c4 fd1a7e89 -- foundations/decisions.md`, 92 lines without hunk headers) with the patch of the merged head against the target (`git diff -U0 origin/main c9365b7e -- foundations/decisions.md`, 92 lines). They differ only in the blob index line and in two lines: the D-311 clause and the new heading, D-393 in ours and D-396 in the merged head. So merged = target + ours, and the renumbering is the only change after the merge.
   - The target's hunks in the file are D-06 (lines 190 and 204), D-264 (5930 to 5970) and the appended D-393 to D-395. None of them overlaps a hunk of ours (my hunks are the earning-loop words, D-346, D-383, D-120, D-136, D-179, D-186, D-311, D-367, D-369 and the new decision), which is why the three-way merge conflicted only at the end of the file.

2. Renumbering. `git grep -n "D-39[3456]"` over the tree except `.runs` finds:
   - `foundations/decisions.md:205`, D-06 *Rationale*, "the configuration of its own that D-393 gives, which emits nothing": the target's D-393 (type check of the simulation). Right.
   - `foundations/decisions.md:7464`, D-311 *Accepted with it*, "below the smallest window of D-396": ours, new number. Right.
   - `foundations/decisions.md:9654`, heading of the target's D-393; `:9667` D-394; `:9682` D-395; `:9697` our D-396.
   - `foundations/invariants.md:222` (`simulation-isolation`, *Derives from* D-04 · D-393) and `:1334` (`simulation-type-check`, *Derives from* D-393): the target's D-393. Right.
   - `src/browser/view/controls/react-number-field.tsx:8`: "(D-395)", the target's D-395, as the target wrote it.
   - No mention of D-393 to D-396 in `guidelines/`, `AGENTS.md`, `CLAUDE.md`, `.claude/`, `src/browser/AGENTS.md`, `src/browser/sim/saved-game.ts` or `guidelines/coding-saved-game.md`. No mention of our decision under its old number is left in the tree. The records of the cycle under `.runs/` still say D-393 for our decision; the handoff leaves them untouched, and they are not part of the tree.

3. Entries the merge brought in, against ours (D-396, D-311, D-282, D-280, D-389, D-120, D-186, D-179, D-180, D-367, D-346, D-383, D-369, the guideline sentence in `guidelines/coding-saved-game.md`, the comment of `saved-game.ts`).
   - D-393 and `simulation-type-check`: they concern the type check of `src/browser/sim/` under `tsconfig.sim.json` (library ES2022, no ambient types, `noEmit`). Our only change in the simulation is a comment above `SAVED_GAME_VERSION`. `npx tsc -p tsconfig.sim.json` exits 0 on the merged tree; `tests/invariants/test_simulation_type_check.py` passes (4 passed). Our entries make no claim about the check.
   - D-394 (`actionFeasible` is kept) and D-395 (a shared control imports no screen module): none of our entries names `actionFeasible` or a shared control. In the merged tree `actionFeasible` is `actionFeasible(run, action)`, the `map` argument dropped by the target; no entry of ours names its parameters.
   - D-264 (the harness carries `press` and `fire`) and D-06 (the third configuration): neither is about the look in a narrower window or about saved games; D-396's text does not describe the build. No contact.
   - D-396 against the target's changes: its *Scope* (`browser-view`, `agent-workflow`), *Relations* none, and its claim that D-280 gives a 1000 px wide Siedziba (D-280, `decisions.md:6553`) stand; the target touched neither D-280, D-282, D-311 nor D-389, nor `styles.css` beyond removing the `.rule-panel-host` rule, which no entry of ours names.
   - Claims of the earlier review, checked against the merged code where the target touched the place. The target changed `src/browser/sim/{program,run,combat,game}.ts` only by dropping the unused `map` parameter from the helpers (`conditionHolds`, `actionRefusal`, `actionFeasible`, `judgeProgram`, `chooseActivity`, `chooseCombatRule`, `resolveCombat`, `startActivity`, `pickActivity`); `src/browser/view/trip-plan.tsx` by removing the host element `createTripPlan`, `trip-editor.ts` by adding `readTripCount`; `rule-list.tsx` and `rule-panel.tsx` likewise by removing their hosts; `right-area.tsx` is renamed `tabs-area.tsx`. None changes what D-120 (the data of "Wytwórz — ognisko"), D-186 and D-179 (the line "Wyniesie" and the snapshot, from the trip plan in the program panel), D-180, D-367 (the effect of a gathering in the scene), D-311 (the area with the tabs, `styles.css` media query at 1074 px), D-346 and D-383 (the pick of the tab and the filter lives in the chronicle memory, not in the page) or D-369 (the kinds of minutes) say. `git grep -n -i "right-area\|RightArea\|createTripPlan\|createRulePanel\|rule-panel-host\|trip-plan-host"` over the tree except `.runs` finds nothing, so no entry or guideline of either side names a removed or renamed thing.
   - The earning-loop rename against the target's new text: the added lines of the target's change to `foundations`, `guidelines`, `AGENTS.md` and `.claude` hold no bare word "loop" or "loops" (grep exit 1). `foundations/glossary.md` is untouched by the target; our entries `earning loop` (line 217) and `loop` (line 223) stand.
   - `foundations/part_map.md` as merged: the target adds `tsconfig.sim.json` and `tests/invariants/test_simulation_type_check.py` to `build-tools` and the phrase on the type check to its description; our change names no part's files and keeps the parts `product-foundation`, `simulation`, `agent-workflow` as they were. `foundations/invariants.md` as merged: the target's changes (`simulation-isolation` *Derives from*, the new `simulation-type-check`) and ours (`streak-program-change`, `loop-practice-payment`) lie in different entries.
   - The guidelines the target changed (`testing.md` two sentences, `coding-browser-module.md`, `styleguide-browser-view.md`: the rename) are not touched by us; `guidelines/coding-saved-game.md` is not touched by the target.

4. Trust boundary. `git diff 5159e8c4..c9365b7e -- src/browser/sim/saved-game.ts` is the comment above `SAVED_GAME_VERSION` alone (4 lines: 3 added, 1 removed, comment lines only; no code, value or name). `git diff 5159e8c4 e54f23c0 --stat -- src/browser/sim/saved-game.ts guidelines/coding-saved-game.md` is empty: the target did not touch either file. The comment compiles under the target's new configuration (tsc exit 0).

5. The author's claims in `reports/merge-report.md`: one conflict at the end of `decisions.md`, resolved with the target's three decisions kept and ours placed after, the renumbering as +2/-2 in one file, the checks. All hold as measured above. One observation, not a finding: the merge commit `23634ee9` holds our decision under the old D-393, so the foundation check on that commit alone would show a doubled number, as the author says; the head has none, and the pull request lands as the whole branch.

## Declined to judge

- The intermediate state of the merge commit `23634ee9` (doubled D-393, repaired by the next commit): history only; the final tree is correct.
- The target's own change in tests, `scripts/build.mjs` and the code it moved: the other task's work, already merged to the target after its own review; I looked only where our entries or our file touch it.
- The earlier review's questions on our change itself (wording of D-120, D-186 and the rest): reviewed at `dd0e6cb6` and unchanged by the merge (the patch comparison above shows our text is the same).

## Checks run

| Command | Exit code / result |
|---|---|
| `git rev-parse HEAD` | `c9365b7e0e7755f68b5a32646aef98a081dbe84f` |
| `git diff -U0 5159e8c4 fd1a7e89 -- foundations/decisions.md` against `git diff -U0 origin/main c9365b7e -- foundations/decisions.md` (hunk headers dropped, `diff`) | 3 differences: the blob index line, the D-311 clause (D-393 to D-396), the new heading (D-393 to D-396) |
| `diff` of the tail from `### D-393` of `origin/main:foundations/decisions.md` against the same of the head | identical except the one blank line before D-396 |
| `git grep -n "D-39[3456]"` outside `.runs` | judged above |
| `git diff --check fd1a7e89..HEAD` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| `npx tsc -p tsconfig.sim.json` | 0 |
| `python -B -m pytest tests/invariants/test_simulation_type_check.py -q` | 0 (4 passed) |

Not run: `npm test` (the cycle's, not mine). Not run: the target's tests and a build.

## Reaches beyond the dispatch

- `foundations/decisions.md` D-280 (lines around 6553), by search for "1000 px": to check the claim of D-396 about D-280 against the merged file; the claim stands.
- The target's diff of `src/browser/sim/*`, `src/browser/view/trip-plan.tsx`, `trip-editor.ts`, `run-screen.tsx`, `styles.css` and `scripts/build.mjs` (`git diff 5159e8c4 e54f23c0`): to check the claims of our entries against the code the target changed.

## Unread material

- Whole D-06 and D-264: read in the target's diff (the changed lines with their context), not whole; D-393, D-394, D-395 and our D-396 whole.
- `guidelines/testing.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`: read in the target's diff, not whole; `guidelines/coding-saved-game.md`: not read (the target did not touch it, our sentence was reviewed before; only checked that D-393 to D-396 are not named in it).
- The target's invariants and part-map entries: read in the target's diff, not whole.
- The target's tests (about 50 files) and the diffs of `rule-list.tsx`, `rule-panel.tsx`, `controls/react-number-field.tsx` and `tabs-area.tsx`: not read; only the list of files and the greps above.
- Counts of the whole-change review do not apply to this stage.

## Searches not found or unclear

none
