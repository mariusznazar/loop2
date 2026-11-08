# Handoff — slice 1 of the plan (stage: make-change, a slice, or the retry of a slice)

You are the executor of slice 1 of the plan of one task of a the-way cycle. You make the code of
this slice, test first where it fits, commit it, and report. You write no plan, you do not widen the
slice, and you run no full gate (`npm test` with no file) — the orchestrator runs it; you run the
focused checks the slice's *Checks* lists, each with its command and exit code.

## Delegation

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator
(Sonnet 5.5). Questions that change what the work means go to the orchestrator in your report
(status `questions`), never to the human. An answer from the orchestrator is never the human's
approval.

## Where you work

- Worktree (work from its root): `the worktree root`, branch
  `task/kronika-z-filtrami`. Slice base (the head before your first commit): `3ea46e879d0dbef1ae0273f8bb44cd1f050b6588`. The
  worktree is clean when you start. Pinned the-way: `.the-way` at `294af7f`; use no personal skill of
  the same name without the `the-way-` prefix.
- Method: `.the-way/task-cycle/change/SKILL.md` — your variant is **a slice, or the retry of a
  slice**, so read `.the-way/task-cycle/change/slice.md` whole; where your slice changes a user
  interface read `.the-way/task-cycle/change/ui_check.md` when its step comes.
- Frozen task: `docs/task-cycles/kronika-z-filtrami/task.md` (sha256 prefix cd12745e0f8566f7). Reviewed spec:
  `docs/task-cycles/kronika-z-filtrami/spec.md`. Plan: `docs/task-cycles/kronika-z-filtrami/plan.md`. Read the passages of these that your slice's *Read*
  names; the task binds where the spec and the task differ, the spec where it settles more than the
  task, and the plan's slice where it divides the work. Do not reopen a design the spec settles.
- Your report: `docs/task-cycles/kronika-z-filtrami/reports/07-slice1-report.md`.
- Commits: on this branch, messages in English in the repository's form (`feat: :sparkles: <what>`,
  `fix: :bug: <what>`, `test: :white_check_mark: <what>`, `docs: :memo: <what>`; look at
  `git log` for the form), added **by path** (`git add <path>…`), never `git add -A`, `.` or
  `commit -a`. Leave no uncommitted change. The code is in English (identifiers, comments);
  what the code writes to the player stays in Polish as the task gives it.
- Answers of step 4: trust boundary no, irreversible operation no; every *Risk* is `none`.

## Foundation entries, with their current ranges

The foundation step has written and changed entries since the plan was made, so the plan's ranges
are stale. **These ranges hold** (they are the entries as the foundation step left them, at the
head `3ea46e879d0dbef1ae0273f8bb44cd1f050b6588` or later). Read each whole:

- `foundations/decisions.md:52-124` D-04
- `foundations/decisions.md:792-805` D-35
- `foundations/decisions.md:1394-1407` D-71
- `foundations/decisions.md:2472-2504` D-131
- `foundations/decisions.md:2605-2632` D-136
- `foundations/decisions.md:3179-3192` D-173
- `foundations/decisions.md:3194-3207` D-174
- `foundations/decisions.md:7380-7400` D-338
- `foundations/decisions.md:7473-7501` D-341
- `foundations/decisions.md:7503-7535` D-342
- the glossary term `chronicle`: `foundations/glossary.md:248-252`
- invariant `copy-save`: `foundations/invariants.md:849-857`
- invariant `minute-span-split`: `foundations/invariants.md:529-537`
- invariant `saved-program-edit`: `foundations/invariants.md:839-847`
- invariant `simulation-inputs`: `foundations/invariants.md:226-234`
- invariant `simulation-isolation`: `foundations/invariants.md:214-224`
- invariant `streak-program-change`: `foundations/invariants.md:829-837`

Entries of the plan's *Foundation entries* are named in your slice as F-numbers: F2 = D-338, F5 = D-341, F6 = D-342.
Ranges in your slice's *Read* below for `foundations/decisions.md` are the plan's; use the ones above.

## Your slice (word for word from `plan.md`)

### Slice 1 — The simulation reports a loss of the streak

