PASS b64354ed460636df6662e2573ad613ff9ddde496

# Review of the second merge of the target branch (b64354ed, parents 4bfdbe9b and 3b7e4930)

Range: `git diff 4bfdbe9b HEAD` (23 files, 636 added, 76 removed), `git log 4bfdbe9b..HEAD` (12 commits of main plus the merge). `git rev-parse HEAD` = b64354ed460636df6662e2573ad613ff9ddde496. The pin of the-way is unchanged: gitlink and checkout both 52f8164a354ee1a704af0d58add2f3be8e4f0247.

## Findings

Critical: none. Important: none (blocking: 0).

Minor inside the task: none.

Minor outside the task: none.

## What I checked, by the handoff's four points

1. Renumbering. `foundations/decisions.md` now holds, in order, D-362 (main, disk paths), D-363 (main, price of an action), D-364 (mage bends), D-365 (icon flies), D-366 (dust), D-367 (which readings show an effect); each id once. Inside the task's four decisions every reference is on the new number: the D-367 text "D-365 or D-366" and its Relations "derives from D-365 · derives from D-366" (the only cross references between them). `guidelines/styleguide-browser-view.md` lines 600, 629, 635, 638, 644 carry D-364, D-364, D-365, D-366, D-367 in the right places (the lines 635 and 638 pair D-365 with D-43 and D-366 with D-271 as before). The comment in `tests/view/scene.test.mjs:1190` reads "D-365, D-366", matching its flight and dust tests. `git grep -E "D-36[0-9]"` over the whole tracked tree (the-way excluded) shows no other reference: main's D-363 stays in `src/browser/view/program-editor.ts:808` and `tests/view/rule-editor.test.mjs:1447` (both about the price, correct), and `foundations/invariants.md:1285` names D-362 (main's, correct). A search for the bare numbers 363 to 367 found nothing else that is a decision id. No old number left, no mix-up.
2. `tests/view/icons.test.mjs`, read whole from line 120 on (lines 1 to 119 are untouched by the merge). `NAMED` = resources, CAMPFIRE, CAMPFIRE.extinguished, ACTION_ICONS; the footer and the section have `NAMED.length + 1` lines (the pack's last line `PACK_LINE`); `changesOf(named.icon)` is used in the footer line test, the section line test and the credit test; index 4 is the campfire, index 5 the extinguished campfire, the actions are `items.slice(6, NAMED.length)` (excludes the pack's line), the pack tests read `items[items.length - 1]`, the link test slices `0..NAMED.length`. Counts and indices agree with the data (4 resources, CAMPFIRE, extinguished, 11 action icon entries; the order in `footer.ts` WITH_ICONS is resources, CAMPFIRE, CAMPFIRE.extinguished, actions, then PACK_CREDITS). `credits.ts` as merged holds main's `COLOUR_CHANGED` and `wood-pile` credit and this task's `PackCredit`, `PACK_CREDITS` (unchanged from 4bfdbe9b); `footer.ts` holds both the extinguished entry and the pack lines; `credits-section.tsx` is unchanged by the merge and keys by `credit.name` ("ognisko", "ognisko wygasłe", "Kurz" are distinct).
3. Entries. `git diff 3b7e4930 HEAD` of `foundations/` shows only this task's own entries and edits (D-271, D-322 text edits, the four decisions, the part-map line, the fact `smoke-fire-particle-licence`, the invariant `sprite-credits`) with no line of main's removed. `git diff 4bfdbe9b HEAD` of the same files shows only main's changes: D-70, D-363, the fact `game-icons-wood-pile-title`, the `Rests on` of `icon-credits`, and the renumbering. `sprite-credits` (invariants.md:1289 to 1297) and `smoke-fire-particle-licence` (environment_facts.md:774) are whole and identical to the reviewed text. I read main's D-363 whole and D-70's changed text: they concern the rule panel's price and the map drawing's campfire icons, not the scene's effects of a gathering, so nothing contradicts D-364 to D-367 or D-271. `tests/invariants/test_icon_credits.py` (main added `wood-pile.svg` to AUTHORS and TITLES, and the fact to a comment) is consistent with the `Rests on` list and with `credits.ts`; the credit's "zmienione" matches `CHANGE_WORDS`.
4. Collisions. Main touched none of `src/browser/sim/data/scene.ts`, `src/browser/view/scene*.ts*`, `src/browser/styles.css` (confirmed from the diff's file list). Main's `run.ts` change only replaces an inline expression by `campfireLightCount(character.skills)` (same value); `program.ts` adds `actionPrice` and `campfireLightCount`, and `worldRefusal` for lighting holds the same condition by the new helper. `USES_BACKPACK` in `src/browser/view/scene-picture.ts:224` (craftCampfire, lightCampfire, lightItem, feedCampfire, eat) still equals the cases of `landUse` in `run.ts` that take pieces; main adds no action kind. `sceneEffect` reads only the events, the backpack, `PROPS`, `RESOURCES[...].icon`: the added `plural` field in `resources.ts` does not change them. `terrain-picture.ts` (main) draws the map's campfire icon; the scene's fire (`fireOf`, `scene.ts` sheet) is separate.
5. Trust boundary: the merge changes no file under `assets/sprites/**` (`git diff 4bfdbe9b HEAD --name-only -- assets` lists only `assets/icons/wood-pile.svg`); that file was added by main's commit 6bf97a43, not by this task.

## Declined to judge

- The correctness of main's own change (price of an action, rule panel code, extinguished-campfire icon, their tests): reviewed in main's own cycle; I read only where it meets this task.
- Whether main's D-363 should also be listed in `guidelines/styleguide-browser-view.md` for the rule panel: main's side, outside this task and not changed by the merge.

## Checks run

- `python -B .the-way/elements/common/foundation_check.py` from the worktree root: exit 0, "0 errors".
- `git diff --check 4bfdbe9b HEAD`: exit 0, no output.
- `git rev-parse HEAD` b64354ed...; `git -C .the-way rev-parse HEAD` 52f8164a... equals `git ls-files --stage -- .the-way`: exit 0.
- `git grep -n -E "D-36[0-9]"` and `git grep -n -E "\b36[3-7]\b"` over tracked files (the-way, package-lock and assets excluded): exit 0, results as above.
- `git status --short`: clean (I changed no tracked file, made no commit).

Not run (unverified by me, the orchestrator runs them): `npm test`, `npm run build`, the node tests of `tests/view/icons.test.mjs` (they read `dist/`), and `tests/invariants/test_icon_credits.py` (it builds in a temporary copy). The consistency of icons.test.mjs was checked by reading counts, indices and data, not by running.

## Reaches beyond the handoff

- `src/browser/view/scene-picture.ts:205-330` (USES_BACKPACK, `sceneEffect`) and `src/browser/sim/run.ts` landUse cases, to confirm point 4.
- `src/browser/sim/data/campfire.ts` (the `extinguished` entry, its name "ognisko wygasłe") for the footer's expected line.
- `tests/invariants/test_icon_credits.py` head and `CHANGE_WORDS` (line 75), to confirm the wood-pile credit's wording passes.
- `task.frozen.md` lines 35 to 43 and 168 to 173 (by grep), for what the task requires of D-271, `smoke-fire-particle-licence`, `sprite-credits`.

## Unread material

The review is of a merge, not of the whole change, so no decisions were selected: all counts not applicable. Read whole: the handoff, `.the-way/task-cycle/review/SKILL.md`, D-364 to D-367, D-363, the changed part of D-70, `tests/view/icons.test.mjs` lines 120 to 415, `footer.ts`, `credits-section.tsx`, `credits.ts` lines 1 to 64 and the merge's diff of the file, `sprite-credits`. Read only by diff or excerpt: `src/browser/sim/program.ts`, `src/browser/sim/run.ts`, `terrain-picture.ts`, `resources.ts`, `actions.ts` (the merge's diff only), main's tests `program-editor.test.mjs`, `rule-editor.test.mjs`, `world-area.test.mjs`, `terrain-picture.test.mjs`, `campfire.test.mjs`, `data.test.mjs` (not opened beyond a grep of the diff for scene-related lines), `task.frozen.md` (by grep), `tests/invariants/test_icon_credits.py` (diff and the head). `.the-way/task-cycle/review/whole_change.md` and `fix.md` not read, as this is neither.

## Searches not found or unclear

- None unclear. Not found, as expected: any reference to an old decision number of this task (D-363 to D-366 in the old meaning) in tracked files outside the four renumbered places.
