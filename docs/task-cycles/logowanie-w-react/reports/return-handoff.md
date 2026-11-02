# Handoff — the return step, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him.

**Worktree.** `C:/Storage/repos/loop2-wt/logowanie-w-react`, branch `task/logowanie-w-react`, head b415368, the reviewed change, on which the gate exited 0. Work from its root.

**Method.** Your stage is the return step. Read `.the-way/task-cycle/change/SKILL.md` whole; none of its table's variants is yours, so take what it gives for reading, commits and the report. Read `.the-way/task-cycle/skill/return_step.md` and `.the-way/task-cycle/skill/foundation_step.md`, each whole, and the skill of an element when you write an entry of that element, by its project skill: `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-environment-fact`, `the-way-record-glossary-term`, `the-way-update-part-map`.

**Inputs.** Frozen task `.runs/task-cycles/logowanie-w-react/task.md`, whole. Spec `.runs/task-cycles/logowanie-w-react/spec.md`. Plan `.runs/task-cycles/logowanie-w-react/plan.md`, *Foundation entries*. `reports/foundation.md` for what was written and its choices. `reports/whole-review.md` and `reports/whole-review-fix.md` for what the review found. Range of the change: `3d366c8..b415368`. Foundation written so far: commit e38278c.

**What to compare.** Each entry the change writes or changes, those the task names, those your search of the foundation finds, and the part map of `browser-view`, `simulation`, `build-tools`, `agent-workflow`, each against the code at the head. Correct in this change whatever no longer matches.

**Points the reviews and reports left for this step, each for you to judge as your method gives.**

- `guidelines/coding-browser-module.md:145-156`, the rule „Strona wszystkich stanów bez Reacta”, cites D-45 and D-265, and neither states the ban: a module the kitchen-sink page imports must not reach a `.tsx` file. Spec decision 6 settles it, and it binds later tasks, so it is a choice that binds after the merge: write it through `the-way-record-decision`, into D-265 or D-45 or as its own entry, whichever the rules give, and bring the rule's citation to it.
- The framework guard now reads aliases and the `name` of a lock entry and refuses a non-development entry with a peer dependency on `react`, apart from `react-dom`: `tests/invariants/test_browser_view_framework.py`. Compare `browser-view-framework` and D-03 with that. If it binds later work beyond the invariant's words, say so by the entry the rules give; if the words stand, leave them.
- `document-test-memory-limit` reads Method `test`: Slice 1 wrote its test, so compare the entry with `tests/view/memory-limit.test.mjs`, and `tests/view/page-document.test.mjs:99` for the default limit.
- `reports/whole-review.md` M2: the test of `icon-credits` says no card draws the section, while the entry says the card's section holds the credits. Compare the entry with what its citing test checks. That test's comment is no entry and not yours.
- `foundations/part_map.md`: no file `src/browser/*.tsx` came, and new files fall under existing patterns; `foundation_check.py` holds it.
- Environment facts: a source outside the product the change rests on that the foundation does not hold, such as a React or esbuild behaviour a decision relies on. `reports/slice-3.md` found that at `minify: true` esbuild leaves no `process.env`.
- Glossary: a word the change uses in another meaning. Take „card”, „harness” and „switch”, and whether each needs an entry by `the-way-record-glossary-term`.

Review findings of the request are no foundation entries, and the Minor findings of `reports/whole-review.md` are not yours to fix. No test and no product code changes here. A question arises only as `foundation_step.md` gives, with the status `blocked`.

**Keep** one sentence of each entry you write or change in Polish, the task document's language, in your report, for the request.

**Report.** Commit with explicit paths, in English, as `git log` shows; never `git add -A`. Write `.runs/task-cycles/logowanie-w-react/reports/return.md`, naming under its own headings what the record's *Return step* needs: foundation compared with code, decisions, invariants, environment facts, glossary terms, part-map changes, projected entries, rows of *Settlements to record*, each with identifiers or `none`. Run `python -B .the-way/elements/common/foundation_check.py` and give its command and exit code. Do not run the product's gate. Return your status, your commits or `none`, a one-line check result naming what failed or did not run, and the report's path; reaches and **Searches not found or unclear** stand in the report.
