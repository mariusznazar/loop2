# Handoff - review of Slice 9 (`review-change`)

## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval.
You did not make this change. You alone grade and scope your findings: this handoff names no finding wrong, Minor or outside the scope.
You are read-only: change no file of the worktree, and leave no temporary edit of the product behind (a defect you put in to see a test fail is taken out again, and the report says so).
You never ask the human; a question to the orchestrator stands in your report.

## What you review

- Worktree: `the root of the repository`, branch `task/porzadki-z-uwag-pr`. Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Slice 9 of the plan, the range `378259f..f7f0726` (compute the diff yourself: `git diff 378259f..f7f0726`, `git log 378259f..f7f0726`; confirm that `git rev-parse HEAD` is `f7f0726`).
- Method: read `.the-way/task-cycle/review/SKILL.md` whole (a slice review, not the whole-change variant); `fix.md` and `whole_change.md` do not apply.
- The executor's report is a set of claims to verify, not evidence: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-09-report.md`.
- The cycle's answers at start: trust boundary - **yes** (`src/server/**`, `src/browser/sim/saved-game.ts`, `scripts/local-start.mjs`): where the slice touches them, check crafted input at that boundary.
  Irreversible operation: none (the cycle prepares and never performs one).
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-09-review.md`. Its first line is `PASS f7f0726` or `FAIL f7f0726` (or `questions`).

## Questions of risk the orchestrator asks, beside the full scope of the review

These are questions to compute or trace in time, not suspicions; the review covers the whole range regardless of them:

- For each of the seven new tests: is the crafted document refused for the one fault the test names and for no other (take the fault out of the document and see it load; check the other faults named by neighbouring cases do not also hold)? Does the expected value come from the decisions (D-213, the saved-game guideline, the glossary) and not from today's result? Does any assertion pin the exact refusal wording, an internal index or an order the guidelines say not to pin?
- Defect 16: the executor says removing the `typeof` check alone fails the TypeScript build, so the runtime defect needed a cast (`as string`). Is the guard `typeof group.name` reachable only through the cast at all? Does the new test protect behaviour of the real load at runtime, or only something the type system already guards? Grade it yourself.
- The testing guideline "Mutation testing" has the reviewer run StrykerJS on changed `simulation` files. The changed files here are tests, but each new test guards a line of `saved-game.ts` (373, 775, 484, 512, 980), `loop.ts` (408-410) or `programs.ts` (249). Run Stryker restricted to those lines (the command is in `guidelines/testing.md`; ranges `file:first-last`) and classify each surviving mutant of those lines as a real gap, an equivalent change, uncompilable code or behaviour not worth fixing, with the reason. If a run is too long for your harness, run it in the background in stretches of under four minutes and wait for it before you return; leave `.stryker-tmp` and `.runs/stryker` as you found them (both are ignored by git).
- Defect 15 (`generationOf` reading the first character): `tests/sim/catch-up.test.mjs` was not run by the executor; does an existing test already catch that defect, and is the new loop test then redundant or still the only one that fails?

## Foundation entries and guidelines

Read each entry named in the slice's *Read* below whole, by its identifier, in `foundations/decisions.md`, `foundations/invariants.md`, `foundations/glossary.md`, `foundations/part_map.md`, `foundations/environment_facts.md`
(a decision runs from its `###` heading to the next heading). Read each guideline file named whole. Read every file you change whole before you change it.
For D-352, D-353, D-354: whole, at the end of `foundations/decisions.md`.

## Your section of the plan (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/plan.md`, heading "Slice 9")

### Slice 9 — The simulation's tests catch the load and loop defects they miss today

- **Goal:** tests of `tests/sim/saved-game.test.mjs` and `tests/sim/loop.test.mjs` catch five
  defects that pass every test today (To do 12–16): (12) a load accepts a chest holding exactly
  `chestCapacity` pieces and a closure that put down exactly the planned count
  (`src/browser/sim/saved-game.ts:373` and `:775`; defect `>` turned into `>=`); (13) crafted
  documents with two characters of one number and with a program whose number is not below the
  program counter are refused for that one fault alone, without the second fault that refuses the
  crafted cases at `tests/sim/saved-game.test.mjs:1145`–`:1152` earlier (`saved-game.ts:484`, `:512`;
  defects: `ids.has(id)` removed at characters, the counter check removed at programs); (14) a
  crafted document whose map run ended in death with a wrong `solvedMapRun` mark is refused
  (`saved-game.ts:980`; defect: the mark not compared after a death); (15) stopping the loop of a
  character other than the first writes that character's generation
  (`src/browser/sim/loop.ts:408`–`:410`; defect: `generationOf` reading `state.team.characters[0]`);
  (16) a crafted program whose rule group's name is not text is refused at the load
  (`src/browser/sim/programs.ts:249`; defect: the `typeof group.name` check removed). Each crafted
  document is refused whole, as `save-version` and D-213 give, and each expected value comes from
  the decisions named, not from today's result. Each new test is seen once failing on code with its
  defect put in temporarily, the command and exit code in the report, and the defect taken out
  again. No product file changes.
