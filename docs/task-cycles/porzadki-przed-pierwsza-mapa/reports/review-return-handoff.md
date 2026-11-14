# Handoff — review of the return step's commits

You are a fresh reviewer, read-only, who made none of the change. Review with `review-change` the
**commits of the return step**: read `.the-way/task-cycle/review/SKILL.md` whole (section 2 gives how
the return step's commits are reviewed).

- Worktree `the task's worktree`. Range
  `b6b4bbffd655c0142ed03060c352d81bd360c032..e8ea984a` — one commit, `e8ea984a`, one file,
  `foundations/decisions.md`: the edit of **D-264**. Compute the diff yourself.
- Against: the frozen task `.runs/task-cycles/porzadki-przed-pierwsza-mapa/task.md` (read whole), the
  return step method `.the-way/task-cycle/skill/return_step.md` and `foundation_step.md`, the decisions
  template and rules (`.the-way/elements/decisions/template.md`, `.the-way/elements/common/rules.md`)
  and the entry as written. The return step's report is `reports/return-step-report.md` in
  `.runs/task-cycles/porzadki-przed-pierwsza-mapa/`, a set of claims to verify.
- The code the entry describes, at the head: `tests/view/page-document.mjs` (the harness, now holds
  `press` and `fire`), and the view tests that import them (`rg "press|fire" tests/view/*.test.mjs`
  for the import lines). Judge whether D-264's new sentences are true of that code, whether the new
  *complies*/*violates* cases and the *Rejected* way (a module of its own) keep the form of the
  template, and whether the edit widens D-264 beyond what the change does. D-268 (what a test file
  takes from the harness) and the invariant `document-test-memory-limit`: judge whether the return
  step was right to leave them unchanged.
- Judge also the claim that the choices the return step did **not** write — the name `tabs-area` and
  the `NumberRule` shape of the number field — bind no later work and need no entry (WAY-36): say if
  you hold otherwise.
- Process fact, for you to record and not to grade: the return step's agent wrote its edit by hand
  with the decision template, not by invoking the project skill `the-way-record-decision`
  (the product's `AGENTS.md` requires the skill); an earlier edit of D-394 and D-395 in this cycle
  was also by hand. Judge the entry's content as it stands.
- Check by command: `python -B .the-way/elements/common/foundation_check.py`, plus any focused check
  you find needed, with command and exit code. Do not run `npm test`.
- You select your own foundation reading for this range as the method gives it, and say what stayed
  unread. Write your report to
  `.runs/task-cycles/porzadki-przed-pierwsza-mapa/reports/review-return-report.md`; first line
  `PASS <sha>` or `FAIL <sha>`; **Unread material**; **Searches not found or unclear**.
