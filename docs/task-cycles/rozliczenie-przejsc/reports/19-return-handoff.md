# Handoff — agent of the return step, task `rozliczenie-przejsc`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the agent of the return step, a fresh
agent. Your questions go to the orchestrator, never to the human; you return at your boundary. A
question the foundation step leaves to the human returns as `blocked`, with the question.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\rozliczenie-przejsc`, branch
  `task/rozliczenie-przejsc`, head `923391c`, base `95de83b`. Process pin `.the-way` at `a8dfe8a`.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes. Your stage is the return step: you take none
  of that file's table of variants.
- Your stage: `.the-way/task-cycle/skill/return_step.md`, and `.the-way/task-cycle/skill/foundation_step.md`
  beside it, since the return step writes as the foundation step writes. Read each whole, and the
  skill of an element when you write an entry of that element.
- Frozen task: `.runs/task-cycles/rozliczenie-przejsc/task.md`, read whole, 254 lines, in two pages.
- Spec: `.runs/task-cycles/rozliczenie-przejsc/spec.md`. Plan:
  `.runs/task-cycles/rozliczenie-przejsc/plan.md`, section *Foundation entries*.
- Report path: `.runs/task-cycles/rozliczenie-przejsc/reports/19-return-report.md`
- Do not run the product's gate; it is the orchestrator's, and it passed at `923391c`. A check you
  run carries its command and exit code; `python -B .the-way/elements/common/foundation_check.py` is
  yours. Before writing any script read `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md`.
- Where nothing needs correcting you commit nothing, and say so.

## Git

Commit on the task branch, in the worktree, by explicit paths (never `git add -A`, `.` or
`commit -a`). Messages in English in the form of the repository's commits, for instance
`docs: :memo: …`. Do not push. Check that the commit's address is `mariusznn@gmail.com`
(`git log -1 --format='%h %ae'`).

## Answers of step 4

- Trust boundary: **yes**, `src/browser/sim/saved-game.ts`.
- Irreversible operation: **yes**, raising `SAVED_GAME_VERSION`; the cycle only prepares it, and the
  human performs it by merging.

## What to compare

The entries the change writes or changes: D-03, D-04, D-179, D-189, D-190, D-194, D-212, D-214–D-220;
the invariants `solved-map-manual-run`, `resurrection-renewal`, `death-settled-once`,
`trip-transfer`, `trip-run-end`; the terms `resurrection`, `generation number`; those the task names
under *Decisions in play*; those the agent of the entries found by its search of the foundation
(`.runs/task-cycles/rozliczenie-przejsc/reports/06-foundation-report.md`, *Reaches beyond the
handoff*); and the part-map entries `simulation`, `browser-view`, `build-tools`, `product-foundation`.
Compare each with the code at `923391c`.

Things the cycle already knows, for your check, not as findings to accept:

- The foundation was written before the code. Its report's *State of this commit* says *Method*
  `test` holds at the request, when the tests stand: they stand now, under the markers
  `resurrection-renewal` and `death-settled-once` in `tests/sim/death.test.mjs`,
  `tests/view/clock.test.mjs` and `tests/view/headquarters.test.mjs`, and `solved-map-manual-run` in
  `tests/sim/trip.test.mjs` and `tests/sim/saved-game.test.mjs`.
- D-219's wording and the code: the clock reads `Date.now()` once on each flush; death's settlement
  runs in the same step as the game minute of death, `settleDeath` being called by `clock.ts`.
- The doc comments of `passRealTime` and `createGameView` were to change with D-04's sentence
  (spec, *Left to the maker*). A sentence that repeats D-04's old wording anywhere is yours to
  find: a search of the repository for it, and for `the only way real time`.
- The headquarters' screen changed, and so did the map-run screen: compare the styleguide
  `guidelines/styleguide-browser-view.md` with what the screens now show, where it names them.
- `guidelines/coding-saved-game.md` stays as it is (plan, *Choices*); check that what it says stays
  true, its examples of keys included.
- `Character` gained two keys, and `tests/view/` and `src/browser/view/character-skills.ts` read
  characters: a new glossary word used against its entry is yours to correct.
- The whole-change review's search found no sentence the change makes false: report
  `.runs/task-cycles/rozliczenie-przejsc/reports/17-whole-review-report.md`, *Settlements and
  projected entries*. Repeat it for what it did not search.

Review findings are no foundation entries; do not write them down there.
