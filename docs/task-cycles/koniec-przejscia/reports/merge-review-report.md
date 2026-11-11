PASS 8ac37c6d95ae2d44bf9c8a09447f41284c1c5f29

# Review of the reconciliation with the target branch (task koniec-przejscia)

Range: renumbering commit `0894f755..78c8aa1c`, merge commit `8ac37c6d` (parents `78c8aa1c`, `3b7e4930`; merge-base `211a4ea`). `git rev-parse HEAD` in the reviewed worktree is `8ac37c6d95ae2d44bf9c8a09447f41284c1c5f29`, as given. Worktree status was clean before and after the review.

Question of the review: do the two sides still hold together? Answer: yes. Blocking 0, Minor 0, out of scope 0.

## Findings

Blocking (Critical or Important): none.

Minor: none.

Out of scope: none.

## What was verified, by the handoff's points

### 1. The renumbering commit `0894f755..78c8aa1c`

- A script (written to the scratchpad, `renum.mjs`) read each of the 17 files changed by the commit at both commits and checked, line by line, that the new text equals the old text with `D-362`->`D-364`, `D-363`->`D-365`, `D-364`->`D-366`, `D-365`->`D-367` applied and nothing else. Result: 17 files, 70 changed lines, 0 mismatches, line counts of every file equal.
- No file holding `D-362`..`D-365` at `0894f755` was left out of the commit: `git grep -l -E 'D-36[2-5]\b' 0894f755` lists 17 files, the commit changes the same 17 (`comm` of the two lists is empty).
- No collision: `D-366` and higher did not exist at `0894f755`, and `D-364` and higher did not exist on main at `3b7e4930` (`git grep` of both, empty).
- In the merged tree `git grep -E 'D-36[2-7]\b'` gives: `D-362` and `D-363` only in main's own places (`foundations/decisions.md` headings 8149 and 8164, `foundations/invariants.md:1285` derives-from of `tracked-file-private-paths`, `src/browser/view/program-editor.ts:808` and `tests/view/rule-editor.test.mjs:1447`, which both mean the price of an action, main's D-363); every other occurrence is D-364 to D-367, all of them the end-of-run window's entries. Spot reading of the decisions' text (D-364 relations, Escape "(D-366)", D-367 relations) agrees.
- The vault task document `koniec_przejscia_loop2.md` holds no D-362..D-367 reference (grepped), so nothing there needed shifting.

### 2. The merge commit `8ac37c6d`

- Files both sides touched (`git diff --name-only 211a4ea..78c8aa1c` against `211a4ea..3b7e4930`): only `foundations/decisions.md` and `tests/view/world-area.test.mjs`.
- For each of the two, the sorted set of added and removed lines of `78c8aa1c..8ac37c6d` equals that of `211a4ea..3b7e4930` (44 lines and 17 lines), and the set of `3b7e4930..8ac37c6d` equals that of `211a4ea..78c8aa1c` (341 and 62 lines): the resolution loses nothing of either side and adds nothing.
- Files touched by one side only: `git diff --quiet` shows main-only files equal to main's content and task-only files equal to `78c8aa1c`'s content. The files list of `3b7e4930..8ac37c6d` (35) equals the task's own list `211a4ea..78c8aa1c` (35).
- `foundations/decisions.md` end of file: D-362 and D-363 (main), then D-364 to D-367 (this task), contiguous, each once.
- `git diff 78c8aa1c..8ac37c6d -- src/browser/sim/saved-game.ts` is empty (0 lines): the trust boundary file is unchanged by the merge.
- Semantic fit of the two sides in code:
  - `world-area.test.mjs`: the task's hunks (top of file, 169 to 400) and main's hunk (the campfire icon test, about line 947) do not touch each other; the campfire test reads `fireRun` and the drawing, neither of which the task changed. It passes in the merged tree.
  - `src/browser/view/end-window-lines.ts` imports `ruleNumber` and `ruleSentence` from `program-editor.ts`, which main changed. Main's changes there are `actionCellLabel`, `actionPriceText` and `countedName` only (the pick of the rule panel); `ruleSentence` and the row text are unchanged, which is what D-363 requires ("the row of a program rule shows no price"). The window's "Na co poszedł czas" uses `ACTIONS[kind].label`, not the cell label with a price, so no price leaks into the window.
  - `src/browser/sim/run-record.ts` builds `MINUTE_KINDS` from the keys of `ACTIONS`; main added no action, only the export `NATURE_ENERGY_NAME` in `data/actions.ts`, so the closed list of kinds does not change.
  - `src/browser/sim/run.ts` (main: `campfireLightCount`) and the task's `game.ts`, `run-record.ts`, `types.ts` do not meet in an identifier; `npm run typecheck` passes.

### 3. Foundation entries of main that bear on the change

Read whole: D-362, D-363, D-70 (changed by main, two icons for the campfire), D-82 (changed: where task documents lie), the invariants `tracked-file-private-paths` (new), the changed `Rests on` of the icon-credits invariant, the `Rests on` of the cross-part imports invariant (D-351, text only), and the environment fact `game-icons-wood-pile-title`. Not opened: other decisions of main's range (the range changed only D-70, D-82 and added D-362 and D-363).

