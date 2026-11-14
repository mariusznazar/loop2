# Handoff — the review of the whole change, `review-change`

## What is reviewed

- The whole change of the task, as the reviewer who did not make any of it.
- Worktree: `the repository root`, branch `task/krotsza-bramka-procesu`.
  Work from its root, read-only (you write only your report and, in your own directory, working copies).
- Base: `2a8645d46c50b23437ad824d1e7969ee760d05f1` (`origin/main` at the start). Head: `4ffd7b04`.
  The range is `git diff 2a8645d4..4ffd7b04`; it holds three commits: `6b4487d1` (the move of the pin of
  the-way to `ec7929d02164c8754f0236d93db52624688967e6`), `cb617b4c` (the foundation entries D-405 and
  D-406) and `4ffd7b04` (`--jobs 1` in `scripts/test.py` and the test that pins it).
- Method: `.the-way/task-cycle/review/SKILL.md`, whole; for this review read
  `.the-way/task-cycle/review/whole_change.md` as that file says. You have no skill tool; every method
  of the-way is a file you read. You select your own foundation and guidelines by the parts of the
  change, as your method gives.
- Report path: `.runs/task-cycles/krotsza-bramka-procesu/reports/review-whole-report.md`. Your directory
  for working copies: `.runs/review-whole/`.

Copied word for word from the cycle's rules for working copies:

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## What the cycle gives you

- The frozen task (read it whole): `.runs/task-cycles/krotsza-bramka-procesu/task.md`. The task is in
  Polish; the entries and the code are in English. No spec and no plan exist (one author, no plan).
- The author's report, a set of claims to verify, not evidence:
  `.runs/task-cycles/krotsza-bramka-procesu/reports/author-report.md`. It is the only report of the
  change; no slice had a review of its own, so you judge the whole.
- Answers of the start of the cycle: the change touches no trust boundary and holds no operation that
  cannot be undone. Its parts: `build-tools` (`scripts/test.py`, `tests/quality/**`),
  `product-foundation` (`foundations/decisions.md`), `agent-workflow` (`.the-way`, `.gitmodules`,
  `.claude/agents/**`).
- The task moved the pin (the commit `6b4487d1`). By the cycle's rules that commit holds only the
  gitlink at `ec7929d02164c8754f0236d93db52624688967e6` and what the installer of the pinned the-way
  owns (here: the two files `.claude/agents/the-way-stage.md` and `.claude/agents/the-way-author.md`;
  no entry point changed, `AGENTS.md` unchanged). Check that it holds nothing else.
- The checks the move of the pin carried: the orchestrator ran the whole gate (`npm test`) on
  `6b4487d1` three times, the Python directories at the same time (the default of the pinned
  process's script). Each time exactly two tests failed, in
  `tests/quality/test_docker_gate.py` `GateRuns`: `test_one_run_of_the_whole_gate_waits_for_a_docker_that_does_not_rise_once`
  and `test_a_whole_run_that_finds_docker_stopped_starts_it_once_and_skips_nothing`, both
  `2 != 1`. 588 tests in 4 directories; nothing else failed. Logs:
  `.runs/task-cycles/krotsza-bramka-procesu/reports/gate-pin-run1.log`, `gate-pin-run2.log`,
  `gate-pin-run3.log`; the same file run alone, unchanged and with `--jobs 1`:
  `diag-jobs1-A.log`, `diag-jobs1-B.log`. Total times 1117.6, 1099.4 and 1176.3 s; the earlier
  measurement of the gate with the directories one after another was 23.0–28.0 min (the frozen task,
  *Context*). The tests failing on the base: none (the final gate of the merged earlier cycle was
  green).
- The cycle skips nothing else; the orchestrator runs the whole gate after the review and the return
  step. Do not run the whole gate (`npm test` without an argument). Run focused checks yourself where
  you need them, each with its command and exit code in your report.

## What to look at, besides your method's own list

- Source fidelity of the two decisions against the frozen task: D-405 must carry settlement row 1 and
  question 1; D-406 must carry point 3 and question 2 — nothing more, nothing the sources do not give.
  Every fact in them (numbers, names of tests, the mechanism in `scripts/docker_gate.py`) must be
  checked against the logs and the code; a claim you cannot check is a finding.
- That the change does what point 3 and the acceptance criterion require: `scripts/test.py` gives
  `--jobs 1` to the process's runner, the stages and their order stay, `scripts/docker_gate.py` is not
  changed, D-77, D-83, D-49, D-73 and D-28 are not changed.
- That the test that pins the argument fails without the argument and does not weaken the other tests
  of the gate; that the change of `tests/quality/gate_fixture.py` breaks no other user of it.
- The decisions of the product that the change touches by topic and that the author read only in
  quotation (D-83, D-49, D-73, D-28) and the part-map entries `agent-workflow` and `product-foundation`
  are yours to select and read, as your method says.
- Everything the change should have updated and did not (the foundation, `README.md`, guidelines),
  within the task's scope.
