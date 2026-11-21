# Handoff — repair of the quotations of decisions in the tests of slices 3 and 4, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## What and where

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`, head `23e0fa01`). You are the only writer in it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant **"a slice, or the retry of a slice"** — read it whole; your scope is the one goal below.
- Goal: `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` reports these errors in two test files made in slices 3 and 4 — comment lines `// decision: D-n "…"` whose quotation is no word-for-word text from the beginning of a sentence of a binding sentence of that decision as it stands:

```
tests/sim/judging.test.mjs:154: the quotation does not begin a sentence of `D-439`
tests/sim/judging.test.mjs:199: the quotation stands in no binding sentence of `D-439`
tests/sim/judging.test.mjs:233: the quotation stands in no binding sentence of `D-439`
tests/sim/judging.test.mjs:244: the quotation stands in no binding sentence of `D-22`
tests/sim/judging.test.mjs:258: the quotation does not begin a sentence of `D-179`
tests/sim/judging.test.mjs:315: the quotation stands in no binding sentence of `D-439`
tests/sim/saved-game-judgings.test.mjs:115: the quotation does not begin a sentence of `D-440`
tests/sim/saved-game-judgings.test.mjs:136: the quotation does not begin a sentence of `D-213`
tests/sim/saved-game-judgings.test.mjs:228: the quotation does not begin a sentence of `D-165`
tests/sim/saved-game-judgings.test.mjs:261: the quotation does not begin a sentence of `D-440`
tests/sim/saved-game-judgings.test.mjs:308: the quotation does not begin a sentence of `D-440`
tests/sim/saved-game-judgings.test.mjs:351: the quotation stands in no binding sentence of `D-213`
tests/sim/saved-game-judgings.test.mjs:472: the quotation does not begin a sentence of `D-213`
tests/sim/saved-game-judgings.test.mjs:500: the quotation stands in no binding sentence of `D-213`
```

  Repair each so the quotation stands: replace the quoted text by text that stands word for word, from the beginning of a sentence, in a binding sentence of the decision named (`foundations/decisions.md`, read the entry; a decision's binding sentences are those of its first paragraphs before *Rationale*), choosing the sentence that belongs to the case's requirement; where the case rests on another decision's sentence, name that decision instead. **Change only those comment lines** (and, where a quotation needs it, a neighbouring comment line): no assertion, no expected value, no test title, no test name, no code changes. Keep the tests' behaviour; run `npm test -- tests/sim/judging.test.mjs` and `npm test -- tests/sim/saved-game-judgings.test.mjs` before and after (both must exit 0) and the foundation check after (these two files show no error; the 7 errors of the D-243 quotations in `tests/sim/loop.test.mjs`, `tests/view/maps-screen.test.mjs` and `tests/view/account-screen.test.mjs` stay — other slices own them).
- Files you may change: `tests/sim/judging.test.mjs`, `tests/sim/saved-game-judgings.test.mjs`. Commit by path (`git add <file> <file>`), message in English in the repository's style, e.g. `test: :white_check_mark: quote the decisions word for word …`. No full gate.
- Reading: `guidelines/testing.md` (whole; the rules for the line `decision:`), the decisions named by the errors (D-439, D-440, D-22, D-179, D-213, D-165) at their current place in `foundations/decisions.md` (find each by its heading `### D-n`).
- Directory for working copies: `.runs/repair-q/`; report path: `.runs/task-cycles/ocena-programu-na-ziarnach/reports/repair-q-executor-report.md` (the input of the cycle's scripts). `cycle.md` and the other files of the record directory are not yours to read.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Report

As `make-change` gives it: checks with command and exit code (before and after), the own-work check, commits, reaches, **Unread material**, **Searches not found or unclear**, working copies. Return status, commits, a one-line check result and the report path.
