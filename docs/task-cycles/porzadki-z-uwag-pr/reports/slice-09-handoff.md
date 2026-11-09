# Handoff - Slice 9 (executor, `make-change`)
## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval.
You never ask the human. A question comes back to the orchestrator in your report, with your recommended answer.
The plan and the task can be wrong: if a value, a line number or a sentence in them does not pass your own reckoning,
say so in the report instead of fitting the code to it.

## Where you work

- Worktree (work from its root): `the root of the repository`, branch `task/porzadki-z-uwag-pr`. No other checkout of the product.
- The slice's base: `378259f`. The head you start from: `378259f`. Your range runs from `378259f`.
- Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`, checked out in the worktree.
- Class of model the orchestrator set for this slice: cheaper (haiku).
- The foundation step is done: decisions D-352, D-353, D-354 were added at the end of `foundations/decisions.md`, the rule "Recording a failure" of `guidelines/coding.md` was extended,
  and the line of D-254 was wrapped (every decision after D-254 moved one line down against the ranges the plan gives; the identifier is the address, the range only its size at the base).

## Your stage and its boundary

- You make: **a slice, or the retry of a slice** - Slice 9 of the plan, below. Method: read `.the-way/task-cycle/change/SKILL.md` whole and `.the-way/task-cycle/change/slice.md` whole;
  read `.the-way/task-cycle/change/ui_check.md` before you finish a change that alters what a screen shows.
- You do not open the whole plan or the whole task: your section of the plan and the passages below are your reading, besides the files and entries named in *Read*.
  The passages of the task bind where your section says less.
- Do the work yourself; dispatch no subagent. Run only the focused checks of the slice's *Checks*; **never run the product's gate (`npm test` without arguments)**, also if a text below names it - report that as a mismatch.
- Commit your work with explicit paths (`git add <path> ...`, never `git add -A`); commit messages in English in the form of the repository's earlier commits (`<type>: :emoji: <what>`, see `git log`). Never return an uncommitted change.
- A temporary defect you put in the code to see a test fail is taken out again before you commit; the report records the failing run and the passing run, each as a command and an exit code.
- Trust boundary: the cycle's answer at start is *yes* (`src/server/**`, `src/browser/sim/saved-game.ts`, `scripts/local-start.mjs`): where your slice touches them, a crafted input at that boundary is part of your own-work check.
- Irreversible operation: none; the cycle prepares and never performs one.
- Privacy: no secret, password or personal data in your report, and none in any file you write.
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-09-report.md`.

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

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), the commits, a one-line check result naming what failed or did not run,
and the report path. The report holds what `make-change` section 6 gives: the files changed with added and removed line counts, each check as its command and exit code
(the failing run of each test written first included), the own-work check (the requirement most likely not met, the check written and run, what it showed),
each reach beyond this handoff (what, where, why), each choice with the way rejected and its cost if wrong, each adaptation of the plan to the code, and
**Searches not found or unclear** - each thing you looked for and did not find, or that was unclear, wherever it arose, or `none`.
Where the work needs a choice the task and the foundation do not settle, return `returned` with no code; where a fact or permission is missing, `blocked`.
