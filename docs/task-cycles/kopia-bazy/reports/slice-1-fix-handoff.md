# Handoff — fix of the review of slice 1, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator in your report; never to the human.

**Worktree.** `C:\Storage\repos\loop2-wt\kopia-bazy`, branch `task/kopia-bazy`, head `49bfb74e7ea8b81016fe9c58b40801b1d9e1d2f0`. Work from its root; the pinned the-way is its `.the-way`. No other agent writes in it now.

**Method and variant.** Read `.the-way/task-cycle/change/SKILL.md` whole. You make: the fix of a review's findings. Read a file it names when its step comes.

**Findings file.** `docs/task-cycles/kopia-bazy/reports/slice-1-findings.md`. Fix those four, F1 to F4. The review's Minor and out-of-scope findings are not yours. Answer with evidence a finding you hold wrong.

**Read.**
- Frozen task, whole: `docs/task-cycles/kopia-bazy/task-frozen.md`
- `docs/task-cycles/kopia-bazy/spec.md`: decision 1, decision 2, *Left to the maker*
- The review: `docs/task-cycles/kopia-bazy/reports/slice-1-review-report.md`
- The slice: `docs/task-cycles/kopia-bazy/reports/slice-1-handoff.md`, `docs/task-cycles/kopia-bazy/reports/slice-1-report.md`
- `guidelines/coding.md`, `guidelines/coding-database-access.md`, `guidelines/testing.md`, whole
- Foundation: D-84, D-112, D-114, D-215, D-217; `sqlite-online-backup`, `node-sqlite-database`, `sqlite-wal-concurrency`

**Bound answers.**
- F3: write one new decision for spec decision 1 — how the consistent backup is made, one step through `backup()`, with `VACUUM INTO`, the default `rate` and `rate: -1` as its rejected ways — through the project skill `the-way-record-decision`, read from `.the-way/elements/`. Scope `account-server`. Its reason rests on what one step avoids, not on "the default does not finish", which the measurements do not hold in general: a default-`rate` backup finished in 1.5 s on a Docker volume and did not finish in 20 s on the Windows disk. Then correct the comment in `src/server/database.ts` to cite the new decision. D-217 stays as it is. The word in entries is "backup".
- F2: the reviewer's way works and is the expected one: a step count from `progress`, reported by the method, for a test to assert. Any way that fails on `rate: 100` and does not rest on the disk's speed is acceptable. Show the mutation: the test fails on `rate: 100`, by command and exit code.
- F4: the writer is stopped by the test's cleanup, also after a failure; the wait for its first commit is bounded. Show it: with `rate: 1` the run ends by itself, by command and exit code. Restore every mutation before you commit.
- F1: as the finding gives. Check with the gate's own command: `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache <file>`.
- Check ESLint and Prettier by the gate's own commands too, from `tests/quality/test_quality_invariants.py`.

**Boundary.** The task's trust boundary and irreversible operations stand as in the slice's handoff. Do not touch the server. Do not push. Run the affected focused checks, each with its command and exit code; the full `npm test` is the orchestrator's. Commit messages in English in the repository's form; `git add` by path.

**Report.** `docs/task-cycles/kopia-bazy/reports/slice-1-fix-report.md`, each blocking finding as fixed with the check that shows it, or contested with the evidence; for the new decision, its identifier, its range and one sentence of its meaning in Polish; **Searches not found or unclear**.

**Return.** Your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
