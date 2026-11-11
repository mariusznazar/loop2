PASS 9179cddeb10e4cacfefd4b2963984befcc278663

# Review of the second reconciliation with the target branch (task koniec-przejscia)

Range: renumbering commit `8c355c4f..4a5374f9`, merge commit `9179cdde` (parents `4a5374f9`, `01418389`; merge-base `3b7e4930`). `git rev-parse HEAD` in the reviewed worktree is `9179cddeb10e4cacfefd4b2963984befcc278663`, as expected; the worktree status was clean before and after.

Question of the review: do the two sides still hold together? Answer: yes. Blocking 0, Minor 0, out of scope 0.

## Findings

Blocking (Critical or Important): none.

Minor: none.

Out of scope: none.

## What was verified, by the handoff's points

### 1. The renumbering commit `8c355c4f..4a5374f9`

- A script (`a scratch file outside the repository`) read each of the 17 changed files at both commits and checked line by line that the new text equals the old text with only `D-364`->`D-368`, `D-365`->`D-369`, `D-366`->`D-370`, `D-367`->`D-371` applied (word-bounded). Result: 17 files, 70 changed lines, 0 mismatches, equal line counts. Positive control: the count of changed lines (70) equals the count of lines holding an old number in the base (`git grep -n -E 'D-36[4-7]\b' 8c355c4f`: 70).
- The set of files holding an old number at `8c355c4f` equals the set the commit changes (compared, no difference). At `4a5374f9` (task side before the merge) no `D-364`..`D-367` stands anywhere; also no shorthand such as "D-364 to 367" or "D-364/365" is left (searched).
- Merged tree, outside `foundations/decisions.md`: every `D-364`..`D-367` is main's gathering decision (styleguide Roles line 600 and the gathering rule at lines 629-644, `tests/view/scene.test.mjs:1190`); every `D-368` is the window (styleguide window rule, `styles.css`, `end-window*.ts(x)`, `game-view.ts`, `run-header.tsx`, `run-screen.tsx`, tests). `D-369`..`D-371` are referred to only inside `foundations/decisions.md` (D-368 relations/text, D-370 and D-371 relations) and there correctly: `(D-370)` for Escape in D-368 and in D-311 (line 6809), `derives from D-368` in D-124/D-324/D-283-area entries.
- In `foundations/decisions.md` the headings `### D-364`..`### D-371` stand once each, in order, at lines 8202-8307. The vault folder `(P) Loop` holds no `D-364`..`D-371` reference (grepped), so no vault note needed shifting.

### 2. The merge commit `9179cdde`

