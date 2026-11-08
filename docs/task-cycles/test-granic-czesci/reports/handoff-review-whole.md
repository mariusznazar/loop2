# Handoff — review of the whole change (review-change)

Delegation: the person who requested the cycle delegated intermediate choices to the orchestrator;
nothing here is the human's approval. You are read-only: change no file of the worktree except your
own report.

- Worktree: `the root of the task's worktree`, branch `task/test-granic-czesci`. Work
  from its root.
- Method: `review-change` at `.the-way/task-cycle/review/SKILL.md` of this worktree (process root
  `.the-way`, pin `294af7fde45323ac1851c014a03071a97fc38d96`). Read it whole, and a file it names
  only when the step or variant that names it comes.
- Variant: **the whole change**.
- Range: base `72287c2bd00c411929354bdb95949537adeb6dca` to head
  `628bd1bb74de5ef90128bde7066c48fcb51b5d4b` (4 commits: `c3e27c7`, `30afe4d`, `d858d14`, `628bd1b`).
  Route: one author without a plan, no slices, no spec; the process pin did not move.
- Frozen task (read whole): `docs/task-cycles/test-granic-czesci/task.frozen.md`. Author's report
  (read whole): `docs/task-cycles/test-granic-czesci/reports/report-author.md`. Its author wrote
  the report as returned text because its tool refused the file; the orchestrator saved it.
- Answers to the cycle's start questions: trust boundary — no (no trust-boundary file of the part
  map is changed); irreversible operation — no. No earlier review exists (no slices).
- You select your own foundation entries and guidelines, by the parts of the change (`simulation`,
  `browser-view`, `build-tools`, `product-foundation`, `agent-workflow`, and the new part
  `test-helpers`), and the guidelines `guidelines/coding.md` and `guidelines/testing.md`.
- Check coverage of every task item (To do 1–6), every settlement row (1–3) and the answers to
  questions 1–6, and source fidelity of the written foundation entries against the task (the
  `simulation-isolation` sentence must be verbatim; D-351's *Rejected* must hold the task's
  *Not chosen* ways).
- Points the author's report leaves for the reviewer, judge them: (a) the invariant's *Rests on*
  reads `none` while the-way's twin rests on `git-path-patterns`; (b) the `build-tools` sentence
  was not reworded though it now owns a boundary test; (c) the invariant has the same identifier
  as the-way's own `cross-part-imports`; (d) `tests/invariants/test_simulation_isolation.py` has a
  docstring edit while the task says "Test zostaje bez zmian" (the sentence it quotes changed);
  (e) a 721-line test with its own tokenizer for TypeScript/JavaScript; (f) `BUILT_FROM` mapping of
  `dist/kitchen-sink/…` is unverified.
- Run the checks you need yourself and report command and exit code of each; you may run focused
  tests (`npm test -- <file>`). The whole `npm test` is the orchestrator's; do not run it.
- Return as the method gives: first line `PASS <sha>` or `FAIL <sha>`, graded findings, and the
  **Searches not found or unclear** section. Report path:
  `docs/task-cycles/test-granic-czesci/reports/review-whole.md`. If your tool refuses to write
  the file, return the full text instead.
