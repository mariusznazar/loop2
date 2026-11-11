# Handoff — review of the return step's commits (task koniec-przejscia)

You review one range of commits as an agent that did not make it. Read-only: change nothing in the worktree ``, its index or branch; checks that need files changed run in a separate worktree of the head commit under `.runs/` of that worktree (ignored), removed afterwards. Never touch the main checkout `a repository on the author's disk`. Do the whole review yourself.

## Method

Read whole `.the-way/task-cycle/review/SKILL.md` and follow it: this is the review of the return step's commits, which section 2 of it describes ("against the task and the foundation entries the return step writes or corrects"). The review of the whole change and of its fix are done and passed; you do not repeat them.

## What is reviewed

- Range: `4ef0789c` to `0894f755` (confirm `git rev-parse HEAD` is `0894f755…`; compute `git diff 4ef0789c..0894f755` and `git log 4ef0789c..0894f755` yourself): one commit, `foundations/decisions.md` only. It writes D-363, D-364 and D-365 (marked `the cycle's`: no row and no projected entry carries them whole; they hold choices of the plan and of the executors that bind after the merge) and corrects D-311, D-324, D-339 and D-362.
- The return step's report, as claims to verify, not evidence: `docs/task-cycles/koniec-przejscia/reports/return-report.md`. The method it followed: `.the-way/task-cycle/skill/return_step.md` and `foundation_step.md` (read them: they say what the return step writes and what it must not write).
- Judge against: the frozen task `docs/task-cycles/koniec-przejscia/task.md` (whole), the plan's *Choices* table in `docs/task-cycles/koniec-przejscia/plan.md`, and the code as it stands at the head (`git diff 211a4ea..0894f755` for the whole change; the code did not change in this range). Each new or corrected sentence must say what the code does and not more broadly, not less (WAY-263); each new decision must follow `.the-way/elements/decisions/template.md` and `.the-way/elements/common/rules.md` (a question, binding sentences, *Scope*, *Verification*, *Origin*, *Rationale*, *Rejected* with the ways the plan and the reports name, each with its cost). Check D-339's corrected sentences keep the meaning of D-338 and D-339 (the task leaves them without change of meaning) and that D-364's focus clause and D-311's, D-324's and D-362's corrections agree with `src/browser/view/end-window.tsx`, `game-view.ts`, `run-screen.tsx`, `run-header.tsx`. Check that nothing deferred is listed for later and that no entry was written for a choice that binds nobody (a row of the questions table is the place for those).
- Run `python -B .the-way/elements/common/foundation_check.py` yourself (exit code), without the switch.
- Trust boundary: the range holds no code (the answer of the cycle's start stands: `src/browser/sim/saved-game.ts` is the trust boundary of the whole change; D-363's sentences about how a load reads the record must agree with the reader in that file).
- Foundation entries to read whole by identifier in `foundations/decisions.md`: D-363, D-364, D-365, D-362, D-311, D-324, D-339, D-338, D-206, D-212, D-213, D-285, D-173, D-122, D-132, D-135 and what each links to as far as you need; `foundations/part_map.md` (browser-view, simulation), the invariants `save-version`, `death-settled-once`, `minute-span-split`, `content-identifiers`, `browser-view-token-values` whole.

## Report

Write the full report to `docs/task-cycles/koniec-przejscia/reports/return-review-report.md` as `SKILL.md` section 4 gives: first line `PASS <sha>` or `FAIL <sha>`; findings by grade with place, reasoning and evidence; **Declined to judge**; each check with command and exit code; each reach beyond the dispatch; **Unread material:** and **Searches not found or unclear:**. Return to the orchestrator only the first line, the counts of blocking, Minor and out-of-scope findings, a one-line check result and the report path.
