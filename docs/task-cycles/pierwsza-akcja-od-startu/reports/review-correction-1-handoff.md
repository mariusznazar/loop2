# Handoff — the review of a correction, task pierwsza-akcja-od-startu

You are the reviewer of the whole change, resumed for the review of a correction made for the human's remarks. You did not make the change or the correction. Read-only; work from the worktree root `the root of the task's worktree`. Method: `.the-way/task-cycle/review/SKILL.md` and `fix.md`, which gives what bounds the review of a correction; the remarks stand in place of a findings file.

Range: `5daa2b8519ecb6545c31a3020b758e8868ff13e3..c62c48df` (confirm `git rev-parse HEAD`; one commit; `foundations/decisions.md` and `tests/sim/new-account-first-pass.test.mjs`). Below it lie the record's copy and its removal (`docs/task-cycles/…`), not part of the change.

The remarks (comment 6878308098 on the request, quoted in `reports/correction-1-handoff.md`, with your three Minor findings of `reports/review-fix-report.md` that they name): fix the three small wording points — the title of the first-pass test that repeats 289, the clause of D-312 that says the game wrote no rule whenever the player's own rule has run, and D-404's "complies" example that carries 290. The remarks let three other items through; they bind and are no finding. The correction's report: `reports/correction-1-report.md`, which holds a return-step comparison of D-312, D-345, D-404 and `new-account-first-pass` (a claim to verify).

Judge: whether each point is fixed and the fix opens no new fault; that D-312's binding sentence, its *Verification* examples and *Rationale* now agree with each other and with `chillRuleGroupName` (`src/browser/sim/understanding.ts`) for every state the game reaches, and D-345 still agrees; that D-404 and the invariant `new-account-first-pass` still say the same figure as the test; that nothing else in the correction changed. Trust boundary: not touched (no `saved-game.ts`).

Checks you may run: `npm test tests/sim/new-account-first-pass.test.mjs` (one file), prettier and eslint on the changed test, `python -B .the-way/elements/common/foundation_check.py` as your own check. **Not** the full gate or a mutation analysis; another session's gate is running on this machine. Name each check not run, with the reason.

Report: `reports/review-correction-1-report.md`, first line `PASS <sha>` or `FAIL <sha>`, with **Unread material** and **Searches not found or unclear**; return the first line, the changed files with line counts, a one-line check result and the report's path.
