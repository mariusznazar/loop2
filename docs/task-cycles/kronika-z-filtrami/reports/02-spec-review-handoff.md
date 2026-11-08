# Handoff 02 — reviewer of the spec (stage: write-spec, the reviewer)

You review the spec of one task of a the-way cycle, as an agent that did not write it. You change
no file but your report, you write no plan or code, and you run no test or other check of the
product.

## Where you work

- Worktree (work from its root): `the worktree root`, branch
  `task/kronika-z-filtrami`, base `6f36c7ab998ceaf996afb617ca95881b3f007b2d`. The worktree is clean.
- Method: `.the-way/task-cycle/spec/SKILL.md` (the reviewer's part; it names `review.md` for you to
  read when its step comes). Pinned the-way `294af7f`. Use no personal skill of the same name
  without the `the-way-` prefix.
- Your variant: **the review of a spec** (a first review, not of a revision).
- Spec under review: `docs/task-cycles/kronika-z-filtrami/spec.md`
- Designer's report (for the questions it sent and its reaches): `docs/task-cycles/kronika-z-filtrami/reports/01-spec-report.md`
- Your report path: `docs/task-cycles/kronika-z-filtrami/reports/02-spec-review-report.md`; its
  first line is `PASS` or `FAIL`, as `review.md` gives.
- Frozen task, read whole, the source the spec is judged against:
  `docs/task-cycles/kronika-z-filtrami/task.md` (sha256 prefix cd12745e0f8566f7), Polish.

## Answers of step 4

- Trust boundary: no (the spec says it touches neither `src/browser/sim/saved-game.ts` nor
  `assets/icons/**`, `assets/fonts/**`, `assets/sprites/**`). Check that claim against the design.
- Irreversible operation: no.

## What to read

Foundation entries of `foundations/decisions.md`, each whole: D-04, D-39, D-46, D-122, D-131, D-132,
D-133, D-147, D-171, D-173, D-174, D-185, D-206, D-207, D-212, D-216, D-255, D-276, D-283, D-291,
D-292, D-308, D-309, D-311, D-312, D-316, D-324, D-334, D-335, D-336, D-337. Invariants
(`foundations/invariants.md`): `simulation-isolation`, `simulation-inputs`, `save-version`,
`streak-program-change`, `rule-state-from-pick`. Part map entries `browser-view` and `simulation`.
Guideline files, each whole: `guidelines/coding-browser-module.md`,
`guidelines/coding-simulation-module.md`, `guidelines/styleguide-browser-view.md`,
`src/browser/AGENTS.md`.

The code the spec relies on is quoted in the spec by file and line at the base; check the places
that bear on its decisions (the events of `src/browser/sim/run.ts`, `body.ts`, `world.ts`,
`programs.ts`, `game.ts`; `src/browser/view/game-view.ts` `store.apply`, `run-screen.tsx`,
`world-area.tsx`, `discovery-band.tsx`, `now-lines.ts`, `program-editor.ts`).

Where you need something this handoff does not name, reach for it selectively and name the reach
in your report.

## Points the orchestrator asks you to look at, beyond the method's own checks

1. Every statement of what the player sees (To do 1–9, questions 1–12 of the task) against the
   spec's design: is any lost, widened or contradicted? In particular the seven readings the
   designer wrote down (spec D5, D9; report 01, "Questions sent") — say for each whether the task's
   wording allows the other reading and what it would cost.
2. D1: are the three places where a streak above zero becomes zero (the body's step, an edit or
   discard of the copy, a switch) all the places in the code at the base? Is "emitted by the body's
   step ... also in the minute of a death" consistent with the code's order of events in that minute?
3. D2/D6: the chronicle after a load — does it fit D-212, D-283 and To do 1 and 6 as the task words
   them, including the minute `lastCombat.attackMinute` and a state whose `lastCombat` was set but
   unresolved?
4. D-04 and the invariants `simulation-isolation` and `simulation-inputs`: does the design keep to
   them?
5. Anything the spec leaves to the maker that is in fact a design choice binding the plan or the
   foundation.

## What the report holds

As `review.md` gives. Return your report's first line and its path in one short message; the full
text lives at the report path.
