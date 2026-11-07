# Handoff — review of the whole change (stage: review-change)

You review the whole change of the task cycle of the task `karty-i-katalog-map` (screen Mapy with the list of open maps, the card of a map and the section „Kto idzie”). You did not make any of it. You are read-only: you change no tracked file and make no commit.

## Where you work

- Worktree (work from its root): `the root of the task worktree`, branch `task/karty-i-katalog-map`.
- Range to review: base `213670952542816b8dd86117f815c3869cc090d5` (the target branch `main`) to head `f0f3b0752e035cb1d8ae69a0242cc632f92a0ab1`.
- Method: the project skill `the-way-review-change`; read `.the-way/task-cycle/review/SKILL.md` whole and a file it names only when the step that names it comes. The-way in this worktree is `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`; use only that copy.
- Your full report: `docs/task-cycles/karty-i-katalog-map/reports/13-review-report.md`, whose first line is `PASS <sha>` or `FAIL <sha>` (the head sha you reviewed), as the method gives. Return only that first line, the report's path and the checks you ran with their exit codes.
- You select your own foundation entries and guidelines by the parts of the change (`browser-view`, `simulation`, and the guideline and foundation files the change edits) as the method and `.the-way/elements/common/way_of_working.md` ("Reading the foundation") and `.the-way/product-guidelines/reading.md` give. Never ask the human.
- You may run focused checks (`npm test -- <one file>`); you do not run the product's whole gate — the orchestrator runs it.

## Inputs

- Frozen task, whole: `docs/task-cycles/karty-i-katalog-map/task.md` (no spec was written: no open design choice). The plan, whole: `docs/task-cycles/karty-i-katalog-map/plan.md` (10 slices, the *Foundation entries* agent first, *Choices*, *Coverage*, *Orchestrator's notes*).
- Answers of step 4: trust boundary — no; irreversible operation — no. So no slice had a review of its own: **you judge every slice** and must name, for each blocking finding, the slice it comes from (or that it comes from none, a gap of the plan).
- The commits of the range, in order:
  - pin move `58d4849` — the branch's first commit, holds only the gitlink at `294af7f` (check that; the installer changed nothing else; no check failed on it that passed on the base);
  - foundation entries `afe5920` (only `foundations/decisions.md`; report `reports/02-foundation-report.md`);
  - slice 1 `ce5e865` (report `reports/03-slice-1-report.md`); slice 2 `45c9e7e`, `284641e` (`reports/04-slice-2-report.md`); slice 3 `00b807c` (`reports/05-slice-3-report.md`); slice 4 `57f8d25` (`reports/06-slice-4-report.md`); slice 5 `ef77de7` (`reports/07-slice-5-report.md`); slice 6 `6ef8213` (`reports/08-slice-6-report.md`); slice 7 `64d94de`, `ee2d0a2` (`reports/09-slice-7-report.md`); slice 8 `df293aa` (`reports/10-slice-8-report.md`); slice 9 `d16b01d` (`reports/11-slice-9-report.md`); slice 10 `57f9578`, `f0f3b07` (`reports/12-slice-10-report.md`).
  Reports are under `docs/task-cycles/karty-i-katalog-map/`. Slice 1 and the foundation entries are the two reports that carry words (the styleguide and the decisions); read the other reports for what the executors say they checked.
- Mismatches the mechanical checks passed on to you:
  - slice 9 changed `tests/view/account-screen.test.mjs`, which its *Change* does not list (two cases asserted DOM-drawing details; the executor says it kept each case's requirement). Judge whether the requirement is kept.
  - the foundation entries' agent and slices 1–10 each ran only focused checks; the gate has not yet run on the whole tree.
- Things the orchestrator knows and passes to you as information (judge them yourself; do not take them as findings or as non-findings):
  1. `guidelines/styleguide-browser-view.md` (slice 1), the rule of the section „Kto idzie”, says that after a stop the line „Pętla zatrzymana …” in `text-secondary` stands at the character in „Kto idzie”; the task (To do 5) and D-245 put that line on the card and the screen of the character only. Slice 7 reported it; slice 10 was not given the file to correct it.
  2. Slice 8 reports no case for the page's `halt()` with the screen Mapy (`tests/view/uncaught-failure.test.mjs` was outside its *Change*); compare with the invariant `uncaught-failure-game-state`.
  3. Slice 2: the loop in `minutesWithoutFire` (`src/browser/sim/map-card.ts`) could take about two million steps for an ambient temperature just below 37 °C; no map in the data is near.
  4. Slice 7 splits the step note („— drożej niż zwykle”) off a string of `terrainLines` by a regular expression to draw it in its own role.
  5. D-327 (Settlement 1) states the meaning of „krok inny niż zwykły” as „the step most maps' data give, the first of the data's order on a tie” — the plan's choice, not a sentence of the accepted row; D-326's *Rejected* is `unknown`; Settlement 6 became its own entry D-332 beside D-281. The request will put these before the human. Check source fidelity of every entry against the task document (*Decisions in play*, *Settlements to record*, *Questions to settle*).
  6. D-169's *Rationale* and D-265's *Verification* example become untrue by this change and were left on purpose for the return step; D-189 still says the list of maps marks the rehearsal (the mark is now on the card, D-251) and D-245/D-246 are task 25's. Do not grade these as findings of this change unless something else of the change leaves them wrong.
  7. The screen Mapy shows no screenshot-checked state before slice 8 (addresses resolved but nothing drawn between slices 6 and 8); the end state is what you judge. Slices 3, 8 and 9 carry real-browser state checks in their reports; slice 7's is by tests only.

## What to cover

Every item of the task's *To do* 1–11, the *Acceptance criteria* (three clicks), every row of *Settlements to record*, every projected entry and changed entry of *Decisions in play* (D-53, D-134, D-149, D-165, D-170, D-180, D-188, D-243, D-251, D-287, D-274, D-217, D-244, the corrected examples of D-55 and D-171, and the parts of D-280/D-281/D-282/D-133/D-03), the four *Questions carried to cycle*, the guidelines' prescriptions (`guidelines/coding.md`, `coding-browser-module.md`, `coding-simulation-module.md`, `testing.md`, `styleguide-browser-view.md`), the invariants of `browser-view` and `simulation` that the change reaches, and source fidelity of the foundation entries and the guideline edits. Also grade, as the method gives, Minor findings and findings outside the task's scope.
