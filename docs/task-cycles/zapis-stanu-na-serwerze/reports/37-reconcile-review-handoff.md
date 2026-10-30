# Handoff — reviewer of the reconciliation with the target branch, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **reviewer of the reconciliation**, a
fresh agent that made none of the change. Read-only: change no file other than your report.
Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`. Process pin `.the-way` at `a8dfe8a` on both sides.
- Method: `.the-way/task-cycle/review/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes. You review the reconciliation with the target
  branch, a later change to the open request #43.
- Range: `a2d89bf..f7d8234` — `a20e1d4` (this branch's D-179 – D-190 renumbered to D-202 – D-213),
  `765fb3b` (merge of `origin/main` `e5025f6`: tasks 13 and 10; conflicts in
  `foundations/decisions.md`, `foundations/invariants.md`, `stryker.config.json` resolved),
  `932da64` (the saved-game load covers the state fields main brought; a bought branch rank saves at
  once), `3f64a7b` (D-207 names that purchase), `f7d8234` (`guidelines/coding-saved-game.md`
  completed). Judge the merge commit's resolutions against both parents, and the commits after it
  against the frozen task, the spec and the foundation as it now stands (tasks 13's and 10's
  decisions D-179 – D-201 included).
- The agent's handoff and report: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/35-reconcile-handoff.md`,
  `.runs/task-cycles/zapis-stanu-na-serwerze/reports/35-reconcile-report.md` (with § Amendments).
- Frozen task, spec, plan: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md`, `spec.md`, `plan.md`.
- Select your own foundation entries and guidelines by the parts the range touches.
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/37-reconcile-review-report.md`,
  first line `PASS <sha>`, `FAIL <sha>` or `questions`.
- Do not run the whole gate (`npm test` with no argument); run focused checks and any mutation
  analysis your method gives for the files of the range (`src/browser/sim/saved-game.ts` included).
- Another reviewer reviews `f7d8234..776acbc` (a comment correction in `game-saver.ts`) at the same
  time; it is not yours.

## Answers of step 4

- Trust boundary: **yes** — `src/browser/sim/saved-game.ts` (the simulation's trust boundary) now
  loads more of the game state from outside the simulation: trip plans, the frozen bring plan, the
  deposit, the item-keyed chest, skill trees, character skills, practice. Check that a crafted or
  malformed document is refused whole for each of them (unknown skill, branch or item, a duplicate
  item in a trip list, counts and practice off range or not safe integers, ranks beyond the data,
  missing or extra keys) and that the load still never throws and changes nothing it is given.
  `src/server/**` is touched only by the merge, if at all — check that nothing of task 13 or 10 or of
  this branch is lost or doubled there.
- Irreversible operation: **yes** — schema step 4 on the test server's `loop2_accounts` (H1, H2,
  the merge). `main` brings no schema step; check that the merge leaves step 4 as reviewed in Slice 2
  and the deploy skill's text true.

## What to check beyond the code

- That every reference to this branch's decisions names the new number, and no reference to tasks
  13's and 10's decisions was renumbered by mistake.
- That the merged page still saves at every act of the player that changes the game state, task
  13's and 10's acts included (D-207; the table-driven case in `tests/view/account-screen.test.mjs`).
- That `SAVED_GAME_VERSION` stayed at its value, and the agent's three meanings for the human
  (report, § Amendments) are what the change carries.

## Return

Return the report's first line, the report path, a one-line check result naming what failed or did
not run, and one line per Critical or Important finding.
