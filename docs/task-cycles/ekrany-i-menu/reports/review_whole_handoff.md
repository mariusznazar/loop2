# Handoff — review of the whole change, task `ekrany-i-menu`

You review the whole change of a planned the-way task cycle as an agent that made none of it. The person
who requested this cycle (Mariusz, the product's owner) has delegated every intermediate choice to the
orchestrator; you ask no human anything. A question goes back in your report with the first line
`questions`, as the method gives. Grade and scope are yours: nothing in this handoff calls a finding wrong,
Minor or outside the scope.

## What you review and where

- Worktree (start every command from its root): `C:/Storage/repos/loop2-wt/ekrany-i-menu`, branch
  `task/ekrany-i-menu`. **Range: base `20d804b04ba564b578551c687cde78baadf78878` to head `eeb145f`**
  (compute `git diff 20d804b..eeb145f` and `git log 20d804b..eeb145f` yourself; confirm `git rev-parse HEAD`
  is `eeb145f…`). Process pin `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
- Your class of model: no cheaper than the orchestrator's (Opus 5.5).
- Report path: `docs/task-cycles/ekrany-i-menu/reports/review_whole.md`. Its first line is `PASS <head sha>` or
  `FAIL <head sha>` and nothing else.

## Your method

The project skill `the-way-review-change`: read `.the-way/task-cycle/review/SKILL.md` whole and, as it says
for the review of the whole change, `.the-way/task-cycle/review/whole_change.md`. You select your own
foundation and guidelines by "Reading the foundation" (`.the-way/elements/common/way_of_working.md`) and
`.the-way/product-guidelines/reading.md`, each entry and guideline file whole. The change touches the parts
`browser-view` (code, tests, kitchen-sink page), `simulation` (comments and test titles only),
`agent-workflow` (`guidelines/**`, the two `loop2-deploy` reference copies), `build-tools` (`README.md`) and
`product-foundation` (`foundations/**`). Where the change writes or changes guidelines
(`guidelines/styleguide-browser-view.md`, `guidelines/coding-browser-module.md`), compare them with the
templates of the pinned the-way (WAY-170). Never dispatch a subagent. Never change the reviewed worktree, its
index or branch: if a check needs files changed, make a separate worktree of the head commit.
Do **not** run the full suite `npm test` without an argument (the orchestrator runs it); focused checks are
yours. A command that may run long runs in the background and you wait in stretches under four minutes.

## The answers of step 4 (told to every review of this cycle)

- Trust boundary: no (the part map names none of the files the change touches). Still, the page address
  fragment is player input: check crafted fragments at the router (`screen-address.ts`, `game-view.ts`,
  `email-confirmation.ts`) — non-numeric, signed, leading-zero, very long, percent-encoded, upper-case,
  emailed-link fragments beside a screen address.
- Irreversible operation: no. `Human actions: none`.
- Open design choice: none; no spec was written. Route: planned slices.

## What you read

1. The frozen task whole: `docs/task-cycles/ekrany-i-menu/task.md`.
2. The plan: `docs/task-cycles/ekrany-i-menu/plan.md` (14 slices: 1–10, 11a, 11b, 11, and slice 12 which is
   the walk below, and the foundation entries E1–E39 written before slice 1).
3. The cycle's choices and their reasons: not provided to you (the record is the orchestrator's); the
   reports below hold what each agent chose.
4. Each slice's range and its report. **No slice had a review of its own; this review is the only one each
   gets.** Each slice passed the orchestrator's mechanical check (clean tree, non-empty range, changed files
   against the slice's *Change*, each check with command and exit code). Ranges (base..head):

| Slice | Range | Report |
|---|---|---|
| Foundation entries (E1–E39) | `20d804b..f694d86` | `reports/foundation.md` |
| 1 styleguide | `f694d86..c0211e6` | `reports/slice1.md` |
| 2 shared button | `c0211e6..893d26c` | `reports/slice2.md` |
| 3 addresses | `893d26c..fa6b322` | `reports/slice3.md` |
| 4 menu bar | `fa6b322..240d639` | `reports/slice4.md` |
| 5 screen Postać | `240d639..edb2862` | `reports/slice5.md` |
| 6 list of programs | `edb2862..6dc4819` | `reports/slice6.md` |
| 7 page under the bar | `6dc4819..ff62598` | `reports/slice7.md` |
| 8 screens by address | `ff62598..649e25d` | `reports/slice8.md` |
| 9 Siedziba | `649e25d..0e7c625` | `reports/slice9.md` |
| 10 Programy | `0e7c625..5e305f8` | `reports/slice10.md` |
| 11a old uses of „headquarters” | `5e305f8..d034bbf` | `reports/slice11a.md` |
| 11b documents | `d034bbf..f9eff8c` | `reports/slice11b.md` |
| repair before the review (two defects the orchestrator found) | `f9eff8c..0aa9ce5` | `reports/repair1.md`, findings in `reports/repair1_findings.md` |
| 11 coding guidelines | `0aa9ce5..eeb145f` | `reports/slice11.md` |

   (All report paths are under `docs/task-cycles/ekrany-i-menu/`.) The reports are claims to verify, not
   evidence. The foundation step's mechanical check passed with `foundation_check.py` at exit 0.
5. The walk through the real browser (plan slice 12, task item 18): `reports/walk.md` and the screenshots in
   `docs/task-cycles/ekrany-i-menu/screens/` (open the PNGs you rely on with the Read tool). It was made at
   head `eeb145f`. It is the evidence of the rendered states for WAY-219; judge whether it shows the states the
   styleguide requires.
6. The Minor and out-of-scope findings of slice reviews: none (no slice review was made).

## What the orchestrator asks you to keep in view

- Every item (1–18) of the task's *To do*, every row of *Settlements to record*, every entry of *Decisions in
  play* ("Zadanie zapisuje w całości", "Zadanie urzeczywistnia część", "Przykłady i zdania do poprawy"), met by
  the commits, and the entries the foundation step wrote: do they say what the code does (WAY-263)?
- For each blocking finding, name the slice it comes from by number and commit, or say it spans slices, or comes
  from none.
- The tests: do they fail when the behaviour they protect breaks (the changed cases of
  `tests/view/account-screen.test.mjs`, the new files `menu-bar`, `character-screen`, `program-list`,
  `screen-address`, the changed `program-panel` and `headquarters` cases)?

## Your report

As the method gives (section 4): the first line; findings by grade with place, reasoning, evidence, and the
slice each blocking one comes from; **Declined to judge**; each check you ran as command and exit code; each
reach beyond this handoff; **Searches not found or unclear**. Return only: the first line, the counts of
blocking, Minor and out-of-scope findings, and the report path.
