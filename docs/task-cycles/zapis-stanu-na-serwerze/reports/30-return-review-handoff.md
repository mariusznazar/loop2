# Handoff — reviewer of the return step, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **reviewer of the return step**, a
fresh agent that made none of the change. Read-only: change no file other than your report.
Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`. Process pin `.the-way` at `a8dfe8a`.
- Method: `.the-way/task-cycle/review/SKILL.md` in the worktree. Read it whole; read a file it
  names only when the step or variant that names it comes. You review the return step's range.
- Range: `582e9be..188b836` (one commit, `foundations/decisions.md`: D-04, D-184, D-185, D-190
  corrected to match the code).
- Judge it against the frozen task (`.runs/task-cycles/zapis-stanu-na-serwerze/task.md` — its
  *Decisions in play* and *Settlements to record* rows 1, 2, 6, 10), the spec (`spec.md`) and the
  entries the return step corrects, and against the code they describe
  (`src/browser/view/app.ts`, `src/browser/view/game-saver.ts`, `src/browser/view/game-view.ts`,
  `src/browser/sim/saved-game.ts`).
- The return step's report: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/29-return-step-report.md`.
  It names one thing left: `guidelines/coding-saved-game.md:8-9` and `:122` keep the narrower
  wording that D-04 and D-190 had; judge whether that leaves the foundation and the guideline
  contradicting each other.
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/30-return-review-report.md`,
  first line `PASS <sha>` or `FAIL <sha>`.
- Do not run the whole gate (`npm test` with no argument); run
  `python -B .the-way/elements/common/foundation_check.py` and any focused check you need.

## Answers of step 4

- Trust boundary: **yes** — `src/server/**` and `src/browser/sim/saved-game.ts`; D-04 and D-190
  describe what the load takes in.
- Irreversible operation: **yes** — schema step 3 → 4 on the test server's `loop2_accounts`, run
  by the human; the return step only describes it.

## Return

Return the report's first line, the report path, a one-line check result and one line per
Critical or Important finding.
