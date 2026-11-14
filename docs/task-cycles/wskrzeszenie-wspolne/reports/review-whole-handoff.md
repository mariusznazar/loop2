# Handoff — the review of the whole change (`review-change`)

You are the reviewer of the whole change of the task `wskrzeszenie-wspolne`, in a the-way task cycle, and you did not make any of it. The orchestrator is the only contact; no questions go to the human.

## What is reviewed

- Worktree (read-only for you; work from its root): `the task's worktree`, branch `task/wskrzeszenie-wspolne`.
- Range: **base `2a8645d46c50b23437ad824d1e7969ee760d05f1` .. head `77dd1194`** (resolve the full SHA with `git rev-parse HEAD` and confirm it starts with `77dd1194` before you go on). Compute the diff yourself: `git diff 2a8645d4..HEAD`, `git log 2a8645d4..HEAD`. Six commits: `94b465e9` (code), `043960ff` (tests), `37a76a26` (foundation entries), `e291e8d2`, `4f0781c3` (order of one clock reading), `77dd1194`.
- Variant: **the whole change** of a one-author route (no plan, no spec, no slices; no slice had a review of its own — you are the one review). Method: `.the-way/task-cycle/review/SKILL.md`; read it whole, then `.the-way/task-cycle/review/whole_change.md` and follow it. You alone select your own foundation and guidelines by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` and `.the-way/product-guidelines/reading.md`; each guideline file whole.
- The frozen task: `.runs/task-cycles/wskrzeszenie-wspolne/task.md` — read it whole (To do 1–12, Questions to settle 1–8 and their answers, Decisions in play, Out of scope, Settlements to record = none). Judge the change against it and against its decisions in play. Project relation: independent; there is no spec and no plan.
- The author's report: `.runs/task-cycles/wskrzeszenie-wspolne/reports/author-report.md` — a set of claims to verify, not evidence.
- Your report: `.runs/task-cycles/wskrzeszenie-wspolne/reports/review-whole-report.md`; its first line is `PASS <sha>` or `FAIL <sha>` (or `questions`).

## Answers of the cycle's start

- **Trust boundary: yes.** `src/browser/sim/saved-game.ts` (the simulation's trust boundary: documents that come from the server) is touched. Check crafted input at it: a document that still carries the old per-character moment of readiness, a missing or extra key, a moment that is NaN, 1.5, `2**53`, a negative or a string, an unknown `deathSettlement` kind, an unknown `completionSettlement` kind, a `completionSettlement` where the run has no first completion (and the converse), a version other than 7, a state that the game's own functions make but the load refuses (D-386) or the reverse. State what you ran or read for it.
- **Irreversible operation: no.** The raise of `SAVED_GAME_VERSION` to 7 makes the game discard saves of version 6 (the server keeps them as the previous save); the human decides at the request. The cycle prepares and performs nothing irreversible.
- The one author's class: `same` as the orchestrator (Sonnet 5.5).

## Gaps of the author's reading to carry (judge them yourself)

The author's report lists unread material: `foundations/part_map.md` not read; `guidelines/styleguide-browser-view.md` lines 609–987 read only by search; `guidelines/coding-content-data.md` not read; decisions D-04, D-212, D-241, D-243, D-246, D-247, D-248, D-311 read in part; glossary entries `solved map` and `map run` not read. Your own selection covers them as the method says; read them where the change reaches them, and say in your report whether the change conflicts with any.

## Points the orchestrator wants checked in particular (not a limit on your scope)

1. To do 4 and D-240/D-242 — the order of characters in the catch-up and in the open game, and the change in `src/browser/view/clock.ts` (the reading passes the manual run, then the loops, then settles the manual run's death and first completion at the reading): is every death settled at the right moment and exactly once? `death-settled-once`, `catch-up-death-moment`, `catch-up-state`, `minute-span-split`.
2. To do 3 and 10 — the renewal at the first completion of a map: the author added `settleCompletion(state, nowMs)` and a saved key `GameMapRun.completionSettlement`, which the task does not name and which differs from the clock-free hint of the handoff (the choice and its reason are in the author's report, choices 2 and 3; judge whether it is the smallest reading that fulfils To do 3 and 10, and whether the unsettled-first-completion rule of the load, admitted, against the unsettled-death rule, refused, is consistent with D-386/D-221).
3. To do 5–6 — "no practice": zero practice in every skill, no bought rank, no practice gathered at the earning loop; the loop passes the practice it gathered by `waitingPractice(loop)`; a death of a character with no practice leaves the generation, the loop and the shared moment alone, in the manual run, the open loop and the catch-up.
4. To do 7–10 — the exact texts and their roles (`text-secondary`, `danger`), including after a load and until „Restart”/„Zakończ”; `tests/view/` checks.
5. To do 11 and 12 — the version is raised once; each foundation entry the task names is written as the task gives (D-190, D-220, D-240, D-217, D-329, D-216, D-386, `resurrection-renewal`, `catch-up-state`, glossary `resurrection` and `generation number`), and no entry the change made untrue was left (the author also changed D-242 and D-247 by one sentence/clause, and widened D-216's question; judge each). Search the foundation yourself for the other entries that mention a resurrection of one character.
6. The tests: that every invariant test the change altered keeps the rule (WAY-03), including the changed `save-version`, `catch-up-state`, `catch-up-death-moment`, `death-settled-once` tests the author says it did not see fail again; and the guidelines `guidelines/testing.md`.
7. The author's UI check could not show in a real browser the line „Wskrzeszenie odnowione: …” after a first solving nor the countdown „Wskrzeszenie drużyny za …”; say what the jsdom tests establish and what they leave to appearance.

## Do not

- Do not run the product's full gate (`npm test`) — the orchestrator runs it. Run the focused checks you need (the tests of the files you doubt, `npm run typecheck`, the changed files' lint); give each command and exit code in the report. Do not change any file of the worktree; do not commit.
- Do not repeat a finding as outside the task's scope or Minor unless you judge it so: you alone grade and scope. Return `PASS`/`FAIL`, every finding with its grade, its place `file:line`, its full wording and a developed rationale, the number of decisions you read whole and by title only, and your **Unread material** and **Searches not found or unclear** sections (each `none` or the items).
