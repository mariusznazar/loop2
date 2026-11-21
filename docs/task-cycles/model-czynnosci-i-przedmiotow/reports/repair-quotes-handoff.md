# Handoff — repair of the quotations of `decision:` lines (`make-change`, a repair inside slices 10 and 12)

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; nothing it answers is that person's approval. You ask no human; a question goes back to the orchestrator in your return as `questions`.

## What happened

The orchestrator ran `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` at the head `16a720e21edf91f570212dae887216dbfef4ddda` (the end of slice 13). Twelve errors come from tests written by slices 10 and 12, whose `decision:` lines quote a sentence that the decision of the log does not hold as the line gives it; the thirteenth (`tests/view/rule-editor.test.mjs:1528`, D-290) belongs to Slice 15 and is not yours. The full output is `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/foundation-check-after-13.txt` (read it). The twelve:

- `tests/sim/action-targets.test.mjs:381` — the quotation does not begin a sentence of D-310
- `tests/sim/craft-and-tend.test.mjs:161`, `:215` — D-71 (does not begin a sentence)
- `tests/sim/craft-and-tend.test.mjs:385` — D-309 (does not begin a sentence)
- `tests/sim/craft-and-tend.test.mjs:474`, `:485` — D-380 (does not begin a sentence)
- `tests/sim/craft-and-tend.test.mjs:520` — D-363 (stands in no binding sentence)
- `tests/sim/craft-and-tend.test.mjs:582`, `:608`, `:644`, `:690` — D-121 (does not begin a sentence)
- `tests/sim/previous-programs.test.mjs:574` — D-401 (does not begin a sentence)

## Where you work

- Worktree (your working directory): `the root of the task's worktree` — branch `task/model-czynnosci-i-przedmiotow`, HEAD `16a720e21edf91f570212dae887216dbfef4ddda` is your base; commit only on this branch; never reset, rebase or touch another worktree.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole, variant "the fix of a review's findings" in spirit (`.the-way/task-cycle/change/fix.md` for what a report holds); you fix the twelve quotations and nothing else.
- What to do: for each listed line, open the decision it names in `foundations/decisions.md` (find it by `### D-nnn`; read the whole entry; the foundation step changed D-121, D-363, D-380 and added D-443, so quote them as they stand now) and change the `decision:` line's quotation so that it is exact words from the log, beginning at the start of a sentence of the decision's binding text (the sentences of its first paragraph, and the *Verification* clauses where the template allows a quotation there) — and so that the sentence is one that the test beside the line really holds. Read the test case and its comment first: where the quoted sentence is not the one the case tests, choose the sentence of that decision that it does test; where no sentence of the decision fits, say so in your report instead of keeping a false citation (never invent a sentence, never quote from memory). Read how the check reads a quotation: `.the-way/elements/decisions/template.md` ("A test holds a decision's sentence by a line `decision:`") and `.the-way/elements/common/foundation_check.py`'s docstring. Change no test body, no expectation, no product code, no foundation entry.
- Check: after the change, `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` must report none of the twelve (one error of Slice 15, `tests/view/rule-editor.test.mjs:1528`, stays), then Prettier and ESLint on the two changed test files (`npx prettier --check <files>`, `npx eslint <files>`) and `npm test -- tests/sim/action-targets.test.mjs`, `npm test -- tests/sim/craft-and-tend.test.mjs`, `npm test -- tests/sim/previous-programs.test.mjs` (each runs exactly one test file). **Never run `npm test` with no argument or the whole of the tests: that is the full gate, and its run waits for a signal the orchestrator holds.** Commit by path (`git add <path> …`, never `git add -A`, `.` or `commit -a`), message in English, one commit.
- Your directory for working copies: `.runs/repair-quotes/` (directly under the ignored `.runs/`). Make no working copy outside it; remove what you make and say so.
- Report path: `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/repair-quotes-report.md` (inside the worktree); its first line is your status; it holds for each of the twelve lines the old quotation, the new one and the sentence of the decision it comes from (a line number of `foundations/decisions.md`), the checks with their command and exit code, **Unread material**, **Searches not found or unclear** (each `none` where nothing), and the line on working copies.
- `cycle.md` and other files of `.runs/task-cycles/model-czynnosci-i-przedmiotow/` — other agents' handoffs and reports — are not yours to read, except the check output named above.

## What you return

Status (`done`, `done with concerns`, `questions`, `blocked`), your commit, a one-line check result, the report path. Leave the worktree clean.
