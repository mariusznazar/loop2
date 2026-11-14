# Handoff — review of the whole change

## Delegation

The person who requested the cycle delegated the intermediate choices to the orchestrator. You are
read-only: you change no file, no commit and no branch.

## What you review

The whole change of the task, as the one author made it, with `review-change`. Method: read
`.the-way/task-cycle/review/SKILL.md` whole, and `.the-way/task-cycle/review/whole_change.md`
as it names it; work from the root of the worktree
`the task's worktree`.

- Range: `git diff 6ab6a32be884ac174b068b8a6a5dd1515073d2a9..8e5af859` (seven commits, 75 files).
  Compute the diff yourself.
- Frozen task, read whole: `.runs/task-cycles/porzadki-przed-pierwsza-mapa/task.md` (a note in
  Polish).
- The author's report, a set of claims to verify, not evidence:
  `.runs/task-cycles/porzadki-przed-pierwsza-mapa/reports/author-report.md`. The author handoff is
  `reports/author-handoff.md` beside it (the author's instructions and the choices left to it).
- There is no spec and no plan: one author without a plan, so every item of the task is yours to
  judge, and each row of *Settlements to record* (rows 1–4) and the change to D-06 that the task
  names.

## Answers of the cycle's step 4

Trust boundary touched: **no**. Irreversible operation: **no**. Do not treat a test file's change as
out of your reach: review it for the guideline `guidelines/testing.md` too.

## You select your own foundation and guidelines

By "Reading the foundation" in `.the-way/elements/common/way_of_working.md` and
`.the-way/product-guidelines/reading.md`: the parts the change touches are `browser-view`,
`simulation`, `build-tools`, `agent-workflow` (the guidelines), `product-foundation`. The product's
`AGENTS.md` lists what is read before changes of product code, tests and the part `browser-view`.
Count in your report how many decisions you read whole and how many by title only.

## A gap of the author's reading you must close

The author's report lists as **not read beyond the fragments quoted in the task**: decisions **D-73**
(and its departures D-74…D-273 that bear on a test), **D-181**, **D-264**, **D-265**, **D-268**;
`guidelines/styleguide-browser-view.md` read in part; several changed test files read in part. Read
those decisions whole yourself, and judge against them: the number field's behaviour (D-181, D-265:
the DOM form and the React form draw the same tree; an invalid entry keeps the previous count and
shows the message), the helpers added to the harness `tests/view/page-document.mjs` (D-264, D-268),
the testing rule written to `guidelines/testing.md` and the style of the tests (D-73).

## Points the cycle asks you to judge, besides the whole review

1. **Source fidelity of the foundation entries** to rows 1–4 of the task and to the change of D-06
   (D-393, D-394, D-395, the invariant `simulation-type-check`, the part map line, the edit of D-06
   and the *Derives from* of `simulation-isolation`): whether each keeps the meaning of its row,
   whether D-393's and D-395's *Rejected* hold what the row's source keeps (D-395's is `unknown`),
   and whether anything the task did not settle was invented.
2. **The breadth of To do 4.** The task names the parameter `_map` at two places in
   `src/browser/sim/program.ts`; the author removed the unread map parameter from the whole chain of
   functions that passed it on (`judgeProgram`, `chooseActivity`, `chooseCombatRule`,
   `actionFeasible`, `resolveCombat`, `startActivity`, `pickActivity`, …) and changed a test of the
   invariant `simulation-inputs` (`tests/invariants/test_simulation_inputs.py`) for the new
   signatures. Judge whether that is within the task's words („Z wyboru reguły programu w symulacji
   znika parametr z mapą, którego żadna funkcja nie czyta”), and whether any removed parameter is in
   fact read.
3. **Acceptance criterion 2.** The author's trial with a made-up map and item first in the data
   found 10 failing cases; three editor cases depend on the product's default (the first item of the
   data) for a new „Zapas poniżej” condition. The cycle's answer is that this is the product's
   behaviour and a design choice the task does not carry; it goes to the human at the request. Grade
   it as you hold right and say where it belongs.
4. **The criterion that nothing the player sees changes**, above all the number field of the trip
   list (the author folded two commit branches into one in
   `src/browser/view/controls/react-number-field.tsx`).
5. **Item 1's completeness**: search the tests yourself for any remaining pick of a map, item,
   resource or archetype by its place in the game data, in every shape the line can take, in
   `tests/` of every level, and say what you searched.
6. **Item 8**: the new configuration `tsconfig.sim.json`, its run in `scripts/build.mjs`, and the new
   invariant test `tests/invariants/test_simulation_type_check.py` — whether it can fail for the
   right reason, and whether the part map's claim of the new files is complete.

## Checks

The orchestrator runs the product's gate itself (`npm test`) after the reviews; do not run it. You
may run focused checks (single test files with `python -B scripts/test.py <file>`, `npm run
typecheck`) and a mutation run of a changed simulation file only if you find it needed; report each
with command and exit code.

## Report

Write your full report to
`.runs/task-cycles/porzadki-przed-pierwsza-mapa/reports/review-whole-report.md` as the method gives
it. The first line is `PASS <sha>` or `FAIL <sha>`. It carries, as the method says, the grades, the
Minor findings of the whole change within the task listed separately from findings outside its
scope, **Unread material** and **Searches not found or unclear** (each `none` where it is). Return
the status line, the checks, and the report path.
