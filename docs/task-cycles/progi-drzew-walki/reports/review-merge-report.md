PASS 7a279745b34ad0e524d8afff5479444a1cdcf219

# Review of the reconciliation with the target branch (task `progi-drzew-walki`)

Range: `52772de3e7a3d605703d73916839c9268b854124` .. `7a279745` (second parent `fc00c406`, `origin/main`). `git rev-parse HEAD` in the worktree is `7a279745b34ad0e524d8afff5479444a1cdcf219`; `git status --short` is clean. The merge base of the two sides is `1b0c8ad4`.

## Findings

Blocking: 0. Minor: 0. Out of scope: 0.

None. The two sides hold together.

## What was checked and what it showed

1. The merge is a pure union of the two sides.
   - Files touched by the task (`1b0c8ad4..52772de3`): `foundations/decisions.md`, `src/browser/sim/data/skills.ts`, `tests/sim/skills.test.mjs`, `tests/view/character-skills.test.mjs`. Files touched by main (`1b0c8ad4..fc00c406`): 21 files. Only `foundations/decisions.md` is in both sets.
   - `git diff fc00c406 7a279745 --stat` (what the merge adds to main) lists exactly the task's 4 files. The added and removed lines of `git diff 1b0c8ad4 52772de3 -- foundations/decisions.md` and `git diff fc00c406 7a279745 -- foundations/decisions.md` are identical (compared line by line).
   - `git diff 52772de3 7a279745` (what the merge adds to the task branch) lists the same 21 files as main's own diff, and its changed lines are identical to the changed lines of `git diff 1b0c8ad4 fc00c406` (compared line by line). No line was added, lost or altered by the merge itself, so it holds no hand edit hiding in a "clean" merge.
