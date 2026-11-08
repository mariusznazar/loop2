# Handoff — the return step

You are the one author, resumed for the return step. The same worktree and branch
(`the root of the task's worktree`, `task/test-granic-czesci`), head `842beb7` (reviewed
`PASS` for the whole change at `628bd1b` and `PASS` for the fix at `842beb7`). Delegation as before:
nothing here is the human's approval.

- Read `.the-way/task-cycle/skill/return_step.md` whole (and `.the-way/task-cycle/skill/foundation_step.md`
  whole, since the return step writes as the foundation step writes) and follow them. Read the
  skill of an element when you write an entry of that element; foundation entries only through the
  project skills.
- Compare with the code the foundation entries the change wrote or changed (D-351, the invariant
  `cross-part-imports`, `simulation-isolation`, the part `test-helpers`), those the task names
  (WAY-299, WAY-44, D-04, D-83), those the search of the foundation finds, and the part map of the
  touched parts. In particular check: the *Depends on* of `test-helpers` and of the parts that now
  import from it; the `build-tools` sentence; whether D-266 or other entries still say that
  `loop2_invariant_support.py` belongs to `build-tools`; and the reviewer's out-of-scope remark
  that entries naming parts one by one (`foundations/decisions.md:696`, `:724`,
  `foundations/invariants.md:426`, `:436`, `:586`, `:1196`) do not list `test-helpers`. For that
  remark, decide by `return_step.md` whether the return step corrects it or the cycle reports it;
  write nothing beyond what that file allows, and say in the report what you left and why.
- Do not change code of the change. Commit what the return step writes, by path, English messages;
  if nothing needs correction, commit nothing and say so.
- Do not run the whole `npm test` (the orchestrator ran it: exit 0 at `842beb7`). Run the focused
  checks you need (`foundation_check.py`).
- Report: write it to `docs/task-cycles/test-granic-czesci/reports/report-return-step.md` as
  `return_step.md` gives (or return its full text if your tool refuses), with the sections the
  record's *Return step* lists, the own-work check and **Searches not found or unclear**. Return
  status, commits, a one-line check result and the report path.
