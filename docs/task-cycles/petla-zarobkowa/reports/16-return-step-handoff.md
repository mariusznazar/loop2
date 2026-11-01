# Handoff — agent of the return step, task `petla-zarobkowa`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the agent of the return step, a fresh
agent. Your questions go to the orchestrator, never to the human; you return at your boundary. A
question the foundation step leaves to the human returns as `blocked`, with the question.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\petla-zarobkowa`, branch
  `task/petla-zarobkowa`, head `34417de`. Process pin `.the-way` at `a8dfe8a`, not moved by this task.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes. You take none of its table of variants: your
  stage is the return step.
- Your stage: `.the-way/task-cycle/skill/return_step.md`, and with it
  `.the-way/task-cycle/skill/foundation_step.md`. Read each whole. When you write an entry of an
  element, read that element's skill, by the project skills `the-way-record-decision`,
  `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-update-part-map`,
  `the-way-record-environment-fact`, each in the worktree's `.the-way`.
- Report path: `.runs/task-cycles/petla-zarobkowa/reports/16-return-step-report.md`
- Do not run the product's gate (`npm test` with no file argument); it is the orchestrator's. Your
  check is `python -B .the-way/elements/common/foundation_check.py`, with its command and exit code.

## Git

Commit on the task branch, in the worktree, by explicit paths (never `git add -A`, `.` or
`commit -a`). Messages in English in the form of the repository's commits, for instance
`docs: :memo: …`. Do not push. Check that the commit's address is `the owner's address`. Leave the
worktree clean. Commit nothing when nothing needs correcting.

## Answers of step 4

- Trust boundary: **yes**, `src/browser/sim/saved-game.ts`.
- Irreversible operation: **yes**, raising `SAVED_GAME_VERSION`; the cycle only prepares it, and the
  human performs it by merging.

## What you compare

- Frozen task: `.runs/task-cycles/petla-zarobkowa/task.md`, read whole, 384 lines, in two pages: its
  *Settlements to record* and *Decisions in play*.
- Spec: `.runs/task-cycles/petla-zarobkowa/spec.md:453-521`, *Foundation entries* and *Left to the
  maker*, and what they point to.
- Plan: `.runs/task-cycles/petla-zarobkowa/plan.md:7-51`, *Foundation entries*.
- The entries the change writes, from commit `96d7b45`, with `.runs/task-cycles/petla-zarobkowa/reports/04-foundation-report.md`
  and its table of rows and meaning sentences; the range `4ed8fcd..34417de`.
- The whole-change review: `.runs/task-cycles/petla-zarobkowa/reports/14-whole-review-report.md`,
  `PASS`, with its *Limits of this review*: most decisions of `simulation` and `browser-view` were
  not read by it, so your search of the foundation carries weight. Its Minor findings M-1, M-2, M-8
  and M-9 touch entries. Grades and scope stay the reviewer's; whether an entry no longer matches the
  code is yours to judge by the return step. M-1 is a number of an answered question, the human's.

The executors' reports name what each slice left behind:
`.runs/task-cycles/petla-zarobkowa/reports/09-slice2-report.md`, `10-slice3-report.md`,
`11-slice4-report.md`, `12-slice5-report.md`, `13-slice6-report.md`. Slice 6 gave a heading
`tabindex="-1"` for focus; Slice 5 changed `guidelines/styleguide-browser-view.md`. Files
`src/browser/sim/loop.ts` and `src/browser/view/away-report.ts` are new. The plan left open whether a
sentence on a loop's run earns its place in `guidelines/coding-saved-game.md`, and the guidelines'
*Files of this kind* tables do not list every file of their kind.
