# Handoff — fix of the whole-change review's finding, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You fix
the blocking finding of the review of the whole change with the project skill
**`the-way-make-change`** (its fix role; read its method and what it names, whole). The finding comes
from no slice, so you are a fresh agent on the branch. Fix it, rerun the affected checks, and answer
with evidence if you hold the finding wrong. Fix nothing else: the Minor and out-of-scope findings of
the review are not fixed. Commit by explicit paths. Return `done`, `done with concerns`, `questions`,
`returned` or `blocked`; questions go to the orchestrator in your report, never to the human.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`; the
  reviewed head and your base: c8260e6f3cda1a22a7fc83adfdfba85df99f8b3b.
- Findings to fix (in the reviewer's words): `.runs/task-cycles/ognisko-i-jedzenie/reports/21-whole-fix-findings.md`.
- The full review: `.runs/task-cycles/ognisko-i-jedzenie/reports/20-whole-review-report.md`.
- Frozen task: `.runs/task-cycles/ognisko-i-jedzenie/task.md` — read *Decisions in play* (lines
  99–132) and *To do* 6 (line 21); spec `.runs/task-cycles/ognisko-i-jedzenie/spec.md`, Decision 1
  step 4 (renewal) and *Units* 1 and 3.
- Write your report to `.runs/task-cycles/ognisko-i-jedzenie/reports/22-whole-fix-report.md`; every
  check with its command and exit code.

## Answers of step 4

- Trust boundary: yes — `assets/icons/**`; not touched by this fix.
- Irreversible operation: no.

## Read

`foundations/decisions.md` D-18 (380–398), D-24 (516–541) and D-60 „How does a tile's stock renew?”
(1109–1123); `foundations/invariants.md` `map-run-tiles` (279–290), `map-run-layout` (379–389),
`content-identifiers` (222–233); `guidelines/coding.md`, `guidelines/coding-content-data.md`,
`guidelines/coding-simulation-module.md`; `src/browser/sim/data/maps.ts`,
`src/browser/sim/data/resources.ts`, `src/browser/sim/world.ts`, `src/browser/sim/layout.ts`,
`tests/sim/world.test.mjs`, `tests/sim/data.test.mjs`.

Checks to run after the fix: `npm run build`; `npm run typecheck`; the new test first failing, then
passing; `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`; `python -B -m unittest
discover -s tests/invariants -p <file>` for `test_map_run_tiles.py`, `test_map_run_layout.py`,
`test_content_identifiers.py`, `test_minute_span_split.py`; `python -B -m unittest discover -s
tests/quality -p test_quality_invariants.py -k eslint -k prettier`;
`python -B .the-way/elements/common/foundation_check.py`. On this machine Ruff, ShellCheck and Docker
are absent; `tests/invariants/test_loop2_one_serving_process.py` fails already on the base.
