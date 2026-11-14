# Handoff — the fix of a review's findings (round 1 of the return step)

You are the one author, resumed. You make **the fix of a review's findings**, with `make-change`:
read `.the-way/task-cycle/change/fix.md`.

- Worktree `the task's worktree`; head to fix
  `e8ea984a98b54d67bdafaec087d9668ae149dc6d` (your return-step commit).
- Findings file: `reports/findings-return-1.md` in `.runs/task-cycles/porzadki-przed-pierwsza-mapa/`
  — the two blocking findings of the review of the return step, in the reviewer's words. The full
  review `reports/review-return-report.md` is evidence only. Nothing else is yours to fix, the
  review's Minor finding included.
- The two findings are about the wording of D-264 alone: say that `press` clicks inside `act` and
  `fire` sends the event as a browser does (a test file puts `fire` in `act` where React must
  answer), in the binding sentence and in the *Rationale* sentence; and say in the *violates* case
  that a test file of a screen in React defines a **copy** of the harness's `press` or `fire`, so
  that a keyboard helper and a variable named `fire` do not violate it. Verify against the code
  (`tests/view/page-document.mjs`, `tests/view/page-document.test.mjs`) before you write; contest a
  finding you hold wrong with evidence.
- Write the edit through the project skill `the-way-record-decision`, invoked for real: the product's
  `AGENTS.md` requires it, and the cycle's two earlier edits of the log were written by hand. The skill
  names the files of the-way it reads; read them from this worktree's `.the-way`. If the skill cannot
  be invoked, say exactly why in the report and make the edit with the template, never claim the
  skill was used.
- Check: `python -B .the-way/elements/common/foundation_check.py` (exit 0 required), and a search
  that the sentences you write are true of the code, with the commands and their exit codes. The
  orchestrator runs the whole gate.
- Commit by explicit path in the form of this branch's commits, in English. Report:
  `.runs/task-cycles/porzadki-przed-pierwsza-mapa/reports/fix-2-report.md`: each finding fixed (how,
  with the check) or contested, **Unread material**, **Searches not found or unclear**, the own-work
  check, and whether the skill was invoked. Return the status, your commits, a one-line check result
  and the report path.
