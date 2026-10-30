# Handoff — reconciliation with the target branch, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are a fresh agent that **reconciles the task
branch with the current target branch** — the first step of the correction after review of request #43
(`.the-way/task-cycle/skill/correction.md`: "First merge, never rebase, the current target branch"). Your questions go to the
orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`, head `a2d89bf` (the change at `3bd8f3f`, then the record's commit `f140735` and its removal `a2d89bf`).
  Process pin `.the-way` at `a8dfe8a` on both sides.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree — read it whole; your stage is the
  reconciliation, which takes none of its variant rows; follow its rules for reading, tests, the
  own-work check, commits and the report. Change foundation entries only through the element skills
  the product's `AGENTS.md` names, and guidelines only through their maintain skills.
- Frozen task, spec, plan: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md`, `spec.md`,
  `plan.md`.
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/35-reconcile-report.md`
- Commit by path; never force-push, never rebase. Do not run the whole gate (`npm test` with no
  argument); it is the orchestrator's after the review of the merge. Run focused checks, each with
  command and exit code.

## Answers of step 4

- Trust boundary: **yes** — `src/server/**` and `src/browser/sim/saved-game.ts`: the load must still
  refuse a crafted or malformed saved game state whole, the new fields of the game state included.
- Irreversible operation: **yes** — schema step 4 on the test server's `loop2_accounts`, the human's
  H1 and H2. `main` brings no schema step (check it: `src/server/database.ts` unchanged on `main`).

## What the target branch brings

`git fetch origin` gives `origin/main` at `e5025f6`: PR #41 `task/plan-wyprawy` (task 13: trip plans
and chest transfers, merged as `56fa086`) and PR #42 `task/wprawa-i-drzewa` (task 10: practice and
character skill trees, merged as `e5025f6`), both after this cycle's base `dce2970`. The pin
`.the-way` is `a8dfe8a` on both sides. A trial `git merge-tree` shows conflicts in
`foundations/decisions.md`, `foundations/invariants.md` and `stryker.config.json`;
`src/browser/styles.css`, `src/browser/view/game-view.ts` and `src/browser/view/program-panel.ts`
merge automatically.

Two consequences beyond the textual conflicts:

1. **Decision numbers collide.** `main` wrote D-179 – D-201 (task 13 D-179 – D-189, task 10
   D-190 – D-201); this branch wrote D-179 – D-190. As the earlier email-confirmation cycle did (the
   branch merged later renumbers its own), first renumber **this branch's** D-179 – D-190 to
   **D-202 – D-213** (add 23) in every file of the branch that names them — foundations,
   guidelines, code comments, tests, the deploy skill in both copies — in its own commit, before the
   merge; leave `.runs/` and `docs/` history alone. Then merge `origin/main` (a merge commit, never a
   rebase) and keep both sides' entries. Check every other identifier the sides added (invariants,
   environment facts, glossary terms) for collisions as well.
2. **The game state's shape changed on `main`.** Task 13 added `tripPlan` to `Program`, `bringPlan`
   and `deposited` to `GameMapRun`, and keyed the chest's pieces by item; task 10 added a character's
   `skills` (`CharacterSkills`: practice and branch ranks per skill) and `trees`, a map run's
   `practice`, and the activity kind `patrol` (`src/browser/sim/types.ts`, `src/browser/sim/data/skills.ts`
   and the simulation files both tasks changed). `src/browser/sim/saved-game.ts` builds the state field
   by field as a `GameState` and refuses any missing or extra key, so after the merge it must save and
   load all those fields as strictly as the rest (closed lists, identifiers present in the data —
   skills, branches, items —, counts and practice as safe integers in their ranges, each item at most
   once in a trip list, ranks within what the data allows, whatever the two tasks' decisions and
   invariants require), and `tests/sim/saved-game.test.mjs` must cover them in its written-out
   documents and crafted cases. Keep `SAVED_GAME_VERSION` at its current value: no saved game state
   of this version exists anywhere, since this branch has never been deployed. Read the two tasks'
   decisions (D-179 – D-201 on `main`), invariants and glossary entries before writing. Follow
   `guidelines/coding-saved-game.md` and correct it where the merge makes it untrue.

Check also that the merged page still saves at every player act of task 13 that changes the game
state (the trip editor's acts and buying a branch rank — D-184's moments (D-207 after the renumbering), and the table-driven case in
`tests/view/account-screen.test.mjs`), and that nothing else of task 13 is lost or doubled in the
auto-merged files.

## Return

Write your report as the method gives (files, commits, checks with command and exit code, own-work
check, choices, reaches, **Searches not found or unclear**), and return your status, your commits
(real hashes from `git rev-parse --short`), a one-line check result and the report path.
