# Handoff — the fix of the findings of the whole-change review (task rana-i-opatrunek)

You fix the findings of the review of the whole change, as a fresh agent of the type `the-way-stage` (variant of `make-change`: **the fix of a review's findings**; read `.the-way/task-cycle/change/fix.md` whole, and `.the-way/task-cycle/change/SKILL.md` sections 2, 3 and 6). The findings touch several slices, so a fresh agent makes the fix (the orchestrator's class for it: `same`).

- The findings: `.runs/task-cycles/rana-i-opatrunek/reports/fix-whole-findings.md` (the review: `reports/review-whole-report.md`; the probe of I-1: `reports/review-whole-probe.mjs` with its output `reports/review-whole-probe.out.txt`). Fix the blocking finding I-1 and the Minor findings m-1 to m-6 and m-8; **not m-7** (the return step's) and not m-9 (outside the task).
- Worktree `the worktree's root` (branch `task/rana-i-opatrunek`), head `5731b59213c317bdfb76e0ed27ca0768c2dbdbcb`; your fix range runs from there. The frozen task: `.runs/task-cycles/rana-i-opatrunek/task_frozen.md` (read it whole: it binds). Commit by path, in English, no push; several commits are fine (the blocking finding first, with its test written first and seen failing). Your directory for working copies: `.runs/fix-whole/`. Report: `.runs/task-cycles/rana-i-opatrunek/reports/fix-whole-report.md`. The cycle record and the other files of the record directory are not yours except those this handoff names.
- I-1: the health in the paragraph of an encounter after „Ucisk” reads as the game writes a health elsewhere: a whole number as the body row of the map-run screen writes it (`src/browser/view/body-row.ts`, which the finding names; reuse its rule rather than a second copy, if one function can serve both without a change of the body row's behaviour; Slice 8 already put a two-line number rule of the same kind beside `plain` of `body-row.ts`), never „71.1”. Decide whether the form is a floor (as the body row) or a rounding by what the body row does; name it and the way rejected in your report. The test of `tests/view/combat-line.test.mjs` must use a fractional health (the real map runs always have one).
- m-1 (the pair judged at `actionInRepertoire`): the Repertoire is today a type alias of the Understanding and holds no predispositions. Make the smallest change that judges an item action by its pair at the rule check, in `src/browser/sim/understanding.ts` and what it needs; **if that needs a structural change** (a new type of the repertoire reaching many files, a change of the saved shape of the Understanding) do not make it: stop on this finding, leave the rest, and report it as a structural mismatch with the way you propose and its cost; the orchestrator then decides whether it stays in the request's list.
- m-3 (a saved fight with turns of „Ucisk” loads for a character who never bought the branch): the reviewer of Slice 4 said refusing it is allowed („Wolno odmówić więcej”). It is a trust boundary file (`src/browser/sim/saved-game.ts`): **if** the refusal can be made as a refusal of shape in the reader's way (the reader checks the combat record against what the run's character holds) without a new kind of check that contradicts `guidelines/coding-saved-game.md`, make it with crafted-input tests; **if** it contradicts the guideline („the reader reads shape, not the repertoire”), do not make it and report why, with the sentence of the guideline.
- m-2, m-4, m-5, m-6, m-8: as the findings say; where a fix is a one-line comment or a fixture value, make it and run the test of that file. m-8: the words of the pocket's refill must not name the bandage where the pocket and „Ucisk” take any item that fits or heals; the main hand's words are the product's pattern — change the pocket's words only in a way the data can hold for every item (if that needs a function of the item's name in the data and the view, make it small; else report it).
- Run the focused checks of every file you change and of the tests that reach it (each as command and exit code), `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` (exit 0), `npm run typecheck`, and `npm test -- tests/quality/test_function_and_file_size.py`; add every new file that is a test of `tests/sim/` to `stryker.config.json` (the test `tests/quality/test_mutation_test_selection.py` checks it). **Never run the whole suite.**
- Report as `fix.md` gives: for each finding fixed / not fixed (with the reason and the evidence) / contested; each check as command and exit code; **Unread material**; **Searches not found or unclear**; working copies.

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

