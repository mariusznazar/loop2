# Handoff — fix of the review's findings, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him.

**Worktree.** `C:/Storage/repos/loop2-wt/logowanie-w-react`, branch `task/logowanie-w-react`, head 4634e6b. Work from its root.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your variant is „the fix of a review's findings”. The findings concern Slices 2 and 8, so you are a fresh agent on the same branch.

**Findings.** `.runs/task-cycles/logowanie-w-react/reports/whole-review-findings.md`, two findings, I1 and I2. Fix those two and nothing else; the review's Minor findings are not yours. A finding you hold wrong, you answer with evidence in your report.

**Inputs.** Frozen task `.runs/task-cycles/logowanie-w-react/task.md`, To do 13 and To do 14. `foundations/invariants.md`, entries `browser-view-framework` and `browser-view-token-values`. D-03, D-43 and D-29 in `foundations/decisions.md`. `guidelines/testing.md`, `guidelines/coding.md`. `.the-way/project-level/technology/reserved_choices.md`.

**On I1, the orchestrator's answer to the finding's open half.** The alias is code, as the finding says: the guard reads what a runtime entry really is, in the alias's value of `package.json` and the `name` of a lock entry. For a component library on React, the task does not name one, and no such library stands in the tree, so the guard needs no list of them. One way seen, not researched and not required: a non-development lock entry other than `react` and `react-dom` whose `peerDependencies` names `react` is a library built on React, which reads the class without a list of names. If you take it, check that it is true of the tree at the head, and of `scheduler`. If it does not hold, the docstring and the comment say plainly that such libraries stand outside the guard, and your report says so for the human. Each way is seen failing on a crafted case, in the test's own form of a control, and passing on the tree.

**On I2.** Keep the reader's other cases as they are, each control of the file passing. Each form the finding lists gets a control seen failing without your change: `<X y={1} />` before a colour on the same line, in a ternary and in an array, an assignment after it, and `//` in JSX text. A regex that really follows `}` or `<` still reads as a regex.

**Answers of step 4.** Trust boundary: yes, `package-lock.json` of `build-tools`, read here and not changed. Irreversible operation: no.

**Fixed for this cycle.** Read each file you are given before you write code, one per call. Docker Desktop runs. No comparison on a rendered element runs by Node's `assert`, and a file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation. Run no product gate: that run is the orchestrator's. Commit with explicit paths, in English, in the style `git log` shows; never `git add -A`.

**Checks you run again.** `npm test -- tests/invariants/test_browser_view_framework.py`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/quality/test_quality_invariants.py`; `python -B .the-way/elements/common/foundation_check.py`.

**Report.** Write `.runs/task-cycles/logowanie-w-react/reports/fix-1.md` as your method gives, each check with its command and exit code. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