- **Goal:** `GameEvent` has a kind for a loss of the streak, with its game minute, the streak as it
  stood before the loss and its cause — cold, hunger, cold and hunger together, a change of the
  copy's rules or rule groups, a switch to another program — emitted wherever a streak above zero
  becomes zero, as the spec's D1 gives: by the body's step of a minute (`minuteBeforePick`), also in
  the minute of a death of cold or hunger, before the death event of that minute, its cause read
  from the one definition of chill and starvation the body already reads (`body.ts`), never a second
  copy of the thresholds; by `setProgram` with a map run and by `discardCopyChanges`, through
  `withCopyProgram`, where the edit sets a streak above zero to zero; and by `switchProgram` where
  the streak was above zero. No other function changes the events it returns, beyond those that
  pass these on (`stepMinute`, `advanceMinutes`); no function changes the state it returns; the
  game state holds no event. The tests of the spec's D11 for these losses exist and pass, and the
  existing tests that compare a whole list of events and now meet such a loss name this task as
  the source of their change (`guidelines/testing.md`, „Changing an existing test”). A test file
  that fails for this reason outside *Change* is a small mismatch: change it under the same rule and
  report it in one line.
- **Change:** `src/browser/sim/run.ts` · `src/browser/sim/body.ts` · `src/browser/sim/programs.ts` ·
  `src/browser/sim/game.ts` · `tests/sim/streak.test.mjs` · `tests/sim/copy-actions.test.mjs` ·
  `tests/sim/body.test.mjs` · `tests/sim/discovery.test.mjs` · `tests/sim/death.test.mjs`
- **Read:** `docs/task-cycles/kronika-z-filtrami/task.md:31-32` To do (items 4 and 5) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:61-71` Questions to settle (Pytanie 3 and Pytanie 4) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:64-151` Constraints ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:155-197` D1. Facts of a game minute come from two new events of the simulation; acts on the copy are read before and after the act ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:429-440` D10. Units and their interfaces (Simulation) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:469-487` D11. Tests the design makes necessary, by kind (simulation) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:569-585` Left to the maker ·
  F2 · F5 · F6 ·
  `foundations/decisions.md:52-119` D-04 · `foundations/decisions.md:1388-1401` D-71 ·
  `foundations/decisions.md:2466-2498` D-131 · `foundations/decisions.md:2599-2626` D-136 ·
  `foundations/decisions.md:3173-3186` D-173 · `foundations/decisions.md:3188-3201` D-174 ·
  `foundations/decisions.md:786-799` D-35 ·
  `foundations/invariants.md:214-224` simulation-isolation · `foundations/invariants.md:226-234` simulation-inputs ·
  `foundations/invariants.md:529-537` minute-span-split · `foundations/invariants.md:829-837` streak-program-change ·
  `foundations/invariants.md:839-847` saved-program-edit · `foundations/invariants.md:849-857` copy-save ·
  `foundations/glossary.md:12-16` game minute · `foundations/glossary.md:149-154` streak ·
  `foundations/glossary.md:174-178` copy · `foundations/part_map.md:30-60` simulation ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/world.ts`
- **Model:** same — set by the orchestrator in the plan's review, since the orchestrator's `cheaper` is below the class of an executor that rewrites the order of events in the minute of a death and the whole-list expectations of five test files at once
- **Risk:** none
- **Checks:** the new cases of `tests/sim/streak.test.mjs` written first and seen failing:
  `npm test -- tests/sim/streak.test.mjs`; then `npm test -- tests/sim/copy-actions.test.mjs`,
  `npm test -- tests/sim/body.test.mjs`, `npm test -- tests/sim/discovery.test.mjs`,
  `npm test -- tests/sim/death.test.mjs`, `npm test -- tests/sim/program-list.test.mjs`,
  `npm test -- tests/sim/trip.test.mjs`, `npm test -- tests/sim/catch-up.test.mjs`,
  `npm test -- tests/sim/loop.test.mjs`; after `npm run build`:
  `npm test -- tests/invariants/test_minute_span_split.py`,
  `npm test -- tests/invariants/test_streak_program_change.py`,
  `npm test -- tests/invariants/test_saved_program_edit.py`,
  `npm test -- tests/invariants/test_simulation_inputs.py`,
  `npm test -- tests/invariants/test_simulation_isolation.py`; `npm run typecheck`;
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** F2 · F5 · F6

## What the report holds

As `make-change` and `slice.md` give: status (`done`, `done with concerns`, `questions`,
`returned`, `reserved` or `blocked`), your commits (hashes) and the range from the slice base to
your head, each check with its command and exit code, whether you saw each new test fail first, the
**own-work check** (the requirement you were most likely to miss and the check you made of it),
every reach beyond this handoff (what, where, why), the files you changed beyond the slice's
*Change* (a small mismatch, one line each), and **Searches not found or unclear** (each thing
looked for and not found or unclear, or `none`). Return your status, your commits and the report
path in one short message.
