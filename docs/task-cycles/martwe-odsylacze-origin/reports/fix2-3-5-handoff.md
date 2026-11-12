# Handoff — the second fix of a finding in D-03 (`make-change`, "the fix of a review's findings")

The human who asked for this cycle delegated intermediate choices to the orchestrator and, when told that the review of the first fix found a
new blocking finding, allowed one more fix for it alone (a waiver of the rule that gives no third round; it is recorded in the cycle's record). You ask the human nothing.

- Worktree root: `the repository root`, branch `task/martwe-odsylacze-origin`. Base: `git rev-parse HEAD` when you start (write it in your report); the worktree must be clean.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole (variant: the fix of a review's findings).
- The finding (blocking, Important), from `reports/review-fix-3-5-report.md` — read that report's finding N-1 whole, and the note passage it quotes in the snapshot
  `the private snapshot of the notes (not committed)/vault/technologia_budowanie_ekranow.md` (never touch the vault `the author's notes` or `the local clone of the old game's repository`).
  In short: the sentence in D-03 "…so the loss falls mainly on the tests of the game screens." reverses the note; the reviewer's suggestion is to end the sentence at
  "change in every option." Check that yourself against the note; if you hold the finding wrong, answer with evidence instead of fixing.
- Touch D-03 only, *Rationale*/*Rejected* lines, and only what this finding needs. Do not fix Minor finding N-2 or any other finding. Through the skill `the-way-record-decision`:
  do its steps (reading, deciding, drafting, writing — an edit — and the check) and say which you did.
- Checks, with command and exit code: `python -B .the-way/elements/common/foundation_check.py` (exit 0); `git diff <base>..HEAD` read whole (one decision, one clause); the private-trace grep
  `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` has no hit inside D-03. No product gate.
- Commit on the task branch (`git add foundations/decisions.md`; English message `docs: :memo: …`); do not push.
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/fix2-3-5-report.md` with the checks, **Unread material** and **Searches not found or unclear** (or `none`). Return: status, commits, one-line check result, report path.
