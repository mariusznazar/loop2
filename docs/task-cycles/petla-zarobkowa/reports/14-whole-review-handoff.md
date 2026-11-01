# Handoff — reviewer of the whole change, task `petla-zarobkowa`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the reviewer of the whole change, a fresh
agent that made none of it. You change no file except your report. Your questions go to the
orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\petla-zarobkowa`, branch
  `task/petla-zarobkowa`.
- Method: `.the-way/task-cycle/review/SKILL.md` in the worktree (the project skill
  `the-way-review-change`). Read it whole; read a file it names only when the step or variant that
  names it comes.
- Variant: the whole change.
- Range: `4ed8fcd..34417de`. 33 files, 5911 added, 239 removed.
- Report path, first line `PASS <sha>` or `FAIL <sha>`:
  `.runs/task-cycles/petla-zarobkowa/reports/14-whole-review-report.md`
- Do not run the product's gate (`npm test` with no file argument); it is the orchestrator's. A
  focused check you run carries its command and exit code. `npm test -- <file>` builds; a direct
  `node --test` needs `npm run build` first. Before writing any script read
  `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md`.
- You select your own foundation and guidelines, by the parts of the change.
- Reading loop's data files and tests at `C:\Storage\repos\loop`, commit `cdc7c0d`, with
  `git -C C:/Storage/repos/loop show cdc7c0d:<path>`, is allowed; not its engine or interface. Under
  the human's answer P6 its tests bind where they cover a case, a departure being a named decision.

## Answers of step 4, each a thing this review aims at

- Trust boundary: **yes**. `src/browser/sim/saved-game.ts` reads the new keys. Check crafted input:
  a forged or malformed value refuses the document whole, and no document the game itself writes, at
  any state the finished code reaches, is refused. Slice 1 had a review of its own on the shape;
  the writers of states came after it, so the second half of this aim is yours.
- Irreversible operation: **yes**. Raising `SAVED_GAME_VERSION` makes the game discard every older
  saved game state in full at load (D-206) once the merge deploys `main` (D-11). Check that the
  change only prepares that: nothing is performed on the server.

## Sources

- Frozen task: `.runs/task-cycles/petla-zarobkowa/task.md`, read whole, 384 lines, in two pages. Its
  code lines are at `95de83b`.
- Spec: `.runs/task-cycles/petla-zarobkowa/spec.md`, read whole, 521 lines; its review
  `.runs/task-cycles/petla-zarobkowa/reports/02-spec-review-report.md`, `PASS` with no findings.
  Section 13 holds one settlement after that review: `saveTimeMs` any sign (finding I-1 of Slice 1).
- Plan: `.runs/task-cycles/petla-zarobkowa/plan.md`, read whole; `plan-size.md` beside it. The
  orchestrator's corrections to it stand in `.runs/task-cycles/petla-zarobkowa/cycle.md`, *Events*.

## Slices

| Slice | Range | Review of its own | Executor's report |
|---|---|---|---|
| Foundation entries | `4ed8fcd..96d7b45` | judged with Slice 1, `PASS` after the fix | `reports/04-foundation-report.md` |
| 1 | `96d7b45..3f99110` | yes: `reports/06-slice1-review-report.md`, fix `reports/07-slice1-fix-report.md`, `reports/08-slice1-fix-review-report.md`, `PASS 3f99110` | `reports/05-slice1-report.md` |
| 2 | `3f99110..5791fd7` | none: yours to judge | `reports/09-slice2-report.md` |
| 3 | `5791fd7..ca55922` | none: yours to judge | `reports/10-slice3-report.md` |
| 4 | `ca55922..b1302fa` | none: yours to judge | `reports/11-slice4-report.md` |
| 5 | `b1302fa..395b6f3` | none: yours to judge | `reports/12-slice5-report.md` |
| 6 | `395b6f3..34417de` | none: yours to judge | `reports/13-slice6-report.md` |

Reports stand in `.runs/task-cycles/petla-zarobkowa/`. Name for each blocking finding the slice it
comes from, or that it comes from none.

## Mismatches the mechanical checks passed on

- Slice 2: the tests-first order was not kept; a red run on stubs and mutations of the real code made
  up for it (report, *Checks*).
- Slice 3: four cases the red stub satisfied were not seen failing (report, *Checks*). Its handoff,
  and Slice 2's, lost the last line of later spec passages through a stale range: section 14's
  sentence "Reading the number from the data leaves no 60 in code." and section 16's "Tests of loop
  this spec departs from are named in the task; the rest are taken as cases." Check that the code
  keeps no literal 60 for a loop's minute.
- Slice 4: the `tests/view/account-screen.test.mjs` cases were written after the code, red by
  mutation; `guidelines/testing.md` was read in part.
- Slice 5: two ACTS cases were not seen red alone; after „Zatrzymaj” focus falls to the page body
  (D-42); the browser check ran on a harness, with four states unchecked (report).
- Slice 6: focus after „Zamknij” goes to the „Drużyna” heading with `tabindex="-1"`; one change of an
  existing test; the browser check left two states unchecked and one console error unread (report).

## Minor and out-of-scope findings of the slice reviews

From `reports/06-slice1-review-report.md`: M-1, D-207 *Rejected* says "about 1440 saves a day" of a
30-second rhythm, copied faithfully from Q11; M-2, `catch-up` says "while the game was closed" while
D-230 runs it with a tab open; M-3, `moment` means two things in `src/browser/view/game-saver.ts`.

The reviewer of Slice 1 set aside, under *Declined to judge*: "An open report line of a character
with no loop: section 13 does not ask for that condition, and what writes lines is Slice 3's." and
"The saved document's size with several earning loops (D-208): Slice 4." Both are yours now.

## Coverage asked of you

Every *To do* 1–19, every row 1–26 of *Settlements to record*, each projected entry the task carries,
and source fidelity: the Polish texts word for word, and each departure from loop's tests the task
names (Q3, Q5, Q7, Q20, Q21) and no other.
