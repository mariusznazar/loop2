# Handoff — reviewer of the reconciliation with the target branch, task `petla-zarobkowa`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`, and asked to bring the open request PR #47 up to
date after PRs #45 and #46 merged. You are the reviewer of the merge, a fresh agent that made none of
it. You change no file except your report. Your questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\petla-zarobkowa`, branch
  `task/petla-zarobkowa`, head `b890c16`, not pushed yet.
- Method: `.the-way/task-cycle/review/SKILL.md` in the worktree (the project skill
  `the-way-review-change`). Read it whole; read a file it names only when the step or variant that
  names it comes.
- Variant: the review of the reconciliation with the target branch.
- Range: `cd650de..b890c16`, which is two commits of the orchestrator: `8f275f9`, the renumbering, and
  `b890c16`, the merge of `origin/main` at `dc0fc69`. The reviewed tree is that of `42784ca`, equal to
  `cd650de`'s.
- Report path, first line `PASS <sha>` or `FAIL <sha>`:
  `.runs/task-cycles/petla-zarobkowa/reports/20-merge-review-report.md`
- Do not run the product's gate (`npm test` with no file argument); it is the orchestrator's. It
  passed on `b890c16`: exit 0, Node 1146 of 1146, 377 Python tests, `foundation_check.py` 0 errors, log
  `reports/19-gate-merge.log`. A focused check you run carries its command and exit code. Before
  writing any script read `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md`.

## Answers of step 4

- Trust boundary: **yes**, `src/browser/sim/saved-game.ts`. Main did not change `src/browser/sim`.
- Irreversible operation: **yes**, raising `SAVED_GAME_VERSION` to 3; only prepared. The merge's
  server side changes on main, a database backup and a password reset, are the merged requests' own.

## What to review

1. **The renumbering.** `8f275f9` moved D-222 to D-234 of this change to D-239 to D-251, each +17, in
   94 mentions of 23 files. Check that the shift is whole and exact, that no citation of this change
   points at one of main's D-222 to D-238 after the merge, and that no citation of main's was moved.
2. **The resolved conflicts** in `foundations/decisions.md` and `foundations/invariants.md`:
   D-44 takes main's text with this change's „Zatrzymaj”, Origin and *Rationale* words carried in; each
   file's tail keeps main's entries first, then this change's, each whole.
3. **What auto-merged:** `guidelines/styleguide-browser-view.md`, `src/browser/styles.css`,
   `tests/view/account-screen.test.mjs`, and the rest of the range.
4. **The meeting of the two sides,** which no earlier review saw. Each of this change's entries and
   this change's code against what main brought:
   - the decisions D-222 to D-238 and the changes main made to older entries; `git diff 4ed8fcd
     origin/main -- foundations/`;
   - the guidelines main changed, `git diff 4ed8fcd origin/main -- guidelines/`, against this change's
     code and tests: `src/browser/sim/loop.ts`, `src/browser/view/away-report.ts`, and the view's
     changed files;
   - `src/browser/view/app.ts`, changed by main: this change's D-247 (four loads) and its claim that
     all loads pass through `createGameView`, where the catch-up runs. The orchestrator read this
     much: the reset form builds no game, and `showGame` stays the one place. Do not take that on
     trust;
   - tests main added to `tests/view/account-screen.test.mjs`: whether any depends on the save's shape
     or version in a way that passes for the wrong reason.

## Sources

- The record: `.runs/task-cycles/petla-zarobkowa/cycle.md`, *Events*, for the last rows only.
- Whole-change review: `.runs/task-cycles/petla-zarobkowa/reports/14-whole-review-report.md`; its
  numbers D-222 to D-234 are the old ones, so add 17.
- Frozen task: `.runs/task-cycles/petla-zarobkowa/task.md`, as far as a finding needs it.
- `foundations/part_map.md`, for the parts.
