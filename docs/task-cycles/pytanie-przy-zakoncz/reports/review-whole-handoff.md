# Handoff — review of the whole change

You review the whole change of the task "Pytanie „Zapisać, odrzucić, wrócić?” przy „Zakończ”" with the
project skill `the-way-review-change`, as **the review of the whole change**. You made none of it.
You are read-only: change no file of the product, commit nothing.

## Where

- Worktree root (read from here; `.the-way` is this worktree's): `C:\Storage\repos\loop2-wt\pytanie-przy-zakoncz`
- Method: `.the-way/task-cycle/review/SKILL.md` — read it whole, and a file it names only when the
  step or variant that names it comes.
- Range: from the task's base `73751e8` (`main`) to the head `eb1f864` on `task/pytanie-przy-zakoncz`.
  It holds three commits: `06c69ad` (the move of the-way's pin from `61c72fb` to `52889bc`, made by
  the orchestrator with the installer, not by the author), `c5befaf` (code) and `eb1f864`
  (foundation entries and styleguide line).
- Report: write your full report to
  `C:\Storage\repos\loop2-wt\pytanie-przy-zakoncz\.runs\task-cycles\pytanie-przy-zakoncz\reports\review-whole-report.md`
  with the first line `PASS <sha>` or `FAIL <sha>` (the head you reviewed) and, as the method
  gives, graded findings, the checks you ran with command and exit code, and **Searches not found
  or unclear**.

## What you are given

- The frozen task, whole: `.runs/task-cycles/pytanie-przy-zakoncz/task.md` (accepted by the human
  2026-11-07). Its *To do*, *Questions to settle* and *Settlements to record* (rows 1–8) bind.
  There is no spec and no plan (one author, one route).
- The author's report, with its checks, tests, own-work check, choices and reaches:
  `.runs/task-cycles/pytanie-przy-zakoncz/reports/author-report.md`.
- Answers of step 4: no trust boundary touched (`src/browser/sim/saved-game.ts` untouched) and no
  operation that cannot be undone. Check that this holds.
- The pin move `06c69ad`: it must hold only the gitlink of `.the-way` at `52889bc` and what the
  installer owns — the `the-way-*` entry points in `.claude/skills/` and `.agents/skills/` and, in
  `AGENTS.md`, the block between its markers; `.claude/rules/the-way.md` did not exist, so nothing to
  remove. The move carried no failing checks to the task (the gate passed on `06c69ad`, exit 0).
- Checks already known: the orchestrator ran `npm test` on the base `73751e8` (exit 0) and on
  `06c69ad` (exit 0). The orchestrator runs the gate on the final tree itself; do not run
  `npm test` without an argument. You may run a focused check, e.g. `npm test -- <file>` for one
  file (the `python -B scripts/test.py <file>` form fails outside npm), `npx tsc -p
  tsconfig.browser.json --noEmit`, and `python -B .the-way/elements/common/foundation_check.py`.

## Selecting what you read

You select your own foundation entries and guidelines by the parts of the change, as "Reading the
foundation" in `.the-way/elements/common/way_of_working.md` and
`.the-way/product-guidelines/reading.md` give. The parts changed are `browser-view`, `product-foundation`
(`foundations/decisions.md`), `agent-workflow` (`guidelines/styleguide-browser-view.md`, the pin move)
and, by the change's reach, `simulation` (it calls its functions; check that nothing in
`src/browser/sim/` changed).

## What the orchestrator wants judged beyond the usual

The author named two readings. Judge each and grade it as the method gives:

1. **Placement of the question.** To do 1 says the question stands "w pasie nad programem, jak pas
   odkrycia" and, when both stand, "pas pytania stoi pod nim, tuż nad nagłówkiem kopii „Kopia:
   {imię}” i jej linią „Niezapisane zmiany w kopii.”"; question 8 says "nic, co już stoi, się nie
   przesuwa poza samym programem". The author put the band above the whole program panel (list
   „Program:” and „Nowy program” then stand between it and the heading of the copy). Does that
   fulfil the task's wording, or does the wording require the band closer to the heading?
2. **A new decision D-324.** The author wrote the answers of rows 5–7 (the time of the map run,
   leaving the screen, the rest of the screen) into a new decision D-324 and rows 1–4 and 8 into
   D-173. The task names D-173 and D-44 under *Decisions in play* as the entries it writes and says
   that "co z tych odpowiedzi cykl wpisuje do D-173, mówią wiersze 1–8". Is a new entry within the
   task, and are all eight rows written, with their meaning, in a way the task and the
   decision-log rules allow?

Also check source fidelity of every written foundation sentence against the task's rows (values
taken from the source, not from memory), the coverage of every To do item and every settlement row,
the tests (do they fail for the break they name; the author wrote the code before the tests and
reports a hand mutation check), the appearance (the author's browser check and screenshots under
`reports/`), D-323 (nothing changes after `halt()`), and the guidelines of the touched parts.

Return to the orchestrator: the first line of your report, the commit you reviewed, a one-line check
result naming what failed or did not run, and the report's path.
