# Handoff 18 — review of the return step's commits (stage: review-change, the return step)

You review the commits of the return step of a the-way task cycle, as an agent that made none of the
change. You are read-only: you change no tracked file; you write only your report. You may run the
foundation check and focused checks that modify no tracked file.

## Where you work

- Worktree (work from its root): `the worktree root`, branch
  `task/kronika-z-filtrami`. Pinned the-way: `.the-way` at `294af7f`; use no personal skill of the same
  name without the `the-way-` prefix.
- Method: `.the-way/task-cycle/review/SKILL.md`; the return step's commits are reviewed as its section 2
  gives, against the task and the entries the return step writes or corrects.
- Range to review: base `621d1448…` (the reviewed head of the code; `621d144843f24b5c7fac93f321be1ccf1841dda5`) to
  head `638e89e` (check `git rev-parse HEAD` reads `638e89e…`). Compute the diff yourself:
  `git diff 621d144..638e89e` and `git log 621d144..638e89e`. Two commits: `f71a388` (an environment fact and
  D-347's *Based on*) and `638e89e` (D-348).
- Your report: `docs/task-cycles/kronika-z-filtrami/reports/18-return-review-report.md`; its first line is
  `PASS 638e89e` or `FAIL 638e89e`.

## What the return step is, and what it claims

The return step (`.the-way/task-cycle/skill/return_step.md`, read it) compares with the code the entries the
change writes or changes, the entries the task names and those a search of the foundation finds, and the part map,
and corrects whatever no longer matches; it writes environment facts, glossary terms, a projected entry the
foundation step missed and a choice that binds after the merge; it writes an invariant only for a rule the
task, a decision or the human sets. Its report: `docs/task-cycles/kronika-z-filtrami/reports/17-return-report.md` — a set of
claims to verify, not evidence. It claims: nothing it compared no longer matched the code at `621d144`;
it wrote one environment fact (`playwright-cli-console-messages`), changed D-347's *Based on* to name it,
and wrote one decision, D-348, marked `the cycle's`; it wrote no invariant, glossary term or part-map entry.

## What to judge

1. Whether the entries the return step wrote or changed follow their templates and rules
   (`.the-way/elements/decisions/`, `.the-way/elements/environment-facts/` or wherever their `template.md`
   and `rules.md` stand — find them from the element skills in `.claude/skills/the-way-record-decision` and
   `…-record-environment-fact`), say what the code does and what the task and the reviewed spec settle, and
   invent nothing (WAY-172): D-348's binding sentences, *Relations*, *Verification* examples, *Rationale*,
   *Rejected* and *Origin*, against the spec's D1 and D4 and against the code at `621d144`
   (`src/browser/sim/run.ts`, `body.ts`, `programs.ts`, `src/browser/view/chronicle.ts`,
   `chronicle-entries.ts`, `game-view.ts`).
2. The environment fact: the source and the quoted line it cites, whether a fact of that kind is warranted by
   the template's "Which facts are written", and whether D-347's *Based on* may name it. (The report says the
   cited README was fetched and the collapsed passage found once; you may fetch the cited address to check.)
3. Whether the return step missed something it should have compared or written: any claim of an entry the
   change writes or changes that the code at the head falsifies; a row of *Settlements to record* or a projected
   entry the code makes true that no entry holds; a choice that binds after the merge written as an entry or
   rightly left as a row of the questions table (the report's section 5 lists its five rows).
4. That nothing outside `foundations/` changed and `python -B .the-way/elements/common/foundation_check.py`
   exits 0 on the head.

The out-of-scope Minor findings and open points the orchestrator keeps for the human are not for you to
fix or reopen: the whole-change review's finding 2 (D-346 and a load) stays a question for the human.

## What to read

The foundation entries by identifier, each whole: D-348, D-347, D-254, D-253, D-323, D-04, D-341, D-342,
D-344, D-147, D-338, D-339; the environment fact `playwright-cli-console-messages` and its neighbours
`playwright-cli-*` in `foundations/environment_facts.md`. The reviewed spec
`docs/task-cycles/kronika-z-filtrami/spec.md` (D1, D2, D4) and the task `docs/task-cycles/kronika-z-filtrami/task.md`
(*Decisions in play*, *Settlements to record*). Where you need more, search for it and read the passage; name
each reach in your report.

## What the report holds

As `review-change` gives: the first line, graded findings (Critical, Important, Minor) each with its place, why
it matters and whether it is outside the task's scope; the checks you ran with command and exit code; every
reach beyond this handoff; and **Searches not found or unclear**. Return the report's first line and its path in
one short message.
