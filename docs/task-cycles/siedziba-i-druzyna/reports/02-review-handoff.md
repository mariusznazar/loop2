# Handoff — review of the whole change, task cycle `siedziba-i-druzyna`

## Delegation

Mariusz (the product's owner) started this task cycle with `/the-way-implement-task` and delegated
the cycle's intermediate choices to its orchestrator. You review as an agent that made none of the
change. Read-only: change no file, make no commit. Questions go into your report for the
orchestrator, never to the human.

## Where and what

- Worktree: `C:\Storage\repos\loop2-wt\siedziba-i-druzyna`, branch `task/siedziba-i-druzyna`.
- Range to review: `a945cf1d4c62e8cdac222a7de47277c08a77b2c5..24bbc2d` (the task's base to the
  head) — commits `53b30d0` (code and tests) and `24bbc2d` (foundation entries). The foundation
  entries are part of the range.
- Method: the project skill `the-way-review-change` (`.claude/skills/the-way-review-change/SKILL.md`
  in the worktree, reading the pinned `.the-way` at `86b78ad`). Read it whole, with what it names,
  and review the **whole change** of a one-author route (no plan, no slices, no spec).
- Select your own foundation entries and guidelines, by the parts of the change ("Reading the
  foundation" in `.the-way/elements/common/way_of_working.md`; `.the-way/product-guidelines/reading.md`).
- Frozen task (read it whole): `C:\Storage\repos\loop2-wt\siedziba-i-druzyna\.runs\task-cycles\siedziba-i-druzyna\task.md`.
  It is task 11 of the plan `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\plan_mvp_loop2.md`;
  its projected entries stand in `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`
  („#### (new) — Whose is the chest?”, lines 1508–1537; „#### character-team/1”, lines 2118–2127).
  The definition lets tasks read from `C:\Storage\repos\loop` only its data files and tests.
- Author's report: `C:\Storage\repos\loop2-wt\siedziba-i-druzyna\.runs\task-cycles\siedziba-i-druzyna\reports\01-author-report.md`,
  with its logs and screenshots `reports/01-author-*` beside it. The orchestrator's mechanical check
  passed: worktree clean, range non-empty (45 files), every check with its command and exit code.
  Information for you: the change touches `guidelines/coding-browser-module.md` and
  `src/browser/sim/data/archetypes.ts`, which the author's handoff did not name (the report's
  *Reaches* gives why).
- Base gate on `a945cf1`: `npm test` exit 1 only for `tests/invariants/test_loop2_one_serving_process.py`
  setUpClass (`Get-NetTCPConnection` finds no listeners on this machine); container tests skip
  without Docker (`reports/00-base-gate.log`). The orchestrator runs the full gate after your review;
  you need not run `npm test` whole.

## Answers of the cycle's start (step 4)

- Trust boundary: **no** — the change touches `simulation`, `browser-view`, `product-foundation`
  (and one guideline file of `agent-workflow`); none of their trust-boundary files. If you find a
  changed file the part map names as a trust boundary, say so as a finding.
- Irreversible operation: **no**.
- Open design choice: none found at start; the task's *Settlements to record* rows 1–6 and the
  projected entries settle every entry.
- Carried question: task 4 `ognisko-i-jedzenie` is not merged; by *To do* 6 the change adds no
  carrying capacity.
- Wording principle for entries from MVP choices (task, *Context*): an entry says what the game does
  now, begins „In the MVP”, and holds no words that exclude an alternative („only”, „never”,
  „always”, „without” and the like).

## Report

Write your full report to
`C:\Storage\repos\loop2-wt\siedziba-i-druzyna\.runs\task-cycles\siedziba-i-druzyna\reports\02-review.md`,
its first line `PASS <sha>`, `FAIL <sha>` or `questions` as `review-change` gives. For each
blocking finding name the place in the code. Every check you ran carries its command and exit code.
Return a short message: the first line, the counts of blocking, Minor and out-of-scope findings,
a one-line check result, and the report's path.
