# Handoff — one author, task `plomyk`

## Delegation

The human (Mariusz) started this the-way task cycle with `/the-way-implement-task` on the task
document below and delegated every intermediate choice to the cycle's orchestrator. No answer of the
orchestrator is the human's approval; the human decides at the pull request. Send questions to the
orchestrator in your report (status `questions`), never to the human.

## What you make

You make **the whole change as the one author** (the row of that name in the variant table of your
method). You also do the cycle's foundation step with your code, and return before review.

- Method: read `.the-way/task-cycle/change/SKILL.md` whole, from the worktree below, and follow it.
  Read a file it names, one beside it included, only when the step or variant that names it comes.
- Foundation step: read `.the-way/task-cycle/skill/foundation_step.md` whole and follow it; write
  each entry through its element's skill — the project skills `the-way-record-decision`,
  `the-way-record-invariant`, `the-way-record-glossary-term` (and `the-way-update-part-map` or
  `the-way-record-environment-fact` only where the change needs them), never an unprefixed
  personal skill of the same name.
- Class of model: `same` as the orchestrator (Opus 5.5).

## Worktree, branch, commits

- Worktree: `C:\Storage\repos\loop2-wt\plomyk` — work from its root; every `.the-way` path in
  this handoff is inside it.
- Branch `task/plomyk`. Base of the task: `b8ac134` (`main`). The branch's first commit `1d25143`
  moves the-way's pin from `3aee7d9` to `a8dfe8a`; it is the orchestrator's, holds only the gitlink
  and the installer's entry points, and no commit of yours changes or reverts it.
- Commit by explicit paths (`git add <path> …`, never `git add -A`, `git add .` or `git commit -a`),
  messages in English in the form of the repository's commits (`feat: :sparkles: …`,
  `fix: :bug: …`, `test: :white_check_mark: …`, `docs: :memo: …`). Do not push.
- `.runs/` is ignored. `.runs/quality-venv` holds ruff 0.17.1 and ShellCheck 0.11.0 for
  `tests/quality`; do not delete it.

## Task

- Frozen task document, read whole: `.runs/task-cycles/plomyk/task.md` (copy of
  `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\plomyk_loop2.md`, accepted
  2026-10-29; it differs from the accepted version only in its `Status:` line).
- No spec: the orchestrator found no open design choice. Its reading of the *Questions carried to
  cycle*, which binds you:
  1. Where the numbers of nature energy and the price of Płomyk stand, and where the run state holds
     the energy, is yours to choose as a choice of how to make what D-18 settles (content and its
     numbers in data files). Name your choice in the report.
  2. The wording of the changed D-63, D-71, D-121, D-141 and the *Scope* of the projected entry
     “What does a mage pay for spells with?” is yours in the foundation step, keeping the meaning
     of the answers under *Questions to settle* and of the accepted rows of *Settlements to record*,
     under the wording rule of Q8 (no word that excludes an alternative in a new or changed
     sentence; the projected entry keeps its approved wording).
  3. Task 16 zapis-stanu-na-serwerze is not merged; nothing of the save format changes.
- Should you meet a choice the task and the foundation leave open (a different way of doing what
  they do not settle, which would bind later work), return `returned` with a report and no code, as
  your method gives.

## Answers of step 4 (two questions at start)

- Trust boundary: no — the only boundary in the parts you touch is `assets/icons/**` and
  `assets/fonts/**` of `browser-view`.
- Irreversible operation: no.

## What the pin move carried

The gate on `1d25143` — see the section **Checks the pin move carried** at the end of this file,
which the orchestrator fills before your dispatch. On the base `b8ac134` no check fails once
`.runs/quality-venv` is in place.

## Parts and what to read

Parts the change touches: `simulation`, `browser-view`, `product-foundation`
(`foundations/part_map.md`, read the entries of these three whole).

Guidelines, each whole:
- `guidelines/coding.md`
- `guidelines/coding-content-data.md` (data files of simulation)
- `guidelines/coding-simulation-module.md` (simulation modules outside data)
- `guidelines/coding-browser-module.md` (the body row in `src/browser/view/`)
- `guidelines/styleguide-browser-view.md` (the body row is user interface; read its example of the
  order of work as an example)
- `guidelines/testing.md`
- `src/browser/AGENTS.md`

Foundation entries by identifier, each whole (heading to next heading):
- Decisions of the task's *Decisions in play*: D-18, D-23, D-60, D-62, D-63, D-71, D-80, D-82,
  D-118, D-119, D-120, D-121, D-122, D-125, D-128, D-140, D-141, D-144.
- Decisions the change reaches beside them: D-61, D-65 (the form row 3 of *Settlements to record*
  follows), D-93, D-123, D-124, D-136, D-142, D-143, D-150. Where you change a decision, also read every decision whose *Relations* names it.
- Invariants: action-in-progress, program-rule-pick, program-closed-lists, map-run-repeatability,
  simulation-inputs, simulation-isolation, content-identifiers, restart-seed, minute-span-split,
  streak-program-change.
- Glossary: the entries of the terms your change uses in `foundations/glossary.md`, and of
  the-way's glossary at the pinned commit (`.the-way/foundations/glossary.md`) for process terms.

Passages outside the repository you may need (read-only; never write outside the worktree):
- The plan item: `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\plan_mvp_loop2.md`,
  row 9 and the change-log entries the task cites.
- The projected entry in `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`,
  „(new) — What does a mage pay for spells with?” (line 1624).
- The measurement of task 8: `git show 1933a3f:docs/task-cycles/walka-w-glebi-lasu/reports/measurement-20-seeds.md`
  and its script `git show 1933a3f:docs/task-cycles/walka-w-glebi-lasu/reports/measurement.mjs`.

## Outputs the orchestrator needs from you beyond the code

- *To do* 7: what the program of `tests/sim/acceptance.test.mjs` changed and why, or that it did not
  change; where no well-built program within the closed lists survives with the numbers of Q2,
  return `blocked` with that evidence instead of changing the numbers.
- *To do* 8: run the task-8 measurement — the same program, seeds 1–20, on Las — głębiej — with the
  Płomyk price in nature energy, and write it to
  `.runs/task-cycles/plomyk/reports/measurement-20-seeds.md` with its script beside it: for each
  seed, the outcome and minute of death after the change beside the result before it (from the
  task-8 report), nature energy in that minute, and how many times the program passed over a
  „Zapal” rule for lack of energy. No threshold applies.
- Foundation entries written, each by identifier with one sentence of its meaning in Polish, and
  for each row 1–9 of *Settlements to record* the entry that carries it.
- Do not run the product's full gate (`npm test`); the orchestrator runs it. Run the focused checks
  your method gives, each with its command and exit code.

## Report

Write the full report to `.runs/task-cycles/plomyk/reports/02-author-report.md`, as your method
gives it, including **Searches not found or unclear**. Return: status, commits, a one-line check
result naming what failed or did not run, and the report's path.

## Checks the pin move carried

None. `npm test` on `1d25143`: exit 0 — node 770/770 pass, `.the-way/gate/run_tests.py` 315
tests in 4 directories all passed, `foundation_check.py` 0 errors
(`.runs/task-cycles/plomyk/reports/gate-pin-1d25143.log`). The move breaks no check, so the task
carries no work from it.