2. In `foundations/decisions.md` the two sides touch different decisions. The task's: D-379 (thresholds, ranks, prices, rationale, rejected, the "complies" example) and D-144 (rationale). Main's: D-39, D-44, D-189, D-207, D-241, D-245, D-246. No decision is touched by both.
3. Numeric claims in the merged foundation about combat. Searched `foundations/` and `guidelines/` for the combat skill and branch names, old thresholds (`30, 90, 200`, `[20]`, `[10, 30]`), old damage (`12 damage`) and rank counts. Only D-144 (line 3007) and D-379 (lines 9355, 9361, 9366) mention them, and both state the new numbers consistently with `src/browser/sim/data/skills.ts`: Walka bronią jednoręczną 15, 40, 100, 300; Kopanie 10, 30; Unik przed ciosem 4, 15; Mocniejszy cios prices 1 · 1 · 1 · 1 (4 ranks, 14 damage at rank 4); Cięższy kop prices 1 · 1 (2 ranks). D-144's base numbers (6 stick, 3 kick, 5 dodge, wolf 24 health and 7 strike) are unchanged in data (`preview.base`). D-189, D-241, D-245, D-246, D-207, D-39, D-44 and the invariant `loop-practice-payment` state no threshold, price, rank count or amount of practice of a combat skill; their only numbers are the 960-fold measurement of the old game (D-189), the eight hours of resurrection and the 16× pace, none of which the new thresholds change. The invariant's `Derives from` (D-189 · D-241 · D-245 · D-246) and `Part: simulation` agree with the decisions' `Verification` lines that name it.
4. Tests of the other side against the new thresholds. The new and changed tests of main (`tests/sim/loop.test.mjs`, `catch-up`, `saved-game`, `tests/view/away-report`, `headquarters-screen`, `account-screen`, `react-controls`) take practice only in `eating`, `exploration` and `smallItemGathering`, whose thresholds the task did not change. No line they add names a combat skill, branch, level or point. The only combat practice in the other side's tests is the existing fixture `ALA_SKILLS.oneHandedCombat = {practice: 31, ranks: {}}` in `tests/sim/saved-game.test.mjs:198`: it gave one point under the old threshold 30 and gives one point under the new 15 (the second threshold, 40, is not reached), with no rank bought, so a saved-game round-trip does not depend on the change. `SAVED_GAME_VERSION` is 5 (main's bump, from the removal of `practice` from the report line); the task changes no shape of the saved state, only data constants, so the two do not collide.
5. The task's tests against main's code. `tests/sim/skills.test.mjs` and `tests/view/character-skills.test.mjs` use the data and the skills functions, which main did not touch (main's `src/browser/sim` changes are `loop.ts`, `saved-game.ts`, `types.ts`; the view changes are in the report, the headquarters and the button). The screen "Postać" is not touched by main.
6. Foundation check passes on the merged tree and `.the-way` is at the recorded commit (`55afa8e5`, equal to the gitlink).

## Declined to judge

- The balance of the new combat thresholds themselves and the whole-change review of the task's code: already reviewed `PASS`; not part of what the merge brought together.
- The product's full gate and the build: run by the orchestrator at the same time.

## Checks run (command, exit code)

- `git rev-parse HEAD`, `git status --short`, `git log`, `git diff`, `git diff --stat`, `git diff --name-only`, `git merge-base`, `git grep`: all 0; results above.
- Line-by-line comparison (`diff` of the changed lines) of the task's patch of `foundations/decisions.md` with the merge's patch of the same file against main: exit 0 (identical). Of main's whole patch with the merge's patch against the task branch: exit 0 (identical). The file sets of the two: exit 0 (same 21 files).
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors".
- Focused tests read-only against the existing `dist/` (which holds the merged tree: `takeLoopPractice` present in `dist/browser/sim/loop.js`, `SAVED_GAME_VERSION = 5`, the task's thresholds in `dist/browser/sim/data/skills.js`), each `node --test <file>`: `tests/sim/skills.test.mjs` exit 0 (19 tests pass), `tests/view/character-skills.test.mjs` exit 0, `tests/sim/loop.test.mjs` exit 0 (44 pass), `tests/sim/saved-game.test.mjs` exit 0, `tests/view/away-report.test.mjs` exit 0, `tests/view/headquarters-screen.test.mjs` exit 0, `tests/sim/catch-up.test.mjs` exit 0. No build was run and nothing was written to `dist/`; these runs read a `dist/` another process (the gate) may be rebuilding, so they confirm the state at the time of the run only.
- Not run: `npm test`, `npm run build`, typecheck (left to the orchestrator's gate, as the handoff says); the remaining test files.

## Reaches beyond the dispatch

- `foundations/decisions.md` D-18 and D-191 were looked up by title only (D-379 relates to them) and not read whole; `foundations/decisions.md` D-190 was read whole (it speaks of what death takes, bearing on D-189's text). Why: to see whether any claim about points and ranks outside D-379 and D-144 depends on the thresholds.
- `git grep` over the whole tracked tree (excluding `.runs`) for the combat names and the old numbers, to find any file outside the named ones that states them. Found none beyond those listed.

## Unread material

- The review variant is the reconciliation, so no selection of foundation or guidelines was made by me; the handoff named entries by identifier. Read whole: D-144, D-379, D-189 (and D-190). Read by diff only (the changed lines of the merge range, full wording of the changed sentences, not the whole entry): D-39, D-44, D-207, D-241, D-245, D-246 and the invariant `loop-practice-payment` (its whole text is in the diff; it is a new entry). The unchanged parts of D-39, D-44, D-207, D-241, D-245 and D-246 were not read whole; I searched them by text for combat names and numbers (item 3) and found none relevant.
- The guideline files (`guidelines/coding.md`, `testing.md`, `styleguide-browser-view.md` and the others) were not read: the handoff names none, and the merge's judgement here is about the consistency of numbers and entries, not about code style of either side's code (each side was reviewed with its own guidelines). Main's changes to `guidelines/coding-browser-module.md` and `styleguide-browser-view.md` were not read beyond the file list and were not compared with the task (the task touches no view code).
- The source of the other side's view and sim changes (`headquarters.tsx`, `away-report.ts`, `button.ts`, `styles.css`) was not read beyond the stat; the sim diff (`loop.ts`, `saved-game.ts`, `types.ts`) was read.
- `docs/task-cycles/progi-drzew-walki/task.frozen.md` was not read: the dispatch named it for context, and the review did not need its passages beyond what D-379 and the diff state.

## Searches not found or unclear

none
