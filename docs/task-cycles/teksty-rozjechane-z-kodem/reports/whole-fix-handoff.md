# Handoff — the fix of the whole-change review's findings

You are a fresh agent that fixes a review's findings. Work only in the worktree `the task's worktree` (branch `task/teksty-rozjechane-z-kodem`, head `0fba2b3`). The person who requested the cycle (Mariusz) delegated intermediate choices to the orchestrator, which answers your questions; you never seek the human, and the orchestrator's answers are not the human's approval.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole (the method `make-change`), in its variant "the fix of a review's findings", and `.the-way/task-cycle/change/fix.md` as it names. Your range runs from `0fba2b3`. Commit by path (`git add <path>`), English messages in the style of `git log`, one commit per matter.

**Findings.** `docs/task-cycles/teksty-rozjechane-z-kodem/reports/whole-findings.md` — cut word for word from the review of the whole change (`reports/whole-review.md`, which is the source of grade and scope): one blocking finding (I1) and fourteen Minor findings within the task. Fix every one of them. Where you hold a finding wrong, or where the reviewer itself says there is nothing to fix (numbers 4 and 16), answer with evidence in your report and change nothing for it. Do not widen: the findings the reviewer marked outside the task (its numbers 8, 9, 17) and D-185/D-165/D-247 remarks are not yours.

**How the files are written.** An entry of `foundations/decisions.md`, `foundations/glossary.md` is edited through the project skill of its element (`the-way-record-decision`, `the-way-record-glossary-term`): read that skill's `SKILL.md`, the element's template and `.the-way/elements/common/rules.md` and keep the entry's form; keep the foundation text in English. A guideline file is edited as the project skill `the-way-maintain-coding-guidelines` / `the-way-maintain-testing-guidelines` writes it (its `SKILL.md` and template in `.the-way/product-guidelines/`); the guidelines' language stays as the file has it. `README.md` is Polish and stays Polish.

**Notes of the orchestrator on particular findings.**
- I1 comes from D-252 (the binding paragraph, the *Verification* *violates* line) and from `guidelines/coding.md` (rule "Recording a failure"). The task's answer 7 says the two commands keep the error's text and get no JSON *failure line* of the log form; the report `measure-passwords` prints on failure stays as it is (the code does not change). Say it so in the three places. Minor 1 and 14 are the same sentence (`temporary database and made-up passwords`) in D-252 and in `coding.md`: fix both together, truthfully for each command, as the reviewer suggests or in your own words.
- Minor 2: a one-clause pointer from D-252 to D-354 (and, if the element's rules want it, the matching link in D-354's relations) — only as the element skill gives.
- Minor 3: you may drop the clause "an exception for tasks 14 and 18" or say what the exception was for, from `git show 1b09f80:docs/task-cycles/plan-wyprawy/task.md` (line 59 and the lines around it); do not invent.
- Minor 5, 6, 7: wording only.
- Minor 10: the README's lead-in sentence before the build list ("Sam serwer uruchamiają dwa polecenia, a `npm run typecheck` ...") must fit the four points now there; reword the lead-in only.
- Minor 11: add `tests/view/memory-limit.test.mjs` to the same exclusion in the unit recipe's *Files* line of `guidelines/testing.md` (it runs child processes and is already in the integration *Files* line); no other change there.
- Minor 12, 13: cite the purity, not the status (D-265); make the *Bad* line agree with the *Good* line of the account-policy rule.
- Minor 15: the frozen address `nodejs.org/download/release/v24.21.0/docs/api/http.html` carries the passage (the reviewer fetched it); use it in D-02's *Based on* if you fetch it yourself and find the passage word for word, with its place and the read date 2026-11-10; otherwise keep the entry and say so.
- Minor 4 and 16: nothing to fix, as the reviewer says.

**Checks.** After each foundation entry and at the end: `python -B .the-way/elements/common/foundation_check.py` (exit 0, `0 errors`); `git diff --check`; and, for the guideline files, the same foundation check. You run no `npm test` (the orchestrator runs the gate).

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/whole-fix-report.md` as `make-change` gives it: for each finding (I1, 1-7, 10-16) what you changed (commit) or why not; the checks with command and exit code; your own-work check; **Unread material**; **Searches not found or unclear** (each `none` if so). Return: status, your commits, a one-line check result, the report path, and your questions and concerns.
