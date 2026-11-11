# Handoff — the fix of the findings of the review of the whole change (task koniec-przejscia)

You fix the findings of one review, as a fresh agent on the same branch. Work from the worktree `` (branch `task/koniec-przejscia`, HEAD `6de72dbb…`, the reviewed head; never touch the main checkout `a repository on the author's disk`). Your fix's range runs from `6de72dbb`.

## Delegation

The human who requested this cycle delegated intermediate choices to the orchestrator; questions go to it in your report (status `questions` or `blocked`). Nothing you decide is the human's approval.

## Method and variant

Read whole `.the-way/task-cycle/change/SKILL.md`; your variant is "the fix of a review's findings": read `.the-way/task-cycle/change/fix.md`. Read `.the-way/task-cycle/change/slice.md` only if a step needs it (it does not: you are not an executor of a slice). A finding you hold wrong or cannot fix within the task is contested with evidence in your report. Foundation entries are changed only through the project skills `the-way-record-decision`; the styleguide only through `the-way-maintain-styleguide` (project skills with the `the-way-` prefix; neither has a human to ask: take the smallest reversible reading and name it as a choice, or return `questions`).

## The findings file

`docs/task-cycles/koniec-przejscia/reports/whole-review-findings.md` — the reviewer's words for the blocking finding B1 and the Minor findings M1 to M8, with the orchestrator's notes on how to make each fix at its end. Read it whole. Nothing else of the review is yours.

## What to read

The frozen task `docs/task-cycles/koniec-przejscia/task.md` whole, the plan `docs/task-cycles/koniec-przejscia/plan.md` (its *Choices* table), the reports of the slices the findings concern: `reports/slice-1-report.md` (M1–M3), `reports/slice-3-report.md` and `reports/slice-4-report.md` (M5, M6), `reports/slice-6-report.md` (M7, M8), `reports/foundation-report.md` (B1, M4, M5); the files each finding names, each whole before you change it; the foundation entries D-362, D-212, D-122, D-135, D-40, D-285, D-93, D-206, D-213, whole (`foundations/decisions.md`, find each by its heading); and `guidelines/coding-saved-game.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`, whole.

## Commits and checks

Commit by path (never `git add -A`), messages in English in the form of the repository's history; one commit per finding or per skill is fine. Run the affected focused checks again (the tests of each file you change, `npm run typecheck`, `node node_modules/eslint/bin/eslint.js --max-warnings 0 <dirs>`, `node node_modules/prettier/bin/prettier.cjs --check <files>`, `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after a foundation entry); never the whole gate. Write each new test first and see it fail, recording command and exit code.

## Report

Write the full report to `docs/task-cycles/koniec-przejscia/reports/fix-1-report.md`: for each finding of the file fixed (how, with the check that shows it) or contested (the evidence); the commits; each check with command and exit code; the own-work check of section 3 of `SKILL.md`; reaches beyond the dispatch; every choice with the way rejected and its cost if wrong; **Unread material:** and **Searches not found or unclear:** (each `none` if so). Return to the orchestrator only the status, the commits, a one-line check result naming what failed or did not run, and the report path.
