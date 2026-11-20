# Handoff — the fix of a review's findings, `make-change`, "the fix of a review's findings"

You are the one author of the change of task `wzorzec-kodu-przyrzadu`, resumed for the fix of the findings of the review of the whole change. Your earlier handoff (`reports/author-handoff.md`) stands for everything it gives, the worktree, the method and your working-copy directory included; the working-copy directory of this round is `.runs/author-fix/` of the worktree, removed before you return. Do not run the product's gate (`npm test` in full); focused checks only, as before.

## What to fix

The findings file is `reports/review-whole-findings.md` (path from `.runs/task-cycles/wzorzec-kodu-przyrzadu/`; absolute: `.runs/task-cycles/wzorzec-kodu-przyrzadu/reports/review-whole-findings.md`), in the reviewer's words; read it whole. It holds two blocking findings (Important 1, Important 2) and five Minor findings within the task. The reviewed head is `ce67fbd7`; your fix range runs from it.

- Fix each blocking finding. Important 1 is marked `Contradiction: yes` (D-437 as you wrote it; the rule of the guidelines file must follow the task's own rule of To do 2 and not bind every mode to the engine's way of stepping; if you find the reviewer's reading of D-437 or of the task wrong, answer with evidence in your report instead). For Important 2 the reviewer gives two ways (patterns plus control cases, or naming the forms as blind spots in the docstring and in the rule's sentence on what the reviewer keeps); choose, and name the way and the rejected one with its cost in your report; if you add patterns, each new pattern has a case in the control test and a run where the scan flags it.
- Fix each Minor finding too (the cycle fixes every Minor finding of the review of the whole change that the reviewer does not mark outside the task). Where you hold one wrong or its fix larger than the task — Minor 5 asks for one lexer where the task's scope is the two tests and their reader; moving the lexer into `test-helpers` would change files of the simulation's tests, which this task does not — answer it in your report with the evidence and leave it; do not enlarge the change.
- Where the fix touches a foundation entry (the guidelines rules name D-437, D-429, invariants), keep the meaning of its row; where a sentence you added is the cycle's own and not one a row of *Settlements to record* gives (Minor 2), say so in your report as `the cycle's`, so the request can show it to the human.
- Run the affected checks again: the two new tests, `node --test tests/balance/*.test.mjs` if you touch `balance/`, `python -B .the-way/elements/common/foundation_check.py`, `python -B .the-way/instruction-files/check_instructions.py`, ESLint/Prettier/Ruff on changed files. Report each with command and exit code.
- Commit by path, messages in English in the form of the repository's recent commits; do not push.

## Report

Write it to `.runs/task-cycles/wzorzec-kodu-przyrzadu/reports/author-fix-report.md`, with these headings present: **Unread material** and **Searches not found or unclear** (each `none` where there is nothing), each finding by its name with what you did or the evidence you answer with, the checks with commands and exit codes, your own-work check, the commits, and working copies (where each stood and that it was removed). Return status, commits, a one-line check result, and the report path.

(Working copies: the rule of your first handoff, the paragraph copied there word for word, applies unchanged.)
