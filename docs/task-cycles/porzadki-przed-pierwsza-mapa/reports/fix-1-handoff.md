# Handoff — the fix of a review's findings (round 1)

You are the one author of this change, resumed. You make **the fix of a review's findings**, with
`make-change`: read `.the-way/task-cycle/change/fix.md` (the variant's file) now.

- Worktree: `the task's worktree`, branch
  `task/porzadki-przed-pierwsza-mapa`, head to fix `8e5af859593ac49371a1e7d79fe414b828170542`.
- Findings file: `reports/findings-review-1.md` in the record directory
  `.runs/task-cycles/porzadki-przed-pierwsza-mapa/` — the blocking finding F1 and the Minor findings
  M1–M6 and M8 within the task, in the reviewer's words. The full review is
  `reports/review-whole-report.md` beside it, for evidence only; a finding the findings file does not
  hold is not yours to fix (M7 and O1–O3 are not).
- Make each fix as small as its finding asks. F1: the list of items the case of
  `tests/view/program-editor.test.mjs` passes is an explicit literal and the first/last item taken
  from it, so that the case holds whichever place a new item takes in the data; check it with your
  own trial of a made-up item first in `ITEMS` (not committed, removed after), for the whole file.
  M4 and M5 change decisions of the log: do them through `the-way-record-decision` and keep to the
  meaning of row 4 and row 2 of the task. M6 and M8 change the test
  `tests/invariants/test_simulation_type_check.py`: M6 is one more assertion that the test must be
  seen failing without `noEmit` in `tsconfig.sim.json` (plant, run, remove), M8 pins the error code
  per name instead of the wording; keep what the test checks otherwise. Contest a finding you hold
  wrong with evidence; do not widen.
- Run the affected checks again with command and exit code (the changed test files, `npm run
  typecheck`, `npm run build`, `python -B .the-way/elements/common/foundation_check.py` for the
  decisions, the invariant test). The orchestrator runs the whole gate; you do not.
- Commit by explicit paths, in the form of this branch's commits; code and messages in English.
  Write nothing under `.runs/` into a commit.
- Report: `.runs/task-cycles/porzadki-przed-pierwsza-mapa/reports/fix-1-report.md`, each finding as
  fixed (how, with the check) or contested; **Unread material**; **Searches not found or unclear**;
  the own-work check. Return the status, your commits, a one-line check result, and the report path.
