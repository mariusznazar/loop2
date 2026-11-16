# Handoff — the review of the fix (fix round 1), task `ekran-wiedzy`

You are the reviewer of the whole change, resumed, and you review the fix of your own findings once, with `review-change` (`.the-way/task-cycle/review/SKILL.md`, the review of a fix; read the section for a fix again where you need it). The orchestrator's notes are provisional and judge nothing; grades and scope are yours.

- Worktree: `the root of the task's worktree`, branch `task/ekran-wiedzy`. **Fix range:** from the head you reviewed, `caa13ffd5061e2cc60c7406203a6b5cf2045240b`, to `HEAD` (`git rev-parse HEAD`; one commit, `b67568aa`). Your directory for working copies: `.runs/review-fix-1/`.
- The findings the fix answers: `reports/review-whole-findings.md` (full path `docs/task-cycles/ekran-wiedzy/reports/review-whole-findings.md`) — I1–I3 (blocking) and m1–m3 (Minor within the task), cut from your report in your words.
- The author's fix report: `docs/task-cycles/ekran-wiedzy/reports/fix-1-report.md`. Your report: `docs/task-cycles/ekran-wiedzy/reports/review-fix-1-report.md`.
- Trust boundary: yes, as in the first review (`assets/icons/**`); the fix touches no file there, say so after you check.

## What to judge

1. Is each finding fixed — I1, I2, I3, m1, m3 — or, for m2, answered with evidence that holds? m2 is a Minor finding within the task that the author holds wrong with the task's own line (the task says D-280's *Verification* stays as it is apart from the four-item example); you judge whether the evidence holds, and a Minor finding that remains does not block (the method says so).
2. A **new Critical or Important finding** in the fix range counts as one that remains and blocks. Look for it in particular in: the new text of D-416 (the first paragraph now holds four binding sentences, while the template of a decision gives one to three — the author notes that `foundation_check.py` accepts it; judge whether that is a defect of the entry's form and how it grades), its new sentence against the task's words (*To do* 4, row 1 — nothing invented), its test citations (`decision:` lines in `knowledge-screen.test.mjs`, `tests/sim/data.test.mjs`, `icons.test.mjs`), and the reworded *Rationale*; in the move of `countedName` to `src/browser/view/counted-name.ts` (every importer still resolves, `program-editor.ts` no longer exports it, the moved tests are the same word for word, the file's place against `guidelines/coding-browser-module.md` and `foundations/part_map.md`); and in the removal of the registry test (m3), and the replacement case in `tests/view/account-screen.test.mjs`.
3. The report's own claim that `fix.md` was not opened: the author's report holds each finding as fixed with its check or contested with evidence; say whether anything `fix.md` asks is missing from it.

Boundary: read-only, no edits, no commit, **no full gate** (`npm test` without a file is the orchestrator's). Run only focused checks, each with its command and exit code in your report.

## Working copies (word for word from the cycle's skill)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Return

The first line of your report `PASS <sha>` or `FAIL <sha>`; the findings graded; the checks with commands and exit codes; **Unread material**; **Searches not found or unclear**; your working copies. Return the first line, the report's path and a one-line check result.
