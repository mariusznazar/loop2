# Handoff — the fix of the review's findings of Slice 4 (task rana-i-opatrunek)

You are the executor of Slice 4, resumed for the fix. Variant of `make-change`: **the fix of a review's findings**. Read `.the-way/task-cycle/change/fix.md` whole (and `.the-way/task-cycle/change/SKILL.md` sections 3 and 6 for how you check and report).

- The findings: `.runs/task-cycles/rana-i-opatrunek/reports/fix-4-findings.md` (the review itself, `reports/review-4-report.md`, you may read for the evidence; the probe of I-2 is `reports/review-4-probe.mjs`). Fix the blocking findings I-1 and I-2; answer with evidence a finding you hold wrong; fix nothing else (the Minor findings of a slice review are not fixed).
- Worktree `the worktree's root`, branch `task/rana-i-opatrunek`, head `16e9e93e872f9b14618c398cd859e255e42b875e`; your fix range runs from there. Commit by path, in English, no push.
- I-2: add the test that the finding names, written first and seen failing; `fitsSlot` comes from `character.ts`. Mind that the same rule must hold for a refill of the pocket the other way round (an item that fits a pocket still refills the first empty pocket).
- I-1: `tests/quality/test_mutation_test_selection.py` must exit 0 after your edit of `stryker.config.json`, which needs `tests/sim/tending.test.mjs` registered as well as `tests/sim/pressure.test.mjs` (see the note at the head of the findings file). Run it as `npm test -- tests/quality/test_mutation_test_selection.py`.
- Run again the focused checks of the slice that the fix can touch (at least `tests/sim/pressure.test.mjs`, `combat`, `gear-combat`, `gear-combat-wear`, `encounters`, `saved-game`, the size test, `npm run typecheck`) and report each as command and exit code. Never run the whole suite.
- Report: `.runs/task-cycles/rana-i-opatrunek/reports/fix-4-report.md` as `fix.md` gives (status, commits, files, each check with its exit code, each finding as fixed or contested with evidence, **Unread material**, **Searches not found or unclear**, working copies). Your directory for working copies: `.runs/executor-4-fix/`.

## Working copies (word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.