- Files changed by both sides since the merge-base: `foundations/decisions.md`, `guidelines/styleguide-browser-view.md`, `src/browser/styles.css`. For each, the sorted set of added and removed lines of `4a5374f9..9179cdde` equals that of `3b7e4930..01418389` (main's changes), and the set of `01418389..9179cdde` equals that of `3b7e4930..4a5374f9` (the task's changes), with the exceptions below:
  - `decisions.md`: 85 and 291 lines, identical sets both ways. `/tmp` comparison of the merged file with main's: the only differences are the task's own edits plus the appended D-368..D-371 block (lines 8261-8320 appended after main's D-367, which is intact: main's file ends at 8191 lines, D-364..D-367 at 8202-8261 of the merged file are main's text unchanged).
  - `styleguide-browser-view.md`: the only differing line is the `panel` row of the Roles table: main's text "... plakietka nad głową postaci i plakietka lecącej ikony zasobu." is present (merged line 17), padded by Prettier. All table lines of main's file and of the merged file, normalised for whitespace and dash runs, are equal (diff empty). The window's rule (merged lines about 695-745, "Okno końca przejścia ... jak się zamyka i otwiera ...") is intact; `git diff 4a5374f9..9179cdde` on the file shows no deletion in the window's part, only main's gathering section, the extended lists and the decision line.
  - `styles.css`: merged cleanly; sets equal both ways (122 and 169 lines).
- Files touched by one side only: `git diff --quiet` shows main-only files equal to main's content and task-only files equal to `4a5374f9`'s. No file changed by the merge lies outside main's list; none changed against main lies outside the task's list.
- `git diff 4a5374f9..9179cdde -- src/browser/sim/saved-game.ts`: 0 lines, the trust-boundary file is unchanged by the merge. No irreversible operation is touched.
- Semantic fit of main's scene code with the window:
  - The window stands only after a death or a completion (D-368). `sceneDrawing` then gives `standing` "dead" or "completed"; `bendingOf` is false and `badgeOf` null for an ended run (`src/browser/view/scene-picture.ts:150-200`). `Scene` starts a new effect only when `drawing.standing === "going"` and the run did not just start (`src/browser/view/scene.tsx`, in the render-time adjustment around line 269), so no effect begins under a standing window.
  - Main's effects run in CSS alone (`.scene-effect`, 300 ms, `animationend` to drop them); no timer, no animation frame, no sound, no layout read of the DOM was added (diff of `scene.tsx` read whole). Under the window the scene section is `hidden` (`run-screen.tsx:166`, `world-area.tsx` stays mounted), so animations on it do not run. An effect already running at the moment of the end stays as main's design leaves it: `.scene:not([data-standing="going"]) * { animation-play-state: paused }` (`styles.css:2071`), D-367 "finishes, standing still while the scene does". When the window is closed by "✕" the element is shown again in that paused state, exactly as it stood on a dead scene before the merge; the window adds nothing to it. D-370 already records that an effect of the end is seen before the window opens or after "✕".
  - `Scene` keeps `lastState`/`effects` as component state; the scene section stays in the tree under `hidden`, so that memory is kept across the window. "Restart" sets `started`, which clears an effect (`scene.tsx`, `drawing === null || started` branch).
  - The window's files (`end-window.tsx`, `end-window-lines.ts`, `game-view.ts`, `run-screen.tsx`, `run-header.tsx`, `world-area.tsx`) call nothing main renamed: main's range changed only `scene.ts` (data, additions), `scene-picture.ts`, `scene.tsx`, `credits*.ts(x)`, `footer.ts` and `styles.css`, and added or extended exports only. Main's range changed none of `world-area.test.mjs`, `run-screen.test.mjs` or `end-window*.test.mjs`; the combined run of those (below) passes.
  - Main's new action kinds: none (`ACTIONS` unchanged), so the closed list of kinds of `run-record.ts` stays as the task made it.
  - The footer and credits (main's `footer.ts`, `credits.ts`, `credits-section.tsx`) are not touched by the task.

### 3. Foundation entries brought in that bear on the change

Read whole: D-364, D-365, D-366, D-367 (main's, `foundations/decisions.md` 8202-8261 and from the diff), D-271 and D-317 as main changed them (read whole in the merged file), the new invariant `sprite-credits`, the environment fact `smoke-fire-particle-licence`, and the part-map row for the pack (from `git diff 3b7e4930..01418389 -- foundations/...`, read whole; that range changed in `decisions.md` only D-271, D-317 and added D-364..D-367). Also read whole in the merged file: D-368..D-371, D-311, D-324, D-339, D-322.

- D-364 (bend at "Zbierz"/"Obchód"), D-365 (flying icon on a `panel` plaque), D-366 (dust), D-367 (which readings show an effect, and "an effect already running finishes, standing still while the scene does"): none speaks of the end-of-run window or of a covered scene. D-368..D-371 say the window hides the scene and the screen, "an effect of the end on the scene is seen before the window opens or after ✕" (D-370), which agrees with D-367, whose effects begin only in a going run and stand still afterwards.
- D-317 (changed by main: effects at most 300 ms, no text, no flash of the whole area, overdue dropped, reduced motion): the window has no animation or transition in its rules (`styles.css` 1472-1700, grep) and is not a scene effect, so it is not bound by it.
- D-271 (changed: the second pack for the dust, credits): the task adds no sprite, no icon and no pack; `tests/invariants/test_icon_credits.py` passes.
- D-311, D-322, D-324, D-339: not contradicted. D-322 ("after a death the motion of the scene stands still, no badge ... mage grey") agrees with the scene staying behind the window as drawn for "dead".
- The new invariant `sprite-credits` (credit line for every pack with a licence asking for it) concerns assets and the footer; the task changes neither.
- No new rule of main is violated by the task's change; no sentence of D-368..D-371 or of the code contradicts main's new text.

## Declined to judge

- The pin `52f8164a` (same on both sides; main's task): not judged.
- The task's own change and the first merge: reviewed and passed before; not re-reviewed.
- The look of the merged screen in a browser (a flying icon or dust behind a window that opens at the same moment as a death; the paused effect after "✕"): not run; judged from the code and CSS as above, and D-370 already accepts it.
- The whole gate: the orchestrator's run after this review.

## Checks run

In a separate worktree `.runs\merge-review-2-wt` of `9179cdde` (detached; `.the-way` initialised by `git submodule update --init -- .the-way`, checked out `52f8164a`, equal to the gitlink; `npm ci`). The worktree was removed afterwards (`git worktree remove --force`, then `git worktree list` no longer shows it); the reviewed worktree is unchanged.

- `npm ci` : exit 0.
- `npm run typecheck` : exit 0.
- `npm run build` : exit 0 (the tests import the build output).
- `node --test tests/view/scene.test.mjs tests/view/scene-picture.test.mjs tests/view/icons.test.mjs tests/view/world-area.test.mjs tests/view/run-screen.test.mjs tests/view/end-window.test.mjs tests/view/end-window-game.test.mjs tests/view/end-window-lines.test.mjs tests/view/run-header.test.mjs tests/view/end-question.test.mjs tests/sim/saved-game.test.mjs tests/sim/run-record.test.mjs` : exit 0, 286 tests, 286 pass, 0 fail.
- `python -B .the-way/elements/common/foundation_check.py` : exit 0, "0 errors".
- `python -B scripts/test.py tests/invariants/test_browser_view_token_values.py` : exit 0, 4 tests OK.
- `python -B scripts/test.py tests/invariants/test_icon_credits.py` : exit 0, OK.
- `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` : exit 0, OK.
- Manual: `renum2.mjs` (17 files, 70 lines, 0 mismatches); set comparisons of added/removed lines for the three files both sides touched (as above); `git diff 4a5374f9..9179cdde -- src/browser/sim/saved-game.ts` : 0 lines; `git ls-files --stage -- .the-way` : `160000 52f8164a...`, same in the worktree.

Not run: the whole gate (the dispatch forbids it); a browser look.

## Reaches beyond the dispatch

- `src/browser/view/scene.tsx` (diff of main's range, and the render-time block), `src/browser/view/scene-picture.ts:100-215`, `src/browser/view/world-area.tsx:48-110`, `src/browser/view/run-screen.tsx` (grep of `hidden`/`Scene`), `src/browser/styles.css` lines 1960-2095 and the `end-window` rules by grep: to find a timer, a frame, a sound or a dependence on visibility in main's new scene code and the state in which an effect stands when the window covers the scene.
- `foundations/decisions.md` D-271, D-317, D-322 in the merged file (not named in the handoff): D-271 and D-317 were changed by main; D-322 is the scene-at-the-end rule the window sits over.
- `the author's private notes) Loop` (grep for `D-364`..`D-371`, none): whether a vault note kept old numbers.
- `docs/task-cycles/koniec-przejscia/reports/merge-review-report.md`: read as the first merge's evidence, as the handoff says.
- `the author's rules for scripts` and `search.md`, read as the user's instructions require before writing a script and before concluding "not found".

## Unread material:

none of the dispatch's material. Of main's foundation range I read the added lines of `decisions.md`, `invariants.md`, `environment_facts.md` and `part_map.md` from the diff of `3b7e4930..01418389` whole, and the decisions D-364..D-367 through that diff and in the merged file; the changed lines of D-271 and D-317 through the diff and the whole entries in the merged file. The guideline files `guidelines/coding.md`, `guidelines/testing.md` and the full `guidelines/styleguide-browser-view.md` were not read whole (not named in the handoff for this review; I read the Roles table by comparison and the window's rule at lines about 690-745 and the gathering rule at 625-650).

## Searches not found or unclear:

- A use of a timer, `requestAnimationFrame`, a sound or a layout read in main's new scene code: not found (searched the diff of `scene.tsx` read whole; effects run in CSS and end by `onAnimationEnd`).
- References to `D-369`, `D-370`, `D-371` outside `foundations/decisions.md`: not found in the code, styleguide or tests (only `D-368` is cited there). Not a defect: nothing in those files named the three before the renumbering under their old numbers either (the renumbering script found nothing left over).
- The handoff names `tests/view/scene*.test.mjs` as read by "main's tests"; the merged `scene.test.mjs` and `scene-picture.test.mjs` pass in the focused run above, but none of main's scene tests renders the scene inside the window's `hidden` section; whether such a test would be wanted is outside this review.
