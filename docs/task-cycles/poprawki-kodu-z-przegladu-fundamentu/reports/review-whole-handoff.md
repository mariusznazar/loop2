# Handoff — review of the whole change

Stage: review of the whole change by a reviewer that made none of it (`review-change`). One author, no plan, no spec, no slices: this review is the change's one code review.

## Where

- Worktree (work from its root; read-only for you): `the task's worktree`
- Branch `task/poprawki-kodu-z-przegladu-fundamentu`
- Range to review: base `e7b3d071d7877c005c33f432d41860cc818361f5` to head `1d8caf1710408bd57940048892bd9c19fc75640b` (5 commits: `ea35311f`, `b87424d0`, `881f1a4a`, `79deca06`, `1d8caf17`). Read the full diff of the range.
- Process pin: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, initialised.
- Your directory for working copies: `.runs/review-whole/`.
- Your report path: `.runs/task-cycles/poprawki-kodu-z-przegladu-fundamentu/reports/review-whole-report.md`; its first line is `PASS <sha>` or `FAIL <sha>` (or `questions`).

## Method

Read whole `.the-way/task-cycle/review/SKILL.md` (`review-change`); a file it names only when the step or variant that names it comes. Your variant: the review of the whole change. You select your own foundation and guidelines by the parts of the change (`.the-way/elements/common/way_of_working.md` "Reading the foundation"; `.the-way/product-guidelines/reading.md`); write and read the index of your whole selection with `decision_index.py` into your directory and state in your report how many decisions you read whole.

## Inputs

- Frozen task (read whole): `.runs/task-cycles/poprawki-kodu-z-przegladu-fundamentu/task.md`. Check every *To do* item (1–5), both *Settlements to record* rows, the three answers of *Questions to settle*, *Decisions in play*, and *Out of scope* (the path after an unhandled error in `app.ts` and `account-card.tsx`; the other test descriptions of the review; uses of „Siedziba” meaning the screen — none of these may change).
- The author's report: `.runs/task-cycles/poprawki-kodu-z-przegladu-fundamentu/reports/author-report.md` (read it after forming your own view of the diff, or at least judge its claims, not trust them).
- No spec, no plan, no slice reviews; no earlier findings.
- Answers of step 4: touches no trust boundary; holds no operation that cannot be undone. The task carries Settlements to record rows 1 and 2 (decision D-208/D-97 change; the camp term) and a *To do* 3 sentence in D-323.

## What the orchestrator found (the base differs from the task's reading)

The task was read at `fc00c406`; the base is 49 commits further. The task's line numbers are stale and `src/browser/styles.css` was split into other `src/browser/*.css` files. D-207 and D-208 were changed since the task was written. The author found each place by symbol. Judge by the current code and the current log.

## Gaps the orchestrator carries to you (the author's *Unread material*)

The author read D-122, D-207, D-48 and D-330 only through the decision index and the tests' quotations, not whole; it read `decision-index.md` only to line 397 of 825 and `guidelines/styleguide-browser-view.md` only in parts (1–400, 928–955 and the hits for „Siedzib”). D-122 and D-207 bear directly on the change (the pause at a discovery that ends in death; one save in flight, a moment of saving during one). Open D-122, D-207, D-48 whole yourself (with *Rejected*), and judge whether the author's code and its D-208/D-97/D-323 text hold against them. Also judge whether a use of „Siedziba” for the place of a character, or of `ember` / `bronze`, stands anywhere the author's census missed (it searched `src`, `tests`, `guidelines`, `foundations`, `README.md`, `.claude/skills`) — search the whole tracked tree yourself.

## Points the orchestrator asks you to look at hard (not grades; the grading is yours)

1. `src/browser/view/game-saver.ts`: that an exception before the request or a rejected `saveGame` promise leaves no stuck `inFlight`, no stuck „Wylogowywanie…” (the logout gets a failure), that the retries run at D-208's rhythm, that exactly one error reaches `last-resort.ts` (the author leaves it as an unhandled rejection in a later microtask, not a synchronous rethrow, and says why), and that no path hides the error (coding guidelines "Hiding a failure"). Also that the new cases of `tests/view/game-saver.test.mjs` would fail without the change.
2. `src/browser/sim/game.ts`: that `paused: !mapRunEnded(run)` is what the invariant `player-map-run-pace` and D-122 give, for completion, death and a map run ended otherwise; and that the invariant test's new scenarios are explicit-state and sound (the author added a `patch_body` step to the invariant driver).
3. The foundation entries: D-208, D-97, D-323, D-389, glossary `headquarters` — their binding sentences against the task's text, *Rationale*, *Rejected*, *Verification* and the `decision:` lines of tests that quote them (a quotation that no longer matches stops the foundation check).
4. The rename: a use of `inSiedziba`, `ember`, `bronze`, or a use of „Siedziba” in the character-place meaning left behind; a use of „Siedziba” in the screen meaning that was changed by mistake.

## Checks

Run the focused checks you need for your judgement (single test files, `eslint`, `prettier --check`, `python -B .the-way/elements/common/foundation_check.py`), each with its command and exit code in the report. Do not run the product's full gate (`npm test` whole): its run is the orchestrator's, after a signal. A check that is also red on the base, such as the prettier check of `foundations/decisions.md` and the styleguide, is not a finding of this change.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule.

## Report

Write the full report to the report path as `review-change` gives it. Return: the report's first line, your commits (none: you are read-only), a one-line check result naming what failed or did not run, the report's path, your questions and concerns, each reach beyond this handoff, **Unread material** (or `none`) and **Searches not found or unclear** (or `none`). The Minor findings within the task are listed in the report, those outside the task's scope marked as such; you alone grade and scope.
