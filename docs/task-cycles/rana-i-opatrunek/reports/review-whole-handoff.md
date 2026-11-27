# Handoff — the reviewer of the whole change of the task rana-i-opatrunek

You review the whole change of a planned task cycle of the-way, with `review-change`, as an agent of the type `the-way-stage` that made none of it, on the strongest class. You are read-only on the reviewed worktree.

## What you review and how

- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole, and for the whole change `.the-way/task-cycle/review/whole_change.md`, read whole and followed: what you read and what you check besides section 2 of the method. You alone select your own foundation and guidelines (the parts touched are `simulation`, `browser-view`, `balance-tools`, `agent-workflow` and `product-foundation`): the entries by "Reading the foundation" in `.the-way/elements/common/way_of_working.md`, the guidelines by `.the-way/product-guidelines/reading.md`, each guideline file whole. Write the index of your selection of decisions with the script the method gives into `.runs/review-whole/` and read it; count the decisions of the index you read whole, for your report.
- Range: base `be4e9c09f3c45f421d04983948a88bd6240809bf` (the target branch's head the task branch starts from) to head `5731b59213c317bdfb76e0ed27ca0768c2dbdbcb`. Compute the diff yourself (`git diff be4e9c09..5731b592`, `git log be4e9c09..5731b592`); `git rev-parse HEAD` in the worktree must show the head given, else ask as a question.
- Worktree: `the worktree's root` (branch `task/rana-i-opatrunek`). Never change it, its index or its branch. Checks that need changed files go in a worktree of the head commit in `.runs/review-whole/` (`.the-way` populated by `git submodule update --init -- .the-way`, `node_modules` a junction to `the `node_modules` of the main checkout`; remove the junction first with `rmdir`, never recursively through it), removed before you return. **Do not run the whole suite** (`npm test` with no file): it is the cycle's own run and CI's; run focused checks, and the mutation tool the testing guidelines adopt on the simulation ranges the guidelines name, with a narrowed configuration of your own if needed.
- Report: `.runs/task-cycles/rana-i-opatrunek/reports/review-whole-report.md`, first line `PASS <head sha>` or `FAIL <head sha>` and nothing else (the file is the input of the cycle's scripts). The cycle record `cycle.md` is not yours; the files named below are.
- Read whole, as the dispatch of a whole-change review requires: the frozen task `.runs/task-cycles/rana-i-opatrunek/task_frozen.md` (sha256 `55c86eaf63df7156`; its *To do* 1–10, the answered questions, the rows of *Settlements to record*, *Decisions in play*, *Out of scope*), and the plan `.runs/task-cycles/rana-i-opatrunek/plan.md` (11 slices; its *Choices*; the plan was edited by the orchestrator at its review — Slice 1 and 4 classes — and at the end of Slice 4 — Slice 5 took the stale tests and quotations).
- The answers of step 4: the change touches a trust boundary (`src/browser/sim/saved-game.ts`: checked crafted input in the reviews of Slices 4 and 6; check it again over the whole range); no irreversible operation.

## The slices, their ranges, and which had a review of its own

| Slice | Range | Review of its own |
|---|---|---|
| Foundation entries (the foundation step) | `be4e9c09..6d07bf20` | no — judged by you; report `reports/foundation-report.md` |
| 1 pairs in the data of the skills | `6d07bf20..c6690385` | no — report `reports/executor-1-report.md` |
| 2 the tree and its numerical branches | `c6690385..be60238e` | no — `reports/executor-2-report.md` |
| 3 healing and regain with ranks | `be60238e..0b18ce2a` | no — `reports/executor-3-report.md` |
| 4 Ucisk in the simulation | `0b18ce2a..7bee096f` | yes: `reports/review-4-report.md` FAIL (2 blocking) → fix `7bee096f` (`reports/fix-4-report.md`) → `reports/review-4-fix-report.md` PASS |
| 5 the tests agree | `7bee096f..17a80c09` | no — `reports/executor-5-report.md` |
| 6 saved game version 12 | `17a80c09..e2850d3f` | yes: `reports/review-6-report.md` PASS |
| 7 the paragraph and the chronicle | `e2850d3f..82da905e` | no — `reports/executor-7-report.md` |
| 8 the values of the numerical branches | `82da905e..8829f36f` | no — `reports/executor-8-report.md` |
| 9 Ucisk in the pick (tests) | `8829f36f..3e458949` | no — `reports/executor-9-report.md` |
| 10 the lists of the view tests | `3e458949..878fc9e9` | no — `reports/executor-10-report.md` |
| 11 the reference program | `878fc9e9..6955a494` | no — `reports/executor-11-report.md` |
| a repair of eight quotation lines (the orchestrator's step) | `6955a494..5731b592` | no — `reports/repair-1-report.md` |

For each blocking finding name the slice it comes from (or that it comes from none: a gap of the plan, or the foundation entries). The reports named above are the executors' claims, to verify; read them for the mismatches they pass on. Also given: the walk of the running game by a fresh agent, `reports/walk-report.md` (all seven cases right; states composed by script where it says so; side observations on the phone layout not caused by this change).

## What the orchestrator tells you (information, not grading — grade and scope are yours)

- Mismatches passed on from the mechanical checks: Slice 1's executor did **not** make `actionInRepertoire` judge an item action by its pair, as the plan's Goal says, because `Repertoire` is a type alias of `Understanding` and holds no predispositions; `repertoireOf` does judge the pairs (a kind is dropped when all its pairs are closed). The orchestrator accepted it as a limitation (no effect with one archetype and the bandage as the only target of `craft` and `tend`; the item-pair paths have only a throwaway probe `reports/executor-1-probe.mjs` and the real data's tests of Slice 2). Judge it; say whether you hold it a blocking miss of the task or of the plan only.
- Slice 4's executor also changed `tests/invariants/test_program_closed_lists.py`, `tests/sim/gear-wear.test.mjs` and `tests/sim/tending.test.mjs` (judged sound by its review). Slice 9's executor also changed the list at `tests/view/program-editor.test.mjs:801` (a test failing on the base of the slice). Slice 11's executor says the agreement case passed against an empty stub, so its failing-first evidence is two preconditions only.
- Minor findings of the slices' own reviews, kept for the request (not for you to fix; judge whether any of them is yours now): Slice 4 — M-1 a saved fight with turns of Ucisk loads for a character who never bought the branch; M-2 the crafted documents of Ucisk stand in `tests/sim/pressure.test.mjs` and not among the cases of the invariant `save-version` in `tests/sim/saved-game.test.mjs`; M-3 the comment of `WIELDING_SLOT` in `src/browser/sim/data/gear.ts:32-35` reads more broadly than the code; N-1 a comment above a new test restates its name. Slice 6 — m-1 the comment and `practice.tending: 3` of the version-12 document count a tend the rules could not have finished (in scope); m-2 the guideline `guidelines/coding-saved-game.md` does not name this cause of a version raise (out of scope).
- The foundation step left D-416's *Rejected* with an old count (about 22 rows at eight trees and fourteen branches); the return step will correct it, it is not yours.
- The orchestrator's choices Q1–Q3 and C1–C2 (words for the pocket's refill, the `status` and paragraph element of Ucisk, the units of the previews, the stale quotations, the repertoire limitation) are in the plan's text and the slices' handoffs; check each against the task and the foundation: you owe the human no deference to them.
- The measurement of item 5 of *To do* (the three-row table on the wolf pack and on Las — głębiej, the order of the two maps, the check of item 6) is the orchestrator's step after your review; not yours. Item 7 and item 8 (no number of the map, the wolf or the bandage changes) are yours to verify from the diff.
- The slices ran the focused checks of their *Checks*; the full suite has **not** run yet on the head; its run is the cycle's own. `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` exits 0 at the head (the repair step's report).

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

