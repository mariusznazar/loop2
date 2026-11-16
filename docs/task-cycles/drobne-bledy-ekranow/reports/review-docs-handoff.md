# Handoff — reviewer of the whole change, pass 2: documents and foundation — cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything; a question goes to the orchestrator in your report with status `questions`. You are an agent that made none of the change. Nothing the orchestrator says is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`. Confirm `git rev-parse HEAD` is `5b3dac418ed9d744c4e9854b068909b96944be57` (if it differs, ask which range to review, as `review-change` section 4 gives, before you go on).
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Method: `review-change`, `.the-way/task-cycle/review/SKILL.md`, read whole; for the review of the whole change read `.the-way/task-cycle/review/whole_change.md` and follow it. Read a file those name only when the step that names it comes.
- Range to review: base `bd82d394e8ea08c77c8c8afb695bd931706f1644` to head `5b3dac418ed9d744c4e9854b068909b96944be57`. Compute the diff yourself (`git diff <base>..<head>`, `git log <base>..<head>`).
- Read-only: you change no file of the product and make no commit. Your only writes are your report and your working copies.

## Working copies (first paragraph of the cycle's rule, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.

## What the change is, and what you are given

- The frozen task (the source and the only authority; read it whole): `.runs/task-cycles/drobne-bledy-ekranow/task.md` — 25 points of *To do*, *Questions to settle* with answers, *Decisions in play*, 17 rows of *Settlements to record*, *Out of scope*.
- The plan: `.runs/task-cycles/drobne-bledy-ekranow/plan.md` (and `plan-size.md`): 21 slices and a *Foundation entries* section; no spec was written. The *Model* of slices 12, 16, 18, 19 and 20 was raised to `same` by the orchestrator.
- The route: planned slices, made one after another by executors. **No slice had a review of its own: you judge every slice** (the one author's route has no slice reviews here).
- Answers of step 4: trust boundary no; irreversible operation no; the pin did not move; the base had no failing checks.
- Ranges (each slice starts at the previous head; the foundation entries come first):
  - foundation entries: `bd82d394..fecbea47` (commits `dddbc7d5` decisions and 32 re-quoted `decision:` lines of tests, `fecbea47` styleguide)
  - slice 1 `fecbea47..13ac5dd9` · 2 `..f4489d36` · 3 `..a4bab0a7` · 4 `..8a4194c5` · 5 `..61002f91` · 6 `..23aa5440` · 7 `..39ca66af` · 8 `..85e379de` (also `30a63b81`) · 9 `..bc79b284` (`eb8986aa`, `bc79b284`) · 10 `..855939b0` · 11 `..2b4fdc3a` · 12 `..798c278a` · 13 `..69a42675` · 14 `..90967593` · 15 `..dc787331` (`0f269e61`, `dc787331`) · 16 `..1130a9be` · 17 `..2d62c5d2` · 18 `..4c256a99` · 19 `..cf068a01` · 20 no commit (the executor played the game and found both numbers right by the rules) · 21 `..5b3dac41`.
- The executors' and the foundation agent's reports (claims to verify, never evidence; a rationale in them never lowers a grade): `.runs/task-cycles/drobne-bledy-ekranow/reports/foundation-entries-report.md` and `slice-1-report.md` to `slice-21-report.md` (slice 3's was persisted by the orchestrator from the executor's returned message).
- The planner's report: `reports/planner-report.md`.
- Minor and out-of-scope findings of earlier reviews: none (there were none).

## Deliberate decisions of the cycle (so you do not report them as faults; you still report faults in the code that carries them)

1. Slice 20 (To do 12) made no commit on purpose: the executor replayed one game in a real browser, read „Eksploracja +1” in the run and „0/15” after „Zakończ”, and both follow D-194, D-199 and D-201; the task asks for exactly that (point 12). Judge whether its argument holds, not that no commit exists.
2. Slice 1 changed only a test: the data of conditions already hold every unit, so `conditions.ts` is unchanged; the unit rule has no foundation entry because row 16 goes to „data or code”.
3. Slice 12 narrowed the table of tiles by breaking the long fire cell between its texts, not by narrowing columns; the scroll fallback of the task was not needed (the executor measured it in the running game at 1280 × 720).
4. Slice 9 resets the folds inside the program panel (a send is recognised by `mapRunStarted` without `mapRunEnded`); `game-view.ts` is unchanged. Earning loops are not handled, because the task names a send and a switch only.
5. Slice 6 moved the types of focus targets and `focusAfter` to `rule-list.tsx` as a plain move; its `up`, `down` and `add` branches are dead code there.
6. Slices 8 and 15 changed `rule-panel.tsx`, `email-confirmation.ts` and its test, outside the plan's *Change* lists, on the orchestrator's answer (task points 15 and 4 require them).
7. The foundation entries were written before the code; until a slice landed a decision described what the code did not do yet. At the head every decision must be true.
8. The foundation agent updated the examples of D-306 (units) and left D-288, D-295 and one more decision with „Zapas poniżej 8 · Patyk” without a unit; **the return step of the cycle will correct those after your review**. Report them only if you find others, or a wrong one the return step would not know.
9. Screenshots shown to the human were pushed by executors to the repository of screenshots as D-418 and D-419 settle (outside this repository). Nothing of them is in the diff.
10. Points outside the task (*Out of scope*): loop2#65-3, #79-2, #025-6, #043-22, #78-3, #059-8, #83-1, #83-3 stay as they are.

## Carried to you by the orchestrator (look at these; say what you saw or that it stayed unchecked)

- The look of the unit in the running game: the number field of the rule panel (slice 4), the rows of rules and the wolf's sentence on the screen of the run (slices 3 and 5); the two forms of the line of a changed program (slice 10); the chronicle entry of a changed rule (slice 11).
- Slice 8: `openKey` and `holdingTarget` assume rule numbers are unique within a program (check in `program-editor.ts`); the drag-handle move across a group border was checked only in jsdom.
- Slice 12: its executor did not read the styleguide whole nor D-311, D-385, D-396, D-421, D-43, D-417 to D-420 nor the invariants; check its CSS (the rule of the fire cell, cells aligned to the top) against the styleguide and D-396; an unrevealed hovered tile still gets the class `hovered` that no rule reads; the keys of the fire-cell spans are the texts (duplicates with two identical burning items).
- Slice 17: the test "a click on an item of the bar, which stands outside the menu, closes it" asserts focus on „Konto” and passes only because jsdom does not move focus on click; in a real browser a clicked link takes focus, which D-285 now leaves there.
- Slice 18: `placeOf` returns the reached place for every goal that stays; death and completion mid-walk also freeze the mage where it stands (D-318 lists only the actions) — judge against D-316 to D-319; slice 19 saw in the running game a mage stopped where it had come (70.96 % of the frame) and a mage dead mid-walk frozen at 57.92 %.
- Slice 19: the cause was the browser cancelling animations when the screen is hidden (`animationcancel`); the same gap probably stands for the tint's return, the flight, dust and wolf effects, which end only on `animationend` (not checked, outside task point 10): judge whether it is a finding or an out-of-scope remark.
- Lint and format at the head of every file changed in the range: an executor once called faults of an earlier slice „present at base”; run `npx eslint` on the changed `.ts`/`.tsx` files and `npx prettier --check` on every changed file, and report each with its exit code.
- Run the foundation check `python -B .the-way/elements/common/foundation_check.py` and the instruction check `python -B .the-way/instruction-files/check_instructions.py`; do NOT run the full suite (`npm test` without a file): the full gate is the orchestrator's alone, and it waits for a signal of the human's adviser. Focused `npm test -- <file>` runs are yours to make.
- Do not push screenshots yourself unless you need to show one to the human; where you do, place it as D-418 and D-419 settle and give its address.

## How to write the report

Write it to your report path as `review-change` gives it: the first line `PASS <sha>` or `FAIL <sha>`, then the graded findings, the checks you ran with their commands and exit codes, how many decisions of your index you read whole (WAY-150), your reaches beyond the handoff, **Unread material**, **Searches not found or unclear**, and the line on working copies.

The form of each finding (the human's rule for reading reviews): an anchor `path:line`; the full wording, never shortened; and an expanded justification — why the code or sentence exists, the mechanism of the fault, an example with concrete values, the fix. A finding without an anchor is not finished. Order: blocking findings, then Minor within the task, then Minor outside the task's scope, then what is good. Say for each finding which slice it comes from (or that it comes from none).

Two reviewers read this range in separate passes, by scope, because documents lose attention when they travel with code: yours is given below.

## Your scope: the foundation and the documents (pass 2 of 2)

You are a reviewer of the whole change for its **documents**: `foundations/decisions.md` (D-04, D-172, D-207, D-285, D-294, D-297, D-306, D-342, D-350, D-381 and whatever else the diff touches there), `guidelines/styleguide-browser-view.md` (rows 7, 11, 12, 13, 14 of the plan's *Foundation entries*), and the `decision:` comment lines of nine test files re-quoted by the foundation agent (comment lines only: confirm that nothing else of those files changed in that commit). Judge each of the 15 rows the foundation agent wrote (1-9 and 11-15, 17 of *Settlements to record*) against the frozen task: the row's meaning kept whole, no meaning added (an entry may not decide more than the task and its answers), the wording of a decision sentence true of the code **at the head**, the *Rejected* of D-350 as row 3 puts it, `Verification` and `Rationale` consistent with the new sentence, no sentence that contradicts another decision, invariant or glossary term. Also judge rows 10 and 16 (they go to the code and the data, not to the foundation): are they carried by the code and its test.

For every decision whose sentence says what the code does, read the code at the head and say whether it is true: D-297 (arrows at a group edge; `moveRule` in `program-editor.ts`), D-306 (the panel follows its rule across groups, deletion closes it), D-294 (new copies unfolded at a send and at a switch), D-172 (the two sentences of the line), D-342 (the chronicle's wording), D-207 (the rhythm after a failed save, `game-saver.ts`), D-285 (a click outside the menu „Konto”), D-381 (a refused emailed link and „Anuluj” — the foundation agent wrote its wording before the code; check both against `app.ts` and `email-confirmation.ts`), D-04 (the three sources). For the styleguide rows, check them against the code where they say what the code does (a greyed pick cell takes no highlight under the pointer; a long typed name breaks in its row; focus never falls to the page).

Do not review the code for style or defects as a code reviewer would: a first reviewer does that in a separate pass. Where you find a fault of the code while checking a sentence, report it as a finding of the sentence's truth. Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/review-docs-report.md`. Your directory for working copies: `.runs/review-docs/`.
