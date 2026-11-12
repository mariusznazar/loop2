# Handoff — review of the reconciliation with the target branch, task trzy-chwile-gdy-czas-stoi

You are a fresh reviewer; you did not make the change. Method: `.the-way/task-cycle/review/SKILL.md` in the
worktree `the task's worktree` (read it whole; this review is "the
reconciliation with the target branch"). Read-only toward the worktree; if you run a check, run it in a
separate checkout under the worktree's `.runs/` with dependencies installed as the README gives, one command
after another (the machine ran short of memory once in this cycle), and delete it afterwards.

## What is reviewed

- The merge commit `f6845995` of `origin/main` (`eb7cf5d8`, pull request 85) into the task branch. Its first
  parent is the branch head `dc42ad8e` (the tree of `23e22246`, which was reviewed three times and gated); its
  second parent is `eb7cf5d8`. Review **the result against both sides**: `git diff origin/main HEAD` (16 files,
  +1790 −97) must be this task's change and nothing else, and `git diff dc42ad8e HEAD` shows what main brought
  into the tree. The author's report: `.runs/task-cycles/trzy-chwile-gdy-czas-stoi/reports/merge-report.md`
  (a claim, not evidence); its handoff with the rulings: `reports/merge-handoff.md`.
- The task: `.runs/task-cycles/trzy-chwile-gdy-czas-stoi/task.md` (frozen; its *To do* 1–14, *Settlements to
  record* rows 1–7 and *Decisions in play* are what the merged foundation, code and tests must still carry).
- Trust boundary: yes, as for every review of this cycle — `assets/sprites/**` holds the new death sheet; the
  merge changes no file there, but check that `assets/sprites/mage-death.png` is byte-equal to the one of
  `23e22246` and that the invariants about sprite files still name it.

## The question of this review

Do the two sides still hold together? Pull request 85 moved the reasoning of the decisions into the entries
(each entry's *Rationale* and *Rejected* "as the game has them", *Origin* `none`), renumbered its own decisions to
D-374…D-388, renamed comments and test titles to name decisions instead of tasks, notes and specs, and added the
invariant `tracked-file-private-names`. This task added the three effects of the moments in which time stands
still and entries for them. Judge:

1. Whether **every point of the frozen task's *To do* and every settlement row is still carried** after the
   merge, in main's form: D-322 (plays once, last image, plaques, the fall, the cold layer after a death from
   cold, the specks, the end in the minute of a discovery, only the effect moves, "Wznów" cuts the discovery
   effect), D-311 (window after the effect, at once where the scene shows the last picture), D-39 (plaque frame),
   D-42 (fourth criterion 2.3.1, the dark bar and `condition-unmet` sentences kept, plaque-frame pair), D-271,
   D-315, D-371, the fact `wcag-three-flashes`, the styleguide part, the README line. Nothing of main's rewriting
   restored (reasoning main dropped) and nothing of this task's meaning lost.
2. Whether the **auto-merged files** hold together in meaning, not only in text: `src/browser/view/scene.tsx`,
   `scene-picture.ts`, `game-view.ts`, `run-screen.tsx`, `world-area.tsx`, `src/browser/sim/data/scene.ts`,
   `src/browser/styles.css`, `src/browser/tokens.css`, the scene and window tests. Does anything main changed in
   these (comments, titles, D-372/D-373 wording, the frost, flame and tint) contradict what this task added?
3. **The reconciliation of D-317 and the fact.** This task's frozen task says D-317 is "Bez zmiany" and that the
   sentence on the three moments is written by task 20. The author nevertheless replaced the first citation in
   D-317's *Based on* (a W3C quotation of 2.3.1 that main wrote) with the fact `wcag-three-flashes`, to keep one
   source for the criterion, leaving D-317's two glossary quotations as main wrote them. Judge whether that
   is within what the merge may do (an approved decision of main changed beyond carrying this task's meaning,
   WAY-30), whether D-317's *Rationale* still rests on what its *Based on* now holds (it states a 25 % threshold of a
   10 degree field, which the fact does not hold), and what the remedy is if it is wrong. Grade as the method gives.
4. Whether the **rules main wrote reach what this task added**: the invariant `tracked-file-private-names`
   (method review — judge the added text yourself), D-374's relation, D-82 and the testing guidelines'
   departures, the styleguide's value sources; the `Source:` lines of the four colour tokens, comments, test
   titles, *Origin* lines. The human chose the colours on 2026-11-12, accepting the cycle's proposal; the
   `Source:` lines state that and the pixel addresses — the author dropped "(loop, commit cdc7c0d)" because the
   invariant forbids naming the private repository.

## Foundation entries the merge brought in that bear on the parts this change touches

D-317, D-322, D-315, D-316, D-271, D-311, D-39, D-42, D-371, D-372, D-373, D-319, D-320, D-321 (rewritten or
renamed by main); D-374 (how main's decisions relate), D-82 (which documents supply test expectations), D-386
(which game states the load of a saved game state admits — bears on a scene drawn again after a load), the
invariant `tracked-file-private-names` and the pinned styleguide/testing guidelines of `guidelines/`. You
select your own foundation and guidelines by "Reading the foundation" and `product-guidelines/reading.md`, as
in the earlier reviews; state the counts of decisions read whole and by title.

## Checks

Run, one after another, in a separate checkout of `f6845995`: `python -B .the-way/elements/common/foundation_check.py`;
`npm run typecheck`; the invariant tests `tests/agent_workflow/test_tracked_file_private_paths.py`,
`test_design_token_sources.py`, `test_design_token_contrast.py`, `test_browser_view_token_values.py`; the four
view test files (`tests/view/scene.test.mjs`, `scene-picture.test.mjs`, `scene-frost-contrast.test.mjs`,
`end-window-game.test.mjs`). The full gate and the container test are the orchestrator's.

## Report

`reports/review-5-report.md` in `.runs/task-cycles/trzy-chwile-gdy-czas-stoi/`: first line `PASS <sha>` or `FAIL <sha>`
(the merge commit), findings graded as the method gives with `file:line`, the checks with command and exit code,
**Unread material**, **Searches not found or unclear** (`none` is an answer). Return the first line, the path,
the changed files with line counts and a one-line check result.
