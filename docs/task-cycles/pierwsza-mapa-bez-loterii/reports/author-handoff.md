# Handoff — the one author of the change, task `pierwsza-mapa-bez-loterii`

## Delegation and boundary

The person who requested this cycle has delegated every intermediate choice to the orchestrator, who dispatches you. You never seek the human's approval and you never label an answer as the human's. You work from the worktree's root, you stop at the boundary below, and you do not start the next stage. Questions go to the orchestrator in your return, never to the human.

- Worktree (the only place you write): `.`, branch `task/pierwsza-mapa-bez-loterii`, base `e54f23c0ea3bd1db13d2635333417eb50412d6a0`. Dependencies and the quality venv are installed in it. Never write in `the main checkout of the repository` or any other worktree.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it, in its variant **"the whole change as the one author"**. Read a file it names (`fix.md`, `slice.md`, `ui_check.md`) only when the step or variant that names it comes; `fix.md` and `slice.md` are not yours now.
- Boundary: you make the code, the tests and the foundation entries of the task, as the foundation step gives, commit them, and return before any review. The return step (comparing the foundation with the code, writing what follows) is a later resumption of you, with its own handoff; do not take it now. Do not push. Do not run the product's whole gate (`npm test` with no argument): it is the orchestrator's (WAY-160). Run focused checks of the files you change or add, as the product's testing guideline gives (`npm test -- <one test file>` style: read `scripts/test.py` and `guidelines/testing.md` for the exact call).
- Report: write your full report to `.runs/task-cycles/pierwsza-mapa-bez-loterii/reports/author-report.md`, in the form your method gives, with every check as its command and exit code, **Unread material**, **Searches not found or unclear** and your own-work check. Return the short form: status, commits, a one-line check result, the report path, questions, concerns, reaches.

## The task

Read whole: `.runs/task-cycles/pierwsza-mapa-bez-loterii/task.frozen.md` (a frozen copy; the original is the author's private note and is not for you to open). You are the one author, so you read all of it: *Need*, *To do* 1–8, *Questions to settle* with every answer, *Context*, *Questions carried to cycle*, *Decisions in play*, *Settlements to record*, *Out of scope*, the closing *Dopisek*.

Facts of the cycle you need:

- The task's own wait is over: the tidy-up task merged (PR #93), so the tests choose their map by identifier, not as „the first in the data”. Verify that on the base; where a test still takes the first map of the data, say so in the report.
- Decision D-362 holds in your work: no file git tracks names a note the author keeps outside the repository or the folder it lies in. The two reference programs of the balance test (To do 6) stand in the test file itself, written from the task's *Context*, and the test names no note they come from. The sentences of the foundation you write do the same.
- All code, identifiers and comments in English; what the code writes into the product (game texts, the sentence of the condition, the completion text, the card text) in Polish, as the task gives it, with all diacritics. Commit messages in English, in the style of `git log` of this repository (`type: :emoji: sentence`), one commit per coherent piece. `git add` by explicit path, never `git add -A`, `.` or `commit -a`. Commit author must come out as the repository's configured one; check `git log --format='%h %ae' -1` after the first commit.

## Answers of step 4

- Trust boundary: **yes**. The part map names `src/browser/sim/saved-game.ts` as the trust boundary of the part `simulation`; your change touches it (the version bump, and what loading accepts follows from the map data). Treat the loader as an entry of untrusted data: test a saved game of the old version, of the new version, and a solved-map list with a map the data does not have, and keep the loader's rule „a missing key is not completed; refuse more, never less” (`guidelines/coding-saved-game.md`).
- Irreversible operation: **no**. The discard of old saved games is the product's behaviour decided by the human (Q4), not an operation of the cycle.
- Open design choice: none was found; three small choices are settled for you, and you make exactly these, recording any departure in the report:
  1. the identifier of the new map is `forestEdge`;
  2. it is the first key of `MAPS`, before `forest`;
  3. the balance test names 500 consecutive seeds; you may lower it to 300 only if the run time of the test file asks for it, and you say what the run time was.
- Execution route: one author without a plan, class `same` as the orchestrator's.

## What you read

Foundation entries, each whole (the heading of the entry to the next heading), from `foundations/decisions.md`: D-18, D-22, D-24, D-80, D-82, D-96, D-121, D-122, D-123, D-124, D-132, D-133, D-136, D-142, D-144, D-149, D-189, D-190, D-206, D-208, D-209, D-210, D-327, D-328, D-330, D-332, D-362, D-378, D-388; and every other decision whose *Scope* names `simulation` or `product-foundation` and whose title bears on map data, the first map, opening maps, the saved game's version, the Understanding's first discoveries or the tests that expect game numbers. The foundation step's search of the whole foundation (step 2 of `.the-way/elements/common/way_of_working.md`) is yours to make.

Also whole: the invariants whose *Part* names `simulation` or `every` and which your change reaches, and the one your test cites by `invariant:`; the invariant `save-version` and the rest the decisions above link to; the part map (`foundations/part_map.md`) for `simulation`, `product-foundation` and `browser-view` (the view tests you may change); the glossary (`foundations/glossary.md`) and the-way's glossary at the pinned commit.

Guidelines of the product, each whole: `guidelines/coding.md`, `guidelines/coding-content-data.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-saved-game.md`, `guidelines/testing.md`. Where your change reaches a test of the view (`tests/view/**`) or a module of the view, read `guidelines/coding-browser-module.md` too and name the reach in the report; `guidelines/styleguide-browser-view.md` only if you change a screen's text or look (the task asks for none). Read `src/browser/AGENTS.md` when you work in `src/browser/`.

The foundation step: read `.the-way/task-cycle/skill/foundation_step.md` whole, and the skill of an element (`the-way-record-decision`, `the-way-record-invariant`, …) when you write an entry of that element. The entries are those the task carries: the decision „Which map does a new game open on?” and the invariant `first-map-stock` written whole from *Decisions in play* (with the number of that decision in the invariant's *Derives from*), the new decision for the numbers of Skraj lasu and the invariant of the balance requirement (*Settlements to record* rows 1 and 2), and the corrections of D-121, D-124, D-330, D-378 and D-388 named under *Decisions in play* (To do 8). To do 8 also asks for any other sentence of the foundation that your search finds false after the change; write the corrections you find and name each in the report with the sentence before and after.

## Checks already failing on the base

None. The orchestrator ran the whole gate (`npm test`) on the base `e54f23c0` alone, before anything changed a tracked file: exit 0, no failing check, no unrun check (the Node tests, the 14 + 231 + 261 + 56 Python tests of the-way's gate and the foundation check all passed).

## What the reviewers will hold you to

- Every item of *To do* 1–8 and every row of *Settlements to record*, with the entries written in the approved wording (the wording of the projected entries is the task's, word for word; write them whole).
- The test of To do 6: it starts from an account with everything discovered that knows every action and condition, as the measurement did; it names its seeds itself; „przyzwoity” (12 rules) solves Skraj lasu on at least 95 % of them and „naiwny” (6 rules) on at most 50 %. If, on the real engine of this repository, the decent program is under 95 % or the naive one over 50 %, **do not change a threshold, a program, the map's numbers or the seeds to make it pass**: stop, keep the measured numbers, and return `done with concerns` or `questions` with them — the task says the cycle then goes back to the human.
- Weakest-point check (WAY-164 and your method's own-work check): name in the report which requirement of the task you consider the weakest in your work, and the check that tests it.
- No change outside the task: the programs `las_najlepszy` and the second test belong to task 10; the death-without-skill rule and the measuring instrument's move into the repository are out of scope.
