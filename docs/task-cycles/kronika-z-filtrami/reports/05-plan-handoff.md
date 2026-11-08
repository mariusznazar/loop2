# Handoff 05 — the planner (stage: plan-task)

You are the planner of one task of a the-way cycle. You write `plan.md` and its size report
`plan-size.md`; you write no code, no test and no foundation entry, you run no test or other check
of the product, and you return before any slice is made.

## Delegation

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator
(Sonnet 5.5), who delegates to you the division of the change. Questions go to the orchestrator in
your report (status `questions`), never to the human. Never widen the task. An answer from the
orchestrator is never the human's approval.

## Where you work

- Worktree (work from its root): `the worktree root`, branch
  `task/kronika-z-filtrami`, base `6f36c7ab998ceaf996afb617ca95881b3f007b2d`. It is clean; change no
  tracked file. Pinned the-way: `.the-way` at `294af7f`; use no personal skill of the same name
  without the `the-way-` prefix.
- Method: `.the-way/task-cycle/plan/SKILL.md`. The size script is `.the-way/task-cycle/slice_size.py`.
- Plan path: `docs/task-cycles/kronika-z-filtrami/plan.md`; size report:
  `docs/task-cycles/kronika-z-filtrami/plan-size.md`; your report:
  `docs/task-cycles/kronika-z-filtrami/reports/05-plan-report.md`.
- Frozen task, read whole: `docs/task-cycles/kronika-z-filtrami/task.md` (sha256 prefix
  cd12745e0f8566f7), Polish.
- The reviewed spec, read whole: `docs/task-cycles/kronika-z-filtrami/spec.md`. Its review passed
  (`reports/04-spec-revision-review-report.md`). It binds where it settles more than the task; the
  task binds where they differ. Do not reopen its design.
- The spec's own remark on slicing: the two events of the simulation (its D1) can come first and
  stand alone. It is a remark, not a rule.

## Answers of step 4

- Trust boundary: no. The files of the boundary (`src/browser/sim/saved-game.ts`, `assets/icons/**`,
  `assets/fonts/**`, `assets/sprites/**`) are not touched. Mark every slice's *Risk* `none`.
- Irreversible operation: no.
- Route: planned slices, because the change crosses `simulation` and `browser-view`, writes about
  ten foundation entries and two guideline changes, and the browser check; the spec's *Left to the
  maker* asks for a plan.

## What the plan must also carry

- The cycle's foundation step comes first as the plan's *Foundation entries*: the entries the spec's
  *Foundation entries* lists, with the "to check" bullets (D-122 rationale, D-185, D-272, D-276,
  D-311 rationale and rejected), the entries of the task's *Decisions in play*, and the rows of
  *Settlements to record* the task accepted (rows 1, 2, 3, 4, 7, 8, 9, 10, 14). Name for each entry
  the element skill that writes it (`the-way-record-decision`, `the-way-record-invariant`,
  `the-way-record-glossary-term`, `the-way-update-part-map`, `the-way-record-environment-fact`)
  and the order. Look at `.the-way/task-cycle/skill/foundation_step.md` only as far as you need to
  list the entries; the agent that writes them reads it whole.
- The guideline changes of the task's To do 11 and 12 — `guidelines/styleguide-browser-view.md`
  through `the-way-maintain-styleguide`, and the file tables of `guidelines/coding-browser-module.md`
  and `guidelines/coding-simulation-module.md` through `the-way-maintain-coding-guidelines` — are
  slices or parts of slices of their own, after the code they describe, each naming that skill.
- The tests the spec's D11 makes necessary, by slice, with focused checks that
  `scripts/test.py` or `npm test -- <file>` can run for one file; no slice runs the gate.
- The acceptance criterion (task, question 10): the check in a real browser at 1× and 16× with
  screenshots is a step of a slice whose executor reads `.claude/skills/loop2-play/SKILL.md`
  (the product's `AGENTS.md` names it). Say which slice carries it and what it records.
- Existing tests that compare whole event lists or expect the paragraph in the world area change
  where the spec says so (spec D11); give them to the slice that makes them untrue.

## What to read

Foundation entries of `foundations/decisions.md`, each whole: D-04, D-39, D-46, D-122, D-131,
D-132, D-133, D-147, D-171, D-173, D-174, D-185, D-206, D-207, D-212, D-216, D-255, D-272, D-276,
D-283, D-291, D-292, D-308, D-309, D-311, D-312, D-316, D-324, D-334, D-335, D-336, D-337.
Invariants: `simulation-isolation`, `simulation-inputs`, `save-version`, `streak-program-change`,
`rule-state-from-pick`, `content-identifiers`, `saved-program-edit`. Glossary
(`foundations/glossary.md`), the terms the entries use. The part map entries `browser-view`,
`simulation`, `agent-workflow` and `product-foundation`.

Guideline files, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`,
`guidelines/coding-simulation-module.md`, `guidelines/testing.md`,
`guidelines/styleguide-browser-view.md` (with its order-of-work example), `src/browser/AGENTS.md`.
Name in your report what you find missing or uncertain in the guidelines.

The code and the tests the spec's D10 and D11 name. Read them to cut slices, not to design.

## What the plan holds

As `plan-task` gives: *Foundation entries*, *Slices* (each with *Change*, *Read*, *Checks*,
*Model*, *Risk*, and the rest the method names), *Choices*, *Coverage* of every To do item, every
row of *Settlements to record* and every projected entry the task carries. Every slice's *Read*
names the foundation entries by identifier, the guideline files whole and the passages of the task
and spec it needs. Run the size script as the method says and keep its report. Your report holds
your status, the paths, every reach beyond this handoff, and **Searches not found or unclear**.
Return your status, the plan path and the report path in one short message.