- **Change:** `tests/sim/saved-game.test.mjs` · `tests/sim/loop.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:21-21` Need, the third point ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:49-53` To do, items 12 to 16 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:83-85` Acceptance criteria ·
  `foundations/decisions.md:3967-4001` D-213 · `foundations/decisions.md:3715-3739` D-206 ·
  `foundations/decisions.md:1143-1168` D-56 · `foundations/decisions.md:3055-3068` D-165 ·
  `foundations/decisions.md:1122-1141` D-55 · `foundations/decisions.md:1018-1037` D-50 ·
  `foundations/decisions.md:3295-3309` D-179 · `foundations/decisions.md:4003-4020` D-214 ·
  `foundations/decisions.md:4904-4930` D-245 · `foundations/decisions.md:3444-3457` D-190 ·
  `foundations/invariants.md:1029-1038` save-version ·
  `foundations/invariants.md:1059-1068` death-settled-once ·
  `foundations/invariants.md:365-375` program-closed-lists ·
  `foundations/part_map.md:30-60` simulation ·
  `foundations/glossary.md:18-30` map run, program · `foundations/glossary.md:59-63` rule group ·
  `foundations/glossary.md:136-147` completion, solved map ·
  `foundations/glossary.md:211-221` generation number, earning loop ·
  `guidelines/coding.md` · `guidelines/coding-saved-game.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/saved-game.ts` · `src/browser/sim/loop.ts:380-589` ·
  `src/browser/sim/programs.ts:230-300`
- **Model:** cheaper
- **Risk:** trust boundary — the tests of `src/browser/sim/saved-game.ts`, whose defects the slice
  puts in temporarily
- **Checks:** `npm test -- tests/sim/saved-game.test.mjs` · `npm test -- tests/sim/loop.test.mjs`,
  each also with each defect in place (failing), then without it (passing)
- **Depends on:** none

## Passages of the task your *Read* names (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/task.md`, lines as given)

### `task.md:21-21`

- Przy kilku sprawdzeniach wczytywania zapisu gry, zapisu przy zamykaniu karty i zabezpieczeniach serwera można by wprowadzić usterkę, przez którą gracz traci cały zapis, a testy dalej by przeszły (uwagi loop2#043-2, 043-6, 043-23, 044-4, 047-5, 051-15, 051-9).

### `task.md:49-53`

12. Testy wczytywania przyjmują skrzynię dokładnie pełną (`chestCapacity`) i domknięcie, które odłożyło dokładnie planowaną liczbę (loop2#043-23 = 044-8; `src/browser/sim/saved-game.ts:373`, `:775`).
13. Spreparowane dokumenty z dwiema postaciami o jednym numerze i z programem o numerze nie niższym od licznika programów są odrzucane z powodu tej jednej usterki, bez drugiej, która dziś odrzuca je wcześniej (loop2#043-6 = 044-9; `src/browser/sim/saved-game.ts:484`, `:512`; `tests/sim/saved-game.test.mjs:1145`–`:1152`).
14. Spreparowany dokument z przejściem zakończonym śmiercią i złym znacznikiem `solvedMapRun` jest odrzucany (loop2#044-4; `src/browser/sim/saved-game.ts:980`).
15. Test pokazuje, że zatrzymanie pętli postaci innej niż pierwsza zapisuje pokolenie tej postaci (loop2#047-5; `src/browser/sim/loop.ts:408`–`:410`).
16. Spreparowany program z grupą reguł, której nazwa nie jest tekstem, jest odrzucany przy wczytaniu (loop2#051-15; `src/browser/sim/programs.ts:249`).

### `task.md:83-85`

### Acceptance criteria

- Każdy test dodany z pozycji 11–19 został raz widziany z porażką na kodzie z usterką, którą ma łapać.

## What to return

The status as the report's first line (`PASS <sha>` / `FAIL <sha>` / `questions`), then graded findings (blocking and Minor, each marked inside or outside the task's scope), the checks you ran as command and exit code,
every reach beyond this handoff (what, where, why), and **Searches not found or unclear** (each thing you looked for and did not find, or that was unclear, or `none`).
Name any changed invariant test. Return to the orchestrator only: the first line of the report, a one-line check result naming what failed or did not run, and the report path.
