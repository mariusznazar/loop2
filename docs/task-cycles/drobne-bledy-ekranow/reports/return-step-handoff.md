# Handoff — the return step, cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything; a question goes to the orchestrator in your report with status `questions`, or `blocked` for a question the foundation step leaves to the human. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`, head `fe15a2671b959c3162ff7dea2203c48c0c7f8137` (the head after fix 1, which both reviewers passed). Your commits come after it.
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your stage: **the return step** (step 11 of `implement-task`). Method: `make-change`, `.the-way/task-cycle/change/SKILL.md`, read whole — you take none of its rows of variants; your stage is the return step. Read `.the-way/task-cycle/skill/return_step.md` and `.the-way/task-cycle/skill/foundation_step.md` whole, and the `SKILL.md` of an element (`.the-way/elements/decisions/skill/SKILL.md` for a decision, `elements/glossary/skill/SKILL.md`, `elements/part-map/skill/SKILL.md`, `elements/invariants/skill/SKILL.md`, `elements/environment-facts/skill/SKILL.md`) when you write an entry of it. You have no skill tool; read a skill named by its name alone as a file.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/return-step-report.md`. Your directory for working copies: `.runs/return-step/`.
- The frozen task (the source and only authority): `.runs/task-cycles/drobne-bledy-ekranow/task.md`; the plan: `.runs/task-cycles/drobne-bledy-ekranow/plan.md`; the decision index of the selection: `.runs/task-cycles/drobne-bledy-ekranow/decision-index.md`.

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

## What you compare and write

The change at the head: `git diff bd82d394e8ea08c77c8c8afb695bd931706f1644..HEAD` (21 slices, the foundation entries, fix 1; commits are named in `git log`). Compare with the code at the head, and correct in the same change whatever no longer matches (WAY-11):

1. Every decision the change wrote or changed — D-04, D-172, D-207, D-285, D-294, D-297, D-306, D-342, D-350, D-381 — with its *Verification* (its `tests:` clause and its pairs of examples: where a test now holds part of a sentence, move that part from the pair to the clause and leave a pair only for a part no test holds), and the decisions the task names in *Decisions in play* (D-41, D-316, D-318, D-319, D-322, D-336, D-348, D-370, D-371, D-396, D-421, D-208).
2. The part map of the touched parts (browser-view, simulation, product-foundation, agent-workflow) against the files the change added or moved (a new test file `tests/view/login-card-focus.test.mjs`; check the others).
3. The glossary: a word the change uses in a meaning another than its entry (read `foundations/glossary.md` whole).
4. Searches of the whole foundation (WAY-33) for entries that name what the change changed (the arrows at a group edge, the rule panel following its rule, the folds of a copy, the line of a changed program, the chronicle's wording of a changed rule, the unit of a condition's number, the focus after „Zatrzymaj”, after a refused emailed link and after „Anuluj”, the menu „Konto”, the rhythm of saving after a failed save, the mage stopping where it reached, a walk cut by leaving the screen).
5. The things the reviews and the orchestrator already know: **N-1** of the docs review (`reports/review-fix-1-docs-report.md`): D-297 still says no test checks the empty group at the edge, though `tests/view/program-editor.test.mjs:1614-1624` checks the arrow toward it is enabled; move "enabled" into D-297's list of what tests check and keep the example only for where the rule lands. The examples `Zapas poniżej 8 · Patyk` without a unit stand in D-144 (the wolf's program in the data: judge whether the unit belongs there); fix 1 and the foundation agent already gave units to D-288, D-291, D-295, D-300, D-306 and D-309. Row 16 of *Settlements to record* goes to the data and a test (no entry); rows 10 and 16 need no entry. Where a decision's test clause cites a test that exists, check the cited test exists with that name at the head.
6. The decisions the cycle's `decision:` lines of tests cite must still begin a sentence of their decision: run `python -B .the-way/elements/common/foundation_check.py` (exit 0, `0 errors`) at your head.

Write nothing the task excludes and nothing for later; a choice that binds after the merge goes where the questions of the decisions template put it (and where the place is a row of the questions table, no entry). Never write an invariant for behaviour merely because no invariant covers it. Where you find a code fault, report it; you change no code, tests or comments (the return step corrects the foundation).

## Checks

Run `python -B .the-way/elements/common/foundation_check.py` and `python -B .the-way/instruction-files/check_instructions.py` at your head, each with command and exit code. Never run the full suite (`npm test` without a file): the full gate is the orchestrator's alone and waits for a signal of the human's adviser. Commit with explicit `git add <paths>`, messages in English in the style of the repository.

## Your report

The report of the return step as the record's *Return step* gives it: the foundation compared with the code (what no longer matched and its correction, or none); decisions, invariants, environment facts, glossary terms, part-map changes written or changed (identifiers or none); projected entries written; the row of *Settlements to record* each written settlement went to; one sentence of meaning in English and one in the task document's language for each entry you write or change and its mark (`row <n>`, `projected` or `the cycle's`); your commits; your own-work check; your questions and concerns; **Unread material**; **Searches not found or unclear**; reaches beyond the handoff; and the line on working copies.
