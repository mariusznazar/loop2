# Handoff — the return step, task pierwsza-akcja-od-startu

You are the one author, resumed for the return step (step 11 of the cycle). Work only in the worktree `the root of the task's worktree`, branch `task/pierwsza-akcja-od-startu`, head `d925d5ca17f6ea57be36e103379bda4d50ab4493` (the whole change was reviewed `FAIL`, fixed, and the fix reviewed `PASS`: reports `reports/review-whole-report.md`, `reports/review-fix-report.md`). Your method is not the variant table of `make-change`: this handoff names your stage, the return step.

Read whole `.the-way/task-cycle/skill/return_step.md` and `.the-way/task-cycle/skill/foundation_step.md` (the return step writes as the foundation step writes), and the skill of an element, whole, when you write an entry of that element (`.claude/skills/the-way-record-decision/SKILL.md`, `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-record-environment-fact`, `the-way-update-part-map` as the entry needs).

## What to compare with the code, and what to correct in the same change

- The entries the change writes or changes: D-118, D-121, D-123, D-124, D-128, D-195, D-71, D-312, D-313, D-345, D-403, D-404; the glossary entry „Understanding”; the invariants `first-exploration-discovery` and `new-account-first-pass`.
- The entries the task names (its *Decisions in play*): also D-249, D-96, D-206, D-80, D-362.
- What the search of the whole foundation finds (foundation search of `.the-way/elements/common/way_of_working.md`, "2. Search the foundation") — one search for entries that name or are named by what the change touches, including those no written link joins: the actions of the new game, the first chill, the discovery band, "+ reguła", the saved game's refusals, the tree of Eksploracja. The reviewer found the log's sentences on the first chill and "no action" corrected; confirm there are none left, in decisions, invariants, the glossary, the part map (`foundations/part_map.md`) and the guidelines' examples that quote them (`guidelines/*.md`).
- The part map of the touched parts (`simulation`, `browser-view`, `product-foundation`): does any entry of it no longer match the files (the new test, the removed `offeredActionKinds`)?
- Environment facts: a source outside the product that the change rests on and the foundation does not hold. The balance measurement of the first pass comes from an instrument outside the repository; D-362 forbids naming it, so no fact is written for it; say so if you considered it.
- The human's decision recorded as D-404 (289 of 300 accepted for now) is not to be widened or changed.

Write an invariant only for a rule the task, a decision or the human sets; no entry is deferred or proposed for later; the review findings are no foundation entries.

## Known Minor findings of the fix's review (not yours to fix; the request lists them)

The test title of `new-account-first-pass` hard-codes "289"; D-312's clause "and so the game wrote none" is wrong for the case of a deleted carried-out rule; D-404's "complies" example embeds the other account's 290. Do not change them in this step unless the comparison finds a mismatch that the task requires you to correct; if you do, say so.

## Rules that stay

No full gate (`npm test` with no argument), no mutation analysis, no real-browser run; focused checks and `python -B .the-way/elements/common/foundation_check.py` as your own check only. Commit on the task branch by explicit paths, English messages in the repository's form, no push, nothing under `docs/task-cycles/`. Where you change nothing, commit nothing and say so.

## Report

Write `docs/task-cycles/pierwsza-akcja-od-startu/reports/return-report.md` with, in these words as headings, the items of the record's *Return step*: Foundation compared with code · Decisions written or changed · Invariants written or changed · Environment facts · Glossary terms · Part-map changes · Projected entries written whole or in part · Rows of *Settlements to record* written (row number and identifier for each); and every check as command and exit code, **Unread material**, **Searches not found or unclear**, the commits. Return status, commits, a one-line check result and the report's path.
