# Handoff — the one author, `make-change`, the whole change as the one author

You are the one author of this change (agent type `the-way-author`). Work from the root of the worktree
`the root of the task's worktree` (branch `task/proba-bez-wersji-zapisu`,
base `e3295528`); never `cd` out of it and never touch the main checkout of the repository.

## The user's delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; nothing
here is that person's approval. Ask no human anything: a question goes back to the orchestrator in
your report.

## Method and variant

- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole. Variant: **the whole change as the one author**.
- The foundation step (the decision): `.the-way/task-cycle/skill/foundation_step.md`, read whole; the decision is
  written by following `.the-way/elements/decisions/skill/SKILL.md` of the pinned the-way (read it as a file; you have no skill tool).
  A skill that file names by its name alone is the `SKILL.md` whose `name:` is that name.
- Stage boundary: make the change in commits on the task branch, run the checks it owns, write your report and return.
  Do not run the product's whole gate (`npm test`): the orchestrator runs it. Do not open a request, do not merge, do not push.

## What to make

The frozen task: `.runs/task-cycles/proba-bez-wersji-zapisu/task.md` — read the whole of it (its *To do*, *Acceptance criteria*,
*Questions to settle*, *Context*, *Decisions in play*, *Settlements to record*, *Out of scope*).
Its row 1 of *Settlements to record* is the decision you write: D-234 changes, the saved game's version leaves its condition.

### Reconciliation with the code at `e3295528` (the task was accepted at `be597c41`; wording moved on) — binding answers of the orchestrator

1. The log now says "operator", not "owner" (the task's wording is older). Keep the wording the log and the instruction have now.
2. D-234's *Verification* "complies" line now also names "or of the saved game's version" (it did not when the task was written, so the task's *Context* is no longer true there). It states the same condition the task removes: take the saved game's version out of it too, so the decision has no remaining place that names it. The places are therefore four: the sentence of the decision, the "complies" line, the "violates" line, the *Rationale*.
3. Five comments in `tests/deploy/test_restore_trial.py` (the lines `# decision: D-234 "A checked restore is a trial …"`, at about lines 209, 214, 219, 224 and 373) quote the binding sentence of D-234 word for word. They follow the sentence in this same change (see how commit `6be2ec6c` did it); the foundation check's citation check tells you whether they match. Change nothing else in that file.
4. Both instruction copies hold the condition at line 286 and are identical; they must stay byte-identical (`tests/agent_workflow/test_loop2_deploy_skill.py`, `test_both_copies_are_byte_identical`).
5. *Rejected* of D-234 takes the two ways of the task's *Not chosen* under the question (keep the condition as it is; teach the script to check the version of the saved game from the backup), each with the reason the task gives, written in the log's own style (a way, a dash, its price).
6. The paragraph "Not proven by this trial: … and the version of the saved game" and the paragraph about the version in "Restoring" stay untouched (the task's *Acceptance criteria*).
7. Step 3 of the task (the hint): add it to both copies in the section "Trying a backup on the operator's computer", as the task words it — a hint of preparation, not a condition of repeating: a change of `SAVED_GAME_VERSION` erases the marker in the test account's saved game state when the game discards that state and starts a new game (D-96), so before the next trial the operator gives a new marker as in step 8 of "Installing and reinstalling" and saves it. Place it where a reader preparing the trial finds it (after the sentence on repeating the trial, or as a short paragraph before the numbered steps); keep the instruction's present style, in English, no history of the change.
8. The code and the game (`scripts/restore-trial.mjs` and the rest) stay unchanged (the task's *Out of scope*).

## Reading (named by the orchestrator)

Foundation entries by identifier, each read whole: D-234 (the entry you change), D-96 (the task relies on it), D-228, D-230, D-231, D-232, D-233, D-236, D-238, D-360 (the section "Database backup and restore" of the decision log, `foundations/decisions.md`; D-234 derives from D-228); the entries of `foundations/part_map.md` for `product-foundation`, `agent-workflow` and `deployment`; the invariants of those parts that cite D-234, the test file or the instruction (search `foundations/invariants.md` for `D-234`, `restore`, `loop2-deploy`), and the glossary entries of the words you use ("operator", "saved game state", "marker" if present) and the-way's glossary at the pin.
Guidelines, each whole: `guidelines/coding.md` (the kind index too) and `guidelines/testing.md` (a test file's comments change). `src/browser/AGENTS.md` and the styleguide do not apply (no `src/browser/` file and no user interface).
The element files for the decision: `.the-way/elements/decisions/template.md`, `.the-way/elements/common/rules.md`, `.the-way/elements/common/way_of_working.md` and the examples of `.the-way/elements/decisions/examples.md` as the decision skill names them.

## Answers to the two questions at the start

- Trust boundary: no. Irreversible operation: no.
- Open design choice: none. Route: one author without a plan. Your class: `same` as the orchestrator.

## Checks you own

The focused checks of what you change, named in your report with command and exit code: at least
`python -B .the-way/elements/common/foundation_check.py` (the foundation check, including the citations of tests; the
full run, not `--skip-test-citations`), the test of the deploy skill (`tests/agent_workflow/test_loop2_deploy_skill.py`, run as the product's guidelines give) and
`tests/deploy/test_restore_trial.py` where it runs without Docker, and `python -B .the-way/instruction-files/check_instructions.py`.
Report any test that is skipped (a missing daemon) as unchecked, never as a pass. The worktree has no `node_modules`; if a check needs
dependencies, read the README's setup for the repository and say in your report what you installed and where.
Do your own-work check as `make-change` gives, and the weakest-point check of the requirement most likely to be wrong
(here: that no place of the repository still names the saved game's version as a condition of repeating the trial — search `git grep -n "saved game's version" -- ':!.the-way'` and `git grep -n "every month"` and read each hit).

## Working copies

Your directory for working copies is `.runs/author/`.

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

## Commits

Commit explicitly by path (`git add <file> <file>`; never `git add -A`, `git add .` or `git commit -a`). Messages in English, in the
style of the repository's recent commits (`docs: :memo: …` with the decision identifier in brackets at the end). Do not touch the files of
the record (`.runs/` is ignored).

## Report

Write your full report to `.runs/task-cycles/proba-bez-wersji-zapisu/reports/author-report.md` and return its status
(`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the path.
The report holds, as `make-change` gives: the checks with command and exit code, the own-work check, the weakest-point check,
each reach beyond this handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`),
**Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), the working copies line, and for the decision
its meaning in one English sentence and one Polish sentence, marked `row 1`.
