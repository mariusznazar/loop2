# Handoff — correction 1, part B: one sentence in the guideline of the saved game (task rana-i-opatrunek)

You make part B of a correction after the human's remarks, as a fresh agent of the type `the-way-stage`, variant of `make-change`: **a correction for the human's remarks** (read `.the-way/task-cycle/change/SKILL.md` sections 3 and 6; the remark binds), **by the method of the process that maintains the coding guidelines**: read `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md` and follow it (it sends you to `.the-way/product-guidelines/coding/SKILL.md`, read whole, and to the files it names when its step comes, among them `.the-way/product-guidelines/template.md` and the coding template). The human's remark settles what is asked, so you do not ask the human anything: the skill's steps that ask are answered by the remark below.

## The remark you carry (word for word; it binds)

> (a) wytyczne zapisu gry bez przyczyny „stary zapis nigdy nie dostałby czegoś nowego” — **popraw w tym żądaniu:** dopisz tę przyczynę podniesienia wersji do `guidelines/coding-saved-game.md` drogą, którą wytyczne przewidują (`the-way-maintain-coding-guidelines`). To jedno zdanie, a następny autor zapisu na nim zbuduje.

## What to make

- The file: `guidelines/coding-saved-game.md`, the rule „Wersja podnoszona razem z kształtem” (about lines 95–125 in the Polish text). It lists the causes of a raise of `SAVED_GAME_VERSION` (a change of the type `GameState`, of the items the data give that `Backpack` counts, of the slots of the gear, of an ordinary action) and says that a change of skills, branches and other data checked at the load „nie podnosi wersji sama (poza …)”. It does not name this cause, which this task met (the version rose from 11 to 12): **a change after which an old saved game, though its keys stay, describes a game the rules no longer make — for example a new skill tree enters the Understanding only in the game minute in which its first action is discovered, so an old save in which that action is already discovered would never get the tree**. The code states it in the comment over `SAVED_GAME_VERSION` in `src/browser/sim/saved-game.ts` (read it) and the decision is D-195 and D-206 (read both, each whole, by their headings in `foundations/decisions.md`; never read that file whole).
- Write **one sentence** (two at most) in Polish, in the place of that rule where the causes stand, in the style of the file, so that the next author of a change to the saved game builds on it. Keep the rule's structure (its *Decision*, *Invariant*, *Good*, *Bad* fields) as the template of the guidelines gives it; change a field only if the sentence you add makes it false. Add no example unless the template and the file's own pattern ask for one. The sentence does not name this task, a tree or a skill by its in-game name as the only case: give the general cause, and one short example with the tree entering the Understanding is allowed.
- Worktree `the worktree's root` (branch `task/rana-i-opatrunek`), head `b04a9f2fa9acfa15ed554b2e392717f0df6d419f` (the end of part A); your range runs from there. Commit by path, in English, no push. Your directory for working copies: `.runs/correction-1b/`. Report: `.runs/task-cycles/rana-i-opatrunek/reports/correction-1b-report.md` (the file is the input of the cycle's scripts). The cycle record and other agents' files of the record directory are not yours except those named here.
- Checks (each with its exit code): `python -B .the-way/elements/common/foundation_check.py` **without** the switch (the guidelines are checked by it: the part each file belongs to, the references of the rule to its decisions and its invariant), `python -B .the-way/instruction-files/check_instructions.py` if the guideline files are among the files it reads, and the tests of `tests/agent_workflow/` that read the guidelines (find them: `grep -rln "guidelines" tests/agent_workflow`; run them as `npm test -- <path>`). Never run the whole suite.
- Report: what you wrote word for word, where, why there, the method steps you followed (which file of the-way you read), each check, **Unread material**, **Searches not found or unclear** (`none` where none), working copies.

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

