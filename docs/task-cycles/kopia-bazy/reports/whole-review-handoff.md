# Handoff — reviewer of the whole change, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. You made none of this change. Your questions go to the orchestrator; never to the human.

**Worktree.** `C:\Storage\repos\loop2-wt\kopia-bazy`, branch `task/kopia-bazy`. Work from its root; the pinned the-way is its `.the-way`. Read-only: no change, no commit, no server. Make any mutation in a scratch export, and leave no process behind you. Docker's engine answers on this computer.

**Method.** Read `.the-way/task-cycle/review/SKILL.md` whole and `.the-way/task-cycle/review/whole_change.md` whole, and follow them. You select your own foundation and guidelines.

**What is reviewed.** The whole change. Range: base `95de83b98a5083c516b8fffad3237eaa64cad8d5`, head `d8b1482`. Commits `67620ff` and `fa7eedb` add and remove the cycle's record, and cancel out.

**Files.**
- Frozen task, whole: `docs/task-cycles/kopia-bazy/task-frozen.md`
- Spec, whole: `docs/task-cycles/kopia-bazy/spec.md`
- Plan, whole: `docs/task-cycles/kopia-bazy/plan.md`
- The cycle's choices: the table *Questions and autonomous choices* in `docs/task-cycles/kopia-bazy/cycle.md`, for what binds; judge the rest yourself
- Minor and out-of-scope findings of the slice reviews, to grade as findings of this review: `docs/task-cycles/kopia-bazy/reports/whole-review-carry.md`
- Your report: `docs/task-cycles/kopia-bazy/reports/whole-review-report.md`

**Slices.**

| Slice | Range | Review of its own | What to read |
|---|---|---|---|
| Foundation entries | `95de83b..b7dd37d` | judged with slice 1 | `reports/12-foundation-report.md` |
| 1 | `b7dd37d..4ced3b9` | yes, after one fix: PASS | `reports/slice-1-review-report.md`, `reports/slice-1-fix-review-report.md` |
| 2 | `4ced3b9..acb7aee` | yes, after one fix: PASS | `reports/slice-2-review-report.md`, `reports/slice-2-fix-review-report.md` |
| 3 | `acb7aee..0d18e4d` | yes, after one fix: PASS | `reports/slice-3-review-report.md`, `reports/slice-3-fix-review-report.md` |
| 4 | `0d18e4d..f451316` | yes: PASS | `reports/slice-4-review-report.md` |
| 5 | `f451316..46614c6` | **none: this review is its only one** | `reports/slice-5-report.md`; its `cleanPassword` was changed under slice 6's correction |
| 6 | `46614c6..db73929`, without the record's two commits | yes: FAIL, one fix, FAIL with I2 and I5 left, the human's decision, correction, PASS | `reports/slice-6-review-report.md`, `reports/slice-6-fix-review-report.md`, `reports/correction-1-report.md`, `reports/correction-1-review-report.md` |
| 7 | `db73929..d8b1482` | **none: this review is its only one** | `reports/slice-7-report.md` |

Paths under `reports/` stand in `docs/task-cycles/kopia-bazy/`. Mechanical checks of slices 5 and 7 found no mismatch: one commit each, exactly the files of the *Change*.

**Answers of step 4.**
- Trust boundary: yes — `src/server/**`, `deploy/**`, the new keys, Strych's listing included. Check crafted input at that boundary.
- Irreversible operation: yes — replacing older backups on Strych, restoring over the server's database, changing the encryption key. Check that the change only prepares them, and that no agent's instruction performs one.

**What the cycle holds open for you to judge.**
- Spec decisions 6 and 9 hold rejected ways that stand in no entry yet; the return step owes them.
- `account-save-backup` stands with *Violated: yes* until H2 and H3.
- The task carries a *Questions carried to cycle* section: each row must be answered by the change.

**Checks.** Name what you run. Run each test file you need by `npm test -- <file>`; the full `npm test` is the orchestrator's.

**Report.** First line `PASS <sha>` or `FAIL <sha>`, as your method gives. For each blocking finding, name the slice and commit it comes from, or that it spans slices, or that it comes from none.

**Return.** That first line, a one-line check result naming what failed or did not run, and the report's path.
