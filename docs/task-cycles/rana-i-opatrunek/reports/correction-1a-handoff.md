# Handoff — correction 1, part A: the pair judged at the rule check (task rana-i-opatrunek)

You make part A of a correction after the human's remarks, as a fresh agent of the type `the-way-stage`, variant of `make-change`: **a correction for the human's remarks** (read `.the-way/task-cycle/change/SKILL.md` whole, sections 2, 3 and 6; the remarks bind). The cycle's orchestrator gives parts B (a guideline sentence) and C (a row of the map-run screen) to other agents after you; do not touch their files.

## The remark you carry (word for word; it binds)

> 1. Reguła z „Wytwórz — Opatrunek” sprawdzana po rodzaju czynności, a nie po parze — **popraw w tym żądaniu.** Następne zadanie z tłukiem zbuduje dokładnie na tym, a ta sama przyczyna stoi za uwagą m-1 (`actionInRepertoire` nie ocenia czynności z przedmiotem po parze). Napraw obie razem u źródła: predyspozycja w typie, który opisuje, co postać może, z parą czynność–cel. Dopisz przypadek testowy z drugim przepisem albo drugim celem (zmyślonym w teście), który dziś przeszedłby błędnie. Zmień cztery testy porównujące ten typ.

(The remark's „m-1” is finding m-1 of the whole-change review, in `reports/review-whole-report.md` under *Minor findings*; the fixer's analysis of it, with the proposal, is `reports/fix-whole-report.md`, section „m-1 — contested”: read both. Parts of the task that bind: `.runs/task-cycles/rana-i-opatrunek/task_frozen.md` *To do* item 1 and item 2, and D-120 and D-193.)

## What to make

- Worktree `the worktree's root` (branch `task/rana-i-opatrunek`), head `83204edc5025b9f6ff60feb9c4b8f530c585edb7`; your range runs from there. Pinned the-way: the worktree's `.the-way` (`6ed3cb36`). Commit by path, in English, several commits fine (the failing test first), no push. Your directory for working copies: `.runs/correction-1a/`. Report: `.runs/task-cycles/rana-i-opatrunek/reports/correction-1a-report.md` (the file is the input of the cycle's scripts). The cycle record and other agents' files of the record directory are not yours except those named here.
- The type `Repertoire` is today `export type Repertoire = Understanding` in `src/browser/sim/understanding.ts`; it holds no predispositions, so `actionInRepertoire` judges an action that takes an item by its kind (`craft`, `tend`, `pressure`, `equip`) and `repertoireOf` keeps a kind in `repertoire.actions` where at least one of its pairs is open. With one recipe item (the bandage) and one archetype that never differs; with a second recipe item or archetype a rule „Wytwórz — Opatrunek” would count as open for a character that lacks the skill that grows that pair.
- Make the correction at the source, as the remark says: **the predispositions inside the type that describes what a character may do, with the pair verb–target**. The orchestrator's reading of the remark, from the fixer's proposal: `Repertoire` becomes a type of its own, the Understanding plus the skills among the predispositions the repertoire was computed from (a required field, not optional: no silent fallback to the kind); `repertoireOf` sets it; `editorRepertoire` and `knownRepertoire` carry it; `actionInRepertoire` judges an action that takes an item by its pair (open where a skill among the predispositions grows the pair or no skill grows it; a kind with no item judged as before); `pairOpen` or the existing pair helpers of `src/browser/sim/skills.ts` are reused, not copied. Where the code shows a better shape than that proposal, take it and name it with the way rejected in your report; where the change would reach the saved game's shape (the Understanding is saved) do not change the saved shape: the new field is derived, not saved.
- Change the tests that compare that type (the fixer counted four expectations of `tests/sim/repertoire.test.mjs`, `deepEqual` of a repertoire against a bare Understanding, lines about 105, 131, 316 and the `without` case about 309, and the literals of repertoires in the tests, `SMALL` and others): they expect the new field; do not loosen an assertion.
- Add the test case the remark asks for, written first and seen failing on your base: a laid second recipe item (a made-up item with a recipe and a made-up target for „Wytwórz”, laid in the data as `tests/sim/pressure.test.mjs` and `tests/sim/tree-entry.test.mjs` lay rows) so that the kind `craft` stays open through it for a character whose archetype lacks the skill that grows „Wytwórz — Opatrunek”: a rule „Wytwórz — Opatrunek” must be refused as out of the repertoire (and the reason read as D-310 reads it), a rule „Wytwórz — {the made-up item}” stays open. Add the new test file to `stryker.config.json` if it is a new `tests/sim/*.test.mjs` (the test `tests/quality/test_mutation_test_selection.py` checks the list) and name the break each test catches.
- Read whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/testing.md`; decisions D-120, D-126, D-193, D-195, D-196, D-310, D-443 (find each by its heading `### D-<n> —` in `foundations/decisions.md`, never read the file whole); the files you change, whole, before you change them; `src/browser/sim/understanding.ts`, `src/browser/sim/skills.ts`, `src/browser/sim/game.ts` and the places that build or read a `Repertoire` (`grep -rn "Repertoire" src/browser tests`).
- Run the focused checks: every test file that reaches the type (at least `tests/sim/repertoire.test.mjs`, `tests/sim/tending.test.mjs`, `tests/sim/tree-entry.test.mjs`, `tests/sim/action-targets.test.mjs`, `tests/sim/data.test.mjs`, `tests/sim/rules.test.mjs`, `tests/sim/rule-signs.test.mjs`, `tests/sim/discovery.test.mjs`, `tests/sim/program*.test.mjs` and the view tests of the program editor, `tests/view/program-editor.test.mjs`, `tests/view/rule-editor.test.mjs`, `tests/view/pressure-pick.test.mjs`), `npm run typecheck`, `npm test -- tests/quality/test_function_and_file_size.py`, `npm test -- tests/quality/test_mutation_test_selection.py`, `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` (exit 0), each with its exit code. **Never run the whole suite.**
- Also in your report: a check against the requirement you think you most likely did not meet (the own-work check), each choice with the way rejected, **Unread material** and **Searches not found or unclear** (`none` where none), working copies.

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

