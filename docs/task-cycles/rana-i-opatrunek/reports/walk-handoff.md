# Handoff — the walk of the running game for the task rana-i-opatrunek

You walk the finished change through the running game, as an agent of the type `the-way-stage`. This is the walk that `.the-way/task-cycle/change/walkthrough.md` asks of an author, which the executors of slices 2, 3, 4, 7 and 8 did not do because the screens of the change were not all there yet; all eleven slices are now committed. You change no tracked file: you only look, you do not fix; a defect you find goes in your report.

- Read whole: `.the-way/task-cycle/change/walkthrough.md`, `.the-way/task-cycle/change/ui_check.md`, `.claude/skills/loop2-play/SKILL.md` (how to run the game locally over HTTPS and operate it in a real browser — the Playwright CLI, the phone layout with touch), `guidelines/styleguide-browser-view.md` (whole; the states and the rules of the screens you will look at), and `.runs/task-cycles/rana-i-opatrunek/task_frozen.md` *To do* items 1–4 (lines 29–32), which are the requirements you walk against.
- Worktree `the worktree's root` (branch `task/rana-i-opatrunek`, head `5731b59213c317bdfb76e0ed27ca0768c2dbdbcb`); build the game there as the skill says; `node_modules` is a junction to the main checkout's. Your directory for working copies and the local start's database: `.runs/walk/`. Stop the local start when you finish.
- Report: `.runs/task-cycles/rana-i-opatrunek/reports/walk-report.md` (the file is the input of the cycle's scripts). The cycle record and the other files of the record directory are not yours. Return the status, a one-line result and the report path.
- Screenshots: the foundation settles the place (`foundations/decisions.md` D-418 and D-419; read both): you push the screenshots you show to the public repository `mariusznazar/screenshots` yourself, with the `gh` account on this computer, to the directory `loop2/rana-i-opatrunek/` on the branch `loop2/rana-i-opatrunek`, never to `main`; the report gives each as the link to its file in a commit of that repository with `?raw=true`, as D-418 gives. Show at most the eight screens named below, at 1280 px and at 360 px with touch where the case says so. No image goes into the repository of loop2 or into the report's files. The screenshot tool's own files are working copies: move them into `.runs/walk/` and remove them at the end. Use a test account made through the login card and no personal data in any picture.

## The cases (from the requirements, not from the code)

For each case give the verdict (right / wrong / not reached), how you reached it (the system, the browser, the address), and what you saw.

1. **The screen Postać, the tree**: the tree „Opatrywanie małych ran” stands last, after „Unik przed ciosem”, with its level and points; its branches stand with prices 1 · 1 · 2 („Mocniejszy zwój”), 1 · 1 · 2 („Wprawna dłoń”), 2 · 3 („Szybkie gojenie”) and 3 („Ucisk”); the descriptions read „Opatrunek leczy więcej.”, „Opatrujesz szybciej.”, „Rany schodzą same szybciej — cecha, działa zawsze.” and „Opatrzenie w trakcie starcia, za turę zamiast za dziesięć minut.”; the numerical branches show „teraz … → po kupnie …” with the decimal comma („0,05” → „0,1”, then „0,15”, never „0.15000000000000002”); Ucisk shows its price and **no** before-and-after values. (A character with practice and points: compose the state as the skill and the earlier cycles did, with the game's own functions, and let the game's loader accept it.)
2. **The practice of the tree**: „Wytwórz — Opatrunek” and „Opatrz — Opatrunek”, each carried out to its end, raise the practice of the tree by one; a bought „Wprawna dłoń” makes „Opatrz” last 2 minutes less per rank (and at least 1 minute).
3. **The rule panel of the program editor**: in the group „Żywność i walka” the cell „Ucisk” stands after „Odskocz” and before „Załóż”, with the icon of „Opatrz” (the rolled bandage); at its cell no price, at its target „Opatrunek (1 opatrunek)”, at the chosen action „Ucisk — Opatrunek (1 opatrunek)”, the time „tura”; with the branch not bought in a map run the cell is grey with „gałąź niewykupiona”; outside a fight a rule of Ucisk is amber with „tylko w walce”; with full health, in a fight, „zdrowie pełne”; with no bandage anywhere „brakuje 1 × opatrunek”.
4. **A fight with Ucisk**: a character with the branch bought and a bandage in the belt pocket and one in the backpack, the program holding a combat rule „Zdrowie poniżej 50 → Ucisk — Opatrunek” before „Uderz — patyk”: in a fight against a wolf the paragraph of the encounter gives „Mag uciska ranę: zdrowie {h}/{pełne}” with the health after the turn; the health goes up by 25 (more with „Mocniejszy zwój”), never above 100; the bandage of the pocket is used up and an empty pocket takes one from the backpack, which the encounter paragraph and the chronicle give as „bierze opatrunek z plecaka do kieszeni” (the chronicle line without an actor: „Bierze opatrunek z plecaka do kieszeni”); the screen of the map run shows the line of gear with the pockets.
5. **The wolf pack still enters and still can be solved without a bandage**: start a map run of the wolf pack (`forestPack`, opened by the map before it) with a character with no bandage and the starting program; it must be possible to enter it and the game must not refuse (a wall never refuses to be entered).
6. **The phone layout** at 360 px with touch for the screen Postać (the new tree) and the rule panel (the cell „Ucisk”): no horizontal scroll, no control under 48 px, the new texts readable; the console shows no error in any case.
7. A saved game of the previous version (11) is refused with the page's sentence and a new game saves at version 12 (the slice 6 executor did this walk; repeat it once, briefly, to confirm at the head).

Mark each case you did not reach as `not reached` with the reason. Where a case needs a state the game cannot be played into quickly, compose it by script from the game's own functions as the skill describes, state that in the report, and do not call a composed state "reached by play".

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

