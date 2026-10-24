# Handoff — reconciliation with the target branch, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You
bring the task branch up to date with the target branch (step 12 of
`.the-way/task-cycle/skill/SKILL.md`): **merge** `main` into `task/ognisko-i-jedzenie` — never
rebase, never force — with the project skill **`the-way-make-change`** (read its method and what it
names, whole). A fresh reviewer reviews the merge after you.

Boundary: the merge, its conflict resolution, and the renumbering below. Do **not** make the join of
spec Decision 2 (the team's character carrying traits) — the next slice makes it; keep the code
compiling and the tests passing without it, a map run's character taking its traits from
`newTraits` at a send as today. Commit by explicit paths (resolve, `git add <paths>`, `git commit`
for the merge). Return `done`, `done with concerns`, `questions`, `returned` or `blocked`; questions
go to the orchestrator in your report.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`, head
  2c6b28b8727f4f52e0b6ee06430f0392b6a54c7e (reviewed, gate run on its code).
- Target: local `main` at d11dd0f (equal to `origin/main`): task 11 `siedziba-i-druzyna` merged —
  the headquarters with the player's one team, its chest, creating elemental mages and sending a
  character from the headquarters (commit 53b30d0), and foundation entries D-50–D-56, the invariant
  `character-team`, the glossary term `headquarters` (24bbc2d, 4a0521d).
- `git merge-tree --write-tree --name-only HEAD main` reports conflicts in:
  `foundations/decisions.md`, `foundations/invariants.md`, `foundations/part_map.md`,
  `src/browser/sim/game.ts`, `src/browser/sim/run.ts`, `src/browser/sim/types.ts`,
  `src/browser/view/app.ts`, `tests/invariants/test_simulation_inputs.py`,
  `tests/invariants/test_simulation_isolation.py`, `tests/invariants/test_simulation_randomness.py`.
- Frozen task: `.runs/task-cycles/ognisko-i-jedzenie/task.md`; spec
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md` (Decision 2: where carrying capacity stands, the
  join); task 11's document (for what its code means):
  `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\siedziba_i_druzyna_loop2.md`.
- Write your report to `.runs/task-cycles/ognisko-i-jedzenie/reports/28-reconcile-report.md`.

## Answers of step 4

- Trust boundary: yes — `assets/icons/**`; the merge must keep `assets/icons/campfire.svg` and its
  credit as they stand on the branch.
- Irreversible operation: no.

## The renumbering

`main` holds D-50–D-56. This branch's D-50–D-65 become **D-57–D-72**, in the same order (D-50 → D-57,
…, D-65 → D-72), and every reference to them moves with them: *Relations*, *Derives from*, *Based
on* and *Verification* lines of `foundations/` (for instance `minute-span-split` derives from D-64 →
D-71), the glossary, code comments (`src/browser/**`), test docstrings and comments (`tests/**`).
`main`'s D-50–D-56 keep their numbers. Search for every `D-5x` and `D-6x` on both sides before and
after, and name in your report each reference you moved; a reference on `main`'s side to its own
D-50–D-56 stays. Where both sides add an invariant or a glossary term at the same place, keep both.
Where `main`'s D-53 („where „Zakończ” leads”) bears on this branch's death screen (old D-55 → D-62),
make the two agree in code — „Zakończ” after death leads where `main`'s D-53 says — and name it.

## Conflicts in code

Keep both behaviours: task 11's headquarters, team and send from the headquarters, and this
branch's body, backpack, traits on the map run's character, death, campfires, gathering. The map
run keeps its own copy of the character's traits (spec Decision 2). Where `main`'s `send` takes a
character of the team, the map run's character still gets traits from `newTraits` until the next
slice.

## Read

Foundation of the parts `simulation`, `browser-view`, `product-foundation` as "Reading the
foundation" gives, on both sides; at least D-50–D-56 of `main` and this branch's D-50–D-65, each
whole; `character-team`; glossary whole. Guidelines: `guidelines/coding.md`,
`guidelines/coding-simulation-module.md`, `guidelines/coding-browser-module.md`.

## Checks after the merge

`npm run build`; `npm run typecheck`; `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`;
`node --test tests/http.test.mjs tests/startup.test.mjs`; for each conflicted invariant test and
`test_character_team.py` (if `main` has it), `python -B -m unittest discover -s tests/invariants -p
<file>`; `test_minute_span_split.py`, `test_walk_feasibility.py`; `python -B -m unittest discover -s
tests/quality -p test_quality_invariants.py -k eslint -k prettier`;
`python -B .the-way/elements/common/foundation_check.py`. On this machine Ruff, ShellCheck and Docker
are absent; `tests/invariants/test_loop2_one_serving_process.py` fails already on the base.
