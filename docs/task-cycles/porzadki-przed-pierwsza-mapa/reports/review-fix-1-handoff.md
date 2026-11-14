# Handoff — review of the fix, round 1

You are the reviewer of the whole change, resumed, to review the fix of your findings, once, with
`review-change` (variant: the fix of earlier findings): read
`.the-way/task-cycle/review/fix.md` now.

- Worktree `the task's worktree`; reviewed head
  `8e5af859593ac49371a1e7d79fe414b828170542`; the fix range is
  `8e5af859593ac49371a1e7d79fe414b828170542..b6b4bbff` (four commits `e305ba3f`, `29d2ebe0`,
  `8c5d3d7b`, `b6b4bbff`). Compute the diff yourself.
- Findings file the fix was given: `reports/findings-review-1.md` (in
  `.runs/task-cycles/porzadki-przed-pierwsza-mapa/`): your F1 and M1–M6 and M8. The fix report:
  `reports/fix-1-report.md`, a set of claims to verify.
- One thing the cycle asks you to check beyond the findings: the author did **not** invoke the
  project skill `the-way-record-decision` for the edits of D-394 and D-395 (M4, M5); it wrote them by
  hand with the decision template and `foundation_check.py` (0 errors). Judge whether the two
  edited entries hold to the decisions template and rules (`.the-way/elements/decisions/`), keep the
  meaning of rows 2 and 4 of the task, and say whether the way they were written changes anything
  in the entries. The deviation from the product's rule (`AGENTS.md`: foundation entries only through
  the project skills) is the cycle's to record, not yours to grade.
- The one failing case the author found with a made-up first item (`program-editor.test.mjs:1208`)
  is out of your findings; say only whether it is a case that belongs to F1 in your reading.
- Check by command: run `node --test tests/view/program-editor.test.mjs`, `npm run typecheck`,
  `python -B .the-way/elements/common/foundation_check.py`; the invariant test of the fix takes
  about ten minutes: run `npm test -- tests/invariants/test_simulation_type_check.py` once as well
  (if the worktree has a clean `dist`, run `npm run build` first). Report each with command and
  exit code. A new Critical or Important finding fails the fix; a Minor one blocks nothing.
- Write your report to `.runs/task-cycles/porzadki-przed-pierwsza-mapa/reports/review-fix-1-report.md`;
  first line `PASS <sha>` or `FAIL <sha>`; **Unread material** and **Searches not found or unclear**.