- D-362 and the invariant `tracked-file-private-paths` (no tracked file holds an absolute path on a disk or, in Markdown, a link to a note): the task's added lines hold no absolute disk path (`git diff 211a4ea 8ac37c6d -U0` searched for a drive letter: only game-icons URLs, all main's). `tests/agent_workflow/test_tracked_file_private_paths.py` passes on the merged tree. The task's entries name notes by file name and folder within the notes (`koniec_przejscia_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania)`), which D-362 allows.
- D-363 (price of an action in the rule panel): does not contradict D-364 to D-367, D-311, D-324 or D-339: none of them speaks of a price, and the window's sentence of a rule's row is the row's, which carries no price.
- D-70 (campfire drawn with its own icon while burning and the extinguished icon otherwise): the task's entries do not speak of the campfire's icon; the window's "Idź — ognisko" is an action name, not the drawing.
- D-351 (imports of parts): `tests/invariants/test_cross_part_imports.py` passes on the merged tree.
- D-357, D-358, D-359 (screenshots): no image file lies among the commits of `211a4ea..78c8aa1c` (the list of the task's files has none) and the merge adds only main's `assets/icons/wood-pile.svg`.
- Invariants changed by main that bear on the window, the save, the editor or the screen: none beyond those above.

### 4. The pin

`git ls-files --stage -- .the-way` is `160000 52f8164a354ee1a704af0d58add2f3be8e4f0247`, main's pin. `.gitmodules` and `.claude/` are not touched by either side (no entry in `git diff --stat 211a4ea 8ac37c6d -- .claude .gitmodules`). `AGENTS.md` of the merge equals main's (`git diff --quiet 3b7e4930 8ac37c6d -- AGENTS.md` shows no difference), so no mix of two pins. `git -C .the-way rev-parse HEAD` in the reviewed worktree is `52f8164a…`, the recorded commit. The pin itself is not judged.

## Declined to judge

- The pin `52f8164a` (whether it is the right one; main's task) and whether the installer-owned files (`AGENTS.md` block, `.claude/skills/`) match it beyond equality with main's version: outside this task.
- The task's own change (reviewed and passed before): not re-reviewed.
- The whole gate (`npm test`): the orchestrator's run after this review.

## Checks run

Run in a separate worktree `.runs/merge-review-wt` of `8ac37c6d` (detached), with `.the-way` initialised by `git submodule update --init -- .the-way` (checked out `52f8164a`) and `node_modules` joined from the reviewed worktree (same lockfile, since neither side changed `package.json` or `package-lock.json`). The worktree was removed afterwards (the junction first, `node_modules` of the reviewed worktree is intact).

- `npm run typecheck` : exit 0.
- `node --test tests/view/world-area.test.mjs tests/view/program-editor.test.mjs tests/view/rule-editor.test.mjs tests/view/end-window.test.mjs tests/view/end-window-game.test.mjs tests/view/end-window-lines.test.mjs tests/view/run-screen.test.mjs tests/sim/saved-game.test.mjs tests/sim/run-record.test.mjs tests/sim/data.test.mjs tests/sim/campfire.test.mjs` : exit 0, 338 tests, 338 pass, 0 fail. The first run, before `npm run build`, failed with ERR_MODULE_NOT_FOUND for `dist/…` (the tests import the build output); that was my omission, not a defect: after `npm run build` (exit 0) the run above is the result.
- `python -B .the-way/elements/common/foundation_check.py` : exit 0, "0 errors".
- `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` : exit 0, 1 test OK.
- `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` : exit 0, 10 tests OK.
- Manual: the renumbering script (`node renum.mjs`, in the scratchpad `a scratch file outside the repository`): 17 files, 70 changed lines, 0 mismatches. `git diff 78c8aa1c..8ac37c6d -- src/browser/sim/saved-game.ts`: 0 lines.

Not run: the whole gate (the dispatch forbids it); the browser look (no change of look comes from the merge besides main's campfire icon, checked by main's tests that pass here).

## Reaches beyond the dispatch

- `scripts/test.py` and `scripts/build.mjs` (what the tests need: the build first, which commands the gate runs): to run the focused tests correctly.
- `tests/agent_workflow/test_tracked_file_private_paths.py` and `tests/invariants/test_cross_part_imports.py` (run, not read): the invariants D-362 and D-351 name them, to check the task's lines against main's new rules.
- `foundations/decisions.md` lines 8179 to 8232 (D-364 to D-367) read whole, to check them against main's decisions.
- `src/browser/sim/program.ts`, `src/browser/sim/data/actions.ts`, `src/browser/sim/data/campfire.ts`, `src/browser/view/program-editor.ts`, `src/browser/view/terrain-picture.ts` (main's diff only) and `src/browser/sim/run-record.ts:1-30`: for semantic conflicts.
- The vault note `koniec_przejscia_loop2.md` (grep for D-362..D-367 only) and `docs/task-cycles/koniec-przejscia/` (ignored files: they keep the old numbers D-362..D-365 in reports and handoffs of the cycle; not tracked, not part of the merge).
- `the author's rules for scripts` and `search.md`, read as the user's instructions require before writing a script and before concluding "not found".

## Unread material:

none of the dispatch's material. Of main's foundation range I read the diff of `decisions.md`, `invariants.md`, `environment_facts.md` whole (the range changed only D-70, D-82 and added D-362 and D-363 in the decisions), and the entries D-362, D-363, D-70 and D-82 through that diff, not each in the file. The handoff's named entries D-311, D-324, D-339 were not re-read whole in the file: their only change by this task is the renumbering and the text corrected in the already passed `0894f755`, and the script confirmed that the commit `78c8aa1c` changed only identifiers in them. Decisions D-351, D-357, D-358, D-359 were not read in their text: D-351 and D-362 were checked through their invariant tests (pass), the screenshots rules through the absence of any image file in the task's files.

## Searches not found or unclear:

- The handoff's phrase "the screenshots D-357, D-358, D-359" as "main's new rules": not in main's range `211a4ea..3b7e4930` (that range changed no decision with those numbers); I took them as existing rules and checked only that the task adds no screenshot file. Whether they are new to this branch was not established further.
- `foundations/invariants.md` for D-351 holds `Rests on: TODO` with a text added by main; that is main's own open item, not part of this task.
