# Handoff — the review of correction 1 (task rana-i-opatrunek)

You review a correction made for the human's remarks on the open request, with `review-change`, as a fresh agent of the type `the-way-stage` that made none of it, on the strongest class (the human asked that the reviews of this round run on `opus`). Read `.the-way/task-cycle/review/SKILL.md` whole and, for a correction, `.the-way/task-cycle/review/fix.md` whole and follow it: **the remarks stand in place of a findings file**. You are read-only on the reviewed worktree.

- The remarks, word for word, which bind: `.runs/task-cycles/rana-i-opatrunek/reports/correction-1-remarks.md` (items 1, 2(a), 2(c) ask for a change; 2(b), 3 and 4 say „przepuść”, so nothing is to be made for them and you judge no miss there). For each remark say made or not made.
- Range: base `83204edc5025b9f6ff60feb9c4b8f530c585edb7` (the head of the request before the correction) to head `26c0209e…` (`git rev-parse HEAD` in the worktree `the worktree's root` shows it; four commits: `2998b1aa`, `b04a9f2f` part A; `dbc931e8` part B; `26c0209e` part C). Compute the diff yourself.
- The three parts' reports (claims to verify): part A `reports/correction-1a-report.md` (with its probe `reports/correction-1a-probe.mjs`); part B `reports/correction-1b-report.md`; part C `reports/correction-1c-report.md` (with its measurement files `reports/correction-1c-*.json`). Their handoffs say what each was to do: `reports/correction-1a-handoff.md`, `…1b…`, `…1c…`. The frozen task `.runs/task-cycles/rana-i-opatrunek/task_frozen.md` (read it whole) still binds; the earlier reports of the cycle are not yours unless named.
- What to check:
  - **A (item 1):** the type `Repertoire` in `src/browser/sim/understanding.ts` / `types.ts` now carries the predispositions; `actionInRepertoire` judges an action on an item by its pair (D-120, D-193); the field is derived and required, nothing of the saved shape changed (the Understanding is saved: confirm); every place that builds or reads a `Repertoire` is consistent; the four (the report says seven) comparisons of the type in `tests/sim/repertoire.test.mjs` expect the field and were not loosened; the new test with a second recipe item and a second target (made up in the test) **fails on the code before the correction** (check it: run the new test against the base `83204edc`'s `understanding.ts` in a worktree of yours) and passes now, and it names the break it catches. The part report names a related gap it left: the target pick of the program editor (`knownTargets` in `src/browser/view/item-target-pick.ts`) still offers every recipe item to a character without the tree; the remark does not ask for it (it asks for the rule check and the type); judge whether leaving it is a miss of the remark or a finding outside the correction's scope, and say which.
  - **B (item 2a):** the sentence added to `guidelines/coding-saved-game.md` states the cause right (an old save whose keys stay but which describes a game the rules no longer make — it would never get what is new), stands where the causes stand, is in the file's Polish and style, leaves the fields of the rule true; compare the file with `.the-way/product-guidelines/template.md` and the coding template of `product-guidelines/coding/` (the form), and check that the paragraph edit the agent made (the parenthesis on data checked at the load) says only what is true. The correction was to go through the process that maintains the coding guidelines: check from its report that its steps were followed.
  - **C (item 2c):** the CSS change in `src/browser/run-screen.css` (and the comments of `src/browser/view/now-rows.tsx`) lets the row „Teraz” show „Wytwórz — Opatrunek” whole at 360 px without changing the row's height, the width of the scene, or anything under the row (the remark's own bounds); it does not contradict a binding sentence of D-334, D-335, D-336, D-396 or D-43 and the rules of `guidelines/styleguide-browser-view.md` (read the file whole); the 1280 px layout is unchanged; the before and after numbers of the report are sound (re-run the measurement in a worktree of the head if you can, with the local start as `.claude/skills/loop2-play/SKILL.md` gives, and look at the two screenshots the report links, in the public repository `mariusznazar/screenshots`, commit `fc94fd3a…`); the limit the report names (two lines; a longer text would be clipped) is judged.
- Foundation: the correction did not change `foundations/`; the return step, which follows your review, compares the entries with the code (D-120's *Verification* will name the new test). Name in your report any entry you hold false after the correction.
- Do not run the whole suite. Focused checks as the method gives; the mutation tool on the changed simulation lines (a narrowed configuration of your own). Working copies in `.runs/review-correction-1/`, removed before you return (remove the `node_modules` junction first with `rmdir`).
- Report: `.runs/task-cycles/rana-i-opatrunek/reports/review-correction-1-report.md`, first line `PASS <head sha>` or `FAIL <head sha>`; findings by grade; **Declined to judge**; checks with command and exit code; reaches; working copies; **Unread material**; **Searches not found or unclear**. Return the first line, the counts, a one-line check result and the path.

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

