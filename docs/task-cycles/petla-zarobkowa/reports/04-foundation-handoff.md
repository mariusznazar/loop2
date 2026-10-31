# Handoff — agent of the plan's *Foundation entries*, task `petla-zarobkowa`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the agent of the plan's *Foundation
entries*, a fresh agent: you write the entries before Slice 1 and no code. Your questions go to the
orchestrator, never to the human; you return at your boundary. A question the foundation step
leaves to the human returns as `blocked`, with the question.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\petla-zarobkowa`, branch
  `task/petla-zarobkowa`, head = base `4ed8fcd` (`main`). Process pin `.the-way` at `a8dfe8a`, not
  moved by this task.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes. Your stage is the foundation step: you take
  none of that file's table of variants.
- Your stage: `.the-way/task-cycle/skill/foundation_step.md`. Read it whole. When you write an entry
  of an element, read that element's skill, by the project skills `the-way-record-decision`,
  `the-way-record-invariant`, `the-way-record-glossary-term`, each in the worktree's `.the-way`.
- Report path: `.runs/task-cycles/petla-zarobkowa/reports/04-foundation-report.md`
- Do not run the product's gate (`npm test`); it is the orchestrator's. Your check is
  `python -B .the-way/elements/common/foundation_check.py`; give its command and exit code.

## Git

Commit on the task branch, in the worktree, by explicit paths (`git add foundations/…`, never
`git add -A`, `.` or `commit -a`). Messages in English in the form of the repository's commits, for
instance `docs: :memo: …`. Do not push. Check that the commit's address is `the owner's address`
(`git log -1 --format='%h %ae'`).

## Answers of step 4

- Trust boundary: **yes**, `src/browser/sim/saved-game.ts`; you touch no code.
- Irreversible operation: **yes**, raising `SAVED_GAME_VERSION`; the cycle only prepares it, and the
  human performs it by merging. Name that in no entry beyond what the spec's rows say.

## What you write

The plan's section *Foundation entries*, `.runs/task-cycles/petla-zarobkowa/plan.md`, lines 7–51, is
your list; read it there, word for word, with its closing paragraph. It holds 13 new decisions,
14 changed decisions (D-22, D-44, D-62, D-71, D-93, D-132, D-164, D-183, D-189, D-190, D-194, D-200,
D-207, D-208), 4 new invariants, the changed `trip-run-end` and 3 new glossary terms.

Instructions the plan and spec settle:

- The four new invariants read *Method* `review` until the slice that writes their test sets
  `test` (WAY-61): `catch-up-state`, `catch-up-minutes`, `catch-up-death-moment`,
  `loop-run-knowledge`. `trip-run-end` keeps `test`; its wording gains stopping an earning loop.
- D-207's *Verification* clause "a tab that has just loaded a saved game state with its map run
  paused sending nothing until the player acts in it" narrows to no loop passing: To do 17 makes
  such a tab send at the hidden page and at a run's end.
- A line of a loop that stopped keeps `practice` `{}` (plan, *Choices*; Q13). The entry on the report
  must not say otherwise.
- Numbers go on from D-222. *Scope* words come from the part map. Projected entries keep their
  wording in full; rows of *Settlements to record* take rule P4 of the task (no "tylko", "nigdy",
  "zawsze", "bez" or other words that shut out an alternative in the wording of a row's entry).
- The task's To do 19 requires removing from D-194 the accepted cost of the state before the loop,
  which task 14 wrote. Task 14 has merged, so read D-194 as it stands at this head.

## What to read

- `.runs/task-cycles/petla-zarobkowa/spec.md:452-520`, *Foundation entries* and *Left to the maker*;
  sections 1–15 where a row points to one, and the rows' sections whole when you write their entry.
- `.runs/task-cycles/petla-zarobkowa/task.md`, read whole, 384 lines, in two pages: the rows, the
  answers of *Questions to settle*, whose *Not chosen* give a *Rejected*, and *Decisions in play*
  with the projected wording.
- `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md` (sha256
  `fda97782458d…`): the approved wording, *Rationale*, *Rejected* and *Verification* of the projected
  entries, from their headings: line 818 (randomness), 895 (time away), 1000 (who owns a program),
  1373 (how fast), 1452 (what pays), 1503 (a death), 2143 (`catch-up-state/1`), 2287 (`earning
  loop`), 2298 (`catch-up`).
- The entries you change, whole, and as each element's skill gives; `foundations/part_map.md` for
  *Scope* and *Part* identifiers.

The spec's wording in a row is the meaning; the sentence you write goes by the element's skill.
Where the spec, the task and an entry disagree, return `questions`.
