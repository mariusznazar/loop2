### Slice 4 — program choice, actions and the minute step

- **Goal:** `program.ts` evaluates conditions, checks feasibility without drawing and chooses the
  first applicable rule or a one-minute wait; `run.ts` starts a map run at minute 0 and steps it
  one game minute at a time, finishing explore, Wędruj and Idź as spec § 4.5–4.6 describe, with
  the next activity chosen in the finishing minute by the current program.
- **Change:** `src/browser/sim/program.ts` · `src/browser/sim/run.ts` ·
  `tests/sim/program.test.mjs` · `tests/sim/actions.test.mjs`
- **Read:** `.runs/task-cycles/mag-w-lesie/spec.md` · `.runs/task-cycles/mag-w-lesie/task.md`
- **Also reads (made by earlier slices, not measured):** `src/browser/sim/types.ts`,
  `src/browser/sim/data/*.ts`, `src/browser/sim/hex.ts`, `src/browser/sim/random.ts`,
  `src/browser/sim/layout.ts`
- **Reads outside the repository:** loop's `src/sim/movement.test.ts` and `src/sim/data/conditions.ts`.
- **Checks:** the failing tests first: `tests/sim/program.test.mjs` and `tests/sim/actions.test.mjs`
  (spec § 9.1 program and actions); then `npm run typecheck`; `npm test` (count grew); the
  invariant tests as in Slice 1.
- **Depends on:** Slice 3 · Row 3 · term `program rule` · term `game minute`

