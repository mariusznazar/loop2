# Handoff — review of the return step, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You
**review the return step** as an agent that made none of it, with the project skill
**`the-way-review-change`** (read its method and what it names, whole). Read only; write nothing but
your report, first line `PASS <sha>`, `FAIL <sha>` or `questions`. Questions go to the orchestrator.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`.
- Range: `4dc4ca442f963e490db204d332495473c0f478f0..105e4b9` (commits 589ee33, 105e4b9;
  `git rev-parse 105e4b9` for the full SHA).
- What the return step is (read whole): step 11 of `.the-way/task-cycle/skill/SKILL.md` and the
  paragraph beginning "The foundation step writes the entries the task carries".
- The return step's handoff: `.runs/task-cycles/ognisko-i-jedzenie/reports/24-return-step-handoff.md`;
  its report: `.runs/task-cycles/ognisko-i-jedzenie/reports/24-return-step-report.md`.
- Frozen task (read whole): `.runs/task-cycles/ognisko-i-jedzenie/task.md`; spec
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md`; plan `.runs/task-cycles/ognisko-i-jedzenie/plan.md`.
- Write your report to `.runs/task-cycles/ognisko-i-jedzenie/reports/25-return-review-report.md`.

Review the range against the task and against the entries the return step writes or corrects (D-23,
D-60, D-62, `action-in-progress`, `player-map-run-pace`, glossary `free game minute`, new term
`extinguished campfire`, the docstrings of `tests/invariants/test_action_in_progress.py` and
`tests/invariants/test_player_map_run_pace.py`), each entry against the code at the head: does it
say what the code does, does it keep the meaning the task's rows and the human's rule for MVP
candidates (task, *Context*) give, does an invariant change only where a rule the task, a decision or
the human sets calls for it (WAY-03: an altered invariant test goes before the human at the merge).

## Answers of step 4

- Trust boundary: yes — `assets/icons/**`; not touched by this range.
- Irreversible operation: no.

## Known

`main` holds task 11's D-50–D-56; this branch's D-50–D-65 will be renumbered at the reconciliation
with `main` — not a finding of this range. The return step's concern 1 (task 8's projected entry
"What is a map made of?") is settled by the orchestrator: a plan member writes only the projected
entries its plan item assigns (`implement-task`, paragraph of the foundation step), and that entry is
task 8's.
