# Handoff — the return step

You are the one author, resumed, to take **the return step** (step 11 of the cycle). It is no row
of `make-change`'s table. Read `.the-way/task-cycle/skill/return_step.md` whole, and
`.the-way/task-cycle/skill/foundation_step.md` whole, since the return step writes as the foundation
step writes. Each entry you write or change goes **through the project skill of its element**
(`the-way-record-decision`, `the-way-record-invariant`, `the-way-update-part-map`,
`the-way-record-glossary-term`, `the-way-record-environment-fact`): invoke the skill, do not write an
entry by hand — an earlier edit in this cycle was written by hand and the product's `AGENTS.md`
forbids that.

- Worktree `the task's worktree`, branch
  `task/porzadki-przed-pierwsza-mapa`, head `b6b4bbffd655c0142ed03060c352d81bd360c032` (the whole change
  and its fix, both reviewed `PASS`).
- Compare with the code, at that head: the entries the change wrote or changed (D-393, D-394, D-395,
  D-06, `simulation-type-check`, `simulation-isolation`, the `build-tools` part-map entry); the entries
  of the task's *Decisions in play* (D-04, D-06, D-73, D-181, D-264, D-265, D-268,
  `simulation-isolation`); the part map of the touched parts; and what the search of the whole
  foundation finds for: the shared helpers `press` and `fire` now exported by the harness
  `tests/view/page-document.mjs` (D-264 lists what that harness does and D-268 what a test file takes
  from it: does either no longer match the code?), the number field and its `rule` function (D-181,
  D-265, D-395), the rename of `right-area` to `tabs-area` (the glossary and any decision naming the
  module), the removed factories `createTripPlan`, `createRuleList`, `createRulePanel`, the removed
  map parameter of the rule pick, `tsconfig.sim.json`.
- Correct in this change what no longer matches. Choices that bind after the merge (WAY-36): the
  three the cycle's record holds — the name `tabs-area`, the place and one form of `press`/`fire`
  in the harness, the `NumberRule` shape of the number field — are yours to judge by the rule of
  the return step: a choice that binds later is a decision or an invariant entry unless the task
  excludes it; the task excludes none of them. Write what the rule asks, no more, and say in the
  report why where you write none.
- Do not touch code beyond what an entry's correction needs; a correction of a test or code goes to
  your report, not to the tree, unless the task's own change is wrong. Run `python -B
  .the-way/elements/common/foundation_check.py` (exit 0 is required) and name each command with its
  exit code. The orchestrator runs the whole gate.
- Commit by explicit paths in the form of this branch's commits, in English. If you write nothing,
  commit nothing and say so.
- Report: `.runs/task-cycles/porzadki-przed-pierwsza-mapa/reports/return-step-report.md` with the
  fields of the record's *Return step* (foundation compared with code, decisions, invariants,
  environment facts, glossary terms, part-map changes, projected entries, rows written), **Unread
  material** and **Searches not found or unclear**. Return the status, your commits, a one-line
  check result and the report path.
